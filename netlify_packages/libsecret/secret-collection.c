/* libsecret - GLib wrapper for Secret Service
 *
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

#include "libsecret/secret-enum-types.h"

#include <glib/gi18n-lib.h>

/**
 * SECTION:secret-collection
 * @title: SecretCollection
 * @short_description: A collection of secret items
 *
 * #SecretCollection represents a collection of secret items stored in the
 * Secret Service.
 *
 * A collection can be in a locked or unlocked state. Use secret_service_lock()
 * or secret_service_unlock() to lock or unlock the collection.
 *
 * Use the SecretCollection::items property or secret_collection_get_items() to
 * lookup the items in the collection. There may not be any items exposed when
 * the collection is locked.
 *
 * Stability: Stable
 */

/**
 * SecretCollection:
 *
 * A proxy object representing a collection of secrets in the Secret Service.
 */

/**
 * SecretCollectionClass:
 * @parent_class: the parent class
 *
 * The class for #SecretCollection.
 */

/**
 * SecretCollectionFlags:
 * @SECRET_COLLECTION_NONE: no flags
 * @SECRET_COLLECTION_LOAD_ITEMS: items have or should be loaded
 *
 * Flags which determine which parts of the #SecretCollection proxy are initialized.
 */

/**
 * SecretCollectionCreateFlags:
 * @SECRET_COLLECTION_CREATE_NONE: no flags
 *
 * Flags for secret_collection_create().
 */

/**
 * SECRET_COLLECTION_DEFAULT:
 *
 * An alias to the default collection. This can be passed to secret_password_store()
 * secret_collection_for_alias().
 */

/**
 * SECRET_COLLECTION_SESSION:
 *
 * An alias to the session collection, which will be cleared when the user ends
 * the session. This can be passed to secret_password_store(),
 * secret_collection_for_alias() or similar functions.
 */

enum {
	PROP_0,
	PROP_SERVICE,
	PROP_FLAGS,
	PROP_ITEMS,
	PROP_LABEL,
	PROP_LOCKED,
	PROP_CREATED,
	PROP_MODIFIED
};

struct _SecretCollectionPrivate {
	/* Doesn't change between construct and finalize */
	SecretService *service;
	GCancellable *cancellable;
	gboolean constructing;
	SecretCollectionFlags init_flags;

	/* Protected by mutex */
	GMutex mutex;
	GHashTable *items;
};

static GInitableIface *secret_collection_initable_parent_iface = NULL;

static GAsyncInitableIface *secret_collection_async_initable_parent_iface = NULL;

static void   secret_collection_initable_iface         (GInitableIface *iface);

static void   secret_collection_async_initable_iface   (GAsyncInitableIface *iface);

G_DEFINE_TYPE_WITH_CODE (SecretCollection, secret_collection, G_TYPE_DBUS_PROXY,
                         G_IMPLEMENT_INTERFACE (G_TYPE_INITABLE, secret_collection_initable_iface);
                         G_IMPLEMENT_INTERFACE (G_TYPE_ASYNC_INITABLE, secret_collection_async_initable_iface);
);

static GHashTable *
items_table_new (void)
{
	return g_hash_table_new_full (g_str_hash, g_str_equal,
	                              g_free, g_object_unref);
}

static void
secret_collection_init (SecretCollection *self)
{
	self->pv = G_TYPE_INSTANCE_GET_PRIVATE (self, SECRET_TYPE_COLLECTION,
	                                        SecretCollectionPrivate);

	g_mutex_init (&self->pv->mutex);
	self->pv->cancellable = g_cancellable_new ();
	self->pv->constructing = TRUE;
}

static void
on_set_label (GObject *source,
              GAsyncResult *result,
              gpointer user_data)
{
	SecretCollection *self = SECRET_COLLECTION (user_data);
	GError *error = NULL;

	secret_collection_set_label_finish (self, result, &error);
	if (error != NULL) {
		g_warning ("couldn't set SecretCollection Label: %s", error->message);
		g_error_free (error);
	}

	g_object_unref (self);
}

static void
collection_take_service (SecretCollection *self,
                         SecretService *service)
{
	if (service == NULL)
		return;

	g_return_if_fail (self->pv->service == NULL);

	self->pv->service = service;
	g_object_add_weak_pointer (G_OBJECT (self->pv->service),
	                           (gpointer *)&self->pv->service);

	/* Yes, we expect that the service will stay around */
	g_object_unref (service);
}

static void
secret_collection_set_property (GObject *obj,
                                guint prop_id,
                                const GValue *value,
                                GParamSpec *pspec)
{
	SecretCollection *self = SECRET_COLLECTION (obj);

	switch (prop_id) {
	case PROP_SERVICE:
		collection_take_service (self, g_value_dup_object (value));
		break;
	case PROP_FLAGS:
		self->pv->init_flags = g_value_get_flags (value);
		break;
	case PROP_LABEL:
		secret_collection_set_label (self, g_value_get_string (value),
		                             self->pv->cancellable, on_set_label,
		                             g_object_ref (self));
		break;
	default:
		G_OBJECT_WARN_INVALID_PROPERTY_ID (obj, prop_id, pspec);
		break;
	}
}

static void
secret_collection_get_property (GObject *obj,
                                guint prop_id,
                                GValue *value,
                                GParamSpec *pspec)
{
	SecretCollection *self = SECRET_COLLECTION (obj);

	switch (prop_id) {
	case PROP_SERVICE:
		g_value_set_object (value, self->pv->service);
		break;
	case PROP_FLAGS:
		g_value_set_flags (value, secret_collection_get_flags (self));
		break;
	case PROP_ITEMS:
		g_value_take_boxed (value, secret_collection_get_items (self));
		break;
	case PROP_LABEL:
		g_value_take_string (value, secret_collection_get_label (self));
		break;
	case PROP_LOCKED:
		g_value_set_boolean (value, secret_collection_get_locked (self));
		break;
	case PROP_CREATED:
		g_value_set_uint64 (value, secret_collection_get_created (self));
		break;
	case PROP_MODIFIED:
		g_value_set_uint64 (value, secret_collection_get_modified (self));
		break;
	default:
		G_OBJECT_WARN_INVALID_PROPERTY_ID (obj, prop_id, pspec);
		break;
	}
}

static void
secret_collection_dispose (GObject *obj)
{
	SecretCollection *self = SECRET_COLLECTION (obj);

	g_cancellable_cancel (self->pv->cancellable);

	G_OBJECT_CLASS (secret_collection_parent_class)->dispose (obj);
}

static void
secret_collection_finalize (GObject *obj)
{
	SecretCollection *self = SECRET_COLLECTION (obj);

	if (self->pv->service)
		g_object_remove_weak_pointer (G_OBJECT (self->pv->service),
		                              (gpointer *)&self->pv->service);

	g_mutex_clear (&self->pv->mutex);
	if (self->pv->items)
		g_hash_table_destroy (self->pv->items);
	g_object_unref (self->pv->cancellable);

	G_OBJECT_CLASS (secret_collection_parent_class)->finalize (obj);
}

static void
collection_update_items (SecretCollection *self,
                         GHashTable *items)
{
	GHashTable *previous;

	g_hash_table_ref (items);

	g_mutex_lock (&self->pv->mutex);
	previous = self->pv->items;
	self->pv->items = items;
	g_mutex_unlock (&self->pv->mutex);

	if (previous != NULL)
		g_hash_table_unref (previous);

	g_object_notify (G_OBJECT (self), "items");
}

