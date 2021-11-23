---
title: Celo EVM Compatible Tooling
description: Overview of Celo EVM compatible tools and the value they provide to developers.
---
# EVM Compatible Tooling

Overview of Celo EVM compatible tools and the value they provide to developers.

___

:::tip

See [Celo for Ethereum Developers](../developer-guide/celo-for-eth-devs) for an in-depth overview of the similarities and differences between Celo and Ethereum.

:::

## Solidity

[Solidity](https://docs.soliditylang.org/en/latest/) is an object-oriented, high-level language for implementing smart contracts. It’s easy to learn if you’re familiar with C++, Python or Javascript. It’s the most popular language on Ethereum with strong support for both tooling and resources. You leverage existing work done on Ethereum open source projects for Celo applications.

## Truffle

[Truffle](https://www.trufflesuite.com/) is a development environment, testing framework, and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM). It allows you to write contracts in your favorite development environment. After installing truffle in your project the truffle project will run scripts to deploy your contracts to the Alfajores Testnet, Mainnet, or whatever you specify in the configuration file. It helps you run unit tests against your deployed contracts to make sure that they're running as you expect. It also keeps track of all your contract deployments and your upgrades and the like the deployment history.

Learn more about deploying contracts to Celo with Truffle [here](../developer-resources/deploy-truffle).

## Hardhat

[Hardhat](https://hardhat.org/) is a development environment to compile, deploy, test, and debug your Ethereum or Celo software. It helps developers manage and automate the recurring tasks that are inherent to the process of building smart contracts and dApps, as well as easily introducing more functionality around this workflow. This means compiling, running, and testing smart contracts at the very core.

Learn more about deploying contracts to Celo with Hardhat [here](../developer-resources/deploy-hardhat).

## Remix

[Remix IDE](https://remix-project.org/) allows developing, deploying, and administering smart contracts for Ethereum like blockchains. It can also be used as a learning platform. It allows you to write Solidity smart contracts with linting, import from GitHub, compile contracts to the EVM, deploy contracts, and connect to & interact with already deployed smart contracts.

Learn more about deploying contracts to Celo with Remix [here](../developer-resources/deploy-remix).

### Metamask

[MetaMask](https://metamask.io/) is a crypto wallet that can be used in-browser and on mobile to interact with the Ethereum blockchain. Many dApps in the space integrate with MetaMask, and we're excited to bring its functionality to the Celo ecosystem.

With the Celo network's[ Donut Hardfork](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0027.md), which was activated on Mainnet on May 19th, 2021, the protocol now supports[ Ethereum-compatible transactions](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0035.md). This means that users are now able to use MetaMask to interact with the Celo blockchain and dApp developers can more easily port over Ethereum dApps onto Celo. The following guide aims to detail step-by-step how to do that.
