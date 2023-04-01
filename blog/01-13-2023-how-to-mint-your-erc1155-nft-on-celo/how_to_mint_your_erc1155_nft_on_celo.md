---
title: Minting your ERC1155 Token on Celo 
description: How to Minting your ERC1155 Token on Celo using Remix
authors:
  - name: Mayowa Julius Ogungbola
    title: Software Engineer, Technical Writer
    url: https://github.com/Julius170
    image_url: https://avatars.githubusercontent.com/u/69092079?s=400&u=f34c84ee03afb9a51b163652b750419e98ed7456&v=4
tags: [celo, intermediate, celosage, solidity, 'erc1155']
hide_table_of_contents: true
slug: /tutorials/how-to-mint-your-erc1155-nft-on-celo-with-remix
---


## Introduction

Non-fungible tokens (NFTs) have gained significant popularity in recent years due to their ability to represent unique digital assets such as artworks, collectibles, and even virtual real estate. One specific type of NFT, called ERC1155, allows for the creation and management of both fungible tokens within a single smart contract.

Minting your own NFTs on Celo is a relatively straightforward process. this tutorial will provide the necessary steps to successfully mint your ERC115 NFT on the Celo Blockchain network, with tips and best practices for successful minting, using the Remix IDE.

Additionally, this tutorial will provide a summary of the advantages of using the Celo blockchain to mint ERC1155 NFTs. And helps you demystify the process and provides the tools and resources necessary for successful NFT minting.

## Prerequisites

**Remix**: You should be familiar with working on the Remix IDE. This tutorial will make use of the Remix IDE to create, deploy and mint your ERC token on the Celo Blockchain.

**OpenZeppelin**: For creating your ERC1155 Token standard contract, you’ll make use of an already created and secured contract on the openzeppelin library available remotely on the internet.

This tutorial requires you to have a solid foundation knowledge of basic web3 concepts like NFTs, openzeppelin, smart contracts, solidity code, etc.

***Note: Although this tutorial will cover creating and deployment of your ERC contract, it will not include an in-depth explanation of how to create and deploy your ERC115 contract***.

## Requirements​

To follow this tutorial you should have the following:

* [**Celo Wallet Extension**](https://docs.celo.org/wallet): This tutorial will require you to have an account on an installed celo wallet extension, or if you’re using another wallet like metamask, you should have the celo alfajores network added. Here is a link to guide you on how to add the alfajores testnet to your custom wallet.

* [**Faucets**](https://faucet.celo.org): You should also have your wallet funded with Celo test funds. Here is a link to request celo faucets.

* [**Node & node package management**](https://nodejs.org/en/download/) `npm` or `yarn`: This tutorial will require you to use a preinstalled node package manager, `yarn`. You should also know about working with any package manager: `npm` or `yarn`.

* [**IPFS**](https://docs.ipfs.tech/concepts/how-ipfs-works/):  Although this tutorial will not cover uploading your NFT images on **IPFS**, you should also be familiar with the concept of uploading on **IPFS**, and how to upload files on **IPFS**.

***Note: IPFS (InterPlanetary File System) is a distributed file system that allows users to store and access content from anywhere in the world. It is built on the same principles as the Ethereum blockchain, making it the ideal choice for hosting and delivering content on the blockchain***.

## The ERC115 Token Standard

Before getting started with writing code and minting your ERC115 token, here is a quick reminder on what the ERC1155 token is and how it is usually minted.

The ERC115 Token Standard is one of the most popular Ethereum-based token standards, that is used for creating, minting, storing, and transferring Non-Fungible Tokens (NFTs).

It is an extension of the ERC20 Token Standard and allows users to create unique tokens with different attributes, such as name, symbol, and metadata.
And a powerful tool for developers to easily create and manage digital assets on a blockchain network.

Tokens created with the ERC1155 Token Standard are also interoperable with other ERC20 tokens, for the creation of multiple asset types, such as collectibles, game items, digital artwork, and more.
To mint a new token, developers need to call the ERC1155 contract and pass in the token's contract address, an array of token IDs, and an array of tokenURI strings. The tokenURI string is used to identify each token and can contain information such as a token’s title, description, or image.

The following code example shows the functions to mint a new ERC1155 token from a smart contract on a blockchain network.
From openzeppelin’s standard ERC1155 contract:

```solidity
function _mint(address to, uint256 id, uint256 amount, bytes memory data) internal virtual {
        require(to != address(0), "ERC1155: mint to the zero address");
 
        address operator = _msgSender();
        uint256[] memory ids = _asSingletonArray(id);
        uint256[] memory amounts = _asSingletonArray(amount);
 
        _beforeTokenTransfer(operator, address(0), to, ids, amounts, data);
 
        _balances[id][to] += amount;
        emit TransferSingle(operator, address(0), to, id, amount);
 
        _afterTokenTransfer(operator, address(0), to, ids, amounts, data);
 
        _doSafeTransferAcceptanceCheck(operator, address(0), to, id, amount, data);
    }
```

## Uploading the NFT image on IPFS

To get started with minting your NFT on the Celo blockchain. First, you need to have your image uploaded on IPFS, although this tutorial will not cover how to upload your pictures, [here](https://www.youtube.com/watch?v=_8c9FJ7W-jE) is a video reference to learn how to upload your NFT images to **IPFS** using **NFT UP**, Since you will need an already uploaded NFT image for this tutorial, you can use the [link](https://bafybeiaqqz4unoubpu2oz2rsgowh3irdqnpcqjoyspzwrepnrwql7rgvy4.ipfs.nftstorage.link/) to an NFT folder with the images [`PHENZIC000`](https://bafybeiaqqz4unoubpu2oz2rsgowh3irdqnpcqjoyspzwrepnrwql7rgvy4.ipfs.nftstorage.link/ipfs/bafybeiaqqz4unoubpu2oz2rsgowh3irdqnpcqjoyspzwrepnrwql7rgvy4/Phenzic_000.jpeg) and [`PHENZIC001`](https://bafybeiaqqz4unoubpu2oz2rsgowh3irdqnpcqjoyspzwrepnrwql7rgvy4.ipfs.nftstorage.link/ipfs/bafybeiaqqz4unoubpu2oz2rsgowh3irdqnpcqjoyspzwrepnrwql7rgvy4/Phenzic_001.jpeg), uploaded on **IPFS**.

## Minting your ERC1155 Token Standard

[Remix](https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js) is an open-source web IDE that simplifies the process of creating and deploying smart contracts to a blockchain network.  It offers a simple graphical user interface that enables you to write and deploy Ethereum contracts quickly and easily.
To get started with minting and interacting with your tokens, you’ll need to create a basic template for your smart contract on Remix, hence the following steps:

1. First, head over to the Remix IDE using this [link](https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js),
2. You will need to download the Celo plugin on Remix, for interacting, compiling, and deploying on the Celo blockchain. Following the images and steps below.

* a. Click on the plug-like icon on the left bottom part of the screen.

* b. Enter `Celo` into the search bar to search for the Celo plugin.

* c. Click `Activate` to add the Celo plugin to the left plain, you will notice the Celo icon has been added to the plugins on the left, click on the Celo Icon.

![plugin_manager](https://user-images.githubusercontent.com/69092079/212204714-5f3fa3bb-5272-4264-924c-160aca12051e.jpg)

3. Next, create a new file under the `contracts` directory, and name the file `MyToken`, where you will have your smart contract written.

![files](https://user-images.githubusercontent.com/69092079/212204530-361d20dd-26cc-4c10-82ff-3ed8da469235.jpg)

4. Copy and paste the following code below into your `MyToken` contract:

* a. The code below simply initializes the contract by importing the standard ERC1155 token contract from openzeppelin into your contract, including all the functionalities of a standard ERC1155 token:

```solidity
// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.0;
 
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
```

> ***Note: OpenZeppelin is an open-source framework for developing secure, reliable, and upgradable smart contracts on the blockchain. It provides a large library of reusable, secure, and well-tested components that can be used to quickly develop and deploy applications on the Ethereum blockchain***.

Copy and paste the code above inside your `MyToken.sol` contract file.

* b. Next, the function below creates a new contract as a sub-contract of the standard openzeppelin ERC1155 contract and also initializes two constants for the NFTs you will be creating.

```solidity
contract MyToken is ERC1155 {
    uint256 public constant PHENZIC000 = 0;
    uint256 public constant PHENZIC001 = 1;
}
```

Copy and add the code above to your `MyToken` contract file.

* c. The Next function is the constructor function that takes in the link to your NFT images uploaded on IPFS and calls the `_mints` function to mint your NFTs.

```solidity
    constructor() ERC1155("https://bafybeiaqqz4unoubpu2oz2rsgowh3irdqnpcqjoyspzwrepnrwql7rgvy4.ipfs.nftstorage.link/"){
        _mint(msg.sender, PHENZIC000, 200, "");
        _mint(msg.sender, PHENZIC001, 100, "");
    }
```

Copy and add the code above to your token contract.

* d. Finally the last function `uri` take in unit256 digit `0` or `1`. And returns the direct link to any of the NFT's locations on IPFS, either the first no or the second.

```solidity
    function uri(uint256 _tokenId) override public pure returns (string memory) {
        return string(abi.encodePacked("https://bafybeiaqqz4unoubpu2oz2rsgowh3irdqnpcqjoyspzwrepnrwql7rgvy4.ipfs.nftstorage.link/PHENZIC00",Strings.toString(_tokenId),".jpeg")
        );
    }
```

Copy and add the code below inside your token contract.

* e. Finally, your complete contract should look exactly like the one code below, you can copy and replace your entire code with this for uniformity's sake.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
 
contract MyToken is ERC1155 {
    uint256 public constant PHENZIC000 = 0;
    uint256 public constant PHENZIC001 = 1;
 
    constructor() public ERC1155("https://bafybeiaqqz4unoubpu2oz2rsgowh3irdqnpcqjoyspzwrepnrwql7rgvy4.ipfs.nftstorage.link/"){
        _mint(msg.sender, PHENZIC000, 200, "");
        _mint(msg.sender, PHENZIC001, 100, "");
    }
 
    function uri(uint256 _tokenId) override public pure returns (string memory) {
        return string(abi.encodePacked("https://bafybeiaqqz4unoubpu2oz2rsgowh3irdqnpcqjoyspzwrepnrwql7rgvy4.ipfs.nftstorage.link/PHENZIC00",Strings.toString(_tokenId),".jpeg")
        );
    }
}

```

5. Next click on the Celo plug-in icon you activated earlier, to compile and deploy your contract on celo.

6. Now, click on the connect button attached to the first input bar on the side plain, to connect to your wallet, you will notice it automatically returns the amount of native token on your alfajores wallet and also tells you the network you are on currently.

***Note: Also ensure you are current on your celo alfajores testnet account on any wallet of your choice, and the account should already be funded with Celo testnet native token***.

7. Next, Click on the compile button, and Remix should compile the contract without any errors.

![compile_token](https://user-images.githubusercontent.com/69092079/212204347-e4c85f7a-d80d-4940-acae-b0e16f213ea9.jpg)

8. Now click on the deploy button below, and your wallet will pop up on the right side of your screen for you to sign the transaction.

![deploy_myToken](https://user-images.githubusercontent.com/69092079/212204167-dd2f640e-3a5f-4a19-893f-a2bc1978afec.jpg)

9. Click on confirm button, and you should have your contract already deployed to the celo alfajores testnet with the address of your contract on the display tab attached to the deploy button.

![confirm_transaction](https://user-images.githubusercontent.com/69092079/212204036-797e125b-2208-4ea7-896c-8138e2c5aab7.jpg)

***Note: The NFTs minted will be signed to the address of the person that deployed the contract and called the function***.

10. Now, that you have deployed your token contract with the minting function being called inside the contract’s constructor function. Your NFTs have automatically been minted to your address.

## Interacting with the Deployed ERC1155 Token

Now that you have your newly minted ERC1155 token deployed and minted on Celo alfajores signed with your address. You can run some checks to interact with your token on the blockchain.

* To check the number (balance) of NFT currently available on your wallet address:

a. Click on the function call `balanceof` at the bottom left side of your screen.

b. You will notice two drop-down input tabs to add your connected wallet address and the token Id of the NFT you want to view its balance, Copy your connected wallet address and past it in the first field, and input `0` in the second tab to view the balance of the NFT.

c. Click `Call` to view the amount of the `PHENZIC000` token available in your address.

![remix_balance_Of](https://user-images.githubusercontent.com/69092079/212203772-c74c3837-1c29-446c-8b5a-4182ad287e9f.jpg)

* Assuming you have a Gaming application where you welcome each new player by gifting them with the `PHENZIC000` token and gifting the old-timer player with certain levels attained in the game with the `PHENZIC001` token.
You can have this done automatically on your Dapp but in this case, you can equally send these tokens by calling the `safeTransferFrom` function.

a. First, click on the `safeTransferFrom` function call like in the image below to add the required parameters to call the functions.

b. Copy and add your connected wallet address as the first input for the variable `from`.

c. Next, add the wallet address you want to send the NFT to, any remote alfajores address will work fine.

d. Enter the `id` of the token you want to send `0` or `1`, and the amount you want `to` send for this example you can use `0` for `id`, `50` for the amount, and use `0x00` for the `data` input.

e. Click `transact`, and to check the balance of the remaining token.

f. Head back to the `balanceof` add your connected wallet address and `0` or the `id` of the token you sent from, and click call. You will notice the reduction in the token amount.

![functions](https://user-images.githubusercontent.com/69092079/212203499-48b25bcc-7366-4082-b55c-d48905447a76.jpg)

* The `uri` function call overrides simple taken in a `token_id`, and returns the link to either the first minted NFT or the second minter NFT on IPFS, depending on the `token_id` you input.

## Conclusion

Minting your ERC1155 NFT on the Celo blockchain is a relatively straightforward process, but it does require some technical knowledge and setup. By following the steps outlined in this tutorial, you can successfully mint your ERC115 NFT and begin it in the Celo ecosystem.

You would have used the Celo plugin on the Remix IDE to interact with the Celo blockchain and, understand other concepts like how the IPSF works and how to mint your token contract using Remix.

## About the Author

Mayowa Julius Ogungbola

is a Software Engineer and Technical writer always open to working on new ideas. I enjoy working on [GitHub](https://github.com/Julius170/) and you can also connect with me on [LinkedIn](https://www.linkedin.com/in/julius-ogungbola-a71810229/).

## Next Steps

Here are some other NFT-related tutorial articles you might be interested in:

* [How to Build an NFT Collection on Celo](https://www.celosage.com/how-to-quickly-build-an-nft-collection-on-celo/)
* [How to Deploy an ERC721 Smart Contract using Tatum API](https://www.celosage.com/how-to-deploy-an-erc721-smart-contract-using-the-tatum-api/)
* [How to Create, Deploy and Mint your ERC1155 token on Celo](https://www.celosage.com/how-to-create-deploy-mint-erc-115-tokens-on-celo/)

## References​

Here are links to some video tutorials you might be interested in following along with while reading this tutorial:

* [Uploading your NFTs to IPFS](https://www.youtube.com/watch?v=_8c9FJ7W-jE)
* [Publishing your Minted NFTs on Opensea](https://www.youtube.com/watch?v=J4p1sdo3Rz4&t=749s)
* [Minting your ERC1155 contract on Remix](https://www.youtube.com/results?search_query=how+to+mint+an+ERC1155+token+standard+on+remix)
