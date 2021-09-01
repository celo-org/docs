---
id: "modules"
title: "@celo/utils"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [CURRENCY\_ENUM](enums/currency_enum.md)
- [DappKitRequestTypes](enums/dappkitrequesttypes.md)
- [DappKitResponseStatus](enums/dappkitresponsestatus.md)
- [SHORT\_CURRENCIES](enums/short_currencies.md)

## Classes

- [Countries](classes/countries.md)

## Interfaces

- [AccountAuthRequest](interfaces/accountauthrequest.md)
- [AccountAuthResponseFailure](interfaces/accountauthresponsefailure.md)
- [AccountAuthResponseSuccess](interfaces/accountauthresponsesuccess.md)
- [ContactPhoneNumber](interfaces/contactphonenumber.md)
- [DappKitRequestBase](interfaces/dappkitrequestbase.md)
- [DappKitRequestMeta](interfaces/dappkitrequestmeta.md)
- [LocalizedCountry](interfaces/localizedcountry.md)
- [MinimalContact](interfaces/minimalcontact.md)
- [SignTxRequest](interfaces/signtxrequest.md)
- [SignTxResponseFailure](interfaces/signtxresponsefailure.md)
- [SignTxResponseSuccess](interfaces/signtxresponsesuccess.md)
- [TxToSignParam](interfaces/txtosignparam.md)

## Type aliases

### AccountAuthResponse

