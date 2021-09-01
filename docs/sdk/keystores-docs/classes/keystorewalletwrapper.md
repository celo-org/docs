---
id: "keystorewalletwrapper"
title: "Class: KeystoreWalletWrapper"
sidebar_label: "KeystoreWalletWrapper"
sidebar_position: 0
custom_edit_url: null
---

Convenience wrapper of the LocalWallet to connect to a keystore

## Constructors

### constructor

• **new KeystoreWalletWrapper**(`keystore`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keystore` | [`KeystoreBase`](keystorebase.md) |

#### Defined in

[keystore-wallet-wrapper.ts:9](https://github.com/celo-org/celo-monorepo/tree/master/keystore-wallet-wrapper.ts#L9)

## Methods

### getKeystore

▸ **getKeystore**(): [`KeystoreBase`](keystorebase.md)

#### Returns

[`KeystoreBase`](keystorebase.md)

#### Defined in

[keystore-wallet-wrapper.ts:25](https://github.com/celo-org/celo-monorepo/tree/master/keystore-wallet-wrapper.ts#L25)

___

### getLocalWallet

▸ **getLocalWallet**(): `LocalWallet`

#### Returns

`LocalWallet`

#### Defined in

[keystore-wallet-wrapper.ts:21](https://github.com/celo-org/celo-monorepo/tree/master/keystore-wallet-wrapper.ts#L21)

___

### importPrivateKey

▸ **importPrivateKey**(`privateKey`, `passphrase`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |
| `passphrase` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[keystore-wallet-wrapper.ts:16](https://github.com/celo-org/celo-monorepo/tree/master/keystore-wallet-wrapper.ts#L16)

___

### lockAccount

▸ **lockAccount**(`address`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[keystore-wallet-wrapper.ts:34](https://github.com/celo-org/celo-monorepo/tree/master/keystore-wallet-wrapper.ts#L34)

___

### unlockAccount

▸ **unlockAccount**(`address`, `passphrase`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `passphrase` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[keystore-wallet-wrapper.ts:29](https://github.com/celo-org/celo-monorepo/tree/master/keystore-wallet-wrapper.ts#L29)
