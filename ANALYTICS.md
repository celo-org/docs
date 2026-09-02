# ANALYTICS.md — how docs.celo.org is measured

Internal doc for maintainers. Not listed in `docs.json` `navigation`, so it is not a public docs page.

## Architecture

Two hard constraints shape everything here:

1. **The site is Mintlify-hosted.** There is no server, build step, or HTML template we control. Client-side tracking goes through the `integrations` block in `docs.json` and `window.dataLayer` pushes from `snippets/*.jsx`.
2. **AI crawlers and fetchers never execute JavaScript.** GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Claude-User, Claude Code, Cursor and the rest read `llms.txt`, `llms-full.txt` and the `.md` variant of every page directly. No client-side tool (GA4, PostHog, anything) can ever count them. They are only visible at the serving layer.

So measurement is split in two:

| Audience | Tool | Where |
|---|---|---|
| Humans (browsers) | GA4 `G-0CXEKQ81V2`, tags managed in Google Tag Manager | `docs.json` → `integrations.gtm` |
| Bots and AI agents | Cloudflare AI Crawl Control (free tier), proxied in front of the domain | Cloudflare zone for `celo.org` |

## Ownership

Owners are teams, not individuals — this repository is public, and `.github/CODEOWNERS`
already assigns `/docs.json` to the same team. Request access through the team.