static void
handle_property_changed (SecretCollection *self,
                         const gchar *property_name,
                         GVariant *value)
{
	gboolean perform;

	if (g_str_equal (property_name, "Label")) {
		g_object_notify (G_OBJECT (self), "label");

	} else if (g_str_equal (property_name, "Locked")) {
		g_object_notify (G_OBJECT (self), "locked");

	} else if (g_str_equal (property_name, "Created")) {
		g_object_notify (G_OBJECT (self), "created");

	} else if (g_str_equal (property_name, "Modified")) {
		g_object_notify (G_OBJECT (self), "modified");

	} else if (g_str_equal (property_name, "Items") && !self->pv->constructing) {
		g_mutex_lock (&self->pv->mutex);
		perform = self->pv->items != NULL;
		g_mutex_unlock (&self->pv->mutex);

		if (perform)
			secret_collection_load_items (self, self->pv->cancellable, NULL, NULL);
	}
}

static void
secret_collection_properties_changed (GDBusProxy *proxy,
                                      GVariant *changed_properties,
                                      const gchar* const *invalidated_properties)
{
	SecretCollection *self = SECRET_COLLECTION (proxy);
	gchar *property_name;
	GVariantIter iter;
	GVariant *value;

	g_object_freeze_notify (G_OBJECT (self));

	g_variant_iter_init (&iter, changed_properties);
	while (g_variant_iter_loop (&iter, "{sv}", &property_name, &value))
		handle_property_changed (self, property_name, value);

	g_object_thaw_notify (G_OBJECT (self));
}

static void
secret_collection_signal (GDBusProxy *proxy,
                          const gchar *sender_name,
                          const gchar *signal_name,
                          GVariant *parameters)
{
	SecretCollection *self = SECRET_COLLECTION (proxy);
	SecretItem *item;
	const gchar *item_path;
	GVariantBuilder builder;
	gboolean found = FALSE;
	GVariantIter iter;
	GVariant *value;
	GVariant *paths;
	GVariant *path;

	/*
	 * Remember that these signals come from a time before PropertiesChanged.
	 * We support them because they're in the spec, and ksecretservice uses them.
	 */

	paths = g_dbus_proxy_get_cached_property (G_DBUS_PROXY (self), "Items");

	/* A new collection was added, add it to the Collections property */
	if (g_str_equal (signal_name, SECRET_SIGNAL_ITEM_CREATED)) {
		g_variant_get (parameters, "(@o)", &value);
		g_variant_builder_init (&builder, G_VARIANT_TYPE ("ao"));
		g_variant_iter_init (&iter, paths);
		while ((path = g_variant_iter_next_value (&iter)) != NULL) {
			if (g_variant_equal (path, value)) {
				found = TRUE;
				break;
			}
			g_variant_builder_add_value (&builder, path);
			g_variant_unref (path);
		}
		if (!found) {
			g_variant_builder_add_value (&builder, value);
			handle_property_changed (self, "Items", g_variant_builder_end (&builder));
		}
		g_variant_builder_clear (&builder);
		g_variant_unref (value);

	/* A collection was deleted, remove it from the Collections property */
	} else if (g_str_equal (signal_name, SECRET_SIGNAL_ITEM_DELETED)) {
		g_variant_get (parameters, "(@o)", &value);
		g_variant_builder_init (&builder, G_VARIANT_TYPE ("ao"));
		g_variant_iter_init (&iter, paths);
		while ((path = g_variant_iter_next_value (&iter)) != NULL) {
			if (g_variant_equal (path, value))
				found = TRUE;
			else
				g_variant_builder_add_value (&builder, path);
			g_variant_unref (path);
		}
		if (found)
			handle_property_changed (self, "Items", g_variant_builder_end (&builder));
		g_variant_unref (value);

	/* The collection changed, update it */
	} else if (g_str_equal (signal_name, SECRET_SIGNAL_ITEM_CHANGED)) {
		g_variant_get (parameters, "(&o)", &item_path);

		g_mutex_lock (&self->pv->mutex);

		if (self->pv->items)
			item = g_hash_table_lookup (self->pv->items, item_path);
		else
			item = NULL;
		if (item)
			g_object_ref (item);

		g_mutex_unlock (&self->pv->mutex);

		if (item) {
			secret_item_refresh (item);
			g_object_unref (item);
		}
	}

	g_variant_unref (paths);
}

static void
secret_collection_class_init (SecretCollectionClass *klass)
{
	GObjectClass *gobject_class = G_OBJECT_CLASS (klass);
	GDBusProxyClass *proxy_class = G_DBUS_PROXY_CLASS (klass);

	gobject_class->get_property = secret_collection_get_property;
	gobject_class->set_property = secret_collection_set_property;
	gobject_class->dispose = secret_collection_dispose;
	gobject_class->finalize = secret_collection_finalize;

	proxy_class->g_properties_changed = secret_collection_properties_changed;
	proxy_class->g_signal = secret_collection_signal;

	/**
	 * SecretCollection:service:
	 *
	 * The #SecretService object that this collection is associated with and
	 * uses to interact with the actual D-Bus Secret Service.
	 */
	g_object_class_install_property (gobject_class, PROP_SERVICE,
	            g_param_spec_object ("service", "Service", "Secret Service",
	                                 SECRET_TYPE_SERVICE, G_PARAM_READWRITE | G_PARAM_CONSTRUCT_ONLY | G_PARAM_STATIC_STRINGS));

	/**
	 * SecretCollection:flags:
	 *
	 * A set of flags describing which parts of the secret collection have
	 * been initialized.
	 */
	g_object_class_install_property (gobject_class, PROP_FLAGS,
	             g_param_spec_flags ("flags", "Flags", "Collection flags",
	                                 secret_collection_flags_get_type (), SECRET_COLLECTION_NONE,
	                                 G_PARAM_READWRITE | G_PARAM_CONSTRUCT_ONLY | G_PARAM_STATIC_STRINGS));

	/**
	 * SecretCollection:items:
	 *
	 * A list of #SecretItem objects representing the items that are in
	 * this collection. This list will be empty if the collection is locked.
	 */
	g_object_class_install_property (gobject_class, PROP_ITEMS,
	             g_param_spec_boxed ("items", "Items", "Items in collection",
	                                 _secret_list_get_type (), G_PARAM_READABLE | G_PARAM_STATIC_STRINGS));

	/**
	 * SecretCollection:label:
	 *
	 * The human readable label for the collection.
	 *
	 * Setting this property will result in the label of the collection being
	 * set asynchronously. To properly track the changing of the label use the
	 * secret_collection_set_label() function.
	 */
	g_object_class_install_property (gobject_class, PROP_LABEL,
	            g_param_spec_string ("label", "Label", "Item label",
	                                 NULL, G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS));

	/**
	 * SecretCollection:locked:
	 *
	 * Whether the collection is locked or not.
	 *
	 * To lock or unlock a collection use the secret_service_lock() or
	 * secret_service_unlock() functions.
	 */
	g_object_class_install_property (gobject_class, PROP_LOCKED,
	           g_param_spec_boolean ("locked", "Locked", "Item locked",
	                                 TRUE, G_PARAM_READABLE | G_PARAM_STATIC_STRINGS));

	/**
	 * SecretCollection:created:
	 *
	 * The date and time (in seconds since the UNIX epoch) that this
	 * collection was created.
	 */
	g_object_class_install_property (gobject_class, PROP_CREATED,
	            g_param_spec_uint64 ("created", "Created", "Item creation date",
	                                 0UL, G_MAXUINT64, 0UL, G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS));

	/**
	 * SecretCollection:modified:
	 *
	 * The date and time (in seconds since the UNIX epoch) that this
	 * collection was last modified.
	 */
	g_object_class_install_property (gobject_class, PROP_MODIFIED,
	            g_param_spec_uint64 ("modified", "Modified", "Item modified date",
	                                 0UL, G_MAXUINT64, 0UL, G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS));

	g_type_class_add_private (gobject_class, sizeof (SecretCollectionPrivate));
}

