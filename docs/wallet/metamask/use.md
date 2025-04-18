---
title: MetaMask and Celo
description: Overview of MetaMask and how you can get started with MetaMask on Celo.
---

# MetaMask and Celo

Overview of MetaMask and how you can get started with MetaMask on Celo.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

:::danger

Do not send ETH to your Celo address. Do not send CELO assets to your Ethereum address. Always make sure that you are connected to the correct network.

:::

[MetaMask](https://metamask.io/) is a crypto wallet that can be used in a web browser and on mobile devices to interact with the Ethereum blockchain. Many dApps in the space integrate with MetaMask, and we're excited to bring its functionality to the Celo ecosystem.

Since Celo network's [Donut Hardfork](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0027.md), activated on Mainnet on May 19th, 2021, the protocol now supports [Ethereum-compatible transactions](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0035.md). This means that users may use MetaMask to interact with the Celo blockchain and dApp developers can more easily port Ethereum dApps to the Celo blockchain.

## **How to use MetaMask with Celo**

### **For end users:**

- [Configure a MetaMask Desktop or Web Wallet to Work with Celo](/wallet/metamask/setup)
- [Setup a Ledger to Work with MetaMask to Work With Celo](/wallet/ledger/setup)

### **For developers:**

- [Setup MetaMask to Work with Your dApp](/wallet/metamask/setup)

## **Things to Keep in Mind**

MetaMask does not natively support Celo compatibility and some features won’t work perfectly. Here are some things to be aware of when using MetaMask with Celo.

## **Private Key Import**

Celo and Ethereum use different derivation paths for generating seed phrases. Because MetaMask does not let you specify a derivation path to use:

- You can't import an existing Celo account into the MetaMask wallet using its seed phrase, as you'd get the Ethereum version of it. Instead, you have to import it using the associated private key.
- If you want to import the Celo account you made on MetaMask to a different Celo wallet (e.g. [Valora](https://valoraapp.com/) you'd have to import it using the private key itself, NOT the seed phrase that MetaMask gives you.
- See this guide if you would like to [Import a Valora Account to MetaMask with a Private Key](/wallet/metamask/import)
- See these guides if you accidentally sent ETH to CELO addresses or CELO to ETH addresses.

## **Gas Fees Require CELO**

While gas on Celo can usually be paid in [many different currencies](/what-is-celo/about-celo-l1/protocol/transaction/erc20-transaction-fees), when using MetaMask, gas fees will automatically be paid in CELO. This is because MetaMask will be using the [Ethereum-compatible Celo transaction format](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0035.md), which doesn't include the `feeCurrency` field.

## **Incorrect Logo**

In some cases, the MetaMask UI may display the Ethereum logo in places where it should display a CELO logo or no logo at all.

:::info

MetaMask is primarily used for interacting with the Ethereum blockchain and does not natively support Celo compatibility. Alternatively, you may choose a Celo native wallet [here](/wallet/metamask/setup).

:::
