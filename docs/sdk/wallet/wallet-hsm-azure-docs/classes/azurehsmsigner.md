---
id: "azurehsmsigner"
title: "Class: AzureHSMSigner"
sidebar_label: "AzureHSMSigner"
sidebar_position: 0
custom_edit_url: null
---

Signs the EVM transaction using an HSM key in Azure Key Vault

## Implements

- `Signer`

## Constructors

### constructor

• **new AzureHSMSigner**(`keyVaultClient`, `keyName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyVaultClient` | [`AzureKeyVaultClient`](azurekeyvaultclient.md) |
| `keyName` | `string` |

#### Defined in

[wallet-hsm-azure/src/azure-hsm-signer.ts:13](https://github.com/celo-org/celo-monorepo/tree/master/azure-hsm-signer.ts#L13)

## Properties

### keyName

• `Private` **keyName**: `string`

#### Defined in

[wallet-hsm-azure/src/azure-hsm-signer.ts:13](https://github.com/celo-org/celo-monorepo/tree/master/azure-hsm-signer.ts#L13)

___

### keyVaultClient

▪ `Static` `Private` **keyVaultClient**: [`AzureKeyVaultClient`](azurekeyvaultclient.md)

#### Defined in

[wallet-hsm-azure/src/azure-hsm-signer.ts:12](https://github.com/celo-org/celo-monorepo/tree/master/azure-hsm-signer.ts#L12)

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

[wallet-hsm-azure/src/azure-hsm-signer.ts:81](https://github.com/celo-org/celo-monorepo/tree/master/azure-hsm-signer.ts#L81)

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

[wallet-hsm-azure/src/azure-hsm-signer.ts:75](https://github.com/celo-org/celo-monorepo/tree/master/azure-hsm-signer.ts#L75)

___

### getNativeKey

▸ **getNativeKey**(): `string`

#### Returns

`string`

#### Implementation of

Signer.getNativeKey

#### Defined in

[wallet-hsm-azure/src/azure-hsm-signer.ts:71](https://github.com/celo-org/celo-monorepo/tree/master/azure-hsm-signer.ts#L71)

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

[wallet-hsm-azure/src/azure-hsm-signer.ts:39](https://github.com/celo-org/celo-monorepo/tree/master/azure-hsm-signer.ts#L39)

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

[wallet-hsm-azure/src/azure-hsm-signer.ts:23](https://github.com/celo-org/celo-monorepo/tree/master/azure-hsm-signer.ts#L23)

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

[wallet-hsm-azure/src/azure-hsm-signer.ts:57](https://github.com/celo-org/celo-monorepo/tree/master/azure-hsm-signer.ts#L57)
