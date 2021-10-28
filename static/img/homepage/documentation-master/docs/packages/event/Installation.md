---
id: installation
title: Installation
sidebar_label: Installation
slug: /event/installation
---

The `event` package can be installed over [npm](https://www.npmjs.com/).

:::warning

Be aware that this is no standalone package!

:::

```bash npm2yarn
npm install @agile-ts/event 
```

The `event` package is an extension of AgileTs and doesn't work without the [`core`](../core/Introduction.md) package,
which functions as the brain of AgileTs and is indispensable.
Unfortunately, we can't combine each `core` with `event` version.
Therefore, we have created a table which shows which versions fit together without restrictions.

| @agile-ts/event       | @agile-ts/core          | NPM Version              | Supported React versions | Supports hook based components    |
| ----------------------| ----------------------- | ------------------------ | -------------------------|---------------------------------- |
| v0.0.1+               | v0.0.10+                | v6+                      | 16.8+                    | Yes                               |

_Older Versions aren't supported anymore_
