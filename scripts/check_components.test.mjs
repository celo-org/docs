// Tests for check_components.mjs. Run with the Mintlify CLI on PATH:
//   npx -p mintlify@<version> -c 'node --test scripts/check_components.test.mjs'
//
// Each group of pages is written to a temporary site and checked in one run of the script, because
// loading the Mintlify parser takes a moment.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const script = path.join(path.dirname(fileURLToPath(import.meta.url)), 'check_components.mjs');

function site(files) {
  const root = mkdtempSync(path.join(tmpdir(), 'check-components-'));
  for (const [name, text] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
    writeFileSync(path.join(root, name), text);
  }
  return root;
}

function check(root, ...args) {
  const run = spawnSync(process.execPath, [script, root, ...args], { encoding: 'utf8' });
  return { status: run.status, out: run.stdout, err: run.stderr };
}

// Output lines look like `bad/aside.mdx:1: <aside> is not ...`; a parse failure has no line number.
function problemsFor(out, file) {
  return out.split('\n').filter((line) => line.startsWith(`${file}:`));
}

const DROPPED = /drops it and everything inside it/;

// A snippet the imports below point at: one named export, written like the ones in snippets/.
const snippetJsx = 'export const YouTube = ({ id }) => <iframe src={id} />;\n';
const snippetMdx = 'export const Callout2 = ({ children }) => <div>{children}</div>\n';

const bad = {
  'snippets/YouTube.jsx': snippetJsx,
  // Block elements: Mintlify drops them and everything inside, silently.
  'bad/block_unknown.mdx': '---\ntitle: T\n---\n\n<Notte>\nhi\n</Notte>\n',
  'bad/self_closing.mdx': '<CardGrup />\n',
  'bad/aside.mdx': '<aside>\ntext\n</aside>\n',
  'bad/details.mdx': '<details>\n<summary>x</summary>\n\nbody\n\n</details>\n',
  'bad/member.mdx': '<Color.Anything>\nx\n</Color.Anything>\n',
  'bad/hyphen.mdx': '<Card-Grup>\nx\n</Card-Grup>\n',
  // Names that appear in componentIds.js but are not in allowedComponents.
  'bad/popup.mdx': '<Popup>\nx\n</Popup>\n',
  'bad/table.mdx': '<Table>\nx\n</Table>\n',
  'bad/optimized.mdx': '<OptimizedFrame>\nx\n</OptimizedFrame>\n\n<OptimizedImage>\ny\n</OptimizedImage>\n',
  // An element alone on its line is unravelled into a block by MDX, so Mintlify drops it silently.
  'bad/one_line_aside.mdx': '<aside>text</aside>\n',
  'bad/one_line_center.mdx': '<center>c</center>\n',
  'bad/one_line_details.mdx': '<details><summary>x</summary>body</details>\n',
  'bad/one_line_unknown.mdx': '<Notte>x</Notte>\n',
  'bad/one_line_popup.mdx': '<Popup>x</Popup>\n',
  'bad/one_line_member.mdx': '<Color.Anything>x</Color.Anything>\n',
  // Text next to it keeps it inline: an unknown inline element fails the page.
  'bad/inline.mdx': 'Some text <Foo>x</Foo> more.\n',
  // JSX inside an attribute expression.
  'bad/attribute_expression.mdx': '<Card icon={<Nope />}>\nx\n</Card>\n',
  // A member of a known component is checked by its full name here too.
  'bad/attribute_member.mdx': '<Card icon={<Color.Anything />}>\nx\n</Card>\n',
  // Imports Mintlify cannot resolve: the name is not defined, so its tags are dropped.
  'bad/import_misspelled.mdx': "import {YouTub} from '/snippets/YouTube.jsx'\n\n<YouTub id=\"x\" />\n",
  'bad/import_missing_file.mdx': "import {Thing} from '/snippets/Nope.jsx'\n\n<Thing />\n",
  'bad/import_package.mdx': "import {Thing} from 'some-package'\n\n<Thing />\n",
  'bad/unclosed.mdx': '<Note>\nnever closed\n',
};

const good = {
  'snippets/YouTube.jsx': snippetJsx,
  'snippets/Callout2.mdx': snippetMdx,
  'good/known.mdx':
    '<Note>ok</Note>\n\n<CardGroup>\n<Card title="x" href="/a">y</Card>\n</CardGroup>\n\n<Tabs><Tab title="a">b</Tab></Tabs>\n',
  'good/one_line_known.mdx': '<Note>one line</Note>\n',
  'good/color.mdx': '<Color.Row>\n<Color.Item />\n</Color.Row>\n',
  'good/attribute_member.mdx': '<Card icon={<Color.Row />}>\nx\n</Card>\n',
  'good/import_jsx.mdx': "import {YouTube} from '/snippets/YouTube.jsx'\n\n<YouTube id=\"x\" />\n",
  'good/import_alias.mdx': "import {YouTube as Video} from '/snippets/YouTube.jsx'\n\n<Video id=\"x\" />\n",
  'good/import_mdx.mdx': "import {Callout2} from '/snippets/Callout2.mdx'\n\n<Callout2>hi</Callout2>\n",
  'good/import_relative.mdx': "import {YouTube} from '../snippets/YouTube.jsx'\n\n<YouTube id=\"x\" />\n",
  'good/export.mdx': 'export const Box = ({children}) => <div>{children}</div>\n\n<Box>hi</Box>\n',
  'good/fence.mdx': '```tsx\nconst a = <Nope />\n```\n',
  'good/inline_code.mdx': 'Use `<Nope />` here.\n',
  'good/comment.mdx': '{/* <Nope /> */}\n\ntext\n',
  'good/frontmatter.mdx': '---\ntitle: "Promise<Address> in viem"\n---\n\ntext\n',
  'good/attribute_string.mdx': '<Note title="Why Promise<Address> fails">x</Note>\n',
  'good/escaped.mdx': 'Write \\<CardD> in prose.\n',
  'good/html_inline.mdx': 'Line with <br /> and <span>x</span> inline.\n',
  'good/markdown_file.md': '<Note>ok</Note>\n',
  // Mintlify never builds these .md files, in any directory and in any letter case.
  'README.md': '<div align="center">GitHub-style HTML</div>\n',
  'good/CONTRIBUTING.md': '<p align="center">x</p>\n',
  'good/license.md': '<center>x</center>\n',
  // Directories that hold no page are skipped, whatever they contain.
  'node_modules/dep/skip.mdx': '<Nope>x</Nope>\n',
  'submodules/dev/skip.mdx': '<Nope>x</Nope>\n',
  'scripts/skip.mdx': '<Nope>x</Nope>\n',
  '.hidden/skip.mdx': '<Nope>x</Nope>\n',
};

