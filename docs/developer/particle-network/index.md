---
title: Particle Network
description: Walkthrough on leveraging Particle Network's Wallet Abstraction on Celo.
---

# Integrate Particle Connect on Celo

[Particle Network](https://particle.network) offers Wallet Abstraction services to streamline user onboarding.

The [Particle Connect SDK](https://developers.particle.network/api-reference/connect/desktop/web) supports EVM-compatible chains, including Celo and its testnet. It enables 2-click onboarding with social and Web3 login options within a single modal.

With Particle Network's Wallet-as-a-Service, developers on Celo can integrate social logins for the Celo Mainnet and Alfajores Testnet, embedding wallets directly into applications.

This page provides an overview and tutorial on implementing Particle Connect in a Celo-based application, specifically on the Celo Mainnet, to help you get started with integration.

## Tutorial: Implementing Particle Connect on Celo

The Particle Connect SDK simplifies wallet creation, user login, and blockchain interactions through a single interface. It supports both social logins and traditional Web3 wallets, making Web3 more accessible to users of all experience levels. 

To install this library, alongside Viem, which is used in the backend by Connect and ethers, which is used to demonstrate how to use any EIP-1193 provider, run the following command at the root of your project:

```shell
yarn add @particle-network/connectkit viem@^2 ethers
```

This tutorial is based on a [Next.js app](https://nextjs.org/docs/getting-started/installation) with TypeScript and Tailwind CSS that demonstrates using social logins for wallet creation on Celo.

### 1. Set Up Particle Connect

To start, we’ll configure and initialize Particle Connect (Particle's flagship authentication SDK). Begin by creating a new file called `ConnectKit.tsx` in your project’s root directory, where we’ll set up the `ParticleConnectKit` component as the main interface for configuration.

Before proceeding, create a new project with a web app on the [Particle dashboard](https://dashboard.particle.network) and retrieve the following API keys:

- **`projectId`** – your project’s unique ID.
- **`clientKey`** – your client-specific key.
- **`appId`** – your application ID.

These keys are essential as they connect your Particle Connect instance with the Particle dashboard, enabling features like no-code customization, user activity tracking, and API request authentication.

Place the API keys in a `.env` file in the following format:

```plaintext
NEXT_PUBLIC_PROJECT_ID='PROJECT_ID'
NEXT_PUBLIC_CLIENT_KEY='CLIENT_KEY'
NEXT_PUBLIC_APP_ID='APP_ID'
```

This setup ensures that your API keys are securely accessible to the Next.js application while protecting them from unauthorized access.

Here’s the code to add to your `ConnectKit.tsx` file:

```javascript
"use client";

import React from "react";
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import { celo, celoAlfajores } from "@particle-network/connectkit/chains";
import { wallet, EntryPosition } from "@particle-network/connectkit/wallet";

const config = createConfig({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,

  walletConnectors: [
    authWalletConnectors({}),
  ],

  plugins: [
    wallet({
      entryPosition: EntryPosition.BR, // Positions the modal button at the bottom right on login
      visible: true, // Determines if the wallet modal is displayed
    }),
  ],
  chains: [celo, celoAlfajores],
});

export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
```

This setup initializes the `ParticleConnectKit` component—a wrapper for the configured `ConnectKitProvider` instance—using your project keys and defining essential SDK settings. These settings include supported blockchain networks (Celo and Alfajores), wallet positioning, and visibility options for an optimal user experience.

For further customization options, refer to the [Particle Connect documentation](https://developers.particle.network/api-reference/connect/desktop/web#configuration).

### 2. Integrate the `ParticleConnectKit` Component in Your App

With the configuration complete, wrap your application with the `ParticleConnectKit` component to provide global access to the Particle Connect SDK. To do this, update your `layout.tsx` file located in `src` as shown below:

```typescript
import { ParticleConnectkit } from '@/connectkit';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Particle Connectkit App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParticleConnectkit>{children}</ParticleConnectkit>
      </body>
    </html>
  );
}
```

By wrapping your application in `ParticleConnectKit`, you make the Particle Connect SDK available globally within your app. This setup in `layout.tsx` ensures all components have access to the SDK, enabling features like social logins and wallet generation across your app.

### 3. Set Up Key Hooks in `page.tsx`

With Particle Connect configured, you can use the SDK for social logins and wallet interactions within your application. In this example, we’ll set up several essential hooks in `page.tsx` to manage user connection, retrieve data, and perform blockchain interactions.

For this example, we’ll use five hooks from `@particle-network/connectkit`:

- `ConnectButton`: Displays a connect button, transforming into an embedded widget once logged in.
- `useAccount`: Retrieves the user’s wallet address and connection state.
- `useWallets`: Provides the connected wallet, allowing interactions with the blockchain.
- `usePublicClient`: You can fetch data from the chain, like balances, using Viem.
- `useDisconnect`: Lets you set up custom disconnect functionality.

For a comprehensive list of hooks, check the [Particle Connect documentation](https://developers.particle.network/api-reference/connect/desktop/web#key-react-hooks-for-particle-connect).

Below is a sample implementation in `page.tsx`, showcasing how to use these hooks to connect via social logins, retrieve user data, and display it:

```js
"use client";

import React, { useState, useEffect } from "react";
import {
  ConnectButton,
  useAccount,
  useDisconnect,
  useWallets,
  usePublicClient,
} from "@particle-network/connectkit";
import { ethers, type Eip1193Provider } from "ethers";
import { parseEther, formatEther } from "viem";

export default function Home() {
  // Account-related states
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [primaryWallet] = useWallets();
  const publicClient = usePublicClient();

  // State variables for recipient address, transaction hash, and balance
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("");

  // Fetch and display user balance when connected
  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        try {
          const balanceResponse = await publicClient.getBalance({ address });
          const balanceInEther = formatEther(balanceResponse);
          setBalance(balanceInEther);
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    if (isConnected) {
      fetchBalance();
    }
  }, [isConnected, address, publicClient]);

  // Send transaction using ethers.js with a custom EIP-1193 provider
  const executeTransaction = async () => {
    if (!recipientAddress || !primaryWallet) return;

    const tx = {
      to: recipientAddress,
      value: parseEther("0.01"), // Set value to 0.01 Ether
      data: "0x",
    };

    try {
      const EOAprovider = await primaryWallet.connector.getProvider();
      const customProvider = new ethers.BrowserProvider(
        EOAprovider as Eip1193Provider,
        "any"
      );
      const signer = await customProvider.getSigner();
      const txResponse = await signer.sendTransaction(tx);
      const txReceipt = await txResponse.wait();

      setTransactionHash(txReceipt.hash);
    } catch (error) {
      console.error("Error executing transaction:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white">
      <ConnectButton label="Connect Wallet" />
      {isConnected && (
        <div className="w-full max-w-md mt-6">
          <h2 className="text-xl font-bold text-white mb-4">Account Details</h2>
          <p className="text-lg text-white">
            Balance: {balance || "Loading..."} ETH
          </p>
          <h2 className="text-xl font-bold text-white mt-6 mb-4">
            Send 0.01 ETH
          </h2>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="p-2 w-full rounded border border-gray-700 bg-gray-900 text-white"
          />
          <button
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={executeTransaction}
            disabled={!recipientAddress}
          >
            Send Transaction
          </button>
          <button
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={disconnect}
          >
            Disconnect
          </button>
          {transactionHash && (
            <div className="text-sm text-green-500 mt-4">
              Transaction Hash: {transactionHash}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

As shown above, Particle Network's Wallet-as-a-Service can be plugged in and used in a way similar to any other standard wallet that exposes an EIP-1193 provider on Celo, enabling social logins in just a few lines of code.

## Learn More

- [Particle Dashboard](https://dashboard.particle.network)
- [Particle Documentation](https://docs.particle.network)
