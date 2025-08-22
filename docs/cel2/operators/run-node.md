# Running a Celo Node

This guide is designed to help node operators run a Celo L2 node.

:::note L1 to L2 data migration
If you wish to migrate data from a Celo L1 node and have not yet done so, please see the [migration guide](migrate-node.md) before continuing. Alternatively, you can `snap` sync from scratch without migrating existing L1 data.
:::

## Recommended Hardware

### Mainnet

- 16GB+ RAM
- 1TB+ SSD (NVME Recommended)
- Minimum 4 CPU, recommended 8 CPU
- 100mb/s+ Download

### Testnets (Alfajores, Baklava, and Celo Sepolia)

- 16GB+ RAM
- 500GB SSD (NVME Recommended)
- Minimum 4 CPU, recommended 8 CPU
- 100mb/s+ Download

:::warning Storage Requirements
Storage size requirements will increase over time, especially for archive nodes.

If running an archive node, please make sure you also have enough storage for the legacy Celo L1 archive datadir. See [Running an archive node](#running-an-archive-node).
:::

## Run Node with Docker

To simplify running nodes, Celo has created the [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) repository with all the necessary configuration files and docker compose templates to make running a Celo L2 node easy.

See the [README](https://github.com/celo-org/celo-l2-node-docker-compose/blob/main/README.md) for instructions on installing docker and docker compose if needed.

:::note Docker Desktop on MacOS
You will most likely need to increase the virtual disk limit in order to accomodate the chaindata directory. This can be done by opening Docker Desktop, going to Settings -> Resources -> Advanced and increasing the disk image size.
:::

### Running a Full Node

Follow these steps to run a full node. If you would like to run an archive node, see [below](#running-an-archive-node).

1. Pull the latest version of [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd` into the root of the project.

    ```bash
    git clone https://github.com/celo-org/celo-l2-node-docker-compose.git
    cd celo-l2-node-docker-compose
    ```

2. Configure your `.env` file.

    __Copy default configurations__

    The [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) repo contains a `<network>.env` file for each Celo network (`alfajores`, `baklava`, `celo-sepolia`, and `mainnet`). Start by copying the default configuration for the appropriate network.

    ```bash
    export NETWORK=<alfajores, baklava, celo-sepolia, or mainnet>
    cp $NETWORK.env .env
    ```

    __Configure sync mode__

    By default, [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) will start your node with `snap` sync. This allows your node to start without a migrated L1 datadir, as pre-hardfork block data will be automatically downloaded from peers during syncing. This is the easiest way to start an L2 node.

    Alternatively, you can start your node with `full` sync if you have a migrated L1 datadir. For instructions on obtaining a migrated L1 datadir, please see [Migrating an L1 Node](migrate-node.md).

    To use `full` sync, configure `.env` as follows:

    ```text
    OP_GETH__SYNCMODE=full
    DATADIR_PATH=<path to a migrated L1 datadir>
    ```

    __Configure node type__

    Your node will run as a `full` node by default, but can also be configured as an `archive` node if you wish to preserve access to all historical state. Note that `full` has a different meaning here than in the context of syncing. See [Running an archive node](#running-an-archive-node) for more information.

    __Configure P2P for external network access__

    :::warning Network Configuration
    If the following options are not configured correctly, your node will not be discoverable or reachable to other nodes on the network. This is likely to impair your node's ability to stay reliably connected to and synced with the network.
    :::

    - `OP_NODE__P2P_ADVERTISE_IP` - Specifies the public IP to be shared via discovery so that other nodes can connect to your node. If unset op-node other nodes on the network will not be able to discover and connect to your node.
    - `PORT__OP_NODE_P2P` - Specifies the port to be shared via discovery so that other nodes can connect to your node. Defaults to 9222.
    - `OP_GETH__NAT` - Controls how op-geth determines its public IP that is shared via the discovery mechanism. If the public IP is not correctly configured then other nodes on the network will not be able to discover and connect to your node. The default value of `any` will try to automatically determine the public IP, but the most reliable approach is to explicitly set the public IP using `extip:<your-public-ip>`. Other acceptable values are `(any|none|upnp|pmp|pmp:<IP>|extip:<IP>|stun:<IP:PORT>)`.
    - `PORT__OP_GETH_P2P` - Specifies the port to be shared via discovery so that other nodes can connect to your node. Defaults to 30303.

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

### Running an Archive Node

#### Overview

To run an L2 archive node, you need to start the L2 execution client in archive mode. This allows the node to accept RPC requests that require archive data for blocks created after the L2 transition. For historical data from before the L2 transition, you can configure your node to forward those requests to a legacy Celo L1 archive node that contains the historical blockchain state.

#### Instructions

:::note Prerequisites
These instructions assume you already have

1. A migrated full node datadir that has been synced to the migration block. See [Migrating an L1 Node](migrate-node.md) if you do not have this.
2. A non-migrated Celo L1 archive node datadir. Do not attempt to migrate an archive datadir.

Please ensure neither datadir is being used by a running node before proceeding.
:::

1. Pull the latest version of [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) and `cd` into the root of the project.

    ```bash
    git clone https://github.com/celo-org/celo-l2-node-docker-compose.git
    cd celo-l2-node-docker-compose
    ```

2. Configure your `.env` file.

    __Copy default configurations__

    The [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) repo contains a `<network>.env` file for each Celo network (`alfajores`, `baklava`, `celo-sepolia`, and `mainnet`). Start by copying the default configuration for the appropriate network.

    ```bash
    export NETWORK=<alfajores, baklava, celo-sepolia, or mainnet>
    cp $NETWORK.env .env
    ```

    __Configure sync mode__

    By default, [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) will start your node with `snap` sync. While `archive` nodes can technically run with `snap` sync, they will only store archive data from the point that `snap` sync completes. This will leave a gap in the archive data after the hardfork, so we recommend running archive nodes with `full` sync and a migrated pre-hardfork datadir.

    To use `full` sync, configure `.env` as follows:

    ```text
    OP_GETH__SYNCMODE=full
    DATADIR_PATH=<path to a migrated L1 full node datadir>
    ```

    __Configure node type__

    To enable `archive` mode, configure `.env` as follows:

    ```text
    NODE_TYPE=archive
    ```

    __Configure Historical RPC Service__

    To handle RPC requests for pre-hardfork state and execution, an L2 archive node proxies to a legacy archive node or "Historical RPC Service".
    There are two ways to configure a Historical RPC Service for your archive node:

    1. Supply a pre-hardfork archive datadir and let [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) start a legacy archive node. To do this configure `.env` as follows:

        ```text
        HISTORICAL_RPC_DATADIR_PATH=<path to your pre-hardfork archive datadir>
        ```

        When you start your L2 node, a legacy archive node will also start using the pre-hardfork archive datadir. Your L2 node will be configured to use the legacy archive node as its Historical RPC Service.

    2. Start the legacy archive node yourself and configure `.env` as follows:

        ```text
        OP_GETH__HISTORICAL_RPC=<RPC endpoint of a running legacy archive node>
        ```

        This will cause any value you set for `HISTORICAL_RPC_DATADIR_PATH` to be ignored. The tool will not start a legacy archive node when it starts your L2 archive node.

        If you choose to run your own legacy archive node, you should do so with different flags than before the hardfork, as the node will no longer be syncing blocks or communicating with other nodes. To see how we recommend re-starting a legacy archive node as a Historical RPC Service, see [this script](https://github.com/celo-org/celo-l2-node-docker-compose/blob/30ee2c4ec2dacaff10aaba52e59969053c652f05/scripts/start-historical-rpc-node.sh#L19).

    __Configure P2P for external network access__

    :::warning Network Configuration
    If the following options are not configured correctly, your node will not be discoverable or reachable to other nodes on the network. This is likely to impair your node's ability to stay reliably connected to and synced with the network.
    :::

    - `OP_NODE__P2P_ADVERTISE_IP` - Specifies the public IP to be shared via  discovery so that other nodes can connect to your node. If unset op-node other nodes on the network will not be able to discover and connect to your node.
    - `PORT__OP_NODE_P2P` - Specifies the port to be shared via discovery so that other nodes can connect to your node. Defaults to 9222.
    - `OP_GETH__NAT` - Controls how op-geth determines its public IP that is shared via the discovery mechanism. If the public IP is not correctly configured then other nodes on the network will not be able to discover and connect to your node. The default value of `any` will try to automatically determine the public IP, but the most reliable approach is to explicitly set the public IP using `extip:<your-public-ip>`. Other acceptable values are `(any|none|upnp|pmp|pmp:<IP>|extip:<IP>|stun:<IP:PORT>)`.
    - `PORT__OP_GETH_P2P` - Specifies the port to be shared via discovery so that other nodes can connect to your node. Defaults to 30303.

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

## Building a Node from Source

Docker images are the easiest way to run a Celo node, but you can always build your own node from source code. You might wish to do this if you want to run on a specific architecture or inspect the source code.

The [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose) codebase is still the best reference for how to run your nodes from source, and below you can find all the [Network config & Assets](#network-config--assets) needed to participate in the hardfork.

## Network Config & Assets

### Mainnet

- [Full migrated chaindata](https://storage.googleapis.com/cel2-rollup-files/celo/celo-mainnet-migrated-chaindata.tar.zst)
- [Rollup deploy config](https://storage.googleapis.com/cel2-rollup-files/celo/config.json)
- [L1 contract addresses](https://storage.googleapis.com/cel2-rollup-files/celo/deployment-l1.json)
- [L2 allocs](https://storage.googleapis.com/cel2-rollup-files/celo/l2-allocs.json)
- [rollup.json](https://storage.googleapis.com/cel2-rollup-files/celo/rollup.json)
- [Genesis](https://storage.googleapis.com/cel2-rollup-files/celo/genesis.json) used for snap syncing
- P2P peers
  - op-geth bootnode/peers, to be used with op-geth `--bootnodes` flag:

    ```text
    enode://28f4fcb7f38c1b012087f7aef25dcb0a1257ccf1cdc4caa88584dc25416129069b514908c8cead5d0105cb0041dd65cd4ee185ae0d379a586fb07b1447e9de38@34.169.39.223:30303
    enode://a9077c3e030206954c5c7f22cc16a32cb5013112aa8985e3575fadda7884a508384e1e63c077b7d9fcb4a15c716465d8585567f047c564ada2e823145591e444@34.169.212.31:30303
    enode://029b007a7a56acbaa8ea50ec62cda279484bf3843fae1646f690566f784aca50e7d732a9a0530f0541e5ed82ba9bf2a4e21b9021559c5b8b527b91c9c7a38579@34.82.139.199:30303
    enode://f3c96b73a5772c5efb48d5a33bf193e58080d826ba7f03e9d5bdef20c0634a4f83475add92ab6313b7a24aa4f729689efb36f5093e5d527bb25e823f8a377224@34.82.84.247:30303
    enode://daa5ad65d16bcb0967cf478d9f20544bf1b6de617634e452dff7b947279f41f408b548261d62483f2034d237f61cbcf92a83fc992dbae884156f28ce68533205@34.168.45.168:30303
    enode://c79d596d77268387e599695d23e941c14c220745052ea6642a71ef7df31a13874cb7f2ce2ecf5a8a458cfc9b5d9219ce3e8bc6e5c279656177579605a5533c4f@35.247.32.229:30303
    enode://4151336075dd08eb6c75bfd63855e8a4bd6fd0f91ae4a81b14930f2671e16aee55495c139380c16e1094a49691875e69e40a3a5e2b4960c7859e7eb5745f9387@35.205.149.224:30303
    enode://ab999db751265c714b171344de1972ed74348162de465a0444f56e50b8cfd048725b213ba1fe48c15e3dfb0638e685ea9a21b8447a54eb2962c6768f43018e5c@34.79.3.199:30303
    enode://9d86d92fb38a429330546fe1aefce264e1f55c5d40249b63153e7df744005fa3c1e2da295e307041fd30ab1c618715f362c932c28715bc20bed7ae4fc76dea81@34.77.144.164:30303
    enode://c82c31f21dd5bbb8dc35686ff67a4353382b4017c9ec7660a383ccb5b8e3b04c6d7aefe71203e550382f6f892795728570f8190afd885efcb7b78fa398608699@34.76.202.74:30303
    enode://3bad5f57ad8de6541f02e36d806b87e7e9ca6d533c956e89a56b3054ae85d608784f2cd948dc685f7d6bbd5a2f6dd1a23cc03e529ea370dd72d880864a2af6a3@104.199.93.87:30303
    enode://1decf3b8b9a0d0b8332d15218f3bf0ceb9606b0efe18f352c51effc14bbf1f4f3f46711e1d460230cb361302ceaad2be48b5b187ad946e50d729b34e463268d2@35.240.26.148:30303
    ```

  - op-node bootnodes, to be used with op-node `--p2p.bootnodes` flag:

    ```text
    enr:-J64QJipvmFhMq6DVh6RR4HvIiiBtyy1NUg_QlnAAbf18SMqCxCPZtLgUiWED5p0HRVPv69Wth4YPsvdKXSUyh57mWuGAZXRp6HjgmlkgnY0gmlwhCJTtG-Hb3BzdGFja4TsyQIAiXNlY3AyNTZrMaECKPT8t_OMGwEgh_eu8l3LChJXzPHNxMqohYTcJUFhKQaDdGNwgiQGg3VkcIIkBg
    enr:-J64QCxBGS49IQbkbwsUuVWt9CkMctMCRe0b-4dqRsLr4QJ1S52urWPUk2uhBU5uerRGpxWTZZW5FtJC-9gSBHN3cSiGAZXRp4rbgmlkgnY0gmlwhCKph0CHb3BzdGFja4TsyQIAiXNlY3AyNTZrMaECqQd8PgMCBpVMXH8izBajLLUBMRKqiYXjV1-t2niEpQiDdGNwgiQGg3VkcIIkBg
    enr:-J64QLG71bmmljNbLFx3qim6zXohKA3jbK_4C4d1cwixI-7VMoBIlnM6kWZVvvdWcbjTQ6QXB1LAO39eZWC4Heztj1-GAZXRpzUGgmlkgnY0gmlwhCKpySSHb3BzdGFja4TsyQIAiXNlY3AyNTZrMaEDApsAenpWrLqo6lDsYs2ieUhL84Q_rhZG9pBWb3hKylCDdGNwgiQGg3VkcIIkBg
    enr:-J64QKFU-u1x1gt3WmNP88EDUMQ316ymbzdGy83QjkBDqVSsJBn6-nipuqYQDeHYoLBLVJUMdyAiwxVbbDm14qQSf5qGAZXRppmIgmlkgnY0gmlwhCJTfzOHb3BzdGFja4TsyQIAiXNlY3AyNTZrMaEC88lrc6V3LF77SNWjO_GT5YCA2Ca6fwPp1b3vIMBjSk-DdGNwgiQGg3VkcIIkBg
    enr:-J64QIXTVl0Opbdn20TSrkzpIZ4xQ54bERRlTmSeZ05dFLdlSbuRY7yn5tJeTPzsSldTw5V5E0qjEQcsfr20vMjTUDyGAZXRpiWygmlkgnY0gmlwhCPjrx6Hb3BzdGFja4TsyQIAiXNlY3AyNTZrMaED2qWtZdFrywlnz0eNnyBUS_G23mF2NORS3_e5RyefQfSDdGNwgiQGg3VkcIIkBg
    enr:-J64QFAsbeR4xRSyVyQOk7bILUCoMjI2EnbZvo4UAK3842HMYw41-UZXdnQJH8lwvzWn7qsY3Vu73NuxzxWKn4XB5wiGAZXRpYPAgmlkgnY0gmlwhCJSxmKHb3BzdGFja4TsyQIAiXNlY3AyNTZrMaEDx51ZbXcmg4flmWldI-lBwUwiB0UFLqZkKnHvffMaE4eDdGNwgiQGg3VkcIIkBg
    enr:-J64QFQSrL3mfG-i64T-5DgVE5V9dGKC5A0JrEvD6CRpZvuLK3feg4bPaqFWfqXyNN_6IgY2z1Jkr4Mf2Zx-GdWlWquGAZXQkMdSgmlkgnY0gmlwhCImtd-Hb3BzdGFja4TsyQIAiXNlY3AyNTZrMaEDQVEzYHXdCOtsdb_WOFXopL1v0Pka5KgbFJMPJnHhau6DdGNwgiQGg3VkcIIkBg
    enr:-J64QAp3g1m-5uX-_mBXWyo6ZQqAlnRcAt11Xwy0-ZzqaSrDSlg4adyOz6v9flzLgxYkVvXI50nJGs8GjLgT5bwDLtyGAZXQrD69gmlkgnY0gmlwhCJMJgaHb3BzdGFja4TsyQIAiXNlY3AyNTZrMaECq5mdt1EmXHFLFxNE3hly7XQ0gWLeRloERPVuULjP0EiDdGNwgiQGg3VkcIIkBg
    enr:-J64QFCZs1ePThNEsRxIIzbfDxYfap1nEyuPPpSUeeWOoPFWOp0zSEPwLEtXhG1eH-ipsB5CgtaVzcXOyT9hKeAeVVaGAZXQkaZ3gmlkgnY0gmlwhCO7ajaHb3BzdGFja4TsyQIAiXNlY3AyNTZrMaEDnYbZL7OKQpMwVG_hrvziZOH1XF1AJJtjFT5990QAX6ODdGNwgiQGg3VkcIIkBg
    enr:-J64QJ9LY8m9AjNgujuVT0juX8T6PHKojZEIqd-7_vhBasfiT2xUUJoUfWga_xVJGFECFcN6hPKB4TjihmYFxHXelwOGAZXQkclrgmlkgnY0gmlwhCJMELeHb3BzdGFja4TsyQIAiXNlY3AyNTZrMaEDyCwx8h3Vu7jcNWhv9npDUzgrQBfJ7HZgo4PMtbjjsEyDdGNwgiQGg3VkcIIkBg
    enr:-J64QGJFPZzLj2GLFgB4JhTde7rXChMNFERNbzrwYYTG7CY2SCSggFrU3VXczzWBvOoJWdbOMOzPuCI2klknGjruUxeGAZXQkf1LgmlkgnY0gmlwhGjHJzuHb3BzdGFja4TsyQIAiXNlY3AyNTZrMaEDO61fV62N5lQfAuNtgGuH5-nKbVM8lW6JpWswVK6F1giDdGNwgiQGg3VkcIIkBg
    enr:-J64QEXleDl25w0qEG__wmDgwnzB0F5zapu00D_jM4qkCbA3WIcLC8rXPm8dcrKdZNBuNXJOtNE6c2_ZDkuQMvIuhjCGAZXQwDjFgmlkgnY0gmlwhCKMdU-Hb3BzdGFja4TsyQIAiXNlY3AyNTZrMaECHezzuLmg0LgzLRUhjzvwzrlgaw7-GPNSxR7_wUu_H0-DdGNwgiQGg3VkcIIkBg
    ```

- Container images:
  - [Celo L1 client](https://us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.9)
  - [op-geth](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo-v2.1.0)
  - [op-node](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo-v2.1.0)
  - [eigenda-proxy](https://ghcr.io/layr-labs/eigenda-proxy:v1.8.2)

### Alfajores

- [Full migrated chaindata](https://storage.googleapis.com/cel2-rollup-files/alfajores/alfajores-migrated-datadir.tar.zst)
- [Rollup deploy config](https://storage.googleapis.com/cel2-rollup-files/alfajores/config.json)
- [L1 contract addresses](https://storage.googleapis.com/cel2-rollup-files/alfajores/deployment-l1.json)
- [L2 allocs](https://storage.googleapis.com/cel2-rollup-files/alfajores/l2-allocs.json)
- [rollup.json](https://storage.googleapis.com/cel2-rollup-files/alfajores/rollup.json)
- [Genesis](https://storage.googleapis.com/cel2-rollup-files/alfajores/genesis.json) used for snap syncing
- P2P peers:
  - op-geth bootnode/peers, to be used with op-geth `--bootnodes` flag:

    ```text
    enode://ac0f42fa46f8cc10bd02a103894d71d495537465133e7c442bc02dc76721a5f41761cc2d8c69e7ba1b33e14e28f516436864d3e0836e2dcdaf032387f72447dd@34.83.164.192:30303
    enode://596002969b8b269a4fa34b4709b9600b64201e7d02e2f5f1350affd021b0cbda6ce2b913ebe24f0fb1edcf66b6c730a8a3b02cd940f4de995f73d3b290a0fc92@34.82.177.77:30303
    enode://3619455064ef1ce667171bba1df80cfd4c097f018cf0205aaad496f0d509611b7c40396893d9e490ee390cd098888279e177a4d9bb09c58387bb0a6031d237f1@34.19.90.27:30303
    enode://e3c54db6004a92d4ee87504f073f3234a25759b485274cc224037e3e5ee792f3b482c3f4fffcb764af6e1859a1aea9710b71e1991e32c1dee7f40352124bb182@35.233.249.87:30303
    enode://674410b34fd54c8406a4f945292b96111688d4bab49aecdc34b4f1b346891f4673dcb03ed44c38ab467ef7bec0b20f6031ad88aa1d35ce1333b343d00fa19fb1@34.168.43.76:30303
    ```

  - op-node static peers, to be used with op-node `--p2p.bootnodes` flag:

    ```text
    enr:-J64QOpbyT0wCfa37PO5qirwmbRsdHy_nMy8-Yam8-SaeK4oL6S-5Z0YKE6TphhZWjfux-EfjxedIbqdiXDEd2bRrNiGAZX2gzlHgmlkgnY0gmlwhCPFGTSHb3BzdGFja4Tz3QIAiXNlY3AyNTZrMaEDrA9C-kb4zBC9AqEDiU1x1JVTdGUTPnxEK8Atx2chpfSDdGNwgiQGg3VkcIIkBg
    enr:-J64QI8egoBPlV8cBO9xhBK1wg2ZJj3UH_nw9DjA_mfyYNY2ewDNJ88uCKXV5Kmlj15p3OpdbdUiyXBI9OuxU0LEBtmGAZX2gyNbgmlkgnY0gmlwhCJpFgSHb3BzdGFja4Tz3QIAiXNlY3AyNTZrMaECWWAClpuLJppPo0tHCblgC2QgHn0C4vXxNQr_0CGwy9qDdGNwgiQGg3VkcIIkBg
    enr:-J64QCnvpKsWBbrZEzJXQYraWh6XpAI4ygdtrjRPxBKsrdPwHOaN2OcN1w7eBdA2vyXEicxseNVpIFQfvB3nKKzSBo2GAZX2gtNGgmlkgnY0gmlwhCJT0aiHb3BzdGFja4Tz3QIAiXNlY3AyNTZrMaEDNhlFUGTvHOZnFxu6HfgM_UwJfwGM8CBaqtSW8NUJYRuDdGNwgiQGg3VkcIIkBg
    enr:-J64QLMeHf5MBmx06LfYEVAB2-5BfvChT-uf3_cKiUFwoA8BI6yjQVSGQMe8F-Oqd662lPaa62Aikq-ra9a_J82852iGAZX2grXVgmlkgnY0gmlwhCJT1pWHb3BzdGFja4Tz3QIAiXNlY3AyNTZrMaEC48VNtgBKktTuh1BPBz8yNKJXWbSFJ0zCJAN-Pl7nkvODdGNwgiQGg3VkcIIkBg
    enr:-J64QH2pBtdN_th8TLGEEMjmz5lMsU7nxcY2hpRGUtbPb7McP4VD089C72g0Ms8eztJzf5u3S-3ooH9S3Q0Qj1BYnbKGAZX2gn8tgmlkgnY0gmlwhCKpBTSHb3BzdGFja4Tz3QIAiXNlY3AyNTZrMaEDZ0QQs0_VTIQGpPlFKSuWERaI1Lq0muzcNLTxs0aJH0aDdGNwgiQGg3VkcIIkBg
    ```

- Container images:
  - [Celo L1 client](https://us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.7)
  - [op-geth](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo-v2.1.0-rc2)
  - [op-node](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo-v2.1.0-rc)
  - [eigenda-proxy](https://ghcr.io/layr-labs/eigenda-proxy:v1.8.2)

### Baklava

- [Final Celo L1 chaindata](https://storage.googleapis.com/cel2-rollup-files/baklava/baklava-l1-final.tar.zst)
- [Full migrated chaindata](https://storage.googleapis.com/cel2-rollup-files/baklava/baklava-migrated-datadir.tar.zst)
- [Rollup deploy config](https://storage.googleapis.com/cel2-rollup-files/baklava/config.json)
- [L1 contract addresses](https://storage.googleapis.com/cel2-rollup-files/baklava/deployment-l1.json)
- [L2 allocs](https://storage.googleapis.com/cel2-rollup-files/baklava/l2-allocs.json)
- [rollup.json](https://storage.googleapis.com/cel2-rollup-files/baklava/rollup.json)
- [Genesis](https://storage.googleapis.com/cel2-rollup-files/baklava/genesis.json) used for snap syncing
- P2P peers:
  - op-geth bootnode/peers, to be used with op-geth `--bootnodes` flag:

    ```text
    enode://6017c373a4151250e166ee7205b78cf845caff6a2003b3be38af8a09a569e413e31b21667d38a065f747a3662aec4920f122ad1bf1d46605cacf2d3d19f0ff5b@34.19.52.198:30303
    enode://e0ab5ed2071b0ea0d57a52e3cd3da7c97db1a0754e00e91a32a1ca9dab6bf040fa1dd8775e8d6812a557d75760b1b90d18a8d69cbf8cfc2b7acdacf0b47fce96@34.168.70.112:30303
    enode://b6d21edf251da32ffc1527092045ad3beba435f8ba27373dba8ce35f3ee54a411dc8327b57ebce9dc5c53e29825ea9e62356289a849fc4a048cce64da771aed8@34.82.194.102:30303
    enode://339acdcbc3961b11f5458bab3c931e1bbb41548d9cea7692311db1543deac1f4a9efc1e6cff93f745865988d16bdc6bbb38cd59a8dde71bafd236eec0d5e0fea@34.82.75.77:30303
    enode://616429f584575f8da463c18e5e2d38ec028b95446bffd607ebf8ac3d2dd3bbe9b859c91efbbbea6cf51ad78fb0d5db178f66ca57e647bd46bfe6692cc06127e9@34.53.24.17:30303
    ```

  - op-node static peers, to be used with op-node `--p2p.bootnodes` flag:

    ```text
    enr:-J64QKvLBbIvoGzKERuQQuFGDttUj_Yww7s0JBR6BGvI6utnGIHyUuHX87XEbHBDUk71XhkKb3N_kpFlrbOljK8yqO2GAZXyJxGRgmlkgnY0gmlwhCJpeVSHb3BzdGFja4Tw5gMAiXNlY3AyNTZrMaEDYBfDc6QVElDhZu5yBbeM-EXK_2ogA7O-OK-KCaVp5BODdGNwgiQGg3VkcIIkBg
    enr:-J64QJIRPy9nuK8uc1s3UnyimNCBp2neviwNseTF70lHBkRYMv6GaioffcV_0s5TRL6JoDdLehW4gtUuy5Y45gETTP-GAZXTuoo-gmlkgnY0gmlwhCPHp8iHb3BzdGFja4Tw5gMAiXNlY3AyNTZrMaEC4Kte0gcbDqDVelLjzT2nyX2xoHVOAOkaMqHKnatr8ECDdGNwgiQGg3VkcIIkBg
    enr:-J64QGsGoqQCyPbkzIUG-fxqC6uo1WE7akbchrMTNXVn1KPqUEwq03AlRYzmyyM22WAP69-vZfdMIx1J-A2OL-1t2R-GAZXTurk8gmlkgnY0gmlwhCKRbx6Hb3BzdGFja4Tw5gMAiXNlY3AyNTZrMaECttIe3yUdoy_8FScJIEWtO-ukNfi6Jzc9uozjXz7lSkGDdGNwgiQGg3VkcIIkBg
    enr:-J64QHJ0ygyqmw5Tvli7SzMujhP8GxhQ672vF_C-7hcRQudZe5J2SxAton0wMt3C47jyHq2fvaTEh029mzwYQ3jHhCGGAZXTuuivgmlkgnY0gmlwhCPp9oGHb3BzdGFja4Tw5gMAiXNlY3AyNTZrMaECM5rNy8OWGxH1RYurPJMeG7tBVI2c6naSMR2xVD3qwfSDdGNwgiQGg3VkcIIkBg
    enr:-J64QPX27ur5gkXOhje9MU7p6AD_C26n-vcBiKq8adst3WkpAyVgo-sWCIAikqDyX-i94hoOYxOOAV1Mx5pIQ5xgHUmGAZXTuxj7gmlkgnY0gmlwhCJ_LRWHb3BzdGFja4Tw5gMAiXNlY3AyNTZrMaEDYWQp9YRXX42kY8GOXi047AKLlURr_9YH6_isPS3Tu-mDdGNwgiQGg3VkcIIkBg
    ```

- Container images:
  - [Celo L1 client](https://us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.8)
  - [op-geth](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo-v2.1.0-rc2)
  - [op-node](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo-v2.1.0-rc)
  - [eigenda-proxy](https://ghcr.io/layr-labs/eigenda-proxy:v1.8.2)

### Celo Sepolia

- [L1 contract addresses](https://storage.googleapis.com/cel2-rollup-files/celo-sepolia/deployment-l1.json)
- [rollup.json](https://storage.googleapis.com/cel2-rollup-files/celo-sepolia/rollup.json)
- [Genesis](https://storage.googleapis.com/cel2-rollup-files/celo-sepolia/genesis.json) used for snap syncing
- P2P peers:
  - op-geth bootnode/peers, to be used with op-geth `--bootnodes` flag:

    ```text
    enode://7fd35dfea27042fe008c74ea97c7a41254b293152730419a6e9bcd84bb03c7ced418c1043e2ef6ad63d2facca6fbdacfbf7c4bfcf33ee7e9a0e6b7eb0617595d@34.169.104.197:30303
    enode://151bcf170585971fc78129d9c16af355a1a53e1c825ce1ac20700ea754aa33eda60ca83de6f954bfed8d36c53f33295d93dbc3da9d549d6547d09467806b4b3d@104.199.124.11:30303
    enode://aa5fb766438ac5a0354eb2eec1c0c002b56bb2ce7ed44f0e76e019cbb931222faa9ecfb0fa0055c0c62a2fcf04492d4129349a1045dfef140585250281885e4b@34.83.115.97:30303
    enode://27c81ca466c99016d1595429afc68d66afb3ed9d5a2dd7f6a7797db23a4c826546a177b69b4932f3a75ce374b09d8ccc5b52dad615b3c47dbb8f6217d79ded22@35.247.1.226:30303
    ```

  - op-node static peers, to be used with op-node `--p2p.bootnodes` flag:

    ```text
    enr:-J-4QF7_9Y18cQSQ2wXHD_e65Qy82L1DpfVK4TlOuTDC9oAxeFxmvAn877A2ZXXfc08eLFgZP1mrRjkF4Kts1eGPGbKGAZg2ao5CgmlkgnY0gmlwhCKRF6aHb3BzdGFja4XMiKgFAIlzZWNwMjU2azGhA3_TXf6icEL-AIx06pfHpBJUspMVJzBBmm6bzYS7A8fOg3RjcIIkBoN1ZHCCJAY
    enr:-J-4QEbMTKrBfyAeq9hWlEchulzvt1gWA-wAGa_kUdWw1K-faR-AjFNzhcVGG7yDnRb1RptLDGWVpl-WXWhrgJ4TKEaGAZg2XFFugmlkgnY0gmlwhCKotN-Hb3BzdGFja4XMiKgFAIlzZWNwMjU2azGhAxUbzxcFhZcfx4Ep2cFq81WhpT4cglzhrCBwDqdUqjPtg3RjcIIkBoN1ZHCCJAY
    enr:-J-4QEawPak_hVU3h1wPZEGu7zLOv1C3k4WI8nHLUc83RqsRMauPtOPt8hYDFyxeJeaUyp0OUM0oyq-_9CEdshE1oWaGAZg2XLgDgmlkgnY0gmlwhCJSX5OHb3BzdGFja4XMiKgFAIlzZWNwMjU2azGhA6pft2ZDisWgNU6y7sHAwAK1a7LOftRPDnbgGcu5MSIvg3RjcIIkBoN1ZHCCJAY
    enr:-J-4QCDpfivb0y0Sne1sZOqm1_WOKWWyJ6fo9j93jrxGVm0CcG6tScy3oQAaUuUbh-SmS_cQTO9ciw0_R3q1rpcjGLmGAZg2cWjGgmlkgnY0gmlwhCPFR5uHb3BzdGFja4XMiKgFAIlzZWNwMjU2azGhAifIHKRmyZAW0VlUKa_GjWavs-2dWi3X9qd5fbI6TIJlg3RjcIIkBoN1ZHCCJAY
    ```

- Container images:
  - [op-geth](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo-v2.1.2)
  - [op-node](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo-v2.1.0)
  - [eigenda-proxy](https://ghcr.io/layr-labs/eigenda-proxy:v1.8.2)

## Troubleshooting

### Transactions Are Not Being Executed When Submitted to a Node

If your node is synced but transactions submitted to it are not executed, make sure the `--rollup.sequencerhttp` flag is correctly set.

- Mainnet: `--rollup.sequencerhttp=https://cel2-sequencer.celo.org/`
- Alfajores: `--rollup.sequencerhttp=https://sequencer.alfajores.celo-testnet.org`
- Baklava: `--rollup.sequencerhttp=https://sequencer.baklava.celo-testnet.org`
- Celo Sepolia: `--rollup.sequencerhttp=https://sequencer.celo-sepolia.celo-testnet.org`

### Self-Hosted Public RPC Does Not Retrieve Transactions by Hash

If you are hosting a public RPC node, please make sure the flag `--history.transactions` is set to 0 in op-geth (i.e. `--history.transactions=0`), so all transactions are indexed. Otherwise, transactions will not be retrievable by hash.

## Getting Help

Please reach out to our team on [Discord](https://chat.celo.org) in the [#celo-L2-support](https://discord.com/channels/600834479145353243/1286649605798367252) channel if you have any questions.
