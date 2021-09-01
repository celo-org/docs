---
id: "bip39"
title: "Interface: Bip39"
sidebar_label: "Bip39"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### generateMnemonic

• **generateMnemonic**: (`strength?`: `number`, `rng?`: [`RandomNumberGenerator`](../modules.md#randomnumbergenerator), `wordlist?`: `string`[]) => `Promise`<`string`\>

#### Type declaration

▸ (`strength?`, `rng?`, `wordlist?`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `strength?` | `number` |
| `rng?` | [`RandomNumberGenerator`](../modules.md#randomnumbergenerator) |
| `wordlist?` | `string`[] |

##### Returns

`Promise`<`string`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/account.ts:28](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/account.ts#L28)

___

### mnemonicToSeed

• **mnemonicToSeed**: (`mnemonic`: `string`, `password?`: `string`) => `Promise`<`Buffer`\>

#### Type declaration

▸ (`mnemonic`, `password?`): `Promise`<`Buffer`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `password?` | `string` |

##### Returns

`Promise`<`Buffer`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/account.ts:27](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/account.ts#L27)

___

### mnemonicToSeedSync

• **mnemonicToSeedSync**: (`mnemonic`: `string`, `password?`: `string`) => `Buffer`

#### Type declaration

▸ (`mnemonic`, `password?`): `Buffer`

##### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `password?` | `string` |

##### Returns

`Buffer`

#### Defined in

[celo-monorepo/packages/sdk/base/src/account.ts:26](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/account.ts#L26)

___

### validateMnemonic

• **validateMnemonic**: (`mnemonic`: `string`, `wordlist?`: `string`[]) => `boolean`

#### Type declaration

▸ (`mnemonic`, `wordlist?`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `mnemonic` | `string` |
| `wordlist?` | `string`[] |

##### Returns

`boolean`

#### Defined in

[celo-monorepo/packages/sdk/base/src/account.ts:33](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/account.ts#L33)
