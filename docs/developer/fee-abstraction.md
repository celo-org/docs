---
title: Implementing Fee Abstraction in Wallets
description: How to allow your wallet users to pay for gas fee using alternate fee currencies
---

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

Celo allows paying gas fees in currency other than the native currency. The tokens that can be used to pay gas fees is controlled via governance and the list of tokens allowed is maintained in [**FeeCurrencyWhitelist.sol**](/contracts/core-contracts).

Alternate fee currency works with EOAs and no paymaster is required!

This works by specifying a token/adapter address as a value for the `feeCurrency` property in the transaction object. The `feeCurrency` property in the transaction object is exclusive to Celo and allows paying gas fees using assets other than the native currency of the network.

The below steps describe how wallets can implement the alternate fee currency feature in order to allow users to use alternate assets in the user's wallet to pay for gas fees.

## Fee Currency Field

The protocol maintains a governable allowlist of smart contract addresses which can be used to pay for transaction fees. These smart contracts implement an extension of the ERC20 interface, with additional functions that allow the protocol to debit and credit transaction fees. When creating a transaction, users can specify the address of the currency they would like to use to pay for gas via the `feeCurrency` field. Leaving this field empty will result in the native currency, CELO, being used. Note that transactions that specify non-CELO gas currencies will cost approximately 50k additional gas.

## Allowlisted Gas Fee Addresses

To obtain a list of the gas fee addresses that have been allowlisted using [Celo's Governance Process](https://docs.celo.org/protocol/governance), you can run the `getWhitelist` method on the `FeeCurrencyWhitelist` contract. All other notable Mainnet core smart contracts are listed [here](https://docs.celo.org/contract-addresses#celo-mainnet).

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


## Enabling Transactions with ERC20 Token as fee currency

We recommend using the [viem](https://viem.sh) library as it has support for the `feeCurrency` field in the transaction required for sending transaction where the gas fees will be paid in ERC20 tokens.

### Estimating gas price

To estimate gas price use the token address (in case of cUSD, cEUR and cREAL) or the adapter address (in case of USDC and USDT) as the value for feeCurrency field in the transaction.

Estimating gas price is important because if the user is trying to transfer the entire balance in an asset and using the same asset to pay for gas fees, the user shouldn't be able to transfer the entire amount as a small portion will be utilized to pay for gas fees.

Example: If the user has 10 USDC and is trying to transfer the entire 10 USDC and chooses to use USDC as the currency to pay for gas, the user shouldn't be allowed to transfer the entire 10 USDC as a small portion has to be used for gas fees.

The following code snippet calculates the transaction fee (in USDC) for a USDC transfer transaction.

Feel free to modify to support the currency of your choice.

```js
import { createPublicClient, hexToBigInt, http } from "viem";
import { celo } from "viem/chains";

// USDC is 6 decimals and hence requires the adapter address instead of the token address
const USDC_ADAPTER_MAINNET = "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B";

const publicClient = createPublicClient({
  chain: celo,
  transport: http(),
});

const transaction = {
  from: "0xccc9576F841de93Cd32bEe7B98fE8B9BD3070e3D",
  to: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
  data: "0xa9059cbb000000000000000000000000ccc9576f841de93cd32bee7b98fe8b9bd3070e3d00000000000000000000000000000000000000000000000000000000000f4240",
  feeCurrency: USDC_ADAPTER_MAINNET,
};

async function getGasPriceInUSDC() {
  const priceHex = await publicClient.request({
    method: "eth_gasPrice",
    params: [USDC_ADAPTER_MAINNET],
  });

  return hexToBigInt(priceHex);
}

async function estimateGasPriceInUSDC(transaction) {
  const estimatedGasInHex = await publicClient.estimateGas({
    ...transaction,

    // just in case the transaction itself does not have feeCurrency property in it.
    feeCurrency: USDC_ADAPTER_MAINNET,
  });

  return hexToBigInt(estimatedGasInHex);
}

async function main() {
  const gasPriceInUSDC = await getGasPriceInUSDC();

  const estimatedGasPrice = await estimateGasInUSDC(transaction);

  /* 
    Transaction fee in USDC to perform the above transaction.
    This amount should not be transferrable in case the user tries to transfer the entire amount.
  */
  const transactionFeeInUSDC = formatEther(
    gasPriceInUSDC * estimatedGasPrice,
  ).toString();

  return transactionFeeInUSDC;
}
```

### Sending transaction using Fee Abstraction

Sending transaction with fee currency other than the native currency of the network is pretty straightforward all you need to do is set the `feeCurrency` property in the transaction object with the address of the token/adapter you want to use to pay for gas fees.

The below code snippets demonstrates transferring 1 USDC using USDC as gas currency.

```js
import { createWalletClient, http } from "viem";
import { celo } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { stableTokenAbi } from "@celo/abis";

// Creating account from private key, you can choose to do it any other way.
const account = privateKeyToAccount("0x432c...");

// WalletClient can perform transactions.
const client = createWalletClient({
  account,

  // Passing chain is how viem knows to try serializing tx as cip42.
  chain: celo,
  transport: http(),
});

const USDC_ADAPTER_MAINNET = "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B";
const USDC_MAINNET = "0xcebA9300f2b948710d2653dD7B07f33A8B32118C";

/*
  The UI of the wallet should calculate the transaction fees, show it and consider the amount to not be part of the asset that the user i.e the amount corresponding to transaction fees should not be transferrable.
*/
async function calculateTransactionFeesInUSDC(transaction) {
  // Implementation of getGasPriceInUSDC is in the above code snippet
  const gasPriceInUSDC = await getGasPriceInUSDC();

  // Implementation of estimateGasInUSDC is in the above code snippet
  const estimatedGasPrice = await estimateGasInUSDC(transaction);

  return gasPriceInUSDC * estimatedGasPrice;
}

async function send(amountInWei) {
  const to = USDC_MAINNET;

  // Data to perform an ERC20 transfer
  const data = encodeFunctionData({
    abi: stableTokenAbi,
    functionName: "transfer",
    args: [
      "0xccc9576F841de93Cd32bEe7B98fE8B9BD3070e3D",
      // Different tokens can have different decimals, cUSD (18), USDC (6)
      amountInWei,
    ],
  });

  const transactionFee = await calculateTransactionFeesInUSDC({ to, data });

  const tokenReceivedbyReceiver = parseEther("1") - transactionFee;

  /* 
    Now the data has to be encode again but with different transfer value because the receiver receives the amount minus the transaction fee.
  */
  const dataAfterFeeCalculation = encodeFunctionData({
    abi: stableTokenAbi,
    functionName: "transfer",
    args: [
      "0xccc9576F841de93Cd32bEe7B98fE8B9BD3070e3D",
      // Different tokens can have different decimals, cUSD (18), USDC (6)
      tokenReceivedbyReceiver,
    ],
  });

  // Transaction hash
  const hash = await client.sendTransaction({
    ...{ to, data: dataAfterFeeCalculation },

    /*
      In case the transaction request does not include the feeCurrency property, the wallet can add it or change it to a different currency based on the user balance.

      Notice that we use the USDC_ADAPTER_MAINNET address not the token address this is because at the protocol level only 18 decimals tokens are supported, but USDC is 6 decimals, the adapter acts a unit converter.
    */
    feeCurrency: USDC_ADAPTER_MAINNET,
  });

  return hash;
}
```

If you have any questions, please reach out [here](https://github.com/celo-org/developer-tooling/discussions/categories/q-a).
