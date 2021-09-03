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

#include "secret-dbus-generated.h"
#include "secret-paths.h"
#include "secret-private.h"
#include "secret-service.h"
#include "secret-types.h"
#include "secret-value.h"


/**
 * SECTION:secret-paths
 * @title: DBus Path Related Functions
 * @short_description: Secret Service functions which operate on DBus object paths
 *
 * These are low level functions which operate on DBus object paths of
 * collections or items, instead of the #SecretCollection or #SecretItem
 * objects themselves.
 *
 * You can use these functions if you wish to manage access to the secret
 * service using the DBus API directly, and only wish to use a few calls
 * in libsecret.
 *
 * Stability: Unstable
 */

/**
 * secret_collection_new_for_dbus_path: (skip)
 * @service: (allow-none): a secret service object
 * @collection_path: the D-Bus path of the collection
 * @flags: options for the collection initialization
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Get a new collection proxy for a collection in the secret service.
 *
 * If @service is NULL, then secret_service_get() will be called to get
 * the default #SecretService proxy.
 *
 * This method will return immediately and complete asynchronously.
 *
 * Stability: Unstable
 */
void
secret_collection_new_for_dbus_path (SecretService *service,
                                     const gchar *collection_path,
                                     SecretCollectionFlags flags,
                                     GCancellable *cancellable,
                                     GAsyncReadyCallback callback,
                                     gpointer user_data)
{
	GDBusProxy *proxy;

	g_return_if_fail (service == NULL || SECRET_IS_SERVICE (service));
	g_return_if_fail (collection_path != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	proxy = G_DBUS_PROXY (service);

	g_async_initable_new_async (secret_service_get_collection_gtype (service),
	                            G_PRIORITY_DEFAULT, cancellable, callback, user_data,
	                            "g-flags", G_DBUS_CALL_FLAGS_NONE,
	                            "g-interface-info", _secret_gen_collection_interface_info (),
	                            "g-name", g_dbus_proxy_get_name (proxy),
	                            "g-connection", g_dbus_proxy_get_connection (proxy),
	                            "g-object-path", collection_path,
	                            "g-interface-name", SECRET_COLLECTION_INTERFACE,
	                            "service", service,
	                            "flags", flags,
	                            NULL);
}

/**
 * secret_collection_new_for_dbus_path_finish: (skip)
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Finish asynchronous operation to get a new collection proxy for a
 * collection in the secret service.
 *
 * Returns: (transfer full): the new collection, which should be unreferenced
 *          with g_object_unref()
 */
SecretCollection *
secret_collection_new_for_dbus_path_finish (GAsyncResult *result,
                                            GError **error)
{
	GObject *source_object;
	GObject *object;

	g_return_val_if_fail (G_IS_ASYNC_RESULT (result), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	source_object = g_async_result_get_source_object (result);
	object = g_async_initable_new_finish (G_ASYNC_INITABLE (source_object),
	                                      result, error);
	g_object_unref (source_object);

	if (object == NULL)
		return NULL;

	return SECRET_COLLECTION (object);
}

/**
 * secret_collection_new_for_dbus_path_sync: (skip)
 * @service: (allow-none): a secret service object
 * @collection_path: the D-Bus path of the collection
 * @flags: options for the collection initialization
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Get a new collection proxy for a collection in the secret service.
 *
 * If @service is NULL, then secret_service_get_sync() will be called to get
 * the default #SecretService proxy.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full): the new collection, which should be unreferenced
 *          with g_object_unref()
 */
SecretCollection *
secret_collection_new_for_dbus_path_sync (SecretService *service,
                                          const gchar *collection_path,
                                          SecretCollectionFlags flags,
                                          GCancellable *cancellable,
                                          GError **error)
{
	GDBusProxy *proxy;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), NULL);
	g_return_val_if_fail (collection_path != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	proxy = G_DBUS_PROXY (service);

	return g_initable_new (secret_service_get_collection_gtype (service),
	                       cancellable, error,
	                       "g-flags", G_DBUS_CALL_FLAGS_NONE,
	                       "g-interface-info", _secret_gen_collection_interface_info (),
	                       "g-name", g_dbus_proxy_get_name (proxy),
	                       "g-connection", g_dbus_proxy_get_connection (proxy),
	                       "g-object-path", collection_path,
	                       "g-interface-name", SECRET_COLLECTION_INTERFACE,
	                       "service", service,
	                       "flags", flags,
	                       NULL);
}

/**
 * secret_item_new_for_dbus_path: (skip)
 * @service: (allow-none): a secret service object
 * @item_path: the D-Bus path of the collection
 * @flags: initialization flags for the new item
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Get a new item proxy for a secret item in the secret service.
 *
 * If @service is NULL, then secret_service_get() will be called to get
 * the default #SecretService proxy.
 *
 * This method will return immediately and complete asynchronously.
 *
 * Stability: Unstable
 */
void
secret_item_new_for_dbus_path (SecretService *service,
                               const gchar *item_path,
                               SecretItemFlags flags,
                               GCancellable *cancellable,
                               GAsyncReadyCallback callback,
                               gpointer user_data)
{
	GDBusProxy *proxy;

	g_return_if_fail (service == NULL || SECRET_IS_SERVICE (service));
	g_return_if_fail (item_path != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	proxy = G_DBUS_PROXY (service);

	g_async_initable_new_async (secret_service_get_item_gtype (service),
	                            G_PRIORITY_DEFAULT, cancellable, callback, user_data,
	                            "g-flags", G_DBUS_CALL_FLAGS_NONE,
	                            "g-interface-info", _secret_gen_item_interface_info (),
	                            "g-name", g_dbus_proxy_get_name (proxy),
	                            "g-connection", g_dbus_proxy_get_connection (proxy),
	                            "g-object-path", item_path,
	                            "g-interface-name", SECRET_ITEM_INTERFACE,
	                            "service", service,
	                            "flags", flags,
	                            NULL);
}

/**
 * secret_item_new_for_dbus_path_finish: (skip)
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Finish asynchronous operation to get a new item proxy for a secret
 * item in the secret service.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full): the new item, which should be unreferenced
 *          with g_object_unref()
 */
SecretItem *
secret_item_new_for_dbus_path_finish (GAsyncResult *result,
                                      GError **error)
{
	GObject *object;
	GObject *source_object;

	source_object = g_async_result_get_source_object (result);
	object = g_async_initable_new_finish (G_ASYNC_INITABLE (source_object),
	                                      result, error);
	g_object_unref (source_object);

	if (object == NULL)
		return NULL;

	return SECRET_ITEM (object);
}

/**
 * secret_item_new_for_dbus_path_sync: (skip)
 * @service: (allow-none): a secret service object
 * @item_path: the D-Bus path of the item
 * @flags: initialization flags for the new item
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Get a new item proxy for a secret item in the secret service.
 *
 * If @service is NULL, then secret_service_get_sync() will be called to get
 * the default #SecretService proxy.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full): the new item, which should be unreferenced
 *          with g_object_unref()
 */
SecretItem *
secret_item_new_for_dbus_path_sync (SecretService *service,
                                    const gchar *item_path,
                                    SecretItemFlags flags,
                                    GCancellable *cancellable,
                                    GError **error)
{
	GDBusProxy *proxy;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), NULL);
	g_return_val_if_fail (item_path != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	proxy = G_DBUS_PROXY (service);

	return g_initable_new (secret_service_get_item_gtype (service),
	                       cancellable, error,
	                       "g-flags", G_DBUS_CALL_FLAGS_NONE,
	                       "g-interface-info", _secret_gen_item_interface_info (),
	                       "g-name", g_dbus_proxy_get_name (proxy),
	                       "g-connection", g_dbus_proxy_get_connection (proxy),
	                       "g-object-path", item_path,
	                       "g-interface-name", SECRET_ITEM_INTERFACE,
	                       "service", service,
	                       "flags", flags,
	                       NULL);
}

static void
on_search_items_complete (GObject *source,
                          GAsyncResult *result,
                          gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	GError *error = NULL;
	GVariant *response;

	response = g_dbus_proxy_call_finish (G_DBUS_PROXY (source), result, &error);
	if (error != NULL) {
		g_simple_async_result_take_error (res, error);
	} else {
		g_simple_async_result_set_op_res_gpointer (res, response,
		                                           (GDestroyNotify)g_variant_unref);
	}

	g_simple_async_result_complete (res);
	g_object_unref (res);
}

/**
 * secret_collection_search_for_dbus_paths: (skip)
 * @collection: the secret collection
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): search for items matching these attributes
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Search for items in @collection matching the @attributes, and return their
 * DBus object paths. Only the specified collection is searched. The @attributes
 * should be a table of string keys and string values.
 *
 * This function returns immediately and completes asynchronously.
 *
 * When your callback is called use secret_collection_search_for_dbus_paths_finish()
 * to get the results of this function. Only the DBus object paths of the
 * items will be returned. If you would like #SecretItem objects to be returned
 * instead, then use the secret_collection_search() function.
 *
 * Stability: Unstable
 */
void
secret_collection_search_for_dbus_paths (SecretCollection *collection,
                                         const SecretSchema *schema,
                                         GHashTable *attributes,
                                         GCancellable *cancellable,
                                         GAsyncReadyCallback callback,
                                         gpointer user_data)
{
	GSimpleAsyncResult *async;
	const gchar *schema_name = NULL;

	g_return_if_fail (SECRET_IS_COLLECTION (collection));
	g_return_if_fail (attributes != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return;

	if (schema != NULL && !(schema->flags & SECRET_SCHEMA_DONT_MATCH_NAME))
		schema_name = schema->name;

	async = g_simple_async_result_new (G_OBJECT (collection), callback, user_data,
	                                   secret_collection_search_for_dbus_paths);

	g_dbus_proxy_call (G_DBUS_PROXY (collection), "SearchItems",
	                   g_variant_new ("(@a{ss})", _secret_attributes_to_variant (attributes, schema_name)),
	                   G_DBUS_CALL_FLAGS_NONE, -1, cancellable,
	                   on_search_items_complete, g_object_ref (async));

	g_object_unref (async);
}

/**
 * secret_collection_search_for_dbus_paths_finish: (skip)
 * @collection: the secret collection
 * @result: asynchronous result passed to callback
 * @error: location to place error on failure
 *
 * Complete asynchronous operation to search for items in a collection.
 *
 * DBus object paths of the items will be returned. If you would to have
 * #SecretItem objects to be returned instead, then use the
 * secret_collection_search() and secret_collection_search_finish() functions.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full) (array zero-terminated=1): an array of DBus object
 *          paths for matching items.
 */
gchar **
secret_collection_search_for_dbus_paths_finish (SecretCollection *collection,
                                                GAsyncResult *result,
                                                GError **error)
{
	GVariant *retval;
	GSimpleAsyncResult *async;
	gchar **paths = NULL;

	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (collection),
	                      secret_collection_search_for_dbus_paths), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	async = G_SIMPLE_ASYNC_RESULT (result);
	if (_secret_util_propagate_error (async, error))
		return FALSE;

	retval= g_simple_async_result_get_op_res_gpointer (async);
	g_variant_get (retval, "(^ao)", &paths);
	return paths;
}

/**
 * secret_collection_search_for_dbus_paths_sync: (skip)
 * @collection: the secret collection
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): search for items matching these attributes
 * @cancellable: optional cancellation object
 * @error: location to place error on failure
 *
 * Search for items matching the @attributes in @collection, and return their
 * DBus object paths. The @attributes should be a table of string keys and
 * string values.
 *
 * This function may block indefinitely. Use the asynchronous version
 * in user interface threads.
 *
 * DBus object paths of the items will be returned. If you would to have
 * #SecretItem objects to be returned instead, then use the
 * secret_collection_search_sync() function.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full) (array zero-terminated=1): an array of DBus object
 *          paths for matching items.
 */
gchar **
secret_collection_search_for_dbus_paths_sync (SecretCollection *collection,
                                              const SecretSchema *schema,
                                              GHashTable *attributes,
                                              GCancellable *cancellable,
                                              GError **error)
{
	SecretSync *sync;
	gchar **paths;

	g_return_val_if_fail (SECRET_IS_COLLECTION (collection), NULL);
	g_return_val_if_fail (attributes != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_collection_search_for_dbus_paths (collection, schema, attributes, cancellable,
	                                         _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	paths = secret_collection_search_for_dbus_paths_finish (collection, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return paths;
}

/**
 * secret_service_search_for_dbus_paths: (skip)
 * @self: the secret service
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): search for items matching these attributes
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Search for items matching the @attributes, and return their D-Bus object paths.
 * All collections are searched. The @attributes should be a table of string keys
 * and string values.
 *
 * This function returns immediately and completes asynchronously.
 *
 * When your callback is called use secret_service_search_for_dbus_paths_finish()
 * to get the results of this function. Only the D-Bus object paths of the
 * items will be returned. If you would like #SecretItem objects to be returned
 * instead, then use the secret_service_search() function.
 *
 * Stability: Unstable
 */
void
secret_service_search_for_dbus_paths (SecretService *self,
                                      const SecretSchema *schema,
                                      GHashTable *attributes,
                                      GCancellable *cancellable,
                                      GAsyncReadyCallback callback,
                                      gpointer user_data)
{
	const gchar *schema_name = NULL;

	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (attributes != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return;

	if (schema != NULL && !(schema->flags & SECRET_SCHEMA_DONT_MATCH_NAME))
		schema_name = schema->name;

	_secret_service_search_for_paths_variant (self, _secret_attributes_to_variant (attributes, schema_name),
	                                          cancellable, callback, user_data);
}

void
_secret_service_search_for_paths_variant (SecretService *self,
                                          GVariant *attributes,
                                          GCancellable *cancellable,
                                          GAsyncReadyCallback callback,
                                          gpointer user_data)
{
	GSimpleAsyncResult *res;

	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (attributes != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	res = g_simple_async_result_new (G_OBJECT (self), callback, user_data,
	                                 secret_service_search_for_dbus_paths);

	g_dbus_proxy_call (G_DBUS_PROXY (self), "SearchItems",
	                   g_variant_new ("(@a{ss})", attributes),
	                   G_DBUS_CALL_FLAGS_NONE, -1, cancellable,
	                   on_search_items_complete, g_object_ref (res));

	g_object_unref (res);
}

/**
 * secret_service_search_for_dbus_paths_finish: (skip)
 * @self: the secret service
 * @result: asynchronous result passed to callback
 * @unlocked: (out) (transfer full) (array zero-terminated=1) (allow-none):
 *            location to place an array of D-Bus object paths for matching
 *            items which were locked.
 * @locked: (out) (transfer full) (array zero-terminated=1) (allow-none):
 *          location to place an array of D-Bus object paths for matching
 *          items which were locked.
 * @error: location to place error on failure
 *
 * Complete asynchronous operation to search for items, and return their
 * D-Bus object paths.
 *
 * Matching items that are locked or unlocked, have their D-Bus paths placed
 * in the @locked or @unlocked arrays respectively.
 *
 * D-Bus object paths of the items will be returned in the @unlocked or
 * @locked arrays. If you would to have #SecretItem objects to be returned
 * instead, then us the secret_service_search() and
 * secret_service_search_finish() functions.
 *
 * Stability: Unstable
 *
 * Returns: whether the search was successful or not
 */
gboolean
secret_service_search_for_dbus_paths_finish (SecretService *self,
                                             GAsyncResult *result,
                                             gchar ***unlocked,
                                             gchar ***locked,
                                             GError **error)
{
	GVariant *response;
	GSimpleAsyncResult *res;
	gchar **dummy = NULL;

	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (self),
	                      secret_service_search_for_dbus_paths), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	res = G_SIMPLE_ASYNC_RESULT (result);
	if (_secret_util_propagate_error (res, error))
		return FALSE;

	if (unlocked || locked) {
		if (!unlocked)
			unlocked = &dummy;
		else if (!locked)
			locked = &dummy;
		response = g_simple_async_result_get_op_res_gpointer (res);
		g_variant_get (response, "(^ao^ao)", unlocked, locked);
	}

	g_strfreev (dummy);
	return TRUE;
}

/**
 * secret_service_search_for_dbus_paths_sync: (skip)
 * @self: the secret service
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): search for items matching these attributes
 * @cancellable: optional cancellation object
 * @unlocked: (out) (transfer full) (array zero-terminated=1) (allow-none):
 *            location to place an array of D-Bus object paths for matching
 *            items which were locked.
 * @locked: (out) (transfer full) (array zero-terminated=1) (allow-none):
 *          location to place an array of D-Bus object paths for matching
 *          items which were locked.
 * @error: location to place error on failure
 *
 * Search for items matching the @attributes, and return their D-Bus object
 * paths. All collections are searched. The @attributes should be a table of
 * string keys and string values.
 *
 * This function may block indefinitely. Use the asynchronous version
 * in user interface threads.
 *
 * Matching items that are locked or unlocked, have their D-Bus paths placed
 * in the @locked or @unlocked arrays respectively.
 *
 * D-Bus object paths of the items will be returned in the @unlocked or
 * @locked arrays. If you would to have #SecretItem objects to be returned
 * instead, then use the secret_service_search_sync() function.
 *
 * Stability: Unstable
 *
 * Returns: whether the search was successful or not
 */
gboolean
secret_service_search_for_dbus_paths_sync (SecretService *self,
                                           const SecretSchema *schema,
                                           GHashTable *attributes,
                                           GCancellable *cancellable,
                                           gchar ***unlocked,
                                           gchar ***locked,
                                           GError **error)
{
	const gchar *schema_name = NULL;
	gchar **dummy = NULL;
	GVariant *response;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), FALSE);
	g_return_val_if_fail (attributes != NULL, FALSE);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return FALSE;

	if (schema != NULL && !(schema->flags & SECRET_SCHEMA_DONT_MATCH_NAME))
		schema_name = schema->name;

	response = g_dbus_proxy_call_sync (G_DBUS_PROXY (self), "SearchItems",
	                                   g_variant_new ("(@a{ss})",
	                                                  _secret_attributes_to_variant (attributes, schema_name)),
	                                   G_DBUS_CALL_FLAGS_NONE, -1, cancellable, error);

	if (response != NULL) {
		if (unlocked || locked) {
			if (!unlocked)
				unlocked = &dummy;
			else if (!locked)
				locked = &dummy;
			g_variant_get (response, "(^ao^ao)", unlocked, locked);
		}

		g_variant_unref (response);
	}

	g_strfreev (dummy);

	return response != NULL;
}

typedef struct {
	GCancellable *cancellable;
	GVariant *in;
	GVariant *out;
	GHashTable *items;
} GetClosure;

static void
get_closure_free (gpointer data)
{
	GetClosure *closure = data;
	if (closure->in)
		g_variant_unref (closure->in);
	if (closure->out)
		g_variant_unref (closure->out);
	g_clear_object (&closure->cancellable);
	g_slice_free (GetClosure, closure);
}

static void
on_get_secrets_complete (GObject *source,
                         GAsyncResult *result,
                         gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	GetClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	GError *error = NULL;

	closure->out = g_dbus_proxy_call_finish (G_DBUS_PROXY (source), result, &error);
	if (error != NULL) {
		g_simple_async_result_take_error (res, error);
	}
	g_simple_async_result_complete (res);

	g_object_unref (res);
}

static void
on_get_secrets_session (GObject *source,
                        GAsyncResult *result,
                        gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	GetClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	GError *error = NULL;
	const gchar *session;

	secret_service_ensure_session_finish (SECRET_SERVICE (source), result, &error);
	if (error != NULL) {
		g_simple_async_result_take_error (res, error);
		g_simple_async_result_complete (res);
	} else {
		session = secret_service_get_session_dbus_path (SECRET_SERVICE (source));
		g_dbus_proxy_call (G_DBUS_PROXY (source), "GetSecrets",
		                   g_variant_new ("(@aoo)", closure->in, session),
		                   G_DBUS_CALL_FLAGS_NO_AUTO_START, -1,
		                   closure->cancellable, on_get_secrets_complete,
		                   g_object_ref (res));
	}

	g_object_unref (res);
}

/**
 * secret_service_get_secret_for_dbus_path: (skip)
 * @self: the secret service
 * @item_path: the D-Bus path to item to retrieve secret for
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Get the secret value for a secret item stored in the service.
 *
 * The item is represented by its D-Bus object path. If you already have a
 * #SecretItem proxy object, use use secret_item_get_secret() to more simply
 * get its secret value.
 *
 * This function returns immediately and completes asynchronously.
 *
 * Stability: Unstable
 */
void
secret_service_get_secret_for_dbus_path (SecretService *self,
                                         const gchar *item_path,
                                         GCancellable *cancellable,
                                         GAsyncReadyCallback callback,
                                         gpointer user_data)
{
	GSimpleAsyncResult *res;
	GetClosure *closure;

	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (item_path != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	res = g_simple_async_result_new (G_OBJECT (self), callback, user_data,
	                                 secret_service_get_secret_for_dbus_path);

	closure = g_slice_new0 (GetClosure);
	closure->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	closure->in = g_variant_ref_sink (g_variant_new_objv (&item_path, 1));
	g_simple_async_result_set_op_res_gpointer (res, closure, get_closure_free);

	secret_service_ensure_session (self, cancellable,
	                               on_get_secrets_session,
	                               g_object_ref (res));

	g_object_unref (res);
}

/**
 * secret_service_get_secret_for_dbus_path_finish: (skip)
 * @self: the secret service
 * @result: asynchronous result passed to callback
 * @error: location to place an error on failure
 *
 * Complete asynchronous operation to get the secret value for an
 * secret item stored in the service.
 *
 * Will return %NULL if the item is locked.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full) (allow-none): the newly allocated secret value
 *          for the item, which should be released with secret_value_unref()
 */
SecretValue *
secret_service_get_secret_for_dbus_path_finish (SecretService *self,
                                                GAsyncResult *result,
                                                GError **error)
{
	GSimpleAsyncResult *res;
	GetClosure *closure;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), NULL);
	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (self),
	                      secret_service_get_secret_for_dbus_path), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	res = G_SIMPLE_ASYNC_RESULT (result);
	if (_secret_util_propagate_error (res, error))
		return NULL;

	closure = g_simple_async_result_get_op_res_gpointer (res);
	return _secret_service_decode_get_secrets_first (self, closure->out);
}

/**
 * secret_service_get_secret_for_dbus_path_sync: (skip)
 * @self: the secret service
 * @item_path: the D-Bus path to item to retrieve secret for
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Get the secret value for a secret item stored in the service.
 *
 * The item is represented by its D-Bus object path. If you already have a
 * #SecretItem proxy object, use use secret_item_load_secret_sync() to more simply
 * get its secret value.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Will return %NULL if the item is locked.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full) (allow-none): the newly allocated secret value
 *          for the item, which should be released with secret_value_unref()
 */
SecretValue *
secret_service_get_secret_for_dbus_path_sync (SecretService *self,
                                              const gchar *item_path,
                                              GCancellable *cancellable,
                                              GError **error)
{
	SecretSync *sync;
	SecretValue *value;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), NULL);
	g_return_val_if_fail (item_path != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_get_secret_for_dbus_path (self, item_path, cancellable,
	                                         _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	value = secret_service_get_secret_for_dbus_path_finish (self, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return value;
}

/**
 * secret_service_get_secrets_for_dbus_paths: (skip)
 * @self: the secret service
 * @item_paths: the D-Bus paths to items to retrieve secrets for
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Get the secret values for a secret item stored in the service.
 *
 * The items are represented by their D-Bus object paths. If you already have
 * #SecretItem proxy objects, use use secret_item_load_secrets() to more simply
 * get their secret values.
 *
 * This function returns immediately and completes asynchronously.
 *
 * Stability: Unstable
 */
void
secret_service_get_secrets_for_dbus_paths (SecretService *self,
                                           const gchar **item_paths,
                                           GCancellable *cancellable,
                                           GAsyncReadyCallback callback,
                                           gpointer user_data)
{
	GSimpleAsyncResult *res;
	GetClosure *closure;

	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (item_paths != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	res = g_simple_async_result_new (G_OBJECT (self), callback, user_data,
	                                 secret_service_get_secret_for_dbus_path);

	closure = g_slice_new0 (GetClosure);
	closure->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	closure->in = g_variant_ref_sink (g_variant_new_objv (item_paths, -1));
	g_simple_async_result_set_op_res_gpointer (res, closure, get_closure_free);

	secret_service_ensure_session (self, cancellable,
	                               on_get_secrets_session,
	                               g_object_ref (res));

	g_object_unref (res);
}

/**
 * secret_service_get_secrets_for_dbus_paths_finish: (skip)
 * @self: the secret service
 * @result: asynchronous result passed to callback
 * @error: location to place an error on failure
 *
 * Complete asynchronous operation to get the secret values for an
 * secret items stored in the service.
 *
 * Items that are locked will not be included the results.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full) (element-type utf8 Secret.Value): a newly
 *          allocated hash table of item_path keys to #SecretValue
 *          values.
 */
GHashTable *
secret_service_get_secrets_for_dbus_paths_finish (SecretService *self,
                                                  GAsyncResult *result,
                                                  GError **error)
{
	GSimpleAsyncResult *res;
	GetClosure *closure;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), NULL);
	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (self),
	                      secret_service_get_secret_for_dbus_path), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	res = G_SIMPLE_ASYNC_RESULT (result);
	if (_secret_util_propagate_error (res, error))
		return NULL;

	closure = g_simple_async_result_get_op_res_gpointer (res);
	return _secret_service_decode_get_secrets_all (self, closure->out);
}

