---
title: Celo General Integration Information
description: General information about integrations regardless of your service or use case.
---

# General

General information about integrations regardless of your service or use case.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Accessing the chain

There are a myriad of ways through which you can access chain data:

### Running your own node

To be completely independent and have a reliable view into the latest chain data, you will likely want to run your own node(s).

You can just clone [`celo-blockchain`](https://github.com/celo-org/celo-blockchain) and then run `make geth` to receive the binary.

By default, `geth` will use `/root/.celo` as the data dir, if you would like to change that specify the `--datadir` argument.

This is all you should need to connect to a network:

For Mainnet:

```bash
geth
```

For Alfajores:

```bash
geth --alfajores
```

For Baklava:

```bash
geth --baklava
```

For more command line options, please see [https://geth.ethereum.org/docs/fundamentals/command-line-options](https://geth.ethereum.org/docs/fundamentals/command-line-options)

### Forno

Forno is a hosted node service for interacting with the Celo network. This allow the user to get connected to the Celo Blockchain without having to run its own node.

Can be used as an `Http Provider` with `ContractKit`

As Forno is a public node you will have to sign transactions locally because with your own private key, because Forno doesn't store them. But don't worry, the `ContractKit` will handle this for you.

Forno networks:

```
Alfajores = 'https://alfajores-forno.celo-testnet.org'

Baklava = 'https://baklava-forno.celo-testnet.org'

Mainnet = 'https://forno.celo.org'
```

### Blockscout

We also expose data on the cLabs run blockscout instance. Blockscout itself exposes an API.

```
Alfajores = 'https://celo-alfajores.blockscout.com/'

Baklava = 'https://celo-baklava.blockscout.com/'

Mainnet = 'https://explorer.celo.org/'
```

## Signing Transactions

Compared to Ethereum transactions, Celo transactions have an additional optional field:

- `feeCurrency` - Specifies the address of the currency in which fees should be paid. If `null`, the native token `CELO` is assumed.

<!-- TODO: Fix this link when this part of the docs is done
[Read more about Celo Transactions](/celo-codebase/what-is-celo/about-celo-l1/protocol/transactions)
-->

To sign transactions, you have the following options:

- Use the JSON-RPC [`sendTransaction`](https://github.com/ethereum/execution-apis/blob/c710097abda52b5a190d831eb8b1eddd3d28c603/tests/eth_sendRawTransaction/send-legacy-transaction.io) method to your node which would have the account in question unlocked. (Either manually or via a library such as `web3`)
- Use [ContractKit's](/developer/contractkit/) local signing feature.
