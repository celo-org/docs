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

private void test_read_alias () {
	try {
		var service = Secret.Service.get_sync(Secret.ServiceFlags.NONE);
		var path = service.read_alias_dbus_path_sync("default", null);
		GLib.assert (path != null);
	} catch ( GLib.Error e ) {
		GLib.error (e.message);
	}
}

private static int main (string[] args) {
	GLib.Test.init (ref args);

	try {
		MockService.start ("mock-service-normal.py");
	} catch ( GLib.Error e ) {
		GLib.error ("Unable to start mock service: %s", e.message);
	}

	GLib.Test.add_data_func ("/vala/unstable/read-alias", test_read_alias);

	var res = GLib.Test.run ();
	Secret.Service.disconnect ();
	MockService.stop ();
	return res;
}
