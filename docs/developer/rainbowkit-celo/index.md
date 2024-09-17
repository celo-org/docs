---
title: Rainbowkit
description: Overview of Rainbowkit 
---

# Rainbowkit (celo example)

Overview of Rainbowkit 

---

## Rainbowkit-celo

RainbowKit is a React library that makes it easy to add wallet connection to your dapp. It's intuitive, responsive and customizable. And Supports some of the best wallets on Celo.


## Installation

```sh
npm install @rainbow-me/rainbowkit@2 viem@2 wagmi@2
```

## Example Config

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

import { WALLET_CONNECT_PROJECT_ID } from 'src/config/consts';

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
              Your APP Here
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
  )
}
```
