#!/usr/bin/env python3
"""Fail if an MDX page uses a component that does not exist.

`mintlify validate` fails on MDX syntax errors (an unclosed tag, a stray `{`) but
passes a page that uses `<Notte>` or `<CardGrup>`. Mintlify then has nothing to
render for the tag, and the mistake only shows up in a preview.

A component used in a page must be one of:

  - a Mintlify built-in (BUILTIN_COMPONENTS below)
  - imported by that page:  import {YouTube} from '/snippets/YouTube.jsx'
  - defined by that page:   export const Thing = ...

Tags inside fenced code blocks, inline code spans and comments are ignored.
Lowercase tags (`<div>`, `<img>`) are HTML and are not checked. A member
expression (`<Color.Row>`, `<NS.Thing>`) is checked on its first part only.

It does not check that an imported file exists or exports the name, or that a
component gets the props it needs.

Run from anywhere: python3 scripts/check_components.py
"""
import re
import sys
from pathlib import Path
from typing import NamedTuple

# Mintlify's own list: `allowedComponents` in @mintlify/common/dist/mdx/utils.js, plus the
# components named in componentIds.js in the same package. Taken from mintlify@4.2.920 (@mintlify/common
# 1.0.1164), the version CI pins. When you bump MINTLIFY_VERSION in
# .github/workflows/docs-validation.yml, rebuild this list from the new version:
#   cd "$(npm root)/mintlify/node_modules/@mintlify/common/dist/mdx" && node -e "import('./utils.js').then(m =>
#     console.log(m.allowedComponents.filter(c => /^[A-Z]/.test(c)).join(' ')))"
# A tag that is valid in Mintlify but missing here fails CI: add it with its source.
BUILTIN_COMPONENTS = frozenset(
    """
    Accordion AccordionGroup ApiPlayground Badge Callout Card CardGroup Check CodeBlock CodeGroup Color
    Column Columns CustomCode CustomComponent Danger DynamicCustomComponent Expandable FileTree Frame
    GitHub Github Heading Icon Info Latex Link MDX MDXContentController Mermaid Note OptimizedFrame
    OptimizedImage OptimizedVideo Panel Param ParamField Popup Prompt RequestExample ResponseExample
    ResponseField SnippetGroup Step Steps Tab Table Tabs Tile Tip Tooltip Tree Update Variation View
    Visibility Warning ZoomImage
    """.split()
)

# Directories that hold no page: dependencies, the submodule (its upstream repo carries its own
# docs), hidden directories, and this directory.
SKIPPED_DIRECTORIES = {"node_modules", "submodules", "scripts"}

FENCE = re.compile(r"^\s*(`{3,}|~{3,})")
INLINE_CODE = re.compile(r"(`+)(?!`).+?(?<!`)\1(?!`)")
COMMENT = re.compile(r"\{/\*.*?\*/\}|<!--.*?-->", re.DOTALL)
IMPORT = re.compile(r"^[ \t]*import\s+(?P<spec>[^'\"]*?)\s+from\s+['\"][^'\"]+['\"]", re.MULTILINE)
DECLARATION = re.compile(
    r"^[ \t]*(?:export\s+)?(?:default\s+)?(?:async\s+)?(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)",
    re.MULTILINE,
)
OPENING_TAG = re.compile(r"<(?P<name>[A-Z][\w$]*(?:\.[\w$]+)*)(?=[\s/>]|$)", re.MULTILINE)


class Problem(NamedTuple):
    path: str
    line: int
    name: str

    def __str__(self):
        return f"{self.path}:{self.line}: <{self.name}> is not a Mintlify component and is not imported or defined in this page"


def blank(text: str) -> str:
    """Replace every character except newlines with a space, so line numbers survive."""
    return re.sub(r"[^\n]", " ", text)


def strip_code_and_comments(text: str) -> str:
    """Blank out fenced code blocks, inline code spans and comments."""
    lines = text.split("\n")
    fence = None  # the opening fence while inside a block: (character, length)
    for index, line in enumerate(lines):
        match = FENCE.match(line)
        if fence is None:
            if match:
                marker = match.group(1)
                # An opening backtick fence cannot carry a backtick in its info string
                # (``` is also how an inline span of three backticks starts).
                if marker[0] == "`" and "`" in line[match.end():]:
                    lines[index] = INLINE_CODE.sub(lambda m: blank(m.group()), line)
                    continue
                fence = (marker[0], len(marker))
                lines[index] = blank(line)
            else:
                lines[index] = INLINE_CODE.sub(lambda m: blank(m.group()), line)
        else:
            lines[index] = blank(line)
            if match and match.group(1)[0] == fence[0] and len(match.group(1)) >= fence[1] and not line.strip().strip(fence[0]):
                fence = None
    return COMMENT.sub(lambda m: blank(m.group()), "\n".join(lines))


def import_names(spec: str) -> set[str]:
    """Local names bound by an import clause: `A`, `{B, C as D}`, `* as E`, `F, {G}`."""
    names = set()
    braces = re.search(r"\{(.*?)\}", spec, re.DOTALL)
    if braces:
        for item in braces.group(1).split(","):
            parts = item.split()
            if parts:
                names.add(parts[-1])
        spec = spec.replace(braces.group(0), "")
    for part in spec.split(","):
        part = part.strip()
        if part.startswith("*"):
            part = part.split()[-1]
        if part:
            names.add(part)
    return names


def defined_names(text: str) -> set[str]:
    names = set()
    for match in IMPORT.finditer(text):
        names |= import_names(match.group("spec"))
    names |= set(DECLARATION.findall(text))
    return names


def page_problems(path: str, text: str) -> list[Problem]:
    text = strip_code_and_comments(text)
    known = BUILTIN_COMPONENTS | defined_names(text)
    problems = []
    for match in OPENING_TAG.finditer(text):
        name = match.group("name")
        if name.split(".")[0] not in known:
            problems.append(Problem(path, text.count("\n", 0, match.start()) + 1, name))
    return problems


def page_files(root: Path):
    for path in sorted(root.rglob("*")):
        if path.suffix not in (".mdx", ".md") or not path.is_file():
            continue
        parts = path.relative_to(root).parts[:-1]
        if any(part in SKIPPED_DIRECTORIES or part.startswith(".") for part in parts):
            continue
        yield path


def find_problems(root: Path) -> list[Problem]:
    problems = []
    for path in page_files(root):
        problems += page_problems(path.relative_to(root).as_posix(), path.read_text(encoding="utf-8"))
    return problems


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    problems = find_problems(root)
    if not problems:
        print("No unknown components found.")
        return 0
    print(f"Found {len(problems)} use(s) of a component that does not exist:")
    for problem in problems:
        print(f"  {problem}")
    print()
    print("Fix the spelling, import the component from /snippets/, or define it in the page.")
    print("If it is a real Mintlify component, add it to BUILTIN_COMPONENTS in scripts/check_components.py.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
