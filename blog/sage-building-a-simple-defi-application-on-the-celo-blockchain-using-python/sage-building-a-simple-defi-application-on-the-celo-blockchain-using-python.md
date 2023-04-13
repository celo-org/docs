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

Decentralized Finance (DeFi), a revolutionary method of handling money, has swept the globe. DeFi applications automate financial transactions using smart contracts and blockchain technology, doing away with the need for middlemen. Celo is a blockchain that has grown in popularity among DeFi programmers.

Decentralized apps (dApps) and smart contracts can be created using the open-source blockchain platform Celo. It is intended to encourage digital payments in emerging nations and make financial services more easily accessible. The Proof of Stake (PoS) consensus process is used by the Celo platform to validate transactions, making it quick, secure, and environmentally friendly.

Using Solidity, Python, and the web3.py module, we will create a straightforward DeFi Lending smart contract and deploy it on the Celo blockchain in this tutorial. To communicate with the Celo blockchain, we'll utilize web3.py, and create the smart contract using Solidity.

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

In your new directory, create a Python virtual environment and activate it with the following commands:

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

Next, we will create a basic smart contract for the DeFi Lending application with functionalities like creating and repaying loans with collateral and liquidating undercollateralized loans. Additionally, it integrates Chainlink price oracles to obtain collateral value.

Create a file called LendingPlatform.sol in the root directory of your project.

