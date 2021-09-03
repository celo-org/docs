/* libsecret - GLib wrapper for Secret Service
 *
 * Copyright 2012 Red Hat Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation; either version 2 of the licence or (at
 * your option) any later version.
 *
 * See the included COPYING file for more information.
 *
 * Author: Stef Walter <stefw@gnome.org>
 */

#include "config.h"

#include "secret-password.h"
#include "secret-paths.h"
#include "secret-private.h"

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
	GPid pid;
} Test;

static void
setup (Test *test,
       gconstpointer data)
{
	GError *error = NULL;
	const gchar *mock_script = data;

	mock_service_start (mock_script, &error);
	g_assert_no_error (error);
}

static void
teardown (Test *test,
          gconstpointer unused)
{
	secret_service_disconnect ();
	mock_service_stop ();
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
test_lookup_sync (Test *test,
                  gconstpointer used)
{
	gchar *password;
	GError *error = NULL;

	password = secret_password_lookup_nonpageable_sync (&MOCK_SCHEMA, NULL, &error,
	                                                    "even", FALSE,
	                                                    "string", "one",
	                                                    "number", 1,
	                                                    NULL);

	g_assert_no_error (error);
	g_assert_cmpstr (password, ==, "111");

	secret_password_free (password);
}

static void
test_lookup_async (Test *test,
                   gconstpointer used)
{
	GAsyncResult *result = NULL;
	GError *error = NULL;
	gchar *password;

	secret_password_lookup (&MOCK_SCHEMA, NULL, on_complete_get_result, &result,
	                        "even", FALSE,
	                        "string", "one",
	                        "number", 1,
	                        NULL);
	g_assert (result == NULL);

	egg_test_wait ();

	password = secret_password_lookup_nonpageable_finish (result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	g_assert_cmpstr (password, ==, "111");
	secret_password_free (password);
}

static void
test_lookup_no_name (Test *test,
                     gconstpointer used)
{
	GError *error = NULL;
	gchar *password;

	/* should return null, because nothing with mock schema and 5 */
	password = secret_password_lookup_sync (&MOCK_SCHEMA, NULL, &error,
	                                        "number", 5,
	                                        NULL);
	g_assert_no_error (error);
	g_assert (password == NULL);

	/* should return an item, because we have a prime schema with 5, and flags not to match name */
	password = secret_password_lookup_sync (&NO_NAME_SCHEMA, NULL, &error,
	                                        "number", 5,
	                                        NULL);

	g_assert_no_error (error);
	g_assert_cmpstr (password, ==, "555");

	secret_password_free (password);
}

static void
test_store_sync (Test *test,
                  gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	GError *error = NULL;
	gchar *password;
	gboolean ret;

	ret = secret_password_store_sync (&MOCK_SCHEMA, collection_path,
	                                  "Label here", "the password", NULL, &error,
	                                  "even", TRUE,
	                                  "string", "twelve",
	                                  "number", 12,
	                                  NULL);

	g_assert_no_error (error);
	g_assert (ret == TRUE);

	password = secret_password_lookup_nonpageable_sync (&MOCK_SCHEMA, NULL, &error,
	                                                    "string", "twelve",
	                                                    NULL);

	g_assert_no_error (error);
	g_assert_cmpstr (password, ==, "the password");

	secret_password_free (password);
}

static void
test_store_async (Test *test,
                  gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	GAsyncResult *result = NULL;
	GError *error = NULL;
	gchar *password;
	gboolean ret;

	secret_password_store (&MOCK_SCHEMA, collection_path, "Label here",
	                       "the password", NULL, on_complete_get_result, &result,
	                       "even", TRUE,
	                       "string", "twelve",
	                       "number", 12,
	                       NULL);
	g_assert (result == NULL);

	egg_test_wait ();

	ret = secret_password_store_finish (result, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_object_unref (result);

	password = secret_password_lookup_nonpageable_sync (&MOCK_SCHEMA, NULL, &error,
	                                                    "string", "twelve",
	                                                    NULL);

	g_assert_no_error (error);
	g_assert_cmpstr (password, ==, "the password");

	secret_password_free (password);
}

static void
test_store_unlock (Test *test,
                   gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	GAsyncResult *result = NULL;
	SecretCollection *collection;
	SecretService *service;
	GError *error = NULL;
	gchar *password;
	gboolean ret;
	GList *objects;
	gint count;

	service = secret_service_get_sync (SECRET_SERVICE_NONE, NULL, &error);
	g_assert_no_error (error);

	/* Check collection state */
	collection = secret_collection_new_for_dbus_path_sync (service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);
	g_assert (secret_collection_get_locked (collection) == FALSE);

	/* Lock it, use async, so collection properties update */
	objects = g_list_append (NULL, collection);
	secret_service_lock (service, objects, NULL, on_complete_get_result, &result);
	egg_test_wait ();
	count = secret_service_lock_finish (service, result, NULL, &error);
	g_assert_cmpint (count, ==, 1);
	g_clear_object (&result);
	g_list_free (objects);

	/* Check collection state */
	g_assert (secret_collection_get_locked (collection) == TRUE);

	/* Store the password, use async so collection properties update */
	secret_password_store (&MOCK_SCHEMA, collection_path, "Label here",
	                       "the password", NULL, on_complete_get_result, &result,
	                       "even", TRUE,
	                       "string", "twelve",
	                       "number", 12,
	                       NULL);
	g_assert (result == NULL);
	egg_test_wait ();
	ret = secret_password_store_finish (result, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_clear_object (&result);

	/* Check collection state */
	g_assert (secret_collection_get_locked (collection) == FALSE);


	password = secret_password_lookup_nonpageable_sync (&MOCK_SCHEMA, NULL, &error,
	                                                    "string", "twelve",
	                                                    NULL);

	g_assert_no_error (error);
	g_assert_cmpstr (password, ==, "the password");

	secret_password_free (password);
	g_object_unref (collection);
	g_object_unref (service);
}

static void
test_delete_sync (Test *test,
                  gconstpointer used)
{
	GError *error = NULL;
	gboolean ret;

	ret = secret_password_clear_sync (&MOCK_SCHEMA, NULL, &error,
	                                  "even", FALSE,
	                                  "string", "one",
	                                  "number", 1,
	                                  NULL);

	g_assert_no_error (error);
	g_assert (ret == TRUE);
}

static void
test_delete_async (Test *test,
                   gconstpointer used)
{
	GError *error = NULL;
	GAsyncResult *result = NULL;
	gboolean ret;

	secret_password_clear (&MOCK_SCHEMA, NULL,
	                       on_complete_get_result, &result,
	                       "even", FALSE,
	                       "string", "one",
	                       "number", 1,
	                       NULL);

	g_assert (result == NULL);

	egg_test_wait ();

	ret = secret_password_clear_finish (result, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_object_unref (result);
}

static void
test_clear_no_name (Test *test,
                    gconstpointer used)
{
	const gchar *paths[] = { "/org/freedesktop/secrets/collection/german", NULL };
	SecretService *service;
	GError *error = NULL;
	gboolean ret;

	/* Shouldn't match anything, because no item with 5 in mock schema */
	ret = secret_password_clear_sync (&MOCK_SCHEMA, NULL, &error,
	                                  "number", 5,
	                                  NULL);
	g_assert_no_error (error);
	g_assert (ret == FALSE);

	/* We need this collection unlocked for the next test */
	service = secret_service_get_sync (SECRET_SERVICE_NONE, NULL, &error);
	g_assert_no_error (error);
	secret_service_unlock_dbus_paths_sync (service, paths, NULL, NULL, &error);
	g_assert_no_error (error);
	g_object_unref (service);

	/* We have an item with 5 in prime schema, but should match anyway becase of flags */
	ret = secret_password_clear_sync (&NO_NAME_SCHEMA, NULL, &error,
	                                  "number", 5,
	                                  NULL);

	g_assert_no_error (error);
	g_assert (ret == TRUE);
}

static void
test_password_free_null (void)
{
	secret_password_free (NULL);
}

int
main (int argc, char **argv)
{
	g_test_init (&argc, &argv, NULL);
	g_set_prgname ("test-password");
#if !GLIB_CHECK_VERSION(2,35,0)
	g_type_init ();
#endif

	g_test_add ("/password/lookup-sync", Test, "mock-service-normal.py", setup, test_lookup_sync, teardown);
	g_test_add ("/password/lookup-async", Test, "mock-service-normal.py", setup, test_lookup_async, teardown);
	g_test_add ("/password/lookup-no-name", Test, "mock-service-normal.py", setup, test_lookup_no_name, teardown);

	g_test_add ("/password/store-sync", Test, "mock-service-normal.py", setup, test_store_sync, teardown);
	g_test_add ("/password/store-async", Test, "mock-service-normal.py", setup, test_store_async, teardown);
	g_test_add ("/password/store-unlock", Test, "mock-service-normal.py", setup, test_store_unlock, teardown);

	g_test_add ("/password/delete-sync", Test, "mock-service-delete.py", setup, test_delete_sync, teardown);
	g_test_add ("/password/delete-async", Test, "mock-service-delete.py", setup, test_delete_async, teardown);
	g_test_add ("/password/clear-no-name", Test, "mock-service-delete.py", setup, test_clear_no_name, teardown);

	g_test_add_func ("/password/free-null", test_password_free_null);

	return egg_tests_run_with_loop ();
}
