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

import sys
import unittest

import gi
gi.require_version('MockService', '0')
gi.require_version('Secret', '1')

from gi.repository import MockService as Mock
from gi.repository import Secret, GLib

STORE_SCHEMA = Secret.Schema.new("org.mock.Schema",
	Secret.SchemaFlags.NONE,
	{
		"number": Secret.SchemaAttributeType.INTEGER,
		"string": Secret.SchemaAttributeType.STRING,
		"even": Secret.SchemaAttributeType.BOOLEAN,
	}
)

class TestRemove(unittest.TestCase):
	def setUp(self):
		Mock.start("mock-service-normal.py")

	def tearDown(self):
		Secret.Service.disconnect()
		Mock.stop()

	def testSynchronous(self):
		attributes = { "number": "1", "string": "one", "even": "false" }

		password = Secret.password_lookup_sync(STORE_SCHEMA, attributes, None)
		self.assertEqual("111", password)

		deleted = Secret.password_clear_sync(STORE_SCHEMA, attributes, None)
		self.assertEqual(True, deleted)

	def testSyncNotFound(self):
		attributes = { "number": "11", "string": "one", "even": "true" }

		password = Secret.password_lookup_sync(STORE_SCHEMA, attributes, None)
		self.assertEqual(None, password)

		deleted = Secret.password_clear_sync(STORE_SCHEMA, attributes, None)
		self.assertEqual(False, deleted)

	def testAsynchronous(self):
		loop = GLib.MainLoop(None)

		def on_result_ready(source, result, unused):
			loop.quit()
			deleted = Secret.password_clear_finish(result)
			self.assertEquals(True, deleted)

		Secret.password_clear(STORE_SCHEMA, { "number": "2", "string": "two" },
		                      None, on_result_ready, None)

		loop.run()

	def testAsyncNotFound(self):
		loop = GLib.MainLoop(None)

		def on_result_ready(source, result, unused):
			loop.quit()
			deleted = Secret.password_clear_finish(result)
			self.assertEquals(False, deleted)

		Secret.password_clear(STORE_SCHEMA, { "number": "7", "string": "five" },
		                      None, on_result_ready, None)

		loop.run()

if __name__ == '__main__':
		unittest.main()
