---
id: "walletconnectwallet"
title: "Class: WalletConnectWallet"
sidebar_label: "WalletConnectWallet"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `RemoteWallet`<[`WalletConnectSigner`](walletconnectsigner.md)\>

  ↳ **`WalletConnectWallet`**

## Constructors

### constructor

• **new WalletConnectWallet**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`WalletConnectWalletOptions`](../interfaces/walletconnectwalletoptions.md) |

#### Overrides

RemoteWallet&lt;WalletConnectSigner\&gt;.constructor

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:63](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L63)

## Properties

### client

• `Private` `Optional` **client**: `Client`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:60](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L60)

___

### connectOptions

• `Private` **connectOptions**: `ConnectParams`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:58](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L58)

___

### initOptions

• `Private` **initOptions**: `ClientOptions`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:57](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L57)

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

### pairing

• `Private` `Optional` **pairing**: `Settled`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:61](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L61)

___

### pairingProposal

• `Private` `Optional` **pairingProposal**: `Proposal`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:62](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L62)

___

### session

• `Private` `Optional` **session**: `Settled`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:63](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L63)

## Methods

### addSigner

▸ `Protected` **addSigner**(`address`, `signer`): `void`

Adds the account-signer set to the internal map

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |
| `signer` | [`WalletConnectSigner`](walletconnectsigner.md) | Account signer |

#### Returns

`void`

#### Inherited from

RemoteWallet.addSigner

#### Defined in

wallet-base/lib/wallet-base.d.ts:34

___

### close

▸ **close**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:176](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L176)

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

#### Inherited from

RemoteWallet.getAccounts

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:27

___

### getSigner

▸ `Protected` **getSigner**(`address`): [`WalletConnectSigner`](walletconnectsigner.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`WalletConnectSigner`](walletconnectsigner.md)

#### Inherited from

RemoteWallet.getSigner

#### Defined in

wallet-base/lib/wallet-base.d.ts:59

___

### getUri

▸ **getUri**(): `Promise`<`string` \| `void`\>

Get the URI needed for out of band session establishment

#### Returns

`Promise`<`string` \| `void`\>

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:82](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L82)

___

### getWalletConnectClient

▸ `Private` **getWalletConnectClient**(): `Promise`<`Client`\>

Pulled out to allow mocking

#### Returns

`Promise`<`Client`\>

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:75](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L75)

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

▸ **loadAccountSigners**(): `Promise`<`Map`<`string`, [`WalletConnectSigner`](walletconnectsigner.md)\>\>

#### Returns

`Promise`<`Map`<`string`, [`WalletConnectSigner`](walletconnectsigner.md)\>\>

#### Overrides

RemoteWallet.loadAccountSigners

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:147](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L147)

___

### onPairingCreated

▸ **onPairingCreated**(`pairing`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pairing` | `Created`<`State`, `Participant`, `Pick`<`SettledPermissions`, ``"controller"`` \| ``"notifications"`` \| ``"jsonrpc"``\>\> |

#### Returns

`void`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:130](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L130)

___

### onPairingDeleted

▸ **onPairingDeleted**(): `void`

#### Returns

`void`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:142](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L142)

___

### onPairingProposal

▸ **onPairingProposal**(`pairingProposal`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pairingProposal` | `Proposal` |

#### Returns

`void`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:126](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L126)

___

### onPairingUpdated

▸ **onPairingUpdated**(`pairing`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pairing` | `Update` |

#### Returns

`void`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:134](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L134)

___

### onSessionCreated

▸ **onSessionCreated**(`session`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `session` | `Settled` |

#### Returns

`void`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:114](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L114)

___

### onSessionDeleted

▸ **onSessionDeleted**(): `void`

#### Returns

`void`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:121](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L121)

___

### onSessionProposal

▸ **onSessionProposal**(`sessionProposal`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sessionProposal` | `Proposal` |

#### Returns

`void`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:111](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L111)

___

### onSessionUpdated

▸ **onSessionUpdated**(`session`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `session` | `Update` |

#### Returns

`void`

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:118](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L118)

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

#### Overrides

RemoteWallet.signTransaction

#### Defined in

[wallet-walletconnect/src/wc-wallet.ts:170](https://github.com/celo-org/celo-monorepo/tree/master/wc-wallet.ts#L170)

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

#### Inherited from

RemoteWallet.signTypedData

#### Defined in

wallet-remote/lib/remote-wallet.d.ts:49
