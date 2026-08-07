# Benchmark Report: 11 Leading Docs Sets, Consumer + Agent Lens

Field research for the Celo docs restructure. Eleven documentation sites were audited live in 2026-07 against a fixed rubric: information architecture, landing-page value proposition, quickstart quality, agent docs, mini-app/consumer docs, freshness practices, and Web2 accessibility. Set (user-approved): Base, World, Optimism, Solana, TON/Telegram Mini Apps, Coinbase Developer Platform (CDP), Stripe, NEAR, Privy, Abstract, Crossmint.

## Scorecard

| Docs | IA axis | Agents in nav | AI-readability stack¹ | First-success path | Web2 accessibility |
|---|---|---|---|---|---|
| [Base](https://docs.base.org) | Use-case-first (Payments/Agents/Tokens) | **Top-level tab** | llms.txt + full + .md + MCP + skills + prompt library | 5–10 min, zero-framework HTML, real USDC on testnet | Strong |
| [World](https://docs.world.org) | Product-first, apps before chain | Top-level (AgentKit) | llms.txt + .md mirrors + 2 hosted MCP servers | `npx create-mini-app`, submission included | Strong (mini apps) |
| [Optimism](https://docs.optimism.io) | Persona-first (chain ops lead) | **None** (readability only) | llms.txt + full + .md + agent banners + Open-in-Claude | No true app quickstart | Poor |
| [Solana](https://solana.com/docs) | Layered (/docs + /developers + cookbook) | /developers/ai hub | llms.txt + full + **root SKILL.md** + MCP | Zero-install browser playground | Moderate |
| [TON/Telegram](https://docs.ton.org) | Product-first, split across 3 sites | Front-page (@ton/mcp, agentic wallets) | llms.txt + /llms markdown routes + skills | BotFather + any HTTPS URL; zero blockchain | Strong (mini apps) |
| [CDP](https://docs.cdp.coinbase.com) | Capability-grouped products | AgentKit + x402 products | llms.txt with "AI & Agent Tooling" section | `npm create onchain-agent` 5-min; **signup-free x402 testnet** | Strong |
| [Stripe](https://docs.stripe.com) | Jobs-to-be-done first | **/agents hub** + ACP | llms.txt w/ LLM instructions + .md + MCP + skills catalog | ~10 min, framework switchers, test mode default | Gold standard |
| [NEAR](https://docs.near.org) | Tech-layer tabs | "Tools for AI Agents" page (Shade Agents deprecated) | llms.txt + hosted docs-MCP + on-chain MCP + skills | Tabbed chooser w/ time badges | Moderate |
| [Privy](https://docs.privy.io) | Product-first, two-path landing | Agentic-wallets recipe + MPP | llms.txt w/ imperative agent instructions + MCP + skill | 3-step React, auth-first, no crypto needed | Strong |
| [Abstract](https://docs.abs.xyz) | Product-first | **Top-level "AI Agents" tab** | llms.txt + full + .md + MCP + SKILL.MD | One scaffold command | Moderate |
| [Crossmint](https://docs.crossmint.com) | Product-first + solutions layer | Top-level section + mental-model page | llms.txt + full + .md + docs MCP | **In-page interactive demo**, under 5 min, email-only | Strong |

¹ "AI-readability stack" = machine-readable docs for coding agents: llms.txt/llms-full.txt, per-page markdown export, docs MCP server, installable skills.

**Celo today, same rubric:** agents two levels deep in tab 2 of 6; landing page without the word "agent"; no llms.txt, no .md export, no docs MCP page, skills exist but are documented on one sub-page (Celopedia); quickstart is solid (`npx @celo/celo-composer`) but not agent- or payment-flavored; no changelog; Web2 accessibility mixed (excellent fee-abstraction framing, jargon-heavy landing). Detail in `03-web2-readability-audit.md`.

## What the leaders agree on (adopt these)

1. **Agents are a top-level surface, never a guide sub-group.** 9 of 11 sites surface agents at or near the nav root; the two that don't (Optimism, and NEAR after its deprecation) are the two *not* competing for agent developers. → Celo: promote "Agents" to a named Build-tab group + homepage card (see `02-restructure-review.md`).
2. **The full AI-readability stack is table stakes in 2026.** Every single benchmarked site ships llms.txt; the leaders add llms-full.txt, per-page `.md`, a docs MCP server, and installable skills, gathered on one "resources for AI agents" page (Base, Solana, Abstract, NEAR, Stripe). Two go further in ways worth copying: Stripe embeds imperative LLM instructions in llms.txt steering agents away from legacy APIs; Optimism prepends a banner to every page telling agents to fetch /llms.txt. Mintlify provides most of this via config. → Celo: one PR, mostly `docs.json`.
3. **Entry points are tasks, not products or concepts.** Stripe's landing links are "Accept payments online"; Base's are "Accept payments / Get started with MCP / Launch a token"; Privy forks by builder intent; NEAR is a quickstart chooser with time badges. Nobody lands visitors on "what is X" prose. → Celo: real homepage with jobs-to-be-done cards (PR #2209 open decision #6).
4. **First success before any account, framework, or crypto knowledge.** Base: one HTML file to a USDC payment. CDP: x402 on testnet with no signup. Crossmint: in-page demo with just an email. Solana: browser playground, "no programming knowledge required". TON: a mini app is "just static files at an HTTPS URL". The consistent trick: sandbox/testnet is the default universe and the quickstart ends with an explicit success checkpoint. → Celo: signup-free x402 testnet path; keep composer as the scaffold path.
5. **Distribution is documented as a product feature.** World's Mini Apps section (its largest) includes app-store submission *inside the quickstart* plus a Growth section (analytics, viral invites, notifications); Solana Mobile pitches "100k+ crypto power users"; TON has an Apps Center. MiniPay's 10M+ users are Celo's strongest single asset and the docs say almost nothing about getting discovered by them. → Celo: MiniPay Growth/distribution section.
6. **Freshness is engineered, not promised.** Optimism auto-generates release pages from GitHub releases and renders contract addresses live from a registry; NEAR auto-syncs its RPC OpenAPI from nearcore; Stripe/CDP/Crossmint ship dated, product-tagged changelogs with breaking-change flags; World runs prose linters in CI. Nobody relies on humans remembering. → Celo: `04-freshness-automation-proposal.md`.
7. **Fewer, stabler top-level sections; satellites for volatile depth.** NEAR keeps ~8 tabs and pushes deep/volatile products to satellite sites; TON splits platform/chain/SDK across three sites with hard redirects; NEAR and Base both *deleted* dead products outright. The anti-pattern is Celo's current 6-tab spread with a 39%-of-pages Tooling drawer — which PR #2209 already fixes.

## Per-site notes worth stealing (beyond the consensus)

- **Stripe**: "Recommended" labels on one option in every comparison table (kills choice paralysis); complexity ratings (1/5) on integration paths; no-code → low-code → full-code ladder; named API versions in the changelog with Breaking/Non-breaking flags.
- **Base**: deprecated its own MiniKit/Farcaster mini-app stack and shipped an *AI migration skill* to automate the transition — automation applied to deprecation, the hardest freshness problem.
- **World**: the closest MiniPay analog. 15 command pages, 8 documented error codes on the pay command, migration guides *into* the mini-app format from plain web apps.
- **Crossmint**: one conceptual "how agents pay" mental-model page before any API reference — the pattern for making x402/8004 land with newcomers.
- **Privy**: llms.txt opens with "STOP — do this before generating any code" aimed at coding agents; recipes are named by business outcome ("Treasury wallets", "Send USDC").
- **CDP**: dollar-denominated prices in every code sample (`price: "$0.001"`); chains appear as config values, not concepts to learn first.
- **TON**: mini-app docs stay thin by owning only the wallet/chain-specific layer and linking out for generic web dev — a maintenance-cost insight as much as a UX one.
- **Optimism**: the negative case — best-in-class AI readability and freshness engineering, near-zero consumer/agent content, and a landing page serving chain operators first. Structure alone doesn't win the audience; the message has to lead.
- **NEAR**: the other cautionary tale — promote only what you maintain; delete what you deprecate.

## Sources

Each claim above is grounded in the live sites as of 2026-07-06; primary URLs: docs.base.org, docs.world.org, docs.optimism.io, solana.com/docs, docs.ton.org, core.telegram.org/bots/webapps, docs.cdp.coinbase.com, docs.stripe.com, docs.near.org, docs.near.ai, docs.privy.io, docs.abs.xyz, docs.crossmint.com (and their respective llms.txt files and public GitHub repos).
