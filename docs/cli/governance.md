`celocli governance`
====================

Interact with on-chain governance proposals and hotfixes

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

## `celocli governance:approvehotfix`

Approve a dequeued governance proposal (or hotfix)

```
USAGE
  $ celocli governance:approvehotfix --from <value> [--globalHelp] [--proposalID <value> |
    --hotfix <value>] [--useMultiSig]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Approver's address
  --globalHelp                                       View all available global flags
  --hotfix=<value>                                   Hash of hotfix proposal
  --proposalID=<value>                               UUID of proposal to approve
  --useMultiSig                                      True means the request will be sent
                                                     through multisig.

DESCRIPTION
  Approve a dequeued governance proposal (or hotfix)

ALIASES
  $ celocli governance:approve
  $ celocli governance:approvehotfix

EXAMPLES
  approve --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631

  approve --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --useMultiSig

  approve --hotfix 0xfcfc98ec3db7c56f0866a7149e811bf7f9e30c9d40008b0def497fcc6fe90649 --from 0xCc50EaC48bA71343dC76852FAE1892c6Bd2971DA --useMultiSig
```

## `celocli governance:build-proposal`

Interactively build a governance proposal

```
USAGE
  $ celocli governance:build-proposal [--globalHelp] [--output <value>]
    [--afterExecutingProposal <value> | --afterExecutingID <value>]

FLAGS
  --afterExecutingID=<value>        Governance proposal identifier which will be
                                    executed prior to proposal being built
  --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                    proposal being built
  --globalHelp                      View all available global flags
  --output=<value>                  [default: proposalTransactions.json] Path to output

DESCRIPTION
  Interactively build a governance proposal

EXAMPLES
  build-proposal --output ./transactions.json
```

_See code: [src/commands/governance/build-proposal.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/build-proposal.ts)_

## `celocli governance:dequeue`

Try to dequeue governance proposal

```
USAGE
  $ celocli governance:dequeue --from <value> [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) From address
  --globalHelp                                       View all available global flags

DESCRIPTION
  Try to dequeue governance proposal

EXAMPLES
  dequeue --from 0x5409ed021d9299bf6814279a6a1411a7e866a631
```

_See code: [src/commands/governance/dequeue.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/dequeue.ts)_

## `celocli governance:execute`

Execute a passing governance proposal

```
USAGE
  $ celocli governance:execute --proposalID <value> --from <value> [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Executor's address
  --globalHelp                                       View all available global flags
  --proposalID=<value>                               (required) UUID of proposal to
                                                     execute

DESCRIPTION
  Execute a passing governance proposal

EXAMPLES
  execute --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631
```

_See code: [src/commands/governance/execute.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/execute.ts)_

## `celocli governance:executehotfix`

Execute a governance hotfix prepared for the current epoch

```
USAGE
  $ celocli governance:executehotfix --from <value> --jsonTransactions <value> --salt <value>
    [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Executors's address
  --globalHelp                                       View all available global flags
  --jsonTransactions=<value>                         (required) Path to json
                                                     transactions
  --salt=<value>                                     (required) Secret salt associated
                                                     with hotfix

DESCRIPTION
  Execute a governance hotfix prepared for the current epoch

EXAMPLES
  executehotfix --jsonTransactions ./transactions.json --salt 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631
```

_See code: [src/commands/governance/executehotfix.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/executehotfix.ts)_

## `celocli governance:hashhotfix`

Hash a governance hotfix specified by JSON and a salt

```
USAGE
  $ celocli governance:hashhotfix --jsonTransactions <value> --salt <value> [--globalHelp]
    [--force]

FLAGS
  --force                     Skip execution check
  --globalHelp                View all available global flags
  --jsonTransactions=<value>  (required) Path to json transactions of the hotfix
  --salt=<value>              (required) Secret salt associated with hotfix

DESCRIPTION
  Hash a governance hotfix specified by JSON and a salt

EXAMPLES
  hashhotfix --jsonTransactions ./transactions.json --salt 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658
```

_See code: [src/commands/governance/hashhotfix.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/hashhotfix.ts)_

## `celocli governance:list`

List live governance proposals (queued and ongoing)

