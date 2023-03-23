---
title: Decentralized Land Auction Smart Contract
description: The project aims to provide a decentralized platform for buying and selling land by allowing individuals to bid on available land parcels and purchase using cUSD
authors:
  - name: David Ikanji
    title: Technical Writer
    url: https://github.com/Ikanji201
    image_url: https://avatars.githubusercontent.com/u/115812158?v=4
tags: [solidity, intermediate, celo, celosage]
hide_table_of_contents: true
slug: /tutorials/Decentralized-land-auction-smart-contract
---

![header](https://user-images.githubusercontent.com/115812158/227044064-3e28fda8-f37b-4a06-ae6c-3951caeb4f20.png)

## Introduction

This tutorial will guide you through the process of creating a smart contract for a land auction on the Celo blockchain. You will learn about the concept of blockchain-based auctions and how to set up and utilize this type of application. By the end of this tutorial, you will have the knowledge and skills to develop and use your own Celo-based marketplace for conducting land auctions. Let's get started!

## Prerequisite:

Before starting this tutorial, make sure you have the following:

- A text or code editor like Remix to create and modify code.

- A stable internet connection and a reliable web browser to access required resources and communicate with the Celo blockchain.

## Requirement:

This tutorial assumes that you have a certain level of familiarity with certain topics before you begin. Specifically, it's recommended that you have a basic understanding of the following:

- JavaScript programming.

- Knowledge of blockchain technology and its operations

- Some basic knowledge of solidity

## What we will be building

In this tutorial, we will be building a smart contract for a land auction on the Celo blockchain. This contract will allow users to participate in blockchain-based auctions and create their own marketplace for conducting land auctions on the Celo blockchain.

The complete code:

```solidity
 // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

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

contract LandAuction {
  uint256 internal landsLength = 0;

  address internal cUsdTokenAddress =
      0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

  struct Land {
      address payable owner;
      string location;
      string description;
      uint256 price;
      uint256 sold;
      bool soldStatus;
      uint256 highestBid;
      address payable highestBidder;
      uint256 auctionEndTime;
  }
  mapping(uint256 => Land) private lands;

  mapping(uint256 => bool) private _exists;

  // check if a land with id of _index exists
  modifier exists(uint256 _index) {
      require(_exists[_index], "Query of a nonexistent land");
      _;
  }

  // checks if the input data for location and description are non-empty values
  modifier checkInputData(string calldata _location, string calldata _description) {
      require(bytes(_location).length > 0, "Empty location");
      require(bytes(_description).length > 0, "Empty description");
      _;
  }

  function addLand(
      string calldata _location,
      string calldata _description,
      uint256 _price,
      uint256 _auctionEndTime
  ) public checkInputData(_location, _description) {
      require(_auctionEndTime > block.timestamp, "Auction end time must be in the future");
      uint256 _sold = 0;
      uint256 index = landsLength;
      landsLength++;
      lands[index] = Land(
          payable(msg.sender),
          _location,
          _description,
          _price,
          _sold,
          false,
          0,
          payable(address(0)),
          _auctionEndTime
      );
      _exists[index] = true;
  }

  function readLand(uint256 _index) public view exists(_index) returns (Land memory) {
      return lands[_index];
  }


  function placeBid(uint256 _index) public payable exists(_index) {
      require(block.timestamp < lands[_index].auctionEndTime, "Auction has ended");
      require(msg.sender != lands[_index].owner, "Owner cannot place a bid");
      require(msg.value > lands[_index].highestBid, "Bid must be higher than the current highest bid");
      if (lands[_index].highestBid != 0) {
          // if there is already a highest bid, return the previous bid amount to the previous highest bidder
          require(lands[_index].highestBidder.send(lands[_index].highestBid), "Failed to return previous highest bid");
      }
      lands[_index].highestBid = msg.value;
      lands[_index].highestBidder = payable(msg.sender);
  }

 function buyLand(uint256 _index) public payable exists(_index) {
  require(lands[_index].auctionEndTime < block.timestamp, "Auction not ended");
  require(!lands[_index].soldStatus, "Land already sold");
  require(msg.sender != lands[_index].owner, "Owner cannot buy the land");

  if (lands[_index].highestBid > 0) {
      // transfer the highest bid amount to the previous owner
      require(IERC20Token(cUsdTokenAddress).transferFrom(msg.sender, lands[_index].owner, lands[_index].highestBid), "Transfer failed");
  } else {
      // transfer the price to the owner if there were no bids
      require(IERC20Token(cUsdTokenAddress).transferFrom(msg.sender, lands[_index].owner, lands[_index].price), "Transfer failed");
  }

  // update the land sold status and owner
  lands[_index].sold = lands[_index].highestBid > 0 ? lands[_index].highestBid : lands[_index].price;
  lands[_index].soldStatus = true;
  lands[_index].owner = payable(msg.sender);
}
function cancelAuction(uint256 _index) public exists(_index) {
   require(msg.sender == lands[_index].owner, "Only owner can cancel auction");
   require(!lands[_index].soldStatus, "Land has already been sold");
   if (lands[_index].highestBid != 0) {
       require(lands[_index].highestBidder.send(lands[_index].highestBid), "Failed to return highest bid");
   }
   lands[_index].auctionEndTime = block.timestamp; // set auction end time to current time to end auction
}

}

```

You can follow or use this project as a reference to edit yours and get the required files, images e.t.c [by clicking this link](https://github.com/Ikanji201/LandAuction)

To get started, you should create a new file on Remix called `LandAuction.sol`. The process of creating a new file on Remix can be found in the documentation, which you can refer to for guidance.[(click here)](https://remix-ide.readthedocs.io/en/latest/file_explorer.html#:~:text=Creating%20new%20files,-There%20are%202&text=The%20first%20is%20to%20click,will%20open%20in%20the%20Editor.).

After successfully creating the new file, the following step would be to specify some statements in our smart contract.

```solidity
 // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
```

In the provided code, we use the statement `SPDX-License-Identifier`: MIT to indicate that the code is licensed under the MIT License. This is achieved through the use of the SPDX (Software Package Data Exchange) identifier, which is a standard method of identifying open-source licenses.

The next line specifies the version of the Solidity programming language that our smart contract is written in. It is crucial to specify the correct version because different versions of Solidity may have distinct features and syntax, affecting the intended behavior of our code. For this particular contract, we use version 0.7.0 or later, but not beyond 0.9.0.

Afterward, we add the interface for our ERC20 token to the smart contract.

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
```

The code above presents the interface for an ERC20 token in our smart contract. The interface specifies the functions that the ERC20 token must implement, which our smart contract will interact with.

- `transfer`: transfers tokens from the sender's account to another account.

- `approve`: approves a specific account to withdraw tokens from the sender's account.

- `transferFrom`: allows the approved account to transfer tokens from the sender's account.

- `totalSupply`: returns the total amount of tokens in existence.

- `balanceOf`: returns the balance of tokens in a specific account.

- `allowance`: returns the remaining number of tokens that an approved account can transfer from another account.

- `Transfer event`: emitted when tokens are successfully transferred from one account to another.

- `Approval event`: emitted when an approval event occurs, indicating that one account is authorized to withdraw from another account.

By including this interface, we enable our smart contract to interact with any ERC20 token that implements these functions. This means that our smart contract can transfer, approve, and transferFrom tokens for any ERC20 token that follows this standard.

Next, we will name our smart contract and declare a new structure.

```solidity
contract LandAuction {
   uint256 internal landsLength = 0;

   address internal cUsdTokenAddress =
       0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

   struct Land {
       address payable owner;
       string location;
       string description;
       uint256 price;
       uint256 sold;
       bool soldStatus;
       uint256 highestBid;
       address payable highestBidder;
       uint256 auctionEndTime;
   }
```

In the provided code, we declare a smart contract named `LandAuction`. Within the smart contract, we define a new struct called `Land`, which has the following properties:

- `owner`: the address of the current owner of the land, which is of type address payable.

- `location`: a string that describes the location of the land.

- `description`: a string that provides a description of the land.
- `price`: the initial price set by the owner for the land, of type uint256.

- `sold`: the amount of the land that has been sold, of type uint256.

- `soldStatus`: a boolean value that indicates whether the land has been sold or not.

- `highestBid`: the highest bid for the land, of type uint256.

- `highestBidder`: the address of the highest bidder for the land, which is of type address payable.

- `auctionEndTime`: the timestamp when the auction for the land ends, of type uint256.

By defining this structure, we establish a blueprint for how we will store and track information about the land in our auction system. This will allow us to keep track of important information about each land listing and manage the auction process effectively.

Next, we add our mapping and modifiers

```solidity
 mapping(uint256 => Land) private lands;

   mapping(uint256 => bool) private _exists;

   // check if a land with id of _index exists
   modifier exists(uint256 _index) {
       require(_exists[_index], "Query of a nonexistent land");
       _;
   }

   // checks if the input data for location and description are non-empty values
   modifier checkInputData(string calldata _location, string calldata _description) {
       require(bytes(_location).length > 0, "Empty location");
       require(bytes(_description).length > 0, "Empty description");
       _;
   }
```

In this code, we define two mappings:

- `lands`: a private mapping that maps a `uint256 ID` to a Land struct object. This mapping will be used to keep track of all the lands that are being auctioned.

- `_exists`: a private mapping that maps a `uint256 ID` to a boolean value indicating whether the land with the corresponding ID `exists`. This mapping is used to ensure that we are only accessing and modifying lands that actually exist in our contract.

Additionally, we define two modifiers:

- `exists`: a modifier that checks whether a land with a given ID exists in our system. If the land does not exist, the modifier throws an error.

- `checkInputData`: a modifier that checks whether the input data for the location and description of a new land listing are non-empty strings. If either string is empty, the modifier throws an error.

These mappings and modifiers are crucial components of our smart contract as they help us manage the land auction process and ensure that our system is working as intended.

We will enhance the functionality of our smart contract by defining some functions. The initial function that we will define is named addLand().

```solidity
 function addLand(
       string calldata _location,
       string calldata _description,
       uint256 _price,
       uint256 _auctionEndTime
   ) public checkInputData(_location, _description) {
       require(_auctionEndTime > block.timestamp, "Auction end time must be in the future");
       uint256 _sold = 0;
       uint256 index = landsLength;
       landsLength++;
       lands[index] = Land(
           payable(msg.sender),
           _location,
           _description,
           _price,
           _sold,
           false,
           0,
           payable(address(0)),
           _auctionEndTime
       );
       _exists[index] = true;
   }
```

We will now define the `addLand()` function in our smart contract. This function will take input parameters such as the `location`, `description`, `price` in cUsd, and `auction end time` for a particular land. The function ensures that the auction end time is set in the future and creates a new Land object with the specified parameters. The object is then added to the lands mapping at the next available `index`, and the `_exists` mapping is updated to mark the index as occupied.

In addition to the `addLand()` function, we will also define a `readLand()` function.

```solidity
  function readLand(uint256 _index) public view exists(_index) returns (Land memory) {
       return lands[_index];
   }
```

The `readLand` function is a view function, meaning that it does not modify the state of the contract and it is free to call. Its purpose is to allow anyone to read the details of a particular land that has been added to the marketplace.

The function takes one parameter `_index`, which is the index of the land in the lands mapping. It first checks if the land `exists` by using the `exists modifier`, which ensures that the specified index corresponds to a land that has been added to the marketplace.

If the land exists, the function returns the details of the land as a Land struct. This includes the `owner's address`, the `location` and `description` of the land, the `price`, whether or not it has been `sold`, the `highest bid`, the `address of the highest bidder`, and the `auction end time`.

By using the readLand function, anyone can query the details of a land without having to interact with the contract in any other way.

Next, we will add the `buyLand` function and the `placeBid` function, which will enable users to purchase a land and place bid for a land.

```solidity
function placeBid(uint256 _index) public payable exists(_index) {
       require(block.timestamp < lands[_index].auctionEndTime, "Auction has ended");
       require(msg.sender != lands[_index].owner, "Owner cannot place a bid");
       require(msg.value > lands[_index].highestBid, "Bid must be higher than the current highest bid");
       if (lands[_index].highestBid != 0) {
           // if there is already a highest bid, return the previous bid amount to the previous highest bidder
           require(lands[_index].highestBidder.send(lands[_index].highestBid), "Failed to return previous highest bid");
       }
       lands[_index].highestBid = msg.value;
       lands[_index].highestBidder = payable(msg.sender);
   }

  function buyLand(uint256 _index) public payable exists(_index) {
   require(lands[_index].auctionEndTime < block.timestamp, "Auction not ended");
   require(!lands[_index].soldStatus, "Land already sold");
   require(msg.sender != lands[_index].owner, "Owner cannot buy the land");

   if (lands[_index].highestBid > 0) {
       // transfer the highest bid amount to the previous owner
       require(IERC20Token(cUsdTokenAddress).transferFrom(msg.sender, lands[_index].owner, lands[_index].highestBid), "Transfer failed");
   } else {
       // transfer the price to the owner if there were no bids
       require(IERC20Token(cUsdTokenAddress).transferFrom(msg.sender, lands[_index].owner, lands[_index].price), "Transfer failed");
   }

   // update the land sold status and owner
   lands[_index].sold = lands[_index].highestBid > 0 ? lands[_index].highestBid : lands[_index].price;
   lands[_index].soldStatus = true;
   lands[_index].owner = payable(msg.sender);
}
```

The `placeBid` function allows users to place a bid on a particular land. Here's how it works:

- It first checks if the auction for the land has not ended yet by comparing the current block timestamp to the auction end time.

- It then checks that the person placing the bid is not the owner of the land.

- It also checks that the bid being placed is higher than the current highest bid for the land.

- If there is already a highest bid, it returns the previous bid amount to the previous highest bidder.

Finally, it updates the highest bid and highest bidder for the land.

The `buyLand` function allows users to buy a particular land. Here's how it works:

- It first checks if the auction for the land has already ended by comparing the current block timestamp to the auction end time.

- It then checks that the land has not already been sold.

- It also checks that the person buying the land is not the current owner of the land.

- If there was a highest bid placed on the land, it transfers the highest bid amount from the buyer to the previous owner of the land.

- If there were no bids, it transfers the price of the land from the buyer to the owner of the land.

Finally, it updates the sold status, sold price, and owner of the land.

Another function that we will add to the contract is called `cancelAuction`. This function allows the land owner to cancel an ongoing auction and returns the highest bid (if any) back to the `highest bidder`.

```solidity
function cancelAuction(uint256 _index) public exists(_index) {
    require(msg.sender == lands[_index].owner, "Only owner can cancel auction");
    require(!lands[_index].soldStatus, "Land has already been sold");
    if (lands[_index].highestBid != 0) {
        require(lands[_index].highestBidder.send(lands[_index].highestBid), "Failed to return highest bid");
    }
    lands[_index].auctionEndTime = block.timestamp; // set auction end time to current time to end auction
}

}
```

The `cancelAuction` function is used to cancel an ongoing auction for a land.

The `cancelAuction`, allows the owner of a piece of land to cancel an ongoing auction for that land. The function takes in a parameter \_index, which is the index of the land in the lands array that the owner wants to cancel the auction for.

The first line of the function checks that the land at the given index exists, which is done through the exists modifier. If the land does not exist, the function will revert.

The next line requires that the caller of the function is the owner of the land being auctioned. If the caller is not the owner, the function will revert with an error message.

The third line checks that the land has not already been sold. If the land has been sold, the function will revert with an error message.

If the highest bid for the land is not 0 (i.e., there have been bids on the land), the fourth line of the function transfers the highest bid amount back to the highest bidder. If this transfer fails for some reason, the function will revert with an error message.

Finally, the function sets the auctionEndTime for the land to the current block timestamp, effectively ending the auction.

In summary, this function allows the owner of a piece of land to cancel an ongoing auction for that land, returning the highest bid to the highest bidder if there was one.

## Contract Deployment

Before deploying our smart contract on the Celo blockchain, we need to ensure that certain requirements are met. These requirements may include tasks such as compiling our smart contract code into bytecode, testing the code to ensure it functions as intended, configuring the deployment parameters such as the gas limit and network ID, setting up a wallet to hold the funds needed for deployment, and ensuring that our development environment is properly configured to connect to the desired blockchain network.

To guarantee a seamless deployment of our smart contract, it is crucial to obtain the Celo extension wallet by following the link provided. [Celo Extension wallet](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en)

After downloading the Celo extension wallet, the next step would be to add funds to the wallet to pay for the gas fees required to deploy the smart contract. [Celo faucet](https://faucet.celo.org/). This can be accomplished by accessing the Celo Alfojares faucet using the provided link.

After verifying that our wallet has sufficient funds, we can use the Celo plugin available in the Remix environment to deploy our smart contract on the Celo blockchain.

## Conclusion

Well done on creating the smart contract for auctioning lands on the Celo blockchain! It's a remarkable achievement, and you should feel proud of the effort you put in. Keep up the great work and enjoy the rewards of your dedication! 🎉

## Next step

I hope you found this tutorial informative and gained valuable knowledge from it. If you wish to continue expanding your skills and knowledge, I have compiled some helpful links below that you may find useful to explore further:

[the official Celo documentation](https://docs.celo.org/)

[Solidity By Example, a website with code examples for learning Solidity](https://solidity-by-example.org/)

[OpenZeppelin Contracts, a library of secure, tested smart contract code](https://www.openzeppelin.com/contracts/)

[Solidity documentation for version 0.8.17](https://docs.soliditylang.org/en/v0.8.17/)

I hope these resources prove to be useful to you!

## About the author

I'm David Ikanji, a web3 developer residing in Nigeria, and I have a strong passion for working with blockchain technology.
