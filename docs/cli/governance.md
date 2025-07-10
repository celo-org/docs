`celocli governance`
====================

Interact with on-chain governance proposals and hotfixes

* [`celocli governance:approve`](#celocli-governanceapprove)
* [`celocli governance:approvehotfix`](#celocli-governanceapprovehotfix)
* [`celocli governance:build-proposal`](#celocli-governancebuild-proposal)
* [`celocli governance:dequeue`](#celocli-governancedequeue)
* [`celocli governance:execute`](#celocli-governanceexecute)
* [`celocli governance:executehotfix`](#celocli-governanceexecutehotfix)
* [`celocli governance:hashhotfix`](#celocli-governancehashhotfix)
* [`celocli governance:list`](#celocli-governancelist)
* [`celocli governance:preparehotfix`](#celocli-governancepreparehotfix)
* [`celocli governance:propose`](#celocli-governancepropose)
* [`celocli governance:revokeupvote`](#celocli-governancerevokeupvote)
* [`celocli governance:show`](#celocli-governanceshow)
* [`celocli governance:showaccount`](#celocli-governanceshowaccount)
* [`celocli governance:showhotfix`](#celocli-governanceshowhotfix)
* [`celocli governance:upvote`](#celocli-governanceupvote)
* [`celocli governance:view`](#celocli-governanceview)
* [`celocli governance:viewaccount`](#celocli-governanceviewaccount)
* [`celocli governance:viewhotfix`](#celocli-governanceviewhotfix)
* [`celocli governance:vote`](#celocli-governancevote)
* [`celocli governance:votePartially`](#celocli-governancevotepartially)
* [`celocli governance:whitelisthotfix`](#celocli-governancewhitelisthotfix)
* [`celocli governance:withdraw`](#celocli-governancewithdraw)

## `celocli governance:approve`

Approve a dequeued governance proposal (or hotfix). Only authorized approvers may use this command

```
USAGE
  $ celocli governance:approve --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--proposalID <value> | --hotfix <value>]
    [--useMultiSig | --useSafe] [--type approver|securityCouncil ]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Approver's address

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --hotfix=<value>
      Hash of hotfix proposal

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --ledgerLiveMode
      When set, the 4th postion of the derivation path will be iterated over instead of
      the 5th. This is useful to use same address on you Ledger with celocli as you do on
      Ledger Live

  --proposalID=<value>
      UUID of proposal to approve

  --type=<option>
      Determines which type of hotfix approval (approver or security council) to use.
      <options: approver|securityCouncil>

  --useLedger
      Set it to use a ledger wallet

  --useMultiSig
      True means the request will be sent through multisig.

  --useSafe
      True means the request will be sent through SAFE (http://safe.global)

DESCRIPTION
  Approve a dequeued governance proposal (or hotfix). Only authorized approvers may use
  this command

ALIASES
  $ celocli governance:approvehotfix

EXAMPLES
  approve --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

  approve --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --useMultiSig

  approve --hotfix 0xfcfc98ec3db7c56f0866a7149e811bf7f9e30c9d40008b0def497fcc6fe90649 --from 0xCc50EaC48bA71343dC76852FAE1892c6Bd2971DA --useMultiSig

  approve --hotfix 0xfcfc98ec3db7c56f0866a7149e811bf7f9e30c9d40008b0def497fcc6fe90649 --from 0xCc50EaC48bA71343dC76852FAE1892c6Bd2971DA --useMultiSig --type securityCouncil

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/approve.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/approve.js)_

## `celocli governance:approvehotfix`

Approve a dequeued governance proposal (or hotfix). Only authorized approvers may use this command

```
USAGE
  $ celocli governance:approvehotfix --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--proposalID <value> | --hotfix <value>]
    [--useMultiSig | --useSafe] [--type approver|securityCouncil ]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Approver's address

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --hotfix=<value>
      Hash of hotfix proposal

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --ledgerLiveMode
      When set, the 4th postion of the derivation path will be iterated over instead of
      the 5th. This is useful to use same address on you Ledger with celocli as you do on
      Ledger Live

  --proposalID=<value>
      UUID of proposal to approve

  --type=<option>
      Determines which type of hotfix approval (approver or security council) to use.
      <options: approver|securityCouncil>

  --useLedger
      Set it to use a ledger wallet

  --useMultiSig
      True means the request will be sent through multisig.

  --useSafe
      True means the request will be sent through SAFE (http://safe.global)

DESCRIPTION
  Approve a dequeued governance proposal (or hotfix). Only authorized approvers may use
  this command

ALIASES
  $ celocli governance:approvehotfix

EXAMPLES
  approve --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

  approve --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --useMultiSig

  approve --hotfix 0xfcfc98ec3db7c56f0866a7149e811bf7f9e30c9d40008b0def497fcc6fe90649 --from 0xCc50EaC48bA71343dC76852FAE1892c6Bd2971DA --useMultiSig

  approve --hotfix 0xfcfc98ec3db7c56f0866a7149e811bf7f9e30c9d40008b0def497fcc6fe90649 --from 0xCc50EaC48bA71343dC76852FAE1892c6Bd2971DA --useMultiSig --type securityCouncil

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli governance:build-proposal`

Interactively build a governance proposal

```
USAGE
  $ celocli governance:build-proposal [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--output <value>] [--afterExecutingProposal
    <value> | --afterExecutingID <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --afterExecutingID=<value>
      Governance proposal identifier which will be executed prior to proposal being built

  --afterExecutingProposal=<value>
      Path to proposal which will be executed prior to proposal being built

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

  --output=<value>
      [default: proposalTransactions.json] Path to output

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Interactively build a governance proposal

EXAMPLES
  build-proposal --output ./transactions.json

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/build-proposal.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/build-proposal.js)_

## `celocli governance:dequeue`

Try to dequeue governance proposal

```
USAGE
  $ celocli governance:dequeue --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) From address

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
  Try to dequeue governance proposal

EXAMPLES
  dequeue --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/dequeue.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/dequeue.js)_

## `celocli governance:execute`

Execute a passing governance proposal

```
USAGE
  $ celocli governance:execute --proposalID <value> --from
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Executor's address

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

  --proposalID=<value>
      (required) UUID of proposal to execute

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Execute a passing governance proposal

EXAMPLES
  execute --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/execute.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/execute.js)_

## `celocli governance:executehotfix`

Execute a governance hotfix prepared for the current epoch

```
USAGE
  $ celocli governance:executehotfix --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    --jsonTransactions <value> --salt <value> [-k <value> | --useLedger | ] [-n <value>]
    [--gasCurrency 0x1234567890123456789012345678901234567890] [--ledgerAddresses
    <value> ] [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Executors's address

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --jsonTransactions=<value>
      (required) Path to json transactions

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --ledgerLiveMode
      When set, the 4th postion of the derivation path will be iterated over instead of
      the 5th. This is useful to use same address on you Ledger with celocli as you do on
      Ledger Live

  --salt=<value>
      (required) Secret salt associated with hotfix

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Execute a governance hotfix prepared for the current epoch

EXAMPLES
  executehotfix --jsonTransactions ./transactions.json --salt 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/executehotfix.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/executehotfix.js)_

## `celocli governance:hashhotfix`

Hash a governance hotfix specified by JSON and a salt

```
USAGE
  $ celocli governance:hashhotfix --jsonTransactions <value> --salt <value> [-k <value> |
    --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--force]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --force
      Skip execution check

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --jsonTransactions=<value>
      (required) Path to json transactions of the hotfix

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --ledgerLiveMode
      When set, the 4th postion of the derivation path will be iterated over instead of
      the 5th. This is useful to use same address on you Ledger with celocli as you do on
      Ledger Live

  --salt=<value>
      (required) Secret salt associated with hotfix

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Hash a governance hotfix specified by JSON and a salt

EXAMPLES
  hashhotfix --jsonTransactions ./transactions.json --salt 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/hashhotfix.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/hashhotfix.js)_

## `celocli governance:list`

List live governance proposals (queued and ongoing)

```
USAGE
  $ celocli governance:list [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
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
  List live governance proposals (queued and ongoing)

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

_See code: [lib/commands/governance/list.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/list.js)_

## `celocli governance:preparehotfix`

Prepare a governance hotfix for execution in the current epoch

```
USAGE
  $ celocli governance:preparehotfix --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --hash
    <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Preparer's address

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --hash=<value>
      (required) Hash of hotfix transactions

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
  Prepare a governance hotfix for execution in the current epoch

EXAMPLES
  preparehotfix --hash 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/preparehotfix.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/preparehotfix.js)_

## `celocli governance:propose`

Submit a governance proposal

```
USAGE
  $ celocli governance:propose --jsonTransactions <value> --deposit <value> --from
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --descriptionURL <value> [-k <value> |
    --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--for 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    [--useMultiSig | --useSafe]] [--safeAddress
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d ] [--force] [--noInfo]
    [--afterExecutingProposal <value> | --afterExecutingID <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --afterExecutingID=<value>
      Governance proposal identifier which will be executed prior to proposal

  --afterExecutingProposal=<value>
      Path to proposal which will be executed prior to proposal

  --deposit=<value>
      (required) Amount of Celo to attach to proposal

  --descriptionURL=<value>
      (required) A URL where further information about the proposal can be viewed. This
      needs to be a valid proposal URL on https://github.com/celo-org/governance

  --for=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      Address of the multi-sig contract

  --force
      Skip execution check

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Proposer's address

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --jsonTransactions=<value>
      (required) Path to json transactions

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --ledgerLiveMode
      When set, the 4th postion of the derivation path will be iterated over instead of
      the 5th. This is useful to use same address on you Ledger with celocli as you do on
      Ledger Live

  --noInfo
      Skip printing the proposal info

  --safeAddress=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      Address of the safe.

  --useLedger
      Set it to use a ledger wallet

  --useMultiSig
      True means the request will be sent through multisig.

  --useSafe
      True means the request will be sent through SAFE (http://safe.global).

DESCRIPTION
  Submit a governance proposal

EXAMPLES
  propose --jsonTransactions ./transactions.json --deposit 10000e18 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --descriptionURL https://github.com/celo-org/governance/blob/main/CGPs/cgp-00000.md

  propose --jsonTransactions ./transactions.json --deposit 10000e18 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631  --useMultiSig --for 0x6c3dDFB1A9e73B5F49eDD46624F4954Bf66CAe93 --descriptionURL https://github.com/celo-org/governance/blob/main/CGPs/gcp-00000.md

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/propose.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/propose.js)_

## `celocli governance:revokeupvote`

Revoke upvotes for queued governance proposals

```
USAGE
  $ celocli governance:revokeupvote --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Upvoter's address

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
  Revoke upvotes for queued governance proposals

EXAMPLES
  revokeupvote --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/revokeupvote.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/revokeupvote.js)_

## `celocli governance:show`

Show information about a governance proposal, hotfix, or account.

```
USAGE
  $ celocli governance:show [-n <value>] [--globalHelp] [--raw] [--jsonTransactions
    <value>] [--notwhitelisted] [--whitelisters | --nonwhitelisters |  | [--proposalID
    <value> | --account <value> | --hotfix <value>]] [--afterExecutingProposal <value> |
    --afterExecutingID <value>]

FLAGS
  -n, --node=<value>                    URL of the node to run commands against or an
                                        alias
      --account=<value>                 Address of account or voter
      --afterExecutingID=<value>        Governance proposal identifier which will be
                                        executed prior to proposal
      --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                        proposal
      --globalHelp                      View all available global flags
      --hotfix=<value>                  Hash of hotfix proposal
      --jsonTransactions=<value>        Output proposal JSON to provided file
      --nonwhitelisters                 If set, displays validators that have not
                                        whitelisted the hotfix.(will be removed when L2
                                        launches
      --notwhitelisted                  List validators who have not whitelisted the
                                        specified hotfix (will be removed when L2
                                        launches
      --proposalID=<value>              UUID of proposal to view
      --raw                             Display proposal in raw bytes format
      --whitelisters                    If set, displays validators that have
                                        whitelisted the hotfix.(will be removed when L2
                                        launches

DESCRIPTION
  Show information about a governance proposal, hotfix, or account.

ALIASES
  $ celocli governance:show
  $ celocli governance:showhotfix
  $ celocli governance:showaccount
  $ celocli governance:view
  $ celocli governance:viewhotfix
  $ celocli governance:viewaccount

EXAMPLES
  show --proposalID 99

  show --proposalID 99 --raw

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --whitelisters

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --nonwhitelisters

  show --account 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/show.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/show.js)_

## `celocli governance:showaccount`

Show information about a governance proposal, hotfix, or account.

```
USAGE
  $ celocli governance:showaccount [-n <value>] [--globalHelp] [--raw] [--jsonTransactions
    <value>] [--notwhitelisted] [--whitelisters | --nonwhitelisters |  | [--proposalID
    <value> | --account <value> | --hotfix <value>]] [--afterExecutingProposal <value> |
    --afterExecutingID <value>]

FLAGS
  -n, --node=<value>                    URL of the node to run commands against or an
                                        alias
      --account=<value>                 Address of account or voter
      --afterExecutingID=<value>        Governance proposal identifier which will be
                                        executed prior to proposal
      --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                        proposal
      --globalHelp                      View all available global flags
      --hotfix=<value>                  Hash of hotfix proposal
      --jsonTransactions=<value>        Output proposal JSON to provided file
      --nonwhitelisters                 If set, displays validators that have not
                                        whitelisted the hotfix.(will be removed when L2
                                        launches
      --notwhitelisted                  List validators who have not whitelisted the
                                        specified hotfix (will be removed when L2
                                        launches
      --proposalID=<value>              UUID of proposal to view
      --raw                             Display proposal in raw bytes format
      --whitelisters                    If set, displays validators that have
                                        whitelisted the hotfix.(will be removed when L2
                                        launches

DESCRIPTION
  Show information about a governance proposal, hotfix, or account.

ALIASES
  $ celocli governance:show
  $ celocli governance:showhotfix
  $ celocli governance:showaccount
  $ celocli governance:view
  $ celocli governance:viewhotfix
  $ celocli governance:viewaccount

EXAMPLES
  show --proposalID 99

  show --proposalID 99 --raw

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --whitelisters

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --nonwhitelisters

  show --account 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli governance:showhotfix`

Show information about a governance proposal, hotfix, or account.

```
USAGE
  $ celocli governance:showhotfix [-n <value>] [--globalHelp] [--raw] [--jsonTransactions
    <value>] [--notwhitelisted] [--whitelisters | --nonwhitelisters |  | [--proposalID
    <value> | --account <value> | --hotfix <value>]] [--afterExecutingProposal <value> |
    --afterExecutingID <value>]

FLAGS
  -n, --node=<value>                    URL of the node to run commands against or an
                                        alias
      --account=<value>                 Address of account or voter
      --afterExecutingID=<value>        Governance proposal identifier which will be
                                        executed prior to proposal
      --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                        proposal
      --globalHelp                      View all available global flags
      --hotfix=<value>                  Hash of hotfix proposal
      --jsonTransactions=<value>        Output proposal JSON to provided file
      --nonwhitelisters                 If set, displays validators that have not
                                        whitelisted the hotfix.(will be removed when L2
                                        launches
      --notwhitelisted                  List validators who have not whitelisted the
                                        specified hotfix (will be removed when L2
                                        launches
      --proposalID=<value>              UUID of proposal to view
      --raw                             Display proposal in raw bytes format
      --whitelisters                    If set, displays validators that have
                                        whitelisted the hotfix.(will be removed when L2
                                        launches

DESCRIPTION
  Show information about a governance proposal, hotfix, or account.

ALIASES
  $ celocli governance:show
  $ celocli governance:showhotfix
  $ celocli governance:showaccount
  $ celocli governance:view
  $ celocli governance:viewhotfix
  $ celocli governance:viewaccount

EXAMPLES
  show --proposalID 99

  show --proposalID 99 --raw

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --whitelisters

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --nonwhitelisters

  show --account 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli governance:upvote`

Upvote a queued governance proposal

```
USAGE
  $ celocli governance:upvote --proposalID <value> --from
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Upvoter's address

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

  --proposalID=<value>
      (required) UUID of proposal to upvote

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Upvote a queued governance proposal

EXAMPLES
  upvote --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/upvote.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/upvote.js)_

## `celocli governance:view`

Show information about a governance proposal, hotfix, or account.

```
USAGE
  $ celocli governance:view [-n <value>] [--globalHelp] [--raw] [--jsonTransactions
    <value>] [--notwhitelisted] [--whitelisters | --nonwhitelisters |  | [--proposalID
    <value> | --account <value> | --hotfix <value>]] [--afterExecutingProposal <value> |
    --afterExecutingID <value>]

FLAGS
  -n, --node=<value>                    URL of the node to run commands against or an
                                        alias
      --account=<value>                 Address of account or voter
      --afterExecutingID=<value>        Governance proposal identifier which will be
                                        executed prior to proposal
      --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                        proposal
      --globalHelp                      View all available global flags
      --hotfix=<value>                  Hash of hotfix proposal
      --jsonTransactions=<value>        Output proposal JSON to provided file
      --nonwhitelisters                 If set, displays validators that have not
                                        whitelisted the hotfix.(will be removed when L2
                                        launches
      --notwhitelisted                  List validators who have not whitelisted the
                                        specified hotfix (will be removed when L2
                                        launches
      --proposalID=<value>              UUID of proposal to view
      --raw                             Display proposal in raw bytes format
      --whitelisters                    If set, displays validators that have
                                        whitelisted the hotfix.(will be removed when L2
                                        launches

DESCRIPTION
  Show information about a governance proposal, hotfix, or account.

ALIASES
  $ celocli governance:show
  $ celocli governance:showhotfix
  $ celocli governance:showaccount
  $ celocli governance:view
  $ celocli governance:viewhotfix
  $ celocli governance:viewaccount

EXAMPLES
  show --proposalID 99

  show --proposalID 99 --raw

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --whitelisters

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --nonwhitelisters

  show --account 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli governance:viewaccount`

Show information about a governance proposal, hotfix, or account.

```
USAGE
  $ celocli governance:viewaccount [-n <value>] [--globalHelp] [--raw] [--jsonTransactions
    <value>] [--notwhitelisted] [--whitelisters | --nonwhitelisters |  | [--proposalID
    <value> | --account <value> | --hotfix <value>]] [--afterExecutingProposal <value> |
    --afterExecutingID <value>]

FLAGS
  -n, --node=<value>                    URL of the node to run commands against or an
                                        alias
      --account=<value>                 Address of account or voter
      --afterExecutingID=<value>        Governance proposal identifier which will be
                                        executed prior to proposal
      --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                        proposal
      --globalHelp                      View all available global flags
      --hotfix=<value>                  Hash of hotfix proposal
      --jsonTransactions=<value>        Output proposal JSON to provided file
      --nonwhitelisters                 If set, displays validators that have not
                                        whitelisted the hotfix.(will be removed when L2
                                        launches
      --notwhitelisted                  List validators who have not whitelisted the
                                        specified hotfix (will be removed when L2
                                        launches
      --proposalID=<value>              UUID of proposal to view
      --raw                             Display proposal in raw bytes format
      --whitelisters                    If set, displays validators that have
                                        whitelisted the hotfix.(will be removed when L2
                                        launches

DESCRIPTION
  Show information about a governance proposal, hotfix, or account.

ALIASES
  $ celocli governance:show
  $ celocli governance:showhotfix
  $ celocli governance:showaccount
  $ celocli governance:view
  $ celocli governance:viewhotfix
  $ celocli governance:viewaccount

EXAMPLES
  show --proposalID 99

  show --proposalID 99 --raw

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --whitelisters

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --nonwhitelisters

  show --account 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli governance:viewhotfix`

Show information about a governance proposal, hotfix, or account.

```
USAGE
  $ celocli governance:viewhotfix [-n <value>] [--globalHelp] [--raw] [--jsonTransactions
    <value>] [--notwhitelisted] [--whitelisters | --nonwhitelisters |  | [--proposalID
    <value> | --account <value> | --hotfix <value>]] [--afterExecutingProposal <value> |
    --afterExecutingID <value>]

FLAGS
  -n, --node=<value>                    URL of the node to run commands against or an
                                        alias
      --account=<value>                 Address of account or voter
      --afterExecutingID=<value>        Governance proposal identifier which will be
                                        executed prior to proposal
      --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                        proposal
      --globalHelp                      View all available global flags
      --hotfix=<value>                  Hash of hotfix proposal
      --jsonTransactions=<value>        Output proposal JSON to provided file
      --nonwhitelisters                 If set, displays validators that have not
                                        whitelisted the hotfix.(will be removed when L2
                                        launches
      --notwhitelisted                  List validators who have not whitelisted the
                                        specified hotfix (will be removed when L2
                                        launches
      --proposalID=<value>              UUID of proposal to view
      --raw                             Display proposal in raw bytes format
      --whitelisters                    If set, displays validators that have
                                        whitelisted the hotfix.(will be removed when L2
                                        launches

DESCRIPTION
  Show information about a governance proposal, hotfix, or account.

ALIASES
  $ celocli governance:show
  $ celocli governance:showhotfix
  $ celocli governance:showaccount
  $ celocli governance:view
  $ celocli governance:viewhotfix
  $ celocli governance:viewaccount

EXAMPLES
  show --proposalID 99

  show --proposalID 99 --raw

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --whitelisters

  show --hotfix 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --nonwhitelisters

  show --account 0x47e172f6cfb6c7d01c1574fa3e2be7cc73269d95

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

## `celocli governance:vote`

Vote on an approved governance proposal

```
USAGE
  $ celocli governance:vote --proposalID 10000000000000000000000 --value
    Abstain|No|Yes --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> |
    --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Voter's address

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

  --proposalID=10000000000000000000000
      (required) UUID of proposal to vote on

  --useLedger
      Set it to use a ledger wallet

  --value=<option>
      (required) Vote
      <options: Abstain|No|Yes>

DESCRIPTION
  Vote on an approved governance proposal

EXAMPLES
  vote --proposalID 99 --value Yes --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/vote.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/vote.js)_

## `celocli governance:votePartially`

Vote partially on an approved governance proposal

```
USAGE
  $ celocli governance:votePartially --proposalID <value> --from
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k <value> | --useLedger | ] [-n
    <value>] [--gasCurrency 0x1234567890123456789012345678901234567890]
    [--ledgerAddresses <value> ] [--ledgerLiveMode ] [--globalHelp] [--yes <value>]
    [--no <value>] [--abstain <value>]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --abstain=<value>
      Abstain votes

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Voter's address

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

  --no=<value>
      No votes

  --proposalID=<value>
      (required) UUID of proposal to vote on

  --useLedger
      Set it to use a ledger wallet

  --yes=<value>
      Yes votes

DESCRIPTION
  Vote partially on an approved governance proposal

EXAMPLES
  vote-partially --proposalID 99 --yes 10 --no 20 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/votePartially.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/votePartially.js)_

## `celocli governance:whitelisthotfix`

Whitelist a governance hotfix

```
USAGE
  $ celocli governance:whitelisthotfix --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d --hash
    <value> [-k <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Whitelister's address

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --hash=<value>
      (required) Hash of hotfix transactions

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
  Whitelist a governance hotfix

EXAMPLES
  whitelisthotfix --hash 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/whitelisthotfix.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/whitelisthotfix.js)_

## `celocli governance:withdraw`

Withdraw refunded governance proposal deposits.

```
USAGE
  $ celocli governance:withdraw --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--for 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
    [--useMultiSig | --useSafe]] [--safeAddress
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d ]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --for=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      Address of the multi-sig contract

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Proposer's address

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

  --safeAddress=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      Address of the safe.

  --useLedger
      Set it to use a ledger wallet

  --useMultiSig
      True means the request will be sent through multisig.

  --useSafe
      True means the request will be sent through SAFE (http://safe.global).

DESCRIPTION
  Withdraw refunded governance proposal deposits.

EXAMPLES
  withdraw --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [lib/commands/governance/withdraw.js](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.0.0/packages/cli/lib/commands/governance/withdraw.js)_