```
USAGE
  $ celocli governance:list [--globalHelp] [--columns <value> | -x] [--filter
    <value>] [--no-header | [--csv | --no-truncate]] [--output csv|json|yaml |  | ]
    [--sort <value>]

FLAGS
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
  List live governance proposals (queued and ongoing)

EXAMPLES
  list
```

_See code: [src/commands/governance/list.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/list.ts)_

## `celocli governance:preparehotfix`

Prepare a governance hotfix for execution in the current epoch

```
USAGE
  $ celocli governance:preparehotfix --from <value> --hash <value> [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Preparer's address
  --globalHelp                                       View all available global flags
  --hash=<value>                                     (required) Hash of hotfix
                                                     transactions

DESCRIPTION
  Prepare a governance hotfix for execution in the current epoch

EXAMPLES
  preparehotfix --hash 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631
```

_See code: [src/commands/governance/preparehotfix.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/preparehotfix.ts)_

## `celocli governance:propose`

Submit a governance proposal

```
USAGE
  $ celocli governance:propose --jsonTransactions <value> --deposit <value> --from
    <value> --descriptionURL <value> [--globalHelp] [--force] [--afterExecutingProposal
    <value> | --afterExecutingID <value>]

FLAGS
  --afterExecutingID=<value>                         Governance proposal identifier
                                                     which will be executed prior to
                                                     proposal
  --afterExecutingProposal=<value>                   Path to proposal which will be
                                                     executed prior to proposal
  --deposit=<value>                                  (required) Amount of Gold to attach
                                                     to proposal
  --descriptionURL=<value>                           (required) A URL where further
                                                     information about the proposal can
                                                     be viewed
  --force                                            Skip execution check
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Proposer's address
  --globalHelp                                       View all available global flags
  --jsonTransactions=<value>                         (required) Path to json
                                                     transactions

DESCRIPTION
  Submit a governance proposal

EXAMPLES
  propose --jsonTransactions ./transactions.json --deposit 10000 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631 --descriptionURL https://gist.github.com/yorhodes/46430eacb8ed2f73f7bf79bef9d58a33
```

_See code: [src/commands/governance/propose.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/propose.ts)_

## `celocli governance:revokeupvote`

Revoke upvotes for queued governance proposals

```
USAGE
  $ celocli governance:revokeupvote --from <value> [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Upvoter's address
  --globalHelp                                       View all available global flags

DESCRIPTION
  Revoke upvotes for queued governance proposals

EXAMPLES
  revokeupvote --from 0x5409ed021d9299bf6814279a6a1411a7e866a631
```

_See code: [src/commands/governance/revokeupvote.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/revokeupvote.ts)_

## `celocli governance:show`

Show information about a governance proposal, hotfix, or account.

```
USAGE
  $ celocli governance:show [--globalHelp] [--raw] [--jsonTransactions <value>]
    [--notwhitelisted] [--whitelisters | --nonwhitelisters |  | [--proposalID <value> |
    --account <value> | --hotfix <value>]] [--afterExecutingProposal <value> |
    --afterExecutingID <value>]

FLAGS
  --account=<value>                 Address of account or voter
  --afterExecutingID=<value>        Governance proposal identifier which will be
                                    executed prior to proposal
  --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                    proposal
  --globalHelp                      View all available global flags
  --hotfix=<value>                  Hash of hotfix proposal
  --jsonTransactions=<value>        Output proposal JSON to provided file
  --nonwhitelisters                 If set, displays validators that have not
                                    whitelisted the hotfix.
  --notwhitelisted                  List validators who have not whitelisted the
                                    specified hotfix
  --proposalID=<value>              UUID of proposal to view
  --raw                             Display proposal in raw bytes format
  --whitelisters                    If set, displays validators that have whitelisted
                                    the hotfix.

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
```

_See code: [src/commands/governance/show.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/show.ts)_

## `celocli governance:showaccount`

Show information about a governance proposal, hotfix, or account.

