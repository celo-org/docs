# Skills & Builder Feedback — Discussion Document

**Status: discussion input, not a decision.** This document frames one question the team needs to settle: *how should feedback from builders (and their AI agents) flow back into the docs and dev tooling — through a flag in every skill, or through one central feedback skill?* It also answers the related question: *does a dedicated "docs skill" make sense?*

## Current state

- Celo already ships a family of installable agent skills (x402, ERC-8004, MiniPay integration, Celo Composer, stablecoins, fee abstraction, RPC, DeFi, wallet integration, Foundry/Hardhat, thirdweb, viem, wagmi, …).
- **Celopedia already exists and is exactly the "encyclopaedia" idea**: a knowledge skill packaging ecosystem data, contract addresses, MiniPay guidance, grants info, and agent-infrastructure references, installable via `npx skills add celo-org/celopedia-skills` (documented at `build-on-celo/build-with-ai/celopedia.mdx`).
- What does **not** exist: any structured way for a builder — or a builder's coding agent — who hits a docs gap, a wrong contract address, or a broken example to turn that into a tracked issue or draft PR. Today that feedback dies in Discord or never gets reported.
- Benchmark context: Stripe, Base, Solana, and Abstract all ship installable docs/skills stacks, but none of them has solved the *feedback return path* either. This is a place Celo can lead, and it composes with the freshness automation proposal (`04-freshness-automation-proposal.md`) — bot loops push updates out, the feedback skill pulls corrections in, both land as labeled draft PRs/issues in the same queue.

## The options

### Option A — feedback flag in every skill
Each skill (x402, MiniPay, viem, …) gets its own "if something didn't work, report it" section with repo targets and instructions.

- Pro: feedback guidance is right where the failure happens.
- Con: the routing knowledge (which repo, which labels, issue template, dedup etiquette, when to open a PR vs an issue) is duplicated N times and **will drift** — the same maintenance problem the docs themselves have, multiplied across every skill. Updating a label taxonomy would mean touching every skill.

### Option B — one central feedback skill
A single `celo-feedback` skill that owns all routing knowledge. Every other skill contains only a one-line pointer: "Hit a problem with these instructions? Use the celo-feedback skill."

- Pro: one place to maintain routing (repos, labels, templates); consistent, deduplicatable output on the maintainer side; the skill can get smarter (search existing issues before filing, attach environment info, propose a docs diff) without touching any other skill.
- Con: one extra install/reference hop; the feedback skill must know the whole surface (docs repo vs composer repo vs celopedia repo) — but that's precisely the knowledge that should be centralized.

### Option C — hybrid (recommended)
Option B, plus the thin one-line pointer in each skill's "troubleshooting" section. The pointer is stable (it never changes), so there's nothing to drift; all living knowledge stays in `celo-feedback`.

## Recommendation

1. **One central `celo-feedback` skill (Option C).** Routing knowledge in one place; every other skill carries only a stable pointer.
2. **Don't build a new "docs skill" — Celopedia already is one.** Extend Celopedia as the canonical encyclopaedia and make the funnel explicit: *answer first, feedback second.* When a builder (or their agent) has a question, Celopedia answers it from ecosystem knowledge; only when the answer is missing, wrong, or outdated does it hand off to `celo-feedback`. This keeps noise out of the issue tracker and gives maintainers signal-rich reports ("Celopedia had no answer for X" is itself a docs-gap datapoint).
3. **Feed the same queue as the freshness automation.** Feedback-skill output uses the same label taxonomy (`feedback:docs`, `feedback:skill`, `feedback:tooling` alongside the `bot:*` labels), so maintainers review one stream of labeled, deduplicated, draft-first contributions.

## Sketch: what `celo-feedback` would contain

- **Routing table**: docs repo (celo-org/docs), Celopedia (celo-org/celopedia-skills), Celo Composer, MCP server repo, skill repos — each with: what belongs there, issue labels, whether draft PRs are welcome.
- **Dedup protocol**: search open and closed issues/PRs for the same symptom before filing; comment on an existing thread instead of duplicating.
- **Report format**: what was attempted, exact failing step/command, environment (chain, network, SDK version), expected vs actual, and — when the fix is obvious — a proposed diff as a draft PR rather than an issue.
- **Escalation guidance**: what goes to GitHub vs what goes to Discord/Forum (usage questions vs defects).

## Open questions for the discussion

1. Who owns triage of the incoming `feedback:*` queue — DevRel, docs maintainers, or rotating?
2. Should the feedback skill be allowed to open draft PRs directly (higher value, higher noise risk), or issues only in v1?
3. Does agent-filed feedback need its own label (`feedback:agent-filed`) so humans can calibrate trust?
4. Should Celopedia's "I had no answer for this" events be logged somewhere even when the user doesn't file feedback — turning unanswered questions into a docs-gap heatmap?
5. Scope: docs + skills only in v1, or all dev tooling (Composer, MCP, SDK wrappers) from day one?
