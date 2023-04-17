---
title: Creating a Smart Contract for Secure and Efficient Plant Seedling Sales on the Celo Blockchain
description:  This is a marketplace for seedlings on Celo using Solidity and OpenZeppelin. Users can add, view, and buy using cUSD
authors:
  - name: Ogoyi Thompson
    title: Technical Writer 
    url:  https://github.com/Ogoyi
    image_url: https://avatars.githubusercontent.com/u/115812158?v=4
tags: [solidity, intermediate, celo, celosage]
hide_table_of_contents: true
slug: /tutorials/creating-a-smart-contract-for-secure-and-efficient-plant-seedling-sales-on-the-celo-blockchain
---

## INTRODUCTION

This project is a simple implementation of a marketplace for buying and selling seedlings using Solidity, a programming language for developing smart contracts on the Celo blockchain. The marketplace allows users to add seedlings for sale, view existing seedlings, change the description of their own seedlings, and buy seedlings from other users using a custom ERC20 token called cUSD. The project uses OpenZeppelin, a library of reusable smart contracts for Ethereum, to import the SafeMath library for secure arithmetic operations.

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
 
 The complete code for this session.
 
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

contract SeedlingsMarketplace {
    
    
    uint internal seedlingsLength = 0;
    address internal cUsdTokenAddress =  0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct  Seedling {
        address payable owner;
        string name;
        string species;
        string description;
        uint price;
         
        
    }
     mapping (uint =>  Seedling) internal seedlings;

      function  addSeedling(
        string memory _name, 
        string memory _species,
        string memory _description,
        uint _price

          ) public {
       Seedling storage seedling = seedlings[seedlingsLength];


         seedling.owner = payable(msg.sender);
           seedling.name = _name;
           seedling.species = _species;
           seedling.description = _description;
              seedling.price = _price;

  
        seedlingsLength++;
          }

          
     function getSeedling(uint _index) public view returns (
        address payable,
        string memory,  
        string memory,
        string memory,
        uint
        
    ) {
        return (  
            seedlings[_index].owner,
             seedlings[_index].name,
              seedlings[_index].species,
              seedlings[_index].description,
                 seedlings[_index].price
               
        );
    }


     function replaceSeedlingDescription(uint _index, string memory _description) public {
        require(msg.sender == seedlings[_index].owner, "Only the owner can change the description");
        seedlings[_index].description = _description;
     }

    
      function buySeedling(uint _index) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            seedlings[_index].owner,
            seedlings[_index].price
          ),
          "Transfer failed."
        );

         seedlings[_index].owner = payable(msg.sender);
         
    }

     function getSeedlingsLength() public view returns (uint) {
        return (seedlingsLength);
    }
}

 ```
 
 
## Analyzing the code

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
```

The contract is licensed under the `MIT License`, which is a permissive open-source software license.

The pragma statement specifies the version of the Solidity compiler that should be used to compile the contract. In this case, the contract uses a version of Solidity that is greater than or equal to version `0.7.0`, but less than version `0.9.0`.

The contract imports the `SafeMath` library from the `OpenZeppelin` library of smart contracts. SafeMath is a library that provides arithmetic functions with overflow and underflow protection, which helps ensure that the calculations in the smart contract are executed safely without unexpected results.

In the following discussion, we will cover the IERC20 token, which provides the functionality for conducting transactions using the Celo Usd stablecoin.

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
