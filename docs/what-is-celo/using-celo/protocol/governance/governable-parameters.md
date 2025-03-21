---
title: Celo Governance Cheat Sheet
description: List of governable parameters and governance restrictions on Celo.
---

# Governance Cheat Sheet

List of governable parameters and governance restrictions on Celo.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Governable Parameters

- The stability protocol, including the exchange
- What the protocol does with data feeds from Oracles
- Adding or removing Mento stablecoins
- Whitelisting Mento stablecoins (or other ERC20s) for use in paying gas fees
- The identity protocol, including how phone number attestations works
- Linking of signers and off-chain metadata (e.g claims) to accounts
- Most of Proof of Stake protocol, including elections, locked gold, slashing parameters
- On-chain governance itself
- MinimumClientVersion
- BlockGasLimit
- IntrinsicGasForAlternativeFeeCurrency

## Things That Can't Be Modified By Governance

- The protocol by which nodes communicate
- The format of block headers, block bodies, the fields in transactions, etc
- How nodes sync
- How nodes store their data locally
- Most parameters that affect the blockchain