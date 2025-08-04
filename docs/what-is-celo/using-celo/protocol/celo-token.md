---
title: Celo Token
description: Introduction to CELO and its compliance to the ERC20 standard.
---

# Celo Token

Introduction to CELO and its compliance to the ERC20 standard.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

# CELO Token Duality

The CELO token is unique in its ability to function as both a native token and an ERC-20 compatible token.

## What is Token Duality?

Token duality means that **CELO functions both as the native currency of the Celo blockchain and as an ERC-20 compatible token**. This enables CELO tokens to be transferred in two ways:

1. **Native transfers**, similar to how ETH is transferred on Ethereum.
2. **ERC-20 transfers**, using the standard ERC-20 interface.

Regardless of the transfer method, CELO tokens **reflect in both the native account balance and the ERC-20 balance**. Unlike ETH/WETH, there is **no need for wrapping or unwrapping**.

---

## Implementation Details

### **Native Transfers and Balances**
- Native transfers and balance storage work exactly as they do on Ethereum.
- The CELO ERC-20 contract **reads native balances** and triggers native transfers via its ERC-20 interface.

### **Reading Balances via ERC-20**
- The ERC-20 implementation does **not** store balances in contract storage.
- Instead, `balanceOf(address)` directly returns the **native balance**, ensuring consistency across both transfer types.

### **Transfers via ERC-20**
- The `transfer` and `transferFrom` functions do **not** modify contract storage.
- Instead, these functions **initiate a native transfer**.
- Since Ethereum does not support native transfers from smart contracts, **Celo introduces a transfer precompile** to handle this. This precompile can only be called by the CELO token.

---

By enabling seamless interoperability between native and ERC-20 transactions, **CELO remains highly flexible within the Ethereum and Celo ecosystems** without requiring additional conversion steps.

