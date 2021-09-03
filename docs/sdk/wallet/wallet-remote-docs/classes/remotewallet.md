---
id: "remotewallet"
title: "Class: RemoteWallet<TSigner>"
sidebar_label: "RemoteWallet"
sidebar_position: 0
custom_edit_url: null
---

Abstract class representing a remote wallet that requires async initialization

## Type parameters

| Name | Type |
| :------ | :------ |
| `TSigner` | extends `Signer` |

## Hierarchy

- `WalletBase`<`TSigner`\>

  ↳ **`RemoteWallet`**

## Implements

- `ReadOnlyWallet`

## Constructors

### constructor

• **new RemoteWallet**<`TSigner`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSigner` | extends `Signer` |

#### Inherited from

WalletBase<TSigner\>.constructor

## Properties

### INIT\_TIMEOUT\_IN\_MS

• `Private` **INIT\_TIMEOUT\_IN\_MS**: `number`

#### Defined in

[wallet-remote/src/remote-wallet.ts:14](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L14)

___

### setupFinished

• `Private` **setupFinished**: `boolean` = `false`

#### Defined in

[wallet-remote/src/remote-wallet.ts:12](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L12)

___

### setupLocked

• `Private` **setupLocked**: `boolean` = `false`

#### Defined in

[wallet-remote/src/remote-wallet.ts:13](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L13)

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

ReadOnlyWallet.computeSharedSecret

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

ReadOnlyWallet.decrypt

#### Inherited from

WalletBase.decrypt

#### Defined in

wallet-base/lib/wallet-base.d.ts:60

___

### getAccounts

▸ **getAccounts**(): `string`[]

Get a list of accounts in the remote wallet

#### Returns

`string`[]

#### Implementation of

ReadOnlyWallet.getAccounts

#### Overrides

WalletBase.getAccounts

#### Defined in

[wallet-remote/src/remote-wallet.ts:61](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L61)

___

### getSigner

▸ `Protected` **getSigner**(`address`): `TSigner`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`TSigner`

#### Inherited from

WalletBase.getSigner

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

ReadOnlyWallet.hasAccount

#### Overrides

WalletBase.hasAccount

#### Defined in

[wallet-remote/src/remote-wallet.ts:70](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L70)

___

### init

▸ **init**(): `Promise`<`void`\>

Discovers wallet accounts and caches results in memory
Idempotent to ensure multiple calls are benign

#### Returns

`Promise`<`void`\>

#### Defined in

[wallet-remote/src/remote-wallet.ts:20](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L20)

___

### initCompleted

▸ `Private` **initCompleted**(): `Promise`<`void`\>

Monitor the initialization state until it reaches completion or time out

#### Returns

`Promise`<`void`\>

#### Defined in

[wallet-remote/src/remote-wallet.ts:40](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L40)

___

### initializationRequired

▸ `Protected` **initializationRequired**(): `void`

#### Returns

`void`

#### Defined in

[wallet-remote/src/remote-wallet.ts:104](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L104)

___

### isSetupFinished

▸ **isSetupFinished**(): `boolean`

#### Returns

`boolean`

#### Defined in

[wallet-remote/src/remote-wallet.ts:110](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L110)

___

### loadAccountSigners

▸ `Protected` `Abstract` **loadAccountSigners**(): `Promise`<`Map`<`string`, `TSigner`\>\>

Discover accounts and store mapping in accountSigners

#### Returns

`Promise`<`Map`<`string`, `TSigner`\>\>

#### Defined in

[wallet-remote/src/remote-wallet.ts:56](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L56)

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

#### Inherited from

WalletBase.removeAccount

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

WalletBase.removeSigner

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

ReadOnlyWallet.signPersonalMessage

#### Overrides

WalletBase.signPersonalMessage

#### Defined in

[wallet-remote/src/remote-wallet.ts:89](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L89)

___

### signTransaction

▸ **signTransaction**(`txParams`): `Promise`<`EncodedTransaction`\>

Signs the EVM transaction using the signer pulled from the from field

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txParams` | `CeloTx` | EVM transaction |

#### Returns

`Promise`<`EncodedTransaction`\>

#### Implementation of

ReadOnlyWallet.signTransaction

#### Overrides

WalletBase.signTransaction

#### Defined in

[wallet-remote/src/remote-wallet.ts:79](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L79)

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

ReadOnlyWallet.signTypedData

#### Overrides

WalletBase.signTypedData

#### Defined in

[wallet-remote/src/remote-wallet.ts:99](https://github.com/celo-org/celo-monorepo/tree/master/remote-wallet.ts#L99)
