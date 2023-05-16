--
title: Creating a Smart Contract for Decentralized Voting
description: In this tutorial, you’ll learn how to build a decentralised voting application using smart contracts on the Celo blockchain.
authors:
  - name: Peter Latona
    title: contributor, Celo sages
    url: https://github.com/SasaniEldis
    image_url: https://avatars.githubusercontent.com/u/107583957?v=4
tags: ["intermediate", "celo", "celosage", "smartcontract"]
hide_table_of_contents: true
slug: /tutorials/creating-a-Smart-Contract-for-Decentralized-Voting
---

![header](../../src/data-tutorials/showcase/intermediate/creating-smart-contract.png)

## Introduction

In this tutorial, we will learn how to create a smart contract for decentralised voting. This means that anyone with an internet connection can vote without the need for a central authority. We will use Solidity, the programming language for Ethereum, to write the smart contract, and we will deploy it on a test network.

## Prerequisites

Before starting this tutorial, you should have a basic understanding of Ethereum, blockchain, and smart contracts. You should also have a development environment set up with a code editor and the necessary tools, such as Solidity and a test network. If you need help with these prerequisites, you can refer to the[Ethereum documentation](https://ethereum.org/en/developers/docs/) or other tutorials.

## Requirements

We will use Remix, an online IDE, for Solidity development, and the Rinkeby test network for this tutorial. We will also need a MetaMask wallet to interact with the test network. You can install MetaMask as a browser extension.

## Getting Started

- Step 1: Open Remix in your web browser.

Create a new file calledVoting.sol and copy the following code into it:

```pragma solidity ^0.8.0;

contract Voting {

    

    mapping (address => bool) public hasVoted;

    mapping (string => uint256) public votes;

    string[] public candidates;

    

    constructor(string[] memory _candidates) {

        candidates = _candidates;

    }

    

    function vote(string memory _candidate) public {

        require(!hasVoted[msg.sender], "You have already voted");

        require(validCandidate(_candidate), "Not a valid candidate");

        votes[_candidate]++;

        hasVoted[msg.sender] = true;

    }

    

    function validCandidate(string memory _candidate) view public returns (bool) {

        for (uint i = 0; i < candidates.length; i++) {

            if (keccak256(bytes(candidates[i])) == keccak256(bytes(_candidate))) {

                return true;

            }

        }

        return false;

    }

    
    function getVotes(string memory _candidate) view public returns (uint256) {

        return votes[_candidate];

    }

}

```

This smart contract has a voting contract that stores the votes for different candidates. It has three mappings:

- has-voted: A boolean value that tracks whether an address has already been voted.
- votes: A mapping from the candidate's name to the number of votes they have received.
- candidates: A string array that contains the names of the candidates.

The contract has four functions:

- constructor: A constructor that takes an array of candidate names as input and initializes the candidate's array.
- vote: A function that allows users to vote for a candidate. It checks if the user has already voted, and if the candidate is valid, and then increments the vote count for that candidate.
- validCandidate: A function that checks if the candidate name is in the candidates' array.
- get-votes: A function that returns the number of votes a candidate has received.

- Step 2: Compile the smart contract by clicking the "Compile" button in Remix. Make sure there are no errors.

- Step 3: Deploy the smart contract to the Rinkeby test network by clicking the "Deploy & Run Transactions" button in Remix.

Make sure you have connected to the Rinkeby network in MetaMask and have enough test Ether to pay for the deployment.

- Step 4: Interact with the smart contract by calling the functions. You can do this in Remix by clicking on the "Voting" contract in the "Deployed Contracts" section.

You can also use the Remix console or write a client application that interacts with the smart contract using web3.js or other tools.

## Conclusion

In conclusion, we have learned how to create a smart contract for decentralised voting using Solidity. We have also learned how to deploy the smart contract to a test network and interact with it using Remix and MetaMask.

With this knowledge, you can create your own decentralised voting applications and explore the possibilities of blockchain technology. By removing the need for a central authority, decentralized voting can increase transparency, reduce fraud, and empower individuals to have a say in important decisions.

## Next Steps

Now that you have created a smart contract for decentralised voting, you can explore more advanced topics such as:

- Adding more complex voting rules such as weighted voting or quadratic voting.
- Implementing a user interface for the voting application using web3.js or other tools.
- Deploying the smart contract to the Ethereum mainnet for real-world use.
- Learning about other use cases for smart contracts such as decentralised finance (DeFi) or non-fungible tokens (NFTs).

## About the Author

Imole Peter L.

A web3 enthusiast, content writer for web3 brands, visual artist, and seasoned author (Pen name:[Sasani Eldis](https://www.amazon.com/Imole-Latona/e/B088F4KF7H)). Connect with me on[LinkedIn](https://www.linkedin.com/in/imole-peter-latona)

Tutorial Github repo link: https://github.com/SasaniEldis/decentralized-voting-celo-demo

## References

Ethereum documentation:<https://ethereum.org/developers/>

Remix IDE:<https://remix.ethereum.org/>

MetaMask:<https://metamask.io/>

Solidity documentation:<https://docs.soliditylang.org/>
