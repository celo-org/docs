---
title: Celo Developer Tools
description: Overview of Celo tools and the value they provide to developers.
---

# Developer Tools

Overview of Celo tools and the value they provide to developers.

---

import PageRef from '@components/PageRef'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip

Consider using [Dependabot](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/about-dependabot-version-updates) to help keep project dependencies up to date. The following developer tools are being actively developed and keeping your dependencies up-to-date will help your projects stay functional and secure.

:::

## SDKs

### ContractKit

ContractKit is a library to help developers and validators to interact with the Celo blockchain and is well suited to developers looking for an easy way to integrate Celo Smart Contracts within their applications.

<PageRef url="/developer-guide/contractkit" pageName="ContractKit" />

### use-contractkit

[use-contractkit](https://github.com/celo-tools/use-contractkit) is [Web3Modal](https://web3modal.com/)-like experience that injects ContractKit into your web-based application. Supports a variety of different wallets, including but not limited to Valora, Ledger, Metamask (Celo compatible fork) and any WalletConnect compatible wallets

<PageRef url="/developer/react-celo" pageName="react-celo" />

### Ethers.JS Wrapper

A minimal wrapper to make Ethers.JS compatible with the Celo network.

<PageRef url="/developer/celo-ethers-wrapper" pageName="Celo Ethers Wrapper" />

### WalletConnect

WalletConnect is a standard across EVM compatible blockchains to connect wallets to dapps. It allows developers to build connections between wallets and dapps on the same desktop or mobile device, or between desktop dapps and mobile wallets.

<PageRef url="walletconnect" pageName="WalletConnect" />

### Celo CLI

The Command Line Interface allows users to interact with the Celo Protocol smart contracts.

<PageRef url="/cli" pageName="Celo CLI" />

### Celo SDK Reference Docs

You can find the reference documentation for all of the [Celo SDK packages](https://github.com/celo-org/celo-monorepo/tree/master/packages/sdk) found in the celo monorepo here. The SDK packages consist of:

- Base
- Connect
- ContractKit
- Explorer
- Governance
- Identity
- Keystores
- Network Utils
- Transactions Uri
- Utils
- Wallet-base
- Wallet-HSM
- Wallet-HSM-AWS
- Wallet-HSM-Azure
- Wallet-ledger
- Wallet-local
- Wallet-remote
- Wallet-rpc
- Wallet-walletconnect

<PageRef url="https://celo-sdk-docs.readthedocs.io/" pageName="Celo SDK Reference Docs" />

## Infrastructure

### BlockScout

[BlockScout](https://explorer.celo.org/) is a cLabs hosted GUI block explorer and [API endpoints](https://explorer.celo.org/api_docs). It allows you to look up information about the Celo blockchain including average block time, total transactions, and additional transaction details. You may also view details of your own custom smart contracts or existing DeFi contracts to view how value is moving between accounts and on-chain network events.

<PageRef url="https://explorer.celo.org/" pageName="BlockScout" />

### ODIS

[ODIS](/protocol/identity/odis) (Oblivious decentralized identity service) is a lightweight identity layer that makes it easy to send cryptocurrency to a phone number

<PageRef url="/protocol/identity/odis" pageName="ODIS" />

### The Graph

[The Graph](https://thegraph.com/) is an indexing protocol for querying networks like Celo, Ethereum and IPFS. Anyone can build and publish open APIs, called subgraphs, making data easily accessible. Many blockchain data querying tools like Dapplooker leverage the Graph. You can read more about how to use the Graph with Celo [here](/blog/using-the-graph).

<PageRef url="/https://thegraph.com/" pageName="The Graph" />

### DappLooker

[DappLooker](https://dapplooker.com/integration/celo) allows you to easily analyze & visualize your Celo smart contracts & subgraph data in various formats and gather it into dashboards from multiple sources. Analyze your data with intuitive Visual SQL which writes queries for you. Share the story your data tells with your team or with your community. Share dashboard insights via URL wherever you need to make your organization truly data driven.

<PageRef url="https://dapplooker.com/integration/celo" pageName="DappLooker" />

### Stats.celo.org

[Stats.celo.org](http://stats.celo.org) allows you to check network activity and health.

<PageRef url="http://stats.celo.org" pageName="stats.celo.org" />

## Hosted Nodes

RPC Endpoint Services

### Forno

[Forno](/network/node/forno) is a cLabs hosted node service for interacting with the Celo network. This allows you to connect to the Celo Blockchain without having to run your own node.

Forno has HTTP and WebSocket endpoints that you can use to query current Celo data or post transactions that you would like to broadcast to the network. The service runs full nodes in non-archive mode, so you can query the current state of the blockchain, but cannot access the historic state.

Forno can be used as an HTTP Provider with ContractKit.

<PageRef url="/network/node/forno" pageName="Forno" />

### Ankr

Featuring open access to a Public RPC API layer, Ankr Protocol provides reliable, load balanced access to node clusters from anywhere in the world.

<PageRef url="https://www.ankr.com/protocol/public/celo/" pageName="Ankr" />

### Figment Datahub

[Figment datahub](https://figment.io/datahub/celo/) is a service similar to Forno. They have some additional features that allow you to track how people are using your application in terms of the type and number of requests coming through the endpoints. They have a free tier with the option to pay for the service to increase limits to support more popular projects.

<PageRef url="https://figment.io/datahub/celo/" pageName="Figment Datahub" />

### Quicknode

[Quicknode](https://www.quicknode.com/chains/celo) is an enterprise grade node service with a dashboard, metrics, security controls, customer support and no rate limits (pay-as-you-go).

<PageRef url="https://www.quicknode.com/chains/celo" pageName="Quicknode" />

### All That Node

All That Node supports public and private RPC nodes for mainnet, alfajores and baklava networks. They offer free private RPC nodes up to 10,000 requests/day and you can upgrade your plan as neeeded. You can also claim alfajores funds from the faucet in the site without signing up or any time-consuming auth.

<PageRef url="https://www.allthatnode.com/celo.dsrv" pageName="All That Node" />

## Celo Wallets

[Celo Wallets](/wallet/) are tools that create accounts, manage keys, and help users transact on the Celo network.

<PageRef url="/wallet/" pageName="Celo Wallets" />
