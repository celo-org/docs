---
title: Create Deploy and Mint your ERC223 contract on Celo with Hardhat
description: This tutorial is an expository piece on the ERC223 token standard, also explaining how to create and deploy a sample ERC223 contract 
authors:
  - name: Mayowa Julius Ogungbola
    title: Software Engineer, Technical writer @Celo Foundation
    url: https://github.com/Julius170
    image_url: https://avatars.githubusercontent.com/u/69092079?s=400&u=f34c84ee03afb9a51b163652b750419e98ed7456&v=4
tags: [solidity, hardhat, smartcontract, intermediate, celo, celosage]
hide_table_of_contents: true
slug: /tutorials/create-deploy-and-mint-your-eRC223-contract-on-celo-with-hardhat
---

![ERC223-token-contract](https://user-images.githubusercontent.com/69092079/225619279-62950fe2-6aca-4f1c-ae57-31ad270ec809.png)

## Introduction​
In the current state of web3 and its approach to decentralization, NFTs are now to the technical and non-technical web3 enthusiasts community. Understanding the different types of NFTs available and when they can use them would be a much more innovative way to implement these tokens in the real world.

In this tutorial, you’ll learn about a new guy in play, the ERC223 token standard. This tutorial will explain in depth everything you need to know about the ERC223 token standard, how to create, Deploy and Mint them on the Celo blockchain how to interact with these tokens on the blockchain.

## Prerequisites​
Before diving into creating, deploying, and minting ERC-223 tokens on Celo, it is essential to understand the prerequisites for the process. This includes having a basic understanding of the following. 

* **Hardhat**: Hardhat is a development environment for building and testing smart contract applications on the Ethereum blockchain. It provides a suite of powerful and flexible tools and services that make developing, testing, and deploying smart contracts easier.

* **Solidity**: this is an object-oriented programming language used to create smart contracts. It is designed to target the Ethereum Virtual Machine (EVM) and provides a wide range of features, including inheritance, libraries, and user-defined types. 

* **OpenZeppelin**: is an open-source framework for developing and deploying secure smart contracts on Ethereum and other blockchains. It provides a set of tools and libraries that make it easier to write secure and reliable smart contracts.

* **Node Package Manager**: Additionally, it is important to have familiarity with the Node Package Manager (`npm`). `npm` is a package manager for JavaScript and is used for installing, uninstalling, and managing package dependencies in a project.



## Understanding the ERC223 Token Standard
The ERC223 is a token standard for the Ethereum blockchain proposed in 2017 to improve the popular ERC20 token standard. One interesting fact about ERC223 is that it addresses a potential security issue in ERC20 that can result in the loss of tokens.

In ERC20, if tokens are accidentally sent to a smart contract that does not support them, they can become irretrievable. This is because the contract does not have a way to handle incoming token transactions, so the tokens get stuck in the contract and cannot be returned to the sender. This problem is known as the "missing token" problem.

ERC223 solves this problem by including a fallback function in the smart contract that can handle incoming token transactions. If tokens are accidentally sent to a contract without support, the fallback function can reject the transaction and return the tokens to the sender. This makes ERC223 tokens more secure and less prone to accidental loss than ERC20 tokens.

According to the ERC223 token standard contract creators, the basic motivation behind creating the contract was the massive amount of ERC20 tokens being lost on transactions when being transferred to an unintended or unsupported token contract. You can visit the [link](https://github.com/Dexaran/ERC223-token-standard) for more information about the contract specifications.


![motivation](https://user-images.githubusercontent.com/69092079/225621959-df5ae0e9-cf45-4c44-adad-da04fb43bed6.png)


## Using the ERC223 Token Standard

1. Contract-Based Trading: ERC223 tokens can be used to facilitate contract-based trading. This allows users to create contracts with conditions that must be met for the trade to be completed. This helps ensure that both parties are satisfied with the terms of the trade. 

2. Security Token Offerings: ERC223 tokens can be used to facilitate Security Token Offerings (STOs). These tokens represent a company’s assets and are backed by real-world assets. By using ERC223 tokens, companies can issue digital securities that are compliant with regulatory standards.

3. Non-Fungible Tokens: Non-fungible tokens (NFTs) are unique tokens that can’t be interchanged. They represent digital assets such as art, music, and game items. ERC223 tokens can be used to facilitate the creation and trading of NFTs on the Ethereum blockchain. 	

4. Decentralized Exchanges: ERC223 tokens can be used to facilitate decentralized exchanges. These exchanges allow users to buy and sell digital assets without the need for a third party. This
5.  provides users with more control over their funds and can help reduce transaction costs. 

5. Payment Systems: ERC223 tokens can be used to facilitate payment systems. This allows users to send and receive payments using digital assets on the Ethereum blockchain. This can be used to facilitate payments between individuals, companies, and organizations.

6. Loyalty Token: The company can issue the ERC223 token to reward loyal customers by providing them with incentives such as discounts, cashback, or other rewards.

7. Gaming Token: The gaming platform would use the ERC223 token as in-game currency, allowing players to earn rewards and trade items on the blockchain.

8. Fundraising Token: ERC223 token can be used to raise funds for various projects, offering investors a stake in the project or access to exclusive benefits.

9. Asset tokens: ERC223 token represent assets such as real estate or other physical assets, allowing for fractional ownership and easy transfer of ownership.

10. Voting tokens: ERC223 tokens can be used for voting in decentralized autonomous organizations (DAO), giving token holders a say in the decision-making process.

## Setting up Hardhat
To commence the minting of your contract, it is necessary to configure Hardhat as the development environment for Ethereum. In the forthcoming steps, you will establish a Hardhat workspace through npm or any other preferred Package Manager.

1. Create a new workspace directory as the main directory in your preferred code editor.

2. Navigate to your preferred terminal to run the following command to get started, `npm init -y`, This command will create a new project template, including a `package.json` file where you’ll have your other installed packages.

3. Next, run the command `npm install hardhat @nomiclabs/hardhat-waffle @nomicfoundation/hardhat-toolbox @openzeppelin/contracts @nomiclabs/hardhat-waffle`. Also, run the command `npm i hardhat-deploy dotenv` on your terminal to install all the required dependencies you'll need for this tutorial.

4. Next, run the command `npx hardhat` to fire up your hardhat development environment. You will be prompted to choose the language you'll be working with

5. Click enter three times to choose the options to create a `Javascript Project`, and to verify the project location. You will notice a new folder structure on your code editor’s file explorer.

6. Rename the file in your contract folder to `MyToken.sol`, and delete the code inside the file.

7. Copy the code below and replace it with the code inside your `hardhat.config.js` script in the main directory with this;

```solidity
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });
require("hardhat-deploy");
 
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
 
// Prints the Celo accounts associated with the mnemonic in .env
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
 
  for (const account of accounts) {
    console.log(account.address);
  }
});
 
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "alfajores",
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545",
    },
    alfajores: {
      gasPrice: 1500000000,
      gas: 4100000,
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/52752'/0'/0",
      },
      //chainId: 44787
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/52752'/0'/0",
      },
      chainId: 42220,
    },
  },
  solidity: "0.8.10",
};
```


Now that you have successfully installed and set up your hardhat development environment. Next, you can get started with creating your ERC233 smart contract.


## Creating the ERC223 Token Standard Contract

The ERC223 token is more or less like the popular ERC20 token, with an upgrade. Basically it has all the functionalities and works very similarly to the ERC20 token with modifications. An additional fallback function for reversing a non-supported token.

Using a verified and audited ERC223 sample from Openzeppelin, the following function defines the implementation of the ERC223 token standard;

- Head over to the contract directory to copy and paste the code below into your contract file `MyToken.sol`.

```solidity
// SPDX License-Identifier: MIT
/**
 * @title Contract that will work with ERC223 tokens.
 */
pragma solidity ^0.8.0;


/**
 * @dev Interface of the ERC223 standard token as defined in the EIP.
 */
abstract contract IERC223 {
    function name() public view virtual returns (string memory);


    function symbol() public view virtual returns (string memory);


    function standard() public view virtual returns (string memory);


    function decimals() public view virtual returns (uint8);


    function totalSupply() public view virtual returns (uint256);


    function balanceOf(address who) public view virtual returns (uint);


    function transfer(
        address to,
        uint value
    ) public virtual returns (bool success);


    function transfer(
        address to,
        uint value,
        bytes calldata data
    ) public virtual returns (bool success);


    event Transfer(address indexed from, address indexed to, uint value);


    event TransferData(bytes data);
}


abstract contract IERC223Recipient {
    struct ERC223TransferInfo {
        address token_contract;
        address sender;
        uint256 value;
        bytes data;
    }


    ERC223TransferInfo private tkn;


    function tokenReceived(
        address _from,
        uint _value,
        bytes memory _data
    ) public virtual {
        tkn.token_contract = msg.sender;
        tkn.sender = _from;
        tkn.value = _value;
        tkn.data = _data;
    }
}


library Address {
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }


    function toPayable(
        address account
    ) internal pure returns (address payable) {
        return payable(account);
    }
}


/**
 * @title Reference implementation of the ERC223 standard token.
 */
contract MyToken is IERC223 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    uint256 private _totalSupply;


    mapping(address => uint256) public balances; // List of user balances.


    constructor() {
        _name = "PHENZ";
        _symbol = "PHZ";
        _decimals = 10;
        _totalSupply = 100000000000000000000;
    }


    function standard() public pure override returns (string memory) {
        return "erc223";
    }


    function name() public view override returns (string memory) {
        return _name;
    }


    function symbol() public view override returns (string memory) {
        return _symbol;
    }


    function decimals() public view override returns (uint8) {
        return _decimals;
    }


    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }


    function balanceOf(address _owner) public view override returns (uint256) {
        return balances[_owner];
    }


    function transfer(
        address _to,
        uint _value,
        bytes calldata _data
    ) public override returns (bool success) {
        // Standard function transfer similar to ERC20 transfer with no _data .
        // Added due to backwards compatibility reasons .
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if (Address.isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value);
        emit TransferData(_data);
        return true;
    }


    function transfer(
        address _to,
        uint _value
    ) public override returns (bool success) {
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if (Address.isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value);
        emit TransferData(_empty);
        return true;
    }
}

```


- First, the contract defines an interface called "IERC223" which includes the standard functions that an ERC223 token should implement, such as `name`, `symbol`, `total supply`, `balance of`, and `transfer`.


```solidity
pragma solidity ^0.8.0;

abstract contract IERC223 {
    function name() public view virtual returns (string memory);
    function symbol() public view virtual returns (string memory);
    function standard() public view virtual returns (string memory);
    function decimals() public view virtual returns (uint8);
    function totalSupply() public view virtual returns (uint256);
    function balanceOf(address who) public view virtual returns (uint);
    function transfer(address to, uint value) public virtual returns (bool success);
    function transfer(address to, uint value, bytes calldata data) public virtual returns (bool success);
    event Transfer(address indexed from, address indexed to, uint value);
    event TransferData(bytes data);
}
```

- After that, the contract defines an abstract contract called "IERC223Recipient". This contract includes a struct called "ERC223TransferInfo" that contains information about the token transfer, such as the token contract address, the sender address, the value, and any data that is sent along with the transfer. The contract also includes a function called "tokenReceived" which is a hook that is called when a contract receives a transfer of ERC223 tokens. This function is responsible for processing the data that is sent along with the tokens.


```solidity
abstract contract IERC223Recipient {
    struct ERC223TransferInfo {
        address token_contract;
        address sender;
        uint256 value;
        bytes data;
    }
    ERC223TransferInfo private tkn;
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual {
        tkn.token_contract = msg.sender;
        tkn.sender = _from;
        tkn.value = _value;
        tkn.data = _data;
    }
}
```


- The contract also includes a library called `Address`, which includes two functions. The first function called `isContract`, checks whether a given address is a contract or not. This function uses the `extcodesize`, assembly instruction to check whether the address has bytecode or not. If the size of the bytecode is greater than zero, the address is considered to be a contract. The second function called `toPayable`, is used to convert a given address to a payable address. This function is used when transferring tokens to a contract address.


```solidity
library Address {
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
    function toPayable(address account) internal pure returns (address payable) {
        return payable(account);
    }
}
```


- Finally, the contract `MyToken` implements the IERC223 interface and defines its specific details, such as the token `name`, `symbol`, `decimal`, and total supply. It also includes two transfer functions. The first is with data, and the other is without data, which handles the transfer of tokens and any accompanying data.

- If the destination address is a contract, it calls the `tokenReceived`, function of the recipient contract and passes along the token transfer information. The contract also updates the balance of the sender and recipient and emits the `Transfer` and `TransferData` events. 

- Overall, the ERC223 token standard allows for the transfer of tokens along with any accompanying data. The use of an abstract contract and library provides modularity and reusability in the code.



## Deploying The ERC223 token standard

In the next few step, you will deploy your ERC223 contract;

1. First, create a new file and name the file .env and create a  variable name `MNEMONIC`
2. Now, login to your preferred wallet extension on your browser to get your wallet MNEMONIC, and copy the entire phrase.
***Note: Your wallet MNEMONICS is the same as the key phrase given to you when you initially created your wallet account. It usually ranges from 12 to 18 random words for verifying your ownership, like a passphrase***.

3. Paste the MNEMONIC phrase as the value for the variable MNEMONIC inside your `.env` file.

***Note: Your MNEMONICS should be kept secret and secure (Not public) at all points. DO NOT REVEAL this phrase at all times. No quotes should be added***.

4. Now, go to your deploy.js script inside the `scripts` folder and copy and paste the code below into the file:

```solidity
const hre = require("hardhat");


const main = async () => {
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const Token = await MyToken.deploy();
  await Token.deployed();


  console.log("The MyToken contract was deployed to: ", Token.address);
};


const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


runMain();

```

5. Next, run the command `npx hardhat compile`, and your contract should be compiled without any error, with the result like the image below:

![compiled](https://user-images.githubusercontent.com/69092079/225623148-edd9e69f-0ffb-4b08-874c-738b0f543ce3.jpg)


6. Finally, run the command npx hardhat `$ npx hardhat run scripts/deploy.js --network alfajores`, and successful execution of the command should look like the image below:

![deployed](https://user-images.githubusercontent.com/69092079/225623246-208979a5-9fde-44c5-86b3-769af4cc3611.png)


## Conclusion​
Overall, creating and deploying an ERC223 smart contract on Celo is an exciting opportunity for developers to explore the potential of decentralized finance (DeFi) and create innovative new applications that can revolutionize the financial landscape. As the blockchain industry continues to grow and evolve, the use of smart contracts on platforms like Celo will become increasingly important, and developers who understand how to leverage this technology will be well-positioned for success in the future.


## Next Steps​
Here are some other NFT-related tutorial articles you might be interested in reading about:

* [Build an NFT collection on Celo](https://www.celosage.com/how-to-quickly-build-an-nft-collection-on-celo/)
* [Deploy an ERC 721 contract using Tatum API](https://www.celosage.com/how-to-deploy-an-erc721-smart-contract-using-the-tatum-api/)
* [Minting your ERC1155 token on Celo](https://www.celosage.com/how-to-mint-your-own-erc1155-nft-on-celo/)
* [Redeploying your Ethereum Dapp on Celo](https://www.celosage.com/how-to-re-deploy-your-ethereum-dapp-to-celo-with-hardhat/)

## About the Author​
Mayowa Julius Ogungbola
Is a Software Engineer and technical Writer always open to working on new Ideas. I enjoy working on [Github](https://github.com/Julius170/), and you can also find out what I [tweet](https://twitter.com/JuliusAyoola1) about and connect with me on [LinkedIn](https://www.linkedin.com/in/julius-ogungbola-a71810229/).

## References​
Here are links to relevant details about the ERC223 token standard:

* [The ERC2233 contract](https://github.com/Dexaran/ERC223-token-standard/)
* [Learning Solidity: ERC223 token contract](https://www.youtube.com/watch?v=IWC9-yGoDGs)
* [Ethereum Token: ERC223 token contract](https://www.youtube.com/watch?v=7yKvh8esaQw&t=2s)