static gboolean
collection_ensure_for_flags_sync (SecretCollection *self,
                                  SecretCollectionFlags flags,
                                  GCancellable *cancellable,
                                  GError **error)
{
	SecretCollectionFlags want_flags;

	want_flags = flags & ~secret_collection_get_flags (self);

	if (want_flags & SECRET_COLLECTION_LOAD_ITEMS) {
		if (!secret_collection_load_items_sync (self, cancellable, error))
			return FALSE;
	}

	return TRUE;
}

static gboolean
secret_collection_initable_init (GInitable *initable,
                                 GCancellable *cancellable,
                                 GError **error)
{
	SecretCollection *self;
	SecretService *service;
	GDBusProxy *proxy;

	if (!secret_collection_initable_parent_iface->init (initable, cancellable, error))
		return FALSE;

	proxy = G_DBUS_PROXY (initable);

	if (!_secret_util_have_cached_properties (proxy)) {
		g_set_error (error, G_DBUS_ERROR, G_DBUS_ERROR_UNKNOWN_METHOD,
		             "No such secret collection at path: %s",
		             g_dbus_proxy_get_object_path (proxy));
		return FALSE;
	}

	self = SECRET_COLLECTION (initable);

	if (self->pv->service == NULL) {
		service = secret_service_get_sync (SECRET_SERVICE_NONE, cancellable, error);
		if (service == NULL)
			return FALSE;
		else
			collection_take_service (self, service);
	}

	if (!collection_ensure_for_flags_sync (self, self->pv->init_flags, cancellable, error))
		return FALSE;

	self->pv->constructing = FALSE;
	return TRUE;
}

static void
secret_collection_initable_iface (GInitableIface *iface)
{
	secret_collection_initable_parent_iface = g_type_interface_peek_parent (iface);

	iface->init = secret_collection_initable_init;
}

typedef struct {
	GCancellable *cancellable;
} InitClosure;

static void
init_closure_free (gpointer data)
{
	InitClosure *closure = data;
	g_clear_object (&closure->cancellable);
	g_slice_free (InitClosure, closure);
}

static void
on_ensure_items (GObject *source,
                 GAsyncResult *result,
                 gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	SecretCollection *self = SECRET_COLLECTION (source);
	GError *error = NULL;

	if (!secret_collection_load_items_finish (self, result, &error))
		g_simple_async_result_take_error (res, error);

	g_simple_async_result_complete (res);
	g_object_unref (res);
}

static void
collection_ensure_for_flags_async (SecretCollection *self,
                                   SecretCollectionFlags flags,
                                   GCancellable *cancellable,
                                   GSimpleAsyncResult *async)
{
	SecretCollectionFlags want_flags;

	want_flags = flags & ~secret_collection_get_flags (self);

	if (want_flags & SECRET_COLLECTION_LOAD_ITEMS) {
		secret_collection_load_items (self, cancellable,
		                              on_ensure_items, g_object_ref (async));

	} else {
		g_simple_async_result_complete (async);
	}
}

static void
on_init_service (GObject *source,
                 GAsyncResult *result,
                 gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	SecretCollection *self = SECRET_COLLECTION (g_async_result_get_source_object (user_data));
	InitClosure *init = g_simple_async_result_get_op_res_gpointer (async);
	SecretService *service;
	GError *error = NULL;

	service = secret_service_get_finish (result, &error);
	if (error == NULL) {
		collection_take_service (self, service);
		collection_ensure_for_flags_async (self, self->pv->init_flags,
		                                   init->cancellable, async);

	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (self);
	g_object_unref (async);
}

static void
on_init_base (GObject *source,
              GAsyncResult *result,
              gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	SecretCollection *self = SECRET_COLLECTION (source);
	InitClosure *init = g_simple_async_result_get_op_res_gpointer (res);
	GDBusProxy *proxy = G_DBUS_PROXY (self);
	GError *error = NULL;

	if (!secret_collection_async_initable_parent_iface->init_finish (G_ASYNC_INITABLE (self),
	                                                                 result, &error)) {
		g_simple_async_result_take_error (res, error);
		g_simple_async_result_complete (res);

	} else if (!_secret_util_have_cached_properties (proxy)) {
		g_simple_async_result_set_error (res, G_DBUS_ERROR, G_DBUS_ERROR_UNKNOWN_METHOD,
		                                 "No such secret collection at path: %s",
		                                 g_dbus_proxy_get_object_path (proxy));
		g_simple_async_result_complete (res);

	} else if (self->pv->service == NULL) {
		secret_service_get (SECRET_SERVICE_NONE, init->cancellable,
		                    on_init_service, g_object_ref (res));

	} else {
		collection_ensure_for_flags_async (self, self->pv->init_flags,
		                                   init->cancellable, res);
	}

	g_object_unref (res);
}

static void
secret_collection_async_initable_init_async (GAsyncInitable *initable,
                                             int io_priority,
                                             GCancellable *cancellable,
                                             GAsyncReadyCallback callback,
                                             gpointer user_data)
{
	GSimpleAsyncResult *res;
	InitClosure *closure;

	res = g_simple_async_result_new (G_OBJECT (initable), callback, user_data,
	                                 secret_collection_async_initable_init_async);
	closure = g_slice_new0 (InitClosure);
	closure->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	g_simple_async_result_set_op_res_gpointer (res, closure, init_closure_free);

	secret_collection_async_initable_parent_iface->init_async (initable, io_priority,
	                                                           cancellable,
	                                                           on_init_base,
	                                                           g_object_ref (res));

	g_object_unref (res);
}

static gboolean
secret_collection_async_initable_init_finish (GAsyncInitable *initable,
                                              GAsyncResult *result,
                                              GError **error)
{
	SecretCollection *self = SECRET_COLLECTION (initable);

	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (initable),
	                      secret_collection_async_initable_init_async), FALSE);

	if (_secret_util_propagate_error (G_SIMPLE_ASYNC_RESULT (result), error))
		return FALSE;

	self->pv->constructing = FALSE;
	return TRUE;
}

static void
secret_collection_async_initable_iface (GAsyncInitableIface *iface)
{
	secret_collection_async_initable_parent_iface = g_type_interface_peek_parent (iface);

	iface->init_async = secret_collection_async_initable_init_async;
	iface->init_finish = secret_collection_async_initable_init_finish;
}

typedef struct {
	GCancellable *cancellable;
	GHashTable *items;
	gint items_loading;
} ItemsClosure;

static void
items_closure_free (gpointer data)
{
	ItemsClosure *closure = data;
	g_clear_object (&closure->cancellable);
	g_hash_table_unref (closure->items);
	g_slice_free (ItemsClosure, closure);
}

