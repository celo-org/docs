/* libsecret - GLib wrapper for Secret Service
 *
 * Copyright 2011 Collabora Ltd.
 * Copyright 2012 Red Hat Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation; either version 2.1 of the licence or (at
 * your option) any later version.
 *
 * See the included COPYING file for more information.
 *
 * Author: Stef Walter <stefw@gnome.org>
 */

#include "config.h"

#include "secret-collection.h"
#include "secret-dbus-generated.h"
#include "secret-item.h"
#include "secret-paths.h"
#include "secret-private.h"
#include "secret-service.h"
#include "secret-types.h"
#include "secret-value.h"

#include <glib/gi18n-lib.h>

/**
 * SecretSearchFlags:
 * @SECRET_SEARCH_NONE: no flags
 * @SECRET_SEARCH_ALL: all the items matching the search will be returned, instead of just the first one
 * @SECRET_SEARCH_UNLOCK: unlock locked items while searching
 * @SECRET_SEARCH_LOAD_SECRETS: while searching load secrets for items that are not locked
 *
 * Various flags to be used with secret_service_search() and secret_service_search_sync().
 */

typedef struct {
	SecretService *service;
	GCancellable *cancellable;
	GHashTable *items;
	gchar **unlocked;
	gchar **locked;
	guint loading;
	SecretSearchFlags flags;
	GVariant *attributes;
} SearchClosure;

static void
search_closure_free (gpointer data)
{
	SearchClosure *closure = data;
	g_clear_object (&closure->service);
	g_clear_object (&closure->cancellable);
	g_hash_table_unref (closure->items);
	g_variant_unref (closure->attributes);
	g_strfreev (closure->unlocked);
	g_strfreev (closure->locked);
	g_slice_free (SearchClosure, closure);
}

static void
search_closure_take_item (SearchClosure *closure,
                          SecretItem *item)
{
	const gchar *path = g_dbus_proxy_get_object_path (G_DBUS_PROXY (item));
	g_hash_table_insert (closure->items, (gpointer)path, item);
}

static GList *
search_closure_build_items (SearchClosure *closure,
                            gchar **paths)
{
	GList *results = NULL;
	SecretItem *item;
	guint i;

	for (i = 0; paths[i]; i++) {
		item = g_hash_table_lookup (closure->items, paths[i]);
		if (item != NULL)
			results = g_list_prepend (results, g_object_ref (item));
	}

	return g_list_reverse (results);
}

static void
on_search_secrets (GObject *source,
                   GAsyncResult *result,
                   gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);

	/* Note that we ignore any unlock failure */
	secret_item_load_secrets_finish (result, NULL);

	g_simple_async_result_complete (async);
	g_object_unref (async);
}

static void
on_search_unlocked (GObject *source,
                    GAsyncResult *result,
                    gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	SearchClosure *search = g_simple_async_result_get_op_res_gpointer (async);
	GList *items;

	/* Note that we ignore any unlock failure */
	secret_service_unlock_finish (search->service, result, NULL, NULL);

	/* If loading secrets ... locked items automatically ignored */
	if (search->flags & SECRET_SEARCH_LOAD_SECRETS) {
		items = g_hash_table_get_values (search->items);
		secret_item_load_secrets (items, search->cancellable,
		                          on_search_secrets, g_object_ref (async));
		g_list_free (items);

	/* No additional options, just complete */
	} else {
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
}

static void
secret_search_unlock_load_or_complete (GSimpleAsyncResult *async,
                                       SearchClosure *search)
{
	GList *items;

	/* If unlocking then unlock all the locked items */
	if (search->flags & SECRET_SEARCH_UNLOCK) {
		items = search_closure_build_items (search, search->locked);
		secret_service_unlock (search->service, items, search->cancellable,
		                       on_search_unlocked, g_object_ref (async));
		g_list_free_full (items, g_object_unref);

	/* If loading secrets ... locked items automatically ignored */
	} else if (search->flags & SECRET_SEARCH_LOAD_SECRETS) {
		items = g_hash_table_get_values (search->items);
		secret_item_load_secrets (items, search->cancellable,
		                          on_search_secrets, g_object_ref (async));
		g_list_free (items);

	/* No additional options, just complete */
	} else {
		g_simple_async_result_complete (async);
	}
}

static void
on_search_loaded (GObject *source,
                  GAsyncResult *result,
                  gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	SearchClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	GError *error = NULL;
	SecretItem *item;

	closure->loading--;

	item = secret_item_new_for_dbus_path_finish (result, &error);
	if (error != NULL)
		g_simple_async_result_take_error (res, error);

	if (item != NULL)
		search_closure_take_item (closure, item);

	/* We're done loading, lets go to the next step */
	if (closure->loading == 0)
		secret_search_unlock_load_or_complete (res, closure);

	g_object_unref (res);
}

static void
search_load_item_async (SecretService *self,
                        GSimpleAsyncResult *res,
                        SearchClosure *closure,
                        const gchar *path)
{
	SecretItem *item;

	item = _secret_service_find_item_instance (self, path);
	if (item == NULL) {
		secret_item_new_for_dbus_path (self, path, SECRET_ITEM_NONE, closure->cancellable,
		                               on_search_loaded, g_object_ref (res));
		closure->loading++;
	} else {
		search_closure_take_item (closure, item);
	}
}

static void
on_search_paths (GObject *source,
                 GAsyncResult *result,
                 gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	SearchClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	SecretService *self = closure->service;
	GError *error = NULL;
	gint want = 1;
	gint count;
	gint i;

	secret_service_search_for_dbus_paths_finish (self, result, &closure->unlocked,
	                                             &closure->locked, &error);
	if (error == NULL) {
		want = 1;
		if (closure->flags & SECRET_SEARCH_ALL)
			want = G_MAXINT;
		count = 0;

		for (i = 0; count < want && closure->unlocked[i] != NULL; i++, count++)
			search_load_item_async (self, res, closure, closure->unlocked[i]);
		for (i = 0; count < want && closure->locked[i] != NULL; i++, count++)
			search_load_item_async (self, res, closure, closure->locked[i]);

		/* No items loading, complete operation now */
		if (closure->loading == 0)
			secret_search_unlock_load_or_complete (res, closure);

	} else {
		g_simple_async_result_take_error (res, error);
		g_simple_async_result_complete (res);
	}

	g_object_unref (res);
}

static void
on_search_service (GObject *source,
                   GAsyncResult *result,
                   gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	SearchClosure *search = g_simple_async_result_get_op_res_gpointer (async);
	GError *error = NULL;

	search->service = secret_service_get_finish (result, &error);
	if (error == NULL) {
		_secret_service_search_for_paths_variant (search->service, search->attributes,
		                                          search->cancellable, on_search_paths,
		                                          g_object_ref (async));

	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
}

/**
 * secret_service_search:
 * @service: (allow-none): the secret service
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): search for items matching these attributes
 * @flags: search option flags
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Search for items matching the @attributes. All collections are searched.
 * The @attributes should be a table of string keys and string values.
 *
 * If @service is NULL, then secret_service_get() will be called to get
 * the default #SecretService proxy.
 *
 * If %SECRET_SEARCH_ALL is set in @flags, then all the items matching the
 * search will be returned. Otherwise only the first item will be returned.
 * This is almost always the unlocked item that was most recently stored.
 *
 * If %SECRET_SEARCH_UNLOCK is set in @flags, then items will be unlocked
 * if necessary. In either case, locked and unlocked items will match the
 * search and be returned. If the unlock fails, the search does not fail.
 *
 * If %SECRET_SEARCH_LOAD_SECRETS is set in @flags, then the items will have
 * their secret values loaded and available via secret_item_get_secret().
 *
 * This function returns immediately and completes asynchronously.
 */
void
secret_service_search (SecretService *service,
                       const SecretSchema *schema,
                       GHashTable *attributes,
                       SecretSearchFlags flags,
                       GCancellable *cancellable,
                       GAsyncReadyCallback callback,
                       gpointer user_data)
{
	GSimpleAsyncResult *res;
	SearchClosure *closure;
	const gchar *schema_name = NULL;

	g_return_if_fail (service == NULL || SECRET_IS_SERVICE (service));
	g_return_if_fail (attributes != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return;

	if (schema != NULL && !(schema->flags & SECRET_SCHEMA_DONT_MATCH_NAME))
		schema_name = schema->name;

	res = g_simple_async_result_new (G_OBJECT (service), callback, user_data,
	                                 secret_service_search);
	closure = g_slice_new0 (SearchClosure);
	closure->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	closure->items = g_hash_table_new_full (g_str_hash, g_str_equal, NULL, g_object_unref);
	closure->flags = flags;
	closure->attributes = _secret_attributes_to_variant (attributes, schema_name);
	g_variant_ref_sink (closure->attributes);
	g_simple_async_result_set_op_res_gpointer (res, closure, search_closure_free);

	if (service) {
		closure->service = g_object_ref (service);
		_secret_service_search_for_paths_variant (closure->service, closure->attributes,
		                                          closure->cancellable, on_search_paths,
		                                          g_object_ref (res));

	} else {
		secret_service_get (SECRET_SERVICE_NONE, cancellable,
		                    on_search_service, g_object_ref (res));
	}

	g_object_unref (res);
}

/**
 * secret_service_search_finish:
 * @service: (allow-none): the secret service
 * @result: asynchronous result passed to callback
 * @error: location to place error on failure
 *
 * Complete asynchronous operation to search for items.
 *
 * Returns: (transfer full) (element-type Secret.Item):
 *          a list of items that matched the search
 */
GList *
secret_service_search_finish (SecretService *service,
                              GAsyncResult *result,
                              GError **error)
{
	GSimpleAsyncResult *res;
	SearchClosure *closure;
	GList *items = NULL;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);
	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (service),
	                      secret_service_search), NULL);

	res = G_SIMPLE_ASYNC_RESULT (result);

	if (_secret_util_propagate_error (res, error))
		return NULL;

	closure = g_simple_async_result_get_op_res_gpointer (res);
	if (closure->unlocked)
		items = search_closure_build_items (closure, closure->unlocked);
	if (closure->locked)
		items = g_list_concat (items, search_closure_build_items (closure, closure->locked));
	return items;
}

