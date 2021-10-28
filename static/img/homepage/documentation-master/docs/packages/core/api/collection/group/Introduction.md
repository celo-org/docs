---
id: introduction
title: Group
sidebar_label: Introduction
slug: /core/collection/group
---

A `Group` categorizes and preserves the ordering of structured data.
It allows us to cluster together data from a Collection as an array of `item keys`.
```ts
// The actual Collection
Collection
data -> [Item('id1'), Item('id2'), Item('id10'), Item('id7'), Item('id5')]

// Group1 which represetns the Collection Items in a particular structure
Group1
value  ->  ['id1', 'id5', 'id7']
output ->  [Item('id1'), Item('id5'), Item('id7')]

// Group2 which represetns the Collection Items in another structure
Group2
value  ->  ['id7', 'id1', 'id10', 'id99']
output ->  [Item('id7'), Item('id1'), Item('id10'), Item('id99')]
```
We instantiate a Group with the help of an existing [Collection](../Introduction.md).
By doing so, the Group is automatically bound to the Collection it was created from
and has access to its data.
A Group can be created during the creation of a Collection in the configuration object.
```ts {3}
const MY_COLLECTION = new Collection((collection) =>({
    groups: {
        groupName: collection.Group([/*initial Items*/])
    }
}));

// or just with the name
const MY_COLLECTION_2 = new Collection({
    groups: ['groupName']
});
```
Or dynamically, after the Collection has been instantiated.
```ts
const MY_GROUP = MY_COLLECTION.createGroup("groupName", [/*initial Items*/]);
```
We can add any number of Groups to the Collection, 
and the Collection won't lose its redundancy.
This is because a Group only caches the Item values 
based on the array of `item keys` it represents, 
to avoid unnecessary recomputations.
However, it does not manage or store these Items,
as this is the job of the Collection.
```ts
MY_GROUP.output; // Cached Item values
```
As you can see, the cached Item values are not stored in the `value` property.
Instead, they are stored in the `output` property.
The `value` property represents the actual value of the Group
and is used to keep track of the `item keys` represented by the Group.
```ts
MY_GROUP.value; // Returns [1, 20, 5]
MY_GROUP.output; // Returns (see below)
/* [
     {id: 1, name: "frank"}, 
     {id: 20, name: "jeff"}, 
     {id: 5, name: "hans"}
    ]
*/
```
The Group Class is an extension of the `State Class`
and offer the same powerful functionalities as a normal State.
```ts
// Undo the latest Group value change
MY_STATE.undo();

// Reset the Group to its intial Value
MY_GROUP.reset();

// Permanently store the Group value in an external Storage
MY_STATE.persist(); 
```
Want to learn more about the Group's specific methods?
Check out the [Group Methods](./Methods.md) documentation.
Most methods we use to modify, mutate and access the Group are chainable.
```ts
MY_GROUP.add(1).persist().remove(2).reset().undo();
```


## 🍪 `default` Group
By default, each collected data object is added to the `default` Group,
representing the default Collection pattern.
```ts
// Returns default Group of the Collection
const DEFAULT_GROUP = MY_COLLECTION.getDefaultGroup(); 

// Returns all collected Item values of the Collection
DEFAULT_GROUP.output;
```


## 🔨 Use case
For example, we can use a Group to cluster
a Post Collection into 'User Posts' of the different users.
```ts
// Add userA, userB to the USERS Collection
USERS.collect([userA, userB]);

// Add userA posts and cluster it by the userA id
POSTS.collect(userA.posts, userA.id);

// Add userB posts and cluster it by the userB id
POSTS.collect(userB.posts, userB.id);

// Returns '[1, 2, 6]' (userA posts)
POSTS.getGroup(userA.id).value;

// Returns '[3, 10, 20]' (userB Posts)
POSTS.getGroup(userB.id).value;

// Returns '[1, 2, 3, 4, 5, 6, 10, ..]' (all posts)
POSTS.getDefaultGroup().value; 
```
In the above code snippet, we have two Collections, one for users and another for posts.
We can collect posts specific to a user and automatically group them by the user's id.


## ⛳️ Sandbox
Test the Group yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-group-z5cnk)


## 📭 Props

```ts
MY_COLLECTION.createSelector(initialItems, config);
```

### `initialItems`

The `itemKeys` of the Items that the Group represents.
```ts {1}
const MY_GROUP = MY_COLLECTION.createGroup([1, 2, 3]);
MY_GROUP.value; // Returns '[1, 2, 3]'
```

### `config`

Beside the initial `îtemKeys` a `Group` takes an optional configuration object.
```ts
MY_COLLECTION.createGroup([1, 2, 3], {
    key: "myGroup",
});
```
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface GroupConfigInterface {
    key?: GroupKey;
    isPlaceholder?: boolean;
}
```

<br/>

#### `key`
The optional property `key/name` should be a unique `string/number` to identify the Group later.
```ts
MY_COLLECTION.createGroup([1, 2, 3], {
    key: "myKey"
});
```
We recommend giving each Group a unique `key` since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the Group
- no need for separate persist Key

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | No       |

<br/>

#### `isPlaceholder`

:::warning

This property is mainly thought for the internal use.

:::

Defines whether the Group is a `placeholder`.
```ts
const MY_GROUP = createGroup([1, 2, 3], {
    isPlaceholder: true
});

MY_GROUP.exists(); // false
```
Groups are `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.
This can be the case if we use the `getGroupWithReference()` method,
which returns a `placeholder` Group if the Group we are looking for doesn't exist yet.
```ts
const myGroup = useAgile(MY_COLLECTION.getGroupWithReference("group1")); // Causes rerender if Group got created
const myGroup2 = useAgile(MY_COLLECTION.getGroup("group2")); // Doesn't causes rerender if Group got created
```
This reference is essential to rerender the Component,
whenever the Group got instantiated.

| Type            | Default     | Required |
|-----------------|-------------|----------|
| `boolean`       | false       | No       |


## 🟦 Typescript

The `Group Class` is almost 100% typesafe.
