---
title: Verifying Contracts with Hardhat
description: Learn to verify contracts on Sourcify using the hardhat-deploy plugin
slug: hardhat-deploy-verify
authors: [josh]
tags: [hardhat, sourcify, verification]
image: https://dl.airtable.com/.attachmentThumbnails/22e935b11333f80ed706c943717d0b49/24fbfa2e
hide_table_of_contents: false
---

Hardhat is one of the most popular developer tools for writing contracts for EVM compatible blockchains. Hardhat is a great tool for developing smart contracts for Celo--you can find more information about this in the Celo documentation [here](/developer-resources/deploy-hardhat).

In this tutorial I will go over how to use the [hardhat-deploy plugin](https://github.com/wighawag/hardhat-deploy) for hardhat, specifically to verify deployed contracts on the [Celo block explorer](https://explorer.celo.org/) via [Sourcify](https://sourcify.dev/). You can verify contracts with the plugin whether you deployed them using the plugin or not.

In this post I will cover

- setting up a hardhat project with the hardhat-deploy plugin
- deploying contracts using the plugin
- how to verify the contracts on sourcify

<!--truncate-->

## Verify contracts using hardhat-deploy

### Setup

First, I will cover how to deploy contracts using the plugin. This will help provide some context around how a project using this plugin is different from a regular hardhat project. This guide assumes that you already have a hardhat project set up. If you don’t, refer to [this page](https://docs.celo.org/developer-resources/deploy-hardhat).

:::tip

You can reference the 'hardhat-deploy' branch of [this github repo](https://github.com/critesjosh/celo-hardhat/tree/hardhat-deploy) to see how the project is structured.

:::

Install the plugin in your hardhat project:

```shell
npm install -D hardhat-deploy
```

Import the plugin in your `hardhat.config.js` file.

```js
require('hardhat-deploy');
```

Since `hardhat-deploy-ethers` is a fork of `@nomiclabs/hardhat-ethers` and that other plugin might have an hardcoded dependency on `@nomiclabs/hardhat-ethers` the best way to install `hardhat-deploy-ethers` and ensure compatibility is the following:

```shell
npm install --save-dev  @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
```

Which means you then need to do `require("@nomiclabs/hardhat-ethers")` instead of `require("hardhat-deploy-ethers")` in your `hardhat.config.js` file.

The plugin also supports Typescript, which you can find more information about [here](https://github.com/wighawag/hardhat-deploy#typescript-support).

The plugin also has a concept of `namedAccounts` which makes it easier to reference available accounts. You can read more about the details [here](https://github.com/wighawag/hardhat-deploy#1-namedaccounts-ability-to-name-addresses). For our purposes, keep it simple and add `namedAccounts` to the exports in `hardhat.config.js` like so

```js
//hardhat.config.js
...
module.exports = {
 defaultNetwork: "alfajores",
 namedAccounts: {
   deployer: 0
 },
 networks: {
...
```

You can see my source file [here](https://github.com/critesjosh/celo-hardhat/blob/085cf7bc304ec3b0924de1419fe32e37b57e7185/hardhat.config.js#L23).  

### Deploy

Deployment scripts used by `hardhat-deploy` live in a folder called `deploy` in the root of the project. The deployment scripts will save deployment information in a `deployments` folder in the project root as well.

[Here](https://github.com/critesjosh/celo-hardhat/blob/hardhat-deploy/deploy/00-deploy.js) is the deployment script for deploying the [Greeter contract](https://github.com/critesjosh/celo-hardhat/blob/hardhat-deploy/contracts/Greeter.sol) in the example repo.

```js
// deploy/00_deploy_my_contract.js
module.exports = async ({getNamedAccounts, deployments}) => {
   const {deploy} = deployments;
   const {deployer} = await getNamedAccounts();
   await deploy('Greeter', {
     from: deployer,
     args: ["hello world"],
     log: true,
   });
 };
 module.exports.tags = ['Greeter'];
```

It is a simple function that takes the `namedAccounts`, configuration info and the contract constructor arguments and deploys the contract. You can read more about deploy scripts [here](https://github.com/wighawag/hardhat-deploy#deploy-scripts).

To run the deployment, use the command

```bash
npx hardhat --network alfajores deploy
```

There should be terminal output similar to this:

```shell
Downloading compiler 0.8.4
Compiling 1 file with 0.8.4
Compilation finished successfully
deploying "Greeter" (tx: 0x7fedbd14877cdca23485a96108e22ae6764b65348eddbaa1cbec9504707b7186)...: deployed at 0x9F163C9138faA5cdc731b94E1e9632C05764C23e with 493178 gas
```

### Verify

Once the contract is deployed, you can verify it with the command:

```shell
npx hardhat --network alfajores sourcify
```

Which should output

```shell
verifying Greeter (0x9F163C9138faA5cdc731b94E1e9632C05764C23e on chain 44787) ...
 => contract Greeter is now verified
```

You can check the verification on the block explorer, [https://alfajores-blockscout.celo-testnet.org/address/0x9F163C9138faA5cdc731b94E1e9632C05764C23e/contracts](https://alfajores-blockscout.celo-testnet.org/address/0x9F163C9138faA5cdc731b94E1e9632C05764C23e/contracts) in this case.

I hope this is helpful and feel free to [join the Celo Discord](https://chat.celo.org) server and reach out if you have any questions. My handle is joshc#0001.

You can view my hardhat-deploy repository for reference on GitHub here: [https://github.com/critesjosh/celo-hardhat/tree/hardhat-deploy](https://github.com/critesjosh/celo-hardhat/tree/hardhat-deploy )
