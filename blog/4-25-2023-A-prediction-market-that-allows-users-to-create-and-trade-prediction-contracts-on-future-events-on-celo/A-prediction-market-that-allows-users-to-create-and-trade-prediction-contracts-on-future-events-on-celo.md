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
