---
title: A prediction market that allows users to create and trade prediction contracts on future events on celo.
description: This project is a smart contract for a prediction market. Users can create and trade contracts on future events, and the contract settles automatically based on the outcome.
authors:
  - name: Ogoyi Thompson
    title: Technical Writer 
    url:   https://github.com/Ogoyi
    image_url:  https://avatars.githubusercontent.com/u/115812158?v=4
tags: [celosage, dapp, intermediate, celo]
hide_table_of_contents: true
slug: /tutorials/cUsd-based-event-ticketing-and-management-system
---

## Introduction

The contract is a Solidity smart contract for a decentralized prediction market. It enables users to create and trade prediction contracts on future events, and the outcome is settled automatically based on the event outcome. The contract stores information on each contract's creator, description, end time, price, and outcome, allowing for transparent trading without the need for intermediaries. Users can buy shares using cUSD tokens, and payouts are made to those who correctly predict the outcome. The contract is designed to be secure, using the Celo blockchain to enforce the rules of the market.

## REQUIREMENT

To follow this tutorial, you will require:

- A code editor or text editor such as Remix.

- An internet browser and a stable internet connection.
  
## PREREQUISITE

To successfully complete this tutorial, it is recommended that you have:

- Familiarity with Javascript programming language.
  
- A basic understanding of Blockchain technology and its functioning.
  
- Basic knowledge of the Solidity programming language used for smart contract development on the blockchain.
  
  We will begin by using the Remix IDE to write our smart contract. Let's get started!

 The complete code:
   
 ```solidity
  // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


interface IERC20Token {
   function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract PredictionMarket {
    
    using SafeMath for uint;

    uint internal numContracts = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct Contract {
        address payable creator;
        string description;
        uint endTimestamp;
        uint yesShares;
        uint noShares;
        uint price;
        bool resolved;
        bool outcome;
    }

    mapping(uint => Contract) internal contracts;

    function createContract(
        string memory _description,
        uint _endTimestamp,
        uint _price
    ) public {
        Contract storage newContract = contracts[numContracts];
        newContract.creator = payable(msg.sender);
        newContract.description = _description;
        newContract.endTimestamp = _endTimestamp;
        newContract.price = _price;
        newContract.resolved = false;
        newContract.outcome = false;
        numContracts++;
    }

    function getContract(uint _index) public view returns (
    address,
    string memory,
    uint,
    uint,
    uint,
    uint,
    bool,
    bool
) {
    Contract storage c = contracts[_index];
    return (
        c.creator,
        c.description,
        c.endTimestamp,
        c.yesShares,
        c.noShares,
        c.price,
        c.resolved,
        c.outcome
    );
}

    function buyShares(uint _index, bool _outcome) public payable {
        require(
            !contracts[_index].resolved,
            "Contract has already been resolved."
        );
        require(
            msg.value == contracts[_index].price,
            "Incorrect amount of cUSD sent."
        );
        if (_outcome) {
            contracts[_index].yesShares = contracts[_index].yesShares.add(msg.value);
        } else {
            contracts[_index].noShares = contracts[_index].noShares.add(msg.value);
        }
    }
function resolveContract(uint _index, bool _outcome) public {
    require(
        block.timestamp > contracts[_index].endTimestamp,
        "Contract has not yet expired."
    );
    require(
        !contracts[_index].resolved,
        "Contract has already been resolved."
    );
    contracts[_index].resolved = true;
    contracts[_index].outcome = _outcome;
    uint totalShares = contracts[_index].yesShares.add(contracts[_index].noShares);
    if (totalShares > 0) {
        uint payoutPerShare = address(this).balance.div(totalShares);
        if (_outcome) {
            contracts[_index].creator.transfer(contracts[_index].yesShares.mul(payoutPerShare));
        } else {
            contracts[_index].creator.transfer(contracts[_index].noShares.mul(payoutPerShare));
        }
    }
}

     } 
 ```
 
```solidity
 // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
```

In this Solidity code, we first specify the license of the code using the MIT license, which allows anyone to use, copy, modify, merge, publish, distribute, sublicense, and/or sell the software.

Next, we specify the Solidity version that the code is compatible with using the "pragma" statement. This ensures that the code is compiled using the correct version of Solidity.

We then import the SafeMath library from the OpenZeppelin contract library using the "import" statement. The SafeMath library provides safe arithmetic operations to prevent overflow and underflow errors in the contract, which can cause security vulnerabilities in smart contracts.

```solidity
interface IERC20Token {
   function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}
```

