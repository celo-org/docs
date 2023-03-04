---
title: How to write a multi-signatures contract on Celo using Hardhat | Part 1/2
description: Building a multi-signatures contract on Celo blockchain using Hardhat, multi-signatures are one of the best way to keep your crypto assets or ownership of your contracts safe and remove a central point of failure.
authors:
  - name: Marc-Aurèle Besner
    title: 🚀 Full-Stack Web3 & Solidity Engineer
    url:   https://github.com/marc-aurele-besner
    image_url:  https://avatars.githubusercontent.com/u/82244926?v=4
tags: [celo,solidity,smartcontract,hardhat,advanced]
hide_table_of_contents: false
slug: "/tutorials/how-to-write-a-multi-signatures-contract-on-celo-using-hardhat-part-1-2"
---
<!--
![header](../../src/data-tutorials/showcase/advanced/how-to-write-a-multi-signatures-contract-on-celo-using-hardhat-part-1-2.png)
 -->
## Introduction

In this tutorial we will write a multi-signatures smart contracts, in Solidity, using Hardhat. Multi-Signatures are way to secure your crypto assets and secure the ownership of your smart contract. The multi-signatures will act as a wallet in itself, able to execute transaction to transfer ethereum or call other smart contract. Ideally we will set multiple owners for this multi-signatures contract and so for any transaction to be executed by this contract, multiple private keys need to sign the transaction.

So if one of your private key ever get compromised, your funds and contract ownership are still safe as multiple private keys (wallet) are still required. This contract can also be used to decentralize the ownership of a contract between the different team member.

## Prerequisites

- A GitHub account [GitHub](https://github.com)
- Some knowledge of [Solidity](https://docs.soliditylang.org)
- Understanding of the multi-signatures concept (you can read more [What Is a Multisig Wallet?](https://www.coindesk.com/learn/what-is-a-multisig-wallet/))
- Multi-Signature language:

  - **owners**      - addresses that can sign and executes transactions on this wallet contract
  - **threshold**   - amount of owners signatures require for a transaction to be executed
  - **nonce**       - a unique number that identify each request to prevent signatures to be use on more than one transaction

## Requirements​

- Node.js [Node.js](https://nodejs.org/)
- VS Code [VS Code](https://code.visualstudio.com/)

## Creating a GitHub repository, cloning it and setting up Hardhat

### Create a Github repository

Go on [GitHub](https://github.com), on the top right, click on your profile picture, then on **Your repository**.
> **Note**
> If you don't have a GitHub account, create one [GitHub Sign-up](https://github.com/signup)

![Your repository](./images/github_your_repository.png)

On your GitHub account, in your repository, click on **New**

![Create a new repository](./images/create_a_new_repository.png)

Fill in the details of the repository, give it a **name**, a **description**, select the **visibility** and a **license**.
Then click on **Create repository**

![Repository details](./images/create_a_new_repository_detail.png)

### Clone the repository on your computer

Now that you have created a repository for this project, copy the repository url by clicking on **Code**

![Copy Repository URL](./images/create_a_new_repository_git_url.png)

Now open VS Code and open a new termianl, you can press Ctrl. + Shift + P to get the control pallet and search for **Create New Terminal** and enter or go in Terminal > New Terminal in the top bar.

![Control Pallet - New Terminal](./images/vs_code_create_new_terminal.png)

In the terminal clone your repository by typing

```bash
git clone <repository url>
```

![Cloning repository](./images/create_a_new_repository_git_clone.png)

This will have created a new folder with the name of your repo, so we need to move inside this folder, we can use File > Open Folder in the top bar or the cd command.

```bash
cd <repository name>
```

![CD in repository](./images/create_a_new_repository_cd.png)

Now that we are inside our project (our repository) let's initialize a Javascript project by running NPM init.
(Alternatively you can forgo the -y and set manually all the options.)

### Install and setup this Hardhat project

```bash
npm init -y
```

![NPM init](./images/npm_init.png)

Ounce it's done you should see a **package.json** file in the root of your project.
This file has basic information on your project and more importantly, it will keep track of all your project dependencies.

![NPM init created](./images/npm_init_created.png)


Now install Hardhat in your project, by running this command.

```bash
npm install hardhat --save-dev
```

![Install Hardhat](./images/npm_i_hardhat.png)

After running this, you should see **hardhat** in your package.json as devDependencies.

![Hardhat devDependencies](./images/hardhat_devDependencies.png)

Now add the basic boilerplate for Hardhat, by running

```bash
npx hardhat
```

![NPX Hardhat](./images/npx_hardhat.png)

In this menu, you can use the **Up** and **Down** arrow key and **Enter** to select **Create a JavaScript project**.
Then press 3x **Emter**, to add the .gitignore and Hardhat toolbox.

![Install Hardhat Boilerplate](./images/hardhat_install_boilerplate.png)

After this, you should have the basic boilerplate of Hardhat. Here a quick description of the different folders and files added:

- **contracts/**            - Folder to contain all your smart contract
- **scripts/**              - Folder to contain scripts we will write, to deploy our contract
- **test/**                 - Folder tp contain all the Hardhat tests, to test our contract
- **.gitignore**            - File that list all the files we don't want to upload on GitHub
- **hardhat.config.js**     - File that has all the settings for Hardhat
- **README.md**             - File that serve as a documentation and a home page for this repository

### Install more dependencies

Let's install a few more dependencies:

- **dotenv**                   - [dotenv](https://www.npmjs.com/package/dotenv)
- **hardhat-awesome-cli**      - [hardhat-awesome-cli](https://www.npmjs.com/package/hardhat-awesome-cli)
- **@openzeppelin/contracts**  - [@openzeppelin/contracts](https://www.npmjs.com/package/@openzeppelin/contracts)

```bash
npm install dotenv hardhat-awesome-cli --save-dev
```

![Install more devDependencies](./images/install_more_devDependencies.png)

```bash
npm install @openzeppelin/contracts
```

![Install more dependencies](./images/install_more_dependencies.png)

We will use some of these dependencies a bit later to setup our Hardhat configuration, write our contract and write tests.

### Setup the Hardhat setting with Celo blockchain

Open **hardhat.config.js**, to setup Celo blockchain, originally this file should look like:

![Original Hardhat Config](./images/orgiginal_hardhat_config.png)

At the top of the file, we will import some of the Hardhat plugins and dependencies we have previously installed in our project.

So add following the last **require()**:

```js
require("hardhat-awesome-cli");
require("dotenv").config();
```

This way we will have access to the local environment variables we will set to not compromise our private key and other secrets by committing them to GitHub by mistakes and we will have access to the **cli** task for easier use of Hardhat.

Now the top of this file, should look like:

![Hardhat Config Require Plugins](./images/hardhat_config_require_plugins.png)