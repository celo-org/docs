---
title: On-Chain Randomness with Celo using Subgraphs
description: The latest tutorial idea that I have is to create a lottery club, where users can establish their own lottery clubs with rewards of their choosing, including native coin (Celo), stablecoin (cUSD, cEUR, etc.) and also NFTs. In this idea, I will utilize Subgraph to index the smart contract of the lottery clubs created by users, and to ensure that the selection of winners for each lottery club will be determined by randomly generated numbers obtained from Celo Randomness, thereby reducing the potential for fraud in the process of selecting winners for each lottery club.
authors:
    - name: Abiyyu Yafi
url: https://github.com/yafiabiyyu
image_url: https://github.com/yafiabiyyu.png
tags: [subgraphs, randomness]
hide_table_of_contents: true
slug: /tutorials/on-chain-randomness-with-celo-using-subgraphs
---

![header](../../src/data-tutorials/showcase/intermediate/on-chain-randomness-with-celo-using-subgraphs.png)


## Introduction

In this tutorial, we will explore how subgraphs and randomness work in the Celo blockchain. This tutorial will cover the use of subgraph technology to monitor blockchain activity and how to integrate random elements into your blockchain application. By the end of this lesson, you'll have a foundational understanding of how subgraphs and randomness can enhance your blockchain application and make it more engaging.

## Prerequisites

This tutorial assumes prior knowledge of Hardhat and the Solidity programming language. Its content will focus on practical examples and implementation details rather than introductory explanations. If you are not familiar with these tools, we recommend that you first learn about them before starting this tutorial to fully benefit from its content.

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

### Celo Randomness

Celo's Randomness protocol generates decentralized and transparent random values using a trustless approach. It aggregates random numbers from multiple nodes using a tamper-proof Verifiable Random Function (VRF) for high security, unpredictability, and fairness. Other security and fairness features include a threshold signature scheme and a commit-reveal scheme. The protocol is ideal for various applications, including lotteries, games, and other applications requiring trustworthy randomness. if you want to learn more about Celo Randomness, you can read the [documentation](https://docs.celo.org/protocol/randomness) here.

### Subgraphs

The Subgraph protocol is a tool for developers to query data from decentralized networks like Ethereum and IPFS. It enables the creation and publication of public APIs called subgraphs, which index data from decentralized networks for easy accessibility by other developers.Using the Subgraph protocol, developers can create and deploy subgraphs that index data from smart contracts on Ethereum or files on IPFS. These subgraphs can be shared publicly for others to query using GraphQL, a powerful API query language. You can learn more about Subgraphs [documentation](https://thegraph.com/docs/en/cookbook/quick-start/) here.


## Step 2: Project Setup

Open a terminal and run the following command to create a new project named LotteryClub and initialize it as a Node.js project.

```bash
mkdir LotteryClub

cd LotteryClub

npm init -y
```

Next, install the Hardhat development environment and the OpenZeppelin smart contract libraries by running the following commands:

```bash
npm install --save-dev hardhat

npm install dotenv @openzeppelin/contracts --save
```

After the installation is complete, run the following command to initialize the Hardhat project:

```bash
npx hardhat
```

You will be prompted to select options for your project. Choose 'Create a JavaScript project.' The outcome will look like this:

![init](images/1.png)

Afterwards, edit the hardhat.config.js file to add the Celo Network and include a mnemonic for deploying the contract. The hardhat.config.js file should appear as follows:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.15",
        settings: {
            optimizer: {
                enabled: true,
                runs: 2000,
            }
        }
    },
    networks: {
        alfajores: {
            url: process.env.RPC_URL,
            chainId: 44787,
            accounts: {
                mnemonic: process.env.MNEMONIC,
                path: "m/44'/60'/0'/0",
            }
        },
    }
};
```


## Step 3: Writing the Smart Contract

Before we begin writing the smart contract code, we need to decide on the application we want to build. In this tutorial, we will create a lottery application that allows users to create their own lotteries with various prizes such as native currency (Celo), stablecoins (cUSD, cEUR, etc.), and NFTs. To ensure fairness in selecting winners for each lottery club, we will use Celo Randomness to generate random numbers that will be used to select winners. To integrate Celo Randomness into our lottery application, we need an interface contract that can access the functions in the Celo Randomness contract. To create this interface contract, we will make a new directory called `interface` in the `contracts` directory and create a file named `IRandom.sol` in the interface directory. Copy the following code into the `IRandom.sol` file:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

interface IRandom {
    function random() external view returns (bytes32);
}
```

