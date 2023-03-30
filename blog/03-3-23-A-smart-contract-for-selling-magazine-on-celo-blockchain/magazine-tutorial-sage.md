---
title: A detailed guide on how to create a decentralized marketplace for magazines on the Celo blockchain
description: Learn how to build a marketplace for seliing magazine on the celo blockchain
authors:
  - name: Ogoyi Thompson
    title: Technical Writer
    url: https://github.com/Ogoyi
    image_url: https://avatars.githubusercontent.com/u/115812158?v=4
tags: [celosage, solidity, intermediate, celo]
hide_table_of_contents: true
slug: /tutorials/a-detailed-guide-on-how-to-create-a-decentralized-marketplace-for-magazines-on-the-Celo-blockchain
---

![header](../../src/data-tutorials/showcase/intermediate/A-detailed-guide-on-how-to-create-a-decentralized-marketplace-for-magazines-on-the-celo-blockchain.png)

## Introduction

Celo is a decentralized platform that enables developers to build and deploy smart contracts on it's blockchain. Smart contracts are self-executing contracts that strikes an agreement between buyer and seller to execute and event, which is directly written into lines of code. They can be used to automate a wide range of financial and non-financial transactions, such as the transfer of assets, the management of supply chains, and the execution of legal agreements.

Celo's smart contract functionality is centered on the Solidity programming language, also used by the Ethereum blockchain. This means developers familiar with Ethereum's smart contract ecosystem can easily migrate their projects to Celo.

One of the key benefits of Celo's smart contract platform is its focus on accessibility. Celo is designed to be mobile-first, which means that smart contracts can be created and executed directly from smartphones. This is a significant advantage in parts of the world where smartphones are the primary means of accessing the internet.

Celo's smart contract platform also includes several features designed to enhance security and transparency. For example, Celo uses a proof-of-stake consensus mechanism to secure the network, and smart contracts are executed in a sandboxed environment to prevent malicious actors from exploiting vulnerabilities.

Overall, Celo's smart contract platform is a powerful tool for developers looking to build decentralized applications on a mobile-first blockchain. By enabling the creation of secure and transparent smart contracts, Celo is working towards creating a more equitable and inclusive global financial system.

## Requirements

To follow this tutorial and create a smart contract on the Celo blockchain, you will need the following:

- **A code editor or text editor**: You can use any code editor or text editor of your choice, but for this tutorial, we will use Remix, a web-based IDE for Solidity development.

- **An internet browser**: You will need a web browser to access Remix and interact with the Celo blockchain.
- **A good internet connection**: As the Celo blockchain is decentralized and relies on a network of nodes to process transactions, a stable and reliable internet connection is important for smooth operation.

By having these requirements in place, you'll be ready to start building your first smart contract on the Celo blockchain using Remix.

## Prerequisites

In this tutorial, you will learn how to create a basic smart contract using remix. To learn smart contract development, you should have a basic knowledge of the following:

- **JavaScript**: A programming language used for web development, including building front-end user interfaces for dApps.
- **Blockchain**: The technology that underlies decentralized applications (dApps). You should have a basic understanding of how blockchain works, including concepts such as distributed ledgers, consensus mechanisms, and smart contracts.
- **Solidity**: A programming language used for writing smart contracts on the Celo blockchain. You should have a good understanding of Solidity's syntax and structure, as well as its key concepts such as functions, variables, events, and modifiers.

If you are new to these concepts, it's recommended that you take some time to learn them before attempting to build smart contracts. There are plenty of online resources available, including tutorials, videos, and documentation, that can help you get started. Once you have a basic understanding of these concepts, you can begin to learn how to write and deploy smart contracts on the blockchain.

## Who should take this course?

This course is designed for anyone who wants to get started with creating smart contracts on the Celo blockchain, regardless of their level of experience with blockchain technology or programming. It will provide a step-by-step guide to creating a simple smart contract on the Celo platform, with explanations of each component along the way. By the end of this course, you should have a clear understanding of how the Celo blockchain works and how to write and deploy a smart contract on the platform.

