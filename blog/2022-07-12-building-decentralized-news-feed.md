---
title: Composer Series - Building a decentralized news feed with Celo Composer
description: Build a decentralized news feed using React, Tailwind, IPFS, and Celo Composer.
authors:
  - name: Ernest Nnamdi
    title: Developer Relations, Celo Foundation
    url: https://github.com/Ernesto-tha-great
    image_url: https://github.com/Ernesto-tha-great.png
tags: [React, IPFS, composer]
hide_table_of_contents: false
slug: tutorials/building-a-decentralized-newsfeed-with-celo-composer
---

# Composer series - Building a decentralized news feed with Celo Composer

**Hello, friends! 🙋🏾‍♂️ **

![header](../src/data-tutorials/showcase/intermediate/celo-composer-building-a-staking-defi-dapp.png)

### Stacks

** What is the conventional wisdom for getting involved in web3? ** Something involving solidity.

What does this look like for you as a web2 developer seeking to make this transition? New language? - definitely, but also a headache of new tools and frameworks to learn and getting conversant with. The learning curve between you and your excellent Defi app causes light (or heavy) showers on your parade.

> As a developer evangelist, I won't be doing my job if I didn't tell you there is a better way out. The blockchain space is still very much in the "developer phase," and companies, protocols, and blockchains now have the responsibility of lowering the barrier to entry by making it easy to break into blockchain from traditional web/mobile development.

This is an area where Celo stands clear of other blockchains and protocols with its impeccable SDKs, APIs, and toolkits.
Speaking of toolkits, we will use the Celo Composer toolkit today.

---

### Celo Composer

