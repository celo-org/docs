---
title: Rainbowkit-celo
description: Overview of Rainbowkit-celo
---

:::warning
@celo/rainbowkit-celo was a config for rainbowkit that added support for celo chains and wallets. Its usefulness has ended as the the chains are now part of rainbowkit by way of viem and the wallets have either been added to rainbowkit itself.

Users are encouraged to upgrade to version of rainbowkit with support for valora @rainbow-me/rainbowkit@2.1.6 or if this is not possible copy the configs needed from this project to theirs.

[Related Issue](https://github.com/celo-org/rainbowkit-celo/issues/86)
:::

RainbowKit is a React library that makes it easy to add wallet connection to your dapp. It's intuitive, responsive and customizable.

On top of that, we at Celo developed a plugin to help rainbowkit developers support the CELO protocol faster. It includes the chain information as well as the main CELO wallets (currently Valora, Celo Wallet, and Celo Terminal).

- [Github repo](https://github.com/celo-org/rainbowkit-celo)
- [Demo page](https://rainbowkit-with-celo.vercel.app/)

## Installation

```sh
npm install @celo/rainbowkit-celo
```

This package has `@rainbow-me/rainbowkit` as a peer dependency and expect it to be installed too. Follow [their instructions](https://www.rainbowkit.com/docs/installation) if that's not done yet.

## Usage

```ts
import {
  connectorsForWallets,
  RainbowKitProvider,
  wallet,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// Import known recommended wallets
import { Valora, CeloWallet, CeloDance } from "@celo/rainbowkit-celo/wallets";

// Import CELO chain information
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";

const { chains, provider } = configureChains(
  [Alfajores, Celo],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended with CELO",
    wallets: [
      Valora({ chains }),
      CeloWallet({ chains }),
      CeloDance({ chains }),
      wallet.steak({ chains }),
      wallet.walletConnect({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// ... Your exisiting app.
```
