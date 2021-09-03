---
id: "modules"
title: "@celo/wallet-base"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [WalletBase](classes/walletbase.md)

## Interfaces

- [UnlockableWallet](interfaces/unlockablewallet.md)
- [Wallet](interfaces/wallet.md)

## Variables

### publicKeyPrefix

• `Const` **publicKeyPrefix**: `number` = `0x04`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:18](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L18)

___

### sixtyFour

• `Const` **sixtyFour**: `number` = `64`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:19](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L19)

___

### thirtyTwo

• `Const` **thirtyTwo**: `number` = `32`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:20](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L20)

## Functions

### chainIdTransformationForSigning

▸ **chainIdTransformationForSigning**(`chainId`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |

#### Returns

`number`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:28](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L28)

___

### decodeSig

▸ **decodeSig**(`sig`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sig` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `Buffer` |
| `s` | `Buffer` |
| `v` | `number` |

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:238](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L238)

___

### encodeTransaction

▸ **encodeTransaction**(`rlpEncoded`, `signature`): `Promise`<`EncodedTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `rlpEncoded` | `RLPEncodedTx` |
| `signature` | `Object` |
| `signature.r` | `Buffer` |
| `signature.s` | `Buffer` |
| `signature.v` | `number` |

#### Returns

`Promise`<`EncodedTransaction`\>

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:121](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L121)

___

### extractSignature

▸ **extractSignature**(`rawTx`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawTx` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `r` | `Buffer` |
| `s` | `Buffer` |
| `v` | `number` |

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:155](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L155)

___

### getHashFromEncoded

▸ **getHashFromEncoded**(`rlpEncode`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rlpEncode` | `string` |

#### Returns

`string`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:32](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L32)

___

### recoverMessageSigner

▸ **recoverMessageSigner**(`signingDataHex`, `signedData`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `signingDataHex` | `string` |
| `signedData` | `string` |

#### Returns

`string`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:205](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L205)

___

### recoverTransaction

▸ **recoverTransaction**(`rawTx`): [`CeloTx`, `string`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawTx` | `string` |

#### Returns

[`CeloTx`, `string`]

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:173](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L173)

___

### rlpEncodedTx

▸ **rlpEncodedTx**(`tx`): `RLPEncodedTx`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `CeloTx` |

#### Returns

`RLPEncodedTx`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:70](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L70)

___

### verifyEIP712TypedDataSigner

▸ **verifyEIP712TypedDataSigner**(`typedData`, `signedData`, `expectedAddress`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `typedData` | `EIP712TypedData` |
| `signedData` | `string` |
| `expectedAddress` | `string` |

#### Returns

`boolean`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:215](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L215)

___

### verifySignatureWithoutPrefix

▸ **verifySignatureWithoutPrefix**(`messageHash`, `signature`, `signer`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageHash` | `string` |
| `signature` | `string` |
| `signer` | `string` |

#### Returns

`boolean`

#### Defined in

[wallets/wallet-base/src/signing-utils.ts:225](https://github.com/celo-org/celo-monorepo/tree/master/signing-utils.ts#L225)
