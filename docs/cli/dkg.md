`celocli dkg`
=============

Publish your locally computed DKG results to the blockchain

* [`celocli dkg:allowlist`](#celocli-dkgallowlist)
* [`celocli dkg:deploy`](#celocli-dkgdeploy)
* [`celocli dkg:get`](#celocli-dkgget)
* [`celocli dkg:publish`](#celocli-dkgpublish)
* [`celocli dkg:register`](#celocli-dkgregister)
* [`celocli dkg:start`](#celocli-dkgstart)

## `celocli dkg:allowlist`

Allowlist an address in the DKG

```
USAGE
  $ celocli dkg:allowlist --participantAddress <value> --address
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --from
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --address=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) DKG Contract Address

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

  --participantAddress=<value>
      (required) Address of the participant to allowlist

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Allowlist an address in the DKG

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/dkg/allowlist.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/dkg/allowlist.ts)_

## `celocli dkg:deploy`

Deploys the DKG smart contract

```
USAGE
  $ celocli dkg:deploy --phaseDuration <value> --threshold <value> --from
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

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

  --phaseDuration=<value>
      (required) Duration of each DKG phase in blocks

  --threshold=<value>
      (required) The threshold to use for the DKG

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Deploys the DKG smart contract

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/dkg/deploy.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/dkg/deploy.ts)_

## `celocli dkg:get`

Gets data from the contract to run the next phase

```
USAGE
  $ celocli dkg:get --method
    shares|responses|justifications|participants|phase|group --address
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --address=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) DKG Contract Address

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --method=<option>
      (required) Getter method to call
      <options: shares|responses|justifications|participants|phase|group>

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Gets data from the contract to run the next phase

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/dkg/get.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/dkg/get.ts)_

## `celocli dkg:publish`

Publishes data for each phase of the DKG

```
USAGE
  $ celocli dkg:publish --data <value> --address
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --from
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --address=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) DKG Contract Address

  --data=<value>
      (required) Path to the data being published

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

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Publishes data for each phase of the DKG

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/dkg/publish.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/dkg/publish.ts)_

## `celocli dkg:register`

Register a public key in the DKG

```
USAGE
  $ celocli dkg:register --blsKey <value> --address
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --from
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --address=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) DKG Contract Address

  --blsKey=<value>
      (required)

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

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Register a public key in the DKG

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/dkg/register.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/dkg/register.ts)_

## `celocli dkg:start`

Starts the DKG

```
USAGE
  $ celocli dkg:start --address 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --address=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) DKG Contract Address

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

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Starts the DKG

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/dkg/start.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/dkg/start.ts)_
