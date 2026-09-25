# ANALYTICS.md — how docs.celo.org is measured

Internal doc for maintainers. It is **not** in `docs.json` `navigation`, so it does not appear in the sidebar or search — but Mintlify serves every Markdown file under the content root regardless, so this page is publicly reachable at `https://docs.celo.org/ANALYTICS`. `https://docs.celo.org/AGENTS` and `/CLAUDE` are live today for the same reason. Nothing here is secret (both measurement IDs are already in the page source of every page), but do not put anything in this file you would not publish.

## Architecture

Two hard constraints shape everything here:

1. **The site is Mintlify-hosted.** There is no server, build step, or HTML template we control. Client-side tracking goes through the `integrations` block in `docs.json` and `window.dataLayer` pushes from `snippets/*.jsx`.
2. **AI crawlers and fetchers never execute JavaScript.** GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Claude-User, Claude Code, Cursor and the rest read `llms.txt`, `llms-full.txt` and the `.md` variant of every page directly. No client-side tool (GA4, PostHog, anything) can ever count them. They are only visible at the serving layer.

So measurement is split in two:

| Audience | Tool | Where |
|---|---|---|
| Humans (browsers) | GA4 `G-0CXEKQ81V2` | `docs.json` → `integrations.ga4` (today); `integrations.gtm` once the swap lands |
| Bots and AI agents | Cloudflare AI Crawl Control — **not set up**, needs a DNS change first (Runbook 3) | Cloudflare zone for `celo.org` |

## Ownership

Owners are teams, not individuals — this repository is public, and `.github/CODEOWNERS`
already assigns `/docs.json` to the same team. Request access through the team.

