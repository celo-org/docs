---
title: Celo L2 Migration Guide
description: How to migrate Celo nodes from L1 to L2
---

This guide is designed to help full node operators migrate from the Celo L1 to the Celo L2 client
for the upcoming Layer 2 upgrades. Please note that the Celo mainnet instructions will be finalized
after the Alfajores testnet upgrade occurs.


## Alfajores migration overview

In the Celo L1 to L2 transition, we are migrating all historical Celo data into the Celo L2 node, ensuring that blocks, transactions, logs, and receipts are fully accessible within the Celo L2 environment.

:::info
The Alfajores network has migrated on block *26384000*.
:::

Sometime before the transition, all Alfajores node operators must upgrade their existing nodes to the latest version and add a `--l2migrationblock` flag when restarting (see below). All Alfajores nodes that do this will stop adding blocks immediately before the specified block number.

When the block before `--l2migrationblock` is reached, node operators can start their L2 Alfajores nodes.
Those who _do not_ need a full sync can start a Celo L2 node and use snap sync right away.
Those who _do_ need a full sync have two options: download and use the migrated chaindata provided by cLabs or run a migration script on their own chaindata to convert it into a format compatible with the Celo L2 node.

To simplify the management of the Celo L2 node, no legacy execution logic is included in Celo L2.
However, RPC calls that require execution or state for pre-transition L1 blocks remain supported by proxying these requests from the Celo L2 node to a legacy Celo L1 node.
Therefore, operators looking to run full archive nodes or serve requests for historical state / execution now need to run both a Celo L1 node and a Celo L2 node. The Celo L2 node can be configured to redirect requests for historical state / execution to the Celo L1 node (see Configuring a HistoricalRPCService).  
Since the Celo L2 node does still require the full pre-migration chain data, these operators will require approximately double the storage space as is currently needed.

### Alfajores deployment resources

Here you can find the resources used for the Alfajores migration. Some of these are generated during the migration process if you decide to migrate your own chain data.

