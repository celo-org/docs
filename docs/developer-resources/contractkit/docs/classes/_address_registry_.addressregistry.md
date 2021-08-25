---
title: AddressRegistry
---

[@celo/contractkit](../README.md) › [Globals](../globals.md) › ["address-registry"](../modules/_address_registry_.md) › [AddressRegistry](_address_registry_.addressregistry.md)

# Class: AddressRegistry

Celo Core Contract's Address Registry

## Hierarchy

* **AddressRegistry**

## Index

### Constructors

* [constructor](_address_registry_.addressregistry.md#constructor)

### Methods

* [addressFor](_address_registry_.addressregistry.md#addressfor)
* [addressMapping](_address_registry_.addressregistry.md#addressmapping)
* [addressMappingWithNotDeployedContracts](_address_registry_.addressregistry.md#addressmappingwithnotdeployedcontracts)

## Constructors

###  constructor

\+ **new AddressRegistry**(`kit`: [ContractKit](_kit_.contractkit.md)): *[AddressRegistry](_address_registry_.addressregistry.md)*

*Defined in [contractkit/src/address-registry.ts:17](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/address-registry.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`kit` | [ContractKit](_kit_.contractkit.md) |

**Returns:** *[AddressRegistry](_address_registry_.addressregistry.md)*

## Methods

###  addressFor

▸ **addressFor**(`contract`: [CeloContract](../enums/_base_.celocontract.md)): *Promise‹Address›*

*Defined in [contractkit/src/address-registry.ts:27](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/address-registry.ts#L27)*

Get the address for a `CeloContract`

**Parameters:**

Name | Type |
------ | ------ |
`contract` | [CeloContract](../enums/_base_.celocontract.md) |

**Returns:** *Promise‹Address›*

___

###  addressMapping

▸ **addressMapping**(): *Promise‹Map‹[CeloContract](../enums/_base_.celocontract.md), string››*

*Defined in [contractkit/src/address-registry.ts:45](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/address-registry.ts#L45)*

Get the address mapping for known registered contracts

**Returns:** *Promise‹Map‹[CeloContract](../enums/_base_.celocontract.md), string››*

___

###  addressMappingWithNotDeployedContracts

▸ **addressMappingWithNotDeployedContracts**(`notDeployedValue?`: undefined | string): *Promise‹Map‹[CeloContract](../enums/_base_.celocontract.md), undefined | string››*

*Defined in [contractkit/src/address-registry.ts:52](https://github.com/celo-org/celo-monorepo/blob/master/packages/sdk/contractkit/src/address-registry.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`notDeployedValue?` | undefined &#124; string |

**Returns:** *Promise‹Map‹[CeloContract](../enums/_base_.celocontract.md), undefined | string››*
