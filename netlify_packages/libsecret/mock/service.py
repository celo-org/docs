#!/usr/bin/env python

#
# Copyright 2011 Stef Walter
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published
# by the Free Software Foundation; either version 2 of the licence or (at
# your option) any later version.
#
# See the included COPYING file for more information.
#

import getopt
import os
import sys
import time

from mock import aes, dh, hkdf

import dbus
import dbus.service
import dbus.glib
from gi.repository import GLib

COLLECTION_PREFIX = "/org/freedesktop/secrets/collection/"

objects = { }

class NotSupported(dbus.exceptions.DBusException):
	def __init__(self, msg):
		dbus.exceptions.DBusException.__init__(self, msg, name="org.freedesktop.DBus.Error.NotSupported")

class InvalidArgs(dbus.exceptions.DBusException):
	def __init__(self, msg):
		dbus.exceptions.DBusException.__init__(self, msg, name="org.freedesktop.DBus.Error.InvalidArgs")

class IsLocked(dbus.exceptions.DBusException):
	def __init__(self, msg):
		dbus.exceptions.DBusException.__init__(self, msg, name="org.freedesktop.Secret.Error.IsLocked")

class NoSuchObject(dbus.exceptions.DBusException):
	def __init__(self, msg):
		dbus.exceptions.DBusException.__init__(self, msg, name="org.freedesktop.Secret.Error.NoSuchObject")


unique_identifier = 111
def next_identifier(prefix=''):
	global unique_identifier
	unique_identifier += 1
	return "%s%d" % (prefix, unique_identifier)

def encode_identifier(value):
	return "".join([c.isalnum() and c or "_%02x" % ord(c) for c in value])

def hex_encode(string):
	return "".join([hex(ord(c))[2:].zfill(2) for c in string])

def alias_path(name):
	return "/org/freedesktop/secrets/aliases/%s" % name

class PlainAlgorithm():
	def negotiate(self, service, sender, param):
		if type (param) != dbus.String:
			raise InvalidArgs("invalid argument passed to OpenSession")
		session = SecretSession(service, sender, self, None)
		return (dbus.String("", variant_level=1), session)

	def encrypt(self, key, data):
		return b"", data

	def decrypt(self, key, params, data):
		if params == "":
			raise InvalidArgs("invalid secret plain parameter")
		return data


class AesAlgorithm():
	def negotiate(self, service, sender, param):
		if type (param) != dbus.ByteArray:
			raise InvalidArgs("invalid argument passed to OpenSession")
		privat, publi = dh.generate_pair()
		peer = int.from_bytes(param, 'big')
		# print "mock publi: ", hex(publi)
		# print " mock peer: ", hex(peer)
		ikm = dh.derive_key(privat, peer)
		# Pad the secret with zero bytes to match length of prime in bytes.
		ikm = b'\x00' * (128 - len(ikm)) + ikm
		# print "  mock ikm: ", hex_encode(ikm)
		key = hkdf.hkdf(ikm, 16)
		# print "  mock key: ", hex_encode(key)
		session = SecretSession(service, sender, self, key)
		return (dbus.ByteArray(dh.number_to_bytes(publi), variant_level=1), session)

	def encrypt(self, key, data):
		data = aes.append_PKCS7_padding(data)
		keysize = len(key)
		iv = os.urandom(16)
		mode = aes.AESModeOfOperation.modeOfOperation["CBC"]
		moo = aes.AESModeOfOperation()
		(mode, length, ciph) = moo.encrypt(data, mode, key, keysize, iv)
		return iv, ciph

	def decrypt(self, key, param, data):
		keysize = len(key)
		iv = param[:16]
		moo = aes.AESModeOfOperation()
		mode = aes.AESModeOfOperation.modeOfOperation["CBC"]
		decr = moo.decrypt(data, None, mode, key, keysize, iv)
		return aes.strip_PKCS7_padding(decr)


