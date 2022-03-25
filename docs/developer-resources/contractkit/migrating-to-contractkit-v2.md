---
title: Migrating to ContractKit v2.0
description: How to migrate from v1 to v2 ContractKit suite of packages and make use of their latest features.
slug: /developer-guide/contractkit/migrating-to-contractkit-v2
---


How to migrate from v1 to v2 of the Celo SDK suite of packages and make use of their latest features.

___

## Why v2?

### Bundlesize

The primary motivation in creating v2 was reduced bundlesize and increased real modularity. The massive package size for `@celo/contractkit` has been an elephant in the room and source of dissonance for looking to build mobile first dApps. As of 1.5.2 bundlephobia list the minified size at 3.7MB. 2.0.0 comes in at 1.7MB. stull big yet we have a few more tricks. First the packages have been all marked as `sideEffects:false`, `kit` instance is no longer required to any classes in the contractkit package, and the introduction `MiniContractKit`


### Modularity

#### `sideEffects:false`

tells your bundler it can safely only include the code that is explicitly used, reducing real world bundlesize

#### `kit` no longer needed by everything

In v1 Almost everything required a Kit to be passed to its constructor, effectively this meant it was impossible to use any of the classes in @celo/contractkit alone.

In v2 AddressRegistry, Wrappers, WrapperCache, and more can all be constructed using mostly just a `Connection`(Sometimes other arguments too).

#### `MiniContractKit`

The prize of no longer needing a full kit is that it became possible to create a slimed down minimal viable ContractKit.

`MiniContractKit` provides a subset of ContractKit features with the same interface. For many dapps it will be a drop in opt-in change eg `import {newKit, ContractKit} from "@celo/contractkit/lib/mini/kit` It drops weight by only including Access to `Accounts, GasPriceMinimum, StableToken*, Exchange* and GoldToken` wrappers and contracts. It can setFeeCurrency, look up info about the current account, and like Full Contractkit delegates most functionality to `connection`


## Get Started

Upgrade The packages your project uses to the latest (in this case release beta).  For example if ContractKit and Celo Utils.

`yarn add @celo/contractkit@beta @celo/utils@beta`

if you are directly importing any other  @celo/* packages upgrade them as well for full benefit**


if you need them append `@celo/phone-utils@beta` `@celo/cryptographic-utils@beta`

*(see section on breaks in [@celo/utils](#celoutils) to know if you need them)*

## Breaking changes

Because of how we publish packages all will be upgraded to v2. However not all will have true breaking changes. Breaks are limited to

- [@celo/contractkit](#celocontractkit)
- [@celo/utils](#celoutils)


### @celo/contractkit

Most changes here are about eliminating the need to construct an entire kit to use classes and functions. and thus giving us the dream of a modular sdk

#### IdentityMetadataWrapper (idendity/metadata.ts)

This had functions that took a `kit` as a param. Now Takes an AcountsWrapper class as that is all the kit was used for. This change was done so that `kit` was not required to be passed into all the classes and functions that use `IdentityMetadataWrapper`

*v1

```typescript
IdentityMetadataWrapper.fetchFromURL(kit, url)

IdentityMetadataWrapper.fromFile(kit, path)

IdentityMetadataWrapper.verifySignerForAddress(kit, hash, signature, address)
IdentityMetadataWrapper.fromRawString(kit, rawData)

```

*v2

```typescript
const accounts = await kit.contracts.getAccounts()

IdentityMetadataWrapper.fetchFromURL(accounts, url)

IdentityMetadataWrapper.fromFile(accounts, path)

IdentityMetadataWrapper.verifySignerForAddress(accounts, hash, signature, address)
IdentityMetadataWrapper.fromRawString(accounts, rawData)

```

#### AddressRegistry

now takes an `Connection` instance instead of a `kit`

#### CeloTokens

no longer requires kit instead requires a Class implementing `ContractCacheType` to be passed. Examples are `WrapperCache` or `CeloTokensCache`

#### Wrappers

**Note if you were constructing wrappers with `kit.contracts.getX` no change is required.**

Rather than take the full Kit Wrappers now construct like

```javascript
///Most Common
constructor(connection: Connection, contract: Contract)
// The Voting Contracts (Governance, Election, Validator, LockedGold, Slashers, and Attestations
constructor(connection: Connection, contract: Contract, wrapperCache: WrapperCache)
 // Sorted Oracles
constructor(connection: Connection, contract: Contract, addressRegistry:  AddressRegistry)
```

The `WrapperCache` takes care of this while constructing them and most likely there will not be many situations where Wrappers were constructed  directly given they needed a kit before.

##### AccountsWrapper

`authorizeValidatorSigner` method now requires a `ValidatorsWrapper` be passed in as final argument.

*v1*

```ts

const accountsInstance = await kit.contracts.getAccountsWrapper()

accountsInstance.authorizeValidatorSigner(signer, sig)

```

*v2*

```ts

const accountsInstance = await kit.contracts.getAccountsWrapper()
const validatorsInstance = await kit.contracts.getValidatorsWrapper()


  accountsInstance.authorizeValidatorSigner(signer, sig, validatorsInstance)

```

#### Web3ContractCache

Instead of a `kit` requires only a `AddressRegistry` (uses AddressRegistry's web3 instances)

### @celo/utils

Most of the size savings came from removing functionality from `@celo/utils` into two new packages `@celo/phone-utils` and `@celo/cryptographic-utils`

So depending on what you used you will need to add one or both to your package.json

#### Phone Utils

if your packages imports any of the following from `@celo/utils` you will need to change the import to `@celo/phone-utils`

##### from countries.ts

- `CountryNames`
- `LocalizedCountry`
- `Countries`

##### from getCountryEmoji.ts

- `getCountryEmoji`

##### from getPhoneHash.ts

- default (getPhoneHash)

##### from inputValidation.ts

- `validatePhone`
- `validateInput`

##### from io.ts

- `AttestationRequestType`
- `AttestationResponseType`
- `AttestationResponse`
- `AttestationServiceTestRequestType`
- `AttestationServiceTestRequest`
- `E164PhoneNumberType`
- `E164Number`
- `GetAttestationRequestType`

##### from phoneNumbers.ts

- `getCountryCode`

- `getRegionCode`

- `getRegionCodeFromCountryCode`

- `getDisplayPhoneNumber`

- `getDisplayNumberInternational`

- `getE164DisplayNumber`

- `getE164Number`

- `isE164NumberStrict`

- `parsePhoneNumber`

- `getExampleNumber`

#### Cryptographic-utils

if your packages imports any of the following from `@celo/utils` you will need to change the import to `@celo/cryptographic-utils`

##### from account.ts

- `generateKeys`

- `generateKeysFromSeed`

- `generateDeterministicInviteCode`

- `generateSeed`

- `generateMnemonic`

- `validateMnemonic`

- `invalidMnemonicWords`

- `normalizeMnemonic`

- `formatNonAccentedCharacters`

- `getAllLanguages`

- `mnemonicLengthFromStrength`

- `detectMnemonicLanguage`

- `suggestMnemonicCorrections`

##### from bls.ts

- `BLS_PUBLIC_KEY_SIZE`
- `BLS_POP_SIZE`
- `blsPrivateKeyToProcessedPrivateKey`
- `getBlsPublicKey`
- `getBlsPoP`

##### from commentEncryption.ts

- `EncryptionStatus`
- `encryptData`
- `decryptData`
- `encryptComment`
- `decryptComment`

##### from dataEncryption.ts

- `compressedPubKey`
- `decompressPublicKey`
- `deriveDek`