LendingPlatform.sol

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DeFiLending is Ownable {
    using SafeERC20 for IERC20;

    uint256 public constant COLLATERAL_RATIO = 150;
    uint256 public constant LIQUIDATION_DISCOUNT = 90;

    struct Loan {
        uint256 amount;
        uint256 collateralAmount;
        address collateralToken;
        uint256 lastInterestUpdate;
    }

    IERC20 public lendingToken;
    AggregatorV3Interface public priceOracle;
    mapping(address => Loan) public loans;

    event LoanCreated(address indexed borrower, uint256 amount);
    event LoanRepaid(address indexed borrower, uint256 amount);
    event LoanLiquidated(address indexed borrower, uint256 amount);

    constructor(IERC20 _lendingToken, AggregatorV3Interface _priceOracle) {
        lendingToken = _lendingToken;
        priceOracle = _priceOracle;
    }

    function createLoan(
        uint256 loanAmount,
        uint256 collateralAmount,
        IERC20 collateralToken
    ) external {
        require(loanAmount > 0, "Invalid loan amount");
        require(collateralAmount > 0, "Invalid collateral amount");
        require(loans[msg.sender].amount == 0, "Existing loan");

        uint256 collateralValue = getCollateralValue(
            collateralAmount,
            collateralToken
        );
        uint256 minCollateralValue = (loanAmount * COLLATERAL_RATIO) / 100;

        require(
            collateralValue >= minCollateralValue,
            "Insufficient collateral"
        );

        collateralToken.safeTransferFrom(
            msg.sender,
            address(this),
            collateralAmount
        );
        lendingToken.safeTransfer(msg.sender, loanAmount);

        loans[msg.sender] = Loan({
            amount: loanAmount,
            collateralAmount: collateralAmount,
            collateralToken: address(collateralToken),
            lastInterestUpdate: block.timestamp
        });

        emit LoanCreated(msg.sender, loanAmount);
    }

    function repayLoan(uint256 amount) external {
        Loan storage loan = loans[msg.sender];
        require(amount > 0, "Invalid amount");
        require(loan.amount >= amount, "Loan amount exceeded");

        lendingToken.safeTransferFrom(msg.sender, address(this), amount);

        if (loan.amount == amount) {
            IERC20(loan.collateralToken).safeTransfer(
                msg.sender,
                loan.collateralAmount
            );
            delete loans[msg.sender];
        } else {
            loan.amount -= amount;
        }

        emit LoanRepaid(msg.sender, amount);
    }

    function liquidateLoan(address borrower) external {
        Loan storage loan = loans[borrower];
        require(loan.amount > 0, "No active loan");

        uint256 collateralValue = getCollateralValue(
            loan.collateralAmount,
            IERC20(loan.collateralToken)
        );
        uint256 minCollateralValue = (loan.amount * COLLATERAL_RATIO) / 100;

        require(
            collateralValue < minCollateralValue,
            "Loan not undercollateralized"
        );

        uint256 discountedCollateralAmount = (loan.collateralAmount *
            loan.amount *
            LIQUIDATION_DISCOUNT) / 100;

        lendingToken.safeTransferFrom(msg.sender, address(this), loan.amount);
        IERC20(loan.collateralToken).safeTransfer(
            msg.sender,
            discountedCollateralAmount
        );

        delete loans[borrower];

        emit LoanLiquidated(borrower, loan.amount);
    }

    function getCollateralValue(
        uint256 collateralAmount,
        IERC20 collateralToken
    ) public view returns (uint256) {
        address tokenAddress = address(collateralToken);
        require(
            tokenAddress != address(lendingToken),
            "Collateral cannot be lending token"
        );

        AggregatorV3Interface collateralPriceOracle = AggregatorV3Interface(
            tokenAddress
        );

        (, int256 collateralPrice, , , ) = collateralPriceOracle
            .latestRoundData();
        require(collateralPrice > 0, "Invalid collateral price");

        return
            (uint256(collateralPrice) * collateralAmount) /
            (10 ** collateralPriceOracle.decimals());
    }

    function setPriceOracle(
        AggregatorV3Interface newOracle
    ) external onlyOwner {
        priceOracle = newOracle;
    }
}
```

Install the Chainlink and Openzeppelin libraries using npm, on your terminal run the following command:

```bash
npm i @chainlink/contracts @openzeppelin/contracts
```

Now let us go through the code and explain each component:

- Imports: The contract imports several necessary libraries and interfaces, including IERC20, SafeERC20, Ownable, and Chainlink's AggregatorV3Interface from OpenZeppelin.
- Constants and Variables: The contract specifies the liquidation discount (LIQUIDATION DISCOUNT) and collateral ratio (COLLATERAL RATIO). It also declares the price oracle (priceOracle), the lending token (lendingToken), and a mapping to hold loan data (loans).
- Events: The contract specifies three events: loan formation (LoanCreated), loan repayment (LoanRepaid), and loan liquidation (LoanLiquidated) (LoanLiquidated).
- Constructor: Using IERC20 and AggregatorV3Interface as input inputs, the contract constructor initializes the loan token and pricing oracle.
- Loan Creation: By depositing collateral, users can construct loans using the `createLoan()` function. It checks to see if the loan is overcollateralized based on the COLLATERAL RATIO and confirms the loan amount and collateral amount.
- Loan Repayment: Borrowers can partially or fully repay their debts using the `repayLoan()` function. If the loan is fully repaid, the borrower receives the collateral back, and the loan is removed from the mapping.
- Liquidators can liquidate undercollateralized debts using the `liquidateLoan()` method. If there is insufficient collateral to cover the loan, the liquidator may settle the balance owed and obtain some of the collateral at a reduced cost (LIQUIDATION DISCOUNT).
- Computation of Collateral Value: The `getCollateralValue()` method uses the Chainlink pricing oracle to determine the collateral value in terms of the loan token.
- Maintenance of the price oracle is done through the `setPriceOracle()` function, which is only accessible by the contract owner.

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

with open("DeFiLending.sol", "r") as file:
    contract_source_code = file.read()

# Compile the contract
compiled_sol = compile_standard({
    "language": "Solidity",
    "sources": {
        "DeFiLending.sol": {
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
contract_data = compiled_sol['contracts']['DeFiLending.sol']['DeFiLending']
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

The DeFi contract is compiled and deployed to the Celo blockchain using this script, which also installs the necessary Solidity compiler version and establishes a connection to a Celo node. When executing the script, carefully set the environment variables CELO PROVIDER URL, CELO DEPLOYER ADDRESS, and CELO DEPLOYER PRIVATE KEY.

Run the script with the following code on your terminal:

```bash
python deploy.py
```

Your contract should be deployed successfully.

![Screenshot](https://user-images.githubusercontent.com/104994589/229949707-3e4059b1-f71e-4692-84b0-d2cc057611aa.png)

## Step 4: Interact with the Smart Contract

Finally, let us interact with the functions in our Lending Defi smart contract. In the root directory of your project, create a file called [client.py](http://client.py) and paste the following code:

client.py

```python
import os
from web3 import Web3
from web3.middleware import geth_poa_middleware

import deploy

# Set up web3 connection
provider_url = os.environ.get("CELO_PROVIDER_URL")
w3 = Web3(Web3.HTTPProvider(provider_url))
assert w3.is_connected(), "Not connected to a Celo node"