```
USAGE
  $ celocli governance:showaccount [--globalHelp] [--raw] [--jsonTransactions <value>]
    [--notwhitelisted] [--whitelisters | --nonwhitelisters |  | [--proposalID <value> |
    --account <value> | --hotfix <value>]] [--afterExecutingProposal <value> |
    --afterExecutingID <value>]

FLAGS
  --account=<value>                 Address of account or voter
  --afterExecutingID=<value>        Governance proposal identifier which will be
                                    executed prior to proposal
  --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                    proposal
  --globalHelp                      View all available global flags
  --hotfix=<value>                  Hash of hotfix proposal
  --jsonTransactions=<value>        Output proposal JSON to provided file
  --nonwhitelisters                 If set, displays validators that have not
                                    whitelisted the hotfix.
  --notwhitelisted                  List validators who have not whitelisted the
                                    specified hotfix
  --proposalID=<value>              UUID of proposal to view
  --raw                             Display proposal in raw bytes format
  --whitelisters                    If set, displays validators that have whitelisted
                                    the hotfix.

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
```

## `celocli governance:showhotfix`

Show information about a governance proposal, hotfix, or account.

```
USAGE
  $ celocli governance:showhotfix [--globalHelp] [--raw] [--jsonTransactions <value>]
    [--notwhitelisted] [--whitelisters | --nonwhitelisters |  | [--proposalID <value> |
    --account <value> | --hotfix <value>]] [--afterExecutingProposal <value> |
    --afterExecutingID <value>]

FLAGS
  --account=<value>                 Address of account or voter
  --afterExecutingID=<value>        Governance proposal identifier which will be
                                    executed prior to proposal
  --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                    proposal
  --globalHelp                      View all available global flags
  --hotfix=<value>                  Hash of hotfix proposal
  --jsonTransactions=<value>        Output proposal JSON to provided file
  --nonwhitelisters                 If set, displays validators that have not
                                    whitelisted the hotfix.
  --notwhitelisted                  List validators who have not whitelisted the
                                    specified hotfix
  --proposalID=<value>              UUID of proposal to view
  --raw                             Display proposal in raw bytes format
  --whitelisters                    If set, displays validators that have whitelisted
                                    the hotfix.

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
```

## `celocli governance:upvote`

Upvote a queued governance proposal

```
USAGE
  $ celocli governance:upvote --proposalID <value> --from <value> [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Upvoter's address
  --globalHelp                                       View all available global flags
  --proposalID=<value>                               (required) UUID of proposal to
                                                     upvote

DESCRIPTION
  Upvote a queued governance proposal

EXAMPLES
  upvote --proposalID 99 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631
```

_See code: [src/commands/governance/upvote.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/upvote.ts)_

## `celocli governance:view`

Show information about a governance proposal, hotfix, or account.

```
USAGE
  $ celocli governance:view [--globalHelp] [--raw] [--jsonTransactions <value>]
    [--notwhitelisted] [--whitelisters | --nonwhitelisters |  | [--proposalID <value> |
    --account <value> | --hotfix <value>]] [--afterExecutingProposal <value> |
    --afterExecutingID <value>]

FLAGS
  --account=<value>                 Address of account or voter
  --afterExecutingID=<value>        Governance proposal identifier which will be
                                    executed prior to proposal
  --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                    proposal
  --globalHelp                      View all available global flags
  --hotfix=<value>                  Hash of hotfix proposal
  --jsonTransactions=<value>        Output proposal JSON to provided file
  --nonwhitelisters                 If set, displays validators that have not
                                    whitelisted the hotfix.
  --notwhitelisted                  List validators who have not whitelisted the
                                    specified hotfix
  --proposalID=<value>              UUID of proposal to view
  --raw                             Display proposal in raw bytes format
  --whitelisters                    If set, displays validators that have whitelisted
                                    the hotfix.

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
```

## `celocli governance:viewaccount`

Show information about a governance proposal, hotfix, or account.

```
USAGE
  $ celocli governance:viewaccount [--globalHelp] [--raw] [--jsonTransactions <value>]
    [--notwhitelisted] [--whitelisters | --nonwhitelisters |  | [--proposalID <value> |
    --account <value> | --hotfix <value>]] [--afterExecutingProposal <value> |
    --afterExecutingID <value>]

FLAGS
  --account=<value>                 Address of account or voter
  --afterExecutingID=<value>        Governance proposal identifier which will be
                                    executed prior to proposal
  --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                    proposal
  --globalHelp                      View all available global flags
  --hotfix=<value>                  Hash of hotfix proposal
  --jsonTransactions=<value>        Output proposal JSON to provided file
  --nonwhitelisters                 If set, displays validators that have not
                                    whitelisted the hotfix.
  --notwhitelisted                  List validators who have not whitelisted the
                                    specified hotfix
  --proposalID=<value>              UUID of proposal to view
  --raw                             Display proposal in raw bytes format
  --whitelisters                    If set, displays validators that have whitelisted
                                    the hotfix.

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
```

