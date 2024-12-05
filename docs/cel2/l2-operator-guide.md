---
title: Celo L2 Node Operator Guide
---

This guide is designed to help node operators run Celo L2 nodes and to explain
the process of switching from running a Celo L1 node to a Celo L2 node.

## Migration overview

In the Celo L1 to L2 transition, Celo L1 nodes will migrate all historical Celo
data into the Celo L2 node, ensuring that blocks, transactions, logs, and
receipts are fully accessible within the Celo L2 environment.

This process involves 4 steps:


1. Upgrading L1 node to the latest client release so it stops producing blocks
   at the hardfork
2. Waiting for the hardfork
3. Pulling the new network configuration files once they are known (e.g. hardfork block time)
4. Launching the L2 node with snap sync

Optionally, for node operators that want to verify the entire chain history
through the upgrade, they may manually migrate their L1 node chain data into a
format compatible with the L2 node. This is required for all nodes looking to
sync with the full syncmode and for anyone looking to run an archive node. Doing
so involves these steps:

1. Upgrading L1 node to the latest client release so it stops producing blocks
   at the hardfork
2. Optionally running pre-migrations of the L1 datadir (see note below)
2. Waiting for the hardfork
3. Shutting down the L1 node
5. Pulling the new network configuration files once they are known (e.g. hardfork block time)
6. Running the migration tool to migrate the L1 datadir and produce the hardfork block
7. Launching the L2 node with the migrated datadir

If a node operator is interested in minimizing downtime during the hardfork,
they can run the migration tool ahead of time to migrate the majority of the
data ahead of time. The migration tool can be run multiple times as the L1
chain data grows and will continue migrating from where it last left off.
Please note that you still have to shut down your L1 node to do so safely. 

## Detailed instructions

To simplify running L2 nodes, cLabs has created a
[celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose)
repo with all the necessary configuration files and docker compose templates,
which make it easy to pull network configuration files and launch all the
services needed to run a L2 node.

For node operators interesting is using Kubernetes, we recommend using
[Kompose](https://kompose.io) to convert the docker compose template to
Kubernetes helm charts.

Prior to the hardfork, node operators must upgrade their existing L1
nodes to one of the specified releases below. These releases will have a
hardfork block configured. L1 nodes with a hardfork block will cease
producing or accepting blocks at the block immediately preceding the hardfork
block. 


:::info
* Alfajores *26384000*
  * Celo L1 client: [celo-blockchain v1.8.6](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.6). Docker image `us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.6`
* Baklava *27110000*
  * Celo L1 client: [celo-blockchain v1.8.6](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.6). Docker image `us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.6`
* Mainnet *not yet decided*
  * Release *not yet created*
:::

Once this block number is reached node operators are then in a position to
launch the L2 node. Instructions are provided for both snap syncing and full
syncing as the process is quite different.

### Snap sync

1. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose)
   and `cd` into the root of the project.
2. Run `cp <network>.env .env` where `<network>` is one of `alfajores`,
   `baklava`, or `mainnet`
3. Open `.env` and optionally configure any setting you may wish to change, such as setting `NODE_TYPE=archive` to enable archive mode.
4. Run `docker-compose up -d --build`
5. To check the progress of the node you can run `docker-compose logs -n 50 -f
   op-geth` this will display the last 50 lines of the logs and follow the logs
   as they are written. In a syncing node you would expect to see lines of the
   form `Syncing beacon headers  downloaded=...` where the downloaded number is
   increasing and later lines such as `"Syncing: chain download in
   progress","synced":"21.07%"` where the percentage is increasing. Once the
   percentage reaches 100% the node should be synced.
6. At this point you should be able to validate the progression of the node by
   fetching the current block number via the RPC API and seeing that it is
   increasing. (Note that until fully synced the RPC API will return 0 for the
   head block number)

### Full sync

1. Stop your L1 node.
2. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose)
   and `cd` into the root of the project.
3. Run `./migrate full <network> <path-to-your-L1-datadir>` where `<network>`
   is one of `alfajores`, `baklava`, or `mainnet`. This will likely take some
   minutes to complete. Note that the migration does not modify the original
   datadir, the migrated data is written to a new directory.
4. Verify that the migration was successful by looking for the `Migration
   successful` message at the end of the output.
5. Run `cp <network>.env .env` where `<network>` is one
   of `alfajores`, `baklava`, or `mainnet`
6. Open `.env` and set `OP_GETH__SYNCMODE=full` and optionally configure any
   setting you may wish to change, such as setting `NODE_TYPE=archive` to
   enable archive mode
7. Run `docker-compose up -d --build`
8. To inspect the progress of the node you can run `docker-compose logs -n 50 -f
   op-geth` this will display the last 50 lines of the logs and follow the logs
   as they are written. 
9. At this point you should be able to validate the progression of the node by
   fetching the current block number via the RPC API and seeing that it is
   increasing.

### Pre migration

Node operators who wish to minimize the migration downtime during the hardfork, can perform pre-migrations with the following steps.

1. Stop your L1 node.
2. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose)
   and `cd` into the root of the project.
3. Run `./migrate pre <network> <path-to-your-L1-datadir>` where `<network>` is one of `alfajores`, `baklava`, or `mainnet`. This will likely take some minutes to complete.
4. Once the pre-migration is complete, you can start your L1 node again.