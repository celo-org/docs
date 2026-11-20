# Scripts

This directory contains utility scripts for maintaining and updating the Celo documentation.

## Available Scripts

- `update_contracts.py` - Updates contract addresses and deployment information in the documentation
- `check_redirects.py` - Fails on `docs.json` redirects that cannot work: `#` in a source, a wildcard
  shadowed by an earlier or identical one, a source that captures a page in navigation, a navigation
  link to a redirected path, or a destination that is `/`, redirected again, or not a page in
  navigation. It only understands a trailing `/:slug*` wildcard and stops with an error on any other
  path parameter. CI runs it with its tests (`python3 -m unittest discover -s scripts -p 'test_*.py'`).
- `check-orphans.sh` - Fails on page files that navigation does not reach. CI runs it.
- `check_components.mjs` - Fails on a page that uses a component Mintlify will not render. It loads Mintlify's
  parser, component list and page-local rule from the Mintlify CLI, so there is no list to keep in sync.
  Mintlify drops, silently and with everything inside, a block element whose name is not in its list and not
  defined in the page: `<Notte>`, `<CardGrup>`, and lowercase tags such as `<aside>` or `<details>`. An element
  alone on its line counts as a block whatever its name; only an unknown element that shares its line with
  text fails the page instead. It also checks `import` lines against the snippet: a missing file, a non-local
  path, or a named import the snippet does not export is reported, because Mintlify skips those and drops the
  tags that use them. `README.md`, `LICENSE.md`, `CONTRIBUTING.md` and `CONTRIBUTE.md` are skipped, since
  Mintlify never builds them. Run it with `mint` or `mintlify` on PATH, or
  `npx -p mintlify@<version> -c 'node scripts/check_components.mjs'`. It depends on four exports Mintlify does
  not document (`getAST`, `allowedComponents`, `getExportedFunctionNames`, `findExport`), so a rename shows up
  as a failing step when `MINTLIFY_VERSION` is bumped. CI runs it with its tests (`node --test
  scripts/check_components.test.mjs`).

### Generated pages

| Page | Source |
| ---- | ------ |
| `build/tools/contracts/core-contracts.mdx` | `celocli network:contracts` |
| `build/tools/contracts/l1-contracts.mdx` | rollup config files + `cast` |
| `build/tools/contracts/fee-currencies.mdx` | `FeeCurrencyDirectory.getCurrencies()` via `cast` |
| `build/tools/contracts/stablecoin-contracts.mdx` | the fee-currency allowlist + `data/stablecoins.json` |

Do not edit those four files by hand — change the generator instead. The page bodies live in
the `PAGE_HEADER_*` constants near the top of `update_contracts.py`.

## Data

- `data/stablecoins.json` - Curated input for `build/tools/contracts/stablecoin-contracts.mdx`.
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
