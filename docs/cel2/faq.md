---
title: Cel2 FAQ
description: Frequently Asked Questions about Cel2
---

### How do I run a node or upgrade an existing node?

See the [L2 Migration Guide](/docs/cel2/l2-operator-guide.md).

For Alfajores, here are the related assets:
- [Full migrated chaindata](https://storage.googleapis.com/cel2-rollup-files/alfajores/alfajores-migrated-datadir.tar.zst)
- [Rollup deploy config](https://storage.googleapis.com/cel2-rollup-files/alfajores/config.json)
- [L1 contract addresses](https://storage.googleapis.com/cel2-rollup-files/alfajores/deployment-l1.json)
- [L2 allocs](https://storage.googleapis.com/cel2-rollup-files/alfajores/l2-allocs.json)
- [rollup.json](https://storage.googleapis.com/cel2-rollup-files/alfajores/rollup.json)
- [Genesis](https://storage.googleapis.com/cel2-rollup-files/alfajores/genesis.json) used for snap syncing
- Container images:
  - [op-geth](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:celo8)
  - [op-node](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:celo9)
  - [eigenda-proxy](https://ghcr.io/layr-labs/eigenda-proxy:v1.4.1)
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

### Can I use an RPC endpoint with Alfajores?

- Ethereum JSON-RPC endpoint: [https://forno.alfajores.celo-testnet.org/](https://alfajores-forno.celo-testnet.org) (op-geth kind)
- OP RPC endpoint: [https://op.alfajores.celo-testnet.org/](https://op.alfajores.celo-testnet.org/) (op-node kind)

### Is there an Alfajores faucet? Where? How do I get funds?

Faucet: [https://faucet.celo.org/alfajores](https://faucet.celo.org/alfajores)

### Is there an Alfajores explorer?

Blockscout Explorer: [https://celo-alfajores.blockscout.com/](https://celo-alfajores.blockscout.com/)

### How can I use the native bridge with Alfajores?

Through the Superbridge UI: [https://superbridge.app/celo-testnet](https://superbridge.app/celo-testnet) or [https://testnets.superbridge.app/celo-testnet](https://testnets.superbridge.app/celo-testnet).

### What’s the difference between Dango and Alfajores?

Alfajores is the first testnet of the Celo L1 blockchain, [launched in July 2019](https://blog.celo.org/introducing-alfajores-1b162ebcb44d). It was upgraded to L2 in September 2024. For more details, refer to the [Alfajores Testnet documentation](https://docs.celo.org/network/alfajores).

Dango is the first testnet of the Celo L2 blockchain, launched in July 2024.
It implements the specifications detailed in [Cel2 Specification](https://specs.celo.org/root.html) while preserving the original Alfajores history and state.
For more details, refer to [L1→L2 Migration Changes](https://specs.celo.org/l2_migration.html).

Dango diverged from Alfajores L1 at block [24940100](https://celo-alfajores.blockscout.com/block/0xc0e521a7b7326064ec12f51449de16d3218de161335daaa4ae8bbed1790b4a6c).

### I noticed you used the same chainID for Alfajores and Dango. Isn't that dangerous?

Good catch! Yes, we're using the same chain ID for both Alfajores and Dango. This means that transactions from one testnet can be executed on the other testnet as well. But as both networks are testnets, this is not a problem. Furthermore, Dango is set to go away in fall 2024.

### Are there any address changes between Alfajores and Dango?

No, all contracts stay at their place. For more information about the migration, see the [migration docs](https://specs.celo.org/l2_migration.html).

### Is there anything that used to work on Alfajores that doesn’t anymore?

See [L1→L2 Migration Changes](https://specs.celo.org/l2_migration.html).

## Celo L2 setup

### How is the Celo L2 different to Optimism?

See [Celo L2 Specification](https://specs.celo.org/root.html).

### What are the costs for L1 data and how are they paid?

For the testnet L1 data fees are covered by us.

### I saw EigenDA mentioned, is it used?

Yes! See [EigenDA](https://specs.celo.org/eigenda.html).

### What's the block time?

The block period is 1 second.

### What's the throughput?

The gas limit per block is 30 million. The Alfajores testnet has a throughput of 30M gas/s.
For more details, see the [Alfajores specifications](https://specs.celo.org/root.html#alfajores).

## What happened to these features?

- CELO token duality? Supported, see [Token Duality](https://specs.celo.org/token_duality.html)
- Fee currencies? Supported, see [Fee Abstraction](https://specs.celo.org/fee_abstraction.html)
- Epoch rewards? Not supported in Dango, but will be supported in Alfajores and Mainnet

## Not sure what you need to do?

Check out the [L2 Migration decision tree](/docs/cel2/decision-tree.md).
