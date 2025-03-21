---
title: Deploy on Celo
description: How to build and deploy a dApp on Celo.
---

import PageRef from '@components/PageRef'

# Build with Celo

How to build and deploy a dApp with Celo.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Using Celo Composer

[Celo Composer](https://github.com/celo-org/celo-composer) allows you to quickly build, deploy, and iterate on decentralized applications using Celo. It provides a number of frameworks, examples, and Celo specific functionality to help you get started with your next dApp.

```jsx
npx @celo/celo-composer@latest create
```

:::tip

Learn more about Celo Composer in the [README](https://github.com/celo-org/celo-composer) and [Documentation](https://celo-composer.gitbook.io/docs/)

:::

## Using EVM Tools

<!-- make the below text code block because crowdin is messing it up -->

```mdx-code-block
Developers can build with Celo using many [Ethereum](https://ethereum.org/en/) compatible tools including Remix, Hardhat, and others. By making a few adjustments to your project’s network configuration settings, you can deploy your new or existing dApp on Celo.
```

- [Using thirdweb](/developer/deploy/thirdweb)
- [Using Remix](/developer/deploy/remix)
- [Using Hardhat](/developer/deploy/hardhat)
