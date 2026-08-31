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

| Asset | ID | Owner |
|---|---|---|
| GA4 property | `G-0CXEKQ81V2` | _fill in_ |
| GTM container | `GTM-NP9GP2BT` | _fill in_ |
| Cloudflare zone / DNS for `docs.celo.org` | — | _fill in_ |
| Mintlify org (Free/Starter plan) | — | _fill in_ |

## What is instrumented in this repo

- `docs.json` → `integrations.gtm.tagId` loads the GTM container on every page. GA4 itself is configured **inside** GTM (Google Tag), not in `docs.json` — having both would double-count page views.
- `snippets/AddNetworkButton.jsx` pushes `dataLayer` events: `add_network_click` on click, and `add_network_result` with `result` = `success` | `rejected` | `error` | `no_wallet` and `network` = chain name. This is the highest-intent action on the site.
- A handful of outbound partner links carry manual UTM parameters (`tooling/libraries-sdks/reown/index.mdx`, `tooling/indexers/goldrush.mdx`). The GTM outbound-click tag below covers outbound attribution generally, so new UTMs are not required.

## Runbook 1: Google Tag Manager container

Create a **Web** container for `docs.celo.org` at https://tagmanager.google.com, then replace `GTM-XXXXXXX` in `docs.json` with the real ID. Configure:

- [ ] **Google Tag** with tag ID `G-0CXEKQ81V2`, firing on All Pages and on History Changes (Mintlify navigates client-side; without the history trigger only the first page view is counted).
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
- [ ] **Custom dimensions** (event-scoped): `percent_scrolled`, `link_domain`, `ai_target`, `network`, `result`, `is_automated`.
- [ ] **Explorations**: (a) free-form exploration with Page path + Exits for exit pages (GA4 has no standard exit report); (b) reverse Path exploration for drop-off journeys.

Already answered by standard reports, no setup needed:

- *"What domain did people come from?"* → Reports → Acquisition → Traffic acquisition (Session source / medium; add Session source as secondary dimension).
- *"How much time do they spend, on what pages?"* → Reports → Engagement → Pages and screens (Average engagement time per page).
- *"Where do people land?"* → Reports → Engagement → Landing pages.

## Runbook 3: Cloudflare in front of docs.celo.org (bot visibility)

This is the only layer that can see non-JS bot traffic. Mintlify supports Cloudflare as DNS provider with the proxy enabled:

- [ ] Proxied (orange-cloud) CNAME for `docs.celo.org` pointing at the Mintlify target (per the Mintlify dashboard's custom-domain settings).
- [ ] SSL/TLS mode **Full (strict)**.
- [ ] **Disable "Always Use HTTPS"** for the zone (Mintlify requirement) and add no rules touching `/.well-known/acme-challenge`.
- [ ] Enable **AI Crawl Control** (free plan): shows per-crawler activity (GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Claude-User, Bytespider, CCBot, Amazonbot, …), the pages each crawler hits, crawl frequency and robots.txt compliance.
- [ ] **Allow all AI crawlers.** These docs want to be read by agents; the tool is for measurement, not blocking. Check that no default block rules are active — Cloudflare default-blocks some AI crawler categories on new zones.
- [ ] Sanity check after cutover: `curl -I https://docs.celo.org/llms.txt` returns 200 with a valid certificate; a normal page and its `.md` variant load.

Cloudflare Analytics (total requests) vs GA4 (sessions) also gives a rough overall bot share as the delta between the two.

## Known blind spots

- **Referrer-less AI traffic**: many clicks out of ChatGPT/Claude/Perplexity carry no referrer and appear as Direct in GA4.
- **JS-capable agentic browsers** (Comet, Atlas, computer-use agents) execute the GA4 tag and count as humans; `is_automated` catches only naive automation.
- **MCP server queries** (`https://docs.celo.org/mcp`) are served by Mintlify and visible in neither GA4 nor Cloudflare page analytics. Mintlify's own analytics dashboard (human-vs-agent split, assistant/search analytics) requires a paid Mintlify plan — the current plan is Free/Starter; upgrading is the future option if MCP/assistant visibility becomes important.
