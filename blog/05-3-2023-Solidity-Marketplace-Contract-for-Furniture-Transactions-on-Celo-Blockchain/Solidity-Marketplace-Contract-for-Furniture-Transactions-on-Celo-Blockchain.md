---
title: Solidity Marketplace Contract for Furniture Transactions on Celo Blockchain
description: The MarketPlace contract enables decentralized buying and selling of furniture items using cUSD tokens. It ensures secure and transparent transactions within the marketplace.
authors:
  - name: Adama Ebenezer
    title: Technical Writer
    url: https://github.com/Adam-eben
    image_url: https://avatars.githubusercontent.com/u/115812158?v=4
tags: [celosage, solidity, intermediate, celo]
hide_table_of_contents: true
slug: /tutorials/a-decentralized-social-network-that-rewards-users-for-their-content-and-participation-on-the-celo-blockchain
---

## INTRODUCTION

In this tutorial, we will be building a decentralized marketplace contract called MarketPlace. The contract allows users to buy and sell furniture items using the cUSD token. Users can add furniture items to the marketplace by providing details such as the image, description, edition, size, and price. Other users can then purchase these furniture items using the cUSD token. The contract ensures secure and transparent transactions within the marketplace. Additionally, the contract provides functionalities to retrieve furniture details, delete furniture items, and get the total number of furniture items listed in the marketplace. Through this tutorial, we will explore the implementation of a decentralized marketplace for furniture trading, leveraging the power of smart contracts and the Celo blockchain.

## REQUIREMENT

To successfully follow this tutorial, you will need:

- A code editor or text editor, such as Remix or any other Solidity development environment.

- An internet browser and a reliable internet connection to access the necessary tools and resources.

By having these tools ready, you can effectively write, compile, and deploy the MarketPlace contract in the subsequent steps of this tutorial.

## PREREQUISITE

To successfully complete this tutorial, it is recommended that you have the following:

- Familiarity with the JavaScript programming language, as it will help you understand the concepts and syntax used in the code.

- A basic understanding of blockchain technology and how it works, including concepts like smart contracts and decentralized applications.

- Basic knowledge of the Solidity programming language, which is used for developing smart contracts on the Ethereum blockchain. This includes understanding data types, functions, and contract deployment.

Having these prerequisites will enable you to grasp the concepts and follow the steps in this tutorial more effectively. However, even if you are new to these topics, the tutorial will provide explanations and guidance to help you understand and learn along the way.

To start this tutorial, we will utilize the Remix IDE as our development environment to write the smart contract. Let's begin the process by setting up Remix and creating our contract.

The complete code for this tutorial:

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

contract MarketPlace {
    uint internal furnituresLength = 0;
    address internal cUsdTokenAddress =   0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    

    struct FurnitureData {
        address payable owner;
        string image;
        string description;
        string edition;
        uint size;
        uint price;
    }

    mapping (uint => FurnitureData) internal furnitures;


    function owner() public view returns (address) {
    return address(this);
}


    function getFurniture(uint _index) public view returns (FurnitureData memory) {
        return furnitures[_index];
    }

    function addFurniture (
        string memory _image,
        string memory _description,
        string memory _edition,
        uint _size,
        uint _price
    ) public {
        FurnitureData memory newFurniture = FurnitureData(
            payable(msg.sender),
            _image,
            _description,
            _edition,
            _size,
            _price
        );
        furnitures[furnituresLength] = newFurniture;
        furnituresLength++;
    }

    function PurchaseFurniture(uint _index) public payable  {
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                furnitures[_index].owner,
                furnitures[_index].price
            ),
            "Transfer failed."
        );
    }

    function getfurnitureslength() public view returns (uint) {
        return (furnituresLength);
    }


    function deleteFurniture(uint _index) public {
    require(_index < furnituresLength, "Invalid furniture index.");

    // Only the owner of the furniture or the contract owner can delete a furniture item
    require(
        msg.sender == furnitures[_index].owner || msg.sender == owner(),
        "Unauthorized deletion."
    );

    //this will Move the last element in the mapping to the deleted index, and delete the last element
    uint lastIndex = furnituresLength - 1;
    furnitures[_index] = furnitures[lastIndex];
    delete furnitures[lastIndex];
    furnituresLength--;
}

}
```

Step 1: Specify the License

```solidity
 // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
```

To begin, let's specify the license for the code. We will use the MIT license, which grants permissions for various use cases. By specifying the license, we establish the terms under which the code can be used, modified, and distributed. This step ensures clarity and transparency regarding the usage of the codebase.

Step 2: Define the ERC-20 Token Interface

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

In this step, we define an interface called IERC20Token. The interface serves as a blueprint for interacting with ERC-20 tokens. It includes functions such as `transfer`, `approve`, and `transferFrom`, which enable token transfers between addresses and manage allowances for delegated transfers. Additionally, the interface provides functions like `totalSupply` and `balanceOf` to retrieve information about the token supply and individual token balances. Events like `Transfer` and `Approval` are also defined to emit notifications for token transfers and approvals. By defining this interface, we establish a common set of methods and events for interacting with ERC-20 tokens, promoting compatibility and interoperability among different token contracts.


