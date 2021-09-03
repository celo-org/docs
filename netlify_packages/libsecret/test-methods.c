/* libsecret - GLib wrapper for Secret Service
 *
 * Copyright 2011 Collabora Ltd.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation; either version 2 of the licence or (at
 * your option) any later version.
 *
 * See the included COPYING file for more information.
 */


#include "config.h"

#include "secret-attributes.h"
#include "secret-collection.h"
#include "secret-item.h"
#include "secret-paths.h"
#include "secret-private.h"
#include "secret-service.h"

#include "mock-service.h"

#include "egg/egg-testing.h"

#include <glib.h>

#include <errno.h>
#include <stdlib.h>

static const SecretSchema MOCK_SCHEMA = {
	"org.mock.Schema",
	SECRET_SCHEMA_NONE,
	{
		{ "number", SECRET_SCHEMA_ATTRIBUTE_INTEGER },
		{ "string", SECRET_SCHEMA_ATTRIBUTE_STRING },
		{ "even", SECRET_SCHEMA_ATTRIBUTE_BOOLEAN },
	}
};

static const SecretSchema PRIME_SCHEMA = {
	"org.mock.Prime",
	SECRET_SCHEMA_NONE,
	{
		{ "number", SECRET_SCHEMA_ATTRIBUTE_INTEGER },
		{ "string", SECRET_SCHEMA_ATTRIBUTE_STRING },
		{ "prime", SECRET_SCHEMA_ATTRIBUTE_BOOLEAN },
	}
};

static const SecretSchema NO_NAME_SCHEMA = {
	"unused.Schema.Name",
	SECRET_SCHEMA_DONT_MATCH_NAME,
	{
		{ "number", SECRET_SCHEMA_ATTRIBUTE_INTEGER },
		{ "string", SECRET_SCHEMA_ATTRIBUTE_STRING },
	}
};

typedef struct {
	SecretService *service;
} Test;

static void
setup_mock (Test *test,
            gconstpointer data)
{
	GError *error = NULL;
	const gchar *mock_script = data;

	mock_service_start (mock_script, &error);
	g_assert_no_error (error);
}

static void
setup (Test *test,
       gconstpointer data)
{
	GError *error = NULL;

	setup_mock (test, data);

	test->service = secret_service_get_sync (SECRET_SERVICE_NONE, NULL, &error);
	g_assert_no_error (error);
	g_object_add_weak_pointer (G_OBJECT (test->service), (gpointer *)&test->service);
}

static void
teardown_mock (Test *test,
               gconstpointer unused)
{
	secret_service_disconnect ();
	mock_service_stop ();
}

static void
teardown (Test *test,
          gconstpointer unused)
{
	egg_test_wait_idle ();

	g_object_unref (test->service);
	secret_service_disconnect ();
	g_assert (test->service == NULL);

	teardown_mock (test, unused);
}

static void
on_complete_get_result (GObject *source,
                        GAsyncResult *result,
                        gpointer user_data)
{
	GAsyncResult **ret = user_data;
	g_assert (ret != NULL);
	g_assert (*ret == NULL);
	*ret = g_object_ref (result);
	egg_test_wait_stop ();
}

static void
test_search_sync (Test *test,
                  gconstpointer used)
{
	GHashTable *attributes;
	GError *error = NULL;
	GList *items;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	items = secret_service_search_sync (test->service, &MOCK_SCHEMA, attributes,
	                                    SECRET_SEARCH_NONE, NULL, &error);
	g_assert_no_error (error);
	g_hash_table_unref (attributes);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");

	g_assert (items->next == NULL);
	g_list_free_full (items, g_object_unref);
}

