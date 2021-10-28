---
id: agileHOC
title: AgileHOC
sidebar_label: AgileHOC
slug: /react/AgileHOC
---

:::info

The `AgileHOC` is intended for [Class Components](https://reactjs.org/docs/components-and-props.html),
as we recommend using React Hooks in [Functional Components](https://reactjs.org/docs/components-and-props.html).

:::

The `AgileHOC` is a Higher Order Component that binds/subscribes AgileTs States 
to a Class React Component for reactivity. 
This binding ensures that the Component re-renders whenever a bound State changes.
We can flexibly bind any [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance)
(like States or Collections) to any React Component.
The `AgileHOC` is wrapped around the React Component,
to which the specified States are to be bound.
```tsx
export default AgileHOC(RandomComponent, [MY_COOL_STATE]);
```
The current `output` or if the Instance has no `output` the current `value` 
of each provided State Instance is mapped 
into the `props` object of the corresponding Class Component.
Each State should have a unique identifier key to be correctly represented in the `props` object.
```ts
MY_STATE.key; // should not return 'null'
```
To ensure that each State can be uniquely identified,
we recommend providing the States to the `AgileHOC` in a keymap
instead of an array.
```tsx
export default AgileHOC(RandomComponent, {
    myState: MY_STATE
});
```

### 👀 Subscribable Instances

Not only AgileTs States can be bound to React Components via the `AgileHOC`,
but also all other [Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance)
that contain an [`Observer`](../../../main/Introduction.md#observer).
```ts
export default AgileHOC(RandomComponent, [MY_COOL_STATE, MY_GROUP]);
```
Instances that contain an `Observer` are, for example:
- [`State`](../../core/api/state/Introduction.md)
- [`Computed`](../../core/api/computed/Introduction.md)
- [`Collection`](../../core/api/collection/Introduction.md)
- [`Group`](../../core/api/collection/group/Introduction.md)
- [`Selector`](../../core/api/collection/selector/Introduction.md)
- [`Item`](../../core/api/collection/Introduction.md#-item)

### 🔴 Example

```tsx live
const App = new Agile({waitForMount: false});
const MY_STATE = createState("Hello Stranger!", {key: "myFirstState"});

class RandomComponent extends React.Component {
    render() {
        return (
            <div>
                <p>Direct Value: {MY_STATE.value}</p>
                <p>Props Value: {this.props.myFirstState}</p>
                <button
                    onClick={() => {
                        MY_STATE.set("Hello Friend!");
                    }}
                >
                    Update State
                </button>
            </div>
        );
    };
}

const WrappedComponent = AgileHOC(RandomComponent, [MY_STATE]);

render(<WrappedComponent/>);
```

### 🟦 Typescript

The `AgileHOC` isn't completely typesafe yet.
That is because we haven't figured out how to assign a type to 
[Agile Sub Instances](../../../main/Introduction.md#agile-sub-instance)
that are merged in the `props` object of the Class Component.
Thus, we recommend using the direct State value
instead of accessing the State values in the `props` object.
```tsx {4,9}
class RandomComponent extends React.Component {
    render() {
        // return <h1>Hi {this.props.myCoolState}</h1>; // Not Typesafe
        return <h1>Hi {MY_COOL_STATE.value}</h1>; // Typesafe
    }
}

// Wrapping AgileHOC around the React Component and binding MY_COOL_STATE to it
export default AgileHOC(RandomComponent, [MY_COOL_STATE]);
```

### 📭 Props

| Prop              | Type                                            | Description                                                                                                 | Required    |
| ----------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------|
| `reactComponent`  | ComponentClass                                  | React Component to which the specified deps should be bound.                                                | Yes         |
| `deps`            | DepsType                                        | Agile Sub Instances to be bound to the Class Component.                                                     | Yes         |
| `agileInstance`   | Agile                                           | Instance of Agile the React Component belongs to.                                                           | No          |

#### DepsType
```ts
type DepsType =
  | Array<SubscribableAgileInstancesType>
  | { [key: string]: SubscribableAgileInstancesType }
  | SubscribableAgileInstancesType;
```

#### SubscribableAgileInstancesType
```ts
type SubscribableAgileInstancesType = State | Collection | Observer | undefined;
```

### 📄 Return

```ts
AgileReactComponent
```
Returns a modified version of the provided React Component.
