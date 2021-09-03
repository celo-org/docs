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

static const SecretSchema MOCK_SCHEMA = {
	"org.mock.Schema",
	SECRET_SCHEMA_NONE,
	{
		{ "number", SECRET_SCHEMA_ATTRIBUTE_INTEGER },
		{ "string", SECRET_SCHEMA_ATTRIBUTE_STRING },
		{ "even", SECRET_SCHEMA_ATTRIBUTE_BOOLEAN },
	}
};

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
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	GError *error = NULL;
	SecretCollection *collection;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);
	g_object_add_weak_pointer (G_OBJECT (collection), (gpointer *)&collection);

	g_assert_cmpstr (g_dbus_proxy_get_object_path (G_DBUS_PROXY (collection)), ==, collection_path);

	g_object_unref (collection);
	g_assert (collection == NULL);
}

static void
test_new_async (Test *test,
               gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	GError *error = NULL;
	SecretCollection *collection;
	GAsyncResult *result = NULL;

	secret_collection_new_for_dbus_path (test->service, collection_path,
	                                     SECRET_COLLECTION_NONE, NULL, on_async_result, &result);
	g_assert (result == NULL);

	egg_test_wait ();

	collection = secret_collection_new_for_dbus_path_finish (result, &error);
	g_assert_no_error (error);
	g_object_unref (result);
	g_object_add_weak_pointer (G_OBJECT (collection), (gpointer *)&collection);

	g_assert_cmpstr (g_dbus_proxy_get_object_path (G_DBUS_PROXY (collection)), ==, collection_path);

	g_object_unref (collection);
	g_assert (collection == NULL);
}

static void
test_new_sync_noexist (Test *test,
                       gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/nonexistant";
	GError *error = NULL;
	SecretCollection *collection;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_error (error, G_DBUS_ERROR, G_DBUS_ERROR_UNKNOWN_METHOD);
	g_assert (collection == NULL);
	g_clear_error (&error);
}

static void
test_new_async_noexist (Test *test,
                        gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/nonexistant";
	GError *error = NULL;
	SecretCollection *collection;
	GAsyncResult *result = NULL;

	secret_collection_new_for_dbus_path (test->service, collection_path,
	                                     SECRET_COLLECTION_NONE, NULL, on_async_result, &result);
	g_assert (result == NULL);

	egg_test_wait ();

	collection = secret_collection_new_for_dbus_path_finish (result, &error);
	g_assert_error (error, G_DBUS_ERROR, G_DBUS_ERROR_UNKNOWN_METHOD);
	g_assert (collection == NULL);
	g_clear_error (&error);
	g_object_unref (result);
}


