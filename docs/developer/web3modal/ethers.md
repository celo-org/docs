---
title: Web3Modal SDK
description: Guide of Web3Modal SDK & Wagmi
---

# Web3Modal SDK & Wagmi

---

## Installation

```bash npm2yarn
npm install @web3modal/ethers5 ethers@5.7.2
```

## Usage

On top of your app set up the following configuration, making sure that all functions are called **outside** any React component to avoid unwanted rerenders.

```tsx
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

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
  rpcUrl: 'https://forno.alfajores.celo-testnet.org/'
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
import { useWeb3ModalSigner, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { ethers } from 'ethers'

const USDTAddress = '0x617f3112bf5397D0467D315cC709EF968D9ba546'

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const USDTAbi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

function Components() {
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { signer } = useWeb3ModalSigner()

  async function getBalance(){
    if(!isConnected) throw Error("User disconnected")

    // The Contract object
    const USDTContract = new ethers.Contract(USDTAddress, USDTAbi, signer)
    const USDTBalance = await USDTContract.balanceOf(address)

    console.log(ethers.utils.formatUnits(USDTBalance, 18))
  }
  
  return (
    <button onClick={getBalance}>Get User Balance</button>
  )
}
```
- [Learn more about Web3Modal SDK](https://docs.walletconnect.com/web3modal/about)
- [Learn more about Ethers](https://docs.ethers.org/v5/getting-started/)