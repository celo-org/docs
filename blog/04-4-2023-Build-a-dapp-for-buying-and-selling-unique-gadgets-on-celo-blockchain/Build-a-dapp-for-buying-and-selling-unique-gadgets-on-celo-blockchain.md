---
title: Build a dapp for buying and selling unique gadgets on celo blockchain
description: Gadget project is a dApp for buying/selling unique gadgets represented by NFTs on Celo blockchain, with ERC-20 interface for DeFi. Provides secure/transparent platform for gadget enthusiasts/creators to connect.
authors:
  - name: Ikanji David
    title: Technical Writer 
    url:   https://github.com/Ikanji201
    image_url:   
tags: [celo sage, dapp, intermediate, celo]
hide_table_of_contents: true
slug: /tutorials/build-a-dapp-for-buying-and-selling-unique-gadgets-on-celo-blockchain
---

## INTRODUCTION

Decentralized applications (dapps) are becoming increasingly popular, and the blockchain industry is growing rapidly. One area that could benefit from blockchain technology is the buying and selling of unique gadgets. With blockchain, we can create a transparent, secure, and immutable system that allows for trustless transactions.

The Celo blockchain is a mobile-first blockchain platform that aims to make financial systems accessible to anyone with a mobile phone. It is designed to be user-friendly, fast, and affordable, making it a suitable platform for dapps.

Our dapp will be designed to enable the buying and selling of unique gadgets on the Celo blockchain. Each gadget will have a unique identifier, and its ownership will be recorded on the blockchain, ensuring that each gadget is unique and verifiable. The dapp will also have a rating system for sellers, ensuring that buyers can make informed decisions when purchasing gadgets.

The dapp will use Celo's stablecoin, cUSD, as the payment method for all transactions, ensuring that the value of the transactions remains stable. Additionally, the use of smart contracts will automate the buying and selling process, ensuring that transactions are secure and transparent.

Overall, this dapp has the potential to revolutionize the way we buy and sell unique gadgets. By utilizing blockchain technology, we can create a secure, transparent, and user-friendly system that benefits both buyers and sellers.

[Live demo](https://jovial-licorice-e696fc.netlify.app/) of what we will be building.

## PREREQUESITES

In order to make the most of these tutorials, it is suggested that you have a basic comprehension of the following technologies:

- solidity programming language

- Smart contract technology

- Basic concepts of web development

- Blockchain technology and its principles

- React JavaScript library.

## REQUIREMENTS
- Solidity programming language

- React JavaScript library
 
- Bootstrap framework

- NodeJS version 12.0.1 or higher installed
 
- Celo Extension Wallet
 
- Remix IDE for writing and testing smart contracts.

Shall we begin creating a smart contract using Remix IDE?

The full code:

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

contract Gadgets {
    uint private glassLength = 0;
    address private cUsdTokenAddress =
      0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    event likeGadgetEvent(address indexed userAddress, uint256 index);
    event dislikeGadgetEvent(address indexed userAddress, uint256 index);
    event deleteGadgetEvent(uint256 glassId);
    event buyGadgetEvent(
        address indexed seller,
        address indexed buyer,
        uint256 index
    );
    event addGadgetEvent(address indexed owner, uint256 gadgetId);

    struct Glass {
        address payable owner;
        string image;
        string name;
        string description;
        uint price;
        uint likesCount;
    }
    mapping(uint => Glass) internal glasses;
    mapping(uint256 => mapping(address => bool)) likes; // glasses liked by all users

    /// @dev  function to use to add glasses
    function addGlass(
        string calldata _image,
        string calldata _name,
        string calldata _description,
        uint _price
    ) external {
        require(bytes(_image).length > 0, "Empty image");
        require(bytes(_name).length > 0, "Empty name");
        require(bytes(_description).length > 0, "Empty description");
        require(_price > 0, "Price needs to be at least one wei");
        uint _likesCount = 0;
        glasses[glassLength] = Glass(
            payable(msg.sender),
            _image,
            _name,
            _description,
            _price,
            _likesCount
        );

        emit addGadgetEvent(msg.sender, glassLength);
        glassLength++;
    }

    /// @return glass details with key @index from glass mapping
    function getGlass(uint _index)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            uint,
            uint
        )
    {
        return (
            glasses[_index].owner,
            glasses[_index].image,
            glasses[_index].name,
            glasses[_index].description,
            glasses[_index].price,
            glasses[_index].likesCount
        );
    }

    /// @dev delete glass with key @_index from books mapping
    function removeGlass(uint _index) external {
        require(msg.sender == glasses[_index].owner, "Only owner can delete ");
        glasses[_index] = glasses[glassLength - 1];
        delete glasses[glassLength - 1];
        glassLength--;

        emit deleteGadgetEvent(_index);
    }

    /**
     * @dev allow users to buy a glass from the platform
     */
    function buyGlass(uint _index) public payable {
        Glass storage currentGlass = glasses[_index];
        require(
            currentGlass.owner != msg.sender,
            "You can't buy your own glass"
        );
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                glasses[_index].owner,
                glasses[_index].price
            ),
            "Transfer failed."
        );

        address seller = glasses[_index].owner;

        glasses[_index].owner = payable(msg.sender);

        emit buyGadgetEvent(seller, msg.sender, _index);
    }

    /**
     * @dev allow users to like or unlike a glass
     * @notice this function is used to like or dislike
     */
    function Like(uint _index) public {
        bool hasLiked = likes[_index][msg.sender];

        if (hasLiked) {
            likes[_index][msg.sender] = false;
            glasses[_index].likesCount--;
            emit dislikeGadgetEvent(msg.sender, _index);
        } else {
            likes[_index][msg.sender] = true;
            glasses[_index].likesCount++;
            emit likeGadgetEvent(msg.sender, _index);
        }
    }

    function getGlassesLength() public view returns (uint) {
        return (glassLength);
    }
}
```
## Code Analysis

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
```

