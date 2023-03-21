---
title: Building an NFT Marketplace on Celo with Python
description: This tutorial provides a guide on how to use Python to build an NFT marketplace on the Celo blockchain

authors:
  - name: Israel Okunaya
    title: Product Manager, Technical Writer @Celo Foundation
    url: https://github.com/Southpaw0
    image_url: https://user-images.githubusercontent.com/104994589/225652975-aed0c4de-027a-453a-b8fb-7cdc55e203cc.png
tags: [celosage, celo, nft, smartcontract, solidity, intermediate]
hide_table_of_contents: true
slug: /tutorials/building-an-nft-marketplace-on-celo-with-python
---

![building-an-nft-marketplace-on-celo-with-python](https://user-images.githubusercontent.com/104994589/226217467-ad5e4f95-3af8-4e26-9fca-4cd5fbf5161d.png)

## Introduction

NFTs or Non-Fungible, an application of blockchain is used to represent unique digital assets such as collectibles, arts, etc. Celo is a blockchain platform that is designed to send, receive, and store digital assets securely on a mobile phone. The Celo blockchain is built using the Solidity programming language and is fully compatible with Ethereum. In this tutorial, we will be building an NFT marketplace with Python using the brownie framework and deploying it on Celo Testnet.

## Prerequisites

To understand this tutorial, you must be familiar with the following:

- Building Smart Contracts
- The Python programming language

## Requirements

You should have the following installed on your computer to follow along:

- Python 3.7 or any later version.
- [Nodejs](https://nodejs.org/en/download/)
- [Celo Testnet account](https://faucet.celo.org/)
- [Celo Wallet](https://docs.celo.org/blog/tutorials/3-simple-steps-to-connect-your-metamask-wallet-to-celo)
- [Python-dotenv](https://pypi.org/project/python-dotenv/)
- [Ganache](https://trufflesuite.com/ganache/)
- [Eth-brownie](https://eth-brownie.readthedocs.io/en/stable/install.html)

### Setting Up Project

To get started, we have to create a new directory for our project and install the following dependencies:

```bash
mkdir nft-marketplace
cd nft-nft-marketplace
```

```bash
# Create virtual environment
python3.10 -m venv venv
# activate virtual environment
source venv/bin/activate
```

Note: Brownie works bet with python3.10

```bash
# Install ganache
npm install -g ganache
# Install eth-brownie and python-dotenv
pip3 install eth-brownie python-dotenv
```

After installing dependencies, we need to initialize our project as a brownie project.

```bash
brownie int
```

This command generates some folder which will look like this:

![image](https://user-images.githubusercontent.com/104994589/226218209-ed885059-f1af-4b16-8e01-df704256724d.png)

After initializing brownie into our project, in your root directory, create two files called .env and brownie-config.yaml. The .env file is used to store environment variables that should not be exposed to the public such as our private key, mnemonic phrase, etc, while brownie-config.yaml is used to configure brownie in our project.

.env

```bash
MNEMONIC="..."
PRIVATE_KEY="0x..."
```

brownie-config.yaml

```brownie-config.yaml
reports:
    exclude_contracts:
        - SafeMath
depedencies:
    - OpenZeppelin/openzeppelin-contracts@4.8.0
compiler:
    solc:
        version: 0.8.15
        optimizer:
            enabled: true
            runs: 200
        remappings:
            - "@openzeppelin=OpenZeppelin/openzeppelin-contracts@4.8.0"
networks:
    default: celo-alfajores
console:
    show_colors: true
    color_style: monokai
    auto_suggest: true
    completions: true
    editing_mode: emacs
dotenv: .env
wallets:
    from_mnemonic: ${MNEMONIC}
		from_key: ${PRIVATE_KEY}
```

The next step is to add Celo Testnet (Alfajores) to our brownie project:

```bash
brownie networks add Celo celo-alfajores host=https://alfajores-forno.celo-testnet.org chainid=44787 explorer=https://alfajores-blockscout.celo-testnet.org
```

You can see the list of networs that have been added to our brownie project:

```bash
brownie network list
```

![image](https://user-images.githubusercontent.com/104994589/225622515-bf69ebce-b3d9-4d38-b2a5-2dca80769694.png)

### Implementing the Smart Contract

Next ,we have to write the smart contraxr for our NFT marketplace. In your contracts directory, create a new file called `NFTMarketplace.sol`

```solidity
agma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract NFTMarketplace {
    using SafeMath for uint256;
    struct Auction {
        address tokenAddress;
        uint256 tokenId;
        address payable seller;
        uint256 price;
        uint256 endTime;
        bool active;
    }
    address public owner;
    uint256 public feePercentage; // percentage of the sale price taken as fee
    mapping(address => mapping(uint256 => Auction)) public auctions; // map of all active auctions
    event AuctionCreated(
        address indexed tokenAddress,
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price,
        uint256 endTime
    );
    event AuctionEnded(
        address indexed tokenAddress,
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price
    );
    constructor() {
        owner = msg.sender;
        feePercentage = 1; // 1% fee by default
    }
    function createAuction(address _tokenAddress, uint256 _tokenId, uint256 _price, uint256 _duration) public {
        require(_duration > 0, "Duration must be greater than zero");
        require(_price > 0, "Price must be greater than zero");
        IERC721 tokenContract = IERC721(_tokenAddress);
        require(tokenContract.ownerOf(_tokenId) == msg.sender, "You don't own this NFT");
        uint256 endTime = block.timestamp.add(_duration);
        Auction memory auction = Auction(_tokenAddress, _tokenId, payable(msg.sender), _price, endTime, true);
        auctions[_tokenAddress][_tokenId] = auction;
        emit AuctionCreated(_tokenAddress, _tokenId, msg.sender, _price, endTime);
    }
    function endAuction(address _tokenAddress, uint256 _tokenId) public {
        Auction storage auction = auctions[_tokenAddress][_tokenId];
        require(auction.active, "Auction has already ended");
        require(block.timestamp >= auction.endTime, "Auction hasn't ended yet");
        address payable seller = auction.seller;
        uint256 price = auction.price;
        auction.active = false;
        IERC721 tokenContract = IERC721(_tokenAddress);
        tokenContract.safeTransferFrom(address(this), msg.sender, _tokenId);
        uint256 fee = price.mul(feePercentage).div(100);
        seller.transfer(price.sub(fee));
        emit AuctionEnded(_tokenAddress, _tokenId, msg.sender, price);
    }
    function setFeePercentage(uint256 _feePercentage) public {
        require(msg.sender == owner, "Only the owner can set the fee percentage");
        require(_feePercentage >= 0 && _feePercentage <= 100, "Fee percentage must be between 0 and 100");
        feePercentage = _feePercentage;
    }
    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        address payable self = payable(address(this));
        self.transfer(self.balance);
    }
    // fallback function
    receive() external payable {}
}
```

Now let's go through the code step by step

```solidity
pragma solidity ^0.8.0;
import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./SafeMath.sol";
```

The above code specifies our solidity version and imports the IERC721,
IERC721Receiver, and SafeMath (for blockchain math operations) interfaces.

```solidity
using SafeMath for uint256;
 struct Auction {
     address tokenAddress;
      uint256 tokenId;
      address payable seller;
      uint256 price;
      uint256 endTime;
      bool active;
  }
```

Enables us to use the SafeMath foe uint256 tyoe operations and the Auction struct defines the structure of the Auction.

```solidity
mapping(address => mapping(uint256 => Auction)) public auctions;
```

This maps each token address and token ID to an active auction.

```solidity
event AuctionCreated(
        address indexed tokenAddress,
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price,
        uint256 endTime
    );
    event AuctionEnded(
        address indexed tokenAddress,
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price
    );
```

These are the eents that are emitted when an auction is creares and ended.

```solidity
constructor() {
        owner = msg.sender;
        feePercentage = 1; // 1% fee by default
    }
```

This sets the owner of the contract and the default fee (in percentage).

```solidity
function createAuction(address _tokenAddress, uint256 _tokenId, uint256 _price, uint256 _duration) public {
        require(_duration > 0, "Duration must be greater than zero");
        require(_price > 0, "Price must be greater than zero");
        IERC721 tokenContract = IERC721(_tokenAddress);
        require(tokenContract.ownerOf(_tokenId) == msg.sender, "You don't own this NFT");
        uint256 endTime = block.timestamp.add(_duration);
        Auction memory auction = Auction(_tokenAddress, _tokenId, payable(msg.sender), _price, endTime, true);
        auctions[_tokenAddress][_tokenId] = auction;
        emit AuctionCreated(_tokenAddress, _tokenId, msg.sender, _price, endTime);
    }
    function endAuction(address _tokenAddress, uint256 _tokenId) public {
        Auction storage auction = auctions[_tokenAddress][_tokenId];
        require(auction.active, "Auction has already ended");
        require(block.timestamp >= auction.endTime, "Auction hasn't ended yet");
        address payable seller = auction.seller;
        uint256 price = auction.price;
        auction.active = false;
        IERC721 tokenContract = IERC721(_tokenAddress);
        tokenContract.safeTransferFrom(address(this), msg.sender, _tokenId);
        uint256 fee = price.mul(feePercentage).div(100);
        seller.transfer(price.sub(fee));
        emit AuctionEnded(_tokenAddress, _tokenId, msg.sender, price);
    }

```

The `createAuction` function creates a new auction and the `endAuction` ends an active auction.

```solidity
function setFeePercentage(uint256 _feePercentage) public {
        require(msg.sender == owner, "Only the owner can set the fee percentage");
        require(_feePercentage >= 0 && _feePercentage <= 100, "Fee percentage must be between 0 and 100");
        feePercentage = _feePercentage;
    }
    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        address payable self = payable(address(this));
        self.transfer(self.balance);
    }
```

The setFeePercentage functino sets the percentage fee for the contract and the withdraw function enables the creator of the contract to withdraw the fund from it.

```solidity
// fallback function
  receive() external payable {}
```

A callback functnion that is called when ether is sent to the contract

### Deploying the Contract

Next, we need to compile and deploy the contract on the Celo Testnet, Run the following command to compile the contract.

```bash
brownie compile
```

![image](https://user-images.githubusercontent.com/104994589/225622811-cb77d910-9c29-42a1-a8d0-3b30cd829aa1.png)

To deploy the smart contract on Celo create a new file called deploy.py in the scripts directory of your project.

```python
from brownie import NFTMarketplace, accounts, config, network
def deploy_marketplace():
    # Load the account to deploy from
    dev = accounts.add(config["wallets"]["from_key"])
    print(f"Deploying from {dev.address}")
    # Deploy the contract
    marketplace = NFTMarketplace.deploy({"from": dev})
    print(f"NFTMarketplace contract deployed to {marketplace.address}")
def main():
    # Set the network to deploy to
    network_name = network.show_active()
    print(f"Deploying to {network_name} network")
    # Call the deploy function
    deploy_marketplace()
```

The deploy_marketplace functino get the account we would use to deploy the contract.

**Deploy the Contract**

```bash
 Deploy the contract to the Celo Alfajores testnet
brownie run scripts/deploy.py --network celo-alfajores
```

![image](https://user-images.githubusercontent.com/104994589/225623002-ca2f848f-8e28-4129-8b21-92fb8576d034.png)

## Conclusion

In this tutorial we implemented an NFT smart contract that allows users to create and participate in ERC721 token auctions. The contract charges a fee for each sale, which is determined by the contract's owner. When an auction concludes, the winning bidder receives the NFT, while the seller receives the sale price less the fee. The contract also gives the owner the option to withdraw funds from the contract.

We have learned how to implement an NFT exchange on Celo using brownie in Python. We explored topics such as the basics of setting up a development environment, creating a smart contract and finally compiling and deploying the contract on Celo Testnet or Afrajores.

## Next Step

We can explore more functionalities that we can add to this contract, such as the ability for bidders to increase the current bid by a minimum increment, the ability to see auction history, time extension on bid time, etc.

## References

1. [Celo Developer Documentation](https://docs.celo.org/)
2. [Solidity Documentation](https://solidity.readthedocs.io/)
3. [Brownie Documentation](https://eth-brownie.readthedocs.io/en/stable/)
4. [Github Repository](https://github.com/Divine572/NFT-Marketplace)

## About the Author

[Israel Okunaya](https://meetisraelokunaya.curious.page/) is an ace writer with a flair for simplifying complexities and a knack for storytelling. He leverages over four years of experience to meet the most demanding writing needs in different niches, especially food and travel, blockchain, and marketing. He sees blockchain as a fascinating yet tricky affair. So, he's given to simplifying its complexities with text and video tutorials.
