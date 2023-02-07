---
title: On-Chain Randomness with Celo using Subgraphs
description: The latest tutorial idea that I have is to create a lottery club, where users can establish their own lottery clubs with rewards of their choosing, including native coin (Celo), stablecoin (cUSD, cEUR, etc.) and also NFTs. In this idea, I will utilize Subgraph to index the smart contract of the lottery clubs created by users, and to ensure that the selection of winners for each lottery club will be determined by randomly generated numbers obtained from Celo Randomness, thereby reducing the potential for fraud in the process of selecting winners for each lottery club.
authors:
    - name: Abiyyu Yafu
url: https://github.com/yafiabiyyu
image_url: https://github.com/yafiabiyyu.png
tags: [subgraphs, randomness]
hide_table_of_contents: true
slug: /tutorials/on-chain-randomness-with-celo-using-subgraphs
---

![header](../../src/data-tutorials/showcase/intermediate/on-chain-randomness-with-celo-using-subgraphs.png)

## Introduction

In this tutorial, we will delve into the implementation of subgraphs and randomness in the Celo blockchain. Through this lesson, we will gain an understanding of the use of subgraph technology for monitoring blockchain activity and how to integrate random elements into our blockchain application. The tutorial is designed to impart a fundamental knowledge of how subgraphs and randomness can be utilized in creating a blockchain application that is both effective and captivating.

## Prerequisites

To understand this tutorial, you must already know how to use Hardhat and the Solidity programming language. If not, you may have trouble following the tutorial, so it's recommended to learn about Hardhat and the Solidity programming language first before starting this tutorial.

## Requirements

