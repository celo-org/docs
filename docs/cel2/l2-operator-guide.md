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

Prior to the transition point, node operators must upgrade their existing L1 nodes to one of the specified releases below. These releases will have a transition block automatically configured. L1 nodes with a transition block will cease producing or accepting blocks at the block immediately preceding the transition block. Once this point is reached, the node can be shut down, and its datadir can be migrated.

### Migration blocks and releases
:::info
* Alfajores *26384000*
  * Celo L1 client: [celo-blockchain v1.8.6](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.6). Docker image `us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.6`
* Baklava *27110000*
  * Celo L1 client: [celo-blockchain v1.8.6](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.6). Docker image `us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.6`
* Mainnet *not yet decided*
  * Release *not yet created*
:::


## Migrating data and running an L2 node

See the [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) project for instructions on migrating data and running an L2 node.
