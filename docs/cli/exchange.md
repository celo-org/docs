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
  $ celocli exchange:celo --from <value> --value <value> [--globalHelp]
    [--forAtLeast <value>] [--stableToken cUSD|cusd|cEUR|ceur|cREAL|creal]

FLAGS
  --forAtLeast=10000000000000000000000               [default: 0] Optional, the minimum
                                                     value of StableTokens to receive in
                                                     return
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) The address with CELO to
                                                     exchange
  --globalHelp                                       View all available global flags
  --stableToken=<option>                             [default: cusd] Name of the stable
                                                     to receive
                                                     <options:
                                                     cUSD|cusd|cEUR|ceur|cREAL|creal>
  --value=10000000000000000000000                    (required) The value of CELO to
                                                     exchange for a StableToken

DESCRIPTION
  Exchange CELO for StableTokens via Mento. (Note: this is the equivalent of the old
  exchange:gold)

EXAMPLES
  celo --value 5000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d

  celo --value 5000000000000 --forAtLeast 100000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --stableToken cStableTokenSymbol
```

_See code: [src/commands/exchange/celo.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/exchange/celo.ts)_

## `celocli exchange:dollars`

Exchange Celo Dollars for CELO via Mento

```
USAGE
  $ celocli exchange:dollars --from <value> --value <value> [--globalHelp]
    [--forAtLeast <value>]

FLAGS
  --forAtLeast=10000000000000000000000               [default: 0] Optional, the minimum
                                                     value of CELO to receive in return
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) The address with Celo
                                                     Dollars to exchange
  --globalHelp                                       View all available global flags
  --value=10000000000000000000000                    (required) The value of Celo
                                                     Dollars to exchange for CELO

DESCRIPTION
  Exchange Celo Dollars for CELO via Mento

EXAMPLES
  dollars --value 10000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d

  dollars --value 10000000000000 --forAtLeast 50000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
```

_See code: [src/commands/exchange/dollars.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/exchange/dollars.ts)_

## `celocli exchange:euros`

Exchange Celo Euros for CELO via Mento

```
USAGE
  $ celocli exchange:euros --from <value> --value <value> [--globalHelp]
    [--forAtLeast <value>]

FLAGS
  --forAtLeast=10000000000000000000000               [default: 0] Optional, the minimum
                                                     value of CELO to receive in return
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) The address with Celo
                                                     Euros to exchange
  --globalHelp                                       View all available global flags
  --value=10000000000000000000000                    (required) The value of Celo Euros
                                                     to exchange for CELO

DESCRIPTION
  Exchange Celo Euros for CELO via Mento

EXAMPLES
  euros --value 10000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d

  euros --value 10000000000000 --forAtLeast 50000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
```

_See code: [src/commands/exchange/euros.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/exchange/euros.ts)_

## `celocli exchange:reals`

Exchange Celo Brazilian Real (cREAL) for CELO via Mento

```
USAGE
  $ celocli exchange:reals --from <value> --value <value> [--globalHelp]
    [--forAtLeast <value>]

FLAGS
  --forAtLeast=10000000000000000000000               [default: 0] Optional, the minimum
                                                     value of CELO to receive in return
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) The address with Celo
                                                     Brazilian Real to exchange
  --globalHelp                                       View all available global flags
  --value=10000000000000000000000                    (required) The value of Celo
                                                     Brazilian Real to exchange for CELO

DESCRIPTION
  Exchange Celo Brazilian Real (cREAL) for CELO via Mento

EXAMPLES
  reals --value 10000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d

  reals --value 10000000000000 --forAtLeast 50000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
```

_See code: [src/commands/exchange/reals.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/exchange/reals.ts)_

## `celocli exchange:show`

Show the current exchange rates offered by the Broker

```
USAGE
  $ celocli exchange:show [--globalHelp] [--amount <value>]

FLAGS
  --amount=<value>  [default: 1000000000000000000] Amount of the token being exchanged
                    to report rates for
  --globalHelp      View all available global flags

DESCRIPTION
  Show the current exchange rates offered by the Broker

EXAMPLES
  list
```

_See code: [src/commands/exchange/show.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/exchange/show.ts)_

## `celocli exchange:stable`

Exchange Stable Token for CELO via Mento

```
USAGE
  $ celocli exchange:stable --from <value> --value <value> [--globalHelp]
    [--forAtLeast <value>] [--stableToken cUSD|cusd|cEUR|ceur|cREAL|creal]

FLAGS
  --forAtLeast=10000000000000000000000               [default: 0] Optional, the minimum
                                                     value of CELO to receive in return
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) The address with the
                                                     Stable Token to exchange
  --globalHelp                                       View all available global flags
  --stableToken=<option>                             Name of the stable token to be
                                                     transfered
                                                     <options:
                                                     cUSD|cusd|cEUR|ceur|cREAL|creal>
  --value=10000000000000000000000                    (required) The value of Stable
                                                     Tokens to exchange for CELO

DESCRIPTION
  Exchange Stable Token for CELO via Mento

EXAMPLES
  stable --value 10000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --stableToken cStableTokenSymbol

  stable --value 10000000000000 --forAtLeast 50000000000000 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --stableToken cStableTokenSymbol
```

_See code: [src/commands/exchange/stable.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/exchange/stable.ts)_
