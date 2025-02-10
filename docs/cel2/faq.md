---
title: Cel2 FAQ
description: Frequently Asked Questions about Cel2
---

### When is the Celo mainnet becoming an L2?

### When is the Baklava testnet becoming an L2?

### When is Alfajores testnet becoming an L2?

The Alfajores testnet has already been migrated to an L2.

### How do I run a node or upgrade an existing node?

See the guides for [running a node](./operators/docker-node.md) or the guide on [how to migrate a L1 node](./operators/migrate-node.md)).

### What RPC endpoints are available for the Alfajores testnet?

See the Alfajores network info [here](https://docs.celo.org/network#celo-alfajores-l2-testnet).

### Is there an Alfajores faucet? Where? How do I get funds?

See the Alfajores network info [here](https://docs.celo.org/network#celo-alfajores-l2-testnet).

### Is there an Alfajores explorer?

See the Alfajores network info [here](https://docs.celo.org/network#celo-alfajores-l2-testnet).

### How can I use the native bridge with Alfajores?

See the Alfajores network info [here](https://docs.celo.org/network#celo-alfajores-l2-testnet).

### What’s the difference between Dango and Alfajores?

Dango was a throw away testnet forked from Alfajores at block [24940100](https://celo-alfajores.blockscout.com/block/0xc0e521a7b7326064ec12f51449de16d3218de161335daaa4ae8bbed1790b4a6c) to test the migration to L2. It was shut down in October 2024.

Alfajores is a long running Celo network testnet that was [launched in July 2019](https://blog.celo.org/introducing-alfajores-1b162ebcb44d) and  upgraded to L2 in September 2024.

See the Alfajores network info [here](https://docs.celo.org/network#celo-alfajores-l2-testnet).

### Is there anything that used to work on Alfajores that doesn’t anymore?

See [What's Changed Celo L1 -> L2](./whats-changed/l1-l2.md) and [L1 -> L2 Migration Changes](https://specs.celo.org/l2_migration.html) in the spec for greater detail.

## Celo L2 setup

### How is the Celo L2 different to Optimism?

See [What's Changed Optimism -> Celo L2](./whats-changed/op-l2).
Also see [Celo L2 Specification](https://specs.celo.org/root.html) for greater detail.

### What are the costs for L1 data and how are they paid?

See [What's changed section covering L1 fees](./whats-changed/op-l2#l1-fees).

### I saw EigenDA mentioned, is it used?

Yes! See [EigenDA](https://specs.celo.org/eigenda.html).

### What's the block time?

The block period is 1 second.

### What's the throughput?

The gas limit per block is 30 million, so the maximum throughput is 30M gas/s.

## What happened to these features?

- CELO token duality? Supported, see [Token Duality](https://specs.celo.org/token_duality.html).
- Fee currencies? Supported, see [Fee Abstraction](https://specs.celo.org/fee_abstraction.html).
- Epoch rewards? Supported in Alfajores and Mainnet, see [Epochs and Rewards](https://specs.celo.org/smart_contract_updates_from_l1.html#epochs-and-rewards).
