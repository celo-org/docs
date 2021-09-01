---
id: "proposaltransactionjson"
title: "Interface: ProposalTransactionJSON"
sidebar_label: "ProposalTransactionJSON"
sidebar_position: 0
custom_edit_url: null
---

JSON encoding of a proposal transaction.

Example:
```json
{
  "contract": "Election",
  "function": "setElectableValidators",
  "args": [ "1", "120" ],
  "value": "0"
}
```

## Properties

### args

• **args**: `any`[]

#### Defined in

[proposals.ts:72](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L72)

___

### contract

• **contract**: `CeloContract`

#### Defined in

[proposals.ts:70](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L70)

___

### function

• **function**: `string`

#### Defined in

[proposals.ts:71](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L71)

___

### params

• `Optional` **params**: `Record`<`string`, `any`\>

#### Defined in

[proposals.ts:73](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L73)

___

### value

• **value**: `string`

#### Defined in

[proposals.ts:74](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/governance/src/proposals.ts#L74)
