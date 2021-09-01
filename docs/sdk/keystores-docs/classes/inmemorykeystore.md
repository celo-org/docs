---
id: "inmemorykeystore"
title: "Class: InMemoryKeystore"
sidebar_label: "InMemoryKeystore"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`KeystoreBase`](keystorebase.md)

  ↳ **`InMemoryKeystore`**

## Constructors

### constructor

• **new InMemoryKeystore**()

#### Inherited from

[KeystoreBase](keystorebase.md).[constructor](keystorebase.md#constructor)

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

[keystore-base.ts:132](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/keystores/src/keystore-base.ts#L132)

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

[keystore-base.ts:145](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/keystores/src/keystore-base.ts#L145)

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

[keystore-base.ts:51](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/keystores/src/keystore-base.ts#L51)

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

[keystore-base.ts:72](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/keystores/src/keystore-base.ts#L72)

___

### getAllKeystoreNames

▸ **getAllKeystoreNames**(): `Promise`<`string`[]\>

Gets a list of the names of each entry in the keystore

#### Returns

`Promise`<`string`[]\>

#### Overrides

[KeystoreBase](keystorebase.md).[getAllKeystoreNames](keystorebase.md#getallkeystorenames)

#### Defined in

[inmemory-keystore.ts:18](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/keystores/src/inmemory-keystore.ts#L18)

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

[keystore-base.ts:106](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/keystores/src/keystore-base.ts#L106)

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

[keystore-base.ts:120](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/keystores/src/keystore-base.ts#L120)

___

### getRawKeystore

▸ **getRawKeystore**(`keystoreName`): `string`

Returns raw encrypted keystore entry string by name

#### Parameters

| Name | Type |
| :------ | :------ |
| `keystoreName` | `string` |

#### Returns

`string`

#### Overrides

[KeystoreBase](keystorebase.md).[getRawKeystore](keystorebase.md#getrawkeystore)

#### Defined in

[inmemory-keystore.ts:14](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/keystores/src/inmemory-keystore.ts#L14)

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

[keystore-base.ts:86](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/keystores/src/keystore-base.ts#L86)

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

[keystore-base.ts:64](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/keystores/src/keystore-base.ts#L64)

___

### persistKeystore

▸ **persistKeystore**(`keystoreName`, `keystore`): `void`

Saves encrypted keystore entry (i.e. to disk, database, ...). Must be implemented by subclass.

#### Parameters

| Name | Type |
| :------ | :------ |
| `keystoreName` | `string` |
| `keystore` | `string` |

#### Returns

`void`

#### Overrides

[KeystoreBase](keystorebase.md).[persistKeystore](keystorebase.md#persistkeystore)

#### Defined in

[inmemory-keystore.ts:10](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/keystores/src/inmemory-keystore.ts#L10)

___

### removeKeystore

▸ **removeKeystore**(`keystoreName`): `void`

Removes keystore entry from keystore permanently

#### Parameters

| Name | Type |
| :------ | :------ |
| `keystoreName` | `string` |

#### Returns

`void`

#### Overrides

[KeystoreBase](keystorebase.md).[removeKeystore](keystorebase.md#removekeystore)

#### Defined in

[inmemory-keystore.ts:22](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/keystores/src/inmemory-keystore.ts#L22)
