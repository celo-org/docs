---
title: Building a Simple DeFi Application on the Celo Blockchain Using Python
description: In this tutorial, we will build a simple decentralized finance (DeFi) application on the Celo blockchain using Python.
authors:
  - name: Israel Okunaya
    title: Technical Writer
    url: https://github.com/Southpaw0
    image_url: https://user-images.githubusercontent.com/104994589/228994091-9f784450-9f04-4d5e-855f-8f01d91d5a79.png
tags: [celosage, celo, smartcontract, solidity, intermediate]
hide_table_of_contents: true
slug: /tutorials/building-a-simple-defi-application-on-the-celo-blockchain-using-python
---

![header](../../src/data-tutorials/showcase/intermediate/sage-building-a-simple-defi-application-on-the-celo-blockchain-using-python.png)

## Introduction

Decentralized Finance (DeFi), a revolutionary method of handling money, has swept the globe. DeFi applications automate financial transactions using smart contracts and blockchain technology, eliminating the need for middlemen. Celo is a blockchain that has grown in popularity among DeFi programmers.

Decentralized apps (dApps) and smart contracts can be created using the open-source blockchain platform Celo. It is intended to encourage digital payments in emerging nations and make financial services more easily accessible. The Celo platform uses the Proof of Stake (PoS) consensus process to validate transactions, making it quick, secure, and environmentally friendly.

In this tutorial, we will use Python and the web3.py module to create a straightforward DeFi application on the Celo blockchain. To communicate with the Celo blockchain, we'll utilize [web3.py](http://web3.py/), and to create smart contracts, Solidity.

## Prerequisites

To follow along with this tutorial, you need to be familiar with:

- Building Smart contracts
- The Python programming language

## Requirements

 It would help if you had the following installed on your computer to follow along:

- Python 3.7 or later
- [Node.js](https://nodejs.org/en/download/)
- [Celo Testnet account](https://faucet.celo.org/)
- [Celo Wallet](https://docs.celo.org/blog/tutorials/3-simple-steps-to-connect-your-metamask-wallet-to-celo) (with some Celo Gold (cGLD) tokens)
- [Python-dotenv](https://pypi.org/project/python-dotenv/) (for environment variables)
- [Web3.py](https://web3py.readthedocs.io/en/stable/) (for interacting with the blockchain)

## Step 1: Set up the Project

On your terminal, use the following commands to create a new folder for your project:

```bash
mkdir celo-defi
cd celo-defi
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

## Step 2: Write the Smart Contract

Next, create the smart contract for DeFi with functionalities like withdrawal, staking, transferring, and approval of funds. 

Create a file called deploy.py in the root directory of your project.

deploy.py

```python
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    function totalSupply() external view returns (uint256);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);
}

abstract contract DeFi is IERC20 {
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;
    mapping(address => StakingInfo) public staking;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    event Staked(address indexed user, uint256 amount, uint256 unlockTime);
    event Withdrawn(address indexed user, uint256 amount, uint256 rewardAmount);

    uint256 public override totalSupply;
    string public name;
    string public symbol;
    uint8 public decimals;

    struct StakingInfo {
        uint256 amount;
        uint256 unlockTime;
        uint256 rewardAmount;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _initialSupply * 10 ** decimals;
        balances[msg.sender] = totalSupply;
    }

    function transfer(
        address _to,
        uint256 _value
    ) public override returns (bool success) {
        require(_to != address(0), "Invalid address");
        require(balances[msg.sender] >= _value, "Insufficient balance");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(
        address _spender,
        uint256 _value
    ) public override returns (bool success) {
        require(_spender != address(0), "Invalid address");
        allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override returns (bool success) {
        require(_from != address(0), "Invalid address");
        require(_to != address(0), "Invalid address");
        require(balances[_from] >= _value, "Insufficient balance");
        require(
            allowances[_from][msg.sender] >= _value,
            "Insufficient allowance"
        );
        balances[_from] -= _value;
        balances[_to] += _value;
        allowances[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function stake(uint256 _amount) public {
        require(_amount > 0, "Invalid amount");
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        // Transfer tokens from the user to the contract
        balances[msg.sender] -= _amount;
        balances[address(this)] += _amount;

        // Store the staking information for the user
        uint256 stakingPeriod = 30 days;
        uint256 unlockTime = block.timestamp + stakingPeriod;
        uint256 rewardRate = 10; // 10% AP
        uint256 rewardAmount = (_amount * rewardRate * stakingPeriod) /
            (365 * 1 days);

        StakingInfo storage info = staking[msg.sender];
        info.amount += _amount;
        info.unlockTime = unlockTime;
        info.rewardAmount += rewardAmount;

        emit Transfer(msg.sender, address(this), _amount);
        emit Staked(msg.sender, _amount, unlockTime);
    }

    function withdraw() public {
        StakingInfo storage info = staking[msg.sender];
        require(info.amount > 0, "No staked amount");

        // Check if the staking period has ended
        require(block.timestamp >= info.unlockTime, "Staking period not ended");

        // Transfer staked tokens back to the user
        uint256 amount = info.amount;
        balances[address(this)] -= amount;
        balances[msg.sender] += amount;

        // Transfer reward tokens to the user
        uint256 rewardAmount = info.rewardAmount;
        balances[address(this)] -= rewardAmount;
        balances[msg.sender] += rewardAmount;

        // Reset the staking information for the user
        delete staking[msg.sender];

        emit Transfer(address(this), msg.sender, amount + rewardAmount);
        emit Withdrawn(msg.sender, amount, rewardAmount);
    }

    function balanceOf(address _account) public override view returns (uint256) {
        return balances[_account];
    }
}
```

This contract includes staking and reward distribution and has fundamental functionalities like withdrawing, transferring, and approving funds. Using the "stake" function, users can stake their tokens, transferring them from the user to the contract and storing their staking data. The stake information includes the staked amount, unlock time, and prize amount. After the staking period, users can execute the "withdraw" method to collect their staked tokens and receive their rewards.

## Step 3: Compile and Deploy the Smart Contract

Let us compile and deploy the contract. In your root directory, create a file called “deploy.py” and paste the following code:

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

with open("DeFi.sol", "r") as file:
    contract_source_code = file.read()

# Compile the contract
compiled_sol = compile_standard({
    "language": "Solidity",
    "sources": {
        "DeFi.sol": {
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
contract_data = compiled_sol['contracts']['DeFi.sol']['DeFi']
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

The Identity contract is compiled and deployed to the Celo blockchain using this script, which also installs the necessary Solidity compiler version and establishes a connection to a Celo node. When executing the script, make careful to set the environment variables CELO PROVIDER URL, CELO DEPLOYER ADDRESS, and CELO DEPLOYER PRIVATE KEY.

Run the script with the following code on your terminal:

```bash
python deploy.py
```

Your contract should be deployed successfully.

![Screenshot](https://user-images.githubusercontent.com/104994589/228992940-c4fb91e6-3440-4300-adf3-a95d1b4c3c23.png)

## Conclusion

The features that a DeFi smart contract should have must be carefully considered before construction. Developers may build a reliable and secure DeFi system that lets users to exchange value in a trustless and decentralized way by putting the fundamental features we covered into practice. The offered sample smart contract is not a comprehensive solution, but it should serve as a good starting point for developers.

## Next Steps

You can add additional functionalities to this contract such as:

- Including more intricate staking systems with variable return rates or permitting users to withdraw their staked tokens early in exchange for a fee.
- A governance function that gives token owners the ability to vote on resolutions and choices pertaining to the DeFi system. A voting system that gives each token holder a specific number of votes based on their token balance might be used to do this. A quorum requirement might also be incorporated into the contract to guarantee that a sufficient number of token holders take part in the voting process.
- An AMM (automated market maker )that enables token trading without the usage of a centralized exchange. A liquidity pool might be used to do this, allowing users to deposit tokens to provide liquidity and partake in trading commissions. To guarantee that the token exchange rate is based on the most recent market price, the contract could additionally incorporate a price oracle.

## About the Author

[Israel Okunaya](https://meetisraelokunaya.curious.page/) is an ace writer with a flair for simplifying complexities and a knack for storytelling. He leverages over four years of experience to meet the most demanding writing needs in different niches, especially food and travel, blockchain, and marketing. He sees blockchain as a fascinating yet tricky affair. So, he is given to simplifying its complexities with text and video tutorials.

## References

- [Celo docs](https://docs.celo.org/)
- [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html)
- [Github repo](https://github.com/Divine572/Celo-defi)
