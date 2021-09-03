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

#include "config.h"

#include "secret-attributes.h"
#include "secret-password.h"
#include "secret-private.h"
#include "secret-value.h"

#include <egg/egg-secure-memory.h>

/**
 * SECTION:secret-password
 * @title: Password storage
 * @short_description: Simple password storage and lookup
 *
 * This is a simple API for storing passwords and retrieving passwords in the
 * Secret Service.
 *
 * Each password is associated with a set of attributes. Attribute values can
 * be either strings, integers or booleans.
 *
 * The names and types of allowed attributes for a given password are defined
 * with a schema. Certain schemas are predefined. Additional schemas can be
 * defined via the %SecretSchema structure.
 *
 * Each of the functions accept a variable list of attributes names and their
 * values. Include a %NULL to terminate the list of attributes.
 *
 * Stability: Stable
 */

/**
 * secret_password_store: (skip)
 * @schema: the schema for attributes
 * @collection: (allow-none): a collection alias, or D-Bus object path of the collection where to store the secret
 * @label: label for the secret
 * @password: the null-terminated password to store
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 * @...: the attribute keys and values, terminated with %NULL
 *
 * Store a password in the secret service.
 *
 * The variable argument list should contain pairs of a) The attribute name as
 * a null-terminated string, followed by b) attribute value, either a character
 * string, an int number, or a gboolean value, as defined in the @schema.
 * The list of attribtues should be terminated with a %NULL.
 *
 * If the attributes match a secret item already stored in the collection, then
 * the item will be updated with these new values.
 *
 * If @collection is %NULL, then the default collection will be
 * used. Use #SECRET_COLLECTION_SESSION to store the password in the session
 * collection, which doesn't get stored across login sessions.
 *
 * This method will return immediately and complete asynchronously.
 */
