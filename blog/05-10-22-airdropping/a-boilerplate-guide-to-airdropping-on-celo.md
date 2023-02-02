---
title: A Boilerplate guide to Airdropping on Celo
description: Deploy an Airdrop contract to Celo and claim ERC20 tokens using the web3 SDK.
authors:
  - name: ✍️ Jesse Sawa
tags: [celo]
hide_table_of_contents: false
slug: "/tutorials/a-boilerplate-guide-to-airdropping-on-celo"
---

import YouTube from '@components/YouTube';

# A Boilerplate guide to Airdropping on Celo

_Deploy an Airdrop contract to Celo and claim ERC20 tokens using the web3 SDK._

![header](../../src/data-tutorials/showcase/intermediate/a-boilerplate-guide-to-airdropping-on-celo.png)

## Hello Developers 🌱

I can’t say I have a Web2 analog for cryptocurrency airdrops. It is a method unique to the web3 space and has a reputation for building communities in a matter of days around a product, protocol, or cause.

In addition to bringing people together, airdrops are typically used for different reasons such as marketing/building awareness, rewarding early contributors, generating buzz, and distributing governance. It is an exceedingly growing method for engaging with users and has even been the origin of tokens with hundred million dollar market caps.

So, want to learn how to build and deploy an Airdrop contract on the worlds only mobile-first, carbon negative, refi destined blockchain? The following is a straight-to-the point tutorial that will get you up and running in no time!

**Here are the steps we’ll follow 🗒**

- ✅ **Step 1:** Create your account
- ✅ **Step 2:** Add eligible addresses
- ✅ **Step 3:** Generate Merkle root & proofs
- ✅ **Step 4:** Update migration file
- ✅ **Step 5:** Deploy airdrop contract
- ✅ **Step 6:** Fund the contract
- ✅ **Step 7:** Claim the airdrop

