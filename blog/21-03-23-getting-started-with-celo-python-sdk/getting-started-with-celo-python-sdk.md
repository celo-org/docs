---
title: Getting started with Celo Python SDK
description: This article will provide a step-by-step guide on how to get started with Celo Python SDK.
authors:
  - name: ✍️ Mayowa Julius Ogungbola
    url: https://github.com/Julius170/
    image_url: https://avatars.githubusercontent.com/u/69092079?v=4
tags: [celosage, solidity, celo, intermediate]
hide_table_of_contents: true
slug: "/tutorials/getting-started-with-celo-python-SDK"
---

![header](https://user-images.githubusercontent.com/69092079/226498246-74bdfc98-5e15-4353-b9a7-b4fad894e77d.png)

## Introduction​

Celo is a decentralized blockchain platform that enables users to create mobile-based decentralized applications that can be used to send and receive payments, as well as access other decentralized finance (DeFi) tools. To interact with the Celo blockchain, developers can use various software development kits (SDKs), one of which is the Python SDK. This SDK provides a convenient way for Python developers to interact with the celo blockchain by creating applications.

In this article, we will explore how to get started with Celo's Python SDK. You will have an overview of what the Celo blockchain is and why it is useful. We will then introduce the Python SDK, highlighting its features and capabilities. Finally, we will walk through the process of setting up the SDK and creating a simple application that interacts with the Celo blockchain. By the end of this article, you will have a basic understanding of how to use Celo's Python SDK to build applications on the Celo blockchain.

## Prerequisites​

To continue along this tutorial you need to have good experience with the following;

- Python: To use the Celo Python SDK you should have a basic understanding of python programming language.

- Blockchain Technology: It is also important to have a basic understanding of blockchain technology, including concepts like decentralized network, smart contract, and cryptography hash functions.

- The Celo blockchain: You should also have a basic understanding of how the celo blockchain works including it consensus mechanism, token economics, and network, architecture.

- Access to the Celo network: Finally, to interact with the celo network, either by running your own node or by using a third-party provider that supports the Celo network.

## Getting Started

1. First, Create a new folder inside your preferred code editor to get started.

2. Next, to get started with the Celo python SDK, you need to install the package using the command: `pip install https://github.com/blaize-tech/celo-sdk-py/`.

3. Next run the command `pip install .` to install all the packages required to get started with the Python SDK.

4. Now, on your main directory, create a new file `sample.py` and add the code below to initialize your kit instance. Initialize the Celo Python SDK: Before you can use the Celo SDK, you need to initialize it by creating a new Web3 object:

```python
from celo_sdk.kit import Kit
kit = Kit('https://alfajores-forno.celo-testnet.org')
```

5. Next add the line of code:

`kit.w3.eth.getBalance(some_address)`.

To set Up a default transaction Option, use the code below:

```python
from celo_sdk.kit import Kit

kit = Kit('https://alfajores-forno.celo-testnet.org')
currency_address = kit.base_wrapper.registry.load_contract_by_name('StableToken')['address']
kit.wallet_fee_currency = currency_address
```

## Interacting with the Celo Currency

To interact with Celo currency you can follow the steps below:

1. The code below creates an instance if the GoldenToken contract using the Celo SDK’s `base_wrapper.create_and_get_contract_by_name()` method and retrieve the balance of a specificaddress using the balance_of() method of the `GoldenToken` contract.

```python
gold_token = kit.base_wrapper.create_and_get_contract_by_name('GoldToken')
balance = gold_token.balance_of(address)
```

- The `GoldToken` contract is a smart contract on the Celo blockchain that represents the Celo Gold token (cGLD).

- The `create_and_get_contratc_by_name()` method creates an instance of the contract and returns a `Contract` object, which can be used to interact with the contract’s function and properties.
- The `balance_of()` method of the `GoldToken` contract takes an Ethereum address as an input parameter and returns the balance of cGLD tokens held by that address. The `address` variable in the code is assumed to be a valid Ethereum address. The address variable in the code i assumed to be a valid Ethereum address that represents a Celo account.

Overall, the code retrieves the balance of cGLD token held by a specific Celo account using the Celo SDK’s `GoldeToken` contract wrapper.

2. To send fund add the code below:

```python
one_gold = kit.w3.toWei(1, 'ether')
tx_hash = gold_token.transfer(address, one_gold)
```

- The first line of code `one_gold = kit.w3.toWei(1, 'ether')`, converts 1 unit of ether (ETH) to its equivalent value in wei, which is the smallest denomination of ether. The Celo Gold token (cGLD) has the same number of decimals as ether, so this conversion can be used to represent 1 cGLD token in wei.

- The second line of code `tx_hash = gold_token.transfer(address, one_gold)` initiates a transaction to transfer 1 cGLD token from the `gold_token` contract (which represents the Celo Gold token) to the `address` specified in the code. The `transfer()` method is a function provided by the `GoldToken` contract wrapper, which takes two input parameters - the recipient address and the amount of cGLD tokens to transfer (in wei).

3. Copy and add the code below:

```python
stable_token = kit.base_wrapper.create_and_get_contract_by_name('StableToken')
gas_price_contract = kit.base_wrapper.create_and_get_contract_by_name('GasPriceMinimum')
gas_price_minimum = gas_price_contract.get_gas_price_minimum(stable_token.address)
gas_price = int(gas_price_minimum * 1.3) # Wiggle room if gas price minimum changes before tx is sent
kit.wallet_fee_currency = stable_token.address # Default to paying fees in cUSD
kit.wallet_gas_price = gas_price

tx = stable_token.transfer(recipient, wei_transfer_amount)
```

- The first line of code `stable_token = kit.base_wrapper.create_and_get_contract_by_name('StableToken')` creates an instance of the `StableToken` contract, which represents a stablecoin on the Celo blockchain. This contract is used to represent a stable value asset on the Celo network, and the specific contract instance is created using the Celo SDK's `base_wrapper.create_and_get_contract_by_name()` method.

- The second line of code gas_price_contract = kit.base_wrapper.create_and_get_contract_by_name('GasPriceMinimum') creates an instance of the GasPriceMinimum contract, which is a smart contract on the Celo blockchain that provides the minimum gas price required to execute a transaction on the Celo network.

- The third line of code `gas_price_minimum = gas_price_contract.get_gas_price_minimum(stable_token.address)` retrieves the current minimum gas price required to execute a transaction using the `get_gas_price_minimum()` method of the `GasPriceMinimum` contract, passing the address of the `StableToken` contract as an input parameter.

- The fourth line of code `gas_price = int(gas_price_minimum * 1.3)` calculates the gas price to use for the transaction. It multiplies the minimum gas price by a factor of 1.3 to add some wiggle room in case the gas price changes before the transaction is sent. The resulting value is then cast to an integer.

- The next two lines of code kit.wallet_fee_currency = stable_token.address and kit.wallet_gas_price = gas_price set the fee currency and gas price for the Celo SDK's wallet. This specifies the currency in which transaction fees will be paid (in this case, cUSD, which is the stablecoin represented by the StableToken contract) and the gas price to use for the transaction.

- The final line of code tx = stable_token.transfer(recipient, wei_transfer_amount) initiates a transaction to transfer a specified amount of cUSD tokens (represented in wei) from the stable_token contract to a specified recipient address on the Celo blockchain. The transfer() function is a method provided by the StableToken contract wrapper and takes two input parameters - the recipient address and the amount of cUSD tokens to transfer (in wei). The resulting transaction hash is assigned to the tx variable.

## Adding New Key to the Wallet

The default behavior of the Wallet object involves the generation of a private key. However, it is possible to specify an existing private key or generate a new one. In order to add a specific private key, the following steps should be taken:

- This code below creates an instance of the `Kit` class from the `celo_sdk` package and specifies the endpoint of the Celo network to connect to (in this case, the Alfajores testnet). It then sets the `wallet_add_new_key` property of the Kit instance to a specific private key, which is used to sign transactions on the Celo blockchain.

```python
from celo_sdk.kit import Kit
kit = Kit('https://alfajores-forno.celo-testnet.org')
kit.wallet_add_new_key = '0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d'
```

- The code below creates an instance of the `Kit` class from the celo_sdk package and generates a new private key using the generate_new_key() method of the Kit instance. It then sets the wallet_add_new_key property of the Kit instance to the newly generated private key.

```python
new_key = kit.generate_new_key()
kit.wallet_add_new_key = new_key
```

- The code retrieves a list of accounts associated with the Kit instance by accessing the accounts property of the wallet object.

```python
accounts = kit.wallet.accounts
```

Its quite useful when determining which accounts are available for sending transactions or checking the balances of associated tokens.

- The code below sets the `wallet_change_account` property of the Kit instance to an existing account address in `the __accounts` dictionary of the wallet object.

```python
kit.wallet_change_account = existing_account_address  # address of account has to be in wallet.__accounts dict
```

- By specifying a private key in this way, the `Kit` instance is able to sign transactions, generate new keys, check wallet account and switch between different wallet accounts using the associated account without the need to provide the private key every time a transaction is sent. This can simplify the process of interacting with the Celo blockchain by eliminating the need for manual key management.

## Signing Messages with Wallet

- The code below Imports the `kit` class ans the e`ncode_default` function from the `celo_sdk` package. It then creates an instance of the Kit class, specifying the endpoint of the Celo network to connect to (in the case, the Alfajores testnet).

- Next, It constructs a message to sig using the `soliditySha3` method of the Web3 instance associated with the Kit intance. In this example, the message is a hex-encoded that we want to sign.

- The `message` variable is then `encoded_defunct` function from the `celo_account.messge` module to prepare it for signing. Finally, the `sign_mesage` method of the `active_account` associated with the `Kit` instance called to sign the message, resulting in a signature that can be used to verify authenticity of the mesage

```python
from celo_sdk.kit import Kit
from celo_sdk.celo_account.messages import encode_defunct

kit = Kit('https://alfajores-forno.celo-testnet.org')
message = kit.w3.soliditySha3(['address'], [signer]).hex()  # For example we want to sign someones address
message = encode_defunct(hexstr=message)
signature = kit.wallet.active_account.sign_message(message)
```

## Interacting with Other Contracts

Inside your contract directory you’ll notice the following contract:

1. `GoldToken`: A contract wrapper for the Celo Gold (cGLD) token, which is the native cryptocurrency of the Celo blockchain.
2. `StableToken`: A contract wrapper for a stablecoin on the Celo blockchain, which is represented by the StableToken contract. This wrapper provides methods for transferring stablecoins, getting the balance of a specified account, and getting the total supply of stablecoins.
3. `GasPriceMinimum`: A contract wrapper for the GasPriceMinimum contract, which provides the minimum gas price required to execute a transaction on the Celo blockchain.

4. `Exchange`: A contract wrapper for the Exchange contract on the Celo blockchain, which is used to exchange one asset for another. This wrapper provides methods for making an exchange, getting the exchange rate between two assets, and getting the total value of an exchange.
5. `LockedGold`: A contract wrapper for the LockedGold contract on the Celo blockchain, which is used for staking cGLD tokens to participate in the Celo network. This wrapper provides methods for locking and unlocking cGLD tokens, checking the total amount of locked cGLD tokens, and checking the amount of locked cGLD tokens for a specific account.

6. `Validators`: A contract wrapper for the Validators contract on the Celo blockchain, which is used for managing the validators that participate in the consensus process for the Celo network. This wrapper provides methods for getting information about validators, checking whether a validator is currently active, and registering to become a validator.

7. `Accounts`: A contract wrapper for the Accounts contract on the Celo blockchain, which is used for managing user accounts on the Celo network. This wrapper provides methods for creating and unlocking accounts, and getting the balance of an account

## Conclusion​

The Celo's Python SDK provides a powerful set of tools for developers looking to build decentralized applications on the Celo blockchain. With its intuitive API and comprehensive documentation, developers can quickly get started building applications that utilize Celo's native assets, smart contracts, and secure messaging protocols.
Whether you're building a new decentralized finance application, creating a digital identity solution, or exploring the potential of blockchain technology in other industries.

The Celo Python SDK provides the necessary building blocks to get started. By following the steps outlined in this article, developers can quickly get up and running with the Celo Python SDK and start building decentralized applications that leverage the full potential of the Celo blockchain.

## About the Author​

Mayowa Julius Ogungbola

Is a Software Engineer, Web3 backend developer and Technical writer always open to working on new Ideas. I enjoy working on [Github](https://github.com/Julius170/). You could slao find out what I [Tweet](https://twitter.com/JuliusAyoola1) about and connect with me on [LinkedIn](https://www.linkedin.com/in/julius-ogungbola-a71810229/).

## References​

Here are links to relevant details about the celo python sdk:

- [Celo python SDK](https://github.com/blaize-tech/celo-sdk-py)
- [Celo python SDK Overview](https://blaize.tech/article-type/celo-project-python-sdk-overview/)
- [Celo Libraries and SDKs](https://docs.celo.org/developer/sdks/celo-sdks)

## Next Step

- [Building a Crowdfunding Platform on Celo with Python](https://docs.celo.org/blog/tutorials/building-a-crowdfunding-platform-on-celo-with-python)
- [Building a Smart Contract Lottery Application on Celo with Python](https://docs.celo.org/blog/tutorials/building-a-smart-contract-lottery-application-on-celo-with-python)
