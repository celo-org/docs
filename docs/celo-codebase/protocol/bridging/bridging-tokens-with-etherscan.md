---
title: Bridge Tokens with Etherscan
---

Bridging ERC-20 tokens from Ethereum and Polygon to Celo.

---

## How to complete this guide

* **Step 1:** Approve the Bridge (for token usage)
*  **Step 2:** Call the Bridge (to send tokens)
*  **Step 3:** Wait

---

## Step 1: Approve the Bridge

Start by approving token usage on the bridge.

1. Navigate to the [Etherscan](https://etherscan.io/) page for the token you want to send
2. Open the **Write Contract** pane > **connect your wallet** > and select **approve**

![Bridging Tokens with Etherescan 1](https://github.com/joenyzio/assets/blob/main/celo-docs/bridging-tokens-with-etherscan/bridging-tokens-with-etherscan-1.png?raw=true)

3. For **spender** enter the BridgeRouter address:

:::tip

If you're unsure, check the decimals in the Read Contract pane
* **On Ethereum:** 0x6a39909e805A3eaDd2b61fFf61147796ca6aBB47
* **On Polygon:** 0xf244eA81F715F343040569398A4E7978De656bf6

:::

4. For **amount** enter the number of tokens you'd like to send in that token's smallest unit.

:::info

If you're unsure, check the decimals in the Read Contract pane
* For most tokens the number of digits is 18
* The + button next will help you fill in the right number 

:::

:::info

Approving too much is usually ok, but not approving enough will cause your next transaction to fail.

:::


5. Select **write** > sign the transaction > then send it to the network.

---

## Step 2: Call the Bridge

You can now start sending tokens on the approved Bridge.

1. Navigate to the [Etherscan](https://etherscan.io/) page for the router

:::info

* **On Ethereum:** 0x6a39909e805A3eaDd2b61fFf61147796ca6aBB47
* **On Polygon:** 0xf244eA81F715F343040569398A4E7978De656bf6

:::

2. Open the **Write as Proxy** pane > connect your wallet > and select send

![Bridging Tokens with Etherescan 2](https://github.com/joenyzio/assets/blob/main/celo-docs/bridging-tokens-with-etherscan/bridging-tokens-with-etherscan-2.png?raw=true)

3. For **_token**, enter the address of the token you want to send
4. For **_amount**, enter the amount of tokens you'd like to send in that token's smallest unit.

:::info

This should be the same number you approved earlier.

:::

5. For **_destination**, enter the domain ID of the chain to which you'd like to send tokens.

:::info

Domain IDs are like phone numbers. They represent the chain you're going to call:
* 1667591279 for **Celo**
* 1886350457 for **Polygon**
* 6648936 for **Ethereum**

:::

6. For **_recipient**, enter the address of the recipient on the destination chain.
    * To help support future chains with longer addresses, Optics uses 32-byte addresses.
    * To convert an Ethereum, Celo, or Polygon address to bytes32 you can add 24 0s after the 0x prefix

:::tip

**Before:bytes32**
0x6a39909e805A3eaDd2b61fFf61147796ca6aBB47

**After: 24 Zeros after 0x Prefix**
0x0000000000000000000000006a39909e805A3eaDd2b61fFf61147796ca6aBB47

:::

7. Select **write** > **sign the transaction** > then **send** it to the network.

---

## Step 3: Wait 

Wait for a moment for your transaction to finalize on the network.
