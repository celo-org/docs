---
title: Cel2 FAQ
description: Frequently Asked Questions about Cel2
---

## Mainnet

### When is Celo mainnet becoming an L2?

:spiral_calendar: Celo L2 Mainnet Date: March 26, 2025, 3:00 AM UTC

:chains: Hardfork Block Height: 31056500

### How do I run a node or upgrade an existing node?

See the guides for [running a node](./operators/run-node.md) or the guide on [how to migrate an L1 node](./operators/migrate-node.md).

### Do I need to run my own EigenDA proxy?

Yes. This is part of [running a node](./operators/run-node.md).
If you're using the [Docker Compose Setup](https://github.com/celo-org/celo-l2-node-docker-compose), it's included.

### Will the migration happen immediately, or will there be a grace period for projects to transition to the new version?

There should be no grace period needed, as nothing should change for common users. Expect a period with no block production of at least 20 minutes during the transition.

### Will it be necessary to withdraw funds from Celo L1 in advance or will they be transferred to L2? 

No. All balances will carry over to the L2 unchanged.

### Will there be multiple RPC node providers? 

There will be multiple RPC providers supporting Celo L2. Please see [Day 1 Partners](https://docs.celo.org/cel2/notices/day-1-partners)
for a list of RPC providers comfirmed for Day 1. 

### How will ERC-20 tokens and the native CELO token work after the migration?

There will be no change and it will continue to work as it does now.

### Will already deployed smart contracts need to be redeployed?

No, they will not.

### Will Celo be able to support solidity versions above 0.8.19?

Yes. This will work the same as with Ethereum

### What data model changes will happen in the RPC specs (esp. which gas tokens)?

We are going to have the same RPC specs as Optimism (e.g. we won't have block receipts)

### What happens to Validators?

Validators are becoming [Community RPC providers](./operators/community-rpc-node).

### What happens to governance?

[Governance](/what-is-celo/using-celo/protocol/governance/overview) remains a pillar of the Celo blockchain. The Validator Hotfix process has been adapted, see [Updated Governance Hotfix](https://specs.celo.org/l2_migration.html#updated-governance-hotfix) for the changes. 

### What happened to these features?

- CELO token duality? Supported, see [Token Duality](https://specs.celo.org/token_duality.html).
- Fee currencies? Supported, see [Fee Abstraction](https://specs.celo.org/fee_abstraction.html).
- Epoch rewards? No more epochs, but rewards stay, see [Epochs and Rewards](https://specs.celo.org/smart_contract_updates_from_l1.html#epochs-and-rewards).

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

### Is there anything that used to work that doesn’t anymore?

See [What's Changed Celo L1 -> L2](./whats-changed/l1-l2.md) and [L1 -> L2 Migration Changes](https://specs.celo.org/l2_migration.html) in the spec for greater detail.

## Alfajores

### What RPC endpoints are available for the Alfajores testnet?

See the Alfajores network info [here](/network#celo-alfajores-l2-testnet).

### Is there an Alfajores faucet? Where? How do I get funds?

See the Alfajores network info [here](/network#celo-alfajores-l2-testnet).

### Is there an Alfajores explorer?

See the Alfajores network info [here](/network#celo-alfajores-l2-testnet).

### How can I use the native bridge with Alfajores?

See the Alfajores network info [here](/network#celo-alfajores-l2-testnet).

### What’s the difference between Dango and Alfajores?

Dango was a short-lived testnet forked from Alfajores at block [24940100](https://celo-alfajores.blockscout.com/block/0xc0e521a7b7326064ec12f51449de16d3218de161335daaa4ae8bbed1790b4a6c) to test the migration to L2. It was shut down in October 2024.

Alfajores is a long running Celo network testnet that was [launched in July 2019](https://blog.celo.org/introducing-alfajores-1b162ebcb44d) and  upgraded to L2 in September 2024.

See the Alfajores network info [here](/network#celo-alfajores-l2-testnet).
