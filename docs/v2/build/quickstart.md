---
title: Quickstart
---

To test out deploying a dapp on Celo, we recommend using [Celo Composer](https://github.com/celo-org/celo-composer), which allows you to quickly build, deploy, and iterate on decentralized applications using Celo. It provides a number of frameworks, examples, templates and Celo specific functionality to help you get started with your next dApp.

## Prerequisites

- Node (v20 or higher)
- Git (v2.38 or higher)

## How to use Celo Composer

The easiest way to start with Celo Composer is using `@celo/celo-composer`. This CLI tool lets you quickly start building dApps on Celo for multiple frameworks, including React (and rainbowkit-celo). To get started, just run the following command, and follow the steps:

```bash
npx @celo/celo-composer@latest create
```

### Provide the Project Name: 

You will be prompted to enter the name of your project

```bash
What is your project name:
```

### Choose a smart contract development environment: 

You will be asked if you want to use Hardhat. Select Yes or No

```bash
Do you want to use Hardhat? (Y/n)
```

### Choose to Use a Pre-Built Template, highlighting Celo's unique features: 

You will be asked if you want to use a [template](#supported-templates), check [below](#supported-templates) for the options. Select Yes or No

```bash
Do you want to use a template?
```

### Select a Template: 

If you chose to use a template, you will be prompted to select a template from the list provided

```bash
# built in frontend logic to use your dapp in MiniPay, pre-built example functions for sign, transact and mint
- MiniPay 
# template built for easy Valora connectivity
- Valora 
# example project for matching your social Identifier to your wallet address, using GitHub
- Social Connect
```

### Provide the Project Owner's Name: 

You will be asked to enter the project owner's name

```bash
Project Owner name:
```

### Wait for Project Creation: 

The CLI will now create the project based on your inputs. This may take a few minutes.

### Follow the instructions to start the project. 

The same will be displayed on the console after the project is created

```bash
🚀 Your starter project has been successfully created!

Before you start the project, please follow these steps:

1. Rename the file:
   packages/react-app/.env.template
   to
   packages/react-app/.env

2. Open the newly renamed .env file and add all the required environment variables.

Once you've done that, you're all set to start your project!

Run the following commands from the packages/react-app folder to start the project:

   yarn install
   yarn dev

If you prefer npm, you can run:

   npm install
   npm run dev

Thank you for using Celo Composer! If you have any questions or need further assistance, please refer to the README or reach out to our team.
```

🔥Voila, you have a dApp ready to go. Start building your dApp on Celo.

Once your custom dApp has been created, just install dependencies, either with yarn or npm i, and run the respective script from the package.json file.

## Supported Templates

### MiniPay

- Pre-built template for creating a mini-payment application.
- Seamless integration with Celo blockchain for handling payments.

Checkout [minipay docs](https://docs.celo.org/developer/build-on-minipay/overview) to learn more about it.

### Valora

- Template designed for Valora wallet integration.
- Facilitates easy wallet connectivity and transaction management.

Checkout [valora docs](https://docs.valora.xyz/) to learn more about it.

### Social Connect

- Template for building applications with social connectivity features.
- Supports various social login methods and user interactions.

Checkout [social connect docs](https://github.com/celo-org/social-connect) to learn more about it.

## Support

Join the [Celo Discord server](https://chat.celo.org). Reach out in the #general-dev channel with your questions and feedback. 
