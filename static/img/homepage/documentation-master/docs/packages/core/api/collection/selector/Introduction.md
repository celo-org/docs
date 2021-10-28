---
id: introduction
title: Selector
sidebar_label: Introduction
slug: /core/collection/selector
---

A `Selector` selects a single [Item](../Introduction.md#-item) from a Collection by its `item key`.
It can be mutated dynamically and always remains in sync with the Collection.
Ui-Components that only need one piece of data from a Collection, such as the "current user"
would benefit from using Selectors.
```ts
// Select a specific User from the USERS Collection
const CURRENT_USER = USERS.select(loggedInUserId);

// Update the 'name' property of the CURRENT_USER,
// which is automatically synchronized with the Collection
CURRENT_USER.patch({name: 'jeff'});
```
We instantiate a Selector with the help of an existing [Collection](../Introduction.md).
By doing so, the Selector is automatically bound to the Collection it was created from
and has access to its data.
A Selector can be created during the creation of a Collection in the configuration object.
```ts {3}
const MY_COLLECTION = new Collection((collection) =>({
    selectors: {
        selectorName: collection.Selector('item1')
    }
}));
```
Or dynamically, after the Collection has been instantiated.
```ts
MY_COLLECTION.createSelector("selectorName", /*to select Item Key*/);
//or
MY_COLLECTION.select(/*to select Item Key*/);
```
We can add any number of Selectors to the Collection,
and the Collection won't lose its redundancy.
This is because a Selector only caches the Item value based on the `item key` it represents,
to avoid unnecessary recomputations.
```ts
MY_SELECTOR.value; // Cached Item value
MY_SELECTOR.itemKey; // Item Key the Selector represents
```
Sometimes we need to select Items that might not exist yet.
If you try to select an `item key` that doesn't exist in the Collection,
the Selector will return `null`.
However once the corresponding data is collected under that `item key`,
the Selector will update seamlessly.
```ts
// Select not existing Item
const MY_SELECTOR = MY_COLLECTION.createSelector('id0');
console.log(MY_SELECTOR.value); // Returns 'null'

// Collect selected Item
MY_COLLECTION.collect({id: 'id0', name: 'jeff'});
console.log(MY_SELECTOR.value); // Returns '{id: 'id0', name: 'jeff'}'
```
A Selector is an extension of the `State Class`
and offers the same powerful functionalities.
```ts
// Undo latest Selector value change
MY_SELECTOR.undo();

// Permanently store Selector value in an external Storage
MY_SELECTOR.persist(); 
```
With these extended State functionalities,
we can easily mutate the Selector value.
The changes we make to the Selector value are automatically applied to the Collection
to keep them synchronized.
```ts
// Add data with the item key '1' to the Collection
MY_COLLECTION.collect({id: 1, name: 'hans'});

// Select the Item with the item key '1'
const MY_SELECTOR = MY_COLLECTION.createSelector(1);

// Update the Selector value
MY_SELECTOR.patch({name: "jeff"});

// Check if the Item value was updated correctly
MY_COLLECTION.getItem(1)?.value; // Returns '{id: 1, name: 'jeff'}'
```
Of course, this also works the other way around.
Meaning if you update the value of the Item that the Selector represents,
the value changes are applied to the Selector.
```ts
// Update the Item value
MY_COLLECTION.getItem(1)?.patch({name: "frank"});

// Check if the Selector value was updated correctly
MY_SELECTOR.value; // Returns '{id: 1, name: 'frank'}'
```
Besides, updating the Selector value,
we can also entirely change the Item which the Selector represents.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector(1);  // Has Item 2 selected
MY_SELECTOR.select(2); // Has now Item 1 selected
```
Want to learn more about the Selector's specific methods?
Check out the [Selector Methods](./Methods.md) documentation.
Most methods we use to modify, mutate and access the Selector are chainable.
```ts
MY_SELECTOR.select(1).persist().undo();
```


## 🔨 Use case
For instance, we can use a Selector to select the current logged-in User from a User Collection.
```ts
const CURRENT_USER = USERS.select(/* current logged-in userId */);
```
If the currently logged-in user logs out and logs in with another user account,
we can easily update the `Item` (User) that the Selector represents.
```ts
CURRENT_USER.select(/* another userId */);
```


## ⛳️ Sandbox
Test the Selector yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-selector-rmrxf)


## 📭 Props

```ts
MY_COLLECTION.createSelector(itemKey, config);
```

### `itemKey`

The `itemKey` of the Item the Selector represents.
```ts {2}
MY_COLLECTION.collect({id: 1, name: 'hans'});
const MY_SELECTOR = MY_COLLECTION.select(1);
MY_SELECTOR.value; // Returns '{id: 1, name: 'hans'}'
```

### `config`

Beside the initial `itemKey` a `Selector` takes an optional configuration object.
```ts
MY_COLLECTION.createSelector(1, {
    key: "mySelector",
});
```
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface SelectorConfigInterface {
    key?: SelectorKey;
    isPlaceholder?: boolean;
}
```

<br/>

#### `key`
The optional property `key/name` should be a unique `string/number` to identify the Selector later.
```ts
MY_COLLECTION.createSelector(1, {
    key: "myKey"
});
```
We recommend giving each Selector a unique `key` since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the Selector
- no need for separate persist Key

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | No       |

<br/>

#### `isPlaceholder`

:::warning

This property is mainly thought for internal use.

:::

Defines whether the Selector is a `placeholder`.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector(1, {
    isPlaceholder: true
});

MY_SELECTOR.exists(); // false
```
Selectors are `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.
This can be the case if we use the `getSelectorWithReference()` method,
which returns a `placeholder` Selector if the Selector we are looking for doesn't exist yet.
```ts
const mySeleector = useAgile(MY_COLLECTION.getSelectorWithReference("selector1")); // Causes rerender if Selector got created
const mySeleector2 = useAgile(MY_COLLECTION.getSelector("selector2")); // Doesn't causes rerender if Selector got created
```
This reference is essential to rerender the Component,
whenever the Selector got instantiated.

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | false       | No       |


## 🟦 Typescript

The `Selector Class` is almost 100% typesafe.
