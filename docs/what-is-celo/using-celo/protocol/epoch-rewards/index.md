---
title: Celo Epoch Rewards Overview
description: Introduction to Celo epoch rewards on Celo.
---

# L2 Epoch Rewards

Learn how Celo distributes rewards to network participants.

---

## What are Epoch Rewards?

**Epoch Rewards** function similarly to block rewards in other blockchains. They distribute new CELO tokens as epochs progress, creating incentives for various network participants.

## How Epoch Rewards Work

Rewards are distributed at the end of each epoch (roughly every 24 hours) to:

- **Community RPC providers** - Node operators serving the network
- **Locked CELO holders** - Users who vote for groups that elected community RPC providers
- **Community Fund** - Supporting protocol infrastructure grants
- **Carbon Offsetting Fund** - Environmental sustainability initiatives

## Token Economics

A total of **400 million CELO** will be released through epoch rewards over time. CELO serves multiple roles:

- Utility and governance token for the Celo network
- Reserve collateral backing Celo stablecoins
- Fixed supply asset with long-term deflationary characteristics (similar to Ethereum)

:::info **Migration from L1 to L2**
For details on how epoch rewards worked when Celo was a Layer 1 blockchain, see [the historical epoch rewards section](/what-is-celo/about-celo-l1/protocol/pos/epoch-rewards).

For technical changes since the L1 to L2 migration, refer to the [official specs](https://specs.celo.org/smart_contract_updates_from_l1.html#epochs-and-rewards).
:::

## Epoch Duration and Processing

An epoch is a time period lasting at least one day, with no guaranteed maximum duration.
The epoch logic is implemented in Solidity via the [EpochManager contract](/contracts/core-contracts), introduced in [Contract Release 12](https://github.com/celo-org/celo-monorepo/tree/core-contracts.v12).

Since epoch processing requires significant gas consumption, it's handled through multiple function calls rather than a single transaction.

## Reward Distribution Process

CELO tokens are transferred from the `CeloUnreleasedTreasury` contract, which was allocated the full amount of unminted CELO during the L2 transition.

:::info **Terminology**
The term "validator" is used in the code and corresponding explanation due to historical reasons, but refers to the community RPC providers.
:::

### Phase 1: Starting Epoch Processing

When the epoch duration has elapsed, anyone can call `startNextEpochProcess()` to begin reward distribution.

**Requirements:**

- Sufficient time has passed since the current epoch began.
- No epoch is currently being processed.

**Actions performed:**

1. **Updates target voting yield** - Adjusts reward rates
2. **Calculates epoch rewards** - Determines total rewards via `EpochRewards.calculateTargetEpochRewards()`
3. **Allocates validator rewards:**
   - Mints CELO and exchanges it for cUSD
   - Creates internal mapping for validator allocations
   - Validators later claim rewards by calling `sendValidatorPayment`
4. **Activates protection mode** - Temporarily blocks certain actions (locking/unlocking CELO, changing validator locks)
5. **Emits events:**
   - EpochRewards: `TargetVotingYieldUpdated(uint256 fraction)`
   - CeloUnreleasedTreasury: `Released(address indexed to, uint256 amount)`
   - cUSD: `Transfer(address indexed from, address indexed to, uint256 value)`
   - EpochManager: `EpochProcessingStarted(uint256 indexed epochNumber)`

### Phase 2: Completing Epoch Processing

After the initial phase, anyone can call `finishNextEpochProcess()` to complete the epoch.

**Requirements:**

- `startNextEpochProcess` must have been called previously.

**Actions performed:**

1. **Allocates voter rewards** - Makes CELO available to eligible voters
2. **Conducts validator elections** - Stores elected validator accounts and signers
3. **Removes protection mode** - Re-enables previously blocked actions
4. **Updates epoch state** - Advances to the next epoch
5. **Emits events:**
   - Election: `EpochRewardsDistributedToVoters(address indexed group, uint256 value)`
   - CeloUnreleasedTreasury: `Released(address indexed to, uint256 amount)`
   - EpochManager: `EpochProcessingEnded(uint256 indexed epochNumber)`
