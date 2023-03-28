---
title: Building a Celo Blockchain Explorer with Python
description: In this tutorial, well use Python and the web3.py module to create a blockchain explorer for the Celo network.
authors:
  - name: Israel Okunaya
    title: Technical Writer
    url: https://github.com/Southpaw0
    image_url: https://user-images.githubusercontent.com/104994589/228222421-6d34591d-e874-479b-88e0-7b88baaf785e.png
tags: [celosage, celo, smartcontract, solidity, intermediate]
hide_table_of_contents: true
slug: /tutorials/building-a-celo-blockchain-explorer-with-python
---

![header](../../src/data-tutorials/showcase/intermediate/sage-building-a-celo-blockchain-explorer-with-python.png)

## Introduction

Blockchain explorers are crucial resources for comprehending the information kept on a blockchain. They enable users, developers, and other blockchain-related data to examine transactions, accounts, smart contracts, and other information. In this tutorial, we'll use Python and the web3.py module to create a blockchain explorer for the Celo network.

## Prerequisites

You should have a fundamental understanding of blockchain technology, the Celo network, Python, and the web3.py module before beginning this lesson. A Celo node or endpoint that implements the Celo JSON-RPC API should also be available to you.

## Requirements

To develop the Celo blockchain explorer, we will require the following libraries:

- Python 3.7 or later
- [Web3.py](https://web3py.readthedocs.io/en/stable/) (for interacting with the blockchain)

### Step 1: Set Up the Project

On your terminal, use the following commands to create a new folder for your project:

```bash
mkdir celo-blockchain-explorer
cd celo-blockchain-explorer
```

In your new directory, create a python virtual environment and activate it with the following commands:

```bash
python3 -m venv env
source env/bin/activate
```

Next, Install the follwing libraries using pip, the python package manager:

```bash
pip install web3 py-solc-x python-dotenv
```

### Step 2: Write a Smart Contract

A smart contract must first be created before it can be used. Let's build a straightforward smart contract that uses the Celo blockchain to store and retrieve a number.

SimpleStorage.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;

    function set(uint256 _num) public {
        storedData = _num;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
```

### Step 3: Compile and Deploy the Smart Contract

Next, let’s compile and deploy our contract. Create a file called “deploy.py” in your root directory.

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
w3 = Web3(Web3.HTTPProvider(provider_url))
assert w3.is_connected(), "Not connected to a Celo node"

# Set deployer account and private key
deployer = os.environ.get("CELO_DEPLOYER_ADDRESS")
private_key = os.environ.get("CELO_DEPLOYER_PRIVATE_KEY")

with open("SimpleStorage.sol", "r") as file:
    contract_source_code = file.read()

# Compile the contract
compiled_sol = compile_standard({
    "language": "Solidity",
    "sources": {
        "SimpleStorage.sol": {
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
contract_data = compiled_sol['contracts']['SimpleStorage.sol']['SimpleStorage']
bytecode = contract_data['evm']['bytecode']['object']
abi = json.loads(contract_data['metadata'])['output']['abi']

# Deploy the contract
nonce = w3.eth.get_transaction_count(deployer)
transaction = {
    'nonce': nonce,
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price,
    'data': bytecode,
}
signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
transaction_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
transaction_receipt = w3.eth.wait_for_transaction_receipt(transaction_hash)

# Get the contract address
contract_address = transaction_receipt['contractAddress']
print(f"Contract deployed at address: {contract_address}")
```

This script installs the required Solidity compiler version, creates a connection to a Celo node, and compiles and deploys the Identity contract to the Celo blockchain. Make sure to set the environment variables CELO PROVIDER URL, CELO DEPLOYER ADDRESS, and CELO DEPLOYER PRIVATE KEY before running the script.

### Step 3: Get Latest Block Number

Create a file called “app.py” and add the following code:

app.py

```python
from web3 import Web3
from web3.middleware import geth_poa_middleware
import deploy

w3 = Web3(Web3.HTTPProvider('https://alfajores-forno.celo-testnet.org'))
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

latest_block_number = w3.eth.block_number
print('Latest block number:', latest_block_number)
```

The code above, connects to a Celo node and get’s the latest block number using the “w3.eth.blockNumber” method. It also adds the geth poa middleware to the middleware onion, which handles the extraData field appropriately by processing the block headers.

### Step 4: Get Block Information

With the most recent block number in hand, we can now obtain details regarding a single block. Use the “w3.eth.getBlock()” function to accomplish this. The code to access information about block number 10 is as follows:

app.py

```python
block_number = 10
block = w3.eth.get_block(block_number)
print('Block number:', block.number)
print('Block hash:', block.hash.hex())
print('Block timestamp:', block.timestamp)
print('Block transactions:', block.transactions)
```

### Step 5: Get Transaction Information

Now that we know more about a block, we may learn more about a particular transaction within it. Use the “w3.eth.getTransaction()” function to accomplish this. The code to obtain details regarding transaction 0 in block 10 is as follows:

app.py

```python
if len(block.transactions) > 0:
    tx_hash = block.transactions[0].hex()
    tx = w3.eth.getTransaction(tx_hash)
    print('Transaction hash:', tx.hash.hex())
    print('Transaction sender:', tx['from'])
    print('Transaction receiver:', tx['to'])
    print('Transaction value:', w3.from_wei(tx.value, 'ether'))
else:
    print('No transactions in block', block_number)
```

### Step 6: Get Contract Information

Finally, we are able to learn more about a specific smart contract that is running on the Celo blockchain. The w3.eth.contract() method can be used to accomplish this. The code to obtain information regarding a particular function in our smart contract:

app.py

```python
contract_address = deploy.contract_address
abi = deploy.abi
contract = w3.eth.contract(address=contract_address, abi=abi)
print('Contract get function:', contract.functions.get().call())
print('Contract set function:', contract.functions.set(2).call())
```

Run the code on your terminal, it should compile, deploy and be interacted with successfully.

```bash
python app.py
```

app.py

```python
from web3 import Web3
from web3.middleware import geth_poa_middleware
import deploy

w3 = Web3(Web3.HTTPProvider('https://alfajores-forno.celo-testnet.org'))
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

latest_block_number = w3.eth.block_number
print('Latest block number:', latest_block_number)
block_number = 10
block = w3.eth.get_block(block_number)
print('Block number:', block.number)
print('Block hash:', block.hash.hex())
print('Block timestamp:', block.timestamp)
print('Block transactions:', block.transactions)

if len(block.transactions) > 0:
    tx_hash = block.transactions[0].hex()
    tx = w3.eth.getTransaction(tx_hash)
    print('Transaction hash:', tx.hash.hex())
    print('Transaction sender:', tx['from'])
    print('Transaction receiver:', tx['to'])
    print('Transaction value:', w3.from_wei(tx.value, 'ether'))
else:
    print('No transactions in block', block_number)

contract_address = deploy.contract_address
abi = deploy.abi
contract = w3.eth.contract(address=contract_address, abi=abi)
print('Contract get function:', contract.functions.get().call())
print('Contract set function:', contract.functions.set(2).call())
```

### Conclusion

In conclusion, learning about the Celo blockchain and how to interact with it using Python is made easy by creating a web3.py-based Celo blockchain explorer. With web3.py, you can quickly establish a connection to the Celo node, get blockchain data, and carry out a number of blockchain-related tasks like creating smart contracts and sending transactions.

## Next Steps

Congratulations! With Python and web3.py, you have successfully created a straightforward Celo blockchain explorer. To make the explorer more beneficial and educational, you can add a ton more features like capacity to look up certain transactions or blocks or to display blockchain data in the form of graphs and charts. Your blockchain explorer may become more practical and user-friendly as a result.

## About the Author

[Israel Okunaya](https://meetisraelokunaya.curious.page/) is an ace writer with a flair for simplifying complexities and a knack for storytelling. He leverages over four years of experience to meet the most demanding writing needs in different niches, especially food and travel, blockchain, and marketing. He sees blockchain as a fascinating yet tricky affair. So, he is given to simplifying its complexities with text and video tutorials.

## References

1. [Celo documentation](https://docs.celo.org/)
2. [web3.py documentation](https://web3py.readthedocs.io/)
3. [Github repo](https://github.com/Divine572/blockchain-explorer)
