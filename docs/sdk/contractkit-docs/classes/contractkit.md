---
id: "contractkit"
title: "Class: ContractKit"
sidebar_label: "ContractKit"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ContractKit**(`connection`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |

#### Defined in

[kit.ts:87](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L87)

## Properties

### \_web3Contracts

• `Readonly` **\_web3Contracts**: `Web3ContractCache`

factory for core contract's native web3 wrappers

#### Defined in

[kit.ts:80](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L80)

___

### celoTokens

• `Readonly` **celoTokens**: `CeloTokens`

helper for interacting with CELO & stable tokens

#### Defined in

[kit.ts:84](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L84)

___

### connection

• `Readonly` **connection**: `Connection`

___

### contracts

• `Readonly` **contracts**: `WrapperCache`

factory for core contract's kit wrappers

#### Defined in

[kit.ts:82](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L82)

___

### gasPriceSuggestionMultiplier

• **gasPriceSuggestionMultiplier**: `number` = `5`

#### Defined in

[kit.ts:87](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L87)

___

### registry

• `Readonly` **registry**: `AddressRegistry`

core contract's address registry

#### Defined in

[kit.ts:78](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L78)

## Accessors

### defaultAccount

• `get` **defaultAccount**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[kit.ts:287](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L287)

• `set` **defaultAccount**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |

#### Returns

`void`

#### Defined in

[kit.ts:283](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L283)

___

### defaultFeeCurrency

• `get` **defaultFeeCurrency**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[kit.ts:311](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L311)

• `set` **defaultFeeCurrency**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `undefined` \| `string` |

#### Returns

`void`

#### Defined in

[kit.ts:307](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L307)

___

### gasInflationFactor

• `get` **gasInflationFactor**(): `number`

#### Returns

`number`

#### Defined in

[kit.ts:295](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L295)

• `set` **gasInflationFactor**(`factor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `factor` | `number` |

#### Returns

`void`

#### Defined in

[kit.ts:291](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L291)

___

### gasPrice

• `get` **gasPrice**(): `number`

#### Returns

`number`

#### Defined in

[kit.ts:303](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L303)

• `set` **gasPrice**(`price`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `price` | `number` |

#### Returns

`void`

#### Defined in

[kit.ts:299](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L299)

___

### web3

• `get` **web3**(): `default`

#### Returns

`default`

#### Defined in

[kit.ts:349](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L349)

## Methods

### addAccount

▸ **addAccount**(`privateKey`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |

#### Returns

`void`

#### Defined in

[kit.ts:279](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L279)

___

### fillGasPrice

▸ **fillGasPrice**(`tx`): `Promise`<`CeloTx`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTx` |

#### Returns

`Promise`<`CeloTx`\>

#### Defined in

[kit.ts:323](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L323)

___

### getEpochNumberOfBlock

▸ **getEpochNumberOfBlock**(`blockNumber`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockNumber` | `number` |

#### Returns

`Promise`<`number`\>

#### Defined in

[kit.ts:264](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L264)

___

### getEpochSize

▸ **getEpochSize**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

#### Defined in

[kit.ts:237](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L237)

___

### getFirstBlockNumberForEpoch

▸ **getFirstBlockNumberForEpoch**(`epochNumber`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `epochNumber` | `number` |

#### Returns

`Promise`<`number`\>

#### Defined in

[kit.ts:244](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L244)

___

### getHumanReadableNetworkConfig

▸ **getHumanReadableNetworkConfig**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Defined in

[kit.ts:167](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L167)

___

### getLastBlockNumberForEpoch

▸ **getLastBlockNumberForEpoch**(`epochNumber`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `epochNumber` | `number` |

#### Returns

`Promise`<`number`\>

#### Defined in

[kit.ts:254](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L254)

___

### getNetworkConfig

▸ **getNetworkConfig**(): `Promise`<[`NetworkConfig`](../interfaces/networkconfig.md)\>

#### Returns

`Promise`<[`NetworkConfig`](../interfaces/networkconfig.md)\>

#### Defined in

[kit.ts:117](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L117)

___

### getTotalBalance

▸ **getTotalBalance**(`address`): `Promise`<`AccountBalance`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`AccountBalance`\>

#### Defined in

[kit.ts:100](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L100)

___

### getWallet

▸ **getWallet**(): `undefined` \| `ReadOnlyWallet`

#### Returns

`undefined` \| `ReadOnlyWallet`

#### Defined in

[kit.ts:96](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L96)

___

### isListening

▸ **isListening**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[kit.ts:315](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L315)

___

### isSyncing

▸ **isSyncing**(): `Promise`<`boolean`\>

#### Returns

`Promise`<`boolean`\>

#### Defined in

[kit.ts:319](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L319)

___

### sendTransaction

▸ **sendTransaction**(`tx`): `Promise`<`TransactionResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTx` |

#### Returns

`Promise`<`TransactionResult`\>

#### Defined in

[kit.ts:330](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L330)

___

### sendTransactionObject

▸ **sendTransactionObject**(`txObj`, `tx?`): `Promise`<`TransactionResult`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txObj` | `CeloTxObject`<`any`\> |
| `tx?` | `Pick`<`CeloTx`, ``"feeCurrency"`` \| ``"gatewayFeeRecipient"`` \| ``"gatewayFee"`` \| ``"from"`` \| ``"to"`` \| ``"value"`` \| ``"gas"`` \| ``"gasPrice"`` \| ``"nonce"`` \| ``"chainId"`` \| ``"common"`` \| ``"chain"`` \| ``"hardfork"``\> |

#### Returns

`Promise`<`TransactionResult`\>

#### Defined in

[kit.ts:334](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L334)

___

### setFeeCurrency

▸ **setFeeCurrency**(`tokenContract`): `Promise`<`void`\>

Set CeloToken to use to pay for gas fees

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenContract` | `CeloTokenContract` | CELO (GoldToken) or a supported StableToken contract |

#### Returns

`Promise`<`void`\>

#### Defined in

[kit.ts:218](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L218)

___

### signTypedData

▸ **signTypedData**(`signer`, `typedData`): `Promise`<`Signature`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `string` |
| `typedData` | `EIP712TypedData` |

#### Returns

`Promise`<`Signature`\>

#### Defined in

[kit.ts:341](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L341)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

#### Defined in

[kit.ts:345](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L345)

___

### updateGasPriceInConnectionLayer

▸ **updateGasPriceInConnectionLayer**(`currency`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `currency` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[kit.ts:230](https://github.com/celo-org/celo-monorepo/tree/master/kit.ts#L230)
