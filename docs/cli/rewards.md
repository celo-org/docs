`celocli rewards`
=================

Show rewards information about a voter, registered Validator, or Validator Group

* [`celocli rewards:show`](#celocli-rewardsshow)

## `celocli rewards:show`

Show rewards information about a voter, registered Validator, or Validator Group

```
USAGE
  $ celocli rewards:show [-n <value>] [--globalHelp] [--estimate] [--voter
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d] [--validator
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d] [--group
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d] [--slashing] [--epochs <value>]
    [--columns <value> | -x] [--filter <value>] [--no-header | [--csv | --no-truncate]]
    [--output csv|json|yaml |  | ] [--sort <value>]

FLAGS
  -n, --node=<value>                                          URL of the node to run
                                                              commands against or an
                                                              alias
  -x, --extended                                              show extra columns
      --columns=<value>                                       only show provided columns
                                                              (comma-separated)
      --csv                                                   output is csv format
                                                              [alias: --output=csv]
      --epochs=<value>                                        [default: 1] Show results
                                                              for the last N epochs
      --estimate                                              Estimate voter rewards
                                                              from current votes
      --filter=<value>                                        filter property by partial
                                                              string matching, ex:
                                                              name=foo
      --globalHelp                                            View all available global
                                                              flags
      --group=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d      Validator Group to show
                                                              rewards for
      --no-header                                             hide table header from
                                                              output
      --no-truncate                                           do not truncate output to
                                                              fit screen
      --output=<option>                                       output in a more machine
                                                              friendly format
                                                              <options: csv|json|yaml>
      --slashing                                              Show rewards for slashing
                                                              (will be removed in L2)
      --sort=<value>                                          property to sort by
                                                              (prepend '-' for
                                                              descending)
      --validator=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d  Validator to show rewards
                                                              for
      --voter=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d      Voter to show rewards for

DESCRIPTION
  Show rewards information about a voter, registered Validator, or Validator Group

EXAMPLES
  show --voter 0x5409ed021d9299bf6814279a6a1411a7e866a631

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/rewards/show.ts](https://github.com/celo-org/developer-tooling/tree/master/packages/cli/src/commands/rewards/show.ts)_