class SecretPrompt(dbus.service.Object):
	def __init__(self, service, sender, prompt_name=None, delay=0,
	             dismiss=False, action=None):
		self.sender = sender
		self.service = service
		self.delay = 0
		self.dismiss = False
		self.result = dbus.String("", variant_level=1)
		self.action = action
		self.completed = False
		if prompt_name:
			self.path = "/org/freedesktop/secrets/prompts/%s" % prompt_name
		else:
			self.path = "/org/freedesktop/secrets/prompts/%s" % next_identifier('p')
		dbus.service.Object.__init__(self, service.bus, self.path)
		service.add_prompt(self)
		assert self.path not in objects
		objects[self.path] = self

	def _complete(self):
		if self.completed:
			return
		self.completed = True
		self.Completed(self.dismiss, self.result)
		self.remove_from_connection()

	@dbus.service.method('org.freedesktop.Secret.Prompt')
	def Prompt(self, window_id):
		if self.action:
			self.result = self.action()
		GLib.timeout_add(self.delay * 1000, self._complete)

	@dbus.service.method('org.freedesktop.Secret.Prompt')
	def Dismiss(self):
		self._complete()

	@dbus.service.signal(dbus_interface='org.freedesktop.Secret.Prompt', signature='bv')
	def Completed(self, dismiss, result):
		pass


class SecretSession(dbus.service.Object):
	def __init__(self, service, sender, algorithm, key):
		self.sender = sender
		self.service = service
		self.algorithm = algorithm
		self.key = key
		self.path = "/org/freedesktop/secrets/sessions/%s" % next_identifier('s')
		dbus.service.Object.__init__(self, service.bus, self.path)
		service.add_session(self)
		objects[self.path] = self

	def encode_secret(self, secret, content_type):
		(params, data) = self.algorithm.encrypt(self.key, secret)
		# print "   mock iv: ", hex_encode(params)
		# print " mock ciph: ", hex_encode(data)
		return dbus.Struct((dbus.ObjectPath(self.path), dbus.ByteArray(params),
		                    dbus.ByteArray(data), dbus.String(content_type)),
		                   signature="oayays")

	def decode_secret(self, value):
		plain = self.algorithm.decrypt(self.key, value[1], value[2])
		return (plain, value[3])

	@dbus.service.method('org.freedesktop.Secret.Session')
	def Close(self):
		self.remove_from_connection()
		self.service.remove_session(self)


