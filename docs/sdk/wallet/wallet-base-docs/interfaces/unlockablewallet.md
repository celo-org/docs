---
id: "unlockablewallet"
title: "Interface: UnlockableWallet"
sidebar_label: "UnlockableWallet"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Wallet`](wallet.md)

  ↳ **`UnlockableWallet`**

## Properties

### addAccount

• **addAccount**: `addInMemoryAccount` \| `addRemoteAccount`

#### Inherited from

[Wallet](wallet.md).[addAccount](wallet.md#addaccount)

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

[Wallet](wallet.md).[computeSharedSecret](wallet.md#computesharedsecret)

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

[Wallet](wallet.md).[decrypt](wallet.md#decrypt)

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

[Wallet](wallet.md).[getAccounts](wallet.md#getaccounts)

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

[Wallet](wallet.md).[hasAccount](wallet.md#hasaccount)

#### Defined in

connect/lib/wallet.d.ts:7

___

### isAccountUnlocked

• **isAccountUnlocked**: (`address`: `string`) => `boolean`

#### Type declaration

▸ (`address`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

##### Returns

`boolean`

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:16](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L16)

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

[Wallet](wallet.md).[removeAccount](wallet.md#removeaccount)

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

[Wallet](wallet.md).[signPersonalMessage](wallet.md#signpersonalmessage)

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

[Wallet](wallet.md).[signTransaction](wallet.md#signtransaction)

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

[Wallet](wallet.md).[signTypedData](wallet.md#signtypeddata)

#### Defined in

connect/lib/wallet.d.ts:9

___

### unlockAccount

• **unlockAccount**: (`address`: `string`, `passphrase`: `string`, `duration`: `number`) => `Promise`<`boolean`\>

#### Type declaration

▸ (`address`, `passphrase`, `duration`): `Promise`<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `passphrase` | `string` |
| `duration` | `number` |

##### Returns

`Promise`<`boolean`\>

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:15](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L15)
