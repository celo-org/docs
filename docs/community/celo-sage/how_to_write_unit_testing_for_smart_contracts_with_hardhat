# How to Write Unit Testing for Smart Contracts with Hardhat

# Introduction
Unit testing is considered one of the most effective ways to ensure validating all functionalities and features of an application are working as expected. They are carried out in the development stage of an application and this case smart contracts. Unit testing with hardhat contracts gives you the tools to ensure your contract is working fine and efficiently test your contract.

On completing this tutorial, you will learn everything you need to know about writing effective unit tests for your smart contracts.

# Prerequisites

Throughout this tutorial you’ll need to have worked with or have a basic knowledge of the following;
* HardHat: [Hardhat](https://hardhat.org/) is an Ethereum Development Environment that provides the needed tools to help in the creation, compiling, and deployment of smart contracts.
* Solidity: [Solidity](https://docs.soliditylang.org/) is simply a high-level programming language that is used for creating smart contracts.
* Javascript: This tutorial will make use of Javascript, therefore you should be familiar with basic Javascript coding and algorithms.

# Requirements

This tutorial also aspects that you have the following already installed or available:
* [Node & node package management](https://nodejs.org/en/download/) `npm` or `yarn`: This tutorial will require you to use a preinstalled node package manager. You should also know about working with any package manager: `npm` or `yarn`.

# Installing and setting up Hardhat
To get started with the coding part of this tutorial, you will need to install Hardhat.
In the next couple of steps, you will learn how to install Hardhat into your local work environment using npm or you're preferred, Package Manager.

1. Create a workspace in your preferred code editor.

2. Go to the terminal of your work environment and run the command `npm init -y`. This will initialize the package manager and create a `package.json` file in preparation before installing hardhat.

3. Next, run the command  `npm install --save-dev hardhat @nomicfoundation/hardhat-chai-matchers chai @nomiclabs/hardhat-ethers ethers @nomicfoundation/hardhat-toolbox`. also, run the command `npm i hardhat-deploy` on your terminal to install all the required dependencies you'll need for this tutorial.

4. Next, run the command `npx hardhat` to fire up your hardhat development environment. You will be prompted to choose the language you'll be working with.

5. Click enter trice to enable the option `Create a Javascript Project`. and to verify the project location. You will notice a new folder structure on your code editor’s file explorer. 

Now that you have successfully installed and Setup up your hardhat development environment. next you will create the exemplary contracts you’ll need to write unit tests for.

# Running a Contract Test Simulation
After starting up the hardhat development environment you’ll notice a new folder structure appears in your workspace explorer like in the image below.

This file structure comes with a sample Lock.sol contract inside the contract folder and a `Lock.test.js` script inside the test folder.

Running tests on contracts usually requires you to run your trial a couple of times, therefore, deploying and running your test script on a MainNet or Testnets can be rather costly and also time-consuming. 

Throughout this tutorial, you will be deploying and running your contract’s tests on the hardhat’s local network to save time consumption and real cost.
To understand how unit testing works on smart contracts, run the command `npx hardhat test`. This will run a simulation test on the existing `Lock.sol` contract which will return a result like in the image below.
![Initial contract unit_test](https://user-images.githubusercontent.com/69092079/203416864-075075c9-d399-4da5-a348-94f3413790da.jpg)

Hardhat compiles the contract first, runs all the tests in the test script, and returns the result of all the tests. The image above shows what the result looks like when it passes all the unit tests.

# What is Hardhat Coverage
Hardhat also comes with an inbuilt [coverage](https://medium.com/coinmonks/smart-contract-code-coverage-in-hardhat-d4a5ff6c9ba6) functionality that runs a tabular representation of your contract test and other features of the contract’s current state test. Run the command `npx hardhat coverage`. A successful result will look exactly like the image below.
![Hardhat_Coverage](https://user-images.githubusercontent.com/69092079/203417939-99bf1ea9-4a12-4f13-8a95-48f9e1c2dfcc.jpg)


But in this tutorial, you’ll learn how to create your unit tests to suit your smart contract. Next, you need to create your contract.

***Note: Here is a [link](https://medium.com/coinmonks/smart-contract-code-coverage-in-hardhat-d4a5ff6c9ba6) to a more extensive read on hardhat [coverage](https://github.com/Julius170/smart_contract_unit_tests_with_hardhat/edit/master/README.md#what-is-hardhat-coverage)***.

![environment_directory](https://user-images.githubusercontent.com/69092079/203418211-a0753139-c8c3-4621-b3b4-2e5bf982250b.jpg)

# Creating the Smart Contract
Every contract test created is always written specifically to test a single contract meaning, if you have four different contract files in an application, your application should also have four test scripts for testing each contract.
In the next few steps, you’ll be creating an exemplary smart contract which you’ll, later on, be writing a test script for.

***Note: If you’re new to solidity and creating smart contracts, check out [this](https://phensics.hashnode.dev/the-basic-solidity-guide) tutorial to get started and understanding solidity code.
The tutorial above also has a couple of functions that will help you learn how to write solidity code***.

1. Head over to the contract folder and rename the `Lock.sol` contract in the contract folder to `Sample.sol`, and delete the contract's content.
2. The `Sample.sol` contract will have the following functionalities:

a. After initializing the contract, the variables `owner` and `fav_num` are also created, and by default, each has no value.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract Sample {
    address public owner;
    uint256 public fav_num;
}

```
b. Next, the contract has a constructor that assigns the address of the contract’s deployer to the `owner` variable and assigns the value 200 to `fav_num`. add the code below to update your contract:
```solidity
   constructor() {
        owner = msg.sender;
        fav_num = 200;
    }

```
c. The next function `store` simply takes an input and updates the value of the `fav_num` to the input integer value. Add the code below to update your contract:
```solidity
    function store(uint256 _number) public {
        fav_num = _number;
    }
    
```

d. The next function `retrieve` simply returns the current value `fav_num`.
Copy and add the code below to your contract:
```solidity
    function retrieve() public view returns (uint256) {
        return (fav_num);
    }
    
```

e. The next is a modifier function `isOwner` that requires whoever is calling its parent function to be the owner(deployer of the contract), or the function will be reverted. Copy and add the code below:

```solidity
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }
    
```
f. The next function `changeOwner` takes in an address as an argument and uses the previously created modifier to only allow the owner of the contract to call the function to switch the owner’s role to the input address.  Copy and add the code below to your contract:
```solidity
    function changeOwner(address newOwner) public isOwner {
        owner = newOwner;
    }

```

g. The next function `fundIn` allows anyone to deposit a minimum of 0.01 ETH into the contract or else it reverts the function call. Copy and add the code below to your contract:
```solidity
    function fundIn() public payable {
        require(
            msg.value >= 0.01 * 10**18,
            "you need to send at least 0.01 ETH"
        );
    }
    
```

h. And finally, the last function `withdraw` accepts an input `_amount` it requires the amount value to be a maximum of 0.1 ETH else it reverts the function without a message. Copy and add the code below to your contract:
 ```solidity
    function withdraw(uint _amount) public payable {
        // users can only withdraw .1 ETH at a time, feel free to change this!
        require(_amount <= 100000000000000000);
        payable(msg.sender).transfer(_amount);
    }

```

On completing your `Sample.sol` contract, Your smart contract should look exactly like the code below, You should update your contract with the code below for uniformity's sake:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract Sample {
    address public owner;
    uint256 public fav_num;
 
    constructor() {
        owner = msg.sender;
        fav_num = 200;
    }
 
    // Stores a new value in the contract
    function store(uint256 _number) public {
        fav_num = _number;
    }
 
    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return (fav_num);
    }
 
    // modifier to check if caller is owner
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }
 
    function changeOwner(address newOwner) public isOwner {
        owner = newOwner;
    }
 
    function fundIn() public payable {
        require(
            msg.value >= 0.01 * 10**18,
            "you need to send at least 0.01 ETH"
        );
    }
 
    function withdraw(uint _amount) public payable {
        // users can only withdraw .1 ETH at a time, feel free to change this!
        require(_amount <= 100000000000000000);
        payable(msg.sender).transfer(_amount);
    }
}
 
```

Now that you know the different functions in the sample.sol contract and you’re familiar with what they do. Next, you’ll learn how to create a unit test script to test subsections of the contract you just made.



# Writing the Unit Test Script
Now that you’ve created a simple contract with solidity you can now get started with writing your unit tests to suit the contract. After completing these tests you’ll have a basic idea of how to create unit tests for smart contracts.

A very common pattern used when writing unit tests for smart contracts is:

* **Arrange**: This is where you create dummy variables that you’ll need to run units of your test cases. They can be created globally after the contract test function s created or locally within the unit test.

* **Act**: Next, is the part where you run your testing functions and store the result in a variable.

* **Assert**:  Since you already know the correct result of the test, then you compare your expected result with the response of the test you ran. If the test returns the expected result, it passes else the test does not pass.
Also following the format:

```JavaScript
 describe(<"functionName">, async function () {
  beforeEach(async function() {
<what should happen before each test is run>
})
    it("what the test is expected to do", async function () {
      const response = <what was returned>
      const result = <what should be returned>;
      expect(response).to.equal(result); // compares the response to the expected result
    });
```

In the next few steps, you’ll be creating a uint-test to test your sample.sol contract using the previous format above, and you’ll learn how to create a basic unit test script on your own:

Testing a smart contract makes it easier to identify bugs and vulnerabilities and reduces the possibility of software errors that could lead to costly exploits.
In the next few steps, you will learn the basic format of how to write unit tests based on your smart contract.

* First, head over to your `deploy.js` script in your scripts folder and replace the deployment script with the code below:

```JavaScript 
const hre = require("hardhat");
 
const main = async () => {
  const SampleContract = await hre.ethers.getContractFactory("Sample");
  const Sample = await PersonContract.deploy();
 
  await Sample.deployed();
 
  console.log("The Sample contract was deployed to: ", Sample.address);
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
 
module.exports.tags = ["all", "sample"];

```

The code above is created to simply deploy your Sample.sol contract. 
Next, navigate to the Lock.js script in your test folder and rename the file to `sample.test.js`.


1. First import the `expects` keyword from `chai` and `ethers` from "hardhat". 
To initialize the contracts unit test script, copy and paste the code below:
```JavaScript
const { ethers, deployments } = require("hardhat");
const { assert, expect } = require("chai");
 
describe("Sample", async function () {
  let sample;
  let deployer;
  let accounts;
  let addrs2;
  let sendValue = ethers.utils.parseEther("0.0252");
  beforeEach(async function () {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    addrs2 = accounts[5];
    Sample = await ethers.getContractFactory("Sample");
    sample = await Sample.deploy();
  });
});
```

From the code above, the `describe` keyword creates a global test for the `sample.sol` contract, and immediately creates some variable that you'll need later when testing other units of your contract, (visible in the global scope).

2. Next, the `beforeEach` keyword is used to define a set of rules that are expected to run every time before running any unit test. Like compiling and deploying the contract.

3. Then each function has one or two tests attached to it using the it keyword, to write multiple unit tests for a specific function declared with the `describe` keyword.

a. The first test for the constructor checks if the owner variable is equal to the deployer’s address, and the `fav_number` is equal to 200. Copy and paste the code below:
```JavaScript 
 describe("constructor", async function () {
    it("sets the variable fav_number to 200", async function () {
      const response = await sample.fav_num();
      const result = 200;
      expect(response).to.equal(result);
    });
 
    it("sets the deployer of the contract to the owner of the contract.", async function () {
      response = await sample.owner();
      const result = deployer.address;
      expect(response).to.equal(result);
    });
  });
```

Now run the command `npx hardhat test` to run the test, which should return a result like the image below.
![first test](https://user-images.githubusercontent.com/69092079/203424204-5591691e-3c00-4363-b047-a5d2742775ea.jpg)


Also run `npx hardhat coverage`, which should return a tabular representation of your contract’s tests like in the image below.
![first_coverage](https://user-images.githubusercontent.com/69092079/203419363-a8e00d29-607b-496b-9f12-1f49a653f13d.jpg)

b. The next unit test will test the `store` function. This test calls the `store` function and using a test input `3000` and calls the retrieve function to check the updated value of `fav_num`, and passes the test if it equals the result `3000`.
```JavaScript 
  describe("store", async function () {
    it("updates the value of the variable fav_num", async function () {
      await sample.store(3000);
      const response = await sample.retrieve();
      const result = 3000;
      expect(response).to.equal(result);
    });
  });
 ```
Now run the command `npx hardhat test` to run the test, which should look like the image below.
 ![second_test](https://user-images.githubusercontent.com/69092079/203419518-035e4e2a-003f-469e-ba3d-a187d2c4b9ce.jpg)


c. The next unit test `changeOwner` describes the test for the `changeOwner` function. To create a test for this function, after deploying, you need to call the function using another address that is not the owner's address, expecting the function to be reverted. And you’ll also need to test using the right address `deployer` passing in another address to switch ownership of the contract. Thus the code below:

```JavaScript
 describe("changeOwner", async function () {
    it("only allows the owner of the contract to call this function", async function () {
      await expect(
        sample.connect(addrs2).changeOwner(addrs2.address)
      ).to.be.revertedWith("Caller is not the owner");
    });
 
    it("successfully changes the owner of the contract", async function () {
      await sample.connect(deployer).changeOwner(addrs2.address);
      const response = await sample.owner();
      const result = addrs2.address;
      await expect(response).to.equal(result);
    });
  });
 
 ```

Now run the command `npx hardhat test` to run the test, which should look like the image below.
![changeOwnertest](https://user-images.githubusercontent.com/69092079/203420116-b2073a9e-b2d0-47ae-b4e2-2d34ccc54aa3.jpg)


d. Next, to test the function fundIn, copy and add the code below. The first test reverts an error if the funder sends less than 0.01ETH, and the second test case successfully sends the right amount of eth after the funder sends an amount of ETH.
```JavaScript
  describe("fundIn", async function () {
    it("fails if anyone to send less than 0.01 ETH to the contract", async function () {
      const response = sample.fundIn();
      await expect(response).to.be.revertedWith(
        "you need to send at least 0.01 ETH"
      );
    });
 
    it("successfully transfer the right amount into the contract", async function () {
      const balanceBeforeFunding = await deployer.getBalance();
      await sample.fundIn({ value: sendValue });
      // const balanceAfterFunding;
      response = await deployer.getBalance();
      result = response += BigInt(sendValue);
      await expect(response).to.equal(result);
    });
  });
```

Now run the command `npx hardhat test` to run the test, which should look like the image below.
![fundIn](https://user-images.githubusercontent.com/69092079/203420231-f7b1eb09-922b-4faa-8d87-aa62fcda6af8.jpg)


e. The next unit test describes the `withdraw` function, the first test case reverts an address that is not the owner calls the function, and the other test case tests the function to make sure the right amount of ETH is withdrawn from the contract. Thus the code below.
```JavaScript
  describe("withdraw", async function () {
    it("fails if the withdrawer is not the owner of the contract", async function () {
      await expect(sample.connect(addrs2).withdraw(BigInt(sendValue))).to.be
        .reverted;
    });
 
    it("should withdraw the correct amount", async function () {
      withdrawAmount = ethers.utils.parseUnits("1", "ether");
      await expect(sample.withdraw(withdrawAmount)).to.be.reverted;
    });
  });

```

Finally completing your `Sample.test.js` script, your code should look exactly like the one below,  you can copy and update your testing code with the code below for uniformity's sake. When you run the command `npx hardhat test` this should be the result of the test.
![withdraw_test](https://user-images.githubusercontent.com/69092079/203422678-19083096-a40a-4e73-91b4-a8c5d60b1380.jpg)

Run the command `npx hardhat coverage` and note the difference between the previous result from running the command and its recent run. 
![final test](https://user-images.githubusercontent.com/69092079/203420599-10f1dd3d-1837-4162-bbcd-3e9ab1fe8edc.jpg)


# Conclusion
Writing unit tests for smart contracts can help a great deal in ensuring a secure and proficient contract, by suggesting fixes and improvements after discovering errors, issues, and security vulnerabilities in your contract. 
You have successfully created your unit test script for a simple sample contract. Now that you understand how unit tests are written you can move on to writing more complex test scripts for other smart contracts.

# Next Steps
You can also read about how to run the unit test for smart contracts using Truffle.
Here are some other tutorial articles you might be interested in.

# About the Author
Mayowa Julius Ogungbola

A software Engineer and technical writer always open to working on new ideas. I enjoy working on [GitHub](https://github.com/Julius170/) and you could also find out what I tweet about and connect with me on [Twitter](https://twitter.com/JuliusAyoola1) 

# References
Here is a [link](https://github.com/Julius170/smart_contract_unit_tests_with_hardhat) to the complete tutorial sample code on my GitHub, Leave a ⭐on the repository if you find it helpful.
