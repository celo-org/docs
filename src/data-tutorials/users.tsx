/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import { translate } from "@docusaurus/Translate";
import { sortBy } from "@site/src/utils/jsUtils";

/*
 * ADD YOUR SITE TO THE DOCUSAURUS SHOWCASE:
 *
 * Requirements for adding your site to our showcase:
 * - It is a production-ready site with real content and decent customizations
 * (different from the init templates)
 * - It is NOT a work-in-progress with empty pages
 * - It has a stable domain (a Netlify/Vercel deploy preview is not allowed)
 *
 * Instructions:
 * - Add your site in the json array below
 * - `title` is your project's name (no need for the "Docs" suffix)
 * - A short (≤120 characters) description of your project
 * - Use relevant tags to categorize your site (read the tag descriptions below)
 * - Add a local image preview (decent screenshot of your Docusaurus site)
 * - The image MUST be added to the GitHub repository, and use `require("img")`
 * - The image has to have minimum width 640 and an aspect of no wider than 2:1
 * - If your website is open-source, add your source link. The link should open
 *   to a directory containing the `docusaurus.config.js` file
 * - Open a PR and check for reported CI errors
 *
 * Example PR: https://github.com/facebook/docusaurus/pull/3976
 *
 * If you edit this file through the GitHub interface, you can:
 * - Submit first your users.tsx edit PR
 * - This will create a branch on your Docusaurus fork (usually "patch-1")
 * - Go to https://github.com/<username>/docusaurus/tree/<branch>/website/src/data/showcase
 * - Drag-and-drop an image here to add it to your existing PR
 *
 * Please help us maintain this showcase page data:
 * - Update sites with wrong data
 * - Ensure site tags remain correct over time
 * - Remove sites not using Docusaurus anymore
 * - Add missing Docusaurus sites (if the site owner agreed)
 */

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export type TagType =
  | "popular"
  | "favorite"
  | "foundation"
  | "celosage"
  | "figment"
  | "dacade"
  | "advanced"
  | "airdrop"
  | "android"
  | "beginner"
  | "celo"
  | "celowallet"
  | "cli"
  | "codeplayground"
  | "composer"
  | "contractkit"
  | "contribute"
  | "crowdfunding"
  | "cusd"
  | "dao"
  | "dapp"
  | "dappstarter"
  | "deploy"
  | "erc1155"
  | "ERC20"
  | "erc721"
  | "flutter"
  | "graph"
  | "hardhat"
  | "html"
  | "intermediate"
  | "ipfs"
  | "javascript"
  | "keystores"
  | "ledger"
  | "materialui"
  | "metamask"
  | "mint"
  | "mobile"
  | "nextjs"
  | "nft"
  | "nodejs"
  | "observable"
  | "openzeppelin"
  | "oracle"
  | "pinata"
  | "progressive"
  | "randomness"
  | "react"
  | "reactnative"
  | "remix"
  | "remote"
  | "sdk"
  | "smartcontract"
  | "solidity"
  | "sourcify"
  | "subgraphs"
  | "tokens"
  | "truffle"
  | "typescript"
  | "usecontractkit"
  | "valora"
  | "verification"
  | "walletconnect"
  | "video";

export type User = {
  title: string;
  description: string;
  preview: string;
  website: string;
  // source: string | null;
  tags: TagType[];
};

// LIST OF AVAILABLE TAGS
// Available tags to assign to your site
// Please choose all tags that you think might apply.
// We'll remove inappropriate tags, but it's less likely that we add tags.
export const Tags: { [type in TagType]: Tag } = {
  // DO NOT USE THIS TAG: we choose sites to add to appss
  popular: {
    label: translate({ message: "Popular" }),
    description: translate({
      message: "",
      id: "showcase.tag.popular.description",
    }),
    color: "#e9669e",
  },

  // For open-source sites, a link to the source code is required
  // The source should be your *website's* source, not your project's source!
  // apps: {
  //   label: translate({ message: "Apps" }),
  //   description: translate({
  //     message: "",
  //     id: "showcase.tag.apps.description",
  //   }),
  //   color: "#39ca30",
  // },
  // impact: {
  //   label: translate({ message: "Impact" }),
  //   description: translate({
  //     message: "",
  //     id: "showcase.tag.impact.description",
  //   }),
  //   color: "#dfd545",
  // },
  foundation: {
    label: translate({ message: "Foundation" }),
    description: translate({
      message: "",
      id: "showcase.tag.foundation.description",
    }),
    color: "#35D07F",
  },
  celosage: {
    label: translate({ message: "Celo Sage" }),
    description: translate({
      message: "",
      id: "showcase.tag.celosage.description",
    }),
    color: "#35D07F",
  },
  favorite: {
    label: translate({ message: "Favorite" }),
    description: translate({
      message: "",
      id: "showcase.tag.favorite.description",
    }),
    color: "#35D07F",
  },

  figment: {
    label: translate({ message: "Figment" }),
    description: translate({
      message: "",
      id: "showcase.tag.figment.description",
    }),
    color: "#FBCC5C",
  },
  dacade: {
    label: translate({ message: "Dacade" }),
    description: translate({
      message: "",
      id: "showcase.tag.dacade.description",
    }),
    color: "#35D07F",
  },
  advanced: {
    label: translate({ message: "Advanced" }),
    description: translate({
      message: "",
      id: "showcase.tag.advanced.description",
    }),
    color: "#35D07F",
  },
  airdrop: {
    label: translate({ message: "Airdrop" }),
    description: translate({
      message: "",
      id: "showcase.tag.airdrop.description",
    }),
    color: "#127f82",
  },
  android: {
    label: translate({ message: "Android" }),
    description: translate({
      message: "",
      id: "showcase.tag.android.description",
    }),
    color: "#BF97FF",
  },
  beginner: {
    label: translate({ message: "Beginner" }),
    description: translate({
      message: "",
      id: "showcase.tag.beginner.description",
    }),
    color: "#FB7C6D",
  },
  celo: {
    label: translate({ message: "Celo" }),
    description: translate({
      message: "",
      id: "showcase.tag.celo.description",
    }),
    color: "#73DDFF",
  },
  celowallet: {
    label: translate({ message: "Celo Wallet" }),
    description: translate({
      message: "",
      id: "showcase.tag.celowallet.description",
    }),
    color: "#3488EC",
  },
  cli: {
    label: translate({ message: "CLI" }),
    description: translate({
      message: "",
      id: "showcase.tag.cli.description",
    }),
    color: "#BF97FF",
  },
  codeplayground: {
    label: translate({ message: "Code Playground" }),
    description: translate({
      message: "",
      id: "showcase.tag.codeplayground.description",
    }),
    color: "#35D07F",
  },
  composer: {
    label: translate({ message: "Composer" }),
    description: translate({
      message: "",
      id: "showcase.tag.composer.description",
    }),
    color: "#FB7C6D",
  },
  contractkit: {
    label: translate({ message: "ContractKit" }),
    description: translate({
      message: "",
      id: "showcase.tag.contractkit.description",
    }),
    color: "#FBCC5C",
  },
  contribute: {
    label: translate({ message: "Contribute" }),
    description: translate({
      message: "",
      id: "showcase.tag.contribute.description",
    }),
    color: "#FBCC5C",
  },
  crowdfunding: {
    label: translate({ message: "Crowdfunding" }),
    description: translate({
      message: "",
      id: "showcase.tag.crowdfunding.description",
    }),
    color: "#BF97FF",
  },
  cusd: {
    label: translate({ message: "cUSD" }),
    description: translate({
      message: "",
      id: "showcase.tag.cusd.description",
    }),
    color: "#FB7C6D",
  },
  dao: {
    label: translate({ message: "DAO" }),
    description: translate({
      message: "",
      id: "showcase.tag.dao.description",
    }),
    color: "#73DDFF",
  },
  dapp: {
    label: translate({ message: "Dapp" }),
    description: translate({
      message: "",
      id: "showcase.tag.dapp.description",
    }),
    color: "#3488EC",
  },
  dappstarter: {
    label: translate({ message: "Dappstarter" }),
    description: translate({
      message: "",
      id: "showcase.tag.dappstarter.description",
    }),
    color: "#35D07F",
  },
  deploy: {
    label: translate({ message: "Deploy" }),
    description: translate({
      message: "",
      id: "showcase.tag.deploy.description",
    }),
    color: "#FBCC5C",
  },
  erc1155: {
    label: translate({ message: "erc1155" }),
    description: translate({
      message: "",
      id: "showcase.tag.erc1155.description",
    }),
    color: "#BF97FF",
  },
  ERC20: {
    label: translate({ message: "ERC20" }),
    description: translate({
      message: "",
      id: "showcase.tag.erc20.description",
    }),
    color: "#BF97FF",
  },
  erc721: {
    label: translate({ message: "ERC721" }),
    description: translate({
      message: "",
      id: "showcase.tag.erc721.description",
    }),
    color: "#FB7C6D",
  },
  flutter: {
    label: translate({ message: "flutter" }),
    description: translate({
      message: "",
      id: "showcase.tag.flutter.description",
    }),
    color: "#73DDFF",
  },
  graph: {
    label: translate({ message: "Graph" }),
    description: translate({
      message: "",
      id: "showcase.tag.graph.description",
    }),
    color: "#3488EC",
  },
  hardhat: {
    label: translate({ message: "Hardhat" }),
    description: translate({
      message: "",
      id: "showcase.tag.hardhat.description",
    }),
    color: "#FB7C6D",
  },
  html: {
    label: translate({ message: "HTML" }),
    description: translate({
      message: "",
      id: "showcase.tag.html.description",
    }),
    color: "#35D07F",
  },
  intermediate: {
    label: translate({ message: "Intermediate" }),
    description: translate({
      message: "",
      id: "showcase.tag.intermediate.description",
    }),
    color: "#FBCC5C",
  },
  ipfs: {
    label: translate({ message: "IPFS" }),
    description: translate({
      message: "",
      id: "showcase.tag.ipfs.description",
    }),
    color: "#BF97FF",
  },
  javascript: {
    label: translate({ message: "Javascript" }),
    description: translate({
      message: "",
      id: "showcase.tag.javascript.description",
    }),
    color: "#FB7C6D",
  },
  keystores: {
    label: translate({ message: "Keystores" }),
    description: translate({
      message: "",
      id: "showcase.tag.keystores.description",
    }),
    color: "#BF97FF",
  },
  ledger: {
    label: translate({ message: "Ledger" }),
    description: translate({
      message: "",
      id: "showcase.tag.ledger.description",
    }),
    color: "#FB7C6D",
  },
  materialui: {
    label: translate({ message: "Material UI" }),
    description: translate({
      message: "",
      id: "showcase.tag.material-ui.description",
    }),
    color: "#73DDFF",
  },
  metamask: {
    label: translate({ message: "Metamask" }),
    description: translate({
      message: "",
      id: "showcase.tag.metamask.description",
    }),
    color: "#3488EC",
  },
  mint: {
    label: translate({ message: "Mint" }),
    description: translate({
      message: "",
      id: "showcase.tag.mint.description",
    }),
    color: "#35D07F",
  },
  mobile: {
    label: translate({ message: "Mobile" }),
    description: translate({
      message: "",
      id: "showcase.tag.mobile.description",
    }),
    color: "#FBCC5C",
  },
  nextjs: {
    label: translate({ message: "Nextjs" }),
    description: translate({
      message: "",
      id: "showcase.tag.nextjs.description",
    }),
    color: "#FB7C6D",
  },
  nft: {
    label: translate({ message: "NFT" }),
    description: translate({
      message: "",
      id: "showcase.tag.nft.description",
    }),
    color: "#73DDFF",
  },
  nodejs: {
    label: translate({ message: "Nodejs" }),
    description: translate({
      message: "",
      id: "showcase.tag.nodejs.description",
    }),
    color: "#BF97FF",
  },
  observable: {
    label: translate({ message: "Obervable" }),
    description: translate({
      message: "",
      id: "showcase.tag.observable.description",
    }),
    color: "#FB7C6D",
  },
  openzeppelin: {
    label: translate({ message: "Open Zeppelin" }),
    description: translate({
      message: "",
      id: "showcase.tag.openzeppelin.description",
    }),
    color: "#73DDFF",
  },
  oracle: {
    label: translate({ message: "Oracle" }),
    description: translate({
      message: "",
      id: "showcase.tag.metamask.description",
    }),
    color: "#3488EC",
  },
  pinata: {
    label: translate({ message: "pinata" }),
    description: translate({
      message: "",
      id: "showcase.tag.pinata.description",
    }),
    color: "#73DDFF",
  },
  progressive: {
    label: translate({ message: "Progressive" }),
    description: translate({
      message: "",
      id: "showcase.tag.progressive.description",
    }),
    color: "#35D07F",
  },
  randomness: {
    label: translate({ message: "Randomness" }),
    description: translate({
      message: "",
      id: "showcase.tag.randomness.description",
    }),
    color: "#FBCC5C",
  },
  react: {
    label: translate({ message: "React" }),
    description: translate({
      message: "",
      id: "showcase.tag.react.description",
    }),
    color: "#73DDFF",
  },
  reactnative: {
    label: translate({ message: "React Native" }),
    description: translate({
      message: "",
      id: "showcase.tag.reactnative.description",
    }),
    color: "#3488EC",
  },
  remix: {
    label: translate({ message: "Remix" }),
    description: translate({
      message: "",
      id: "showcase.tag.remix.description",
    }),
    color: "#BF97FF",
  },
  remote: {
    label: translate({ message: "Remote" }),
    description: translate({
      message: "",
      id: "showcase.tag.remote.description",
    }),
    color: "#FB7C6D",
  },
  sdk: {
    label: translate({ message: "SDK" }),
    description: translate({
      message: "",
      id: "showcase.tag.sdk.description",
    }),
    color: "#73DDFF",
  },
  smartcontract: {
    label: translate({ message: "Smart Contract" }),
    description: translate({
      message: "",
      id: "showcase.tag.smartcontract.description",
    }),
    color: "#3488EC",
  },
  solidity: {
    label: translate({ message: "Solidity" }),
    description: translate({
      message: "",
      id: "showcase.tag.solidity.description",
    }),
    color: "#3488EC",
  },
  sourcify: {
    label: translate({ message: "Sourcify" }),
    description: translate({
      message: "",
      id: "showcase.tag.sourcify.description",
    }),
    color: "#35D07F",
  },
  subgraphs: {
    label: translate({ message: "Subgraphs" }),
    description: translate({
      message: "",
      id: "showcase.tag.subgraphs.description",
    }),
    color: "#FBCC5C",
  },
  tokens: {
    label: translate({ message: "Tokens" }),
    description: translate({
      message: "",
      id: "showcase.tag.tokens.description",
    }),
    color: "#3488EC",
  },
  truffle: {
    label: translate({ message: "Truffle" }),
    description: translate({
      message: "",
      id: "showcase.tag.truffle.description",
    }),
    color: "#35D07F",
  },
  usecontractkit: {
    label: translate({ message: "use-contractkit" }),
    description: translate({
      message: "",
      id: "showcase.tag.usecontractkit.description",
    }),
    color: "#BF97FF",
  },
  valora: {
    label: translate({ message: "Valora" }),
    description: translate({
      message: "",
      id: "showcase.tag.valora.description",
    }),
    color: "#FB7C6D",
  },
  verification: {
    label: translate({ message: "Verification" }),
    description: translate({
      message: "",
      id: "showcase.tag.verification.description",
    }),
    color: "#73DDFF",
  },
  walletconnect: {
    label: translate({ message: "Wallet Connect" }),
    description: translate({
      message: "",
      id: "showcase.tag.walletconnect.description",
    }),
    color: "#3488EC",
  },
  video: {
    label: translate({ message: "Video" }),
    description: translate({
      message: "",
      id: "showcase.tag.video.description",
    }),
    color: "#35D07F",
  },
  typescript: {
    label: translate({ message: "Typescript" }),
    description: translate({
      message: "",
      id: "showcase.tag.typescript.description",
    }),
    color: "#3488EC",
  },
};

