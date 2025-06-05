---
title: Running Proxies on Celo
description: How to ensure Validator uptime by running proxy nodes.
---

# Running Proxies

How to ensure Validator uptime by running proxy nodes.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Why run a Proxy?

Validator uptime is essential for the health of the Celo blockchain. To help with validator uptime, operators can use the proxy node, which will provide added security for the validator. It allows the validator to run within a private network, and to communicate to the rest of the Celo network via the proxy.

Also, starting from the Celo client 1.2 release, we will support assigning multiple proxies per validator. This provides better uptime for the validator for the case of a proxy going down. Also, it will help with making each proxy enode URL less public by only sharing it with a subset of the other validators.

:::danger

The communication protocol between the validator and it's proxies implemented in release 1.2 is NOT backwards compatible to the pre-1.2 protocol. So if the proxy or validator is being upgraded to 1.2, then both needs to be upgraded to that version. Note that validators and proxies using release 1.2 are still compatible with remote nodes.

:::

There are two ways to specify the proxy information to a validator. It can be done on validator startup via the command line argument, or by the rpc api when the validator is running.


## RPC API

- `istanbul.addProxy(<proxy's internal enode URL>, <proxy's external enode URL>)` can be used on the validator to add a proxy to the validator's proxy set
- `istanbul.removeProxy(<proxy's internal enode URL>)` can be used on the validator to remove a proxy from the validator's proxy set
- `istanbul.proxies` can be used on the validator to list the validator's proxy set

- `istanbul.proxiedValidators` can be used on the proxies to list the proxied validators
