---
title: Ultralight Node Sync
description: How Ultralight Node sync works with the Celo wallet.
---

# Ultralight Node Sync

How Ultralight Node sync works with the Celo wallet.

---

## Fetch Headers

The Celo Wallet first fetches the latest header to learn about the likely latest block height. Next, it fetches all the _epoch headers_ between Genesis and the latest block height. The fetch is done in batches of 192 blocks \(Ethereum's default batch size\) to minimize latency. In Celo's case, each of these headers are not contiguous and are instead one epoch apart \(planned for around 1 day for mainnet\).

## Validate Headers

The wallet then validates each of the epoch headers by updating the set of validators at every epoch, and using that set to verify signatures. Once the wallet has reached the latest epoch, it can verify the signatures of all header in that epoch, including the latest one.

## Fetch Blocks

Once the latest header is verified, all the block from that point onwards are fetched. When the app restarts, only the epoch blocks between the last fetched block and the latest header are fetched.

:::tip note

In the future, Celo will support zk-SNARK-based proofs that can succinctly prove this sequence of steps, which will lower the sync times and data usage even more.

:::
