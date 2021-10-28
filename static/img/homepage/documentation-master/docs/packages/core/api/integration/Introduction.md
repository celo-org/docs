---
id: introduction
title: Integration
sidebar_label: Integration
slug: /core/integration
---

:::info

Most UI-Frameworks already have an Integration for AgileTs.
In general, an Integration makes it possible to use AgileTs in a particular UI-Framework
and helps us to bind States to Components.
Check [here](../../../../main/Frameworks.md) if an Integration for your preferred UI-Framework already exists.
If there is no existing Integration yet, this Section might be interesting for you.

:::

The `Integration Class` serves an Interface to UI-Frameworks like [React](https://reactjs.org/) or [Vue](https://vuejs.org/).
It allows AgileTs to bind States to UI-Components and trigger rerender on them when a bound State value changes.
```ts
new Integration({
  key: 'myFramework',
  frameworkInstance: MyFramework,
  bind: () => {
    // Will be called during the integration process
    // and determines whether the Framework is ready
    return Promise.resolve(true);
  },
  updateMethod: (componentInstance, updatedData) => {
    // Will be called on each State value mutation (only in Component based Subscriptions)
    // For example, if MY_STATE value mutates from 'jeff' to 'hans'
    // Then this method will be called with the following props:  
    // componentInstance: Component to which the State is subscribed to
    // updatedData: Changed data (in our case '{myState: 'hans'}')
    // 
    // Note: Callback based Subscriptions use a callback function 
    // to cause rerender on Components and therefore don't call this method!
  }
});
```


## 🛠 Subscriptions

In order to create a well-functioning Integration,
we need a basic understanding of how States can be bound/subscribed to Components.
In AgileTs, there are two different ways of doing so:

### `Component` based

A `Component based Subscription` is intended for Components that manage their local states internally in a specific property.
For example in a React Class Component the `this.state` property.
Often a rerender is also triggered when the state property got changed.
Therefore, we can merge the changed AgileTs State values into the Component state property,
to cause a rerender on the Component.
```ts
const MY_STATE = createState('hans', {key: 'myState'});
App.subController.subscribeWithSubsArray(
    MyComponent, [MY_STATE.observer]
);
```
If we now mutate the `MY_STATE` value
```ts
MY_STATE.set('jeff');
```
the `updateMethod()` defined in the `Integration Class` will be called with the following properties:
```ts
// ..
updateMethod: (componentInstance, updatedData) => {
  console.log(componentInstance); // Returns 'MyComponent'
  console.log(updatedData); // Returns '{myState: 'jeff'}'
}
// ..
```
Be aware that each State needs a unique key to be properly mapped in the `updatedData` object.
```ts
updatedData = {
  myState: 'jeff',
  myDefaultGroup: [{id: 1, name: 'frank'}, {id: 3, name: 'hans'}],
  myComputed: "Hello my name is 'jeff'"
}
```
If a State can't be represented by the `updatedData` object, it will be omitted.
The `updateMethod()` will be called anyway, even with an empty `updateData` object.
To avoid this problem, we can use the `subscribeWithSubsObject()` method.
There we pass a keymap with a particular key to each Observer/Subscriber instead of an array of Observers.
```ts
App.subController.subscribeWithSubsArray(
   MyComponent,
   {
     myState: MY_STATE.observer
   }
);
```
This way, we can ensure that each [Agile Sub Instance](../../../../main/Introduction.md#agile-sub-instance) can be mapped into the `updateData` object.

### `Callback` based

A `Callback based Subscription` is intended for Components that don't manage their local states internally
or don't have a specific property handling their states.
That is why we can't trigger a rerender by mutating a state property.
Therefore, we came across another solution. A callback function which triggers a rerender on the particular Component.
This callback function will then be called instead of the `updateMethd()`,
whenever a subscribed State mutates.
```ts
const MY_STATE = createState('hans', {key: 'myState'});
App.subController.subscribeWithSubsArray(
    () => {console.log('Called callback')},
   [MY_STATE.observer]
);
```
If we now mutate the `MY_STATE` value
```ts
MY_STATE.set('jeff');
```
the defined callback function will be called.
```ts
// console: 'Called callback'
```


## 💾 Example

In order to get an idea of what an actual Integration might look like.
Here are some examples:

### 🔵 [`React`](https://reactjs.org/)
Here you can see what the [React Integration](https://github.com/agile-ts/agile/tree/master/packages/react) looks like.
```ts
import { Agile, flatMerge, Integration } from '@agile-ts/core';
import { AgileReactComponent } from './hocs/AgileHOC';
import React from 'react';

const reactIntegration = new Integration<typeof React, AgileReactComponent>({
  key: 'react',
  frameworkInstance: React,
  // Used to update State in Class Components (Component based Subscription)
  // Note: Functional Components use a Callback based Subscription, 
  // therefore they don't call 'updateMethod()'  
  updateMethod(componentInstance, updatedData: Object) {
    // Merge changes into State if some Data updated otherwise force rerender
    if (Object.keys(updatedData).length !== 0) {
      componentInstance.agileProps = flatMerge(
        componentInstance.agileProps,
        updatedData
      );
      componentInstance.setState(
        flatMerge(componentInstance.state, updatedData)
      );
    } else {
      componentInstance.forceUpdate();
    }
  },
});

// Register Integration to AgileTs before instantiation
// So that the user don't have to integrate it manually ('App.integration(reactIntegration)')
Agile.initialIntegrations.push(reactIntegration);

export default reactIntegration;
```
However, to efficiently use AgileTs in Functional and Class Components,
we had to create ways to simplify the binding of States to UI-Components.
Therefore, we created the `useAgile()` Hook for Functional Components
and the `AgileHOC()` for Class Components.
In the following examples we visually demonstrate the difference of,
how much easier e.g. the `useAgile()` Hook made the binding of States to Components:
- binding State with `useAgile()`:
   ```ts title=FunctionalComponent.ts
    useAgile(MY_STATE);
   ```
- binding State manually:
   ```ts title=FunctionalComponent.ts
    // Simple reducer to create a 'rerender' callback
    const [, forceRender] = React.useReducer((s) => s + 1, 0);

    useEffect(() => {
        // Create Callback based Subscription to bind State to Component
        // and rerender Component whenever the State mutates
        const subscriptionContainer = App.subController.subscribeWithSubsArray(
            // Our rerender trigger callback
            () => {
                forceRender();
            },
            [MY_STATE.observer]
        );
 
        // Unsubscribe Callback based Subscription on Unmount
        // -> cleaning up, otherwise it can lead to memory leaks
        return () => {
            App.subController.unsubscribe(subscriptionContainer);
        };
    });
   ```

Last but not least, lets take a quick look how a simplified `useAgile()` Hook looks like.
```ts
import React from 'react';
import {
    Agile,
    getAgileInstance,
    extractObservers,
    Observer,
    State,
} from '@agile-ts/core';

function useAgile(deps: Array<State | Collection | Observer | undefined>, agileInstance?: Agile){
    // Extract Observers from passed Agile Sub Instances
    // Each State has an Observer, which can be subscribed to a Component
    // Through such Observer the State is able to trigger rerenders on the subscribed Components
    const depsArray = extractObservers(deps);
    
    // Trigger State, used to force Component to rerender
    const [, forceRender] = React.useReducer((s) => s + 1, 0);
    
    useEffect(() => {
        // Try to get Agile Instance from passed Instances, otherwise drop error
        if (!agileInstance) agileInstance = getAgileInstance(depsArray[0]);
        if (!agileInstance || !agileInstance.subController) {
            Agile.logger.error('Failed to subscribe Component with deps', depsArray);
            return;
        }

        // Remove undefined Observers, since we can't subscirbe a not existing Observer
        const observers: Observer[] = depsArray.filter(
            (dep): dep is Observer => dep !== undefined
        );

        // Create Callback based Subscription
        // -> whenever a subscribed State mutates, this callback will be called
        // or if its an Component based Subscription the 'updateMethod()' in the React Integration (used in AgileHOC)
        const subscriptionContainer = agileInstance.subController.subscribeWithSubsArray(
            () => {
                forceRender();
            },
            observers,
            key
        );

        // Unsubscribe Callback based Subscription on Unmount (cleaning up, otherwise it can lead to memory leaks)
        return () => {
            agileInstance?.subController.unsubscribe(subscriptionContainer);
        };
    }, []);

    // Create return value
    return depsArray.map((dep) => {
        return dep?.value;
    });
}
```


## 📭 Props

```ts
new Integration(config);
```

### `config`

An `Integration` takes a required configuration object as its only parameter.
```ts
new Integration<typeof React, AgileReactComponent>({
  key: 'myFramework',
  frameworkInstance: MyFramework,
  bind: () => {},
  updateMethod: (componentInstance, updatedData) => {}
});
```
Here is a Typescript Interface for quick reference. However,
each property is explained in more detail below.
```ts
export interface CreateIntegrationConfig<F = any, C = any>
    extends IntegrationMethods<C> {
    key: string;
    frameworkInstance?: F;
}

// or without extending

export interface CreateIntegrationConfig<F = any, C = any> {
    key: string;
    frameworkInstance?: F;
    bind?: (agileInstance: Agile) => Promise<boolean>;
    updateMethod?: (componentInstance: C, updatedData: Object) => void;
}
```

<br/>

#### `key`

The required property `key/name` should be a unique `string/number` to identify the Integration later.
```ts
new Integration({
  key: "myIntegration"
  // ..
});
```

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `string \| number` | undefined   | Yes      |

<br/>

#### `frameworkInstance`

An Instance of the Framework the Integration represents.
```ts
new Integration({
  frameworkInstance: MyFramework
  // ..
});
```
For example, in the case of [React](https://reactjs.org), it should be the `React` Instance.

| Type               | Default     | Required |
|--------------------|-------------|----------|
| `any`              | undefined   | No       |

<br/>

#### `bind`

Will be called during the integration process
and determines whether the Framework is `ready`.
```ts
new Integration({
  bind: () => {
    const isReady = /* Some conditions */;
    return Promise.resolve(isReady);
  }
  // ..
});
```
For example, it can be used to configure some things before the Framework is integrated into AgileTs.

| Type                                               | Default     | Required |
|----------------------------------------------------|-------------|----------|
| `(agileInstance: Agile) => Promise<boolean>`       | undefined   | No       |

<br/>

#### `updateMethod`

Will be called as soon as a State subscribed to a Component (`componentInstance`) mutates.
```ts
new Integration({
  updateMethod: (componentInstance, updatedData) => {
    // For example, if MY_STATE value mutates from 'jeff' to 'hans'
    // Then this method will be called with the following props:  
    // componentInstance: Component to which the State is subscribed to
    // updatedData: Changed data (for instance '{myState: 'hans'}')
  }
  // ..
});
```
Be aware that this is only the case if it is a [`Component based Subscription`](#component-based).
In [`Callback based Subscription`](#callback-based), a callback function will be called to trigger a rerender on the Component
instead of the `updateMethod()`.

| Type                                                   | Default     | Required |
|--------------------------------------------------------|-------------|----------|
| `(componentInstance: C, updatedData: Object) => void`  | undefined   | No       |


## 🟦 Typescript

The `Integration Class` is almost 100% typesafe.
