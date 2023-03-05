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
const { ethers, network, addressBook } = require('hardhat');

module.export = {
    setupProviderAndWallets: async function () {
        const provider = ethers.provider;
        let owner01;
        let owner02;
        let owner03;

        let user01;
        let user02;
        let user03;

        if (network.config.accounts && network.config.accounts.mnemonic) {
            // If the network is configured with a mnemonic, use it to generate the wallets
            owner01 = new ethers.Wallet(ethers.Wallet.fromMnemonic(network.config.accounts.mnemonic, `m/44'/60'/0'/0/0`).privateKey, provider);
            owner02 = new ethers.Wallet(ethers.Wallet.fromMnemonic(network.config.accounts.mnemonic, `m/44'/60'/0'/0/1`).privateKey, provider);
            owner03 = new ethers.Wallet(ethers.Wallet.fromMnemonic(network.config.accounts.mnemonic, `m/44'/60'/0'/0/2`).privateKey, provider);

            user01 = new ethers.Wallet(ethers.Wallet.fromMnemonic(network.config.accounts.mnemonic, `m/44'/60'/0'/0/3`).privateKey, provider);
            user02 = new ethers.Wallet(ethers.Wallet.fromMnemonic(network.config.accounts.mnemonic, `m/44'/60'/0'/0/4`).privateKey, provider);
            user03 = new ethers.Wallet(ethers.Wallet.fromMnemonic(network.config.accounts.mnemonic, `m/44'/60'/0'/0/5`).privateKey, provider);
        } else {
            // If the network is not configured with a mnemonic, use the 3 first accounts as owners and the 3 next as users
            owner01 = new ethers.Wallet(network.config.accounts[0], provider);
            owner02 = new ethers.Wallet(network.config.accounts[1], provider);
            owner03 = new ethers.Wallet(network.config.accounts[2], provider);

            user01 = new ethers.Wallet(network.config.accounts[3], provider);
            user02 = new ethers.Wallet(network.config.accounts[4], provider);
            user03 = new ethers.Wallet(network.config.accounts[5], provider);
        }
        return [provider, owner01, owner02, owner03, user01, user02, user03]
    },
    deployContract: async function (owners, threshold) {
        // Retrieve the contract factory
        const CeloMultiSig = await ethers.getContractFactory('CeloMultiSig');
        // Deploy the contract with the specified parameters for the constructor
        const contract = await CeloMultiSig.deploy(owners, threshold);
        // Wait for the contract to be deployed
        await contract.deployed();
        // Save the contract address in the address book
        await addressBook.saveContract(
            contractName,
            contract.address,
            network.name,
            contract.deployTransaction.from,
            network.config.chainId,
            contract.deployTransaction.blockHash,
            contract.deployTransaction.blockNumber,
            undefined,
            {
              owners: ownersAddresses,
              threshold,
            }
          );
        // Return the contract
        return contract;
    }
}
```

This file should now look like this:

![Utils helper](./images/build_utils_helper.png)

In this file we added two functions:

- `setupProviderAndWallets`: This function will setup the provider and the wallets we will use in our tests. It will also check if the network is configured with a mnemonic or not. If it is, it will use it to generate the wallets. If it is not, it will use the first 6 accounts in the network configuration.
- `deployContract`: This function will deploy the contract with the specified parameters for the constructor. It will also save the contract address in the address book.

### Signature helper

In the `signature.js` file, we will add the following code:

```js
const { network } = require('hardhat');

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
    );
    return signature;
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
const { ethers, network } = require('hardhat');
const { expect } = require('chai');

const signature = require('./signatures');

const ZERO = ethers.BigNumber.from(0);

const sendRawTxn = async (input, sender, ethers, provider) => {
    // Get the nonce
    const txCount = await provider.getTransactionCount(sender.address)
    // Prepare the transaction
    const rawTx = {
        chainId: network.config.chainId,
        nonce: ethers.utils.hexlify(txCount),
        to: input.to,
        value: input.value || 0x00,
        gasLimit: ethers.utils.hexlify(3000000),
        gasPrice: ethers.utils.hexlify(25000000000),
        data: input.data,
    }
    // Sign the transaction
    const rawTransactionHex = await sender.signTransaction(rawTx)
    // Send the transaction
    const { hash } = await provider.sendTransaction(rawTransactionHex)
    // Wait for the transaction to be mined
    return await provider.waitForTransaction(hash)
  }
  
