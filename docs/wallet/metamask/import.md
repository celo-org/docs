---
title: Import Valora Wallet to MetaMask
description: How to import your Celo account to MetaMask from a Valora wallet.
---

# Import Valora to MetaMask

How to import your Celo account to MetaMask from a Valora wallet.

---

## Getting Started

Importing a Celo Account to MetaMask allows you to extend Celo to any application that integrates with MetaMask. This guide helps you import your Celo account using a Valora Wallet and so you to access your Celo account using MetaMask.

- Prerequisites required to start using MetaMask and Celo
- Create a simple project directory to temporarily store project information
- Access your Valora account and private key with the celocli
- Import your private key to MetaMask to access your Celo account

## Prerequisites

Before getting started, it’s important to have downloaded MetaMask, Valora, and have completed some basic configuration on each account. Follow the links below for additional guides on each topic.

- [Download MetaMask](https://metamask.io/download/) and create an account.
- [Download Valora](https://valoraapp.com/) and create an account.
- Configure [MetaMask to work with Celo](/wallet/metamask/use)
- Install the [celocli](/cli/)

## Set up your project

Create a new project directory.

```
mkdir valora-metamask
```

Change into your project directory.

```
cd valora-metamask
```

Create a text file to temporarily store your Valora Recovery Phrase.

```
touch valora-recovery-phrase.txt
```

Open the text file to store your Recovery Phrase.

```
open valora-recovery-phrase.txt
```

### Valora Private Keys

- Open the Valora App, navigate to **Menu > Recovery Phrase**, and Enter PIN to reveal your Recovery Phrase.

:::caution

The Recovery Phrase is a series of 24 unique words specific to your Valora wallet. Do not lose these words or share them with anyone at any time.

:::

**Populate Text File**

Populate your text file with the Recovery Phrase shown in your Valora wallet.

```
one two three four five six seven...
```

**Access Private Key**

Open your terminal and type the following command to read your account information.

```
celocli account:new --mnemonicPath valora-recovery-phrase.txt
```

This command will display your Valora wallet mnemonic, accountAddress, privateKey, publicKey, and address.

```
mnemonic: one two three four five six seven...
accountAddress: 0x...
privateKey: [COPY THIS PRIVATE KEY]
publicKey: ...
address: 0x...
```

- Copy the **privateKey** from your terminal window.

:::note

This celocli command also shows your <strong>accountAddress</strong>. You won’t be using this in this guide, but it is important to verify that this is the correct address for your Valora wallet. Before moving on, confirm that the digits of the <strong>Account Address</strong> from your Valora Wallet match the <strong>accountAddress</strong> displayed in your terminal.

:::

:::caution

Anyone that has access to your private key will be able to access and control the funds in your wallet. Only store your private key in a safe location and do not share it with anyone.

:::

### Import Private Key

- Open MetaMask and select **Celo (Mainnet)** as your network.`
- Select **Settings > Import Account **select type** Private Key **and paste the private key from your terminal window.
- Select **Import** to import your Celo Account from your Valora Wallet.

### Delete Project Directory

MetaMask is now connected to your Valora wallet. The value of your Valora wallet should show in your MetaMask account and you can now use MetaMask to access your funds.

:::note

You may now delete your project directory along with the text file used to store your wallet address.

:::
