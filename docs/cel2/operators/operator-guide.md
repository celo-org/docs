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

1. Upgrading the L1 node to the latest client release so it stops producing blocks
   at the hardfork
2. Waiting for the hardfork
3. Pulling the new network configuration files once they are known (e.g. hardfork block time)
4. Launching the L2 node with snap sync

Optionally, for node operators that want to verify the entire chain history
through the upgrade, they may manually migrate their L1 (full) node chain data into a
format compatible with the L2 node. This is required for all nodes looking to full
sync and for anyone looking to run an archive node. Doing
so involves these steps:

1. Upgrading the L1 node to the latest client release so it stops producing blocks
   at the hardfork
2. Optionally running pre-migrations of the L1 datadir (see note below)
2. Waiting for the hardfork
3. Shutting down the L1 node
5. Pulling the new network configuration files once they are known (e.g. hardfork block time)
6. Running the migration tool to migrate the L1 datadir and produce the hardfork block
7. Launching the L2 node with the migrated datadir

If a node operator is interested in minimizing downtime during the hardfork,
they can run the migration tool ahead of time to migrate the majority of the
data before the hardfork. The migration tool can be run multiple times as the L1
chain data grows and will continue migrating from where it last left off.
Please note that the node must be stopped before the migration tool is run. 

## Detailed instructions

To simplify running L2 nodes, cLabs has created a
[celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose)
repo with all the necessary configuration files and docker compose templates,
which make it easy to pull network configuration files and launch all the
services needed to run an L2 node.

For node operators interested in using Kubernetes, we recommend using
[Kompose](https://kompose.io) to convert the docker compose template to
Kubernetes helm charts.

Prior to the hardfork, node operators must upgrade their existing L1
nodes to the respective release below. These releases will have a
hardfork block configured. L1 nodes with a hardfork block will cease
producing or accepting blocks at the block immediately preceding the hardfork
block.


:::info
* Alfajores *26384000*
  * Celo L1 client: [celo-blockchain v1.8.7](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.7). Docker image `us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.7`
* Baklava *not yet decided*
  * Release *not yet created*
* Mainnet *not yet decided*
  * Release *not yet created*
:::

Once this block number is reached, node operators can then launch the L2 node. Instructions are
provided for both snap syncing and full syncing as the process is quite different.

### Snap sync

1. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose)
   and `cd` into the root of the project.
2. Run `cp <network>.env .env` where `<network>` is one of `alfajores`,
   `baklava`, or `mainnet`.
3. Open `.env` and optionally configure any setting you may wish to change, such as setting `NODE_TYPE=archive` to enable archive mode.
4. Run `docker-compose up -d --build`.
5. To check the progress of the node you can run `docker-compose logs -n 50 -f
   op-geth`. This will display the last 50 lines of the logs and follow the logs
   as they are written. In a syncing node, you would expect to see lines of the
   form `Syncing beacon headers  downloaded=...` where the downloaded number is
   increasing and later lines such as `"Syncing: chain download in
   progress","synced":"21.07%"` where the percentage is increasing. Once the
   percentage reaches 100%, the node should be synced.
6. At this point, you should be able to validate the progression of the node by
   fetching the current block number via the RPC API and seeing that it is
   increasing. (Note that until fully synced, the RPC API will return 0 for the
   head block number).

### Full sync

1. Stop your L1 node.
2. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd`
   into the root of the project.
3. Run `./migrate full <network> <path-to-your-L1-datadir> [<l2_destination_datadir>]` where
   `<network>` is one of `alfajores`, `baklava`, or `mainnet`. If a destination datadir is specified,
   ensure that the value of `DATADIR_PATH` inside `.env` is updated to match. The migration process
   will take at least some minutes to complete. Note that in all cases, the migration does not modify
   the original datadir; the migrated data is written to a new directory.
4. Verify that the migration was successful by looking for the `Migration successful` message at the
   end of the output.
5. Run `cp <network>.env .env` where `<network>` is one of `alfajores`, `baklava`, or `mainnet`.
6. Open `.env` and set `OP_GETH__SYNCMODE=full` and optionally configure any setting you may wish to
   change, such as setting `NODE_TYPE=archive` to enable archive mode.
7. Run `docker-compose up -d --build`.
8. To inspect the progress of the node you can run `docker-compose logs -n 50 -f op-geth`. This will
   display the last 50 lines of the logs and follow the logs as they are written. In a syncing node,
   you would expect to see lines of the form `Syncing beacon headers  downloaded=...` where the
   downloaded number is increasing. Once syncing of the beacon headers is complete, full sync will
   begin by applying blocks on top of the hardfork block.
9. At this point, you should be able to validate the progression of the node by fetching the current
   block number via the RPC API and seeing that it is increasing.

### Pre-migration

Node operators who wish to minimize the migration downtime during the hardfork can perform pre-migrations with the following steps.

1. Stop your L1 node.
2. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd`
   into the root of the project.
