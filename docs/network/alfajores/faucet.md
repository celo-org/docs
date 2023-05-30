---
title: Celo Testnet Funds
description: How to fund your Celo wallet account with testnet funds.
---

# Celo Wallet Testnet Funds

How to fund your Celo wallet account with testnet funds.

---

## Getting Started

To start experimenting with the Alfajores Testnet, you will first need to get a funded account.

:::warning

Alfajores Testnet accounts hold no real world economic value. The testnet's data may be reset on a regular basis. This will erase your accounts, their balance and your transaction history.

:::

Getting an account is really being given or generating a public-private keypair. This gives you control of balances accessible with the address corresponding to that key. For CELO, this is a native balance stored at the account whose address matches your key. For Celo Dollars, an ERC-20 token, the Mento Stablecoin smart contract maintains in its storage a mapping of the balance of each address.

## Using an existing EVM Address

You can reuse the same address and private key you use on other EVM networks as long a you are using a wallet that has support for Celo Networks like Alfajores. [Open Config for Alfajores](https://chainlist.org/chain/44787)

## Creating an empty account with the Celo Client

You can also use the Celo Blockchain client to create and manage account keypairs.

#### **Prerequisites**

- **You have Docker installed.** If you don’t have it already, follow the instructions here: [Get Started with Docker](https://www.docker.com/get-started). It will involve creating or signing in with a Docker account, downloading a desktop app, and then launching the app to be able to use the Docker CLI. If you are running on a Linux server, follow the instructions for your distro [here](https://docs.docker.com/install/#server). You may be required to run Docker with sudo depending on your installation environment.

Create and cd into the directory where you want to store the keypair. You can name this whatever you’d like, but here’s a default you can use:

```bash
mkdir celo-data-dir $ cd celo-data-dir
```

Create an account by running this command:

```bash
docker run -v `pwd`:/root/.celo --rm -it us.gcr.io/celo-org/geth:alfajores account new
```

It will prompt you for a passphrase, ask you to confirm it, and then will output your account address:

`Address: <YOUR-ACCOUNT-ADDRESS>`

This creates a keypair and stores it. Save this address to an environment variable, so that you can reference it later:

```bash
export CELO_ACCOUNT_ADDRESS=<YOUR-ACCOUNT-ADDRESS>
```

## **Add funds to an existing account with the Faucet**

The Alfajores Testnet Faucet is an easy way to get more funds deposited to an account, however it was created.

Visit [faucet.celo.org](https://faucet.celo.org), and enter your account address. If you are using the Celo Wallet, you can find your account address in the Settings page. Complete the Captcha, and click 'Add Funds'.

Each time you complete a faucet request, your account is funded with an additional CELO Tokens
