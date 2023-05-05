---
title: Building Decentralized Applications on Celo, Best Practices for DApp Development
description: Learn the best pratices to build better and more effective decentralized app on Celo.
authors:
  - name: Elijah Sorinola
    title: Technical Writer, Celo Sage
    image_url: https://avatars.githubusercontent.com/u/86154565?v=4
tags: ["intermediate", "solidity", "celosage"]
hide_table_of_contents: true
slug: /tutorials/Building-Decentralized-Applications-on-Celo-Best-Practices
---

![header](../../../src/data-tutorials/showcase/intermediate/building-dapp-on-celo.png)

## 🌱 Introduction

Celo is an open-source blockchain platform focused on making decentralized financial tools accessible to anyone with a mobile phone. It offers a unique opportunity for developers to build and deploy decentralized applications (DApps) that have the potential to reach a wide audience. 

This tutorial will focus on writing, deploying, testing, and debugging smart contracts using Remix IDE and unit testing to provide an in-depth, hands-on learning experience.

## Prerequisites

Before diving into building DApps on Celo, it's essential to have a solid [understanding of Web3](https://docs.celo.org/blog/tutorials/how-to-become-a-web3-developer) concepts, including blockchain, smart contracts, and decentralized finance (DeFi). It's also crucial to be familiar with the Solidity programming language, which is used to write smart contracts on the Ethereum and Celo platforms.

## Requirements

To build DApps on Celo, you'll need a few tools:

- Celo Wallet: This is the official wallet for the Celo platform, which you'll need to test your DApps on the Celo testnet.

- Remix IDE: This is a web-based Integrated Development Environment (IDE) for writing, testing, and debugging smart contracts.

- Truffle Suite: This is a popular development framework for Ethereum and Celo that provides a suite of tools for building and deploying smart contracts.
## Setting up the Development Environment

### Introduction to Remix IDE

Remix IDE is a powerful, open-source development environment for Solidity, the programming language used to write smart contracts for Ethereum and Celo. It offers various features such as a built-in compiler, debugger, and testing suite to streamline the development process.

To get started with Remix IDE, visit the official website at https://remix.ethereum.org.
In the upper right corner, click on the "Connect to a Local Host" button and choose "Celo" from the list of networks.

### Connecting Remix IDE to the Celo Network

### Configuring network settings
To connect Remix IDE to the Celo network, you'll need to configure the network settings. Click on the "Settings" tab in Remix IDE and scroll down to the "Network" section. Enter the following information:

Network Name: Celo Testnet (Alfajores)
New RPC URL: https://alfajores-forno.celo-testnet.org
Chain ID: 44787

### Setting up Celo wallet and obtaining testnet funds

To interact with the Celo network, you'll need a Celo wallet. For this tutorial, we'll use the MetaMask browser extension. Install MetaMask and set up your Celo wallet by following the instructions here: https://docs.celo.org/getting-started/wallets/using-metamask-with-celo/manual-setup.

Once your wallet is set up, you can obtain testnet funds by visiting the Celo Alfajores Faucet: https://celo.org/developers/faucet.

## Writing a Smart Contract for Celo DApp

### Introduction to Solidity

Solidity is a high-level, statically-typed programming language designed for writing smart contracts on blockchain platforms like Ethereum and Celo. It is influenced by C++, Python, and JavaScript and designed to target the Ethereum Virtual Machine (EVM).

### Developing a Sample Celo DApp Smart Contract

We will create a simple voting smart contract to demonstrate the process of writing, deploying, and testing a Celo DApp.

Defining the contract structure and functions

Create a new file in Remix IDE called "Voting.sol" and add the following code:

```solidity
pragma solidity ^0.8.0;

contract Voting {
    // Declare state variables
    mapping(address => uint) public votes;
    address[] public voters;

    // Declare events
    event VoteCast(address voter, uint votes);

    // Voting function
    function castVote(uint _votes) public {
        require(_votes > 0, "Votes must be greater than 0");
        votes[msg.sender] += _votes;
        voters.push(msg.sender);

        emit VoteCast(msg.sender, _votes);
    }

    // Get total votes function
    function getTotalVotes() public view returns (uint) {
        uint totalVotes = 0;
        for (uint i = 0; i < voters.length; i++) {
            totalVotes += votes[voters[i]];
        }
        return totalVotes;
    }
}
```


This contract allows users to cast votes and keeps track of the total votes cast. It has two public functions: castVote() for casting votes and getTotalVotes() for retrieving the total number of votes cast.

Implementing Celo-specific features

To demonstrate the use of Celo's native token, CELO, as a voting currency, we'll modify the contract to accept CELO for voting.

First, import the IERC20 interface and UsingPrecompiles contract from the Celo smart contract library by adding these lines at the beginning of the Voting.sol file:

