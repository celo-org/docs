# Docs freshness run

The procedure the monthly freshness run follows (`.github/workflows/docs-freshness.yml`). A person can follow it by hand too.

The goal is to keep the pages in `.github/freshness/pages.yml` true today. Each run checks every page that is due against its sources. It makes the edits the sources confirm, and asks the maintainer about anything it cannot confirm. It never guesses.

Read `AGENTS.md` before you edit anything. Its rules apply to every change this run makes.

## Inputs

These come from the environment the workflow sets.

| Variable | Meaning |
|---|---|
| `RUN_DATE` | today, `YYYY-MM-DD` |
| `FORCE_PAGES` | optional, space-separated paths. Check these and nothing else, whether due or not. |
| `MAX_PAGES` | upper bound on pages checked this run (default 25). Pages over the limit roll to the next run. |
| `MAINTAINER` | GitHub handle to assign the questions issue to. May be empty. |
| `RUN_NUMBER` | the workflow run number, for a re-run's branch name |
| `MINTLIFY_VERSION` | the pinned Mintlify CLI version, for the step 3 commands |

## 1. Pick the pages

1. Load `.github/freshness/pages.yml`.
2. If `FORCE_PAGES` is set, use exactly those paths and skip to step 2.
3. A page is **due** when any of these holds:
   - its `last_verified` is `null`
   - `RUN_DATE - last_verified` is at least 28 days (`monthly`) or 84 days (`quarterly`)
   - its last substantive commit is more than 12 months old. Find it with `git log --follow --format='%ad %h %s' --date=short -- <path>` and skip sweep commits (heading case, USD₮ wording, frontmatter or `description`, renames and moves, link fixes, "dApp" to "app").
4. Order the due pages: monthly before quarterly, then oldest `last_verified` first (`null` first). Take the first `MAX_PAGES`.
5. Look for directory-style pages that are missing from the registry. These are pages that list providers, partners, programs or ecosystem numbers, among the files changed on `main` since the last freshness run (`git log --since=<last run> --name-only`). List each one as a question ("add to registry?") and don't check it.

## 2. Check each page

For each page:

1. Read the page and list every volatile fact: each provider or partner entry, each number, each program, each external link. The registry's `what` field says what to focus on. It is not exhaustive.
2. Check each fact at its source:
   - **Every external link on the page.** Fetch it with WebFetch (the workflow allows no `curl`). A 404, a domain for sale, a redirect to an unrelated site, or a page that no longer mentions Celo is a finding. Some sites block bots (403 or 429). That is not evidence of anything: try a search, or the provider's docs or API, and if it stays inconclusive, make it a question.
   - **The registry `sources`.** Fetch each one. `npm view <pkg> version` and `gh` are fine for packages and repos.
   - **On-chain facts.** Never trust a page for an address. Resolve the fee-currency directory through the registry and list the allowlist:
     ```bash
     # Celo mainnet (42220); for Celo Sepolia (11142220) use https://forno.celo-sepolia.celo-testnet.org
     DIR=$(cast call 0x000000000000000000000000000000000000ce10 'getAddressForStringOrDie(string)(address)' FeeCurrencyDirectory --rpc-url https://forno.celo.org)
     cast call "$DIR" 'getCurrencies()(address[])' --rpc-url https://forno.celo.org
     ```
     Check a token with `cast call <addr> 'symbol()(string)'` and `cast code <addr>`.
   - **Partner announcements.** For a provider that seems to have dropped Celo, search for an announcement such as a deprecation, a shutdown or a chain removal.
3. Classify every finding as exactly one of these:

