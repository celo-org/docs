---
title: Deploy with Truffle
description: Learn to deploy a smart contract to Celo testnet, mainnet, or a local network using Truffle.  
---

[Truffle](https://www.trufflesuite.com/) is a world-class development environment, testing framework, and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM). By creating a Truffle project and editing a few configuration settings you can easily deploy your project on Celo.

:::note

To learn more about the features available to you as a smart contract developer with Truffle, visit the [Truffle documentation](https://www.trufflesuite.com/docs).

:::

## Prerequisites

To deploy on Celo using Truffle, you should have Celo set up Celo in your local environment. If you prefer to deploy without a local environment, you can deploy using Remix or Replit.

- [Using Windows](/developer-guide/start/develop-on-windows)
- [Using Mac](./using-mac.md)

If you are new to Truffle, complete the [Celo truffle installation instructions](./using-mac.md#truffle) and complete their [Quickstart Tutorial](https://www.trufflesuite.com/docs/truffle/quickstart) to get more familiar with this tool.

## Step 1: Project Setup

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

Open your project in Visual Studio code or your preferred IDE.

```shell
code .
```

:::note

You can launch VS Code from the command line by installing it in your shell path.

:::