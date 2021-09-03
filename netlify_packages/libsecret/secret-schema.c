/* libsecret - GLib wrapper for Secret Service
 *
 * Copyright 2011 Collabora Ltd.
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

#include "secret-password.h"
#include "secret-private.h"
#include "secret-value.h"

#include "libsecret/secret-enum-types.h"

#include "egg/egg-secure-memory.h"

/**
 * SECTION:secret-schema
 * @title: SecretSchema
 * @short_description: Schema for defining which attributes are on items
 *
 * Each password is associated with a set of attributes. Attribute values can
 * be either strings, integers or booleans.
 *
 * The names and types of allowed attributes for a given password are defined
 * with a schema.
 *
 * Additional schemas can be defined via the %SecretSchema structure like this:
 *
 * <informalexample><programlisting language="c">
 * /<!-- -->* in a header: *<!-- -->/
 *
 * const SecretSchema * example_get_schema (void) G_GNUC_CONST;
 *
 * #define EXAMPLE_SCHEMA  example_get_schema ()
 *
 *
 * /<!-- -->* in a .c file: *<!-- -->/
 *
 * const SecretSchema *
 * example_get_schema (void)
 * {
 * 	static const SecretSchema the_schema = {
 * 		"org.example.Password", SECRET_SCHEMA_NONE,
 * 		{
 * 			{  "number", SECRET_SCHEMA_ATTRIBUTE_INTEGER },
 * 			{  "string", SECRET_SCHEMA_ATTRIBUTE_STRING },
 * 			{  "even", SECRET_SCHEMA_ATTRIBUTE_BOOLEAN },
 * 			{  NULL, 0 },
 * 		}
 * 	};
 * 	return &the_schema;
 * }
 * </programlisting></informalexample>
 *
 * Stability: Stable
 */

/**
 * SecretSchema:
 * @name: the dotted name of the schema
 * @flags: flags for the schema
 * @attributes: the attribute names and types of those attributes
 *
 * Represents a set of attributes that are stored with an item. These schemas
 * are used for interoperability between various services storing the same types
 * of items.
 *
 * Each schema has a name like "org.gnome.keyring.NetworkPassword", and defines
 * a set of attributes, and types (string, integer, boolean) for those attributes.
 *
 * Attributes are stored as strings in the Secret Service, and the attribute
 * types simply define standard ways to store integer and boolean values as strings.
 * Attributes are represented in libsecret via a #GHashTable with string keys and
 * values. Even for values that defined as an integer or boolean in the schema,
 * the attribute values in the #GHashTable are strings. Boolean values are stored
 * as the strings 'true' and 'false'. Integer values are stored in decimal, with
 * a preceding negative sign for negative integers.
 *
 * Schemas are handled entirely on the client side by this library. The name of the
 * schema is automatically stored as an attribute on the item.
 *
 * Normally when looking up passwords only those with matching schema names are
 * returned. If the schema @flags contain the %SECRET_SCHEMA_DONT_MATCH_NAME flag,
 * then lookups will not check that the schema name matches that on the item, only
 * the schema's attributes are matched. This is useful when you are looking up items
 * that are not stored by the libsecret library. Other libraries such as libgnome-keyring
 * don't store the schema name.
 *
 * Stability: Stable
 */

/**
 * SecretSchemaFlags:
 * @SECRET_SCHEMA_NONE: no flags for the schema
 * @SECRET_SCHEMA_DONT_MATCH_NAME: don't match the schema name when looking up or
 *                                 removing passwords
 *
 * Flags for a #SecretSchema definition.
 */

/**
 * SecretSchemaAttribute:
 * @name: name of the attribute
 * @type: the type of the attribute
 *
 * An attribute in a #SecretSchema.
 */

/**
 * SecretSchemaAttributeType:
 * @SECRET_SCHEMA_ATTRIBUTE_BOOLEAN: a boolean attribute, stored as 'true' or 'false'
 * @SECRET_SCHEMA_ATTRIBUTE_INTEGER: an integer attribute, stored as a decimal
 * @SECRET_SCHEMA_ATTRIBUTE_STRING: a utf-8 string attribute
 *
 * The type of an attribute in a #SecretSchema. Attributes are stored as strings
 * in the Secret Service, and the attribute types simply define standard ways
 * to store integer and boolean values as strings.
 */

