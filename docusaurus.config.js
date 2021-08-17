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
    stylesheets: [{
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
        integrity: 'sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc',
        crossorigin: 'anonymous',
    }],
    plugins: [
        path.resolve(__dirname, 'src/plugins/aliases.ts'),
    ]
};