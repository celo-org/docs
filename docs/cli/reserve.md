`celocli reserve`
=================

Shows information about reserve

* [`celocli reserve:status`](#celocli-reservestatus)
* [`celocli reserve:transfergold`](#celocli-reservetransfergold)

## `celocli reserve:status`

Shows information about reserve

```
USAGE
  $ celocli reserve:status [--gasCurrency <value>] [--globalHelp]

FLAGS
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Shows information about reserve

EXAMPLES
  status
```

_See code: [src/commands/reserve/status.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/reserve/status.ts)_

## `celocli reserve:transfergold`

Transfers reserve celo to other reserve address

```
USAGE
  $ celocli reserve:transfergold --value <value> --to <value> --from <value>
    [--gasCurrency <value>] [--globalHelp] [--useMultiSig]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Spender's address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --to=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d           (required) Receiving address
  --useMultiSig                                             True means the request will
                                                            be sent through multisig.
  --value=<value>                                           (required) The unit amount
                                                            of CELO

DESCRIPTION
  Transfers reserve celo to other reserve address

EXAMPLES
  transfergold --value 9000 --to 0x91c987bf62D25945dB517BDAa840A6c661374402 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

  transfergold --value 9000 --to 0x91c987bf62D25945dB517BDAa840A6c661374402 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --useMultiSig
```

_See code: [src/commands/reserve/transfergold.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/reserve/transfergold.ts)_
