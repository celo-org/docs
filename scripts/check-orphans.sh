#!/usr/bin/env bash
# Fail if any page file is not referenced in the docs.json navigation tree.
# A page on disk that is not in navigation is unreachable from the site.
# Either add it to navigation or delete it with a redirect (see AGENTS.md section 2).
set -euo pipefail

cd "$(dirname "$0")/.."

nav_pages=$(mktemp)
page_files=$(mktemp)
trap 'rm -f "$nav_pages" "$page_files"' EXIT

# Every page path reachable from navigation. Three forms count:
#   - string entries in a "pages" array (the common case)
#   - "href" on a group or anchor, when it points at an internal path
#   - "root", which Mintlify uses for a group's landing page
# Nested groups are objects and are reached separately via recursive descent.
{
  jq -r '.navigation | .. | objects | select(has("pages")) | .pages[] | strings' docs.json
  jq -r '.navigation | .. | objects | (.href?, .root?) | strings
         | select(startswith("http") | not)' docs.json \
    | sed 's|^https\?://docs\.celo\.org||; s|^/||; s|#.*$||; s|/$||'
} | grep -v '^$' | sort -u > "$nav_pages"

# Every page file in the repo, as a root-relative path without extension.
# Mintlify renders .md as well as .mdx. snippets/ holds reusable fragments,
# not pages; submodules/ is excluded defensively (empty on CI checkouts, but
# its upstream repo carries docs). The remaining excludes are repo meta that
# is deliberately not published.
find . \( -name '*.mdx' -o -name '*.md' \) \
  -not -path './node_modules/*' \
  -not -path './snippets/*' \
  -not -path './submodules/*' \
  -not -path './.*/*' \
  -not -path './scripts/*' \
  -not -path './README.md' \
  -not -path './AGENTS.md' \
  -not -path './ANALYTICS.md' \
  -not -path './CLAUDE.md' \
  | sed 's|^\./||; s|\.mdx$||; s|\.md$||' | sort -u > "$page_files"

orphans=$(comm -23 "$page_files" "$nav_pages")

if [ -z "$orphans" ]; then
  echo "No orphan pages found."
  exit 0
fi

count=$(printf '%s\n' "$orphans" | wc -l | tr -d ' ')
echo "Found $count orphan page(s): pages not reachable from docs.json navigation:"
printf '%s\n' "$orphans"
echo
echo "Add each to \"navigation\" in docs.json, or delete it and add a \"redirects\" entry."
exit 1
