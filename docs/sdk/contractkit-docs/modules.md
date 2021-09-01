---
id: "modules"
title: "@celo/contractkit"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [ContractKit](classes/contractkit.md)

## Interfaces

- [NetworkConfig](interfaces/networkconfig.md)

## Variables

### GET\_IMPLEMENTATION\_ABI

• `Const` **GET\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[proxy.ts:31](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/contractkit/src/proxy.ts#L31)

___

### PROXY\_ABI

• `Const` **PROXY\_ABI**: `ABIDefinition`[]

#### Defined in

[proxy.ts:83](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/contractkit/src/proxy.ts#L83)

___

### PROXY\_SET\_AND\_INITIALIZE\_IMPLEMENTATION\_SIGNATURE

• `Const` **PROXY\_SET\_AND\_INITIALIZE\_IMPLEMENTATION\_SIGNATURE**: `string`

#### Defined in

[proxy.ts:90](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/contractkit/src/proxy.ts#L90)

___

### PROXY\_SET\_IMPLEMENTATION\_SIGNATURE

• `Const` **PROXY\_SET\_IMPLEMENTATION\_SIGNATURE**: `string`

#### Defined in

[proxy.ts:89](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/contractkit/src/proxy.ts#L89)

___

### SET\_AND\_INITIALIZE\_IMPLEMENTATION\_ABI

• `Const` **SET\_AND\_INITIALIZE\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[proxy.ts:63](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/contractkit/src/proxy.ts#L63)

___

### SET\_IMPLEMENTATION\_ABI

• `Const` **SET\_IMPLEMENTATION\_ABI**: `ABIDefinition`

#### Defined in

[proxy.ts:47](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/contractkit/src/proxy.ts#L47)

## Functions

### getInitializeAbiOfImplementation

▸ `Const` **getInitializeAbiOfImplementation**(`proxyContractName`): `AbiItem`

#### Parameters

| Name | Type |
| :------ | :------ |
| `proxyContractName` | ``"AccountsProxy"`` \| ``"AttestationsProxy"`` \| ``"BlockchainParametersProxy"`` \| ``"DoubleSigningSlasherProxy"`` \| ``"DowntimeSlasherProxy"`` \| ``"ElectionProxy"`` \| ``"EpochRewardsProxy"`` \| ``"EscrowProxy"`` \| ``"ExchangeProxy"`` \| ``"ExchangeEURProxy"`` \| ``"FeeCurrencyWhitelistProxy"`` \| ``"FreezerProxy"`` \| ``"GasPriceMinimumProxy"`` \| ``"GoldTokenProxy"`` \| ``"GovernanceProxy"`` \| ``"GrandaMentoProxy"`` \| ``"LockedGoldProxy"`` \| ``"MetaTransactionWalletProxy"`` \| ``"MetaTransactionWalletDeployerProxy"`` \| ``"MultiSigProxy"`` \| ``"ProxyProxy"`` \| ``"RandomProxy"`` \| ``"RegistryProxy"`` \| ``"ReserveProxy"`` \| ``"SortedOraclesProxy"`` \| ``"StableTokenProxy"`` \| ``"StableTokenEURProxy"`` \| ``"TransferWhitelistProxy"`` \| ``"ValidatorsProxy"`` |

#### Returns

`AbiItem`

#### Defined in

[proxy.ts:127](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/contractkit/src/proxy.ts#L127)

___

### newKit

▸ **newKit**(`url`, `wallet?`): [`ContractKit`](classes/contractkit.md)

Creates a new instance of `ContractKit` give a nodeUrl

**`optional`** wallet to reuse or add a wallet different that the default (example ledger-wallet)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | CeloBlockchain node url |
| `wallet?` | `ReadOnlyWallet` | - |

#### Returns

[`ContractKit`](classes/contractkit.md)

#### Defined in

[kit.ts:38](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/contractkit/src/kit.ts#L38)

___

### newKitFromWeb3

▸ **newKitFromWeb3**(`web3`, `wallet?`): [`ContractKit`](classes/contractkit.md)

Creates a new instance of the `ContractKit` with a web3 instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `web3` | `Web3` | Web3 instance |
| `wallet` | `ReadOnlyWallet` | - |

#### Returns

[`ContractKit`](classes/contractkit.md)

#### Defined in

[kit.ts:49](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/contractkit/src/kit.ts#L49)

___

### setImplementationOnProxy

▸ `Const` **setImplementationOnProxy**(`address`, `web3`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `web3` | `default` |

#### Returns

`any`

#### Defined in

[proxy.ts:137](https://github.com/celo-org/docs/blob/36f0e03d3/celo-monorepo/packages/sdk/contractkit/src/proxy.ts#L137)
