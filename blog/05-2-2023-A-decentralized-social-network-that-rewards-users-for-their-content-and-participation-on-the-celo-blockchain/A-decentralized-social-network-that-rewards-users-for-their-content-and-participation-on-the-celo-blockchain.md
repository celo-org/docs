---
title: A decentralized social network that rewards users for their content and participation on the Celo blockchain
description:  Introducing a game-changing social network on the Celo blockchain. Users create and share quality content in a secure, transparent environment.
authors:
  - name: Ogoyi Thompson
    title: Technical Writer
    url: https://github.com/Ogoyi
    image_url: https://avatars.githubusercontent.com/u/115812158?v=4
tags: [celosage, solidity, intermediate, celo]
hide_table_of_contents: true
slug: /tutorials/a-detailed-guide-on-how-to-create-a-decentralized-marketplace-for-magazines-on-the-Celo-blockchain
---

## INTRODUCTION

This project is a decentralized social network built on the Celo blockchain. It allows users to create and share posts with a reward system based on the number of likes received. The platform uses smart contracts to ensure transparency and security. Users can like posts created by others, earning them rewards in the form of CELO tokens. The tutorial will guide users on how to interact with the contract, create posts, like posts, and retrieve information about posts.

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

contract DecentralizedSocialNetwork {
    using SafeMath for uint256;

    struct Post {
        address payable owner;
        string content;
        uint256 likes;
        uint256 rewards;
    }

    uint256 internal postCount = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    uint256 internal rewardPerLike = 1e18; // 1 CELO

    mapping(uint256 => Post) internal posts;

    function createPost(string memory _content) public {
        Post storage newPost = posts[postCount];
        newPost.owner = payable(msg.sender);
        newPost.content = _content;
        newPost.likes = 0;
        newPost.rewards = 0;

        postCount++;
    }

    function getPost(uint256 _postId) public view returns (
        address payable,
        string memory,
        uint256,
        uint256
    ) {
        require(_postId < postCount, "Invalid post ID");

        Post memory post = posts[_postId];
        return (
            post.owner,
            post.content,
            post.likes,
            post.rewards
        );
    }

    function likePost(uint256 _postId) public {
        require(_postId < postCount, "Invalid post ID");

        Post storage post = posts[_postId];
        require(post.owner != msg.sender, "You cannot like your own post");

        post.likes = post.likes.add(1);
        post.rewards = post.rewards.add(rewardPerLike);

        IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            post.owner,
            rewardPerLike
        );
    }

    function getPostCount() public view returns (uint256) {
        return postCount;
    }
}

 ```

 ```solidity
  // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
 ```

To begin, we start by specifying the license for the code using the MIT license, which grants permission for various use cases.

Next, we use the `pragma` statement to specify the version of Solidity that the code is compatible with. This ensures that the code is compiled using the correct Solidity version, avoiding any potential compatibility issues.

We then import the SafeMath library from the `OpenZeppelin` contract library. The SafeMath library provides secure arithmetic operations to prevent common vulnerabilities like overflow and underflow in our contract. By using SafeMath, we can perform mathematical operations safely and avoid potential security risks.

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

In this session, we have an interface called `IERC20Token` that we can use as a blueprint for implementing `ERC-20` token contracts. The interface defines a set of functions and events that allow us to interact with ERC-20 tokens.

By implementing this interface in our own contract, we ensure that our contract is compatible with other contracts and systems that interact with ERC-20 tokens. We can use the defined functions, such as `transfer`, `approve`, and `balanceOf`, to perform token `transfers`, `approvals`, and `balance` inquiries.

The events defined in the interface, such as `Transfer` and `Approval`, allow us to emit events when token transfers or approvals occur. This enables other contracts and external systems to track and react to these events.

Using the IERC20Token interface, we can create contracts that seamlessly interact with ERC-20 tokens, making our contracts more interoperable and compatible with the wider Ethereum ecosystem.

```solidity
contract DecentralizedSocialNetwork {
    using SafeMath for uint256;

    struct Post {
        address payable owner;
        string content;
        uint256 likes;
        uint256 rewards;
    }

    uint256 internal postCount = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    uint256 internal rewardPerLike = 1e18; // 1 CELO

    mapping(uint256 => Post) internal posts;
```

In this session, we will create a contract called DecentralizedSocialNetwork. This contract represents a decentralized social network on the Celo blockchain, which we aim to build.

Within the contract, we have defined a `struct` called `Post`. This struct represents the structure of each post in our social network. Each post consists of properties such as `owner`, `content`, `likes`, and `rewards`.

To keep track of the posts, we have an internal variable called `postCount`. This variable helps us count the number of posts that have been created so far. Additionally, we store the address of the CELO-based token used for rewards in the `cUsdTokenAddress` variable. The `rewardPerLike` variable determines the amount of reward given for each like, represented in CELO tokens.

To store and access posts, we use a `mapping` called posts. This mapping allows us to associate a post `ID` with its corresponding Post struct.

To add more functionality to our smart contract, we will be implementing various functions.

```solidity
function createPost(string memory _content) public {
        Post storage newPost = posts[postCount];
        newPost.owner = payable(msg.sender);
        newPost.content = _content;
        newPost.likes = 0;
        newPost.rewards = 0;

        postCount++;
    }
```

To allow users to create posts in our decentralized social network, we need to implement the `createPost` function.

The `createPost` function takes a parameter `_content`, which represents the content of the post that the user wants to create.

Inside the function, we create a new Post instance and store it in the posts mapping using the `postCount` as the key. We set the properties of the new post, including the owner `(set as the address of the sender)`, the content, likes (initially set to 0), and rewards `(initially set to 0)`.

After setting the properties, we `increment` the `postCount` variable to keep track of the number of posts created.

By implementing this function, users can create posts in our decentralized social network by providing the content of the post they want to share.

```solidity
 function getPost(uint256 _postId) public view returns (
        address payable,
        string memory,
        uint256,
        uint256
    ) {
        require(_postId < postCount, "Invalid post ID");

        Post memory post = posts[_postId];
        return (
            post.owner,
            post.content,
            post.likes,
            post.rewards
        );
    }
```
