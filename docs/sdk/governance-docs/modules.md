---
id: "modules"
title: "@celo/governance"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [InteractiveProposalBuilder](classes/interactiveproposalbuilder.md)
- [ProposalBuilder](classes/proposalbuilder.md)

## Interfaces

- [ProposalTransactionJSON](interfaces/proposaltransactionjson.md)

## Variables

### hotfixExecuteAbi

• `Const` **hotfixExecuteAbi**: `AbiItem`

#### Defined in

[proposals.ts:45](https://github.com/celo-org/celo-monorepo/tree/master/proposals.ts#L45)

## Functions

### hotfixToEncodedParams

▸ `Const` **hotfixToEncodedParams**(`kit`, `proposal`, `salt`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |
| `proposal` | `Proposal` |
| `salt` | `Buffer` |

#### Returns

`string`

#### Defined in

[proposals.ts:47](https://github.com/celo-org/celo-monorepo/tree/master/proposals.ts#L47)

___

### hotfixToHash

▸ `Const` **hotfixToHash**(`kit`, `proposal`, `salt`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `kit` | `ContractKit` |
| `proposal` | `Proposal` |
| `salt` | `Buffer` |

#### Returns

`Buffer`

#### Defined in

[proposals.ts:53](https://github.com/celo-org/celo-monorepo/tree/master/proposals.ts#L53)

___

### proposalToJSON

▸ `Const` **proposalToJSON**(`kit`, `proposal`): `Promise`<[`ProposalTransactionJSON`](interfaces/proposaltransactionjson.md)[]\>

Convert a compiled proposal to a human-readable JSON form using network information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kit` | `ContractKit` | Contract kit instance used to resolve addresses to contract names. |
| `proposal` | `Proposal` | A constructed proposal object. |

#### Returns

`Promise`<[`ProposalTransactionJSON`](interfaces/proposaltransactionjson.md)[]\>

The JSON encoding of the proposal.

#### Defined in

[proposals.ts:122](https://github.com/celo-org/celo-monorepo/tree/master/proposals.ts#L122)
