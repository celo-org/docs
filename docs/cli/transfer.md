`celocli transfer`
==================

Transfer CELO and Celo Dollars

* [`celocli transfer:celo`](#celocli-transfercelo)
* [`celocli transfer:dollars`](#celocli-transferdollars)
* [`celocli transfer:erc20`](#celocli-transfererc20)
* [`celocli transfer:euros`](#celocli-transfereuros)
* [`celocli transfer:reals`](#celocli-transferreals)
* [`celocli transfer:stable`](#celocli-transferstable)

## `celocli transfer:celo`

Transfer CELO to a specified address. (Note: this is the equivalent of the old transfer:gold)

```
USAGE
  $ celocli transfer:celo --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --to
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value 10000000000000000000000 [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--comment <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --comment=<value>
      Transfer comment

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the sender

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
      (required) Address of the receiver

  --useLedger
      Set it to use a ledger wallet

  --value=10000000000000000000000
      (required) Amount to transfer (in wei)

DESCRIPTION
  Transfer CELO to a specified address. (Note: this is the equivalent of the old
  transfer:gold)

EXAMPLES
  celo --from 0xa0Af2E71cECc248f4a7fD606F203467B500Dd53B --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --value 10000000000000000000

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

_See code: [src/commands/transfer/celo.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/transfer/celo.ts)_

## `celocli transfer:dollars`

Transfer Celo Dollars (cUSD) to a specified address.

```
USAGE
  $ celocli transfer:dollars --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --to
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value 10000000000000000000000 [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--comment <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --comment=<value>
      Transfer comment

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the sender

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
      (required) Address of the receiver

  --useLedger
      Set it to use a ledger wallet

  --value=10000000000000000000000
      (required) Amount to transfer (in wei)

DESCRIPTION
  Transfer Celo Dollars (cUSD) to a specified address.

EXAMPLES
  dollars --from 0xa0Af2E71cECc248f4a7fD606F203467B500Dd53B --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --value 1000000000000000000

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

_See code: [src/commands/transfer/dollars.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/transfer/dollars.ts)_

## `celocli transfer:erc20`

Transfer ERC20 to a specified address

```
USAGE
  $ celocli transfer:erc20 --erc20Address 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --to
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value 10000000000000000000000 [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --erc20Address=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Custom erc20 to check it's balance too

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the sender

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
      (required) Address of the receiver

  --useLedger
      Set it to use a ledger wallet

  --value=10000000000000000000000
      (required) Amount to transfer (in wei)

DESCRIPTION
  Transfer ERC20 to a specified address

EXAMPLES
  erc20 --erc20Address 0x765DE816845861e75A25fCA122bb6898B8B1282a --from 0xa0Af2E71cECc248f4a7fD606F203467B500Dd53B --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --value 10000000000000000000

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

_See code: [src/commands/transfer/erc20.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/transfer/erc20.ts)_

## `celocli transfer:euros`

Transfer Celo Euros (cEUR) to a specified address.

```
USAGE
  $ celocli transfer:euros --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --to
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value 10000000000000000000000 [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--comment <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --comment=<value>
      Transfer comment

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the sender

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
      (required) Address of the receiver

  --useLedger
      Set it to use a ledger wallet

  --value=10000000000000000000000
      (required) Amount to transfer (in wei)

DESCRIPTION
  Transfer Celo Euros (cEUR) to a specified address.

EXAMPLES
  euros --from 0xa0Af2E71cECc248f4a7fD606F203467B500Dd53B --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --value 1000000000000000000

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

_See code: [src/commands/transfer/euros.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/transfer/euros.ts)_

## `celocli transfer:reals`

Transfer Celo Brazilian Real (cREAL) to a specified address.

```
USAGE
  $ celocli transfer:reals --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --to
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value 10000000000000000000000 [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--comment <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --comment=<value>
      Transfer comment

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the sender

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
      (required) Address of the receiver

  --useLedger
      Set it to use a ledger wallet

  --value=10000000000000000000000
      (required) Amount to transfer (in wei)

DESCRIPTION
  Transfer Celo Brazilian Real (cREAL) to a specified address.

EXAMPLES
  reals --from 0xa0Af2E71cECc248f4a7fD606F203467B500Dd53B --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --value 1000000000000000000

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

_See code: [src/commands/transfer/reals.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/transfer/reals.ts)_

## `celocli transfer:stable`

Transfer a stable token to a specified address.

```
USAGE
  $ celocli transfer:stable --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --to
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value 10000000000000000000000
    --stableToken cUSD|cusd|cEUR|ceur|cREAL|creal [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--ledgerLiveMode ] [--globalHelp] [--comment <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --comment=<value>
      Transfer comment

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the sender

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

  --stableToken=<option>
      (required) Name of the stable to be transferred
      <options: cUSD|cusd|cEUR|ceur|cREAL|creal>

  --to=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the receiver

  --useLedger
      Set it to use a ledger wallet

  --value=10000000000000000000000
      (required) Amount to transfer (in wei)

DESCRIPTION
  Transfer a stable token to a specified address.

EXAMPLES
  stable --from 0xa0Af2E71cECc248f4a7fD606F203467B500Dd53B --to 0x5409ed021d9299bf6814279a6a1411a7e866a631 --value 1000000000000000000 --stableToken cStableTokenSymbol

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

_See code: [src/commands/transfer/stable.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/transfer/stable.ts)_
