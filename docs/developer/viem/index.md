---
title: Viem
description: Using Viem with Celo
---

## Viem

Viem is full featured lightweight javascript library for interacting with EVM chains with _first class support for Celo_.

Viem is used by [Wagmi](https://wagmi.sh/) and [Rainbowkit](https://www.rainbowkit.com/).

The [Viem docs](https://viem.sh/) have excellent examples of how to use it in your project.

### With Celo

The TLDR is that passing a celo chain from `viem/chains` into the config of `createWalletClient` will enable any function that signs a transaction including `sendTransaction` and `writeContract` to accept `feeCurrency` in its parameters object. Don't care about feeCurrency? Leave it out to pay with CELO.

```ts
// see viem docs for more info on setup

// Create a wallet client that will sign the transaction
const client = createWalletClient({
  account,
  // Passing chain is how viem knows to try serializing tx as cip42.
  chain: celoAlfajores,
  transport: http(),
});

client.writeContract({
  abi: ANY_CONTRACT_ABI,
  address: ANY_CONTRACT_ABI_ADDRESS,
  functionName: "contractMethod",
  args: [to, parseEther(value)],
  // set the fee currency on the contract write call
  feeCurrency: FEE_CURRENCIES_ALFAJORES["cusd"],
});
```

## Gas Price

When paying for transaction with an alternate feeCurrency token it is important to know the price of gas denominated in that token. As such Celo nodes accept an optional param of the address of the token for the `eth_gasPrice` call. Therefore rather than use viem's `publicClient.getGasPrice()` function you should fetch it like the example.

```ts
async function getGasPrice(client, feeCurrencyAddress?: Address) {
  const priceHex = await client.request({
    method: "eth_gasPrice",
    params: [feeCurrencyAddress],
  });
  return hexToBigInt(priceHex);
}

tx.maxFeePerGas = await getGasPrice(client, tx.feeCurrency);
```

For an interactive example of using viem with Celo's Fee Abstraction feature [see our demo](https://rainbowkit-with-celo.vercel.app/fee-currency)
