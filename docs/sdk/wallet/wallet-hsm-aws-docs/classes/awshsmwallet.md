---
id: "awshsmwallet"
title: "Class: AwsHsmWallet"
sidebar_label: "AwsHsmWallet"
sidebar_position: 0
custom_edit_url: null
---

A Cloud HSM wallet built on AWS KMS
https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/KMS.html
When using the default credentials, it's expected to set the
aws_access_key_id and aws_secret_access_key in ~/.aws/credentials

## Hierarchy

- `RemoteWallet`<[`AwsHsmSigner`](awshsmsigner.md)\>

  ↳ **`AwsHsmWallet`**

## Implements

- `ReadOnlyWallet`

## Constructors

### constructor

• **new AwsHsmWallet**(`awsCredentials?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `awsCredentials?` | `ClientConfiguration` |

#### Overrides

RemoteWallet&lt;AwsHsmSigner\&gt;.constructor

#### Defined in

[wallet-hsm-aws/src/aws-hsm-wallet.ts:31](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-wallet.ts#L31)

## Properties

### credentials

• `Private` **credentials**: `ClientConfiguration`

#### Defined in

[wallet-hsm-aws/src/aws-hsm-wallet.ts:31](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-wallet.ts#L31)

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

### kms

• `Private` **kms**: `undefined` \| `KMS`

#### Defined in

[wallet-hsm-aws/src/aws-hsm-wallet.ts:30](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-wallet.ts#L30)

## Methods

### addSigner

▸ `Protected` **addSigner**(`address`, `signer`): `void`

Adds the account-signer set to the internal map

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |
| `signer` | [`AwsHsmSigner`](awshsmsigner.md) | Account signer |

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

### generateKmsClient

▸ `Private` **generateKmsClient**(): `KMS`

#### Returns

`KMS`

#### Defined in

[wallet-hsm-aws/src/aws-hsm-wallet.ts:71](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-wallet.ts#L71)

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

### getAddressFromKeyId

▸ **getAddressFromKeyId**(`keyId`): `Promise`<`string`\>

Returns the EVM address for the given key
Useful for initially getting the 'from' field given a keyName

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyId` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[wallet-hsm-aws/src/aws-hsm-wallet.ts:92](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-wallet.ts#L92)

___

### getPublicKeyFromKeyId

▸ `Private` **getPublicKeyFromKeyId**(`keyId`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyId` | `string` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[wallet-hsm-aws/src/aws-hsm-wallet.ts:75](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-wallet.ts#L75)

___

### getSigner

▸ `Protected` **getSigner**(`address`): [`AwsHsmSigner`](awshsmsigner.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`AwsHsmSigner`](awshsmsigner.md)

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

▸ `Protected` **loadAccountSigners**(): `Promise`<`Map`<`string`, [`AwsHsmSigner`](awshsmsigner.md)\>\>

#### Returns

`Promise`<`Map`<`string`, [`AwsHsmSigner`](awshsmsigner.md)\>\>

#### Overrides

RemoteWallet.loadAccountSigners

#### Defined in

[wallet-hsm-aws/src/aws-hsm-wallet.ts:38](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-wallet.ts#L38)

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