static void
on_load_item (GObject *source,
              GAsyncResult *result,
              gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	ItemsClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	SecretCollection *self = SECRET_COLLECTION (g_async_result_get_source_object (user_data));
	const gchar *path;
	GError *error = NULL;
	SecretItem *item;

	closure->items_loading--;

	item = secret_item_new_for_dbus_path_finish (result, &error);

	if (error != NULL)
		g_simple_async_result_take_error (res, error);

	if (item != NULL) {
		path = g_dbus_proxy_get_object_path (G_DBUS_PROXY (item));
		g_hash_table_insert (closure->items, g_strdup (path), item);
	}

	if (closure->items_loading == 0) {
		collection_update_items (self, closure->items);
		g_simple_async_result_complete_in_idle (res);
	}

	g_object_unref (self);
	g_object_unref (res);
}

/**
 * secret_collection_load_items:
 * @self: the secret collection
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Ensure that the #SecretCollection proxy has loaded all the items present
 * in the Secret Service. This affects the result of
 * secret_collection_get_items().
 *
 * For collections returned from secret_service_get_collections() the items
 * will have already been loaded.
 *
 * This method will return immediately and complete asynchronously.
 */
void
secret_collection_load_items (SecretCollection *self,
                              GCancellable *cancellable,
                              GAsyncReadyCallback callback,
                              gpointer user_data)
{
	ItemsClosure *closure;
	SecretItem *item;
	GSimpleAsyncResult *res;
	const gchar *path;
	GVariant *paths;
	GVariantIter iter;

	g_return_if_fail (SECRET_IS_COLLECTION (self));
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	paths = g_dbus_proxy_get_cached_property (G_DBUS_PROXY (self), "Items");
	g_return_if_fail (paths != NULL);

	res = g_simple_async_result_new (G_OBJECT (self), callback, user_data,
	                                 secret_collection_load_items);
	closure = g_slice_new0 (ItemsClosure);
	closure->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	closure->items = items_table_new ();
	g_simple_async_result_set_op_res_gpointer (res, closure, items_closure_free);

	g_variant_iter_init (&iter, paths);
	while (g_variant_iter_loop (&iter, "&o", &path)) {
		item = _secret_collection_find_item_instance (self, path);

		/* No such collection yet create a new one */
		if (item == NULL) {
			secret_item_new_for_dbus_path (self->pv->service, path, SECRET_ITEM_NONE,
			                               cancellable, on_load_item, g_object_ref (res));
			closure->items_loading++;

		} else {
			g_hash_table_insert (closure->items, g_strdup (path), item);
		}
	}

	if (closure->items_loading == 0) {
		collection_update_items (self, closure->items);
		g_simple_async_result_complete_in_idle (res);
	}

	g_variant_unref (paths);
	g_object_unref (res);
}

/**
 * secret_collection_load_items_finish:
 * @self: the secret collection
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Complete an asynchronous operation to ensure that the #SecretCollection proxy
 * has loaded all the items present in the Secret Service.
 *
 * Returns: whether the load was successful or not
 */
gboolean
secret_collection_load_items_finish (SecretCollection *self,
                                     GAsyncResult *result,
                                     GError **error)
{
	g_return_val_if_fail (SECRET_IS_COLLECTION (self), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);
	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (self),
	                      secret_collection_load_items), FALSE);

	if (_secret_util_propagate_error (G_SIMPLE_ASYNC_RESULT (result), error))
		return FALSE;

	return TRUE;
}

/**
 * secret_collection_load_items_sync:
 * @self: the secret collection
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Ensure that the #SecretCollection proxy has loaded all the items present
 * in the Secret Service. This affects the result of
 * secret_collection_get_items().
 *
 * For collections returned from secret_service_get_collections() the items
 * will have already been loaded.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Returns: whether the load was successful or not
 */
gboolean
secret_collection_load_items_sync (SecretCollection *self,
                                   GCancellable *cancellable,
                                   GError **error)
{
	SecretItem *item;
	GHashTable *items;
	GVariant *paths;
	GVariantIter iter;
	const gchar *path;
	gboolean ret = TRUE;

	g_return_val_if_fail (SECRET_IS_COLLECTION (self), FALSE);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	paths = g_dbus_proxy_get_cached_property (G_DBUS_PROXY (self), "Items");
	g_return_val_if_fail (paths != NULL, FALSE);

	items = items_table_new ();

	g_variant_iter_init (&iter, paths);
	while (g_variant_iter_next (&iter, "&o", &path)) {
		item = _secret_collection_find_item_instance (self, path);

		/* No such collection yet create a new one */
		if (item == NULL) {
			item = secret_item_new_for_dbus_path_sync (self->pv->service, path,
			                                           SECRET_ITEM_NONE,
			                                           cancellable, error);
			if (item == NULL) {
				ret = FALSE;
				break;
			}
		}

		g_hash_table_insert (items, g_strdup (path), item);
	}

	if (ret)
		collection_update_items (self, items);

	g_hash_table_unref (items);
	g_variant_unref (paths);
	return ret;
}

/**
 * secret_collection_refresh:
 * @self: the collection
 *
 * Refresh the properties on this collection. This fires off a request to
 * refresh, and the properties will be updated later.
 *
 * Calling this method is not normally necessary, as the secret service
 * will notify the client when properties change.
 */
void
secret_collection_refresh (SecretCollection *self)
{
	g_return_if_fail (SECRET_IS_COLLECTION (self));

	_secret_util_get_properties (G_DBUS_PROXY (self),
	                              secret_collection_refresh,
	                              self->pv->cancellable, NULL, NULL);
}

typedef struct {
	GCancellable *cancellable;
	SecretCollection *collection;
	GHashTable *properties;
	gchar *alias;
	SecretCollectionCreateFlags flags;
} CreateClosure;

static void
create_closure_free (gpointer data)
{
	CreateClosure *closure = data;
	g_clear_object (&closure->cancellable);
	g_clear_object (&closure->collection);
	g_hash_table_unref (closure->properties);
	g_free (closure->alias);
	g_slice_free (CreateClosure, closure);
}

static void
on_create_collection (GObject *source,
                      GAsyncResult *result,
                      gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	CreateClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	GError *error = NULL;

	closure->collection = secret_collection_new_for_dbus_path_finish (result, &error);
	if (error != NULL)
		g_simple_async_result_take_error (res, error);

	g_simple_async_result_complete (res);
	g_object_unref (res);
}

static void
on_create_path (GObject *source,
                GAsyncResult *result,
                gpointer user_data)
{
	GSimpleAsyncResult *res = G_SIMPLE_ASYNC_RESULT (user_data);
	CreateClosure *closure = g_simple_async_result_get_op_res_gpointer (res);
	SecretService *service = SECRET_SERVICE (source);
	GError *error = NULL;
	gchar *path;

	path = secret_service_create_collection_dbus_path_finish (service, result, &error);
	if (error == NULL) {
		secret_collection_new_for_dbus_path (service, path, SECRET_COLLECTION_LOAD_ITEMS,
		                                     closure->cancellable,
		                                     on_create_collection, g_object_ref (res));
	} else {
		g_simple_async_result_take_error (res, error);
		g_simple_async_result_complete (res);
	}

	g_object_unref (res);
	g_free (path);
}