static SecretSchemaAttribute *
schema_attribute_copy (SecretSchemaAttribute *attribute)
{
	SecretSchemaAttribute *copy;

	copy = g_slice_new0 (SecretSchemaAttribute);
	copy->name = g_strdup (attribute->name);
	copy->type = attribute->type;

	return copy;
}

static void
schema_attribute_free (SecretSchemaAttribute *attribute)
{
	g_free ((gchar *)attribute->name);
	g_slice_free (SecretSchemaAttribute, attribute);
}

G_DEFINE_BOXED_TYPE (SecretSchemaAttribute, secret_schema_attribute,
                     schema_attribute_copy, schema_attribute_free);

/**
 * secret_schema_newv: (rename-to secret_schema_new)
 * @name: the dotted name of the schema
 * @flags: the flags for the schema
 * @attribute_names_and_types: (element-type utf8 Secret.SchemaAttributeType): the attribute names and types of those attributes
 *
 * Using this function is not normally necessary from C code. This is useful
 * for constructing #SecretSchema structures in bindings.
 *
 * A schema represents a set of attributes that are stored with an item. These
 * schemas are used for interoperability between various services storing the
 * same types of items.
 *
 * Each schema has an @name like "org.gnome.keyring.NetworkPassword", and
 * defines a set of attributes names, and types (string, integer, boolean) for
 * those attributes.
 *
 * Each key in the @attributes table should be a attribute name strings, and
 * the values in the table should be integers from the #SecretSchemaAttributeType
 * enumeration, representing the attribute type for each attribute name.
 *
 * Normally when looking up passwords only those with matching schema names are
 * returned. If the schema @flags contain the %SECRET_SCHEMA_DONT_MATCH_NAME flag,
 * then lookups will not check that the schema name matches that on the item, only
 * the schema's attributes are matched. This is useful when you are looking up items
 * that are not stored by the libsecret library. Other libraries such as libgnome-keyring
 * don't store the schema name.
 *
 * Returns: (transfer full): the new schema, which should be unreferenced with
 *          secret_schema_unref() when done
 */
SecretSchema *
secret_schema_newv (const gchar *name,
                    SecretSchemaFlags flags,
                    GHashTable *attribute_names_and_types)
{
	SecretSchema *schema;
	GHashTableIter iter;
	GEnumClass *enumc;
	gpointer value;
	gpointer key;
	gint type;
	gint ind = 0;

	g_return_val_if_fail (name != NULL, NULL);
	g_return_val_if_fail (attribute_names_and_types != NULL, NULL);

	schema = g_slice_new0 (SecretSchema);
	schema->name = g_strdup (name);
	schema->flags = flags;
	schema->reserved = 1;

	if (attribute_names_and_types) {
		g_hash_table_iter_init (&iter, attribute_names_and_types);
		while (g_hash_table_iter_next (&iter, &key, &value)) {

			if (ind >= G_N_ELEMENTS (schema->attributes)) {
				g_warning ("too many attributes for schema, max %d",
				           (gint) G_N_ELEMENTS (schema->attributes));
				break;
			}

			type = GPOINTER_TO_INT (value);

			enumc = G_ENUM_CLASS (g_type_class_ref (SECRET_TYPE_SCHEMA_ATTRIBUTE_TYPE));
			if (!g_enum_get_value (enumc, type)) {
				g_warning ("invalid type for attribute %s", (gchar *)key);
				type = -1;
			}

			g_type_class_unref (enumc);

			if (type >= 0) {
				schema->attributes[ind].name = g_strdup (key);
				schema->attributes[ind].type = type;
			}

			ind++;
		}
	}

	return schema;
}

