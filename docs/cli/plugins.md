`celocli plugins`
=================

List installed plugins.

* [`celocli plugins`](#celocli-plugins)
* [`celocli plugins:install PLUGIN...`](#celocli-pluginsinstall-plugin)
* [`celocli plugins:inspect PLUGIN...`](#celocli-pluginsinspect-plugin)
* [`celocli plugins:install PLUGIN...`](#celocli-pluginsinstall-plugin-1)
* [`celocli plugins:link PLUGIN`](#celocli-pluginslink-plugin)
* [`celocli plugins:uninstall PLUGIN...`](#celocli-pluginsuninstall-plugin)
* [`celocli plugins:reset`](#celocli-pluginsreset)
* [`celocli plugins:uninstall PLUGIN...`](#celocli-pluginsuninstall-plugin-1)
* [`celocli plugins:uninstall PLUGIN...`](#celocli-pluginsuninstall-plugin-2)
* [`celocli plugins:update`](#celocli-pluginsupdate)

## `celocli plugins`

List installed plugins.

```
USAGE
  $ celocli plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ celocli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/index.ts)_

## `celocli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ celocli plugins:add plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed
  plugin with a 'hello' command will override the core plugin implementation. This is
  useful if a user needs to update core plugin functionality in the CLI without the need
  to patch and update the whole CLI.


ALIASES
  $ celocli plugins:add

EXAMPLES
  $ celocli plugins:add myplugin 

  $ celocli plugins:add https://github.com/someuser/someplugin

  $ celocli plugins:add someuser/someplugin
```

## `celocli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ celocli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ celocli plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/inspect.ts)_

## `celocli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ celocli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed
  plugin with a 'hello' command will override the core plugin implementation. This is
  useful if a user needs to update core plugin functionality in the CLI without the need
  to patch and update the whole CLI.


ALIASES
  $ celocli plugins:add

EXAMPLES
  $ celocli plugins:install myplugin 

  $ celocli plugins:install https://github.com/someuser/someplugin

  $ celocli plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/install.ts)_

## `celocli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ celocli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command,
  installing a linked plugin with a 'hello' command will override the user-installed or
  core plugin implementation. This is useful for development work.


EXAMPLES
  $ celocli plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/link.ts)_

## `celocli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ celocli plugins:remove plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ celocli plugins:unlink
  $ celocli plugins:remove

EXAMPLES
  $ celocli plugins:remove myplugin
```

## `celocli plugins:reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ celocli plugins:reset
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/reset.ts)_

## `celocli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ celocli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ celocli plugins:unlink
  $ celocli plugins:remove

EXAMPLES
  $ celocli plugins:uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/uninstall.ts)_

## `celocli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ celocli plugins:unlink plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ celocli plugins:unlink
  $ celocli plugins:remove

EXAMPLES
  $ celocli plugins:unlink myplugin
```

## `celocli plugins:update`

Update installed plugins.

```
USAGE
  $ celocli plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.17/src/commands/plugins/update.ts)_
