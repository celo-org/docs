/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import { translate } from "@docusaurus/Translate";
import { sortBy } from "@site/src/utils/jsUtils";
import { Users } from "./tutorial-list";

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
