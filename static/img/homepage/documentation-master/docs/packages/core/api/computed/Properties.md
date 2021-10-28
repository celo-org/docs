---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/computed/properties
---

:::info

Here are valuable properties of the `Computed Class` listed,
which aren't directly related to the [`State Class`](../state/Introduction.md).

The Computed is an extension of the [`State Class`](../state/Introduction.md)
and offers the same properties as a normal State.
These State related properties aren't described in this Section.
To find out more about specific State properties,
check out the [State documentation](../state/Introduction.md).

:::

## `computeFunction`

Method used to compute the `value` of the Computed Class.
```ts {2}
const MY_COMPUTED = createComputed(() => 1 + 1);
MY_COMPUTED.computeFunction(); // Returns '2'
MY_COMPUTED.value; // Returns '2'
```
This function will be called on each dependency mutation.
Dependencies can for example be [States](../state/Introduction.md) or [Collections](../collection/Introduction.md).
In the above code snippet `MY_COMPUTED` is independent,
but in the blow example it depends on the `MY_NAME` and `MY_AGE` State.
```ts
const MY_COMPUTED = createComputed(() => {
    return `My name is '${MY_NAME.value}' and I am ${MY_AGE.value} years old.`;
});
MY_COMPUTED.value; // Returns "My name is 'jeff' and I am 10 years old"
MY_NAME.set('hans');
// Internally calls compute function
MY_COMPUTED.value; // Returns "My name is 'hans' and I am 10 years old"
```

### 📄 Return

```ts
() => ComputedValueType
```



<br />

---

<br />



## `deps`

An Array of Observers the `Computed Class` depends on.
```ts {5}
const MY_COMPUTED = createComputed(() => {
    return MY_NAME.value + MY_AGE.value;
}, [MY_LOCATION]);

MY_COMPUTED.deps; // Returns (see below)
// [Observer(MY_LOCATION), Observer(MY_NAME), Observer(MY_AGE)]
```
It does include the auto-detected Observers (`MY_NAME`, `MY_AGE`) and the hard-coded Observers (`MY_LOCATION`).
If any of these dependencies mutates, the Computed Class will recompute its value to stay up to date.

### 📄 Return

```ts
Array<Observer>
```



<br />

---

<br />



## `hardCodedDeps`

An Array of hard-coded Observers the `Computed Class` depends on.
```ts {5}
const MY_COMPUTED = createComputed(() => {
    return MY_NAME.value + MY_AGE.value;
}, [MY_LOCATION]);

MY_COMPUTED.hardCodedDeps; // Returns (see below)
// [Observer(MY_LOCATION)]
```

### 📄 Return

```ts
Array<Observer>
```
