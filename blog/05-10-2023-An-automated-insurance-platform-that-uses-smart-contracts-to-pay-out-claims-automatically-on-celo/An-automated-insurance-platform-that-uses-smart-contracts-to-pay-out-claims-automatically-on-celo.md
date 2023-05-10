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
slug: /tutorials/an-automated-insurance-platform-that-uses-smart-contracts-to-pay-out-claims-automatically-on-celo
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

## Step 7: Creating a New Insurance Policy

``` function createPolicy(
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
```

We collaboratively create a new insurance policy using the createPolicy function.

- Inputs: We provide the insurer's address, `premium amount`, `coverage amount`, and `expiration date`.

- Validation: We check the inputs for validity, ensuring the insurer's address is not invalid, the premium amount is greater than zero, the coverage amount is greater than zero, and the expiration date is in the future.

- Policy Creation: If the inputs pass validation, we create a new policy:

We assign the insured address as the caller of the function.
We set the insurer address, `premium amount`, `coverage amount`, `expiration date`, `isActive` flag as `true`, and `isClaimed` flag as `false`.

- Event Emission: We emit the `PolicyCreated` event, providing the policy details as event arguments.

- Policy Count: We increment the `policyCount` to keep track of the total number of policies created.

## Step 8: Claiming an Insurance Policy.

```solidity
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
```

In this step, we focus on claiming an insurance policy using the `claimPolicy` function.

- Input Validation: We ensure that the provided policy `ID` is valid by checking if it is less than the total `policyCount`.

- Policy Retrieval: We retrieve the policy details from the policies mapping based on the given policy ID.

- Permission and Policy Checks:

Only the insured party can claim the policy, so we verify that the caller of the function is the insured address stored in the policy.
We check that the policy is active by examining the `isActive` flag.

The policy must not have been previously claimed, confirmed by the isClaimed flag.
Additionally, we check if the policy has expired by comparing the current timestamp to the expiration date.
Claim Process:

If all the checks pass, we proceed to mark the policy as claimed by setting the `isClaimed` flag to `true`.
Transfer of Claim Amount:

We transfer the claim amount, which is equal to the coverage amount specified in the policy, to the insured party using the CELO token contract's transfer function.

**Event Emission**:

We emit the `PolicyClaimed` event, providing the policy ID, insured address, and the claimed amount as event arguments.
Following these steps, the insured party can successfully claim their insurance policy if it meets the necessary conditions. The claimed amount will be transferred to the insured, and the policy will be marked as claimed for future reference.

## Step 9: Retrieving Policy Details

```solidity
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
```

In this step, we will explain the `getPolicy` function, which allows us to retrieve the details of an insurance policy based on its policy ID. This function is designed to provide transparency and enable users to access important policy information.

**Input Validation**:

We ensure that the provided policy ID is valid by checking if it is less than the total `policyCount`.

**Policy Retrieval**:

We access the desired policy by using the policy ID as the index in the policies mapping.
We store the policy details in the local policy variable using the storage keyword, allowing direct access to the storage location.

**Returning Policy Details**:

We return the policy details as a tuple, including the insured address, `insurer address`, `premium amount`, `coverage amount`, `expiration date`, `isActive` flag indicating if the policy is active, and `isClaimed` flag indicating if the policy has been claimed.
By utilizing the `getPolicy` function, users can easily retrieve the details of an insurance policy by providing the policy ID. This enables efficient policy verification, auditing, or displaying the policy information to users.

## Step 9: Getting the Total Policy Count

```solidity
 function getPolicyCount() public view returns (uint) {
        return policyCount;
    }
}
```

In this final step, we will explain the `getPolicyCount` function, which allows us to retrieve the total number of insurance policies created on the platform. This function provides a simple way to obtain an overview of the policy count.

**Policy Count Retrieval**:

The `getPolicyCount` function is a public view function, meaning it can be called by anyone and does not modify the contract's state.
The function directly returns the value of the policyCount variable, which represents the total number of insurance policies created.

**Returning the Policy Count**:

Upon calling the `getPolicyCount` function, it returns the total policy count as an unsigned integer.
By utilizing the `getPolicyCount` function, we can easily retrieve the total number of insurance policies created on the platform. This information can be used for statistical analysis, displaying the count to users, or for any other purpose that requires knowledge of the total policy count.

## Contract deployment

To deploy the Magazine smart contract on the Celo blockchain, follow the steps below:

- **Install Celo Extension Wallet**: Download and install the Celo Extension Wallet from the Google Chrome store. Create a wallet and securely store your key phrase.

- **Fund your wallet**: Copy your wallet address and paste it into the Celo Faucet. Confirm the transaction to receive Celo tokens in your wallet.

- **Open Remix and create a new Solidity file**: Paste the insurance contract code into the file. Ensure that the Solidity compiler is set to version 0.8.7 or later.

- **Compile the contract**: Click the `Compile issurance.sol` button in the Solidity Compiler tab in Remix.

- **Deploy the contract**: In the `Deploy & Run Transactions` tab, select the Celo network from the dropdown menu. Connect your wallet to Remix by clicking `Connect to wallet`. Select `insurance` from the `Contract` dropdown menu. Click the `Deploy` button, confirm the transaction in your wallet, and wait for the transaction to be confirmed on the Celo blockchain.

- **Interact with the contract**: Once the transaction is confirmed, the `insurance` contract will be deployed on the Celo blockchain. You can interact with it using Remix.

## Conclusion

In conclusion, we have explored the key functions and steps involved in creating and managing insurance policies within the insurance platform. We started by setting up the platform, defining dependencies, and initializing the necessary components. Then, we covered the steps for creating a new policy, verifying inputs, and emitting events for transparency. We also discussed the process of claiming a policy and transferring the claim amount to the insured. Additionally, we included functions for retrieving policy details and obtaining the total policy count.

By following these steps and utilizing the provided functions, users can interact with the insurance platform to create policies, manage claims, and access policy information. The platform offers transparency, security, and automation through smart contracts, streamlining the insurance process.

## Next step

Great job! It's always helpful to provide additional resources for further learning. Don't hesitate to reach out if you have any more questions or if you need further assistance. Happy learning!

## About the author

My name is Ogoyi Thompson, and I'm a web3 developer based in Nigeria, you can connect with me on [twitter](https://twitter.com/thompsonogoyi). I am enthusiastic about working with blockchain technology.