- [Rollup deployment config](https://storage.googleapis.com/cel2-rollup-files/alfajores/config.json)
- [L1 Contract Addresses](https://storage.googleapis.com/cel2-rollup-files/alfajores/deployment-l1.json)
- [L2 Allocs](https://storage.googleapis.com/cel2-rollup-files/alfajores/l2-allocs.json)
- [Genesis file](https://storage.googleapis.com/cel2-rollup-files/alfajores/genesis.json)
- [Rollup config](https://storage.googleapis.com/cel2-rollup-files/alfajores/rollup.json)
- [Migrated snapshot at migration block 26,384,000](https://storage.googleapis.com/cel2-rollup-files/alfajores/alfajores-migrated-datadir.tar.zst)

### Stopping an L1 node

If you're currently running an L1 Alfajores node, you can upgrade your Celo blockchain client to the [v1.8.5](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.5) release before the migration, and include the `--l2migrationblock=26384000` flag when restarting. While this step is not mandatory for full nodes —since the network will stall if a quorum of elected validators has the flag set— it is recommended as a practice run for the upcoming Baklava and Mainnet migrations.

This will automatically prevent your node from processing blocks higher than `l2migrationblock - 1` (i.e.: 26383999).

### Starting an L2 node

Node operators who wish to run an L2 node have three options, ranked by ease and the level of trust required:

1. Start an L2 node with snap sync. This option does not require running the migration script.
2. Start an L2 node with the provided migrated chaindata.
3. Migrate the L1 chaindata manually.

Snap sync provides a simpler and faster setup experience. However, it is not suitable if you plan to run an archive node. In that case, you'll need to either use an archive node snapshot or migrate your own archive data from an L1 node. While both options follow a similar process, there are some differences, particularly in how you prepare the chaindata from the L1. Nonetheless, the majority of the service configuration remains the same across all options.

:::info
If you plan to migrate your own chaindata, we recommend getting familiar with the instructions and running the pre-migration 1-3 days ahead of the full migration.
:::

To set up your node, you'll need to run three services: `op-node`, `op-geth`, and `eigenda-proxy`. op-node serves as the consensus client for the L2 node, op-geth as the execution client, and eigenda-proxy acts as the interface between your L2 node and the data availability layer [EigenDA](https://www.blog.eigenlayer.xyz/intro-to-eigenda-hyperscale-data-availability-for-rollups/).

If you plan to run multiple L2 nodes, you’ll need separate instances of `op-node` and `op-geth` for each node, but you can share a single instance of `eigenda-proxy`. Additionally, you'll need an endpoint for the L1 RPC, which can either be a public node or your own L1 node. For Alfajores, the L1 used is [Holesky](https://chainlist.org/chain/17000).

- [Running EigenDA Proxy](#running-eigenda-proxy)
- [Running op-node](#running-op-node)
- [Running op-geth](#running-op-geth)

### Running EigenDA Proxy

:::info
We have deployed a public EigenDA proxy for Alfajores at `https://eigenda-proxy.alfajores.celo-testnet.org`. This instance has caching enabled, so all Alfajores blobs will be available for download, even if they have expired from EigenDA. You can configure your nodes to consume from this instance. Beware that for Mainnet, we are not planning to host such a proxy.
:::

:::info
These are brief instructions for running an eigenda-proxy instance. For more detailed instructions, please refer to the [repository README](https://github.com/Layr-Labs/eigenda-proxy/tree/main?tab=readme-ov-file#deployment-guide).
:::

If you are using Kubernetes for this deployment, you can utilize our [eigenda-proxy helm chart](https://github.com/celo-org/charts/tree/main/charts/eigenda-proxy) to simplify the process. Feel free to modify these instructions to better suit your specific needs.

1. You can use the official Docker image for the EigenDA Proxy. At the time of writing, we are using version 1.4.1 (`ghcr.io/layr-labs/eigenda-proxy:v1.4.1`). Alternatively, you can build it from source:

```bash
git clone https://github.com/Layr-Labs/eigenda-proxy.git
cd eigenda-proxy
git checkout v1.2.0
make

# Binary available at ./bin/eigenda-proxy
```

2. You will need to download two files required for KZG verification. At the time of writing, these files are approximately 8GB in size, so please ensure you have enough space in the download directory. For example:

```bash
EIGENDA_KZG_PROXY_DIR=/tmp/alfajores/eigenda-proxy/kzg
mkdir -p ${EIGENDA_KZG_PROXY_DIR}

[ ! -f ${EIGENDA_KZG_PROXY_DIR}/g1.point ] && wget https://srs-mainnet.s3.amazonaws.com/kzg/g1.point --output-document=${EIGENDA_KZG_PROXY_DIR}/g1.point
[ ! -f ${EIGENDA_KZG_PROXY_DIR}/g2.point.powerOf2 ] && wget https://srs-mainnet.s3.amazonaws.com/kzg/g2.point.powerOf2 --output-document=${EIGENDA_KZG_PROXY_DIR}/g2.point.powerOf2

wget https://raw.githubusercontent.com/Layr-Labs/eigenda-operator-setup/master/resources/srssha256sums.txt --output-document=${EIGENDA_KZG_PROXY_DIR}/srssha256sums.txt
if (cd ${EIGENDA_KZG_PROXY_DIR} && sha256sum -c srssha256sums.txt); then
  echo "Checksums match. Verification successful."
else
  echo "Error: Checksums do not match. Please delete this folder and try again."
  exit 1
fi
```

3. Finally, we can run eigenda-proxy. Feel free to modify the `--eigenda-eth-rpc` flag to point to your own node or your preference:

```bash
EIGENDA_IMAGE=ghcr.io/layr-labs/eigenda-proxy:v1.4.1

docker run -d \
  --name eigenda-proxy \
  -v ${EIGENDA_KZG_PROXY_DIR}:/data \
  --network=host \
  ${EIGENDA_IMAGE} \
    /app/eigenda-proxy \
      --addr=0.0.0.0 \
      --port=4242 \
      --eigenda-disperser-rpc=disperser-holesky.eigenda.xyz:443 \
      --eigenda-eth-rpc=https://ethereum-holesky-rpc.publicnode.com \
      --eigenda-svc-manager-addr=0xD4A7E1Bd8015057293f0D0A557088c286942e84b \
      --eigenda-status-query-timeout=45m \
      --eigenda-g1-path=/data/g1.point \
      --eigenda-g2-tau-path=/data/g2.point.powerOf2 \
      --eigenda-disable-tls=false \
      --eigenda-eth-confirmation-depth=1 \
      --eigenda-max-blob-length=300MiB
```

### Running op-node

Op-node is not a resource-demanding service. We recommend running it on any modern CPU (amd64 or arm64) with at least 2GB of memory. It is stateless, so it does not require any persistent storage.

1. To run op-node, you can use the container image: `us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo9`. Alternatively, you can clone the [celo-org/optimism repository](https://github.com/celo-org/optimism) and build op-node from source:

```bash
git clone https://github.com/celo-org/optimism.git
cd optimism/op-node
git checkout celo9
make op-node
```

2. Download the rollup config file and generate a JWT secret (this value will also be required for configuring the op-geth client):

```bash
OP_NODE_DIR=/tmp/alfajores/op-node
mkdir -p ${OP_NODE_DIR}
wget https://storage.googleapis.com/cel2-rollup-files/alfajores/rollup.json --output-document=${OP_NODE_DIR}/rollup.json

echo openssl rand -hex 32 > ${OP_NODE_DIR}/jwt.txt
```

3. Run the container (or the binary if preferred). You can use the following example as a reference. If you're using snap sync mode, you need to add the flag `--syncmode=consensus-layer`.

```bash
OP_NODE_IMAGE=us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo9

docker run -d \
  --name op-node \
  --network=host \
  --restart=always \
  -v ${OP_NODE_DIR}:/data \
  ${OP_NODE_IMAGE}
  op-node \
    --l1.trustrpc=true \
    --l1=https://ethereum-holesky-rpc.publicnode.com \
    --l1.beacon=https://ethereum-holesky-beacon-api.publicnode.com \
    --l2=http://localhost:8551 \
    --l2.jwt-secret=/data/jwt.txt \
    --rollup.load-protocol-versions=true \
    --rollup.config=/data/rollup.json \
    --verifier.l1-confs=4 \
    --rpc.addr=127.0.0.1 \
    --syncmode=<consensus-layer/execution-layer>
    --rpc.port=9545 \
    --p2p.listen.tcp=9222 \
    --p2p.listen.udp=9222 \
    --p2p.priv.path=/data/op-node_p2p_priv.txt \
    --p2p.static=/ip4/35.197.25.52/tcp/9222/p2p/16Uiu2HAmQEdyLRSAVZDr5SqbJ1RnKmNDhtQJcEKmemrVxe4FxKwR,/ip4/34.105.22.4/tcp/9222/p2p/16Uiu2HAm1SZBDSugT5MMu7vBY8auDgfZFNhoDeXPLc9Me5FsAxwT,/ip4/34.83.209.168/tcp/9222/p2p/16Uiu2HAmGJAiUX6HLSo4nLh8T984qxzokwL23cVsYuNZy2SrK7C6,/ip4/34.83.214.149/tcp/9222/p2p/16Uiu2HAmAko2Kr3eAjM7tnshtEhYrxQYfKUvN2kwiygeFoBAoi8S,/ip4/34.169.5.52/tcp/9222/p2p/16Uiu2HAmKc6YKHzYgsjBDaj36uAufxpgZFgrzDqVBt6zTPwdhhJD \
    --altda.enabled=true \
    --altda.da-server=http://localhost:4242 \
    --altda.da-service=true \
    --altda.verify-on-read=false
```

For the `--syncmode` flag, use `--syncmode=consensus-layer` if you're using a snapshot and want blocks to be synced through the op-node. Alternatively, use `--syncmode=execution-layer` when using snap-syncing, and blocks will be synced by op-geth.

If you start op-node before op-geth, it will shut down after a few seconds if it cannot connect to its corresponding op-geth instance. This is normal behavior. It will run successfully once op-geth is running and it can connect to it.

### Running op-geth

Now, let's move on to the op-geth execution client. It will be responsible for executing transactions and generating blocks. We recommend running op-geth on a machine with 8 modern cores (amd64 or arm64), at least 8GB of memory and 200GB of storage. Feel free to adjust these values based on your specific requirements.

:::info
You can use the [official op-geth documentation](https://docs.optimism.io/builders/node-operators/configuration/execution-config) as an additional reference.
:::

Although there are multiple ways to run op-geth, all options will share most of the same configuration. Depending on the option you choose, you may need to execute some steps before running op-geth to prepare the chaindata:

- [Option 1: Snap sync](#option-1-snap-sync)
- [Option 2: Download L2 chaindata](#option-2-download-l2-chaindata)
- [Option 3: L1 chaindata migration](#option-3-l1-chaindata-migration)

#### Option 1: Snap sync

With snap sync, you can start an L2 node without migrating or downloading the L1 chaindata. It is the easiest way to get started with an L2 node, but it does not support archive nodes. To start an L2 node with snap sync, you need to run op-geth with the `--syncmode=snap` flag.

Also, if you are using snap sync, you will need to `init` the chaindata dir using the provided genesis file. You should not `init` if you are starting your node with a migrated datadir. Run using the container or the binary according to your preference. You can use the following example as a reference.

```bash
OP_GETH_DIR=/tmp/alfajores/op-geth
OP_GETH_IMAGE=us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo8
mkdir -p ${OP_GETH_DIR}
wget https://storage.googleapis.com/cel2-rollup-files/alfajores/genesis.json --output-document=${OP_NODE_DIR}/genesis.json

docker run -it \
  --name op-geth-init \
  -v ${OP_GETH_DIR}:/celo \
  ${OP_GETH_IMAGE}
  geth \
    --datadir=/celo \
    init /celo/genesis.json
```

Additionally when running op-geth, you need to provide `--syncmode=snap` flag. Please continue with [executing op-geth](#executing-op-geth) instructions to start your L2 node.

#### Option 2: Download L2 chaindata

This option is best for nodes that need the full chain history (e.g. archive nodes). In case of an archive node, you can download the migrated chaindata from a L2 fullnode snapshot, and run op-geth with the `--gcmode=archive` flag (it will only keep archive state for L2 blocks). Also, with this option, you can either use `--syncmode=consensus-layer` or `--syncmode=snap` (you will need to have op-node peers to use `--syncmode=consensus-layer` and op-geth peers to use `--syncmode=snap`).

```bash
OP_GETH_DIR=/tmp/alfajores/op-geth

mkdir -p ${OP_GETH_DIR}
wget https://storage.googleapis.com/cel2-rollup-files/alfajores/alfajores-migrated-datadir.tar.zst
tar -xvf alfajores-migrated-datadir.tar.zst -C ${OP_GETH_DIR}
```

Please continue with [executing op-geth](#executing-op-geth) instructions to start your L2 node.

#### Option 3: L1 chaindata migration

Migrating L1 chaindata is the most involved option, but you can use your own L1 chaindata, not trusting the provided chaindata. This option can be split into two steps: pre-migration and full migration. For the pre-migration, you can use the chaindata from a L1 fullnode you trust. This step can be used to prepare the chaindata for the full migration, reducing the time required for the full migration (and the downtime of the node during the migration).
For the full migration step, you will need to wait until Alfajores L1 has stopped producing blocks (that will happen at block 26384000).

##### Pre-migration

The migration script is provided as a docker image, but you can also review and build it from source. The docker image is available at `us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/cel2-migration-tool:celo9`. To build from source, you can follow the next steps:

```bash
git clone https://github.com/celo-org/optimism.git
git checkout celo9
cd ops-chain-ops
make celo-migrate
```

~24-72 hours before the migration block, node operators can run a pre-migration script. This script migrates the majority of the chaindata in advance so that the full migration can quickly complete the migration on top of the latest state when the migration block is reached.

1. Create a snapshot of the node's chaindata directory. This is a subdirectory of the node's datadir.
    - Do not run the migration script on a datadir that is actively being used by a node.
    - Make sure you have at least enough disk space to store double the size of the snapshot, as you will be storing both the old and new (migrated) chaindata.
2. Run the pre-migration script. Using the docker image, you can use the following command as a reference:

:::danger
Do not run the migration script on a datadir that is actively being used by a node even if it has stopped adding blocks.
:::

```bash
CEL2_MIGRATION_IMAGE=us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/cel2-migration-tool:celo9

docker run -it --rm \
  -v /path/to/old/datadir/chaindata:/old-db \
  -v /path/to/new/datadir/chaindata:/new-db \
  ${CEL2_MIGRATION_IMAGE} \
  celo-migrate pre --old-db /old-db --new-db /new-db
```

Where:

- `old-db` should be the path to the chaindata snapshot.
- `new-db` should be the path where you want the L2 chaindata to be written.
- Please run the pre-migration script at least 24 hours before the migration block so that there is time to troubleshoot any issues.
- Ensure the pre-migration script completes successfully (this should be clear from the logs). If it does not, please reach out for assistance on discord
- Keep the `new-db` as is until the full migration script is run. If this data is corrupted or lost, the full migration may fail or take a very long time to complete.

##### Full migration

At block 26384000, the L1 chain will stop producing blocks. At this point, you can run the full migration script. For this step, you will need to pass in some additional files, and also configure paths to write the rollup config and genesis files to.

You can pull down the required deploy-config, l1-deployments, and l2-allocs files as follows.

```bash
CEL2_MIGRATION_DIR=/tmp/alfajores/cel2-migration-tool

mkdir -p ${CEL2_MIGRATION_DIR}
wget -O ${CEL2_MIGRATION_DIR}/config.json https://storage.googleapis.com/cel2-rollup-files/alfajores/config.json
wget -O ${CEL2_MIGRATION_DIR}/deployment-l1.json https://storage.googleapis.com/cel2-rollup-files/alfajores/deployment-l1.json
wget -O ${CEL2_MIGRATION_DIR}/l2-allocs.json https://storage.googleapis.com/cel2-rollup-files/alfajores/l2-allocs.json
```

Now we can run the migration script. Remember to stop your node (geth) before running it:

```bash
CEL2_MIGRATION_IMAGE=us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/cel2-migration-tool:celo9

docker run -it --rm \
  -v /path/to/old/datadir/chaindata:/old-db \
  -v /path/to/new/datadir/chaindata:/new-db \
  -v ${CEL2_MIGRATION_DIR}:/migration-files \
  ${CEL2_MIGRATION_IMAGE} \
  celo-migrate full \
    --old-db /path/to/old/datadir/celo/chaindata \
    --new-db /path/to/new/datadir/geth/chaindata \
    --deploy-config /migration-files/config.json \
    --l1-deployments /migration-files/deployment-l1.json \
    --l2-allocs /path/to/l2-allocs.json \
    --l1-rpc https://ethereum-holesky-rpc.publicnode.com \
    --outfile.rollup-config /path/to/rollup.json \
    --outfile.genesis /path/to/genesis.json
    --migration-block-time=1727339320
```

- `old-db` must be the path to the chaindata snapshot or the chaindata of your stopped node.
- `new-db` must be the path where you want the L2 chaindata to be written. This must be the same path as in the pre-migration script, otherwise all the work done in the pre-migration will be lost.
- `deploy-config` must be the path to the JSON file that was used for the l1 contracts deployment. This will be distributed by cLabs.
- `l1-deployments` must be the path to the L1 deployments JSON file, which is the output of running the bedrock contracts deployment for the given 'deploy-config'. This will be distributed by cLabs.
- `l1-rpc` must be the RPC URL of the L1 node. For alfajores it must be a [Holesky endpoint](https://chainlist.org/chain/17000). Feel free to use any other endpoint that you trust.
- `l2-allocs` must be the path to the JSON file defining necessary state modifications that will be made during the full migration. This will be distributed by cLabs.
- `outfile.rollup-config` is the path where you want the rollup-config.json file to be written by the migration script. You will need to pass this file when starting the L2 node.
- `outfile.genesis` is the path where you want the `genesis.json` file to be written by the migration script. Any node wishing to snap sync on the L2 chain will need this file.

Ensure the full migration script completes successfully (this should be clear from the logs). If it does not, please reach out for assistance.

:::warning
Please check in your migration logs that the resulting migration block must look like this for Alfajores:
`INFO [09-26|08:28:40.753] Wrote CeL2 migration block               height=26,384,000 root=0x38e32589e0300c46a5b98b037ea85abc5b28e3a592c36ce28d07efca8983283b hash=0xe96cb39b59ebe02553e47424e7f57dbfbffca905c3ff350765985289754a00a3 timestamp=1,727,339,320
`
:::

##### Start your L2 Node

Now that we have the migrated chaindata, we can start our L2 node using your own migrated chaindata (the `new-db` path) and the genesis file generated by the migration script. You can also use the `rollup.json` file generated by the migration script for your op-node.
Please continue with [executing op-geth](#executing-op-geth) instructions to start your L2 node.

#### Executing op-geth

1. To run op-geth, you can use the container image: `us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo8`. Alternatively, you can clone the [celo-org/op-geth repository](https://github.com/celo-org/op-geth) and build op-geth from source:

```bash
git clone https://github.com/celo-org/op-geth.git
cd op-geth
git checkout celo8
make geth
```

2. Now you can run the op-geth client. You can use the following example as a reference. If you wish to use snap sync mode, you need to add the flag `--syncmode=snap`.

```bash
OP_GETH_IMAGE=us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo8

# Copying the jwt secret from the op-node directory
cp ${OP_NODE_DIR}/jwt.txt ${OP_GETH_DIR}/jwt.txt

docker run -d \
  --name op-geth \
  --network=host \
  -v ${OP_GETH_DIR}:/celo \
  -e GETH_DATADIR=/celo \
  ${OP_GETH_IMAGE}
  geth \
    --datadir=/celo \
    --networkid=44787 \
    --syncmode=<snap/consensus-layer> \
    --gcmode=full \
    --snapshot=true \
    --maxpeers=60 \
    --port=30303 \
    --authrpc.addr=127.0.0.1 \
    --authrpc.port=8551 \
    --authrpc.jwtsecret=/celo/jwt.hex \
    --authrpc.vhosts=* \
    --http \
    --http.addr=127.0.0.1 \
    --http.port=8545 \
    --http.api=eth,net,web3,debug,txpool,engine \
    --http.vhosts=* \
    --http.corsdomain=* \
    --rollup.sequencerhttp=https://sequencer.alfajores.celo-testnet.org/ \ 
    --rollup.disabletxpoolgossip=true \
    --rollup.halt=major \
    --verbosity=3 \
    --bootnodes=enode://ac0f42fa46f8cc10bd02a103894d71d495537465133e7c442bc02dc76721a5f41761cc2d8c69e7ba1b33e14e28f516436864d3e0836e2dcdaf032387f72447dd@34.83.164.192:30303,enode://596002969b8b269a4fa34b4709b9600b64201e7d02e2f5f1350affd021b0cbda6ce2b913ebe24f0fb1edcf66b6c730a8a3b02cd940f4de995f73d3b290a0fc92@34.82.177.77:30303,enode://3619455064ef1ce667171bba1df80cfd4c097f018cf0205aaad496f0d509611b7c40396893d9e490ee390cd098888279e177a4d9bb09c58387bb0a6031d237f1@34.19.90.27:30303,enode://e3c54db6004a92d4ee87504f073f3234a25759b485274cc224037e3e5ee792f3b482c3f4fffcb764af6e1859a1aea9710b71e1991e32c1dee7f40352124bb182@35.233.249.87:30303,enode://674410b34fd54c8406a4f945292b96111688d4bab49aecdc34b4f1b346891f4673dcb03ed44c38ab467ef7bec0b20f6031ad88aa1d35ce1333b343d00fa19fb1@34.168.43.76:30303
```

#### Configuring a HistoricalRPCService

The Celo L2 node alone cannot serve RPC requests requiring historical state or execution from before the migration. To serve such requests, you must configure a HistoricalRPCService URL pointing to a Celo L1 node. The Celo L2 node will then proxy requests for historical state / execution out to the Celo L1 node.

To configure a HistoricalRPCService, add the following flag when starting `op-geth`

```bash
--rollup.historicalrpc=<CEL0_L1_NODE_URL>
```

The following rpc endpoints will forward historical requests.

- `eth_call`
- `eth_estimateGas`
- `eth_getBalance`
- `eth_getProof`
- `eth_getCode`
- `eth_getStorageAt`
- `eth_createAccessList`
- `eth_getTransactionCount`
- `debug_traceBlockByNumber`
- `debug_traceBlockByHash`
- `debug_traceCall`
- `debug_traceTransaction`

## Mainnet migration

We haven't yet picked a migration date for upgrading the Celo mainnet to the Layer 2 codebase. Once
a date is set, we will update this page with the mainnet migration instructions. The process will be
similar to the Alfajores migration. For now, feel free to refer to the Alfajores migration
instructions as a reference and stay tuned for updates on the Mainnet migration process!
