---
title: Using RedStone oracles
description: Tutorial on how to use the RedStone oracles on Celo
---

import ImageWrapper from '@components/ImageWrapper'

By the end of this tutorial you will understand how to intergrate your dApp built on Celo with RedStone oracles.

This document will cover:

- What is RedStone?
- How to use RedStone?
- Examples

## 🚀 What is RedStone?

RedStone is a data ecosystem that delivers fast and accurate financial information in a decentralised fashion using an innovative approach of on-demand data fetching.

RedStone offers a radically different design of Oracles catering for the needs of modern Defi protocols.

- Leverage Arweave blockchain as a cheap and permanent storage
- Use token incentives to motivate data providers to maintain data integrity and the uninterrupted service
- Use signed meta-transactions to deliver prices on-chain
- Although the data at RedStone is persisted on the Arweave chain, it could be used with any other blockchain

You can read much more about the RedStone protocol [in the RedStone compiled documentation.](https://github.com/redstone-finance/redstone-node/blob/main/docs/COMPILED_ORACLE_DOCS.md)

## 📈 What data is available

Thanks to our innovative architecture, we offer more than one thousand of pricing data feeds, including tokens, stocks, ETFs, commodities, and much more for a fraction of regular Oracles integration costs.

You can check available assets and data providers using [app.redstone.finance.](https://app.redstone.finance/)

## 🔥 How to use RedStone?

**IMPORTANT**: RedStone contracts are still undergoing security audit and we are working on the infrastructure secutiry improvements. So, before using RedStone oracles in production dApps, please reach out to us [on Discord.](https://redstone.finance/discord) We will be happy to help you with the integration and will set up a new pool of data provider nodes if there is a need.

Please read this [short documentation](https://github.com/redstone-finance/redstone-evm-connector/blob/master/README.md) to learn how to integrate your dApp with RedStone oracles.

💡 Note: currently RedStone is integrated only with `ethers.js` library, so in order to use it on Celo blockchain dApps you should use [ethers.js](https://docs.ethers.io/v5/) along with [@celo-tools/celo-ethers-wrapper](https://www.npmjs.com/package/@celo-tools/celo-ethers-wrapper).

## 👨‍💻 Code examples

- [Repo with examples](https://github.com/redstone-finance/redstone-evm-connector-examples)
- [Generating pseudo-random values](https://github.com/redstone-finance/redstone-evm-connector-examples/blob/main/contracts/example-pseudo-random.sol)
- [Example with multiple contracts](https://github.com/redstone-finance/redstone-evm-connector-examples/tree/main/contracts/example-proxy-calldata)
- [Synthetic commodities dApp on Celo](https://github.com/redstone-finance/komodo-celo)

## 🙋‍♂️ Need help?

Please feel free to contact RedStone team [on Discord](https://redstone.finance/discord) if you have any questions.
