/** @type {import('@docusaurus/types').DocusaurusConfig} */
const path = require('path');
const math = require('remark-math');
const katex = require('rehype-katex');

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
            items: [{
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
        algolia: {
            apiKey: 'a55b84f8b98dc5edd71d11cf4e42434e',
            indexName: 'celo',
            contextualSearch: false,
            debug: false
        },
        footer: {
            style: "dark",
            links: [{
                    title: "Docs",
                    items: [{
                        label: "Home",
                        to: "/",
                    }, ],
                },
                {
                    title: "Community",
                    items: [{
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
            copyright: `Copyright © ${new Date().getFullYear()} Celo Foundation, Inc. Built with Docusaurus.`,
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
    stylesheets: [{
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
        integrity: 'sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc',
        crossorigin: 'anonymous',
    }],
    plugins: [
        path.resolve(__dirname, 'src/plugins/aliases.ts'),
        [
            '@docusaurus/plugin-client-redirects',
            {
              redirects: [
                  {
                      to: '/celo-owner-guide/ledger',
                      from: [
                          '/operations-manual/key-management/using-a-ledger-wallet',
                          '/operations-manual/key-management/ledger',
                          '/operations-manual/summary/ledger',
                          '/operations-manual/using-a-ledger-wallet',
                          '/validator-guide/key-management/using-a-ledger-wallet',
                          '/validator-guide/key-management/ledger',
                          '/validator-guide/summary/ledger',
                          '/validator-guide/using-a-ledger-wallet',
                          '/celo-gold-holder-guide/ledger',
                    ]
                  },
                  {
                    to: '/getting-started/baklava-testnet/running-a-full-node-in-baklava',
                    from: [
                        '/getting-started/running-a-full-node',
                        '/getting-started/running-a-validator',
                        '/getting-started/running-a-full-node-in-baklava'
                    ],
                },
                {
                    to: '/getting-started/using-the-wallet',
                    from: [
                        '/getting-started/using-the-mobile-wallet',
                    ],
                },
                {
                    to: '/celo-owner-guide/release-gold', 
                    from: [
                        '/celo-codebase/protocol/release-gold',
                        '/celo-holder-guide/release-gold',
                        '/celo-gold-holder-guide/release-gold',
                    ]
                },
                {
                    to: '/developer-guide/start/hello-mobile', 
                    from: [
                        '/developer-guide/start/celo-truffle-box',
                        '/developer-resources/walkthroughs/hello-mobile-dapp',
                    ],
                },
                {
                    to: '/developer-guide/overview',
                    from: [
                        '/developer-guide/overview/introduction',
                        '/developer-resources/overview',
                    ],
                },
                {
                    to: '/developer-guide/development-chain',
                    from: ['/developer-guide/start/development-chain'],
                },
                {
                    to: '/important-information/mainnet-network-disclaimer',
                    from: ['/important-information/rc-network-disclaimer'],
                },
                {
                    to: '/getting-started/mainnet',
                    from: ['/getting-started/rc1'],
                },
                {
                    to: '/getting-started/mainnet/running-a-full-node-in-mainnet',
                    from: [
                        '/getting-started/rc1/running-a-full-node-in-rc1',
                        '/getting-started/running-a-full-node-in-mainnet',
                    ],
                },
                {
                    to: '/getting-started/mainnet/running-a-validator-in-mainnet',
                    from: [
                        '/getting-started/rc1/running-a-validator-in-rc1',
                        '/getting-started/running-a-validator-in-mainnet',
                    ],
                },
                {
                    to: '/celo-owner-guide/quick-start', 
                    from: [
                        '/celo-gold-holder-guide/quick-start',
                        '/celo-holder-guide/quick-start',
                    ],
                },
                {
                    to: '/celo-owner-guide/voting-governance',
                    from: [
                        '/celo-gold-holder-guide/voting-governance',
                        '/celo-holder-guide/voting-governance',
                    ],
                },
                {
                    to: '/celo-owner-guide/voting-validators',
                    from: [
                        '/celo-gold-holder-guide/voting-validators',
                        '/celo-holder-guide/voting-validators',
                    ],
                },
                {
                    to: '/celo-owner-guide/cusd',
                    from: ['/celo-holder-guide/cusd'],
                },
                {
                    to: '/celo-owner-guide/eth-recovery',
                    from: [
                        '/celo-holder-guide/eth-recovery'
                    ],
                },
                {
                    to: '/celo-owner-guide/celo-recovery',
                    from: [
                        '/celo-holder-guide/celo-recovery'
                    ],
                },
              ],
            },
        ]
    ]
};
