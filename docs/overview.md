---
title: Celo Platform
description: Overview of the Celo platform and it's relationship to the Ethereum blockchain.
id: overview
---

# Celo Platform

Overview of the Celo platform and it's relationship to the Ethereum blockchain.

---

## What is the Celo Platform?

Celo is a complete stack of new blockchain software, core libraries that run on that blockchain, and end-user applications including a Wallet app that communicate with that logic.

### Blockchain

A **blockchain** or **cryptographic network** is a broad term used to describe a database maintained by a distributed set of computers that do not share a trust relationship or common ownership. This arrangement is referred to as **decentralized**. The content of a blockchain's database, or **ledger**, is authenticated using cryptographic techniques, preventing its contents from being added to, edited or removed except according to a protocol operated by the network as a whole.

The code of the Celo Blockchain has shared ancestry with [Ethereum](https://www.ethereum.org), blockchain software for building general-purpose decentralized applications. Celo differs from Ethereum in several important areas as described in the following sections. However, it inherits a number of key concepts.

## Smart Contracts

Ethereum applications are built using **smart contracts**. Smart contracts are programs written in languages like [Solidity](https://solidity.readthedocs.io/en/v0.5.10/) that produce bytecode for the **Ethereum Virtual Machine** or **EVM**, a runtime environment. Programs encoded in smart contracts receive messages and manipulate the blockchain ledger and are termed **on-chain**.

## Cryptocurrency

Celo has a native unit of accounting, the cryptocurrency **CELO**, comparable to Ether on Ethereum. Celo's ledger consists of **accounts**, identified by an **address**. There are two types of accounts. **Externally owned accounts** have an associated CELO balance and are controlled by a user holding the associated public-private keypair. **Contract accounts** contain the code and data of a single smart contract which can be called and manipulate its own stored data.

**ERC-20** is a standard interface for implementing cryptocurrencies or **tokens** as contracts, rather than via account balances. For additional information on this, see [Celo for Ethereum Developers](https://docs.celo.org/developer-guide/celo-for-eth-devs). In Celo, CELO has a duality as both the native currency and an ERC-20 compliant token on the Celo blockchain.

:::warning

Celo assets exist on an independent blockchain, and cannot be accessed through wallets that connect to the Ethereum network. Only use wallets designed to work with the Celo network. Do **not** send your Celo assets to your Ethereum wallet or send your Ethereum assets to your Celo wallet.

:::

## Transactions

Users interact with the blockchain by creating signed **transactions.** These are requests to make a change to the ledger.

**Transactions can complete the following actions**

- Transfer value between accounts
- Execute a function in a smart contract and pass in arguments
- Create a new smart contract

## Blocks

The blockchain is updated by a protocol that takes the current state of the ledger, applies a number of transactions in turn, each of which may execute code and result in updates to the global state. This creates a new **block** that consists of a **header**, identifying the previous block and other metadata, and a data structure that describes the new state.

## Transaction Fees

To avoid Denial-of-Service attacks and ensure termination of calls to smart contract code, the account sending a transaction pays **transaction fees** for its execution steps using its own balance. Transactions specify a **maximum gas** which bounds the steps of execution before a transaction is reverted. A **gas price** determines the unit price for each step, and is used to prioritize which transactions the network applies. \(In Celo transaction fees can be paid in ERC-20 currencies and gas pricing works differently from Ethereum\).

## Learn more

For a more in depth explanation of Ethereum, see the [Ethereum White Paper](https://github.com/ethereum/wiki/wiki/White-Paper) or [documentation](http://ethdocs.org/en/latest/introduction/what-is-ethereum.html#learn-about-ethereum).
