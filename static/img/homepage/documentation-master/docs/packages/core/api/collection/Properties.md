---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/collection/properties
---

:::info

Here are valuable properties of the `Collection Class` listed.

:::

## `agileInstance`

The [`agileInstance`](../agile-instance/Introduction.md) to which the Collection belongs.
```ts
MY_COLLECTION.agileInstance(); // Returns a Agile Instance
```
Be aware that the `agileInstance` property is of the type `function`,
to avoid endless deep classes.

### 📄 Return

```ts
Agile
```



<br />

---

<br />



## `key`

The current `key/name` of the Collection,
which is used for a unique identification.
```ts {2}
const MY_COLLECTION = createCollection({key: 'jeffKey'});
MY_COLLECTION.key; // Returns 'jeffKey'
```
Besides accessing the `key`, we can also assign a new `key` using this property.
```ts {1}
MY_COLLECTION.key = "myCoolCollection";
MY_COLLECTION.key; // Returns 'myCoolCollection'
```

### 📄 Return

```ts
string | number
```



<br />

---

<br />



## `size`

Returns how many Items the Collection currently stores.
```ts {3}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.collect({id: 5, name: "frank"});
MY_COLLECTION.size; // Returns '2'
```
Placeholder Items don't get counted.

### 📄 Return

```ts
number
```


<br />

---

<br />



## `data`

In the `data` object all [Items](./Introduction.md#-item) of the Collection are stored.
```ts {3}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.collect({id: 5, name: "frank"});
MY_COLLECTION.data; // Returns (see below)
// {
//   1: Item({id: 1, name: "jeff"}),
//   5: Item({id: 5, name: "frank"})
// }
```
It is best not to touch the `data` object at all
and use the functions provided by the Collection to mutate and get access to it instead.
For example, to get one specific Item, we should use the `getItem()` method.
```ts {1}
MY_COLLECTION.getItem(1); // Good pattern
MY_COLLECTION.data[1]; // Bad pattern
```

### 📄 Return

```ts
{ [key: string]: Item<DataType> }
```



<br />

---

<br />



## `isPersisted`

If the Collection `value` is stored in an external Storage like the [Local Storage](https://developer.mozilla.org/de/docs/Web/API/Window/localStorage).
```ts {1,3}
MY_COLLECTION.isPersisted; // Returns 'false'
MY_COLLECTION.persist();
MY_COLLECTION.isPersisted; // Returns 'true' if the persist was successful
```
The `value` of the Collection includes:
- `default` Group
- all Items 

All other Instances that refer to the Collection have to be persisted separately if desired.
```ts
MY_COOL_GROUP.persist();
```

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `groups`

In the `groups` object all [Groups](./group/Introduction.md) of the Collection are stored.
```ts {3}
MY_COLLECTION.createGroup("group1", [1, 2, 3]);
MY_COLLECTION.createGroup("group2", [1, 7, 4]);
MY_COLLECTION.groups; // Returns (see below)
// {
//   group1: Group([1, 2, 3]),
//   group2: Group([1, 7, 4])
// }
```
It is best not to touch the `groups` object at all
and use the functions provided by the Collection to mutate and get access to it instead.
For example, to get one specific Group, we should use the `getGroup()` method.
```ts {1}
MY_COLLECTION.getGroup(1); // Good pattern
MY_COLLECTION.groups[1]; // Bad pattern
```

### 📄 Return

```ts
{ [key: string]: Group<DataType> }
```



<br />

---

<br />



## `selectors`

In the `selectors` object all [Selectors](./selector/Introduction.md) of the Collection are stored.
```ts {3}
MY_COLLECTION.createSelector("selector1", 1);
MY_COLLECTION.createSelector("selector2", 7);
MY_COLLECTION.selectors; // Returns (see below)
// {
//   selector1: Selector(1),
//   selector2: Selector(7)
// }
```
It is best not to touch the `selectors` object at all
and use the functions provided by the Collection to mutate and get access to it instead.
For example, to get one specific Selector, we should use the `getSelector()` method.
```ts {1}
MY_COLLECTION.getSelector(1); // Good pattern
MY_COLLECTION.selectors[1]; // Bad pattern
```

### 📄 Return

```ts
{ [key: string]: Selector<DataType> }
```
