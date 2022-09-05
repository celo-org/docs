---
title: Verify with Hardhat
description: How to verify a Smart Contract on Celo using Hardhat
---

# Verify Smart Contract using Hardhat

Verifying a smart contract allows developers to review your code from within the CeloScan Block Explorer

## Prerequisites

Before the installation steps you need to have your hardhat project initialized using the command

```bash
npx hardhat init
```

Make sure to have dependencies installed!

## Configuration

Some initial installation and configuration is required.

### Installation

Use the following command to install

```bash
npm i hardhat-celo --save-dev
```

### Hardhat Configuration

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-celo");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-celo";
```

Remove / Comment the import for `@nomicfoundation/hardhat-toolbox`

Add the following configuration to the `config` object in `hardhat.config.js`.

```js
networks: {
        alfajores: {
            // can be replaced with the RPC url of your choice.
            url: "https://alfajores-forno.celo-testnet.org",
            accounts: [
                "<YOUR_PRIVATE_KEY>"
            ],
        },
        celo: {
            url: "https://forno.celo.org",
            accounts: [
                "<YOUR_PRIVATE_KEY>"
            ],
        }
    },
    etherscan: {
        apiKey: {
            alfajores: "<CELOSCAN_API_KEY>",
            celo: "<CELOSCAN_API_KEY>"
        },
    },
```

## Verifying Contracts

Use the following command (Make sure your contracts are compiled before verification)

Alfajores Testnet

```bash
npx hardhat verify <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS> --network alfajores
```

Celo Mainnet

```bash
npx hardhat verify <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS> --network celo
```

Alternatively, You can read an in depth guide about how to deploy and verify contracts on Celo Block Explorer (sourcify) programmatically using the hardhat-deploy plugin [here](/blog/hardhat-deploy-verify).
