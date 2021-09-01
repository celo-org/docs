---
id: "modules"
title: "@celo/wallet-hsm"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [Signature](classes/signature.md)

## Variables

### publicKeyPrefix

• `Const` **publicKeyPrefix**: `number` = `0x04`

#### Defined in

[signature-utils.ts:9](https://github.com/celo-org/celo-monorepo/tree/master/signature-utils.ts#L9)

___

### sixtyFour

• `Const` **sixtyFour**: `number` = `64`

#### Defined in

[signature-utils.ts:10](https://github.com/celo-org/celo-monorepo/tree/master/signature-utils.ts#L10)

___

### thirtyTwo

• `Const` **thirtyTwo**: `number` = `32`

#### Defined in

[signature-utils.ts:11](https://github.com/celo-org/celo-monorepo/tree/master/signature-utils.ts#L11)

## Functions

### asn1FromPublicKey

▸ **asn1FromPublicKey**(`bn`): `Buffer`

This is used only for mocking
Creates an asn1 key to emulate KMS response

#### Parameters

| Name | Type |
| :------ | :------ |
| `bn` | `BigNumber` |

#### Returns

`Buffer`

#### Defined in

[ber-utils.ts:23](https://github.com/celo-org/celo-monorepo/tree/master/ber-utils.ts#L23)

___

### bigNumberToBuffer

▸ `Const` **bigNumberToBuffer**(`input`, `lengthInBytes`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `BigNumber` |
| `lengthInBytes` | `number` |

#### Returns

`Buffer`

#### Defined in

[signature-utils.ts:34](https://github.com/celo-org/celo-monorepo/tree/master/signature-utils.ts#L34)

___

### bufferToBigNumber

▸ `Const` **bufferToBigNumber**(`input`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Buffer` |

#### Returns

`BigNumber`

#### Defined in

[signature-utils.ts:30](https://github.com/celo-org/celo-monorepo/tree/master/signature-utils.ts#L30)

___

### getAddressFromPublicKey

▸ **getAddressFromPublicKey**(`publicKey`): `Address`

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `BigNumber` |

#### Returns

`Address`

#### Defined in

[signature-utils.ts:78](https://github.com/celo-org/celo-monorepo/tree/master/signature-utils.ts#L78)

___

### makeCanonical

▸ `Const` **makeCanonical**(`S`): `BigNumber`

If the signature is in the "bottom" of the curve, it is non-canonical
Non-canonical signatures are illegal in Ethereum and therefore the S value
must be transposed to the lower intersection
https://github.com/bitcoin/bips/blob/master/bip-0062.mediawiki#Low_S_values_in_signatures

#### Parameters

| Name | Type |
| :------ | :------ |
| `S` | `BigNumber` |

#### Returns

`BigNumber`

#### Defined in

[signature-utils.ts:21](https://github.com/celo-org/celo-monorepo/tree/master/signature-utils.ts#L21)

___

### parseBERSignature

▸ **parseBERSignature**(`b`): `Object`

AWS returns DER encoded signatures but DER is valid BER

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `Buffer` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `Buffer` |
| `s` | `Buffer` |

#### Defined in

[ber-utils.ts:44](https://github.com/celo-org/celo-monorepo/tree/master/ber-utils.ts#L44)

___

### publicKeyFromAsn1

▸ **publicKeyFromAsn1**(`b`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `Buffer` |

#### Returns

`BigNumber`

#### Defined in

[ber-utils.ts:9](https://github.com/celo-org/celo-monorepo/tree/master/ber-utils.ts#L9)

___

### recoverKeyIndex

▸ **recoverKeyIndex**(`signature`, `publicKey`, `hash`): `number`

Attempts each recovery key to find a match

#### Parameters

| Name | Type |
| :------ | :------ |
| `signature` | `Uint8Array` |
| `publicKey` | `BigNumber` |
| `hash` | `Uint8Array` |

#### Returns

`number`

#### Defined in

[signature-utils.ts:58](https://github.com/celo-org/celo-monorepo/tree/master/signature-utils.ts#L58)

___

### toArrayBuffer

▸ `Const` **toArrayBuffer**(`b`): `ArrayBuffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | `Buffer` |

#### Returns

`ArrayBuffer`

#### Defined in

[ber-utils.ts:5](https://github.com/celo-org/celo-monorepo/tree/master/ber-utils.ts#L5)
