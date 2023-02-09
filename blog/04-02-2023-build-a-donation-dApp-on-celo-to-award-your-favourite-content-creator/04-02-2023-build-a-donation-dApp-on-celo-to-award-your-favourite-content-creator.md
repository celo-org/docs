---
title: Build a Donation dApp on Celo to award your Favorite Content Creator
description: Build a Donation dApp on Celo to award your Favorite Content Creator
authors:
  - name: Aviraj Khare
url: https://github.com/avirajkhare00
image_url: https://github.com/avirajkhare00.png
tags: [celosage, advanced]
hide_table_of_contents: false
slug: /tutorials/build-a-donation-dapp-on-celo-to-award-your-favourite-content-creator
---

![header](../../src/data-tutorials/showcase/advanced/build-a-donation-dapp-on-celo-to-award-your-favourite-content-creator.png)

## Introduction

Hello guys. Today we are going to build a donation dApp. Building a donation dApp is an excellent example of a Blockchain use case. Building a donation dApp (decentralized application) on the blockchain can provide several benefits over traditional donation platforms. These include increased transparency, as all transactions on the blockchain are recorded on a public ledger that anyone can audit.

Additionally, using a blockchain-based platform can increase the security of donations, as it is more difficult to hack or tamper with transactions on a decentralized network. Additionally, it can increase trust and transparency in the donation process. It will be less prone to fraud or scams as the transactions are recorded on a public ledger and can be audited by anyone.

## Prerequisites

 - Knowledge of Solidity.
 - Knowledge of HTML, CSS, JavaScript.

## Requirements

 - **Hardhat:** We will use hardhat to write smart contract.
 - **Code editor:** Code editor of your choice.

## Let's go 🔥🔥🔥

Here is a list of what we are going to cover in this tutorial:
 - **Creating smart contract using hardhat.**
 - **Deploying smart contract on CELO testnet using hardhat.**
 - **Creating frontend using vanilla HTML, CSS and JavaScript.**

To begin with, we need to have a clear picture what our dApp is going to do. We want to donate to our favourite content creators. Here is how it is going to work:

1. Creator can get onboarded using our UI by uploading any digital file. This file will be stored in IPFS from the frontend.
2. Anyone will be able to reward the creator expect creator itself.
3. When user reward the creator in CELO, the amount will go directly to the creator.

Now we have the clear picture, let's get started...

## Code

### Smart Contract

Below is the smart contract that will faciliate all the features.

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CreatorReward {
    
    struct Creator {
        string name;
        string description;
        string ipfsHash;
        address payable wallet;
    }

    event CreatorLog(string name, string description, string ipfsHash, address indexed wallet);

    event RewardLog(address indexed donor, address indexed creator, uint256 indexed amount);

    Creator[] private creators;

    function createAccount(string memory _name, string memory _description, string memory _ipfsHash) public {
        creators.push(Creator(_name, _description, _ipfsHash, payable(msg.sender)));
        emit CreatorLog(_name, _description, _ipfsHash, msg.sender);
    }

    function creatorsNumber() public view returns (uint) {
        return creators.length;
    }

    function creatorById(uint _id) public view returns (string memory, string memory, address) {
        return(creators[_id].name, creators[_id].ipfsHash, creators[_id].wallet);
    }

    function rewardCreatorById(uint _id) public payable {
        require(msg.value > 0, "CELO amount must be greater then 0");
        require(msg.sender != creators[_id].wallet, "Creator cannot send CELO to itself")
        (bool sent, bytes memory data) = creators[_id].wallet.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        emit RewardLog(msg.sender, creators[_id].wallet, msg.value);
    }
}
```

Now let's see what this smart contract does:

```js
// SPDX-License-Identifier: MIT
```
Above line identifies the license, here in our case it is MIT.

```js
pragma solidity ^0.8.9;
```
Here we are defining solidity version. In our case, we are using solidity version greater then `0.8.9`.

```js
contract CreatorReward {}
```
This is the beginning of the contract. Name of our contract is `CreatorReward`.

```js
struct Creator {
    string name;
    string description;
    string ipfsHash;
    address payable wallet;
}
```
Here we have defined the `Creator` structure. We will store information of creator. As you can see, `name`, `description` and `ipfsHash` are of type `string`. `wallet` is of type `payable address` because we are storing wallet address of the creator and users can pay to her address.

```js
event CreatorLog(string name, string description, string ipfsHash, address indexed wallet);

