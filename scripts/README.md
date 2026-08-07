# Scripts

This directory contains utility scripts for maintaining and updating the Celo documentation.

## Available Scripts

- `update_contracts.py` - Updates contract addresses and deployment information in the documentation

### Generated pages

| Page | Source |
| ---- | ------ |
| `tooling/contracts/core-contracts.mdx` | `celocli network:contracts` |
| `tooling/contracts/l1-contracts.mdx` | rollup config files + `cast` |
| `tooling/contracts/fee-currencies.mdx` | `FeeCurrencyDirectory.getCurrencies()` via `cast` |
| `tooling/contracts/stablecoin-contracts.mdx` | the fee-currency allowlist + `data/stablecoins.json` |

Do not edit those four files by hand — change the generator instead. The page bodies live in
the `PAGE_HEADER_*` constants near the top of `update_contracts.py`.

## Data

- `data/stablecoins.json` - Curated input for `tooling/contracts/stablecoin-contracts.mdx`.
  Mento stablecoins plus USDC, USD₮ and USA₮ are read from the on-chain fee-currency
  allowlist; third-party issuers have no registry to read from, so they are maintained by
  hand here, along with issuer attribution and any display-symbol overrides.

  `scripts/.gitignore` ignores `*.json` but re-includes `data/*.json`. If you add another
  curated input here, check it is not silently ignored: `git check-ignore -v <path>`.

## Pre-requisites

- Python 3.12 or higher
- `celocli` (core contracts only)
- `cast` ([Foundry](https://book.getfoundry.sh/)) — used for L1 contracts and fee currencies
- `TENDERLY_API_KEY` in the environment, for the L1 RPC endpoints

## Usage

Run scripts from the repository root directory:

```bash
python scripts/update_contracts.py
```
