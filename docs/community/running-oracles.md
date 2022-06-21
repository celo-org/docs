---
title: Running oracles
description: How to run an oracle for Ment, the stability protocol.
---

Oracles are a fundamental piece for Mento, the stability protocol behind Celo stable assets. Their propose is to forward to the blockchain the price of CELO/USD, CELO/EUR and CELO/BRL.

# Getting started

Oracles work by running a client that fetches the price from the centralized exchanges and push them on chain by calling `SortedOracles.report(address token, uint256 value, address lesserKey, address greaterKey)`. SortedOracles is a [Celo Core Contract](TODO LINK).

An implementation of such client is written in TypeScript [here](https://github.com/celo-org/celo-oracle) and would be used for this guide.

## Requriments

## Governance

The first step to run an oracle is to enable their addresses on-chain. Only addresses allowed by governance are allowed to report. Thus, the first step to spin up a new oracle is creating a governance proposal and submit it on-chain for community voting. An example of such proposal can be found [here](...). To find more details about how the governance process work, [check here](...).

## Running the oracle

Find the latest stable Docker Image for the oracle in the oracle releases [here](https://github.com/celo-org/celo-oracle/releases).

You will also need a dedicated full node. It is strongly encouraged to run a dedicated full node for the oracle. Instructions on how to run a node can be found [here].

It is also advised that nodes 

### Running with HSM

Currently supported HSM are Azure and AWS.

### Running with node

### Recommended configuration

The configuration currently run by cLabs in production can be found [here](https://github.com/celo-org/celo-monorepo/tree/master/packages/helm-charts/oracle). It is strongly advised not to modify the recommended values, specially the exchange sources, at least there is good data to support it.

A list of all the suported env variables can be found [here](https://github.com/celo-org/celo-oracle/blob/main/README-config.md).

## Using kubernets

## Debugging

## metrics
https://github.com/celo-org/celo-oracle/blob/main/README-metrics.md

## Monitoring

TODO point to community Grafana cloud.
