---
id: introduction
title: Agile Instance
sidebar_label: Introduction
slug: /core/agile-instance
---

The `Agile Class` is the internal manager of AgileTs and should be unique to your application.
```ts
const App = new Agile();
```
It can be seen as an interface to any external Storage, 
or the UI-Frameworks AgileTs is implemented in.
Also, contains it a job queue system for managing State mutations.
Each `Agile Sub Instance` (ASI) contains a reference to the `Agile Class` 
and depends on its functionalities.
For reference, here are some `Agile Sub Instances` (ASI) 
created with an instantiated `Agile Instance` called `App`:

- [State](../state/Introduction.md)
  ```ts
   const MY_STATE = new State(sharedAgileInstance, "Hello there");
   // equals to
   const MY_STATE = createState("Hello there");
   ```
- [Collection](../collection/Introduction.md)
   ```ts
   const MY_COLLECTION = new Collection(sharedAgileInstance);
   // equals to
   const MY_COLLECTION = createCollection();
   ```
- [Computed](../computed/Introduction.md)
   ```ts
   const MY_COMPUTED = new Computed(sharedAgileInstance, () => 'hello');
   // equals to
   const MY_COMPUTED = createComputed(() => 'hello');
   ```

In summary the main tasks of the `Agile Class` are to:
- queue [`Agile Sub Instance`](../../../../main/Introduction.md#agile-sub-instance)
  changes in the `runtime` to prevent race conditions
- update/rerender subscribed UI-Components through the provided Integrations
  such as the [React Integration](../../../react/Introduction.md)
- provide configuration object


## 🤝 `shared` Agile Instance

In most cases you won't come in direct contact with this hidden helper (Agile Instance), 
although everything depends on it.
That is due the fact that there exists a shared Agile Instance called `shared` in the background.
The shared Instance allows the easy and straightforward creation of [ASI's](../../../../main/Introduction.md#agile-sub-instance), 
such as the State below.
```ts
import {shared} from '@agile-ts/core';

const MY_STATE = createState('Created with shared Agile Instance');
// equals to
const MY_STATE = new State(shared, 'Created with shared Agile Instance');
```
This is sufficient in 90% of the cases.
However, if you want to configure the Agile Instance in more detail, 
you have to redefine it.
```ts
const App = new Agile({/* many config options */});
```
Once you have created your customized Agile Instance,
we recommend overwriting the `shared` Agile Instance
with the newly created Agile Instance.
```ts
assignSharedAgileInstance(App);
```
Otherwise, there would exist two instances of Agile 
which is an unnecessary use of memory.
Also, is the straightforward creation of States based on the shared Agile Instance.
```ts
createState('jeff'); // Uses the shared Agile Instance
createState('jeff', {agileInstance: App}); // Uses the specified Agile Instance
```


## 📭 Props

```ts
new Agile(config);
```

### `config`

The `Agile Class` takes an optional configuration object as its only parameter.
```ts
new Agile({
  key: 'main',
  bindGlobal: true
});
```
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface CreateAgileConfigInterface {
  waitForMount?: boolean;
  bindGlobal?: boolean;
  key?: AgileKey;
  bucket?: boolean;
}
```

#### `key`
The optional property `key/name` should be a unique `string/number` to identify the Agile Instance later.
```ts
new Agile({
    key: "myKey"
});
```

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `string`        | undefined   | No       |

<br/>

#### `logConfig`
:::warning

The `loggerConfig` configuration option has been deprecated in the latest versions `^0.1.1`
and is no longer available!

### Why?
Optimizing `bundle size`.

### Alternative?
Now, `warnings` and `errors` are logged in general.
However, to configure the logging behavior of AgileTs more precisely
an external package [`@agile-ts/logger`](../../../logger/Introduction.md) is required.
```ts
import {assignSharedLogger, createLogger, Logger} from '@agile-ts/logger';

assignSharedLogger(createLogger({
  level: Logger.level.DEBUG,
  active: true,
  timestamp: true
}));
```

:::

<br/>

#### `localStorage`
:::warning

The `localStorage` configuration option has been deprecated in the latest versions `^0.2.0`
and is no longer available!

### Why?
Optimizing `tree shaking` support.

### Alternative?
Now, the local storage is added by default.
However, to configure this behavior, 
we need to assign a custom shared [`Storage Manger`](../storage/Introduction.md).
```ts
import {createStorageManager, assignSharedStorageManager} from "@agile-ts/core";

const storageManager = createStorageManager({ localStorage: false });
assignSharedStorageManager(storageManager);
```

:::

<br/>

#### `waitForMount`
This flag declares whether AgileTs should wait until unmounted Components get mounted before trigger rerenders on them.
```ts
new Agile({
  waitForMount: false // default true
});
```

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | false       | No       |

<br/>

#### `bindGlobal`
Whether the Agile Instance should be bound [globally](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) at the key `__agile__`.
```ts
new Agile({
  bindGlobal: false // default false
});
```
A globally bound Agile Instance has some advantages:
- If methods such as `useAgile()` can't find any Agile Instance in the given Instances, 
  they fall back on the global Agile Instance.
- You can simply access it in the console for debugging purpose.

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | false       | No       |

<br/>

#### `autoIntegrate`
Whether external added Integrations are to integrate automatically into the Agile Instance.
```ts
new Agile({
  autoIntegrate: false // default true
});
```
For example, when the package `@agile-ts/react` was installed,
whether to automatically integrate the `reactIntegration`.
```ts
const App = new Agile({autoIntegrate: true});
// React got automatically integrated into the Agile Instance

// --

const App = new Agile({autoIntegrate: false});
// React didn't get automatically integrated into the Agile Instance
// -> We have to integrate it manually
App.integrate(reactIntegration);
```

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | true        | No       |

<br/>

#### `bucket`
Whether to put render events into "The bucket" of the browser,
where all events are first put in wait for the UI thread
to be done with whatever it's doing.
```ts
new Agile({
  bucket: false // default true
});
```
[Learn more about "The bucket".](https://stackoverflow.com/questions/9083594/call-settimeout-without-delay)

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | true        | No       |


## 🌎 Where to instantiate?

If you have decided to initialize an Agile Instance
and don't want to use the [`shared`](#-shared-agile-instance) one.
You can technically instantiate it anywhere.
However, there are a few [Style Guides](../../../../main/StyleGuides.md)
which might help you with this decision.


## 🟦 Typescript

The `Agile Class` is almost 100% typesafe.
