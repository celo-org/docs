---
id: typescript
title: TypeScript
sidebar_label: Typescript
slug: /core/guides/typescript
---

:::info

WIP documentation!

:::

### States are type inferred
```ts
const NUMBER = createState(0); // 'number' State
const STRING = createState('jeff'); // 'string' State
```

### States can be explicitly typed
```ts
const NUMBER = createState<number>(0); // 'number' State
const PERSON = createState<{id: number, name: 'jeff'} | null>(null); // '{id: number, name: 'jeff'} | null' State
```

### [React] `useAgile` is typed based on State types
```ts
// single State
const num = useAgile(NUMBER);
console.log(typeof num); // Returns 'number'

// or multiple State
const [str, person] = useAgile([STRING, PERSON]);
console.log(typeof str); // Returns 'string'
// person is of the type '{id: number, name: 'jeff'} | null'
```

### Computed States are type inferred
```ts
const MY_INTRODUCTION = createComputed(() => {
  return `My name is '${MY_NAME.value}' and I am ${MY_AGE.value} yeas old.`;
}); // 'string' Computed State
```

### Computed States can be explicitly typed
```ts
const IS_JEFF = createComputed<boolean>(() => {
    return MY_NAME.is("jeff");
}); // 'boolean' Computed State
```

### Problem with async Computed States
Since the Computed value is cached, an async Computed State isn't of the type Promise.
Instead, it is `null` as long as the value hasn't been cached.
```ts
const ASYNC = createComputed(async () => {
    // sleep x seconds
    return 'async Computed';
}); // 'string' Computed State [However it is null as long as no value is cached]

// solution
const ASYNC = createComputed<strinng | null>(async () => {
    // sleep x seconds
    return 'async Computed';
}); // 'string | null' Computed State 
```
