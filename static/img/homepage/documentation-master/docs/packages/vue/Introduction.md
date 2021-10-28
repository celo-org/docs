---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /vue
---

 <a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg?label=license&style=flat&colorA=293140&colorB=4a4872" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/vue">
  <img src="https://img.shields.io/npm/v/@agile-ts/vue.svg?label=npm&style=flat&colorA=293140&colorB=4a4872" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/vue">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/vue.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/vue">
  <img src="https://img.shields.io/npm/dt/@agile-ts/vue.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>

<br />
<br />

:::warning

WIP Documentation!

---

The `vue` package works fine and does not show any problems yet. 
However, it has not yet been tested extensively and isn't typesafe (Typescript).

If you find a bug, please file a [github issue](https://github.com/agile-ts/agile/issues),
and we will fix it as soon as possible.

:::

> Integration for [Vue](https://vuejs.org/)

## ❓ `vue`

The `vue` package helps us to integrate AgileTs into a [Vue](https://vuejs.org/) environment
and serves as an Interface to Vue.
Its main task is to bind States to Vue Components.
This binding ensures that AgileTs rerender the Component whenever a bound State mutates.
It also offers some other valuable functionalities that optimize the workflow using AgileTs in a Vue project.

### `bindAgileInstances()`

The `bindAgileInstances()` method binds/subscribes States to Vue Components.
This binding ensures that the Component rerenders whenever a bound State mutates.
We can flexibly bind any State to any Vue Component.
```ts {4-7}
export default {
    name: 'MyComponent',
    data: function () {
        return {
            ...this.bindAgileInstances({
                myState: MY_STATE,
            }),
        };
    },
};
```
`bindAgileInstances()` returns a State value keymap based on the passed States.
We merge the returned keymap into the `data` object
to access the State `values` in the `html` code like we would local Vue States.
```vue {3}
<template>
  <div id="app">
    <p>myState: {{ sharedState.myState }}</p>
  </div>
</template>
```
Note that the AgileTs State `values` are under the `sharedState` property located
to separate them from the local Vue States.
```ts {4-7}
const MY_STATE = createState('jeff');
const MY_STATE_2 = createState('frank');

this.bindAgileInstances({
  myState: MY_STATE,
  myState2: MY_STATE_2,
}); // Returns '{myState: 'jeff', mayState2: 'frank'}'
```
Instead of a States keymap we can also pass an array of States. 
But keep in mind that then the passed States require a unique `key`
to be properly mapped into the returned State `value` keymap.
```ts {4-7}
const MY_STATE = createState('jeff', {key: 'myState'});
const MY_STATE_2 = createState('frank');

this.bindAgileInstances([
  MY_STATE,
  MY_STATE_2,
]); // Returns '{myState: 'jeff'}'
```
Passed States without a valid `key` are ignored 
and won't be represented by the returned keymap.
Thus, the State `value` isn't accessible in the `html` code, 
and a State mutation rerender is triggered via. `vueComponent.forceRerender()`
instead of mutating the `data` object.

### 🟦 Typescript

The Vue Integration isn't typesafe yet. But we are working on it.

## 🚀 Quick Links
- [Installation](./Installation.md)

