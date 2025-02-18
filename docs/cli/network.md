`celocli network`
=================

View details about the network, like contracts and parameters

* [`celocli network:community-rpc-nodes`](#celocli-networkcommunity-rpc-nodes)
* [`celocli network:contracts`](#celocli-networkcontracts)
* [`celocli network:info`](#celocli-networkinfo)
* [`celocli network:parameters`](#celocli-networkparameters)
* [`celocli network:rpc-urls`](#celocli-networkrpc-urls)
* [`celocli network:whitelist`](#celocli-networkwhitelist)

## `celocli network:community-rpc-nodes`

Displays a list of community RPC nodes for the currently elected validator groups

```
USAGE
  $ celocli network:community-rpc-nodes [-n <value>] [--globalHelp] [--columns <value> | -x]
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
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli network:contracts`

Lists Celo core contracts and their addresses.

```
USAGE
  $ celocli network:contracts [-n <value>] [--globalHelp] [--columns <value> | -x]
    [--filter <value>] [--no-header | [--csv | --no-truncate]] [--output csv|json|yaml |
    | ] [--sort <value>]

FLAGS
  -n, --node=<value>     URL of the node to run commands against or an alias
  -x, --extended         show extra columns
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
  Lists Celo core contracts and their addresses.

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/network/contracts.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/network/contracts.ts)_

## `celocli network:info`

View general network information such as the current block number

```
USAGE
  $ celocli network:info [-n <value>] [--globalHelp] [--lastN <value>]

FLAGS
  -n, --node=<value>   URL of the node to run commands against or an alias
      --globalHelp     View all available global flags
      --lastN=<value>  [default: 1] Fetch info about the last n epochs

DESCRIPTION
  View general network information such as the current block number

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/network/info.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/network/info.ts)_

## `celocli network:parameters`

View parameters of the network, including but not limited to configuration for the various Celo core smart contracts.

```
USAGE
  $ celocli network:parameters [-n <value>] [--globalHelp] [--raw]

FLAGS
  -n, --node=<value>  URL of the node to run commands against or an alias
      --globalHelp    View all available global flags
      --raw           Display raw numerical configuration

DESCRIPTION
  View parameters of the network, including but not limited to configuration for the
  various Celo core smart contracts.

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/network/parameters.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/network/parameters.ts)_

## `celocli network:rpc-urls`

Displays a list of community RPC nodes for the currently elected validator groups

```
USAGE
  $ celocli network:rpc-urls [-n <value>] [--globalHelp] [--columns <value> | -x]
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
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli network:whitelist`

List the whitelisted fee currencies

```
USAGE
  $ celocli network:whitelist [-n <value>] [--globalHelp] [--columns <value> | -x]
    [--filter <value>] [--no-header | [--csv | --no-truncate]] [--output csv|json|yaml |
    | ] [--sort <value>]

FLAGS
  -n, --node=<value>     URL of the node to run commands against or an alias
  -x, --extended         show extra columns
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
  List the whitelisted fee currencies

EXAMPLES
  whitelist

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/network/whitelist.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/network/whitelist.ts)_
