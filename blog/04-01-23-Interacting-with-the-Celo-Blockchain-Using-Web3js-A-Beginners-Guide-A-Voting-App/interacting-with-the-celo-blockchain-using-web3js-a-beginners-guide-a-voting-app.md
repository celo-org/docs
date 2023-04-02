---
title: Interacting with the Celo Blockchain Using Web3.js A Beginners Guide - A Voting App.
description: This tutorial teaches how to interact with smart contracts using web3.js simplified by Celo Contract Kit.
authors:
  - name: Emiri Udogwu
    title: Tech Ethusiast, Smart Contract Developer
    url: https://github.com/emiridbest
    image_url: https://avatars.githubusercontent.com/u/6362475?v=4
tags: [celosage, celo, beginner, solidity, contractkit, remix]
hide_table_of_contents: true
slug: /tutorials/interacting-with-the-celo-blockchain-using-web3js-a-beginners-guide-a-voting-app
---

![header](../../src/data-tutorials/showcase/beginner/interacting-with-the-Celo-Blockchain-Using-Web3js-A-Beginners-Guide-A-Voting-App.png)

## Introduction​

The web3.js library is a collection of modules that contain functionality for the ethereum ecosystem. Web3.js is primarily designed to work with the Ethereum blockchain and its associated network of nodes. However, Web3.js can also be used to interact with other blockchain networks that are compatible with the Ethereum Virtual Machine (EVM), such as:

- Celo
- Binance Smart Chain
- Polygon Network
- xDai
- Fantom
- Avalanche
- Huobi Eco Chain
  These blockchains are often referred to as "Ethereum-compatible" or "EVM-compatible" blockchains.
  Web3.js may not work with blockchains that do not use the Ethereum Virtual Machine, or that have different APIs or communication protocols. For example, blockchains such as Bitcoin and Litecoin use different protocols and APIs, and would require different libraries to interact with them.
  Web3.js provides a wide range of functionality, including the ability to:
- Send and receive transactions
- Deploy and interact with smart contracts
- Read and write data from the blockchain
- Manage user accounts and private keys
  In this tutorial, we shall be going through how to interact with smart contracts using a voting app as a case study. We shall also be looking at other basic web3.js code syntax for function that may not be in our code.

## Prerequisites

