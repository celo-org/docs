---
id: "runningtaskwithvalue"
title: "Interface: RunningTaskWithValue<A>"
sidebar_label: "RunningTaskWithValue"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name |
| :------ |
| `A` |

## Hierarchy

- [`RunningTask`](runningtask.md)

  ↳ **`RunningTaskWithValue`**

## Methods

### isRunning

▸ **isRunning**(): `boolean`

Indicates wether the task is running

#### Returns

`boolean`

#### Inherited from

[RunningTask](runningtask.md).[isRunning](runningtask.md#isrunning)

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:13](https://github.com/celo-org/celo-monorepo/tree/master/task.ts#L13)

___

### onValue

▸ **onValue**(): `Promise`<`A`\>

#### Returns

`Promise`<`A`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:116](https://github.com/celo-org/celo-monorepo/tree/master/task.ts#L116)

___

### stop

▸ **stop**(): `void`

Flag task to be stopped. Might not be inmediate

#### Returns

`void`

#### Inherited from

[RunningTask](runningtask.md).[stop](runningtask.md#stop)

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:11](https://github.com/celo-org/celo-monorepo/tree/master/task.ts#L11)
