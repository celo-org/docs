# Migrating a Celo L1 node

This guide is designed to help Celo L1 node operators migrate their nodes to the Celo L2. Specifically, it describes how to run the [migration tool](https://github.com/celo-org/optimism/tree/celo-rebase-12/op-chain-ops/cmd/celo-migrate) in order to transform a pre-hardfork db snapshot into a format from which a Celo L2 node can `full` sync.

If you want to run a fresh L2 node, you may skip to the [node operator guide](run-node.md) for instructions on how to `snap` sync from an empty datadir. If you would like to use `full` sync but don't want to migrate your own pre-hardfork datadir, you can also download a migrated datadir from the links provided in the [Network Config & Assets](run-node.md#network-config--assets) section. Note that migrated datadirs won't be available until after the hardfork. For minimal downtime, we recommend migrating your own data for the hardfork.

:::note
The terms L1 and pre-hardfork are used interchangeably to reference Celo before the L2 transition.
:::

## Migration Overview

Migrating a pre-hardfork datadir involves these high-level steps:

1. Upgrade your L1 node to the [latest client release](run-node.md#network-config--assets) so it will stop producing blocks at
   at the hardfork.
2. 1-2 days before the hardfork, stop your node and run a pre-migration to migrate the majority of data. This is not required, but is highly recommended for minimizing downtime. See [Preparing for the L2 Hardfork](../notices/prepare-node.md).
3. Restart your node and wait for the hardfork.
4. Shut down your node once the hardfork block number is reached.
5. Pull the necessary network configuration artifacts once available (e.g. hardfork block time).
6. Run the migration tool to migrate your L1 datadir and produce the hardfork block.
7. Launch your L2 node with the migrated datadir.

The migration tool can be run multiple times as the L1 chain data grows and will continue migrating from where it last left off.
Please note that the node must be stopped before the migration tool is run, even once it has reached the hardfork.

## Before the hardfork

There are some important steps node operators should take ahead of the L2 hardfork. These include upgrading to the [latest client release](run-node.md#network-config--assets) so that the L1 network will stop producing blocks at the hardfork, and running a pre-migration 1-2 days before the hardfork. If you have not yet read the [Preparing for the L2 hardfork](prepare-node.md) page, please do so before continuing.

## Running the migration

:::warning
__It is not recommended to migrate from an L1 archive datadir.__

If you only have an L1 archive node, we recommend syncing an L1 full node in preparation for the Mainnet migration. You can still run an L2 archive node after migrating from an L1 full node datadir. See [Running a Celo archive node](run-node.md#running-an-archive-node) for more.
:::

Once the hardfork block number is reached, we recommend node operators migrate using [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose). Alternatively, the migration tool can be [run from source](#run-migration-from-source).

### Run migration with docker

To simplify migrating and running L2 nodes, Celo has created the [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) repo with all the necessary configuration files and docker compose templates. You can use it to migrate your L1 node as follows.

1. Once the hardfork block number is reached, stop your L1 node.

2. Pull the latest version of [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd` into the root of the project.

    ```bash
    git clone https://github.com/celo-org/celo-l2-node-docker-compose.git
    cd celo-l2-node-docker-compose
    ```

3. Run the full migration.

   :::warn
   Please ensure your L1 node is stopped before running the migration tool.
   :::

   ```bash
   ./migrate full <network> <path-to-your-L1-datadir> [<l2_destination_datadir>]
   ```

   If a destination datadir is specified, ensure that `DATADIR_PATH` inside `.env` is updated to match.

   The migration process will take at least several minutes to complete.

   :::note
   A full migration constists of a pre-migration followed by some additional finalization steps, such as building the first L2 block. The pre-migration step will always run during a full migration, but will be significantly faster if a pre-migration has already been performed. See [Preparing for the L2 migration](prepare-node.md) for instructions on running a pre-migration ahead of the hardfork.
   :::

4. Verify the migration was successful by looking for `Migration successful` at the end of the output.

   If you encounter difficulties running the migration, see the [Troubleshooting](#troubleshooting) section.

   Congrats! Your datadir is now ready to use with a Celo L2 node. See [Running a Celo Node](run-node.md) for instructions on how to start your Celo L2 node.

### Run migration from source

// TODO(Alec)

## Troubleshooting

// TODO(Alec)

### Missing Data / DB check failures

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

// TODO(Alec) where to link to README? Should also update this and the migration script README in other PRs
For more information on using [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) see the [README](https://github.com/celo-org/celo-l2-node-docker-compose/blob/30ee2c4ec2dacaff10aaba52e59969053c652f05/README.md#L1).
