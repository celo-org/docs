---
id: properties
title: Properties
sidebar_label: Properties
slug: /core/state/properties
---

:::info

Here are valuable properties of the `State Class` listed.

:::

## `agileInstance`

The [`agileInstance`](../agile-instance/Introduction.md) to which the State belongs.
```ts
MY_STATE.agileInstance(); // Returns a Agile Instance
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

The current `key/name` of the State,
which is used for a unique identification.
```ts {2}
const MY_STATE = createState(123, {key: 'jeffKey'});
MY_STATE.key; // Returns 'jeffKey'
```
Besides accessing the `key`, we can also assign a new `key` using this property.
```ts {1}
MY_STATE.key = "myCoolState";
MY_STATE.key; // Returns 'myCoolState'
```

### 📄 Return

```ts
string | number
```


<br />

---

<br />



## `valueType`

Represents the `type` of the State `value` defined in the [`type()`](./Methods.md#type) method.
```ts {2}
MY_STATE.type(String);
MY_STATE.valueType; // Returns 'string'
```
The `type` property is intended to help Javascript users obtain basic type safety.
In Typescript, we strongly recommend the use of [generic types(https://www.typescriptlang.org/docs/handbook/2/generics.html)].
```ts
createState<string>("see generic types are nice");
```

### 📄 Return

```ts
string
```


<br />

---

<br />



## `isSet`

If the _current_ State value differs from the _initial_ State value.
```ts {2,4}
const MY_STATE = createState("jeff");
MY_STATE.isSet; // Returns false
MY_STATE.set("frank");
MY_STATE.isSet; // Returns true
```

### 📄 Return

```ts
boolean
```


<br />

---

<br />



## `isPlaceholder`

Determines if the State is a `placeholder`.
```ts
const MY_STATE = createState("myInitialValue", {
    isPlaceholder: true
});

MY_STATE.exists(); // false
```
States are, for example, `placeholder` when AgileTs needs to hold a reference to them,
even though they aren't instantiated yet.

### 📄 Return

```ts
boolean
```


<br />

---

<br />



## `initialStateValue`

The `value` which was assigned to the State first.
```ts {4}
const MY_STATE = createState("jeff");
MY_STATE.set("frank");
MY_STATE.set("hans");
MY_STATE.initialStateValue; // Returns 'jeff'
```

### 📄 Return

```ts
ValueType
```


<br />

---

<br />



## `value`

Provides the current `value` of the State.
```ts {2}
const MY_STATE = createState(123);
MY_STATE.key; // Returns '123'
```
Besides accessing the `value`, we can also assign a new `value` using this property.
```ts {1}
MY_STATE.value = 9999;
MY_STATE.value; // Returns '9999'
```

### 📄 Return

```ts
ValueType
```


<br />

---

<br />



## `previousStateValue`

Returns the previously assigned State `value`.
```ts
const MY_STATE = createState("hello");
MY_STATE.set("bye");
MY_STATE.previousState; // Returns 'hello'
```

### 📄 Return

```ts
ValueType
```



<br />

---

<br />



## `nextStateValue`

The current State `value`, but mutable without side effects.
You can make static modifications to the `nextStateValue` without affecting the actual value.
If you then call the `ingest()` method without passing any new value, the `nextStateValue` will be used.
```ts {2}
const MY_STATE = createState('hans');
MY_STATE.nextStateValue = 'jeff';
MY_STATE.ingest();
MY_STATE.value; // Returns 'jeff'
```

### 📄 Return

```ts
ValueType
```


<br />

---

<br />



## `isPersisted`

If the State `value` is stored in an external Storage like the [Local Storage](https://developer.mozilla.org/de/docs/Web/API/Window/localStorage).
```ts {1,3}
MY_STATE.isPersisted; // Returns 'false'
MY_STATE.persist();
MY_STATE.isPersisted; // Returns 'true' if the persist was successful
```

### 📄 Return

```ts
boolean
```
