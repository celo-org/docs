"""Fail if .github/freshness/pages.yml does not parse or names a page that does not exist.

The freshness run (RUNBOOK.md, step 3) runs this after it edits the registry.
Run it from the repository root: python3 .github/freshness/check_registry.py
"""

import os
import sys

import yaml

REGISTRY = ".github/freshness/pages.yml"


def main() -> int:
    with open(REGISTRY, encoding="utf-8") as f:
        data = yaml.safe_load(f)
    pages = data.get("pages") if isinstance(data, dict) else None
    if not isinstance(pages, list) or not pages:
        print(f"{REGISTRY}: no `pages` list")
        return 1
    problems = []
    for i, page in enumerate(pages):
        path = page.get("path") if isinstance(page, dict) else None
        if not path:
            problems.append(f"entry {i}: no path")
        elif not os.path.isfile(path):
            problems.append(f"{path}: file not found")
    for problem in problems:
        print(f"{REGISTRY}: {problem}")
    if problems:
        return 1
    print(f"{REGISTRY}: {len(pages)} pages, all paths exist")
    return 0


if __name__ == "__main__":
    sys.exit(main())