| Asset | ID | Owner |
|---|---|---|
| GA4 property | `G-0CXEKQ81V2` | `@celo-org/devrel` |
| GTM container | `GTM-NP9GP2BT` | `@celo-org/devrel` |
| Cloudflare zone / DNS for `docs.celo.org` | `celo.org` zone; `docs.celo.org` is **not** proxied today | `@celo-org/devrel` |
| Mintlify org | Starter plan (established in #2250) | `@celo-org/devrel` |

The permission that matters when a tag needs fixing is **Publish** on the GTM container;
Edit rights cannot ship a change.

## What is instrumented in this repo

- Today `docs.json` → `integrations.ga4.measurementId` loads GA4 directly. The intended end state is `integrations.gtm.tagId`, which loads the GTM container on every page with GA4 configured **inside** GTM (Google Tag) rather than in `docs.json` — having both would double-count page views. **That swap has not happened yet**; it is the last step, after the container is fixed and the assistant widget no longer depends on `window.gtag`.
- `snippets/AddNetworkButton.jsx` pushes `dataLayer` events: `add_network_click` on click, and `add_network_result` with `result` = `success` | `rejected` | `error` | `no_wallet` and `network` = chain name. This is the highest-intent action on the site.
- The docs assistant is instrumented on both sides, in `celo-org/docs-ai-assistant` rather than in this repo:
  - **Client (GA4).** `widget.js` reuses the page's existing `window.gtag` rather than loading a second tracker, and emits `assistant_opened`, `assistant_question` (`answered`, `escalated`, `truncated`), `assistant_escalate`, `assistant_new_chat`, `assistant_copy`, `assistant_citation_click` (`href`) and `assistant_error` (`from_api`, `status`). Question text is deliberately never sent to GA4.
  - **Server (Redis).** `app/api/chat/route.ts` calls `logQuestion()`, which pushes `{question, model, citedUrls, answered, timestamp, refused}` onto the Upstash Redis list `docs-assistant:questions`, trimmed to the most recent 10,000. Without Redis configured it falls back to `console.log`, which on Vercel is short-retention only. **This list is the docs-gap signal** — the uncited questions in it are the pages that need writing.
- A handful of outbound partner links carry manual UTM parameters (`tooling/libraries-sdks/reown/index.mdx`, `tooling/indexers/goldrush.mdx`). The GTM outbound-click tag below covers outbound attribution generally, so new UTMs are not required.

## Runbook 1: Google Tag Manager container

The container exists (`GTM-NP9GP2BT`) but `docs.json` does **not** point at it yet — the site still loads GA4 directly. Everything below has to be true before the swap, or the swap loses measurement rather than adding it. Configure at https://tagmanager.google.com:

- [ ] **Google Tag** with tag ID `G-0CXEKQ81V2`, firing on **All Pages only**. Do *not* add a History Change trigger. GA4 enhanced measurement already sends a `page_view` on `pushState` for this stream, so a history trigger makes the Google tag fire a second time and every in-site navigation is counted twice — measured as 1 `page_view` per navigation on plain gtag.js versus 2 under the container with the trigger attached. The container as published still carries that trigger; it has to come off before this is ticked. Verify against the published container rather than the GTM UI:

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
- [ ] **Before the swap: the assistant events need a path that does not go through `window.gtag`.** `widget.js` calls `track()` only `if (typeof window.gtag === 'function')`. On the live site that global is a function, provided by `integrations.ga4`; on a page carrying only the GTM container it is `undefined`. Defining `gtag(){ dataLayer.push(arguments) }` by hand does *not* rescue it — no hit goes out. So all seven `assistant_*` events stop the moment the swap merges and stay stopped until the widget is changed to push to `dataLayer` directly (#2307). Land the widget change first if the gap is not acceptable.
- [ ] **Explorations**: (a) free-form exploration with Page path + Exits for exit pages (GA4 has no standard exit report); (b) reverse Path exploration for drop-off journeys.

Already answered by standard reports, no setup needed:

- *"What domain did people come from?"* → Reports → Acquisition → Traffic acquisition (Session source / medium; add Session source as secondary dimension).
- *"How much time do they spend, on what pages?"* → Reports → Engagement → Pages and screens (Average engagement time per page).
- *"Where do people land?"* → Reports → Engagement → Landing pages.

## Runbook 3: Cloudflare in front of docs.celo.org (bot visibility)

This is the only layer that could see non-JS bot traffic. **None of it is in place today, and the earlier claim that it was is wrong.**

`docs.celo.org` is a plain, DNS-only CNAME to `cname.vercel-dns.com`, and the addresses behind it (`76.76.21.93`, `66.33.60.194`) are Vercel's. A Cloudflare-proxied record returns Cloudflare addresses and hides the CNAME target, so a visible CNAME to Vercel is proof the record is *not* proxied. The `cf-ray` and `cf-cache-status` headers come from a Cloudflare layer upstream of Vercel, not from the `celo.org` zone — note `server: Vercel` on the same response. AI Crawl Control on the `celo.org` zone would therefore see nothing from this hostname.

Everything below is conditional on first moving `docs.celo.org` behind the zone, which is a DNS change someone has to make and decide on:

- [ ] Proxied (orange-cloud) record for `docs.celo.org`. **Not done.** Today it is DNS-only.
- [ ] SSL/TLS mode **Full (strict)**.
- [ ] **Disable "Always Use HTTPS"** for the zone (Mintlify requirement) and add no rules touching `/.well-known/acme-challenge`.
- [ ] Enable **AI Crawl Control** (free plan): shows per-crawler activity (GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Claude-User, Bytespider, CCBot, Amazonbot, …), the pages each crawler hits, crawl frequency and robots.txt compliance.
- [ ] **Allow all AI crawlers.** These docs want to be read by agents; the tool is for measurement, not blocking. Check that no default block rules are active — Cloudflare default-blocks some AI crawler categories on new zones.
- [ ] Sanity check after cutover: `curl -I https://docs.celo.org/llms.txt` returns 200 with a valid certificate; a normal page and its `.md` variant load.

Once proxied, Cloudflare Analytics (total requests) vs GA4 (sessions) would also give a rough overall bot share as the delta between the two. Treat it as rough: caching means many requests never reach the origin, widening the delta for reasons unrelated to bots.

## Known blind spots

- **Referrer-less AI traffic**: many clicks out of ChatGPT/Claude/Perplexity carry no referrer and appear as Direct in GA4.
- **JS-capable agentic browsers** (Comet, Atlas, computer-use agents) execute the GA4 tag and count as humans; `is_automated` catches only naive automation.
- **MCP traffic, both volume and content.** Requests to `https://docs.celo.org/mcp` are invisible to GA4, which needs JavaScript. They are not visible in our Cloudflare analytics either, because the hostname is not behind our zone (see Runbook 3) — that would only become true after the DNS change. And even then, what no layer here can show is **what was asked**: the question text, which tool was called, whether the answer cited anything.

  Mintlify's own dashboard would cover part of that, but it needs the Pro plan ($450/mo), which #2250 evaluated and declined — the site was previously on Pro and deliberately moved to Starter. Query-level signal comes from the in-page assistant instead, and it is already implemented on both sides (see below).
