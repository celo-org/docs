---
id: style-guide
title: Style Guides
sidebar_label: Style Guides
slug: /style-guide
description: Contributions to AgileTs can be made with little effort and are very welcome. We look forward to your input.
image: img/meta.png
---

A good frontend architecture isn't installable via npm
and even AgileTs cannot solve this problem on the go.
Planning and building a well-structured application requires a lot of time and effort.
At the beginning, it may not seem appealing to invest time in a good structure
as it will prevent you from getting everything up and running as quickly as possible.
However, a clear structure and consistent plan
saves you a lot of headache and will certainly pay of in the end.
You'll be able to better plan for scaling, avoid unnecessary refactoring sessions
and understand the app hierarchy without having to re-learn every component or service
every time you need to update existing code for a new feature.

So how does a good structured application looks like? 
Well that depends on many factors and to be honest there exists no right or wrong.
Every developer is an individual 
that has different code styles and visions for their application.

In order not to leave you completely in the dark 
and to give you some inspiration, we have prepared some `Style Guides`.
These guides give you a basic idea of possible structures for frontend applications
using AgileTs as State Management Framework.
Feel free to choose one of them and adapt it to your needs.

:::important

**AgileTs isn't bound to any specific Style-Guide**,
but there are some you may get inspired from.

:::

## 🚀 Inspiration 1

The `Style Guide 1` is intended for **smaller and medium size applications** 
with about `1-3` entities. (In AgileTs, `entities` are things with distinct 
and independent existence like users, posts, or todos.)
We put everything related to these entities 
into a single file of truth called `store.js` or `core.js`.
In the end, the `core` file contains all the business logic of your application,
meaning all the global `states` and `actions`.

If your application scales over time and has more than `1-3` entities, 
we don't recommend using this Style Guide
as it gets a mess to put everything into a single file of truth.

