# Celo Documentation

Official Celo docs. A [Mintlify](https://mintlify.com) site: content is MDX, configuration and navigation live in `docs.json`. There is no `package.json` or build step beyond the Mintlify CLI.

## Setup and validation

- Install the CLI: `npm i -g mint` (or run it ad-hoc with `npx mintlify`).
- Preview locally: `mint dev` → serves at `http://localhost:3000`.
- Check links: `mint broken-links`. This MUST pass before any PR. CI runs `npx mintlify broken-links` on every PR to `main` (Node 24) — see `.github/workflows/docs-validation.yml`.
- If `mint dev` misbehaves, run `mint update` to refresh the CLI.

## Repo layout

- **Content directories** (current, six-tab structure): `home/`, `build-on-celo/`, `tooling/`, `contribute-to-celo/`, `infra-partners/`, `legacy/`. Also `_deprecated/` — 105 tracked duplicate files slated for deletion; do not add to it.
- **`docs.json`** — the single source of truth for navigation and routing:
  - `navigation.tabs` (~lines 35–642): the nav tree. A file on disk is unreachable until it appears here.
  - `redirects` (~lines 664–3161): `{ "source": "/old/path", "destination": "/new/path" }` entries. Large and load-bearing for inbound SEO and external links.
  - Everything else is theme, branding, fonts, footer.
- **`snippets/`** — reusable JSX/MDX components. Put shared content here instead of copy-pasting across pages.
- **`images/`, `img/`, `assets/`, `logo/`** — static assets.
- **`submodules/developer-tooling`** — a git submodule; it is not wired into the built nav.

## Active work: the restructure

`RESTRUCTURE_PLAN.md` is the live plan (a basis for discussion, not a finalized spec): moving the six-tab structure to four tabs — **Learn / Build / Operate / Contribute**. Read it before doing structural work.

When you move or rename a page, all four steps are mandatory:
1. Add a `redirects` entry in `docs.json` (old path → new path, no `.mdx` extension).
2. Update the page's entry in `navigation.tabs`.
3. Update inbound internal links that pointed at the old path.
4. Run `mint broken-links`.

Never move a page without a redirect — external links and search results break silently.

## Editing conventions

- Pages are MDX with YAML frontmatter. The common keys are `title`, `sidebarTitle`, `og:description` — match what neighboring pages in the same section use.
- Internal links are root-relative and carry no extension: `[text](/build/tools/...)`, not a relative path and not `.mdx`.
- Match the voice, heading structure, and frontmatter of the surrounding pages. Consistency within a section beats any external style preference.
- Make the smallest change that does the job. Don't rewrite a working page just to restyle it.

## Writing style

Docs are prose for humans; hold them to the same bar as any other writing.

- **Follow George Orwell's six rules for writing:**
  1. Never use a metaphor, simile, or figure of speech you are used to seeing in print.
  2. Never use a long word where a short one will do.
  3. If it is possible to cut a word out, cut it out.
  4. Never use the passive where you can use the active.
  5. Never use a foreign phrase, a scientific word, or a jargon word if an everyday English equivalent exists.
  6. Break any of these rules sooner than say anything outright barbarous.
- **Never invent technical details.** If you don't know an environment variable, RPC endpoint, contract address, config option, CLI flag, or command, research it (this repo, the submodule, or the official source) or say you don't know. Inventing details is lying, and in docs it ships broken instructions to real users.
- **Document current behavior, not history.** No "recently changed", "as of the L2 migration", "previously", or changelog narration inside a page body — that belongs in Notices / release notes. Describe what is true now.
- **Avoid AI-writing tells:** inflated adjectives ("seamless", "robust", "powerful", "comprehensive"), rule-of-three padding, promotional framing, and em-dash overuse. The `humanizer` skill is available — use it when drafting or reviewing prose.
