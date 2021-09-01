---
id: "countries"
title: "Class: Countries"
sidebar_label: "Countries"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Countries**(`language?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `language?` | `string` |

#### Defined in

[packages/sdk/utils/src/countries.ts:41](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/countries.ts#L41)

## Properties

### countryMap

• **countryMap**: `Map`<`string`, [`LocalizedCountry`](../interfaces/localizedcountry.md)\>

#### Defined in

[packages/sdk/utils/src/countries.ts:40](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/countries.ts#L40)

___

### language

• **language**: `string`

#### Defined in

[packages/sdk/utils/src/countries.ts:39](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/countries.ts#L39)

___

### localizedCountries

• **localizedCountries**: [`LocalizedCountry`](../interfaces/localizedcountry.md)[]

#### Defined in

[packages/sdk/utils/src/countries.ts:41](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/countries.ts#L41)

## Methods

### getCountry

▸ **getCountry**(`countryName?`): `undefined` \| [`LocalizedCountry`](../interfaces/localizedcountry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `countryName?` | ``null`` \| `string` |

#### Returns

`undefined` \| [`LocalizedCountry`](../interfaces/localizedcountry.md)

#### Defined in

[packages/sdk/utils/src/countries.ts:51](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/countries.ts#L51)

___

### getCountryByCodeAlpha2

▸ **getCountryByCodeAlpha2**(`countryCode`): `undefined` \| [`LocalizedCountry`](../interfaces/localizedcountry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `countryCode` | `string` |

#### Returns

`undefined` \| [`LocalizedCountry`](../interfaces/localizedcountry.md)

#### Defined in

[packages/sdk/utils/src/countries.ts:61](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/countries.ts#L61)

___

### getFilteredCountries

▸ **getFilteredCountries**(`query`): [`LocalizedCountry`](../interfaces/localizedcountry.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `string` |

#### Returns

[`LocalizedCountry`](../interfaces/localizedcountry.md)[]

#### Defined in

[packages/sdk/utils/src/countries.ts:65](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/countries.ts#L65)
