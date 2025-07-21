`celocli oracle`
================

List oracle addresses for a given token

* [`celocli oracle:list ARG1`](#celocli-oraclelist-arg1)
* [`celocli oracle:remove-expired-reports ARG1`](#celocli-oracleremove-expired-reports-arg1)
* [`celocli oracle:report ARG1`](#celocli-oraclereport-arg1)
* [`celocli oracle:reports ARG1`](#celocli-oraclereports-arg1)

## `celocli oracle:list ARG1`

List oracle addresses for a given token

```
USAGE
  $ celocli oracle:list ARG1 [-n <value>] [--globalHelp]

ARGUMENTS
  ARG1  [default: StableToken] Token to list the oracles for

FLAGS
  -n, --node=<value>  URL of the node to run commands against or an alias
      --globalHelp    View all available global flags

DESCRIPTION
  List oracle addresses for a given token

EXAMPLES
  list StableToken

  list

  list StableTokenEUR

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/oracle/list.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.1/packages/cli/lib/commands/oracle/list.js)_

## `celocli oracle:remove-expired-reports ARG1`

Remove expired oracle reports for a specified token

```
USAGE
  $ celocli oracle:remove-expired-reports ARG1 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

ARGUMENTS
  ARG1  [default: StableToken] Token to remove expired reports for

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the account removing oracle reports

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

DESCRIPTION
  Remove expired oracle reports for a specified token

EXAMPLES
  remove-expired-reports StableToken --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1

  remove-expired-reports --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1

  remove-expired-reports StableTokenEUR --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/oracle/remove-expired-reports.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.1/packages/cli/lib/commands/oracle/remove-expired-reports.js)_

## `celocli oracle:report ARG1`

Report the price of CELO in a specified token

```
USAGE
  $ celocli oracle:report ARG1 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --value <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

ARGUMENTS
  ARG1  [default: StableToken] Token to report on

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the oracle account

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

  --value=<value>
      (required) Amount of the specified token equal to 1 CELO

DESCRIPTION
  Report the price of CELO in a specified token

EXAMPLES
  report StableToken --value 1.02 --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1

  report --value 0.99 --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1

  report StableTokenEUR --value 1.02 --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/oracle/report.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.1/packages/cli/lib/commands/oracle/report.js)_

## `celocli oracle:reports ARG1`

List oracle reports for a given token

```
USAGE
  $ celocli oracle:reports ARG1 [-k <value> | --useLedger | ] [-n <value>]
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--ledgerAddresses
    <value> ] [--ledgerLiveMode ] [--globalHelp] [--columns <value> | -x] [--filter
    <value>] [--no-header | [--csv | --no-truncate]] [--output csv|json|yaml |  | ]
    [--sort <value>]

ARGUMENTS
  ARG1  [default: StableToken] Token to list the reports for

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  -x, --extended
      show extra columns

  --columns=<value>
      only show provided columns (comma-separated)

  --csv
      output is csv format [alias: --output=csv]

  --filter=<value>
      filter property by partial string matching, ex: name=foo

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

  --no-header
      hide table header from output

  --no-truncate
      do not truncate output to fit screen

  --output=<option>
      output in a more machine friendly format
      <options: csv|json|yaml>

  --sort=<value>
      property to sort by (prepend '-' for descending)

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  List oracle reports for a given token

EXAMPLES
  reports StableToken

  reports

  reports StableTokenEUR

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/oracle/reports.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.1/packages/cli/lib/commands/oracle/reports.js)_
