---
title: How to Build a Crowdfunding Platform on Celo
description: In this tutorial, we will guide you through the process of building a crowdfunding platform on the Celo blockchain.
authors:
  - name: Aviraj Khare
url: https://github.com/avirajkhare00
image_url: https://github.com/avirajkhare00.png
tags: [celosage, advanced]
hide_table_of_contents: false
slug: /tutorials/how-to-build-a-crowdfunding-platform-on-celo
---

![header](../../src/data-tutorials/showcase/advanced/how-to-build-a-crowdfunding-platform-on-celo.png)

## Introduction

Hello everyone. Today we are going to build a crowdfunding platform on Celo. If you don't know about Celo, it is a carbon-negative, mobile-first EVM-compatible blockchain. In this blog, I will show you how to build a crowdfunding platform from scratch on top of Celo Blockchain. Blockchain offers transparency and it is borderless, so it makes sense to build the crowdfunding platform on Celo.

## Prerequisites

- Knowledge of Solidity.
- Knowledge of HTML, CSS, and JavaScript.

## Requirements

- **Hardhat:** We will use hardhat to write the smart contract.
- **Code editor:** Code editor of your choice.

## Let's go 🔥🔥🔥

Here is a list of what we are going to cover in this tutorial:

- **Creating the smart contract using hardhat.**
- **Deploying smart contract on CELO testnet using hardhat.**
- **Creating frontend using vanilla HTML, CSS and JavaScript.**

In this dApp, any user can create a cause. Any user can fund it. Funds will go directly toward the creator of a cause. Once we hit the target, the cause will be funded and no one can further fund it.

So let's start and code our Smart Contract first.

## Code

### Setting up hardhat

I have created a directory named `celo-crowdfunding-platform`.
Once you are inside it, run the command: `npx hardhat`. You will need to select `create an empty hardhat.config.js` option. Once done, you can see two files, `hardhat.config.js` and `package.json` file.

Now, create a directory named `contracts` and inside it, create a file named `CrowdFund.sol`.

Now let's code our smart contract.

### Smart Contract

Let's add the following lines in the code editor.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

In the above lines, I have added the MIT license and we will be using a solidity version greater than `0.8.9`.

Now, we will create a contract named `CrowdFund`.

```solidity
contract CrowdFund {}
```

Now we will create a struct named `Cause` and it will have `name`, `description`, `ipfsHash`, `target`, `raised` and `wallet` as its variables.

So our smart contract will now look something like this:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CrowdFunding {

    struct Cause {
        string name;
        string description;
        string ipfsHash;
        uint256 target;
        uint256 raised;
        address payable wallet;
    }

}
```

It's time to define our events. In `Solidity`, `events` are dispatched signals that smart contracts can fire. When you call events, they cause the arguments to be stored in the transaction’s log, which is a special data structure in the blockchain. Events notify external users, such as a listening frontend website or client application, that something has happened on the blockchain.

We will be defining two events called `NewCauseLog` and `CauseFundLog`.

```solidity
event NewCauseLog(string name, string description, string ipfsHash, uint256 target, uint256 raised, address indexed wallet);

