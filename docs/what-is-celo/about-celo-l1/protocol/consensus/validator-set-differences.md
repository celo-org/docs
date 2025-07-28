---
title: Validator Set Differences
description: How validator sets are elected and managed with the Celo protocol.
---

# Validator Set Differences

How validator sets are elected and managed with the Celo protocol.

:::warning
This page describes the historical Celo Layer 1 blockchain. It is useful for understanding Celo’s history, but does not reflect the current state of the network. As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo has transitioned to an Ethereum Layer 2.
:::

---

## Computing Set Differences

The validator set for a given epoch is elected at the end of the last block of the previous epoch. The new validator set is written to the **extradata** field of the header for this block. As an optimization, the validator set is encoded as the difference between the new and previous validator sets. Nodes that join the network are able to compute the validator set for the current epoch by starting with the initial validator set \(encoded in the genesis block\) and iteratively applying these diffs.