static void
test_for_alias_sync (Test *test,
                     gconstpointer used)
{
	const gchar *collection_path;
	SecretCollection *collection;
	GError *error = NULL;

	collection = secret_collection_for_alias_sync (test->service, "default",
	                                               SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	collection_path = g_dbus_proxy_get_object_path (G_DBUS_PROXY (collection));
	g_assert_cmpstr (collection_path, ==, "/org/freedesktop/secrets/collection/english");
	g_assert_cmpuint (secret_collection_get_flags (collection), ==, SECRET_COLLECTION_NONE);
	g_assert (secret_collection_get_items (collection) == NULL);
	g_object_unref (collection);

	collection = secret_collection_for_alias_sync (test->service, "unknown",
	                                               SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);
	g_assert (collection == NULL);
}

static void
test_for_alias_async (Test *test,
                      gconstpointer used)
{
	const gchar *collection_path;
	SecretCollection *collection;
	GAsyncResult *result = NULL;
	GError *error = NULL;

	secret_collection_for_alias (test->service, "default",
	                             SECRET_COLLECTION_NONE,
	                             NULL, on_async_result, &result);
	g_assert (result == NULL);
	egg_test_wait ();

	collection = secret_collection_for_alias_finish (result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	collection_path = g_dbus_proxy_get_object_path (G_DBUS_PROXY (collection));
	g_assert_cmpstr (collection_path, ==, "/org/freedesktop/secrets/collection/english");
	g_assert_cmpuint (secret_collection_get_flags (collection), ==, SECRET_COLLECTION_NONE);
	g_assert (secret_collection_get_items (collection) == NULL);
	g_object_unref (collection);
	result = NULL;

	secret_collection_for_alias (test->service, "unknown",
	                             SECRET_COLLECTION_NONE,
	                             NULL, on_async_result, &result);
	g_assert (result == NULL);
	egg_test_wait ();

	collection = secret_collection_for_alias_finish (result, &error);
	g_assert_no_error (error);
	g_assert (collection == NULL);
	g_object_unref (result);
}

static void
test_for_alias_load_sync (Test *test,
                          gconstpointer used)
{
	const gchar *collection_path;
	SecretCollection *collection;
	GError *error = NULL;
	GList *items;

	collection = secret_collection_for_alias_sync (test->service, "default",
	                                               SECRET_COLLECTION_LOAD_ITEMS,
	                                               NULL, &error);
	g_assert_no_error (error);

	collection_path = g_dbus_proxy_get_object_path (G_DBUS_PROXY (collection));
	g_assert_cmpstr (collection_path, ==, "/org/freedesktop/secrets/collection/english");
	g_assert_cmpuint (secret_collection_get_flags (collection), ==, SECRET_COLLECTION_LOAD_ITEMS);
	items = secret_collection_get_items (collection);
	g_assert (items != NULL);
	g_list_free_full (items, g_object_unref);
	g_object_unref (collection);
}

static void
test_for_alias_load_async (Test *test,
                           gconstpointer used)
{
	const gchar *collection_path;
	SecretCollection *collection;
	GAsyncResult *result = NULL;
	GError *error = NULL;
	GList *items;

	secret_collection_for_alias (test->service, "default",
	                             SECRET_COLLECTION_LOAD_ITEMS,
	                             NULL, on_async_result, &result);
	g_assert (result == NULL);
	egg_test_wait ();

	collection = secret_collection_for_alias_finish (result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	collection_path = g_dbus_proxy_get_object_path (G_DBUS_PROXY (collection));
	g_assert_cmpstr (collection_path, ==, "/org/freedesktop/secrets/collection/english");
	g_assert_cmpuint (secret_collection_get_flags (collection), ==, SECRET_COLLECTION_LOAD_ITEMS);
	items = secret_collection_get_items (collection);
	g_assert (items != NULL);
	g_list_free_full (items, g_object_unref);
	g_object_unref (collection);
	result = NULL;
}

#define g_assert_cmpstr_free(str1, op, str2) G_STMT_START { char *str = str1; g_assert_cmpstr (str, op, str2); g_free (str); } G_STMT_END
static void
test_create_sync (Test *test,
                  gconstpointer unused)
{
	GError *error = NULL;
	SecretCollection *collection;

	collection = secret_collection_create_sync (test->service, "Train", NULL,
	                                            SECRET_COLLECTION_CREATE_NONE, NULL, &error);
	g_assert_no_error (error);
	g_object_add_weak_pointer (G_OBJECT (collection), (gpointer *)&collection);

	g_assert (g_str_has_prefix (g_dbus_proxy_get_object_path (G_DBUS_PROXY (collection)), "/org/freedesktop/secrets/collection"));
	g_assert_cmpstr_free (secret_collection_get_label (collection), ==, "Train");
	g_assert (secret_collection_get_locked (collection) == FALSE);

	g_object_unref (collection);
	g_assert (collection == NULL);
}

static void
test_create_async (Test *test,
                   gconstpointer unused)
{
	GError *error = NULL;
	SecretCollection *collection;
	GAsyncResult *result = NULL;

	secret_collection_create (test->service, "Train", NULL,
	                          SECRET_COLLECTION_CREATE_NONE,
	                          NULL, on_async_result, &result);
	g_assert (result == NULL);

	egg_test_wait ();

	collection = secret_collection_create_finish (result, &error);
	g_assert_no_error (error);
	g_object_unref (result);
	g_object_add_weak_pointer (G_OBJECT (collection), (gpointer *)&collection);

	g_assert (g_str_has_prefix (g_dbus_proxy_get_object_path (G_DBUS_PROXY (collection)), "/org/freedesktop/secrets/collection"));
	g_assert_cmpstr_free (secret_collection_get_label (collection), ==, "Train");
	g_assert (secret_collection_get_locked (collection) == FALSE);

	g_object_unref (collection);
	g_assert (collection == NULL);
}

static void
test_properties (Test *test,
                 gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretCollection *collection;
	SecretService *service;
	GError *error = NULL;
	guint64 created;
	guint64 modified;
	gboolean locked;
	gchar *label;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	g_assert (secret_collection_get_locked (collection) == FALSE);
	g_assert_cmpuint (secret_collection_get_created (collection), <=, time (NULL));
	g_assert_cmpuint (secret_collection_get_modified (collection), <=, time (NULL));

	label = secret_collection_get_label (collection);
	g_assert_cmpstr (label, ==, "Collection One");
	g_free (label);

	g_object_get (collection,
	              "locked", &locked,
	              "created", &created,
	              "modified", &modified,
	              "label", &label,
	              "service", &service,
	              NULL);

	g_assert (locked == FALSE);
	g_assert_cmpuint (created, <=, time (NULL));
	g_assert_cmpuint (modified, <=, time (NULL));

	g_assert_cmpstr (label, ==, "Collection One");
	g_free (label);

	g_assert (service == test->service);
	g_object_unref (service);

	g_object_unref (collection);
}

static void
check_items_equal (GList *items,
                   ...)
{
	GHashTable *paths;
	gboolean have_item;
	const gchar *path;
	guint num_items;
	va_list va;
	GList *l;

	va_start (va, items);
	paths = g_hash_table_new (g_str_hash, g_str_equal);
	while ((path = va_arg (va, gchar *)) != NULL)
		g_hash_table_insert (paths, (gpointer)path, (gpointer)path);
	va_end (va);

	num_items = g_hash_table_size (paths);
	g_assert_cmpuint (num_items, ==, g_list_length (items));

	for (l = items; l != NULL; l = g_list_next (l)) {
		path = g_dbus_proxy_get_object_path (l->data);
		have_item = g_hash_table_remove (paths, path);
		g_assert (have_item);
	}

	g_hash_table_destroy (paths);
}

static void
test_items (Test *test,
            gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretCollection *collection;
	GError *error = NULL;
	GList *items;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_LOAD_ITEMS, NULL, &error);
	g_assert_no_error (error);

	items = secret_collection_get_items (collection);
	check_items_equal (items,
	                   "/org/freedesktop/secrets/collection/english/1",
	                   "/org/freedesktop/secrets/collection/english/2",
	                   "/org/freedesktop/secrets/collection/english/3",
	                   NULL);
	g_list_free_full (items, g_object_unref);

	g_object_get (collection, "items", &items, NULL);
	check_items_equal (items,
	                   "/org/freedesktop/secrets/collection/english/1",
	                   "/org/freedesktop/secrets/collection/english/2",
	                   "/org/freedesktop/secrets/collection/english/3",
	                   NULL);
	g_list_free_full (items, g_object_unref);

	g_object_unref (collection);
}

static void
test_items_empty (Test *test,
                  gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/empty";
	SecretCollection *collection;
	GError *error = NULL;
	GList *items;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_LOAD_ITEMS, NULL, &error);
	g_assert_no_error (error);

	items = secret_collection_get_items (collection);
	check_items_equal (items, NULL);
	g_list_free_full (items, g_object_unref);

	g_object_get (collection, "items", &items, NULL);
	check_items_equal (items, NULL);
	g_list_free_full (items, g_object_unref);

	g_object_unref (collection);
}

static void
test_items_empty_async (Test *test,
                        gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/empty";
	SecretCollection *collection;
	GAsyncResult *result = NULL;
	GError *error = NULL;
	GList *items;

	secret_collection_new_for_dbus_path (test->service, collection_path,
	                                     SECRET_COLLECTION_LOAD_ITEMS,
	                                     NULL, on_async_result, &result);
	g_assert (result == NULL);

	egg_test_wait ();

	collection = secret_collection_new_for_dbus_path_finish (result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	items = secret_collection_get_items (collection);
	check_items_equal (items, NULL);
	g_list_free_full (items, g_object_unref);

	g_object_get (collection, "items", &items, NULL);
	check_items_equal (items, NULL);
	g_list_free_full (items, g_object_unref);

	g_object_unref (collection);
}

static void
test_set_label_sync (Test *test,
                     gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	GError *error = NULL;
	SecretCollection *collection;
	gboolean ret;
	gchar *label;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	label = secret_collection_get_label (collection);
	g_assert_cmpstr (label, ==, "Collection One");
	g_free (label);

	ret = secret_collection_set_label_sync (collection, "Another label", NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	label = secret_collection_get_label (collection);
	g_assert_cmpstr (label, ==, "Another label");
	g_free (label);

	g_object_unref (collection);
}

static void
test_set_label_async (Test *test,
                      gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	GAsyncResult *result = NULL;
	GError *error = NULL;
	SecretCollection *collection;
	gboolean ret;
	gchar *label;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	label = secret_collection_get_label (collection);
	g_assert_cmpstr (label, ==, "Collection One");
	g_free (label);

	secret_collection_set_label (collection, "Another label", NULL, on_async_result, &result);
	g_assert (result == NULL);

	egg_test_wait ();

	ret = secret_collection_set_label_finish (collection, result, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);
	g_object_unref (result);

	label = secret_collection_get_label (collection);
	g_assert_cmpstr (label, ==, "Another label");
	g_free (label);

	g_object_unref (collection);
}

static void
test_set_label_prop (Test *test,
                     gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	GAsyncResult *result = NULL;
	GError *error = NULL;
	SecretCollection *collection;
	guint sigs = 2;
	gchar *label;

	secret_collection_new_for_dbus_path (test->service, collection_path, SECRET_COLLECTION_NONE,
	                                     NULL, on_async_result, &result);
	g_assert (result == NULL);
	egg_test_wait ();
	collection = secret_collection_new_for_dbus_path_finish (result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	label = secret_collection_get_label (collection);
	g_assert_cmpstr (label, ==, "Collection One");
	g_free (label);

	g_signal_connect (collection, "notify::label", G_CALLBACK (on_notify_stop), &sigs);
	g_object_set (collection, "label", "Blah blah", NULL);

	/* Wait for the property to actually 'take' */
	egg_test_wait ();

	label = secret_collection_get_label (collection);
	g_assert_cmpstr (label, ==, "Blah blah");
	g_free (label);

	g_object_unref (collection);
}

static void
test_delete_sync (Test *test,
                  gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretCollection *collection;
	GError *error = NULL;
	gboolean ret;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	ret = secret_collection_delete_sync (collection, NULL, &error);
	g_assert_no_error (error);
	g_assert (ret == TRUE);

	g_object_unref (collection);

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_error (error, G_DBUS_ERROR, G_DBUS_ERROR_UNKNOWN_METHOD);
	g_assert (collection == NULL);
	g_clear_error (&error);
}

static void
test_delete_async (Test *test,
                   gconstpointer unused)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretCollection *collection;
	GAsyncResult *result = NULL;
	GError *error = NULL;
	gboolean ret;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	secret_collection_delete (collection, NULL, on_async_result, &result);
	g_assert (result == NULL);

	egg_test_wait ();

	ret = secret_collection_delete_finish (collection, result, &error);
	g_assert_no_error (error);
	g_object_unref (result);
	g_assert (ret == TRUE);

	g_object_unref (collection);

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_error (error, G_DBUS_ERROR, G_DBUS_ERROR_UNKNOWN_METHOD);
	g_assert (collection == NULL);
	g_clear_error(&error);
}

static void
test_search_sync (Test *test,
                  gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretCollection *collection;
	GHashTable *attributes;
	GError *error = NULL;
	GList *items;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	items = secret_collection_search_sync (collection, &MOCK_SCHEMA, attributes,
	                                       SECRET_SEARCH_NONE, NULL, &error);
	g_assert_no_error (error);
	g_hash_table_unref (attributes);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");

	g_assert (items->next == NULL);
	g_list_free_full (items, g_object_unref);

	g_object_unref (collection);
}

static void
test_search_async (Test *test,
                   gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretCollection *collection;
	GAsyncResult *result = NULL;
	GHashTable *attributes;
	GError *error = NULL;
	GList *items;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	secret_collection_search (collection, &MOCK_SCHEMA, attributes,
	                          SECRET_SEARCH_NONE, NULL,
	                          on_async_result, &result);
	g_hash_table_unref (attributes);
	g_assert (result == NULL);

	egg_test_wait ();

	g_assert (G_IS_ASYNC_RESULT (result));
	items = secret_collection_search_finish (collection, result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");

	g_assert (items->next == NULL);
	g_list_free_full (items, g_object_unref);

	g_object_unref (collection);
}

static gint
sort_by_object_path (gconstpointer a,
                     gconstpointer b)
{
	const gchar *pa = g_dbus_proxy_get_object_path ((GDBusProxy *)a);
	const gchar *pb = g_dbus_proxy_get_object_path ((GDBusProxy *)b);

	return g_strcmp0 (pa, pb);
}

static void
test_search_all_sync (Test *test,
                  gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretCollection *collection;
	GHashTable *attributes;
	GError *error = NULL;
	GList *items;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);

	items = secret_collection_search_sync (collection, &MOCK_SCHEMA, attributes,
	                                       SECRET_SEARCH_ALL, NULL, &error);
	g_assert_no_error (error);
	g_hash_table_unref (attributes);

	items = g_list_sort (items, sort_by_object_path);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");
	g_assert (secret_item_get_secret (items->data) == NULL);

	g_assert (items->next != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->next->data), ==, "/org/freedesktop/secrets/collection/english/2");
	g_assert (secret_item_get_secret (items->next->data) == NULL);

	g_assert (items->next->next != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->next->next->data), ==, "/org/freedesktop/secrets/collection/english/3");
	g_assert (secret_item_get_secret (items->next->next->data) == NULL);

	g_assert (items->next->next->next == NULL);
	g_list_free_full (items, g_object_unref);

	g_object_unref (collection);
}

static void
test_search_all_async (Test *test,
                   gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretCollection *collection;
	GAsyncResult *result = NULL;
	GHashTable *attributes;
	GError *error = NULL;
	GList *items;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);

	secret_collection_search (collection, &MOCK_SCHEMA, attributes,
	                          SECRET_SEARCH_ALL, NULL,
	                          on_async_result, &result);
	g_hash_table_unref (attributes);
	g_assert (result == NULL);

	egg_test_wait ();

	g_assert (G_IS_ASYNC_RESULT (result));
	items = secret_collection_search_finish (collection, result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	items = g_list_sort (items, sort_by_object_path);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");
	g_assert (secret_item_get_secret (items->data) == NULL);

	g_assert (items->next != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->next->data), ==, "/org/freedesktop/secrets/collection/english/2");
	g_assert (secret_item_get_secret (items->next->data) == NULL);

	g_assert (items->next->next != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->next->next->data), ==, "/org/freedesktop/secrets/collection/english/3");
	g_assert (secret_item_get_secret (items->next->next->data) == NULL);

	g_assert (items->next->next->next == NULL);
	g_list_free_full (items, g_object_unref);

	g_object_unref (collection);
}

