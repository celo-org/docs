`celocli config`
================

Configure CLI options which persist across commands

* [`celocli config:get`](#celocli-configget)
* [`celocli config:set`](#celocli-configset)

## `celocli config:get`

Output network node configuration

```
USAGE
  $ celocli config:get [--globalHelp]

FLAGS
  --globalHelp  View all available global flags

DESCRIPTION
  Output network node configuration
```

_See code: [src/commands/config/get.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/config/get.ts)_

## `celocli config:set`

Configure running node information for propogating transactions to network

```
USAGE
  $ celocli config:set [-n <value>] [--gasCurrency
    auto|Auto|CELO|celo|cUSD|cusd|cEUR|ceur|cREAL|creal] [--globalHelp]

FLAGS
  -n, --node=<value>          URL of the node to run commands against (defaults to
                              'http://localhost:8545')
      --gasCurrency=<option>  Use a specific gas currency for transaction fees (defaults
                              to 'auto' which uses whatever feeCurrency is available)
                              <options:
                              auto|Auto|CELO|celo|cUSD|cusd|cEUR|ceur|cREAL|creal>
      --globalHelp            View all available global flags

DESCRIPTION
  Configure running node information for propogating transactions to network

EXAMPLES
  set --node ws://localhost:2500

  set --node <geth-location>/geth.ipc

  set --gasCurrency cUSD

  set --gasCurrency CELO
```

_See code: [src/commands/config/set.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/config/set.ts)_
