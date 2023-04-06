---
title: How To Build A Multi Signature Wallet Contract That Requires Multiple Approvals For Transactions On Celo
description: In this tutorial, we will walk through the process of building a multi-signature wallet contract using Solidity and remix ide
authors:
  - name: ✍️ Jonathan Iheme
    url: https://github.com/4undRaiser
    image_url: https://avatars.githubusercontent.com/u/87926451?s=96&v=4
tags: [celosage, solidity, celo, intermediate]
hide_table_of_contents: true
slug: "/tutorials/how-to-build-a-multi-signature-wallet-contract-that-requires-multiple-approvals-for-transactions-on-celo"
---

![header](../../src/data-tutorials/showcase/intermediate/how-to-build-a-multi-signature-wallet-contract-that-requires-multiple-approvals-for-transactions-on-celo.png)

## Introduction

A multi-signature wallet contract is a type of smart contract that requires multiple approvals before executing a transaction. This can be useful for organizations or groups that want to maintain shared control over funds or resources. In this tutorial we'll create a simple multi-signature wallet contract written with Solidity:

Here's the github repo of our code. [source code](https://github.com/4undRaiser/celo-multi-signature-wallet)

## Prerequisites

To follow this tutorial, you will need the following:

- Basic knowledge of Solidity programming language.
- A Development Environment Like Remix.
- The celo Extension Wallet.

## SmartContract

Let's begin writing our smart contract in Remix IDE

The completed code Should look like this.

```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

contract MultiSigWallet {
    address[] public owners;
    uint256 public required;

    struct Transaction {
        address destination;
        uint256 value;
        bytes data;
        bool executed;
    }

    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => mapping(address => bool)) public confirmations;
    uint256 public transactionCount;

    modifier validRequirement(uint256 _ownerCount, uint256 _required) {
        require(_required > 0, "Required should be greater than 0");
        require(_ownerCount >= _required, "Owners count should be greater than or equal to required");
        _;
    }

    modifier ownerExists(address _owner) {
        require(isOwner(_owner), "Not an owner");
        _;
    }

    modifier notNull(address _address) {
        require(_address != address(0), "Address should not be null");
        _;
    }

    constructor(address[] memory _owners, uint256 _required) validRequirement(_owners.length, _required) {
        for (uint256 i = 0; i < _owners.length; i++) {
            require(!isOwner(_owners[i]), "Duplicate owner");
            owners.push(_owners[i]);
        }
        required = _required;
    }

    function isOwner(address _owner) public view returns (bool) {
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == _owner) {
                return true;
            }
        }
        return false;
    }

    function submitTransaction(address _destination, uint256 _value, bytes memory _data)
        public
        ownerExists(msg.sender)
        notNull(_destination)
        returns (uint256)
    {
        uint256 transactionId = addTransaction(_destination, _value, _data);
        confirmTransaction(transactionId);
        return transactionId;
    }

    function confirmTransaction(uint256 _transactionId) public ownerExists(msg.sender) {
        require(!confirmations[_transactionId][msg.sender], "Transaction already confirmed by this owner");
        confirmations[_transactionId][msg.sender] = true;
        executeTransaction(_transactionId);
    }

    function executeTransaction(uint256 _transactionId) public {
        require(transactions[_transactionId].executed == false, "Transaction already executed");
        if (isConfirmed(_transactionId)) {
            transactions[_transactionId].executed = true;
            (bool success, ) = transactions[_transactionId].destination.call{value: transactions[_transactionId].value}(
                transactions[_transactionId].data
            );
            require(success, "Transaction execution failed");
        }
    }

    function isConfirmed(uint256 _transactionId) public view returns (bool) {
        uint256 count = 0;
        for (uint256 i = 0; i < owners.length; i++) {
            if (confirmations[_transactionId][owners[i]]) {
                count += 1;
            }
            if (count == required) {
                return true;
            }
        }
        return false;
    }

    function addTransaction(address _destination, uint256 _value, bytes memory _data)
        internal
        notNull(_destination)
        returns (uint256)
    {
        uint256 transactionId = transactionCount;
        transactions[transactionId] = Transaction({
            destination: _destination,
        value: _value,
        data: _data,
        executed: false
    });
    transactionCount += 1;
    return transactionId;
}

function getOwners() public view returns (address[] memory) {
    return owners;
}

function getTransaction(uint256 _transactionId) public view returns (address destination, uint256 value, bytes memory data, bool executed) {
    Transaction memory transaction = transactions[_transactionId];
    return (transaction.destination, transaction.value, transaction.data, transaction.executed);
}

function getConfirmationCount(uint256 _transactionId) public view returns (uint256) {
    uint256 count = 0;
    for (uint256 i = 0; i < owners.length; i++) {
        if (confirmations[_transactionId][owners[i]]) {
            count += 1;
        }
    }
    return count;
}

function isConfirmedBy(uint256 _transactionId, address _owner) public view returns (bool) {
    return confirmations[_transactionId][_owner];
}

receive() external payable {}
}
```