static void
test_search_async (Test *test,
                   gconstpointer used)
{
	GAsyncResult *result = NULL;
	GHashTable *attributes;
	GError *error = NULL;
	GList *items;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	secret_service_search (test->service, &MOCK_SCHEMA, attributes,
	                       SECRET_SEARCH_NONE, NULL,
	                       on_complete_get_result, &result);
	g_hash_table_unref (attributes);
	g_assert (result == NULL);

	egg_test_wait ();

	g_assert (G_IS_ASYNC_RESULT (result));
	items = secret_service_search_finish (test->service, result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");

	g_assert (items->next == NULL);
	g_list_free_full (items, g_object_unref);
}

static void
test_search_all_sync (Test *test,
                  gconstpointer used)
{
	GHashTable *attributes;
	GError *error = NULL;
	GList *items;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	items = secret_service_search_sync (test->service, &MOCK_SCHEMA, attributes,
	                                    SECRET_SEARCH_ALL, NULL, &error);
	g_assert_no_error (error);
	g_hash_table_unref (attributes);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");
	g_assert (secret_item_get_locked (items->data) == FALSE);
	g_assert (secret_item_get_secret (items->data) == NULL);

	g_assert (items->next != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->next->data), ==, "/org/freedesktop/secrets/collection/spanish/10");
	g_assert (secret_item_get_locked (items->next->data) == TRUE);
	g_assert (secret_item_get_secret (items->next->data) == NULL);

	g_assert (items->next->next == NULL);
	g_list_free_full (items, g_object_unref);
}

static void
test_search_all_async (Test *test,
                   gconstpointer used)
{
	GAsyncResult *result = NULL;
	GHashTable *attributes;
	GError *error = NULL;
	GList *items;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	secret_service_search (test->service, &MOCK_SCHEMA, attributes,
	                       SECRET_SEARCH_ALL, NULL,
	                       on_complete_get_result, &result);
	g_hash_table_unref (attributes);
	g_assert (result == NULL);

	egg_test_wait ();

	g_assert (G_IS_ASYNC_RESULT (result));
	items = secret_service_search_finish (test->service, result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");
	g_assert (secret_item_get_locked (items->data) == FALSE);
	g_assert (secret_item_get_secret (items->data) == NULL);

	g_assert (items->next != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->next->data), ==, "/org/freedesktop/secrets/collection/spanish/10");
	g_assert (secret_item_get_locked (items->next->data) == TRUE);
	g_assert (secret_item_get_secret (items->next->data) == NULL);

	g_assert (items->next->next == NULL);
	g_list_free_full (items, g_object_unref);
}

static void
test_search_unlock_sync (Test *test,
                         gconstpointer used)
{
	GHashTable *attributes;
	GError *error = NULL;
	GList *items;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	items = secret_service_search_sync (test->service, &MOCK_SCHEMA, attributes,
	                                    SECRET_SEARCH_ALL | SECRET_SEARCH_UNLOCK,
	                                    NULL, &error);
	g_assert_no_error (error);
	g_hash_table_unref (attributes);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");
	g_assert (secret_item_get_locked (items->data) == FALSE);
	g_assert (secret_item_get_secret (items->data) == NULL);

	g_assert (items->next != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->next->data), ==, "/org/freedesktop/secrets/collection/spanish/10");
	g_assert (secret_item_get_locked (items->next->data) == FALSE);
	g_assert (secret_item_get_secret (items->next->data) == NULL);

	g_assert (items->next->next == NULL);
	g_list_free_full (items, g_object_unref);
}

static void
test_search_unlock_async (Test *test,
                          gconstpointer used)
{
	GAsyncResult *result = NULL;
	GHashTable *attributes;
	GError *error = NULL;
	GList *items;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	secret_service_search (test->service, &MOCK_SCHEMA, attributes,
	                       SECRET_SEARCH_ALL | SECRET_SEARCH_UNLOCK, NULL,
	                       on_complete_get_result, &result);
	g_hash_table_unref (attributes);
	g_assert (result == NULL);

	egg_test_wait ();

	g_assert (G_IS_ASYNC_RESULT (result));
	items = secret_service_search_finish (test->service, result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");
	g_assert (secret_item_get_locked (items->data) == FALSE);
	g_assert (secret_item_get_secret (items->data) == NULL);

	g_assert (items->next != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->next->data), ==, "/org/freedesktop/secrets/collection/spanish/10");
	g_assert (secret_item_get_locked (items->next->data) == FALSE);
	g_assert (secret_item_get_secret (items->next->data) == NULL);

	g_assert (items->next->next == NULL);
	g_list_free_full (items, g_object_unref);
}

