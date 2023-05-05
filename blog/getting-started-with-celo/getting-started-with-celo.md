---
title: Getting Started with Celo; A Beginner Guide
description: I walk readers through the process of setting up a Celo wallet and making their first transaction on the blockchain using Solidity and Javascript
authors:
  - name: ✍️ Joshua Obafemi
  - title: Technical Writer
  - url: https://github.com/jorshimayor
  - image_url: https://github.com/jorshimayor.png
tags: [celosage, celo, beginner, solidity, javascript]
hide_table_of_contents: true
slug: "/tutorials/getting-started-with-celo"
---

![header](blog\getting-started-with-celo\getting-started with-celo.png.png)

# Introduction

Celo is a blockchain platform that aims to provide a decentralized financial infrastructure to millions of people across the globe. It is built on top of the Ethereum network and utilizes smart contracts to enable secure, fast, and low-cost transactions.

In this beginner's guide, we'll cover the basics of Celo and walk you through the process of setting up your development environment and building your first Celo smart contract.




# Prerequistes
Before proceeding, you should read this articles:

- [Celo Concensus Mechanism](https://docs.celo.org/blog/tutorials/a-deep-dive-into-celo-consensus-mechanism)

- [Layer 1 and Layer 2 blockchains](https://docs.celo.org/blog/tutorials/an-introduction-to-layer-1-and-layer-2-blockchain-protocols)

- [Blockchain Basics](https://docs.celo.org/blog/tutorials/blockchain-basics-an-introduction-to-web3-terms-and-concepts-with-celo)



# Requirements
Before we dive into the tutorial, you will need the following tools and accounts:

- Visual Studio Code (VSCode) or any other code editor
- Node.js and npm (Node Package Manager) installed on your machine
- A Celo account with testnet funds (You can obtain testnet funds from the Celo Faucet)


# Getting Started:

Now, let's get started with building your first Celo smart contract.

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

In this beginner's guide, we covered the basics of Celo and walked you through the process of setting up your development environment, building and deploying your first Celo smart contract.



# Next Steps
Now that you have deployed your first Celo smart contract, you can go ahead and build more advanced applications on the Celo blockchain. Click [here](https://docs.celo.org/tutorials) to learn more.


# About the Author

Joshua Obafemi

I'm a Web3 fullstack developer and technical writer. You can connect with me on [GitHub](https://github.com/jorshimayor), [Twitter](https://twitter.com/jorshimayor), [Linkedin](https://www.linkedin.com/in/joshua-obafemi-ba2014199/).



# References

[Source Code](https://github.com/jorshimayor/First-Celo-Smart-Contract)