### Breakdown

First, we declared our license and the solidity version.

```solidity
// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;
```

**State Variables**

The state variables of the contract are defined next:

```solidity
contract MultiSigWallet {
    address[] public owners;
    uint256 public required;

    struct Transaction {
        address destination;
        uint256 value;
        bytes data;
        bool executed;
}

mapping(uint256 => Transaction) public transactions;
mapping(uint256 => mapping(address => bool)) public confirmations;
uint256 public transactionCount;

}
```

The `owners` variable is an array of addresses that represent the owners of the multi-signature wallet. The `required` variable represents the number of signatures required to execute a transaction.

The `Transaction` struct defines the properties of a transaction, including the destination address, value, data, and execution status.

The `transactions` mapping stores the transactions by their IDs. The `confirmations` mapping stores the confirmations for each transaction by the owner address. The `transactionCount` variable keeps track of the number of transactions.

**Modifiers**

```solidity
 modifier validRequirement(uint256 _ownerCount, uint256 _required) {
        require(_required > 0, "Required should be greater than 0");
        require(_ownerCount >= _required, "Owners count should be greater than or equal to required");
        _;
    }

    modifier ownerExists(address _owner) {
        require(isOwner(_owner), "Not an owner");
        _;
    }

    modifier notNull(address _address) {
        require(_address != address(0), "Address should not be null");
        _;
    }
```

Modifiers are used to add conditions to functions. The `validRequirement` modifier checks if the number of owners and the required number of signatures are valid. The `ownerExists` modifier checks if the address passed is one of the owners. The `notNull` modifier checks if an address is not null.

**Constructor**

```solidity
 constructor(address[] memory _owners, uint256 _required) validRequirement(_owners.length, _required) {
        for (uint256 i = 0; i < _owners.length; i++) {
            require(!isOwner(_owners[i]), "Duplicate owner");
            owners.push(_owners[i]);
        }
        required = _required;
    }
```

The constructor takes an array of addresses representing the owners and the required number of signatures. It calls the `validRequirement` modifier to check if the parameters are valid.

The constructor adds each owner to the `owners` array and sets the required number of signatures.

**Functions**

The contract defines several functions:

```solidity
 function isOwner(address _owner) public view returns (bool) {
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == _owner) {
                return true;
            }
        }
        return false;
    }
```

The `isOwner` function checks if the address passed is one of the owners.

```solidity
 function submitTransaction(address _destination, uint256 _value, bytes memory _data)
        public
        ownerExists(msg.sender)
        notNull(_destination)
        returns (uint256)
    {
        uint256 transactionId = addTransaction(_destination, _value, _data);
        confirmTransaction(transactionId);
        return transactionId;
    }
```

The `submitTransaction` function creates a new `transaction` and adds it to the transactions mapping using the `addTransaction` function. It then calls the `confirmTransaction` function to confirm the transaction.

