---
title: Particle Network
description: Walkthrough on leveraging Particle Network's Wallet-as-a-Service on Celo.
---

# Particle Network's Wallet-as-a-Service

[**Particle Network**](https://particle.network) is the Intent-Centric, Modular Access Layer of Web3. With Particle's Wallet-as-a-Service, developers can curate an Web2-like user experience through modular and customizable embedded wallet components. Using MPC-TSS for key management, Particle can streamline user onboarding via familiar Web2 accounts—such as Google accounts, email addresses, and phone numbers.

Particle Network's Wallet-as-a-Service supports Celo Mainnet and Alfajores Testnet through standard EOA-based social logins. Therefore, developers building on Celo can natively leverage Particle Network for onboarding users into application-embedded wallets using social logins through various SDKs that are directly compatible with Celo.

On this page, you can find a high-level overview and tutorial on implementing Particle Network's Wallet-as-a-Service within an application built on Celo (specifically Celo Mainnet in this example), highlighting the basics of getting an integration up and running.

## Tutorial: Implementing Particle Network's Wallet-as-a-Service on Celo

Particle Network has various avenues for integration, largely depending on your platform. If you're building a mobile application, Particle offers various SDKs for iOS, Android, Flutter, React Native, and so on. Although in this example we'll be focusing on using Particle's flagship web SDK, `@particle-network/auth-core-modal`. This SDK will facilitate end-to-end implementation of social logins within web apps (using React). To install this library, alongside some supporting libraries, run one of the two following commands at the root of your project:

```shell
yarn add @particle-network/auth-core-modal @particle-network/chains

# OR

npm install @particle-network/auth-core-modal @particle-network/chains
```

These two libraries are all you'll need (from Particle) to begin using social logins within a new or existing application built on Celo. For this tutorial, we'll put together a basic React application showcasing the utilization of social logins to facilitate wallet generation on Celo. Thus, we can start with the following:

1. Configure Particle Auth Core (`@particle-network/auth-core-modal`) within `index.ts/tsx` (or an adjacent file).
To start using Particle Auth Core (Particle's flagip authentication SDK), you'll first need to configure and initialize it within your `index.ts/tsx` file through `AuthCoreContextProvider` (imported from `@particle-network/auth-core-modal`). This object, `AuthCoreContextProvider`, acts as the primary interface for configuration; through `options`, you'll need to pass the following parameters:
- `projectId`, your project ID retrieved from the [Particle dashboard](https://dashboard.particle.network).
- `clientKey`, your client Key retrieved from the [Particle dashboard](https://dashboard.particle.network).
- `appId`, your app ID retrieved from the [Particle dashboard](https://dashboard.particle.network).
Each of these values are required as they directly link your instance of Particle Auth Core with the Particle dashboard, therefore enabling no-code customization, tracking user activity, authenticating API requests, etc.

Beyond these core parameters (`projectId`, `clientKey`, and `appId`), you have a few other optional configurations you can set (largely visual). An example of an `index.ts/tsx` file with `AuthCoreContextProvider` successfully initialized has been included below.

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Celo } from '@particle-network/chains';
import { AuthCoreContextProvider, PromptSettingType } from '@particle-network/auth-core-modal';
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthCoreContextProvider
      options={{
        projectId: process.env.REACT_APP_PROJECT_ID,
        clientKey: process.env.REACT_APP_CLIENT_KEY,
        appId: process.env.REACT_APP_APP_ID,
        themeType: 'dark', // Optional
        fiatCoin: 'USD', // Optional
        language: 'en', // Optional
        promptSettingConfig: { // Optional, determines the security settings that a user has to configure
          promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
          promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
        },
        wallet: { // Optional, streamlines the wallet modal popup
          visible: true, // Displays an embedded wallet popup on the bottom right of the screen after login
          customStyle: {
            supportChains: [Celo],
          }
        },
      }}
    >
    <App />
      </AuthCoreContextProvider>
  </React.StrictMode>
)
```

2. Setup various hooks within your primary `App` component (or it's equivalent).
Now that you've configured Particle Auth Core (through `AuthCoreContextProvider`, as is shown above), you're ready to begin using the full extent of the SDK (to facilitate social logins) within your application, in this case through your main `App` component, or whichever file you intend on using Particle Auth Core within; this file should be specified within your `index.ts/tsx` file, wrapped by `AuthCoreContextProvider`. For this example, we'll be using three hooks exported by `@particle-network/auth-core-modal` to connect a user through social login, setup a custom EIP-1193 provider (with Ethers), and retrieve information about the user once they've logged in. These hooks are as follows:

- `useConnect`, for connecting and disconnecting a user through a specified social login mechanism (or through Particle Network's generalized authentication modal).
- `useEthereum`, to retrieve the users address, retrieve the associated 1193 `provider` object, etc.
- `useAuthCore`, to pull data about the user once they've connected (such as their public email used for signing up).

For a complete list of hooks, including those covered above, take a look at the [Particle Auth Core documentation](https://docs.particle.network/developers/auth-service/core/web#auth-core-hooks).

An example of using each of the three aforementioned hooks in tandem with one another to build a sample application that onboards a user through social logins, retrieves and displays relevant data, and executes a sample transaction has been included below.

```js
import React, { useState, useEffect } from 'react';

import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { Celo } from '@particle-network/chains';

import { ethers } from 'ethers';
import { notification } from 'antd';

import './App.css';

const App = () => {
  const { provider } = useEthereum(); // For provider retrieval
  const { connect, disconnect } = useConnect(); // For facilitating social logins
  const { userInfo } = useAuthCore(); // For retrieving user information

  const [balance, setBalance] = useState(null);

  const customProvider = new ethers.providers.Web3Provider(provider, "any");

  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo]);

  const fetchBalance = async () => {
    const balanceResponse = await customProvider.getBalance(await customProvider.getSigner().getAddress());

    setBalance(ethers.utils.formatEther(balanceResponse));
  }

  // Upon calling, the user will be prompted to login with their social account according to authType
  const handleLogin = async (authType) => {
    if (!userInfo) {
      await connect({
        socialType: authType,
        chain: Celo,
      });
    }
  };

  // The user will be required to click on an application-embedded confirmation popup, after which this transaction will be sent.
  const executeTx = async () => {
    const signer = customProvider.getSigner();
    console.log(await signer.getAddress())


    const tx = {
      to: "0x00000000000000000000000000000000000dEAD0",
      value: ethers.utils.parseEther("0.001")
    };

    const txResponse = await signer.sendTransaction(tx);
    const txReceipt = await txResponse.wait();

    notification.success({
      message: txReceipt.transactionHash
    })
  };

  return (
    <div className="App">
      {!userInfo ? (
        <div className="login-section">
          <button className="sign-button" onClick={() => handleLogin('google')}>Sign in with Google</button>
          <button className="sign-button" onClick={() => handleLogin('twitter')}>Sign in with Twitter</button>
        </div>
      ) : (
        <div className="profile-card">
          <h2>{userInfo.name}</h2>
          <div className="balance-section">
            <small>{balance} CELO</small>
            <button className="sign-message-button" onClick={executeTx}>Execute Transaction</button>
            <button className="disconnect-button" onClick={() => disconnect()}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
```

As shown above, Particle Network's Wallet-as-a-Service can be plugged in and used as you would any other standard wallet that exposes an EIP-1193 provider on Celo, enabling social logins in just a few lines of code.

## Learn More

- [Particle Dashboard](https://dashboard.particle.network)
- [Particle Documentation](https://docs.particle.network)
- [Celo Example Repository](https://github.com/TABASCOatw/particle-celo-demo)