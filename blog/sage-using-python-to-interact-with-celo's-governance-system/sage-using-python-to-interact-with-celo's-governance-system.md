---
title: Using Python to Interact with Celo's Governance System
description: In this article, we will know what the Celo Governance system is and how we can interact with it using Python and web3.py (Python library used for interacting with Ethereum nodes)

authors:
  - name: Israel Okunaya
    title: Product Manager, Technical Writer @Celo Foundation
    url: https://github.com/Southpaw0
    image_url: https://user-images.githubusercontent.com/104994589/228124211-5fe2da77-ee4c-410c-9be5-dacabe619b2c.png
    tags: [celosage, celo, smartcontract, solidity, intermediate]
hide_table_of_contents: true
slug: /tutorials/using-python-to-interact-with-celo's-governance-system
---

![header](https://user-images.githubusercontent.com/104994589/228124211-5fe2da77-ee4c-410c-9be5-dacabe619b2c.png)

## Introduction

In this article, we will know what the Celo Governance system is and how we can interact with it using Python and web3.py (Python library used for interacting with Ethereum nodes). Celo is a fully mobile-first and open-source blockchain that allows developers to build smart contracts and DAPPS (decentralized applications). Holders of the native Celo token can vote on proposals that affect the platform's development, parameters, and future features through its governance system. 

## Prerequisites

To follow along with this tutorial, you need to be familiar with:

- Building Smart contracts
- The Python programming language
- The Celo Governance contract ABI

## Requirements

 You should have the following installed on your computer to follow along:

- Python 3.7 or later
- [Node.js](https://nodejs.org/en/download/)
- [Celo Testnet account](https://faucet.celo.org/)
- [Celo Wallet](https://docs.celo.org/blog/tutorials/3-simple-steps-to-connect-your-metamask-wallet-to-celo) (with some Celo tokens)
- [Python-dotenv](https://pypi.org/project/python-dotenv/) (for environment variables)
- [Web3.py](https://web3py.readthedocs.io/en/stable/) (for interacting with the blockchain)

## Set up project

On your terminal, use the following commands to create a new folder for your project:

```bash
mkdir celo-governance-system
cd celo-governance-system
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

## Setting up the Celo Environment

Next, let’s connect to the Celo Alfajores. Create a new file in your root directory called “main.py”.

```python
from web3 import Web3

CELO_NODE_URL = 'https://alfajores-forno.celo-testnet.org'
PRIVATE_KEY = 'your-private-key'

web3 = Web3(Web3.HTTPProvider(CELO_NODE_URL))
web3.eth.default_account = web3.eth.account.privateKeyToAccount(PRIVATE_KEY).address
```

Replace “your-private-key” with your Celo account private key.

## Interacting with Celo's Governance Contracts

Smart contracts are the foundation of Celo's governance system, and the Governance contract will be the primary one we work with. Let's first import the required modules and load the application binary interface (ABI) for the contract.

```python
import json

GOVERNANCE_CONTRACT_ADDRESS = '0x88CdC239B61c5E5e1aCF31ca35AE015FF1a1706f'
GOVERNANCE_ABI_PATH = 'path/to/your/governance_abi.json'

with open(GOVERNANCE_ABI_PATH) as f:
    governance_abi = json.load(f)

governance_contract = web3.eth.contract(
    address=web3.toChecksumAddress(GOVERNANCE_CONTRACT_ADDRESS),
    abi=governance_abi
)
```

The path to the Governance contract ABI JSON file should be replaced with "path/to/your/governance abi.json".

You can find all the contract addresses (both proxies and implementation) of all Celo smart contracts [here](https://docs.celo.org/contract-addresses#celo-mainnet).

You can create a JSON file called “governance_abi.json” in the root directory of your project and paste the following code:

```json
[
  {
    "constant": true,
    "inputs": [],
    "name": "getProposalCount",
    "outputs": [
      {
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "getProposal",
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {
            "name": "proposer",
            "type": "address"
          },
          {
            "name": "deposit",
            "type": "uint256"
          },
          {
            "name": "timestamp",
            "type": "uint256"
          },
      {
        "name": "transactionCount",
        "type": "uint256"
      },
      {
        "name": "descriptionUrl",
        "type": "string"
      }
    ]
  }
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": true,
"inputs": [
{
"name": "proposalId",
"type": "uint256"
}
],
"name": "getProposalStage",
"outputs": [
{
"name": "stage",
"type": "uint32"
}
],
"payable": false,
"stateMutability": "view",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"name": "targets",
"type": "address[]"
},
{
"name": "values",
"type": "uint256[]"
},
{
"name": "signatures",
"type": "bytes[]"
},
{
"name": "calldatas",
"type": "bytes[]"
},
{
"name": "descriptionUrl",
"type": "string"
}
],
"name": "propose",
"outputs": [
{
"name": "proposalId",
"type": "uint256"
}
],
"payable": true,
"stateMutability": "payable",
"type": "function"
},
{
"constant": false,
"inputs": [
{
"name": "proposalId",
"type": "uint256"
},
{
"name": "value",
"type": "uint256"
}
],
"name": "vote",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
}
]
```

The JSON file illustrates the ABI structure for significant operations like:

- "getProposalCount": Returns a list of all submitted proposals.
- "getProposal": Retrieves information about a particular proposal using its ID.
- "getProposalStage": Retrieves a proposal's current stage (e.g., Approval, Referendum, Execution).
- "propose": Submits a brand-new proposal with the targets, values, function signatures, calldatas, and URL for the description that have been specified.
- "vote": Casts a vote in favor of a proposal with the ID and value supplied (e.g., Yes, No, Abstain).

Note: Please be aware that this is not the full ABI for the Celo Governance contract, only a simplified version of it. You can get the complete ABI, which is available in the Celo-monorepo on GitHub, in order to interact with the [Celo Governance contract](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/governance/Governance.sol).

### Querying Governance Contract Information

Once the governance contract is set up, let’s query some information from it.

```python
proposal_count = governance_contract.functions.getProposalCount().call()
print(f"Proposal count: {proposal_count}")

# Get the details of a specific proposal (e.g., proposal ID 1)
proposal_id = 1
proposal = governance_contract.functions.getProposal(proposal_id).call()
print(f"Proposal details: {proposal}")
```

The code above queries the governance contract to get the the total number of proposals that have been submitted and details about a particular proposal.

### Creating a Proposal

You will initially need to deposit some CELO tokens in order to create a new proposal. The proposalDeposit function allows users to query the needed deposit amount:

```python
required_deposit = governance_contract.functions.proposalDeposit().call()
print(f"Required deposit: {required_deposit} CELO")
```

The propose function can then be used to build a proposal. The destination contract address, function signature, parameters, and deposit amount must all be provided.

```python
target_address = '0x123...'
function_signature = 'functionName(uint256,address)'
function_args = [arg1, arg2]
deposit_amount = required_deposit

transaction = governance_contract.functions.propose(
    [web3.toChecksumAddress(target_address)],
    [web3.sha3(text=function_signature)],
    [web3.toBytes(function_args)],
    deposit_amount,
    "Description of the proposal"
).buildTransaction({
    'gas': 500000,
    'gasPrice': web3.eth.gasPrice,
    'nonce': web3.eth.getTransactionCount(web3.eth.default_account)
})

signed_transaction = web3.eth.account.signTransaction(transaction, PRIVATE_KEY)
transaction_hash = web3.eth.sendRawTransaction(signed_transaction.rawTransaction)

print(f"Submitted proposal with transaction hash: {transaction_hash.hex()}")
```

### Voting on Proposals

Afer a proposal has been submitted, we can vote on it using the “vote” function.

- Step 1 : Query the proposal status

```python
proposal_status = governance_contract.functions.getProposalStage(proposal_id).call()
print(f"Proposal status: {proposal_status}")
```

- Step 2: You can vote if the plan is at the "Referendum" stage

```python
vote_choice = 1  # 1 for Yes, 2 for No, and 3 for Abstain

transaction = governance_contract.functions.vote(
    proposal_id,
    vote_choice
).buildTransaction({
    'gas': 200000,
    'gasPrice': web3.eth.gasPrice,
    'nonce': web3.eth.getTransactionCount(web3.eth.default_account)
})

signed_transaction = web3.eth.account.signTransaction(transaction, PRIVATE_KEY)
transaction_hash = web3.eth.sendRawTransaction(signed_transaction.rawTransaction)

print(f"Voted with transaction hash: {transaction_hash.hex()}")
```

## Conclusion

In this article, we have learned how to interact with the Celo governance system using web3.py and Python. You can now engage in Celo’s governance process with what you’ve learned. We went over setting up the Celo environment, looking up information from the governance contract, making ideas, and voting on them. This ought to serve as a starting point for additional Python-based investigation and engagement with Celo's governance system.

## Next Steps

To learn more about building on Celo using Python, you can explore the following resources:

- [Celo documentation](https://docs.celo.org/)
- [Solidity](http://solidity-by-example.org)
- [Celo Governance](https://docs.celo.org/protocol/governance)
- [Celo Governance Github repo](https://github.com/celo-org/governance)

## About the Author

[Israel Okunaya](https://meetisraelokunaya.curious.page/) is an ace writer with a flair for simplifying complexities and a knack for storytelling. He leverages over four years of experience to meet the most demanding writing needs in different niches, especially food and travel, blockchain, and marketing. He sees blockchain as a fascinating yet tricky affair. So, he is given to simplifying its complexities with text and video tutorials.

## References

- [Celo docs](https://docs.celo.org/)
- [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html)
- [Github repo](https://github.com/Divine572/celo-governance-system-)
