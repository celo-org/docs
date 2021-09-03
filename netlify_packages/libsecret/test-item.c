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

#include "secret-collection.h"
#include "secret-item.h"
#include "secret-service.h"
#include "secret-paths.h"
#include "secret-private.h"

#include "mock-service.h"

#include "egg/egg-testing.h"

#include <glib.h>

#include <errno.h>
#include <stdlib.h>

static const SecretSchema MOCK_SCHEMA = {
	"org.mock.Schema.Item",
	SECRET_SCHEMA_NONE,
	{
		{ "number", SECRET_SCHEMA_ATTRIBUTE_INTEGER },
		{ "string", SECRET_SCHEMA_ATTRIBUTE_STRING },
		{ "even", SECRET_SCHEMA_ATTRIBUTE_BOOLEAN },
	}
};

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
on_async_result (GObject *source,
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
on_notify_stop (GObject *obj,
                GParamSpec *spec,
                gpointer user_data)
{
	guint *sigs = user_data;
	g_assert (sigs != NULL);
	g_assert (*sigs > 0);
	if (--(*sigs) == 0)
		egg_test_wait_stop ();
}

static void
test_new_sync (Test *test,
               gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GError *error = NULL;
	SecretItem *item;

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	g_assert_cmpstr (g_dbus_proxy_get_object_path (G_DBUS_PROXY (item)), ==, item_path);

	g_object_unref (item);
}

static void
test_new_sync_noexist (Test *test,
                       gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/0000";
	GError *error = NULL;
	SecretItem *item;

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_error (error, G_DBUS_ERROR, G_DBUS_ERROR_UNKNOWN_METHOD);
	g_assert (item == NULL);
	g_clear_error (&error);
}

static void
test_new_async (Test *test,
                gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GAsyncResult *result = NULL;
	GError *error = NULL;
	SecretItem *item;

	secret_item_new_for_dbus_path (test->service, item_path, SECRET_ITEM_NONE,
	                               NULL, on_async_result, &result);
	g_assert (result == NULL);

	egg_test_wait ();

	item = secret_item_new_for_dbus_path_finish (result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	g_assert_cmpstr (g_dbus_proxy_get_object_path (G_DBUS_PROXY (item)), ==, item_path);

	g_object_unref (item);
}

static void
test_new_async_noexist (Test *test,
                        gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/0000";
	GAsyncResult *result = NULL;
	GError *error = NULL;
	SecretItem *item;

	secret_item_new_for_dbus_path (test->service, item_path, SECRET_ITEM_NONE,
	                               NULL, on_async_result, &result);
	g_assert (result == NULL);

	egg_test_wait ();

	item = secret_item_new_for_dbus_path_finish (result, &error);
	g_assert_error (error, G_DBUS_ERROR, G_DBUS_ERROR_UNKNOWN_METHOD);
	g_assert (item == NULL);
	g_clear_error (&error);
	g_object_unref (result);
}

#define g_assert_cmpstr_free(str1, op, str2) G_STMT_START { char *str = str1; g_assert_cmpstr (str, op, str2); g_free (str); } G_STMT_END

static void
test_create_sync (Test *test,
                  gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretCollection *collection;
	GError *error = NULL;
	SecretItem *item;
	GHashTable *attributes;
	SecretValue *value;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "even", "true");
	g_hash_table_insert (attributes, "string", "ten");
	g_hash_table_insert (attributes, "number", "10");

	value = secret_value_new ("Hoohah", -1, "text/plain");

	item = secret_item_create_sync (collection, &MOCK_SCHEMA, attributes, "Tunnel",
	                                value, SECRET_ITEM_CREATE_NONE, NULL, &error);
	g_assert_no_error (error);
	g_object_add_weak_pointer (G_OBJECT (item), (gpointer *)&item);

	g_hash_table_unref (attributes);
	g_object_unref (collection);
	secret_value_unref (value);

	g_assert (g_str_has_prefix (g_dbus_proxy_get_object_path (G_DBUS_PROXY (item)), collection_path));
	g_assert_cmpstr_free (secret_item_get_label (item), ==, "Tunnel");
	g_assert (secret_item_get_locked (item) == FALSE);

	g_object_unref (item);
	g_assert (item == NULL);
}

static void
test_create_async (Test *test,
                   gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretCollection *collection;
	GAsyncResult *result = NULL;
	GError *error = NULL;
	SecretItem *item;
	GHashTable *attributes;
	SecretValue *value;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "even", "true");
	g_hash_table_insert (attributes, "string", "ten");
	g_hash_table_insert (attributes, "number", "10");

	value = secret_value_new ("Hoohah", -1, "text/plain");

	secret_item_create (collection, &MOCK_SCHEMA, attributes, "Tunnel",
	                    value, SECRET_ITEM_CREATE_NONE, NULL, on_async_result, &result);
	g_assert_no_error (error);

	g_hash_table_unref (attributes);
	g_object_unref (collection);
	secret_value_unref (value);

	egg_test_wait ();

	item = secret_item_create_finish (result, &error);
	g_assert_no_error (error);
	g_object_unref (result);
	g_object_add_weak_pointer (G_OBJECT (item), (gpointer *)&item);

	g_assert (g_str_has_prefix (g_dbus_proxy_get_object_path (G_DBUS_PROXY (item)), collection_path));
	g_assert_cmpstr_free (secret_item_get_label (item), ==, "Tunnel");
	g_assert (secret_item_get_locked (item) == FALSE);

	g_object_unref (item);
	g_assert (item == NULL);
}

