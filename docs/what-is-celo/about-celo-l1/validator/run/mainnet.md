---
title: Running a Celo Validator
description: How to get a Validator node running on the Celo Mainnet.
---

# Running a Validator

How to get a Validator node running on the Celo Mainnet.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

:::info

If you would like to keep up-to-date with all the news happening in the Celo community, including validation, node operation and governance, please sign up to our [Celo Signal mailing list here](https://share.hsforms.com/1Qrhush1vSA2WIamd_yL4ow53n4j).

You can add the [Celo Signal public calendar](https://calendar.google.com/calendar/u/0/embed?src=c_9su6ich1uhmetr4ob3sij6kaqs@group.calendar.google.com) as well which has relevant dates.

:::

## What is a Validator?

Validators help secure the Celo network by participating in Celo’s proof-of-stake protocol. Validators are organized into Validator Groups, analogous to parties in representative democracies. A Validator Group is essentially an ordered list of Validators.

Just as anyone in a democracy can create their own political party, or seek to get selected to represent a party in an election, any Celo user can create a Validator group and add themselves to it, or set up a potential Validator and work to get an existing Validator group to include them.

While other Validator Groups will exist on the Celo Network, the fastest way to get up and running with a Validator will be to register a Validator Group, register a Validator, and affliate that Validator with your Validator Group. The addresses used to register Validator Groups and Validators must be unique, which will require that you create two accounts in the step-by-step guide below.

Because of the importance of Validator security and availability, Validators are expected to run a "proxy" node in front of each Validator node. In this setup, the Proxy node connects with the rest of the network, and the Validator node communicates only with the Proxy, ideally via a private network.

[Read more about Celo's mission and why you may want to become a Validator.](https://medium.com/celoorg/calling-all-chefs-become-a-celo-validator-c75d1c2909aa) - This article still uses the term Celo Gold which is the deprecated name for the Celo native asset, which now is referred to simply as "Celo" or preferably "CELO".
