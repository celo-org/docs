# EigenDA v2 Upgrade

This page outlines changes related to the EigenDA v2 upgrade for node operators.

:::info

This page will be kept updated with key information about the upgrade. As this upgrade is activated on the sequencer, no detailed activation times can be given.

- Baklava testnet activation is planned for Wed, Jul 30, 2025.
- Alfajores testnet activation is tentatively planned for Wed, Aug 20, 2025.
- **Mainnet** activation is tentatively planned for Wed, Sep 3, 2025.

:::

## What is the EigenDA v2 upgrade about?

As part of [Celo’s continued growth as an Ethereum L2](https://forum.celo.org/t/celo-as-an-ethereum-l2-a-frontier-chain-for-global-impact/11376), Celo is integrating [EigenDA v2](https://docs.eigencloud.xyz/products/eigenda/releases/blazar), also known as [Blazar](https://docs.eigencloud.xyz/products/eigenda/releases/blazar), to further innovate and strengthen the network’s data availability layer.

Blazar represents a major architectural upgrade to the EigenDA protocol, introducing improved system throughput and stability, alongside new capabilities like permissionless DA payments and enhanced resource throttling.

Most notably for Celo:

- End-to-end confirmation latency is significantly reduced, moving from minutes to near real-time. Blazar’s design enables rollups to reference blocks in their own logic without waiting for L1 confirmations.
- System throughput and network stability are greatly improved through more efficient chunk distribution, optimized request routing, and horizontal scalability of DA nodes.
Support for decentralized dispersal is unlocked by eliminating DDoS attack surfaces inherent in the original push-based mode.

## For node operators

Node operators need to upgrade the EigenDA proxy to version [v1.8.2](https://github.com/layr-labs/eigenda/pkgs/container/eigenda-proxy/437919973?tag=v1.8.2) before the activation date. The version is backwards compatible with EigenDA v1 and can be updated beforehand.
