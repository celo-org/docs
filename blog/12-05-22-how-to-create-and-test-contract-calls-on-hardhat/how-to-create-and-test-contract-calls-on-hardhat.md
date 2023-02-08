---
title: How to Create and Test Contract Calls with Celo and Hardhat
description: How to Create and Test Contract Calls on Hardhat
authors:
  - name: ✍️ Mayowa Julius
tags: [hardhat, celosage]
hide_table_of_contents: false
slug: /tutorials/how-to-create-and-test-contract-calls-on-hardhat
---

![header](../../src/data-tutorials/showcase/intermediate/how-to-create-and-test-contract-calls-with-celo-and-hardhat.png)

## Introduction

One of the most essential and helpful tools a blockchain developer has as an arsenal is making contract calls. When working on complex and multi-contract projects, it is very likely, that you won't be deploying a single, smart contract file for the whole production. You might even deploy some contracts earlier than others.

Making contract calls is a flexible way for deployed contracts to interact with others on the blockchain.

This way, rather than having a messy long line of code, you have a network of contracts interacting with each other on the blockchain.

**Throughout this tutorial, you will learn how to:**

- Install and Setup Hardhat.
- Create a dummy smart contract.
- Use hardhat to deploy to the Celo Alfajores Network.
- Create a proficient test script on a hardhat.
- And make contract calls on your deployed contract using hardhat test scripts.

## Prerequisites

To get the best out of this tutorial, you should have a basic and foundational understanding of the following:

- Celo Alfajores Testnet
- Faucets
- Hardhat, Don't worry, you will be installing hardhat alongside this tutorial
- Node `node` and Node Package Manager `npm`. This tutorial will make use of the node package manager.

You should have the node package manager `npm` pre-installed. Follow the links for more information on installing `node` and node package manager `npm`.

## Requirements

- We'll need Metamask in this tutorial. Install it from [HERE](https://metamask.io/).
- Make sure to have NodeJS 12.0.1+ version installed.

## A brief definition of Keywords

Before you get started with this tutorial, here is a quick recap of the keywords you'll be working with during this tutorial.

### Celo Alfajores

