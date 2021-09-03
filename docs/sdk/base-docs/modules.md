---
id: "modules"
title: "@celo/base"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [CURRENCY\_ENUM](enums/currency_enum.md)
- [IdentifierType](enums/identifiertype.md)
- [MnemonicLanguages](enums/mnemoniclanguages.md)
- [MnemonicStrength](enums/mnemonicstrength.md)
- [SHORT\_CURRENCIES](enums/short_currencies.md)
- [ValidatorKind](enums/validatorkind.md)

## Classes

- [Future](classes/future.md)
- [JSONParseError](classes/jsonparseerror.md)
- [RootError](classes/rooterror.md)

## Interfaces

- [AddressListItem](interfaces/addresslistitem.md)
- [AttestationsStatus](interfaces/attestationsstatus.md)
- [BaseError](interfaces/baseerror.md)
- [BaseProps](interfaces/baseprops.md)
- [Bip39](interfaces/bip39.md)
- [ContactPhoneNumber](interfaces/contactphonenumber.md)
- [ErrorResult](interfaces/errorresult.md)
- [MinimalContact](interfaces/minimalcontact.md)
- [OkResult](interfaces/okresult.md)
- [ParsedPhoneNumber](interfaces/parsedphonenumber.md)
- [RepeatTaskContext](interfaces/repeattaskcontext.md)
- [RetryTaskOptions](interfaces/retrytaskoptions.md)
- [RunningTask](interfaces/runningtask.md)
- [RunningTaskWithValue](interfaces/runningtaskwithvalue.md)
- [Signature](interfaces/signature.md)
- [Signer](interfaces/signer.md)
- [TaskOptions](interfaces/taskoptions.md)

## Type aliases

### Address

Ƭ **Address**: `string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:5](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L5)

___

### Comparator

Ƭ **Comparator**<`T`\>: (`a`: `T`, `b`: `T`) => `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`a`, `b`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |
| `b` | `T` |

##### Returns

`boolean`

#### Defined in

