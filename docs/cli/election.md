`celocli election`
==================

Participate in and view the state of Validator Elections

* [`celocli election:activate`](#celocli-electionactivate)
* [`celocli election:current`](#celocli-electioncurrent)
* [`celocli election:list`](#celocli-electionlist)
* [`celocli election:revoke`](#celocli-electionrevoke)
* [`celocli election:run`](#celocli-electionrun)
* [`celocli election:show ARG1`](#celocli-electionshow-arg1)
* [`celocli election:vote`](#celocli-electionvote)

## `celocli election:activate`

Activate pending votes in validator elections to begin earning rewards. To earn rewards as a voter, it is required to activate your pending votes at some point after the end of the epoch in which they were made.

```
USAGE
  $ celocli election:activate --from <value> [--globalHelp] [--wait]

FLAGS
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Voter's address
  --globalHelp                                       View all available global flags
  --wait                                             Wait until all pending votes can be
                                                     activated

DESCRIPTION
  Activate pending votes in validator elections to begin earning rewards. To earn
  rewards as a voter, it is required to activate your pending votes at some point after
  the end of the epoch in which they were made.

EXAMPLES
  activate --from 0x4443d0349e8b3075cba511a0a87796597602a0f1

  activate --from 0x4443d0349e8b3075cba511a0a87796597602a0f1 --wait
```

_See code: [src/commands/election/activate.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/election/activate.ts)_

## `celocli election:current`

Outputs the set of validators currently participating in BFT to create blocks. An election is run to select the validator set at the end of every epoch.

```
USAGE
  $ celocli election:current [--globalHelp] [--valset] [--columns <value> | -x]
    [--filter <value>] [--no-header | [--csv | --no-truncate]] [--output csv|json|yaml |
    | ] [--sort <value>]

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
      --valset           Show currently used signers from valset (by default the
                         authorized validator signers are shown). Useful for checking if
                         keys have been rotated.

DESCRIPTION
  Outputs the set of validators currently participating in BFT to create blocks. An
  election is run to select the validator set at the end of every epoch.
```

_See code: [src/commands/election/current.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/election/current.ts)_

## `celocli election:list`

Prints the list of validator groups, the number of votes they have received, the number of additional votes they are able to receive, and whether or not they are eligible to elect validators.

```
USAGE
  $ celocli election:list [--globalHelp] [--columns <value> | -x] [--filter
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
  Prints the list of validator groups, the number of votes they have received, the
  number of additional votes they are able to receive, and whether or not they are
  eligible to elect validators.

EXAMPLES
  list
```

_See code: [src/commands/election/list.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/election/list.ts)_

## `celocli election:revoke`

Revoke votes for a Validator Group in validator elections.

```
USAGE
  $ celocli election:revoke --from <value> --for <value> --value <value>
    [--globalHelp]

FLAGS
  --for=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d   (required) ValidatorGroup's address
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Voter's address
  --globalHelp                                       View all available global flags
  --value=<value>                                    (required) Value of votes to revoke

DESCRIPTION
  Revoke votes for a Validator Group in validator elections.

EXAMPLES
  revoke --from 0x4443d0349e8b3075cba511a0a87796597602a0f1 --for 0x932fee04521f5fcb21949041bf161917da3f588b, --value 1000000
```

_See code: [src/commands/election/revoke.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/election/revoke.ts)_

## `celocli election:run`

Runs a "mock" election and prints out the validators that would be elected if the epoch ended right now.

```
USAGE
  $ celocli election:run [--globalHelp] [--columns <value> | -x] [--filter
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
  Runs a "mock" election and prints out the validators that would be elected if the
  epoch ended right now.
```

_See code: [src/commands/election/run.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/election/run.ts)_

## `celocli election:show ARG1`

Show election information about a voter or registered Validator Group

```
USAGE
  $ celocli election:show ARG1 [--globalHelp] [--voter | --group]

ARGUMENTS
  ARG1  Voter or Validator Groups's address

FLAGS
  --globalHelp  View all available global flags
  --group       Show information about a group running in Validator elections
  --voter       Show information about an account voting in Validator elections

DESCRIPTION
  Show election information about a voter or registered Validator Group

EXAMPLES
  show 0x97f7333c51897469E8D98E7af8653aAb468050a3 --voter

  show 0x97f7333c51897469E8D98E7af8653aAb468050a3 --group
```

_See code: [src/commands/election/show.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/election/show.ts)_

## `celocli election:vote`

Vote for a Validator Group in validator elections.

```
USAGE
  $ celocli election:vote --from <value> --for <value> --value <value>
    [--globalHelp]

FLAGS
  --for=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d   (required) ValidatorGroup's address
  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  (required) Voter's address
  --globalHelp                                       View all available global flags
  --value=<value>                                    (required) Amount of Gold used to
                                                     vote for group

DESCRIPTION
  Vote for a Validator Group in validator elections.

EXAMPLES
  vote --from 0x4443d0349e8b3075cba511a0a87796597602a0f1 --for 0x932fee04521f5fcb21949041bf161917da3f588b, --value 1000000
```

_See code: [src/commands/election/vote.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/election/vote.ts)_
