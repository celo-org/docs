---
id: "runningtask"
title: "Interface: RunningTask"
sidebar_label: "RunningTask"
sidebar_position: 0
custom_edit_url: null
---

Represent a running task that can be stopped

Examples: A poller, a watcher.

## Hierarchy

- **`RunningTask`**

  ↳ [`RunningTaskWithValue`](runningtaskwithvalue.md)

## Methods

### isRunning

▸ **isRunning**(): `boolean`

Indicates wether the task is running

#### Returns

`boolean`

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:13](https://github.com/celo-org/celo-monorepo/tree/master/task.ts#L13)

___

### stop

▸ **stop**(): `void`

Flag task to be stopped. Might not be inmediate

#### Returns

`void`

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:11](https://github.com/celo-org/celo-monorepo/tree/master/task.ts#L11)
