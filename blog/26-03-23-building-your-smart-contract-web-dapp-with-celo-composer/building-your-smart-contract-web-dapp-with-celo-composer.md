---
title: Building Your Smart Contract Web Dapp with Celo-Composer
description: Learn how to initialize a Hardhat and React project using Celo-composer.
authors:
  - name: Joshua Moses
    title: Frontend Web Developer | Technical Writer
    url: https://github.com/J0shcodes
    image_url: https://avatars.githubusercontent.com/u/7295729?v=4
tags:
  [
    solidity,
    react,
    celo,
    smartcontract,
    nextjs,
    intermediate,
    composer,
    celosage,
  ]
hide_table_of_contents: true
slug: /tutorials/building-your-first-smart-contract-web-dapp-with-celo-composer
---

![header](../../src/data-tutorials/showcase/intermediate/building-your-smart-contract-web-dapp-with-celo-composer.png)

## Introduction

For the purpose of this tutorial, you will need to have some level of knowledge of the following:

- Javascript
- Typescript
- Reactjs
- Tailwind CSS
- Hardhat
- Solidity

## Requirement

For this tutorial, you will need

- A code editor. VScode is preferable.
- A chrome browser.
- A crypto wallet: [celo-wallet-extension](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en), [Celo wallet](https://celowallet.app), [MetaMask](https://metamask.io/)
- Nodejs is installed on your computer. If not, download from [here](https://nodejs.org/en/download/)

Check out this video on how to install and set up the [celo-wallet-extension](https://youtu.be/KD_0kKxtl8c).

## Project Initialization

The easiest way to get started with Celo Composer is by using `@celo/celo-composer`. This is a CLI tool that enables you to quickly start building dApps on Celo for multiple frameworks including React, React Native (w/o Expo), Flutter, and Angular. For this tutorial, we will be using React, hardhat(for the smart contract development and deployment), tailwindcss for styling, and `react-celo` (to communicate with the Celo blockchain).

In your terminal run

```bash
npx @celo/celo-composer create
```

This will prompt you to select the framework and template you want to use. For the purpose of this tutorial, select React as the framework you will be using.

![image](https://user-images.githubusercontent.com/71826391/226510672-8845faf7-8252-4e98-a748-53a96c6ce9fc.png)

Once you have selected the framework, it will ask you to select the web3 library you will be using for the react-app. For the purpose of this tutorial, we will be using react-celo as our preferred web3 library.

![image](https://user-images.githubusercontent.com/71826391/226184100-a6b77a72-9363-4178-b547-9370b8ebc40f.png)

Then, it will ask you to select the smart contract development environment tool. We will be using hardhat for this tutorial.

![image](https://user-images.githubusercontent.com/71826391/226184163-6e7f7829-c21f-4d77-bc36-3529c9d69350.png)

After selecting the tool, it will ask you whether you want subgraph support for your dApp. Select no as we will not be using a subgraph for the dApp in this tutorial.

![image](https://user-images.githubusercontent.com/71826391/226184211-f98ece16-ade5-4bf4-84ac-6fe30cb0c167.png)

Finally, it will ask you for the name of the project folder that will house your dApp

![image](https://user-images.githubusercontent.com/71826391/226184256-307a03be-4c31-4fe3-9a7c-8741d22a0fee.png)

Open the project folder you created in a code editor (Vs code). The content of the folder should look like this

![image](https://user-images.githubusercontent.com/71826391/226184289-c4cd4545-0b30-44b7-9349-ed8574ac871c.png)

In the packages folder, you should see a hardhat and react-app folder. The hardhat folder contains a hardhat-project with the necessary setup we need to create and deploy our simple smart contract. While the react-app folder houses the react starter files for our dApp.

In your terminal pointing at the root project folder, type this command to point your terminal to the packages folder.

```bash
cd packages
```

Then run this command to install the dependencies in the `package.json` files.

```bash
yarn install
```

After all dependencies have been installed, we can now go ahead and create our smart contract.

## The Smart Contract

In your hardhat folder, you will find a contracts folder, go ahead and delete the solidity files present in the contracts folder. Then create a new file in the contracts folder and name it `ImageStorage.sol`.

In the `ImageStorage.sol` file, copy and paste this solidity code.

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract ImageStorage {

    mapping(string => string) imageUrls;

    function addImageUrl(string memory imageTitle, string memory _imageUrl) public {
        imageUrls[imageTitle] = _imageUrl;
    }

    function getImageUL(string memory imageTitle) public view returns (string memory) {
        return imageUrls[imageTitle];
    }
}
```

In the code above. we have a simple smart contract that stores an image url and returns it when a user wants. In the code, we map are mapping a string (name of the image) to a string (url of the image) and storing it in the `imageUrls` variable.

The `addImageUrl` function takes the title of the image and its url and sets the url as a value to the image title.

The `getImageUrl` function accepts the image title/name and returns the image url.

Check out the official solidity docs to learn more about [mapping in solidity](https://docs.soliditylang.org/en/v0.8.7/types.html#mapping-types).

## Deploying the Smart Contract

We will deploy the smart contract to the Alfajores network on the Celo blockchain. To do this, we will need to connect to the Alfajores testnet through forno by writing a deployment script. In the hardhat folder under the deploy folder, replace the content of the `00-deploy.js` file with the code below.

```js
const { ethers } = require("hardhat");

async function main() {
  const storageContract = await ethers.getContractFactory("ImageStorage");

  const deployedStorageContract = await storageContract.deploy();

  await deployedStorageContract.deployed();

  console.log(
    "Image Storage Contract Address:",
    deployedStorageContract.address
  );
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

Now create a `.env` in the `hardhat` folder and add your `MNEMONIC` key in the .`env` file like this.

```jsx
MNEMONIC=//add your wallet seed phrase here
```

Now we will install `dotenv` package to be able to import the env file and use it in our `config`.

In your terminal pointing to the will-contract folder, enter this command

```bash
yarn add dotenv
```

Next, open the `hardhat.config.js` file and replace the content of the file with this code.

```js
require("@nomicfoundation/hardhat-chai-matchers");
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

To compile the contract, in your terminal, point to the `hardhat` folder and run this command.

```bash
npx hardhat compile
```

After the compilation is successful, run the following command in your terminal to deploy the smart contract to the Celo blockchain.

```bash
npx hardhat run deploy/00-deploy.js --network alfajores
```

Save the Image Storage Contract address that was printed on your terminal somewhere, because you will need it further down in the tutorial.

## Building the Dapp

In this section, we will be building a simple and ugly UI for our Dapp, connecting our wallet to the Dapp, and also communicating with our smart contract on the Celo blockchain.

Replace the content of the `_app.tsx` file located in the react-app with this code.

```tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CeloProvider, Alfajores } from "@celo/react-celo";
import "@celo/react-celo/lib/styles.css";

import Layout from "../components/Layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <CeloProvider
      dapp
      defaultNetwork={Alfajores.name}
      connectModal={{
        title: <span>Connect your Wallet</span>,
        providersOptions: { searchable: true },
      }}
    >
      <Component {...pageProps} />
    </CeloProvider>
  );
}

export default App;
```

The `_app.tsx` is responsible for rendering our UI. In the file, we import `CeloProvider` and `Alfajores` from react-celo. Then wrap the entire application with the `CeloProvider` component.

The `defaultNetwork` props passed to the `CeloProvider` component specifies the Celo blockchain network we want to make a connection to and for this tutorial, we will be using the Alfajores network because that was where we deployed our smart contract to.

The connectModal props, open a modal that prompts users to select from a variety of crypto wallet support by Celo when the connect wallet button is clicked.

Still, in the react-app folder, create a new JavaScript file and name it `imageStorage.abi.js`. Then, go into your hardhat folder. Under the hardhat folder, there is an artifact folder, and in that artifact folder, there is also a contracts folder, which has an `ImageStorage.json` file. In that file, copy the `“abi”` value and paste it into the `imageStorage.abi.js` file you created like this.

```js
const imageStorageAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "imageTitle",
        type: "string",
      },
      {
        internalType: "string",
        name: "_imageUrl",
        type: "string",
      },
    ],
    name: "addImageUrl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "imageTitle",
        type: "string",
      },
    ],
    name: "getImageUL",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default imageStorageAbi;
```

The array above is the smart contract ABI (Application Binary Interface). The ABI defines the methods and variables that are available in a smart contract and which we can use to interact with that smart contract.

Now, in the `index.tsx` file located under the react-app folder, paste this code.

```tsx
import { useCelo } from "@celo/react-celo";
import { useState, useRef } from "react";

import imageStorageAbi from "../imageStorage.abi";

export default function Home() {
  const { connect, address, kit } = useCelo();

  const [imageTitle, setImageTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [getImageTitle, setGetImageTitle] = useState("");
  const [returnedUrl, setReturnedUrl] = useState("");
  const [message, setMessage] = useState("");

  const imageStorageContractAddress =
    "0x664F1dfe26fdf8fBBa97545F487F59A156086d3A";

  const saveImage = async () => {
    const contract = new kit.connection.web3.eth.Contract(
      imageStorageAbi,
      imageStorageContractAddress
    );

    const result = await contract.methods
      .addImageUrl(imageTitle, imageUrl)
      .send({ from: address });
    console.log(result);
    if (result.status === true) {
      setMessage("Image successfully saved");
    } else {
      setMessage("Image not saved succesfully");
    }
  };

  const getImage = async () => {
    setMessage("");
    setImageTitle("");
    setImageUrl("");
    const contract = new kit.connection.web3.eth.Contract(
      imageStorageAbi,
      imageStorageContractAddress
    );

    const result = await contract.methods
      .getImageUL(getImageTitle)
      .call({ from: address });
    setReturnedUrl(result);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-[40%]">
        {!address ? (
          <div className="text-center">
            <button
              className="bg-blue-500 rounded-md py-2.5 px-5 text-white"
              onClick={connect}
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div>
            {message !== "" ? (
              <div className="text-sm mb-2 text-center">{message}</div>
            ) : null}
            <div className="mb-5">
              <div>
                <div className="flex justify-between">
                  <div>
                    <div>
                      <label className="text-sm">Image Title</label>
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="border border-black border-solid rounded outline-none py-1 px-2"
                        onChange={(e) => setImageTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="text-sm">Image URL</label>
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="border border-black border-solid rounded outline-none py-1 px-2"
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <button
                    className="bg-blue-500 rounded-md py-2 px-5 text-white"
                    onClick={saveImage}
                  >
                    Save Image
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="mt-5 text-center">
              <div>
                <input
                  type="text"
                  className="border border-black border-solid rounded outline-none py-1 px-2"
                  onChange={(e) => setGetImageTitle(e.target.value)}
                />
              </div>
              <div className="text-center mt-3">
                <button
                  className="bg-blue-500 rounded-md py-2 px-5 text-white"
                  onClick={getImage}
                >
                  Get Image
                </button>
              </div>
              <div className="bg-white w-full h-[50px] border border-black border-solid rounded-md mt-3 text-center">
                {returnedUrl ? returnedUrl : ""}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

The code above contains a basic UI for our smart contract. The code imports the `useCelo` hook from the `"@celo/react-celo"` library, as well as the `useState` and `useRef` hooks from React.

The component defines several state variables using the `useState` hook, which is used to store user inputs and the results of the contract function calls. From the `useCelo` hook, we destructured a `connect` function that gets called when the user clicks on the Connect Wallet button to connect their wallet, the `address` to get the wallet address of the user for when the user has successfully connected their wallet to the Dapp, and `kit`, which is a MiniContractKit provided by Celo to enable us to instantiate a Contract.

In the component, we also define a contract address and two functions, saveImage() and getImage(), which interact with the smart contract using the `“@celo/react-celo”` library.

In the `saveImage` and `getImage` functions, to instantiate a contract, create a contract variable and assign a new `kit.connection.web3.eth.Contract` object. Give it the ABI and address of your contract stored in the `imageStorageContractAddress` variable, and it will convert your function calls into RPC. Now you can interact with your smart contract as if it were a JavaScript object.

Now that you have an instance of the contract that you can interact with, you can call its functions/methods.

The component renders the Connect Wallet button when a user just visits the site and hasn’t connected their wallet, and after a user successfully connects their wallet the component renders a form with two input fields for adding a new image to the contract and a button for submitting the form. When the user clicks the "Save Image" button, the `saveImage()` function is called to add the image to the contract. Below the form is a second input field and a button for retrieving a previously saved image from the contract. When the user clicks the "Get Image" button, the `getImage()` function is called to retrieve the image from the contract and display it on the page.

In your terminal pointing to the react-app folder, run this command to start up the React server

```bash
yarn run dev
```

The application should open at `localhost:3000` if you have no other application running on that port.

When you open the application, you should have a UI like this.

![image](https://user-images.githubusercontent.com/71826391/226184414-563d7d8e-4196-4a98-9e94-62094b8242f4.png)

Clicking on the Connect Wallet button opens up a modal that asks you to choose a wallet to connect to. Select the celo-extension-wallet and then a prompt opens for you to confirm connection to the Dapp. Once you successfully connect your wallet, the component renders this UI.

![image](https://user-images.githubusercontent.com/71826391/226184451-e04a38c2-4b44-4f87-9052-3bf28a833d65.png)

## Conclusion

In this tutorial, we learnt how to create a smart contract dapp using celo-composer. We created a basic smart contract as well as a basic Dapp to interact with our smart contract. We were able to connect a wallet to our dapp and instantiate a contract using the react-celo library.

## Next Step

This is the link to the [github repo](https://github.com/J0shcodes/celo-composer-dapp) that contains the link to this tutorial if you are interested in cloning and running the code

## About the Author

I am a React frontend developer with over 3 years of experience building for the web, a web3 developer, and a technical writer. Visit my [GitHub profile](https://github.com/J0shcodes) to see some of the projects I have worked on and currently working on.

## Reference

If you wish to read more on celo-composer and react-celo check out these docs:

- official github page of [celo-composer](https://github.com/celo-org/celo-composer)
- [react-celo docs](https://docs.celo.org/developer/react-celo)
