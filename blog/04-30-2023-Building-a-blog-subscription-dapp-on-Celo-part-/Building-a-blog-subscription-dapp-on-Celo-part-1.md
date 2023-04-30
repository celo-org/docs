---
title: Building a blog subscription dapp on Celo part 1
description: Learn how to build a Celo-based blog subscription dapp in this comprehensive guide.
authors:
  - name: Maxwell Onyeka
    title: Technical Writer
    url: https://github.com/maxzysparks
    image_url: https://avatars.githubusercontent.com/u/80678178?v=4
tags: [celo, advanced, solidity, celosage]
hide_table_of_contents: true
slug: /tutorials/building-a-blog-subscription-dapp-on-celo-part-1
---

![header](../../src/data-tutorials/showcase/advanced/blog.png)

## Introduction

Hello, and welcome to the DecentralizedBlog contract! This is a decentralized Solidity smart contract that allows users to create and manage blog posts. The contract is built on the Ethereum blockchain and is intended to ensure the blog posts' transparency, security, and immutability.

The contract is made up of two main data structures: BlogPost and Subscriber. The BlogPost struct contains information about a blog post, such as the author's address, title, content, and likes. The Subscriber struct stores a subscriber's address as well as a flag indicating whether or not they are subscribed.

The contract allows users to create new blog posts as well as existing ones. When a new blog post is published, an event is triggered to notify subscribers. When a post is liked, an event is triggered to notify subscribers of the post's updated likes count.

The blog also allows users to subscribe and unsubscribe. Users can subscribe to receive notifications about new blog posts, and unsubscribe to stop receiving notifications.
Overall, this contract provides a secure and decentralized method of managing a blog while also ensuring that blog posts are immutable and transparent.

## Prerequisites

Before diving into the DecentralizedBlog contract tutorial, it's important to understand Solidity, the programming language used to create smart contracts on the Ethereum blockchain. Solidity is a high-level programming language designed specifically for the creation of smart contracts. It is highly recommended that you are familiar with object-oriented programming concepts such as variables, functions, structs, and events.

Furthermore, a basic understanding of the Ethereum blockchain and its underlying technologies, such as nodes, transactions, gas, and wallets, is required. Knowing how Ethereum works will help you understand the implications of deploying and executing smart contracts on the network.

## Requirements

