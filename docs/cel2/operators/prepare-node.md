# Preparing for the L2 hardfork

## Before the migration

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

### Run the pre-migration tool

Node operators who wish to minimize the migration downtime during the hardfork can perform pre-migrations with the following steps.

1. Stop your L1 node.
2. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd`
   into the root of the project.
3. Run `./migrate pre <network> <path-to-your-L1-datadir> [<l2_destination_datadir>]` where `<network>` is one of `alfajores`, `baklava`, or `mainnet`. If a destination datadir is specified, ensure that the value of `DATADIR_PATH` inside `.env` is updated to match. The pre-migration process will take at least several minutes to complete.
4. Once the pre-migration is complete, you can start your L1 node again.