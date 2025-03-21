---
title: Verify with Hardhat
description: How to verify a Smart Contract on Celo using Hardhat
---

# Verify Smart Contract using Hardhat

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

Verifying a smart contract allows developers to review your code from within the CeloScan Block Explorer

:::tip
If you use [Celo Composer](https://github.com/celo-org/celo-composer) all the configuration is done for you out of the box, all you need is the CeloScan API keys!
:::

## Prerequisites

Before the installation steps you need to have your hardhat project initialized using the command

```bash
npx hardhat init
```

Make sure to have dependencies installed and the hardhat config file is importing `@nomicfoundation/hardhat-toolbox`

### Hardhat Configuration

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
        customChains: [
            {
                network: "alfajores",
                chainId: 44787,
                urls: {
                    apiURL: "https://api-alfajores.celoscan.io/api",
                    browserURL: "https://alfajores.celoscan.io",
                },
            },
            {
                network: "celo",
                chainId: 42220,
                urls: {
                    apiURL: "https://api.celoscan.io/api",
                    browserURL: "https://celoscan.io/",
                },
            },
        ]
    },
```

## Verifying Contracts

Use the following command (Make sure your contracts are compiled before verification)

Alfajores Testnet

```bash
npx hardhat verify [CONTRACT_ADDRESS] [...CONSTRUCTOR_ARGS] --network alfajores
```

Celo Mainnet

```bash
npx hardhat verify [CONTRACT_ADDRESS] [CONSTRUCTOR_ARGS] --network celo
```
