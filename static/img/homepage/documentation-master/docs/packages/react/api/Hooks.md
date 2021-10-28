---
id: hooks
title: React Hooks
sidebar_label: React Hooks
slug: /react/hooks
---

:::note

[React Hooks](https://reactjs.org/docs/hooks-intro.html) are only supported in **Functional React Components**!

:::


## `useAgile()`

The `useAgile()` React Hook binds/subscribes AgileTs States to a Functional React Component for reactivity.
This binding ensures that the Component re-renders whenever a bound State changes.
We can flexibly bind any [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance) 
(like States or Collections) to any React Component.
```ts
const myCoolState = useAgile(MY_COOL_STATE); 
```
The `useAgile()` Hook returns the current `value` of the provided State
and **not** the State Instance itself.
```ts {7}
// -- core.js --------------------------------------------------

const MY_STATE = createState('jeff');

// -- MyComponent.jsx ------------------------------------------

const myState = useAgile(MY_STATE);
console.log(myState); // Returns 'jeff'
```

### 📚 Array

We can also pass an array of States to the `useAgile()` Hook.
```ts
useAgile([MY_COOL_STATE1, MY_COOL_STATE2]);
```
Then `useAgile()` returns an array of State `values` matching the specified State Instances.
This array can be destructured in order to easily access the individual State values
```ts {8}
// -- core.js --------------------------------------------------

const MY_STATE = createState('jeff');
const MY_STATE_2 = createState('frank');

// -- MyComponent.jsx ------------------------------------------

const [myState, myState2] = useAgile([MY_STATE, MY_STATE_2]);
console.log(myState); // Returns 'jeff'
console.log(myState2); // Returns 'frank'
```
Binding multiple States to a React Component using a single `useAgile()` Hook has one advantage.
It can reduce the number of triggered re-render events by batching re-render jobs.
Thereby, simultaneously triggered re-render events of different State Instances 
are combined into one single (combined) re-render event
if these States share the same `Subscription Container`.
Each `useAgile()` Hook creates its own `Subscription Container` and registers it with AgileTs.
Simply put `Subscription Container` serve as an interface to React-Components for AgileTs.

### 👀 Subscribable Instances

Not only AgileTs States can be bound to React Components via `useAgile()`,
but also all other [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance)
that contain an [`Observer`](../../../main/Introduction.md#observer).
```ts
  const [myCollection, myGroup, myState] = useAgile([MY_COLLECTION, MY_GROUP, MY_STATE]);
```
Instances that contain an `Observer` are, for example:
- ### [`State`](../../core/api/state/Introduction.md)
  ```ts {7}
  // -- core.js --------------------------------------------------
  
  const MY_STATE = createState('jeff');
  
  // -- MyComponent.jsx ------------------------------------------

  const myState = useAgile(MY_STATE);
  console.log(myState); // Returns 'jeff'
  ```
- ### [`Computed`](../../core/api/computed/Introduction.md)
  ```ts {7}
  // -- core.js --------------------------------------------------
  
  const MY_COMPUTED = createComputed(() => 'hello there');
  
  // -- MyComponent.jsx ------------------------------------------
  
  const myComputed = useAgile(MY_COMPUTED);
  console.log(myComputed); // Returns 'hello there'
  ```  
- ### [`Collection`](../../core/api/collection/Introduction.md)
  **Note:** A Collection doesn't contain directly an `Observer`.
  But `useAgile()` is smart enough, to identify a Collection
  and binds the [`defualt` Group](../../core/api/collection/group/Introduction.md#-default-group) 
  to the React Component instead.
  The `default` Group represents the default pattern of the Collection.
  ```ts {9}
  // -- core.js --------------------------------------------------
  
  const MY_COLLECTION = createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  
  // -- MyComponent.jsx ------------------------------------------
  
  const myCollection = useAgile(MY_COLLECTION);
  console.log(myCollection); // Returns (see below)
  // '[{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]'
  ```  
- ### [`Group`](../../core/api/collection/group/Introduction.md)
  ```ts {10}
  // -- core.js --------------------------------------------------
  
  const MY_COLLECTION = createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_GROUP = MY_COLLECTION.createGroup('myGroup', [3, 1]);
  
  // -- MyComponent.jsx ------------------------------------------
  
  const myGroup = useAgile(MY_GROUP);
  console.log(myGroup); // Returns '[{id: 3, name: 'c'}, {id: 1, name: 'a'}]'
  ```
- ### [`Selector`](../../core/api/collection/selector/Introduction.md)
  ```ts {10}
  // -- core.js --------------------------------------------------
  
  const MY_COLLECTION = createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_SELECTOR = MY_COLLECTION.select(2);
  
  // -- MyComponent.jsx ------------------------------------------
  
  const mySelector = useAgile(MY_SELECTOR);
  console.log(mySelector); // Returns '{id: 2, name: 'b'}'
  ```
- ### [`Item`](../../core/api/collection/Introduction.md#-item)
  ```ts {10}
  // -- core.js --------------------------------------------------
  
  const MY_COLLECTION = createCollection({
     initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]  
  });
  const MY_ITEM = MY_COLLECTION.getItem(3);
  
  // -- MyComponent.jsx ------------------------------------------
  
  const myItem = useAgile(MY_ITEM);
  console.log(myItem); // Returns '{id: 3, name: 'c'}'
  ```

### 🔴 Example

```tsx live
const MY_STATE = createState("Hello Stranger!");

const RandomComponent = () => {
  // 👇 Bind MY_STATE to 'RandomComponent' for reactivity
  const myFirstState = useAgile(MY_STATE);

  return (
          <div>
            <p>{myFirstState}</p>
            <button
                    onClick={() => {
                      MY_STATE.set("Hello Friend!");
                    }}
            >
              Update State
            </button>
          </div>
  );
}

render(<RandomComponent/>);
```

### 🟦 Typescript

The `useAgile()` Hook is almost 100% typesafe.
```ts {8}
// -- core.js --------------------------------------------------

const NUMBER_STATE = createState(0);
const STRING_STATE = createState('hello there');

// -- MyComponent.jsx ------------------------------------------

const [numberState, stringState] = useAgile([NUMBER_STATE, STRING_STATE]);
console.log(typeof numberState); // Returns 'number'
console.log(typeof stringState); // Returns 'string'
```

### 📭 Props

| Prop              | Type                                                                         | Description                                                                                                  | Required    | 
| ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------|
| `deps`            | Array<SubscribableAgileInstancesType\> \| SubscribableAgileInstancesType     | Agile Sub Instances to be bound to the Functional Component.                                                 | Yes         | 
| `config`          | [AgileHookConfigInterface](../../../Interfaces.md#agilehookconfiginterface)  | Configuration                                                                                                | No          |

#### SubscribableAgileInstancesType
```ts
type SubscribableAgileInstancesType = State | Collection | Observer | undefined;
```

### 📄 Return

The `useAgile()` Hook returns the current `output`
or if the Instance has no `output` the current `value`
of the specified [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance).
```ts {7}
// -- core.js -------------------------------------------------

const MY_STATE = createState('jeff');

// -- MyComponent.jsx ------------------------------------------

const myState = useAgile(MY_STATE);
console.log(myState); // Returns 'jeff'
```
When passing multiple Agile Sub Instances, 
an array of `outputs`/`values` matching the passed Instances is returned.
```ts {8}
// -- core.js --------------------------------------------------

const MY_STATE = createState('jeff');
const MY_STATE_2 = createState('frank');

// -- MyComponent.jsx ------------------------------------------

const [myState, myState2] = useAgile([MY_STATE, MY_STATE_2]);
console.log(myState); // Returns 'jeff'
console.log(myState2); // Returns 'frank'
```



<br />

---

<br />



## `useProxy()`

:::warning

Requires an additional package called `@agile-ts/proxytree`!

:::

The `useProxy()` is in its basic functionality equivalent to the [`useAgile()`](#useagile) Hook.
It binds/subscribes AgileTs States to a Functional React Component for reactivity.
However, it has one advantage in terms of performance. 
Because it only re-renders the React Component when an actual accessed property changes.
This is accomplished by warping a [Proxy()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
around the returned State value object/s.
Through this Proxy, AgileTs is able to exactly track accessed properties in the React Component
and can construct paths to these. Based on these paths, it can select the particular accessed properties.

With the `useAgile()` Hook, the Component would always be re-rendered on a subscribed State value change,
regardless of whether the changed property value was accessed in the Component or not.

### 👀 Subscribable Instances

Not only AgileTs States can be bound to React Components via `useProxy()`,
but also all other [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance)
that contain an [`Observer`](../../../main/Introduction.md#observer).
```ts
  const [myCollection, myGroup, myState] = useProxy([MY_COLLECTION, MY_GROUP, MY_STATE]);
```
However, a [Javascript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
can only be wrapped around values of the type `object`. 
Instances that are not of the type object are treated as in [`useAgile()`](#useagile).

### 🔴 Example

```tsx live
const MY_STATE = createState({name: 'jeff', location: 'Germany', age: 19}, {key: 'myState'});

let rerenderCount = 0;

const RandomComponent = () => {
  // 👇 Bind MY_STATE to 'RandomComponent' for reactivity
  const myState = useProxy(MY_STATE);

  rerenderCount++;

  return (
          <div>
            <p>Name: {myState.name}</p>
            <p>Rerender Count: {rerenderCount}</p>
            <p>State Value (not subscribed): <br/> {JSON.stringify(MY_STATE.value)}</p>
            <button
                    onClick={() => {
                      MY_STATE.patch({name: generateId()})
                    }}
            >
              Update Name (accessed)
            </button>
            <button
                    onClick={() => {
                      MY_STATE.patch({location: generateId()})
                    }}
            >
              Update Location
            </button>
          </div>
  );
}

render(<RandomComponent/>);
```

### 🟦 Typescript

The `useProxy()` Hook is almost 100% typesafe.

### 📭 Props

| Prop              | Type                                                                         | Description                                                                                                  | Required    | 
| ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------|
| `deps`            | Array<SubscribableAgileInstancesType\> \| SubscribableAgileInstancesType     | Agile Sub Instances to be bound to the Functional Component.                                                 | Yes         | 
| `config`          | [AgileHookConfigInterface](../../../Interfaces.md#agilehookconfiginterface)  | Configuration                                                                                                | No          |

#### SubscribableAgileInstancesType
```ts
type SubscribableAgileInstancesType = State | Collection | Observer | undefined;
```

### 📄 Return

The `useProxy()` Hook returns the current `output`
or if the Instance has no `output` the current `value`
of the specified [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance).
```ts {7}
// -- core.js -------------------------------------------------

const MY_STATE = createState('jeff');

// -- MyComponent.jsx ------------------------------------------

const myState = useProxy(MY_STATE);
console.log(myState); // Returns 'jeff'
```
When passing multiple Agile Sub Instances,
an array of `outputs`/`values` matching the passed Instances is returned.
```ts {8}
// -- core.js --------------------------------------------------

const MY_STATE = createState({id: 1: name: 'jeff'});
const MY_STATE_2 = createState('frank');

// -- MyComponent.jsx ------------------------------------------

const [myState, myState2] = useProxy([MY_STATE, MY_STATE_2]);
console.log(myState); // Returns '{id: 1: name: 'jeff'}'
console.log(myState2); // Returns 'frank'
```



<br />

---

<br />



## `useSelector()`

The `useSelector()` React Hook binds/subscribes a **part** 
of an AgileTs State to a Functional React Component for reactivity.
This binding ensures that the Component re-renders whenever the bound State **part/property** changes.
The to bind part is selected via a selector function specified as second parameter.
```ts
const myName = useAgile(MY_USER, (v) => v.name); 
```

### 👀 Subscribable Instances

Not only parts of AgileTs States can be bound to React Components via `useSelector()`,
but also parts of all other [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance)
that contain an [`Observer`](../../../main/Introduction.md#observer).
```ts
const myItem1 = useSelector(MY_COLLECTION, (v) => v['item1']);
```

### 🔴 Example

```tsx live
const MY_STATE = createState({name: 'jeff', location: 'Germany', age: 19}, {key: 'myState'});

let rerenderCount = 0;

const RandomComponent = () => {
  // 👇 Bind name property of MY_STATE to 'RandomComponent' for reactivity
  const name = useSelector(MY_STATE, (v) => v.name);

  rerenderCount++;

  return (
          <div>
            <p>Name: {name}</p>
            <p>Rerender Count: {rerenderCount}</p>
            <p>State Value (not subscribed): <br/> {JSON.stringify(MY_STATE.value)}</p>
            <button
                    onClick={() => {
                      MY_STATE.patch({name: generateId()})
                    }}
            >
              Update Name (selected)
            </button>
            <button
                    onClick={() => {
                      MY_STATE.patch({location: generateId()})
                    }}
            >
              Update Location
            </button>
          </div>
  );
}

render(<RandomComponent/>);
```

### 🟦 Typescript

The `useSelector()` Hook isn't completely typesafe yet.
```ts
const selectedValue = useSelector(MY_STATE, (v) => v.name);
```
We are still figuring out how to automatically detect and return the selected property type.
As an override, you can also specify the individual types as generics.
```ts
useSelector<typeof MY_STATE.value, string>(MY_STATE, (v) => v.name);
```
Or explicitly assign the desired type to the return value with the `as` keyword.
```ts
useSelector(MY_STATE, (v) => v.name) as string;
```


### 📭 Props

| Prop              | Type                                                                         | Description                                                                                                                    | Required    | 
| ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------|
| `dep`             | SubscribableAgileInstancesType                                               | Agile Sub Instance to be passed into the specified selector method.                                                            | Yes         | 
| `selector`        | SelectorMethodType                                                           | Selector method to select the part/property of the specified Agile Sub Instance value to be bound to the Functional Component. | Yes         | 
| `config`          | [AgileHookConfigInterface](../../../Interfaces.md#agilehookconfiginterface)  | Configuration                                                                                                                  | No          |

#### SubscribableAgileInstancesType
```ts
type SubscribableAgileInstancesType = State | Collection | Observer | undefined;
```

#### SelectorMethodType
```ts
type SelectorMethodType<T = any> = (value: T) => any;
```

### 📄 Return

The `useSelector()` Hook returns the selected property (based on the selector method)
of the specified [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance).
```ts {7}
// -- core.js -------------------------------------------------

const MY_STATE = createState({id: 10, name: 'jeff', age: 10});

// -- MyComponent.jsx ------------------------------------------

const myName = useSelector(MY_STATE, (v) => v.name);
console.log(myName); // Returns 'jeff'
```



<br />

---

<br />



## `useValue()`

The `useValue()` is in its basic functionality equivalent to the [`useAgile()`](#useagile) Hook.
It binds/subscribes AgileTs States to a Functional React Component for reactivity.
However, it differs in on key area, 
because it explicitly binds the `value` of a State or other [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance)
to the Component instead of preferring the `ouptut`. Normally (like in the `useAgile()` Hook), 
the `output` of an Agile Sub Instance has a higher weight than the `value`.

For example if we bind a Collection with the `useAgile()` Hook to a React Component,
the `output` of the Collection is bound to the Component.
When we use the `useValue()` Hook instead, the `value` of the Collection is bound to the Component.
```ts {9,12}
// -- core.js -------------------------------------------------

 const MY_COLLECTION = createCollection({
  initialData: [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]
});

// -- MyComponent.jsx ------------------------------------------

const collectionValue = useValue(MY_COLLECTION);
console.log(collectionValue); // Returns '[1, 2, 3]'

const collectionOutput = useAgile(MY_COLLECTION);
console.log(collectionOutput); // Returns (see below)
// '[{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]'
```

### 👀 Subscribable Instances

Not only AgileTs States can be bound to React Components via `useValue()`,
but also all other [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance)
that contain an [`Observer`](../../../main/Introduction.md#observer).
```ts
  const [myCollection, myGroup, myState] = useValue([MY_COLLECTION, MY_GROUP, MY_STATE]);
```

### 🔴 Example

```tsx live
const MY_COLLECTION = createCollection({initialData: [
    {id: 1, name: 'jeff'}, {id: 2, name: 'hans'}
]});

const RandomComponent = () => {
  // 👇 Bind the value of MY_COLLECTION to 'RandomComponent' for reactivity
  const myCollectionValue = useValue(MY_COLLECTION);

  // Bind the output of MY_COLLECTION to 'RandomComponent' for reactivity
  const myCollectionOutput = useAgile(MY_COLLECTION);

  return (
          <div>
            <p>Collection value: {JSON.stringify(myCollectionValue)}</p>
            <p>Collection output: {JSON.stringify(myCollectionOutput)}</p>
            <button
                    onClick={() => {
                      MY_COLLECTION.collect({id: generateId(), name: generateId(10)})
                    }}
            >
              Collect random name
            </button>
          </div>
  );
}

render(<RandomComponent/>);
```

### 🟦 Typescript

The `useValue()` Hook is almost 100% typesafe.

### 📭 Props

| Prop              | Type                                                                         | Description                                                                                                  | Required    | 
| ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------|
| `deps`            | Array<SubscribableAgileInstancesType\> \| SubscribableAgileInstancesType     | Agile Sub Instances to be bound to the Functional Component.                                                 | Yes         | 
| `config`          | [AgileHookConfigInterface](../../../Interfaces.md#agilehookconfiginterface)  | Configuration                                                                                                | No          |

#### SubscribableAgileInstancesType
```ts
type SubscribableAgileInstancesType = State | Collection | Observer | undefined;
```

### 📄 Return

The `useValue()` Hook returns the current `value`
of the specified [Agile Sub Instance](../../../main/Introduction.md#agile-sub-instance).
```ts {9}
// -- core.js -------------------------------------------------

const MY_COLLECTION = createCollection({initialData: [
  {id: 1, name: 'jeff'}, {id: 2, name: 'hans'}
]});

// -- MyComponent.jsx ------------------------------------------

const myValue = useValue(MY_COLLECTION);
console.log(myValue); // Returns '[1, 2]'
```
When passing multiple Agile Sub Instances,
an array of `values` matching the passed Instances is returned.
```ts {10}
// -- core.js --------------------------------------------------

const MY_COLLECTION = createCollection({initialData: [
  {id: 1, name: 'jeff'}, {id: 2, name: 'hans'}
]});
const MY_STATE_2 = createState('frank');

// -- MyComponent.jsx ------------------------------------------

const [myValue, myState2] = useValue([MY_COLLECTION, MY_STATE_2]);
console.log(myValue); // Returns '[1, 2]'
console.log(myState2); // Returns 'frank'
```



<br />

---

<br />



## `useWatcher()`

The `useWatcher()` React Hook lets us easily observe a State for changes.
Thereby is the provided `callback` function fired on every State `value` mutation.
Such mutation occurs when we, for example, update the State `value` from 'jeff' to 'hans'.
```ts
useWatcher(MY_STATE, (value) => {
  console.log(value); // Returns current State Value
});
```
The `useWatcher()` Hook is a synonym to the [`watch()`](../../core/api/state/Methods.md#watch) method.
However, it has some advantages within React Components:
- It automatically cleans up the created watcher callback 
  when the React Component unmounts
- Is nicer to read in 'UI-Component-Code'

### 🔴 Example

```tsx live
const MY_STATE = createState("hello");

const RandomComponent = () => {
  useWatcher(MY_STATE, (value) => {
    toast("New Value: " + value);
  });

  return (
          <div>
            <button
                    onClick={() => {
                      MY_STATE.set("bye");
                    }}
            >
              Change State
            </button>
          </div>
  );
}

render(<RandomComponent/>);
```

### 🟦 Typescript

The `useWatcher()` Hook is almost 100% typesafe.

### 📭 Props

| Prop              | Type                                            | Description                                                                  | Required    | 
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------|
| `state`           | State<T\>                                       | State to which the specified watcher callback belongs.                       | Yes         | 
| `callback`        | StateWatcherCallback<T\>                        | A function to be executed on each State value change.                        | Yes         |

### 📄 Return

```ts
void
```
