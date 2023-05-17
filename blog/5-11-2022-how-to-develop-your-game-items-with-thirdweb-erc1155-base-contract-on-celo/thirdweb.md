---
title: How to Develop Your Game Items with ThirdWeb’s ERC1155 Base Contract on Celo
description: This article will demonstrate how to use develop game items with Thirdweb's ERC1155 Base Contract
author:
  - name: John Fawole
    title: Technical Writer
    url: https://www.linkedin.com/in/johnfawole/
    image_url: https://github.com/johnfawole.png
tags: ['solidity', 'smartcontract', 'celosage', 'erc1155']
hide_table_of_contents: true
slug: /tutorials/how-to-develop-your-game-items-with-thirdweb-erc1155-base-contract-on-celo
---

![thirweb-cover](https://github.com/celo-org/docs/assets/105144630/35fab356-5f2e-464f-933a-7556992ffcd0)

## Introduction

Blockchain technology permeates different aspects of human lives, from finance to politics to elements of fun and relaxation, such as music and games. [Forbes reported](https://www.forbes.com/sites/theyec/2022/08/02/3-things-you-need-to-know-about-blockchain-gaming/?sh=7a18c3f14a85) in Aug 2022 that blockchain gaming grew by a massive 2000% in 2021 and attracted over $2.5 billion in investments. Blockchain gaming has come to stay, which is why the focus here is on how to use thirdweb’s ERC1155 template to build game items, specifically game NFTs

## Introduction to ThirdWeb

ThirdWeb is a web3 protocol that provides a framework for developers and companies to onboard their businesses or build one on the blockchain. It provides a complete web3 development framework to shorten the journey from product conception and idea to an actual product. 

Thirdweb helps its users build smart contracts that are compatible with and can be deployed on any EVM chain. Besides providing its users with smart contracts and frontend/dashboard support, it also provides on-chain analytics services. 

They provide developers with different smart contract templates which can be modified to suit the purpose of the developer or the project. The aim is to help developers build a more secure smart contract in a short period of time. 

## ERC1155 for fungible and Non-fungible tokens

The two most popular kinds of tokens in the blockchain space are fungible and non-fungible tokens. 

ERC20, or fungible tokens, in a general sense, are tokens that are non-unique, divisible, and function like the fiat currency we spend. Fiat currencies like the USD, EUR, SGD, etc., have also been onboarded to the blockchain. We now have tokens such as USDC, USDT, EUROC, CADC, etc. 

The other kind of token is the non-fungible token. These tokens are unique and indivisible. It represents an element with intrinsic value, like artwork or music. These kinds of tokens are usually represented as ERC721 tokens. 

The combination of ERC721 and ERC20 is ERC1155. It is a standard that defines how fungible and non-fungible tokens can co-exist as one, not two, separate standards. The most common application of this standard would be in creating game items. 

Game currencies are represented in ERC20, while rare artifacts are represented as non-fungible tokens, e.g., a rare gun at a particular level or a special animal. 

Many other use cases are still being explored, and we should see more ERC1155 standard products in the future.

## Using ThirdWeb’s ERC1155Base Contract to Build Game Items

Thirdweb has provided several smart contract templates for developers to build out their ideas quickly. Templates for common ERCs have been built, but the one of interest here is the `ERC1155Base` contract. 

This contract is used to build the game items for our Ecstasy game. We would only focus on NFTs; hence, the game items we are building are NFTs. Of course, we wouldn't be building any game; we would only be building the smart contracts powering the game items supposing we have a game called Ecstasy.

This contract will be built using a different technique from the one provided in thirdweb’s docs for security reasons. The only step required of the developer in thirdweb’s docs is to inherit the `ERC1155Base` contract. Doing so bares out all the needed and unnecessary functions leaving us open to known and unknown security issues. 

Furthermore, the first mint of the entire collection has to go to the custodian for reasons explained later. Also, because we’ve taken a different approach in this tutorial, we will be building an additional governance system to support the one provided by the Base contract. 

Finally, we will deploy our contract on the Celo network and verify it so that it can be accessed on Remix IDE and the block explorer.

### Building the contract preliminaries

The contract is developed with Remix IDE. The scope of this article transcends how to use Remix IDE; hence, developers should be familiar with Remix IDE before going through this guide. Create a new solidity file with your preferred name. For this tutorial, the contract is named `thirdweb.sol`.

The following steps are required to build out the contract preliminaries:

``` solidity
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC1155Base } from "@thirdweb-dev/contracts/base/ERC1155Base.sol";

contract gameItems{

}
```

Declare your license type and add your pragma line. Use any solidity version above 0.8.0, import thirdweb’s ERC1155Base contract, and create your game contract in the solidity file you created in Remix.

``` solidity 
ERC1155Base baseContract;
address public custodian;
address public newCustodian;
```

Create an `ERC1155Base` contract variable. This variable will interact with the new `ERC1155Base` contract created in the constructor. You also need to declare two address variables, custodian and newCustoodian, which will be used to handle governance and custody issues.

``` solidity 
event custodyTransferInitiated (address currentCustodian, address newCustodian);
event custodyTransferCompleted (address custodian);
```

Include events that will be emitted when a custody transfer has been initiated, and the custody transfer process is completed.

``` solidity 
constructor (
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
        ) {
        baseContract = new ERC1155Base(_name, _symbol, _royaltyRecipient, _royaltyBps);
        baseContract.setOperatorRestriction(false);
        baseContract.setOwner(address(this));
        custodian = msg.sender;

        //call the first mint so mintTo can work later on
        baseContract.mintTo(custodian, type(uint).max, "ECSTASY ARMOR X1.0.0", 1);
    }
```

Declare a constructor which takes 4 parameters. These parameters include:

1. the `_name` of the entire game items collection,
2. the `_symbol` of the game collection,
3. the `_royaltyRecipient` that receives the royalty on the game items, and
4. The `_royaltyBps` fee (bps).

Using the `ERC1155Base` variable, `baseContract`, declared earlier, create a new `ERC1155Base` contract with the variables listed in the constructor and pass the new contract into the variable. 

Also, in the constructor, set `OperationRestriction` to false. This is set to true by default but will not be required for the contract. 
Set the owner of the `baseContract` created to the contract's address for the game items. Set the custodian as the `msg.sender`, and mint the first NFT to the contract deployer. If not, the `mintTo function` in the `ERC1155Base` contract will be inaccessible.

``` solidity 
modifier onlyCustodian() {
require(msg.sender == custodian, "ERR: NOT CUSTODIAN");
_;
}
```

Finally, create an onlyCustodian modifier to regulate which function anyone can call. Due to security concerns, we would rather declare an ERC1155Base contract using a variable that can interact with the deployed contract than inherit it, as most developers do.

``` solidity 
 //Custodian change
    function intiateCustodyTransfer(address _newCustodian) external onlyCustodian{
        require(_newCustodian != address(0), "ERR: ZERO ADDRESS");
        newCustodian = _newCustodian;
        emit custodyTransferInitiated(custodian, newCustodian);
    }

    function acceptCustody() external {
        require(msg.sender == newCustodian, "ERR: NOT NEW CUSTODIAN");
        custodian = newCustodian;
        newCustodian = address(0);
        emit custodyTransferCompleted(custodian);
    }
    
    //Returns the owner of the base contract
    function getOwner() external view returns(address) {
        return baseContract.owner();
    }
```

We will implement two functions here:

* `intiateCustodyTransfer`

which begins the custody change/transfer process and sets the newCustodian address to the address passed in in the function

* `acceptCustody`

which the new custodian can call to accept the responsibilities of a custodian.

These functions are fairly simple. initiateCustodyTransfer takes an address parameter. The function performs the zero address check, sets newCustodian to _newCustodian, and emits the custodyTransferInitiated event. acceptCustody can only be called by the newCustodian address, after which, once called, immediately makes the newCustodian the custodian. Until the newCustodian accepts custody, the custodian address will not be changed.

### Building the Reward Functionality

Each tokenId in this contract represents a game item collection. A special Ecstasy sword can be represented using tokenId 1, and an armor suit can be represented using tokenId 2. 

ERC1155 contracts allow you to mint several amounts of each tokenId. Here, the tokens do not have decimals; hence, 1 unit of each tokenId represents a unit of a game item collection.

``` solidity 
function reward(address to, bool newCollection, uint tokenId, string memory uri, uint amount) external onlyCustodian {
        require(bytes(uri).length > 0, "ERR: EMPTY STRING!");
        if(newCollection){
            baseContract.mintTo(to, type(uint256).max, uri, amount);
        }else{
            baseContract.mintTo(to, tokenId, uri, amount);
        }
    }
```

Only the custodian can call the reward function. It takes five parameters: 

1. the receiver of the NFT, 
2. a boolean for whether you are starting a new collection or not. this signals the baseContract that we are creating a new collection, 
3. tokenId. Token Id has no relevance if we create a new collection, 
4. the URI containing a string pointing to the details of the NFT, and 
5. the amount the receiver is to be rewarded with.

The function checks that an empty string isn't passed; if it is, it will revert. This is because a token with an empty string will cause the getURI function to revert. If newCollection is set to true, a new collection is started and minted; if not, an NFT belonging to an existing collection is minted.

### Adding minimal support for royalties

In accordance with ERC2981, which provides for royalties on NFT, thirdweb provides for that in their base contract, and we would be implementing it in the game contract too.

``` solidity 
//Royalty details

    function setRoyaltyInfo(uint tokenId, address royaltyRecipient, uint royaltyBps) external onlyCustodian{
        baseContract.setRoyaltyInfoForToken(tokenId, royaltyRecipient, royaltyBps);
        // add an emit statement here
    }

    function getRoyaltyInfo(uint tokenId) external view returns (address, uint) {
        return baseContract.getRoyaltyInfoForToken(tokenId);
    }

    function calculateRoyalty (uint tokenId, uint salePrice) external view returns (uint) {
        ( , uint royaltyValue) = baseContract.royaltyInfo(tokenId, salePrice);
        return royaltyValue;
    }
```

We have 3 functions for royalties. setRoyaltyInfo sets the royalty receiver and the royalty rate for a specific collection. getRoyaltyInfo gets the receiver address and royalty rate for a particular collection. Finally, calculateRoyalty get the royalty due on an NFT in a collection given a particular sale price.

### Balances and MetaData

We also need to add some functions so the user can check how many units of a single collection he owns or how many units of several collections he owns. He can do that through the balanceOf and batchBalanceOf functions. 

``` solidity 
//MetaData

    function getName() external view returns (string memory) {
        return baseContract.name();
    }

    function getSymbol() external view returns (string memory) {
        return baseContract.symbol();
    }

    function getURI(uint tokenId) external view returns (string memory){
        return baseContract.uri(tokenId);
    }

    function totalSupply(uint tokenId) external view returns (uint) {
        return baseContract.totalSupply(tokenId);
    }
    function balanceOf (address _address, uint _id) external view returns (uint) {
        return baseContract.balanceOf(_address, _id);
    }

    function batchBalanceOf (address[] calldata _address, uint[] calldata _id) external view returns (uint[] memory) {
        return baseContract.balanceOfBatch(_address, _id);
    }
```

Besides the balance functions, we also have the getURI, totalSupply, getName, and getSymbol functions that are rather intuitive. These functions return relevant information regarding the contract or a particular collection.

## Deploying and verifying the contract on Celo

This contract will be deployed on the Celo Network. Connect your Remix IDE to metamask. Ensure you have some Celo to deploy the contract. If you do, then add the constructor information and then deploy. 

Once deployed, you should get a confirmation that the contract has been deployed and can now be viewed on the block explorer.

![thirdweb1](https://github.com/celo-org/docs/assets/105144630/4067bfe1-7582-494a-9a60-0d02ff614706)

![thirdweb2](https://github.com/celo-org/docs/assets/105144630/b4a279f6-01cd-42f4-b40a-7ac2c5e1e66f)

When a contract is deployed on any network, it cannot be interacted with using the interface provided by the block explorer, nor can the code be inspected unless verified. To do that, you’ll need 3 things, a Remix IDE code verification plugin called Sourcify, the contract address from when it was deployed on Celo, and the contract name, which is automatically provided by Remix given that the contract was written in its IDE. 

Go to the extension section, search for sourcify, and activate it. Once activated, click on it on the left corner of the screen, click on verifier, and provide the network. Since we deployed on Celo Alfajores testnet, we'll select that. Provide the contract address, select the appropriate contract name, click on verify, and your contract will be verified in seconds.

![thirdweb3](https://github.com/celo-org/docs/assets/105144630/c5fc6c19-4fb4-4923-a89e-2aef3fa204f2)
![thirdweb4](https://github.com/celo-org/docs/assets/105144630/e87ea392-38d2-4d95-9bf7-821d5df639f5)
![thirdweb5](https://github.com/celo-org/docs/assets/105144630/4a437ac4-4d20-4762-af8f-b17f1540f5b7)

You can now visit the block explorer to inspect and interact with your contract.

## Conclusion

Thirdweb has a wealth of smart contract development templates and guides on how to use them. Although the scope here is to use their ERC1155Base template to build NFT game items, you can go the extra mile by using the same template to build both NFT game items and game currencies. This is how game economies are built. Happy buidling.

## Next Step

Thirdweb has a lot of tools you should check out. They recently launched their [Wallet SDK](https://thirdweb.com/wallet-sdk). You can build a frontend for this Gaming project and use the Thirdweb Wallet SDK for login.

## About the Author
John Fawole is a blockchain technical writer and Solidity developer; connect with him on [LinkedIn](https://www.linkedin.com/in/johnfawole/).
