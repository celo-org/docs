`celocli plugins`
=================

List installed plugins.

* [`celocli plugins`](#celocli-plugins)
* [`celocli plugins:add PLUGIN`](#celocli-pluginsadd-plugin)
* [`celocli plugins:inspect PLUGIN...`](#celocli-pluginsinspect-plugin)
* [`celocli plugins:install PLUGIN`](#celocli-pluginsinstall-plugin)
* [`celocli plugins:link PATH`](#celocli-pluginslink-path)
* [`celocli plugins:remove [PLUGIN]`](#celocli-pluginsremove-plugin)
* [`celocli plugins:reset`](#celocli-pluginsreset)
* [`celocli plugins:uninstall [PLUGIN]`](#celocli-pluginsuninstall-plugin)
* [`celocli plugins:unlink [PLUGIN]`](#celocli-pluginsunlink-plugin)
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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/index.ts)_

## `celocli plugins:add PLUGIN`

Installs a plugin into celocli.

```
USAGE
  $ celocli plugins:add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on
                 disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into celocli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the CELOCLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CELOCLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ celocli plugins:add

EXAMPLES
  Install a plugin from npm registry.

    $ celocli plugins:add myplugin

  Install a plugin from a github url.

    $ celocli plugins:add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ celocli plugins:add someuser/someplugin
```

## `celocli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ celocli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/inspect.ts)_

## `celocli plugins:install PLUGIN`

Installs a plugin into celocli.

```
USAGE
  $ celocli plugins:install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on
                 disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into celocli.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the CELOCLI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CELOCLI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ celocli plugins:add

EXAMPLES
  Install a plugin from npm registry.

    $ celocli plugins:install myplugin

  Install a plugin from a github url.

    $ celocli plugins:install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ celocli plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/install.ts)_

## `celocli plugins:link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ celocli plugins:link PATH [-h] [--install] [-v]

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/link.ts)_

## `celocli plugins:remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ celocli plugins:remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

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
  $ celocli plugins:reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to
               uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/reset.ts)_

## `celocli plugins:uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ celocli plugins:uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/uninstall.ts)_

## `celocli plugins:unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ celocli plugins:unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/update.ts)_
