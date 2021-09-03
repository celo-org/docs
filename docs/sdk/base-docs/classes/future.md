---
id: "future"
title: "Class: Future<T>"
sidebar_label: "Future"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name |
| :------ |
| `T` |

## Constructors

### constructor

• **new Future**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[celo-monorepo/packages/sdk/base/src/future.ts:7](https://github.com/celo-org/celo-monorepo/tree/master/future.ts#L7)

## Accessors

### error

• `get` **error**(): `any`

#### Returns

`any`

#### Defined in

[celo-monorepo/packages/sdk/base/src/future.ts:20](https://github.com/celo-org/celo-monorepo/tree/master/future.ts#L20)

___

### finished

• `get` **finished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[celo-monorepo/packages/sdk/base/src/future.ts:16](https://github.com/celo-org/celo-monorepo/tree/master/future.ts#L16)

## Methods

### asPromise

▸ **asPromise**(): `Promise`<`T`\>

#### Returns

`Promise`<`T`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/future.ts:40](https://github.com/celo-org/celo-monorepo/tree/master/future.ts#L40)

___

### reject

▸ **reject**(`error`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

`void`

#### Defined in

[celo-monorepo/packages/sdk/base/src/future.ts:30](https://github.com/celo-org/celo-monorepo/tree/master/future.ts#L30)

___

### resolve

▸ **resolve**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Defined in

[celo-monorepo/packages/sdk/base/src/future.ts:24](https://github.com/celo-org/celo-monorepo/tree/master/future.ts#L24)

___

### wait

▸ **wait**(): `Promise`<`T`\>

#### Returns

`Promise`<`T`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/future.ts:36](https://github.com/celo-org/celo-monorepo/tree/master/future.ts#L36)