#### 🖥️ Example Application
- [Simple Todo List](https://codesandbox.io/s/agilets-simple-todo-list-glmc4)

#### 🏰 Structure
The Style Guide builds on the single source of truth principle.
Thus, it has a single source of truth file called `store.ts`
at the top-level of the `src` folder besides the UI-Components.
```js {3} title="MyApp"
my-app
├── src
│   └── store.ts
│   └── ui
.
```
The `store.ts` file is, so to say, the brain of your application and contains all business logic
and logic, in general, that isn't explicitly bound to a UI-Component.
This outsourcing of our logic makes our code more decoupled,
portable, and above all, easily testable.

We use the `store.ts` file of a simple TODO application to illustrate visually
how it can be constructed.

### 📝 store.ts

In the `store.ts` file, we instantiate all [Agile Sub Instances](../main/Introduction.md#agile-sub-instance) (`MY_TODOS`),
define all actions (`updateTodo()`, `toogleTodo()`, ..) 
and if you are using Typescript interfaces (`TodoInterface`) are located here too.
```ts title="store.ts"
import { createCollection } from "@agile-ts/core";

export interface TodoItemInterface {
  id: number;
  text: string;
  done: boolean;
}

// Create Collection (a dynamic set of States)
export const MY_TODOS = createCollection<TodoItemInterface>({
  key: "todos"
}).persist(); // perist does store the Collection in the Local Storage

// Update Todo action
export const updateTodo = (id: number, text: string): void => {
  MY_TODOS.update(id, { text: text });
};

// Toggle Todo action
export const toggleTodo = (id: number): void => {
  MY_TODOS.update(id, { done: true });
};

// Remove Todo action
export const removeTodo = (id: number): void => {
  MY_TODOS.remove(id).everywhere();
};

// Add Todo action
export const addTodo = (text: string): void => {
  MY_TODOS.collect(
    {
      id: randomId(),
      text: text,
      done: false
    }
  );
};
```
If you are wondering why we write AgileTs States uppercase. 
Well, it has a simple advantage.
We can easily differentiate between global and local States in our UI-Components.



<br />

---

<br />



## 🚀 Inspiration 2

The `Style Guide 2` is intended for **medium size and large applications** 
with more than `3` entities. 
(In AgileTs, `entities` are things with distinct and independent existence like users, posts, or todos.)
At first glance, this way of organizing your application looks very boiler-late-ey. 
Each entity has its own directory with a bunch of files.
However, there is a system behind it,
that will definitely improve the maintainability and scalability of your application.
We put everything related to the entities into a single folder of truth called `core`.
In the end, the `core` folder contains all the business logic of your application, 
meaning all the global `states` and `actions`.

This Style Guide can also be applied to smaller applications
like a simple todo app with `1-3` entities.
Indeed, this might be an overkill and brings no added value at the beginning,
however it makes your application pretty scalable 
in case you do want to expand its functionalities later.

#### 🖥️ ExampleApplications
Currently, no open-source application uses this `Style Guide`.
However, I have personally worked with it in a medium-sized private repository with about `7` entities, 
and it worked pretty well. 

#### 🏰 Structure
The Style Guide builds on the single source of truth principle.
Thus, it has a single source of truth folder called `core`
at the top-level of the `src` folder besides the UI-Components.
```js {3} title="MyApp"
my-app
├── src
│   └── core
│   └── ui
.
```
The `core` is the brain of your application and contains all business logic
and logic in general that isn't explicitly bound to a UI-Component.
This outsourcing of our logic makes our code more decoupled,
portable, and above all, easily testable.

We use the `core` of a simple TODO application to visually illustrate how such a `core` can be constructed.
Our todo application has two main [entities](#1-entities), which a State Manager like AgileTs should handle.
The **User** entity and of course, the **TODO-Item** entity. These two entities are mapped in our `core` folder.
```js title="TodoList-Core"
core
│── api
│   ├── index.ts
│── entities
│  └── todo
│  |    ├── index.ts
│  |    └── todo.actions.ts
|  |    └── todo.controller.ts
|  |    └── todo.interfaces.ts
|  |    └── todo.routes.ts
│  └── user
│       ├── index.ts
│       └── user.actions.ts
|       └── user.controller.ts
|       └── user.interfaces.ts
|       └── user.routes.ts
|── index.ts
.
```
Each property you find in the above folder structure of the `TodoList-Core`, 
is described in detail below ⬇️.

## 📁 api {#1-api}

Our Todo-List app has to communicate to a `backend`,
in order authenticate the user and permanently remember todos.
Therefore, we need something that communicates with our server 
and allows the easy creation of http/s requests.
In this example, we use the [AgileTs API](../packages/api/Introduction.md),
but you can use whatever you prefer.
If your application doesn't need to communicate to a `backend`,
you can entirely skip the `api` part.

### 📝 index.ts

To enable the creation of rest calls, 
we initialize an API Instance in the `index.ts` file of the `api` folder.
The defined API Instance will then be mainly used 
in the [route](#1-routests) file of an [entity](#1-entities).
```ts title="index.ts"
import API from '@agile-ts/api';

const api = new API({
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    options: {
        credentials: undefined,
    },
});

export default api;
```

## 📁 entities {#1-entities}

Our `core` consists of several entities, 
which exist apart from each other, having their own independent existence.
Each `entity` manages its data separately by making rest calls or mutating its states. 
This strict separation makes our `core` more
structured, readable, and improves maintainability.

**For example:** <br />
The _User Entity_ should only treat the user's whole logic 
and shouldn't do rest calls for the _Todo-Item Entity_.

### 📝 index.ts

Here we export all [actions](#1-actionsts), [routes](#1-routests), [interfaces](#1-interfacests) and
the [controller](#-controllerts) to properly import them in our UI-Layer later.
```ts title="index.ts in 📁todo"
import * as actions from "./todo.actions";
import * as controller from "./todo.controller";
import * as routes from "./todo.routes";
import * as interfaces from "./todo.interfaces";

export default {
    ...actions,
    ...controller,
    ...routes,
    ...interfaces,
};
```
In the UI-Layer the entity can then be imported and used like that:
```ts
import core from '../core';

// Call create Todo action
core.todo.createTodo();

// Retreive the 'TODOS' Collection
core.todo.TODOS;
```

### 📝 .actions.ts {#1-actionsts}

All actions of an entity are defined in this file.
In general, an action modifies the application states, 
makes rest calls (through the functions provided by the [routes.ts](#1-routests) file),
and computes some values if necessary.
In principle, actions always happen in response to an event. 
For example, when the _add todo button_ was pressed.
Thus, they should be called like action sounding names (e.g. `createTodo` or `removeTodo`).

**For example:** <br />
The creation of a Todo-Item in the UI-Layer triggers the `addTodo()` action,
which then mutates our Todo Items State and makes a rest call to the backend.

```ts title="todo.actions.ts in 📁todo"
import {TodoInterface} from './todo.interfaces';
import {ADD_TODO} from './todo.routes';
import {TODOS} from './todo.controller';

export const addTodo = async (userId: string, description: string): Promise<void> => {
    // Rest call to the backend
    const response = await ADD_TODO({description: description, userId: userId});

    // Add Todo to Collection
    TODOS.collect(todo, userId);
};

// ..
```

### 📝 .controller.ts {#1-controllerts}

The `controller.ts` manages 
and contains the [Agile Sub Instances](../main/Introduction.md#agile-sub-instance) for an entity.
These Agile Sub Instances can and should then only be modified by the actions ([actions.ts](#1-actionsts))
or bound to UI-Components in the UI-Layer for reactivity.
```ts title="todo.controller.ts in 📁todo"
import {createCollection, createComputed} from "@agile-ts/core";
import {TodoInterface} from './todo.interfaces';
import {CURRENT_USER} from '../user'

// Contains all existing TODO's
export const TODOS = createCollection<TodoInterface>()();

// Contains all TODO's that belong to the current logged in USER
export const USER_TODOS = createComputed(() => {
    return TodosCollection.getGroup(CURRENT_USER.value.id).output;
});
```
If you are wondering why we write AgileTs States uppercase. 
Well, it has a simple advantage.
We can easily differentiate between global and local States in our UI-Components.

### 📝 .interfaces.ts

:::note

The `interfaces` section can be ignored by non [Typescript](https://www.typescriptlang.org/) users!

:::

If you are familiar with [Typescript](https://www.typescriptlang.org/), 
you properly want to create some interfaces for your entity,
and the surrounding things like actions or routes.
These interfaces belonging to the entity should be defined here.

**For example** <br />
In the case of the TODO-Entity, it contains the `TodoInterface`.

```ts title="todo.interfaces.ts in 📁todo"
export interface TodoInterface {
    id: string
    userId: string
    description: string
    creationDate: string
}

interface AddTodoPayloadInterface {
    description: string,
    userId: string
}

// ..
```

### 📝 .routes.ts {#1-routests}

In order to communicate to our backend, 
we create some [rest calls](https://en.wikipedia.org/wiki/Representational_state_transfer).
For better maintainability, these rest calls are outsourced 
from the [actions.ts](#1-actionsts) file and provided by this file in function shape.
These route functions should only be used in the [actions](#1-actionsts) of the entity.
It's not recommended calling them from outside the corresponding entity.
```ts title="todo.routes.ts in 📁todo"
import {TodoInterface, AddTodoPayloadInterface} from "./todo.interfaces";
import api from "../../api";

export const ADD_TODO = async (payload: AddTodoPayloadInterface): Promise<TodoInterface> => {
    const response = await api.post('todos', payload);
    return response.data.body.todo;
}

// ..
```

## 📝 index.ts

Here we export our `core` entities, so that each entity 
can be reached without any detours in the UI-Layer.
In a UI-Component we can then simply import the `core` 'package'
and mutate its entities as wished without further thinking.
For example when we want to add a Todo-Item to the TODO Collection
we simply call `core.todo.addTodo(/* new todo */);`.
```ts title="index.ts"
import todo from "./controllers/todo";
import user from "./controllers/user";
import {globalBind} from "@agile-ts/core";

const core = {
    todo: todo,
    user: user,
};

// For better debugging we bind the core globally 
// !! Don't do that in PRODUCTION !!
globalBind("__core__", core);

export default core;
```



<br />

---

<br />



## 🚀 Inspiration 3

:::note

There is no third Inspiration Guide yet.
It does not have to be like this forever.
Feel free to share your own `Style Guide` inspiration here. 
Every contribution is welcome. 😀

:::
