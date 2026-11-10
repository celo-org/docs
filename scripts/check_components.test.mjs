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

function check(root) {
  const run = spawnSync(process.execPath, [script, root], { encoding: 'utf8' });
  return { status: run.status, out: run.stdout, err: run.stderr };
}

// Output lines look like `bad/aside.mdx:1: <aside> is not ...`; a parse failure has no line number.
function problemsFor(out, file) {
  return out.split('\n').filter((line) => line.startsWith(`${file}:`));
}

const bad = {
  // Block elements: Mintlify drops them and everything inside, silently.
  'bad/block_unknown.mdx': '---\ntitle: T\n---\n\n<Notte>\nhi\n</Notte>\n',
  'bad/self_closing.mdx': '<CardGrup />\n',
  'bad/aside.mdx': '<aside>\ntext\n</aside>\n',
  'bad/details.mdx': '<details>\n<summary>x</summary>\n\nbody\n\n</details>\n',
  'bad/member.mdx': '<Color.Anything>x</Color.Anything>\n',
  'bad/hyphen.mdx': '<Card-Grup>\nx\n</Card-Grup>\n',
  // Names that appear in componentIds.js but are not in allowedComponents.
  'bad/popup.mdx': '<Popup>x</Popup>\n',
  'bad/table.mdx': '<Table>x</Table>\n',
  'bad/optimized.mdx': '<OptimizedFrame>x</OptimizedFrame>\n\n<OptimizedImage>y</OptimizedImage>\n',
  // Inline elements: the page fails to render.
  'bad/inline.mdx': 'Some text <Foo>x</Foo> more.\n',
  // JSX inside an attribute expression.
  'bad/attribute_expression.mdx': '<Card icon={<Nope />}>x</Card>\n',
  // A member of a known component is checked by its full name here too.
  'bad/attribute_member.mdx': '<Card icon={<Color.Anything />}>x</Card>\n',
  'bad/unclosed.mdx': '<Note>\nnever closed\n',
};

const good = {
  'good/known.mdx':
    '<Note>ok</Note>\n\n<CardGroup>\n<Card title="x" href="/a">y</Card>\n</CardGroup>\n\n<Tabs><Tab title="a">b</Tab></Tabs>\n',
  'good/color.mdx': '<Color.Row>\n<Color.Item />\n</Color.Row>\n',
  'good/attribute_member.mdx': '<Card icon={<Color.Row />}>x</Card>\n',
  'good/import.mdx': "import {YouTube} from '/snippets/YouTube.jsx'\n\n<YouTube id=\"x\" />\n",
  'good/import_alias.mdx': "import {YouTube as Video} from '/snippets/YouTube.jsx'\n\n<Video id=\"x\" />\n",
  'good/export.mdx': 'export const Box = ({children}) => <div>{children}</div>\n\n<Box>hi</Box>\n',
  'good/fence.mdx': '```tsx\nconst a = <Nope />\n```\n',
  'good/inline_code.mdx': 'Use `<Nope />` here.\n',
  'good/comment.mdx': '{/* <Nope /> */}\n\ntext\n',
  'good/frontmatter.mdx': '---\ntitle: "Promise<Address> in viem"\n---\n\ntext\n',
  'good/attribute_string.mdx': '<Note title="Why Promise<Address> fails">x</Note>\n',
  'good/escaped.mdx': 'Write \\<CardD> in prose.\n',
  'good/html_inline.mdx': 'Line with <br /> and <span>x</span> inline.\n',
  'good/markdown_file.md': '<Note>ok</Note>\n',
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

  const expected = {
    'bad/block_unknown.mdx': ['5: <Notte>'],
    'bad/self_closing.mdx': ['1: <CardGrup>'],
    'bad/aside.mdx': ['1: <aside>'],
    'bad/details.mdx': ['1: <details>'],
    'bad/member.mdx': ['1: <Color.Anything>'],
    'bad/hyphen.mdx': ['1: <Card-Grup>'],
    'bad/popup.mdx': ['1: <Popup>'],
    'bad/table.mdx': ['1: <Table>'],
    'bad/optimized.mdx': ['1: <OptimizedFrame>', '3: <OptimizedImage>'],
    'bad/inline.mdx': ['1: <Foo>'],
    'bad/attribute_expression.mdx': ['1: <Nope>'],
    'bad/attribute_member.mdx': ['1: <Color.Anything>'],
  };
  for (const [file, lines] of Object.entries(expected)) {
    it(`reports ${file} with its line number`, () => {
      const found = problemsFor(result.out, file);
      assert.equal(found.length, lines.length, `${file}: ${found.join(' | ')}`);
      lines.forEach((line, index) => assert.ok(found[index].startsWith(`${file}:${line}`), found[index]));
    });
  }

  it('reports a page that does not parse as MDX', () => {
    const found = problemsFor(result.out, 'bad/unclosed.mdx');
    assert.equal(found.length, 1);
    assert.match(found[0], /does not parse as MDX/);
  });

  it('says that a dropped block disappears with its children', () => {
    assert.match(problemsFor(result.out, 'bad/aside.mdx')[0], /drops it and everything inside it/);
  });

  it('says that an unknown inline component fails the page', () => {
    assert.match(problemsFor(result.out, 'bad/inline.mdx')[0], /the page fails to render/);
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

  it('scans only the pages, not the skipped directories', () => {
    // 14 pages under good/; node_modules, submodules, scripts and .hidden are not scanned.
    assert.match(result.err, /scanned 14 files/);
  });
});
