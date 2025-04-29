---
title: Build with Portal
description: A guide to embedding secure MPC wallets in your Celo application
---

# Build with Portal

This guide covers how to use Portal to embed secure MPC wallets directly into your Celo applications, providing users with enhanced security and a seamless experience.

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

Ready to start building with Portal on Celo? Check out our [quickstart guide](./quickstart) to set up the Portal SDK and create your first integration.

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
