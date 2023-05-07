---
title: Creating A Custom Token On Celo
description: This article will walk readers through the process of creating a custom token on Celo's blockchain, using tools such as VSCode and the Celo ContractKit. 
authors:
  - name: ✍️ Joshua Obafemi
  - title: Technical Writer
  - url: https://github.com/jorshimayor
  - image_url: https://github.com/jorshimayor.png
tags: [celosage, celo, intermediate, solidity, javascript]
hide_table_of_contents: true
slug: "/tutorials/creating-a-custom-token-on-celo"
---



![header](blog\05-05-2023-creating-a-custom-token-on-celo\creating-a-custom-token-on-celo.png.png)



# Introduction

Celo is an open-source blockchain platform that allows developers to build decentralized applications (dApps) and financial tools. One of the key features of Celo is its ability to support custom tokens, which can be used to represent various assets such as currencies, loyalty points, or even real-world assets.

In this tutorial, we will walk you through the process of creating a custom token on Celo's blockchain, using Visual Studio Code (VSCode)  and the Celo ContractKit.




# Prerequisites
A basic understanding of Solidity and Javascript is required in this tutorial.




# Requirement
Before we dive into the tutorial, you will need the following tools and accounts:

- Visual Studio Code (VSCode) or any other code editor
- Node.js and npm (Node Package Manager) installed on your machine
- A Celo account with testnet funds (You can obtain testnet funds from the Celo Faucet)



# Getting Started
Now that you have the requirements, you can open your code editor and follow the following steps:


## Step 1: Set up your Celo account

To create a custom token on Celo, you will need a Celo account with testnet funds. You can create a Celo account and obtain testnet funds from the Celo Faucet. To set up your Celo account, follow the steps below:

1. Visit the Celo Wallet website [here](https://celo.org/developers/wallet).

2. Click on the "Create Account" button to create a new Celo account.

3. Follow the on-screen instructions to create your account and obtain testnet funds.

4. Once you have obtained testnet funds, copy your account address and private key. You will need these later in the tutorial.






## Step 2: Set up your development environment

To develop smart contracts on Celo, you will need to install the following tools on your machine:

- Node.js and npm (Node Package Manager)
- Visual Studio Code (VSCode) or any other code editor
- The Celo ContractKit

To install Node.js and npm, visit the official Node.js website [here](https://nodejs.org/en/) and download the latest version for your operating system.

To install VSCode, visit the official VSCode website [here](https://code.visualstudio.com/) and download the latest version for your operating system.






## Step 3: Create a new Celo project

To create a new Celo project, follow the steps below:

1. Open VSCode or your code editor of choice.

2. Create a new folder for your project.

3. Open a terminal or command prompt in your project folder.

4. Run the following command to initialize a new npm project:


```bash
npm init
```

5. Follow the on-screen instructions to set up your project.

6. Once your project is initialized, run the following command to install the Celo ContractKit:

```bash
npm install --save-dev @celo/contractkit
```

7. Once the installation is complete, you can use the Celo ContractKit to develop smart contracts on the Celo network.



## Step 4: Create a new token contract

To create a new token contract, follow the steps below:

1. Open the contracts folder in your project.

2. Create a new file named "MyToken.sol".

3. Open "MyToken.sol" in your code editor.

4. Add the following code to the file:


```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10**decimals());
    }
}
```

In this code , we import the ERC20 contract from the OpenZeppelin library, which provides a basic implementation of the ERC20 token standard. Then, we create a new contract called "MyToken" that inherits from the ERC20 contract.

Inside the constructor, we initialize the token's name and symbol using the ERC20 constructor, and then we mint 1,000,000 tokens to the contract deployer's address using the _mint function.

5. Save and close the file.




## Step 5: To create a .gitignore file for your project 

Follow these steps:

1. Open your project folder in your code editor.
2. Create a new file named `.gitignore`.
3. Open the `.gitignore` file in your code editor.
4. Add the following lines to the file:

```
# Dependencies
/node_modules

# Compiled output
/contracts/build
```

These lines will ignore the `node_modules` folder and the `contracts/build` folder, which contains compiled contract artifacts.

5. Save and close the file.

Note: If you are using a different folder structure or have additional files or folders that you want to exclude from version control, you can add them to the `.gitignore` file using the same format as above.




## Step 6: Compile and deploy the token contract

To compile and deploy the token contract, follow the steps below:

1. Open a terminal or command prompt in your project folder.

2. Run the following command to compile the contract:

```bash
npx truffle compile
```

3. Once the contract is compiled successfully, run the following command to deploy the contract to the Celo network:

```bash
npx truffle migrate --network alfajores --reset
```

4. Follow the on-screen instructions to confirm the transaction and deploy the contract.

5. Once the contract is deployed, you should see the contract address in the terminal output.







## Step 7: Verify the token contract

To verify the token contract on the Celo network, follow the steps below:

1. Open a terminal or command prompt in your project folder.

2. Run the following command to verify the contract:

```bash
npx truffle run verify MyToken --network alfajores
```

3. Follow the on-screen instructions to confirm the verification.

4. Once the verification is complete, you should see a success message in the terminal output.




## Step 8: Interact with the token contract

To interact with the token contract, you can use the Celo Wallet or any other wallet that supports the Celo network.

1. Open the Celo Wallet website at https://celowallet.app/.

2. Connect your wallet to the Celo network.

3. Once your wallet is connected, click on the "Add Token" button.

4. Enter the contract address of your token and the token symbol and decimal places (e.g., MTK, 18).

5. Once the token is added to your wallet, you can send and receive it like any other token on the Celo network.

Congratulations! You have successfully created a custom token on the Celo network and deployed it to the blockchain.





# Conclusion
In conclusion, creating a custom token on the Celo blockchain is a straightforward process that requires a few key tools and steps. By following this tutorial, you should have a good understanding of how to set up your development environment, create a new token contract, compile and deploy the contract to the Celo network, and interact with the contract using a wallet. With Celo's support for custom tokens, developers have the flexibility to create a wide range of decentralized financial applications and tools on the blockchain.



# Next Steps
The Celo program has other tutorials that helps you create other fascinating projects on the Celo blockchain, click [here](https://docs.celo.org/tutorials) to know more.



# About the Author

Joshua Obafemi

I'm a Web3 fullstack developer and technical writer. You can connect with me on [GitHub](https://github.com/jorshimayor), [Twitter](https://twitter.com/jorshimayor), [Linkedin](https://www.linkedin.com/in/joshua-obafemi-ba2014199/).

# References

[Source Code](https://github.com/jorshimayor/Celo-Token)
