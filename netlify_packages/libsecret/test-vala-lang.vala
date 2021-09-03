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

Secret.Schema schema;
Secret.Schema no_name_schema;

private void test_lookup_sync () {
  try {
    string? password = Secret.password_lookup_sync (schema, null, "even", false, "string", "one", "number", 1);
    GLib.assert (password == "111");
  } catch ( GLib.Error e ) {
    GLib.error (e.message);
  }
}

public async void test_lookup_async_ex () {
  try {
    string? password = yield Secret.password_lookup (schema, null, "even", false, "string", "one", "number", 1);
    GLib.assert (password == "111");
  } catch ( GLib.Error e ) {
    GLib.error (e.message);
  }
}

private void test_lookup_async () {
  var loop = new GLib.MainLoop ();
  test_lookup_async_ex.begin ((obj, async_res) => {
      loop.quit ();
    });
  loop.run ();
}

private void test_lookup_no_name () {
  try {
    string? password = Secret.password_lookup_sync (schema, null, "number", 5);
    GLib.assert (password == null);

    password = Secret.password_lookup_sync (no_name_schema, null, "number", 5);
    GLib.assert (password == "555");
  } catch ( GLib.Error e ) {
    GLib.error (e.message);
  }
}

private void test_store_sync () {
  try {
    var attributes = new GLib.HashTable<string,string> (GLib.str_hash, GLib.str_equal);
    attributes["even"] = "false";
    attributes["string"] = "nine";
    attributes["number"] = "9";

    string? password = Secret.password_lookupv_sync (schema, attributes);
    GLib.assert (password == null);

    bool stored = Secret.password_storev_sync (schema, attributes, Secret.COLLECTION_DEFAULT, "The number ", "999");
    GLib.assert (stored);

    password = Secret.password_lookupv_sync (schema, attributes);
    GLib.assert (password == "999");
  } catch ( GLib.Error e ) {
    GLib.error (e.message);
  }
}

private async void test_store_async_ex () {
  var attributes = new GLib.HashTable<string,string> (GLib.str_hash, GLib.str_equal);
  attributes["even"] = "true";
  attributes["string"] = "eight";
  attributes["number"] = "8";

  try {
    string? password = yield Secret.password_lookupv (schema, attributes, null);
    GLib.assert (password == null);

    bool stored = yield Secret.password_storev (schema, attributes, Secret.COLLECTION_DEFAULT, "The number nine", "999", null);
    GLib.assert (stored);

    password = yield Secret.password_lookupv (schema, attributes, null);
    GLib.assert (password == "999");
  } catch ( GLib.Error e ) {
    GLib.error (e.message);
  }
}

private void test_store_async () {
  var loop = new GLib.MainLoop ();
  test_store_async_ex.begin ((obj, async_res) => {
      loop.quit ();
    });
  loop.run ();
}

private void test_clear_sync () {
  try {
    var attributes = new GLib.HashTable<string,string> (GLib.str_hash, GLib.str_equal);
    attributes["even"] = "false";
    attributes["string"] = "nine";
    attributes["number"] = "9";

    string? password = Secret.password_lookupv_sync (schema, attributes);
    GLib.assert (password == "999");

    bool removed = Secret.password_clearv_sync (schema, attributes, null);
    GLib.assert (removed);

    password = Secret.password_lookupv_sync (schema, attributes);
    GLib.assert (password == null);
  } catch ( GLib.Error e ) {
    GLib.error (e.message);
  }
}

private async void test_clear_async_ex () {
  var attributes = new GLib.HashTable<string,string> (GLib.str_hash, GLib.str_equal);
  attributes["even"] = "true";
  attributes["string"] = "eight";
  attributes["number"] = "8";

  try {
    string? password = yield Secret.password_lookupv (schema, attributes, null);
    GLib.assert (password == "999");

    bool removed = yield Secret.password_clearv (schema, attributes, null);
    GLib.assert (removed);

    password = yield Secret.password_lookupv (schema, attributes, null);
    GLib.assert (password == null);
  } catch ( GLib.Error e ) {
    GLib.error (e.message);
  }
}

private void test_clear_async () {
  var loop = new GLib.MainLoop ();
  test_clear_async_ex.begin ((obj, async_res) => {
      loop.quit ();
    });
  loop.run ();
}

private static int main (string[] args) {
  GLib.Test.init (ref args);

  try {
    MockService.start ("mock-service-normal.py");
  } catch ( GLib.Error e ) {
    GLib.error ("Unable to start mock service: %s", e.message);
  }

  {
    schema = new Secret.Schema ("org.mock.Schema", Secret.SchemaFlags.NONE,
                                "number", Secret.SchemaAttributeType.INTEGER,
                                "string", Secret.SchemaAttributeType.STRING,
                                "even", Secret.SchemaAttributeType.BOOLEAN);

    no_name_schema = new Secret.Schema ("unused.Schema.Name", Secret.SchemaFlags.DONT_MATCH_NAME,
                                        "number", Secret.SchemaAttributeType.INTEGER,
                                        "string", Secret.SchemaAttributeType.STRING);
  }

  GLib.Test.add_data_func ("/vala/lookup/sync", test_lookup_sync);
  GLib.Test.add_data_func ("/vala/lookup/async", test_lookup_async);
  GLib.Test.add_data_func ("/vala/lookup/no-name", test_lookup_no_name);
  GLib.Test.add_data_func ("/vala/store/sync", test_store_sync);
  GLib.Test.add_data_func ("/vala/store/async", test_store_async);
  GLib.Test.add_data_func ("/vala/clear/sync", test_clear_sync);
  GLib.Test.add_data_func ("/vala/clear/async", test_clear_async);

  var res = GLib.Test.run ();

  Secret.Service.disconnect ();
  MockService.stop ();
  schema = null;

  return res;
}
