---
title: Using Python to Build a Celo Blockchain Identity System
description: This article explains how to use Python and the Web3.py library to build a decentralized identity system on the Celo blockchain.
authors:
  - name: Israel Okunaya
    title: Technical Writer
    url: https://github.com/Southpaw0
    image_url: https://avatars.githubusercontent.com/u/104994589?v=4
tags: [celosage, celo, smartcontract, solidity, intermediate]
hide_table_of_contents: true
slug: /tutorials/using-python-to-build-a-celo-blockchain-identity-system
---

![header](../../src/data-tutorials/showcase/intermediate/sage-using-python-to-build-a-celo-blockchain-identity-system.png)

## Introduction

The interest in and use cases for the blockchain ecosystem have significantly increased in recent years. Celo is one such cutting-edge blockchain that is intended to provide a reliable, secure, and easy-to-use platform for financial transactions. Celo's identification system, which enables users to keep their privacy while assuring the security and integrity of transactions, is a vital platform component. In this blog article, we will go over how to utilize Python to create a Celo blockchain identification system.

## Prerequisites

To follow along with this tutorial, you need to be familiar with:

- Building Smart contracts
- The Python programming language

## Requirements

You should have the following installed on your computer to follow along:

- Python 3.7 or later
- [Node.js](https://nodejs.org/en/download/)
- [Celo Testnet account](https://faucet.celo.org/)
- [Celo Wallet](https://docs.celo.org/blog/tutorials/3-simple-steps-to-connect-your-metamask-wallet-to-celo) (with some Celo tokens)
- [Python-dotenv](https://pypi.org/project/python-dotenv/) (for environment variables)
- [Web3.py](https://web3py.readthedocs.io/en/stable/) (for interacting with the blockchain)

## Step 1: Set up the project

On your terminal, use the following commands to create a new folder for your project:

```bash
mkdir celo-identity-system
cd celo-identity-system
```

In your new directory, create a python virtual environment and activate it with the following commands:

```bash
python3 -m venv env
source env/bin/activate
```

To install the web3.py, and python-dotenv:

```bash
pip install web3
pip install python-dotenv
```

## Step 2: Create the Identity Smart Contract and Deploy the Smart Contract

First, we need to create a smart contract. Create a file called “Identity.sol” in your project root directory to take care of the identity-related tasks.

Identity.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract IdentityNFT is ERC1155, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Identity {
        string name;
        string email;
        uint256 age;
        bool exists;
    }

    mapping(uint256 => Identity) public identities;
    mapping(address => uint256) public addressToTokenId;
    mapping(address => uint256) public otps;
    mapping(address => uint256) public otpExpirations;

    uint256 private constant OTP_EXPIRATION_TIME = 5 minutes;
    uint256 private constant OTP_RANGE = 1000000;

    constructor(string memory _uri) ERC1155(_uri) {}

    modifier identityExists(address _user) {
        require(identities[addressToTokenId[_user]].exists, "Identity not found");
        _;
    }

    function createIdentity(string memory _name, string memory _email, uint256 _age) public onlyOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(_age > 0, "Age must be greater than 0");
        require(!identities[addressToTokenId[msg.sender]].exists, "Identity already exists");

        uint256 tokenId = _tokenIdCounter.current();

        _mint(msg.sender, tokenId, 1, "");
        identities[tokenId] = Identity(_name, _email, _age, true);
        addressToTokenId[msg.sender] = tokenId;

        _tokenIdCounter.increment();
    }

    function updateIdentity(string memory _name, string memory _email, uint256 _age) public identityExists(msg.sender) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(_age > 0, "Age must be greater than 0");

        uint256 tokenId = addressToTokenId[msg.sender];

        identities[tokenId].name = _name;
        identities[tokenId].email = _email;
        identities[tokenId].age = _age;
    }

    function getIdentity(address _address) public view identityExists(_address) returns (string memory name, string memory email, uint256 age) {
        uint256 tokenId = addressToTokenId[_address];
        Identity storage identity = identities[tokenId];
        return (identity.name, identity.email, identity.age);
    }

    function deleteIdentity() public identityExists(msg.sender) {
        uint256 tokenId = addressToTokenId[msg.sender];
        _burn(msg.sender, tokenId, 1);
        delete identities[tokenId];
    }

    function uri(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC1155Metadata: URI query for nonexistent token");

        string memory baseURI = super.uri(_tokenId);
        return string(abi.encodePacked(baseURI, _tokenId.toString()));
    }

    function _exists(uint256 _tokenId) internal view returns (bool) {
        return _tokenId < _tokenIdCounter.current();
    }

    function requestOtp() public identityExists(msg.sender) {
        uint256 tokenId = addressToTokenId[msg.sender];
        uint256 otp = _generateOtp(tokenId);
        otps[msg.sender] = otp;
        otpExpirations[msg.sender] = block.timestamp + OTP_EXPIRATION_TIME;
    }

    function verifyOtp(uint256 _otp) public identityExists(msg.sender) returns (bool) {
        require(otpExpirations[msg.sender] >= block.timestamp, "OTP expired");
        return otps[msg.sender] == _otp;
    }

    function _generateOtp(uint256 _seed) private view returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, _seed))) % OTP_RANGE;
        return randomNumber;
    }

}
```

**Contract Overview**

The ERC1155 standard and the Ownable contract made available by OpenZeppelin are both inherited by the IdentityNFT contract we will be creating. The Ethereum network's standard interface for NFTs is ERC1155. Under the same contract, it permits the generation of both fungible and non-fungible tokens. A modification that limits some contract owner functions is provided by the Ownable contract. The user's identification information will be saved by our contract, and they will be able to update, remove, and ask for an OTP (one-time password) for verification. The various parts of the contract will be explained in more depth below.

**Import Statements**

The required contracts and libraries must then be imported. The OpenZeppelin library's ERC1155, Ownable, Counters, and Strings contracts are being imported. The Strings contract is used to convert uint256 to string for joining with the base URI, and the Counters contract is used to create distinct IDs for each identity.

```solidity
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "node_modules/@openzeppelin/contracts/utils/Counters.sol";
```

to make these imports work, run the following command on your terminal:

```bash
npm i @openzeppelin/contracts
```

**Contract Definition**

In order to build our contract specification, we first inherit from the Ownable and ERC1155 contracts. Moreover, we import the Counters and Strings libraries. The user's name, email address, age, and a boolean indicating whether the identity exists are then stored in a structure named Identity, which we define next. To store IDs, address to token ID mappings, and OTPs and their expiration dates, we employ mappings.

```solidity
contract IdentityNFT is ERC1155, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Identity {
        string name;
        string email;
        uint256 age;
        bool exists;
    }

    mapping(uint256 => Identity) public identities;
    mapping(address => uint256) public addressToTokenId;
    mapping(address => uint256) public otps;
    mapping(address => uint256) public otpExpirations;
