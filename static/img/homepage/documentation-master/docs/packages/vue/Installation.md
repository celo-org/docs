---
id: installation
title: Installation
sidebar_label: Installation
slug: /vue/installation
---

The `vue` package can be installed over [npm](https://www.npmjs.com/).

:::warning

Be aware that this is no standalone package!

:::

```bash npm2yarn
npm install @agile-ts/vue 
```

The `vue` package is an extension of AgileTs and doesn't work without the [`core`](../core/Introduction.md) package,
which functions as the brain of AgileTs and is indispensable.
Unfortunately, we can't combine each `core` with `vue` version.
Therefore, we have created a table that shows which versions fit together without restrictions.

| @agile-ts/vue    | @agile-ts/core          | NPM Version              | Supported Vue   versions |
| ---------------- | ----------------------- | ------------------------ | -------------------------|
| v0.1.1+          | v0.1.1+                 | v6+                      | 2.x (3.x not tested)     |

_Older Versions aren't supported anymore_
