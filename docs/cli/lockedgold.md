`celocli lockedgold`
====================

View and manage locked CELO

* [`celocli lockedgold:delegate`](#celocli-lockedgolddelegate)
* [`celocli lockedgold:delegate-info`](#celocli-lockedgolddelegate-info)
* [`celocli lockedgold:lock`](#celocli-lockedgoldlock)
* [`celocli lockedgold:max-delegatees-count`](#celocli-lockedgoldmax-delegatees-count)
* [`celocli lockedgold:revoke-delegate`](#celocli-lockedgoldrevoke-delegate)
* [`celocli lockedgold:show ARG1`](#celocli-lockedgoldshow-arg1)
* [`celocli lockedgold:unlock`](#celocli-lockedgoldunlock)
* [`celocli lockedgold:update-delegated-amount`](#celocli-lockedgoldupdate-delegated-amount)
* [`celocli lockedgold:withdraw`](#celocli-lockedgoldwithdraw)

## `celocli lockedgold:delegate`

Delegate locked celo.

```
USAGE
  $ celocli lockedgold:delegate --from <value> --to <value> --percent <value>
    [--gasCurrency <value>] [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Account Address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --percent=<value>                                         (required) 1-100% of locked
                                                            celo to be delegated
  --to=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d           (required) Account Address

DESCRIPTION
  Delegate locked celo.

EXAMPLES
  delegate --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --to 0xc0ffee254729296a45a3885639AC7E10F9d54979 --percent 100
```

_See code: [src/commands/lockedgold/delegate.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/lockedgold/delegate.ts)_

## `celocli lockedgold:delegate-info`

Delegate info about account.

```
USAGE
  $ celocli lockedgold:delegate-info --account <value> [--gasCurrency <value>]
  [--globalHelp]

FLAGS
  --account=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d      (required) Account Address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Delegate info about account.

EXAMPLES
  delegate-info --account 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95
```

_See code: [src/commands/lockedgold/delegate-info.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/lockedgold/delegate-info.ts)_

## `celocli lockedgold:lock`

Locks CELO to be used in governance and validator elections.

```
USAGE
  $ celocli lockedgold:lock --from <value> --value <value> [--gasCurrency <value>]
    [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Account Address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --value=<value>                                           (required) The unit amount
                                                            of CELO

DESCRIPTION
  Locks CELO to be used in governance and validator elections.

EXAMPLES
  lock --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --value 10000000000000000000000
```

_See code: [src/commands/lockedgold/lock.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/lockedgold/lock.ts)_

## `celocli lockedgold:max-delegatees-count`

Returns the maximum number of delegates allowed per account.

```
USAGE
  $ celocli lockedgold:max-delegatees-count [--gasCurrency <value>] [--globalHelp]

FLAGS
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Returns the maximum number of delegates allowed per account.

EXAMPLES
  max-delegatees-count
```

_See code: [src/commands/lockedgold/max-delegatees-count.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/lockedgold/max-delegatees-count.ts)_

## `celocli lockedgold:revoke-delegate`

Revoke delegated locked celo.

```
USAGE
  $ celocli lockedgold:revoke-delegate --from <value> --to <value> --percent <value>
    [--gasCurrency <value>] [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Account Address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --percent=<value>                                         (required) 1-100% of locked
                                                            celo to be revoked from
                                                            currently delegated amount
  --to=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d           (required) Account Address

DESCRIPTION
  Revoke delegated locked celo.

EXAMPLES
  revoke-delegate --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --to 0xc0ffee254729296a45a3885639AC7E10F9d54979 --percent 100
```

_See code: [src/commands/lockedgold/revoke-delegate.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/lockedgold/revoke-delegate.ts)_

## `celocli lockedgold:show ARG1`

Show Locked Gold information for a given account. This includes the total amount of locked celo, the amount being used for voting in Validator Elections, the Locked Gold balance this account is required to maintain due to a registered Validator or Validator Group, and any pending withdrawals that have been initiated via "lockedgold:unlock".

```
USAGE
  $ celocli lockedgold:show ARG1 [--gasCurrency <value>] [--globalHelp]

FLAGS
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Show Locked Gold information for a given account. This includes the total amount of
  locked celo, the amount being used for voting in Validator Elections, the Locked Gold
  balance this account is required to maintain due to a registered Validator or
  Validator Group, and any pending withdrawals that have been initiated via
  "lockedgold:unlock".

EXAMPLES
  show 0x5409ed021d9299bf6814279a6a1411a7e866a631
```

_See code: [src/commands/lockedgold/show.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/lockedgold/show.ts)_

## `celocli lockedgold:unlock`

Unlocks CELO, which can be withdrawn after the unlocking period. Unlocked celo will appear as a "pending withdrawal" until the unlocking period is over, after which it can be withdrawn via "lockedgold:withdraw".

```
USAGE
  $ celocli lockedgold:unlock --from <value> --value <value> [--gasCurrency <value>]
    [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Account Address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --value=<value>                                           (required) The unit amount
                                                            of CELO

DESCRIPTION
  Unlocks CELO, which can be withdrawn after the unlocking period. Unlocked celo will
  appear as a "pending withdrawal" until the unlocking period is over, after which it
  can be withdrawn via "lockedgold:withdraw".

EXAMPLES
  unlock --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --value 500000000
```

_See code: [src/commands/lockedgold/unlock.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/lockedgold/unlock.ts)_

## `celocli lockedgold:update-delegated-amount`

Updates the amount of delegated locked celo. There might be discrepancy between the amount of locked celo and the amount of delegated locked celo because of received rewards.

```
USAGE
  $ celocli lockedgold:update-delegated-amount --from <value> --to <value> [--gasCurrency <value>]
    [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Account Address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --to=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d           (required) Account Address

DESCRIPTION
  Updates the amount of delegated locked celo. There might be discrepancy between the
  amount of locked celo and the amount of delegated locked celo because of received
  rewards.

EXAMPLES
  update-delegated-amount --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --to 0xc0ffee254729296a45a3885639AC7E10F9d54979
```

_See code: [src/commands/lockedgold/update-delegated-amount.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/lockedgold/update-delegated-amount.ts)_

## `celocli lockedgold:withdraw`

Withdraw any pending withdrawals created via "lockedgold:unlock" that have become available.

```
USAGE
  $ celocli lockedgold:withdraw --from <value> [--gasCurrency <value>] [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Account Address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Withdraw any pending withdrawals created via "lockedgold:unlock" that have become
  available.

EXAMPLES
  withdraw --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95
```

_See code: [src/commands/lockedgold/withdraw.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/lockedgold/withdraw.ts)_
