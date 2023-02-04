---
title: Composer Series - Building a Staking Defi App with Celo Composer and React
description: Building a Defi application to create, stake and receive rewards on your token using Celo composer.
authors:
  - name: Ernest Nnamdi
    title: Developer Relations, Celo Foundation
    url: https://github.com/Ernesto-tha-great
    image_url: https://github.com/Ernesto-tha-great.png
tags: [React, composer]
hide_table_of_contents: false
---

# Composer Series - Building a Staking Defi App with Celo Composer and React

![header](../src/data-tutorials/showcase/intermediate/celo-composer-building-a-staking-defi-dapp.png)

**Hello there!! 🙋🏾‍♂️**

This is the third instalment of the composer series where I demonstrate how to build defi applications in no time using the Celo-composer. The first two instalments were [Building a crowdfunding refi dapp using celo composer and react](https://developers.celo.org/composer-series-build-a-crowdfunding-refi-dapp-with-celo-composer-d1a169f8a78d) and [Building a decentralized newsfeed with Celo composer, React, and IPFS](https://developers.celo.org/composer-series-building-a-decentralized-news-feed-with-celo-composer-a85b25027609).

### The Radical Shift

So here I’m thinking that every company, tech or otherwise will eventually come to be functionally web3-savvy to various degrees. Ultimately, if they play in these climes for long enough.

We have more companies globally, waking up to the fact they can do more with blockchain technology. This means, of course, they are probably already sighing at the tedium that comes with migrating to or incorporating web3 into their existing systems.

> _Blockchain companies are now burdened with the task of juggling both providing vital services and lowering the learning curve. At the critical merge point ( the point where new tech is introduced into the work dynamic), plan-to-execution time drops significantly ( this is precipitated by the need to work in a different way that requires the usage of the particular tech i.e web3 in this instance)_.

The obvious solution then becomes creating solutions that ease developers into web3. This my friends is where Celo stands clear of the crowd. In what regard you may ask? The success of web3 and the full potential of blockchain technology can only be realised with massive adoption. Without adoption, there will be no reason to build. That’s why Celo has taken the lead in the industry by providing tooling to support developers of all levels, from the expert to the web2 developer still toying with the idea of building defi applications. One of such tools is the Celo composer.

---

## Celo Composer

The Celo Composer is a starter pack built on the [react-celo](https://github.com/celo-org/react-celo) toolkit to get you up and running fast in developing DApps on the Celo blockchain. This starter pack is best suited for web2 developers currently transitioning into web3 as it abstracts all the complexities involved in setting up and developing Defi applications and replaces them with a plug-and-play environment.

The starter pack, which currently supports React, React-Native, and Flutter requires little to no configurations from you as it eases you into the web3 sphere.

> _Now for today’s project_

Here’s a list of what we’ll cover in this article:

- ✅ Step 1: Setting up your environment.
- ✅ Step 2: Creating your smart contract.
- ✅ Step 3: Deploying your smart contract.
- ✅ Step 4: Getting started with the frontend.
- ✅ Step 5: Interacting with your smart contract from the frontend.

---

### What are we building?

In this article, we are going to use the Celo Composer starter-kit which comes pre-integrated with NextJS, and also Tailwind for styling. This dapp will allow users whose wallet are connected, stake their tokens and earn returns on them.

![full-build](https://miro.medium.com/max/4800/0*8UV5xiy9CCQnbyDW)

This is the end result of our project today. If your learning style is “code first”, you can find the complete code for this project here on [Github](https://github.com/Ernesto-tha-great/celo-composer-staking-dapp).

Do follow the commands in the `README-md` file to get started with setting up your project.

#### Prerequisites

- Solidity
- React
- Tailwind

### Step 1: Setting up your environment ✅​

There are two options to setting up your environment.

#### Using the Template:

Navigate to the [Celo Composer repository](https://github.com/celo-org/celo-composer) and follow the step by step guide entailed in the `README-md`.

![celo-composer](https://miro.medium.com/max/4800/0*47Y0jaOPK8oY94BT)

#### Using the CLI:

The Celo Composer CLI is the easiest way to setup your environment because unlike the first option, it only installs dependencies and boilerplate code necessary for the framework you intend to use.

```
npx @celo/celo-composer create
```

Running this command throws up a prompt for you to select the framework of your choice and you are fully setup to start using the starter-kit.

To install dependencies locally and setup test wallet, please refer to the `README-md`.

### Step 2: Creating your smart contract ✅

- Open your project on your text editor and ensure you’re on the root folder and the navigate to the `packages/hardhat` folder and rename the `.envexample` file to `.env`.

- In the `.env` file, paste in the private key of your wallet. If you are wondering where to find your private key, please refer to the `README-md` in the Celo composer repository. If you prefer to setup your metamask wallet to work with this and future projects, please refer to this [guide](https://developers.celo.org/3-simple-steps-to-connect-your-metamask-wallet-to-celo-732d4a139587).

![code](https://miro.medium.com/max/4800/1*0Zueb80HcbFhEIA_aoYUBw.png)

- Navigate to the contracts folder and here we are going to add two contracts. One for the ERC20 token we are going to be using, and our staking contract. So create two new files, `Piron.sol` and `Staking.sol` respectively.

![code](https://miro.medium.com/max/640/0*Kc47HUle_B2Qy_Ws)

- In the `Piron.sol` file, paste in [this contract](https://gist.github.com/Ernesto-tha-great/af3596a6a55f334281305f4c9b0270ec) and save. This is a basic ERC20 contract compliant with the IERC20 standards. This token whose symbol is `PTK` will serve as our staking and reward token.

![code](https://miro.medium.com/max/4800/1*GIvSjm56jsXW4KOrp2rcOA.png)

- In the `Staking.sol` file, paste in [this contract](https://gist.github.com/Ernesto-tha-great/af3596a6a55f334281305f4c9b0270ec). This is a simple staking contract that accepts the address of our token(Piron token) and assigns it to the `pirToken` variable. This contract has six functions or methods but we will only be interacting with three, which are the staking function, pause and unpause function.

![code](https://miro.medium.com/max/4800/1*hfROeIjGh9mo5BiKAkkApQ.png)

### Step 3: Deploying your smart contract ✅

After setting up and creating our smart contracts, the only thing left to do on the backend of our project is to deploy it to the blockchain. Deploying contracts using the Celo Composer toolkit is an unbelievably seamless process.

- Navigate to the deploy folder in the hardhat directory and in your `00-deploy.js` file, you will see the deployment function for the greeter contract(A sample contract that comes with the starter kit).

```
await deploy(“Greeter”, {
from: deployer,
args: [“hello world”],
log: true,
})
```

Update the function to deploy your `PironToken` and `StakePIR` by replacing the function with this

```
const piron = await deploy(“PironToken”, {
from: deployer,
log: true,
})

await deploy(“Greeter”, {
from: deployer,
args: [piron.address],
log: true,
})

```

```
module.exports.tags=["PironToken", "StakePIR"];
```

![code](https://miro.medium.com/max/4800/1*e2fOVIFi1ZGj0T5YTadA9w.png)

We have two deploy functions, the first functions (piron) deploys our staking and reward token and the second deploys our staking contract and takes as an argument, the contract address of our token(PironToken).

There you have it! All that is left to do, is to open up your terminal, navigate to the hardhat directory

```
cd packages/hardhat
```

and run

```
yarn deploy
```

This compiles your contracts and deploys them to the Celo blockchain (Alfajores testnet).

#### View smart contract

Open the [Celo Block Explorer (Alfajores Testnet)](https://explorer.celo.org/alfajores/) and paste the transaction or deployed address to view the transaction or smart contract. You can also check your wallet to confirm that the gas fee has been deducted from your balance.

---

### Step 4: Getting started on the frontend ✅

Now we are done with the hardhat folder, we move on to the `react-app` folder. Navigate to the `react-app` folder by running on your terminal

```
cd ../react-app
```

or if you are in the root directory

```
cd packages/react-app
```

#### Tailwind

Follow the official [tailwind guide](https://tailwindcss.com/docs/guides/nextjs) to add tailwind to your project.

> _Note: Ensure you are in the react-app directory before installing tailwind_.

After installing tailwind, you will notice two new files has been created for you. In the `tailwind.config.js` file, replace the boilerplate code with [this](https://gist.github.com/Ernesto-tha-great/5d4315cbf723eadf9ecebbdf86bb0a7c).

![code](https://miro.medium.com/max/4800/1*edP-vw3-5KOVCcIJg6lHWQ.png)

After updating the tailwind config file, create a new folder in the `react-app` directory called `styles`.

In this new folder, create a file called `global.css` and then paste in [this code](https://gist.github.com/Ernesto-tha-great/5d4315cbf723eadf9ecebbdf86bb0a7c). These are just basic styling and mostly gradients(most of which we are not going to use, so feel free to take advantage of them to customize your frontend).

![code](https://miro.medium.com/max/4800/1*gg_nkUARyXChgw4jGeDjng.png)

The final setup for the tailwind configuration is to import the `global.css` file in the `pages/_app.tsx` file.

```
 import “../styles/global.css”;
```

Add this below the import statements in your `_app.tsx` file and voila we are done setting up tailwind.

![code](https://miro.medium.com/max/4800/1*seSWlJKNhSuUYRJbSqWpow.png)

#### AppLayout.tsx

The first file we are going to change is the `components/layout/AppLayout.tsx` file. We are going to replace it with the following code:

```
import * as React from “react”;
import Meta from “../meta/Meta”;
import { Header } from “./Header”;
interface Props {
title: string;
description: string;
children: React.ReactNode;
}
export default function AppLayout({ title, description, children }: Props) {
return (

<div className=”flex-1 h-full bg-gray-800">
<Header />
<Meta title={title} description={description} />
{children}
</div>
);
}
```

![code](https://miro.medium.com/max/4800/1*yJb_Hos7jByxGI6gCsoghA.png)

#### Utils/Index.tsx

In the `utils` folder, you are going to add one more utility function to the `index.tsx` file. Paste in this function below

```
export function formatTime(timestamp: number) {
const milliseconds = timestamp \* 1000;
const dateObject = new Date(milliseconds);
const humanDateFormat = dateObject.toLocaleDateString()
return humanDateFormat;
}
```

---

### Step 5: Interacting with your smart contract from the frontend ✅

#### Index.tsx

Next file we are going to work on, is the `index.tsx` file. Here, we are going to delete all the placeholder code and replace it [with this](https://gist.github.com/Ernesto-tha-great/8f288243dc2f7f68b5b393d10d5b85bb)

![code](https://miro.medium.com/max/4800/1*AGYQhVPywGY5kaET2T4OZQ.png)

##### Code Walkthrough

```
const contracts =
deployedContracts[network?.chainId?.toString()]?.[
network?.name?.toLocaleLowerCase()
]?.contracts;
```

The variable `contracts` is being assigned, every deployed contract which is imported from the `deployments` folder in the `hardhat` directory. The variable is in turn, being passed in to the `HomePage.tsx`.

#### HomePage.tsx

Navigate to the `pages` directory and create a new file called `HomePage.tsx` and in this newly created file, paste in [this code](https://gist.github.com/Ernesto-tha-great/2a1b1171927aeb6820facbdb38ba6608). This will serve as as our home screen.

![code](https://miro.medium.com/max/4800/1*wug9ybHBbcFre-UHBNh-og.png)

##### Code walkthrough

```
const { kit, address } = useCelo();
```

The `useCelo()` is gotten from `react-celo` which is a React hook and the easiest way to access Celo in your React application. `Kit` is used to query onchain data while `address` returns the address of the user after the connect function has connected the wallet to the project(Refer to `components/layout/Header.tsx` to see the connect function in action).

```
const pironContract = contracts
? (new kit.connection.web3.eth.Contract(
contracts.PironToken.abi,
contracts.PironToken.address
) as any as PironToken)
: null;
```

This creates a new instance of the contract (In this case our PironToken contract). It leverages `kit` which was destructured from `useCelo()` to create a new contract instance by passing in, the `abi` and `address` of the contract.

> _Note: “contracts” was passed in to the HomePage from the Index.tsx and contains all deployed contracts if any_.

```
await pironContract.methods
.approve(contracts.StakePIR.address, “1000000000”)
.send({ from: address });
```

The above function is contained in the `submit` function and it is responsible for calling our smart contract methods or functions. This particular function calls the approve function in the pironContract and passes as arguments, the contract address of the staking contract and also a gas amount.

```
const paused = await stakingContract.methods.paused().call();
```

The above function, is quite similar to the previous in the sense that they both call methods or functions in the smart contract but do notice that theres is a difference between them. `.call()` is used in place of `.send({…})` this is because this particular function does not create a new transaction on the blockchain.

#### Input.tsx

Navigate to the `components` directory and create a file called `Input.tsx` and paste in [this code](https://gist.github.com/Ernesto-tha-great/78f9a2dfe192b55ae2e6bc427eed294b). This component is our custom input field to accept input from the frontend.

![code](https://miro.medium.com/max/4800/1*sMFzEZMcg_C2XXL3QM57DA.png)

#### ProjectCard.tsx

Still in the `components` directory, create another file called `ProjectCard.tsx` and paste [this code](https://gist.github.com/Ernesto-tha-great/78f9a2dfe192b55ae2e6bc427eed294b) in it. The ProjectCard component is a way to display all the data we fetch from the blockchain.

This card will contain relevant information about our stake contract like number of stakers, start date, end date, etc and also allow up to make some contract calls such as pause, unPause and Claim Rewards.

![code](https://miro.medium.com/max/4800/1*crqEUDo51JGvo8iGTFGLng.png)

### Conclusion

This brings to an end, this session on building with Celo composer. But your learning don’t have to end here as PRs are welcome for those who want to contribute to this project.

Here is a quick recap of everything we covered.

- ✅ Step 1: Setting up your environment.
- ✅ Step 2: Creating your smart contract.
- ✅ Step 3: Deploying your smart contract.
- ✅ Step 4: Getting started on the frontend.
- ✅ Step 5: Interacting with your smart contract from the frontend.

For those who have questions or want to be part of our developer community, join us on [discord](https://discord.com/invite/cGCE9p9352)!.

Till next time,

Adios ✌🏾

<!--truncate-->