To create the lottery application, we need to create a new file called `LotteryClub.sol` inside the `contracts` directory. This file will contain the code for the LotteryClub contract, which will enable users to create their own lotteries with prizes in Celo native currency (Celo) and stablecoins (cUSD, cEUR, etc.). Here's the code for the LotteryClub contract:


```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interface/IRandom.sol";

contract LotteryClub {

    using SafeMath for uint256;

    string private _name;
    uint256 private _reward;
    uint256 private _deposit;
    uint256 private _membersLimit;
    uint256 private _managerFee;

    address private _winer;
    address private _manager;
    address private _factory;
    address[] private _membersCounters;

    bool private _isLotteryStatus = false;

    IERC20 private _rewardAddress;
    IRandom private constant RANDOMNESS_ADDRESS = IRandom(0xdd318EEF001BB0867Cd5c134496D6cF5Aa32311F);

    mapping(address => uint256) private _userDeposit;

    modifier onlyManager() {
        require(msg.sender == _manager);
        _;
    }

    event Winer(address indexed club_, address indexed winer_, uint256 reward_, uint256 timestamp_);
    event Register(address indexed club_, address indexed members_, uint256 timestamp_);
    event Reward(address indexed club_, uint256 reward_, uint256 timestamp_);

    constructor() {
        _factory = msg.sender;
        _winer = address(0);
    }

    function initialize(
        string calldata name_,
        uint256 reward_,
        uint256 deposit_,
        uint256 membersLimit_,
        uint256 managerFee_,
        address manager_,
        address rewardAddress_
    ) external {
        require(msg.sender == _factory);
        _name = name_;
        _reward = reward_;
        _deposit = deposit_;
        _membersLimit = membersLimit_;
        _managerFee = managerFee_;
        _manager = manager_;
        _rewardAddress = IERC20(rewardAddress_);
        
    }

    function name() external view returns(string memory) {
        return _name;
    }

    function deposit() external view returns(uint256) {
        return _deposit;
    }

    function reward() external view returns(uint256) {
        return _reward;
    }

    function membersLimit() external view returns(uint256) {
        return _membersLimit;
    }

    function membersTotal() external view returns(uint256) {
        return _membersCounters.length;
    }

    function winer() external view returns(address) {
        return _winer;
    }

    function manager() external view returns(address) {
        return _manager;
    }

    function factory() external view returns(address) {
        return _factory;
    }

    function rewardAddress() external view returns(address) {
        return address(_rewardAddress);
    }

    function lotteryStart() external view returns(bool) {
        return _isLotteryStatus;
    }

    function setMembersLimit(uint256 membersLimit_) external onlyManager {
        require(membersLimit_ > 0);
        _membersLimit = membersLimit_;
        _update();
    }

    function setDeposit(uint256 deposit_) external onlyManager {
        require(deposit_ > 0);
        _deposit = deposit_;
        _update();
    }

    function start() external onlyManager {
        require(!_isLotteryStatus);
        _isLotteryStatus = true;
        if(_winer != address(0)) {
            _reset();
        }
    }

    function finishAndDraw() external onlyManager {
        require(_isLotteryStatus);
        require(_membersCounters.length == _membersLimit);
        _isLotteryStatus = false;
        _winer = _membersCounters[_getRandomNumber() % _membersCounters.length];
        _rewardAddress.transfer(_winer, _reward);
        emit Winer(address(this), _winer, _reward, block.timestamp);
    }

    function register() external {
        require(_isLotteryStatus);
        require(_membersCounters.length < _membersLimit);
        require(_userDeposit[msg.sender] == 0);
        _userDeposit[msg.sender] = _deposit;
        _rewardAddress.transferFrom(msg.sender, address(this), _deposit);
        _membersCounters.push(msg.sender);
        emit Register(address(this), msg.sender, block.timestamp);
    }

    function _reset() private {
        _winer = address(0);
        for(uint256 i = 0; i < _membersCounters.length; i++) {
            _userDeposit[_membersCounters[i]] = 0;
        }
        _membersCounters = new address[](0);
    }

    function _update() private {
        uint256 baseReward = _deposit.mul(_membersLimit);
        uint256 managerFee = baseReward.div(100).mul(_managerFee);
        _reward = baseReward - managerFee;
        emit Reward(address(this), _reward, block.timestamp);
    }

    function _getRandomNumber() private view returns(uint256) {
        return uint256(RANDOMNESS_ADDRESS.random());
    }    
}
```
Great, above is a smart contract for creating a lottery club. Let’s take a look at how we accomplish this smart contract step by step.

