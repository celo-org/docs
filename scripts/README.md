# Scripts

This directory contains utility scripts for maintaining and updating the Celo documentation.

## Available Scripts

- `update_contracts.py` - Updates contract addresses and deployment information in the documentation

## Data

- `data/stablecoins.json` - Curated input for `tooling/contracts/stablecoin-contracts.mdx`.
  Mento stablecoins plus USDC and USDT are read from the on-chain fee-currency allowlist;
  third-party issuers have no registry to read from, so they are maintained by hand here.

## Pre-requisites

- Python 3.12 or higher
- `celocli`
- `cast`

## Usage

Run scripts from the repository root directory:

```bash
python scripts/update_contracts.py
```
