---
title: Build A Decentralized Real Estate Marketplace On The Celo Blockchain Part 1
description: This is a two part tutorial. In this tutorial you will learn how to Build a real estate smart contract using solidity for the smart contract and in the part two, we will build the front end for the smart contract using react js.
authors:
  - name: Jonathan Iheme
    url: https://github.com/4undRaiser
    image_url: https://avatars.githubusercontent.com/u/87926451?s=96&v=4
tags: [celosage, solidity, celo, intermediate]
hide_table_of_contents: true
slug: /tutorials/build-a-decentralized-real-estate-marketplace-on-the-celo-blockchain-part-1
---

![header](../../src/data-tutorials/showcase/advanced/build-a-decentralized-real-estate-marketplace-on-the-celo-blockchain-part-1.png)

## Introduction

In this tutorial, we will go through a Solidity smart contract that represents a Real Estate Marketplace where properties can be registered, put up for sale, and purchased using Celo cUSD cryptocurrency. This contract is built using the OpenZeppelin library which provides pre-built Solidity contracts for secure smart contract development. The contract implements the ERC-721 standard for non-fungible tokens (NFTs) and uses the Ownable and Pausable contracts for additional security and control.

You can find the repository for this tutorial [Here](https://github.com/4undRaiser/Celo-Tutorials/tree/main/Real-Estate-Marketplace)

## Prerequisites

To follow this tutorial, you will need the following:

- Basic understanding of Solidity and smart contracts.
- A Development Environment Like Remix.
- Familiarity with the OpenZeppelin library
- The celo Extension Wallet.

## Contract Developement

The complete code contract look like this

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

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

contract RealEstateMarketplace is ERC721, Ownable, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Property {
        uint256 id;
        string location;
        uint256 price;
        address payable owner;
        bool forSale;
    }

    mapping(uint256 => Property) public properties;

    event PropertyRegistered(uint256 indexed tokenId);
    event PropertyPurchased(uint256 indexed tokenId, address indexed buyer);
    event PropertyUpdated(uint256 indexed tokenId);
    event PropertyWithdrawn(uint256 indexed tokenId);

    constructor() ERC721("RealEstateMarketplace", "REMP") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function registerProperty(string memory location, uint256 price) public whenNotPaused {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();

        _mint(msg.sender, tokenId);

        Property memory newProperty = Property(
            tokenId,
            location,
            price,
            payable(msg.sender),
            true
        );
        properties[tokenId] = newProperty;

        emit PropertyRegistered(tokenId);
    }

    function buyProperty(uint256 tokenId) public payable whenNotPaused {
        Property storage property = properties[tokenId];

        require(property.forSale, "Property is not for sale.");
        require(msg.value >= property.price, "Insufficient funds.");

          require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                property.owner,
                property.price
            ),
            "Transfer failed."
        );
        property.owner = payable(msg.sender);
        property.forSale = false;

        emit PropertyPurchased(tokenId, msg.sender);
    }

    function updatePropertyPrice(uint256 tokenId, uint256 newPrice) public whenNotPaused {
        Property storage property = properties[tokenId];

        require(msg.sender == property.owner, "Only the property owner can update the price.");
        require(property.forSale, "Property is not for sale.");

        property.price = newPrice;

        emit PropertyUpdated(tokenId);
    }

    function putPropertyForSale(uint256 tokenId, uint256 price) public whenNotPaused {
        Property storage property = properties[tokenId];

        require(msg.sender == property.owner, "Only the property owner can put the property for sale.");
        require(!property.forSale, "Property is already for sale.");

        property.price = price;
        property.forSale = true;
    }

    function withdrawProperty(uint256 tokenId) public whenNotPaused {
        Property storage property = properties[tokenId];

        require(msg.sender == property.owner, "Only the property owner can withdraw the property from sale.");
        require(property.forSale, "Property is not for sale.");

        property.forSale = false;

        emit PropertyWithdrawn(tokenId);
    }

    function getPropertyDetails(uint256 tokenId) public view returns (Property memory) {
        return properties[tokenId];
    }
}
```

### Code Breakdown

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
```

The first few lines of the code define the Solidity version and import necessary contracts from the OpenZeppelin library.

- `ERC721.sol`: This is the contract for non-fungible tokens (NFTs) and implements the ERC-721 standard.
- `Ownable.sol`: This contract defines an owner and allows only the owner to perform certain actions.
- `Pausable.sol`: This contract allows the contract owner to pause and unpause the contract to prevent any unwanted activities.
- `Counters.sol`: This contract provides a simple way to increment and decrement numerical counters.

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

This is an interface for a standard `ERC-20` token which allows the contract to interact with external tokens. It includes several functions such as transfer, approve, and allowance which are commonly used in `ERC-20` tokens.

```solidity
contract RealEstateMarketplace is ERC721, Ownable, Pausable {
    using Counters for Counters.Counter;
Counters.Counter private _tokenIds;

struct Property {
    uint256 id;
    string location;
    uint256 price;
    address payable owner;
    bool forSale;
}

mapping(uint256 => Property) public properties;

event PropertyRegistered(uint256 indexed tokenId);
event PropertyPurchased(uint256 indexed tokenId, address indexed buyer);
event PropertyUpdated(uint256 indexed tokenId);
event PropertyWithdrawn(uint256 indexed tokenId);

constructor() ERC721("RealEstateMarketplace", "REMP") {}
}

```

