---
title: Add Stable Assets to Celo
description: Overview of the requirements and steps to add a new stable asset to the Celo platform.
---

# Add Stable Assets

Overview of the requirements and steps to add a new stable asset to the Celo platform.

---

:::tip Note

This example assumes we want to add to the platform a new stable asset `cX` tracking the value of X (where X can be a fiat currency like ARS or MXN), using the [Mento exchange](/protocol/stability/doto).

:::

## Requirements

**Liquidity**

The asset X has to be liquidly traded against CELO, in a CELO/X ticker. In absence of that, X has to be liquidly traded, including weekends, against well known assets that trade 24/7, like BTC or ETH, such that the price of X with respect to Celo can be inferred. In this second case, an implicit pair can be calculated for the oracle reports.

**Determine pre-mint addresses and amounts**

It is possible to pre-mint a fixed amount at the time of launching a new stable asset, good candidates to receive the pre-mint are the community fund and other entities commited to distribute this initial allocation to grant recipients and liquidity providers.

:::tip

A good criteria to a successfully decide a pre-mint amount is to check by how much it would affect the reserve collateralization ratio, this is, the ratio of all stable assets, divided by all the reserve holdings. Reserve information, as well as the collateralization ration can be found on the [Reserve website](https://celoreserve.org/).

:::

## Procedure

### Including contracts on the registry

Currently, the addition of new assets is tied to the [Contract Release Cycle](/community/release-process/smart-contracts), as the contracts `ExchangeX` and `StableTokenX` need to be checked in [^1]. These new contracts inherit from Exchange and StableToken, that are the ones originally used for `cUSD`. As StableToken `cX` will be initialized by the contract release, key parameters like `spread` and `reserveFraction` should be included, although they can be later modified by setters in the following governance proposals. The only value that can't be changed is the pre-mint amount.

### Freezing

These contracts should be set as frozen to prevent `cX` from being transferable before Mento supports it in a governance proposal. At this point, as there are no oracles, the contract `ExchangeX` can't update buckets and it is thus impossible to mint and burn `cX`. There is [an issue open](https://github.com/celo-org/celo-monorepo/issues/7331) to include this step as part of the Contract Release.

For the [deployment of cEUR](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0033.md), this was included as part of the [Oracle activation](#oracle-activation) proposal.

### Constitutional parameters

<!-- TODO: SDK urls will need to be changed when the SDK type docs are separated from the rest of docs -->

As new contracts are added to the registry, new **constitution parameters** need to be set. There's an [issue open](https://forum.celo.org/t/governance-proposals-for-march-2021/816) to include this in the tooling to support it as part of the Contract Release.

### Oracle activation

A following governance proposal needs to be submitted to enable [oracles](/protocol/stability/oracles) to report. This oracle proposal needs to enable addresses to report to the `StableTokenX` address and, optionally, fund them to pay for gas fees. An example of this proposal is the [cEUR oracle activation proposal](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0033.md)[^2].

### Full activation

The last governance proposal is expected to unfreeze the contract and attach the last strings in the process to get a fully transferable asset stabilized by the Reserve. This propose involves:

1. Unfreezing both `StableTokenX` & `ExchangeX`.
2. Making `ExchangeX` able to pull CELO out of the Reserve for the buckets `Reserve.addExchangeSpender`
3. Declaring the token to the Reserve as an asset to be stabilized calling `Reserve.addToken`
4. Enable `StableTokenX` as a fee currency, so that it can be used to pay for gas `FeeCurrencyWhitelist.addToken`.
5. In case necessary, parameters such as `reserveFraction` and `spread` can also be updated in this governance proposal.
6. Granda Mento activation

After passing this last proposal, `cX` should be fully activated.

## Tooling

Adding a new stable asset involves updating many parts of the tooling, such as:

- Update the Ledger app integration such that it displays the names of the newly added token.
- Update oracles and generating their keys and addresses.
- Adding support on `contractkit`.
- Adding support on [kliento](https://github.com/celo-org/kliento).
- Adding support on [eksportisto](https://github.com/celo-org/eksportisto).
- Update on the cli, an example list of things to add are included on [this issue](https://github.com/celo-org/celo-monorepo/issues/6793).
- Supporting alfajores faucet.
- Supporting on Dapp kit.

[^1] There are opened issues trying to de-couple the addition of new assets to the reserve to the release cycle.

:::note

[^2] Please note this example proposal also includes freezing, this is because, at the time of writing (22-march-2021), the tooling for proposing a contract release doesn't support freezing those contracts on the same proposal. Proposals shall not be modified manually given that the tool is meant to run verifications.

:::
