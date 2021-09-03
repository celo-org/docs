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

var password = Secret.password_lookup_sync(
  STORE_SCHEMA,
  {number: "1", even: "false"},
  null
);
assertEquals("111", password);

var password = Secret.password_lookup_sync(
  STORE_SCHEMA,
  {number: "5", even: "true"},
  null
);
assertEquals(null, password);

/* Asynchronous */

var loop = new GLib.MainLoop(null, false);

Secret.password_lookup(
  STORE_SCHEMA,
  {number: "2", string: "two"},
  null,
  function (source, result) {
    loop.quit();
    var password = Secret.password_lookup_finish(result);
    assertEquals("222", password);
  }
);

loop.run();

Secret.password_lookup(
  STORE_SCHEMA,
  {number: "7", string: "five"},
  null,
  function (source, result) {
    loop.quit();
    var password = Secret.password_lookup_finish(result);
    assertEquals(null, password);
  }
);

loop.run();

Secret.Service.disconnect();
Mock.stop();
