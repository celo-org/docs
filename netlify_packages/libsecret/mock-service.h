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

#ifndef _MOCK_SERVICE_H_
#define _MOCK_SERVICE_H_

#include <glib.h>

const gchar * mock_service_start     (const gchar *mock_script,
                                      GError **error);

void          mock_service_stop      (void);

#endif /* _MOCK_SERVICE_H_ */
