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
  | "apps"
  | "impact"
  | "defi"
  | "earn"
  | "wallets";

export type User = {
  title: string;
  description: string;
  preview: string;
  website: string;
  source: string | null;
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
      message: "Popular Celo dApps for you to check out!",
      id: "showcase.tag.popular.description",
    }),
    color: "#e9669e",
  },

  // For open-source sites, a link to the source code is required
  // The source should be your *website's* source, not your project's source!
  apps: {
    label: translate({ message: "Apps" }),
    description: translate({
      message: "",
      id: "showcase.tag.apps.description",
    }),
    color: "#39ca30",
  },

  impact: {
    label: translate({ message: "Impact" }),
    description: translate({
      message: "",
      id: "showcase.tag.impact.description",
    }),
    color: "#dfd545",
  },

  defi: {
    label: translate({ message: "DeFi" }),
    description: translate({
      message: "",
      id: "showcase.tag.defi.description",
    }),
    color: "#a44fb7",
  },

  earn: {
    label: translate({ message: "Earn" }),
    description: translate({
      message: "",
      id: "showcase.tag.earn.description",
    }),
    color: "#127f82",
  },

  wallets: {
    label: translate({ message: "Wallets" }),
    description: translate({
      message: "",
      id: "showcase.tag.wallets.description",
    }),
    color: "#fe6829",
  },
};

// Add your site to this list
// prettier-ignore
const Users: User[] = [
  {
    title: 'Valora',
    description: 'The crypto wallet with 12% rewards to buy, send, spend, earn, and collect NFTs on the Celo blockchain.',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps', 'wallets', 'popular'],
  },
  {
    title: 'C# mobile App to display Celo NFTs',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Flutter & Celo - Easily build Flutter Mobile dApps',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Composer Series - Build a Crowdfunding ReFi dApp with Celo Composer',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'React Native & Celo - Easily build React Native dApps on Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'How to quickly build an NFT collection on Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Celo Composer - Extend and Customize your Full-Stack Mobile dApps',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'ContractKit - A Practical Guide to Interacting with the Celo Core Contracts',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: '3 Simple Steps to Get Started with Valora on Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Plumo - An Ultralight Blockchain Client on Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'A Boilerplate guide to Airdropping on Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Getting started with DAOs on Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Hardhat and Celo | The Ultimate Guide to Deploy Celo dApps using Hardhat',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Truffle and Celo | The Ultimate Guide to Deploy Celo dApps with Truffle',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: '6 Steps to Quickly Build Smart Contracts on Celo with Remix',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: '3 Simple Steps to Connect your MetaMask Wallet To Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Celo CLI - A Practical Guide to Energize your Celo Toolkit',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Celo Composer - Easily Build Full-Stack Mobile dApps on Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: '17 Smart Contracts Powering the Celo Protocol',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Introduction to Celo Composer',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Celo Spotlight - Building a Financial System that Creates the Conditions for Prosperity — for Everyone.',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Celo Valora + WalletConnect v1',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Use onchain randomness',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'React based DApp',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Deploy an NFT to Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Deploy & Mint a Token',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Deploy and Interact with Contracts (Remotely)',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Deploy a Contract on Celo (local node)',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Sending CELO & Stable Assets',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Using Keystores Library for Local Key Management',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Add Your ERC20 Token to Your Celo Wallet',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Verifying Contracts with Hardhat',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Demos with ObservableHQ',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Using the Graph with Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Code Playground -- Metamask',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Intro to the Code Playground',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Submit a Tutorial',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Celo Development 201 - Build an NFT Minter with Hardhat and React',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Celo Development 101',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'How to mint your own fungible token on Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Deploying smart contracts on Celo with Truffle',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'How to successfully connect to a Celo Wallet with a React Native DApp',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'How to customize an Ethereum smart contract for the Celo network',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Deploy and Interact with Contracts (Remotely)',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'How to use Moola’s money market',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Testing Celo Smart Contracts with Truffle',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Distributed File Manager (DFM) using Celo, IPFS and ReactJS',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Introduction to dApp kit',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Build a Decentralized Autonomous Organization (DAO) on Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'How to re-deploy your Ethereum DApp to Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Create Vault Smart Contract',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Send CELO & cUSD',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Create subgraphs for Celo smart contracts',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Hello Mobile DApp',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Deploy Celo Smart contracts with Remix IDE',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'How to create a ERC1155 NFT in Celo Network with Hardhat',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Celo Crowd Funding Project Tutorial',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'How to create a Loyalty Program using Meta-transactions',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Composer series: Building a decentralized news feed with Celo Composer',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'How to create an upgradeable smart contract in Celo',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Bridging tokens to and from Celo via Wormhole',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Bridging tokens to and from Celo via Wormhole',
    description: 'Tutorial description goes here',
    preview: require('./showcase/valora.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
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
  // Sort by apps tag, appss first
  result = sortBy(result, (user) => !user.tags.includes("apps"));
  return result;
}

export const sortedUsers = sortUsers();
