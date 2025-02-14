# Running a Celo node

This guide is designed to help node operators run a Celo L2 node.
If you want to switch from running a Celo L1 node to a Celo L2 node, please see the [migration guide](migrate-node.md).

## Running a node with docker

To simplify running L2 nodes, Celo has created the
[celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose)
repo with all the necessary configuration files and docker compose templates,
which make it easy to pull network configuration files and launch all the
services needed to run an L2 node.

For node operators interested in using Kubernetes, we recommend using
[Kompose](https://kompose.io) to convert the docker compose template to
Kubernetes helm charts.

:::note

This guide only covers L2 Celo. Currently only the Alfajores testnet has been migrated to become a L2, other networks will not work with this guide.

:::

## Snap sync

1. Pull the latest version of
   [celo-l2-node-docker-compose](https://github.com/celo-org/celo-l2-node-docker-compose)
   and `cd` into the root of the project.
2. Run `cp <network>.env .env` where `<network>` is one of `alfajores`,
   `baklava`, or `mainnet`.
3. Open `.env` and optionally configure any setting you may wish to change, such as setting `NODE_TYPE=archive` to enable archive mode.
4. Run `docker-compose up -d --build`.
5. To check the progress of the node you can run `docker-compose logs -n 50 -f
   op-geth`. This will display the last 50 lines of the logs and follow the logs
   as they are written. In a syncing node, you would expect to see lines of the
   form `Syncing beacon headers  downloaded=...` where the downloaded number is
   increasing and later lines such as `"Syncing: chain download in
   progress","synced":"21.07%"` where the percentage is increasing. Once the
   percentage reaches 100%, the node should be synced.
6. At this point, you should be able to validate the progression of the node by
   fetching the current block number via the RPC API and seeing that it is
   increasing. (Note that until fully synced, the RPC API will return 0 for the
   head block number).

## Building a node from source

Docker images are the easiest way to run an Celo node, but you can always build your own node from source code. You might want to do this if you want to run a node on a specific architecture or if you want to inspect the source code of the node you're running.

The following sections contain all infromation required to set up your node from source.

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
  - [eigenda-proxy](https://ghcr.io/layr-labs/eigenda-proxy:v1.4.4)

#### Baklava

- Container images:
  - [Celo L1 client](https://us-docker.pkg.dev/celo-org/us.gcr.io/geth-all:1.8.8)
  - [op-geth](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo-v2.0.0-rc4)
  - [op-node](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo-v2.0.0-rc4)
  - [eigenda-proxy](https://ghcr.io/layr-labs/eigenda-proxy:v1.4.4)


### Common problems

#### Transactions are not being executed when submitted to a node

If your node is synced but transtransactions submitted to it are not executed, make sure the the `--rollup.sequencerhttp=https://sequencer.alfajores.celo-testnet.org` flag is correctly set.
