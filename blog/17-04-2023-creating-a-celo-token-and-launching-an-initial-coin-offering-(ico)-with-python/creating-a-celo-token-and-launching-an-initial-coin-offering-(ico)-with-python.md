---
title: Creating a Celo Token and Launching an Initial Coin Offering (ICO) with Python
description: Delve into the world of blockchain and explore how to create your own Celo token using Python. This comprehensive guide walks you through the entire process, from designing the token's smart contract to launching a successful Initial Coin Offering (ICO) using Python, and Solidity.
authors:
  - name: Joshua Moses
url: https://github.com/J0shcodes
tags: [celosage, intermediate, smartcontract, solidity]
hide_table_of_contents: true
slug: /tutorials/creating-a-celo-token-and-launching-an-initial-coin-offering-(ico)-with-python
---

![header](../../src/data-tutorials/showcase/intermediate/creating-a-celo-token-and-launching-an-initial-coin-offering-(ico)-with-python.png)


## Introduction

For business owners and investors alike, the rise of cryptocurrencies and decentralized finance (DeFi) has created a wealth of opportunities. Initial Coin Offerings (ICOs) and the creation of new tokens have grown in popularity as a means for projects to generate money and cultivate a following due to the rising demand for digital assets.

In this lesson, we'll look at how to use the Python programming language to create a Celo token and start an ICO. A safe and scalable infrastructure for decentralized apps (dApps) and stablecoins is offered by the blockchain platform Celo. Developers may easily design unique coins and smart contracts, and start ICOs by utilizing the power of Python.

## Prerequisites

It's crucial to have a fundamental understanding of blockchain technology and smart contracts before we start the course. Also, you should be knowledgeable with the following tools and technologies, as well as have some programming experience in Python:

- Web3.py library
- Solidity programming language

## Requirements

You must have the following programs and devices installed on your computer in order to follow this tutorial:

- Python 3.X
- Web3.py library

### Step 1: Setting up the Development Environment

Setting up a development environment is necessary before we can start creating and deploying smart contracts to the Celo network.

On your terminal, use the following commands to create a new folder for your project:

```bash
mkdir ico-python
cd ico-python
```

In your new directory, create a Python virtual environment and activate it with the following commands:

```bash
python3 -m venv env
source env/bin/activate
```

Next, Install the following libraries using pip, the Python package manager:

```bash
pip install web3 py-solc-x python-dotenv
```

### Step 2: Writing the Smart Contract

The creation of the smart contract that will specify the logic and regulations for our Celo token is the next step. On the Celo blockchain, a smart contract is a self-executing software that runs and executes when specific circumstances are met.

Solidity, a programming language used to create smart contracts for the Ethereum blockchain and also the Celo blockchain, since it’s a fork of the Ethereum blockchain, will be used to create the smart contract. A sample smart contract for a Celo token is as follows:

