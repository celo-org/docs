# Docs Freshness Automation — Proposal

**Status: proposal / basis for discussion. Nothing in this document is implemented yet.**

The goal: whenever something changes in the Celo ecosystem — cLabs ships a release, DevRel publishes a new tool or template, a new project lands in the celo-org GitHub org, a program opens or *closes* — an automated loop drafts an example PR against the docs. Maintainers review and merge or close it. Humans always stay in the loop; the bot never pushes to `main`.

## Why now

- The only automation today is a broken-links check on PRs (`.github/workflows/docs-validation.yml`) and a manually-run contract-address generator (`scripts/update_contracts.py`).
- Staleness is already visible: hardcoded dates in `contribute-to-celo/daos.mdx` ("As of March 2025…"), a discontinued accelerator (Celo Camp) that was still listed in two pages until this PR, program links whose state the docs can't see, and network-upgrade notices that run on human memory.
- The repo already accepts bot PRs (Renovate), so the review culture exists.

## Architecture overview

Three loops, one config file, one state store. Core principle: **detection is deterministic (gh / curl / jq); only the drafting of page edits is LLM-driven; PR mechanics are owned by the workflow, never by the LLM.**

```
watch-targets.yml ──▶ detector job (gh api / curl + content hash) ──▶ change events
                                                                          │ (exit early if none — zero LLM cost)
state branch ◀── cursor updates                                           ▼
                                            claude-code-action (scoped prompt per event,
                                            page allowlist, no git/gh/Bash tools)
                                                                          │
                                            peter-evans/create-pull-request
                                            (draft, labeled, idempotent branch name)
                                                                          ▼
                                            maintainer merges or closes (close = permanent "no")
```

## 1. What to watch (signal sources)

| Signal | Mechanism | Docs pages affected |
|---|---|---|
| Releases/tags on cLabs repos (celo-org/optimism, celo-org/op-geth, celo-org/celo-monorepo, celo-org/celo-composer) | `gh api repos/{r}/releases` against a stored cursor | `infra-partners/notices/*`, node pages, quickstart |
| New repos in the celo-org GitHub org (DevRel tools, templates, new projects) | `gh api orgs/celo-org/repos?sort=created` — filter: not a fork, not archived, has a description, ≥7 days old (quiet period) | `contribute-to-celo/builders.mdx`, tooling pages |
| **Program pages: Prezenti, CeloPG programs page (incl. Proof of Ship), other grant/accelerator pages** | `curl` + content hash of extracted text; alert on change, HTTP 4xx/5xx, or redirect-to-home | `contribute-to-celo/builders.mdx`, `contribute-to-celo/index.mdx`, MiniPay "Opportunities" section |
| **Celopedia (celo-org/celopedia-skills repo)** — program/grant/ecosystem data updated there | releases/commits on the repo's data files | program listings, ecosystem references — keeps docs and Celopedia telling the same story |
| Contract addresses | existing `update_contracts.py` (deterministic, no LLM) | `tooling/contracts/*` |

> Open item: one more program source was requested but the name didn't come through clearly ("PDA scale"). CeloPG's programs page and Proof of Ship are included above as the likely candidates — to be confirmed and adjusted in `watch-targets.yml`.

### Removals, not just additions

Program content rots in both directions, and removal is the harder half — nothing "arrives" to trigger it. The Celo Camp case (accelerator discontinued, still listed in two pages) is the template for how the loop handles it:

1. **URL-watch degradation**: a watched program URL starts failing (4xx/5xx), redirects to a generic homepage, or its content hash changes drastically → the event prompt explicitly asks: *"determine whether this program still exists; if it appears discontinued, draft a PR **removing** it from the listed pages, citing the evidence in the PR body."*
2. **Cross-source disagreement**: if Celopedia's program data drops a program that the docs still list, that mismatch is itself an event → removal PR.
3. **Cadence-based re-verification**: every page carrying a `review_cadence` (below) gets re-checked when overdue; the check prompt includes "remove anything you can no longer verify as active, and say so in the PR body" rather than only "update dates".

Removal PRs get their own label (`bot:removal`) so reviewers know the diff is destructive and give it a closer look.

## 2. Trigger + loop mechanics

**Cron over webhooks for v1.** `repository_dispatch` from source repos needs org-level PAT coordination — defer to Phase 3. A weekly/twice-weekly cron loses at most a few days of latency, which is fine for docs.

Per-run flow (`freshness-watch.yml`):
1. Checkout `main`; fetch `state.json` (cursors, URL hashes) from an `automation/state` branch.
2. Detector script emits `events.json`. **Exit early if empty — no LLM call on quiet weeks.**
3. Dedup: for each event, search existing PRs (open *and closed*) by idempotency key in the title. Closed-by-human = permanent "no", never retried.
4. Cap at `max_prs_per_run` (default 3); dropped events keep their cursor and surface next run.
5. Per surviving event: run `anthropics/claude-code-action` with a scoped prompt assembled from the target's `pages:` allowlist + prompt template + event payload. Tools restricted to Read/Grep/Glob/Edit/Write — **no Bash, no git, no gh**.
6. `peter-evans/create-pull-request`: branch `bot/freshness/<key>`, `draft: true`, labels, body containing the source link, detected change, and idempotency key.
7. Commit updated cursors to `automation/state`.