Great, let's get started!

To begin building your smart contract for buying and selling magazines on the Celo blockchain, follow these steps:

- Open the Remix development environment by clicking on this [link](https://remix.ethereum.org/). This is a popular development environment for writing and testing smart contracts on the Celo blockchains.

- Create a new file called "Magazine.sol" by clicking on the "+" button in the file explorer panel on the left-hand side of the screen.

- Open the "Magazine.sol" file and start by defining the necessary statements for the smart contract. This will include importing any necessary libraries or contracts and defining the contract itself.

```solidity
  // SPDX-License-Identifier: MIT
```

```
pragma solidity >=0.7.0 <0.9.0;
```

Note that we're using Solidity version >=0.7.0 <0.9.0 in this tutorial. You may need to adjust the version depending on your specific requirements.

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

The `IERC20Token` interface is a standard interface for implementing tokens on the Celo blockchains. It defines a set of functions that must be implemented by any contract that wants to be recognized as an ERC20 token. Let's break down the functions and events in this interface:

- **transfer**: This function allows users to transfer tokens from one address to another. It takes two arguments - the address of the recipient and the amount of tokens to be transferred. It returns a Boolean value indicating whether the transfer was successful or not.

-**approve**: This function is used to allow another address to spend tokens on behalf of the caller. It takes two arguments - the address of the spender and the amount of tokens to be approved. It returns a boolean value indicating whether the approval was successful or not.

- **transferFrom**: This function is used to transfer tokens from one address to another, on behalf of the owner. It takes three arguments the address of the owner, the address of the recipient, and the amount of tokens to be transferred. It returns a boolean value indicating whether the transfer was successful or not.

- **totalSupply**: This function returns the total supply of tokens that exist in circulation.

- **balanceOf**: This function returns the balance of tokens held by a particular address.

- **allowance**: This function returns the amount of tokens that a spender is allowed to spend on behalf of an owner.

- **Transfer**: This event is emitted when tokens are transferred from one address to another. It contains three parameters - the address of the sender, the address of the recipient, and the amount of tokens transferred.

- **Approval**: This event is emitted when the allowance of a spender to spend tokens on behalf of an owner is changed. It contains three parameters - the address of the owner, the address of the spender, and the amount of tokens approved.

You can interact with any ERC20 token on the Ethereum or Celo blockchains by including this interface in your smart contract code.

Next, we would be declaring the smart contract with the “Contract keyword, followed by the contract name `Magazino`

```solidity

contract Magazino {
     uint internal magazinesLength = 0;
      address internal cUsdTokenAddress =  0x686c626E48bfC5DC98a30a9992897766fed4Abd3;
       uint256 internal magazinesId = 0;
}
```

In the next line, we would declare an unsigned integer variable `named magazinesLength` and initializes it to 0. The internal keyword indicates that the variable can only be accessed within the smart contract and any derived contracts.

Next, we would declare an address variable named `cUsdTokenAddress` and initializes it with the value `0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1`. This value represents the address of the smart contract on the Celo blockchain. The internal keyword again indicates that this variable can only be accessed within the smart contract and any derived contracts.

Additionally, we declare an internal variable named `magazineId` of type uint256 and initialize its value to 0. This variable will be used for keeping track of the ID of magazines created by the contract or any contracts inherited from it.

Furthermore, we add `event` to the smart contract.

What is `event` in solidity?

An `event` is a way for a smart contract to emit a notification to external systems or applications about a specific action or state change that has occurred in the contract. The notification can include one or more parameters that provide additional information about the event.

```solidity

        event unpublishMagazineEvent(uint256 magazineId);
        event createMagazineEvent(
        string image,
        string name,
        string edition,
        uint price
    );
```

In this smart contract, the first event is named `unpublishMagazineEvent` and takes a single parameter magazineId of type uint256. This event will be used to emit when a magazine is unpublished or removed from the contract, and the magazineId parameter provides the identifier of the magazine that was unpublished.

The second event is named `createMagazineEvent` and takes four parameters: the `image` of type `string`, `name` of type `string`, `edition` of type `string`, and `price` of type `uint`. This event is emitted when a new magazine is created in the contract or any contracts that inherit from it. The parameters provide information about the magazine that was created including its `image`, `name`, `edition`, and `price`.

Next, we add our struct.

```solidity

   struct Magazine{
           address payable owner;
           string image;
           string name;
            string edition;
            uint price;
            uint256 magazineId;
             uint createdAt;
       }

```

A struct is a user-defined data type that can group together variables of different data types under a single name.

In this tutorial, the Magazine struct contains six variables:

- `owner` of type address `payable` - the Ethereum address of the owner of the magazine, declared as a payable address so that it can receive payments.
- `image` of type `string` - the image URL of the magazine.
- `name` of type `string` - the name of the magazine.
- `edition` of type `string` - the edition of the magazine.
- `price` of type `uint` - the price of the magazine in cUsd.
- `magazineId` of type `uint256` - the unique identifier of the magazine.
- `createdAt` of type `uint` - the timestamp when the magazine was created.

Together, these variables represent the properties of a magazine stored in the contract. This struct can be used to create new magazines, update existing ones, and retrieve information about them. For example, a function in the contract might create a new Magazine struct and add it to an array of magazines stored in the contract.

In the next step, we create our mapping.

```solidity
 mapping (uint =>  Magazine) internal magazines;
```

A mapping is a key-value store in Solidity that can be used to associate one value (the "value") with another (the "key"). In this case, the key is of type uint, and the value is of type Magazine, which is a user-defined struct that represents a magazine.

The internal visibility modifier specifies that this mapping can only be accessed within the contract or any contracts that inherit from it.

The mapping is named `magazines`, and it associates a Magazine `struct` with each `uint` key. This means that the contract can use an integer value (the "key") to look up a specific magazine (the "value") stored in the magazines mapping.

For example, if the mapping contains a Magazine `struct` with `magazineId` equal to `123`, the contract can access this struct by calling `magazines[123]`. This would return the Magazine struct associated with the key `123` in the mapping.

Up next, we would create a `getMagazine` function that will be used to retrieve data about a specific magazine in the contract.

```solidity
  function getMagazine(uint _index) public view returns (
        address payable,
        string memory,
        string memory,
        string memory,
        uint,
        uint256,
         uint256
) {
        return (
            magazines[_index].owner,
             magazines[_index].image,
              magazines[_index].name,
               magazines[_index].edition,
                magazines[_index].price,
                 magazines[_index].magazineId,
                  magazines[_index].createdAt


        );

    }
```

The function takes one input parameter \_index of type uint, which is the index of the magazine to retrieve from the magazines mapping.

The function is defined as public, which means it can be called by any external system or application that has access to the contract. The view modifier specifies that the function does not modify the state of the contract and only reads data from it, so it does not require any gas to execute.

The function returns seven values, which represent the properties of the magazine stored in the magazines mapping:

- `owner` of type `address` `payable` - the Ethereum address of the owner of the magazine, declared as payable so that it can receive payments.
- `image` of type `string` `memory` - the URL of the magazine's image.
- `name` of type `string` `memory` - the name of the magazine.
- `edition` of type `string` `memory` - the edition of the magazine.
- `price` of type `uint` - the price of the magazine in Ether or another cryptocurrency.
- `magazineId` of type `uint256` - the unique identifier of the magazine.
- `createdAt` of type `uint256` - the timestamp when the magazine was created.
  The values are returned as a tuple in the same order they are declared in the function definition.

When the function is called, it retrieves the magazine at the specified `_index` from the magazines mapping and returns the associated data to the caller. This function could be used by external systems or applications to retrieve specific magazine data from the contract.

Furthermore, we create a function that will be used to add magazines to the blockchain.

```solidity

           function addMagazine (
        string memory _image,
        string memory _name,
        string memory _edition,
        uint _price
         ) public {

              magazines [magazinesLength] =  Magazine(
            payable(msg.sender),
             _image,
             _name,
             _edition,
             _price,
             magazinesId,
             block.timestamp

              );
                emit createMagazineEvent(_image, _name, _edition, _price);

                magazinesLength++;
          magazinesId++;
         }
```

The function takes four input parameters:

- `_image` of type `string` `memory` - the URL or IPFS hash of the magazine's image.

- `_name` of type `string` `memory` - the name of the magazine.

- `_edition` of type `string` `memory` - the edition of the magazine.

- `_price` of type `uint` - the price of the magazine in cUsd.

The function is defined as `public`, which means it can be called by any external system or application that has access to the contract.

Inside the function, a new Magazine struct is created with the specified parameters and added to the magazines mapping at the index magazinesLength. The payable keyword is used to specify that the magazine owner's address is able to receive cUsd payments.

Then, the createMagazineEvent event is emitted with the specified parameters to indicate that a new magazine has been created. This event can be used to track the creation of new magazines in the contract.

Finally, the magazinesLength and magazinesId variables are incremented to keep track of the length of the magazines mapping and the ID of the next magazine to be created, respectively. This ensures that the next magazine added to the contract will have a unique ID.

Proceeding, we will need to create a function that enables a user to buy a magazine from our contract.

```solidity

          function buyMagazine(uint _index) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            magazines[_index].owner,
            magazines[_index].price
          ),
          "Transfer failed."
        );

        }
```

The function takes one input parameter `_index` of type `uint`, which represents the index of the magazine to be purchased from the magazines mapping.

The function is defined as public and payable, which means it can be called by any external system or application that has access to the contract, and cUsd must be sent along with the transaction to purchase the magazine.

Inside the function, a require statement is used to ensure that the transferFrom function call is successful. This function call transfers the price of the magazine from the buyer's address to the owner's address using the cUsdTokenAddress ERC20 token contract.

If the transferFrom function call fails, the error message "Transfer failed" is returned to the caller.

Otherwise, the magazine purchase is successful, and the buyer can access the magazine using the getMagazine function and passing in the \_index parameter to retrieve the magazine details.

In the final section of the smart contract, we would create a function to unpublish a magazine from the blockchain and also get the total magazines.

```solidity
  function unpublishMagazine(uint _index) external {
             require(msg.sender == magazines[_index].owner, "Only owner can unublish magazine");
            uint256 magazineId = magazines[_index].magazineId;
            magazines[_index] = magazines[magazinesLength - 1];
            delete magazines[magazinesLength - 1];

                  magazinesLength--;
                   emit unpublishMagazineEvent(magazineId);

}

  function getmagazineslength() public view returns (uint) {
        return (magazinesLength);
  }

```

The function takes one input parameter `_index` of type `uint`, which represents the index of the magazine to be unpublished from the magazines mapping.

The function is defined as external, which means it can only be called from outside the contract by an external system or application.

Inside the function, a require statement is used to ensure that the caller is the owner of the magazine being unpublished. If the caller is not the owner, the error message "Only owner can unpublish magazine" is returned to the caller.

Then, the magazineId variable is set to the ID of the magazine being unpublished. This variable is used to emit the unpublishMagazineEvent event later in the function.

The magazine to be unpublished is replaced with the magazine at the last index of the magazines mapping using the magazines[magazinesLength - 1] syntax. Then, the magazine at the last index is deleted using the delete keyword, which frees up storage space in the contract.

Finally, the magazinesLength variable is decremented to reflect the removal of the magazine from the magazines mapping. The unpublishMagazineEvent event is emitted with the magazineId parameter to indicate that the magazine has been unpublished from the contract.

Below is the complete code to this session:

```solidity
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

contract Magazino {
    uint internal magazinesLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    uint256 internal magazinesId = 0;

    event unpublishMagazineEvent(uint256 magazineId);
    event createMagazineEvent(string image, string name, string edition, uint price);

    struct Magazine {
        address payable owner;
        string image;
        string name;
        string edition;
        uint price;
        uint256 magazineId;
        uint createdAt;
    }

    mapping (uint => Magazine) internal magazines;

    function getMagazine(uint _index) public view returns (address payable, string memory, string memory, string memory, uint, uint256, uint256) {
        return (
            magazines[_index].owner,
            magazines[_index].image,
            magazines[_index].name,
            magazines[_index].edition,
            magazines[_index].price,
            magazines[_index].magazineId,
            magazines[_index].createdAt
        );
    }

    function addMagazine(string memory _image, string memory _name, string memory _edition, uint _price) public {
        magazines[magazinesLength] = Magazine(
            payable(msg.sender),
            _image,
            _name,
            _edition,
            _price,
            magazinesId,
            block.timestamp
        );
        emit createMagazineEvent(_image, _name, _edition, _price);
        magazinesLength++;
        magazinesId++;
    }

    function buyMagazine(uint _index) public payable {
        require(IERC20Token(cUsdTokenAddress).transferFrom(msg.sender, magazines[_index].owner, magazines[_index].price), "Transfer failed.");
    }

    function unpublishMagazine(uint _index) external {
        require(msg.sender == magazines[_index].owner, "Only owner can unpublish magazine");
        uint256 magazineId = magazines[_index].magazineId;
        magazines[_index] = magazines[magazinesLength - 1];
        delete magazines[magazinesLength - 1];
        magazinesLength--;
        emit unpublishMagazineEvent(magazineId);
    }

    function getmagazineslength() public view returns (uint) {
        return (magazinesLength);
    }
}

```

[Click here to get the complete code for this session](https://github.com/Ogoyi/Magazines)

## Contract deployment

To deploy the Magazine smart contract on the Celo blockchain, follow the steps below:

- **Install Celo Extension Wallet**: Download and install the Celo Extension Wallet from the Google Chrome store. Create a wallet and securely store your key phrase.

- **Fund your wallet**: Copy your wallet address and paste it into the Celo Faucet. Confirm the transaction to receive Celo tokens in your wallet.

- **Open Remix and create a new Solidity file**: Paste the Magazine contract code into the file. Ensure that the Solidity compiler is set to version 0.8.7 or later.

- **Compile the contract**: Click the "Compile Magazine.sol" button in the Solidity Compiler tab in Remix.

- **Deploy the contract**: In the "Deploy & Run Transactions" tab, select the Celo network from the dropdown menu. Connect your wallet to Remix by clicking "Connect to wallet". Select "Magazine" from the "Contract" dropdown menu. Click the "Deploy" button, confirm the transaction in your wallet, and wait for the transaction to be confirmed on the Celo blockchain.

- **Interact with the contract**: Once the transaction is confirmed, the FloralNft contract will be deployed on the Celo blockchain. You can interact with it using Remix.

## Conclusion

Great work on creating a smart contract for selling magazines on the Celo blockchain! Congratulations on your accomplishment! 🎉

## Next step

Great job! It's always helpful to provide additional resources for further learning. Don't hesitate to reach out if you have any more questions or if you need further assistance. Happy learning!

## About the author

My name is Ogoyi Thompson, and I'm a web3 developer based in Nigeria, you can connect with me on [twitter](https://twitter.com/thompsonogoyi). I am enthusiastic about working with blockchain technology.

## References

[Web3 Storage docs](https://web3.storage/docs/)

[Developer contract kit](https://docs.celo.org/developer/contractkit/)

[celo docs](https://https://docs.celo.org/)

Thank you!!
