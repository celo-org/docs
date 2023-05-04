---
title: Deploying celo dapp to celo network with web3.py
description: This tutorial guides you on how to deploy celo dapp to celo network web3.py
authors:
  - name: Jimoh Yusuf
    title: Web3 Developer,
    url: https://github.com/yusuf1990
    image_url: https://avatars.githubusercontent.com/u/56927079?s=400&v=4
tags: [celosage, beginner, dapp, celo]
hide_table_of_contents: true
slug: /tutorials/deploying-celo-dapp-to-celo-network-with-web3py
---

![header](../../src/data-tutorials/showcase/beginner/deploying-celo-dapp-to-celo-network-with-web3py.png)

##  Introduction
`Web3.py` is a Python library used to interact with the Celo network and other compatible blockchains, including the Ethereum blockchain. It provides a convenient and easy-to-use interface for developers to interact with smart contracts on the blockchain, send transactions, retrieve data and deploy smart contracts to the blockchain. In this tutorial, we will walk through the process of deploying a Celo dApp to the Celo network using `web3.py`.


##  Prerequisites
1. Have basic knowledge of blockchain and smart contracts.
2. Have experience using the terminal (command-line interface) on the operating system you are using.
3. Have knowledge of the Python programming language and a basic understanding of its syntax and code structure.
4. Have a registered Celo account on the Alfajores network with a balance to pay transaction fees

##  Requirements
[Python3.6](https://www.python.org/downloads/release/python-368/) or greater

##  Write project code
In this stage, we will create an application that can be deployed and used to interact with smart contracts using Web3Py. To begin, create a new file called app.py and copy the code below.

```python
from web3 import Web3, HTTPProvider
from web3.contract import ConciseContract
# Set up web3 connection to Celo network
w3 = Web3(Web3.HTTPProvider('https://forno.celo.org'))#Web3(HTTPProvider('https://forno.celo.org'))
# Replace with your contract bytecode and ABI
bytecode ='0x6080604052600080553.....'
abi = []
# Replace with your Celo account private key and address
private_key = private_key
address = your_address
# Create a contract instance
MyContract = w3.eth.contract(abi=abi, bytecode=bytecode)
# Estimate the gas cost for deploying the contract
gas_estimate = w3.eth.estimate_gas({'from': address, 'data': bytecode})
# Build the transaction
tx = {
    'from': address,
    'gas': gas_estimate,
    'gasPrice': Web3.to_wei('10', 'gwei'),
    'nonce': w3.eth.get_transaction_count(address),
    'data': bytecode
}
# Sign the transaction
signed_tx = w3.eth.account.sign_transaction(tx, private_key)
# Send the transaction
tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
# Wait for the transaction to be mined
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
# Get the deployed contract address
contract_address = tx_receipt.contract_address
# Create a concise contract instance
MyContract = concise_contract(w3.eth.contract(address=contract_address, abi=abi))
# Example function call on the deployed contract
result = MyContract.my_function()
print(result)
```

Next, we will discuss each line of code above one by one to ensure a thorough understanding of the code's functionality

First, we will install the `web3.py` library. To install `web3.py`, you can run the following code in your terminal or command prompt or any Python IDE. I am using google colab here

```python
pip install web3
```

Then we'll install the web3.contract library where we can import the `ConciseContract` library.


```python
pip install web3-contract
```
Note that the `ConciseContract` is not a part of the official Web3.py documentation, but rather a third-party library that builds on top of `Web3.py` to provide a simpler, more user-friendly interface for interacting with smart contracts.

Next, we'll now set up the web3 connection to the celo network. Here's an example code for setting up a web3 connection to the Celo network using `web3.py`:

```python
# First import the necessary library
from web3 import Web3, HTTPProvider
from web3.contract import ConciseContract 
w3 = Web3(Web3.HTTPProvider('https://forno.celo.org'))
```

This code creates a Web3 object using the HTTP provider for the Celo network's forno service at https://forno.celo.org.

Now that we have setup connection to the celo network, next step is to create a contract instance which will enable us to interact with a smart contract on the Celo blockchain using `web3.py`.We'll be creating the contract instance from the contract `ABI` and `bytecode` as shown below

```python
bytecode ='0x6080604052600080553.....'
abi = []
MyContract = w3.eth.contract(abi=ABI, bytecode=bytecode)
```

Replace the ABI and bytecode fields with your contract bytecode and ABI. You can follow these steps to get your ABI.

1. Go to [the celo explorer page](https://explorer.celo.org)
2. Type the name or the address of the contract in the search bar and click on the search icon.
3. Once the contract is displayed, click on the "ABI" tab to see the contract's ABI
4. You can then copy the ABI and use it in your code

Also, you can use the following step to get your bytecode.

1. Go to [the celo explorer page](https://explorer.celo.org)
2. Search for your contract on celo explorer and copy the bytecode from the "Bytecode" section of the contract details.


Let's estimate the gas cost for deploying the contract with following code

``` python
gas_estimate = w3.eth.estimate_gas({'from': address, 'data': bytecode})
```

We use the `estimate_gas` function of the `web3.py` eth module to estimate the amount of gas required to deploy the contract. The function takes a dictionary with the from address and the contract data (bytecode) as arguments. The gas estimate is then stored in the gas_estimate variable for use in the contract deployment transaction.
Replace the address and bytecode with your contract address and bytecode respectively

Now we can make the transaction, first step is building the transaction. Here's the code for building the transaction to deploy the contract:

```python
tx = {
    'from': address,
    'gas': gas_estimate,
    'gasPrice': Web3.to_wei('10', 'gwei'), 
    'nonce': w3.eth.get_transaction_count(address),
    'data': bytecode 
}
```

then sign the transaction with the following code line

```python
signed_tx = w3.eth.account.sign_transaction(tx, private_key)
```

And finally we can send the transaction

```python
tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
```

Next step is to wait for the transaction to be mined, we’ll do that with the following code. Note that the `tx_hash` is the hash of the transaction we just sent.

```python
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
```

The code will return a TransactionReceipt object that contains information about the transaction, such as the block number and gas used.

Now that the transaction has been mined we can get the deployed contract address with following code

```python
contract_address = tx_receipt.contract_address
```

We can then generate a contract instance using `web3.py` and `ConciseContract`.

```python
MyContract = ConciseContract(w3.eth.contract(address=contract_address, abi=abi))
```

Here, `w3` is the instance of the `web3.py` library, contract_address is the address of the deployed contract on the Celo network, and abi is the ABI (Application Binary Interface) of the contract. 

Finally, we can call a function on the deployed contract. Wecan use the followng code to call a function on the deployed contract:

```python
result = MyContract.my_function() 
print(result)
```

In this line, `MyContract` is the concise contract instance we generated fro the previous code line, `my_function` is the name of the function we want to call. You can then use the result variable to get the output of the function.

Here is the [link](https://github.com/yusuf1990/DeployCelo) to the repository

## Conclusion
 In this tutorial, we have explained the process of deploying a Celo dApp to the Celo network using web3py. By following the examples provided, you should be able to deploy Celo dapp to Celo network with web3py

## About the Author

Jimoh Yusuf is a web3 developer and a data scientist with a passion of learning. I will be glad to connect with people who share have same ambition as me on Twitter handle @YusufJi30148537
