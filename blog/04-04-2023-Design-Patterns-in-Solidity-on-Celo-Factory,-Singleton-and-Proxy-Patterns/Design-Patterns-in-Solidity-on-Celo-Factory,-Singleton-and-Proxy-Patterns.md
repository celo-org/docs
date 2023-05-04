---
title: Design Patterns in Solidity on Celo. Factory, Singleton and Proxy Patterns
description: In this tutorial, we will dive deep into three widely-used design patterns in Solidity. Factory, Singleton, and Proxy patterns
authors:
  - name: ✍️ Richard Michael
    url: https://github.com/richiemikke
tags: ["celosage", "solidity", "celo"]
hide_table_of_contents: true
slug: /tutorials/design-patterns-in-solidity-on-celo.-factory,-singleton-and-proxy-patterns
---

![header](../../src/data-tutorials/showcase/intermediate/design-patterns-in-solidity-on-celo.-factory,-singleton-and-proxy-patterns.png)

## Introduction

In this tutorial, we will explore three popular design patterns in Solidity that can be used when building smart contracts on the Celo blockchain: Factory, Singleton, and Proxy patterns. These patterns provide structure and best practices for writing efficient, secure, and maintainable contracts.

Get full source code [here](https://github.com/richiemikke/solidity-design-patterns)

## Prerequisites

To fully follow up with these tutorials, you should have a good understanding of the following technologies.

- Basic understanding of Solidity and smart contract development
- Familiarity with Celo blockchain

### Factory Pattern

The Factory pattern is used to create new instances of contracts. It is especially useful when there is a need to manage multiple instances of a contract, as it simplifies the process of creating and tracking these instances.

**Contract Instance**

Create a simple Car contract that we will instantiate using the Factory pattern:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Car {
    address public owner;
    string public model;

    // The constructor sets the owner and model of the car.
    constructor(address _owner, string memory _model) {
        owner = _owner;
        model = _model;
    }
}
```

**Factory Contract**

Create the `CarFactory` contract that will be responsible for creating new instances of the `Car` contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Car.sol";

contract CarFactory {
    // This mapping associates an owner's address with an array of Car contracts.
    mapping(address => Car[]) public ownerCars;

    // The createCar function accepts the model of the car and creates a new instance of the Car contract.
    function createCar(string memory _model) public {
        Car newCar = new Car(msg.sender, _model);
        ownerCars[msg.sender].push(newCar);
    }

    // The getOwnerCars function retrieves the Car contracts associated with an owner's address.
    function getOwnerCars(address _owner) public view returns (Car[] memory) {
        return ownerCars[_owner];
    }
}

```

The `CarFactory` contract manages a mapping called `ownerCars`, which associates an owner's address with an array of `Car` contracts. The `createCar` function takes the `car` model as a parameter, creates a new Car contract instance with the sender's address as the owner, and adds it to the owner's array of cars in the `ownerCars` mapping. The `getOwnerCars` function accepts an owner's address as a parameter and returns the array of `Car` contracts associated with that address.

### Singleton Pattern

The Singleton pattern ensures that a contract has only one instance and provides a global point of access to it. This pattern is useful when a single contract must manage shared resources or coordinate actions across the system.

**Singleton Contract**

Create a simple `Settings` contract that stores system-wide settings:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Settings {
    address public admin;
    uint256 public gasPrice;

    // The constructor sets the initial admin and gas price.
    constructor(address _admin, uint256 _gasPrice) {
        admin = _admin;
        gasPrice = _gasPrice;
    }

    // The setGasPrice function allows the admin to update the gas price.
    function setGasPrice(uint256 _gasPrice) public {
        require(msg.sender == admin, "Only admin can set gas price");
        gasPrice = _gasPrice;
    }
}
```

The `Settings` contract has an `admin` of type `address` and a `gasPrice` of type `uint256`. The constructor takes both values as parameters and sets the contract's state variables accordingly. The `setGasPrice` function allows the admin to update the gas price, and it requires the sender's address to be equal to the admin address.

**Deploying and Using the Singleton**

Deploy the `Settings` contract and make sure it is used as a Singleton by other contracts:

To deploy our smart contract successfully, we need the celo extention wallet which can be downloaded from [here](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en)

Next, we need to fund our newly created wallet which can done using the celo alfojares faucet [Here](https://celo.org/developers/faucet)

You can now fund your wallet and deploy your contract using the celo plugin in remix.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Settings.sol";

contract MyContract {
    Settings public settings;

    // The constructor accepts the address of the Settings contract as a parameter.
    constructor(Settings _settings) {
        settings = _settings;
    }

    function performAction() public {
        uint256 requiredGas = settings.gasPrice();
        // Perform an action that requires the gas price from the settings contract
    }
}
```

The `MyContract` contract takes the `Settings` contract as a parameter in its constructor, ensuring that only one instance of the `Settings` contract is used throughout the system. The `performAction` function retrieves the gas price from the `Settings` contract, demonstrating how the Singleton pattern enables shared access to system-wide resources.

### Proxy Pattern

The Proxy pattern is used to create a contract that acts as an intermediary between users and another contract. This pattern is useful for upgrading contracts, access control, or adding additional functionality to the existing contract.

**Target Contract**

Create a simple `Bank` contract that will be the target for the Proxy:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    mapping(address => uint256) public balances;

    // The deposit function allows users to deposit Ether and updates their balance.
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    // The withdraw function allows users to withdraw Ether and updates their balance.
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}
```

The `Bank` contract manages a mapping called `balances`, which associates an address with its Ether balance. The `deposit` function allows users to deposit Ether and updates their balance in the mapping. The `withdraw` function allows users to withdraw Ether, updates their balance, and transfers the withdrawn amount to their address.

**Proxy Contract**

Create the `BankProxy` contract that will act as a proxy for the `Bank` contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Bank.sol";

contract BankProxy {
    address public target;
    address public owner;

    // The constructor sets the initial target contract and the owner of the proxy.
    constructor(address _target) {
        target = _target;
        owner = msg.sender;
    }

    // The updateTarget function allows the owner to update the target contract.
    function updateTarget(address _target) public {
        require(msg.sender == owner, "Only owner can update the target");
        target = _target;
    }

    // The fallback function forwards any calls to the target contract using delegatecall.
    fallback() external payable {
        (bool success, ) = target.delegatecall(msg.data);
        require(success, "Call to target contract failed");
    }
}
```

