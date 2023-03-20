---
title: Song Marketplace Contract with ERC-20 Token Integration
description: The Song Marketplace Contract with ERC-20 Token Integration is a smart contract built on the Celo blockchain that enables users to buy and sell songs using a stablecoin ERC-20 token called "cUSD".
authors:
  - name: Ogoyi Thompson
    title: Technical Writer
    url: https://github.com/Ogoyi
    image_url: https://avatars.githubusercontent.com/u/115812158?v=4
tags: [celosage, solidity, intermediate, celo]
hide_table_of_contents: true
slug: /tutorials/song-marketplace-contract-with-ERC-20-token-integration
---

![header](../../src/data-tutorials/showcase/intermediate/song-marketplace-contract-with-ERC-20-token-integration.png)

## Introduction

In this tutorial, we will delve into the realm of creating a marketplace for selling songs on the Celo blockchain. We will focus on developing a smart contract that facilitates the sale and management of songs for cUSD. This guide will introduce you to the concept of blockchain-based music marketplaces, and walk you through the steps of setting up and utilizing this type of application. By the end of this tutorial, you will possess the knowledge and abilities necessary to construct and utilize your own cUSD-based marketplace for selling songs on the Celo blockchain. Let's begin!

## Requirement:

To proceed with this tutorial, you will need the following:

- A code editor or text editor, such as Remix, to write and edit code.

- A reliable internet browser and a stable internet connection to access the necessary resources and interact with the Celo blockchain.

## PREREQUISITE:

Before starting this tutorial, it is recommended that you have:

- A basic understanding of the JavaScript programming language.

- Familiarity with blockchain technology and how it operates.

- Basic knowledge of Solidity, the programming language used for developing smart contracts on the blockchain.

## What we will be building

We will be creating a smart contract for a song marketplace using Remix for developing our smart contract.

The complete code:

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

contract SongMarketplace {
uint internal songsLength = 0;
address internal cUsdTokenAddress = 0x686c626E48bfC5DC98a30a9992897766fed4Abd3;
uint256 internal songId = 0;
    event unpublishSongEvent(uint256 songId);
    event createSongEvent(
    string url,
    string name,
    string artist,
    uint price
);


   struct Song{
       address payable owner;
       string url;
       string name;
        string artist;
        uint price;
        uint256 songId;
         uint createdAt;
   }

    mapping (uint =>  Song) internal songs;

    function getSong(uint _index) public view returns (
    address payable,
    string memory,
    string memory,
    string memory,
    uint,
    uint256,
     uint256


     ) {
    return (
        songs[_index].owner,
         songs[_index].url,
          songs[_index].name,
           songs[_index].artist,
            songs[_index].price,
             songs[_index].songId,
              songs[_index].createdAt


    );

}

       function addSong (
    string memory _url,
    string memory _name,
    string memory _artist,
    uint _price
     ) public {

          songs [songsLength] =  Song(
        payable(msg.sender),
         _url,
         _name,
         _artist,
         _price,
         songId,
         block.timestamp

          );
            emit createSongEvent(_url, _name, _artist, _price);

            songsLength++;
      songId++;
     }


      function buySong(uint _index) public payable  {
    require(
      IERC20Token(cUsdTokenAddress).transferFrom(
        msg.sender,
        songs[_index].owner,
        songs[_index].price
      ),
      "Transfer failed."
    );



}
function getSongIdsByArtist(string memory _artist) public view returns (uint[] memory) {
    uint[] memory songIds = new uint[](songsLength);
    uint count = 0;

    for (uint i = 0; i < songsLength; i++) {
        if (keccak256(bytes(songs[i].artist)) == keccak256(bytes(_artist))) {
            songIds[count] = songs[i].songId;
            count++;
        }
    }

    uint[] memory result = new uint[](count);
    for (uint i = 0; i < count; i++) {
        result[i] = songIds[i];
    }

    return result;
}

function deleteSong(uint _index) public {
    require(_index < songsLength, "Invalid song index");
    require(msg.sender == songs[_index].owner, "Only song owner can delete the song");

    // Remove the song from the mapping
    delete songs[_index];

    // Emit an event to indicate that the song has been unpublished
    emit unpublishSongEvent(_index);
}


function getSongsLength() public view returns (uint) {
return (songsLength);
}

}

```

Now try to compile your smart contract to see if it is working fine. [Github repo](https://github.com/Ogoyi/Song-Marketplace-Contract-with-ERC-20-Token-Integration)

To begin, we need to create a new file named `SongMarketplace.sol` on Remix. You can refer to the documentation on how to create a new file on Remix. [(here)](https://remix-ide.readthedocs.io/en/latest/file_explorer.html#:~:text=Creating%20new%20files,-There%20are%202&text=The%20first%20is%20to%20click,will%20open%20in%20the%20Editor.).

Once we have created a new file, the next step is to define some statements in our smart contract.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
```

