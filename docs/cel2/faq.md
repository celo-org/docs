---
title: Cel2 FAQ
description: Frequently Asked Questions about Cel2
---

## Isthmus

### My Alfajores node stalled at the Isthmus hardfork block (49908280)

If you reached the hardfork block before upgrading to v2.1.0 your node can get stuck.

This can be resolved by upgrading both op-geth and op-node to v2.1.0, stopping
op-node, rewinding the op-geth head to before the hardfork and starting
op-node again.

To rewind the head you can use:

```
cast rpc -r <op-geth-node-address> debug_setHead 49908270
```

## Mainnet

### My node is having trouble keeping up to date with the chain head / having trouble connecting to and finding peers

A couple of issues could be causing this.

* If you are running multiple instances of op-node, make sure to check that they each have a unique and persisted private key at `--p2p.priv.path`
* Ensure that your node is accessible to other nodes, check the __Configure P2P for external network access__ section under [Running a full node](/cel2/operators/run-node.md#running-a-full-node)

### How do I run a node or upgrade an existing node?

See the guides for [running a node](/cel2/operators/run-node.md) or the guide on [how to migrate an L1 node](/cel2/operators/migrate-node.md).

### Do I need to run my own EigenDA proxy?

Yes. This is part of [running a node](/cel2/operators/run-node.md).
If you're using the [Docker Compose Setup](https://github.com/celo-org/celo-l2-node-docker-compose), it's included.

### What happened to funds on Celo L1 after the migration to L2?

All balances have been carried over to the L2, unchanged.

### How do ERC-20 tokens and the native CELO token work after the migration to L2?

There is no change and it continues to work in the same way as before.

### Is Celo able to support Solidity versions above 0.8.19?

Yes, same as with Ethereum.

### What data model changes happened in the RPC specs (esp. which gas tokens) between Celo L1 and L2?

Have a look at the [changes from L1 to L2 in the specs](https://specs.celo.org/l2_migration.html#changes-for-json-rpc-users).

### What happens to Validators?

Validators are becoming [Community RPC providers](/cel2/operators/community-rpc-node).

### Where can I see those [Community RPC providers](/cel2/operators/community-rpc-node)?

There are multiple options.

* Install [Celo CLI](/cli/index.md) at version 6.1.0 or later. Then run: `celocli network:community-rpc-nodes`.
* [Vido Node Explorer](https://dev.vido.atalma.io/celo/rpc)
* [Celo Community RPC Gateway](https://celo-community.org/)

### What happened to governance, since the migration from Celo L1 to L2?

[Governance](/what-is-celo/using-celo/protocol/governance/overview) remains a pillar of the Celo blockchain. The Validator Hotfix process has been adapted, see [Updated Governance Hotfix](https://specs.celo.org/l2_migration.html#updated-governance-hotfix) for the changes.

### What happened to these features?

* CELO token duality? Supported, see [Token Duality](https://specs.celo.org/token_duality.html).
* Fee currencies? Supported, see [Fee Abstraction](https://specs.celo.org/fee_abstraction.html).
* Epoch rewards? Epochs now work differently, but rewards stay, see [Epochs and Rewards](https://specs.celo.org/smart_contract_updates_from_l1.html#epochs-and-rewards).

### How is the Celo L2 different to Optimism?

See [What's Changed Optimism -> Celo L2](./whats-changed/op-l2).
Also see [Celo L2 Specification](https://specs.celo.org/root.html) for greater detail.

### What are the costs for L1 data and how are they paid?

See [What's changed section covering L1 fees](/cel2/whats-changed/op-l2#l1-fees).

### What's the block time?

The block period is 1 second.

### What's the throughput?

The gas limit per block is 30 million, so the maximum throughput is 30M gas/s.

### Is there anything that used to work on Celo L1 that doesn’t anymore on L2?

See [What's Changed Celo L1 -> L2](/cel2/whats-changed/l1-l2.md) and [L1 -> L2 Migration Changes](https://specs.celo.org/l2_migration.html) in the spec for greater detail.

## Testnets

### What’s the difference between Dango and Alfajores?

Dango was a short-lived testnet forked from Alfajores at block [24940100](https://celo-alfajores.blockscout.com/block/0xc0e521a7b7326064ec12f51449de16d3218de161335daaa4ae8bbed1790b4a6c) to test the migration to L2. It was shut down in October 2024.

Alfajores is a long running Celo network testnet that was [launched in July 2019](https://blog.celo.org/introducing-alfajores-1b162ebcb44d) and  upgraded to L2 in September 2024.

See the [Alfajores network info here](/network#celo-alfajores-testnet).