static void
test_search_secrets_sync (Test *test,
                          gconstpointer used)
{
	GHashTable *attributes;
	GError *error = NULL;
	SecretValue *value;
	GList *items;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	items = secret_service_search_sync (test->service, &MOCK_SCHEMA, attributes,
	                                    SECRET_SEARCH_ALL | SECRET_SEARCH_LOAD_SECRETS,
	                                    NULL, &error);
	g_assert_no_error (error);
	g_hash_table_unref (attributes);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");
	g_assert (secret_item_get_locked (items->data) == FALSE);
	value = secret_item_get_secret (items->data);
	g_assert (value != NULL);
	secret_value_unref (value);

	g_assert (items->next != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->next->data), ==, "/org/freedesktop/secrets/collection/spanish/10");
	g_assert (secret_item_get_locked (items->next->data) == TRUE);
	g_assert (secret_item_get_secret (items->next->data) == NULL);

	g_assert (items->next->next == NULL);
	g_list_free_full (items, g_object_unref);
}

static void
test_search_secrets_async (Test *test,
                           gconstpointer used)
{
	GAsyncResult *result = NULL;
	GHashTable *attributes;
	GError *error = NULL;
	SecretValue *value;
	GList *items;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	secret_service_search (test->service, &MOCK_SCHEMA, attributes,
	                       SECRET_SEARCH_ALL | SECRET_SEARCH_LOAD_SECRETS, NULL,
	                       on_complete_get_result, &result);
	g_hash_table_unref (attributes);
	g_assert (result == NULL);

	egg_test_wait ();

	g_assert (G_IS_ASYNC_RESULT (result));
	items = secret_service_search_finish (test->service, result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");
	g_assert (secret_item_get_locked (items->data) == FALSE);
	value = secret_item_get_secret (items->data);
	g_assert (value != NULL);
	secret_value_unref (value);

	g_assert (items->next != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->next->data), ==, "/org/freedesktop/secrets/collection/spanish/10");
	g_assert (secret_item_get_locked (items->next->data) == TRUE);
	g_assert (secret_item_get_secret (items->next->data) == NULL);

	g_assert (items->next->next == NULL);
	g_list_free_full (items, g_object_unref);
}

static void
test_lock_sync (Test *test,
                gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/lockone";
	SecretCollection *collection;
	GError *error = NULL;
	GList *locked;
	GList *objects;
	gboolean ret;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	objects = g_list_append (NULL, collection);

	ret = secret_service_lock_sync (test->service, objects, NULL, &locked, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_assert (locked != NULL);
	g_assert (locked->data == collection);
	g_assert (locked->next == NULL);
	g_list_free_full (locked, g_object_unref);

	g_list_free (objects);
	g_object_unref (collection);
}

static void
test_unlock_sync (Test *test,
                  gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/lockone";
	SecretCollection *collection;
	GError *error = NULL;
	GList *unlocked;
	GList *objects;
	gboolean ret;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	objects = g_list_append (NULL, collection);

	ret = secret_service_unlock_sync (test->service, objects, NULL, &unlocked, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_assert (unlocked != NULL);
	g_assert (unlocked->data == collection);
	g_assert (unlocked->next == NULL);
	g_list_free_full (unlocked, g_object_unref);

	g_list_free (objects);
	g_object_unref (collection);
}

static void
test_clear_sync (Test *test,
                 gconstpointer used)
{
	GError *error = NULL;
	GHashTable *attributes;
	gboolean ret;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "even", FALSE,
	                                      "string", "one",
	                                      "number", 1,
	                                      NULL);

	ret = secret_service_clear_sync (test->service, &MOCK_SCHEMA, attributes, NULL, &error);

	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_hash_table_unref (attributes);
}

static void
test_clear_async (Test *test,
                  gconstpointer used)
{
	GError *error = NULL;
	GAsyncResult *result = NULL;
	GHashTable *attributes;
	gboolean ret;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "even", FALSE,
	                                      "string", "one",
	                                      "number", 1,
	                                      NULL);

	secret_service_clear (test->service, &MOCK_SCHEMA, attributes, NULL,
	                      on_complete_get_result, &result);

	g_hash_table_unref (attributes);
	g_assert (result == NULL);

	egg_test_wait ();

	ret = secret_service_clear_finish (test->service, result, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_object_unref (result);
}

static void
test_clear_locked (Test *test,
                   gconstpointer used)
{
	GError *error = NULL;
	GHashTable *attributes;
	gboolean ret;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "even", FALSE,
	                                      "string", "tres",
	                                      "number", 3,
	                                      NULL);

	/* Locked items can't be removed via this API */
	ret = secret_service_clear_sync (test->service, &MOCK_SCHEMA, attributes, NULL, &error);

	g_hash_table_unref (attributes);
	g_assert_no_error (error);
	g_assert (ret == FALSE);
}

