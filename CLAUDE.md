# CLAUDE.md — docs

<!-- Repo-owned. Keep it LEAN: a router. Shared rules are imported below and synced from pm-kit —
     don't restate them here. Every Claude session (local, Cowork, CI action) reads this. -->

## What this project is

The official Celo documentation site (docs.celo.org), built with Mintlify. MDX pages plus a
`docs.json` config drive the site; developers building on Celo are the audience. There is no
application code, no package.json, and no unit tests — the product is the rendered docs.

## Commands

- Install the CLI (once): `npm i -g mint`
- Preview locally: `mint dev` — serves at `http://localhost:3000`; run from the repo root (needs `docs.json`)
- Check links: `mint broken-links` — run after EVERY change; this is what CI gates on
- CLI acting up: `mint update`
- CI: `.github/workflows/docs-validation.yml` runs `npx mintlify broken-links` on PRs — the required check is named `Check for broken links`

## Architecture pointers

- `docs.json` — Mintlify config: theme, and ALL navigation. A new page is invisible until added to a `navigation` tab/group here.
- Content dirs map 1:1 to nav tabs: `home/`, `build-on-celo/`, `tooling/`, `contribute-to-celo/`, `infra-partners/`, `specs/`, `legacy/`.
- `snippets/` — reusable MDX includes; `assets/`, `images/`, `img/` — static files.
- `_deprecated/` — retired pages kept out of nav; `submodules/` — externally sourced content.
- `scripts/update_contracts.py` — regenerates contract-address reference data.

## Team rules (shared, synced — read them)

@.claude/shared/engineering-rules.md

The ten you must never violate, even without reading the above:
1. Never push to `main`. Branch `<handle>/<issue>-<slug>` → PR → squash. Title = the commit on `main` (Conventional Commits, scoped, outcome).
2. One concern per PR, one fix-unit per issue, one priority per issue.
3. Every change ships the test that fails on pre-fix code, through the seam it touches (route/CLI/component), and any prose guarantee is tested on its failure path. State the mutation count in the PR.
4. `Closes #N` only if every acceptance box is met; otherwise `Refs #N`. After merge, check what actually closed.
5. Every claim in an issue/PR/review is evidence-backed: commands + output, `file:line`. "Confirmed" means you ran it. Measured over reasoned — thresholds and constants pinned in a test, not a comment.
6. Say what the PR does NOT do (with numbers). Say what it actually does, even beyond the ticket. Flag judgement calls and bundled product changes for the maintainer.
7. On review feedback: reproduce first, fix, audit your own fix, report what it taught. Answer every point FIXED / NOT-FIXED / DISAGREE-with-measurement; never a silent push; never delete a wrong claim — strike it through.
8. Use only existing labels: `bug` `enhancement` `chore` `priority:critical|high|medium|low` `status: triage`. Never invent labels.
9. Ask before anything outward-facing or irreversible (external repos, posting, deleting, force-pushing shared branches). Propose, never execute.
10. No secrets in diffs. New env vars → `.env.example` + runbook, in the same PR.

Use the plugin commands: `/file-issue`, `/write-pr`, `/review-pr`, `/post-merge`, `/close-pr`.

## Product context

- Live site: https://docs.celo.org
- Mintlify docs (authoring reference): https://mintlify.com/docs
- Community: https://discord.com/invite/celo

## Gotchas

- Adding an `.mdx` file is not enough — it 404s until listed in `docs.json` navigation.
- "Verification" here means `mint broken-links` green plus the changed pages rendering in `mint dev`; there is no test suite.
- Frontmatter `title` drives the sidebar label; keep it in every page.
- `submodules/` content is synced from other repos — don't hand-edit it here.
- Prefer relative internal links (`/build-on-celo/...`) over absolute `https://docs.celo.org/...` so the link checker can validate them.
