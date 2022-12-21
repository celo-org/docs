---
title: Migrating to ContractKit v2.0
description: How to migrate from v1 to v2 ContractKit suite of packages and make use of their latest features.
---

How to migrate from v1 to v2 of the Celo SDK suite of packages and make use of their latest features.

---

## Why v2?

### Bundle Size

The primary motivation in creating v2 was reduced bundlesize and increased modularity. The massive package size for `@celo/contractkit` has been an elephant in the room and source of dissonance for looking to build mobile first dApps. As of 1.5.2 bundlephobia list the minified size at 3.7MB. 2.0.0 comes in at 1.7MB. still big yet we have a few more tricks. First the packages have been all marked as `sideEffects:false`, a `kit` instance is no longer required to any classes in the contractkit package, and the introduction of `MiniContractKit`.

### Modularity

#### `sideEffects:false`

Tells your bundler it can safely only include the code that is explicitly used, reducing bundlesize.

#### `kit` no longer needed by everything

In v1 Almost everything required a `kit` instance to be passed to its constructor. Effectively this meant it was impossible to use any of the classes in @celo/contractkit alone.

In v2 AddressRegistry, Wrappers, WrapperCache, and more can all be constructed using mostly just a `Connection` (sometimes other arguments too).

#### `MiniContractKit`

The prize of no longer needing a full `kit` is that it became possible to create a slimmed down minimal viable ContractKit.

`MiniContractKit` provides a subset of ContractKit features with the same interface. For many dapps it will be a drop in opt-in change (eg `import {newKit, ContractKit} from "@celo/contractkit/lib/mini/kit`). It reduces size by only including access to `Accounts, StableToken*, Exchange* and GoldToken` wrappers and contracts. It can `setFeeCurrency`, look up info about the current account and, like full Contractkit, it delegates most functionality to `connection`.

## Get Started

Upgrade your project packages to the latest (in this case release beta, but anything over 2 will work when it's out of beta). For example, with ContractKit and Celo utils:

`yarn add @celo/contractkit@beta @celo/utils@beta`

If you are directly importing any other `@celo/*` packages, upgrade them as well.

If you need them, append `@celo/phone-utils@beta` `@celo/cryptographic-utils@beta`.

_(see section on breaks in [@celo/utils](#celoutils) to know if you need them)_

## Breaking changes

Because of how we publish packages, all packages will be upgraded to v2. However not all packages will have breaking changes. Breaking changes are limited to:

- [@celo/contractkit](#celocontractkit)
- [@celo/utils](#celoutils)

### @celo/contractkit

Most changes are about eliminating the need to construct an entire kit to use other classes and functions.

#### AddressRegistry

Now takes an `Connection` instance instead of a `kit` instance.

#### CeloTokens

No longer requires `kit`, instead it requires a class implementing `ContractCacheType` to be passed in. Examples are `WrapperCache` or `CeloTokensCache`.

#### Wrappers

**Note: If you were constructing wrappers with `kit.contracts.getX` no change is required.**

Rather than take the full Kit Wrappers, now construct it like:

```javascript
// Most Common
constructor(connection: Connection, contract: Contract)
// The Voting Contracts (Governance, Election, Validator, LockedGold, Slashers, and Attestations
constructor(connection: Connection, contract: Contract, wrapperCache: WrapperCache)
// Sorted Oracles
constructor(connection: Connection, contract: Contract, addressRegistry:  AddressRegistry)
```

The `WrapperCache` takes care of this while constructing them and most likely there will not be many situations where wrappers were constructed directly given they needed a `kit` before.

##### AccountsWrapper

`authorizeValidatorSigner` method now requires a `ValidatorsWrapper` be passed in as final argument.

_v1_

```ts
const accountsInstance = await kit.contracts.getAccountsWrapper();

accountsInstance.authorizeValidatorSigner(signer, sig);
```

_v2_

```ts
const accountsInstance = await kit.contracts.getAccountsWrapper();
const validatorsInstance = await kit.contracts.getValidatorsWrapper();

accountsInstance.authorizeValidatorSigner(signer, sig, validatorsInstance);
```

##### AttestationsWrapper

`AttestationsWrapper.getConfig()` and`AttestationsWrapper.getHumanReadableConfig()`

These functions now require an array of fee payable token addresses. You can get these from the CeloTokens class, the Registry, or Token Contracts

```typescript
const celoTokens = kit.celoTokens;
const eachTokenAddress = await celoTokens.getAddresses();
const addresses = Object.values(eachTokenAddress);

AttestationsWrapper.getConfig(addresses);
// OR
AttestationsWrapper.getHumanReadableConfig(addresses);
```

#### Web3ContractCache

Instead of a `kit` instance, it requires only a `AddressRegistry` (uses AddressRegistry's web3 instances).

### @celo/utils

Most of the size savings came from removing functionality from `@celo/utils` into two new packages `@celo/phone-utils` and `@celo/cryptographic-utils`

So depending on what you used you will need to add one or both to your package.json.

#### Phone Utils

If your packages imports any of the following from `@celo/utils` you will need to change the import to `@celo/phone-utils`

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

If your packages imports any of the following from `@celo/utils` you will need to change the import to `@celo/cryptographic-utils`

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
