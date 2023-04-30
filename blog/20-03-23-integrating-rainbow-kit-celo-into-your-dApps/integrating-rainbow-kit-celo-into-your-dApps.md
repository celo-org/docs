---
title: Integrating Rainbow-Kit Celo into Your DApps
description: This sequel walks blockchain developers through the process of integrating the Rainbow-Kit Celo tool into their DApps for seamless financial operation and compatible wallet integration.
authors:
  - name: Israel Okunaya
    title: Product Manager, Technical Writer @Celo Foundation
    url: https://github.com/Southpaw0
    image_url: https://user-images.githubusercontent.com/104994589/223738932-9c0c55cf-e21c-43eb-9df5-20a70a6b486d.png
tags: [celosage, smartcontract, solidity, react, hardhat, intermediate]
hide_table_of_contents: true
slug: /tutorials/integrating-rainbow-kit-celo-into-your-dapps
---

![header](https://user-images.githubusercontent.com/104994589/226233400-afd8bdae-e4ed-4ce1-8c49-31305c3b1673.png)

## Introduction

In this tutorial, I will take you through setting up a wallet connection in your Dapp using Rainbowkit-celo. [RainbowKit](https://www.rainbowkit.com/docs/introduction) is a React library that makes it easy to add a wallet connection to your dapp. It's intuitive, responsive, and customizable. [Rainbowkit-celo](https://docs.celo.org/developer/rainbowkit-celo) is a plugin to help rainbowkit developers support the CELO protocol faster. It includes the chain information and the main CELO wallets (Valora, Celo Wallet, Celo Terminal, etc.).

## Prerequisites

For this tutorial, you will need to have some level of knowledge of Javascript, React, tailwindcss, and Solidity.

## Requirements

For this article, you will need:

- A code editor. VScode is preferable.
- A chrome browser.
- A crypto wallet: [Valora](https://valoraapp.com/), [Celo wallet](https://celowallet.app), [MetaMask](https://metamask.io/)
- Nodejs installed on your computer. If not, download from [here](https://nodejs.org/en/download/)

## The Smart Contract

For this tutorial, we will be building a Will/Inheritance smart contract. To build the smart contract and deploy it to the Celo blockchain, we will be using [hardhat](https://hardhat.org/) blockchain. Hardhat is a development environment for Ethereum software. With hardhat, you can write your smart contract, deploy them, run tests, and debug your code.

## Building the Will/Inheritance Smart Contract

First, create a folder where the hardhat project and your Dapp will go. In your terminal, execute these commands.

```bash
mkdir inheritance-smartContract
cd inheritance-smartContract
```

Then in the inheritance-smartContract folder, we will set up a Hardhat project.

```bash
mkdir will-contract
cd will-contract
yarn init --yes
yarn add --dev hardhat
```

If you are using Windows, you must add one more dependency with the code below:

```bash
yarn add --dev @nomiclabs/hardhat-waffle hardhat-deploy
```

In the same directory where you installed the Hardhat project, run:

```bash
npx hardhat
```

Select `Create a Javascript Project` and follow the steps in the terminal to complete your Hardhat setup.

Once your project is set up, create a new file in the contract folder and name it `will.sol`.

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;
contract Will {
    address private owner;
    address private _heir;
    bool private isAlive;
    event OwnerChanged(address newOwner);
    event ChangeHeir(address newHeir);
    event IsAliveChanged(bool isAlive);
    event FundsTransferred(address recipient, uint256 amount);
    constructor() {
        owner = msg.sender;
        isAlive = true;
    }
    function changeOwner(address newOwner) public {
        require(msg.sender == owner, "Only owners can change owner");
        owner = newOwner;
        emit OwnerChanged(newOwner);
    }
    function setHeir(address heir) public {
        require(msg.sender == owner, "Only owners can set heir");
        _heir = heir;
    }
    function changeHeir(address newHeir) public {
        require(msg.sender == owner, "Only owners can remove a heir");
        _heir = newHeir;
        emit ChangeHeir(newHeir);
    }
    function changeIsAlive(bool _isAlive) public {
        require(msg.sender == owner, "Only the owner can change the status");
        isAlive = _isAlive;
        emit IsAliveChanged(_isAlive);
    }
    function transferFunds(address payable recipient, uint256 amount) public {
        require(msg.sender == owner || (msg.sender == _heir && !isAlive), "Only the owner or heir can transfer funds");
        require(amount <= address(this).balance, "Insufficient funds");
        recipient.transfer(amount);
        emit FundsTransferred(recipient, amount);
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getHeir() public view returns (address) {
        return _heir;
    }

    function getIsAlive() public view returns (bool) {
        return isAlive;
    }

    receive() external payable {}
}
```

In the smart contract code above, the `Will` contract has an owner, a designated heir, and a status that determines whether the owner is alive. The contract also has four functions:

- `changeOwner()` allows the current owner to transfer ownership to a new address.
- `setHeir()` allows the current owner to set a designated heir.
- `changeHeir()` allows the current owner to change the designated heir.
- **`changeIsAlive()`** allows the current owner to change their status to alive or deceased.
- `transferFunds()` allows the owner or the heir (if the owner is deceased) to transfer the funds to a designated recipient.

The contract also has three functions to allow anyone to view the current owner, heir, and status.

The contract also includes several events that get emitted whenever the owner, heir, status, or funds are changed, to allow for easy monitoring of changes to the contract.

**_Note: This is just a simple smart contract example, and a real-world will would likely have more complex logic to handle edge cases and to ensure that the contract is secure and reliable_**.

## Configure Deployment

We will deploy the smart contract to the Alfajores network on the Celo blockchain. To do this, we will need to connect to the Alfajores testnet through forno by writing a deployment script. Replace the content of the `deploy.js` file with the code below to deploy the smart contract.

```jsx
const { ethers } = require("hardhat");
async function main() {
  const willContract = await ethers.getContractFactory("MyWill");
  const deployedWillContract = await willContract.deploy();
  await deployedWillContract.deployed();
  console.log("Will Contract Address:", deployedWillContract.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
```

Now create a `.env` in the `will-contract` folder and add your `MNEMONIC` key in the .env file like this

```jsx
MNEMONIC=//add your wallet seed phrase here
```

Now we will install `dotenv` package to be able to import the env file and use it in our config.

In your terminal pointing to the will-contract folder, enter this command

```bash
yarn add dotenv
```

Next, open the `hardhat.config.js` file and replace the content of the file provided to us by Hardhat with the [configuration code](https://github.com/celo-org/DevRel/blob/main/configuration/hardhat.config.js) for deployment made available by Celo.

```jsx
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });
require("hardhat-deploy");
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
// Prints the Celo accounts associated with the mnemonic in .env
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "alfajores",
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545",
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/52752'/0'/0",
      },
      //chainId: 44787
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/52752'/0'/0",
      },
      chainId: 42220,
    },
  },
  solidity: "0.8.4",
};
```

Add the gas price and gas to the Alfajores object.

```jsx
alfajores: {
   gasPrice: 200000000000,
   gas: 41000000000,
   url: "https://alfajores-forno.celo-testnet.org",
   accounts: {
     mnemonic: process.env.MNEMONIC,
     path: "m/44'/52752'/0'/0
 }
```

[Check out](https://docs.celo.org/developer/deploy/hardhat) the Celo doc for more details on what each part of the configuration code does.

The content of the `hardhat.config.js` file should now look like this.

```jsx
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });
require("hardhat-deploy");
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
// Prints the Celo accounts associated with the mnemonic in .env
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "alfajores",
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545",
    },
    alfajores: {
      gasPrice: 200000000000,
      gas: 41000000000,
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/52752'/0'/0",
      },
      //chainId: 44787
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/52752'/0'/0",
      },
      chainId: 42220,
    },
  },
  solidity: "0.8.4",
};
```

## Compiling the Contract

To compile the contract, in your terminal, point to the `will-contract` folder and run this command.

```bash
npx hardhat compile
```

After the compilation is successful, run the following command in your terminal.

```bash
npx hardhat run scripts/deploy.js --network alfajores
```

Save the Whitelist Contract Address that was printed on your terminal somewhere, because you would need it further down in the tutorial.

## The Dapp

To develop the Dapp, we will be using [Reactjs](https://reactjs.org/). React is a free and open-source front-end JavaScript library for building user interfaces based on components.

To create a new `react-app`, in your terminal, point to the `inheritance-smartContract` folder and type.

```bash
mkdir dapp
cd dapp
yarn create react-app
```

Press enter and allow the `react-app` to initialize.

You should have a folder structure that should look like this:

![image](https://user-images.githubusercontent.com/104994589/223735834-fff0ba96-95da-451d-8c84-abe4b1181362.png)

Now to run the app, execute this command in the terminal

```bash
yarn start
```

Go to `http://localhost:3000` to view your running app.