event CauseFundLog(string name, string description, string ipfsHash, uint256 target, uint256 raised, address indexed wallet);
```

We will be firing these events inside functions.

We will emit events in two cases, when a new cause is created and when someone will fund a cause.

Now we will create an array named `causes` of type `Cause`.

It will store all the causes created within the smart contract.

```solidity
Cause[] private causes;
```

Now we will work on the functions of the smart contracts. Using our first function, anyone can create a cause.

```solidity
function createCause(string memory _name, string memory _description, string memory _ipfsHash, uint256 _target) public {
    causes.push(Cause(_name, _description, _ipfsHash, _target, 0, payable(msg.sender)));
    emit NewCauseLog(_name, _description, _ipfsHash, _target, 0, msg.sender);
}
```

Here, in this function `createCause`, it is taking `name`, `description`, `ipfsHash`, `target` as arguments. First, this function pushes the data inside `causes` array, then it emits `NewCauseLog`.

Now, we want to know the total number of causes, so we will just create a function for that so that we can know how many total `causes` are there.

```solidity
function totalCauses() public view returns(uint) {
    return causes.length;
}
```

Now, we will create a function so that we can retrieve a cause by its id.

```solidity
function causeById(uint _id) public view returns(string memory, string memory, string memory, uint256, uint256) {
    return (causes[_id].name, causes[_id].description, causes[_id].ipfsHash, causes[_id].target, causes[_id].raised);
}
```

`causeById` function takes `_id` as an argument and returns `name`, `description`, `ipfsHash`, `target` and `raised`.

Now, it's time for our main function, called `fundCauseById` which takes cause `id` and is a `payable` function.

```solidity
function fundCauseById(uint _id) public payable {
    require(msg.value > 0, "CELO amount must be greater then 0");
    require(msg.value <= causes[_id].target, "CELO amount must be less then target amount");
    require(causes[_id].raised <= causes[_id].target, "This cause is funded");
    causes[_id].raised += msg.value;
    (bool sent, bytes memory data) = causes[_id].wallet.call{value: msg.value}("");
    require(sent, "Failed to send Ether");
    emit CauseFundLog(causes[_id].name, causes[_id].description, causes[_id].ipfsHash, causes[_id].target, causes[_id].raised, causes[_id].wallet);
}
```

In this function, in the beginning, we have set up three required conditions.

- `CELO` sent should be greater than 0.
- `CELO` sent should be less than the target amount of the cause.
- If a cause raised the required funds, then it won't accept any new donations for the cause.

In the fourth line, `causes[_id].raised += msg.value`, we are incrementing the raised variable every time a new donation is made.

```solidity
(bool sent, bytes memory data) = causes[_id].wallet.call{value: msg.value}("");
require(sent, "Failed to send Ether");
```

In the above line, we are transferring the `CELO` to the wallet address of a person who created a cause and we are checking that `CELO` is sent successfully to the creator.

At last, we are emitting `CauseFundLog`.

Below is the full smart contract.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CrowdFund {

    struct Cause {
        string name;
        string description;
        string ipfsHash;
        uint256 target;
        uint256 raised;
        address payable wallet;
    }

    event NewCauseLog(string name, string description, string ipfsHash, uint256 target, uint256 raised, address indexed wallet);
    event CauseFundLog(string name, string description, string ipfsHash, uint256 target, uint256 raised, address indexed wallet);

    Cause[] private causes;

    function createCause(string memory _name, string memory _description, string memory _ipfsHash, uint256 _target) public {
        causes.push(Cause(_name, _description, _ipfsHash, _target, 0, payable(msg.sender)));
        emit NewCauseLog(_name, _description, _ipfsHash, _target, 0, msg.sender);
    }

    function totalCauses() public view returns(uint) {
        return causes.length;
    }

    function causeById(uint _id) public view returns(string memory, string memory, string memory, uint256, uint256) {
        return (causes[_id].name, causes[_id].description, causes[_id].ipfsHash, causes[_id].target, causes[_id].raised);
    }

    function fundCauseById(uint _id) public payable {
        require(msg.value > 0, "CELO amount must be greater then 0");
        require(msg.value <= causes[_id].target, "CELO amount must be less then target amount");
        require(causes[_id].raised <= causes[_id].target, "This cause is funded");
        causes[_id].raised += msg.value;
        (bool sent, bytes memory data) = causes[_id].wallet.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        emit CauseFundLog(causes[_id].name, causes[_id].description, causes[_id].ipfsHash, causes[_id].target, causes[_id].raised, causes[_id].wallet);
    }

}
```

### Deploying smart contract on CELO testnet using hardhat

It's time to deploy the smart contract via hardhat. To do this, we need to add `alfajores` testnet config inside `hardhat.config.js`` file.

```js
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: ["YOUR_PRIVATE_KEY_HERE"]
    },
  },
};
```

Now, create a directory called `scripts` and create a file named `deploy.js`.

Insert the following lines of code inside `deploy.js` file.

