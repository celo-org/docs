---
id: "ledgerwallet"
title: "Class: LedgerWallet"
sidebar_label: "LedgerWallet"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `RemoteWallet`<[`LedgerSigner`](ledgersigner.md)\>

  ↳ **`LedgerWallet`**

## Implements

- `ReadOnlyWallet`

## Constructors

### constructor

• **new LedgerWallet**(`derivationPathIndexes?`, `baseDerivationPath?`, `transport?`, `ledgerAddressValidation?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `derivationPathIndexes` | `number`[] | number array of "address_index" for the base derivation path. Default: Array[0..9]. Example: [3, 99, 53] will retrieve the derivation paths of [`${baseDerivationPath}/3`, `${baseDerivationPath}/99`, `${baseDerivationPath}/53`] |
| `baseDerivationPath` | `string` | base derivation path. Default: "44'/52752'/0'/0" |
| `transport` | `any` | Transport to connect the ledger device |
| `ledgerAddressValidation` | [`AddressValidation`](../enums/addressvalidation.md) | - |

#### Overrides

RemoteWallet&lt;LedgerSigner\&gt;.constructor

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:45](https://github.com/celo-org/celo-monorepo/tree/master/ledger-wallet.ts#L45)

## Properties

### baseDerivationPath

• `Readonly` **baseDerivationPath**: `string`

___

### derivationPathIndexes

• `Readonly` **derivationPathIndexes**: `number`[]

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

### ledger

• `Private` **ledger**: `any`

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:45](https://github.com/celo-org/celo-monorepo/tree/master/ledger-wallet.ts#L45)

___

### ledgerAddressValidation

• `Readonly` **ledgerAddressValidation**: [`AddressValidation`](../enums/addressvalidation.md)

___

### transport

• `Readonly` **transport**: `any` = `{}`

## Methods

### addSigner

▸ `Protected` **addSigner**(`address`, `signer`): `void`

Adds the account-signer set to the internal map

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |
| `signer` | [`LedgerSigner`](ledgersigner.md) | Account signer |

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

ReadOnlyWallet.computeSharedSecret

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

ReadOnlyWallet.decrypt

#### Inherited from

RemoteWallet.decrypt

#### Defined in

wallet-base/lib/wallet-base.d.ts:60

___

### generateNewLedger

▸ `Private` **generateNewLedger**(`transport`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transport` | `any` |

#### Returns

`any`

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:88](https://github.com/celo-org/celo-monorepo/tree/master/ledger-wallet.ts#L88)

___

### getAccounts

▸ **getAccounts**(): `string`[]

Get a list of accounts in the remote wallet

#### Returns

`string`[]

#### Implementation of

ReadOnlyWallet.getAccounts

#### Inherited from

RemoteWallet.getAccounts

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:27

___

### getSigner

▸ `Protected` **getSigner**(`address`): [`LedgerSigner`](ledgersigner.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`LedgerSigner`](ledgersigner.md)

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

ReadOnlyWallet.hasAccount

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

### loadAccountSigners

▸ `Protected` **loadAccountSigners**(): `Promise`<`Map`<`string`, [`LedgerSigner`](ledgersigner.md)\>\>

#### Returns

`Promise`<`Map`<`string`, [`LedgerSigner`](ledgersigner.md)\>\>

#### Overrides

RemoteWallet.loadAccountSigners

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:70](https://github.com/celo-org/celo-monorepo/tree/master/ledger-wallet.ts#L70)

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

### retrieveAccounts

▸ `Private` **retrieveAccounts**(): `Promise`<`Map`<`string`, [`LedgerSigner`](ledgersigner.md)\>\>

#### Returns

`Promise`<`Map`<`string`, [`LedgerSigner`](ledgersigner.md)\>\>

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:92](https://github.com/celo-org/celo-monorepo/tree/master/ledger-wallet.ts#L92)

___

### retrieveAppConfiguration

▸ `Private` **retrieveAppConfiguration**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:114](https://github.com/celo-org/celo-monorepo/tree/master/ledger-wallet.ts#L114)

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

#### Inherited from

RemoteWallet.signPersonalMessage

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:43

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

#### Inherited from

RemoteWallet.signTransaction

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:37

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

#### Inherited from

RemoteWallet.signTypedData

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:49
