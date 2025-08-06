`celocli config`
================

Configure CLI options which persist across commands

* [`celocli config:get`](#celocli-configget)
* [`celocli config:set`](#celocli-configset)

## `celocli config:get`

Output network node configuration

```
USAGE
  $ celocli config:get

DESCRIPTION
  Output network node configuration
```

_See code: [src/commands/config/get.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/config/get.ts)_

## `celocli config:set`

Configure running node information for propagating transactions to network

```
USAGE
  $ celocli config:set [-n <value>] [--derivationPath <value>] [--telemetry 1|0]

FLAGS
  -n, --node=<value>            URL of the node to run commands against or an alias
      --derivationPath=<value>  Set the default derivation path used by account:new and
                                when using --useLedger flag. Options: 'eth',
                                'celoLegacy', or a custom derivation path
      --telemetry=<option>      Whether to enable or disable telemetry
                                <options: 1|0>

DESCRIPTION
  Configure running node information for propagating transactions to network

EXAMPLES
  set --node celo # alias for `forno`

  set --node forno # alias for https://forno.celo.org

  set --node baklava # alias for https://baklava-forno.celo-testnet.org

  set --node alfajores # alias for https://alfajores-forno.celo-testnet.org

  set --node localhost # alias for `local`

  set --node local # alias for http://localhost:8545

  set --node ws://localhost:2500

  set --node <geth-location>/geth.ipc

  set --derivationPath "m/44'/52752'/0'/0"

  set --derivationPath eth

  set --derivationPath celoLegacy

  set --telemetry 0 # disable telemetry

  set --telemetry 1 # enable telemetry

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    testnet, celo-sepolia => Celo Sepolia Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/config/set.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/config/set.ts)_
