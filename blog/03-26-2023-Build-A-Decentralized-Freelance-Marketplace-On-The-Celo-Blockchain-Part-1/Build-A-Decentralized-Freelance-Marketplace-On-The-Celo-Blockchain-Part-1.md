---
title: Build A Decentralized Freelancer Marketplace On The Celo Blockchain Part 1
description: In this tutorial, we will build a freelancer marketplace where people can find freelancers for their projects.
authors:
  - name: ✍️ Jonathan Iheme
    url: https://github.com/4undRaiser
    image_url: https://avatars.githubusercontent.com/u/87926451?s=96&v=4
tags: [celosage, solidity, celo, intermediate]
hide_table_of_contents: true
slug: "/tutorials/build-a-decentralized-freelancer-marketplace-on-the-celo-blockchain-part-1"
---

![header](../../src/data-tutorials/showcase/intermediate/build-a-decentralized-freelancer-marketplace-on-the-celo-blockchain-part-1.png)

## Introduction

In this tutorial, we will explore a simple Freelancer Marketplace Smart Contract built on the Celo network using Solidity. The contract allows freelancers to create profiles, change their price and description, and toggle their availability. Clients can hire freelancers and pay them in cUSD ERC20 tokens.

This is a two part tutorial. In this first part, we will look at the smart coontract and in the second part we will cover the front-end of the application.

## Prerequisites

To follow this tutorial, you will need the following:

- Basic knowledge of Solidity programming language.
- A Development Environment Like Remix.
- The celo Extension Wallet.

## SmartContract

Let's begin writing our smart contract in Remix IDE

The completed code Should look like this.

```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity >=0.7.0 <0.9.0;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract FreelancerMarketplace {
    uint private freelancerLength = 0;
    address internal cUsdTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct Freelancer {
        address freelancerAddress;
        string image;
        string name;
        string title;
        string description;
        uint price;
        uint noOfJobs;
        bool available;
    }

    mapping(uint => Freelancer) internal freelancers;

    modifier onlyFreelancer(uint _index) {
        require(freelancers[_index].freelancerAddress == msg.sender);
        _;
    }

    function newFreelancer(
        string memory _image,
        string memory _name,
        string memory _title,
        string memory _description,
        uint _price
    ) public {
        freelancers[freelancerLength] = Freelancer(
            msg.sender,
            _image,
            _name,
            _title,
            _description,
            _price,
            0,
            true
        );
        freelancerLength++;
    }

    function getFreelancers(
        uint _index
    )
        public
        view
        returns (
            address,
            string memory,
            string memory,
            string memory,
            string memory,
            uint,
            uint,
            bool
        )
    {
        Freelancer memory freelancer = freelancers[_index];
        return (
            freelancer.freelancerAddress,
            freelancer.image,
            freelancer.name,
            freelancer.title,
            freelancer.description,
            freelancer.price,
            freelancer.noOfJobs,
            freelancer.available
        );
    }

    function changePrice(
        uint _index,
        uint _newPrice
    ) public onlyFreelancer(_index) {
        freelancers[_index].price = _newPrice;
    }

    function changeDescription(
        uint _index,
        string memory _newDescription
    ) public onlyFreelancer(_index) {
        freelancers[_index].description = _newDescription;
    }

    function toggleAvailable(uint _index) public onlyFreelancer(_index) {
        freelancers[_index].available = !freelancers[_index].available;
    }

    function hireFreelancerHourly(uint _index, uint _hours, uint _amount) public {
        require(_hours > 0, "Hours must be greater than 0");
        require(
            IERC20(cUsdTokenAddress).transferFrom(
                msg.sender,
                freelancers[_index].freelancerAddress,
                _amount
            ),
            "Transfer failed."
        );
        freelancers[_index].available = false;
        freelancers[_index].noOfJobs++;
    }

    function getFreelancersLength() public view returns (uint) {
        return (freelancerLength);
    }
}
```

### Setting up

First, we declared our license and the solidity version.

```solidity
// SPDX-License-Identifier: MIT
   pragma solidity >=0.7.0 <0.9.0;
```

The next part of the code defines an interface called `IERC20`, which is a standard interface for `ERC20 tokens`. It defines three functions: `balanceOf()`, `transfer()`, and `transferFrom()`.

And then we defined our smart contract `FreelancerMarketplace`.

```solidity
interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract FreelancerMarketplace {
    // Contract state variables and methods
}
```

### Defining the Freelancer struct:

```solidity
   struct Freelancer {
    address freelancerAddress;
    string image;
    string name;
    string title;
    string description;
    uint price;
    uint noOfJobs;
    bool available;
}
```

We define a struct named `Freelancer` to store freelancer data, including their Celo address, image, name, title, description, price per hour, the number of jobs they've completed, and their availability status.

### Declaring state variables:

