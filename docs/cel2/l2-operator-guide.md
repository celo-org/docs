---
title: Celo L1 → Celo L2 Operator Guide
description: How to migrate Celo nodes from L1 to L2
---


## Overview

:::warning
The information in this guide is subject to change.
:::

In the Celo L1 to L2 transition, we are migrating all historical Celo data into the Celo L2 node, ensuring that blocks, transactions, logs, and receipts are fully accessible within the Celo L2 environment.

At the point of transition, operators must shut down their existing Celo L1 nodes.
Thos who _do not_ need a full sync can start a Celo L2 node and use snap sync right away. 
Those who _do_ need a full sync have two options: use the migrated datadir provided by cLabs or run a migration script on their own datadir to convert it into a format compatible with the Celo L2 node.
Archive or full sync nodes require the full state at the transition point in order to continue applying transactions.

To simplify the management of the Celo L2 node, no legacy execution logic is included in Celo L2.
However, RPC calls that invoke execution for pre-transition L1 blocks remain supported by proxying these requests from the Celo L2 node to an archive Celo L1 node.
Therefore, operators looking to run full archive nodes now need to run both a Celo L1 node and a Celo L2 node.
Since the Celo L2 node does include the full chain history, these operators will require approximately double the storage space currently needed for an archive Celo L1 node.

## Alfajores Migration

:::warning
The instructions below are not yet fully useable, as some values need to be set.
:::

### Starting an L2 node

Node operators who wish to run an L2 node have three options, ranked by ease and the level of trust required:

1. Start an L2 node with snap sync. This option does not require running the migration script.
2. Start an L2 node with the provided L1 chaindata.
3. Migrate the L1 chaindata manually.

Using snap sync offers a simpler and faster experience, but it cannot be used if you want to run an archive node. In that case, you will need to use an archive node snapshot or migrate your own archive data from an L1 node.

