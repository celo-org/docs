---
title: Adding Gas Currencies to Celo
description: Documentation relevant to how to add currencies on Celo
---


# Adding Gas Currencies to Celo

The Celo protocol [supports paying](/protocol/transaction/erc20-transaction-fees) gas in tokens other than the native one, Celo. This document outlines requirements and processes to add a new gas token.


## Pre-requisites

### Token implementation

A gas token is a [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token that has to implement two functions with signature  `debitGasFees(address from, uint256 value)` and `creditGasFees(address from, address feeRecipient, address gatewayFeeRecipient, address feeRecipient, uint256 refund, uint256 tipTxFee, uint256 gatewayFee, uint256 baseTxFee)`. Both these functions should have a modifier to make sure they can only be called by the zero address, which is they address the Celo VM interpersonates when calling smart contracts. An example of the implementation of this modifier can be found in [Celo's monorepo](https://github.com/celo-org/celo-monorepo/blob/fff103a6b5bbdcfe1e8231c2eef20524a748ed07/packages/protocol/contracts/common/CalledByVm.sol#L3).

`debitGasFees` is called by the VM before a transaction is added to a block. It removes from the caller's balance the maximum amount of tokens the transaction will take. This is done to make sure the user has enough to pay for gas.

`creditGasFees` is called by the VM after a transaction is added to a block. It distributes the fees to the validator signers and the contract that the protocol designated to accumulate bas fees, as well as refunding the user for unused gas. The addresses of the fee recipients as well as the amounts are passed by the VM as parameters.

If any of these two functions reverts, the transaction will revert.

Example implementations of `debitGasFees` and `creditGasFees` can be found in [Mento's StableCoins contracts codebase](https://github.com/mento-protocol/mento-core/blob/develop/contracts/tokens/StableTokenV2.sol#L264).


### Oracle

Celo blockchains uses the core contract SortedOracle as a the source of the rate the tokens should be priced at the moment a validator is attempting to include the transaction in a block. The address of the token and the address of the oracle has to be added to SortedOracle using the function `addOracle(address token, address oracleAddress)`. 

Then, at least one rate should have been submitted using `report(address token, uint256 value, address lesserKey, address greaterKey)`. The price reported is the price of Celo in units of the token to be added.

An reference implementation of oracle provider client can be [found here](https://github.com/celo-org/celo-oracle).

Sorted Oracles was originally designed to support the [Mento protocol](https://www.mento.org/). For this reason, the reference implementation of the oracle client supports reporting with a high frequency (in the context of a blockchain). If the goal of the oracle is solely to support a gas currency, reports could be significantly more spaced out, as gas pricing is not as sensible to manipulation as an arbitrage protocol.


## Governance Process

To enable a token as gas currency, two [governance proposals](/protocol/governance) need to be passed.

### Enabling the Oracle

The first proposal is meant to enable the oracle, by calling `SortedOracle.addOracle(address token, address oracleAddress)`. Potentially, this proposal could also transfer some Celo from the Community Fund to the oracle addresses to pay for gas.

An example of such proposal [can be found here](https://github.com/celo-org/governance/blob/main/CGPs/cgp-0085.md).

### Reporting

Before submitting the second proposal, at least one of the oracle addresses need to call `report(address token, uint256 value, address lesserKey, address greaterKey)`. This will make a price available to the protocol for gas pricing.

### Enabling as Gas Token

The second proposal enables the gas token by calling `addToken(address tokenAddress)`. After this proposal passes, EOAs should be able to pay for gas in the enabled token.

An example of such proposal [can be found here](https://github.com/sirpy/governance/blob/1cee2314b357246385819e7e0713a272a55b0ec3/CGPs/cgp-0089.md).

It would be a good consideration to update popular tooling (like contractkit) before this proposal passes so that most developers are ready to use the new gas as soon as it enabled.


### Enabling with just one proposal

It is possible to simplify this process to one governance proposal. That'd proposal would have to enable the Governance contract as an oracle for the token to enable as gas token.

Then, the governance proposal itself should report a reference value within the same proposal. This is particularly safe to do with stablecoins.

After this, and as cleanup, Governance should be removed from the list of oracles and the calls from the two previous proposals should be included to finalize the process.

### Ongoing effort

Oracles are expected to keep reporting prices periodically, especially in moments of high volatility.