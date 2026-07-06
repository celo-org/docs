# Web2 Readability Audit

How understandable are the Celo docs for a Web2 developer — someone who builds with Stripe, Express, and React, has never held a private key, and arrives because they heard "agents can pay and verify identity on Celo"? This audit walks the two journeys such a developer actually takes, page by page, and lists concrete fixes. Pages audited on this branch, 2026-07.

**Bottom line: the ingredients are good — the agent pages are among the strongest in the docs — but the path to them is invisible, and every page assumes wallet literacy the target reader doesn't have.** A Stripe developer bounces before reaching x402, and if they search for agent identity, the docs have no answer at all (Self Agent ID, live on Celo mainnet, is not mentioned anywhere).

---

## Journey 1 — "I build AI agents and want them to send/receive payments"

### Hop 1: Landing page (`home/index.mdx`)

The first page a visitor sees **does not contain the words "agent" or "AI" at all.** The headline is "Discover Celo — an Ethereum Layer-2 designed to make blockchain technology accessible to all." For the primary audience the team wants to win, the landing page is a dead end: nothing routes them anywhere. Compare: Base's landing leads with Payments/Agents/Tokens task links; World's first row of cards includes AgentKit; Stripe's `/agents` hub is one click from the docs root.

Other Web2 friction on this page:
- "Fully EVM-compatible", "Token Duality", "ERC20", "native transfer", "governance", "staking" — all unexplained, none of it relevant to the arriving reader's job.
- The page's calls to action are governance voting and Discord — not "build something in 10 minutes".

### Hop 2: Finding the agent docs