Ƭ **AccountAuthResponse**: [`AccountAuthResponseSuccess`](modules.md#accountauthresponsesuccess) \| [`AccountAuthResponseFailure`](interfaces/accountauthresponsefailure.md)

#### Defined in

[packages/sdk/utils/src/dappkit.ts:62](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L62)

___

### DappKitRequest

Ƭ **DappKitRequest**: [`AccountAuthRequest`](modules.md#accountauthrequest) \| [`SignTxRequest`](modules.md#signtxrequest)

#### Defined in

[packages/sdk/utils/src/dappkit.ts:134](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L134)

___

### DappKitResponse

Ƭ **DappKitResponse**: [`AccountAuthResponse`](modules.md#accountauthresponse) \| [`SignTxResponse`](modules.md#signtxresponse)

#### Defined in

[packages/sdk/utils/src/dappkit.ts:83](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L83)

___

### SignTxResponse

Ƭ **SignTxResponse**: [`SignTxResponseSuccess`](modules.md#signtxresponsesuccess) \| [`SignTxResponseFailure`](interfaces/signtxresponsefailure.md)

#### Defined in

[packages/sdk/utils/src/dappkit.ts:81](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L81)

## Variables

### CURRENCIES

• `Const` **CURRENCIES**: `CurrencyObject`

#### Defined in

packages/sdk/base/lib/currencies.d.ts:14

___

### DAPPKIT\_BASE\_HOST

• `Const` **DAPPKIT\_BASE\_HOST**: ``"celo://wallet/dappkit"``

#### Defined in

[packages/sdk/utils/src/dappkit.ts:4](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L4)

___

### currencyToShortMap

• `Const` **currencyToShortMap**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Celo Dollar` | [`SHORT_CURRENCIES`](enums/short_currencies.md) |
| `Celo Euro` | [`SHORT_CURRENCIES`](enums/short_currencies.md) |
| `Celo Gold` | [`SHORT_CURRENCIES`](enums/short_currencies.md) |

#### Defined in

packages/sdk/base/lib/currencies.d.ts:21

## Functions

### AccountAuthRequest

▸ `Const` **AccountAuthRequest**(`meta`): [`AccountAuthRequest`](modules.md#accountauthrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta` | [`DappKitRequestMeta`](interfaces/dappkitrequestmeta.md) |

#### Returns

[`AccountAuthRequest`](modules.md#accountauthrequest)

#### Defined in

[packages/sdk/utils/src/dappkit.ts:32](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L32)

___

### AccountAuthResponseSuccess

▸ `Const` **AccountAuthResponseSuccess**(`address`, `phoneNumber`, `pepper`): [`AccountAuthResponseSuccess`](modules.md#accountauthresponsesuccess)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `phoneNumber` | `string` |
| `pepper` | `undefined` \| `string` |

#### Returns

[`AccountAuthResponseSuccess`](modules.md#accountauthresponsesuccess)

#### Defined in

[packages/sdk/utils/src/dappkit.ts:45](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L45)

___

### SignTxRequest

▸ `Const` **SignTxRequest**(`txs`, `meta`): [`SignTxRequest`](modules.md#signtxrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `txs` | [`TxToSignParam`](interfaces/txtosignparam.md)[] |
| `meta` | [`DappKitRequestMeta`](interfaces/dappkitrequestmeta.md) |

#### Returns

[`SignTxRequest`](modules.md#signtxrequest)

#### Defined in

[packages/sdk/utils/src/dappkit.ts:120](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L120)

___

### SignTxResponseSuccess

▸ `Const` **SignTxResponseSuccess**(`rawTxs`): [`SignTxResponseSuccess`](modules.md#signtxresponsesuccess)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawTxs` | `string`[] |

#### Returns

[`SignTxResponseSuccess`](modules.md#signtxresponsesuccess)

#### Defined in

[packages/sdk/utils/src/dappkit.ts:70](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L70)

___

### getContactNameHash

▸ `Const` **getContactNameHash**(`contact`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contact` | [`MinimalContact`](interfaces/minimalcontact.md) |

#### Returns

`string`

#### Defined in

[packages/sdk/utils/src/contacts.ts:13](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/contacts.ts#L13)

___

### getContactPhoneNumber

▸ `Const` **getContactPhoneNumber**(`contact`): `undefined` \| ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contact` | [`MinimalContact`](interfaces/minimalcontact.md) |

#### Returns

`undefined` \| ``null`` \| `string`

#### Defined in

packages/sdk/base/lib/contacts.d.ts:11

___

### isContact

▸ **isContact**(`contactOrNumber`): contactOrNumber is MinimalContact

#### Parameters

| Name | Type |
| :------ | :------ |
| `contactOrNumber` | `any` |

#### Returns

contactOrNumber is MinimalContact

#### Defined in

packages/sdk/base/lib/contacts.d.ts:12

___

### parseDappKitRequestDeeplink

▸ **parseDappKitRequestDeeplink**(`url`): [`DappKitRequest`](modules.md#dappkitrequest)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

[`DappKitRequest`](modules.md#dappkitrequest)

#### Defined in

[packages/sdk/utils/src/dappkit.ts:236](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L236)

___

### parseDappkitResponseDeeplink

▸ **parseDappkitResponseDeeplink**(`url`): [`DappKitResponse`](modules.md#dappkitresponse) & { `requestId`: `string`  }

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

[`DappKitResponse`](modules.md#dappkitresponse) & { `requestId`: `string`  }

#### Defined in

[packages/sdk/utils/src/dappkit.ts:179](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L179)

___

### produceResponseDeeplink

▸ **produceResponseDeeplink**(`request`, `response`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`DappKitRequest`](modules.md#dappkitrequest) |
| `response` | [`DappKitResponse`](modules.md#dappkitresponse) |

#### Returns

`string`

#### Defined in

[packages/sdk/utils/src/dappkit.ts:85](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L85)

___

### resolveCurrency

▸ `Const` **resolveCurrency**(`label`): [`CURRENCY_ENUM`](enums/currency_enum.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |

#### Returns

[`CURRENCY_ENUM`](enums/currency_enum.md)

#### Defined in

packages/sdk/base/lib/currencies.d.ts:15

___

### serializeDappKitRequestDeeplink

▸ **serializeDappKitRequestDeeplink**(`request`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`DappKitRequest`](modules.md#dappkitrequest) |

#### Returns

`string`

#### Defined in

[packages/sdk/utils/src/dappkit.ts:148](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/utils/src/dappkit.ts#L148)