/**
 * secret_service_get_secrets_for_dbus_paths_sync: (skip)
 * @self: the secret service
 * @item_paths: the D-Bus paths to items to retrieve secrets for
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Get the secret values for a secret item stored in the service.
 *
 * The items are represented by their D-Bus object paths. If you already have
 * #SecretItem proxy objects, use use secret_item_load_secrets_sync() to more
 * simply get their secret values.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Items that are locked will not be included the results.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full) (element-type utf8 Secret.Value): a newly
 *          allocated hash table of item_path keys to #SecretValue
 *          values.
 */
GHashTable *
secret_service_get_secrets_for_dbus_paths_sync (SecretService *self,
                                                const gchar **item_paths,
                                                GCancellable *cancellable,
                                                GError **error)
{
	SecretSync *sync;
	GHashTable *secrets;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), NULL);
	g_return_val_if_fail (item_paths != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_get_secrets_for_dbus_paths (self, item_paths, cancellable,
	                                           _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	secrets = secret_service_get_secrets_for_dbus_paths_finish (self, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return secrets;
}


typedef struct {
	GCancellable *cancellable;
	SecretPrompt *prompt;
	GPtrArray *xlocked;
} XlockClosure;

static void
xlock_closure_free (gpointer data)
{
	XlockClosure *closure = data;
	g_clear_object (&closure->cancellable);
	g_clear_object (&closure->prompt);
	if (closure->xlocked)
		g_ptr_array_unref (closure->xlocked);
	g_slice_free (XlockClosure, closure);
}

static void
on_xlock_prompted (GObject *source,
                   GAsyncResult *result,
                   gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	XlockClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	SecretService *self = SECRET_SERVICE (source);
	GError *error = NULL;
	GVariantIter iter;
	GVariant *retval;
	gchar *path;

	retval = secret_service_prompt_finish (self, result, &error);
	if (error != NULL)
		g_simple_async_result_take_error (res, error);

	if (retval != NULL) {
		g_variant_iter_init (&iter, retval);
		while (g_variant_iter_loop (&iter, "o", &path))
			g_ptr_array_add (closure->xlocked, g_strdup (path));
		g_variant_unref (retval);
	}

	g_simple_async_result_complete (res);
	g_object_unref (res);
}

static void
on_xlock_called (GObject *source,
                 GAsyncResult *result,
                 gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	XlockClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	SecretService *self = SECRET_SERVICE (g_async_result_get_source_object (user_data));
	const gchar *prompt = NULL;
	gchar **xlocked = NULL;
	GError *error = NULL;
	GVariant *retval;
	guint i;

	retval = g_dbus_proxy_call_finish (G_DBUS_PROXY (source), result, &error);
	if (error != NULL) {
		g_simple_async_result_take_error (res, error);
		g_simple_async_result_complete (res);

	} else {
		g_variant_get (retval, "(^ao&o)", &xlocked, &prompt);

		if (_secret_util_empty_path (prompt)) {
			for (i = 0; xlocked[i]; i++)
				g_ptr_array_add (closure->xlocked, g_strdup (xlocked[i]));
			g_simple_async_result_complete (res);

		} else {
			closure->prompt = _secret_prompt_instance (self, prompt);
			secret_service_prompt (self, closure->prompt, G_VARIANT_TYPE ("ao"),
			                       closure->cancellable, on_xlock_prompted, g_object_ref (res));
		}

		g_strfreev (xlocked);
		g_variant_unref (retval);
	}

	g_object_unref (self);
	g_object_unref (res);
}

void
_secret_service_xlock_paths_async (SecretService *self,
                                   const gchar *method,
                                   const gchar **paths,
                                   GCancellable *cancellable,
                                   GAsyncReadyCallback callback,
                                   gpointer user_data)
{
	GSimpleAsyncResult *res;
	XlockClosure *closure;

	res = g_simple_async_result_new (G_OBJECT (self), callback, user_data,
	                                 _secret_service_xlock_paths_async);
	closure = g_slice_new0 (XlockClosure);
	closure->cancellable = cancellable ? g_object_ref (cancellable) : cancellable;
	closure->xlocked = g_ptr_array_new_with_free_func (g_free);
	g_simple_async_result_set_op_res_gpointer (res, closure, xlock_closure_free);

	g_dbus_proxy_call (G_DBUS_PROXY (self), method,
	                   g_variant_new ("(@ao)", g_variant_new_objv (paths, -1)),
	                   G_DBUS_CALL_FLAGS_NO_AUTO_START, -1,
	                   cancellable, on_xlock_called, g_object_ref (res));

	g_object_unref (res);
}

gint
_secret_service_xlock_paths_finish (SecretService *self,
                                    GAsyncResult *result,
                                    gchar ***xlocked,
                                    GError **error)
{
	GSimpleAsyncResult *res;
	XlockClosure *closure;
	gint count;

	res = G_SIMPLE_ASYNC_RESULT (result);
	if (_secret_util_propagate_error (res, error))
		return -1;

	closure = g_simple_async_result_get_op_res_gpointer (res);
	count = closure->xlocked->len;

	if (xlocked != NULL) {
		g_ptr_array_add (closure->xlocked, NULL);
		*xlocked = (gchar **)g_ptr_array_free (closure->xlocked, FALSE);
		closure->xlocked = NULL;
	}

	return count;
}

/**
 * secret_service_lock_dbus_paths_sync: (skip)
 * @self: the secret service
 * @paths: the D-Bus object paths of the items or collections to lock
 * @cancellable: optional cancellation object
 * @locked: (out) (array zero-terminated=1) (transfer full) (allow-none):
 *          location to place array of D-Bus paths of items or collections
 *          that were locked
 * @error: location to place an error on failure
 *
 * Lock items or collections in the secret service.
 *
 * The items or collections are represented by their D-Bus object paths. If you
 * already have #SecretItem and #SecretCollection proxy objects, use use
 * secret_service_lock_sync() instead.
 *
 * The secret service may not be able to lock items individually, and may
 * lock an entire collection instead.
 *
 * This method may block indefinitely and should not be used in user
 * interface threads. The secret service may prompt the user.
 * secret_service_prompt() will be used to handle any prompts that show up.
 *
 * Stability: Unstable
 *
 * Returns: the number of items or collections that were locked
 */
gint
secret_service_lock_dbus_paths_sync (SecretService *self,
                                     const gchar **paths,
                                     GCancellable *cancellable,
                                     gchar ***locked,
                                     GError **error)
{
	SecretSync *sync;
	gint count;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), -1);
	g_return_val_if_fail (paths != NULL, -1);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), -1);
	g_return_val_if_fail (error == NULL || *error == NULL, -1);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_lock_dbus_paths (self, paths, cancellable,
	                                _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	count = secret_service_lock_dbus_paths_finish (self, sync->result,
	                                               locked, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return count;
}

/**
 * secret_service_lock_dbus_paths: (skip)
 * @self: the secret service
 * @paths: the D-Bus paths for items or collections to lock
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Lock items or collections in the secret service.
 *
 * The items or collections are represented by their D-Bus object paths. If you
 * already have #SecretItem and #SecretCollection proxy objects, use use
 * secret_service_lock() instead.
 *
 * The secret service may not be able to lock items individually, and may
 * lock an entire collection instead.
 *
 * This method returns immediately and completes asynchronously. The secret
 * service may prompt the user. secret_service_prompt() will be used to handle
 * any prompts that show up.
 *
 * Stability: Unstable
 */
void
secret_service_lock_dbus_paths (SecretService *self,
                                const gchar **paths,
                                GCancellable *cancellable,
                                GAsyncReadyCallback callback,
                                gpointer user_data)
{
	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (paths != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	_secret_service_xlock_paths_async (self, "Lock", paths, cancellable,
	                                   callback, user_data);
}

/**
 * secret_service_lock_dbus_paths_finish: (skip)
 * @self: the secret service
 * @result: asynchronous result passed to the callback
 * @locked: (out) (array zero-terminated=1) (transfer full) (allow-none):
 *          location to place array of D-Bus paths of items or collections
 *          that were locked
 * @error: location to place an error on failure
 *
 * Complete asynchronous operation to lock items or collections in the secret
 * service.
 *
 * The secret service may not be able to lock items individually, and may
 * lock an entire collection instead.
 *
 * Stability: Unstable
 *
 * Returns: the number of items or collections that were locked
 */
gint
secret_service_lock_dbus_paths_finish (SecretService *self,
                                       GAsyncResult *result,
                                       gchar ***locked,
                                       GError **error)
{
	g_return_val_if_fail (SECRET_IS_SERVICE (self), -1);
	g_return_val_if_fail (locked != NULL, -1);
	g_return_val_if_fail (error == NULL || *error == NULL, -1);

	return _secret_service_xlock_paths_finish (self, result, locked, error);
}

/**
 * secret_service_unlock_dbus_paths_sync: (skip)
 * @self: the secret service
 * @paths: the D-Bus object paths of the items or collections to unlock
 * @cancellable: optional cancellation object
 * @unlocked: (out) (array zero-terminated=1) (transfer full) (allow-none):
 *            location to place array of D-Bus paths of items or collections
 *            that were unlocked
 * @error: location to place an error on failure
 *
 * Unlock items or collections in the secret service.
 *
 * The items or collections are represented by their D-Bus object paths. If you
 * already have #SecretItem and #SecretCollection proxy objects, use use
 * secret_service_unlock_sync() instead.
 *
 * The secret service may not be able to unlock items individually, and may
 * unlock an entire collection instead.
 *
 * This method may block indefinitely and should not be used in user
 * interface threads. The secret service may prompt the user.
 * secret_service_prompt() will be used to handle any prompts that show up.
 *
 * Stability: Unstable
 *
 * Returns: the number of items or collections that were unlocked
 */
gint
secret_service_unlock_dbus_paths_sync (SecretService *self,
                                       const gchar **paths,
                                       GCancellable *cancellable,
                                       gchar ***unlocked,
                                       GError **error)
{
	SecretSync *sync;
	gint count;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), -1);
	g_return_val_if_fail (paths != NULL, -1);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), -1);
	g_return_val_if_fail (error == NULL || *error == NULL, -1);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_unlock_dbus_paths (self, paths, cancellable,
	                                  _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	count = secret_service_unlock_dbus_paths_finish (self, sync->result,
	                                                 unlocked, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return count;
}

/**
 * secret_service_unlock_dbus_paths: (skip)
 * @self: the secret service
 * @paths: the D-Bus paths for items or collections to unlock
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Unlock items or collections in the secret service.
 *
 * The items or collections are represented by their D-Bus object paths. If you
 * already have #SecretItem and #SecretCollection proxy objects, use use
 * secret_service_unlock() instead.
 *
 * The secret service may not be able to unlock items individually, and may
 * unlock an entire collection instead.
 *
 * This method returns immediately and completes asynchronously. The secret
 * service may prompt the user. secret_service_prompt() will be used to handle
 * any prompts that show up.
 *
 * Stability: Unstable
 */
void
secret_service_unlock_dbus_paths (SecretService *self,
                                  const gchar **paths,
                                  GCancellable *cancellable,
                                  GAsyncReadyCallback callback,
                                  gpointer user_data)
{
	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (paths != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	_secret_service_xlock_paths_async (self, "Unlock",
	                                   paths, cancellable,
	                                   callback, user_data);
}

/**
 * secret_service_unlock_dbus_paths_finish: (skip)
 * @self: the secret service
 * @result: asynchronous result passed to the callback
 * @unlocked: (out) (array zero-terminated=1) (transfer full) (allow-none):
 *            location to place array of D-Bus paths of items or collections
 *            that were unlocked
 * @error: location to place an error on failure
 *
 * Complete asynchronous operation to unlock items or collections in the secret
 * service.
 *
 * The secret service may not be able to unlock items individually, and may
 * unlock an entire collection instead.
 *
 * Stability: Unstable
 *
 * Returns: the number of items or collections that were unlocked
 */
gint
secret_service_unlock_dbus_paths_finish (SecretService *self,
                                         GAsyncResult *result,
                                         gchar ***unlocked,
                                         GError **error)
{
	g_return_val_if_fail (SECRET_IS_SERVICE (self), -1);
	g_return_val_if_fail (error == NULL || *error == NULL, -1);

	return _secret_service_xlock_paths_finish (self, result,
	                                           unlocked, error);
}

typedef struct {
	GCancellable *cancellable;
	SecretPrompt *prompt;
	gboolean deleted;
} DeleteClosure;

static void
delete_closure_free (gpointer data)
{
	DeleteClosure *closure = data;
	g_clear_object (&closure->prompt);
	g_clear_object (&closure->cancellable);
	g_slice_free (DeleteClosure, closure);
}

static void
on_delete_prompted (GObject *source,
                    GAsyncResult *result,
                    gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	DeleteClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	GError *error = NULL;
	GVariant *retval;

	retval = secret_service_prompt_finish (SECRET_SERVICE (source), result,
	                                       &error);

	if (error == NULL)
		closure->deleted = TRUE;
	else
		g_simple_async_result_take_error (res, error);
	if (retval != NULL)
		g_variant_unref (retval);
	g_simple_async_result_complete (res);
	g_object_unref (res);
}

static void
on_delete_complete (GObject *source,
                    GAsyncResult *result,
                    gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	DeleteClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	SecretService *self = SECRET_SERVICE (g_async_result_get_source_object (user_data));
	const gchar *prompt_path;
	GError *error = NULL;
	GVariant *retval;

	retval = g_dbus_connection_call_finish (G_DBUS_CONNECTION (source), result, &error);
	if (error == NULL) {
		g_variant_get (retval, "(&o)", &prompt_path);

		if (_secret_util_empty_path (prompt_path)) {
			closure->deleted = TRUE;
			g_simple_async_result_complete (res);

		} else {
			closure->prompt = _secret_prompt_instance (self, prompt_path);

			secret_service_prompt (self, closure->prompt, NULL,
			                       closure->cancellable,
			                       on_delete_prompted,
			                       g_object_ref (res));
		}

		g_variant_unref (retval);

	} else {
		g_simple_async_result_take_error (res, error);
		g_simple_async_result_complete (res);
	}

	g_object_unref (self);
	g_object_unref (res);
}

void
_secret_service_delete_path (SecretService *self,
                             const gchar *object_path,
                             gboolean is_an_item,
                             GCancellable *cancellable,
                             GAsyncReadyCallback callback,
                             gpointer user_data)
{
	GSimpleAsyncResult *res;
	DeleteClosure *closure;

	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (object_path != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	res = g_simple_async_result_new (G_OBJECT (self), callback, user_data,
	                                 _secret_service_delete_path);
	closure = g_slice_new0 (DeleteClosure);
	closure->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	g_simple_async_result_set_op_res_gpointer (res, closure, delete_closure_free);

	g_dbus_connection_call (g_dbus_proxy_get_connection (G_DBUS_PROXY (self)),
	                        g_dbus_proxy_get_name (G_DBUS_PROXY (self)), object_path,
	                        is_an_item ? SECRET_ITEM_INTERFACE : SECRET_COLLECTION_INTERFACE,
	                        "Delete", g_variant_new ("()"), G_VARIANT_TYPE ("(o)"),
	                        G_DBUS_CALL_FLAGS_NO_AUTO_START, -1,
	                        cancellable, on_delete_complete, g_object_ref (res));

	g_object_unref (res);
}

gboolean
_secret_service_delete_path_finish (SecretService *self,
                                    GAsyncResult *result,
                                    GError **error)
{
	GSimpleAsyncResult *res;
	DeleteClosure *closure;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);
	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (self),
	                      _secret_service_delete_path), FALSE);

	res = G_SIMPLE_ASYNC_RESULT (result);
	if (_secret_util_propagate_error (res, error))
		return FALSE;

	closure = g_simple_async_result_get_op_res_gpointer (res);
	return closure->deleted;
}

