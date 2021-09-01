---
id: "rpcwallet"
title: "Class: RpcWallet"
sidebar_label: "RpcWallet"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `RemoteWallet`<[`RpcSigner`](rpcsigner.md)\>

  ↳ **`RpcWallet`**

## Implements

- `UnlockableWallet`

## Constructors

### constructor

• **new RpcWallet**(`_provider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_provider` | `Provider` |

#### Overrides

RemoteWallet&lt;RpcSigner\&gt;.constructor

#### Defined in

[wallet-rpc/src/rpc-wallet.ts:18](https://github.com/celo-org/celo-monorepo/tree/master/rpc-wallet.ts#L18)

## Properties

### \_provider

• `Protected` **\_provider**: `Provider`

___

### isSetupFinished

• **isSetupFinished**: () => `boolean`

#### Type declaration

▸ (): `boolean`

##### Returns

`boolean`

#### Inherited from

RemoteWallet.isSetupFinished

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:51

___

### rpc

• `Protected` `Readonly` **rpc**: `RpcCaller`

#### Defined in

[wallet-rpc/src/rpc-wallet.ts:18](https://github.com/celo-org/celo-monorepo/tree/master/rpc-wallet.ts#L18)

## Methods

### addAccount

▸ **addAccount**(`privateKey`, `passphrase`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |
| `passphrase` | `string` |

#### Returns

`Promise`<`string`\>

#### Implementation of

UnlockableWallet.addAccount

#### Defined in

[wallet-rpc/src/rpc-wallet.ts:38](https://github.com/celo-org/celo-monorepo/tree/master/rpc-wallet.ts#L38)

___

### addSigner

▸ `Protected` **addSigner**(`address`, `signer`): `void`

Adds the account-signer set to the internal map

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |
| `signer` | [`RpcSigner`](rpcsigner.md) | Account signer |

#### Returns

`void`

#### Inherited from

RemoteWallet.addSigner

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

UnlockableWallet.computeSharedSecret

#### Inherited from

RemoteWallet.computeSharedSecret

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

UnlockableWallet.decrypt

#### Inherited from

RemoteWallet.decrypt

#### Defined in

wallet-base/lib/wallet-base.d.ts:60

___

### getAccounts

▸ **getAccounts**(): `string`[]

Get a list of accounts in the remote wallet

#### Returns

`string`[]

#### Implementation of

UnlockableWallet.getAccounts

#### Inherited from

RemoteWallet.getAccounts

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:27

___

### getSigner

▸ `Protected` **getSigner**(`address`): [`RpcSigner`](rpcsigner.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`RpcSigner`](rpcsigner.md)

#### Inherited from

RemoteWallet.getSigner

#### Defined in

wallet-base/lib/wallet-base.d.ts:59

___

### hasAccount

▸ **hasAccount**(`address?`): `boolean`

Returns true if account is in the remote wallet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address?` | `string` | Account to check |

#### Returns

`boolean`

#### Implementation of

UnlockableWallet.hasAccount

#### Inherited from

RemoteWallet.hasAccount

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:32

___

### init

▸ **init**(): `Promise`<`void`\>

Discovers wallet accounts and caches results in memory
Idempotent to ensure multiple calls are benign

#### Returns

`Promise`<`void`\>

#### Inherited from

RemoteWallet.init

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:15

___

### initializationRequired

▸ `Protected` **initializationRequired**(): `void`

#### Returns

`void`

#### Inherited from

RemoteWallet.initializationRequired

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:50

___

### isAccountUnlocked

▸ **isAccountUnlocked**(`address`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`boolean`

#### Implementation of

UnlockableWallet.isAccountUnlocked

#### Defined in

[wallet-rpc/src/rpc-wallet.ts:54](https://github.com/celo-org/celo-monorepo/tree/master/rpc-wallet.ts#L54)

___

### loadAccountSigners

▸ **loadAccountSigners**(): `Promise`<`Map`<`string`, [`RpcSigner`](rpcsigner.md)\>\>

#### Returns

`Promise`<`Map`<`string`, [`RpcSigner`](rpcsigner.md)\>\>

#### Overrides

RemoteWallet.loadAccountSigners

#### Defined in

[wallet-rpc/src/rpc-wallet.ts:25](https://github.com/celo-org/celo-monorepo/tree/master/rpc-wallet.ts#L25)

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

UnlockableWallet.removeAccount

#### Inherited from

RemoteWallet.removeAccount

#### Defined in

wallet-base/lib/wallet-base.d.ts:23

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

RemoteWallet.removeSigner

#### Defined in

wallet-base/lib/wallet-base.d.ts:39

___

### signPersonalMessage

▸ **signPersonalMessage**(`address`, `data`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the account to sign with |
| `data` | `string` | Hex string message to sign |

#### Returns

`Promise`<`string`\>

Signature hex string (order: rsv)

#### Implementation of

UnlockableWallet.signPersonalMessage

#### Inherited from

RemoteWallet.signPersonalMessage

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:43

___

### signTransaction

▸ **signTransaction**(`txParams`): `Promise`<`EncodedTransaction`\>

Gets the signer based on the 'from' field in the tx body

**`dev`** overrides WalletBase.signTransaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txParams` | `CeloTx` | Transaction to sign |

#### Returns

`Promise`<`EncodedTransaction`\>

#### Implementation of

UnlockableWallet.signTransaction

#### Overrides

RemoteWallet.signTransaction

#### Defined in

[wallet-rpc/src/rpc-wallet.ts:64](https://github.com/celo-org/celo-monorepo/tree/master/rpc-wallet.ts#L64)

___

### signTypedData

▸ **signTypedData**(`address`, `typedData`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address of the account to sign with |
| `typedData` | `EIP712TypedData` | the typed data object |

#### Returns

`Promise`<`string`\>

Signature hex string (order: rsv)

#### Implementation of

UnlockableWallet.signTypedData

#### Inherited from

RemoteWallet.signTypedData

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:49

___

### unlockAccount

▸ **unlockAccount**(`address`, `passphrase`, `duration`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `passphrase` | `string` |
| `duration` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

UnlockableWallet.unlockAccount

#### Defined in

[wallet-rpc/src/rpc-wallet.ts:49](https://github.com/celo-org/celo-monorepo/tree/master/rpc-wallet.ts#L49)
