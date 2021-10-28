---
id: hooks
title: Hooks
sidebar_label: Hooks
slug: /event/hooks
---

## `useEvent`

The `useEvent` React Hook allows us to register a new callback function to the passed Event.
```ts
useEvent(MY_EVENT, () => {
   // This is a 'callback function' which gets called when ever the EVENT gets triggered
})
```
The advantage of using this Hook instead of the `on` method in a React Component,
is that the registered callback function gets automatically unregistered whenever the Component unmounts.

### 🔴 Example

```tsx live
const App = new Agile();
const MY_EVENT = new Event(App);

const RandomComponent = () => {
    useEvent(MY_EVENT, () => {
        toast("You successfully triggered an Event!");
    });

    return (
        <div>
            <button
                onClick={() => {
                    MY_EVENT.trigger();
                }}
            >
                Trigger Event
            </button>
        </div>
    );
}

render(<RandomComponent/>);
```

### 🟦 Typescript

`useEvent` is almost 100% typesafe.

### 📭 Props

| Prop              | Type                                            | Description                                                                  | Required    | 
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- | ------------|
| `event`           | Event (E)                                       | Event to which the passed callback function gets applied.                    | Yes         | 
| `callback`        | EventCallbackFunction<E['payload']>             | Callback Function that gets applied to the passed Event                      | Yes         | 
| `key`             | string \| number                                | Key/Name of created Observer. Mainly thought for Debugging.                  | No          | 
| `agileInstance`   | Agile                                           | To which Agile Instance the Event get bound. Gets autodetect!                | No          |

### 📄 Return

`useEvent` returns nothing.