class SecretItem(dbus.service.Object):
	SUPPORTS_MULTIPLE_OBJECT_PATHS = True

	def __init__(self, collection, identifier=None, label="Item", attributes={ },
	             secret="", confirm=False, content_type="text/plain", type=None):
		if identifier is None:
			identifier = next_identifier()
		identifier = encode_identifier(identifier)
		self.collection = collection
		self.identifier = identifier
		self.label = label or "Unnamed item"
		self.secret = secret.encode('ascii') if isinstance(secret, str) else secret
		self.type = type or "org.freedesktop.Secret.Generic"
		self.attributes = attributes
		self.content_type = content_type
		self.path = "%s/%s" % (collection.path, identifier)
		self.confirm = confirm
		self.created = self.modified = time.time()
		dbus.service.Object.__init__(self, collection.service.bus, self.path)
		self.collection.add_item(self)
		objects[self.path] = self

	def add_alias(self, name):
		path = "%s/%s" % (alias_path(name), self.identifier)
		objects[path] = self
		self.add_to_connection(self.connection, path)

	def remove_alias(self, name):
		path = "%s/%s" % (alias_path(name), self.identifier)
		del objects[path]
		self.remove_from_connection(self.connection, path)

	def match_attributes(self, attributes):
		for (key, value) in attributes.items():
			if not self.attributes.get(key) == value:
				return False
		return True

	def get_locked(self):
		return self.collection.locked

	def perform_xlock(self, lock):
		return self.collection.perform_xlock(lock)

	def perform_delete(self):
		self.collection.remove_item(self)
		del objects[self.path]
		self.remove_from_connection()

	@dbus.service.method('org.freedesktop.Secret.Item', sender_keyword='sender')
	def GetSecret(self, session_path, sender=None):
		session = objects.get(session_path, None)
		if not session or session.sender != sender:
			raise InvalidArgs("session invalid: %s" % session_path)
		if self.get_locked():
			raise IsLocked("secret is locked: %s" % self.path)
		return session.encode_secret(self.secret, self.content_type)

	@dbus.service.method('org.freedesktop.Secret.Item', sender_keyword='sender', byte_arrays=True)
	def SetSecret(self, secret, sender=None):
		session = objects.get(secret[0], None)
		if not session or session.sender != sender:
			raise InvalidArgs("session invalid: %s" % secret[0])
		if self.get_locked():
			raise IsLocked("secret is locked: %s" % self.path)
		(self.secret, self.content_type) = session.decode_secret(secret)

	@dbus.service.method('org.freedesktop.Secret.Item', sender_keyword='sender')
	def Delete(self, sender=None):
		item = self
		def prompt_callback():
			item.perform_delete()
			return dbus.String("", variant_level=1)
		if self.confirm:
			prompt = SecretPrompt(self.collection.service, sender,
			                      dismiss=False, action=prompt_callback)
			return dbus.ObjectPath(prompt.path)
		else:
			self.perform_delete()
			return dbus.ObjectPath("/")

	@dbus.service.method(dbus.PROPERTIES_IFACE, in_signature='ss', out_signature='v')
	def Get(self, interface_name, property_name):
		return self.GetAll(interface_name)[property_name]

	@dbus.service.method(dbus.PROPERTIES_IFACE, in_signature='s', out_signature='a{sv}')
	def GetAll(self, interface_name):
		if interface_name == 'org.freedesktop.Secret.Item':
			return {
				'Locked': self.get_locked(),
				'Attributes': dbus.Dictionary(self.attributes, signature='ss', variant_level=1),
				'Label': self.label,
				'Created': dbus.UInt64(self.created),
				'Modified': dbus.UInt64(self.modified),

				# For compatibility with libgnome-keyring, not part of spec
				'Type': self.type
			}
		else:
			raise InvalidArgs('Unknown %s interface' % interface_name)

	@dbus.service.method(dbus.PROPERTIES_IFACE, in_signature='ssv')
	def Set(self, interface_name, property_name, new_value):
		if interface_name != 'org.freedesktop.Secret.Item':
			raise InvalidArgs('Unknown %s interface' % interface_name)
		if property_name == "Label":
			self.label = str(new_value)
		elif property_name == "Attributes":
			self.attributes = dict(new_value)
		# For compatibility with libgnome-keyring, not part of spec
		elif property_name == "Type":
			self.type = str(new_value)
		else:
			raise InvalidArgs('Not writable %s property' % property_name)
		self.PropertiesChanged(interface_name, { property_name: new_value }, [])

	@dbus.service.signal(dbus.PROPERTIES_IFACE, signature='sa{sv}as')
	def PropertiesChanged(self, interface_name, changed_properties, invalidated_properties):
		self.modified = time.time()


