---
title: Deploying celo dapp to celo network with web3.py
description: This tutorial guides you on how to deploy celo dapp to celo network web3.py
authors:
  - name: Jimoh Yusuf
    title: Web3 Developer,
    url: https://github.com/yusuf1990
    image_url: https://avatars.githubusercontent.com/u/56927079?s=400&v=4
tags: [celo, beginner, celosage, python]
hide_table_of_contents: true
slug: /tutorials/deploying-celo-dapp-to-celo-network-with-web3py
---

![header](../../src/data-tutorials/showcase/beginner/deploying-celo-dapp-to-celo-network-with-web3py.png)

##  Introduction
`Web3.py` is a Python library used to interact with the Celo network and other compatible blockchains, including the Ethereum blockchain. It provides a convenient and easy-to-use interface for developers to interact with smart contracts on the blockchain, send transactions, retrieve data and deploy smart contracts to the blockchain. In this tutorial, we will walk through the process of deploying a Celo dApp to the Celo network using web3.py.


##  Prerequisites
1. Fundamental understanding of programming principles
2. Knowledge of deploying and hosting applications
3. Familiarity with blockchain technology

##  Requirements
1. Web3.py (Python library that allow you to interact with the blockchain)
2. Python IDE (To run the code)
3. Celo Network (To interact with the celo blockchain using web3.py, you need to connect to a celo network)

##  Here is the overview of our code
```py
from web3 import Web3, HTTPProvider

# Set up web3 connection to Celo network
w3 = Web3(Web3.HTTPProvider('https://forno.celo.org'))#Web3(HTTPProvider('https://forno.celo.org'))

# Replace with your contract bytecode and ABI
bytecode ='0x60806040526000805534801561001457600080fd5b50610159806100246000396000f3fe608060405234801561001057600080fd5b50600436106100465760003560e01c806360fe47b11461004b5780636d4ce63c1461009a5780638da5cb5b146100d4575b600080fd5b6100536100e2565b6040518082815260200191505060405180910390f35b61006f6100e8565b6040518082815260200191505060405180910390f35b61008d6100f0565b6040518082815260200191505060405180910390f35b6000809054906101000a900460ff1681565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb6040518163ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15056fea2646970667358221220b3aa7e3faa5eb5ec5b5aeb81cf7ea317e752f969ce92769d9f9dc3f3a1422f2564736f6c634300060b0033' #'0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd'

abi = [{'constant': True, 'inputs': [], 'name': 'myFunction', 'outputs': [{'name': '', 'type': 'uint256'}], 'payable': False, 'stateMutability': 'view', 'type': 'function'}]

# Replace with your Celo account private key and address
private_key = private_key
address ='0x471ED56d43579A39b91085921C832eE67ab9e2A8'

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
from web3.contract import ConciseContract
MyContract = concise_contract(w3.eth.contract(address=contract_address, abi=abi))

# Example function call on the deployed contract
result = MyContract.my_function()
print(result)

```

## Now, let's explain the code 

## **Step1:** Installing web3.py library
To install `web3.py`, you can run the following code in your terminal or command prompt or any Python IDE. I am using google colab here

```py
	pip install web3
```

##  **Step2:** Set up web3 connection to Celo network

Here's an example code for setting up a web3 connection to the Celo network using `web3.py`:

```py
	 #First import the necessary library
	 from web3 import Web3, HTTPProvider   
         w3 = Web3(Web3.HTTPProvider('https://forno.celo.org'))
```

This code creates a Web3 object using the HTTP provider for the Celo network's forno service at https://forno.celo.org.

##  **Step3:** Create a contract instance
To interact with a smart contract on the Celo blockchain using `web3.py`, you need to create a contract instance from the contract ABI and bytecode.

```py
MyContract = w3.eth.contract(abi=ABI, bytecode=bytecode)
```

Replace the ABI and bytecode fields with your contract bytecode and ABI. You can follow these steps to get your ABI.
Go to [the celo explorer page](https://explorer.celo.org)
Type the name or the address of the contract in the search bar and click on the search icon.
Once the contract is displayed, click on the "ABI" tab to see the contract's ABI
You can then copy the ABI and use it in your code

Note that not all contracts have their ABI available on the Explorer website, in which case you may need to obtain the ABI from another source, such as the contract developer or community.

## **Step4:** Estimate the gas cost for deploying the contract
Here's an example code for estimating the gas cost for deploying a contract in Celo using `web3.py`:

``` py
gas_estimate = w3.eth.estimate_gas({'from': address, 'data': bytecode})
```

We use the `estimate_gas` function of the `web3.py` eth module to estimate the amount of gas required to deploy the contract. The function takes a dictionary with the from address and the contract data (bytecode) as arguments. The gas estimate is then stored in the gas_estimate variable for use in the contract deployment transaction.
Replace the address and bytecode with your contract address and bytecode respectively

##  **Step5:** Build, Sign and Send the transaction
### Build Transaction
Here's a code for building the transaction to deploy the contract:

```py
tx = {
 'from': address,
 'gas': gas_estimate,
 'gasPrice': Web3.to_wei('10', 'gwei'), 
'nonce': w3.eth.get_transaction_count(address),
 'data': bytecode 
}
```

###  Sign Transaction

```py
#Next is to sign the transaction, here’s the code:
signed_tx = w3.eth.account.sign_transaction(tx, private_key)
```

### Send Transaction
Here's an example line for sending the signed transaction:
```py
tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
```
This line sends the raw transaction to the network and returns the transaction hash.

## **Step6:** Wait for the transaction
The next step is to wait for the transaction to be mined, we’ll do that with the following code:

```py
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
```

where `tx_hash` is the hash of the transaction you just sent.

This code will wait for the transaction with the given `tx_hash` to be mined and return a TransactionReceipt object that contains information about the transaction, such as the block number and gas used.

## **Step7:** Get the deployed contract address
To get the deployed contract address after the transaction has been mined, you can use the following line:

```py
contract_address = tx_receipt.contract_address
```

## **Step8:** Create a concise contract instance
Here's an example line for creating a concise contract instance in `web3.py`:

```py
from web3.contract import ConciseContract
MyContract = ConciseContract(w3.eth.contract(address=contract_address, abi=abi))
```

Here, `w3` is the instance of the `web3.py` library, contract_address is the address of the deployed contract on the Celo network, and abi is the ABI (Application Binary Interface) of the contract. Do not forget you can always get your ABI with the step described in step 3 above

## **Step9:** Example function call on the deployed contract
Here's the code for calling a function on the deployed contract:

```py
result = MyContract.my_function() 
print(result)
```

In this line, `MyContract` is the concise contract instance we created earlier, `my_function` is the name of the function we want to call. You can then use the result variable to get the output of the function.

Here is the [link](https://github.com/yusuf1990/DeployCelo) to the repository

## Conclusion
 In this tutorial, we have explained the process of deploying a Celo dApp to the Celo network using web3py. By following the examples provided, you should be able to deploy Celo dapp to Celo network with web3py

## About the Author

Jimoh Yusuf is a web3 developer and a data scientist with a passion of learning. I will be glad to connect with people who share have same ambition as me on Twitter handle @YusufJi30148537











