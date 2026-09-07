# AGENTS.md — how to work in the Celo docs

Guidance for humans and coding agents editing `celo-org/docs`. It is the acceptance standard for every content PR. When something here conflicts with a page you are editing, the page is wrong — fix the page or open an issue, do not copy the drift.

Structural work in progress is tracked in the restructure epic, [#2266](https://github.com/celo-org/docs/issues/2266). Read it before moving pages.

## 1. What this repo is

- A [Mintlify](https://mintlify.com) site. Content is MDX; navigation, redirects and theme live in `docs.json`. There is no build step beyond the Mintlify CLI.
- `docs.json` is the single source of truth for what is reachable. **A file on disk is unreachable until it is listed under `navigation`.**
- Content directories today: `home/`, `build-on-celo/`, `tooling/`, `contribute-to-celo/`, `operate/`.
- `snippets/` holds reusable JSX/MDX (`/snippets/ColoredText.jsx`, `/snippets/YouTube.jsx`, `/snippets/AddNetworkButton.jsx`). Import with an absolute path after the frontmatter: `import {YouTube} from '/snippets/YouTube.jsx'`.
- Static assets: `img/`, `images/`, `assets/`, `logo/`.
- **Any `.js` file under the content root runs on every published page.** Mintlify injects them automatically — there is no allowlist and no way to scope one to a single page — and the same applies to `.css`. Treat a `.js` file here as production code shipped to every reader, not as content: it has full same-origin DOM access on pages that print contract addresses and RPC endpoints. Mintlify does not support a raw `<script src>` in MDX, so third-party scripts are injected programmatically from such a file (`assistant.js` is the example). Note `submodules/developer-tooling` sits under this root too.
- Site analytics (GA4 via Google Tag Manager for humans, Cloudflare AI Crawl Control for bots/agents) are documented in [ANALYTICS.md](./ANALYTICS.md).

### Commands

```bash
npm i -g mint          # once
mint dev               # preview at http://localhost:3000
mint broken-links      # must pass before every PR; CI runs it on every PR to main
mint update            # if the CLI misbehaves
```

## 2. Before you move, rename or delete a page

All four steps, every time. External links and search results break silently when one is skipped.

1. Add a `redirects` entry in `docs.json`: `{ "source": "/old/path", "destination": "/new/path" }` — no `.mdx`, root-relative. Point at the final page, not at another redirect.
2. Update the page's entry under `navigation` (or remove it).
3. Update every inbound internal link: `grep -rn --include='*.mdx' "/old/path" .`
4. Run `mint broken-links`.

Deleting a page still needs step 1 — redirect to the nearest page that answers the same question.

## 3. Page anatomy

### Frontmatter

```yaml
---
title: "x402: Agent Payments"          # required; quote only when it contains a colon
sidebarTitle: "x402: Payments"         # optional; only when the nav label must be shorter than the title
description: Use the x402 protocol to let agents and apps pay per HTTP request with stablecoins on Celo
---
```

- `title` and `description` are required. `description` is what `llms.txt` shows AI tools and what search previews show humans — write the outcome the page enables, one sentence, no trailing period.
- Never use `og:description`, `id`, `icon`, or `mode` in frontmatter. Pages still carrying `og:description` are being migrated (#2239).
- No H1 in the body; the title is the H1. Start with one or two sentences of prose before the first `##`.

### The first paragraph says who the page is for

End user holding CELO, app developer, agent developer, node operator, or contributor. If a reader cannot tell within one sentence whether the page is for them, rewrite the opening.

### Section order by page type

Use these names exactly (they are the most common ones in the repo; synonyms like "Requirements", "Quick Start", "Additional Resources" and "Further Reading" are out).

| Page type | Sections, in order |
|---|---|
| **Guide** (how to do X) | intro → `## Prerequisites` → `## How it works` (optional, short) → task sections named by the task (`## Estimate the gas fee`) → `## Troubleshooting` → `## Resources` → `## Related` |
| **Concept** (what X is) | intro → `## How it works` → `## Why it matters on Celo` → `## Resources` → `## Related` |
| **Reference** (addresses, parameters, APIs) | intro → one table or list per network, **mainnet first, then Celo Sepolia** → `## Related` |
| **Notice** (upgrade, deprecation) | what changes → who is affected → what to do, with a date → `## Resources` |
| **Index** (group landing) | one paragraph → `CardGroup` of the pages in the group |

`## Resources` is a two-column table (Resource | Link). `## Related` is a bullet list of internal pages with a dash and a half-sentence on why. Both close the page.

### Headings

- Sentence case for new and rewritten headings: `## How it works`, not `## How It Works`. Do not mass-retitle old pages just for case; fix headings on pages you are already editing.
- No emoji, no numbering in headings (`## 1. Install` → `## Install`), no questions as headings unless the page is an FAQ.
- A heading names the task or the thing. "Overview", "Introduction" and "Details" carry no information.

## 4. Writing style

- Plain English, active voice, present tense. Short words over long ones. Cut every word that does no work.
- Document what is true now. No "recently", "as of the L2 migration", "previously", "coming soon", "roadmap". Change history belongs in Notices and release notes; planned work is not documented until it ships.
- Never invent a technical detail. If you do not know an address, flag, endpoint, env var or command, look it up (this repo, the source repo, the live chain) or say you do not know. Addresses are checked against the chain (`eth_call` / `eth_getCode`) before they land, not copied from memory or from another page.
- No inflated adjectives ("seamless", "robust", "powerful", "comprehensive", "leading"), no unsourced superlatives ("the only production-ready…"), no rule-of-three padding, no promotional framing.
- No comparisons that position Celo against another chain or product ("the equivalent of X on Y"). Describe what Celo does.
- Link jargon on first use on introductory pages — ERC-20, EVM, EOA, facilitator, base units — or replace it with the plain word.
- Callouts: `Note`, `Tip`, `Info`, `Warning` components only. Never `>` blockquotes for callouts.

## 5. Code examples

The policy, decided for the restructure: **troubleshooting-first.**

- Keep examples that resolve something a reader or an AI assistant cannot derive from the SDK's own docs: paying gas in a stablecoin (`feeCurrency`), adapter address vs token address, 6 vs 18 decimals, MiniPay-specific provider behaviour, Celo chain configuration, the exact error a wrong choice produces.
- Drop large end-to-end examples (full apps, multi-file scaffolds). Link to a template repo instead.
- Every example that stays must run. The PR that adds or changes one notes the command and its output.
- Self-contained: imports shown, env vars named, network stated in a comment. A reader copies one block and it works.
- Bare language tag, no `title=`, no line highlighting. Use `bash` for shell (not `sh`/`shell`), `ts`/`tsx` for TypeScript (not `typescript`), `js`/`jsx` for JavaScript, `solidity`, `json`, `yaml`.
- Every address in a code block or table carries the network name and, for tokens, the decimals: `// Celo mainnet (42220), USDC, 6 decimals`.
- Prefer `viem` / `wagmi` examples; they support Celo fee-currency transactions natively.
- Testnet is **Celo Sepolia, chain ID 11142220**. Alfajores (44787) is retired — do not reference it.

## 6. Links and components

- Internal links are root-relative with no extension: `[Fee abstraction](/build-on-celo/fee-abstraction/overview)`. Never `./`, `../`, or `.mdx`. Anchors are fine: `/build-on-celo/fee-abstraction/using-fee-abstraction#adapter-addresses`. `mint broken-links` does not validate anchors — check them by hand.
- External links use the full URL. Link to the canonical source (the standard, the SDK docs, the contract on the explorer).
- Components in use: `Card`/`CardGroup` for index and landing pages, `Tabs`/`Tab` for per-OS or per-client variants, `Accordion`/`AccordionGroup` for optional depth, `Frame` around images, `CodeGroup` for the same step in several package managers. Numbered procedures are plain markdown lists. Keep to this set so pages look alike.
- Images never carry information that is not also in the text. Agents and screen readers do not see screenshots.

## 7. One fact, one page

Numbers and addresses live on one canonical page; every other page links there instead of restating them. When you change a fact, grep for its old value across the repo.

| Fact | Canonical page | Say this |
|---|---|---|
| Chain IDs, RPC URLs, explorers, faucet | `/build-on-celo/network-overview` | mainnet `42220`, `https://forno.celo.org`; Celo Sepolia `11142220`, `https://forno.celo-sepolia.celo-testnet.org`; faucet `https://faucet.celo.org/celo-sepolia` |
| Block time | `/operate/specification/deployments` | "1-second blocks". Do not write "1-second finality" — see `/operate/specification/finality` |
| Transaction cost | `/operate/specification/transaction-fees` | "below $0.01 for a typical transaction" |
| Fee abstraction | `/build-on-celo/fee-abstraction/overview` (guide), `/tooling/contracts/fee-currencies` (addresses), `/operate/specification/fee-abstraction` (protocol) | pay gas in USDm, USDC, USDT or another allowlisted token from any EOA; no paymaster; 6-decimal tokens use the **adapter** address as `feeCurrency` |
| Stablecoins | `/build-on-celo/build-with-local-stablecoin` | 15 Mento stablecoins (USDm, EURm, BRLm, KESm, …) plus USDC, USDT, USA₮ and other issuers — "30+ stablecoins" in total |
| MiniPay | `/build-on-celo/build-on-minipay/overview` | stablecoin wallet, 10M+ activations, Mini App discovery page, Celo only |
| Token duality | `/operate/specification/token-duality` | CELO is both the native token and an ERC-20; no wrapping |
| Data availability | `/operate/specification/eigenda` | EigenDA |
| Architecture | `/build-on-celo/cel2-architecture` | Ethereum L2 on the OP Stack |
| Agent payments | `/build-on-celo/build-with-ai/x402`, `/build-on-celo/build-with-ai/mpp` | HTTP 402 flows settled in USDC/USDT; Celo facilitator `https://api.x402.celo.org` |
| Agent identity and trust | `/build-on-celo/build-with-ai/8004`, `/build-on-celo/build-with-ai/self-agent-id` | ERC-8004 registries on Celo; Self Agent ID adds a zero-knowledge proof-of-human |
| Human identity | `/build-on-celo/build-with-self` | Self: passport / EU ID / Aadhaar proofs, nothing leaves the device |
| Phone-number mapping | `/build-on-celo/build-on-socialconnect` | SocialConnect / ODIS |
| AI tooling | `/build-on-celo/build-with-ai/use-docs-with-ai`, `/build-on-celo/build-with-ai/celopedia`, `/build-on-celo/build-with-ai/mcp/index` | in-page Ask AI assistant, docs MCP at `https://docs.celo.org/mcp`, `llms.txt`, per-page `.md`, Celopedia skill, Celo MCP server |

### Partner contract addresses

Third-party (partner) contract addresses are not listed in these docs — link to the provider's canonical address page instead. Nothing here watches on-chain activity, and listed partner addresses have gone quiet in place before (#2277). Celo-core contracts — the registry, fee-currency directory entries, the CELO token, our spec deployments — keep their tables here. Example addresses in code snippets are labelled `// example` so nobody funds them.

### Names

- `USDm`, `EURm`, `BRLm` … — Mento stablecoins, lowercase `m`. `USDM` (capital M) is Mountain Protocol's token, a different asset. Never use one for the other.
- `USDC`, `USDT`, `USA₮`, `CELO` — as the issuers write them. Use `USDT` in prose and code (not `USD₮`).
- "Celo" is the chain, "CELO" the token. "MiniPay" (one word, capital P), "Mini App" (two words). "Celo Sepolia" is the testnet.
- Write "fee abstraction" and "fee currency" in lowercase in prose.

## 8. Writing for AI agents (discoverability)

Most readers of these docs are now AI assistants and agents. Mintlify already serves them: `https://docs.celo.org/llms.txt` (index of every page's title and `description`), `llms-full.txt` (full text), every page as Markdown at its URL plus `.md`, the docs MCP server at `https://docs.celo.org/mcp`, and the page-level Copy / ChatGPT / Claude / Cursor menu. Human readers also get the in-page [Ask AI assistant](/build-on-celo/build-with-ai/use-docs-with-ai), which answers from the same MCP endpoint. The [Celopedia skill](/build-on-celo/build-with-ai/celopedia) and the [Celo MCP server](/build-on-celo/build-with-ai/mcp/celo-mcp) are further entry points. Nothing needs configuring per page — but a page is only as useful to an agent as its text is explicit.

Rules that make a page work for an agent:

1. **The `description` is the hook.** It is the only thing an agent sees before deciding to open the page. State the task and the primitive: "Pay gas in USDC from an agent wallet with viem on Celo", not "Learn about fee abstraction".
2. **Every fact is self-contained where it appears.** Network name and chain ID next to every address; decimals next to every token; the exact package name and version constraint next to every import. Agents read one chunk, not the page.
3. **Lead with Celo's primitives and say why they matter for the task.** When a page touches payments, identity, or gas, name the Celo-specific capability in the first paragraph: stablecoins as the unit of account, gas paid in stablecoins (no CELO needed), MiniPay distribution, ERC-8004 / Self Agent ID for identity, x402 / MPP for HTTP payments, 1-second blocks and sub-cent fees. These are the reasons an agent chooses Celo; do not bury them under generic EVM content.
4. **Troubleshooting sections carry the exact error string** and the one-line fix. That is the content agents cannot get from SDK docs.
5. **One canonical page per fact** (section 7). Duplicates drift, and an agent that reads two different addresses for "Sepolia USDC" stops trusting both.
6. **Headings name the task.** `## Estimate gas in USDC`, not `## Step 3`.
7. **Close with `## Related`.** Agents traverse the link graph; a page with no outgoing internal links is a dead end.
8. **Text over images.** Screenshots are fine as illustration; the steps must be in words.
9. **New agent-relevant pages get listed** on `/build-on-celo/build-with-ai/overview` and, when it exists, the AI-resources page (#2261).

## 9. Pull requests

- Branch from `main`: `<github-handle>/<issue>-<slug>`. One concern per PR; PR title is the squash commit on `main` (Conventional Commits, e.g. `docs(minipay): collapse section to one overview`).
- Run `mint broken-links` on the branch head and paste the output in the PR. If the PR adds or changes a code example, paste the command you ran it with and the output.
- `Closes #N` only when every acceptance box in #N is met; otherwise `Refs #N` and say which boxes remain.
- Moved or deleted a page? List the redirects you added in the body.
- Full rules for issues, PRs and reviews: `.claude/shared/engineering-rules.md`.