By the end of this post, you’ll be able to deploy an Airdrop contract to Alfajores (Celo’s testnet), fund the contract using the [Alfajores faucet](https://faucet.celo.org), and claim the ERC20 tokens using the [web3 SDK](https://web3js.readthedocs.io/en/v1.7.3/).

:::tip

This tutorial was inspired by Uniswaps’s [Merkle Distributor](https://web3js.readthedocs.io/en/v1.7.3/).

:::

Let’s go! 🚀

## Before getting started

To get started with this tutorial, check out the following tools and set up the boilerplate code in your local environment.

### Prerequisites

- Truffle v5.5.10 installed [npm install -g truffle@5.5.10](https://trufflesuite.com/docs/truffle/getting-started/installation/)
- Basic understanding of Nodejs

### Environment Setup

Open your terminal and clone the [celo-airdrop](https://github.com/Jesse-Sawa/celo-airdrop) repository.

```
git clone https://github.com/Jesse-Sawa/celo-airdrop.git
```

Change into the project folder.

```
cd celo-airdrop
```

Install dependencies.

```
yarn
```

Once installation is complete, you’re ready to get started with the tutorial!

## How airdropping tokens with an erc20 contract works

The high-level purpose of an airdrop is to allow a pre-configured set of users to claim tokens based on some historical data. In this tutorial, we will deploy an Airdrop contract on Celo’s testnet that requires two parameters upon creation;

- The erc-20 token contract address (you can find this on [blockscout](https://alfajores-blockscout.celo-testnet.org/)
- The Merkle root of the tree containing the whitelisted users & the corresponding amounts.

In the context of this tutorial, using a Merkle tree allows us to verify a user is eligible for the airdrop without having to maintain that data on chain, thus saving computational resources. By only storing the root of the merkle tree on chain, we can verify a specified user is eligible given the request is accompanied by additional data e.g. amount eligible, related proofs and index in the tree. You can learn more about Merkle trees [here](https://brilliant.org/wiki/merkle-tree/).

## ✅ Step 1: Create your account

Fund your Celo address using the [Alfajores faucet](https://faucet.celo.org) (to generate a new key pair, run node `tutorial/createAccount.js` from the root directory)

Afterwords create the `.env` file by running the following command:

```
cp .env.example .env
```

Finally, paste your address and private key as the corresponding key values in the `.env` file.

## ✅ Step 2: Add eligible addresses

Let’s add a json file to the project containing an array of addresses that are eligible for the Airdrop. This list should contain a simple mapping of addresses and token values defined in WEI.

For the sake of this tutorial, there is an example eligibility list under the tutorial directory which you can use. If you decide to use the provided example list, nothing else needs to be done and you can move to the next step otherwise, be sure the json file you add is in the same format.

## ✅ Step 3: Generate Merkle root & proofs

Let’s generate the file containing the Merkle root and corresponding proofs of which will be required to create the contract and claim the tokens.

Under the `scripts/merkle-tree` directory there is a file called `generate-merkle-root.ts`. We can execute this script by passing in the path to the eligibility-list specified in the previous step.

After the script executes successfully, another file called `generated-merkle-root.json` will be created in the root directory which contains details such as the merkle root, eligible addresses, and respective proofs, etc.

Here’s the command to execute (from the root directory) using the path to the example eligibility list:

```
ts-node scripts/merkle-tree/generate-merkle-root.ts -i tutorial/example-eligibility-list.json
```

Now let’s work on the [migration](https://trufflesuite.com/docs/truffle/getting-started/running-migrations/) file that truffle will use to deploy the airdrop contract.

For the sake of this tutorial, I have already created the migration file called `2_deploy_airdrop.js` under the migrations directory. All that’s left to do is fill in the values.

At this point, if you have not looked at the Airdrop.sol file under the contracts directory, now would be a good time to do so. Notice the constructor requires two parameters; the erc20 token address and the merkle root. These are immutable parameters that are set when the contract is created.

Okay, now open the file `2_deploy_airdrop.js` under the migrations directory. Inside the functions definition is a call to the Deployer.deploy method which is the Truffle wrapper for deploying contracts to the specified network.

When creating this tutorial, I used the Celo token address on Alfajores, but you can use any other erc20 token if you’d like. Just know that the contract will have to be funded with that token.

Set the first param to the token address and the second param to the merkle root (get this from the file we generated in step 2 `generated-merkle-root.json`).

The file should look similar to this:

```
var Airdrop = artifacts.require("Airdrop");
module.exports = function (deployer) {
  deployer.deploy(
    Airdrop,
    "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
    "0x7ecb997833ad5774cf633610d0fab6ba8cc826f1e910596b2c3943899fadcdef"
  );
};
```

## ✅ Step 5: Deploy airdrop contract

In this step, we will deploy the Airdrop contract.

Make sure there is sufficient \$celo belonging to the address key you pasted in the `.env` file in step 1 -> we need it to pay for gas.

Run the following command from the root directory to deploy the Airdrop contract to Alfajores.

```
truffle migrate --network alfajores
```

The output should look similar to the following

```
Compiling your contracts...
===========================
✓ Fetching solc version list from solc-bin. Attempt #1
✓ Fetching solc version list from solc-bin. Attempt #1
> Everything is up to date, there is nothing to compile.
Starting migrations...
======================
> Network name:    'alfajores'
> Network id:      44787
> Block gas limit: 0 (0x0)
1_initial_migration.js
======================
   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xa6f66270e128cfc1837f7874757029ebfae59bba4ffd7fe5589ed949390f6241
   > Blocks: 1            Seconds: 4
   > contract address:    0xA2b066d5603d7ef3E9BbAFe113A69A08983dBcB5
   > block number:        11160409
   > block timestamp:     1651160747
   > account:             0x0659f79530111c8b584af5EF499c4AfeD79a04DF
   > balance:             15.994621759219476753
   > gas used:            186963 (0x2da53)
   > gas price:           0.5 gwei
   > value sent:          0 ETH
   > total cost:          0.0000934815 ETH
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:        0.0000934815 ETH
2_deploy_airdrop.js
===================
   Deploying 'Airdrop'
   -------------------
   > transaction hash:    0xec7fedd24acad3d7efdcccb7e481c163393257ad87ba0bb1db5ae2c3bab34828
   > Blocks: 0            Seconds: 0
   > contract address:    0x6cA1217BdA63ff36c37F48516803015138D66cE6
   > block number:        11160411
   > block timestamp:     1651160757
   > account:             0x0659f79530111c8b584af5EF499c4AfeD79a04DF
   > balance:             15.994376757219476753
   > gas used:            446869 (0x6d195)
   > gas price:           0.5 gwei
   > value sent:          0 ETH
   > total cost:          0.0002234345 ETH
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:        0.0002234345 ETH
Summary
=======
> Total deployments:   2
> Final cost:          0.000316916 ETH
```

(Don’t clear your terminal 👀)

## ✅ Step 6: Fund the contract

At this point we have:

- Created a Merkle tree with addresses and corresponding values
- Deployed an Airdrop contract to Alfajores with the corresponding merkle root and token address
  Next, we need to fund the contract. Get the contract address from the output of the command you ran in step 4.

In the above example, that would be:

```
0x6cA1217BdA63ff36c37F48516803015138D66cE6
```

If you are using a token other than Celo or one of its stable coins, you’ll need to send a sufficient amount to that address to accommodate for this airdrop. Otherwise, head back over to the [Alfajores faucet](https://faucet.celo.org) and fund the contract address.

:::tip

Make sure to confirm the contract address has the funds by visiting [blockscout](https://alfajores-blockscout.celo-testnet.org/).

:::

## ✅ Step 7: Claim the airdrop

Now for the fun part 😎

To claim for every address specified in the eligibility list, run the following command with the path to the `generate-merkle-root.ts` file

```
ts-node scripts/contract-interaction/claim-airdrop.ts -i generated-merkle-root.json
```

To claim for only one specified address, just add the `-a` flag followed by the address e.g.

```
ts-node scripts/contract-interaction/claim-airdrop.ts -i generated-merkle-root.json -a 0x6cA1217BdA63ff36c37F48516803015138D66cE6
```

You can now navigate to [blockscout](https://alfajores-blockscout.celo-testnet.org/), paste the address you claimed the tokens for, and see the transaction which claimed the tokens!

## Congratulations 🎉

In this tutorial, we went over what it takes to deploy and claim an airdrop on Celo at a very high level.

Although, for a production grade environment, there are some things we should alter/add. For example, the design & implementation of a token refund function that can be invoked by the contract owner. Teams typically implement an automatic refund of unclaimed tokens after some epoch to avoid unnecessary loss.

Further, users typically prefer a nice user interface opposed to running scripts via terminal; this means constructing the transaction for the user if they are eligible for the airdrop.

Finally, there are countless possibilities to go about airdropping tokens, this is merely an example of one. If you have any feedback please share! I hope you enjoyed!
