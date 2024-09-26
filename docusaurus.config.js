/** @type {import('@docusaurus/types').DocusaurusConfig} */
const path = require("path");
const math = require("remark-math");
const katex = require("rehype-katex");
const DefaultLocale = "en";

module.exports = {
  title: "Celo Documentation",
  tagline: "Documentation for the Celo platform.",
  url: "https://docs.celo.org",
  baseUrl: "/",
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  onBrokenAnchors: "throw",
  favicon: "img/color-favicon.png",
  organizationName: "celo-org", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  themes: [
    "@docusaurus/theme-live-codeblock",
    "@saucelabs/theme-github-codeblock",
  ],
  scripts: [
    // {
    //   src: "https://cdnjs.cloudflare.com/ajax/libs/web3/1.6.0/web3.min.js",
    //   async: true,
    // },
  ],
  plugins: [
    require.resolve("docusaurus-plugin-hubspot"),
    require.resolve("docusaurus-plugin-fathom"),
    path.resolve(__dirname, "src/plugins/aliases.ts"),
    path.resolve(__dirname, "src/plugins/web3-polyfill.ts"),
    // [
    //   "@docusaurus/plugin-client-redirects",
    //   {
    //     redirects: [],
    //   },
    // ],
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true,
      },
    ],
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
  themeConfig: {
    twitterImage: "img/preview.png",
    image: "img/preview.png",
    announcementBar: {
      id: "request_tokens",
      content:
        'Alfajores L2 Testnet is live! Full node operators: <a target="_blank" rel="noopener noreferrer" href="/cel2">Upgrade your nodes</a> now.',
      backgroundColor: "#18191A",
      textColor: "#ffffff",
      isCloseable: false,
    },
    docs: {
      sidebar: { hideable: true },
    },
    prism: {
      additionalLanguages: ["solidity", "bash", "diff"],
      theme: require("prism-react-renderer").themes.dracula,
    },
    mermaid: { theme: "dark" },
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "Celo Docs",
      logo: {
        alt: "Celo Logo",
        src: "img/logo.png",
        srcDark: "img/logo-dark.png",
        height: 32,
        width: 96,
      },
      items: [
        {
          to: "/general",
          label: "What is Celo",
          position: "left",
        },
        {
          to: "build/",
          label: "Build on Celo",
          position: "left",
        },
        {
          to: "developer/",
          label: "Developer Resources",
          position: "left",
        },
        {
          to: "cel2/",
          label: "Celo L2",
          position: "left",
        },
        {
          type: "dropdown",
          label: "More",
          position: "left",
          items: [
            // {
            //   to: "validator/",
            //   label: "Validators",
            // },
            {
              to: "holder/",
              label: "Holder",
            },
            {
              to: "cli/",
              label: "CLI",
            },
            {
              to: "protocol/",
              label: "Protocol",
            },
            // {
            //   to: "integration/",
            //   label: "Integrations",
            // },
            {
              to: "https://www.celopg.eco/ecosystem",
              label: "Ecosystem",
              target: "_blank",
            },
            {
              to: "https://celo.org",
              label: "Celo Website",
              target: "_blank",
            },
            // { to: "showcase", label: "DApps" },
            // {
            //   to: "community/guidelines",
            //   label: "Community",
            // },
          ],
        },
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
              label: "Leave Feedback",
            },
          ],
        },
        // {
        //   type: "dropdown",
        //   position: "right",
        //   label: "Libraries & SDKs",
        //   items: [
        //     { to: "cli/", label: "CLI" },
        //     {
        //       to: "/developer/viem",
        //       label: "Viem",
        //     },
        //     {
        //       to: "/developer/react-celo",
        //       label: "React-Celo",
        //     },
        //     {
        //       to: "/developer/contractkit",
        //       label: "ContractKit",
        //     },
        //     {
        //       to: "/developer/rainbowkit-celo",
        //       label: "Rainbowkit-Celo",
        //     },
        //     {
        //       to: "/developer/web3modal",
        //       label: "Web3Modal SDK",
        //     },
        //     {
        //       to: "https://github.com/heymateag/celoiossdk",
        //       label: "iOS SDK",
        //     },
        //     {
        //       label: "Celo Composer",
        //       to: "https://github.com/celo-org/celo-composer#celo-composer",
        //     },
        //   ],
        // },
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
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Home",
              to: "/",
            },
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
              href: "/community/guidelines",
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
              href: "https://share.hsforms.com/1Qrhush1vSA2WIamd_yL4ow53n4j",
              label: "Celo Signal Mailing List",
            },
            {
              href: "https://calendar.google.com/calendar/u/0/embed?src=c_9su6ich1uhmetr4ob3sij6kaqs@group.calendar.google.com",
              label: "Celo Signal Calendar",
            },
            {
              href: "https://calendar.google.com/calendar/u/0/r?cid=c_asn0b4c1emdgsq3urlh2ei2dig@group.calendar.google.com",
              label: "Community Calendar",
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
              href: "https://celo.org/careers",
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
        blog: false,
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