Whichever option you choose for running your node, you will need to run an instance of [eigenda-proxy](https://github.com/Layr-Labs/eigenda-proxy/tree/main). This service acts as a proxy interface between EigenDA and the OP stack. Additionally, for all options, you will need to run op-node as the consensus client. The configuration for op-node remains almost the same regardless of the option chosen.

#### Running EigenDA Proxy

These are brief instructions for running an eigenda-proxy instance. For more detailed instructions, please refer to the [repository README](https://github.com/Layr-Labs/eigenda-proxy/tree/main?tab=readme-ov-file#deployment-guide).

If you are using Kubernetes for this deployment, you can utilize our [eigenda-proxy helm chart](https://github.com/celo-org/charts/tree/main/charts/eigenda-proxy) to simplify the process. Feel free to modify these instructions to better suit your specific needs.

1. First, you will need to download two files required for KZG verification. At the time of writing, these files are approximately 8GB in size, so please ensure you have enough space in the download directory. For example:

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

2. Now, we can run the eigenda-proxy. In this example, a container image is used, but you can also obtain the binaries by building from source or downloading them from GitHub releases. Feel free to modify the `--eigenda-eth-rpc` flag to point to your own node or your preference:

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

Alternatively, you can clone the repo and build the proxy:

```bash
git clone https://github.com/Layr-Labs/eigenda-proxy.git
cd eigenda-proxy
git checkout v1.2.0
make

# Binary available at ./bin/eigenda-proxy
```

#### Running op-node

Op-node is not a resource-demanding service. As a general recommendation, we suggest running it on any modern CPU (amd64 or arm64) with at least 2GB of memory. It is stateless, so it does not require any persistent storage.

1. To run op-node, you can use the container image: us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo8. Alternatively, you can clone the [celo-org/optimism repository](https://github.com/celo-org/optimism) and build op-node from source:

```bash
git clone https://github.com/celo-org/optimism.git
cd optimism/op-node
git checkout celo8
make op-node
```

2. Download the rollup config file and generate a JWT secret (this value will also be required for configuring the op-geth client):

```bash
OP_NODE_DIR=/tmp/alfajores/op-node
mkdir -p ${OP_NODE_DIR}
wget https://storage.googleapis.com/cel2-rollup-files/alfajores/rollup.json --output-document=${OP_NODE_DIR}/rollup.json

echo openssl rand -hex 32 > ${OP_NODE_DIR}/jwt.txt
```

3. Run the container (or the binary if prefered). You can use the following example as a reference. If you're using snap sync mode, you need to add the flag `--syncmode=consensus-layer`.

```bash
OP_NODE_IMAGE=us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo8

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
    --rpc.port=9545 \
    --p2p.listen.tcp=9222 \
    --p2p.listen.udp=9222 \
    --p2p.priv.path=/data/op-node_p2p_priv.txt \
    --p2p.static=\
    <TODO>
    --altda.enabled=true \
    --altda.da-server=http://localhost:4242 \
    --altda.da-service=true \
    --altda.verify-on-read=false \
```

If you start op-node before op-geth, it will shut down after a few seconds if it cannot connect to its corresponding op-geth instance. This is normal behavior. It will run successfully once op-geth is running and it can connect to it.

#### Running op-geth

Now, lets move on to the op-geth client. Op-geth will be the execution client for the L2 node. It will be responsible for executing transactions and generating blocks. In terms of resource requirements, it is recommended to run op-geth on a machine with 8 modern cores (amd64 or arm64), at least 8GB of memory and 200GB of storage. Feel free to adjust these values based on your specific requirements (you can use as additional reference [op-geth official documentation](https://docs.optimism.io/builders/node-operators/configuration/execution-config)).

Although there are multiple ways to run op-geth, all options will share most of the same configuration. We will cover how to run op-geth, in general, and then provide specific instructions for each of the three options.

1. To run op-geth, you can use the container image: us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo8. Alternatively, you can clone the [celo-org/op-geth repository](https://github.com/celo-org/op-geth) and build op-geth from source:

```bash
git clone https://github.com/celo-org/op-geth.git
cd op-geth
git checkout celo8
make geth
```

2. Download the genesis file and the rollup config file. Also you need to copy the JWT secret generated in the previous step.

```bash
OP_GETH_DIR=/tmp/alfajores/op-geth
mkdir -p ${OP_GETH_DIR}
wget https://storage.googleapis.com/cel2-rollup-files/alfajores/genesis.json --output-document=${OP_NODE_DIR}/genesis.json

cp ${OP_NODE_DIR}/jwt.txt ${OP_GETH_DIR}/jwt.txt
```

3. Run the container (or the binary if prefered). You can use the following example as a reference.

```bash
OP_GETH_IMAGE=us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo8

docker run -d \
  --name op-geth \
  --network=host \
  -v ${OP_GETH_DIR}:/celo \
  -e GETH_DATADIR=/celo \
  ${OP_GETH_IMAGE}
  geth \
    --datadir=/celo \
    --networkid=44787 \
    --syncmode=snap \
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
    --rollup.sequencerhttp=https://alfajores-sequencer.celo-testnet.org/ \ # TODO
    --rollup.disabletxpoolgossip=true \
    --rollup.halt=major \
    --verbosity=3 \
    --bootnodes=<TODO>
```

#### Option 1: snap sync


:::warning
Snap sync will only work once Alfajores L2 is live.
:::

With snap sync, you can start an L2 node without migrating or downloading the L1 chaindata. It is the easiest way to get started with an L2 node, but it does not support archive nodes. To start an L2 node with snap sync, you need to run op-geth with the `--syncmode=snap` flag.

#### Option 2: download L1 chaindata and get started

:::warning
The migrated chaindata is not yet available for download.
:::

If you choose to download the L1 chaindata, you will need to download the migrated chaindata and run op-geth with the downloaded chaindata. This option is required for nodes running in full or archive mode. In case of an archive node, you can download the migrated chaindata from a L1 fullnode snapshot, and run op-geth with the `--gcmode=archive` flag (it will only keep archive state for L2 blocks). Also, with this option, you can either use `--syncmode=consensus-layer` or `--syncmode=snap` (you will need to have op-node peers to use `--syncmode=consensus-layer` and op-geth peers to use `--syncmode=snap`).

```bash
OP_GETH_DIR=/tmp/alfajores/op-geth

mkdir -p ${OP_GETH_DIR}
wget https://storage.googleapis.com/cel2-rollup-files/alfajores/alfajores-migrated-datadir.tar.zst
tar -xvf alfajores-migrated-datadir.tar.zst -C ${OP_GETH_DIR}
```

#### Option 3: L1 chaindata migration

L1 chaindata is the most involved option, but you can use your own L1 chaindata, not trusting the provided chaindata. 
**Pre-migration**

TODO: download and build migration script from source?

~48 hours before the migration block, node operators need to run a pre-migration script. This script migrates the majority of the chaindata in advance so that the full migration can quickly complete the migration on top of the latest state when the migration block is reached.

1. Create a snapshot of the node's chaindata directory. This is a subdirectory of the node's datadir.
    - Do not run the migration script on a datadir that is actively being used by a node.
    - In order to ensure liveness of the network, please do not stop your node to perform the migration.
    - Make sure you have at least enough disk space to store double the size of the snapshot. As you will be storing both the old and new (migrated) chaindata.
2. Run the pre-migration script.

```bash
celo-migrate pre --old-db /path/to/old/datadir/chaindata --new-db /path/to/new/datadir/chaindata
```

- `old-db` should be the path to the chaindata snapshot.
- `new-db` should be the path where you want the l2 chaindata to be written.
- Please run the pre-migration script at least 24 hours before the migration block so that there is time to troubleshoot any issues.
- Ensure the pre-migration script completes successfully (this should be clear from the logs). If it does not, please reach out for assistance: TODO(discord)
- Keep the `new-db` as is until the full migration script is run. If this data is corrupted or lost, the full migration may fail or take a very long time to complete.

**Full migration**

Your node will stop adding blocks immediately before the block passed as `--l2migrationblock`. That is, the last block added will be `l2migrationblock - 1`, and the first block of the l2 will `l2migrationblock`. When your node stops adding blocks, you may shut it down.

:::danger

Do not run the migration script on a datadir that is actively being used by a node even if it has stopped adding blocks.

:::

1. Run the full migration script

```bash
celo-migrate full \
  --old-db /path/to/old/datadir/chaindata \
  --new-db /path/to/new/datadir/chaindata \
  --deploy-config /path/to/deploy-config.json \
  --l1-deployments /path/to/l1-deployments.json \
  --l1-rpc <ETHEREUM_RPC_URL> \
  --l2-allocs /path/to/l2-allocs.json \
  --outfile.rollup-config /path/to/rollup-config.json \
  --outfile.genesis /path/to/genesis.json
```

- `old-db` should be the path to the chaindata snapshot or the chaindata of your stopped node.
- `new-db` should be the path where you want the l2 chaindata to be written. This should be the same path as in the pre-migration script, otherwise all the work done in the pre-migration will be lost.
- `deploy-config` should be the path to the JSON file that was used for the l1 contracts deployment. This will be distributed by cLabs.
- `l1-deployments` should be the path to the L1 deployments JSON file, which is the output of running the bedrock contracts deployment for the given 'deploy-config'. This will be distributed by cLabs.
- `l1-rpc` should be the rpc url of the L1 node.
- `l2-allocs` should be the path to the JSON file defining necessary state modifications that will be made during the full migration. This will be distributed by cLabs.
- `outfile.rollup-config` should be the path where you want the rollup-config.json file to be written by the migration script. You will need to pass this file when starting the l2 node.
- `outfile.genesis` should be the path where you want the `genesis.json` file to be written by the migration script. Any node wishing to snap sync on the L2 chain will need this file.

- Ensure the full migration script completes successfully (this should be clear from the logs). If it does not, please reach out for assistance.

**Start L2 Node**

- Start the l2 node using the migrated chaindata written to the new-db path.
- TODO Exact command is TBD. Right now we run both op-node and op-geth from source seperately and pass in a bunch of flags to each. We will provide a more user friendly way to start the entire node.

## Mainnet Migration 
<details>
<summary>Process Overview (WIP)</summary>

Note this section is subject to change and intended for illustrative purposes only.

### Stopping the L1 Celo network

A new version of `celo-blockchain` will be released that allows the flag`--l2migrationbock` to be passed, specifying the block number of the first L2 block (i.e. the block immediately after the last block of the Celo network as an L1). Nodes ran with this flag will stop producing, inserting and sharing blocks when the block number before `--l2migrationblock` is inserted.

When this version of `celo-blockchain` is released and a migration block number has been chosen, node operators will be asked to upgrade and pass in the correct block number when restarting their node.

### Starting an L2 node

As is detailed in other parts of this guide, node operators who wish to run an L2 node will have two options.

1. Perform a migration of the l1 chaindata. This option is required for nodes running in full or archive mode and is a more involved process.
2. Start an L2 node with snap sync. This option does not require running the migration script.

The rest of this section applies only to option 1.

### Pre-migration

~48 hours before the migration block, node operators will need to run a pre-migration script. This script migrates the majority of the chaindata in advance so that the full migration can quickly complete the migration on top of the latest state when the migration block is reached. (Method of distributing the migration script is TBD, right now we build and run from source).

1. Create a snapshot of the node's chaindata directory. This is a subdirectory of the node's datadir.
    - Do not run the migration script on a datadir that is actively being used by a node.
    - In order to ensure liveness of the network, please do not stop your node to perform the migration.
    - Make sure you have at least enough disk space to store double the size of the snapshot. As you will be storing both the old and new (migrated) chaindata.
2. Run the pre-migration script.

```bash
celo-migrate pre \
  --old-db /path/to/old/datadir/chaindata \
  --new-db /path/to/new/datadir/chaindata
```

- `old-db` should be the path to the chaindata snapshot.
- `new-db` should be the path where you want the l2 chaindata to be written.
- Please run the pre-migration script at least 24 hours before the migration block so that there is time to trouble shoot any issues.
- Ensure the pre-migration script completes successfully (this should be clear from the logs). If it does not, please reach out for assistance.
- Keep the `new-db` as is until the full migration script is run. If this data is corrupted or lost, the full migration may fail or take a very long time to complete.

### Full migration

Your node will stop adding blocks immediately before the block passed as `--l2migrationblock`. That is, the last block added will be `l2migrationblock - 1`, and the first block of the l2 will `l2migrationblock`. When your node stops adding blocks, you may shut it down.

NOTE: Do not run the migration script on a datadir that is actively being used by a node even if it has stopped adding blocks.

1. Run the full migration script

```bash
celo-migrate full \
  --old-db /path/to/old/datadir/chaindata \
  --new-db /path/to/new/datadir/chaindata \
  --deploy-config /path/to/deploy-config.json \
  --l1-deployments /path/to/l1-deployments.json \
  --l1-rpc <ETHEREUM_RPC_URL> \
  --l2-allocs /path/to/l2-allocs.json \
  --outfile.rollup-config /path/to/rollup-config.json \
  --outfile.genesis /path/to/genesis.json
```

- `old-db` should be the path to the chaindata snapshot or the chaindata of your stopped node.
- `new-db` should be the path where you want the l2 chaindata to be written. This should be the same path as in the pre-migration script, otherwise all the work done in the pre-migration will be lost.
- `deploy-config` should be the path to the JSON file that was used for the l1 contracts deployment. This will be distributed by cLabs.
- `l1-deployments` should be the path to the L1 deployments JSON file, which is the output of running the bedrock contracts deployment for the given 'deploy-config'. This will be distributed by cLabs.
- `l1-rpc` should be the rpc url of the L1 network. For alfajores it must be a [Holesky endpoint](https://chainlist.org/chain/17000).
- `l2-allocs` should be the path to the JSON file defining necessary state modifications that will be made during the full migration. This will be distributed by cLabs.
- `outfile.rollup-config` should be the path where you want the rollup-config.json file to be written by the migration script. You will need to pass this file when starting the l2 node.
- `outfile.genesis` should be the path where you want the `genesis.json` file to be written by the migration script. Any node wishing to snap sync on the L2 chain will need this file.

- Ensure the full migration script completes successfully (this should be clear from the logs). If it does not, please reach out for assistance.

### Start L2 Node

- Start the l2 node using the migrated chaindata written to the new-db path.
- Exact command is TBD. Right now we run both op-node and op-geth from source seperately and pass in a bunch of flags to each. We will provide a more user friendly way to start the entire node.

</details>
