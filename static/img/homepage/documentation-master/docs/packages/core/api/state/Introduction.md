---
id: introduction
title: State
sidebar_label: Introduction
slug: /core/state
---

A `State` represents a piece of Information that we need to remember globally at a later point in time.
While offering a toolkit to use and mutate this piece of Information.
States are the foundation of AgileTs. Almost everything depends on States or extends its functionalities.
For example, a [Collection](../collection/Introduction.md) is a dynamic set of States.
All you need to instantiate a State, is to call `createState()` and specify an initial value.
```ts
// String State
const NAME = createState("Jeff");

// Number State
const AGE = createState(18);

// Array State
const SPECIAL_POWERS = createState(['water', 'dirt']);

// Nested State
const FRIENDS = createState({friendA: FRIEND_STATE_A, friendB: FRIEND_STATE_B}); 

// A light alternative to 'createState()' without bells and whistles like 'undo()', 'persist()', ...
const USER = createLightState({id: 10, name: 'jeff'})
```
We can create as many States as we need and bind them flexible to any UI-Component.
Now that we have instantiated some States, we can dynamically and easily manipulate their value.
```ts
// Update the State value to 'Frank'
NAME.set("Frank");

// Undo latest State value change (-> value is now "Jeff" again)
NAME.undo();

// Merge 'friendC' into the FIRENDS State value object
FRIENDS.patch({friendC: FIREND_STATE_C});

// Permanently store the State value in an external Storage
NAME.persist();

// Check if the State value is equal to '['water', 'dirt']'
SPECIAL_POWERS.is(['water', 'dirt']); // Returns true
```
Want to learn more about the State's specific methods? 
Check out the [State Methods](./Methods.md) documentation.
Most methods we use to modify, mutate and access the State are chainable.
```ts
MY_STATE.undo().set("Hello Hell").watch(() => {}).reset().invert().persist().type(String);
```


### 🔨 Use case
We might use a State to remember the active theme of our application,
or the `userId` of the current logged-in user.
```ts
const THEME_TYPE = createState("dark");
// <- toggled theme switch
THEME_TYPE.set("light");
```
In the above example, we create a `THEME_TYPE` State with the initial value "dark".
After toggling the theme switch, we update the `THEME_TYPE` to "light".


### ⛳️ Sandbox
Test the State yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-state-f12cz)
- [React-Native](https://snack.expo.io/@bennodev/agilets-first-state)
- [Vue](https://codesandbox.io/s/agilets-first-state-i5xxs)


## 👟 Light State

The `Light State` is a lightweight alternative to the `Enhanced State`, 
which is referred as the 'normal' State in this documentation.
It is the State in its rawest and lightest form.
Thus, it is recommended when no additional functionalities
like `persist()`, `watch()`, `undo()`, .. are required.
```ts
new State(agileInstance, initialValue, config);
// or 
createLightState(initialValue, config);
```
#### Methods contained in the `Light State`
- `setKey()`
- `set()`
- `ingest()`
- `addSideEffect()`
- `removeSideEffect()`
- `hasSideEffect()`


## 🏋️ Enhanced State

What we refer as a 'normal' State in this documentation is the `Enhanced State`. 
Actually the `Enhanced State` is an extension of the `Light State` (normal State) 
with many additional features. 
Since the `Enhanced State` is the most commonly used type of State, 
the `createState()` method creates an `Enhanced State`.
```ts
new EnhancedState(agileInstance, initialValue, config);
// or 
createState(initialValue, config);
// or 
createEnhancedState(initialValue, config);
```
However, since the `Enhanced State` is bloated with features, 
it requires a larger bundle size than the `Light State`.


## 📭 Props

```ts
// Enhanced State
new EnhancedState(agileInstance, initialValue, config);
// or 
createState(initialValue, config);
// or 
createEnhancedState(initialValue, config);

// Light State
new State(agileInstance, initialValue, config);
// or 
createLightState(initialValue, config);
```

### `initialValue`

The first `value` assigned to the State.
```ts {1}
const MY_STATE = createState("hello there");
MY_STATE.value; // Returns 'hello there'
```
Later we can access the initial value with the `initialStateValue` property.
```ts
MY_STATE.initialStateValue; // Returns 'hello there'
```

### `config`

Beside the initial value a `State` takes an optional configuration object.
```ts
createState("myInitialValue", {
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

The optional property `key/name` should be a unique `string/number` to identify the State later.
```ts
createState("myInitialValue", {
    key: "myKey"
});
```
We recommend giving each State a unique `key` since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the State
- no need for separate persist Key

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | No       |

<br/>

#### `dependents`

:::warning

This property is mainly thought for the internal use.

:::

Specifies which States depend on this State.
```ts
createState("myInitialValue", {
    dependents: [MY_STATE_2]
});
```
So if this State mutes and is ingested into the `runtime`,
the depending States are ingested into the `runtime` too.

| Type              | Default     | Required |
|-------------------|-------------|----------|
| `Array<Observer>` | []          | No       |

<br/>

#### `isPlaceholder`

:::warning

This property is mainly thought for the internal use.

:::

Defines whether the State is a `placeholder`.
```ts
const MY_STATE = createState("myInitialValue", {
    isPlaceholder: true
});

MY_STATE.exists(); // false
```
States are, for example, `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | false       | No       |


## 🟦 Typescript

The `State Class` is almost 100% typesafe and takes an optional generic type for type safety of its `value`.
```ts {1}
const MY_STATE = createState<string>("Hello World");
MY_STATE.set(1); // Error
MY_STATE.set("hello space"); // Success
```
