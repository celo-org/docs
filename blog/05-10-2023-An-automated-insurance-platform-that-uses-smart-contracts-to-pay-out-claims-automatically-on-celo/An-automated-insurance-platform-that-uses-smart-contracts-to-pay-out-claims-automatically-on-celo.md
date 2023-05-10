---
title: An automated insurance platform that uses smart contracts to pay out claims automatically on celo
description: The project is an automated insurance platform on Celo using smart contracts. It streamlines policy creation and claim payouts, simplifying insurance processes for users.
authors:
  - name: Ogoyi Thompson
    title: Technical Writer
    url: https://github.com/Ogoyi
    image_url: https://avatars.githubusercontent.com/u/115812158?v=4
tags: [celosage, solidity, intermediate, celo]
hide_table_of_contents: true
slug: /tutorials/a-decentralized-social-network-that-rewards-users-for-their-content-and-participation-on-the-celo-blockchain
---

## INTRODUCTION

Welcome to this tutorial on building an automated insurance platform on Celo! In this project, we will leverage the power of smart contracts to create a decentralized insurance platform. Users will be able to create insurance policies, specify policy details such as premium and coverage, and even automate claim payouts.

By following this tutorial, you will learn how to utilize smart contracts to handle policy creation, manage policy expiration dates, and automate claim payouts on the Celo network. We will cover concepts such as contract structure, policy creation, policy management, and claim processing.

With this automated insurance platform, we aim to revolutionize the insurance industry by eliminating intermediaries and streamlining the claim process. So let's get started and dive into the world of decentralized insurance on Celo!

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

    function transferFrom(address, address, uint256) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract InsurancePlatform {
    using SafeMath for uint256;

    uint internal policyCount = 0;
    address internal celoTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct Policy {
        address payable insured;
        address payable insurer;
        uint256 premium;
        uint256 coverage;
        uint256 expirationDate;
        bool isActive;
        bool isClaimed;
    }

    mapping(uint => Policy) internal policies;

    event PolicyCreated(
        uint indexed policyId,
        address indexed insured,
        address indexed insurer,
        uint256 premium,
        uint256 coverage,
        uint256 expirationDate
    );

    event PolicyClaimed(uint indexed policyId, address indexed insured, uint256 claimAmount);

    function createPolicy(
        address payable _insurer,
        uint256 _premium,
        uint256 _coverage,
        uint256 _expirationDate
    ) external {
        require(_insurer != address(0), "Invalid insurer address");
        require(_premium > 0, "Premium must be greater than zero");
        require(_coverage > 0, "Coverage amount must be greater than zero");
        require(_expirationDate > block.timestamp, "Expiration date must be in the future");

        Policy storage newPolicy = policies[policyCount];
        newPolicy.insured = payable(msg.sender);
        newPolicy.insurer = _insurer;
        newPolicy.premium = _premium;
        newPolicy.coverage = _coverage;
        newPolicy.expirationDate = _expirationDate;
        newPolicy.isActive = true;
        newPolicy.isClaimed = false;

        emit PolicyCreated(
            policyCount,
            newPolicy.insured,
            newPolicy.insurer,
            newPolicy.premium,
            newPolicy.coverage,
            newPolicy.expirationDate
        );

        policyCount++;
    }

    function claimPolicy(uint _policyId) external {
        require(_policyId < policyCount, "Invalid policy ID");

        Policy storage policy = policies[_policyId];
        require(msg.sender == policy.insured, "Only the insured can claim the policy");
        require(policy.isActive, "Policy is not active");
        require(!policy.isClaimed, "Policy has already been claimed");
        require(block.timestamp > policy.expirationDate, "Policy has not expired yet");

        uint256 claimAmount = policy.coverage;
        policy.isClaimed = true;

        require(
            IERC20Token(celoTokenAddress).transfer(policy.insured, claimAmount),
            "Failed to transfer claim amount"
        );

        emit PolicyClaimed(_policyId, policy.insured, claimAmount);
    }

    function getPolicy(uint _policyId) public view returns (
        address payable insured,
        address
                payable insurer,
        uint256 premium,
        uint256 coverage,
        uint256 expirationDate,
        bool isActive,
        bool isClaimed
    ) {
        require(_policyId < policyCount, "Invalid policy ID");

        Policy storage policy = policies[_policyId];

        return (
            policy.insured,
            policy.insurer,
            policy.premium,
            policy.coverage,
            policy.expirationDate,
            policy.isActive,
            policy.isClaimed
        );
    }

    function getPolicyCount() public view returns (uint) {
        return policyCount;
    }
}

 ```

Code Analysis:

## Step 1: SPDX License Identifier.

 ```solidity
 // SPDX-License-Identifier: MIT
 ```

This line indicates the license under which the code is distributed. In this case, it is using the MIT license.

## Step 2: Solidity Version and Import.

```solidity
  pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

 ```

These lines specify the version of Solidity that the contract is compatible with and import the SafeMath library from the OpenZeppelin library. SafeMath provides mathematical operations with built-in overflow and underflow protection.

## Step 3: Interface Declaration

```solidity
interface IERC20Token {
    function transfer(address, uint256) external returns (bool);
    function approve(address, uint256) external returns (bool);
    function transferFrom(address, address, uint256) external returns (bool);
    function totalSupply() external view returns (uint256);
    function balanceOf(address) external view returns (uint256);
    function allowance(address, address) external view returns (uint256);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

```

Here, we define an interface called IERC20Token that represents the functions and events of an ERC20 token. This interface allows us to interact with ERC20 tokens in a standardized way.

## Step 4: Contract Declaration

```solidity
contract InsurancePlatform {
    using SafeMath for uint256;

```

We declare the `InsurancePlatform` contract and utilize the SafeMath library to perform secure mathematical operations with `uint256` integers.

## Step 5: State Variables and Struct Definition

```solidity
    uint internal policyCount = 0;
    address internal celoTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct Policy {
        address payable insured;
        address payable insurer;
        uint256 premium;
        uint256 coverage;
        uint256 expirationDate;
        bool isActive;
        bool isClaimed;
    }

```

Here, we define state variables for the contract. `policyCount` keeps track of the number of policies created, and `celoTokenAddress` stores the address of the Celo token we're using. We also define a Policy `struct` to represent an insurance policy, which holds various details such as the insured `address`, `insurer address`, `premium amount`, `coverage amount`, `expiration date`, and `flags for policy status and claims`.

## Step 6: Mapping and Events

```solidity
    mapping(uint => Policy) internal policies;

    event PolicyCreated(
        uint indexed policyId,
        address indexed insured,
        address indexed insurer,
        uint256 premium,
        uint256 coverage,
        uint256 expirationDate
    );

    event PolicyClaimed(uint indexed policyId, address indexed insured, uint256 claimAmount);

```

We use a mapping called `policies` to store and retrieve policies using their `IDs`. Additionally, we define two events: `PolicyCreated` and `PolicyClaimed`. These events are emitted to provide information about policy creation and claim actions.

