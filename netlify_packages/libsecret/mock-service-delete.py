#!/usr/bin/env python

#
# Copyright 2012 Red Hat Inc.
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published
# by the Free Software Foundation; either version 2.1 of the licence or (at
# your option) any later version.
#
# See the included COPYING file for more information.
#

import dbus
import mock
import sys

service = mock.SecretService()
service.add_standard_objects()

collection = mock.SecretCollection(service, "todelete", locked=False)
mock.SecretItem(collection, "item", attributes={ "number": "1", "string": "one", "even": "false" }, secret="uno")
mock.SecretItem(collection, "confirm", attributes={ "number": "2", "string": "two", "even": "true" }, secret="dos", confirm=True)

collection = mock.SecretCollection(service, "twodelete", locked=True)
mock.SecretItem(collection, "locked", attributes={ "number": "3", "string": "three", "even": "false" }, secret="tres")

service.listen()
