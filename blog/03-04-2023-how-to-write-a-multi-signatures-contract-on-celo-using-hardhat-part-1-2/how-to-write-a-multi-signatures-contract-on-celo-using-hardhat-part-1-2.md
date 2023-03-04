---
title: How to write a multi-signatures contract on Celo using Hardhat | Part 1/2
description: Building a multi-signatures contract on Celo blockchain using Hardhat, multi-signatures are one of the best way to keep your crypto assets or ownership of your contracts safe and remove a central point of failure.
authors:
  - name: Marc-Aurèle Besner
    title: 🚀 Full-Stack Web3 & Solidity Engineer
    url:   https://github.com/marc-aurele-besner
    image_url:  https://avatars.githubusercontent.com/u/82244926?v=4
tags: [celo,solidity,smartcontract,hardhat,advanced]
hide_table_of_contents: false
slug: "/tutorials/how-to-write-a-multi-signatures-contract-on-celo-using-hardhat-part-1-2"
---
<!--
![header](../../src/data-tutorials/showcase/advanced/how-to-write-a-multi-signatures-contract-on-celo-using-hardhat-part-1-2.png)
 -->
## Introduction

In this tutorial we will write a multi-signatures smart contracts, in Solidity, using Hardhat. Multi-Signatures are way to secure your crypto assets and secure the ownership of your smart contract. The multi-signatures will act as a wallet in itself, able to execute transaction to transfer ethereum or call other smart contract. Ideally we will set multiple owners for this multi-signatures contract and so for any transaction to be executed by this contract, multiple private keys need to sign the transaction.

So if one of your private key ever get compromised, your funds and contract ownership are still safe as multiple private keys (wallet) are still required. This contract can also be used to decentralize the ownership of a contract between the different team member.

## Prerequisites

