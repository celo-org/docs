---
title: Add a contract in celo-monorepo
description: How to set up Unit/Migration tests on Celo
---

## Adding a contract in celo-monorepo

Setting up a unit/migration test suit for the contract you just created in celo-monorepo and a short guide to running it successfully on celo test net. We’ll be using Accounts.sol as an example.

## After initial contract creation

After contract was created and it’s ready to be tested run `yarn build` to generate typechain which is essentially a TS wrapper for the contract. Keep in mind that everytime you change your contract you have to run yarn build once again.

## Unit tests

Test directory is organized the same way as the contracts directory so feel free to navigate to the parent folder of your currently created contract and create a corresponding(.ts) file for it. For example: celo-monorepo/packages/protocol/contracts/common/Accounts.sol → celo-monorepo/packages/protocol/test/common/accounts.ts.

:::tip

Some build issues can be resolved by simply deleting build and the typechain folder. Don’t forget to run yarn build once again.

:::
