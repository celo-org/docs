# Migrating a Celo L1 node

This guide is designed to help Celo L1 node operators migrate their nodes to the Celo L2. Specifically, it describes how to run the [migration tool](https://github.com/celo-org/optimism/tree/celo-rebase-12/op-chain-ops/cmd/celo-migrate) in order to transform a pre-hardfork db snapshot into a format from which a Celo L2 node can `full` sync.

If you want to run a fresh L2 node, you may skip to the [node operator guide](run-node.md) for instructions on how to `snap` sync from an empty datadir. If you would like to use `full` sync but don't want to migrate your own pre-hardfork datadir, you can also download a migrated datadir from the links provided in the [Network Config & Assets](run-node.md#network-config--assets) section. Note that migrated datadirs won't be available until after the hardfork. For minimal downtime, we recommend migrating your own data for the hardfork.

:::note
The terms L1 and pre-hardfork are used interchangeably to reference Celo before the L2 transition.
:::

## Migration Overview

Migrating a pre-hardfork datadir involves these high-level steps:

1. Upgrade your L1 node to the [latest client release](run-node.md#network-config--assets) so it will stop producing blocks at
   at the hardfork. // TODO(Alec) add before the migration page
2. 1-2 days before the hardfork, stop your node and run a pre-migration to migrate the majority of data. This is not required, but is highly recommended for minimizing downtime. // TODO(Alec) add link
3. Restart your node and wait for the hardfork.
4. Shut down your node.
5. Pull the necessary network configuration artifacts once available (e.g. hardfork block time).
6. Run the migration tool to migrate your L1 datadir and produce the hardfork block.
7. Launch your L2 node with the migrated datadir.

The migration tool can be run multiple times as the L1 chain data grows and will continue migrating from where it last left off.
Please note that the node must be stopped before the migration tool is run, even once it has reached the hardfork.

## Before the hardfork

There are some important steps node operators should take ahead of the L2 hardfork. These include upgrading to the [latest client release](run-node.md#network-config--assets) so that the L1 network will stop producing blocks at the hardfork, and running a pre-migration 1-2 days before the hardfork. If you have not yet read the [Preparing for the L2 migration](prepare-node.md) page, please do so before continuing.

<!-- ## Before the migration

// TODO(Alec) Move this to its own page
// TODO(Alec) add prepare for hardfork (L2 hardfork preparation) page where the correct client version is listed and the migration block number is listed. This can also mention pre-migration

:::warning
__It is not recommended to migrate from an L1 archive datadir.__

If you only have an L1 archive node, we recommend syncing an L1 full node in preparation for the Mainnet migration. You can still run an L2 archive node after migrating from an L1 full node datadir. See the [archive node docs](#running-a-celo-archive-node) for more information.
:::

Prior to the hardfork, node operators must upgrade their existing L1 nodes to
the respective release below. These releases will have a hardfork block
configured. L1 nodes with a hardfork block will cease producing or accepting
blocks at the block immediately preceding the hardfork block.

* Alfajores *26384000*
  * Celo L1 client: [celo-blockchain v1.8.7](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.7).
  * Docker image `us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.7`
* Baklava *28308600*
  * Celo L1 client: [celo-blockchain v1.8.8](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.8).
  * Docker image `us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.8`
* Mainnet *31056500*
  * Celo L1 client: [celo-blockchain v1.8.9](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.9).
  * Docker image `us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.9`

### Run the pre-migration tool

Node operators who wish to minimize the migration downtime during the hardfork can perform pre-migrations with the following steps.

1. Stop your L1 node.
2. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd`
   into the root of the project.
3. Run `./migrate pre <network> <path-to-your-L1-datadir> [<l2_destination_datadir>]` where `<network>` is one of `alfajores`, `baklava`, or `mainnet`. If a destination datadir is specified, ensure that the value of `DATADIR_PATH` inside `.env` is updated to match. The pre-migration process will take at least several minutes to complete.
4. Once the pre-migration is complete, you can start your L1 node again. -->

## Running the migration

:::warning
__It is not recommended to migrate from an L1 archive datadir.__

If you only have an L1 archive node, we recommend syncing an L1 full node in preparation for the Mainnet migration. You can still run an L2 archive node after migrating from an L1 full node datadir. See the [archive node docs](#running-a-celo-archive-node) for more information.
:::

Once the hardfork block number is reached, node operators should follow these steps to migrate their nodes.

1. Stop your L1 node.

2. Pull the latest version of [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd` into the root of the project.

    ```bash
    git clone https://github.com/celo-org/celo-l2-node-docker-compose.git
    cd celo-l2-node-docker-compose
    ```

3. Run the full migration.

   A full migration will run a pre-migration followed by some additional steps to migrate new data and produce the hardfork block. The pre-migration step will be significantly faster if it has already been run once on the L1 datadir, as the majority of data will have already been migrated. See [Preparing for the L2 migration](prepare-node.md) for instructions on running a pre-migration ahead of the hardfork.

   Please ensure that your L1 node is stopped before running the migration tool.

   ```bash
   ./migrate full <network> <path-to-your-L1-datadir> [<l2_destination_datadir>]
   ```

   If a destination datadir is specified, ensure that `DATADIR_PATH` inside `.env` is updated to match.

   The migration process will take at least several minutes to complete.

4. Verify the migration was successful by looking for `Migration successful` at the
   end of the output.

   Your datadir is now ready to use with a Celo L2 node.

## Missing Data / DB check failures

Both the `pre` and `full` migration commands will first run a script to check whether the source db provided has any gaps in data. This check may fail with an error indicating that data is missing from your source db, in which case you should try again with a different source db until the check passes.
To check if a db has gaps, you can simply re-run the migration command which will automatically perform the check each time.
Alternatively, you can run the check-db script on its own as follows.

1. Check out the latest version of the script in [celo optimism monorepo](https://github.com/celo-org/optimism).

   ```bash
   git clone https://github.com/celo-org/optimism
   cd optimism
   cd op-chain-ops
   ```

2. Build the script

   ```bash
   make celo-migrate
   ```

3. Run the script

   ```bash
   go run ./cmd/celo-migrate check-db --db-path <path-to-your-L1-datadir> [--fail-fast]
   ```

   This command takes in an optional `--fail-fast` flag that will make it exit at the first gap detected as it does when run via [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose). If the `--fail-fast` flag is not provided then the script will collect all the gaps it finds and print them out at the end.

## Running a Celo archive node

// TODO(Alec) move this to run-node page

We recommend only running the migration on full node data, and not on archive node data. If you only have L1 archive nodes, we recommend syncing a L1 full node for the Mainnet migration.

The L2 execution client cannot use pre-hardfork state data, so migrating an archive datadir will just copy large amounts of data unnecessarily. The migration script will also run slowly and consume large amounts of memory when run on archive data. For these reasons, we recommend only running the migration script on a full node L1 datadir even if you plan to run an L2 archive node.

To run an L2 archive node, you should migrate from an L1 full node datadir but still start the L2 execution client in archive mode. This will allow the node to accept rpc requests that require an archive node. Then, you should set `OP_GETH__HISTORICAL_RPC` in `.env` to the RPC address of a running legacy L1 archive node. The L2 node will proxy requests for pre-hardfork state and execution to the legacy L1 archive node instead of looking for the archive state in its own database. The L2 node will still run as a standard archive node storing post-hardfork data.

Here are step-by-step instructions for using [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) to run an archive L2 node:

1. Make sure you have the correct version of `celo-blockchain` installed. See [l2-migration](../notices/l2-migration.md).
2. Sync an L1 archive node.
3. Sync an L1 full node.
4. 1-2 days before the migration block, run a [pre-migration](#run-the-pre-migration-tool) on the L1 full node datadir.
5. Wait for the migration block.
6. Stop both nodes once the migration block is reached.
7. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd`
   into the root of the project.
8. Run `./migrate full <network> <path-to-your-L1-full-node-datadir> [<l2_destination_datadir>]` where
   `<network>` is one of `alfajores`, `baklava`, or `mainnet`. If a destination datadir is specified,
   ensure that the value of `DATADIR_PATH` inside `.env` is updated to match. The migration process
   will take at least several minutes to complete.
9. Verify that the migration was successful by looking for the `Migration successful` message at the
   end of the output.
10. Run `cp <network>.env .env` where `<network>` is one of `alfajores`, `baklava`, or `mainnet`.
11. Open `.env` and set `OP_GETH__SYNCMODE=full` and `NODE_TYPE=archive` to enable archive mode.
12. Open `.env` and set `HISTORICAL_RPC_DATADIR_PATH` to the path of your L1 archive datadir. This will prompt the tool to start an L1 archive node for you with that datadir. If you would prefer to start the L1 archive node yourself, set `OP_GETH__HISTORICAL_RPC` to the L1 archive node RPC endpoint and do not set `HISTORICAL_RPC_DATADIR_PATH`. The L1 archive node will not need the same flags as it did before the hardfork, as it will not be syncing new blocks. To see how we recommend re-starting the L1 archive node see this [script](https://github.com/celo-org/celo-l2-node-docker-compose/blob/30ee2c4ec2dacaff10aaba52e59969053c652f05/scripts/start-historical-rpc-node.sh#L19).
13. Run `docker-compose up -d --build` to start the L2 node (and the L1 archive node if `HISTORICAL_RPC_DATADIR_PATH` is set).
14. Inspect the progress of the node by running `docker-compose logs -n 50 -f op-geth`. This will
   display the last 50 lines of the logs and follow the logs as they are written. In a syncing node,
   you would expect to see lines of the form `Syncing beacon headers  downloaded=...` where the
   downloaded number is increasing. Once syncing of the beacon headers is complete, full sync will
   begin by applying blocks on top of the hardfork block.
15. Validate the progression of the node by fetching the current block number via the RPC API and seeing that it is increasing (e.g. `cast block-number --rpc-url http://localhost:9993`).
16. Try querying historical state to test archive functionality. (e.g. `cast balance --block <pre-migration-block-number> <address> --rpc-url http://localhost:9993`)

For more information on using [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) see the [README](https://github.com/celo-org/celo-l2-node-docker-compose/blob/30ee2c4ec2dacaff10aaba52e59969053c652f05/README.md#L1).
