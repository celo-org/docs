---
title: Deploy with Remix
description: How to deploy a Smart Contract to Celo using remix.ethereum.org.
---

# Deploy on Celo with Remix

How to deploy a smart contract to Celo testnet, mainnet, or a local network using [Remix](https://remix.ethereum.org/).

---

## Introduction to Remix

The [Remix IDE](https://remix-project.org/) is an open-source web and desktop application for creating and deploying Smart Contracts. Originally created for Ethereum, it fosters a fast development cycle and has a rich set of plugins with intuitive GUIs. Remix is used for the entire journey of contract development and is a playground for learning and teaching Celo.

In this guide, you will learn to deploy a smart contract on Celo using [remix.ethereum.org](http://remix.ethereum.org).

:::tip

To learn more about the features available to you as a smart contract developer with Remix, visit the [Remix documentation](https://remix-ide.readthedocs.io/en/latest/).

:::

## Create a Smart Contract

- Navigate to [remix.ethereum.org](http://remix.ethereum.org) and select **contracts > 1_Storage.sol** from the **File Explorers** pane.
- Review the smart contract code and learn more using the [Solidity docs](https://docs.soliditylang.org/en/latest/) or with [Solidity by Example](https://solidity-by-example.org/).
- Complete any changes to your smart contract and save the final version (Command/Ctrl + S).

![github](/img/doc-images/deploy-remix/image1.png)

## Compile the Contract

- Choose the **Solidity Compiler Icon** on the left side menu.
- Check that your compiler version is within the versions specified in the **pragma solidity statement**.
- Select the **Compile** button to compile your smart contract.

![github](/img/doc-images/deploy-remix/image2.png)

## Deploy the Contract

- Click the **Deploy and Run Transactions Icon** on the left side menu.
- Choose **Injected Web3** as your environment.
- [Connect MetaMask to Celo](/wallet/metamask/use) testnet and verify that the environment reads:
  - **Custom (44787) network** for Celo testnet
  - **Custom (42220) network** for Celo mainnet
- Click **Deploy** and select **Confirm** in the MetaMask notification window to pay for the transaction

![github](/img/doc-images/deploy-remix/image3.png)

## Interacting with the Contract

- Select the **dropdown** on the newly deployed contract at the bottom of the left panel.
- View the deployed contract’s functions using the **Deployed Contracts** window.
- Select functions to read or write on the Celo testnet using the function inputs as needed.
- Confirm write transactions in the **MetaMask Notification Window** to pay the transaction’s gas fee.

![github](/img/doc-images/deploy-remix/image4.png)

## View Contract Details

- Copy the contract address from the **Deployed Contracts** window on the left panel.
- Navigate to the [Celo Block Explorer](https://explorer.celo.org/) and use the contract address to search for your contract.
- Explore the details of your deployed smart contract and learn more about the explorer [here](http://docs.blockscout.com).

![github](/img/doc-images/deploy-remix/image6.png)

## Verify Contracts on Celo

- [Using Celo Explorer](/developer/verify/celo-explorer)
- [Using Remix](/developer/verify/remix)
- [Using CeloScan](/developer/verify/celoscan)
- [Using Hardhat](/developer/verify/hardhat)