const checkRawTxnResult = async (input, sender, error) => {
    let result
    // Check if the transaction should fail or not
    if (error)
        if (network.name === 'hardhat' || network.name === 'localhost')
            await expect(sendRawTxn(input, sender, ethers, ethers.provider)).to.be.revertedWith(error)
        else expect.fail('AssertionError: ' + error)
    else {
        result = await sendRawTxn(input, sender, ethers, ethers.provider)
        expect(result.status).to.equal(1)
    }
    return result
}

const getEventFromReceipt = async (contract, receipt, eventName) => {
    // Parse the logs
    const log = receipt.logs.map((log) => {
        try {
            return contract.interface.parseLog(log)
        } catch (e) {
            console.log('e', e)
            return
        }
    })
    return log
}
```

These functions are used to send raw transactions and check the result of the transaction. It also allows us to get the event from the receipt.

It should now look like this:

![Test helper](./images/build_test_helper.png)

Now after the last line you added, add the following code:

```js
const prepareSignatures = async (contract, owners, to, value, data, gas = 30000) => {
    // Query the next nonce
    const nonce = await contract.nonce()
    let signatures = '0x'
    for (var i = 0; i < owners.length; i++) {
        // For each owners, sign the transaction
        const sig = await signature.signMultiSigTxn(contract.address, owners[i], to, value, data, gas, nonce)
        // Concatenate the signatures
        signatures += sig.substring(2)
    }
    // Return signatures of all owners
    return signatures
}
```

This function will prepare the signatures of all the owners of the contract. By using each of the wallets we will pass to the function as a array of owners and sign the transaction with each of them, then concatenate the signatures and return them.

It should now look like this:

![Prepare signatures](./images/build_test_helper_part2.png)

We still have the main helper function to add, that will be used to test the execution of the transaction. Add the following code:

```js
const execTransaction = async (contract, submitter, owners, to, value, data, gas = 30000, errorMsg, extraEvents, signatures) => {
    // Prepare signatures if not provided
    if (!signatures) signatures = await prepareSignatures(contract, owners, to, value, data, gas)
    // Prepare transaction
    const input = await contract.connect(submitter).populateTransaction.execTransaction(to, value, data, gas, signatures)
  
    // Send the transaction and check the result
    const receipt = await checkRawTxnResult(input, submitter, errorMsg)
    if (!errorMsg) {
        // Check the event emitted (if transaction should succeed)
        const event = await getEventFromReceipt(contract, receipt, 'TransactionExecuted')
        for (var i = 0; i < event.length; i++) {
            if (event[i] && event[i].name === 'TransactionExecuted') {
                // If the event is found, check the parameters
                expect(event[i].args.sender).to.be.equal(submitter.address)
                expect(event[i].args.to).to.be.equal(to)
                expect(event[i].args.value).to.be.equal(value)
                expect(event[i].args.data).to.be.equal(data)
                expect(event[i].args.txnGas).to.be.equal(gas)
                return receipt
            } else {
                // If the event is not found, check if the transaction failed
                if (
                    extraEvents &&
                    extraEvents.find((extraEvent) => extraEvent === 'TransactionFailed') &&
                    event[i] &&
                    event[i].name === 'TransactionFailed'
                ) {
                    // If the transaction failed, check the parameters and if we expect a failure
                    expect(event[i].args.sender).to.be.equal(submitter.address)
                    expect(event[i].args.to).to.be.equal(to)
                    expect(event[i].args.value).to.be.equal(value)
                    expect(event[i].args.data).to.be.equal(data)
                    expect(event[i].args.txnGas).to.be.equal(gas)
                    return receipt
                } else {
                    // If the transaction failed but we don't expect it, throw an error
                    expect.fail('TransactionExecuted event not found')
                }
            }
        }
        // If the event is not found, throw an error
        if (event.length == 0) expect.fail('TransactionExecuted event not found')
        // If we expect an extra event, check if it is emitted
        if (extraEvents && extraEvents.length > 0) {
            for (let i = 1; i < extraEvents.length; i++) {
                const eventsFound = await getEventFromReceipt(contract, receipt, event)
                for (var ii = 0; i < eventsFound.length; ii++) {
                    if (eventsFound[ii]) {
                        expect(submitter.address).to.be.equal(eventsFound[ii].sender)
                        return receipt
                    }
                }
            }
        }
    }
}
```

This function will prepare the transaction, send it, and check the result. It will also check the event emitted by the transaction. This helper function is flexible and can be used to test the execution of a transaction, the failure of a transaction, or the execution of a transaction with extra event.

It should now look like this:

![Exec transaction](./images/build_test_helper_part3.png)

Last function to add but not the least, we will add the function that will be used to test the addOwner, removeOwner, changeThreshold and replaceOwner functions. Add the following code:

```js
const addOwner = async (contract, submitter, owners, ownerToAdd, gas = 30000, errorMsg, extraEvents) => {
    const data = contract.interface.encodeFunctionData('addOwner(address)', [ownerToAdd])

    await execTransaction(contract, submitter, owners, contract.address, ZERO, data, gas, errorMsg, extraEvents)

    if (!errorMsg) expect(await contract.isOwner(ownerToAdd)).to.be.true
}
  
