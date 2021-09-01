---
id: "modules"
title: "@celo/explorer"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [BlockExplorer](classes/blockexplorer.md)
- [LogExplorer](classes/logexplorer.md)

## Interfaces

- [CallDetails](interfaces/calldetails.md)
- [ContractDetails](interfaces/contractdetails.md)
- [ParsedBlock](interfaces/parsedblock.md)
- [ParsedTx](interfaces/parsedtx.md)

## Functions

### getContractDetailsFromContract

▸ `Const` **getContractDetailsFromContract**(`kit`, `celoContract`, `address?`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |
| `celoContract` | `CeloContract` |
| `address?` | `string` |

#### Returns

`Promise`<`Object`\>

#### Defined in

[base.ts:11](https://github.com/celo-org/celo-monorepo/tree/master/base.ts#L11)

___

### mapFromPairs

▸ **mapFromPairs**<`A`, `B`\>(`pairs`): `Map`<`A`, `B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `pairs` | [`A`, `B`][] |

#### Returns

`Map`<`A`, `B`\>

#### Defined in

[base.ts:31](https://github.com/celo-org/celo-monorepo/tree/master/base.ts#L31)

___

### newBlockExplorer

▸ **newBlockExplorer**(`kit`): `Promise`<[`BlockExplorer`](classes/blockexplorer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |

#### Returns

`Promise`<[`BlockExplorer`](classes/blockexplorer.md)\>

#### Defined in

[block-explorer.ts:38](https://github.com/celo-org/celo-monorepo/tree/master/block-explorer.ts#L38)

___

### newLogExplorer

▸ **newLogExplorer**(`kit`): `Promise`<[`LogExplorer`](classes/logexplorer.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |

#### Returns

`Promise`<[`LogExplorer`](classes/logexplorer.md)\>

#### Defined in

[log-explorer.ts:10](https://github.com/celo-org/celo-monorepo/tree/master/log-explorer.ts#L10)

___

### obtainKitContractDetails

▸ **obtainKitContractDetails**(`kit`): `Promise`<[`ContractDetails`](interfaces/contractdetails.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |

#### Returns

`Promise`<[`ContractDetails`](interfaces/contractdetails.md)[]\>

#### Defined in

[base.ts:24](https://github.com/celo-org/celo-monorepo/tree/master/base.ts#L24)
