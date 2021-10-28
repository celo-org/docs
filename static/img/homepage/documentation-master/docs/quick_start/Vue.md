---
id: vue
title: Vue
sidebar_label: Vue
slug: /quick-start/vue
---

:::warning

The Vue integration is currently **'Work in Progress'**
and hasn't yet been tested extensively! 
But as far as I can tell, it works well, with some (Typescript) type limitations.

:::

Welcome to the [Vue](https://vuejs.org/) quick start guide. 
**This tutorial will briefly introduce you to AgileTs
and teach you how to use its fundamental functionalities in a Vue environment.**
By the time you finish this guide, you will be able to start building your own AgileTs applications. 
We recommend proceeding from top to bottom, as some parts of the tutorial build on each other.

## 🔽 Installation

Let's start with the installation. If you haven't intended to install AgileTs yet,
you can skip the installation guide and jump straight into the '[Create first State](#-create-first-state)' tutorial.

In order to use AgileTs in a Vue Environment, we need to install two packages.
- [`@agile-ts/core`](#-agile-tscore)
- [`@agile-ts/vue`](#-agile-tsvue)

### 📁 `@agile-ts/core`

```bash npm2yarn
npm install @agile-ts/core 
```
The [`core`](../packages/core/Introduction.md) package contains the State Management Logic of AgileTs
and therefore provides powerful classes like the [`State Class`](../packages/core/api/state/Introduction.md).

### 📂 `@agile-ts/vue`

```bash npm2yarn
npm install @agile-ts/vue 
```
The [Vue Integration](../packages/vue/Introduction.md), on the other hand, 
is an interface to Vue and provides useful functionalities
such as the [`bindAgileInstances()`](../packages/vue/Introduction.md#bindagileinstances)) method 
to bind States to Vue Components for reactivity.

## 💡 Create first State

After we have successfully set up a project with AgileTs installed, 
we can start creating our first AgileTs State. 
But first things first, what is a State in AgileTs?

### ❓ What is a State

A `State` represents a piece of Information that we need to remember globally at a later point in time.
Such information can be the current theme or the logged-in user,
which we have to access in multiple React Components.
All we need to instantiate a State, is to call `createState()` and specify an initial value.
```ts
const MY_FIRST_STATE = createState("Hello World");
```
Now that we have instantiated our first State,
we can dynamically and easily manipulate its value.
```ts
// Update State value to 'Hello There'
MY_FIRST_STATE.set("Hello There");

// Undo latest change (-> Value is now "Hello World" again)
MY_FIRST_STATE.undo();

// Permanently store State value in an external Storage
MY_FIRST_STATE.persist();
```

### 👨‍💻 Example {#example-1}

To get a better understanding of how to use an Agile State in Vue, 
we should view it in an example.
The sample project we'll look at is a small counter 
that lets us increment a number as we click the 'Update State' button.
It may not be fascinating, but it shows all the essential pieces of a Vue + AgileTs application in action.
After checking out the example, 
we recommend taking a look at the [Important Code Snippets Section](#important-code-snippets-1) below.
There important code snippets related to AgileTs are described in more detail.
In case you have any further questions, 
don't hesitate to join our [Community Discord](https://discord.gg/T9GzreAwPH).
```tsx
// -- core.js ------------------------------------------------

// 1️⃣ Create State with the initial value "Hello World"
const MY_FIRST_STATE = createState("Hello World");

// -- RandomComponent.vue ------------------------------------------------

<template>
    <div>
        <!-- 3️⃣ Access State value in the 'sharedState' property -->
        <p>{{sharedState.myFirstState}}</p>
        <button @click='updateHelloWorld'>Update State</button>
    </div>
</template>

<script>
    const helloWorldCount = 0;
    
    export default {
      data: function() {
        return {
            // 2️⃣ Bind initialized State to 'RandomComponent' for reactivity
            ...this.bindAgileInstances({
             myFirstState: MY_FIRST_STATE
            }),
        };
      }
      methods: {
        updateHelloWorld: function() {
            // 4️⃣ Update State value on Button press
            MY_FIRST_STATE.set(`Hello World ${++helloWorldCount}`)
        }
      }  
   }
</script>
```
Check out the [code sandbox](https://codesandbox.io/s/agilets-first-state-i5xxs) 
to see the whole example in a production near environment.

### 💻 Important Code Snippets {#important-code-snippets-1}

```ts
const MY_FIRST_STATE = createState("Hello World");
```
1️⃣ All you need to instantiate a State, is to call `createState()` and specify an initial value.
In our example, we have assigned the initial value 'Hello World' to the State.
If you are wondering why we write AgileTs States uppercase.
Well, it has a simple advantage.
We can easily differentiate between global
and local States in our UI-Components (See Step 3️⃣).

```ts
data: function() {
    return {
        ...this.bindAgileInstances({
            myFirstSTate: MY_FIRST_STATE
        }),
    };
}
```
️2️⃣ Now, we bind the previously created 'Hello World' State to the Vue Component
using the [`bindAgileInstances()`](../packages/vue/Introduction.md#bindagileinstances) method.
This binding ensures that the Vue Component re-renders whenever the current State `value` changes.
`bindAgileInstances()` merges the current `value` of the State into the local Vue States
under the `sharedState` property. 
Thus, we can access the State `value` in the `html` code like a local Vue State.
Unfortunately, we haven't managed to make it typesafe yet. But we are working on it.

```tsx
<p>{{sharedState.myFirstState}}</p>
```
3️⃣ After binding the AgileTs States to the Vue Component (Step 3),
we can access them like a local Vue State in the `html` code.
However, the global AgileTs State `values` are located under the `sharedState` property
to visually separate them from the local Vue States.

```ts
MY_FIRST_STATE.set(`Hello World ${++helloWorldCount}`);
```
3️⃣ To bring some life into our small application,
we update the State `value` with the help of the State's `.set()` function
on each 'Update State' button press.
Thereby we increase the external set `helloWorldCount` in ascending order.

### 😱 Troubleshooting

#### Component doesn't re-render when State mutates.
Such a problem can occur when the automatic integration of React has failed.
Often it helps to manually integrate the React integration into the Agile Instance to which the State belongs.
In our case that would be the internal [`shared` Agile Instance](../packages/core/api/agile-instance/Introduction.md#-shared-agile-instance).
```ts
import {shared} from "@agile-ts/core";
import reactIntegration from "@agile-ts/react";

shared.integrate(reactIntegration);
```

## 🔍 Next Steps

The concepts we've covered in this tutorial should be enough to get you started building
your own applications using Vue and AgileTs.
Now is a good time to try working on a project yourself to solidify
these learned concepts and see how they work in practice.
If you're not sure what kind of project to create,
see [this list of app project ideas](https://github.com/florinpop17/app-ideas) for some inspiration.
Before you jump straight into creating your own application,
we suggest taking a look at our [Style Guide](../main/StyleGuides.md) documentation.
There we give you some inspiration on 
how to properly structure your application States using AgileTs.

If you're looking for help with AgileTs questions,
you can certainly find a solution in the more detailed documentations
(Tip: Try typing your question in the search bar in the top right corner).
- [core](../packages/core/Introduction.md)
- [vue](../packages/vue/Introduction.md)

or join our [Community Discord](https://discord.gg/T9GzreAwPH) and ask there.
We would love to help you out and see what great things you build.
