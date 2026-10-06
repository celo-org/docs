#!/usr/bin/env python3
"""Fail if a docs.json redirect cannot work as written.

Mintlify accepts all of these without complaint, and `mint broken-links
--check-redirects` only checks that a destination resolves. This script covers
the rest:

  - a source containing `#`: browsers never send the fragment, so it never matches
  - a `:slug*` wildcard that an earlier wildcard, broader or identical, always matches first
  - a source that captures a page in navigation
  - a navigation link to a redirected path, which should link to the destination
  - a destination of `/`, which is itself redirected to the first nav page
  - a destination that is itself redirected (a chain)
  - a destination that is not a page in navigation
  - a `/b/:slug*` destination where /b is not a folder, page or redirect source

Matching follows Mintlify's precedence: an exact source beats every wildcard
regardless of order; between wildcards the first match in the array wins; a
wildcard also matches its bare prefix (`/a/:slug*` matches `/a`).

The only path parameter the script understands is a trailing `/:slug*`. It
exits with an error on any other (`/a/:path*`, `/a/:id`, `/a/:slug*/b`) rather
than guess how Mintlify matches it, and likewise when `redirects` or
`navigation` is missing or empty.

Run from anywhere: python3 scripts/check_redirects.py
"""
import json
import re
import sys
from pathlib import Path

WILDCARD_SUFFIX = "/:slug*"
# A Mintlify path parameter: `:` followed by a name or `*`, or a bare `*`. A `:`
# followed by anything else is literal, as in "/blog/.../Celo CLI: A Practical Guide".
PATH_PARAMETER = re.compile(r":[\w*]|\*")


class ConfigError(Exception):
    """docs.json has a shape this script cannot check."""


def nav_pages(navigation) -> set[str]:
    """Every page path reachable from navigation, without a leading slash.

    Mirrors scripts/check-orphans.sh: string entries in a "pages" array, plus
    internal "href" and "root" values.
    """
    pages = set()

    def walk(node):
        if isinstance(node, list):
            for child in node:
                walk(child)
        elif isinstance(node, dict):
            for entry in node.get("pages", []):
                if isinstance(entry, str):
                    pages.add(entry.strip("/"))
            for key in ("href", "root"):
                value = node.get(key)
                if isinstance(value, str) and not value.startswith("http"):
                    pages.add(value.split("#")[0].strip("/"))
            for value in node.values():
                if isinstance(value, (list, dict)):
                    walk(value)

    walk(navigation)
    pages.discard("")
    return pages


class Site:
    def __init__(self, root: Path):
        self.root = root
        config = json.loads((root / "docs.json").read_text())
        for key in ("redirects", "navigation"):
            if not config.get(key):
                raise ConfigError(f"docs.json has no '{key}', or it is empty")
        self.redirects = config["redirects"]
        self.nav = nav_pages(config["navigation"])
        if not self.nav:
            raise ConfigError("docs.json navigation lists no pages")
        self.exact_sources = set()
        # (prefix, source) pairs in array order; prefix is the source without /:slug*
        self.wildcards = []
        for redirect in self.redirects:
            source = redirect["source"]
            is_wildcard = source.endswith(WILDCARD_SUFFIX)
            prefix = source[: -len(WILDCARD_SUFFIX)] if is_wildcard else source
            if PATH_PARAMETER.search(prefix):
                raise ConfigError(
                    f"{source}: the only path parameter this script understands is a trailing "
                    f"{WILDCARD_SUFFIX}; rewrite the source or teach scripts/check_redirects.py its matching"
                )
            if is_wildcard:
                self.wildcards.append((prefix, source))
            else:
                self.exact_sources.add(source)

    def matching_source(self, url: str):
        """The redirect source Mintlify would apply to `url`, or None."""
        if url in self.exact_sources:
            return url
        for prefix, source in self.wildcards:
            if url == prefix or url.startswith(prefix + "/"):
                return source
        return None

    def destination_for(self, url: str, source: str) -> str:
        """Where the redirect `source`, which matches `url`, sends it."""
        destination = next(r["destination"] for r in self.redirects if r["source"] == source)
        if not (source.endswith(WILDCARD_SUFFIX) and destination.endswith(WILDCARD_SUFFIX)):
            return destination
        slug = url[len(source) - len(WILDCARD_SUFFIX):]
        return destination[: -len(WILDCARD_SUFFIX)] + slug

    def page_exists(self, path: str) -> bool:
        candidates = (f"{path}.mdx", f"{path}.md", f"{path}/index.mdx", f"{path}/index.md")
        return any((self.root / candidate).is_file() for candidate in candidates)

    def in_nav(self, path: str) -> bool:
        return path in self.nav or f"{path}/index" in self.nav


