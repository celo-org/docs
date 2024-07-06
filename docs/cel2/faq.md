---
title: Cel2 FAQ
description: Frequently Asked Questions about Cel2
---

## Dango Testnet

### How do I run a node or upgrade an existing node?

- [Celo L1 → Celo L2 Operator Guide](https://specs.celo.org/l2_operator_guide.html) and related assets:
  - [Full migrated chaindata](https://storage.googleapis.com/cel2-rollup-files/dango/dango-migrated-datadir.tar.zst)
  - [Rollup deploy config](https://storage.googleapis.com/cel2-rollup-files/dango/config.json)
  - [L1 contract addresses](https://storage.googleapis.com/cel2-rollup-files/dango/deployment-l1.json)
  - [rollup.json](https://storage.googleapis.com/cel2-rollup-files/dango/rollup.json)
  - [Genesis](https://storage.googleapis.com/cel2-rollup-files/dango/genesis.json) used for snap syncing
- Container images:
  - [op-geth](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-geth:badaf7f297762fbda117bc654b744e74a0ad6fe1)
  - [op-node](https://us-west1-docker.pkg.dev/devopsre/celo-blockchain-public/op-node:42f2a5bbb7218c0828a996c48ad6bceb1e5f561a)
- p2p peers:
  - op-geth bootnode/peers, to be used with op-geth `--botnodes` flag:

    ```text
    enode://db225c1c772cda4c313579727e40ef45e271a576398924da999cc0554caee9da70d866a7dfe8ec3da4dcb01980a8190f119d2bde36793dd5f2a761ab4841b31a@34.168.4.176:30303
    enode://7750fb792f0be398604365c9deaac7301fc248471a0967fdbc80edf89c3c5f78dbff99880e6a3c9c0649f6fed6b64951fcf15ac3530e951c57d3cf0bf48e8c92@34.127.40.210:30303
    enode://869a952220e1f55cbf3156d2d73c977f5e63c7b7d8a7ea2856df817c10e755b5925db9daf006de7a28f6503c3fc073db647fb32da94a64ad0204863df2d63238@35.247.10.212:30303
    enode://002f1d81020650e475bb8e6487268403fbc08c9c2a669cea4a677624a708fd0120d6da49164ba44c57f4570ddd847d79038b746b2254fb16b720630b2ff7c240@34.82.47.120:30303
    ```

  - op-node static peers, to be used with op-node `--p2p.static` flag:

    ```text
    /ip4/34.19.9.48/tcp/9222/p2p/16Uiu2HAmM4Waw3Qmw9eFjvLbPzNUSaNvdD91RzodwxDzTXCM3Rp1
    /ip4/34.83.14.89/tcp/9222/p2p/16Uiu2HAkwGzuYEzVY7CXoN44BnfUiZWe92TMU1dJesbAi4CYGQFS
    /ip4/34.19.27.0/tcp/9222/p2p/16Uiu2HAmSf7FE4FXCy6ks5VPjX2Vdo21N9H3PQk7H7T8HbDMqEB8
    /ip4/34.82.212.175/tcp/9222/p2p/16Uiu2HAm2xo9mPhbMW9eAzjLMjp6JFEa1gijWu2CsBpWEqVWh7Kg
    ```

### Can I use an RPC endpoint?

- Ethereum JSON-RPC endpoint: [https://forno.dango.celo-testnet.org/](https://forno.dango.celo-testnet.org/) (op-geth kind)
- OP RPC endpoint: [https://op.dango.celo-testnet.org/](https://op.dango.celo-testnet.org/) (op-node kind)

### Is there a faucet? Where? How do I get funds?

Faucet: [https://faucet.celo.org/dango](https://faucet.celo.org/dango)

### Is there an explorer?

Blockscout Explorer: [https://celo-dango.blockscout.com/](https://celo-dango.blockscout.com/)

### How can I use the native bridge?

Through the Superbridge UI: [https://superbridge.app/celo-testnet](https://superbridge.app/celo-testnet) or [https://testnets.superbridge.app/celo-testnet](https://testnets.superbridge.app/celo-testnet).

## Dango and Alfajores Testnets

### What’s the difference between Dango and Alfajores?

Alfajores is the first testnet of the Celo L1 blockchain, [launched in July 2019](https://blog.celo.org/introducing-alfajores-1b162ebcb44d). Fore more details, refer to the [Alfajores Testnet documentation](https://docs.celo.org/network/alfajores).

Dango is the first testnet of the Celo L2 blockchain, launched in July 2024.
It implements the specifications detailed in [Cel2 Specification](https://specs.celo.org/root.html) while preserving the original Alfajores history and state.
For more details, refer to [L1→L2 Migration Changes](https://specs.celo.org/l2_migration.html).

Dango diverged from Alfajores L1 at block [24940100](https://celo-alfajores.blockscout.com/block/0xc0e521a7b7326064ec12f51449de16d3218de161335daaa4ae8bbed1790b4a6c).

### I noticed you used the same chainID for Alfajores and Dango. Isn't that dangerous?

Good catch! Yes, we're using the same chain ID for both Alfajors and Dango. This means that transactions from one testnet can be executed on the other testnet as well. But as both networks are testnets, this is not a problem.

### Are there any address changes between Alfajores and Dango?

No, all contracts stay at their place. For more information about the migration see the [migration docs](https://specs.celo.org/l2_migration.html).

### Is there anything that used to work on Alfajores that doesn’t anymore?

See [L1→L2 Migration Changes](https://specs.celo.org/l2_migration.html).

## Celo L2 setup

### How is the Celo L2 different to Optimism?

See [Celo L2 Specification](https://specs.celo.org/root.html).

### What are the costs for L1 data and how are they payed?

For the testnet L1 data fees are covered by us.

### I saw EigenDA mentioned, is it used?

Yes! See [EigenDA](https://specs.celo.org/eigenda.html).

### What's the block time?

The block period is two seconds.

### What's the throughput?

The gas limit per block is 30 million. The Dango testnet has a throughput of 15M gas/s.

## What happened to these features?

- CELO token duality? supported, see [Token Duality](https://specs.celo.org/token_duality.html)
- fee currencies? supported, see [Fee Abstraction](https://specs.celo.org/fee_abstraction.html)
- epoch rewards? no longer supported, see [L2 CELO Distribution Schedule](https://specs.celo.org/l2_migration.html#l2-celo-distribution-schedule)
