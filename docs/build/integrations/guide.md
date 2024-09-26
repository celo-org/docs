---
title: Celo Protocol Integration Guide
description: Comprehensive guide for applications building and integrating on Celo.
---

# Celo Protocol Integration Guide

A comprehensive guide for applications building and integrating on Celo.

---

## General Guidelines

### Address Handling

Celo addresses are identical to Ethereum addresses. When displaying and requesting user-inputted addresses, ensure to use and validate address checksums following the [EIP55 standard](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md) to detect typos.

For core smart contracts, developers are encouraged to use the Registry to reference contracts, allowing for potential repointing via Governance.

## Custodian/Exchange Integration

For detailed information, refer to [Custody](/integration/custody). Below is a summary:

### Transfer Detection

Stable-value currencies, cUSD and cEUR, are represented by `StableToken` and `StableTokenEUR` contracts, accessible via the ERC20 interface. The native asset CELO can be accessed via the `GoldToken` ERC20 interface or natively, similar to ETH on Ethereum.

Contract addresses can be found by querying the [registry](/developer/contractkit/contracts-wrappers-registry) or in the [Listing Guide](/integration/listings).

### Proof of Stake Participation

Users may participate in Celo's Proof of Stake system to help secure the network and earn rewards.

### Authorized Signers

Celo's core smart contracts use the `Accounts` abstraction, allowing balance-moving keys to be held in cold storage, while other keys can be authorized to vote and held in warm storage or online.

### Release Gold Contract

The `ReleaseGold` smart contract, which is audited, allows for the scheduled release of CELO to users.

## Wallet Integration

These guidelines apply to any application that manages keys and allows users to interact and transfer value on the Celo platform.

### Key Derivation

Celo wallets should follow [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) for deriving private keys from [BIP39 mnemonics](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki). Celo's key derivation path is `m/44'/52752'/0'/0`. The first key is typically the `account key` for balance transfers, while the second key can be derived as the `dataEncryptionKey` for encrypting information.

### Identity Protocol

Celo has a [lightweight identity protocol](/protocol/identity) that allows users to address each other via phone numbers. To protect user privacy, Celo wallets should implement the [Phone Number Privacy protocol](/protocol/identity/odis-use-case-phone-number-privacy) to prevent large-scale harvesting of phone numbers.

### Wallet Address Management

When transferring assets, wallets should check the receiving account's `walletAddress`. Smart contract accounts may have different recovery characteristics but receive funds at a different address. A `walletAddress` of `0x0` indicates that a different mechanism is required to acquire the `walletAddress`.

### Transaction Metadata

cUSD (StableToken) includes an additional method, `transferWithComment`, allowing senders to specify a comment. Celo wallets should support this feature and encrypt comments to the `dataEncryptionKey` when applicable.

## Validator Group Explorers

[Validator Group Explorers](/holder/vote/validator#validator-explorers) are essential to Celo's Proof of Stake system. Explorers should consider the following standards to ensure a consistent experience:

### Account Names

All Celo accounts on `Accounts.sol` can claim any name. Explorers should display these names while being aware of potential fraud.

### Identity Claims

Celo accounts can claim existing identities, some of which are verifiable (e.g., Domain Names, Keybase profiles). Explorers should display these identities to reduce impersonation risks.

### Performance Metrics

Validator Groups and their validators may perform differently. Explorers should reflect this to help voters choose an optimal validator set. While uptime (block signatures) affects rewards, explorers should also display [other metrics](/holder/vote/validator#choosing-a-validator-group) that impact the Celo ecosystem's success, such as performance in the identity protocol.