[celo-monorepo/packages/sdk/base/src/collections.ts:50](https://github.com/celo-org/celo-monorepo/tree/master/collections.ts#L50)

___

### Logger

Ƭ **Logger**: (...`args`: `any`[]) => `void`

#### Type declaration

▸ (...`args`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`void`

#### Defined in

[celo-monorepo/packages/sdk/base/src/logger.ts:1](https://github.com/celo-org/celo-monorepo/tree/master/logger.ts#L1)

___

### RandomNumberGenerator

Ƭ **RandomNumberGenerator**: (`size`: `number`, `callback`: (`err`: `Error` \| ``null``, `buf`: `Buffer`) => `void`) => `void`

#### Type declaration

▸ (`size`, `callback`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |
| `callback` | (`err`: `Error` \| ``null``, `buf`: `Buffer`) => `void` |

##### Returns

`void`

#### Defined in

[celo-monorepo/packages/sdk/base/src/account.ts:20](https://github.com/celo-org/celo-monorepo/tree/master/account.ts#L20)

___

### Result

Ƭ **Result**<`TResult`, `TError`\>: [`OkResult`](interfaces/okresult.md)<`TResult`\> \| [`ErrorResult`](interfaces/errorresult.md)<`TError`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `TResult` |
| `TError` | extends `Error` |

#### Defined in

[celo-monorepo/packages/sdk/base/src/result.ts:10](https://github.com/celo-org/celo-monorepo/tree/master/result.ts#L10)

## Variables

### AttestationBase

• `Const` **AttestationBase**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `IdentifierType` | typeof [`IdentifierType`](enums/identifiertype.md) |
| `base64ToHex` | (`base64String`: `string`) => `string` |
| `extractAttestationCodeFromMessage` | (`message`: `string`) => ``null`` \| `string` |
| `getIdentifierPrefix` | (`type`: [`IdentifierType`](enums/identifiertype.md)) => `string` |
| `hashIdentifier` | (`sha3`: (`a`: `string`) => `string` \| ``null``, `identifier`: `string`, `type`: [`IdentifierType`](enums/identifiertype.md), `salt?`: `string`) => `string` |
| `isAccountConsideredVerified` | (`stats`: `AttestationStat` \| `undefined`, `numAttestationsRequired`: `number`, `attestationThreshold`: `number`) => [`AttestationsStatus`](interfaces/attestationsstatus.md) |
| `messageContainsAttestationCode` | (`message`: `string`) => `boolean` |
| `sanitizeMessageBase64` | (`base64String`: `string`) => `string` |

#### Defined in

[celo-monorepo/packages/sdk/base/src/attestations.ts:115](https://github.com/celo-org/celo-monorepo/tree/master/attestations.ts#L115)

___

### CELO\_DERIVATION\_PATH\_BASE

• `Const` **CELO\_DERIVATION\_PATH\_BASE**: ``"m/44'/52752'/0'"``

#### Defined in

[celo-monorepo/packages/sdk/base/src/account.ts:1](https://github.com/celo-org/celo-monorepo/tree/master/account.ts#L1)

___

### CURRENCIES

• `Const` **CURRENCIES**: `CurrencyObject`

#### Defined in

[celo-monorepo/packages/sdk/base/src/currencies.ts:15](https://github.com/celo-org/celo-monorepo/tree/master/currencies.ts#L15)

___

### JSONParseErrorType

• `Const` **JSONParseErrorType**: ``"JsonParseError"``

#### Defined in

[celo-monorepo/packages/sdk/base/src/result.ts:77](https://github.com/celo-org/celo-monorepo/tree/master/result.ts#L77)

___

### NULL\_ADDRESS

• `Const` **NULL\_ADDRESS**: ``"0x0000000000000000000000000000000000000000"``

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:30](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L30)

___

### POP\_SIZE

• `Const` **POP\_SIZE**: ``65``

#### Defined in

[celo-monorepo/packages/sdk/base/src/signatureUtils.ts:1](https://github.com/celo-org/celo-monorepo/tree/master/signatureUtils.ts#L1)

___

### PhoneNumberBase

• `Const` **PhoneNumberBase**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getPhoneHash` | (`sha3`: (`a`: `string`) => ``null`` \| `string`, `phoneNumber`: `string`, `salt?`: `string`) => `string` |
| `isE164Number` | (`phoneNumber`: `string`) => `boolean` |

#### Defined in

[celo-monorepo/packages/sdk/base/src/phoneNumbers.ts:35](https://github.com/celo-org/celo-monorepo/tree/master/phoneNumbers.ts#L35)

___

### SignatureBase

• `Const` **SignatureBase**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `NativeSigner` | (`signFn`: (`message`: `string`, `signer`: `string`) => `Promise`<`string`\>, `signer`: `string`) => [`Signer`](interfaces/signer.md) |
| `serializeSignature` | (`signature`: [`Signature`](interfaces/signature.md)) => `string` |

#### Defined in

[celo-monorepo/packages/sdk/base/src/signatureUtils.ts:32](https://github.com/celo-org/celo-monorepo/tree/master/signatureUtils.ts#L32)

___

### StringBase

• `Const` **StringBase**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `appendPath` | (`baseUrl`: `string`, `path`: `string`) => `string` |
| `normalizeAccents` | (`str`: `string`) => `string` |

#### Defined in

[celo-monorepo/packages/sdk/base/src/string.ts:14](https://github.com/celo-org/celo-monorepo/tree/master/string.ts#L14)

___

### URL\_REGEX

• `Const` **URL\_REGEX**: `RegExp`

#### Defined in

[celo-monorepo/packages/sdk/base/src/io.ts:2](https://github.com/celo-org/celo-monorepo/tree/master/io.ts#L2)

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

[celo-monorepo/packages/sdk/base/src/currencies.ts:52](https://github.com/celo-org/celo-monorepo/tree/master/currencies.ts#L52)

## Functions

### Err

▸ `Const` **Err**<`TError`\>(`error`): [`ErrorResult`](interfaces/errorresult.md)<`TError`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TError` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `TError` |

#### Returns

[`ErrorResult`](interfaces/errorresult.md)<`TError`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/result.ts:16](https://github.com/celo-org/celo-monorepo/tree/master/result.ts#L16)

___

### NativeSigner

▸ **NativeSigner**(`signFn`, `signer`): [`Signer`](interfaces/signer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signFn` | (`message`: `string`, `signer`: `string`) => `Promise`<`string`\> |
| `signer` | `string` |

#### Returns

[`Signer`](interfaces/signer.md)

#### Defined in

[celo-monorepo/packages/sdk/base/src/signatureUtils.ts:8](https://github.com/celo-org/celo-monorepo/tree/master/signatureUtils.ts#L8)

___

### Ok

▸ `Const` **Ok**<`TResult`\>(`result`): [`OkResult`](interfaces/okresult.md)<`TResult`\>

#### Type parameters

| Name |
| :------ |
| `TResult` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | `TResult` |

#### Returns

[`OkResult`](interfaces/okresult.md)<`TResult`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/result.ts:12](https://github.com/celo-org/celo-monorepo/tree/master/result.ts#L12)

___

### anonymizedPhone

▸ **anonymizedPhone**(`phoneNumber`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/phoneNumbers.ts:31](https://github.com/celo-org/celo-monorepo/tree/master/phoneNumbers.ts#L31)

___

### appendPath

▸ **appendPath**(`baseUrl`, `path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseUrl` | `string` |
| `path` | `string` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/string.ts:1](https://github.com/celo-org/celo-monorepo/tree/master/string.ts#L1)

___

### base64ToHex

▸ **base64ToHex**(`base64String`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `base64String` | `string` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/attestations.ts:36](https://github.com/celo-org/celo-monorepo/tree/master/attestations.ts#L36)

___

### bufferToHex

▸ `Const` **bufferToHex**(`buf`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | `Buffer` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:28](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L28)

___

### concurrentMap

▸ **concurrentMap**<`A`, `B`\>(`concurrency`, `xs`, `mapFn`): `Promise`<`B`[]\>

Map an async function over a list xs with a given concurrency level

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `concurrency` | `number` | number of `mapFn` concurrent executions |
| `xs` | `A`[] | list of value |
| `mapFn` | (`val`: `A`, `idx`: `number`) => `Promise`<`B`\> | mapping function |

#### Returns

`Promise`<`B`[]\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/async.ts:128](https://github.com/celo-org/celo-monorepo/tree/master/async.ts#L128)

___

### concurrentValuesMap

▸ **concurrentValuesMap**<`IN`, `OUT`\>(`concurrency`, `x`, `mapFn`): `Promise`<`Record`<`string`, `OUT`\>\>

Map an async function over the values in Object x with a given concurrency level

#### Type parameters

| Name | Type |
| :------ | :------ |
| `IN` | extends `unknown` |
| `OUT` | extends `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `concurrency` | `number` | number of `mapFn` concurrent executions |
| `x` | `Record`<`string`, `IN`\> | associative array of values |
| `mapFn` | (`val`: `IN`, `key`: `string`) => `Promise`<`OUT`\> | mapping function |

#### Returns

`Promise`<`Record`<`string`, `OUT`\>\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/async.ts:150](https://github.com/celo-org/celo-monorepo/tree/master/async.ts#L150)

___

### conditionWatcher

▸ **conditionWatcher**(`opts`): [`RunningTask`](interfaces/runningtask.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `RepeatTaskOptions` & { `onSuccess`: () => `void` \| `Promise`<`void`\> ; `pollCondition`: () => `Promise`<`boolean`\>  } |

#### Returns

[`RunningTask`](interfaces/runningtask.md)

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:100](https://github.com/celo-org/celo-monorepo/tree/master/task.ts#L100)

___

### consoleLogger

▸ `Const` **consoleLogger**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[celo-monorepo/packages/sdk/base/src/logger.ts:15](https://github.com/celo-org/celo-monorepo/tree/master/logger.ts#L15)

___

### ensureLeading0x

▸ `Const` **ensureLeading0x**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:17](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L17)

___

### eqAddress

▸ `Const` **eqAddress**(`a`, `b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `string` |
| `b` | `string` |

#### Returns

`boolean`

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:7](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L7)

___

### extractAttestationCodeFromMessage

▸ **extractAttestationCodeFromMessage**(`message`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

``null`` \| `string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/attestations.ts:53](https://github.com/celo-org/celo-monorepo/tree/master/attestations.ts#L53)

___

### findAddressIndex

▸ `Const` **findAddressIndex**(`address`, `addresses`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `addresses` | `string`[] |

#### Returns

`number`

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:32](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L32)

___

### getAddressChunks

▸ `Const` **getAddressChunks**(`input`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`[]

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:21](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L21)

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

[celo-monorepo/packages/sdk/base/src/contacts.ts:13](https://github.com/celo-org/celo-monorepo/tree/master/contacts.ts#L13)

___

### getErrorMessage

▸ **getErrorMessage**(`error`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/displayFormatting.ts:1](https://github.com/celo-org/celo-monorepo/tree/master/displayFormatting.ts#L1)

___

### getIdentifierPrefix

▸ **getIdentifierPrefix**(`type`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`IdentifierType`](enums/identifiertype.md) |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/attestations.ts:13](https://github.com/celo-org/celo-monorepo/tree/master/attestations.ts#L13)

___

### getPhoneHash

▸ `Const` **getPhoneHash**(`sha3`, `phoneNumber`, `salt?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sha3` | (`a`: `string`) => ``null`` \| `string` |
| `phoneNumber` | `string` |
| `salt?` | `string` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/phoneNumbers.ts:14](https://github.com/celo-org/celo-monorepo/tree/master/phoneNumbers.ts#L14)

___

### hashIdentifier

▸ **hashIdentifier**(`sha3`, `identifier`, `type`, `salt?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sha3` | (`a`: `string`) => `string` \| ``null`` |
| `identifier` | `string` |
| `type` | [`IdentifierType`](enums/identifiertype.md) |
| `salt?` | `string` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/attestations.ts:22](https://github.com/celo-org/celo-monorepo/tree/master/attestations.ts#L22)

___

### hexToBuffer

▸ `Const` **hexToBuffer**(`input`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`Buffer`

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:26](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L26)

___

### intersection

▸ **intersection**<`T`\>(`arrays`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arrays` | `T`[][] |

#### Returns

`T`[]

#### Defined in

[celo-monorepo/packages/sdk/base/src/collections.ts:32](https://github.com/celo-org/celo-monorepo/tree/master/collections.ts#L32)

___

### isAccountConsideredVerified

▸ **isAccountConsideredVerified**(`stats`, `numAttestationsRequired?`, `attestationThreshold?`): [`AttestationsStatus`](interfaces/attestationsstatus.md)

Returns true if an AttestationStat is considered verified using the given factors,
or defaults if factors are ommited.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stats` | `AttestationStat` \| `undefined` | AttestationStat of the account's attestation identitifer, retrievable via lookupIdentitfiers |
| `numAttestationsRequired` | `number` | Optional number of attestations required.  Will default to  hardcoded value if absent. |
| `attestationThreshold` | `number` | Optional threshold for fraction attestations completed. Will  default to hardcoded value if absent. |

#### Returns

[`AttestationsStatus`](interfaces/attestationsstatus.md)

#### Defined in

[celo-monorepo/packages/sdk/base/src/attestations.ts:88](https://github.com/celo-org/celo-monorepo/tree/master/attestations.ts#L88)

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

[celo-monorepo/packages/sdk/base/src/contacts.ts:26](https://github.com/celo-org/celo-monorepo/tree/master/contacts.ts#L26)

___

### isE164Number

▸ **isE164Number**(`phoneNumber`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `phoneNumber` | `string` |

#### Returns

`boolean`

#### Defined in

[celo-monorepo/packages/sdk/base/src/phoneNumbers.ts:27](https://github.com/celo-org/celo-monorepo/tree/master/phoneNumbers.ts#L27)

___

### isHexString

▸ `Const` **isHexString**(`input`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`boolean`

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:24](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L24)

___

### isNullAddress

▸ `Const` **isNullAddress**(`a`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `string` |

#### Returns

`boolean`

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:11](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L11)

___

### isValidUrl

▸ `Const` **isValidUrl**(`url`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`boolean`

#### Defined in

[celo-monorepo/packages/sdk/base/src/io.ts:6](https://github.com/celo-org/celo-monorepo/tree/master/io.ts#L6)

___

### linkedListChange

▸ **linkedListChange**<`T`\>(`sortedList`, `change`, `comparator`): `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sortedList` | [`AddressListItem`](interfaces/addresslistitem.md)<`T`\>[] |
| `change` | [`AddressListItem`](interfaces/addresslistitem.md)<`T`\> |
| `comparator` | [`Comparator`](modules.md#comparator)<`T`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `greater` | `string` |
| `lesser` | `string` |
| `list` | [`AddressListItem`](interfaces/addresslistitem.md)<`T`\>[] |

#### Defined in

[celo-monorepo/packages/sdk/base/src/collections.ts:90](https://github.com/celo-org/celo-monorepo/tree/master/collections.ts#L90)

___

### linkedListChanges

▸ **linkedListChanges**<`T`\>(`sortedList`, `changeList`, `comparator`): `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sortedList` | [`AddressListItem`](interfaces/addresslistitem.md)<`T`\>[] |
| `changeList` | [`AddressListItem`](interfaces/addresslistitem.md)<`T`\>[] |
| `comparator` | [`Comparator`](modules.md#comparator)<`T`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `greaters` | `string`[] |
| `lessers` | `string`[] |
| `list` | [`AddressListItem`](interfaces/addresslistitem.md)<`T`\>[] |

#### Defined in

[celo-monorepo/packages/sdk/base/src/collections.ts:100](https://github.com/celo-org/celo-monorepo/tree/master/collections.ts#L100)

___

### makeAsyncThrowable

▸ **makeAsyncThrowable**<`TArgs`, `TResult`, `TError`, `TModifiedError`\>(`f`, `errorModifier?`): (...`args`: `TArgs`) => `Promise`<`TResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `any`[] |
| `TResult` | `TResult` |
| `TError` | extends `Error` |
| `TModifiedError` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (...`args`: `TArgs`) => `Promise`<[`Result`](modules.md#result)<`TResult`, `TError`\>\> |
| `errorModifier?` | (`error`: `TError`) => `TModifiedError` |

#### Returns

`fn`

▸ (...`args`): `Promise`<`TResult`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `TArgs` |

##### Returns

`Promise`<`TResult`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/result.ts:47](https://github.com/celo-org/celo-monorepo/tree/master/result.ts#L47)

___

### makeThrowable

▸ **makeThrowable**<`TArgs`, `TResult`, `TError`, `TModifiedError`\>(`f`, `errorModifier?`): (...`args`: `TArgs`) => `TResult`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `any`[] |
| `TResult` | `TResult` |
| `TError` | extends `Error` |
| `TModifiedError` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (...`args`: `TArgs`) => [`Result`](modules.md#result)<`TResult`, `TError`\> |
| `errorModifier?` | (`error`: `TError`) => `TModifiedError` |

#### Returns

`fn`

▸ (...`args`): `TResult`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `TArgs` |

##### Returns

`TResult`

#### Defined in

[celo-monorepo/packages/sdk/base/src/result.ts:35](https://github.com/celo-org/celo-monorepo/tree/master/result.ts#L35)

___

### mapAddressListDataOnto

▸ **mapAddressListDataOnto**<`T`\>(`data`, `oldAddress`, `newAddress`, `initialValue`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T`[] |
| `oldAddress` | [`Address`](modules.md#address)[] |
| `newAddress` | [`Address`](modules.md#address)[] |
| `initialValue` | `T` |

#### Returns

`T`[]

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:69](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L69)

___

### mapAddressListOnto

▸ `Const` **mapAddressListOnto**(`oldAddress`, `newAddress`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldAddress` | `string`[] |
| `newAddress` | `string`[] |

#### Returns

`any`[]

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:36](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L36)

___

### messageContainsAttestationCode

▸ **messageContainsAttestationCode**(`message`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`boolean`

#### Defined in

[celo-monorepo/packages/sdk/base/src/attestations.ts:49](https://github.com/celo-org/celo-monorepo/tree/master/attestations.ts#L49)

___

### noopLogger

▸ `Const` **noopLogger**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

[celo-monorepo/packages/sdk/base/src/logger.ts:3](https://github.com/celo-org/celo-monorepo/tree/master/logger.ts#L3)

___

### normalizeAccents

▸ **normalizeAccents**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/string.ts:10](https://github.com/celo-org/celo-monorepo/tree/master/string.ts#L10)

___

### normalizeAddress

▸ `Const` **normalizeAddress**(`a`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `string` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:9](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L9)

___

### normalizeAddressWith0x

▸ `Const` **normalizeAddressWith0x**(`a`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `string` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:13](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L13)

___

### notEmpty

▸ **notEmpty**<`TValue`\>(`value`): value is TValue

#### Type parameters

| Name |
| :------ |
| `TValue` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `TValue` \| ``null`` \| `undefined` |

#### Returns

value is TValue

#### Defined in

[celo-monorepo/packages/sdk/base/src/collections.ts:28](https://github.com/celo-org/celo-monorepo/tree/master/collections.ts#L28)

___

### parseJsonAsResult

▸ **parseJsonAsResult**(`data`): [`OkResult`](interfaces/okresult.md)<`any`\> \| [`ErrorResult`](interfaces/errorresult.md)<[`JSONParseError`](classes/jsonparseerror.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

[`OkResult`](interfaces/okresult.md)<`any`\> \| [`ErrorResult`](interfaces/errorresult.md)<[`JSONParseError`](classes/jsonparseerror.md)\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/result.ts:84](https://github.com/celo-org/celo-monorepo/tree/master/result.ts#L84)

___

### parseSolidityStringArray

▸ `Const` **parseSolidityStringArray**(`stringLengths`, `data`): `string`[]

Parses an "array of strings" that is returned from a Solidity function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stringLengths` | `number`[] | length of each string in bytes |
| `data` | `string` | 0x-prefixed, hex-encoded string data in utf-8 bytes |

#### Returns

`string`[]

#### Defined in

[celo-monorepo/packages/sdk/base/src/parsing.ts:17](https://github.com/celo-org/celo-monorepo/tree/master/parsing.ts#L17)

___

### pipeToFuture

▸ **pipeToFuture**<`A`\>(`p`, `future`): [`Future`](classes/future.md)<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `Promise`<`A`\> |
| `future` | [`Future`](classes/future.md)<`A`\> |

#### Returns

[`Future`](classes/future.md)<`A`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/future.ts:50](https://github.com/celo-org/celo-monorepo/tree/master/future.ts#L50)

___

### prefixLogger

▸ `Const` **prefixLogger**(`prefix`, `logger`): [`Logger`](modules.md#logger)

#### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |
| `logger` | [`Logger`](modules.md#logger) |

#### Returns

[`Logger`](modules.md#logger)

#### Defined in

[celo-monorepo/packages/sdk/base/src/logger.ts:7](https://github.com/celo-org/celo-monorepo/tree/master/logger.ts#L7)

___

### repeatTask

▸ **repeatTask**(`opts`, `fn`): [`RunningTask`](interfaces/runningtask.md)

Runs an async function eternally until stopped

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `RepeatTaskOptions` | - |
| `fn` | (`ctx`: [`RepeatTaskContext`](interfaces/repeattaskcontext.md)) => `Promise`<`void`\> | function to run |

#### Returns

[`RunningTask`](interfaces/runningtask.md)

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:54](https://github.com/celo-org/celo-monorepo/tree/master/task.ts#L54)

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

[celo-monorepo/packages/sdk/base/src/currencies.ts:33](https://github.com/celo-org/celo-monorepo/tree/master/currencies.ts#L33)

___

### retryAsync

▸ `Const` **retryAsync**<`T`, `U`\>(`inFunction`, `tries`, `params`, `delay?`, `logger?`): `Promise`<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `inFunction` | `InFunction`<`T`, `U`\> | `undefined` |
| `tries` | `number` | `undefined` |
| `params` | `T` | `undefined` |
| `delay` | `number` | `100` |
| `logger` | ``null`` \| [`Logger`](modules.md#logger) | `null` |

#### Returns

`Promise`<`U`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/async.ts:14](https://github.com/celo-org/celo-monorepo/tree/master/async.ts#L14)

___

### retryAsyncWithBackOff

▸ `Const` **retryAsyncWithBackOff**<`T`, `U`\>(`inFunction`, `tries`, `params`, `delay?`, `factor?`, `logger?`): `Promise`<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `inFunction` | `InFunction`<`T`, `U`\> | `undefined` |
| `tries` | `number` | `undefined` |
| `params` | `T` | `undefined` |
| `delay` | `number` | `100` |
| `factor` | `number` | `1.5` |
| `logger` | ``null`` \| [`Logger`](modules.md#logger) | `null` |

#### Returns

`Promise`<`U`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/async.ts:40](https://github.com/celo-org/celo-monorepo/tree/master/async.ts#L40)

___

### retryAsyncWithBackOffAndTimeout

▸ `Const` **retryAsyncWithBackOffAndTimeout**<`T`, `U`\>(`inFunction`, `tries`, `params`, `delayMs?`, `factor?`, `timeoutMs?`, `logger?`): `Promise`<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `inFunction` | `InFunction`<`T`, `U`\> | `undefined` |
| `tries` | `number` | `undefined` |
| `params` | `T` | `undefined` |
| `delayMs` | `number` | `100` |
| `factor` | `number` | `1.5` |
| `timeoutMs` | `number` | `2000` |
| `logger` | ``null`` \| [`Logger`](modules.md#logger) | `null` |

#### Returns

`Promise`<`U`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/async.ts:102](https://github.com/celo-org/celo-monorepo/tree/master/async.ts#L102)

___

### sanitizeMessageBase64

▸ **sanitizeMessageBase64**(`base64String`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `base64String` | `string` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/attestations.ts:40](https://github.com/celo-org/celo-monorepo/tree/master/attestations.ts#L40)

___

### selectiveRetryAsyncWithBackOff

▸ `Const` **selectiveRetryAsyncWithBackOff**<`T`, `U`\>(`inFunction`, `tries`, `dontRetry`, `params`, `delay?`, `factor?`, `logger?`): `Promise`<`U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `inFunction` | `InFunction`<`T`, `U`\> | `undefined` |
| `tries` | `number` | `undefined` |
| `dontRetry` | `string`[] | `undefined` |
| `params` | `T` | `undefined` |
| `delay` | `number` | `100` |
| `factor` | `number` | `1.5` |
| `logger` | ``null`` \| [`Logger`](modules.md#logger) | `null` |

#### Returns

`Promise`<`U`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/async.ts:68](https://github.com/celo-org/celo-monorepo/tree/master/async.ts#L68)

___

### serializeSignature

▸ **serializeSignature**(`signature`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `signature` | [`Signature`](interfaces/signature.md) |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/signatureUtils.ts:25](https://github.com/celo-org/celo-monorepo/tree/master/signatureUtils.ts#L25)

___

### sleep

▸ **sleep**(`ms`): `Promise`<`void`\>

Sleep for a number of milliseconds

#### Parameters

| Name | Type |
| :------ | :------ |
| `ms` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/async.ts:6](https://github.com/celo-org/celo-monorepo/tree/master/async.ts#L6)

___

### stringToBoolean

▸ `Const` **stringToBoolean**(`inputString`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputString` | `string` |

#### Returns

`boolean`

#### Defined in

[celo-monorepo/packages/sdk/base/src/parsing.ts:1](https://github.com/celo-org/celo-monorepo/tree/master/parsing.ts#L1)

___

### throwIfError

▸ **throwIfError**<`TResult`, `TError`, `TModifiedError`\>(`result`, `errorModifier?`): `TResult`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `TResult` |
| `TError` | extends `Error` |
| `TModifiedError` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`Result`](modules.md#result)<`TResult`, `TError`\> |
| `errorModifier?` | (`error`: `TError`) => `TModifiedError` |

#### Returns

`TResult`

#### Defined in

[celo-monorepo/packages/sdk/base/src/result.ts:21](https://github.com/celo-org/celo-monorepo/tree/master/result.ts#L21)

___

### timeout

▸ `Const` **timeout**<`T`, `U`\>(`inFunction`, `params`, `timeoutMs`, `timeoutError`, `timeoutLogMsg?`, `logger?`): `Promise`<`U`\>

Wraps an async function in a timeout before calling it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `inFunction` | `InFunction`<`T`, `U`\> | `undefined` | The async function to call |
| `params` | `T` | `undefined` | The parameters of the async function |
| `timeoutMs` | `number` | `undefined` | The timeout in milliseconds |
| `timeoutError` | `any` | `undefined` | The value to which the returned Promise should reject to |
| `timeoutLogMsg` | ``null`` \| `string` | `null` | - |
| `logger` | ``null`` \| [`Logger`](modules.md#logger) | `null` | - |

#### Returns

`Promise`<`U`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/async.ts:173](https://github.com/celo-org/celo-monorepo/tree/master/async.ts#L173)

___

### toFuture

▸ **toFuture**<`A`\>(`p`): [`Future`](classes/future.md)<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `Promise`<`A`\> |

#### Returns

[`Future`](classes/future.md)<`A`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/future.ts:45](https://github.com/celo-org/celo-monorepo/tree/master/future.ts#L45)

___

### trimLeading0x

▸ `Const` **trimLeading0x**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/address.ts:15](https://github.com/celo-org/celo-monorepo/tree/master/address.ts#L15)

___

### tryObtainValueWithRetries

▸ **tryObtainValueWithRetries**<`A`\>(`opts`): [`RunningTaskWithValue`](interfaces/runningtaskwithvalue.md)<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | [`RetryTaskOptions`](interfaces/retrytaskoptions.md)<`A`\> |

#### Returns

[`RunningTaskWithValue`](interfaces/runningtaskwithvalue.md)<`A`\>

#### Defined in

[celo-monorepo/packages/sdk/base/src/task.ts:128](https://github.com/celo-org/celo-monorepo/tree/master/task.ts#L128)

___

### validateDecimal

▸ **validateDecimal**(`input`, `decimalSeparator?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `string` | `undefined` |
| `decimalSeparator` | `string` | `'.'` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/inputValidation.ts:19](https://github.com/celo-org/celo-monorepo/tree/master/inputValidation.ts#L19)

___

### validateInteger

▸ **validateInteger**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

#### Defined in

[celo-monorepo/packages/sdk/base/src/inputValidation.ts:15](https://github.com/celo-org/celo-monorepo/tree/master/inputValidation.ts#L15)

___

### zeroRange

▸ **zeroRange**(`to`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `to` | `number` |

#### Returns

`number`[]

#### Defined in

[celo-monorepo/packages/sdk/base/src/collections.ts:23](https://github.com/celo-org/celo-monorepo/tree/master/collections.ts#L23)

___

### zip

▸ **zip**<`A`, `B`, `C`\>(`fn`, `as`, `bs`): `C`[]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`a`: `A`, `b`: `B`) => `C` |
| `as` | `A`[] |
| `bs` | `B`[] |

#### Returns

`C`[]

#### Defined in

[celo-monorepo/packages/sdk/base/src/collections.ts:3](https://github.com/celo-org/celo-monorepo/tree/master/collections.ts#L3)

___

### zip3

▸ **zip3**<`A`, `B`, `C`\>(`as`, `bs`, `cs`): [`A`, `B`, `C`][]

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `as` | `A`[] |
| `bs` | `B`[] |
| `cs` | `C`[] |

#### Returns

[`A`, `B`, `C`][]

#### Defined in

[celo-monorepo/packages/sdk/base/src/collections.ts:13](https://github.com/celo-org/celo-monorepo/tree/master/collections.ts#L13)
