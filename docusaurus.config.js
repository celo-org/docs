/** @type {import('@docusaurus/types').DocusaurusConfig} */
const path = require("path");
const math = require("remark-math");
const katex = require("rehype-katex");
const { docs, developers } = require("./sidebars");
const DefaultLocale = "en";

module.exports = {
  title: "Celo Documentation",
  tagline: "Documentation for the Celo platform.",
  url: "https://docs.celo.org",
  baseUrl: "/",
  trailingSlash: false,
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/color-favicon.png",
  organizationName: "celo-org", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
   i18n: {
     defaultLocale: "en",
     locales: ["en"],
    //  locales: ["en", "es"],
   },
  themes: ["@docusaurus/theme-live-codeblock"],
  scripts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/web3/1.6.0/web3.min.js",
      async: true,
    },
  ],
  plugins: [
    require.resolve("docusaurus-plugin-hubspot"),
    require.resolve("docusaurus-plugin-fathom"),
    path.resolve(__dirname, "src/plugins/aliases.ts"),
    path.resolve(__dirname, "src/plugins/web3-polyfill.ts"),
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/celo-owner-guide/ledger",
            from: [
              "/operations-manual/key-management/using-a-ledger-wallet",
              "/operations-manual/key-management/ledger",
              "/operations-manual/summary/ledger",
              "/operations-manual/using-a-ledger-wallet",
              "/validator-guide/key-management/using-a-ledger-wallet",
              "/validator-guide/key-management/ledger",
              "/validator-guide/summary/ledger",
              "/validator-guide/using-a-ledger-wallet",
              "/celo-gold-holder-guide/ledger",
            ],
          },
          {
            to:
              "/getting-started/baklava-testnet/running-a-full-node-in-baklava",
            from: [
              "/getting-started/running-a-full-node",
              "/getting-started/running-a-validator",
              "/getting-started/running-a-full-node-in-baklava",
            ],
          },
          {
            to: "/getting-started/using-the-wallet",
            from: ["/getting-started/using-the-mobile-wallet"],
          },
          {
            to: "/celo-owner-guide/release-gold",
            from: [
              "/celo-codebase/protocol/release-gold",
              "/celo-holder-guide/release-gold",
              "/celo-gold-holder-guide/release-gold",
            ],
          },
          {
            to: "/developer-guide/start",
            from: [
              "/developer-guide/start/celo-truffle-box",
              "/developer-resources/walkthroughs/hello-mobile-dapp",
            ],
          },
          {
            to: "/developer-guide/overview",
            from: [
              "/developer-guide/overview/introduction",
              "/developer-resources/overview",
            ],
          },
          {
            to: "/developer-guide/development-chain",
            from: ["/developer-guide/start/development-chain"],
          },
          {
            to: "/important-information/mainnet-network-disclaimer",
            from: ["/important-information/rc-network-disclaimer"],
          },
          {
            to: "/getting-started/mainnet",
            from: ["/getting-started/rc1"],
          },
          {
            to: "/getting-started/mainnet/running-a-full-node-in-mainnet",
            from: [
              "/getting-started/rc1/running-a-full-node-in-rc1",
              "/getting-started/running-a-full-node-in-mainnet",
            ],
          },
          {
            to: "/getting-started/mainnet/running-a-validator-in-mainnet",
            from: [
              "/getting-started/rc1/running-a-validator-in-rc1",
              "/getting-started/running-a-validator-in-mainnet",
            ],
          },
          {
            to: "/celo-owner-guide/quick-start",
            from: [
              "/celo-gold-holder-guide/quick-start",
              "/celo-holder-guide/quick-start",
            ],
          },
          {
            to: "/celo-owner-guide/voting-governance",
            from: [
              "/celo-gold-holder-guide/voting-governance",
              "/celo-holder-guide/voting-governance",
            ],
          },
          {
            to: "/celo-owner-guide/voting-validators",
            from: [
              "/celo-gold-holder-guide/voting-validators",
              "/celo-holder-guide/voting-validators",
            ],
          },
          {
            to: "/celo-owner-guide/cusd",
            from: ["/celo-holder-guide/cusd"],
          },
          {
            to: "/celo-holder-guide/eth-recovery",
            from: ["/celo-owner-guide/eth-recovery"],
          },
          {
            to: "/celo-owner-guide/celo-recovery",
            from: ["/celo-holder-guide/celo-recovery"],
          },
          {
            to: "/developer-guide/overview",
            from: ["/v/master/developer-guide/overview"],
          },
          {
            to: "/developer-guide/start",
            from: ["/v/master/developer-guide/start"],
          },
          {
            to: "/cli/account",
            from: ["/cli/commands/account"],
          },
          {
            to: "/cli/autocomplete",
            from: ["/cli/commands/autocomplete"],
          },
          {
            to: "/cli/commands",
            from: ["/cli/commands/commands"],
          },
          {
            to: "/cli/config",
            from: ["/cli/commands/config"],
          },
          {
            to: "/cli/dkg",
            from: ["/cli/commands/dkg"],
          },
          {
            to: "/cli/election",
            from: ["/cli/commands/election"],
          },
          {
            to: "/cli/exchange",
            from: ["/cli/commands/exchange"],
          },
          {
            to: "/cli/governance",
            from: ["/cli/commands/governance"],
          },
          {
            to: "/cli/help",
            from: ["/cli/commands/help"],
          },
          {
            to: "/cli/identity",
            from: ["/cli/commands/identity"],
          },
          {
            to: "/cli/lockedgold",
            from: ["/cli/commands/lockedgold"],
          },
          {
            to: "/cli/multisig",
            from: ["/cli/commands/multisig"],
          },
          {
            to: "/cli/network",
            from: ["/cli/commands/network"],
          },
          {
            to: "/cli/node",
            from: ["/cli/commands/node"],
          },
          {
            to: "/cli/oracle",
            from: ["/cli/commands/oracle"],
          },
          {
            to: "/cli/plugins",
            from: ["/cli/commands/plugins"],
          },
          {
            to: "/cli",
            from: [
              "/cli/commands/registry",
              "/cli/registry",
            ],
          },
          {
            to: "/cli/releasegold",
            from: ["/cli/commands/releasegold"],
          },
          {
            to: "/cli/reserve",
            from: ["/cli/commands/reserve"],
          },
          {
            to: "/cli/rewards",
            from: ["/cli/commands/rewards"],
          },
          {
            to: "/cli/transfer",
            from: ["/cli/commands/transfer"],
          },
          {
            to: "/cli/validator",
            from: ["/cli/commands/validator"],
          },
          {
            to: "/cli/validatorgroup",
            from: ["/cli/commands/validatorgroup"],
          },
          {
            to: "/celo-codebase/protocol/odis/use-cases/phone-number-privacy",
            from: ["/celo-codebase/protocol/identity/phone-number-privacy"],
          },
          {
            to: "/celo-codebase/protocol/identity/smart-contract-accounts",
            from: ["/celo-codebase/protocol/identity/valora-accounts"],
          },
          // previous links before docs re-structure
          {
            to: "/wallet/mobile-wallet/run-local",
            from: "/celo-codebase/wallet/intro"
          },
          {
            to: "/wallet/celo-wallet/invitation",
            from: "/celo-codebase/wallet/how-the-wallet-works/invitations"
          },
          {
            to: "/wallet/celo-wallet/invitation",
            from: "/celo-codebase/wallet/how-the-wallet-works/invitations"
          },
          {
            to: "/wallet/celo-wallet/functionality",
            from: "/celo-codebase/wallet/how-the-wallet-works/README"
          },
          {
            to: "/wallet/celo-wallet/payment",
            from: "/celo-codebase/wallet/how-the-wallet-works/sending-and-requesting-payments"
          },
          {
            to: "/wallet/celo-wallet/node-sync",
            from: "/celo-codebase/wallet/how-the-wallet-works/ultralight-node-sync"
          },
          {
            to: "/wallet/celo-wallet/verification",
            from: "/celo-codebase/wallet/how-the-wallet-works/verification"
          },
          {
            to: "/protocol/plumo",
            from: "/celo-codebase/protocol/plumo"
          },
          {
            to: "/bridge/optics/index",
            from: "/celo-codebase/protocol/optics"
          },
          {
            to: "/protocol/index",
            from: "/celo-codebase/protocol/index"
          },
          {
            to: "/protocol/governance",
            from: "/celo-codebase/protocol/governance"
          },
          {
            to: "/protocol/transaction/erc20-transaction-fees",
            from: "/celo-codebase/protocol/transactions/erc20-transaction-fees"
          },
          {
            to: "/protocol/transaction/escrow",
            from: "/celo-codebase/protocol/transactions/escrow"
          },
          {
            to: "/protocol/transaction/full-node-incentives",
            from: "/celo-codebase/protocol/transactions/full-node-incentives"
          },
          {
            to: "/protocol/transaction/gas-pricing",
            from: "/celo-codebase/protocol/transactions/gas-pricing"
          },
          {
            to: "/protocol/transaction/index",
            from: "/celo-codebase/protocol/transactions/index"
          },
          {
            to: "/protocol/transaction/native-currency",
            from: "/celo-codebase/protocol/transactions/native-currency"
          },
          {
            to: "/protocol/transaction/tx-comment-encryption",
            from: "/celo-codebase/protocol/transactions/tx-comment-encryption"
          },
          {
            to: "/protocol/stability/adding-stable-assets",
            from: "/celo-codebase/protocol/stability/adding_stable_assets"
          },
          {
            to: "/protocol/stability/doto",
            from: "/celo-codebase/protocol/stability/doto"
          },
          {
            to: "/protocol/stability/granda-mento",
            from: "/celo-codebase/protocol/stability/granda-mento"
          },
          {
            to: "/protocol/stability/index",
            from: "/celo-codebase/protocol/stability/index"
          },
          {
            to: "/protocol/stability/oracles",
            from: "/celo-codebase/protocol/stability/oracles"
          },
          {
            to: "/protocol/stability/stability-fees",
            from: "/celo-codebase/protocol/stability/stability-fees"
          },
          {
            to: "/protocol/stability/tobin-tax",
            from: "/celo-codebase/protocol/stability/tobin-tax"
          },
          {
            to: "/protocol/pos/becoming-a-validator",
            from: "/celo-codebase/protocol/proof-of-stake/becoming-a-validator"
          },
          {
            to: "/protocol/pos/epoch-rewards-carbon-offsetting-fund",
            from: "/celo-codebase/protocol/proof-of-stake/carbon-offsetting-fund"
          },
          {
            to: "/protocol/pos/epoch-rewards-community-fund",
            from: "/celo-codebase/protocol/proof-of-stake/community-fund"
          },
          {
            to: "/protocol/pos/epoch-rewards",
            from: "/celo-codebase/protocol/proof-of-stake/epoch-rewards"
          },
          {
            to: "/protocol/pos/index",
            from: "/celo-codebase/protocol/proof-of-stake/index"
          },
          {
            to: "/protocol/pos/epoch-rewards-locked-gold",
            from: "/celo-codebase/protocol/proof-of-stake/locked-gold-rewards"
          },
          {
            to: "/protocol/pos/locked-gold",
            from: "/celo-codebase/protocol/proof-of-stake/locked-gold"
          },
          {
            to: "/protocol/pos/penalties",
            from: "/celo-codebase/protocol/proof-of-stake/penalties"
          },
          {
            to: "/protocol/pos/validator-elections",
            from: "/celo-codebase/protocol/proof-of-stake/validator-elections"
          },
          {
            to: "/protocol/pos/validator-groups",
            from: "/celo-codebase/protocol/proof-of-stake/validator-groups"
          },
          {
            to: "/protocol/pos/epoch-rewards-validator",
            from: "/celo-codebase/protocol/proof-of-stake/validator-rewards"
          },
          {
            to: "/protocol/oracle/band-protocol",
            from: "/celo-codebase/protocol/oracles/band-protocol-how-to"
          },
          {
            to: "/protocol/oracle/index",
            from: "/celo-codebase/protocol/oracles/oracles-on-celo"
          },
          {
            to: "/protocol/oracle/redstone",
            from: "/celo-codebase/protocol/oracles/redstone-protocol-how-to"
          },
          {
            to: "/protocol/identity/odis",
            from: "/celo-codebase/protocol/odis/index"
          },
          {
            to: "/protocol/identity/odis-use-case-key-hardening",
            from: "/celo-codebase/protocol/odis/use-cases/key-hardening"
          },
          {
            to: "/protocol/identity/odis-use-case-phone-number-privacy",
            from: "/celo-codebase/protocol/odis/use-cases/phone-number-privacy"
          },
          {
            to: "/protocol/identity/odis-domain",
            from: "/celo-codebase/protocol/odis/domains/index"
          },
          {
            to: "/protocol/identity/odis-domain-sequential-delay-domain",
            from: "/celo-codebase/protocol/odis/domains/sequential-delay-domain"
          },
          {
            to: "/protocol/identity/encrypted-cloud-backup",
            from: "/celo-codebase/protocol/identity/encrypted-cloud-backup"
          },
          {
            to: "/protocol/identity/index",
            from: "/celo-codebase/protocol/identity/index"
          },
          {
            to: "/protocol/identity/metadata",
            from: "/celo-codebase/protocol/identity/metadata"
          },
          {
            to: "/protocol/identity/privacy-research",
            from: "/celo-codebase/protocol/identity/privacy-research"
          },
          {
            to: "/protocol/identity/randomness",
            from: "/celo-codebase/protocol/identity/randomness"
          },
          {
            to: "/protocol/identity/smart-contract-accounts",
            from: "/celo-codebase/protocol/identity/smart-contract-accounts"
          },
          {
            to: "/protocol/consensus/index",
            from: "/celo-codebase/protocol/consensus/index"
          },
          {
            to: "/protocol/consensus/locating-nodes",
            from: "/celo-codebase/protocol/consensus/locating-nodes"
          },
          {
            to: "/protocol/consensus/ultralight-sync",
            from: "/celo-codebase/protocol/consensus/ultralight-sync"
          },
          {
            to: "/protocol/consensus/validator-set-differences",
            from: "/celo-codebase/protocol/consensus/validator-set-differences"
          },
          {
            to: "/protocol/bridge/etherscan-native-asset",
            from: "/celo-codebase/protocol/bridging/bridging-native-assets"
          },
          {
            to: "/protocol/bridge/index",
            from: "/celo-codebase/protocol/bridging/bridging-to-celo"
          },
          {
            to: "/protocol/bridge/etherscan-token",
            from: "/celo-codebase/protocol/bridging/bridging-tokens-with-etherscan"
          },
          {
            to: "/protocol/bridge/optics-migration-v2",
            from: "/celo-codebase/protocol/bridging/migrating-to-optics-v2"
          },
          {
            to: "/protocol/bridge/optics-faq",
            from: "/celo-codebase/protocol/bridging/optics-bridge-faq"
          },
          {
            to: "/protocol/bridge/optics-gui-kr",
            from: "/celo-codebase/protocol/bridging/optics-gui-kr"
          },
          {
            to: "/protocol/bridge/optics-gui-zh-cn",
            from: "/celo-codebase/protocol/bridging/optics-gui-zh_cn"
          },
          {
            to: "/protocol/bridge/optics-gui",
            from: "/celo-codebase/protocol/bridging/optics-gui"
          },
          {
            to: "/holder/manage/exchange",
            from: "/celo-holder-guide/celo-exchange-bot"
          },
          {
            to: "/holder/recover/from-celo-address",
            from: "/celo-holder-guide/celo-recovery"
          },
          {
            to: "/wallet/ledger/to-celo-terminal",
            from: "/celo-holder-guide/connecting-ledger-celo-terminal-wallet"
          },
          {
            to: "/wallet/ledger/to-celo-web",
            from: "/celo-holder-guide/connecting-ledger-celo-web-wallet"
          },
          {
            to: "/wallet/ledger/to-celo-cli",
            from: "/celo-holder-guide/connecting-ledger-celocli"
          },
          {
            to: "/holder/manage/asset",
            from: "/celo-holder-guide/cusd"
          },
          {
            to: "/holder/recover/from-eth-address",
            from: "/celo-holder-guide/eth-recovery"
          },
          {
            to: "/holder/vote/governance-parameters",
            from: "/celo-holder-guide/governance-cheat-sheet"
          },
          {
            to: "/wallet/ledger/setup",
            from: "/celo-holder-guide/ledger"
          },
          {
            to: "/holder/index",
            from: "/celo-holder-guide/owners"
          },
          {
            to: "/holder/manage/self-custody",
            from: "/celo-holder-guide/quick-start"
          },
          {
            to: "/holder/manage/release-gold",
            from: "/celo-holder-guide/release-gold"
          },
          {
            to: "/holder/vote/governance",
            from: "/celo-holder-guide/voting-governance"
          },
          {
            to: "/holder/vote/validator",
            from: "/celo-holder-guide/voting-validators"
          },
          {
            to: "/developer/setup/mac",
            from: "/developer-resources/using-mac"
          },
          {
            to: "/developer/setup/wallet",
            from: "/developer-resources/testnet-wallet"
          },
          {
            to: "/developer/index",
            from: "/developer-resources/overview"
          },
          {
            to: "/developer/setup/windows",
            from: "/developer-resources/develop-on-windows"
          },
          {
            to: "/developer/deploy/truffle",
            from: "/developer-resources/deploy-truffle"
          },
          {
            to: "/developer/setup/replit",
            from: "/developer-resources/deploy-replit"
          },
        ],
      },
    ],
    [
      "ideal-image",
      /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
      ({
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true,
      }),
    ],
  ],
  themeConfig: {
    announcementBar: {
      id: "support_us",
      content:
        '🌱 If you like Celo, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/celo-org/celo-monorepo">GitHub</a> and follow <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/CeloDevs">@CeloDevs</a> and <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/CeloOrg">@CeloOrg </a> 🌱',
      backgroundColor: "#18191A",
      textColor: "#ffffff",
      isCloseable: false,
    },
    docs: {
      sidebar: { hideable: true },
    },
    prism: {
      additionalLanguages: ["solidity"],
      theme: require("prism-react-renderer/themes/dracula"),
    },
    colorMode: {
      defaultMode: "dark",
    },
    navbar: {
      title: "Celo Docs",
      logo: {
        alt: "Celo Logo",
        src: "img/color-logo.png",
      },
      items: [
        // {
        //     "to": "welcome",
        //     "label": "Basics",
        //     "position": "left"
        // },
        {
          to: "developer/",
          label: "Developers",
          position: "left",
        },
        {
          to: "validator/",
          label: "Validators",
          position: "left",
        },
        {
          to: "integration/",
          label: "Integrations",
          position: "left",
        },
        // {
        //   to: "/community/contributing",
        //   label: "Stake",
        //   position: "left",
        // },
        // {
        //   to: "/blog",
        //   label: "Learn",
        //   position: "left",
        // },
        { to: "showcase", label: "Showcase", position: "left" },
        {
          to: "/blog",
          label: "Tutorials",
          position: "left",
        },
        // {
        //   type: "dropdown",
        //   position: "left",
        //   label: "Tutorials",
        //   items: [
        //     {
        //       label: "Code Tutorials",
        //       to: "blog",
        //     },
        //     {
        //       label: "Developer Blog",
        //       to: "https://medium.com/celodevelopers/",
        //     },
        //     {
        //       label: "EVM Basics",
        //       to: "https://ethereum.org/en/developers/docs/",
        //     },
        //     {
        //       label: "Celo Blog",
        //       to: "https://medium.com/celoorg",
        //     },
        //     {
        //       label: "Figment",
        //       to: "https://learn.figment.io/protocols/celo",
        //     },
        //     {
        //       label: "Dacade",
        //       to: "https://dacade.org/communities/celo",
        //     },
        //   ],
        // },
        {
          type: "localeDropdown",
          position: "right",
          dropdownItemsAfter: [
            {
              to: "https://celo.crowdin.com/",
              label: "Help us translate",
            },
          ],
        },
        {
          type: "dropdown",
          position: "right",
          label: "Support",
          items: [
            {
              to: "https://forum.celo.org/",
              label: "View the Forum",
            },
            {
              to: "https://github.com/celo-org/docs/issues/new",
              label: "Create an Issue",
            },
          ],
        },
        {
          type: "dropdown",
          position: "right",
          label: "APIs & SDKs",
          items: [
            { to: "cli/", label: "CLI" },
            {
              to: "https://celo-sdk-docs.readthedocs.io/en/latest/",
              label: "SDK",
            },
            {
              to: "https://github.com/heymateag/celoiossdk",
              label: "iOS",
            },
            {
              to: "https://github.com/blaize-tech/celo-sdk-java",
              label: "Java",
            },
            { to: "https://github.com/celo-org/react-celo", label: "React" },
            { to: "https://docs.flutter.dev/", label: "Flutter" },
            {
              to: "https://github.com/blaize-tech/celo-sdk-py/",
              label: "Python",
            },
            {
              to:
                "https://github.com/celo-org/celo-monorepo/tree/master/packages/sdk/contractkit",
              label: "JavaScript",
            },
            {
              to:
                "https://github.com/celo-org/celo-composer/tree/main/packages/react-native-app",
              label: "React Native",
            },
            {
              label: "Celo Composer",
              to: "https://github.com/celo-org/celo-composer#celo-composer",
            },
          ],
        },
        {
          href: "https://github.com/celo-org",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    algolia: {
      appId: "55M4I38S60",
      apiKey: "baed78b52be14ac907688f1dd70b41d5",
      indexName: "celo",
      contextualSearch: true,
      debug: false,
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Home",
              to: "/",
            },
            // {
            //   label: "Blog",
            //   to: "/blog",
            // },
            // {
            //   href: "https://celo.crowdin.com/celo-docs",
            //   label: "Help translate",
            // },
            {
              label: "Docs GitHub",
              href: "https://github.com/celo-org/docs",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              href: "/community/contributing",
              label: "Contributors",
            },
            {
              label: "Forum",
              href: "https://forum.celo.org/",
            },
            {
              label: "Discord",
              href: "https://chat.celo.org",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/CeloOrg",
            },
            {
              label: "Reddit",
              href: "https://www.reddit.com/r/celo/",
            },
            {
              label: "Celo GitHub",
              href: "https://github.com/celo-org",
            },
          ],
        },
        {
          title: "Ecosystem",
          items: [
            {
              label: "Celo Foundation",
              href: "https://celo.org",
            },
            {
              label: "Medium Blog",
              href: "https://medium.com/celoorg",
            },
            {
              label: "The Celo",
              href: "https://thecelo.com/",
            },
            {
              label: "Celo Hub",
              href: "https://celohub.org/",
            },
            {
              label: "Careers",
              href: "https://celo.org/jobs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Celo Foundation, Inc. Built with Docusaurus.`,
    },
    fathomAnalytics: {
      siteId: "AZMFWALB",
    },
    hubspot: {
      accountId: 8568019,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/celo-org/docs/edit/main/",
          editUrl: ({ locale, versionDocsDirPath, docPath }) => {
            // Link to Crowdin for French docs
            if (locale !== DefaultLocale) {
              return `https://celo.crowdin.com/celo-docs/${locale}`;
            }
            // Link to Github for English docs
            return `https://github.com/celo-org/docs/edit/main/docs/${docPath}`;
          },
          routeBasePath: "/",
          remarkPlugins: [
            math,
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
            require("mdx-mermaid"),
          ],
          rehypePlugins: [katex],
        },
        gtag: {
          // You can also use your "G-" Measurement ID here.
          trackingID: "G-0CXEKQ81V2",
          // Optional fields.
          anonymizeIP: true, // Should IPs be anonymized?
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        // blog: {
        //   blogTitle: "Celo Tutorials",
        //   blogSidebarTitle: "All posts",
        //   // blogSidebarCount: "ALL",
        //   showReadingTime: false,
        //   blogListComponent: require.resolve(
        //     "./src/components/CustomBlogListPage.module.tsx"
        //   ),
        //   readingTime: ({ content, frontMatter, defaultReadingTime }) =>
        //     // allows per post reading time override in frontmatter
        //     frontMatter.hide_reading_time
        //       ? undefined
        //       : defaultReadingTime({
        //           content,
        //           options: { wordsPerMinute: 300 },
        //         }),
        // },
        blog: {
          blogTitle: 'Celo Tutorials',
          blogDescription: 'A Docusaurus powered blog!',
          postsPerPage: 'ALL',
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
};
