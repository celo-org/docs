---
title: Creating a Charity Donation dApp using Celo Composer, React and Rainbowkit Celo
description: A step-by-step guide on how to build a charity donation dapp using Celo Composer and React and Rainbow Kit.
authors:
  - name: Olubusayo Amowe
    title: Web3 Developer Advocate
    url: https://github.com/amoweolubusayo
    image_url: https://github.com/amoweolubusayo.png
tags:
  [
    solidity,
    celo,
    celosage,
    celocomposer,
    react,
    metamask,
    typescript,
    javascript,
  ]
hide_table_of_contents: true
slug: /tutorials/creating-a-charity-donation-dApp-using-celo-composer-and-react-and-rainbowKit-celo
---

![header](https://user-images.githubusercontent.com/20168921/225596664-52322c39-85a5-4580-871c-ef319cf62c53.png)

## Introduction

This article is a step-by-step guide on building a charity donation dapp using Celo Composer and React and Rainbow Kit. With the dApp, users can donate to their favorite charitable causes securely and transparently. Celo Composer is the building block or foundation of the dApp, when combined with React and Rainbowkit Celo, the final result gives a user-friendly interface that makes giving to charity a seamless experience.

## Prerequisites

- [RainbowKit](https://www.rainbowkit.com) is a React library that makes it easy to add a wallet connection to your dapp. You can customize it as you like as well. RainbowKit supports a good number of wallets it can also resolve addressesaddress to ENS and display balance, and much more! Rainbowkit rely on [ethers](https://github.com/ethers-io/ethers.js) and [wagmi](https://wagmi.sh).

- Set up your development environment

1. Install Node.js and NPM (Node Package Manager) on your machine.
2. Install the Celo Extension Wallet on your browser or add Celo test network (Alfajores) to your MetaMask Wallet

If you will like to see the complete code, here is the Github link [charity dApp on celo](https://github.com/amoweolubusayo/charity-celo)

## Creating your project using Celo Composer

In your terminal, run the following command

`npx @celo/celo-composer create `

We are working with React so when prompted to choose a front-end framework, select React

![Select FE framework](https://i.imgur.com/WPCMTH0.png)

Next up, choose a web3 library for react app, select Rainbokit-celo

![Select web3 library](https://i.imgur.com/lSkmoz3.png)

We are using built-in contracts from Celo-Composer and will be selecting the Hardhat framework, so select Hardhat

![Select contract framework](https://i.imgur.com/ZUA2MKk.png)

For the next steps, we will be prompted to create a Subgraph. We willwould not be creating a subgraph, so go ahead to select No

![Subgraph](https://i.imgur.com/Wvir6rZ.png)

Then, proceed to give your project a name

![Project Name](https://i.imgur.com/6BInaOQ.png)

You did it! You just created a starter project dApp in a few minutes using Celo-Composer

![Project Creation](https://i.imgur.com/LZRt683.png)

Navigate to your project, and let's continue building.

## Building out the smart contract

In your IDE, drill-down packages to see the hardhat folder. Here we will see contracts folder with inbuilt contracts

![Vscode file explorer](https://i.imgur.com/KfOuJvO.png)

Open the SupportToken.sol as this is the one we will be using. Here is how the code looks like

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @notice A simple ERC20 Token implementation that also accepts donation for the project
 */
contract SupportToken is ERC20 {
    uint sentIn;
    address payable owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() ERC20("Support Token", "STT") {
        /// @notice mint 10000 tokens to the owner
        _mint(msg.sender, 10000e18);
        owner = payable(msg.sender);
        sentIn = 0;
    }

    function acceptDonation(uint amount)
        public
        payable
        returns (bool accepted)
    {
        require(amount == msg.value, "Invalid amount!");

        sentIn += msg.value;

        return true;
    }

    function withdrawChest() public onlyOwner returns (bool) {
        bool success = owner.send(address(this).balance);

        if (success) return true;

        return false;
    }
}
```

Basically, this contract allows users to donate to the project by sending funds to the contract address. It also allows the owner of the contract to withdraw the donated funds.

Create a .env file to store your environment variables, copy your private key from your Celo/Metamask wallet as applicable

```bash
CELO_NETWORK=https://alfajores-forno.celo-testnet.org

PRIVATE_KEY=YOUR_PRIVATE_KEY
```

Compile the contract by running the following command in the terminal

```bash
cd packages/hardhat/contracts
npm install --save-dev hardhat
npx hardhat compile
```

After a successful compilation, here is what you should see,

` Compiled x Solidity files successfully`

## Testing your Smart Contract

It is good practice to test your code. In the test folder, create a new file called support-token-test.js and test for different use cases like below

```javascript
import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";

describe("SupportToken", function () {
  let owner;
  let supportToken;

  beforeEach(async function () {
    // Get the owner of the contract
    [owner] = await ethers.getSigners();

    // Deploy the SupportToken contract
    const supportTokenFactory = await ethers.getContractFactory(
      "SupportToken",
      owner
    );
    supportToken = await supportTokenFactory.deploy();

    // Wait for the contract to be mined
    await supportToken.deployed();
  });

  it("should mint 10000 tokens to the owner", async function () {
    const balance = await supportToken.balanceOf(await owner.getAddress());
    expect(balance).to.equal(10000 * 10 ** 18);
  });

  it("should accept donation and update sentIn variable", async function () {
    const donationAmount = 1000;

    // Send a donation to the contract
    await owner.sendTransaction({
      to: supportToken.address,
      value: donationAmount,
    });

    // Check that the sentIn variable has been updated correctly
    const sentIn = await supportToken.sentIn();
    expect(sentIn).to.equal(donationAmount);
  });

  it("should withdraw donation to owner's address", async function () {
    const donationAmount = 1000;

    // Send a donation to the contract
    await owner.sendTransaction({
      to: supportToken.address,
      value: donationAmount,
    });

    // Get the initial balance of the owner's address
    const initialBalance = await owner.getBalance();

    // Withdraw the donation to the owner's address
    await supportToken.withdrawChest();

    // Check that the owner's address balance has been updated correctly
    const expectedBalance = initialBalance.add(donationAmount);
    const actualBalance = await owner.getBalance();
    expect(actualBalance).to.equal(expectedBalance);
  });
});
```

## Deploying your Smart Contract

Deploy the contract to the network by creating a deploy.js file in the scripts directory

```bash
cd packages/hardhat/scripts
```

```javascript
const hre = require("hardhat");

async function main() {
  const SupportToken = await hre.ethers.getContractFactory("SupportToken");
  const supportToken = await SupportToken.deploy();
  await supportToken.deployed();
  console.log("SupportToken address deployed to:", supportToken.address);
}

main();
```

Then run this command

`npx hardhat --network alfajores run scripts/deploy.js`

After a successful deployment, you would see the message

```bash
SupportToken address deployed to: 0x188AB17e37aF04a43f69f1454Fc4caC3edd3Af2D
```

You can also verify your contract on https://alfajores.celoscan.io

![Alfajores explorer](https://i.imgur.com/O4jjcBz.png)

## Creating your frontend

Let us now start out our React frontend, we start by navigating to the react-app folder after the hardhat folder.

![FE](https://i.imgur.com/9fBFUOw.png)

Rainbowkit has saved us the stress of writing functionalities for connecting wallet, we can see this in our` HeaderRK.tsx` file under components

```javascript
import { ConnectButton } from "@rainbow-me/rainbowkit";
```

For starters, we need the web3 package so let's start by installing that running this command

`npm install web3`

Go to components folder and create a new component, you can call it Charities.tsx. In your component, import React like this

```javascript
import React, { useState } from "react";
```

Then, create a charity card with props making your code look like this

```typescript
type CharityCardProps = {
  imageSrc: string;
  name: string;
  description: string;
  address: string;
  onDonate: (amount: string) => void;
  donated: boolean
};

const CharityCard = ({
  imageSrc,
  name,
  description,
  address,
  onDonate,
}: CharityCardProps) => {
  const [donationAmount, setDonationAmount] = useState("");
```

Create a variable charities as well with values

```typescript
const charities = [
  {
    name: "British Heart Foundation",
    description: "Description of Charity 1",
    address: "0x1234...",
    imageSrc: "https://via.placeholder.com/150?text=Charity+1",
  },
  {
    name: "World Vision UK",
    description: "Description of Charity 2",
    address: "0x5678...",
    imageSrc: "https://via.placeholder.com/150?text=Charity+2",
  },
  {
    name: "Save the Children",
    description: "Description of Charity 3",
    address: "0x9abc...",
    imageSrc: "https://via.placeholder.com/150?text=Charity+3",
  },
];
```

The rest of the code can look like this

```javascript
const Charities = () => {
  const handleDonate = (amount: string) => {
    // Send donation to the charity address
  };

  return (
    <div className="container">
      <div className="row">
        {charities.map((charity, index) => (
          <div key={index} className="col-md-4">
            <CharityCard {...charity} onDonate={handleDonate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charities;
```

Eventually, your code should look like this

```typescript
import React, { useState } from "react";
import { donate } from "../../../SupportTokenWrapper";

type CharityCardProps = {
  imageSrc: string;
  name: string;
  description: string;
  address: string;
  onDonate: (amount: string, address: string) => void;
  donated: boolean;
};

const CharityCard = ({
  imageSrc,
  name,
  description,
  address,
  onDonate,
}: CharityCardProps) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [donationAddress, setDonationAddress] = useState("");
  const handleDonationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDonate(donationAmount, donationAddress);
    setDonationAmount("");
    setDonationAddress("");
  };

  return (
    <div className="card">
      <img src={imageSrc} alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text mt-4">{description}</p>
        <form onSubmit={handleDonationSubmit}>
          <div className="form-group mt-4">
            <label htmlFor="donationAmount">Enter Recipient Address: </label>
            <input
              type="text"
              className="form-control"
              id="donationAddress"
              value={donationAddress}
              onChange={(event) => setDonationAddress(event.target.value)}
            />
            <label htmlFor="donationAmount" className="mt-4">
              Enter donation amount:{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="donationAmount"
              value={donationAmount}
              onChange={(event) => setDonationAmount(event.target.value)}
            />
          </div>
          <button className="bg-blue-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-blue-600">
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

const charities = [
  {
    name: "British Heart Foundation",
    description:
      "Your donation can help us fight against heart diseases and support the millions of people affected by them.",
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    imageSrc:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhcml0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "World Vision UK",
    description:
      "Your donation can help us provide life-saving aid to those in need, and work towards a world where every child has the opportunity to thrive.",
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    imageSrc:
      "https://images.unsplash.com/photo-1608555855762-2b657eb1c348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNoYXJpdHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Save the Children",
    description:
      "Your donation can help us provide education, healthcare, and emergency. Be the change you want to see",
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    imageSrc:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hhcml0eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const Charities = () => {
  const [donated, setDonated] = useState(false);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDonate = async (amount: string, address: string) => {
    try {
      console.log("got here");
      try {
        await donate(amount, address);
        alert("donation successful");
        console.log("here again");
      } catch (error) {
        console.error(error);
      }
      // Update the UI to show the donation was successful
      setDonated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex flex-wrap -mx-4">
        {charities.map((charity, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <CharityCard
              {...charity}
              onDonate={handleDonate}
              donated={donated}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charities;
```

Create a wrapper that handles the contract so in your root folder, create a SupportTokenWrapper.js file and call your contract

```javascript
export async function getContract() {
  console.log("hey");
  const contractAddress = "0x188AB17e37aF04a43f69f1454Fc4caC3edd3Af2D";
  const contractABI = abi;
  let supportTokenContract;
  try {
    const { ethereum } = window;
    console.log(ethereum.chainId);
    if (ethereum.chainId === "0xaef3") {
      const provider = new providers.Web3Provider(ethereum);
      console.log("provider", provider);
      const signer = provider.getSigner();
      supportTokenContract = new Contract(contractAddress, contractABI, signer);
    } else {
      throw new Error("Please connect to the Alfajores network");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  console.log(supportTokenContract);
  return supportTokenContract;
}

export async function donate(amount) {
  // Approve the transfer of donation amount to the charity address

  const contract = await getContract();
  const approvalTx = await contract.approve(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    amount
  );
  console.log(await contract);
  console.log(await approvalTx);
  // Transfer tokens to another account
  const transferTx = await contract.transfer(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    amount
  );
  console.log("Transfer transaction hash: ", transferTx.transactionHash);
  const finalTx = await contract.acceptDonation(amount, {
    value: amount,
  });
}
```

From here, notice the 2 transactions that will happen, first we will grant permission to access funds, next is transferring the funds from the donators account to the receivers address.

Run your application by using this command

```bash
npm run dev
```

Your application will look like this

![Project interface](https://i.imgur.com/QA8JVdp.png)

To see RainbowKit in action, click on connect the wallet to see a variety of wallets to choose from, then proceed to choose the one applicable to you

![Rainbowkit interface](https://i.imgur.com/98oXx2f.png)

![Project interface after wallet connection](https://i.imgur.com/lr2iMmZ.png)

Fill in the donation amount in any charity of your choice and click donate. Your wallet will pop up as so, to first give access to funds

![Metamask trans1](https://i.imgur.com/4uev7TB.png)

![Metamask trans2](https://i.imgur.com/AoKZvOa.png)

And then send to the receiving account

![Metamask trans3](https://i.imgur.com/XkxAslx.png)

If you look through your wallet transactions, you will find these

![Metamask](https://i.imgur.com/aVxYvXD.png)

The recipient can confirm the tokens in their wallet as well by importing the token with the contract address 0x188AB17e37aF04a43f69f1454Fc4caC3edd3Af2D for this demo and check

![Metamask](https://i.imgur.com/dmZwxwy.png)

Great job! You just created a simple charity donation dApp with Celo Composer and React Rainbowkit!

## Conclusion

In this article, you learnt how to set up your development environment, create a project using Celo Composer, build your smart contract, test it, and integrate the RainbowKit library. This is really helpful if you are curious in making a practical dapp using Celo Composer.

## Reference

[Celo Composer Github](https://github.com/celo-org/celo-composer)

[Rainbowkit docs](https://www.rainbowkit.com/docs/introduction)

[Charity dApp on celo](https://github.com/amoweolubusayo/charity-celo)

## About the Author

Busayo is a software engineer, a technical writer and a blockchain developer advocate passionate about building thriving developer communities.
[Linkedin](https://linkedin.com/in/amoweolubusayo) | [Twitter](https://twitter.com/Amowe) | [Hashnode](https://amoweolubusayo.hashnode.dev)