void
secret_password_store (const SecretSchema *schema,
                       const gchar *collection,
                       const gchar *label,
                       const gchar *password,
                       GCancellable *cancellable,
                       GAsyncReadyCallback callback,
                       gpointer user_data,
                       ...)
{
	GHashTable *attributes;
	va_list va;

	g_return_if_fail (schema != NULL);
	g_return_if_fail (label != NULL);
	g_return_if_fail (password != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	va_start (va, user_data);
	attributes = secret_attributes_buildv (schema, va);
	va_end (va);

	/* Precondition failed, already warned */
	if (!attributes)
		return;

	secret_password_storev (schema, attributes, collection, label, password,
	                        cancellable, callback, user_data);

	g_hash_table_unref (attributes);
}

/**
 * secret_password_storev: (rename-to secret_password_store)
 * @schema: the schema for attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @collection: (allow-none): a collection alias, or D-Bus object path of the collection where to store the secret
 * @label: label for the secret
 * @password: the null-terminated password to store
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Store a password in the secret service.
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
 * This method will return immediately and complete asynchronously.
 */
void
secret_password_storev (const SecretSchema *schema,
                        GHashTable *attributes,
                        const gchar *collection,
                        const gchar *label,
                        const gchar *password,
                        GCancellable *cancellable,
                        GAsyncReadyCallback callback,
                        gpointer user_data)
{
	SecretValue *value;

	g_return_if_fail (schema != NULL);
	g_return_if_fail (label != NULL);
	g_return_if_fail (password != NULL);
	g_return_if_fail (attributes != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	/* Warnings raised already */
	if (!_secret_attributes_validate (schema, attributes, G_STRFUNC, FALSE))
		return;

	value = secret_value_new (password, -1, "text/plain");

	secret_service_store (NULL, schema, attributes, collection,
	                      label, value, cancellable, callback, user_data);

	secret_value_unref (value);
}

/**
 * secret_password_store_finish:
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Finish asynchronous operation to store a password in the secret service.
 *
 * Returns: whether the storage was successful or not
 */
gboolean
secret_password_store_finish (GAsyncResult *result,
                              GError **error)
{
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);
	return secret_service_store_finish (NULL, result, error);
}

/**
 * secret_password_store_sync:
 * @schema: the schema for attributes
 * @collection: (allow-none): a collection alias, or D-Bus object path of the collection where to store the secret
 * @label: label for the secret
 * @password: the null-terminated password to store
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 * @...: the attribute keys and values, terminated with %NULL
 *
 * Store a password in the secret service.
 *
 * The variable argument list should contain pairs of a) The attribute name as
 * a null-terminated string, followed by b) attribute value, either a character
 * string, an int number, or a gboolean value, as defined in the @schema.
 * The list of attribtues should be terminated with a %NULL.
 *
 * If the attributes match a secret item already stored in the collection, then
 * the item will be updated with these new values.
 *
 * If @collection is %NULL, then the default collection will be
 * used. Use #SECRET_COLLECTION_SESSION to store the password in the session
 * collection, which doesn't get stored across login sessions.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Returns: whether the storage was successful or not
 */
gboolean
secret_password_store_sync (const SecretSchema *schema,
                            const gchar *collection,
                            const gchar *label,
                            const gchar *password,
                            GCancellable *cancellable,
                            GError **error,
                            ...)
{
	GHashTable *attributes;
	va_list va;
	gboolean ret;

	g_return_val_if_fail (schema != NULL, FALSE);
	g_return_val_if_fail (label != NULL, FALSE);
	g_return_val_if_fail (password != NULL, FALSE);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	va_start (va, error);
	attributes = secret_attributes_buildv (schema, va);
	va_end (va);

	/* Precondition failed, already warned */
	if (!attributes)
		return FALSE;

	ret = secret_password_storev_sync (schema, attributes, collection,
	                                   label, password, cancellable, error);

	g_hash_table_unref (attributes);
	return ret;
}

/**
 * secret_password_storev_sync: (rename-to secret_password_store_sync)
 * @schema: the schema for attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @collection: (allow-none): a collection alias, or D-Bus object path of the collection where to store the secret
 * @label: label for the secret
 * @password: the null-terminated password to store
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Store a password in the secret service.
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
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Returns: whether the storage was successful or not
 */
gboolean
secret_password_storev_sync (const SecretSchema *schema,
                             GHashTable *attributes,
                             const gchar *collection,
                             const gchar *label,
                             const gchar *password,
                             GCancellable *cancellable,
                             GError **error)
{
	SecretSync *sync;
	gboolean ret;

	g_return_val_if_fail (schema != NULL, FALSE);
	g_return_val_if_fail (label != NULL, FALSE);
	g_return_val_if_fail (password != NULL, FALSE);
	g_return_val_if_fail (attributes != NULL, FALSE);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	/* Warnings raised already */
	if (!_secret_attributes_validate (schema, attributes, G_STRFUNC, FALSE))
		return FALSE;

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_password_storev (schema, attributes, collection, label, password,
	                        cancellable, _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	ret = secret_password_store_finish (sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return ret;
}

/**
 * secret_password_lookup: (skip)
 * @schema: the schema for the attributes
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 * @...: the attribute keys and values, terminated with %NULL
 *
 * Lookup a password in the secret service.
 *
 * The variable argument list should contain pairs of a) The attribute name as
 * a null-terminated string, followed by b) attribute value, either a character
 * string, an int number, or a gboolean value, as defined in the password
 * @schema. The list of attribtues should be terminated with a %NULL.
 *
 * If no secret is found then %NULL is returned.
 *
 * This method will return immediately and complete asynchronously.
 */
void
secret_password_lookup (const SecretSchema *schema,
                        GCancellable *cancellable,
                        GAsyncReadyCallback callback,
                        gpointer user_data,
                        ...)
{
	GHashTable *attributes;
	va_list va;

	g_return_if_fail (schema != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	va_start (va, user_data);
	attributes = secret_attributes_buildv (schema, va);
	va_end (va);

	/* Precondition failed, already warned */
	if (!attributes)
		return;

	secret_password_lookupv (schema, attributes, cancellable,
	                         callback, user_data);

	g_hash_table_unref (attributes);
}

/**
 * secret_password_lookupv: (rename-to secret_password_lookup)
 * @schema: the schema for attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Lookup a password in the secret service.
 *
 * The @attributes should be a set of key and value string pairs.
 *
 * If no secret is found then %NULL is returned.
 *
 * This method will return immediately and complete asynchronously.
 */
void
secret_password_lookupv (const SecretSchema *schema,
                         GHashTable *attributes,
                         GCancellable *cancellable,
                         GAsyncReadyCallback callback,
                         gpointer user_data)
{
	g_return_if_fail (schema != NULL);
	g_return_if_fail (attributes != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	/* Warnings raised already */
	if (!_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return;

	secret_service_lookup (NULL, schema, attributes,
	                       cancellable, callback, user_data);
}

/**
 * secret_password_lookup_nonpageable_finish: (skip)
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Finish an asynchronous operation to lookup a password in the secret service.
 *
 * Returns: (transfer full): a new password string stored in nonpageable memory
 *          which must be freed with secret_password_free() when done
 */
gchar *
secret_password_lookup_nonpageable_finish (GAsyncResult *result,
                                           GError **error)
{
	SecretValue *value;

	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	value = secret_service_lookup_finish (NULL, result, error);
	if (value == NULL)
		return NULL;

	return _secret_value_unref_to_password (value);
}

/**
 * secret_password_lookup_finish:
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Finish an asynchronous operation to lookup a password in the secret service.
 *
 * Returns: (transfer full): a new password string which should be freed with
 *          secret_password_free() or may be freed with g_free() when done
 */
gchar *
secret_password_lookup_finish (GAsyncResult *result,
                               GError **error)
{
	SecretValue *value;

	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	value = secret_service_lookup_finish (NULL, result, error);
	if (value == NULL)
		return NULL;

	return _secret_value_unref_to_string (value);
}

/**
 * secret_password_lookup_sync: (skip)
 * @schema: the schema for the attributes
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 * @...: the attribute keys and values, terminated with %NULL
 *
 * Lookup a password in the secret service.
 *
 * The variable argument list should contain pairs of a) The attribute name as
 * a null-terminated string, followed by b) attribute value, either a character
 * string, an int number, or a gboolean value, as defined in the password
 * @schema. The list of attributes should be terminated with a %NULL.
 *
 * If no secret is found then %NULL is returned.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Returns: (transfer full): a new password string which should be freed with
 *          secret_password_free() or may be freed with g_free() when done
 */
gchar *
secret_password_lookup_sync (const SecretSchema *schema,
                             GCancellable *cancellable,
                             GError **error,
                             ...)
{
	GHashTable *attributes;
	gchar *password;
	va_list va;

	g_return_val_if_fail (schema != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	va_start (va, error);
	attributes = secret_attributes_buildv (schema, va);
	va_end (va);

	/* Precondition failed, already warned */
	if (!attributes)
		return NULL;

	password = secret_password_lookupv_sync (schema, attributes,
	                                         cancellable, error);

	g_hash_table_unref (attributes);

	return password;
}

/**
 * secret_password_lookup_nonpageable_sync: (skip)
 * @schema: the schema for the attributes
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 * @...: the attribute keys and values, terminated with %NULL
 *
 * Lookup a password in the secret service.
 *
 * The variable argument list should contain pairs of a) The attribute name as
 * a null-terminated string, followed by b) attribute value, either a character
 * string, an int number, or a gboolean value, as defined in the password
 * @schema. The list of attribtues should be terminated with a %NULL.
 *
 * If no secret is found then %NULL is returned.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Returns: (transfer full): a new password string stored in nonpageable memory
 *          which must be freed with secret_password_free() when done
 */
gchar *
secret_password_lookup_nonpageable_sync (const SecretSchema *schema,
                                         GCancellable *cancellable,
                                         GError **error,
                                         ...)
{
	GHashTable *attributes;
	gchar *password;
	va_list va;

	g_return_val_if_fail (schema != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	va_start (va, error);
	attributes = secret_attributes_buildv (schema, va);
	va_end (va);

	/* Precondition failed, already warned */
	if (!attributes)
		return NULL;

	password = secret_password_lookupv_nonpageable_sync (schema, attributes,
	                                                     cancellable, error);

	g_hash_table_unref (attributes);

	return password;
}

/**
 * secret_password_lookupv_nonpageable_sync: (skip)
 * @schema: the schema for attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Lookup a password in the secret service.
 *
 * The @attributes should be a set of key and value string pairs.
 *
 * If no secret is found then %NULL is returned.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Returns: (transfer full): a new password string stored in non pageable memory
 *          which should be freed with secret_password_free() when done
 */
gchar *
secret_password_lookupv_nonpageable_sync (const SecretSchema *schema,
                                          GHashTable *attributes,
                                          GCancellable *cancellable,
                                          GError **error)
{
	SecretSync *sync;
	gchar *password;

	g_return_val_if_fail (schema != NULL, NULL);
	g_return_val_if_fail (attributes != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	/* Warnings raised already */
	if (!_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return FALSE;

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_password_lookupv (schema, attributes, cancellable,
	                         _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	password = secret_password_lookup_nonpageable_finish (sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return password;
}

/**
 * secret_password_lookupv_sync: (rename-to secret_password_lookup_sync)
 * @schema: the schema for attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Lookup a password in the secret service.
 *
 * The @attributes should be a set of key and value string pairs.
 *
 * If no secret is found then %NULL is returned.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Returns: (transfer full): a new password string which should be freed with
 *          secret_password_free() or may be freed with g_free() when done
 */
gchar *
secret_password_lookupv_sync (const SecretSchema *schema,
                              GHashTable *attributes,
                              GCancellable *cancellable,
                              GError **error)
{
	SecretSync *sync;
	gchar *string;

	g_return_val_if_fail (schema != NULL, NULL);
	g_return_val_if_fail (attributes != NULL, NULL);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), NULL);
	g_return_val_if_fail (error == NULL || *error == NULL, NULL);

	/* Warnings raised already */
	if (!_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return FALSE;

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_password_lookupv (schema, attributes, cancellable,
	                         _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	string = secret_password_lookup_finish (sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return string;
}

/**
 * secret_password_clear:
 * @schema: the schema for the attributes
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 * @...: the attribute keys and values, terminated with %NULL
 *
 * Clear unlocked matching passwords from the secret service.
 *
 * The variable argument list should contain pairs of a) The attribute name as
 * a null-terminated string, followed by b) attribute value, either a character
 * string, an int number, or a gboolean value, as defined in the password
 * @schema. The list of attribtues should be terminated with a %NULL.
 *
 * All unlocked items that match the attributes will be deleted.
 *
 * This method will return immediately and complete asynchronously.
 */
void
secret_password_clear (const SecretSchema *schema,
                       GCancellable *cancellable,
                       GAsyncReadyCallback callback,
                       gpointer user_data,
                       ...)
{
	GHashTable *attributes;
	va_list va;

	g_return_if_fail (schema != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	va_start (va, user_data);
	attributes = secret_attributes_buildv (schema, va);
	va_end (va);

	/* Precondition failed, already warned */
	if (!attributes)
		return;

	secret_password_clearv (schema, attributes, cancellable,
	                        callback, user_data);

	g_hash_table_unref (attributes);
}


/**
 * secret_password_clearv: (rename-to secret_password_clear)
 * @schema: the schema for the attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @cancellable: optional cancellation object
 * @callback: called when the operation completes
 * @user_data: data to be passed to the callback
 *
 * Remove unlocked matching passwords from the secret service.
 *
 * The @attributes should be a set of key and value string pairs.
 *
 * All unlocked items that match the attributes will be deleted.
 *
 * This method will return immediately and complete asynchronously.
 */
void
secret_password_clearv (const SecretSchema *schema,
                        GHashTable *attributes,
                        GCancellable *cancellable,
                        GAsyncReadyCallback callback,
                        gpointer user_data)
{
	g_return_if_fail (schema != NULL);
	g_return_if_fail (attributes != NULL);
	g_return_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable));

	/* Warnings raised already */
	if (!_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return;

	secret_service_clear (NULL, schema, attributes,
	                      cancellable, callback, user_data);
}

/**
 * secret_password_clear_finish:
 * @result: the asynchronous result passed to the callback
 * @error: location to place an error on failure
 *
 * Finish an asynchronous operation to remove passwords from the secret
 * service.
 *
 * Returns: whether any passwords were removed
 */
gboolean
secret_password_clear_finish (GAsyncResult *result,
                              GError **error)
{
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);
	return secret_service_clear_finish (NULL, result, error);
}

/**
 * secret_password_clear_sync:
 * @schema: the schema for the attributes
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 * @...: the attribute keys and values, terminated with %NULL
 *
 * Remove unlocked matching passwords from the secret service.
 *
 * The variable argument list should contain pairs of a) The attribute name as
 * a null-terminated string, followed by b) attribute value, either a character
 * string, an int number, or a gboolean value, as defined in the password
 * @schema. The list of attribtues should be terminated with a %NULL.
 *
 * All unlocked items that match the attributes will be deleted.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Returns: whether the any passwords were removed
 */
gboolean
secret_password_clear_sync (const SecretSchema* schema,
                            GCancellable *cancellable,
                            GError **error,
                            ...)
{
	GHashTable *attributes;
	gboolean result;
	va_list va;

	g_return_val_if_fail (schema != NULL, FALSE);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	va_start (va, error);
	attributes = secret_attributes_buildv (schema, va);
	va_end (va);

	/* Precondition failed, already warned */
	if (!attributes)
		return FALSE;

	result = secret_password_clearv_sync (schema, attributes,
	                                      cancellable, error);

	g_hash_table_unref (attributes);

	return result;
}

/**
 * secret_password_clearv_sync: (rename-to secret_password_clear_sync)
 * @schema: the schema for the attributes
 * @attributes: (element-type utf8 utf8): the attribute keys and values
 * @cancellable: optional cancellation object
 * @error: location to place an error on failure
 *
 * Remove unlocked matching passwords from the secret service.
 *
 * The @attributes should be a set of key and value string pairs.
 *
 * All unlocked items that match the attributes will be deleted.
 *
 * This method may block indefinitely and should not be used in user interface
 * threads.
 *
 * Returns: whether any passwords were removed
 */
gboolean
secret_password_clearv_sync (const SecretSchema *schema,
                             GHashTable *attributes,
                             GCancellable *cancellable,
                             GError **error)
{
	SecretSync *sync;
	gboolean result;

	g_return_val_if_fail (schema != NULL, FALSE);
	g_return_val_if_fail (attributes != NULL, FALSE);
	g_return_val_if_fail (cancellable == NULL || G_IS_CANCELLABLE (cancellable), FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	/* Warnings raised already */
	if (!_secret_attributes_validate (schema, attributes, G_STRFUNC, TRUE))
		return FALSE;

	sync = _secret_sync_new ();
	g_main_context_push_thread_default (sync->context);

	secret_password_clearv (schema, attributes, cancellable,
	                        _secret_sync_on_result, sync);

	g_main_loop_run (sync->loop);

	result = secret_password_clear_finish (sync->result, error);

	g_main_context_pop_thread_default (sync->context);
	_secret_sync_free (sync);

	return result;
}

/**
 * secret_password_free: (skip)
 * @password: (allow-none): password to free
 *
 * Clear the memory used by a password, and then free it.
 *
 * This function must be used to free nonpageable memory returned by
 * secret_password_lookup_nonpageable_finish(),
 * secret_password_lookup_nonpageable_sync() or
 * secret_password_lookupv_nonpageable_sync().
 */
void
secret_password_free (gchar *password)
{
	if (password == NULL)
		return;

	egg_secure_strfree (password);
}

/**
 * secret_password_wipe:
 * @password: (allow-none): password to clear
 *
 * Clear the memory used by a password.
 */
void
secret_password_wipe (gchar *password)
{
	if (password == NULL)
		return;

	egg_secure_strclear (password);
}
