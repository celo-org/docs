# Migrating a Celo L1 node

This guide is designed to help node operators run Celo L2 nodes and to explain
the process of switching from running a Celo L1 node to a Celo L2 node.

If you want to run a fresh L2 node, please follow the [node operator guide](docker-node.md).

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

It is not recommended to migrate from an L1 archive datadir, as the L2 execution client does not
support executing L1 historical states and it will consume more time and storage.

Instead, run the migration from a full L1 datadir, and if desired, configure the L2 execution client
as archive to run L2 archive requests, and to proxy to a L1 archive node to execute pre-hardfork
transactions and state access. See also the [archive node docs](#migrating-a-celo-archive-node).

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
3. Run `./migrate pre <network> <path-to-your-L1-datadir>` where `<network>` is one of `alfajores`, `baklava`, or `mainnet`. This will likely take some minutes to complete.
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
   will take at least some minutes to complete.
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

## Missing Data / DB check failures

Both the `pre` and `full` migration commands will first run a script to check whether the source db provided has any gaps in data. This check may fail with an error indicating that data is missing from your source db, in which case you should try again with a different source db until the check passes.
To check if a db has gaps, you can simply re-run the migration command which will automatically perform the check each time.
Alternatively, you can run the check-db script on its own by checking out the latest version the [celo optimism monorepo](https://github.com/celo-org/optimism), running `cd op-chain-ops` followed by `make celo-migrate`, and finally running `go run ./cmd/celo-migrate check-db --db-path <path-to-your-L1-datadir>`. This command takes in an optional `--fail-fast` flag that will make it exit at the first gap detected as it does in the migration script. If the `--fail-fast` flag is not provided then the script will collect all the gaps it finds and print them out at the end.

## Migrating a Celo archive node

Node operators who were running archive nodes before the migration and wish to maintain execution
and state access functionality for pre-hardfork blocks will need to continue to run their L1 node
and configure their L2 node to proxy pre-hardfork execution and state access requests to the L1 node
by setting the `OP_GETH__HISTORICAL_RPC` in `.env` to the RPC address of their L1 node.