static gboolean
service_load_items_sync (SecretService *service,
                         GCancellable *cancellable,
                         gchar **paths,
                         GList **items,
                         gint want,
                         gint *have,
                         GError **error)
{
	SecretItem *item;
	guint i;

	for (i = 0; *have < want && paths[i] != NULL; i++) {
		item = _secret_service_find_item_instance (service, paths[i]);
		if (item == NULL)
			item = secret_item_new_for_dbus_path_sync (service, paths[i], SECRET_ITEM_NONE,
			                                           cancellable, error);
		if (item == NULL) {
			return FALSE;

		} else {
			*items = g_list_prepend (*items, item);
			(*have)++;
		}
	}

	return TRUE;
}

/**
 * secret_service_search_sync:
 * @service: (allow-none): the secret service
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): search for items matching these attributes
 * @flags: search option flags
 * @cancellable: optional cancellation object
 * @error: location to place error on failure
 *
 * Search for items matching the @attributes. All collections are searched.
 * The @attributes should be a table of string keys and string values.
 *
 * If @service is NULL, then secret_service_get_sync() will be called to get
 * the default #SecretService proxy.
 *
 * If %SECRET_SEARCH_ALL is set in @flags, then all the items matching the
 * search will be returned. Otherwise only the first item will be returned.
 * This is almost always the unlocked item that was most recently stored.
 *
 * If %SECRET_SEARCH_UNLOCK is set in @flags, then items will be unlocked
 * if necessary. In either case, locked and unlocked items will match the
 * search and be returned. If the unlock fails, the search does not fail.
 *
 * If %SECRET_SEARCH_LOAD_SECRETS is set in @flags, then the items' secret
 * values will be loaded for any unlocked items. Loaded item secret values
 * are available via secret_item_get_secret(). If the load of a secret values
 * fail, then the
 *
 * This function may block indefinitely. Use the asynchronous version
 * in user interface threads.
 *
 * Returns: (transfer full) (element-type Secret.Item):
 *          a list of items that matched the search
 */
