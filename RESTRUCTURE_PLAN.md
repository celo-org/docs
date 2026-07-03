# Docs Restructure Plan

Basis for discussion (not an implementation spec) for reorganizing the Celo docs from the current six-tab structure to a four-tab structure. Drafted 2026-04-28; sources and repo facts re-verified 2026-07-03.

---

## Part 1 — Rationale and target structure

### Why

The current six-tab structure (Home, Build on Celo, Tooling, Contribute to Celo, Infra Partners, Legacy) mixes audiences, jobs, and topics on the same axis. Concrete problems:

- **Mislabeled tabs.** "Home" is actually a Learn / Protocol-Reference tab; there is no real homepage.
- **Duplication.** `home/wallets.mdx` and `tooling/wallets/index.mdx` overlap only on the native-wallet list (~40%); the rest diverges — `home` lists end-user *compatible* wallets, `tooling` lists developer *WaaS/infra* providers. Bridging is split across `home/bridged-tokens/` and `tooling/bridges/`. Fee Abstraction has one dedicated directory plus scattered mentions.
- **Wrong-tab content.** `build-on-celo/network-overview.mdx` is protocol reference buried in the builder tab. `cel2-architecture` likewise.
- **Junk-drawer Tooling.** Wallets, Explorers, Indexers, Oracles, Contract Verification, SDKs, Nodes flattened into one tab regardless of audience.
- **Legacy conflates "old code" with "still-relevant context."** Some L1 protocol docs (transactions, identity) still apply on L2 but are hidden behind the Legacy label.
- **Tracked-but-orphaned directories**: `_deprecated/` (105 tracked files, mostly duplicates of `legacy/` and `infra-partners/`).
- **Working-tree-only orphans (already removed locally)**: `/build/`, `/mainnet/`, `/celo-sepolia/`.
- **Naming drift.** "Build with AI" / "Build with Farcaster" / "Build for MiniPay" / "Build on MiniPay" — three prepositions for the same slot.
- **Content on disk but not in `docs.json` nav** (11 files verified tracked-but-unreachable, 2026-07-03):
  - `build-on-celo/support.mdx`
  - `build-on-celo/build-on-socialconnect.mdx`
  - `tooling/wallets/coinbase-wallet.mdx`
  - `tooling/wallets/ledger/eip712-workaround.mdx`
  - `tooling/libraries-sdks/contractkit/migrating-to-contractkit-v1.mdx`
  - `tooling/libraries-sdks/contractkit/migrating-to-contractkit-v2.mdx`
  - `tooling/libraries-sdks/contractkit/migrating-to-viem.mdx`
  - `tooling/libraries-sdks/contractkit/notes-web3-with-contractkit.mdx`
  - `tooling/libraries-sdks/contractkit/data-encryption-key.mdx`
  - `tooling/testnets/celo-sepolia/disclaimer.mdx`
  - `tooling/oracles/wit-oracle.mdx`
  - (`tooling/explorers/blockscout.mdx` and `tooling/explorers/celoscan.mdx` were previously listed here but are **already in the nav** — not orphaned.)

### Reference principles (Optimism, Base, World)

Verified against the live sites, 2026-07.

- **Optimism** (docs.optimism.io) *leads* with three persona tabs — Chain Operators, Node Operators, App Developers — but is not persona-only: it also carries OP Stack, OP Mainnet, How Optimism Evolves, Notices, and Rust as top tabs. Inside a persona the pattern is Guides / Quickstarts / Reference / Tools / Tutorials. Tooling is a per-persona sub-bucket, never a top-level tab. Breaking changes live in a `Notices` tab (active notices at `/notices/<slug>`, past ones under `/notices/archive/`) — there is no "Legacy" tab.
- **Base** (docs.base.org), the other OP-Stack L2, is **product-first**, not persona-first: top sections are Get Started, Base Chain, Base Account, Apps, Agents, Ledgers. Tooling is nested inside products (no Tools tab). Deprecations are handled by a config changelog + per-hardfork spec pages + targeted migration guides — again, no "Legacy" bucket. It is purely developer-facing: no end-user wallet / exchange / on-ramp content.
- **World** (docs.world.org) is also **product-first** — World ID, Mini Apps, World Chain (+ a small AgentKit beta). Developer-only (end-user help lives on support.world.org). Its products avoid a single dominant tab because three of them are independently substantial; Celo's one-chain + thin-primitives + partner-products mix has no such peers, so product-first would create one dominant tab and orphan persona content.
- **All three** publish `llms.txt` (and `llms-full.txt`) as machine-readable sitemaps.

**Takeaway for Celo.** Only two principles are shared across all three references: tooling nested inside sections (never a top tab), and deprecations handled by notices / changelog / migration guides rather than a "Legacy" tab. The persona-first axis is *not* universal — two of the three (Base, World) are product-first, and even Optimism mixes persona, product, and reference tabs. Persona-first can still be the right call for Celo, but it should be argued on Celo's own terms (thin first-party surface, partner-built products), not presented as the industry default.

### Target structure: four tabs

1. **Learn** — "what is Celo": protocol concepts, governance, history, end-user wallet/exchange/ramp guidance.
2. **Build** — for app developers: quickstart → guides → tools → reference.
3. **Operate** — for node operators, RPC providers, exchanges, custodians; includes Notices.
4. **Contribute** — code/CIP/doc contributors, community RPC, release process.

---

## Part 2 — Target structure at group level

Four tabs, each with a repeating internal pattern. This is the shape to agree on; the exhaustive file-by-file mapping lives in **Appendix A**.

### Tab 1 — Learn (replaces "Home")

Audience: everyone asking "what is Celo", plus end users managing CELO.

