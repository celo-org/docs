---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/collection/selector/methods
---

:::info

Here are valuable methods of the `Selector Class` listed,
which aren't directly related to the [`State Class`](../../state/Introduction.md).

The Selector is an extension of the [`State Class`](../../state/Introduction.md)
and offers the same methods as a normal State.
These State related methods aren't described in this Section.
To find out more about specific State methods,
check out the [State documentation](../../state/Introduction.md).

:::

## `select()`

With the `select()` method we can update the current selected Item of the Selector.
```ts {2}
const MY_SELECTOR = MY_COLLECTION.createSelector(1);
MY_SELECTOR.select(2);
MY_SELECTOR.itemKey; // Returns '2'
MY_SELECTOR.item; // Returns 'Item(2)'
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKey`            | number \| string                                                                  | undefined  | Newly selected itemKey                                                                        | Yes      |
| `config`             | [StateRuntimeJobConfig](../../../../../Interfaces.md#stateruntimejobconfig)       | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Selector
```
Returns the [Selector](./Introduction.md) it was called on.



<br />

---

<br />



## `reselect()`

Reselects the currently selected Item.
```ts {4}
const MY_SELECTOR = MY_COLLECTION.createSelector(1);
MY_SELECTOR.select(2);
// Selection if Item 2 failed
MY_SELECTOR.reselect();
MY_SELECTOR.itemKey; // Returns '2'
MY_SELECTOR.item; // Returns 'Item(2)'
```
This might be helpful if the Selector failed to select the Item correctly before
and therefore should try to select it again.
You can use the [hasSelected()](#hasselected) method to check 
whether the 'selected' Item is selected correctly.

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `config`             | [StateRuntimeJobConfig](../../../../../Interfaces.md#stateruntimejobconfig)       | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Selector
```
Returns the [Selector](./Introduction.md) it was called on.



<br />

---

<br />



## `unselect()`

Unselects the currently selected Item.
```ts {3}
const MY_SELECTOR = MY_COLLECTION.createSelector(1);
MY_SELECTOR.itemKey; // Returns '1'
MY_SELECTOR.item; // Returns 'Item(1)'
MY_SELECTOR.unselect();
MY_SELECTOR.itemKey; // Returns 'undefined'
MY_SELECTOR.item; // Retruns 'undefined'
```
Therefore, it sets the `itemKey` and `item` property to `undefined`, 
since the Selector no longer represents any Item.

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `config`             | [StateRuntimeJobConfig](../../../../../Interfaces.md#stateruntimejobconfig)       | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Selector
```
Returns the [Selector](./Introduction.md) it was called on.



<br />

---

<br />



## `hasSelected()`

Checks whether the Selector represents a specific Item at the given `itemKey`.
```ts {2,3}
const MY_SELECTOR = MY_COLLECTION.createSelector(1);
MY_SELECTOR.hasSelected(2); // Returns 'false'
MY_SELECTOR.hasSelected(1); // Returns 'true'
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|----------|
| `itemKey`            | number \| string                                                                  | undefined  | Yes      |

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `rebuild()`

:::warning

This method is mainly thought for the internal use.

:::

Rebuilds the Selector `value`.

### 📄 Return

```ts
Selector
```
Returns the [Selector](./Introduction.md) it was called on.
