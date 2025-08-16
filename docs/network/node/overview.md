---
title: Nodes and Services
description: Nodes as a Service
---

# Nodes and Services

Connect to nodes and services in the Celo Ecosystem.

---

import PageRef from '@components/PageRef'

## Run a Node

Running your own Celo node gives you direct access to the blockchain without relying on third-party services. This provides enhanced privacy, reliability, and control over your interactions with the Celo network. Follow [this guide](/cel2/operators/run-node) to set up and run your own RPC endpoint, which includes detailed instructions for configuration, deployment, and maintenance of your Celo L2 node infrastructure.

## Use a Community RPC Node

As part of the [migration from L1 to L2](/what-is-celo/history), Celo Validators have become [Community RPC providers](/cel2/operators/community-rpc-node.md).
They are discoverable through the following:

- Install [Celo CLI](/cli/index.md) at version 6.1.0 or later. Then run: `celocli network:community-rpc-nodes`.
- [Vido Node Explorer](https://dev.vido.atalma.io/celo/rpc)
- [Celo Community RPC Gateway](https://celo-community.org/)
- [Stakely Celo RPC Load Balancer](https://celo-json-rpc.stakely.io)

## Forno

[Forno](./forno.md) is a cLabs hosted node service for interacting with the Celo network. This allows you to connect to the Celo Blockchain without having to run your own node.

Forno has HTTP and WebSocket endpoints that you can use to query current Celo data or post transactions that you would like to broadcast to the network. The service runs full nodes in non-archive mode, so you can query the current state of the blockchain, but cannot access the historic state.

## As a Service

Free and paid RPC endpoint hosting.

### Alchemy

[Alchemy](https://docs.alchemy.com/reference/celo-chain-api-quickstart) is a popular API provider and developer platform. Its robust, free tier offers access to enhanced features like SDKs and enhanced APIs and hosted OP Mainnet and testnet nodes.

#### **Supported Networks**

- Celo Mainnet
- Celo Alfajores (Testnet)

<PageRef url="https://docs.alchemy.com/reference/celo-chain-api-quickstart" pageName="Alchemy" />

### Ankr

Featuring open access to a Public RPC API layer, Ankr Protocol provides reliable, load balanced access to node clusters from anywhere in the world.

#### Supported Networks

- Celo Mainnet
- Celo Sepolia (Testnet)
- Celo Alfajores (Testnet)

<PageRef url="https://www.ankr.com/rpc/celo/" pageName="Ankr" />

### Infura

[Infura](https://docs.metamask.io/services/reference/celo/) (by MetaMask) is an RPC end point provider that supports Celo and several other EVM L1s. Infura's node infrastructure powers some of the biggest projects today.

#### Supported Networks

- Celo Mainnet
- Celo Alfajores (Testnet)

<PageRef url="https://www.infura.io/networks/celo" pageName="Infura" />

### Quicknode

[Quicknode](https://www.quicknode.com/chains/celo) is an enterprise grade node service with a dashboard, metrics, security controls, customer support and no rate limits (pay-as-you-go).

#### Supported Networks

- Celo Mainnet

<PageRef url="https://www.quicknode.com/docs/celo" pageName="Quicknode" />

### dRPC

All data from any blockchain in one place. [dRPC](https://drpc.org/docs/celo-api) offers a pay-as-you-go model. Pay only for what you use, scale resources effortlessly, and enjoy clear, predictable pricing. Our model eliminates large upfront costs, encourages innovation and simplifies budgeting. With dRPC, you can manage your Web3 infrastructure efficiently and cost-effectively.

#### Supported Networks

- Celo Mainnet
- Celo Alfajores (Testnet)

<PageRef url="https://drpc.org/chainlist/celo" pageName="DRPC" />

### Lava

[Lava](https://docs.lavanet.xyz) is a multi-chain RPC provider. They also provide managed and decentralized options for your applications.

#### Supported Networks

- Celo Mainnet
- Celo Alfajores (Testnet)

<PageRef url="https://docs.lavanet.xyz" pageName="Lava" />

### thirdweb

thirdweb is a complete web3 development platform, allowing developers to build, manage, and analyze their web3 applications.

#### Supported Networks

- Celo Mainnet
- Celo Alfajores (Testnet)

<PageRef url="https://thirdweb.com/celo" pageName="thirdweb" />

### Pocket

[Pocket Network](https://pocket.network/) is compatible with any network/blockchain (RelayChain) that uses the RPC standard.

#### Supported Networks

- Celo Mainnet

<PageRef url="https://docs.pokt.network/reference/supported-chains#pokt-mainnet" pageName="POKT" />

### Tatum

[Tatum](https://docs.tatum.io/reference/rpc-celo) provides lightning-fast RPC nodes, data APIs, a powerful SDK, and a whole lot more.

#### Supported Networks

- Celo Mainnet

<PageRef url="https://tatum.io/chain/celo" pageName="Tatum" />

### Chainstack

[Chainstack](https://docs.chainstack.com/docs/celo-tooling) provides global load-balanced nodes for Celo. A free developer plan is available with an easy social login (e.g. GitHub). You can also top up your balance with crypto.

#### Supported Networks

- Celo Mainnet

<PageRef url="https://chainstack.com/build-better-with-celo/" pageName="Chainstack" />

### All That Node

[All that node](https://docs.allthatnode.com/reference/quickstart-celo) supports public and private RPC nodes. They offer free private RPC nodes up to 10,000 requests/day and you can upgrade your plan as needed.
You can also claim Alfajores funds from the faucet in the site without signing up.

#### Supported Networks

- Celo Mainnet
- Celo Sepolia (Testnet)

<PageRef url="https://www.allthatnode.com/celo.dsrv" pageName="All That Node" />

### Dwellir

Dwellir provides scalable RPC nodes to power Web3 developers with high-speed, affordable infrastructure.

#### Supported Networks

- Celo Mainnet

<PageRef url="https://www.dwellir.com/networks/celo" pageName="Dwellir" />

### OnFinality

[OnFinality](https://onfinality.io) provides the ultimate reliable RPC nodes endpoint that can power your app as it grows

#### Supported Networks

- Celo Mainnet

<PageRef url="https://onfinality.io/networks/celo" pageName="OnFinality" />