Declarative config, `.github/freshness/watch-targets.yml` (illustrative):

```yaml
defaults: { max_prs_per_run: 3, labels: [bot:freshness] }
targets:
  - id: op-geth-releases
    kind: releases
    repo: celo-org/op-geth
    pages: [infra-partners/notices/, infra-partners/operators/]
    prompt: >
      A new op-geth release {tag} was published: {release_url}.
      Check whether node-operator pages reference outdated versions or a new
      upgrade notice is warranted. Edit only the listed pages.
  - id: prezenti
    kind: url-watch
    url: https://www.prezenti.xyz/
    pages: [contribute-to-celo/builders.mdx]
    prompt: >
      The Prezenti page changed (or stopped resolving). Determine whether the
      program is still active and whether its description in the docs is
      accurate. If discontinued, remove it and say so in the PR body.
  - id: celopg-programs
    kind: url-watch
    url: https://www.celopg.eco/programs
    pages: [contribute-to-celo/builders.mdx, contribute-to-celo/index.mdx, build-on-celo/build-on-minipay/overview.mdx]
  - id: celopedia-data
    kind: releases
    repo: celo-org/celopedia-skills
    pages: [contribute-to-celo/builders.mdx, build-on-celo/build-with-ai/celopedia.mdx]
  - id: new-org-repos
    kind: new-repos
    org: celo-org
    filters: { min_age_days: 7, exclude_forks: true, require_description: true }
    pages: [contribute-to-celo/builders.mdx, tooling/]
    labels: [bot:new-project]
```

## 3. Page-level freshness metadata

Additive frontmatter convention (Mintlify ignores unknown keys; survives the 4-tab restructure since the scanner globs `**/*.mdx`):

```yaml
---
title: Builders
last_verified: 2026-07-06
review_cadence: 90        # days; omit → repo default 180
sources:
  - https://www.prezenti.xyz/
  - https://www.celopg.eco/programs
---
```

A small script (`scripts/freshness_report.py`, no LLM) scans all pages weekly, groups them into overdue / no-metadata / autogenerated (skipped via the existing "DO NOT EDIT" marker), and updates **one pinned issue** (labeled `bot:stale-report`, body replaced each week — one issue forever, not one per week). `last_verified` is bumped by humans when merging bot PRs or touching a page.

Roll out incrementally: start with the ~15 known stale-prone pages (programs, DAOs, notices, provider lists); do the bulk rollout **after** the 4-tab restructure lands to avoid mass conflicts with the restructure PRs.

## 4. Guardrails

- **Draft PRs only, never a push to `main`** (branch protection enforces this regardless of bugs).
- Label taxonomy: `bot:freshness`, `bot:new-project`, `bot:removal`, `bot:contracts`, `bot:stale-report` — all also `automation` for one-click filtering.
- Noise controls: max 3 PRs/run, 7-day quiet period on new repos, closed-PR keys never retried, detector exits before any LLM call when nothing changed, `--max-turns` cap on the action.
- Content controls: contract pages are script-owned (LLM denied from `tooling/contracts/`); each prompt is constrained to its target's page allowlist; the existing broken-links check runs on every bot PR.
- Secrets: `ANTHROPIC_API_KEY`, `TENDERLY_API_KEY` (contracts job), and one fine-grained PAT or GitHub App token — needed because PRs created with the default `GITHUB_TOKEN` don't trigger the docs-validation workflow.
- Cost: weekly cadence, ≤3 scoped LLM invocations per run with small page allowlists → cents to low dollars per week. The stale report and contracts jobs use no LLM at all.

## 5. Phasing

- **Phase 0 (day one, no LLM):** schedule `update_contracts.py` weekly; open a PR only when `git diff` is non-empty. Proves out the whole draft-PR/label/secret plumbing every later loop reuses. (Runner needs `celocli`, Foundry's `cast`, Python 3.12, `TENDERLY_API_KEY` — pin versions.)
- **Phase 1 (MVP):** `freshness-watch.yml` with 2–3 release targets (op-geth, optimism → upgrade notices and node pages — the content whose staleness has real operational cost), **plus the program URL-watch targets (Prezenti, CeloPG) with removal handling**, plus the LLM-free stale-page report with metadata on the known stale pages.
- **Phase 2:** new-repo detector for the celo-org org, Celopedia data watcher, DevRel template repos.
- **Phase 3:** `repository_dispatch` from source repos for near-real-time triggers, full metadata rollout post-restructure, optional `/verified` PR-comment command to bump `last_verified`.

## Files this would add (when implemented)

- `.github/workflows/update-contracts.yml` (Phase 0)
- `.github/workflows/freshness-watch.yml`, `.github/workflows/stale-report.yml` (Phase 1)
- `.github/freshness/watch-targets.yml` — the single place the team edits to watch something new
- `scripts/detect_changes.sh`, `scripts/freshness_report.py`
- `state.json` on an `automation/state` branch (not on `main`)
