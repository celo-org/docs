---
id: "retrytaskoptions"
title: "Interface: RetryTaskOptions<A>"
sidebar_label: "RetryTaskOptions"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name |
| :------ |
| `A` |

## Hierarchy

- [`TaskOptions`](taskoptions.md)

  ↳ **`RetryTaskOptions`**

## Properties

### logger

• `Optional` **logger**: [`Logger`](../modules.md#logger)

Logger function

#### Inherited from

[TaskOptions](taskoptions.md).[logger](taskoptions.md#logger)

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:20](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/task.ts#L20)

___

### maxAttemps

• **maxAttemps**: `number`

Maximum number of attemps

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:123](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/task.ts#L123)

___

### name

• **name**: `string`

Name for the task. To be used in logging messages

#### Inherited from

[TaskOptions](taskoptions.md).[name](taskoptions.md#name)

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:18](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/task.ts#L18)

___

### timeInBetweenMS

• **timeInBetweenMS**: `number`

seconds between repetition

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:121](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/task.ts#L121)

___

### tryGetValue

• **tryGetValue**: () => `Promise`<``null`` \| `A`\>

#### Type declaration

▸ (): `Promise`<``null`` \| `A`\>

Function that tries to obtain a value A or returns null

##### Returns

`Promise`<``null`` \| `A`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:125](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/task.ts#L125)