event RewardLog(address indexed donor, address indexed creator, uint256 indexed amount);
```

Here, we have defined two events. First is `CreatorLog` and second is `RewardLog`.

`Event` in solidity serve special purpose. When a function of smart contract is executed, we can emit `event` also. Data of events is stored inside transaction transaction's log. Events are helpful in notifying the frontend of dApp to let user know something has happened.

`CreatorLog` takes `name`, `description`, `ipfsHash` and `wallet` address as arguments. We emit this event when a new creator is onboarded.

`RewardLog` takes `donor` address, `creator` address and `amount` of CELO rewarded to creator. This event is emitted when user rewards a creator.

```js
Creator[] private creators;
```
Here, we are creating `creators` array of type `Creator` to store all the creators who are getting onboarded. It is `private` in nature means one cannot read `creators` array.

```js
function createAccount(string memory _name, string memory _description, string memory _ipfsHash) public {
  creators.push(Creator(_name, _description, _ipfsHash, payable(msg.sender)));
  emit CreatorLog(_name, _description, _ipfsHash, msg.sender);
}
```
In the function above, `createAccount`, any user can call this function and can become a creator. This function takes `_name` `_description` and `_ipfsHash` as arguments.

we are pushing `Creator` data inside `creators` array to store creator's information.

Finally, we emit an event `CreatorLog` so that this data could be included in transaction receipt. We can even listen to this data and notify the user once she is onboarded.

```js
function creatorsNumber() public view returns (uint) {
  return creators.length;
}
```
We have created `creatorsNumber` function that returns total number of creators onboarded so far.

```js
function creatorById(uint _id) public view returns (string memory, string memory, address) {
    return(creators[_id].name, creators[_id].ipfsHash, creators[_id].wallet);
}
```
Above function returns creator's data by id. It returns name, ipfsHash and wallet address of an creator.

```js
function rewardCreatorById(uint _id) public payable {
    require(msg.value > 0, "CELO amount must be greater then 0");
    require(msg.sender != creators[_id].wallet, "Creator cannot send CELO to itself")
    (bool sent, bytes memory data) = creators[_id].wallet.call{value: msg.value}("");
    require(sent, "Failed to send Ether");

    emit RewardLog(msg.sender, creators[_id].wallet, msg.value);
    }
```
In the above function, we are rewarding creator in CELO. First two conditions are, CELO sent should be greater then equal to 0 and creator can;t fund itself. In the end, we are emitting `RewardLog` event so that information could be included in transaction receipt.

You can clone this repository -> https://github.com/avirajkhare00/celo-creator-reward-dapp.git

It contains codebase both for smart contracts and frontend.

In order to deploy smart contract via hardhat on `alfajores` testnet, execute the following command:

```sh
npx hardhat run scripts/deploy.js --network alfajores
```

Since we have covered our smart contract. It's time we start with our frontend.

I can't go through the entire code but I will explain here all the functions that are interacting with the blockchain.

```js
function getTotalCreators() {
    const creators = contract.methods.creatorsNumber().call();
    return creators;
}
```
This function is getting all the creators so that we can get the data of all the creators.

```js
async function onboardCreator(name, description, ipfsHash) {
    const account = await getAccount();
    await contract.methods.createAccount(name, description, ipfsHash).send({ from: account });
}
```
This function is used to onboard a creator. It accepts name, description and ipfsHash of the creator.

```js
async function rewardCreatorById(creatorId){
    let account = await getAccount();
    let amount = document.getElementById(`input${creatorId}`).value;
    await contract.methods.rewardCreatorById(creatorId).send({from: account, value: web3.utils.toWei(amount, 'ether')});
}
```
This function is used to reward the content creator. It takes creatorId and rewards the creator.

Here is how the dApp looks like.
![dApp](https://i.imgur.com/OZVu86s.png)

Once you reward a creator, you can look in the internal transaction that amount went to the creator.

![Blockchain Transaction](https://i.imgur.com/y9pjupZ.png)

Thanks a lot for following this tutorial so far.

## About the author

Aviraj Khare
Ex Gojek, into web3 space since 2016.

## References
 - https://web3js.readthedocs.io/en/v1.8.2/
 - https://getbootstrap.com/
 - https://docs.soliditylang.org/en/v0.8.18/
 - https://hardhat.org/
