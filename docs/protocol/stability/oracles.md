---
title: Oracles
description: How the SortedOracles smart contract uses governance to collect reports and maintain the oraclized rate or the Celo dollar.
---

# Oracles

How the **SortedOracles** smart contract uses governance to collect reports and maintain the oraclized rate or the Celo dollar.

---

## SortedOracles Smart Contract

As mentioned in the previous section, the stability mechanism needs to know the market price of CELO with respect to the US dollar. This value is made available on-chain in the [SortedOracles smart contract](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/stability/SortedOracles.sol).

## Collecting Reports

Through governance, a whitelist of reporters is selected. These addresses are allowed to make reports to the SortedOracles smart contract. The smart contract keeps a list of most recent reports from each reporter. To make it difficult for a dishonest reporter to manipulate the oraclized rate, the official value of the oracle is taken to be the _median_ of this list.

## Maintaining Oracle Values

To ensure the oracle's value doesn't go stale due to inactive reporters, any reports that are too old can be removed from the list. "Too old" here is defined based on a protocol parameter that can be modified via governance.

## Celo-Oracle Repository

You can find more information about the technical specification of the Celo Oracles feeding data to the reserve in the [GitHub repository here](https://github.com/celo-org/celo-oracle).