class SecretCollection(dbus.service.Object):
	SUPPORTS_MULTIPLE_OBJECT_PATHS = True

	def __init__(self, service, identifier=None, label="Collection", locked=False,
	             confirm=False, master=None):
		if identifier is None:
			identifier = next_identifier(label)
		identifier = encode_identifier(identifier)
		self.service = service
		self.identifier = identifier
		self.label = label or "Unnamed collection"
		self.locked = locked
		self.items = { }
		self.confirm = confirm
		self.master = None
		self.created = self.modified = time.time()
		self.aliased = set()
		self.path = "%s%s" % (COLLECTION_PREFIX, identifier)
		dbus.service.Object.__init__(self, service.bus, self.path)
		self.service.add_collection(self)
		objects[self.path] = self

	def add_item(self, item):
		self.items[item.path] = item
		for alias in self.aliased:
			item.add_alias(alias)

	def remove_item(self, item):
		for alias in self.aliased:
			item.remove_alias(alias)
		del self.items[item.path]

	def add_alias(self, name):
		if name in self.aliased:
			return
		self.aliased.add(name)
		for item in self.items.values():
			item.add_alias(name)
		path = alias_path(name)
		objects[path] = self
		self.add_to_connection(self.connection, path)

	def remove_alias(self, name):
		if name not in self.aliased:
			return
		path = alias_path(name)
		self.aliased.remove(name)
		del objects[path]
		self.remove_from_connection(self.connection, path)
		for item in self.items.values():
			item.remove_alias(name)

	def search_items(self, attributes):
		results = []
		for item in self.items.values():
			if item.match_attributes(attributes):
				results.append(item)
		return results

	def get_locked(self):
		return self.locked

	def perform_xlock(self, lock):
		self.locked = lock
		for item in self.items.values():
			self.PropertiesChanged('org.freedesktop.Secret.Item', { "Locked" : lock }, [])
		self.PropertiesChanged('org.freedesktop.Secret.Collection', { "Locked" : lock }, [])

	def perform_delete(self):
		for item in list(self.items.values()):
			item.perform_delete()
		del objects[self.path]
		self.service.remove_collection(self)
		for alias in list(self.aliased):
			self.remove_alias(alias)
		self.remove_from_connection()

	@dbus.service.method('org.freedesktop.Secret.Collection', byte_arrays=True, sender_keyword='sender')
	def CreateItem(self, properties, value, replace, sender=None):
		session_path = value[0]
		session = objects.get(session_path, None)
		if not session or session.sender != sender:
			raise InvalidArgs("session invalid: %s" % session_path)
		if self.locked:
			raise IsLocked("collection is locked: %s" % self.path)

		attributes = properties.get("org.freedesktop.Secret.Item.Attributes", { })
		label = properties.get("org.freedesktop.Secret.Item.Label", None)
		(secret, content_type) = session.decode_secret(value)
		item = None

		# This is done for compatibility with libgnome-keyring, not part of spec
		type = properties.get("org.freedesktop.Secret.Item.Type", None)

		if replace:
			items = self.search_items(attributes)
			if items:
				item = items[0]
		if item is None:
			item = SecretItem(self, next_identifier(), label, attributes, type=type,
			                  secret=secret, confirm=False, content_type=content_type)
		else:
			item.label = label
			item.type = type
			item.secret = secret
			item.attributes = attributes
			item.content_type = content_type
		return (dbus.ObjectPath(item.path), dbus.ObjectPath("/"))

	@dbus.service.method('org.freedesktop.Secret.Collection')
	def SearchItems(self, attributes):
		items = self.search_items(attributes)
		return (dbus.Array([item.path for item in items], "o"))

	@dbus.service.method('org.freedesktop.Secret.Collection', sender_keyword='sender')
	def Delete(self, sender=None):
		collection = self
		def prompt_callback():
			collection.perform_delete()
			return dbus.String("", variant_level=1)
		if self.confirm:
			prompt = SecretPrompt(self.service, sender, dismiss=False,
			                      action=prompt_callback)
			return dbus.ObjectPath(prompt.path)
		else:
			self.perform_delete()
			return dbus.ObjectPath("/")

	@dbus.service.method(dbus.PROPERTIES_IFACE, in_signature='ss', out_signature='v')
	def Get(self, interface_name, property_name):
		return self.GetAll(interface_name)[property_name]

	@dbus.service.method(dbus.PROPERTIES_IFACE, in_signature='s', out_signature='a{sv}')
	def GetAll(self, interface_name):
		if interface_name == 'org.freedesktop.Secret.Collection':
			return {
				'Locked': self.get_locked(),
				'Label': self.label,
				'Created': dbus.UInt64(self.created),
				'Modified': dbus.UInt64(self.modified),
				'Items': dbus.Array([dbus.ObjectPath(i.path) for i in self.items.values()], signature='o', variant_level=1)
			}
		else:
			raise InvalidArgs('Unknown %s interface' % interface_name)

	@dbus.service.method(dbus.PROPERTIES_IFACE, in_signature='ssv')
	def Set(self, interface_name, property_name, new_value):
		if interface_name != 'org.freedesktop.Secret.Collection':
			raise InvalidArgs('Unknown %s interface' % interface_name)
		if property_name == "Label":
			self.label = str(new_value)
		else:
			raise InvalidArgs('Not a writable property %s' % property_name)
		self.PropertiesChanged(interface_name, { property_name: new_value }, [])

	@dbus.service.signal(dbus.PROPERTIES_IFACE, signature='sa{sv}as')
	def PropertiesChanged(self, interface_name, changed_properties, invalidated_properties):
		self.modified = time.time()


