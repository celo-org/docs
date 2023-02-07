---
title: React Native & Celo - Easily build React Native dApps on Celo
description: Quickly develop Android and iOS apps on Celo using the Celo Composer for React Native.
authors:
  - name: ✍️ Harpal Jadeja
tags: [react native, composer]
hide_table_of_contents: false
slug: /tutorials/React-Native-&-Celo-Easily-build-React-Native-dApps-on-Celo
---

# React Native & Celo - Easily build React Native dApps on Celo

## Quickly develop Android and iOS apps on Celo using the Celo Composer for React Native.

![header](../src/data-tutorials/showcase/intermediate/easily-build-react-native-dapps-on-celo.png)

[**Celo Composer**](https://github.com/celo-org/celo-composer) is a set of templates created by Celo to reduce time-to-first-output for developers building dApps in the Celo Ecosystem. The objective is to improve the developer experience. The template is set up to work right out of the box, but also make customization as easy as possible.

In this article, you will go through the React Native version of the template. You will learn how to interact with smart contracts deployed on Celo blockchain using a react native dApp. If you plan to build or are already building mobile dApps on Celo 😁 consider reading till the end.

Here’s a list of things will we cover 🗒

- ✅ [Prerequisites](#prerequisites)
- ✅ [Setting up the project](#setting-up-the-project)
- ✅ [Deploying smart contracts](#deploying-smart-contracts)
- ✅ [Downloading testnet Valora](#downloading-testnet-valora)
- ✅ [Funding Valora with testnet coins](#funding-wallet-with-testnet-coins)
- ✅ [Exploring the Mobile dApp](#exploring-the-mobile-dapp)
- ✅ [Customizing the dApp](#customizing-the-dapp)

---

### Prerequisites

Before we get started you will need some packages and dependencies to be installed beforehand, here is a list of them.

- Node v12+
- Yarn / NPM
- Python (node-gyp requires this)
- windows-build-tools (only for windows)

Once you have the dependencies installed, it’s time we start setting up the template.

---

### Setting up the project

![celo-composer-on-github](https://user-images.githubusercontent.com/38040789/195801629-9908b213-e3f2-42cc-91a3-e83ce6a33905.png)

- Access the repo [here](https://github.com/celo-org/celo-composer).
- Click the Use this template button to get it into your GitHub profile.

Once done, clone the repo to work on it on your local machine.

![forking-repo](https://user-images.githubusercontent.com/38040789/195801740-93e63ef8-91ed-4985-9f5a-c2624e23cdd5.png)

Once cloned we need to install `expo` and `expo-cli` globally since we are using Expo to build our app. Open up a terminal and use the below command or `yarn global expo expo-cli` to globally install `expo` and `expo-cli`.

```bash
npm i -g expo expo-cli
```

It’s time we install the package dependencies. In your terminal, navigate to `<your_repo_name>/packages/react-native-app` and use the below command in your terminal.

```bash
yarn install --ignore-engines
```

At this point, you are all set to start running the app on your local server use the command below.

```bash
expo start
```

Once the command is executed, you will see a QR code in the terminal like so.

![qr-code-in-terminal](https://user-images.githubusercontent.com/38040789/195801806-0ef2f902-4ef1-4b1e-93bd-b4006d7e8c0c.png)

Thanks to Expo, there are various ways you can access your app.

![expo-command-line-options](https://user-images.githubusercontent.com/38040789/195801874-d96e4661-ec1c-4396-a76b-ac1202f46d9f.png)

If you want to use Android Studio type A on the keyboard and it will start the Android Studio.

> Note:- If you want to access using Android Studio make sure you have a Virtual Device with play store support.

If you press **W** it will open it in your web browser. In this tutorial, you are going to access the app using a mobile device. Because that’s how the user of your app will access it right?

In order to do so, we need to install the **Expo Go App** on our device of choice. Before we start using the app, we also need to deploy the smart contracts that we plan to interact with, so let’s do that now.

---

### Deploying Smart Contracts

Smart contracts are like the backend to your dApp. Most of the logic resides in smart contracts. We are going to deploy contracts to the Alfajores testnet since I don’t expect you to use real funds in order to follow this tutorial.

You can see that in the file `hardhat.config.json` which is in the folder `/packages/hardhat`

![hardhat.config.json](https://user-images.githubusercontent.com/38040789/195801935-8a7eb342-d737-4e23-9b73-e021ddd183ec.png)

Before we deploy our contracts let us see which account we are going to use to deploy the contracts. You can use the below command in your terminal to do so. Make sure you are in the `/packages/hardhat` folder.

```bash
npx hardhat accounts
```

You can add your own account if you want. Let’s deploy the smart contracts using the below command in your terminal.

```bash
npx hardhat deploy --network alfajores
```

We specify the network we want to deploy to in the command.

![terminal-output-for-smart-contract-deployment](https://user-images.githubusercontent.com/38040789/195801995-e960aa1c-de92-407c-9a27-37069f6213ab.png)

You can see the transaction hash of the transaction and the address where the contract lives on the Alfajores chain.

![file-structure](https://user-images.githubusercontent.com/38040789/195802049-729fb817-ae24-4fc4-ac55-a80ce389a926.png)

When you want to deploy fresh contracts you will need to delete the respective network folder.

You don’t need to worry about copying the contract addresses into the react-native-app project because we have wired it up in such a way that we pick up the address from the JSON files. 😃

Just to recap we are done with the following

🔳 Project Setup

🔳 App server On

🔳 Smart Contracts deployed

🔲 Get a Celo wallet (Valora for this tutorial)

🔲 Get some testnet funds.

🔲 Download the Expo Go App on your mobile device of choice

To interact with smart contracts on the blockchain we need a wallet specifically the Celo wallet in this case. For this tutorial, you will use the Valora wallet which is the preferred Celo wallet however you are free to use other wallets like Metamask but you won’t be able to use stablecoins as gas fees.

---

### Downloading Testnet Valora

In this post, you’ll use the Alfajores testnet with the Valora app. This allows you to create dApps using test funds which allows you to avoid spending real money during development.

- Download Celo Alfajores Wallet from the Play Store or App Store.

![celo-testnet-wallet-play-store](https://user-images.githubusercontent.com/38040789/195802138-cd12afe9-7cf3-460a-998c-e40d7136b132.png)

Once downloaded Create New Account (recommended) you can also recover if you have a test account on Testnet.

![valora-create-account-screen](https://user-images.githubusercontent.com/38040789/195802196-a46a9344-6a44-48ff-8c49-7e4b229e41e9.png)

Next, set up your account.

![valora-onboarding](https://user-images.githubusercontent.com/38040789/195802249-90f730fc-51be-4c71-9b9f-bd5a5a256345.png)

If you created a new account your balance will be zero and we need to have some funds to start interacting with the contracts deployed on the testnet.

![valora-balance-screen](https://user-images.githubusercontent.com/38040789/195802349-fa659d25-6437-4f03-a1de-f8108aabb23c.png)

You can now get some funds from Celo Faucet so that we can interact with the deployed smart contracts. Even though you are using the app eventually you end up interacting with the smart contracts directly, the app is just an interface for user-friendliness.

---

### Funding wallet with testnet coins

Copy your address.

![valora-wallet-address](https://user-images.githubusercontent.com/38040789/195802458-f76995ec-99c2-4312-84a6-ddf5c60516b3.png)

In the browser go to — https://faucet.celo.org

![funding-testnet-wallet](https://user-images.githubusercontent.com/38040789/195802514-fced0fbc-87b5-4028-bc1e-1a852e718896.png)

- Paste your address, complete the captcha, and tap Get Started.
- After a few seconds, if you go back to your app, you should see the token received from the faucet.

![valora-balance-screen](https://user-images.githubusercontent.com/38040789/195802574-907e15ac-a03a-4ae1-963e-636da5abd6aa.png)

Keep in mind these are not real funds 😄 these are required to interact with the testnet. You’re finally ready to play around the starter app. 🥳

---

### Exploring the Mobile DApp

Scan the QR code shown in the terminal using the Expo App to open up the app on your device. The moment you see the Metro Bundler will start bundling the code and once that is done your device will start downloading it.

Once done you should have a screen like this.

![dapp-main-screen](https://user-images.githubusercontent.com/38040789/195802629-f7db3fc8-e406-432f-88a1-4666c79dabce.png)

> Note: At this point, if you get redirected to a browser and WalletConnect website, this means you are using Android 11 and above. There are steps to resolve this in the Github repo readme

Tap **Connect Wallet** to get a prompt to select the wallet of your choice. (For this tutorial Alfajores Wallet)

![connect-wallet-prompt](https://user-images.githubusercontent.com/38040789/195802680-b38d0b07-f1f6-44b6-b379-8e3cc09ba381.png)

You will see a screen prompting you to Allow the Starter app to get your account details like account address. Tap Allow.

![connect-to-app-valora-screen](https://user-images.githubusercontent.com/38040789/195802745-12242081-fbeb-454a-982c-6c75d7bb5c2a.png)

If successful you will see a notification like this.

![valora-notification-screen](https://user-images.githubusercontent.com/38040789/195802808-37026498-c647-4f91-8360-1c14103797a3.png)

If you switch back to the Expo App you will see now that our account is connected.

![greeter-app-screen](https://user-images.githubusercontent.com/38040789/195802882-a9f17750-fc52-4529-8156-acc6b72d9626.png)

You can use the interface to interact with the standard Greeting Contract. The address underlined is the address of the Greeting Contract tapping will take you to the explorer.

Try tapping the Read Greeter Contract button and see if you get a greeting. Your output might be different since I have used it before.

![greeter-read-result-screen](https://user-images.githubusercontent.com/38040789/195802944-50dc4b02-78cb-4f7c-95f2-aaed63a90915.png)

You can update the **Greeting** by using the input field. Once you have your greeting entered in the field tap the **Update Greeter Contract**.

![greeter-write-operation-screen](https://user-images.githubusercontent.com/38040789/195803022-265ae1ef-84cc-468f-8813-e6c7c783828b.png)

Since you are doing a write operation on the contract we need to sign this transaction and it will cost you funds, don’t worry we are on testnet so we won’t be using real money.

![valora-transaction-prompt-screen](https://user-images.githubusercontent.com/38040789/195803085-96d99af4-9b79-4bb0-a129-2059d8787d7a.png)

You should see a screen like this, Alfajores is asking if you want to proceed with the transaction.

- Click **Allow** to proceed this will perform an update on the Greeter Contract.
- Once done if you switch back to the Expo App we can tap the **Read Greeter Contract** to see our update Greeting.

![greeter-contract-read-result](https://user-images.githubusercontent.com/38040789/195803171-1943b181-4e19-46a0-af7d-3c3df2a33881.png)

Similarly, there is a screen for the Storage contract and an **Account Info** screen to view your account address and disconnect the wallet.

![dapp-storage-and-account-info-screen](https://user-images.githubusercontent.com/38040789/195803233-134fae43-7062-4b33-831f-9594f9e7e35d.png)

For now, these are all the screens we have but we are planning to add more. Expect more updates on this starter template. But wait there is more. 😲

---

### Customizing the DApp

We have tried to provide a fair amount of customizations that can be done on the starter template and we at Celo working hard to make it easier and easier, to customize and also have plans to have various components that can help with mobile dApp development.

![folder-structure-of-project](https://user-images.githubusercontent.com/38040789/195803302-237b551c-2342-4e5f-8a5e-f4fd48df0ce8.png)

For now, here is a list of things you can do:

- **Add a splash screen**: Add the splash screen image inside `/assets/images`
- **Change app colors**: Edit `Colors.ts` in `/constants`
- **Add touchable opacity to buttons**: Inside `/components` you will see I have added some modified `TouchableOpacitycomponent` to look like a button with color, feel free to edit it as you like.
- **Organize component styles**: There is also a `ThemeProvider.ts` in `/context` which uses React Native StyleSheet for organizing styles for components, play with it as you like.
- **Organize your styles**: It is not necessary to take the template as-is for design purposes, you can have your own way of code organization for colors and styles.
- **Add more screens**: To add more screens to your app, there is `/screens` folder to add more screen files this is for code organization purposes.
- **Add to the interface**: However, to add it to the interface check out the `LinkingConfiguration.ts` in `/navigation`
- **Add tabs**: index.tsx inside `/navigation` has the code to the `BottomTab` navigation where you can add more tabs to various screens.
- **Add drawer navigation**: After 3 to 4 screens `BottomTab` might not be the right choice to add more tabs so check out the docs to the Drawer Navigation.
- **Change app names**: Refer to edit it inside `index.js` line number 15.
- **Add contracts**: Add solidity files to in `/hardhat/contracts`

In the end, it is an Expo-based React Native project, so it can be customized as you want. Feel free to report any issues under the **Issues** tab in the [Github repo](https://github.com/celo-org/celo-composer) and if you plan to contribute we will welcome you with open hands. 🤝

---

### External References

Here are some links that can help if you wish to explore more.

- [**React Native**](https://reactnative.dev/docs/getting-started) — Library to build cross-platform apps.
- [**Expo**](https://docs.expo.dev/) — React Native Framework.
- [**React Navigation**](https://reactnavigation.org/docs/getting-started) — Library to help with navigation of screens.
- [**Hardhat**](https://reactnavigation.org/docs/getting-started) — Library to help with smart contract testing and deployment.
- [**Solidity**](https://reactnavigation.org/docs/getting-started) — Language used to write smart contracts.
- [**WalletConnect**](https://reactnavigation.org/docs/getting-started) — Library to access mobile install wallets in our dApps.

[View on Medium ↗️](https://medium.com/celodevelopers/celo-composer-react-native-easily-build-react-native-dapps-on-celo-bdc57080772f)

<!--truncate-->
