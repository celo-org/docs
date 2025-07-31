---
title: Celo Forno
description: How to connect to Celo without running a full node using Forno.
---

# Forno

How to connect to Celo without running a full node using Forno.

---

## What is Forno?

Forno is a cLabs hosted node service for interacting with the Celo network. This allows you to connect to the Celo Blockchain without having to run your own node.

:::tip Best-Effort Service

Forno is a free service with no terms of service or uptime guarantees. For production applications, use [professional RPC and node providers](/network/node/overview#as-a-service).

:::

Forno has HTTP and websocket endpoints that you can use to query current Celo data or post transactions that you would like to broadcast to the network. The service runs full nodes in non-archive mode, so you can query the current state of the blockchain, but cannot access historic state.

Forno can be used as an `Http Provider` with [ContractKit](/developer/contractkit).

```javascript
const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");

const web3 = new Web3("https://forno.celo.org");
const kit = ContractKit.newKitFromWeb3(web3);
```

Forno is a public node, so to send transactions from a Forno connection you will have to sign transactions with a private key before sending them to Forno.
Forno is rate limited, as your usage increases, consider options that can provide the desired level of support (SLA): [list of RPC providers](./overview#as-a-service).

## Forno networks

Consult [this page](/network/) to determine which network is right for you.

### Celo Mainnet

```bash
https://forno.celo.org
```

Websocket support:

```bash
wss://forno.celo.org/ws
```

### Alfajores Testnet

```bash
https://alfajores-forno.celo-testnet.org
```

Websocket support:

```bash
wss://alfajores-forno.celo-testnet.org/ws
```

### Baklava Testnet

```bash
https://baklava-forno.celo-testnet.org
```

Websocket support:

```bash
wss://baklava-forno.celo-testnet.org/ws
```

### Websocket connections & Event listeners

Websocket connections are useful for listening to logs (aka events) emitted by a smart contract, but Forno only allows a websocket connection for 20 minutes before disconnecting.
On disconnect, you can reconnect to the websocket endpoint to keep listening.
[Here](https://gist.github.com/critesjosh/a230e7b2eb54c8d330ca57db1f6239db) is an example script of how to set up an event listener that reconnects when the connection is broken.