// Add your site to this list
// prettier-ignore
const Users: User[] = [
  // Paths
  // {
  //   title: '1. Celo Composer',
  //   description: 'Quickly build and deploy Celo dApps with Celo Composer',
  //   preview: require('./showcase/1.png'),
  //   website: '/tutorials?tags=composer',
  //   tags: ['favorite'],
  // },

   {
    title: "How to build a computer retail store using celo composer",
    description: "In this tutorial, you will learn how to how to build a computer retail store using celo composer.",
    preview: require('./showcase/intermediate/how-to-build-a-computer-retail-store-using-celo-composer.png'),
    website: '/blog/tutorials/how-to-build-a-computer-retail-store-using-celo-composer',
    tags: ["intermediate", "composer", "dapp", "celosage", "typescript", "nextjs"],
  },
  {
    title: "A decentralized social network that rewards users for their content and participation on the Celo blockchain",
    description: "Introducing a game-changing social network on the Celo blockchain. Users create and share quality content in a secure, transparent environment.",
    preview: require('./showcase/intermediate/A-decentralized-social-network-that-rewards-users-for-their-content-and-participation-on-the-celo-blockchain.png'),
    website: '/blog/tutorials/a-decentralized-social-network-that-rewards-users-for-their-content-and-participation-on-the-celo-blockchain',
    tags: ["intermediate", "solidity", "celosage", "celo"],
  },


  {
    title: "Securing Multi-Sig Wallet Using Hardware Wallet. The Benefits for Securing Community Funds",
    description: "A step-by-step instructions on setting up and using a hardware wallet with a multi-sig wallet like Celo-safe",
    preview: require('./showcase/beginner/securing-multi-sig-wallet-using-hardware-wallet-the-benefits-for-securing-community-funds.png'),
    website: '/blog/tutorials/securing-multi-sig-wallet-using-hardware-wallet-the-benefits-for-securing-community-funds',
    tags: ['beginner','celosage','celo'],
  },
  {
    title: "How to Store NFT Smart Contract Assets Using The FileBase Decentralized Storage System",
    description: "This article gives a comprehensive overview of decentralized storage solutions. It contains a clear walk-through of how to store digital assets on the filebase storage solution.",
    preview: require('./showcase/intermediate/filebase-cover.png'),
    website: '/blog/tutorials/how-to-store-nft-smart-contract-assets-using-the-fileBase-decentralized-storage-system',
    tags: ['intermediate', 'solidity', 'smartcontract', 'celosage', 'celo'],
  },
  {
    title: "Leveraging Blockchain and IoT for ReFi and Climate Actions through Celo",
    description: "We look into how carbon sensors, rain sensors, etc. can be used with oracles to provide on-chain data for ReFi applications",
    preview: require('./showcase/beginner/leveraging-blockchain-and-iot-for-refi-and-climate-actions-through-celo.png'),
    website: '/blog/tutorials/leveraging-blockchain-and-iot-for-refi-and-climate-actions-through-celo',
    tags: ['beginner','celosage','celo'],
  },
  {
    title: 'A Comparison of Hardware, Software and Human Oracles',
    description: 'In this article, we will examine the differences between Human, Hardware and software Oracle',
    preview: require('./showcase/beginner/a-comparison-of-hardware-software-and-human-oracles.png'),
    website: '/blog/tutorials/a-comparison-of-hardware-software-and-human-oracles',
    tags: ['beginner','celosage','celo','oracle'],
  },
  {
    title: 'How to create a Token Staking Dapp',
    description: 'Learn how to create a simple token staking Dapp with react,solidity and truffle for compiling and deploying.',
    preview: require('./showcase/intermediate/create-a-tokenstake.png'),
    website:'/blog/tutorials/how-to-create-a-token-staking-dapp',
    tags: ["react","metamask", "truffle","solidity","intermediate"],
  },
  {
    title: 'Exclusive List of Hardware Wallets that Support the Celo Network',
    description: 'This tutorial aims to provide an exclusive list of hardware wallets that support the Celo network',
    preview: require('./showcase/beginner/exclusive-list-of-hardware-wallets-that-support-the-celo-network.png'),
    website: '/blog/tutorials/exclusive-list-of-hardware-wallets-that-support-the-celo-network',
    tags: ['beginner','celosage','celo','ledger','ERC20'],
  },
  {
    title: " Celo Composer",
    description: "Build on Celo in 5 minutes of less with Celo Composer.",
    preview: require("./showcase/celo-composer.png"),
    website: "/tutorials?tags=composer",
    tags: ["favorite"],
  },
  {
    title: ' A Comprehensive Guide to Comparing Hardware and Software Wallets on Celo',
    description: 'This tutorial will explain the differences between software and hardware wallets, and how to choose the right one for you.',
    preview: require('./showcase/beginner/A-Comprehensive-Guide-to-Comparing-Hardware-and-Software-Wallets-What-You-Need-to-Know.png'),
    website: '/blog/tutorials/a-comprehensive-guide-to-comparing-hardware-and-software-wallets-on-celo',
    tags: ['beginner','celosage','celo'],
  },
   {
    title: 'Art Trading with Smart Contracts on the Celo blockchain',
    description: 'ArtifactHouse is a smart contract for buying and selling digital artifacts using cUSD tokens, with the ability to display and visit artifacts..',
    preview: require('./showcase/intermediate/art-trading-with-smart-contracts-on-the-celo-blockchain.png'),
    website: '/blog/tutorials/art-trading-with-smart-contracts-on-the-celo-blockchain',
    tags: ['intermediate','celosage', 'solidity', 'celo'],
  },
  {
    title: 'A detailed guide on how to create a decentralized marketplace for magazines on the Celo blockchain',
    description: 'Learn how to build a marketplace for seliing magazine on the celo blockchain',
    preview: require('./showcase/intermediate/A-detailed-guide-on-how-to-create-a-decentralized-marketplace-for-magazines-on-the-celo-blockchain.png'),
    website: 'blog/tutorials/a-detailed-guide-on-how-to-create-a-decentralized-marketplace-for-magazines-on-the-Celo-blockchain',
    tags: ['celosage', 'solidity', 'intermediate','celo'],
  },
  {
    title: "Solidity Marketplace Contract for Furniture Transactions on Celo Blockchain",
    description: "This MarketPlace contract is a decentralized marketplace for buying and selling furniture items.",
    preview: require('./showcase/intermediate/Solidity-Marketplace-Contract-for-Furniture-Transactions-on-Celo-Blockchain.png'),
    website: '/blog/tutorials/solidity-marketplace-contract-for-furniture-transactions-on-celo-blockchain',
    tags: ['intermediate', 'solidity', 'smartcontract', 'celosage', 'celo'],
  },
  {
    title: 'How to Transition from Web2 to Web3',
    description: 'Learn the basics of blockchain technology and web3 development',
    preview: require('./showcase/beginner/how-to-transition-from-web2-to-web3.png'),
    website: 'blog/tutorials/how-to-transition-from-web2-to-web3',
    tags: ['celosage', 'beginner','celo'],
  },
  {
    title: 'Developing a Hair Product Marketplace on Celo with Solidity and OpenZeppelin',
    description: 'This tutorial is for a decentralized hair marketplace on the Celo blockchain, where users can buy and sell hair products using the cUSD stablecoin',
    preview: require('./showcase/intermediate/developing-a-hair-product-marketplace-on-celo-with-solidity-and-openZeppelin.png'),
    website: 'blog/tutorials/developing-a-hair-product-marketplace-on-celo-with-solidity-and-openZeppelin',
    tags: ['celosage', 'solidity', 'intermediate','celo'],
  },
  {
    title: 'How to Tokenize Physical Assets on Celo',
    description: 'Understand how to start the tokenization on Celo',
    preview: require('./showcase/beginner/how-to-tokenize.png'),
    website: 'blog/tutorials/how-to-tokenize-a-physical-asset-on-celo',
    tags: ['celosage', 'beginner','celo', 'smartcontract'],
  },
  { 
    title: 'Build an NFT Marketplace on Celo using Hardhat',
    description: 'Creating a simple NFT marketplace on the Celo Blockchain using Hardhat to create smart contracts',
    preview: require('./showcase/intermediate/build-an-nft-marketplace-on-celo-using-hardhat.png'),
    website: '/blog/tutorials/build-an-nft-marketplace-on-celo-using-hardhat',
    tags: ['celosage', 'solidity', 'celo', 'intermediate', 'hardhat', 'javascript'],
  },
   {
    title: 'Decentralized Marketplace for Buying and Selling Animals',
    description: 'AnimalHouse is a blockchain-based platform connecting animal lovers to adopt, rescue, and care for animals securely and transparently',
    preview: require('./showcase/intermediate/decentralized-marketplace-for-buying-and-selling-animals.png'),
    website: 'blog/tutorials/decentralized-marketplace-for-buying-and-selling-animals',
    tags: ['celosage', 'intermediate','celo', 'solidity'],
  },
  {
    title: 'ERC-4337 Overview Protocol',
    description: 'Understand the ERC 4337 protocol',
    preview: require('./showcase/beginner/ERC-4337-Overview-Protocol.png'),
    website: 'blog/tutorials/ERC-4337-Overview-Protocol',
    tags: ['celosage', 'beginner','celo', 'smartcontract'],
  },
  {
    title: 'Introduction to Soulbound Tokens on Celo',
    description: 'Understand What is Soulbound token and How it works',
    preview: require('./showcase/beginner/Introduction-to-Soulbound-Tokens-on-Celo.png'),
    website: 'blog/tutorials/introduction-to-soulbound-tokens-on-celo',
    tags: ['celosage', 'beginner','celo', 'smartcontract'],
  },
  {
    title: 'Prepare for Auditing Your Smart Contract',
    description: 'Auditing is the process of reviewing your smart contracts code for errors, vulnerabilities, and potential weaknesses',
    preview: require('./showcase/intermediate/prepare-for-auditing-your-smart-contract.png'),
    website: 'blog/tutorials/prepare-for-auditing-your-smart-contract',
    tags: ['celosage', 'intermediate','celo', 'smartcontract'],
  },
  {
    title: '1. Beginner Tutorials',
    description: 'Curated list of beginner Celo developer tutorials.',
    preview: require('./showcase/beginner/beginner-tutorials.png'),
    website: '/tutorials?tags=beginner',
    tags: ['favorite'],
  },
  {
    title: "2. Intermediate Tutorials",
    description: "Curated list of intermediate Celo developer tutorials.",
    preview: require("./showcase/intermediate/intermediate-tutorials.png"),
    website: "/tutorials?tags=intermediate",
    tags: ["favorite"],
  },
  {
    title: "3. Advanced Tutorials",
    description: "Curated list of advanced Celo developer tutorials.",
    preview: require("./showcase/advanced/advanced-tutorials.png"),
    website: "/tutorials?tags=advanced",
    tags: ["favorite"],
  },

  // Posts
  {
    title: "Introducing Celo Sage",
    description:
      "Create. Earn. Grow. Providing opportunities for growth and development in the Celo Community.",
    preview: require("./showcase/celo-sage.png"),
    website: "blog/tutorials/introducing-celo-sage",
    tags: ["beginner", "celosage"],
  },
  {
    title: 'Preventing Vulnerabilities in Solidity: Ownership Attack',
    description: "In Solidity, an ownership attack takes advantage of a smart contract's vulnerabilities and gives illegal and unauthorized access to a foreign party.",
    preview: require('./showcase/intermediate/preventing-vulnerabilities-in-solidity-ownership-attack.png'),
    website: 'blog/tutorials/preventing-vulnerabilities-in-solidity-ownership-attack',
    tags: ['intermediate','celosage'],
  },
  {
    title: 'Introduction to ERC-20R and Reversible Transactions',
    description: "This article provides a detailed look into the need for reversible transactions and a technical approach to how they function.",
    preview: require('./showcase/beginner/introduction-to-erc-20r-and-reversible-transactions.png'),
    website: 'blog/tutorials/introduction-to-erc-20r-and-reversible-transactions',
    tags: ['beginner','celosage'],
  },
   {
    title: 'Build a dapp for buying and selling unique gadgets on celo blockchain',
    description: 'Gadget project is a dApp for buying/selling unique gadgets represented by NFTs on Celo blockchain, with ERC-20 interface for DeFi. Provides secure/transparent platform for gadget enthusiasts/creators to connect..',
    preview: require('./showcase/intermediate/build-a-dapp-for-buying-and-selling-unique-gadgets-on-celo-blockchain.png'),
    website: 'blog/tutorials/build-a-dapp-for-buying-and-selling-unique-gadgets-on-celo-blockchain',
    tags: ['intermediate','celosage', 'celo'],
  },
  {
    title: 'Blockchain Based Festival Booking System with CUSD Payment Integration',
    description: 'Decentralized event booking platform for organizers to showcase programs and users to book slots with cUSD.',
    preview: require('./showcase/intermediate/blockchain-based-festival-booking-system-with-cusd-payment-Integration.png'),
    website: '/blog/tutorials/blockchain-based-festival-booking-system-with-cusd-payment-integration',
    tags: ['celosage','intermediate', 'solidity', 'celo'],
  },
  {
    title: 'Integrating Rainbow-Kit Celo into Your DApps',
    description: 'This sequel walks blockchain developers through the process of integrating the Rainbow-Kit Celo tool into their DApps for seamless financial operation and compatible wallet integration',
    preview: require('./showcase/intermediate/integrating-rainbow-kit-celo-into-your-smart-contract-dapp.png'),
    website: 'blog/tutorials/integrating-rainbow-kit-celo-into-your-dapps',
    tags: ['celosage', 'smartcontract', 'solidity', 'react', 'hardhat', 'intermediate'], 
  },

  {
    title: 'Exploring the Robust Structure of Celos Protocol Design',
    description: "Exploring the Robust Structure of Celo's Protocol Design",
    preview: require('./showcase/intermediate/Exploring_the_Robust_Structure_of_Celo_s_Protocol_Design.png'),
    website: 'blog/tutorials/exploring-the-robust-structure-of-celo-protocol-design',
    tags: ['intermediate','celosage'],
  },
  {
    title: 'Understanding Celos Approach to Layer-2 Scaling',
    description: "An evaluation of rolllups,sidechains and state channels",
    preview: require('./showcase/intermediate/understanding-celos-approach-to-layer2.png'),
    website: 'blog/tutorials/understanding-celos-approach-to-layer2-scaling',
    tags: ['intermediate','solidity','smartcontract', 'celosage'],
  },
  {
    title: 'Building a crowdfunding dapp with solidity and celo composer',
    description: "In this article, we'll be talking about how to create a crowdfunding Dapp on the Celo blockchain using Solidity and Celo-composer.",
    preview: require('./showcase/intermediate/building-a-crowdfinding-dapp.png'),
    website: 'blog/tutorials/Building-a-crowdfunding-dapp-with-solidity-and-celo-composer',
    tags: ['celo', 'celosage', 'crowdfunding', 'intermediate', 'solidity', 'smartcontract'],
  },
  {
    title: 'Introducing Celo Sage',
    description: 'In Solidity, reentrancy describes a scenario in which a contract calls a second contract. The second contract then calls the first contract while the first contract is still running.',
    preview: require('./showcase/intermediate/preventing-vulnerabilities-in-solidity-reentrancy-attack.png'),
    website: 'blog/tutorials//preventing-vulnerabilities-in-solidity-reentrancy-attack',
    tags: ['intermediate','celosage'],
  },
  {
    title: 'Como usar a metodologia de gestão de produtos para criar soluções com NFT',
    description: 'Aprenda como usar a metodologia de gestão de produtos para criar soluções com NFT',
    preview: require('./showcase/beginner/metodologia-de-gestao-de-produtos.png'),
    website: 'blog/tutorials/como-usar-a-metodologia-de-gestao-de-produtos-para-criar-solucoes-com-NFT',
    tags: ['beginner', 'erc721', 'celosage'],
  },
  {
    title: 'Understanding Utility and Security Tokens',
    description: 'Utility tokens are digital assets that lives on the blockchain and can be used to gain access to certain things, such as a game or a website.',
    preview: require('./showcase/beginner/understanding-utility-and-security-tokens.png'),
    website: 'blog/tutorials/understanding-utility-and-security-tokens',
    tags: ['beginner', 'celosage'],
  },
  {
    title: 'Integrating Blockchain Technology into Legacy Systems on Celo',
    description:
      'Blockchain technology can facilitate new forms of collaboration and innovation by enabling the exchange of information and value between different parties.',
    preview: require('./showcase/intermediate/blockchain-integration-updating-legacy-systems-with-the-celo-platform.png'),
    website:
      '/blog/tutorials/blockchain-integration-updating-legacy-systems-with-the-celo-platform',
    tags: ['intermediate', 'celosage'],
  },
   {
    title: 'Song Marketplace Contract with ERC-20 Token Integration',
    description: 'The Song Marketplace Contract with ERC-20 Token Integration is a smart contract built on the Celo blockchain that enables users to buy and sell songs using a stablecoin ERC-20 token called "cUSD".',
    preview: require('./showcase/intermediate/song-marketplace-contract-with-ERC-20-token-integration.png'),
    website: '/blog/tutorials/song-marketplace-contract-with-ERC-20-token-integration',
    tags: ['intermediate', 'solidity', 'celosage', 'celo'],
  },
  {
    title: 'How to Connect to a Node on Celo using Docker',
    description: 'This tutorial teaches how to connect to a node on the celo blockchain using docker',
    preview: require('./showcase/beginner/how-to-connect-to-a-node-on-celo-using-docker.png'),
    website: 'blog/tutorials/how-to-connect-to-a-node-on-celo-using-docker',
    tags: ['celosage', 'celo', 'beginner', 'cli'], 
  },
  {
    title: 'Building a Decentralized Book Library',
    description: 'This tutorial teaches how to build a decentralised book library',
    preview: require('./showcase/intermediate/building-a-decentralized-book-library.png'),
    website: 'blog/tutorials/building-a-decentralized-book-library',
    tags: ['celosage', 'celo', 'intermediate', 'contractkit'], 
  },
   {
    title: 'Building A Decentralised Judicial Archiving System',
    description: 'This tutorial teaches how you can create a decentralised application for  managing judicial archives',
    preview: require('./showcase/intermediate/building-a-decentralised-judicial-archiving-system.png'),
    website: 'blog/tutorials/building-a-decentralised-judicial-archiving-system',
    tags: ['celosage', 'celo', 'intermediate'], 
  },
  
  {
    title: 'Building a Vending Machine on Celo Blockchain',
    description: 'This tutorial teaches how to build a vending machine on Celo blockchain',
    preview: require('./showcase/beginner/building-a-vending-machine-on-celo-blockchain.png'),
    website: 'blog/tutorials/building-a-vending-machine-on-celo-blockchain',
    tags: ['celosage', 'celo', 'beginner'], 
  },
  {
    title: 'Top 33 Must Know Tools For Web3 Developers',
    description: 'This article is a compilation of top 33 must know tools for web3 developers',
    preview: require('./showcase/beginner/top-33-must-know-tools-for-web3-developers.png'),
    website: 'blog/tutorials/top-33-must-know-tools-for-web3-developers',
    tags: ['celosage', 'celo', 'beginner'], 
  },
  
  {
    title: 'How to Build a Supply Chain Management Application on Celo',
    description: 'This tutorial teaches how to build a supply chain management application on Celo',
    preview: require('./showcase/intermediate/how-to-build-a-supply-chain-management-application-on-celo.png'),
    website: 'blog/tutorials/how-to-build-a-supply-chain-management-application-on-celo',
    tags: ['celosage', 'celo', 'intermediate', 'contractkit'], 
  },
  {
    title: 'How to build a decentralized event invitation system on the Celo blockchain using Solidity and Javascript',
    description: 'Learn how to build a decentralized event invitation system on the Celo blockchain using Solidity and Javascript',
    preview: require('./showcase/intermediate/Build_an_Events_Management_Application_on_Celo.png'),
    website: 'blog/tutorials/how-to-build-a-decentralized-event-invitation-system-on-the-Celo-blockchain-using-solidity-and-javascript',
    tags: ['celosage', 'celo', 'solidity', 'html', 'remix', 'smartcontract', 'intermediate', 'javascript'],
  },
  {
    title: 'Interacting with the Celo Blockchain Using Web3.js A Beginners Guide - A Voting App.',
    description: 'This tutorial teaches how to interact with smart contracts using web3.js simplified by Celo Contract Kit',
    preview: require('./showcase/beginner/interacting-with-the-Celo-Blockchain-Using-Web3js-A-Beginners-Guide-A-Voting-App.png'),
    website: 'blog/tutorials/interacting-with-the-celo-blockchain-using-web3js-a-beginners-guide-a-voting-app',
    tags: ['celosage', 'celo', 'beginner', 'solidity', 'contractkit', 'remix'], 
  },
  {
    title: 'Implementing an English Auction Contract in Solidity',
    description:
      'An English auction is ideal for selling NFTs because it gives all potential buyers a fair chance at placing bids until only one bidder with the highest bid is left.',
    preview: require('./showcase/intermediate/implementing-an-english-auction-contract-in-solidity.png'),
    website:
      '/blog/tutorials/implementing-an-english-auction-contract-in-solidity',
    tags: ['intermediate', 'celosage'],
  },
  {
    title: 'Product Discovery é a chave para criar produtos de NFT de sucesso no blockchain Celo',
    description: 'Aprenda como criar produtos de NFT de sucesso no blockchain Celo através de processos de product discovery',
    preview: require('./showcase/intermediate/product-discovery-a-chave-para-criar-produtos-de-NFT-de-sucesso-no-blockchain-Celo.png'),
    website: 'blog/tutorials/product-discovery-a-chave-para-criar-produtos-de-NFT-de-sucesso-no-blockchain-Celo',
    tags: ['intermediate', 'erc721', 'celosage'],
  },
  {
    title: 'Buy Me A Coffee Android App Using the Celo Java-SDK',
    description: 'This tutorial will show you how to create a simple Android app that allows users to make payments using the Celo Java SDK. The app, called "Buy Me A Coffee".',
    preview: require('./showcase/advanced/buyme-a-coffee-android-app-using-the-celo-java-sdk.png'),
    website: '/blog/tutorials/buy-me-a-coffee-android-app-using-the-celo-java-sdk',
    tags: ['celosage', 'android', 'celo', 'dapp', 'mobile', 'sdk', 'valora', 'advanced'],
  },
  {
    title: 'A Technical Overview of Celo Light Client Protocol',
    description: 'A comprehensive breakdown of celo light client protocol',
    preview: require('./showcase/intermediate/celo-light-client.png'),
    website: '/blog/tutorials/a-technical-overview-of-celo-light-client-protocol',
    tags: ['intermediate','celo','sdk','valora','celosage'],
  },
  {
    title: 'Cryptography in Blockchain - An Overview of Hash Functions and Digital Signatures',
    description: ' Cryptography plays a critical role in ensuring the security and privacy of data in the blockchain, the Distributed Ledger Technology (DLT) that has gained widespread adoption in recent years.',
    preview: require('./showcase/intermediate/cryptography-in-blockchain-an-overview-of-hash-functions-and-digital-signatures.png'),
    website: '/blog/tutorials/cryptography-in-blockchain-an-overview-of-hash-functions-and-digital-signatures',
    tags: ['celosage', 'intermediate'],
  },
   {
    title: 'Creating a Charity Donation dApp using Celo Composer, React and Rainbowkit Celo',
    description: 'A step-by-step guide on how to build a charity donation dapp using Celo Composer and React and Rainbow Kit.',
    preview: require('./showcase/intermediate/creating-a-charity-donation-dApp-using-celo-composer-and-react-and-rainbowKit-celo.png'),
    website: '/blog/tutorials/creating-a-charity-donation-dApp-using-celo-composer-and-react-and-rainbowKit-celo',
    tags: ['celosage', 'intermediate', 'composer', 'react', 'typescript', 'metamask', 'javascript'],
  },
  {
    title: 'Build, deploy and host your Celo Smart Contract on QuickNode Using Celo Composer',
    description: 'In this tutorial, we will walk you through the process of building, deploying, hosting, and interacting with a Celo contract using QuickNode.',
    preview: require('./showcase/intermediate/build-deploy-and-host-your-celo-smart-contract-on-quicknode-using-celo-composer.png'),
    website: '/blog/tutorials/build-deploy-and-host-your-celo-smart-contract-on-quicknode-using-celo-composer',
    tags: ['celosage', 'intermediate', 'composer', 'react', 'typescript', 'metamask', 'javascript'],
  },
  {
    title: 'How to build a Basic CRUD App in Solidity',
    description: 'This post will teach you how to create a basic Create, Read, Update and Delete (CRUD) smart contract and test it with the Truffle framework.',
    preview: require('./showcase/beginner/how-to-build-a-basic-crud-app-in-solidity.png'),
    website: 'blog/tutorials/how-to-build-a-basic-crud-app-in-solidity',
    tags: ['celosage','beginner'],
  },
  {
    title: 'On-Chain Randomness with Celo using Subgraphs',
    description: 'This tutorial covers using Celo Randomness and Subgraph to make a simple lottery game. Users create lottery clubs with Native Coin prizes, stable tokens, or NFT Tokens.',
    preview: require('./showcase/intermediate/on-chain-randomness-with-celo-using-subgraphs.png'),
    website: '/blog/tutorials/on-chain-randomness-with-celo-using-subgraphs',
    tags: ['celosage','intermediate', 'subgraphs', 'randomness'],
  },
  {
    title: 'Navigating through Celo docs in a helpful manner for a newbie developer',
    description: 'In this article I will be trying to share a pathway to ake your developing journey with ease.',
    preview: require('./showcase/beginner/Navigating-the-celo-documentation.png'),
    website: '/blog/tutorials/navigating-through-celo-docs-in-a-helpful-manner-for-a-newbie-developer',
    tags: ['celosage','beginner'],
  },
  {
    title: 'Build In Public - Tips for making an impact',
    description: 'In this article we will discuss the benifits of having an online presence and the ways it can make your developer experience easy and enjoyable.',
    preview: require('./showcase/beginner/build-in-public.png'),
    website: '/blog/tutorials/build-in-public-tips-for-making-an-impact',
    tags: ['celosage','beginner'],
  },
  {
    title: 'Building Decentralized Applications on Celo, Best Practices for DApp Development',
    description: 'Learn the best pratices to build better and more effective decentralized app on Celo',
    preview: require('./showcase/intermediate/building-dapp-on-celo.png'),
    website: 'blog/tutorials/building-decentralized-applications-on-celo-best-practices',
    tags: ['solidity', 'intermediate','celosage'],
  },
  {
    title: 'How to render Celo NFT in your React Native mobile Dapp',
    description: 'This will help mobile developers on how to integrate render Celo  NFT metadata on mobile Dapps uisng  center multichain NFT API and Wallet Connect SDK.',
    preview: require('./showcase/intermediate/How-to-render-Celo-NFT-in-your-React-Native-mobile-Dapp.png'),
    website: '/blog/tutorials/How-to-render-Celo-NFT-in-your-React-Native-mobile-Dapp',
    tags:['celosage', 'mobile','dapp', 'reactnative','intermediate' ],
  },
  {
    title: 'How to swap Celo tokens on Uniswap programmatically with code',
    description: 'In this tutorial, we show you how to build an automated Celo token swapper using ethersJS and Uniswap SDK.',
    preview: require('./showcase/intermediate/how-to-swap-celo-tokens-on-uniswap-programmatically.png'),
    website: '/blog/tutorials/how-to-swap-celo-tokens-on-uniswap-programmatically',
    tags: ['celosage', 'celo', 'intermediate', 'metamask', 'nodejs', 'javascript'],
  },
  {
    title: 'Exploring the intersection of Artificial Intelligence and Web3',
    description: 'In this article we will explore the ways in which the AI can help to develop dApps and to improve the productivity of all in Web3',
    preview: require('./showcase/beginner/exploring-intersection-of-ai-and-web3.png'),
    website: '/blog/tutorials/exploring-the-intersection-of-artificial-intelligence-and-web3',
    tags: ['celosage','beginner'],
  },
  {
    title: 'Build a Decentralized Lottery Game on Celo',
    description: 'Learn to build a Decentralized Lottery Game on Celo along with a frontend.',
    preview: require('./showcase/intermediate/build-a-decentralized-lottery-game-on-celo.png'),
    website: '/blog/tutorials/build-a-decentralized-lottery-game-on-celo',
    tags: ['celosage', 'intermediate', 'hardhat', 'solidity', 'randomness', 'javascript'],
  },
   {
    title: 'Building a Multi-Party Escrow DApp using Celo Atomic And Batch Transactions',
    description: 'In this tutorial we will build a Multi-Party Escrow DApp using Celo Atomic And Batch Transactions. The tutorial will focus more on batch transactions and its importance.',
    preview: require('./showcase/intermediate/building-a-multi-party-escrow-dApp-using-celo-atomic-and-batch-transactions.png'),
    website: '/blog/tutorials/building-a-multi-party-escrow-dApp-using-celo-atomic-and-batch-transactions',
     tags: ['celosage', 'intermediate', 'hardhat', 'solidity', 'nextjs', 'javascript', 'celo', 'composer', 'celowallet', 'contractkit', 'dapp', 'typescript', 'smartcontract'],
  },
  {
    title: 'Build a Decentralized Parking Ticket Payments DApp on Celo',
    description: 'Build and deploy a decentralized Parking Tickets issuing and payments dapp on Celo alfajores network.',
    preview: require('./showcase/intermediate/build-a-decentralized-parking-ticket-payments-dapp-on-celo.png'),
    website: '/blog/tutorials/build-a-decentralized-parking-ticket-payments-dapp-on-celo',
    tags: ['celosage', 'intermediate', 'solidity', 'hardhat', 'smartcontract'],
  },
  {
    title: 'Build a FullStack User Authentication Dapp With React and Celo',
    description: 'This tutorial will guide you through the process of building a React Dapp that restricts access to a catalogue of pages based on Celo authentication.',
    preview: require('./showcase/intermediate/build-a-fullstack-user-authentication-dapp-with-react-and-celo.png'),
    website: '/blog/tutorials/build-a-fullstack-user-authentication-dapp-with-react-and-celo',
    tags: ['celosage', 'celo', 'intermediate', 'react', 'metamask'],
  },
  {
    title: 'Build a FullStack Token Swap Application on Celo using React and 0x API',
    description: 'This tutorial will guide you through the process of building a full-stack token swap application on the Celo blockchain using React and the 0x API.',
    preview: require('./showcase/intermediate/build-a-fullStack-token-swap-application-on-celo-using-react-and-0x-api.png'),
    website: '/blog/tutorials/build-a-fullStack-token-swap-application-on-celo-using-react-and-0x-api',
    tags: ['celosage', 'celo', 'intermediate', 'react'],
  },
  {
    title: 'Build and Deploy a Secure Multi-Signature Wallet on the Celo Blockchain',
    description: 'In this tutorial, we will walk through the process of creating a secure multi-signature wallet on the Celo blockchain.',
    preview: require('./showcase/intermediate/build-and-deploy-a-secure-multi-signature-wallet-on-the-celo-blockchain.png'),
    website: '/blog/tutorials/build-and-deploy-a-multi-signature-wallet-on-celo',
    tags: ['celosage', 'celo', 'intermediate', 'solidity', 'javascript'],
  },
  {
    title: 'Build a Secure and Decentralized Product Delivery Dapp on the Celo Blockchain with Escrow Smart Contract',
    description: 'In this tutorial, we build a full-stack decentralized application for secure product delivery on the Celo blockchain using escrow smart contracts.',
    preview: require('./showcase/intermediate/build-a-decentralized-product-delivery-dapp-with-escrow-smart-contracts.png'),
    website: '/blog/tutorials/build-a-secure-and-decentralized-product-delivery-dapp-with-escrow-smart-contracts',
    tags: ['celosage', 'celo', 'intermediate', 'react', 'solidity'],
  },
  {
    title: 'Build A Decentralized Freelancer Marketplace On The Celo Blockchain Part 2',
    description: 'In this tutorial, we will build the front end for the part 1 where we built the smart contract for a freelancer marketplace where people can find freelancers for their projects',
    preview: require('./showcase/intermediate/build-a-decentralized-freelancer-marketplace-on-the-celo-blockchain-part-2.png'),
    website: '/blog/tutorials/build-a-decentralized-freelancer-marketplace-on-the-celo-blockchain-part-2',
    tags: ['celosage', 'solidity', 'celo', 'intermediate'],
  },
  {
    title: 'Build A Decentralized Medical Dapp Using Celo Composer And IPFS Storage',
    description: 'In this tutorial, we will build a Dapp that allows clinical admin to create and manage the medical records of patients. ',
    preview: require('./showcase/intermediate/Build-A-Decentralized-Medical-Dapp-Using-Celo-Composer-And-IPFS-Storage.png'),
    website: '/blog/tutorials/Build-A-Decentralized-Medical-Dapp-Using-Celo-Composer-And-IPFS-Storage',
    tags: ['celosage', 'solidity', 'celo', 'intermediate', 'composer','contractkit', 'dapp', 'typescript'],
  },
  {
    title: 'How To Automate Your Smart Contract Verification Programmatically on Celoscan using Hardhat On Every Deployment',
    description: 'This tutorial will guide you through the step-by-step process of setting up Hardhat, creating a smart contract and automating the verification process on Celoscan on every deployment.',
    preview: require('./showcase/intermediate/how-to-automate-your-smart-contract-verification-programmatically-on-celoscan-using-hardhat-on-every-deployment.png'),
    website: '/blog/tutorials/how-to-automate-your-smart-contract-verification-programmatically-on-celoscan-using-hardhat-on-every-deployment',
    tags: ['celosage', 'celo', 'intermediate', 'hardhat', 'solidity', 'smartcontract'],
  },
  {
    title: 'Build a Scan-to-Pay Shareable Link dApp on Celo',
    description: 'Learn how to build a dApp on the Celo blockchain that enables users to quickly and easily make payments using a simple scan-to-pay feature.',
    preview: require('./showcase/intermediate/build-a-scan-to-pay-shareable-link-dapp-on-celo.png'),
    website: '/blog/tutorials/build-a-scan-to-pay-shareable-link-dapp-on-celo',
    tags: ['celosage', 'celo', 'intermediate', 'react', 'metamask', 'valora' ],
  },
   {
    title: 'How to Build a Full Stack Voting Dapp on Celo',
    description: 'In this tutorial, we will explore how to build a full-stack voting dapp on Celo using Celo Composer and Hardhat.',
    preview: require('./showcase/intermediate/How-to-Build-a-Full-Stack-Voting-Dapp-on-Celo.png'),
    website: '/blog/tutorials/How-to-Build-a-Full-Stack-Voting-Dapp-on-Celo',
    tags: ['celosage', 'celo', 'intermediate', 'react', 'metamask', 'celowallet','contractkit','dapp','typescript', 'smartcontract', 'solidity', 'nextjs'],
  },
  {
    title: 'Build Your Own Full stack Token Airdrop dApp on Celo Blockchain',
    description: 'In this tutorial, you will learn how to a dApp that allows users sign up for an airdrop and receive tokens automatically deposited into their Celo address.',
    preview: require('./showcase/intermediate/build-your-own-full-stack-token-airdrop-dapp-on-celo-blockchain.png'),
    website: '/blog/tutorials/build-your-own-full-stack-token-airdrop-dapp-on-celo-blockchain',
    tags: ['celosage', 'celo', 'intermediate', 'react', 'metamask'],
  },
  {
    title: 'Build a Full Stack Decentralized Payroll Dapp on Celo Using Celo Composer',
    description: 'In this tutorial, we will walk you through the steps to build a full-stack decentralized payroll dApp using Celo composer, a toolkit for building smart contracts on the Celo blockchain.',
    preview: require('./showcase/intermediate/Build-a-Full-Stack-Decentralized-Payroll-Dapp-on-Celo-Using-Celo-Composer.png'),
    website: '/blog/tutorials/Build-a-Full-Stack-Decentralized-Payroll-Dapp-on-Celo-Using-Celo-Composer',
    tags: ['celosage', 'celo', 'intermediate', 'react', 'metamask', 'celowallet','contractkit','dapp','typescript', 'smartcontract', 'solidity', 'nextjs'],
  },
  {
    title: 'Build A Decentralized Freelancer Marketplace On The Celo Blockchain Part 1',
    description: 'In this tutorial, we will build a freelancer marketplace where people can find freelancers for their projects',
    preview: require('./showcase/intermediate/build-a-decentralized-freelancer-marketplace-on-the-celo-blockchain-part-1.png'),
    website: '/blog/tutorials/build-a-decentralized-freelancer-marketplace-on-the-celo-blockchain-part-1',
    tags: ['celosage', 'solidity', 'celo', 'intermediate'],
  },
  {
    title: 'Build A Full Stack Ecommerce Dapp On The Celo Blockchain',
    description: 'In this tutorial, we will build a full stack ecommerce dapp where users can buy and sell products in a decentralized way',
    preview: require('./showcase/intermediate/build-a-full-stack-ecommerce-dapp-on-the-celo-blockchain.png'),
    website: '/blog/tutorials/build-a-full-stack-ecommerce-dapp-on-the-celo-blockchain',
    tags: ['celosage', 'solidity', 'celo', 'react', 'intermediate'],
  },
  
  {
    title: 'Build And Deploy A Multi Token wallet On The Celo Blockchain.',
    description: 'In this tutorial, you will learn how to build a multi token wallet that allows you to manage your crypto assets in a decentralized way.',
    preview: require('./showcase/intermediate/build-and-deploy-a-multi-token-wallet-on-the-celo-blockchain.png'),
    website: '/blog/tutorials/build-and-deploy-a-multi-token-wallet-on-the-celo-blockchain',
    tags: ['celosage', 'celo', 'intermediate', 'solidity'],
  },
  {
    title: 'Build an Educational Credential Verification System On the Celo Blockchain',
    description: 'In this tutorial, you will learn how to build a system to verify educational credentials on the blockchain',
    preview: require('./showcase/intermediate/build-an-educational-credential-verification-system-on-the-celo-blockchain.png'),
    website: '/blog/tutorials/build-an-educational-credential-verification-system-on-the-celo-blockchain',
    tags: ['celosage', 'solidity', 'celo', 'intermediate'],
  },
  {
    title: 'Blockchain Basics - An Introduction to Web3 Terms and concepts with Celo',
    description: 'Basics of blockchain and NFTs,DEFI,and Web3 terms with Celo',
    preview: require('./showcase/beginner/blockchain-basics.png'),
    website: '/blog/tutorials/blockchain-basics-an-introduction-to-web3-terms-and-concepts-with-celo',
    tags: ['celosage','beginner'],
  },
  {
    title: 'Building an NFT Marketplace on Celo with Python',
    description: 'This tutorial provides a guide on how to use Python to build an NFT marketplace on the Celo blockchain',
    preview: require('./showcase/intermediate/building-an-nft-marketplace-on-celo-with-python.png'),
    website: 'blog/tutorials/building-an-nft-marketplace-on-celo-with-python',
    tags: ['celosage', 'nft', 'smartcontract', 'solidity', 'intermediate', 'celo'], 
  }, 
  {
    title: 'Building A Decentralized Ride Sharing Platform Using Solidity On Celo',
    description: 'This tutorial, we will learn how to write smart contract for a decentralized ride sharing platform',
    preview: require('./showcase/intermediate/building-a-decentralized-ride-sharing-platform-using-solidity-on-celo.png'),
    website: 'blog/tutorials/building-a-decentralized-ride-sharing-platform-using-solidity-on-celo',
    tags: ['celosage', 'smartcontract', 'solidity', 'intermediate', 'celo'], 
  }, 
  {
    title: 'Building a Crowdfunding Platform on Celo with Python',
    description: 'This tutorial provides a guide on how to use Eth-Brownie Python to build a decentralized crowdfunding platform on the Celo blockchain',
    preview: require('./showcase/intermediate/building-a-crowdfunding-platform-on-celo-with-python.png'),
    website: 'blog/tutorials/building-a-crowdfunding-platform-on-celo-with-python',
    tags: ['celosage', 'crowdfunding', 'smartcontract', 'solidity', 'intermediate', 'celo'], 

  },
  {
    title: 'Building a Decentralized Identity System with Solidity and ERC-735 On Celo',
    description: 'In This tutorial we will learn how to build a decentralized identity system with solidity and ERC-735 on celo',
    preview: require('./showcase/intermediate/building-a-decentralized-identity-system-with-solidity-and-erc-735-on-celo.png'),
    website: '/blog/tutorials/building-a-decentralized-identity-system-with-solidity-and-erc-735-on-celo',
    tags: ['celosage', 'solidity', 'celo', 'intermediate'],
  },
  {
    title: 'Como construir e realizar deploy de contratos Factory no blockchain Celo',
    description: 'Explicar e construir um contract Factory na prática usando Remix',
    preview: require('./showcase/intermediate/How-to-Build-and-Deploy-Factory-Contracts-on-Celo-Blockchain.png'),
    website: 'blog/tutorials/como-construir-e-realizar-deploy-de-contratos-Factory-no-blockchain-Celo',
    tags: ['intermediate','celosage','solidity','smartcontract','video'],
  },
  {
    title: 'Signature Replay Attack',
    description: ' A signature replay attack is an attack whereby a previously executed valid transaction is fraudulently or maliciously repeated on the same blockchain or a different blockchain.',
    preview: require('./showcase/advanced/solidity-vulnerabilities-signature-replay-attack.png'),
    website: '/blog/tutorials/solidity-vulnerabilities-signature-replay-attack',
    tags: ['celosage','advanced', 'solidity'],
  },
  {
    title: 'Como Construir em Celo Usando Tatum',
    description: 'Aprenda como realizar um deploy ERRC20 em Celo usando Tatum.',
    preview: require('./showcase/beginner/como-construir-em-celo-usando-tatum.png'),
    website: 'blog/tutorials/como-construir-em-celo-usando-tatum',
    tags: ['beginner','celosage','ERC20','smartcontract','video'],
  },
  {
    title: 'Como Criar um Jogo de Roleta Russa na Blockchain Celo',
    description: 'Aprenda como criar um smart contract de aposta que funciona como uma roleta russa na blockchain Celo.',
    preview: require('./showcase/advanced/como-criar-um-jogo-de-roleta-russa-na-blockchain-celo.png'),
    website: 'blog/tutorials/como-criar-um-jogo-de-roleta-russa-na-blockchain-celo',
    tags: ['advanced','celosage','smartcontract','video', 'hardhat'],
  },
  {
    title: 'Learn to Navigate Advanced Celo Wallet Features',
    description: 'learn how to navigate the Celo wallet platform with ease and take advantage of its full range of capabilities',
    preview: require('./showcase/intermediate/advanced-celo-wallet-features.png'),
    website: '/blog/tutorials/learn-to-navigate-advanced-celo-wallet-features',
    tags: ['celosage', 'celowallet', 'intermediate'],
  },
  {
    title: 'Aprenda solidity e como criar os primeiros smart contract usando a IDE Remix',
    description: 'Explicarei sobre conceitos de solidity e como criar seu primeiro smart contract.',
    preview: require('./showcase/intermediate/Aprenda-solidity-e-como-criar-os-primeiros-smart-contract-usando-a-IDE-Remix.png'),
    website: 'blog/tutorials/Aprenda-solidity-e-como-criar-os-primeiros-smart-contract-usando-a-IDE-Remix',
    tags: ['beginner','celosage','openzeppelin', 'solidity','smartcontract','video'],
  },
  {title: 'Como melhorar a segurança de seu smart contract',
  description: 'Explicarei os casos mais comuns de ataques e como proteger seu smart contract contra eles.',
  preview: require('./showcase/intermediate/como-melhorar-a-seguranca-do-seu-smart-contract.png'),
  website: 'blog/tutorials/como-melhorar-a-seguranca-de-seu-smart-contract',
  tags: ['intermediate','celosage', 'solidity','smartcontract','video'],
  },
  {title: 'Escrow service on Celo that holds funds until certain conditions are met',
  description: 'This is an example of a smart contract where a guarantee can be defined between buyer and seller.',
  preview: require('./showcase/intermediate/escrow-service-on-celo-that-holds-funds-until-certain-conditions-are-met.png'),
  website: 'blog/tutorials/escrow-service-on-celo-that-holds-funds-until-certain-conditions-are-met',
  tags: ['intermediate','celosage', 'solidity','smartcontract','remix'],
  },
  {
    title: 'A Solidity Smart Contract For Auctioning Flowers On The Celo Blockchain',
    description: 'This project is a Solidity smart contract for a floral auction. It allows users to create flowers with a name, description, image, and initial price, and then sell them through an auction.',
    preview: require('./showcase/intermediate/A-Solidity-Smart-Contract-for-Auctioning-Flowers-on-the-celo-Blockchain.png'),
    website: 'blog/tutorials/A-Solidity-Smart-Contract-For-Auctioning-Flowers-On-The-Celo-Blockchain',
    tags: ['celosage', 'solidity','smartcontract','intermediate', 'celo'],
  },
  {
    title: 'A deep dive into Celo Consensus Mechanism',
    description: 'Creating a simple NFT marketplace on the Celo Blockchain using Hardhat to create smart contracts',
    preview: require('./showcase/intermediate/deep-dive-into-celo-mechanism.png'),
    website: 'blog/tutorials/a-deep-dive-into-celo-consensus-mechanism',
    tags: ['intermediate','celo', 'celosage'],
  },
  {
    title: 'Como implantar um contrato inteligente ERC721 usando a API Tatum',
    description: 'Aprenda como realizar um deploy ERC721 em Celo usando Tatum.',
    preview: require('./showcase/intermediate/Como-implantar-um-contrato-inteligente-ERC721-usando-a-API-Tatum.png'),
    website: 'blog/tutorials/como-implantar-um-contrato-inteligente-ERC721-usando-a-API-Tatum',
    tags: ['intermediate','celosage','erc721','smartcontract','video'],
  },
 {
  title: 'How to Build and Deploy Factory Contracts on Celo Blockchain',
  description: 'This article will demonstrate how to use the factory pattern to correctly deploy multiple instances of your smart contract',
  preview: require('./showcase/intermediate/factorycover.png'),
  website: 'blog/tutorials/how-to-build-and-deploy-factory-contracts-on-celo',
  tags: ['solidity', 'intermediate', 'celosage', 'smartcontract', 'celo'],
  },
  {
    title: 'Aprenda sobre Oraculos em Celo',
    description: 'Aprenda e entenda mais sobre oraculos em Celo.',
    preview: require('./showcase/intermediate/aprenda_sobre_oraculos.png'),
    website: 'blog/tutorials/aprenda-sobre-oraculos',
    tags: ['intermediate','celosage','smartcontract','video'],
  },
  {
    title: 'Creating Smart Contracts for liquidity farming',
    description: ' Describing Smart Contracts For Liquidity Farming And The Technical Side Of Creating Them.',
    preview: require('./showcase/intermediate/creating-smart-contracts-for-liquidity-farming.png'),
    website: 'blog/tutorials/creating-smart-contracts-for-liquidity-farming',
    tags: ['intermediate','celosage','solidity','smartcontract'],
  },
   {
    title: 'Comprehensive Guide to building a token bridge on Celo',
    description: 'Have you ever wondered how to build a bridge that allows seamless transfer of assets between the Celo network and other Ethereum-based networks, such as the Ethereum mainnet or a testnet like Mumbai? This tutorial is for you.',
    preview: require('./showcase/advanced/comprehensive-guide-to-building-a-token-bridge-on-celo.png'),
    website: 'blog/tutorials/comprehensive-guide-to-building-a-token-bridge-on-celo',
    tags: ['solidity', 'react', 'celo', 'smartcontract', 'nextjs', 'advanced', 'tokens', 'celosage'],
  },
  {
    title: 'cUsd-based Event Ticketing and Management System',
    description: 'This project is a smart contract written in the Solidity programming language on the celo blockchain. The contract is called "Evently" and it allows users to create and buy tickets for events.',
    preview: require('./showcase/intermediate/cUsd-based-event-ticketing-and-management-system.png'),
    website: 'blog/tutorials/cUsd-based-event-ticketing-and-management-system',
    tags: ['intermediate','celosage','solidity','smartcontract'],
  },
  {
    title: 'Como criar uma carteira para a blockchain Celo',
    description: 'Aprenda como criar uma carteira para a blockchain Celo no seu navegador',
    preview: require('./showcase/beginner/como-criar-uma-carteira-para-a-blockchain-celo.png'),
    website: 'blog/tutorials/como-criar-uma-carteira-para-a-blockchain-celo',
    tags: ['celosage', 'video', 'beginner', "celo", "metamask"],
  },
  {
    title: 'Como integrar seu smart contract ao oráculo da Redstone Finance',
    description: 'Aprenda como conectar seu smart contract à rede de oráculos da Redstone Finance',
    preview: require('./showcase/advanced/como-integrar-seu-smart-contract-ao-oraculo-da-redstone-finance.png'),
    website: 'blog/tutorials/como-integrar-seu-smart-contract-ao-oraculo-da-redstone-finance',
    tags: ['celosage', 'video', 'advanced', "celo", "solidity", "hardhat"],
  },
  {
    title: 'Como conectar o seu dApp a Celo Blockchain com a Lava',
    description: 'Aprenda como conectar seu dApp a rede de full nodes da Lava',
    preview: require('./showcase/beginner/como-conectar-o-seu-dapp-a-celo-blockchain-com-a-lava.png'),
    website: 'blog/tutorials/como-conectar-o-seu-dapp-a-celo-blockchain-com-a-lava',
    tags: ['celosage', 'video', 'beginner', "celo", "react"],
  },
  {
    title: 'Como otimizar os custos de gas em seu smart contract',
    description: 'Aprenda como otimizar seu smart contract para economizar gas',
    preview: require('./showcase/advanced/como-otimizar-os-custos-de-gas-em-seu-smart-contract.png'),
    website: 'blog/tutorials/como-otimizar-os-custos-de-gas-em-seu-smart-contract',
    tags: ['celosage', 'video', 'advanced', "celo", "solidity", "hardhat"],
  },
  {
    title: 'Como enviar e verificar um contrato na blockchain Celo com o hardhat-celo',
    description: 'Aprenda como enviar e verificar um contrato inteligente na blockchain Celo',
    preview: require('./showcase/intermediate/como-enviar-e-verificar-um-contrato-com-hardhat-celo.png'),
    website: 'blog/tutorials/como-enviar-e-verificar-um-contrato-com-hardhat-celo',
    tags: ['celosage', 'solidity', 'video', 'hardhat', 'intermediate'],
  },
  {
    title: 'Create a Decentralized Advertising Platform Using Solidity on Celo',
    description: 'In this tutorial, we will be building a advertising smart contract using solidity and deploy to the celo blockchain',
    preview: require('./showcase/intermediate/create-a-decentralized-advertising-platform-using-solidity-on-celo.png'),
    website: 'blog/tutorials/create-a-decentralized-advertising-platform-using-solidity-on-celo',
    tags: ['celosage', 'solidity', 'intermediate'],
  },
  {
    title: 'C# mobile App to display Celo NFTs',
    description: 'Learn how build an Android app with C# and connect to Celo network to retriever NFT metadata and display NFT in the app.',
    preview: require('./showcase/advanced/c-sharp-mobile-dapp-to-display-celo-nfts.png'),
    website: 'https://docs.celo.org/blog/2022/07/15/csharp-mobile-app-to-display-celo-nfts',
    tags: ['advanced','foundation', 'mobile', 'android', 'nft', 'popular'],
  },
  {
    title: 'Flutter & Celo - Easily build Flutter Mobile dApps',
    description: 'Celo Composer now supports Flutter. Quickly develop mobile apps on Celo.',
    preview: require('./showcase/intermediate/flutter-and-celo-easily-build-flutter-mobile-dapps.png'),
    website: 'blog/tutorials/flutter-celo-easily-build-flutter-mobile-dApps',
    tags: ['intermediate','foundation', 'flutter', 'composer'],
  },
  {
    title: 'FloralNft Smart Contract for Buying and Gifting Flowers as NFTs',
    description: 'FloralNft is a smart contract built on the Celo blockchain that allows users to create and trade unique digital flowers as non-fungible tokens (NFTs).',
    preview: require('./showcase/intermediate/FloralNft-Smart-Contract-for-Buying-and-Gifting-Flowers-as-NFTs.png'),
    website: 'blog/tutorials/floralNft-smart-contract-for-buying-and-gifting-flowers-as-nfts',
    tags: ['celosage', 'solidity', 'intermediate', 'celo'],
  },
  {
    title: "Flutter & Celo - Easily build Flutter Mobile dApps",
    description:
      "Celo Composer now supports Flutter. Quickly develop mobile apps on Celo.",
    preview: require("./showcase/intermediate/flutter-and-celo-easily-build-flutter-mobile-dapps.png"),
    website: "blog/tutorials/flutter-celo-easily-build-flutter-mobile-dApps",
    tags: ["intermediate", "foundation", "flutter", "composer"],
  },
  {
    title: 'Step-by-Step Guide to Deploying your First Full-Stack Dapp on Celo.',
    description: 'Building a Full Stack Web3 Dapp to mint an NFT.',
    preview: require('./showcase/intermediate/step-by-step-guide-to-deploying-your-first-full-stack-dapp-on-celo.png'),
    website: '/blog/tutorials/step-by-step-guide-to-deploying-your-first-full-stack-dapp-on-celo',
    tags: ['intermediate', 'solidity','celosage','erc721','truffle'],
  },
  {
    title: 'Dynamic NFT Creation using SVG to build in Smart Contract on Celo.',
    description: 'Welcome to our tutorial on dynamic NFT creation using SVG to build in a smart contract on Celo!',
    preview: require('./showcase/intermediate/dynamic-nft-creation-using-svg-to-build-in-smart-contract-on-celo.png'),
    website: '/blog/tutorials/dynamic-nft-creation-using-svg-to-build-in-smart-contract-on-celo',
    tags: ['intermediate', 'solidity','celosage','erc721','truffle'],
  },
   {
    title: 'How to deploy a celo composer application on spheron protocol(decentralized cloud storage).',
    description: 'In this tutorial, you will learn how to deploy a dapp built using celo composer on a decentalised cloud service called spheron protocol.',
    preview: require('./showcase/intermediate/How_to_deploy_a_Celo_Composer_application_on_Spheron_protocol.png'),
    website: '/blog/tutorials/how-to-deploy-a-celo-composer-application-on-spheron-protocol',
    tags: ["intermediate", "composer", "dapp", "dappstarter", "deploy", "celosage"],
  },
  {
    title: 'Using Witnet.io Oracle to Connect Smart Contracts to Off-Chain Data with Celo',
    description: 'Connecting smart contracts to off-chain data on the Celo platform is made possible through the integration of the decentralized oracle network, Witnet.io!',
    preview: require('./showcase/intermediate/using-witnetio-oracle-to-connect-smart-contracts-to-off-chain-data-with-celo.png'),
    website: '/blog/tutorials/using-witnetio-oracle-to-connect-smart-contracts-to-off-chain-data-with-celo',
    tags: ['intermediate', 'solidity','celosage','erc721','truffle'],
  },
  {
    title: 'Composer Series - Build a Crowdfunding ReFi dApp with Celo Composer',
    description: 'How to quickly create and deploy a full-stack crowdfunding dApp on Celo.',
    preview: require('./showcase/advanced/celo-composer-build-a-crowdfunding-refi-dapp-with-celo-composer.png'),
    website: 'blog/2022/06/21/composer-series-build-a-crowdfunding-refi-dApp-with-celo-composer',
    tags: ['advanced', 'foundation', 'crowdfunding', 'composer'],
  },
  {
    title: 'Exploring Solidity Low-Level Features - ABI Encoding and Opcodes',
    description: ' Solidity also has low-level features that allow developers to interact with the Ethereum Virtual Machine (EVM) at a lower level. Two of these features are ABI encoding and opcodes.',
    preview: require('./showcase/intermediate/exploring-solidity-low-level-features-abi-encoding-and-opcodes.png'),
    website: '/blog/tutorials/exploring-solidity-low-level-features-abi-encoding-and-opcodes',
    tags: ['celosage', 'intermediate',],
  },
  {
    title: "Gas Optimization Techniques in Solidity on Celo",
    description:
      "Optimizing smart contract performance is an essential aspect of blockchain development.",
    preview: require("./showcase/advanced/gas-optimization-techniques-in-solidity.png"),
    website: "/blog/tutorials/gas-optimization-techniques-in-solidity",
    tags: ["celosage", "advanced", "solidity"],
  },
  {
    title: 'How to Assemble a Web3 Dream Team and Build a High Value dApp',
    description: 'There are multiple factors to consider when assembling a web3 dream team.',
    preview: require('./showcase/beginner/How-to-Assemble-a-Web3-Dream-Team-and-Build-a-High-Value-dApp.png'),
    website: 'blog/tutorials/how-to-assemble-a-web3-dream-team-and-build-a-high-value-dapp',
    tags: ['celo', 'dapp', 'beginner', 'celosage'],
  },
  {
    title: 'Leveraging the Power of Smart Contracts to Enhance Voting Security',
    description: 'Discover how the implementation of smart contracts can strengthen the security and transparency of voting systems, revolutionizing the way we approach democracy.',
    preview: require('./showcase/intermediate/ballot.png'),
    website: 'blog/tutorials/leveraging-the-power-of-smart-contracts-to-enhance-voting-security',
    tags: ['celo', 'intermediate', 'solidity', 'celosage'],
  },
  {
    title: 'How to Build a Full Stack Dapp For Selling Football Tickets on Celo',
    description: 'Learn how to build a dapp for seliing football tickets on the celo blockchain',
    preview: require('./showcase/intermediate/How-To-Build-a-Fullstack-Dapp-For-Selling-Football-Tickets.png'),
    website: 'blog/tutorials/how-to-build-a-fullstack-dapp-for-selling-football-tickets-on-celo',
    tags: ['celo', 'dapp', 'intermediate', 'celosage'],
  },
  {
    title: 'How to quickly build an NFT collection on Celo',
    description: 'Create a low-code NFT collection with Celo, IPFS, Pinata, and Remix.',
    preview: require('./showcase/beginner/how-to-quickly-build-an-nft-collection-on-celo.png'),
    website: 'blog/tutorials/how-to-quickly-build-an-nft-collection-on-celo',
    tags: ['beginner','foundation', 'nft', 'foundation'],
  },
  {
    title: "React Native & Celo - Easily build React Native dApps on Celo",
    description:
      "Quickly develop Android and iOS apps on Celo using the Celo Composer for React Native.",
    preview: require("./showcase/intermediate/easily-build-react-native-dapps-on-celo.png"),
    website:
      "blog/tutorials/React-Native-&-Celo-Easily-build-React-Native-dApps-on-Celo",
    tags: ["beginner", "foundation", "nft", "foundation"],
  },
  {
    title: 'How to build a Bookshop Marketplace Dapp on Celo Blockchain',
    description: 'Learn how to build a bookshop marketplace platform on celo blockchain',
    preview: require('./showcase/intermediate/how-to-build-a-bookshop-marketplace-dapp.png'),
    website: 'blog/tutorials/how-to-build-a-bookshop-marketplace-dapp',
    tags: ['celosage','celowallet', 'celo', 'solidity', 'html', 'remix', 'smartcontract', 'intermediate'],
  },
  {
    title: 'How to Write Upgradable Smart Contracts and Deploy to the Celo Blockchain',
    description: 'This tutorial will show you how to write upgradable smart contracts and deploy to the celo blockchain',
    preview: require('./showcase/intermediate/how-to-write-upgradable-smart-contracts-and-deploy-to-the-celo-blockchain.png'),
    website: 'blog/tutorials/how-to-write-upgradable-smart-contracts-and-deploy-to-the-celo-blockchain',
    tags: ['celosage', 'solidity', 'celo', 'intermediate'],
  },
  {
    title: 'How To Build A Multi Signature Wallet Contract That Requires Multiple Approvals For Transactions On Celo',
    description: 'In this tutorial, we will walk through the process of building a multi-signature wallet contract using Solidity and remix ide.',
    preview: require('./showcase/intermediate/how-to-build-a-multi-signature-wallet-contract-that-requires-multiple-approvals-for-transactions-on-celo.png'),
    website: 'blog/tutorials/how-to-build-a-multi-signature-wallet-contract-that-requires-multiple-approvals-for-transactions-on-celo',
    tags: ['celosage', 'solidity', 'celo', 'intermediate'],
  },
  {
    title: 'How To Create And Deploy A Peer To Peer Lending And Borrowing Smart Contract On The Celo Blockchain',
    description: 'In this tutorial, we will learn how to create a fully functional p2p lending and borrowing smart contract on the celo blockchain',
    preview: require('./showcase/intermediate/how-to-create-and-deploy-a-peer-to-peer-lending-and-borrowing-smart-contract-on-the-celo-blockchain.png'),
    website: 'blog/tutorials/how-to-create-and-deploy-a-peer-to-peer-lending-and-borrowing-smart-contract-on-the-celo-blockchain',
    tags: ['celosage', 'solidity', 'celo', 'intermediate'],
  },
  
  {
    title: 'Introduction to creating NFTs on Celo',
    description: 'This tutorial will walk through the basic steps required to create an NFT collection (of ERC-721 tokens) on Celo. ',
    preview: require('./showcase/beginner/introduction-to-creating-nfts-on-celo.png'),
    website: 'https://medium.com/celodevelopers/introduction-to-creating-nfts-on-celo-eb7240a71cc0',
    tags: ['beginner','foundation', 'nft', 'erc721'],
  },
  {
    title: 'Introduction to Zero-Knowledge Technology and its Blockchain Applications',
    description: 'This tutorial is an introduction to zero-knowledge technology and some use cases in the blockchain space',
    preview: require('./showcase/intermediate/introduction-to-zero-knowledge-technology-and-its-blockchain-applications.png'),
    website: 'blog/tutorials/introduction-to-zero-knowledge-technology-and-its-blockchain-applications',
    tags: ['celosage', 'intermediate'],
  },
  {
    title: ' How to Build Car Marketplace dapp Using React',
    description: 'Learn how to build a Car Marketplace on the Celo Blockchain with React as frontend framework',
    preview: require('./showcase/intermediate/how-to-build-car-marketplace-using-react.png'),
    website: 'blog/tutorials/how-to-build-car-marketplace-dapp-with-react',
    tags: ['celowallet', 'celo', 'solidity', 'react', 'celosage', 'intermediate'],
  },
  {
    title: 'How to Build a Seed Marketplace dApp using Celo, Solidity and Javascript',
    description: 'Learn how to build a seed marketplace on the blockchain using Celo, Solidity and Javascript',
    preview: require('./showcase/intermediate/Building_your_First_Marketplace_Dapp_on_Celo.png'),
    website: 'blog/tutorials/how-to-build-a-seed-marketplace-dapp-using-celo-solidity-and-javascript',
    tags: ['celosage', 'celo', 'solidity', 'html', 'remix', 'smartcontract', 'intermediate', 'javascript'],
  },
  {
    title: 'How to write a multi-signatures contract on Celo using Hardhat | Part 1/2',
    description: 'Building a multi-signatures contract on Celo blockchain using Hardhat, multi-signatures are one of the best way to keep your crypto assets or ownership of your contracts safe and remove a central point of failure.',
    preview: require('./showcase/advanced/how-to-write-a-multi-signatures-contract-on-celo-using-hardhat-part-1-2.png'),
    website: 'blog/tutorials/how-to-write-a-multi-signatures-contract-on-celo-using-hardhat-part-1-2',
    tags: ['celosage', 'celo', 'solidity', 'smartcontract', 'hardhat', 'advanced'],
  },
  {
    title: 'How to write a multi-signatures contract on Celo using Hardhat | Part 2/2',
    description: 'Writing tests for a multi-signatures contract on Celo blockchain using Hardhat, multi-signatures are one of the best way to keep your crypto assets or ownership of your contracts safe and remove a central point of failure.',
    preview: require('./showcase/advanced/how-to-write-a-multi-signatures-contract-on-celo-using-hardhat-part-2-2.png'),
    website: 'blog/tutorials/how-to-write-a-multi-signatures-contract-on-celo-using-hardhat-part-2-2',
    tags: ['celosage', 'celo', 'solidity', 'smartcontract', 'hardhat', 'advanced'],
  },
  {
    title: 'Celo Impact on Underbanked and Unbanked Communities',
    description: 'Celo a blockchain platform aimed at providing financial inclusion and access to financial services for underbanked and unbanked communities',
    preview: require('./showcase/intermediate/unbanked.png'),
    website: '/blog/tutorials/celo-impact-on-underbanked-and-unbanked-communities',
    tags: ['celo', 'intermediate', 'celosage'],
  },
  {
    title: 'Building A Restaurant Coupon NFT System on Celo',
    description: 'We would be going through building a restaurant coupon NFT system where restaurants can add their coupons and others can buy it',
    preview: require('./showcase/advanced/building-a-restaurant-coupon-nft-system.png'),
    website: '/blog/tutorials/building-a-restaurant-coupon-nft-system',
    tags: ['celo', 'advanced', 'celosage', 'nft', 'hardhat'],
  },
  {
    title: 'How to Build a Podcast Streaming Platform on Celo',
    description: 'This tutorial guides you to building a podcast streaming platform on the celo blockchain where anyone can upload their audio experience.',
    preview: require('./showcase/intermediate/how-to-build-podcast-streaming-platform-celo-1.png'),
    website: '/blog/tutorials/how-to-build-podcast-streaming-platform-celo-1',
    tags: ['celo', 'intermediate', 'celosage', 'solidity'],
  },
  {
    title: 'How to Build a Simple Anonymous dapp on Celo',
    description: 'This tutorial guides you through the steps required to building an anonymous decentralized application.',
    preview: require('./showcase/beginner/how-to-build-simple-anonymous-dapp-on-celo.png'),
    website: '/blog/tutorials/how-to-build-simple-anonymous-dapp-on-celo',
    tags: ['celo', 'beginner', 'celosage', 'solidity'],
  },
  {
    title: 'Celo Integration with Web3',
    description: ' A Look at How the Platform is Bridging the Gap Between Centralized and Decentralized Systems',
    preview: require('./showcase/advanced/web3.png'),
    website: '/blog/tutorials/celo-integration-with-web3',
    tags: ['celo', 'advanced', 'solidity', 'celosage'],
  },
  {
    title: 'Building for the Celo Connect Mobile Hackathon',
    description: 'Resources to help you build your mobile-first Celo dApp.',
    preview: require('./showcase/intermediate/building-for-the-celo-connect-mobile-hackathon.png'),
    website: 'https://medium.com/celodevelopers/building-for-the-celo-connect-mobile-hackathon-a78707b7431c',
    tags: ['intermediate','foundation'],
  },
  {
    title: 'Build Your Own Full-Stack NFT Marketplace on Celo',
    description: 'Build a full stack Nft Marketplace on the celo block-chain using ipfs and web3.storage for metadata storage.',
    preview: require('./showcase/intermediate/build-your-own-full-stack-nft-marketplace-on-celo.png'),
    website: 'blog/tutorials/Build-Your-Own-Full-Stack-NFT-Marketplace-on-Celo',
    tags: ['celosage', 'nft', 'solidity', 'celo', 'advanced'],
  },

  {
    title: 'Build Your Own A.I Art NFT Marketplace On The Celo Blockchain',
    description: 'In this tutorial we will build a marketplace for our nft ai generated art works',
    preview: require('./showcase/advanced/build_your_own_ai_art_nft_marketplace_on_the_celo_blockchain.png'),
    website: 'blog/tutorials/build-Your-own-ai-art-nft-marketplace-on-the-celo-blockchain',
    tags: ['celosage', 'nft', 'solidity', 'celo', 'advanced'],
  },
  {
    title: 'Build A Full Stack Decentralized Fund Raising Dapp On The Celo Blockchain',
    description: 'Build a full stack decentralized fundraising platform on the celo blockchain using solidity for the smart contract and reactJS for the front end',
    preview: require('./showcase/intermediate/build-a-full-stack-decentralized-fundraising-dapp-on-the-celo-blockchain.png'),
    website: 'blog/tutorials/build-a-full-stack-decentralized-fund-raising-dapp-on-the-celo-blockchain',
    tags: ['celosage', 'solidity', 'react', 'celo', 'intermediate'],
  },
  {
    title: 'Build A Decentralized Real Estate Marketplace On The Celo Blockchain Part 1',
    description: 'This is a two part tutorial. In this tutorial you will learn how to Build a real estate smart contract using solidity for the smart contract and in the part two, we will build the front end for the smart contract using react js.',
    preview: require('./showcase/intermediate/build_a_decentralized_real_estate_marketplace_on_the_celo_blockchain_part_1.png'),
    website: 'blog/tutorials/build-a-decentralized-real-estate-marketplace-on-the-celo-blockchain-part-1',
    tags: ['celosage', 'solidity', 'celo', 'intermediate'],
  },
  {
    title: 'Build A Decentralized Real Estate Marketplace On The Celo Blockchain Part 2',
    description: 'This is a two part tutorial. In this second part of the tutorial, you will learn how to Build the front end for the smart contract using react js.',
    preview: require('./showcase/intermediate/build-a-decentralized-real-estate-marketplace-on-the-celo-blockchain-part-2.png'),
    website: 'blog/tutorials/build-a-decentralized-real-estate-marketplace-on-the-celo-blockchain-part-2',
    tags: ['celosage', 'react', 'celo', 'intermediate'],
  },
  {
    title: 'Build an NFT Full Stack Monster War Game on The Celo Blockchain',
    description: 'Build a full stack NFT on chain game on the celo blockchain.',
    preview: require('./showcase/advanced/build-an-nft-full-stack-monster-war-game-on-the-celo-blockchain.png'),
    website: 'blog/tutorials/build-an-nft-full-stack-monster-war-game-on-the-celo-blockchain',
    tags: ['celosage', 'nft', 'solidity', 'celo', 'advanced'],
  },
  {
    title: 'Build Your Own Full Stack DAO On the Celo Blockchain',
    description: 'This tutorial will show you how to build a full stack decenralized autonomous organization on the celo blockchain',
    preview: require('./showcase/intermediate/build-your-own-full-stack-dao-on-the-celo-blockchain.png'),
    website: 'blog/tutorials/build-your-own-full-stack-dao-on-the-celo-blockchain',
    tags: ['celosage', 'solidity', 'celo', 'react', 'intermediate'],
  },
  {
    title: 'Build a Staking Mechanism Smart Contract With Solidity On Celo',
    description: 'This tutorial will show you how to build a staking mechanism using solidity and deploy to the blockchain',
    preview: require('./showcase/intermediate/build-a-staking-mechanism-smart-contract-with-solidity-on-celo.png'),
    website: 'blog/tutorials/build-a-staking-mechanism-smart-contract-with-solidity-on-celo',
    tags: ['celosage', 'solidity', 'celo', 'intermediate'],
  },
  {
    title: 'Build Your Own Full Stack NFT AI Art Minter On The Celo Blockchain',
    description: 'In this tutorial, we will build a full stack nft digital art minter that will generate our art with artificial intelligence.',
    preview: require('./showcase/intermediate/build-your-own-fullstack-nft-ai-art-minter-on-the-celo-blockchain.png'),
    website: 'blog/tutorials/build-your-own-full-stack-nft-ai-art-minter-on-the-celo-blockchain',
    tags: ['celosage', 'solidity', 'celo', 'nft', 'react', 'intermediate'],
  },
  {
    title: 'Building a Farmers Market on The Celo Blockchain',
    description: 'This tutorial guides you to building a decentralized marketplace on the celo blockchain.',
    preview: require('./showcase/intermediate/building-a-farmers-market-on-celo.png'),
    website: 'blog/tutorials/building-a-farmers-market-on-celo',
    tags: ["celo", "intermediate", "celosage", "solidity"],
  },
  {
    title: 'Celo Composer - Extend and Customize your Full-Stack Mobile dApps',
    description: 'Step-by-step guide to create a new custom dApp using the Celo Composer.',
    preview: require('./showcase/intermediate/celo-composer-extend-and-customize-your-full-stack-mobile-dapps.png'),
    website: 'blog/tutorials/celo-composer-customize-your-full-stack-mobile-dapps-on-celo',
    tags: ['intermediate','foundation', 'composer'],
  },
  {
    title: 'Celo Smart Contract Security for Interoperable Protocols',
    description: 'This tutorial is part of the Advance Celo Smart contract security pathway. In this tutorial we will cover smart contract security for Interoperable protocols',
    preview: require('./showcase/advanced/celo-smart-contract-security-for-interoperable-protocols.png'),
    website: 'blog/tutorials/celo-smart-contract-security-for-interoperable-protocols',
    tags: ['celo', 'celosage', 'solidity', 'advanced'],
  },
  {
    title: 'Create a Tool for DAOs to Manage their Voting and Proposal Processes On Celo',
    description: 'In this tutorial, we will be building a tool that enables DAO platforms on the Celo blockchain to manage their proposal and voting process. We will use IPFS as our storage layer and all transactions will be gasless.',
    preview: require('./showcase/advanced/create-a-tool-for-daos-to-manage-their-voting-and-proposal-processes-on-celo.png'),
    website: 'blog/tutorials/create-a-tool-for-daos-to-manage-their-voting-and-proposal-processes-on-celo',
    tags: ['solidity', 'react', 'celo', 'smartcontract', 'nextjs', 'advanced', 'dao', 'ipfs','celosage'],
  },
  {
    title: 'A guide to building decentralized loan dapp on the celo blockchain',
    description: 'This tutorial would put you through building a loan app where there would be little need for middlemen like banks',
    preview: require('./showcase/intermediate/a-guide-to-building-decentralized-loan-dapp.png'),
    website: 'blog/tutorials/a-guide-to-building-decentralized-loan-dapp',
    tags: ['celowallet', 'celo', 'solidity', 'celosage', 'intermediate'],
  },
  {
    title: 'ContractKit - A Practical Guide to Interacting with the Celo Core Contracts',
    description: 'How to access the Celo Blockchain with JavaScript using ContractKit.',
    preview: require('./showcase/intermediate/contractkit-a-practical-guide-to-interacting-with-the-celo-core-contracts.png'),
    website: 'blog/tutorials/contractkit-a-practical-guide-to-interacting-with-the-celo-core-contracts',
    tags: ['intermediate','foundation', 'contractkit'],
  },
  {
    title: '3 Simple Steps to Get Started with Valora on Celo',
    description: 'Send, pay, and spend cryptocurrency like everyday money — all from the palm of your hand.',
    preview: require('./showcase/beginner/3-simple-steps-to-get-started-with-valora-on-celo.png'),
    website: 'blog/tutorials/3-simple-steps-to-get-started-with-valora-on-celo',
    tags: ['beginner','foundation', 'valora'],
  },
  {
    title: 'All you need to know about Celo to Ease your Web3 Development Journey you use Celo Blockchain',
    description: 'In this tutorial, we will introduce you to the Celo blockchain and explain the key features and benefits of using it for your web3 development projects.',
    preview: require('./showcase/beginner/All-you-need-to-know-about-Celo-to-Ease-your-Web3-Development.png'),
    website: '/blog/tutorials/All-you-need-to-know-about-Celo-to-Ease-your-Web3-Development-Journey',
    tags: ['celosage', 'celo', 'video', 'remote'],
  },
  {
    title: 'Plumo - An Ultralight Blockchain Client on Celo',
    description: 'How the Celo light client became 1.7 million times lighter than Ethereum.',
    preview: require('./showcase/beginner/plumo-an-ultralight-blockchain-client-on-celo.png'),
    website: 'blog/tutorials/plumo-an-ultralight-blockchain-client-on-celo',
    tags: ['beginner', 'foundation', 'nft'],
  },
  {
    title: 'A Boilerplate guide to Airdropping on Celo',
    description: 'Deploy an Airdrop contract to Celo and claim ERC20 tokens using the web3 SDK.',
    preview: require('./showcase/intermediate/a-boilerplate-guide-to-airdropping-on-celo.png'),
    website: 'blog/tutorials/a-boilerplate-guide-to-airdropping-on-celo',
    tags: ['intermediate','foundation', 'airdrop'],
  },
  {
    title: 'Getting started with DAOs on Celo',
    description: 'Introduction to DAOs and the advantages of building a DAO on Celo.',
    preview: require('./showcase/beginner/getting-started-with-daos-on-celo.png'),
    website: 'blog/tutorials/getting-started-with-daos-on-celo',
    tags: ['beginner','foundation', 'dao'],
  },
  {
    title: 'Hardhat and Celo | The Ultimate Guide to Deploy Celo dApps using Hardhat',
    description: 'How to deploy a smart contract to Celo testnet, mainnet, or a local network using Hardhat.',
    preview: require('./showcase/beginner/the-ultimate-guide-to-deploy-celo-dapps-using-hardhat.png'),
    website: 'blog/tutorials/hardhat-and-celo-the-ultimate-guide-to-deploy-celo-dapps-using-hardhat',
    tags: ['beginner','foundation', 'hardhat'],
  },
  {
    title: 'Create a Car booking web app with the celo payment method part 1',
    description: 'This article is the first part of the tutorial series that teahes how to add celo payment method to a full stack car booking web app.',
    preview: require('./showcase/intermediate/car-booking-web-app-with-celo-as-payment-method-part-1.png'),
    website: 'blog/tutorials/car-booking-web-app-with-celo-as-payment-method-part-1',
    tags: ['celosage', 'celo', 'react'],
  },
  {
    title: 'Implementing Security Measures For dApps on Celo',
    description: 'Providing Celo developers with comprehensive information on Web3 tools and their usage.',
    preview: require('./showcase/intermediate/implementing-securities.png'),
    website: 'blog/tutorials/implementing-security-measures-for-dapps',
    tags: ['intermediate', 'celo', 'celosage', 'solidity', 'javascript'],
  },
  {
    title: 'How to become a Web3 Developer',
    description: 'In this tutorial, we will show you how to become a web3 developer and build decentralized applications on the Celo blockchain.',
    preview: require('./showcase/beginner/How-to-become-a-web3-developer.png'),
    website: 'blog/tutorials/How-to-become-a-Web3-Developer',
    tags: ['beginner','celo', 'celosage'],
  },
  {
    title: 'How Uniswap Works',
    description: 'In this tutorial, we will provide an introduction to the decentralized finance (DeFi) ecosystem on the Celo blockchain.',
    preview: require('./showcase/beginner/how-uniswap-works.png'),
    website: 'blog/tutorials/how-uniswap-works',
    tags: ['celosage', 'celo', 'beginner'],
  },
  {
    title: 'Optimizing Gas Consumption in Celo Smart Contracts A Step-by-Step Guide',
    description: 'In this comprehensive tutorial, you will learn how to optimize your smart contracts on the Celo blockchain to consume less gas.',
    preview: require('./showcase/intermediate/optimizing-gas-consumption-in-celo-smart-contracts-a-step-by-step-guide.png'),
    website: '/blog/tutorials/optimizing-gas-consumption-in-celo-smart-contracts-a-step-by-step-guide',
    tags: ['celosage', 'celo', 'intermediate', 'solidity'],
  },
  {
    title: 'Build a Full Stack Coffee Dapp With Celo Composer and Solidity',
    description: 'This tutorial will take you through a step-by-step guide on how to create a frontend and backend (Smart Contract) dApp explaining how to create a decentralized version of Buy Me A Coffee.',
    preview: require('./showcase/intermediate/Build-a-Full-Stack-Coffee-Dapp-With-Celo-Composer-and-Solidity.png'),
    website: 'blog/tutorials/Build-a-Full-Stack-Coffee-Dapp-With-Celo-Composer-and-Solidity',
    tags: ['celosage','composer','celo','celowallet','contractkit','dapp','valora','typescript', 'smartcontract', 'solidity', 'nextjs', 'intermediate', 'advanced'],
  },
  {
    title: 'How to Build a Full Stack Social Media Dapp on the Celo Blockchain',
    description: 'This tutorial covers how to build a decentralized social media dapp on the celo blockchain',
    preview: require('./showcase/intermediate/how-to-build-a-full-stack-social-media-dapp-on-the-celo-blockchain.png'),
    website: 'blog/tutorials/how-to-build-a-full-stack-social-media-dapp-on-the-celo-blockchain',
    tags: ['celosage', 'solidity', 'celo', 'react'],
  },
  {
    title: 'How to Build a Decentralized Job Board Dapp On The Celo Blockchain Part 1',
    description: 'This tutorial covers how to build a smart contract for a decentralized job board on the celo blockchain',
    preview: require('./showcase/intermediate/how-to-build-a-decentralized-job-board-dapp-on-the-celo-blockchain-part-1.png'),
    website: 'blog/tutorials/how-to-build-a-decentralized-job-board-dapp-on-the-celo-blockchain-part-1',
    tags: ['celosage', 'solidity', 'celo'],
  },
  {
    title: 'How to Build a Decentralized Job Board Dapp On The Celo Blockchain Part 2',
    description: 'This tutorial covers how to build the front end for our decentralized job board smart contract that we deployed in part 1',
    preview: require('./showcase/intermediate/how-to-build-a-decentralized-job-board-dapp-on-the-celo-blockchain-part-2.png'),
    website: 'blog/tutorials/how-to-build-a-decentralized-job-board-dapp-on-the-celo-blockchain-part-2',
    tags: ['celosage', 'solidity', 'react', 'celo'],
  },
   {
    title: 'Go Celo Series - Setting up a Blockcahin Client on Celo (Episode 1)',
    description: 'In this first episode, we will set up the Go Celo client by cloning it, exploring the packages that are present in it, and using the ethclient package to create a client connection.',
    preview: require('./showcase/intermediate/go-celo-series-setting-up-a-blockchain-client-on-celo.png'),
    website: 'blog/tutorials/go-celo-series-setting-up-a-blockchain-client-on-celo',
    tags: ['video', 'celo', 'intermediate','celosage'],
  },
  {
    title: 'Exploring Top Projects On Celo Blockchain, Use Cases, Features And Future Potential',
    description: 'This blog discusses top crypto projects on Celo blockchain as well as future potential',
    preview: require('./showcase/beginner/exploring-top-projects-on-celo-blockchain-use-cases-features-and-future-potential.png'),
    website: 'blog/tutorials/exploring-top-projects-on-celo-blockchain-use-cases-features-and-future-potential',
    tags: ['celosage', 'celo', 'beginner'], 
  },
  {
    title: 'Truffle and Celo | The Ultimate Guide to Deploy Celo dApps with Truffle',
    description: 'How to deploy a smart contract to Celo testnet, mainnet, or a local blockchain using Truffle.',
    preview: require('./showcase/beginner/the-ultimate-guide-to-deploy-dapps-using-truffle.png'),
    website: 'blog/tutorials/truffle-and-celo-the-ultimate-guide-to-deploy-celo-dapps-with-truffle',
    tags: ['beginner','foundation', 'truffle'],
  },
  {
    title: 'Building a Celo Remittance System A Technical Tutorial for Developers',
    description: 'Learn the technical aspects of building a remittance system on the Celo network',
    preview: require('./showcase/intermediate/building-a-celo-remittance-system-a-technical-tutorial-for-developers.png'),
    website: 'blog/tutorials/building-a-celo-remittance-system-a-technical-tutorial-for-developers',
    tags: ['celosage', 'celowallet', 'celo', 'contractkit', 'intermediate', 'metamask'],
  },
  {
    title: 'Building a Decentralized Betting Platform with Solidity On Celo',
    description: 'In this comprehensive tutorial, we will walk you through the process of creating a decentralized betting platform using Solidity',
    preview: require('./showcase/intermediate/building-a-decentralized-betting-platform-with-solidity-on-celo.png'),
    website: 'blog/tutorials/building-a-decentralized-betting-platform-with-solidity-on-celo',
    tags: ['celosage', 'solidity', 'celo', 'intermediate'],
  },
  {
    title: 'Exploring Celo in the Gaming Industry for In-Game Assets and P2P Trading',
    description: 'Learn how Celo is utilized in the Gaming Industry for In-Game Assets and P2P Trading',
    preview: require('./showcase/beginner/exploring-celo-in-the-gaming-industry-for-in-game-assets-and-p2p-trading.png'),
    website: 'blog/tutorials/exploring-celo-in-the-gaming-industry-for-in-game-assets-and-p2p-trading',
    tags: ['celosage', 'celowallet', 'celo', 'cusd', 'ledger'],
  },
  {
    title: 'Creating a Celo-based Non-Fungible Token (NFT) MarketPlace',
    description: 'Learn the technical aspects of creating a Celo-based Non-Fungible Token (NFT) MarketPlace on the Celo network',
    preview: require('./showcase/intermediate/creating-a-celo-based-non-fungible-token-marketplace.png'),
    website: 'blog/tutorials/creating-a-celo-based-non-fungible-token-marketplace',
    tags: ['celosage', 'celowallet', 'celo', 'contractkit', 'intermediate', 'metamask'],
  },
  {
    title: 'Developing a Decentralized Identity Solution on Celo',
    description: 'Learn the technical aspects of developing a Decentralized Identity Solution on Celo Network',
    preview: require('./showcase/intermediate/developing-a-decentralized-identity-solution-on-celo.png'),
    website: 'blog/tutorials/developing-a-decentralized-identity-solution-on-celo',
    tags: ['celosage', 'celowallet', 'celo', 'contractkit', 'intermediate', 'metamask'],
  },
  {

    title: 'Building a Celo-Based Decentralized Medical Record System',
    description: 'Learn how to building a Celo-Based Decentralized Medical Record System',
    preview: require('./showcase/intermediate/building-a-celo-based-decentralized-medical-record-system.png'),
    website: 'blog/tutorials/building-a-celo-based-decentralized-medical-record-system',
    tags: ['celosage', 'celowallet', 'celo', 'contractkit', 'intermediate', 'react', 'metamask'],
  },
  {
    title: 'Building a Celo Oracle for Off-Chain Data: A Step-by-Step Guide',
    description: 'Learn how to build a  Celo Oracle for Off-Chain Data using a step-by-step guide',
    preview: require('./showcase/intermediate/building-a-celo-oracle-for-off-chain-data-a-step-by-step-guide.png'),
    website: 'blog/tutorials/building-a-celo-oracle-for-off-chain-data-a-step-by-step-guide',
    tags: ['celosage', 'celowallet', 'celo', 'contractkit', 'intermediate', 'metamask'],
  },
   {
    title: 'Implementing Celo-based Decentralized Storage',
    description: 'Learn how to Implement Celo-based Decentralized Storage',
    preview: require('./showcase/intermediate/implementing-celo-based-decentralized-storage.png'),
    website: 'blog/tutorials/implementing-celo-based-decentralized-storage',
    tags: ['celosage', 'celowallet', 'celo', 'contractkit', 'intermediate', 'metamask'],
  },
  {
    title: '6 Steps to Quickly Build Smart Contracts on Celo with Remix',
    description: 'How to create, deploy and interact with smart contracts on Celo testnet or mainnet using Remix.',
    preview: require('./showcase/beginner/6-steps-to-quickly-build-smart-contracts-on-celo-with-remix.png'),
    website: 'blog/tutorials/6-steps-to-quickly-build-smart-contracts-on-celo-with-remix',
    tags: ['beginner','foundation', 'remix'],
  },
  {
    title: '3 Simple Steps to Connect your MetaMask Wallet To Celo',
    description: 'A step-by-step tutorial to add the Celo network to your MetaMask wallet.',
    preview: require('./showcase/beginner/3-simple-steps-to-connect-your-metamask-wallet-to-celo.png'),
    website: 'blog/tutorials/3-simple-steps-to-connect-your-metamask-wallet-to-celo',
    tags: ['beginner','foundation', 'metamask'],
  },
  {
    title: 'Celo CLI - A Practical Guide to Energize your Celo Toolkit',
    description: 'Explore the Celo blockchain using a command-line interface.',
    preview: require('./showcase/beginner/celo-cli-a-practical-guide-to-energize-your-celo-toolkit.png'),
    website: 'blog/tutorials/celo-cli-a-practical-guide-to-energize-your-celo-toolkit',
    tags: ['beginner','foundation', 'cli'],
  },
  {

    title: 'Pros and Cons of using Celo to create Decentralized Applications',
    description: 'Pros and Cons of using Celo to create Decentralized Applications',
    preview: require('./showcase/beginner/pros.png'),
    website: 'blog/tutorials/pros-and-cons-of-using-celo-to-create-decentralized-applications',
    tags: ['celosage', 'beginner', 'foundation'],
  },
  {
    title: 'Celo Composer - Easily Build Full-Stack Mobile dApps on Celo',
    description: 'Quickly develop full-stack progressive web applications on Celo with the Celo Composer.',
    preview: require('./showcase/beginner/celo-composer-easily-build-full-stack-mobile-dapps-on-celo.png'),
    website: 'blog/tutorials/easily-build-full-stack-mobile-dapps-on-celo',
    tags: ['beginner','foundation', 'composer'],
  },
  {
    title: 'A beginners Guide to Layer 1 blockchains, Social Impact, ReFi, Defi and More',
    description: 'Learn about Layer 1 blockchains, DeFi, ReFi and more on Celo and its ecosystem.',
    preview: require('./showcase/beginner/a-beginners-guide-to-layer-1-blockchains-socialimpact-refi-defi.png'),
    website: 'blog/tutorials/a-beginners-guide-to-layer-1-blockchains-socialimpact-refi-defi-and-more',
    tags: ['celosage', 'celo', 'beginner'],
  },
  {
    title: 'Unlocking the Power of Blockchain, NFTs, and Cryptography',
    description: 'Learn the potentials of web-3 decentralised finance',
    preview: require('./showcase/beginner/unlocking-the-power-of-blockchain-nft-and-cryptography.png'),
    website: '/blog/tutorials/unlocking-the-power-of-blockchain-nfts-and-cryptography',
    tags: ['celosage', 'celo', 'beginner'],
  },
  {
    title: '17 Smart Contracts Powering the Celo Protocol',
    description: 'Making sense of the logic driving the Celo platform.',
    preview: require('./showcase/intermediate/17-smart-contracts-powering-the-celo-protocol.png'),
    website: '/blog/tutorials/17-smart-contracts-powering-the-celo-protocol',
    tags: ['intermediate','foundation', 'metamask'],
  },
  {
    title: 'Introduction to Celo Composer',
    description: 'Quickly develop full-stack progressive web applications on the Celo blockchain.',
    preview: require('./showcase/beginner/introduction-to-celo-composer.png'),
    website: '/blog/2022/02/21/introduction-to-celo-progressive-dappstarter',
    tags: ['beginner','foundation', 'react', 'materialui', 'dappstarter', 'progressive'],
  },
  {
    title: 'Deploy and Interact with Smart Contracts on the Celo Blockchain',
    description: 'Learn to deploy and interact with self-executing tamper-proof agreements developing smart contracts with Solidity on Celo Blockchain',
    preview: require('./showcase/intermediate/Deploy-and-Interact-with-Smart-Contracts-on-the-Celo-Blockchain.png'),
    website: '/blog/tutorials/deploy-and-interact-with-smart-contracts-on-the-celo-blockchain',
    tags: ['celosage', 'celo', 'intermediate'],
  },
  {
    title: 'Celo Spotlight - Building a Financial System that Creates the Conditions for Prosperity — for Everyone.',
    description: 'Everything you need to get started with Celo.',
    preview: require('./showcase/beginner/celo-spotlight-everything-you-need-to-get-started-with-celo.png'),
    website: 'blog/tutorials/celo-spotlight',
    tags: ['beginner','foundation', 'celo'],
  }, 
  {
    title: 'Celo Valora + WalletConnect v1',
    description: 'How to use WalletConnect version 1 in a DApp to connect to Valora.',
    preview: require('./showcase/intermediate/celo-valora-and-walletconnect-v1.png'),
    website: '/blog/tutorials/celo-valora-and-walletconnect-v1',
    tags: ['intermediate','foundation', 'react', 'valora', 'walletconnect'],
  },
  {
    title: 'Create an Escrow NFT Platform on Celo with Python',
    description: 'Learn how to create an escrow NFT platform on Celo with Eth-Brownie Python',
    preview: require('./showcase/intermediate/create-an-escrow-nft-platform-on-celo-with-python.png'),
    website: '/blog/tutorials/create-an-escrow-nft-platform-on-celo-with-python',
    tags: ['celosage', 'intermediate','nft'],
  },
  {
    title: 'Decentralized Land Auction Smart Contract',
    description: 'The project aims to provide a decentralized platform for buying and selling land by allowing individuals to bid on available land parcels and purchase using cUSD',
    preview: require('./showcase/intermediate/Decentralize-land-auction-smart-contract.png'),
    website: 'blog/tutorials/Decentralized-land-auction-smart-contract',
    tags: ['celo', 'solidity', 'celosage', 'intermediate'],
  },
  {
    title: 'Design Patterns in Solidity on Celo. Factory, Singleton and Proxy Patterns',
    description: 'In this tutorial, we will dive deep into three widely-used design patterns in Solidity: Factory, Singleton, and Proxy patterns',
    preview: require('./showcase/intermediate/design-patterns-in-solidity-on-celo.-factory,-singleton-and-proxy-patterns.png'),
    website: 'blog/tutorials/design-patterns-in-solidity-on-celo.-factory,-singleton-and-proxy-patterns',
    tags: ['celo', 'solidity', 'celosage', 'intermediate'],
  },
  {
    title: 'Use onchain randomness',
    description: 'Onchain randomness is used for selecting validators to perform phone number verification. Read more about how onchain randomness is produced at the provided page.',
    preview: require('./showcase/intermediate/use-on-chain-randomness.png'),
    website: '/blog/2022/01/07/on-chain-randomness',
    tags: ['intermediate','foundation', 'solidity', 'randomness', 'oracle'],
  },
  {
    title: 'Understanding the Fundamentals of Auction Programming in Solidity',
    description: 'Gain a comprehensive understanding of the fundamental concepts and programming techniques for building decentralized auction applications using Solidity.',
    preview: require('./showcase/intermediate/Auction.png'),
    website: 'blog/tutorials/Understanding-the-Fundamentals-of-Auction-Programming-in-Solidity',
    tags: ['celo', 'intermediate', 'celosage'],
  },
  {
    title: 'Exploring the Decentralized Identity Features of Celo',
    description: 'Discover the powerful decentralized identity capabilities of Celo, a blockchain platform that enables secure, fast, and affordable transactions.',
    preview: require('./showcase/advanced/did.png'),
    website: 'blog/tutorials/exploring-the-decentralized-identity-features-of-celo',
    tags: ['celo', 'advanced', 'celosage'],
  },
  { 
    title: 'Understanding the Role of Proposals and Referendums in Celo Governance',
    description: 'A Comprehensive Breakdown of the Role of Proposals and Referendums in Celo Governance',
    preview: require('./showcase/intermediate/celo-governance.png'),
    website: 'blog/tutorials/Understanding-the-Role-of-Proposals-and-Referendums-in-Celo-Governance',
    tags: ['intermediate','celo', 'celosage'],
  },
  { 
    title: 'Create a React Based DApp on Celo',
    description: 'The beginner of developing a decentralised application (DApp) on Celo.',
    preview: require('./showcase/intermediate/create-a-react-based-dapp-on-celo.png'),
    website: '/blog/developer-guide/start/web-dapp',
    tags: ['intermediate','foundation', 'dapp', 'react', 'nextjs', 'usecontractkit', 'sdk'],
  },
  {
    title: 'Deploy an NFT to Celo',
    description: 'How to deploy ERC721 tokens (NFTs) on the Celo network using autogenerated code.',
    preview: require('./showcase/beginner/deploy-an-nft-to-celo.png'),
    website: '/blog/2022/01/05/no-code-erc721',
    tags: ['beginner','foundation', 'tokens', 'erc721', 'mint', 'nft', 'ipfs', 'pinata', 'solidity', 'remix'],
  },
  {
    title: 'Creating an ERC4626 token Contract on Celo',
    description: 'This tutorial introduces its readers to the concept of the token vault standard and how to write the contract',
    preview: require('./showcase/intermediate/creating-an-erc4626-token-contract-on-celo.png'),
    website: '/blog/tutorials/creating-an-erc4626-token-contract-on-celo',
    tags: ['intermediate', 'tokens', 'mint', 'nft', 'solidity', 'smartcontract', 'celosage', 'celo'],
  },
  {
    title: 'Deploy & Mint a Token',
    description: 'How to deploy a token contract that use the ERC20 token standard to Celo without writing code.',
    preview: require('./showcase/beginner/deploy-and-mint-a-token-on-celo.png'),
    website: '/blog/2022/01/04/no-code-erc20',
    tags: ['beginner','foundation', 'tokens', 'ERC20', 'mint', 'solidity', 'openzeppelin', 'remix'],
  },
  {
    title: 'Deploy and Interact with Contracts (Remotely)',
    description: 'How to deploy and interact your own smart contracts using a remote node.',
    preview: require('./showcase/intermediate/deploy-and-interact-with-contracts-remotely.png'),
    website: '/blog/developer-guide/start/hello-contract-remote-node',
    tags: ['intermediate','foundation', 'smartcontract', 'remote', 'deploy'],
  },
  {
    title: 'Deploy a Contract on Celo (local node)',
    description: 'How to deploy your own smart contracts onto a Celo local node.',
    preview: require('./showcase/intermediate/deploy-a-contract-on-celo-local-node.png'),
    website: '/blog/developer-guide/start/hellocontracts',
    tags: ['intermediate','foundation', 'smartcontract'],
  },
  {
    title: 'Designing a User-Friendly Celo DApp- A Beginners Guide to UI/UX',
    description: 'In this tutorial, we will teach interested persons how to create wireframes for their own web projects',
    preview: require('./showcase/beginner/designing-a-user-friendly-celo-dapp-a-beginners-guide-to-uiux-new.png'),
    website: '/blog/tutorials/designing-a-user-friendly-celo-dapp-a-beginners-guide-to-uiux',
    tags: ['celosage','beginner', 'celo', 'dapp', 'valora'],
  },
  {
    title: 'Sending CELO & Stable Assets',
    description: 'How to connect to the Celo test network and tranfer tokens using ContractKit.',
    preview: require('./showcase/intermediate/sending-celo-and-stable-assets.png'),
    website: '/blog/developer-guide/start/hellocelo',
    tags: ['intermediate','foundation', 'tokens', 'celowallet', 'contractkit', 'sdk', 'ledger'],
  },
  {
    title: 'Using Keystores Library for Local Key Management',
    description: 'Introduction to the keystores library and how to use it for local key management.',
    preview: require('./showcase/advanced/using-keystores-library-for-local-key-management.png'),
    website: '/blog/developer-guide/start/using-js-keystores',
    tags: ['advanced','foundation', 'keystores'],
  },
  {
    title: 'Add an ERC20 Token to Your Celo Wallet',
    description: 'Open up Cello Wallet and make sure you can see “Account Balance Details” then select “Add a new currency/token.',
    preview: require('./showcase/beginner/add-an-erc20-token-to-your-celo-wallet.png'),
    website: '/blog/add-token-celo-wallet',
    tags: ['beginner','foundation', 'tokens', 'celowallet'],
  },
  {
    title: 'Run a Celo full node in a Virtual Machine',
    description: 'Learn how to setup & run a Celo full node in a Virtual Machine.',
    preview: require('./showcase/intermediate/run-a-celo-full-node-in-a-virtual-machine.png'),
    website: 'https://learn.figment.io/tutorials/how-to-run-a-celo-full-node-in-a-virtual-machine',
    tags: ['intermediate', 'figment', 'nodejs'],
  },
  {
    title: 'Building a blog subscription dapp on Celo part 1',
    description: 'Learn how to build a Celo-based blog subscription dapp in this comprehensive guide.',
    preview: require('./showcase/advanced/building-a-blog-subscription-dapp-on-celo-part-1.png'),
    website: '/blog/tutorials/building-a-blog-subscription-dapp-on-celo-part-1',
    tags: ['celo','advanced', 'solidity', 'celosage'],
  },
  {
    title: 'Demos with ObservableHQ',
    description: 'Observable HQ is a Javascript notebook tool that makes it easy to share executable Javascript code right in the browser.',
    preview: require('./showcase/intermediate/demos-with-observable-hq.png'),
    website: '/blog/observable-intro',
    tags: ['intermediate','foundation', 'observable'],
  },
  {
    title: 'Building a blog subscription dapp on Celo part 2',
    description: 'Learn how to build a Celo-based blog subscription dapp in this comprehensive guide.',
    preview: require('./showcase/advanced/building-a-blog-subscription-dapp-on-celo-part-2.png'),
    website: '/blog/tutorials/building-a-blog-subscription-dapp-on-celo-part-2',
    tags: ['celo','advanced', 'solidity', 'celosage'],
  },
  {
    title: 'Using the Graph with Celo',
    description: 'The Graph protocol makes it easy to get historical blockchain data.',
    preview: require('./showcase/intermediate/using-the-graph-with-celo.png'),
    website: '/blog/using-the-graph',
    tags: ['intermediate','foundation', 'graph', 'dapp'],
  },
  {
    title: 'Understanding Reentrancy Attacks And How To Protect Your Smart Contract Using OpenZeppelin',
    description: 'In this tutorial we will explain how re-entrancy attacks work. And how to protect your smartcontract from such attacks',
    preview: require('./showcase/intermediate/understanding-reentrancy-attacks-and-how-to-protect-your-smart-contract-using-open-zeppelin.png'),
    website: '/blog/tutorials/understanding-reentrancy-attacks-and-how-to-protect-your-smart-contract-using-open-zeppelin',
    tags: ['celosage','solidity', 'intermediate'],
  },
  {
    title: 'Code Playground -- Metamask',
    description: 'Connect to Metamask, switch networks, add tokens to the Metamask asset list and send them to other accounts.',
    preview: require('./showcase/beginner/code-playground-metamask-and-celo.png'),
    website: '/blog/code-metamask',
    tags: ['beginner','foundation', 'codeplayground'],
  },
  {
    title: 'Introduction to the Code Playground',
    description: 'This post provides an introduction to the live code editor that is included as a feature in this blog.',
    preview: require('./showcase/beginner/introduction-to-the-celo-code-playground.png'),
    website: '/blog/code-playground',
    tags: ['beginner','foundation', 'codeplayground'],
  },
  {
    title: 'Submit a Tutorial',
    description: "Celo is an open source project and without community contributions from people like you Celo wouldn't exist. We welcome contributions to our codebase, documentation, translations and blog.",
    preview: require('./showcase/beginner/how-to-submit-a-tutorial-to-celo-docs.png'),
    website: 'https://docs.celo.org/blog/blog-contributions',
    tags: ['beginner','foundation', 'contribute'],
  },
  {
    title: 'Celo Development 201 - Build an NFT Minter with Hardhat and React',
    description: 'Throughout this intermediate course you are going to learn about NFTs, contract development with Hardhat and how to build a React frontend with use-contractkit.',
    preview: require('./showcase/intermediate/celo-development-201-build-an-nft-minter-with-hardhat-and-react.png'),
    website: 'https://dacade.org/communities/celo/courses/celo-201',
    tags: ['intermediate','dacade', 'smartcontract', 'html', 'javascript', 'nft', 'hardhat'],
  },
  {
    title: 'Celo Development 101',
    description: 'Learn smart contract development and build a Dapp on Celo.',
    preview: require('./showcase/beginner/celo-development-101.png'),
    website: 'https://dacade.org/communities/celo/courses/celo-development-101',
    tags: ['beginner','dacade', 'smartcontract', 'html', 'javascript'],
  },
  {
    title: 'Celo Blockchain 101',
    description: 'In this course, you will learn the most important blockchain concepts that you will need to navigate the Celo ecosystem.',
    preview: require('./showcase/beginner/celo-blockchain-101.png'),
    website: 'https://dacade.org/communities/celo/courses/celo-bc-101',
    tags: ['beginner','dacade', 'smartcontract', 'html', 'javascript'],
  },
  {
    title: 'How to mint your own fungible token on Celo',
    description: 'How to create fungible tokens on Celo using the Remix IDE.',
    preview: require('./showcase/beginner/deploy-and-mint-a-token-on-celo.png'),
    website: 'https://learn.figment.io/tutorials/celo-erc20-token-on-remix',
    tags: ['beginner','figment', 'solidity', 'metamask', 'remix'],
  },
  {
    title: 'Deploying smart contracts on Celo with Truffle',
    description: 'We will learn how to use Truffle and ContractKit to deploy smart contracts to Celo.',
    preview: require('./showcase/beginner/deploying-smart-contracts-on-celo-with-truffle.png'),
    website: 'https://learn.figment.io/tutorials/deploying-smart-contracts-on-celo-with-truffle',
    tags: ['beginner','figment', 'solidity', 'metamask', 'remix'],
  },
  {
    title: 'How to successfully connect to a Celo Wallet with a React Native DApp',
    description: 'Learn how to successfully set up a Celo Wallet with a React Native DApp using Redux.',
    preview: require('./showcase/intermediate/how-to-successfully-connect-to-a-celo-wallet-with-a-react-native-dapp.png'),
    website: 'https://learn.figment.io/tutorials/how-to-successfully-connect-to-a-celo-wallet-with-a-react-native-dapp',
    tags: ['intermediate', 'figment', 'reactnative', 'nodejs'],
  },
  {
    title: 'How to customize an Ethereum smart contract for the Celo network',
    description: 'Learn how to convert & customize an existing Ethereum Smart Contract for Celo network',
    preview: require('./showcase/intermediate/how-to-customize-an-ethereum-smart-contract-for-the-celo-network.png'),
    website: 'https://learn.figment.io/tutorials/celo-contract-from-ethereum',
    tags: ['intermediate', 'figment', 'nodejs', 'smartcontract', 'truffle'],
  },
  {
    title: 'How to use Moola’s money market',
    description: 'This tutorial is a part of DeFi series where people can learn how to participate in DeFi on the Celo Blockchain.',
    preview: require('./showcase/beginner/how-to-use-moolas-money-market.png'),
    website: 'https://learn.figment.io/tutorials/moola-market',
    tags: ['beginner', 'figment'],
  },
  {
    title: 'Hackathons 101 - Everything you need to know about Hackathons',
    description: 'In this article we will discuss the benefits of attending events, including networking, learning new skills, and gaining exposure to new ideas.',
    preview: require('./showcase/beginner/hackathons-101-everything-you-need-to-know-about-hackathons.png'),
    website: '/blog/tutorials/hackathons-101-everything-you-need-to-know-about-hackathons',
    tags: ['celosage', 'beginner' ],
  },
  {
    title: 'Testing Celo Smart Contracts with Truffle',
    description: 'We will learn how to use Truffle in order to test smart contracts on Celo.',
    preview: require('./showcase/intermediate/testing-celo-smart-contracts-with-truffle.png'),
    website: 'https://learn.figment.io/tutorials/celo-testing-truffle',
    tags: ['intermediate', 'figment', 'nodejs', 'smartcontract', 'truffle', 'javascript'],
  },
  {
    title: 'Distributed File Manager (DFM) using Celo, IPFS and ReactJS',
    description: 'Learn how to make a Distributed File Manager using the IPFS protocol for storing files on the Celo network',
    preview: require('./showcase/advanced/distributed-file-manager-dfm-using-celo-ipfs-and-reactjs.png'),
    website: 'https://learn.figment.io/tutorials/distributed-file-manager-using-ipfs-celo-reactjs',
    tags: ['advanced','figment'],
  },
  {
    title: 'Introduction to dApp kit',
    description: 'In this tutorial we are going to make counter dapp with expo (react native).',
    preview: require('./showcase/intermediate/introduction-to-dapp-kit.png'),
    website: 'https://learn.figment.io/tutorials/introduction-to-dappkit',
    tags: ['intermediate', 'figment', 'reactnative', 'nodejs', 'truffle'],
  },
  {
    title: 'Build a Decentralized Autonomous Organization (DAO) on Celo',
    description: 'Build a functioning DAO by writing the Solidity smart contract and building a React Native dApp',
    preview: require('./showcase/advanced/build-a-decentralized-autonomous-organization-dao-on-celo.png'),
    website: 'https://learn.figment.io/tutorials/build-a-dao-on-celo',
    tags: ['advanced', 'figment'],
  },
  {
    title: 'How to re-deploy your Ethereum DApp on Celo',
    description: 'Learn how to re-deploy Ethereum Dapps on the Celo network.',
    preview: require('./showcase/beginner/how-to-redeploy-your-ethereum-dapp-on-celo.png'),
    website: 'https://learn.figment.io/tutorials/redeploy-ethereum-dapps-on-celo',
    tags: ['beginner', 'figment', 'truffle', 'javascript', 'cli'],
  },
   {
    title: 'How to Create a Blockchain Simulation using Python and FastAPI',
    description: 'This is an algorithm based tutorial that will teach you how to build a celo blockchain stimulation.',
    preview: require('./showcase/intermediate/blockchain-simulation-with-python.png'),
    website: '/blog/tutorials/how-to-create-a-blockchain-simulation-using-python-and-fastapi',
    tags: ['intermediate', 'celosage', 'celo'],
  },
  {
    title: 'Privacy Enhancing Technologies: The Future of Online Transactions with zk-rollups and zk-SNARKs',
    description: "In this article, we'll be talking about the future of online transactions with zk-rollups and zk-SNARKs.",
    preview: require('./showcase/intermediate/privacy-enhancing-technologies-the-future-of-online-transactions-with-zk-rollups-and-zk-snarks.png'),
    website: 'blog/tutorials/privacy-enhancing-technologies-the-future-of-online-transactions-with-zk-rollups-and-zk-snarks',
    tags: ['celo', 'intermediate', 'solidity', 'celosage'],
  },
  {
    title: 'How to Build and Deploy Flashloan Contracts on Celo with Aave',
    description: 'In this tutorial, you will learn how flash loans work, and how Aave, one of the leading flash loan protocols, allows users to take out these loans.',
    preview: require('./showcase/advanced/aave-on-celo.png'),
    website: '/blog/tutorials/how-to-build-and-deploy-flashloan-contracts-on-celo-with-aave',
    tags: ['celosage', 'advanced', 'solidity', 'celo', 'smartcontract'],
  },
  {
    title: 'Create Deploy and Mint your ERC223 contract on Celo with Hardhat',
    description: 'This tutorial is an expository piece on the ERC223 token standard, also explaining how to create and deploy a sample ERC223 contract',
    preview: require('./showcase/intermediate/ERC223-token-contract.png'),
    website: 'https://learn.figment.io/tutorials/create-deploy-and-mint-your-eRC223-contract-on-celo-with-hardhat',
    tags: ['intermediate', 'celo', 'celosage', 'javascript', 'hardhat', 'smartcontract', ],
  },
  {
    title: 'Getting started with Celo Python SDK',
    description: 'This article will provide a step-by-step guide on how to get started with Celo Python SDK.',
    preview: require('./showcase/intermediate/celo-python-sdk.png'),
    website: '/blog/tutorials/getting-started-with-celo-python-SDK',
    tags: ['intermediate', 'celo', 'celosage', 'solidity'],
  },
  {
    title: 'Create Vault Smart Contract',
    description: 'Learn how to create, deploy, and interact with Vault Smart Contract on the Celo Ecosystem',
    preview: require('./showcase/advanced/create-a-vault-smart-contract.png'),
    website: 'https://learn.figment.io/tutorials/create-vault-smart-contract',
    tags: ['advanced', 'figment', 'react', 'nodejs', 'smartcontract', 'truffle'],
  },
  {
    title: 'Introduction to Token Economics on Celo',
    description: 'A brief overview of the economic principles governing the Celo network and its native token',
    preview: require('./showcase/intermediate/token.png'),
    website: 'blog/tutorials/introduction-to-token-economics-on-celo',
    tags: ['celo', 'intermediate', 'celosage'],
  },
  {
    title: 'Unlocking Cross-Chain Liquidity',
    description: 'A Comprehensive Review of Celo Platform and its Role in Enabling Interoperability Between Blockchains',
    preview: require('./showcase/advanced/liquidity.png'),
    website: 'blog/tutorials/unlocking-cross-chain-liquidity',
    tags: ['celo', 'advanced', 'celosage'],
  },
  {
    title: 'Send CELO & cUSD',
    description: 'Learn how to connect to the Celo test network and transfer tokens using ContractKit',
    preview: require('./showcase/intermediate/send-celo-and-cusd.png'),
    website: 'https://learn.figment.io/tutorials/send-celo-and-cusd',
    tags: ['intermediate', 'cusd', 'celo', 'figment'],
  },
  {
    title: 'Writing a Smart Contract to Handle Decentralized Waste Management on Celo',
    description: 'In this tutorial, we will build a write a smart contract for a waste management system on the celo blockchain',
    preview: require('./showcase/intermediate/writing-a-smart-contract-to-handle-decentralized-waste-management-on-celo.png'),
    website: 'blog/tutorials/writing-a-smart-contract-to-handle-decentralized-waste-management-on-celo',
    tags: ['celo', 'intermediate', 'solidity', 'celosage'],
  },
  {
    title: 'Create subgraphs for Celo smart contracts',
    description: 'Learn how to integrate The Graph with CELO',
    preview: require('./showcase/intermediate/create-subgraphs-for-celo-smart-contracts.png'),
    website: 'https://learn.figment.io/tutorials/celo-subgraphs',
    tags: ['intermediate', 'subgraphs', 'figment'],
  },
  {
    title: 'Create a Secure Multi-Factor Authentication on the Celo Blockchain',
    description: 'Learn how to create a secure multi factor authentication on the Celo blockchain',
    preview: require('./showcase/advanced/create-a-secure-multi-factor-authentication-on-the-celo-blockchain.png'),
    website: '/blog/tutorials/create-a-secure-multi-factor-muthentication-on-the-celo-blockchain',
    tags: ['celosage', 'solidity', 'javascript', 'celo', 'advanced'],
  },
  {
    title: 'Hello Mobile DApp',
    description: 'Learn how to create a simple mobile DApp using dAppKit and the React Native Expo framework',
    preview: require('./showcase/beginner/hello-celo-mobile-dapp.png'),
    website: 'https://learn.figment.io/tutorials/hello-mobile-dapp',
    tags: ['beginner', 'mobile', 'figment'],
  },
  {
    title: 'Building A Dutch Auction Dapp on Celo',
    description: 'A comprehensive guide for understanding and building Dutch auction dapp on Celo.',
    preview: require('./showcase/intermediate/build-a-dutch-auction-dapp-on-celo.png'),
    website: '/blog/tutorials/building-a-dutch-auction-dapp-on-celo',
    tags: ['intermediate', 'erc721', 'hardhat', 'react', 'solidity', 'celosage'],
  },
  {
    title: 'Smart Contract Development on Celo for Python Developers',
    description: 'Write your first Vyper contract with Brownie and deploy it on Alfajores testnet.',
    preview: require('./showcase/beginner/smart-contract-development-on-celo-for-python-developers.png'),
    website: '/blog/tutorials/smart-contract-development-on-celo-for-python-developers',
    tags: ['celosage', 'beginner'],
  },
  // Videos

    {
    title: 'How to build an NFT marketplace with Nextjs ipfs etherjs and Redux',
    description: 'Learn how to build an nft marketplace with nextjs as the framework and Ipfs for storage and Redux for state management and Hardhat for compiling.',
    preview: require('./showcase/intermediate/how-to-build-nftmarkertplace.png'),
    website:'/blog/tutorials/how-to-build-an-nft-marketplace-with-nextjsipfsetherjs-and-redux',
    tags: ["celosage","metamask","dacade", "mint","nextjs","nft","intermediate","ipfs"],
  },
  {
    title: 'Deploy Celo Smart contracts with Remix IDE',
    description: 'Learn how to use Remix IDE for deploying Celo smart contracts',
    preview: require('./showcase/beginner/deploy-celo-smart-contracts-with-remix-ide.png'),
    website: 'https://learn.figment.io/tutorials/celo-for-remix',
    tags: ['beginner', 'remix', 'foundation'],
  },
  {
    title: 'How to create a ERC1155 NFT in Celo Network with Hardhat',
    description: 'Learn how to write a smart contract using the Solidity language and a contract from the Openzeppelin library for ERC1155 tokens.',
    preview: require('./showcase/intermediate/celo-crowd-funding-project-tutorial.png'),
    website: 'https://learn.figment.io/tutorials/celo-hardhat-deploy-and-nft-app',
    tags: ['intermediate', 'erc1155', 'nft', 'hardhat', 'figment'],
  },
  {
    title: 'Celo Crowd Funding Project Tutorial',
    description: 'Learn how to create a Smart Contract which facilitates crowdfunding.',
    preview: require('./showcase/advanced/celo-crowdfunding-project-tutorial.png'),
    website: 'https://learn.figment.io/tutorials/celo-crowd-funding-project',
    tags: ['advanced', 'figment', 'smartcontract', 'truffle', 'solidity'],
  },
  {
    title: 'How to create a Loyalty Program using Meta-transactions',
    description: 'What if users could get rewarded for transactions and not pay gas? This tutorial will show you how!',
    preview: require('./showcase/advanced/how-to-create-a-loyalty-program-using-meta-transactions.png'),
    website: '/blog/2022/07/27/how-to-create-a-loyalty-program-using-meta-transactions',
    tags: ['advanced', 'foundation'],
  },
  {
    title: 'Composer series: Building a decentralized news feed with Celo Composer',
    description: 'Build a decentralized news feed using React, Tailwind, IPFS, and Celo Composer.',
    preview: require('./showcase/advanced/celo-composer-building-a-decentralized-news-feed-with-celo-composer.png'),
    website: 'blog/tutorials/building-a-decentralized-newsfeed-with-celo-composer',
    tags: ['advanced', 'composer', 'foundation'],
  },
  {
    title: 'How to create an upgradeable smart contract in Celo',
    description: 'Everything you need to know about upgradable smart contracts.',
    preview: require('./showcase/advanced/how-to-create-an-upgradable-smart-contract-on-celo.png'),
    website: 'blog/tutorials/how-to-create-an-upgradeable-smart-contract-in-celo',
    tags: ['advanced', 'flutter', 'composer', 'foundation'],
  },
  {
    title: 'Bridging tokens to and from Celo via Wormhole',
    description: 'Wormhole has enabled the Celo chain.',
    preview: require('./showcase/advanced/bridging-tokens-to-and-from-celo-via-wormhole.png'),
    website: 'blog/tutorials/bridging-token-to-and-from-celo-via-wormhole',
    tags: ['advanced', 'foundation'],
  },
  {
    title: '9 Sustainable DeFi Projects Built on Celo',
    description: 'Creating the world’s first carbon-neutral blockchain was just the beginning.',
    preview: require('./showcase/beginner/9-sustainable-defi-projects-built-on-celo.png'),
    website: 'blog/tutorials/9-sustainable-defi-projects-built-on-celo',
    tags: ['beginner', 'foundation'],
  },
  {
    title: 'Composer Series - Building a Staking Defi App with Celo Composer',
    description: 'Building a Defi application to create, stake and receive rewards on your token using Celo composer.',
    preview: require('./showcase/intermediate/celo-composer-building-a-staking-defi-dapp.png'),
    website: 'blog/2022/10/27/building-a-defi-staking-dapp',
    tags: ['intermediate', 'foundation', 'composer', 'react', ],
  },
  {
    title: 'Build an On-Chain Puzzle Game on Celo',
    description: 'Learn how to build a On-Chain Puzzle Game on Celo using Solidity and Hardhat.',
    preview: require('./showcase/intermediate/on-chain-puzzle-game.png'),
    website: '/blog/tutorials/build-an-on-chain-puzzle-game-on-celo',
    tags: ['celosage', 'intermediate', 'solidity', 'hardhat'],
  },
  {
    title: 'A Practical Comparison Between ERC-1155 and ERC-721',
    description: 'An informative and practical comparison of two popular NFT standards, ERC-1155 and ERC-721, that delves into their technical details.',
    preview: require('./showcase/beginner/a-practical-comparison-between-erc-1155-and-erc-721.png'),
    website: '/blog/tutorials/a-practical-comparison-between-erc-1155-and-erc-721',
    tags: ['celosage', 'intermediate', 'erc1155', 'erc721', 'nft'],
  },
  {
    title: 'Understanding Role Based Access Control in Smart Contracts',
    description: 'In this tutorial, we will explore how to create a role-based control using openzeppelin library.',
    preview: require('./showcase/intermediate/understanding-role-based-access-control-in-smart-contracts.png'),
    website: '/blog/tutorials/understanding-role-based-access-control-in-smart-contracts',
    tags: ["celosage", "intermediate", "solidity", "hardhat", "openzeppelin", "react"],
  },

  // Videos

  {
    title: 'Panel Talk: Empowering Social Impact Through Web3',
    description: 'Join Nestor as he discusses social impact through Web3.',
    preview: require('./showcase/beginner/panel-talk-empowering-social-impact-through-web3.png'),
    website: 'https://www.youtube.com/watch?v=ZQUYGEI3yHQ',
    tags: ['beginner', 'video'],
  },
  {
    title: 'Tech Talk: Utilizing the ReFi Stack Thesis to Propel Web3 Project Idea Generation',
    description: 'Join Nirvaan from Climate Collective, and Nestor from Celo Foundation DevRel as they discuss the ReFi stack thesis to propel web3 project ideas.',
    preview: require('./showcase/beginner/tech-talk-utilizing-the-refi-stack-thesis-to-propel-web3-project-ideas.png'),
    website: 'https://www.youtube.com/watch?v=J7jyoDUIx3E&t=529s',
    tags: ['beginner', 'video'],
  },
  {
    title: 'Workshop: Introduction to Solidity and Remix',
    description: 'Join Harpal Jadeja (Twitter: @HarpalJadeja11) for a discussion with Viraz Malhotra from GoodGhosting (Twitter: @Viraz04). You will learn how to get started with Solidity and Remix online IDE.',
    preview: require('./showcase/beginner/workshop-introduction-to-solidity-and-remix.png'),
    website: 'https://www.youtube.com/watch?v=jr_P-26SdbE&t=656s',
    tags: ['beginner', 'video'],
  },
  {
    title: 'Workshop: Build a frontend for your smart contracts using react-celo',
    description: 'Join Nestor Bonilla (Twitter: @0xNestor) and Aaron Deruvo for this workshop! You will learn to utilize react-celo as a resource for frontend development by dissecting react-celo into a development approach for various javascript frameworks.',
    preview: require('./showcase/intermediate/workshop-build-a-front-end-for-your-smart-contracts-using-react-celo.png'),
    website: 'https://www.youtube.com/watch?v=3BT0sjXW1Uw',
    tags: ['intermediate', 'video'],
  },
  {
    title: 'Workshop: Introduction to Hardhat',
    description: 'Join Harpal Jadeja (Twitter: @HarpalJadeja11) and learn how to utilize Hardhat to deploy and test your smart contracts.',
    preview: require('./showcase/beginner/workshop-introduction-to-hardhat.png'),
    website: 'https://www.youtube.com/watch?v=W7nGdHKcIFw&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=6',
    tags: ['beginner', 'video'],
  },
  {
    title: 'Building Your Smart Contract Web Dapp with Celo-Composer',
    description: 'Learn how to initialize a Hardhat and React project using Celo-composer.',
    preview: require('./showcase/intermediate/building-your-smart-contract-web-dapp-with-celo-composer.png'),
    website: 'blog/tutorials//building-your-first-smart-contract-web-dapp-with-celo-composer',
    tags: ['celo', 'intermediate', 'celosage', 'composer', 'nextjs', 'smartcontract', 'react', 'solidity'],
  },
  {
    title: 'Workshop: Build a DeFi staking dApp on Celo using Solidity',
    description: 'Join Ernest Nnmadi (Twitter: @ErnestElijah) for this workshop! You will learn how to build a DeFi stacking dApp on Celo.',
    preview: require('./showcase/advanced/workshop-build-a-defi-staking-dapp-on-celo-using-solidity.png'),
    website: 'https://www.youtube.com/watch?v=ke5OPItFaOQ&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=7',
    tags: ['advanced', 'video'],
  },
  {
    title: 'Tech Talk: Smart Contract Security and Auditing',
    description: 'Join Ryon Shamloo for this Tech Talk! He will discuss best security practices and known vulnerabilities.',
    preview: require('./showcase/advanced/tech-talk-smart-contract-security-and-auditing.png'),
    website: 'https://www.youtube.com/watch?v=CxIzZmG2bBI&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=8',
    tags: ['advanced', 'video'],
  },
  {
    title: 'Workshop: Integrating Programmable Carbon with Toucan',
    description: 'Join Harpal Jadeja (Twitter: @HarpalJadeja11)  and Alex Lazar for this workshop! You will learn about Toucan and how you can integrate their offerings into your hackathon project.',
    preview: require('./showcase/advanced/workshop-integrating-programmable-carbon-with-toucan.png'),
    website: 'https://www.youtube.com/watch?v=Y0-hzz_QbKg&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=9',
    tags: ['advanced', 'video'],
  },
  {
    title: 'Tech talk: stCelo',
    description: 'Join Harpal Jadeja (Twitter: @HarpalJadeja11)  and Mathieu for this workshop! You will learn about stCelo and how you can integrate their offerings into your hackathon project.',
    preview: require('./showcase/intermediate/tech-talk-stcelo.png'),
    website: 'https://www.youtube.com/watch?v=0PL31bwzdKA&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=10',
    tags: ['intermediate', 'video'],
  },
  {
    title: 'Workshop: Token gating content using Unlock Protocol',
    description: 'Join Harpal Jadeja (Twitter: @HarpalJadeja11)  and Angela Steffens for this workshop!',
    preview: require('./showcase/advanced/workshop-token-gating-content-using-unlock-protocol.png'),
    website: 'https://www.youtube.com/watch?v=B2O6FcgvXAI&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=12',
    tags: ['advanced', 'video'],
  },
  {
    title: 'Tech Talk: Smart Contract Security 201',
    description: 'Ryon Shamloo takes you through part two of his best security practices talk!',
    preview: require('./showcase/intermediate/tech-talk-smart-contract-security-201.png'),
    website: 'https://www.youtube.com/watch?v=HIEcAXshU8U&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=13',
    tags: ['intermediate', 'video'],
  },
  {
    title: 'The Future of Regenerative Finance and its potential impact',
    description: 'Learn about how Celo is committed to its mission of building a regenerative economy, potential impact of ReFi, the future of ReFi and more',
    preview: require('./showcase/beginner/the-future-of-regenerative-finance-and-its-potential-impact.png'),
    website: '/blog/tutorials/the-future-of-regenerative-finance-and-its-potential-impact',
    tags: ['beginner', 'celo', 'celosage'],
  },
  {
    title: 'Workshop: Building an exchange on Celo',
    description: 'Use Celo composer and Fiat-connect to build an exchange, Part I',
    preview: require('./showcase/intermediate/workshop-building-an-exchange-on-celo.png'),
    website: 'https://www.youtube.com/watch?v=O6DjaYFGLmE&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=15',
    tags: ['intermediate', 'video'],
  },
    {
    title: 'Building A Decentralized Investment Platform on the Celo blockchain',
    description: 'In this tutorial, we would build a mock investment platform that returns profit on the celo blockchain',
    preview: require('./showcase/intermediate/building-a-decentralized-investment-platform.png'),
    website: 'blog/tutorials/building-a-decentralized-investment-platform',
    tags: ['celosage','celowallet', 'celo', 'solidity', 'html', 'remix', 'smartcontract', 'intermediate'],
  },
  {
    title: 'Workshop: Building an exchange on Celo, Part II',
    description: 'Use Celo composer and Fiat-connect to build an exchange, Part II',
    preview: require('./showcase/advanced/workshop-building-an-exchange-on-celo-part-2.png'),
    website: 'https://www.youtube.com/watch?v=xxLWRUmAKvs&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=16',
    tags: ['advanced', 'video'],
  },
  {
    title: 'Introduction to Valora',
    description: 'Join this workshop for an introduction to Valora',
    preview: require('./showcase/beginner/introduction-to-valora.png'),
    website: 'https://www.youtube.com/watch?v=foamzu62nZk&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=18',
    tags: ['beginner', 'video'],
  },
  {
    title: 'Workshop: Building an NFT collection on Celo using Celo composer',
    description: 'Join Ewerton Lopes Pereira to build an NFT collection on Celo',
    preview: require('./showcase/intermediate/workshop-building-an-nft-collection-on-celo-using-celo-composer.png'),
    website: 'https://www.youtube.com/watch?v=hf5gTAQ8G10&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=19',
    tags: ['intermediate', 'video'],
  },
  {
    title: 'Introduction to Mento',
    description: 'Join Nestor Bonilla for an introduction to the Mento protocol',
    preview: require('./showcase/intermediate/introduction-to-mento.png'),
    website: 'https://www.youtube.com/watch?v=hf5gTAQ8G10&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=19',
    tags: ['intermediate', 'video'],
  },
  {
    title: 'Overview of Developer Tools in the Celo Ecosystem',
    description: 'This article is to help you choose the right tool in the Celo ecosystem',
    preview: require('./showcase/beginner/overview-of-developer-tools-in-the-celo-ecosystem.png'),
    website: 'blog/tutorials/overview-of-developer-tools-in-the-celo-ecosystem',
    tags: ['celosage', 'react', 'composer', 'contractkit', 'cli', 'beginner'],
  },
  {
    title: 'How to Fractionalize an NFT on the Celo Platform',
    description: 'Building a dApp to fractionalize an NFT on top of Celo.',
    preview: require('./showcase/advanced/how-to-fractionalize-an-nft-on-the-celo-platform.png'),
    website: 'blog/tutorials/how-to-fractionalize-nft-on-celo-platform',
    tags: ['advanced', 'nft', 'celo', 'celosage'],
  },
  {
    title: 'Preventing Vulnerabilities in Solidity: Delegate Call',
    description: 'Understanding and preventing solidity vulnerabilities.',
    preview: require('./showcase/intermediate/solidity-vulnerabilities-delegated-call.png'),
    website: 'blog/tutorials/solidity-vulnerabilities-delegated-call',
    tags: ['celosage', 'advanced', 'solidity'],
  },
  {
    title: 'How to Create and Test Contract Calls with Celo and Hardhat',
    description: 'How to create and test contract calls with Celo and Hardhat.',
    preview: require('./showcase/intermediate/how-to-create-and-test-contract-calls-with-celo-and-hardhat.png'),
    website: 'blog/tutorials/how-to-create-and-test-contract-calls-on-hardhat',
    tags: ['celosage', 'intermediate', 'hardhat'],
  },
  {
    title: 'How to Deploy a Smart Contract to the Celo Testnet using Hardhat',
    description: 'This video tutorial will expose developers to deploying a smart contract to the Celo Testnet using hardhat.',
    preview: require('./showcase/beginner/how-to-deploy-a-smart-contract-to-the-celo-testnet-using-hardhat.jpg'),
    website: 'blog/tutorials/how-to-deploy-a-smart-contract-to-the-celo-testnet-using-hardhat',
    tags: ['celosage', 'beginner', 'hardhat'],
  },
  {
    title: 'Redeploying Dapp to Celo.',
    description: 'How to Re Deploy your Ethereum DApp to Celo with Hardhat.',
    preview: require('./showcase/intermediate/how-to-redeploy-your-ethereum-dApp-to-celo-with-hardhat.png'),
    website: 'blog/tutorials/how-to-redeploy-your-ethereum-dApp-to-celo-with-hardhat',
    tags: ['intermediate', 'hardhat', 'celosage', 'smartcontract', 'deploy', 'solidity', 'celo'],
  },
  {
    title: 'How to Create your own DAO on Celo',
    description: 'Build your own DAO with on-chain governance',
    preview: require('./showcase/intermediate/how-to-create-your-own-dao-on-celo.png'),
    website: 'blog/tutorials/how-to-create-a-dao-on-celo',
    tags: ['celosage', 'intermediate', 'hardhat', 'solidity', 'dao'],
  },
  {
    title: 'How to Write Unit Testing for Smart Contract with Hardhat',
    description: 'How to write unit testing for smart contracts with Hardhat.',
    preview: require('./showcase/intermediate/how-to-write-unit-testing-for-smart-contracts-with-hardhat.png'),
    website: 'blog/tutorials/how-to-write-unit-testing-for-contracts-with-hardhat',
    tags: ['celo', 'intermediate', 'celosage', 'smartcontract', 'solidity'],
  },
  {
    title: 'Creating, Deploying, Minting your ERC1155 Token on Celo',
    description: 'How to Creating, Deploying, Minting your ERC1155 Token on Celo using Hardhat',
    preview: require('./showcase/intermediate/how-to-create-deploy-and-mint-your-erc1155-token-on-celo-with-hardhat.png'),
    website: 'blog/tutorials/how-to-create-deploy-and-mint-your-erc1155-token-on-celo-with-hardhat',
    tags: ['celo', 'intermediate', 'celosage', 'deploy', 'smartcontract', 'solidity', 'tokens', 'ipfs', 'hardhat'],
  },
  {
    title: 'Unit Testing with Truffle and Celo',
    description: 'How to write unit testing for smart contracts with Truffle.',
    preview: require('./showcase/beginner/how-to-write-unit-testing-for-contracts-with-truffle.png'),
    website: 'blog/tutorials/how-to-write-unit-testing-for-smart-contract-with-truffle',
    tags: ['intermediate', 'truffle', 'smartcontract', 'celosage'],

  },
  {
    title: 'Proof Of Stack Consensus',
    description: 'A Deep Dive into Celo Proof of Stake Consensus.',
    preview: require('./showcase/beginner/a-deep-dive-into-celo-proof-of-stake-consensus.png'),
    website: 'blog/tutorials/a-deep-dive-into-celo-proof-of-stake-consensus',
    tags: ['intermediate', 'smartcontract', 'celosage', 'celo'],
  },
  {
  title: 'Understanding the Decentralized Storage System',
  description: 'This tutorial is a comprehensive and explanatory guide to understanding the decentralized storage system',
  preview: require('./showcase/intermediate/understanding-the-decentralized-storage-system.png'),
  website: 'blog/tutorials/understanding-the-decentralized-storage-system',
  tags: ['celo', 'intermediate', 'celosage'],
},
{
  title: 'How to listen to smart contract On-Chain events with Celo',
  description: 'This tutorial teaches its readers about reading celo on-chain event',
  preview: require('./showcase/intermediate/how-to-listen-to-smart-contract-on-chain-event-with-celo.png'),
  website: 'blog/tutorials/how-to-listen-to-smart-contract-on-chain-event-with-celo',
  tags: ['celo', 'intermediate', 'celosage'],
},
  {
    title: 'Minting your ERC1155 Token on Celo',
    description: 'How to Minting your ERC1155 Token on Celo using Remix',
    preview: require('./showcase/intermediate/how-to-mint-your-erc1155-nft-on-celo-with-remix.png'),
    website: 'blog/tutorials/how-to-mint-your-erc1155-nft-on-celo-with-remix',
    tags: ['celo', 'intermediate', 'celosage', 'solidity', 'erc1155'],
  },
  {
    title: 'How To Download and Test The Celo Extension Wallet on Your Browser',
    description: 'How To Download and Test The Celo Extension Wallet on Your Browser.',
    preview: require('./showcase/beginner/how-to-download-and-test-the-Celo-extension-wallet-on-your-browser.png'),
    website: 'blog/tutorials/how-to-download-and-test-the-Celo-extension-wallet-on-your-browser',
    tags: ['celosage', 'video', 'beginner'],
  },
  {
    title: 'How to create an NFT with royalties on Celo',
    description: 'Building a dApp to mint an NFT with royalty',
    preview: require('./showcase/intermediate/how-to-create-an-nft-with-royalties-on-celo.png'),
    website: 'blog/tutorials/how-to-create-an-nft-with-royalties-on-celo',
    tags: ['celosage', 'nft', 'advanced'],
  },
  {
    title: 'How to build a marketplace for selling shoes on the celo blockchain',
    description: 'Learn how to build a marketplace for seliing shoes on the celo blockchain.',
    preview: require('./showcase/intermediate/How-to-Build-a-Marketplace-for-Selling-Shoes-on-Celo.png'),
    website: 'blog/tutorials/how-to-build-a-marketplace-for-selling-shoes-on-the-celo-blockchain',
    tags: ['celosage', 'solidity', 'intermediate'],
  },
  {
    title: 'Build a Frontend dApp for Celo Network in Angular',
    description: 'How to build a frontend for an NFT Auction dApp that runs on the Celo blockchain using Angular',
    preview: require('./showcase/intermediate/build-a-frontend-dapp-for-celo-network-in-angular.png'),
    website: 'blog/tutorials/build-a-frontend-dapp-for-celo-network-in-angular',
    tags: ['celosage', 'hardhat', 'advanced'],
  },
  {
    title: 'How to create interactive NFTs on Celo',
    description: 'Building a dApp to show interactive nfts',
    preview: require('./showcase/intermediate/how-to-create-interactive-nfts-on-celo.png'),
    website: 'blog/tutorials/how-to-create-interactive-nfts-on-celo',
    tags: ['celosage', 'nft', 'advanced'],
  },
  {
    title: 'Potential Growth of Blockchain and its Use Cases',
    description: 'In this tutorial, we will explore the current and potential future applications of blockchain technology',
    preview: require('./showcase/beginner/potential-growth-of-blockchain-and-its-use-cases.png'),
    website: 'blog/tutorials/potential-growth-of-blockchain-and-its-use-cases',
    tags: ['celosage', 'beginner'],
  },
  {
    title: 'Overview of NFTs on the Celo Platform',
    description: 'In this tutorial, we explore NFTs and what NFTs platforms are on Celo',
    preview: require('./showcase/beginner/overview-of-NFTs-on-the-Celo-Platform.png'),
    website: 'blog/tutorials/overview-of-nfts-on-the-celo-platform',
    tags: ['celosage', 'nft', 'celo', 'beginner'],
  },
  {
    title: 'Advance hardhat configration on celo using plugins',
    description: 'Leveraging plug-ins for better developer experience',
    preview: require('./showcase/intermediate/advance-hardhat-configuration-on-celo-using-plugins.png'),
    website: 'blog/tutorials/advance-hardhat-configuration-on-celo-using-plugins',
    tags: ['celosage', 'hardhat', 'intermediate', 'javascript'],
  },
  {
    title: 'Solidity from Zero to Hero',
    description: 'In this article you will learn Solidity language',
    preview: require('./showcase/beginner/solidity-from-zero-to-hero.png'),
    website: 'blog/tutorials/solidity-from-zero-to-hero',
    tags: ['celosage', 'intermediate'],
  },
  {
    title: ' How to Create a Celo Testnet RPC Using Lava Protocol',
    description: 'This article briefly examines RPCs while guiding readers on the steps required to create Celo Testnet and Mainnet RPCs using Lava.',
    preview: require('./showcase/beginner/how-to-create-celo-testnet-and-mainnet-rpc-using-lava.png'),
    website: 'blog/tutorials/how-to-create-celo-testnet-and-mainnet-rpc-using-lava',
    tags: ['celosage', 'beginner','celo'],
  },
  {
    title: 'Build an NFT Marketplace for Tech Artisans on Celo',
    description: 'This tutorial will show you how to use React, Solidity, react-celo, and IPFS to create a platform that connects creators and collectors in the NFT market space',
    preview: require('./showcase/intermediate/build-an-nft-marketplace-for-tech-artisans-on-celo.png'),
    website: 'blog/tutorials/build-an-nft-marketplace-for-tech-artisans-on-celo',
    tags: ['celosage', 'intermediate', 'react', 'ipfs', 'nft'],
  },
  {
    title: 'Create a Lottery dApp using Celo Composer and Redstones Randomness',
    description: 'Solidity smart contracts can use randomness to ensure that lottery outcomes are fair and unbiased, hence the use of Redstone randomness, which allows for transparency in the implementation',
    preview: require('./showcase/intermediate/create-a-lottery-dapp-using-celo-composer-and-redstone-randomness.png'),
    website: 'blog/tutorials/create-a-lottery-dapp-using-celo-composer-and-redstone-randomness',
    tags: ['celosage', 'intermediate', 'react', 'hardhat', 'oracle', 'randomness'],
  },
  {
    title: 'How to use Witnet oracle network to display cryptocurrency prices',
    description: 'This tutorial will demonstrate the process of utilizing the Witnet oracle network to obtain cryptocurrency prices by linking off-chain data with the blockchain',
    preview: require('./showcase/intermediate/how-to-use-witnet-oracle-to-display-cryptocurrency-prices.png'),
    website: 'blog/tutorials/how-to-use-witnet-oracle-to-display-cryptocurrency-prices',
    tags: ['celosage', 'intermediate', 'react', 'hardhat', 'oracle'],
  },
  {
    title: 'Getting Started On Celo With Hardhat',
    description: 'Providing Celo developers with comprehensive information on Web3 tools and their usage',
    preview: require('./showcase/beginner/getting-started-on-celo-with-hardhat.png'),
    website: 'blog/tutorials/getting-started-on-celo-with-hardhat',
    tags: ['celosage', 'hardhat', 'smartcontract', 'solidity', 'intermediate'],
  },
  {
    title: 'How to Add Crypto Payment to an E-Commerce Website with Celo and Valora',
    description: 'This article will provide a step-by-step guide on how to add Crypto payment to an E-commerce website with Celo Valora.',
    preview: require('./showcase/advanced/how-to-add-crypto-pay-using-valora.png'),
    website: 'blog/tutorials/how-to-add-crypto-pay-using-valora',
    tags: ['celosage', 'advanced', 'celo', 'react', 'valora'],
  },
  {
    title: 'Regenerative Finance - What it is and Why it Matters',
    description: 'In this article, we will look into the financial protocol behind the Celo blockchain, the "how" and the "helps"',
    preview: require('./showcase/beginner/regenerative-finance-and-celo-the-process-and-partnership.png'),
    website: 'blog/tutorials/regenerative-finance-and-celo-the-process-and-partnership',
    tags: ['celosage', 'intermediate'],
  },
  {
    title: 'Best practices for writing smart contracts with real world examples',
    description: 'Showing some of the best practices for writing smart contracts',
    preview: require('./showcase/intermediate/best-practices-for-writing-smart-contracts-with-real-world-examples.png'),
    website: 'blog/tutorials/best-practices-for-writing-smart-contracts-with-real-world-examples',
    tags: ['celosage', 'intermediate', 'solidity', 'hardhat'],
  },
  {
    title: 'Create Dynamic NFT, Redstone Custom API and Celo Composer, Hardhat & React (Nextjs)',
    description: 'Welcome to this tutorial, in this tutorial we will be building a Dynamic NFT using Celo composer together with Redstone Oracle Custom API Data.',
    preview: require('./showcase/intermediate/create-dynamic-nft-redstone-custom-api-and-celo-composer-hardhat-react-nextjs.png'),
    website: 'blog/tutorials/create-dynamic-nft-redstone-custom-api-and-celo-composer-hardhat-react-nextjs',
    tags: ['solidity', 'react', 'celo', 'smartcontract', 'nextjs', 'intermediate', 'nft', 'celosage'],
  },
  {
    title: 'An Introduction to Layer 1 and Layer 2 Blockchain Protocols',
    description: 'In this tutorial, we will provide an introduction to the different types of blockchain protocols and explain the key differences between layer 1 and layer 2 protocols.',
    preview: require('./showcase/beginner/an-introduction-to-layer-1-and-layer-2-blockchain-protocols.png'),
    website: 'blog/tutorials/an-introduction-to-layer-1-and-layer-2-blockchain-protocols',
    tags: ['celosage', 'beginner'],
  },
  {
    title: 'Crypto Wallets - The Celo Way',
    description: 'This tutorials teaches you all you need to know about Crypto Wallets',
    preview: require('./showcase/beginner/crypto-wallets.png'),
    website: 'blog/tutorials/crypto-wallets-the-celo-way',
    tags: ['celosage', 'beginner'],
  },
  {
    title: 'How to create your first smart contract on the celo blockchain',
    description: 'This tutorials teaches you how to create your first sample smart contract and deploy it on the celo blockchain',
    preview: require('./showcase/beginner/create-your-first-smart-contract-on-celo.png'),
    website: 'blog/tutorials/create-your-first-smart-contract-on-celo',
    tags: ['celosage', 'remix', 'smartcontract', 'solidity'],
  },
  {
    title: 'Build a Simple Forum Dapp with Flutter on Celo',
    description: 'In this tutorial, we will guide you through the process of writing and deploying a simple forum smart contract on the Celo network, and then using Flutter to build a user-friendly interface for interacting with the contract.',
    preview: require('./showcase/intermediate/build-a-simple-forum-dapp-with-flutter-on-celo.png'),
    website: 'blog/tutorials/build-a-simple-forum-dapp-with-flutter-on-celo',
    tags: ['celosage', 'flutter', 'advanced'],
  },
  {
    title: 'Build a generic staking dapp using Foundry and NextJs',
    description: 'Compiling, testing and deploying contracts using foundry with frontend using Nextjs',
    preview: require('./showcase/advanced/build-a-generic-staking-dapp-using-foundry-and-nextjs.png'),
    website: 'blog/tutorials/build-a-generic-staking-dapp-using-foundry-and-nextjs',
    tags: ['celosage', 'advanced', 'smartcontract', 'solidity', 'nextjs', 'materialui', 'react'],
  },
  {
    title: 'Connect and interact with Celo using web3onboard library',
    description: 'A convenient library for connecting to Celo blockchain',
    preview: require('./showcase/intermediate/connect-and-interact-with-celo-using-web3onboard-library.png'),
    website: 'blog/tutorials/connect-and-interact-with-celo-using-web3onboard-library',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity', 'nextjs', 'materialui', 'react'],
  },
  {
    title: 'Proof of Work vs Proof of Stake - A Comprehensive Comparison',
    description: 'In this article, we will provide a comprehensive comparison of proof of work and proof of stake.',
    preview: require('./showcase/beginner/proof-of-work-vs-proof-of-stake-a-comprehensive-comparison.png'),
    website: 'blog/tutorials/proof-of-work-vs-proof-of-stake-a-comprehensive-comparison',
    tags: ['celosage', 'intermediate'],
  },
  {
    title: 'Preventing Vulnerabilities in Solidity - Denial of Service Attack',
    description: 'The Denial of Service attack in Solidity is a comprehensive attack.',
    preview: require('./showcase/advanced/preventing-vulnerabilities-in-solidity-denial-of-service-attack.png'),
    website: 'blog/tutorials/preventing-vulnerabilities-in-solidity-denial-of-service-attack',
    tags: ['celosage', 'advanced'],
  },
  {
    title: 'Create a Crowdfunding Smart Contract on Celo using Hardhat',
    description: 'This tutorial teach developers how to build a crowdfunding contract on Celo, using Solidity and Hardhat framework.',
    preview: require('./showcase/advanced/create-a-crowdfunding-smart-contract-on-celo-using-hardhat.png'),
    website: 'blog/tutorials/create-a-crowdfunding-smart-contract-on-celo-using-hardhat',
    tags: ['celosage', 'solidity', 'hardhat', 'advanced'],
  },
  {
    title: 'Why should you use Celo Blockchain',
    description: 'In this tutorial, we will introduce you to the Celo blockchain and explain its key features and benefits in a way that is easy to understand, even for complete beginners.',
    preview: require('./showcase/beginner/why-should-you-use-celo.png'),
    website: '/blog/tutorials/why-should-you-use-celo',
    tags: ['celosage','celo', 'beginner'], 
  },
  {
    title: 'Build a Donation dApp on Celo to award your Favorite Content Creator',
    description: 'In this tutorial, we will show you how to create donation dApp to reward your favourite content creator.',
    preview: require('./showcase/advanced/build-a-donation-dapp-on-celo-to-award-your-favourite-content-creator.png'),
    website: '/blog/tutorials/build-a-donation-dapp-on-celo-to-award-your-favourite-content-creator',
    tags: ['celosage','celo', 'advanced'], 
  },
  {
    title: 'Create a Full Stack Whitelist dApp with Merkle Trees on CELO',
    description: 'Learn how you can use Merkle trees, a powerful data structure hierarchy, to efficiently verify if a particular data is part of a dataset',
    preview: require('./showcase/advanced/create-full-stack-whitelist-dapp-with-merkle-trees-celo.png'),
    website: 'blog/tutorials/create-full-stack-whitelist-dapp-with-merkle-trees-celo',
    tags: ['advanced', 'hardhat', 'celosage', 'solidity'],
  },{
    title: 'Creating a Twitter-Like Decentralized Application on Celo using Solidity',
    description: 'Building a decentralized Twitter on the Celo blockchain refers to the creation of a social media platform that utilizes blockchain technology to enable users to communicate and share information in a decentralized and censorship-resistant manner',
    preview: require('./showcase/intermediate/creating-a-twitter-like-decentralized-application-on-celo-using-solidity.png'),
    website: 'blog/tutorials/building-a-decentralized-twitter-on-the-celo-blockchain',
    tags: ['celosage', 'dacade', 'smartcontract', 'solidity',],
  },
  {
    title: 'How to Use Hardware Tools with the Celo Blockchain',
    description: 'In this series, we will explore how hardware is driving the adoption of the Celo blockchain',
    preview: require('./showcase/intermediate/how-to-use-hardware-tools-with-the-celo-blockchain.png'),
    website: 'blog/tutorials/how-to-use-hardware-tools-with-the-celo-blockchain',
    tags: ['intermediate','celo','celosage'],
  },
  {
    title: 'Build feature-rich, persistent dapp on celo using wagmi',
    description: 'An alternative method of connecting to Celo networks',
    preview: require('./showcase/advanced/build-a-feature-rich-persistent-dapp-on-celo-using-wagmi.png'),
    website: 'blog/tutorials/build-a-feature-rich-persistent-dapp-on-celo-using-wagmi',
    tags: ['hardhat', 'celosage', 'solidity', 'react', 'nextjs', 'materialui', 'typescript'],
  },
  {
    title: 'Why you should Build your Next Project on the Celo Blockchain',
    description: 'This tutorial examines the features and capabilities of the Celo Blockchain',
    preview: require('./showcase/beginner/why-you-should-build-your-next-project-on-the-celo-blockchain.png'),
    website: '/blog/tutorials/why-you-should-build-your-next-project-on-the-celo-blockchain',
    tags: ['celosage','beginner','celo'],
  },
  {
    title: 'Simplifying the Celo 2.0 Roadmap for Celo Builders',
    description: 'This article breaks down the details of the Celo 2.0 roadmap into specific features, building requirements and outlooks as well as pointing out the developments that will follow this new roadmap.',
    preview: require('./showcase/beginner/simplifying-the-celo-2.0-roadmap-for-celo-builders.png'),
    website: '/blog/tutorials/simplifying-the-celo-2.0-roadmap-for-celo-builders',
    tags: ['celosage','celo'], 
  },
  {
    title: 'Solidity Event Logging And Monitoring On Celo Best Practices',
    description: 'In this tutorial we will teach you about solidity events. How to use them and the best practices.',
    preview: require('./showcase/intermediate/solidity-event-logging-and-monitoring-on-celo-best-Practices.png'),
    website: '/blog/tutorials/solidity-event-logging-and-monitoring-on-celo-best-Practices',
    tags: ['celosage', 'solidity', 'celo'], 
  },
  {
    title: 'How to Add Support for Stablecoin Gas Fees using Celo Composer',
    description: 'Learn how to implement stablecoin gas fee support in your application, using the Solidity programming language and React for the front-end',
    preview: require('./showcase/intermediate/how-to-add-support-for-stablecoin-gas-fees-using-celo-composer.png'),
    website: 'blog/tutorials/how-to-add-support-for-stablecoin-gas-fees-using-celo-composer',
    tags: ['intermediate', 'hardhat', 'celosage', 'solidity'],
  },
  {
    title: 'Connect and interact with Celo using Web3React',
    description: 'Alternative method of connecting to Celo using web3React',
    preview: require('./showcase/advanced/connect-and-interact-with-celo-using-web3react.png'),
    website: 'blog/tutorials/connect-and-interact-with-celo-using-web3react',
    tags: ['celosage', 'advanced', 'smartcontract', 'solidity', 'nextjs', 'materialui', 'react'],
  },
  {
    title: 'How to build a crowdfunding platform on Celo',
    description: 'In this tutorial, we will guide you through the process of building a crowdfunding platform on the Celo blockchain',
    preview: require('./showcase/advanced/how-to-build-a-crowdfunding-platform-on-celo.png'),
    website: '/blog/tutorials/how-to-build-a-crowdfunding-platform-on-celo',
    tags: ['celosage','celo', 'advanced'], 
  },
  {
    title: 'A guide to building and deploying upgradeable contracts on CELO with Diamond standard',
    description: 'This tutorial introduces the diamond standard for writing modular and upgradeable smart contracts, and give a brief walkthrough of how to build an upgrade-able ERC20 token compatible contract, deploy to CELO, and perform an upgrade to this contract',
    preview: require('./showcase/advanced/a-guide-to-building-and-deploying-upgradeable-contracts-on-CELO-with-Diamond-standard.png'),
    website: '/blog/tutorials/a-guide-to-building-and-deploying-upgradeable-contracts-on-CELO-with-Diamond-standard',
    tags: ['celosage','celo', 'ERC20', 'solidity', 'advanced'],
  },
  {
    title: 'Guide to Building a Cross-Chain Interoperability between Celo and other Blockchain Networks',
    description: 'Learn how to create smart contracts that allow Celo and other blockchains to communicate with one another',
    preview: require('./showcase/intermediate/guide-to-building-a-cross-chain-interoperability-between-celo-and-other-blockchain-networks.png'),
    website: 'blog/tutorials/guide-to-building-a-cross-chain-interoperability-between-celo-and-other-blockchain-networks',
    tags: ['celo', 'celosage', 'smartcontract', 'solidity', 'javascript', 'intermediate'], 
  },
  {
    title: 'Build an nft-gated dapp and deploy on a decentralized hosting service',
    description: 'An interesting use case for NFTs on Celo network',
    preview: require('./showcase/advanced/build-an-nft-gated-dapp-and-deploy-on-decentralized-hosting-service.png'),
    website: 'blog/tutorials/build-an-nft-gated-dapp-and-deploy-on-decentralized-hosting-service',
    tags: ['advanced', 'solidity', 'nextjs', 'celosage'],
  },
  {
    title: 'How to Create a Decentralized Application Using React-Celo',
    description: 'This sequel walks blockchain developers on the Celo network through the process of creating a Decentralized Application (dApp) to interact with the created crowdfunding smart contract using React-Celo',
    preview: require('./showcase/intermediate/how-to-create-a-decentralized-application-using-react-celo.png'),
    website: 'blog/tutorials/how-to-create-a-decentralized-application-using-react-celo',
    tags: ['celosage', 'smartcontract', 'solidity', 'react', 'hardhat', 'crowdfunding', 'intermediate'],
  },
  {
    title: 'Building Dynamic and Scalable User Interfaces for Celo ERC721 Smart Contracts using React- A Comprehensive Introduction',
    description: 'Integrating your smart contract with a frontend framework like React can provide a seamless and user-friendly experience for interacting with your contract',
    preview: require('./showcase/intermediate/building-dynamic-and-scalable-user-interfaces-for-celo-erc721-smart-contracts-using-react.png'),
    website: 'blog/tutorials/building-dynamic-and-scalable-user-interfaces-for-celo-erc721-smart-contracts-using-react',
    tags: ["celo", "intermediate", "celosage", "react"],
  },
  {
    title: 'Example architectures for a simple payment dapp',
    description: 'This post will focus on the front-end part of how to create a simple payment dapp',
    preview: require('./showcase/beginner/example-architectures-for-a-simple-payment-dapp.png'),
    website: 'blog/tutorials/example-architectures-for-a-simple-payment-dapp',
    tags: ['javascript', 'react', 'beginner', 'celo'], 
  },
  {
    title: 'Build a Tic Tac Toe game with Flutter using Celo Composer',
    description: 'This tutorial will guide you through building an example using Celo Composer, a Tic Tac To game applications on the Celo blockchain using Flutter.',
    preview: require('./showcase/intermediate/build-a-tic-tac-toe-game-with-flutter-using-celo-composer.png'),
    website: 'blog/tutorials/build-a-tic-tac-toe-game-with-flutter-using-celo-composer',
    tags: ['celosage', 'flutter', 'solidity', 'intermediate', 'celo'], 
  },
  {
    title: 'Build a library-based dapp on Celo',
    description: 'Working with library in solidity',
    preview: require('./showcase/advanced/build-a-library-based-dapp-on-celo.png'),
    website: 'blog/tutorials/build-a-library-based-dapp-on-celo',
    tags: ['advanced', 'solidity', 'hardhat', 'celosage'],
  },
  {
    title: 'Connect and interact with Celo using web3modal',
    description: 'Alternative method of connecting to Celo using web3Modal',
    preview: require('./showcase/advanced/connect-and-interact-with-celo-using-web3modal.png'),
    website: 'blog/tutorials/connect-and-interact-with-celo-using-web3modal',
    tags: ['celosage', 'advanced', 'smartcontract', 'solidity', 'nextjs', 'materialui', 'react'],
   },
   {
    title: 'Interact with Celo Blockchain using web3dart',
    description: 'This article explains how to construct a dart program to communicate with the Celo blockchain using web3dart',
    preview: require('./showcase/beginner/interact-with-celo-blockchain-using-web3dart.png'),
    website: 'blog/tutorials/interact-with-celo-blockchain-using-web3dart',
    tags: ['celosage', 'flutter', 'beginner', 'celo'], 
  },
  {
    title: 'Supporting Multiple Tokens - EIP 155 and the Multi-Token Standard',
    description: 'These guidelines provide a framework for smart contracts to support multiple tokens within a single contract.',
    preview: require('./showcase/beginner/supporting-multiple-tokens-eip-155-and-the-multi-token-standard.png'),
    website: 'blog/tutorials/supporting-multiple-tokens-eip-155-and-the-multi-token-standard',
    tags: ['beginner', 'celosage', 'celo'], 
  },
   {
    title: 'Upgrading a Smart Contract on Celo',
    description: 'This tutorial provides a guide to upgrading a smart contract on the Celo blockchain and its importance',
    preview: require('./showcase/intermediate/upgrading-a-smart-contract-on-celo.png'),
    website: 'blog/tutorials/upgrading-a-smart-contract-on-celo',
    tags: ['celosage', 'smartcontract', 'solidity', 'intermediate', 'celo'], 
  },
  {
    title: 'Decentralized Storage and Seamless User Experience: Integrating IPFS with React for Your ERC721 Smart Contract',
    description: 'This tutorial would guide you through the basics of IPFS and how you can integrate it in your React project',
    preview: require('./showcase/intermediate/integrating-ipfs-with-react.png'),
    website: 'blog/tutorials/integrating-ipfs-with-react',
    tags: ["celo", "intermediate", "celosage","ipfs"], 
  },
  {
    title: 'Building a Smart Contract Lottery Application on Celo with Python',
    description: 'This tutorial provides a guide on how to use Python to build a smart contract lottery application on the Celo blockchain',
    preview: require('./showcase/intermediate/building-a-smart-contract-lottery-application-on-celo-with-python.png'),
    website: 'blog/tutorials/building-a-smart-contract-lottery-application-on-celo-with-python',
    tags: ['celosage', 'smartcontract', 'solidity', 'intermediate', 'celo'], 
  },
  {
    title: 'Developing a Celo Blockchain Social Network with Python',
    description: 'This article will empower you to create a secure, scalable, and engaging social network that harnesses the full potential of Celo cutting-edge blockchain technology',
    preview: require('./showcase/intermediate/developing-a-celo-blockchain-social-network-with-python.png'),
    website: 'blog/tutorials/developing-a-celo-blockchain-social-network-with-python',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },
  {
    title: 'Deploying a proposal for DAOs on Celo',
    description: 'This article explains how to deploy a governance proposal on Celo',
    preview: require('./showcase/intermediate/deploying-a-proposal-for-daos-on-celo.png'),
    website: 'blog/tutorials/deploying-a-proposal-for-daos-on-celo',
    tags: ['celosage', 'intermediate',  'celo'], 
  },
  {
    title: 'How to build a Celo Price Tracker browser extension using Vite and Celo Contractkit.',
    description: 'In this article, I will show developers how to create a Celo Price Tracker browser extension that works with any browser, such as Brave, Chrome, and Firefox, by using Vite (a React template), Crxjs Vite Plugin, and the Celo Contractkit package.',
    preview: require('./showcase/beginner/how-to-build-a-celo-price-tracker-browser-extension-using-vite-and-celo-contractkit.png'),
    website: 'blog/tutorials/how-to-build-a-celo-price-tracker-browser-extension-using-vite-and-celo-contractkit',
    tags: ['celosage', 'react', 'beginner', 'celo'],
  },

  {
    title: 'Build a Full-Stack Mobile DApp with React Native and Web.JS on Celo',
    description: 'Learn hoe to build chat app on celo network using react-native and web3js',
    preview: require('./showcase/intermediate/build-a-full-stack-mobile-dapp-with-react-native-and-webjs-on-celo.png'),
    website: 'blog/tutorials/build-a-full-stack-mobile-dapp-with-react-native-and-webjs-on-celo',
    tags: ['celosage', 'reactnative', 'intermediate', 'celo'], 
  },
  {
    title: 'What are PFP NFTs, How to Create Them?',
    description: 'PFP NFTs are blockchain-based digital assets used as profile pictures. To create one, design an image, choose a blockchain platform and compatible wallet, and mint it on an NFT marketplace.',
    preview: require('./showcase/intermediate/what-are-pfp-nfts-and-how-to-create-them.png'),
    website: 'blog/tutorials/what-are-pfp-nfts-and-how-to-create-them',
    tags: ['celosage', 'solidity', 'intermediate', 'celo', 'erc721', 'truffle'], 
  },
  {
    title: 'Developing a Crowdfunding Platform for Social Causes on Celo Blockchain - Part 1',
    description: 'A Celo-based crowdfunding platform for social causes would enable social organizations, charities, and individuals to create campaigns and connect directly with donors to donate funds, leveraging the transparency and security of blockchain technology.',
    preview: require('./showcase/intermediate/developing-a-crowdfunding-platform-for-social-causes-on-celo-blockchain-part-1.png'),
    website: 'blog/tutorials/developing-a-crowdfunding-platform-for-social-causes-on-celo-blockchain-part-1',
    tags: ['celosage', 'solidity', 'intermediate', 'celo', 'truffle'], 
  },
  {

    title: 'Interacting with Celo\'s Stablecoin, Celo Dollars, using Python',
    description: ' Uncover the secrets of working with Celo\'s stablecoin, Celo Dollars, in this informative guide. Learn how to interact, manage, and utilize Celo Dollars in your applications using Python. This article covers essential concepts, practical examples, and step-by-step instructions to harness the power of Celo\'s blockchain technology, opening up new possibilities in the world of digital currencies and decentralized finance.',
    preview: require('./showcase/intermediate/interacting-with-celo-stablecoin-celo-dollars-using-python.png'),
    website: 'blog/tutorials/interacting-with-celo-stablecoin-celo-dollars-using-python',
    tags: ["celosage", "intermediate", "smartcontract", "solidity"], 
  },
  {
    title: 'Interact with smart contract on Celo using Web3js',
    description: 'Learn how to navigate through web3js framework',
    preview: require('./showcase/intermediate/interact-with-smart-contract-on-celo-using-web3js.png'),
    website: 'blog/tutorials/interact-with-smart-contract-on-celo-using-web3js',
    tags: ['celosage', 'solidity', 'intermediate', 'celo', 'hardhat'], 

  },
  {
    title: 'The Future of NFT Creation - Unleashing the Power of Batch Minting with ERC721psi',
    description: 'Batch minting with ERC721psi is an efficient way of creating multiple tokens at once, saving time and money. This feature is important for scalability and is implemented using smart contracts.',
    preview: require('./showcase/intermediate/the-future-of-nft-creation-unleashing-the-power-of-batch-minting-with-erc721psi.png'),
    website: 'blog/tutorials/the-future-of-nft-creation-unleashing-the-power-of-batch-minting-with-erc721psi',
    tags: ['celosage', 'erc721', 'intermediate', 'celo', 'solidity'], 
  },
  {
    title: 'Automate Flutter Celo DApp Deployment with GitHub Actions',
    description: 'Learn how to deploy and publish your Flutter DApp to Google Play Store or Google Drive using GitHub Actions.',
    preview: require('./showcase/intermediate/automate-flutter-celo-dapp-deployment-with-github-actions.png'),
    website: 'blog/tutorials/automate-flutter-celo-dapp-deployment-with-github-actions',
    tags: ['celosage', 'flutter', 'intermediate', 'celo', 'deploy'], 
  },
  {
    title: 'Integrating Web3Auth With Celo Blockchain In Your Dapp',
    description: 'Web3Auth is a decentralized authentication protocol that allows users to authenticate with DApps using their Web3 wallet, such as MetaMask. In this tutorial, I will be exploring how to integrate Web3Auth with the Celo blockchain in a DApp.',
    preview: require('./showcase/intermediate/integrating-web3Auth-with-celo-blockchain-in-your-dapp.png'),
    website: 'blog/tutorials/integrating-web3Auth-with-celo-blockchain-in-your-dapp',
    tags:["nextjs", "intermediate", "smartcontract", "solidity"], 
  },
  {
    title: 'Get started with CELO using Rust',
    description: 'This article is intended for developers that have some familiarity with Rust and want to construct a Rust program to communicate with the Celo blockchain.',
    preview: require('./showcase/beginner/get-started-with-celo-using-rust.png'),
    website: 'blog/tutorials/get-started-with-celo-using-rust',
    tags: ['celosage', 'beginner', 'celo', 'deploy'], 
  },
  {
    title: 'Building A Decentralized Tipping System on Celo',
    description: 'This tutorial guides you through the steps required to building a decentralized tipping system.',
    preview: require('./showcase/intermediate/building-decentralized-tipping-system-on-celo.png'),
    website: 'blog/tutorials/building-decentralized-tipping-system-on-celo',
    tags: ['celosage', 'intermediate', 'solidity', 'smartcontract'], 
  },
  {
    title: "Build a monthly susbscription platform using Celo composer & Openzeppelin Defender",
    description: "This comprehensive tutorial will guide you through setting up a crypto payment subscription platform on Celo.",
    preview: require("./showcase/advanced/build-a-monthly-susbscription-platform-using-celo-composer-openzeppelin-defender.png"),
    website: "/blog/tutorials/build-a-monthly-susbscription-platform-using-celo-composer-openzeppelin-defender",
    tags: ["advanced", "celosage", "celo", "openzeppelin"],
  },
   {
    title: "Integrating Python with Celo Mobile Wallet",
    description: "Explore the fascinating world of integrating Python with Celo's mobile wallet in this insightful article.",
    preview: require("./showcase/intermediate/integrating-python-with-celo-mobile-wallet.png"),
    website: "/blog/tutorials/integrating-python-with-celo-mobile-wallet",
    tags: ["celosage", "intermediate", "smartcontract", "solidity"],
  },
  {
    title: "Build an Airdrop Distribution System for Millions of Users with Verification of Merkle Tree Proofs",
    description: "Curious about how Uniswap and other projects are able to airdrop tokens to thousands of users? In this tutorial, we will show you how they use Merkle proof in Solidity and Javascript to accomplish this feat.",
    preview: require("./showcase/advanced/build-an-airdrop-distribution-system-for-millions-of-users-with-verification-of-merkle-tree-proofs.png"),
    website: "/blog/tutorials/build-an-airdrop-distribution-system-for-millions-of-users-with-verification-of-merkle-tree-proofs",
    tags: ["advanced", "celosage", "celo", "tokens"],
  },
  {
    title: "Lazy Minting NFTs A Cost-Effective and Flexible Approach to NFT Creation",
    description: "Lazy Minting NFTs offer a budget-friendly and adaptable way of creating NFTs without sacrificing quality or control. Simplify the process with ease.",
    preview: require("./showcase/intermediate/lazy-minting-nfts-a-cost-effective-and-flexible-approach-to-nft-creation.png"),
    website: "/blog/tutorials/lazy-minting-nfts-a-cost-effective-and-flexible-approach-to-nft-creation",
    tags: ["intermediate", "solidity", "celosage", "erc721", "truffle"],
  },
  {
    title: 'Automate React Native Celo DApp Deployment with GitHub Actions',
    description: 'Learn how to deploy and publish your React Native DApp to Google Play Store or Google Drive',
    preview: require('./showcase/intermediate/automate-react-native-celo-dapp-deployment-with-github-actions.png'),
    website: 'blog/tutorials/automate-react-native-celo-dapp-deployment-with-github-actions',
    tags: ['celosage', 'reactnative', 'intermediate', 'celo'], 
  },
  {
    title: 'Building a Celo Blockchain Explorer with Python',
    description: 'In this tutorial, well use Python and the web3.py module to create a blockchain explorer for the Celo network.',
    preview: require('./showcase/intermediate/sage-building-a-celo-blockchain-explorer-with-python.png'),
    website: '/blog/tutorials/building-a-celo-blockchain-explorer-with-python',
    tags: ['celosage','celo', 'intermediate', 'smartcontract', 'solidity'],
  },
  {
    title: 'Using Python to Interact with Celos Governance System',
    description: 'In this article, we will know what the Celo Governance system is and how we can interact with it using Python and web3.py',
    preview: require('./showcase/intermediate/sage-using-python-to-interact-with-celos-governance-system.png'),
    website: '/blog/tutorials/using-python-to-interact-with-celos-governance-system',
    tags: ['celosage','celo', 'intermediate', 'smartcontract', 'solidity'],
  },
   {
    title: 'Implementing Staking & Reward Contract Using Solidity',
    description: 'Staking and reward contracts are popular mechanisms for incentivizing participation in the activities of a blockchain network.',
    preview: require('./showcase/intermediate/implementing-staking-and-reward-contract-using-solidity.png'),
    website: 'blog/tutorials/implementing-staking-and-reward-contract-using-solidity',
    tags: ['celosage', 'intermediate', 'smartcontract'],
  },
  {
    title: 'Using Python to Build a Celo Blockchain Identity System',
    description: 'This article explains how to use Python and the Web3.py library to build a decentralized identity system on the Celo blockchain.',
    preview: require('./showcase/intermediate/sage-using-python-to-build-a-celo-blockchain-identity-system.png'),
    website: '/blog/tutorials/using-python-to-build-a-celo-blockchain-identity-system',
    tags: ['celosage','celo', 'intermediate', 'smartcontract', 'solidity'], 
  },
  {
    title: 'Automate Celo DApp Deployment to Cloudflare Pages with GitHub Actions',
    description: 'Learn How to Deploy and Publish your Celo DApp Cloudflare Pages with GitHub Actions',
    preview: require('./showcase/intermediate/automate-celo-dapp-deployment-to-cloudflare-pages-with-github-actions.png'),
    website: 'blog/tutorials/automate-celo-dapp-deployment-to-cloudflare-pages-with-github-actions',
    tags: ['celosage', 'react', 'intermediate', 'celo'], 
  },
  {
    title: 'Billeteras como crearlas y como fondearlas',
    description: '¡Bienvenido a nuestro tutorial sobre cómo comenzar con su billetera digital en Celo! En este tutorial, le mostraremos cómo crear una billetera, almacenar su frase de recuperación, financiar la billetera y enviar y recibir dinero en la plataforma Celo.',
    preview: require('./showcase/beginner/Billeteras-como-crearlas-y-como-fondearlas.png'),
    website: 'blog/tutorials/billeteras-como-crearlas-y-como-fondearlas',
    tags: ['celosage', 'beginner'], 
  },
  {
    title: 'Introducing Prosperity Passport - The First Soulbound Token-Powered Web3 Identity Solution for Celo Blockchain',
    description: 'Introducing Prosperity Passport - a groundbreaking Web3 identity solution for Celo blockchain.',
    preview: require('./showcase/beginner/introducing-prosperity-passport-the-first-soulbound-token-powered-web3-identity-solution-for-celo-blockchain.png'),
    website: 'blog/tutorials/introducing-prosperity-passport-the-first-soulbound-token-powered-web3-identity-solution-for-celo-blockchain',
    tags: ['celosage', 'beginner', 'celo'], 
  },
  {
    title: 'Building a Decentralized Exchange on Celo with Golang',
    description: 'This article could focus on building a decentralized exchange (DEX) on the Celo blockchain using the go-ethereum, a Golang blockchain framework',
    preview: require('./showcase/intermediate/building-a-decentralized-exchange-on-celo-with-golang.png'),
    website: 'blog/tutorials/building-a-decentralized-exchange-on-celo-with-golang',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },
  {
    title: 'Effective Smart Contract Testing using Chai',
    description: 'This tutorial guides you to ensure that your code is robust and secure. One way to achieve this is by writing comprehensive tests for your contracts functionality',
    preview: require('./showcase/intermediate/effective-smart-contract-testing-using-chai.png'),
    website: 'blog/tutorials/effective-smart-contract-testing-with-chai',
    tags: ['celosage', 'intermediate', 'smartcontract'], 
  },
  {
    title: 'Easily Deploy your Celo DApp to Cloudflare Pages',
    description: 'Learn How to Deploy and Publish your Celo DApp Cloudflare Pages with Ease',
    preview: require('./showcase/beginner/easily-deploy-your-celo-dapp-to-cloudflare-pages.png'),
    website: 'blog/tutorials/easily-deploy-your-celo-dapp-to-cloudflare-pages',
    tags: ['celosage', 'dapp', 'beginner', 'celo'], 
  },
  {
    title: 'Building Decentralized Applications on the Celo Platform using the Celo SDK and Celo Smart Contracts',
    description: 'Learn how to build and deploy decentralized applications on the Celo platform using the Celo SDK and Celo smart contracts',
    preview: require('./showcase/beginner/building-decentralized-applications-on-celo.png'),
    website: 'blog/tutorials/building-decentralized-applications-on-the-celo-platform-using-the-celo-sdk-and-celo-smart-contract',
    tags: ["celo", "celosage", "truffle", "smartcontract", "solidity", "beginner"], 
  },
  {
    title: 'Building a Celo Voting System with Golang',
    description: 'This article could provide a tutorial on how to use the Celo Golang go ethereum framework to build a secure and transparent voting system on the blockchain',
    preview: require('./showcase/intermediate/building-a-celo-voting-system-with-golang.png'),
    website: 'blog/tutorials/building-a-celo-voting-system-with-golang',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },  
  {
    title: 'A Guide to Exploring Celo-Specific Python Library called web3.py',
    description: 'This article could provide a tutorial on how to use the web3.py library to interact with the celo blockcchain',
    preview: require('./showcase/beginner/a-guide-to-exploring-celo-specific-python-library-called-web3py.png'),
    website: 'blog/tutorials/a-guide-to-exploring-celo-specific-python-library-called-web3py',
    tags: ['celosage', 'beginner', 'dapp', 'celo'], 
  },
  {
    title: 'Interact with smart contract on celo using ethersjs',
    description: 'Understand how to use the ethersjs library',
    preview: require('./showcase/intermediate/interact-with-smart-contract-on-celo-using-ethersjs.png'),
    website: 'blog/tutorials/interact-with-smart-contract-on-celo-using-ethersjs',
    tags: ['celosage', 'intermediate', 'smartcontract', 'typescript', 'solidity'], 
  },
  {
    title: 'Deploying Celo Applications using Golang',
    description: 'This article could provide a tutorial on deploying Celo applications built using the Golang . It could cover topics such as setting up a Celo node, setting up the development environment, creating and deploying smart contracts, and monitoring the deployed contract activities using Celo explorer.',
    preview: require('./showcase/intermediate/deploying-celo-applications-using-golang.png'),
    website: 'blog/tutorials/deploying-celo-applications-using-golang',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 

  },
   {
    title: 'Creating a Decentralized Insurance Service on Celo with Python',
    description: "Learn to build a decentralized insurance smart contract on Celo blockchain using Python, providing accessible, transparent coverage with stablecoins and smart contracts.",
    preview: require('./showcase/intermediate/creating-a-decentralized-insurance-service-on-celo-with-python.png'),
    website: 'blog/tutorials/creating-a-decentralized-insurance-service-on-celo-with-python',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  }, 
 {
    title: 'Creating a Staking Contract on Celo with Python',
    description: 'In this tutorial, you will learn how to build a staking contract on Celo using web3.py.',
    preview: require('./showcase/intermediate/sage-creating-a-staking-contract-on-celo-with-python.png'),
    website: 'blog/tutorials/creating-a-staking-contract-on-celo-with-python',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  }, 
  {
    title: 'Implementing a Token on Celo using Golang',
    description: "This article could provide a step-by-step tutorial on how to implement a custom token on the Celo blockchain using the Golang SDK. It could cover topics such as defining the token's smart contract and deploying it to the Celo network. This article is for developers that want to get started with building blockchain applications using Golang on Celo.",
    preview: require('./showcase/intermediate/implementing-a-token-on-celo-using-golang.png'),
    website: 'blog/tutorials/implementing-a-token-on-celo-using-golang',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 

  },
  {
    title: 'Using Web3.py to Interact with a Deployed Smart Contract in Python',
    description: 'This tutorial provides a step-by-step guide on how to use Web3.py, a Python library to interact with the Ethereum blockchain, to interact with a deployed Smart Contract',
    preview: require('./showcase/intermediate/sage-using-web3-py-to-interact-with-a-deployed-smart-contract-in-python.png'),
    website: 'blog/tutorials/using-web3-py-to-interact-with-a-deployed-smart-contract-in-python',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },
  {
    title: 'Building a Celo Wallet using Golang',
    description: 'This article could focus on building a Celo wallet application using the Golang programming language. It could cover topics such as generating and storing private keys, interacting with the Celo blockchain and implementing features such as sending and receiving Celo transactions.',
    preview: require('./showcase/intermediate/building-a-celo-wallet-using-golang.png'),
    website: 'blog/tutorials/building-a-celo-wallet-using-golang',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },
  {

    title: 'Building a Simple DeFi Application on the Celo Blockchain Using Python',
    description: 'In this tutorial, we will build a simple decentralized finance (DeFi) application on the Celo blockchain using Python',
    preview: require('./showcase/intermediate/sage-building-a-simple-defi-application-on-the-celo-blockchain-using-python.png'),
    website: 'blog/tutorials/building-a-simple-defi-application-on-the-celo-blockchain-using-python',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },
  {
    title: 'Deploying Smart Contracts on Celo Using Foundry - A Step-by-Step Guide',
    description: 'This comprehensive guide provides a detailed, sequential walkthrough for deploying smart contracts on the Celo blockchain using Foundry.',
    preview: require('./showcase/beginner/deploying-smart-contracts-on-celo-using-foundry-a-step-by-step-guide.png'),
    website: 'blog/tutorials/deploying-smart-contracts-on-celo-using-foundry-a-step-by-step-guide',
    tags: ['celosage', 'beginner', 'smartcontract', 'solidity'], 
  },
  {
    title: 'Building a Solidity Smart Contract for NFT Royalty Fees - A Step-by-Step Guide',
    description: 'Learn to code a self-executing contract on Ethereum blockchain with Solidity language for NFT royalty payments, following our step-by-step guide.',
    preview: require('./showcase/intermediate/building-a-solidity-smart-contract-for-nft-royalty-fees-a-step-by-step-guide.png'),
    website: 'blog/tutorials/building-a-solidity-smart-contract-for-nft-royalty-fees-a-step-by-step-guide',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity','erc721', 'truffle'], 

  },
  {
    title: 'Build Celo DApp without JavaScript Framework',
    description: 'Learn How to Build Celo DApp without JavaScript Framework. With your HTML, CSS and JavaScript skills, you can build Celo DApp with Ease.',
    preview: require('./showcase/intermediate/no-js-framework.png'),
    website: 'blog/tutorials/build-celo-dapp-without-js-framework',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity','javascript'], 
  },
  {
    title: 'Build a complete off chain fullstack web3 app using Laravel Part-1',
    description: 'Learn How to Build an off-chain fullstack web3 app using Laravel.',
    preview: require('./showcase/intermediate/build-a-complete-off-chain-fullstack-web3-app-using-laravel-part-1.png'),
    website: 'blog/tutorials/build-a-complete-off-chain-fullstack-web3-app-using-laravel-part-1',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity','javascript'], 
  },
  {
    title: 'Build a cross-chain token bridge between Celo and BSC from scratch',
    description: 'Bridging tokens between two EVM-compatible blockchains from scratch',
    preview: require('./showcase/intermediate/build-a-cross-chain-token-bridge-between-Celo-and-BSC-from-the-scratch.png'),
    website: 'blog/tutorials/build-a-cross-chain-token-bridge-between-Celo-and-BSC-from-the-scratch',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity', 'tokens'], 
  },
  {
    title: 'Building an NFT game using TDD with Hardhat (Part 1)',
    description: 'Building an NFT game using TDD with Hardhat',
    preview: require('./showcase/intermediate/building-an-NFT-game-using-TDD-with-hardhat-part-1.png'),
    website: 'blog/tutorials/building-an-nft-game-using-TDD-with-hardhat-part-1',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity', 'tokens', "hardhat", "openzeppelin", "randomness", "erc721", "dacade", "nft"], 
  },
  {
    title: 'Integrating Celo into the Process of Web/App Development',
    description: 'The article will focus on the Celo framework that provides users with a seamless online payment method.',
    preview: require('./showcase/intermediate/sage-integrating-celo-into-the-process-of-fintech-web-app-development.png'),
    website: 'blog/tutorials/integrating-celo-into-the-process-of-fintech-web-app-development',
    tags: ['celo', 'celosage', 'intermediate', 'contractkit', 'javascript', 'nodejs'], 
  },
  {
    title: 'School Resources Marketplace Smart Contract on Celo',
    description: ' The School Resources Marketplace smart contract is a decentralized application built on the Celo blockchain using Solidity programming language.',
    preview: require('./showcase/beginner/school-resources-marketplace-smart-contract-on-celo.png'),
    website: 'blog/tutorials/school-resources-marketplace-smart-contract-on-celo',
    tags: ['solidity', 'intermediate', 'celo', 'celosage'],
  },
  {
    title: 'Smart contract security on celo with mythril',
    description: 'Analyze smart contracts using free security tools - Mythril',
    preview: require('./showcase/intermediate/smart-contract-security-on-celo-with-mythril.png'),
    website: 'blog/tutorials/smart-contract-security-on-celo-with-mythril',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },
   {
    title: 'Building Celo DApp with Celocli without JavaScript Framework',
    description: 'Learn How to Build Celo DApp with Celocli without JavaScript Framework. With your HTML, CSS and JavaScript skills, you can build Celo DApp with Ease',
    preview: require('./showcase/intermediate/building-celo-dapp-with-celocli-without-javascript-framework.png'),
    website: 'blog/tutorials/building-celo-dapp-with-celocli-without-javascript-framework',
    tags: ['celosage', 'intermediate', 'smartcontract', 'javascript', 'solidity'], 
  },
  {
    title: "Implementing Multi-factor Authentication on Celo's Blockchain Using Smart Contracts",
    description: 'Learn how to build and deploy a multi factor authentication system on the Celo platform',
    preview: require('./showcase/beginner/implementing-multi-factor-authentication-on-celos-blockchain-using-smart-contracts.png'),
    website: 'blog/tutorials/implementing-multi-factor-authentication-on-celos-blockchain-using-smart-contracts',
    tags: ['celo', 'celosage', 'truffle', 'smartcontract', 'solidity', 'javascript', 'beginner'], 
  },
  {
    title: 'Build a cross-chain token bridge between celo and bsc using the existing bridge',
    description: 'Learn how to build cross-chain dapps using the existing bridge on Celo',
    preview: require('./showcase/intermediate/build-a-cross-chain-token-bridge-between-celo-and-bsc-using-the-existing-bridge.png'),
    website: 'blog/tutorials/build-a-cross-chain-token-bridge-between-celo-and-bsc-using-the-existing-bridge',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },
  {
    title: 'Interacting with smart contract on celo using web3py',
    description: 'This tutorial teaches you how to set up and use Web3py - A python-based web3 library',
    preview: require('./showcase/intermediate/interacting-with-smart-contract-on-celo-using-web3py.png'),
    website: 'blog/tutorials/interacting-with-smart-contract-on-celo-using-web3py',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },
  {
    title: 'Create an NFT with a delayed reveal on Celo',
    description: 'In This tutorial we will look at how to implement a simple NFT Contract that implements an NFT reveal in solidity. We will deploy the contract to the Celo blockchain on remix and show how to perform the reveal on remix',
    preview: require('./showcase/intermediate/create-an-nft-with-a-delayed-reveal-on-celo.png'),
    website: 'blog/tutorials/create-an-nft-with-a-delayed-reveal-on-celo',
    tags: ['celosage', 'intermediate', 'smartcontract', 'nft', 'solidity'], 
  },
  {
    title: 'Build a complete P2P Celo payment dapp with Flutter using Celo Composer',
    description: 'Learn how to build a CELO based p2p payment dApp with Flutter using Celo Composer for bootstrap.',
    preview: require('./showcase/intermediate/build-a-complete-p2p-celo-payment-dapp-with-flutter-using-celo-composer.png'),
    website: 'blog/tutorials/build-a-complete-p2p-celo-payment-dapp-with-flutter-using-celo-composer',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },
  {
    title: 'Using Clones to build and cheaply deploy contracts on CELO at scale',
    description: 'This tutorial introduces the clones (minmal proxy) approach to cheaply deploy contracts on CELO.',
    preview: require('./showcase/advanced/Using-Clones-to-build-and-cheaply-deploy-contracts-on-CELO-at-scale.png'),
    website: 'blog/tutorials/using-clones-to-build-and-cheaply-deploy-contracts-on-celo-at-scale',
    tags: ['celosage', 'advanced', 'smartcontract', 'solidity'], 
  },
  {
    title: 'Building a full stack Celo DApp with NextJS and Web3js',
    description: 'Learn How to Build Celo DApp with NextJS, a JavaScript Framework. You can build Celo DApp with Ease using NextJS',
    preview: require('./showcase/intermediate/building-a-full-stack-celo-dapp-with-nextjs-and-web3js.png'),
    website: 'blog/tutorials/building-a-full-stack-celo-dapp-with-nextjs-and-web3js',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity', 'javascript'], 
  },
  {
    title: 'How Does Blockchain Help Content Creators?',
    description: 'Learn how blockchain technoloty help content creators.',
    preview: require('./showcase/beginner/how-does-blockchain-help-content-creators.png'),
    website: 'blog/tutorials/how-does-blockchain-help-content-creators',
    tags: ['celosage', 'beginner', 'solidity'], 
  },

   {
    title: 'Deploying celo dapp to celo network with web3.py',
    description: 'This article could provide a tutorial on how to use the web3.py deploy celo dapp to celo network with a python library known as web3.py',
    preview: require('./showcase/beginner/deploying-celo-dapp-to-celo-network-with-web3py.png'),
    website: 'blog/tutorials/deploying-celo-dapp-to-celo-network-with-web3py',
    tags: ['celosage', 'beginner', 'dapp', 'celo'], 
  },


  {
    title: 'Analyzing smart contracts security on Celo using Slither',
    description: 'Analyze smart contracts using free security tools - Slither',
    preview: require('./showcase/intermediate/analyzing-smart-contracts-security-on-celo-using-slither.png'),
    website: 'blog/tutorials/analyzing-smart-contracts-security-on-celo-using-slither',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },
   {
    title: 'Building a Chat DApp with Next.js, Web3.js, and BigQuery',
    description: 'Learn How to Leverage Google BigQuery to Analyze Data of your dApp and How to Build One',
    preview: require('./showcase/intermediate/building-a-chat-dapp-with-nextjs-web3js-and-bigquery.png'),
    website: 'blog/tutorials/building-a-chat-dapp-with-nextjs-web3js-and-bigquery',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity', 'javascript'], 
  },
    {
    title: 'Path to Build Full stack DApp on Celo with C++, WebAssembly and ReactJS',
    description: 'Learn How to Full Stack dApp with C++ for the Smart Contract and ReactJS for the Frontend',
    preview: require('./showcase/intermediate/path-to-build-full-stack-dapp-on-celo-with-c++-webassembly-and-reactjs.png'),
    website: 'blog/tutorials/path-to-build-full-stack-dapp-on-celo-with-c++-webassembly-and-reactjs',
    tags: ['celosage', 'intermediate', 'dapp', 'smartcontract', 'react'], 
  },
  {
    title: 'Smart contract security on Celo with Securify',
    description: 'Analyze smart contracts using free securify2',
    preview: require('./showcase/intermediate/smart-contract-security-on-celo-with-securify.png'),
    website: 'blog/tutorials/smart-contract-security-on-celo-with-securify',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },


{

    title: 'Developing a Smart Contract-based Supply Chain Management System on Celo Blockchain using Python',
    description: 'This tutorial explores the use of Python to develop a supply chain management system using smart contracts on the Celo blockchain.',
    preview: require('./showcase/intermediate/sage-developing-a-smart-contract-based-supply-chain-management-system-on-celo-blockchain-using-python.png'),
    website: 'blog/tutorials/developing-a-smart-contract-based-supply-chain-management-system-on-celo-blockchain-using-python',
    tags: ['celosage', 'intermediate', 'smartcontract', 'solidity'], 
  },
  
   {
    title: 'Deploying a Celo Node Using Typescript',
    description: 'This article shows developers how to do deploy a celo node using TypeScript programming language',
    preview: require('./showcase/intermediate/sage-deploying-a-celo-node-using-typescript.png'),
    website: '/blog/tutorials/deploying-a-celo-node-using-typescript',
    tags: ['celo','celosage', 'typescript', 'nodejs', 'intermediate'],
  },




  /*
  Pro Tip: add your site in alphabetical order.
  Appending your site here (at the end) is more likely to produce Git conflicts.
   */
];

export const TagList = Object.keys(Tags) as TagType[];
function sortUsers() {
  let result = Users;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by apps tag, popular first
  result = sortBy(result, (user) => !user.tags.includes("favorite"));
  return result;
}

export const sortedUsers = sortUsers();
2;
