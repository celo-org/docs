# How it works

The first set of active RPC providers were determined in the genesis block of Celo L2. Thereafter at the end of every epoch, approximately 24 hours, an election is run that may lead to nodes being added or removed from the elected set.

## RPC Elections

In Celo's [RPC elections](/what-is-celo/about-celo-l1/protocol/pos/validator-elections) (formerly validator elections), holders of the native asset, CELO, may participate and earn rewards for doing so. Accounts do not make votes for validators directly, but instead vote for [Groups](/what-is-celo/about-celo-l1/protocol/pos/validator-groups).

Before they can vote, holders of CELO move balances into the [Locked Celo](/what-is-celo/about-celo-l1/protocol/pos/locked-gold) (formerly "Celo Gold") smart contract. Locked Gold can be used concurrently for: placing votes in RPC nodes Elections, maintaining a stake to satisfy the requirements of registering as a node or group, and also voting in on-chain [Governance](/what-is-celo/using-celo/protocol/governance/overview/) proposals. This means that validators and groups can vote and earn rewards with their stake.

:::tip note

Unlike in other proof-of-stake systems, holding Locked Gold or voting for a group does not put that amount 'at risk' from slashing due to the behavior of validators or validator groups. Only the stake put up by a validator or group may be slashed.

:::

## Implementation

Elections are handled my smart contracts, and as such can be changed through Celo's on-chain [Governance](/what-is-celo/using-celo/protocol/governance/overview/) process.

- [`Accounts.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/common/Accounts.sol) manages key delegation and metadata for all accounts including Validators, Groups and Locked Gold holders.

- [`LockedGold.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/governance/LockedGold.sol) manages the lifecycle of Locked Gold.

- [`Validators.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/governance/Validators.sol) handles registration, deregistration, staking, key management and epoch rewards for validators and validator groups, as well as routines to manage the members of groups.

- [`Election.sol`](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/governance/Election.sol) manages Locked Gold voting and epoch rewards and runs Validator Elections.

TODO epoch Manager