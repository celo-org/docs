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
    title: ' Developers',
    description: 'Build, deploy, and manage applications on the Celo blockchain.',
    preview: require('./showcase/favorites/developers.png'),
    website: '/developer',
    tags: ['favorite'],
  },
  {
    title: ' Validators',
    description: 'Secure the network by staking Celo and operating a node to validate on Celo.',
    preview: require('./showcase/favorites/validators.png'),
    website: '/validator',
    tags: ['favorite'],
  },
  {
    title: ' Integrations',
    description: 'Integrate an application, tool, wallet, and oracle with Celo.',
    preview: require('./showcase/favorites/integrations.png'),
    website: '/integration',
    tags: ['favorite'],
  },
  {
    title: 'Tutorials',
    description: 'Learn Celo using our curated list of community tutorials.',
    preview: require('./showcase/favorites/tutorials.png'),
    website: '/tutorials',
    tags: ['favorite'],
  },

  // Developers
  {
    title: 'Celo Composer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preview: require('./showcase/developers/celo-composer.png'),
    website: 'https://github.com/celo-org/celo-composer',
    tags: ['developers'],
  },
  {
    title: 'Setup Environment',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preview: require('./showcase/developers/setup-environment.png'),
    website: '/developer/setup/overview',
    tags: ['developers'],
  },
  {
    title: 'Deploy on Celo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preview: require('./showcase/developers/deploy-on-celo.png'),
    website: '/developer/deploy',
    tags: ['developers'],
  },
  {
    title: 'Native SDKs',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preview: require('./showcase/developers/native-sdks.png'),
    website: '../developer/sdks/celo-sdks',
    tags: ['developers'],
  },

    // Validators
    {
      title: 'Run a Validator',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      preview: require('./showcase/validators/run-a-validator.png'),
      website: '/validator/run/mainnet',
      tags: ['validators'],
    },
    {
      title: 'Nodes and Services',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      preview: require('./showcase/validators/nodes-and-services.png'),
      website: '/network/node/forno',
      tags: ['validators'],
    },
    {
      title: 'Validator Tools',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      preview: require('./showcase/validators/validator-tools.png'),
      website: '/validator/security',
      tags: ['validators'],
    },
    {
      title: 'Voting Policy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      preview: require('./showcase/validators/voting-policy.png'),
      website: '/validator/celo-foundation-voting-policy',
      tags: ['validators'],
    },

  // Integrations
  {
    title: 'Run a Full Node',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preview: require('./showcase/integrations/run-a-full-node.png'),
    website: '/network/node/run-mainnet',
    tags: ['integrations'],
  },
  {
    title: 'Deploy Smart Contracts',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preview: require('./showcase/integrations/deploy-smart-contracts.png'),
    website: '/developer/deploy',
    tags: ['integrations'],
  },
  {
    title: 'Network Details',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preview: require('./showcase/integrations/network-details.png'),
    website: '/network',
    tags: ['integrations'],
  },
  {
    title: 'Integration Checklist',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preview: require('./showcase/integrations/integration-checklist.png'),
    website: '/integration/checklist',
    tags: ['integrations'],
  },
  {
    title: 'Bridges',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preview: require('./showcase/integrations/bridges.png'),
    website: '/protocol/bridge',
    tags: ['integrations'],
  },
  {
    title: 'Oracles',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preview: require('./showcase/integrations/oracles.png'),
    website: '/protocol/oracle',
    tags: ['integrations'],
  },
  {
    title: 'Listings',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preview: require('./showcase/integrations/listings.png'),
    website: '/integration/listings',
    tags: ['integrations'],
  },
  {
    title: 'Contract Addresses',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    preview: require('./showcase/integrations/contract-addresses.png'),
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
