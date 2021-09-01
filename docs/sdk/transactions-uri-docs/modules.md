---
id: "modules"
title: "@celo/transactions-uri"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Functions

### QrFromUri

▸ **QrFromUri**(`uri`, `type`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |
| `type` | ``"svg"`` \| ``"terminal"`` \| ``"utf8"`` |

#### Returns

`Promise`<`string`\>

#### Defined in

[tx-uri.ts:114](https://github.com/celo-org/celo-monorepo/tree/master/tx-uri.ts#L114)

___

### buildUri

▸ **buildUri**(`tx`, `functionName?`, `abiTypes?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tx` | `CeloTx` | `undefined` |
| `functionName?` | `string` | `undefined` |
| `abiTypes` | `string`[] | `[]` |

#### Returns

`string`

#### Defined in

[tx-uri.ts:65](https://github.com/celo-org/celo-monorepo/tree/master/tx-uri.ts#L65)

___

### parseUri

▸ **parseUri**(`uri`): `CeloTx`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`CeloTx`

#### Defined in

[tx-uri.ts:26](https://github.com/celo-org/celo-monorepo/tree/master/tx-uri.ts#L26)
