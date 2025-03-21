---
title: Celo Native Currency
description: Introduction to CELO and its compliance to the ERC20 standard.
---

# Native Currency

Introduction to CELO and its compliance to the ERC20 standard.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## What is CELO?

The native currency in the Celo protocol, CELO, conforms to the ERC20 interface. This is made possible by way of a permissioned “Transfer” precompile, which only the CELO ERC20 smart contract can call. The address of the contract exposing this interface can be looked up via the Registry smart contract, and has the “GoldToken” identifier.

:::tip note

As the native currency of the protocol, CELO, much like Ether, can still be sent directly via transactions by specifying a non-zero “value”, bypassing the ERC20 interface.

:::