The Celo Composer is a starter pack built on the [react-celo](https://github.com/celo-org/react-celo) toolkit to get you up and running fast in developing DApps on the Celo blockchain.

This starter pack is best suited for web2 developers currently transitioning into web3 as it abstracts all the complexities involved in setting up and developing Defi applications and replaces it with a plug-and-play environment.

The starter pack, which currently supports React, React-Native, and Flutter requires little to no configurations from you as it eases you into the web3 sphere.

> Now to the crux of the matter

Here's a list of what we'll cover in this article:

- ✅ Step 1: Setting up your environment.
- ✅ Step 2: Creating your smart contract.
- ✅ Step 3: Deploying your smart contract.
- ✅ Step 4: Getting started with the frontend.
- ✅ Step 5: Interacting with your smart contract from the frontend.

---

### What are we building?

In this article, we are using the Celo Composer starter-kit, which comes pre-integrated with NextJs, Tailwind CSS, and IPFS HTTP client, to build a decentralized news feed where users can connect their wallets and share news as it happens around them and also read submissions from others.

![full-build](https://miro.medium.com/max/4800/0*8Nvc7s1Z8RRf9rBy)

This is what the final project looks like. If your learning style is "head first," then you can find the complete code for this project on [Github](https://github.com/Ernesto-tha-great/composer-react-ipfs).

Do follow the commands in the `README-md` file to get started with setting up your project.

#### Prerequisites

- Solidity
- React
- Tailwind

---

### Setting up your environment

There are two options to setting up your environment.

** Using the Template:** Navigate to the [Celo Composer](https://github.com/celo-org/celo-composer) repository and follow the step by step guide entailed in the `README-md` .

![celo-composer](https://miro.medium.com/max/4800/1*qD1LSXBWSYAlwQL8GijNoA.png)

** Using the CLI: ** The Celo Composer CLI is the easiest way to setup your environment because unlike the first option, it only installs dependencies and boilerplate code necessary for the framework you intend to use.

```
npx @celo/celo-composer create

```

Running this command throws up a prompt for you to select the framework of your choice and youre fully setup to start using the starter-kit.

![celo-composer](https://github.com/celo-org/celo-composer/blob/main/images/readme/image-1.png?raw=true)

To install dependencies locally and setup test wallet, please refer to the `README-md`.

---

### Step 1: Create your smart contract ✅

- On your terminal, make sure you are in the root directory and then navigate to the contracts folder by running the following command:

```
cd packages/hardhat/contracts
```

- Create a new file in the `contracts` folder called `NewsFeed.sol`
- Copy the smart contract code from [here](https://gist.github.com/Ernesto-tha-great/14ca6cb9595fa270ad76d243f1c857a7) and paste it into the file you created, and now your `NewsFeed.sol` file should look like this:

![newsfeed.sol](https://miro.medium.com/max/4800/0*CObM8WyKCWtu9rrd)

---

### Step 2: Write your deploy script ✅

After setting up our environment and saving our smart contract in our newly created file, the next step is to update the deploy script to be able to compile and deploy our smart contract to the blockchain.

- Navigate to the `packages/hardhat/deploy/00-deploy.js` file, and you'll see the deploy function for the greeter contract( A sample contract that comes with the starter kit).

```
await deploy("Greeter", {
    from: deployer,
    args: ["hello world"],
    log: true,
})
```

- Update the function to deploy our NewsFeed instead by replacing the function with this.

```
await deploy("NewsFeed", {
    from: deployer,
    log: true,
})
```

- Once that is done, scroll to the bottom of the page and update the exports by adding NewsFeed to them, and voila, you are done! This is all the setup that is required on the backend.

```
module.exports.tags = ["NewsFeed"];
```

---

### Step 3: Deploy your smart contract ✅

Now we are done with the smart contract and have updated our deploy script; next is deploying the smart contract to the blockchain. To do this, run a straightforward command. Go back to your terminal, ensure you're on the correct directory, i.e., `packages/hardhat`, then run

```
yarn deploy
```

#### View smart contract

Open [Celo Block Explorer (Alfajores Testnet)](https://explorer.celo.org/alfajores/) and paste the transaction or deployed address to view the transaction or smart contract. You can also check your wallet to confirm that the gas fee has been deducted from your balance.

---

### Step 4: Getting Started on the frontend ✅

Navigate to the React app by running the following command on your terminal.

> Note: No worries if you have closed the terminal you used in deploying your smart contract! Ensure you are in the root directory of your application, then run the following

```
cd packages/react-app
```

If not, run the following

```
cd ../react-app
```

> Note: This presumes you followed the env setup guide and have installed the dependencies already

#### Tailwind CSS

Follow the official [tailwind guide](https://tailwindcss.com/docs/guides/nextjs) to add tailwind to your project.

After that, delete everything in the `tailwind.config.css` file generated automatically for you and replace it with [this](https://gist.github.com/Ernesto-tha-great/8f19bfcac196a14033c4efcbbe93af97) code.

Your `tailwind.config.js` file should look like this now.

![tailwind](https://miro.medium.com/max/4800/0*kIXClebX-YmACc5v)

Create a new folder called styles in your react-app directory and a new file in the `styles` folder called `global.css`. Paste [this code](https://gist.github.com/Ernesto-tha-great/dec135c491ecd11f081ea5648e7203a8) into the `global.css` file.

Your `global.css` file should now look like this:

![tailwind](https://miro.medium.com/max/4800/0*6rPTFzfTtdFvq0-v)

The final setup for our tailwind configuration is to import the `global.css` file into the `pages/_app.tsx` file. Add

```
 import ../styles/global.css
```

to the list of imports, and voila! You are ready to start using tailwind in your project.

The next stop is the `pages/index.tsx file`. Delete everything in the file and replace it with [this code](https://gist.github.com/Ernesto-tha-great/8b698bf944ac622f8c12e36236401039). Your `index.tsx`file should look like this:

![index.tsx](https://miro.medium.com/max/4800/0*EGFvak1xkxAtUraE)

---

#### AppLayout.tsx

Now, navigate to the `layout/AppLayout` which is nested in the `components` folder and update the function with the code below:

```
import * as React from "react";
import Meta from "../meta/Meta";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AppLayout({ title, description, children }: Props) {
  return (
    <div className="bg-gray-200 flex-1 h-full">
      <Header ToastContainer={ToastContainer} />
      <Meta title={title} description={description} />
      {children}
      <Footer />
    </div>
  );
}

```

![AppLayout.tsx](https://miro.medium.com/max/4800/0*p45TCmCIifBoNWwB)

#### Header.tsx

Still in the layout folder, Navigate to the `layout/Header.tsx` file and replace the existing code with [this](https://gist.github.com/Ernesto-tha-great/316d0045087166ac68f9fcfeadeb7d03).

![header.tsx](https://miro.medium.com/max/4800/0*JxdqkWMfhTxAVzro)

#### Footer.tsx

Same for the `layout/Footer.tsx` file. Replace the existing code with this:

```
import * as React from "react";
import { Link } from "@mui/material";
import Github from "@/public/Github";
import Discord from "@/public/Discord";

export default function Footer() {
  const githubLink = "https://github.com/celo-org/celo-composer";
  const discordLink = "https://discord.gg/cGCE9p9352";

  return (
    <footer className="flex flex-col items-center justify-center mt-20">
      <h3 className="font-medium">Powered by Celo Composer</h3>
      <div className="flex">
        <Link href={githubLink} target="_blank">
          <Github style={{ width: "40px", margin: "5px" }} />
        </Link>
        <Link href={discordLink} target="_blank">
          <Discord style={{ width: "40px", margin: "5px" }} />
        </Link>
      </div>
    </footer>
  );
}
```

#### FeedList.tsx

Navigate to the `react-app/components` folder and create a new file called `FeedList.tsx`. In your newly created file, paste [this code](https://gist.github.com/Ernesto-tha-great/c7136b5704d0be3209dc1807b2157a81) into it. Your `FeedList.tsx` file should now look like this.

![FeedList.tsx](https://miro.medium.com/max/4800/0*sk8-sEUViakw7Z-D)

#### Feed.tsx

Still in the components folder, create another file called `Feed.tsx`. In this new file, paste the following [code](https://gist.github.com/Ernesto-tha-great/b8c979cfdc90dc7d9000d342fba41c86) into it.

![Feed.tsx](https://miro.medium.com/max/4800/0*zizb1NfYA-4BgSH6)

This concludes everything we have to do in the components folder.

---

### Step 5: Interacting with your smart contract from the frontend  ✅

#### HomePage.tsx

Navigate to `react-app/pages` directory, and create a new file called `HomePage.tsx`. Please copy the code from [here](https://gist.github.com/Ernesto-tha-great/4fdbe33cefdd51c3dad5ca3895f12037) and paste it into your newly created file.

![HomePage.tsx](https://miro.medium.com/max/4800/0*iDh6SevKhdx-vuY5)

![HomePage](https://miro.medium.com/max/4800/0*P9eQ7Fgu11qCy57R)

#### Code walkthrough

```
  const { kit } = useCelo();
```

The kit function, which allows you to create a new contract instance, is obtained from the `useCelo()` function. This function is part of the `react-celo` hook, formerly called `use-contractkit`. This manages access to Celo with a built-in headless modal system to connect to your users' wallet of choice. You can explore the `react-celo` hook further [here](https://github.com/celo-org/react-celo).

```
const contract = contractData
    ? (new kit.connection.web3.eth.Contract(
        contractData.abi,
        contractData.address
      ) as any as NewsFeed)
    : null;

```

This function creates a new instance of the contract by leveraging the `kit` function and passing as arguments, the abi and address which is contained in the contractData prop. This prop is being passed onto your HomePage from the `Index.tsx` file.

```
const getFeeds = async () => {
    try {
      setLoading(true);
      const AllFeeds = await contract.methods.getAllFeeds().call();
      /*
       * We only need title, category, coverImageHash, and author
       * pick those out
       */
      const formattedFeed = AllFeeds.map((feed: any) => {
        return {
          id: feed.id,
          title: feed.title,
          category: feed.category,
          coverImageHash: feed.coverImageHash,
          author: feed.author,
          date: new Date(feed.date * 1000),
        };
      });

      setFeeds(formattedFeed);
      setLoading(false);
    } catch (err) {
      error(`${err.message}`);
    }
  };
```

The `getFeeds` function, as the name implies, fetches all available feeds by querying the contract using the "contract" instance we created earlier. `Contract.methods` is how we access the functions or methods declared in the smart contract. `getAllFeeds()` is a function in the contract `NewsFeed.sol`. The rest of the code is basic javascript.

---

#### FeedPage.tsx

Please create a new file in the public directory called `FeedPage.tsx` and paste the following [code](https://gist.github.com/Ernesto-tha-great/4fdbe33cefdd51c3dad5ca3895f12037) into it.

![FeedPage.tsx](https://miro.medium.com/max/4800/0*YDXBe3oq1ESFVQN6)

![FeedPage](https://miro.medium.com/max/4800/0*nmFAzwGe-iLncBTk)

> This image is what the Feed page looks like after the feeds have been created.

#### Code walkthrough

```
const contractDataS =
    deployedContracts[network?.chainId?.toString()]?.[
      network?.name?.toLocaleLowerCase()
    ]?.contracts;
```

This is a similar function to the one in the `index.tsx` file. It returns all deployed contracts.

```
 const contractData = contractDataS.NewsFeed;
```

Here we select the particular deployment we want which is the NewsFeed contract we deployed at the beginning and assign it to a constant called contractData.

```
const contract = contractData
    ? (new kit.connection.web3.eth.Contract(
        contractData.abi,
        contractData.address
      ) as any as NewsFeed)
    : null;
```

This function, the same as on the home page, creates an instance of the contract.

```
const getFeed = async () => {
    try {
      let feedId = getUrlValue()["id"];
      const allFeed = await contract.methods.getAllFeeds().call();
      const singleFeed: any = allFeed.filter((feed: any) => feed.id === feedId);

      // Format feed
      const formattedFeed = {
        id: singleFeed[0].id,
        title: singleFeed[0].title,
        description: singleFeed[0].description,
        location: singleFeed[0].location,
        category: singleFeed[0].category,
        coverImageHash: singleFeed[0].coverImageHash,
        date: singleFeed[0].date,
        author: singleFeed[0].author,
      };

      setFeed(formattedFeed);
    } catch (error) {
      console.log(error);
    }
  };
```

This function gets all the feeds and filters the result to return the feed whose id matches the id passed in.

The `getRelatedFeeds()` is quite similar to the `getFeed()` function. The difference being it takes the getFeed function a little further and filters the results based on categories.

---

#### UploadPage.tsx

In the `pages` directory, create one more file called `UploadPage.tsx` and paste the following [code](https://gist.github.com/Ernesto-tha-great/4fdbe33cefdd51c3dad5ca3895f12037) into it.

![UploadPage.tsx](https://miro.medium.com/max/4800/0*QTGglbBnVsH-LMNj)

#### Code walkthrough

```
const client = create("https://ipfs.infura.io:5001/api/v0");
```

The above function creates an IPFS node and assigns it to a constant called client.

```
const uploadCoverImage = async (coverImage: ImportCandidate) => {
    defaultToast("Uploading Cover Image...");

    try {
      const image = await client.add(coverImage);
      await saveFeed(image.path);
    } catch (err) {
      error("Error Uploading Cover Image");
    }
  };
```

The uploadCoverImage function nested in the `handleSubmit()` function, takes in the image uploaded by the user and uploads it to IPFS. Then it calls the `saveFeed()` function while passing in the path to the image.

```
 const saveFeed = async (coverImage: string) => {
    defaultToast("Saving Feed...");
    console.log(title, description, category, location, coverImage);

    try {
      const UploadedDate = String(new Date());
      console.log("contract", contract);
      const gasPriceMinimumContract = await kit.contracts.connection.gasPrice();
      await contract.methods
        .createFeed(
          title,
          description,
          location,
          category,
          coverImage,
          UploadedDate
        )
        .send({ from: address, gasPrice: gasPriceMinimumContract });

      success("Feed Saved Successfully");

      // reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setLocation("");
      setCoverImage("");

      // Redirect to Home Page
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      error("Error Saving Feed");
    }
  };

```

The saveFeed function takes the path to the image from the earlier function.

```
 const gasPriceMinimumContract = await kit.contracts.connection.gasPrice();
```

This particular code block is for gas price estimation. It describes the amount of gas to be used for the transaction. The following block of code uses `contract.methods` to access the `createFeed` function declared in the `NewsFeed.sol` contract.

When adding information to the blockchain, we use the `send()` function (Recall in earlier contract interactions, we use `call()` function ), and it accepts two arguments, `from` and `gasPrice`. We pass the address of the user calling the contract obtained from the `useCelo()` function and the gasPriceMinimumContract as values for the arguments.

This function, when called, creates a new NewsFeed entry and saves it on the blockchain.

![HomePage](https://miro.medium.com/max/4800/0*5u_l3N7JufLjNMVf)

![HomePage](https://miro.medium.com/max/4800/0*IIrb4gk0ydlwzYQh)

---

### Congratulations

This brings to a fruitful end today's topic on building a decentralized news feed using Celo Composer and IPFS. You can review the checklist below and confirm that you have learned each.

Here is a quick recap of everything we covered.

- ✅ Step 1: Setting up your environment.
- ✅ Step 2: Creating your smart contract.
- ✅ Step 3: Deploying your smart contract.
- ✅ Step 4: Getting started on the frontend.
- ✅ Step 5: Interacting with your smart contract from the frontend.

---

#### Challenge

Once more, I have left some homework for you to get your hands dirty.
Refer to the `FeedPage.tsx` file. Now in the `getFeed()` function, focus on the line below:

```
  const allFeeds = await contract.methods.getAllFeeds().call();
  const singleFeed: any = allFeeds.filter( (feed: any) => feed.id === feedId );
```

A better way to handle this would be to use the `contract.methods` function to call the `getFeed()` function in the `NewsFeed.sol` contract while passing in feedId as a parameter.

- Repeat the same for the `getRelatedFeeds()` function

Share your results or questions on the [discord](https://discord.com/invite/cGCE9p9352) channel (Please ask all questions in the Celo composer channel for visibility).

Till next time,

Adios !! ✌🏾

> Check this project out on [Github](https://github.com/Ernesto-tha-great/composer-react-ipfs). Design Inspiration [Olanetsoft](https://olanetsoft.medium.com/)

<!--truncate-->

```

```
