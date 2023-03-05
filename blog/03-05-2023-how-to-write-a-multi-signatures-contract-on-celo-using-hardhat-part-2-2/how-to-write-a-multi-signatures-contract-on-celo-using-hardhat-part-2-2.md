---
title: How to write a multi-signatures contract on Celo using Hardhat | Part 2/2
description: Writing tests for a multi-signatures contract on Celo blockchain using Hardhat, multi-signatures are one of the best way to keep your crypto assets or ownership of your contracts safe and remove a central point of failure.
authors:
  - name: Marc-Aurèle Besner
    title: 🚀 Full-Stack Web3 & Solidity Engineer
    url: https://github.com/marc-aurele-besner
    image_url: https://avatars.githubusercontent.com/u/82244926?v=4
tags: [celo, solidity, smartcontract, hardhat, advanced]
hide_table_of_contents: false
slug: "/tutorials/how-to-write-a-multi-signatures-contract-on-celo-using-hardhat-part-2-2"
---

![header](../../src/data-tutorials/showcase/advanced/how-to-write-a-multi-signatures-contract-on-celo-using-hardhat-part-2-2.png)

## Introduction

In the [part 1](https://docs.celo.org/blog/tutorials/how-to-write-a-multi-signatures-contract-on-celo-using-hardhat-part-1-2), we wrote a multi-signature smart contract in Solidity using Hardhat. Multi-signatures are a secure way to protect your cryptocurrency assets and the ownership of your smart contract. The multi-signature contract acts as a wallet, capable of executing transactions to transfer Ethereum or call other smart contracts.

In this part 2, we will write tests for our multi-signature contract using Hardhat. We will also deploy our contract on the Celo Alfajores testnet.

## Prerequisites

To follow this tutorial, you will need:

- A GitHub account [GitHub](https://github.com)
- Some knowledge of [Solidity](https://docs.soliditylang.org)
- Understanding of the multi-signatures concept (you can read more about it in [What Is a Multisig Wallet?](https://www.coindesk.com/learn/what-is-a-multisig-wallet/))
- Familiarity with the following multi-signature contract terms:

  - **Owners** - Addresses that can sign and execute transactions on this wallet contract.
  - **Threshold** - The number of owner signatures required for a transaction to be executed.
  - **Nonce** - A unique number that identifies each request to prevent signatures from being used on more than one transaction.

## Requirements​

To complete this tutorial, you will need:

- Node.js [Node.js](https://nodejs.org/)
- VS Code [VS Code](https://code.visualstudio.com/)
- The Smart Contract Multi-Signature that we wrote in the [part 1](https://docs.celo.org/blog/tutorials/how-to-write-a-multi-signatures-contract-on-celo-using-hardhat-part-1-2) available on [GitHub](https://github.com/marc-aurele-besner/celo-multi-signatures-hardhat/tree/part-1-2)

## Setup our test helpers

To help us write our tests more efficiently, minimize code duplication, improve the maintainability of our repository, and make our tests more readable, we will create a few helper functions that we can reuse in our tests.

To do so, we will create a new folder called `helper` inside the `test` folder. Inside this folder, we will create a few files:

- `errors.js` - This file will contain all the error messages that we will use in our tests. (errors messages from the require statements in our contract)
- `utils.js` - This file will contain all the general purpose functions that we will use in our tests. (retrieve our wallets, deploy our contract, etc.)
- `signature.js` - This file will contain the functions that we will use to sign the transactions request before sending them to the contract.
- `test.js` - This file will contain the helper functions that we will use to call the contract functions and verify the results.
- `index.js` - This file will export all the functions from the other files.

To create the required directories and files, you can run the following commands:

```bash
mkdir test/helper
touch test/helper/errors.js test/helper/utils.js test/helper/signature.js test/helper/test.js test/helper/index.js
``` 

This should give you the following structure:

![Test Helper](./images/create_test_helper_files.png)

### Errors helper

In the `errors.js` file, we will add the following code:

```js
module.export = {
    NOT_SELF: 'CeloMultiSig: only this contract can call this function',
    MAX_OWNERS_COUNT_EXCEEDED: 'CeloMultiSig: cannot add owner above 2^16 - 1',
    INVALID_SIGNATURE: 'CeloMultiSig: invalid signatures',
    INVALID_OWNER: 'CeloMultiSig: invalid owner',
    OWNER_ALREADY_SIGNED: 'CeloMultiSig: owner already signed',
    NOT_ENOUGH_GAS: 'CeloMultiSig: not enough gas',
    OWNER_COUNT_BELOW_THRESHOLD: 'CeloMultiSig: cannot remove owner below threshold',
    THRESHOLD_IS_ZERO: 'CeloMultiSig: threshold must be greater than 0',
    THRESHOLD_GREATER_THAN_OWNERS_COUNT: 'CeloMultiSig: threshold must be less than or equal to owner count',
    OLD_OWNER_NOT_OWNER: 'CeloMultiSig: old owner must be an owner',
    NEW_OWNER_ALREADY_OWNER: 'CeloMultiSig: new owner must not be an owner',
    NEW_OWNER_IS_ZERO_ADDRESS: 'CeloMultiSig: new owner must not be the zero address',
}
```

These error messages are the same as the ones we used in our contract. We simply copy and paste them here and assign them to a variable. This has the advantage of making our tests more readable and easier to maintain, this way if we change the error message in our contract, we will only have to change it in one place.

This should give you the following result:

![Errors helper](./images/build_errors_helper.png)

### Utils helper

In the `utils.js` file, we will add the following code:

```js
module.export = {
}
```

### Signature helper

In the `signature.js` file, we will add the following code:

```js
const { network } = require('hardhat')

module.export = {
  signTransaction: async function (
    contractAddress,
    wallet,
    to,
    value,
    data,
    gas,
    nonce
  ) {
    const signature = await wallet._signTypedData(
      {
        name: 'CeloMultiSig',
        version: '1.0',
        chainId: network.config.chainId,
        verifyingContract: contractAddress,
      },
      {
        Transaction: [
          {
            name: 'to',
            type: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
          },
          {
            name: 'data',
            type: 'bytes',
          },
          {
            name: 'gas',
            type: 'uint256',
          },
          {
            name: 'nonce',
            type: 'uint96',
          },
        ],
      },
      {
        to,
        value,
        data,
        gas,
        nonce,
      }
    )
    return signature
  }
}
```

> **Note**
> This function use **_signTypedData** to sign the transaction as per ethersJS documentation [here](https://docs.ethers.io/v5/api/signer/#Signer-_signTypedData) but in future version of ethersJS, this function will be deprecated and replaced by **signTypedData**

Like this:

![Signature helper](./images/build_signature_helper.png)

### Test helper

In the `test.js` file, we will add the following code:

```js
module.export = {
}
```

### Exporting all the helpers

In the `index.js` file, we will add the following code:

```js
module.export = {
}
```

## Write our first test

## Deploy the Multi-Signature Contract on Celo Alfajores Testnet

## Conclusion

Congratulations! You've now learned how to write tests for a multi-signature smart contract in Javascript using Hardhat. By following this tutorial, you've gained a solid understanding of how multi-signature contracts work and how to use them using ethersJS, and you can now implement this secure form of contract ownership protection in your own projects.

Don't forget that you can view, clone, or fork the full code of this tutorial on GitHub at [Celo Multi-Signatures Hardhat](https://github.com/marc-aurele-besner/celo-multi-signatures-hardhat). You can use this code as a reference for your own multi-signature contracts or modify it to suit your specific needs.

I hope you found this tutorial helpful in your journey towards becoming a proficient blockchain developer. If you have any questions or feedback, please don't hesitate to reach out. Thank you for reading, and happy coding!

## About Me

Hi there! My name is **Marc-Aurele**, but please feel free to call me **Mark**. Thank you for taking the time to read my tutorial. I am a Web3 full-stack and Solidity engineer with a passion for blockchain technology, smart contract development, and building open-source tools.

My mission is to make it easier for developers to build decentralized applications and integrate smart contracts into their projects by creating innovative solutions and tools. I firmly believe that blockchain technology has the potential to revolutionize the way we interact online, and I am committed to contributing to its development.

With extensive expertise in frameworks such as Hardhat and Foundry for Smart Contracts development, I have built multiple open-source tools that facilitate smart contract development and make it more accessible for developers. I am always exploring new technologies and frameworks to stay ahead of the curve and bring fresh ideas to the table.

Sharing my knowledge and helping other developers is also one of my passions. I am always willing to lend a hand to those who are stuck on a blocker, and I am open to collaborating and contributing to the ecosystem. Teaching and mentoring are essential to me, and I believe that by helping others, we can all grow and advance together.

Lastly, if you want to stay updated on my latest projects, tools, and insights on blockchain technology and smart contract development, please consider following me on Twitter at [@marcaureleb](https://twitter.com/marcaureleb) or connecting with me on LinkedIn at [Marc-Aurele Besne](https://www.linkedin.com/in/marc-aurele-besner/). I'm always excited to connect with like-minded individuals and share knowledge and ideas. Let's stay in touch!
