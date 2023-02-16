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
  | "developers"
  | "integrations"
  | "validators";

export type User = {
  title: string;
  description: string;
  preview: string;
  website: string;
  source?: string | null;
  tags: TagType[];
};

// LIST OF AVAILABLE TAGS
// Available tags to assign to your site
// Please choose all tags that you think might apply.
// We'll remove inappropriate tags, but it's less likely that we add tags.
export const Tags: { [type in TagType]: Tag } = {
  // DO NOT USE THIS TAG: we choose sites to add to appss
  popular: {
    label: translate({ message: "Favorite" }),
    description: translate({
      message: "",
      id: "showcase.tag.popular.description",
    }),
    color: "#e9669e",
  },
  favorite: {
    label: translate({ message: "Favorite" }),
    description: translate({
      message: "",
      id: "showcase.tag.favorite.description",
    }),
    color: "#35D07F",
  },
  developers: {
    label: translate({ message: "Developers" }),
    description: translate({
      message: "",
      id: "showcase.tag.developers.description",
    }),
    color: "#35D07F",
  },
  integrations: {
    label: translate({ message: "Integrations" }),
    description: translate({
      message: "",
      id: "showcase.tag.integrations.description",
    }),
    color: "#35D07F",
  },
  validators: {
    label: translate({ message: "Validators" }),
    description: translate({
      message: "",
      id: "showcase.tag.validators.description",
    }),
    color: "#35D07F",
  },
};

// Add your site to this list
// prettier-ignore
const Users: User[] = [

  // Get Started with Celo
  {
    title: ' Choose a Wallet',
    description: 'Connect to Celo and manage your funds with a wallet.',
    preview: require('./showcase/favorites/wallets.webp'),
    website: '/wallet',
    tags: ['favorite'],
  },
  {
    title: ' Use a DApp',
    description: 'Find and use decentralized applications on the Celo Network.',
    preview: require('./showcase/favorites/dapps.webp'),
    website: '/showcase',
    tags: ['favorite'],
  },
  {
    title: 'Explore Tutorials',
    description: 'Learn more about Celo from our curated list of community tutorials.',
    preview: require('./showcase/favorites/tutorials.webp'),
    website: '/tutorials',
    tags: ['favorite'],
  },
  {
    title: ' Basic Concepts',
    description: "Get started with the basics of the Celo platform.",
    preview: require('./showcase/favorites/basic-concepts.webp'),
    website: '/general',
    tags: ['favorite'],
  },

  // Developers
  {
    title: ' Build a DApp',
    description: 'Build and deploy decentralized applications on Celo.',
    preview: require('./showcase/developers/build-with-celo.webp'),
    website: '/developer/deploy',
    tags: ['developers'],
  },
  {
    title: ' Setup Environment',
    description: 'Get started with Celo by setting up your developer environment.',
    preview: require('./showcase/developers/setup-environment.webp'),
    website: '/developer/setup/overview',
    tags: ['developers'],
  },
  {
    title: 'Libraries & SDKs',
    description: 'Extend your Celo DApps with Celo libraries and SDKs.',
    preview: require('./showcase/developers/libraries-and-sdks.webp'),
    website: '../developer/sdks/celo-sdks',
    tags: ['developers'],
  },
  {
    title: 'CLI',
    description: 'Interact with the Celo protocol using a command line interface.',
    preview: require('./showcase/developers/cli.webp'),
    website: '/cli',
    tags: ['developers'],
  },

    // Validators
    {
      title: 'Run a Validator',
      description: 'How to get a Validator node running on the Celo Mainnet.',
      preview: require('./showcase/validators/run-a-validator.webp'),
      website: '/validator/run/mainnet',
      tags: ['validators'],
    },
    {
      title: 'Nodes and Services',
      description: 'Connect to nodes and services in the Celo Ecosystem.',
      preview: require('./showcase/validators/nodes-and-services.webp'),
      website: '/network/node/overview',
      tags: ['validators'],
    },
    {
      title: 'Validator Tools',
      description: 'Recommendations for running secure Celo nodes and services.',
      preview: require('./showcase/validators/validator-tools.webp'),
      website: '/validator/security',
      tags: ['validators'],
    },
    {
      title: 'Voting Policy',
      description: 'How the Celo Foundation allocates its votes to validator groups.',
      preview: require('./showcase/validators/voting-policy.webp'),
      website: '/validator/celo-foundation-voting-policy',
      tags: ['validators'],
    },

  // Integrations
  {
    title: 'Run a Full Node',
    description: 'Set up and run your own node on the Celo Network.',
    preview: require('./showcase/integrations/run-a-full-node.webp'),
    website: '/network/node/run-mainnet',
    tags: ['integrations'],
  },
  {
    title: 'Deploy Smart Contracts',
    description: 'How to deploy smart contracts on the Celo network.',
    preview: require('./showcase/integrations/deploy-smart-contracts.webp'),
    website: '/developer/deploy',
    tags: ['integrations'],
  },
  {
    title: 'Network Details',
    description: 'Overview of Celo Mainnet, Alfajores Testnet, and Baklava Testnet.',
    preview: require('./showcase/integrations/network-details.webp'),
    website: '/network',
    tags: ['integrations'],
  },
  {
    title: 'Integration Checklist',
    description: 'Checklist for applications building and integrating on Celo.',
    preview: require('./showcase/integrations/integration-checklist.webp'),
    website: '/integration/checklist',
    tags: ['integrations'],
  },
  {
    title: 'Bridges',
    description: 'Bridge assets from other chains to and from Celo.',
    preview: require('./showcase/integrations/bridges.webp'),
    website: '/protocol/bridge',
    tags: ['integrations'],
  },
  {
    title: 'Oracles',
    description: 'Connect Celo to outside sources with an oracle.',
    preview: require('./showcase/integrations/oracles.webp'),
    website: '/protocol/oracle',
    tags: ['integrations'],
  },
  {
    title: 'Listings',
    description: 'Support for digital asset exchanges or ranking sites.',
    preview: require('./showcase/integrations/listings.webp'),
    website: '/integration/listings',
    tags: ['integrations'],
  },
  {
    title: 'Contract Addresses',
    description: 'Core contract address proxies and implementations for the Celo network.',
    preview: require('./showcase/integrations/contract-addresses.webp'),
    website: '/contract-addresses',
    tags: ['integrations'],
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
