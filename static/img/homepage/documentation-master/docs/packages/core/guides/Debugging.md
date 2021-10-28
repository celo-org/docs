---
id: debugging
title: Debugging
sidebar_label: Debugging
slug: /core/guides/debugging
---

:::info

WIP documentation!

:::

## Using `globalThis`

AgileTs has current no `devtools`.
However, to get a basic debugging functionality you can bind your States globally.
```ts
import {globalBind} from '@agile-ts/core';

const MY_NAME = createState('jeff');
const MY_AGE = createState(0);

globalBind('__core__', {MY_NAME, MY_AGE});
```
Thus, you can inspect them in the browser `console` by typing:
```ts
__core__.MY_STATE
```
However, there are some problems with this variant of debugging:
- Don't forget to take the States from the global scope in `production`
- each debugged State has the same internal reference.
  So for example, if you debug (print/log) the `State x` and then change the `State x` and debug it again,
  the first debugged `State x` is the same as the second debugged `State x`
