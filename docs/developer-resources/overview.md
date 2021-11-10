---
title: Overview
description: Overview of key tools and resources for developers to build dApps on Celo.
slug: /developer-guide/overview
---

# Developer Guide

Overview of key tools and resources for developers to build dApps on Celo.

___

## Quick Start Guides

View the [Developer Code Examples page](/developer-resources/start.md) to get started using the Celo SDKs with guided coding exercises.

## Tools

### SDKs

- [ContractKit](/developer-guide/contractkit)
  - Javascript package of Celo blockchain utilities
  - Manage connections to the Celo blockchain, accounts, send transactions, interact with smart contracts, etc.
  - A set of wrappers around the core protocol smart contracts to easily connect with contracts related to governance, validators, on-chain exchange, etc.
  - Depends on [web3.js](https://web3js.readthedocs.io/en/latest/)
- [Celo Ethers.js Wrapper](https://github.com/celo-tools/celo-ethers-wrapper)
  - A minimal wrapper to make [ethers.js](https://docs.ethers.io/v5/) compatible with the Celo network
- [use-contractkit](https://github.com/celo-tools/use-contractkit)
  - A [Web3Modal](https://web3modal.com/)-like experience that injects ContractKit into your web-based application. Supports a variety of different wallets, including but not limited to Valora, Ledger, Metamask (Celo compatible fork) and any WalletConnect compatible wallets
- [Wallet Connect](walkthroughs/wallet-connect.md) is an open source protocol for connecting decentralised applications to mobile wallets with QR code scanning or deep linking.
- [Python SDK](https://github.com/blaize-tech/celo-sdk-py)
- [Java SDK](https://github.com/blaize-tech/celo-sdk-java)

### Infrastructure

- [Valora](https://valoraapp.com/) provides a clean, intuitive UI where users can send transactions and interact with smart contracts
- [Forno](/developer-guide/forno)
  - Node access service so you can connect your dapp to the Celo blockchain without having to run node infrastructure
- [QuickNode](https://www.quicknode.com/chains/celo)
  - Enterprise node service with a dashboard, metrics, security controls, customer support and no rate limits (pay-as-you-go).
- [Figment DataHub](https://figment.io/datahub/celo/) offers direct access to Celo’s RPC via our highly available full node infrastructure.
- [ODIS](/developer-resources/contractkit/odis.md)
  - Oblivious decentralized identity service
  - Lightweight identity layer that makes it easy to send cryptocurrency to a phone number
- Blockscout block explorers
  - [Mainnet](http://explorer.celo.org/)
  - [Alfajores testnet](http://alfajores-blockscout.celo-testnet.org/)
- [Stats.celo.org](http://stats.celo.org) to check network activity and health

#### Networks

- [Celo Mainnet](../getting-started/mainnet/index.md)
- [Alfajores Testnet](/getting-started/alfajores-testnet)
  - [Faucet](https://celo.org/developers/faucet) for free testnet CELO and cUSD
  - [Forno](forno/) supports connections to alfajores
  - Requires Alfajores Celo wallet for mobile device testing (please request, [support@clabs.co](mailto:support@clabs.co))
- [Baklava testnet](/getting-started/baklava-testnet) for validators and testing protocol changes

### Ethereum Tools

Similarities between Celo and Ethereum means you can use many of the most popular Ethereum developer tools. Celo supports the EVM, so tools for writing smart contracts in Solidity (or any language that compiles to EVM bytecode) are compatible with Celo.

- [Metamask](https://metamask.io/) is one of the most popular EVM blockchain wallets. Learn more about how to use Metamask with Celo [here](../getting-started/wallets/using-metamask-with-celo/index.md).
- ERC20, NFT (ERC721) and other smart contract interface standards are supported, see [Celo for Ethereum Developers](developer-resources/celo-for-eth-devs.md)
- [Truffle](https://www.trufflesuite.com/)
- [OpenZeppelin](https://openzeppelin.com/)
- [Remix](https://remix.ethereum.org/)
- Many more

### Ongoing projects

- [Wallets](../getting-started/wallets/index.md)
- [Community projects & Ecosystem](https://celohub.org/)
- [Grant recipients](https://celo.org/experience/grants/directory)

## Community

- Join our [Discord](https://chat.celo.org)
- [Discourse Forum](https://forum.celo.org/)
