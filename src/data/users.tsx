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
    title: 'Impact Market',
    description: 'impactMarket enables any vulnerable community to implement poverty alleviation mechanisms, like Unconditional Basic Income.',
    preview: require('./showcase/impact-market.png'),
    website: 'https://www.impactmarket.com/',
    source: 'https://github.com/impactMarket',
    tags: ['apps', 'impact', 'popular'],
  },
  {
    title: 'Emerging Impact',
    description: 'EI empowers NGOs, governments, and social enterprises to modernize financial services in emerging markets with blockchain technology.',
    preview: require('./showcase/umoja.png'),
    website: 'https://www.emergingimpact.com/',
    source: 'https://github.com/Emerging-Impact',
    tags: ['apps', 'impact'],
  },
  {
    title: 'Mobius',
    description: 'Cross-chain stableswap exchange.',
    preview: require('./showcase/mobius.png'),
    website: 'https://www.mobius.money/#/swap',
    source: 'https://github.com/mobiusAMM',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'Revo',
    description: 'Easy yield farming with auto comounding interest.',
    preview: require('./showcase/revo.png'),
    website: 'https://revo.market/#/zap',
    source: 'https://github.com/revo-market/',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'Ubeswap',
    description: 'Ubeswap is a mobile-first DeFi exchange.',
    preview: require('./showcase/ube-swap.png'),
    website: 'https://ubeswap.org/',
    source: 'https://github.com/ubeswap',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'Moola Market',
    description: 'Lend, borrow, or add to a pool to earn rewards.',
    preview: require('./showcase/moola.png'),
    website: 'https://moola.market/',
    source: 'https://github.com/moolamarket/moola',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'Good Ghosting',
    description: 'The new addictive way to save. Our savings pools reward regular savers with higher interest rates and extra rewards.',
    preview: require('./showcase/good-ghosting.png'),
    website: 'https://goodghosting.com/#/',
    source: 'https://github.com/Good-Ghosting',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'Symmetric',
    description: 'A decentralized exchange + index fund generator.',
    preview: require('./showcase/symmetric.png'),
    website: 'https://celo-pools.symmetric.exchange/#/explore',
    source: 'https://docs.symmetric.exchange/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'ReSource',
    description: 'Banknless infrastructure for building circular trade and mutual credit networks.',
    preview: require('./showcase/resource.png'),
    website: 'https://resource.finance/',
    source: 'https://github.com/ReSource-Network/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'MetaCelo',
    description: 'The First Play-To-Earn Metaverse NFT Game built on Celo Network',
    preview: require('./showcase/metacelo.png'),
    website: 'https://metacelo.io/',
    source: 'https://docs.metacelo.io/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Pinnata',
    description: 'Cross-chain leveraged yield farming protocol on Celo.',
    preview: require('./showcase/pinnata.png'),
    website: 'https://www.pinnata.xyz/earn',
    source: 'https://github.com/Pinnata',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'Nomspace',
    description: 'Protocol for reserving Celo/Ethereum addresses on Celo.',
    preview: require('./showcase/nom-space.png'),
    website: 'https://www.nom.space/#/',
    source: 'https://github.com/nomspace',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'Celo Terminal',
    description: 'Manage your accounts and access decentralized apps using the Celo Terminal desktop application.',
    preview: require('./showcase/celo-terminal.png'),
    website: 'https://celoterminal.com/',
    source: 'https://github.com/zviadm/celoterminal/blob/main/README.md',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'Celo Wallet',
    description: 'A simple wallet for the Celo network. Manage your funds in a browser or on your desktop.',
    preview: require('./showcase/celo-wallet.png'),
    website: 'https://celowallet.app/setup',
    source: 'https://github.com/celo-tools/celo-web-wallet',
    tags: ['apps', 'wallets', 'popular'],
  },
  {
    title: 'Masa',
    description: 'Personal Finance Management. DeFi Credit Protocol. Uncollateralized Loans.',
    preview: require('./showcase/masa.png'),
    website: 'https://masa.finance/',
    source: 'https://github.com/masa-finance',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'Poof',
    description: 'Poof is a decentralized, private DeFi protocol. Users can privately lend, borrow, send, and request crypto.',
    preview: require('./showcase/poof.png'),
    website: 'https://poof.cash/',
    source: 'https://github.com/poofcash/poof-core',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'Optics',
    description: 'Optics is a new design for radically cheaper cross-chain communication without header verification.',
    preview: require('./showcase/optics.png'),
    website: 'https://optics.app/',
    source: 'https://github.com/celo-org/optics-monorepo',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Pool Together',
    description: 'PoolTogether is a decentralized and open source blockchain protocol for prize-linked savings.',
    preview: require('./showcase/pool-together.png'),
    website: 'https://pooltogether.com/',
    source: 'https://docs.pooltogether.com/welcome/about-pooltogether',
    tags: ['apps', 'defi'],
  },
  {
    title: 'AriSwap',
    description: 'Discover, collect, and sell extraordinary physical and digital assets as NFTs.',
    preview: require('./showcase/ari-swap.png'),
    website: 'https://ariswap.co/',
    source: 'https://github.com/airswap',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Porio',
    description: 'The sustainnable marketplace for digital art and game assets.',
    preview: require('./showcase/porio.png'),
    website: 'https://epor.io/',
    source: 'https://epor.io/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Aijia',
    description: 'A modern ticketing and marketplace platform focused on FANS and the fan experience.',
    preview: require('./showcase/aijia.png'),
    website: 'https://aijia.fan/',
    source: 'https://aijia.fan/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Guild',
    description: 'Automated membership management for the platforms your community already uses.',
    preview: require('./showcase/guild.png'),
    website: 'https://guild.xyz/',
    source: 'https://guild.xyz/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'CreateSafe',
    description: 'Tools for a new music industry.',
    preview: require('./showcase/create-safe.png'),
    website: 'https://createsafe.io/',
    source: 'https://createsafe.io/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'CyberBox',
    description: 'Regenerate nature by trading NFTs.',
    preview: require('./showcase/cyber-box.png'),
    website: 'https://cyberbox.art/',
    source: 'https://cyberbox.art/',
    tags: ['apps', 'defi' ],
  },
  {
    title: 'Plastiks',
    description: 'Utility NFTs for plastic recovery.',
    preview: require('./showcase/plastiks.png'),
    website: 'https://app.plastiks.io/',
    source: 'https://app.plastiks.io/',
    tags: ['apps', 'popular',  'impact' ],
  },
  {
    title: 'Alities',
    description: 'NFTs and proof-of-belonging badges for impact-driven communities.',
    preview: require('./showcase/alities.png'),
    website: 'https://alities.io/',
    source: 'https://alities.io/',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'Kresko',
    description: 'Get exclusive access to the synthetic asset platform.',
    preview: require('./showcase/kresko.png'),
    website: 'https://www.kresko.fi/',
    source: 'https://www.kresko.fi/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'AllBridge',
    description: 'Allbridge is a simple, modern, and reliable way to transfer assets between different networks.',
    preview: require('./showcase/all-bridge.png'),
    website: 'https://allbridge.io/',
    source: 'https://docs.allbridge.io/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Celer Bridge',
    description: 'Bring Internet Scale to Every Blockchain.',
    preview: require('./showcase/celer-bridge.png'),
    website: 'https://cbridge.celer.network/#/transfer',
    source: 'https://github.com/celer-network',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Kotani Pay',
    description: 'Connect your dapp, wallet or blockchain network to local payment channels in Africa.',
    preview: require('./showcase/kotani-pay.png'),
    website: 'https://kotanipay.com/',
    source: 'https://github.com/Kotani-Pay/',
    tags: ['apps', 'wallets', 'popular'],
  },
  {
    title: 'CeloDance',
    description: 'Send, Vote And Earn Celo Assets , Make It Mobile.',
    preview: require('./showcase/celo-dance.png'),
    website: 'https://celo.dance/',
    source: 'https://celo.dance/',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'SushiSwap',
    description: 'Swap, earn, stack yields, lend, borrow, leverage all on one decentralized, community driven platform. Welcome home to DeFi.',
    preview: require('./showcase/sushi-swap.png'),
    website: 'https://sushi.com/',
    source: 'https://github.com/sushiswap',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'SocialStack',
    description: 'The code-free social token platform that gives a damn.',
    preview: require('./showcase/social-stack.png'),
    website: 'https://www.socialstack.co/',
    source: 'https://www.socialstack.co/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Qavah',
    description: 'Decentralized and free-of-charge crowdfunding platform.',
    preview: require('./showcase/qavah.png'),
    website: 'https://qavah.me',
    source: 'https://qavah.me',
    tags: ['apps', 'impact'],
  },
  {
    title: 'Niftydrop',
    description: 'Distribute NFTs to friends and customers.',
    preview: require('./showcase/niftydrop.png'),
    website: 'https://niftydrop.net/',
    source: 'https://niftydrop.net/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'NFT Viewer',
    description: 'View your NFT collections on Celo.',
    preview: require('./showcase/nft-viewer.png'),
    website: 'https://nfts.valoraapp.com/',
    source: 'https://nfts.valoraapp.com/',
    tags: ['apps', 'popular'],
  },
  {
    title: 'Doni',
    description: 'Raise funds for causes that matter.',
    preview: require('./showcase/doni.png'),
    website: 'https://doni.app/',
    source: 'https://doni.app/',
    tags: ['apps', 'impact'],
  },
  {
    title: 'Wildchain',
    description: 'Adopt wildlife, plant trees, and support real-world conservation efforts – all within a mobile game.',
    preview: require('./showcase/wild-chain.png'),
    website: 'https://wildchain.io/',
    source: 'https://github.com/wildchain/celo',
    tags: ['apps', 'impact'],
  },
  {
    title: 'Wren',
    description: 'Sequestering carbon through subscription-based platform with profiles and dashboards.',
    preview: require('./showcase/wren.png'),
    website: 'https://www.wren.co/profile/celo',
    source: 'https://github.com/valora-inc',
    tags: ['apps', 'impact', 'popular'],
  },
  {
    title: 'GoodDollar',
    description: 'Get into the game with GoodDollar, a global movement to bring economic opportunity to all.',
    preview: require('./showcase/gooddollar.png'),
    website: 'https://www.gooddollar.org/',
    source: 'https://www.gooddollar.org/',
    tags: ['apps', 'impact'],
  },
  {
    title: 'Help Each Other',
    description: 'Crowdfunding without borders.',
    preview: require('./showcase/help-each-other.png'),
    website: 'https://app.heo.finance/',
    source: 'https://github.com/heo-platform/',
    tags: ['apps', 'impact'],
  },
  {
    title: 'Grameen Foundation',
    description: 'The strength of women + the power of technology.',
    preview: require('./showcase/grameen-foundation.png'),
    website: 'https://grameenfoundation.org/',
    source: 'https://grameenfoundation.org/',
    tags: ['apps', 'impact'],
  },
  {
    title: 'Keyko',
    description: 'A digital sandbox experience for tokenization, governance and DeFi. Always evolving, ever lit!',
    preview: require('./showcase/keyko.png'),
    website: 'https://dojo.keyko.io/',
    source: 'https://github.com/keyko-io',
    tags: ['apps', 'impact'],
  },
  {
    title: 'Moss',
    description: 'Offset your carbon footprint. We make it easy and safe to preserve the planet.',
    preview: require('./showcase/moss.png'),
    website: 'https://moss.earth/',
    source: 'https://moss.earth/',
    tags: ['apps', 'impact', 'popular'],
  },
  {
    title: 'CoCo',
    description: 'Indica la ciudad y sector de tu beneficiario para ver las tiendas disponibles en esa zona.',
    preview: require('./showcase/coco.png'),
    website: 'https://www.cocomercado.com/landing/',
    source: 'https://www.cocomercado.com/landing/',
    tags: ['apps', 'impact'],
  },
  {
    title: 'Coperacha',
    description: 'Fundraising for you and your community, on Celo.',
    preview: require('./showcase/coperacha.png'),
    website: 'https://www.coperacha.app/',
    source: 'https://github.com/Alex-Neo-Projects/Coperacha-app/tree/1.0.0',
    tags: ['apps', 'impact'],
  },
  {
    title: 'KnoxEdge',
    description: 'Cogintive platform: blending man + machine intelligence since what you think, really matters to you.',
    preview: require('./showcase/knox-edge.png'),
    website: 'https://www.knoxedge.com/',
    source: 'https://github.com/KnoxEdge',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Celo Tracker',
    description: 'We help you track all of your investments on the Celo blockchain from one place!',
    preview: require('./showcase/celo-tracker.png'),
    website: 'https://celotracker.com/portfolio',
    source: 'https://celotracker.com/portfolio',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Into the Verse',
    description: 'A pixel experience play, collect, and earn.',
    preview: require('./showcase/into-the-verse.png'),
    website: 'https://dungeonhunt.netlify.app/',
    source: 'https://dungeonhunt.netlify.app/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Beefy Finance',
    description: 'A Decentralized, Multichain Yield Optimizer that allows its users to earn compound interest on their crypto holdings.',
    preview: require('./showcase/beefy-finance.png'),
    website: 'https://beefy.finance/',
    source: 'https://docs.beefy.finance/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Space',
    description: 'A cross-chain web3 platform with DEX, NFT, Starter and DAO on Evmos, Layer2 and Celo',
    preview: require('./showcase/space.png'),
    website: 'https://www.spacefi.io/',
    source: 'https://docs.spacefi.io/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Talent Protocol',
    description: 'The web3 professional community for high-potential builders.',
    preview: require('./showcase/talent-protocol.png'),
    website: 'https://www.talentprotocol.com/',
    source: 'https://github.com/talentprotocol/web-dapp',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'La Stabilite',
    description: 'A stablecoin backed by LP & lending tokens.',
    preview: require('./showcase/la-stabilite.png'),
    website: 'https://stabilite.cash/#/vaults',
    source: 'https://github.com/LaStabilite',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Solaris',
    description: 'Margin trading dApp on Celo using Ubeswap and Moola flashloans.',
    preview: require('./showcase/solaris.png'),
    website: 'https://celo-margin.solarisprotocol.com/#/trade',
    source: 'https://github.com/solaris-protocol/celo-margin',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Tradegen',
    description: 'An asset management and algo trading platform on Celo.',
    preview: require('./showcase/trade-gen.png'),
    website: 'https://tradegen.io/',
    source: 'https://github.com/Tradegen',
    tags: ['apps'],
  },
  {
    title: 'Hummingbot',
    description: 'Hummingbot is open source software that helps you build market making and arbitrage bots that run on any crypto exchange, centralized or decentralized.',
    preview: require('./showcase/humming-bot.png'),
    website: 'https://hummingbot.io/en/',
    source: 'https://hummingbot.io/en/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Ensuro',
    description: 'Ensuro will allow everyone to participate in its liquidity pools based on their desired amount of resources and time.',
    preview: require('./showcase/ensuro.png'),
    website: 'https://ensuro.co/',
    source: 'https://github.com/ensuro/ensuro',
    tags: ['apps', 'defi'],
  },
  {
    title: 'BlockCash',
    description: 'Free, secure and convenient financial services for everyone.',
    preview: require('./showcase/block-cash.png'),
    website: 'https://www.blockcash.finance/',
    source: 'https://www.blockcash.finance/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Cent',
    description: 'Cent is a mobile wallet designed to make DeFi simple, easy and secure.',
    preview: require('./showcase/cent.png'),
    website: 'https://cent.finance/',
    source: 'https://github.com/centfinance',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Pixelava',
    description: 'Access multiple Game-Fi universe, get preferential treatment, accumulate your wealth. The first Own-to-earn NFT in Celo network.',
    preview: require('./showcase/pixel-ava.png'),
    website: 'https://pixelava.space/',
    source: 'https://pixelava.space/',
    tags: ['apps', 'defi'],
  },
  {
    title: 'WeTrust',
    description: 'WeTrust is a platform for decentralized financial apps, powered by blockchain technology. Our mission is to advance financial inclusion around the world.',
    preview: require('./showcase/we-trust.png'),
    website: 'https://www.wetrust.io/',
    source: 'https://github.com/WeTrustPlatform',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Pesabase',
    description: 'Pesabase is the easiest way for you to send money and make payments. We make transfers to your friends and family instantly.',
    preview: require('./showcase/pesa-base.png'),
    website: 'https://pesabase.com/',
    source: 'https://pesabase.com/',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'Sempo',
    description: 'Simple, Transparent, and Instant Digital Cash Transfer.',
    preview: require('./showcase/sempo.png'),
    website: 'https://withsempo.com/',
    source: 'https://withsempo.com/',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'Bitssa',
    description: 'Use Our Client Application N2Xpress.com To Send Money To Your Loved Ones Easy, Fast And Secure.',
    preview: require('./showcase/bitssa.png'),
    website: 'https://swap.bitssa.com/',
    source: 'https://twitter.com/BITSSAswap',
    tags: ['apps', 'wallets', 'popular'],
  },
  {
    title: 'FoxWallet',
    description: 'Leading you to the world of blockchain. Decentralized / secure and flexible / Supporting Filecoin ecosystem.',
    preview: require('./showcase/fox-wallet.png'),
    website: 'https://foxwallet.com/en',
    source: 'https://foxwallet.com/en',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'YellowCard',
    description: 'Yellow Card is the easiest way to buy and sell Bitcoin, Ethereum and Tether instantly at the best rates with zero fees.',
    preview: require('./showcase/yellow-card.png'),
    website: 'https://yellowcard.io/',
    source: 'https://yellowcard.io/',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'Trelis Pay',
    description: 'Easily accept cStable payments on your dApp or website.',
    preview: require('./showcase/trelis.png'),
    website: 'https://celo.trelis.com/',
    source: 'https://docs.trelis.com/',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'ChurritoFi',
    description: 'Staking CELO made easy.',
    preview: require('./showcase/churrito-fi.png'),
    website: 'https://churrito.fi/',
    source: 'https://github.com/ChurritoFi',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'W.WAM',
    description: 'Money made easy, money made powerful.',
    preview: require('./showcase/w-wam.png'),
    website: 'https://wam.money/',
    source: 'https://github.com/zed-io/wam-ecommerce-plugin-v1',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'Paychant',
    description: 'Easy way to store, send, receive and hold celo currencies.',
    preview: require('./showcase/pay-chant.png'),
    website: 'https://celo-wallet.paychant.com/',
    source: 'https://developer.paychant.com/',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'MetaMask',
    description: 'Start exploring blockchain applications in seconds. Trusted by over 30 million users worldwide.',
    preview: require('./showcase/meta-mask.png'),
    website: 'https://metamask.io/',
    source: 'https://github.com/dsrvlabs/celo-extension-wallet',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'Kite Financial',
    description: 'Trade crypto for cash, trade as low as $10, send and receive crypto, swap, pay bills & lots more!',
    preview: require('./showcase/kite.png'),
    website: 'https://kitefinancial.io/',
    source: 'https://kitefinancial.io/',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'Abra',
    description: 'Access best-in-class trading, yield, borrowing, and funds.',
    preview: require('./showcase/abra.png'),
    website: 'https://www.abra.com/',
    source: 'https://www.abra.com/',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'Bidali',
    description: 'Purchase gift cards from all your favorite brands.',
    preview: require('./showcase/bidali.png'),
    website: 'https://www.bidali.com/',
    source: 'https://www.bidali.com/',
    tags: ['apps', 'wallets','popular'],
  },
  {
    title: 'Chi Spend',
    description: 'Spend your cryptocurrency on real world products and services.',
    preview: require('./showcase/chispend.png'),
    website: 'https://chispend.com/',
    source: 'https://chispend.com/',
    tags: ['apps', 'wallets','popular'],
  },
  {
    title: 'Celo Tax',
    description: 'Analyze your transactions for taxes or accounting.',
    preview: require('./showcase/celo-tax.png'),
    website: 'https://www.celo.tax/',
    source: 'https://www.celo.tax/',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'Bitfy',
    description: 'Transacione as principais criptomoedas protegido pela tecnologia blockchain.',
    preview: require('./showcase/bitfy.png'),
    website: 'https://bitfy.app/',
    source: 'https://bitfy.app/',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'ImmortalDAO Finance',
    description: 'Bond and stake your IMMO tokens to earn rewards',
    preview: require('./showcase/immortal-dao.png'),
    website: 'https://www.immortaldao.finance/#/stake',
    source: 'https://github.com/ImmortalDAO-Fi',
    tags: ['apps', 'wallets', 'popular'],
  },
  {
    title: 'CoinPayments',
    description: 'Take advantage of our global crypto payment gateway made easy and accessible for everyone — whether you\'re a business owner, crypto user, or even from another planet.',
    preview: require('./showcase/coin-payments.png'),
    website: 'https://www.coinpayments.net/',
    source: 'https://www.coinpayments.net/',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'Dove Wallet',
    description: 'Transfer, buy and sell digitial assets easily.',
    preview: require('./showcase/dove-wallet.png'),
    website: 'https://btxpro.com/en',
    source: 'https://developer.dovewallet.com/api/v1/#introduction',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'utrust',
    description: 'Get ready for seamless online payments, with digital currencies.',
    preview: require('./showcase/u-trust.png'),
    website: 'https://utrust.com/',
    source: 'https://utrust.com/',
    tags: ['apps', 'wallets'],
  },
  {
    title: 'BitWage',
    description: 'Bitwage is the leading provider of Bitcoin & cryptocurrency payroll solutions.',
    preview: require('./showcase/bit-wage.png'),
    website: 'https://www.bitwage.com/',
    source: 'https://docs.bitwage.com/',
    tags: ['apps','earn'],
  },
  {
    title: 'LoveCrypto',
    description: 'As menores taxas de coversao do mercado.',
    preview: require('./showcase/love-crypto.png'),
    website: 'https://lovecrypto.net/#/',
    source: 'https://github.com/ailsoncgt/lovecrypto',
    tags: ['apps','earn'],
  },
  {
    title: 'Paysail',
    description: 'Paysail leverages asset-backed stablecoins to offer an innovative global B2B invoicing solution with immediate access to incoming funds.',
    preview: require('./showcase/pay-sail.png'),
    website: 'https://paysail.us/',
    source: 'https://paysail.us/',
    tags: ['apps','earn'],
  },

  {
    title: 'Mento-Fi',
    description: 'Make exchanges between Celo native currencies using the Mento on-chain exchange mechanism.',
    preview: require('./showcase/mento-fi.png'),
    website: 'https://mento.finance/',
    source: 'https://github.com/celo-tools/mento-fi',
    tags: ['apps','defi', 'popular'],
  },
  {
    title: 'Flywallet',
    description: 'The only all-in-one budgeting platform designed just for travelers. Get custom savings plans, destination insights, cheap flights and more.',
    preview: require('./showcase/fly-wallet.png'),
    website: 'https://www.flywallet.io/',
    source: 'https://www.flywallet.io/',
    tags: ['apps','earn', 'popular'],
  },
  {
    title: 'DataUnion',
    description: 'Data Collaboration for Data-Centric AI.',
    preview: require('./showcase/data-union.png'),
    website: 'https://www.dataunion.app/',
    source: 'https://www.dataunion.app/',
    tags: ['apps','earn'],
  },
  {
    title: 'Tegger',
    description: 'Control what data you share and get rewarded for it.',
    preview: require('./showcase/tegger.png'),
    website: 'https://tegger.io/',
    source: 'https://tegger.io/',
    tags: ['apps','earn'],
  },
  {
    title: 'Gitcoin',
    description: 'Millions in open source project funding.',
    preview: require('./showcase/git-coin.png'),
    website: 'https://gitcoin.co/',
    source: 'https://gitcoin.co/',
    tags: ['apps','earn'],
  },
  {
    title: 'Coinbase',
    description: 'Simply and securely buy, sell, and manage hundreds of cryptocurrencies.',
    preview: require('./showcase/coin-base.png'),
    website: 'https://www.coinbase.com/price/celo',
    source: 'https://www.coinbase.com/price/celo',
    tags: ['apps','earn'],
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