static void
on_create_service (GObject *source,
                   GAsyncResult *result,
                   gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	CreateClosure *create = g_simple_async_result_get_op_res_gpointer (async);
	GError *error = NULL;
	SecretService *service;

	service = secret_service_get_finish (result, &error);
	if (error == NULL) {
		secret_service_create_collection_dbus_path (service, create->properties,
		                                            create->alias, create->flags,
		                                            create->cancellable,
		                                            on_create_path, g_object_ref (async));
		g_object_unref (service);

	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
}

GHashTable *
_secret_collection_properties_new (const gchar *label)
{
	GHashTable *properties;
	GVariant *value;

	properties = g_hash_table_new_full (g_str_hash, g_str_equal, NULL,
	                                    (GDestroyNotify)g_variant_unref);
	value = g_variant_new_string (label);
	g_hash_table_insert (properties,
	                     SECRET_COLLECTION_INTERFACE ".Label",
	                     g_variant_ref_sink (value));

	return properties;
}

/**
 * secret_collection_create:
 * @service: (allow-none): a secret service object
 * @label: label for the new collection
 * @alias: (allow-none): alias to assign to the collection
 * @flags: currently unused
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Create a new collection in the secret service.
 *
 * This method returns immediately and completes asynchronously. The secret
 * service may prompt the user. secret_service_prompt() will be used to handle
 * any prompts that are required.
 *
 * An @alias is a well-known tag for a collection, such as 'default' (ie: the
 * default collection to store items in). This allows other applications to
 * easily identify and share a collection. If you specify an @alias, and a
 * collection with that alias already exists, then a new collection will not
 * be created. The previous one will be returned instead.
 *
 * If @service is NULL, then secret_service_get() will be called to get
 * the default #SecretService proxy.
 *
 */
void
secret_collection_create (SecretService *service,
                          const gchar *label,
                          const gchar *alias,
                          SecretCollectionCreateFlags flags,
                          GCancellable *cancellable,
                          GAsyncReadyCallback callback,
                          gpointer user_data)
{
	GSimpleAsyncResult *res;
	CreateClosure *closure;

	g_return_if_fail (service == NULL || SECRET_IS_SERVICE (service));
	g_return_if_fail (label != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	res = g_simple_async_result_new (NULL, callback, user_data,
	                                 secret_collection_create);
	closure = g_slice_new0 (CreateClosure);
	closure->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	closure->properties = _secret_collection_properties_new (label);
	closure->alias = g_strdup (alias);
	closure->flags = flags;
	g_simple_async_result_set_op_res_gpointer (res, closure, create_closure_free);

	if (service == NULL) {
		secret_service_get (SECRET_SERVICE_NONE, cancellable,
		                    on_create_service, g_object_ref (res));

	} else {
		secret_service_create_collection_dbus_path (service, closure->properties,
		                                            closure->alias, closure->flags,
		                                            closure->cancellable,
		                                            on_create_path, g_object_ref (res));
	}

	g_object_unref (res);
}

/**
 * secret_collection_create_finish:
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Finish operation to create a new collection in the secret service.
 *
 * Returns: (transfer full): the new collection, which should be unreferenced
 *          with g_object_unref()
 */
SecretCollection *
secret_collection_create_finish (GAsyncResult *result,
                                 GError **error)
{
	GSimpleAsyncResult *res;
	CreateClosure *closure;

	g_return_val_if_fail (g_simple_async_result_is_valid (result, NULL,
	                      secret_collection_create), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	res = G_SIMPLE_ASYNC_RESULT (result);

	if (_secret_util_propagate_error (res, error))
		return NULL;

	closure = g_simple_async_result_get_op_res_gpointer (res);
	if (closure->collection == NULL)
		return NULL;

	return g_object_ref (closure->collection);
}

/**
 * secret_collection_create_sync:
 * @service: (allow-none): a secret service object
 * @label: label for the new collection
 * @alias: (allow-none): alias to assign to the collection
 * @flags: currently unused
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Create a new collection in the secret service.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads. The secret service may prompt the user. secret_service_prompt()
 * will be used to handle any prompts that are required.
 *
 * An @alias is a well-known tag for a collection, such as 'default' (ie: the
 * default collection to store items in). This allows other applications to
 * easily identify and share a collection. If you specify an @alias, and a
 * collection with that alias already exists, then a new collection will not
 * be created. The previous one will be returned instead.
 *
 * If @service is NULL, then secret_service_get_sync() will be called to get
 * the default #SecretService proxy.
 *
 * Returns: (transfer full): the new collection, which should be unreferenced
 *          with g_object_unref()
 */
SecretCollection *
secret_collection_create_sync (SecretService *service,
                               const gchar *label,
                               const gchar *alias,
                               SecretCollectionCreateFlags flags,
                               GCancellable *cancellable,
                               GError **error)
{
	SecretCollection *collection;
	GHashTable *properties;
	gchar *path;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), NULL);
	g_return_val_if_fail (label != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	if (service == NULL) {
		service = secret_service_get_sync (SECRET_SERVICE_NONE, cancellable, error);
		if (service == NULL)
			return NULL;
	} else {
		g_object_ref (service);
	}

	properties = _secret_collection_properties_new (label);

	path = secret_service_create_collection_dbus_path_sync (service, properties, alias,
	                                                        flags, cancellable, error);

	g_hash_table_unref (properties);

	if (path == NULL) {
		g_object_unref (service);
		return NULL;
	}

	collection = secret_collection_new_for_dbus_path_sync (service, path,
	                                                       SECRET_COLLECTION_LOAD_ITEMS,
	                                                       cancellable, error);

	g_object_unref (service);
	g_free (path);

	return collection;
}

typedef struct {
	SecretCollection *collection;
	GCancellable *cancellable;
	GHashTable *items;
	gchar **paths;
	guint loading;
	SecretSearchFlags flags;
} SearchClosure;

static void
search_closure_free (gpointer data)
{
	SearchClosure *closure = data;
	g_object_unref (closure->collection);
	g_clear_object (&closure->cancellable);
	g_hash_table_unref (closure->items);
	g_strfreev (closure->paths);
	g_slice_free (SearchClosure, closure);
}

static void
search_closure_take_item (SearchClosure *closure,
                          SecretItem *item)
{
	const gchar *path = g_dbus_proxy_get_object_path (G_DBUS_PROXY (item));
	g_hash_table_insert (closure->items, (gpointer)path, item);
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
	secret_service_unlock_finish (SECRET_SERVICE (source), result, NULL, NULL);

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
		items = g_hash_table_get_values (search->items);
		secret_service_unlock (secret_collection_get_service (search->collection),
		                       items, search->cancellable,
		                       on_search_unlocked, g_object_ref (async));
		g_list_free (items);

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
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	SearchClosure *search = g_simple_async_result_get_op_res_gpointer (async);
	GError *error = NULL;
	SecretItem *item;

	search->loading--;

	item = secret_item_new_for_dbus_path_finish (result, &error);
	if (error != NULL)
		g_simple_async_result_take_error (async, error);

	if (item != NULL)
		search_closure_take_item (search, item);

	/* We're done loading, lets go to the next step */
	if (search->loading == 0)
		secret_search_unlock_load_or_complete (async, search);

	g_object_unref (async);
}

static void
on_search_paths (GObject *source,
                 GAsyncResult *result,
                 gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	SearchClosure *search = g_simple_async_result_get_op_res_gpointer (async);
	SecretCollection *self = search->collection;
	SecretService *service = secret_collection_get_service (self);
	GError *error = NULL;
	SecretItem *item;
	gint want = 1;
	gint i;

	search->paths = secret_collection_search_for_dbus_paths_finish (self, result, &error);
	if (error == NULL) {
		want = 1;
		if (search->flags & SECRET_SEARCH_ALL)
			want = G_MAXINT;

		for (i = 0; i < want && search->paths[i] != NULL; i++) {
			item = _secret_collection_find_item_instance (self, search->paths[i]);
			if (item == NULL) {
				secret_item_new_for_dbus_path (service, search->paths[i], SECRET_ITEM_NONE,
				                               search->cancellable, on_search_loaded,
				                               g_object_ref (async));
				search->loading++;
			} else {
				search_closure_take_item (search, item);
			}

		}

		/* No items loading, complete operation now */
		if (search->loading == 0)
			secret_search_unlock_load_or_complete (async, search);

	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
}

/**
 * secret_collection_search:
 * @self: a secret collection
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): search for items matching these attributes
 * @flags: search option flags
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Search for items matching the @attributes in the @collection.
 * The @attributes should be a table of string keys and string values.
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
secret_collection_search (SecretCollection *self,
                          const SecretSchema *schema,
                          GHashTable *attributes,
                          SecretSearchFlags flags,
                          GCancellable *cancellable,
                          GAsyncReadyCallback callback,
                          gpointer user_data)
{
	GSimpleAsyncResult *async;
	SearchClosure *search;

	g_return_if_fail (SECRET_IS_COLLECTION (self));
	g_return_if_fail (attributes != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return;

	async = g_simple_async_result_new (G_OBJECT (self), callback, user_data,
	                                   secret_collection_search);
	search = g_slice_new0 (SearchClosure);
	search->collection = g_object_ref (self);
	search->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	search->items = g_hash_table_new_full (g_str_hash, g_str_equal, NULL, g_object_unref);
	search->flags = flags;
	g_simple_async_result_set_op_res_gpointer (async, search, search_closure_free);

	secret_collection_search_for_dbus_paths (self, schema, attributes,
	                                         cancellable, on_search_paths,
	                                         g_object_ref (async));

	g_object_unref (async);
}

/**
 * secret_collection_search_finish:
 * @self: the secret collection
 * @result: asynchronous result passed to callback
 * @error: location to place error on failure
 *
 * Complete asynchronous operation to search for items in a collection.
 *
 * Returns: (transfer full) (element-type Secret.Item):
 *          a list of items that matched the search
 */
GList *
secret_collection_search_finish (SecretCollection *self,
                                 GAsyncResult *result,
                                 GError **error)
{
	GSimpleAsyncResult *async;
	SearchClosure *search;
	GList *items = NULL;
	SecretItem *item;
	guint i;

	g_return_val_if_fail (SECRET_IS_COLLECTION (self), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);
	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (self),
	                      secret_collection_search), NULL);

	async = G_SIMPLE_ASYNC_RESULT (result);
	if (_secret_util_propagate_error (async, error))
		return NULL;

	search = g_simple_async_result_get_op_res_gpointer (async);

	for (i = 0; search->paths[i]; i++) {
		item = g_hash_table_lookup (search->items, search->paths[i]);
		if (item != NULL)
			items = g_list_prepend (items, g_object_ref (item));
	}

	return g_list_reverse (items);
}

static gboolean
collection_load_items_sync (SecretCollection *self,
                            GCancellable *cancellable,
                            gchar **paths,
                            GList **items,
                            gint want,
                            GError **error)
{
	SecretService *service = secret_collection_get_service (self);
	SecretItem *item;
	gint have = 0;
	guint i;

	for (i = 0; have < want && paths[i] != NULL; i++) {
		item = _secret_collection_find_item_instance (self, paths[i]);
		if (item == NULL)
			item = secret_item_new_for_dbus_path_sync (service, paths[i], SECRET_ITEM_NONE,
			                                           cancellable, error);
		if (item == NULL) {
			return FALSE;

		} else {
			*items = g_list_prepend (*items, item);
			have++;
		}
	}

	return TRUE;
}

/**
 * secret_collection_search_sync:
 * @self: a secret collection
 * @schema: (allow-none): the schema for the attributes
 * @attributes: (element-type utf8 utf8): search for items matching these attributes
 * @flags: search option flags
 * @cancellable: optional cancellation object
 * @error: location to place error on failure
 *
 * Search for items matching the @attributes in the @collection.
 * The @attributes should be a table of string keys and string values.
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
 * This function may block indefinitely. Use the asynchronous version
 * in user interface threads.
 *
 * Returns: (transfer full) (element-type Secret.Item):
 *          a list of items that matched the search
 */
GList *
secret_collection_search_sync (SecretCollection *self,
                               const SecretSchema *schema,
                               GHashTable *attributes,
                               SecretSearchFlags flags,
                               GCancellable *cancellable,
                               GError **error)
{
	gchar **paths = NULL;
	GList *items = NULL;
	gboolean ret;
	gint want;

	g_return_val_if_fail (SECRET_IS_COLLECTION (self), NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	/* Warnings raised already */
	if (schema != NULL && !_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return NULL;

	paths = secret_collection_search_for_dbus_paths_sync (self, schema, attributes,
	                                                      cancellable, error);
	if (paths == NULL)
		return NULL;

	ret = TRUE;

	want = 1;
	if (flags & SECRET_SEARCH_ALL)
		want = G_MAXINT;

	ret = collection_load_items_sync (self, cancellable, paths,
	                                  &items, want, error);

	g_strfreev (paths);

	if (!ret)
		return NULL;

	if (flags & SECRET_SEARCH_UNLOCK) {
		secret_service_unlock_sync (secret_collection_get_service (self),
		                            items, cancellable, NULL, NULL);
	}

	if (flags & SECRET_SEARCH_LOAD_SECRETS)
		secret_item_load_secrets_sync (items, NULL, NULL);

	return items;
}

static void
on_service_delete_path (GObject *source,
                        GAsyncResult *result,
                        gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	GError *error = NULL;

	_secret_service_delete_path_finish (SECRET_SERVICE (source), result, &error);
	if (error != NULL)
		g_simple_async_result_take_error (async, error);
	g_simple_async_result_complete (async);
	g_object_unref (async);
}
/**
 * secret_collection_delete:
 * @self: a collection
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Delete this collection.
 *
 * This method returns immediately and completes asynchronously. The secret
 * service may prompt the user. secret_service_prompt() will be used to handle
 * any prompts that show up.
 */
void
secret_collection_delete (SecretCollection *self,
                          GCancellable *cancellable,
                          GAsyncReadyCallback callback,
                          gpointer user_data)
{
	GSimpleAsyncResult *async;
	const gchar *object_path;

	g_return_if_fail (SECRET_IS_COLLECTION (self));
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	async = g_simple_async_result_new (G_OBJECT (self), callback, user_data,
	                                   secret_collection_delete);

	object_path = g_dbus_proxy_get_object_path (G_DBUS_PROXY (self));
	_secret_service_delete_path (self->pv->service, object_path, FALSE,
	                             cancellable, on_service_delete_path,
	                             g_object_ref (async));

	g_object_unref (async);
}

/**
 * secret_collection_delete_finish:
 * @self: a collection
 * @result: asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Complete operation to delete this collection.
 *
 * Returns: whether the collection was successfully deleted or not
 */
gboolean
secret_collection_delete_finish (SecretCollection *self,
                                 GAsyncResult *result,
                                 GError **error)
{
	g_return_val_if_fail (SECRET_IS_COLLECTION (self), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);
	g_return_val_if_fail (g_simple_async_result_is_valid (result, G_OBJECT (self),
	                      secret_collection_delete), FALSE);

	if (_secret_util_propagate_error (G_SIMPLE_ASYNC_RESULT (result), error))
		return FALSE;

	return TRUE;
}

/**
 * secret_collection_delete_sync:
 * @self: a collection
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Delete this collection.
 *
 * This method may block indefinitely and should not be used in user
 * interface threads. The secret service may prompt the user.
 * secret_service_prompt() will be used to handle any prompts that show up.
 *
 * Returns: whether the collection was successfully deleted or not
 */
gboolean
secret_collection_delete_sync (SecretCollection *self,
                               GCancellable *cancellable,
                               GError **error)
{
	SecretSync *sync;
	gboolean ret;

	g_return_val_if_fail (SECRET_IS_COLLECTION (self), FALSE);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_collection_delete (self, cancellable, _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	ret = secret_collection_delete_finish (self, sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return ret;
}

/**
 * secret_collection_get_service:
 * @self: a collection
 *
 * Get the Secret Service object that this collection was created with.
 *
 * Returns: (transfer none): the Secret Service object
 */
SecretService *
secret_collection_get_service (SecretCollection *self)
{
	g_return_val_if_fail (SECRET_IS_COLLECTION (self), NULL);
	return self->pv->service;
}

/**
 * secret_collection_get_flags:
 * @self: the secret collection proxy
 *
 * Get the flags representing what features of the #SecretCollection proxy
 * have been initialized.
 *
 * Use secret_collection_load_items()  to initialize further features
 * and change the flags.
 *
 * Returns: the flags for features initialized
 */
SecretCollectionFlags
secret_collection_get_flags (SecretCollection *self)
{
	SecretCollectionFlags flags = 0;

	g_return_val_if_fail (SECRET_IS_COLLECTION (self), SECRET_COLLECTION_NONE);

	g_mutex_lock (&self->pv->mutex);

	if (self->pv->items)
		flags |= SECRET_COLLECTION_LOAD_ITEMS;

	g_mutex_unlock (&self->pv->mutex);

	return flags;
}

/**
 * secret_collection_get_items:
 * @self: a collection
 *
 * Get the list of items in this collection.
 *
 * Returns: (transfer full) (element-type Secret.Item): a list of items,
 * when done, the list should be freed with g_list_free, and each item should
 * be released with g_object_unref()
 */
GList *
secret_collection_get_items (SecretCollection *self)
{
	GList *l, *items = NULL;

	g_return_val_if_fail (SECRET_IS_COLLECTION (self), NULL);

	g_mutex_lock (&self->pv->mutex);
	if (self->pv->items)
		items = g_hash_table_get_values (self->pv->items);
	for (l = items; l != NULL; l = g_list_next (l))
		g_object_ref (l->data);
	g_mutex_unlock (&self->pv->mutex);

	return items;
}

SecretItem *
_secret_collection_find_item_instance (SecretCollection *self,
                                       const gchar *item_path)
{
	SecretItem *item = NULL;

	g_mutex_lock (&self->pv->mutex);
	if (self->pv->items)
		item = g_hash_table_lookup (self->pv->items, item_path);
	if (item != NULL)
		g_object_ref (item);
	g_mutex_unlock (&self->pv->mutex);

	return item;
}

/**
 * secret_collection_get_label:
 * @self: a collection
 *
 * Get the label of this collection.
 *
 * Returns: (transfer full): the label, which should be freed with g_free()
 */
gchar *
secret_collection_get_label (SecretCollection *self)
{
	GVariant *variant;
	gchar *label;

	g_return_val_if_fail (SECRET_IS_COLLECTION (self), NULL);

	variant = g_dbus_proxy_get_cached_property (G_DBUS_PROXY (self), "Label");
	g_return_val_if_fail (variant != NULL, NULL);

	label = g_variant_dup_string (variant, NULL);
	g_variant_unref (variant);

	return label;
}

/**
 * secret_collection_set_label:
 * @self: a collection
 * @label: a new label
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Set the label of this collection.
 *
 * This function returns immediately and completes asynchronously.
 */
void
secret_collection_set_label (SecretCollection *self,
                             const gchar *label,
                             GCancellable *cancellable,
                             GAsyncReadyCallback callback,
                             gpointer user_data)
{
	g_return_if_fail (SECRET_IS_COLLECTION (self));
	g_return_if_fail (label != NULL);

	_secret_util_set_property (G_DBUS_PROXY (self), "Label",
	                           g_variant_new_string (label),
	                           secret_collection_set_label,
	                           cancellable, callback, user_data);
}

/**
 * secret_collection_set_label_finish:
 * @self: a collection
 * @result: asynchronous result passed to callback
 * @error: location to place error on failure
 *
 * Complete asynchronous operation to set the label of this collection.
 *
 * Returns: whether the change was successful or not
 */
gboolean
secret_collection_set_label_finish (SecretCollection *self,
                                    GAsyncResult *result,
                                    GError **error)
{
	g_return_val_if_fail (SECRET_IS_COLLECTION (self), FALSE);

	return _secret_util_set_property_finish (G_DBUS_PROXY (self),
	                                         secret_collection_set_label,
	                                         result, error);
}

/**
 * secret_collection_set_label_sync:
 * @self: a collection
 * @label: a new label
 * @cancellable: optional cancellation object
 * @error: location to place error on failure
 *
 * Set the label of this collection.
 *
 * This function may block indefinitely. Use the asynchronous version
 * in user interface threads.
 *
 * Returns: whether the change was successful or not
 */
gboolean
secret_collection_set_label_sync (SecretCollection *self,
                                  const gchar *label,
                                  GCancellable *cancellable,
                                  GError **error)
{
	g_return_val_if_fail (SECRET_IS_COLLECTION (self), FALSE);
	g_return_val_if_fail (label != NULL, FALSE);

	return _secret_util_set_property_sync (G_DBUS_PROXY (self), "Label",
	                                       g_variant_new_string (label),
	                                       cancellable, error);
}

/**
 * secret_collection_get_locked:
 * @self: a collection
 *
 * Get whether the collection is locked or not.
 *
 * Use secret_service_lock() or secret_service_unlock() to lock or unlock the
 * collection.
 *
 * Returns: whether the collection is locked or not
 */
gboolean
secret_collection_get_locked (SecretCollection *self)
{
	GVariant *variant;
	gboolean locked;

	g_return_val_if_fail (SECRET_IS_COLLECTION (self), TRUE);

	variant = g_dbus_proxy_get_cached_property (G_DBUS_PROXY (self), "Locked");
	g_return_val_if_fail (variant != NULL, TRUE);

	locked = g_variant_get_boolean (variant);
	g_variant_unref (variant);

	return locked;
}

/**
 * secret_collection_get_created:
 * @self: a collection
 *
 * Get the created date and time of the collection. The return value is
 * the number of seconds since the unix epoch, January 1st 1970.
 *
 * Returns: the created date and time
 */
guint64
secret_collection_get_created (SecretCollection *self)
{
	GVariant *variant;
	guint64 created;

	g_return_val_if_fail (SECRET_IS_COLLECTION (self), TRUE);

	variant = g_dbus_proxy_get_cached_property (G_DBUS_PROXY (self), "Created");
	g_return_val_if_fail (variant != NULL, 0);

	created = g_variant_get_uint64 (variant);
	g_variant_unref (variant);

	return created;
}

/**
 * secret_collection_get_modified:
 * @self: a collection
 *
 * Get the modified date and time of the collection. The return value is
 * the number of seconds since the unix epoch, January 1st 1970.
 *
 * Returns: the modified date and time
 */
guint64
secret_collection_get_modified (SecretCollection *self)
{
	GVariant *variant;
	guint64 modified;

	g_return_val_if_fail (SECRET_IS_COLLECTION (self), TRUE);

	variant = g_dbus_proxy_get_cached_property (G_DBUS_PROXY (self), "Modified");
	g_return_val_if_fail (variant != NULL, 0);

	modified = g_variant_get_uint64 (variant);
	g_variant_unref (variant);

	return modified;
}


typedef struct {
	GCancellable *cancellable;
	gchar *alias;
	SecretCollectionFlags flags;
	SecretCollection *collection;
} ReadClosure;

static void
read_closure_free (gpointer data)
{
	ReadClosure *read = data;
	g_free (read->alias);
	if (read->collection)
		g_object_unref (read->collection);
	if (read->cancellable)
		g_object_unref (read->cancellable);
	g_slice_free (ReadClosure, read);
}

static void
on_read_alias_collection (GObject *source,
                          GAsyncResult *result,
                          gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	ReadClosure *read = g_simple_async_result_get_op_res_gpointer (async);
	GError *error = NULL;

	read->collection = secret_collection_new_for_dbus_path_finish (result, &error);
	if (error != NULL)
		g_simple_async_result_take_error (async, error);

	g_simple_async_result_complete (async);
	g_object_unref (async);
}

static void
on_read_alias_path (GObject *source,
                    GAsyncResult *result,
                    gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	ReadClosure *read = g_simple_async_result_get_op_res_gpointer (async);
	SecretService *self = SECRET_SERVICE (source);
	GError *error = NULL;
	gchar *collection_path;

	collection_path = secret_service_read_alias_dbus_path_finish (self, result, &error);
	if (error == NULL) {

		/* No collection for this alias */
		if (collection_path == NULL) {
			g_simple_async_result_complete (async);

		} else {
			read->collection = _secret_service_find_collection_instance (self,
			                                                             collection_path);
			if (read->collection != NULL) {

				/* Make sure collection has necessary flags */
				collection_ensure_for_flags_async (read->collection, read->flags,
				                                   read->cancellable, async);

			/* No collection loaded, but valid path, load */
			} else {
				secret_collection_new_for_dbus_path (self, collection_path,
				                                     read->flags,
				                                     read->cancellable,
				                                     on_read_alias_collection,
				                                     g_object_ref (async));
			}
		}

	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_free (collection_path);
	g_object_unref (async);
}

static void
on_read_alias_service (GObject *source,
                       GAsyncResult *result,
                       gpointer user_data)
{
	GSimpleAsyncResult *async = G_SIMPLE_ASYNC_RESULT (user_data);
	ReadClosure *read = g_simple_async_result_get_op_res_gpointer (async);
	SecretService *service;
	GError *error = NULL;

	service = secret_service_get_finish (result, &error);
	if (error == NULL) {
		secret_service_read_alias_dbus_path (service, read->alias, read->cancellable,
		                                     on_read_alias_path, g_object_ref (async));
		g_object_unref (service);

	} else {
		g_simple_async_result_take_error (async, error);
		g_simple_async_result_complete (async);
	}

	g_object_unref (async);
}

/**
 * secret_collection_for_alias:
 * @service: (allow-none): a secret service object
 * @alias: the alias to lookup
 * @flags: options for the collection initialization
 * @cancellable: (allow-none): optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to pass to the callback
 *
 * Lookup which collection is assigned to this alias. Aliases help determine
 * well known collections, such as 'default'.
 *
 * If @service is NULL, then secret_service_get() will be called to get
 * the default #SecretService proxy.
 *
 * This method will return immediately and complete asynchronously.
 */
void
secret_collection_for_alias (SecretService *service,
                             const gchar *alias,
                             SecretCollectionFlags flags,
                             GCancellable *cancellable,
                             GAsyncReadyCallback callback,
                             gpointer user_data)
{
	GSimpleAsyncResult *async;
	ReadClosure *read;

	g_return_if_fail (service == NULL || SECRET_IS_SERVICE (service));
	g_return_if_fail (alias != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	async = g_simple_async_result_new (NULL, callback, user_data,
	                                   secret_collection_for_alias);
	read = g_slice_new0 (ReadClosure);
	read->cancellable = cancellable ? g_object_ref (cancellable) : NULL;
	read->alias = g_strdup (alias);
	read->flags = flags;
	g_simple_async_result_set_op_res_gpointer (async, read, read_closure_free);

	if (service == NULL) {
		secret_service_get (SECRET_SERVICE_NONE, cancellable,
		                    on_read_alias_service, g_object_ref (async));
	} else {
		secret_service_read_alias_dbus_path (service, read->alias, read->cancellable,
		                                     on_read_alias_path, g_object_ref (async));
	}

	g_object_unref (async);
}

/**
 * secret_collection_for_alias_finish:
 * @result: asynchronous result passed to callback
 * @error: location to place error on failure
 *
 * Finish an asynchronous operation to lookup which collection is assigned
 * to an alias.
 *
 * Returns: (transfer full): the collection, or %NULL if none assigned to the alias
 */
SecretCollection *
secret_collection_for_alias_finish (GAsyncResult *result,
                                    GError **error)
{
	GSimpleAsyncResult *async;
	ReadClosure *read;

	g_return_val_if_fail (g_simple_async_result_is_valid (result, NULL,
	                      secret_collection_for_alias), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	async = G_SIMPLE_ASYNC_RESULT (result);
	if (_secret_util_propagate_error (async, error))
		return NULL;
	read = g_simple_async_result_get_op_res_gpointer (async);
	if (read->collection)
		g_object_ref (read->collection);
	return read->collection;
}

/**
 * secret_collection_for_alias_sync:
 * @service: (allow-none): a secret service object
 * @alias: the alias to lookup
 * @flags: options for the collection initialization
 * @cancellable: (allow-none): optional cancellation object
 * @error: location to place error on failure
 *
 * Lookup which collection is assigned to this alias. Aliases help determine
 * well known collections, such as 'default'.
 *
 * If @service is NULL, then secret_service_get_sync() will be called to get
 * the default #SecretService proxy.
 *
 * This method may block and should not be used in user interface threads.
 *
 * Returns: (transfer full): the collection, or %NULL if none assigned to the alias
 */
SecretCollection *
secret_collection_for_alias_sync (SecretService *service,
                                  const gchar *alias,
                                  SecretCollectionFlags flags,
                                  GCancellable *cancellable,
                                  GError **error)
{
	SecretCollection *collection;
	gchar *collection_path;

	g_return_val_if_fail (service == NULL || SECRET_IS_SERVICE (service), NULL);
	g_return_val_if_fail (alias != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	collection_path = secret_service_read_alias_dbus_path_sync (service, alias,
	                                                            cancellable, error);
	 /* No collection for this alias */
	if (collection_path == NULL)
		return NULL;

	collection = _secret_service_find_collection_instance (service,
	                                                       collection_path);

	if (collection != NULL) {

		/* Have a collection with all necessary flags */
		if (!collection_ensure_for_flags_sync (collection, flags,
		                                       cancellable, error)) {
			g_object_unref (collection);
			collection = NULL;
		}

	/* No collection loaded, but valid path, load */
	} else {
		collection = secret_collection_new_for_dbus_path_sync (service, collection_path,
		                                                       flags, cancellable, error);
	}

	g_free (collection_path);
	return collection;
}
