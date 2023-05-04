---
title: Getting Started with Celo; A Beginner's Guide
description: 
authors:
  - name: ✍️ Joshua Obafemi
  - title: Technical Writer
  - url: https://github.com/jorshimayor
  - image_url: https://github.com/jorshimayor.png
tags: [celosage, celo, advanced, solidity, javascript]
hide_table_of_contents: true
slug: "/tutorials/getting-started-with-celo"
---



# Introduction

Celo is a blockchain platform that aims to provide a decentralized financial infrastructure to millions of people across the globe. It is built on top of the Ethereum network and utilizes smart contracts to enable secure, fast, and low-cost transactions.

In this beginner's guide, we'll cover the basics of Celo and walk you through the process of setting up your development environment and building your first Celo smart contract.

# Prerequistes

# Requirements

# Getting Started:

Before we dive into the technical aspects of Celo, let's take a look at some of the key concepts you need to understand:

1. Celo Blockchain: The underlying blockchain technology that powers the Celo platform.
2. Celo Network: A network of nodes that work together to maintain the Celo blockchain.
3. Smart Contracts: Self-executing contracts that are stored on the blockchain and can automate the exchange of assets, data, and other valuable resources.
4. Celo Wallet: A digital wallet that enables users to send and receive Celo, Celo Dollars, and other digital assets.
5. Gas Fees: Fees paid to miners to process transactions on the Celo blockchain.

Now, let's get started with building your first Celo smart contract.

Setting Up Your Development Environment:

To get started with Celo development, you'll need to set up your development environment. Here's what you'll need:



1. Node.js: A JavaScript runtime environment that allows you to run JavaScript on the server-side.
2. CeloCLI: A command-line interface tool that allows you to interact with the Celo blockchain.
3. Visual Studio Code: A lightweight code editor that provides an intuitive and powerful interface for writing code.

Once you have these tools installed, you're ready to start building your first Celo smart contract.

Building Your First Celo Smart Contract:

In this section, we'll walk you through the process of building a simple smart contract that enables users to send and receive Celo.



## Step 1: Create a new project directory and initialize it with npm:

```bash
mkdir my-celo-project 
cd my-celo-project 
npm init
```


## Step 2: Install the Celo contract kit and dependencies:

```bash
npm install --save @celo/contractkit dotenv
```



## Step 3: Create a new file called "index.js" and add the following code:

```javascript
require('dotenv').config()

const ContractKit = require('@celo/contractkit')

const kit = ContractKit.newKit('https://forno.celo.org')

async function main() {
  // Connect to the Celo network
  const accounts = await kit.web3.eth.getAccounts()

  console.log(accounts)
}

main()
```



## Step 4: Run the script using Node.js:

```bash
node index.js
```

If everything is working correctly, you should see a list of accounts printed to the console.



## Step 5: Create a new file called "my-contract.js" and add the following code:

```javascript
const MyContract = artifacts.require('MyContract')

module.exports = async function (deployer) {
  await deployer.deploy(MyContract)
}
```



## Step 6: Create a new file called "deploy_contracts.js" and add the following code:

```javascript
const MyContract = artifacts.require('MyContract')

module.exports = async function (deployer) {
  await deployer.deploy(MyContract)
}
```

## Step 7: Deploy your smart contract to the Celo network:

```bash
npx truffle migrate --network alfajores
```

Congratulations! You've just deployed your first Celo smart contract.




# Conclusion

In this beginner's guide, we covered the basics of Celo and walked you through the process of setting up your development environment and building your first Celo smart contract



# Next Steps



# About the Author

Joshua Obafemi

I'm a Web3 fullstack developer and technical writer. You can connect with me on [GitHub](https://github.com/jorshimayor), [Twitter](https://twitter.com/jorshimayor), [Linkedin](https://www.linkedin.com/in/joshua-obafemi-ba2014199/).