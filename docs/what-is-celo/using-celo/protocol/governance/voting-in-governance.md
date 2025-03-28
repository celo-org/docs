---
title: Celo Voting on Governance Proposals
description: How to use the Celo CLI to participate in Goverance and create a Governance proposal.
---

# Voting on Governance Proposals

How to use the [Celo CLI](/cli/) to participate in Goverance and create a Governance proposal.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Governance

Celo uses a formal on-chain governance mechanism to manage and upgrade the protocol. More information about the Governance system can be found in the [Governance overview](/what-is-celo/using-celo/protocol/governance/overview).

:::info

If you would like to keep up-to-date with all the news happening in the Celo community, including validation, node operation and governance, please sign up to our [Celo Signal mailing list here](https://share.hsforms.com/1Qrhush1vSA2WIamd_yL4ow53n4j).

You can add the [Celo Signal public calendar](https://calendar.google.com/calendar/u/0/embed?src=c_9su6ich1uhmetr4ob3sij6kaqs@group.calendar.google.com) as well which has relevant dates.

:::

:::info

In the following commands `<VARIABLE>` is used as a placeholder for something you should specify on the command line.

:::

## Viewing Proposals

A list of active proposals can be viewed with the following command:

```bash
celocli governance:list
```

Included will be three lists of proposals by status:

- **Queued** proposals have been submitted, but are not yet being considered. Voters can upvote proposals in this list, and proposals with the most upvotes from this list will be moved from the queue to be considered.
- **Dequeued** proposals are actively being considered and will pass through the Approval, Referendum, and Execution stages, as discussed in the [Governance overview](/what-is-celo/using-celo/protocol/governance/overview).
- **Expired** proposals are no longer being considered.

## Understanding Proposal Details

You can view information about a specific proposal with:

```bash
celocli governance:show --proposalID=<PROPOSAL_ID>
```

For example, the proposal 14 on Mainnet was as follows:

```
Running Checks:
   ✔  14 is an existing proposal
proposal:
  0:
    contract: Governance
    function: setBaselineQuorumFactor
    args:
      0: 500000000000000000000000
    params:
      baselineQuorumFactor: 500000000000000000000000 (~5.000e+23)
    value: 0
metadata:
  proposer: 0xF3EB910DA09B8AF348E0E5B6636da442cFa79239
  deposit: 100000000000000000000 (~1.000e+20)
  timestamp: 1609961608 (~1.610e+9)
  transactionCount: 1
  descriptionURL: https://github.com/celo-org/celo-proposals/blob/master/CGPs/0016.md
stage: Referendum
upvotes: 0
votes:
  Yes: 30992399904903465125627698 (~3.099e+25)
  No: 0
  Abstain: 0
passing: true
requirements:
  constitutionThreshold: 0.7
  support: 0.99883105743491071638
  required: 29107673282861669327494319.531832308424 (~2.910e+25)
  total: 30992399904903465125627698 (~3.099e+25)
isApproved: true
isProposalPassing: true
timeUntilStages:
  referendum: past
  execution: 57 minutes, 59 seconds
  expiration: 3 days, 57 minutes, 59 seconds
```

To see how many votes a proposal needs to pass (depending on what type of commands are being executed), you can refer to the **requirements** section of the respose.

In the proposal above, there is a **constitutionThreshold** target of "0.7" or 70% of votes must be in support, "0.998" or 99.8% of votes have currently voted "yes", the number of votes required to pass are 29.1M CELO, with 30.9M CELO currently voted in total.

## Voting on Proposals

When a proposal is Queued, you can upvote the proposal to indicate you'd like it to be considered.

:::info

If you are using a Ledger wallet, make sure to include `--useLedger` and `--ledgerAddresses` in the
following commands.

:::

```bash
celocli governance:upvote --proposalID=<PROPOSAL_ID> --from=<YOUR_VOTER_ADDRESS>
```

At a defined frequency, which can be checked with the `celocli network:parameters` command, proposals can be dequeued, with the highest upvoted proposals being dequeued first.

After a proposal is dequeued, it will first enter the Approval phase.
In this phase, the [Governance Approver](/what-is-celo/using-celo/protocol/governance/overview#approval) may choose to approve the proposal, which will allow it to proceed to the Referendum phase after the configured length of time.

Once a proposal has reached the Referendum phase, it is open to community for voting.

```bash
celocli governance:vote --proposalID=<PROPOSAL_ID> --value=<Abstain|Yes|No> --from=<YOUR_VOTER_ADDRESS>
```

## Executing a Proposal

If a Governance Proposal receives enough votes and passes in the Referendum phase, it can be executed by anyone.

```bash
celocli governance:execute --proposalID=<PROPOSAL_ID> --from=<YOUR_VOTER_ADDRESS>
```

## Vote Delegation

[Contract Release 10](https://github.com/celo-org/celo-monorepo/issues/10375) introduced vote delegation, which allows the governance participant to delgate their voting power.

:::note
Validators and Validator groups cannot delegate.
:::

### Delegating Votes

You can delegate votes using the following command:

```bash
celocli lockedgold:delegate --from <DELEGATOR_ADDRESS> --to <DELEGATEE_ADDRESS> --percent <PERCENTAGE_BETWEEN_1_AND_100>
```

:::note
Currently, participants can only delegate to 10 delegatees.
:::

You can view the max number of delegatees one can have using the following command:

```bash
celocli lockedgold:max-delegatees-count
```

### Revoking Delegated Votes

You can use the following command to revoke delegated votes:

```bash
celocli lockedgold:revoke-delegate --from <DELEGATOR_ADDRESS> --to <DELEGATEE_ADDRESS> --percent <PERCENTAGE_TO_BE_REVOKED>
```

For example, If you have delegated 15% to the delegatee and pass 5% as `percent` then 5% will be subtracted from the 15% resulting in 10% delegation.

### Total percent of Locked Celo delegated by an account

You can use the following command to get the total percent of locked celo delegated by an account:

```bash
celocli lockedgold:delegate-info --account <ACCOUNT_ADDRESS>
```

### List of Delegatees of a Delegator

You can use the following command to get the list of delegatees of an account:

```bash
celocli lockedgold:delegate-info --account <ACCOUNT_ADDRESS>
```

### Total Delegated Votes to an address

You can use the following command to get the total delegated votes to an address:

```bash
celocli lockedgold:delegate-info --account <ACCOUNT_ADDRESS>
```
