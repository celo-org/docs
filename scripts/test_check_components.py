"""Tests for check_components.py. Run: python3 -m unittest discover -s scripts -p 'test_*.py'"""
import io
import tempfile
import unittest
from contextlib import redirect_stdout
from pathlib import Path
from unittest import mock

import check_components
from check_components import BUILTIN_COMPONENTS, find_problems, page_problems


def names(text):
    return [(p.line, p.name) for p in page_problems("page.mdx", text)]


class UnknownComponents(unittest.TestCase):
    def test_misspelled_component_is_flagged_with_its_line(self):
        self.assertEqual(names("---\ntitle: T\n---\n\n<Notte>\nhi\n</Notte>\n"), [(5, "Notte")])

    def test_self_closing_and_attribute_forms_are_flagged(self):
        text = '<Nope />\n<Nope2 a="b">x</Nope2>\n<Nope3\n  a="b"\n/>\n'
        self.assertEqual(names(text), [(1, "Nope"), (2, "Nope2"), (3, "Nope3")])

    def test_every_use_is_reported(self):
        self.assertEqual(names("<Nope>a</Nope>\n\n<Nope>b</Nope>\n"), [(1, "Nope"), (3, "Nope")])

    def test_builtin_components_pass(self):
        text = "".join(f"<{name}>x</{name}>\n" for name in sorted(BUILTIN_COMPONENTS))
        self.assertEqual(names(text), [])

    def test_the_components_this_repo_uses_are_builtin(self):
        # Pins the components AGENTS.md section 6 tells authors to use.
        used = {"Card", "CardGroup", "Tabs", "Tab", "Accordion", "AccordionGroup", "Frame", "CodeGroup",
                "Note", "Tip", "Info", "Warning", "Danger", "Update", "Expandable"}
        self.assertLessEqual(used, BUILTIN_COMPONENTS)

    def test_a_case_difference_is_a_different_component(self):
        self.assertEqual(names("<note>x</note>\n<NOTE>x</NOTE>\n"), [(2, "NOTE")])

    def test_lowercase_html_is_not_checked(self):
        self.assertEqual(names('<div class="a"><img src="x" /><br /></div>\n'), [])

    def test_a_less_than_sign_before_a_digit_or_space_is_not_a_tag(self):
        self.assertEqual(names("a < B and 3<4 and x <Y\n"), [(1, "Y")])


class DefinedInThePage(unittest.TestCase):
    def test_default_import(self):
        self.assertEqual(names("import Thing from '/snippets/Thing.jsx'\n\n<Thing />\n"), [])

    def test_named_and_aliased_imports(self):
        text = "import {YouTube, Real as Alias} from '/snippets/y.jsx'\n\n<YouTube /><Alias /><Real />\n"
        self.assertEqual(names(text), [(3, "Real")])

    def test_multiline_import(self):
        text = "import {\n  One,\n  Two,\n} from '/snippets/x.jsx'\n\n<One /><Two />\n"
        self.assertEqual(names(text), [])

    def test_default_plus_named_and_namespace_imports(self):
        text = "import Main, {Extra} from '/a.jsx'\nimport * as NS from '/b.jsx'\n\n<Main /><Extra /><NS.Thing />\n"
        self.assertEqual(names(text), [])

    def test_an_import_does_not_define_other_names(self):
        self.assertEqual(names("import {One} from '/a.jsx'\n\n<Two />\n"), [(3, "Two")])

    def test_exported_component_defined_in_the_page(self):
        text = "export const Badge2 = ({children}) => <b>{children}</b>\n\n<Badge2>x</Badge2>\n<Other />\n"
        self.assertEqual(names(text), [(4, "Other")])

    def test_function_declaration(self):
        self.assertEqual(names("export function Box() { return null }\n\n<Box />\n"), [])

    def test_member_expression_checks_the_first_part(self):
        self.assertEqual(names("<Color.Row><Color.Item /></Color.Row>\n<Foo.Bar />\n"), [(2, "Foo.Bar")])


