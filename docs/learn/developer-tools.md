---
title: Celo Developer Tools
description: Overview of Celo tools and the value they provide to developers.
---
# Developer Tools

Overview of Celo tools and the value they provide to developers.

___

## SDKs

:::tip

Consider using [Dependabot](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/about-dependabot-version-updates) to help keep project dependencies up to date. The following developer tools are being actively developed and keeping your dependencies up-to-date will help your projects stay functional and secure.

:::

### ContractKit

ContractKit is a library to help developers and validators to interact with the Celo blockchain and is well suited to developers looking for an easy way to integrate Celo Smart Contracts within their applications.

Contractkit includes common functionality to make it easier to get started building

**What you can do?**

[ContractKit](../community/release-process/base-cli-contractkit-dappkit-utils) supports the following functionality:

* Connect to a node
* Access Web3 object to interact with node's JSON RPC API
* Send Transaction with Celo's extra fields: (feeCurrency, gatewayFeeRecipient, and gatewayFee)
* Simple interface to interact with CELO and cUSD
* Simple interface to interact with Celo Core contracts
* Local sign transactions
* Utilities
* Query on-chain identifier for a phone number

### Celo Ethers.js Wrapper

[Celo Ethers.js Wrapper](https://github.com/celo-tools/celo-ethers-wrapper) is a minimal wrapper to make [ethers.js](https://docs.ethers.io/v5/) compatible with the Celo network

### use-contractkit

[use-contractkit](https://github.com/celo-tools/use-contractkit) is [Web3Modal](https://web3modal.com/)-like experience that injects ContractKit into your web-based application. Supports a variety of different wallets, including but not limited to Valora, Ledger, Metamask (Celo compatible fork) and any WalletConnect compatible wallets

### Celo CLI

The [Command-Line Interface](../community/release-process/base-cli-contractkit-dappkit-utils) allows users to interact with the Celo Protocol smart contracts. 

It’s a command-line interface around the ContractKit. It allows you to interact with the Celo Protocol and smart contracts using command-line tools rather than writing JavaScript. It provides modules for interacting with modules on the ContractKit and is an excellent code reference when defining your own modules. Some common features you may want to consider are helping users participate in elections or in on-chain governance, voting for validators, or helping users interact with multi-sig contracts.

## WalletConnect

[WalletConnect](https://walletconnect.com/) is a standard across EVM compatible blockchains to connect wallets to dapps. It allows developers to build connections between wallets and dapps on the same desktop or mobile device, or between desktop dapps and mobile wallets.

## DAppKit

:::warning

While DAppKit is functional, it is no longer being actively maintained in favor of WalletConnect. If WalletConnect does not work for your use case, you can use deep links directly. You can read more about how Valora handles this [here](https://github.com/valora-inc/wallet/blob/main/packages/mobile/docs/deeplinks.md).

:::

[DAppKit](../developer-guide/dappkit) is a lightweight set of functions that allow mobile dApps to work with the Celo Wallet to sign transactions and access the user's account. This allows for a better user experience: DApps can focus on a great native experience without having to worry about key management. It also provides a simpler development experience, as no state or connection management is necessary. 

**DAppKit supports the following functionality:**

* Request permission to access account information and phone number from the Celo Wallet
* Request permission to sign the transaction(s) from the Celo Wallet
* Look up phone numbers using the Identity Protocol to find contacts using Celo.

DAppKit is currently built with React Native in mind, though the excellent[ Expo framework](https://expo.io/) is still highly recommended for developers building mobile and web dApps on Celo. Expo offers awesome features like incredibly easy setup, hot-reloading, and more. Currently, most of our tutorials and examples involve Expo, though we are working on creating additional documentation for other app frameworks. While DAppKit was designed for mobile apps in particular, since version 1.1.0-beta.1 it offers beta support for web dApps running in the browser of a mobile device. More details about this are included in the Usage section below.

## Celo Networks

### Mainnet

The production Celo network, [Mainnet](../getting-started/mainnet) was previously known as the Release Candidate 1 network. Deployed by the Celo community starting 4/22/20, the network is currently working towards enabling the Celo stability mechanism. Much of the activity is being driven by the validator organizations that are featured on the leaderboard of[ The Great Celo Stake Off](https://forum.celo.org/t/the-great-celo-stake-off-the-details/136).

* [Mainnet Validator Explorer](https://validators.celo.org/) - to view the current status of Validator elections
* [Mainnet Network Status](https://stats.celo.org/) - to check the current availability of the network
* [Mainnet Network Block Explorer](http://explorer.celo.org/) - explore the history of the blockchain and view transaction details

### Alfajores Testnet

The [Alfajores Testnet](../getting-started/alfajores-testnet) is a Celo test network for developers building on the Celo platform. You can use it to try out the[ Celo Wallet](https://celo.org/build/wallet) or the Celo CLI (by sending transfers to yourself or other users of the testnet). You can also assist in running the network by operating a full node on your machine (or on a cloud or hosting provider).

* [Alfajores Testnet Faucet](https://celo.org/build/faucet) - get testnet tokens to experiment with
* [Celo Wallet for Alfajores](https://celo.org/build/wallet) - download the Android wallet app for the testnet from the Play Store
* [Alfajores Network Status](https://alfajores-celostats.celo-testnet.org/) - to check the current availability of the testnet
* [Alfajores Testnet Block Explorer](https://alfajores-blockscout.celo-testnet.org/) - explore the history of the blockchain and view transaction details

### Baklava Testnet

The [Baklava Testnet](../getting-started/baklava-testnet) is focused on building operational experience and best practices for node operators.

It is designed for validators and testing protocol changes. You will most likely not develop on the Baklava testnet. If you have an idea for a project that uses more protocol features in terms of handling the community fund or uniquely handling epoch rewards, like block rewards or staking rewards, it might be useful to develop on Baklava. 

* [Baklava Faucet Request Form](https://forms.gle/JTYkMAJWTAUQp1sv9) - to request faucetted funds to become a Validator on the Baklava network.
* [Baklava Network Status](https://baklava-celostats.celo-testnet.org/) - to check the current availability of the testnet
* [Baklava Network Block Explorer](https://baklava-blockscout.celo-testnet.org/) - explore the history of the blockchain and view transaction details

### Hosted Node Service (Forno)

[Forno](../developer-guide/forno) is a cLabs hosted node service for interacting with the Celo network. This allows you to connect to the Celo Blockchain without having to run your own node.

Forno has HTTP and WebSocket endpoints that you can use to query current Celo data or post transactions that you would like to broadcast to the network. The service runs full nodes in non-archive mode, so you can query the current state of the blockchain, but cannot access the historic state.

Forno can be used as an HTTP Provider with ContractKit.

### Figment Datahub

[Figment datahub](https://figment.io/datahub/celo/) is a service similar to Forno. They have some additional features that allow you to track how people are using your application in terms of the type and number of requests coming through the endpoints. They have a free tier with the option to pay for the service to increase limits to support more popular projects.

### Quicknode

[Quicknode](https://www.quicknode.com/chains/celo) is an enterprise grade node service with a dashboard, metrics, security controls, customer support and no rate limits (pay-as-you-go).

## Celo Wallets

[Celo Wallets](../getting-started/wallets) are tools that create accounts, manage keys, and help users transact on the Celo network.

The Celo Wallet is an easy way to send, receive, and save Celo assets. This section describes what is going on under the hood during various aspects of the wallet experience.

It's important to be careful when choosing a wallet because they manage your secret account keys. You should only use reputable wallets that are well maintained by organizations/people that you trust.

The Celo Native Wallets section shows some popular wallets that were built specifically for the Celo network. They often include features that more general wallets do not, like paying for fees with cUSD. The Celo Compatible Wallets section has wallets that can work with Celo but were built for other networks (like Ethereum) or through company partnerships (like Pesabase).

## Smart Contracts

A smart contract is a deterministic program running on a blockchain. The terms of the agreement (the program) are written as lines of code. The code and the agreements contained therein exist across a distributed, decentralized blockchain network. The code controls the execution, and transactions are trackable and irreversible.

Celo includes both protocol contracts and application-specific contracts.

Smart contracts running on Celo are functionally (and often programatically) identitcal to [smart contracts running on Ethereum](https://ethereum.org/en/developers/docs/smart-contracts/#top).

### Protocol Contracts

Protocol contracts exist at the lowest layer and include functionality like the Celo election process and code that runs the Celo proof of stake system and on-chain governance.

### Application Contracts

Application contracts may or may not be built by cLabs. These contracts are custom-built by developers to support application functionality.

### Ethereum Contracts

[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) has a common token, governance, access control, utility contracts written in Solidity.

## Infrastructure

### BlockScout

[BlockScout](https://explorer.celo.org/) is a cLabs hosted GUI block explorer and [API endpoints](https://explorer.celo.org/api_docs). It allows you to look up information about the Celo blockchain including average block time, total transactions, and additional transaction details. You may also view details of your own custom smart contracts or existing DeFi contracts to view how value is moving between accounts and on-chain network events.

The [API endpoints](https://explorer.celo.org/api_docs) allow you programmatically fetch blockchain data such as account balances and transaction history, smart contract interactions and events (logs), and block and transaction-specific information.

### ODIS

- [ODIS](/developer-resources/contractkit/odis.md)
  - Oblivious decentralized identity service
  - Lightweight identity layer that makes it easy to send cryptocurrency to a phone number
- Blockscout block explorers

### The Graph

[The Graph](https://thegraph.com/) is an indexing protocol for querying networks like Celo, Ethereum and IPFS. Anyone can build and publish open APIs, called subgraphs, making data easily accessible. Many blockchain data querying tools like Dapplooker leverage the Graph. You can read more about how to use the Graph with Celo [here](blog/using-the-graph). 

### DappLooker

[DappLooker](https://dapplooker.com/integration/celo) allows you to easily analyze & visualize your Celo smart contracts & subgraph data in various formats and gather it into dashboards from multiple sources. Analyze your data with intuitive Visual SQL which writes queries for you. Share the story your data tells with your team or with your community. Share dashboard insights via URL wherever you need to make your organization truly data driven.

### Stats.celo.org

- [Stats.celo.org](http://stats.celo.org) allows you to check network activity and health.

### Ongoing projects

- [Wallets](../getting-started/wallets/index.md)
- [Community projects & Ecosystem](https://celohub.org/)
- [Grant recipients](https://celo.org/experience/grants/directory)

### Community

- Join our [Discord](https://chat.celo.org)
- [Discourse Forum](https://forum.celo.org/)
