`celocli config`
================

Configure CLI options which persist across commands

* [`celocli config:get`](#celocli-configget)
* [`celocli config:set`](#celocli-configset)

## `celocli config:get`

Output network node configuration

```
USAGE
  $ celocli config:get [--gasCurrency <value>] [--globalHelp]

FLAGS
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Output network node configuration
```

_See code: [src/commands/config/get.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/config/get.ts)_

## `celocli config:set`

Configure running node information for propagating transactions to network

```
USAGE
  $ celocli config:set [-n <value>] [--gasCurrency <value>] [--globalHelp]

FLAGS
  -n, --node=<value>
      URL of the node to run commands against (defaults to 'http://localhost:8545')

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

DESCRIPTION
  Configure running node information for propagating transactions to network

EXAMPLES
  set --node mainnet # alias for `forno`

  set --node forno # alias for https://forno.celo.org

  set --node baklava # alias for https://baklava-forno.celo-testnet.org

  set --node alfajores # alias for https://alfajores-forno.celo-testnet.org

  set --node localhost # alias for `local`

  set --node local # alias for http://localhost:8545

  set --node ws://localhost:2500

  set --node <geth-location>/geth.ipc
```

_See code: [src/commands/config/set.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/config/set.ts)_
