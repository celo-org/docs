---
title: Deploying Celo Applications using Golang
description: This article could provide a tutorial on deploying Celo applications built using the Golang . It could cover topics such as setting up a Celo node, setting up the development environment, creating and deploying smart contracts, and monitoring the deployed contract activities using Celo explorer.
authors:
  - name: Divine-Favour
url: https://github.com/Divine572
tags: [celosage, intermediate, smartcontract, solidity]
hide_table_of_contents: true
slug: /tutorials/deploying-celo-applications-using-golang
---

![header](../../src/data-tutorials/showcase/intermediate/deploying-celo-applications-using-golang.png)

## Introduction

An open-source blockchain technology called Celo focuses on giving individuals all over the world access to financial tools and services. Decentralized applications (dApps) can be created by developers for a range of financial use cases, including payments, remittances, lending, and more. Because of its powerful performance, simplicity, and usability, Golang, often known as Go, is a well-liked programming language for creating blockchain applications. You will be led step-by-step through the deployment of Celo applications using Golang in this tutorial.

## Prerequisites

In this tutorial, we’ll be implementing a custom token on Celo with Golang, so before we begin, you should have some familiarity with the following technologies:

- Go programming language
- Solidity programming language
- Celo blockchain

## Requirements

Before we get started, make sure you have the following installed:

