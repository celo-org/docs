---
title: Celo Protocol
description: Introduction to the Celo protocol, its implementation, and its relationship to Ethereum.
---

import PageRef from '@components/PageRef'

# Celo Protocol

Introduction to the Celo protocol, its implementation, and its relationship to Ethereum.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## What is the Celo Protocol?

Celo's blockchain reference implementation is based on go-ethereum, the Go implementation of the Ethereum protocol. The project team is indebted to the Geth community for providing these shoulders to stand on and, while recognizing that Ethereum is an independent project with its own trajectory, hopes to contribute changes where it makes sense to do so.

In addition to the blockchain client, there are some core components of the Celo protocol that are implemented at the smart contract level and even off-chain (e.g. phone number verification via SMS). Some of these core components have become their own protocol, e.g. Mento and Self.

## Protocol Upgrades

There are a number of substantial changes and additions have been made in service of Celo's product goals, including the following:

- [Consensus](/what-is-celo/about-celo-l1/protocol/consensus)
- [Governance](/what-is-celo/using-celo/protocol/governance/overview/)
- [Stability Mechanism - Mento](https://www.mento.org/)
- [Transactions](/what-is-celo/about-celo-l1/protocol/transaction)
- [Identity - Self](https://self.xyz/)