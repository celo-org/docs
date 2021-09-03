/* libsecret - GLib wrapper for Secret Service
 *
 * Copyright 2012 Stef Walter
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation; either version 2.1 of the licence or (at
 * your option) any later version.
 *
 * See the included COPYING file for more information.
 *
 * Author: Stef Walter <stefw@gnome.org>
 */

#include "config.h"

#include "secret-schema.h"
#include "secret-schemas.h"

/**
 * SECRET_SCHEMA_NOTE: (skip)
 *
 * A predefined schema for personal passwords stored by the user in the
 * password manager. This schema has no attributes, and the items are not
 * meant to be used automatically by applications.
 *
 * When used to search for items using this schema, it will only match
 * items that have the same schema. Items stored via libgnome-keyring with the
 * <literal>GNOME_KEYRING_ITEM_NOTE</literal> item type will match.
 */

static const SecretSchema note_schema = {
	"org.gnome.keyring.Note",
	SECRET_SCHEMA_NONE,
	{
		{  NULL, 0 },
	}
};

const SecretSchema *  SECRET_SCHEMA_NOTE = &note_schema;

/**
 * SECRET_SCHEMA_COMPAT_NETWORK: (skip)
 *
 * A predefined schema that is compatible with items stored via the
 * libgnome-keyring 'network password' functions. This is meant to be used by
 * applications migrating from libgnome-keyring which stored their secrets as
 * 'network passwords'. It is not recommended that new code use this schema.
 *
 * When used to search for items using this schema, it will only match
 * items that have the same schema. Items stored via libgnome-keyring with the
 * <literal>GNOME_KEYRING_ITEM_NETWORK_PASSWORD</literal> item type will match.
 *
 * The following attributes exist in the schema:
 * <variablelist><title>Attributes:</title>
 *     <varlistentry><term><literal>user</literal>:</term>
 *         <listitem><para>The user name (string).</para></listitem></varlistentry>
 *     <varlistentry><term><literal>domain</literal>:</term>
 *         <listitem><para>The login domain or realm (string).</para></listitem></varlistentry>
 *     <varlistentry><term><literal>object</literal>:</term>
 *         <listitem><para>The object or path (string).</para></listitem></varlistentry>
 *     <varlistentry><term><literal>protocol</literal>:</term>
 *         <listitem><para>The protocol (a string like 'http').</para></listitem></varlistentry>
 *     <varlistentry><term><literal>port</literal>:</term>
 *         <listitem><para>The network port (integer).</para></listitem></varlistentry>
 *     <varlistentry><term><literal>server</literal>:</term>
 *         <listitem><para>The hostname or server (string).</para></listitem></varlistentry>
 *     <varlistentry><term><literal>authtype</literal>:</term>
 *         <listitem><para>The authentication type (string).</para></listitem></varlistentry>
 * </variablelist>
 */

static const SecretSchema network_schema = {
	"org.gnome.keyring.NetworkPassword",
	SECRET_SCHEMA_NONE,
	{
		{  "user", SECRET_SCHEMA_ATTRIBUTE_STRING },
		{  "domain", SECRET_SCHEMA_ATTRIBUTE_STRING },
		{  "object", SECRET_SCHEMA_ATTRIBUTE_STRING },
		{  "protocol", SECRET_SCHEMA_ATTRIBUTE_STRING },
		{  "port", SECRET_SCHEMA_ATTRIBUTE_INTEGER },
		{  "server", SECRET_SCHEMA_ATTRIBUTE_STRING },
		{  "authtype", SECRET_SCHEMA_ATTRIBUTE_STRING },
		{  NULL, 0 },
	}
};

const SecretSchema *  SECRET_SCHEMA_COMPAT_NETWORK = &network_schema;

/**
 * secret_get_schema:
 * @type: type of schema to get
 *
 * Get a secret storage schema of the given @type.
 *
 * C code may access the schemas (such as %SECRET_SCHEMA_NOTE) directly, but
 * language bindings cannot, and must use this accessor.
 *
 * Returns: (transfer none): schema type
 * Since: 0.18.6
 */
const SecretSchema *
secret_get_schema (SecretSchemaType type)
{
	switch (type) {
	case SECRET_SCHEMA_TYPE_NOTE:
		return SECRET_SCHEMA_NOTE;
	case SECRET_SCHEMA_TYPE_COMPAT_NETWORK:
		return SECRET_SCHEMA_COMPAT_NETWORK;
	default:
		g_assert_not_reached ();
	}
}
