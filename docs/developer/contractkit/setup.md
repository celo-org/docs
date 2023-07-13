---
title: Celo ContractKit Setup
description: ContractKit requirements, installation, and initialization.
---

# Setup

ContractKit requirements, installation, and initialization.

---

## Installation and System Requirements

To install, run the following:

```bash npm2yarn
npm install web3 @celo/contractkit
```

You will need Node.js v12.x.

## Initializing the Kit

To start working with ContractKit you need a `kit` instance and a valid net to connect with. In this example will use `alfajores` (you can read more about it [here](/network))

```ts
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);
```

Go to the [page about Forno](/network/node/forno) for details about different connection types and network endpoints.

## Initialize the Kit with your own node

If you are hosting your own node (you can follow [this guide](/network/node/run-mainnet) to run one) you can connect our ContractKit to it.

```js
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";

// define localUrl and port with the ones for your node

const web3 = new Web3(`${localUrl}:${port}`);
const kit = newKitFromWeb3(web3);
```

Same as `Web3` we support `WebSockets`, `RPC` and connecting via `IPC`.
For this last one you will have to initialize the `kit` with an instances of `Web3` that has a **valid** `IPC Provider`

```ts
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";

const web3Instance: Web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/CeloNode/geth.ipc", net)
);

const kit = newKitFromWeb3(web3Instance);
```