3. Run `./migrate pre <network> <path-to-your-L1-datadir>` where `<network>` is one of `alfajores`, `baklava`, or `mainnet`. This will likely take some minutes to complete.
4. Once the pre-migration is complete, you can start your L1 node again.

### Pre-hardfork archive state access and execution

:::note
It is not recommended to migrate from an L1 archive datadir, as the L2 execution client does not support
executing L1 historical states and it will consume more time and storage.
Instead, run the migration from a full L1 datadir, and if desired, configure the L2 execution client as archive
to run L2 archive requests, and to proxy to a L1 archive node to execute pre-hardfork transactions and state access.
:::

Node operators who were running archive nodes before the migration and wish to maintain execution
and state access functionality for pre-hardfork blocks will need to continue to run their L1 node
and configure their L2 node to proxy pre-hardfork execution and state access requests to the L1 node
by setting the `OP_GETH__HISTORICAL_RPC` in `.env` to the RPC address of their L1 node.

## Network config & Assets

The config and assets for each network can be found at the links below. The
celo-l2-node-docker-compose project automatically handles retrieving the needed
assets so you shouldn't need to manually download them unless running a custom
setup.

### Alfajores
- [Full migrated chaindata](https://storage.googleapis.com/cel2-rollup-files/alfajores/alfajores-migrated-datadir.tar.zst)
- [Rollup deploy config](https://storage.googleapis.com/cel2-rollup-files/alfajores/config.json)
- [L1 contract addresses](https://storage.googleapis.com/cel2-rollup-files/alfajores/deployment-l1.json)
- [L2 allocs](https://storage.googleapis.com/cel2-rollup-files/alfajores/l2-allocs.json)
- [rollup.json](https://storage.googleapis.com/cel2-rollup-files/alfajores/rollup.json)
- [Genesis](https://storage.googleapis.com/cel2-rollup-files/alfajores/genesis.json) used for snap syncing
- p2p peers:
  - op-geth bootnode/peers, to be used with op-geth `--bootnodes` flag:

    ```text
    enode://ac0f42fa46f8cc10bd02a103894d71d495537465133e7c442bc02dc76721a5f41761cc2d8c69e7ba1b33e14e28f516436864d3e0836e2dcdaf032387f72447dd@34.83.164.192:30303
    enode://596002969b8b269a4fa34b4709b9600b64201e7d02e2f5f1350affd021b0cbda6ce2b913ebe24f0fb1edcf66b6c730a8a3b02cd940f4de995f73d3b290a0fc92@34.82.177.77:30303
    enode://3619455064ef1ce667171bba1df80cfd4c097f018cf0205aaad496f0d509611b7c40396893d9e490ee390cd098888279e177a4d9bb09c58387bb0a6031d237f1@34.19.90.27:30303
    enode://e3c54db6004a92d4ee87504f073f3234a25759b485274cc224037e3e5ee792f3b482c3f4fffcb764af6e1859a1aea9710b71e1991e32c1dee7f40352124bb182@35.233.249.87:30303
    enode://674410b34fd54c8406a4f945292b96111688d4bab49aecdc34b4f1b346891f4673dcb03ed44c38ab467ef7bec0b20f6031ad88aa1d35ce1333b343d00fa19fb1@34.168.43.76:30303
    ```

  - op-node static peers, to be used with op-node `--p2p.static` flag:

    ```text
    /ip4/35.197.25.52/tcp/9222/p2p/16Uiu2HAmQEdyLRSAVZDr5SqbJ1RnKmNDhtQJcEKmemrVxe4FxKwR
    /ip4/34.105.22.4/tcp/9222/p2p/16Uiu2HAm1SZBDSugT5MMu7vBY8auDgfZFNhoDeXPLc9Me5FsAxwT
    /ip4/34.83.209.168/tcp/9222/p2p/16Uiu2HAmGJAiUX6HLSo4nLh8T984qxzokwL23cVsYuNZy2SrK7C6
    /ip4/34.83.214.149/tcp/9222/p2p/16Uiu2HAmAko2Kr3eAjM7tnshtEhYrxQYfKUvN2kwiygeFoBAoi8S
    /ip4/34.169.5.52/tcp/9222/p2p/16Uiu2HAmKc6YKHzYgsjBDaj36uAufxpgZFgrzDqVBt6zTPwdhhJD
    ```
- Container images:
  - [Celo L1 client](https://us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.7)
  - [op-geth](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo-v2.0.0-rc1)
  - [op-node](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo9)
  - [eigenda-proxy](https://ghcr.io/layr-labs/eigenda-proxy:v1.4.1)

## Common problems

### Transactions are not being executed

If your node is synced but transtransactions submitted to it are not executed, make sure the the `--rollup.sequencerhttp=https://sequencer.alfajores.celo-testnet.org` flag is correctly set.
