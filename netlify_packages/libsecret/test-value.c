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
 */


#include "config.h"

#include "secret-value.h"
#include "secret-private.h"

#include "egg/egg-testing.h"
#include "egg/egg-secure-memory.h"

#include <glib.h>

#include <errno.h>
#include <stdlib.h>

EGG_SECURE_DECLARE (test_value);

static void
test_new (void)
{
	SecretValue *value;
	gsize length;

	value = secret_value_new ("blahblah", 4, "text/plain");

	g_assert_cmpstr (secret_value_get (value, &length), ==, "blah");
	g_assert_cmpuint (length, ==, 4);

	g_assert_cmpstr (secret_value_get_content_type (value), ==, "text/plain");

	secret_value_unref (value);
}

static void
test_new_terminated (void)
{
	SecretValue *value;
	gsize length;

	value = secret_value_new ("blah", -1, "text/plain");

	g_assert_cmpstr (secret_value_get (value, &length), ==, "blah");
	g_assert_cmpuint (length, ==, 4);

	g_assert_cmpstr (secret_value_get_content_type (value), ==, "text/plain");

	secret_value_unref (value);
}

static void
test_new_full (void)
{
	SecretValue *value;
	gchar *data = g_strdup ("blah");
	gsize length;

	value = secret_value_new_full (data, 4, "text/plain", g_free);

	g_assert_cmpstr (secret_value_get (value, &length), ==, "blah");
	g_assert_cmpuint (length, ==, 4);

	/* No copy done here */
	g_assert (secret_value_get (value, NULL) == data);

	secret_value_unref (value);
}

static void
test_new_full_terminated (void)
{
	SecretValue *value;
	gchar *data = g_strdup ("blah");
	gsize length;

	value = secret_value_new_full (data, -1, "text/plain", g_free);

	g_assert_cmpstr (secret_value_get (value, &length), ==, "blah");
	g_assert_cmpuint (length, ==, 4);

	/* No copy done here */
	g_assert (secret_value_get (value, NULL) == data);

	secret_value_unref (value);
}

static void
test_new_empty (void)
{
	SecretValue *value;
	const gchar *password;
	gsize length;

	value = secret_value_new (NULL, 0, "text/plain");
	g_assert (value != NULL);
	password = secret_value_get (value, &length);
	g_assert_cmpuint (length, ==, 0);
	g_assert_cmpstr (password, ==, "");
	secret_value_unref (value);

	value = secret_value_new ("", 0, "text/plain");
	g_assert (value != NULL);
	password = secret_value_get (value, &length);
	g_assert_cmpuint (length, ==, 0);
	g_assert_cmpstr (password, ==, "");
	secret_value_unref (value);
}

static void
test_ref_unref (void)
{
	SecretValue *value;
	SecretValue *value2;
	gsize length;

	value = secret_value_new ("blah", 4, "text/plain");
	value2 = secret_value_ref(value);
	secret_value_unref (value);

	g_assert_cmpstr (secret_value_get (value2, &length), ==, "blah");
	g_assert_cmpuint (length, ==, 4);

	secret_value_unref (value2);
}

static void
test_boxed (void)
{
	SecretValue *value;
	SecretValue *value2;
	gsize length;

	value = secret_value_new ("blah", 4, "text/plain");
	value2 = g_boxed_copy (SECRET_TYPE_VALUE, value);
	g_boxed_free (SECRET_TYPE_VALUE, value);

	g_assert_cmpstr (secret_value_get (value2, &length), ==, "blah");
	g_assert_cmpuint (length, ==, 4);

	g_boxed_free (SECRET_TYPE_VALUE, value2);
}

static void
test_to_password (void)
{
	SecretValue *value;
	gchar *password;

	value = secret_value_new_full (egg_secure_strdup ("blah"), -1,
	                                "text/plain", egg_secure_free);

	password = _secret_value_unref_to_password (value);
	g_assert_cmpstr (password, ==, "blah");

	egg_secure_free (password);
}

static void
test_to_password_bad_destroy (void)
{
	SecretValue *value;
	gchar *password;

	value = secret_value_new_full (g_strdup ("blah"), -1,
	                                "text/plain", g_free);

	password = _secret_value_unref_to_password (value);
	g_assert_cmpstr (password, ==, "blah");

	egg_secure_free (password);
}

static void
test_to_password_bad_content (void)
{
	SecretValue *value;
	gchar *password;

	value = secret_value_new_full (g_strdup ("w\xFFooowhee"), -1,
	                                "application/octet-stream", g_free);

	password = _secret_value_unref_to_password (value);
	g_assert_cmpstr (password, ==, NULL);
}

static void
test_to_password_extra_ref (void)
{
	SecretValue *value;
	gchar *password;

	value = secret_value_new_full (egg_secure_strdup ("blah"), -1,
	                                "text/plain", egg_secure_free);
	secret_value_ref (value);

	password = _secret_value_unref_to_password (value);
	g_assert_cmpstr (password, ==, "blah");

	egg_secure_free (password);
	secret_value_unref (value);
}

int
main (int argc, char **argv)
{
	g_test_init (&argc, &argv, NULL);
	g_set_prgname ("test-value");

#if !GLIB_CHECK_VERSION(2,35,0)
	g_type_init ();
#endif

	g_test_add_func ("/value/new", test_new);
	g_test_add_func ("/value/new-terminated", test_new_terminated);
	g_test_add_func ("/value/new-full", test_new_full);
	g_test_add_func ("/value/new-full-terminated", test_new_full_terminated);
	g_test_add_func ("/value/new-empty", test_new_empty);
	g_test_add_func ("/value/ref-unref", test_ref_unref);
	g_test_add_func ("/value/boxed", test_boxed);
	g_test_add_func ("/value/to-password", test_to_password);
	g_test_add_func ("/value/to-password-bad-destroy", test_to_password_bad_destroy);
	g_test_add_func ("/value/to-password-bad-content", test_to_password_bad_content);
	g_test_add_func ("/value/to-password-extra-ref", test_to_password_extra_ref);

	return egg_tests_run_with_loop ();
}
