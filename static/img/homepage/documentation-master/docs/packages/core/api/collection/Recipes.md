---
id: recipes
title: Recipes
sidebar_label: Recipes
slug: /core/collection/recipes
---

:::warning

WIP Section

:::

## How to get all Items from a Collection?

- #### [`getAllItems()`](./Methods.md#getallitems)
  Returns all Items
  ```ts
   MY_COLLECTION.getAllItems(); // Returns '[Item(99), Item(1), Item(2)]'
  ```

- #### [`getAllItemValues()`](./Methods.md#getallitemvalues)
  Returns the values of all Items
  ```ts
   MY_COLLECTION.getAllItemValues(); // Returns (see below)
   /* [
        {id: 99, name: "frank"}, 
        {id: 1, name: "jeff"}, 
        {id: 2, name: "hans"}
      ]
   */
  ```
  
## How to get single Item from Collection?

- #### [`getItem()`](./Methods.md#getitem)
  Returns an Item at a specific `primary Key`
  ```ts
   MY_COLLECTION.getItem(/* primary Key */); // Returns Item at the primary Key
  ```

## How to remove Item from Collection?


## How to add Item to Collection?


## How to update Item in Collection?


## How to store Collection permanently?