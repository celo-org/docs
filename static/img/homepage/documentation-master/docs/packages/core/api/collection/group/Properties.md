---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/collection/group/properties
---

:::info

Here are valuable properties of the `Group Class` listed,
which aren't directly related to the [`State Class`](../../state/Introduction.md).

The Group is an extension of the [`State Class`](../../state/Introduction.md)
and offers the same properties as a normal State.
These State related properties aren't described in this Section.
To find out more about specific State properties,
check out the [State documentation](../../state/Introduction.md).

:::

## `output`

The matching Item `values` to the `primary Keys` represented by the Group.
```ts {7,8}
const MY_COLLECTION = createCollection({
   initialData: [{id: 1, name: 'jeff'}, {id: 2, name: 'frank'}, {id: 5, name: 'hans'}]
});

const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 5, 8]);
MY_GROUP.value; // Returns [1, 5, 8]
MY_GROUP.output; // Returns (see below)
// [{id: 1, name: 'jeff'}, {id: 5, name: 'hans'}]
```
Not existing Items are skipped in the Group `output`.
In the above example, the Item at `id` '8' got skipped since it doesn't exist.

:::info

The Group `output` is a generated property
and should only be mutated by the Group during a recompute.
We strongly advise not to mutate this property manually.

:::

### 📄 Return

```ts
Array<DateType>
```


<br />

---

<br />



## `items`

The matching Items to the `primary Keys` represented by the Group.
```ts {7,8}
const MY_COLLECTION = createCollection({
   initialData: [{id: 1, name: 'jeff'}, {id: 2, name: 'frank'}, {id: 5, name: 'hans'}]
});

const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 5, 8]);
MY_GROUP.value; // Returns [1, 5, 8]
MY_GROUP.items; // Returns (see below)
// [Item(1), Item(5)]
```
Not existing Items are skipped in the Group `items`.
In the above example, the Item at `id` '8' got skipped
since it doesn't exist.

:::info

The Group `items` is a generated property
and should only be mutated by the Group during a recompute.
We strongly advise not to mutate this property manually.

:::

### 📄 Return

```ts
Array<Item<DataType>>
```


<br />

---

<br />



## `size`

Returns the number of Items the Group represents.
```ts {3}
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 2, 3]);
MY_GROUP.size; // Returns '3'
```

### 📄 Return

```ts
number
```
