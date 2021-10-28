---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/agile-instance/properties
---

:::info

Here are valuable properties of the `Agile Class` listed.

:::

## `key`

The current `key/name` of the Collection,
which is used for a unique identification.
```ts {2}
const App = new Agile({key: 'jeffKey'});
App.key; // Returns 'jeffKey'
```

### 📄 Return

```ts
string | number
```



<br />

---

<br />



## `logger`

:::warning

The `logger` property has been deprecated in the latest version `^0.1.1`
and is no longer available!

### Why?
Reducing `core` package size and making AgileTs more modularized.

### Alternative?
Now, `warnings` and `errors` are logged in general.
However, to configure the logging behavior of AgileTs more precisely
an external package [`@agile-ts/logger`](../../../logger/Introduction.md) is required.

```ts
import {createLogger, assignSharedLogger, Logger} from '@agile-ts/logger';

assignSharedLogger(createLogger({
    level: Logger.level.DEBUG,
    active: true,
    timestamp: true
}));
```

:::
