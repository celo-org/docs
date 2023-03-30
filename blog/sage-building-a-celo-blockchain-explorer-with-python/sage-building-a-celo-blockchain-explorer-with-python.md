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

Blockchain explorers are crucial resources for comprehending the information kept on a blockchain. They enable users, developers, and other blockchain-related data to examine transactions, accounts, smart contracts, and other information. In this tutorial, we'll use Solidity to create a blockchain explorer for the Celo network and Python using the web3.py module to test the functionalities.

## Prerequisites

You should have a fundamental understanding of blockchain technology, the Celo network, Python, and the web3.py module before beginning this lesson. A Celo node or endpoint that implements the Celo JSON-RPC API should also be available to you.

## Requirements

To develop the Celo blockchain explorer, we will require the following libraries:

- Python 3.7 or later
- [Web3.py](https://web3py.readthedocs.io/en/stable/) (for interacting with the blockchain)

## Step 1: Set up the Project

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

Next, Install the following libraries using pip, the python package manager:

```bash
pip install web3 py-solc-x python-dotenv
```

## Step 2: Write the Smart Contract

First, we need to create the smart contract for the blockchain explorer. Create a new file called “BlockchainExplorer.sol” in the root directory of your project.

BlockchainExplorer.sol

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract BlockchainExplorer {

    struct Transaction {
        address sender;
        address recipient;
        uint amount;
        uint timestamp;
    }
    
    struct Contract {
        address contractAddress;
        uint balance;
        uint creationTime;
    }
    
    mapping (address => Transaction[]) private transactions;
    mapping (address => Contract) private contracts;
    
    function getTransactions(address _address) public view returns (Transaction[] memory) {
        return transactions[_address];
    }
    
    function getContract(address _address) public view returns (Contract memory) {
        return contracts[_address];
    }
    
    function searchAddress(address _address) public view returns (Transaction[] memory, Contract memory) {
        return (getTransactions(_address), getContract(_address));
    }
    
    function addTransaction(address _sender, address _recipient, uint _amount) public {
        Transaction memory tx = Transaction(_sender, _recipient, _amount, block.timestamp);
        transactions[_sender].push(tx);
    }
    
    function addContract(address _contractAddress, uint _balance) public {
        Contract memory contractInfo = Contract(_contractAddress, _balance, block.timestamp);
        contracts[_contractAddress] = contractInfo;
    }
    
    function updateContractBalance(address _contractAddress, uint _balance) public {
        contracts[_contractAddress].balance = _balance;
    }
    
}
```

A blockchain explorer with features like historical data, analytics, and a search tool for addresses and contract addresses is possible using the BlockchainExplorer smart contract.

Two structs called Transaction and Contract are included in the contract and are used to store transaction and contract data, respectively. Moreover, it has two data structures that map addresses to the appropriate transactions and contracts: transactions and contracts.

The contract has a number of features that let users interact with it and access transaction and contract data. The tasks comprise:

- getTransactions: This function accepts an address as input and outputs an array of transactions related to that address.
- getContract: This command accepts an address as input and outputs details of the contract related to that address.
- searchAddress: When an address is entered, the searchAddress function retrieves the transactions and contracts related to that address.
- addTransaction: This function adds a transaction to the mapping of transactions by taking as inputs the sender, receiver, and transaction amount.
- addContract: Adds a contract to the contracts mapping by taking as inputs the address and remaining balance of the contract.
- updateContractBalance: This function updates the balance associated with a contract in the contracts mapping by taking the address of the contract and the new balance of that contract as inputs.

## Step 3: Compile and Deploy the Smart Contract

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

with open("BlockchainExplorer.sol", "r") as file:
    contract_source_code = file.read()

# Compile the contract
compiled_sol = compile_standard({
    "language": "Solidity",
    "sources": {
        "BlockchainExplorer.sol": {
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
contract_data = compiled_sol['contracts']['BlockchainExplorer.sol']['BlockchainExplorer']
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

This script installs the required Solidity compiler version, creates a connection to a Celo node, and compiles and deploys the Simple Storage contract to the Celo blockchain. Make sure to set the environment variables CELO PROVIDER URL, CELO DEPLOYER ADDRESS, and CELO DEPLOYER PRIVATE KEY before running the script.

Run the deployment script with this command on your terminal:

```bash
python deploy.py
```

![Screenshot](https://user-images.githubusercontent.com/104994589/228788486-2d6621af-0254-42ce-bf3b-d466abf1eba8.png)

## Step 3: Interact with Deployed Smart Contract

Create a file called “app.py” and add the following code:

app.py

```python
from web3 import Web3
from web3.middleware import geth_poa_middleware
import deploy

w3 = deploy.w3
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

contract_address = deploy.contract_address
abi = deploy.abi

# Instantiate the contract object
contract = w3.eth.contract(address=contract_address, abi=abi)

# Check account balance
balance = w3.eth.get_balance('your-wallet-account-address')
print(f'Account balance: {balance}')

# Add a new transaction
tx_hash = contract.functions.addTransaction(
    'your-wallet-account-address1', 'your-wallet-account-address2', 100).transact()

# Wait for the transaction to be mined
w3.eth.wait_for_transaction_receipt(tx_hash)

# Add a new contract
tx_hash = contract.functions.addContract(
    'your-wallet-account-address', 1000).transact()

# Wait for the transaction to be mined
w3.eth.wait_for_transaction_receipt(tx_hash)

# Update contract balance
tx_hash = contract.functions.updateContractBalance(
    'your-wallet-account-address', 2000).transact()

# Wait for the transaction to be mined
w3.eth.wait_for_transaction_receipt(tx_hash)

# Call the getTransactions function
transactions = contract.functions.getTransactions(
    'your-wallet-account-address').call()

# Print the transaction data
for tx in transactions:
    print(
        f'Sender: {tx[0]}, Recipient: {tx[1]}, Amount: {tx[2]}, Timestamp: {tx[3]}')

# Call the getContract function
contract_info = contract.functions.getContract(
    'your-wallet-account-address').call()

# Print the contract information
print(
    f'Address: {contract_info[0]}, Balance: {contract_info[1]}, Creation Time: {contract_info[2]}')

# Call the searchAddress function
transactions, contract_info = contract.functions.searchAddress(
    'your-wallet-account-address').call()

# Print the transaction data
for tx in transactions:
    print(
        f'Sender: {tx[0]}, Recipient: {tx[1]}, Amount: {tx[2]}, Timestamp: {tx[3]}')
```

Let’s go through the code step by step.

```python
from web3 import Web3
from web3.middleware import geth_poa_middleware
import deploy

w3 = deploy.w3
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

contract_address = deploy.contract_address
abi = deploy.abi

# Instantiate the contract object
contract = w3.eth.contract(address=contract_address, abi=abi)
```

The code first imports the required modules before loading the w3 object, contract ABI, and address. Then, to enable communication with the Ethereum network, it adds the

“geth_poa_middleware” to the “middleware_onion”. The contract object is then created using the loaded ABI and contract address.

```python
# Check account balance
balance = w3.eth.get_balance('your-wallet-account-address')
print(f'Account balance: {balance}')
```

Using the “get_balance()” method of the w3.eth object, the following code obtains the balance of a particular wallet account and prints it to the console.

```python
# Add a new transaction
tx_hash = contract.functions.addTransaction(
    'your-wallet-account-address1', 'your-wallet-account-address2', 100).transact()

# Wait for the transaction to be mined
w3.eth.wait_for_transaction_receipt(tx_hash)
```

The “addTransaction()” method of the contract object is used in this code to add a new transaction, and the “wait_for_transaction_receipt()” method of the “w3.eth” object is used to wait for the transaction to be mined.

```python
# Update contract balance
tx_hash = contract.functions.updateContractBalance(
    'your-wallet-account-address', 2000).transact()

# Wait for the transaction to be mined
w3.eth.wait_for_transaction_receipt(tx_hash)
```

The “updateContractBalance()” method of the contract object is used to update a specific contract's balance, and the “wait_for_transaction_receipt()”  method of the “w3.eth” object is used to wait for a transaction to be mined.

```python
# Call the getTransactions function
transactions = contract.functions.getTransactions(
    'your-wallet-account-address').call()

# Print the transaction data
for tx in transactions:
    print(
        f'Sender: {tx[0]}, Recipient: {tx[1]}, Amount: {tx[2]}, Timestamp: {tx[3]}')
```

With a given wallet address, this code invokes the contract object's “getTransactions()” method to access the associated transaction data. The transaction data is then printed to the terminal.

```python
# Call the getContract function
contract_info = contract.functions.getContract(
    'your-wallet-account-address').call()

# Print the contract information
print(
    f'Address: {contract_info[0]}, Balance: {contract_info[1]}, Creation Time: {contract_info[2]}')
```

With a given wallet address, this code invokes the “getContract()” method of the contract object to access the related contract data. The contract information is then printed on the console.

```python
# Call the searchAddress function
transactions, contract_info = contract.functions.searchAddress(
    'your-wallet-account-address').call()

# Print the transaction data
for tx in transactions:
    print(
        f'Sender: {tx[0]}, Recipient: {tx[1]}, Amount: {tx[2]}, Timestamp: {tx[3]}')
```

With a given wallet address, this code invokes the contract object's “searchAddress()” method to get the associated transaction and contract data. The transaction data is then printed to the terminal.

Note: Replace the address strings with your wallet account balance. Make sure you have more than a single account to test this contract. Also ensure that your accounts are funded with Celo Alfajores [faucets](https://faucet.celo.org/).

Run the code by pasting the following command on your terminal:

```bash
python app.py
```

![Screenshot](https://user-images.githubusercontent.com/104994589/228788108-e611916c-59f0-4240-8a00-4655814e465e.png)

## Conclusion

We have looked at how to build a strong smart contract for a blockchain explorer that has features like historical data, analytics, and a search feature for addresses and contract addresses in this lesson. Using web3.py and Python code, we have also shown how to communicate with the functions in this smart contract.

You may construct and deploy a smart contract on the Ethereum network and learn how to communicate with it using web3.py by following the instructions in this tutorial. You can create your own blockchain explorers, decentralized applications, and smart contracts using this information.

## Next Steps

Investigating additional blockchain platforms and programming languages, such as Solidity for Ethereum or Rust for Polkadot, may be the next step in this tutorial. Consider looking into more complex smart contract features like inheritance, modifiers, and events. You might also find out more about web3.py and how to use it to communicate with other decentralized programs and smart contracts on the Ethereum network.

Ultimately, blockchain technology has limitless potential, and understanding how to build and work with smart contracts is a crucial skill in the more decentralized world of today.

## About the Author

[Israel Okunaya](https://meetisraelokunaya.curious.page/) is an ace writer with a flair for simplifying complexities and a knack for storytelling. He leverages over four years of experience to meet the most demanding writing needs in different niches, especially food and travel, blockchain, and marketing. He sees blockchain as a fascinating yet tricky affair. So, he is given to simplifying its complexities with text and video tutorials.

## References

1. [Celo documentation](https://docs.celo.org/)
2. [web3.py documentation](https://web3py.readthedocs.io/)
3. [Github repo](https://github.com/Divine572/blockchain-explorer)
