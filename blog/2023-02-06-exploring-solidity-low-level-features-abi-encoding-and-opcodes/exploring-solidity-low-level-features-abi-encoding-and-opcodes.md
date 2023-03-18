---
title: Exploring Solidity Low-Level Features - ABI Encoding and Opcodes
description: Solidity also has low-level features that allow developers to interact with the Ethereum Virtual Machine (EVM) at a lower level. Two of these features are ABI encoding and opcodes.
authors:
  - name: Oyeniyi Abiola Peace
    title: CTO, DFMLab Limited
    url: https://github.com/iamoracle
    image_url: https://github.com/iamoracle.png
tags: [celosage, intermediate]
hide_table_of_contents: true
slug: /tutorials/exploring-solidity-low-level-features-abi-encoding-and-opcodes
---

![header](../../src/data-tutorials/showcase/intermediate/exploring-solidity-low-level-features-abi-encoding-and-opcodes.png)

## Introduction

Solidity is a programming language for writing smart contracts on the Ethereum blockchain. It is an object-oriented, high-level language that is similar to JavaScript. However, Solidity also has low-level features that allow developers to interact with the Ethereum Virtual Machine (EVM) at a lower level. Two of these features are ABI encoding and opcodes.

## Prerequisites

This tutorial is for already inclined and experienced developers with prior knowledge of smart contracts and the EVM, but it can also serve as a refresher for experienced developers.

## ABI Encoding

The Application Binary Interface (ABI) is a standardized way to encode data for system communication. In the case of Solidity, ABI encoding helps to encode data for communication between the Ethereum blockchain and external systems.

When you define a function in Solidity, you can specify its input and output parameters. These parameters have types, such as uint256, string, or address. When you call a function, the input parameters must be encoded so the EVM can understand. Similarly, when a function returns a value, that value needs to get encoded in a way external systems can understand.

ABI encoding takes care of this encoding and decoding process automatically. Solidity provides a built-in ABI encoder that you can use to encode data. Here are three types of encoding Solidity provides:

### 1. abi.encodeWithSignature

This function takes the function signature and its parameters as arguments and returns a byte array containing the encoded data. For example:

```solidity
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    function test() public pure {
        uint256 a = 123;
        uint256 b = 456;
        bytes memory data = abi.encodeWithSignature("add(uint256,uint256)", a, b);
    }
```

In this example, the `add` function takes two `uint256` input parameters and returns a `uint256` value. The `test` function calls the `add` function and encodes the input parameters using the `abi.encodeWithSignature` function.

### 2. abi.encode

The abi.encode function takes the parameters as arguments and returns a byte array containing the encoded data. This is useful when you don't know the function signature at compile time. For example:

```solidity
    function test() public pure {
        uint256 a = 123;
        uint256 b = 456;
        bytes memory data = abi.encode(a, b);
    }
```

In this example, the `test` function encodes the input parameters using the `abi.encode` function.

### 3. abi.encodePacked

The abi.encodePacked function takes the parameters as arguments and returns a byte array containing the tightly packed encoded data. This means that the data is not padded to fit into 32-byte chunks. This is useful for saving gas costs by reducing the data size. For example:

```solidity
    function test() public pure {
        uint256 a = 123;
        uint256 b = 456;
        bytes memory data = abi.encodePacked(a, b);
    }
```

In this example, the `test` function encodes the input parameters using the `abi.encodePacked` function.

## Comparing abi.encode and abi.encodedPacked

## Optimization

Gas is a measure of computational effort required to execute an operation on the network. When it comes to `abi.encode` and `abi.encodePacked` in Solidity, the gas cost depends on the number of arguments getting encoded, their types, and the encoding method used.

Generally speaking, using `abi.encodePacked` will result in a lower gas cost than `abi.encode`. This is because `abi.encode` adds padding to ensure the encoded arguments are correctly aligned, which can result in additional gas costs. On the other hand, `abi.encodePacked` produces a tightly packed byte array, which can reduce the amount of gas required to store and transmit the data.