static void
test_search_unlock_sync (Test *test,
                         gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/spanish";
	SecretCollection *collection;
	GHashTable *attributes;
	GError *error = NULL;
	GList *items;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	items = secret_collection_search_sync (collection, &MOCK_SCHEMA, attributes,
	                                       SECRET_SEARCH_UNLOCK, NULL, &error);
	g_assert_no_error (error);
	g_hash_table_unref (attributes);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/spanish/10");
	g_assert (secret_item_get_locked (items->data) == FALSE);
	g_assert (secret_item_get_secret (items->data) == NULL);

	g_assert (items->next == NULL);
	g_list_free_full (items, g_object_unref);

	g_object_unref (collection);
}

static void
test_search_unlock_async (Test *test,
                          gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/spanish";
	SecretCollection *collection;
	GAsyncResult *result = NULL;
	GHashTable *attributes;
	GError *error = NULL;
	GList *items;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	secret_collection_search (collection, &MOCK_SCHEMA, attributes,
	                          SECRET_SEARCH_UNLOCK, NULL,
	                          on_async_result, &result);
	g_hash_table_unref (attributes);
	g_assert (result == NULL);

	egg_test_wait ();

	g_assert (G_IS_ASYNC_RESULT (result));
	items = secret_collection_search_finish (collection, result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/spanish/10");
	g_assert (secret_item_get_locked (items->data) == FALSE);
	g_assert (secret_item_get_secret (items->data) == NULL);

	g_assert (items->next == NULL);
	g_list_free_full (items, g_object_unref);

	g_object_unref (collection);
}

static void
test_search_secrets_sync (Test *test,
                          gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretCollection *collection;
	GHashTable *attributes;
	GError *error = NULL;
	SecretValue *value;
	GList *items;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	items = secret_collection_search_sync (collection, &MOCK_SCHEMA, attributes,
	                                       SECRET_SEARCH_LOAD_SECRETS,
	                                       NULL, &error);
	g_assert_no_error (error);
	g_hash_table_unref (attributes);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");
	g_assert (secret_item_get_locked (items->data) == FALSE);
	value = secret_item_get_secret (items->data);
	g_assert (value != NULL);
	secret_value_unref (value);

	g_assert (items->next == NULL);
	g_list_free_full (items, g_object_unref);

	g_object_unref (collection);
}

static void
test_search_secrets_async (Test *test,
                           gconstpointer used)
{
	const gchar *collection_path = "/org/freedesktop/secrets/collection/english";
	SecretCollection *collection;
	GAsyncResult *result = NULL;
	GHashTable *attributes;
	GError *error = NULL;
	SecretValue *value;
	GList *items;

	collection = secret_collection_new_for_dbus_path_sync (test->service, collection_path,
	                                                       SECRET_COLLECTION_NONE, NULL, &error);
	g_assert_no_error (error);

	attributes = g_hash_table_new (g_str_hash, g_str_equal);
	g_hash_table_insert (attributes, "number", "1");

	secret_collection_search (collection, &MOCK_SCHEMA, attributes,
	                          SECRET_SEARCH_LOAD_SECRETS, NULL,
	                          on_async_result, &result);
	g_hash_table_unref (attributes);
	g_assert (result == NULL);

	egg_test_wait ();

	g_assert (G_IS_ASYNC_RESULT (result));
	items = secret_collection_search_finish (collection, result, &error);
	g_assert_no_error (error);
	g_object_unref (result);

	g_assert (items != NULL);
	g_assert_cmpstr (g_dbus_proxy_get_object_path (items->data), ==, "/org/freedesktop/secrets/collection/english/1");
	g_assert (secret_item_get_locked (items->data) == FALSE);
	value = secret_item_get_secret (items->data);
	g_assert (value != NULL);
	secret_value_unref (value);

	g_assert (items->next == NULL);
	g_list_free_full (items, g_object_unref);

	g_object_unref (collection);
}

int
main (int argc, char **argv)
{
	g_test_init (&argc, &argv, NULL);
	g_set_prgname ("test-collection");
#if !GLIB_CHECK_VERSION(2,35,0)
	g_type_init ();
#endif

	g_test_add ("/collection/new-sync", Test, "mock-service-normal.py", setup, test_new_sync, teardown);
	g_test_add ("/collection/new-async", Test, "mock-service-normal.py", setup, test_new_async, teardown);
	g_test_add ("/collection/new-sync-noexist", Test, "mock-service-normal.py", setup, test_new_sync_noexist, teardown);
	g_test_add ("/collection/new-async-noexist", Test, "mock-service-normal.py", setup, test_new_async_noexist, teardown);
	g_test_add ("/collection/for-alias-sync", Test, "mock-service-normal.py", setup, test_for_alias_sync, teardown);
	g_test_add ("/collection/for-alias-async", Test, "mock-service-normal.py", setup, test_for_alias_async, teardown);
	g_test_add ("/collection/for-alias-load-sync", Test, "mock-service-normal.py", setup, test_for_alias_load_sync, teardown);
	g_test_add ("/collection/for-alias-load-async", Test, "mock-service-normal.py", setup, test_for_alias_load_async, teardown);
	g_test_add ("/collection/create-sync", Test, "mock-service-normal.py", setup, test_create_sync, teardown);
	g_test_add ("/collection/create-async", Test, "mock-service-normal.py", setup, test_create_async, teardown);
	g_test_add ("/collection/properties", Test, "mock-service-normal.py", setup, test_properties, teardown);
	g_test_add ("/collection/items", Test, "mock-service-normal.py", setup, test_items, teardown);
	g_test_add ("/collection/items-empty", Test, "mock-service-normal.py", setup, test_items_empty, teardown);
	g_test_add ("/collection/items-empty-async", Test, "mock-service-normal.py", setup, test_items_empty_async, teardown);
	g_test_add ("/collection/set-label-sync", Test, "mock-service-normal.py", setup, test_set_label_sync, teardown);
	g_test_add ("/collection/set-label-async", Test, "mock-service-normal.py", setup, test_set_label_async, teardown);
	g_test_add ("/collection/set-label-prop", Test, "mock-service-normal.py", setup, test_set_label_prop, teardown);
	g_test_add ("/collection/delete-sync", Test, "mock-service-normal.py", setup, test_delete_sync, teardown);
	g_test_add ("/collection/delete-async", Test, "mock-service-normal.py", setup, test_delete_async, teardown);

	g_test_add ("/collection/search-sync", Test, "mock-service-normal.py", setup, test_search_sync, teardown);
	g_test_add ("/collection/search-async", Test, "mock-service-normal.py", setup, test_search_async, teardown);
	g_test_add ("/collection/search-all-sync", Test, "mock-service-normal.py", setup, test_search_all_sync, teardown);
	g_test_add ("/collection/search-all-async", Test, "mock-service-normal.py", setup, test_search_all_async, teardown);
	g_test_add ("/collection/search-unlock-sync", Test, "mock-service-normal.py", setup, test_search_unlock_sync, teardown);
	g_test_add ("/collection/search-unlock-async", Test, "mock-service-normal.py", setup, test_search_unlock_async, teardown);
	g_test_add ("/collection/search-secrets-sync", Test, "mock-service-normal.py", setup, test_search_secrets_sync, teardown);
	g_test_add ("/collection/search-secrets-async", Test, "mock-service-normal.py", setup, test_search_secrets_async, teardown);

	return egg_tests_run_with_loop ();
}
