const {
  Agile,
  generateId,
  createState,
  createCollection,
  createComputed,
} = require('@agile-ts/core');
const {
  AgileHOC,
  useAgile,
  useWatcher,
  useProxy,
  useSelector,
  useValue,
} = require('@agile-ts/react');
const { Event, useEvent } = require('@agile-ts/event');
const { toast } = require('react-toastify');

const githubOrgUrl = 'https://github.com/agile-ts';
const domain = 'https://agile-ts.org';
const npmOrgUrl = 'https://www.npmjs.com/package/@agile-ts';

const customFields = {
  copyright: `Made with  💜  in Germany     |    Copyright © 2020-${new Date().getFullYear()} <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/DevBenno">BennoDev</a>`,
  meta: {
    title: 'An atom based state manager for JavaScript apps.',
    image: '/img/meta.png',
    description:
      'A global State and Logic Library implemented in Typescript, ' +
      'offering a reimagined API that focuses on developer experience. ' +
      'AgileTs is a more straightforward alternative to Redux ' +
      'and allows you to easily manage your application States in React, Vue and plain Javascript.',
    color: '#6c69a0',
    keywords: [
      'state management',
      'react',
      'state',
      'react state management',
      'react native state management',
      'react state',
      'typescript',
      'react state management without redux',
      'vue',
      'webdev',
      'redux',
      'recoil',
      'mobx',
      'javascript',
      'software',
      'coding',
      'development',
      'engineering',
    ],
  },
  domain,
  githubOrgUrl,
  githubUrl: `${githubOrgUrl}/agile`,
  githubDocsUrl: `${githubOrgUrl}/documentation`,
  npmCoreUrl: `${npmOrgUrl}/core`,
  discordUrl: `https://discord.gg/T9GzreAwPH`,
  stackoverflowUrl: 'https://stackoverflow.com/questions/tagged/agile-ts',
  twitterUrl: 'https://twitter.com/AgileFramework',
  redditUrl: 'https://www.reddit.com/r/AgileTs/',
  version: '0.0.1',
  announcementBar: {
    id: 'announcement',
    content: [
      `❓ If you have any questions, don't hesitate to join our <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/T9GzreAwPH">Community Discord</a> ️`,
      `🎉 If you like AgileTs, give us a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/agile-ts/agile">GitHub</a>`,
      `⏰ If you want to stay update to date, follow use on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/AgileTypescript">Twitter</a>`,
    ],
    random: false,
    interval: 100000,
  },
  liveCodeScope: {
    Agile,
    createState,
    createCollection,
    createComputed,
    useAgile,
    useProxy,
    useEvent,
    useWatcher,
    useSelector,
    useValue,
    AgileHOC,
    generateId,
    Event,
    toast,
  },
};

const config = {
  title: 'AgileTs',
  tagline: 'AgileTs is a global, flexible, spacy State and Logic Library',
  url: customFields.domain,
  baseUrlIssueBanner: false,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'AgileTs',
  projectName: 'https://github.com/agile-ts/agile/',
  themes: ['@docusaurus/theme-live-codeblock'],
  scripts: [{ src: 'https://snack.expo.io/embed.js', async: true }], // https://github.com/expo/snack/blob/main/docs/embedding-snacks.md
  plugins: [
    'docusaurus-plugin-sass',
    // @docusaurus/plugin-google-analytics (Not necessary because it automatically gets added)
  ],
  customFields: { ...customFields },
  themeConfig: {
    hideableSidebar: false,
    algolia: {
      apiKey: '6b7b98565bb82e16996fd185f378d618',
      indexName: 'agile-ts',
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    // image: '/img/meta.png', // Gets used in Head as Meta Image (og:image)
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      title: ' ',
      hideOnScroll: true,
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        // left
        {
          label: 'Get Started',
          position: 'left',
          items: [
            {
              label: 'Installation',
              to: '/docs/installation/',
            },
            {
              label: 'React',
              to: '/docs/quick-start/react/',
            },
            {
              label: 'Style Guide',
              to: '/docs/style-guide/',
            },
            {
              label: 'Examples',
              to: '/docs/examples/',
            },
          ],
        },
        {
          label: 'Community',
          position: 'left',
          items: [
            {
              label: 'GitHub',
              href: customFields.githubUrl,
            },
            {
              label: 'Discord',
              href: customFields.discordUrl,
            },
            {
              label: 'Stack Overflow',
              href: customFields.stackoverflowUrl,
            },
            {
              label: 'Twitter',
              href: customFields.twitterUrl,
            },
            {
              label: 'Reddit',
              href: customFields.redditUrl,
            },
          ],
        },
        {
          label: 'Documentation',
          position: 'left',
          to: 'docs/introduction/',
        },
      ],
    },
    footer: {
      copyright: customFields.copyright,
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Get Started',
              to: 'docs/introduction',
            },
            {
              label: 'Examples',
              to: 'docs/examples',
            },
            {
              label: 'React',
              to: 'docs/quick-start/react',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: customFields.githubUrl,
            },
            {
              label: 'Stack Overflow',
              href: customFields.stackoverflowUrl,
            },
            {
              label: 'Discord',
              href: customFields.discordUrl,
            },
            {
              label: 'Twitter',
              href: customFields.twitterUrl,
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Privacy Policy',
              to: '/legal/privacy-notice',
            },
            {
              label: 'Cookie Policy',
              to: '/legal/cookie-notice',
            },
            {
              label: 'Blog',
              to: '/blog/',
            },
          ],
        },
      ],
    },
    googleAnalytics: {
      trackingID: 'UA-189394644-1',
      anonymizeIP: true, // Should IPs be anonymized?
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          admonitions: {
            icons: 'emoji',
          },
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: `${customFields.githubDocsUrl}/tree/develop`,
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        blog: {
          showReadingTime: true,
          editUrl: `${customFields.githubDocsUrl}/tree/develop`,
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
      },
    ],
  ],
};

module.exports = { ...config };
