---
title: Verify with Foundry
description: How to verify a Smart Contract on Celo using Foundry
---

# Verify Smart Contract using Foundry

Verifying a smart contract allows developers to review your code from within the CeloScan Block Explorer

## Prerequisites

[Project must be setup using Foundry](../deploy/foundry.md)

## Add Celo configuration in `foundry.toml`

Add the below given configuration to the `foundry.toml` file at the root level of your project.

```toml
[etherscan]
celo-alfajores = { key = "${CELOSCAN_API_KEY}", url = "https://api-alfajores.celoscan.io/api"}
celo = { key = "${CELOSCAN_API_KEY}", url = "https://api.celoscan.io/api"}
```

Make sure to also have Celo RPC configuration in `foundry.toml` file, here it is:

```toml
[rpc_endpoints]
celo-alfajores = "https://forno.alfajores.celo-testnet.org/"
celo = "https://forno.celo.org"
```

## Verifying Contracts

Use the following command

For Alfajores Testnet:

```bash
forge verify-contract --chain-id celo-alfajores <contract_address> <contract_location> --watch
```

For Celo Mainnet:

```bash
forge verify-contract --chain-id celo <contract_address> <contract_location> --watch
```
