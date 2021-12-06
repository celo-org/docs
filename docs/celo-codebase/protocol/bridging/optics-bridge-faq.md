---
title: Optics Bridge FAQs
description: Common questions about the Optics Bridge.
---

# Optics Bridge FAQs


## What is the Optics Bridge?

Optics is a protocol for sending messages between EVM chains.  It can be used to securely send tokens cross-chain using the burn/mint token model.


## How long does it take to send a transaction?

It typically takes 1 hour for funds to arrive at the destination chain, but can take longer.  Optics uses an optimistic model that includes a 30-minute period.  We are working on ways to significantly reduce latency for users.


## How can I check the status of my transaction?

Go to [optics.app/search-transaction](https://optics.app/search-transaction) and select the network you bridged FROM and enter the transaction hash.


## I get “Error fetching transaction” when searching my transaction?

Make sure you have the right network selected and the correct hash.  If you are still seeing the error, try again in a few minutes.  Your funds are safe, this does not indicate an error with your transaction.


## My funds haven’t arrived after 5+ hours

Your funds are safe.  Sometimes the agent that processes messages gets stuck. Reach out to us in [#bridge-support](https://discord.gg/Rp8TYetc) and we will get your transaction back on track. We are working to improve agent stability.


## I filled out the form but haven’t gotten a response

We will be deprecating the form and migrating to our new discord server.  Please reach out to us in [#bridge-support](https://discord.gg/Rp8TYetc).


## It shows my transaction was processed, but I haven’t received the funds

Your transaction was a success, you are likely looking at the wrong token address.  Go to optics.app and click on your address in the top right corner.  It will open up a modal with a list of tokens on each chain and the ability to add them to Metamask.


## The app doesn’t recognize my token balance

Some tokens are not currently supported (Polygon WETH, Polygon SUSHI, etc)


## My newly-added token has an ugly name, can it be changed?

Yes, reach out to us on [#bridge-support](https://discord.gg/Rp8TYetc) and we’ll request a name change.