### 1 Define the contract

First, we define the license and compiler version we will use. Then, we import the libraries we need, which include :

`SafeMath` for performing math operations

`IERC20` for interacting with ERC20 tokens
 
`IRandom` for interacting with the Celo Randomness contract

and finally, `LotteryClub`, which is the name of the contract we will create.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interface/IRandom.sol";

contract LotteryClub {
    // Codes goes here...
}
```

### 2 Define the state variables

Next, we define the state variables that we will use:

`_name` is the name of the club that we will create.

`_reward` is the number of prizes that will be given to the winner.

`_deposit` is the deposit amount that must be paid by each member.

`_membersLimit` is the maximum number of members that can join the club.

`_managerFee` is the fee that will be given to the manager.

`_winner` is the address of the winner.

`_manager` is the address of the manager.

`_factory` is the address of the factory.

`_membersCounters` is an array containing the addresses of all members and for counting the number of members.

`_isLotteryStatus` is the status of the club, whether the club is in progress or not.

`_rewardAddress` is the address of the token that will be used as a reward.

`_userDeposit` is a mapping of the member's address and deposit amount.

`RANDOMNESS_ADDRESS` is the address of the Celo Randomness contract.

```solidity
using SafeMath for uint256;

string private _name;
uint256 private _reward;
uint256 private _deposit;
uint256 private _membersLimit;
uint256 private _managerFee;

address private _winer;
address private _manager;
address private _factory;
address[] private _membersCounters;

bool private _isLotteryStatus = false;

IERC20 private _rewardAddress;
IRandom private constant RANDOMNESS_ADDRESS = IRandom(0xdd318EEF001BB0867Cd5c134496D6cF5Aa32311F);

mapping(address => uint256) private _userDeposit;
```

### 3 Define modifiers

Next, we define the modifiers we will use. This modifier will be used to make it easier for us to restrict access to certain functions.

`onlyManager` is the modifier we will use to restrict access to functions that only managers can access

```solidity
modifier onlyManager() {
    require(msg.sender == _manager);
    _;
}
```

### 4 Define events

Next, we define the events that we will use to monitor the activities of our smart contracts.

`Winer` is an event that will indicate the winner of each club.

`Register` is an event that will indicate when a new member joins the club.

`Reward` is an event that will indicate any changes made to the reward amount due to a change in the number of members or deposit amount.

```solidity
event Winer(address indexed club_, address indexed winer_, uint256 reward_, uint256 timestamp_);

event Register(address indexed club_, address indexed members_, uint256 timestamp_);

event Reward(address indexed club_, uint256 reward_, uint256 timestamp_);
```

### 5 Define the constructor and initialize function

Next, we define the `constructor` function and the `initialize` function. The `constructor` function will be executed when we instantiate our smart contract. The `initialize` function will be executed when we create our smart contract instance and will `initialize` the initial values of the state variables we create. This `initialize` function can only be accessed by factory contracts and will set the initial values for the state variables.

```solidity
constructor() {
    _factory = msg.sender;
    _winer = address(0);
}

function initialize(
    string calldata name_,
    uint256 reward_,
    uint256 deposit_,
    uint256 membersLimit_,
    uint256 managerFee_,
    address manager_,
    address rewardAddress_
) external {
    require(msg.sender == _factory);
    _name = name_;
    _reward = reward_;
    _deposit = deposit_;
    _membersLimit = membersLimit_;
    _managerFee = managerFee_;
    _manager = manager_;
    _rewardAddress = IERC20(rewardAddress_);
    
}
```

### 6 Define the functions

Selanjutnya, kita mendefinisikan fungsi-fungsi yang akan kita gunakan. Fungsi-fungsi di bawah ini akan digunakan untuk membaca nilai-nilai dari state variable yang kita buat.

```solidity
function name() external view returns(string memory) {
    return _name;
}

function deposit() external view returns(uint256) {
    return _deposit;
}

function reward() external view returns(uint256) {
    return _reward;
}

function membersLimit() external view returns(uint256) {
    return _membersLimit;
}

function membersTotal() external view returns(uint256) {
    return _membersCounters.length;
}

function winer() external view returns(address) {
    return _winer;
}

function manager() external view returns(address) {
    return _manager;
}

function factory() external view returns(address) {
    return _factory;
}

function rewardAddress() external view returns(address) {
    return address(_rewardAddress);
}

