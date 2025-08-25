`celocli multisig`
==================

Approves an existing transaction on a multi-sig contract

* [`celocli multisig:approve`](#celocli-multisigapprove)
* [`celocli multisig:propose ARG1`](#celocli-multisigpropose-arg1)
* [`celocli multisig:show ARG1`](#celocli-multisigshow-arg1)
* [`celocli multisig:transfer ARG1`](#celocli-multisigtransfer-arg1)

## `celocli multisig:approve`

Approves an existing transaction on a multi-sig contract

```
USAGE
  $ celocli multisig:approve --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --for
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --tx 10000000000000000000000 [-k <value>
    | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --for=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the multi-sig contract

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account approving the multi-sig transaction

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

  --tx=10000000000000000000000
      (required) Transaction to approve (index)

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Approves an existing transaction on a multi-sig contract

EXAMPLES
  approve --from 0x6ecbe1db9ef729cbe972c83fb886247691fb6beb --for 0x5409ed021d9299bf6814279a6a1411a7e866a631 --tx 3

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

_See code: [src/commands/multisig/approve.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/multisig/approve.ts)_

## `celocli multisig:propose ARG1`

Propose a transaction to a multi-sig contract

```
USAGE
  $ celocli multisig:propose ARG1 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --to 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--ledgerLiveMode ] [--globalHelp] [--value
    10000000000000000000000] [--data 0x]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --data=0x
      [default: 0x] Transaction data (hex encoded)

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account proposing the transaction

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
      (required) Destination address of the transaction

  --useLedger
      Set it to use a ledger wallet

  --value=10000000000000000000000
      Amount of Celo to send (in wei)

DESCRIPTION
  Propose a transaction to a multi-sig contract

EXAMPLES
  propose 0x5409ed021d9299bf6814279a6a1411a7e866a631 --to 0x4f2ee3ea --value 200000e18 --from 0x123abc

  propose 0x5409ed021d9299bf6814279a6a1411a7e866a631 --to 0x4f2ee3ea --data 0xc0decafe --from 0x123abc

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

_See code: [src/commands/multisig/propose.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/multisig/propose.ts)_

## `celocli multisig:show ARG1`

Shows information about multi-sig contract

```
USAGE
  $ celocli multisig:show ARG1 [-n <value>] [--globalHelp] [--tx <value>] [--all]
    [--raw]

FLAGS
  -n, --node=<value>  URL of the node to run commands against or an alias
      --all           Show info about all transactions
      --globalHelp    View all available global flags
      --raw           Do not attempt to parse transactions
      --tx=<value>    Show info for a transaction

DESCRIPTION
  Shows information about multi-sig contract

EXAMPLES
  show 0x5409ed021d9299bf6814279a6a1411a7e866a631

  show 0x5409ed021d9299bf6814279a6a1411a7e866a631 --tx 3

  show 0x5409ed021d9299bf6814279a6a1411a7e866a631 --all --raw

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

_See code: [src/commands/multisig/show.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/multisig/show.ts)_

## `celocli multisig:transfer ARG1`

Ability to approve CELO transfers to and from multisig. Submit transaction or approve a matching existing transaction

```
USAGE
  $ celocli multisig:transfer ARG1 --to 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --amount 10000000000000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--transferFrom --sender
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --amount=10000000000000000000000
      (required) Amount to transfer, e.g. 10e18

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account transferring value to the recipient

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

  --sender=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      Identify sender if performing transferFrom

  --to=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Recipient of transfer

  --transferFrom
      Perform transferFrom instead of transfer in the ERC-20 interface

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Ability to approve CELO transfers to and from multisig. Submit transaction or approve
  a matching existing transaction

EXAMPLES
  transfer <multiSigAddr> --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --amount 200000e18 --from 0x123abc

  transfer <multiSigAddr> --transferFrom --sender 0x123abc --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --amount 200000e18 --from 0x123abc

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

_See code: [src/commands/multisig/transfer.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/multisig/transfer.ts)_
