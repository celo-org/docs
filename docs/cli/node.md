`celocli node`
==============

Manage your Celo node

* [`celocli node:list`](#celocli-nodelist)
* [`celocli node:synced`](#celocli-nodesynced)

## `celocli node:list`

Displays a list of community RPC nodes for the currently elected validator groups

```
USAGE
  $ celocli node:list [-n <value>] [--globalHelp] [--columns <value> | -x]
    [--filter <value>] [--no-header | [--csv | --no-truncate]] [--output csv|json|yaml |
    | ] [--sort <value>] [--all]

FLAGS
  -n, --node=<value>     URL of the node to run commands against or an alias
  -x, --extended         show extra columns
      --all              Display all community RPC nodes, not just the ones from
                         currently elected validator groups
      --columns=<value>  only show provided columns (comma-separated)
      --csv              output is csv format [alias: --output=csv]
      --filter=<value>   filter property by partial string matching, ex: name=foo
      --globalHelp       View all available global flags
      --no-header        hide table header from output
      --no-truncate      do not truncate output to fit screen
      --output=<option>  output in a more machine friendly format
                         <options: csv|json|yaml>
      --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  Displays a list of community RPC nodes for the currently elected validator groups

ALIASES
  $ celocli network:community-rpc-nodes
  $ celocli network:rpc-urls
  $ celocli node:list
  $ celocli validator:community-rpc-nodes
  $ celocli validator:rpc-urls
  $ celocli validatorgroup:community-rpc-nodes

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

## `celocli node:synced`

Check if the node is synced

```
USAGE
  $ celocli node:synced [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--verbose]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --ledgerLiveMode
      When set, the 4th postion of the derivation path will be iterated over instead of
      the 5th. This is useful to use same address on you Ledger with celocli as you do on
      Ledger Live

  --useLedger
      Set it to use a ledger wallet

  --verbose
      output the full status if syncing

DESCRIPTION
  Check if the node is synced

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

_See code: [src/commands/node/synced.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0/packages/cli/src/commands/node/synced.ts)_
