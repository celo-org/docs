#!/usr/bin/env node
// Fail on JSX components Mintlify will not render, using Mintlify's own parser
// (getAST), its own list (allowedComponents) and its own definition of a page-local component
// (getExportedFunctionNames), all loaded from the Mintlify CLI that CI already runs.
//
// Mintlify's renderer (remarkMdxRemoveUnknownJsx in @mintlify/common) replaces a block-level
// element whose name is not in allowedComponents and not an exported function with a comment,
// dropping it and its children silently. An unknown inline element survives to the MDX runtime
// and throws "Expected component `X` to be defined", which fails the page.
//
// Usage: npx -p mintlify@<version> -c 'node scripts/check_components.mjs [root]'
// (the Mintlify CLI, `mintlify` or `mint`, must be on PATH). Based on a prototype by @palango.
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function mintlifyRequire() {
  for (const bin of ['mintlify', 'mint']) {
    try {
      const found = execFileSync('sh', ['-c', `command -v ${bin}`], { encoding: 'utf8' }).trim();
      if (found) return createRequire(realpathSync(found));
    } catch {}
  }
  throw new Error('Mintlify CLI not found on PATH; run via `npx -p mintlify@<version> -c ...`');
}

const req = mintlifyRequire();
const load = async (name) => import(pathToFileURL(req.resolve(name)).href);
const common = await load('@mintlify/common');
const { getAST, allowedComponents, getExportedFunctionNames } = common;
// unist-util-visit is a dependency of @mintlify/common; resolve it from there.
const commonRequire = createRequire(req.resolve('@mintlify/common'));
const { visit } = await import(pathToFileURL(commonRequire.resolve('unist-util-visit')).href);

const root = path.resolve(process.argv[2] ?? path.join(path.dirname(new URL(import.meta.url).pathname), '..'));
const SKIPPED = new Set(['node_modules', 'submodules', 'scripts']);

function* pages(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIPPED.has(entry.name)) yield* pages(full);
    } else if (/\.mdx?$/.test(entry.name)) {
      yield full;
    }
  }
}

// Names bound by `import ... from '/snippets/...'`. Prebuild inlines these before rendering
// (resolveImportsAndWriteFiles), so they are known by the time the renderer runs.
function importedNames(tree) {
  const names = new Set();
  visit(tree, 'mdxjsEsm', (node) => {
    for (const statement of node.data?.estree?.body ?? []) {
      if (statement.type !== 'ImportDeclaration') continue;
      for (const specifier of statement.specifiers) names.add(specifier.local.name);
    }
  });
  return names;
}

const known = new Set(allowedComponents);
const isComponentName = (name) => /^[A-Z]/.test(name); // React: lowercase JSX is an HTML element

// Every estree program embedded in the page: ESM blocks, {expressions}, and attribute expressions.
function programs(tree) {
  const found = [];
  visit(tree, (node) => {
    if (['mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression'].includes(node.type) && node.data?.estree) found.push(node.data.estree);
    for (const attr of node.attributes ?? []) {
      if (attr.type === 'mdxJsxExpressionAttribute' && attr.data?.estree) found.push(attr.data.estree);
      if (attr.value?.type === 'mdxJsxAttributeValueExpression' && attr.value.data?.estree) found.push(attr.value.data.estree);
    }
  });
  return found;
}

function walk(node, fn) {
  if (!node || typeof node.type !== 'string') return;
  fn(node);
  for (const key of Object.keys(node)) {
    if (key === 'loc' || key === 'range' || key === 'position') continue;
    const child = node[key];
    if (Array.isArray(child)) child.forEach((c) => walk(c, fn));
    else if (child && typeof child === 'object') walk(child, fn);
  }
}

// Names bound anywhere in the page's code (parameters, locals, destructuring). Scope-insensitive on
// purpose: a capitalised name bound anywhere in the page is treated as defined.
function boundNames(estrees) {
  const names = new Set();
  const addPattern = (p) => {
    if (!p) return;
    if (p.type === 'Identifier') names.add(p.name);
    else if (p.type === 'ObjectPattern') p.properties.forEach((q) => addPattern(q.type === 'RestElement' ? q.argument : q.value));
    else if (p.type === 'ArrayPattern') p.elements.forEach(addPattern);
    else if (p.type === 'AssignmentPattern') addPattern(p.left);
    else if (p.type === 'RestElement') addPattern(p.argument);
  };
  for (const program of estrees) {
    walk(program, (n) => {
      if (n.type === 'VariableDeclarator') addPattern(n.id);
      if (/Function/.test(n.type)) { addPattern(n.id); n.params.forEach(addPattern); }
      if (n.type === 'ClassDeclaration') addPattern(n.id);
      if (n.type === 'CatchClause') addPattern(n.param);
      if (/ImportSpecifier|ImportDefaultSpecifier|ImportNamespaceSpecifier/.test(n.type)) addPattern(n.local);
    });
  }
  return names;
}

const jsxName = (n) => n.type === 'JSXIdentifier' ? n.name : n.type === 'JSXMemberExpression' ? `${jsxName(n.object)}.${n.property.name}` : null;

const problems = [];
let files = 0;
let elements = 0;
for (const file of pages(root)) {
  files += 1;
  const rel = path.relative(root, file);
  let tree;
  try {
    tree = getAST(readFileSync(file, 'utf8'), file);
  } catch (error) {
    problems.push(`${rel}: does not parse as MDX: ${error.message}`);
    continue;
  }
  const defined = new Set([...getExportedFunctionNames(tree), ...importedNames(tree)]);
  const report = (line, name, why) => problems.push(`${rel}:${line}: <${name}> ${why}`);

  // Markdown-level JSX, the elements Mintlify's remarkMdxRemoveUnknownJsx looks at.
  visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
    if (!node.name) return; // fragment
    elements += 1;
    if (known.has(node.name) || defined.has(node.name)) return;
    if (node.type === 'mdxJsxFlowElement') {
      // Mintlify applies its list to every block element, HTML included.
      report(node.position?.start.line, node.name, 'is not in Mintlify\'s component list or defined in this page: Mintlify drops it and everything inside it');
    } else if (isComponentName(node.name)) {
      report(node.position?.start.line, node.name, 'is not a Mintlify component or defined in this page: the page fails to render');
    }
  });

  // JSX inside code: exported components, {expressions}, attribute values like icon={<Icon />}.
  const estrees = programs(tree);
  const bound = boundNames(estrees);
  for (const program of estrees) {
    walk(program, (n) => {
      if (n.type !== 'JSXOpeningElement') return;
      const name = jsxName(n.name);
      if (!name) return;
      elements += 1;
      const base = name.split('.')[0];
      if (!isComponentName(base) || known.has(name) || bound.has(base) || defined.has(base)) return;
      report(n.loc?.start.line ?? '?', name, 'inside code is not a Mintlify component or defined in this page: it renders nothing or fails the page');
    });
  }
}

console.error(`scanned ${files} files, ${elements} JSX elements, against ${known.size} names from @mintlify/common ${JSON.parse(readFileSync(path.join(path.dirname(req.resolve('@mintlify/common')), '..', 'package.json'), 'utf8')).version}`);
if (problems.length) {
  console.log(problems.join('\n'));
  console.log('\nFix the spelling, import the component from /snippets/, or define it in the page.');
  console.log('A lowercase block tag such as <aside> or <details> is dropped too: use a Mintlify component such as <Tip> or <Accordion>.');
  process.exit(1);
}
console.log('No unknown components found.');
