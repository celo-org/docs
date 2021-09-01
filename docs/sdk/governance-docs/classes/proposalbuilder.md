---
id: "proposalbuilder"
title: "Class: ProposalBuilder"
sidebar_label: "ProposalBuilder"
sidebar_position: 0
custom_edit_url: null
---

Builder class to construct proposals from JSON or transaction objects.

## Constructors

### constructor

• **new ProposalBuilder**(`kit`, `builders?`, `registryAdditions?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `kit` | `ContractKit` | `undefined` |
| `builders` | () => `Promise`<`Pick`<`CeloTxPending`, ``"to"`` \| ``"input"`` \| ``"value"``\>\>[] | `[]` |
| `registryAdditions` | `RegistryAdditions` | `{}` |

#### Defined in

[proposals.ts:192](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L192)

## Properties

### registryAdditions

• `Readonly` **registryAdditions**: `RegistryAdditions` = `{}`

## Methods

### addJsonTx

▸ **addJsonTx**(`tx`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`ProposalTransactionJSON`](../interfaces/proposaltransactionjson.md) |

#### Returns

`number`

#### Defined in

[proposals.ts:319](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L319)

___

### addProxyRepointingTx

▸ **addProxyRepointingTx**(`contract`, `newImplementationAddress`): `void`

Adds a transaction to set the implementation on a proxy to the given address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `CeloContract` | Celo contract name of the proxy which should have its implementation set. |
| `newImplementationAddress` | `string` | Address of the new contract implementation. |

#### Returns

`void`

#### Defined in

[proposals.ts:227](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L227)

___

### addTx

▸ **addTx**(`tx`, `params?`): `void`

Adds a Celo transaction to the list for proposal construction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `CeloTransactionObject`<`any`\> | A Celo transaction object to add to the proposal. |
| `params` | `Partial`<`Pick`<`Pick`<`CeloTxPending`, ``"to"`` \| ``"input"`` \| ``"value"``\>, ``"to"`` \| ``"value"``\>\> | Optional parameters for how the transaction should be executed. |

#### Returns

`void`

#### Defined in

[proposals.ts:253](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L253)

___

### addWeb3Tx

▸ **addWeb3Tx**(`tx`, `params`): `number`

Adds a Web3 transaction to the list for proposal construction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `CeloTxObject`<`any`\> | A Web3 transaction object to add to the proposal. |
| `params` | `Pick`<`Pick`<`CeloTxPending`, ``"to"`` \| ``"input"`` \| ``"value"``\>, ``"to"`` \| ``"value"``\> | Parameters for how the transaction should be executed. |

#### Returns

`number`

#### Defined in

[proposals.ts:245](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L245)

___

### build

▸ **build**(): `Promise`<`Pick`<`CeloTxPending`, ``"to"`` \| ``"input"`` \| ``"value"``\>[]\>

Build calls all of the added build steps and returns the final proposal.

#### Returns

`Promise`<`Pick`<`CeloTxPending`, ``"to"`` \| ``"input"`` \| ``"value"``\>[]\>

A constructed Proposal object (i.e. a list of ProposalTransaction)

#### Defined in

[proposals.ts:203](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L203)

___

### fromJsonTx

▸ **fromJsonTx**(`tx`): `Promise`<`Pick`<`CeloTxPending`, ``"to"`` \| ``"input"`` \| ``"value"``\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | [`ProposalTransactionJSON`](../interfaces/proposaltransactionjson.md) |

#### Returns

`Promise`<`Pick`<`CeloTxPending`, ``"to"`` \| ``"input"`` \| ``"value"``\>\>

#### Defined in

[proposals.ts:273](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L273)

___

### fromWeb3tx

▸ **fromWeb3tx**(`tx`, `params`): `Pick`<`CeloTxPending`, ``"to"`` \| ``"input"`` \| ``"value"``\>

Converts a Web3 transaction into a proposal transaction object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `CeloTxObject`<`any`\> | A Web3 transaction object to convert. |
| `params` | `Pick`<`Pick`<`CeloTxPending`, ``"to"`` \| ``"input"`` \| ``"value"``\>, ``"to"`` \| ``"value"``\> | Parameters for how the transaction should be executed. |

#### Returns

`Pick`<`CeloTxPending`, ``"to"`` \| ``"input"`` \| ``"value"``\>

#### Defined in

[proposals.ts:216](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L216)

___

### getRegistryAddition

▸ **getRegistryAddition**(`contract`): `undefined` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `CeloContract` |

#### Returns

`undefined` \| `string`

#### Defined in

[proposals.ts:266](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L266)

___

### isRegistered

▸ **isRegistered**(`contract`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `CeloContract` |

#### Returns

`boolean`

#### Defined in

[proposals.ts:269](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L269)

___

### setRegistryAddition

▸ **setRegistryAddition**(`contract`, `address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | `CeloContract` |
| `address` | `string` |

#### Returns

`string`

#### Defined in

[proposals.ts:263](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L263)
