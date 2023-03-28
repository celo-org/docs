---
title: A Solidity Smart Contract for Auctioning Flowers on the celo Blockchain
description: This project is a Solidity smart contract for a floral auction. It allows users to create flowers with a name, description, image, and initial price, and then sell them through an auction.
authors:
  - name: David Ikanji
    title: Technical Writer 
    url:  https://github.com/Ikanji201
    image_url:  https://avatars.githubusercontent.com/u/115812158?v=4
tags: [solidity, intermediate, celo, celosage]
hide_table_of_contents: true
slug: /tutorials/A-solidity-Smart-contract-for-auctioning-flowers-on-the-celo-blockchain
---

## INTRODUCTION

Welcome to this tutorial on a smart contract written in Solidity. This contract is called "Festival" and it allows users to create and read festival programmes, as well as book and cancel slots for those programmes using a specific ERC20 token (cUSD).

The contract includes an interface for the ERC20 token, which defines the functions necessary for transferring and managing the token. The contract also defines a struct called "Programme" which stores information about each festival programme, such as its owner, URL, theme, description, location, price and sold slots.

The "writeProgramme" function allows users to create a new festival programme by providing the necessary information. The "readProgramme" function allows users to retrieve information about a specific programme.

The "bookSlot" function enables users to book a slot for a specific programme by transferring the required amount of cUSD tokens to the owner of the programme. The "cancelBooking" function allows users to cancel a booking and receive a refund.

Overall, this contract demonstrates the basic functionality of a decentralized application that can be used to manage festival programmes and bookings. In the following sections of the tutorial, we will explore each function in more detail and explain how they work.

## REQUIREMENT

To take this tutorial, you will need:

- Access to a code editor or text editor such as Remix.

- A reliable internet browser and internet connection

## PREREQUISITE 

- Basic knowledge of Javascript.

- Understand how Blockchain works.

- Have a basic knowledge of solidity.

To begin writing our smart contract, we will need to use Remix, an online IDE for writing and testing Solidity code. To get started, open Remix in your web browser and create a new file by clicking on the plus sign located on the left-hand side of the screen. Name the festival.sol. [(you can click this link to access the remix plugin)](https://remix-ide.readthedocs.io/en/latest/file_explorer.html#:~:text=Creating%20new%20files,-There%20are%202&text=The%20first%20is%20to%20click,will%20open%20in%20the%20Editor.).