This code contains two directives that are important for us. The first one specifies the open-source license that the code is released under, which ensures that anyone can use and modify the code as long as they include the original license. The second directive defines the range of Solidity versions that the code is compatible with. By using these directives, we can make sure that the code is licensed correctly and can be compiled using the intended version of Solidity.

Next, we add our ERC20 token interface.

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

This code defines the necessary functions and events for a Celo ERC20 token contract. ERC20 is a standard protocol used for creating tokens on the Celo blockchain, and this code specifies how users can interact with the smart contract. The functions allow for the transfer of tokens, authorization for other addresses to spend tokens, and the retrieval of information about the token contract, such as the total supply and token balances. The events trigger notifications when a token transfer or approval occurs on the Celo blockchain, providing external applications with real-time updates.

Next, we begin by naming our contract and also creating our struct.

```solidity
contract Gadgets {
    uint private glassLength = 0;
    address private cUsdTokenAddress =
      0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    event likeGadgetEvent(address indexed userAddress, uint256 index);
    event dislikeGadgetEvent(address indexed userAddress, uint256 index);
    event deleteGadgetEvent(uint256 glassId);
    event buyGadgetEvent(
        address indexed seller,
        address indexed buyer,
        uint256 index
    );
    event addGadgetEvent(address indexed owner, uint256 gadgetId);

    struct Glass {
        address payable owner;
        string image;
        string name;
        string description;
        uint price;
        uint likesCount;
    }
```

This is a smart contract called "Gadgets" that manages a collection of Glass objects. We can add new gadgets to the collection, delete a gadget, buy a gadget, and like or dislike a gadget. Each gadget has properties such as an owner address, an image, a name, a description, a price, and a count of likes. When certain actions are taken, events are triggered, such as the "likeGadgetEvent" and "dislikeGadgetEvent" events. The contract also stores the address of a contract that implements the cUSD token. Overall, this contract shows how to manage a collection of objects and perform various actions on them using a smart contract.

Next, we add out mapping.

```solidity
 mapping(uint => Glass) internal glasses;
 mapping(uint256 => mapping(address => bool)) likes; // glasses liked by all users
```

In our contract, we have defined two mappings. The first one, called glasses, maps an unsigned integer to a data structure called Glass. This allows us to retrieve the corresponding Glass data structure for any given unsigned integer.

The second mapping, called likes, is a bit more complex. We use a nested mapping structure to keep track of which users have liked which glasses. The outer mapping maps a glass ID to an inner mapping, which maps user addresses to a boolean value indicating whether or not they have liked the corresponding glass.

By using these mappings, we can efficiently keep track of which glasses have been liked by which users in our contract.

To enhance the functionality of our smart contract, we have decided to introduce new functions. The first function that we plan to incorporate is called addGadget.

```solidity
function addGadget(
        string calldata _image,
        string calldata _name,
        string calldata _description,
        uint _price
    ) external {
        require(bytes(_image).length > 0, "Empty image");
        require(bytes(_name).length > 0, "Empty name");
        require(bytes(_description).length > 0, "Empty description");
        require(_price > 0, "Price needs to be at least one wei");
        uint _likesCount = 0;
        glasses[glassLength] = Glass(
            payable(msg.sender),
            _image,
            _name,
            _description,
            _price,
            _likesCount
        );

        emit addGadgetEvent(msg.sender, glassLength);
        glassLength++;
    }
```

In this function, we are creating a new `gadget` object and adding it to our collection of gadgets. To create this new gadget object, we require four pieces of information: the image, name, description, and price. We also set the initial number of likes for this glass to zero.

Before adding the new glass to our collection, we perform several checks to make sure that all the required information has been provided. Specifically, we check that the image, name, and description are not empty, and that the price is greater than zero.

Once we have performed these checks, we create a new glass object with the provided information and add it to our collection of glasses. We also emit an event to notify any interested parties that a new glass has been added.

Overall, this function allows us to add new gadgets to our collection, ensuring that all required information has been provided and notifying interested parties of any new additions.

Next, we create the `getGadget` function.
```solidity
function getGadget(uint _index)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            uint,
            uint
        )
    {
        return (
            glasses[_index].owner,
            glasses[_index].image,
            glasses[_index].name,
            glasses[_index].description,
            glasses[_index].price,
            glasses[_index].likesCount
        );
    }

```



