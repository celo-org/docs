---
title: Smart contract security on Celo with Securify
description: Analyze smart contracts using free security tools - Slither
authors:
  - name: Isaac Jesse
    title: Web3, Smart Contract Developer
    url: https://github.com/bobeu
    image_url: https://github.com/bobeu.png
tags: [celosage, intermediate, smartcontract, solidity]
hide_table_of_contents: true
slug: /tutorials/smart-contract-security-on-celo-with-securify
---

![header](../../src/data-tutorials/showcase/intermediate/smart-contract-security-on-celo-with-securify.png)

## Introduction

Smart contracts are self-executing pieces of code deployed on a blockchain. EVM-compatible blockchains such as Celo are free from censorship, downtime, and third-party interference, and have since invented changed how software is perceived. However, as exciting as smart contracts are, they introduce known and probably undetected risks ranging from low to critical in severity. It is crucial for developers to thoroughly scrutinize contract code before deployment.

## Prerequisites​
This guide introduces you to working with a security tool called Slither. You must at least be an intermediate working with smart contracts using solidity. If you're new in this space, I recommend starting from **[here](https://docs.celo.org/blog/tutorials/building-a-solidity-smart-contract-for-nft-royalty-fees-a-step-by-step-guide)** and **[here](https://docs.celo.org/blog/tutorials/best-practices-for-writing-smart-contracts-with-real-world-examples)**.

## Requirements​

The following tools are recommended and should be installed before proceeding.