```

**Constants**

The OTP expiration time is set to 5 minutes, and the OTP range is set to 1,000,000. These are the two constants that we declare.

```solidity
uint256 private constant OTP_EXPIRATION_TIME = 5 minutes;
uint256 private constant OTP_RANGE = 1000000;
```

**Constructor**

The base URI for the ERC-1155 tokens is provided via the only argument \_uri that the contract's constructor accepts.

```solidity
constructor(string memory _uri) ERC1155(_uri) {}
```

**createIdentity**

For the person calling the function, the createIdentity function establishes a new identity. The name, email address, and identity age are the three arguments required. It verifies that the identity does not already exist and that the fields for the name, email, and age are not empty. A new token ID is then created, a new ERC-1155 token is created for the caller, and the identity is mapped to the new token ID.

```solidity
function createIdentity(string memory _name, string memory _email, uint256 _age) public onlyOwner {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(_age > 0, "Age must be greater than 0");
        require(!identities[addressToTokenId[msg.sender]].exists, "Identity already exists");

        uint256 tokenId = _tokenIdCounter.current();

        _mint(msg.sender, tokenId, 1, "");
        identities[tokenId] = Identity(_name, _email, _age, true);
        addressToTokenId[msg.sender] = tokenId;

        _tokenIdCounter.increment();
    }