The [Celo Alfajores](https://blog.celo.org/introducing-alfajores-1b162ebcb44d) is a test network run by the Celo Team. It is a blockchain simulation that enables deployments and testing of smart contracts on a testing blockchain. Although it is regarded as a testing blockchain, it primarily simulates deploying and testing contracts on the Celo Blockchain.

It functions exactly as effectively as on the Celo mainnets, except you call transactions using faucet funding (testnet money).

### Faucets

[These](https://coinmarketcap.com/alexandria/article/what-is-a-crypto-faucet) are simply **testnet money** funded into your wallet only to interact with a **Testnet Blockchain**.
To make transactions on the Alfajores Testnet you need CELO Testnet **tokens**.

Following this tutorial, you will need **CELO faucets** to deploy and transact on the Celo Alfajores blockchain.
Getting faucets is always as easy as taking these few baby steps:

1. Head over to the [faucet](https://faucet.celo.org) site for the testnet you need. For example, a Celo Alfajore faucet will give you tokens to interact with the Celo Alfajore testnet (which you will also use in this tutoria).

2. Copy your wallet address from metamask or your preferred wallet and paste it into the tab.

3. Complete the authentication process, usually, **_I am not a robot captcha_**. Click the send button and wait for about 15 to 90 seconds, depending on the requesting network, and you'll notice an increase in your wallet balance.

### HardHat

[This](https://hardhat.org/) is an Ethereum Development Environment that runs on `ether-js`, and other basic EVM-compatible libraries. It is used for compiling, running, and deploying solidity smart contracts.

### Calling Contracts

What are the contract calls referred to in this tutorial?
Making a contract call simply means calling the functions from a deployed contract into another deployed contract on the blockchain.
The calls can be made to retrieve data from a query function, to a payable function for making payments, or even a modifier function for modifying a variable state.

Now that you've been reminded of the tools we'll need, it's time to get your hands dirty with writing code to understand the purpose of this tutorial.

## Installing and Setting up Hardhat

To get started with the coding part o this tutorial, you need to install Hardhat.
In the next couple of steps, you will learn how to install Hardhat into your local work environment using yarn on your preferred package manager.

1. Create a workspace in you're preferred code editor.

2. Go to the terminal of your work environment and run the code `npm init -y`. This is to initialize a `package.json` file.

3. Run the command `npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers @nomicfoundation/hardhat-toolbox`. also, run the command `npm i hardhat-deploy` on your terminal to install all the required dependencies you'll need for this tutorial.

4. Next run the command `npx hardhat` to fire up your hardhat development environment. You will be prompted to choose the language you'll be working with.

5. Click enter twice to enable the option `Create a Javascript Project` and to verify the project location. You will notice a new folder structure on your code editor file explorer.

Now that you have successfully installed and Setup up your hardhat development environment. next you will create the exemplary contracts you need to test the contract calls.

## Creating your Smart Contracts

To simulate a contract call, you will need to create two smart contracts. These two contracts will be deployed on the Celo Blockchain.

One of the contracts will have the calling functions `TestContract.sol`, while the other contract, `Person.sol` will have the functions you will be calling from the previous contract, `TestContract.sol`.

### The Calling Contract **`Person`**

Navigate to the contract folder in your workspace and rename the existing contract from `Lock.sol` to `Person.sol`.

To initialize the contract and the needed variables, copy and paste the code below:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Person {

// Initializing the variables to Null or None
    string name;
    uint256 age;
    bool has_payed;

}
```

Inside the `Person.sol` contract you will create the following simple functions:

- The first function will be an external function `getDetails` that modifies the public variables `name`, and `age`. The function will accept a person's details as inputs and assign them to the public variables.
  Add the `getDetails` function below to the `Person.sol` contract created earlier.

```solidity
function getDetails(string memory _name, uint256 _age) external {
    name = _name;
    age = _age;
}
```

- The second function `sayDetails` will also be an external view function that simply returns the most recent person's details stored in the `getDetails` function.

Copy and add the code below into the `Person.sol` Contract as the next function.

```solidity
function sayDetails() external view returns (string memory, uint256) {
    return (name, age);
}
```

- The third function, `payFee` will be an external payable function that transfers money into the contract to simulate a person making a payment, the function assigns the bool variable `is_payed` to `true` and the variable paid amount `amount` to `msg.value`.

Copy the function below into the `Person.sol` contract.

```solidity
function payFee() external payable {
    value = msg.value;
    has_payed = true;
}
```

- The last contract is an external view function that returns multiple variables `value`, `contract_balance`, `has_payed` based on the payment function `payFee` being called earlier.

```solidity
function getValue() external view returns(uint256, uint256, bool) {
    return (value, address(this).balance, has_payed);
}
```

The four functions created are sample functions to copy a real scenario of calling different types of functions from a contract.

**_Note: Alternatively, When creating contract calls, you can use the keyword `Interface` to initialize the calling contract. To know more about the interface Keyword and other Basic Solidity Data Types, [click here](https://phensics.hashnode.dev/the-basic-solidity-guide)_**.

For Uniformity purposes, copy and paste the entire code below into the `Person.sol` contract file.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Person {
    string name;
    uint256 age;
    bool has_payed;
    uint256 value;

    function sayDetails() external view returns (string memory, uint256) {
        return (name, age);
    }

    function getDetails(string memory _name, uint256 _age) external {
        name = _name;
        age = _age;
    }

    function payFee() external payable {
        value = msg.value;
        has_payed = true;
    }

    function getValue() external view returns(uint256, uint256, bool) {
        return (value, address(this).balance, has_payed);
    }

}
```

### The Caller Contract **`TestContract`**

The second contract `TestContract.sol` will be the testing contract that will make the contract calls to the `Person.sol` contract.
The contract will also have four different functions to call the four different functions from the first contract, `Person.sol`.

When you want to call contracts from other contracts, one of the inputs has to be the address of the contract you are calling to and following the format below:

```solidity
function <function_name> <(function_inputs)> <visibility> <mutability> returns(output_datatype) {
    do something
    return something
}
```

Note: **_Note: Do not copy the function above, it is just a layout on how to structure a calling function._**

To initialize the `TestContract.sol` contract, copy the code below:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import './Person.sol';

contract TestContract {

}
```

\*\*\*Note: You'll need to import the `Person.sol` contract to refer to the functions in the `Person.sol` contract you'll be calling.

- The first function, `callGetDetails` accepts the address of the deployed `Person.sol` contract as `_test` and the other arguments `_name`, and `_age` to pass to the `getDetails` function in the `Person.sol` contract.
  Copy and add the function below to the contract:

```solidity
function callGetDetails(address _test, string memory _name, uint256 _age) external {
    Person(_test).getDetails(_name, _age);
}
```

- The second function `callSayDetails` will be an external view function that takes the deployed `Person.sol` contract address as `_test`. And returns the `name` & `age` variables in the `SayDetails` function from the `Person.sol` contract.

Copy and add the function below to the contract:

```solidity
function callSayDetails(address _test) external view returns (string memory, uint256) {
    return Person(_test).sayDetails();
}
```

- The third function `callpayFee` will call the `payFee` function in the `Person.sol` contract. The function is a payable function for sending ETH into the smart contract.

```solidity
function callpayFee(address _test) external payable {
    paying(_test).payFee();
}
```

- The last function `callgetValue`will be called the `getValue` from the previous contract `Person.sol`. The function will simply return the same values as the `getValue` function.

```solidity
function callgetValue(address _test) external view returns(uint256, uint256, bool) {
    return paying(_test).getValue();
}
```

Copy and add the code below:

```solidity
function callgetValue(address _test) external view returns(uint256, uint256, bool) {
    return paying(_test).getValue();
}
```

After adding all the functions created above, your complete `TestContract.sol` contract should look exactly like the code below.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;


import './Person.sol';

contract TestContract{
    function callGetDetails(address _test, string memory _name, uint256 _age) external {
        Person(_test).getDetails(_name, _age);
    }

    function callSayDetails(address _test) external view returns (string memory, uint256) {
        return Person(_test).sayDetails();
    }

    function callpayFee(address _test) external payable {
        Person(_test).payFee();
    }

    function callgetValue(address _test) external view returns(uint256, uint256, bool) {
        return Person(_test).getValue();
    }
}
```

Next, you'll be deploying the contracts you've created to the Celo Blockchain.

## Deploying to Celo Alfajores

Hopefully, you should be familiar with deploying a contract on the Celo blockchain. If not, here is a quick guide on deploying to the Celo Blockchain.
In the next few steps, you will deploy both of the previously created contracts to the Celo blockchain to begin making the contract calls.

1. To Compile the Contracts run the command `npm hardhat compile` on your terminal.

2. Head over to the deploy folder and replace the `Lock.js` deploy script with another two deploy scripts. Rename the files with `deploy_TestContract.js` and `deploy_PersonContract.js`.

3. Copy and paste the code below into the `deploy_PersonContract.js` file:

```javascript
const hre = require("hardhat");

const main = async () => {
  const PersonContract = await hre.ethers.getContractFactory("Person");
  const Person = await PersonContract.deploy();

  await Person.deployed();

  console.log("The Person contract was deployed to: ", Person.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
```

4. Copy and Paste the code below into the `deploy_TestContract.js` file:

```JavaScript
const hre = require("hardhat");

const main = async () => {
  const TestContract = await hre.ethers.getContractFactory("TestContract");
  const TestingContractCalls = await TestContract.deploy();

  await TestingContractCalls.deployed();

  console.log(
    "The TestContractCall contract was deployed to: ",
    TestingContractCalls.address
  );
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();
```

5. Next, head over to the `hardhat.config.js` file in the root folder and replace the hardhat config. code there with the Celo configuration code [here](https://github.com/Julius170/Making_Contract_Calls.demo/blob/master/hardhat.config.js).

6. Replace the solidity version specified at the bottom of the `hardhat.config.js` file with the same version of solidity specified in your contracts.

7. Run the command `npm i dotenv` to download the `dotenv` dependency, and create a new file in the root folder `.env`.

8. Create a variable name `MNEMONIC` inside the dotenv file and add your intended wallet MNEMONICs as the value.

**_Note: Your Wallet's MNEMONICs is simply the recovery phrase used in creating your wallet. Still not clear on what your MNEMONICs are? Here's a [quick read](https://vault12.com/securemycrypto/crypto-security-basics/mnemonic-seed-recovery-phrase/).
Ensure that the `.env` file is added to your `.gitignore` file if you'll be pushing to any version control._**.

9. Finally, run the Following Command to deploy the two contracts:

- Run the command `npx hardhat run scripts/deploy_PersonContract.js --network alfajores` to deploy the `Person.sol` contract.

**_Note: Make sure to copy the contract address printed on the console; you'll need it while making the contract calls._**.

- Run the command `npx hardhat run scripts/deploy_TestContract.js --network alfajores` to deploy the `TestContract.sol` contract.

**_Note: Make sure to copy the contract address printed on the console; you'll need it while making the contract calls_**.

**_And Voila, Contracts Deployed...🥂📝_**

## Making Contract Calls

Now it's time to make those contract calls.
You'll use the built-in hardhat tool **Hardhat Console** to interact with the contracts on the blockchain and make the contract calls.

- Run the command `npx hardhat console --network alfajores` to activate the hardhat console. You'll notice a prompt arrow appears `>`.

1. Firstly, you'll have to test the functions in the `Person.sol` contract by calling the functions.

- To begin, Run the code `const Person = await ethers.getContractFactory("Person")`, to get the deployed contract factory.

- Next, run the command `const person = await Person.attach("<Person.sol_contract_address>")`, to gain access to the contract on the blockchain.

A successful transaction should look like the image below:
![Person.sol Contract Factory](https://user-images.githubusercontent.com/69092079/200288397-8bfc23e6-1ca3-4e12-8aea-663363916a1e.jpg)

Now, to call the functions in the `Person.sol` contract:

- Run the command `await person.sayDetails()`, returns empty variables `name` and `age`. A successful transaction should look like the image below:

![Person.sol function test](https://user-images.githubusercontent.com/69092079/200290835-4c612ff6-23bd-4371-9219-572a7cb2f87e.jpg)

![Person.sol function test](https://user-images.githubusercontent.com/69092079/200298700-031d03ca-1a95-465b-973c-2cb6ced15fd4.jpg)

- Run the command `await person.getDetails("Albert", 22)`. A successful transaction should look like the image below:

![Person.sol contract test](https://user-images.githubusercontent.com/69092079/200293344-89ac757f-abcc-47e0-bd9c-3942f54c1d5c.png)

- Rerun the first command `await person.sayDetails()`; this should return the name and the values input you sent in previously. `Albert` and 22. A successful transaction should look like the image below:

![Person.sol contract test](https://user-images.githubusercontent.com/69092079/200293603-aeba1c32-0305-4c90-b1c9-7ac744bebce3.jpg)

- Run the command `await person.payFee()`. A successful transaction should look like the image below:

![Person.sol contract test](https://user-images.githubusercontent.com/69092079/200293867-f832a3f3-333f-4ca6-b803-3787b101be1c.jpg)

- Run the command `await person.getValue()`. A successful transaction should look like the image below:

![Person.sol Contract test](https://user-images.githubusercontent.com/69092079/200294069-0bc22c19-d67e-4fd7-80a2-90184d50fd50.jpg)

2. Now that you know what the functions in the `Person.sol` contract does, Now it's time to try calling the same function from another deployed contract `TestContract.sol`.

- To begin, Run the code `const TestContract = await ethers.getContractFactory("TestContract")`, to simply get the deployed contract factory.

- Next, run the command `const test = await TestContract.attach("<TestContract.sol_contract_address>")`, to gain access to the contract on the blockchain:

A successful transaction should look like the image below:
![Test Contract Factory](https://user-images.githubusercontent.com/69092079/200295770-0b11ea62-6f43-4db6-b67b-fc12418cef8a.jpg)

**_Note: This is where you'll need the contract address of the `Person.sol` You will need to pass the address as the first argument to all the function calls_**.

**_assuming the deployed `Person.sol` contract address is: 0xA019Ad7Ed1F3fc0276E0854F2fF022EFeFf5C8e1_**

- Run the command `await test.callGetDetails("0xA019Ad7Ed1F3fc0276E0854F2fF022EFeFf5C8e1", "Julia", 25)`. A successful transaction should look like the image below:

![Test Contract Calling](https://user-images.githubusercontent.com/69092079/200296284-4b71b095-7e15-49ed-9ab8-afd7c1570e3b.jpg)

- Run the command `await test.callSayDetails("0xA019Ad7Ed1F3fc0276E0854F2fF022EFeFf5C8e1")`. A successful transaction should look like the image below:

![Test Contract Call](https://user-images.githubusercontent.com/69092079/200296787-ecae4d6c-61ac-4e25-80be-fbede8931cc5.jpg)

- Run the command `await test.callpayFee("0xA019Ad7Ed1F3fc0276E0854F2fF022EFeFf5C8e1")`. A successful transaction should look like the image below:

![Testing Contract Call](https://user-images.githubusercontent.com/69092079/200297519-8b662168-1d4a-4648-a31a-2fb9166c1ec0.jpg)

- Run the command `await test.callgetValue("0xA019Ad7Ed1F3fc0276E0854F2fF022EFeFf5C8e1")`. A successful transaction should look like the image below:

![Test Contract Call](https://user-images.githubusercontent.com/69092079/200297582-975041d8-986a-4582-917c-6380a9ea6aa8.jpg)

## Conclusion

Finálè, you have completed and learned quite a lot of new things here. You created two smart contracts, one will call functions and the other to make contract calls across the blockchain; you deployed both contracts to the Celo Blockchain successfully. You also interacted with the deployed contract using the Hardhat Console, and you made several contract calls on the celo blockchain.

**_Congratulations on taking another big step into the web3 rabbit hole._**

## Next Steps

You can also read about how to run the unit test for smart contracts using Truffle, and
how to run the unit test for smart contracts using Hardhat.
Here are some other tutorial articles you might be interested in.

## About the Author

Mayowa Julius Ogungbola

A Software Engineer and technical writer always open to working on new ideas. I enjoy working on [GitHub](https://github.com/Julius170/) and you could also find out what I tweet about and connect with me on [Twitter](https://twitter.com/JuliusAyoola1).

## References

Here is a [link](https://github.com/Julius170/Making_Contract_Calls.demo) to the complete tutorial sample code on my GitHub, Leave a ⭐on the repository if you find it helpful.
