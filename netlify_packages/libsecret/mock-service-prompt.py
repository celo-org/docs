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

class ErrorPrompt(mock.SecretPrompt):
	def __init__(self, service, sender, prompt_name):
		mock.SecretPrompt.__init__(self, service, sender, prompt_name)

	@dbus.service.method('org.freedesktop.Secret.Prompt')
	def Prompt(self, window_id):
		raise mock.NotSupported("This should cause prompting to fail")

class VanishPrompt(mock.SecretPrompt):
	def __init__(self, service, sender, prompt_name):
		mock.SecretPrompt.__init__(self, service, sender, prompt_name)

	@dbus.service.method('org.freedesktop.Secret.Prompt')
	def Prompt(self, window_id):
		sys.exit(0)

class WindowPrompt(mock.SecretPrompt):
	def __init__(self, service, sender, prompt_name):
		mock.SecretPrompt.__init__(self, service, sender, prompt_name)

	@dbus.service.method('org.freedesktop.Secret.Prompt')
	def Prompt(self, window_id):
		self.result = dbus.String(window_id, variant_level=1)
		mock.SecretPrompt.Prompt(self, window_id)

service = mock.SecretService()
service.add_standard_objects()

mock.SecretPrompt(service, None, "simple")
mock.SecretPrompt(service, None, "delay", delay=0.1)
def prompt_callback():
	return dbus.String("Special Result", variant_level=1)
mock.SecretPrompt(service, None, "result", action=prompt_callback)
ErrorPrompt(service, None, "error")
VanishPrompt(service, None, "vanish")
WindowPrompt(service, None, "window")

service.listen()