function lotteryStart() external view returns(bool) {
    return _isLotteryStatus;
}
```

Fungsi `setMembersLimit` dan `setDeposit` akan digunakan untuk mengubah nilai dari state variable `_membersLimit` dan `_deposit`. Jika fungsi tersebut dijalankan, maka akan terjadi perubahan juga dari nilai state variable `_reward` dan `_managerFee` dengan menjalankan fungsi `_update`.

```solidity
function setMembersLimit(uint256 membersLimit_) external onlyManager {
    require(membersLimit_ > 0);
    _membersLimit = membersLimit_;
    _update();
}

function setDeposit(uint256 deposit_) external onlyManager {
    require(deposit_ > 0);
    _deposit = deposit_;
    _update();
}
```

Fungsi `start` akan digunakan untuk memulai lottery. Fungsi ini akan mengubah nilai dari state variable `_isLotteryStatus` menjadi `true` dan fungsi ini akan menjalankan fungsi `reset` jika `_winer` bukan `address(0)`.

```solidity
function start() external onlyManager {
    require(!_isLotteryStatus);
    _isLotteryStatus = true;
    if(_winer != address(0)) {
        _reset();
    }
}
```

Fungsi `finishAndDraw` akan digunakan untuk mengakhiri lottery dan memilih pemenang jika jumlah member sudah mencapai jumlah maksimal member. Pemilihan pengguna yang akan menjadi pemenang akan dilakukan secara acak dengan menggunakan fungsi `_getRandomNumber` yang berinteraksi dengan Celo Randomness contract dan juga fungsi `_getRandomNumber` akan mengembalikan nilai acak yang akan digunakan untuk memilih pemenang berdasarkan index dari array `_membersCounters`. Jika fungsi ini berhasil dijalankan, maka akan menjalankan event `Winer` dan mengirim reward ke alamat pemenang.

```solidity
function finishAndDraw() external onlyManager {
    require(_isLotteryStatus);
    require(_membersCounters.length == _membersLimit);
    _isLotteryStatus = false;
    _winer = _membersCounters[_getRandomNumber() % _membersCounters.length];
    _rewardAddress.transfer(_winer, _reward);
    emit Winer(address(this), _winer, _reward, block.timestamp);
}
```

Fungsi `register` akan digunakan oleh pengguna untuk bergabung ke dalam club. Fungsi ini akan mengecek apakah jumlah member sudah mencapai jumlah maksimal member atau belum. Jika belum, maka akan mengecek apakah pengguna sudah pernah bergabung ke dalam club atau belum. Jika belum, maka akan menambahkan alamat pengguna ke dalam array `_membersCounters` dan mengirim deposit ke alamat club. Jika fungsi ini berhasil dijalankan, maka akan menjalankan event `Register`.

```solidity
function register() external {
    require(_isLotteryStatus);
    require(_membersCounters.length < _membersLimit);
    require(_userDeposit[msg.sender] == 0);
    _userDeposit[msg.sender] = _deposit;
    _rewardAddress.transferFrom(msg.sender, address(this), _deposit);
    _membersCounters.push(msg.sender);
    emit Register(address(this), msg.sender, block.timestamp);
}
```

Fungsi `_reset` akan digunakan untuk mengatur ulang state variable yang ada pada club. Fungsi ini akan mengatur ulang nilai dari state variable `_winer`, `_membersCounters`, dan `_userDeposit`. Fungsi ini akan dijalankan ketika fungsi `finishAndDraw` berhasil dijalankan.

```solidity
function _reset() private {
    _winer = address(0);
    for(uint256 i = 0; i < _membersCounters.length; i++) {
        _userDeposit[_membersCounters[i]] = 0;
    }
    _membersCounters = new address[](0);
}
```

Fungsi `_update` akan digunakan untuk mengubah nilai dari state variable `_reward` dan `_managerFee` ketika fungsi `setMembersLimit` dan `setDeposit` berhasil dijalankan.

```solidity
function _update() private {
    uint256 baseReward = _deposit.mul(_membersLimit);
    uint256 managerFee = baseReward.div(100).mul(_managerFee);
    _reward = baseReward - managerFee;
    emit Reward(address(this), _reward, block.timestamp);
}
```

Fungsi `_getRandomNumber` akan digunakan untuk mengambil nilai acak dari Celo Randomness contract. Fungsi ini akan mengembalikan nilai acak yang akan digunakan untuk memilih pemenang berdasarkan index dari array `_membersCounters`.

```solidity
function _getRandomNumber() private view returns(uint256) {
    return uint256(RANDOMNESS_ADDRESS.random());
}
```