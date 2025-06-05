---
title: Composer Kit UI
---

Composer Kit (@composer-kit/ui) is a **ready-to-use React component library** designed specifically for building web3 applications on the **Celo blockchain**. It provides a comprehensive set of modular, accessible, and customizable UI components that make it easy to integrate wallet connections, token balances, payments, NFT interactions, and more into your dApp.

Visit the [official Composer Kit website](https://www.composerkit.xyz/) to explore interactive examples and get started quickly.

## Key Features

- 🔧 **Plug-and-play React components** for Celo dApps
- 💼 **Wallet connection, payment, swap, NFT, and identity modules**
- ⚡ **Simple installation and configuration**
- ♿ **Optimized for accessibility and responsive design**
- 📚 **Comprehensive documentation and real-world usage examples**

## Prerequisites

- Node.js (v16 or higher)
- React (v17 or higher)
- A Celo dApp project

## Installation

Install Composer Kit UI using your preferred package manager:

```bash
# npm
npm install @composer-kit/ui

# pnpm
pnpm add @composer-kit/ui

# yarn
yarn add @composer-kit/ui
```

## Getting Started

To use Composer Kit in your React application, you'll need to configure the `ComposerKitProvider` at the root of your app:

```jsx
import { ComposerKitProvider } from "@composer-kit/ui";

function App() {
  return <ComposerKitProvider>{/* Your app content */}</ComposerKitProvider>;
}
```

## Core Components

Composer Kit UI provides several categories of components to accelerate your Celo dApp development:

### Wallet Components

- **Wallet**: Connect and display wallet information
- **Connect Button**: Simplified wallet connection
- **Avatar & Name**: Display user identity

### Payment & Transaction Components

- **Payment**: Send payments with built-in dialog and error handling
- **Transaction**: Execute blockchain transactions with status tracking
- **Balance**: Display and manage token balances

### Token & DeFi Components

- **Swap**: Token exchange interface
- **TokenSelect**: Search and select from available tokens
- **Address**: Display Ethereum addresses with copy functionality

### NFT Components

- **NFTCard**: Display NFT details
- **NFTMint**: Mint NFTs with a user-friendly interface
- **NFTImage & NFTMeta**: NFT display components

### Identity Components

- **Identity**: Display user information with social links
- **Social Links**: Integration with Twitter, GitHub, Farcaster, and more

## Quick Example

Here's a simple example of using the Payment component:

```jsx
import { useState } from "react";
import { Payment, PaymentDialog, PaymentError } from "@composer-kit/ui/payment";
import { celo } from "viem/chains";

export const PaymentExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [txHash, setTxHash] = useState("");

  return (
    <Payment
      amount="0.001"
      chain={celo}
      onSuccess={(hash) => {
        setTxHash(hash);
        setIsOpen(false);
      }}
      onError={(error) => {
        console.error("Payment error", error);
      }}
      recipientAddress="0x717F8A0b80CbEDe59EcA195F1E3D8E142C84d4d6"
      tokenAddress="0x765de816845861e75a25fca122bb6898b8b1282a"
    >
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        Pay Now
      </button>
      <PaymentDialog onOpenChange={() => setIsOpen(!isOpen)} open={isOpen} />
      <PaymentError />
    </Payment>
  );
};
```

## Component Categories

### 🔗 **Address Components**

Display Ethereum addresses with truncation and copy-to-clipboard functionality.

### 💰 **Balance Components**

Manage and display token balances with precision control and token selection.

### 👤 **Identity Components**

Show user profiles with avatars, names, balances, and social media links.

### 🖼️ **NFT Components**

Display, preview, and mint NFTs with comprehensive metadata support.

### 💸 **Payment Components**

Handle payments with built-in transaction dialogs and error management.

### 🔄 **Swap Components**

Facilitate token swaps with intuitive interfaces and token selection.

### 🪙 **Token Select Components**

Search and select tokens from comprehensive token lists.

### 📊 **Transaction Components**

Execute smart contract interactions with status tracking and error handling.

### 👛 **Wallet Components**

Connect wallets and display user information seamlessly.

## Advanced Usage

Composer Kit UI is designed to be modular and composable. You can combine multiple components to create complex interfaces:

```jsx
import { Wallet, Identity, Balance, Swap } from "@composer-kit/ui";

export const DashboardExample = () => {
  return (
    <div className="dashboard">
      <Wallet>
        <Identity address="0x..." token="cUSD">
          <Avatar />
          <Name />
          <Balance />
        </Identity>
      </Wallet>

      <Swap>
        <SwapToken type="from" />
        <SwapToken type="to" />
        <SwapButton />
      </Swap>
    </div>
  );
};
```

## Styling and Customization

All components accept standard HTML attributes including `className` and `style` props, making them easy to customize with your preferred CSS framework:

```jsx
<Address
  address="0x..."
  className="bg-blue-500 text-white p-4 rounded-lg"
  copyOnClick={true}
/>
```

## Examples and Documentation

For comprehensive examples and detailed API documentation for each component:

- 🌐 **Official Website**: [composerkit.xyz](https://www.composerkit.xyz/) - Interactive examples and documentation
- 📚 **GitHub Repository**: [celo-org/composer-kit](https://github.com/celo-org/composer-kit) - Source code and detailed README
- 💻 **Live Examples**: Explore the interactive examples in the documentation

## Support

- 📖 **Documentation**: Detailed component APIs and examples
- 💬 **Discord**: Join the [Celo Discord server](https://chat.celo.org) and ask questions in the #general-dev channel
- 🐛 **Issues**: Report bugs or request features on [GitHub](https://github.com/celo-org/composer-kit)
- 🌐 **Community**: Connect with other developers building on Celo

## Next Steps

- Check out the [quickstart guide](./quickstart) to get started with Celo development
- Explore [building on MiniPay](./build-on-minipay/overview) for mobile-first experiences
- Learn about [DeFi integration](./build-with-defi) for financial applications