```

**identityExists modifier**

Then, we create the identityExists modifier, which determines if the identity is present for a particular address. Before allowing the user to take particular actions, the modifier is used to make sure that an identity is present.

```solidity
modifier identityExists(address _user) {
        require(identities[addressToTokenId[_user]].exists, "Identity not found");
        _;
    }
```

**updateIdentity**

The name, email address, and age of the caller's identity are updated via the updateIdentity function. It verifies that the identity is valid and that the fields for the name, email, and age are not empty. The Identity struct is then updated with the new values.

```solidity
function updateIdentity(string memory _name, string memory _email, uint256 _age) public identityExists(msg.sender) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(_age > 0, "Age must be greater than 0");

        uint256 tokenId = addressToTokenId[msg.sender];

        identities[tokenId].name = _name;
        identities[tokenId].email = _email;
        identities[tokenId].age = _age;
    }
```

**getIdentity**

The identification information for a particular address can be obtained by calling the function getIdentity, which we define next.

```solidity
function getIdentity(address _address) public view identityExists(_address) returns (string memory name, string memory email, uint256 age) {
        uint256 tokenId = addressToTokenId[_address];
        Identity storage identity = identities[tokenId];
        return (identity.name, identity.email, identity.age);
    }
```

**deleteIdentity**

The user can remove their identity by using the deleteIdentity function. It is limited to existing identities and doesn't take any parameters. The addressToTokenId mapping is used to obtain the token ID for the caller's address initially. The caller's token is subsequently burned by calling the internal \_burn method from the ERC1155 contract. This lowers the supply of tokens and removes the token from the caller's address. Lastly, it removes the identity from the mapping of identities.

```solidity
function deleteIdentity() public identityExists(msg.sender) {
        uint256 tokenId = addressToTokenId[msg.sender];
        _burn(msg.sender, tokenId, 1);
        delete identities[tokenId];
    }
```

**URI function**

To return the URI of the token, the URI function replaces the URI method from the ERC1155 contract. It accepts a \_tokenId parameter and returns a string with the token's URI. To obtain the base URI, the \_tokenId parameter is passed to the ERC1155 contract's URI function. The function then creates a new URI by concatenating the base URI and the string value of the \_tokenId parameter.

```solidity
function uri(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC1155Metadata: URI query for nonexistent token");

        string memory baseURI = super.uri(_tokenId);
        return string(abi.encodePacked(baseURI, _tokenId.toString()));
    }
```

**requestOtp**

A one-time password (OTP) is generated for the user using the “requestOtp” function. It is limited to existing identities and doesn't take any parameters. The addressToTokenId mapping is used to obtain the token ID for the caller's address initially. The internal \_generateOtp method is then used to create a random OTP using the token ID. With the caller's address serving as the key, it stores the OTP in the “otps” mapping and the expiration time in the “otpExpirations” mapping.

```solidity
function requestOtp() public identityExists(msg.sender) {
        uint256 tokenId = addressToTokenId[msg.sender];
        uint256 otp = _generateOtp(tokenId);
        otps[msg.sender] = otp;
        otpExpirations[msg.sender] = block.timestamp + OTP_EXPIRATION_TIME;
    }
```

**verifyOtp**

A user-entered OTP is verified by the “verifyOtp” function. It only accepts IDs that already exist and requires a “\_otp” parameter. By contrasting the expiration time recorded in the otpExpirations mapping with the current block timestamp, it first verifies that the OTP has not yet expired. The OTP is compared to the OTP stored in the “otps” mapping for the caller's address to see if it has not yet expired. It returns true, indicating that the verification was successful, if the OTPs match.

```solidity
function verifyOtp(uint256 _otp) public identityExists(msg.sender) returns (bool) {
        require(otpExpirations[msg.sender] >= block.timestamp, "OTP expired");
        return otps[msg.sender] == _otp;
    }
