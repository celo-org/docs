---
title: Celo Sepolia Testnet
description: Collection of resources to get started with Celo Sepolia Testnet (Celo's Developer Testnet).
---

# Celo Sepolia Testnet

Get started with Celo Sepolia Testnet (Celo's Developer Testnet).

---

## What is the Celo Sepolia Testnet?

The **Celo Sepolia Testnet** is Celo's new developer testnet built on Ethereum Sepolia, designed to replace Alfajores following the planned Holesky deprecation in September 2025. This testnet provides a stable environment for developers to build, test, and deploy decentralized applications before launching on Mainnet. Developers can access testnet funds via the faucet, interact with smart contracts, and experiment with wallets, dApps, and node operations without financial risk.

**Key Details:**

- **Chain ID**: 11142220
- **L1 Foundation**: Built on Ethereum Sepolia
- **Fresh State**: Starts with a clean slate, no state inheritance from Alfajores
- **Functionality**: Provides the same developer experience as Alfajores

The full network information is available [in the network overview](/network#celo-sepolia-testnet).

:::info

Celo Sepolia is currently in early access phase with internal transition and key partners. Public rollout is planned for the coming weeks. For the latest updates, see the [Celo Sepolia launch notice](/cel2/notices/celo-sepolia-launch).

:::

:::warning

The Celo Sepolia Testnet is designed for testing and experimentation by developers. Its tokens hold no real world economic value. The testnet software will be upgraded on a regular basis. You may encounter bugs and limitations with the software and documentation.

:::

Please help the community to improve Celo by asking questions on the [Forum](https://forum.celo.org/)!

## Useful links

- [Celo Sepolia Self-Serve Faucet](https://faucet.celo.org/celo-sepolia)
- [Celo Sepolia Network Block Explorer](https://celo-sepolia.blockscout.com/)
- [Celo Sepolia Launch Notice](/cel2/notices/celo-sepolia-launch)
- [Running a Node on Celo Sepolia](/cel2/operators/run-node)

## Migration from Alfajores

For developers currently using Alfajores, consider the following when migrating to Celo Sepolia:

- **New Chain ID**: Update applications to support chain ID 11142220
- **Fresh State**: All contracts will need to be redeployed
- **Parallel Operation**: Both testnets will run simultaneously during the transition period
- **Testing Environment**: Begin testing applications on Celo Sepolia in preparation for the Alfajores sunset

## Network Configuration

For detailed network configuration including RPC endpoints, contract addresses, and P2P peer information, see the [Running a Node guide](/cel2/operators/run-node#celo-sepolia).
