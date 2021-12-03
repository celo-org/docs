---
title: Bridge Native Assets with Etherscan
description: How to bridge native assets from ETH and Matic to Celo with Etherscan.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Bridge Native Assets with Etherscan

How to bridge native assets from ETH and Matic to Celo with Etherscan.

___
## Call the EthHelper

Navigate to the [Etherscan](https://etherscan.io/) (or [Polygonscan](https://polygonscan.com/)) page for the EthHelper.

<Tabs>
  <TabItem value="Ethereum" label="On Ethereum" default>
    <code>Ethereum EthHelper Address = [0xf1c1413096ff2278C3Df198a28F8D54e0369cF3A](https://etherscan.io/address/0xf1c1413096ff2278C3Df198a28F8D54e0369cF3A)</code>
  </TabItem>
  <TabItem value="Polygon" label="On Polygon">
    <code>Polygon EthHelper Address = [0xc494bFEE14b5E1E118F93CfedF831f40dFA720fA](https://polygonscan.com/address/0xc494bFEE14b5E1E118F93CfedF831f40dFA720fA)</code>
  </TabItem>
</Tabs>

* Open the **Write Contract** pane > **connect your wallet** > then select **sendToEVMLike**
    * Optics is designed to support multiple non-EVM chains
    * This function helps you send ETH to another chain that uses EVM-style addresses

![Bridging Native Assets with Etherescan](https://github.com/joenyzio/assets/blob/main/celo-docs/bridging-native-assets-with-etherscan/bridging-native-assets-with-etherscan.png?raw=true)

* For **payableAmount** enter the amount you'd like to send in ETH.

:::tip

1 wei = 1 / 10 ** 18 ETH.

:::

* For **_domain**, enter the domain ID of the chain to which you'd like to send tokens.

Domain IDs are like phone numbers. They represent the chain you're going to call.

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
</Tabs>

* For **_to**, enter the address of the recipient on the destination chain.
* Select **write** > **sign the transaction** > then **send** it to the network.


## Wait 

Wait for a moment for your transaction to finalize on the network.
