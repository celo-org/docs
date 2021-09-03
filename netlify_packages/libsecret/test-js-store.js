/*
 * Copyright 2012 Red Hat Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation; either version 2.1 of the licence or (at
 * your option) any later version.
 *
 * See the included COPYING file for more information.
 */

const Mock = imports.gi.MockService;
const Secret = imports.gi.Secret;
const GLib = imports.gi.GLib;

const JsUnit = imports.jsUnit;
const assertEquals = JsUnit.assertEquals;
const assertRaises = JsUnit.assertRaises;
const assertTrue = JsUnit.assertTrue;

Mock.start("mock-service-normal.py");

const STORE_SCHEMA = new Secret.Schema(
  "org.mock.Schema",
  Secret.SchemaFlags.NONE,
  {
    number: Secret.SchemaAttributeType.INTEGER,
    string: Secret.SchemaAttributeType.STRING,
    even: Secret.SchemaAttributeType.BOOLEAN,
  }
);

/* Synchronous */

var attributes = {number: "9", string: "nine", even: "false"};

var password = Secret.password_lookup_sync(STORE_SCHEMA, attributes, null);
assertEquals(null, password);

var stored = Secret.password_store_sync(
  STORE_SCHEMA,
  attributes,
  Secret.COLLECTION_DEFAULT,
  "The number nine",
  "999",
  null
);
assertEquals(true, stored);

var password = Secret.password_lookup_sync(STORE_SCHEMA, attributes, null);
assertEquals("999", password);

/* Asynchronous */

var attributes = {number: "888", string: "eight", even: "true"};

var password = Secret.password_lookup_sync(STORE_SCHEMA, attributes, null);
assertEquals(null, password);

var loop = new GLib.MainLoop(null, false);

Secret.password_store(
  STORE_SCHEMA,
  attributes,
  null,
  "The number eight",
  "888",
  null,
  function (source, result) {
    loop.quit();
    var stored = Secret.password_store_finish(result);
    assertEquals(true, stored);
  }
);

loop.run();

var password = Secret.password_lookup_sync(STORE_SCHEMA, attributes, null);
assertEquals("888", password);

Secret.Service.disconnect();
Mock.stop();
