---
title: Composer Series - Build a Crowdfunding ReFi dApp with Celo Composer
description: How to quickly create and deploy a full-stack crowdfunding dApp on Celo.
authors:
  - name: Ernest Nnamdi
    title: Developer Relations, Celo Foundation
    url: https://github.com/Ernesto-tha-great
    image_url: https://github.com/Ernesto-tha-great.png
tags: [React, composer, crowdfunding, foundsation]
hide_table_of_contents: false
---

# Composer Series: Build a Crowdfunding ReFi dApp with Celo Composer

How to quickly create and deploy a full-stack crowdfunding dApp on Celo.

---

![header](../src/data-tutorials/showcase/advanced/celo-composer-build-a-crowdfunding-refi-dapp-with-celo-composer.png)

Gm. 😎

### A quick primer on ReFi

Even the mildly curious amongst you must have had an earful about ReFi. What is ReFi you might wonder?

It means Regenerative Finance, which is shifting the economy by transferring control of capital to communities most affected by racial, economic, and environmental injustices.

Celo's commitment to building financial systems with the objective to regenerate our planet is evident, even with its launch date as Celo Mainet was launched on Earth day. This commitment is what gave birth to the Celo climate collective. A brilliant example of a platform in tune with Celo ReFi objectives is Kickstarter.

It is a platform where creatives and organisations that would have otherwise been bereft of funding, raise funds to bring their objectives and goals to life. It is on this premise that we decided that the best first project for the Celo Composer should be a crowdfunding application.

### Celo Composer:

This is a toolkit created by Celo to help abstract away the complexities involved in setting up a development and deployment environment for building deFi applications.

This toolkit is fully set up to run on the Celo blockchain and requires little to no configurations from you. Currently, the toolkit supports React, Angular, React-Native and Flutter.

> Well well, away from the formalities and straight to the crux of the matter.

Here's a list of what we'll cover:

- ✅ Step 1: Setting up your environment.
- ✅ Step 2: Create your smart contract.
- ✅ Step 3: Deploy your smart contract.
- ✅ Step 4: Getting started on the frontend.
- ✅ Step 5: Interact with your smart contract from the frontend.
- ✅ Step 6: Deploy your DeFi application.

By the end of this article, you'll be able to create, deploy and interact with crowdfunding smart contracts on Celo's ultralight blockchain.

---

### What are we building?

