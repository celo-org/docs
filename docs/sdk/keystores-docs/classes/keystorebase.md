---
id: "keystorebase"
title: "Class: KeystoreBase"
sidebar_label: "KeystoreBase"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`KeystoreBase`**

  ↳ [`FileKeystore`](filekeystore.md)

  ↳ [`InMemoryKeystore`](inmemorykeystore.md)

## Constructors

### constructor

• **new KeystoreBase**()

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

#### Defined in

[keystore-base.ts:51](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L51)

___

### getAddressMap

▸ **getAddressMap**(): `Promise`<`Record`<`string`, `string`\>\>

Maps account addresses to their respective keystore entries (names)

#### Returns

`Promise`<`Record`<`string`, `string`\>\>

Record with account addresses as keys, keystore entry names as values

#### Defined in

[keystore-base.ts:72](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L72)

___

### getAllKeystoreNames

▸ `Abstract` **getAllKeystoreNames**(): `Promise`<`string`[]\>

Gets a list of the names of each entry in the keystore

#### Returns

`Promise`<`string`[]\>

#### Defined in

[keystore-base.ts:38](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L38)

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

#### Defined in

[keystore-base.ts:120](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L120)

___

### getRawKeystore

▸ `Abstract` **getRawKeystore**(`keystoreName`): `string`

Returns raw encrypted keystore entry string by name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | Name of keystore entry to retrieve |

#### Returns

`string`

#### Defined in

[keystore-base.ts:33](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L33)

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

#### Defined in

[keystore-base.ts:86](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L86)

___

### listKeystoreAddresses

▸ **listKeystoreAddresses**(): `Promise`<`string`[]\>

Gets a list of all account addresses in the keystore

#### Returns

`Promise`<`string`[]\>

List of account address strings

#### Defined in

[keystore-base.ts:64](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L64)

___

### persistKeystore

▸ `Abstract` **persistKeystore**(`keystoreName`, `keystore`): `void`

Saves encrypted keystore entry (i.e. to disk, database, ...). Must be implemented by subclass.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | Name of keystore entry to be saved |
| `keystore` | `string` | encrypted V3Keystore string entry |

#### Returns

`void`

#### Defined in

[keystore-base.ts:27](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L27)

___

### removeKeystore

▸ `Abstract` **removeKeystore**(`keystoreName`): `void`

Removes keystore entry from keystore permanently

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystoreName` | `string` | Name of keystore entry to remove |

#### Returns

`void`

#### Defined in

[keystore-base.ts:44](https://github.com/celo-org/celo-monorepo/tree/master/keystore-base.ts#L44)
