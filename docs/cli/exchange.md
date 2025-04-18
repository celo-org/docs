`celocli exchange`
==================

Exchange Celo Dollars and CELO via Mento

* [`celocli exchange:celo`](#celocli-exchangecelo)
* [`celocli exchange:dollars`](#celocli-exchangedollars)
* [`celocli exchange:euros`](#celocli-exchangeeuros)
* [`celocli exchange:reals`](#celocli-exchangereals)
* [`celocli exchange:show`](#celocli-exchangeshow)
* [`celocli exchange:stable`](#celocli-exchangestable)

## `celocli exchange:celo`

Exchange CELO for StableTokens via Mento. (Note: this is the equivalent of the old exchange:gold)

```
USAGE
  $ celocli exchange:celo --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value
    10000000000000000000000 [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--forAtLeast 10000000000000000000000]
    [--stableToken cUSD|cusd|cEUR|ceur|cREAL|creal]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --forAtLeast=10000000000000000000000
      [default: 0] Optional, the minimum value of StableTokens to receive in return

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) The address with CELO to exchange

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
      [default: cusd] Name of the stable to receive
      <options: cUSD|cusd|cEUR|ceur|cREAL|creal>

  --useLedger
      Set it to use a ledger wallet

  --value=10000000000000000000000
      (required) The value of CELO to exchange for a StableToken

DESCRIPTION
  Exchange CELO for StableTokens via Mento. (Note: this is the equivalent of the old
  exchange:gold)

EXAMPLES
  celo --value 5000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d

  celo --value 5000000000000 --forAtLeast 100000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --stableToken cStableTokenSymbol

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/exchange/celo.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/exchange/celo.ts)_

## `celocli exchange:dollars`

Exchange Celo Dollars for CELO via Mento

```
USAGE
  $ celocli exchange:dollars --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value
    10000000000000000000000 [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--forAtLeast 10000000000000000000000]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --forAtLeast=10000000000000000000000
      [default: 0] Optional, the minimum value of CELO to receive in return

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) The address with Celo Dollars to exchange

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

  --value=10000000000000000000000
      (required) The value of Celo Dollars to exchange for CELO

DESCRIPTION
  Exchange Celo Dollars for CELO via Mento

EXAMPLES
  dollars --value 10000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d

  dollars --value 10000000000000 --forAtLeast 50000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/exchange/dollars.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/exchange/dollars.ts)_

## `celocli exchange:euros`

Exchange Celo Euros for CELO via Mento

```
USAGE
  $ celocli exchange:euros --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value
    10000000000000000000000 [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--forAtLeast 10000000000000000000000]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --forAtLeast=10000000000000000000000
      [default: 0] Optional, the minimum value of CELO to receive in return

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) The address with Celo Euros to exchange

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

  --value=10000000000000000000000
      (required) The value of Celo Euros to exchange for CELO

DESCRIPTION
  Exchange Celo Euros for CELO via Mento

EXAMPLES
  euros --value 10000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d

  euros --value 10000000000000 --forAtLeast 50000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/exchange/euros.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/exchange/euros.ts)_

## `celocli exchange:reals`

Exchange Celo Brazilian Real (cREAL) for CELO via Mento

```
USAGE
  $ celocli exchange:reals --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value
    10000000000000000000000 [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--forAtLeast 10000000000000000000000]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --forAtLeast=10000000000000000000000
      [default: 0] Optional, the minimum value of CELO to receive in return

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) The address with Celo Brazilian Real to exchange

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

  --value=10000000000000000000000
      (required) The value of Celo Brazilian Real to exchange for CELO

DESCRIPTION
  Exchange Celo Brazilian Real (cREAL) for CELO via Mento

EXAMPLES
  reals --value 10000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d

  reals --value 10000000000000 --forAtLeast 50000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/exchange/reals.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/exchange/reals.ts)_

## `celocli exchange:show`

Show the current exchange rates offered by the Broker

```
USAGE
  $ celocli exchange:show [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--amount <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --amount=<value>
      [default: 1000000000000000000] Amount of the token being exchanged to report rates
      for

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
  Show the current exchange rates offered by the Broker

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

_See code: [src/commands/exchange/show.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/exchange/show.ts)_

## `celocli exchange:stable`

Exchange Stable Token for CELO via Mento

```
USAGE
  $ celocli exchange:stable --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --value
    10000000000000000000000 [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--forAtLeast 10000000000000000000000]
    [--stableToken cUSD|cusd|cEUR|ceur|cREAL|creal]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --forAtLeast=10000000000000000000000
      [default: 0] Optional, the minimum value of CELO to receive in return

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) The address with the Stable Token to exchange

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
      Name of the stable token to be transferred
      <options: cUSD|cusd|cEUR|ceur|cREAL|creal>

  --useLedger
      Set it to use a ledger wallet

  --value=10000000000000000000000
      (required) The value of Stable Tokens to exchange for CELO

DESCRIPTION
  Exchange Stable Token for CELO via Mento

EXAMPLES
  stable --value 10000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --stableToken cStableTokenSymbol

  stable --value 10000000000000 --forAtLeast 50000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --stableToken cStableTokenSymbol

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/exchange/stable.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/exchange/stable.ts)_