```

**generateOtp**

Using a seed value that is supplied as an input, the \_generateOtp method generates a random OTP. The keccak256 hash function, block timestamp, and seed value are used by the function to first produce a random number. In order to guarantee that the OTP is a 6-digit number, the function then takes the modulo of the random number with the OTP RANGE. The produced OTP is returned by the function as an uint256 integer.

```solidity
function _generateOtp(uint256 _seed) private view returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, _seed))) % OTP_RANGE;
        return randomNumber;
    }
```

Note: Please when working on a real application, it is advisable to use an OTP verification service off-chain so as to reduce gas fees and improve security.

Let’s compile and deploy the contract. In your root directory, create a file called “deploy.py” and paste the following code:

deploy.py

```python
import json
import os
from web3 import Web3
from dotenv import load_dotenv
from solcx import compile_standard, install_solc

load_dotenv()

# Install specific Solidity compiler version
install_solc("0.8.0")

# Set up web3 connection
provider_url = os.environ.get("CELO_PROVIDER_URL")
w3 = Web3(Web3.HTTPProvider(provider_url))
assert w3.is_connected(), "Not connected to a Celo node"

# Set deployer account and private key
deployer = os.environ.get("CELO_DEPLOYER_ADDRESS")
private_key = os.environ.get("CELO_DEPLOYER_PRIVATE_KEY")

with open("Identity.sol", "r") as file:
    contract_source_code = file.read()

# Compile the contract
compiled_sol = compile_standard({
    "language": "Solidity",
    "sources": {
        "IdentityNFT.sol": {
            "content": contract_source_code
        }
    },
    "settings": {
        "outputSelection": {
            "*": {
                "*": ["metadata", "evm.bytecode", "evm.sourceMap"]
            }
        }
    }
})

# Extract the contract data
contract_data = compiled_sol['contracts']['IdentityNFT.sol']['IdentityNFT']
bytecode = contract_data['evm']['bytecode']['object']
abi = json.loads(contract_data['metadata'])['output']['abi']

# Deploy the contract
nonce = w3.eth.get_transaction_count(deployer)

transaction = {
    'nonce': nonce,
    'gas': 2000000,
    'gasPrice': w3.eth.gas_price,
    'data': bytecode,
}
signed_txn = w3.eth.account.sign_transaction(transaction, private_key)
transaction_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
transaction_receipt = w3.eth.wait_for_transaction_receipt(transaction_hash)

# Get the contract address
contract_address = transaction_receipt['contractAddress']
print(f"Contract deployed at address: {contract_address}")
```

The IdentityNFT contract is compiled and deployed to the Celo blockchain using this script, which also installs the necessary Solidity compiler version and establishes a connection to a Celo node. When executing the script, make careful to set the environment variables CELO PROVIDER URL, CELO DEPLOYER ADDRESS, and CELO DEPLOYER PRIVATE KEY.

Run the script with the following code on your terminal:

```bash
python deploy.py
```

Your contract should be deployed successfully.

![Screenshot](https://user-images.githubusercontent.com/104994589/228780693-a0c46cb8-a373-40dd-acce-6740c54fcefc.png)

## Conclusion

In this tutorial, we implemented an Identity smart contract in solidity and deployed it on the Celo blockchain. I will write a follow-up tutorial on how you can interact with the functions in our IdentityNFT smart contract.

## Next Steps

To learn more about building on Celo using Python, you can explore the following resources:

- [Celo documentation](https://docs.celo.org/)
- [Solidity](http://solidity-by-example.org)

## About the Author

[Israel Okunaya](https://meetisraelokunaya.curious.page/) is an ace writer with a flair for simplifying complexities and a knack for storytelling. He leverages over four years of experience to meet the most demanding writing needs in different niches, especially food and travel, blockchain, and marketing. He sees blockchain as a fascinating yet tricky affair. So, he is given to simplifying its complexities with text and video tutorials.

## References

- [Celo docs](https://docs.celo.org/)
- [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html)
- [Github repo](https://github.com/Divine572/celo-identity-system)
