---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/agile-instance/methods
---

:::info

Here are valuable methods of the `Agile Class` listed.

:::


## `createState()`

:::warning

The `createState()` method has been deprecated in the latest version `^0.2.0`
and is no longer available!

### Why?
Optimizing `tree shaking` support.

### Alternative?
```ts
import {createState} from "@agile-ts/core";

createState('jeff', {agileInstance: App});
```

:::



<br />

---

<br />



## `createCollection()`

:::warning

The `createCollection()` method has been deprecated in the latest version `^0.2.0`
and is no longer available!

### Why?
Optimizing `tree shaking` support.

### Alternative?
```ts
import {createCollection} from "@agile-ts/core";

createCollection({}, {agileInstance: App});
```

:::



<br />

---

<br />



## `createComputed()`

:::warning

The `createComputed()` method has been deprecated in the latest version `^0.2.0`
and is no longer available!

### Why?
Optimizing `tree shaking` support.

### Alternative?
```ts
import {createComputed} from "@agile-ts/core";

createComputed(() => {}, {agileInstance: App});
```

:::



<br />

---

<br />



## `integrate()`

Integrates a [Framework Integration](../integration/Introduction.md) into AgileTs.
An Integration simply tells AgileTs, how to mutates a particular Component whenever a State changes.
In order to bind States to UI-Components and thus be reactive, any Framework using AgileTs needs an Integration for AgileTs.
For example, to use AgileTs in a [React](https://reactjs.org/) environment,
we have to integrate/register the [React Integration](../../../react/Introduction.md).
```ts
App.integrate(reactIntegration);
```

### 📭 Props

| Prop            | Type                                                              | Default   | Description                                                 | Required |
|-----------------|-------------------------------------------------------------------|-----------|-------------------------------------------------------------|----------|
| `integration`   | [Integration](../integration/Introduction.md)                     | undefined | Integration that gets registered/integrated into AgileTs    | Yes      |

### 📄 Return

```ts
Agile
```
Returns the [Agile Instance](./Introduction.md) it was called from



<br />

---

<br />



## `hasIntegration()`

Checks whether AgileTs has any registered [Framework Integration](../integration/Introduction.md).

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `createStorage()`

:::warning

The `createStorage()` method has been deprecated in the latest version `^0.2.0`
and is no longer available!

### Why?
Optimizing `tree shaking` support.

### Alternative?
```ts
import {createStorage} from "@agile-ts/core";

createStorage({/* config */});
```

:::



<br />

---

<br />



## `registerStorage()`

:::warning

The `registerStorage()` method has been deprecated in the latest version `^0.2.0`
and is no longer available!

### Why?
Optimizing `tree shaking` support.

### Alternative?
A storage can now be registered with the shared [`Storage Manager`](../storage/Introduction.md),
which manages all Storages for AgileTs.
```ts {15}
import {getSharedStorageManager, createStorage} from "@agile-ts/core";

// Create an interface to the Local Storage
const _localStorage = createStorage({
    key: 'localStorage',
    async: false,
    methods: {
       get: localStorage.getItem.bind(localStorage),
       set: localStorage.setItem.bind(localStorage),
       remove: localStorage.removeItem.bind(localStorage),
    },
});

// Register Storage to the shared Storage Manager
getSharedStorageManager().register(_localStorage, { default: true }); 
```

:::



<br />

---

<br />



## `hasStorage()`

:::warning

The `hasStorage()` method has been deprecated in the latest version `^0.2.0`
and is no longer available!

### Why?
Optimizing `tree shaking` support.

### Alternative?

```ts
import {getSharedStorageManager} from "@agile-ts/core";

getSharedStorageManager().hasStorage()
```

:::
