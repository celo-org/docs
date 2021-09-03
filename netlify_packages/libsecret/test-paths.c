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
test_search_paths_sync (Test *test,
                        gconstpointer used)
{
	GHashTable *attributes;
	gboolean ret;
	gchar **locked;
	gchar **unlocked;
	GError *error = NULL;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	ret = secret_service_search_for_dbus_paths_sync (test->service, &MOCK_SCHEMA, attributes, NULL,
	                                                 &unlocked, &locked, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_assert (locked);
	g_assert_cmpstr (locked[0], ==, "/org/freedesktop/secrets/collection/spanish/10");

	g_assert (unlocked);
	g_assert_cmpstr (unlocked[0], ==, "/org/freedesktop/secrets/collection/english/1");

	g_strfreev (unlocked);
	g_strfreev (locked);

	g_hash_table_unref (attributes);
}

static void
test_search_paths_async (Test *test,
                         gconstpointer used)
{
	GAsyncResult *result = NULL;
	GHashTable *attributes;
	gboolean ret;
	gchar **locked;
	gchar **unlocked;
	GError *error = NULL;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	secret_service_search_for_dbus_paths (test->service, &MOCK_SCHEMA, attributes, NULL,
	                                      on_complete_get_result, &result);
	egg_test_wait ();

	g_assert (G_IS_ASYNC_RESULT (result));
	ret = secret_service_search_for_dbus_paths_finish (test->service, result,
	                                                        &unlocked, &locked,
	                                                        &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_assert (locked);
	g_assert_cmpstr (locked[0], ==, "/org/freedesktop/secrets/collection/spanish/10");

	g_assert (unlocked);
	g_assert_cmpstr (unlocked[0], ==, "/org/freedesktop/secrets/collection/english/1");

	g_strfreev (unlocked);
	g_strfreev (locked);
	g_object_unref (result);

	g_hash_table_unref (attributes);
}

static void
test_search_paths_nulls (Test *test,
                         gconstpointer used)
{
	GAsyncResult *result = NULL;
	GHashTable *attributes;
	gboolean ret;
	gchar **paths;
	GError *error = NULL;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	ret = secret_service_search_for_dbus_paths_sync (test->service, &MOCK_SCHEMA, attributes, NULL,
	                                             &paths, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_assert (paths != NULL);
	g_assert_cmpstr (paths[0], ==, "/org/freedesktop/secrets/collection/english/1");
	g_strfreev (paths);

	ret = secret_service_search_for_dbus_paths_sync (test->service, &MOCK_SCHEMA, attributes, NULL,
	                                                 NULL, &paths, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_assert (paths != NULL);
	g_assert_cmpstr (paths[0], ==, "/org/freedesktop/secrets/collection/spanish/10");
	g_strfreev (paths);

	ret = secret_service_search_for_dbus_paths_sync (test->service, &MOCK_SCHEMA, attributes, NULL,
	                                                 NULL, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	secret_service_search_for_dbus_paths (test->service, &MOCK_SCHEMA, attributes, NULL,
	                                      on_complete_get_result, &result);
	egg_test_wait ();
	g_assert (G_IS_ASYNC_RESULT (result));
	ret = secret_service_search_for_dbus_paths_finish (test->service, result,
	                                                   &paths, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_assert (paths != NULL);
	g_assert_cmpstr (paths[0], ==, "/org/freedesktop/secrets/collection/english/1");
	g_strfreev (paths);
	g_clear_object (&result);

	secret_service_search_for_dbus_paths (test->service, &MOCK_SCHEMA, attributes, NULL,
	                                      on_complete_get_result, &result);
	egg_test_wait ();
	g_assert (G_IS_ASYNC_RESULT (result));
	ret = secret_service_search_for_dbus_paths_finish (test->service, result,
	                                                   NULL, &paths, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_assert (paths != NULL);
	g_assert_cmpstr (paths[0], ==, "/org/freedesktop/secrets/collection/spanish/10");
	g_strfreev (paths);
	g_clear_object (&result);

	secret_service_search_for_dbus_paths (test->service, &MOCK_SCHEMA, attributes, NULL,
	                                      on_complete_get_result, &result);
	egg_test_wait ();
	g_assert (G_IS_ASYNC_RESULT (result));
	ret = secret_service_search_for_dbus_paths_finish (test->service, result,
	                                                   NULL, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_clear_object (&result);

	g_hash_table_unref (attributes);
}

static void
test_secret_for_path_sync (Test *test,
                           gconstpointer used)
{
	SecretValue *value;
	GError *error = NULL;
	const gchar *path;
	const gchar *password;
	gsize length;

	path = "/org/freedesktop/secrets/collection/english/1";
	value = secret_service_get_secret_for_dbus_path_sync (test->service, path, NULL, &error);
	g_assert_no_error (error);
	g_assert (value != NULL);

	password = secret_value_get (value, &length);
	g_assert_cmpuint (length, ==, 3);
	g_assert_cmpstr (password, ==, "111");

	password = secret_value_get (value, NULL);
	g_assert_cmpstr (password, ==, "111");

	secret_value_unref (value);
}

static void
test_secret_for_path_async (Test *test,
                            gconstpointer used)
{
	SecretValue *value;
	GError *error = NULL;
	const gchar *path;
	const gchar *password;
	GAsyncResult *result = NULL;
	gsize length;

	path = "/org/freedesktop/secrets/collection/english/1";
	secret_service_get_secret_for_dbus_path (test->service, path, NULL,
	                                         on_complete_get_result, &result);
	g_assert (result == NULL);
	egg_test_wait ();

	value = secret_service_get_secret_for_dbus_path_finish (test->service, result, &error);
	g_assert_no_error (error);
	g_assert (value != NULL);
	g_object_unref (result);

	password = secret_value_get (value, &length);
	g_assert_cmpuint (length, ==, 3);
	g_assert_cmpstr (password, ==, "111");

	password = secret_value_get (value, NULL);
	g_assert_cmpstr (password, ==, "111");

	secret_value_unref (value);
}

static void
test_secrets_for_paths_sync (Test *test,
                             gconstpointer used)
{
	const gchar *path_item_one = "/org/freedesktop/secrets/collection/english/1";
	const gchar *path_item_two = "/org/freedesktop/secrets/collection/english/2";
	const gchar *paths[] = {
		path_item_one,
		path_item_two,

		/* This one is locked, and not returned */
		"/org/freedesktop/secrets/collection/spanish/10",
		NULL
	};

	SecretValue *value;
	GHashTable *values;
	GError *error = NULL;
	const gchar *password;
	gsize length;

	values = secret_service_get_secrets_for_dbus_paths_sync (test->service, paths, NULL, &error);
	g_assert_no_error (error);

	g_assert (values != NULL);
	g_assert_cmpuint (g_hash_table_size (values), ==, 2);

	value = g_hash_table_lookup (values, path_item_one);
	g_assert (value != NULL);
	password = secret_value_get (value, &length);
	g_assert_cmpuint (length, ==, 3);
	g_assert_cmpstr (password, ==, "111");

	value = g_hash_table_lookup (values, path_item_two);
	g_assert (value != NULL);
	password = secret_value_get (value, &length);
	g_assert_cmpuint (length, ==, 3);
	g_assert_cmpstr (password, ==, "222");

	g_hash_table_unref (values);
}

static void
test_secrets_for_paths_async (Test *test,
                              gconstpointer used)
{
	const gchar *path_item_one = "/org/freedesktop/secrets/collection/english/1";
	const gchar *path_item_two = "/org/freedesktop/secrets/collection/english/2";
	const gchar *paths[] = {
		path_item_one,
		path_item_two,

		/* This one is locked, and not returned */
		"/org/freedesktop/secrets/collection/spanish/10",
		NULL
	};

	SecretValue *value;
	GHashTable *values;
	GError *error = NULL;
	const gchar *password;
	GAsyncResult *result = NULL;
	gsize length;

	secret_service_get_secrets_for_dbus_paths (test->service, paths, NULL,
	                                           on_complete_get_result, &result);
	g_assert (result == NULL);
	egg_test_wait ();

	values = secret_service_get_secrets_for_dbus_paths_finish (test->service, result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	g_assert (values != NULL);
	g_assert_cmpuint (g_hash_table_size (values), ==, 2);

	value = g_hash_table_lookup (values, path_item_one);
	g_assert (value != NULL);
	password = secret_value_get (value, &length);
	g_assert_cmpuint (length, ==, 3);
	g_assert_cmpstr (password, ==, "111");

	value = g_hash_table_lookup (values, path_item_two);
	g_assert (value != NULL);
	password = secret_value_get (value, &length);
	g_assert_cmpuint (length, ==, 3);
	g_assert_cmpstr (password, ==, "222");

	g_hash_table_unref (values);
}

static void
test_delete_for_path_sync (Test *test,
                           gconstpointer used)

{
	const gchar *path_item_one = "/org/freedesktop/secrets/collection/todelete/item";
	GError *error = NULL;
	gboolean ret;

	ret = secret_service_delete_item_dbus_path_sync (test->service, path_item_one, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
}

static void
test_delete_for_path_sync_prompt (Test *test,
                                  gconstpointer used)

{
	const gchar *path_item_one = "/org/freedesktop/secrets/collection/todelete/confirm";
	GError *error = NULL;
	gboolean ret;

	ret = secret_service_delete_item_dbus_path_sync (test->service, path_item_one, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
}

static void
test_lock_paths_sync (Test *test,
                      gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/lockone";
	const gchar *paths[] = {
		collection_path,
		NULL,
	};

	GError *error = NULL;
	gchar **locked = NULL;
	gboolean ret;

	ret = secret_service_lock_dbus_paths_sync (test->service, paths, NULL, &locked, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_assert (locked != NULL);
	g_assert_cmpstr (locked[0], ==, collection_path);
	g_assert (locked[1] == NULL);
	g_strfreev (locked);
}

static void
test_lock_prompt_sync (Test *test,
                       gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/lockprompt";
	const gchar *paths[] = {
		collection_path,
		NULL,
	};

	GError *error = NULL;
	gchar **locked = NULL;
	gboolean ret;

	ret = secret_service_lock_dbus_paths_sync (test->service, paths, NULL, &locked, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_assert (locked != NULL);
	g_assert_cmpstr (locked[0], ==, collection_path);
	g_assert (locked[1] == NULL);
	g_strfreev (locked);
}

static void
test_unlock_paths_sync (Test *test,
                        gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/lockone";
	const gchar *paths[] = {
		collection_path,
		NULL,
	};

	GError *error = NULL;
	gchar **unlocked = NULL;
	gboolean ret;

	ret = secret_service_unlock_dbus_paths_sync (test->service, paths, NULL, &unlocked, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_assert (unlocked != NULL);
	g_assert_cmpstr (unlocked[0], ==, collection_path);
	g_assert (unlocked[1] == NULL);
	g_strfreev (unlocked);
}

static void
test_unlock_prompt_sync (Test *test,
                         gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/lockprompt";
	const gchar *paths[] = {
		collection_path,
		NULL,
	};

	GError *error = NULL;
	gchar **unlocked = NULL;
	gboolean ret;

	ret = secret_service_unlock_dbus_paths_sync (test->service, paths, NULL, &unlocked, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_assert (unlocked != NULL);
	g_assert_cmpstr (unlocked[0], ==, collection_path);
	g_assert (unlocked[1] == NULL);
	g_strfreev (unlocked);
}

static void
test_collection_sync (Test *test,
                      gconstpointer used)
{
	GHashTable *properties;
	GError *error = NULL;
	gchar *path;

	properties = g_hash_table_new_full (g_str_hash, g_str_equal, NULL,
	                                    (GDestroyNotify)g_variant_unref);
	g_hash_table_insert (properties, SECRET_COLLECTION_INTERFACE ".Label",
	                     g_variant_ref_sink (g_variant_new_string ("Wheeee")));

	path = secret_service_create_collection_dbus_path_sync (test->service, properties,
	                                                        NULL, SECRET_COLLECTION_CREATE_NONE,
	                                                        NULL, &error);

	g_hash_table_unref (properties);

	g_assert_no_error (error);
	g_assert (path != NULL);
	g_assert (g_str_has_prefix (path, "/org/freedesktop/secrets/collection/"));

	g_free (path);
}

static void
test_collection_async (Test *test,
                       gconstpointer used)
{
	GAsyncResult *result = NULL;
	GHashTable *properties;
	GError *error = NULL;
	gchar *path;

	properties = g_hash_table_new_full (g_str_hash, g_str_equal, NULL,
	                                    (GDestroyNotify)g_variant_unref);
	g_hash_table_insert (properties, SECRET_COLLECTION_INTERFACE ".Label",
	                     g_variant_ref_sink (g_variant_new_string ("Wheeee")));

	secret_service_create_collection_dbus_path (test->service, properties,
	                                            NULL, SECRET_COLLECTION_CREATE_NONE,
	                                            NULL, on_complete_get_result, &result);

	g_hash_table_unref (properties);
	g_assert (result == NULL);

	egg_test_wait ();

	path = secret_service_create_collection_dbus_path_finish (test->service, result, &error);
	g_object_unref (result);

	g_assert_no_error (error);
	g_assert (path != NULL);
	g_assert (g_str_has_prefix (path, "/org/freedesktop/secrets/collection/"));

	g_free (path);
}

static void
test_item_sync (Test *test,
                gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	GHashTable *properties;
	GHashTable *attributes;
	SecretValue *value;
	GError *error = NULL;
	gchar *path;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "even", "true");
	g_hash_table_insert (attributes, "string", "ten");
	g_hash_table_insert (attributes, "number", "10");

	properties = g_hash_table_new_full (g_str_hash, g_str_equal, NULL,
	                                    (GDestroyNotify)g_variant_unref);
	g_hash_table_insert (properties, SECRET_COLLECTION_INTERFACE ".Label",
	                     g_variant_ref_sink (g_variant_new_string ("Wheeee")));
	g_hash_table_insert (properties, SECRET_COLLECTION_INTERFACE ".Attributes",
	                     g_variant_ref_sink (_secret_attributes_to_variant (attributes, "org.gnome.Test")));

	g_hash_table_unref (attributes);

	value = secret_value_new ("andmoreandmore", -1, "text/plain");

	path = secret_service_create_item_dbus_path_sync (test->service, collection_path,
	                                                  properties, value, SECRET_ITEM_CREATE_NONE,
	                                                  NULL, &error);

	secret_value_unref (value);
	g_hash_table_unref (properties);

	g_assert_no_error (error);
	g_assert (path != NULL);
	g_assert (g_str_has_prefix (path, collection_path));

	g_free (path);
}

static void
test_item_async (Test *test,
                       gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	GHashTable *properties;
	GHashTable *attributes;
	SecretValue *value;
	GError *error = NULL;
	GAsyncResult *result = NULL;
	gchar *path;

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "even", "true");
	g_hash_table_insert (attributes, "string", "ten");
	g_hash_table_insert (attributes, "number", "10");

	properties = g_hash_table_new_full (g_str_hash, g_str_equal, NULL,
	                                    (GDestroyNotify)g_variant_unref);
	g_hash_table_insert (properties, SECRET_COLLECTION_INTERFACE ".Label",
	                     g_variant_ref_sink (g_variant_new_string ("Wheeee")));
	g_hash_table_insert (properties, SECRET_COLLECTION_INTERFACE ".Attributes",
	                     g_variant_ref_sink (_secret_attributes_to_variant (attributes, NULL)));

	g_hash_table_unref (attributes);

	value = secret_value_new ("andmoreandmore", -1, "text/plain");

	secret_service_create_item_dbus_path (test->service, collection_path,
	                                      properties, value, SECRET_ITEM_CREATE_NONE,
	                                      NULL, on_complete_get_result, &result);

	g_assert (result == NULL);
	secret_value_unref (value);
	g_hash_table_unref (properties);

	egg_test_wait ();

	path = secret_service_create_item_dbus_path_finish (test->service, result, &error);
	g_object_unref (result);

	g_assert_no_error (error);
	g_assert (path != NULL);
	g_assert (g_str_has_prefix (path, collection_path));

	g_free (path);
}

static void
test_set_alias_path (Test *test,
                     gconstpointer used)
{
	gchar *path;
	GError *error = NULL;
	gboolean ret;

	path = secret_service_read_alias_dbus_path_sync (test->service, "blah", NULL, &error);
	g_assert_no_error (error);
	g_assert (path == NULL);

	ret = secret_service_set_alias_to_dbus_path_sync (test->service, "blah", "/org/freedesktop/secrets/collection/english", NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	path = secret_service_read_alias_dbus_path_sync (test->service, "blah", NULL, &error);
	g_assert_no_error (error);
	g_assert_cmpstr (path, ==, "/org/freedesktop/secrets/collection/english");
	g_free (path);

	ret = secret_service_set_alias_to_dbus_path_sync (test->service, "blah", NULL, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	path = secret_service_read_alias_dbus_path_sync (test->service, "blah", NULL, &error);
	g_assert_no_error (error);
	g_assert (path == NULL);
}

static void
test_encode_decode_secret (Test *test,
                           gconstpointer unused)
{
	GVariant *variant;
	SecretValue *value;
	SecretValue *decoded;
	GError *error = NULL;

	value = secret_value_new ("zerogjuggs", -1, "text/plain");

	secret_service_ensure_session_sync (test->service, NULL, &error);
	g_assert_no_error (error);

	variant = secret_service_encode_dbus_secret (test->service, value);
	g_assert (variant != NULL);
	g_assert_cmpstr (g_variant_get_type_string (variant), ==, "(oayays)");
	secret_value_unref (value);

	decoded = secret_service_decode_dbus_secret (test->service, variant);
	g_assert (variant != NULL);
	g_variant_unref (variant);

	g_assert_cmpstr (secret_value_get_text (decoded), ==, "zerogjuggs");
	secret_value_unref (decoded);
}

int
main (int argc, char **argv)
{
	g_test_init (&argc, &argv, NULL);
	g_set_prgname ("test-service");
#if !GLIB_CHECK_VERSION(2,35,0)
	g_type_init ();
#endif

	g_test_add ("/service/search-for-paths", Test, "mock-service-normal.py", setup, test_search_paths_sync, teardown);
	g_test_add ("/service/search-for-paths-async", Test, "mock-service-normal.py", setup, test_search_paths_async, teardown);
	g_test_add ("/service/search-for-paths-nulls", Test, "mock-service-normal.py", setup, test_search_paths_nulls, teardown);

	g_test_add ("/service/secret-for-path-sync", Test, "mock-service-normal.py", setup, test_secret_for_path_sync, teardown);
	g_test_add ("/service/secret-for-path-plain", Test, "mock-service-only-plain.py", setup, test_secret_for_path_sync, teardown);
	g_test_add ("/service/secret-for-path-async", Test, "mock-service-normal.py", setup, test_secret_for_path_async, teardown);
	g_test_add ("/service/secrets-for-paths-sync", Test, "mock-service-normal.py", setup, test_secrets_for_paths_sync, teardown);
	g_test_add ("/service/secrets-for-paths-async", Test, "mock-service-normal.py", setup, test_secrets_for_paths_async, teardown);

	g_test_add ("/service/delete-for-path", Test, "mock-service-delete.py", setup, test_delete_for_path_sync, teardown);
	g_test_add ("/service/delete-for-path-with-prompt", Test, "mock-service-delete.py", setup, test_delete_for_path_sync_prompt, teardown);

	g_test_add ("/service/lock-paths-sync", Test, "mock-service-lock.py", setup, test_lock_paths_sync, teardown);
	g_test_add ("/service/lock-prompt-sync", Test, "mock-service-lock.py", setup, test_lock_prompt_sync, teardown);

	g_test_add ("/service/unlock-paths-sync", Test, "mock-service-lock.py", setup, test_unlock_paths_sync, teardown);
	g_test_add ("/service/unlock-prompt-sync", Test, "mock-service-lock.py", setup, test_unlock_prompt_sync, teardown);

	g_test_add ("/service/create-collection-sync", Test, "mock-service-normal.py", setup, test_collection_sync, teardown);
	g_test_add ("/service/create-collection-async", Test, "mock-service-normal.py", setup, test_collection_async, teardown);

	g_test_add ("/service/create-item-sync", Test, "mock-service-normal.py", setup, test_item_sync, teardown);
	g_test_add ("/service/create-item-async", Test, "mock-service-normal.py", setup, test_item_async, teardown);

	g_test_add ("/service/set-alias-path", Test, "mock-service-normal.py", setup, test_set_alias_path, teardown);

	g_test_add ("/service/encode-decode-secret", Test, "mock-service-normal.py", setup, test_encode_decode_secret, teardown);

	return egg_tests_run_with_loop ();
}
