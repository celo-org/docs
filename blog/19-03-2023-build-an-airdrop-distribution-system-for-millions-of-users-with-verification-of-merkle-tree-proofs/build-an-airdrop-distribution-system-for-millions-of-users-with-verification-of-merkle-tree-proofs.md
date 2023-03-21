---
title: Build an Airdrop Distribution System for Millions of Users with Verification of Merkle Tree Proofs
description: Curious about how Uniswap and other projects are able to airdrop tokens to thousands of users? In this tutorial, we will show you how they use Merkle proof in Solidity and Javascript to accomplish this feat.
authors:
  - name: Oluwafemi Alofe
    title: Blockchain Developer | Technical Writer
    url: https://github.com/alofeoluwafemi
    image_url: https://avatars.githubusercontent.com/u/7295729?v=4
tags: [solidity, react, celo, smartcontract, nextjs, advanced, tokens, celosage]
hide_table_of_contents: true
slug: /tutorials/build-an-airdrop-distribution-system-for-millions-of-users-with-verification-of-merkle-tree-proofs
---

## Introduction

In this tutorial, we will show you how to create a subscription platform using the Celo composer react-app and the hardhat package. The platform will offer three subscription plans that users can choose from, and payment will be charged monthly in cUSD. We will also use the OpenZeppelin Defender autotask to handle the monthly subscription charges and an email service to notify users of the charge status. By the end of this tutorial, you will have a working subscription platform and the knowledge to customize and build upon it for your own use case.