GList *
secret_service_search_sync (SecretService *service,
                            const SecretSchema *schema,
                            GHashTable *attributes,
                            SecretSearchFlags flags,
                            GCancellable *cancellable,
                            GError **error)
{
	gchar **unlocked_paths = NULL;
	gchar **locked_paths = NULL;
	GList *items = NULL;
	GList *locked = NULL;
	GList *unlocked = NULL;
	gboolean ret;
	gint want;
	gint have;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return NULL;

	if (service == NULL) {
		service = secret_service_get_sync (SECRET_SERVICE_NONE, cancellable, error);
		if (service == NULL)
			return NULL;
	} else {
		g_object_ref (service);
	}

	if (!secret_service_search_for_dbus_paths_sync (service, schema, attributes, cancellable,
	                                                &unlocked_paths, &locked_paths, error)) {
		g_object_unref (service);
		return NULL;
	}

	ret = TRUE;

	want = 1;
	if (flags & SECRET_SEARCH_ALL)
		want = G_MAXINT;
	have = 0;

	/* Remember, we're adding to the list backwards */

	if (unlocked_paths) {
		ret = service_load_items_sync (service, cancellable, unlocked_paths,
		                               &unlocked, want, &have, error);
	}

	if (ret && locked_paths) {
		ret = service_load_items_sync (service, cancellable, locked_paths,
		                               &locked, want, &have, error);
	}

	g_strfreev (unlocked_paths);
	g_strfreev (locked_paths);

	if (!ret) {
		g_list_free_full (unlocked, g_object_unref);
		g_list_free_full (locked, g_object_unref);
		g_object_unref (service);
		return NULL;
	}

	/* The lists are backwards at this point ... */
	items = g_list_concat (items, g_list_copy (locked));
	items = g_list_concat (items, g_list_copy (unlocked));
	items = g_list_reverse (items);

	if (flags & SECRET_SEARCH_UNLOCK)
		secret_service_unlock_sync (service, locked, cancellable, NULL, NULL);

	if (flags & SECRET_SEARCH_LOAD_SECRETS)
		secret_item_load_secrets_sync (items, NULL, NULL);

	g_list_free (locked);
	g_list_free (unlocked);
	g_object_unref (service);
	return items;
}

SecretValue *
_secret_service_decode_get_secrets_first (SecretService *self,
                                          GVariant *out)
{
	SecretSession *session;
	SecretValue *value = NULL;
	GVariantIter *iter;
	GVariant *variant;
	const gchar *path;

	g_variant_get (out, "(a{o(oayays)})", &iter);
	while (g_variant_iter_next (iter, "{&o@(oayays)}", &path, &variant)) {
		session = _secret_service_get_session (self);
		value = _secret_session_decode_secret (session, variant);
		g_variant_unref (variant);
		break;
	}
	g_variant_iter_free (iter);
	return value;
}

GHashTable *
_secret_service_decode_get_secrets_all (SecretService *self,
                                        GVariant *out)
{
	SecretSession *session;
	GVariantIter *iter;
	GVariant *variant;
	GHashTable *values;
	SecretValue *value;
	gchar *path;

	session = _secret_service_get_session (self);
	values = g_hash_table_new_full (g_str_hash, g_str_equal,
	                                g_free, secret_value_unref);
	g_variant_get (out, "(a{o(oayays)})", &iter);
	while (g_variant_iter_loop (iter, "{o@(oayays)}", &path, &variant)) {
		value = _secret_session_decode_secret (session, variant);
		if (value && path)
			g_hash_table_insert (values, g_strdup (path), value);
	}
	g_variant_iter_free (iter);
	return values;
}

typedef struct {
	GCancellable *cancellable;
	GPtrArray *paths;
	GHashTable *objects;
	gchar **xlocked;
	guint count;
	gboolean locking;
} XlockClosure;

static void
xlock_closure_free (gpointer data)
{
	XlockClosure *closure = data;
	if (closure->cancellable)
		g_object_unref (closure->cancellable);
	g_ptr_array_free (closure->paths, TRUE);
	g_strfreev (closure->xlocked);
	g_hash_table_unref (closure->objects);
	g_slice_free (XlockClosure, closure);
}

static void
on_xlock_paths (GObject *source,
                GAsyncResult *result,
                gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	XlockClosure *xlock = g_simple_async_result_get_op_res_gpointer (async);
	GVariant *lockval;
	GDBusProxy *object;
	GError *error = NULL;
	gint i;

	xlock->count = _secret_service_xlock_paths_finish (SECRET_SERVICE (source), result,
	                                                   &xlock->xlocked, &error);

	if (error == NULL) {
		/*
		 * After a lock or unlock we want the Locked property to immediately
		 * reflect the new state, and not have to wait for a PropertiesChanged
		 * signal to be processed later.
		 */

		lockval = g_variant_ref_sink (g_variant_new_boolean (xlock->locking));
		for (i = 0; xlock->xlocked[i] != NULL; i++) {
			object =  g_hash_table_lookup (xlock->objects, xlock->xlocked[i]);
			if (object != NULL)
				g_dbus_proxy_set_cached_property (object, "Locked", lockval);
		}
		g_variant_unref (lockval);

	} else {
		g_simple_async_result_take_error (async, error);
	}

	g_simple_async_result_complete (async);
	g_object_unref (async);
}

static void
on_xlock_service (GObject *source,
                  GAsyncResult *result,
                  gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	XlockClosure *xlock = g_simple_async_result_get_op_res_gpointer (async);
	GError *error = NULL;
	SecretService *service;

	service = secret_service_get_finish (result, &error);
	if (error == NULL) {
		_secret_service_xlock_paths_async (service, xlock->locking ? "Lock" : "Unlock",
		                                   (const gchar **)xlock->paths->pdata,
		                                   xlock->cancellable, on_xlock_paths,
		                                   g_object_ref (async));
		g_object_unref (service);

	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
}

static void
service_xlock_async (SecretService *service,
                     gboolean locking,
                     GList *objects,
                     GCancellable *cancellable,
                     GAsyncReadyCallback callback,
                     gpointer user_data)
{
	GSimpleAsyncResult *async;
	XlockClosure *xlock;
	const gchar *path;
	GList *l;

	async = g_simple_async_result_new (G_OBJECT (service), callback, user_data,
	                                   service_xlock_async);
	xlock = g_slice_new0 (XlockClosure);
	xlock->objects = g_hash_table_new_full (g_str_hash, g_str_equal, g_free, g_object_unref);
	xlock->locking = locking;
	xlock->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	xlock->paths = g_ptr_array_new ();

	for (l = objects; l != NULL; l = g_list_next (l)) {
		path = g_dbus_proxy_get_object_path (l->data);
		g_ptr_array_add (xlock->paths, (gpointer)path);
		g_hash_table_insert (xlock->objects, g_strdup (path), g_object_ref (l->data));
	}
	g_ptr_array_add (xlock->paths, NULL);

	g_simple_async_result_set_op_res_gpointer (async, xlock, xlock_closure_free);

	if (service == NULL) {
		secret_service_get (SECRET_SERVICE_NONE, cancellable,
		                    on_xlock_service, g_object_ref (async));
	} else {
		_secret_service_xlock_paths_async (service, xlock->locking ? "Lock" : "Unlock",
		                                   (const gchar **)xlock->paths->pdata,
		                                   xlock->cancellable, on_xlock_paths,
		                                   g_object_ref (async));
	}

	g_object_unref (async);
}

static gint
service_xlock_finish (SecretService *service,
                      GAsyncResult *result,
                      GList **xlocked,
                      GError **error)
{
	GSimpleAsyncResult *async;
	XlockClosure *xlock;
	GDBusProxy *object;
	gint i;

	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (service),
	                                                      service_xlock_async), -1);

	async = G_SIMPLE_ASYNC_RESULT (result);
	if (_secret_util_propagate_error (async, error))
		return -1;

	xlock = g_simple_async_result_get_op_res_gpointer (async);
	if (xlocked) {
		*xlocked = NULL;
		for (i = 0; xlock->xlocked[i] != NULL; i++) {
			object = g_hash_table_lookup (xlock->objects, xlock->xlocked[i]);
			if (object != NULL)
				*xlocked = g_list_prepend (*xlocked, g_object_ref (object));
		}
	}

	return xlock->count;
}

