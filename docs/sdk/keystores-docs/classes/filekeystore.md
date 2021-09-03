---
id: "filekeystore"
title: "Class: FileKeystore"
sidebar_label: "FileKeystore"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`KeystoreBase`](keystorebase.md)

  ↳ **`FileKeystore`**

## Constructors

### constructor

• **new FileKeystore**(`keystoreDir`)

Creates (but does not overwrite existing) directory
for containing keystore entries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreDir` | `string` | Path to directory where keystore will be saved |

#### Overrides

[KeystoreBase](keystorebase.md).[constructor](keystorebase.md#constructor)

#### Defined in

[file-keystore.ts:10](https://github.com/celo-org/celo-monorepo/tree/master/file-keystore.ts#L10)

## Methods

### changeKeystorePassphrase

▸ **changeKeystorePassphrase**(`address`, `oldPassphrase`, `newPassphrase`): `Promise`<`void`\>

Change secret phrase used to encrypt the private key of an address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |
| `oldPassphrase` | `string` | Secret phrase used to encrypt the private key |
| `newPassphrase` | `string` | New secret phrase to re-encrypt the private key |

#### Returns

`Promise`<`void`\>

#### Inherited from

[KeystoreBase](keystorebase.md).[changeKeystorePassphrase](keystorebase.md#changekeystorepassphrase)

#### Defined in

[keystore-base.ts:132](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L132)

___

### deleteKeystore

▸ **deleteKeystore**(`address`): `Promise`<`void`\>

Permanently removes keystore entry from keystore

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address of keystore to be deleted |

#### Returns

`Promise`<`void`\>

#### Inherited from

[KeystoreBase](keystorebase.md).[deleteKeystore](keystorebase.md#deletekeystore)

#### Defined in

[keystore-base.ts:145](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L145)

___

### getAddress

▸ **getAddress**(`keystoreName`): `string`

Gets the address corresponding to a particular keystore entry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | Name of keystore entry belonging to the address |

#### Returns

`string`

Account address

#### Inherited from

[KeystoreBase](keystorebase.md).[getAddress](keystorebase.md#getaddress)

#### Defined in

[keystore-base.ts:51](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L51)

___

### getAddressMap

▸ **getAddressMap**(): `Promise`<`Record`<`string`, `string`\>\>

Maps account addresses to their respective keystore entries (names)

#### Returns

`Promise`<`Record`<`string`, `string`\>\>

Record with account addresses as keys, keystore entry names as values

#### Inherited from

[KeystoreBase](keystorebase.md).[getAddressMap](keystorebase.md#getaddressmap)

#### Defined in

[keystore-base.ts:72](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L72)

___

### getAllKeystoreNames

▸ **getAllKeystoreNames**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

List of file names (keystore entries) in the keystore

#### Overrides

[KeystoreBase](keystorebase.md).[getAllKeystoreNames](keystorebase.md#getallkeystorenames)

#### Defined in

[file-keystore.ts:27](https://github.com/celo-org/celo-monorepo/tree/master/file-keystore.ts#L27)

___

### getKeystoreName

▸ **getKeystoreName**(`address`): `Promise`<`string`\>

Gets name of keystore entry corresponding to an address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |

#### Returns

`Promise`<`string`\>

Name of corresponding keystore entry

#### Inherited from

[KeystoreBase](keystorebase.md).[getKeystoreName](keystorebase.md#getkeystorename)

#### Defined in

[keystore-base.ts:106](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L106)

___

### getPrivateKey

▸ **getPrivateKey**(`address`, `passphrase`): `Promise`<`string`\>

Gets decrypted (plaintext) private key for an account address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Account address |
| `passphrase` | `string` | Secret phrase used to encrypt the private key |

#### Returns

`Promise`<`string`\>

#### Inherited from

[KeystoreBase](keystorebase.md).[getPrivateKey](keystorebase.md#getprivatekey)

#### Defined in

[keystore-base.ts:120](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L120)

___

### getRawKeystore

▸ **getRawKeystore**(`keystoreName`): `string`

Gets contents of keystore entry file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | File name of keystore entry |

#### Returns

`string`

V3Keystore string entry

#### Overrides

[KeystoreBase](keystorebase.md).[getRawKeystore](keystorebase.md#getrawkeystore)

#### Defined in

[file-keystore.ts:45](https://github.com/celo-org/celo-monorepo/tree/master/file-keystore.ts#L45)

___

### importPrivateKey

▸ **importPrivateKey**(`privateKey`, `passphrase`): `Promise`<`void`\>

Encrypts and stores a private key as a new keystore entry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `string` | Private key to encrypted |
| `passphrase` | `string` | Secret string to encrypt private key |

#### Returns

`Promise`<`void`\>

#### Inherited from

[KeystoreBase](keystorebase.md).[importPrivateKey](keystorebase.md#importprivatekey)

#### Defined in

[keystore-base.ts:86](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L86)

___

### listKeystoreAddresses

▸ **listKeystoreAddresses**(): `Promise`<`string`[]\>

Gets a list of all account addresses in the keystore

#### Returns

`Promise`<`string`[]\>

List of account address strings

#### Inherited from

[KeystoreBase](keystorebase.md).[listKeystoreAddresses](keystorebase.md#listkeystoreaddresses)

#### Defined in

[keystore-base.ts:64](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L64)

___

### persistKeystore

▸ **persistKeystore**(`keystoreName`, `keystore`): `void`

Saves keystore entries as a file in the keystore directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | File name of keystore entry |
| `keystore` | `string` | V3Keystore string entry |

#### Returns

`void`

#### Overrides

[KeystoreBase](keystorebase.md).[persistKeystore](keystorebase.md#persistkeystore)

#### Defined in

[file-keystore.ts:36](https://github.com/celo-org/celo-monorepo/tree/master/file-keystore.ts#L36)

___

### removeKeystore

▸ **removeKeystore**(`keystoreName`): `void`

Deletes file keystore entry from directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | File name of keystore entry to be removed |

#### Returns

`void`

#### Overrides

[KeystoreBase](keystorebase.md).[removeKeystore](keystorebase.md#removekeystore)

#### Defined in

[file-keystore.ts:53](https://github.com/celo-org/celo-monorepo/tree/master/file-keystore.ts#L53)