/**
 * secret_schema_new: (skip)
 * @name: the dotted name of the schema
 * @flags: the flags for the schema
 * @...: the attribute names and types, terminated with %NULL
 *
 * Using this function is not normally necessary from C code.
 *
 * A schema represents a set of attributes that are stored with an item. These
 * schemas are used for interoperability between various services storing the
 * same types of items.
 *
 * Each schema has an @name like "org.gnome.keyring.NetworkPassword", and
 * defines a set of attributes names, and types (string, integer, boolean) for
 * those attributes.
 *
 * The variable argument list should contain pairs of a) The attribute name as
 * a null-terminated string, followed by b) integers from the
 * #SecretSchemaAttributeType enumeration, representing the attribute type for
 * each attribute name. The list of attribtues should be terminated with a %NULL.
 *
 * Normally when looking up passwords only those with matching schema names are
 * returned. If the schema @flags contain the %SECRET_SCHEMA_DONT_MATCH_NAME flag,
 * then lookups will not check that the schema name matches that on the item, only
 * the schema's attributes are matched. This is useful when you are looking up items
 * that are not stored by the libsecret library. Other libraries such as libgnome-keyring
 * don't store the schema name.
 *
 * Returns: (transfer full): the new schema, which should be unreferenced with
 *          secret_schema_unref() when done
 */
SecretSchema *
secret_schema_new (const gchar *name,
                   SecretSchemaFlags flags,
                   ...)
{
	SecretSchemaAttributeType type;
	GHashTable *attributes;
	SecretSchema *schema;
	const gchar *attribute;
	va_list va;

	g_return_val_if_fail (name != NULL, NULL);

	va_start (va, flags);
	attributes = g_hash_table_new (g_str_hash, g_str_equal);

	while ((attribute = va_arg (va, const gchar *)) != NULL) {
		type = va_arg (va, SecretSchemaAttributeType);
		g_hash_table_insert (attributes, (gpointer *)attribute,
		                     GINT_TO_POINTER (type));
	}

	schema = secret_schema_newv (name, flags, attributes);

	g_hash_table_unref (attributes);
	va_end (va);

	return schema;
}

/**
 * secret_schema_ref:
 * @schema: the schema to reference
 *
 * Adds a reference to the #SecretSchema.
 *
 * It is not normally necessary to call this function from C code, and is
 * mainly present for the sake of bindings. If the @schema was statically
 * allocated, then this function will copy the schema.
 *
 * Returns: (transfer full): the referenced schema, which should be later
 *          unreferenced with secret_schema_unref()
 */
SecretSchema *
secret_schema_ref (SecretSchema *schema)
{
	SecretSchema *result;
	gint i;

	g_return_val_if_fail (schema != NULL, NULL);

	/* If it's static, then copy it */
	if (g_atomic_int_get (&schema->reserved) > 0) {
		g_atomic_int_inc (&schema->reserved);
		result = schema;
	} else {
		result = g_slice_new0 (SecretSchema);
		result->reserved = 1;
		result->name = g_strdup (schema->name);

		for (i = 0; i < G_N_ELEMENTS (schema->attributes); i++) {
			result->attributes[i].name = g_strdup (schema->attributes[i].name);
			result->attributes[i].type = schema->attributes[i].type;
		}
	}

	return result;
}

const SecretSchema *
_secret_schema_ref_if_nonstatic (const SecretSchema *schema)
{
	if (schema && g_atomic_int_get (&schema->reserved) > 0)
		secret_schema_ref ((SecretSchema *)schema);

	return schema;
}

/**
 * secret_schema_unref:
 * @schema: the schema to reference
 *
 * Releases a reference to the #SecretSchema. If the last reference is
 * released then the schema will be freed.
 *
 * It is not normally necessary to call this function from C code, and is
 * mainly present for the sake of bindings. It is an error to call this for
 * a @schema that was statically allocated.
 */
void
secret_schema_unref (SecretSchema *schema)
{
	g_return_if_fail (schema != NULL);
	/* statically-allocated or invalid SecretSchema */
	g_return_if_fail (g_atomic_int_get (&schema->reserved) > 0);

	if (g_atomic_int_dec_and_test (&schema->reserved)) {
		gint i;
		g_free ((gpointer)schema->name);
		for (i = 0; i < G_N_ELEMENTS (schema->attributes); i++)
			g_free ((gpointer)schema->attributes[i].name);
		g_slice_free (SecretSchema, schema);
	}
}

void
_secret_schema_unref_if_nonstatic (const SecretSchema *schema)
{
	if (schema && g_atomic_int_get (&schema->reserved) > 0)
		secret_schema_unref ((SecretSchema *)schema);
}

G_DEFINE_BOXED_TYPE (SecretSchema, secret_schema, secret_schema_ref, secret_schema_unref);
