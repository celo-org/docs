"""Tests for check_redirects.py. Run: python3 -m unittest discover -s scripts -p 'test_*.py'"""
import io
import json
import tempfile
import unittest
from contextlib import redirect_stderr
from pathlib import Path
from unittest import mock

import check_redirects
from check_redirects import ConfigError, Site, find_problems

PAGES = ["guides/start", "guides/advanced", "tools/index", "orphan"]
NAVIGATION = {
    "tabs": [
        {"tab": "Guides", "groups": [{"group": "Guides", "pages": ["guides/start", "guides/advanced"]}]},
        {"tab": "Tools", "groups": [{"group": "Tools", "pages": ["tools/index"]}]},
    ],
    "global": {
        "anchors": [
            {"anchor": "Start here", "href": "/guides/start"},
            # No page on disk: only fine as long as nothing redirects it.
            {"anchor": "Moved", "href": "/moved/advanced"},
        ]
    },
}


def write_site(root, config):
    for page in PAGES:
        (root / page).parent.mkdir(parents=True, exist_ok=True)
        (root / f"{page}.mdx").write_text("---\ntitle: Test\n---\n")
    (root / "docs.json").write_text(json.dumps(config))


def problems_for(redirects):
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        write_site(root, {"navigation": NAVIGATION, "redirects": redirects})
        return find_problems(Site(root))


def config_error_for(config):
    """The ConfigError message Site raises for `config`, or None if it raises nothing."""
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        write_site(root, config)
        try:
            Site(root)
        except ConfigError as error:
            return str(error)
        return None


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

    def test_same_wildcard_twice_never_matches(self):
        [problem] = problems_for([
            redirect("/old/:slug*", "/guides/:slug*"),
            redirect("/old/:slug*", "/tools"),
        ])
        self.assertIn("/old/:slug*: never matches, because the same wildcard comes earlier", problem)

    def test_sibling_wildcard_with_shared_text_prefix_is_fine(self):
        # /old-guides is not under /old, although the strings share a prefix.
        self.assertEqual(
            problems_for([
                redirect("/old/:slug*", "/guides/:slug*"),
                redirect("/old-guides/:slug*", "/guides/:slug*"),
            ]),
            [],
        )

    def test_wildcard_capturing_a_nav_page(self):
        self.assertEqual(
            problems_for([redirect("/guides/:slug*", "/tools")]),
            [
                "/guides/:slug*: redirects /guides/advanced, which is a page in navigation",
                "/guides/:slug*: redirects /guides/start, which is a page in navigation",
            ],
        )

    def test_exact_source_capturing_a_nav_href(self):
        problems = problems_for([redirect("/guides/start", "/guides/advanced")])
        self.assertEqual(problems, ["/guides/start: redirects /guides/start, which is a page in navigation"])

    def test_nav_link_to_a_redirected_path(self):
        self.assertEqual(
            problems_for([redirect("/moved/advanced", "/guides/advanced")]),
            ["/moved/advanced: navigation links to this path, which /moved/advanced redirects; "
             "link /guides/advanced instead"],
        )

    def test_nav_link_to_a_path_under_a_redirected_wildcard(self):
        self.assertEqual(
            problems_for([redirect("/moved/:slug*", "/guides/:slug*")]),
            ["/moved/advanced: navigation links to this path, which /moved/:slug* redirects; "
             "link /guides/advanced instead"],
        )


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


class UncheckableConfig(unittest.TestCase):
    def test_other_path_parameters_are_refused(self):
        for source in ("/old/:path*", "/old/:id", "/old/:slug*/end", "/old/*", "/old/v:version"):
            with self.subTest(source=source):
                message = config_error_for({"navigation": NAVIGATION, "redirects": [redirect(source, "/tools")]})
                self.assertEqual(
                    message,
                    f"{source}: the only path parameter this script understands is a trailing /:slug*; "
                    "rewrite the source or teach scripts/check_redirects.py its matching",
                )

    def test_literal_colon_is_not_a_parameter(self):
        # A real docs.json source: the colon is followed by a space, so Mintlify reads it literally.
        source = "/blog/2022/03/04/Celo CLI: A Practical Guide"
        self.assertEqual(problems_for([redirect(source, "/tools")]), [])

    def test_missing_or_empty_redirects(self):
        for config in ({"navigation": NAVIGATION, "rediects": []}, {"navigation": NAVIGATION, "redirects": []}):
            with self.subTest(config=config):
                self.assertEqual(config_error_for(config), "docs.json has no 'redirects', or it is empty")

    def test_missing_or_empty_navigation(self):
        redirects = [redirect("/old", "/tools")]
        for config in ({"redirects": redirects}, {"navigation": {}, "redirects": redirects}):
            with self.subTest(config=config):
                self.assertEqual(config_error_for(config), "docs.json has no 'navigation', or it is empty")

    def test_navigation_without_pages(self):
        config = {"navigation": {"tabs": [{"tab": "Empty", "groups": []}]}, "redirects": [redirect("/old", "/tools")]}
        self.assertEqual(config_error_for(config), "docs.json navigation lists no pages")

    def test_main_exits_1_with_the_message(self):
        with tempfile.TemporaryDirectory() as tmp:
            write_site(Path(tmp), {"navigation": NAVIGATION, "redirects": []})
            stderr = io.StringIO()
            with mock.patch("sys.argv", ["check_redirects.py", tmp]), redirect_stderr(stderr):
                self.assertEqual(check_redirects.main(), 1)
        self.assertEqual(stderr.getvalue(), "Cannot check redirects: docs.json has no 'redirects', or it is empty\n")


if __name__ == "__main__":
    unittest.main()
