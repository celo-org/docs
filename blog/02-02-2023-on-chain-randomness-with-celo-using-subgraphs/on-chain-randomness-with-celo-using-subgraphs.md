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

In this tutorial, we will explore how subgraphs and randomness work in the Celo blockchain. This tutorial will cover the use of subgraph technology to monitor blockchain activity and how to integrate random elements into your blockchain application. By the end of this lesson, you'll have a foundational understanding of how subgraphs and randomness can enhance your blockchain application and make it more engaging.

## Prerequisites

If you want to understand the content of this tutorial, it is important to have a prior knowledge of Hardhat and the Solidity programming language. If you are not familiar with these tools, we recommend that you first learn about them before starting this tutorial to avoid any difficulties in following it.

## Requirements

-   [Node.js](https://nodejs.org/en/download/) v14.17.6 LTS or higher
-   [Hardhat](https://hardhat.org/getting-started/#overview)
-   [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/)

This is a list of what we'll cover in this tutorial 🗒:

- ✅ **Step 1:** Understanding Celo Randomness & Subgraphs
- ✅ **Step 2:** Project Setup
- ✅ **Step 3:** Writing the Smart Contract
- ✅ **Step 4:** Deploying the Smart Contract
- ✅ **Step 5:** Integration with Subgraphs