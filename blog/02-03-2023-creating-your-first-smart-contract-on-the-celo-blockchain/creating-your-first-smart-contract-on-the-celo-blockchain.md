---
title: How to create your first smart contract on the celo blockchain
description: This tutorials teaches you how to create your first sample smart contract and deploy it on the celo blockchain,

authors:
  - name: Israel Okunaya
    title: Product Manager, Technical Writer
    url: https://github.com/Southpaw0
    image_url: https://avatars.githubusercontent.com/u/63967068635aec01899ef4de/download/13.png
tags: [celosage, smartcontract, solidity, remix]
hide_table_of_contents: true
slug: /tutorials/create-your-first-smart-contract-on-celo
---

![header](../../src/data-tutorials/showcase/beginner/create-your-first-smart-contract-on-celo.png)

## Introduction​

In this article, we will be building a crowdfunding smart contract using [hardhat](https://hardhat.org/) and deploying the smart contract to the Celo blockchain. Hardhat is a development environment for Ethereum software. With hardhat, you can write your smart contract, deploy them, run tests, and debug your code.

## Prerequisites​

For the purpose of this article, you will need to have basic knowledge of the solidity language and javascript.

## Requirements​

Having a code editor, VScode preferably, a chrome browser and the Celo wallet extension installed on your chrome browser is a requirement for this tutorial. If you don’t have the Celo wallet extension installed, follow this video tutorial on how to [install the Celo wallet extension](https://youtu.be/KD_0kKxtl8c) [on your chrome browser](https://youtu.be/KD_0kKxtl8c).

## The Crowdfunding Smart Contract

To set up the project, open a terminal and run these commands.

```bash
mkdir crowdfunding-contract 
cd crowdfunding-contract 
npm init --yes 
npm install --save-dev hardhat @nomiclabs/hardhat-waffle

```

In summary, the above commands create a crowdfunding-contract directory/folder for our project, change the current directory to the one we created for the project, initialize a package.json file to manage our project metadata and dependencies, and install hardhat.

In the same directory where you installed Hardhat, run:

```bash
npx run hardhat

```

Select `Create a Javascript Project` and follow the steps. This sets up a new Hardhat project.

## Writing The Smart Contract Code

Now that your project has been set up, create a new file in the contracts directory called `CrowdFunding.sol`.

At the top of the `CrowdFunding.sol`, we indicate the license and the solidity version we intend to use.

```solidity
//SPDX-License-Identifier: 
MIT pragma solidity ^0.8.4;

```

Next, we create our contract and declare some necessary variables.

```solidity
contract CrowdFunding {
      address payable public owner; 
      uint public minimumContribution; 
      address[] public contributors; 
}

```

In our contract, we have a variable `owner` of type `address`, which we will use to store the `address` of the contract creator/owner, we also created a `minimumContibution` variable of type `uint` that would receive the value for the minimum amount of contribution that can be made to the contract and also a list of `address` to store contributors who have donated to the smart contract.

Next, we set up our contract’s constructor, which will require the value of the minimum amount a contributor can make to the smart contract, as its input.

```solidity
constructor(uint minimum) { 
       owner = payable(msg.sender); 
       minimumContribution = minimum; 
}
///```

Next, we create a `modifier` function that allows us to modify the behavior of our functions.

```solidity
modifier onlyOwner() {
        require(owner == msg.sender);
         _; 
}

```

The modifier `onlyOwner` allows us to restrict the call of some functions in our smart contract to only the owner/creator of the contract.

Next, we create our first function `contribute`, which will enable contributors to make donations to the smart contract.

```solidity
function contribute() public payable { 
       require(msg.value > minimumContribution); 
       contributors.push(msg.sender); 
}

```

Next, we will create two more functions `withdraw` and `viewBalance`. The `withdraw` function will require the amount to withdraw from the smart contract to the owner’s address as its input. You should note that only the owner of this smart contract can call the withdraw function.

```solidity
function withdraw(uint amount) public onlyOwner returns (bool) { 
       require(amount < address(this).balance); 
       owner.transfer(amount); 
       return true; 
}
```

The `viewBalance` function allows only the owner to view the total amount of donations made to the crowdfunding smart contract.

```solidity
function viewBalance() public view onlyOwner returns (uint) { 
       return address(this).balance; 
}

```

Next, we will create the last function called `viewContributors`, which will return a list of addresses of contributors that have made donations to our crowdfunding smart contract.

```solidity
function viewContributors() public view onlyOwner returns (address[] memory) { 
       return contributors; 
}

```

In the end, your code should look like this:

```solidity
//SPDX-License-Identifier: 
MIT pragma solidity ^0.8.4;

contract CrowdFunding {
      address payable public owner; 
      uint public minimumContribution; 
      address[] public contributors; 

      constructor(uint minimum) { 
             owner = payable(msg.sender); 
             minimumContribution = minimum; 
      }
      
      modifier onlyOwner() {
              require(owner == msg.sender);
              _; 
      }

      function contribute() public payable { 
             require(msg.value > minimumContribution); 
             contributors.push(msg.sender); 
      }

      function withdraw(uint amount) public onlyOwner returns (bool) { 
             require(amount < address(this).balance); 
             owner.transfer(amount); 
             return true; 
      }

      function viewBalance() public view onlyOwner returns (uint) { 
             return address(this).balance; 
      }

}

```

Compile the contract, open a terminal and execute this command

```bash
npx hardhat compile

```

## Configure Deployment

As I mentioned earlier, we will be deploying the smart contract to the Celo test blockchain. To do this, we will need to connect to the Alfajores testnet through forno by writing a deployment script. first, we will replace the content of the default `hardhat.config.js` file provided to us by hardhat with the [configuration code](https://github.com/celo-org/DevRel/blob/main/configuration/hardhat.config.js) for deployment made available by Celo.

```javascript
require("@nomiclabs/hardhat-waffle"); 
require('dotenv').config({path: 'process.env'}); 
require('hardhat-deploy'); 
// You need to export an object to set up your config 
// Go to https://hardhat.org/config/ to learn more 

// Prints the Celo accounts associated with the mnemonic in .env
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => { 
    const accounts = await hre.ethers.getSigners(); 

    for (const account of accounts) { 
       console.log(account.address); 
     } }); 

 /** 
  * @type import('hardhat/config').HardhatUserConfig 
  */ 
module.exports = { 
     defaultNetwork: "alfajores", 
     networks: { 
         localhost: { 
               url: "http://127.0.0.1:7545" 
               }, 
               alfajores: { 
                  url: "https://alfajores-forno.celo-testnet.org", 
                  accounts: { 
                      mnemonic: process.env.MNEMONIC, 
                      path: "m/44'/52752'/0'/0" 
                  }, 
                  //chainId: 44787 
               }, 
               celo: { 
                  url: "https://forno.celo.org", 
                  accounts: { 
                      mnemonic: process.env.MNEMONIC, 
                      path: "m/44'/52752'/0'/0"
                  }, 
                  chainId: 42220 
               }, 
      }, 
      solidity: "0.8.4", 
};
```

In the `hardhat.config.js`, add the gas price and gas to the Alfajores object.

```solidity
alfajores: {
   gasPrice: 200000000000,
   gas: 41000000000, 
   url: "https://alfajores-forno.celo-testnet.org", 
   accounts: { 
       mnemonic: process.env.MNEMONIC, 
       path: "m/44'/52752'/0'/0" 
    }, 
    //chainId: 44787 
 }

```

[Check out](https://docs.celo.org/developer/deploy/hardhat) the Celo doc for more details on what each part of the configuration code does.
Now we would have to install dotenv package in order to import the env file and use in the config file.

```bash
npm install dotenv

```

Now create a `.env` in your project root folder and add the following line

```javascript
MNEMONIC=//Go to your celo wallet, copy and paste your 24 key phrase

```

## Deploy to Celo

Run the following command in your project root directory to deploy your smart contract to the Celo Alfajores testnet.

```bash
npx hardhat run scripts/deploy.js --network alfajores

```

## View Contract Deployment

To view your deployed smart contract, copy the smart contract address from the terminal and navigate to the block explorer to search for your deployed contract.

### Conclusion​

So far, we have been able to initialize our project folder, create a crowdfunding smart contract with solidity, configure the hardhat.config.js and successfully deploy the smart contract to the Celo blockchain.

### Next Steps​

The next step is to verify your smart contract on the Celo explorer. Follow the guidelines in this Celo doc to [verify your smart contract on Celo explorer](https://explorer.celo.org/).

### About the Author​

[Israel Okunaya](https://meetisraelokunaya.curious.page/) is a food and blockchain writer, content marketer and a product manager with a flair for simplifying complexities especially in the blockchain and web3 space.

### References​

Check out the [Celo docs](https://docs.celo.org/) for more information on building on the Celo blockchain.
You can also check out [Learnweb3 Dao](https://learnweb3.io/) for more web3 content and courses.
