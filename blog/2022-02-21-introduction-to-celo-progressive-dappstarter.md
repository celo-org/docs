---
title: Introduction to Celo Progressive DAppstarter
description: Quickly develop full-stack progressive web applications on Celo.
tags: [react, material-ui, dappstarter, progressive]
hide_table_of_contents: false
---

import ImageWrapper from '@components/ImageWrapper'
import YouTube from '@components/YouTube';

# Introduction to Celo Progressive DAppstarter

Quickly develop full-stack progressive web applications on the Celo blockchain.

---

## Getting started

Welcome to the [Celo Progressive Dappstarter](https://celo-progressive-dapp-starter.netlify.app/)—a starter pack to get you up and running fast with Celo DApp development. The goal of this post is to get you up and running [Celo Progressive Dapp starter](https://github.com/celo-org/celo-progressive-dapp-starter) in about 15 minutes or less. From there you can quickly build, iterate, and deploy new DApps on the Celo blockchain.

**Here's a quick look at what you'll build**

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/1.png)

<!--truncate-->

## Watch the video

Check out this video for an overview of the topics covered in this post.

<YouTube videoId="MQg2sta0lr8"/>

:::info README

View the project [README](https://github.com/celo-org/celo-progressive-dapp-starter) for a quick summary of steps in this video.

:::

## Prerequisites

To start building, you’ll need a basic understanding of web development, Node (v12), yarn, and Git.

- Node (v12), [NVM](https://github.com/nvm-sh/nvm)
- Yarn
- Git

## Project stack

The Celo Progressive Dappstarter uses the [Next.js](https://nextjs.org/) React framework with [Material UI](https://mui.com/), and [use-contractkit](https://www.npmjs.com/package/@celo-tools/use-contractkit) Celo library to get you started with building a responsive, web3 DApp quickly. The goal is to get you started quickly for ha reference and extend it with any web3 packages you are familiar with.

## Set up your project repo

Navigate to the [project repo](https://github.com/celo-org/celo-progressive-dapp-starter) and select **Use this template**

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/2.png)

Add a repository **name**, **description **and click **Create repository from template.**

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/3.png)

:::info Include all branches

This template will soon include additional branches with new features. If you would like to include these branches in your repository, select **Include all branches**.

:::

## Create a local project

From your new GitHub repository, select code, and copy the GitHub URL for your project.

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/4.png)

Open your terminal, navigate to your project directory, and `git clone` your project using the GitHub URL.

```
git clone https://github.com/path-to-your-project-repo
```

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/5.png)

Navigate into your Celo project and run `nvm use` to switch to a Celo compatible Node version. Celo is compatible with Node v12 as specified in `.nvmrc` of the project folder.

```
cd celo-progressive-dapp-starter
nvm use
```

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/6.png)

## Setup your testnet account

Create a new account and print the account number and private key using [hardhat](https://hardhat.org/) `create-account`.

```
npx hardhat create-account
```

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/7.png)

Copy the testnet account address, paste it into the [Celo Testnet Faucet](https://celo.org/developers/faucet) and select **Get Started** to transfer funds into your testnet account.

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/8.png)

Import a new MetaMask account using your private key to view your newly funded Testnet Account.

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/9.png)

:::info MetaMask Setup

Learn more about setting up your Alfajores Testnet with MetaMask [here](https://docs.celo.org/getting-started/wallets/using-metamask-with-celo/manual-setup#adding-a-celo-network-to-metamask)

:::

## Deploy smart contracts

Change into the hardhat directory and install the project dependencies.

```
cd packages/hardhat
yarn install
```

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/10.png)

Open your projects `.env` file and replace `PRIVATE_KEY` with the account **private key** from your terminal.

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/11.png)

Return to your terminal and run `yarn deploy` to deploy your smart contracts.

:::info Redeploy contracts

You can run **yarn deploy --reset** to force re-deploy your contracts to any chain.

:::

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/12.png)

## Start the front-end

Navigate into the react-app directory and run `yarn install` to install the project front-end dependencies.

```
cd packages/react-app
yarn install
yarn dev
```

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/13.png)

Run `yarn dev` to start your development environment.

```
yarn dev
```

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/14.png)

Open [localhost:3000 ](http://localhost:3000/)to view your project.

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/15.png)

## Explore your dApp

Enter a value in the **write contract **function and confirm the transaction to store a value.

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/16.png)

Once the transaction has been complete (approximately 5 seconds) you may view the transaction using the alert that appears with a link to the [Celo Alfajores Block Explorer](https://alfajores-blockscout.celo-testnet.org/).

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/17.png)

You should now be able to view the updated storage value using the **Read Storage Contract **function.

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/18.png)

View the **Greeter Contract **using the tabs to interact with a similar contract that allows you to read and write string values rather than numbers.

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/19.png)

## Customize your dApp

Smart contracts for this project are in the **packages/hardhat/contracts **folder.

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/20.png)

The deploy scripts for each smart contract are found in** packages/hardhat/deploy/00-deploy.js**.

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/21.png)

The front-end code for each smart contract interface are found in **packages/react-app/components **and are named as components that should be similar to the name of the smart contract.

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/22.png)

:::info Redeploy contracts

You can run **yarn deploy --reset** to force re-deploy your contracts to any chain.

:::

## View on Mobile

Serve your React app to your mobile device for testing via a tunnel. Next.js defaults to serving your app on `port 3000`.

```
npx localtunnel --port 3000
```

:::info Local Tunnel

Read more about localtunnel [here](https://www.npmjs.com/package/localtunnel).

:::

![dappstarter](/img/doc-images/introduction-to-celo-progressive-dappstarter/23.png)

Your Celo dApp is now available on your mobile device at the URL provided in your terminal.

## Contribute to the project

We welcome contributions to this repository! If you decide to try this out and find something confusing, consider opening a pull request to make things more clear for the next developer. If you improve the user interface or create new components that you think might be useful for other developers, consider opening a PR.

We will happily compensate you for your contributions. Anywhere between 5 and 50 cUSD (or more) will be awarded to contributors depending on the scope of the work as determined by the Celo Foundation Developer Relations team.

:::info Get Support

Join the [Celo Discord server](https://chat.celo.org/) or reach out on the dedicated repo channel
[here](https://discord.com/channels/600834479145353243/941003424298856448).

:::
