`celocli account`
=================

Manage your account, keys, and metadata

* [`celocli account:authorize`](#celocli-accountauthorize)
* [`celocli account:balance ARG1`](#celocli-accountbalance-arg1)
* [`celocli account:claim-account ARG1`](#celocli-accountclaim-account-arg1)
* [`celocli account:claim-domain ARG1`](#celocli-accountclaim-domain-arg1)
* [`celocli account:claim-keybase ARG1`](#celocli-accountclaim-keybase-arg1)
* [`celocli account:claim-name ARG1`](#celocli-accountclaim-name-arg1)
* [`celocli account:claim-rpc-url ARG1`](#celocli-accountclaim-rpc-url-arg1)
* [`celocli account:claim-storage ARG1`](#celocli-accountclaim-storage-arg1)
* [`celocli account:create-metadata ARG1`](#celocli-accountcreate-metadata-arg1)
* [`celocli account:deauthorize`](#celocli-accountdeauthorize)
* [`celocli account:delete-payment-delegation`](#celocli-accountdelete-payment-delegation)
* [`celocli account:get-metadata ARG1`](#celocli-accountget-metadata-arg1)
* [`celocli account:get-payment-delegation`](#celocli-accountget-payment-delegation)
* [`celocli account:list`](#celocli-accountlist)
* [`celocli account:lock ARG1`](#celocli-accountlock-arg1)
* [`celocli account:new`](#celocli-accountnew)
* [`celocli account:offchain-read ARG1`](#celocli-accountoffchain-read-arg1)
* [`celocli account:offchain-write`](#celocli-accountoffchain-write)
* [`celocli account:proof-of-possession`](#celocli-accountproof-of-possession)
* [`celocli account:register`](#celocli-accountregister)
* [`celocli account:register-data-encryption-key`](#celocli-accountregister-data-encryption-key)
* [`celocli account:register-metadata`](#celocli-accountregister-metadata)
* [`celocli account:set-name`](#celocli-accountset-name)
* [`celocli account:set-payment-delegation`](#celocli-accountset-payment-delegation)
* [`celocli account:set-wallet`](#celocli-accountset-wallet)
* [`celocli account:show ARG1`](#celocli-accountshow-arg1)
* [`celocli account:show-claimed-accounts ARG1`](#celocli-accountshow-claimed-accounts-arg1)
* [`celocli account:show-metadata ARG1`](#celocli-accountshow-metadata-arg1)
* [`celocli account:unlock ARG1`](#celocli-accountunlock-arg1)
* [`celocli account:verify-proof-of-possession`](#celocli-accountverify-proof-of-possession)

## `celocli account:authorize`

Keep your locked Gold more secure by authorizing alternative keys to be used for signing attestations, voting, or validating. By doing so, you can continue to participate in the protocol while keeping the key with access to your locked Gold in cold storage. You must include a "proof-of-possession" of the key being authorized, which can be generated with the "account:proof-of-possession" command.

```
USAGE
  $ celocli account:authorize --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d -r
    vote|validator|attestation --signature 0x --signer
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  -r, --role=<option>
      (required) Role to delegate
      <options: vote|validator|attestation>

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

  --signature=0x
      (required) Signature (a.k.a proof-of-possession) of the signer key

  --signer=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Keep your locked Gold more secure by authorizing alternative keys to be used for
  signing attestations, voting, or validating. By doing so, you can continue to
  participate in the protocol while keeping the key with access to your locked Gold in
  cold storage. You must include a "proof-of-possession" of the key being authorized,
  which can be generated with the "account:proof-of-possession" command.

EXAMPLES
  authorize --from 0x5409ED021D9299bf6814279A6A1411A7e866A631 --role vote --signer 0x6ecbe1db9ef729cbe972c83fb886247691fb6beb --signature 0x1b9fca4bbb5bfb1dbe69ef1cddbd9b4202dcb6b134c5170611e1e36ecfa468d7b46c85328d504934fce6c2a1571603a50ae224d2b32685e84d4d1a1eebad8452eb

  authorize --from 0x5409ED021D9299bf6814279A6A1411A7e866A631 --role validator --signer 0x6ecbe1db9ef729cbe972c83fb886247691fb6beb --signature 0x1b9fca4bbb5bfb1dbe69ef1cddbd9b4202dcb6b134c5170611e1e36ecfa468d7b46c85328d504934fce6c2a1571603a50ae224d2b32685e84d4d1a1eebad8452eb --blsKey 0x4fa3f67fc913878b068d1fa1cdddc54913d3bf988dbe5a36a20fa888f20d4894c408a6773f3d7bde11154f2a3076b700d345a42fd25a0e5e83f4db5586ac7979ac2053cd95d8f2efd3e959571ceccaa743e02cf4be3f5d7aaddb0b06fc9aff00 --blsPop 0xcdb77255037eb68897cd487fdd85388cbda448f617f874449d4b11588b0b7ad8ddc20d9bb450b513bb35664ea3923900

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/authorize.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/authorize.js)_

## `celocli account:balance ARG1`

View Celo Stables and CELO balances for an address

```
USAGE
  $ celocli account:balance ARG1 [-n <value>] [--globalHelp] [--erc20Address
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d]

FLAGS
  -n, --node=<value>                                             URL of the node to run
                                                                 commands against or an
                                                                 alias
      --erc20Address=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  Address of generic
                                                                 ERC-20 token to also
                                                                 check balance for
      --globalHelp                                               View all available
                                                                 global flags

DESCRIPTION
  View Celo Stables and CELO balances for an address

EXAMPLES
  balance 0x5409ed021d9299bf6814279a6a1411a7e866a631

  balance 0x5409ed021d9299bf6814279a6a1411a7e866a631 --erc20Address 0x765DE816845861e75A25fCA122bb6898B8B1282a

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/balance.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/balance.js)_

## `celocli account:claim-account ARG1`

Claim another account, and optionally its public key, and add the claim to a local metadata file

```
USAGE
  $ celocli account:claim-account ARG1 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --address <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--publicKey <value>]

ARGUMENTS
  ARG1  Path of the metadata file

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --address=<value>
      (required) The address of the account you want to claim

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the account to set metadata for or an authorized signer for
      the address in the metadata

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

  --publicKey=<value>
      The public key of the account that others may use to send you encrypted messages

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Claim another account, and optionally its public key, and add the claim to a local
  metadata file

EXAMPLES
  claim-account ~/metadata.json --address 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/claim-account.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/claim-account.js)_

## `celocli account:claim-domain ARG1`

Claim a domain and add the claim to a local metadata file

```
USAGE
  $ celocli account:claim-domain ARG1 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --domain <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

ARGUMENTS
  ARG1  Path of the metadata file

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --domain=<value>
      (required) The domain you want to claim

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the account to set metadata for or an authorized signer for
      the address in the metadata

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
  Claim a domain and add the claim to a local metadata file

EXAMPLES
  claim-domain ~/metadata.json --domain example.com --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/claim-domain.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/claim-domain.js)_

## `celocli account:claim-keybase ARG1`

Claim a keybase username and add the claim to a local metadata file

```
USAGE
  $ celocli account:claim-keybase ARG1 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --username <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

ARGUMENTS
  ARG1  Path of the metadata file

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the account to set metadata for or an authorized signer for
      the address in the metadata

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

  --username=<value>
      (required) The keybase username you want to claim

DESCRIPTION
  Claim a keybase username and add the claim to a local metadata file

EXAMPLES
  claim-keybase ~/metadata.json --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --username myusername

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/claim-keybase.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/claim-keybase.js)_

## `celocli account:claim-name ARG1`

Claim a name and add the claim to a local metadata file

```
USAGE
  $ celocli account:claim-name ARG1 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --name <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

ARGUMENTS
  ARG1  Path of the metadata file

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the account to set metadata for or an authorized signer for
      the address in the metadata

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

  --name=<value>
      (required) The name you want to claim

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Claim a name and add the claim to a local metadata file

EXAMPLES
  claim-name ~/metadata.json --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95 --name myname

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/claim-name.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/claim-name.js)_

## `celocli account:claim-rpc-url ARG1`

Claim a RPC URL and add the claim to a local metadata file

```
USAGE
  $ celocli account:claim-rpc-url ARG1 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --rpcUrl https://www.celo.org [-k <value> | --useLedger | ] [-n <value>]
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--ledgerAddresses
    <value> ] [--ledgerLiveMode ] [--globalHelp]

ARGUMENTS
  ARG1  Path of the metadata file

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the account to set metadata for. Claiming address must be
      registered as validator

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

  --rpcUrl=https://www.celo.org
      (required) The RPC URL to claim

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Claim a RPC URL and add the claim to a local metadata file

EXAMPLES
  claim-rpc-url ~/metadata.json --rpc-url example.com --from 0x5409ED021D9299bf6814279A6A1411A7e866A631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/claim-rpc-url.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/claim-rpc-url.js)_

## `celocli account:claim-storage ARG1`

Claim a storage root and add the claim to a local metadata file

```
USAGE
  $ celocli account:claim-storage ARG1 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --url https://www.celo.org [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

ARGUMENTS
  ARG1  Path of the metadata file

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the account to set metadata for or an authorized signer for
      the address in the metadata

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

  --url=https://www.celo.org
      (required) The URL of the storage root you want to claim

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Claim a storage root and add the claim to a local metadata file

EXAMPLES
  claim-storage ~/metadata.json --url http://example.com/myurl --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/claim-storage.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/claim-storage.js)_

## `celocli account:create-metadata ARG1`

Create an empty identity metadata file. Use this metadata file to store claims attesting to ownership of off-chain resources. Claims can be generated with the account:claim-* commands.

```
USAGE
  $ celocli account:create-metadata ARG1 --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

ARGUMENTS
  ARG1  Path where the metadata should be saved

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the account to set metadata for or an authorized signer for
      the address in the metadata

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
  Create an empty identity metadata file. Use this metadata file to store claims
  attesting to ownership of off-chain resources. Claims can be generated with the
  account:claim-* commands.

EXAMPLES
  create-metadata ~/metadata.json --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/create-metadata.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/create-metadata.js)_

## `celocli account:deauthorize`

Remove an account's authorized attestation signer role.

```
USAGE
  $ celocli account:deauthorize --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d -r
    attestation --signer 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> |
    --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  -r, --role=<option>
      (required) Role to remove
      <options: attestation>

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

  --signer=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Remove an account's authorized attestation signer role.

EXAMPLES
  deauthorize --from 0x5409ED021D9299bf6814279A6A1411A7e866A631 --role attestation --signer 0x6ecbe1db9ef729cbe972c83fb886247691fb6beb

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/deauthorize.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/deauthorize.js)_

## `celocli account:delete-payment-delegation`

Removes a validator's payment delegation by setting beneficiary and fraction to 0.

```
USAGE
  $ celocli account:delete-payment-delegation --account 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
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
  Removes a validator's payment delegation by setting beneficiary and fraction to 0.

EXAMPLES
  delete-payment-delegation --account 0x5409ED021D9299bf6814279A6A1411A7e866A631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/delete-payment-delegation.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/delete-payment-delegation.js)_

## `celocli account:get-metadata ARG1`

Show information about an address. Retrieves the metadata URL for an account from the on-chain, then fetches the metadata file off-chain and verifies proofs as able.

```
USAGE
  $ celocli account:get-metadata ARG1 [-k <value> | --useLedger | ] [-n <value>]
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--ledgerAddresses
    <value> ] [--ledgerLiveMode ] [--globalHelp] [--columns <value> | -x] [--filter
    <value>] [--no-header | [--csv | --no-truncate]] [--output csv|json|yaml |  | ]
    [--sort <value>]

ARGUMENTS
  ARG1  Address to get metadata for

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  -x, --extended
      show extra columns

  --columns=<value>
      only show provided columns (comma-separated)

  --csv
      output is csv format [alias: --output=csv]

  --filter=<value>
      filter property by partial string matching, ex: name=foo

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

  --no-header
      hide table header from output

  --no-truncate
      do not truncate output to fit screen

  --output=<option>
      output in a more machine friendly format
      <options: csv|json|yaml>

  --sort=<value>
      property to sort by (prepend '-' for descending)

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Show information about an address. Retrieves the metadata URL for an account from the
  on-chain, then fetches the metadata file off-chain and verifies proofs as able.

EXAMPLES
  get-metadata 0x97f7333c51897469E8D98E7af8653aAb468050a3

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/get-metadata.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/get-metadata.js)_

## `celocli account:get-payment-delegation`

Get the payment delegation account beneficiary and fraction allocated from a validator's payment each epoch. The fraction cannot be greater than 1.

```
USAGE
  $ celocli account:get-payment-delegation --account 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--columns <value> | -x] [--filter <value>]
    [--no-header | [--csv | --no-truncate]] [--output csv|json|yaml |  | ] [--sort
    <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  -x, --extended
      show extra columns

  --account=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

  --columns=<value>
      only show provided columns (comma-separated)

  --csv
      output is csv format [alias: --output=csv]

  --filter=<value>
      filter property by partial string matching, ex: name=foo

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

  --no-header
      hide table header from output

  --no-truncate
      do not truncate output to fit screen

  --output=<option>
      output in a more machine friendly format
      <options: csv|json|yaml>

  --sort=<value>
      property to sort by (prepend '-' for descending)

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Get the payment delegation account beneficiary and fraction allocated from a
  validator's payment each epoch. The fraction cannot be greater than 1.

EXAMPLES
  get-payment-delegation --account 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/get-payment-delegation.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/get-payment-delegation.js)_

## `celocli account:list`

List the addresses from the node and the local instance

```
USAGE
  $ celocli account:list [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--local]

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

  --[no-]local
      If set, only show local and hardware wallet accounts. Use no-local to only show
      keystore addresses.

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  List the addresses from the node and the local instance

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/list.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/list.js)_

## `celocli account:lock ARG1`

Lock an account which was previously unlocked

```
USAGE
  $ celocli account:lock ARG1 [-k <value> | --useLedger | ] [-n <value>]
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--ledgerAddresses
    <value> ] [--ledgerLiveMode ] [--globalHelp]

ARGUMENTS
  ARG1  Account address

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
  Lock an account which was previously unlocked

EXAMPLES
  lock 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/lock.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/lock.js)_

## `celocli account:new`

Creates a new account locally using the --derivationPath if passed or the one set with config:set (defaults to m/44'/60'/0')  and print out the key information. Save this information for local transaction signing or import into a Celo node. Ledger: this command has been tested swapping mnemonics with the Ledger successfully (only supports english)

```
USAGE
  $ celocli account:new [-n <value>] [--globalHelp] [--passphrasePath <value>]
    [--changeIndex <value>] [--addressIndex <value>] [--language chinese_simplified|chin
    ese_traditional|english|french|italian|japanese|korean|spanish] [--mnemonicPath
    <value>] [--derivationPath <value>]

FLAGS
  -n, --node=<value>
      URL of the node to run commands against or an alias

  --addressIndex=<value>
      Choose the address index for the derivation path

  --changeIndex=<value>
      Choose the change index for the derivation path

  --derivationPath=<value>
      Derivation path in the format "m/44'/coin_type'/account'" or an alias

  --globalHelp
      View all available global flags

  --language=<option>
      [default: english] Language for the mnemonic words. **WARNING**, some hardware
      wallets don't support other languages
      <options: chinese_simplified|chinese_traditional|english|french|italian|japanese|kor
      ean|spanish>

  --mnemonicPath=<value>
      Instead of generating a new mnemonic (seed phrase), use the user-supplied mnemonic
      instead. Path to a file that contains all the mnemonic words separated by a space
      (example: "word1 word2 word3 ... word24"). If the words are a language other than
      English, the --language flag must be used. Only BIP39 mnemonics are supported

  --passphrasePath=<value>
      Path to a file that contains the BIP39 passphrase to combine with the mnemonic
      specified using the mnemonicPath flag and the index specified using the addressIndex
      flag. Every passphrase generates a different private key and wallet address.

DESCRIPTION
  Creates a new account locally using the --derivationPath if passed or the one set with
  config:set (defaults to m/44'/60'/0')  and print out the key information. Save this
  information for local transaction signing or import into a Celo node. Ledger: this
  command has been tested swapping mnemonics with the Ledger successfully (only supports
  english)

EXAMPLES
  new

  new --passphrasePath myFolder/my_passphrase_file

  new --language spanish

  new --passphrasePath some_folder/my_passphrase_file --language japanese --addressIndex 5

  new --passphrasePath some_folder/my_passphrase_file --mnemonicPath some_folder/my_mnemonic_file --addressIndex 5

  new --derivationPath eth

  new --derivationPath celoLegacy

  new --derivationPath "m/44'/60'/0'"

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',


  --derivationPath=<value>

    Derivation path in the format "m/44'/coin_type'/account'" or an alias

    Choose a different derivation Path (default is m/44'/60'/0'). Also aliased as "eth".
    Use "celoLegacy" as alias for old default: m/44'/52752'/0'. Recreating the same
    account requires knowledge of the mnemonic, passphrase (if any), and the derivation
    path. (use changeIndex, and addressIndex flags to change BIP44 positions 4 and 5)
```

_See code: [lib/commands/account/new.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/new.js)_

## `celocli account:offchain-read ARG1`

DEV: Reads the name from offchain storage

```
USAGE
  $ celocli account:offchain-read ARG1 [-k <value> | --useLedger | ] [-n <value>]
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--ledgerAddresses
    <value> ] [--ledgerLiveMode ] [--globalHelp] [--directory <value>] [--bucket <value>
    --provider git|aws|gcp] [--from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d]
    [--privateDEK <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --bucket=<value>
      If using a GCP or AWS storage bucket this parameter is required

  --directory=<value>
      [default: .] To which directory data should be written

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      Account Address

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

  --privateDEK=<value>

  --provider=<option>
      If the CLI should attempt to push to the cloud
      <options: git|aws|gcp>

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  DEV: Reads the name from offchain storage

EXAMPLES
  offchain-read 0x...

  offchain-read 0x... --from 0x... --privateKey 0x...

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/offchain-read.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/offchain-read.js)_

## `celocli account:offchain-write`

DEV: Writes a name to offchain storage

```
USAGE
  $ celocli account:offchain-write --name <value> [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> (--useLedger
    | --privateKey <value>)] [--ledgerLiveMode ] [--globalHelp] [--directory <value>]
    [--bucket <value> --provider git|aws|gcp] [--privateDEK <value>  --encryptTo
    <value>]

FLAGS
  -n, --node=<value>
      URL of the node to run commands against or an alias

  --bucket=<value>
      If using a GCP or AWS storage bucket this parameter is required

  --directory=<value>
      [default: .] To which directory data should be written

  --encryptTo=<value>

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

  --name=<value>
      (required)

  --privateDEK=<value>

  --privateKey=<value>
      (required)

  --provider=<option>
      If the CLI should attempt to push to the cloud
      <options: git|aws|gcp>

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  DEV: Writes a name to offchain storage

EXAMPLES
  offchain-write --name test-account --privateKey 0x...

  offchain-write --name test-account --privateKey 0x...  privateDEK 0x... --encryptTo 0x...

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/offchain-write.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/offchain-write.js)_

## `celocli account:proof-of-possession`

Generate proof-of-possession to be used to authorize a signer. See the "account:authorize" command for more details.

```
USAGE
  $ celocli account:proof-of-possession --signer 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --account 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ]
    [-n <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --account=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the account that needs to prove possession of the signer key.

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

  --signer=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the signer key to prove possession of.

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Generate proof-of-possession to be used to authorize a signer. See the
  "account:authorize" command for more details.

EXAMPLES
  proof-of-possession --account 0x5409ed021d9299bf6814279a6a1411a7e866a631 --signer 0x6ecbe1db9ef729cbe972c83fb886247691fb6beb

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/proof-of-possession.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/proof-of-possession.js)_

## `celocli account:register`

Register an account on-chain. This allows you to lock Gold, which is a pre-requisite for registering a Validator or Group, participating in Validator elections and on-chain Governance, and earning epoch rewards.

```
USAGE
  $ celocli account:register --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--name <value>]

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

  --name=<value>

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Register an account on-chain. This allows you to lock Gold, which is a pre-requisite
  for registering a Validator or Group, participating in Validator elections and
  on-chain Governance, and earning epoch rewards.

EXAMPLES
  register --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

  register --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --name test-account

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/register.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/register.js)_

## `celocli account:register-data-encryption-key`

Register a data encryption key for an account on chain. This key can be used to encrypt data to you such as offchain metadata or transaction comments

```
USAGE
  $ celocli account:register-data-encryption-key --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --publicKey <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the account to set the data encryption key for

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

  --publicKey=<value>
      (required) The public key you want to register

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Register a data encryption key for an account on chain. This key can be used to
  encrypt data to you such as offchain metadata or transaction comments

EXAMPLES
  register-data-encryption-key --publicKey 0x...  --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/register-data-encryption-key.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/register-data-encryption-key.js)_

## `celocli account:register-metadata`

Register metadata URL for an account where users will be able to retrieve the metadata file and verify your claims

```
USAGE
  $ celocli account:register-metadata --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --url
    <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--force] [--columns <value> | -x] [--filter
    <value>] [--no-header | [--csv | --no-truncate]] [--output csv|json|yaml |  | ]
    [--sort <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  -x, --extended
      show extra columns

  --columns=<value>
      only show provided columns (comma-separated)

  --csv
      output is csv format [alias: --output=csv]

  --filter=<value>
      filter property by partial string matching, ex: name=foo

  --force
      Ignore metadata validity checks

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the account to set metadata for

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

  --no-header
      hide table header from output

  --no-truncate
      do not truncate output to fit screen

  --output=<option>
      output in a more machine friendly format
      <options: csv|json|yaml>

  --sort=<value>
      property to sort by (prepend '-' for descending)

  --url=<value>
      (required) The url to the metadata you want to register

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Register metadata URL for an account where users will be able to retrieve the metadata
  file and verify your claims

EXAMPLES
  register-metadata --url https://www.mywebsite.com/celo-metadata --from 0x47e172F6CfB6c7D01C1574fa3E2Be7CC73269D95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/register-metadata.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/register-metadata.js)_

## `celocli account:set-name`

Sets the name of a registered account on-chain. An account's name is an optional human readable identifier

```
USAGE
  $ celocli account:set-name --account 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --name <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
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

  --name=<value>
      (required)

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Sets the name of a registered account on-chain. An account's name is an optional human
  readable identifier

EXAMPLES
  set-name --account 0x5409ed021d9299bf6814279a6a1411a7e866a631 --name test-account

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/set-name.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/set-name.js)_

## `celocli account:set-payment-delegation`

Sets a payment delegation beneficiary, an account address to receive a fraction of the validator's payment every epoch. The fraction must not be greater than 1.

```
USAGE
  $ celocli account:set-payment-delegation --account 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --beneficiary 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --fraction <value> [-k
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

  --beneficiary=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

  --fraction=<value>
      (required)

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
  Sets a payment delegation beneficiary, an account address to receive a fraction of the
  validator's payment every epoch. The fraction must not be greater than 1.

EXAMPLES
  set-payment-delegation --account 0x5409ed021d9299bf6814279a6a1411a7e866a631 --beneficiary 0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb --fraction 0.1

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/set-payment-delegation.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/set-payment-delegation.js)_

## `celocli account:set-wallet`

Sets the wallet of a registered account on-chain. An account's wallet is an optional wallet associated with an account. Can be set by the account or an account's signer.

```
USAGE
  $ celocli account:set-wallet --account 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --wallet 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ]
    [-n <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--ledgerLiveMode ] [--globalHelp] [--signature 0x]
    [--signer 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d]

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

  --signature=0x
      Signature (a.k.a. proof-of-possession) of the signer key

  --signer=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      Address of the signer key to verify proof of possession.

  --useLedger
      Set it to use a ledger wallet

  --wallet=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Account Address

DESCRIPTION
  Sets the wallet of a registered account on-chain. An account's wallet is an optional
  wallet associated with an account. Can be set by the account or an account's signer.

EXAMPLES
  set-wallet --account 0x5409ed021d9299bf6814279a6a1411a7e866a631 --wallet 0x5409ed021d9299bf6814279a6a1411a7e866a631

  set-wallet --account 0x5409ed021d9299bf6814279a6a1411a7e866a631 --wallet 0x5409ed021d9299bf6814279a6a1411a7e866a631 --signer 0x0EdeDF7B1287f07db348997663EeEb283D70aBE7 --signature 0x1c5efaa1f7ca6484d49ccce76217e2fba0552c0b23462cff7ba646473bc2717ffc4ce45be89bd5be9b5d23305e87fc2896808467c4081d9524a84c01b89ec91ca3

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/set-wallet.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/set-wallet.js)_

## `celocli account:show ARG1`

Show information for an account, including name, authorized vote, validator, and attestation signers, the URL at which account metadata is hosted, the address the account is using with the mobile wallet, and a public key that can be used to encrypt information for the account.

```
USAGE
  $ celocli account:show ARG1 [-n <value>] [--globalHelp]

FLAGS
  -n, --node=<value>  URL of the node to run commands against or an alias
      --globalHelp    View all available global flags

DESCRIPTION
  Show information for an account, including name, authorized vote, validator, and
  attestation signers, the URL at which account metadata is hosted, the address the
  account is using with the mobile wallet, and a public key that can be used to encrypt
  information for the account.

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

_See code: [lib/commands/account/show.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/show.js)_

## `celocli account:show-claimed-accounts ARG1`

Show information about claimed accounts

```
USAGE
  $ celocli account:show-claimed-accounts ARG1 [-k <value> | --useLedger | ] [-n <value>]
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--ledgerAddresses
    <value> ] [--ledgerLiveMode ] [--globalHelp]

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
  Show information about claimed accounts

EXAMPLES
  show-claimed-accounts 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/show-claimed-accounts.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/show-claimed-accounts.js)_

## `celocli account:show-metadata ARG1`

Show the data in a local metadata file

```
USAGE
  $ celocli account:show-metadata ARG1 [-n <value>] [--globalHelp] [--columns <value> | -x]
    [--filter <value>] [--no-header | [--csv | --no-truncate]] [--output csv|json|yaml |
    | ] [--sort <value>]

ARGUMENTS
  ARG1  Path of the metadata file

FLAGS
  -n, --node=<value>     URL of the node to run commands against or an alias
  -x, --extended         show extra columns
      --columns=<value>  only show provided columns (comma-separated)
      --csv              output is csv format [alias: --output=csv]
      --filter=<value>   filter property by partial string matching, ex: name=foo
      --globalHelp       View all available global flags
      --no-header        hide table header from output
      --no-truncate      do not truncate output to fit screen
      --output=<option>  output in a more machine friendly format
                         <options: csv|json|yaml>
      --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  Show the data in a local metadata file

EXAMPLES
  show-metadata ~/metadata.json

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/show-metadata.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/show-metadata.js)_

## `celocli account:unlock ARG1`

Unlock an account address to send transactions or validate blocks

```
USAGE
  $ celocli account:unlock ARG1 [-k <value> | --useLedger | ] [-n <value>]
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--ledgerAddresses
    <value> ] [--ledgerLiveMode ] [--globalHelp] [--password <value>] [--duration
    <value>]

ARGUMENTS
  ARG1  Account address

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --duration=<value>
      Duration in seconds to leave the account unlocked. Unlocks until the node exits by
      default.

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

  --password=<value>
      Password used to unlock the account. If not specified, you will be prompted for a
      password.

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Unlock an account address to send transactions or validate blocks

EXAMPLES
  unlock 0x5409ed021d9299bf6814279a6a1411a7e866a631

  unlock 0x5409ed021d9299bf6814279a6a1411a7e866a631 --duration 600

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/unlock.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/unlock.js)_

## `celocli account:verify-proof-of-possession`

Verify a proof-of-possession. See the "account:proof-of-possession" command for more details.

```
USAGE
  $ celocli account:verify-proof-of-possession --signer 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --account 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --signature 0x [-k <value> |
    --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --account=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the account that needs to prove possession of the signer key.

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

  --signature=0x
      (required) Signature (a.k.a. proof-of-possession) of the signer key

  --signer=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address of the signer key to verify proof of possession.

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Verify a proof-of-possession. See the "account:proof-of-possession" command for more
  details.

EXAMPLES
  verify-proof-of-possession --account 0x199eDF79ABCa29A2Fa4014882d3C13dC191A5B58 --signer 0x0EdeDF7B1287f07db348997663EeEb283D70aBE7 --signature 0x1c5efaa1f7ca6484d49ccce76217e2fba0552c0b23462cff7ba646473bc2717ffc4ce45be89bd5be9b5d23305e87fc2896808467c4081d9524a84c01b89ec91ca3

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/account/verify-proof-of-possession.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/account/verify-proof-of-possession.js)_
