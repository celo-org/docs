---
title: Bridge Native Assets with Etherscan
description: Bridging ETH and Matic to Celo.
---

Bridging ETH and Matic to Celo.

---

## How to complete this guide

* **Step 1:** Call the EthHelper (to send tokens)
* **Step 2:** Wait

---

## Step 1: Call the EthHelper

1. Navigate to the [Etherscan](https://etherscan.io/) page for the EthHelper.

:::info

**On Ethereum:** 0xf1c1413096ff2278C3Df198a28F8D54e0369cF3A
**On Polygon:** 0xc494bFEE14b5E1E118F93CfedF831f40dFA720fA

:::

2. Open the **Write Contract** pane > **connect your wallet** > then select **sendToEVMLike**
    * Optics is designed to support multiple non-EVM chains
    * This function helps you send ETH to another chain that uses EVM-style addresses

![Bridging Native Assets with Etherescan](https://github.com/joenyzio/assets/blob/main/celo-docs/bridging-native-assets-with-etherscan/bridging-native-assets-with-etherscan.png?raw=true)

1. For **payableAmount** enter the amount you'd like to send in ETH.

:::info

1 wei = 1 / 10 ** 18 ETH.

:::

4. For **_domain**, enter the domain ID of the chain to which you'd like to send tokens.

:::info

Domain IDs are like phone numbers. They represent the chain you're going to call.
* 1667591279 for **Celo**
* 1886350457 for **Polygon**
* 6648936 for **Ethereum**

:::

5. For **_to**, enter the address of the recipient on the destination chain.

6. Select **write** > **sign the transaction** > then **send** it to the network.

---

## Step 2: Wait 

Wait for a moment for your transaction to finalize on the network.
