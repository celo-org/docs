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

export type TagType = "popular" | "favorite" | "developers";

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
};

// Add your site to this list
// prettier-ignore
const Users: User[] = [
  {
    title: '1. Beginner Tutorials',
    description: 'Curated list of beginner Celo developer tutorials.',
    preview: require('./showcase/beginner/beginner-tutorials.png'),
    website: '/tutorials?tags=beginner',
    tags: ['favorite'],
  },
  {
    title: '2. Intermediate Tutorials',
    description: 'Curated list of intermediate Celo developer tutorials.',
    preview: require('./showcase/intermediate/intermediate-tutorials.png'),
    website: '/tutorials?tags=intermediate',
    tags: ['favorite'],
  },
  {
    title: '3. Advanced Tutorials',
    description: 'Curated list of advanced Celo developer tutorials.',
    preview: require('./showcase/advanced/advanced-tutorials.png'),
    website: '/tutorials?tags=advanced',
    tags: ['favorite'],
  },
  {
    title: 'Celo Sage',
    description: 'Get started with Celo in 5 minutes or less.',
    preview: require('./showcase/celo-sage.png'),
    website: '/tutorials?tags=advanced',
    tags: ['favorite'],
  },
  {
    title: 'Developers',
    description: 'Get started with Celo in 5 minutes or less.',
    preview: require('./showcase/celo-sage.png'),
    website: '/tutorials?tags=advanced',
    tags: ['developers'],
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