- [Remix IDE](https://remix.ethereum.org/)
- [Celo Extension Wallet](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en)
- [Celo Faucet](https://faucet.celo.org/)

## Smart Contract

- Now let’s begin writing our smart contract on Remix, The complete contract code should look like this:

```solidity

// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

contract DecentralizedBlog {
    struct BlogPost {
        uint256 id;
        address author;
        string title;
        string content;
        uint256 likes;
    }
    struct Subscriber {
        address subscriberAddress;
        bool subscribed;
    }
    uint256 public totalPosts;
    mapping(uint256 => BlogPost) public blogPosts;
    mapping(address => Subscriber) public subscribers;
    event PostCreated(uint256 indexed id, address indexed author, string title, string content);
    event PostLiked(uint256 indexed id, address indexed liker);
    event SubscriberAdded(address indexed subscriber);
    event SubscriberRemoved(address indexed subscriber);
    function createPost(string memory _title, string memory _content) public {
        totalPosts++;
        BlogPost storage post = blogPosts[totalPosts];
        post.id = totalPosts;
        post.author = msg.sender;
        post.title = _title;
        post.content = _content;
        post.likes = 0;
        emit PostCreated(totalPosts, msg.sender, _title, _content);
    }
    function likePost(uint256 _postId) public {
        require(_postId <= totalPosts, "Post does not exist");
        BlogPost storage post = blogPosts[_postId];
        post.likes++;
        emit PostLiked(_postId, msg.sender);
    }
    function getPost(uint256 _postId) public view returns (uint256 id, address author, string memory title, string memory content, uint256 likes) {
        require(_postId <= totalPosts, "Post does not exist");
        BlogPost storage post = blogPosts[_postId];
        return (post.id, post.author, post.title, post.content, post.likes);
    }
    function getTotalPosts() public view returns (uint256) {
        return totalPosts;
    }
    function subscribe() public {
        require(!subscribers[msg.sender].subscribed, "You are already subscribed");
        subscribers[msg.sender] = Subscriber(msg.sender, true);
        emit SubscriberAdded(msg.sender);
    }
    function unsubscribe() public {
        require(subscribers[msg.sender].subscribed, "You are not subscribed");
        delete subscribers[msg.sender];
        emit SubscriberRemoved(msg.sender);
    }
    function isSubscribed(address _subscriber) public view returns (bool) {
        return subscribers[_subscriber].subscribed;
    }
}
```

- ### Set Up
  First, we declared our license and the solidity version

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;
```

- ### The DecentralizedBlog contract

```
contract DecentralizedBlog {
    struct BlogPost {
        uint256 id;
        address author;
        string title;
        string content;
        uint256 likes;
    }
```

The BlogPost struct is defined in the DecentralizedBlog contract. This struct contains information about a blog post, such as its ID, author's address, title, content, and likes. The struct is a custom data type that allows the contract to group related data into a single variable.

Each blog post is uniquely identified by the id variable, which is an unsigned integer. The author variable is an Ethereum address representing the post's author. The title and content variables are strings that contain the post's title and content, respectively. The likes variable is an unsigned integer that stores the number of likes received by the post.

The contract can efficiently manage and retrieve the details of each blog post by using this struct, making it easier for users to create, read, and interact with them.

- ### Struct

```solidity
    struct Subscriber {
        address subscriberAddress;
        bool subscribed;
    }

```

Another user-defined data type is the Subscriber struct, which is used to keep track of users who have subscribed to the DecentralizedBlog. There are two variables in this struct: subscriberAddress and subscribed.

The subscriberAddress variable is an Ethereum address that represents the subscriber's address. This variable enables the contract to keep track of the subscribers' email addresses and use them to notify them of new blog posts.

The subscribed variable is a boolean value indicating whether or not the subscriber has subscribed. If subscribed is set to true, the subscriber will receive notifications when new blog posts are published. The subscriber will not receive notifications if subscribed is false.

The DecentralizedBlog contract can efficiently manage the list of subscribers and send them notifications about new blog posts by using this Subscriber struct, making it easier for users to stay up-to-date with the latest content.

- ### Variable

```solidity
uint256 public totalPosts;
    mapping(uint256 => BlogPost) public blogPosts;
    mapping(address => Subscriber) public subscribers;
```

The first variable, totalPosts, is a public uint256. This variable is used to keep track of the total number of blog posts created in the DecentralizedBlog. As a public variable, anyone can access and read its value, making it simple to track the number of blog posts.

The second variable is a public mapping that converts uint256 to BlogPost structs. This mapping is known as blogPosts, and it is used to keep track of all the blog posts created in the DecentralizedBlog. Each blog post is uniquely identified by the uint256 key, and the corresponding value is the BlogPost struct, which contains all of the post's details.

Because this is a public mapping, anyone can access and read the values, making it simple to retrieve information about specific blog posts.

Another public mapping that maps Ethereum addresses to Subscriber structs is the third variable. This mapping is known as subscribers, and it is used to keep track of all DecentralizedBlog subscribers. Each subscriber is uniquely identified by the Ethereum address key, and the corresponding value is the Subscriber struct, which contains information about the user's subscription status.

- ### Events

```solidity
event PostCreated(uint256 indexed id, address indexed author, string title, string content);
    event PostLiked(uint256 indexed id, address indexed liker);
    event SubscriberAdded(address indexed subscriber);
    event SubscriberRemoved(address indexed subscriber);

```

Events allow the DecentralizedBlog contract to communicate with the outside world and notify other parties about important contract actions. Events are similar to signals that are emitted when certain actions occur and can be detected by external applications or user interfaces.

The first event, PostCreated, is triggered whenever a new blog post is created in the DecentralizedBlog. This event has four parameters: the post's ID, the author's Ethereum address, the post's title, and the post's content. The contract can notify external parties about new blog posts and provide them with post details by emitting this event.

The second event, PostLiked, is emitted whenever a user likes a blog post on the DecentralizedBlog. This event has two parameters: the ID of the liked post and the Ethereum address of the user who liked it. The contract can notify external parties about which blog posts are popular and who is liking them by emitting this event.

SubscriberAdded is the third event, and it is emitted whenever a new user subscribes to the DecentralizedBlog. This event has one parameter: the Ethereum address of the subscriber. The contract can notify external parties about new subscribers and provide them with the user's address by emitting this event.

The fourth event, SubscriberRemoved, is triggered when a user unsubscribes from the DecentralizedBlog. This event has one parameter: the Ethereum address of the unsubscribed user. The contract can notify external parties about users who are no longer subscribed to the blog by emitting this event.

- ### Function createPost

```solidity

    function createPost(string memory _title, string memory _content) public {
        totalPosts++;
        BlogPost storage post = blogPosts[totalPosts];
        post.id = totalPosts;
        post.author = msg.sender;
        post.title = _title;
        post.content = _content;
        post.likes = 0;
        emit PostCreated(totalPosts, msg.sender, _title, _content);
    }

```

The `createPost` function allows a user to create a new blog post in the DecentralizedBlog.

When called, the function first increments the `totalPosts` variable to keep track of the contract's total number of posts. It then generates a new `BlogPost` struct and stores it in the `blogPosts` mapping, with `totalPosts` as the key.

The function then sets the values of the following fields in the `BlogPost` struct: the post ID, the author's Ethereum address (retrieved from `msg.sender`), the post title, the post content, and the initial number of likes (which is set to zero).

Finally, the function fires the `PostCreated` event, which takes as parameters the post ID, the author's Ethereum address, the title of the post, and the content of the post. By sending out this event, the function informs the outside world that a new blog post has been created and provides the post's details.

- ### Function likePost

```solidity
 function likePost(uint256 _postId) public {
        require(_postId <= totalPosts, "Post does not exist");
        BlogPost storage post = blogPosts[_postId];
        post.likes++;
        emit PostLiked(_postId, msg.sender);
    }

```

The function allows users to like a blog post by increasing the number of `likes` on the post. The function requires a single input parameter, `_postId`, which is the unique identifier of the blog post to be liked.

The function's first line contains a `require` statement that determines whether the `_postId` is a valid post id. If the `_postId` is greater than the total number of posts (`totalPosts`), an error message is displayed informing the user that the post does not exist.

The function then uses the `_postId` as the key to retrieve the corresponding `BlogPost` object from the `blogPosts` mapping. It then increases the post object's `likes` count.

Finally, the function fires an event called `PostLiked`, which takes as arguments the `_postId` and the address of the user who liked the post (`msg.sender`). Any interested party on the blockchain network can listen to this event to determine when a post has been liked.

- ### Function getPost

```solidity
 function getPost(uint256 _postId) public view returns (uint256 id, address author, string memory title, string memory content, uint256 likes) {
        require(_postId <= totalPosts, "Post does not exist");
        BlogPost storage post = blogPosts[_postId];
        return (post.id, post.author, post.title, post.content, post.likes);
    }

```

Anyone can use the `getPost` function to retrieve information about a specific blog post in the DecentralizedBlog. When called, the function accepts the `uint256` parameter `_postId`, which represents the ID of the post to be retrieved.

Before returning the post details, the function determines whether the provided post ID is valid (i.e., it must be less than or equal to `totalPosts`). If the provided post ID is invalid, the function will return an error stating "Post does not exist."

Assuming the provided post ID is correct, the function retrieves the corresponding `BlogPost` struct from the `blogPosts` mapping and stores it in a variable called `post`. The function then returns the values of the post struct's `id`, `author`, `title`, `content`, and `likes` fields as a tuple, allowing the caller to retrieve all relevant details about the `post` in a single function call.

- ### Function getTotalPost

```solidity
function getTotalPosts() public view returns (uint256) {
        return totalPosts;
    }

```

The `getTotalPosts` function is a straightforward getter function that allows anyone to retrieve the total number of blog posts created in the DecentralizedBlog contract.

When invoked, the function simply returns the value of the `totalPosts` variable, a public `uint256` variable that keeps track of the total number of blog posts created. This function is useful for providing a quick overview of the current state of the contract as well as for other functions that may require the total number of posts to be referenced.

- ### Function subscribe

```solidity
 function subscribe() public {
        require(!subscribers[msg.sender].subscribed, "You are already subscribed");
        subscribers[msg.sender] = Subscriber(msg.sender, true);
        emit SubscriberAdded(msg.sender);
    }

```

Anyone can subscribe to the DecentralizedBlog contract using the `subscribe` function.
When called, the function first verifies that the `subscribed` flag of the `Subscriber` struct associated with the caller's address is set to false to see if the caller is already subscribed. If the caller is not `subscribed`, the function sets the subscribed flag to `true` and adds a new entry to the `subscribers` mapping with the address of the caller as the key and a new `Subscriber` struct as the value.

Finally, the function fires the `SubscriberAdded` event to notify the contract that a new subscriber has been added. This function is useful for keeping users informed of new blog posts as they are created by the authors.

- ### Function unsubscribe

```solidity
  function unsubscribe() public {
        require(subscribers[msg.sender].subscribed, "You are not subscribed");
        delete subscribers[msg.sender];
        emit SubscriberRemoved(msg.sender);
    }

```

This function allows a user to opt out of receiving notifications from the Decentralized Blog. When a user calls `unsubscribe()`, the function first determines whether or not the user is currently subscribed. If they are not subscribed, the page will revert with an error message.

If the user is a subscriber, the function will delete their subscriber information from the `subscribers` mapping, effectively removing them from the subscriber list. The function then generates a `SubscriberRemoved` event to notify others that the user has unsubscribed.

- ### Function isSubscribed

```
 function isSubscribed(address _subscriber) public view returns (bool) {
        return subscribers[_subscriber].subscribed;
    }
}

```

The last function, `isSubscribed` checks whether a given address is subscribed to the blog or not. It takes an address `_subscriber` as input and returns a boolean value indicating whether the address is subscribed or not. The function simply retrieves the `subscribed` value from the `Subscriber` struct associated with the given `_subscriber` address using the `subscribers` mapping and returns it. This function can be used to check whether an address is subscribed before allowing them to perform certain actions, such as posting or liking a post.

## Deployment

- To deploy our smart contract successfully, we need the Celo extension wallet, which can be downloaded from [here](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en)

- Next, we need to fund our newly created wallet, which can be done using the Celo Alfajores faucet [here](https://celo.org/developers/faucet)

- You can now fund your wallet and deploy your contract using the Celo plugin in Remix.

### Conclusion

To summarize, we have just looked into the Decentralized Blog smart contract. We learned how to use the Ethereum blockchain to build a decentralized blogging platform where users can create, read, like, and subscribe to blog posts in a secure and transparent manner. We've seen how to use Solidity to define and implement the data structures and functions required for the smart contract to function.

The code we created is only the tip of the iceberg; it can be expanded and customized to meet specific needs and use cases. You are now prepared to build more complex and innovative decentralized applications using Solidity and the Ethereum blockchain, thanks to the knowledge gained in this tutorial. Have fun coding!

### Next Steps

- [Celo-Docs](https://docs.celo.org/)
- [Solidity](https://docs.soliditylang.org/en/v0.8.17/)
- [Code-Repo](https://github.com/maxzysparks/blog-max)

### About the author

**Maxwell Onyeka** is a results-driven manager as well as a marketing and technical writing expert. I've spent the last five years honing my skills in building paid and organic marketing funnels for SaaS companies. Furthermore, I am a skilled Web 3 technical writer, allowing me to create compelling content that drives business growth. [LinkedIn](https://www.linkedin.com/in/maxwell-onyeka-3b4b1118b/) [Github](https://github.com/maxzysparks)
