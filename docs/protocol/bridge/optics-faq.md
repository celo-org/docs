---
title: Optics Bridge FAQs
description: Common questions about the Optics Bridge.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ImageWrapper from '@components/ImageWrapper'

# Optics Bridge FAQs

## What is the Optics Bridge?

Optics is a protocol for sending messages between EVM chains. It can be used to securely send tokens cross-chain using the burn/mint token model.

## How long does it take to send a transaction?

It typically takes 1 hour for funds to arrive at the destination chain, but can take longer. Optics uses an optimistic model that includes a 30-minute period. We are working on ways to significantly reduce latency for users.

## How do I convert my v1 tokens into v2?

For converting Optics Bridge v1 wETH, wBTC, cUSDC to v2 you should use the Mobius + Celo one-for-one [migration tool](https://mobius.money/#/opensum). [This tutorial](/protocol/bridge/optics-migration-v2) guides you through the process.

## How can I check the status of my transaction?

Go to [optics.app/search-transaction](https://optics.app/search-transaction) and select the network you bridged FROM and enter the transaction hash.

## I’m unable to check the status of the transaction?

Make sure you are searching the transaction within the correct version of Optics. Within the Optics.app site, located on the top right & left side of the window you can choose between Optics v1 and v2.

## I’m unable to obtain a transaction update with a transaction using Polygon, how do I check status?

This often happens when the RPC server on Polygon is not responding to requests. To check status, use a block explorer to verify the transaction was sent successfully. Next, check the receiving network with block explorer to view if you received the tokens. The typical time to process is 30 minutes for Optics v2 and 4 hours for Optics v1.

## I get “Error fetching transaction” when searching my transaction?

Make sure you have the right network selected and the correct hash. If you are still seeing the error, try again in a few minutes. Your funds are safe, this does not indicate an error with your transaction.

## My funds haven’t arrived after 5+ hours

Your funds are safe. Sometimes the agent that processes messages gets stuck. Reach out to us in [#bridge-support](https://discord.gg/Rp8TYetc) and we will get your transaction back on track. We are working to improve agent stability.

## I filled out the form but haven’t gotten a response

We will be deprecating the form and migrating to our new discord server. Please reach out to us in [#bridge-support](https://discord.gg/Rp8TYetc).

## It shows my transaction was processed, but I haven’t received the funds

Your transaction was a success, you are likely looking at the wrong token address. Go to optics.app and click on your address in the top right corner. It will open up a modal with a list of tokens on each chain and the ability to add them to Metamask.

## The app doesn’t recognize my token balance

Some tokens are not currently supported (Polygon WETH, Polygon SUSHI, etc)

## My newly-added token has an ugly name, can it be changed?

Yes, reach out to us on [#bridge-support](https://discord.gg/Rp8TYetc) and we’ll request a name change.

## I sent USDC to Polygon but I think I received the wrong token, how do I resolve?

If you obtained USDC tokens which are not recognized on the Polygon network, you might have sent the wrong token. There are two core USDC token contracts, one that is native to the Ethereum network and the another that represents USDC on the Polygon network. There are multiple USDC contracts on different networks, each corresponding to the bridge that was used to send the token. For example, with Polygon, USDC sent via the [Polygon Bridge](https://wallet.polygon.technology/) will have a different address than USDC sent via the Optics Bridge (and it doesn’t matter if the USDC is comes from Celo or directly from Ethereum). On Polygon, there are greater incentives for users to bridge USDC via the polygon bridge, so that is the more popular token with greater liquidity. To transfer the popular version of Polygon USDC from Celo to Polygon via Optics, make sure that you use USDC PoS. In the event you sent the wrong token, bridge back the tokens to convert to USDC PoS and then bridge USDC PoS to Polygon.

## How do I transfer value from Celo to Polygon?

It’s recommended to use USDC PoS.

To get USDC using token with address 0x2791bca1f2de4661ed88a30c99a7a9449aa84174 on Polygon you should send USDC PoS with token address 0x1bfc26cE035c368503fAE319Cc2596716428ca44 from Celo.

## How do I verify token addresses?

Within the Optics.app dashboard, on the top right side of the page, select your wallet address to bring up the contract validation window to view token addresses.

After connecting your wallet, tap your wallet address:
<ImageWrapper path="/img/doc-images/migrating-optics-v2/verify-token-wallet.png" alt="Connect your wallet" width="400" />

This will display the list of tokens:
<ImageWrapper path="/img/doc-images/migrating-optics-v2/verify-token-list.png" alt="View token list" width="500" />

## Resources

### Dashboards

[https://optics.app/](https://optics.app/)

[https://bridge.mobius.money/#/](https://bridge.mobius.money/#/)

### Token Addresses

<Tabs>
  <TabItem value="Celo Network" label="Celo Network">
<table>
<tr><td>SUSHI:</td><td>0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1</td></tr>
<tr><td>WETH:</td><td>0x122013fd7dF1C6F636a5bb8f03108E876548b455</td></tr>
<tr><td>WBTC:</td><td>0xBAAB46E28388d2779e6E31Fd00cF0e5Ad95E327B</td></tr>
<tr><td>USDC:</td><td>0xef4229c8c3250C675F21BCefa42f58EfbfF6002a</td></tr>
<tr><td>USDCPOS (Polygon):</td><td>0x1bfc26cE035c368503fAE319Cc2596716428ca44</td></tr>
<tr><td>USDT:</td><td>0x88eeC49252c8cbc039DCdB394c0c2BA2f1637EA0</td></tr>
<tr><td>DAI:</td><td>0x90Ca507a5D4458a4C6C6249d186b6dCb02a5BCCd</td></tr>
<tr><td>CELO:</td><td>0x471ece3750da237f93b8e339c536989b8978a438</td></tr>
<tr><td>CUSD:</td><td>0x765DE816845861e75A25fCA122bb6898B8B1282a</td></tr>
<tr><td>CEUR:</td><td>0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73</td></tr>
<tr><td>WMATIC:</td><td>0x2E3487F967DF2Ebc2f236E16f8fCAeac7091324D</td></tr>
</table>
  </TabItem>
  <TabItem value="Ethereum Network" label="Ethereum Network" default>
<table>
<tr><td>CUSD:</td><td>0xd8f3208c045dd69d27938346275165998359d8ff</td></tr>
<tr><td>CELO:</td><td>0xc95dc0eceec11ab8b2bfa1aff3c223c5dc006fad</td></tr>
<tr><td>SUSHI:</td><td>0x6b3595068778dd592e39a122f4f5a5cf09c90fe2</td></tr>
<tr><td>WETH:</td><td>0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2</td></tr>
<tr><td>WBTC:</td><td>0x2260fac5e5542a773aa44fbcfedf7c193bc2c599</td></tr>
<tr><td>UNI:</td><td>0x1f9840a85d5af5bf1d1762f925bdaddc4201f984</td></tr>
<tr><td>LINK:</td><td>0x514910771af9ca656af840dff83e8264ecf986ca</td></tr>
<tr><td>USDC:</td><td>0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48</td></tr>
<tr><td>USDT:</td><td>0xdac17f958d2ee523a2206206994597c13d831ec7</td></tr>
<tr><td>DAI:</td><td>0x6b175474e89094c44da98b954eedeac495271d0f</td></tr>
<tr><td>CEUR:</td><td>0x977453366b8d205f5c9266b6ba271e850a814a50</td></tr>
</table>
  </TabItem>
  <TabItem value="Polygon Network" label="Polygon Network">
<table>
<tr><td>SUSHI:</td><td>0xa84b7d339570eb053939810f56ab6eef2e0b38cd</td></tr>
<tr><td>WETH:</td><td>0xac24381947d4f44c2da58881547c0c38196beb07</td></tr>
<tr><td>WBTC:</td><td>0x15d25a3c47037c133210ab90adae4d51365a1108</td></tr>
<tr><td>USDC:</td><td>0x22d9c9fc91ebd595af762ed4c9d5cc1d92cabf59</td></tr>
<tr><td>USDCPOS (Polygon):</td><td>0x2791bca1f2de4661ed88a30c99a7a9449aa84174</td></tr>
<tr><td>USDT:</td><td>0x91ff78ae858498e6f6e884f78b6e5be892c706af</td></tr>
<tr><td>DAI:</td><td>0x795a8ec05f0c4f0eea7388378b1b890f851c5001</td></tr>
<tr><td>CELO:</td><td>0x4764ea6d06ce4e503d0bb323913c1e96dcd1a943</td></tr>
<tr><td>CUSD:</td><td>0x151517af77b06d9593f3ed41abecdd349316e006</td></tr>
<tr><td>CEUR:</td><td>0x2f0173dfe97a7dc670d5a10b35c4263cfecfa853</td></tr>
<tr><td>WMATIC:</td><td>0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270</td></tr>
</table>
  </TabItem>
</Tabs>

### Optics Contracts

Optics replica contracts are configured for each network within: [https://github.com/celo-org/optics-monorepo/tree/main/rust/config/production-community](https://github.com/celo-org/optics-monorepo/tree/main/rust/config/production-community)

<Tabs>
  <TabItem value="Celo Network" label="Celo Network">
    <a href="https://github.com/celo-org/optics-monorepo/blob/main/rust/config/production-community/celo_contracts.json">https://github.com/celo-org/optics-monorepo/blob/main/rust/config/production-community/celo_contracts.json</a>
  </TabItem>
  <TabItem value="Avalanche Network" label="Avalanche Network">
    <a href="https://github.com/celo-org/optics-monorepo/blob/main/rust/config/production-community/avalanche_contracts.json">https://github.com/celo-org/optics-monorepo/blob/main/rust/config/production-community/avalanche_contracts.json</a>
  </TabItem>
  <TabItem value="Ethereum Network" label="Ethereum Network">
    <a href="https://github.com/celo-org/optics-monorepo/blob/main/rust/config/production-community/ethereum_contracts.json">https://github.com/celo-org/optics-monorepo/blob/main/rust/config/production-community/ethereum_contracts.json</a>
  </TabItem>
  <TabItem value="Polygon Network" label="Polygon Network">
    <a href="https://github.com/celo-org/optics-monorepo/blob/main/rust/config/production-community/polygon_verification.json">https://github.com/celo-org/optics-monorepo/blob/main/rust/config/production-community/polygon_verification.json</a>
  </TabItem>
</Tabs>
