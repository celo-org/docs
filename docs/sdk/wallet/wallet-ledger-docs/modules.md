---
id: "modules"
title: "@celo/wallet-ledger"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [AddressValidation](enums/addressvalidation.md)

## Classes

- [LedgerSigner](classes/ledgersigner.md)
- [LedgerWallet](classes/ledgerwallet.md)

## Variables

### CELO\_BASE\_DERIVATION\_PATH

• `Const` **CELO\_BASE\_DERIVATION\_PATH**: `string`

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:11](https://github.com/celo-org/celo-monorepo/tree/master/ledger-wallet.ts#L11)

## Functions

### newLedgerWalletWithSetup

▸ **newLedgerWalletWithSetup**(`transport`, `derivationPathIndexes?`, `baseDerivationPath?`, `ledgerAddressValidation?`): `Promise`<[`LedgerWallet`](classes/ledgerwallet.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transport` | `any` |
| `derivationPathIndexes?` | `number`[] |
| `baseDerivationPath?` | `string` |
| `ledgerAddressValidation?` | [`AddressValidation`](enums/addressvalidation.md) |

#### Returns

`Promise`<[`LedgerWallet`](classes/ledgerwallet.md)\>

#### Defined in

[wallet-ledger/src/ledger-wallet.ts:26](https://github.com/celo-org/celo-monorepo/tree/master/ledger-wallet.ts#L26)