static void
test_properties (Test *test,
                 gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GError *error = NULL;
	GHashTable *attributes;
	SecretService *service;
	SecretItem *item;
	guint64 created;
	guint64 modified;
	gboolean locked;
	gchar *label;

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	g_assert (secret_item_get_locked (item) == FALSE);
	g_assert_cmpuint (secret_item_get_created (item), <=, time (NULL));
	g_assert_cmpuint (secret_item_get_modified (item), <=, time (NULL));

	label = secret_item_get_label (item);
	g_assert_cmpstr (label, ==, "Item One");
	g_free (label);

	attributes = secret_item_get_attributes (item);
	g_assert_cmpstr (g_hash_table_lookup (attributes, "string"), ==, "one");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "number"), ==, "1");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "even"), ==, "false");
	g_assert_cmpuint (g_hash_table_size (attributes), ==, 4);
	g_hash_table_unref (attributes);

	g_object_get (item,
	              "locked", &locked,
	              "created", &created,
	              "modified", &modified,
	              "label", &label,
	              "attributes", &attributes,
	              "service", &service,
	              NULL);

	g_assert (locked == FALSE);
	g_assert_cmpuint (created, <=, time (NULL));
	g_assert_cmpuint (modified, <=, time (NULL));

	g_assert_cmpstr (label, ==, "Item One");
	g_free (label);

	g_assert_cmpstr (g_hash_table_lookup (attributes, "string"), ==, "one");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "number"), ==, "1");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "even"), ==, "false");
	g_assert_cmpuint (g_hash_table_size (attributes), ==, 4);
	g_hash_table_unref (attributes);

	g_assert (service == test->service);
	g_object_unref (service);

	g_object_unref (item);
}