/**
 * secret_service_lock:
 * @service: (allow-none): the secret service
 * @objects: (element-type Gio.DBusProxy): the items or collections to lock
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Lock items or collections in the secret service.
 *
 * The secret service may not be able to lock items individually, and may
 * lock an entire collection instead.
 *
 * If @service is NULL, then secret_service_get() will be called to get
 * the default #SecretService proxy.
 *
 * This method returns immediately and completes asynchronously. The secret
 * service may prompt the user. secret_service_prompt() will be used to handle
 * any prompts that show up.
 */
void
secret_service_lock (SecretService *service,
                     GList *objects,
                     GCancellable *cancellable,
                     GAsyncReadyCallback callback,
                     gpointer user_data)
{
	g_return_if_fail (service == NULL || SECRET_IS_SERVICE (service));
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	service_xlock_async (service, TRUE, objects, cancellable, callback, user_data);
}

/**
 * secret_service_lock_finish:
 * @service: (allow-none): the secret service
 * @result: asynchronous result passed to the callback
 * @locked: (out) (element-type Gio.DBusProxy) (transfer full) (allow-none):
 *          location to place list of items or collections that were locked
 * @error: location to place an error on failure
 *
 * Complete asynchronous operation to lock items or collections in the secret
 * service.
 *
 * The secret service may not be able to lock items individually, and may
 * lock an entire collection instead.
 *
 * Returns: the number of items or collections that were locked
 */
gint
secret_service_lock_finish (SecretService *service,
                            GAsyncResult *result,
                            GList **locked,
                            GError **error)
{
	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), -1);
	g_return_val_if_fail (error == NULL || *error == NULL, -1);

	return service_xlock_finish (service, result, locked, error);
}

/**
 * secret_service_lock_sync:
 * @service: (allow-none): the secret service
 * @objects: (element-type Gio.DBusProxy): the items or collections to lock
 * @cancellable: optional cancellation object
 * @locked: (out) (element-type Gio.DBusProxy) (transfer full) (allow-none):
 *          location to place list of items or collections that were locked
 * @error: location to place an error on failure
 *
 * Lock items or collections in the secret service.
 *
 * The secret service may not be able to lock items individually, and may
 * lock an entire collection instead.
 *
 * If @service is NULL, then secret_service_get_sync() will be called to get
 * the default #SecretService proxy.
 *
 * This method may block indefinitely and should not be used in user
 * interface threads. The secret service may prompt the user.
 * secret_service_prompt() will be used to handle any prompts that show up.
 *
 * Returns: the number of items or collections that were locked
 */
gint
secret_service_lock_sync (SecretService *service,
                          GList *objects,
                          GCancellable *cancellable,
                          GList **locked,
                          GError **error)
{
	SecretSync *sync;
	gint count;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), -1);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), -1);
	g_return_val_if_fail (error == NULL || *error == NULL, -1);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_lock (service, objects, cancellable,
	                     _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	count = secret_service_lock_finish (service, sync->result, locked, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return count;
}

/**
 * secret_service_unlock:
 * @service: (allow-none): the secret service
 * @objects: (element-type Gio.DBusProxy): the items or collections to unlock
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Unlock items or collections in the secret service.
 *
 * The secret service may not be able to unlock items individually, and may
 * unlock an entire collection instead.
 *
 * If @service is NULL, then secret_service_get() will be called to get
 * the default #SecretService proxy.
 *
 * This method may block indefinitely and should not be used in user
 * interface threads. The secret service may prompt the user.
 * secret_service_prompt() will be used to handle any prompts that show up.
 */
void
secret_service_unlock (SecretService *service,
                       GList *objects,
                       GCancellable *cancellable,
                       GAsyncReadyCallback callback,
                       gpointer user_data)
{
	g_return_if_fail (service == NULL || SECRET_IS_SERVICE (service));
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	service_xlock_async (service, FALSE, objects, cancellable, callback, user_data);
}

/**
 * secret_service_unlock_finish:
 * @service: (allow-none): the secret service
 * @result: asynchronous result passed to the callback
 * @unlocked: (out) (element-type Gio.DBusProxy) (transfer full) (allow-none):
 *            location to place list of items or collections that were unlocked
 * @error: location to place an error on failure
 *
 * Complete asynchronous operation to unlock items or collections in the secret
 * service.
 *
 * The secret service may not be able to unlock items individually, and may
 * unlock an entire collection instead.
 *
 * Returns: the number of items or collections that were unlocked
 */
gint
secret_service_unlock_finish (SecretService *service,
                              GAsyncResult *result,
                              GList **unlocked,
                              GError **error)
{
	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), -1);
	g_return_val_if_fail (error == NULL || *error == NULL, -1);

	return service_xlock_finish (service, result, unlocked, error);
}

/**
 * secret_service_unlock_sync:
 * @service: (allow-none): the secret service
 * @objects: (element-type Gio.DBusProxy): the items or collections to unlock
 * @cancellable: optional cancellation object
 * @unlocked: (out) (element-type Gio.DBusProxy) (transfer full) (allow-none):
 *            location to place list of items or collections that were unlocked
 * @error: location to place an error on failure
 *
 * Unlock items or collections in the secret service.
 *
 * The secret service may not be able to unlock items individually, and may
 * unlock an entire collection instead.
 *
 * If @service is NULL, then secret_service_get_sync() will be called to get
 * the default #SecretService proxy.
 *
 * This method may block indefinitely and should not be used in user
 * interface threads. The secret service may prompt the user.
 * secret_service_prompt() will be used to handle any prompts that show up.
 *
 * Returns: the number of items or collections that were unlocked
 */
