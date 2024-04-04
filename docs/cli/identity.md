`celocli identity`
==================

Interact with ODIS and the attestations service

* [`celocli identity:get-attestations`](#celocli-identityget-attestations)
* [`celocli identity:identifier`](#celocli-identityidentifier)
* [`celocli identity:withdraw-attestation-rewards`](#celocli-identitywithdraw-attestation-rewards)

## `celocli identity:get-attestations`

Looks up attestations associated with the provided phone number. If a pepper is not provided, it uses the --from account's balance to query the pepper.

```
USAGE
  $ celocli identity:get-attestations [--gasCurrency <value>] [--globalHelp] [--phoneNumber
    <value>] [--from <value>] [--pepper <value>] [--identifier <value>] [--network
    <value>]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         Account whose balance to use
                                                            for querying ODIS for the
                                                            pepper lookup
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --identifier=<value>                                      On-chain identifier
  --network=<value>                                         The ODIS service to hit:
                                                            mainnet, alfajores,
                                                            alfajoresstaging
  --pepper=<value>                                          ODIS phone number pepper
  --phoneNumber=<value>                                     Phone number to check
                                                            attestations for

DESCRIPTION
  Looks up attestations associated with the provided phone number. If a pepper is not
  provided, it uses the --from account's balance to query the pepper.

EXAMPLES
  get-attestations --phoneNumber +15555555555 --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95

  get-attestations --phoneNumber +15555555555 --pepper XgnKVpplZc0p1

  get-attestations --identifier 0x4952c9db9c283a62721b13f56c4b5e84a438e2569af3de21cb3440efa8840872
```

_See code: [src/commands/identity/get-attestations.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/identity/get-attestations.ts)_

## `celocli identity:identifier`

Queries ODIS for the on-chain identifier and pepper corresponding to a given phone number.

```
USAGE
  $ celocli identity:identifier --from <value> --phoneNumber <value> [--gasCurrency
    <value>] [--globalHelp] [--context <value>]

FLAGS
  --context=<value>                                         mainnet (default),
                                                            alfajores, or
                                                            alfajoresstaging
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) The address from
                                                            which to perform the query
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --phoneNumber=+14152223333                                (required) The phone number
                                                            for which to query the
                                                            identifier. Should be in
                                                            e164 format with country
                                                            code.

DESCRIPTION
  Queries ODIS for the on-chain identifier and pepper corresponding to a given phone
  number.

EXAMPLES
  identifier --phoneNumber +14151231234 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --context alfajores
```

_See code: [src/commands/identity/identifier.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/identity/identifier.ts)_

## `celocli identity:withdraw-attestation-rewards`

Withdraw accumulated attestation rewards for a given currency

```
USAGE
  $ celocli identity:withdraw-attestation-rewards --from <value> [--gasCurrency <value>] [--globalHelp]
    [--tokenAddress <value>]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address to withdraw from. Can be the attestation signer address or the
      underlying account address

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --tokenAddress=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      The address of the token that will be withdrawn. Defaults to cUSD

DESCRIPTION
  Withdraw accumulated attestation rewards for a given currency
```

_See code: [src/commands/identity/withdraw-attestation-rewards.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/identity/withdraw-attestation-rewards.ts)_
