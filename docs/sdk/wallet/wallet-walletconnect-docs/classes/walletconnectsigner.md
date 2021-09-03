---
id: "walletconnectsigner"
title: "Class: WalletConnectSigner"
sidebar_label: "WalletConnectSigner"
sidebar_position: 0
custom_edit_url: null
---

Implements the signer interface on top of the WalletConnect interface.

## Implements

- `Signer`

## Constructors

### constructor

• **new WalletConnectSigner**(`client`, `session`, `account`, `chainId`)

Construct a new instance of a WalletConnectSigner

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | `Client` |
| `session` | `Settled` |
| `account` | `string` |
| `chainId` | `string` |

#### Defined in

[wallet-walletconnect/src/wc-signer.ts:11](https://github.com/celo-org/celo-monorepo/tree/master/wc-signer.ts#L11)

## Properties

### account

• `Protected` **account**: `string`

___

### chainId

• `Protected` **chainId**: `string`

___

### client

• `Protected` **client**: `Client`

___

### session

• `Protected` **session**: `Settled`

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

[wallet-walletconnect/src/wc-signer.ts:61](https://github.com/celo-org/celo-monorepo/tree/master/wc-signer.ts#L61)

___

### decrypt

▸ **decrypt**(`data`): `Promise`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Buffer` |

#### Returns

`Promise`<`Buffer`\>

#### Implementation of

Signer.decrypt

#### Defined in

[wallet-walletconnect/src/wc-signer.ts:56](https://github.com/celo-org/celo-monorepo/tree/master/wc-signer.ts#L56)

___

### getNativeKey

▸ **getNativeKey**(): `string`

#### Returns

`string`

#### Implementation of

Signer.getNativeKey

#### Defined in

[wallet-walletconnect/src/wc-signer.ts:54](https://github.com/celo-org/celo-monorepo/tree/master/wc-signer.ts#L54)

___

### request

▸ `Private` **request**(`method`, `params`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | [`SupportedMethods`](../enums/supportedmethods.md) |
| `params` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[wallet-walletconnect/src/wc-signer.ts:26](https://github.com/celo-org/celo-monorepo/tree/master/wc-signer.ts#L26)

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

[wallet-walletconnect/src/wc-signer.ts:49](https://github.com/celo-org/celo-monorepo/tree/master/wc-signer.ts#L49)

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

[wallet-walletconnect/src/wc-signer.ts:37](https://github.com/celo-org/celo-monorepo/tree/master/wc-signer.ts#L37)

___

### signTransaction

▸ **signTransaction**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Implementation of

Signer.signTransaction

#### Defined in

[wallet-walletconnect/src/wc-signer.ts:22](https://github.com/celo-org/celo-monorepo/tree/master/wc-signer.ts#L22)

___

### signTypedData

▸ **signTypedData**(`data`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `EIP712TypedData` |

#### Returns

`Promise`<`Object`\>

#### Implementation of

Signer.signTypedData

#### Defined in

[wallet-walletconnect/src/wc-signer.ts:41](https://github.com/celo-org/celo-monorepo/tree/master/wc-signer.ts#L41)
