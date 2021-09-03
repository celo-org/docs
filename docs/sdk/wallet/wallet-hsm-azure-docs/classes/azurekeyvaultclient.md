---
id: "azurekeyvaultclient"
title: "Class: AzureKeyVaultClient"
sidebar_label: "AzureKeyVaultClient"
sidebar_position: 0
custom_edit_url: null
---

Provides an abstraction on Azure Key Vault for performing signing operations

## Constructors

### constructor

• **new AzureKeyVaultClient**(`vaultName`, `credential?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `vaultName` | `string` |
| `credential?` | `TokenCredential` |

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:42](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L42)

## Properties

### credential

• `Private` `Readonly` **credential**: `TokenCredential`

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:36](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L36)

___

### cryptographyClientSet

• `Private` **cryptographyClientSet**: `Map`<`string`, `CryptographyClient`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:38](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L38)

___

### keyClient

• `Private` `Readonly` **keyClient**: `KeyClient`

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:37](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L37)

___

### secretClient

• `Private` `Readonly` **secretClient**: `SecretClient`

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:42](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L42)

___

### vaultName

• `Private` `Readonly` **vaultName**: `string`

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:33](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L33)

___

### vaultUri

• `Private` `Readonly` **vaultUri**: `string`

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:35](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L35)

## Methods

### getCryptographyClient

▸ `Private` **getCryptographyClient**(`keyName`): `Promise`<`CryptographyClient`\>

Provides the CryptographyClient for the requested key
Creates a new client if it doesn't already exist

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyName` | `string` |

#### Returns

`Promise`<`CryptographyClient`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:177](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L177)

___

### getKey

▸ `Private` **getKey**(`keyName`): `Promise`<`KeyVaultKey`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyName` | `string` |

#### Returns

`Promise`<`KeyVaultKey`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:143](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L143)

___

### getKeyCurve

▸ `Private` **getKeyCurve**(`keyName`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyName` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:164](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L164)

___

### getKeyId

▸ **getKeyId**(`keyName`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyName` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:75](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L75)

___

### getKeys

▸ **getKeys**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:54](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L54)

___

### getPublicKey

▸ **getPublicKey**(`keyName`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyName` | `string` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:62](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L62)

___

### getSecret

▸ **getSecret**(`secretName`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretName` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:135](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L135)

___

### hasKey

▸ **hasKey**(`keyName`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyName` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:123](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L123)

___

### signMessage

▸ **signMessage**(`message`, `keyName`): `Promise`<`Signature`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Buffer` |
| `keyName` | `string` |

#### Returns

`Promise`<`Signature`\>

#### Defined in

[wallet-hsm-azure/src/azure-key-vault-client.ts:82](https://github.com/celo-org/celo-monorepo/tree/master/azure-key-vault-client.ts#L82)
