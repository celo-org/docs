---
title: Creating ERC20 token on Celo - An Overview of the Celo Ecosystem
description: Learn how to create an ERC20 token on the Celo blockchain using Remix IDE. Perfect for new and intermediate Web3 developers.
authors:

- name: Elijah Sorinola
  title: Content Writer, Celo Sage
  image_url: https://avatars.githubusercontent.com/u/86154565?v=4
  tags: ["intermediate", "solidity", "celosage", "erc20"]
  hide_table_of_contents: false
  slug: /tutorials/creating-erc20-token-on-Celo
---
![header](../../src/data-tutorials/showcase/celo-sage.png)

## 🌱 Introduction

[Celo](https://blog.celo.org/an-introductory-guide-to-celo-b185c62d3067) is an open-source blockchain platform focused on enabling mobile-first financial applications. It aims to make decentralized finance (DeFi) more accessible to everyone, especially those in emerging markets. In this tutorial, we will provide an overview of the Celo ecosystem and demonstrate how to create and deploy an ERC20 token on Celo using Remix IDE.

## Prerequisites

Before we start, you will need the following:

- Basic knowledge of Solidity programming language.
- Remix IDE installed on your computer.
- Celo wallet connected to the Alfajores testnet.

## Requirement 

- A computer with internet access
- A Celo wallet (such as the Celo Wallet app or Valora)
- Basic knowledge of Solidity and Ethereum smart contracts
- Remix IDE
- A browser with MetaMask installed (for testing on a testnet)
- NodeJS version 12.0.1 or higher installed (for deployment to a testnet or mainnet)

## Overview of Celo Ecosystem

Celo is built on the Ethereum codebase and is fully compatible with the Ethereum Virtual Machine (EVM). It uses a proof-of-stake consensus mechanism and has a stable value asset called Celo Gold (cGLD) that is used for transaction fees and governance.

Celo also has a mobile-first approach, making it easy to build mobile applications that can interact with the blockchain. It has its own built-in wallet, called Valora, which can be used to send and receive payments, as well as to access decentralized applications (dapps) on the Celo platform.

## Creating an ERC20 Token on Celo

Now that we have a basic understanding of the Celo ecosystem, let's create an ERC20 token on Celo.

### Step 1: Create a New Contract in Remix IDE

1. Open Remix IDE and create a new file called "MyToken.sol".
2. Paste the following code into the file-

```
SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
constructor(uint256 initialSupply) ERC20("My Token", "MTK") {
_mint(msg.sender, initialSupply);
}
}
```

This code imports the ERC20 contract from OpenZeppelin and creates a new contract called "MyToken". The constructor function initializes the token with a name of "My Token" and a symbol of "MTK", and mints the initial supply of tokens to the contract deployer.


### Step 2: Compile and Deploy the Contract

1. In Remix IDE, select "Solidity" as the compiler and choose version 0.8.0.
2. Click on the "Compile" button to compile the contract.
3. Navigate to the "Run" tab and select "Injected Web3" as the environment.
4. Connect your Celo wallet to Remix IDE by clicking on the "Connect to Web3" button.
5. In the "Deploy & Run Transactions" section, select the "MyToken" contract.
6. Specify the initial supply of tokens in the "initialSupply" field.
7. Click on the "Transact" button to deploy the contract.

### Step 3: Interact with the Contract on Celo

1. Copy the contract address from Remix IDE.
2. Open the Celo wallet and navigate to the "Contracts" tab.
3. Click on "Add Contract" and paste the contract address in the "Contract Address" field.
4. Click on "Access".
5. Now, you can interact with your contract using the Celo wallet.

### Testing the Token Contract

Now that we have deployed our ERC20 token contract on Celo, let's test it out.

1. Open the Celo wallet and navigate to the "Contracts" tab.
2. Select the deployed contract and click on "Interact".
3. In the "Transfer" section, enter the recipient address and the amount of tokens you want to send.
4. Click on "Write".
5. Confirm the transaction on your Celo wallet.
6. The recipient should now have received the specified amount of tokens.

Congratulations! You have successfully created and deployed an ERC20 token on Celo.


## Conclusion

In this tutorial, we have provided an overview of the Celo ecosystem and demonstrated how to create and deploy an ERC20 token on Celo using Remix IDE. We hope this tutorial has been useful for new and intermediate Web3 developers looking to explore the Celo platform.

For more information on Celo, check out the following resources-

- Celo official website
- Celo developer documentation
- Celo Discord community
- OpenZeppelin ERC20 documentation for more information on the ERC20 token standard.

Happy coding!

## What's Next?

Here are some resources and links to help you create an ERC20 token on the Celo ecosystem:

1. [Celo Documentation - Token Contract](https://docs.celo.org/celo-codebase/protocol/smart-contracts/token-contracts): This is the official documentation for creating a token contract on Celo. It covers everything you need to know about creating a token, including creating the contract, defining token parameters, and deploying the contract.

2. [Celo Studio](https://celo.org/developers/studio/): Celo Studio is an integrated development environment (IDE) that makes it easy to create, test, and deploy smart contracts on the Celo platform. It has a user-friendly interface and provides a lot of useful tools and features for developers.

3. [Solidity Language Documentation](https://solidity.readthedocs.io/): Solidity is the programming language used to write smart contracts on the Ethereum and Celo platforms. This documentation provides a detailed explanation of the language, its syntax, and its features.

4. [Remix](https://remix.ethereum.org/): Remix is a web-based IDE for writing and testing smart contracts. It has a lot of features that make it easy to write, debug, and deploy smart contracts on the Celo platform.

5. [OpenZeppelin](https://openzeppelin.com/contracts/): OpenZeppelin is a library of reusable smart contracts that make it easy to create secure and reliable smart contracts. It includes a set of ERC20 token contracts that you can use as a starting point for your own token.

I hope you find these resources helpful in creating your ERC20 token on the Celo ecosystem.

## About the Author

Elijah Sorinola

Content Marketing Strategist for Blockchain, Cryptocurrency, and Web3 brands. [Let's connect.](https://www.linkedin.com/in/sorinola/)

## Reference

- [Celo official website](https://celo.org/)
- [Celo developer documentation](https://docs.celo.org/)
- [Remix IDE](https://remix.ethereum.org/)
- [Solidity documentation](https://docs.soliditylang.org/en/v0.8.19/)
- [OpenZeppelin ERC20 documentation](https://docs.openzeppelin.com/contracts/3.x/api/token/erc20)
- [Truffle Suite](https://trufflesuite.com/docs/truffle/overview)