```solidity
uint private freelancerLength = 0;
address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
mapping(uint => Freelancer) internal freelancers;
```

### We declare three state variables:

`freelancerLength`: To track the number of freelancers in the marketplace.
`cUsdTokenAddress`: The address of the ERC20 token contract that will be used for payments. In this case, we've set it to a cUSD token address.
`freelancers`: A mapping that associates a uint index with a Freelancer struct.

### Defining the onlyFreelancer modifier:

```solidity
modifier onlyFreelancer(uint _index) {
    require(freelancers[_index].freelancerAddress == msg.sender);
    _;
}
```

This modifier checks if the sender of the transaction is the freelancer at the specified index in the mapping. It is used to protect certain functions that only freelancers should be able to call.

### Adding a new freelancer:

```solidity
function newFreelancer(
    string memory _image,
    string memory _name,
    string memory _title,
    string memory _description,
    uint _price
) public {
    freelancers[freelancerLength] = Freelancer(
        msg.sender,
        _image,
        _name,
        _title,
        _description,
        _price,
        0,
        true
    );
    freelancerLength++;
}
```

The `newFreelancer` function allows users to create a freelancer profile by providing their image, name, title, description, and price. The function stores this data in the `freelancers` mapping and increments the `freelancerLength`.

### Viewing freelancer profiles:

```solidity
 function getFreelancers(
        uint _index
    )
        public
        view
        returns (
            address,
            string memory,
            string memory,
            string memory,
            string memory,
            uint,
            uint,
            bool
        )
    {
        Freelancer memory freelancer = freelancers[_index];
        return (
            freelancer.freelancerAddress,
            freelancer.image,
            freelancer.name,
            freelancer.title,
            freelancer.description,
            freelancer.price,
            freelancer.noOfJobs,
            freelancer.available
        );
    }
```

The `getFreelancers` function allows anyone to view a freelancer's profile by providing the freelancer's index in the mapping. It returns the freelancer's Celo address, image, name, title, description, price, the number of jobs they've completed, and their availability status.

### Updating freelancer profile information:

```solidity
function changePrice(uint _index, uint _newPrice) public onlyFreelancer(_index) {
    freelancers[_index].price = _newPrice;
}

function changeDescription(uint _index, string memory _newDescription) public onlyFreelancer(_index) {
    freelancers[_index].description = _newDescription;
}
```

These functions allow a freelancer to update their price and description. The `onlyFreelancer` modifier ensures that only the freelancer associated with the specified index can call these functions.

### Toggling freelancer availability:

```solidity
function toggleAvailable(uint _index) public onlyFreelancer(_index) {
    freelancers[_index].available = !freelancers[_index].available;
}
```

The `toggleAvailable` function lets a freelancer toggle their availability status. The `onlyFreelancer` modifier protects this function as well.

### Hiring a freelancer:

```solidity
function hireFreelancerHourly(uint _index, uint _hours, uint _amount) public {
    require(_hours > 0, "Hours must be greater than 0");
    require(
        IERC20(cUsdTokenAddress).transferFrom(
            msg.sender,
            freelancers[_index].freelancerAddress,
            _amount
        ),
        "Transfer failed."
    );
    freelancers[_index].available = false;
    freelancers[_index].noOfJobs++;
}
```

The `hireFreelancerHourly` function enables clients to hire a freelancer for a specified number of hours and pay them accordingly. The function checks if the number of hours is greater than 0 and transfers the specified amount of tokens from the client's address to the freelancer's address using the ERC20 `transferFrom` method. The freelancer's availability is then set to false, and the number of jobs they've completed is incremented.

### Getting the number of freelancers:

```solidity
function getFreelancersLength() public view returns (uint) {
    return (freelancerLength);
}
```

The `getFreelancersLength` function returns the total number of freelancers in the marketplace.

## Deployment

To deploy our smart contract successfully, we need the celo extention wallet which can be downloaded from [here](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en)

Next, we need to fund our newly created wallet which can done using the celo alfojares faucet [Here](https://celo.org/developers/faucet)

You can now fund your wallet and deploy your contract using the celo plugin in remix.

## Conclusion

In this tutorial, we examined a basic Freelancer Marketplace Smart Contract, which demonstrates how to create, update, and view freelancer profiles, as well as hire freelancers using cUSD ERC20 token for payment. This contract serves as a foundation for building more advanced and feature-rich decentralized freelancer marketplaces.

## Next Steps

I hope you learned a lot from this tutorial. Here are some relevant links that would aid your learning further.

- [Celo Docs](https://docs.celo.org/)
- [Solidity Docs](https://docs.soliditylang.org/en/v0.8.17/)
- [Source Code](https://github.com/4undRaiser/celo-freelancer-marketplace)

## About the author

I'm Jonathan Iheme, A full stack block-chain Developer from Nigeria.

Thank You!!
