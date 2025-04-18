---
title: Locked CELO and Voting
description: Introduction to locked CELO and how to use validator elections to participate in voting.
---

# Locked CELO and Voting

Introduction to Celo locked gold (CELO) and how to use validator elections to participate in voting.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

:::note

This page references "Locked Gold". The native asset of Celo was called Celo Gold (cGLD), but is now called CELO. Many references have been updated, but code and smart contract references may still mention Gold as it is more difficult to reliably and securely update the protocol code.

:::

---

## Validator Election Participation

To participate in validator elections, users must first make a transfer of CELO to the `LockedGold` smart contract.

## Concurrent Use of Locked CELO

Locking up CELO guarantees that the same asset is not used more than once in the same vote. However every unit of Locked CELO can be deployed in several ways at once. Using an amount for voting for a validator does not preclude that same amount also being used to vote for a governance proposal, or as a stake at the same time. Users do not need to choose whether to have to move funds from validator elections in order to vote on a governance proposal.

## Unlocking Period

Celo implements an **unlocking period**, a delay of 3 days after making a request to unlock Locked CELO before it can be recovered from the escrow.

This value balances two concerns. First, it is long enough that an election will have taken place since the request to unlock, so that those units of CELO will no longer have any impact on which validators are managing the network. This deters an attacker from manipulations in the form of borrowing funds to purchase CELO, then using it to elect malicious validators, since they will not be able to return the borrowed funds until after the attack, when presumably it would have been detected and the borrowed funds’ value have fallen.

Second, the unlocking period is short enough that it does not represent a significant liquidity risk for most users. This limits the attractiveness to users of exchanges creating secondary markets in Locked CELO and thereby pooling voting power.

## Locking and Voting Flow

![](https://storage.googleapis.com/celo-website/docs/locked-gold-flow.jpg)

The flow is as follows:

- An account calls `lock`, transferring an amount of CELO from their balance to the `LockedGold` smart contract. This increments the account's 'non-voting' balance by the same amount.

- Then the account calls `vote`, passing in an amount and the address of the group to vote for. This decrements the account's 'non-voting' balance and increments the 'pending' balance associated with that group by the same amount. This counts immediately towards electing validators. Note that the vote may be rejected if it would mean that the account would be voting for more than 3 distinct groups, or that the [voting cap](/what-is-celo/about-celo-l1/protocol/pos/validator-elections#group-voting-caps) for the group would be exceeded.

- At the end of the current epoch, the protocol will first deliver [epoch rewards](/what-is-celo/about-celo-l1/protocol/pos/epoch-rewards) to validators, groups and voters based on the current epoch (pending votes do not count for these purposes), and then run an [election](/what-is-celo/about-celo-l1/protocol/pos/validator-elections) to select the active validator set for the following epoch.

- The pending vote continues to contribute towards electing validators until it is changed, but the account must call `activate` (in a subsequent epoch to the one in which the vote was made) to convert the pending vote to one that earns rewards.

- At the end of that epoch, if the group for which the vote was made had elected one or more validators in the prior election, then the activated vote is eligible for [Locked CELO rewards](/what-is-celo/about-celo-l1/protocol/pos/epoch-rewards-locked-gold). These are applied to the pool of activated votes for the group. This means that activated voting Locked CELO automatically compounds, with the rewards increasing the account's votes for the same group, thereby increasing future rewards, benefitting participants who have elected to continuously participate in governance.

- The account may subsequently choose to `unvote` a specific amount of voting Locked CELO from a group, up to the total balance that the account has accrued there. Due to rewards, this Locked CELO amount may be higher than the original value passed to `vote`.

- This Locked CELO immediately becomes non-voting, receives no further Epoch Rewards, and can be re-used to vote for a different group.

- The account may choose to `unlock` an amount of Locked CELO at any time, provided that it is inactive: this means it is non-voting in Validator Elections, the `deregistrationPeriod` has elapsed if the amount has been used as a validator or validator group stake, and not active in any [Governance proposals](/what-is-celo/using-celo/protocol/governance/overview/). Once an unlocking period of 3 days has passed, the account can call `withdraw` to have the `LockedGold` contract transfer them that amount.

Votes persist between epochs, and the same vote is applied to each election unless and until it is changed. Vote withdrawal, vote changes, and additional CELO being used to vote have no effect on the validator set until the election finalizes at the end of the epoch.

## Vote Delegation

[Contract Release 10](https://github.com/celo-org/celo-monorepo/issues/10375) introduced vote delegation, which allows the governance participant to delegate their voting power.

:::note
Validators and Validator groups cannot delegate.
:::

The governance participants who cannot actively participate to vote on governance proposals in the Celo ecosystem can now delegate their votes to utilize the dormant votes.

Currently, participants can only delegate to 10 other delegatees.

Participants can follow the steps [here](/what-is-celo/using-celo/protocol/governance/voting-in-governance#vote-delegation) to perform delegation using CeloCLI.