The agent hub lives at *Build on Celo → Build with AI → Overview* — tab 2, nested group, below the fold of the nav. A visitor has to already believe Celo has agent tooling to go looking for it. There is no `/agents` URL, no landing-page card, no llms.txt to route AI assistants (all 11 benchmarked docs sites with agent ambitions ship one; Celo doesn't yet — flagged in PR #2209 as a to-do).

### Hop 3: `build-with-ai/overview.mdx`

The strongest Web2-facing page in the docs. "Agentic Activity with Real World Utility" is a clear pitch; the fee-abstraction section brilliantly frames a real agent problem ("your agent's treasury is one stablecoin") with a complete copy-paste example. Remaining friction:
- The code example starts from `AGENT_PRIVATE_KEY` in an env var, with no pointer to *how an agent gets a wallet and funds in the first place* (key generation, testnet faucet, onramp). Stripe/CDP/Crossmint all answer "where does the money come from" before "how do I move it".
- Adapter-vs-token address and 6-vs-18 decimals arrive with no warm-up — correct content, but it needs a "you can get this wrong silently" warning box earlier.
- The "Types of AI Agents" taxonomy (basic/functional/autonomous/multi-agent) is filler for this audience; a "Ship your first paying agent in 10 minutes" link would earn that space.

### Hop 4: `build-with-ai/x402.mdx`

Good structure (the comparison table against traditional payments is exactly the right Web2 framing; the sequence diagram is clear). Friction for a Web2 reader:
- **No signup-free first success.** CDP's x402 seller quickstart runs on testnet with no account; Celo's page jumps into thirdweb SDK code requiring a thirdweb client ID and secret key before the first request works.
- Undefined jargon at first use: *facilitator* (load-bearing concept, never defined in plain words), *settlement*, *ERC-2612 permit / ERC-3009 authorization*, *base units* (`maxValue: "1000000"` — is that $1 or $1M? — no comment).
- Prerequisites are implicit: a funded wallet, familiarity with `privateKeyToAccount`, and understanding that "price: $0.01" is denominated in real dollars but paid in a stablecoin.
- No "Congratulations, you just charged an agent $0.01" checkpoint (Stripe ends every quickstart with an explicit success state and next-step branches).

**Journey 1 verdict:** a determined Web2 developer who *finds* these pages can succeed in an afternoon; the failure mode is discovery (hops 1–2) and the missing wallet-and-funds on-ramp, not the core content.

---

## Journey 2 — "I want identity/verification for my users or agents"

Per the team's direction, this journey should land on **Self Agent ID**.

### What happens today

Searching the docs for identity leads to `build-on-celo/build-with-self.mdx`. That page:
- Describes Self as human identity verification (passports, EU ID, Aadhaar) — good, but **contains no mention of Agent ID**, Self's agent-identity product that is *live on Celo mainnet* with a soulbound registry, an SDK (`@selfxyz/agent-sdk`, plus Python/Rust), wallet-free registration modes, and a REST API.
- Is a feature-list page ("New Features (2025)", integrations, points program) rather than a journey: no code, no quickstart, ten external links with no guidance on which one to click first.
- The ERC-8004 page and the Self page don't reference each other, even though Self Agent ID is a reference implementation of ERC-8004 with a proof-of-human extension — the exact "trust layer" story the 8004 page is trying to tell in the abstract.

**Journey 2 verdict: dead end.** The docs' best agent-identity asset isn't documented. A Web2 developer cannot discover from Celo's docs that they can give an agent a verified, sybil-resistant identity, with no crypto wallet required, backed by a passport-scan proof-of-human.

### What the Self section should say (concrete fix for `build-with-self.mdx`)

Add an "Identity for AI agents" section covering: Agent ID is live on Celo mainnet (registry `0xaC3DF9ABf80d0F5c020C06B04Cced27763355944`, chain 42220; Sepolia `0x043DaCac...`, chain 11142220 — warn that this is *not* the old Alfajores 44787); the wallet-free CLI registration quickstart (`self-agent register init --mode wallet-free --network testnet` → QR scan → export); `agent.fetch()` auto-signing on the agent side and the Express-middleware verifier (`requireAge(18).sybilLimit(3)`) on the service side; the ERC-8004 relationship (cross-link both directions); and Celo Agent Visa (gasless, tiered agent-activity NFT). Links: docs.self.xyz/self-agent-id/overview, the agent-builder guide, github.com/selfxyz/self-agent-id.

---

## Jargon inventory (terms used before/without definition, high-traffic pages)

| Term | Where | Fix |
|---|---|---|
| facilitator | x402 page, load-bearing | One-sentence plain definition at first use ("a service that checks and submits the payment for you — like a payment processor") |
| base units / decimals | x402 `maxValue`, adapter table | Inline comment with the dollar value; "you can lose 12 orders of magnitude here" warning |
| ERC-2612 / ERC-3009 / ERC20 / EVM | x402, landing | Link on first use or drop from intro-level pages |
| Token Duality, native transfer | landing | Move to protocol docs; irrelevant to arriving builders |
| fee currency / adapter address | AI overview | Keep — but always paired with the "why" sentence it already has (this page does it best) |
| soulbound NFT, nullifier, attestation | (will arrive with Agent ID content) | Introduce with plain-language glosses, as Self's own agent-builder guide does |
| ODIS, SocialConnect | identity pages | Fine for protocol docs; keep out of the agent-identity journey |

## Structural fixes, ranked by impact

1. **Landing page must route the primary audience.** Rewrite `home/index.mdx` (or the future real homepage — PR #2209 open decision #6) around jobs-to-be-done cards: *Build an agent that pays* / *Build a Mini App for 10M MiniPay users* / *Accept stablecoin payments* / *Run a node*. Sample rewrite of the intro for a Stripe-calibrated reader:
   > **Celo is where AI agents and mobile-first apps move real money.** Payments settle in about a second and cost less than a cent, in stablecoins your users already understand (dollars, euros, and 20+ local currencies). Your agents don't need a separate gas token, your users don't need seed phrases, and your first payment works on testnet in ten minutes — no account required.
2. **Give agents a discoverable front door**: an `/agents`-style section reachable in one click, plus llms.txt so AI assistants route themselves (every benchmarked competitor ships this).
3. **Add the missing first mile**: one page answering "give my agent a wallet and test funds" (key generation → faucet → first transfer), linked before every code example that assumes `AGENT_PRIVATE_KEY`.
4. **Document Self Agent ID** (see Journey 2 fix) — currently the largest content gap relative to the team's stated message.
5. **Make one x402 path signup-free on testnet**, with an explicit success checkpoint, before introducing SDK keys.