However, it's important to note that gas cost can vary depending on the specific arguments getting encoded, as well as other factors such as the complexity of the contract and the current state of the network. Therefore, it's important always to test and optimize your smart contract code to ensure that it's as efficient as possible in terms of gas consumption.

### Unoptimized Contract

```solidity
    pragma solidity ^0.8.0;

    contract UnoptimizedContract {
        struct Person {
            string name;
            uint age;
        }

        Person[] public people;

        function addPerson(string memory _name, uint _age) public {
            people.push(Person(_name, _age));
        }

        function getPerson(uint index) public view returns (bytes memory) {
            Person memory p = people[index];
            return abi.encode(p.name, p.age);
        }
    }
```

In this contract, we define a struct `Person` representing a person's name and age. We also define an array of `Person` structs called `people` and two functions, `addPerson` and `getPerson.`

The `addPerson` function takes a `name` and `age` parameter and adds a new `Person` struct to the `people` array.

The `getPerson` function takes an `index` parameter and returns the encoded value of the `name` and `age` of the `Person` at the specified index in the `people` array. We use the `abi.encode` function to produce an array containing the `name` and `age` values. However, this creates unnecessary overhead because the function pads the values to ensure they are of a certain length.

### Optimized Contract:

```solidity
    pragma solidity ^0.8.0;

    contract OptimizedContract {
        struct Person {
            string name;
            uint age;
        }

        Person[] public people;

        function addPerson(string memory _name, uint _age) public {
            people.push(Person(_name, _age));
        }

        function getPerson(uint index) public view returns (bytes memory) {
            Person memory p = people[index];
            return abi.encodePacked(bytes(p.name), bytes32(p.age));
        }
    }
```

In the optimized contract, we use `abi.encodePacked` instead of `abi.encode` in the `getPerson` function to produce a tightly packed byte array that contains the `name` and `age` values, reducing the amount of gas required to store and transmit the data.

By using `abi.encodePacked` instead of `abi.encode`, we can optimize the gas consumption of the `getPerson` function. Additionally, since we're storing the data as a tightly packed byte array, we can use this data more efficiently in other parts of our smart contract, further reducing gas costs.

## Hash Collision Problem

Collisions can occur with `abi.encode` and `abi.encodePacked`. However, the likelihood of a collision occurring with `abi.encodePacked` is slightly higher because it produces a tightly packed byte array, potentially resulting in more collisions than `abi.encode`. This can be a concern when using hashes to represent data in smart contracts, as it could potentially allow an attacker to manipulate the contract by providing a different input that produces the same hash as the original input.

That said, the probability of a hash collision occurring is still relatively low. Proper testing and validation of the inputs used to generate the hash can mitigate this possibility. Additionally, you can also use larger hash sizes to reduce the likelihood of a collision occurring.

## Opcodes

Opcodes are the low-level instructions that the EVM understands. Solidity provides a way to access these opcodes directly through the assembly language. Assembly language is a low-level programming language that uses mnemonics to represent opcodes.
Here are some of the commonly used opcodes in Solidity:

### mstore

This opcode stores a value in memory at a specified address. The first argument is the memory address, and the second argument is the value to be stored. For example:

```solidity
    function test() public pure {
        assembly {
            mstore(0, 42)
        }
    }
```

In this example, the `test` function uses assembly language to set the first value.

### calldatacopy

This opcode copies data from the calldata (the input data to a function call) to memory. The first argument is the memory address to copy the data to, the second argument is the calldata offset to start copying from, and the third argument is the number of bytes to copy.

For example:

```solidity
    function test() public pure {
        assembly {
            calldatacopy(0, 0, calldatasize())
        }
    }
```

In this example, the `test` function uses assembly language to copy the entire calldata into memory.

### add

The add opcode adds two values together. The first argument is the value to add, and the second is the value to add. For example:

```solidity
    function test() public pure {
        uint256 a = 123;
        uint256 b = 456;
        assembly {
            add(a, b)
        }
    }
```