def find_problems(site: Site) -> list[str]:
    problems = []

    for redirect in site.redirects:
        source, destination = redirect["source"], redirect["destination"]

        if "#" in source:
            problems.append(f"{source}: source contains '#', which browsers never send, so it never matches")

        if destination.startswith(("http://", "https://")):
            continue

        if destination.endswith(WILDCARD_SUFFIX):
            problems.extend(wildcard_destination_problems(site, source, destination))
        else:
            problems.extend(page_destination_problems(site, source, destination))

    for index, (prefix, source) in enumerate(site.wildcards):
        for earlier_prefix, earlier_source in site.wildcards[:index]:
            if prefix == earlier_prefix:
                problems.append(f"{source}: never matches, because the same wildcard comes earlier; delete one")
                break
            if prefix.startswith(earlier_prefix + "/"):
                problems.append(
                    f"{source}: never matches, because {earlier_source} comes earlier and matches first; "
                    "move it above"
                )
                break

    for page in sorted(site.nav):
        url = f"/{page}"
        source = site.matching_source(url)
        if source is None:
            continue
        if site.page_exists(page):
            problems.append(f"{source}: redirects {url}, which is a page in navigation")
        else:
            problems.append(
                f"{url}: navigation links to this path, which {source} redirects; "
                f"link {site.destination_for(url, source)} instead"
            )

    return problems


def page_destination_problems(site: Site, source: str, destination: str) -> list[str]:
    path = destination.split("#")[0]
    if path.strip("/") == "":
        return [f"{source} -> {destination}: '/' redirects again to the first nav page; point at that page"]
    chained = site.matching_source(path)
    if chained is not None:
        return [f"{source} -> {destination}: destination is redirected again by {chained}; point at the final page"]
    page = path.strip("/")
    if not site.page_exists(page):
        return [f"{source} -> {destination}: destination page does not exist"]
    if not site.in_nav(page):
        return [f"{source} -> {destination}: destination page is not in navigation"]
    return []


def wildcard_destination_problems(site: Site, source: str, destination: str) -> list[str]:
    """A `/b/:slug*` destination needs /b to be a folder, a page or a redirect source.

    Chains through a wildcard destination are not checked: renaming a section
    deliberately sends old paths on to the newer redirects, and which URLs a
    wildcard is meant to cover is not recorded anywhere.
    """
    prefix = destination[: -len(WILDCARD_SUFFIX)].strip("/")
    if (site.root / prefix).is_dir() or site.page_exists(prefix):
        return []
    if site.matching_source(f"/{prefix}") is not None:
        return []
    return [f"{source} -> {destination}: /{prefix} is not a folder, a page or a redirect source"]


def main() -> int:
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent
    try:
        site = Site(root)
    except ConfigError as error:
        print(f"Cannot check redirects: {error}", file=sys.stderr)
        return 1
    problems = find_problems(site)
    if not problems:
        print("No redirect problems found.")
        return 0
    print(f"Found {len(problems)} redirect problem(s) in docs.json:")
    for problem in problems:
        print(f"  {problem}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
