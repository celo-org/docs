---
title: The Celo Protocol
description: Introduction to the Celo Protocol's consensus, governance, incentives, and key features.
---

# The Celo Protocol

Introduction to the Celo Protocol's consensus, governance, incentives, and key features.

---

## What is the Celo Protocol?

The Celo blockchain and Celo Core Contracts together comprise the Celo Protocol. This term describes both what services the decentralized Celo network provides to applications and the way in which nodes in the network cooperate to achieve this. This section introduces some of these services.

## Consensus and Proof-of-Stake

Celo is a Proof-of-Stake blockchain. In comparison to Proof-of-Work systems like Bitcoin and Ethereum, this eliminates the negative environmental impact and means that users can make transactions that are cheaper, faster, and whose outcome cannot be changed once complete.

The Celo blockchain implements a Byzantine Fault Tolerant (BFT) consensus algorithm in which a well-defined set of validator nodes broadcast signed messages between themselves in a sequence of steps to reach agreement even when up to a third of the total nodes are offline, faulty, or malicious. When a quorum of validators has reached an agreement, that decision is final.

Celo uses a Proof-of-Stake mechanism for selecting the validator set for a fixed period termed an epoch. Anyone can earn rewards by locking CELO and by participating in validator elections and governance proposals. Initially, the number of validators will be capped to one hundred nodes elected by CELO holders. Validators earn additional fixed rewards in Celo Dollars (cUSD) to cover their costs plus margin.

## On-Chain Governance

Celo uses an on-chain governance mechanism to manage and upgrade aspects of the protocol that reside in the Celo Core Contracts and for a number of parameters used by the Celo blockchain. This includes operations like upgrading smart contracts, adding new stable currencies, modifying the reserve target asset allocation, and changing how validator elections are decided.

The Governance contract is set as “owner” for all of the Celo Core Contracts. This allows the protocol to carry out agreed governance proposals by executing code in the context of the Governance contract. Proposals are selected for consideration and voted on by CELO holders using a weighted vote based on the same Locked CELO commitment used to vote to elect validators.

## Ultralight Synchronization

Celo provides extremely fast, secure synchronization to enable light clients to begin to track the current state of the Celo blockchain ledger almost immediately. This means that even wallet users with high latency, low bandwidth, or high-cost data tariffs can use Celo.

In Ethereum, verifying whether data received from an untrusted full node really does represent the current state of a blockchain requires fetching every block header ever produced to confirm they form a cryptographically secure chain. A consequence of Celo using a BFT consensus algorithm is that it can do that verification by building a chain only of changes in the validator set, not each individual block.

Roadmap: Synchronization performance will be further improved with BLS signature aggregation and succinct zero-knowledge proofs, via zk-SNARKs.

## Incentives for Operating Full Nodes

In Ethereum, there are few incentives to run a full node that is not mining. Few nodes serve light clients, and this results in a poor experience for mobile wallets.

Celo introduces a scheme that incentivizes users to operate regular nodes. Light clients pay transaction fees to full nodes. Clients include in every transaction the address of a node that, when the transaction is processed, receives the fee. While a full node provides other services for which they receive no specific fee, it is expected that failing to service these requests will cause clients to seek other full nodes that do, who will then receive fees when they next make a transaction.

Since light clients need not trust full nodes, as they can verify their work, this also provides the 'permissionless on-ramp' for users to receive CELO or Celo Dollars (cUSD) without already holding it that is missing in other Proof-of-Stake networks.

## Stable Cryptocurrencies

Celo enables a family of Mento stablecoins that track the value of any asset, including fiat currencies, commodities, and even natural resources. Mento stablecoins supported include the Celo Dollar (cUSD) and the Celo Euro (cEUR), which track the value of the U.S. Dollar and Euro respectively. CELO and a basket of other assets including BTC and ETH serve as the collateral for these stablecoins. These stablecoins are redeemable for CELO, ensuring that transactions can occur quickly, cheaply, and reliably on-chain.

Celo's stability mechanism allows users to create a new cUSD and cEUR by sending CELO to the reserve or burn cUSD and cEUR by redeeming it for their equivalent value in CELO.

This mechanism relies on a series of Oracles, or information feeds from exchanges external to the network, to report the CELO to US Dollar or Euro market rates. To minimize the risk of a run on CELO collateral when these reported values are inaccurate or out-of-date, Celo uses an on-chain constant-product-market-maker model, inspired by the[ Uniswap](https://uniswap.io/) system. This mechanism adjusts the redemption price of CELO until either arbitrage occurs (so that the on-chain price dynamically adjusts until the offered rate meets the external rate) or Oracles reset the on-chain price.

The Celo Protocol ensures that there is sufficient CELO collateral to redeem the amount of CELO in circulation through several sources. These include a stability fee levied on Celo Dollar (cUSD) balances, a transfer from epoch rewards, plus the proceeds from the spread when interacting with the on-chain market-maker mechanism.

In addition, a backup reserve of cryptocurrencies is held off-chain. This off-chain reserve is managed to preserve value and minimize volatility by maintaining a diversified portfolio of cryptocurrencies through algorithmic rebalancing trading and periodically "topping-up" the CELO collateral available to ensure it exceeds the amount required to redeem Celo Dollars (cUSD) in circulation. The approved cryptocurrencies, distribution ratios, and rebalancing period are all subject to on-chain governance.

**Roadmap: **Celo envisages a number of stable currencies tracking different fiat currencies as well as natural resources such as forests. In addition, once bridges between other chains and the Celo blockchain are fully developed, and liquid trading on decentralized exchanges occurs, the rebalancing can be handled transparently on-chain.

## Lightweight Identity

Celo offers a lightweight identity layer that allows users of applications including Celo Wallet to identify and securely transact with other users via their contacts' phone numbers. Celo Wallet enables payments directly to users listed in their device's contacts list.

The Attestations contract allows a user to request attestations to their phone number for a small fee. A secure decentralized source of randomness is used to pick a number of validators that will produce and send via SMS signed secret messages that act as attestations of ownership of the phone number. The user then submits these back to the Attestations contract which verifies them and installs a mapping for the phone number to the user's account.

## Richer Transactions

Celo provides a number of enhancements to regular transactions as familiar to Ethereum developers.

The Celo native asset has duality as both the native currency and is also an ERC-20 token, simplifying the work of application developers.

Celo assets exist on an independent blockchain, and cannot be accessed through wallets that connect to the Ethereum network. Only use wallets designed to work with the Celo network.

In Celo, transaction fees can be paid in stable cryptocurrencies. A user sending Celo Dollars will be able to pay their transaction fee out of their Celo Dollar (cUSD) balance, so they do not need to hold a separate balance of CELO in order to make transactions. The protocol maintains a list of currencies that can be used to pay for transaction fees. These smart contracts implement an extension of the ERC-20 interface, with additional functions that allow the protocol to debit and credit transaction fees.

The Escrow contract allows users to send payments to other users who can be identified by a phone number but don’t yet have an account. These payments are stored in this contract itself and can be either withdrawn by the intended recipient after creating an account and attesting their identity or reclaimed by the sender.

Transfers between two accounts with associated identities support end-to-end encrypted comments. A comment encrypted to the identity's public key is passed when making the transfer and included in an event that can be located on the blockchain ledger.
