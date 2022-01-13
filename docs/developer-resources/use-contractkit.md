---
title: use-contractkit
description: The easiest way to access [ContractKit](https://www.npmjs.com/package/@celo/contractkit) in your React applications.
---

# use-contractkit

The easiest way to access [ContractKit](https://www.npmjs.com/package/@celo/contractkit) in your React applications.

---

## What is use-contractkit?

The easiest way to access [ContractKit](https://www.npmjs.com/package/@celo/contractkit) in your React applications 🔥. `use-contractkit` is a [React hook](https://reactjs.org/docs/hooks-intro.html) for managing access to ContractKit with a built-in headless modal system for connecting to your users wallet of choice.

Now your DApp can be made available to everyone in the Celo ecosystem, from Valora users to self custodied Ledger users.

By default use-contractkit is styled so that you can drop it into your application and go, however it's fully customisable so you can maintain a consistent UX throughout your application.

## Table of Contents

- [Installation](#install)
- [Supported Wallets](#supported-wallets)
- [Usage](#usage)
- [Notes](#notes)
- [Support](#support)

## Install

```
yarn add @celo-tools/use-contractkit
```

## Supported wallets

| Wallet                                                                                     |  sendTransaction   |    signTransaction | signTypedData      | signPersonal       |
| ------------------------------------------------------------------------------------------ | :----------------: | -----------------: | ------------------ | ------------------ |
| Plaintext private key                                                                      |                    | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [Ledger](https://www.ledger.com/)                                                          |                    | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [WalletConnect](https://walletconnect.org/)                                                |                    | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [Celo Extension Wallet (Metamask fork)](https://github.com/dsrvlabs/celo-extension-wallet) | :white_check_mark: |                    |                    |                    |

## Basic Usage

### Wrap your application with ContractKitProvider

use-contractkit uses [unstated-next](https://github.com/jamiebuilds/unstated-next) under the hood to inject state throughout your application. unstated-next is built on top of the React Context API so you need to make sure your application is wrapped with the provider before usage.

```jsx
import { ContractKitProvider } from "@celo-tools/use-contractkit";
import "@celo-tools/use-contractkit/lib/styles.css";

function WrappedApp() {
  return (
    <ContractKitProvider
      dapp={{
        name: "My awesome dApp",
        description: "My awesome description",
        url: "https://example.com",
      }}
    >
      <App />
    </ContractKitProvider>
  );
}

function App() {
  // your application code
}
```

### Prompt users to connect their wallet

use-contractkit provides a `connect` function that will open a modal with a list of wallets your user can connect to.

```jsx
import { useContractKit } from "@celo-tools/use-contractkit";

function App() {
  const { connect, address } = useContractKit();

  return (
    <>
      {address ? (
        <div>Connected to {address}</div>
      ) : (
        <button onClick={connect}>Connect wallet</button>
      )}
    </>
  );
}
```

After connecting to an account the `address` property will be set.

### Use ContractKit to read chain data

Now that we've connected to an account and have the users address, we can use the `kit` to query on-chain data:

```jsx
import { useContractKit } from '@celo-tools/use-contractkit';

function App() {
  const { kit, address } = useContractKit();

  async function getAccountSummary() {
    const accounts = await kit.contracts.getAccounts();
    await accounts.getAccountSummary(address);
  }

  return (
    ...
  )
}
```

### Accessing user accounts

The biggest problem when developing DApps is ensuring a Web2 level experience while managing the flaky and often slow nature of blockchains. To that end we've designed use-contractkit in a way to abstract away most of that pain.

Initially connecting to a users account is one thing, handled via the `connect` function we just mentioned. However once a user has connected to your DApp once we can make the experience nicer for them on repeat visits.

#### Last connected account

use-contractkit will remember a users last connected address when they navigate back to or refresh your DApp. Ensure that when developing your DApp nothing changes nothing in the UI whether or not the user has a `kit.defaultAccount` property set.

```javascript
import { useContractKit } from "@celo-tools/use-contractkit";

const { address } = useContractKit();
```

#### Get a connected account

When a user refreshes or navigates back to your page, they may not necessarily have a connected account any longer, however we shouldn't need to prompt them to login again just to view the page, that can be done only when doing an action.

For that functionality we have the `performActions` and `getConnectedKit` methods. Usage looks a little like this for `getConnectedKit`:

```jsx
import { useContractKit } from "@celo-tools/use-contractkit";

function App() {
  const { getConnectedKit } = useContractKit();

  async function transfer() {
    const kit = await getConnectedKit();
    const cUSD = await kit.contracts.getStableToken();
    await cUSD.transfer("0x...", 10000).sendAndWaitForReceipt();
  }

  return <button onClick={transfer}>Transfer</button>;
}
```

and this for `performActions`:

```jsx
import { useContractKit } from "@celo-tools/use-contractkit";

function App() {
  const { performActions } = useContractKit();

  async function transfer() {
    await performActions(async (kit) => {
      const cUSD = await kit.contracts.getStableToken();
      await cUSD.transfer("0x...", 10000).sendAndWaitForReceipt();
    });
  }

  return <button onClick={transfer}>Transfer</button>;
}
```

The `performActions` method will also take care of displaying a modal to the user telling them to confirm any actions on their connected wallet.

### Network management

use-contractkit provides a `network` variable and an `updateNetwork` function you can use to display the currently connected network as well as switch to a different one (ie. Alfajores, Baklava or Mainnet).

If you'd prefer your DApp to only access a specific network (maybe you're deploying your testnet website at `https://test-app.dapp.name` and your mainnet version at `https://app.dapp.name`) you can pass the network you want to use as a variable into the provider you wrap your application with:

You can also pass in a `network` prop to the `ContractKitProvider` as the default starting network

```jsx
import { ContractKitProvider, Alfajores } from '@celo-tools/use-contractkit';

function WrappedApp({ Component, pageProps }) {
  return (
    <ContractKitProvider
      ...
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: 'https://alfajores-forno.celo-testnet.org',
        graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
        explorer: 'https://alfajores-blockscout.celo-testnet.org',
        chainId: 44787,
      }}
    >
      <App />
    </ContractKitProvider>
  );
}

function App () {
  ...
}
```

Be sure to check the use-contractkit example application for a showcase of how network management works in more depth. Usually you'll want to show a dropdown to your users allowing them to select the network to connect to.

```jsx
import { useContractKit } from "@celo-tools/use-contractkit";

function App() {
  const { network, updateNetwork } = useContractKit();

  return <div>Currently connected to {network}</div>;
}
```

### Adjust FeeCurrency

use-contractkit provides a `feeCurrency` variable and an `updateFeeCurrency` function you can use to display the currently selected feeCurrency (cUSD, CELO, cEUR). The feeCurrency can also be passed to the provider component. Valid values are `CeloContract.GoldToken`, `CeloContract.StableToken`, `CeloContract.StableTokenEUR`. CeloContract can be imported like so:

`import { CeloTokenContract } from '@celo/contractkit'`

### Dark mode

use-contrackit uses Tailwind for styling, to use the modal in dark mode simply add the class `tw-dark` to the root `<html />` tag of the web page.

## Development

To run use-contractkit locally, simply clone this repository and run:

- `yarn`
- `make dev`

A hot reloading server should come up on `localhost:3000`, it's the exact same as what's at [use-contractkit-c-labs.vercel.app](https://use-contractkit-c-labs.vercel.app).

## Support

Struggling with anything use-contractkit related? Jump into the [celo-org discord channel](https://chat.celo.org) and ask for help any time.
