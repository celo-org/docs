# Preparing for the L2 migration

This page outlines breaking changes related to the Celo L2 migration. This migration requires changes by node operators on the different Celo networks.

:::info
This page will be updated continuously with information on upgrade runbooks and timelines as they come.

* The Alfajores testnet has been migrated on block **26384000**, September 26, 2024.
* The Baklava testnet has been migrated on block **28308600**, February 20, 2025.
* Mainnet will be migrated on block **31056500**, March 25, 2025.

:::

## For node operators

Node operators will need to upgrade to the respective releases before the activation dates and migrate their state database. See the [Node Operator Guide](../operators/overview.md) for detailed information.

The hardfork is scheduled for the following block on each network.

### Alfajores testnet

* Block number: `26384000`
* Date: September 26, 2024
* Minimum `celo-blockchain` version: [v1.8.7](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.7)
* `op-geth`: [celo-v2.0.0-rc4](https://github.com/celo-org/op-geth/releases/tag/celo-v2.0.0-rc4)
* `op-node`: [celo-v2.0.0-rc4](https://github.com/celo-org/optimism/releases/tag/celo-v2.0.0-rc4)

### Baklava testnet

* Block number: `28308600`
* Date: February 20, 2025
* Minimum `celo-blockchain` version: [v1.8.8](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.8)
* `op-geth`: [celo-v2.0.0-rc4](https://github.com/celo-org/op-geth/releases/tag/celo-v2.0.0-rc4)
* `op-node`: [celo-v2.0.0-rc4](https://github.com/celo-org/optimism/releases/tag/celo-v2.0.0-rc4)

### Mainnet

* Block number: `31056500`
* Date: March 25, 2025
* Final client versions following soon!