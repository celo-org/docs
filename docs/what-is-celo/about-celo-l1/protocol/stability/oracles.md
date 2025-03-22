---
title: Oracles
description: How the SortedOracles smart contract uses governance to collect reports and maintain the oraclized rate or the Celo dollar.
---

# Oracles

How the **SortedOracles** smart contract uses governance to collect reports and maintain the oraclized rate or the Celo dollar.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## SortedOracles Smart Contract

As mentioned in the previous section, the stability mechanism needs to know the market price of CELO with respect to the US dollar. This value is made available on-chain in the [SortedOracles smart contract](https://github.com/celo-org/celo-monorepo/blob/master/packages/what-is-celo/about-celo-l1/protocol/contracts/stability/SortedOracles.sol).

## Collecting Reports

Through governance, a whitelist of reporters is selected. These addresses are allowed to make reports to the SortedOracles smart contract. The smart contract keeps a list of most recent reports from each reporter. To make it difficult for a dishonest reporter to manipulate the oraclized rate, the official value of the oracle is taken to be the _median_ of this list.

## Maintaining Oracle Values

To ensure the oracle's value doesn't go stale due to inactive reporters, any reports that are too old can be removed from the list. "Too old" here is defined based on a protocol parameter that can be modified via governance.

## Celo-Oracle Repository

You can find more information about the technical specification of the Celo Oracles feeding data to the reserve in the [GitHub repository here](https://github.com/celo-org/celo-oracle).
