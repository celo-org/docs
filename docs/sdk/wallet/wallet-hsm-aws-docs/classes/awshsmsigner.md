---
id: "awshsmsigner"
title: "Class: AwsHsmSigner"
sidebar_label: "AwsHsmSigner"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- `Signer`

## Constructors

### constructor

• **new AwsHsmSigner**(`kms`, `keyId`, `publicKey`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `kms` | `KMS` |
| `keyId` | `string` |
| `publicKey` | `BigNumber` |

#### Defined in

[wallet-hsm-aws/src/aws-hsm-signer.ts:24](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-signer.ts#L24)

## Properties

### keyId

• `Private` **keyId**: `string`

#### Defined in

[wallet-hsm-aws/src/aws-hsm-signer.ts:23](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-signer.ts#L23)

___

### kms

• `Private` **kms**: `KMS`

#### Defined in

[wallet-hsm-aws/src/aws-hsm-signer.ts:22](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-signer.ts#L22)

___

### publicKey

• `Private` **publicKey**: `BigNumber`

#### Defined in

[wallet-hsm-aws/src/aws-hsm-signer.ts:24](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-signer.ts#L24)

## Methods

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

[wallet-hsm-aws/src/aws-hsm-signer.ts:115](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-signer.ts#L115)

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

[wallet-hsm-aws/src/aws-hsm-signer.ts:109](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-signer.ts#L109)

___

### findCanonicalSignature

▸ `Private` **findCanonicalSignature**(`buffer`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `Buffer` |

#### Returns

`Promise`<`Object`\>

#### Defined in

[wallet-hsm-aws/src/aws-hsm-signer.ts:32](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-signer.ts#L32)

___

### getNativeKey

▸ **getNativeKey**(): `string`

#### Returns

`string`

#### Implementation of

Signer.getNativeKey

#### Defined in

[wallet-hsm-aws/src/aws-hsm-signer.ts:105](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-signer.ts#L105)

___

### sign

▸ `Private` **sign**(`buffer`): `Promise`<`Signature`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `Buffer` |

#### Returns

`Promise`<`Signature`\>

#### Defined in

[wallet-hsm-aws/src/aws-hsm-signer.ts:53](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-signer.ts#L53)

___

### signPersonalMessage

▸ **signPersonalMessage**(`data`): `Promise`<`Signature`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Promise`<`Signature`\>

#### Implementation of

Signer.signPersonalMessage

#### Defined in

[wallet-hsm-aws/src/aws-hsm-signer.ts:82](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-signer.ts#L82)

___

### signTransaction

▸ **signTransaction**(`addToV`, `encodedTx`): `Promise`<`Signature`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `addToV` | `number` |
| `encodedTx` | `RLPEncodedTx` |

#### Returns

`Promise`<`Signature`\>

#### Implementation of

Signer.signTransaction

#### Defined in

[wallet-hsm-aws/src/aws-hsm-signer.ts:70](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-signer.ts#L70)

___

### signTypedData

▸ **signTypedData**(`typedData`): `Promise`<`Signature`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | `EIP712TypedData` |

#### Returns

`Promise`<`Signature`\>

#### Implementation of

Signer.signTypedData

#### Defined in

[wallet-hsm-aws/src/aws-hsm-signer.ts:94](https://github.com/celo-org/celo-monorepo/tree/master/aws-hsm-signer.ts#L94)