/**
 * secret_service_delete_item_dbus_path: (skip)
 * @self: the secret service
 * @item_path: the D-Bus path of item to delete
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Delete a secret item from the secret service.
 *
 * The item is represented by its D-Bus object path. If you already have a
 * #SecretItem proxy objects, use use secret_item_delete() instead.
 *
 * This method will return immediately and complete asynchronously.
 *
 * Stability: Unstable
 */
void
secret_service_delete_item_dbus_path (SecretService *self,
                                      const gchar *item_path,
                                      GCancellable *cancellable,
                                      GAsyncReadyCallback callback,
                                      gpointer user_data)
{
	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (item_path != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	_secret_service_delete_path (self, item_path, TRUE, cancellable, callback, user_data);
}

/**
 * secret_service_delete_item_dbus_path_finish: (skip)
 * @self: the secret service
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Complete an asynchronous operation to delete a secret item from the secret
 * service.
 *
 * Stability: Unstable
 *
 * Returns: whether the deletion was successful or not
 */
gboolean
secret_service_delete_item_dbus_path_finish (SecretService *self,
                                             GAsyncResult *result,
                                             GError **error)
{
	g_return_val_if_fail (SECRET_IS_SERVICE (self), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);
	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (self),
	                      _secret_service_delete_path), FALSE);

	return _secret_service_delete_path_finish (self, result, error);
}

