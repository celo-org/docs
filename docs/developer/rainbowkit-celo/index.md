---
title: Rainbowkit
description: Overview of Rainbowkit 
---

# Rainbowkit (celo example)

Overview of Rainbowkit

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Rainbowkit

RainbowKit is a React library that makes it easy to add wallet connection to your dapp. It's intuitive, responsive and customizable. And Supports some of the best wallets on Celo.

## Installation

```sh
npm install @rainbow-me/rainbowkit@2 viem@2 wagmi@2
```

## Create config

Create a file named **`consts`** under **`src/config`**

```sh
export const WALLET_CONNECT_PROJECT_ID = 'YOUR_PROJECT_ID'
```

## Example

```ts
import '@rainbow-me/rainbowkit/styles.css';
import {
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  safeWallet,
  valoraWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
  lightTheme,
} from '@rainbow-me/rainbowkit';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WALLET_CONNECT_PROJECT_ID } from '/src/config/consts';

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: 'Your App Name',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [celo, celoAlfajores],
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [safeWallet, valoraWallet, braveWallet, coinbaseWallet],
    },
    {
      groupName: 'Fallbacks',
      wallets: [walletConnectWallet, injectedWallet],
    },
  ],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
});
function App() {
  return (
      <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <ConnectButton />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
  )
}
```
