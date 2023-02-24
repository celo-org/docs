---
title: How to build a marketplace for selling shoes on the celo blockchain
description: Learn how to build a marketplace for seliing shoes on the celo blockchain
authors:
  - name: David Ikanji
    title: Technical Writer 
    url:  https://github.com/Ikanji201
    image_url:  https://avatars.githubusercontent.com/u/115812158?v=4
tags: [solidity, intermediate, celo]
hide_table_of_contents: true
slug: /tutorials/How-to-build-a-marketplace-for-selling-shoes-on-the-celo-blockchain
---


![header](../../src/data-tutorials/showcase/intermediate/How-to-Build-a-Marketplace-for-Selling-Shoes-on-Celo.png)

## INTRODUCTION

### What is blockchain all about?

Blockchain is a system of recording information in a way that makes it difficult or impossible to alter, hack or cheat the system.

### What is the Celo blockchain? 

Celo is a carbon-negative, permissionless, layer-1 blockchain with a rich ecosystem of global partners building innovative Web3 dapps to support a more inclusive financial system. You can read more about Celo by visiting this [page](https://celo.org).

### What are smart contract? 

According to Dapp University, smart contracts are where all the business logic of our applications lives. Smart contracts are in charge of reading and writing data to the blockchain, as well as executing business logic. Smart contracts are written in a programming language called Solidity, which looks a lot like Javascript.

## REQUIREMENT

- A code editor or text editor, for this tutorial we will be using [Remix](https://remix.ethereum.org/).
- An Internet Browser and a good internet connection.
  
## PREREQUISITE 

- Basic knowledge of [Javascript](https://www.javascript.com/).
- Understand how Blockchain works.
- Have a basic knowledge of [Solidity](https://soliditylang.org/).
  
### Now lets begin by creating our smart contract

##  Who this course is for:

- Anyone who wants to get started with smart contracts.
- Take this tutorial if you want to get a clear understanding of how the Celo blockchain works.
 
## What We’ll Be Building

We’ll build a smart contract for buying and selling shoes on the Celo blockchain.
In order to build our smart contract we will be using Remix for developing our smart contracts.
To get started with remix click on this link (https://remix.ethereum.org/)

On Remix we would start by creating a new file called Product.sol. We then open the file and start with the following statements

```js
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
```
The SPDX license identifiers assist us so we can specify what license the contract is using. SPDX license identifiers should be added to the top of contract files.

The Pragma is used to specify what version of Solidity our smart contracts use and thereby help the compiler to decide on the required.

## How do you know which version of Solidity to use?

It's always good to use the latest version of solidity except if you have some limiting factors.
Pragma solidity >=0.7.0 <0.9.0: This means that our smart contract code is to be compiled with a version of Solidity that is greater than or equal to 0.7.0 but less than 0.9.0.

Next, we would be discussing the IERC20 token which enables us to carry out transactions with the Celo Usd stable coin (cUSD).

## What is ERC20?

Put simply, the ERC20 standard defines a set of functions to be implemented by all ERC20 tokens such as cUSD, to allow integration with other contracts, wallets, or marketplaces. 

We can find the functions and events of the interface in the Celo documentation (https://docs.celo.org/)

```js
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

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

In the next step we would be declaring the smart contract with the “Contract” keyword, followed by the contract name (Marketplace).

```js
contract Marketplace {
    uint256 internal shoesLength = 0;

```
In the next line, we define a state variable named shoesLength, this is going to help store shoes permanently in our contract and also help keep track of the number of shoes in our contract, It is of a `uint` data type which means it can only store [unsigned integer values](https://docs.soliditylang.org/en/latest/types.html#integers). 

```js
 
 address internal cUsdTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
}   
```
Furthermore, to interact with the cUSD token on the Celo Alfajores test network, we need to add the address of the token.
In the next step, we define our `struct`

## Defining a Struct

[Struct](https://docs.soliditylang.org/en/latest/types.html#structs) types are used to represent a record. Suppose you want to keep track of your books in a library. You might want to track the following attributes about each book −

- Title
- Author
- Subject
- Book ID.
  
To define a struct, you must use the struct keyword. The struct keyword defines a new data type, with more than one member. The format of the struct statement is as follows −

```js
   struct Shoe {
        address payable owner;
        string image;
        string brand;
        string size;
        uint256 price;
        uint256 sold;
    }
```
From the code above, The code defines a struct named Shoe, which holds information about a shoe, such as its owner's address, image, brand, size, price, and the number of times it has been sold.

In the next step, we create two mappings, a mapping named shoes is declared, which maps an unsigned integer to a Shoe struct, and is declared as private so that it can only be accessed within the contract.

A mapping named _exists is also declared, which maps an unsigned integer to a boolean value to indicate if a shoe with the specified id exists or not. 

   ```js
      mapping(uint256 => Shoe) private shoes;

    mapping(uint256 => bool) private _exists;

        modifier exists(uint256 _index) {
        require(_exists[_index], "Query of a nonexistent shoe");
        _;
    }
    // checks if the input data for image and brand are non-empty values
    modifier checkInputData(string calldata _image, string calldata _brand) {
        require(bytes(_image).length > 0, "Empty image");
        require(bytes(_brand).length > 0, "Empty brand");
        _;
    }
    
   ```

Next line, we add our modifiers which are used to modify the behaviour of a function. You can read more about function modifiers  [(here)](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm).

For this tutorial we would be using the following modifiers:

- **modifier exists:** The exists modifier takes an unsigned integer parameter _index and checks if a shoe with the specified id exists. If it does not, the function throws an error with the message "Query of a nonexistent shoe".
- 
- **modifier checkInputData:** The checkInputData modifier takes two string parameters _image and _brand and checks if the input data for both of them are non-empty values. If either of them is an empty value, the function throws an error with the message "Empty image" or "Empty brand" accordingly.

In the next session of this tutorial, we would add a function that will enable users to add shoes to the smart contract.
  
```js
      function addShoe(
        string calldata _image,
        string calldata _brand,
        string calldata _size,
        uint256 _price
    ) public checkInputData(_image, _brand) {
        require(bytes(_size).length > 0, "Empty size");
        uint256 _sold = 0;
        uint256 index = shoesLength;
        shoesLength++;
        shoes[index] = Shoe(
            payable(msg.sender),
            _image,
            _brand,
            _size,
            _price,
            _sold
        );
        _exists[index] = true;
    }
```
This function would help us to add a shoe to the list of shoes in the contract. The function takes four input parameters: _image, _brand, _size, and _price.

Before executing the body of the function, the checkInputData modifier is applied to the function to check if the input data for _image and _brand are non-empty values. If either of them is an empty value, the function throws an error with the message "Empty image" or "Empty brand".

The function then checks if the input data for _size is a non-empty value. If it's an empty value, the function throws an error with the message "Empty size".

A new shoe is then added to the shoes mapping by incrementing the shoesLength counter and creating a new Shoe struct with the specified information. The address of the `msg.sender` is set as the owner of the shoe. The _exists mapping is updated to indicate that a shoe with this id exists.

In the next session, we would add our read function that will help return a value when it's been called.


```js
          function readShoe(uint256 _index)
        public
        view
        exists(_index)
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        return (
            shoes[_index].owner,
            shoes[_index].image,
            shoes[_index].brand,
            shoes[_index].size,
            shoes[_index].price,
            shoes[_index].sold
        );
    }
```
This function takes an input parameter _index which is the id of the shoe to retrieve information about.

The exists modifier is applied to the function to check if a shoe with the specified id exists. If it does not, the function throws an error with the message "Query of a nonexistent shoe".

The function is declared as a view function (public view) meaning that it only retrieves information from the contract's storage and does not modify any data. The function is also declared to return a tuple of six values, including the owner's address, the image, brand, size, price, and sold count of the specified shoe.

Finally, the function returns the values of the specified shoe from the shoes mapping.


Furthermore, we add a function that will enable users to buy shoes from the smart contract.

```js
     function buyShoe(uint256 _index) public payable exists(_index) {
        Shoe storage currentShoe = shoes[_index];
        require(currentShoe.owner != msg.sender, "You can't buy your own shoe");
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                currentShoe.owner,
                currentShoe.price
            ),
            "Transfer failed."
        );
        currentShoe.sold++;
    }
```

 This is to allow a user to purchase a specific shoe. The function takes an input parameter _index which is the id of the shoe to purchase.

The exists modifier is applied to the function to check if a shoe with the specified id exists. If it does not, the function throws an error with the message "Query of a nonexistent shoe".

The function starts by storing the specified shoe in the currentShoe storage variable. Then it checks if the buyer is not the owner of the shoe. If the buyer is the owner, the function throws an error with the message "You can't buy your shoe".

Next, the function transfers the price of the shoe from the buyer to the owner using the transferFrom method of the IERC20 token contract at the cUsdTokenAddress. If the transfer fails, the function throws an error with the message "Transfer failed".

Finally, the function increments the sold property of the shoe.


In the next session, we would be adding a function that will enable users to update the image and brand of the shoe.

```js
 function updateShoe(
        uint256 _index,
        string calldata _newImage,
        string calldata _newBrand
    ) public exists(_index) checkInputData(_newImage, _newBrand) {
        require(
            msg.sender == shoes[_index].owner,
            "Only the shoe owner can update the shoe's details"
        );
        Shoe storage currentShoe = shoes[_index];
        currentShoe.image = _newImage;
        currentShoe.brand = _newBrand;
    }
```
This particular function allows the owner of a shoe to update the image and brand of the shoe. The function takes in three input parameters: _index, which is the id of the shoe to update, _newImage, and _newBrand which are the new values for the image and brand of the shoe respectively.

The function starts by applying the exists modifier to check if a shoe with the specified id exists. If it does not, the function throws an error with the message "Query of a nonexistent shoe".

The function then applies the checkInputData modifier to check if the input data for the new image and brand are non-empty values. If they are not, the function throws an error with either the message "Empty image" or "Empty brand".

Next, the function checks if the caller of the function is the owner of the shoe. If they are not, the function throws an error with the message "Only the shoe owner can update the shoe's details".

The function then stores the specified shoe in the currentShoe storage variable. Finally, it updates the image and brand properties of the shoe with the new values _newImage and _newBrand respectively.
 
 In the final section of the smart contract, we would create a function to get the length of the shoe arrays.

 ```js
  function getProductsLength() public view returns (uint256) {
        return (shoesLength);
    }
 ```

 Below is the full code to this session:

 ```js
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

contract Marketplace {
    uint256 internal shoesLength = 0;

    address internal cUsdTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
         

    struct Shoe {
        address payable owner;
        string image;
        string brand;
        string size;
        uint256 price;
        uint256 sold;
    }
    mapping(uint256 => Shoe) private shoes;

    mapping(uint256 => bool) private _exists;

    // check if a shoe with id of _index exists
    modifier exists(uint256 _index) {
        require(_exists[_index], "Query of a nonexistent shoe");
        _;
    }
    // checks if the input data for image and brand are non-empty values
    modifier checkInputData(string calldata _image, string calldata _brand) {
        require(bytes(_image).length > 0, "Empty image");
        require(bytes(_brand).length > 0, "Empty brand");
        _;
    }

    function addShoe(
        string calldata _image,
        string calldata _brand,
        string calldata _size,
        uint256 _price
    ) public checkInputData(_image, _brand) {
        require(bytes(_size).length > 0, "Empty size");
        uint256 _sold = 0;
        uint256 index = shoesLength;
        shoesLength++;
        shoes[index] = Shoe(
            payable(msg.sender),
            _image,
            _brand,
            _size,
            _price,
            _sold
        );
        _exists[index] = true;
    }

    function readShoe(uint256 _index)
        public
        view
        exists(_index)
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        return (
            shoes[_index].owner,
            shoes[_index].image,
            shoes[_index].brand,
            shoes[_index].size,
            shoes[_index].price,
            shoes[_index].sold
        );
    }

          function buyShoe(uint256 _index) public payable exists(_index) {
        Shoe storage currentShoe = shoes[_index];
        require(currentShoe.owner != msg.sender, "You can't buy your own shoe");
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                currentShoe.owner,
                currentShoe.price
            ),
            "Transfer failed."
        );
        currentShoe.sold++;
    }

   

    function getProductsLength() public view returns (uint256) {
        return (shoesLength);
    }

     
    function updateShoe(
        uint256 _index,
        string calldata _newImage,
        string calldata _newBrand
    ) public exists(_index) checkInputData(_newImage, _newBrand) {
        require(
            msg.sender == shoes[_index].owner,
            "Only the shoe owner can update the shoe's details"
        );
        Shoe storage currentShoe = shoes[_index];
        currentShoe.image = _newImage;
        currentShoe.brand = _newBrand;
    }
}
 ```

 ## Contract Deployment

To deploy the contract, we would need:
1. [CeloExtensionWallet]((https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en))
2. [Celo Faucet](https://celo.org/developers/faucet) 
3. Celo Remix Plugin

Download the Celo Extension Wallet from the Google chrome store using the link above. After doing that, create a wallet, and store your key phrase in a very safe place to avoid permanently losing your funds.

After downloading and creating your wallet, you will need to fund it using the Celo Faucet. Copy the address to your wallet, click the link to the faucet above, and paste the address into the text field and confirm.

Next up, on Remix, download and activate the celo plugin from the plugin manager. Connect your wallet and deploy your contract.

 ## Conclusion

 Good job on successfully creating a smart contract for selling shoes on the celo blockchain, Congratulations on your achievement! 🎉

 ### Next Steps

I hope you have gained a lot of valuable information from this tutorial. If you're interested in furthering your learning, here are some helpful links to explore:

The official Celo documentation: https://docs.celo.org/

Solidity By Example, a website with code examples for learning Solidity: https://solidity-by-example.org/

OpenZeppelin Contracts, a library of secure, tested smart contract code: https://www.openzeppelin.com/contracts/

Solidity documentation for version 0.8.17: https://docs.soliditylang.org/en/v0.8.17/

I hope these resources prove to be useful to you!

### About the author

My name is David Ikanji, and I'm a web3 developer based in Nigeria. I have a passion for working with blockchain technology.

### References

These are the references used in the tutorial:

Web3.Storage documentation: https://web3.storage/docs/

Celo ContractKit documentation: https://docs.celo.org/developer/contractkit/

Official Celo documentation: https://docs.celo.org/

I hope this helps!





