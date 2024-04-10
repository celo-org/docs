`celocli dkg`
=============

Publish your locally computed DKG results to the blockchain

* [`celocli dkg:allowlist`](#celocli-dkgallowlist)
* [`celocli dkg:deploy`](#celocli-dkgdeploy)
* [`celocli dkg:get`](#celocli-dkgget)
* [`celocli dkg:publish`](#celocli-dkgpublish)
* [`celocli dkg:register`](#celocli-dkgregister)
* [`celocli dkg:start`](#celocli-dkgstart)

## `celocli dkg:allowlist` {#celocli-dkgallowlist}

Allowlist an address in the DKG

```
USAGE
  $ celocli dkg:allowlist --participantAddress <value> --address <value> --from
    <value> [--gasCurrency <value>] [--globalHelp]

FLAGS
  --address=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d      (required) DKG Contract
                                                            Address
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Address of the
                                                            sender
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --participantAddress=<value>                              (required) Address of the
                                                            participant to allowlist

DESCRIPTION
  Allowlist an address in the DKG
```

_See code: [src/commands/dkg/allowlist.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/dkg/allowlist.ts)_

## `celocli dkg:deploy` {#celocli-dkgdeploy}

Deploys the DKG smart contract

```
USAGE
  $ celocli dkg:deploy --phaseDuration <value> --threshold <value> --from
    <value> [--gasCurrency <value>] [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Address of the
                                                            sender
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --phaseDuration=<value>                                   (required) Duration of each
                                                            DKG phase in blocks
  --threshold=<value>                                       (required) The threshold to
                                                            use for the DKG

DESCRIPTION
  Deploys the DKG smart contract
```

_See code: [src/commands/dkg/deploy.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/dkg/deploy.ts)_

## `celocli dkg:get` {#celocli-dkgget}

Gets data from the contract to run the next phase

```
USAGE
  $ celocli dkg:get --method
    shares|responses|justifications|participants|phase|group --address <value>
    [--gasCurrency <value>] [--globalHelp]

FLAGS
  --address=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d      (required) DKG Contract
                                                            Address
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags
  --method=<option>                                         (required) Getter method to
                                                            call
                                                            <options: shares|responses|j
                                                            ustifications|participants|p
                                                            hase|group>

DESCRIPTION
  Gets data from the contract to run the next phase
```

_See code: [src/commands/dkg/get.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/dkg/get.ts)_

## `celocli dkg:publish` {#celocli-dkgpublish}

Publishes data for each phase of the DKG

```
USAGE
  $ celocli dkg:publish --data <value> --address <value> --from <value>
    [--gasCurrency <value>] [--globalHelp]

FLAGS
  --address=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d      (required) DKG Contract
                                                            Address
  --data=<value>                                            (required) Path to the data
                                                            being published
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Address of the
                                                            sender
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Publishes data for each phase of the DKG
```

_See code: [src/commands/dkg/publish.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/dkg/publish.ts)_

## `celocli dkg:register` {#celocli-dkgregister}

Register a public key in the DKG

```
USAGE
  $ celocli dkg:register --blsKey <value> --address <value> --from <value>
    [--gasCurrency <value>] [--globalHelp]

FLAGS
  --address=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d      (required) DKG Contract
                                                            Address
  --blsKey=<value>                                          (required)
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Address of the
                                                            sender
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Register a public key in the DKG
```

_See code: [src/commands/dkg/register.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/dkg/register.ts)_

## `celocli dkg:start` {#celocli-dkgstart}

Starts the DKG

```
USAGE
  $ celocli dkg:start --address <value> --from <value> [--gasCurrency <value>]
    [--globalHelp]

FLAGS
  --address=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d      (required) DKG Contract
                                                            Address
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d         (required) Address of the
                                                            sender
  --gasCurrency=0x1234567890123456789012345678901234567890  Use a specific gas currency
                                                            for transaction fees
                                                            (defaults to CELO if no gas
                                                            currency is supplied). It
                                                            must be a whitelisted token.
  --globalHelp                                              View all available global
                                                            flags

DESCRIPTION
  Starts the DKG
```

_See code: [src/commands/dkg/start.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/dkg/start.ts)_
