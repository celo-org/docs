---
title: Build with Portal
description: A guide to embedding secure MPC wallets in your Celo application
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Build with Portal

This guide covers how to use Portal to embed secure MPC wallets in your Celo applications, providing users with enhanced security and a seamless experience.

## Overview

[Portal](https://portalhq.io/) is an MPC wallet provider and web3 developer platform that enables you to create embedded wallets for your users. By integrating Portal into your Celo dApp, you can:

- **Create Embedded Wallets**: Build wallet functionality directly into your application
- **Leverage MPC Security**: Use threshold cryptography for enhanced wallet security
- **Simplify User Experience**: Eliminate the need for seed phrases while maintaining security
- **Enable Secure Backups**: Provide reliable wallet recovery options through MPC key share backups
- **Support Multiple Networks**: Build on Celo while supporting other blockchains simultaneously

Portal's comprehensive SDK makes it straightforward to add these features while maintaining a smooth user experience.

## How Portal's MPC Works

Portal leverages Multi-Party Computation (MPC) and specifically Threshold Signature Schemes (TSS) to distribute cryptographic key shares across multiple parties:

1. **Key Generation**: Instead of a single private key, Portal creates multiple key shares
2. **Secure Distribution**: Key shares are securely distributed between the user device and Portal
3. **Transaction Signing**: Signatures are created without ever reconstructing the full private key
4. **Backup & Recovery**: Key shares are backed up securely, enabling wallet recovery if a device is lost

This approach provides significant security advantages over traditional wallet solutions while maintaining flexibility for developers.

## What Can You Build?

With Portal's SDK, you can build a variety of blockchain applications on Celo, including:

- **Financial Applications**: Create payment and financial services using Celo's stablecoins (cUSD, cEUR, cREAL)
- **DeFi dApps**: Build decentralized finance applications with embedded wallet functionality
- **Web3 Social Platforms**: Develop social applications with built-in wallet capabilities
- **Enterprise Solutions**: Create business applications with secure treasury management
- **NFT & Gaming Platforms**: Build digital asset platforms with seamless wallet integration

## Getting Started

Ready to start building with Portal on Celo? Check out our [quickstart guide](#portal-sdk-quick-start) to set up the Portal SDK and create your first integration.

## Key Features

Portal provides extensive wallet and web3 functionality for Celo developers:

- **MPC Wallet Generation**: Create secure wallets using threshold cryptography
- **Secure Backup & Recovery**: Enable reliable wallet recovery without seed phrases
- **Transaction Management**: Support for sending various transaction types on Celo
- **Smart Contract Interactions**: Easy interface for calling contract functions
- **Asset Management**: Token balance tracking and transfers for Celo assets
- **Multi-chain Support**: Build cross-chain applications that include Celo

## Resources

- [Portal Documentation](https://docs.portalhq.io/)
- [Portal Website](https://portalhq.io/)
- [SDK Quick Start Guide](https://docs.portalhq.io/getting-started/sdk-quick-start)
- [API Reference](https://docs.portalhq.io/api-reference)


## Portal SDK Quick Start

### Installation

Portal offers SDKs for Web, iOS, Android, and React Native. Choose the appropriate SDK for your application platform.

<Tabs>
  <TabItem value="web" label="Web" default>

```bash
yarn add @portal-hq/web
```

  </TabItem>
  <TabItem value="ios" label="iOS">

1. In Xcode, right-click on your project in the Project Navigator
2. Select "Add Packages..."
3. In the search field, enter either:
   - Package name: `PortalSwift`
   - Repository URL: `https://github.com/portal-hq/PortalSwift`
4. Select your desired version
5. Click "Add Package"

  </TabItem>
  <TabItem value="android" label="Android">

Update the dependencies in your app level `build.gradle` to include the portal-android dependency:

```
implementation "io.portalhq.android:portal-android:X.X.X"
```

  </TabItem>
  <TabItem value="react-native" label="React Native">

```bash
yarn add @portal-hq/core @portal-hq/keychain @portal-hq/gdrive-storage
```

The basic Portal setup consists of three packages:

- `@portal-hq/core` - The core Portal library.
- `@portal-hq/keychain` - An adapter for storing MPC signing shares on-device.
- `@portal-hq/gdrive-storage` - An adapter for storing MPC backup shares off-device.

These modules allow you to initialize Portal in your app.

  </TabItem>
</Tabs>

### Authentication

The Portal SDK is initialized with a Client API Key or Client Session Token. You can get a test Client API Key from the [Portal Admin Dashboard](https://app.portalhq.io/) in the Settings → Test Client API Keys section.

Simply click the "New +" button to create a new test API key. A modal will appear allowing you to copy your test Client API Key.

### Initializing Portal

To initialize Portal in your application, create a new instance of the Portal class. You'll need to provide your test Client API Key during initialization.

<Tabs>
  <TabItem value="web" label="Web" default>

```javascript
import Portal from "@portal-hq/web";

const portal = new Portal({
  apiKey: "YOUR_TEST_CLIENT_API_KEY",
  autoApprove: true,
  rpcConfig: {
    "eip155:11155111": "YOUR-INFURA-OR-ALCHEMY-URL",
    "eip155:42220": "https://forno.celo.org", // Celo Mainnet
  },
});
```

  </TabItem>
  <TabItem value="ios" label="iOS">

```swift
import PortalSwift

let portal = try Portal("YOUR_TEST_CLIENT_API_KEY", autoApprove: true)
```

  </TabItem>
  <TabItem value="android" label="Android">

```kotlin
import io.portalhq.android.Portal

val portal = Portal("YOUR_TEST_CLIENT_API_KEY", autoApprove = true)
```

  </TabItem>
  <TabItem value="react-native" label="React Native">

```javascript
import Portal from "@portal-hq/core";

const portal = new Portal({
  apiKey: "YOUR_TEST_CLIENT_API_KEY",
  autoApprove: true,
  gatewayConfig: {
    ["eip155:1"]: "https://api.portalhq.io/rpc/v1/eip155/1",
    ["eip155:42220"]: "https://api.portalhq.io/rpc/v1/eip155/42220", // Celo Mainnet
    ["eip155:44787"]: "https://api.portalhq.io/rpc/v1/eip155/44787", // Celo Alfajores
  },
});
```

  </TabItem>
</Tabs>

### Creating an MPC Wallet

To create a new MPC wallet, use the `portal.createWallet()` function. This will generate distributed MPC key shares, storing the user's signing share in the device's secure keychain.

<Tabs>
  <TabItem value="web" label="Web" default>

```javascript
const eip155Address = await portal.createWallet();
console.log(`My Portal EVM address: ${eip155Address}`);
```

  </TabItem>
  <TabItem value="ios" label="iOS">

```swift
let addresses = try await portal.createWallet()
print("My Portal EVM address: \(addresses.ethereum)")
```

  </TabItem>
  <TabItem value="android" label="Android">

```kotlin
val addresses = portal.createWallet()
println("My Portal EVM wallet: ${addresses.ethereumAddress}")
```

  </TabItem>
  <TabItem value="react-native" label="React Native">

```javascript
const addresses = await portal.createWallet();
console.log(`My Portal EVM address: ${addresses.eip155}`);
```

  </TabItem>
</Tabs>

### Backing Up and Recovering the Wallet

Portal's MPC architecture creates backup key shares that enable wallet recovery if a device is lost or replaced. Portal supports the following backup methods: iCloud, Gdrive, Passkey, and Password.

## Receive Testnet Tokens

After creating a wallet, you can fund it with test tokens using `portal.receiveTestnetAsset`. For Celo testnet tokens, you also can use the [Celo faucet](https://faucet.celo.org/).

<Tabs>
  <TabItem value="web" label="Web" default>

```javascript
const chainId = "eip155:44787"; // Celo Alfajores
const params = {
  amount: "0.01", // You will receive 0.01 CELO
  token: "NATIVE", // Token, use "NATIVE" for the chain's native token
};
// Fund your Portal wallet
const response = await portal.receiveTestnetAsset(chainId, params);
console.log(`✅ Transaction hash: ${response.data.txHash}`);
```

  </TabItem>
  <TabItem value="ios" label="iOS">

```swift
let chainId = "eip155:44787" // Celo Alfajores
let params = FundParams(
  amount: "0.01", // You will receive 0.01 CELO
  token: "NATIVE" // Token, use "NATIVE" for the chain's native token
)
// Fund your Portal wallet
let response = portal.receiveTestnetAsset(chainId, params)
print("✅ Transaction hash: \(response.data.txHash)")
```

  </TabItem>
  <TabItem value="android" label="Android">

```kotlin
val chainId = "eip155:44787" // Celo Alfajores
val params = FundParams(
  amount = "0.01", // You will receive 0.01 CELO
  token = "NATIVE" // Token, use "NATIVE" for the chain's native token
)
// Fund your Portal wallet
val response = portal.receiveTestnetAsset(chainId, params)
println("✅ Transaction hash: ${response.data.txHash}")
```

  </TabItem>
  <TabItem value="react-native" label="React Native">

```javascript
const chainId = "eip155:44787"; // Celo Alfajores
const params = {
  amount: "0.01", // You will receive 0.01 CELO
  token: "NATIVE", // Token, use "NATIVE" for the chain's native token
};
// Fund your Portal wallet
const response = await portal.receiveTestnetAsset(chainId, params);
console.log(`✅ Transaction hash: ${response.data.txHash}`);
```

  </TabItem>
</Tabs>

### Sending Tokens

Portal provides two ways to send transactions:

1. `portal.sendAsset()` - A simple method for sending tokens from the Portal wallet.
2. `portal.request()` - Direct access to the underlying web3 provider for custom transactions.

Transaction signing is performed using MPC, with the signing operation distributed across key shares without ever reconstructing the full private key.

<Tabs>
  <TabItem value="web" label="Web" default>

```javascript
const chainId = "eip155:42220"; // Celo Mainnet
const params = {
  amount: "0.0001", // Sends 0.0001 CELO
  to: "0xDestinationAddress", // The recipient address
  token: "NATIVE", // Token, use "NATIVE" for the chain's native token
};
// Send the tokens
const txHash = await portal.sendAsset(chainId, params);
console.log(`✅ Transaction hash: ${txHash}`);
```

  </TabItem>
  <TabItem value="ios" label="iOS">

```swift
let chainId = "eip155:42220" // Celo Mainnet
let params = SendAssetParams(
  amount: "0.0001", // Sends 0.0001 CELO
  to: "0xDestinationAddress", // The recipient address
  token: "NATIVE" // Token, use "NATIVE" for the chain's native token
)
// Send the tokens
let txHash = try await portal.sendAsset(chainId, params)
print("✅ Transaction hash: \(txHash)")
```

  </TabItem>
  <TabItem value="android" label="Android">

```kotlin
val chainId = "eip155:42220" // Celo Mainnet
val params = SendAssetParams(
  amount = "0.0001", // Sends 0.0001 CELO
  to = "0xDestinationAddress", // The recipient address
  token = "NATIVE" // Token, use "NATIVE" for the chain's native token
)
// Send the tokens
val txHash = portal.sendAsset(chainId, params)
println("✅ Transaction hash: ${txHash}")
```

  </TabItem>
  <TabItem value="react-native" label="React Native">

```javascript
const chainId = "eip155:42220"; // Celo Mainnet
const params = {
  amount: "0.0001", // Sends 0.0001 CELO
  to: "0xDestinationAddress", // The recipient address
  token: "NATIVE", // Token, use "NATIVE" for the chain's native token
};
// Send the tokens
const txHash = await portal.sendAsset(chainId, params);
console.log(`✅ Transaction hash: ${txHash}`);
```

  </TabItem>
</Tabs>

### Next Steps

Congratulations! You've successfully integrated Portal with your Celo application. You've created secure MPC wallets for your users and implemented basic transaction functionality. For more comprehensive information about Portal's MPC architecture and additional features, explore the [complete Portal documentation](https://docs.portalhq.io/).