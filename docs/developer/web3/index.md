---
title: Web3.js
description: Using Web3.js with Celo
---

## Web3.js

Web3.js was established in 2014, making it the oldest web3 library. With extensive documentation, an active community and modular design, Web3.js is powerful and easy-to-use. It has _support for Celo via plugins since version 4.13.1_.

The [Web3.js docs](https://docs.web3js.org/) have excellent examples of how to use it in your project.

### With Celo

You need to install `@celo/web3-plugin-transaction-types` as well as `web3@4.13.1` or higher.

```ts
// see web3 docs for more info on setup

import { Web3 } from "web3";
import { CeloTransactionTypesPlugin } from "@celo/web3-plugin-transaction-types";

const web3 = new Web3("http://127.0.0.1:8545");
web3.registerPlugin(new CeloTransactionTypesPlugin());

// Now `web3.celo` is available and `celo.eth` is celo-aware

const cEUR = await web3.celo.getCoreContractAddress("StableTokenEUR");
const txData = {
  from: "0x123...",
  to: "0x456...",
  value: 123n,
  feeCurrency: cEUR, // optional
};
await web3.celo.populateTransaction(txData);
const tx = await web3.eth.sendTransaction(txData);
```

## Gas Price

When paying for transaction with an alternate feeCurrency token it is important to know the price of gas denominated in that token. You can use `web3.celo.populateTransaction` to make sure `maxPriorityFeePerGas`, `maxFeePerGas`, and `gas` are filled properly.

```ts
await web3.celo.populateTransaction(txData);
```

More examples in the [github repository readme](https://github.com/celo-org/web3-plugin-transaction-types).
