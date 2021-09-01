---
id: "rooterror"
title: "Class: RootError<T>"
sidebar_label: "RootError"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `Error`

  ↳ **`RootError`**

  ↳↳ [`JSONParseError`](jsonparseerror.md)

## Implements

- [`BaseError`](../interfaces/baseerror.md)<`T`\>

## Constructors

### constructor

• **new RootError**<`T`\>(`errorType`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorType` | `T` |

#### Overrides

Error.constructor

#### Defined in

[celo-monorepo/packages/sdk/base/src/result.ts:66](https://github.com/celo-org/celo-monorepo/tree/master/result.ts#L66)

## Properties

### errorType

• `Readonly` **errorType**: `T`

#### Implementation of

[BaseError](../interfaces/baseerror.md).[errorType](../interfaces/baseerror.md#errortype)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

celo-monorepo/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

celo-monorepo/node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

celo-monorepo/node_modules/@types/node/globals.d.ts:4