![header](https://user-images.githubusercontent.com/7295729/226203842-6021c828-26d1-4c3e-af90-4ab79fa314d9.png)

## Background Knowledge

Merkle trees are a fundamental data structure to build blockchain systems. In a merkle tree, there are leaf nodes and non-leaf nodes. Each leaf nodes represent a data element while each non-leaf nodes represent the hash of its child nodes. There is also the Merkle root which is the hash of the entire tree. It also serves as a summary of all the data in the tree.

## Requirements

Before we begin, make sure to have a package manager installed on your machine. yarn and npm are perfect managers.

## Github Code

For your reference, you can use the completed tutorial [github code](https://github.com/alofeoluwafemi/merkle-proof-airdrop-tutorial)

## Create a starter app with Celo Composer

In your terminal, run the following command

`npx @celo/celo-composer create`

You will be prompted to select the framework you will like to work with which in our case is React.

![007](https://user-images.githubusercontent.com/7295729/226204411-37cdaaff-9a68-4898-a79b-eb1f17e1c827.png)

You will also be prompted to pick a web3 library for the react app. For this tutorial, we will pick RainbowKit

![006](https://user-images.githubusercontent.com/7295729/226204405-e3859c6f-a37f-4ef2-8405-72cdd1f5abe5.png)

Next up, you will be prompted to choose the smart contract framework you want to work with, Choose Hardhat.

![005](https://user-images.githubusercontent.com/7295729/226204387-24a94849-efe4-4ab7-aa3f-f98d3a5648af.png)

For next steps, we will be prompted to create a Subgraph. We would not be creating a subgraph, so go ahead to select No

![004](https://user-images.githubusercontent.com/7295729/226204351-2106c5f7-8068-4dd4-9acb-20b7d005631f.png)

Then, proceed to give your project a name

You did it! You just created a starter project dApp in few minutes using Celo-Composer

## Write out your smart contract

What is next now is to cd into your project directory and open in your IDE

```bash
cd merkle-drop
code .
```

Go to the packages folder of your project and navigate to hardhat.

![003](https://user-images.githubusercontent.com/7295729/226204341-45b3de9f-7543-4049-a4ed-7cb3a4ac77b1.png)

Go to contracts folder and create a new file called `MerkleAirdrop.sol `. We will create a constant to hold the merkle root and token contract that will be airdropped to the recipients. We will also keep track of people who claim eventually by creating a mapping.

```solidity
// The Merkle root
bytes32 public merkleRoot;

// The token contract
IERC20 public tokenContract;

// Mapping to keep track of who claimed their tokens
mapping(address => bool) public claimed;
```

We will also create a function that allow users claim the tokens.

```solidity
// Function to claim tokens by providing a merkle proof
    function claimTokens(bytes32[] calldata _proof, uint256 _amount) external {
        require(!claimed[msg.sender], "Tokens already claimed");

        // Mark the address as claimed
        claimed[msg.sender] = true;

        // Transfer tokens to the address
        tokenContract.transfer(msg.sender, _amount);
}
```

In this function, there is a simple check to see that the user has already claimed the token. There is also the need to verify the merkle proof so we are going to write a function `verifyProof` to do that

```solidity
// Function to verify the merkle proof
    function verifyProof(bytes32[] calldata _proof, address _address) public view returns (bool) {
        // Compute the leaf hash
        bytes32 leaf = keccak256(abi.encodePacked(_address, msg.sender));

        // Compute the root hash
        bytes32 computedHash = leaf;
        for (uint256 i = 0; i < _proof.length; i++) {
            bytes32 proofElement = _proof[i];

            if (computedHash < proofElement) {
                computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
            } else {
                computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
            }
        }

        // Check if the computed hash matches the Merkle root
        return computedHash == merkleRoot;
    }
```

We will then go back to our `claimTokens` function to call our `verifyProof` function after checking that tokens had already been claimed. So update the claimTokens function with this line of code

```solidity
require(verifyProof(_proof, msg.sender), "Invalid proof");
```

All these would require that you import the openzepelin's ERC20 file

```javascript
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

If you don't have a token in mind to give out, you can create one. Just create another solidity file, name it `Token.sol` for example and copy this piece of code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("My Token", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}
```

Create an .env file to store your environment variables and copy your private key from your Celo/Metamask wallet as applicable

CELO_NETWORK=https://alfajores-forno.celo-testnet.org <br/>
PRIVATE_KEY=YOUR_PRIVATE_KEY

Compile your contracts using this command

```bash
npx hardhat compile
```

## Testing your contract

Testing a smart contract is quite essential because it helps for the smart contract to be secure and function well. We will test our contract to ensure that the functions as intended. In `packages >> hardhat >> test` , create a test javascript file and write all the possible tests that you think are applicable.

```javascript
// Import the required dependencies and the smart contract
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MerkleTree } = require("merkletreejs");

const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");

describe("MerkleAirdrop", function () {
  // Define some variables to use in the tests
  let merkleRoot;
  let airdrop;
  let token;
  let owner;
  let amount = ethers.utils.parseEther("100");

  // Create the Merkle Airdrop contract and token contract before each test
  beforeEach(async function () {
    [owner, recipient1, recipient2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(amount);
    const MerkleAirdrop = await ethers.getContractFactory("MerkleAirdrop");
    merkleRoot = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
    airdrop = await MerkleAirdrop.deploy(merkleRoot, token.address);
    await token.transfer(airdrop.address, ethers.utils.parseEther("10"));
  });

  // Test that the contract deploys successfully
  describe("Deployment", function () {
    it("Should deploy MerkleAirdrop and Token contracts successfully", async function () {
      expect(airdrop.address).to.not.equal(ethers.constants.AddressZero);
      expect(token.address).to.not.equal(ethers.constants.AddressZero);
    });
  });

  // Test that only eligible recipients can claim tokens
  describe("Claiming tokens", function () {
    it("Should allow eligible recipients to claim their tokens and check for invalid proof", async function () {
      // Generate a proof

      const whitelist = [
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "0xe304cC7Cfed9120ADa3Cd04cC13e210F7c5F37ED",
      ]; // Replace with real whitelist
      const leaves = whitelist.map((address) =>
        ethers.utils.keccak256(address)
      );
      const values = [
        ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "5"],
        ["0xe304cC7Cfed9120ADa3Cd04cC13e210F7c5F37ED", "2"],
      ];
      const tree = new MerkleTree(leaves);
      const leaf = ethers.utils.keccak256(
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
      );
      const proof = tree.getProof(leaf);

      // Call the claimTokens function with a valid proof and an amount
      const buffer = proof[0].data;
      const bytes32Array = [];
      for (let i = 0; i < buffer.length; i += 32) {
        const slice = buffer.slice(i, i + 32);
        const bytes32 = `0x${slice.toString("hex").padEnd(64, "0")}`;
        bytes32Array.push(bytes32);
      }
      const result = await airdrop.claimTokens(bytes32Array, 3, {
        gasLimit: 500000,
      });
      expect(result)
        .to.emit(airdrop, "Tokens already claimed")
        .withArgs(bytes32Array);

      const invalidProof = tree.getProof(
        ethers.utils.keccak256("0x70997970C51812dc3A010C7d01b50e0e17dc79C9")
      );
      expect(invalidProof)
        .to.emit(airdrop, "Invalid Proof")
        .withArgs(invalidProof);
    });
    it("Should be able to verify proof", async function () {
      const whitelist = [
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "0xe304cC7Cfed9120ADa3Cd04cC13e210F7c5F37ED",
      ]; // Replace with real whitelist
      const leaves = whitelist.map((address) =>
        ethers.utils.keccak256(address)
      );
      const values = [
        ["0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "5"],
        ["0xe304cC7Cfed9120ADa3Cd04cC13e210F7c5F37ED", "2"],
      ];
      const tree = new MerkleTree(leaves);
      const leaf = ethers.utils.keccak256(
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
      );
      const proof = tree.getProof(leaf);
      // Call the claimTokens function with a valid proof and an amount
      const buffer = proof[0].data;
      const bytes32Array = [];
      for (let i = 0; i < buffer.length; i += 32) {
        const slice = buffer.slice(i, i + 32);
        const bytes32 = `0x${slice.toString("hex").padEnd(64, "0")}`;
        bytes32Array.push(bytes32);
      }
      const res = await airdrop.verifyProof(
        bytes32Array,
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        { gasLimit: 500000 }
      );
      expect(res)
        .to.emit(airdrop, true)
        .withArgs("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    });
  });
});
```

You can proceed to test this by running the following command

`npx hardhat test test/your_javascript_file.js`

If successful, you should see an output similar to this

![002](https://user-images.githubusercontent.com/7295729/226204286-b4c6efce-6a24-4a62-802a-d7d8f7ca944d.png)

## Deploy your Smart Contract

Create a deployment script file in scripts folder. You can run this command

```bash
cd packages/hardhat/scripts && touch deploy.js
```

Then write your script

```javascript
const hre = require("hardhat");

async function main() {
  const merkleRoot = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("test"));
  const tokenContractAddress = "0xB3C20f3011ac4f713b3E6252E9B6A2060EB912a1"; // Replace with your token contract address
  const MerkleAirdrop = await hre.ethers.getContractFactory("MerkleAirdrop");
  const merkleAirdrop = await MerkleAirdrop.deploy(
    merkleRoot,
    tokenContractAddress
  );
  await merkleAirdrop.deployed();
}

main();
```

Run this command after

```bash
npx hardhat --network alfajores run scripts/deploy.js
```

After a succesful deployment, you would see the message

```bash
MerkleAirdrop address deployed to: 0x4004aD23277E51E1086beba0C0E8644Cb0DAe1d5
```

## Starting out the Frontend

In the root of your project folder, create a file called `AirdropWrapper.js`. This will serve as a gateway between the contract deployed and our component class. We will call our contract in this file.

```javascript
import { abi } from "./AirdropContract.json";
import { providers, Contract, ethers } from "ethers";
const { MerkleTree } = require("merkletreejs");

require("dotenv").config();

export async function getContract() {
  const contractAddress = "0x4004aD23277E51E1086beba0C0E8644Cb0DAe1d5";
  const contractABI = abi;
  let supportTokenContract;
  try {
    const { ethereum } = window;
    if (ethereum.chainId === "0xaef3") {
      const provider = new providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      supportTokenContract = new Contract(contractAddress, contractABI, signer);
    } else {
      throw new Error("Please connect to the Alfajores network");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  return supportTokenContract;
}

export async function claimTokens(proof, amount) {
  const contract = await getContract();
  const tx = await contract.claimTokens(proof, amount, {
    gasLimit: 300000,
  });
  await tx.wait();
}

export async function checkEligibility(whitelist) {
  const leaves = whitelist.map((address) => ethers.utils.keccak256(address));
  const tree = new MerkleTree(leaves, ethers.utils.keccak256);

  const leaf = ethers.utils.keccak256(whitelist[0]);
  const proof = tree.getProof(leaf);
  const root = tree.getRoot().toString("hex");
  return tree.verify(proof, leaf, root);
}

export async function getTheProof(whitelist) {
  const leaves = whitelist.map((address) => ethers.utils.keccak256(address));
  const tree = new MerkleTree(leaves, ethers.utils.keccak256);

  const leaf = ethers.utils.keccak256(whitelist[0]);
  const proof = tree.getProof(leaf);
  const root = tree.getRoot().toString("hex");
  const bytes32Array = [];
  const buffer = proof[0].data;
  for (let i = 0; i < buffer.length; i += 32) {
    const slice = buffer.slice(i, i + 32);
    const bytes32 = `0x${slice.toString("hex").padEnd(64, "0")}`;
    bytes32Array.push(bytes32);
  }

  return bytes32Array;
}
```

In this file, we will also write functions to get our merkle proof, check if an address is eligible for airdrop and claim tokens.

Navigate to `react-app` folder and go to your components folder, create a new file there named `Airdrop.tsx`. Here we will import the functions from the wrapper class and call it.

```javascript
import React, { useState } from "react";
import {
  checkEligibility,
  claimTokens,
  getTheProof,
} from "../../../AirdropWrapper";
import { useAccount } from "wagmi";
```

```javascript
const [isAddress, setAddress] = useState("");
const [isEligible, setIsEligible] = useState(false);
const [isClaimed, setIsClaimed] = useState(false);
const { address, isConnecting, isDisconnected } = useAccount();
let whitelist: any = [];
const lowercaseAddress = address.toLowerCase();
whitelist.push(lowercaseAddress);
whitelist.push("0xe304cC7Cfed9120ADa3Cd04cC13e210F7c5F37ED");

const proof = getTheProof(whitelist);
const checkEligibile = async () => {
  const isEligible = await checkEligibility(whitelist);
  setIsEligible(isEligible);
};
const claimAirdrop = async () => {
  const claim = await claimTokens(await proof, "1");
  setIsClaimed(true);
};
```

Complete your frontend to show that the wallet connected is eligible for the airdrop and that the person can claim

```javascript
<div className="bg-gray-100 p-4">
  <h1 className="text-2xl font-bold mb-4">Airdrop</h1>
  <input
    type="text"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    placeholder={address}
    className="bg-white rounded-md py-2 px-4 mb-4 w-full"
  />
  <button
    onClick={checkEligibile}
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
  >
    Check eligibility
  </button>
  {isEligible && !isClaimed && (
    <div className="bg-green-100 p-4 rounded mt-4">
      <p className="text-green-700 font-bold mb-2">
        You are eligible for the airdrop!
      </p>
      <button
        onClick={claimAirdrop}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Claim airdrop
      </button>
    </div>
  )}
  {isEligible && isClaimed && (
    <p className="text-gray-700 font-bold mt-4">
      You have already claimed the airdrop.
    </p>
  )}
  {!isEligible && (
    <p className="text-red-700 font-bold mt-4">
      You are not eligible for the airdrop.
    </p>
  )}
</div>
```

Proceed to your terminal to run this command

`npm run dev`

It should compile and deploy to your localhost so you should see an interface similar to this

![001](https://user-images.githubusercontent.com/7295729/226204225-67f62db1-275e-4e79-80f7-7e6fc34101f8.png)

The wallet connected is eligible for the airdrop hence we see that here. Proceed to claim the airdrop by clicking on the button.

There you have it. You have successfully implemented a dApp that gives your users access to claim airdrops using merkle trees.

## Conclusion

In this tutorial , we learnt and saw the versatility of Merkle trees in building decentralized applications and showcased how they can be used to provide access to airdrops. This demonstrates the real-world applicability of Merkle trees and their role in building secure and efficient blockchain systems.

## Reference

- [Evolution of airdrop from common spam to the merkle tree](https://hackernoon.com/evolution-of-airdrop-from-common-spam-to-the-merkle-tree-30caa2344170)
- [How to create merkle tree airdrop smartcontract](https://forum.openzeppelin.com/t/how-to-create-merkle-tree-airdrop-smartcontract/33463)
- [Video](https://m.youtube.com/watch?v=xbBn5sj9pXM)
- [Performing merkle airdrop like uniswap](https://steveng.medium.com/performing-merkle-airdrop-like-uniswap-85e43543a592)

## About Author

Oluwafemi Alofe is a Blockchain developer with 3 years of applicable knowledge and 8 years of total experience as a Software engineer. He has written and deployed vulnerability-free smart contracts as a blockchain developer on a variety of blockchains, including but not limited to Ethereum, BCS, and Celo. Oluwafemi has a strong interest in developing distributed systems, and continues to learn new things every day to stay current with technological advancements.

He is has two [Udemy courses on solidity development](https://www.udemy.com/user/alofeoluwafemi/) with over 6,300 student enrolled and also a book on [Amazon KDP](https://www.amazon.com/Beginning-PHP-Laravel-approach-Inventory-ebook/dp/B086434XWV/) for PHP and Laravel Developers.

He's currently a platform owner at [myco.io](https://myco.io), first world, watch to earn platform with over 1 Million users.

Connect with Oluwafemi on [Twitter](https://twitter.com/alofeoluwafemi_) or [Linkedin](https://www.linkedin.com/in/oluwafemialofe/).
