---
id: "ledgersigner"
title: "Class: LedgerSigner"
sidebar_label: "LedgerSigner"
sidebar_position: 0
custom_edit_url: null
---

Signs the EVM transaction with a Ledger device

## Implements

- `Signer`

## Constructors

### constructor

• **new LedgerSigner**(`ledger`, `derivationPath`, `ledgerAddressValidation`, `appConfiguration?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ledger` | `any` |
| `derivationPath` | `string` |
| `ledgerAddressValidation` | [`AddressValidation`](../enums/addressvalidation.md) |
| `appConfiguration` | `Object` |
| `appConfiguration.arbitraryDataEnabled` | `number` |
| `appConfiguration.version` | `string` |

#### Defined in

[wallet-ledger/src/ledger-signer.ts:22](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L22)

## Properties

### appConfiguration

• `Private` **appConfiguration**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `arbitraryDataEnabled` | `number` |
| `version` | `string` |

#### Defined in

[wallet-ledger/src/ledger-signer.ts:22](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L22)

___

### derivationPath

• `Private` **derivationPath**: `string`

#### Defined in

[wallet-ledger/src/ledger-signer.ts:19](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L19)

___

### ledger

• `Private` **ledger**: `any`

#### Defined in

[wallet-ledger/src/ledger-signer.ts:18](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L18)

___

### ledgerAddressValidation

• `Private` **ledgerAddressValidation**: [`AddressValidation`](../enums/addressvalidation.md)

#### Defined in

[wallet-ledger/src/ledger-signer.ts:21](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L21)

___

### validated

• `Private` **validated**: `boolean` = `false`

#### Defined in

[wallet-ledger/src/ledger-signer.ts:20](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L20)

## Methods

### checkForKnownToken

▸ `Private` **checkForKnownToken**(`rlpEncoded`): `Promise`<`void`\>

Display ERC20 info on ledger if contract is well known

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rlpEncoded` | `RLPEncodedTx` | Encoded transaction |

#### Returns

`Promise`<`void`\>

#### Defined in

[wallet-ledger/src/ledger-signer.ts:164](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L164)

___

### computeSharedSecret

▸ **computeSharedSecret**(`_publicKey`): `Promise`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_publicKey` | `string` |

#### Returns

`Promise`<`Buffer`\>

#### Implementation of

Signer.computeSharedSecret

#### Defined in

[wallet-ledger/src/ledger-signer.ts:196](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L196)

___

### decrypt

▸ **decrypt**(`_ciphertext`): `Promise`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ciphertext` | `Buffer` |

#### Returns

`Promise`<`Buffer`\>

#### Implementation of

Signer.decrypt

#### Defined in

[wallet-ledger/src/ledger-signer.ts:190](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L190)

___

### getNativeKey

▸ **getNativeKey**(): `string`

#### Returns

`string`

#### Implementation of

Signer.getNativeKey

#### Defined in

[wallet-ledger/src/ledger-signer.ts:39](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L39)

___

### getValidatedDerivationPath

▸ `Private` **getValidatedDerivationPath**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[wallet-ledger/src/ledger-signer.ts:131](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L131)

___

### signPersonalMessage

▸ **signPersonalMessage**(`data`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Promise`<`Object`\>

#### Implementation of

Signer.signPersonalMessage

#### Defined in

[wallet-ledger/src/ledger-signer.ts:82](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L82)

___

### signTransaction

▸ **signTransaction**(`addToV`, `encodedTx`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addToV` | `number` |
| `encodedTx` | `RLPEncodedTx` |

#### Returns

`Promise`<`Object`\>

#### Implementation of

Signer.signTransaction

#### Defined in

[wallet-ledger/src/ledger-signer.ts:43](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L43)

___

### signTypedData

▸ **signTypedData**(`typedData`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | `EIP712TypedData` |

#### Returns

`Promise`<`Object`\>

#### Implementation of

Signer.signTypedData

#### Defined in

[wallet-ledger/src/ledger-signer.ts:103](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L103)

___

### validationRequired

▸ `Private` **validationRequired**(): `boolean`

#### Returns

`boolean`

#### Defined in

[wallet-ledger/src/ledger-signer.ts:139](https://github.com/celo-org/celo-monorepo/tree/master/ledger-signer.ts#L139)
