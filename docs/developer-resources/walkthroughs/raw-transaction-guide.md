---
title: Create Raw Transaction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a Raw Transaction on Celo

Create a raw transaction using Ethereum based tooling to create, sign, and broadcast a transaction to the Celo network.

---

In this tutorial, you will use **ethereumjs-tx** to configure parameters and create a raw transaction. You’ll sign the transaction with the sending account private key and broadcast it to the network using web3. In addition, you will learn to process the entire transaction life-cycle (network connection, txData, sing with the private key, broadcast to the network).

#### **This tutorial covers the following topics:**

* Step 1: Ethereumjs Dependency Configuration	
* Step 2: web3 Dependency Configuration	
* Step 3: Celo Network Configuration	
* Step 4: Create Transaction and Pass to Testnet	
* Step 5: Configure, Sign, and Serialize, and Validate Transaction	
* Step 6: Broadcast Transaction to the Network	

:::tip

**Ethereumjs-tx** is currently deprecated but is still used for many important applications. This example is meant to prove the use-case of Ethereum tooling compatibility.

:::

:::info

You can [join us on Discord](https://discord.com/invite/6yWMkgM) if you have questions or want help completing the tutorial.

:::


## Getting Started

The code for this tutorial is on the [Celo Developer Relations GitHub](https://github.com/celo-org/DevRel) and all code can be found [here](https://github.com/celo-org/DevRel/tree/main/education/05-code-by-example/wallet/raw-transaction).

#### **Clone the repository**

```
git clone https://github.com/celo-org/DevRel.git
```

#### **Change into the Raw Transaction directory**

```
cd DevRel/education/05-code-by-example/wallet/raw-transaction
```

Open this folder in your code editor to view the following files.

* [README](https://github.com/celo-org/DevRel/blob/main/education/05-code-by-example/wallet/raw-transaction/README.md) - General overview of the code to help you get started with raw transactions
* [raw-transaction-challenge.js](https://github.com/celo-org/DevRel/blob/main/education/05-code-by-example/wallet/raw-transaction/raw-transaction-challenge.js) - Includes challenges without solutions to help complete the tutorial
* [raw-transaction-complete.js](https://github.com/celo-org/DevRel/blob/main/education/05-code-by-example/wallet/raw-transaction/raw-transaction-complete.js) - Includes final code with all completed challenges

Open **raw-transaction-challenge.js** to begin the tutorial.

:::tip

Run node `raw-transaction-challenge.js` or `node raw-transaction-complete.js` to run these files as you complete the tutorial.

:::

## Step 1: Ethereumjs Dependency Configuration

The [EthereumJS](https://github.com/ethereumjs/) community builds Javascript tools implementing core [Ethereum](https://ethereum.org/) technologies, protocols, and APIs for helping developers to interact with the Ethereum network and build their own applications.

Since Celo has shared ancestry with Ethereum, you can use these same tools to interact with Celo. This tutorial uses the following **ethereumjs** packages.

* [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx) - Implements schema and functions related to Ethereum's transaction.
* [ethereumjs-common](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/common)  - Resources common to all EthereumJS implementations.
* [ethereumjs-util](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/util) - A collection of utility functions for Ethereum.

### Challenge

Configure ethereumjs dependencies by requiring the packages as defined by the comments.

<Tabs defaultValue="Problem">

<TabItem value="Problem" label="Problem">

```jsx live
const createRawTransaction = // <<< Require Transaction from ethereumjs-tx >>>
const Common = // <<< Require default from ethereumjs-common >>>
const buffToHex = // <<< Require bufferToHex from ethereumjs-util >>>
const privToAddress = // <<< Require privateToAddress from ethereumjs-util >>>
```

</TabItem>
<TabItem value="Solution" label="Solution">

``` jsx live
const createRawTransaction = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common').default;
const buffToHex = require('ethereumjs-util').bufferToHex;
const privToAddress = require('ethereumjs-util').privateToAddress;
```

</TabItem>

</Tabs>

## Step 2: web3 Dependency Configuration

[web3.js](https://github.com/ChainSafe/web3.js/tree/v1.2.11) is a collection of libraries that allow you to interact with a local or remote Ethereum node using HTTP, IPC, or WebSocket. These tools can also be used on the Celo network to interact with a local or remote Celo node (this tutorial will use the Alfajores test network).

* [web3](https://github.com/ChainSafe/web3.js/tree/v1.2.11) - Ethereum [JavaScript API](http://web3js.readthedocs.io/) which connects to the [Generic JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) spec.
* [Alfajores](https://docs.celo.org/getting-started/alfajores-testnet) - Celo test network for developers building on the Celo platform. 

### Challenge

Configure web3 dependencies by requiring the packages as defined by the comments. The endpoint for the Alfajores testnet is [https://alfajores-forno.celo-testnet.org](https://alfajores-forno.celo-testnet.org).

<Tabs defaultValue="Problem">

<TabItem value="Problem" label="Problem">

```jsx live
const Web3 = // <<< Require web3 >>>
const web3 = // <<< Connect web3 to the Alfajores testnet >>>
```

</TabItem>
<TabItem value="Solution" label="Solution">

```jsx live
const Web3 = require('web3');
const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
```

</TabItem>

</Tabs>

## Step 3: Celo Network Configuration 

You’re ready to configure your connection to the Celo testnet. This is done using the **Alfajores** network configuration utilizing the **forCustomChain** package.

* [Common.forCustomChain](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/common#activate-with-a-single-custom-chain-setup) - Used to set up your custom chain configuration 
* [Alfajores Network Configuration](https://docs.celo.org/getting-started/wallets/using-metamask-with-celo/manual-setup#adding-a-celo-network-to-metamask) - Find configuration details for Alfajores here

### Challenge

Configure the Celo testnet using the Alfajores network configuration details.

<Tabs defaultValue="Problem">

<TabItem value="Problem" label="Problem">

``` jsx live
// Configure Celo network using forCustomChain method from ethereum.js.
const celoTestnet = Common.forCustomChain(
      'mainnet',
      {
        name: // <<< Add Network Name >>>
        networkId: null,
        chainId: // <<< Add Chain ID >>>
        url: // <<< Add RPC URL >>>
        comment: 'Celo Alfajores Testnet Chain'
      },
      'istanbul',
    )
```

</TabItem>
<TabItem value="Solution" label="Solution">

``` jsx live
// Configure Celo network using forCustomChain method from ethereum.js.
const celoTestnet = Common.forCustomChain(
      'mainnet',
      {
        name: 'Celo (Alfajores Testnet)',
        networkId: null,
        chainId: 44787,
        url: 'https://alfajores-forno.celo-testnet.org',
        comment: 'Celo Alfajores Testnet Chain'
      },
      'istanbul',
    )
```

</TabItem>

</Tabs>

---

## Step 4: Create Transaction and Pass to Testnet

Now that you’ve configured your connection to the Alfajores testnet, you can [create a transaction and send it](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx#sending-a-transaction) to the network.  Pending and validated transactions can be found on the [Alfajores Testnet BlockScout](https://alfajores-blockscout.celo-testnet.org/txs)**.**

This tutorial makes use of the following parameters to create a transaction.

* **nonce** - Each wallet has a nonce, the nonce represents the transaction count for the wallet.
* **gasPrice** - Amount of Ether you’re willing to pay for every unit of gas
* **gasLimit** - Maximum amount of gas you’re willing to spend on a transaction.
* **to** - Used to transfer value. Not needed if deploying a smart contract to the network
* **value** - Value in celo
* **data** - Utilize for deploying smart contracts

### Challenge

Create a transaction using the following parameters and pass it to the Alfajores Testnet.

<Tabs defaultValue="Problem">

<TabItem value="Problem" label="Problem">

``` jsx live
const txData =  {
   nonce: // <<< Set nonce to 0x5 >>>
   gasPrice: // <<< Use web3 utilities to convert 500000000 gwei toHex >>>
   gasLimit: // <<< Use web3 utilities to convert 20000000 gwei toHex >>>
   to: // <<< Add a wallet address to send value to >>>
   value: // <<< Convert the value of 100000000 toWei and convert this value toHex >>>
   data: null // Utilized for deploying smart contracts 
 }

tx = // <<< Use createRawTransaction to pass celoTestnet object whenever a transaction is created >>>
```

</TabItem>
<TabItem value="Solution" label="Solution">

``` jsx live
const txData =  {
   nonce: '0x5',
   gasPrice: web3.utils.toHex('500000000'), 
   gasLimit: web3.utils.toHex('20000000'),
   to: '0xfBBF296f06E455F5b636Cd57371056Df21470c1e',
   value: web3.utils.toHex(web3.utils.toWei('100000000', 'gwei')), 
   data: null // Utilized for deploying smart contracts
 }

tx = new createRawTransaction(txData,{common: celoTestnet });
```

</TabItem>

</Tabs>


:::tip

Feeling stuck? Explore the following resources for additional support.

* [Sending a transaction](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx#sending-a-transaction)
* [web3.utils.toHex](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html?highlight=toHex#tohex)
* [web3.utils.toWei](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html?highlight=toWei#towei)

:::tip

---

## Step 5: Configure, Sign, and Serialize, and Validate Transaction

Transactions need to be configured, signed, serialized, and validated using a private key before broadcasting them to the network. This ensures that only the owner of the private key has access to send funds from a wallet.

### Challenge

Configure, sign, and serialize your transaction using your private key to broadcast it to the network.

<Tabs defaultValue="Problem">

<TabItem value="Problem" label="Problem">

```jsx live
// Configure private key for signature signing of transaction
const privateKey = new Buffer.from(
 // <<< Add private key here >>>
 'hex',
)

// Sign transaction 
// <<< Sign transaction here >>>

// Serialize transaction for broadcast to network
// <<< Serialize and broadcast transaction here >>>

if (
 tx.validate() &&
 // Compare sender address to privatekey default address 
 // <<< Compare addresses here >>>
 )
){

 // Console log valid signature, serialized transaction, and sender wallet address
 console.log('Transaction has a valid signature')
 console.log('Serialized Tx:\n',serializedTx.toString('hex'));
 console.log('Sender Wallet Address:', buffToHex(privToAddress(privateKey)));
```

</TabItem>
<TabItem value="Solution" label="Solution">

```jsx live
// Configure private key for signature signing of transaction
const privateKey = new Buffer.from(
 '12b01fe7d10929a13a008e88fb1c87d2f6feb876326b3bd9074582a781f05674',
 'hex',
)

// Sign transaction
tx.sign(privateKey)

// Serialize transaction for broadcast to network
const serializedTx = tx.serialize()

if (
 tx.validate() &&
 // Compare sender address to privatekey default address
 buffToHex(tx.getSenderAddress()) === buffToHex(privToAddress(privateKey)
 )
){

 // Console log valid signature, serialized transaction, and sender wallet address
 console.log('Transaction has a valid signature')
 console.log('Serialized Tx:\n',serializedTx.toString('hex'));
 console.log('Sender Wallet Address:', buffToHex(privToAddress(privateKey)));
```

</TabItem>

</Tabs>

:::info

Look back at the required packages and the const values you have developed so far. They will be useful while [signing and serializing your transaction](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx#legacy-transactions).

:::


:::tip
Feeling stuck? Explore the following resources for additional support.

* [Sending a transaction](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/tx#sending-a-transaction)
* [Node.js Buffer.from()](https://www.w3schools.com/nodejs/met_buffer_from.asp)

:::

:::warning

Never place your private key in your actual code. The example above is used for demonstration purposes only. Use a spare wallet when testing and transfer funds to a new wallet anytime your private key is exposed.

:::


---

## Step 6: Broadcast Transaction to the Network

Now that you’ve prepared your transaction, the final step is to broadcast this transaction to the network. After broadcasting the transaction, you will be able to view it on the [Alfajores Test Network BlockScout](https://alfajores-blockscout.celo-testnet.org/txs) along with the other transactions on the network.

### Challenge

Broadcast the transaction to the network using web3.

<Tabs defaultValue="Problem">

<TabItem value="Problem" label="Problem">

``` jsx live
// << Broadcast transaction here >>

// Console log on error
{
     if (!err) {
       console.log('Transaction Hash:\n',hash);
       console.log('View Tx with Block Explorer:\n', '\nhttps://alfajores-blockscout.celo-testnet.org/search?q='+hash)
     } else {
       console.log('broadcast to network failed:\n', err);
     }
   })
} else {
 console.log('Invalid signature')
}
```

</TabItem>
<TabItem value="Solution" label="Solution">

```jsx live
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) 

// Console log on error
{
     if (!err) {
       console.log('Transaction Hash:\n',hash);
       console.log('View Tx with Block Explorer:\n', '\nhttps://alfajores-blockscout.celo-testnet.org/search?q='+hash)
     } else {
       console.log('broadcast to network failed:\n', err);
     }
   })
} else {
 console.log('Invalid signature')
}
```

</TabItem>

</Tabs>

:::tip

Feeling stuck? Explore the following resources for additional support.

* [web3.eth.sendSignedTransaction](https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#sendsignedtransaction)

:::

---

## Congratulations

Congratulations, you have successfully created a raw transaction using Ethereum based tooling to create, sign, and broadcast a transaction to the Celo network. You used **ethereumjs-tx** to configure parameters and create a raw transaction. Finally, you signed the transaction with the sending account private key and broadcast it to the network using web3.

As a Celo developer, you’re not limited to one specific tool. Celo has tremendous flexibility associated with most EVM tooling along with Celo-specific tooling like contract-kit, dapp-kit, CeloCLI, and more.
