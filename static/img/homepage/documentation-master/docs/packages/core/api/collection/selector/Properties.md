---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/collection/selector/properties
---

:::info

Here are valuable properties of the `Selector Class` listed,
which aren't directly related to the [`State Class`](../../state/Introduction.md).

The Selector is an extension of the [`State Class`](../../state/Introduction.md)
and offers the same properties as a normal State.
These State related properties aren't described in this Section.
To find out more about specific State properties,
check out the [State documentation](../../state/Introduction.md).

:::

## `item`

Returns the current selected Item.
```ts {5}
const MY_COLLECTION = createCollection({
   initialData: [{id: 1, name: 'jeff'}, {id: 2, name: 'frank'}, {id: 5, name: 'hans'}]
});

const MY_SELECTOR = MY_COLLECTION.select(1);
MY_SELECTOR.item; // Returns 'Item(1)'
MY_SELECTOR.value; // Returns '{id: 1, name: 'jeff'}'
```

### 📄 Return

```ts
Item
```



<br />

---

<br />



## `itemKey`

Returns the current `itemKey` of the selected Item.
```ts {5}
const MY_COLLECTION = createCollection({
   initialData: [{id: 1, name: 'jeff'}, {id: 2, name: 'frank'}, {id: 5, name: 'hans'}]
});

const MY_SELECTOR = MY_COLLECTION.select(1);
MY_SELECTOR.itemKey; // Returns '1'
```

### 📄 Return

```ts
string | number
```
