---
title: Deploy with Remix
description: Learn to deploy a Smart Contract to Celo using remix.ethereum.org.  
---

The [Remix IDE](https://remix-project.org/) is an open-source web and desktop application for creating and deploying Smart Contracts. Originally created for Ethereum, it fosters a fast development cycle and has a rich set of plugins with intuitive GUIs. Remix is used for the entire journey of contract development and is a playground for learning and teaching Celo. 

In this guide, you will learn to deploy a smart contract on Celo using [remix.ethereum.org](http://remix.ethereum.org).

:::note

To learn more about the features available to you as a smart contract developer with Remix, visit the [Remix documentation](https://remix-ide.readthedocs.io/en/latest/).

:::

## Step 1: Create a Smart Contract

Navigate to [remix.ethereum.org](http://remix.ethereum.org) and select **contracts > 1_Storage.sol** from the **File Explorers** pane.

Review the smart contract code and learn more using the [Solidity docs](https://docs.soliditylang.org/en/latest/) or with [Solidity by Example](https://solidity-by-example.org/).

Complete any changes to your smart contract and save the final version (Command/Ctrl + S).

![remix solidity editor](/img/docusaurus.png)

## Step 2: Compile the Contract

Choose the **Solidity Compiler Icon** on the left side menu.

Check that your compiler version is within the versions specified in the **pragma solidity statement**.

Select the **Compile** button to compile your smart contract.

![compile Solidity](/img/docusaurus.png)

## Step 3: Deploy the Contract

Click the **Deploy and Run Transactions Icon** on the left side menu.

Choose **Injected Web3** as your environment.

[Connect MetaMask to Celo](/getting-started/wallets/using-metamask-with-celo) testnet and verify that the environment reads:

- **Custom (44787) network** for Celo testnet
- **Custom (42220) network** for Celo mainnet

Click **Deploy** and select **Confirm** in the MetaMask notification window to pay for the transaction

![deploy contract](/img/docusaurus.png)

## Step 4: Interacting with the Contract

Select the **dropdown** on the newly deployed contract at the bottom of the left panel.

View the deployed contract’s functions using the **Deployed Contracts** window.

Select functions to read or write on the Celo testnet using the function inputs as needed.

Confirm write transactions in the **MetaMask Notification Window** to pay the transaction’s gas fee.

![contract interaction](/img/docusaurus.png)

## Step 5: View Contract Details

Copy the contract address from the **Deployed Contracts** window on the left panel.

Navigate to the [Celo Block Explorer](https://explorer.celo.org/) and use the contract address to search for your contract.

Explore the details of your deployed smart contract and learn more about the explorer [here](http://docs.blockscout.com).

![contract on block explorer](/img/docusaurus.png)

## Step 6: Verify the Smart Contract

Verifying a smart contract allows anyone to review your code from within the Celo Block Explorer. This can be done using the Remix Sourcify Plugin.

Navigate back to the **Remix IDE**, select **Plugin Manager** from the left side menu.

Search for **Sourcify**, click Activate, and open the newly installed **Sourcify Plugin**.

Choose Verifier, select the dropdown menu, and choose the location for your deployed contract (example **Celo (Alfajores)**).

Paste your contract address into the **Contract Address** field and select **Verify**.

:::note

The source code of the contract that you are verifying will need to be in Remix. Contracts deployed with Truffle, Hardhat, and other tools can also be verified using the Remix Sourcify plugin, but you will need to copy your contract source code into Remix first.

:::

![sourcify plugin](/build/img/docusaurus.png)

Navigate to the **Contract Address Details Page** in the block explore to, use the **Code, Read Contract**, and **Write Contract** panels to view and interact with your deployed smart contract.