# Add PoA middleware to web3.py instance
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

abi = deploy.abi
contract_address =  deploy.contract_address
private_key = deploy.private_key
deployer = deploy.deployer

contract = w3.eth.contract(address=contract_address, abi=abi)

def build_transaction(fn, *args, **kwargs):
    nonce = w3.eth.get_transaction_count(deployer)
    txn = fn.build_transaction(
        {"from": deployer, "gas": 1500000, "nonce": nonce, **kwargs}
    )
    signed_txn = w3.eth.account.sign_transaction(txn, private_key)
    return signed_txn

def create_loan(loan_amount, collateral_amount, collateral_token):
    create_loan_fn = contract.functions.createLoan(
        loan_amount, collateral_amount, collateral_token
    )
    signed_txn = build_transaction(create_loan_fn)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return txn_hash

def repay_loan(amount):
    repay_loan_fn = contract.functions.repayLoan(amount)
    signed_txn = build_transaction(repay_loan_fn)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return txn_hash

def liquidate_loan(borrower):
    liquidate_loan_fn = contract.functions.liquidateLoan(borrower)
    signed_txn = build_transaction(liquidate_loan_fn)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return txn_hash

def get_collateral_value(collateral_amount, collateral_token):
    collateral_value = contract.functions.getCollateralValue(
        collateral_amount, collateral_token
    ).call()
    return collateral_value

def set_price_oracle(new_oracle):
    set_price_oracle_fn = contract.functions.setPriceOracle(new_oracle)
    signed_txn = build_transaction(set_price_oracle_fn)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return txn_hash

# Create Loan

loan_amount = 1000
collateral_amount = 2000
collateral_token = "0x8BdDeC1b7841bF9eb680bE911bd22051f6a00815"  # Replace with the actual token address

txn_hash = create_loan(loan_amount, collateral_amount, collateral_token)
receipt = w3.eth.wait_for_transaction_receipt(txn_hash)
print(receipt)
```

Let’s go through the code above to understand how the interaction works:

**Set up your account and contract:**

Make sure you have enough money in your account to cover gas costs and create your account using the private key. Connect to a Celo RPC node and create a contract object with the deployed contract ABI and contract address.

```python
import os
from web3 import Web3
from web3.middleware import geth_poa_middleware

import deploy

# Set up web3 connection
provider_url = os.environ.get("CELO_PROVIDER_URL")
w3 = Web3(Web3.HTTPProvider(provider_url))
assert w3.is_connected(), "Not connected to a Celo node"

# Add PoA middleware to web3.py instance
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

abi = deploy.abi
contract_address =  deploy.contract_address
private_key = deploy.private_key
deployer = deploy.deployer

contract = w3.eth.contract(address=contract_address, abi=abi)
```

**Utility function to build a transaction:**

You must create and transmit transactions to communicate with the smart contract features.

```python
def build_transaction(fn, *args, **kwargs):
    nonce = w3.eth.get_transaction_count(deployer)
    txn = fn.build_transaction(
        {"from": deployer, "gas": 1500000, "nonce": nonce, **kwargs}
    )
    signed_txn = w3.eth.account.sign_transaction(txn, private_key)
    return signed_txn
```

**Interact with the `createLoan` function:**

To generate a new loan, the create loan Python function communicates with the DeFi lending smart contract. Loan amount, Collateral amount, and Collateral Token are the three parameters required. With the given arguments, the function creates a transaction that calls the `createLoan` function of the smart contract, signs it with the account's private key, transmits it to the blockchain, and then returns the transaction hash.

```python
def create_loan(loan_amount, collateral_amount, collateral_token):
    create_loan_fn = contract.functions.createLoan(
        loan_amount, collateral_amount, collateral_token
    )
    signed_txn = build_transaction(create_loan_fn)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return txn_hash
```

**Interact with the `repayLoan` function:**

In order to repay an existing loan, the Python repay loan function communicates with the DeFi lending smart contract. It constructs and signs a transaction to call the smart contract's `repayLoan` function, passes the repayment amount as a parameter, transmits the transaction to the blockchain, and then returns the transaction hash.

```python
def repay_loan(amount):
    repay_loan_fn = contract.functions.repayLoan(amount)
    signed_txn = build_transaction(repay_loan_fn)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return txn_hash