static void
test_set_label_sync (Test *test,
                     gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GError *error = NULL;
	SecretItem *item;
	gboolean ret;
	gchar *label;

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	label = secret_item_get_label (item);
	g_assert_cmpstr (label, ==, "Item One");
	g_free (label);

	ret = secret_item_set_label_sync (item, "Another label", NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	label = secret_item_get_label (item);
	g_assert_cmpstr (label, ==, "Another label");
	g_free (label);

	g_object_unref (item);
}

static void
test_set_label_async (Test *test,
                      gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GAsyncResult *result = NULL;
	GError *error = NULL;
	SecretItem *item;
	gboolean ret;
	gchar *label;

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	label = secret_item_get_label (item);
	g_assert_cmpstr (label, ==, "Item One");
	g_free (label);

	secret_item_set_label (item, "Another label", NULL, on_async_result, &result);
	g_assert (result == NULL);

	egg_test_wait ();

	ret = secret_item_set_label_finish (item, result, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_object_unref (result);

	label = secret_item_get_label (item);
	g_assert_cmpstr (label, ==, "Another label");
	g_free (label);

	g_object_unref (item);
}

static void
test_set_label_prop (Test *test,
                     gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GAsyncResult *result = NULL;
	GError *error = NULL;
	SecretItem *item;
	guint sigs = 2;
	gchar *label;

	secret_item_new_for_dbus_path (test->service, item_path, SECRET_ITEM_NONE, NULL, on_async_result, &result);
	g_assert (result == NULL);
	egg_test_wait ();
	item = secret_item_new_for_dbus_path_finish (result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	label = secret_item_get_label (item);
	g_assert_cmpstr (label, ==, "Item One");
	g_free (label);

	g_signal_connect (item, "notify::label", G_CALLBACK (on_notify_stop), &sigs);
	g_object_set (item, "label", "Blah blah", NULL);

	/* Wait for the property to actually 'take' */
	egg_test_wait ();

	label = secret_item_get_label (item);
	g_assert_cmpstr (label, ==, "Blah blah");
	g_free (label);

	g_object_add_weak_pointer (G_OBJECT (item), (gpointer *)&item);
	g_object_unref (item);

	while (item != NULL)
		g_main_context_iteration (g_main_context_get_thread_default (), TRUE);
}

static void
test_set_attributes_sync (Test *test,
                           gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GError *error = NULL;
	SecretItem *item;
	gboolean ret;
	GHashTable *attributes;
	gchar *schema_name;

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	attributes = secret_item_get_attributes (item);
	g_assert_cmpstr (g_hash_table_lookup (attributes, "string"), ==, "one");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "number"), ==, "1");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "even"), ==, "false");
	g_assert_cmpuint (g_hash_table_size (attributes), ==, 4);
	g_hash_table_unref (attributes);

	/* Has some other schema */
	schema_name = secret_item_get_schema_name (item);
	g_assert_cmpstr (schema_name, !=, MOCK_SCHEMA.name);
	g_free (schema_name);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "string", "five");
	g_hash_table_insert (attributes, "number", "5");
	ret = secret_item_set_attributes_sync (item, &MOCK_SCHEMA, attributes, NULL, &error);
	g_hash_table_unref (attributes);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	attributes = secret_item_get_attributes (item);
	g_assert_cmpstr (g_hash_table_lookup (attributes, "string"), ==, "five");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "number"), ==, "5");
	g_assert_cmpuint (g_hash_table_size (attributes), ==, 3);
	g_hash_table_unref (attributes);

	/* Now has our schema */
	schema_name = secret_item_get_schema_name (item);
	g_assert_cmpstr (schema_name, ==, MOCK_SCHEMA.name);
	g_free (schema_name);

	g_object_unref (item);
}

static void
test_set_attributes_async (Test *test,
                           gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GHashTable *attributes;
	GError *error = NULL;
	GAsyncResult *result = NULL;
	SecretItem *item;
	gchar *schema_name;
	gboolean ret;

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	attributes = secret_item_get_attributes (item);
	g_assert_cmpstr (g_hash_table_lookup (attributes, "string"), ==, "one");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "number"), ==, "1");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "even"), ==, "false");
	g_assert_cmpuint (g_hash_table_size (attributes), ==, 4);
	g_hash_table_unref (attributes);

	/* Has some other schema */
	schema_name = secret_item_get_schema_name (item);
	g_assert_cmpstr (schema_name, !=, MOCK_SCHEMA.name);
	g_free (schema_name);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "string", "five");
	g_hash_table_insert (attributes, "number", "5");
	secret_item_set_attributes (item, &MOCK_SCHEMA, attributes, NULL, on_async_result, &result);
	g_assert (result == NULL);
	g_hash_table_unref (attributes);

	egg_test_wait ();

	ret = secret_item_set_attributes_finish (item, result, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_object_unref (result);

	attributes = secret_item_get_attributes (item);
	g_assert_cmpstr (g_hash_table_lookup (attributes, "string"), ==, "five");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "number"), ==, "5");
	g_assert_cmpuint (g_hash_table_size (attributes), ==, 3);
	g_hash_table_unref (attributes);

	/* Now has our schema */
	schema_name = secret_item_get_schema_name (item);
	g_assert_cmpstr (schema_name, ==, MOCK_SCHEMA.name);
	g_free (schema_name);

	g_object_unref (item);
}

