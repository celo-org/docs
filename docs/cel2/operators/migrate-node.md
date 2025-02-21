# Migrating a Celo L1 node

This guide is designed to help node operators run Celo L2 nodes and to explain
the process of switching from running a Celo L1 node to a Celo L2 node.

If you want to run a fresh L2 node, please follow the [node operator guide](run-node.md).

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
3. Waiting for the hardfork
4. Shutting down the L1 node
5. Pulling the new network configuration files once they are known (e.g. hardfork block time)
6. Running the migration tool to migrate the L1 datadir and produce the hardfork block
7. Launching the L2 node with the migrated datadir

If a node operator is interested in minimizing downtime during the hardfork,
they can run the migration tool ahead of time to migrate the majority of the
data before the hardfork. The migration tool can be run multiple times as the L1
chain data grows and will continue migrating from where it last left off.
Please note that the node must be stopped before the migration tool is run.

The L1 -> L2 migration requires some changes to the database.

## Before the migration

:::warning

It is not recommended to migrate from an L1 archive datadir. The L2 execution client does not
support executing L1 historical states, so migrated archive data will just be taking up space in the L2 datadir for no reason. Attempting to migrate an archive datadir will also cause the migration tool to run very slowly and consume large amounts of memory even if a pre-migration has been performed.

If you wish to run an L2 archive node, you should instead run the migration on a full node L1 datadir and then configure the L2 execution client
in archive mode with a historical rpc service to redirect requests for pre-hardfork state and execution to a legacy L1 archive node running alongside the L2 node. See the [archive node docs](#migrating-a-celo-archive-node) for more detailed intstructions.

If you only have L1 archive nodes currently, we recommend syncing a L1 full node in preparation for the mainnet migration.
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

### Run the pre-migration tool

Node operators who wish to minimize the migration downtime during the hardfork can perform pre-migrations with the following steps.

1. Stop your L1 node.
2. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd`
   into the root of the project.
3. Run `./migrate pre <network> <path-to-your-L1-datadir> [<l2_destination_datadir>]` where `<network>` is one of `alfajores`, `baklava`, or `mainnet`. If a destination datadir is specified, ensure that the value of `DATADIR_PATH` inside `.env` is updated to match. The pre-migration process will take at least several minutes to complete.
4. Once the pre-migration is complete, you can start your L1 node again.

## Running the migration

Once this block number is reached, node operators can then launch the L2 node.

1. Stop your L1 node.
2. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd`
   into the root of the project.
3. Run `./migrate full <network> <path-to-your-L1-datadir> [<l2_destination_datadir>]` where
   `<network>` is one of `alfajores`, `baklava`, or `mainnet`. If a destination datadir is specified,
   ensure that the value of `DATADIR_PATH` inside `.env` is updated to match. The migration process
   will take at least several minutes to complete.
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
   block number via the RPC API and seeing that it is increasing (e.g. `cast block-number --rpc-url http://localhost:9993`).

## Missing Data / DB check failures

Both the `pre` and `full` migration commands will first run a script to check whether the source db provided has any gaps in data. This check may fail with an error indicating that data is missing from your source db, in which case you should try again with a different source db until the check passes.
To check if a db has gaps, you can simply re-run the migration command which will automatically perform the check each time.
Alternatively, you can run the check-db script on its own by checking out the latest version the [celo optimism monorepo](https://github.com/celo-org/optimism), running `cd op-chain-ops` followed by `make celo-migrate`, and finally running `go run ./cmd/celo-migrate check-db --db-path <path-to-your-L1-datadir>`. This command takes in an optional `--fail-fast` flag that will make it exit at the first gap detected as it does in the migration script. If the `--fail-fast` flag is not provided then the script will collect all the gaps it finds and print them out at the end.

## Migrating a Celo archive node

We recommend only running the migration on full node data, and not on archive node data. If you only have L1 archive nodes, we recommend syncing a L1 full node for the Mainnet migration.

The L2 execution client cannot use pre-hardfork state data, so migrating an archive datadir will just copy large amounts of data unnecessarily. The migration script will also run slowly and consume large amounts of memory when run on archive data. For these reasons, we recommend only running the migration script on a full node L1 datadir even if you plan to run an L2 archive node.

To run an L2 archive node, you should migrate from an L1 full node datadir but still start the L2 execution client in archive mode. This will allow the node to accept rpc requests that require an archive node. Then, you should set `OP_GETH__HISTORICAL_RPC` in `.env` to the RPC address of a running legacy L1 archive node. The L2 node will proxy requests for pre-hardfork state and execution to the legacy L1 archive node instead of looking for the archive state in its own database. The L2 node will still run as a standard archive node storing post-hardfork data.

Here are step-by-step instructions for using [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) to run an archive L2 node:

1. Sync an L1 archive node.
2. Sync an L1 full node.
3. (If desired) 1-2 days before the migration block, run a [pre-migration](#run-the-pre-migration-tool) on the L1 full node datadir.
4. Wait for the migration block.
5. Stop both nodes once the migration block is reached.
6. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd`
   into the root of the project.
7. Run `./migrate full <network> <path-to-your-L1-full-node-datadir> [<l2_destination_datadir>]` where
   `<network>` is one of `alfajores`, `baklava`, or `mainnet`. If a destination datadir is specified,
   ensure that the value of `DATADIR_PATH` inside `.env` is updated to match. The migration process
   will take at least several minutes to complete.
8. Verify that the migration was successful by looking for the `Migration successful` message at the
   end of the output.
9. Run `cp <network>.env .env` where `<network>` is one of `alfajores`, `baklava`, or `mainnet`.
10. Open `.env` and set `OP_GETH__SYNCMODE=full` and `NODE_TYPE=archive` to enable archive mode.
11. Open `.env` and set `HISTORICAL_RPC_DATADIR_PATH` to the path of your L1 archive datadir. This will prompt the tool to start an L1 archive node for you with that datadir. If you would prefer to start the L1 archive node yourself, set `OP_GETH__HISTORICAL_RPC` to the L1 archive node RPC endpoint and do not set `HISTORICAL_RPC_DATADIR_PATH`. The l1 archive node will not need the same flags as it did before the hardfork, as it will not be syncing new blocks. To see how we recommend re-starting the l1 archive node see this [script](https://github.com/celo-org/celo-l2-node-docker-compose/blob/30ee2c4ec2dacaff10aaba52e59969053c652f05/scripts/start-historical-rpc-node.sh#L19).
12. Run `docker-compose up -d --build` to start the L2 node (and the L1 archive node if `HISTORICAL_RPC_DATADIR_PATH` is set).
13. To inspect the progress of the node you can run `docker-compose logs -n 50 -f op-geth`. This will
   display the last 50 lines of the logs and follow the logs as they are written. In a syncing node,
   you would expect to see lines of the form `Syncing beacon headers  downloaded=...` where the
   downloaded number is increasing. Once syncing of the beacon headers is complete, full sync will
   begin by applying blocks on top of the hardfork block.
14. At this point, you should be able to validate the progression of the node by fetching the current
   block number via the RPC API and seeing that it is increasing (e.g. `cast block-number --rpc-url http://localhost:9993`).
15. You can also try querying historical state to test archive functionality. (e.g. `cast balance --block <pre-migration-block-number> <address> --rpc-url http://localhost:9993`)

For more information on using [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) see the [README](https://github.com/celo-org/celo-l2-node-docker-compose/blob/30ee2c4ec2dacaff10aaba52e59969053c652f05/README.md#L1).
