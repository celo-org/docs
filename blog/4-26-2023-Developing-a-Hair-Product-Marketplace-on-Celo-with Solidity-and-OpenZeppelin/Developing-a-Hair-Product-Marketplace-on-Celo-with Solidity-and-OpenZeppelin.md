---
title: Developing a Hair Product Marketplace on Celo with Solidity and OpenZeppelin
description: This tutorial is for a decentralized hair marketplace on the Celo blockchain, where users can buy and sell hair products using the cUSD stablecoin
authors:
  - name: David Ikanji
    title: Technical Writer 
    url:  https://github.com/Ikanji201
    image_url:  https://avatars.githubusercontent.com/u/115812158?v=4
tags: [solidity, intermediate, celo, celosage]
hide_table_of_contents: true
slug: /tutorials/A-solidity-Smart-contract-for-auctioning-flowers-on-the-celo-blockchain
---

## INTRODUCTION

This project is a simple smart contract for selling various hair products. The contract allows users to add, view, and purchase virtual hair products. It utilizes the ERC20 token standard and OpenZeppelin's SafeMath library for secure calculations. The contract includes a struct for storing hair product details and a mapping to keep track of added hair products. Users can also replace the image of a hair product they own. The contract can be deployed on the Celo blockchain using tools such as Remix or Truffle.

## REQUIREMENT

To take this tutorial, you will need:

- Access to a code editor or text editor such as Remix.

- A reliable internet browser and internet connection

## PREREQUISITE 

- Basic knowledge of Javascript.

- Understand how Blockchain works.
  
- Have a basic knowledge of solidity.


Now let's begin writing our smart contract.

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

contract  Hairs {
    
    
    uint internal hairsLength = 0;
    address internal cUsdTokenAddress =  0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct  Hair {
        address payable owner;
        string image;
        string brand;
        string color;
        string durability;
         uint price;
         
        
    }
     mapping (uint =>  Hair) internal hairs;

      function  addHair(
        string memory _image, 
        string memory _brand,
        string memory _color,
        string memory _durability,
        uint _price

          ) public {
       Hair storage Haircentials = hairs[hairsLength];


         Haircentials.owner = payable(msg.sender);
           Haircentials.image = _image;
           Haircentials.brand = _brand;
           Haircentials.color = _color;
          Haircentials.durability = _durability;
              Haircentials.price = _price;

  
        hairsLength++;
          }

          
     function getHair(uint _index) public view returns (
        address payable,
        string memory,  
        string memory,
        string memory,
        string memory,
        uint
        
        
      
    ) {
        return (  
            hairs[_index].owner,
             hairs[_index].image,
              hairs[_index].brand,
              hairs[_index].color,
               hairs[_index].durability,
                 hairs[_index].price
               
        );
    }


     function replaceHairImage(uint _index, string memory _image) public {
        require(msg.sender == hairs[_index].owner, "Only the owner can change the image");
        hairs[_index].image = _image;
     }

    
      function buyHair(uint _index) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            hairs[_index].owner,
            hairs[_index].price
          ),
          "Transfer failed."
        );

         hairs[_index].owner = payable(msg.sender);
         
    }

     function gethairsLength() public view returns (uint) {
        return (hairsLength);
    }
}
```

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

contract  Hairs {
    
    
    uint internal hairsLength = 0;
    address internal cUsdTokenAddress =  0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct  Hair {
        address payable owner;
        string image;
        string brand;
        string color;
        string durability;
         uint price;
         
        
    }
     mapping (uint =>  Hair) internal hairs;

      function  addHair(
        string memory _image, 
        string memory _brand,
        string memory _color,
        string memory _durability,
        uint _price

          ) public {
       Hair storage Haircentials = hairs[hairsLength];


         Haircentials.owner = payable(msg.sender);
           Haircentials.image = _image;
           Haircentials.brand = _brand;
           Haircentials.color = _color;
          Haircentials.durability = _durability;
              Haircentials.price = _price;

  
        hairsLength++;
          }

          
     function getHair(uint _index) public view returns (
        address payable,
        string memory,  
        string memory,
        string memory,
        string memory,
        uint
        
        
      
    ) {
        return (  
            hairs[_index].owner,
             hairs[_index].image,
              hairs[_index].brand,
              hairs[_index].color,
               hairs[_index].durability,
                 hairs[_index].price
               
        );
    }


     function replaceHairImage(uint _index, string memory _image) public {
        require(msg.sender == hairs[_index].owner, "Only the owner can change the image");
        hairs[_index].image = _image;
     }

    
      function buyHair(uint _index) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            hairs[_index].owner,
            hairs[_index].price
          ),
          "Transfer failed."
        );

         hairs[_index].owner = payable(msg.sender);
         
    }

     function gethairsLength() public view returns (uint) {
        return (hairsLength);
    }
}

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

contract  Hairs {
    
    
    uint internal hairsLength = 0;
    address internal cUsdTokenAddress =  0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct  Hair {
        address payable owner;
        string image;
        string brand;
        string color;
        string durability;
         uint price;
         
        
    }
     mapping (uint =>  Hair) internal hairs;

      function  addHair(
        string memory _image, 
        string memory _brand,
        string memory _color,
        string memory _durability,
        uint _price

          ) public {
       Hair storage Haircentials = hairs[hairsLength];


         Haircentials.owner = payable(msg.sender);
           Haircentials.image = _image;
           Haircentials.brand = _brand;
           Haircentials.color = _color;
          Haircentials.durability = _durability;
              Haircentials.price = _price;

  
        hairsLength++;
          }

          
     function getHair(uint _index) public view returns (
        address payable,
        string memory,  
        string memory,
        string memory,
        string memory,
        uint
        
        
      
    ) {
        return (  
            hairs[_index].owner,
             hairs[_index].image,
              hairs[_index].brand,
              hairs[_index].color,
               hairs[_index].durability,
                 hairs[_index].price
               
        );
    }


     function replaceHairImage(uint _index, string memory _image) public {
        require(msg.sender == hairs[_index].owner, "Only the owner can change the image");
        hairs[_index].image = _image;
     }

    
      function buyHair(uint _index) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            hairs[_index].owner,
            hairs[_index].price
          ),
          "Transfer failed."
        );

         hairs[_index].owner = payable(msg.sender);
         
    }

     function gethairsLength() public view returns (uint) {
        return (hairsLength);
    }
}

## Analysing the code

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

```

The initial line of the code specifies the license of the contract, which is the MIT license. The second line declares the Solidity version that the contract is compatible with using the "pragma" statement. To avoid arithmetic errors in the contract, the "import" statement is used to import the SafeMath library from the OpenZeppelin contract library, which provides safe arithmetic operations.

Furthermore, an interface is defined for the ERC20 token, outlining the functions that the token must implement.

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

In this Session, we define an interface for the ERC20 token. The interface specifies the functions that the ERC20 token contract must implement in order to be compatible with our contract.

We use the `interface` keyword followed by the name of the interface, `IERC20Token`. Inside the interface, we define the necessary functions that will be used in our contract, such as `transfer`, `approve`, `transferFrom`, `totalSupply`, `balanceOf`, and `allowance`.

The `event` keyword is used to define the events that the ERC20 token contract will emit, such as `Transfer` and `Approval`. These events can be subscribed to by external systems to get notified when certain actions occur on the token contract.

By defining an interface for the ERC20 token, we can interact with any ERC20-compliant token, as long as it implements the functions specified in the interface.
