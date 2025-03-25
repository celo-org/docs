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
  $ celocli lockedgold:delegate --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --to
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --percent <value> [-k <value> |
    --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

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

  --percent=<value>
      (required) 1-100% of locked celo to be delegated

  --to=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Delegate locked celo.

ALIASES
  $ celocli lockedgold:delegate

EXAMPLES
  delegate --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --to 0xc0ffee254729296a45a3885639AC7E10F9d54979 --percent 100

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli lockedgold:delegate-info`

Delegate info about account.

```
USAGE
  $ celocli lockedgold:delegate-info --account 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --account=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

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
  Delegate info about account.

ALIASES
  $ celocli lockedgold:delegate-info

EXAMPLES
  delegate-info --account 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli lockedgold:lock`

Locks CELO to be used in governance and validator elections.

```
USAGE
  $ celocli lockedgold:lock --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value
    <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

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
      (required) The unit amount of CELO

DESCRIPTION
  Locks CELO to be used in governance and validator elections.

ALIASES
  $ celocli lockedgold:lock

EXAMPLES
  lock --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --value 10000000000000000000000

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli lockedgold:max-delegatees-count`

Returns the maximum number of delegates allowed per account.

```
USAGE
  $ celocli lockedgold:max-delegatees-count [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

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

DESCRIPTION
  Returns the maximum number of delegates allowed per account.

ALIASES
  $ celocli lockedgold:max-delegatees-count

EXAMPLES
  max-delegatees-count

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli lockedgold:revoke-delegate`

Revoke delegated locked celo.

```
USAGE
  $ celocli lockedgold:revoke-delegate --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --to
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --percent <value> [-k <value> |
    --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

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

  --percent=<value>
      (required) 1-100% of locked celo to be revoked from currently delegated amount

  --to=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Revoke delegated locked celo.

ALIASES
  $ celocli lockedgold:revoke-delegate

EXAMPLES
  revoke-delegate --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --to 0xc0ffee254729296a45a3885639AC7E10F9d54979 --percent 100

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli lockedgold:show ARG1`

Show Locked Celo information for a given account. This includes the total amount of locked celo, the amount being used for voting in Validator Elections, the Locked Celo balance this account is required to maintain due to a registered Validator or Validator Group, and any pending withdrawals that have been initiated via "lockedcelo:unlock".

```
USAGE
  $ celocli lockedgold:show ARG1 [-n <value>] [--globalHelp]

FLAGS
  -n, --node=<value>  URL of the node to run commands against or an alias
      --globalHelp    View all available global flags

DESCRIPTION
  Show Locked Celo information for a given account. This includes the total amount of
  locked celo, the amount being used for voting in Validator Elections, the Locked Celo
  balance this account is required to maintain due to a registered Validator or
  Validator Group, and any pending withdrawals that have been initiated via
  "lockedcelo:unlock".

ALIASES
  $ celocli lockedgold:show

EXAMPLES
  show 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli lockedgold:unlock`

Unlocks CELO, which can be withdrawn after the unlocking period. Unlocked celo will appear as a "pending withdrawal" until the unlocking period is over, after which it can be withdrawn via "lockedgold:withdraw".

```
USAGE
  $ celocli lockedgold:unlock --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value
    <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

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
      (required) The unit amount of CELO

DESCRIPTION
  Unlocks CELO, which can be withdrawn after the unlocking period. Unlocked celo will
  appear as a "pending withdrawal" until the unlocking period is over, after which it
  can be withdrawn via "lockedgold:withdraw".

ALIASES
  $ celocli lockedgold:unlock

EXAMPLES
  unlock --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --value 500000000

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli lockedgold:update-delegated-amount`

Updates the amount of delegated locked celo. There might be discrepancy between the amount of locked celo and the amount of delegated locked celo because of received rewards.

```
USAGE
  $ celocli lockedgold:update-delegated-amount --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --to
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

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

  --to=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Updates the amount of delegated locked celo. There might be discrepancy between the
  amount of locked celo and the amount of delegated locked celo because of received
  rewards.

ALIASES
  $ celocli lockedgold:update-delegated-amount

EXAMPLES
  update-delegated-amount --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --to 0xc0ffee254729296a45a3885639AC7E10F9d54979

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli lockedgold:withdraw`

Withdraw any pending withdrawals created via "lockedgold:unlock" that have become available.

```
USAGE
  $ celocli lockedgold:withdraw --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

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
  Withdraw any pending withdrawals created via "lockedgold:unlock" that have become
  available.

ALIASES
  $ celocli lockedgold:withdraw

EXAMPLES
  withdraw --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```