static void
test_clear_no_match (Test *test,
                     gconstpointer used)
{
	GError *error = NULL;
	GHashTable *attributes;
	gboolean ret;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "even", TRUE,
	                                      "string", "one",
	                                      NULL);

	/* Won't match anything */
	ret = secret_service_clear_sync (test->service, &MOCK_SCHEMA, attributes, NULL, &error);

	g_hash_table_unref (attributes);
	g_assert_no_error (error);
	g_assert (ret == FALSE);
}

static void
test_clear_no_name (Test *test,
                    gconstpointer used)
{
	const gchar *paths[] = { "/org/freedesktop/secrets/collection/german", NULL };
	GError *error = NULL;
	GHashTable *attributes;
	gboolean ret;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "number", 5,
	                                      NULL);

	/* Shouldn't match anything, because no item with 5 in mock schema */
	ret = secret_service_clear_sync (test->service, &MOCK_SCHEMA, attributes, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == FALSE);

	/* We need this collection unlocked for the next test */
	secret_service_unlock_dbus_paths_sync (test->service, paths, NULL, NULL, &error);
	g_assert_no_error (error);

	/* We have an item with 5 in prime schema, but should match anyway becase of flags */
	ret = secret_service_clear_sync (test->service, &NO_NAME_SCHEMA, attributes, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_hash_table_unref (attributes);
}

static void
test_lookup_sync (Test *test,
                  gconstpointer used)
{
	GError *error = NULL;
	GHashTable *attributes;
	SecretValue *value;
	gsize length;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "even", FALSE,
	                                      "string", "one",
	                                      "number", 1,
	                                      NULL);

	value = secret_service_lookup_sync (test->service, &MOCK_SCHEMA, attributes, NULL, &error);

	g_assert_no_error (error);
	g_hash_table_unref (attributes);

	g_assert (value != NULL);
	g_assert_cmpstr (secret_value_get (value, &length), ==, "111");
	g_assert_cmpuint (length, ==, 3);

	secret_value_unref (value);
}

static void
test_lookup_async (Test *test,
                   gconstpointer used)
{
	GError *error = NULL;
	GHashTable *attributes;
	GAsyncResult *result = NULL;
	SecretValue *value;
	gsize length;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "even", FALSE,
	                                      "string", "one",
	                                      "number", 1,
	                                      NULL);

	secret_service_lookup (test->service, &MOCK_SCHEMA, attributes, NULL,
	                        on_complete_get_result, &result);

	g_assert (result == NULL);
	g_hash_table_unref (attributes);

	egg_test_wait ();

	value = secret_service_lookup_finish (test->service, result, &error);
	g_assert_no_error (error);

	g_assert (value != NULL);
	g_assert_cmpstr (secret_value_get (value, &length), ==, "111");
	g_assert_cmpuint (length, ==, 3);

	secret_value_unref (value);
	g_object_unref (result);
}

static void
test_lookup_locked (Test *test,
                    gconstpointer used)
{
	GError *error = NULL;
	GHashTable *attributes;
	SecretValue *value;
	gsize length;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "even", FALSE,
	                                      "string", "tres",
	                                      "number", 3,
	                                      NULL);

	value = secret_service_lookup_sync (test->service, &MOCK_SCHEMA, attributes, NULL, &error);

	g_assert_no_error (error);
	g_hash_table_unref (attributes);

	g_assert (value != NULL);
	g_assert_cmpstr (secret_value_get (value, &length), ==, "3333");
	g_assert_cmpuint (length, ==, 4);

	secret_value_unref (value);
}

