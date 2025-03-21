---
title: Celo DevOps Best Practices
description: Best practices for running cloud infrastructure for Celo nodes and services.
---

# DevOps Best Practices

Best practices for running cloud infrastructure for Celo nodes and services.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Cloud Infrastructure Best Practices

### Node Redundancy

If you are running your celo-blockchain nodes for mainnet in the cloud as a validator, then we recommend having more than one node running.

You can use the redundant validator node as a backup node. It's important that it should only be used as a backup node so you must not enable block-signing with it (to avoid double signing).

In case your primary validator node fails for some reason, then having the redundant node is extremely valuable as you can add the validator keys to it and point it to your proxy to continue signing blocks.

### Snapshotting

Another useful thing you can do is enabling snapshotting on your redundant node.

There's no best answer on cadence for snapshotting your redundant node, but one snapshot a week is a good estimate, depending on budget and how the cloud provider charges for snapshotting.

That way, in the event of a node or instance failure on your validator box, which can potentially lead to database failure and requiring you to resync your validator node, then you can use your snapshot as a starting point for syncing and don't have to wait too long to sync.

### Kubernetes

We are working on getting a Kubernetes recommended specification and will update this section once we have a recommended spec. If you are using Kubernetes with your validator node, feel free to submit a PR to update this section with your setup.