gint
secret_service_unlock_sync (SecretService *service,
                            GList *objects,
                            GCancellable *cancellable,
                            GList **unlocked,
                            GError **error)
{
	SecretSync *sync;
	gint count;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), -1);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), -1);
	g_return_val_if_fail (error == NULL || *error == NULL, -1);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_unlock (service, objects, cancellable,
	                       _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	count = secret_service_unlock_finish (service, sync->result, unlocked, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return count;
}

typedef struct {
	GCancellable *cancellable;
	gchar *collection_path;
	SecretValue *value;
	GHashTable *properties;
	gboolean created_collection;
	gboolean unlocked_collection;
} StoreClosure;

static void
store_closure_free (gpointer data)
{
	StoreClosure *store = data;
	if (store->cancellable)
		g_object_unref (store->cancellable);
	g_free (store->collection_path);
	secret_value_unref (store->value);
	g_hash_table_unref (store->properties);
	g_slice_free (StoreClosure, store);
}

static void
on_store_create (GObject *source,
                 GAsyncResult *result,
                 gpointer user_data);

static void
on_store_keyring (GObject *source,
                  GAsyncResult *result,
                  gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	StoreClosure *store = g_simple_async_result_get_op_res_gpointer (async);
	SecretService *service = SECRET_SERVICE (source);
	GError *error = NULL;
	gchar *path;

	path = secret_service_create_collection_dbus_path_finish (service, result, &error);
	if (error == NULL) {
		store->created_collection = TRUE;
		secret_service_create_item_dbus_path (service, store->collection_path,
		                                      store->properties, store->value,
		                                      SECRET_ITEM_CREATE_REPLACE, store->cancellable,
		                                      on_store_create, g_object_ref (async));
	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
	g_free (path);
}

static void
on_store_unlock (GObject *source,
                 GAsyncResult *result,
                 gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	StoreClosure *store = g_simple_async_result_get_op_res_gpointer (async);
	SecretService *service = SECRET_SERVICE (source);
	GError *error = NULL;

	secret_service_unlock_dbus_paths_finish (service, result, NULL, &error);
	if (error == NULL) {
		store->unlocked_collection = TRUE;
		secret_service_create_item_dbus_path (service, store->collection_path,
		                                      store->properties, store->value,
		                                      SECRET_ITEM_CREATE_REPLACE, store->cancellable,
		                                      on_store_create, g_object_ref (async));
	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
}

static void
on_store_create (GObject *source,
                 GAsyncResult *result,
                 gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	StoreClosure *store = g_simple_async_result_get_op_res_gpointer (async);
	SecretService *service = SECRET_SERVICE (source);
	GError *error = NULL;
	GHashTable *properties;

	_secret_service_create_item_dbus_path_finish_raw (result, &error);

	/*
	 * This happens when the collection doesn't exist. If the collection is
	 * the default alias, we should try and create it
	 */

	if (!store->created_collection &&
	    (g_error_matches (error, SECRET_ERROR, SECRET_ERROR_NO_SUCH_OBJECT) ||
	     g_error_matches (error, G_DBUS_ERROR, G_DBUS_ERROR_UNKNOWN_METHOD)) &&
	    g_strcmp0 (store->collection_path, SECRET_ALIAS_PREFIX "default") == 0) {
		properties = _secret_collection_properties_new (_("Default keyring"));
		secret_service_create_collection_dbus_path (service, properties, "default",
		                                            SECRET_COLLECTION_CREATE_NONE, store->cancellable,
		                                            on_store_keyring, g_object_ref (async));
		g_hash_table_unref (properties);
		g_error_free (error);

	} else if (!store->unlocked_collection &&
	           g_error_matches (error, SECRET_ERROR, SECRET_ERROR_IS_LOCKED)) {
		const gchar *paths[2] = { store->collection_path, NULL };
		secret_service_unlock_dbus_paths (service, paths, store->cancellable,
		                                  on_store_unlock, g_object_ref (async));
		g_error_free (error);
	} else {
		if (error != NULL)
			g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
}

static void
on_store_service (GObject *source,
                  GAsyncResult *result,
                  gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	StoreClosure *store = g_simple_async_result_get_op_res_gpointer (async);
	SecretService *service;
	GError *error = NULL;

	service = secret_service_get_finish (result, &error);
	if (error == NULL) {
		secret_service_create_item_dbus_path (service, store->collection_path,
		                                      store->properties, store->value,
		                                      SECRET_ITEM_CREATE_REPLACE, store->cancellable,
		                                      on_store_create, g_object_ref (async));
		g_object_unref (service);

	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
}

/**
 * secret_service_store:
 * @service: (allow-none): the secret service
 * @schema: (allow-none): the schema to use to check attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @collection: (allow-none): a collection alias, or D-Bus object path of the collection where to store the secret
 * @label: label for the secret
 * @value: the secret value
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Store a secret value in the secret service.
 *
 * The @attributes should be a set of key and value string pairs.
 *
 * If the attributes match a secret item already stored in the collection, then
 * the item will be updated with these new values.
 *
 * If @service is NULL, then secret_service_get() will be called to get
 * the default #SecretService proxy.
 *
 * If @collection is not specified, then the default collection will be
 * used. Use #SECRET_COLLECTION_SESSION to store the password in the session
 * collection, which doesn't get stored across login sessions.
 *
 * This method will return immediately and complete asynchronously.
 */
void
secret_service_store (SecretService *service,
                      const SecretSchema *schema,
                      GHashTable *attributes,
                      const gchar *collection,
                      const gchar *label,
                      SecretValue *value,
                      GCancellable *cancellable,
                      GAsyncReadyCallback callback,
                      gpointer user_data)
{
	GSimpleAsyncResult *async;
	StoreClosure *store;
	const gchar *schema_name;
	GVariant *propval;

	g_return_if_fail (service == NULL || SECRET_IS_SERVICE (service));
	g_return_if_fail (attributes != NULL);
	g_return_if_fail (label != NULL);
	g_return_if_fail (value != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, FALSE))
		return;

	async = g_simple_async_result_new  (G_OBJECT (service), callback, user_data,
	                                    secret_service_store);
	store = g_slice_new0 (StoreClosure);
	store->collection_path = _secret_util_collection_to_path (collection);
	store->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	store->value = secret_value_ref (value);
	store->properties = g_hash_table_new_full (g_str_hash, g_str_equal, NULL,
	                                           (GDestroyNotify)g_variant_unref);

	propval = g_variant_new_string (label);
	g_hash_table_insert (store->properties,
	                     SECRET_ITEM_INTERFACE ".Label",
	                     g_variant_ref_sink (propval));

	/* Always store the schema name in the attributes */
	schema_name = (schema == NULL) ? NULL : schema->name;
	propval = _secret_attributes_to_variant (attributes, schema_name);
	g_hash_table_insert (store->properties,
	                     SECRET_ITEM_INTERFACE ".Attributes",
	                     g_variant_ref_sink (propval));

	g_simple_async_result_set_op_res_gpointer (async, store, store_closure_free);

	if (service == NULL) {
		secret_service_get (SECRET_SERVICE_OPEN_SESSION, cancellable,
		                    on_store_service, g_object_ref (async));

	} else {
		secret_service_create_item_dbus_path (service, store->collection_path,
		                                      store->properties, store->value,
		                                      SECRET_ITEM_CREATE_REPLACE, store->cancellable,
		                                      on_store_create, g_object_ref (async));
	}

	g_object_unref (async);
}

/**
 * secret_service_store_finish:
 * @service: (allow-none): the secret service
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Finish asynchronous operation to store a secret value in the secret service.
 *
 * Returns: whether the storage was successful or not
 */
gboolean
secret_service_store_finish (SecretService *service,
                             GAsyncResult *result,
                             GError **error)
{
	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), FALSE);
	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (service),
	                                                      secret_service_store), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	if (_secret_util_propagate_error (G_SIMPLE_ASYNC_RESULT (result), error))
		return FALSE;

	return TRUE;
}

/**
 * secret_service_store_sync:
 * @service: (allow-none): the secret service
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @collection: (allow-none): a collection alias, or D-Bus object path of the collection where to store the secret
 * @label: label for the secret
 * @value: the secret value
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Store a secret value in the secret service.
 *
 * The @attributes should be a set of key and value string pairs.
 *
 * If the attributes match a secret item already stored in the collection, then
 * the item will be updated with these new values.
 *
 * If @collection is %NULL, then the default collection will be
 * used. Use #SECRET_COLLECTION_SESSION to store the password in the session
 * collection, which doesn't get stored across login sessions.
 *
 * If @service is NULL, then secret_service_get_sync() will be called to get
 * the default #SecretService proxy.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Returns: whether the storage was successful or not
 */
gboolean
secret_service_store_sync (SecretService *service,
                           const SecretSchema *schema,
                           GHashTable *attributes,
                           const gchar *collection,
                           const gchar *label,
                           SecretValue *value,
                           GCancellable *cancellable,
                           GError **error)
{
	SecretSync *sync;
	gboolean ret;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), FALSE);
	g_return_val_if_fail (attributes != NULL, FALSE);
	g_return_val_if_fail (label != NULL, FALSE);
	g_return_val_if_fail (value != NULL, FALSE);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, FALSE))
		return FALSE;

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_store (service, schema, attributes, collection,
	                      label, value, cancellable, _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	ret = secret_service_store_finish (service, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return ret;
}

typedef struct {
	GVariant *attributes;
	SecretValue *value;
	GCancellable *cancellable;
} LookupClosure;

static void
lookup_closure_free (gpointer data)
{
	LookupClosure *closure = data;
	g_variant_unref (closure->attributes);
	if (closure->value)
		secret_value_unref (closure->value);
	g_clear_object (&closure->cancellable);
	g_slice_free (LookupClosure, closure);
}

static void
on_lookup_get_secret (GObject *source,
                      GAsyncResult *result,
                      gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	LookupClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	SecretService *self = SECRET_SERVICE (source);
	GError *error = NULL;

	closure->value = secret_service_get_secret_for_dbus_path_finish (self, result, &error);
	if (error != NULL)
		g_simple_async_result_take_error (res, error);

	g_simple_async_result_complete (res);
	g_object_unref (res);
}

static void
on_lookup_unlocked (GObject *source,
                    GAsyncResult *result,
                    gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	LookupClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	SecretService *self = SECRET_SERVICE (source);
	GError *error = NULL;
	gchar **unlocked = NULL;

	secret_service_unlock_dbus_paths_finish (SECRET_SERVICE (source),
	                                         result, &unlocked, &error);
	if (error != NULL) {
		g_simple_async_result_take_error (res, error);
		g_simple_async_result_complete (res);

	} else if (unlocked && unlocked[0]) {
		secret_service_get_secret_for_dbus_path (self, unlocked[0],
		                                         closure->cancellable,
		                                         on_lookup_get_secret,
		                                         g_object_ref (res));

	} else {
		g_simple_async_result_complete (res);
	}

	g_strfreev (unlocked);
	g_object_unref (res);
}

static void
on_lookup_searched (GObject *source,
                    GAsyncResult *result,
                    gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	LookupClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	SecretService *self = SECRET_SERVICE (source);
	GError *error = NULL;
	gchar **unlocked = NULL;
	gchar **locked = NULL;

	secret_service_search_for_dbus_paths_finish (self, result, &unlocked, &locked, &error);
	if (error != NULL) {
		g_simple_async_result_take_error (res, error);
		g_simple_async_result_complete (res);

	} else if (unlocked && unlocked[0]) {
		secret_service_get_secret_for_dbus_path (self, unlocked[0],
		                                         closure->cancellable,
		                                         on_lookup_get_secret,
		                                         g_object_ref (res));

	} else if (locked && locked[0]) {
		const gchar *paths[] = { locked[0], NULL };
		secret_service_unlock_dbus_paths (self, paths,
		                                  closure->cancellable,
		                                  on_lookup_unlocked,
		                                  g_object_ref (res));

	} else {
		g_simple_async_result_complete (res);
	}

	g_strfreev (unlocked);
	g_strfreev (locked);
	g_object_unref (res);
}

static void
on_lookup_service (GObject *source,
                   GAsyncResult *result,
                   gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	LookupClosure *lookup = g_simple_async_result_get_op_res_gpointer (async);
	SecretService *service;
	GError *error = NULL;

	service = secret_service_get_finish (result, &error);
	if (error == NULL) {
		_secret_service_search_for_paths_variant (service, lookup->attributes,
		                                          lookup->cancellable,
		                                          on_lookup_searched, g_object_ref (async));
		g_object_unref (service);

	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
}

/**
 * secret_service_lookup:
 * @service: (allow-none): the secret service
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Lookup a secret value in the secret service.
 *
 * The @attributes should be a set of key and value string pairs.
 *
 * If @service is NULL, then secret_service_get() will be called to get
 * the default #SecretService proxy.
 *
 * This method will return immediately and complete asynchronously.
 */
void
secret_service_lookup (SecretService *service,
                       const SecretSchema *schema,
                       GHashTable *attributes,
                       GCancellable *cancellable,
                       GAsyncReadyCallback callback,
                       gpointer user_data)
{
	const gchar *schema_name = NULL;
	GSimpleAsyncResult *res;
	LookupClosure *closure;

	g_return_if_fail (service == NULL || SECRET_IS_SERVICE (service));
	g_return_if_fail (attributes != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return;

	if (schema != NULL && !(schema->flags & SECRET_SCHEMA_DONT_MATCH_NAME))
		schema_name = schema->name;

	res = g_simple_async_result_new (G_OBJECT (service), callback, user_data,
	                                 secret_service_lookup);
	closure = g_slice_new0 (LookupClosure);
	closure->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	closure->attributes = _secret_attributes_to_variant (attributes, schema_name);
	g_variant_ref_sink (closure->attributes);
	g_simple_async_result_set_op_res_gpointer (res, closure, lookup_closure_free);

	if (service == NULL) {
		secret_service_get (SECRET_SERVICE_OPEN_SESSION, cancellable,
		                    on_lookup_service, g_object_ref (res));
	} else {
		_secret_service_search_for_paths_variant (service, closure->attributes,
		                                          closure->cancellable,
		                                          on_lookup_searched, g_object_ref (res));
	}

	g_object_unref (res);
}

/**
 * secret_service_lookup_finish:
 * @service: (allow-none): the secret service
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Finish asynchronous operation to lookup a secret value in the secret service.
 *
 * If no secret is found then %NULL is returned.
 *
 * Returns: (transfer full): a newly allocated #SecretValue, which should be
 *          released with secret_value_unref(), or %NULL if no secret found
 */
SecretValue *
secret_service_lookup_finish (SecretService *service,
                              GAsyncResult *result,
                              GError **error)
{
	GSimpleAsyncResult *res;
	LookupClosure *closure;
	SecretValue *value;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);
	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (service),
	                      secret_service_lookup), NULL);

	res = G_SIMPLE_ASYNC_RESULT (result);
	if (_secret_util_propagate_error (res, error))
		return NULL;

	closure = g_simple_async_result_get_op_res_gpointer (res);
	value = closure->value;
	closure->value = NULL;
	return value;
}