- A GitHub account [GitHub](https://github.com)
- Some knowledge of [Solidity](https://docs.soliditylang.org)
- Understanding of the multi-signatures concept (you can read more [What Is a Multisig Wallet?](https://www.coindesk.com/learn/what-is-a-multisig-wallet/))
- Multi-Signature language:

  - **owners**      - addresses that can sign and executes transactions on this wallet contract
  - **threshold**   - amount of owners signatures require for a transaction to be executed
  - **nonce**       - a unique number that identify each request to prevent signatures to be use on more than one transaction

## Requirements​

- Node.js [Node.js](https://nodejs.org/)
- VS Code [VS Code](https://code.visualstudio.com/)

## Creating a GitHub repository, cloning it and setting up Hardhat

### Create a Github repository

Go on [GitHub](https://github.com), on the top right, click on your profile picture, then on **Your repository**.
> **Note**
> If you don't have a GitHub account, create one [GitHub Sign-up](https://github.com/signup)

![Your repository](./images/github_your_repository.png)

On your GitHub account, in your repository, click on **New**

![Create a new repository](./images/create_a_new_repository.png)

Fill in the details of the repository, give it a **name**, a **description**, select the **visibility** and a **license**.
Then click on **Create repository**

![Repository details](./images/create_a_new_repository_detail.png)

### Clone the repository on your computer

Now that you have created a repository for this project, copy the repository url by clicking on **Code**

![Copy Repository URL](./images/create_a_new_repository_git_url.png)

Now open VS Code and open a new termianl, you can press Ctrl. + Shift + P to get the control pallet and search for **Create New Terminal** and enter or go in Terminal > New Terminal in the top bar.

![Control Pallet - New Terminal](./images/vs_code_create_new_terminal.png)

In the terminal clone your repository by typing

```bash
git clone <repository url>
```

![Cloning repository](./images/create_a_new_repository_git_clone.png)

This will have created a new folder with the name of your repo, so we need to move inside this folder, we can use File > Open Folder in the top bar or the cd command.

```bash
cd <repository name>
```

![CD in repository](./images/create_a_new_repository_cd.png)

Now that we are inside our project (our repository) let's initialize a Javascript project by running NPM init.
(Alternatively you can forgo the -y and set manually all the options.)

### Install and setup this Hardhat project

```bash
npm init -y
```

![NPM init](./images/npm_init.png)

Ounce it's done you should see a **package.json** file in the root of your project.
This file has basic information on your project and more importantly, it will keep track of all your project dependencies.

![NPM init created](./images/npm_init_created.png)


Now install Hardhat in your project, by running this command.

```bash
npm install hardhat --save-dev
```

![Install Hardhat](./images/npm_i_hardhat.png)

After running this, you should see **hardhat** in your package.json as devDependencies.

![Hardhat devDependencies](./images/hardhat_devDependencies.png)

Now add the basic boilerplate for Hardhat, by running

```bash
npx hardhat
```

![NPX Hardhat](./images/npx_hardhat.png)

In this menu, you can use the **Up** and **Down** arrow key and **Enter** to select **Create a JavaScript project**.
Then press 3x **Emter**, to add the .gitignore and Hardhat toolbox.

![Install Hardhat Boilerplate](./images/hardhat_install_boilerplate.png)

After this, you should have the basic boilerplate of Hardhat. Here a quick description of the different folders and files added:

- **contracts/**            - Folder to contain all your smart contract
- **scripts/**              - Folder to contain scripts we will write, to deploy our contract
- **test/**                 - Folder tp contain all the Hardhat tests, to test our contract
- **.gitignore**            - File that list all the files we don't want to upload on GitHub
- **hardhat.config.js**     - File that has all the settings for Hardhat
- **README.md**             - File that serve as a documentation and a home page for this repository

### Install more dependencies

Let's install a few more dependencies:

- **dotenv**                   - [dotenv](https://www.npmjs.com/package/dotenv)
- **hardhat-awesome-cli**      - [hardhat-awesome-cli](https://www.npmjs.com/package/hardhat-awesome-cli)
- **@openzeppelin/contracts**  - [@openzeppelin/contracts](https://www.npmjs.com/package/@openzeppelin/contracts)

```bash
npm install dotenv hardhat-awesome-cli --save-dev
```

![Install more devDependencies](./images/install_more_devDependencies.png)

```bash
npm install @openzeppelin/contracts
```

![Install more dependencies](./images/install_more_dependencies.png)

We will use some of these dependencies a bit later to setup our Hardhat configuration, write our contract and write tests.

### Setup the Hardhat setting with Celo blockchain

Open **hardhat.config.js**, to setup Celo blockchain, originally this file should look like:

![Original Hardhat Config](./images/orgiginal_hardhat_config.png)

At the top of the file, we will import some of the Hardhat plugins and dependencies we have previously installed in our project.

So add following the last **require()**:

```js
require("hardhat-awesome-cli");
require("dotenv").config();
```

This way we will have access to the local environment variables we will set to not compromise our private key and other secrets by committing them to GitHub by mistakes and we will have access to the **cli** task for easier use of Hardhat.

Now the top of this file, should look like:

![Hardhat Config Require Plugins](./images/hardhat_config_require_plugins.png)

New, let's change the hardhat settings to be able to tests our contract locally, as well as on Celo Testnet Alfajores and on Celo Mainnet, while keeping our private key secure.
So let's replace all the content of hardhat.config.js after the lines we just add by

```js
const {
  CELO_MAINNET_MNEMONIC,
  CELO_TESTNET_MNEMONIC,
  CELO_API_KEY
} = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
      },
      chainId: 31337,
    },
    celoMainnet: {
      url: `https://forno.celo.org`,
      accounts: {
        mnemonic: `${CELO_MAINNET_MNEMONIC}`,
      },
      chainId: 44787,
    },
    celoAlfajores: {
      url: `https://alfajores-forno.celo-testnet.org`,
      accounts: {
        mnemonic: `${CELO_TESTNET_MNEMONIC}`,
      },
      chainId: 44787,
    },
  },
  etherscan: {
    apiKey: {
      celoMainnet: `${CELO_API_KEY}`,
      celoAlfajores: `${CELO_API_KEY}`,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.18',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};
```

Like this:

![Hardhat Networks Settings](./images/hardhat_network_settings.png)

### Setup your environment variables

Create a file **.env** in the root of this project with the 3 secrets we have use in **hardhat.config.js**


```txt
# Mnemonic
CELO_MAINNET_MNEMONIC=""
CELO_TESTNET_MNEMONIC=""

# Celo Explorer
CELO_API_KEY=""
```

![Create .env file](./images/create_env_file.png)

Enter your mnemonic in this file between the "", in this tutorial, I use mnemonics as it contain multiple wallets and we will eventually need multiple wallets to test our multi-signature contract, but you can also use private key by changing the setting in **hardhat.config.js** following this documentation [Hardhat config documentation](https://hardhat.org/hardhat-runner/docs/config).

Next step, to make sure these secrets never get compromised and committed to GitHub, we will add this new file **.env** to **.gitignore**.
Simply add one line to .gitignore

```txt
.env
```

![Add .env to .gitignore](./images/add_env_to_gitignore.png)

## Start writing the Multi-Signature contract

After setting up all this, we are ready to write the contract.
First of all, we will rename the boilerplate contract that Hardhat has added to our project.

Go in **contracts/** and rename the file **Lock.sol** to **CeloMultiSig.sol**

![Rename Contract Name](./images/Rename_contract_name.png)

Let's also change the content of the file for a empty contract for now. Replace all by this:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract CeloMultiSig {

}
```

![Empty Contract](./images/replace_with_empty_contract.png)

### Import OpenZeppelin contracts in our contract

OpenZeppelin is one of the most trustworthy open-source library to build smart contract, so we will import 2 contract from the **@openzeppelin/contracts** package we previously installed in our project.

At the top of our contract, under the **pragma** statement and before the **contract** keyword. We will add:


```js
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/cryptography/EIP712.sol';
```

Like this

![Contract with imports](./images/contract_with_imports.png)

- **ReentrancyGuard.sol**   - Is used to secure our contract against a attack vector called **reentrancy**, you can read more here [Reentrancy Attack in Smart Contracts](https://www.geeksforgeeks.org/reentrancy-attack-in-smart-contracts/)
- **EIP712.sol**            - Is use to sign the transaction in a secure way following the latest signature standard **EIP712** [What is EIP712 and how to use it](https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26)

For our contract to has access to the contracts we imported, we need to inherit from them, to do so we will change the contract line by:

```js
contract CeloMultiSig is ReentrancyGuard, EIP712 {

}
```

![Add Inheritance to the contract](./images/Contract_add_inheritance.png)

### Assigning some storage for our contract

We now need to declare some storage to be used by our contract, so inside the contract {} we will add:

```js
uint16 private _ownerCount;
uint16 private _threshold;
uint96 private _nonce;

mapping(address => bool) private _owners;
mapping(uint256 => bool) private _ownerNonceUsed;

bytes32 private constant _TRANSACTION_TYPEHASH = keccak256('Transaction(address to,uint256 value,bytes data,uint256 gas,uint96 nonce)');
```

Like this:

![Contract Storage](./images/contract_storage.png)

Here is the description of the purpose of each storage/variables:

- **_ownerCount**           - The amount of owners of this contract
- **_threshold**            - The amount of owners signatures required to execute a transaction
- **_nonce**                - The next nonce to be used, by the next transaction
- **_owners**               - The mapping of each address to a bool (true/false) (true = they are a owner of the contract)
- **_ownerNonceUsed**       - The mapping of each nonces used by the contract (true/fakse) (true = the nonce has been used already)
- **_TRANSACTION_TYPEHASH** - A constant value representing the types of the different element hashed to form the signature use to validate each signature (this is a constant so it does not use any storage)

### Declaring some events

When we will execute transaction or other function of our contract, we want to emit events to be able to track more easily what happen, to do so we first need to declare some events before using them.
So under the last line we added, let's add some events:

```js
event OwnerAdded(address indexed owner);
event OwnerRemoved(address indexed owner);
event ThresholdChanged(uint256 indexed threshold);
event TransactionExecuted(
  address indexed sender,
  address indexed to,
  uint256 indexed value,
  bytes data,
  uint256 txnGas,
  uint256 txnNonce
);
event TransactionFailed(
  address indexed sender,
  address indexed to,
  uint256 indexed value,
  bytes data,
  uint256 txnGas,
  uint256 txnNonce
);
```

Like this:

![Add events in contract](./images/contract_add_events.png)

These event don't execute any logic, they only emit events that we can then find inside the receipt of the transaction, or query the blockchain to list all the events a smart contract has emitted.

### Create the constructor function

At the deployment of our contract, we will want to set the different owners addresses and the threshold for the contract to be able to be used. To do so, we will add a constructor function, this will make sure these value are written in storage at the same time we deploy the contract.

So under the last line we added, let's add:


```js
constructor(address[] memory owners_, uint16 threshold_) EIP712(name(), version()) {
  require(owners_.length <= 2 ** 16 - 1, 'CeloMultiSig: cannot add owner above 2^16 - 1');
  uint256 length = owners_.length;
  for (uint256 i = 0; i < length; ) {
    _owners[owners_[i]] = true;
    unchecked {
      ++i;
    }
  }
  _ownerCount = uint16(owners_.length);
  changeThreshold(threshold_);
}
```

Like this:

![Add constructor in contract](./images/contract_add_constructor.png)

So this constructor function take 2 arguments:

- **address[] memory owners_**    - A list of owners address
- **uint16 threshold_**           - The minimum quantity of owners that need to sign a transaction for the transaction to be execute (this number need to be greater than 0 but smaller or equal to the amount of owners)

>**Note**
>At this stage it's normal to have some warning that there is error in our contract, the logic inside our constructor function call other functions that we have not yet write.

### Add functions to the contract

Now it's time to add the bulk of the logic to our contract, all the functions. So let's start by adding all the view & pure function, these function are read call that don't require any transaction to be accessed.

Under the last line we added, we wil add:

```js
/// @notice Retrieves the contract name
/// @return The name as a string memory.
function name() public pure returns (string memory) {
  return 'CeloMultiSig';
}

/// @notice Retrieves the contract version
/// @return The version as a string memory.
function version() public pure returns (string memory) {
  return '1.0';
}

/// @notice Retrieves the current threshold value
/// @return The current threshold value as a uint16.
function threshold() public view returns (uint16) {
  return _threshold;
}

/// @notice Retrieves the amount of owners
/// @return The amount of owners value as a uint16.
function ownerCount() public view returns (uint16) {
  return _ownerCount;
}

/// @notice Retrieves the last txn nonce used
/// @return The txn nonce value as a uint96.
function nonce() public view returns (uint96) {
  return _nonce;
}

/// @notice Determines if the address is the owner
/// @param owner The address to be checked.
/// @return True if the address is the owner, false otherwise.
function isOwner(address owner) public view returns (bool) {
  return _owners[owner];
}
```

Like this:

![Add read function in contract](./images/contract_add_read_functions.png)

Here is the list of the functions we added and there purposes:

- **name()**                 - Return the name of the contract (mainly used to form the signature)
- **version()**              - Return the version of the contract (mainly used to form the signature)
- **threshold()**            - Return the threshold of the contract
- **ownerCount()**           - Return the ownerCount of the contract
- **nonce()**                - Return the next nonce of the contract to be used to assemble the signature
- **isOwner(address owner)** - Return true or false if an address is a owner of the contract

Now let's add some house keeping function to add, remove or change owners and to change the threshold.

After the last line, add:

```js
/// @notice Adds an owner
/// @param owner The address to be added as an owner.
/// @dev This function can only be called inside a multisig transaction.
function addOwner(address owner) public onlyThis {
  require(_ownerCount < 2 ** 16 - 1, 'CeloMultiSig: cannot add owner above 2^16 - 1');
  _owners[owner] = true;
}

/// @notice Removes an owner
/// @param owner The owner to be removed.
/// @dev This function can only be called inside a multisig transaction.

function removeOwner(address owner) public onlyThis {
  if (_ownerCount <= _threshold) revert('CeloMultiSig: cannot remove owner below threshold');
  _owners[owner] = false;
  _ownerCount--;
}

/// @notice Changes the threshold
/// @param newThreshold The new threshold.
/// @dev This function can only be called inside a multisig transaction.
function changeThreshold(uint16 newThreshold) public onlyThis {
  require(newThreshold > 0, 'CeloMultiSig: threshold must be greater than 0');
  require(newThreshold <= _ownerCount, 'CeloMultiSig: threshold must be less than or equal to owner count');
  _threshold = newThreshold;
}

/// @notice Replaces an owner with a new owner
/// @param oldOwner The owner to be replaced.
/// @param newOwner The new owner.
/// @dev This function can only be called inside a multisig transaction.
function replaceOwner(address oldOwner, address newOwner) public onlyThis {
  require(_owners[oldOwner], 'CeloMultiSig: old owner must be an owner');
  require(!_owners[newOwner], 'CeloMultiSig: new owner must not be an owner');
  require(newOwner != address(0), 'CeloMultiSig: new owner must not be the zero address');
  _owners[oldOwner] = false;
  _owners[newOwner] = true;
}
```

Like this:

![Add housekeeping functions](./images/contract_add_housekeeping_functions.png)

Here is the list of the functions we added and there purposes:

- **addOwner(address owner)**                           - Add an address to the list of owners
- **removeOwner(address owner)**                        - Remove an address from the list of owners (will only work if the new ownersCount is still higher or equal to the current threshold)
- **changeThreshold(uint16 newThreshold)**              - Change the amount of owners required to sign a transaction for the transaction to be executed
- **replaceOwner(address oldOwner, address newOwner)**  - Replace one owner address by a different owner address (will only work if old owner, was owner and new owner is not already a owner)

The 4 last functions we added are very powerful and can be used to change the ownership of this contract and the amount of owners required to authorize and execute a transaction. So to keep things save you can see in the header of all these function the modifier **onlyThis**, this is a modifier, a piece of reusable logic that will be executed before the function is executed. It's time to add this logic.

So near the top of our contract, after the last event and before the constructor function we will add:


```js
modifier onlyThis() {
  require(msg.sender == address(this), 'CeloMultiSig: only this contract can call this function');
  _;
}
```

Like this:

![Add modifier to the contract](./images/contract_add_modifier.png)

Since msg.sender equal the address that is sending the transaction, and address(this) equal the address of the contract, we allow the transaction to proceed **only** if the sender of the transaction is the contract itself. This way the only way to add, remove or change a owner or to change the threshold (after the deployment of the contract) is that a sufficient number of owners sign a transaction to call for example addOwner() and execute the transaction.

And so we are now just missing the main piece in our contract, the main function that will validate the signatures and execute the transaction.

Go after the **function isOwner(address owner)** and before the **function addOwner(address owner)** and add:

```js
  /// @notice Executes a transaction
  /// @param to The address to which the transaction is made.
  /// @param value The amount of Ether to be transferred.
  /// @param data The data to be passed along with the transaction.
  /// @param txnGas The gas limit for the transaction.
  /// @param signatures The signatures to be used for the transaction.
  function execTransaction(
    address to,
    uint256 value,
    bytes memory data,
    uint256 txnGas,
    bytes memory signatures
  ) public payable nonReentrant returns (bool success) {
    uint16 threshold_ = _threshold;
    if (signatures.length < 65 * threshold_) revert('CeloMultiSig: invalid signatures');
    bytes32 txHash = _hashTypedDataV4(
      keccak256(abi.encode(_TRANSACTION_TYPEHASH, to, value, keccak256(data), txnGas, _nonce))
    );
    address currentOwner;
    uint256 currentOwnerNonce;
    for (uint16 i; i < threshold_; ) {
      unchecked {
        currentOwner = _getCurrentOwner(txHash, signatures, i);
        currentOwnerNonce = uint256(uint96(_nonce)) + uint256(uint160(currentOwner) << 96);
        require(_owners[currentOwner], 'CeloMultiSig: invalid owner');
        require(!_ownerNonceUsed[currentOwnerNonce], 'CeloMultiSig: owner already signed');
        _ownerNonceUsed[currentOwnerNonce] = true;
        ++i;
      }
    }
    _nonce++;
    uint256 gasBefore = gasleft();
    assembly {
      success := call(txnGas, to, value, add(data, 0x20), mload(data), 0, 0)
    }
    require(gasBefore - gasleft() < txnGas, 'CeloMultiSig: not enough gas');
    if (success) emit TransactionExecuted(msg.sender, to, value, data, txnGas, _nonce);
    else emit TransactionFailed(msg.sender, to, value, data, txnGas, _nonce);
    return success;
  }

  /// @notice Return the current owner address from the full signature at the id position
  /// @param txHash The transaction hash.
  /// @param signatures The signatures to be used for the transaction.
  /// @param id The id of the position of the owner in the full signature.
  /// @return currentOwner The current owner address.
  function _getCurrentOwner(
    bytes32 txHash,
    bytes memory signatures,
    uint16 id
  ) private pure returns (address currentOwner) {
    unchecked {
      uint8 v;
      bytes32 r;
      bytes32 s;
      assembly {
        let signaturePos := mul(0x41, id)
        r := mload(add(signatures, add(signaturePos, 32)))
        s := mload(add(signatures, add(signaturePos, 64)))
        v := and(mload(add(signatures, add(signaturePos, 65))), 255)
      }
      currentOwner = ecrecover(txHash, v, r, s);
    }
  }
```

Like this:

![Add executeTransaction function](./images/contract_add_executeTransaction_function.png)

Now let's try to explain what our function execTransaction does. First let's look at the arguments it take:

- **address to**                 - The address of the target contract or user
- **uint256 value**              - The value to be sent with this transaction (in Celo) (if calling a smart contract, if your function don't require Celo, pass in 0)
- **bytes memory data**          - The call data of the transaction (like any transaction, you can pass some call data, if you are calling a smart contract function, this is where you will enter the encoded function signature and arguments)
- **uint256 txnGas**             - The maximum gas to be used by this transaction, if the call consume more gas than this, the transaction will fail
- **bytes memory signatures**    - The signatures of all the owners that approved this transactions

Inside the logic of the function, our first verification **if (signatures.length < 65 * threshold_)** is to verify that the signatures argument is at least equal or longer than the length of a regular signature multiply by the threshold of the contract.

After this, using the function in EIP712.sol from OpenZeppelin, we independently hash all the arguments, the same way the owners will have hash them prior to signing them, with **_hashTypedDataV4(keccak256(abi.encode(_TRANSACTION_TYPEHASH, to, value, keccak256(data), txnGas, _nonce)))**. This way we will be able to retrieve the signer of each signatures to verify that they are the right owners.

Then we use a loop **for (uint16 i; i < threshold_; )** to verify each signatures for up to the amount of threshold, using a internal function _getCurrentOwner().
This internal function use assembly, a lower level programming language that allow us to do more simple operation (in this case bytes manipulation) at lower gas cost.
The main purpose of this internal function, is to split the different signatures that we had previously concatenated all together and to finally call ecrecover() to retrieve the signer of each signature.

We then verify that this owner has not already sign this transaction (so an owner can't trick the contract in signing multiple time the same transaction) and we verify that he is an owner.
Then we save in storage the fact that he signed this transaction and after having verify all signatures, we increment the nonce so this nonce use to generate the signatures can't be used again (therefore these signatures can't be reused (preventing a replay attack)).

We then execute the call (the transaction) and record the gas used (by looking at gasLeft() before and after) and make sure it did not consume more than the limit that was pass as argument.

And finally we emit a event with the result of the call, either **TransactionExecuted** or **TransactionFailed** with the detail of this transaction.

## Compile the contract

We have finish writing our contract, now it's time to see if our contract compile!
To do so, let's run:

```bash
npx hardhat compile
```

Like this:

![NPX Hardhat Compile](./images/npx_hardhat_compile.png)

## Clone or fork this project repository

The full contract is available at [Celo Multi-Signatures Hardhat](https://github.com/marc-aurele-besner/celo-multi-signatures-hardhat)