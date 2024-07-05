---
title: Introduction to Cel2
description: Introducion to Cel2
---

Celo is transitioning from being an independent EVM-compatible Layer 1 blockchain to an Ethereum Layer 2. Learn more about the CEL2 announcement [here](https://forum.celo.org/t/clabs-proposes-migrating-celo-to-an-ethereum-l2-leveraging-the-op-stack/7902).

Dango Testnet is the first Cel2 public test network for developers building on Cel2.

:::warning
The Dango Testnet is designed for testing and experimentation by developers. Its tokens hold no real world economic value. You may encounter bugs and limitations with the software and documentation.
:::

Features of Dango L2 Testnet

- Full Alfajores history and state migration
- CELO token duality
- Fee abstraction
- Native Bridging to the L1
- EigenDA

Tooling Available for Dango L2 Testnet

- Explorer: https://celo-dango.blockscout.com/

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
