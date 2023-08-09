---
title: Web2 to Web3 - The Anatomy of a dApp
description: Overview of the anatomy of a dApp and its architecture difference from a web2 app.
---

Overview of the anatomy of a dApp and its architecture difference from a web2 app.

---

## Introduction

_This article assumes you have experience writing front-ends for web apps (called web2 apps here) and want to gain an an understanding of the differences and commonalities when creating front-ends for web3 apps._

Web3 dApps expand on the front-end architectural systems of Web2 Applications. Concepts like SinglePageApp, State and UI Management, Data Fetching and Caching serve as the foundation of any Web3 dApp. Compared to Web2 Apps, even more computation is pushed to the client/browser as computing on the blockchain costs literal money while running your own traditional backend between the blockchain and frontend increases centralization and is not used by most web3 dApps.


Typical DApp Stack looks something like this:

![](/img/doc-images/general/web2-web3.svg)

## Web2 Foundation

**App Framework** — Something like Next.js, create-react-app. 

**UI Management**  — As in web2, React is the most popular, Vue also is used. 

**State Management** —- This is intricately tied to your UI Management Library. For the biggest dApps redux is popular.

## Web3 Specific

Just as in web2 where there is overlap and tie in between App Framework, UI and State Management, the web3 tools may blur boundaries especially between the Web3 Helper Libraries and Wallet Connection Manager categories.

The three categories below are not  industry terms. Nevertheless It can be helpful to understand them as groupings of functionality.  Lets look at these from bottom to top, where higher means a tool will require a specific lower tool.

### EVM Blockchain  Toolkit

Examples — [Web3.js](https://web3js.org/) or [Ethers.js](https://ethers.org/).

Web3.js has significant disadvantages on browsers due to its giant size and lack of modularity. New projects use ethers.js) These make the calls from your dapp to contracts you read and write to on the blockchain via JSON-RPC calls to a blockchain node.  These tools can run both in node.js and browsers.

### Web3 Helper Libraries (optional but helpful)

Examples — Wagmi, useDapp, etc.

These sit between **EVM** **Blockchain  Toolkit**  and **Wallet Connection Manager** , or are in some cases are used by or have the functionality of a **Wallet Connection Manager**. They help simplify the complexities interacting with smart contracts which has additional UX considerations compared to a http api call. For instance rather than just wait for call to be returned we must 1) wait for wallet to sign 2) wait for tx to be sent to node  3) wait for it to be included in a block.

### Wallet Connection Manager

Examples – Rainbowkit, web3modal, react-celo.

These are the interface between the user and the dApp via the user’s wallet. They will manage which chain the dapp is on and establish connection to the wallet where the user will sign the transaction data with their private key thus authenticating that opperation. Most wallets do this thru either the WalletConnect standard or, for browser extensions, by injecting code into `window` (such as metamask)

## Differences

### Authentication

Whereas web2 apps will use a user name and password or auth service like SignInWith(FANG) for authentication. In Web3 each write operation is authenticated by signing with the users wallet.   For the purposes of User experiences wallet-connection managers will display whatever wallet address they receive from the wallet as the “logged in” user. However unless address is verified to be owned by the user with a standard like [SignInWithEthereum](https://login.xyz/) it should NOT be trusted for showing anything that isn’t public info already. A good rule of thumb data from the blockchain is ok. If you have additional data for a user, authenticate before display.

### Off Browser

GraphQL (optional but common) — Originally a way of allow the client to specify which the data server would give it. GraphQL has been adopted by web3 for getting analytical type data via a tool called TheGraph. DApps make their own subgraph and index their smart contracts to show users info like change in Total Value Locked over time etc.  Note the connection from browser to GraphQL server will be read only.

Full Node The “server” that the frontend calls to interact with smart contracts on the chain. Most dApps use a [node as a service](/network/node/overview) although some also [run their own](/network/node/overview). Whereas Web2 dApps communicate with Restful JSON APIs over http and web-sockets, Dapp communication with the full node uses JSON RPC calls over http or web-sockets.