class SecretService(dbus.service.Object):

	algorithms = {
		'plain': PlainAlgorithm(),
		"dh-ietf1024-sha256-aes128-cbc-pkcs7": AesAlgorithm(),
	}

	def __init__(self):
		self.bus = dbus.SessionBus()
		dbus.service.Object.__init__(self, self.bus, '/org/freedesktop/secrets')
		self.sessions = { }
		self.prompts = { }
		self.collections = { }
		self.aliases = { }
		self.aliased = { }

		def on_name_owner_changed(owned, old_owner, new_owner):
			if not new_owner:
				for session in list(self.sessions.get(old_owner, [])):
					session.Close()

		self.bus.add_signal_receiver(on_name_owner_changed, 'NameOwnerChanged', 'org.freedesktop.DBus')

	def add_standard_objects(self):
		collection = SecretCollection(self, "english", label="Collection One", locked=False)
		SecretItem(collection, "1", label="Item One", secret="111",
		           attributes={ "number": "1", "string": "one", "even": "false", "xdg:schema": "org.mock.Schema" })
		SecretItem(collection, "2", label="Item Two", secret="222",
		           attributes={ "number": "2", "string": "two", "even": "true", "xdg:schema": "org.mock.Schema" })
		SecretItem(collection, "3", label="Item Three", secret="333",
		           attributes={ "number": "3", "string": "three", "even": "false", "xdg:schema": "org.mock.Schema" })

		self.set_alias('default', collection)

		collection = SecretCollection(self, "spanish", locked=True)
		SecretItem(collection, "10", secret="111",
		           attributes={ "number": "1", "string": "uno", "even": "false", "xdg:schema": "org.mock.Schema" })
		SecretItem(collection, "20", secret="222",
		           attributes={ "number": "2", "string": "dos", "even": "true", "xdg:schema": "org.mock.Schema" })
		SecretItem(collection, "30", secret="3333",
		           attributes={ "number": "3", "string": "tres", "even": "false", "xdg:schema": "org.mock.Schema" })

		collection = SecretCollection(self, "german", locked=True)
		SecretItem(collection, "300", secret="333",
		           attributes={ "number": "3", "string": "drei", "prime": "true", "xdg:schema": "org.mock.Primes" })
		SecretItem(collection, "400", secret="444",
		           attributes={ "number": "4", "string": "vier", "prime": "false", "xdg:schema": "org.mock.Primes" })
		SecretItem(collection, "500", secret="555",
		           attributes={ "number": "5", "string": "fuenf", "prime": "true", "xdg:schema": "org.mock.Primes" })
		SecretItem(collection, "600", secret="666",
		           attributes={ "number": "6", "string": "sechs", "prime": "false", "xdg:schema": "org.mock.Primes" })

		collection = SecretCollection(self, "empty", locked=False)
		collection = SecretCollection(self, "session", label="Session Keyring", locked=False)

		self.set_alias('session', collection)

	def listen(self):
		loop = GLib.MainLoop()
		name = self.bus.get_unique_name()
		if not name:
			raise NameError("No unique name available")
		print(name, flush=True)
		loop.run()

	def add_session(self, session):
		if session.sender not in self.sessions:
			self.sessions[session.sender] = []
		self.sessions[session.sender].append(session)

	def remove_session(self, session):
		self.sessions[session.sender].remove(session)

	def add_collection(self, collection):
		self.collections[collection.path] = collection

	def remove_collection(self, collection):
		for alias in list(collection.aliased):
			self.remove_alias(alias)
		del self.collections[collection.path]

	def set_alias(self, name, collection):
		self.remove_alias(name)
		if collection:
			collection.add_alias(name)
			self.aliases[name] = collection
		elif name in self.aliases:
			del self.aliases[name]

	def remove_alias(self, name):
		if name in self.aliases:
			collection = self.aliases[name]
			collection.remove_alias(name)
			del self.aliases[name]

	def add_prompt(self, prompt):
		if prompt.sender not in self.prompts:
			self.prompts[prompt.sender] = []
		self.prompts[prompt.sender].append(prompt)

	def remove_prompt (self, prompt):
		self.prompts[prompt.sender].remove(prompt)

	def find_item(self, object):
		parts = object.rsplit("/", 1)
		if len(parts) == 2 and parts[0] in self.collections:
			return self.collections[parts[0]].get(parts[1], None)
		return None

	@dbus.service.method('org.freedesktop.Secret.Service', sender_keyword='sender')
	def Lock(self, paths, lock=True, sender=None):
		locked = []
		prompts = []
		for path in paths:
			if path not in objects:
				continue
			object = objects[path]
			if object.get_locked() == lock:
				locked.append(path)
			elif not object.confirm:
				object.perform_xlock(lock)
				locked.append(path)
			else:
				prompts.append(object)
		def prompt_callback():
			for object in prompts:
				object.perform_xlock(lock)
			return dbus.Array([o.path for o in prompts], signature='o')
		locked = dbus.Array(locked, signature='o')
		if prompts:
			prompt = SecretPrompt(self, sender, dismiss=False, action=prompt_callback)
			return (locked, dbus.ObjectPath(prompt.path))
		else:
			return (locked, dbus.ObjectPath("/"))

	@dbus.service.method('org.freedesktop.Secret.Service', sender_keyword='sender')
	def Unlock(self, paths, sender=None):
		return self.Lock(paths, lock=False, sender=sender)

	@dbus.service.method('org.freedesktop.Secret.Service', byte_arrays=True, sender_keyword='sender')
	def OpenSession(self, algorithm, param, sender=None):
		assert type(algorithm) == dbus.String

		if algorithm not in self.algorithms:
			raise NotSupported("algorithm %s is not supported" % algorithm)

		return self.algorithms[algorithm].negotiate(self, sender, param)

	@dbus.service.method('org.freedesktop.Secret.Service', sender_keyword='sender')
	def CreateCollection(self, properties, alias, sender=None):
		label = properties.get("org.freedesktop.Secret.Collection.Label", None)
		service = self
		def prompt_callback():
			collection = SecretCollection(service, None, label, locked=False, confirm=True)
			if alias:
				collection.add_alias(alias)
			return dbus.ObjectPath(collection.path, variant_level=1)
		prompt = SecretPrompt(self, sender, dismiss=False, action=prompt_callback)
		return (dbus.ObjectPath("/"), dbus.ObjectPath(prompt.path))

	@dbus.service.method('org.freedesktop.Secret.Service')
	def SearchItems(self, attributes):
		locked = [ ]
		unlocked = [ ]
		items = [ ]
		for collection in self.collections.values():
			items = collection.search_items(attributes)
			if collection.get_locked():
				locked.extend([item.path for item in items])
			else:
				unlocked.extend([item.path for item in items])
		return (dbus.Array(unlocked, "o"), dbus.Array(locked, "o"))

	@dbus.service.method('org.freedesktop.Secret.Service', sender_keyword='sender')
	def GetSecrets(self, item_paths, session_path, sender=None):
		session = objects.get(session_path, None)
		if not session or session.sender != sender:
			raise InvalidArgs("session invalid: %s" % session_path)
		results = dbus.Dictionary(signature="o(oayays)")
		for item_path in item_paths:
			item = objects.get(item_path, None)
			if item and not item.get_locked():
				results[item_path] = item.GetSecret(session_path, sender)
		return results

	@dbus.service.method('org.freedesktop.Secret.Service')
	def ReadAlias(self, name):
		if name not in self.aliases:
			return dbus.ObjectPath("/")
		return dbus.ObjectPath(self.aliases[name].path)

	@dbus.service.method('org.freedesktop.Secret.Service')
	def SetAlias(self, name, collection):
		if collection == dbus.ObjectPath("/"):
			self.set_alias(name, None)
		else:
			if collection not in self.collections:
				raise NoSuchObject("no such Collection")
			self.set_alias(name, self.collections[collection])

	@dbus.service.method(dbus.PROPERTIES_IFACE, in_signature='ss', out_signature='v')
	def Get(self, interface_name, property_name):
		return self.GetAll(interface_name)[property_name]

	@dbus.service.method(dbus.PROPERTIES_IFACE, in_signature='s', out_signature='a{sv}')
	def GetAll(self, interface_name):
		if interface_name == 'org.freedesktop.Secret.Service':
			return {
				'Collections': dbus.Array([dbus.ObjectPath(c.path) for c in self.collections.values()], signature='o', variant_level=1)
			}
		else:
			raise InvalidArgs('Unknown %s interface' % interface_name)

	@dbus.service.method(dbus.PROPERTIES_IFACE, in_signature='ssv')
	def Set(self, interface_name, property_name, new_value):
		if interface_name != 'org.freedesktop.Secret.Collection':
			raise InvalidArgs('Unknown %s interface' % interface_name)
		raise InvalidArgs('Not a writable property %s' % property_name)


def parse_options(args):
	try:
		opts, args = getopt.getopt(args, "", [])
	except getopt.GetoptError as err:
		print(str(err))
		sys.exit(2)
	for o, a in opts:
		assert False, "unhandled option"
	return args

parse_options(sys.argv[1:])
