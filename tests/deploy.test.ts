import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DEFAULT_TARGET, joinBase, resolveTarget, targets } from '../src/config/deploy.ts';

test('Standard ist die Vorschau unter github.io mit base', () => {
  assert.equal(DEFAULT_TARGET, 'preview');
  const t = resolveTarget('');
  assert.equal(t.site, 'https://mltmllr.github.io');
  assert.equal(t.base, '/agentunit-site');
  assert.equal(t.indexable, false);
});

test('Produktion: www.agentunit.com ohne base, indexierbar', () => {
  const t = resolveTarget('production');
  assert.equal(t.site, 'https://www.agentunit.com');
  assert.equal(t.base, '/');
  assert.equal(t.indexable, true);
});

test('unbekanntes Ziel bricht ab', () => {
  assert.throws(() => resolveTarget('staging'), /Unbekanntes DEPLOY_TARGET/);
});

test('joinBase', () => {
  assert.equal(joinBase('/agentunit-site', '/projects/x/'), '/agentunit-site/projects/x/');
  assert.equal(joinBase('/agentunit-site', '/'), '/agentunit-site/');
  assert.equal(joinBase('/', '/projects/x/'), '/projects/x/');
  assert.equal(joinBase('/', '/'), '/');
  assert.equal(joinBase('/agentunit-site/', 'a/'), '/agentunit-site/a/');
});

test('keine Domain-Ziele außer preview und production', () => {
  assert.deepEqual(Object.keys(targets).sort(), ['preview', 'production']);
});
