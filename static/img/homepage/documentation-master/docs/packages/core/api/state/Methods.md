---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/state/methods
---

:::info

Here are valuable methods of the `State Class` listed.

:::

## `setKey()`

Assigns a new `key/name` to the State.
```ts {1}
MY_STATE.setKey("newKey");
MY_STATE.key; // Returns 'newKey'
```

### ❓ Why a Key
- helps us during debug sessions
- makes it easier to identify the State
- no need for separate persist Key

### 📭 Props

| Prop           | Type                             | Default    | Required |
|----------------|----------------------------------|------------|----------|
| `value`        | string \| number \| undefined    | undefined  | Yes      |

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `set()`

We use the `set()` method to mutate the current State `value`.
```ts {1}
MY_STATE.set("myNewValue");
MY_STATE.value; // Returns 'myNewValue'
```

### 👀 Hidden
Sometimes we need to update the State value in the background.
So without triggering any rerender on the Components that have bound the State to itself.
To achieve such a goal, we can set the `background` property in the configuration object to `true`.
```ts 
MY_STATE.set("myNewValue", {background: true});
```

### ⚙️ Internal
1. Ingest State Observer into the `runtime` (Observer is like an interface to `runtime`)
2. Create State Job and add it to the `runtime` queue
3. Execute State Job
4. Execute [`sideEffects`](#addsideeffect) like permanently storing the State in a Storage
5. Update all Subscribers of the State Observer (-> trigger rerender on subscribed Components)

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `value`        | ValueType = any                                                                     | undefined  | Value that will be assigned to the State next         | Yes      |
| `config`       | [StateIngestConfig](../../../../Interfaces.md#stateingestconfig)                    | {}         | Configuration                                         | No       |

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `ingest()`

:::warning

This method is mainly thought for the internal use.

:::

With the `ingest()` method we can pass the State without any newly defined value into the `runtime`.
Instead of the given value, as it happens in the `set()` method,
it takes the `nextStateValue` as the new State value.
```ts {2}
MY_STATE.nextStateValue = "frank";
MY_STATE.ingest();
MY_STATE.value; // Returns 'frank'
```
When we `ingest()` a specific extension of the State, it might behave quite different.
For instance, in case of a [Computed State](../computed/Introduction.md) it will take the value
calculated by the `computed function` instead of the `nextStateValue`.
```ts {5}
let coolValue = "jeff";
const MY_COMPUTED = createComputed(() => `hello ${coolValue}`); // Computed function returns 'jeff'
coolValue = "frank"; 
MY_COMPUTED.value; // Returns 'hello jeff'
MY_COMPUTED.ingest(); // ingest Computed into runtime and recompute value
MY_COMPUTED.value; // Returns 'hello frank'
```

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [StateIngestConfig](../../../../Interfaces.md#stateingestconfig)                    | {}         | Configuration                                         | No       |

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `type()`

:::warning

The `type()` method has been deprecated in the latest version `^0.2.0`
and is no longer available!

### Why?
Reducing `core` package size.

### Alternative?
No. Consider using [`Typescript`](https://www.typescriptlang.org/) if you want a proper typesafety.

:::



<br />

---

<br />



## `hasCorrectType()`

:::warning

The `hasCorrectType()` method has been deprecated in the latest version `^0.2.0`
and is no longer available!

### Why?
Reducing `core` package size.

### Alternative?
No. Consider using [`Typescript`](https://www.typescriptlang.org/) if you want a proper typesafety.

:::



<br />

---

<br />



## `undo()`

Reverses the latest State `value` mutation.
```ts {3}
MY_STATE.set("hi"); // State value is 'hi'
MY_STATE.set("bye"); // State value is 'bye'
MY_STATE.undo(); // State value is 'hi' 
```
Be aware that currently, the State can only undo one State change at the time.
That's why we can't do `undo().undo().undo()` to get the State value from 3 State value mutations ago.
We have planned to add a feature called `history`, which will allow us to travel back in the State history
and get the previous State of the previous State, ..

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [StateIngestConfig](../../../../Interfaces.md#stateingestconfig)                    | {}         | Configuration                                         | No       |

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `reset()`

Resets the State.
A reset includes:
- setting the State `value` to it's `initialValue`
```ts {4}
const MY_STATE = createState("hi"); // State value is 'hi'
MY_STATE.set("bye"); // State value is 'bye'
MY_STATE.set("hello"); // State value is 'hello'
MY_STATE.reset(); //️ State value is 'hi' 
```

### 📭 Props

| Prop           | Type                                                                                | Default    | Description                                           | Required |
|----------------|-------------------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [StateIngestConfig](../../../../Interfaces.md#stateingestconfig)                    | {}         | Configuration                                         | No       |

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `patch()`

:::warning

Only relevant for States that have an `object` or `array` as a value type.

:::

Merges an object with changes into the current State `value` object at top-level.
```ts {2}
const MY_STATE = createState({id: 1, name: "frank"}); // State Value is '{id: 1, name: "frank"}'
MY_STATE.patch({name: "jeff"}); // State Value is '{id: 1, name: "jeff"}'
```
Or if the State `value` is of the type `array`, and the specified argument is of the type `array` too,
it concatenates the current State `value` with the value of the argument.
```ts {2}
const MY_STATE = createState([1, 2, 3]); // State Value is '[1, 2, 3]'
MY_STATE.patch([4, 5, 6]); // State Value is '[1, 2, 3, 4, 5, 6]'
```
If the current State value is neither an `object` nor an `array`, the patch can't be performed.
```ts {2}
const MY_STATE_2 = createState(1);
MY_STATE.patch({hello: "there"}); // Error
```

### ❓ Deepmerge
Unfortunately, the `patch()` method doesn't support `deep merges` yet.
In conclusion, the merge only happens at the top-level of the objects.
If AgileTs can't find a particular property, it will add it at the top-level of the value object.
```ts {2}
const MY_STATE = createState({things: { thingOne: true, thingTwo: true }});
MY_STATE.patch({ thingOne: false }); // State value is (see below)
// {things: { thingOne: true, thingTwo: true }, thingOne: false}
```
In case we don't want to add not existing properties to the value object,
we can set `addNewProperties` to `false` in the configuration object.
```ts {2}
const MY_STATE = createState({things: { thingOne: true, thingTwo: true }});
MY_STATE.patch({ thingOne: true }, {addNewProperties: false}); // State value is (see below)
// {things: { thingOne: true, thingTwo: true }}
```

### 📭 Props

| Prop                 | Type                                                     | Default    | Description                                           | Required |
|----------------------|----------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `targetWithChanges`  | Object                                                   | undefined  | Object merged into the current State value            | Yes      |
| `config`             | [PatchConfig](../../../../Interfaces.md#patchconfig)     | {}         | Configuration                                         | No       |

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `watch()`

The `watch()` method lets us easily observe a State for changes.
Thereby is the provided `callback` function fired on every State `value` mutation.
Such mutation occurs when we, for example, update the State `value` from 'jeff' to 'hans'.
```ts {1-4}
const response = MY_STATE.watch((value, key) => {
    console.log(value); // Returns current State Value
    console.log(key); // Key of Watcher ("Aj2pB")
});

console.log(response); // "Aj2pB" (Random generated Key to identify the watcher callback)
```
We recommend giving each `watcher` callback a unique `key` to correctly identify it later.
```ts {1}
const something = MY_STATE.watch("myKey", (value, key) => {
  // do something
});

console.log(response); // State Instance it was called on
```
Such identification is, for example, essential to clean up the watcher callback later.

### ❓ When cleanup
We should [clean up](#removewatcher) a watcher callback when it is no longer in use.
In a UI-Component, that is the case whenever the Component unmounts.
If we forget to clean up many of these watcher callbacks, memory leaks may occur.
```ts
MY_STATE.removeWatcher(cleanupKey);
```

### 🚀 [`useWatcher`](../../../react/api/Hooks.md#usewatcher)
In a React environment we can use the `useWatcher()` hook to create a watcher callback
without worrying about cleaning it up after the UI-Component has unmounted.
```tsx
export const MyComponent = () => {

  useWatcher(MY_STATE, (value) => {
    // do something
  });

  return <div></div>;
}
```

### 📭 Props

| Prop                 | Type                                                     | Default    | Description                                                          | Required |
|----------------------|----------------------------------------------------------|------------|----------------------------------------------------------------------|----------|
| `key`                | string \| number                                         | undefined  | Key/Name of Watcher Callback                                         | No       |
| `callback`           | (value: ValueType) => void                               | undefined  | Callback function that is called on each State value change          | Yes      |

### 📄 Return

```ts
State | string
```



<br />

---

<br />



## `removeWatcher()`

Removes [watcher callback](#watch) at the given `watcherKey` from the State.
```ts
MY_STATE.removeWatcher("myKey");
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Required |
|----------------|---------------------------------------------------------------------------|------------|----------|
| `watcherKey`   | number \| string                                                          | undefined  | Yes      |

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `hasWatcher()`

:::warning

The `hasWatcher()` method has been deprecated in the latest version `^0.2.0`
and is no longer available!

### Why?
Reducing `core` package size.

### Alternative?
```ts
MY_STATE.hasSideEffect('watcherKey');
```

:::



<br />

---

<br />



## `onInaugurated()`

A [watcher callback](#watch) that destroys itself after invoking.
```ts
MY_STATE.onInaugurated((value) => {
  // do something
});
```
Therefore, this callback is called only once shortly after the initiation of the State.

### 📭 Props

| Prop                 | Type                                                     | Default    | Required |
|----------------------|----------------------------------------------------------|------------|----------|
| `callback`           | (value: ValueType) => void                               | undefined  | Yes      |

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />




## `persist()`

Preserves the State `value` in the appropriate local Storage for the current environment.
```ts
MY_STATE.perist("myStorageKey");
```

### 🤓 Learn more

If you want to find out more about persisting Instances like States,
checkout the [Persisting Data](../storage/PersistingData.md) Section.

### 📭 Props

| Prop                 | Type                                                                       | Default    | Description                                                                           | Required |
|----------------------|----------------------------------------------------------------------------|------------|---------------------------------------------------------------------------------------|----------|
| `key`                | string \| number                                                           | undefined  | Key/Name of created Persistent (Note: Key is required if State has no set Key!)       | No       |
| `config`             | [StatePersistentConfig](../../../../Interfaces.md#statepersistentconfig)   | {}         | Configuration                                                                         | No       |

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `onLoad()`

Registers a callback function that is called whenever the [persisted](#persist) State `value` is loaded into the State.
```ts
MY_STATE.onLoad((success) => {
console.log(`Value '${MY_STATE.value}' got loaded into the Collection! Success? ${success}`)
});
```
For example, we can use this information to display a loading indicator
until the persisted `value` got loaded.

### 📭 Props

| Prop                 | Type                                                     | Default    | Required |
|----------------------|----------------------------------------------------------|------------|----------|
| `callback`           | (success: boolean) => void                               | undefined  | Yes      |

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `exists()`

Checks whether the State exists.
```ts {2}
const MY_STATE = createState("hi");
MY_STATE.exists; // Returns 'true'
```
Criteria for an existing State are:
- State is no `placeholder`
- [`computeExists`](#computeexists) method returns `true`

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `computeExists()`

Updates the method used to compute the existence of the State.
It will be retrieved on each [`exists()`](#exists) method call to determine whether the State exists.
```ts
MY_STATE.computeExists((value) => value !== undefined && value !== 'jeff');
```
The default `computeExists()` method checks if the State is `null` or `undefined`.
```ts
(value) => {
    return value != null;
};
```

### 📭 Props

| Prop                 | Type                                                     | Default    | Required |
|----------------------|----------------------------------------------------------|------------|----------|
| `method`             | (value: ValueType) => boolean                            | undefined  | Yes      |


### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `is()`

Whether the State value `is equal` to the provided value.
Equivalent to `===` with the difference that it looks at the value
and not on the reference in the case of objects.
```ts {2,3}
const MY_STATE = createState("hi");
MY_STATE.is("bye"); // Returns 'false'
MY_STATE.is("hi"); // Returns 'true'
```

### 📭 Props

| Prop                 | Type                     | Default    | Required |
|----------------------|--------------------------|------------|----------|
| `value`              | ValueType (any)          | undefined  | Yes      |

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `isNot()`

Whether the State value `isn't equal` to the provided value.
Equivalent to `!==` with the difference that it looks at the value
and not on the reference in the case of objects.
```ts {2,3}
const MY_STATE = createState("hi");
MY_STATE.isNot("bye"); // Returns 'true'
MY_STATE.isNot("hi"); // Returns 'false'
```

### 📭 Props

| Prop                 | Type                     | Default    | Required |
|----------------------|--------------------------|------------|----------|
| `value`              | ValueType (any)          | undefined  | Yes      |

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `invert()`

Inverts the current State value.
```ts {2}
const MY_STATE = createState(true);
MY_STATE.invert(); // State Value is 'false'
```
Some more examples are:
```ts
// 'jeff' -> 'ffej'
// true -> false
// [1, 2, 3] -> [3, 2, 1]
// 10 -> -10
```

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `computeValue()`

Creates method that is called on each State value mutation to adjust the value before it is applied to the State.
```ts {1}
const MY_STATE = createState("Jeff").compute((value) => `Hello '${value}'`);
MY_STATE.value; // Returns "Hello 'Jeff'"
MY_STATE.set("Frank");
MY_STATE.value; // Returns "Hello 'Frank'"
```

### ⚙️ [Computed](../computed/Introduction.md) vs `computeValue()`

The `computeValue()` method is thought to make small adjustments to the State value before it is applied to the State.
The [Computed Class](../computed/Introduction.md) on the other hand computes its value based on several `Agile Sub Instances` like States, Collections, ..
```ts
const isAuthenticated = createComputed(() => {
  return authToken.exists && user.exists && !timedout.value;
});
```
It recomputes its value whenever a dependency (like the `authToken`) mutates.

### 📭 Props

| Prop                 | Type                                                     | Default    | Required |
|----------------------|----------------------------------------------------------|------------|----------|
| `method`             | (value: ValueType) => ValueType                          | undefined  |  Yes     |


### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `addSideEffect()`

:::warning

This method is mainly thought for the internal use.

:::

Creates a `callback` function that is executed in the `runtime` as a side effect of State changes.
For example, it is called when the State value changes from 'jeff' to 'hans'.
```ts
MY_STATE.addSideEffect('mySideEffect', (state, config) => {
    // sideEffect callback
});
```

### ✨ Multiple `sideEffects`
Each State can have multiple `sideEffects` with different `weights`.
```ts {3}
MY_STATE.addSideEffect('mySideEffect', (state, config) => {
  // sideEffect callback
}, {weigth: 10});
```
The `weight` determines in which order the `sideEffects` are executed,
since some `sideEffects` have to be performed before others.
The higher the `weigth`, the earlier the `sideEffect` callback will be called.

### 👾 Example
For example, a persisted [Group](../collection/group/Introduction.md) has two `sideEffects`.

![Example sideEffect](../../../../../static/img/docs/group_sideEffect_example.png)

- `rebuildGroup` with a weight of **10**: Rebuilds the Group `output`.
- `rebuildStateStorageValue` with a weight of **0**: Updates the persisted Group `value` in the appropriate local Storage.


### 📭 Props

| Prop                 | Type                                                                            | Default    | Description                                                          | Required |
|----------------------|---------------------------------------------------------------------------------|------------|----------------------------------------------------------------------|----------|
| `key`                | string \| number                                                                | undefined  | Key/Name of sideEffect callback                                      | Yes      |
| `callback`           | (instance: Instance, properties?: object) => void                               | undefined  | Callback Function that is called on each State mutation              | Yes      |
| `config`             | [AddSideEffectConfigInterface](../../../../Interfaces.md#addsideeffectconfig)   | {}         | Configuration                                                        | No       |

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `removeSideEffect()`

:::warning

This method is mainly thought for the internal use.

:::

Removes [sideEffect](#addsideeffect) at the given `sideEffectKey` from the State.
```ts
MY_STATE.removeSideEffect("myKey");
```

### 📭 Props

| Prop            | Type                                                                      | Default    | Required |
|-----------------|---------------------------------------------------------------------------|------------|----------|
| `sideEffectKey` | number \| string                                                          | undefined  | Yes      |

### 📄 Return

```ts
State
```
Returns the [State](./Introduction.md) it was called on.



<br />

---

<br />



## `hasSideEffect()`

:::warning

This method is mainly thought for the internal use.

:::

Checks if a [sideEffect](#addsideeffect) exists at the given `sideEffectKey` in the State.
```ts {4,5}
MY_STATE.addSideEffect("myKey", (value) => {
  // do something
});
MY_STATE.hasSideEffect("myKey"); // Returns 'true'
MY_STATE.hasSideEffect("unknownKey"); // Returns 'false'
```

### 📭 Props

| Prop            | Type                                                                      | Default    | Required |
|-----------------|---------------------------------------------------------------------------|------------|----------|
| `sideEffectKey` | number \| string                                                          | undefined  | Yes      |

### 📄 Return

```ts
boolean
```
