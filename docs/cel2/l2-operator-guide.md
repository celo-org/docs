---
title: Celo L2 Node Operator Guide
---

This guide is designed to help node operators run Celo L2 nodes and to explain the process of switching from running a Celo L1 node to a Celo L2 node.

## Migration overview

In the Celo L1 to L2 transition, we are migrating all historical Celo data into the Celo L2 node, ensuring that blocks, transactions, logs, and receipts are fully accessible within the Celo L2 environment.

This process involves 3 steps:
1. Shut down the L1 node
2. Run the migration tool to migrate the datadir and produce the transition block.
3. Run the L2 node with the migrated datadir.

Sometime before the transition point, node operators must upgrade their existing L1 nodes to the
latest release which will have a transition block configured. L1 nodes with a transition block
configured will stop producing or accepting blocks at the block prior to the transition block. Once
a node has reached this point it can be shut down and it's datadir can be migrated.

### Migration blocks
:::info
* Alfajores *26384000*
* Baklava *27110000*
* Mainnet *not yet decided*
:::

## Migrating data and running an L2 node

See the [simple-celo-node](https://github.com/celo-org/simple-celo-node) project for instructions on migrating data and running an L2 node.