```js
const hre = require("hardhat");

async function main() {
  const CrowdFund = await hre.ethers.getContractFactory("CrowdFund");
  const crowdFund = await CrowdFund.deploy();

  await crowdFund.deployed();

  console.log(
    `Crowd Fund smart contract address: ${creatorReward.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

It's time to deploy our contract on the testnet. Make sure you have enough `CELO` in your account.

To deploy the contract, run the following command:

```sh
npx hardhat run scripts/deploy.js
```

Once the script runs, you will see output something like this.

![Hardhat output](https://i.imgur.com/4bdhmVy.png)

Once you deploy it, you will get the smart contract address.

### Creating frontend using vanilla HTML, CSS and JavaScript

It's time to get started with the frontend code.

We will be using `Bootstrap` as our frontend UI library and vanilla JS.

Below is the frontend code:

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CELO crowdfunding dApp</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
</head>

<body>
    <center>
        <h1>CELO crowdfunding platform!</h1>
    </center>

    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
            <center>
                <h2>Create a cause</h2>
            </center>
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="mb-3 form-floating">
                    <textarea class="form-control" placeholder="Your description..." id="description"
                        style="height: 100px"></textarea>
                    <label for="description">Description</label>
                </div>
                <div class="mb-3">
                    <label for="ipfsHash" class="form-label">IPFS Hash</label>
                    <input type="text" class="form-control" id="ipfsHash">
                </div>
                <div class="mb-3">
                    <label for="targetAmount" class="form-label">Target Amount(in Wei)</label>
                    <input type="number" class="form-control" id="targetAmount">
                </div>
                <button type="button" id="createCauseSubmitBtn" class="btn btn-primary">Submit</button>
            </form>
            <center>
                <h2>Fund Causes</h2>
                <div id="causesDOM"></div>
            </center>

        </div>
        <div class="col-md-2"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossorigin="anonymous"></script>
    <script src="js/web3.min.js"></script>
    <script type="text/javascript">

        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        } else {
            alert('Please install Metamask first.');
        }

        async function getAccount() {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            return accounts[0];
        }

        function getTotalCauses() {
            const causes = contract.methods.totalCauses().call();
            return causes;
        }

        async function createCause(name, description, ipfsHash, target) {
            const account = await getAccount();
            await contract.methods.createCause(name, description, ipfsHash, target).send({ from: account });
        }

        async function fundCauseById(causeId){
            let account = await getAccount();
            let amount = document.getElementById(`input${causeId}`).value;
            await contract.methods.fundCauseById(causeId).send({from: account, value: amount});
        }

        async function fillCauseDOM() {
            const causes = await getTotalCauses();
            for (i = 0; i <= causes; i++) {
                let cause = await contract.methods.causeById(i).call();
                console.log(cause);
                let causeName = cause[0];
                let description = cause[1];
                let ipfsHash = cause[2];
                let targetAmount = cause[3];
                let raisedAmount = cause[4];
                let newDiv = document.createElement("div");
                newDiv.setAttribute("id", i);
                newDiv.setAttribute("class", "card-body");
                document.getElementById('causesDOM').appendChild(newDiv);
                newDiv.innerHTML = `<div class="card">
                        <div class="card-body">
                            Name: ${causeName}
                            <br />
                            Description: ${description}
                            <br />
                            IFPS Hash: <a href="https://ipfs.filebase.io/ipfs/${ipfsHash}">Link</a>
                            <br />
                            Target Amount(in wei): ${targetAmount}
                            <br />
                            Raised Amount(in wei): ${raisedAmount}
                            <br />
                            Fund amount: <input type="text" id="input${i}">
                            <br />
                            <button class="btn btn-primary" onclick="fundCauseById(${i})">Fund</button>
                        </div>
                    </div>`
            }
        }

        const ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"description","type":"string"},{"indexed":false,"internalType":"string","name":"ipfsHash","type":"string"},{"indexed":false,"internalType":"uint256","name":"target","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"raised","type":"uint256"},{"indexed":true,"internalType":"address","name":"wallet","type":"address"}],"name":"CauseFundLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"description","type":"string"},{"indexed":false,"internalType":"string","name":"ipfsHash","type":"string"},{"indexed":false,"internalType":"uint256","name":"target","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"raised","type":"uint256"},{"indexed":true,"internalType":"address","name":"wallet","type":"address"}],"name":"NewCauseLog","type":"event"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"causeById","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"string","name":"_ipfsHash","type":"string"},{"internalType":"uint256","name":"_target","type":"uint256"}],"name":"createCause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"fundCauseById","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalCauses","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

        const contractAddress = "0x38cd8D40Aef56b5597d752fB38c61F1b9e7C0054";

        const web3 = new Web3(Web3.givenProvider);
        const account = getAccount();

        const contract = new web3.eth.Contract(ABI, contractAddress);

        fillCauseDOM();

        document.getElementById('createCauseSubmitBtn').onclick = function () {
            let name = document.getElementById('name').value;
            let description = document.getElementById('description').value;
            let ipfsHash = document.getElementById('ipfsHash').value;
            let targetAmount = document.getElementById('targetAmount').value;
            createCause(name, description, ipfsHash, targetAmount);
        }

    </script>
