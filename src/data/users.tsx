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
  | "favorite"
  | "apps"
  | "product"
  | "design"
  | "i18n"
  | "versioning"
  | "large"
  | "meta"
  | "personal"
  | "rtl";

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
  favorite: {
    label: translate({ message: "Favorite" }),
    description: translate({
      message: "Our favorite Celo daApps that you must absolutely check out!",
      id: "showcase.tag.favorite.description",
    }),
    color: "#e9669e",
  },

  // For open-source sites, a link to the source code is required
  // The source should be your *website's* source, not your project's source!
  apps: {
    label: translate({ message: "Apps" }),
    description: translate({
      // message: "Wallet",
      id: "showcase.tag.apps.description",
    }),
    color: "#39ca30",
  },

  product: {
    label: translate({ message: "Product" }),
    description: translate({
      message: "Docusaurus sites associated to a commercial product!",
      id: "showcase.tag.product.description",
    }),
    color: "#dfd545",
  },

  design: {
    label: translate({ message: "Design" }),
    description: translate({
      message:
        "Beautiful Docusaurus sites, polished and standing out from the initial template!",
      id: "showcase.tag.design.description",
    }),
    color: "#a44fb7",
  },

  i18n: {
    label: translate({ message: "I18n" }),
    description: translate({
      message:
        "Translated Docusaurus sites using the internationalization support with more than 1 locale.",
      id: "showcase.tag.i18n.description",
    }),
    color: "#127f82",
  },

  versioning: {
    label: translate({ message: "Versioning" }),
    description: translate({
      message:
        "Docusaurus sites using the versioning feature of the docs plugin to manage multiple versions.",
      id: "showcase.tag.versioning.description",
    }),
    color: "#fe6829",
  },

  // Large sites, with a lot of content (> 200 pages, excluding versions)
  large: {
    label: translate({ message: "Large" }),
    description: translate({
      message:
        "Very large Docusaurus sites, including many more pages than the average!",
      id: "showcase.tag.large.description",
    }),
    color: "#8c2f00",
  },

  meta: {
    label: translate({ message: "Meta" }),
    description: translate({
      message: "Docusaurus sites of Meta (formerly Facebook) projects",
      id: "showcase.tag.meta.description",
    }),
    color: "#4267b2", // Facebook blue
  },

  personal: {
    label: translate({ message: "Personal" }),
    description: translate({
      message:
        "Personal websites, blogs and digital gardens built with Docusaurus",
      id: "showcase.tag.personal.description",
    }),
    color: "#14cfc3",
  },

  rtl: {
    label: translate({ message: "RTL Direction" }),
    description: translate({
      message:
        "Docusaurus sites using the right-to-left reading direction support.",
      id: "showcase.tag.rtl.description",
    }),
    color: "#ffcfc3",
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
    tags: ['apps'],
  },
  {
    title: 'Impact Market',
    description: 'impactMarket enables any vulnerable community to implement poverty alleviation mechanisms, like Unconditional Basic Income.',
    preview: require('./showcase/impact-market.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Umoja',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/umoja.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Mobius',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/mobius.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Ubeswap',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/ube-swap.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Moola Market',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/moola.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Good Ghosting',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/good-ghosting.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Symmetric',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/symmetric.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Resource',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/resource.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'MetaCelo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/metacelo.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Pinnata',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/pinnata.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Nomspace',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/nom-space.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Celo Terminal',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/celo-terminal.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Kaala',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/kaala.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Pago',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/pago.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Celo Wallet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/celo-wallet.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Masa',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/masa.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Poof',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/poof.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Optics',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/optics.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Pool Together',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/pool-together.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'AriSwap',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/ari-swap.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Porio',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/porio.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Aijia',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/aijia.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Guild',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/guild.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'CreateSafe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/create-safe.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'CyberBox',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/cyber-box.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Kresko',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/kresko.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'AllBridge',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/all-bridge.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Celer Bridge',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/celer-bridge.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Kotani Pay',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/kotani-pay.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'CeloDance',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/celo-dance.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'SushiSwap',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/sushi-swap.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'SocialStack',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/social-stack.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Doni | GoFund',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/doni.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Wildchain',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/wild-chain.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Wren',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/wren.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'GoodDollar',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/gooddollar.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Help Each Other',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/help-each-other.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Grameen Foundation',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/grameen-foundation.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Keyko',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/keyko.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Moss',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/moss.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'CoCo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/coco.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Coperacha',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/coperacha.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'KnoxEdge',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/knox-edge.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Celo Tracker',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/celo-tracker.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Into the Verse',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/into-the-verse.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Beefy Finance',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/beefy-finance.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/space.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Talent Protocol',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/talent-protocol.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'La Stabilite',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/la-stabilite.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Solaris',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/solaris.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Tradegen',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/trade-gen.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'DeFi Yield',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/defi-yield.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Hummingbot',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/humming-bot.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Ensuro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/ensuro.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'BlockCash',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/block-cash.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Cent',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/cent.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Pixelava',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/pixel-ava.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'WeTrust',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/we-trust.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Pesabase',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/pesa-base.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Sempo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/sempo.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Bitssa',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/bitssa.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'FoxWallet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/fox-wallet.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'YellowCard',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/yellow-card.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'W.WAM',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/w-wam.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Paychant',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/pay-chant.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'MetaMask',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/meta-mask.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Kite Financial',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/kite.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Dexfair',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/dex-fair.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Abra',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/abra.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Beam & Go',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/beam-and-go.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Bidali',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/bidali.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Bitfy',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/bitfy.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'CoinPayments',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/coin-payments.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Dove Wallet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/dove-wallet.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'utrust',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/u-trust.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Coin98 Wallet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/coin-98.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'BitWage',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/bit-wage.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'LoveCrypto',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/love-crypto.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Paysail',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/pay-sail.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Flywallet',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/fly-wallet.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'DataUnion',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/data-union.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Tegger',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/tegger.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Gitcoin Bounties',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/git-coin.png'),
    website: 'https://valoraapp.com/',
    source: 'https://github.com/valora-inc',
    tags: ['apps'],
  },
  {
    title: 'Coinbase',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    preview: require('./showcase/coin-base.png'),
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
