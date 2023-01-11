---
title: Create an Escrow NFT Platform on Celo with Python.
description: Create an Escrow NFT.
authors:
  - name: Abiyyu Yafu
url: https://github.com/yafiabiyyu
image_url: https://github.com/yafiabiyyu.png
tags: [NFT]
hide_table_of_contents: true
slug: /tutorials/create-an-escrow-nft-platform-on-celo-with-python
---

# Create an Escrow NFT Platform on Celo with Eth-Brownie Python

## Introduction​

Eth-brownie is a Python package that is useful for developing and testing Ethereum applications (applications that use the Ethereum blockchain technology). Eth-brownie provides an easy-to-use interface for accessing Ethereum features such as sending transactions, using smart contracts, and managing accounts. Eth-brownie also provides useful tools for quickly and easily testing Ethereum applications.

## Prequisites

In this tutorial, we will be creating an escrow NFT contract using eth-brownie. Please ensure that you have a basic understanding of the Python programming language.


## Requirements

- [Python3](https://www.python.org/downloads/release/python-368/) or greater
- [NodeJs](https://nodejs.org/en/) >= v14.0.0 and npm >= 6.12.0 (For Ganache)
- [Ganache](https://github.com/trufflesuite/ganache)
- python-dotenv

**Here’s a list of what we’ll cover 🗒**

- ✅ **Step 1:** Environment setup​
- ✅ **Step 2:** Project setup
- ✅ **Step 3:** Write project code
- ✅ **Step 4:** Configure deployment settings
- ✅ **Step 5:** Compile and migrate your contract
- ✅ **Step 6:** Deploy your Contract
- ✅ **Step 7:** View your deployed contract
- ✅ **Step 8:** Verify your smart contract

<br>

## **Step 1:** Environment setup

We will install the eth-brownie package using the Python package manager, pip3. We will also install Ganache, a personal blockchain for Ethereum development you can use to deploy contracts, develop applications, and run tests. you can use command below to install eth-brownie and Ganache.

```bash 
$ pip3 install eth-brownie
```
```bash 
$ npm install ganache --global
```

## **Step 2:** Project setup

We will create a new project folder and initialize it with brownie. You can use the command below to create a new project folder and initialize it with brownie.

```bash
$ mkdir escrow-nft
$ cd escrow-nft
$ brownie init
```

After we have initialized our project folder with brownie, we will to configure our project settings.

### Environment variables

for first, we will create a .env file in our project folder and add the following environment variables.

```bash
MNEMONIC="your mnemonic"
```

### Brownie network configuration

We will add Celo network to our brownie network configuration. use the command below to add Celo network to our brownie network configuration.

```bash
$ brownie networks add Celo celo-mainnet host=https://forno.celo.org chainid=42220 explorer=https://explorer.celo.org

$ brownie networks add Celo celo-alfajores host=https://alfajores-forno.celo-testnet.org chainid=44787 explorer=https://alfajores-blockscout.celo-testnet.org

```

after adding the Celo network to our brownie network configuration, you can use the command below to view the network configuration.

```bash
$ brownie networks list
```

and you will get the output below.

![networks list](images/1.png)

### Brownie config

next, we will add configuration for our project. Create a `brownie-config.yaml` file in our root project folder and add the following configuration.

```yaml
reports:
  exclude_contracts:
    - SafeMath
depedencies:
  - OpenZeppelin/openzeppelin-contracts@4.8.0
compiler:
  solc:
    version: 0.8.16
    optimizer:
      enabled: true
      runs: 200
    remappings:
      - "@openzeppelin=OpenZeppelin/openzeppelin-contracts@4.8.0"
networks:
  default: celo-alfajores
console:
  show_colors: true
  color_style: monokai
  auto_suggest: true
  completions: true
  editing_mode: emacs
dotenv: .env
wallets:
  from_mnemonic: ${MNEMONIC}
```

if you want to read more about brownie-config.yaml, you can visit [here](https://eth-brownie.readthedocs.io/en/stable/config.html).