</body>

</html>
```

Now I will go through the JS functions and what they do so that you can have a better understanding of the frontend.

```js
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert('Please install Metamask first.');
}
```

Here, we are checking if Metamask is installed or not. If Metamask is not installed then it will alert the user to install the Metamask first.

```js
async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
}
```

`getAccount()` function fetches the account from the Metamask. It is a wrapper over `await ethereum.request({ method: 'eth_requestAccounts' });`.

```js
function getTotalCauses() {
    const causes = contract.methods.totalCauses().call();
    return causes;
}
```

This function returns all the total causes in the smart contract. It calls `totalCauses()` function of the smart contract.

```js
async function createCause(name, description, ipfsHash, target) {
    const account = await getAccount();
    await contract.methods.createCause(name, description, ipfsHash, target).send({ from: account });
}
```

This function is called when a user presses submit button to create a cause. When this function is executed, Metamask will ask you to sign the transaction.

```js
async function fundCauseById(causeId){
    let account = await getAccount();
    let amount = document.getElementById(`input${causeId}`).value;
    await contract.methods.fundCauseById(causeId).send({from: account, value: amount});
}
```

This function is invoked when a user presses the `Fund` button of the cause. Whatever amount the user gives in `Wei`, CELO will be transferred towards the creator of the cause.

```js
async function fillCauseDOM() {
    const causes = await getTotalCauses();
    for (i = 0; i <= causes; i++) {
        let cause = await contract.methods.causeById(i).call();
        let causeName = cause[0];
        let description = cause[1];
        let ipfsHash = cause[2];
        let targetAmount = cause[3];
        let raisedAmount = cause[4];
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", i);
        newDiv.setAttribute("class", "card-body");
        document.getElementById('causesDOM').appendChild(newDiv);
        newDiv.innerHTML = `<div class="card">
                <div class="card-body">
                    Name: ${causeName}
                    <br />
                    Description: ${description}
                    <br />
                    IFPS Hash: <a href="https://ipfs.filebase.io/ipfs/${ipfsHash}">Link</a>
                    <br />
                    Target Amount(in wei): ${targetAmount}
                    <br />
                    Raised Amount(in wei): ${raisedAmount}
                    <br />
                    Fund amount: <input type="text" id="input${i}">
                    <br />
                    <button class="btn btn-primary" onclick="fundCauseById(${i})">Fund</button>
                </div>
            </div>`
        }
}
```

`fillCauseDOM()` is used to iterate through all the causes and dynamically add the data to the DOM.

This is how your frontend will look like if you are followed the tutorial so far:

![dApp](https://i.imgur.com/fE0JX8V.png)

Also, when anyone will fund a cause. This is how the transaction will look like:

![Token Transfer](https://i.imgur.com/WhQLCC1.png)

Also, here is the complete source code: [GitHub Repo](https://github.com/avirajkhare00/celo-crowdfunding-platform)

Thank you so much for following this tutorial so far 🙏

## About the author

Aviraj Khare
Ex Gojek, into web3 space since 2016.

## References

- <https://web3js.readthedocs.io/en/v1.8.2/>
- <https://getbootstrap.com/>
- <https://docs.soliditylang.org/en/v0.8.18/>
- <https://hardhat.org/>
