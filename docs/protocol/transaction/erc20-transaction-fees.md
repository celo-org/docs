---
title: Paying for Gas with Tokens
description: How to pay gas fees using allowlisted ERC20 tokens on Celo.
---

# Introduction

In most L1 and L2 networks, transaction fees can only be paid with one asset, typically, the native asset for the ecosystem which is often volatile in nature. In order to simplify the process of sending funds on Celo, these fees can be paid with allowlisted ERC20 tokens such as USDT, USDC, cUSD, and others, in addition to CELO. This means that a user sending a stablecoin to friends or family will be able to pay the transaction fee out of their stablecoin balance, and will not need to hold a separate CELO balance in order to transact. Critically, Celo supports this functionality natively without Account Abstraction, Pay Masters, or Relay Services. Instead, wallets simply need to add an extra `feeCurrency` field on transaction objects to take advantage of this feature.

## Fee Currency Field

The protocol maintains a governable allowlist of smart contract addresses which can be used to pay for transaction fees. These smart contracts implement an extension of the ERC20 interface, with additional functions that allow the protocol to debit and credit transaction fees. When creating a transaction, users can specify the address of the currency they would like to use to pay for gas via the `feeCurrency` field. Leaving this field empty will result in the native currency, CELO, being used. Note that transactions that specify non-CELO gas currencies will cost approximately 50k additional gas.

## Allowlisted Gas Fee Addresses

To obtain a list of the gas fee addresses that have been allowlisted using [Celo's Governance Process](https://docs.celo.org/protocol/governance), you can run the `getWhitelist` method on the `FeeCurrencyWhitelist` contract. All other notable mainnet core smart contracts are listed [here](https://docs.celo.org/contract-addresses#celo-mainnet).

### Tokens with Adapters

After Contract Release 11, addresses in the allowlist are no longer guaranteed to be full ERC20 tokens and can now also be [adapters](https://github.com/celo-org/celo-monorepo/blob/release/core-contracts/11/packages/protocol/contracts-0.8/stability/FeeCurrencyAdapter.sol). Adapters are allowlisted in-lieu of tokens in the scenario that a ERC20 token has decimals other than 18 (e.g. USDT and USDC).

The Celo Blockchain natively works with 18 decimals when calculating gas pricing, so adapters are needed to normalize the decimals for tokens that use a different one. Some stablecoins use 6 decimals as a standard.

Transactions with those ERC20 tokens are performed as usual (using the token address), but when paying gas currency with those ERC20 tokens, the adapter address should be used. This adapter address is also the one that should be used when querying [Gas Price Minimum](/protocol/transaction/gas-pricing).

Adapters can also be used to query `balanceOf(address)` of an account, but it will return the balance as if the token had 18 decimals and not the native ones. This is useful to calculate if an account has enough balance to cover gas after multiplying `gasPrice * estimatedGas` without having to convert back to the token's native decimals.

#### Adapters by network

##### Mainnet

| Name   | Token                                                                                                                       | Adapter                                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `USDC` | [`0xcebA9300f2b948710d2653dD7B07f33A8B32118C`](https://celoscan.io/address/0xcebA9300f2b948710d2653dD7B07f33A8B32118C#code) | [`0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B`](https://celoscan.io/address/0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B#code) |
| `USDT` | [`0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e`](https://celoscan.io/address/0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e#code) | [`0x0e2a3e05bc9a16f5292a6170456a710cb89c6f72`](https://celoscan.io/address/0x0e2a3e05bc9a16f5292a6170456a710cb89c6f72#code) |

##### Alfajores (testnet)

| Name   | Token                                                                                                                                 | Adapter                                                                                                                               |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `USDC` | [`0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B`](https://alfajores.celoscan.io/address/0x2f25deb3848c207fc8e0c34035b3ba7fc157602b#code) | [`0x4822e58de6f5e485eF90df51C41CE01721331dC0`](https://alfajores.celoscan.io/address/0x4822e58de6f5e485eF90df51C41CE01721331dC0#code) |

##### Baklava (testnet)

N/A

### Enabling Transactions with ERC20 Token as fee currency in a wallet

We recommend using the [viem](https://viem.sh/) library as it has support for the `feeCurrency` field in the transaction required for sending transactions where the gas fees will be paid in ERC20 tokens. Ethers.js and web.js currently don't support `feeCurrency`.

#### Estimating gas price

To estimate gas price use the token address (in case of cUSD, cEUR and cREAL) or the adapter address (in case of USDC and USDT) as the value for `feeCurrency` field in the transaction.

:::info
The Gas Price Minimum value returned from the RPC has to be interpreted in 18 decimals.
:::

#### Preparing a transaction

When preparing a transaction that uses ERC20 token for gas fees, use the token address (in case of cUSD, cEUR and cREAL) or the adapter address (in case of USDC and USDT) as the value for `feeCurrency` field in the transaction.

The recommended transaction `type` is `123`, which is a CIP-64 compliant transaction read more about it [here](/protocol/transaction/transaction-types).

Here is how a transaction would look like when using USDC as a medium to pay for gas fees.

```js
let tx = {
  // ... other transaction fields
  feeCurrency: "0x2f25deb3848c207fc8e0c34035b3ba7fc157602b", // USDC Adapter address
  type: "0x7b",
};
```

:::info
To get details about the underlying token of the adapter you can call `adaptedToken` function on the adapter address, which will return the underlying token address.
:::
