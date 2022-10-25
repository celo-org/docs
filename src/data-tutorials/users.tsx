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
  | "figment"
  | "dacade"
  | "advanced"
  | "airdrop"
  | "android"
  | "basics"
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
  basics: {
    label: translate({ message: "Basics" }),
    description: translate({
      message: "",
      id: "showcase.tag.basics.description",
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

  // wallets: {
  //   label: translate({ message: "Wallets" }),
  //   description: translate({
  //     message: "",
  //     id: "showcase.tag.wallets.description",
  //   }),
  //   color: "#fe6829",
  // },
};

// Add your site to this list
// prettier-ignore
const Users: User[] = [
  // Paths
  {
    title: '1. Celo Composer',
    description: 'Quickly build and deploy Celo dApps with Celo Composer',
    preview: require('./showcase/1.png'),
    website: '/tutorials?tags=composer',
    tags: ['favorite'],
  },
  {
    title: '2. Celo Basics',
    description: 'Curated list of basic Celo developer tutorials.',
    preview: require('./showcase/6.png'),
    website: '/tutorials?tags=basics',
    tags: ['favorite'],
  },
  {
    title: '3. Intermediate Tutorials',
    description: 'Curated list of intermediate Celo developer tutorials.',
    preview: require('./showcase/4.png'),
    website: '/tutorials?tags=intermediate',
    tags: ['favorite'],
  },
  {
    title: '4. Advanced Tutorials',
    description: 'Curated list of advanced Celo developer tutorials.',
    preview: require('./showcase/5.png'),
    website: '/tutorials?tags=advanced',
    tags: ['favorite'],
  },

  // Posts

  {
    title: 'C# mobile App to display Celo NFTs',
    description: 'Learn how build an Android app with C# and connect to Celo network to retriever NFT metadata and display NFT in the app.',
    preview: require('./showcase/1.png'),
    website: 'https://docs.celo.org/blog/2022/07/15/csharp-mobile-app-to-display-celo-nfts',
    tags: ['advanced','foundation', 'mobile', 'android', 'nft', 'popular'],
  },
  {
    title: 'Flutter & Celo - Easily build Flutter Mobile dApps',
    description: 'Celo Composer now supports Flutter. Quickly develop mobile apps on Celo.',
    preview: require('./showcase/flutter-and-celo-easily-build-flutter-mobile-dapps.png'),
    website: 'blog/tutorials/flutter-celo-easily-build-flutter-mobile-dApps',
    tags: ['intermediate','foundation', 'flutter', 'composer'],
  },
  {
    title: 'Composer Series - Build a Crowdfunding ReFi dApp with Celo Composer',
    description: 'How to quickly create and deploy a full-stack crowdfunding dApp on Celo.',
    preview: require('./showcase/composer-series-build-a-crowdfunding-refi-dapp-with-celo-composer.png'),
    website: 'https://medium.com/celodevelopers/composer-series-build-a-crowdfunding-refi-dapp-with-celo-composer-d1a169f8a78d',
    tags: ['advanced', 'foundation', 'crowdfunding', 'composer'],
  },
  {
    title: 'React Native & Celo - Easily build React Native dApps on Celo',
    description: 'Quickly develop Android and iOS apps on Celo using the Celo Composer for React Native.',
    preview: require('./showcase/react-native-and-celo-easily-build-react-native-dapps-on-celo.png'),
    website: 'blog/tutorials/React-Native-&-Celo-Easily-build-React-Native-dApps-on-Celo',
    tags: ['intermediate','foundation', 'reactnative', 'composer'],
  },
  {
    title: 'How to quickly build an NFT collection on Celo',
    description: 'Create a low-code NFT collection with Celo, IPFS, Pinata, and Remix.',
    preview: require('./showcase/how-to-quickly-build-an-nft-collection-on-celo.png'),
    website: 'blog/tutorials/how-to-quickly-build-an-nft-collection-on-celo',
    tags: ['basics','foundation', 'nft', 'foundation'],
  },
  {
    title: 'Introduction to creating NFTs on Celo',
    description: 'This tutorial will walk through the basic steps required to create an NFT collection (of ERC-721 tokens) on Celo. ',
    preview: require('./showcase/2.png'),
    website: 'https://medium.com/celodevelopers/introduction-to-creating-nfts-on-celo-eb7240a71cc0',
    tags: ['basics','foundation', 'nft', 'erc721'],
  },
  {
    title: 'Building for the Celo Connect Mobile Hackathon',
    description: 'Resources to help you build your mobile-first Celo dApp.',
    preview: require('./showcase/building-for-the-celo-connect-mobile-hackathon.png'),
    website: 'https://medium.com/celodevelopers/building-for-the-celo-connect-mobile-hackathon-a78707b7431c',
    tags: ['foundation'],
  },
  {
    title: 'Celo Composer - Extend and Customize your Full-Stack Mobile dApps',
    description: 'Step-by-step guide to create a new custom dApp using the Celo Composer.',
    preview: require('./showcase/celo-composer-extend-and-customize-your-full-stack-modile-dapps.png'),
    website: 'https://medium.com/celodevelopers/celo-dappstarter-customize-your-full-stack-mobile-dapps-on-celo-232d85b7a2c5',
    tags: ['intermediate','foundation', 'composer'],
  },
  {
    title: 'ContractKit - A Practical Guide to Interacting with the Celo Core Contracts',
    description: 'How to access the Celo Blockchain with JavaScript using ContractKit.',
    preview: require('./showcase/contractkit-a-practical-guide-to-interacting-with-the-celo-core-contracts.png'),
    website: 'blog/tutorials/contractkit-a-practical-guide-to-interacting-with-the-celo-core-contracts',
    tags: ['intermediate','foundation', 'contractkit'],
  },
  {
    title: '3 Simple Steps to Get Started with Valora on Celo',
    description: 'Send, pay, and spend cryptocurrency like everyday money — all from the palm of your hand.',
    preview: require('./showcase/3-simple-steps-to-get-started-with-valora-on-celo.png'),
    website: 'blog/tutorials/3-simple-steps-to-get-started-with-valora-on-celo',
    tags: ['basics','foundation', 'valora'],
  },
  {
    title: 'Plumo - An Ultralight Blockchain Client on Celo',
    description: 'How the Celo light client became 1.7 million times lighter than Ethereum.',
    preview: require('./showcase/plumo-an-ultralight-blockchain-client-on-celo.png'),
    website: 'blog/tutorials/plumo-an-ultralight-blockchain-client-on-celo',
    tags: ['basics', 'foundation', 'nft'],
  },
  {
    title: 'A Boilerplate guide to Airdropping on Celo',
    description: 'Deploy an Airdrop contract to Celo and claim ERC20 tokens using the web3 SDK.',
    preview: require('./showcase/a-boilerplate-guide-to-airdropping-on-celo.png'),
    website: 'blog/tutorials/a-boilerplate-guide-to-airdropping-on-celo',
    tags: ['intermediate','foundation', 'airdrop'],
  },
  {
    title: 'Getting started with DAOs on Celo',
    description: 'Introduction to DAOs and the advantages of building a DAO on Celo.',
    preview: require('./showcase/getting-started-with-daos-on-celo.png'),
    website: 'blog/tutorials/getting-started-with-daos-on-celo',
    tags: ['basics','foundation', 'dao'],
  },
  {
    title: 'Hardhat and Celo | The Ultimate Guide to Deploy Celo dApps using Hardhat',
    description: 'How to deploy a smart contract to Celo testnet, mainnet, or a local network using Hardhat.',
    preview: require('./showcase/hardhat-and-celo-the-ultimate-guide-to-deploy-celo-dapps-using-hardhat.png'),
    website: 'blog/tutorials/hardhat-and-celo-the-ultimate-guide-to-deploy-celo-dapps-using-hardhat',
    tags: ['basics','foundation', 'hardhat'],
  },
  {
    title: 'Truffle and Celo | The Ultimate Guide to Deploy Celo dApps with Truffle',
    description: 'How to deploy a smart contract to Celo testnet, mainnet, or a local blockchain using Truffle.',
    preview: require('./showcase/truffle-and-celo-the-ultimate-guide-to-deploy-celo-dapps-using-truffle.png'),
    website: 'blog/tutorials/truffle-and-celo-the-ultimate-guide-to-deploy-celo-dapps-with-truffle',
    tags: ['basics','foundation', 'truffle'],
  },
  {
    title: '6 Steps to Quickly Build Smart Contracts on Celo with Remix',
    description: 'How to create, deploy and interact with smart contracts on Celo testnet or mainnet using Remix.',
    preview: require('./showcase/6-steps-to-quickly-build-smart-contracts-on-celo-with-remix.png'),
    website: 'blog/tutorials/6-steps-to-quickly-build-smart-contracts-on-celo-with-remix',
    tags: ['basics','foundation', 'remix'],
  },
  {
    title: '3 Simple Steps to Connect your MetaMask Wallet To Celo',
    description: 'A step-by-step tutorial to add the Celo network to your MetaMask wallet.',
    preview: require('./showcase/3-simple-steps-to-connect-your-metamask-wallet-to-celo.png'),
    website: 'blog/tutorials/3-simple-steps-to-connect-your-metamask-wallet-to-celo',
    tags: ['basics','foundation', 'metamask'],
  },
  {
    title: 'Celo CLI - A Practical Guide to Energize your Celo Toolkit',
    description: 'Explore the Celo blockchain using a command-line interface.',
    preview: require('./showcase/celo-cli-a-practical-guide-to-energize-your-celo-toolkit.png'),
    website: 'https://medium.com/celodevelopers/celo-cli-a-practical-guide-to-energize-your-celo-toolkit-9253067fff3a',
    tags: ['basics','foundation', 'cli'],
  },
  {
    title: 'Celo Composer - Easily Build Full-Stack Mobile dApps on Celo',
    description: 'Quickly develop full-stack progressive web applications on Celo with the Celo Composer.',
    preview: require('./showcase/celo-composer-easily-build-full-stack-modile-dapps-on-celo.png'),
    website: 'blog/tutorials/easily-build-full-stack-mobile-dapps-on-celo',
    tags: ['basics','foundation', 'composer'],
  },
  {
    title: '17 Smart Contracts Powering the Celo Protocol',
    description: 'Making sense of the logic driving the Celo platform.',
    preview: require('./showcase/17-smart-contracts-powering-the-celo-protocol.png'),
    website: 'blog/tutorials/17-smart-contracts-powering-the-celo-protocol',
    tags: ['basics','foundation', 'metamask'],
  },
  {
    title: 'Introduction to Celo Composer',
    description: 'Quickly develop full-stack progressive web applications on the Celo blockchain.',
    preview: require('./showcase/3.png'),
    website: 'https://docs.celo.org/blog/2022/02/21/introduction-to-celo-progressive-dappstarter',
    tags: ['basics','foundation', 'react', 'materialui', 'dappstarter', 'progressive'],
  },
  {
    title: 'Celo Spotlight - Building a Financial System that Creates the Conditions for Prosperity — for Everyone.',
    description: 'Everything you need to get started with Celo.',
    preview: require('./showcase/celo-spotlight.png'),
    website: 'blog/tutorials/celo-spotlight',
    tags: ['basics','foundation', 'celo', 'basics'],
  }, 
  {
    title: 'Celo Valora + WalletConnect v1',
    description: 'How to use WalletConnect version 1 in a DApp to connect to Valora.',
    preview: require('./showcase/4.png'),
    website: 'blog/tutorials/celo-valora-and-walletconnect-v1',
    tags: ['intermediate','foundation', 'react', 'valora', 'walletconnect'],
  },
  {
    title: 'Use onchain randomness',
    description: 'Onchain randomness is used for selecting validators to perform phone number verification. Read more about how onchain randomness is produced at the provided page.',
    preview: require('./showcase/5.png'),
    website: 'https://docs.celo.org/blog/2022/01/07/on-chain-randomness',
    tags: ['intermediate','foundation', 'solidity', 'randomness', 'oracle'],
  },
  {
    title: 'React based DApp',
    description: 'The basics of developing a decentralised application (DApp) on Celo.',
    preview: require('./showcase/6.png'),
    website: 'https://docs.celo.org/blog/developer-guide/start/web-dapp',
    tags: ['intermediate','foundation', 'dapp', 'react', 'nextjs', 'usecontractkit', 'sdk'],
  },
  {
    title: 'Deploy an NFT to Celo',
    description: 'How to deploy ERC721 tokens (NFTs) on the Celo network using autogenerated code.',
    preview: require('./showcase/7.png'),
    website: 'https://docs.celo.org/blog/2022/01/05/no-code-erc721',
    tags: ['basics','foundation', 'tokens', 'erc721', 'mint', 'nft', 'ipfs', 'pinata', 'solidity', 'remix'],
  },
  {
    title: 'Deploy & Mint a Token',
    description: 'How to deploy a token contract that use the ERC20 token standard to Celo without writing code.',
    preview: require('./showcase/8.png'),
    website: 'https://docs.celo.org/blog/2022/01/04/no-code-erc20',
    tags: ['basics','foundation', 'tokens', 'ERC20', 'mint', 'solidity', 'openzeppelin', 'remix'],
  },
  {
    title: 'Deploy and Interact with Contracts (Remotely)',
    description: 'How to deploy and interact your own smart contracts using a remote node.',
    preview: require('./showcase/1.png'),
    website: 'https://docs.celo.org/blog/developer-guide/start/hello-contract-remote-node',
    tags: ['intermediate','foundation', 'smartcontract', 'remote', 'deploy'],
  },
  {
    title: 'Deploy a Contract on Celo (local node)',
    description: 'How to deploy your own smart contracts onto a Celo local node.',
    preview: require('./showcase/2.png'),
    website: 'https://docs.celo.org/blog/developer-guide/start/hellocontracts',
    tags: ['intermediate','foundation', 'smartcontract'],
  },
  {
    title: 'Sending CELO & Stable Assets',
    description: 'How to connect to the Celo test network and tranfer tokens using ContractKit.',
    preview: require('./showcase/3.png'),
    website: 'https://docs.celo.org/blog/developer-guide/start/hellocelo',
    tags: ['intermediate','foundation', 'tokens', 'celowallet', 'contractkit', 'sdk', 'ledger'],
  },
  {
    title: 'Using Keystores Library for Local Key Management',
    description: 'Introduction to the keystores library and how to use it for local key management.',
    preview: require('./showcase/4.png'),
    website: 'https://docs.celo.org/blog/developer-guide/start/using-js-keystores',
    tags: ['advanced','foundation', 'keystores'],
  },
  {
    title: 'Add Your ERC20 Token to Your Celo Wallet',
    description: 'Open up Cello Wallet and make sure you can see “Account Balance Details” then select “Add a new currency/token.',
    preview: require('./showcase/5.png'),
    website: 'https://docs.celo.org/blog/add-token-celo-wallet',
    tags: ['basics','foundation', 'tokens', 'celowallet'],
  },
  {
    title: 'Run a Celo full node in a Virtual Machine',
    description: 'Learn how to setup & run a Celo full node in a Virtual Machine.',
    preview: require('./showcase/6.png'),
    website: 'https://learn.figment.io/tutorials/how-to-run-a-celo-full-node-in-a-virtual-machine',
    tags: ['figment', 'intermediate', 'nodejs'],
  },
  {
    title: 'Verifying Contracts with Hardhat',
    description: 'Hardhat is one of the most popular developer tools for writing contracts for EVM compatible blockchains.',
    preview: require('./showcase/7.png'),
    website: 'https://docs.celo.org/blog/hardhat-deploy-verify',
    tags: ['intermediate','foundation', 'hardhat', 'sourcify', 'verification'],
  },
  {
    title: 'Demos with ObservableHQ',
    description: 'Observable HQ is a Javascript notebook tool that makes it easy to share executable Javascript code right in the browser.',
    preview: require('./showcase/4.png'),
    website: 'https://docs.celo.org/blog/observable-intro',
    tags: ['intermediate','foundation', 'observable'],
  },
  {
    title: 'Using the Graph with Celo',
    description: 'The Graph protocol makes it easy to get historical blockchain data.',
    preview: require('./showcase/1.png'),
    website: 'https://docs.celo.org/blog/using-the-graph',
    tags: ['intermediate','foundation', 'graph', 'dapp'],
  },
  {
    title: 'Code Playground -- Metamask',
    description: 'Connect to Metamask, switch networks, add tokens to the Metamask asset list and send them to other accounts.',
    preview: require('./showcase/2.png'),
    website: 'https://docs.celo.org/blog/code-metamask',
    tags: ['basics','foundation', 'codeplayground'],
  },
  {
    title: 'Intro to the Code Playground',
    description: 'This post provides an introduction to the live code editor that is included as a feature in this blog.',
    preview: require('./showcase/3.png'),
    website: 'https://docs.celo.org/blog/code-playground',
    tags: ['basics','foundation', 'codeplayground'],
  },
  {
    title: 'Submit a Tutorial',
    description: "Celo is an open source project and without community contributions from people like you Celo wouldn't exist. We welcome contributions to our codebase, documentation, translations and blog.",
    preview: require('./showcase/4.png'),
    website: 'https://docs.celo.org/blog/blog-contributions',
    tags: ['foundation', 'contribute'],
  },
  {
    title: 'Celo Development 201 - Build an NFT Minter with Hardhat and React',
    description: 'Throughout this intermediate course you are going to learn about NFTs, contract development with Hardhat and how to build a React frontend with use-contractkit.',
    preview: require('./showcase/5.png'),
    website: 'https://dacade.org/communities/celo/courses/celo-201',
    tags: ['intermediate','dacade', 'smartcontract', 'html', 'javascript', 'nft', 'hardhat'],
  },
  {
    title: 'Celo Development 101',
    description: 'Learn smart contract development and build a Dapp on Celo.',
    preview: require('./showcase/6.png'),
    website: 'https://dacade.org/communities/celo/courses/celo-development-101',
    tags: ['basics','dacade', 'smartcontract', 'html', 'javascript'],
  },
  {
    title: 'Celo Blockchain 101',
    description: 'In this course, you will learn the most important blockchain concepts that you will need to navigate the Celo ecosystem.',
    preview: require('./showcase/7.png'),
    website: 'https://dacade.org/communities/celo/courses/celo-bc-101',
    tags: ['basics','dacade', 'smartcontract', 'html', 'javascript'],
  },
  {
    title: 'How to mint your own fungible token on Celo',
    description: 'How to create fungible tokens on Celo using the Remix IDE.',
    preview: require('./showcase/8.png'),
    website: 'https://learn.figment.io/tutorials/celo-erc20-token-on-remix',
    tags: ['basics','figment', 'basics', 'solidity', 'metamask', 'remix'],
  },
  {
    title: 'Deploying smart contracts on Celo with Truffle',
    description: 'We will learn how to use Truffle and ContractKit to deploy smart contracts to Celo.',
    preview: require('./showcase/1.png'),
    website: 'https://learn.figment.io/tutorials/deploying-smart-contracts-on-celo-with-truffle',
    tags: ['basics','figment', 'basics', 'solidity', 'metamask', 'remix'],
  },
  {
    title: 'How to successfully connect to a Celo Wallet with a React Native DApp',
    description: 'Learn how to successfully set up a Celo Wallet with a React Native DApp using Redux.',
    preview: require('./showcase/2.png'),
    website: 'https://learn.figment.io/tutorials/how-to-successfully-connect-to-a-celo-wallet-with-a-react-native-dapp',
    tags: ['figment', 'intermediate', 'reactnative', 'nodejs'],
  },
  {
    title: 'How to customize an Ethereum smart contract for the Celo network',
    description: 'Learn how to convert & customize an existing Ethereum Smart Contract for Celo network',
    preview: require('./showcase/3.png'),
    website: 'https://learn.figment.io/tutorials/celo-contract-from-ethereum',
    tags: ['figment', 'intermediate', 'nodejs', 'smartcontract', 'truffle'],
  },
  {
    title: 'How to use Moola’s money market',
    description: 'This tutorial is a part of DeFi series where people can learn how to participate in DeFi on the Celo Blockchain.',
    preview: require('./showcase/4.png'),
    website: 'https://learn.figment.io/tutorials/moola-market',
    tags: ['figment', 'basics'],
  },
  {
    title: 'Testing Celo Smart Contracts with Truffle',
    description: 'We will learn how to use Truffle in order to test smart contracts on Celo.',
    preview: require('./showcase/5.png'),
    website: 'https://learn.figment.io/tutorials/celo-testing-truffle',
    tags: ['figment', 'intermediate', 'nodejs', 'smartcontract', 'truffle', 'javascript'],
  },
  {
    title: 'Distributed File Manager (DFM) using Celo, IPFS and ReactJS',
    description: 'Learn how to make a Distributed File Manager using the IPFS protocol for storing files on the Celo network',
    preview: require('./showcase/6.png'),
    website: 'https://learn.figment.io/tutorials/distributed-file-manager-using-ipfs-celo-reactjs',
    tags: ['figment','advanced'],
  },
  {
    title: 'Introduction to dApp kit',
    description: 'In this tutorial we are going to make counter dapp with expo (react native).',
    preview: require('./showcase/7.png'),
    website: 'https://learn.figment.io/tutorials/introduction-to-dappkit',
    tags: ['figment', 'intermediate', 'reactnative', 'nodejs', 'truffle'],
  },
  {
    title: 'Build a Decentralized Autonomous Organization (DAO) on Celo',
    description: 'Build a functioning DAO by writing the Solidity smart contract and building a React Native dApp',
    preview: require('./showcase/8.png'),
    website: 'https://learn.figment.io/tutorials/build-a-dao-on-celo',
    tags: ['figment', 'advanced'],
  },
  {
    title: 'How to re-deploy your Ethereum DApp to Celo',
    description: 'Learn how to re-deploy Ethereum Dapps on the Celo network.',
    preview: require('./showcase/1.png'),
    website: 'https://learn.figment.io/tutorials/redeploy-ethereum-dapps-on-celo',
    tags: ['figment', 'basics', 'truffle', 'javascript', 'cli'],
  },
  {
    title: 'Create Vault Smart Contract',
    description: 'Learn how to create, deploy, and interact with Vault Smart Contract on the Celo Ecosystem',
    preview: require('./showcase/2.png'),
    website: 'https://learn.figment.io/tutorials/create-vault-smart-contract',
    tags: ['figment', 'advanced', 'react', 'nodejs', 'smartcontract', 'truffle'],
  },
  {
    title: 'Send CELO & cUSD',
    description: 'Learn how to connect to the Celo test network and transfer tokens using ContractKit',
    preview: require('./showcase/3.png'),
    website: 'https://learn.figment.io/tutorials/send-celo-and-cusd',
    tags: ['figment', 'cusd', 'celo', 'intermediate'],
  },
  {
    title: 'Create subgraphs for Celo smart contracts',
    description: 'Learn how to integrate The Graph with CELO',
    preview: require('./showcase/4.png'),
    website: 'https://learn.figment.io/tutorials/celo-subgraphs',
    tags: ['figment', 'subgraphs', 'intermediate'],
  },
  {
    title: 'Hello Mobile DApp',
    description: 'Learn how to create a simple mobile DApp using dAppKit and the React Native Expo framework',
    preview: require('./showcase/5.png'),
    website: 'https://learn.figment.io/tutorials/hello-mobile-dapp',
    tags: ['figment', 'mobile', 'basics'],
  },
  {
    title: 'Deploy Celo Smart contracts with Remix IDE',
    description: 'Learn how to use Remix IDE for deploying Celo smart contracts',
    preview: require('./showcase/6.png'),
    website: 'https://learn.figment.io/tutorials/celo-for-remix',
    tags: ['foundation', 'remix', 'basics'],
  },
  {
    title: 'How to create a ERC1155 NFT in Celo Network with Hardhat',
    description: 'Learn how to write a smart contract using the Solidity language and a contract from the Openzeppelin library for ERC1155 tokens.',
    preview: require('./showcase/7.png'),
    website: 'https://learn.figment.io/tutorials/celo-hardhat-deploy-and-nft-app',
    tags: ['figment', 'erc1155', 'nft', 'hardhat', 'intermediate'],
  },
  {
    title: 'Celo Crowd Funding Project Tutorial',
    description: 'Learn how to create a Smart Contract which facilitates crowdfunding.',
    preview: require('./showcase/8.png'),
    website: 'https://learn.figment.io/tutorials/celo-crowd-funding-project',
    tags: ['figment', 'advanced', 'smartcontract', 'truffle', 'solidity'],
  },
  {
    title: 'How to create a Loyalty Program using Meta-transactions',
    description: 'What if users could get rewarded for transactions and not pay gas? This tutorial will show you how!',
    preview: require('./showcase/creating-loyalty-programs-using-meta-transactions.png'),
    website: '/blog/2022/07/27/how-to-create-a-loyalty-program-using-meta-transactions',
    tags: ['foundation', 'advanced'],
  },
  {
    title: 'Composer series: Building a decentralized news feed with Celo Composer',
    description: 'Build a decentralized news feed using React, Tailwind, IPFS, and Celo Composer.',
    preview: require('./showcase/composer-series-building-a-decentralized-newsfeed-with-celo-composer.png'),
    website: 'blog/tutorials/building-a-decentralized-newsfeed-with-celo-composer',
    tags: ['foundation', 'composer', 'advanced'],
  },
  {
    title: 'How to create an upgradeable smart contract in Celo',
    description: 'Everything you need to know about upgradable smart contracts.',
    preview: require('./showcase/how-to-create-an-upgradable-smart-contract-in-celo.png'),
    website: 'blog/tutorials/how-to-create-an-upgradeable-smart-contract-in-celo',
    tags: ['foundation', 'flutter', 'composer', 'advanced'],
  },
  {
    title: 'Bridging tokens to and from Celo via Wormhole',
    description: 'Wormhole has enabled the Celo chain.',
    preview: require('./showcase/bridging-tokens-to-and-from-celo-via-wormhole.png'),
    website: 'blog/tutorials/bridging-token-to-and-from-celo-via-wormhole',
    tags: ['foundation', 'advanced'],
  },
  {
    title: '9 Sustainable DeFi Projects Built on Celo',
    description: 'Creating the world’s first carbon-neutral blockchain was just the beginning.',
    preview: require('./showcase/9-sustainable-defi-projects-built-on-celo.png'),
    website: 'blog/tutorials/9-sustainable-defi-projects-built-on-celo',
    tags: ['foundation', 'basics'],
  },

  // Videos

  {
    title: 'Panel Talk: Empowering Social Impact Through Web3',
    description: 'Join Nestor as he discusses social impact through Web3.',
    preview: require('./showcase/1.png'),
    website: 'https://www.youtube.com/watch?v=ZQUYGEI3yHQ',
    tags: ['video'],
  },
  {
    title: 'Tech Talk: Utilizing the ReFi Stack Thesis to Propel Web3 Project Idea Generation',
    description: 'Join Nirvaan from Climate Collective, and Nestor from Celo Foundation DevRel as they discuss the ReFi stack thesis to propel web3 project ideas.',
    preview: require('./showcase/2.png'),
    website: 'https://www.youtube.com/watch?v=J7jyoDUIx3E&t=529s',
    tags: ['video'],
  },
  {
    title: 'Workshop: Introduction to Solidity and Remix',
    description: 'Join Harpal Jadeja (Twitter: @HarpalJadeja11) for a discussion with Viraz Malhotra from GoodGhosting (Twitter: @Viraz04). You will learn how to get started with Solidity and Remix online IDE.',
    preview: require('./showcase/3.png'),
    website: 'https://www.youtube.com/watch?v=jr_P-26SdbE&t=656s',
    tags: ['video'],
  },
  {
    title: 'Workshop: Build a frontend for your smart contracts using react-celo',
    description: 'Join Nestor Bonilla (Twitter: @0xNestor) and Aaron Deruvo for this workshop! You will learn to utilize react-celo as a resource for frontend development by dissecting react-celo into a development approach for various javascript frameworks.',
    preview: require('./showcase/4.png'),
    website: 'https://www.youtube.com/watch?v=3BT0sjXW1Uw',
    tags: ['video'],
  },
  {
    title: 'Workshop: Introduction to Hardhat',
    description: 'Join Harpal Jadeja (Twitter: @HarpalJadeja11) and learn how to utilize Hardhat to deploy and test your smart contracts.',
    preview: require('./showcase/5.png'),
    website: 'https://www.youtube.com/watch?v=W7nGdHKcIFw&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=6',
    tags: ['video'],
  },
  {
    title: 'Workshop: Build a DeFi staking dApp on Celo using Solidity',
    description: 'Join Ernest Nnmadi (Twitter: @ErnestElijah) for this workshop! You will learn how to build a DeFi stacking dApp on Celo.',
    preview: require('./showcase/6.png'),
    website: 'https://www.youtube.com/watch?v=ke5OPItFaOQ&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=7',
    tags: ['video'],
  },
  {
    title: 'Tech Talk: Smart Contract Security and Auditing',
    description: 'Join Ryon Shamloo for this Tech Talk! He will discuss best security practices and known vulnerabilities.',
    preview: require('./showcase/7.png'),
    website: 'https://www.youtube.com/watch?v=CxIzZmG2bBI&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=8',
    tags: ['video'],
  },
  {
    title: 'Workshop: Integrating Programmable Carbon with Toucan',
    description: 'Join Harpal Jadeja (Twitter: @HarpalJadeja11)  and Alex Lazar for this workshop! You will learn about Toucan and how you can integrate their offerings into your hackathon project.',
    preview: require('./showcase/8.png'),
    website: 'https://www.youtube.com/watch?v=Y0-hzz_QbKg&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=9',
    tags: ['video'],
  },
  {
    title: 'Tech talk: stCelo',
    description: 'Join Harpal Jadeja (Twitter: @HarpalJadeja11)  and Mathieu for this workshop! You will learn about stCelo and how you can integrate their offerings into your hackathon project.',
    preview: require('./showcase/1.png'),
    website: 'https://www.youtube.com/watch?v=0PL31bwzdKA&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=10',
    tags: ['video'],
  },
  {
    title: 'Workshop: Token gating content using Unlock Protocol',
    description: 'Join Harpal Jadeja (Twitter: @HarpalJadeja11)  and Angela Steffens for this workshop!',
    preview: require('./showcase/2.png'),
    website: 'https://www.youtube.com/watch?v=B2O6FcgvXAI&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=12',
    tags: ['video'],
  },
  {
    title: 'Tech Talk: Smart Contract Security 201',
    description: 'Ryon Shamloo takes you through part two of his best security practices talk!',
    preview: require('./showcase/3.png'),
    website: 'https://www.youtube.com/watch?v=HIEcAXshU8U&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=13',
    tags: ['video'],
  },
  {
    title: 'Workshop: Building an exchange on Celo',
    description: 'Use Celo composer and Fiat-connect to build an exchange, Part I',
    preview: require('./showcase/4.png'),
    website: 'https://www.youtube.com/watch?v=O6DjaYFGLmE&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=15',
    tags: ['video'],
  },
  {
    title: 'Workshop: Building an exchange on Celo, Part II',
    description: 'Use Celo composer and Fiat-connect to build an exchange, Part II',
    preview: require('./showcase/5.png'),
    website: 'https://www.youtube.com/watch?v=xxLWRUmAKvs&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=16',
    tags: ['video'],
  },
  {
    title: 'Introduction to Valora',
    description: 'Join this workshop for an introduction to Valora',
    preview: require('./showcase/6.png'),
    website: 'https://www.youtube.com/watch?v=foamzu62nZk&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=18',
    tags: ['video'],
  },
  {
    title: 'Workshop: Building an NFT collection on Celo using Celo composer',
    description: 'Join Ewerton Lopes Pereira to build an NFT collection on Celo',
    preview: require('./showcase/7.png'),
    website: 'https://www.youtube.com/watch?v=hf5gTAQ8G10&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=19',
    tags: ['video'],
  },
  {
    title: 'Introduction to Mento',
    description: 'Join Nestor Bonilla for an introduction to the Mento protocol',
    preview: require('./showcase/8.png'),
    website: 'https://www.youtube.com/watch?v=hf5gTAQ8G10&list=PLsQbsop73cfH5QYX9Olfw1fwu0rz3Slyj&index=19',
    tags: ['video'],
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