In this article, we are building a crowdfunding DeFi application. This is in line with Celo Foundation's commitment to reversing the effects of climate change on our environment using web3 technology. You can read more about Celo's Climate Collective [here](https://climatecollective.org/).

![complete-image](https://miro.medium.com/max/720/0*aeHTLiiQ8gqlyBgh)

![complete-image2](https://miro.medium.com/max/720/0*EchvtClmwGgRLPVu)

You can find the complete project on [Github](https://github.com/Ernesto-tha-great/celo-crowdfunding), follow the commands in the `README.md` file.

Let's get building!

---

### Prerequisites

- Celo
- React
- Solidity

### Setting up your environment:

Navigate to the [project repo](https://github.com/celo-org/celo-composer) and select `Use this template`.

![complete-image2](https://miro.medium.com/max/720/0*TcLFNIlvaEdvGbVJ)

Refer to this [comprehensive guide](https://developers.celo.org/build-celo-dapps-in-15-minutes-or-less-438ea954d0b1) on setting up your Celo Composer development environment. From there you can quickly build, iterate and deploy new dApps on the Celo blockchain.

---

### Step 1: Create your smart contract

- Navigate to `packages/hardhat/contracts/` and create a new file called `CrowdFund.sol`.

- Copy the code here and paste it into the `CrowdFund.sol` file

![crowd-fund](https://cdn-images-1.medium.com/max/800/1*Ag6zmupqqWK-ENr7lsibUA.png)

Your `CrowdFund.sol` file should now look like this.

Create another file in your contracts folder called `Project.sol`.

```
packages/hardhat/contracts
```

Copy the code [here](https://gist.github.com/Ernesto-tha-great/4f129e7b7c09fea285f22f90a9cd17b8) and paste it in your `Project.sol` file, and now your file should look like this.

![project](https://cdn-images-1.medium.com/max/800/0*Zd7doHFo1u8Th_RI)

---

### Step 2: Write your deploy script

Now that your smart contract is complete, you'll update the deploy script. This will enable you to deploy this smart contract to the Celo blockchain.

Open the file `packages/hardhat/deploy/00-deploy.js`. Copy the deploy function below and paste it into the file.

```
await deploy("CrowdFund", {
from: deployer,
//args: [ "Hello", ethers.utils.parseEther("1.5") ],
log: true,
});
```

Ensure your `CrowdFund` deployment function looks like this:

![project](https://cdn-images-1.medium.com/max/800/1*MVSGVEX8v0qtMGhTqe7J9w.png)

Scroll to the bottom of your `00-deploy.js` file and add your deployment to the module export tags.

```
module.exports.tags = ["CrowdFund"];
```

---

### Step 3: Deploy your smart contract

Now you are done with the smart contract and it's time to deploy it. You can deploy your smart contract and it will be visible on the [Celo block explorer](https://explorer.celo.org/alfajores/)

Open your terminal and run `yarn deploy` from within the `packages/hardhat`folder.

```
yarn deploy
```

#### View smart contract

Open [Celo Block Explorer (Alfajores Testnet)](https://explorer.celo.org/alfajores/) and paste the transaction or deployed address if you would like to view the transaction or smart contract. You can also check your wallet to confirm that the gas fee has been deducted from your balance.

---

### Step 4: Getting started on the front-end

Navigate to the React app by running the following command on your terminal.

```
cd ../react-app

```

#### Adding tailwind css

Follow the [official tailwind guide](https://tailwindcss.com/docs/guides/nextjs) to add tailwind to your project. After that, delete everything in the tailwind.config.css file that was generated automatically for you and replace it with this code.

![tailwind](https://cdn-images-1.medium.com/max/800/0*9HIsSb57N97rj5EJ)

Create a new folder called `styles` in your react-app directory, and also create a new file in the styles folder called `global.css`. Paste [this code](https://gist.github.com/Ernesto-tha-great/4f129e7b7c09fea285f22f90a9cd17b8) into the `global.css` file.

Your `global.css` file should now look like this:

![global-css](https://cdn-images-1.medium.com/max/800/0*tccTF9pFHYqebPj8)

- The final setup for our tailwind configuration is to import the `global.css` file into the `pages/\_app.tsx` file.

- Simply add `import ../styles/global.css` to the list of imports and voila! you are ready to start using tailwind in your project.

- Next stop, is the `pages/index.tsx` file. Delete everything in the file and paste it in this [code](https://gist.github.com/Ernesto-tha-great/4f129e7b7c09fea285f22f90a9cd17b8). Your `index.tsx` file should look like this:

Now, navigate to the layout/AppLayout which is nested in the components folder and update the function with the code below.

```
<div className="min-h-screen gradient-bg-welcome">
<Header />
<Meta title={title} description={description} />
{children}
</div>
```

![applayout](https://cdn-images-1.medium.com/max/800/0*x1LMqPzHyaUzT0JA)

The above should be what your `AppLayout.tsx` file will look like. Similarly, for the `layout/Header.tsx`file, delete everything and paste in this [code](https://gist.github.com/Ernesto-tha-great/e86e907206e3e294d68dda9f30235002). Your `Header.tsx`component should now look like this.

![applayout](https://cdn-images-1.medium.com/max/800/1*RyR4JI_cK0St0kXoyy9pCg.png)

Back in the `react-app/components` folder, create three new files. `Input.tsx`, `ProjectCard.tsx` and `Welcome.tsx`. Populate these files by copying their respective codes from [here](https://gist.github.com/Ernesto-tha-great/4f129e7b7c09fea285f22f90a9cd17b8).

#### Welcome.tsx

Your `Welcome.tsx` file should look like this.

![applayout](https://cdn-images-1.medium.com/max/800/0*gEmCCKpWSrIPrRHn)

---

#### Code Walkthrough:

##### Contract Instance

```
const contract = contractData
? (new kit.connection.web3.eth.Contract(
contractData.abi,
contractData.address
) as any as CrowdFund)
: null;
```

This method connects your React app to the smart contract you deployed earlier. It accepts two arguments which are the `contractData.abi` and the `contractData.address`. kit comes from the `useCelo()` which is gotten from the Celo composer toolkit. contractData is passed onto the `Welcome.tsx` component as a prop from the `pages/Index.tsx` component.

For reference, this is the function that creates the property `contractData` in `pages/Index.tsx`

```
const contracts =
deployedContracts[network?.chainId?.toString()]?.[
network?.name?.toLocaleLowerCase()
]?.contracts;
```

** deployedContracts ** is derived from the import statement:

```
import deployedContracts from "@celo-composer/hardhat/deployments/hardhat_contracts.json";
```

This fetches all deployed contracts from the `packages/hardhat/deployments` folder.

#### Contract Interaction

```
const createProject = async () => {
const stableTokenAddress = await kit.registry.addressFor(CeloContract.StableToken)
const gasPriceMinimumContract = await kit.contracts.connection.gasPrice()
const {title, desc, img, duration, goal } = formData;
await contract.methods.startProject(stableTokenAddress, title, desc, img, duration, goal).send({from: address, gasPrice: gasPriceMinimumContract})
}

```

This functions interacts with your smart contract by calling it methods, which are functions declared in your smart contract. `kit` and `address` are obtained from the `useCelo()` function and makes easy, the task of getting your `stableTokenAddress`, `gasPrice`and your `address`. Your address is gotten when you login with your metamask wallet. This is done in the `components/layout/Header.tsx` component.

For reference, this is the code block that fetches your wallet address and logs you into the application.

```
{!address ? (
<button onClick={() => connect().catch(e => console.log(e))} className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
Login
</button>
) : (

<li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
{truncateAddress(address)}
</li>
)}
```

The `connect()` method is derived from `useCelo()`.

The await contract.methods.startProject() calls the `startProject function` in our `CrowdFund.sol` contract and passes in the required props defined in the contract.

#### Project Contract Instance

```
const fetchProjects = async () => {
const result = await contract.methods.returnProjects().call();
const data2 = []
for (let i = 0; i < result.length; i++) {
const projectContract = contractData
? (new kit.connection.web3.eth.Contract(
deployedContracts.abi,
result[i]
) as any as Project)
: null;
const data = await projectContract.methods.getDetails().call()
const structuredData = {
projectCreator: data.projectCreator,
projectTitle: data.projectTitle,
projectDescription: data.projectDescription,
projectImageLink: data.projectImageLink,
fundRaisingDeadline: data.fundRaisingDeadline,
projectGoalAmount: data.projectGoalAmount
}
data2.push(structuredData)
}
setResults(data2)
}

```

The `fetchProjects` function nested in the `useEffect` hook interacts with two contracts. The `CrowdFund.sol` to call the `returnProjects()`function to return the address of all created projects and then loop through these addresses to create a new instance of projectContract by passing the `deployedContracts.abi` which is the `Project.sol`abi and `result[i]` which is the address of the projects created.

**_ Note:_** Only the `CrowdFund.sol` was deployed. The `Project.sol` contract was not deployed. A new instance of the Project contract is created each time we want to interact with the contract methods.

After creating an instance of the contract, we call the `await projectContract.methods.getDetails()` which is a function in the `Project.sol`contract for returning the details of each created project.

---

### Congratulations! 🥳

That brings to a close, today's topic on how to quickly build a CrowdFunding dApp on Celo. You can review each of the items we covered below and check that you've learnt each of them.

Here's a quick review of what we covered 🤔

- ✅ Step 1: Setting up your environment.
- ✅ Step 2: Create your smart contract.
- ✅ Step 3: Deploy your smart contract.
- ✅ Step 4: Getting started on the frontend.
- ✅ Step 5: Interact with your smart contract from the frontend.
- ✅ Step 6: Deploy your DeFi application.

Hopefully, you now have a good understanding of how to add and deploy your smart contracts on Celo and interact with them on the frontend. This project was created as an example of how to deploy on Celo and also use the Celo composer toolkit.

As a challenge, you could take it a step further by adding the functionality for contributing to a project and also disbursement of funds at the end of a project.

Till next time,

GN! 👋

> Check out this project out on [Github](https://github.com/Ernesto-tha-great/celo-crowdfundingd). Design Inspiration JavaScript Mastery

<!--truncate-->
