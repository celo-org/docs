---
title: Celo Forno
description: How to connect to Celo without running a full node using Forno.
---

# Forno

How to connect to Celo without running a full node using Forno.

---

## What is Forno?

Forno is a cLabs hosted node service for interacting with the Celo network. This allows you to connect to the Celo Blockchain without having to run your own node.

:::tip

Forno does not offer a terms of service and there are no guarantees about service uptime. For production applications, consider using [Figment Datahub](/developer/tools#figment-datahub) or [Quicknode](/developer/tools#quicknode).

:::

Forno has HTTP and websocket endpoints that you can use to query current Celo data or post transactions that you would like to broadcast to the network. The service runs full nodes in non-archive mode, so you can query the current state of the blockchain, but cannot access historic state.

Forno can be used as an `Http Provider` with [ContractKit](/developer/contractkit).

```javascript
const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");

const web3 = new Web3("https://forno.celo.org");
const kit = ContractKit.newKitFromWeb3(web3);
```

Forno is a public node, so to send transactions from a Forno connection you will have to sign transactions with a private key before sending them to Forno. The [Hello Celo](/blog/developer-guide/start/hellocelo) guide shows you how to connect to the Alfajores testnet with Forno and use it to sign and send transactions on the network.

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

```
https://baklava-forno.celo-testnet.org
```

### Websocket connections & Event listeners

Websocket connections are useful for listening to logs (aka events) emitted by a smart contract, but Forno only allows a websocket connection for 20 minutes before disconnecting. On disconnect, you can reconnect to the websocket endpoint to keep listening. [Here](https://gist.github.com/critesjosh/a230e7b2eb54c8d330ca57db1f6239db) is an example script of how to set up an event listener that reconnects when the connection is broken.
