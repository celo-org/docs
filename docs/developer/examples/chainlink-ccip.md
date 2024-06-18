---
title: Cross-Chain Interoperability with CCIP on Celo
description: Overview of the similarities and differences between the Celo and Ethereum blockchains.
---

## Introduction

In this tutorial, you'll learn how to build a cross-chain messaging application using Chainlink's Cross-Chain Interoperability Protocol (CCIP) on the Celo Alfajores and Ethereum Sepolia testnets. You'll send a simple "Hello World!" text message from Celo Alfajores to Ethereum Sepolia, demonstrating CCIP's ability to facilitate secure and reliable communication between different blockchains.

## About Chainlink CCIP

Chainlink CCIP is a groundbreaking framework designed to enable seamless communication and transfer of data and assets between blockchains. It empowers developers to create cross-chain applications, opening up a new world of possibilities for decentralized finance (DeFi), non-fungible tokens (NFTs), and other blockchain-based solutions.

## Tutorial Overview

1. Project Setup: Initialize a Hardhat TypeScript project and install the required dependencies.
2. Smart Contracts: Develop Solidity contracts for message sending and receiving.
3. Hardhat Tasks: Write TypeScript Hardhat tasks to deploy contracts and interact with them.
4. Cross-Chain Messaging: Send a text message from Celo Alfajores to Ethereum Sepolia.

## Project Setup

- Initialize Hardhat:

```bash
mkdir my-ccip-project
cd my-ccip-project
npx hardhat init
```

> Choose "Create a TypeScript project" during initialization.
>
- Install Dependencies:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox @nomiclabs/hardhat-ethers @nomiclabs/hardhat-solhint @typechain/ethers-v5 @typechain/hardhat dotenv 
npm install --save-dev @chainlink/contracts-ccip
```

- Hardhat Configuration `(hardhat.config.ts)`

```typescript
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-solhint";
import "@typechain/ethers-v5";
import "@typechain/hardhat";
import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      chainId: 44787,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  sourcify: {
    enabled: true,
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API ?? "",
      alfajores: process.env.CELOSCAN_API ?? "",
    },
    customChains: [
      {
        network: "sepolia",
        chainId: 42220,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io/",
        },
      },
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://api-alfajores.celoscan.io/api",
          browserURL: "https://alfajores.celoscan.io/",
        },
      },
    ],
  },
};

export default config;
```

## Smart Contract Code `(contracts/)`

- `MessageSender.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple contract for sending string data across chains.
contract MessageSender is OwnerIsCreator {
    // Custom errors to provide more descriptive revert messages.
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); // Used to make sure contract has enough balance.

    // Event emitted when a message is sent to another chain.
    event MessageSent(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        string text, // The text being sent.
        address feeToken, // the token address used to pay CCIP fees.
        uint256 fees // The fees paid for sending the CCIP message.
    );

    IRouterClient private s_router;

    /// @notice Constructor initializes the contract with the router address.
    /// @param _router The address of the router contract.
    constructor(address _router) {
        s_router = IRouterClient(_router);
    }

    /// @notice Sends data to receiver on the destination chain.
    /// @dev Assumes your contract has sufficient LINK.
    /// @param destinationChainSelector The identifier (aka selector) for the destination blockchain.
    /// @param receiver The address of the recipient on the destination blockchain.
    /// @param text The string text to be sent.
    /// @return messageId The ID of the message that was sent.
    function sendMessage(
        uint64 destinationChainSelector,
        address receiver,
        string calldata text
    ) external onlyOwner returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver), // ABI-encoded receiver address
            data: abi.encode(text), // ABI-encoded string
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit
                Client.EVMExtraArgsV1({gasLimit: 200_000})
            ),
            // Set the feeToken  address, indicating address(0) i.e. Native Celo will be used for fees
            feeToken: address(0)
        });

        // Get the fee required to send the message
        uint256 fees = s_router.getFee(
            destinationChainSelector,
            evm2AnyMessage
        );

        if (fees > address(this).balance)
            revert NotEnoughBalance(address(this).balance, fees);

        // Send the message through the router and store the returned message ID
        messageId = s_router.ccipSend(destinationChainSelector, evm2AnyMessage);

        // Emit an event with message details
        emit MessageSent(
            messageId,
            destinationChainSelector,
            receiver,
            text,
            address(0),
            fees
        );

        // Return the message ID
        return messageId;
    }
}
```

- `MessageReceiver.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple contract for receiving string data across chains.
contract MessageReceiver is CCIPReceiver {
    // Event emitted when a message is received from another chain.
    event MessageReceived(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        string text // The text that was received.
    );

    bytes32 private s_lastReceivedMessageId; // Store the last received messageId.
    string private s_lastReceivedText; // Store the last received text.

    /// @notice Constructor initializes the contract with the router address.
    /// @param router The address of the router contract.
    constructor(address router) CCIPReceiver(router) {}

    /// handle a received message
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        s_lastReceivedMessageId = any2EvmMessage.messageId; // fetch the messageId
        s_lastReceivedText = abi.decode(any2EvmMessage.data, (string)); // abi-decoding of the sent text

        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
            abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
            abi.decode(any2EvmMessage.data, (string))
        );
    }

    /// @notice Fetches the details of the last received message.
    /// @return messageId The ID of the last received message.
    /// @return text The last received text.
    function getLastReceivedMessageDetails()
        external
        view
        returns (bytes32 messageId, string memory text)
    {
        return (s_lastReceivedMessageId, s_lastReceivedText);
    }
}
```

## Hardhat Scripts `(scripts/)`

- `deploy-sender-alfajores.ts`

```typescript
import { ethers } from "hardhat";

const router = "0xb00E95b773528E2Ea724DB06B75113F239D15Dca";

async function main() {
  console.log("Deploying contracts to Sender Contract to Alfajores...");

  const SenderContract = await ethers.getContractFactory("Sender");
  const senderContract = await SenderContract.deploy(router);
  await senderContract.deployed();
  console.log("Sender Contract deployed to:", senderContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

- `deploy-receiver-sepolia.ts`

```typescript
import { ethers } from "hardhat";

const router = "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59";

async function main() {
  console.log("Deploying contracts to Receiver Contract to Sepolia...");

  const ReceiverContract = await ethers.getContractFactory("Receiver");
  const receiverContract = await ReceiverContract.deploy(router);
  await receiverContract.deployed();
  console.log("Receiver Contract deployed to:", receiverContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

- `send-message.ts` - TODO

```typescript
```