- [Python](https://python.org)
- Install an editor/IDE. VSCode preferably
- Install NodeJs version 14 or later

**What is Slither?**
Slither is a static analysis framework for smart contracts development. With Slithet, developers are able to find vulnerabilities in smart contracts code written in solidity within seconds and optimize their code.

Slither is a security tool for analyzing smart contracts. There are other smart contracts platforms such as TRON and so on. But this guide focuses on the Celo blockchain - `a platform acting as a global payment infrastructure for cryptocurrencies that aims to target mobile users, highly compatible with the Ethereum Virtual Machine. So if you write contracts that target the Celo platform, it is very important to prioritize security. This helps to detect and avoid a range of smart contract issues such as integer overflow/underflow, owner-overwrite-to-Ether-withdrawal, and many others.

**Installing Slither**

To use Slither, be sure Python is installed on your machine since we will need the Python package manager - Pip to install the tool. If you need to install it from scratch, please follow the steps I itemized **[here](https://docs.celo.org/blog/tutorials/interacting-with-smart-contract-on-celo-using-web3py)**. To install Slither, run the following commands.

**Steps**

1. 
```bash
  pip3 install slither-analyzer
```
This will install Slither globally, and you can use it anywhere. We need a tool called `solc-select` to manage the solidity compiler. If you just installed `slither-analyzer`, you do not need to install `solc-select` separately. It is already installed in the previous process. To confirm if `solc-select` is installed, run:

2. 
```bash
    solc --version
```

You should see a version printed in the terminal.

`Version: 0.8.19+commit.7dd6d404.Linux.g++`

This is the current version of solc installed on my system. If otherwise, install `solc-select` following these steps.

3. 
```bash
pip3 install solc-select

```
Check again if correctly installed. Perform step 2. This time, it should return success.

To use Slither, we have to install the require compiler version in the contract files and tell `solc-select` which version to use during compilation. First, let's check if we have versions of the compiler previously installed.

```bash
solc-select install
```
In my terminal, I got several previously installed versions.

![image](images/1.png)

But if nothing was returned in your terminal, you will have to install the versions you want. You can install a specific version or simply get the latest version. 

```bash
    solc-select install <version>
```

or 

```bash
    solc-select latest
```

After installation, we have to explicitly tell `solc` which version we are using. 

```bash
    solc-select use <version>
```

Example: 

```bash
    solc-select use 0.8.18
```

or simply use the latest version.

```bash
    solc-select use latest
```

Now that we have instructed `solc-select` which version to use, let's make Slither invoke the compiler. We have to create a project first.

**Project setup**

- Create a project folder

```bash
    mkdir <projectName> && cd <projectName>
```

- Create hardhat project

```bash Yarn
    yarn add hardhat
```
```bash NPM
    npm install hardhat
```

- Invoke hardhat

```bash
    npx hardhat
```

Then, follow the instruction to complete the installation.

We will use the boilerplate code provided to us by Hardhat. Create a new file, name it `lock2.sol`. Populate it with the code below.

```js Lock2.sol
    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.9;

    contract Lock {
        uint public unlockTime;

        mapping(address => uint256) public balances;

        event Withdrawal(uint amount, uint when);

        constructor(uint _unlockTime) payable {
            require(
                block.timestamp < _unlockTime,
                "Unlock time should be in the future"
            );

            unlockTime = _unlockTime;
        }

        function withdraw(uint amount) public {
            // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
            // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
            uint bal = balances[msg.sender];
            require(block.timestamp >= unlockTime, "You can't withdraw yet");
            require(amount > 0, "Nothing to withdraw");
            (bool sent,) = address(msg.sender).call{value: amount}("");
            require(sent);
            emit Withdrawal(address(this).balance, block.timestamp);

            balances[msg.sender] -= amount;
        }
    }

```

>Note: I only modified the existing content for tutorial purposes. Do not use it in production.

Let's ask Slither to review the current status of the code. Run the following command by invoking Slither followed by the path to the contract.

```bash
    slither contracts/Lock2.sol
```

![image](images/2.png)

Within the seconds' window, Slither provided us with feedback for the specified contract. That was pretty fast. You could agree with me using Slither is faster and more accurate compared to **[Mythril](https://docs.celo.org/blog/tutorials/smart-contract-security-on-celo-with-mythril)**

- From the image, Slither warned us about the possibility of a reentrancy attack in our contract. It provided us with the error type and where it was generated. It also warns us about modifying the state variable after making an external call. The warning was printed in red to show the severity effect.

```bash
    Reentrancy in Lock.withdraw(uint256) (contracts/Lock.sol#20-31):
            External calls:
            - (sent) = address(msg.sender).call{value: amount}() (contracts/Lock.sol#26)
            State variables written after the call(s):
            - balances[msg.sender] -= amount (contracts/Lock.sol#30)
            Lock.balances (contracts/Lock.sol#7) can be used in cross function reentrancies:
            - Lock.balances (contracts/Lock.sol#7)
            - Lock.withdraw(uint256) (contracts/Lock.sol#20-31)
    Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
```

- Slither again provided us with some improvement suggestions printed in green. It suggested some improvements relating to external calls and dangerous comparison block timestamps. Timestamps can be manipulated by miners to an extent which is why you should endeavor to avoid dependency on timestamps.

```js
    INFO:Detectors:
    Reentrancy in Lock.withdraw(uint256) (contracts/Lock.sol#20-31):
            External calls:
            - (sent) = address(msg.sender).call{value: amount}() (contracts/Lock.sol#26)
            Event emitted after the call(s):
            - Withdrawal(address(this).balance,block.timestamp) (contracts/Lock.sol#28)
    Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3
    INFO:Detectors:
    Lock.constructor(uint256) (contracts/Lock.sol#11-18) uses timestamp for comparisons
            Dangerous comparisons:
            - require(bool,string)(block.timestamp < _unlockTime,Unlock time should be in the future) (contracts/Lock.sol#12-15)
    Lock.withdraw(uint256) (contracts/Lock.sol#20-31) uses timestamp for comparisons
            Dangerous comparisons:
            - require(bool,string)(block.timestamp >= unlockTime,You can't withdraw yet) (contracts/Lock.sol#24)
    Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#block-timestamp
    INFO:Detectors:
    Pragma version^0.8.9 (contracts/Lock.sol#2) allows old versions
    Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-versions-of-solidity
    INFO:Detectors:
    Low level call in Lock.withdraw(uint256) (contracts/Lock.sol#20-31):
            - (sent) = address(msg.sender).call{value: amount}() (contracts/Lock.sol#26)
    Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls
    INFO:Detectors:
    Lock.unlockTime (contracts/Lock.sol#5) should be immutable
    Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#state-variables-that-could-be-declared-immutable
    INFO:Slither:contracts/Lock.sol analyzed (1 contracts with 85 detectors), 7 result(s) found
```

The severity of the feedback printed in green is quite low and can be ignored if it won't cause a serious devastating effect on the contract. Let's try to fix the warnings.

Replace the `withdraw` function with the code below.

```js
    function withdraw(uint amount) public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
        uint bal = balances[msg.sender];
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(amount > 0 && bal >= amount, "Nothing to withdraw");
        unchecked {
            balances[msg.sender] = bal - amount;
        }

        (bool sent,) = address(msg.sender).call{value: amount}("");
        require(sent);
        
        emit Withdrawal(address(this).balance, block.timestamp);

    }
```

Now, run the slither command again. This time, the red warning should disappear.

The complete code for this tutorial can be found **[on the github](https://github.com/bobeu/analyzing-smart-contracts-security-on-celo-using-slither)**.

## Conclusion​

In this guide, we learned how to :

- Install and set up Slither.
- Analyze smart contracts and catch common vulnerabilities using Slither.
- I explained the analysis report, and we fixed the reported issues.

## What next?

Compare the initial and recent code. Did you notice any change? Try to explore more vulnerabilities in the contract, and share with us on **[Discord](https://discord.gg/celo)**.

To learn how to deploy your dream project on the Celo blockchain, visit the **[Celo documentation](https://docs.celo.org/tutorials)**

## About the Author​

**Isaac Jesse** , aka _Bobelr_ is a smart contract/Web3 developer. He has been in the field since 2018, worked as an ambassador with several projects like Algorand and so on as a content producer. He has also contributed to Web3 projects as a developer.

## References​

- [Celo developers resources](https://docs.celo.org/developer/)
- [Source code](https://github.com/bobeu/analyzing-smart-contracts-security-on-celo-using-slither)
- [Learn more about Slither](https://readthedocs.org/projects/slither-analyzer/)
