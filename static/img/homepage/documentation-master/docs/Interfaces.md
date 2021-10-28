---
id: interfaces
title: Interfaces
sidebar_label: INTERFACES
slug: /interfaces
---

:::info

**This Section might be useless to you without any context.**
As the name suggests, it's all about typescript interfaces of AgileTs.
These interfaces are outsourced for a better overview, maintainability, and reusability.
You might get redirected to parts of the Interface Section from other documentation to learn more about specific Interfaces.

:::

## `StateIngestConfig`

The `StateIngestConfigInterface` is used as configuration object in functions like [`set()`](packages/core/api/state/Methods.md#set) or [`undo()`](packages/core/api/state/Methods.md#undo).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface StateIngestConfigInterface
        extends StateRuntimeJobConfigInterface,
                IngestConfigInterface {
   key?: RuntimeJobKey;
}
```
**Note:** The `StateIngestConfigInterface` extends some other Interfaces:
- [StateRuntimeJobConfigInterface](#stateruntimejobconfig)
- [IngestConfigInterface](#ingestconfiginterface)

<br/>

#### `key`

The `key/name` of the Job that is created and ingested into the `runtime`.
```ts
MY_STATE.set('hello there', {key: 'jeff'});
```
Such key can be very useful during debug sessions
in order to analyse when which Job ran through the `runtime`.
```ts
// Agile Debug: Created Job 'jeff', Job('jeff')
// Agile Debug: Completed Job 'jeff', Job('jeff')
// Agile Debug: Updated/Rerendered Subscriptions, [SubscriptionContainer, ..]
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| number`       | undefined | No       |



<br/>

---

<br/>



## `StateRuntimeJobConfig`

The `StateRuntimeJobConfigInterface` is used as configuration object in functions like [`replace()`](packages/core/api/collection/group/Methods.md#replace) or [`select()`](packages/core/api/collection/selector/Methods.md#select).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface StateRuntimeJobConfigInterface
  extends RuntimeJobConfigInterface {
  overwrite?: boolean;
  storage?: boolean;
}
```
**Note:** The `StateRuntimeJobConfigInterface` extends some other Interfaces:
- [RuntimeJobConfigInterface](#runtimejobconfiginterface)

<br/>

#### `overwrite`

If `true`, the whole State is overwritten with the newly assigned `value`.
```ts {1}
MY_STATE.set("finalValue", {overwrite: true});
MY_STATE.value; // Returns 'finalValue'
MY_STATE.previousStateValue; // Returns 'finalValue'
MY_STATE.initialStateValue; // Returns 'finalValue'
```
During the overwrite process, the following properties are overwritten:
- `value`
- `previousStateValue`
- `initalStateValue`
- `isPlaceholder`

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `storage`

Whether to apply the State value changes to the corresponding external [Storage/s](packages/core/api/storage/Introduction.md).
```ts {1}
const MY_STATE = createState('jeff').persist('storageKey');
// Storage at 'storageKey': 'jeff'
MY_STATE.set("hans", {storage: true});
// Storage at 'storageKey': 'hans'
MY_STATE.set("dieter", {storage: false});
// Storage at 'storageKey': 'hans'
```
Be aware that this is only relevant, if the State is [persisted](packages/core/api/state/Methods.md#persist).
We can use the `isPersisted` property to check whether a state is persisted.
```ts
MY_STATE.isPersisted;
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `RuntimeJobConfigInterface`

The `RuntimeJobConfigInterface` is used in the creation and configuration of a `Runtime Job`.
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface RuntimeJobConfigInterface {
  background?: boolean;
  sideEffects?: SideEffectConfigInterface;
  force?: boolean;
  numberOfTriesToUpdate?: number | null;
}
```

<br/>

#### `background`

When `true`, the Job is executed in the `background`
and won't cause any rerender on Components that have subscribed the [Agile Sub Instance](./main/Introduction.md#agile-sub-instance)
represented by the Job.
```ts {5}
// Causes rerender on Components
MY_STATE.set("myNewValue2");
  
// Doesn't cause rerender on Components
MY_STATE.set("myNewValue3", {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `sideEffects`

Specifies whether the side effects of the Job should be executed.
```ts {5}
// Executes sideEffects
MY_STATE.set("myNewValue2");
  
// Doesn't execute sideEffects
MY_STATE.set("myNewValue3", {sideEffects: false});
```
During a side effect, several essential tasks are done.
These include, for example, _rebuilding the Group output_ of a Group
or _updating the persisted State value in the corresponding external Storage_.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `force`

When set to `true`, the Job is forced through the `runtime` no matter what happens.
```ts {7}
const MY_STATE = createState('myValue');

// Won't be executed by the runtime because the State value hasn't changed
MY_STATE.set('myValue');
  
// Will be executed by the runtime, although the State value hasn't changed
MY_STATE.set('myValue', { force: true });
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

#### `numberOfTriesToUpdate`

How often the runtime should try to update not ready SubscriptionContainers of the Job.
If the update tries count exceeds the `numberOfTriesToUpdate` count,
the Job will be entirely removed from the runtime.
This has the advantage that an overflow of the runtime is avoided.
If `numberOfTriesToUpdate` is `null` the runtime tries to update the not ready Job subscriptionContainers
until they are ready.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `number \| null`         | 3         | No       |



<br/>

---

<br/>



## `IngestConfigInterface`

The `IngestConfigInterface` is used as a configuration object to configure the ingest process of `Jobs` into the `runtime`.
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface IngestConfigInterface {
  perform?: boolean;
}
```

<br/>

#### `perform`

Whether the ingested Job should be executed immediately by the `runtime`
or should first be inserted into a `queue` and performed when it is its turn.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `PatchConfig`

The `PatchConfigInterface` is used as configuration object in functions like [`patch()`](packages/core/api/state/Methods.md#persist).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface PatchConfigInterface extends StateIngestConfigInterface {
  addNewProperties?: boolean;
}
```
**Note:** The `PatchConfigInterface` extends some other Interfaces:
- [StateIngestConfigInterface](#stateingestconfig)

<br/>

#### `addNewProperties`

If `true`, new properties are added to the State value, although they might not yet be present there.
```ts {2,4}
const MY_STATE = createState({id: 1, name: "frank"});
MY_STATE.patch({location: "Germany"}, {addNewProperties: false}); 
MY_STATE.value; // Returns {id: 1, name: "frank"}
MY_STATE.patch({location: "Germany"}, {addNewProperties: true});
MY_STATE.value; // Returns {id: 1, name: "frank", location: "Germany"}
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `StatePersistentConfig`

The `StatePersistentConfigInterface` is used as configuration object in functions like [`persist()`](packages/core/api/state/Methods.md#persist).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface StatePersistentConfigInterface {
   loadValue?: boolean;
   storageKeys?: StorageKey[];
}
```

<br/>

#### `loadValue`

When `true`, the created `Persistent` automatically loads the value stored in the corresponding external Storage into the State.
Or, if the State isn't persisted yet, it stores the State value in the corresponding external Storage.
Be aware that if we don't allow the `Persistent` to load/store the value, we have to do it ourselves.
```ts {2}
myState.persist({
   instantiate: false,
});

if (myState.persistent?.ready) {
   await myState.persistent?.initialLoading();
    myState.isPersisted = true;
}
```
Loading the value manually has one advantage.
It allows us to await the asynchronous load/store process.
If you only need to await the loading process we recommend using the [`onLoad()`](packages/core/api/state/Methods.md#onload) method.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `storageKeys`

Specifies the [Storage/s](packages/core/api/storage/Introduction.md) the State value should be persisted in.
```ts
MY_STATE.persist(); // Stores value in default Storage
MY_STATE.persist({storageKeys: ['myCustomStorrage']}); // Stores value in 'myCustomStorrage'
```
If no specific Storage defined, the State value will be stored/persisted in the [default Storage](packages/core/api/storage/PersistingData.md#-default-storage).

| Type                       | Default            | Required |
|----------------------------|--------------------|----------|
| `Array<string \| number>`  | 'defaultStorage'   | No       |



<br/>

---

<br/>



## `GroupConfig`

The `GroupConfigInterface` is used in the creation and configuration of the [`Group Class`](packages/core/api/collection/group/Introduction.md).
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

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| name`         | undefined | No       |

<br/>

#### `isPlaceholder`

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

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `SelectorConfig`

The `SelectorConfigInterface` is used in the creation and configuration of the [`Selector Class`](packages/core/api/collection/selector/Introduction.md).
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

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| name`         | undefined | No       |

<br/>

#### `isPlaceholder`

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

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `CollectConfig`

The `CollectConfigInterface` is used as configuration object in functions like [`collect()`](packages/core/api/collection/Methods.md#collect).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface CollectConfigInterface<DataType = any> {
  patch?: boolean;
  method?: 'push' | 'unshift';
  forEachItem?: (data: DataType, key: ItemKey, index: number) => void;
  background?: boolean;
  select?: boolean;
}
```

<br/>

#### `patch`

:::info

The `patch` property is only relevant to us
if we collect a data object with an already existing `primaryKey` in order to update the Item data at that `primaryKey`.

:::

If `true`, the passed data object is merged into the found Item data instead of overwriting it entirely.
```ts {6,9}
const MY_COLLECTION = createCollection({
    initialData: [{id: 1, name: 'frank', age: 10}]
});

MY_COLLECTION.collect({id: 1, name: 'hans'}, [], {patch: true});
MY_COLLECTION.getItemValue(1); // Returns '{id: 1, name: 'hans', age: 10}'

MY_COLLECTION.collect({id: 1, name: 'jeff'}, [], {patch: false});
MY_COLLECTION.getItemValue(1); // Returns '{id: 1, name: 'frank'}'
```
An alternative to this way of updating already existing Item data is the [`update()`](packages/core/api/collection/Methods.md#update) method.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `method`

Specifies the way of adding the collected data `primaryKey/s` to the defined Group/s.

##### `push`
The `primaryKey` is added to the **end** of the Group value array.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"}, [], {method: 'push'});
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).value; // Returns [5, 6, 0, 1]
```

##### `unshift`
The `primaryKey` is added to the **beginning** of the Group value array.
```ts {2}
MY_COLLECTION.collect({id: 8, name: "jeff"}, [], {method: 'unshift'});
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).value; // Returns [8, 5, 6, 0, 1]
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `push' \| 'unshift'`     | 'push'    | No       |

<br/>

#### `forEachItem`

Callback that is called for each collected data object.
```ts {4-9}
MY_COLLECTION.collect([
    {id: 1, name: "jeff"}, 
    {id: 8, name: "frank"}], 
    [],
    {forEachItem: (data, key, index) => {
         // Is called with 'data: {id: 1, name: "jeff"}, key: 1, index: 0'
         // and   
         // Is called with 'data: {id: 2, name: "frank"}, key: 8, index: 1'
      }
    });
```

| Type                                                        | Default   | Required |
|-------------------------------------------------------------|-----------|----------|
| `(data: DataType, key: ItemKey, index: number) => void`     | undefined | No       |

<br/>

#### `background`

When `true`, the data object/s are collected in `background`
and won't cause any rerender on Components that have subscribed the Collection.
```ts {5}
  // Causes rerender on Components
  MY_COLLECTION.collect({id: 1, name: "jeff"});
  
  // Doesn't cause rerender on Components
  MY_COLLECTION.collect({id: 1, name: "jeff"}, {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `select`

If `true`, a [Selector](packages/core/api/collection/selector/Introduction.md) is created for each collected data object.
```ts {1}
MY_COLLECTION.collect({id: 1, name: "jeff"}, {select: true});
MY_COLLECTION.getSelector(1); // Returns Selector at '1'
```
These created Selectors can be identified with the same key used as `primaryKey` in the collected data object.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `UpdateConfig`

The `UpdateConfigInterface` is used as configuration object in functions like [`update()`](packages/core/api/collection/Methods.md#update).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface UpdateConfigInterface {
    patch?: boolean | { addNewProperties?: boolean };
    background?: boolean;
}
```

<br/>

#### `patch`

If `false`, the passed data object overwrites the entire found Item data instead of merging it into the Item data.
```ts {2, 4}
MY_COLLECTION.collect({id: 1, name: "jeff"});
MY_COLLECTION.update(1, {name: "hans"}, {patch: true}); 
MY_COLLECTION.getItemValue(1); // Returns '{id: 1, name: "hans"}'
MY_COLLECTION.update(1, {name: "frank"}, {patch: false}); 
MY_COLLECTION.getItemValue(1); // Returns '{name: "frank"}'
```
Keep in mind that if we decide to overwrite the entire Item data object,
we have to redefine the `primaryKey` in the given data object.
Otherwise, the `primary Key` gets missing, which can lead to problems.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |

<br/>

#### `background`

When `true`, the Item data object is updated in `background`
and won't cause any rerender on Components that have subscribed the Item or Collection.
```ts {5}
// Causes rerender on Components
MY_COLLECTION.update(1, {name: "jeff"});

// Doesn't cause rerender on Components
MY_COLLECTION.update(1, {name: "frank"}, {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `HasConfig`

The `HasConfigInterface` is used as configuration object in functions like [`hasGroup()`](packages/core/api/collection/Methods.md#hasgroup) or [`hasSelector()`](packages/core/api/collection/Methods.md#hasselector).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface HasConfigInterface {
  notExisting?: boolean;
}
```

<br/>

#### `notExisting`

When `true`, also not officially existing Instances (like `placeholder`) can be found.
```ts {2,5}
// Returns placeholder Group
MY_COLLECTION.hasGroup('myPlaceholderGroup', {notExisting: true});

// Returns undefined
MY_COLLECTION.hasGroup('myPlaceholderGroup');
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `AddSideEffectConfig`

The `AddSideEffectConfigInterface` is used as configuration object in functions like [`addSideEffect()`](packages/core/api/state/Methods.md#addsideeffect).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface AddSideEffectConfigInterface {
    weight?: number;
}
```

<br/>

#### `weight`

Defines the `weight` of the `sideEffect`
and thus when it is executed.
```ts {3}
MY_STATE.addSideEffect('mySideEffect', (state, config) => {
    // sideEffect callback
}, {weigth: 10});
```
The higher the `weight`, the earlier the `sideEffect` is performed.


| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `number`                 | 10        | No       |



<br/>

---

<br/>



## `GroupAddConfig`

The `GroupAddConfigInterface` is used as configuration object in functions like [`put()`](packages/core/api/collection/Methods.md#put) or [`add()`](packages/core/api/collection/group/Methods.md#add).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface GroupAddConfig extends StateIngestConfigInterface {
    method?: 'unshift' | 'push';
    overwrite?: boolean;
}
```
**Note:** The `GroupAddConfig` extends some other Interfaces:
- [StateIngestConfigInterface](#stateingestconfig)


<br/>

#### `method`

Specifies the way of adding the collected data `primaryKey/s` to the defined Group/s.

##### `push`
The `primaryKey` is added to the **end** of the Group value array.
```ts {2}
MY_COLLECTION.collect({id: 1, name: "jeff"}, [], {method: 'push'});
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).value; // Returns [5, 6, 0, 1]
```

##### `unshift`
The `primaryKey` is added to the **beginning** of the Group value array.
```ts {2}
MY_COLLECTION.collect({id: 8, name: "jeff"}, [], {method: 'unshift'});
MY_COLLECTION.getGroup(MY_COLLECTION.config.defaultGroupKey).value; // Returns [8, 5, 6, 0, 1]
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `push' \| 'unshift'`     | 'push'    | No       |

<br/>

#### `overwrite`

If `true`, the position of the already existing `itemKey`
gets overwritten with the new position of the newly added same `itemKey`.
```ts
const MY_GROUP = MY_COLLECTION.createGroup('group1', [1, 2, 5, 6]);
MY_GROUP.add(2, {overwrite: true}); // Group value is '[1, 5, 6, 2]'
MY_GROUP.add(5); // Group value is '[1, 5, 6, 2]'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `UpdateItemKeyConfig`

The `UpdateItemKeyConfigInterface` is used as configuration object in functions like [`updateItemKey()`](packages/core/api/collection/Methods.md#updateitemkey).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface UpdateItemKeyConfigInterface {
    background?: boolean;
}
```

<br/>

#### `background`

When `true`, the `itemKey` is updated in `background`
and won't cause any rerender on Components that have subscribed the Item or Collection.
```ts {5}
// Causes rerender on Components
MY_COLLECTION.updateItemKey([1, 3]);

// Doesn't cause rerender on Components
MY_COLLECTION.updateItemKey([1, 3], {background: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |



<br/>

---

<br/>



## `ComputeConfig`

The `ComputeConfigInterface` is used as configuration object in functions like [`compute()`](packages/core/api/computed/Methods.md#compute).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface ComputeConfigInterface {
    autodetect?: boolean;
}
```

<br/>

#### `autodetect`

Tells the `Computed Class` to automatically detect the dependencies ([Agile Sub Instances](./main/Introduction.md#agile-sub-instance) used in the `computeFunction()`.
```ts {2,4}
MY_COMPUTED.computeFunction = () => MY_NAME.value + MY_AGE.value;
MY_COMPUTED.recompute({autodetect: false});
MY_COMPUTED.deps; // Returns '[]'
MY_COMPUTED.recompute({autodetect: true});
MY_COMPUTED.deps; // Returns '[Obserrver(MY_NAME), Observer(MY_AGE)]'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `RecomputeConfig`

The `RecomputeConfigInterface` is used as configuration object in functions like [`recompute()`](packages/core/api/computed/Methods.md#recompute).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface RecomputeConfigInterface
    extends StateIngestConfigInterface,
        ComputeConfigInterface {}
```
**Note:** The `RecomputeConfig` extends some other Interfaces:
- [StateIngestConfigInterface](#stateingestconfig)
- [ComputeConfigInterface](#computeconfig)



<br/>

---

<br/>



## `UpdateComputeFunctionConfig`

The `UpdateComputeFunctionConfigInterface` is used as configuration object in functions like [`updateComputeFunction()`](packages/core/api/computed/Methods.md#updatecomputefunction).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface UpdateComputeFunctionConfigInterface
    extends RecomputeConfigInterface {
    overwriteDeps?: boolean;
}
```
**Note:** The `RecomputeConfig` extends some other Interfaces:
- [RecomputeConfigInterface](#recomputeconfig)

<br/>

#### `overwriteDeps`

Whether the newly defined hard-coded dependencies are merged into the existing ones or overwrite them entirely.
```ts {2,4}
MY_COMPUTED.deps; // // Returns '[Obserrver(MY_NAME), Observer(MY_AGE)]'
MY_COMPUTED.updateComputeFunction(() => {}, [MY_LOCATION], {overwriteDeps: false});
MY_COMPUTED.deps; // // Returns '[Obserrver(MY_NAME), Observer(MY_AGE), Observer(MY_LOCATION)]'
MY_COMPUTED.updateComputeFunction(() => {}, [MY_LOCATION], {overwriteDeps: true});
MY_COMPUTED.deps; // // Returns '[Observer(MY_LOCATION)]'
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | true      | No       |



<br/>

---

<br/>



## `AgileHookConfigInterface`

The `AgileHookConfigInterface` is used as configuration object in functions like [`useAgile()`](packages/react/api/Hooks.md#useagile).
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
interface AgileHookConfigInterface {
  key?: SubscriptionContainerKeyType;
  agileInstance?: Agile;
  proxyBased?: boolean;
  selector?: SelectorMethodType;
  componentId?: ComponentIdType;
  observerType?: string;
  deps?: any[];
}
```

<br/>

#### `key`

The `key/name` of the [SubscriptionContainer](packages/core/api/integration/Introduction.md#-subscriptions) that is created and added to the Observers.
```ts
useAgile(MY_STATE, {key: 'jeff'});
```
Such key can be very useful during debug sessions
in order to analyse when which SubscriptionContainer triggered a rerender on a Component.
```ts
// Agile Debug: Registered Callback/Component based Subscription 'jeff', SubscriptionContainer('jeff')
// Agile Debug: Updated/Rerendered Subscriptions, [SubscriptionContainer('jeff'), ..]
// Agile Debug: Unregistered Callback/Component based Subscription 'jeff', SubscriptionContainer('jeff')
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string \| number`       | undefined | No       |

<br/>

#### `agileInstance`

The [Agile Instance](packages/core/api/agile-instance/Introduction.md) to which the created [SubscriptionContainer](packages/core/api/integration/Introduction.md#-subscriptions) belongs to.
However, since each Observer has an instance to the Agile Instance, `useAgile()` can automatically derive the Agile Instance from that.

| Type                                                                            | Default   | Required |
|---------------------------------------------------------------------------------|-----------|----------|
| [Agile Instance](packages/core/api/agile-instance/Introduction.md)       | undefined | No       |

<br/>

#### `proxyBased`

:::warning

Requires an additional package called `@agile-ts/proxytree`!

:::

Whether to wrap a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
around the bound Agile Instance value object,
to automatically constrain the way the selected Agile Instance
is compared to determine whether the Component needs to be re-rendered
based on the object's used properties.
```ts
useProxy(MY_STATE);
// equal to
useAgile(MY_STATE, {proxyBased: true});
```

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `boolean`                | false     | No       |

<br/>

#### `selector`

:::warning

Note that setting this property can destroy the useAgile type.
-> should only be used internal!

```ts
useSelector(MY_STATE, (v.name) => v.name);
// equal to
useAgile(MY_STATE, {selector: (v.name) => v.name});
```

:::

Equality comparison function
that allows you to customize the way the selected Agile Instance
is compared to determine whether the Component needs to be re-rendered.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `SelectorMethodType`     | undefined | No       |

<br/>

#### `componentId`

Key/Name identifier of the UI-Component the Subscription Container is bound to.
```ts
useAgile(MY_STATE, {componentId: 'User.tsx'});
```
In future re-render events 
with the same `componentId` are batched,
in addition to batching re-render events based on the `SubscriptionContainer`.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string\|number`         | undefined | No       |

<br/>

#### `observerType`

:::warning

Note that setting this property can destroy the useAgile type.
-> should only be used internal!

```ts
useOutput(MY_STATE);
// equal to
useAgile(MY_STATE, {observerType: 'output'});

useValue(MY_STATE);
// equal to
useAgile(MY_STATE, {observerType: 'value'});
```

:::

What type of Observer to be bound to the UI-Component.

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `string`                 | false     | No       |

<br/>

#### `deps`

Dependencies that determine, in addition to unmounting and remounting the React-Component,
when the specified Agile Sub Instances should be re-subscribed to the React-Component.

Related to [github issue](https://github.com/agile-ts/agile/issues/170).

| Type                     | Default   | Required |
|--------------------------|-----------|----------|
| `any[]`                  | []        | No       |
