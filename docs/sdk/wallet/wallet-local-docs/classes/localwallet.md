---
id: "localwallet"
title: "Class: LocalWallet"
sidebar_label: "LocalWallet"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `WalletBase`<[`LocalSigner`](localsigner.md)\>

  ↳ **`LocalWallet`**

## Implements

- `Wallet`

## Constructors

### constructor

• **new LocalWallet**()

#### Inherited from

WalletBase<LocalSigner\>.constructor

## Methods

### addAccount

▸ **addAccount**(`privateKey`): `void`

Register the private key as signer account

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `string` | account private key |

#### Returns

`void`

#### Implementation of

Wallet.addAccount

#### Defined in

[wallet-local/src/local-wallet.ts:10](https://github.com/celo-org/celo-monorepo/tree/master/local-wallet.ts#L10)

___

### addSigner

▸ `Protected` **addSigner**(`address`, `signer`): `void`

Adds the account-signer set to the internal map

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |
| `signer` | [`LocalSigner`](localsigner.md) | Account signer |

#### Returns

`void`

#### Inherited from

WalletBase.addSigner

#### Defined in

wallet-base/lib/wallet-base.d.ts:34

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

Wallet.computeSharedSecret

#### Inherited from

WalletBase.computeSharedSecret

#### Defined in

wallet-base/lib/wallet-base.d.ts:64

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

Wallet.decrypt

#### Inherited from

WalletBase.decrypt

#### Defined in

wallet-base/lib/wallet-base.d.ts:60

___

### getAccounts

▸ **getAccounts**(): `string`[]

Gets a list of accounts that have been registered

#### Returns

`string`[]

#### Implementation of

Wallet.getAccounts

#### Inherited from

WalletBase.getAccounts

#### Defined in

wallet-base/lib/wallet-base.d.ts:18

___

### getSigner

▸ `Protected` **getSigner**(`address`): [`LocalSigner`](localsigner.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`LocalSigner`](localsigner.md)

#### Inherited from

WalletBase.getSigner

#### Defined in

wallet-base/lib/wallet-base.d.ts:59

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

Wallet.hasAccount

#### Inherited from

WalletBase.hasAccount

#### Defined in

wallet-base/lib/wallet-base.d.ts:28

___

### removeAccount

▸ **removeAccount**(`address`): `void`

Remove the account

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Adddress of the account to remove |

#### Returns

`void`

#### Implementation of

Wallet.removeAccount

#### Overrides

WalletBase.removeAccount

#### Defined in

[wallet-local/src/local-wallet.ts:24](https://github.com/celo-org/celo-monorepo/tree/master/local-wallet.ts#L24)

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

#### Inherited from

WalletBase.removeSigner

#### Defined in

wallet-base/lib/wallet-base.d.ts:39

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

Wallet.signPersonalMessage

#### Inherited from

WalletBase.signPersonalMessage

#### Defined in

wallet-base/lib/wallet-base.d.ts:51

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

Wallet.signTransaction

#### Inherited from

WalletBase.signTransaction

#### Defined in

wallet-base/lib/wallet-base.d.ts:44

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

Wallet.signTypedData

#### Inherited from

WalletBase.signTypedData

#### Defined in

wallet-base/lib/wallet-base.d.ts:58
