---
title: School Resources Marketplace Smart Contract on celo
description:  The School Resources Marketplace smart contract is a decentralized application built on the Celo blockchain using Solidity programming language.
authors:
  - name: David Ikanji
    title: Technical Writer 
    url:  https://github.com/Ikanji201
    image_url:  https://avatars.githubusercontent.com/u/115812158?v=4
tags: [solidity, intermediate, celo, celosage]
hide_table_of_contents: true
slug: /tutorials/A-solidity-Smart-contract-for-auctioning-flowers-on-the-celo-blockchain
---

## INTRODUCTION

In this tutorial, you will learn how to create a decentralized marketplace on the Celo blockchain using Solidity programming language. Specifically, we will create a School Resources Marketplace where students can buy and sell educational resources such as books, lecture notes, and other educational materials. We will use the ERC-20 token standard to facilitate the exchange of value and the IPFS protocol to store the resources. This tutorial assumes basic knowledge of Solidity and blockchain technology. By the end of this tutorial, you will have a fully functional decentralized marketplace that can be used by students to exchange educational resources in a secure and decentralized manner.


## REQUIREMENT

To take this tutorial, you will need:

- Access to a code editor or text editor such as Remix.

- A reliable internet browser and internet connection.

## PREREQUISITE 

- Basic knowledge of Javascript.

- Understand how Blockchain works.

- Have a basic knowledge of solidity.

Let's now start the process of writing our smart contract.

To begin, we need to create a new file in Remix called `schoolResources.sol`. You can learn how to create a new file on Remix by following this link. [(here)](https://remix-ide.readthedocs.io/en/latest/file_explorer.html#:~:text=Creating%20new%20files,-There%20are%202&text=The%20first%20is%20to%20click,will%20open%20in%20the%20Editor.).

Once you have created a new file, you can start writing your smart contract by declaring various statements.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
```

The line `SPDX-License-Identifier: MIT` is an identifier for the license of the code, in this case, the `MIT License`. [The SPDX (Software Package Data Exchange)](https://spdx.dev/) identifier is a standardized way to identify open-source licenses.

Subsequently, we incorporate the interface for our ERC20 token.

```solidity
interface IERC20Token {
    function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}
```

