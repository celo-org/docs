"""Tests for check_redirects.py. Run: python3 -m unittest discover -s scripts -p 'test_*.py'"""
import json
import tempfile
import unittest
from pathlib import Path

from check_redirects import Site, find_problems

PAGES = ["guides/start", "guides/advanced", "tools/index", "orphan"]
NAVIGATION = {
    "tabs": [
        {"tab": "Guides", "groups": [{"group": "Guides", "pages": ["guides/start", "guides/advanced"]}]},
        {"tab": "Tools", "groups": [{"group": "Tools", "pages": ["tools/index"]}]},
    ],
    "global": {"anchors": [{"anchor": "Start here", "href": "/guides/start"}]},
}


def problems_for(redirects):
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        for page in PAGES:
            (root / page).parent.mkdir(parents=True, exist_ok=True)
            (root / f"{page}.mdx").write_text("---\ntitle: Test\n---\n")
        (root / "docs.json").write_text(json.dumps({"navigation": NAVIGATION, "redirects": redirects}))
        return find_problems(Site(root))


def redirect(source, destination):
    return {"source": source, "destination": destination}


class ValidRedirects(unittest.TestCase):
    def test_no_problems(self):
        self.assertEqual(
            problems_for([
                redirect("/old/start", "/guides/start"),
                redirect("/old/advanced", "/guides/advanced#setup"),
                redirect("/old-tools", "/tools"),
                redirect("/old-guides/legacy/:slug*", "/guides/start"),
                redirect("/old-guides/:slug*", "/guides/:slug*"),
                redirect("/external", "https://celo.org/"),
            ]),
            [],
        )

    def test_exact_source_under_a_wildcard_is_fine(self):
        # Exact sources beat wildcards regardless of order.
        self.assertEqual(
            problems_for([
                redirect("/old/:slug*", "/guides/:slug*"),
                redirect("/old/special", "/guides/advanced"),
            ]),
            [],
        )

    def test_narrower_wildcard_above_broader_is_fine(self):
        self.assertEqual(
            problems_for([
                redirect("/old/ai/:slug*", "/guides/advanced"),
                redirect("/old/:slug*", "/guides/:slug*"),
            ]),
            [],
        )

    def test_wildcard_destination_chain_is_allowed(self):
        self.assertEqual(
            problems_for([
                redirect("/older/:slug*", "/old/:slug*"),
                redirect("/old/:slug*", "/guides/:slug*"),
            ]),
            [],
        )


class InvalidSources(unittest.TestCase):
    def test_fragment_source(self):
        [problem] = problems_for([redirect("/faqs#supply", "/guides/start")])
        self.assertIn("/faqs#supply: source contains '#'", problem)

    def test_narrower_wildcard_below_broader_never_matches(self):
        [problem] = problems_for([
            redirect("/old/:slug*", "/guides/:slug*"),
            redirect("/old/ai/:slug*", "/guides/advanced"),
        ])
        self.assertIn("/old/ai/:slug*: never matches, because /old/:slug* comes earlier", problem)

    def test_wildcard_capturing_a_nav_page(self):
        self.assertEqual(
            problems_for([redirect("/guides/:slug*", "/tools")]),
            [
                "/guides/:slug*: redirects /guides/advanced, which navigation links to",
                "/guides/:slug*: redirects /guides/start, which navigation links to",
            ],
        )

    def test_exact_source_capturing_a_nav_href(self):
        problems = problems_for([redirect("/guides/start", "/guides/advanced")])
        self.assertEqual(problems, ["/guides/start: redirects /guides/start, which navigation links to"])


class InvalidDestinations(unittest.TestCase):
    def test_root_destination(self):
        [problem] = problems_for([redirect("/old", "/")])
        self.assertIn("/old -> /: '/' redirects again", problem)

    def test_chained_destination(self):
        [problem] = problems_for([
            redirect("/older", "/old"),
            redirect("/old", "/guides/start"),
        ])
        self.assertIn("/older -> /old: destination is redirected again by /old", problem)

    def test_destination_chained_through_a_wildcard(self):
        [problem] = problems_for([
            redirect("/older", "/old/start"),
            redirect("/old/:slug*", "/guides/:slug*"),
        ])
        self.assertIn("/older -> /old/start: destination is redirected again by /old/:slug*", problem)

    def test_missing_destination(self):
        [problem] = problems_for([redirect("/old", "/guides/gone")])
        self.assertIn("/old -> /guides/gone: destination page does not exist", problem)

    def test_destination_not_in_navigation(self):
        [problem] = problems_for([redirect("/old", "/orphan")])
        self.assertIn("/old -> /orphan: destination page is not in navigation", problem)

    def test_missing_wildcard_destination_prefix(self):
        [problem] = problems_for([redirect("/old/:slug*", "/gone/:slug*")])
        self.assertIn("/old/:slug* -> /gone/:slug*: /gone is not a folder, a page or a redirect source", problem)


if __name__ == "__main__":
    unittest.main()
