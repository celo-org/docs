# Preparing for the L2 hardfork

Node operators must review this page and complete all required steps to prepare for the L2 hardfork.

## Upgrade L1 nodes

Prior to the L2 hardfork, node operators must upgrade their existing L1 nodes to the appropriate release below. These releases each define hardfork block numbers such that nodes will stop producing or accepting blocks after the block immediately preceding the hardfork block number.

* Alfajores
  * Hardfork Block Number: *26384000*
  * Celo L1 client: [celo-blockchain v1.8.7](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.7).
  * Docker image `us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.7`
* Baklava
  * Hardfork Block Number: *28308600*
  * Celo L1 client: [celo-blockchain v1.8.8](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.8).
  * Docker image `us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.8`

## Run pre-migration

Node operators who plan to migrate their pre-hardfork data to an L2 node are strongly encouraged to run a pre-migration ~1-2 days before the hardfork. This will migrate the majority of data and minimize downtime during the full migration.

To learn more about the migration process and tooling, see [Migrating a Celo L1 Node](../operators/migrate-node.md).

:::warning
__Migrating archive data is not recommended.__

Both the pre-migration and full migration must be run on full node data. If you only have Celo archive nodes, we recommend syncing a full node in preparation for the L2 hardfork. You should not migrate archive data even if you plan to run an L2 archive node. See [Running an archive node](../operators/run-node.md#running-an-archive-node) for more information.
:::

We recommend running the migration script (which includes commands for both the pre-migration and full migration) using [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose). If necessary, the script can also be run from source.

### Run pre-migration with docker

1. Stop your node.
2. Pull the latest version of [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd` into the root of the project.

    ```bash
    git clone https://github.com/celo-org/celo-l2-node-docker-compose.git
    cd celo-l2-node-docker-compose
    ```

3. Run pre-migration command, where `<network>` is one of `alfajores`, `baklava`, or `mainnet`.

    :::warning
    Please ensure your node is stopped before running the migration tool.
    :::

    ```bash
    ./migrate pre <network> <path-to-your-L1-datadir> [<L2_destination_datadir>]
    ```

    If a destination datadir is specified, ensure the value of `DATADIR_PATH` inside `.env` is updated to match when you start your node.

### Run pre-migration from source

If you'd like to run the pre-migration manually without Docker, you can do so by running the migration tool from source:

1. Stop your node.

2. Checkout and build migration script.

    ```bash
    git clone https://github.com/celo-org/optimism.git
    cd optimism/op-chain-ops
    make celo-migrate
    ```

3. Run the pre-migration.

    ```bash
    go run ./cmd/celo-migrate pre \
    --old-db <path-to-your-L1-datadir> \
    --new-db <path-to-your-L2-destination-datadir>
    ```

Once the pre-migration is complete, you can start your L1 node again. The pre-migration may take several hours to complete.

### Notes

You can repeat this process as many times as needed leading up to the full migration. We highly recommend pre-migrating at least once for mainnet, as migrating mainnet chaindata can take over 2 hours.

When you run the full migration, you must use the same destination datadir in order to benefit from the pre-migration.

The full migration will also run a pre-migration, so you will see logs from the pre-migration when running the full migration even if you already ran a pre-migration.