const removeOwner = async (contract, submitter, owners, ownerToRemove, gas = 30000, errorMsg, extraEvents) => {
    const data = contract.interface.encodeFunctionData('removeOwner(address)', [ownerToRemove])

    await execTransaction(contract, submitter, owners, contract.address, ZERO, data, gas, undefined, extraEvents)

    if (!errorMsg) expect(await contract.isOwner(ownerToRemove)).to.be.false
    else expect(await contract.isOwner(ownerToRemove)).to.be.true
}
  
const changeThreshold = async (contract, submitter, owners, newThreshold, gas = 30000, errorMsg, extraEvents) => {
    const data = contract.interface.encodeFunctionData('changeThreshold(uint16)', [newThreshold])

    await execTransaction(contract, submitter, owners, contract.address, ZERO, data, gas, errorMsg, extraEvents)

    if (!errorMsg) expect(await contract.threshold()).to.be.equal(newThreshold)
}
  
const replaceOwner = async (contract, submitter, owners, ownerToAdd, ownerToRemove, gas = 30000, errorMsg, extraEvents) => {
    const data = contract.interface.encodeFunctionData('replaceOwner(address,address)', [ownerToRemove, ownerToAdd])

    await execTransaction(contract, submitter, owners, contract.address, ZERO, data, gas, errorMsg, extraEvents)

    if (!errorMsg) {
        expect(await contract.isOwner(ownerToAdd)).to.be.true
        expect(await contract.isOwner(ownerToRemove)).to.be.false
    }
}
```

These four functions make use of the `execTransaction` function to test the execution of the `addOwner`, `removeOwner`, `changeThreshold` and `replaceOwner` functions. They will also check if the owner was added, removed, or replaced correctly or if the threshold was changed correctly.

Since our main **execTransaction** function take a data as argument, it mean we need to encode our function call before sending it. We can do that using the `encodeFunctionData` function from the contract interface. This function will encode the function name and the arguments into a data string that can be used to call the function.

It should now look like this:

![Add housekeeping helper functions](./images/build_test_helper_part4.png)

And lastly, we need to export all the helper functions. Add the following code at the end of the file:

```js
module.export = {
    checkRawTxnResult,
    prepareSignatures,
    execTransaction,
    addOwner,
    removeOwner,
    changeThreshold,
    replaceOwner,
}
```

This way we can import all the helper functions in our test file.

It should now look like this:

![Export all the test helpers](./images/build_test_helper_part5.png)

### Exporting all the helpers

In the `index.js` file, we will add the following code:

```js
const errors = require('./errors');
const test = require('./test');
const signature = require('./signatures');
const utils = require('./utils');

module.export = {
    errors,
    test,
    signature,
    ...utils,
};
```

This way we can import all the helper functions in our test file by importing the `index.js` file.

It should now look like this:

![Export all the test helpers](./images/create_index_helper_files.png)

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
