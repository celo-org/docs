#!/usr/bin/env bash
# Fail if any .mdx page is not referenced in the docs.json navigation tree.
# A page on disk that is not in navigation is unreachable from the site.
# Either add it to navigation or delete it with a redirect (see AGENTS.md section 2).
set -euo pipefail

cd "$(dirname "$0")/.."

nav_pages=$(mktemp)
mdx_files=$(mktemp)
trap 'rm -f "$nav_pages" "$mdx_files"' EXIT

# Every page path referenced in navigation: walk all objects that carry a
# "pages" array and keep only its string entries (nested groups are objects
# and are reached separately via the recursive descent).
jq -r '.navigation | .. | objects | select(has("pages")) | .pages[] | strings' docs.json \
  | sort -u > "$nav_pages"

# Every .mdx page in the repo, as a root-relative path without extension.
# snippets/ holds reusable fragments, not pages; submodules/ is excluded
# defensively (empty on CI checkouts, but its upstream repo carries docs).
find . -name '*.mdx' \
  -not -path './node_modules/*' \
  -not -path './snippets/*' \
  -not -path './submodules/*' \
  | sed 's|^\./||; s|\.mdx$||' | sort -u > "$mdx_files"

orphans=$(comm -23 "$mdx_files" "$nav_pages")

if [ -z "$orphans" ]; then
  echo "No orphan pages found."
  exit 0
fi

count=$(printf '%s\n' "$orphans" | wc -l | tr -d ' ')
echo "Found $count orphan page(s): .mdx files not referenced in docs.json navigation:"
printf '%s\n' "$orphans"
exit 1
