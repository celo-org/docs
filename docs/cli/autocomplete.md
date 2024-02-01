`celocli autocomplete`
======================

Display autocomplete installation instructions.

* [`celocli autocomplete [SHELL]`](#celocli-autocomplete-shell)

## `celocli autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ celocli autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ celocli autocomplete

  $ celocli autocomplete bash

  $ celocli autocomplete zsh

  $ celocli autocomplete powershell

  $ celocli autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.0.5/src/commands/autocomplete/index.ts)_