static void
test_lookup_no_match (Test *test,
                      gconstpointer used)
{
	GError *error = NULL;
	GHashTable *attributes;
	SecretValue *value;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "even", TRUE,
	                                      "string", "one",
	                                      NULL);

	/* Won't match anything */
	value = secret_service_lookup_sync (test->service, &MOCK_SCHEMA, attributes, NULL, &error);

	g_assert_no_error (error);
	g_assert (value == NULL);
	g_hash_table_unref (attributes);
}

static void
test_lookup_no_name (Test *test,
                     gconstpointer used)
{
	GError *error = NULL;
	GHashTable *attributes;
	SecretValue *value;
	gsize length;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "number", 5,
	                                      NULL);

	/* should return null, because nothing with mock schema and 5 */
	value = secret_service_lookup_sync (test->service, &MOCK_SCHEMA, attributes, NULL, &error);
	g_assert_no_error (error);
	g_assert (value == NULL);

	/* should return an item, because we have a prime schema with 5, and flags not to match name */
	value = secret_service_lookup_sync (test->service, &NO_NAME_SCHEMA, attributes, NULL, &error);

	g_assert_no_error (error);

	g_assert (value != NULL);
	g_assert_cmpstr (secret_value_get (value, &length), ==, "555");
	g_assert_cmpuint (length, ==, 3);

	secret_value_unref (value);
	g_hash_table_unref (attributes);
}

static void
test_store_sync (Test *test,
                 gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretValue *value = secret_value_new ("apassword", -1, "text/plain");
	GHashTable *attributes;
	GError *error = NULL;
	gchar **paths;
	gboolean ret;
	gsize length;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "even", FALSE,
	                                      "string", "seventeen",
	                                      "number", 17,
	                                      NULL);

	ret = secret_service_store_sync (test->service, &MOCK_SCHEMA, attributes, collection_path,
	                                 "New Item Label", value, NULL, &error);
	g_assert_no_error (error);
	secret_value_unref (value);
	g_hash_table_unref (attributes);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "even", "false");
	g_hash_table_insert (attributes, "string", "seventeen");
	g_hash_table_insert (attributes, "number", "17");

	ret = secret_service_search_for_dbus_paths_sync (test->service, &MOCK_SCHEMA, attributes,
	                                                 NULL, &paths, NULL, &error);
	g_hash_table_unref (attributes);
	g_assert (ret == TRUE);

	g_assert (paths != NULL);
	g_assert (paths[0] != NULL);
	g_assert (paths[1] == NULL);

	value = secret_service_get_secret_for_dbus_path_sync (test->service, paths[0],
	                                                      NULL, &error);
	g_assert_no_error (error);

	g_assert (value != NULL);
	g_assert_cmpstr (secret_value_get (value, &length), ==, "apassword");
	g_assert_cmpuint (length, ==, 9);

	secret_value_unref (value);
	g_strfreev (paths);
}

static void
test_store_replace (Test *test,
                    gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretValue *value = secret_value_new ("apassword", -1, "text/plain");
	GHashTable *attributes;
	GError *error = NULL;
	gchar **paths;
	gboolean ret;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "even", FALSE,
	                                      "string", "seventeen",
	                                      "number", 17,
	                                      NULL);

	ret = secret_service_store_sync (test->service, &MOCK_SCHEMA, attributes, collection_path,
	                                  "New Item Label", value, NULL, &error);
	g_assert_no_error (error);

	ret = secret_service_store_sync (test->service, &MOCK_SCHEMA, attributes, collection_path,
	                                  "Another Label", value, NULL, &error);
	g_assert_no_error (error);
	secret_value_unref (value);
	g_hash_table_unref (attributes);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "even", "false");
	g_hash_table_insert (attributes, "string", "seventeen");
	g_hash_table_insert (attributes, "number", "17");

	ret = secret_service_search_for_dbus_paths_sync (test->service, &MOCK_SCHEMA, attributes,
	                                                 NULL, &paths, NULL, &error);
	g_hash_table_unref (attributes);
	g_assert (ret == TRUE);

	g_assert (paths != NULL);
	g_assert (paths[0] != NULL);
	g_assert (paths[1] == NULL);

	g_strfreev (paths);
}

