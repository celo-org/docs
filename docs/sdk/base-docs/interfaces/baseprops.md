---
id: "baseprops"
title: "Interface: BaseProps"
sidebar_label: "BaseProps"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### countryCallingCode

• `Optional` **countryCallingCode**: `string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/inputValidation.ts:11](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/inputValidation.ts#L11)

___

### customValidator

• `Optional` **customValidator**: (`input`: `string`) => `string`

#### Type declaration

▸ (`input`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

##### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/inputValidation.ts:10](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/inputValidation.ts#L10)

___

### decimalSeparator

• `Optional` **decimalSeparator**: `string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/inputValidation.ts:12](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/inputValidation.ts#L12)

___

### validator

• `Optional` **validator**: [`Custom`](../enums/validatorkind.md#custom) \| [`Decimal`](../enums/validatorkind.md#decimal) \| [`Integer`](../enums/validatorkind.md#integer) \| [`Phone`](../enums/validatorkind.md#phone)

#### Defined in

[celo-monorepo/packages/sdk/base/src/inputValidation.ts:9](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/base/src/inputValidation.ts#L9)
