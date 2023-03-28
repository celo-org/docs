---
title: Using Python to Build a Celo Blockchain Identity System
description: This article explains how to use Python and the Web3.py library to build a decentralized identity system on the Celo blockchain.
authors:
  - name: Israel Okunaya
    title: Technical Writer 
    url: https://github.com/Southpaw0
    image_url: https://user-images.githubusercontent.com/104994589/228117172-c739dd37-9bdd-487b-8364-5b9620cd2373.png
tags: [celosage, celo, smartcontract, solidity, intermediate]
hide_table_of_contents: true
slug: /tutorials/using-python-to-build-a-celo-blockchain-identity-system
---

![header](../../src/data-tutorials/showcase/intermediate/sage-using-python-to-build-a-celo-blockchain-identity-system.png)

## Introduction

The interest in and use cases for the blockchain ecosystem have significantly increased in recent years. Celo is one such cutting-edge blockchain that is intended to provide a reliable, secure, and easy-to-use platform for financial transactions. Celo's identification system, which enables users to keep their privacy while assuring the security and integrity of transactions, is a vital component of the platform. We will go over how to utilize Python to create a Celo blockchain identification system in this blog article.

## Prerequisites

To follow along with this tutorial, you need to be familiar with:

- Building Smart contracts
- The Python programming language

## Requirements

You should have the following installed on your computer to follow along:

- Python 3.7 or later
- [Node.js](https://nodejs.org/en/download/)
- [Celo Testnet account](https://faucet.celo.org/)
- [Celo Wallet](https://docs.celo.org/blog/tutorials/3-simple-steps-to-connect-your-metamask-wallet-to-celo) (with some Celo tokens)
- [Python-dotenv](https://pypi.org/project/python-dotenv/) (for environment variables)
- [Web3.py](https://web3py.readthedocs.io/en/stable/) (for interacting with the blockchain)

## Step 1: Set up project

On your terminal, use the following commands to create a new folder for your project:

```bash
mkdir celo-identity-system
cd celo-identity-system
```

In your new directory, create a python virtual environment and activate it with the following commands:

```bash
python3 -m venv env
source env/bin/activate
```

To install the web3.py, and python-dotenv:

```bash
pip install web3
pip install python-dotenv
```

## Step 2: Create the Identity Smart Contract and Deploy the Smart Contract

First, we need to create the smart contract. Create a file called “Identity.sol” in your project root directory to take care of the identity-related tasks. Here is a straightforward illustration of a Solidity smart contract that can store and retrieve user data:

Identity.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    struct UserInfo {
        string name;
        string email;
    }

    mapping(address => UserInfo) private identities;

    function createIdentity(string memory _name, string memory _email) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(bytes(identities[msg.sender].name).length == 0, "Identity already exists");

        identities[msg.sender] = UserInfo(_name, _email);
    }

    function getIdentity(address _address) public view returns (string memory, string memory) {
        UserInfo memory user = identities[_address];
        require(bytes(user.name).length > 0, "Identity not found");

        return (user.name, user.email);
    }
}
```

The two primary operations of this smart contract are createIdentity and getIdentity.

CreateIdentity stores the two string parameters it receives from the user, \_name and \_email, in a struct named UserInfo. It then uses the identities mapping to translate the sender's address to the newly formed UserInfo struct. If a user with that name and email address is associated with that address, getIdentity, which accepts the address parameter \_address, will return that information.

Let’s compile and deploy the contract. In your root directory, create a file called “deploy.py” and paste the following code:

deploy.py

```python
import json
import os
from web3 import Web3
from solcx import compile_standard, install_solc

# Install specific Solidity compiler version
install_solc("0.8.0")

# Set up web3 connection
provider_url = os.environ.get("CELO_PROVIDER_URL")
w3 = Web3(Web3.HTTPProvider(provider_url))
assert w3.isConnected(), "Not connected to a Celo node"

# Set deployer account and private key
deployer = os.environ.get("CELO_DEPLOYER_ADDRESS")
private_key = os.environ.get("CELO_DEPLOYER_PRIVATE_KEY")

with open("Identity.sol", "r") as file:
    contract_source_code = file.read()

# Compile the contract
compiled_sol = compile_standard({
    "language": "Solidity",
    "sources": {
        "Identity.sol": {
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
contract_data = compiled_sol['contracts']['Identity.sol']['Identity']
bytecode = contract_data['evm']['bytecode']['object']
abi = json.loads(contract_data['metadata'])['output']['abi']

# Deploy the contract
nonce = w3.eth.getTransactionCount(deployer)
transaction = {
    'nonce': nonce,
    'gas': 2000000,
    'gasPrice': w3.eth.gasPrice,
    'data': bytecode,
}
signed_txn = w3.eth.account.signTransaction(transaction, private_key)
transaction_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)
transaction_receipt = w3.eth.waitForTransactionReceipt(transaction_hash)

# Get the contract address
contract_address = transaction_receipt['contractAddress']
print(f"Contract deployed at address: {contract_address}")
```

The Identity contract is compiled and deployed to the Celo blockchain using this script, which also installs the necessary Solidity compiler version and establishes a connection to a Celo node. When executing the script, make careful to set the environment variables CELO PROVIDER URL, CELO DEPLOYER ADDRESS, and CELO DEPLOYER PRIVATE KEY.

Run the script with the following code on your terminal:

```bash
python deploy.py
```

Your contract should be deployed successfully.

## Step 3: Interact with the Smart contract

Next, we need to interact with our deployed contract using web3.py. Create a new file called “main.py” in the root directory of your project.

main.py

```python
import os
import deploy
from web3 import Web3

# Set up web3 connection
provider_url = os.environ.get("CELO_PROVIDER_URL")
w3 = Web3(Web3.HTTPProvider(provider_url))
assert w3.is_connected(), "Not connected to a Celo node"

syncing = w3.eth.syncing
print(syncing)

# Set deployer account and private key
account = os.environ.get("CELO_DEPLOYER_ADDRESS")
private_key = os.environ.get("CELO_DEPLOYER_PRIVATE_KEY")

abi = deploy.abi
contract_address = deploy.contract_address

identity_contract = w3.eth.contract(address=contract_address, abi=abi)

def create_identity(name: str, email: str):
    nonce = w3.eth.get_transaction_count(account)
    txn = identity_contract.functions.createIdentity(name, email).build_transaction({
        'gas': 200000,
        'gasPrice': w3.eth.gas_price,
        'nonce': nonce,
    })
    signed_txn = w3.eth.account.sign_transaction(txn, private_key)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    receipt = w3.eth.wait_for_transaction_receipt(txn_hash)
    return receipt

def get_identity(address: str) -> (str, str):
    name, email = identity_contract.functions.getIdentity(address).call()
    return name, email

# Create an identity
create_identity("Kate Wolfsen", "kate@example.com")

# Get an identity
name, email = get_identity(account)
print(f"Name: {name}, Email: {email}")
```

From the code above, the create identity function sends a transaction to the smart contract's “createIdentity” function and accepts a name and an email as arguments. The get identity function accepts an address as an input and returns the associated name and email, in order to invoke the getIdentity function of the smart contract.

Run the code with this command on your terminal:

```bash
python main.py
```

An identity is created and gotten from our Identity smart contract successfully.

## Conclusion

In this tutorial, we implemented an Identity smart contract in solidity and deployed it on the Celo blockchain. We also implemented functions that can interact with the contract using web3.py and Python.

## Next Steps

To learn more about building on Celo using Python, you can explore the following resources:

- [Celo documentation](https://docs.celo.org/)
- [Solidity](http://solidity-by-example.org)

## About the Author

[Israel Okunaya](https://meetisraelokunaya.curious.page/) is an ace writer with a flair for simplifying complexities and a knack for storytelling. He leverages over four years of experience to meet the most demanding writing needs in different niches, especially food and travel, blockchain, and marketing. He sees blockchain as a fascinating yet tricky affair. So, he is given to simplifying its complexities with text and video tutorials.

## References

- [Celo docs](https://docs.celo.org/)
- [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html)
- [Github repo](https://github.com/Divine572/celo-identity-system)
