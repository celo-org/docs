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

#include "secret-item.h"
#include "secret-service.h"
#include "secret-paths.h"
#include "secret-private.h"

#include "mock-service.h"

#include "egg/egg-testing.h"

#include <glib.h>

#include <errno.h>
#include <stdlib.h>

typedef struct {
	SecretService *service;
} Test;

static void
setup (Test *test,
       gconstpointer data)
{
	GError *error = NULL;
	const gchar *mock_script = data;

	mock_service_start (mock_script, &error);
	g_assert_no_error (error);

	test->service = secret_service_get_sync (SECRET_SERVICE_NONE, NULL, &error);
	g_assert_no_error (error);
	g_object_add_weak_pointer (G_OBJECT (test->service), (gpointer *)&test->service);
}

static void
teardown (Test *test,
          gconstpointer unused)
{
	g_object_unref (test->service);
	secret_service_disconnect ();
	g_assert (test->service == NULL);

	mock_service_stop ();
}

static void
test_ensure (Test *test,
             gconstpointer unused)
{
	GError *error = NULL;
	gboolean ret;

	g_assert_cmpstr (secret_service_get_session_dbus_path (test->service), ==, NULL);
	g_assert_cmpstr (secret_service_get_session_algorithms (test->service), ==, NULL);

	ret = secret_service_ensure_session_sync (test->service, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_assert_cmpstr (secret_service_get_session_dbus_path (test->service), !=, NULL);
	g_assert_cmpstr (secret_service_get_session_algorithms (test->service), ==, "dh-ietf1024-sha256-aes128-cbc-pkcs7");
}

static void
test_ensure_twice (Test *test,
                   gconstpointer unused)
{
	GError *error = NULL;
	gchar *path;
	gboolean ret;

	g_assert_cmpstr (secret_service_get_session_dbus_path (test->service), ==, NULL);
	g_assert_cmpstr (secret_service_get_session_algorithms (test->service), ==, NULL);

	ret = secret_service_ensure_session_sync (test->service, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_assert_cmpstr (secret_service_get_session_dbus_path (test->service), !=, NULL);
	g_assert_cmpstr (secret_service_get_session_algorithms (test->service), ==, "dh-ietf1024-sha256-aes128-cbc-pkcs7");

	path = g_strdup (secret_service_get_session_dbus_path (test->service));
	ret = secret_service_ensure_session_sync (test->service, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_assert_cmpstr (secret_service_get_session_dbus_path (test->service), ==, path);
	g_assert_cmpstr (secret_service_get_session_algorithms (test->service), ==, "dh-ietf1024-sha256-aes128-cbc-pkcs7");

	g_free (path);
}

static void
test_ensure_plain (Test *test,
                   gconstpointer unused)
{
	GError *error = NULL;
	gboolean ret;

	g_assert_cmpstr (secret_service_get_session_dbus_path (test->service), ==, NULL);
	g_assert_cmpstr (secret_service_get_session_algorithms (test->service), ==, NULL);

	ret = secret_service_ensure_session_sync (test->service, NULL, &error);
	g_assert_no_error (error);

	g_assert (ret == TRUE);
	g_assert_cmpstr (secret_service_get_session_dbus_path (test->service), !=, NULL);
	g_assert_cmpstr (secret_service_get_session_algorithms (test->service), ==, "plain");
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
test_ensure_async_plain (Test *test,
                         gconstpointer unused)
{
	GAsyncResult *result = NULL;
	GError *error = NULL;
	gboolean ret;

	secret_service_ensure_session (test->service, NULL, on_complete_get_result, &result);
	egg_test_wait ();

	g_assert (G_IS_ASYNC_RESULT (result));
	ret = secret_service_ensure_session_finish (test->service, result, &error);
	g_assert_no_error (error);

	g_assert (ret == TRUE);
	g_assert_cmpstr (secret_service_get_session_dbus_path (test->service), !=, NULL);
	g_assert_cmpstr (secret_service_get_session_algorithms (test->service), ==, "plain");

	g_object_unref (result);
}

static void
test_ensure_async_aes (Test *test,
                       gconstpointer unused)
{
	GAsyncResult *result = NULL;
	GError *error = NULL;
	gboolean ret;

	secret_service_ensure_session (test->service, NULL, on_complete_get_result, &result);
	egg_test_wait_until (500);

	g_assert (G_IS_ASYNC_RESULT (result));
	ret = secret_service_ensure_session_finish (test->service, result, &error);
	g_assert_no_error (error);

	g_assert (ret == TRUE);
	g_assert_cmpstr (secret_service_get_session_dbus_path (test->service), !=, NULL);
	g_assert_cmpstr (secret_service_get_session_algorithms (test->service), ==, "dh-ietf1024-sha256-aes128-cbc-pkcs7");

	g_object_unref (result);
}

static void
test_ensure_async_twice (Test *test,
                         gconstpointer unused)
{
	GAsyncResult *result = NULL;
	GError *error = NULL;
	gboolean ret;
	gchar *path;

	secret_service_ensure_session (test->service, NULL, on_complete_get_result, &result);
	egg_test_wait_until (500);

	g_assert (G_IS_ASYNC_RESULT (result));
	ret = secret_service_ensure_session_finish (test->service, result, &error);
	g_assert_no_error (error);

	g_assert (ret == TRUE);
	g_assert_cmpstr (secret_service_get_session_dbus_path (test->service), !=, NULL);
	g_assert_cmpstr (secret_service_get_session_algorithms (test->service), ==, "plain");

	g_object_unref (result);
	result = NULL;

	path = g_strdup (secret_service_get_session_dbus_path (test->service));
	secret_service_ensure_session (test->service, NULL, on_complete_get_result, &result);
	egg_test_wait_until (500);

	g_assert (G_IS_ASYNC_RESULT (result));
	ret = secret_service_ensure_session_finish (test->service, result, &error);
	g_assert_no_error (error);

	g_assert (ret == TRUE);
	g_assert_cmpstr (secret_service_get_session_dbus_path (test->service), ==, path);
	g_assert_cmpstr (secret_service_get_session_algorithms (test->service), ==, "plain");

	g_object_unref (result);
	g_free (path);
}

int
main (int argc, char **argv)
{
	g_test_init (&argc, &argv, NULL);
	g_set_prgname ("test-session");
#if !GLIB_CHECK_VERSION(2,35,0)
	g_type_init ();
#endif

	g_test_add ("/session/ensure-aes", Test, "mock-service-normal.py", setup, test_ensure, teardown);
	g_test_add ("/session/ensure-twice", Test, "mock-service-normal.py", setup, test_ensure_twice, teardown);
	g_test_add ("/session/ensure-plain", Test, "mock-service-only-plain.py", setup, test_ensure_plain, teardown);
	g_test_add ("/session/ensure-async-aes", Test, "mock-service-normal.py", setup, test_ensure_async_aes, teardown);
	g_test_add ("/session/ensure-async-plain", Test, "mock-service-only-plain.py", setup, test_ensure_async_plain, teardown);
	g_test_add ("/session/ensure-async-twice", Test, "mock-service-only-plain.py", setup, test_ensure_async_twice, teardown);

	return egg_tests_run_with_loop ();
}
