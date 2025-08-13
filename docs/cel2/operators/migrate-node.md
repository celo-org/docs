import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Migrating a Celo L1 Node

:::tip
Unless you need to migrate your own Celo L1 data, we recommend using a snapshot instead.
You can find the latest snapshot in the [Network Config & Assets](/cel2/operators/run-node.md#network-config--assets) section.
:::

This guide helps Celo L1 node operators migrate their nodes to Celo L2. It describes how to use the [migration tool](https://github.com/celo-org/optimism/tree/celo-rebase-12/op-chain-ops/cmd/celo-migrate) to transform pre-migration database snapshots into a format that Celo L2 nodes can use for a `full` sync.

**Alternative options:**

- **Fresh L2 node**: Skip to the [node operator guide](/cel2/operators/run-node.md) for `snap` sync from scratch
- **Pre-migrated data**: Download migrated datadirs from [Network Config & Assets](/cel2/operators/run-node.md#network-config--assets)

:::note Terminology
The terms L1 and pre-hardfork are used interchangeably to reference Celo before the L2 transition. L1 does not refer to Ethereum in this document.
:::

## Migration Overview

Migrating a pre-hardfork datadir involves these high-level steps:

1. Upgrade your L1 node to the [latest client release](run-node.md#network-config--assets) so it will stop producing blocks at the hardfork.
2. 1-2 days before the hardfork, stop your node and run a pre-migration to migrate the majority of data. This is not required, but is highly recommended for minimizing downtime. See [Preparing for the L2 migration](../notices/l2-migration.md).
3. Restart your node and wait for the hardfork.
4. Shut down your node once the hardfork block number is reached.
5. Run the migration tool to migrate your L1 datadir and produce the hardfork block.
6. Launch your L2 node with the migrated datadir.

### Important Notes

- The migration tool can be run multiple times as the L1 chain data grows and will continue migrating from where it last left off.
- While the pre-migration can be run multiple times and will get faster each time, you should avoid running the full migration more than once as it will be slower the second time.
- All migrations writing to a given destination datadir must use the same node's source datadir. That is, you should not run the pre-migration with a db snapshot from node A and then run the full migration with a db snapshot from node B.
- Your node must be stopped before the migration tool is run, even once it has reached the hardfork.
- You should not attempt to migrate archive node data, only full node data.

## Preparation Steps

### 1. Upgrade L1 Nodes

All node operators must upgrade their L1 (`celo-blockchain`) nodes to the required version before the hardfork. This release defines migration block numbers so nodes will stop producing blocks at the right time.

### 2. Run a Pre-Migration (Recommended)

:::warning Archive Node Limitation
Both pre-migration and full migration require **full node data only**. If you only have archive nodes, sync a full node before the hardfork. You cannot migrate archive data, even for L2 archive nodes. See [Running an archive node](/cel2/operators/run-node.md#running-an-archive-node) for details.
:::

You can use either Docker or build from source.
The pre-migration may take several hours to complete.

#### Using Docker (Recommended)

1. Stop your L1 node
2. Clone the migration repository:

    ```bash
    git clone https://github.com/celo-org/celo-l2-node-docker-compose.git
    cd celo-l2-node-docker-compose
    ```

3. Run the pre-migration where `<network>` is `alfajores`, `baklava`, or `mainnet`:

    ```bash
    ./migrate pre <network> <path-to-your-L1-datadir> [<L2_destination_datadir>]
    ```

    If a destination datadir is specified, ensure that `DATADIR_PATH` inside `.env` is updated to match when you start your node.

4. Restart your L1 node and wait for the hardfork

#### Using Source Code

1. Stop your L1 node
2. Build the migration tool:

    ```bash
    git clone https://github.com/celo-org/optimism.git
    cd optimism/op-chain-ops
    make celo-migrate
    ```

3. Run the pre-migration:

    ```bash
    go run ./cmd/celo-migrate pre \
    --old-db <path-to-your-L1-datadir>/celo/chaindata \
    --new-db <path-to-your-L2-destination-datadir>/geth/chaindata
    ```

4. Restart your L1 node and wait for the hardfork

### Key Information

#### Alfajores testnet

- Block number: `26384000`
- Date: September 26, 2024
- Minimum `celo-blockchain` version: [v1.8.7](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.7)
- `op-geth`: [celo-v2.0.0-rc4](https://github.com/celo-org/op-geth/releases/tag/celo-v2.0.0-rc4)
- `op-node`: [celo-v2.0.0-rc4](https://github.com/celo-org/optimism/releases/tag/celo-v2.0.0-rc4)

#### Baklava testnet

- Block number: `28308600`
- Date: February 20, 2025
- Minimum `celo-blockchain` version: [v1.8.8](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.8)
- `op-geth`: [celo-v2.0.0-rc4](https://github.com/celo-org/op-geth/releases/tag/celo-v2.0.0-rc4)
- `op-node`: [celo-v2.0.0-rc4](https://github.com/celo-org/optimism/releases/tag/celo-v2.0.0-rc4)

#### Mainnet

- Block number: `31056500`
- Date: March 26, 2025 (3:00 AM UTC)
- Minimum `celo-blockchain` version: [v1.8.9](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.9)
- `op-geth`: [celo-v2.0.0](https://github.com/celo-org/op-geth/releases/tag/celo-v2.0.0)
- `op-node`: [celo-v2.0.0](https://github.com/celo-org/optimism/releases/tag/celo-v2.0.0)

## Full Migration Process

When the hardfork block number is reached, complete the migration using either Docker (recommended) or source code.

### Hardware Requirements

- Make sure you have enough storage to accomodate 2x the pre-hardfork chaindata. Chaindata size can vary, so please double check your node.
- We recommend using local storage for the source and destination datadirs.
- 16GB+ RAM recommended

### Run Migration with Docker

Once the hardfork block is reached, run the full migration using the same repository:

1. Stop your L1 node when the hardfork block number is reached

2. If you haven't already, clone the migration repository:

    ```bash
    git clone https://github.com/celo-org/celo-l2-node-docker-compose.git
    cd celo-l2-node-docker-compose
    ```

3. Run the full migration where `<network>` is `alfajores`, `baklava`, or `mainnet`:

   ```bash
   ./migrate full <network> <path-to-your-L1-datadir> [<l2_destination_datadir>]
   ```

   If a destination datadir is specified, ensure that `DATADIR_PATH` inside `.env` is updated to match when you start your node.

### Run Migration from Source

If you prefer not to use Docker, run the migration directly from source:

1. Stop your L1 node when the hardfork block number is reached

2. If you haven't already, build the migration tool:

   ```bash
   git clone https://github.com/celo-org/optimism.git
   cd optimism/op-chain-ops
   make celo-migrate
   ```

3. Run the full migration:

<Tabs>
  <TabItem value="mainnet" label="Mainnet" default>
   ```bash
   go run ./cmd/celo-migrate full \
   --deploy-config <path-to-deploy-config.json> \
   --l1-deployments <path-to-l1-deployments.json> \
   --l1-rpc <L1-RPC-URL> \
   --l2-allocs <path-to-l2-allocs.json> \
   --outfile.rollup-config <path-to-output-rollup-config.json> \
   --outfile.genesis <path-to-output-genesis.json> \
   --migration-block-number <MIGRATION_BLOCK_NUMBER> \
   --old-db <path-to-your-L1-datadir>/celo/chaindata \
   --new-db <path-to-your-L2-destination-datadir>/geth/chaindata \
   --l1-beacon-rpc=<L1-beacon-RPC-URL>
   ```

   Note the L1-beacon-RPC-URL must support querying historical `finality_checkpoints`. We are using https://ethereum-beacon-api.publicnode.com in [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose).

   You can check support for historical `finality_checkpoints` by retrieving some suitably old finality_checkpoints, for example slot 5000000.

   ```bash
   curl https://ethereum-beacon-api.publicnode.com/eth/v1/beacon/states/5000000/finality_checkpoints | jq
   ```

  </TabItem>
  <TabItem value="testnets" label="Testnets">
   ```bash
   go run ./cmd/celo-migrate full \
   --deploy-config <path-to-deploy-config.json> \
   --l1-deployments <path-to-l1-deployments.json> \
   --l1-rpc <L1-RPC-URL> \
   --l2-allocs <path-to-l2-allocs.json> \
   --outfile.rollup-config <path-to-output-rollup-config.json> \
   --outfile.genesis <path-to-output-genesis.json> \
   --migration-block-number <MIGRATION_BLOCK_NUMBER> \
   --old-db <path-to-your-L1-datadir>/celo/chaindata \
   --new-db <path-to-your-L2-destination-datadir>/geth/chaindata
   ```
  </TabItem>
</Tabs>

   You can find the required input artifacts in the [Network config & Assets](/cel2/operators/run-node.md#network-config--assets) section.

   We recommend using the [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) codebase as an additional reference for running the migration from source.

The full migration process will take at least 5 minutes to complete for mainnet, assuming most data has been pre-migrated. If no pre-migration was performed, it could take several hours.

Congrats! Your datadir is now ready to use with a Celo L2 node. See [Running a Celo Node](run-node.md) for instructions on how to start your Celo L2 node.

## Troubleshooting

If you encounter difficulties during the migration that are not covered below, please reach out to our team. You can also check the `celo-l2-node-docker-compose` [README](https://github.com/celo-org/celo-l2-node-docker-compose/blob/main/README.md) and the `celo-migrate` [README](https://github.com/celo-org/optimism/blob/celo-rebase-12/op-chain-ops/cmd/celo-migrate/README.md) for more information on how the migration tooling works.

### Database Error (EOF)

If you encounter this error during migration:

```shell
CRIT [03-19|10:38:17.229] error in celo-migrate err="failed to run full migration: failed to get head header: failed to open database at \"/datadir/celo/chaindata\" err: failed to open leveldb: EOF"
```

**Solution:** Start up the celo-blockchain client with the same datadir, wait for it to fully load, then shut it down. This repairs inconsistent shutdown states.

Alternatively, open a console and exit:

```bash
geth console --datadir <datadir>
# Wait for console to load, then exit
```

It seems that this issue is caused by the celo-blockchain client sometimes shutting down in an inconsistent state, which is repaired upon the next startup.

### Missing Data / DB Continuity Check Failures

Both the `pre` and `full` migration commands will first run a script to check whether the source db provided has any gaps in data. This check may fail with an error indicating that data is missing from your source db.

To resolve this:

- Try re-running the migration with a different source datadir if available.
  - We will post a full pre-hardfork database snapshot in the [Network config & Assets](./run-node.md#network-config--assets) section shortly after the hardfork, but we recommend having your own backup datadir available as well.
- Ensure the datadir is fully synced to just before the hardfork block.

To check if a db has gaps, you can simply re-run the migration command which will automatically perform the check each time.

If needed, you can also run the `check-db` script on its own as follows.

1. Check out and build the latest version of the script in [celo optimism monorepo](https://github.com/celo-org/optimism).

   ```bash
   git clone https://github.com/celo-org/optimism
   cd optimism/op-chain-ops
   make celo-migrate
   ```

2. Run the script

   ```bash
   go run ./cmd/celo-migrate check-db --db-path <path-to-your-L1-datadir> [--fail-fast]
   ```

   This command takes in an optional `--fail-fast` flag that will make it exit at the first gap detected like it does when run via [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose). If the `--fail-fast` flag is not provided then the script will collect all the gaps it finds and print them out at the end.