-   [Node.js](https://nodejs.org/en/download/) v14.17.6 LTS or higher
-   [Hardhat](https://hardhat.org/getting-started/#overview)
-   [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/)

This is a list of what we'll cover in this tutorial 🗒:

- ✅ **Step 1:** Understanding Celo Randomness & Subgraphs
- ✅ **Step 2:** Project Setup
- ✅ **Step 3:** Writing the Smart Contract
- ✅ **Step 4:** Deploying the Smart Contract
- ✅ **Step 5:** Integration with Subgraphs

## Step 1: Understanding Celo Randomness & Subgraphs

### Understanding Celo Randomness

Celo Randomness constitutes a mechanism for generating random numbers within the Celo blockchain network. It serves multiple purposes, such as ensuring fairness in validator node selection or determining the outcome of lottery-style smart contracts. The Celo Randomness is implemented through an algorithm that guarantees the generated random numbers are unpredictable and cannot be controlled by any individual or group. If you want to learn more about Celo Randomness, you can read the [Celo Randomness documentation](https://docs.celo.org/protocol/randomness).

### Understanding Subgraphs

The Subgraph Protocol within a blockchain network constitutes a set of rules that streamlines the arrangement and identification of information. It lends a hand in charting a map of information and defining the route to be followed to find desired information within the blockchain network, thereby guaranteeing that information within the blockchain can be accessed with greater efficiency and ease. If you want to learn more about Subgraphs, you can read the [Subgraph documentation](https://thegraph.com/docs/).

## Step 2: Project Setup

Open your terminal and run the following command to create a new project directory.

```bash
mkdir LottreyClub

cd LottreyClub
```

Initialize the project using npm, and you will be prompted to answer some questions regarding the project.

```bash
npm init
```

Next, install Hardhat as a development dependency and dotenv and OpenZeppelin as project dependencies.

```bash
npm install --save-dev hardhat

npm install dotenv @openzeppelin/contracts --save
```

Then, run the following command to create a project using Hardhat.

```bash
npx hardhat
```

You will be prompted to select options for your project. Choose 'Create a JavaScript project.' The outcome will look like this:

![init](images/1.png)


After that, edit the `hardhat.config.js` file to add the Celo Network and include a mnemonic for deploying the contract. The `hardhat.config.js` file should look like this:

```js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.15",
    networks: {
        alfajores: {
            url: "https://alfajores-forno.celo-testnet.org/",
            chainId: 44787,
            accounts: {
                mnemonic: process.env.MNEMONIC,
                path: "m/44'/60'/0'/0",
            },
        },
    }
};
```

## Step 3: Writing the Smart Contract

Before writing the main contract, create a new directory called `interface` in the `contracts` directory, and within it, create a new file called `IRandom.sol` This file will hold the interface for the Celo Randomness contract. The `IRandom.sol` file should appear as follows:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface IRandom {
    function random() external view returns (bytes32);
}
```

### Lottrey Club Native
Next, create a new file named `LottreyClubNative.sol` in the `contracts` directory. This file will utilize the native Celo coin as a reward for the lottery club. The `LottreyClubNative.sol` file should appear as follows:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "./interface/IRandom.sol";

contract LottreyClubNative {
    IRandom public constant RANDOMNESS_ADDRESS =
        IRandom(0x22a4aAF42A50bFA7238182460E32f15859c93dfe);

    string public name;
    uint256 public prize;
    uint256 public depositAmount;
    uint256 public membersLimit;

    address public manager;
    address public factory;
    address private _winnerAddress;
    address[] private _membersCounters;

    bool public isLottreyStart = false;

    mapping(address => uint256) private _balance;

    modifier onlyManager() {
        require(
            msg.sender == manager,
            "LottreyClub: Only manager can call this function"
        );
        _;
    }

    event NewRegister(address indexed member, uint256 timestamp);
    event LottreyWinner(
        address indexed winner,
        uint256 prize,
        uint256 timestamp
    );

    constructor() {
        factory = msg.sender;
        _winnerAddress = address(0);
    }

    function initialize(
        string calldata _name,
        uint256 _prize,
        uint256 _deposit,
        uint256 _membersLimit,
        address _manager
    ) external {
        require(
            msg.sender == factory,
            "LottreyClub: Only factory can call this function"
        );
        name = _name;
        prize = _prize;
        depositAmount = _deposit;
        membersLimit = _membersLimit;
        manager = _manager;
    }

    function startLottrey() external onlyManager {
        require(!isLottreyStart, "LottreyClub: Lottrey already started");
        isLottreyStart = true;
    }

    function endLottreyAndDraw() external onlyManager {
        require(isLottreyStart, "LottreyClub: Lottrey not started");
        require(
            _membersCounters.length >= membersLimit,
            "LottreyClub: Not enough members"
        );
        require(
            address(this).balance >= prize,
            "LottreyClub: Not enough balance"
        );
        _drawLottrey();
    }

    function registerMember() external payable {
        require(isLottreyStart, "LottreyClub: Lottrey not started");
        require(_membersCounters.length < membersLimit, "LottreyClub: Full");
        require(_balance[msg.sender] == 0, "LottreyClub: Already registered");
        _balance[msg.sender] = msg.value;
        _membersCounters.push(msg.sender);
        emit NewRegister(msg.sender, block.timestamp);
    }

    function getMembersTotal() external view returns(uint256) {
        return _membersCounters.length;
    }

    function _drawLottrey() private {
        _winnerAddress = _membersCounters[
            _getRandomNumber() % _membersCounters.length
        ];
        (bool success, ) = _winnerAddress.call{value: prize}("");
        if (success) {
            _resetLottrey();
            emit LottreyWinner(_winnerAddress, prize, block.timestamp);
        } else {
            revert("LottreyClub: Error sending prize to winner");
        }
    }

    function _resetLottrey() private {
        _winnerAddress = address(0);
        _membersCounters = new address[](0);
        isLottreyStart = false;
    }

    function _getRandomNumber() private view returns (uint256) {
        return uint256(RANDOMNESS_ADDRESS.random());
    }
}
```
let's break down the code above:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;
```
The first line is the license identifier for the contract and the second line specifies the version of the Solidity compiler to be used.

```solidity
import "./interface/IRandom.sol";
```
This line imports the 'IRandom.sol' created in the previous step.

```solidity
IRandom public constant RANDOMNESS_ADDRESS = IRandom(0x22a4aAF42A50bFA7238182460E32f15859c93dfe);

string public name;
uint256 public prize;
uint256 public depositAmount;
uint256 public membersLimit;

address public manager;
address public factory;
address private _winnerAddress;
address[] private _membersCounters;

bool public isLottreyStart = false;

mapping(address => uint256) private _balance;
```

These lines declare the state variables of the contract.
- `RANDOMNESS_ADDRESS` the address of the Celo Randomness contract. This can be found on the [Celo Contract Addresses](https://docs.celo.org/contract-addresses) page.
- `name` the name of the lottery club.
- `prize` the amount of Celo coin to be awarded to the winner.
- `depositAmount` the amount of Celo coin required to be deposited by club members.
- `membersLimit` the maximum number of members allowed in the lottery club.
- `manager` the address of the club's manager.
- `factory` the address of the factory contract.
- `winnerAddress` the address of the lottery club winner.
- `membersCounters` an array of addresses for the club's members.
- `isLottreyStart` a boolean variable indicating whether the lottery club has started or not.
- `_balance` a mapping of addresses to the amount of Celo coin deposited by members.

```solidity
modifier onlyManager() {
    require(
        msg.sender == manager,
        "LottreyClub: Only manager can call this function"
    );
    _;
}
```

This is a modifier that restricts access to the `startLottrey` and `endLottreyAndDraw` functions to only the club's manager.

```solidity
event NewRegister(address indexed member, uint256 timestamp);
event LottreyWinner(
    address indexed winner,
    uint256 prize,
    uint256 timestamp
);
```

This event is emitted both when a new member registers and when a winner is drawn.

```solidity
constructor() {
    factory = msg.sender;
    _winnerAddress = address(0);
}

function initialize(
    string calldata _name,
    uint256 _prize,
    uint256 _deposit,
    uint256 _membersLimit,
    address _manager
) external {
    require(
        msg.sender == factory,
        "LottreyClub: Only factory can call this function"
    );
    name = _name;
    prize = _prize;
    depositAmount = _deposit;
    membersLimit = _membersLimit;
    manager = _manager;
}
```

The constructor function is triggered when the contract is deployed. It sets the factory variable to the address of the `factory` contract and the `_winnerAddress` variable to `0`. The `initialize` function is invoked by the factory contract and is used to initialize the state variables of the lottery club.

```solidity
function startLottrey() external onlyManager {
    require(!isLottreyStart, "LottreyClub: Lottrey already started");
    isLottreyStart = true;
}

function endLottreyAndDraw() external onlyManager {
    require(isLottreyStart, "LottreyClub: Lottrey not started");
    require(
        _membersCounters.length >= membersLimit,
        "LottreyClub: Not enough members"
    );
    require(
        address(this).balance >= prize,
        "LottreyClub: Not enough balance"
    );
    _drawLottrey();
}
```

These functions are used to initiate and conclude the lottery club. Only the club's manager can call the `startLottrey` function. The `endLottreyAndDraw` function can only be executed by the club's manager when the club has begun, the required number of members have joined, and the contract has sufficient funds to award the prize. The `endLottreyAndDraw` function invokes the private `_drawLottrey` function to determine the winner.

```solidity
function registerMember() external payable {
    require(isLottreyStart, "LottreyClub: Lottrey not started");
    require(_membersCounters.length < membersLimit, "LottreyClub: Full");
    require(_balance[msg.sender] == 0, "LottreyClub: Already registered");
    _balance[msg.sender] = msg.value;
    _membersCounters.push(msg.sender);
    emit NewRegister(msg.sender, block.timestamp);
}
```

The `registerMember` function is used by members to sign up for the lottery club. It can only be executed while the club is ongoing and has available spots. The function verifies that the member hasn't already registered. The amount of Celo coin deposited by the member is stored in the `_balance` mapping, and their address is added to the `_membersCounters` array.

```solidity
function getMembersTotal() external view returns(uint256) {
    return _membersCounters.length;
}
```

The `getMembersTotal` function returns the number of members who have registered for the lottery club.

```solidity
function _drawLottrey() private {
    _winnerAddress = _membersCounters[
        _getRandomNumber() % _membersCounters.length
    ];
    (bool success, ) = _winnerAddress.call{value: prize}("");
    if (success) {
        _resetLottrey();
        emit LottreyWinner(_winnerAddress, prize, block.timestamp);
    } else {
        revert("LottreyClub: Error sending prize to winner");
    }
}
```

The `_drawLottrey` private function is used to determine the winner of the lottery. It generates a random number between 0 and the number of registered members using the `_getRandomNumber` function. The address of the winner is then retrieved from the `_membersCounters` array and stored in the `_winnerAddress` variable. The prize is sent to the winner's address. If the transaction is successful, the `LottreyWinner` event is emitted and the `_resetLottrey` function is called to reset the contract's state variables. If the transaction fails, the function will revert.

```solidity
function _resetLottrey() private {
    _winnerAddress = address(0);
    _membersCounters = new address[](0);
    isLottreyStart = false;
}
```

The `_resetLottrey` private function is used to reset the contract's state variables after a winner has been drawn.

```solidity
function _getRandomNumber() private view returns (uint256) {
    return uint256(RANDOMNESS_ADDRESS.random());
}
```

The `_getRandomNumber` private function is used to generate a random number. It uses the `random` function of the Celo Randomness contract to generate a random number.