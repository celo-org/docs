/* libsecret - GLib wrapper for Secret Service
 *
 * Copyright 2011 Collabora Ltd.
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

#ifndef __SECRET_PRIVATE_H__
#define __SECRET_PRIVATE_H__

#include <gio/gio.h>

#include "secret-item.h"
#include "secret-service.h"
#include "secret-value.h"

G_BEGIN_DECLS

typedef struct {
	GAsyncResult *result;
	GMainContext *context;
	GMainLoop *loop;
} SecretSync;

typedef struct _SecretSession SecretSession;

#define              SECRET_ALIAS_PREFIX                      "/org/freedesktop/secrets/aliases/"

#define              SECRET_SERVICE_PATH                      "/org/freedesktop/secrets"

#define              SECRET_SERVICE_BUS_NAME                  "org.freedesktop.secrets"

#define              SECRET_ITEM_INTERFACE                    "org.freedesktop.Secret.Item"
#define              SECRET_COLLECTION_INTERFACE              "org.freedesktop.Secret.Collection"
#define              SECRET_PROMPT_INTERFACE                  "org.freedesktop.Secret.Prompt"
#define              SECRET_SERVICE_INTERFACE                 "org.freedesktop.Secret.Service"

#define              SECRET_SIGNAL_COLLECTION_CREATED "CollectionCreated"
#define              SECRET_SIGNAL_COLLECTION_CHANGED "CollectionChanged"
#define              SECRET_SIGNAL_COLLECTION_DELETED "CollectionDeleted"
#define              SECRET_SIGNAL_ITEM_CREATED       "ItemCreated"
#define              SECRET_SIGNAL_ITEM_CHANGED       "ItemChanged"
#define              SECRET_SIGNAL_ITEM_DELETED       "ItemDeleted"
#define              SECRET_PROMPT_SIGNAL_COMPLETED   "Completed"

#define              SECRET_PROPERTIES_INTERFACE              "org.freedesktop.DBus.Properties"

SecretSync *         _secret_sync_new                         (void);

void                 _secret_sync_free                        (gpointer data);

void                 _secret_sync_on_result                   (GObject *source,
                                                               GAsyncResult *result,
                                                               gpointer user_data);

SecretPrompt *       _secret_prompt_instance                  (SecretService *service,
                                                               const gchar *prompt_path);

void                 _secret_util_strip_remote_error          (GError **error);

gboolean             _secret_util_propagate_error             (GSimpleAsyncResult *async,
                                                               GError **error);

gchar *              _secret_util_parent_path                 (const gchar *path);

gboolean             _secret_util_empty_path                  (const gchar *path);

gchar *              _secret_util_collection_to_path          (const gchar *collection);

gint                 _secret_util_array_index_of              (GVariant *array,
                                                               GVariant *value);

GType                _secret_list_get_type                    (void) G_GNUC_CONST;

GVariant *           _secret_attributes_to_variant            (GHashTable *attributes,
                                                               const gchar *schema_name);

GHashTable *         _secret_attributes_for_variant           (GVariant *variant);

GHashTable *         _secret_attributes_copy                  (GHashTable *attributes);

gboolean             _secret_attributes_validate              (const SecretSchema *schema,
                                                               GHashTable *attributes,
                                                               const gchar *pretty_function,
                                                               gboolean matching);

GVariant *           _secret_util_variant_for_properties      (GHashTable *properties);

void                 _secret_util_get_properties              (GDBusProxy *proxy,
                                                               gpointer result_tag,
                                                               GCancellable *cancellable,
                                                               GAsyncReadyCallback callback,
                                                               gpointer user_data);

gboolean             _secret_util_get_properties_finish       (GDBusProxy *proxy,
                                                               gpointer result_tag,
                                                               GAsyncResult *result,
                                                               GError **error);

void                 _secret_util_set_property                (GDBusProxy *proxy,
                                                               const gchar *property,
                                                               GVariant *value,
                                                               gpointer result_tag,
                                                               GCancellable *cancellable,
                                                               GAsyncReadyCallback callback,
                                                               gpointer user_data);

gboolean             _secret_util_set_property_finish         (GDBusProxy *proxy,
                                                               gpointer result_tag,
                                                               GAsyncResult *result,
                                                               GError **error);

gboolean             _secret_util_set_property_sync           (GDBusProxy *proxy,
                                                               const gchar *property,
                                                               GVariant *value,
                                                               GCancellable *cancellable,
                                                               GError **error);

gboolean             _secret_util_have_cached_properties      (GDBusProxy *proxy);

SecretSession *      _secret_service_get_session              (SecretService *self);

void                 _secret_service_take_session             (SecretService *self,
                                                               SecretSession *session);

void                 _secret_service_delete_path              (SecretService *self,
                                                               const gchar *object_path,
                                                               gboolean is_an_item,
                                                               GCancellable *cancellable,
                                                               GAsyncReadyCallback callback,
                                                               gpointer user_data);

gboolean             _secret_service_delete_path_finish       (SecretService *self,
                                                               GAsyncResult *result,
                                                               GError **error);

void                 _secret_service_search_for_paths_variant (SecretService *self,
                                                               GVariant *attributes,
                                                               GCancellable *cancellable,
                                                               GAsyncReadyCallback callback,
                                                               gpointer user_data);

SecretItem *         _secret_service_find_item_instance       (SecretService *self,
                                                               const gchar *item_path);

SecretCollection *   _secret_service_find_collection_instance (SecretService *self,
                                                               const gchar *collection_path);

SecretValue *        _secret_service_decode_get_secrets_first (SecretService *self,
                                                               GVariant *out);

GHashTable *         _secret_service_decode_get_secrets_all   (SecretService *self,
                                                               GVariant *out);

void                 _secret_service_xlock_paths_async        (SecretService *self,
                                                               const gchar *method,
                                                               const gchar **paths,
                                                               GCancellable *cancellable,
                                                               GAsyncReadyCallback callback,
                                                               gpointer user_data);

gint                 _secret_service_xlock_paths_finish       (SecretService *self,
                                                               GAsyncResult *result,
                                                               gchar ***xlocked,
                                                               GError **error);

void                 _secret_service_create_item_dbus_path_finish_raw  (GAsyncResult *result,
                                                                        GError **error);

GHashTable *         _secret_collection_properties_new        (const gchar *label);

SecretItem *         _secret_collection_find_item_instance    (SecretCollection *self,
                                                               const gchar *item_path);

gchar *              _secret_value_unref_to_password          (SecretValue *value);

gchar *              _secret_value_unref_to_string            (SecretValue *value);

void                 _secret_session_free                     (gpointer data);

const gchar *        _secret_session_get_algorithms           (SecretSession *session);

const gchar *        _secret_session_get_path                 (SecretSession *session);

void                 _secret_session_open                     (SecretService *service,
                                                               GCancellable *cancellable,
                                                               GAsyncReadyCallback callback,
                                                               gpointer user_data);

gboolean             _secret_session_open_finish              (GAsyncResult *result,
                                                               GError **error);

GVariant *           _secret_session_encode_secret            (SecretSession *session,
                                                               SecretValue *value);

SecretValue *        _secret_session_decode_secret            (SecretSession *session,
                                                               GVariant *encoded);

void                 _secret_item_set_cached_secret           (SecretItem *self,
                                                               SecretValue *value);

const SecretSchema * _secret_schema_ref_if_nonstatic          (const SecretSchema *schema);

void                 _secret_schema_unref_if_nonstatic        (const SecretSchema *schema);

G_END_DECLS

#endif /* __SECRET_PRIVATE_H___ */
