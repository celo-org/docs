---
id: introduction
title: Collection
sidebar_label: Introduction
slug: /core/collection
---

A `Collection` represents a reactive _set_ of Information 
that we need to remember globally at a later point in time.
While offering a toolkit to use and mutate this _set_ of Information.
It is designed for arrays of `data objects` following the same pattern.
Each of these data objects requires a **unique `item key`** to be correctly identified later.
Think of a Collection like a database table, 
that stores a data object once keyed by an id (`item key`).
All you need to instantiate a Collection, is to call `createCollection()`.
```ts
const MY_COLLECTION = createCollection();
```
We can create as many Collections as we need and bind them flexible to any UI-Component. 
Now that we have instantiated a Collection, we can dynamically and easily manipulate its value.
```ts
// Add new Item to the Collection
MY_COLLECTION.collect({id: 1, name: "jeff"}); 

// Remove Item at id '1' from the Collection
MY_COLLECTION.remove(1).everywhere(); 

// Permanently store the Collection value in an external Storage
MY_COLLECTION.persist();

// Reset the Collection to it's inital value
MY_COLLECTION.reset(); 
```
Want to learn more about the Collection's specific methods? 
Check out the [Collection Methods](./Methods.md) documentation. 
Most methods we use to modify, mutate and access the Collection are chainable.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}).persist().removeGroup('myGroup').reset();
```

### 👾 Advantages over Array States
- Data is stored and indexed by `item keys`
- Each data collected is stored inside an extended 
  [State Instance](../state/Introduction.md) called [Item](#-item)
- Efficient persisting of Collection data in an external Storage (e.g. Local Storage)
- Easily categorization of data by `item keys` with help of [Groups](#-groupgroupintroductionmd)
- Selection of a single Item via an `item key` with a [Selector](#-selectorselectorintroductionmd)
- Performant (⚠️ getting there, currently it can handle `~ 500 ops/sec` in a [1000 Fields List](https://github.com/agile-ts/agile/tree/master/benchmark))


### 🔨 Use case
We might use a Collection to remember a flexible and reactive array of todo objects.
```ts
const TODOS = createCollection();
// <- add todos
TODOS.collect({id: 1, todo: "Clean bathroom"}, ["user1"]);
TODOS.collect({id: 2, todo: "Write Agile docs"},  ["user1"]);
// <- cleaned bathroom
TODOS.remove(1).everywhere();
```
In the example above, we create an empty `TODO` Collection.
After the instantiation, we add two todo items to the Collection
and specify that both todo items remain to the `user1` [Group](#-groupgroupintroductionmd).
We do that to keep track of which todo relates to which user.
Now that we `cleaned our bathroom` as `user1`,
we remove the todo related to the id `1` from the Collection and all Groups (-> everywhere).


### ⛳️ Sandbox
Test the Collection yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/agilets-first-collection-uyi9g)
- [Vue](https://codesandbox.io/s/agilets-first-state-i5xxs)


## 🗂️ Collection Classes

A Collection consists of several classes, 
all of which play an essential role.


### 🔹 Item

Each data object collected (for example, via the `collect()` method) 
is stored inside an extended [State Instance](../state/Introduction.md) called `Item`.
All Items reside in a single source of truth `data` object in the Collection.
To avoid redundancy, these Items of the `data` object 
are only accessed and cached by internal classes when needed.
```ts title="data object"
{
  99: Item(99) // has value '{id: 99, name: "frank"}'
  1: Item(1)  // has value '{id: 1, name: "jeff"}'
  2: Item(2) // has value '{id: 2, name: "hans"}'
}
```
Since the `Item` is an extension of the State, 
it provides the same powerful functionalities as a normal State.
```ts
// Collect Data
MY_COLLECTION.collect({id: 1, name: "jeff"}); 

// Get Item at itemKey '1'
const myItem = MY_COLLECTION.getItem(1); // Returns Item at primaryKey '1'
console.log(myItem.value); // Returns '{id: 1, name: "jeff"}'

// Update property 'name' in Item
myItem.patch({name: "frank"});

// Undo latest Item value change
myItem.undo(); 
```


### 👨‍👧‍👦 [Group](./group/Introduction.md)

Often applications need to categorize and preserve the ordering of structured data.
In AgileTs, Groups are the cleanest way to do so.
They allow us to cluster together data from a Collection as an array of `item keys`.
```ts
const MY_GROUP = MY_COLLECTION.createGroup("groupName", [/* initial Items */]);
```
A Group caches the Item values
based on the array of `item keys` it represents,
to avoid unnecessary recomputations.
However, it does not manage or store these Items,
that is the job of the Collection.
```ts
MY_GROUP.output; // Cached Item values
```
Also, Groups are an extension of the `State Class` 
and offer the same powerful functionalities as a normal State.
```ts
// Undo latest Group value change
MY_STATE.undo();

// Reset Group to its intial Value
MY_GROUP.reset();

// Permanently store Group value in an external Storage
MY_STATE.persist(); 
```


### 🔮 [Selector](./selector/Introduction.md)

A Selector selects a single Item from a Collection by its `item key`.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector(/* to select primary Key */);
```
Selectors are smart, they always keep in sync with the Collection.
```ts
// Updates the value in the corresponding Item
// and thus updates the cached value of the Selector.
MY_SELECTOR.patch({name: "frank"}); 
```
You don't even have to worry about selecting not existing Items.
If you select an `item key` that doesn't exist in the Collection yet,
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


