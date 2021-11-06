---
title: Bridge Tokens with Etherscan
description: Bridging ERC-20 tokens from Ethereum and Polygon to Celo.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bridge Tokens with Etherscan

How to bridge ERC-20 tokens from Ethereum and Polygon to Celo.
## Approve the Bridge

Start by approving token usage on the bridge.

* Navigate to the [Etherscan](https://etherscan.io/) page for the token you want to send
* Open the **Write Contract** pane > **connect your wallet** > and select **approve**

![Bridging Tokens with Etherescan 1](https://github.com/joenyzio/assets/blob/main/celo-docs/bridging-tokens-with-etherscan/bridging-tokens-with-etherscan-1.png?raw=true)

* For **spender** enter the BridgeRouter address:

<Tabs>
  <TabItem value="Ethereum" label="On Ethereum" default>
    Address = 0x6a39909e805A3eaDd2b61fFf61147796ca6aBB47
  </TabItem>
  <TabItem value="Polygon" label="On Polygon">
    Address = 0xf244eA81F715F343040569398A4E7978De656bf6
  </TabItem>
</Tabs>

* For **amount** enter the number of tokens you'd like to send in that token's smallest unit.

:::tip

If you're unsure, check the decimals in the Read Contract pane
* For most tokens the number of digits is 18
* The + button next will help you fill in the right number 

:::

:::info

Approving too much is usually ok, but not approving enough will cause your next transaction to fail.

:::


* Select **write** > sign the transaction > then send it to the network.

## Call the Bridge

You can now start sending tokens on the approved Bridge.

1. Navigate to the [Etherscan](https://etherscan.io/) page for the router


<Tabs>
  <TabItem value="Ethereum" label="On Ethereum" default>
    Address = 0x6a39909e805A3eaDd2b61fFf61147796ca6aBB47
  </TabItem>
  <TabItem value="Polygon" label="On Polygon">
    Address = 0xf244eA81F715F343040569398A4E7978De656bf6
  </TabItem>
</Tabs>

* Open the **Write as Proxy** pane > connect your wallet > and select send

![Bridging Tokens with Etherescan 2](https://github.com/joenyzio/assets/blob/main/celo-docs/bridging-tokens-with-etherscan/bridging-tokens-with-etherscan-2.png?raw=true)

* For **_token**, enter the address of the token you want to send
* For **_amount**, enter the amount of tokens you'd like to send in that token's smallest unit.

:::info

This should be the same number you approved earlier.

:::

* For **_destination**, enter the domain ID of the chain to which you'd like to send tokens.

<Tabs>
  <TabItem value="Celo" label="On Celo" default>
    Domain ID = 1667591279
  </TabItem>
  <TabItem value="Polygon" label="On Polygon">
    Domain ID = 1886350457
  </TabItem>
  <TabItem value="Ethereum" label="On Ethereum">
    Domain ID = 6648936
  </TabItem>
</Tabs>

:::tip
Domain IDs are like phone numbers. They represent the chain you're going to call.
:::

* For **_recipient**, enter the address of the recipient on the destination chain.
    * To help support future chains with longer addresses, Optics uses 32-byte addresses.
    * To convert an Ethereum, Celo, or Polygon address to bytes32 you can add 24 0s after the 0x prefix

:::tip

**Before:bytes32**
0x6a39909e805A3eaDd2b61fFf61147796ca6aBB47

**After: 24 Zeros after 0x Prefix**
0x0000000000000000000000006a39909e805A3eaDd2b61fFf61147796ca6aBB47

:::

* Select **write** > **sign the transaction** > then **send** it to the network.

##  Wait 

Wait for a moment for your transaction to finalize on the network.
