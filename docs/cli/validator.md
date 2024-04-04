`celocli validator`
===================

View and manage Validators

* [`celocli validator:affiliate ARG1`](#celocli-validatoraffiliate-arg1)
* [`celocli validator:deaffiliate`](#celocli-validatordeaffiliate)
* [`celocli validator:deregister`](#celocli-validatorderegister)
* [`celocli validator:downtime-slash`](#celocli-validatordowntime-slash)
* [`celocli validator:force-deaffiliate`](#celocli-validatorforce-deaffiliate)
* [`celocli validator:list`](#celocli-validatorlist)
* [`celocli validator:register`](#celocli-validatorregister)
* [`celocli validator:requirements`](#celocli-validatorrequirements)
* [`celocli validator:set-bitmaps`](#celocli-validatorset-bitmaps)
* [`celocli validator:show ARG1`](#celocli-validatorshow-arg1)
* [`celocli validator:signed-blocks`](#celocli-validatorsigned-blocks)
* [`celocli validator:status`](#celocli-validatorstatus)
* [`celocli validator:update-bls-public-key`](#celocli-validatorupdate-bls-public-key)

## `celocli validator:affiliate ARG1`

Affiliate a Validator with a Validator Group. This allows the Validator Group to add that Validator as a member. If the Validator is already a member of a Validator Group, affiliating with a different Group will remove the Validator from the first group's members.

```
USAGE
  $ celocli validator:affiliate ARG1 --from <value> [--gasCurrency <value>]
    [--globalHelp] [--yes]

ARGUMENTS
  ARG1  ValidatorGroup's address

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Signer or
                                                            Validator's address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --yes                                                     Answer yes to prompt

DESCRIPTION
  Affiliate a Validator with a Validator Group. This allows the Validator Group to add
  that Validator as a member. If the Validator is already a member of a Validator Group,
  affiliating with a different Group will remove the Validator from the first group's
  members.

EXAMPLES
  affiliate --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 0x97f7333c51897469e8d98e7af8653aab468050a3
```

_See code: [src/commands/validator/affiliate.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/affiliate.ts)_

## `celocli validator:deaffiliate`

Deaffiliate a Validator from a Validator Group, and remove it from the Group if it is also a member.

```
USAGE
  $ celocli validator:deaffiliate --from <value> [--gasCurrency <value>] [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Signer or
                                                            Validator's address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Deaffiliate a Validator from a Validator Group, and remove it from the Group if it is
  also a member.

EXAMPLES
  deaffiliate --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95
```

_See code: [src/commands/validator/deaffiliate.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/deaffiliate.ts)_

## `celocli validator:deregister`

Deregister a Validator. Approximately 60 days after the validator is no longer part of any group, it will be possible to deregister the validator and start unlocking the CELO. If you wish to deregister your validator, you must first remove it from it's group, such as by deaffiliating it, then wait the required 60 days before running this command.

```
USAGE
  $ celocli validator:deregister --from <value> [--gasCurrency <value>] [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Signer or
                                                            Validator's address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Deregister a Validator. Approximately 60 days after the validator is no longer part of
  any group, it will be possible to deregister the validator and start unlocking the
  CELO. If you wish to deregister your validator, you must first remove it from it's
  group, such as by deaffiliating it, then wait the required 60 days before running this
  command.

EXAMPLES
  deregister --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95
```

_See code: [src/commands/validator/deregister.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/deregister.ts)_

## `celocli validator:downtime-slash`

Downtime slash a validator

```
USAGE
  $ celocli validator:downtime-slash --from <value> [--gasCurrency <value>] [--globalHelp]
    [--validator <value> | --validators <value>] [--intervals <value> | --beforeBlock
    <value>]

FLAGS
  --beforeBlock=<value>
      Slash for slashable downtime window before provided block

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) From address to perform the slash (reward recipient)

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --intervals='[0:1], [1:2]'
      Array of intervals, ordered by min start to max end

  --validator=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      Validator (signer or account) address

  --validators='["0xb7ef0985bdb4f19460A29d9829aA1514B181C4CD",
  "0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95"]'
      Validator (signer or account) address list

DESCRIPTION
  Downtime slash a validator

EXAMPLES
  downtime-slash     --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95     --validator 0xb7ef0985bdb4f19460A29d9829aA1514B181C4CD     --intervals "[100:150), [150:200)"

  downtime-slash     --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95     --validator 0xb7ef0985bdb4f19460A29d9829aA1514B181C4CD     --slashableDowntimeBeforeBlock 200
```

_See code: [src/commands/validator/downtime-slash.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/downtime-slash.ts)_

## `celocli validator:force-deaffiliate`

Force deaffiliate a Validator from a Validator Group, and remove it from the Group if it is also a member.  Used by stake-off admins in order to remove validators from the next epoch's validator set if they are down and consistently unresponsive, in order to preserve the health of the network. This feature will be removed once slashing for downtime is implemented.

```
USAGE
  $ celocli validator:force-deaffiliate --from <value> --validator <value> [--gasCurrency
    <value>] [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Initiator
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --validator=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d    (required) Validator's
                                                            address

DESCRIPTION
  Force deaffiliate a Validator from a Validator Group, and remove it from the Group if
  it is also a member.  Used by stake-off admins in order to remove validators from the
  next epoch's validator set if they are down and consistently unresponsive, in order to
  preserve the health of the network. This feature will be removed once slashing for
  downtime is implemented.

EXAMPLES
  force-deaffiliate --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 --validator 0xb7ef0985bdb4f19460A29d9829aA1514B181C4CD
```

_See code: [src/commands/validator/force-deaffiliate.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/force-deaffiliate.ts)_

## `celocli validator:list`

List registered Validators, their name (if provided), affiliation, uptime score, and public keys used for validating.

```
USAGE
  $ celocli validator:list [--gasCurrency <value>] [--globalHelp] [--columns <value>
    | -x] [--filter <value>] [--no-header | [--csv | --no-truncate]] [--output
    csv|json|yaml |  | ] [--sort <value>]

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
  List registered Validators, their name (if provided), affiliation, uptime score, and
  public keys used for validating.

EXAMPLES
  list
```

_See code: [src/commands/validator/list.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/list.ts)_

## `celocli validator:register`

Register a new Validator

```
USAGE
  $ celocli validator:register --from <value> --ecdsaKey <value> --blsKey <value>
    --blsSignature <value> [--gasCurrency <value>] [--globalHelp] [--yes]

FLAGS
  --blsKey=0x                                               (required) BLS Public Key
  --blsSignature=0x                                         (required) BLS
                                                            Proof-of-Possession
  --ecdsaKey=0x                                             (required) ECDSA Public Key
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Address for the
                                                            Validator
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --yes                                                     Answer yes to prompt

DESCRIPTION
  Register a new Validator

EXAMPLES
  register --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --ecdsaKey 0x049b7291ab8813a095d6b7913a7930ede5ea17466abd5e1a26c6c44f6df9a400a6f474080098b2c752c6c4871978ca977b90dcd3aed92bc9d564137c8dfa14ee72 --blsKey 0x4fa3f67fc913878b068d1fa1cdddc54913d3bf988dbe5a36a20fa888f20d4894c408a6773f3d7bde11154f2a3076b700d345a42fd25a0e5e83f4db5586ac7979ac2053cd95d8f2efd3e959571ceccaa743e02cf4be3f5d7aaddb0b06fc9aff00 --blsSignature 0xcdb77255037eb68897cd487fdd85388cbda448f617f874449d4b11588b0b7ad8ddc20d9bb450b513bb35664ea3923900
```

_See code: [src/commands/validator/register.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/register.ts)_

## `celocli validator:requirements`

List the Locked Gold requirements for registering a Validator. This consists of a value, which is the amount of CELO that needs to be locked in order to register, and a duration, which is the amount of time that CELO must stay locked following the deregistration of the Validator.

```
USAGE
  $ celocli validator:requirements [--gasCurrency <value>] [--globalHelp]

FLAGS
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  List the Locked Gold requirements for registering a Validator. This consists of a
  value, which is the amount of CELO that needs to be locked in order to register, and a
  duration, which is the amount of time that CELO must stay locked following the
  deregistration of the Validator.

EXAMPLES
  requirements
```

_See code: [src/commands/validator/requirements.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/requirements.ts)_

## `celocli validator:set-bitmaps`

Set validator signature bitmaps for provided intervals

```
USAGE
  $ celocli validator:set-bitmaps --from <value> [--gasCurrency <value>] [--globalHelp]
    [--slashableDowntimeBeforeBlock <value> | --intervals <value> |
    --slashableDowntimeBeforeLatest]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) From address to
                                                            sign set bitmap transactions
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --intervals='[0:1], [1:2]'                                Array of intervals, ordered
                                                            by min start to max end
  --slashableDowntimeBeforeBlock=<value>                    Set all bitmaps for
                                                            slashable downtime window
                                                            before provided block
  --slashableDowntimeBeforeLatest                           Set all bitmaps for
                                                            slashable downtime window
                                                            before latest block

DESCRIPTION
  Set validator signature bitmaps for provided intervals

EXAMPLES
  set-bitmaps --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 --slashableDowntimeBeforeBlock 10000

  set-bitmaps --from 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95 --intervals "[0:100], (100:200]"
```

_See code: [src/commands/validator/set-bitmaps.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/set-bitmaps.ts)_

## `celocli validator:show ARG1`

Show information about a registered Validator.

```
USAGE
  $ celocli validator:show ARG1 [--gasCurrency <value>] [--globalHelp]

ARGUMENTS
  ARG1  Validator's address

FLAGS
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Show information about a registered Validator.

EXAMPLES
  show 0x97f7333c51897469E8D98E7af8653aAb468050a3
```

_See code: [src/commands/validator/show.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/show.ts)_

## `celocli validator:signed-blocks`

Display a graph of blocks and whether the given signer's signature is included in each. A green '.' indicates the signature is present in that block, a red '✘' indicates the signature is not present. A yellow '~' indicates the signer is not elected for that block.

```
USAGE
  $ celocli validator:signed-blocks [--gasCurrency <value>] [--globalHelp] [--signer <value>
    | --signers <value>] [--wasDownWhileElected] [--at-block <value> | ]
    [--slashableDowntimeLookback | [--lookback <value> | ]] [--width <value>]

FLAGS
  --at-block=<value>
      latest block to examine for signer activity

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --lookback=<value>
      [default: 120] how many blocks to look back for signer activity

  --signer=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      address of the signer to check for signatures

  --signers='["0xb7ef0985bdb4f19460A29d9829aA1514B181C4CD",
  "0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95"]'
      list of signer addresses to check for signatures

  --slashableDowntimeLookback
      lookback of slashableDowntime

  --wasDownWhileElected
      indicate whether a validator was down while elected for range

  --width=<value>
      [default: 40] line width for printing marks

DESCRIPTION
  Display a graph of blocks and whether the given signer's signature is included in
  each. A green '.' indicates the signature is present in that block, a red '✘'
  indicates the signature is not present. A yellow '~' indicates the signer is not
  elected for that block.

EXAMPLES
  signed-blocks --signer 0x5409ED021D9299bf6814279A6A1411A7e866A631

  signed-blocks --signer 0x5409ED021D9299bf6814279A6A1411A7e866A631 --follow

  signed-blocks --at-block 100000 --signer 0x5409ED021D9299bf6814279A6A1411A7e866A631

  signed-blocks --lookback 500 --signer 0x5409ED021D9299bf6814279A6A1411A7e866A631

  signed-blocks --lookback 50 --width 10 --signer 0x5409ED021D9299bf6814279A6A1411A7e866A631
```

_See code: [src/commands/validator/signed-blocks.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/signed-blocks.ts)_

## `celocli validator:status`

Shows the consensus status of a validator. This command will show whether a validator is currently elected, would be elected if an election were to be run right now, and the percentage of blocks signed and number of blocks successfully proposed within a given window.

```
USAGE
  $ celocli validator:status [--gasCurrency <value>] [--globalHelp] [--validator
    <value> | --all | --signer <value>] [--start <value>] [--end <value>] [--columns
    <value> | -x] [--filter <value>] [--no-header | [--csv | --no-truncate]] [--output
    csv|json|yaml |  | ] [--sort <value>]

FLAGS
  -x, --extended
      show extra columns

  --all
      get the status of all registered validators

  --columns=<value>
      only show provided columns (comma-separated)

  --csv
      output is csv format [alias: --output=csv]

  --end=<value>
      [default: -1] what block to end at when looking at signer activity. defaults to the
      latest block

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

  --signer=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      address of the signer to check if elected and validating

  --sort=<value>
      property to sort by (prepend '-' for descending)

  --start=<value>
      [default: -1] what block to start at when looking at signer activity. defaults to
      the last 100 blocks

  --validator=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      address of the validator to check if elected and validating

DESCRIPTION
  Shows the consensus status of a validator. This command will show whether a validator
  is currently elected, would be elected if an election were to be run right now, and
  the percentage of blocks signed and number of blocks successfully proposed within a
  given window.

EXAMPLES
  status --validator 0x5409ED021D9299bf6814279A6A1411A7e866A631

  status --validator 0x5409ED021D9299bf6814279A6A1411A7e866A631 --start 1480000

  status --all --start 1480000 --end 1490000
```

_See code: [src/commands/validator/status.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/status.ts)_

## `celocli validator:update-bls-public-key`

Update the BLS public key for a Validator to be used in consensus.

```
USAGE
  $ celocli validator:update-bls-public-key --from <value> --blsKey <value> --blsPop <value>
    [--gasCurrency <value>] [--globalHelp]

FLAGS
  --blsKey=0x                                               (required) BLS Public Key
  --blsPop=0x                                               (required) BLS
                                                            Proof-of-Possession
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Validator's
                                                            address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Update the BLS public key for a Validator to be used in consensus.

  Regular (ECDSA and BLS) key rotation is recommended for Validator operational
  security.

  WARNING: By default, the BLS key used by the validator node is derived from the ECDSA
  private key. As a result, rotating the BLS key without rotating the ECDSA key will
  result in validator downtime without special configuration. Use this method only if
  you know what you are doing.

EXAMPLES
  update-bls-key --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --blsKey 0x4fa3f67fc913878b068d1fa1cdddc54913d3bf988dbe5a36a20fa888f20d4894c408a6773f3d7bde11154f2a3076b700d345a42fd25a0e5e83f4db5586ac7979ac2053cd95d8f2efd3e959571ceccaa743e02cf4be3f5d7aaddb0b06fc9aff00 --blsPop 0xcdb77255037eb68897cd487fdd85388cbda448f617f874449d4b11588b0b7ad8ddc20d9bb450b513bb35664ea3923900
```

_See code: [src/commands/validator/update-bls-public-key.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/validator/update-bls-public-key.ts)_
