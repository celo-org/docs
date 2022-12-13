

# How to Write Unit Testing for Smart Contracts with Truffle

# Introduction
When creating decentralized applications that leverage smart contracts, it is important to ensure that little or no vulnerabilities to prevent an attacker from compromising your application.

Unit testing helps you ensure that all functionalities in your contract are working as expected, and development environments like Truffle give you the same tools to help you write proficient tests for your contracts before final deployment.

In this tutorial, you’ll create an exemplary contract and learn how to write and run unit tests for your contract using the truffle development environment.

# Prerequisites
Throughout this tutorial you’ll need to have worked with or have a basic knowledge of the following:
* Truffle Suite: [Truffle suite](https://www.kaleido.io/blockchain-platform/truffle) is a Development Environment that acts as a pipeline for interacting with the EVM and also provides essential features and useful libraries for testing ethereum smart contracts and makes it easy to interact with the blockchain.
* Solidity: [Solidity](https://docs.soliditylang.org/) is simply a high-level programming language that is used for creating smart contracts.
Javascript: This tutorial will make use of Javascript, therefore you should be familiar with basic Javascript coding and algorithms.


# Requirements
This tutorial also aspects that you have the following already installed or available:
*  [Node & node package management](https://nodejs.org/en/download/) `npm` or `yarn`: This tutorial will require you to use a preinstalled node package manager. You should also know about working with any package manager: `npm` or `yarn`.

# Installing and setting up Truffle suite
To install the truffle suite using your terminal. Create a workspace, head over to the directory on your terminal, and run the command `npm install -g truffle`.

Now, run the command `npx truffle init` to fire up the development environment.
You’ll notice a new file structure appears in your file explorer, something like the image below:
![truffle_init](https://user-images.githubusercontent.com/69092079/206867332-0a1c4244-b0df-4211-8c68-efe50dd44990.jpg)


# Running a Contract Test Simulation
To understand how unit testing works using the Truffle suite create a demo directory, different from your main directory, and run the command `npx truffle unbox  metacoin`. The result of the successful run of the code should look like the image below.

![creating_metacoin](https://user-images.githubusercontent.com/69092079/206867360-6d2057de-beb0-4826-82c9-68c2cdf2eafe.jpg)

The command starts up a demo project called <metacoin> including two contract files `MetaCoin.sol` and `ConvertLib.sol` in the contract directory and also has two testing files `TestMetaCoin.sol` and `metacoin.js` file in the test directory. For running unit tests on the metacoin contracts.

Now run the command `npx truffle test` and the result of the unit test should look exactly like the image below.
  
![demo_testing](https://user-images.githubusercontent.com/69092079/206870915-91ab3652-24a9-4872-92ce-59dc2850ca66.jpg)


Truffle first compiles the contract, runs all the unit test in the test script, and returns the result of all the tests. The image above shows the result when it passes all the unit tests.

# Creating the Smart Contract
  
Each contract test made is composed explicitly to test a specific contract,  meaning if you have four different contract files in an application, your application should likewise have four test scripts for testing each contract.
In the following steps, you'll write a simple sample contract which you'll, later be writing a for.

***Note: If you’re new to solidity and creating smart contracts, check out [this](https://phensics.hashnode.dev/the-basic-solidity-guide) tutorial to get started and understand solidity code.
The tutorial above also has a couple of functions that will help you learn how to write solidity code***.

1. Head back to the initial development environment directory you created; inside the contract folder, create a new file, `Sample.sol`. This will be the smart contract you’ll be writing unit tests for.

2. The `Sample.sol` contract will have the following functionalities:
a. First, the contract is created, and the variables `name`, and `age` are also created and by default, have no value.
  
```Solidity
// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.17;
 
contract Sample {
    string public name;
    address public owner;
 
 
}
```
 
b. Next, the contract’s constructor function assigns the address of the deployer of the contract to the variable `owner` and assigns the string "deployer" to the `name` variable.
 ```solidity
    constructor() {
        owner = msg.sender;
        name = "deployer";
    }
 ```

c. The next function `rename` accepts a string value as argument and assigns it to the variable `name`.
```solidity
  
  function rename(string memory _name) public {
        name = _name;
    }
```

d. The next function `describe` simply return the current values of the global variable, `name`.
  
```solidity
  
    function describe() public view returns (string memory) {
        return (name);
    }
```

e. Next is a modifier function `ownerOnly` that only allows the contract owner to call its parent function when added to any function.
```solidity
    modifier ownerOnly() {
        require(
            msg.sender == owner,
            "this function requires the owner of the contract to run"
        );
        _;
    }
```


f. The following function `changeOwner` uses the previously created `ownerOnly` modifier to only allow the owner of the contract to change the role of the contract owner to any address by passing as an argument to the `changeOwner` function.

```solidity
    function changeOwner(address _newOwner) public ownerOnly {
        owner = _newOwner;
    }
```
  


g. The next function `deposit` allows anyone to send a minimum of *1 ETH* to the contract.
```solidity
    function deposit() public payable {
        require(
            msg.value >= 0.01 * 10 ** 18,
            "you need to send at least 0.01 ETH"
        );
    }
```

h. Finally, the last function in the `Sample.sol` contract allows anyone calling the contract to withdraw funds from the contract, as long as you pass in the number of tokens to withdraw as an argument. This transaction will also be terminated if the amount passed in exceeds than *10 ETH*.
```solidity
    function withdraw(uint256 _amount) public payable {
        require(_amount <= 100000000000000000);
        payable(msg.sender).transfer(_amount);
    }
```

If you’ve completed your `Sample.sol` contract, Your smart contract should look exactly like the code below; You should update your contract with the code below for uniformity sake:
```solidity
// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.17;
 
contract Sample {
    string public name;
    address public owner;
 
    constructor() {
        owner = msg.sender;
        name = "deployer";
    }
 
    function rename(string memory _name) public {
        name = _name;
    }
 
    function describe() public view returns (string memory) {
        return (name);
    }
 
    modifier ownerOnly() {
        require(
            msg.sender == owner,
            "this function requires the owner of the contract to run"
        );
        _;
    }
 
    function changeOwner(address _newOwner) public ownerOnly {
        owner = _newOwner;
    }
 
    function deposit() public payable {
        require(
            msg.value >= 0.01 * 10 ** 18,
            "you need to send at least 0.01 ETH"
        );
    }
 
    function withdraw(uint256 _amount) public payable {
        require(_amount <= 100000000000000000);
        payable(msg.sender).transfer(_amount);
    }
}
```

To confirm you have no existing errors in your contract, run the command `npx truffle compile` on your terminal, and a successful result should look like the image below.
![compiling_contract](https://user-images.githubusercontent.com/69092079/206871446-9219cf8b-727d-4750-b88a-11739d9c27d6.jpg)


Now that you know the different functions in the `Sample.sol` contract and you’re familiar with what they do. Next, you’ll learn how to create a unit test script to test subsections of the contract you just made.

# Writing the Unit Test Script

Now that you have created the `Sample.sol` contract, you can begin writing the unit tests for the contract. After completing these tests, you’ll have a basic idea of how to create unit tests for smart contracts.
                                              
A very common pattern used when writing unit tests for smart contracts is:
                                              
a. *Arrange*: This is where you create dummy variables that you’ll need to run units of your test cases. They can be created globally after the contract test function s created or locally within the unit test.

b. *Act*: Next, is the part where you run your testing functions and store the result in a variable.

c. *Assert*:  Since you already know the correct result of the test, then you compare your expected result with the response of the test you ran. If the test returns the expected result, it passes else, the test does not pass.
                                              
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
  
Next, you’ll be creating a uint-test to test your `Sample.sol` contract using the previous format above, and you’ll learn how to create a basic unit test script on your own:

Testing a smart contract makes it easier to identify bugs and vulnerabilities and reduces the possibility of software errors that could lead to costly exploits.
In the next few steps, you will learn the basic format of how to write unit tests based on your smart contract.

* First,  head over to the `migrations` folder and create a script file called `1_deploy_contract.js` and copy the code below into the script.

```JavaScript 
const Sample = artifacts.require("Sample");
// const MetaCoin = artifacts.require("MetaCoin");
 
module.exports = function (deployer) {
  // deployer.deploy(Sample);
  // deployer.link(Sample, SampleTest);
  // deployer.deploy(SamplTest);
  deployer.deploy(Sample, { gas: 1000000 });
};
``` 



The code above is created to simply deploy your `Sample.sol` contract. 
Next, navigate to the `test` folder and create a new test script, `SampleTest.js`.

1. Firstly, you’ll need to import the contract as a variable `Sample` in the first line of code.
```JavaScript 
const Sample = artifacts.require("Sample");
```

2. Next, you’ll need to initialize the contract test with the following code below. This contract - Sample will cover all the unit test functions that will be carried out on the named contract.
```JavaScript 
contract("Sample", (accounts) => {
})
```

3. Using the `describe` keyword to define a specific test for each function in the contract, you can carry out multiple tests using the `it` keyword for a specific function. The first test `constructor` tests the constructor function in the contract. Copy and add the code below.

```JavaScript
  describe("constructor", async function () {
    it("should have the correct name", async () => {
      const sample = await Sample.deployed();
      const name = await sample.name();
      assert.equal(name, "deployer");
    });
 
    it("should have the correct owner", async () => {
const sample = await Sample.deployed();
      const owner = await sample.owner();
      assert.equal(owner, accounts[0]);
    });
  });
```
  
The function has two tests with string descriptions of what each of them is meant to do.
The first test check for the initialization of the `name` variable and checks the value of the owner variable to the address of the deployer. The test passes if the result returns as expected and reverts with an error otherwise.

Now, run the command `npx truffle test`, and a successful result should look like the image below.
![test(2)](https://user-images.githubusercontent.com/69092079/206874950-bafc9f03-3188-4abf-8df4-e907372b48d2.jpg)


4. The next unit test describes the `rename` and `describe` function from the smart contract; the function carries out a single test on the `rename` and `describe` function. 
The test updates the name variable's value and checks the current the variable's current value if it has been updated. Copy and add the code below.
  
```JavaScript
  describe("rename & describe", async function () {
    it("should be able to rename", async () => {
      const sample = await Sample.deployed();
      await sample.rename("new name");
      const name = await sample.describe();
      assert.equal(name, "new name");
    });
  });
```
	
Now, run the command `npx truffle test` and a successful result should look like the image below.

![test(1)](https://user-images.githubusercontent.com/69092079/206875087-734786bf-b31b-4ea6-b0c3-7db045c1d982.jpg)

5. The next unit test describes the `changeOwner` function in the smart contract; the test first uses the right address to attempt to change the owner, which should pass successfully. And then uses another random address to change the ownership role, which is meant to be reverted.
Copy and add the code below.

```JavaScript
describe("changeOwner", async function () {
    it("should change the owner", async () => {
      const sample = await Sample.deployed();
      await sample.changeOwner(accounts[1], { from: accounts[0] });
      const owner = await sample.owner();
      assert.equal(owner, accounts[1]);
    });
 
    it("should not change the owner", async () => {
      const sample = await Sample.deployed();
      try {
        await sample.changeOwner(accounts[2], { from: accounts[1]});
      } catch (error) {
        assert.equal(
          error.message,
          "VM Exception while processing transaction: revert"
        )};
    });
  });
 ```
  
Now, run the command `npx truffle test` and a successful result should look like the image below.
![test(3)](https://user-images.githubusercontent.com/69092079/206875185-f08b1bcc-e9bc-48cf-9694-103f6641a88c.jpg)


6. The next function tests the `deposit` function of the contract. The first test will verify the deposit function works correctly which allows deposits of 0.01 ETH or greater. The second test verifies that the deposit function correctly rejects deposits of less than 0.01 ETH. Copy and paste the code below.
```JavaScript
  describe("deposit", async function () {
    it("should allow deposits", async () => {
      const sample = await Sample.deployed();
      await sample.deposit({ value: 0.01 * 10 ** 18 });
    });
    it("should not allow deposits below 0.01 ETH", async () => {
      const sample = await Sample.deployed();
      try {
        await sample.deposit({ value: 0.009 * 10 ** 18 });
        assert.fail("deposit should have failed");
      } catch (error) {
        assert.ok(error.message.includes("revert"));
      }
    });
  });
```
  
Now, run the command `npx truffle test` and a successful result should look like the image below.

![test(4)](https://user-images.githubusercontent.com/69092079/206875243-bc86bd7d-768e-4726-90d7-0e02ea996409.jpg)

7. This next describe function tests the `withdraw` function in the contract. The first test is attempting to withdraw 0.01 ether from the contract. The second test is attempting to withdraw an amount greater than the balance to ensure that the withdrawal fails. If the test fails, it will return an error message with the word `revert`.
```JavaScript
  describe("withdraw", async function () {
    it("should allow withdrawals", async () => {
      const sample = await Sample.deployed();
      await sample.withdraw(BigInt(0.01 * 10 ** 18));
    });
    it("should not allow withdrawals above balance", async () => {
      const sample = await Sample.deployed();
      try {
        await sample.withdraw(BigInt(0.01 * 10 ** 18));
        assert.fail("withdrawal should have failed");
      } catch (error) {
        assert.ok(error.message.includes("revert"));
      }
    });
  });
```
  
Finally, run the command `npx truffle test` and a successful result should look like the image below.

![test(5)_](https://user-images.githubusercontent.com/69092079/206875289-f9bb4e28-ab8c-4957-9215-82e15a184997.jpg)


After completing your test script, your code should look exactly like the one below.
For uniformity, sake replaces the entire code with this code test.

```JavaScript
const Sample = artifacts.require("Sample");
 
contract("Sample", (accounts) => {
  describe("constructor", async function () {
    it("should have the correct name", async () => {
      const sample = await Sample.deployed();
      const name = await sample.name();
      assert.equal(name, "deployer");
    });
 
    it("should have the correct owner", async () => {
      const sample = await Sample.deployed();
      const owner = await sample.owner();
      assert.equal(owner, accounts[0]);
    });
  });
 
  describe("rename & describe", async function () {
    it("should be able to rename", async () => {
      const sample = await Sample.deployed();
      await sample.rename("new name");
      const name = await sample.describe();
      assert.equal(name, "new name");
    });
  });
  describe("changeOwner", async function () {
    it("should change the owner", async () => {
      const sample = await Sample.deployed();
      await sample.changeOwner(accounts[1], { from: accounts[0] });
      const owner = await sample.owner();
      assert.equal(owner, accounts[1]);
    });
 
    it("should not change the owner", async () => {
      const sample = await Sample.deployed();
      try {
        await sample.changeOwner(accounts[2], { from: accounts[1] });
      } catch (error) {
        assert.equal(
          error.message,
          "VM Exception while processing transaction: revert"
        );
      }
    });
  });
  describe("deposit", async function () {
    it("should allow deposits", async () => {
      const sample = await Sample.deployed();
      await sample.deposit({ value: 0.01 * 10 ** 18 });
    });
    it("should not allow deposits below 0.01 ETH", async () => {
      const sample = await Sample.deployed();
      try {
        await sample.deposit({ value: 0.009 * 10 ** 18 });
        assert.fail("deposit should have failed");
      } catch (error) {
        assert.ok(error.message.includes("revert"));
      }
    });
  });
  describe("withdraw", async function () {
      it("should allow withdrawals", async () => {
        const sample = await Sample.deployed();
        await sample.withdraw(BigInt(0.01 * 10 ** 18));
      });
      it("should not allow withdrawals above balance", async () => {
        const sample = await Sample.deployed();
        try {
          await sample.withdraw(BigInt(0.01 * 10 ** 18));
          assert.fail("withdrawal should have failed");
        } catch (error) {
          assert.ok(error.message.includes("revert"));
        }
      });
    });
});

```






# Conclusion
Writing unit tests for smart contracts can help a great deal in ensuring a secure and proficient contract, by suggesting fixes and improvements after discovering errors, issues, and security vulnerabilities in your contract. 
You have successfully created your unit test script for a simple sample contract using truffle. Now that you understand how unit tests are written, you can move on to writing more complex test scripts for other smart contracts.
You can also read about how to run the unit test for smart contracts using Truffle.

# Next Steps
Here is some other tutorial article.
[Unit testing with Hardhat and Celo](https://docs.celo.org/blog/tutorials/how-to-write-unit-testing-for-contracts-with-hardhat)
[How to create and Test contract calls with Celo and Hardhat](https://docs.celo.org/blog/tutorials/how-to-create-and-test-contract-calls-on-hardhat)
# About the Author
***Mayowa Julius Ogungbola***

A Software Engineer and technical writer who is always open to working on new ideas. I enjoy working on [GitHub](https://github.com/Julius170/), and you could also find out what I tweet about and connect with me on [Twitter](https://twitter.com/JuliusAyoola1) 
# References
Here is a [link](https://github.com/Julius170/smart-contract-unit-testing-with-truffle) to the complete tutorial sample code on my GitHub, Leave a ⭐on the repository if you find it helpful.