The statement `SPDX-License-Identifier`: `MIT` is used to identify the type of license under which the code is released. The license in this case is the MIT License. This is done using the SPDX (Software Package Data Exchange) identifier, which is a standardized method for identifying open-source licenses.

The next line is where we specify the version of the Solidity programming language that our smart contract is written in. In this case, we're using version 0.7.0 or later, but no later than 0.9.0. This is important because different versions of Solidity have different features and syntax, so it's crucial to use the correct version to ensure that our code works as intended.

Following that, we include the interface for our ERC20 token.

```solidity
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

This is an interface called `IERC20Token` that specifies the functions and events that any ERC20 token should have. ERC20 is a standard interface for tokens on the Celo blockchain. This interface includes functions for transferring tokens, approving transfers, and checking balances and allowances. It also includes events that are emitted when a transfer or approval occurs. By implementing this interface, we ensure that our smart contract can work with any ERC20 token, not just a specific one.

Moving forward, we will give a name to our contract and define a new struct.

```solidity
contract SongMarketplace {
uint internal songsLength = 0;
address internal cUsdTokenAddress = 0x686c626E48bfC5DC98a30a9992897766fed4Abd3;
uint256 internal songId = 0;
    event unpublishSongEvent(uint256 songId);
    event createSongEvent(
    string url,
    string name,
    string artist,
    uint price
);
```

The initial line of our code defines the name of the smart contract as `SongMarketPlace`.

The next line contains some variables that will be used throughout the tutorials.

The `songsLength` variable will keep track of the number of songs in our marketplace.

The `cUsdTokenAddress` variable is the address of the cUSD token, which is the currency we'll be using to buy and sell songs.

The `songId` variable is an identifier that we'll use to keep track of each song in our marketplace.

There are also two events defined here:

The `unpublishSongEvent` event will be triggered when a song is removed from the marketplace.

The `createSongEvent` event will be triggered when a new song is added to the marketplace. This event includes the `song's url`, `name`, `artist`, and `price`.

Lastly, we have a struct called Song. It has several properties, including the song's owner (which will be a payable address), `url`, `name`, `artist`, `price`, `songId`, and `createdAt`. We'll use this struct to store information about each song in our marketplace.

Next, we will define a mapping, which is a data structure in Solidity that associates a key with a value. You can think of it like a dictionary or a hash table in other programming languages. The mapping we are defining here will allow us to store the details of each song on the blockchain. We will use the song ID as the key, and the value will be a struct containing information about the song, such as its `name`, `artist`, `url`, `price`, and `owner`.

```solidity
  mapping (uint =>  Song) internal songs;
```

The line mapping (uint => Song) internal songs creates a mapping data structure that maps a unique unsigned integer `songId` to a Song struct. This means that each songId value will have a corresponding Song struct with its data, such as the `owner`, `url`, `name`, `artist`, `price`, and `createdAt` fields. The internal keyword restricts access to this mapping to only the smart contract and its inheritors.

To add more functionality to our smart contract, we'll start by defining some functions. The first function we'll define is called `getSongFunction()`.

```solidity
    function getSong(uint _index) public view returns (
    address payable,
    string memory,
    string memory,
    string memory,
    uint,
    uint256,
     uint256


     ) {
    return (
        songs[_index].owner,
         songs[_index].url,
          songs[_index].name,
           songs[_index].artist,
            songs[_index].price,
             songs[_index].songId,
              songs[_index].createdAt


    );

}

```

This is a function called `getSong` that will assist us in returning information about a specific song. It takes in an integer `_index` as an argument which represents the index of the song in the songs mapping. When called, it returns a tuple containing the following information about the song:

- the address of the song's owner (`address payable`)
- the URL of the song (`string memory`)
- the name of the song (`string memory`)

- the artist of the song (`string memory`)
- the price of the song (`uint`)
- the ID of the song (`uint256`)
- the timestamp when the song was created (`uint256`).

Furthermore, We add a function called `addSong()` that will be used to add songs to the blockchain.

```solidity
 function addSong (
    string memory _url,
    string memory _name,
    string memory _artist,
    uint _price
     ) public {

          songs [songsLength] =  Song(
        payable(msg.sender),
         _url,
         _name,
         _artist,
         _price,
         songId,
         block.timestamp

          );
            emit createSongEvent(_url, _name, _artist, _price);

            songsLength++;
      songId++;
     }
```

This function, named `addSong`, allows users to add a new song to the marketplace. It takes in four parameters: the `URL` of the song, the `name` of the song, the `name` of the `artist`, and the `price` of the song.

Inside the function, a new Song `struct` is created with the given parameters, and the current time is recorded as the creation time. The Song struct is then added to the songs mapping at the current `songsLength` index.

Finally, the `createSongEvent` is emitted to notify the frontend that a new song has been added to the marketplace. The `songsLength` and `songId` variables are incremented to prepare for the next song to be added.

After adding the `addSong` function, we will now include a `buySong` function that allows users to buy Songs from the blockchain.

```solidity

      function buySong(uint _index) public payable  {
    require(
      IERC20Token(cUsdTokenAddress).transferFrom(
        msg.sender,
        songs[_index].owner,
        songs[_index].price
      ),
      "Transfer failed."
    );

}
```

The `buySong` function allows users to purchase a song from the marketplace. When a user calls this function and specifies the index of the song they wish to buy, the function will check if the user has enough cUSD tokens to make the purchase. If the user has enough tokens, the function will transfer the specified amount of cUSD tokens from the buyer to the owner of the song. If the transfer is successful, the user will have successfully purchased the song from the marketplace.

The next function that will be discussed is `getSongIdsByArtist` function.

```solidity
function getSongIdsByArtist(string memory _artist) public view returns (uint[] memory) {
    uint[] memory songIds = new uint[](songsLength);
    uint count = 0;

    for (uint i = 0; i < songsLength; i++) {
        if (keccak256(bytes(songs[i].artist)) == keccak256(bytes(_artist))) {
            songIds[count] = songs[i].songId;
            count++;
        }
    }

    uint[] memory result = new uint[](count);
    for (uint i = 0; i < count; i++) {
        result[i] = songIds[i];
    }

    return result;
}
```

This function `getSongIdsByArtist` is a publicly accessible view function that takes in an artist's `name` as input and returns an array of unsigned integers representing the `song IDs` for all songs belonging to that artist.

First, a new array `songIds` is created with a length equal to the total number of songs stored in the contract. Then a counter variable count is initialized to `0`.

The function then loops through each song in the songs array, and if the artist's name for a song matches the input artist name, it adds that song's ID to the `songIds` array and increments the count variable.

After all songs have been checked, a new array `result` is created with a length equal to the count variable, and the song IDs stored in songIds are copied into it.

Finally, the result array containing the song IDs for the specified artist is returned.

Finally, the next functions to be added is the `deleteSong` function and the `getSongLength` function.

```solidity
function deleteSong(uint _index) public {
    require(_index < songsLength, "Invalid song index");
    require(msg.sender == songs[_index].owner, "Only song owner can delete the song");

    // Remove the song from the mapping
    delete songs[_index];

    // Emit an event to indicate that the song has been unpublished
    emit unpublishSongEvent(_index);
}


function getSongsLength() public view returns (uint) {
return (songsLength);
}

}
```

The `deleteSong` function is a public function that takes in an index of a song and deletes that song from the songs array. This function first checks that the input `index` is within the range of valid indexes in the array using the `require` function. It also checks that the person calling the function is the `owner` of the song, using another require statement.

If both requirements are satisfied, the song at the specified index is deleted from the songs array using the `delete` keyword, which sets the values of the song at that index to their default values. An event is then emitted to indicate that the song has been `unpublished`.

The `getSongsLength` function is a public view function that returns the length of the songs array, which represents the total number of songs stored in the contract. This function simply returns the value of the `songsLength` variable.

## Contract Deployment

To deploy our smart contract on the Celo blockchain, there are several requirements that need to be met. These may include things such as:

To ensure a smooth deployment of our smart contract, it is essential to download the Celo extension wallet from the given link, [Celo Extension wallet](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en). Once done, the next step is to fund the wallet that we have created, [Celo faucet](https://faucet.celo.org/). This can be accomplished by accessing the Celo Alfojares faucet using the provided link.

Once we have ensured that our wallet is funded, we can proceed to deploy the smart contract on the Celo blockchain using the Celo plugin that is available in the Remix environment.

## Conclusion

Congratulations on successfully developing the smart contract for selling songs on the Celo blockchain! Your accomplishment is truly remarkable, and you should take pride in your hard work paying off. Keep up the excellent work and enjoy the fruits of your labor. 🎉

## Next step

Excellent work! It's always beneficial to offer extra resources to aid in further learning. Please don't hesitate to contact me if you have any further inquiries or require additional assistance. You can easily reach out to me on Twitter by clicking on my profile. [Profile link](https://twitter.com/thompsonogoyi). Happy learning!

## About the author

My name is Ogoyi Thompson, and I'm a web3 developer based in Nigeria. I am enthusiastic about working with blockchain technology.
