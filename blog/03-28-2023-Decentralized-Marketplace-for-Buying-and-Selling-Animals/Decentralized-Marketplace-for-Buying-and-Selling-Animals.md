 ---
title: Decentralized Marketplace for Buying and Selling Animals
description:  AnimalHouse is a decentralized platform that aims to create a supportive community for animal lovers. The contract provides a space for individuals to come together to adopt, rescue, and care for animals in need. By leveraging the security and transparency of blockchain technology, AnimalHouse offers a safe and efficient platform for connecting individuals who share a passion for animal welfare.
authors:
  - name: Ogoyi Thompson
    title: Technical Writer 
    url:  https://github.com/Ogoyi
    image_url:  
tags: [solidity, intermediate, celo, celosage]
hide_table_of_contents: true
slug: /tutorials/
---

## INTRODUCTION

Welcome to this tutorial on how to create an Animal Marketplace using Solidity! In this tutorial, we will walk through a simple Solidity code that allows users to add and buy animals, update animal information, and change animal prices.

This code is a great example of how to create a decentralized marketplace using the Celo blockchain. We will be using the ERC-20 token standard to handle payments and the Solidity programming language to write our smart contract.

## REQUIREMENT

- A code editor or text editor, for this tutorial we will be using remix.

- An Internet Browser and good internet connection.
  
 ## PREREQUISITE 

 - Basic knowledge of Javascript.
 
 - Understand how Blockchain works.
 
 - Have a basic knowledge of solidity.

To get started with this tutorial, we will begin by creating our smart contract that will define the functionality of our animal marketplace. We will use Solidity programming language to write our smart contract, which will allow us to interact with the Celo blockchain and create a decentralized marketplace.

To create our smart contract, we will be using Remix, an online Solidity IDE. We will begin by creating a new file called "animalHub.sol" in the Remix editor. Once we have created the file, we will open it and start by adding the initial statements that are required for a Solidity file.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
```

Adding SPDX license identifiers at the top of a Solidity contract file helps to specify the license that the contract is using. This is important for ensuring that the contract is compliant with the appropriate legal and licensing requirements.

In addition, we use the pragma statement to specify the version of Solidity that our smart contract uses. This helps the compiler to determine the necessary syntax and functionality required for our contract.

The next step is to add our ERC20 token interface, which will define the standard functions and events that our token contract must implement.

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

As we develop our animal marketplace, we will make use of the ERC20 token interface to enable the buying and selling of animals with tokens. The functions defined in the interface will allow us to transfer tokens between addresses, check balances, and get information about the total supply of the token. We will also use the event system to log transactions for transparency and record-keeping purposes.

Next, We will give our animal marketplace contract a name, `AnimalHouse` and also add a `struct`.

```solidity
contract  AnimalHouse {
    
    
    uint internal animalsLength = 0;
    address internal cUsdTokenAddress =   0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct  Animal {
        address payable owner;
        string image;
        string name;
        string breed;
        string age;
         uint price;
         
    }
```

Now, we can name our smart contract and define our struct. In this tutorial, we will call our contract `AnimalHouse`. We then create our struct `Animal` with the properties we want to store for each animal that we will add to our marketplace. These properties include the animal's `owner`, `image`, `name`, `breed`, `age`, and `price`. We declare `owner` as an address payable since the owner will receive payment when an animal is sold. We also declare `animalsLength` as an unsigned integer (uint) and `cUsdTokenAddress` as an address.

The `animalsLength` variable will keep track of the number of animals that have been added to our marketplace, while the `cUsdTokenAddress` variable will store the address of the token we will use for payment. We will be using the ERC20 token, cUSD.

After defining our struct, we proceed to add our mapping. 

```solidity
  mapping (uint =>  Animal) internal animals;
```

We use a mapping to store and retrieve our Animal struct using an index. In this case, we are mapping an unsigned integer (uint) to an Animal struct. The `internal` keyword is used to make the mapping only accessible within the smart contract. The animals variable is the name of our mapping.

To add more functionality to our smart contract, we will be implementing various functions. The first function we will add is called `addAnimal`.

```solidity
    
     function addAnimal (
        string memory _image,
        string memory _name,
        string memory _breed,
         string memory _age,
        uint _price

          ) public {
       Animal storage animalhub = animals[animalsLength];

        animalhub.owner = payable(msg.sender);
           animalhub.image = _image;
            animalhub.name = _name;
            animalhub.breed = _breed;
           animalhub.age = _age;
           animalhub.price = _price;

          
        animalsLength++;
          }
```

In this function, we first declare a new instance of our Animal struct, which we call animalhub. Then we set the values of the various properties of this struct instance using the arguments passed to the function. Specifically, we set the owner, image, name, breed, age, and price of the animal.

After setting these values, we then increment the animalsLength counter to keep track of the number of animals that have been added to the AnimalHouse.

It is important to note that the owner property is set to the address of the caller of the function, which is obtained using the msg.sender function. The payable keyword is added to ensure that the address is payable, allowing for transfers of funds to the address if needed.