- [Go programming language](https://go.dev/doc/) (version 1.13 or higher)
- [Node.js](https://nodejs.org/en/docs) (version 10 or higher)
- [Git](https://git-scm.com/downloads)
- Text editor (e.g. Visual Studio Code)
- [Go Ethereum](https://github.com/ethereum/go-ethereum)

### Step 1: Set up development environment

On your terminal, create a new directory for this project:

```bash
mkdir celo-deployment
cd celo-deployment
```

Initialize a new Go module:

```bash
go mod init celo-deployment
```

Install the Celo blockchain package:

```bash
go get -u github.com/ethereum/go-ethereum
```

Note: This Go Ethereum package created by Celo is a fork of the main Go Ethereum package. If you are having any import errors, just go to your terminal and run:

### Step 2: Write a smart contract

To deploy a smart contract, we first need to create it. Let’s create a simple smart contract that stores and retrieves a number on the Celo blockchain.

SimpleStorage.sol

```solidity
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

### Step 3: Compile and deploy the smart contract

Next, we need to compile the smart contract to generate the ABI and Bytecodes of the smart contract. Before we do that, let’s install the solidity compiler which compiles our solidity code.

```bash
npm init -y
npm install solc@0.8.0
```

Create a file called “compile.js” and paste the following code:

compile.js

```jsx
const fs = require("fs");
const solc = require("solc");

const input = fs.readFileSync("SimpleStorage.sol", "utf8");

const output = solc.compile(
  JSON.stringify({
    language: "Solidity",
    sources: {
      "SimpleStorage.sol": {
        content: input,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  })
);

const { SimpleStorage } = JSON.parse(output).contracts["SimpleStorage.sol"];
fs.writeFileSync("SimpleStorage.abi", JSON.stringify(SimpleStorage.abi));
fs.writeFileSync("SimpleStorage.bin", SimpleStorage.evm.bytecode.object);
```

The code above compiles our smart contract and creates two files; “SimpleStorage.abi” and “SimpleStorage.bin”

Run the following command on your terminal to compile the code:

```bash
node compile.js
```

To deploy the contract, go to your root directory and create a new file called “deploy.go” and paste the following code:

deploy.go

```solidity
package main

import (
	"context"
	"crypto/ecdsa"
	"fmt"
	"io/ioutil"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

// Replace this with your own private key and Celo node URL
const privateKey = "your-private-key"
const nodeURL = "https://alfajores-forno.celo-testnet.org"

func main() {
	// Connect to the Celo network
	client, err := ethclient.Dial(nodeURL)
	if err != nil {
		log.Fatalf("Failed to connect to the Celo network: %v", err)
	}
	defer client.Close()

	// Load the private key
	key, err := crypto.HexToECDSA(privateKey)
	if err != nil {
		log.Fatalf("Failed to load the private key: %v", err)
	}

	// Load the contract ABI
	abiBytes, err := ioutil.ReadFile("SimpleStorage.abi")
	if err != nil {
		log.Fatalf("Failed to read the contract ABI: %v", err)
	}
	fmt.Println(abiBytes)

	// Load the contract bytecode
	bytecode, err := ioutil.ReadFile("SimpleStorage.bin")
	if err != nil {
		log.Fatalf("Failed to read the contract bytecode: %v", err)
	}

	// Get the public address associated with the private key
	publicKey := key.Public().(*ecdsa.PublicKey)
	address := crypto.PubkeyToAddress(*publicKey)

	// Get the nonce associated with the address
	nonce, err := client.PendingNonceAt(context.Background(), address)
	if err != nil {
		log.Fatalf("Failed to get the nonce: %v", err)
	}

	// Get the gas price
	gasPrice, err := client.SuggestGasPrice(context.Background())
	if err != nil {
		log.Fatalf("Failed to get the gas price: %v", err)
	}

	// Create a new transaction
	tx := types.NewContractCreation(nonce, big.NewInt(0), 3000000, gasPrice, common.FromHex(string(bytecode)))

	// Sign the transaction
	signedTx, err := types.SignTx(tx, types.NewEIP155Signer(big.NewInt(44787)), key)
	if err != nil {
		log.Fatalf("Failed to sign the transaction: %v", err)
	}

	// Broadcast the transaction
	err = client.SendTransaction(context.Background(), signedTx)
	if err != nil {
		log.Fatalf("Failed to broadcast the transaction: %v", err)
	}

	// Wait for the transaction receipt
	receipt, err := bind.WaitMined(context.Background(), client, signedTx)
	if err != nil {
		log.Fatalf("Failed to get the transaction receipt: %v", err)
	}

	// Print the contract address
	fmt.Printf("Smart contract deployed at address: %s\n", receipt.ContractAddress.Hex())
}
```

Let’s understand what the code above does.

```go
package main

import (
	"context"
	"crypto/ecdsa"
	"fmt"
	"io/ioutil"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)
```

The “package main” initializes this file as our main Go package and the “import” command is used to import all the package dependencies.

```go
const privateKey = "your-private-key"
const nodeURL = "https://alfajores-forno.celo-testnet.org"
```

Replace the string with your Celo wallet private key and the node URL is the Celo Alfrajores or Testnet URL.

```go
// Connect to the Celo network
client, err := ethclient.Dial(nodeURL)
	if err != nil {
		log.Fatalf("Failed to connect to the Celo network: %v", err)
	}
	defer client.Close()

	// Load the private key
	key, err := crypto.HexToECDSA(privateKey)
	if err != nil {
		log.Fatalf("Failed to load the private key: %v", err)
	}

	// Load the contract ABI
	abiBytes, err := ioutil.ReadFile("Exchange.abi")
	if err != nil {
		log.Fatalf("Failed to read the contract ABI: %v", err)
	}
	fmt.Println(abiBytes)

	// Load the contract bytecode
	bytecode, err := ioutil.ReadFile("Exchange.bin")
	if err != nil {
		log.Fatalf("Failed to read the contract bytecode: %v", err)
	}
```

The code above allows us to connect to the Celo blockchain, load our private key, and load our contract ABI and byte codes which were generated when our contract was compiled.

```go
// Get the public address associated with the private key
	publicKey := key.Public().(*ecdsa.PublicKey)
	address := crypto.PubkeyToAddress(*publicKey)

	// Get the nonce associated with the address
	nonce, err := client.PendingNonceAt(context.Background(), address)
	if err != nil {
		log.Fatalf("Failed to get the nonce: %v", err)
	}

	// Get the gas price
	gasPrice, err := client.SuggestGasPrice(context.Background())
	if err != nil {
		log.Fatalf("Failed to get the gas price: %v", err)
	}
```

From the code above, our contract address and public key are gotten from the crypto package. The nonce and “gasPrice” are needed for a transaction to occur on the blockchain.

```go
// Create a new transaction
	tx := types.NewContractCreation(nonce, big.NewInt(0), 3000000, gasPrice, common.FromHex(string(bytecode)))

	// Sign the transaction
	signedTx, err := types.SignTx(tx, types.NewEIP155Signer(big.NewInt(44787)), key)
	if err != nil {
		log.Fatalf("Failed to sign the transaction: %v", err)
	}

	// Broadcast the transaction
	err = client.SendTransaction(context.Background(), signedTx)
	if err != nil {
		log.Fatalf("Failed to broadcast the transaction: %v", err)
	}

	// Wait for the transaction receipt
	receipt, err := bind.WaitMined(context.Background(), client, signedTx)
	if err != nil {
		log.Fatalf("Failed to get the transaction receipt: %v", err)
	}

	// Print the contract address
	fmt.Printf("Smart contract deployed at address: %s\n", receipt.ContractAddress.Hex())
}
```

A new transaction is created and signed and a receipt is generated to validate that the smart contract is actually deployed and has a particular contract address attached to it.

To run the application, on your terminal, run the following command:

```bash
go run deploy.go
```

![images](https://user-images.githubusercontent.com/69091491/229017495-1be0c490-ab66-417e-ac9e-cbaea9d3fb3d.png)

### Step 4: Monitor the Deployed Application

Finally, we can view the deployed smart contract on the Celo [Testnet](https://alfajores.celoscan.io/). Copy the address of the deployed contract and paste it in the search bar of the Celo testnet explorer.

![images](https://user-images.githubusercontent.com/69091491/229017589-7383d260-bd49-4f21-8395-f3f2c85e84f8.png)

You will see details about your deployed contract and every activity or transaction that happens in your contract will be displayed on the explorer.

![images](https://user-images.githubusercontent.com/69091491/229016742-bfdf4803-7e40-4a55-beb8-210841033f10.png)

## Conclusion

Setting up the development environment, creating and deploying smart contracts, and interfacing with the deployed contracts using Golang are all simple steps in the deployment of Celo applications using Golang. With the strength of the Celo platform and the effectiveness of the Golang programming language, you can build and deploy decentralized applications that are scalable, secure, and user-friendly to handle a variety of financial use cases.

## Next Steps

The procedure of deploying Celo applications using Golang was covered in this post. Take into account the following next actions to improve your abilities and create more intricate and feature-rich applications as you continue to research and broaden your knowledge in this area:

- Learn more about Golang.
- Learn more about Celo and it’s developer platform and community.
- Learn more about Solidity.

## About the Author

I am a Software engineer with an interest in Blockchain technology. I love picking up new technologies and sharing my knowledge as I learn to give back to the tech community. You can find one on [GitHub](https://github.com/Divine572) and [Twitter](https://twitter.com/divine_finix).

## References

1. [Celo Developer Documentation](https://docs.celo.org/)
2. [Go Programming Language Documentation](https://golang.org/doc/)
3. [Solidity Documentation](https://solidity.readthedocs.io/)
4. [Github repo](https://github.com/Divine572/simple-storage-contract)
