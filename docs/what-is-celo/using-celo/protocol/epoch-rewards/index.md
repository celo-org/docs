---
title: Celo Epoch Rewards Overview
description: Introduction to Celo epoch rewards on Celo as an L2.
---

# L2 Epoch Rewards

Introduction to Celo epoch rewards on Celo as an L2.

**Epoch Rewards** are similar to the familiar notion of block rewards in other blockchains, minting and distributing new units of CELO as blocks are produced, to create several kinds of incentives.

In the L2 "epoch blocks” no longer exist. There are no transactions triggered by the blockchain itself. Precompiles that were used to query epoch state are also no longer available.

The concept for epochs still remains, but they are determined to be at least as long as "epoch duration” (targeted to be set as one day on mainnet), but there's no guaranteed limit of the maximal duration. The size of an epoch can no longer be deterministically calculated based on block numbers alone.

The logic for processing epochs is now fully implemented in Solidity in the EpochManager contract introduced in Contract Release 12.

Epochs are now processed using multiple calls, as the gas consumption of the process involved uses is relatively high.

Celo is no longer minted when processing the epoch, it is now transferred from the `CeloUnreleasedTreasury`. The contract `CeloUnreleasedTreasury` is allocated the full amount of unminted Celo at the time of the transition to L2.

When "epoch duration" has elapsed since the current epoch started, the function `startNextEpochProcess` can be called. This function:

1. Is permissionless, every EOA or contract can call it given that certain conditions are met:
    1. Enough time has elapsed after the beginning of the epoch.
    2. The epoch is not currently processing.
2. Updates target voting yield
3. Calculates epoch rewards (`EpochRewards.calculateTargetEpochRewards()`)

4. Allocates validator rewards:

    1. mints CELO and exchanges it to cUSD
    2. Sets an internal mapping with the allocation for each validator. Validators can later claim it calling `sendValidatorPayment`
5. Starts a block that prevents certain actions to be performed, notable lock Celo, unlock Celo and change validator locks.

6. Emits events:

    1. EpochRewards: `TargetVotingYieldUpdated(uint256 fraction)`
    2. CeloUnreleasedTreasury: `Released(address indexed to, uint256 amount)`
    3. cUSD: `Transfer(address indexed from, address indexed to, uint256 value)`
    4. EpochManager: `EpochProcessingStarted(uint256 indexed epochNumber)`

After `startNextEpochProcess` is called, the epoch can be fully finished by calling `finishNextEpochProcess` . This function:

1. Is permissionless, every EOA or contract can call it given that certain conditions are met:
    1. startNextEpochProcess has been called before.
2. Distributes rewards to voters (Celo)
3. Elects validators (the result is stored as an array of accounts of the elected validators, signers are also stored for backwards compatibility purposes)
4. Unblocks all actions blocked in `startNextEpochProcess` .
5. Updates the Epoch state.

6. Emits events:

    1. Election: `EpochRewardsDistributedToVoters(address indexed group, uint256 value)`
    2. CeloUnreleasedTreasury: `Released(address indexed to, uint256 amount)`
    3. EpochManager: `EpochProcessingEnded(uint256 indexed epochNumber)`
