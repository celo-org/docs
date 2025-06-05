---
title: Run Baklava Testnet Validator on Celo
description: How to get a Validator node running on the Celo Mainnet (Celo's Node Operator Testnet).
---

# Run Baklava Testnet Validator

How to get a Validator node running on the Celo Baklava Testnet (Celo's Node Operator Testnet).

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Why run a Baklava Testnet Validator?

The Baklava testnet is the best place to get started running a validator, or test out new validator configurations before deploying to Mainnet.

:::info

If you would like to keep up-to-date with all the news happening in the Celo community, including validation, node operation and governance, please sign up to our [Celo Signal mailing list here](https://share.hsforms.com/1Qrhush1vSA2WIamd_yL4ow53n4j).

You can add the [Celo Signal public calendar](https://calendar.google.com/calendar/u/0/embed?src=c_9su6ich1uhmetr4ob3sij6kaqs@group.calendar.google.com) as well which has relevant dates.

:::

:::info

If you are transitioning from the Baklava network prior to the June 24, 2021 reset, you will need to start with a fresh chain database. You can create new nodes from fresh machines, as described in this guide, or you may delete your chaindata folder, which is named `celo` in the node data directory, and start over by running the provided `init` commands for each node described below. All on-chain registration steps, the commands completed with `celocli`, will need to be run on the new network.

Key differences are:

- New network ID is `62320`
- A new image has been pushed to `us.gcr.io/celo-org/geth:baklava`
- A new genesis block, bootnode enode, and the new network ID are included in the Docker image

:::
