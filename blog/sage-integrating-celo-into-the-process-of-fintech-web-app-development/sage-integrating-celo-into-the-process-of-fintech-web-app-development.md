---
title: Integrating Celo into the Process of Web/App Development
description: The article will focus on the Celo framework that provides users with a seamless online payment method.
authors:
  - name: Oluwatobiloba Olajide
    title: Technical Writer @Celo Foundation
    url: https://github.com/TheKhafre
    image_url: https://avatars.githubusercontent.com/u/105213608?v=4
tags: [celo, celosage, javascript, nodejs, contractkit, intermediate]
hide_table_of_contents: true
slug: /tutorials/integrating-celo-into-the-process-of-fintech-web-app-development
---

![header](../../src/data-tutorials/showcase/intermediate/sage-integrating-celo-into-the-process-of-fintech-web-app-development.png)

## Introduction

Celo is an open-source platform that allows developers to build decentralized applications (aka dApps) on top of its blockchain. It uses a novel approach to [proof-of-stake](https://www.investopedia.com/terms/p/proof-stake-pos.asp) consensus and focuses on creating a mobile-first, user-friendly experience. As a result, Celo is a great choice for FinTech developers who want to build secure, scalable, and user-friendly decentralized financial applications. In this article, we'll explore how to integrate Celo into FinTech web/app development.

## Prerequisites

This tutorial aims to take FinTech web/app developers a step into the process of building FinTech products that adopt the Celo framework, which is scalable, secure, and mobile-first. Hence, to get the most out of this tutorial, you need to have at least a basic understanding of the following:

- **Familiarity with web and app development**: You should understand web and app development, including HTML, CSS, and JavaScript. Familiarity with front-end frameworks such as [React](https://react.dev/) and [Angular](https://angular.io/) will also be helpful.
- **Knowledge of blockchain technology:** You should have a basic understanding of blockchain and its workings. This includes understanding decentralized networks, [smart contracts](https://www.ibm.com/topics/smart-contracts), and [digital assets](https://www.investopedia.com/terms/d/digital-asset-framework.asp).
- **Command-line interface:** It is important to be familiar with the command line to install packages.

## Requirements

In this article, we will be using a chrome browser and a code editor. The most popular code editor is VS code - if you were using another code editor but would like to download VS code, you can do so [here](https://code.visualstudio.com/). Also, you will need to install the Celo wallet as an extension on the chrome browser you will be using. You can check this video on [how to set up the Celo wallet on chrome](https://www.youtube.com/watch?v=KD_0kKxtl8c).

## Getting Started

## Understanding Celo's Architecture

Celo uses a hybrid consensus algorithm that combines [proof-of-stake](https://www.investopedia.com/terms/p/proof-stake-pos.asp) (PoS) with a novel mechanism called the "identity protocol." The identity protocol ensures that each user on the network has a unique identity, which is tied to a mobile phone number or other unique identifier. This unique identity is used to prevent double-spending and other attacks.

Celo also has a built-in stablecoin called Celo Dollars (cUSD). The cUSD is pegged to the US dollar, which sees to its stability offering less volatility as the other cryptocurrencies and can be used for payments and remittances. To use cUSD, users must first purchase CELO, Celo's native cryptocurrency, and stake it to become a validator or delegate on the network.

## Ways to Integrate Celo into FinTech Development

Now that we have an understanding of the Celo architecture, here are some ways we can integrate Celo into the process of a FinTech web/app development:

- **Accepting Celo as a payment method:** FinTech applications and websites can offer their customers a fast, secure, and low-cost way to make transactions by integrating Celo as a payment method. We can achieve this by using Celo’s mobile wallet, which enables users to send and receive payment using their mobile phones easily.
- **Creating Celo-based financial products:** Celo’s blockchain platform allows for creating programmable financial products such as loans, insurance, and savings accounts. FinTech developers can leverage this capability to build innovative financial products that leverage the security and transparency of the blockchain.
- **Leveraging Celo’s smart contract platform:** Celo’s smart contract platform allows for creation of decentralized applications (aka dApps) that can automate financial processes that offer fast and low-cost financial services.

These are just a few of the many possibilities the Celo blockchain offers. However, in this article, we will build a simple FinTech app that allows users to send and receive cUSD (the Celo stablecoin pegged to the USD).

## Setting up the Development Environment

To start building on Celo, you'll need to set up a development environment. Celo supports several programming languages, including JavaScript, TypeScript, and Solidity. For this article, we'll use JavaScript and the Celo SDK (i.e. Celo Software Development Kit).

You'll need to install [Node.js](https://nodejs.org), [NPM](https://www.npmjs.com/), and the [Celo CLI](https://docs.celo.org/cli) To set up your development environment. Once you've installed these dependencies, you can create a new Celo project by running the following command on the command line:

    celocli init my-project

This will create a new Celo project in the `my-project` directory, as stipulated in the command. Feel free to call it whatever name you desire for the project.

## Building a Simple Payment App

Now that we have our development environment set up, let's build a simple payment app that allows users to send and receive cUSD. We'll use the Celo SDK's ContractKit and WalletUtils modules to do this.

First, we'll need to create a new Celo wallet for our app. After initialization, we need to create a new file called celoWallet.js which will contain the code for creating our wallet. copy the code below into the new file you just created.

```js
const { ContractKit } = require("@celo/contractkit");
const { newAccount } = require("@celo/account");
async function createWallet() {
  const kit = ContractKit.newKit("https://alfajores-forno.celo-testnet.org");
  const account = await newAccount();
  return { kit, account };
}
createWallet().then(({ kit, account }) => {
  console.log(`Public Address: ${account.address}`);
  console.log(`Private Key: ${account.privateKey}`);
});
```

Next, we'll need to deploy a smart contract that allows users to send and receive cUSD. We'll use the Celo Contract library and the Celo Reserve contract kits for this, let's create another new file which we will call celoPayment.js. The code below will help you deploy your smart contract, so go ahead and copy the code into the celoPayment.js file.

```js
const { ContractKit } = require("@celo/contractkit");
async function deployContract(kit, account) {
  const reserve = await kit.contracts.getReserve();
  const tx = reserve.methods.setReserveFraction(10, 1000);
  const gas = await tx.estimateGas({ from: account.address });
  const txo = await kit.sendTransactionObject(tx, {
    from: account.address,
    gasPrice: await kit.getGasPrice(),
  });
  const receipt = await txo.waitReceipt();
  console.log(`Contract deployed at: ${receipt.contractAddress}`);
  return receipt.contractAddress;
}
const kit = ContractKit.newKit("https://forno.celo.org");
const account = kit.web3.eth.accounts.create();
const contractAddress = await deployContract(kit, account);
```

This code deploys the reserve contract and logs its address to the console. The `setReserveFraction` method sets the reserve ratio to 1%, which means that for every 100 cUSD in circulation, 1 cUSD is held in reserve.

Now that we have our contract deployed, let's build a simple frontend that allows users to send and receive cUSD. For this, we'll use the `@celo/dappkit` and the `@celo/contractkit` library. The `@celo/contractkit` is a library that provides a simple way to interact with smart contracts on the Celo blockchain. It allows developers to interact with contracts using a more user-friendly API. In the code, we will use `newKitFromWeb3` to create an instance of `ContractKit` which is then used to send the transaction.

The other library (`@celo/dappkit`) is a library that helps to simplify the process of signing and sending transactions on the Celo blockchain. In the code below, we will be using the `newDappKit` to create a new instance of the DappKit object which is then used to send the transaction object to be signed and sent to the Celo network. So, go ahead and create another file which we will call celoSimplePaymentdApp.js to put our code.

```js
const { ContractKit } = require("@celo/contractkit");
const { newKitFromWeb3 } = require("@celo/contractkit");
const { newDappKit, DappKitResponseStatus } = require("@celo/dappkit");
const Web3 = require("web3");
async function sendPayment() {
  const kit = newKitFromWeb3(new Web3(window.celo));
  const from = kit.defaultAccount;
  const to = "0x...";
  const value = "10";

  // Create a transaction object
  const txObject = await kit.web3.eth.sendTransaction({
    from,
    to,
    value: kit.web3.utils.toWei(value, "ether"),
  });
  // Send the transaction using DappKit
  const requestId = await newDappKit(window.celo).sendTransactionAsync({
    txObject,
    origin: window.location.origin,
  });
  // Wait for a response from DappKit indicating that the transaction was successful
  const dappkitResponse = await new Promise((resolve) =>
    window.parent.addEventListener("message", (e) => {
      if (e.data && e.data.type === DappKitResponseStatus.Success) {
        resolve(e.data.response);
      }
    })
  );
  console.log(`Transaction sent: ${dappkitResponse.transactionHash}`);
}
```

The code is designed to send a payment transaction on the Celo blockchain using the `@celo/contractkit` and `@celo/dappkit` packages. The user's Celo wallet is connected to the browser window using the `window.celo` object, and the default account is obtained from the ContractKit instance.

The `sendPayment()` function creates a transaction object using the user's account, recipient address, and payment amount (in wei), and sends it to the blockchain using DappKit. DappKit is a tool for building mobile dapps that provides an easy way to sign transactions without requiring users to input private keys manually.

Once the transaction has been sent, DappKit waits for a response indicating its success. If the response indicates success, then a message is logged to the console with the transaction hash. If you have followed the steps, then by now you should have these three files already.

![the dapp modules](https://user-images.githubusercontent.com/105213608/231084534-9489d306-b81b-4ff8-bb2e-e18964aba43a.png)

Please note that you can decide to put all the codes in one file and place each code block in a separate function or define them as separate modules which you can export as needed. However, I would suggest you keep in separate for ease of reusability when next you need any of the modules.

## Step 4: Testing and Deployment

Now that we have our payment app built, it's time to test it and deploy it to production. However, here are some points you need to check to avoid deployment errors:

1. Ensure you have installed the latest versions of the `@celo/contractkit` and `@celo/dappkit` packages. You can check for updates by running `npm outdated` in your project directory.
2. Ensure you have a valid Celo wallet connected to your browser window. The `window.celo` object is used to connect to the wallet, so the code will fail if it's not defined or doesn't contain a valid provider URL.
3. Make sure that you have set up your DappKit configuration correctly. You need to pass in an `origin` parameter when calling `newDappKit`, which should be set to the URL of your website or application.

Celo provides several [testnets](https://docs.celo.org/developer/setup/wallet) and [mainnets](https://docs.celo.org/network/mainnet) you can use to test your app. To deploy to production, you'll need to purchase CELO and stake it to become a validator or delegate on the network.

## Conclusion

Integrating Celo into FinTech web/app development offers numerous benefits to developers and users. Celo's blockchain technology provides a decentralized, secure, and fast payment system that anyone can access, making it an ideal platform for creating payment apps. Following the outlined steps, developers can create simple payment apps that allow users to send and receive Celo easily and securely.

## Next Steps

You can read more application method for Celo FinTech projects by getting familiar with [Celo's developer resources](https://celo.org/developers), including the [Celo Developer Documentation](https://docs.celo.org/), and the [Celo's GitHub repository](https://github.com/celo-org). You can also connect with other developers on the [Celo Discord community](https://discord.com/channels/600834479145353243).

## About the Author

‘Tobi Olajide is an enthusiastic writer interested in blockchain technology and has been writing about it for over 3years. He is also a software engineer with over 2years of experience. Connect with him on [Github](http://github.com/TheKhafre).

## References

- [How to set up the Celo wallet on chrome](https://www.youtube.com/watch?v=KD_0kKxtl8c)
- [Understanding Node.js](https://www.w3schools.com/nodejs/nodejs_intro.asp)
- [how to use DappKit to send transactions on Celo](https://docs.celo.org/developer/dappkit/usage)
- [Celo's GitHub repository](https://github.com/celo-org)
- [Source code repo](https://github.com/TheKhafre/celo_fintech)
