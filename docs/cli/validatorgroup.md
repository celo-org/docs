`celocli validatorgroup`
========================

View and manage Validator Groups

* [`celocli validatorgroup:commission`](#celocli-validatorgroupcommission)
* [`celocli validatorgroup:deregister`](#celocli-validatorgroupderegister)
* [`celocli validatorgroup:list`](#celocli-validatorgrouplist)
* [`celocli validatorgroup:member ARG1`](#celocli-validatorgroupmember-arg1)
* [`celocli validatorgroup:register`](#celocli-validatorgroupregister)
* [`celocli validatorgroup:reset-slashing-multiplier ARG1`](#celocli-validatorgroupreset-slashing-multiplier-arg1)
* [`celocli validatorgroup:show ARG1`](#celocli-validatorgroupshow-arg1)

## `celocli validatorgroup:commission`

Manage the commission for a registered Validator Group. This represents the share of the epoch rewards given to elected Validators that goes to the group they are a member of. Updates must be made in a two step process where the group owner first calls uses the queue-update option, then after the required update delay, the apply option. The commission update delay, in blocks, can be viewed with the network:parameters command. A groups next commission update block can be checked with validatorgroup:show

```
USAGE
  $ celocli validatorgroup:commission --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--globalHelp] [--apply | --queue-update <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --apply
      Applies a previously queued update. Should be called after the update delay.

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address for the Validator Group or Validator Group validator signer

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --queue-update=<value>
      Queues an update to the commission, which can be applied after the update delay.

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Manage the commission for a registered Validator Group. This represents the share of
  the epoch rewards given to elected Validators that goes to the group they are a member
  of. Updates must be made in a two step process where the group owner first calls uses
  the queue-update option, then after the required update delay, the apply option. The
  commission update delay, in blocks, can be viewed with the network:parameters command.
  A groups next commission update block can be checked with validatorgroup:show

EXAMPLES
  commission --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --queue-update 0.1

  commission --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --apply

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/validatorgroup/commission.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validatorgroup/commission.ts)_

## `celocli validatorgroup:deregister`

Deregister a Validator Group. After the group lock perioid has passed it will be possible to deregister it start unlocking the CELO. If you wish to deregister your validator group, you must first remove all members, then wait the required time before running this command.

```
USAGE
  $ celocli validatorgroup:deregister --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Signer or ValidatorGroup's address

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Deregister a Validator Group. After the group lock perioid has passed it will be
  possible to deregister it start unlocking the CELO. If you wish to deregister your
  validator group, you must first remove all members, then wait the required time before
  running this command.

EXAMPLES
  deregister --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/validatorgroup/deregister.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validatorgroup/deregister.ts)_

## `celocli validatorgroup:list`

List registered Validator Groups, their names (if provided), commission, and members.

```
USAGE
  $ celocli validatorgroup:list [-n <value>] [--globalHelp] [--columns <value> | -x]
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
  List registered Validator Groups, their names (if provided), commission, and members.

EXAMPLES
  list

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/validatorgroup/list.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validatorgroup/list.ts)_

## `celocli validatorgroup:member ARG1`

Add or remove members from a Validator Group

```
USAGE
  $ celocli validatorgroup:member ARG1 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--globalHelp] [--yes] [--accept | --remove | --reorder <value>]

ARGUMENTS
  ARG1  Validator's address

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --accept
      Accept a validator whose affiliation is already set to the group

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) ValidatorGroup's address

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --remove
      Remove a validator from the members list

  --reorder=<value>
      Reorder a validator within the members list. Indices are 0 based

  --useLedger
      Set it to use a ledger wallet

  --yes
      Answer yes to prompt

DESCRIPTION
  Add or remove members from a Validator Group

EXAMPLES
  member --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 --accept 0x97f7333c51897469e8d98e7af8653aab468050a3

  member --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 --remove 0x97f7333c51897469e8d98e7af8653aab468050a3

  member --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 --reorder 3 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/validatorgroup/member.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validatorgroup/member.ts)_

## `celocli validatorgroup:register`

Register a new Validator Group

```
USAGE
  $ celocli validatorgroup:register --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --commission <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--globalHelp] [--yes]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --commission=<value>
      (required) The share of the epoch rewards given to elected Validators that goes to
      the group.

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address for the Validator Group

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --useLedger
      Set it to use a ledger wallet

  --yes
      Answer yes to prompt

DESCRIPTION
  Register a new Validator Group

EXAMPLES
  register --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --commission 0.1

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/validatorgroup/register.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validatorgroup/register.ts)_

## `celocli validatorgroup:reset-slashing-multiplier ARG1`

Reset validator group slashing multiplier.

```
USAGE
  $ celocli validatorgroup:reset-slashing-multiplier ARG1 [-k <value> | --useLedger | ] [-n <value>]
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--ledgerAddresses
    <value> ] [--globalHelp]

ARGUMENTS
  ARG1  ValidatorGroup's address

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

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Reset validator group slashing multiplier.

EXAMPLES
  reset-slashing-multiplier 0x97f7333c51897469E8D98E7af8653aAb468050a3

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/validatorgroup/reset-slashing-multiplier.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validatorgroup/reset-slashing-multiplier.ts)_

## `celocli validatorgroup:show ARG1`

Show information about an existing Validator Group

```
USAGE
  $ celocli validatorgroup:show ARG1 [-n <value>] [--globalHelp]

ARGUMENTS
  ARG1  ValidatorGroup's address

FLAGS
  -n, --node=<value>  URL of the node to run commands against or an alias
      --globalHelp    View all available global flags

DESCRIPTION
  Show information about an existing Validator Group

EXAMPLES
  show 0x97f7333c51897469E8D98E7af8653aAb468050a3

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/validatorgroup/show.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validatorgroup/show.ts)_