static void
test_set_attributes_prop (Test *test,
                          gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GAsyncResult *result = NULL;
	GError *error = NULL;
	SecretItem *item;
	GHashTable *attributes;
	guint sigs = 2;

	secret_item_new_for_dbus_path (test->service, item_path, SECRET_ITEM_NONE, NULL, on_async_result, &result);
	g_assert (result == NULL);
	egg_test_wait ();
	item = secret_item_new_for_dbus_path_finish (result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	attributes = secret_item_get_attributes (item);
	g_assert_cmpstr (g_hash_table_lookup (attributes, "string"), ==, "one");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "number"), ==, "1");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "even"), ==, "false");
	g_assert_cmpuint (g_hash_table_size (attributes), ==, 4);
	g_hash_table_unref (attributes);

	g_signal_connect (item, "notify::attributes", G_CALLBACK (on_notify_stop), &sigs);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "string", "five");
	g_hash_table_insert (attributes, "number", "5");
	g_object_set (item, "attributes", attributes, NULL);
	g_hash_table_unref (attributes);

	/* Wait for the property to actually 'take' */
	egg_test_wait ();

	attributes = secret_item_get_attributes (item);
	g_assert_cmpstr (g_hash_table_lookup (attributes, "string"), ==, "five");
	g_assert_cmpstr (g_hash_table_lookup (attributes, "number"), ==, "5");
	g_assert_cmpuint (g_hash_table_size (attributes), ==, 2);
	g_hash_table_unref (attributes);

	g_object_add_weak_pointer (G_OBJECT (item), (gpointer *)&item);
	g_object_unref (item);

	while (item != NULL)
		g_main_context_iteration (g_main_context_get_thread_default (), TRUE);
}

