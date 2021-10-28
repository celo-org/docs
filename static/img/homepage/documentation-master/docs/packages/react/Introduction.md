---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /react
---

 <a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg?label=license&style=flat&colorA=293140&colorB=4a4872" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/react">
  <img src="https://img.shields.io/npm/v/@agile-ts/react.svg?label=npm&style=flat&colorA=293140&colorB=4a4872" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/react">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/react.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/react">
  <img src="https://img.shields.io/npm/dt/@agile-ts/react.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>

 <br />
 <br />

> Integration for [React](https://reactjs.org/) and [React-Native](https://reactnative.dev/)

## ❓ `react`

The `react` package is a set of utilities that simplifies the way AgileTs is integrated into a [React](https://reactjs.org/) environment.
Think of it as an extension of AgileTs in the context of React
that serves as an interface to React Components.
The main task of the `react` integration is to bind AgileTs States to React Components.
This ensures that AgileTs will re-render the Component when the bound State changes.
It also provides some other valuable functionalities
that optimize the workflow with AgileTs in a React project.

A distinction is made between `Functional` and `Class` Components.
As we prefer to use [`React Hooks`](https://reactjs.org/docs/hooks-intro.html) in Functional Components,
however, Hooks aren't supported in Class Components.
Therefore, we have created alternatives for Class Components
in order to offer the most essential functionalities there as well.

### 🐆 Functional Component

In `Functional Components` we recommend using AgileTs Hooks like [`useAgile()`](api/Hooks.md#useagile).
The `useAgile()` Hook binds [Agile Sub Instances](../../main/Introduction.md#agile-sub-instance)
(like States or Collections) to React Components for reactivity.
```ts
// -- MyComponent.jsx ------------------------------------------

// Binds MY_FIRST_STATE to 'MyComponent.jsx' for reactivity
const myFirstState = useAgile(MY_FIRST_STATE);
```
To find out more about `useAgile()`, and other Hooks provided by AgileTs,
checkout the [AgileTs Hook documentation](api/Hooks.md).

### 🦖 Class Component

For `Class Components`, we provide the `AgileHOC`.
The `AgileHOC` is a Higher Order Component that is wrapped around a React Component.
It takes care of binding [Agile Sub Instances](../../main/Introduction.md#agile-sub-instance)
(like States or Collections) to the wrapped React Components for reactivity.
```ts
// -- MyComponent.jsx ------------------------------------------

// Binds MY_FIRST_STATE to 'MyComponent.jsx' for reactivyty
export default AgileHOC(myComponent, [MY_FIRST_STATE]);
```
To find out more about the `AgileHOC` and how to correctly use AgileTs in Class Components,
take a look at the [AgileHOC documentation](api/AgileHoc.md).

## 🚀 Quick Links
- [Installation](./Installation.md)
- [React Hook](api/Hooks.md)
  - [useAgile](api/Hooks.md#useagile)
  - [useProxy](api/Hooks.md#useproxy)  
  - [useSelector](api/Hooks.md#useselector)
  - [useValue](api/Hooks.md#usevalue)  
  - [useWatcher](api/Hooks.md#usewatcher)
- [AgileHOC](api/AgileHoc.md)
