---
id: methods
title: Methods
sidebar_label: Methods
slug: /core/collection/methods
---

:::info

Here are valuable methods of the `Collection Class` listed.

:::

## `setKey()`

Assigns a new `key/name` to the Collection.
```ts {1}
MY_COLLECTION.setKey("newKey");
MY_COLLECTION.key; // Returns 'newKey'
```

### ❓ Why a Key
- helps us during debug sessions
- makes it easier to identify the Collection
- no need for separate persist Key

### 📭 Props

| Prop           | Type                             | Default    | Required |
|----------------|----------------------------------|------------|----------|
| `value`        | string \| number \| undefined    | undefined  | Yes      |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `Group()`

Creates a new [Group](./group/Introduction.md) without associating it to the Collection.
Therefore, this function is intended for use in the Collection `config` object,
where the `constructor()` takes care of the associating.
```ts {3}
createCollection((collection) => ({
  groups: {
    myGroup: collection.Group(["item1", "item2"])
  }
}));
```
The `itemKeys` which the Group initially represents are passed as a first parameter in an array shape.
```ts
collection.Group(["item1", "item2"]);
```
The object key is used as `groupKey`, if we don't pass a separate key into the Group `config`.
```ts {3,9}
createCollection((collection) => ({
    groups: {
        myGroup: collection.Group(["item1", "item2"], {key: "myCoolGroup"}) // Key === "myCoolGroup"
    }
}));

createCollection((collection) => ({
    groups: {
        myGroup: collection.Group(["item1", "item2"]) // Key === "myGroup"
    }
}));
```
For creating Groups in general (outside the `Collection config`), we strongly recommend using the [`createGroup()`](#creategroup) method
because it directly associates the Group to the Collection without further thinking.
```ts
MY_COLLECTION.createGroup('myGroup', ['item1', 'item2']);
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `initialItems` | Array<string \| number>                                                   | []         | Initial itemKeys of Group                             | No       |
| `config`       | [GroupConfig](../../../../Interfaces.md#groupconfig)                      | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Group
```



<br />

---

<br />



## `Selector()`

Creates a new [Selector](./selector/Introduction.md) without associating it to the Collection.
Therefore, this function is intended for use in the Collection `config` object,
where the `constructor()` takes care of the associating.
```ts {3}
createCollection((collection) => ({
    selectors: {
        mySelector: collection.Selector("item1")
    }
}));
```
The `itemKey` of the Item which the Selector initially represents is passed as a first parameter.
```ts
collection.Selector("item1");
```
The object key is used as `selectorKey`, if we don't pass a separate key into the Selector `config`.
```ts {3,9}
createCollection((collection) => ({
    selectors: {
        mySelector: collection.Selector("item1", {key: "myCoolSelector"}) // Key === "myCoolSelector"
    }
}));

createCollection((collection) => ({
    selectors: {
        mySelector: collection.Selector("item1") // Key === "mySelector"
    }
}));
```
For creating Selectors in general (outside the `Collection Config`), we strongly recommend using the [`createSelector()`](#createselector) method
because it directly associates the Selector to the Collection, without further thinking.
```ts
MY_COLLECTION.createSelector('mySelector', 'toSelectKey');
```


### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `initialKey`   | string \| number                                                          | undefined  | Initial itemKey of Item the Selector represents       | Yes      |
| `config`       | [SelectorConfig](../../../../Interfaces.md#selectorconfig)                | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Selector
```



<br />

---

<br />

## `initSelectors()`

:::warning

**No public function!** (only public for testing purpose) <br/>
It is called once after the Collection is created
and takes care of creating Selectors defined in the Collection `config` object.

:::



<br />

---

<br />



## `initGroups()`

:::warning

**No public function!** (only public for testing purpose) <br/>
It is called once after the Collection is created
and takes care of creating Groups defined in the Collection `config` object.
In addition, it instantiates the `default` Group,
which is like an interface to all collected data.

:::



<br />

---

<br />



## `collect()`

We use the `collect()` method to add object-shaped data to the Collection.
Be aware that each data needs one `primaryKey` to be correctly identified later.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"});
```
In the above example, the `primaryKey` property is `id`,
so '1' is the unique identifier (`primaryKey`) of the collected data.
We can also collect multiple data objects at once.
```ts
MY_COLLECTION.collect([{id: 9, name: "hans"}, {id: 22, name: "frank"}]);
```
Each collected data is transformed to an extension of the `State Class` called [`Item`](./Introduction.md/#-Item).
All Items are directly stored in the Collection.
```ts
{
    1: Item(1) // has value '{id: 1, name: "jeff"}'
    9: Item(9)  // has value '{id: 9, name: "hans"}'
    22: Item(22) // has value '{id: 22, name: "frank"}'
}
```

### 👨‍👩‍👧 Add Data to Group
We can directly define in the `collect()` method to which [Groups](./group/Introduction.md)
the data should be added. Groups are used to preserve the ordering of structured data
and can be seen as an interface to the actual Collection data.
```ts
MY_COLLECTION.collect({id: 1, name: "jeff"}, ["group1", "group2"]);
```
If we pass a key that belongs to a not existing Group,
the `collect()` method takes care of creating this Group.
For example, if we assume that the Group with the `groupKey` 'group1' doesn't exist yet.
Then a Group with the initial `itemKeys` '[1]'
and the `groupKey` 'group1' is created by the Collection.
```ts
// Groups of Collection
{
    group1: Group("group1"), // value [1] 
    group2: Group("group2"), // value [1]
    default: Group("default") // value [1, 9, 22]
}
```
By default, all collected data is added to the `default` Group.
In conclusion, we can draw that the `default` Group represents all [Items](./Introduction.md#-item) of the Collection.
But don't forget that each Item is stored directly in the Collection and not in the Group.
Imagine Groups as interfaces to the stored Items.

### 🌎 Existing primaryKey
We don't have to worry about collecting an already existing `primaryKey`.
If this is the case, the existing data gets simply overwritten by the new one.
```ts {3}
MY_COLLECTION.collect({id: 1, name: "jeff"}); 
MY_COLLECTION.getItemValue(1); // Returns '{id: 1, name: "jeff"}'
MY_COLLECTION.collect({id: 1, name: "benno"}); // Overwrites already collected Data
MY_COLLECTION.getItemValue(1); // Returns '{id: 1, name: "benno"}'
```

### 🔑 Change primaryKey property
Sometimes the `primaryKey` isn't represented by the `id` property.
If that is the case, we can change the `primaryKey` property in the Collection `config`.
```ts {2}
createCollection({
    primaryKey: "key" // default 'id'
}); 
MY_COLLECTION.collect({key: 1, name: "frank"});
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `data`         | DataType \| Array<DataType\> (DataType = Object)                          | []         | Data added to the Collection                          | Yes      |
| `groupKeys`    | Array<string \| number\>                                                  | []         | Keys of Groups to which the Data will be added        | No       |
| `config`       | [CollectConfig](../../../../Interfaces.md#collectconfig)                  | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `update()`

The `update()` method is used to update the Item data at the given `primaryKey`.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "hans"});
MY_COLLECTION.update(1, {name: "frank"});
MY_COLLECTION.getItem(1); // Returns '{id: 1, name: "frank"}'
```
Therefore, we pass the `primary Key` of the Item, which should be updated as the first parameter.
And specify as the second parameter the data object that is merged into the found Item data by default.

### 🌪 Overwrite Data
In order to overwrite the entire Item data with the passed data object, we set `patch` to `false` in the configuration object.
The configuration object can be passed as a third parameter.
```ts
MY_COLLECTION.update(1, {id: 1, name: 'hans'}, {patch: false});
```
Because the changes are not merged into the Item data anymore, we have to redefine the `primaryKey` in the given data object.
Otherwise, the `primary Key` gets missing, which can lead to problems.

### ❓ Deepmerge
Unfortunately, the `update()` method doesn't support `deep merges` yet.
In conclusion, the merge only happens at the top-level of the objects.
If AgileTs can't find a particular property, it will add it at the top-level of the Item data object.
```ts {2}
MY_COLLECTION.collect({id: 1, data: {name: "jeff"}});
MY_COLLECTION.update(1, {name: "frank"}); // new value is (see below)
// {id: 1, data: {name: "jeff"}, name: "frank"}
```
In case we don't want to add not existing properties to the Item data object,
we can set `addNewProperties` to `false` in the configuration object.
```ts {2}
MY_COLLECTION.collect({id: 1, data: {name: "jeff"}});
MY_COLLECTION.update(1, {name: "frank"}, {patch: {addNewProperties: false}}); // new value is (see below)
// {id: 1, data: {name: "jeff"}}
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `itemKey`      | number \| string                                                          | undefined  | `primary Key` of the Item that will be updated        | Yes      |
| `changes`      | object                                                                    | {}         | Data merged into the found Item data                  | Yes      |
| `config`       | [UpdateConfig](../../../../Interfaces.md#updateconfig)                    | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `createGroup()`

Creates a new [Group](./group/Introduction.md) and automatically associates it to the Collection.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 2, 3]); 
```
To correctly identify the Group later, we must pass a unique `key/name` as the first parameter.
Such `key` is, for instance, required to remove or access the Group.
```ts
const MY_GROUP = MY_COLLECTION.getGroup('myGroup');
```
The `itemKeys` which the Group initially represents are passed as the second parameter in an array shape.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 3, 7, 9]); 
```
It's not necessary to pass only existing `itemKeys`. However, we strongly recommend it.
If a Group can't find an Item to an `itemKey` in the Collection,
it prints a warning and skips the Item in the Group's `output`.
Let's assume that the Item with the primaryKey '3' doesn't exist.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [1, 3, 7]); 
MY_GROUP.output; // Returns (see below)
/*
[
  {id: 1, name: 'jeff'},
  // No Item(3) value, since it doesn't exist
  {id: 7, name: 'frank'}
]
 */
```
The Collection holds a reference to each not existing Item.
This reference makes it possible to add the Item to the Group `output`
and trigger a rerender on all subscribed UI-Components when the missing Item got collected.

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Group                                     | Yes      |
| `initialItems` | Array<string \| number\>                                                  | []         | Initial itemKeys of Group                             | No       |

### 📄 Return

```ts
Group
```



<br />

---

<br />



## `hasGroup()`

Checks if a [Group](./group/Introduction.md) exists at the given `groupKey` in the Collection.
```ts {1,3}
MY_COLLECTION.hasGroup('group5'); // Returns false
MY_COLLECTION.createGroup('group6');
MY_COLLECTION.hasGroup('group6'); // Returns true
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Group                                     | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `getGroup()`

Returns the [Group](./group/Introduction.md) at the given `groupKey`.
```ts 
const MY_GROUP = MY_COLLECTION.getGroup('myGroup');
```
If it can't find the desired Group, it returns `undefined`.

:::info

The `getGroup()` method is perfect for accessing a Group in our business logic.
However, it has some disadvantages when we use it to subscribe a Group to a UI-Component using, for instance, the `useAgiel()` hook.
The reason is that it returns `undefined` whenever the Group doesn't exist.
Thus, AgileTs can't keep a reference to the Group and isn't able to rerender the subscribed UI-Component, whenever the Group is created.
To solve this problem the Collection provides a function called [`getGroupWithReference()`](#getgroupwithreference)
which returns a reference to the not existing Group instead of `undefined`.

:::

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Key/Name of Group                                     | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Group | undefined
```



<br />

---

<br />



## `getDefaultGroup()`

Returns the default [Group](./group/Introduction.md) of the Collection.
```ts 
MY_COLLECTION.getDefaultGroup();
// equal to
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey);
```
If it can't find the default Group, it returns `undefined`.
But if that is the case, something big has gone wrong.

### 📄 Return

```ts
Group | undefined
```



<br />

---

<br />



## `getGroupWithReference()`

Returns like [`getGroup()`](#getgroup) the Group at the given `groupKey`.
```ts 
const MY_GROUP = MY_COLLECTION.getGroupWithReference('myGroup');
```
However, it differs in one key area. It doesn't return `undefined`, if it couldn't find the desired Group.
Instead, it returns a `placeholder` Group to hold a reference to the not existing Group.
For example, such a reference is helpful to reliably subscribe a not existing Group to a UI-Component, for instance, with the `useAgile()` hook.
```ts
// Doesn't cause rerender, when Group is created and returns undefined
const myGroup = useAgile(MY_COLLECTION.getGroup('myGroup'));

// Does cause rerender, when Group is created and returns an empty array
const myGroupWithReference = useAgile(MY_COLLECTION.getGroupWithReferenece('myGroup'));
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Required |
|----------------|---------------------------------------------------------------------------|------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Yes      |

### 📄 Return

```ts
Group
```



<br />

---

<br />



## `removeGroup()`

Removes [Group](./group/Introduction.md) at the given `groupKey` from the Collection.
```ts 
MY_COLLECTION.removeGroup('myGroup');
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Required |
|----------------|---------------------------------------------------------------------------|------------|----------|
| `groupKey`     | number \| string                                                          | undefined  | Yes      |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `createSelector()`

Creates a new [Selector](./selector/Introduction.md), and automatically associates it to the Collection.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector('mySelector', 'itemKey'); 
```
To correctly identify the Selector later, we have to pass a unique `key/name` as the first parameter.
Such `key` is, for instance, required to remove or access the Selector.
```ts
const MY_SELECTOR = MY_COLLECTION.getSelector('mySelector');
```
The `itemKey` to the Item which the Selector initially represents is passed as the second parameter.
```ts
const MY_SELECTOR = MY_COLLECTION.createSelector('currentUser', 1); 
```

:::info

Often we call the `selectorKey` like the `itemKey` the Selector selects.
If that is the case, we can use the [`select()`](#select) method,
which creates like the `createSelector()` method a Selector.
But we don't have to pass a separate `selctorKey`,
because it uses the passed `itemKey` as `selectorKey`.
```ts
const MY_SELECTOR = MY_COLLECTION.select('itemKey'); 
```

:::

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `selectorKey`  | number \| string                                                          | undefined  | Key/Name of Selector                                  | Yes      |
| `itemKey`      | number \| string                                                          | undefined  | Initial itemKey of Item the Selector represents       | Yes      |

### 📄 Return

```ts
Selector
```



<br />

---

<br />



## `select()`

Creates like the `createSelector()` method a new [Selector](./selector/Introduction.md),
and automatically associates it to the Collection.
However, we don't have to pass a separate `selecotorKey`, because it uses the passed `itemKey` as `selectorKey`
```ts
const MY_SELECTOR = MY_COLLECTION.select('itemKey'); 
MY_SELECOTR.key; // Returns 'itemKey'
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `itemKey`      | number \| string                                                          | undefined  | Initial itemKey of Item the Selector represents       | Yes      |

### 📄 Return

```ts
Selector
```



<br />

---

<br />



## `hasSelector()`

Checks if a [Selector](./selector/Introduction.md) exists at the given `selectorKey` in the Collection.
```ts {1,3}
MY_COLLECTION.hasSelector('selector4'); // Returns false
MY_COLLECTION.createSelector('selector8', 'itemKey');
MY_COLLECTION.hasSelector('selector8'); // Returns true
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `selectorKey`  | number \| string                                                          | undefined  | Key/Name of Selector                                  | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `getSelector()`

Returns the [Selector](./selector/Introduction.md) at the given `selectorKey`.
```ts 
const MY_SELECTOR = MY_COLLECTION.getSelector('mySelector');
```
If it can't find the desired Selector, it returns `undefined`.

:::info

The `getSelector()` method is perfect for accessing a Selector in our business logic.
However, it has some disadvantages when we use it to subscribe a Selector to a UI-Component using, for instance, the `useAgiel()` hook.
The reason is that it returns `undefined` whenever the Selector doesn't exist.
Thus, AgileTs can't keep a reference to the Selector and isn't able to rerender the subscribed UI-Component, whenever the Selector is created.
To solve this problem the Collection provides a function called [`getSelectorWithReference()`](#getselectorwithreference)
which returns a reference to the not existing Selector instead of `undefined`.

:::

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `selectorKey`  | number \| string                                                          | undefined  | Key/Name of Selector                                  | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Selector | undefined
```



<br />

---

<br />



## `getSelectorWithReference()`

Returns like [`getSelector()`](#getselector) the Selector at the given `selectorKey`.
```ts 
const MY_SELECTOR = MY_COLLECTION.getSelectorWithReference('mySelector');
```
However, it differs in one key area. It doesn't return `undefined`, if it couldn't find the desired Selector.
Instead, it returns a `placeholder` Selector to hold a reference to the not existing Selector.
For example, such a reference is helpful to reliably subscribe a not existing Selector to a UI-Component, for instance, with the `useAgile()` hook.
```ts
// Doesn't cause rerender, when Selector is created
const mySelector = useAgile(MY_COLLECTION.getSelector('mySelector'));

// Does cause rerender, when Selector is created
const mySelectorWithReference = useAgile(MY_COLLECTION.getSelectorWithReferenece('mySelector'));
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Required |
|----------------|---------------------------------------------------------------------------|------------|----------|
| `selectorKey`  | number \| string                                                          | undefined  | Yes      |

### 📄 Return

```ts
Selector
```



<br />

---

<br />



## `removeSelector()`

Removes [Selector](./selector/Introduction.md) at the given `selectorKey` from the Collection.
```ts 
MY_COLLECTION.removeSelector('mySelector');
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Required |
|----------------|---------------------------------------------------------------------------|------------|----------|
| `selectorKey`  | number \| string                                                          | undefined  | Yes      |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `hasItem()`

Checks if an Item exists at the given `itemKey` in the Collection.
```ts {1,3}
MY_COLLECTION.hasItem(3); // Returns false
MY_COLLECTION.collect({id: 1, name: 'frank'});
MY_COLLECTION.hasItem(1); // Returns true
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `itemKey`      | number \| string                                                          | undefined  | Key/Name of Item                                      | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

```ts
boolean
```



<br />

---

<br />



## `getItem()`

Returns the Item at the given `itemKey`.
```ts 
const MY_ITEM = MY_COLLECTION.getItem('myItem');
```
If it can't find the desired Item, it returns `undefined`.

:::info

The `getItem()` method is perfect for accessing an Item in our business logic.
However, it has some disadvantages when we use it to subscribe an Item to a UI-Component using, for instance, the `useAgiel()` hook.
The reason is that it returns `undefined` whenever the Item doesn't exist.
Thus, AgileTs can't keep a reference to the Item and isn't able to rerender the subscribed UI-Component, whenever the Item is created.
To solve this problem the Collection provides a function called [`getItemWithReference()`](#getitemwithreference)
which returns a reference to the not existing Item instead of `undefined`.

:::


### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `itemKey`      | number \| string                                                          | undefined  | Key/Name of Item                                      | Yes      |
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Item | undefined
```



<br />

---

<br />



## `getItemWithReference()`

Returns like [`getItem()`](#getitem) the Item at the given `itemKey`.
```ts 
const MY_ITEM = MY_COLLECTION.getItemWithReference('myItem');
```
However, it differs in one key area. It doesn't return `undefined`, if it couldn't find the desired Item.
Instead, it returns a `placeholder` Item to hold a reference to the not existing Item.
For example, such a reference is helpful to reliably subscribe a not existing Item to a UI-Component, for instance, with the `useAgile()` hook.
```ts
// Doesn't cause rerender, when Item is created
const myItem = useAgile(MY_COLLECTION.getItem('myItem'));

// Does cause rerender, when Item is created
const myItemWithReference = useAgile(MY_COLLECTION.getItemWithReferenece('myItem'));
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Required |
|----------------|---------------------------------------------------------------------------|------------|----------|
| `itemKey`      | number \| string                                                          | undefined  | Yes      |

### 📄 Return

```ts
Item
```



<br />

---

<br />



## `getAllItems()`

Returns all [Items](./Introduction.md#-item) of the Collection.
```ts {1}
MY_COLLECTION.getAllItems(); // Returns something like (see below)
/*
 [
    Item(1),
    Item(10),
    Item(23)
 ]
 */
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Array<Item>
```



<br />

---

<br />



## `getAllItemValues()`

Returns all [Item](./Introduction.md#-item) `values` of the Collection.
```ts {1} 
MY_COLLECTION.getAllItemValues(); // Returns something like (see below)
/*
 [
    {id: 1, name: "frank"},
    {id: 10, name: "hans"},
    {id: 23, name: "jeff"},
 ]
 */
```

### 📭 Props

| Prop           | Type                                                                      | Default    | Description                                           | Required |
|----------------|---------------------------------------------------------------------------|------------|-------------------------------------------------------|----------|
| `config`       | [HasConfig](../../../../Interfaces.md#hasconfig)                          | {}         | Configuration                                         | No       |

### 📄 Return

```ts
Array<DataType> // DataType is by default '{[key: string]: any}'
```



<br />

---

<br />



## `persist()`

Preserves the Collection `value` in the appropriate local Storage for the current environment.
```ts
MY_COLLECTION.perist("myStorageKey");
```
The `value` of the Collection includes:
- `default` Group
- all Items

All other Instances that refer to the Collection have to be persisted separately if desired.
```ts
MY_COOL_GROUP.persist();
```

### 🤓 Learn more

If you want to find out more about persisting Instances like Collections,
checkout the [Persisting Data](../storage/PersistingData.md) Section.

### 📭 Props

| Prop                 | Type                                                                       | Default    | Description                                                                           | Required |
|----------------------|----------------------------------------------------------------------------|------------|---------------------------------------------------------------------------------------|----------|
| `key`                | string \| number                                                           | undefined  | Key/Name of created Persistent (Note: Key is required if Collection has no set Key!)  | No       |
| `config`             | [StatePersistentConfig](../../../../Interfaces.md#statepersistentconfig)   | {}         | Configuration                                                                         | No       |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `onLoad()`

Registers a callback function that is called whenever the [persisted](#persist) Collection `value` is loaded into the Collection.
```ts
MY_COLLECTION.onLoad((success) => {
console.log(`Value '${MY_COLLECTION.value}' got loaded into the Collection! Success? ${success}`)
});
```
For example, we can use this information to display a loading indicator
until the persisted `value` got loaded.

### 📭 Props

| Prop                 | Type                                                     | Default    | Required |
|----------------------|----------------------------------------------------------|------------|----------|
| `callback`           | (success: boolean) => void                               | undefined  | Yes      |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `getGroupCount()`

Returns the number of registered Groups in a Collection.
```ts {2}
MY_COLLECTION.createGroup('group1');
MY_COLLECTION.getGroupCount(); // Returns '2'
```
If you are wondering why it returns `2` even though we have only created one Group.
This is due the fact that each Collection has registered a `default` Group.

### 📄 Return

```ts
number
```



<br />

---

<br />



## `getSelectorCount()`

Returns the number of registered Selectors in a Collection.
```ts {2}
MY_COLLECTION.select(1);
MY_COLLECTION.getSelectorCount(); // Returns '1'
```

### 📄 Return

```ts
number
```



<br />

---

<br />



## `reset()`

Resets the Collection.
A reset includes:
- removing all Items
- resetting each [Group](./group/Introduction.md)
- resetting each [Selector](./selector/Introduction.md)
```ts {5}
const MY_COLLECTION = createCollection();
MY_COLLECTION.collect({id: 1, name: 'frank'});
MY_COLLECTION.collect({id: 8, name: 'frank'});
MY_COLLECTION.data; // Returns '{1: Item(1), 8: Item(8)}'
MY_COLLECTION.reset();
MY_COLLECTION.data; // Returns '{}'
```

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `put()`

With the `put()` method, we can quickly add specific `itemKeys` to particular Group/s.
```ts
MY_COLLECTION.put('itemKey1', 'groupKey1');
```
In the above example, we put the `itemKey1` into the Group at `groupKey1`, so to speak.
We can also add multiple `itemKeys` to multiple Groups at once.
```ts
MY_COLLECTION.put(['itemKey1', 'itemKey2', 'itemKey3'], ['groupKey1', 'groupKey2']);
```
Now `itemKey1`, `itemKey2`, `itemKey3` are added to the Groups at `groupKey1` and `groupKey2`.

### 📭 Props

| Prop                 | Type                                                                  | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKeys`           | number \| string | Array<number \| string \>                          | []         | ItemKey/s to be added to the specified Group/s                                                | Yes      |
| `groupKeys`          | number \| string | Array<number \| string \>                          | []         | Group/s to which the specified ItemKey/s are added                                            | Yes      |
| `config`             | [GroupAddConfigInterface](../../../../Interfaces.md#groupaddconfig)   | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `move()`

Moves `itemKey/s` from one Group to another Group.
```ts
MY_COLLECTION.move('itemKey1', /* from */ 'groupKey1', /* to */ 'groupKey2');
```
In the above example, we move the `itemKey1` from Group at `groupKey1` to Group at `groupKey2`, so to speak.

### 📭 Props

| Prop                 | Type                                                                  | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKeys`           | number \| string | Array<number \| string \>                          | []         | ItemKey/s that are moved                                                                      | Yes      |
| `oldGroupKey`        | number \| string                                                      | undefined  | GroupKey of the Group that currently keeps the Item/s at itemKey/s                            | Yes      |
| `newGroupKey`        | number \| string                                                      | undefined  | GroupKey of the Group into which the Item/s at itemKey/s are moved                            | Yes      |
| `config`             | [GroupAddConfigInterface](../../../../Interfaces.md#groupaddconfig)   | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.


<br />

---

<br />



## `updateItemKey()`

:::warning

This method is mainly thought for the internal use.

:::

Mutates the `itemKey` of an already collected Item.
It takes care of:
- updating `itemKey` in Collection (replacing old itemKey with the new one)
- updating `itemKey` in Groups (replacing old itemKey with the new one)
- updating `itemKey` in Selector (unselecting old itemKey and selecting the new one)

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `oldItemKey`         | number \| string                                                                  | undefined  | Old ItemKey                                                                                   | Yes      |
| `newItemKey`         | number \| string                                                                  | undefined  | New ItemKey                                                                                   | Yes      |
| `config`             | [UpdateItemKeyConfigInterface](../../../../Interfaces.md#updateitemkeyconfig)     | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `getGroupKeysThatHaveItemKey()`

Returns all `groupKeys` that include the given `itemKey`.
```ts {1,3}
MY_COLLECTION.getGroupKeysThatHaveItemKey('itemKey1'); // Returns '[]'
MY_COLLECTION.createGroup('group1', ['itemKey1', 'itemKey2']);
MY_COLLECTION.getGroupKeysThatHaveItemKey('itemKey1'); // Returns '['group1']'
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|----------|
| `itemKey`            | number \| string                                                                  | undefined  | Yes      |

### 📄 Return

```ts
Array<number | string>
```



<br />

---

<br />



## `remove()`

Removes Items from:

- ### `.everywhere()`
  Removes Item/s at given `itemKey/s` from the entire Collection and all [Groups](./group/Introduction.md) / [Selectors](./selector/Introduction.md),
  i.e. from everywhere.
  ```ts
  MY_COLLECTION.remove('item1').everywhere();
  ```
  Synonym to [`removeItems()`](#removeitems).

- ### `.fromGroups()`
  Removes Item/s at given `itemKey/s` only from specific [Groups](./group/Introduction.md) at given `groupKey/s`.
  ```ts
  MY_COLLECTION.remove('item1').fromGroups(['group1', 'group2']);
  ```
  Synonym to [`removeFromGroups()`](#removefromgroups).

:::info

Note that the standalone `remove()` method doesn't do anything.
```ts
MY_COLLECTION.remove('itemKey1'); // won't work
MY_COLLECTION.remove('itemKey1').everywhere(); // Removes from the entire Collection
MY_COLLECTION.remove('itemKey1').fromGroups('groupKey1'); // Removes from Group at 'groupKey1'
```
So we must always add the ending `.everywhere()` or `.fromGroups()`.

:::

### 📭 Props

| Prop                 | Type                                                                              | Default    | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|----------|
| `itemKeys`           | number \| string | Array<number \| string\>                                       | undefined  |  Yes     |

### 📄 Return

```ts
{
    fromGroups: (groups: Array<ItemKey> | ItemKey) => Collection<DataType>;
    everywhere: () => Collection<DataType>;
}
```



<br />

---

<br />



## `removeFromGroups()`

Removes Item at  the given `itemKey` from specific [Group](./group/Introduction.md) at the given `groupKey`.
```ts
MY_COLLECTION.removeFromGroups('item1', 'group1');
```
It is also possible to remove multiple Items from multiple Groups at once.
```ts
MY_COLLECTION.removeFromGroups(['item1', 'item2'], ['group1', 'group5']);
```
In the above example, the Collection removes the Items at `item1` and `item2` from the Groups at `group1` and `group5`.

### 📭 Props

| Prop                 | Type                                                                              | Default    | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|----------|
| `itemKeys`           | number \| string | Array<number \| string\>                                       | undefined  | Yes      |
| `groupKeys`           | number \| string | Array<number \| string\>                                      | undefined  | Yes      |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `removeItems()`

Removes Item at the given`itemKey` from the entire Collection and all [Groups](./group/Introduction.md) / [Selectors](./selector/Introduction.md)
```ts
MY_COLLECTION.removeItems('item1');
```
It is also possible to remove multiple Items at once.
```ts
MY_COLLECTION.removeItems(['item1', 'item2']);
```

### ⚠️ Remove includes?

- remove Item/s from the entire Collection
- remove Item/s from all Groups
- remove Item/s from all Selectors
- remove Item value/s from Storage

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKeys`           | number \| string | Array<number \| string\>                                       | undefined  | itemKey/s of Item/s that get removed                                                          | Yes      |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.



<br />

---

<br />



## `setData()`

:::warning

**No public function!** (only public for testing purpose) <br/>
In summary, `setData()` applies newly added data (for instance from the [`collect()`](#collect) method) to the Collection.

:::



<br />

---

<br />



## `rebuildGroupsThatIncludeItemKey()`

:::warning

This method is mainly thought for the internal use.

:::

Rebuilds all [Groups](./group/Introduction.md) that include the provided `itemKey`.
```ts
MY_COLLECTION.rebuildGroupsThatIncludeItemKey('item1');
```
Such rebuild does among other things recompute the `output` of the Group.
```ts
// group value '[1, 2, 3]'
// group output '[{id: 1, name: 'jeff'}, {id: 3, name: 'hans'}]'

// Item gets added to Collection -> Collection rebuilds all Groups that include the 'itemKey'
MY_COLLECTION.collect({id: 2, name: 'jeff'});
// Exectues internally: 'MY_COLLECTION.rebuildGroupsThatIncludeItemKey(2)'

// group output '[{id: 1, name: 'jeff'}, {id: 2, name: 'jeff'}, {id: 3, name: 'hans'}]'
```

### 📭 Props

| Prop                 | Type                                                                              | Default    | Description                                                                                   | Required |
|----------------------|-----------------------------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------|----------|
| `itemKey`            | number \| string                                                                  | undefined  | itemKey                                                                                       | Yes      |
| `config`             | RebuildGroupsThatIncludeItemKeyConfigInterface                                    | {}         | Configuration                                                                                 | No       |

### 📄 Return

```ts
Collection
```
Returns the [Collection](./Introduction.md) it was called on.
