---
title: Viem
description: Using Viem with Celo
---

## Viem

Viem is full featured lightweight javascript library for interacting with EVM chains with *first class support for Celo*.

Viem is used by [Wagmi](https://wagmi.sh/) and [Rainbowkit](https://www.rainbowkit.com/).

The [Viem docs](https://viem.sh/) have excellent examples of how to use it in your project.

### With Celo

THE TLDR is that passing a celo chain from `viem/chains` into the config of `createWalletClient` will enable any function that signs a transaction including `sendTransaction` and `writeContract` to accept `feeCurrency` in its parameters object. Don't care about feeCurrency? Leave it out to pay with CELO.

```ts
// see viem docs for more info on setup

// Create a wallet client that will sign the transaction
  const client = createWalletClient({
    account,
    // Passing chain is how viem knows to try serializing tx as cip42.
    chain: celoAlfajores,
    transport: http(),
  })

  client.writeContract({
      abi: ANY_CONTRACT_ABI,
      address: ANY_CONTRACT_ABI_ADDRESS,
      functionName: "contractMethod",
      args: [to, parseEther(value)],
      // set the fee currency on the contract write call
      feeCurrency: FEE_CURRENCIES_ALFAJORES["cusd"]
  })

```

For an interactive example of using viem with Celo's fee currency feature [see our demo](https://rainbowkit-with-celo.vercel.app/fee-currency)
