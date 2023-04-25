---
title: A prediction market that allows users to create and trade prediction contracts on future events on celo.
description: This project is a smart contract for a prediction market. Users can create and trade contracts on future events, and the contract settles automatically based on the outcome.
authors:
  - name: Ogoyi Thompson
    title: Technical Writer 
    url:   https://github.com/Ogoyi
    image_url:  https://avatars.githubusercontent.com/u/115812158?v=4
tags: [celosage, dapp, intermediate, celo]
hide_table_of_contents: true
slug: /tutorials/cUsd-based-event-ticketing-and-management-system
---

## Introduction

The contract is a Solidity smart contract for a decentralized prediction market. It enables users to create and trade prediction contracts on future events, and the outcome is settled automatically based on the event outcome. The contract stores information on each contract's creator, description, end time, price, and outcome, allowing for transparent trading without the need for intermediaries. Users can buy shares using cUSD tokens, and payouts are made to those who correctly predict the outcome. The contract is designed to be secure, using the Celo blockchain to enforce the rules of the market.

## REQUIREMENT

To follow this tutorial, you will require:

- A code editor or text editor such as Remix.

- An internet browser and a stable internet connection.
  
## PREREQUISITE

To successfully complete this tutorial, it is recommended that you have:

- Familiarity with Javascript programming language.
  
- A basic understanding of Blockchain technology and its functioning.
  
- Basic knowledge of the Solidity programming language used for smart contract development on the blockchain.
  
  We will begin by using the Remix IDE to write our smart contract. Let's get started!

  The complete code:
  
  