```

**Interact with the `liquidateLoan` function:**

To liquidate an undercollateralized loan, the Python liquidate loan function communicates with the DeFi lending smart contract. It builds and signs a transaction to call the `liquidateLoan` function of the smart contract, submits the transaction to the blockchain, and then returns the transaction hash. It takes the borrower's address as an argument.

```python
def liquidate_loan(borrower):
    liquidate_loan_fn = contract.functions.liquidateLoan(borrower)
    signed_txn = build_transaction(liquidate_loan_fn)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return txn_hash
```

**Interact with the `getCollateralValue` function:**

In order to obtain the value of the collateral in terms of loan tokens, the Python get collateral value function communicates with the DeFi lending smart contract. It calls the getCollateralValue function of the smart contract with two parameters—the amount of the collateral and the address of the collateral token—and returns the computed collateral value.

```python
def get_collateral_value(collateral_amount, collateral_token):
    collateral_value = contract.functions.getCollateralValue(
        collateral_amount, collateral_token
    ).call()
    return collateral_value
```

**Interact with the `setPriceOracle` function:**

To update the price oracle used for collateral appraisal, the Python set price oracle method communicates with the DeFi lending smart contract. It generates and signs a transaction to run the smart contract's `setPriceOracle` function, submits the transaction to the blockchain, and returns the transaction hash. It also takes the new oracle's address as an argument.

```python
def set_price_oracle(new_oracle):
    set_price_oracle_fn = contract.functions.setPriceOracle(new_oracle)
    signed_txn = build_transaction(set_price_oracle_fn)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return txn_hash
```

**Create a Loan:**

Test the create_loan function to test our current implementation:

```python
# Create Loan

loan_amount = 1000
collateral_amount = 2000
collateral_token = "0x8BdDeC1b7841bF9eb680bE911bd22051f6a00815"  # Replace with the actual token address

txn_hash = create_loan(loan_amount, collateral_amount, collateral_token)
receipt = w3.eth.wait_for_transaction_receipt(txn_hash)
print(receipt)
```

Now, go to your terminal and run the code:

```bash
python client.py
```

Your loan function should be successfully executed:

![Screenshot](https://user-images.githubusercontent.com/104994589/229949115-c3e8a7b3-9c4e-466e-8632-cd980e26c3c1.png)

## Conclusion

This fundamental DeFi lending smart contract illustrates key features of a lending platform, including loan formation, loan repayment, and loan liquidation. This example in a production setting should be improved, optimized, and audited, as it is not meant for deployment on a live network. A fully-featured DeFi lending application can be made by including further features like interest rate models and governance frameworks.

## Next Steps

We've given a summary of a fundamental DeFi lending smart contract in this tutorial. The following actions can help you improve your DeFi lending application as you build on this foundation:

- Incorporate algorithms to modify interest rates in response to market factors like supply and demand. Build Interest Rate Models. As a starting point, think about adopting interest rate models from well-known DeFi systems like Aave or Compound.
- Add Governance Mechanisms: Provide governance tools that let token holders decide on platform parameters, application upgrades, and other crucial elements. You can use the governance contracts provided by OpenZeppelin or look into the governance frameworks offered by well-known DeFi platforms.
- Support Various Collateral Types: The smart contract should be improved to accommodate various collateral token kinds. A separate mapping for collateral tokens, their accompanying price oracles, and collateralization ratios may need to be made to accomplish this.
- Streamline the liquidation process by employing an auction-based method to liquidate undercollateralized positions or by creating a more complex procedure that considers the health of loans.
- Integrate Flash Loans: Include Flash Loan functionality to let consumers borrow assets for the duration of a single transaction without providing collateral. For loan refinancing, arbitrage, and other uses, this capability can be helpful.
- Create a User Interface: Provide a user-friendly online interface that allows users to easily deposit collateral, create loans, repay loans, and liquidate undercollateralized loans. This interface will allow users to engage with smart contracts.

## About the Author

[Israel Okunaya](https://meetisraelokunaya.curious.page/) is an ace writer with a flair for simplifying complexities and a knack for storytelling. He leverages over four years of experience to meet the most demanding writing needs in different niches, especially food and travel, blockchain, and marketing. He sees blockchain as a fascinating yet tricky affair. So, he is given to simplifying its complexities with text and video tutorials.

## References

- [Celo docs](https://docs.celo.org/)
- [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html)
- [Github repo](https://github.com/Divine572/Celo-defi)
