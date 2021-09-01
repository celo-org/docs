/** @type {import('@docusaurus/types').DocusaurusConfig} */
const path = require("path");
const math = require("remark-math");
const katex = require("rehype-katex");

module.exports = {
  title: "Celo Docs",
  tagline: "Documentation for the Celo Platform",
  url: "https://docs.celo.org",
  baseUrl: "/",
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.png",
  organizationName: "celo-org", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Celo Docs",
      logo: {
        alt: "Celo Logo",
        src: "img/logo.png",
      },
      items: [
        {
          href: "https://celo.org",
          label: "Celo Home",
        },
        {
          href: "https://celo.org/build",
          label: "Build",
        },
        {
          href: "https://celo.org/build/faucet",
          label: "Faucet",
        },
        {
          href: "https://github.com/celo-org/docs",
          label: "GitHub",
          position: "right",
        },
      ],
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
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/celo",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Celo Foundatio, Inc. Built with Docusaurus.`,
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
          routeBasePath: "/",
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
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
  plugins: [
    path.resolve(__dirname, "src/plugins/aliases.ts"),
    [
      "docusaurus-plugin-typedoc",
      {
        id: "base",
        entryPoints: ["celo-monorepo/packages/sdk/base/src/index.ts"],
        tsconfig: "celo-monorepo/packages/sdk/base/tsconfig.json",
        out: "sdk/base-docs",
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "connect",
        entryPoints: ["celo-monorepo/packages/sdk/connect/src/index.ts"],
        tsconfig: "celo-monorepo/packages/sdk/connect/tsconfig.json",
        out: "sdk/connect-docs",
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "contractkit",
        entryPoints: ["celo-monorepo/packages/sdk/contractkit/src/index.ts"],
        tsconfig: "celo-monorepo/packages/sdk/contractkit/tsconfig.json",
        out: "sdk/contractkit-docs",
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "explorer",
        entryPoints: ["celo-monorepo/packages/sdk/explorer/src/index.ts"],
        tsconfig: "celo-monorepo/packages/sdk/explorer/tsconfig.json",
        out: "sdk/explorer-docs",
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "governance",
        entryPoints: ["celo-monorepo/packages/sdk/governance/src/index.ts"],
        tsconfig: "celo-monorepo/packages/sdk/governance/tsconfig.json",
        out: "sdk/governance-docs",
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "identity",
        entryPoints: ["celo-monorepo/packages/sdk/identity/src/index.ts"],
        tsconfig: "celo-monorepo/packages/sdk/identity/tsconfig.json",
        out: "sdk/identity-docs",
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "keystores",
        entryPoints: ["celo-monorepo/packages/sdk/keystores/src/index.ts"],
        tsconfig: "celo-monorepo/packages/sdk/keystores/tsconfig.json",
        out: "sdk/keystores-docs",
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "network-utils",
        entryPoints: ["celo-monorepo/packages/sdk/network-utils/src/index.ts"],
        tsconfig: "celo-monorepo/packages/sdk/network-utils/tsconfig.json",
        out: "sdk/network-utils-docs",
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "transactions-uri",
        entryPoints: [
          "celo-monorepo/packages/sdk/transactions-uri/src/index.ts",
        ],
        tsconfig: "celo-monorepo/packages/sdk/transactions-uri/tsconfig.json",
        out: "sdk/transactions-uri-docs",
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "utils",
        entryPoints: ["celo-monorepo/packages/sdk/utils/src/index.ts"],
        tsconfig: "celo-monorepo/packages/sdk/utils/tsconfig.json",
        out: "sdk/utils-docs",
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "wallet-base",
        entryPoints: [
          "celo-monorepo/packages/sdk/wallets/wallet-base/src/index.ts",
        ],
        tsconfig:
          "celo-monorepo/packages/sdk/wallets/wallet-base/tsconfig.json",
        out: "sdk/wallet-base-docs",
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "wallet-hsm",
        entryPoints: [
          "celo-monorepo/packages/sdk/wallets/wallet-hsm/src/index.ts",
        ],
        tsconfig: "celo-monorepo/packages/sdk/wallets/wallet-hsm/tsconfig.json",
        out: "sdk/wallet-hsm-docs",
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "wallet-hsm-aws",
        entryPoints: [
          "celo-monorepo/packages/sdk/wallets/wallet-hsm-aws/src/index.ts",
          // 'celo-monorepo/packages/sdk/wallets/wallet-hsm-azure/src/index.ts',
          // 'celo-monorepo/packages/sdk/wallets/wallet-ledger/src/index.ts',
          // 'celo-monorepo/packages/sdk/wallets/wallet-local/src/index.ts',
          // 'celo-monorepo/packages/sdk/wallets/wallet-remote/src/index.ts',
          // 'celo-monorepo/packages/sdk/wallets/wallet-rpc/src/index.ts',
          // 'celo-monorepo/packages/sdk/wallets/wallet-walletconnect/src/index.ts',
        ],
        tsconfig:
          "celo-monorepo/packages/sdk/wallets/wallet-hsm-aws/tsconfig.json",
        out: "sdk/wallet-hsm-aws-docs",
      },
    ],
  ],
};
