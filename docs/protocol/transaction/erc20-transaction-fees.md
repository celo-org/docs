---
title: Paying for Gas in Tokens
description: How to pay Celo gas fees using whitelisted ERC20 tokens.
---

# Paying for Gas in Tokens

How to pay Celo gas fees using whitelisted ERC20 tokens.

---

## Transaction Fees

As in Ethereum, transaction fees play a critical role in the Celo protocol as a safeguard against denial-of-service attacks. In order to simplify the process of sending funds, these fees can be paid in ERC20 tokens, and not just the native token of the protocol, CELO. This means that a user sending Celo Dollars to friends or family will be able to pay their transaction fee out of their Celo Dollar balance, and do not need to hold a separate balance of CELO in order to make transactions.

## Fee Currency Field

The protocol maintains a governable whitelist of smart contract addresses which can be used to pay for transaction fees. These smart contracts implement an extension of the ERC20 interface, with additional functions that allow the protocol to debit and credit transaction fees. When creating a transaction, users can specify the address of the currency they would like to use to pay for gas via the `feeCurrency` field. Leaving this field empty will result in the native currency, CELO, being used. Note that transactions that specify non-CELO gas currencies will cost approximately 50k additional gas.

## Whitelisted Gas Fee Addresses

To obtain a list of the gas fee addresses that have been whitelisted using [Celo's Governance Process](https://docs.celo.org/protocol/governance), you can run the `getWhitelist` method on the `FeeCurrencyWhitelist` contract. All other notable mainnet core smart contracts are listed [here](https://docs.celo.org/contract-addresses#celo-mainnet).

### Tokens with Adapters

After Contract Release 11, addresses in the whitelist are no longer guaranteed to be full ERC20 tokens and can now also be [adapters](https://github.com/celo-org/celo-monorepo/blob/release/core-contracts/11/packages/protocol/contracts-0.8/stability/FeeCurrencyAdapter.sol). Adapters are whitelisted in-lieu of tokens in the scenario that a ERC20 token has decimals other than 18.

The Celo Blockchain natively works with 18 decimals when calculating gas pricing, so adapters are needed to normalize the decimals for tokens that use a different one. Some stablecoins use 6 decimals as a standard.

Transactions with those ERC20 tokens are performed as usual (using the token address), but when paying gas currency with those ERC20 tokens, the adapter address should be used. This adapter address is also the one that should be used when querying [Gas Price Minimum](/protocol/transaction/gas-pricing).

Adapters can also be used to query `balanceOf(address)` of an account, but it will return the balance as if the token had 18 decimals and not the native ones. This is useful to calculate if an account has enough balance to cover gas after multiplying `gasPrice * estimatedGas` without having to convert back to the token's native decimals.

#### Adapters by network

##### Mainnet

N/A

USDC to be deployed. [Source](https://www.circle.com/blog/what-you-need-to-know-native-usdc-is-launching-on-celo).


##### Alfajores (testnet)

| Token    | Adapter |
| -------- | ------- |
| `0xc9cce1e51F1393CE39EB722E3e59eDE6faBf89fD`  | `0x780c1551C2Be3ea3B1f8b1E4CeDc9C3CE40da24E`    |

##### Baklava (testnet)

N/A
