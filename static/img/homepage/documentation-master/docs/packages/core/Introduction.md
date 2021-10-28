---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /core
---

<a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg?label=license&style=flat&colorA=293140&colorB=4a4872" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/core">
  <img src="https://img.shields.io/npm/v/@agile-ts/core.svg?label=npm&style=flat&colorA=293140&colorB=4a4872" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/core">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/core.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/core">
  <img src="https://img.shields.io/npm/dt/@agile-ts/core.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>

<br />
<br />

> Global State and Logic Library

## ❓ `core`

As the name suggests, the `core` is the main package of AgileTs.
It contains the core API for State Management with AgileTs,
which includes, for example, handy classes like:

- ### ⚡️ [State](api/state/Introduction.md)
  A `State` represents a piece of Information 
  that we need to remember globally at a later point in time.
  While offering a toolkit to use and mutate this piece of Information.
  ```ts
  const MY_STATE = createState("Hello there");
  
  // Update current State value
  MY_STATE.set("hi"); 
  
  // Undo latest State value change
  MY_STATE.undo(); 
  ```

- ### 👨‍👧‍👦 [Collection](api/collection/Introduction.md)
  A `Collection` represents a reactive _set_ of Information 
  that we need to remember globally at a later point in time.
  While offering a toolkit to use and mutate this _set_ of Information.
  ```ts
  const MY_COLLECTION = createCollection();
  
  // Add Data to Collection
  MY_COLLECTION.collect({id: 1, name: "frank"});
  
  // Remove Data at primary Key '1' from Collection
  MY_COLLECTION.remove(1).everywhere(); 
  ```

- ### 🤖 [Computed](api/state/Introduction.md)
  A `Computed` is an extension of the `State Class` that computes
  its value from a specified function.
  ```ts
   const MY_COMPUTED = createComputed(() => {
     return MY_STATE_1.value + MY_STATE_2.value;
  });
  ```

However, to make the whole State Management API work well,
the `core` does a lot under the hood.
- queue [`Agile Sub Instance`](../../main/Introduction.md#agile-sub-instance)
  changes in the `runtime` to prevent race conditions
- update/rerender subscribed UI-Components through the provided Integrations
  such as the [React Integration](../react/Introduction.md)
- integrate with the persistent [Storage](./api/storage/Introduction.md)

These internal tasks are centrally managed
by a so called [Agile Instance](./api/agile-instance/Introduction.md).

## 🚀 Quick Links
- [Installation](./Installation.md)
- [Agile-Instance](api/agile-instance/Introduction.md)
  - [Properties](api/agile-instance/Properties.md)
  - [Methods](api/agile-instance/Methods.md)  
- [State](api/state/Introduction.md)
  - [Properties](api/state/Properties.md)
  - [Methods](api/state/Methods.md)
- [Collection](api/collection/Introduction.md)
  - [Properties](api/collection/Properties.md)
  - [Methods](api/collection/Methods.md)
  - [Group](api/collection/group/Introduction.md)
    - [Properties](api/collection/group/Properties.md)
    - [Methods](api/collection/group/Methods.md)
  - [Selector](api/collection/selector/Introduction.md)  
    - [Properties](api/collection/selector/Properties.md)
    - [Methods](api/collection/selector/Methods.md)
- [Computed](api/computed/Introduction.md)
  - [Properties](api/computed/Properties.md)
  - [Methods](api/computed/Methods.md)
- [Storage](api/storage/Introduction.md)
  - [Persisting Data](api/storage/PersistingData.md)
- [Integration](api/integration/Introduction.md)
