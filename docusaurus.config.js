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
      id: "support_us",
      content:
        '🌱 Want to improve the docs? Give it a star on Github, <a target="_blank" rel="noopener noreferrer" href="https://github.com/celo-org/docs/issues/new">suggest an improvement</a>, or contribute as a <a target="_blank" rel="noopener noreferrer" href="/community/celo-sage">Celo Sage</a> 🌱',
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
      respectPrefersColorScheme: true,
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
        { to: "showcase", label: "DApps", position: "left" },
        {
          to: "/tutorials",
          label: "Tutorials",
          position: "left",
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
        {
          type: "dropdown",
          position: "right",
          label: "Libraries & SDKs",
          items: [
            { to: "cli/", label: "CLI" },
            {
              to: "https://celo-sdk-docs.readthedocs.io/en/latest/",
              label: "Celo SDK",
            },
            {
              to: "/developer/react-celo",
              label: "React-Celo",
            },
            {
              to: "/developer/contractkit",
              label: "ContractKit",
            },
            {
              to: "/developer/rainbowkit-celo",
              label: "Rainbowkit-Celo",
            },
            {
              to: "https://github.com/heymateag/celoiossdk",
              label: "iOS SDK",
            },
            {
              to: "https://github.com/blaize-tech/celo-sdk-java",
              label: "Java SDK",
            },
            {
              to: "https://github.com/blaize-tech/celo-sdk-py/",
              label: "Python SDK",
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
        blog: {
          blogTitle: "Celo Tutorials",
          blogDescription: "Celo blog!",
          blogSidebarCount: 0,
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            frontMatter.hide_reading_time
              ? undefined
              : defaultReadingTime({ content }),
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