- **Introduction** — landing page, overview, history, whitepapers, FAQ.
- **Network architecture** — network overview, L2 architecture, L1-vs-L2 compare, L2 specs. *(Pulls `network-overview` + `cel2-architecture` out of the builder tab — wrong-tab fix.)*
- **Protocol** — token, security council, escrow, challengers, transactions. *(Merge overlapping L1 `legacy/protocol/transaction/*` into the L2 framing.)*
- **Governance** — overview, toolkit, proposals, voting, parameters, upgrades.
- **Stablecoins & bridging (concepts)** — Mento background, oracles, stability; bridging concepts. Tool lists move to Build.
- **Epoch rewards** — overview, community fund, carbon fund.
- **Identity** — ODIS + phone-number privacy (still active in MiniPay).
- **Using CELO (end-user)** — wallets, exchanges, ramps, self-custody, asset management, end-user MetaMask/Ledger setup. *(See Open Decision #1: keep here or split to celo.org.)*

### Tab 2 — Build (replaces "Build on Celo" + developer subset of "Tooling")

Internal pattern: **Quickstart → Network info → Guides → Tools → Reference.**

- **Quickstart** — one canonical 5-minute path (folds in the second "tooling overview"), environment setup, migrate-from-Ethereum.
- **Network info** — faucet, testnets, RPC providers (Forno, Alchemy).
- **Guides** — AI/agents; apps & products (MiniPay, Farcaster, Self, DeFi, local stablecoin, SocialConnect); fee abstraction (one home); misc (scaling, Nightfall, funding, support).
- **Tools** — SDKs & libraries (viem/ethers/web3/ContractKit/CLI/…); dev environments; wallet integration (incl. the WaaS/smart-wallet providers currently living in `tooling/wallets`); indexers; oracles; explorers; contract verification; bridges.
- **Reference** — core/token/uniswap contracts, launch checklist. (L1-only contracts → archive.)

### Tab 3 — Operate (replaces "Infra Partners", absorbs L1-only "Legacy")

Audience: node operators, RPC providers, exchanges, custodians.

- **Quickstart / Run a node** — overview, architecture, run, migrate.
- **Integration** — general, checklist, custody, listings, cloud-HSM.
- **Notices** — current + archive. *(Infra Partners already has a "Network Notices" group with an "Archive" subgroup — this formalizes it.)*
- **Archive (formerly Legacy)** — L1-only PoS / consensus / validator / node content, kept for SEO/history, out of primary nav.

### Tab 4 — Contribute (rename only)

"Contribute to Celo" → "Contribute". Contents unchanged: contributors (code/CIP/docs), community RPC nodes, release process. Paths shorten `contribute-to-celo/*` → `contribute/*`.

### The moves worth discussing

Everything else is a 1:1 path move (see Appendix A). These are the non-mechanical calls:

- **`run-a-celo-node`** — currently in Tooling; move to Operate (node-operator persona). Cross-tab.
- **`infra-partners/specs`** — builder-and-operator spec reference; the plan puts it in Learn > Network (Open Decision #5).
- **Wallets** — `home/wallets` (end-user) and `tooling/wallets/index` (native list **+ ~11 WaaS/infra providers**) overlap *only* on the native-wallet list. Split: end-user list → Learn; **WaaS/smart-wallet providers → Build > Tools > Wallet integration**. Do **not** delete `tooling/wallets/index` wholesale — its "Wallet Infrastructure" section is the only home for that developer content.
- **Fee abstraction / thirdweb** — consolidate scattered mentions into one canonical home each (Build > Guides, Build > Tools).
- **Decommissioned mechanisms** (granda-mento, doto, randomness) and **L1 validator content** — archive vs. hard-delete (Open Decisions #2, #3).

---

## Part 3 — Cross-cutting cleanup (independent of IA)

- ✅ Already done: removed working-tree-only `/build/`, `/mainnet/`, `/celo-sepolia/` directories.
- 🗑️ Delete `_deprecated/` (105 tracked files; pure duplicates).
- 🔀 Resolve wallet duplication: dedup the native-wallet list between `home/wallets` and `tooling/wallets/index`; keep the WaaS/infra providers as developer content in Build (see Part 2).
- 🔀 Fee Abstraction: one dedicated directory (`build-on-celo/fee-abstraction/`, 3 files) plus scattered mentions (gas-fees, MiniPay, migrate, AI guides). Keep one canonical home under `build/guides/fee-abstraction/` and point the mentions at it.
- 🔀 Consolidate thirdweb (currently in `build-on-celo/build-with-thirdweb/`, `tooling/dev-environments/thirdweb/`, `tooling/libraries-sdks/thirdweb-sdk/`) into one canonical home under `build/tools/sdks/thirdweb/`.
- ✏️ Pick one preposition convention (e.g. "Build with X" for tools/SDKs, "Build for X" for platforms). Apply to MiniPay, Farcaster, Self, etc.
- ✏️ Flatten "Build with AI" sub-groups ("Agent Infrastructure" + "MCP Servers" + "Use Cases") to a single ordered list under Guides > AI.
- ✏️ Rename or delete `build-on-celo/build-with-thirdweb/one-click quickstart.mdx` (space in filename — 404 hazard).
- 📄 Add `llms.txt` sitemap (Optimism, Base, and World all publish one; several also publish `llms-full.txt`).
- 🔗 Surface the 11 currently-orphaned-but-tracked files (listed in Part 1) in the new nav.

---

## Part 4 — Migration mechanics

### Redirects

Every source path needs a redirect entry in `docs.json` to preserve inbound SEO and external links. The existing `redirects` block (starts ~line 664, ~2,500 lines) shows the pattern from past reorganizations — including catch-all wildcards. Reuse the same trick for the new structure:

```json
{ "source": "/home/:slug*", "destination": "/learn/:slug*" }
{ "source": "/build-on-celo/:slug*", "destination": "/build/:slug*" }
{ "source": "/tooling/:slug*", "destination": "/build/tools/:slug*" }
{ "source": "/infra-partners/:slug*", "destination": "/operate/:slug*" }
{ "source": "/legacy/:slug*", "destination": "/operate/archive/legacy/:slug*" }
{ "source": "/contribute-to-celo/:slug*", "destination": "/contribute/:slug*" }
```

Plus per-file overrides for the files that don't follow a 1:1 path mapping (every entry marked 🔀 in Appendix A). Also remove dangling redirects whose destination points into the removed `/build/*` tree (re-derive the exact lines before editing — they were around line 1400 and 1730–1755 at last check).

### MDX cross-reference cleanup

Files that link to old paths via `/build/*`, `/tooling/*`, `/home/*` need their internal links updated. Known offenders (from earlier survey):

- `tooling/libraries-sdks/composer-kit.mdx`
- `tooling/wallets/index.mdx`
- `tooling/overview/index.mdx`
- `build-on-celo/quickstart.mdx`
- `build-on-celo/build-with-ai/vibe-coding.mdx`
- `build-on-celo/build-with-ai/mcp/index.mdx`

Run `mint broken-links` after each PR.

### PR sequencing (recommended)

To keep review tractable, split into 6 PRs in this order:

1. **Cleanup** — Delete `_deprecated/`. Remove dangling `/build/*` redirects. No nav changes. Risk-free.
2. **Naming + dedup** — Resolve wallet / Fee Abstraction / thirdweb duplications *in place* (merge-content + delete-dupes, no path changes yet). Surface the 11 orphan files into existing nav. Run `mint broken-links`.
3. **Learn tab** — Move `home/*` and still-relevant `legacy/protocol/*` into `learn/*`. Rewrite the "Home" tab as "Learn". Add catch-all redirects.
4. **Build tab** — Move `build-on-celo/*` and the `tooling/*` developer subset into `build/*`. Merge "Build on Celo" + "Tooling" into one "Build" tab. Add catch-alls.
5. **Operate tab + archive** — Move `infra-partners/*` to `operate/*`, fold notices, move L1-only `legacy/*` to `operate/archive/legacy/*`. Merge "Infra Partners" + "Legacy" into "Operate".
6. **Contribute polish + llms.txt** — Rename "Contribute to Celo" → "Contribute", shorten paths, add `llms.txt`. Final `mint broken-links` pass.

Each PR should pass `mint broken-links` before merge.

---

## Part 5 — Open decisions

1. **End-user wallet/exchange/manage content (`home/manage/*`, `home/exchanges`, `home/ramps`):** keep in Learn under "Using CELO", or split out to a separate `celo.org` content hub? *External signal:* Base and World both keep end-user content entirely out of their developer docs, and Optimism is developer-only too — that leans toward a split. Counterweight: Celo has historically served end users in these docs. Currently parked in Learn pending decision.
2. **Truly-decommissioned mechanisms (granda-mento, doto, randomness):** archive (proposed) or hard-delete? Some have inbound SEO from research papers.
3. **L1 validator content (`legacy/validator/*`):** archive under `operate/archive/legacy/` (proposed, ~17 files), or hard-delete? Active L1 validators are gone; only academic/historical interest remains.
4. **Tab name "Operate":** alternatives considered — "Run", "Infrastructure", "Node Operators". "Operate" wins on verb-consistency with "Learn / Build / Operate / Contribute"; flag if a stakeholder objects.
5. **`infra-partners/specs.mdx`:** moved to Learn > Network in this plan (pure spec reference, used by both builders and operators). Keep in Operate instead?
6. **Root `index` for the docs site:** currently routes to `home/`. Pick a target — land directly on Learn, or build a real homepage with cards linking to all four tabs?
7. **Persona-first vs. product-first (new).** Two of the three reference sites (Base, World) are product-first; persona-first is not the field default. Confirm persona-first is right for Celo on its own merits (no peer-sized first-party products) before committing.

---

## Appendix A — Full file-by-file mapping

Reference detail for implementation; not needed to agree the structure above.

Notation:
- `→` move/rename to new path
- `🗑️` delete
- `🔀` merge with another file (deduplicate)
- `📦` archive under `operate/archive/` (kept for SEO/historical context, not in primary nav)
- All file paths are MDX unless noted; `.mdx` extension omitted for brevity.

### Tab 1 — Learn (replaces "Home")

#### Group: Introduction

| Source | Destination | Notes |
|---|---|---|
| `home/celo` | `learn/index` | Becomes the real landing page |
| `home/index` | `learn/overview` | Currently the "Overview" entry in Home |
| `home/history` | `learn/history` | |
| `legacy/whitepapers` | `learn/whitepapers` | Historical context, still cited |
| `legacy/faq` | `learn/faq` | Already linked from global anchors |

#### Group: Network architecture

| Source | Destination | Notes |
|---|---|---|
| `build-on-celo/network-overview` | `learn/network/overview` | **Wrong-tab fix.** Pure protocol reference, not builder content |
| `build-on-celo/cel2-architecture` | `learn/network/architecture` | **Wrong-tab fix.** |
| `legacy/l1-architecture` | `learn/network/l1-architecture` | Useful historical compare; keep |
| `infra-partners/specs` | `learn/network/l2-specs` | Pure spec reference; better here than in Operate (Open Decision #5) |

#### Group: Protocol

| Source | Destination | Notes |
|---|---|---|
| `home/protocol/index` | `learn/protocol/index` | |
| `home/protocol/celo-token` | `learn/protocol/celo-token` | |
| `home/protocol/security-council` | `learn/protocol/security-council` | |
| `home/protocol/escrow` | `learn/protocol/escrow` | |
| `home/protocol/challengers` | `learn/protocol/challengers` | |
| `home/protocol/transactions/overview` | `learn/protocol/transactions/overview` | |
| `home/protocol/transactions/transaction-types` | `learn/protocol/transactions/transaction-types` | 🔀 Merge in `legacy/protocol/transaction/transaction-types` (overlapping content, L2 framing wins) |
| `home/protocol/transactions/tx-comment-encryption` | `learn/protocol/transactions/tx-comment-encryption` | 🔀 Merge in `legacy/protocol/transaction/tx-comment-encryption` |
| `legacy/protocol/transaction/native-currency` | `learn/protocol/transactions/native-currency` | Still applies on L2 |
| `legacy/protocol/transaction/erc20-transaction-fees` | `learn/protocol/transactions/erc20-fees` | Still applies (fee abstraction context) |
| `legacy/protocol/transaction/gas-pricing` | `learn/protocol/transactions/gas-pricing` | Still applies |
| `legacy/protocol/transaction/escrow` | 🔀 → `learn/protocol/escrow` | Merge into existing escrow doc |
| `legacy/protocol/transaction/index` | 🗑️ | Replaced by new transactions index |

#### Group: Governance

| Source | Destination | Notes |
|---|---|---|
| `home/protocol/governance/overview` | `learn/governance/overview` | |
| `home/protocol/governance/governance-toolkit` | `learn/governance/toolkit` | |
| `home/protocol/governance/create-governance-proposal` | `learn/governance/create-proposal` | |
| `home/protocol/governance/voting-in-governance` | `learn/governance/voting` | |
| `home/protocol/governance/voting-in-governance-using-mondo` | `learn/governance/voting-with-mondo` | |
| `home/protocol/governance/governable-parameters` | `learn/governance/parameters` | |
| `home/protocol/governance/smart-contracts-upgrades` | `learn/governance/contract-upgrades` | |

#### Group: Stablecoins & bridging concepts

| Source | Destination | Notes |
|---|---|---|
| `home/bridged-tokens/bridges` | `learn/bridging/overview` | Concepts only; tool list moves to Build > Tools |
| `home/bridged-tokens/native-ETH-bridging` | `learn/bridging/native-eth` | |
| `legacy/protocol/stability/index` | `learn/stablecoins/index` | Mento history is still relevant background |
| `legacy/protocol/stability/oracles` | `learn/stablecoins/oracles` | |
| `legacy/protocol/stability/stability-fees` | `learn/stablecoins/stability-fees` | |
| `legacy/protocol/stability/adding-stable-assets` | `learn/stablecoins/adding-stable-assets` | |
| `legacy/protocol/stability/granda-mento` | 📦 `operate/archive/legacy/granda-mento` | Decommissioned mechanism (Open Decision #2) |
| `legacy/protocol/stability/doto` | 📦 `operate/archive/legacy/doto` | Decommissioned (Open Decision #2) |

#### Group: Epoch rewards

| Source | Destination | Notes |
|---|---|---|
| `home/protocol/epoch-rewards/index` | `learn/epoch-rewards/index` | |
| `home/protocol/epoch-rewards/community-fund` | `learn/epoch-rewards/community-fund` | |
| `home/protocol/epoch-rewards/carbon-offsetting-fund` | `learn/epoch-rewards/carbon-fund` | |

#### Group: Identity (still-relevant ODIS)

| Source | Destination | Notes |
|---|---|---|
| `legacy/protocol/identity/index` | `learn/identity/index` | Phone-number privacy + ODIS still active in MiniPay |
| `legacy/protocol/identity/odis` | `learn/identity/odis/overview` | |
| `legacy/protocol/identity/odis-domain` | `learn/identity/odis/domain` | |
| `legacy/protocol/identity/odis-domain-sequential-delay-domain` | `learn/identity/odis/sequential-delay-domain` | |
| `legacy/protocol/identity/odis-use-case-phone-number-privacy` | `learn/identity/odis/phone-privacy` | |
| `legacy/protocol/identity/odis-use-case-key-hardening` | `learn/identity/odis/key-hardening` | |
| `legacy/protocol/identity/encrypted-cloud-backup` | `learn/identity/encrypted-cloud-backup` | |
| `legacy/protocol/identity/metadata` | `learn/identity/metadata` | |
| `legacy/protocol/identity/smart-contract-accounts` | `learn/identity/smart-contract-accounts` | |
| `legacy/protocol/identity/privacy-research` | `learn/identity/privacy-research` | |

#### Group: Using CELO (end-user)

| Source | Destination | Notes |
|---|---|---|
| `home/wallets` | `learn/using-celo/wallets` | 🔀 End-user (native + compatible) listing lives here. The *native* section overlaps `tooling/wallets/index`; dedup that. The WaaS/infra providers from `tooling/wallets/index` go to Build (see below) |
| `home/exchanges` | `learn/using-celo/exchanges` | |
| `home/gas-fees` | `learn/using-celo/gas-fees` | |
| `home/ramps` | `learn/using-celo/ramps` | |
| `home/manage/self-custody` | `learn/using-celo/self-custody` | |
| `home/manage/release-gold` | `learn/using-celo/release-gold` | |
| `home/manage/exchange` | `learn/using-celo/exchange-integration` | |
| `home/manage/asset` | `learn/using-celo/asset-management` | |
| `tooling/wallets/metamask/setup` | `learn/using-celo/wallets/metamask/setup` | End-user setup, not dev integration |
| `tooling/wallets/metamask/use` | `learn/using-celo/wallets/metamask/use` | |
| `tooling/wallets/metamask/add-celo-testnet-to-metamask` | `learn/using-celo/wallets/metamask/add-testnet` | |
| `tooling/wallets/metamask/import` | `learn/using-celo/wallets/metamask/import` | |
| `tooling/wallets/ledger/setup` | `learn/using-celo/wallets/ledger/setup` | |
| `tooling/wallets/ledger/to-celo-terminal` | `learn/using-celo/wallets/ledger/to-celo-terminal` | |
| `tooling/wallets/ledger/to-celo-web` | `learn/using-celo/wallets/ledger/to-celo-web` | |
| `tooling/wallets/ledger/to-celo-cli` | `learn/using-celo/wallets/ledger/to-celo-cli` | |
| `tooling/wallets/ledger/eip712-workaround` | `learn/using-celo/wallets/ledger/eip712-workaround` | Currently orphaned in nav; surface it |
| `tooling/wallets/coinbase-wallet` | `learn/using-celo/wallets/coinbase-wallet` | Currently orphaned in nav |

---

### Tab 2 — Build (replaces "Build on Celo" + most of "Tooling")

Internal pattern: **Quickstart → Network info → Guides → Tools → Reference.**

#### Group: Quickstart

| Source | Destination | Notes |
|---|---|---|
| `build-on-celo/index` | `build/index` | |
| `build-on-celo/quickstart` | `build/quickstart` | Single canonical 5-minute path |
| `tooling/overview/index` | 🔀 → `build/quickstart` | Currently a second "tooling overview"; fold the intro paragraphs into quickstart |
| `tooling/overview/setup/overview` | `build/quickstart/setup/overview` | |
| `tooling/overview/setup/mac` | `build/quickstart/setup/mac` | |
| `tooling/overview/setup/windows` | `build/quickstart/setup/windows` | |
| `tooling/overview/setup/wallet` | 🔀 → `build/quickstart/setup/wallet` | Promote out of "overview" |
| `tooling/overview/setup/replit` | `build/quickstart/setup/replit` | |
| `tooling/overview/setup/development-chain` | `build/quickstart/setup/local-chain` | |
| `tooling/overview/migrate/from-ethereum` | `build/quickstart/migrate-from-ethereum` | |

#### Group: Network info

| Source | Destination | Notes |
|---|---|---|
| `tooling/overview/faucet` | `build/network/faucet` | Promoted from buried location |
| `tooling/testnets/celo-sepolia/index` | `build/network/testnets/celo-sepolia` | |
| `tooling/testnets/celo-sepolia/disclaimer` | `build/network/testnets/celo-sepolia-disclaimer` | Currently orphaned in nav; surface it |
| `tooling/nodes/forno` | `build/network/rpc/forno` | |
| `tooling/nodes/alchemy` | `build/network/rpc/alchemy` | |
| `tooling/nodes/overview` | 🔀 → `build/network/rpc/index` | Split: RPC-provider intro stays in Build; node-operation moves to Operate |
| `tooling/nodes/run-a-celo-node` | → `operate/run-node/quickstart` | **Cross-tab move.** Belongs to Operate persona |

#### Group: Guides

##### Sub-group: AI / agents

| Source | Destination | Notes |
|---|---|---|
| `build-on-celo/build-with-ai/overview` | `build/guides/ai/overview` | |
| `build-on-celo/build-with-ai/8004` | `build/guides/ai/erc-8004` | Rename to spec name |
| `build-on-celo/build-with-ai/x402` | `build/guides/ai/x402` | |
| `build-on-celo/build-with-ai/agent-skills` | `build/guides/ai/agent-skills` | |
| `build-on-celo/build-with-ai/vibe-coding` | `build/guides/ai/vibe-coding` | |
| `build-on-celo/build-with-ai/usecases` | `build/guides/ai/use-cases` | |
| `build-on-celo/build-with-ai/mcp/index` | `build/guides/ai/mcp/overview` | |
| `build-on-celo/build-with-ai/mcp/celo-mcp` | `build/guides/ai/mcp/celo-mcp` | |

##### Sub-group: Apps & products

| Source | Destination | Notes |
|---|---|---|
| `build-on-celo/build-on-minipay/overview` | `build/guides/minipay/overview` | Pick one preposition |
| `build-on-celo/build-on-minipay/quickstart` | `build/guides/minipay/quickstart` | |
| `build-on-celo/build-on-minipay/code-library` | `build/guides/minipay/code-library` | |
| `build-on-celo/build-on-minipay/deeplinks` | `build/guides/minipay/deeplinks` | |
| `build-on-celo/build-on-minipay/prerequisites/ngrok-setup` | `build/guides/minipay/ngrok-setup` | Flatten one level |
| `build-on-celo/build-with-farcaster` | `build/guides/farcaster` | |
| `build-on-celo/build-with-self` | `build/guides/self` | |
| `build-on-celo/build-with-defi` | `build/guides/defi` | |
| `build-on-celo/build-with-local-stablecoin` | `build/guides/local-stablecoin` | |
| `build-on-celo/build-on-socialconnect` | `build/guides/socialconnect` | Currently orphaned in nav; surface it. Rename for consistency |

##### Sub-group: Fee abstraction (consolidate to one home)

| Source | Destination | Notes |
|---|---|---|
| `build-on-celo/fee-abstraction/overview` | `build/guides/fee-abstraction/overview` | Canonical home |
| `build-on-celo/fee-abstraction/using-fee-abstraction` | `build/guides/fee-abstraction/using` | |
| `build-on-celo/fee-abstraction/add-fee-currency` | `build/guides/fee-abstraction/add-fee-currency` | |

##### Sub-group: Misc guides

| Source | Destination | Notes |
|---|---|---|
| `build-on-celo/scaling-your-app` | `build/guides/scaling` | |
| `build-on-celo/nightfall` | `build/guides/nightfall` | |
| `build-on-celo/fund-your-project` | `build/fund-your-project` | Top-level under Build |
| `build-on-celo/support` | `build/support` | Currently orphaned in nav; surface it |

#### Group: Tools

##### Sub-group: SDKs & libraries

| Source | Destination | Notes |
|---|---|---|
| `tooling/libraries-sdks/celo-sdks` | `build/tools/sdks/index` | Index page |
| `tooling/libraries-sdks/composer-kit` | `build/tools/sdks/composer-kit` | |
| `tooling/libraries-sdks/viem/index` | `build/tools/sdks/viem` | |
| `tooling/libraries-sdks/ethers/index` | `build/tools/sdks/ethers` | |
| `tooling/libraries-sdks/web3/index` | `build/tools/sdks/web3` | |
| `tooling/libraries-sdks/thirdweb-sdk/index` | `build/tools/sdks/thirdweb` | 🔀 Merge with `build-on-celo/build-with-thirdweb/*` content (overlapping intro) |
| `tooling/libraries-sdks/dynamic/index` | `build/tools/sdks/dynamic` | |
| `tooling/libraries-sdks/reown/index` | `build/tools/sdks/reown` | |
| `tooling/libraries-sdks/portal/index` | `build/tools/sdks/portal` | |
| `tooling/libraries-sdks/jaw/index` | `build/tools/sdks/jaw` | |
| `tooling/libraries-sdks/contractkit/index` | `build/tools/sdks/contractkit/index` | |
| `tooling/libraries-sdks/contractkit/setup` | `build/tools/sdks/contractkit/setup` | |
| `tooling/libraries-sdks/contractkit/usage` | `build/tools/sdks/contractkit/usage` | |
| `tooling/libraries-sdks/contractkit/contracts-wrappers-registry` | `build/tools/sdks/contractkit/wrappers-registry` | |
| `tooling/libraries-sdks/contractkit/odis` | `build/tools/sdks/contractkit/odis` | |
| `tooling/libraries-sdks/contractkit/data-encryption-key` | `build/tools/sdks/contractkit/data-encryption-key` | Currently orphaned in nav; surface it |
| `tooling/libraries-sdks/contractkit/migrating-to-contractkit-v1` | 📦 `operate/archive/contractkit/migrate-v1` | Currently orphaned; archive (one-time migration) |
| `tooling/libraries-sdks/contractkit/migrating-to-contractkit-v2` | 📦 `operate/archive/contractkit/migrate-v2` | Currently orphaned; archive |
| `tooling/libraries-sdks/contractkit/migrating-to-viem` | `build/tools/sdks/contractkit/migrate-to-viem` | Still actionable: surface it |
| `tooling/libraries-sdks/contractkit/notes-web3-with-contractkit` | 📦 `operate/archive/contractkit/notes-web3` | Currently orphaned; archive |
| `tooling/libraries-sdks/cli/index` | `build/tools/cli/index` | |
| `tooling/libraries-sdks/cli/account` | `build/tools/cli/account` | |
| `tooling/libraries-sdks/cli/autocomplete` | `build/tools/cli/autocomplete` | |
| `tooling/libraries-sdks/cli/commands` | `build/tools/cli/commands` | |
| `tooling/libraries-sdks/cli/config` | `build/tools/cli/config` | |
| `tooling/libraries-sdks/cli/election` | `build/tools/cli/election` | |
| `tooling/libraries-sdks/cli/epochs` | `build/tools/cli/epochs` | |
| `tooling/libraries-sdks/cli/governance` | `build/tools/cli/governance` | |
| `tooling/libraries-sdks/cli/help` | `build/tools/cli/help` | |
| `tooling/libraries-sdks/cli/identity` | `build/tools/cli/identity` | |
| `tooling/libraries-sdks/cli/lockedcelo` | `build/tools/cli/lockedcelo` | |
| `tooling/libraries-sdks/cli/multisig` | `build/tools/cli/multisig` | |
| `tooling/libraries-sdks/cli/network` | `build/tools/cli/network` | |
| `tooling/libraries-sdks/cli/node` | `build/tools/cli/node` | |
| `tooling/libraries-sdks/cli/oracle` | `build/tools/cli/oracle` | |
| `tooling/libraries-sdks/cli/plugins` | `build/tools/cli/plugins` | |
| `tooling/libraries-sdks/cli/releasecelo` | `build/tools/cli/releasecelo` | |
| `tooling/libraries-sdks/cli/rewards` | `build/tools/cli/rewards` | |
| `tooling/libraries-sdks/cli/transfer` | `build/tools/cli/transfer` | |
| `tooling/libraries-sdks/cli/validator` | `build/tools/cli/validator` | |
| `tooling/libraries-sdks/cli/validatorgroup` | `build/tools/cli/validatorgroup` | |

##### Sub-group: Dev environments

| Source | Destination | Notes |
|---|---|---|
| `tooling/dev-environments/index` | `build/tools/dev-environments/index` | |
| `tooling/dev-environments/foundry` | `build/tools/dev-environments/foundry` | |
| `tooling/dev-environments/hardhat` | `build/tools/dev-environments/hardhat` | |
| `tooling/dev-environments/remix` | `build/tools/dev-environments/remix` | |
| `tooling/dev-environments/multibaas/overview` | `build/tools/dev-environments/multibaas/overview` | |
| `tooling/dev-environments/multibaas/contracts` | `build/tools/dev-environments/multibaas/contracts` | |
| `tooling/dev-environments/multibaas/webhooks` | `build/tools/dev-environments/multibaas/webhooks` | |
| `tooling/dev-environments/thirdweb/overview` | 🔀 → `build/tools/sdks/thirdweb` | Dedup with libraries-sdks/thirdweb-sdk |
| `tooling/dev-environments/thirdweb/thirdweb` | 🔀 → `build/tools/sdks/thirdweb` | |
| `tooling/dev-environments/thirdweb/one-click-deploy` | `build/tools/sdks/thirdweb/one-click-deploy` | |
| `build-on-celo/build-with-thirdweb/overview` | 🔀 → `build/tools/sdks/thirdweb` | Three-way dedup; one canonical home |
| `build-on-celo/build-with-thirdweb/celo-nft-drop-tutorial` | `build/guides/thirdweb-nft-drop` | Keep tutorial separate from tool overview |
| `build-on-celo/build-with-thirdweb/one-click quickstart` | 🗑️ | Filename has space; content covered by `one-click-deploy` |

##### Sub-group: Wallet integration

| Source | Destination | Notes |
|---|---|---|
| `tooling/wallets/index` (Wallet Infrastructure section) | `build/tools/wallet-integration/index` | Split the file. The native-wallet list dedups into Learn (see above); the **Wallet Infrastructure** section — ~11 WaaS/smart-wallet providers (Privy, Openfort, Alchemy Smart Wallets, thirdweb, Reown, BlockRadar, Para, Portal, JAW, Safe, Zerion) — is unique developer content and moves here. Do **not** delete it |

*(This corrects an earlier draft that marked the whole file 🗑️ and separately assumed the WaaS/Privy content didn't exist — it does, inside this file.)*

##### Sub-group: Indexers / oracles / explorers / contract verification

| Source | Destination | Notes |
|---|---|---|
| `tooling/indexers/overview` | `build/tools/indexers/index` | |
| `tooling/indexers/the-graph` | `build/tools/indexers/the-graph` | |
| `tooling/indexers/subquery` | `build/tools/indexers/subquery` | |
| `tooling/indexers/envio` | `build/tools/indexers/envio` | |
| `tooling/indexers/goldrush` | `build/tools/indexers/goldrush` | |
| `tooling/indexers/indexing-co` | `build/tools/indexers/indexing-co` | |
| `tooling/oracles/index` | `build/tools/oracles/index` | |
| `tooling/oracles/run` | `build/tools/oracles/run-an-oracle` | |
| `tooling/oracles/band-protocol` | `build/tools/oracles/band-protocol` | |
| `tooling/oracles/chainlink-oracles` | `build/tools/oracles/chainlink` | |
| `tooling/oracles/redstone` | `build/tools/oracles/redstone` | |
| `tooling/oracles/supra` | `build/tools/oracles/supra` | |
| `tooling/oracles/quex-oracles` | `build/tools/oracles/quex` | |
| `tooling/oracles/dia` | `build/tools/oracles/dia` | |
| `tooling/oracles/wit-oracle` | `build/tools/oracles/witnet` | Currently orphaned in nav; surface it |
| `tooling/explorers/overview` | `build/tools/explorers/index` | |
| `tooling/explorers/block-explorers` | 🔀 → `build/tools/explorers/index` | Merge into single overview |
| `tooling/explorers/blockscout` | `build/tools/explorers/blockscout` | Already in nav (not orphaned) |
| `tooling/explorers/celoscan` | `build/tools/explorers/celoscan` | Already in nav (not orphaned) |
| `tooling/explorers/analytics` | `build/tools/explorers/analytics` | |
| `tooling/contract-verification/index` | `build/tools/contract-verification/index` | |
| `tooling/contract-verification/blockscout` | `build/tools/contract-verification/blockscout` | |
| `tooling/contract-verification/celoscan` | `build/tools/contract-verification/celoscan` | |
| `tooling/contract-verification/foundry` | `build/tools/contract-verification/foundry` | Currently orphaned in nav; surface it |
| `tooling/contract-verification/hardhat` | `build/tools/contract-verification/hardhat` | |
| `tooling/contract-verification/remix` | `build/tools/contract-verification/remix` | |

##### Sub-group: Bridges (developer integration only)

| Source | Destination | Notes |
|---|---|---|
| `tooling/bridges/bridges` | `build/tools/bridges/index` | Tool list (concepts already moved to Learn) |
| `tooling/bridges/cross-chain-messaging` | `build/tools/bridges/cross-chain-messaging` | |

#### Group: Reference

| Source | Destination | Notes |
|---|---|---|
| `tooling/contracts/core-contracts` | `build/reference/contracts/core` | |
| `tooling/contracts/token-contracts` | `build/reference/contracts/tokens` | |
| `tooling/contracts/uniswap-contracts` | `build/reference/contracts/uniswap` | |
| `tooling/contracts/l1-contracts` | 📦 `operate/archive/legacy/l1-contracts` | L1-only; not used on L2 |
| `build-on-celo/launch-checklist` | `build/reference/launch-checklist` | |

---

### Tab 3 — Operate (replaces "Infra Partners")

#### Group: Quickstart

| Source | Destination | Notes |
|---|---|---|
| `infra-partners/operators/overview` | `operate/index` | |

#### Group: Run a node

| Source | Destination | Notes |
|---|---|---|
| `infra-partners/operators/architecture` | `operate/run-node/architecture` | |
| `infra-partners/operators/run-node` | `operate/run-node/run` | |
| `infra-partners/operators/migrate-node` | `operate/run-node/migrate` | |
| `tooling/nodes/run-a-celo-node` | 🔀 → `operate/run-node/run` | Cross-tab fold-in (currently in Tooling) |

#### Group: Integration

| Source | Destination | Notes |
|---|---|---|
| `infra-partners/integration/index` | `operate/integration/index` | |
| `infra-partners/integration/general` | `operate/integration/general` | |
| `infra-partners/integration/checklist` | `operate/integration/checklist` | |
| `infra-partners/integration/custody` | `operate/integration/custody` | |
| `infra-partners/integration/listings` | `operate/integration/listings` | |
| `infra-partners/integration/cloud-hsm` | `operate/integration/cloud-hsm` | |

#### Group: Notices (current)

| Source | Destination | Notes |
|---|---|---|
| `infra-partners/notices/req-resp-cl-sync-deprecation` | `operate/notices/current/req-resp-cl-sync-deprecation` | |
| `infra-partners/notices/jovian-upgrade` | `operate/notices/current/jovian-upgrade` | |
| `infra-partners/notices/jello-upgrade` | `operate/notices/current/jello-upgrade` | |
| `infra-partners/notices/l1-fusaka-upgrade` | `operate/notices/current/l1-fusaka-upgrade` | |

*(Optimism keeps active notices at `/notices/<slug>` rather than a literal `current/` prefix — consider matching that convention.)*

#### Group: Notices (archive)

| Source | Destination | Notes |
|---|---|---|
| `infra-partners/notices/celo-sepolia-launch` | `operate/notices/archive/celo-sepolia-launch` | Past event |
| `infra-partners/notices/eigenda-v2-upgrade` | `operate/notices/archive/eigenda-v2-upgrade` | Completed |
| `infra-partners/notices/isthmus-upgrade` | `operate/notices/archive/isthmus-upgrade` | Completed |
| `infra-partners/notices/l2-migration` | `operate/notices/archive/l2-migration` | Completed |

#### Group: Archive (formerly Legacy)

L1-only content kept for SEO and historical reference; not in primary nav (linked from `operate/archive/index`). Archive vs. hard-delete is Open Decisions #2 and #3.

| Source | Destination | Notes |
|---|---|---|
| `legacy/overview` | `operate/archive/legacy/overview` | |
| `legacy/transition/whats-changed/overview` | `operate/archive/legacy/transition/overview` | |
| `legacy/transition/whats-changed/l1-l2` | `operate/archive/legacy/transition/l1-l2-changes` | |
| `legacy/transition/optimism/op-l2` | `operate/archive/legacy/transition/op-l2` | |
| `legacy/transition/guides/bridging-celo-from-l1-to-l2` | `operate/archive/legacy/transition/bridging-l1-to-l2` | |
| `legacy/transition/guides/withdrawing-celo-from-l2-to-l1` | `operate/archive/legacy/transition/withdraw-l2-to-l1` | |
| `legacy/protocol/pos/index` | `operate/archive/legacy/pos/index` | |
| `legacy/protocol/pos/validator-groups` | `operate/archive/legacy/pos/validator-groups` | |
| `legacy/protocol/pos/locked-gold` | `operate/archive/legacy/pos/locked-gold` | |
| `legacy/protocol/pos/validator-elections` | `operate/archive/legacy/pos/validator-elections` | |
| `legacy/protocol/pos/epoch-rewards` | `operate/archive/legacy/pos/epoch-rewards` | |
| `legacy/protocol/pos/epoch-rewards-validator` | `operate/archive/legacy/pos/epoch-rewards-validator` | |
| `legacy/protocol/pos/epoch-rewards-locked-gold` | `operate/archive/legacy/pos/epoch-rewards-locked-gold` | |
| `legacy/protocol/pos/penalties` | `operate/archive/legacy/pos/penalties` | |
| `legacy/protocol/pos/becoming-a-validator` | `operate/archive/legacy/pos/becoming-a-validator` | Currently orphaned in nav |
| `legacy/protocol/consensus/index` | `operate/archive/legacy/consensus/index` | |
| `legacy/protocol/consensus/validator-set-differences` | `operate/archive/legacy/consensus/validator-set-differences` | |
| `legacy/protocol/consensus/locating-nodes` | `operate/archive/legacy/consensus/locating-nodes` | |
| `legacy/protocol/randomness` | `operate/archive/legacy/randomness` | L1 randomness; replaced on L2 |
| `legacy/protocol/contracts/add-contract` | `operate/archive/legacy/contracts/add-contract` | |
| `legacy/node/run-mainnet` | `operate/archive/legacy/node/run-l1-mainnet` | |
| `legacy/validator/index` | `operate/archive/legacy/validator/index` | |
| `legacy/validator/voting` | `operate/archive/legacy/validator/voting` | |
| `legacy/validator/run/mainnet` | `operate/archive/legacy/validator/run-mainnet` | |
| `legacy/validator/key-management/summary` | `operate/archive/legacy/validator/key-management/summary` | |
| `legacy/validator/key-management/detailed` | `operate/archive/legacy/validator/key-management/detailed` | |
| `legacy/validator/key-management/key-rotation` | `operate/archive/legacy/validator/key-management/key-rotation` | |
| `legacy/validator/security` | `operate/archive/legacy/validator/security` | |
| `legacy/validator/monitoring` | `operate/archive/legacy/validator/monitoring` | |
| `legacy/validator/devops-best-practices` | `operate/archive/legacy/validator/devops-best-practices` | |
| `legacy/validator/node-upgrade` | `operate/archive/legacy/validator/node-upgrade` | |
| `legacy/validator/proxy` | `operate/archive/legacy/validator/proxy` | |
| `legacy/validator/validator-explorer` | `operate/archive/legacy/validator/validator-explorer` | |
| `legacy/validator/celo-foundation-voting-policy` | `operate/archive/legacy/validator/foundation-voting-policy` | |
| `legacy/validator/troubleshooting-faq` | `operate/archive/legacy/validator/troubleshooting-faq` | |
| `legacy/validator/celo-website` | 🗑️ | Just an external link (3-line stub) |
| `legacy/validator/discord` | 🗑️ | Just an external link (3-line stub) |

---

### Tab 4 — Contribute (mostly unchanged)

| Source | Destination | Notes |
|---|---|---|
| `contribute-to-celo/index` | `contribute/index` | Tab renames "Contribute to Celo" → "Contribute" for naming consistency |
| `contribute-to-celo/builders` | `contribute/builders` | |
| `contribute-to-celo/daos` | `contribute/daos` | |
| `contribute-to-celo/code-of-conduct` | `contribute/code-of-conduct` | |
| `contribute-to-celo/contributors/overview` | `contribute/contributors/overview` | |
| `contribute-to-celo/contributors/code-contributors` | `contribute/contributors/code` | |
| `contribute-to-celo/contributors/cip-contributors` | `contribute/contributors/cip` | |
| `contribute-to-celo/contributors/documentation-contributors` | `contribute/contributors/docs` | |
| `contribute-to-celo/community-rpc-nodes/how-it-works` | `contribute/community-rpc/how-it-works` | |
| `contribute-to-celo/community-rpc-nodes/registering-as-rpc-node` | `contribute/community-rpc/registering` | |
| `contribute-to-celo/community-rpc-nodes/community-rpc-node` | `contribute/community-rpc/setup` | |
| `contribute-to-celo/community-rpc-nodes/penalties` | `contribute/community-rpc/penalties` | |
| `contribute-to-celo/community-rpc-nodes/validator-rpc-faq` | `contribute/community-rpc/faq` | |
| `contribute-to-celo/release-process/index` | `contribute/release-process/index` | |
| `contribute-to-celo/release-process/smart-contracts` | `contribute/release-process/smart-contracts` | |
| `contribute-to-celo/release-process/blockchain-client` | `contribute/release-process/blockchain-client` | |
| `contribute-to-celo/release-process/base-cli-contractkit-dappkit-utils` | `contribute/release-process/cli-contractkit-utils` | |
| `contribute-to-celo/release-process/attestation-service` | `contribute/release-process/attestation-service` | |

---

### `_deprecated/` — full deletion

All 105 files under `_deprecated/` are duplicates of content already in `legacy/` or `infra-partners/`. **Delete the entire directory** in the cleanup PR. (Subdir counts verified 2026-07-03.)

| Source | Disposition |
|---|---|
| `_deprecated/cel2/**` (10 files) | 🗑️ Duplicates of `infra-partners/notices/*` and `infra-partners/operators/*` |
| `_deprecated/integration/**` (6 files) | 🗑️ Duplicates of `infra-partners/integration/*` |
| `_deprecated/what-is-celo/about-celo-l1/**` (56 files) | 🗑️ Duplicates of `legacy/protocol/*` and `legacy/validator/*` |
| `_deprecated/what-is-celo/joining-celo/**` (13 files) | 🗑️ Duplicates of `contribute-to-celo/*` |
| `_deprecated/what-is-celo/using-celo/**` (19 files) | 🗑️ Duplicates of `home/manage/*` and `home/protocol/*` |
| `_deprecated/what-is-celo/celo-website.mdx` (1 file) | 🗑️ External link only |