| Asset | ID | Owner |
|---|---|---|
| GA4 property | `G-0CXEKQ81V2` | `@celo-org/devrel` |
| GTM container | `GTM-NP9GP2BT` | `@celo-org/devrel` |
| Cloudflare zone / DNS for `docs.celo.org` | `celo.org` zone, `docs.celo.org` proxied | `@celo-org/devrel` |
| Mintlify org | Starter plan (established in #2250) | `@celo-org/devrel` |

The permission that matters when a tag needs fixing is **Publish** on the GTM container;
Edit rights cannot ship a change.

## What is instrumented in this repo

- `docs.json` → `integrations.gtm.tagId` loads the GTM container on every page. GA4 itself is configured **inside** GTM (Google Tag), not in `docs.json` — having both would double-count page views.
- `snippets/AddNetworkButton.jsx` pushes `dataLayer` events: `add_network_click` on click, and `add_network_result` with `result` = `success` | `rejected` | `error` | `no_wallet` and `network` = chain name. This is the highest-intent action on the site.
- The docs assistant is instrumented on both sides, in `celo-org/docs-ai-assistant` rather than in this repo:
  - **Client (GA4).** `widget.js` reuses the page's existing `window.gtag` rather than loading a second tracker, and emits `assistant_opened`, `assistant_question` (`answered`, `escalated`, `truncated`), `assistant_escalate`, `assistant_new_chat`, `assistant_copy`, `assistant_citation_click` (`href`) and `assistant_error` (`from_api`, `status`). Question text is deliberately never sent to GA4.
  - **Server (Redis).** `app/api/chat/route.ts` calls `logQuestion()`, which pushes `{question, model, citedUrls, answered, timestamp, refused}` onto the Upstash Redis list `docs-assistant:questions`, trimmed to the most recent 10,000. Without Redis configured it falls back to `console.log`, which on Vercel is short-retention only. **This list is the docs-gap signal** — the uncited questions in it are the pages that need writing.
- A handful of outbound partner links carry manual UTM parameters (`tooling/libraries-sdks/reown/index.mdx`, `tooling/indexers/goldrush.mdx`). The GTM outbound-click tag below covers outbound attribution generally, so new UTMs are not required.

## Runbook 1: Google Tag Manager container

The container exists (`GTM-NP9GP2BT`) and `docs.json` carries its ID. Remaining tags to configure at https://tagmanager.google.com:

- [x] **Google Tag** with tag ID `G-0CXEKQ81V2`, firing on All Pages and on History Changes (Mintlify navigates client-side; without the history trigger only the first page view is counted). Verify against the published container rather than the GTM UI:

  ```bash
  curl -s "https://www.googletagmanager.com/gtag/js?id=GTM-NP9GP2BT" | grep -c "G-0CXEKQ81V2"   # must be >= 1
  curl -s "https://www.googletagmanager.com/gtm.js?id=GTM-NP9GP2BT"                             # "vtp_tagId":"G-0CXEKQ81V2"
  ```

  This tag briefly carried the **container's own ID** in the Tag ID field instead of the measurement ID. The container loaded, a tag fired, nothing errored, and GA4 received nothing — so check the payload, not the UI.
- [ ] **Scroll depth**: built-in Scroll Depth trigger at 25 / 50 / 75 / 90 % → GA4 event `scroll_depth` with parameter `percent_scrolled` (`{{Scroll Depth Threshold}}`). GA4's own enhanced measurement fires only at 90 %, which hides most drop-off.
- [ ] **Outbound clicks**: Just Links trigger with condition Click URL does not contain `docs.celo.org` → GA4 event `outbound_click` with `link_domain` (`{{Click URL Hostname}}` — create a URL variable with component "Host Name") and `link_url` (`{{Click URL}}`).
- [ ] **Code copy**: Click trigger on Mintlify's code-block copy button → GA4 event `copy_code` with `page_path`. The selector targets Mintlify's rendered UI and can change without notice — verify with GTM Preview after Mintlify updates.
- [ ] **AI-menu clicks**: Click trigger on the page-level contextual menu (Copy page / ChatGPT / Claude / Cursor / VS Code / MCP — the `contextual.options` in `docs.json`) → GA4 event `ai_menu_click` with `ai_target` set from the clicked item's text. Same selector caveat as above.
- [ ] **AddNetworkButton events**: Custom Event triggers for `add_network_click` and `add_network_result` → GA4 event tags forwarding `network` and `result` as parameters (Data Layer variables).
- [ ] **Automation heuristic**: Custom HTML tag (fires before the Google Tag, e.g. on Consent/Initialization) that pushes `{ is_automated: "true" }` to the dataLayer when `navigator.webdriver === true` or the user agent contains `HeadlessChrome`; attach `is_automated` as a parameter on the Google Tag. This is a weak signal, not a count — agentic browsers such as Comet and Atlas use stock Chrome user agents and are indistinguishable client-side.
- [ ] Verify everything in GTM **Preview mode** against the live site, then **Publish**.

## Runbook 2: GA4 property configuration

In the GA4 property for `G-0CXEKQ81V2` (Admin):

- [ ] **Custom channel group "AI Assistants"**: condition Session source matches regex
  `chatgpt\.com|chat\.openai\.com|claude\.ai|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|grok\.com|x\.ai|deepseek\.com|you\.com|phind\.com|meta\.ai`
  GA4's built-in "AI Assistant" channel recognizes only ChatGPT, Gemini, DeepSeek, Copilot and Grok — not Claude or Perplexity. Known limit: a large share of AI-referred sessions arrive with no referrer and land in Direct; this channel measures the floor, not the total.
- [ ] **Custom dimensions** (event-scoped): `percent_scrolled`, `link_domain`, `ai_target`, `network`, `result`, `is_automated`, plus the assistant's `answered`, `escalated`, `truncated`, `from_api`, `status` and `href`. Without these registered the assistant events still arrive, but their parameters cannot be used in any report.
- [ ] **Re-verify `window.gtag` after the GTM swap.** `widget.js` calls `track()` only `if (typeof window.gtag === 'function')`, and fails silently otherwise. That global is provided by `integrations.ga4` today and should still be provided by GTM's Google tag, but it is exactly the kind of silent break this setup has already produced once — check `typeof window.gtag` in the console on a published page after the swap lands.
- [ ] **Explorations**: (a) free-form exploration with Page path + Exits for exit pages (GA4 has no standard exit report); (b) reverse Path exploration for drop-off journeys.

Already answered by standard reports, no setup needed:

- *"What domain did people come from?"* → Reports → Acquisition → Traffic acquisition (Session source / medium; add Session source as secondary dimension).
- *"How much time do they spend, on what pages?"* → Reports → Engagement → Pages and screens (Average engagement time per page).
- *"Where do people land?"* → Reports → Engagement → Landing pages.

## Runbook 3: Cloudflare in front of docs.celo.org (bot visibility)

This is the only layer that can see non-JS bot traffic. The proxy is already in place, so only the AI Crawl Control steps remain:

- [x] Proxied (orange-cloud) CNAME for `docs.celo.org` pointing at the Mintlify target. Confirmed: `celo.org` resolves to Cloudflare nameservers, `docs.celo.org` is a CNAME to `cname.vercel-dns.com`, and responses carry `cf-ray` and `cf-cache-status`, which only appear when traffic passes through the proxy.
- [ ] SSL/TLS mode **Full (strict)**.
- [ ] **Disable "Always Use HTTPS"** for the zone (Mintlify requirement) and add no rules touching `/.well-known/acme-challenge`.
- [ ] Enable **AI Crawl Control** (free plan): shows per-crawler activity (GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Claude-User, Bytespider, CCBot, Amazonbot, …), the pages each crawler hits, crawl frequency and robots.txt compliance.
- [ ] **Allow all AI crawlers.** These docs want to be read by agents; the tool is for measurement, not blocking. Check that no default block rules are active — Cloudflare default-blocks some AI crawler categories on new zones.
- [ ] Sanity check after cutover: `curl -I https://docs.celo.org/llms.txt` returns 200 with a valid certificate; a normal page and its `.md` variant load.

Cloudflare Analytics (total requests) vs GA4 (sessions) also gives a rough overall bot share as the delta between the two. Treat it as rough: `docs.celo.org` returns `cf-cache-status: HIT`, so Cloudflare serves many requests from cache that never reach the origin, widening the delta for reasons unrelated to bots.

## Known blind spots

- **Referrer-less AI traffic**: many clicks out of ChatGPT/Claude/Perplexity carry no referrer and appear as Direct in GA4.
- **JS-capable agentic browsers** (Comet, Atlas, computer-use agents) execute the GA4 tag and count as humans; `is_automated` catches only naive automation.
- **MCP query content** — not MCP volume. Requests to `https://docs.celo.org/mcp` *do* traverse Cloudflare (they return `cf-ray`, `cf-cache-status: DYNAMIC`), so request volume is visible in Cloudflare's HTTP analytics filtered by path. They are invisible to GA4, which needs JavaScript. What no layer here can show is **what was asked**: the question text, which tool was called, whether the answer cited anything.

  Mintlify's own dashboard would cover part of that, but it needs the Pro plan ($450/mo), which #2250 evaluated and declined — the site was previously on Pro and deliberately moved to Starter. Query-level signal comes from the in-page assistant instead, and it is already implemented on both sides (see below).
