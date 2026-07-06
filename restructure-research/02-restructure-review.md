# Review of the Restructure Proposal (PR #2209) — Agent-First Lens

A companion review of the draft 4-tab restructure (`RESTRUCTURE_PLAN.md`, PR #2209), evaluated against the goal that Celo's primary docs message is **agents, mini apps, and consumer applications**, with protocol/node/operator content as a stable secondary track. Benchmark evidence cited below comes from `01-benchmark-report.md` (11 docs sets, fetched 2026-07).

## What the proposal gets right — endorse as-is

- **The 4-tab shape (Learn / Build / Operate / Contribute)** is sound, and the migration mechanics are excellent: catch-all redirects, 6-PR sequencing, `mint broken-links` gating, orphan-file rescue, `_deprecated/` deletion.
- **Killing the "Legacy" tab** in favor of notices + archive matches every benchmarked site (Optimism's Notices tab, Base's config changelog, NEAR outright deleting dead products).
- **Tooling dissolved into Build** — no benchmarked site has a top-level "Tooling" junk drawer.
- **Dedup work** (wallets, fee abstraction, thirdweb ×3) and the llms.txt to-do.
- **The don't-touch zone is respected**: Operate and Contribute changes are renames/moves only. This review proposes no changes there.

## The gap: agents and mini apps are filed, not led

In the proposal, the team's primary message lands at `build/guides/ai/*` and `build/guides/minipay/*` — the third group of the second tab, two clicks deep, alphabetically adjacent to "local stablecoin" and "Nightfall". The benchmark field says this is the one place the plan is behind:

- **Base**: Agents is a top-level nav section, peer of the chain itself; landing page leads with Payments / Agents / Tokens task links.
- **Abstract**: two flagship products (Global Wallet, AI Agents) each get a top-level tab beside the chain docs.
- **World**: landing cards order Mini Apps and AgentKit first, the chain last; Mini Apps is the largest section of the docs (60+ pages).
- **Crossmint**: Agents is a top-level section with a dedicated mental-model page before any API detail.
- **Stripe**: a `/agents` hub one click from the docs root.
- **Solana**: `/developers/ai` plus a root-level SKILL.md; "AI Agent Resources" is literally the first section of its llms.txt.
- **TON**: agents promoted on the docs front page ("Enable TON for agents with @ton/mcp").

The cautionary tale is **NEAR**: it promoted an agent framework to top-level, then had to deprecate it and restructure again. The lesson isn't "don't lead with agents" — it's *lead with what you actually maintain*. Celo's agent stack (x402, ERC-8004, fee abstraction for agents, MCP, Celopedia, skills) is shipping and maintained, so the risk profile is Base's, not NEAR's.

### Recommendation: keep 4 tabs, change what leads

No fifth tab needed (the proposal's concern about a dominant tab is fair). Three changes inside the agreed structure:

1. **Build tab group order becomes: Quickstart → Agents → Mini Apps (MiniPay) → Network info → Other guides → Tools → Reference.** Rename "AI / agents" to **"Agents"** and promote it and MiniPay from sub-groups of "Guides" to named top-level groups of the Build tab. Farcaster/Self/DeFi/SocialConnect stay under Guides.
2. **A real homepage (resolves Open Decision #6 — see below)** whose cards are jobs-to-be-done: *Build an agent that pays* / *Build a Mini App for 10M+ MiniPay users* / *Accept stablecoin payments* / *What is Celo* / *Run a node*. The landing page currently doesn't contain the word "agent" at all (see `03-web2-readability-audit.md`).
3. **One "AI resources" page under Agents**, unifying llms.txt, llms-full.txt, per-page `.md` export, the Celo MCP server, Celopedia, and the installable skills — the pattern every leader ships (Base's "Resources for AI agents", Solana's root agent stack, Abstract's Agent Resources, NEAR's "Tools for AI Agents"). Most of it is Mintlify configuration, not new content: Optimism got llms.txt, per-page `.md`, agent-hint banners, and Open-in-Claude/ChatGPT menus essentially from `docs.json` settings.

## Positions on the 7 open decisions

1. **End-user wallet/exchange content — split to celo.org, but not in this restructure.** All three of the proposal's own references (Base, World, Optimism) keep end-user content out of dev docs, and nothing in the other 8 benchmarks contradicts that. Park it in Learn > Using CELO now (as proposed) so the restructure isn't blocked, and open a separate follow-up for the celo.org migration.
2. **Decommissioned mechanisms (granda-mento, doto, randomness) — archive, don't delete.** Inbound citations from research papers are real SEO/credibility value at near-zero carrying cost once they're out of primary nav. (NEAR's hard-delete of BOS is the counterexample, but NEAR had no research-citation surface on those pages.)
3. **L1 validator content — archive**, same reasoning; ~17 files out of nav costs nothing.
4. **Tab name "Operate" — keep.** Verb-consistency (Learn/Build/Operate/Contribute) reads better than Optimism's noun personas, and no benchmark suggests the name matters much. Not worth more discussion time.
5. **`specs.mdx` to Learn > Network — agree.** Spec reference serves builders and operators; Learn is the shared shelf.
6. **Root index — build a real homepage, don't land on Learn.** This is the strongest-evidenced decision in the set: Base, World, Stripe, Crossmint, CDP, and Privy all use a card/task homepage; NEAR's landing is a tabbed quickstart chooser with time-to-success badges. Landing on Learn would put "what is Celo" prose in front of an audience that wants "what can I ship". The homepage is also where the agent-first message gets made — without it, recommendation 1 above has nowhere to live.
7. **Persona-first vs product-first — the axis is a false choice; go task-first at the entry, persona-ish behind it.** The field is genuinely split (Optimism persona-first; Base/World/Crossmint/Abstract product-first; Stripe jobs-to-be-done-first), so neither is "the default". What *is* universal across all 11: the entry points are tasks/use-cases, and agents+consumer products are surfaced at the top level regardless of the underlying axis. The proposed 4 verb-tabs are a fine skeleton — decision made by adopting the homepage (decision 6) + Build-tab reordering above.

## Additions to the plan (new work items, sequenced)

These slot into the existing 6-PR sequence without disturbing it:

- **With PR 4 (Build tab):** the group reordering + "Agents" rename above; a "give your agent a wallet and test funds" first-mile page; a signup-free x402 testnet path with an explicit success checkpoint (CDP's pattern); Self Agent ID documentation in the Self guide — currently the largest single content gap versus the stated message (details in `03-web2-readability-audit.md`).
- **With PR 6 (llms.txt):** go beyond llms.txt to the full Mintlify AI-readability stack — llms-full.txt, per-page `.md`, contextual menu (Copy / Open in Claude / Open in ChatGPT / MCP), and the "AI resources" page. Same PR, mostly config.
- **With PR 4 (Build tab), MiniPay content strategy — link, don't duplicate.** The official MiniPay docs (https://docs.minipay.xyz/) now cover the full mini-app lifecycle — quickstart, testing inside MiniPay, wallet connection, deployment, submission, and a technical reference (deeplinks, phone-number lookup, custom methods) — with their own llms.txt and per-page `.md` exports. Celo's `build-on-minipay/*` pages duplicate a subset of this and lag it (the deeplinks and ngrok pages are the known-stale examples). There is no clean way to "pull" content across two Mintlify sites, and syndication would just create a second copy to keep fresh plus duplicate-content SEO. So: slim Celo's MiniPay section to **one strong overview** (why MiniPay: 10M+ activations, distribution, discovery page; what's Celo-specific: stablecoins, fee abstraction, phone-number mapping; funding/Proof of Ship pointers) that routes into docs.minipay.xyz for everything lifecycle-related — the TON pattern, where the chain docs own only the chain-specific layer and stay thin and current. This shrinks the proposal's `build/guides/minipay/*` mapping (5 pages) to 1–2 pages, and the freshness loop watches docs.minipay.xyz's llms.txt so the overview can't silently drift (see `04-freshness-automation-proposal.md`).
- **After the restructure:** a MiniPay "Growth"/distribution angle on that overview (analytics, notifications, discovery-page submission — World treats distribution as a documented product feature and its Mini Apps section is its biggest asset); a product-tagged changelog (Stripe/CDP/Crossmint pattern); freshness frontmatter rollout per `04-freshness-automation-proposal.md`.

## What this review deliberately does not touch

Operate tab content, Contribute tab content, protocol reference, node-operator guides, and anything owned by the infra/protocol track — per the agreed division: the restructure PR already handles their mechanical moves, and their substance is not this workstream's to change.