Now we will install tailwindcss for the styling of the Dapp. To install tailwindcss, in your terminal, still pointing to the dapp folder, run.

```bash
yarn add --dev tailwindcss
```

After installation has been completed, run

```bash
npx tailwindcss init
```

`npx tailwindcss init` creates a tailwind.config.js file in your dapp folder.

in the tailwind.config.js file, copy and paste this code.

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Then replace the content of the `index.css` file with the **`@tailwind`** directives for each of Tailwind’s layers.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now we will install [Rainbowkit-celo](https://docs.celo.org/developer/rainbowkit-celo). To install Rainbowkit-celo, open up your terminal pointing to the dapp folder and run

```bash
yarn add @celo-rainbowkit-celo
```

The `@celo-rainbowkit-celo` package has `@rainbow-me/rainbowkit` as a peer dependency and expects it to be installed too. To install it, run the command in your terminal

```bash
yarn add @rainbow-me/rainbowkit wagmi
```

Next we will install `webjs` and `@celo/contractkit`. We will be using the contract kit to interact with the Celo blockchain.

```bash
yarn add web3 @celo/contractkit
```

We will have to make further configurations to our project folder to enable us use `web` and `@celo/contractkit` without errors or bugs. These configurations involve installing webpack and other dependencies. To install webpack, type these commands in your terminal. Make sure your terminal still points to the `dapp` folder you created earlier.

```bash
yarn add --dev webpack
```

After successfully installing webpack, create a `webpack.config.js` file in the dapp folder and paste the code.

```jsx
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },
  node: {
    net: "empty",
  },
};
```

For the other dependencies, paste this in your terminal.

```bash
yarn add --dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process
```

Create `config-overrides.js` in the dapp folder with the content:

```jsx
const webpack = require("webpack");
module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  return config;
};
```

In the `package.json` file, change the scripts field for start, build, and test. Replace react-scripts with react-app-rewired:

```jsx
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
```

Now go to your index.js file in the dapp folder and copy and import the follow dependencies.

```jsx
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  omniWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Valora, CeloWallet, CeloDance } from "@celo/rainbowkit-celo/wallets";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import "@rainbow-me/rainbowkit/styles.css";
```

Below the imports, add the following code.

```jsx
const { chains, provider } = configureChains(
  [Alfajores, Celo],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);
const connectors = connectorsForWallets([
  {
    groupName: "Recommended with CELO",
    wallets: [
      Valora({ chains }),
      CeloWallet({ chains }),
      CeloDance({ chains }),
      metaMaskWallet({ chains }),
      omniWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
```

Now wrap the `<App/>` component with the `RainbowkitProvider` and `WagmiConfig`

```jsx
<WagmiConfig client={wagmiClient}>
  <RainbowKitProvider chains={chains}>
    <App />
  </RainbowKitProvider>
</WagmiConfig>
```

Your `index.js` file should look like this.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  omniWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Valora, CeloWallet, CeloDance } from "@celo/rainbowkit-celo/wallets";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import celoGroups from "@celo/rainbowkit-celo/lists";
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import "@rainbow-me/rainbowkit/styles.css";
const { chains, provider } = configureChains(
  [Alfajores, Celo],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ]
);
const connectors = connectorsForWallets([
  {
    groupName: "Recommended with CELO",
    wallets: [
      Valora({ chains }),
      CeloWallet({ chains }),
      CeloDance({ chains }),
      metaMaskWallet({ chains }),
      omniWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

In your App.js file, copy and paste this code

```jsx
import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSigner } from "wagmi";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { abi } from "./will.abi";
function App() {
  const { data: signer } = useSigner();
  const [address, setAddress] = useState("");
  const [displayValue, setDisplayValue] = useState();
  const willContractAddress = "0x24B1525F0061CA0c91bE9f966c41C652A9a8D383"; //The address of your own smart contract;
  useEffect(() => {
    const getAddress = async () => {
      if (signer) {
        const address = await signer.getAddress();
        setAddress(address);
      }
    };
    getAddress();
  }, [signer]);
  if (address) {
    console.log(address);
  }
  console.log(abi);
  const getContractKit = () => {
    if (signer) {
      const web3 = new Web3(window.celo);
      const kit = newKitFromWeb3(web3);
      return kit;
    }
  };
  const kit = getContractKit();
  console.log(kit);
  const getOwner = async () => {
    const kit = getContractKit();
    const contract = new kit.web3.eth.Contract(abi, willContractAddress);
    try {
      const owner = await contract.methods.getOwner().call();
      setDisplayValue(owner);
    } catch (error) {
      console.log(error);
    }
  };
  const getHeir = async () => {
    const kit = getContractKit();
    const contract = new kit.web3.eth.Contract(abi, willContractAddress);
    try {
      const heir = await contract.methods.getHeir().call();
      setDisplayValue(heir);
    } catch (error) {
      console.log(error);
    }
  };
  const getStatus = async () => {
    const kit = getContractKit();
    const contract = new kit.web3.eth.Contract(abi, willContractAddress);
    try {
      const status = await contract.methods.getIsAlive().call();
      console.log(status);
      setDisplayValue(status);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 font-semibold text-2xl">
        Simple Will Smart Contract
      </h1>
      <ConnectButton />
      <div className="mt-8">
        <div className="bg-white border border-green-500 border-solid p-4 rounded-lg text-center">
          {displayValue ? displayValue : ""}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-8">
          <button className="bg-red-400 py-2 px-4 text-white rounded-lg">
            Change Owner
          </button>
          <button className="bg-red-400 py-2 px-4 text-white rounded-lg">
            Set Heir
          </button>
          <button className="bg-red-400 py-2 px-4 text-white rounded-lg">
            Change Heir
          </button>
          <button className="bg-red-400 py-2 px-4 text-white rounded-lg">
            Change Deceased Status
          </button>
          <button
            onClick={getOwner}
            className="bg-green-400 py-2 px-4 text-white rounded-lg"
          >
            Owner
          </button>
          <button
            onClick={getHeir}
            className="bg-green-400 py-2 px-4 text-white rounded-lg"
          >
            Heir
          </button>
          <button
            onClick={getStatus}
            className="bg-green-400 py-2 px-4 text-white rounded-lg"
          >
            Status
          </button>
          <button className="bg-red-600 py-2 px-4 text-white rounded-lg">
            Transfer Inheritance
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
```

In the code above we have a UI that has the `ConnectButton` provided by `@rainbow-me/rainbowkit` rendered. This custom button allows us to connect to default crypto wallets provided by Celo and other crypto wallets .that support Celo.

The `getOwner()`, `getHeir(`) and `getStatus()` are functions that are called when a user clicks a particular button. These functions connect with the smart contract we created and deployed to call the various methods we created in the smart contract.

Start up the React app by running this command in your terminal to view the Dapp

```bash
yarn start
```

Make sure the terminal points to the dapp folder before running the command.

This is how the Dapp should look when the application opens

![image](https://user-images.githubusercontent.com/104994589/223736033-b77b2163-60bf-49b4-9aba-bb49ad2a3f2c.png)

## Conclusion

So far, we have been able to create a smart contract Dapp using React. We created the UI enabling a user to connect their wallet to the Dapp using Rainbowkit-celo. We also connected with the smart contract we deployed from the Dapp and called some of the methods we created in the smart contract.

## Next Step

If you wish to read more on rainbowkit and Rainbowkit-celo, check out these docs links:

- [The Official Github Page of Rainbow-kit Celo](https://github.com/celo-org/rainbowkit-celo)
- [Rainbow-kit Docs](https://www.rainbowkit.com/docs/introduction)
- [Github Repo](https://github.com/J0shcodes/inheritance-smartContract)

## About the Author

[Israel Okunaya](https://meetisraelokunaya.curious.page/) is an ace writer with a flair for simplifying complexities and a knack for storytelling. He leverages over four years of experience to meet the most demanding writing needs in different niches, especially food and travel, blockchain, and marketing. He sees blockchain as a fascinating yet tricky affair. So, he's given to simplifying its complexities with text and video tutorials.
