/* libsecret - GLib wrapper for Secret Service
 *
 * Copyright 2011 Red Hat Inc.
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

#include "mock-service.h"

#include "secret-private.h"

#include <errno.h>
#include <stdio.h>
#include <string.h>

#ifdef __linux
#include <sys/prctl.h>
#endif

static gchar *service_name = NULL;
static GPid pid = 0;

static void
on_python_child_setup (gpointer user_data)
{
#ifdef __linux
  prctl (PR_SET_PDEATHSIG, 15);
#endif
}

static gchar *
read_until_end (int fd,
                GError **error)
{
	GString *data;
	gsize len;
	gssize ret;
	gchar *pos;

	data = g_string_new ("");

	for (;;) {
		len = data->len;
		g_string_set_size (data, len + 256);
		ret = read (fd, data->str + len, 256);
		if (ret < 0) {
			if (errno != EAGAIN) {
				g_set_error (error, G_IO_ERROR, g_io_error_from_errno (errno),
				             "Couldn't read from mock service: %s", g_strerror (errno));
				g_string_free (data, TRUE);
				return NULL;
			}
		} else if (ret == 0) {
			g_set_error (error, G_IO_ERROR, G_IO_ERROR_FAILED, "Remote closed the output");
			g_string_free (data, TRUE);
			return NULL;
		} else {
			data->len = len + ret;
			data->str[data->len] = '\0';
		}

		pos = strchr (data->str, '\n');
		if (pos) {
			g_string_set_size (data, pos - data->str);
			break;
		}
	}

	return g_string_free (data, FALSE);
}

static const gchar *
service_start (const gchar *mock_script,
               GError **error)
{
	GSpawnFlags flags;
	gboolean ret;
	gint output;

	gchar *argv[] = {
		"python3", (gchar *)mock_script,
		NULL
	};

	g_return_val_if_fail (mock_script != NULL, FALSE);
	g_return_val_if_fail (error == NULL || *error == NULL, FALSE);

	g_free (service_name);
	service_name = NULL;

	flags = G_SPAWN_SEARCH_PATH | G_SPAWN_DO_NOT_REAP_CHILD;
	ret = g_spawn_async_with_pipes (SRCDIR, argv, NULL, flags, on_python_child_setup, NULL, &pid,
	                                NULL, &output, NULL, error);

	if (ret) {
		service_name = read_until_end (output, error);
		if (service_name) {
			g_strstrip (service_name);
			g_assert_cmpstr (service_name, !=, "");
			g_setenv ("SECRET_SERVICE_BUS_NAME", service_name, TRUE);
		}
		close (output);
	}

	return service_name;
}

const gchar *
mock_service_start (const gchar *mock_script,
                    GError **error)
{
	gchar *path;
	const gchar *name;

	path = g_build_filename (SRCDIR, "libsecret", mock_script, NULL);
	name = service_start (path, error);
	g_free (path);

	return name;
}

void
mock_service_stop (void)
{
	while (g_main_context_iteration (NULL, FALSE));

	if (pid) {
		if (kill (pid, SIGTERM) < 0) {
			if (errno != ESRCH)
				g_warning ("kill() failed: %s", g_strerror (errno));
		}

		g_spawn_close_pid (pid);
		pid = 0;
	}

	while (g_main_context_iteration (NULL, FALSE));
	g_unsetenv ("SECRET_SERVICE_BUS_NAME");
}
