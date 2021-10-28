---
id: introduction
title: Computed
sidebar_label: Introduction
slug: /core/computed
---

A `Computed` is an extension of the [`State Class`](../state/Introduction.md#-light-state) that computes 
its value from a specified function.
Computed States are a powerful concept,
that lets us build dynamic data depending on other data.
To avoid unnecessary recomputations, 
the Computed Class caches the computed value
and recomputes it only when an actual dependency has changed.
All you need to do to instantiate a Computed State, 
is to call `createComputed()` and specify a compute function 
which computes the value for the Computed Class.
```ts
const MY_COMPUTED = createComputed(() => {
    return `My name is '${MY_NAME.value}' and I am ${MY_AGE.value} years old.`;
});
```
A `Computed` magically tracks used dependencies 
(such as [States](../state/Introduction.md) or [Collections](../collection/Introduction.md))
and automatically recomputes when one of its dependencies updates. 
In the above code snippet, it would, for example, recompute 
when the current value of `MY_NAME` changes from 'jeff' to 'hans'.
```ts
MY_COMPUTED.value; // Returns "My name is 'jeff' and I am 10 years old"
MY_NAME.set('hans');
MY_COMPUTED.value; // Returns "My name is 'hans' and I am 10 years old"
```
However, in some cases the automatic detection of dependencies doesn't work correctly.
```ts
const MY_COMPUTED = createComputed(async () => {
    const age = await getAge(MY_NAME.value);
    return `My name is '${MY_NAME.value}' and I am ${age} years old.`;
}); // ❌ Doesn't recompute when 'MY_NAME' updates
```
For example, that is the case when the compute method is `async`.
```ts
MY_COMPUTED.value; // Returns "My name is 'jeff' and I am 10 years old"
MY_NAME.set('hans');
MY_COMPUTED.value; // ❌ Returns "My name is 'jeff' and I am 10 years old"
```
In order to solve this problem 
we need to manually tell the Computed Class which dependencies it depends on.
We can give these `hard-coded` dependencies to the Computed Class as a second argument.
```ts
const MY_COMPUTED = createComputed(async () => {
    const age = await getAge(MY_NAME.value);
    return `My name is '${MY_NAME.value}' and I am ${age} years old.`;
}, [MY_NAME]); // ✅ Does recompute when 'MY_NAME' updates

MY_COMPUTED.value; // Returns "My name is 'jeff' and I am 10 years old"
MY_NAME.set('hans');
MY_COMPUTED.value; // ✅ Returns "My name is 'hans' and I am 10 years old"
```

## 🔨 Use case
A `Computed State` is useful whenever we need a State that is computed depending on other States.
```ts
const IS_AUTHENTICATED = createComputed(() => {
    return TOKEN.exists && USER_ID.exists && EXPIRATION_TIME.value > 0;
});
```
This is the case for our `IS_AUTHENTICATED` State, which depends on several other States 
determining whether the current user is authenticated or not.
These include the `TOKEN`, `CURRENT_USER` and `EXPIRATION_TIME`.
If, for instance, the `USER_ID` value changes, 
the Computed Class will recompute the `IS_AUTHENTICATED` state.
```ts
IS_AUTHENTICATE.value; // Returns 'true'
USER_ID.set(undefined);
IS_AUTHENTICATE.value; // Returns 'false'
```


## ⛳️ Sandbox
Test the Computed Class yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-computed-kisgr)
- Vue (no example yet :/)


## 📭 Props

```ts
new Computed(agileInstance, config);
// or
createComputed(computedFunction, deps);
// or
createComputed(computedFunction, config);
```

### `computedFunction`

Method used to compute the `value` of the Computed Class.
```ts {1}
const MY_COMPUTED = createComputed(() => 1 + 1);
MY_COMPUTED.value; // Returns '2'
```
This function will be called on each dependency mutation.
Dependencies can for example be [States](../state/Introduction.md) or [Collections](../collection/Introduction.md).
In the above code snippet `MY_COMPUTED` is independent,
but in the blow example it depends on the `CURRENT_USER_ID` State and `USERS` Collection.
```ts
const MY_COMPUTED = createComputed(() => {
    const user = USERS.getItemValue(CURRENT_USER_ID.value);
    return `My name is '${user?.name} and I am ${user?.age} years old.`;
});
MY_COMPUTED.value; // Returns "My name is 'hans' and I am 10 years old."
USERS.update(CURRENT_USER_ID.value, {name: 'jeff'})
MY_COMPUTED.value; // Returns "My name is 'jeff' and I am 10 years old." 
```

### `deps`

In order not to rely 100% on the automatic detection of dependencies,
we can pass an optional array of hard coded dependencies into the Computed Class.
```ts {3}
const MY_COMPUTED = createComputed(() => {
    return `My name is '${MY_NAME.value}' and I am ${MY_AGE.value} years old.`;
}, [MY_NAME, MY_AGE]);
MY_COMPUTED.value; // Returns "My name is 'hans' and I am 10 years old." 
MY_NAME.set('jeff');
MY_COMPUTED.value; // Returns "My name is 'jeff' and I am 10 years old."
```
In most cases, it isn't necessary to provide any hard-coded dependency.
However, it might occur that the Computed Class fails to autodetect a particular dependency.
You can check if all dependencies got correctly noticed by giving each used [Agile Sub Instance](../../../../main/Introduction.md#agile-sub-instance) a unique key
and reviewing the `deps` array.
```ts
MY_COMPUTED.deps; // Returns '[Observer('myName'), Observer('myAge')]'
```

## `config`

Beside the computed function and deps array a `Computed` takes an optional configuration object.
```ts
createComputed(() => {}, {
    key: "myKey",
    dependents: [MY_STATE_2]
});
```
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface StateConfigInterface {
    key?: StateKey;
    dependents?: Array<Observer>;
    isPlaceholder?: boolean;
}
```

<br/>

#### `key`

The optional property `key/name` should be a unique `string/number` to identify the Computed later.
```ts
createComputed(() => {}, {
    key: "myKey"
});
```
We recommend giving each Computed a unique `key` since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the Computed
- no need for separate persist Key

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | No       |

<br/>

#### `dependents`

:::warning

This property is mainly thought for the internal use.

:::

Specifies which States depend on this Computed Class.
```ts
createComputed(() => {}, {
    dependents: [MY_STATE_2]
});
```
So if this Computed Class mutes and is ingested into the `runtime`,
the depending States are ingested into the `runtime` too.

| Type              | Default     | Required |
|-------------------|-------------|----------|
| `Array<Observer>` | []          | No       |

<br/>

#### `isPlaceholder`

:::warning

This property is mainly thought for the internal use.

:::

Defines whether the Computed is a `placeholder`.
```ts
const MY_COMPUTED = createComputed(() => {}, {
    isPlaceholder: true
});

MY_COMPUTED.exists(); // false
```
Computed Classes are, for example, `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | false       | No       |


## 🟦 Typescript

The `Computed Class` is almost 100% typesafe and takes an optional generic type for type safety of its `value`.
```ts {1}
const MY_COMPUTED = createComputed<string>(() => {
    return 'Now Compute Function has to return String!';
});
```
