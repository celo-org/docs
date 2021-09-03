---
id: "walletbase"
title: "Class: WalletBase<TSigner>"
sidebar_label: "WalletBase"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `TSigner` | extends `Signer` |

## Implements

- `ReadOnlyWallet`

## Constructors

### constructor

• **new WalletBase**<`TSigner`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSigner` | extends `Signer` |

## Properties

### accountSigners

• `Private` **accountSigners**: `Map`<`string`, `TSigner`\>

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:22](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L22)

## Methods

### addSigner

▸ `Protected` **addSigner**(`address`, `signer`): `void`

Adds the account-signer set to the internal map

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |
| `signer` | `TSigner` | Account signer |

#### Returns

`void`

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:57](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L57)

___

### computeSharedSecret

▸ **computeSharedSecret**(`address`, `publicKey`): `Promise`<`Buffer`\>

Computes the shared secret (an ECDH key exchange object) between two accounts

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `publicKey` | `string` |

#### Returns

`Promise`<`Buffer`\>

#### Implementation of

ReadOnlyWallet.computeSharedSecret

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:140](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L140)

___

### decrypt

▸ **decrypt**(`address`, `ciphertext`): `Promise`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `ciphertext` | `Buffer` |

#### Returns

`Promise`<`Buffer`\>

#### Implementation of

ReadOnlyWallet.decrypt

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:132](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L132)

___

### getAccounts

▸ **getAccounts**(): `string`[]

Gets a list of accounts that have been registered

#### Returns

`string`[]

#### Implementation of

ReadOnlyWallet.getAccounts

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:27](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L27)

___

### getSigner

▸ `Protected` **getSigner**(`address`): `TSigner`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`TSigner`

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:124](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L124)

___

### hasAccount

▸ **hasAccount**(`address?`): `boolean`

Returns true if account has been registered

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address?` | `string` | Account to check |

#### Returns

`boolean`

#### Implementation of

ReadOnlyWallet.hasAccount

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:43](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L43)

___

### removeAccount

▸ **removeAccount**(`_address`): `void`

Removes the account with the given address. Needs to be implemented by subclass, otherwise throws error

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | `string` |

#### Returns

`void`

#### Implementation of

ReadOnlyWallet.removeAccount

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:35](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L35)

___

### removeSigner

▸ `Protected` **removeSigner**(`address`): `void`

Removes the account-signer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |

#### Returns

`void`

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:66](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L66)

___

### signPersonalMessage

▸ **signPersonalMessage**(`address`, `data`): `Promise`<`string`\>

Sign a personal Ethereum signed message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the account to sign with |
| `data` | `string` | Hex string message to sign |

#### Returns

`Promise`<`string`\>

Signature hex string (order: rsv)

#### Implementation of

ReadOnlyWallet.signPersonalMessage

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:96](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L96)

___

### signTransaction

▸ **signTransaction**(`txParams`): `Promise`<`EncodedTransaction`\>

Gets the signer based on the 'from' field in the tx body

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txParams` | `CeloTx` | Transaction to sign |

#### Returns

`Promise`<`EncodedTransaction`\>

#### Implementation of

ReadOnlyWallet.signTransaction

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:75](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L75)

___

### signTypedData

▸ **signTypedData**(`address`, `typedData`): `Promise`<`string`\>

Sign an EIP712 Typed Data message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the account to sign with |
| `typedData` | `EIP712TypedData` | the typed data object |

#### Returns

`Promise`<`string`\>

Signature hex string (order: rsv)

#### Implementation of

ReadOnlyWallet.signTypedData

#### Defined in

[wallets/wallet-base/src/wallet-base.ts:113](https://github.com/celo-org/celo-monorepo/tree/master/wallet-base.ts#L113)
