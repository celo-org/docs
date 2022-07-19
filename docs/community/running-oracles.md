---
title: Running oracles
description: How to run an oracle for Ment, the stability protocol.
---

Oracles are a fundamental piece for Mento, the stability protocol behind Celo stable assets. Their propose is to forward to the blockchain the price of CELO/USD, CELO/EUR and CELO/BRL.

# Getting started

Oracles work by running a client that fetches the price from the centralized exchanges (CEX) and push them on chain by calling `SortedOracles.report(address token, uint256 value, address lesserKey, address greaterKey)`. SortedOracles is a [Celo Core Contract](TODO LINK).

An implementation of such client is written in TypeScript [here](https://github.com/celo-org/celo-oracle) and would be used for this guide. Releases for this client can be found [here](https://github.com/celo-org/celo-oracle/releases).

## Requriments
* One VM dedicated for each oracle is recommended, but it is acceptable that they run multiple instances in the case they are for different stables.
* A dedicated full node running in its own VM. Minimal hardware and instructiosn to run a full node can be found [here](https://docs.celo.org/getting-started/mainnet/running-a-full-node-in-mainnet#:~:text=Full%20nodes%20play%20a%20special,other%20full%20nodes%20and%20validators.).
* An address. It can be hosted via a private key, HMS or accounts hosted in the full nodes itselfs.

It is not strictly required but it is recommended to have the celocli avaiable at least in your local enviroment, and ideally in each vm. It could be specially useful to respond to on-call.


## Setting up the enviromnet

Find the latest stable Docker Image for the oracle in the oracle releases [here](https://github.com/celo-org/celo-oracle/releases).

From the oracle vm, make sure you can access your node. This can be done via the Celo CLI with this command

`celocli node:synced --node YOUR_NODE_HOSTNAME:YOUR_NODE_PORT`

:::warning

Using Forno or other public full node providers to run the oracles in production is strongly unencouraged.

:::

The oracle is configured by passing individual enviroment variables or a en env file when starting th edocker container. You'll need to create a env file named `.env.prod` in your oracle vm. A template env file in a format accepted by docker can be found in the [Github repository](TODO). A list of all the available as well as required variables can be found [here](https://github.com/celo-org/celo-oracle/blob/main/README-config.md).

### Running with HSM

Using HSM is the recommended way to store the keys for the oracles. Currently supported HSM are Azure and AWS. If you're have already configured HSM, the relevant variables to add to your `.env.prod` are:

AWS:
* `WALLET_TYPE=AWS_HSM`
* `AWS_KEY_REGION`

Azure:
* `WALLET_TYPE=AZURE_HSM`
* `AZURE_KEY_VAULT_NAME`

### Using a private key

:::warning
This method is not recommended in production as the private key remains unencrypted in the vm.
:::

You can create a new private key with:

`celocli account:new`

The output field of `privateKey` should be stored to a file and its path should be set in the env variable `PRIVATE_KEY_PATH`. `WALLET_TYPE` should also be set to `PRIVATE_KEY`.


### Setting up your keys in the node

In the instructions to run a full node the steps to generate an account and store it the [node can be found](https://docs.celo.org/getting-started/mainnet/running-a-full-node-in-mainnet#create-an-account-and-get-its-address).

### Recommended configuration

:::warning

WARNING: it is encouraged that before running the oracles in production, they should run for at least a week in one of the Celo Public testnets.`

:::

The configuration currently run by cLabs in production can be found [here](https://github.com/celo-org/celo-monorepo/tree/master/packages/helm-charts/oracle) for each stable token. It is strongly advised not to modify the recommended values, specially the exchange sources, at least there is good data to support it.


## Running with node

Once all the enviroment variables are set in the vm and and the keys, an oracle can be started with.

export PRICE_SOURCES=$(cat PRICE_SOURCES)
docker run --name celo-oracle --env-file .env.prod -e PRICE_SOURCES=$PRICE_SOURCES us-west1-docker.pkg.dev/celo-testnet-production/celo-oracle/celo-oracle:1.0.0-rc1


## Governance

The last step to run an oracle is to enable their addresses on-chain. Only addresses allowed by governance are allowed to report. Thus, the first step to spin up a new oracle is creating a governance proposal and submit it on-chain for community voting. An example of such proposal can be found [here](TODO). To find more details about how the governance process work, [check here](TODO). Before submiting 

## Using kubernets

## metrics
https://github.com/celo-org/celo-oracle/blob/main/README-metrics.md

## Monitoring

TODO point to community Grafana cloud.



## Running the thing
