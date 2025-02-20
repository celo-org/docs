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

This guide only covers L2 Celo. Currently only the Alfajores and Baklava testnets have been migrated to become a L2.

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
  - [eigenda-proxy](https://ghcr.io/layr-labs/eigenda-proxy:v1.6.4)

#### Baklava

- [Final Celo L1 chaindata](https://storage.googleapis.com/cel2-rollup-files/baklava/baklava-l1-final.tar.zstd)
- [Full migrated chaindata](https://storage.googleapis.com/cel2-rollup-files/baklava/baklava-migrated-datadir.tar.zstd)
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

If your node is synced but transtransactions submitted to it are not executed, make sure the the `--rollup.sequencerhttp=https://sequencer.alfajores.celo-testnet.org` flag is correctly set.

#### Self-hosted public RPC does not retrieve transactions by hash

If you are hosting a public RPC node, please make sure the flag `--history.transactions` is set to 0 in op-geth (i.e. `--history.transactions=0`), so all transactions are indexed. Otherwise, transactions will not be retrievable by hash.
