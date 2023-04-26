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

Next, we give our contract a name and also a struct.

```solidity
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
```

In this smart contract, we have defined a struct called `Hair`, which includes several properties such as the owner's address, image, brand, color, durability, and price. These properties represent the essential information for a hair product.

We have also declared two internal variables: `hairsLength` to keep track of the number of hair products in the contract, and `cUsdTokenAddress` to store the address of the Celo Dollar (cUSD) token, which will be used for transactions in the contract.

Furthermore, we add a mapping.

```solidity
 mapping (uint =>  Hair) internal hairs;
```
In this smart contract, we are using a mapping data structure to store the details of each hair token. The mapping keyword is used to create a key-value mapping between a uint key and a Hair struct value. The internal `visibility modifier` is used to restrict access to the mapping only to the contract and its derived contracts.

We can access the mapping using the key `uint` to retrieve the corresponding Hair struct. By using this mapping, we can efficiently store and access information about each hair token in the contract.

Furthermore, to make our smart contract more interesting we begin to add functions. The first function we will be adding is the `addHair` function.

```solidity
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
```

In this function, we are creating a new Hair object and storing it in the hairs mapping. First, we create a reference to the new Hair object with Hair storage `Haircentials = hairs[hairsLength];`. Then, we set the values of the Hair object using the input parameters provided in the function call. We set the owner of the Hair object to the address of the person calling the function, and set the rest of the properties using the inputs provided.

Once all the values have been set, we increment the `hairsLength` counter to ensure that the next Hair object created will have a unique index in the mapping.

Next we add the `getHair` function.

```solidity
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

```

In this Solidity smart contract function, we have a `getHair` function that returns the details of a hair product stored in the `hairs` mapping. The function takes an index as an input and returns the hair owner's address, image, brand, color, durability, and price.

The function uses the `public view` keyword to indicate that the function will not modify the state of the contract. Instead, it only reads data from the contract.

Inside the function, we access the hair product details stored at the given index in the `hairs` mapping and return them as a tuple with the correct data types.

Additionally, we add the `replaceHair` function.

```solidity
function replaceHairImage(uint _index, string memory _image) public {
        require(msg.sender == hairs[_index].owner, "Only the owner can change the image");
        hairs[_index].image = _image;
     }
```

In this function, we are allowing the owner of a hair to change its image by providing the index of the hair they want to update and the new image. We first check that the caller of the function is the owner of the hair by comparing their address to the owner's address of the hair at the specified index. If they are the owner, we update the image for that hair by assigning the new image to the image property of the hair at the specified index. If the caller is not the owner, we revert the transaction with an error message indicating that only the owner can change the image.

Now, we add the `buyHair` function.

```solidity
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
```

In this function, we are allowing users to buy a hair by transferring the required amount of cUSD tokens to the owner of the hair. We first check if the transfer of tokens from the buyer to the owner is successful using the `transferFrom` function of the `ERC20` token. If the transfer is successful, we `update` the owner of the hair to be the buyer by setting `hairs[_index].owner` to `msg.sender`.

Finally, we add the `gethairsLength` function.

```solidity
 function gethairsLength() public view returns (uint) {
        return (hairsLength);
    }
}
```

In this final session, we have defined a function named `gethairsLength` which is a public` view function that returns the length of the `hairs` array, which holds all the hair products added to the contract using the addHair function. We can call this function from outside the contract to get the current number of hair products available for sale. This function helps us keep track of the number of hair products available in the marketplace.


## CONTRACT DEPLOYMENT

To deploy the `HairMarketplace` smart contract on the Celo blockchain, you would need the following:

CeloExtensionWallet: Download and install the Celo Extension Wallet from the Google Chrome store, create a wallet, and securely store your key phrase. [Click here to intall the celo extension wallet](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en)

Celo Faucet: Fund your wallet by copying your wallet address and pasting it into the Celo Faucet, then confirm. [Click here to access celo faucet](https://faucet.celo.org/)

Celo Remix Plugin: Open Remix and create a new Solidity file, paste the `Hairmarketplace` contract code into the file, and ensure the Solidity compiler is set to version 0.8.7 or later. [Click here to access to access the remix ide](https://remix.ethereum.org/)

Compile the contract by clicking the `Compile hairMarketplace.sol` button in the Solidity Compiler tab in Remix.

In the `Deploy & Run Transactions` tab, select the Celo network from the dropdown menu, connect your wallet to Remix by clicking `Connect to wallet`, and select `hairMarketplace` from the `Contract` dropdown menu.

Click the `Deploy` button, confirm the transaction in your wallet, and wait for the transaction to be confirmed on the Celo blockchain.

Once the transaction is confirmed, the `hairMarketplace` contract will be deployed on the Celo blockchain and you can interact with it using Remix.

## Conclusion

In this tutorial, we have learned how to create a smart contract for an online hair store using Solidity on the Celo blockchain. We have defined the Hair struct that contains the details of each hair product and created functions to add, get, and replace the image of the hair product. We have also implemented a buy function that uses the ERC20 token to facilitate the transaction between the buyer and the seller. Finally, we have created a function to retrieve the number of hair products in the store. By following this tutorial, we can develop a basic understanding of Solidity and smart contract development on the Celo blockchain.

## NEXT STEPS 

I trust that you found this tutorial informative and learned a lot from it. If you would like to continue your education, I have provided some helpful links below that you may find useful to explore:

The official Celo documentation: https://docs.celo.org/

Solidity By Example, a website with code examples for learning Solidity: https://solidity-by-example.org/

OpenZeppelin Contracts, a library of secure, tested smart contract code: https://www.openzeppelin.com/contracts/

Solidity documentation for version 0.8.17: https://docs.soliditylang.org/en/v0.8.17/

I hope these resources prove to be useful to you!

## About the author

I'm David Ikanji, a web3 developer residing in Nigeria, and I have a strong passion for working with blockchain technology.