```solidity
 function confirmTransaction(uint256 _transactionId) public ownerExists(msg.sender) {
        require(!confirmations[_transactionId][msg.sender], "Transaction already confirmed by this owner");
        confirmations[_transactionId][msg.sender] = true;
        executeTransaction(_transactionId);
    }
```

The `confirmTransaction` function confirms a transaction by setting the confirmation for the transaction ID and the owner address to true. It then calls the `executeTransaction` function to execute the transaction if it has been confirmed by all required owners.

```solidity
  function executeTransaction(uint256 _transactionId) public {
        require(transactions[_transactionId].executed == false, "Transaction already executed");
        if (isConfirmed(_transactionId)) {
            transactions[_transactionId].executed = true;
            (bool success, ) = transactions[_transactionId].destination.call{value: transactions[_transactionId].value}(
                transactions[_transactionId].data
            );
            require(success, "Transaction execution failed");
        }
    }
```

The `executeTransaction` function executes a transaction if it has not been executed yet and if it has been confirmed by all required owners. It uses the `call` function to send the value and data to the destination address.

```solidity
 function isConfirmed(uint256 _transactionId) public view returns (bool) {
        uint256 count = 0;
        for (uint256 i = 0; i < owners.length; i++) {
            if (confirmations[_transactionId][owners[i]]) {
                count += 1;
            }
            if (count == required) {
                return true;
            }
        }
        return false;
    }
```

The `isConfirmed` function checks if a transaction has been confirmed by all required owners.

```solidity
  function addTransaction(address _destination, uint256 _value, bytes memory _data)
        internal
        notNull(_destination)
        returns (uint256)
    {
        uint256 transactionId = transactionCount;
        transactions[transactionId] = Transaction({
            destination: _destination,
        value: _value,
        data: _data,
        executed: false
    });
    transactionCount += 1;
    return transactionId;
}
```

The `addTransaction` function adds a new `transaction` to the transactions mapping and returns the transaction ID.

```solidity
function getOwners() public view returns (address[] memory) {
    return owners;
}
```

The `getOwners` function returns the array of owner addresses.

```solidity
function getTransaction(uint256 _transactionId) public view returns (address destination, uint256 value, bytes memory data, bool executed) {
    Transaction memory transaction = transactions[_transactionId];
    return (transaction.destination, transaction.value, transaction.data, transaction.executed);
}
```

The `getTransaction` function returns the properties of a transaction by its ID.

```solidity
function getConfirmationCount(uint256 _transactionId) public view returns (uint256) {
    uint256 count = 0;
    for (uint256 i = 0; i < owners.length; i++) {
        if (confirmations[_transactionId][owners[i]]) {
            count += 1;
        }
    }
    return count;
}
```

The `getConfirmationCount` function returns the number of confirmations for a transaction by its ID.

```solidity
function isConfirmedBy(uint256 _transactionId, address _owner) public view returns (bool) {
    return confirmations[_transactionId][_owner];
}
```

The `isConfirmedBy` function checks if a transaction has been confirmed by a specific owner.

```solidity
receive() external payable {}
```

The `receive` function allows the contract to receive Ether.

## Deployment

To deploy our smart contract successfully, we need the celo extention wallet which can be downloaded from [here](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en)

Next, we need to fund our newly created wallet which can done using the celo alfojares faucet [Here](https://celo.org/developers/faucet)

You can now fund your wallet and deploy your contract using the celo plugin in remix.

## Conclusion

In this tutorial, we created a MultiSigWallet contract written in Solidity. We have covered the state variables, modifiers, constructor, and functions in detail. This contract is an example of how multi-signature wallets can be implemented in decentralized applications to ensure secure and transparent management of funds.

## Next Steps

I hope you learned a lot from this tutorial. Here are some relevant links that would aid your learning further.

- [Celo Docs](https://docs.celo.org/)
- [Solidity Docs](https://docs.soliditylang.org/en/v0.8.17/)

## About the author

I'm Jonathan Iheme, A full stack block-chain Developer from Nigeria.

Thank You!!
