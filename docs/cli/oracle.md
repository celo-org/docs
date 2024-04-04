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
  $ celocli oracle:list ARG1 [--gasCurrency <value>] [--globalHelp]

ARGUMENTS
  ARG1  [default: StableToken] Token to list the oracles for

FLAGS
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  List oracle addresses for a given token

EXAMPLES
  list StableToken

  list

  list StableTokenEUR
```

_See code: [src/commands/oracle/list.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/oracle/list.ts)_

## `celocli oracle:remove-expired-reports ARG1`

Remove expired oracle reports for a specified token

```
USAGE
  $ celocli oracle:remove-expired-reports ARG1 --from <value> [--gasCurrency <value>]
  [--globalHelp]

ARGUMENTS
  ARG1  [default: StableToken] Token to remove expired reports for

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Address of the
                                                            account removing oracle
                                                            reports
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Remove expired oracle reports for a specified token

EXAMPLES
  remove-expired-reports StableToken --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1

  remove-expired-reports --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1

  remove-expired-reports StableTokenEUR --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1
```

_See code: [src/commands/oracle/remove-expired-reports.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/oracle/remove-expired-reports.ts)_

## `celocli oracle:report ARG1`

Report the price of CELO in a specified token

```
USAGE
  $ celocli oracle:report ARG1 --from <value> --value <value> [--gasCurrency
    <value>] [--globalHelp]

ARGUMENTS
  ARG1  [default: StableToken] Token to report on

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Address of the
                                                            oracle account
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --value=<value>                                           (required) Amount of the
                                                            specified token equal to 1
                                                            CELO

DESCRIPTION
  Report the price of CELO in a specified token

EXAMPLES
  report StableToken --value 1.02 --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1

  report --value 0.99 --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1

  report StableTokenEUR --value 1.02 --from 0x8c349AAc7065a35B7166f2659d6C35D75A3893C1
```

_See code: [src/commands/oracle/report.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/oracle/report.ts)_

## `celocli oracle:reports ARG1`

List oracle reports for a given token

```
USAGE
  $ celocli oracle:reports ARG1 [--gasCurrency <value>] [--globalHelp] [--columns
    <value> | -x] [--filter <value>] [--no-header | [--csv | --no-truncate]] [--output
    csv|json|yaml |  | ] [--sort <value>]

ARGUMENTS
  ARG1  [default: StableToken] Token to list the reports for

FLAGS
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

  --no-header
      hide table header from output

  --no-truncate
      do not truncate output to fit screen

  --output=<option>
      output in a more machine friendly format
      <options: csv|json|yaml>

  --sort=<value>
      property to sort by (prepend '-' for descending)

DESCRIPTION
  List oracle reports for a given token

EXAMPLES
  reports StableToken

  reports

  reports StableTokenEUR
```

_See code: [src/commands/oracle/reports.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/oracle/reports.ts)_
