---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/collection/group/methods
---

:::info

Here are valuable methods of the `Group Class` listed,
which aren't directly related to the [`State Class`](../../state/Introduction.md).

The Group is an extension of the [`State Class`](../../state/Introduction.md)
and offers the same methods as a normal State.
These State related methods aren't described in this Section.
To find out more about specific State methods,
check out the [State documentation](../../state/Introduction.md).

:::

## `has()`

Checks if the Group contains the given Item at `itemKey`.
```ts {2,3}
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 2, 3]);
MY_GROUP.has(1); // Returns 'true'
MY_GROUP.has(99); // Returns 'false'
```

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `remove()`

Removes given `itemKey` from Group.
```ts {2}
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 2, 3]);
MY_GROUP.remove(1);
MY_GROUP.value; // Returns '[2, 3]'
```

### 🔄 Alternative

```ts
MY_GROUP.set(MY_GROUP.value.filter((key) => key !== itemKey));
// or
MY_GROUP.value = MY_GROUP.value.filter((key) => key !== itemKey)
```
The only disadvantage is that the `notFoundItemKeys` property gets out of sync.

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKeys`           | number \| string | Array<number \| string\>                                       | undefined  | ItemKey/s that will be removed                                                                | Yes      |
| `config`             | [StateIngestConfig](../../../../../Interfaces.md#stateingestconfig)               | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Group
```
Returns the [Group](./Introduction.md) it was called on.



<br />

---

<br />



## `add()`

Pushes given `itemKey/s` into the Group.
```ts {2}
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 2, 3]);
MY_GROUP.add(7);
MY_GROUP.value; // Returns '[1, 2, 3, 7]'
```
By default, newly added `itemKey/s` are put at the end of the Group `value` array.
We can configure this behavior by changing the `method` property in the configuration object.
```ts 
MY_GROUP.add(9, {method: 'unshift'});
MY_GROUP.value; // Returns '[9, 1, 2, 3, 7]'
```

### 🌎 Existing itemKey
Commonly the Group won't overwrite the current `itemKey` position.
However, we can change this behaviour by setting `overwrite` to `false` in the configuration object.
```ts {4}
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [9, 1, 2, 3, 7]);
MY_GROUP.add(2); 
MY_GROUP.value; // Returns '[9, 1, 2, 3, 7]'
MY_GROUP.add(2, {overwrite: true}); 
MY_GROUP.value; // Returns '[9, 1, 3, 7, 2]'
```

### 🔄 Alternative

```ts
MY_GROUP.set(MY_GROUP.value.push(itemKey));
// or
MY_GROUP.value = MY_GROUP.value.push(itemKey);
```
The only disadvantage is that the `notFoundItemKeys` property gets out of sync.

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKeys`           | number \| string | Array<number \| string\>                                       | undefined  | ItemKey/s that will be added                                                                  | Yes      |
| `config`             | [GroupAddConfigInterface](../../../../../Interfaces.md#groupaddconfig)            | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Group
```
Returns the [Group](./Introduction.md) it was called on.



<br />

---

<br />



## `replace()`

Replaces old `itemKey` with the new `itemKey` in the Group.
```ts {2}
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 2, 3]);
MY_GROUP.replace(2, 10);
MY_GROUP.value; // Returns '[1, 10, 3]'
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `oldItemKey`         | number \| string                                                                  | undefined  | Old ItemKey                                                                                   | Yes      |
| `newItemKey`         | number \| string                                                                  | undefined  | Old ItemKey                                                                                   | Yes      |
| `config`             | [StateIngestConfigInterface](../../../../../Interfaces.md#stateingestconfig)      | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Group
```
Returns the [Group](./Introduction.md) it was called on.



<br />

---

<br />



## `rebuild()`

:::warning

This method is mainly thought for the internal use.

:::

Rebuilds the Group `output`.
```ts
const MY_GROUP = COLLECTION.createGroup('myGroup', [1, 3]);
MY_GROUP.output; // '[{id: 1, name: 'jeff'}, {id: 3, name: 'hans'}]'

// Pushes primaryKey '2' into Group in background
MY_GROUP._value.push(2);
MY_GROUP.output; // '[{id: 1, name: 'jeff'}, {id: 3, name: 'hans'}]'

// The Group doesn't automatically rebuild its 'output' since we directly mutate the internal '_value' property
// Therefore, we have to trigger the rebuild manually
MY_GROUP.rebuild();

MY_GROUP.output; // '[{id: 1, name: 'jeff'}, {id: 2, name: 'jeff'}, {id: 3, name: 'hans'}]'

// If we mutate the 'value' property, it automatically rebuilds the Group 'output'
MY_GROUP.value = MY_GROUP.value.filter(key => key !== 1);
MY_GROUP.output; // '[{id: 2, name: 'jeff'}, {id: 3, name: 'hans'}]'
```

### 📄 Return

```ts
Group
```
Returns the [Group](./Introduction.md) it was called on.
