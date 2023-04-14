---
title: A Deep Dive into Celo Consensus Mechanism
description: Creating a simple NFT marketplace on the Celo Blockchain using Hardhat to create smart contracts.
authors:
  - name: ✍️ Joshua Obafemi
    title: Technical Writer
    url: https://github.com/jorshimayor
    image_url: https://github.com/jorshimayor.png
tags: [celosage, celo, intermediate]
hide_table_of_contents: true
slug: "/tutorials/a-deep-dive-into-celo-consensus-mechanism"
---

![header](../../src/data-tutorials/showcase/intermediate/deep-dive-into-celo-mechanism.png)

## Introduction

Celo blockchain uses a consensus mechanism called Proof of Stake (pos) with a novel BFT-based consensus protocol known as "Proof of Stake with identity" (PoS+). The implementation of this consensus mechanism is open-source and available on GitHub. Here is the link to the [repository](https://github.com/celo-org/celo-monorepo)

It's important to note that the Celo blockchain is built using the Solidity programming language and runs on the Ethereum Virtual Machine (EVM). Therefore, the consensus mechanism is implemented using Solidity smart contracts.

## Prerequisites

In this article, we will take a deep dive into Celo's PoS-Id consensus mechanism and explore how it works.

Before you continue, read these articles for bacis understanding on [consensus mechanisms](https://docs.celo.org/blog/tutorials/proof-of-work-vs-proof-of-stake-a-comprehensive-comparison) and [blockchain protocols](https://docs.celo.org/blog/tutorials/an-introduction-to-layer-1-and-layer-2-blockchain-protocols)

## Getting started

Before we dive into Celo's consensus mechanism, it's important to understand what consensus means in the context of blockchain technology. Consensus is the process by which a distributed network of computers comes to agreement on the validity of transactions and the state of the blockchain. Without a robust consensus mechanism, a blockchain network can be susceptible to various forms of attack, such as double-spending or 51% attacks.

Celo is a mobile-first blockchain network designed to create an open financial system that is accessible to anyone with a mobile phone. Celo has gained a lot of attention in the blockchain space due to its unique consensus mechanism, which aims to provide fast and secure transactions while maintaining decentralization.

Celo's consensus mechanism is based on a modified version of the Proof of Stake (PoS) algorithm. PoS is an alternative to the more well-known Proof of Work (PoW) algorithm, which is used by Bitcoin and other early blockchain platforms. PoS is designed to be more energy-efficient and scalable than PoW, as it doesn't require miners to solve complex mathematical puzzles in order to validate transactions.

Consensus is a fundamental concept in blockchain technology, and it refers to the process of agreeing on the state of the network among all the nodes. In a distributed system like a blockchain, nodes are decentralized and must reach consensus without relying on a central authority. Celo's consensus mechanism, called the Proof of Stake with Identity (PoS-Id) consensus algorithm, is designed to achieve this goal.

### What is PoS-Id Consensus Algorithm?

The PoS-Id consensus algorithm is a variation of the Proof of Stake (PoS) consensus mechanism used by many blockchain networks, including Ethereum. In the PoS consensus mechanism, validators are chosen based on their stake in the network, and they are responsible for validating transactions and creating new blocks.

Celo's PoS-Id consensus algorithm takes this concept further by incorporating identity verification as a crucial component of the consensus process. In the PoS-Id consensus algorithm, validators are not only chosen based on their stake in the network, but they must also prove their identity to participate in the consensus process.

Validators are required to provide a phone number, and this number is used to verify their identity. Validators must also provide a minimum stake in CELO tokens to participate in the consensus process. This stake is used to secure the network, and validators are rewarded for their participation in the consensus process.

The PoS-Id consensus algorithm is designed to provide a high level of security while maintaining decentralization. The identity verification requirement ensures that only trusted validators are chosen to participate in the consensus process. This helps to prevent attacks such as Sybil attacks, where a single user can create multiple identities to gain control of the network.

### How does PoS-Id Consensus Algorithm work?

The PoS-Id consensus algorithm works by selecting validators to participate in the consensus process based on their stake in the network and their verified identity. Validators are responsible for validating transactions and creating new blocks.

The consensus process begins with a validator proposing a new block. The proposed block contains a set of transactions that have been verified by the validator. Other validators then validate the block by checking that the transactions are valid and that the proposed block is consistent with the current state of the network.

If a validator detects an error or inconsistency in the proposed block, they can reject it. However, if a consensus is reached, the proposed block is added to the blockchain, and the validator who proposed the block is rewarded with CELO tokens.

Validators are incentivized to participate in the consensus process and act honestly because they stand to lose their stake if they are found to be acting maliciously. In addition, validators are subject to a slashing mechanism, where a portion of their stake is forfeited if they are found to have violated the network's rules.

The PoS-Id consensus algorithm is designed to be fast and scalable, with the ability to handle thousands of transactions per second. The algorithm achieves this by utilizing a mechanism called a "commit/reveal" scheme, where validators reveal their block proposals only after a commit phase, reducing the potential for malicious behavior.

### Celo Consensus Mechanism

In Celo's PoS-based consensus mechanism, validators stake Celo's native token, CELO, in order to participate in the consensus process. Validators are chosen based on their stake size and their reputation within the network. This reputation is based on a combination of factors, including their uptime, their history of successful validation, and their adherence to the network's rules and protocols.

Validators take turns proposing blocks of transactions to add to the blockchain. Once a block is proposed, other validators in the network have a certain amount of time to verify the transactions and validate the block. If the block is validated, it is added to the blockchain, and the validator who proposed the block is rewarded with CELO tokens.

### Celo Unique Features

One of the unique features of Celo's consensus mechanism is the concept of "locked gold". Locked gold is a separate token that is used to provide additional security to the network. Validators can lock their CELO tokens in order to generate locked gold, which they can then use as collateral to guarantee their behavior within the network. If a validator behaves maliciously or violates the network's rules, their locked gold can be confiscated and distributed to other validators as a penalty.

Another key feature of Celo's consensus mechanism is the ability to participate in governance decisions. CELO token holders can vote on proposals for changes to the network's protocols and rules. This allows the network to evolve over time in response to the needs and desires of its users.

### Explaining Celo's relationship with Ethereum and other Blockchains.

Celo is a blockchain platform that is built on top of Ethereum, meaning it uses Ethereum's Virtual Machine (EVM) and programming languages to create and execute smart contracts. This makes it compatible with other EVM-based blockchain networks, such as Ethereum, Binance Smart Chain, and Polygon, among others.

To understand this relationship better, let's use the analogy of a tree. Ethereum is like the trunk of the tree, providing the foundation and support for other branches to grow from. Celo is like one of these branches, connected to the trunk and drawing nourishment from it, but also distinct and able to grow in its own direction. Similarly, Celo is connected to Ethereum and shares some of its infrastructure, but it is also able to innovate and develop its own features and applications.

Here's a visual representation of the relationship between Ethereum and Celo:

            __________
           |          |
           | Ethereum |
           |__________|
                |
                |
                |
            ____v_____
           |         |
           |  Celo   |
           |_________|

Celo's compatibility with other EVM chains is also illustrated by this analogy. Each of these chains can be seen as their own branches, connected to the same trunk as Ethereum and Celo but also able to grow in their own unique directions.

            __________
           |          |
           | Ethereum |
           |__________|
                |
                |
         _______v_______
        |              |
        |  Binance     |
        | Smart Chain  |
        |______________|
                |
                |
         _______v_______
        |              |
        |   Polygon    |
        |______________|
                |
                |
            _________
           |         |
           |  Celo   |
           |_________|

## Conclusion

Celo's PoS-Id consensus algorithm is a unique approach to consensus in blockchain technology. By incorporating identity verification as a crucial component of the consensus process, Celo's PoS-Id consensus algorithm provides a high level of security while maintaining decentralization. Validators are incentivized to act honestly, and malicious behavior is penalized.

## Next Steps

Now that you know how the concensus mechanism of the Celo protocol, you should start building on this blockchain or even be a validator. You can get started on being a Celo developer by taking the [tutorials.](https://docs.celo.org/tutorials?tags=celosage)

## About the Author

Joshua Obafemi

I'm a Web3 fullstack developer and technical writer. You can connect with me on [GitHub](https://github.com/jorshimayor), [Twitter](https://twitter.com/jorshimayor), [Linkedin](https://www.linkedin.com/in/joshua-obafemi-ba2014199/).
