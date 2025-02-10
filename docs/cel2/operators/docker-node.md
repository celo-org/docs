# Run a Celo node

This guide is designed to help node operators run a Celo L2 node.
If you want to switch from running a Celo L1 node to a Celo L2 node, please see the [migration guide](migrate-node.md).

---

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