/**
 * secret_service_delete_item_dbus_path_sync: (skip)
 * @self: the secret service
 * @item_path: the D-Bus path of item to delete
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Delete a secret item from the secret service.
 *
 * The item is represented by its D-Bus object path. If you already have a
 * #SecretItem proxy objects, use use secret_item_delete_sync() instead.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Stability: Unstable
 *
 * Returns: whether the deletion was successful or not
 */
gboolean
secret_service_delete_item_dbus_path_sync (SecretService *self,
                                           const gchar *item_path,
                                           GCancellable *cancellable,
                                           GError **error)
{
	SecretSync *sync;
	gboolean result;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), FALSE);
	g_return_val_if_fail (item_path != NULL, FALSE);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_delete_item_dbus_path (self, item_path, cancellable,
	                                      _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	result = secret_service_delete_item_dbus_path_finish (self, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return result;
}

typedef struct {
	GCancellable *cancellable;
	SecretPrompt *prompt;
	gchar *collection_path;
} CollectionClosure;

static void
collection_closure_free (gpointer data)
{
	CollectionClosure *closure = data;
	g_clear_object (&closure->cancellable);
	g_clear_object (&closure->prompt);
	g_free (closure->collection_path);
	g_slice_free (CollectionClosure, closure);
}

static void
on_create_collection_prompt (GObject *source,
                             GAsyncResult *result,
                             gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	CollectionClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	GError *error = NULL;
	GVariant *value;

	value = secret_service_prompt_finish (SECRET_SERVICE (source), result, &error);
	if (error != NULL)
		g_simple_async_result_take_error (res, error);
	if (value != NULL) {
		closure->collection_path = g_variant_dup_string (value, NULL);
		g_variant_unref (value);
	}

	g_simple_async_result_complete (res);
	g_object_unref (res);
}

static void
on_create_collection_called (GObject *source,
                             GAsyncResult *result,
                             gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	CollectionClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	SecretService *self = SECRET_SERVICE (g_async_result_get_source_object (user_data));
	const gchar *prompt_path = NULL;
	const gchar *collection_path = NULL;
	GError *error = NULL;
	GVariant *retval;

	retval = g_dbus_connection_call_finish (G_DBUS_CONNECTION (source), result, &error);
	if (error == NULL) {
		g_variant_get (retval, "(&o&o)", &collection_path, &prompt_path);
		if (!_secret_util_empty_path (prompt_path)) {
			closure->prompt = _secret_prompt_instance (self, prompt_path);
			secret_service_prompt (self, closure->prompt, G_VARIANT_TYPE ("o"),
			                       closure->cancellable, on_create_collection_prompt,
			                       g_object_ref (res));

		} else {
			closure->collection_path = g_strdup (collection_path);
			g_simple_async_result_complete (res);
		}

		g_variant_unref (retval);

	} else {
		g_simple_async_result_take_error (res, error);
		g_simple_async_result_complete (res);
	}

	g_object_unref (self);
	g_object_unref (res);
}

/**
 * secret_service_create_collection_dbus_path: (skip)
 * @self: a secret service object
 * @properties: (element-type utf8 GLib.Variant): hash table of properties for
 *              the new collection
 * @alias: (allow-none): an alias to check for before creating the new
 *         collection, or to assign to the new collection
 * @flags: not currently used
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Create a new collection in the secret service, and return its path.
 *
 * Using this method requires that you setup a correct hash table of D-Bus
 * properties for the new collection. You may prefer to use
 * secret_collection_create() which does handles this for you.
 *
 * An @alias is a well-known tag for a collection, such as 'default' (ie: the
 * default collection to store items in). This allows other applications to
 * easily identify and share a collection. If a collection with the @alias
 * already exists, then instead of creating a new collection, the existing
 * collection will be returned. If no collection with this alias exists, then a
 * new collection will be created and this alias will be assigned to it.
 *
 * @properties is a set of properties for the new collection. The keys in the
 * hash table should be interface.property strings like
 * <literal>org.freedesktop.Secret.Collection.Label</literal>. The values
 * in the hash table should be #GVariant values of the properties.
 *
 * If you wish to have a
 *
 * This method will return immediately and complete asynchronously. The secret
 * service may prompt the user. secret_service_prompt() will be used to handle
 * any prompts that are required.
 *
 * Stability: Unstable
 */
void
secret_service_create_collection_dbus_path (SecretService *self,
                                            GHashTable *properties,
                                            const gchar *alias,
                                            SecretCollectionCreateFlags flags,
                                            GCancellable *cancellable,
                                            GAsyncReadyCallback callback,
                                            gpointer user_data)
{
	GSimpleAsyncResult *res;
	CollectionClosure *closure;
	GVariant *params;
	GVariant *props;
	GDBusProxy *proxy;

	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (properties != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	if (alias == NULL)
		alias = "";

	res = g_simple_async_result_new (G_OBJECT (self), callback, user_data,
	                                 secret_service_create_collection_dbus_path);
	closure = g_slice_new0 (CollectionClosure);
	closure->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	g_simple_async_result_set_op_res_gpointer (res, closure, collection_closure_free);

	props = _secret_util_variant_for_properties (properties);
	params = g_variant_new ("(@a{sv}s)", props, alias);
	proxy = G_DBUS_PROXY (self);

	g_dbus_connection_call (g_dbus_proxy_get_connection (proxy),
	                        g_dbus_proxy_get_name (proxy),
	                        g_dbus_proxy_get_object_path (proxy),
	                        SECRET_SERVICE_INTERFACE,
	                        "CreateCollection", params, G_VARIANT_TYPE ("(oo)"),
	                        G_DBUS_CALL_FLAGS_NONE, -1,
	                        closure->cancellable,
	                        on_create_collection_called,
	                        g_object_ref (res));

	g_object_unref (res);

}

/**
 * secret_service_create_collection_dbus_path_finish: (skip)
 * @self: a secret service object
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Finish asynchronous operation to create a new collection in the secret
 * service.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full): a new string containing the D-Bus object path
 *          of the collection
 */
gchar *
secret_service_create_collection_dbus_path_finish (SecretService *self,
                                                   GAsyncResult *result,
                                                   GError **error)
{
	GSimpleAsyncResult *res;
	CollectionClosure *closure;
	gchar *path;

	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (self),
	                      secret_service_create_collection_dbus_path), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	res = G_SIMPLE_ASYNC_RESULT (result);

	if (_secret_util_propagate_error (res, error))
		return NULL;

	closure = g_simple_async_result_get_op_res_gpointer (res);
	path = closure->collection_path;
	closure->collection_path = NULL;
	return path;
}

/**
 * secret_service_create_collection_dbus_path_sync: (skip)
 * @self: a secret service object
 * @properties: (element-type utf8 GLib.Variant): hash table of D-Bus properties
 *              for the new collection
 * @alias: (allow-none): an alias to check for before creating the new
 *         collection, or to assign to the new collection
 * @flags: not currently used
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Create a new collection in the secret service and return its path.
 *
 * Using this method requires that you setup a correct hash table of D-Bus
 * properties for the new collection. You may prefer to use
 * secret_collection_create() which does handles this for you.
 *
 * An @alias is a well-known tag for a collection, such as 'default' (ie: the
 * default collection to store items in). This allows other applications to
 * easily identify and share a collection. If a collection with the @alias
 * already exists, then instead of creating a new collection, the existing
 * collection will be returned. If no collection with this alias exists, then
 * a new collection will be created and this alias will be assigned to it.
 *
 * @properties is a set of properties for the new collection. The keys in the
 * hash table should be interface.property strings like
 * <literal>org.freedesktop.Secret.Collection.Label</literal>. The values
 * in the hash table should be #GVariant values of the properties.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads. The secret service may prompt the user. secret_service_prompt()
 * will be used to handle any prompts that are required.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full): a new string containing the D-Bus object path
 *          of the collection
 */
gchar *
secret_service_create_collection_dbus_path_sync (SecretService *self,
                                                 GHashTable *properties,
                                                 const gchar *alias,
                                                 SecretCollectionCreateFlags flags,
                                                 GCancellable *cancellable,
                                                 GError **error)
{
	SecretSync *sync;
	gchar *path;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), NULL);
	g_return_val_if_fail (properties != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_create_collection_dbus_path (self, properties, alias, flags, cancellable,
	                                            _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	path = secret_service_create_collection_dbus_path_finish (self, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return path;
}

typedef struct {
	GCancellable *cancellable;
	GVariant *properties;
	SecretValue *value;
	gboolean replace;
	gchar *collection_path;
	SecretPrompt *prompt;
	gchar *item_path;
} ItemClosure;

static void
item_closure_free (gpointer data)
{
	ItemClosure *closure = data;
	g_free (closure->item_path);
	g_variant_unref (closure->properties);
	secret_value_unref (closure->value);
	g_clear_object (&closure->cancellable);
	g_free (closure->collection_path);
	g_clear_object (&closure->prompt);
	g_slice_free (ItemClosure, closure);
}

static void
on_create_item_prompt (GObject *source,
                       GAsyncResult *result,
                       gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	ItemClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	GError *error = NULL;
	GVariant *value;

	value = secret_service_prompt_finish (SECRET_SERVICE (source), result, &error);
	if (error != NULL)
		g_simple_async_result_take_error (res, error);
	if (value != NULL) {
		closure->item_path = g_variant_dup_string (value, NULL);
		g_variant_unref (value);
	}

	g_simple_async_result_complete (res);
	g_object_unref (res);
}

static void
on_create_item_called (GObject *source,
                       GAsyncResult *result,
                       gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	ItemClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	SecretService *self = SECRET_SERVICE (g_async_result_get_source_object (user_data));
	const gchar *prompt_path = NULL;
	const gchar *item_path = NULL;
	GError *error = NULL;
	GVariant *retval;

	retval = g_dbus_connection_call_finish (G_DBUS_CONNECTION (source), result, &error);
	if (error == NULL) {
		g_variant_get (retval, "(&o&o)", &item_path, &prompt_path);
		if (!_secret_util_empty_path (prompt_path)) {
			closure->prompt = _secret_prompt_instance (self, prompt_path);
			secret_service_prompt (self, closure->prompt, G_VARIANT_TYPE ("o"),
			                       closure->cancellable, on_create_item_prompt,
			                       g_object_ref (res));

		} else {
			closure->item_path = g_strdup (item_path);
			g_simple_async_result_complete (res);
		}

		g_variant_unref (retval);

	} else {
		g_simple_async_result_take_error (res, error);
		g_simple_async_result_complete (res);
	}

	g_object_unref (self);
	g_object_unref (res);
}

static void
on_create_item_session (GObject *source,
                        GAsyncResult *result,
                        gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	ItemClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	SecretService *self = SECRET_SERVICE (source);
	SecretSession *session;
	GVariant *params;
	GError *error = NULL;
	GDBusProxy *proxy;

	secret_service_ensure_session_finish (self, result, &error);
	if (error == NULL) {
		session = _secret_service_get_session (self);
		params = g_variant_new ("(@a{sv}@(oayays)b)",
		                        closure->properties,
		                        _secret_session_encode_secret (session, closure->value),
		                        closure->replace);

		proxy = G_DBUS_PROXY (self);
		g_dbus_connection_call (g_dbus_proxy_get_connection (proxy),
		                        g_dbus_proxy_get_name (proxy),
		                        closure->collection_path,
		                        SECRET_COLLECTION_INTERFACE,
		                        "CreateItem", params, G_VARIANT_TYPE ("(oo)"),
		                        G_DBUS_CALL_FLAGS_NONE, -1,
		                        closure->cancellable,
		                        on_create_item_called,
		                        g_object_ref (res));
	} else {
		g_simple_async_result_take_error (res, error);
		g_simple_async_result_complete (res);
	}

	g_object_unref (res);
}

/**
 * secret_service_create_item_dbus_path: (skip)
 * @self: a secret service object
 * @collection_path: the D-Bus object path of the collection in which to create item
 * @properties: (element-type utf8 GLib.Variant): hash table of D-Bus properties
 *              for the new collection
 * @value: the secret value to store in the item
 * @flags: flags for the creation of the new item
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Create a new item in a secret service collection and return its D-Bus
 * object path.
 *
 * It is often easier to use secret_password_store() or secret_item_create()
 * rather than using this function. Using this method requires that you setup
 * a correct hash table of D-Bus @properties for the new collection.
 *
 * If the @flags contains %SECRET_ITEM_CREATE_REPLACE, then the secret
 * service will search for an item matching the @attributes, and update that item
 * instead of creating a new one.
 *
 * @properties is a set of properties for the new collection. The keys in the
 * hash table should be interface.property strings like
 * <literal>org.freedesktop.Secret.Item.Label</literal>. The values
 * in the hash table should be #GVariant values of the properties.
 *
 * This method will return immediately and complete asynchronously. The secret
 * service may prompt the user. secret_service_prompt() will be used to handle
 * any prompts that are required.
 *
 * Stability: Unstable
 */
void
secret_service_create_item_dbus_path (SecretService *self,
                                      const gchar *collection_path,
                                      GHashTable *properties,
                                      SecretValue *value,
                                      SecretItemCreateFlags flags,
                                      GCancellable *cancellable,
                                      GAsyncReadyCallback callback,
                                      gpointer user_data)
{
	GSimpleAsyncResult *res;
	ItemClosure *closure;

	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (collection_path != NULL && g_variant_is_object_path (collection_path));
	g_return_if_fail (properties != NULL);
	g_return_if_fail (value != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	res = g_simple_async_result_new (G_OBJECT (self), callback, user_data,
	                                 secret_service_create_item_dbus_path);
	closure = g_slice_new0 (ItemClosure);
	closure->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	closure->properties = _secret_util_variant_for_properties (properties);
	g_variant_ref_sink (closure->properties);
	closure->replace = flags & SECRET_ITEM_CREATE_REPLACE;
	closure->value = secret_value_ref (value);
	closure->collection_path = g_strdup (collection_path);
	g_simple_async_result_set_op_res_gpointer (res, closure, item_closure_free);

	secret_service_ensure_session (self, cancellable,
	                               on_create_item_session,
	                               g_object_ref (res));

	g_object_unref (res);
}

/**
 * secret_service_create_item_dbus_path_finish: (skip)
 * @self: a secret service object
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Finish asynchronous operation to create a new item in the secret
 * service.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full): a new string containing the D-Bus object path
 *          of the item
 */
gchar *
secret_service_create_item_dbus_path_finish (SecretService *self,
                                             GAsyncResult *result,
                                             GError **error)
{
	GSimpleAsyncResult *res;
	ItemClosure *closure;
	gchar *path;

	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (self),
	                      secret_service_create_item_dbus_path), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	res = G_SIMPLE_ASYNC_RESULT (result);

	if (_secret_util_propagate_error (res, error))
		return NULL;

	closure = g_simple_async_result_get_op_res_gpointer (res);
	path = closure->item_path;
	closure->item_path = NULL;
	return path;
}

void
_secret_service_create_item_dbus_path_finish_raw (GAsyncResult *result,
                                                  GError **error)
{
	g_simple_async_result_propagate_error (G_SIMPLE_ASYNC_RESULT (result), error);
}

/**
 * secret_service_create_item_dbus_path_sync:
 * @self: a secret service object
 * @collection_path: the D-Bus path of the collection in which to create item
 * @properties: (element-type utf8 GLib.Variant): hash table of D-Bus properties
 *              for the new collection
 * @value: the secret value to store in the item
 * @flags: flags for the creation of the new item
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Create a new item in a secret service collection and return its D-Bus
 * object path.
 *
 * It is often easier to use secret_password_store_sync() or secret_item_create_sync()
 * rather than using this function. Using this method requires that you setup
 * a correct hash table of D-Bus @properties for the new collection.
 *
 * If the @flags contains %SECRET_ITEM_CREATE_REPLACE, then the secret
 * service will search for an item matching the @attributes, and update that item
 * instead of creating a new one.
 *
 * @properties is a set of properties for the new collection. The keys in the
 * hash table should be interface.property strings like
 * <literal>org.freedesktop.Secret.Item.Label</literal>. The values
 * in the hash table should be #GVariant values of the properties.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads. The secret service may prompt the user. secret_service_prompt()
 * will be used to handle any prompts that are required.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full): a new string containing the D-Bus object path
 *          of the item
 */
gchar *
secret_service_create_item_dbus_path_sync (SecretService *self,
                                           const gchar *collection_path,
                                           GHashTable *properties,
                                           SecretValue *value,
                                           SecretItemCreateFlags flags,
                                           GCancellable *cancellable,
                                           GError **error)
{
	SecretSync *sync;
	gchar *path;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), NULL);
	g_return_val_if_fail (collection_path != NULL && g_variant_is_object_path (collection_path), NULL);
	g_return_val_if_fail (properties != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_create_item_dbus_path (self, collection_path, properties, value, flags,
	                                      cancellable, _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	path = secret_service_create_item_dbus_path_finish (self, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return path;
}

/**
 * secret_service_read_alias_dbus_path: (skip)
 * @self: a secret service object
 * @alias: the alias to lookup
 * @cancellable: (allow-none): optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Lookup which collection is assigned to this alias. Aliases help determine
 * well known collections, such as 'default'. This method looks up the
 * dbus object path of the well known collection.
 *
 * This method will return immediately and complete asynchronously.
 *
 * Stability: Unstable
 */
void
secret_service_read_alias_dbus_path (SecretService *self,
                                     const gchar *alias,
                                     GCancellable *cancellable,
                                     GAsyncReadyCallback callback,
                                     gpointer user_data)
{
	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (alias != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	g_dbus_proxy_call (G_DBUS_PROXY (self), "ReadAlias",
	                   g_variant_new ("(s)", alias),
	                   G_DBUS_CALL_FLAGS_NONE, -1,
	                   cancellable, callback, user_data);
}

/**
 * secret_service_read_alias_dbus_path_finish: (skip)
 * @self: a secret service object
 * @result: asynchronous result passed to callback
 * @error: location to place error on failure
 *
 * Finish an asynchronous operation to lookup which collection is assigned
 * to an alias. This method returns the DBus object path of the collection
 *
 * Stability: Unstable
 *
 * Returns: (transfer full): the collection dbus object path, or %NULL if
 *          none assigned to the alias
 */
gchar *
secret_service_read_alias_dbus_path_finish (SecretService *self,
                                            GAsyncResult *result,
                                            GError **error)
{
	gchar *collection_path;
	GVariant *retval;

	retval = g_dbus_proxy_call_finish (G_DBUS_PROXY (self), result, error);

	_secret_util_strip_remote_error (error);
	if (retval == NULL)
		return NULL;

	g_variant_get (retval, "(o)", &collection_path);
	g_variant_unref (retval);

	if (g_str_equal (collection_path, "/")) {
		g_free (collection_path);
		collection_path = NULL;
	}

	return collection_path;
}

/**
 * secret_service_read_alias_dbus_path_sync: (skip)
 * @self: a secret service object
 * @alias: the alias to lookup
 * @cancellable: (allow-none): optional cancellation object
 * @error: location to place error on failure
 *
 * Lookup which collection is assigned to this alias. Aliases help determine
 * well known collections, such as 'default'. This method returns the dbus
 * object path of the collection.
 *
 * This method may block and should not be used in user interface threads.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full): the collection dbus object path, or %NULL if
 *          none assigned to the alias
 */
gchar *
secret_service_read_alias_dbus_path_sync (SecretService *self,
                                          const gchar *alias,
                                          GCancellable *cancellable,
                                          GError **error)
{
	SecretSync *sync;
	gchar *collection_path;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), NULL);
	g_return_val_if_fail (alias != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_read_alias_dbus_path (self, alias, cancellable, _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	collection_path = secret_service_read_alias_dbus_path_finish (self, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return collection_path;
}

/**
 * secret_service_set_alias_to_dbus_path: (skip)
 * @self: a secret service object
 * @alias: the alias to assign the collection to
 * @collection_path: (allow-none): the dbus object path of the collection to assign to the alias
 * @cancellable: (allow-none): optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Assign a collection to this alias. Aliases help determine
 * well known collections, such as 'default'. This method takes the dbus object
 * path of the collection to assign to the alias.
 *
 * This method will return immediately and complete asynchronously.
 *
 * Stability: Unstable
 */
void
secret_service_set_alias_to_dbus_path (SecretService *self,
                                       const gchar *alias,
                                       const gchar *collection_path,
                                       GCancellable *cancellable,
                                       GAsyncReadyCallback callback,
                                       gpointer user_data)
{
	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (alias != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	if (collection_path == NULL)
		collection_path = "/";
	else
		g_return_if_fail (g_variant_is_object_path (collection_path));

	g_dbus_proxy_call (G_DBUS_PROXY (self), "SetAlias",
	                   g_variant_new ("(so)", alias, collection_path),
	                   G_DBUS_CALL_FLAGS_NONE, -1, cancellable,
	                   callback, user_data);
}

/**
 * secret_service_set_alias_to_dbus_path_finish: (skip)
 * @self: a secret service object
 * @result: asynchronous result passed to callback
 * @error: location to place error on failure
 *
 * Finish an asynchronous operation to assign a collection to an alias.
 *
 * Stability: Unstable
 *
 * Returns: %TRUE if successful
 */
gboolean
secret_service_set_alias_to_dbus_path_finish (SecretService *self,
                                              GAsyncResult *result,
                                              GError **error)
{
	GVariant *retval;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	retval = g_dbus_proxy_call_finish (G_DBUS_PROXY (self), result, error);

	_secret_util_strip_remote_error (error);
	if (retval == NULL)
		return FALSE;

	g_variant_unref (retval);
	return TRUE;
}

/**
 * secret_service_set_alias_to_dbus_path_sync: (skip)
 * @self: a secret service object
 * @alias: the alias to assign the collection to
 * @collection_path: (allow-none): the dbus object path of the collection to assign to the alias
 * @cancellable: (allow-none): optional cancellation object
 * @error: location to place error on failure
 *
 * Assign a collection to this alias. Aliases help determine
 * well known collections, such as 'default'. This method takes the dbus object
 * path of the collection to assign to the alias.
 *
 * This method may block and should not be used in user interface threads.
 *
 * Stability: Unstable
 *
 * Returns: %TRUE if successful
 */
gboolean
secret_service_set_alias_to_dbus_path_sync (SecretService *self,
                                            const gchar *alias,
                                            const gchar *collection_path,
                                            GCancellable *cancellable,
                                            GError **error)
{
	SecretSync *sync;
	gboolean ret;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), FALSE);
	g_return_val_if_fail (alias != NULL, FALSE);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	if (collection_path == NULL)
		collection_path = "/";
	else
		g_return_val_if_fail (g_variant_is_object_path (collection_path), FALSE);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_service_set_alias_to_dbus_path (self, alias, collection_path,
	                                       cancellable, _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	ret = secret_service_set_alias_to_dbus_path_finish (self, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return ret;
}

/**
 * secret_service_prompt_at_dbus_path_sync: (skip)
 * @self: the secret service
 * @prompt_path: the D-Bus object path of the prompt
 * @cancellable: optional cancellation object
 * @return_type: (allow-none): the variant type of the prompt result
 * @error: location to place error on failure
 *
 * Perform prompting for a #SecretPrompt.
 *
 * Override the #SecretServiceClass <literal>prompt_async</literal> virtual method
 * to change the behavior of the propmting. The default behavior is to simply
 * run secret_prompt_perform() on the prompt.
 *
 * Returns a variant result if the prompt was completed and not dismissed. The
 * type of result depends on the action the prompt is completing, and is defined
 * in the Secret Service DBus API specification.
 *
 * This method may block and should not be used in user interface threads.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full): %NULL if the prompt was dismissed or an error occurred,
 *          a variant result if the prompt was successful
 */
GVariant *
secret_service_prompt_at_dbus_path_sync (SecretService *self,
                                         const gchar *prompt_path,
                                         GCancellable *cancellable,
                                         const GVariantType *return_type,
                                         GError **error)
{
	SecretPrompt *prompt;
	GVariant *retval;

	g_return_val_if_fail (SECRET_IS_SERVICE (self), NULL);
	g_return_val_if_fail (prompt_path != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	prompt = _secret_prompt_instance (self, prompt_path);
	retval = secret_service_prompt_sync (self, prompt, cancellable, return_type, error);
	g_object_unref (prompt);

	return retval;
}

/**
 * secret_service_prompt_at_dbus_path: (skip)
 * @self: the secret service
 * @prompt_path: the D-Bus object path of the prompt
 * @return_type: (allow-none): the variant type of the prompt result
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Perform prompting for a #SecretPrompt.
 *
 * This function is called by other parts of this library to handle prompts
 * for the various actions that can require prompting.
 *
 * Override the #SecretServiceClass <literal>prompt_async</literal> virtual method
 * to change the behavior of the propmting. The default behavior is to simply
 * run secret_prompt_perform() on the prompt.
 *
 * Stability: Unstable
 */
void
secret_service_prompt_at_dbus_path (SecretService *self,
                                    const gchar *prompt_path,
                                    const GVariantType *return_type,
                                    GCancellable *cancellable,
                                    GAsyncReadyCallback callback,
                                    gpointer user_data)
{
	SecretPrompt *prompt;

	g_return_if_fail (SECRET_IS_SERVICE (self));
	g_return_if_fail (prompt_path != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	prompt = _secret_prompt_instance (self, prompt_path);
	secret_service_prompt (self, prompt, return_type, cancellable, callback, user_data);
	g_object_unref (prompt);
}

/**
 * secret_service_prompt_at_dbus_path_finish: (skip)
 * @self: the secret service
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Complete asynchronous operation to perform prompting for a #SecretPrompt.
 *
 * Returns a variant result if the prompt was completed and not dismissed. The
 * type of result depends on the action the prompt is completing, and is defined
 * in the Secret Service DBus API specification.
 *
 * Stability: Unstable
 *
 * Returns: (transfer full): %NULL if the prompt was dismissed or an error occurred,
 *          a variant result if the prompt was successful
 */
GVariant *
secret_service_prompt_at_dbus_path_finish (SecretService *self,
                                           GAsyncResult *result,
                                           GError **error)
{
	g_return_val_if_fail (SECRET_IS_SERVICE (self), NULL);
	g_return_val_if_fail (G_IS_ASYNC_RESULT (result), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	return secret_service_prompt_finish (self, result, error);
}

/**
 * secret_service_encode_dbus_secret:
 * @service: the service
 * @value: the secret value
 *
 * Encodes a #SecretValue into GVariant for use with the Secret Service
 * DBus API.
 *
 * The resulting GVariant will have a <literal>(oayays)</literal> signature.
 *
 * A session must have already been established by the #SecretService.
 *
 * Returns: (transfer floating): the encoded secret
 */
GVariant *
secret_service_encode_dbus_secret (SecretService *service,
                                   SecretValue *value)
{
	SecretSession *session;

	g_return_val_if_fail (service != NULL, NULL);
	g_return_val_if_fail (value != NULL, NULL);

	session = _secret_service_get_session (service);
	g_return_val_if_fail (session != NULL, NULL);

	return _secret_session_encode_secret (session, value);
}

/**
 * secret_service_decode_dbus_secret:
 * @service: the service
 * @value: the encoded secret
 *
 * Decode a #SecretValue into GVariant received with the Secret Service
 * DBus API.
 *
 * The GVariant should have a <literal>(oayays)</literal> signature.
 *
 * A session must have already been established by the #SecretService, and
 * the encoded secret must be valid for that session.
 *
 * Returns: (transfer full): the decoded secret value
 */
SecretValue *
secret_service_decode_dbus_secret (SecretService *service,
                                   GVariant *value)
{
	SecretSession *session;

	g_return_val_if_fail (service != NULL, NULL);
	g_return_val_if_fail (value != NULL, NULL);

	session = _secret_service_get_session (service);
	g_return_val_if_fail (session != NULL, NULL);

	return _secret_session_decode_secret (session, value);
}
