---
title: Integrating Celo Identity Verification System into a Web Application
description: It involves building a system that leverages Celo's identity verification system for secure authentication using Solidity & JavaScript.
authors:
  - name: ✍️ Joshua Obafemi
  - title: Technical Writer
  - url: https://github.com/jorshimayor
  - image_url: https://github.com/jorshimayor.png
tags: [celosage, celo, advanced, solidity, javascript]
hide_table_of_contents: true
slug: "/tutorials/integrating-celo-identity-verification-system-into-a-web-application"
---



# Introduction

As the world becomes more interconnected and people are conducting more transactions online, the need for secure and reliable identity verification systems is becoming increasingly important. Celo is a blockchain platform that offers an identity verification system that is decentralized, secure, and can be integrated into web applications. In this article, we will explore how to integrate Celo's identity verification system into a web application using JavaScript and Solidity.




# Prerequisites
A proper understanding of Solidity and JavaScript is needed for this tutorial.

Before you continue, read this article for bacis understanding on [Celo consensus mechanism](https://docs.celo.org/blog/tutorials/a-deep-dive-into-celo-consensus-mechanism)



# Requirements

Before proceeding with the integration, you need to have a few things set up:

- A Celo wallet with testnet funds to pay for transaction fees
- An IDE or code editor of your choice
- Node.js and NPM installed on your system



# Getting Started

To integrate Celo's identity verification system into a web application, we will need to use JavaScript on the frontend and Solidity on the backend. We will also need to use the Celo SDK, which is a JavaScript library that allows us to interact with the Celo blockchain. 

So let's begin:



## Step 1: Set up the Celo SDK


The first step is to set up the Celo SDK in our web application. We can do this by installing the Celo SDK package using npm:

```bash
npm install @celo/contractkit
```

Next, we need to create a main.js file and import the necessary libraries in our JavaScript code:

```Javascript
const Web3 = require('web3');
const ContractKit = require('@celo/contractkit');
const web3 = new Web3('https://celo-alfajores--rpc.datahub.figment.io/apikey/YOUR_API_KEY/');
const kit = ContractKit.newKitFromWeb3(web3);
```

In the code above, we are importing the Web3 library, which is a JavaScript library for interacting with the Ethereum blockchain, and the ContractKit library, which is a JavaScript library for interacting with the Celo blockchain. 

We are also creating a new instance of the Web3 library, specifying the URL of the Celo blockchain node, and creating a new instance of the ContractKit library using the Web3 instance.




## Step 2: Verify the User's Identity

Once we have set up the Celo SDK in our web application, we can use it to verify the user's identity. To do this, we need to create a smart contract on the Celo blockchain that will verify the user's identity in a `IdentityVerifier.sol` file.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract IdentityVerifier {
    mapping(address => bool) public verifiedAddresses;

    function verify(address _address) public {
        verifiedAddresses[_address] = true;
    }

    function isVerified(address _address) public view returns (bool) {
        return verifiedAddresses[_address];
    }
}
```

In the code above, we are creating a simple smart contract called IdentityVerifier. The contract has a mapping called verifiedAddresses, which maps addresses to boolean values indicating whether they have been verified. 

The contract also has two functions: verify and isVerified. 

The verify function takes an address as input and sets the corresponding value in the verifiedAddresses mapping to true. 

The isVerified function takes an address as input and returns a boolean indicating whether the address has been verified.

Once we have created the smart contract, we can use the Celo SDK to interact with it from our web application. We will need to deploy the smart contract to the Celo blockchain using the ContractKit library.

```javascript
async function deployContract() {
  const accounts = await kit.web3.eth.getAccounts();
  const IdentityVerifier = new kit.web3.eth.Contract(
    IdentityVerifierABI,
    null,
    { data: IdentityVerifierBytecode }
  );
  const tx = IdentityVerifier.deploy();
  const createTransaction = await kit.sendTransactionObject(
    tx,
    { from: accounts[0] }
  );
  const createReceipt = await createTransaction.sendAndWaitForReceipt();
  const IdentityVerifierAddress = createReceipt.contractAddress;
  return IdentityVerifierAddress;
}
```


In the code above, we are using the kit.web3.eth.getAccounts function to get the accounts associated with our Celo blockchain node. 

We are then creating a new instance of the IdentityVerifier smart contract using the IdentityVerifierABI and IdentityVerifierBytecode, which are the compiled ABI and bytecode of our smart contract. 

We then deploy the smart contract using the deploy function, and sending the transaction using the kit.sendTransactionObject function. Finally, we are waiting for the transaction to be mined and returning the address of the deployed smart contract.




## Step 3: Integrate the Identity Verification System into the Web Application

Once we have deployed the smart contract, we can integrate the identity verification system into our web application. 

To do this, we will need to create a form where the user can enter their phone number and other identifying information, and then verify their identity using the smart contract and HTML and CSS.



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Celo Identity Verification</title>
    <style>

        body {
            font-family: sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        
        h1 {
            text-align: center;
            margin-top: 50px;
        }
        
        form {
            max-width: 500px;
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
        }
        
        input[type="text"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }
        
        input[type="submit"] {
            display: block;
            margin-top: 20px;
            padding: 10px;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        
        input[type="submit"]:hover {
            background-color: #3e8e41;
        }
    </style>
</head>
<body>
    <h1>Celo Identity Verification</h1>
    <form id="identity-verification-form">
        <label for="phone-number">Phone Number:</label>
        <input type="text" id="phone-number" required>
        <br>
        <label for="first-name">First Name:</label>
        <input type="text" id="first-name" required>
        <br>
        <label for="last-name">Last Name:</label>
        <input type="text" id="last-name" required>
        <br>
        <input type="submit" value="Verify Identity">
    </form>
    <script src="main.js"></script>
</body>
</html>
```

```javascript
const form = document.getElementById('identity-verification-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const phoneNumber = document.getElementById('phone-number').value;
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const identityVerifier = new kit.web3.eth.Contract(
    IdentityVerifierABI,
    IdentityVerifierAddress
  );
  const accounts = await kit.web3.eth.getAccounts();
  const tx = identityVerifier.methods.verify(accounts[0]);
  const sendTransaction = await kit.sendTransactionObject(
    tx,
    { from: accounts[0], value: kit.web3.utils.toWei('1', 'ether') }
  );
  const sendReceipt = await sendTransaction.sendAndWaitForReceipt();
  const isVerified = await identityVerifier.methods.isVerified(accounts[0]).call();
  if (isVerified) {
    alert('Your identity has been verified!');
  } else {
    alert('Your identity could not be verified.');
  }
});
```

In the code above, we are creating a form with input fields for the user's phone number, first name, and last name. We are then adding an event listener to the form's submit event, which will trigger when the user submits the form. 

Inside the event listener, we are getting the values of the input fields, creating a new instance of the IdentityVerifier smart contract using the deployed address, and getting the accounts associated with our Celo blockchain node.

We are then calling the verify function of the IdentityVerifier smart contract using the accounts[0] address, which is the address associated with the user's Celo account. We are also sending 1 CELO as payment for the verification service using the value parameter of the sendTransactionObject function.

We are then waiting for the transaction to be mined, and checking whether the user's address has been verified using the isVerified function of the IdentityVerifier smart contract. Finally, we are displaying an alert message indicating whether the user's identity has been verified or not.



## Step 4: Create a .gitignore file
Follow these steps:

```
# Ignore Node.js build artifacts
node_modules
npm-debug.log

# Ignore Celo account key file
*.json

# Ignore Celo private key file
*.pem

# Ignore compiled smart contract files
*.abi
*.bin
``` 

This `.gitignore` file ignores the `node_modules` folder, which contains the dependencies installed via npm. It also ignores the `*.json` and `*.pem` files, which are files that contain sensitive information such as account keys and private keys.

Additionally, the file ignores the `*.abi` and `*.bin` files, which are the compiled artifacts generated by the Solidity compiler when you compile your smart contract. These files are typically regenerated every time you compile your smart contract, so there's no need to include them in your repository.




# Conclusion

In this article, we explored how to integrate Celo's identity verification system into a web application using JavaScript and Solidity. We started by setting up the Celo SDK in our web application, and then created a smart contract on the Celo blockchain to verify the user's identity. Finally, we integrated the identity verification system into our web application using a form and event listeners.

By following the steps outlined in this article, you can create a secure and reliable identity verification system for your web application that leverages the power of the Celo blockchain. With the increasing importance of online identity verification, integrating Celo's identity verification system into your web application can give your users peace of mind and help you comply with regulatory requirements.




# Next Steps

There are several other tutorials that helps you develop your own applications on the Celo blockchain, click [here](https://docs.celo.org/tutorials) to learn more.


# About the Author

Joshua Obafemi

I'm a Web3 fullstack developer and technical writer. You can connect with me on [GitHub](https://github.com/jorshimayor), [Twitter](https://twitter.com/jorshimayor), [Linkedin](https://www.linkedin.com/in/joshua-obafemi-ba2014199/).



# References

[Source Code](https://github.com/jorshimayor/Integrating-Celo-s-Identity-Verification-System-into-a-Web-Application)