```solidity
import "@celo/contractkit/contracts/libraries/UsingPrecompiles.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

Next, modify the Voting contract to inherit from UsingPrecompiles and add a constructor to set the CELO token address:
```solidity
contract Voting is UsingPrecompiles {
    // Declare state variables
    ...
    IERC20 public celoToken;

    constructor(address _celoToken) {
        celoToken = IERC20(_celoToken);
    }

    // Voting function
    ...
}
```

Finally, update the castVote() function to require users to send CELO tokens when casting votes:

```solidity
function castVote(uint _votes) public {
    require(_votes > 0, "Votes must be greater than 0");
    uint256 amount = _votes * 1 ether; // Convert to wei
    celoToken.transferFrom(msg.sender, address(this), amount);

    votes[msg.sender] += _votes;
    voters.push(msg.sender);

    emit VoteCast(msg.sender, _votes);
}
```

Now, the contract accepts CELO tokens for voting and keeps track of the total votes cast.

### Compiling and Deploying the Smart Contract

### Compiling the smart contract

In Remix IDE, click on the "Solidity Compiler" tab.
Select the appropriate compiler version (e.g., 0.8.0 or later) and click the "Compile Voting.sol" button.
Fix any compilation errors that appear by modifying the code as needed.

### Deploying the smart contract to Celo network

In Remix IDE, click on the "Deploy & Run Transactions" tab.
Make sure the "Injected Web3" environment is selected and the correct Celo network is displayed (e.g., Celo Testnet (Alfajores)).

Enter the CELO token address for the _celoToken parameter in the constructor (e.g., 0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9 for Alfajores testnet).
Click the "Deploy" button to deploy the smart contract.

### Testing and Debugging the Smart Contract

## Writing unit tests for the smart contract

Create a new file in Remix IDE called "Voting_test.sol" and add the following code:

```solidity

pragma solidity ^0.8.0;

import "remix_tests.sol"; // This import is required for testing
import "./Voting.sol";

contract VotingTest {
    Voting voting;

    // Set up the testing environment
    function beforeEach() public {
        voting = new Voting(0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9);
    }

    // Test castVote() function
    function testCastVote() public {
        uint initialVotes = voting.getTotalVotes();
        voting.castVote(10);
        uint finalVotes = voting.getTotalVotes();
        Assert.equal(finalVotes, initialVotes + 10, "Vote casting failed");
    }

    // Test getTotalVotes() function
    function testGetTotalVotes() public {
        voting.castVote(5);
        voting.castVote(10);
        uint totalVotes = voting.getTotalVotes();
        Assert.equal(totalVotes, 15, "Incorrect total votes");
    }
}
```

This test file sets up a new instance of the Voting contract for each test and checks whether the castVote() and getTotalVotes() functions work correctly.

## Executing tests in Remix IDE

In Remix IDE, click on the "Solidity Unit Testing" tab.
Click the "Run" button to execute the tests.
Examine the test results and fix any issues that arise.

## Debugging the smart contract

If any tests fail or throw errors, use Remix IDE's debugger to identify the source of the problem.
To open the debugger, click on the "Debugger" tab in Remix IDE.
Set breakpoints in the smart contract code where you suspect issues may be occurring.
Step through the code execution and monitor the values of variables and state changes.
Make any necessary changes to the smart contract code to fix the issues, then re-run the tests to confirm that the issues are resolved.

## Interacting with the Deployed Smart Contract

### Using Remix IDE to interact with the smart contract

Click the "Deploy & Run Transactions" tab in Remix IDE.
Under "Deployed Contracts," locate your deployed Voting contract.
Click on the buttons corresponding to the contract's functions (e.g., castVote() and getTotalVotes()) to interact with the deployed contract.

### Integrating the smart contract into a DApp frontend

To create a simple DApp frontend that interacts with the deployed Voting smart contract, use web3.js and Celo SDK to create a web-based user interface.
Follow the instructions in the Celo SDK documentation to set up a web3.js project and connect it to the Celo network: https://docs.celo.org/developer-guide/start.
Design and implement a user interface that allows users to cast votes and view the total number of votes cast using your deployed Voting smart contract.
## Conclusion

In this tutorial, we demonstrated how to write, deploy, test, and debug a smart contract for a Celo DApp using Remix IDE and unit testing. By following these best practices, you can build more complex and robust decentralized applications on the Celo platform. There are many resources available to support your continued learning and exploration of Celo, including the official documentation and developer community.

Happy coding!

## What's Next

Congratulations on completing this tutorial on building decentralized applications on Celo using best practices for DApp development! Now that you have a solid foundation in DApp development on Celo, here are some suggested next steps:

1. **Join the Celo community:** Join the [Celo Discord community](https://discord.gg/6yWMkgM) to connect with other developers and get involved in the Celo ecosystem.

2. **Build and deploy your own DApp:** Use what you've learned in this tutorial to build and deploy your own DApp on Celo. Test your DApp on a testnet and deploy it to the mainnet.

3. **Learn more about Celo:** Check out the [Celo documentation](https://docs.celo.org/) and explore other Celo resources to continue learning about the platform and its features.

4. **Keep up to date with the latest developments:** Subscribe to the [Celo newsletter](https://celo.org/newsletter) and follow Celo on social media to stay up to date with the latest news and updates.

Thanks for reading! We hope this tutorial has been helpful and we look forward to seeing what you build on Celo.

## About the Author

Elijah Sorinola

Web3 technical writer with a passion for communicating complex technical concepts in a clear and concise manner. [Let's connect](https://www.linkedin.com/in/sorinola/) on LinkedIn to discuss your content needs.

## Reference

1. [Celo Developer Documentation](https://docs.celo.org/developer-guide/overview/introduction)
2. [Celo Github Repository](https://github.com/celo-org)
3. [Solidity Programming Language Documentation](https://docs.soliditylang.org/en/v0.8.9/)
4. [Web3.js Documentation](https://web3js.readthedocs.io/en/v1.4.0/)
5. [Truffle Suite Documentation](https://www.trufflesuite.com/docs)
6. [OpenZeppelin Contracts Documentation](https://docs.openzeppelin.com/contracts/4.x/)
7. [Celo Contract Kit Documentation](https://docs.celo.org/celo-sdk/getting-started/contractkit)
8. [Celo Smart Contract Best Practices](https://docs.celo.org/developer-guide/best-practices/smart-contracts)
9. [Celo DApp Development Tutorial](https://docs.celo.org/developer-guide/building-dapps)
10. [Celo DApp Development Tools](https://docs.celo.org/developer-guide/tools)
