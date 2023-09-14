---
title: Build on MiniPay
description: A guide to building on MiniPay and Celo.
---

## Building DApps for miniPay Wallet

---

Welcome to the miniPay wallet integration guide. If you're aiming to deploy your decentralized apps within the miniPay app, this guide is tailored for you. We'll walk you through the process of integrating the windows.provider object provided by the miniPay wallet's webview with popular web3 JavaScript libraries.

### Overview

When your website is loaded inside the miniPay app's webview, the miniPay wallet injects a Web3 provider via the `windows` object, akin to `window.ethereum`. This provider is compatible with a majority of web3 libraries that accept a provider object.

### Integration with Popular Web3 Libraries

#### 1. Web3.js

Web3.js is a widely-used Ethereum JavaScript API. To utilize the `windows.provider` with `Web3.js`:

```js
const Web3 = require('web3');

// Ensure miniPay provider is available
if (window.provider) {
    const web3 = new Web3(window.provider);
} else {
    console.error("miniPay provider not detected");
}
```

#### 2. Ethers.js

Ethers.js offers a comprehensive Ethereum wallet implementation and utilities in both JavaScript and TypeScript. Here's how to integrate it with miniPay:

```js
const { ethers } = require('ethers');

// Ensure miniPay provider is available
if (window.provider) {
    const provider = new ethers.providers.Web3Provider(window.provider);
} else {
    console.error("miniPay provider not detected");
}
```

#### 3. Wagmi

Wagmi.js is an emerging library in the Ethereum ecosystem. To integrate it with miniPay's provider, you can use the `useConnect` hook:

```js
import { useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const { connect } = useConnect({
    connector: new InjectedConnector(),
});

useEffect(() => {
    connect();
}, []);
```

This code sets up an `InjectedConnector` and then utilizes the `connect` method from the `useConnect` hook. The `useEffect` ensures that the connection is established when the page loads.

#### 4. Viem

Viem is another library gaining traction. Here's how you can integrate it:

```js
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
});

const [address] = await client.getAddresses();
```

In the Viem example, we're creating a wallet client that specifies the chain and a custom transport using `window.ethereum`. The `getAddresses` method then retrieves the connected addresses.

### Important Notes

- Ensure the "Connect Wallet" button is hidden when your DApp is loaded inside the miniPay app, as the wallet connection is implicit.
- Always verify the existence of `window.provider` before initializing your web3 library to ensure seamless compatibility with the miniPay wallet.
