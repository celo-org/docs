---
title: Architecture
description: Overview of the Celo Stack including it's blockchain, core contracts, and applications.
---

# Architecture

Overview of the Celo Stack, including its blockchain, core contracts, and applications.

---

## Introduction to the Celo Stack

Celo is oriented around providing the simplest possible experience for end-users, who may have no familiarity with cryptocurrencies and may be using low-cost devices with limited connectivity.

## A Full-Stack Approach

To achieve this, Celo takes a full-stack approach, where each layer of the stack is designed with the end-user in mind while considering other stakeholders (e.g. operators of nodes in the network) involved in enabling the end-user experience.

![](https://storage.googleapis.com/celo-website/docs/full-stack-diagram.jpg)

## Celo Blockchain

An open cryptographic protocol that allows applications to make transactions with and run smart contracts in a secure and decentralized fashion. The Celo blockchain code has shared ancestry with[ Ethereum](https://www.ethereum.org/) and maintains full EVM compatibility for smart contracts. However, it uses a[ Byzantine Fault Tolerant](http://pmg.csail.mit.edu/papers/osdi99.pdf) (BFT) consensus mechanism (Proof-of-Stake) rather than Proof-of-Work and has different block formats, transaction formats, client synchronization protocols, and gas payment and pricing mechanisms.

## Celo Core Contracts

A set of smart contracts running on the Celo blockchain that comprise much of the logic of the platform features including ERC-20 stable currencies, identity attestations, proof-of-stake, and governance. These smart contracts are upgradeable and managed by the decentralized governance process.

## Applications

Applications for end users built on the Celo Platform. The Celo Wallet app, the first of an ecosystem of applications, allows end-users to manage accounts and make payments securely and simply by taking advantage of the innovations in the Celo Protocol. Applications take the form of external mobile or backend software: they interact with the Celo blockchain to issue transactions and invoke code that forms the Celo Core Contracts’ API. Third parties can also deploy custom smart contracts that their own applications can invoke, which in turn can leverage Celo Core Contracts. Applications may use centralized cloud services to provide some of their functionality: in the case of the Celo Wallet, push notifications, and a transaction activity feed.

The Celo blockchain and Celo Core Contracts together comprise the Celo Protocol.

## Celo Network Topology

The topology of a Celo network consists of machines running the Celo blockchain software in several distinct configurations:

![](https://storage.googleapis.com/celo-website/docs/network.png)

## Validators

Validators gather transactions received from other nodes and execute any associated smart contracts to form new blocks, then participate in a Byzantine Fault Tolerant (BFT) consensus protocol to advance the state of the network. Since BFT protocols can scale only to a few hundred participants and can tolerate at most a third of the participants acting maliciously, a proof-of-stake mechanism admits only a limited set of nodes to this role.

## Full Nodes

Most machines running the Celo blockchain software are either not configured to be, or not elected as, validators. Celo nodes do not do "mining" as in Proof-of-Work networks. Their primary role is to serve requests from light clients and forward their transactions, for which they receive the fees associated with those transactions. These payments create a ‘permissionless onramp’ for individuals in the community to earn currency. Full nodes maintain at least a partial history of the blockchain by transferring new blocks between themselves and can join or leave the network at any time.

## Light Clients

Applications including the Celo Wallet will also run on each user's device an instance of the Celo blockchain software operating as a ‘light client’. Light clients connect to full nodes to make requests for account and transaction data and to sign and submit new transactions, but they do not receive or retain the full state of the blockchain.

## Celo Wallet

The Celo Wallet application is a fully unmanaged wallet that allows users self custody of their funds, using their own keys and accounts. All critical features such as sending transactions and checking balances can be done in a trustless manner using the peer-to-peer light client protocol. However, the wallet does use a few centralized cloud services to improve the user experience where possible, e.g.:

- **Google Play Services:** to pre-load invitations in the app
- **Celo Wallet Notification Service:** sends device push notifications when a user receives a payment or requests for payment
- **Celo Wallet Blockchain API:** provides a GraphQL API to query transactions on the blockchain on a per-account basis, used to implement a user's activity feed.

When end-users download the Celo Wallet from, for example, the Google Play Store, users are trusting both cLabs (or the entity that has made the application available in the Play Store) and Google to deliver a correct binary, and most users would feel that relying on these centralized services to provide this additional functionality is worthwhile.
