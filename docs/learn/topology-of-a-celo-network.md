---
title: Celo Network Topology
description: Introduction to the Celo Network's topology including validators, full nodes, light clients, and wallets.
---

# Topology of a Celo Network

Introduction to the Celo Network's topology including validators, full nodes, light clients, and wallets.

---

## What is the Celo Network Topology?

The topology of a Celo network consists of machines running the Celo blockchain software in several distinct configurations:

![](https://storage.googleapis.com/celo-website/docs/network.png)

## Validators

Validators gather transactions received from other nodes and execute any associated smart contracts to form new blocks, then participate in a Byzantine Fault Tolerant (BFT) consensus protocol to advance the state of the network. Since BFT protocols can scale only to a few hundred participants and can tolerate at most a third of the participants acting maliciously, a proof-of-stake mechanism admits only a limited set of nodes to this role.

## Full Nodes

Most machines running the Celo blockchain software are either not configured to be, or not elected as, validators. Celo nodes do not do "mining" as in Proof-of-Work networks. Their primary role is to serve requests from light clients and forward their transactions, for which they receive the fees associated with those transactions. These payments create a ‘permissionless onramp’ for individuals in the community to earn currency. Full nodes maintain at least a partial history of the blockchain by transferring new blocks between themselves and can join or leave the network at any time.

## Light Clients

Applications including the Celo Wallet will also run on each user's device an instance of the Celo blockchain software operating as a ‘light client’. Light clients connect to full nodes to make requests for account and transaction data and to sign and submit new transactions, but they do not receive or retain the full state of the blockchain.

## Celo Wallet

The Celo Wallet application is a fully unmanaged wallet that allows users to self custody their funds using their own keys and accounts. All critical features such as sending transactions and checking balances can be done in a trustless manner using the peer-to-peer light client protocol. However, the wallet does use a few centralized cloud services to improve the user experience where possible, e.g.:

- **Google Play Services:** to pre-load invitations in the app
- **Celo Wallet Notification Service:** sends device push notifications when a user receives a payment or requests for payment
- **Celo Wallet Blockchain API:** provides a GraphQL API to query transactions on the blockchain on a per-account basis, used to implement a users' activity feed.

When end-users download the Celo Wallet from, for example, the Google Play Store, users are trusting both cLabs (or the entity that has made the application available in the Play Store) and Google to deliver a correct binary, and most users would feel that relying on these centralized services to provide this additional functionality is worthwhile.