/**
 * secret_service_lookup_sync:
 * @service: (allow-none): the secret service
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Lookup a secret value in the secret service.
 *
 * The @attributes should be a set of key and value string pairs.
 *
 * If @service is NULL, then secret_service_get_sync() will be called to get
 * the default #SecretService proxy.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Returns: (transfer full): a newly allocated #SecretValue, which should be
 *          released with secret_value_unref(), or %NULL if no secret found
 */
SecretValue *
secret_service_lookup_sync (SecretService *service,
                            const SecretSchema *schema,
                            GHashTable *attributes,
                            GCancellable *cancellable,
                            GError **error)
{
	SecretSync *sync;
	SecretValue *value;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), NULL);
	g_return_val_if_fail (attributes != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return NULL;

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_lookup (service, schema, attributes, cancellable,
	                       _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	value = secret_service_lookup_finish (service, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return value;
}

typedef struct {
	GCancellable *cancellable;
	SecretService *service;
	GVariant *attributes;
	gint deleted;
	gint deleting;
} DeleteClosure;

static void
delete_closure_free (gpointer data)
{
	DeleteClosure *closure = data;
	if (closure->service)
		g_object_unref (closure->service);
	g_variant_unref (closure->attributes);
	g_clear_object (&closure->cancellable);
	g_slice_free (DeleteClosure, closure);
}

static void
on_delete_password_complete (GObject *source,
                             GAsyncResult *result,
                             gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	DeleteClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	GError *error = NULL;
	gboolean deleted;

	closure->deleting--;

	deleted = _secret_service_delete_path_finish (SECRET_SERVICE (source), result, &error);
	if (error != NULL)
		g_simple_async_result_take_error (res, error);
	if (deleted)
		closure->deleted++;

	if (closure->deleting <= 0)
		g_simple_async_result_complete (res);

	g_object_unref (res);
}

static void
on_delete_searched (GObject *source,
                    GAsyncResult *result,
                    gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	DeleteClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	GError *error = NULL;
	gchar **unlocked = NULL;
	gint i;

	secret_service_search_for_dbus_paths_finish (SECRET_SERVICE (source), result, &unlocked, NULL, &error);
	if (error == NULL) {
		for (i = 0; unlocked[i] != NULL; i++) {
			_secret_service_delete_path (closure->service, unlocked[i], TRUE,
			                             closure->cancellable,
			                             on_delete_password_complete,
			                             g_object_ref (res));
			closure->deleting++;
		}

		if (closure->deleting == 0)
			g_simple_async_result_complete (res);
	} else {
		g_simple_async_result_take_error (res, error);
		g_simple_async_result_complete (res);
	}

	g_strfreev (unlocked);
	g_object_unref (res);
}

static void
on_delete_service (GObject *source,
                   GAsyncResult *result,
                   gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	DeleteClosure *closure = g_simple_async_result_get_op_res_gpointer (async);
	GError *error = NULL;

	closure->service = secret_service_get_finish (result, &error);
	if (error == NULL) {
		_secret_service_search_for_paths_variant (closure->service, closure->attributes,
		                                          closure->cancellable,
		                                          on_delete_searched, g_object_ref (async));

	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
}

/**
 * secret_service_clear:
 * @service: (allow-none): the secret service
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Remove unlocked items which match the attributes from the secret service.
 *
 * The @attributes should be a set of key and value string pairs.
 *
 * If @service is NULL, then secret_service_get() will be called to get
 * the default #SecretService proxy.
 *
 * This method will return immediately and complete asynchronously.
 */
void
secret_service_clear (SecretService *service,
                      const SecretSchema *schema,
                      GHashTable *attributes,
                      GCancellable *cancellable,
                      GAsyncReadyCallback callback,
                      gpointer user_data)
{
	const gchar *schema_name = NULL;
	GSimpleAsyncResult *res;
	DeleteClosure *closure;

	g_return_if_fail (service == NULL || SECRET_SERVICE (service));
	g_return_if_fail (attributes != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return;

	if (schema != NULL && !(schema->flags & SECRET_SCHEMA_DONT_MATCH_NAME))
		schema_name = schema->name;

	res = g_simple_async_result_new (G_OBJECT (service), callback, user_data,
	                                 secret_service_clear);
	closure = g_slice_new0 (DeleteClosure);
	closure->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	closure->attributes = _secret_attributes_to_variant (attributes, schema_name);
	g_variant_ref_sink (closure->attributes);
	g_simple_async_result_set_op_res_gpointer (res, closure, delete_closure_free);

	/* A double check to make sure we don't delete everything, should have been checked earlier */
	g_assert (g_variant_n_children (closure->attributes) > 0);

	if (service == NULL) {
		secret_service_get (SECRET_SERVICE_NONE, cancellable,
		                    on_delete_service, g_object_ref (res));
	} else {
		closure->service = g_object_ref (service);
		_secret_service_search_for_paths_variant (closure->service, closure->attributes,
		                                          closure->cancellable,
		                                          on_delete_searched, g_object_ref (res));
	}

	g_object_unref (res);
}

/**
 * secret_service_clear_finish:
 * @service: (allow-none): the secret service
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Finish asynchronous operation to remove items from the secret
 * service.
 *
 * Returns: whether items were removed or not
 */
gboolean
secret_service_clear_finish (SecretService *service,
                             GAsyncResult *result,
                             GError **error)
{
	GSimpleAsyncResult *res;
	DeleteClosure *closure;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);
	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (service),
	                      secret_service_clear), FALSE);

	res = G_SIMPLE_ASYNC_RESULT (result);
	if (_secret_util_propagate_error (res, error))
		return FALSE;

	closure = g_simple_async_result_get_op_res_gpointer (res);
	return closure->deleted > 0;
}

/**
 * secret_service_clear_sync:
 * @service: (allow-none): the secret service
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Remove unlocked items which match the attributes from the secret service.
 *
 * The @attributes should be a set of key and value string pairs.
 *
 * If @service is NULL, then secret_service_get_sync() will be called to get
 * the default #SecretService proxy.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Returns: whether items were removed or not
 */
gboolean
secret_service_clear_sync (SecretService *service,
                           const SecretSchema *schema,
                           GHashTable *attributes,
                           GCancellable *cancellable,
                           GError **error)
{
	SecretSync *sync;
	gboolean result;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), FALSE);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return FALSE;

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_clear (service, schema, attributes, cancellable,
	                      _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	result = secret_service_clear_finish (service, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return result;
}

typedef struct {
	GCancellable *cancellable;
	gchar *alias;
	gchar *collection_path;
} SetClosure;

static void
set_closure_free (gpointer data)
{
	SetClosure *set = data;
	if (set->cancellable)
		g_object_unref (set->cancellable);
	g_free (set->alias);
	g_free (set->collection_path);
	g_slice_free (SetClosure, set);
}

static void
on_set_alias_done (GObject *source,
                   GAsyncResult *result,
                   gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	GError *error = NULL;

	secret_service_set_alias_to_dbus_path_finish (SECRET_SERVICE (source), result, &error);
	if (error != NULL)
		g_simple_async_result_take_error (async, error);

	g_simple_async_result_complete (async);
	g_object_unref (async);
}

static void
on_set_alias_service (GObject *source,
                      GAsyncResult *result,
                      gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	SetClosure *set = g_simple_async_result_get_op_res_gpointer (async);
	SecretService *service;
	GError *error = NULL;

	service = secret_service_get_finish (result, &error);
	if (error == NULL) {
		secret_service_set_alias_to_dbus_path (service, set->alias,
		                                       set->collection_path,
		                                       set->cancellable,
		                                       on_set_alias_done,
		                                       g_object_ref (async));
		g_object_unref (service);

	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
}

/**
 * secret_service_set_alias:
 * @service: (allow-none): a secret service object
 * @alias: the alias to assign the collection to
 * @collection: (allow-none): the collection to assign to the alias
 * @cancellable: (allow-none): optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Assign a collection to this alias. Aliases help determine
 * well known collections, such as 'default'.
 *
 * If @service is NULL, then secret_service_get() will be called to get
 * the default #SecretService proxy.
 *
 * This method will return immediately and complete asynchronously.
 */
void
secret_service_set_alias (SecretService *service,
                          const gchar *alias,
                          SecretCollection *collection,
                          GCancellable *cancellable,
                          GAsyncReadyCallback callback,
                          gpointer user_data)
{
	GSimpleAsyncResult *async;
	SetClosure *set;
	const gchar *path;

	g_return_if_fail (service == NULL || SECRET_IS_SERVICE (service));
	g_return_if_fail (alias != NULL);
	g_return_if_fail (collection == NULL || SECRET_IS_COLLECTION (collection));
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	async = g_simple_async_result_new (G_OBJECT (service), callback, user_data,
	                                   secret_service_set_alias);
	set = g_slice_new0 (SetClosure);
	set->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	set->alias = g_strdup (alias);

	if (collection) {
		path = g_dbus_proxy_get_object_path (G_DBUS_PROXY (collection));
		g_return_if_fail (path != NULL);
	} else {
		path = NULL;
	}

	set->collection_path = g_strdup (path);
	g_simple_async_result_set_op_res_gpointer (async, set, set_closure_free);

	if (service == NULL) {
		secret_service_get (SECRET_SERVICE_NONE, cancellable,
		                    on_set_alias_service, g_object_ref (async));
	} else {
		secret_service_set_alias_to_dbus_path (service, set->alias,
		                                       set->collection_path,
		                                       set->cancellable,
		                                       on_set_alias_done,
		                                       g_object_ref (async));
	}

	g_object_unref (async);
}

/**
 * secret_service_set_alias_finish:
 * @service: (allow-none): a secret service object
 * @result: asynchronous result passed to callback
 * @error: location to place error on failure
 *
 * Finish an asynchronous operation to assign a collection to an alias.
 *
 * Returns: %TRUE if successful
 */
gboolean
secret_service_set_alias_finish (SecretService *service,
                                 GAsyncResult *result,
                                 GError **error)
{
	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), FALSE);
	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (service),
	                                                      secret_service_set_alias), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	if (_secret_util_propagate_error (G_SIMPLE_ASYNC_RESULT (result), error))
		return FALSE;

	return TRUE;
}

/**
 * secret_service_set_alias_sync:
 * @service: (allow-none): a secret service object
 * @alias: the alias to assign the collection to
 * @collection: (allow-none): the collection to assign to the alias
 * @cancellable: (allow-none): optional cancellation object
 * @error: location to place error on failure
 *
 * Assign a collection to this alias. Aliases help determine
 * well known collections, such as 'default'.
 *
 * If @service is NULL, then secret_service_get_sync() will be called to get
 * the default #SecretService proxy.
 *
 * This method may block and should not be used in user interface threads.
 *
 * Returns: %TRUE if successful
 */
gboolean
secret_service_set_alias_sync (SecretService *service,
                               const gchar *alias,
                               SecretCollection *collection,
                               GCancellable *cancellable,
                               GError **error)
{
	SecretSync *sync;
	gboolean ret;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), FALSE);
	g_return_val_if_fail (alias != NULL, FALSE);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_set_alias (service, alias, collection, cancellable,
	                          _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	ret = secret_service_set_alias_finish (service, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return ret;
}
