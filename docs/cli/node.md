`celocli node`
==============

Manage your Celo node

* [`celocli node:accounts`](#celocli-nodeaccounts)
* [`celocli node:synced`](#celocli-nodesynced)

## `celocli node:accounts`

List the addresses that this node has the private keys for.

```
USAGE
  $ celocli node:accounts [--globalHelp]

FLAGS
  --globalHelp  View all available global flags

DESCRIPTION
  List the addresses that this node has the private keys for.
```

_See code: [src/commands/node/accounts.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/node/accounts.ts)_

## `celocli node:synced`

Check if the node is synced

```
USAGE
  $ celocli node:synced [--globalHelp] [--verbose]

FLAGS
  --globalHelp  View all available global flags
  --verbose     output the full status if syncing

DESCRIPTION
  Check if the node is synced
```

_See code: [src/commands/node/synced.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/node/synced.ts)_
