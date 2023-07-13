---
title: Deploy with Truffle
description: How to deploy a Smart Contract to Celo using Truffle
---

# Deploy on Celo with Truffle

How to deploy a smart contract to Celo testnet, mainnet, or a local network using [Truffle](https://www.trufflesuite.com/).

---

## Introduction to Truffle

[Truffle](https://www.trufflesuite.com/) is a world-class development environment, testing framework, and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM). By creating a Truffle project and editing a few configuration settings you can easily deploy your project on Celo.

:::tip

To learn more about the features available to you as a smart contract developer with Truffle, visit the <a href="https://www.trufflesuite.com/docs">Truffle documentation</a>.

:::

## Prerequisites

To deploy on Celo using Truffle, you should have Celo set up Celo in your local environment. If you prefer to deploy without a local environment, you can deploy using Remix or Replit.

- [Using Windows](/developer/setup/windows)
- [Using Mac](/developer/setup/mac)
- [Using Replit](/developer/setup/replit)

If you are new to Truffle, complete the [Celo truffle installation instructions](/developer/setup/mac#truffle) and complete their [Quickstart Tutorial](https://www.trufflesuite.com/docs/truffle/quickstart) to get more familiar with this tool.

## Project Setup

**Setup Project Folder**

Open your terminal window, create a project directory, and navigate into that directory.

```shell
mkdir myDapp && cd myDap
```

**Install hdwallet-provider**

From your root truffle project directory, install [truffle/hdwallet-provider](https://github.com/trufflesuite/truffle/blob/develop/packages/hdwallet-provider/README.md#:~:text=HD%20Wallet%2Denabled%20Web3%20provider,12%20or%2024%20word%20mnemonic.). This allows you to sign transactions for addresses derived from a mnemonic. You’ll use this to connect to Celo in your truffle configuration file.

```shell
npm install @truffle/hdwallet-provider --save
```

**Initialize Truffle**

Initializing truffle creates the scaffolding for your truffle project.

```shell
truffle init
```

**Open Project**

Open your project in [Visual Studio code](https://code.visualstudio.com/) or your preferred IDE.

```shell
code .
```

:::tip

You can launch VS Code from the command line by <a href="https://code.visualstudio.com/docs/setup/mac">installing it in your shell path</a>.

:::

## Write Project Code

**Create Smart Contract**

Create a file named **HelloCelo.sol **in the **contracts** directory and populate it with the Solidity code below.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract HelloWorld {
   string public greet = "Hello Celo!";
}
```

:::tip

If you would like to create a different smart contract or learn more about Solidity (the language for developing smart contracts) you can view the <a href="https://docs.soliditylang.org/en/v0.8.9/">Solidity docs</a> and <a href="https://solidity-by-example.org/">Solidity by Example</a>.

:::

**Migrations File**

Create a file named **2_deploy_contracts.js** in the **./migrations/** folder and populate it with the code below.

```js
var HelloCelo = artifacts.require("HelloCelo");

module.exports = function (deployer) {
  deployer.deploy(HelloCelo);
};
```

:::tip

If you created a different smart contract, update the variable name, file requirement, and deployment accordingly to match your new contract.

:::

**Mnemonic .env**

If you don’t yet have a mnemonic or are unsure how to create one, see [Set up a Development Wallet](/developer/setup/wallet) for more details. When you’re ready, create a **.env** file in your root directory and populate it with your development wallet mnemonic (example below).

```text
MNEMONIC="turtle cash neutral drift brisk young swallow raw payment drill mail wear penalty vibrant entire adjust near chapter mistake size angry planet slam demand"
```

This mnemonic is used by **HDWalletProvider** in the **truffle.config** file to verify the account supplying funds during contract deployment. (See lines 21 & 69.)

**Create .gitignore file**

It is important to hide your mnemonic and other important files while developing Celo applications. When using Git or GitHub, you can populate a **.gitignore** file with the code below to ensure you don’t accidentally publish these files.

Create a **.gitignore** file in your root directory and populate it with the code below.

```
# dependencies
/node_modules

# Mac users
.DS_Store

#hidden files
.env
```

:::tip

See <a href="https://help.github.com/articles/ignoring-files/">ignoring files</a> for more information.

:::

## Configure Deployment Settings

The default **truffle.config.js** file contains connections required to deploy to the Ethereum networks, imports **HDWalletProvider**, and connects to the mnemonic in your **.env** file. To deploy a Celo network, you need to update this configuration file to point toward the different Celo networks and add a few details specific to Celo best practices.

You can see an example repo [here](https://github.com/critesjosh/celo-contracts-workshop).

**Update the truffle-config.js file**

Open [truffle-config.js](https://www.trufflesuite.com/docs/truffle/reference/configuration#:~:text=Your%20configuration%20file%20is%20called,necessary%20to%20create%20your%20configuration.&text=js%20contained%20by%20the%20barebones%20project%20that%20truffle%20init%20creates.) in a text editor and replace its contents with this [Celo configuration code](https://github.com/celo-org/DevRel/blob/main/configuration/truffle-config.js). This code is similar to Truffle settings with a few configuration updates needed to deploy to a Celo network.

**Connect to a Development Network**

Using Celo Ganache CLI creates test accounts at the localhost on port 7545. The private network setup connects to your localhost on this port and gives you access to your accounts on ganache-cli.

```js
local: {
  host: "127.0.0.1",
  port: 7545,
  network_id: "*"
}
```

:::tip

If you choose to [Set up a Development Wallet](/developer/setup/wallet), your blockchain will also be running on a private development network on localhost. This same configuration can be used to connect to the local development chain.

:::

**Connect to Testnet using Forno**

Using [Forno](/network/node/forno) allows you to connect to the Celo test blockchain without running a local node. The testnet configuration uses Forno to connect you to the Celo Testnet (Alfajores) using HDWalletProvider and the mnemonic stored in your **.env** file.

```js
testnet: {
  provider: function() {
    return new HDWalletProvider(process.env.MNEMONIC, "https://alfajores-forno.celo-testnet.org")
  },
  network_id: 44787,
  gas: 20000000
}
```

**Connect to Mainnet using Forno**

Using [Forno](/network/node/forno) also allows you to connect to the Celo main blockchain without running a local node. The mainnet configuration uses Forno to connect you to the Celo Mainnet using HDWalletProvider and the mnemonic stored in your **.env** file.

```js
mainnet: {
  provider: function() {
    return new HDWalletProvider(process.env.MNEMONIC, "https://forno.celo.org")
  },
  network_id: 42220,
  gas: 4000000
}
```

:::tip

[Forno](/network/node/forno) is a cLabs hosted node service for interacting with the Celo network. This allows you to connect to the Celo Blockchain without having to run your own node.

:::

## Deploy Smart Contract

### Compile and Migrate

**Compile Contract**

Compile the Solidity code into Ethereum bytecode prior to deploying the contract. The following truffle command will compile any new or updated Solidity (.sol) contracts found in **./contracts**.

```shell
truffle compile
```

:::tip

Learn more about compiling contracts with Truffle <a href="https://www.trufflesuite.com/docs/truffle/getting-started/compiling-contracts">here</a>.

:::

**Migrate Contract**

Migrations are JavaScript files that help you deploy contracts to the Ethereum network. To run your migrations, run the following:

```shell
truffle migrate
```

:::tip

Learn more about Truffle migrations <a href="https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations">here</a>.

:::

### Deploy Contract

Deploy to your chosen Celo network running one of the following commands.

```shell
truffle deploy --network alfajores
```

```shell
truffle deploy --network celo
```

```shell
truffle deploy --network local
```

### Deploy with --reset

Use the **---reset** flag to redeploy contracts with a new contract address if you haven't made any code changes.

```shell
truffle deploy --network NETWORK --reset
```

```shell
truffle migrate --network NETWORK --reset
```

:::tip

Save contract addresses for future reference. If you lose it, proceed to block explorer to review your wallet transactions for contract creation and its response. Truffle saves deployment information, like transaction hashes and contract addresses, in JSON files in `./build/contracts/`.

:::

## View Contract Deployment

Copy your **contract address** from the terminal and navigate to the [block explorer](https://explorer.celo.org/) to search for your deployed contract. Switch between networks to find your contract using the dropdown by the search bar.

**View Deployed Contract**

Navigate to [BlockScout](https://explorer.celo.org/) and select the network of your deployed contract.

- Paste your contract address from the **terminal window** and search for it in **BlockExplorer**.

:::tip

Learn more about exploring the Celo network and smart contract details in BlockScout <a href="https://docs.blockscout.com/">here</a>.

:::

## Verify Contracts on Celo

- [Using Celo Explorer](/developer/verify/celo-explorer)
- [Using Remix](/developer/verify/remix)
- [Using CeloScan](/developer/verify/celoscan)
- [Using Hardhat](/developer/verify/hardhat)
