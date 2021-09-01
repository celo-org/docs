---
id: "logexplorer"
title: "Class: LogExplorer"
sidebar_label: "LogExplorer"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new LogExplorer**(`kit`, `contractDetails`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |
| `contractDetails` | [`ContractDetails`](../interfaces/contractdetails.md)[] |

#### Defined in

[log-explorer.ts:15](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/log-explorer.ts#L15)

## Properties

### contractDetails

• `Readonly` **contractDetails**: [`ContractDetails`](../interfaces/contractdetails.md)[]

## Methods

### fetchTxReceipt

▸ **fetchTxReceipt**(`txhash`): `Promise`<``null`` \| `CeloTxReceipt`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txhash` | `string` |

#### Returns

`Promise`<``null`` \| `CeloTxReceipt`\>

#### Defined in

[log-explorer.ts:47](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/log-explorer.ts#L47)

___

### getKnownLogs

▸ **getKnownLogs**(`tx`): `EventLog`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTxReceipt` |

#### Returns

`EventLog`[]

#### Defined in

[log-explorer.ts:51](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/log-explorer.ts#L51)

___

### tryParseLog

▸ **tryParseLog**(`log`): ``null`` \| `EventLog`

#### Parameters

| Name | Type |
| :------ | :------ |
| `log` | `Log` |

#### Returns

``null`` \| `EventLog`

#### Defined in

[log-explorer.ts:62](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/explorer/src/log-explorer.ts#L62)
