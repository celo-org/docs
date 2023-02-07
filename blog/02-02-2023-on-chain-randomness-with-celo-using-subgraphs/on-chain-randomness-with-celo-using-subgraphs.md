---
title: On-Chain Randomness with Celo using Subgraphs
description: The latest tutorial idea that I have is to create a lottery club, where users can establish their own lottery clubs with rewards of their choosing, including native coin (Celo), stablecoin (cUSD, cEUR, etc.) and also NFTs. In this idea, I will utilize Subgraph to index the smart contract of the lottery clubs created by users, and to ensure that the selection of winners for each lottery club will be determined by randomly generated numbers obtained from Celo Randomness, thereby reducing the potential for fraud in the process of selecting winners for each lottery club.
authors:
    - name: Abiyyu Yafu
url: https://github.com/yafiabiyyu
image_url: https://github.com/yafiabiyyu.png
tags: [subgraphs, randomness]
hide_table_of_contents: true
slug: /tutorials/on-chain-randomness-with-celo-using-subgraphs
---

![header](../../src/data-tutorials/showcase/intermediate/on-chain-randomness-with-celo-using-subgraphs.png)

## Introduction

In this tutorial, we will delve into the implementation of subgraphs and randomness in the Celo blockchain. Through this lesson, we will gain an understanding of the use of subgraph technology for monitoring blockchain activity and how to integrate random elements into our blockchain application. The tutorial is designed to impart a fundamental knowledge of how subgraphs and randomness can be utilized in creating a blockchain application that is both effective and captivating.

## Prerequisites

To understand this tutorial, you must already know how to use Hardhat and the Solidity programming language. If not, you may have trouble following the tutorial, so it's recommended to learn about Hardhat and the Solidity programming language first before starting this tutorial.

## Requirements

-   [Node.js](https://nodejs.org/en/download/) v14.17.6 LTS or higher
-   [Hardhat](https://hardhat.org/getting-started/#overview)
-   [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/)

## Understanding Celo Randomness

Celo Randomness constitutes a mechanism for generating random numbers within the Celo blockchain network. It serves multiple purposes, such as ensuring fairness in validator node selection or determining the outcome of lottery-style smart contracts. The Celo Randomness is implemented through an algorithm that guarantees the generated random numbers are unpredictable and cannot be controlled by any individual or group. If you want to learn more about Celo Randomness, you can read the [Celo Randomness documentation](https://docs.celo.org/protocol/randomness).

## Understanding Subgraphs

The Subgraph Protocol within a blockchain network constitutes a set of rules that streamlines the arrangement and identification of information. It lends a hand in charting a map of information and defining the route to be followed to find desired information within the blockchain network, thereby guaranteeing that information within the blockchain can be accessed with greater efficiency and ease. If you want to learn more about Subgraphs, you can read the [Subgraph documentation](https://thegraph.com/docs/).