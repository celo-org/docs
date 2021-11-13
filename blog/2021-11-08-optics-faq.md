---
title: Optics Bridge FAQ
description: Frequently asked questions about using the Optics Bridge
slug: optics-faq
authors:
  - name: Josh Crites
    title: Developer Relations, cLabs
    url: https://github.com/critesjosh
    image_url: https://github.com/critesjosh.png
tags: [optics]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---

Frequently asked questions about the Optics token bridge.

<!--truncate-->

## My transaction has been processing for longer than the expected time, are my funds safe?

Yes, your funds are safe. Delays can happen when the Optics relayers fail to relay messages between the Optics smart contracts on the different chains. When the messages are processed, you will have access to your funds.

## How long does it take for my assets to appear on the destination chain?

3-4 hours…

Polygon RPC providers can be unreliable and may add a couple of hours when bridging from Polygon.

## Can I expect assets bridged via Optics to be the exact same tokens as assets moved via other bridges?

They represent the same asset, but will have a different contract address. This may create complications when trying to trade/exchange tokens in DEXs.

Example: Eth → Celo → Polygon is different WETH than ETH → Polygon via Polygon PoS bridge, so you can’t use Quickswap to trade the WETH coming from Celo in the pools for WETH coming from the polygon bridge.

## What is the status of my transaction?

You can check your transaction at https://optics.app/search-transaction and entering the source network and transaction hash.