static void
test_store_async (Test *test,
                  gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretValue *value = secret_value_new ("apassword", -1, "text/plain");
	GAsyncResult *result = NULL;
	GHashTable *attributes;
	GError *error = NULL;
	gchar **paths;
	gboolean ret;
	gsize length;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "even", FALSE,
	                                      "string", "seventeen",
	                                      "number", 17,
	                                      NULL);

	secret_service_store (test->service, &MOCK_SCHEMA, attributes, collection_path,
	                       "New Item Label", value, NULL, on_complete_get_result, &result);
	g_assert (result == NULL);
	secret_value_unref (value);
	g_hash_table_unref (attributes);

	egg_test_wait ();

	ret = secret_service_store_finish (test->service, result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "even", "false");
	g_hash_table_insert (attributes, "string", "seventeen");
	g_hash_table_insert (attributes, "number", "17");

	ret = secret_service_search_for_dbus_paths_sync (test->service, &MOCK_SCHEMA, attributes,
	                                                 NULL, &paths, NULL, &error);
	g_hash_table_unref (attributes);
	g_assert (ret == TRUE);

	g_assert (paths != NULL);
	g_assert (paths[0] != NULL);
	g_assert (paths[1] == NULL);

	value = secret_service_get_secret_for_dbus_path_sync (test->service, paths[0],
	                                                      NULL, &error);
	g_assert_no_error (error);

	g_assert (value != NULL);
	g_assert_cmpstr (secret_value_get (value, &length), ==, "apassword");
	g_assert_cmpuint (length, ==, 9);

	secret_value_unref (value);
	g_strfreev (paths);
}

static void
test_store_no_default (Test *test,
                       gconstpointer used)
{
	SecretValue *value = secret_value_new ("apassword", -1, "text/plain");
	GHashTable *attributes;
	GError *error = NULL;
	gchar **paths;
	gboolean ret;
	gsize length;

	attributes = secret_attributes_build (&MOCK_SCHEMA,
	                                      "even", FALSE,
	                                      "string", "seventeen",
	                                      "number", 17,
	                                      NULL);

	ret = secret_service_store_sync (test->service, &MOCK_SCHEMA, attributes, SECRET_COLLECTION_DEFAULT,
	                                 "New Item Label", value, NULL, &error);
	g_assert_no_error (error);
	secret_value_unref (value);
	g_hash_table_unref (attributes);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "even", "false");
	g_hash_table_insert (attributes, "string", "seventeen");
	g_hash_table_insert (attributes, "number", "17");

	ret = secret_service_search_for_dbus_paths_sync (test->service, &MOCK_SCHEMA, attributes,
	                                                 NULL, &paths, NULL, &error);
	g_hash_table_unref (attributes);
	g_assert (ret == TRUE);

	g_assert (paths != NULL);
	g_assert (paths[0] != NULL);
	g_assert (paths[1] == NULL);

	value = secret_service_get_secret_for_dbus_path_sync (test->service, paths[0],
	                                                      NULL, &error);
	g_assert_no_error (error);

	g_assert (value != NULL);
	g_assert_cmpstr (secret_value_get (value, &length), ==, "apassword");
	g_assert_cmpuint (length, ==, 9);

	secret_value_unref (value);
	g_strfreev (paths);
}

