---
title: Build an NFT Full Stack Monster War Game on The Celo Blockchain
description: Build a full stack NFT on chain game on the celo blockchain.
authors:
  - name: ✍️ Jonathan Iheme
url: https://github.com/4undRaiser
image_url: https://avatars.githubusercontent.com/u/87926451?s=96&v=4
tags: [celosage, nft, solidity, celo, advanced]
hide_table_of_contents: true
slug: "/tutorials/build-an-nft-full-stack-monster-war-game-on-the-celo-blockchain"
---

![header](../../src/data-tutorials/showcase/advanced/build-an-nft-full-stack-monster-war-game-on-the-celo-blockchain.png)

## Introduction

In this tutorial, I will teach you how to build an NFT Game On the Celo Blockchain.

Monster War is an NFT game where players can mint and upgrade their monsters by paying 0.5 celo per upgrade. Each upgrade will add one power value point to their monster. Players’ NFT monsters can also Swallow other players’ NFT monsters, but this can only be done if the attacker has minted his NFT and the power value of his monster is more than the power value of the monster they are attacking.

It's a battle between players where each player can collect and upgrade NFTs. Players can mint their own NFTs, boost the power value of their NFTs, and swallow other players’ NFTs depending on the power value of their NFTs. Players are also able to remove their NFTs from the game.

