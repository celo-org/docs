---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/computed/methods
---

:::info

Here are valuable methods of the `Computed Class` listed,
which aren't directly related to the [`State Class`](../state/Introduction.md).

The Computed is an extension of the [`State Class`](../state/Introduction.md)
and offers the same methods as a normal State (`Light State`).
These State related methods aren't described in this Section.
To find out more about specific State methods,
check out the [State documentation](../state/Introduction.md).

:::

## `recompute()`

Recomputes the value of the `Computed Class`.
```ts {2}
const MY_COMPUTED = createComputed(() => {
    console.log('Called Recompute');
    return 'jeff';
});
MY_COMPUTED.recompute(); // console: Called Recompute
```
To do this, it internally calls the `computeFunction()` and detects its dependencies anew.

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `config`             | [RecomputeConfigInterface](../../../../Interfaces.md#recomputeconfig)             | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Computed
```
Returns the [Computed](./Introduction.md) it was called on.



<br />

---

<br />



## `updateComputeFunction()`

Updates the `computeFunction()` of the Computed Class.
```ts {5-7}
const MY_COMPUTED = createComputed(() => {
    return `I am '${MY_NAME.value}'`;
});
MY_COMPUTED.value; // Returns "I am 'jeff'"
MY_COMPUTED.updateComputeFunction(() => {
    return `Hello there, I am '${MY_NAME.value}'`;
});
MY_COMPUTED.value; // Returns "Hello there, I am 'jeff'"
```
In addition, it automatically detects the newly used dependencies
and recomputes the `value` of the Computed Class based on the new `computeFunction()`.
In order not to rely 100% on the automatic detection of dependencies,
we can pass an optional array of hard coded dependencies as the second parameter.
```ts {3}
const MY_COMPUTED = createComputed(() => {
    return `I am '${MY_NAME.value}'`;
}, [/* hard coded deps */]);
```

### 📭 Props

| Prop                 | Type                                                                                  | Default    | Description                                                                                   | Required |
|----------------------|---------------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `computeFunction`    | () => ComputedValueType                                                               | undefined  | New function for computing the value                                                          | Yes      |
| `deps`               | Array<State \| Collection \| Observer>                                                | []         | New hard coded dependencies of the Computed Class                                             | Yes      |
| `config`             | [UpdateComputeFunctionConfig](../../../../Interfaces.md#updatecomputefunctionconfig)  | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Computed
```
Returns the [Computed](./Introduction.md) it was called on.



<br />

---

<br />



## `compute()`

Computes the `value` of the Computed Class using the `computeFunction()`.
```ts {2}
MY_COMPUTED.computeFunction = () => `My name is '${MY_NAME.value}'`;
MY_COMPUTED.compute(); // Returns "My name is 'jeff'"
MY_COMPUTED.deps; // Returns '[Observer(MY_NAME)]'
```
Besides computing the `value`, it takes care of the automatic detection of dependencies used in the `computeFunction()`.
We can disable this autodetection by setting `autodetect` to false in the configuration object.
```ts {2}
MY_COMPUTED.computeFunction = () => `My name is '${MY_NAME.value}'`;
MY_COMPUTED.compute({autodetect: false}); // Returns "My name is 'jeff'"
MY_COMPUTED.deps; // Returns '[]'
```

### 📭 Props

| Prop                 | Type                                                                                  | Default    | Description                                                                                   | Required |
|----------------------|---------------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `config`             | [UpdateComputeFunctionConfig](../../../../Interfaces.md#updatecomputefunctionconfig)  | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
ComputedValueType
```