- Node.js should be installed along with a node package manager(npm)
- A basic understanding of Celo and smart contracts
- A Celo Wallet address:
- To create Alfajores wallet, go to [Alfajores wallet](https://celo.org/developers/faucet)
- To get testnest funds, go to Celo faucet [Celo Faucet](https://faucet.celo.org/)
- A text editor such as Visual Studio Code installed on your computer
- A terminal to test our code syntax
- Remix IDE

You can clone the codes used in this tutorial by running:

```bash
git clone https://github.com/emiridbest/Voting-Smart-Contract-On-Celo-Using-Web3.js-and-ContractKit.git
```

Now, lets get started;

- **Step 1:** Write your Voting Smart Contract and Deploy on Remix IDE

```solidity
//SPDX-License-Identifier: MIT
pragma solidity  ^0.8.0;
contract Voting {

   struct Voter{
       uint weight;
       bool voted;
       address delegate;
       uint vote;
   }

   struct Proposal{
       string name;
       uint voteCount;
       bool added;
   }

   address public chairperson;

   mapping(address => Voter) public voters;
   Proposal[] public proposals;


   constructor() {
       string[] memory proposalNames;
       chairperson =msg.sender;
       voters[chairperson].weight=1;
       for(uint i=0; i < proposalNames.length; i++){
           proposals.push(Proposal({name:proposalNames[i],voteCount:0,added:false}));
       }
   }

   function addCandidate(string memory proposalName) public {
       require(msg.sender == chairperson, "Only chairperson can add new candidates");
       for (uint i = 0; i < proposals.length; i++) {
           require(keccak256(bytes(proposals[i].name)) != keccak256(bytes(proposalName)), "This candidate has already been added");
       }
       proposals.push(Proposal({name: proposalName, voteCount: 0, added: true}));
   }


   function giveRightToVote(address voter) public {
       require(msg.sender==chairperson,"Only chairpersoncan give rights to vote");
       require(!voters[voter].voted,"The voter already voted");
       require(voters[voter].weight==0);
       voters[voter].weight=1;
   }

   function delegate(address to) public{
       Voter storage sender=voters[msg.sender];
       require(!sender.voted,"You already voted");
       require(to != msg.sender,"Self delegation is not allowed");
       while(voters[to].delegate !=address(0)){
           to=voters[to].delegate;
           require(to !=msg.sender,"Found loop in delegation");
       }
       sender.voted=true;
       sender.delegate=to;
       Voter storage delegate_ =voters[to];
       if(delegate_.voted){
           proposals[delegate_.vote].voteCount +=sender.weight;
       }
       else{
           delegate_.weight +=sender.weight;
       }
   }

   function vote (uint proposal) public{
       Voter storage sender=voters[msg.sender];
       require(sender.weight!=0,"You have no right to vote");
       require(!sender.voted,"Voted");
       sender.voted=true;
       sender.vote=proposal;
       proposals[proposal].voteCount +=sender.weight;
   }

   function winningProposal() public view returns(uint winingProposal_){
       uint winingVoteCount=0;
       for(uint p=0; p <proposals.length; p++){
           if(proposals[p].voteCount >winingVoteCount){
               winingVoteCount =proposals[p].voteCount;
               winingProposal_ = p;
           }
       }

   }

   function winnerName() public view returns(string memory winnerName_){
       winnerName_ = proposals[winningProposal()].name;
   }
}
```

Explanation:

- The `Candidate` struct represents a candidate with a name and a vote count.
- The `candidates` array stores the list of candidates.
- The `voters` mapping keeps track of who has voted.
- The `CandidateAdded` event is emitted when a new candidate is added.
- The `VoteCast` event is emitted when a vote is cast.
- The `addCandidate` function allows adding a new candidate to the candidates array.
- The `getCandidates` function returns an array of candidate names.
- The `vote` function allows casting a vote for a candidate. It checks if the sender has already voted, if the candidate index is valid, updates the vote count of the candidate, sets the sender as a voter, and emits the VoteCast event

Now, we compile this contract then deploy on Injected web3 provider. This pops up our already install metamask wallet, make sure to choose Alfajores containing wallet.

On deploying, a link to [Alfajores Explorer](https://explorer.celo.org/alfajores) pops up at the top of your browser.YOu can now copy out your contract address and save it somewhere as web3.js needs this address to interact with this particular contract.

Also, go back to remix and copy out you contract ABI save it somewhere.

- **Step 2:** Navigate to our project directory and create a new `App.js` file

We shall be using the codes to be written in this file to interact with our already deployed smart contract.
Make use of you favorite text editor

- **Step3:** Install dependencies
  Go to a command line terminal and make sure you are in your projects root directory and run the following lines of code.

```bash
$ npm install @celo/contractkit web3
```

The `CeloContractKit` library is designed to make it easy for developers to build decentralized applications (DApps) on the Celo blockchain. It abstracts away many of the low-level details of interacting with smart contracts on the blockchain, allowing developers to focus on building their DApps. It is a prerequisite for web3.js interaction with Celo Blockchain in specific transaction types especially when it involves writing data to the blockchain.

- **Step 4:** Start Interacting with our contract

- Import all dependencies into our `Voting.js` file
  The dependencies we’re working with are `web3` and `contract kit`;

```js
const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");
```

- ### Define Web3 and ContractKit

Using Web3 allows you to connect to a Celo node by providing the node’s endpoint. In this case, you’re connected to a remote Celo Test Network (Alfajores using a hosted node service named Forno. This step will also help us instantiate the network using contractKit.

```js
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = ContractKit.newKitFromWeb3(web3);
```

- ### Create a contract Instance

This is the step that links us to the contract we already deployed on Remix. Here, we will be needed to variables - `ABI` and `Contract address`. I hope you copied them out earlier.

```js
const ContractAbi = [{...}];
const ContractAddress = '0x6C432a07d2C7C5ABbbBB47E408C5eCc40Eea0C4b';
const Contract = kit.contracts.getContract('Contract', { abi: ContractAbi, address: ContractAddress });
```

Make sure you parse in the appropriate values for the `ContractAddress` and `ContractAbi`.

- ### Add your Private Key

For every transaction requiring gas fees, you need a private which serves as a signatory to your account funds. Always avoid sharing your private keys to a publicly deployed contract as it could put your funds at risk of theft. The most preferred way of storing your private key is in a `.env` file in which case you have to install and also import the `.dotenv` dependency.
But for the purpose of this tutorial, we will be using a test account containing faucet claimed funds, so we can easily get it displayed without the fear of lossing our funds.

```js
const PRIVATE_KEY =
  "0xa27790f81bc74d9159bb5f8c71261b8aaec6f6b0c26bed5b4fabe281cea38964";
```

- ### Add Your Account Address

Your identity in the blockchain space is held by your address. In this scenario, your voter ID is your account address. We shall be doing this using the function `web3.eth.accounts.privateKeyToAccount` which allows you to create an account object from a private key. This line passes your `PRIVATE_KEY` to that function to set it as your account.

```js
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
```

- ### Enable ContractKit Sign Your Transactions Using your Private Key

Every transactions to the blockchain needs a signatory. This ought to be on every function called. Celo Contract Kit affords us an faster and cleaner way to write our codes and call functions.

```js
kit.connection.addAccount(account.privateKey);
kit.defaultAccount = account.address; //establish your default account to be used for transactions
```

- ### Add a second account just for testing our code

```js
const account2 = "0x89563f2535ad834833c0D84CF81Ee335867b8e34";
```

Now we are reading to start interacting with our contract using web3.js powered by Celo contract Kit for additional simplicity.

- ### Call the function for adding a new candidate

The syntax for this is;

```js
async function addCandidate() {
  console.log("Adding candidate...");
  const gasPrice = await kit.web3.eth.getGasPrice();
  const tx = await contracts.methods
    .addCandidate("Candidate A")
    .send({ from: account.address, gas: 2000000, gasPrice: gasPrice });
  console.log("Transaction hash:", tx.transactionHash);
  console.log("Candidate added!");
}
```

- All `console.log()` lines seen above are just for testing/feedback/debugging purposes.
- When you call `kit.web3.eth.getGasPrice()`, it returns a promise that resolves to the current gas price, which is the median gas price of the latest blocks. This gas price is then used when sending the transaction to the network, as shown in the `send()` function. By using the current gas price, your transaction is more likely to be mined and confirmed within a reasonable time frame. IGas price estimation is a very critical step in the use of contract kit as not specifying coils lead to reversal of transactions by the EVM.
- `contracts.methods.addCandidate("Candidate A")`: This part is calling the addCandidate function defined in the smart contract, and passing the argument "Candidate A" as the proposal name.
- `.send({ from: account.address, gas: 2000000, gasPrice: gasPrice })`: This part sends the transaction to the network. It includes the following properties in the transaction object:
- `from: account.address`: The address of the account that initiates the transaction. In this case, it is the account associated with the provided private key. -`gas: 2000000`: The maximum amount of gas units that the transaction is allowed to consume. If the transaction consumes more gas than specified, it will fail. It's essential to set an appropriate gas limit, so you don't run out of gas during the execution.
- `gasPrice: gasPrice`: The price per unit of gas, specified in the variable gasPrice. This value is obtained using kit.web3.eth.getGasPrice(), which estimates the optimal gas price based on the current network conditions.
- The `await` keyword is used because sending a transaction is an asynchronous operation, and we want to wait for the transaction to be completed before moving on to the next step. The result of this operation is the transaction receipt, which includes the transaction hash, among other details. The receipt can be used to track the transaction status and confirm its successful execution.

The above line of code can be tested in your terminal by running;

```bash
node {file name}
```

- ### Note:
  Every transaction has 3 parts
- Creating the transaction object
- Signing the transaction object
- Broadcasting the transaction to the network

This procedure can be burdensome and confusing but contractKit abstracts away all of these complexities by using a simplified syntax.
The line `const tx = await contracts.methods.addCandidate("Candidate A").send({ from: account.address, gas: 2000000, gasPrice: gasPrice });` abstracts these steps, making it easier to interact with the smart contract. The process is similar for other methods of the smart contract – you just need to replace `addCandidate` with the desired function and also replace `Candidate A` with the actual argument parsed in your deployed smart contract..

- ### Call function for Giving Right to Voters

```js
async function giveRightToVote(voterAddress) {
  console.log("Giving right to vote to:", account2);
  const gasPrice = await kit.web3.eth.getGasPrice();
  const tx = await contracts.methods
    .giveRightToVote(account2)
    .send({ from: account.address, gas: 2000000, gasPrice: gasPrice });
  console.log("Transaction hash:", tx.transactionHash);
  console.log("Right to vote given!");
}
```

After running this in our terminal, transaction hash is logged to the console. Also note that this transactions can be monitored on https://explorer.celo.org/alfajores/ by searching for your contract address on the search box. You will find this along with other events associated with the contract.

![Give Right to Vote](https://user-images.githubusercontent.com/6362475/229304073-57b30b68-12e7-4281-973b-c10d457014a7.png)

- ### Call the function for voting for a Candidate

We specified in our smart contract that voting is to be done using proposal Index, this is what our code will look like:

```js
async function vote(proposalIndex) {
  console.log("Voting for proposal:", 0);
  const gasPrice = await kit.web3.eth.getGasPrice();
  const tx = await contracts.methods
    .vote(proposalIndex)
    .send({ from: account.address, gas: 2000000, gasPrice: gasPrice });
  console.log("Transaction hash:", tx.transactionHash);
  console.log("Vote submitted!");
}
```

I decided to call this function twice to see what it would look like. As expected, it was successful at first but the second call was returned by the EVM since only one vote is permitted per account. On Celo explorer, this is what i found;

![vote](https://user-images.githubusercontent.com/6362475/229304099-be14a746-4d2c-483e-8d57-92d759dbd0f9.png)

- ### Call Function to Delegate Voting Rights to Another

```js
async function delegate() {
  console.log("Delegating vote to:", account2);
  const gasPrice = await kit.web3.eth.getGasPrice();
  const tx = await contracts.methods
    .delegate(account2)
    .send({ from: account.address, gas: 2000000, gasPrice: gasPrice });
  console.log("Transaction hash:", tx.transactionHash);
  console.log("Vote delegated!");
}
```

This call was deployed successfully with an error message, why? Because I already voted.

![Delegate](https://user-images.githubusercontent.com/6362475/229304130-0931bad8-9b5c-414c-baa5-a31e1fb2743b.png)

- ### Calling Functions that Retrieved/Read Data from the EVM

You noticed all the functions we’ve been calling were writing data to the blockchain. This is why we had to pay gas fees. But there are times we just want to monitor the state of the chain, this do not cost us any gas.
The remaining two functions in our contract are both read functions and we shall be calling them together here.

```js
//retrieve the winning candidate
async function getWinnerName() {
  console.log("Fetching winner name...");
  const winnerName = await contracts.methods.winnerName().call();
  console.log("Winner name:", winnerName);
  return winnerName;
}

//retrieve the winning Candidate Index
async function getWinningProposal() {
  console.log("Fetching winning proposal index...");
  const winningProposalIndex = await contracts.methods.winningProposal().call();
  console.log("Winning proposal index:", winningProposalIndex);
  return winningProposalIndex;
}
```

Notice how .send() was replaced with .call()? This function calls will make no changes to the blockchain but will print out to the console.

![winning Proposal](https://user-images.githubusercontent.com/6362475/229304163-86a3d0eb-99f1-4655-bce6-d5adb278b91e.png)

## Conclusion​

That's it! I Hope you followed through. We have come tho the end of this tutorial. With this i believe we all can easily use web3.js to interact with smart contracts using Celo Contract Kit to simplify the walkthroughs.

## Next Steps​

- [Web3.js Documentation](https://web3js.readthedocs.io/en/v1.8.2/web3-eth.html)
- [Solidity Documentation](https://docs.soliditylang.org/_/downloads/en/latest/pdf/)
- [Contract Kit](https://docs.celo.org/developer/contractkit)

## About the Author​

Emiri Udogwu, a licensed medical doctor with a burning passion for technology and gifted with skills for spreading knowledge and propagating ideas. A web3 and frontend developer.

## References​

- [Web3.js Documentation](https://web3js.readthedocs.io/en/v1.8.2/web3-eth.html)
- [Solidity Documentation](https://docs.soliditylang.org/_/downloads/en/latest/pdf/)
- [Contract Kit](https://docs.celo.org/developer/contractkit)
