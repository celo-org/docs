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
  | "refi"
  | "defi"
  | "earn"
  | "wallets"
  | "deprecated"
  | "not-maintained";

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

  refi: {
    label: translate({ message: "ReFi" }),
    description: translate({
      message: "",
      id: "showcase.tag.refi.description",
    }),
    color: "#476520",
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

  deprecated: {
    label: translate({ message: "Deprecated" }),
    description: translate({
      message: "Deprecated",
      id: "showcase.tag.favorite.description",
    }),
    color: "#a16829",
  },

  "not-maintained": {
    label: translate({ message: "Not Maintained" }),
    description: translate({
      message: "Not Maintained",
      id: "showcase.tag.favorite.description",
    }),
    color: "#5a2123",
  },
};

// Add your site to this list
// prettier-ignore
const Users: User[] = [
  {
    title: 'Add3',
    description: 'Add3 helps organizations unlock their Web3 potential with a powerful no-code Web3 platform for creating and managing token products.',
    preview: require('./showcase/add3.png'),
    website: 'https://www.add3.io/',
    source: 'https://github.com/Add3official',
    tags: ['apps', 'defi'],
  },
  {
    title: 'EthicHub',
    description: translate({
      message: 'EthicHub connects DeFi to the real world: crowdlending backed by crowd-collateral for the unbanked farmers excluded from TradFi.',
      id: 'showcase.user.ethichub.description',
    }),
    preview: require('./showcase/ethichub.png'),
    website: 'https://ethix.ethichub.com/',
    source: 'https://docs-ethix.ethichub.com',
    tags: ['apps', 'refi', 'popular', 'earn', 'impact'],
  },
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
    title: 'Envio',
    description: 'Envio is a modern, multi-chain EVM blockchain indexing framework speed-optimized for querying real-time and historical data.',
    preview: require('./showcase/envio.png'),
    website: 'https://www.envio.dev/',
    source: 'https://github.com/enviodev',
    tags: ['apps', 'defi'],
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
    title: 'HaloFi (prev. GoodGhosting) ',
    description: 'The new addictive way to save. Our savings pools reward regular savers with higher interest rates and extra rewards.',
    preview: require('./showcase/good-ghosting.png'),
    website: 'https://www.halofi.me/',
    source: 'https://github.com/Good-Ghosting',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'Symmetric',
    description: 'A decentralized exchange + index fund generator.',
    preview: require('./showcase/symmetric.png'),
    website: 'https://symmetric.finance/',
    source: 'https://finance-symmetric.gitbook.io/symmetric-v3',
    tags: ['apps', 'defi'],
  },
  {
    title: 'ReSource',
    description: 'Bankless infrastructure for building circular trade and mutual credit networks.',
    preview: require('./showcase/resource.png'),
    website: 'https://resource.finance/',
    source: 'https://github.com/resourcefinance',
    tags: ['apps', 'defi'],
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
    source: 'https://github.com/jmrossy/celo-web-wallet',
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
    title: 'Pool Together',
    description: 'PoolTogether is a decentralized and open source blockchain protocol for prize-linked savings.',
    preview: require('./showcase/pool-together.png'),
    website: 'https://pooltogether.com/',
    source: 'https://docs.pooltogether.com/welcome/about-pooltogether',
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
    title: 'Plastiks',
    description: 'Utility NFTs for plastic recovery.',
    preview: require('./showcase/plastiks.png'),
    website: 'https://app.plastiks.io/',
    source: 'https://github.com/Plastiks-io',
    tags: ['apps', 'popular', 'impact'],
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
    title: 'SushiSwap',
    description: 'Swap, earn, stack yields, lend, borrow, leverage all on one decentralized, community driven platform. Welcome home to DeFi.',
    preview: require('./showcase/sushi-swap.png'),
    website: 'https://sushi.com/',
    source: 'https://github.com/sushiswap',
    tags: ['apps', 'defi', 'popular'],
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
    title: 'Wildchain',
    description: 'Adopt wildlife, plant trees, and support real-world conservation efforts – all within a mobile game.',
    preview: require('./showcase/wildchain.png'),
    website: 'https://wildchain.io/',
    source: 'https://github.com/wildchain/celo',
    tags: ['apps', 'impact', 'not-maintained'],
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
    title: 'Etherspot',
    description: 'The only SDK you need to Go Multichain (batched transactions, NFTs, ENS, p2p payment channels and more). Drive liquidity from any EVM chain to Celo based dApps. Account Abstraction',
    preview: require('./showcase/etherspot.png'),
    website: 'https://etherspot.io/',
    source: 'https://github.com/etherspot/etherspot-prime-sdk',
    tags: ['apps', 'impact'],
  },
  {
    title: 'AirdropMe',
    description: 'The most cost-effective tool for airdrops, token distributions in bulk & DAO rewards',
    preview: require('./showcase/adm.png'),
    website: 'https://airdropme.io/',
    source: 'https://airdropme.io/',
    tags: ['apps'],

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
    title: 'Talent Protocol',
    description: 'The web3 professional community for high-potential builders.',
    preview: require('./showcase/talent-protocol.png'),
    website: 'https://www.talentprotocol.com/',
    source: 'https://github.com/talentprotocol/web-dapp',
    tags: ['apps', 'defi', 'popular'],
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
    title: 'Cent',
    description: 'Cent is a mobile wallet designed to make DeFi simple, easy and secure.',
    preview: require('./showcase/cent.png'),
    website: 'https://cent.finance/',
    source: 'https://github.com/centfinance',
    tags: ['apps', 'defi', 'deprecated'],
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
    title: 'CarbonDeFi',
    description: 'An orderbook-like DEX with full automation and built-in 24/7 trading bot.',
    preview: require('./showcase/carbondefi.jpeg'),
    website: 'https://celo.carbondefi.xyz/',
    source: 'https://github.com/bancorprotocol/carbon-app',
    tags: ['apps', 'defi'],
  },
  {
    title: 'Paychant',
    description: 'Easy way to store, send, receive and hold celo currencies.',
    preview: require('./showcase/pay-chant.png'),
    website: 'https://paychant.com/',
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
    tags: ['apps', 'wallets', 'popular'],
  },
  {
    title: 'BWS (prev.Bitfy)',
    description: 'Transacione as principais criptomoedas protegido pela tecnologia blockchain.',
    preview: require('./showcase/bitfy.png'),
    website: 'https://blockchainwebservices.com',
    source: 'https://blockchainwebservices.com',
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
    title: 'Dove Wallet - BTX',
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
    tags: ['apps', 'earn'],
  },
  {
    title: 'OGP Bulk Sender',
    description: 'Send your native coins, tokens, and NFTs in batches using Bulk Sender by Off Grid Platform.',
    preview: require('./showcase/ogpbulksender.png'),
    website: 'https://www.offgridplatform.com/apps/bulk-sender',
    source: 'https://www.offgridplatform.com/apps/bulk-sender',
    tags: ['apps', 'wallets', 'defi'],
  },
  {
    title: 'Mento',
    description: 'Make exchanges between Celo native currencies using the Mento on-chain exchange mechanism.',
    preview: require('./showcase/mento-fi.png'),
    website: 'https://app.mento.org/',
    source: 'https://github.com/mento-protocol/mento-web',
    tags: ['apps', 'defi', 'popular'],
  },
  {
    title: 'Flywallet',
    description: 'The only all-in-one budgeting platform designed just for travelers. Get custom savings plans, destination insights, cheap flights and more.',
    preview: require('./showcase/fly-wallet.png'),
    website: 'https://www.flywallet.io/',
    source: 'https://www.flywallet.io/',
    tags: ['apps', 'earn', 'popular'],
  },
  {
    title: 'DataUnion',
    description: 'Data Collaboration for Data-Centric AI.',
    preview: require('./showcase/data-union.png'),
    website: 'https://www.dataunion.app/',
    source: 'https://www.dataunion.app/',
    tags: ['apps', 'earn'],
  },
  {
    title: 'Gitcoin',
    description: 'Millions in open source project funding.',
    preview: require('./showcase/git-coin.png'),
    website: 'https://gitcoin.co/',
    source: 'https://gitcoin.co/',
    tags: ['apps', 'earn'],
  },
  {
    title: 'Celo Vote',
    description: 'Celo Vote automatically distributes your stake to preferred validator groups that have high estimated APY (annual percentage yield) and automatically rebalances votes if any voted groups fail to maintain high uptime. You retain full custody of your CELO and receive 100% of your rewards.',
    preview: require('./showcase/celo-vote.png'),
    website: 'https://celovote.com/',
    source: 'https://celovote.com/',
    tags: ['apps', 'earn'],
  },
  {
    title: 'Decentralized Impact Incubator',
    description: 'The Decentralized Impact Incubator is a 6-week program to ideate and prototype blockchain-based solutions to global social and environmental challenges. During the period, participants from around the world gather to form teams, design business models, and draft proposals and code. Teams need to pass through weekly checkpoints and are guided by mentors throughout the process. Winning projects will receive grants to support continued development.',
    preview: require('./showcase/decentralized-impact-incubator-winners.png'),
    website: 'https://blockchainforsocialimpact.com/incubator-winners-2020/',
    source: 'https://blockchainforsocialimpact.com/incubator-winners-2020/',
    tags: ['defi', 'earn', 'not-maintained'],
  },
  {
    title: 'Bloinx by BX Smart Labs',
    description: 'A decentralized app that helps users to create reliable savings communities by using smart contracts, in a transparent, verifiable, and trustworthy environment. Bloinx is upgrading the way to manage TANDAS, which are rotating, saving, and credit associations, used in Latin American communities.',
    preview: require('./showcase/bloinx.png'),
    website: 'https://bloinx.io/',
    source: 'https://github.com/Bloinx/bloinx-mobile',
    tags: ['apps', 'earn', 'defi'],
  },
  {
    title: 'Wallet as a Service',
    description: 'Wallet as a Service enables you to create and manage HSM-secured wallets and interact with the underlying blockchain. Our API makes it incredibly easy for developers to execute transactions, check details of past transactions or query account balances without any worries about private key safekeeping. For the Celo Camp 2020 we have developed a prototype version of our product that integrates the Celo blockchain. The demo project presents the new features and provides some code snippets to get started.',
    preview: require('./showcase/wallet-as-a-service.png'),
    website: 'https://tangany.com/blog/tangany-api-suite-2-0',
    source: 'https://docs.tangany.com/?version=latest#intro',
    tags: ['apps', 'earn', 'defi'],
  },
  {
    title: 'El Dorado',
    description: 'El Dorado is building "the crypto dollar wallet of LATAM. We are reinventing the way financial products and services are designed, especially for people living in unstable economies. We are going to provide all the services a bank can offer and more. USD savings accounts and P2P payments/exchange. All powered by Open Blockchains."',
    preview: require('./showcase/el-dorado.png'),
    website: 'https://eldorado.io/',
    source: 'https://github.com/eldoradoio',
    tags: ['apps', 'wallets', 'impact'],
  },
  {
    title: 'LeafCelo',
    description: 'LeafCelo is developing lenrefugee, a guarantor-backed DeFi lending platform for refugees.',
    preview: require('./showcase/leafcelo.png'),
    website: 'https://leafglobalfintech.com/',
    source: 'https://github.com/LeafGlobalFintech/leafcelo',
    tags: ['apps', 'impact', 'not-maintained'],
  },
  {
    title: 'Coinbase',
    description: 'Simply and securely buy, sell, and manage hundreds of cryptocurrencies.',
    preview: require('./showcase/coin-base.png'),
    website: 'https://www.coinbase.com/price/celo',
    source: 'https://www.coinbase.com/price/celo',
    tags: ['apps', 'earn'],
  },
  {
    title: 'Binusu',
    description: 'A Personalized Crypto Experience.',
    preview: require('./showcase/binusu.png'),
    website: 'https://www.binusu.com',
    source: 'https://www.binusu.com',
    tags: ['apps', 'earn', 'defi', 'impact', 'wallets'],
  },
  {
    title: 'Mybitstore',
    description: 'The best cryptocurrency platform to buy, sell, store and convert cryptocurrencies and also trade peer-to-peer with over 200 payment methods.',
    preview: require('./showcase/mybitstore.png'),
    website: 'https://www.mybitstore.com',
    source: 'https://www.mybitstore.com',
    tags: ['apps', 'earn', 'wallets'],
  },
  {
    title: 'Savings Circle',
    description: 'Savings Circles let you pool funds with your friends to save for large purchases. They are known by a variety of names around the world and are a common way to get liquidity and access to loans without access to formal financial institutions.',
    preview: require('./showcase/savingscircle.png'),
    website: 'https://www.circlesavings.app/',
    source: 'https://github.com/celo-org/savings-circle-demo',
    tags: ['apps', 'earn', 'not-maintained'],
  },
  {
    title: 'Cryptum Woocommerce Checkout',
    description: 'Based on Cryptum APIs, the open source Plugin connects to WordPress e-commerces checkouts, providing fast and easy integration for Celo and cUSD acceptance and management for merchants.',
    preview: require('./showcase/cryptumwoocommercecheckout.png'),
    website: 'https://github.com/cryptum-official/cryptum-checkout-wordpress-plugin',
    source: 'https://github.com/cryptum-official/cryptum-checkout-wordpress-plugin',
    tags: ['apps', 'earn', 'not-maintained'],
  },
  {
    title: 'Muggle Pay',
    description: 'MugglePay provides a payment SDK for merchants to accept cryptocurrencies. Mugglepay makes crypto payment easy and thousands of merchants are onboarded with MugglePay SDK. For the Celo Camp 2020, we will integrate with cUSD/CELO for payments on the Celo blockchain.',
    preview: require('./showcase/mugglepay.png'),
    website: 'https://mugglepay.com/',
    source: 'https://github.com/MugglePay/celo-toolkit',
    tags: ['apps', 'earn'],
  },
  {
    title: 'Defiant',
    description: 'A self-custodial multiblockchain mobile wallet. Your gateway to a decentralized world.',
    preview: require('./showcase/defiant.png'),
    website: 'https://defiantapp.tech/',
    source: 'https://github.com/AndinaDeFi/',
    tags: ['apps', 'wallets', 'defi'],
  },
  {
    title: 'Kolektivo',
    description: 'A collection of institutional technologies that allow local communities to launch, finance, and govern their own regenerative economies',
    preview: require('./showcase/kolektivo.png'),
    website: 'https://www.kolektivo.network/',
    source: 'https://github.com/Kolektivo',
    tags: ['refi'],
  },
  {
    title: 'Toucan Protocol',
    description: 'Catalytic infrastructure that powers a vibrant on-chain carbon market with the sole purpose of addressing climate change',
    preview: require('./showcase/toucan.png'),
    website: 'https://toucan.earth/',
    source: 'https://github.com/ToucanProtocol',
    tags: ['refi'],
  },
  {
    title: 'Astral Protocol',
    description: 'Geospatial tooling for smart contracts',
    preview: require('./showcase/astral.png'),
    website: 'https://astral.global/',
    source: 'https://github.com/AstralProtocol/astralprotocol',
    tags: ['refi'],
  },
  {
    title: 'Spirals',
    description: 'Regenerative proof-of-stake infrastructure to fund climate action',
    preview: require('./showcase/spirals.png'),
    website: 'https://app.spirals.so/',
    source: 'https://github.com/spiralsprotocol',
    tags: ['refi'],
  },
  {
    title: 'MRV Studio',
    description: 'Metadata platform for digital MRV such as remote sensing, drones, Internet of Things, DNA monitoring, etc.',
    preview: require('./showcase/mrv.png'),
    website: 'https://mrvcollective.org/',
    source: 'https://github.com/MRV-Studio',
    tags: ['refi', 'not-maintained'],
  },
  {
    title: 'Untangled Finance',
    description: 'Decentralized credit protocol offering loans for regenerative projects and real-world assets',
    preview: require('./showcase/untangled.png'),
    website: 'https://untangled.finance/',
    source: 'https://github.com/untangledfinance',
    tags: ['refi'],
  },
  {
    title: 'Closer',
    description: 'Suite of web3 tools to bootstrap regenerative action and meaningful governance in local communities',
    preview: require('./showcase/closer.png'),
    website: 'https://closer.earth/',
    source: 'https://github.com/closerearth',
    tags: ['refi'],
  },
  {
    title: 'GainForest',
    description: 'Decentralised fund using artificial intelligence to measure and reward sustainable nature stewardship',
    preview: require('./showcase/gainForest.png'),
    website: 'https://www.gainforest.earth/',
    source: 'https://github.com/GainForest',
    tags: ['refi'],
  }
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