static void
test_set_alias_sync (Test *test,
                     gconstpointer used)
{
	SecretCollection *collection;
	gchar *blah;
	GError *error = NULL;
	gboolean ret;

	blah = secret_service_read_alias_dbus_path_sync (test->service, "blah", NULL, &error);
	g_assert_no_error (error);
	g_assert (blah == NULL);

	collection = secret_collection_new_for_dbus_path_sync (test->service,
	                                                       "/org/freedesktop/secrets/collection/english",
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);
	g_assert (SECRET_IS_COLLECTION (collection));

	ret = secret_service_set_alias_sync (test->service, "blah", collection, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	blah = secret_service_read_alias_dbus_path_sync (test->service, "blah", NULL, &error);
	g_assert_no_error (error);
	g_assert_cmpstr (blah, ==, g_dbus_proxy_get_object_path (G_DBUS_PROXY (collection)));
	g_free (blah);

	ret = secret_service_set_alias_sync (test->service, "blah", NULL, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	blah = secret_service_read_alias_dbus_path_sync (test->service, "blah", NULL, &error);
	g_assert_no_error (error);
	g_assert (blah == NULL);

	g_object_unref (collection);
}

int
main (int argc, char **argv)
{
	g_test_init (&argc, &argv, NULL);
	g_set_prgname ("test-service");
#if !GLIB_CHECK_VERSION(2,35,0)
	g_type_init ();
#endif

	g_test_add ("/service/search-sync", Test, "mock-service-normal.py", setup, test_search_sync, teardown);
	g_test_add ("/service/search-async", Test, "mock-service-normal.py", setup, test_search_async, teardown);
	g_test_add ("/service/search-all-sync", Test, "mock-service-normal.py", setup, test_search_all_sync, teardown);
	g_test_add ("/service/search-all-async", Test, "mock-service-normal.py", setup, test_search_all_async, teardown);
	g_test_add ("/service/search-unlock-sync", Test, "mock-service-normal.py", setup, test_search_unlock_sync, teardown);
	g_test_add ("/service/search-unlock-async", Test, "mock-service-normal.py", setup, test_search_unlock_async, teardown);
	g_test_add ("/service/search-secrets-sync", Test, "mock-service-normal.py", setup, test_search_secrets_sync, teardown);
	g_test_add ("/service/search-secrets-async", Test, "mock-service-normal.py", setup, test_search_secrets_async, teardown);

	g_test_add ("/service/lock-sync", Test, "mock-service-lock.py", setup, test_lock_sync, teardown);

	g_test_add ("/service/unlock-sync", Test, "mock-service-lock.py", setup, test_unlock_sync, teardown);

	g_test_add ("/service/lookup-sync", Test, "mock-service-normal.py", setup, test_lookup_sync, teardown);
	g_test_add ("/service/lookup-async", Test, "mock-service-normal.py", setup, test_lookup_async, teardown);
	g_test_add ("/service/lookup-locked", Test, "mock-service-normal.py", setup, test_lookup_locked, teardown);
	g_test_add ("/service/lookup-no-match", Test, "mock-service-normal.py", setup, test_lookup_no_match, teardown);
	g_test_add ("/service/lookup-no-name", Test, "mock-service-normal.py", setup, test_lookup_no_name, teardown);

	g_test_add ("/service/clear-sync", Test, "mock-service-delete.py", setup, test_clear_sync, teardown);
	g_test_add ("/service/clear-async", Test, "mock-service-delete.py", setup, test_clear_async, teardown);
	g_test_add ("/service/clear-locked", Test, "mock-service-delete.py", setup, test_clear_locked, teardown);
	g_test_add ("/service/clear-no-match", Test, "mock-service-delete.py", setup, test_clear_no_match, teardown);
	g_test_add ("/service/clear-no-name", Test, "mock-service-delete.py", setup, test_clear_no_name, teardown);

	g_test_add ("/service/store-sync", Test, "mock-service-normal.py", setup, test_store_sync, teardown);
	g_test_add ("/service/store-async", Test, "mock-service-normal.py", setup, test_store_async, teardown);
	g_test_add ("/service/store-replace", Test, "mock-service-normal.py", setup, test_store_replace, teardown);
	g_test_add ("/service/store-no-default", Test, "mock-service-empty.py", setup, test_store_no_default, teardown);

	g_test_add ("/service/set-alias-sync", Test, "mock-service-normal.py", setup, test_set_alias_sync, teardown);

	return egg_tests_run_with_loop ();
}