static void
test_load_secret_sync (Test *test,
                       gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GError *error = NULL;
	SecretItem *item;
	SecretValue *value;
	gconstpointer data;
	gboolean ret;
	gsize length;

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	value = secret_item_get_secret (item);
	g_assert (value == NULL);

	ret = secret_item_load_secret_sync (item, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	value = secret_item_get_secret (item);
	g_assert (value != NULL);

	data = secret_value_get (value, &length);
	egg_assert_cmpmem (data, length, ==, "111", 3);

	secret_value_unref (value);

	g_object_unref (item);
}

static void
test_load_secret_async (Test *test,
                        gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GAsyncResult *result = NULL;
	GError *error = NULL;
	SecretItem *item;
	SecretValue *value;
	gconstpointer data;
	gboolean ret;
	gsize length;

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	value = secret_item_get_secret (item);
	g_assert (value == NULL);

	secret_item_load_secret (item, NULL, on_async_result, &result);
	g_assert (result == NULL);

	egg_test_wait ();

	ret = secret_item_load_secret_finish (item, result, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_object_unref (result);

	value = secret_item_get_secret (item);
	g_assert (value != NULL);

	data = secret_value_get (value, &length);
	egg_assert_cmpmem (data, length, ==, "111", 3);

	secret_value_unref (value);

	g_object_unref (item);
}

static void
test_set_secret_sync (Test *test,
                      gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GError *error = NULL;
	SecretItem *item;
	gconstpointer data;
	SecretValue *value;
	SecretValue *check;
	gboolean ret;
	gsize length;

	value = secret_value_new ("Sinking", -1, "strange/content-type");

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	ret = secret_item_set_secret_sync (item, value, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	check = secret_item_get_secret (item);
	g_assert (check == value);
	secret_value_unref (check);
	secret_value_unref (value);

	ret = secret_item_load_secret_sync (item, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	value = secret_item_get_secret (item);
	g_assert (value != NULL);

	data = secret_value_get (value, &length);
	egg_assert_cmpmem (data, length, ==, "Sinking", 7);
	g_assert_cmpstr (secret_value_get_content_type (value), ==, "strange/content-type");

	secret_value_unref (value);
	g_object_unref (item);
}

static void
test_secrets_sync (Test *test,
                   gconstpointer used)
{
	const gchar *path_item_one = "/org/freedesktop/secrets/collection/english/1";
	const gchar *path_item_two = "/org/freedesktop/secrets/collection/english/2";
	const gchar *path_item_three = "/org/freedesktop/secrets/collection/spanish/10";

	SecretValue *value;
	GError *error = NULL;
	const gchar *password;
	SecretItem *item_one, *item_two, *item_three;
	GList *items = NULL;
	gboolean ret;
	gsize length;

	item_one = secret_item_new_for_dbus_path_sync (test->service, path_item_one, SECRET_ITEM_NONE, NULL, &error);
	item_two = secret_item_new_for_dbus_path_sync (test->service, path_item_two, SECRET_ITEM_NONE, NULL, &error);
	item_three = secret_item_new_for_dbus_path_sync (test->service, path_item_three, SECRET_ITEM_NONE, NULL, &error);

	items = g_list_append (items, item_one);
	items = g_list_append (items, item_two);
	items = g_list_append (items, item_three);

	ret = secret_item_load_secrets_sync (items, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	value = secret_item_get_secret (item_one);
	g_assert (value != NULL);
	password = secret_value_get (value, &length);
	g_assert_cmpuint (length, ==, 3);
	g_assert_cmpstr (password, ==, "111");
	secret_value_unref (value);

	value = secret_item_get_secret (item_two);
	g_assert (value != NULL);
	password = secret_value_get (value, &length);
	g_assert_cmpuint (length, ==, 3);
	g_assert_cmpstr (password, ==, "222");
	secret_value_unref (value);

	value = secret_item_get_secret (item_three);
	g_assert (value == NULL);

	g_list_free_full (items, g_object_unref);
}

static void
test_secrets_async (Test *test,
                              gconstpointer used)
{
	const gchar *path_item_one = "/org/freedesktop/secrets/collection/english/1";
	const gchar *path_item_two = "/org/freedesktop/secrets/collection/english/2";
	const gchar *path_item_three = "/org/freedesktop/secrets/collection/spanish/10";

	SecretValue *value;
	GError *error = NULL;
	const gchar *password;
	GAsyncResult *result = NULL;
	SecretItem *item_one, *item_two, *item_three;
	GList *items = NULL;
	gsize length;
	gboolean ret;

	item_one = secret_item_new_for_dbus_path_sync (test->service, path_item_one, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	item_two = secret_item_new_for_dbus_path_sync (test->service, path_item_two, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	item_three = secret_item_new_for_dbus_path_sync (test->service, path_item_three, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);


	items = g_list_append (items, item_one);
	items = g_list_append (items, item_two);
	items = g_list_append (items, item_three);

	secret_item_load_secrets (items, NULL,
	                          on_async_result, &result);
	g_assert (result == NULL);

	egg_test_wait ();

	ret = secret_item_load_secrets_finish (result, &error);
	g_assert_no_error (error);
	g_object_unref (result);
	g_assert (ret == TRUE);

	value = secret_item_get_secret (item_one);
	g_assert (value != NULL);
	password = secret_value_get (value, &length);
	g_assert_cmpuint (length, ==, 3);
	g_assert_cmpstr (password, ==, "111");
	secret_value_unref (value);

	value = secret_item_get_secret (item_two);
	g_assert (value != NULL);
	password = secret_value_get (value, &length);
	g_assert_cmpuint (length, ==, 3);
	g_assert_cmpstr (password, ==, "222");
	secret_value_unref (value);

	value = secret_item_get_secret (item_three);
	g_assert (value == NULL);

	g_object_unref (item_one);
	g_object_unref (item_two);
	g_object_unref (item_three);
	g_list_free (items);
}

static void
test_delete_sync (Test *test,
                  gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GError *error = NULL;
	SecretItem *item;
	gboolean ret;

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	ret = secret_item_delete_sync (item, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_object_unref (item);

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_error (error, G_DBUS_ERROR, G_DBUS_ERROR_UNKNOWN_METHOD);
	g_assert (item == NULL);
	g_clear_error (&error);
}

static void
test_delete_async (Test *test,
                   gconstpointer unused)
{
	const gchar *item_path = "/org/freedesktop/secrets/collection/english/1";
	GAsyncResult *result = NULL;
	GError *error = NULL;
	SecretItem *item;
	gboolean ret;

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_no_error (error);

	secret_item_delete (item, NULL, on_async_result, &result);
	g_assert (result == NULL);

	egg_test_wait ();

	ret = secret_item_delete_finish (item, result, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_object_unref (result);
	g_object_unref (item);

	item = secret_item_new_for_dbus_path_sync (test->service, item_path, SECRET_ITEM_NONE, NULL, &error);
	g_assert_error (error, G_DBUS_ERROR, G_DBUS_ERROR_UNKNOWN_METHOD);
	g_assert (item == NULL);
	g_clear_error (&error);
}

int
main (int argc, char **argv)
{
	g_test_init (&argc, &argv, NULL);
	g_set_prgname ("test-item");
#if !GLIB_CHECK_VERSION(2,35,0)
	g_type_init ();
#endif

	g_test_add ("/item/new-sync", Test, "mock-service-normal.py", setup, test_new_sync, teardown);
	g_test_add ("/item/new-async", Test, "mock-service-normal.py", setup, test_new_async, teardown);
	g_test_add ("/item/new-sync-noexist", Test, "mock-service-normal.py", setup, test_new_sync_noexist, teardown);
	g_test_add ("/item/new-async-noexist", Test, "mock-service-normal.py", setup, test_new_async_noexist, teardown);
	g_test_add ("/item/create-sync", Test, "mock-service-normal.py", setup, test_create_sync, teardown);
	g_test_add ("/item/create-async", Test, "mock-service-normal.py", setup, test_create_async, teardown);
	g_test_add ("/item/properties", Test, "mock-service-normal.py", setup, test_properties, teardown);
	g_test_add ("/item/set-label-sync", Test, "mock-service-normal.py", setup, test_set_label_sync, teardown);
	g_test_add ("/item/set-label-async", Test, "mock-service-normal.py", setup, test_set_label_async, teardown);
	g_test_add ("/item/set-label-prop", Test, "mock-service-normal.py", setup, test_set_label_prop, teardown);
	g_test_add ("/item/set-attributes-sync", Test, "mock-service-normal.py", setup, test_set_attributes_sync, teardown);
	g_test_add ("/item/set-attributes-async", Test, "mock-service-normal.py", setup, test_set_attributes_async, teardown);
	g_test_add ("/item/set-attributes-prop", Test, "mock-service-normal.py", setup, test_set_attributes_prop, teardown);
	g_test_add ("/item/load-secret-sync", Test, "mock-service-normal.py", setup, test_load_secret_sync, teardown);
	g_test_add ("/item/load-secret-async", Test, "mock-service-normal.py", setup, test_load_secret_async, teardown);
	g_test_add ("/item/set-secret-sync", Test, "mock-service-normal.py", setup, test_set_secret_sync, teardown);
	g_test_add ("/item/secrets-sync", Test, "mock-service-normal.py", setup, test_secrets_sync, teardown);
	g_test_add ("/item/secrets-async", Test, "mock-service-normal.py", setup, test_secrets_async, teardown);
	g_test_add ("/item/delete-sync", Test, "mock-service-normal.py", setup, test_delete_sync, teardown);
	g_test_add ("/item/delete-async", Test, "mock-service-normal.py", setup, test_delete_async, teardown);

	return egg_tests_run_with_loop ();
}
