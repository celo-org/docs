---
title: Wagmi
description: Guide of Web3Modal SDK & Wagmi
---

# Web3Modal SDK & Wagmi

---

## Installation

```bash npm2yarn
npm install @web3modal/wagmi wagmi viem
```

## Usage

On top of your app set up the following configuration, making sure that all functions are called **outside** any React component to avoid unwanted rerenders.

```tsx
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { celo, celoAlfajores } from 'viem/chains'

// 1. Get a Project ID from https://cloud.walletconnect.com/ 
const projectId = 'YOUR_PROJECT_ID'

// 2. Create wagmiConfig
const metadata = {
  name: 'My Celo App',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

const chains = [celo, celoAlfajores]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  defaultChain: celo
})

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      // Rest of your app...
    </WagmiConfig>
  )
}
```

Use the `<w3m-button />` web component anywhere in your app to open the wallet modal.

```tsx
export default function ConnectButton() {
  return <w3m-button />
}
```

:::info
Web components are global html elements that don't require importing.
:::

## Smart Contracts interaction

Use Wagmi hooks to [read](https://wagmi.sh/react/hooks/useContractRead) or [write](https://wagmi.sh/react/hooks/useContractWrite) Smart Contracts. 
```ts
import { useContractRead } from 'wagmi'
import { USDTAbi } from '../abi/USDTAbi'

function App() {
  const { data, isError, isLoading } = useContractRead({
    address: '0x617f3112bf5397D0467D315cC709EF968D9ba546',
    abi: USDTAbi,
    functionName: 'getHunger',
  })
}
```

- [Learn more about Web3Modal SDK](https://docs.walletconnect.com/web3modal/about)
- [Learn more about Wagmi](https://wagmi.sh/)