---
id: "wallet"
title: "Interface: Wallet"
sidebar_label: "Wallet"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `ReadOnlyWallet`

  ↳ **`Wallet`**

  ↳↳ [`UnlockableWallet`](unlockablewallet.md)

## Properties

### addAccount

• **addAccount**: `addInMemoryAccount` \| `addRemoteAccount`

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:11](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L11)

___

### computeSharedSecret

• **computeSharedSecret**: (`address`: `string`, `publicKey`: `string`) => `Promise`<`Buffer`\>

#### Type declaration

▸ (`address`, `publicKey`): `Promise`<`Buffer`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `publicKey` | `string` |

##### Returns

`Promise`<`Buffer`\>

#### Inherited from

ReadOnlyWallet.computeSharedSecret

#### Defined in

connect/lib/wallet.d.ts:12

___

### decrypt

• **decrypt**: (`address`: `string`, `ciphertext`: `Buffer`) => `Promise`<`Buffer`\>

#### Type declaration

▸ (`address`, `ciphertext`): `Promise`<`Buffer`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `ciphertext` | `Buffer` |

##### Returns

`Promise`<`Buffer`\>

#### Inherited from

ReadOnlyWallet.decrypt

#### Defined in

connect/lib/wallet.d.ts:11

___

### getAccounts

• **getAccounts**: () => `string`[]

#### Type declaration

▸ (): `string`[]

##### Returns

`string`[]

#### Inherited from

ReadOnlyWallet.getAccounts

#### Defined in

connect/lib/wallet.d.ts:5

___

### hasAccount

• **hasAccount**: (`address?`: `string`) => `boolean`

#### Type declaration

▸ (`address?`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `address?` | `string` |

##### Returns

`boolean`

#### Inherited from

ReadOnlyWallet.hasAccount

#### Defined in

connect/lib/wallet.d.ts:7

___

### removeAccount

• **removeAccount**: (`address`: `string`) => `void`

#### Type declaration

▸ (`address`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

##### Returns

`void`

#### Inherited from

ReadOnlyWallet.removeAccount

#### Defined in

connect/lib/wallet.d.ts:6

___

### signPersonalMessage

• **signPersonalMessage**: (`address`: `string`, `data`: `string`) => `Promise`<`string`\>

#### Type declaration

▸ (`address`, `data`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `data` | `string` |

##### Returns

`Promise`<`string`\>

#### Inherited from

ReadOnlyWallet.signPersonalMessage

#### Defined in

connect/lib/wallet.d.ts:10

___

### signTransaction

• **signTransaction**: (`txParams`: `CeloTx`) => `Promise`<`EncodedTransaction`\>

#### Type declaration

▸ (`txParams`): `Promise`<`EncodedTransaction`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `txParams` | `CeloTx` |

##### Returns

`Promise`<`EncodedTransaction`\>

#### Inherited from

ReadOnlyWallet.signTransaction

#### Defined in

connect/lib/wallet.d.ts:8

___

### signTypedData

• **signTypedData**: (`address`: `string`, `typedData`: `EIP712TypedData`) => `Promise`<`string`\>

#### Type declaration

▸ (`address`, `typedData`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `typedData` | `EIP712TypedData` |

##### Returns

`Promise`<`string`\>

#### Inherited from

ReadOnlyWallet.signTypedData

#### Defined in

connect/lib/wallet.d.ts:9