## 📭 Props

```ts
new Collection(agileInstance, config);
// or 
createCollection(config);
```

### `config`

A `Collection` takes an optional configuration object as its only parameter.
There are two different ways of configuring a Collection. Both have their advantages.

- **1.** The plain _object_ way, which is notorious for its ease of use.
  Here, we configure everything in a specific object. For instance, this makes the creation of Instances like Groups pretty straightforward.
  But on the other hand, it gives us some limitations, since we aren't creating and configuring the Groups and Selectors on our own.
  The Collection takes care of it instead.
     ```ts
     createCollection({
       key: 'dummyCollection',
       group: ["dummyGroup"]
     })
     ```

- **2.** The _function_ way, where a function, which has the Collection as the first parameter, returns the configuration object.
  This gives us more freedom in configuring Instances like Groups,
  because we have access to the Collection and can create them on our own.
     ```ts
     createCollection((collection) => ({
       key: 'dummyCollection',
       group: {
          dummyGroup: collection.Group(["item1", "item2"])
        }
     }))
     ```

Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface CreateCollectionConfigInterface<DataType = DefaultItem> {
  groups?: { [key: string]: Group<any> } | string[];
  selectors?: { [key: string]: Selector<any> } | string[];
  key?: CollectionKey;
  primaryKey?: string;
  defaultGroupKey?: GroupKey;
  initialData?: Array<DataType>;
}
```

<br/>

#### `groups`
Our Collection's initial [Groups](#-groupgroupintroductionmd) are defined with this property's help.
There are two different ways of doing so.
The first one is to pass an Array of Group keys/names,
where AgileTs takes care of the Group's creation and names them according to the passed keys.
```ts
createCollection({
  groups: ["myGroup1", "myGroup2"]
});
```
The way mentioned above has some limitations, since we can't configure the Groups ourselves.
Fortunately, there is a second way where we have access to the Collection itself,
and can define and configure the Groups on our own.
```ts
createCollection((collection) => ({
  key: 'dummyCollection',
  group: {
    myGroup1: collection.Group(["item1", "item2"], {/* some configuration */}),
    myGroup2: collection.Group(["item5", "item2", "item6"])
  }
}));
```

| Type                                                 | Default     | Required |
|------------------------------------------------------|-------------|----------|
| `{ [key: string]: Group<DataType> }  \| string[]`    | {}          | No       |

<br/>

#### `selectors`
Our Collection's initial [Selectors](#-selectorselectorintroductionmd) are defined with this property's help.
As with the `groups` property, there are two different ways of doing so.
The first one is to pass an Array of Selector keys/names,
where AgileTs takes care of the Selector's creation and names them according to the passed keys.
```ts
createCollection({
  selectors: ["mySelector1", "mySelector2"]
});
```
The way mentioned above has some limitations, since we can't configure the Selectors ourselves.
Fortunately, there is a second way where we have access to the Collection itself,
and can define and configure the Selectors on our own.
```ts
createCollection((collection) => ({
  key: 'dummyCollection',
  selectors: {
    mySelector1: collection.Selector("item1", {/* some configuration */}),
    mySelector2: collection.Selector("item3")
  }
}));
```

| Type                                                 | Default     | Required |
|------------------------------------------------------|-------------|----------|
| `{ [key: string]: Selector<DataType> }  \| string[]` | {}          | No       |

<br/>

#### `key`
The optional property `key/name` should be a unique `string/number` to identify the Collection later.
```ts
createCollection({
  key: "myKey"
});
```
We recommend giving each Collection a unique `key`, since it has only advantages:
- helps us during debug sessions
- makes it easier to identify the Collection
- no need for separate persist Key

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | No       |

<br/>

#### `primaryKey`
Defines which property's value in collected data is selected as `primaryKey`.
By default, it is `id`. A `primaryKey` identifies a specific Item and has to be part of each collected data.
```ts
const MY_COLLECTION = createCollection({
  primaryKey: "key"
});
MY_COLLECTION.collect({key: 1, name: "hans"});
//                      ^
//                      |
// primary Key ----------
```

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | 'id'        | No       |

<br/>

#### `defaultGroupKey`
Describes the `key/name` of the default [Group](#-groupgroupintroductionmd).
By default, it is `default`.
```ts
createCollection({
  defaultGroupKey: "allItemsOfCollectionKey"
});
```
The default Group represents all Items of the Collection.

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | 'default'   | No       |

<br/>

#### `initialData`
Here we can set the initial Data of our Collection.
```ts
createCollection({
  initialData: [{id: 1, name: "hans"}, {id: 2, name: "frank"}]
});
```

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `Array<DataType>`  | []          | No       |


## 🟦 Typescript

A `Collection` is almost 100% typesafe and takes an optional generic type for type safety
that has to be followed by each collected data object.
```ts {6}
interface UserInterface {
  id: number,
  name: string
}

const MY_COLLECTION = createState<UserInterface>();
MY_COLLECTION.collect({id: "invalidType", animal: "Lion"}); // type Error
MY_COLLECTION.collect({id: 1, name: "hans"}); // Success
```