## `celocli governance:viewhotfix`

Show information about a governance proposal, hotfix, or account.

```
USAGE
  $ celocli governance:viewhotfix [--globalHelp] [--raw] [--jsonTransactions <value>]
    [--notwhitelisted] [--whitelisters | --nonwhitelisters |  | [--proposalID <value> |
    --account <value> | --hotfix <value>]] [--afterExecutingProposal <value> |
    --afterExecutingID <value>]

FLAGS
  --account=<value>                 Address of account or voter
  --afterExecutingID=<value>        Governance proposal identifier which will be
                                    executed prior to proposal
  --afterExecutingProposal=<value>  Path to proposal which will be executed prior to
                                    proposal
  --globalHelp                      View all available global flags
  --hotfix=<value>                  Hash of hotfix proposal
  --jsonTransactions=<value>        Output proposal JSON to provided file
  --nonwhitelisters                 If set, displays validators that have not
                                    whitelisted the hotfix.
  --notwhitelisted                  List validators who have not whitelisted the
                                    specified hotfix
  --proposalID=<value>              UUID of proposal to view
  --raw                             Display proposal in raw bytes format
  --whitelisters                    If set, displays validators that have whitelisted
                                    the hotfix.

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
```

## `celocli governance:vote`

Vote on an approved governance proposal

```
USAGE
  $ celocli governance:vote --proposalID <value> --value Abstain|No|Yes --from
    <value> [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Voter's address
  --globalHelp                                       View all available global flags
  --proposalID=<value>                               (required) UUID of proposal to vote
                                                     on
  --value=<option>                                   (required) Vote
                                                     <options: Abstain|No|Yes>

DESCRIPTION
  Vote on an approved governance proposal

EXAMPLES
  vote --proposalID 99 --value Yes --from 0x5409ed021d9299bf6814279a6a1411a7e866a631
```

_See code: [src/commands/governance/vote.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/vote.ts)_

## `celocli governance:votePartially`

Vote partially on an approved governance proposal

```
USAGE
  $ celocli governance:votePartially --proposalID <value> --from <value> [--globalHelp] [--yes
    <value>] [--no <value>] [--abstain <value>]

FLAGS
  --abstain=<value>                                  Abstain votes
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Voter's address
  --globalHelp                                       View all available global flags
  --no=<value>                                       No votes
  --proposalID=<value>                               (required) UUID of proposal to vote
                                                     on
  --yes=<value>                                      Yes votes

DESCRIPTION
  Vote partially on an approved governance proposal

EXAMPLES
  vote-partially --proposalID 99 --yes 10 --no 20 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631
```

_See code: [src/commands/governance/votePartially.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/votePartially.ts)_

## `celocli governance:whitelisthotfix`

Whitelist a governance hotfix

```
USAGE
  $ celocli governance:whitelisthotfix --from <value> --hash <value> [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Whitelister's address
  --globalHelp                                       View all available global flags
  --hash=<value>                                     (required) Hash of hotfix
                                                     transactions

DESCRIPTION
  Whitelist a governance hotfix

EXAMPLES
  whitelisthotfix --hash 0x614dccb5ac13cba47c2430bdee7829bb8c8f3603a8ace22e7680d317b39e3658 --from 0x5409ed021d9299bf6814279a6a1411a7e866a631
```

_See code: [src/commands/governance/whitelisthotfix.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/whitelisthotfix.ts)_

## `celocli governance:withdraw`

Withdraw refunded governance proposal deposits.

```
USAGE
  $ celocli governance:withdraw --from <value> [--globalHelp]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Proposer's address
  --globalHelp                                       View all available global flags

DESCRIPTION
  Withdraw refunded governance proposal deposits.

EXAMPLES
  withdraw --from 0x5409ed021d9299bf6814279a6a1411a7e866a631
```

_See code: [src/commands/governance/withdraw.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/governance/withdraw.ts)_