CeloToken.sol

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CeloToken {
    string public name = "Celo Token";
    string public symbol = "CELO";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping (address => uint256) public balanceOf;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply * 10**uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public {
        require(balanceOf[msg.sender] >= _value && _value > 0, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
    }
}
```

### Step 3: Deploying the Smart Contract

Deploying the smart contract to the Celo blockchain is the next step after writing it. We'll utilize the Web3.py package, which offers a Python interface for dealing with Ethereum, to do this. 

The smart contract must next be built and released onto the Celo network. To deploy and communicate with the smart contract, we will make use of the Web3.py module.

Here is an illustration of how to compile and deploy a smart contract:

deploy.py

```python
import json
import os
from web3 import Web3
from dotenv import load_dotenv
from solcx import compile_standard, install_solc

load_dotenv()

# Install specific Solidity compiler version
install_solc("0.8.0")

# Set up web3 connection
provider_url = os.environ.get("CELO_PROVIDER_URL")
web3 = Web3(Web3.HTTPProvider(provider_url))
assert web3.is_connected(), "Not connected to a Celo node"

# Set deployer account and private key
deployer = os.environ.get("CELO_DEPLOYER_ADDRESS")
private_key = os.environ.get("CELO_DEPLOYER_PRIVATE_KEY")

with open("CeloToken.sol", "r") as file:
    contract_source_code = file.read()

# Compile the contract
compiled_sol = compile_standard({
    "language": "Solidity",
    "sources": {
        "CeloToken.sol": {
            "content": contract_source_code
        }
    },
    "settings": {
        "outputSelection": {
            "*": {
                "*": ["metadata", "evm.bytecode", "evm.sourceMap"]
            }
        }
    }
})

# Extract the contract data
contract_data = compiled_sol['contracts']['CeloToken.sol']['CeloToken']
bytecode = contract_data['evm']['bytecode']['object']
abi = json.loads(contract_data['metadata'])['output']['abi']

# Deploy the smart contract
contract = web3.eth.contract(abi=abi, bytecode=bytecode)

nonce = web3.eth.get_transaction_count(deployer)
transaction = {
    'nonce': nonce,
    'gas': 2000000,
    'gasPrice': web3.eth.gas_price,
    'data': bytecode,
}
signed_txn = web3.eth.account.sign_transaction(transaction, private_key)
transaction_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
transaction_receipt = web3.eth.wait_for_transaction_receipt(transaction_hash)

# Get the contract address
contract_address = transaction_receipt['contractAddress']

print(f"Contract deployed at address: {contract_address}")
```

This program uses Python to set up a smart contract on the Celo blockchain. It begins by installing a particular version of the Solidity compiler and loading environment variables. It then establishes the deployer account and private key by connecting to a Celo node. The script takes the contract's data, including the bytecode and ABI, compiles the contract's Solidity source code from a file, and then deploys it on the Celo network. Once the transaction has been mined, the script gets the contract address and prints it to the terminal.

The contract should be deployed successfully and the contract address should be displayed on your terminal:

![images](https://user-images.githubusercontent.com/71826391/232349596-040edc66-9327-4595-b889-dc8cbe5ace8a.png)


### Step 4: Launching the ICO

The ICO launch follows the deployment of the smart contract. A project can raise money by selling tokens to investors in exchange for cryptocurrencies through an initial coin offering (ICO). The tokens, which can be traded on numerous platforms, each represent a portion of the project.

We will add a new feature to the smart contract that will enable investors to buy tokens in order to kick off the ICO. The function will accept the investor's desired investment in ETH and return the appropriate quantity of tokens.

Here's an illustration of how to make a function to buy tokens:

CeloToken.sol

```solidity
function purchaseTokens(uint256 _value) public payable {
        require(msg.value > 0, "Investment amount must be greater than 0");
        uint256 tokens = (_value * (10 ** decimals)) / 1 ether;
        balanceOf[msg.sender] += tokens;
        totalSupply += tokens;
        emit Transfer(address(0), msg.sender, tokens);
    }
```

### Step 5: Interacting with the Smart Contract

Finally, in order to buy tokens and transfer them across accounts, we must communicate with the smart contract. To accomplish this, we will call the smart contract's methods using the Web3.py module.

Create a new file in the root directory of your project called `[client.py](http://client.py)` and paste the following code:

client.py

```python
import os
from web3 import Web3
import deploy

abi = deploy.abi
contract_address = deploy.contract_address
deployer = deploy.deployer
private_key = deploy.private_key

# Set up web3 connection
provider_url = os.environ.get("CELO_PROVIDER_URL")
web3 = Web3(Web3.HTTPProvider(provider_url))
assert web3.is_connected(), "Not connected to a Celo node"

# Create an instance of the contract
celo_token = web3.eth.contract(
    address=contract_address, abi=abi)

# Create an instance of the contract
celo_token = web3.eth.contract(address=contract_address, abi=abi)

# Function to transfer tokens
def transfer_tokens(from_account, to_account, value):
    # Get the nonce for the from_account
    nonce = web3.eth.get_transaction_count(from_account)

    # Build the transaction
    transaction = celo_token.functions.transfer(to_account, value).build_transaction({
        'from': from_account,
        'nonce': nonce,
        'gas': 2000000,
        'gasPrice': web3.eth.gas_price,
    })

    # Sign the transaction
    signed_txn = web3.eth.account.sign_transaction(transaction, private_key)

    # Send the transaction
    tx_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

    return tx_receipt

# Function to purchase tokens
def purchase_tokens(investor, value):
    # Get the nonce for the investor account
    nonce = web3.eth.get_transaction_count(investor)

    # Build the transaction
    transaction = celo_token.functions.purchaseTokens(value).build_transaction({
        'from': investor,
        'nonce': nonce,
        'value': web3.to_wei(value, 'ether'),
        'gas': 2000000,
        'gasPrice': web3.eth.gas_price,
    })

    # Sign the transaction
    signed_txn = web3.eth.account.sign_transaction(transaction, private_key)

    # Send the transaction
    tx_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

    return tx_receipt

# Transfer tokens
recipient = '0xcdd1151b2bC256103FA2565475e686346CeFd813'
tx_receipt = transfer_tokens(deployer, recipient, 100)
print(
    f"Transfer of 100 tokens from {deployer} to {recipient} completed with transaction hash: {tx_receipt.transactionHash.hex()}")

# Purchase tokens
investor = deployer
tx_receipt = purchase_tokens(investor, 1)
print(
    f"Purchase of 1 ether worth of tokens by {investor} completed with transaction hash: {tx_receipt.transactionHash.hex()}")
```

Now let’s go through the functions in the code to understand what’s going on:

- **transfer_tokens:** The account to transfer tokens from, the account to transfer tokens to, and the number of tokens to transfer are the three arguments that the transfer tokens function accepts. The function begins by obtaining the account's nonce, which is required for creating the transaction. The build transaction method of the transfer function of the contract is then used to construct the transaction. The send raw transaction method is used to send the transaction after it has been signed using the deployer's private key. The function then returns the transaction receipt after waiting for the transaction to be mined.
- **purchase_tokens**: The primary distinction between the purchase tokens function and the transfer tokens function is that the transaction also has a value field that specifies the amount of ether to be invested.

Finally, run the code with the following command on your terminal:

```bash
python client.py
```

![images](https://user-images.githubusercontent.com/71826391/232349775-025c6505-1fe5-40f1-8311-58ff37dda4ca.png)


## Conclusion

In this tutorial, we looked at how to use Python and the Ethereum blockchain to build a Celo token and conduct an ICO. We have discussed the fundamentals of creating, deploying, and interacting with smart contracts as well as the procedures for starting an initial coin offering (ICO). The potential for developing and launching cutting-edge blockchain projects is virtually limitless because of Python's strength and the Ethereum network's adaptability.

## Next Steps

There are numerous methods to continue developing and growing the project now that the Celo token has been issued and the ICO has begun. Here are some ideas for subsequent actions:

- Place the token on exchanges to increase investor accessibility
- Provide an intuitive interface for buying and managing tokens.
- Provide staking rewards to encourage users to keep and support the token by integrating the token with decentralized apps (dApps) on the Celo network

## About the Author
I am a React frontend developer with over 3 years of experience building for the web, a web3 developer, and a technical writer. Visit my [GitHub profile](https://github.com/J0shcodes) to see some of the projects I have worked on and currently working on.

## References

- Ethereum: **[https://ethereum.org/](https://ethereum.org/)**
- Solidity: **[https://solidity.readthedocs.io/](https://solidity.readthedocs.io/)**
- Web3.py: **[https://web3py.readthedocs.io/](https://web3py.readthedocs.io/)**
- [Github repo](https://github.com/Divine572/ico-python)