In this Solidity code, we have defined an interface for an ERC20 token on the Celo blockchain. When we create an interface in Solidity, we are essentially creating a blueprint that specifies how external contracts should interact with our contract.

In this particular interface, we have defined six key functions that any Celo ERC20 token contract should implement. These functions include "transfer", "approve", and "transferFrom", which enable users to transfer tokens to other addresses, authorize other addresses to spend tokens on their behalf, and move tokens from one address to another.

In addition to these six functions, we have also defined three functions that provide information about a Celo ERC20 token contract. These functions include "totalSupply", "balanceOf", and "allowance", which allow users to retrieve data on the total supply of tokens, the balance of tokens held by a specific address, and the amount of tokens authorized for spending by a particular address.

Finally, we have also included two events in this code, which are triggered when a token transfer or approval occurs. These events enable external applications to receive notifications when a token transfer or approval happens on the Celo blockchain, which can be useful for building more complex applications that depend on real-time information about token transactions.

```solidity
contract PredictionMarket {
    
    using SafeMath for uint;

    uint internal numContracts = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct Contract {
        address payable creator;
        string description;
        uint endTimestamp;
        uint yesShares;
        uint noShares;
        uint price;
        bool resolved;
        bool outcome;
    }
```

This code defines a smart contract called `PredictionMarket`. In this contract, we are using the SafeMath library, which provides secure mathematical operations to prevent overflow and underflow errors.

We have also defined two global variables. The first is "numContracts", which keeps track of the number of prediction contracts created by the contract. The second is "cUsdTokenAddress", which is the address of the cUSD token contract on the Celo blockchain.

Next, we have defined a struct called "Contract", which represents a prediction contract. This struct contains information about the creator of the contract, a description of the prediction, the end time for the prediction, the number of shares that were bought for the `yes` outcome, the number of shares bought for the `no` outcome, the price of each share, whether the contract has been resolved, and the outcome of the contract.

Using this struct, we can create new prediction contracts by calling the `createContract` function. This function takes in a description of the prediction, the end time for the prediction, and the price of each share.

When a user buys shares for a prediction contract, they call either the "buyYesShares" or "buyNoShares" function, depending on the outcome they are betting on. These functions update the `yesShares` or `noShares` variables in the Contract struct, as well as transfer cUSD tokens from the buyer's account to the contract creator's account.

Once the end time for a prediction contract has passed, the creator of the contract can call the `resolveContract` function. This function calculates the outcome of the prediction based on the number of shares bought for each outcome, and updates the `resolved` and `outcome` variables in the Contract struct accordingly.

Next, we add a `Mapping`

```solidity
   mapping(uint => Contract) internal contracts;
```

In the `PredictionMarket` contract, we have defined a mapping called `contracts`. A mapping is a data structure in Solidity that allows us to associate a key-value pair. In this case, the key is a unique unsigned integer, and the value is a "Contract" struct that we defined earlier.

Using this mapping, we can store information about each prediction contract created in the contract. The key for each mapping entry is the index of the prediction contract, and the value is the corresponding `Contract` struct.

For example, if we create a new prediction contract with index `0`, we can access its information by calling the `contracts[0]` mapping entry.

This allows us to keep track of multiple prediction contracts and access their information in a structured and efficient way. We can also update the information for a specific prediction contract by updating the corresponding mapping entry.

To add more functionality to our smart contract, we will be implementing various functions. The first function we will add is called `createContract`.

```solidity
  function createContract(
        string memory _description,
        uint _endTimestamp,
        uint _price
    ) public {
        Contract storage newContract = contracts[numContracts];
        newContract.creator = payable(msg.sender);
        newContract.description = _description;
        newContract.endTimestamp = _endTimestamp;
        newContract.price = _price;
        newContract.resolved = false;
        newContract.outcome = false;
        numContracts++;
    }
```

The `createContract` function is a public function that anyone can call to create a new prediction contract in our `PredictionMarket` contract. The function takes three parameters: the `description` of the `prediction`, the `timestamp` for when the prediction will end, and the `price` of the prediction.

In the function, we first create a new `Contract` struct and store it in the `contracts` mapping with a unique index number equal to the current value of `numContracts`. We then increment `numContracts` to ensure that each new prediction contract gets a unique index number.

We then set the properties of the new `Contract` struct using the function parameters and some default values. Specifically, we set the creator of the prediction contract to be the address of the person who called the function using `msg.sender`, the description of the prediction to be the string provided as a parameter, the end timestamp for the prediction, the price of the prediction, and some default values for the `resolved` and `outcome` properties.
