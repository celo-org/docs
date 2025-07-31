---
title: Dynamic
description: Overview of Dynamic
---

# Using Dynamic

[Dynamic](https://www.dynamic.xyz/) is a powerful web3 auth developer platform with built-in support for Celo. It lets you integrate multiple wallets such as **Valora, Celo Wallet**, Coinbase Wallet, Metamask, and more into your app or website, handles network switching, multi-wallet linking and more.

Dynamic comes with Celo built-in. You can play around with a live demo of Dynamic [here](https://demo.dynamic.xyz/) and see a full video walkthrough [here](https://www.dynamic.xyz/product-walkthrough). In this tutorial, we'll go through how to set up Dynamic with Celo.

You can see a CodeSandbox of the example below [here](https://shv1y7.csb.app/) (configured to Celo).

## Prerequisites

Dynamic works with React today. You can go through the standard getting started guide [here](https://docs.dynamic.xyz/docs/getting-started-with-dynamic).

## Step 1: Create a Dynamic account

1. [Sign up](https://app.dynamic.xyz) to get an environment ID

2. Create an organization and a set up your first project

3. Copy your `environmentID` from the Dynamic overview page

4. (optional) <a href="doc:security" target="_blank"> Configure your site's CORS origins</a>

## Step 2: Install the Dynamic npm package

You can install Dynamic's SDK with either `yarn` or `npm`. We currently support React and NextJS.

```shell
npm install @dynamic-labs/sdk-react
# or yarn add @dynamic-labs/sdk-react
```

## Step 3: Configure the SDK

Copy the following snippet into your project and paste in your environmentId:

```jsx
import { DynamicContextProvider, DynamicWidget } from "@dynamic-labs/sdk-react";

const App = () => (
  <DynamicContextProvider
    settings={{
      environmentId: "<<sandboxEnvironmentId>>",
    }}
  >
    <DynamicWidget />
  </DynamicContextProvider>
);

export default App;
```

## Step 4: Turn on Celo in your developer dashboard

Now that we have the basic Dynamic setup, you can go to your developer dashboard, and select `configurations` from the left menu. Next, click on the `EVM` card and toggle `Celo` on. Note that you can also chose to toggle the default network, `Ethereum`, off.

<img width="948" alt="celo" src="https://user-images.githubusercontent.com/1596208/233650336-6d16feb9-a68c-43f2-b344-08edae9ad456.png" />

## See it in action

Now that you put things together, you can see a CodeSandbox of the finished product [here](https://shv1y7.csb.app/).

## Next steps

Now that you set up Dynamic with **Celo**, there are many additional things you can explore:

- **Log in with your wallet, and see data in Dynamic's developer dashboard** - Now that your widget is set up locally, try to log in with a wallet. As soon as you do, head over to the Dynamic developer dashboard and click on user management and analytics. You'll be able to see your user show up!
- **Customize your SDK design** - There are many ways to customize the Dynamic modal to fit your needs (you can explore them in the SDK configuration section), but to start, we suggest setting a light/dark mode and a primary color for the modal, which you can do in the design section of your developer dashboard.
- **Explore how to use the Dynamic SDK** - After your users connect their wallets, you'll want to interact with them for various reasons. You can read more about the SDK in [Dynamic's docs](https://docs.dynamic.xyz/introduction/welcome).

For support, you can also join [Dynamic's Slack Community](https://dynamic.xyz/slack)
