# Running a Celo node

This guide is designed to help node operators run a Celo L2 node, and assumes you have already migrated data from a Celo L1 node or plan to `snap` sync from scratch. If you wish to migrate data from a Celo L1 node and have not yet done so, please see the [migration guide](migrate-node.md) before continuing.

:::note
This guide only covers L2 Celo. Currently, only the Alfajores and Baklava testnets have been hardforked to L2 networks.
:::

## Recommended Hardware

### Testnets (Alfajores and Baklava)

- 16GB+ RAM
- 500 GB SSD (NVME Recommended)
- 100mb/s+ Download

### Mainnet

- TBD

## Run node with docker

To simplify running nodes, Celo has created the [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) repo with all the necessary configuration files and docker compose templates to make migrating and running a Celo L2 node easy.

See the [README](https://github.com/celo-org/celo-l2-node-docker-compose/blob/main/README.md) for instructions on installing docker and docker compose if needed.

:::note
If using Docker Desktop on MacOS you will most likely need to increase the virtual disk limit in order to accomodate the chaindata directory. This can be done by opening Docker Desktop, going to Settings -> Resources -> Advanced and increasing the disk image size.
:::

For node operators interested in using Kubernetes, we recommend using [Kompose](https://kompose.io) to convert the docker compose template to Kubernetes helm charts.

### Running a full node

Follow these steps to run a full node. If you would like to run an archive node, see [below](#running-an-archive-node).

1. Pull the latest version of [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd` into the root of the project.

    ```bash
    git clone https://github.com/celo-org/celo-l2-node-docker-compose.git
    cd celo-l2-node-docker-compose
    ```

2. Configure your `.env` file.

    __Copy default configurations__
  
    The [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) repo contains a `<network>.env` file for each Celo network (`alfajores`, `baklava`, and `mainnet`). Start by copying the default configuration for the appropriate network.

    ```bash
    export NETWORK=<alfajores, baklava, or mainnet>
    cp $NETWORK.env .env
    ```

    __Configure sync mode__

    By default, [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) will start your node with `snap` sync. This allows your node to start without a migrated L1 datadir, as pre-hardfork block data will be automatically downloaded from peers during syncing. This is the easiest way to start an L2 node.

    Alternatively, you can start your node with `full` sync if you have a migrated L1 datadir. For instructions on obtaining a migrated L1 datadir, please see [Migrating an L1 Node](migrate-node.md).

    To use `full` sync, configure `.env` as follows:

    ```md
    OP_GETH__SYNCMODE=full
    DATADIR_PATH=<path to a migrated L1 datadir>
    ```

    __Configure node type__

    Your node will run as a `full` node by default, but can also be configured as an `archive` node if you wish to preserve access to all historical state. Note that `full` has a different meaning here than in the context of syncing. See [Running an archive node](#running-an-archive-node) for more information.

3. Start the node.

    ```bash
    docker-compose up -d --build
    ```

4. Check the progress of the node as it syncs.

    ```bash
    docker-compose logs -n 50 -f op-geth
    ```

    This will display and follow the last 50 lines of logs. In a syncing node, you would expect to see `Syncing beacon headers  downloaded=...` where the downloaded number is increasing and later lines such as `"Syncing: chain download in progress","synced":"21.07%"` where the percentage is increasing. Once the percentage reaches 100%, the node should be synced.

5. Check that node is fully synced.

   Once the node is fully synced, you can validate that it's following the network by fetching the current block number via the RPC API and seeing that it's increasing as expected.

   ```bash
   cast block-number --rpc-url http://localhost:9993
   ```

   Note that until fully synced, the RPC API will return 0 for the head block number.

### Running an archive node

__Even if you plan to run an archive node, we do not recommend running the migration tool on archive node data. If you only have L1 archive nodes, we recommend syncing an L1 full node for the Mainnet migration.__

The L2 execution client cannot use pre-hardfork state, so migrating an archive datadir will copy large amounts of data unnecessarily. The migration script will also run slowly and consume lots of memory when run on archive data, regardless of whether a pre-migration was performed. For these reasons, we recommend only running the migration script on a full node L1 datadir, even if you plan to run an L2 archive node.

#### Overview

To run an L2 archive node, you should migrate from an L1 full node datadir but still start the L2 execution client in archive mode. This will allow the node to accept RPC requests that require archive data, even though it doesn't have any archive data from before the hardfork. You can then configure your node to forward requests for pre-hardfork archive data to a legacy archive node.

#### Instructions

Here are step-by-step instructions for using [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) to run an archive node:

:::note
These instructions assume you already have

1. A migrated full node datadir that has been synced to the migration block. See [Migrating an L1 Node](migrate-node.md) if you do not have this.
2. A non-migrated L1 archive node datadir. Again, please do not attempt to migrate an archive datadir.

Please ensure neither datadir is being used by a running node before proceeding.
:::

1. Pull the latest version of [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd` into the root of the project.

    ```bash
    git clone https://github.com/celo-org/celo-l2-node-docker-compose.git
    cd celo-l2-node-docker-compose
    ```

2. Configure your `.env` file.

    __Copy default configurations__
  
    The [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) repo contains a `<network>.env` file for each Celo network (`alfajores`, `baklava`, and `mainnet`). Start by copying the default configuration for the appropriate network.

    ```bash
    export NETWORK=<alfajores, baklava, or mainnet>
    cp $NETWORK.env .env
    ```

    __Configure sync mode__

    By default, [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) will start your node with `snap` sync. While `archive` nodes can technically run with `snap` sync, they will only store archive data from the point that `snap` sync completes. This will leave a gap in the archive data after the hardfork, so we recommend running archive nodes with `full` sync and a migrated pre-hardfork datadir.

    To use `full` sync, configure `.env` as follows:

    ```md
    OP_GETH__SYNCMODE=full
    DATADIR_PATH=<path to a migrated L1 full node datadir>
    ```

    __Configure node type__

    To enable `archive` mode, configure `.env` as follows:

    ```md
    NODE_TYPE=archive
    ```

    __Configure Historical RPC Service__

    To handle RPC requests for pre-hardfork state and execution, an L2 archive node proxy out to a legacy archive node or "Historical RPC Service".

    There are two ways to configure a Historical RPC Service for your archive node:

    1. You can supply a pre-hardfork archive datadir and have [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) start a legacy archive node for you. To do this, simply configure `.env` as follows:

        ```md
        HISTORICAL_RPC_DATADIR_PATH=<path to your pre-hardfork archive datadir>
        ```

        When you start your L2 node, a legacy archive node will also start using the pre-hardfork archive datadir. Your L2 node will be configured to use the legacy archive node as its Historical RPC Service.

    2. If you would prefer to start the legacy archive node yourself, you can configure `.env` as follows:

        ```md
        OP_GETH__HISTORICAL_RPC=<RPC endpoint of a running legacy archive node>
        ```

      This will cause any value you set for `HISTORICAL_RPC_DATADIR_PATH` to be ignored, and the tool will not start a legacy archive node when it starts your L2 archive node.
      Note that if you choose to run your own legacy archive node, you should do so with different flags than before the hardfork as the node will no longer be syncing blocks or communicating with other nodes. To see how we recommend re-starting a legacy archive node as a Historical RPC Service, see this [script](https://github.com/celo-org/celo-l2-node-docker-compose/blob/30ee2c4ec2dacaff10aaba52e59969053c652f05/scripts/start-historical-rpc-node.sh#L19).

3. Start the node(s).

    ```bash
    docker-compose up -d --build
    ```

4. Check the progress of your L2 archive node as it syncs.

    ```bash
    docker-compose logs -n 50 -f op-geth
    ```

    This will display and follow the last 50 lines of logs. In a syncing node, you would expect to see `Syncing beacon headers  downloaded=...` where the downloaded number is increasing and later lines such as `"Syncing: chain download in progress","synced":"21.07%"` where the percentage is increasing. Once the percentage reaches 100%, the node should be synced.

5. Check that node is fully synced.

   Once the node is fully synced, you can validate that it's following the network by fetching the current block number via the RPC API and seeing that it's increasing as expected.

   ```bash
   cast block-number --rpc-url http://localhost:9993
   ```

   Note that until fully synced, the RPC API will return 0 for the head block number.

6. Try querying historical state to test archive functionality.

   ```bash
   cast balance --block <pre-migration-block-number> <address> --rpc-url http://localhost:9993
   ```

## Building a node from source

Docker images are the easiest way to run a Celo node, but you can always build your own node from source code. You might wish to do this if you want to run on a specific architecture or inspect the source code.

The following sections contain all the informmation required to set up your node from source.

### Network config & Assets

#### Alfajores

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
  - [op-geth](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo-v2.0.0-rc3)
  - [op-node](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo-v2.0.0-rc3)
  - [eigenda-proxy](https://ghcr.io/layr-labs/eigenda-proxy:v1.6.4)

#### Baklava

- [Final Celo L1 chaindata](https://storage.googleapis.com/cel2-rollup-files/baklava/baklava-l1-final.tar.zst)
- [Full migrated chaindata](https://storage.googleapis.com/cel2-rollup-files/baklava/baklava-migrated-datadir.tar.zst)
- [Rollup deploy config](https://storage.googleapis.com/cel2-rollup-files/baklava/config.json)
- [L1 contract addresses](https://storage.googleapis.com/cel2-rollup-files/baklava/deployment-l1.json)
- [L2 allocs](https://storage.googleapis.com/cel2-rollup-files/baklava/l2-allocs.json)
- [rollup.json](https://storage.googleapis.com/cel2-rollup-files/baklava/rollup.json)
- [Genesis](https://storage.googleapis.com/cel2-rollup-files/baklava/genesis.json) used for snap syncing
- p2p peers:
  - op-geth bootnode/peers, to be used with op-geth `--bootnodes` flag:

    ```text
    enode://6017c373a4151250e166ee7205b78cf845caff6a2003b3be38af8a09a569e413e31b21667d38a065f747a3662aec4920f122ad1bf1d46605cacf2d3d19f0ff5b@34.19.52.198:30303
    enode://e0ab5ed2071b0ea0d57a52e3cd3da7c97db1a0754e00e91a32a1ca9dab6bf040fa1dd8775e8d6812a557d75760b1b90d18a8d69cbf8cfc2b7acdacf0b47fce96@34.168.70.112:30303
    enode://b6d21edf251da32ffc1527092045ad3beba435f8ba27373dba8ce35f3ee54a411dc8327b57ebce9dc5c53e29825ea9e62356289a849fc4a048cce64da771aed8@34.82.194.102:30303
    enode://339acdcbc3961b11f5458bab3c931e1bbb41548d9cea7692311db1543deac1f4a9efc1e6cff93f745865988d16bdc6bbb38cd59a8dde71bafd236eec0d5e0fea@34.82.75.77:30303
    enode://616429f584575f8da463c18e5e2d38ec028b95446bffd607ebf8ac3d2dd3bbe9b859c91efbbbea6cf51ad78fb0d5db178f66ca57e647bd46bfe6692cc06127e9@34.53.24.17:30303
    ```

  - op-node static peers, to be used with op-node `--p2p.static` flag:

    ```text
    /ip4/34.105.121.84/tcp/9222/p2p/16Uiu2HAmK86WJyCXu8j9vHa2AbEDRmJe8DfzAaHPVsVEhnPvq3cE
    /ip4/35.199.167.200/tcp/9222/p2p/16Uiu2HAmAYgs8bWPgVoQmAR7jPDn1n2Gn83Y44LuBpkzJDPyVsqy
    /ip4/34.145.111.30/tcp/9222/p2p/16Uiu2HAm7jL1h1hDUMAC4zpa6VwfVeF6ugF1BcaPMAHuAf176aGG
    /ip4/35.233.246.129/tcp/9222/p2p/16Uiu2HAkxu7gWGs3ZGUpevwU74tuRvjoqAw2ZSEZNCvWaYrK6YkK
    /ip4/34.127.45.21/tcp/9222/p2p/16Uiu2HAmKDAUxJftKBgi8sfD1kyVHHhqMy9Z6Ee4XYyQ7NhwmKgC
    ```

- Container images:
  - [Celo L1 client](https://us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.8)
  - [op-geth](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo-v2.0.0-rc4)
  - [op-node](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo-v2.0.0-rc4)
  - [eigenda-proxy](https://ghcr.io/layr-labs/eigenda-proxy:v1.6.4)

### Common problems

#### Transactions are not being executed when submitted to a node

If your node is synced but transtransactions submitted to it are not executed, make sure the `--rollup.sequencerhttp=https://sequencer.alfajores.celo-testnet.org` flag is correctly set.

#### Self-hosted public RPC does not retrieve transactions by hash

If you are hosting a public RPC node, please make sure the flag `--history.transactions` is set to 0 in op-geth (i.e. `--history.transactions=0`), so all transactions are indexed. Otherwise, transactions will not be retrievable by hash.
