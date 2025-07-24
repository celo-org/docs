# How it works

## Context

Following Celo's migration to L2, validators have evolved to serve as RPC node providers for the community. The initial active RPC providers were established in Celo L2's genesis block. Subsequently, elections occur at each epoch's conclusion (approximately every 24 hours) to potentially add or remove nodes from the active set.

This system is based on the [proposal for validator engagement during the transition to L2](https://forum.celo.org/t/proposal-validator-engagement-during-the-transition-to-celo-l2/9700) and [Set The Great Celo Halvening Parameters](https://forum.celo.org/t/set-the-great-celo-halvening-parameters/10455/3). For additional details, see [Epoch Rewards](/what-is-celo/using-celo/protocol/epoch-rewards) and the related [forum discussion: The Great Celo Halvening – Proposed Tokenomics in the Era of Celo L2](https://forum.celo.org/t/the-great-celo-halvening-proposed-tokenomics-in-the-era-of-celo-l2/9701). For updates make sure to refer to the [Celo Forum](https://forum.celo.org).

:::info **Terminology**
The term "validator" is used in the code and corresponding explanation due to historical reasons, but refers to the community RPC providers.
:::

## RPC Elections

In Celo's RPC elections (formerly [validator elections](/what-is-celo/about-celo-l1/protocol/pos/validator-elections)), holders of the native asset CELO participate in the process to support network operations and earn rewards for voting.

The election process follows these steps:

1. **Lock CELO tokens**: Holders must first move their CELO balances into the [Locked Celo](/what-is-celo/about-celo-l1/protocol/pos/locked-gold) (formerly "Celo Gold") smart contract before participating in elections.

2. **Vote for Groups**: Rather than voting directly for individual node providers, accounts cast their votes for (formerly [validator groups](/what-is-celo/about-celo-l1/protocol/pos/validator-groups)) that manage collections of nodes.

3. **Earn rewards**: Participants receive rewards for their involvement, and validators and groups can also vote and earn rewards using their own stake.

The same Locked CELO can simultaneously be used for multiple purposes: voting in RPC node elections, maintaining Community RPC stakes, and participating in on-chain [Governance](/what-is-celo/using-celo/protocol/governance/overview/) proposals.

:::tip No voter slashing

Unlike in other proof-of-stake systems, holding Locked Gold or voting for a group does not put that amount 'at risk' from slashing due to the behavior of node providers. Only the stake put up by a node provider or group may be slashed.

:::

## Implementation

Elections are handled my smart contracts, and as such can be changed through Celo's on-chain [Governance](/what-is-celo/using-celo/protocol/governance/overview/) process.

- [`Accounts.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/common/Accounts.sol) manages key delegation and metadata for all accounts including Validators, Groups and Locked Gold holders.

- [`LockedGold.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/governance/LockedGold.sol) manages the lifecycle of Locked Gold.

- [`Validators.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/governance/Validators.sol) handles registration, deregistration, staking, key management and epoch rewards for validators and validator groups, as well as routines to manage the members of groups.

- [`Election.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/governance/Election.sol) manages Locked Gold voting and epoch rewards and runs Validator Elections.

- [`EpochManager.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts-0.8/common/EpochManager.sol) handles the epoch processing logic, including starting and finishing epoch transitions, reward calculations, and validator elections through permissionless functions.