The `BankProxy` contract has a `target` address, which is the address of the target `Bank` contract, and an `owner` address, which is the address of the proxy owner. The constructor takes the target address as a parameter and sets the contract's state variables accordingly. The `updateTarget` function allows the owner to update the target contract, and it requires the sender's address to be equal to the owner address.

The fallback function is triggered when a function that does not exist in the proxy contract is called. It forwards any calls to the target contract using the `delegatecall` function. The `delegatecall` function executes the target contract's code in the context of the proxy contract, meaning that the target contract can access the proxy contract's state variables and storage.

**Deploying and Using the Proxy**

Deploy the `Bank` and `BankProxy` contracts and use the proxy to interact with the `Bank` contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Bank.sol";
import "./BankProxy.sol";

contract BankApp {
    Bank public bank;
    BankProxy public bankProxy;

    constructor() {
        bank = new Bank();
        bankProxy = new BankProxy(address(bank));
    }

    function deposit() public payable {
        // Use the proxy to deposit funds to the Bank contract
        (bool success, ) = address(bankProxy).call{value: msg.value}(abi.encodeWithSignature("deposit()"));
        require(success, "Deposit failed");
    }

    function withdraw(uint256 amount) public {
        // Use the proxy to withdraw funds from the Bank contract
        (bool success, ) = address(bankProxy).call(abi.encodeWithSignature("withdraw(uint256)", amount));
        require(success, "Withdrawal failed");
    }
}
```

The `BankApp` contract deploys both the `Bank` and `BankProxy` contracts. The constructor deploys a new `Bank` contract and a new `BankProxy` contract with the address of the `Bank` contract as its target. The `deposit` function demonstrates how to use the proxy contract to deposit funds to the `Bank` contract by calling the `deposit` function through the proxy. Similarly, the `withdraw` function shows how to use the proxy contract to withdraw funds from the `Bank` contract by calling the `withdraw` function through the proxy.

### Summary and Next Steps

In this tutorial, we have covered the Factory, Singleton, and Proxy design patterns in Solidity for developing smart contracts on the Celo blockchain. By using these patterns, you can create more efficient, secure, and maintainable contracts for your applications. The Factory pattern simplifies the process of creating and managing multiple instances of a contract, the Singleton pattern ensures that only one instance of a contract exists and provides a global point of access to it, and the Proxy pattern enables contracts to act as intermediaries for other contracts, allowing for upgrades, access control, and additional functionality.

To further expand your knowledge, consider exploring the following resources:

[Solidity documentation](https://solidity.readthedocs.io/)
[Celo documentation](https://docs.celo.org/)
