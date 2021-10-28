---
id: persisting-data
title: Persisting Data
sidebar_label: Persisting Data
slug: /core/persisting-data
---

It's common for applications to store data on the client browser.
AgileTs makes it pretty easy to achieve such goal.
```ts
MY_STATE.persist('storage-key-here');
```
Besides [States](../state/Introduction.md), we can persist nearly any [Agile Sub Instance](../../../../main/Introduction.md#agile-sub-instance).
- [Collections](../collection/Introduction.md)
  ```ts
  MY_COLLECTION.persist('storage-key-here');
  ```
- [Selectors](../collection/selector/Introduction.md)
  ```ts
  MY_SELECTOR.persist('storage-key-here');
  ```
- [Groups](../collection/group/Introduction.md)
  ```ts
  MY_GROUP.persist('storage-key-here');
  ```
  
Since many [Agile Sub Instance](../../../../main/Introduction.md#agile-sub-instance) can be persisted, 
we use `AgilePersistInstance` and `MY_INSTANCE` as word placeholder for them.

## 💻 Web
In a web environment, it is common to use the [Local Storage](https://www.w3schools.com/html/html5_webstorage.asp) to store values permanently.
AgileTs has set up the Local Storage by default.
```ts {1}
const storageManager = createStorageManager({ localStorage: false });
assignSharedStorageManager(storageManager);
```
Therefore, we can use the `persist()` method out of the box.

## 📱 Mobile
Since the Local Storage doesn't exist in a mobile environment,
we have to resort to an alternative, such as the [Async Storage](https://reactnative.dev/docs/asyncstorage).
AgileTs hasn't set up the Async Storage by default.
Therefore, we need to create a [Storage](../storage/Introduction.md) Interface representing the Async Storage
and register it to AgileTs.
```ts {3-9}
storageManager.registerStorage(
  createStorage({
    key: "AsyncStorage",
    async: true,
    methods: {
      get: AsyncStorage.getItem,
      set: AsyncStorage.setItem,
      remove: AsyncStorage.removeItem,
    },
  }), {default: true} // Tells AgileTs that it is the default Storage
);
```

## 🔑 Local Storage Key
Thus AgileTs can access and identify the stored value in the appropriate Storage,
we have to define a unique `storageKey`.
There are several ways to provide such required `storageKey` to the `persist()` method.

- **1.** Assign a unique key to the AgilePersistInstance itself.
  Because if no key is given to the `persist()` method,
  it takes the AgilePersistInstance key as `storageKey`.
  ```ts {2}
  MY_INSTANCE.key = "myCoolKey";
  MY_INSTANCE.persist(); // Success (storageKey = 'myCoolKey')
  ```
- **2.** Pass the `storageKey` directly into the `persist()` method.
  ```ts {1}
  MY_INSTANCE.persist("myCoolPassedKey"); // Success (storageKey = 'myCoolPassedKey')
  ```

If AgileTs couldn't find any fitting `storageKey`,
it throws an error and doesn't persist the AgilePersistInstance `value`.
```ts {2}
MY_INSTANCE.key = undefined;
MY_INSTANCE.persist(); // Error
```

## 💾 `default` Storage
In AgileTs we can register `multipe` Storages. However only one of these Storages can be the `default` Storage.
The `default` Storage is used by the `persist()` method whenever no specific Storage is defined.
```ts {1}
MY_INSTANCE.persist(); // persist in default Storage
MY_INSTANCE.persist({
  storageKeys: ["storageA"]
}); // persist in Storage called 'storageA'
```

## 📝 Multiple Storages
Sometimes we may store AgilePersistInstances in different Storages.
For example, _AgilePersistInstance A_ should be stored in _Storage B_, and _AgilePersistInstance B_ should be stored in _Storage A_.
Then, we can define with `storageKeys` in which specific Storage the AgilePersistInstance `value` should be persisted.
```ts {2}
MY_INSTANCE.persist({
  storageKeys: ["myCustomStorage"]
});
```
By default, the AgilePersistInstance will be stored in the [default Storage](#-default-storage).
```ts
storageManager.config.defaultStorageKey; // Returns key of current default Storage
```
