---
title: Consensus Introduction
description: Overview of Celo's consensus protocol and network validators.
---

# Consensus

Overview of Celo's consensus protocol and network validators.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Protocol

Celo’s consensus protocol is based on an implementation called Istanbul, or IBFT. IBFT was developed by AMIS and [proposed](https://github.com/ethereum/EIPs/issues/650) as an extension to [go-ethereum](https://github.com/ethereum/go-ethereum) but never merged. Variants of IBFT exist in both the [Quorum](https://github.com/jpmorganchase/quorum) and [Pantheon](https://github.com/PegaSysEng/pantheon) clients. We’ve modified Istanbul to bring it up to date with the latest [go-ethereum](https://github.com/ethereum/go-ethereum) releases and we’re fixing [correctness and liveness issues](https://arxiv.org/abs/1901.07160) and improving its scalability and security.

## Finality

Blocks in IBFT protocol are final, which means that there are no forks and any valid block must be somewhere in the main chain. The only way to revert a block would be to utilise social coordination to get all participants to manually revert the block.

## Validators

Celo’s consensus protocol is performed by nodes that are selected as validators. There is a maximum cap on the number of active validators that can be changed by governance proposal, which is currently set at 110 validators. The active validator set is determined via the proof-of-stake process and is updated at the end of each epoch, a fixed period of approximately one day.
