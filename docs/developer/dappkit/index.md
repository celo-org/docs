---
title: Celo DAppKit
description: Introduction to DAppKit and resources to help you gets started.
---

# DAppKit

import PageRef from '@components/PageRef'

Introduction to DAppKit and resources to help you gets started.

---

:::warning

While DAppKit is functional, it is no longer being actively maintained in favor of WalletConnect. If WalletConnect does not work for your use case, you can use deep links directly. You can read more about how Valora handles this [here](https://github.com/valora-inc/wallet/blob/main/packages/mobile/docs/deeplinks.md). You can read more about how to use WalletConnect with Valora [here](/blog/2022/01/08/valora-wc-v1).

:::

## What is DAppKit?

DAppKit is a lightweight set of functions that allow mobile DApps to work with the Celo Wallet to sign transactions and access the user's account. This allows for a better user experience: DApps can focus on a great native experience without having to worry about key management. It also provides a simpler development experience, as no state or connection management is necessary.

## Functionality

DAppKit supports the following functionality:

- Request permission to access account information and phone number from the Celo Wallet
- Request permission to sign transaction(s) from the Celo Wallet
- Look up phone numbers using the [Identity Protocol](/protocol/identity/) to find contacts using Celo.

## Design

DAppKit is currently built with React Native in mind, though the excellent [Expo framework](https://expo.io) is still highly recommended for developers building mobile and web DApps on Celo. Expo offers awesome features like incredibly easy setup, hot-reloading, and more. Currently, most of our tutorials and examples involve Expo, though we are working on creating additional documentation for other app frameworks. While DAppKit was designed for mobile apps in particular, since version `1.1.0-beta.1` it offers beta support for web DApps running in the browser of a mobile device. More details about this are included in the `Usage` section below.

## Resources

<PageRef url="/developer-guide/dappkit/setup" pageName="Setup"/>
<PageRef url="/developer-guide/dappkit/usage" pageName="Usage"/>
