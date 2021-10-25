/** @type {import('@docusaurus/types').DocusaurusConfig} */
const path = require('path');
const math = require('remark-math');
const katex = require('rehype-katex');
const DefaultLocale = 'en';

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
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'es']
    },
    plugins: [
        require.resolve('docusaurus-plugin-fathom'),
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
                {
                    to: '/developer-guide/overview',
                    from: [
                        '/v/master/developer-guide/overview'
                    ]
                },
                {
                    to: '/developer-guide/start',
                    from: [
                        '/v/master/developer-guide/start'
                    ]
                },
                {
                    to: '/command-line-interface/account',
                    from: [
                        '/command-line-interface/commands/account',
                    ]
                },
                {
                    to: '/command-line-interface/autocomplete',
                    from: [
                        '/command-line-interface/commands/autocomplete',
                    ]
                },
                {
                    to: '/command-line-interface/commands',
                    from: [
                        '/command-line-interface/commands/commands',
                    ]
                },    
                {
                    to: '/command-line-interface/config',
                    from: [
                        '/command-line-interface/commands/config',
                    ]
                },   
                {
                    to: '/command-line-interface/dkg',
                    from: [
                        '/command-line-interface/commands/dkg',
                    ]
                },   
                {
                    to: '/command-line-interface/election',
                    from: [
                        '/command-line-interface/commands/election',
                    ]
                },   
                {
                    to: '/command-line-interface/exchange',
                    from: [
                        '/command-line-interface/commands/exchange',
                    ]
                },
                {
                    to: '/command-line-interface/governance',
                    from: [
                        '/command-line-interface/commands/governance',
                    ]
                },
                {
                    to: '/command-line-interface/help',
                    from: [
                        '/command-line-interface/commands/help',
                    ]
                },
                {
                    to: '/command-line-interface/identity',
                    from: [
                        '/command-line-interface/commands/identity',
                    ]
                },
                {
                    to: '/command-line-interface/lockedgold',
                    from: [
                        '/command-line-interface/commands/lockedgold',
                    ]
                },
                {
                    to: '/command-line-interface/multisig',
                    from: [
                        '/command-line-interface/commands/multisig',
                    ]
                },     
                {
                    to: '/command-line-interface/network',
                    from: [
                        '/command-line-interface/commands/network',
                    ]
                },    
                {
                    to: '/command-line-interface/node',
                    from: [
                        '/command-line-interface/commands/node',
                    ]
                },    
                {
                    to: '/command-line-interface/oracle',
                    from: [
                        '/command-line-interface/commands/oracle',
                    ]
                },    
                {
                    to: '/command-line-interface/plugins',
                    from: [
                        '/command-line-interface/commands/plugins',
                    ]
                },    
                {
                    to: '/command-line-interface/registry',
                    from: [
                        '/command-line-interface/commands/registry',
                    ]
                },    
                {
                    to: '/command-line-interface/releasegold',
                    from: [
                        '/command-line-interface/commands/releasegold',
                    ]
                },                  
                {
                    to: '/command-line-interface/reserve',
                    from: [
                        '/command-line-interface/commands/reserve',
                    ]
                },  
                {
                    to: '/command-line-interface/rewards',
                    from: [
                        '/command-line-interface/commands/rewards',
                    ]
                },  
                {
                    to: '/command-line-interface/transfer',
                    from: [
                        '/command-line-interface/commands/transfer',
                    ]
                },  
                {
                    to: '/command-line-interface/validator',
                    from: [
                        '/command-line-interface/commands/validator',
                    ]
                },  
                {
                    to: '/command-line-interface/validatorgroup',
                    from: [
                        '/command-line-interface/commands/validatorgroup',
                    ]
                },                                                                                      
              ],
            },
        ]
    ],
    themeConfig: {
        prism: {
            theme: require('prism-react-renderer/themes/dracula'),
        },
        navbar: {
            title: "Celo Docs",
            logo: {
                alt: "Celo Logo",
                src: "img/logo.png",
            },
            items: [
                {
                    type: 'localeDropdown',
                    position: 'left',
                    dropdownItemsAfter: [
                    {
                        to: 'https://celo.crowdin.com/',
                        label: 'Help us translate',
                    },
                    ],
                },
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
        gtag: {
            // You can also use your "G-" Measurement ID here.
            trackingID: 'G-0CXEKQ81V2',
            // Optional fields.
            anonymizeIP: true, // Should IPs be anonymized?
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
                    },
                    {
                        href: "https://celo.crowdin.com/celo-docs",
                        label: "Help translate"
                    },
                ]},
                {
                    title: "Community",
                    items: [{
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
                            href: "https://www.reddit.com/r/celo/"
                        },
                        {
                            label: "GitHub",
                            href: "https://github.com/celo-org"
                        }
                    ],
                },
                {
                    title: "Ecosystem",
                    items: [{
                        label: "Celo Foundation",
                        href: "https://celo.org"
                    },
                    {
                        label: "Blog",
                        href: "https://medium.com/celoorg"
                    },
                    {
                        label: "The Celo",
                        href: "https://thecelo.com/"
                    },
                    {
                        label: "Celo Hub",
                        href: "https://celohub.org/"
                    },
                    {
                        label: "Careers",
                        href: "https://celo.org/jobs"
                    }
                ]
                }
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Celo Foundation, Inc. Built with Docusaurus.`,
        },
        fathomAnalytics: {
            siteId: 'AZMFWALB'
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
                    editUrl: ({locale, versionDocsDirPath, docPath}) => {
                        // Link to Crowdin for French docs
                        if (locale !== DefaultLocale) {
                          return `https://celo.crowdin.com/celo-docs/${locale}`;
                        }
                        // Link to Github for English docs
                        return `https://github.com/celo-org/docs/edit/main/docs/${docPath}`
                    },
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
};
