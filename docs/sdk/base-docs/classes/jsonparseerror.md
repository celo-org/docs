---
id: "jsonparseerror"
title: "Class: JSONParseError"
sidebar_label: "JSONParseError"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`RootError`](rooterror.md)<`string`\>

  ↳ **`JSONParseError`**

## Constructors

### constructor

• **new JSONParseError**(`error`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Overrides

[RootError](rooterror.md).[constructor](rooterror.md#constructor)

#### Defined in

[celo-monorepo/packages/sdk/base/src/result.ts:79](https://github.com/celo-org/celo-monorepo/tree/master/result.ts#L79)

## Properties

### error

• `Readonly` **error**: `Error`

___

### errorType

• `Readonly` **errorType**: `string`

#### Inherited from

[RootError](rooterror.md).[errorType](rooterror.md#errortype)

___

### message

• **message**: `string`

#### Inherited from

[RootError](rooterror.md).[message](rooterror.md#message)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: `string`

#### Inherited from

[RootError](rooterror.md).[name](rooterror.md#name)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

[RootError](rooterror.md).[stack](rooterror.md#stack)

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

[RootError](rooterror.md).[prepareStackTrace](rooterror.md#preparestacktrace)

#### Defined in

celo-monorepo/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

[RootError](rooterror.md).[stackTraceLimit](rooterror.md#stacktracelimit)

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

[RootError](rooterror.md).[captureStackTrace](rooterror.md#capturestacktrace)

#### Defined in

celo-monorepo/node_modules/@types/node/globals.d.ts:4