class IgnoredText(unittest.TestCase):
    def test_fenced_code_block(self):
        self.assertEqual(names("```tsx\nconst a = <Nope />\n```\n\n<Nope2 />\n"), [(5, "Nope2")])

    def test_tilde_fence(self):
        self.assertEqual(names("~~~\n<Nope />\n~~~\n<Nope2 />\n"), [(4, "Nope2")])

    def test_fence_indented_inside_a_component(self):
        text = "<Tabs>\n  <Tab title='a'>\n    ```ts\n    const x: Promise<Address> = 1\n    ```\n  </Tab>\n</Tabs>\n"
        self.assertEqual(names(text), [])

    def test_longer_fence_is_not_closed_by_a_shorter_one(self):
        text = "````md\n```\n<Nope />\n```\n````\n<Nope2 />\n"
        self.assertEqual(names(text), [(6, "Nope2")])

    def test_a_closing_fence_does_not_carry_an_info_string(self):
        self.assertEqual(names("```\n```js\n<Nope />\n```\n"), [])

    def test_unclosed_fence_runs_to_the_end_of_the_page(self):
        self.assertEqual(names("```\n<Nope />\n"), [])

    def test_inline_code(self):
        self.assertEqual(names("Use `<Nope />` or ``<Nope2>`` here, not <Nope3 />.\n"), [(1, "Nope3")])

    def test_comments(self):
        text = "{/* <Nope /> */}\n<!-- <Nope2 /> -->\n{/*\n<Nope3 />\n*/}\n<Nope4 />\n"
        self.assertEqual(names(text), [(6, "Nope4")])

    def test_line_numbers_survive_stripping(self):
        text = "```\na\nb\n```\n`code`\n{/*\nx\n*/}\n<Nope />\n"
        self.assertEqual(names(text), [(9, "Nope")])


class SiteScan(unittest.TestCase):
    def scan(self, files):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            for relative, text in files.items():
                (root / relative).parent.mkdir(parents=True, exist_ok=True)
                (root / relative).write_text(text, encoding="utf-8")
            return [(p.path, p.line, p.name) for p in find_problems(root)]

    def test_reports_the_path_relative_to_the_root(self):
        self.assertEqual(self.scan({"build/agents/x.mdx": "<Nope />\n"}), [("build/agents/x.mdx", 1, "Nope")])

    def test_md_and_snippet_files_are_scanned(self):
        found = self.scan({"a.md": "<Nope />\n", "snippets/s.mdx": "<Nope2 />\n"})
        self.assertEqual(found, [("a.md", 1, "Nope"), ("snippets/s.mdx", 1, "Nope2")])

    def test_dependencies_submodules_hidden_and_scripts_are_skipped(self):
        files = {f"{d}/x.mdx": "<Nope />\n" for d in ("node_modules", "submodules/dev", ".github", ".claude/x", "scripts")}
        self.assertEqual(self.scan(files), [])

    def test_other_file_types_are_skipped(self):
        self.assertEqual(self.scan({"a.jsx": "<Nope />\n", "b.json": "<Nope />\n"}), [])


class Main(unittest.TestCase):
    def run_main(self, files):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "scripts").mkdir()
            for relative, text in files.items():
                (root / relative).write_text(text, encoding="utf-8")
            out = io.StringIO()
            with mock.patch.object(check_components, "__file__", str(root / "scripts" / "check_components.py")):
                with redirect_stdout(out):
                    code = check_components.main()
            return code, out.getvalue()

    def test_exit_zero_when_clean(self):
        code, out = self.run_main({"a.mdx": "<Note>ok</Note>\n"})
        self.assertEqual(code, 0)
        self.assertIn("No unknown components found.", out)

    def test_exit_one_and_names_the_offender(self):
        code, out = self.run_main({"a.mdx": "\n<CardGrup>x</CardGrup>\n"})
        self.assertEqual(code, 1)
        self.assertIn("a.mdx:2: <CardGrup>", out)
        self.assertIn("BUILTIN_COMPONENTS", out)


if __name__ == "__main__":
    unittest.main()
