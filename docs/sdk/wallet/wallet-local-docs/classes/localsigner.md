---
id: "localsigner"
title: "Class: LocalSigner"
sidebar_label: "LocalSigner"
sidebar_position: 0
custom_edit_url: null
---

Signs the EVM transaction using the provided private key

## Implements

- `Signer`

## Constructors

### constructor

• **new LocalSigner**(`privateKey`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |

#### Defined in

[wallet-local/src/local-signer.ts:15](https://github.com/celo-org/celo-monorepo/tree/master/local-signer.ts#L15)

## Properties

### privateKey

• `Private` **privateKey**: `string`

#### Defined in

[wallet-local/src/local-signer.ts:15](https://github.com/celo-org/celo-monorepo/tree/master/local-signer.ts#L15)

## Methods

### computeSharedSecret

▸ **computeSharedSecret**(`publicKey`): `Promise`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `string` |

#### Returns

`Promise`<`Buffer`\>

#### Implementation of

Signer.computeSharedSecret

#### Defined in

[wallet-local/src/local-signer.ts:71](https://github.com/celo-org/celo-monorepo/tree/master/local-signer.ts#L71)

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

[wallet-local/src/local-signer.ts:63](https://github.com/celo-org/celo-monorepo/tree/master/local-signer.ts#L63)

___

### getNativeKey

▸ **getNativeKey**(): `string`

#### Returns

`string`

#### Implementation of

Signer.getNativeKey

#### Defined in

[wallet-local/src/local-signer.ts:21](https://github.com/celo-org/celo-monorepo/tree/master/local-signer.ts#L21)

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

[wallet-local/src/local-signer.ts:34](https://github.com/celo-org/celo-monorepo/tree/master/local-signer.ts#L34)

___

### signTransaction

▸ **signTransaction**(`addToV`, `encodedTx`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addToV` | `number` |
| `encodedTx` | `RLPEncodedTx` |

#### Returns

`Promise`<`Object`\>

#### Implementation of

Signer.signTransaction

#### Defined in

[wallet-local/src/local-signer.ts:25](https://github.com/celo-org/celo-monorepo/tree/master/local-signer.ts#L25)

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

[wallet-local/src/local-signer.ts:50](https://github.com/celo-org/celo-monorepo/tree/master/local-signer.ts#L50)
