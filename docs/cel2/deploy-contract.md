---
title: Deploy Contract to Cel2 Alfajores Testnet
---

Deploying contract to Cel2 Alfajores Testnet is the same as deploying on any EVM chain, the only change you need to make is to the RPC endpoint.

In this tutorial, we will deploy the `Counter.sol` contract to Cel2 Alfajores Testnet using Foundry.

1. Initialize your project

```bash
forge init
```

2. In the `src` folder you should already have a contract named `Counter.sol` which will deploy on the Cel2 Alfajores Testnet.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
```

3. Use the below command to deploy the contract on Cel2 Alfajores Testnet.

:::info
You will need Celo (not ETH) in your account to deploy the contract.
:::

```bash
forge create src/Counter.sol:Counter --rpc-url https://alfajores-forno.celo-testnet.org --private-key [PRIVATE_KEY]
```

On successful deployment, you should see a similar output in your terminal.

![deployment-success](/img/doc-images/deploy-contract-cel2/image.png)