The `RealEstateMarketplace` contract inherits from `ERC721`, `Ownable`, and `Pausable`. It defines a Counter to keep track of the number of properties registered, and a Property struct which stores the details of each property, including its `ID`, `location`, `price`, `owner`, and `forSale` status.

The mapping properties maps each property ID to its respective Property struct.
The contract also emits events for `PropertyRegistered`, `PropertyPurchased`, `PropertyUpdated`, and `PropertyWithdrawn`.

The constructor function sets the name and symbol of the `ERC721` token to `RealEstateMarketplace` and `REMP` respectively.

```solidity
function pause() public onlyOwner {
    _pause();
}

function unpause() public onlyOwner {
    _unpause();
}
```

These two functions allow the contract owner to `pause` and `unpause` the contract using the Pausable contract. Only the contract owner can call these functions.

```solidity
function registerProperty(string memory location, uint256 price) public whenNotPaused {
    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();

    _mint(msg.sender, tokenId);

    Property memory newProperty = Property(
        tokenId,
        location,
        price,
        payable(msg.sender),
        true
    );
    properties[tokenId] = newProperty;

    emit PropertyRegistered(tokenId);
}
```

The `registerProperty` function allows a property to be registered on the marketplace. It takes in the location and price of the property and creates a new Property struct with the current token ID, owner address, and forSale status set to true. The new property is then added to the `properties` mapping, and the `ERC721` token is minted and assigned to the property owner. The function emits the PropertyRegistered event with the token ID.

```solidity
function buyProperty(uint256 tokenId) public payable whenNotPaused {
    Property storage property = properties[tokenId];

    require(property.forSale, "Property is not for sale.");
    require(msg.value >= property.price, "Insufficient funds.");

    _transfer(property.owner, msg.sender, tokenId);
    property.owner.transfer(msg.value);
    property.owner = payable(msg.sender);
    property.forSale = false;

    emit PropertyPurchased(tokenId, msg.sender);
}
```

The `buyProperty` function allows a buyer to purchase a property by sending enough `Ether` to cover the property price. The function checks if the property is for sale and if the buyer has sent enough Ether. If both conditions are met, the `ERC721` token is transferred to the buyer, and the property owner receives the `Ether`. The function updates the property owner and forSale status and emits the `PropertyPurchased` event with the token ID and buyer address.

```solidity
function updatePropertyPrice(uint256 tokenId, uint256 newPrice) public whenNotPaused {
    Property storage property = properties[tokenId];

    require(msg.sender == property.owner, "Only the property owner can update the price.");
    require(property.forSale, "Property is not for sale.");

    property.price = newPrice;

    emit PropertyUpdated(tokenId);
}
```

The `updatePropertyPrice` function allows the property owner to update the price of a property. The function checks if the caller is the property owner and if the property is for sale. If both conditions are met, the price of the property is updated, and the function emits the PropertyUpdated event with the token ID.

```solidity
function putPropertyForSale(uint256 tokenId, uint256 price) public whenNotPaused {
    Property storage property = properties[tokenId];

    require(msg.sender == property.owner, "Only the property owner can put the property for sale.");
    require(!property.forSale, "Property is already for sale.");

    property.price = price;
    property.forSale = true;
}
```

The `putPropertyForSale` function allows the property owner to put a property up for sale. The function checks if the caller is the property owner and if the property is not already for sale. If both conditions are met, the price of the property is set, and the forSale status is updated to true.

```solidity
function withdrawProperty(uint256 tokenId) public whenNotPaused {
    Property storage property = properties[tokenId];

    require(msg.sender == property.owner, "Only the property owner can withdraw the property from sale.");
    require(property.forSale, "Property is not for sale.");
       property.forSale = false;

    emit PropertyWithdrawn(tokenId);
}
```

The `withdrawProperty` function allows the property owner to withdraw a property from sale. The function checks if the caller is the property owner and if the property is for sale. If both conditions are met, the forSale status is updated to false, and the function emits the PropertyWithdrawn event with the token ID.

```solidity
function getPropertyDetails(uint256 tokenId) public view returns (Property memory) {
    return properties[tokenId];
}
```

The `getPropertyDetails` function allows anyone to view the details of a property given its token `ID`. The function returns the Property struct for the given token ID.

## Deployment

To deploy our smart contract successfully, we need the celo extention wallet which can be downloaded from [here](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en)

Next, we need to fund our newly created wallet which can done using the celo alfojares faucet [Here](https://celo.org/developers/faucet)

Now, click on the plugin logo at the bottom left corner and search for celo plugin.

Install the plugin and click on the celo logo which will show in the side tab after the plugin is installed.

Next connect your celo wallet, select the contract you want to deploy and finally click on deploy to deploy your contract.

## Conclusion

This `RealEstateMarketplace` contract provides a simple but effective way for buying and selling properties using cryptocurrency. It is built using the OpenZeppelin library and follows best practices for secure smart contract development. By following this tutorial, you should now have a good understanding of how to build an `ERC-721` token and how to use the `Ownable` and `Pausable` contracts for additional security and control.

## Next Steps

I hope you learned a lot from this tutorial. Here are some relevant links that would aid your learning further.

- [Celo Docs](https://docs.celo.org/)
- [Solidity Docs](https://docs.soliditylang.org/en/v0.8.17/)

## About the author

I'm Jonathan Iheme, A full stack block-chain Developer from Nigeria.

[linkedIn](https://www.linkedin.com/in/jonathan-iheme-31a63718b/)
[Twitter](https://twitter.com/iheme_jonathan)