In this example, the `test` function uses assembly language to add the values `a` and `b` together.

### sstore

The sstore opcode stores a value in storage at a specified key. The first argument is the storage key, and the second argument is the value to be stored. For example:

```solidity
    function test() public {
        uint256 key = 123;
        uint256 value = 456;
        assembly {
            sstore(key, value)
        }
    }
```

In this example, the `test` function uses assembly language to store the value `value` at the storage key `key.`

## Optimization using Opcode

Solidity provides built-in functions for arithmetic operations like addition, subtraction, multiplication, and division. However, using opcodes directly can be more efficient regarding gas usage. For example, instead of using Solidity's `add` function, you can use the `ADD` opcode directly to add two numbers.

Look at the example below:

### Unoptimized code

```solidity
    pragma solidity ^0.8.0;

    contract OpcodeExample {
        uint256 public result;

        function add(uint256 a, uint256 b) public {
            result = a + b;
        }

        function sub(uint256 a, uint256 b) public {
            result = a - b;
        }
    }
```

In the above code, we define a simple contract, `OpcodeExample,` with two functions, `add` and `sub,` that performs basic arithmetic operations and stores the result in a state variable `result.`

### Optimized code:

```solidity
    pragma solidity ^0.8.0;

    contract OpcodeExample {
        uint256 public result;

        function add(uint256 a, uint256 b) public {
            assembly {
                result := add(a, b)
            }
        }

        function sub(uint256 a, uint256 b) public {
            assembly {
                result := sub(a, b)
            }
        }
    }
```

In the optimized code, we use the `assembly` keyword to directly write low-level EVM code to perform the arithmetic operations instead of using Solidity's built-in functions. In this case, we use the `add` and `sub` opcodes to add and subtract the input values. By using opcodes directly, we can avoid the overhead of calling Solidity's built-in functions, resulting in a more gas-efficient contract.

Using opcodes directly can be more complex and error-prone than using Solidity's built-in functions, so it's essential to thoroughly test and verify the optimized code to ensure it's functioning correctly.

It's important to note that while using opcodes directly can result in gas savings, it's not always the best approach for optimization. In some cases, Solidity's built-in functions may be more gas-efficient or easier to read and maintain. It's essential to carefully consider the specific use case and performance requirements when optimizing Solidity code.

## Conclusion

ABI encoding and opcodes are low-level features that allow developers to interact with the EVM at a lower level than Solidity's high-level syntax. ABI encoding encodes and decodes data for communication between the Ethereum blockchain and external systems. Solidity provides a built-in ABI encoder, as well as functions for encoding data tightly packed or without the function signature. Opcodes are the low-level instructions that the EVM understands, and Solidity provides a way to access these opcodes directly through the assembly language. Understanding these low-level features can help optimize gas usage and write more efficient smart contracts on the Ethereum blockchain.

## References

1. [Solidity documentation on ABI encoding](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html#abi-encoded-function-parameters)
2. [Solidity documentation on opcodes](https://docs.soliditylang.org/en/v0.8.10/assembly.html#opcodes)
3. ["Understanding Solidity Assembly using Simple Examples" by Patrick McCorry](https://medium.com/@patrickmccorry/understanding-solidity-assembly-using-simple-examples-83f5e4e3285b)
4. ["Using Assembly in Solidity" by ConsenSys](https://consensys.net/blog/developers/using-assembly-in-solidity/)
5. ["Gas-Efficient Solidity Smart Contracts" by OpenZeppelin](https://blog.openzeppelin.com/gas-efficient-solidity-smart-contracts-eda6fa8d8f86/)

## Author

Oyeniyi Abiola Peace is a seasoned software and blockchain developer. With a degree in Telecommunication Science from the University of Ilorin and over five years experience in JavaScript, Python, PHP, and Solidity, he is no stranger to the tech industry. Peace currently works as the CTO at DFMLab. When he's not coding or teaching, he loves to read and spend time with family and friends.
