---
title: Validator Set Differences
description: How validator sets are elected and managed with the Celo protocol.
---

# Validator Set Differences

How validator sets are elected and managed with the Celo protocol.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Computing Set Differences

The validator set for a given epoch is elected at the end of the last block of the previous epoch. The new validator set is written to the **extradata** field of the header for this block. As an optimization, the validator set is encoded as the difference between the new and previous validator sets. Nodes that join the network are able to compute the validator set for the current epoch by starting with the initial validator set \(encoded in the genesis block\) and iteratively applying these diffs.
