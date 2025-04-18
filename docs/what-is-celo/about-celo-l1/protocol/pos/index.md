---
title: Celo Proof of Stake Overview
description: Overview of Celo's proof-of-stake algorithm, mechanisms, and implementation.
---

import YouTube from '@components/YouTube'

# Proof of Stake

Overview of Celo's proof-of-stake algorithm, mechanisms, and implementation.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Mastering the Art of Validating

<YouTube videoId="3UIudzzCb8o" />

## Validator Types

Celo uses a Byzantine Fault Tolerant [consensus protocol](/what-is-celo/about-celo-l1/protocol/consensus) to agree on new blocks to append to the blockchain. The instances of the Celo software that participate in this consensus protocol are known as **validators**. More accurately, they are **active validators** or **elected validators**, to distinguish them from **registered validators** which are configured to participate but are not actively selected.

## Proof-of-Stake

Celo's proof-of-stake mechanism is the set of processes that determine which nodes become active validators and how incentives are arranged to secure the network.

## Active Validators

The first set of active validators are determined in the genesis block. Thereafter at the end of every epoch, a fixed number of blocks fixed at network creation time, an election is run that may lead to validators being added or removed.

![](https://storage.googleapis.com/celo-website/docs/concepts.jpg)

## Validator Elections

In Celo's [Validator Elections](/what-is-celo/about-celo-l1/protocol/pos/validator-elections), holders of the native asset, CELO, may participate and earn rewards for doing so. Accounts do not make votes for validators directly, but instead vote for [validator groups](/what-is-celo/about-celo-l1/protocol/pos/validator-groups).

Before they can vote, holders of CELO move balances into the [Locked Gold](/what-is-celo/about-celo-l1/protocol/pos/locked-gold) smart contract. Locked Gold can be used concurrently for: placing votes in Validator Elections, maintaining a stake to satisfy the requirements of registering as a validator or validator group, and also voting in on-chain [Governance](/what-is-celo/using-celo/protocol/governance/overview/) proposals. This means that validators and groups can vote and earn rewards with their stake.

:::tip note

Unlike in other proof-of-stake systems, holding Locked Gold or voting for a group does not put that amount 'at risk' from slashing due to the behavior of validators or validator groups. Only the stake put up by a validator or group may be slashed.

:::

## Implementation

Most of Celo's proof-of-stake mechanism is implemented as smart contracts, and as such can be changed through Celo's on-chain [Governance](/what-is-celo/using-celo/protocol/governance/overview/) process.

- [`Accounts.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/common/Accounts.sol) manages key delegation and metadata for all accounts including Validators, Groups and Locked Gold holders.

- [`LockedGold.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/governance/LockedGold.sol) manages the lifecycle of Locked Gold.

- [`Validators.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/governance/Validators.sol) handles registration, deregistration, staking, key management and epoch rewards for validators and validator groups, as well as routines to manage the members of groups.

- [`Election.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/governance/Election.sol) manages Locked Gold voting and epoch rewards and runs Validator Elections.

In Celo blockchain:

- [`consensus/istanbul/backend/backend.go`](https://github.com/celo-org/celo-blockchain/blob/master/consensus/istanbul/backend/backend.go) performs validator elections in the last block of the epoch and calculates the new [validator set diff](/what-is-celo/about-celo-l1/protocol/consensus/validator-set-differences).

- [`consensus/istanbul/backend/pos.go`](https://github.com/celo-org/celo-blockchain/blob/master/consensus/istanbul/backend/pos.go) is called in the last block of the epoch to process validator uptime scores and make epoch rewards.
