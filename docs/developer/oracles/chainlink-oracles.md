---
title: Using Chainlink Oracles
description: Tutorial on how to use the Chainlink Oracles on Celo
---

By the conclusion of this tutorial, you will have a thorough understanding of how to integrate your decentralized application (dApp) with Chainlink oracles.

This document will cover:

- Overview of Chainlink
- Integration with Chainlink
- Practical Examples

## Overview of Chainlink

Chainlink is a decentralized oracle network that enables smart contracts to securely interact with real-world data and services outside the blockchain. It provides reliable, tamper-proof inputs and outputs for complex smart contracts on any blockchain.

Chainlink offers a robust and secure infrastructure for fetching and delivering data, which is crucial for the functionality of decentralized finance (DeFi) applications.

- **Decentralized Data Model**: Aggregates data from multiple sources to ensure accuracy and reliability.
- **Off-Chain Reporting (OCR)**: Reduces gas costs by aggregating data off-chain and submitting a single transaction on-chain.
- **Wide Adoption**: Used by leading DeFi projects like Aave, Synthetix, and Compound.

For more detailed information about the Chainlink protocol, please refer to the [Chainlink documentation](https://docs.chain.link/data-feeds).

## Available Data

Chainlink provides a wide range of data feeds, including asset prices, reserve balances, and more. These data feeds are essential for DeFi applications to function correctly and securely.

You can explore available data feeds and their providers on [data.chain.link](https://data.chain.link/).

## Integration with Chainlink

**IMPORTANT**: Before using Chainlink oracles in production dApps, ensure you understand the security implications and best practices. Chainlink provides extensive documentation and support to help you integrate their oracles securely.

Please review this [short documentation](https://docs.chain.link/data-feeds) to learn how to integrate your dApp with Chainlink oracles.

Note: Chainlink is compatible with various blockchain platforms and libraries. For Ethereum-based dApps, you can use [ethers.js](https://docs.ethers.io/v5/) or [web3.js](https://web3js.readthedocs.io/).

## Code Examples

- [Repository with examples](https://github.com/smartcontractkit/chainlink)
- [Example with multiple contracts](https://docs.chain.link/docs/example-walkthrough/)
- [DeFi dApp using Chainlink](https://blog.chain.link/chainlink-price-feeds-secure-defi/)

## Chainlink Cross-Chain Interoperability Protocol (CCIP)

Chainlink CCIP is a blockchain interoperability protocol that enables developers to build secure applications that can transfer tokens, messages (data), or both tokens and messages across chains. It features defense-in-depth security and is powered by Chainlink's industry-standard oracle networks.

Key capabilities of Chainlink CCIP include:

- **Arbitrary Messaging**: Send arbitrary data to a receiving smart contract on a different blockchain.
- **Token Transfer**: Transfer tokens to a smart contract or directly to an Externally Owned Account (EOA) on a different blockchain.
- **Programmable Token Transfer**: Simultaneously transfer tokens and arbitrary data within a single transaction.

For more detailed information about Chainlink CCIP, please refer to the [Chainlink CCIP documentation](https://docs.chain.link/ccip).

**Note**: Chainlink CCIP is also available on the Celo blockchain.

## Need Assistance?

For any questions, please feel free to contact the Chainlink team [on Discord](https://discord.gg/aSK4zew).
