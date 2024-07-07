---
title: Introduction to Celo Layer 2
description: Introducion to Cel2
---

Celo is evolving from a standalone EVM-compatible Layer 1 blockchain to an Ethereum Layer 2.
Initially proposed by cLabs in July 2023, the Celo L2 aims to deliver a seamless user experience
comparable to Celo L1, characterized by its ease, speed, and low transaction costs. For detailed
information on the CEL2 announcement, refer to the cLabs
[proposal](https://forum.celo.org/t/clabs-proposes-migrating-celo-to-an-ethereum-l2-leveraging-the-op-stack/7902).

## Dango Testnet

The Dango Testnet is the inaugural Celo Layer 2 public test network, designed for developers
building on Cel2. Its primary objectives include:

- Demonstrating a successful state migration with operational continuity.
- Establishing a robust foundation for future developments.

Based on the current state of Alfajores, Dango will run concurrently with it, allowing
infrastructure providers (e.g., RPC providers, indexers, and oracles) to familiarize themselves with
the L2 codebase. Once these providers are prepared, the process of upgrading each existing Celo
testnet will commence, starting with Alfajores followed by Baklava. The final step will be upgrading
the Celo mainnet through a hardfork and governance proposal.

## Dango Features

Dango preserves the majority of Celo's feature set, and introduces some new features, including:

- Full Alfajores history and state
- CELO token duality (ability to use CELO natively and as an ERC20 token)
- Fee abstraction (ability to pay for gas with tokens)
- Native Bridging to and from the L1
- Data Availability via EigenDA
- Staking
- Ultragreen Money

:::warning
The Dango Testnet is designed preliminary for testing and experimentation by developers. Its tokens hold no real world economic value. You may encounter bugs and limitations with the software and documentation.
:::

## Getting Started with Dango

Information and resources to get you started:

- RPC URL: https://forno.dango.celo-testnet.org/
- Explorer: https://celo-dango.blockscout.com/
- ChainID: 44787

:::warning
Please note that the Dango chain ID remains the same as Alfajores, ensuring seamless functionality but introducing the possibility of replay attacks where transactions could be replayed between Dango and Alfajores.
:::

## CeloCLI

1. Setup celo-cli

```bash
celocli config:set --node https://forno.dango.celo-testnet.org/
```

2. Check balance of a Cel2 account

```bash
celocli account:balance $ACCOUNT_ADDRESS --node https://forno.dango.celo-testnet.org/
```

## Useful Links

- [Add Cel2 Dango Testnet to Metamask](/docs/cel2/add-cel2-testnet-to-metamask.md)
- [Dango Faucet](https://faucet.celo.org/dango)
- [Dango Block Explorer by Blockscout](https://celo-dango.blockscout.com/)
- [Superchain Bridge for migrating assets from L1 to L2](https://testnets.superbridge.app/)
- [Layer 2 Specification](https://specs.celo.org/root.html)
- [FAQ](https://docs.celo.org/cel2/faq)
