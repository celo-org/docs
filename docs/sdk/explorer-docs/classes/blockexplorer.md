---
id: "blockexplorer"
title: "Class: BlockExplorer"
sidebar_label: "BlockExplorer"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new BlockExplorer**(`kit`, `contractDetails`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |
| `contractDetails` | [`ContractDetails`](../interfaces/contractdetails.md)[] |

#### Defined in

[block-explorer.ts:52](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/block-explorer.ts#L52)

## Properties

### contractDetails

• `Readonly` **contractDetails**: [`ContractDetails`](../interfaces/contractdetails.md)[]

## Methods

### fetchBlock

▸ **fetchBlock**(`blockNumber`): `Promise`<`Block`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber` | `number` |

#### Returns

`Promise`<`Block`\>

#### Defined in

[block-explorer.ts:68](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/block-explorer.ts#L68)

___

### fetchBlockByHash

▸ **fetchBlockByHash**(`blockHash`): `Promise`<`Block`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockHash` | `string` |

#### Returns

`Promise`<`Block`\>

#### Defined in

[block-explorer.ts:65](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/block-explorer.ts#L65)

___

### fetchBlockRange

▸ **fetchBlockRange**(`from`, `to`): `Promise`<`Block`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `number` |
| `to` | `number` |

#### Returns

`Promise`<`Block`[]\>

#### Defined in

[block-explorer.ts:72](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/block-explorer.ts#L72)

___

### getContractMethodAbi

▸ **getContractMethodAbi**(`address`, `callSignature`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `callSignature` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `abi` | `undefined` \| `ABIDefinition` |
| `contract` | `undefined` \| `string` |

#### Defined in

[block-explorer.ts:109](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/block-explorer.ts#L109)

___

### parseBlock

▸ **parseBlock**(`block`): `Promise`<[`ParsedBlock`](../interfaces/parsedblock.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | `Block` |

#### Returns

`Promise`<[`ParsedBlock`](../interfaces/parsedblock.md)\>

#### Defined in

[block-explorer.ts:80](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/block-explorer.ts#L80)

___

### tryParseTx

▸ **tryParseTx**(`tx`): `Promise`<``null`` \| [`ParsedTx`](../interfaces/parsedtx.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTxPending` |

#### Returns

`Promise`<``null`` \| [`ParsedTx`](../interfaces/parsedtx.md)\>

#### Defined in

[block-explorer.ts:97](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/block-explorer.ts#L97)

___

### tryParseTxInput

▸ **tryParseTxInput**(`address`, `input`): `Promise`<``null`` \| [`CallDetails`](../interfaces/calldetails.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `input` | `string` |

#### Returns

`Promise`<``null`` \| [`CallDetails`](../interfaces/calldetails.md)\>

#### Defined in

[block-explorer.ts:117](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/block-explorer.ts#L117)

___

### updateContractDetailsMapping

▸ **updateContractDetailsMapping**(`name`, `address`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `CeloContract` |
| `address` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[block-explorer.ts:60](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/block-explorer.ts#L60)
