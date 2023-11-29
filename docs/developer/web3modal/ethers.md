---
title: Web3Modal SDK
description: Guide of Web3Modal SDK & Ethers
---

# Web3Modal SDK & Ethers

---

## Installation

```bash npm2yarn
npm install @web3modal/ethers ethers
```

## Usage

On top of your app set up the following configuration, making sure that all functions are called **outside** any React component to avoid unwanted rerenders.

```tsx
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get a Project ID from https://cloud.walletconnect.com/ 
const projectId = 'YOUR_PROJECT_ID'

// 2. Set chains
const celo = {
  chainId: 42220,
  name: 'Celo',
  currency: 'CELO',
  explorerUrl: 'https://explorer.celo.org/mainnet',
  rpcUrl: 'https://forno.celo.org'
}

const alfajores = {
  chainId: 44787,
  name: 'Alfajores',
  currency: 'CELO',
  explorerUrl: 'https://explorer.celo.org/alfajores',
  rpcUrl: 'https://alfajores-forno.celo-testnet.org'
}

// 3. Create modal
const metadata = {
  name: 'My Celo App',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [celo, alfajores],
  defaultChain: celo,
  projectId
})

export default function App() {
  return <YourApp/>
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

```ts
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits } from 'ethers'

const USDTAddress = '0x617f3112bf5397D0467D315cC709EF968D9ba546'

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const USDTAbi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

function Components() {
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  async function getBalance(){
    if(!isConnected) throw Error("User disconnected")

    const ethersProvider =  new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const USDTContract = new Contract(USDTAddress, USDTAbi, signer)
    const USDTBalance = await USDTContract.balanceOf(address)

    console.log(formatUnits(USDTBalance, 18))
  }
  
  return (
    <button onClick={getBalance}>Get User Balance</button>
  )
}
```
- [Learn more about Web3Modal SDK](https://docs.walletconnect.com/web3modal/about)
- [Learn more about Ethers](https://docs.ethers.org/v6/getting-started/)