describe('pages that use a component Mintlify will not render', () => {
  let root;
  let result;
  before(() => {
    root = site(bad);
    result = check(root);
  });
  after(() => rmSync(root, { recursive: true, force: true }));

  it('exits 1 and says how to fix it', () => {
    assert.equal(result.status, 1);
    assert.match(result.out, /Fix the spelling, import the component from \/snippets\//);
  });

  // file -> the `line: <name>` prefixes it must report, in order, and whether Mintlify drops the element.
  const expected = {
    'bad/block_unknown.mdx': [['5: <Notte>', true]],
    'bad/self_closing.mdx': [['1: <CardGrup>', true]],
    'bad/aside.mdx': [['1: <aside>', true]],
    'bad/details.mdx': [['1: <details>', true]],
    'bad/member.mdx': [['1: <Color.Anything>', true]],
    'bad/hyphen.mdx': [['1: <Card-Grup>', true]],
    'bad/popup.mdx': [['1: <Popup>', true]],
    'bad/table.mdx': [['1: <Table>', true]],
    'bad/optimized.mdx': [['1: <OptimizedFrame>', true], ['5: <OptimizedImage>', true]],
    'bad/one_line_aside.mdx': [['1: <aside>', true]],
    'bad/one_line_center.mdx': [['1: <center>', true]],
    'bad/one_line_details.mdx': [['1: <details>', true]],
    'bad/one_line_unknown.mdx': [['1: <Notte>', true]],
    'bad/one_line_popup.mdx': [['1: <Popup>', true]],
    'bad/one_line_member.mdx': [['1: <Color.Anything>', true]],
    'bad/attribute_expression.mdx': [['1: <Nope>', false]],
    'bad/attribute_member.mdx': [['1: <Color.Anything>', false]],
  };
  for (const [file, lines] of Object.entries(expected)) {
    it(`reports ${file} with its line number`, () => {
      const found = problemsFor(result.out, file);
      assert.equal(found.length, lines.length, `${file}: ${found.join(' | ')}`);
      lines.forEach(([prefix, dropped], index) => {
        assert.ok(found[index].startsWith(`${file}:${prefix}`), found[index]);
        if (dropped) assert.match(found[index], DROPPED, found[index]);
      });
    });
  }

  it('says that an unknown inline component next to text fails the page', () => {
    const found = problemsFor(result.out, 'bad/inline.mdx');
    assert.equal(found.length, 1);
    assert.ok(found[0].startsWith('bad/inline.mdx:1: <Foo>'), found[0]);
    assert.match(found[0], /the page fails to render/);
  });

  it('reports a named import the snippet does not export, and the tag that uses it', () => {
    const found = problemsFor(result.out, 'bad/import_misspelled.mdx');
    assert.equal(found.length, 2, found.join(' | '));
    assert.match(found[0], /^bad\/import_misspelled\.mdx:1: import from '\/snippets\/YouTube\.jsx' names `YouTub`, which the snippet does not export/);
    assert.ok(found[1].startsWith('bad/import_misspelled.mdx:3: <YouTub>'), found[1]);
  });

  it('reports an import from a file that does not exist', () => {
    const found = problemsFor(result.out, 'bad/import_missing_file.mdx');
    assert.match(found[0], /:1: import from '\/snippets\/Nope\.jsx' points to a file that does not exist/);
    assert.ok(found.some((line) => line.includes('<Thing>')), found.join(' | '));
  });

  it('reports an import from a package, which Mintlify does not resolve', () => {
    const found = problemsFor(result.out, 'bad/import_package.mdx');
    assert.match(found[0], /:1: import from 'some-package' is not a local path/);
  });

  it('reports a page that does not parse as MDX', () => {
    const found = problemsFor(result.out, 'bad/unclosed.mdx');
    assert.equal(found.length, 1);
    assert.match(found[0], /does not parse as MDX/);
  });

  it('does not report the snippet file the imports point at', () => {
    assert.equal(problemsFor(result.out, 'snippets/YouTube.jsx').length, 0);
  });
});

describe('pages Mintlify renders', () => {
  let root;
  let result;
  before(() => {
    root = site(good);
    result = check(root);
  });
  after(() => rmSync(root, { recursive: true, force: true }));

  it('passes with exit 0', () => {
    assert.equal(result.status, 0, result.out);
    assert.match(result.out, /No unknown components found\./);
  });

  it('scans only the pages, not the skipped directories or the files Mintlify excludes', () => {
    // 17 pages under good/ plus snippets/Callout2.mdx; README.md, CONTRIBUTING.md, license.md,
    // node_modules, submodules, scripts and .hidden are not scanned.
    assert.match(result.err, /scanned 18 files/);
  });
});
