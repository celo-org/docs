---
id: "rpcsigner"
title: "Class: RpcSigner"
sidebar_label: "RpcSigner"
sidebar_position: 0
custom_edit_url: null
---

Implements the signer interface on top of the JSON-RPC interface.

## Implements

- `Signer`

## Constructors

### constructor

• **new RpcSigner**(`rpc`, `account`, `unlockBufferSeconds?`, `unlockTime?`, `unlockDuration?`)

Construct a new instance of the RPC signer

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `rpc` | `RpcCaller` | `undefined` | RPC caller instance |
| `account` | `string` | `undefined` | Account address derived from the private key to be called in init |
| `unlockBufferSeconds` | `number` | `5` | Number of seconds to shrink the unlocked duration by to account for latency and timing inconsistencies on the node |
| `unlockTime?` | `number` | `undefined` | Timestamp in seconds when the signer was last unlocked |
| `unlockDuration?` | `number` | `undefined` | Number of seconds that the signer was last unlocked for |

#### Defined in

[wallet-rpc/src/rpc-signer.ts:54](https://github.com/celo-org/celo-monorepo/tree/master/rpc-signer.ts#L54)

## Properties

### account

• `Protected` **account**: `string`

___

### rpc

• `Protected` **rpc**: `RpcCaller`

___

### unlockBufferSeconds

• `Protected` **unlockBufferSeconds**: `number` = `5`

___

### unlockDuration

• `Protected` `Optional` **unlockDuration**: `number`

___

### unlockTime

• `Protected` `Optional` **unlockTime**: `number`

## Methods

### callAndCheckResponse

▸ `Private` **callAndCheckResponse**<`T`\>(`endpoint`, `params`): `Promise`<`RpcSignerEndpointResult`[`T`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `RpcSignerEndpoint` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoint` | `T` |
| `params` | `RpcSignerEndpointInputs`[`T`] |

#### Returns

`Promise`<`RpcSignerEndpointResult`[`T`]\>

#### Defined in

[wallet-rpc/src/rpc-signer.ts:149](https://github.com/celo-org/celo-monorepo/tree/master/rpc-signer.ts#L149)

___

### computeSharedSecret

▸ **computeSharedSecret**(`_publicKey`): `Promise`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_publicKey` | `string` |

#### Returns

`Promise`<`Buffer`\>

#### Implementation of

Signer.computeSharedSecret

#### Defined in

[wallet-rpc/src/rpc-signer.ts:169](https://github.com/celo-org/celo-monorepo/tree/master/rpc-signer.ts#L169)

___

### decrypt

▸ **decrypt**(`ciphertext`): `Promise`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ciphertext` | `Buffer` |

#### Returns

`Promise`<`Buffer`\>

#### Implementation of

Signer.decrypt

#### Defined in

[wallet-rpc/src/rpc-signer.ts:160](https://github.com/celo-org/celo-monorepo/tree/master/rpc-signer.ts#L160)

___

### getNativeKey

▸ **getNativeKey**(): `string`

#### Returns

`string`

#### Implementation of

Signer.getNativeKey

#### Defined in

[wallet-rpc/src/rpc-signer.ts:118](https://github.com/celo-org/celo-monorepo/tree/master/rpc-signer.ts#L118)

___

### init

▸ **init**(`privateKey`, `passphrase`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |
| `passphrase` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[wallet-rpc/src/rpc-signer.ts:74](https://github.com/celo-org/celo-monorepo/tree/master/rpc-signer.ts#L74)

___

### isUnlocked

▸ **isUnlocked**(): `boolean`

#### Returns

`boolean`

#### Defined in

[wallet-rpc/src/rpc-signer.ts:142](https://github.com/celo-org/celo-monorepo/tree/master/rpc-signer.ts#L142)

___

### signPersonalMessage

▸ **signPersonalMessage**(`data`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Promise`<`Object`\>

#### Implementation of

Signer.signPersonalMessage

#### Defined in

[wallet-rpc/src/rpc-signer.ts:110](https://github.com/celo-org/celo-monorepo/tree/master/rpc-signer.ts#L110)

___

### signRawTransaction

▸ **signRawTransaction**(`tx`): `Promise`<`EncodedTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTx` |

#### Returns

`Promise`<`EncodedTransaction`\>

#### Defined in

[wallet-rpc/src/rpc-signer.ts:80](https://github.com/celo-org/celo-monorepo/tree/master/rpc-signer.ts#L80)

___

### signTransaction

▸ **signTransaction**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Implementation of

Signer.signTransaction

#### Defined in

[wallet-rpc/src/rpc-signer.ts:97](https://github.com/celo-org/celo-monorepo/tree/master/rpc-signer.ts#L97)

___

### signTypedData

▸ **signTypedData**(`typedData`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | `EIP712TypedData` |

#### Returns

`Promise`<`Object`\>

#### Implementation of

Signer.signTypedData

#### Defined in

[wallet-rpc/src/rpc-signer.ts:101](https://github.com/celo-org/celo-monorepo/tree/master/rpc-signer.ts#L101)

___

### unlock

▸ **unlock**(`passphrase`, `duration`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `passphrase` | `string` |
| `duration` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[wallet-rpc/src/rpc-signer.ts:120](https://github.com/celo-org/celo-monorepo/tree/master/rpc-signer.ts#L120)
