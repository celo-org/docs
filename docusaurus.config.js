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
                      to: '/celo-holder-guide/ledger.md',
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
                          'celo-owner-guide/ledger'
                    ]
                  },
                  {
                    to: '/getting-started/running-a-full-node-in-baklava',
                    from: [
                        '/getting-started/running-a-full-node',
                        '/getting-started/running-a-validator'
                    ],
                },
                {
                    to: '/getting-started/using-the-mobile-wallet',
                    from: ['/getting-started/using-the-wallet'],
                },
                {
                    to: '/celo-holder-guide/release-gold',
                    from: [
                        '/celo-codebase/protocol/release-gold',
                        'celo-owner-guide/release-gold'
                    ]
                },
                {
                    to: '/celo-holder-guide/voting-governance',
                    from: '/validator-guide/governance',
                },
                {
                    to: '/developer-resources/walkthroughs/hello-mobile-dapp',
                    from: ['/developer-guide/start/celo-truffle-box'],
                },
                {
                    to: '/developer-resources/overview',
                    from: ['/developer-guide/overview/introduction'],
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
                    to: '/getting-started/running-a-full-node-in-mainnet',
                    from: ['/getting-started/rc1/running-a-full-node-in-rc1'],
                },
                {
                    to: '/getting-started/running-a-validator-in-mainnet',
                    from: ['/getting-started/rc1/running-a-validator-in-rc1'],
                },
                {
                    to: '/celo-holder-guide/quick-start',
                    from: [
                        '/celo-gold-holder-guide/quick-start',
                        'celo-owner-guide/quick-start'
                    ],
                },
                {
                    to: '/celo-holder-guide/release-gold',
                    from: ['/celo-gold-holder-guide/release-gold'],
                },
                {
                    to: 'celo-holder-guide/voting-governance',
                    from: [
                        'celo-gold-holder-guide/voting-governance',
                        'celo-owner-guide/voting-governance'
                    ],
                },
                {
                    to: 'celo-holder-guide/voting-validators',
                    from: [
                        'celo-gold-holder-guide/voting-validators',
                        'celo-owner-guide/voting-validators'
                    ],
                },
                {
                    to: 'celo-holder-guide/cusd',
                    from: ['celo-owner-guide/cusd'],
                },
                {
                    to: 'celo-holder-guide/eth-recovery',
                    from: [
                        'celo-owner-guide/eth-recovery'
                    ],
                },
              ],
            },
        ]
    ]
};
