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

In addition to the blockchain client, some core components of the Celo protocol are implemented at the smart contract level and even off-chain (e.g. phone number verification via SMS).

## Protocol Upgrades

There are a number of substantial changes and additions have been made in service of Celo's product goals, including the following:

- [Consensus](/protocol/consensus)
- [Governance](/protocol/governance)
- [Stability Mechanism](/protocol/stability)
- [Transactions](/protocol/transaction)
- [Identity](/protocol/identity)