| Class | When | Action |
|---|---|---|
| `verified` | the source confirms the fact as written | none |
| `update` | a primary source (the provider's own site, docs, repo, on-chain state) confirms a different fact | edit the page; record the source URL |
| `question` | sources conflict or are unreachable; the fix is a judgement call (drop a partner that is quiet but not shut down, add a new provider, reword positioning); or the page is generated | no edit; record it for the issue |

Rules for `update`:

- **Generated pages** (`generated_by` set) are never hand-edited. If they differ from the chain, raise a `question` asking to rerun the generator. Quote the on-chain list and the differing rows.
- **Removing a provider** is an `update` only when the provider itself says it no longer supports Celo, or no longer exists. Anything weaker is a `question`.
- **Adding a provider** is always a `question`, unless the provider is on `https://celo.org/ecosystem` and its own site shows Celo support. Then it is an `update` that names both sources.
- **Changing a number** ("20M+ activations", "30+ stablecoins") needs a primary source dated within the last 6 months.
- Follow `AGENTS.md`: document only what is true now, with no "recently" and no "as of". Don't add partner contract addresses. Use plain language with no promotional adjectives, and EIP-55 checksummed addresses.
- **One fact, one page.** When you change a fact, grep its old value across the repo (`grep -rn --include='*.mdx' "<old>" .`) and fix every copy. That includes the `AGENTS.md` §7 table.
- Don't bump a `last_verified` for a page you could not fully check.

4. If the page had no unresolved `question` and every fact was `verified` or `update`d, set its `last_verified` to `RUN_DATE` in `pages.yml`. If it still has open questions, leave `last_verified` unchanged so the next run checks it again.

## 3. Validate

Run these and keep their output for the PR body. Write the version number from `MINTLIFY_VERSION` into the command (for example `npx mintlify@4.2.920 broken-links`): the workflow allows each command exactly as written here, with the pinned version, and refuses a `$MINTLIFY_VERSION` it cannot expand.

```bash
npx mintlify@$MINTLIFY_VERSION broken-links
python3 scripts/check_redirects.py
npx -p mintlify@$MINTLIFY_VERSION -c 'node scripts/check_components.mjs'
python3 .github/freshness/check_registry.py
```

If a check fails because of your edit, fix it. If it fails on `main` without your edit, say so in the PR body and don't fix unrelated pages.

## 4. Report

Let `MONTH` be the run's month as `Month YYYY` (e.g. `December 2026`) and `YM` be `YYYY-MM`.

### Pull request (only if any page or `pages.yml` changed)

- Branch: `freshness/<YM>`. If it already exists (a re-run; check with `git ls-remote --heads origin freshness/<YM>`), use `freshness/<YM>-<run number>`. Push with `git push -u origin <branch>`: the action has already set `origin` to use its GitHub App token.
- Commit message and PR title: `docs: monthly freshness refresh (<MONTH>)`
- Open it as a **draft**, with base `main`.
- Body:
  ```
  Monthly check of directory-style pages against their sources (.github/freshness/RUNBOOK.md).
  Open questions: #<issue number>

  ## Updated
  | Page | Change | Source |
  |---|---|---|
  ...

  ## Checked, no change
  - `path` (n facts)

  ## Not checked this run
  - `path`, over MAX_PAGES, rolls to next run

  ## Verification
  <command output from step 3>
  ```

### Issue (always)

- Title: `Docs freshness: open questions (<MONTH>)`. If there are no questions, use `Docs freshness: all pages verified (<MONTH>)`.
- Label: `documentation`. Assign `MAINTAINER` if it is set.
- Body: link to the PR (if any), then one checkbox per question:
  ```
  - [ ] **`learn/ramps.mdx` / Paychant**: site returns 403 to the checker and has no Celo mention in its docs.
        Evidence: <URLs, status codes, quotes of at most one line from public pages>
        Proposed: remove the row, or keep it if you can confirm support.
  ```
  Group the questions by page. End with the count of pages checked, updated and verified.
- If a questions issue for the same month is still open, comment on it instead of opening a second one.

## Privacy

Use public sources only. Never quote reader questions from the docs-assistant reports (see `ANALYTICS.md`), and never name private contacts. Quotes from public pages stay under one line and carry their URL.

## What this run does not do

- It doesn't merge anything. Every change goes through review.
- It doesn't run `scripts/update_contracts.py`, which needs `TENDERLY_API_KEY` and `celocli`. Drift on a generated page becomes a question.
- It doesn't restructure pages or rewrite prose beyond the facts it corrects.
- It doesn't edit `celo-org/celopedia-skills`. That repo has its own run, which reads this run's PR and issue.
