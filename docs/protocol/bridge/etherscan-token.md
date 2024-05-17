---
title: Bridge Tokens with Etherscan
description: Bridging ERC-20 tokens from Ethereum and Polygon to Celo.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bridge Tokens with Etherscan

How to bridge ERC-20 tokens from Ethereum and Polygon to Celo.

---

## Approve the Bridge

Start by approving token usage on the bridge.

- Navigate to the [Etherscan](https://etherscan.io/) (or [Polygonscan](https://polygonscan.com/)) page for the token you want to send
- Open the **Write Contract** pane > **connect your wallet** > and select **approve**

![Bridging Tokens with Etherescan 1](https://github.com/joenyzio/assets/blob/main/celo-docs/bridging-tokens-with-etherscan/bridging-tokens-with-etherscan-1.png?raw=true)

- For **spender** enter the BridgeRouter address:

<Tabs>
  <TabItem value="Ethereum" label="Ethereum" default>
    Ethereum BridgeRouter Address = <code>0x4fc16De11deAc71E8b2Db539d82d93BE4b486892</code>
  </TabItem>
  <TabItem value="Polygon" label="Polygon">
    Polygon BridgeRouter Address = <code>0x3a5846882C0d5F8B0FA4bB04dc90C013104d125d</code>
  </TabItem>
</Tabs>

- For **amount** enter the number of tokens you'd like to send in that token's smallest unit.

:::tip

If you're unsure, check the decimals in the Read Contract pane

- For most tokens the number of digits is 18
- The + button next will help you fill in the right number

:::

:::info

Approving too much is usually ok, but not approving enough will cause your next transaction to fail.

:::

- Select **write** > sign the transaction > then send it to the network.

## Call the Bridge

You can now start sending tokens on the approved Bridge.

1. Navigate to the appropriate page for the router

<Tabs>
  <TabItem value="Ethereum" label="Ethereum" default>
    <code>Address = [0x4fc16De11deAc71E8b2Db539d82d93BE4b486892](https://etherscan.io/address/0x4fc16De11deAc71E8b2Db539d82d93BE4b486892)</code>
  </TabItem>
  <TabItem value="Polygon" label="Polygon">
    <code>Address = [0x3a5846882C0d5F8B0FA4bB04dc90C013104d125d](https://polygonscan.com/address/0x3a5846882C0d5F8B0FA4bB04dc90C013104d125d)</code>
  </TabItem>
  <TabItem value="Celo" label="Celo">
    <code>Address = [0x1548cf5cf7dBd93f4dA11f45fCce315573d21B60](https://explorer.celo.org/address/0x1548cf5cf7dBd93f4dA11f45fCce315573d21B60/transactions)</code>
  </TabItem>
  <TabItem value="Avalanche" label="Avalanche">
    <code>Address = [0xB6bB41B1fb8c381b002C405B8abB5D1De0C0abFE](https://polygonscan.com/address/0xB6bB41B1fb8c381b002C405B8abB5D1De0C0abFE)</code>
  </TabItem>
</Tabs>

- Open the **Write as Proxy** pane > connect your wallet > and select send

![Bridging Tokens with Etherescan 2](https://github.com/joenyzio/assets/blob/main/celo-docs/bridging-tokens-with-etherscan/bridging-tokens-with-etherscan-2.png?raw=true)

- For **\_token**, enter the address of the token you want to send
- For **\_amount**, enter the amount of tokens you'd like to send in that token's smallest unit.

:::info

This should be the same number you approved earlier.

:::

- For **\_destination**, enter the domain ID of the chain to which you'd like to send tokens.

<Tabs>
  <TabItem value="Celo" label="On Celo" default>
    <code>Celo Domain ID = 1667591279</code>
  </TabItem>
  <TabItem value="Polygon" label="On Polygon">
    <code>Polygon Domain ID = 1886350457</code>
  </TabItem>
  <TabItem value="Ethereum" label="On Ethereum">
    <code>Ethereum Domain ID = 6648936</code>
  </TabItem>
  <TabItem value="Avalanche" label="On Avalanche">
    <code>Avalanche Domain ID = 1635148152</code>
  </TabItem>
</Tabs>

:::tip

Domain IDs are like phone numbers. They represent the chain you're going to call.

:::

- For **\_recipient**, enter the address of the recipient on the destination chain.
  - To help support future chains with longer addresses, Optics uses 32-byte addresses.
  - To convert an Ethereum, Celo, or Polygon address to bytes32 you can add 24 0s after the 0x prefix

:::tip

**Before: bytes32**
<code>0x6a39909e805A3eaDd2b61fFf61147796ca6aBB47</code>

**After: 24 Zeros after 0x Prefix**
<code>0x0000000000000000000000006a39909e805A3eaDd2b61fFf61147796ca6aBB47</code>

:::

- Select **write** > **sign the transaction** > then **send** it to the network.

## Wait

Wait for a moment for your transaction to finalize on the network.
