---
title: Add a contract in celo-monorepo
description: How to set up Unit/Migration tests on Celo
---

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

## Adding a contract in celo-monorepo

Set up a unit/migration test suit for the contract you just created in celo-monorepo and a short guide to running it successfully on celo test net. We’ll be using `Accounts.sol` as an example.

## After initial contract creation

After the contract is created and it’s ready to be tested, run `yarn build` to trigger typechain which is essentially a TS wrapper for the contract. Keep in mind that everytime you change your contract you have to run `yarn build` once again.

## Unit tests

The test directory is organized the same way as the contracts directory so feel free to navigate to the parent folder of your currently created contract and create a corresponding(.ts) file for it. For example: `celo-monorepo/packages/protocol/contracts/common/Accounts.sol → celo-monorepo/packages/protocol/test/common/accounts.ts`.

:::tip

Some build issues can be resolved by simply deleting the `build` and the `typechain` folder. Don’t forget to run `yarn build` once again.

:::