Here is a demo app [link](https://luxury-daffodil-d1fa4d.netlify.app/) of what you’ll be creating.

And a Screenshot

![image](images/monster-nft.jpg)

## Prerequisites

To fully follow up with these tutorials, you should have a basic understanding of the following technologies.

Solidity, smart-contract, and blockchain concepts.
Hardhat.
React.
Basic web Development.

## Requirements

- Solidity.
- OpenZeppelin.
- Hardhat.
- React.
- Bootstrap.
- NodeJS 12.0.1 upwards installed.
- MetaMask.

## Installation

Click on this [link](https://github.com/4undRaiser/celo-monster-nft-game) repo from your github.

- Clone the repo to your computer.
- open the project from from vscode.
- Run `npm install` command to install all the dependencies required to run the app locally.

## SmartContract

Let's dive into the smart contract to understand how it works.

## NFT Minter

The Finished Smart Contract will look like this.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint internal allNFTs = 0; 

    constructor() ERC721("MONSTERNFT", "MNFT") {}

//  struct each nft
    struct NFT {
        uint tokenId;
        address payable owner;
        uint powerValue;
        string name; 
    }

    mapping(address => bool) public minters;
    mapping (uint => NFT) internal nfts;// mapping for nfts
    mapping (address => uint) public playerpowervalue;// mapping for players


// modifier to check if an address has minted an nft
     modifier hasmint(address _address) {
        require(minters[_address], "Invalid address");
        _;
    }


// modifier to check if the power value of the attacker is greater than the power value of the owner
     modifier canSwallow(address _address, uint _index) {
       address ownerAddress = nfts[_index].owner;
        require(playerpowervalue[_address] > playerpowervalue[ownerAddress], "You have less value point");
        _;
    }


     // for minting nfts
    function mint( string memory name) public payable {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        addNFT(tokenId, name);// listing the nft 
    }

// adding the nft to the war room 
    function addNFT(uint256 _tokenId, string memory _name) private{
        uint _powerValue = 0;
        nfts[allNFTs] = NFT(
            _tokenId,
            payable(msg.sender),
            _powerValue,
            _name
        );
        allNFTs++;
        minters[msg.sender] = true;
        
    }

// swallowing an nft and tranfering the nft from the owner to the attacker if the modifier is satisfied
     function swallowNFT(uint _index) external hasmint(msg.sender) canSwallow(msg.sender, _index){
        require(msg.sender != nfts[_index].owner, "can't swallow your own nft");         
           _transfer(nfts[_index].owner, msg.sender, nfts[_index].tokenId);
           playerpowervalue[nfts[_index].owner] -= nfts[_index].powerValue;
           playerpowervalue[msg.sender] += nfts[_index].powerValue;
           nfts[_index].owner = payable(msg.sender);
  }

// increasing the powervalue of an NFT by its owner and paying 0.5 celo for the transaction
     function upgradeNFT(uint _index) external payable{
        require(msg.sender == nfts[_index].owner, "you cant upgrade this nft");
         payable(owner()).transfer(msg.value);
         nfts[_index].powerValue++;
         playerpowervalue[msg.sender]++;    
     }

// returns true if the powervalue of the attacker is greater than the owner 
      function canSwallowNFT(address _address, uint _index) public view returns(bool){
        if(playerpowervalue[_address] > playerpowervalue[nfts[_index].owner]){
            return true;
        }else{
            return false;
        }
    }
// returns true if the address has minted an nft.
     function hasMinted(address _address) public view returns(bool){
        if(minters[_address] == true){
            return true;
        }else{
            return false;
        }
    }


// returning all nfts
    function getAllNFTS(uint _index) public view returns(NFT memory){
        return nfts[_index]; 
    }


// remove the nft from war room
    function remove(uint _index) external {
         require(msg.sender == nfts[_index].owner, "can't remove this nft");         
            nfts[_index] = nfts[allNFTs - 1];
            delete nfts[allNFTs - 1];
            allNFTs--; 
            _transfer(address(this), msg.sender, nfts[_index].tokenId);
  }
// getting the length of save the planet nfts in the list
     function getNFTlength() public view returns (uint256) {
        return allNFTs;
    }


    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    //    destroy an NFT
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    //    return IPFS url of NFT metadata
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

```

## Breakdown

The first step is to declare the license and solidity version and import all the necessary OpenZeppelin contracts.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

```

These contracts provide functionality for creating ERC721 tokens, as well as additional functionality for enumeration, URI storage, Burnable, Ownable, and Counters. OpenZeppelin is an open-source secure framework for building smart contracts. To learn more about open zeppelin smart contracts, [click here](https://docs.openzeppelin.com/contracts/4.x/).
We’ll be using the ERC721 Token standard.

Next, we’ll inherit all the imported open zeppelin contracts and create our constructors and variables.

```solidity
contract MyNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
```

 Here we declared the contract `MyNFT`, and it inherits from several OpenZeppelin contracts like the `ERC721`, `ERC721Enumerable`, `ERC721URIStorage`, and `Ownable`. Inheriting from these contracts provides a range of functionality for our contract.

```solidity
 using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    uint internal allNFTs = 0; 

    constructor() ERC721("MONSTERNFT", "MNFT") {}
```

Next, set up our counter to enables the use of the Counters contract from the OpenZeppelin library.

Then we declare a private variable called `_tokenIdCounter` of the Counters.Counter type. This variable is used to keep track of the number of NFTs that have been minted and an internal uint variable called `allNFTs` This variable is used to keep track of the number of NFTs that are currently in the war room.

We also declare our constructor named "MONSTERNFT" and the symbol "MNFT". This sets up the basic functionality for the contract to manage non-fungible tokens.

```solidity
struct NFT {
        uint tokenId;
        address payable owner;
        uint powerValue;
        string name; 
    }
```

Next, we declare a struct called `NFT`. The struct has four fields: `tokenId` (a uint that represents the unique ID of the NFT), `owner` (an address that represents the owner of the NFT), `powerValue` (a uint that represents the power value of the NFT), and `name` (a string that represents the name of the NFT).

```solidity
    mapping(address => bool) public minters;
    mapping (uint => NFT) internal nfts;
    mapping (address => uint) public playerpowervalue;
```

We also declare three mappings. First, `minters` (a mapping addresses to booleans that represents whether an address is a minter or not), `nfts` (a mapping uint to NFT to accomodate the list of nfts minted) and `playerpowervalue` (a mapping address to uint to keep track of the power value of each player).

```solidity
  modifier hasmint(address _address) {
        require(minters[_address], "Invalid address");
        _;
    }

     modifier canSwallow(address _address, uint _index) {
       address ownerAddress = nfts[_index].owner;
        require(playerpowervalue[_address] > playerpowervalue[ownerAddress], "You have less value point");
        _;
    }
```

Next we added two modifiers.

`hasmint` This modifier checks whether the address calling the function has already minted an NFT by verifying that the address is a valid minter. If the address is not a valid minter, the function execution is aborted. otherwise, it is allowed to proceed.

`canSwallow` This modifier checks whether the power value of the attacker is greater than the power value of the owner of the NFT before allowing the `swallowNFT()` function to execute. If the power value of the attacker is less than or equal to the owner's power value, the function execution is aborted.

let's look at the functions

```solidity
 function mint( string memory name) public payable {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        addNFT(tokenId, name);// listing the nft 
    }
```

Let's declare a function called `mint()` The Mint function allows a player to mint their own NFTs. The function takes a string as a parameter used to specify the name of the NFT. The function first generates a unique `tokenId` for the NFT and increments the `tokenId counter`. It then calls the `_safeMint` function, inherited from the `ERC721` contract and is used to mint the NFT. Finally, it calls the `addNFT` function which adds the NFT to the game.

```solidity
 function addNFT(uint256 _tokenId, string memory _name) private{
        uint _powerValue = 0;
        nfts[allNFTs] = NFT(
            _tokenId,
            payable(msg.sender),
            _powerValue,
            _name
        );
        allNFTs++;
        minters[msg.sender] = true;
    }
```

The `AddNFT()` function adds the NFT to the game. The function takes a `tokenId` and a name as parameters. It then creates a new NFT struct with the given parameters and adds it to the internal NFTs mapping. It also adds the player to the minters mapping and increments the `allNFTs` variable.

```solidity
function swallowNFT(uint _index) external hasmint(msg.sender) canSwallow(msg.sender, _index){
        require(msg.sender != nfts[_index].owner, "can't swallow your own nft");         
           _transfer(nfts[_index].owner, msg.sender, nfts[_index].tokenId);
           playerpowervalue[nfts[_index].owner] -= nfts[_index].powerValue;
           playerpowervalue[msg.sender] += nfts[_index].powerValue;
           nfts[_index].owner = payable(msg.sender);
  }
```

The `SwallowNFT()` function allows a player to swallow another player’s NFT. This function takes an index as a parameter which is used to specify the NFT to be swallowed. The function is protected by two modifiers. `hasmint` and `canSwallow`. The `hasmint` modifier checks if the address has minted an NFT and the `canSwallow` modifier checks if the power value of the attacker is greater than the power value of the owner. If both the modifiers pass, the function transfers the NFT from the owner to the attacker, decreases the power value of the owner and increases the power value of the attacker.

```solidity
 function upgradeNFT(uint _index) external payable{
        require(msg.sender == nfts[_index].owner, "you cant upgrade this nft");
         payable(owner()).transfer(msg.value);
         nfts[_index].powerValue++;
         playerpowervalue[msg.sender]++;    
     }
```

The `UpgradeNFT()` function allows a player to upgrade the power value of their NFT. This function takes an `index` as a parameter which is used to specify the NFT to be upgraded. The function requires that the sender of the transaction is the owner of the NFT. If this requirement is met, the function transfers 0.5 Celo from the owner of the nft to the contract owner and increases the power value of the NFT and the player.

```solidity
 function canSwallowNFT(address _address, uint _index) public view returns(bool){
        if(playerpowervalue[_address] > playerpowervalue[nfts[_index].owner]){
            return true;
        }else{
            return false;
        }
    }
```

The `CanSwallowNFT()` function returns true if the power value of the attacker is greater than the power value of the owner of the NFT. The function takes an `address` and an `index` as parameters. The address is used to specify the attacker, and the index is used to specify the NFT to be swallowed. The function returns true if the power value of the attacker is greater than the power value of the owner of the nft.

```solidity
 function hasMinted(address _address) public view returns(bool){
        if(minters[_address] == true){
            return true;
        }else{
            return false;
        }
    }
```

The `HasMinted()` function returns true if the address has minted an NFT. The function takes an `address` as a parameter which is used to specify the address to check. The function returns true if the address has minted an NFT. This will be usefull in our front-end.

```solidity
 function getAllNFTS(uint _index) public view returns(NFT memory){
        return nfts[_index]; 
    }
```

The `GetAllNFTS()` function returns all NFTs. The function takes an `index` as a parameter which is used to specify the NFT to be returned. The function returns an NFT struct with the given `index`.

```solidity
 function remove(uint _index) external {
         require(msg.sender == nfts[_index].owner, "can't remove this nft");         
            nfts[_index] = nfts[allNFTs - 1];
            delete nfts[allNFTs - 1];
            allNFTs--; 
            _transfer(address(this), msg.sender, nfts[_index].tokenId);
  }
```

The `Remove()` function removes an NFT from the game. The function takes an `index` as a parameter to specify the NFT to be removed. The function requires that the sender of the transaction is the owner of the NFT. If this requirement is met, the function transfers the NFT from the contract to the owner and deletes the NFT from the internal nfts mapping.

```solidity
 function getNFTlength() public view returns (uint256) {
        return allNFTs;
    }
```

The `GetNFTlength()` function returns the length of the NFTs in the list. The function returns the value of the `allNFTs` variable which is the length of all monster NFTs in the list.

The rest of the functions are overrides that are required by solidity.

That’s it For the smart contract. Next, we’ll be looking at the front end.

## Front end

### Stack

We’ll use the following stack for this section.

- Hardhat
- React

### Setup

Clone the full project from [this Repository](https://github.com/4undRaiser/celo-monster-nft-game) to follow up with this section.

Here is an example of the env file

```.env
MNEMONIC=""
REACT_APP_STORAGE_API_KEY=""
```

### Deployment

We’ll use hardhat to deploy our smart-contracts to the celo blockchain.

Configure your `hardhat.config` file to look like this to enable hardhat to deploy the smart contracts to the celo blockchain.

```javascript
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const getEnv = (variable, optional = false) => {
  if (!process.env[variable]) {
    if (optional) {
      console.warn(
        `[@env]: Environmental variable for ${variable} is not supplied.`
      );
    } else {
      throw new Error(
        `You must create an environment variable for ${variable}`
      );
    }
  }

  return process.env[variable]?.replace(/\\n/gm, "\n");
};

// Your mnemomic key
const MNEMONIC = getEnv("MNEMONIC");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/52752'/0'/0",
      },
      chainId: 44787,
    },
  },
};
```

Next let's create a script to deploy the smart contract.

```javascript
const hre = require("hardhat");

async function main() {
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();

  await myNFT.deployed();

  console.log("MyNFT deployed to:", myNFT.address);
  storeContractData(myNFT);
}

function storeContractData(contract) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/MyNFT-address.json",
    JSON.stringify({ MyNFT: contract.address }, undefined, 2)
  );

  const MyNFTArtifact = artifacts.readArtifactSync("MyNFT");

  fs.writeFileSync(
    contractsDir + "/MyNFT.json",
    JSON.stringify(MyNFTArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

```

The script above will deploy the smart contract and create a contract folder for the ABI and contract address of the smart contract.

Deploy the smart contracts to the celo block-chain by running this command

`npx hardhat run scripts/deploy.js --network alfajores`

You should see something like this in the terminal

`MyNFT deployed to: 0x49F39D9531B826826EDc7066161F20570105AFb1`

Now Let’s look at the `index.js` file in the root of the project.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import {
  ContractKitProvider,
  Alfajores,
  NetworkNames,
} from "@celo-tools/use-contractkit";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@celo-tools/use-contractkit/lib/styles.css";
import "react-toastify/dist/ReactToastify.min.css";

ReactDOM.render(
  <React.StrictMode>
    <ContractKitProvider
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: "https://alfajores-forno.celo-testnet.org",
        graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
        explorer: "https://alfajores-blockscout.celo-testnet.org",
        chainId: 44787,
      }}
      dapp={{
        name: "NFT MONSTER GAME",
        description: "A simple dapp for nft gaming",
      }}
    >
      <App />
    </ContractKitProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

In the `Index.js` we made some necessary imports like the `ContractKitProvider`, `Alfajore`s, and `NetworkNames` from the use-contract kit.

Next, we wrapped our `ContractKitProvider` around the app Component to enable our app to connect to the celo test network.

[Click here](https://docs.celo.org/developer/contractkit) to learn more about ContractKit

### Hooks

In our hooks folder, we have three files, `useBalance`, `useContract` and `useMinterContract`.

For the useBalance.js file,

```javascript
import { useState, useEffect, useCallback } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";

export const useBalance = () => {
  const { address, kit } = useContractKit();
  const [balance, setBalance] = useState(0);

  const getBalance = useCallback(async () => {
    // fetch a connected wallet token balance
    const value = await kit.getTotalBalance(address);
    setBalance(value);
  }, [address, kit]);

  useEffect(() => {
    if (address) getBalance();
  }, [address, getBalance]);

  return {
    balance,
    getBalance,
  };
};
```

The `useBalance.js` file uses the `useBalance` custom hook which is used to get the balance of an account that is connected to the dapp.

For the `useContract.js` file

```javascript
import { useState, useEffect, useCallback } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";

export const useContract = (abi, contractAddress) => {
  const { getConnectedKit, address } = useContractKit();
  const [contract, setContract] = useState(null);

  const getContract = useCallback(async () => {
    const kit = await getConnectedKit();

    // get a contract interface to interact with
    setContract(new kit.web3.eth.Contract(abi, contractAddress));
  }, [getConnectedKit, abi, contractAddress]);

  useEffect(() => {
    if (address) getContract();
  }, [address, getContract]);

  return contract;
};
```

The `useContract.js` file uses the `useContract` custom hook which is used to get an instance of a smart contract.

```javascript
import { useContract } from "./useContract";
import MyNFTAbi from "../contracts/MyNFT.json";
import MyNFTContractAddress from "../contracts/MyNFT-address.json";

export const useMinterContract = () =>
  useContract(MyNFTAbi.abi, MyNFTContractAddress.MyNFT);

```

The `useMinterContract` import the ABI and contract address from the JSON files that we generated when we run the deploy scripts which is then used to create and export an instance of their smart contracts.

Inside the utils folder open the `minter.js` file, it should look like this.

```javascript
import { ethers } from "ethers";

// mint an NFT
export const createNft = async (minterContract, performActions, name) => {
  await performActions(async (kit) => {
    if (!name) return;
    const { defaultAccount } = kit;

    try {
      // mint the NFT and save the IPFS url to the blockchain
      let transaction = await minterContract.methods
        .mint(name)
        .send({ from: defaultAccount });

      return transaction;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  });
};

// fetch all NFTs on the smart contract
export const getNfts = async (minterContract) => {
  try {
    const nfts = [];
    const nftsLength = await minterContract.methods.getNFTlength().call();
    // contract starts minting from index 1
    for (let i = 0; i < Number(nftsLength); i++) {
      const nft = new Promise(async (resolve) => {
        const _nft = await minterContract.methods.getAllNFTS(i).call();
        const owner = await fetchNftOwner(minterContract, i);
        resolve({
          index: i,
          powerValue: _nft.powerValue,
          name: _nft.name,
          owner: owner,
        });
      });
      nfts.push(nft);
    }
    return Promise.all(nfts);
  } catch (e) {
    console.log({ e });
  }
};

// get the owner address of an NFT
export const fetchNftOwner = async (minterContract, index) => {
  try {
    return await minterContract.methods.ownerOf(index).call();
  } catch (e) {
    console.log({ e });
  }
};

export const minted = async (minterContract, _address) => {
  try {
    return await minterContract.methods.hasMinted(_address).call();
  } catch (e) {
    console.log({ e });
  }
};

export const checkPowervalue = async (minterContract, _address, _index) => {
  try {
    return await minterContract.methods.canSwallowNFT(_address, _index).call();
  } catch (e) {
    console.log({ e });
  }
};

// get the address that deployed the NFT contract
export const fetchNftContractOwner = async (minterContract) => {
  try {
    let owner = await minterContract.methods.owner().call();
    return owner;
  } catch (e) {
    console.log({ e });
  }
};

export const swallow = async (minterContract, performActions, index) => {
  try {
    await performActions(async (kit) => {
      try {
        console.log(minterContract, index);
        const { defaultAccount } = kit;
        await minterContract.methods
          .swallowNFT(index)
          .send({ from: defaultAccount });
      } catch (error) {
        console.log({ error });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const upgrade = async (minterContract, performActions, index) => {
  try {
    await performActions(async (kit) => {
      try {
        const price = ethers.utils.parseUnits(String(0.5), "ether");
        const { defaultAccount } = kit;
        await minterContract.methods
          .upgradeNFT(index)
          .send({ from: defaultAccount, value: price });
      } catch (error) {
        console.log({ error });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (minterContract, performActions, index) => {
  try {
    await performActions(async (kit) => {
      try {
        const { defaultAccount } = kit;
        await minterContract.methods
          .remove(index)
          .send({ from: defaultAccount });
      } catch (error) {
        console.log({ error });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

```

Now lets break down the components

```javascript
import { ethers } from "ethers";

// mint an NFT
export const createNft = async (minterContract, performActions, name) => {
  await performActions(async (kit) => {
    if (!name) return;
    const { defaultAccount } = kit;

    try {
      let transaction = await minterContract.methods
        .mint(name)
        .send({ from: defaultAccount });

      return transaction;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  });
};
```

First, we made the necessary import and then we declared the `createNft()` function. This function is used to mint an NFT. It takes the `minterContract` and `performActions` as arguments, along with the name of the NFT. It then uses the `defaultAccount` from the kit to mint the NFT.

```javascript
export const getNfts = async (minterContract) => {
  try {
    const nfts = [];
    const nftsLength = await minterContract.methods.getNFTlength().call();
    // contract starts minting from index 1
    for (let i = 0; i < Number(nftsLength); i++) {
      const nft = new Promise(async (resolve) => {
        const _nft = await minterContract.methods.getAllNFTS(i).call();
        const owner = await fetchNftOwner(minterContract, i);
        resolve({
          index: i,
          powerValue: _nft.powerValue,
          name: _nft.name,
          owner: owner,
        });
      });
      nfts.push(nft);
    }
    return Promise.all(nfts);
  } catch (e) {
    console.log({ e });
  }
};
```

The `getNfts()` function is used to fetch all NFTs stored on the smart contract. It takes the `minterContract` as an argument and returns an array of NFTs.

```javascript
export const fetchNftOwner = async (minterContract, index) => {
  try {
    return await minterContract.methods.ownerOf(index).call();
  } catch (e) {
    console.log({ e });
  }
};
```

 The `fetchNftOwner()` function is used to get the owner address of an NFT. It takes the `minterContract` and the index of the NFT as arguments and returns the owner address.

 ```javascript
export const minted = async (minterContract, _address) => {
  try {
    return await minterContract.methods.hasMinted(_address).call();
  } catch (e) {
    console.log({ e });
  }
};
 ```

 The `minted()` function checks if a particular address has minted an NFT. It takes the `minterContract` and the `address` as arguments and returns a boolean.

 ```javascript
export const checkPowervalue = async (minterContract, _address, _index) => {
  try {
    return await minterContract.methods.canSwallowNFT(_address, _index).call();
  } catch (e) {
    console.log({ e });
  }
};
 ```

 The `checkPowervalue()` function is used to check the power value of an NFT. It takes the `minterContract`, `address`, and `index` of the NFT as arguments and returns a boolean.

 ```javascript
export const fetchNftContractOwner = async (minterContract) => {
  try {
    let owner = await minterContract.methods.owner().call();
    return owner;
  } catch (e) {
    console.log({ e });
  }
};
 ```

The `fetchNftContractOwner()` function is used to get the address that deployed the NFT contract. It takes the `minterContract` as an argument and returns the address.

```javascript
export const swallow = async (minterContract, performActions, index) => {
  try {
    await performActions(async (kit) => {
      try {
        console.log(minterContract, index);
        const { defaultAccount } = kit;
        await minterContract.methods
          .swallowNFT(index)
          .send({ from: defaultAccount });
      } catch (error) {
        console.log({ error });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
```

The `swallow()` function is used to swallow an NFT. It takes the `minterContract` and `performActions` as arguments, along with the index of the NFT. It then uses the `defaultAccount` from the kit to call the `swallowNFT` method and swallow the NFT.

```javascript
export const upgrade = async (minterContract, performActions, index) => {
  try {
    await performActions(async (kit) => {
      try {
        const price = ethers.utils.parseUnits(String(0.5), "ether");
        const { defaultAccount } = kit;
        await minterContract.methods
          .upgradeNFT(index)
          .send({ from: defaultAccount, value: price });
      } catch (error) {
        console.log({ error });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
```

The `upgrade()` function is used to upgrade an NFT. It takes the `minterContract` and `performActions` as arguments, along with the index of the NFT. It then uses the `defaultAccount` from the kit to call the `upgradeNFT` method and upgrade the NFT.

```javascript
export const remove = async (minterContract, performActions, index) => {
  try {
    await performActions(async (kit) => {
      try {
        const { defaultAccount } = kit;
        await minterContract.methods
          .remove(index)
          .send({ from: defaultAccount });
      } catch (error) {
        console.log({ error });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
```

The `remove()` function is used to remove an NFT. It takes the `minterContract` and `performActions` as arguments, along with the index of the NFT. It then uses the `defaultAccount` from the kit to call the remove method and remove the NFT.

There you have it. We have successfully interacted with our smart contract.

## Next Steps

I hope you learned a lot from this tutorial. Here are some relevant links that would aid your learning further.

- <https://docs.celo.org/>
- <https://solidity-by-example.org/>
- <https://www.openzeppelin.com/contracts>
- <https://docs.soliditylang.org/en/v0.8.17/>

## About the author

I'm Jonathan Iheme, A full stack block-chain Developer from Nigeria.

## References

- <https://web3.storage/docs/>
- <https://docs.celo.org/developer/contractkit/>
- <https://docs.celo.org/>
- <https://dacade.org/communities/celo/courses/celo-201/learning-modules/30a4b854-6722-488f-937f-c26591b89f2e>

Thank You!!
