/**
 * Prüft den gebauten Ordner dist/ (Preview-Ziel). Ohne `npm run build` werden die Tests übersprungen.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';

const dist = path.resolve('dist');
const skip = existsSync(dist) ? false : 'dist/ fehlt (erst npm run build)';
const read = (file: string) => readFileSync(path.join(dist, file), 'utf8');
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const f = path.join(dir, n);
    return statSync(f).isDirectory() ? walk(f) : [f];
  });

test('Startseite: Hero-Überbegriff und beide Kacheln', { skip }, () => {
  const html = read('index.html');
  assert.match(html, /Private Research Lab for Applied AI in/);
  assert.match(html, /General Agent OS/);
  assert.match(html, /Coming soon/);
  assert.match(html, /The Technical Marketer/);
  assert.match(html, /href="https:\/\/ttm\.agentunit\.com\/"/);
  assert.match(html, /href="\/agentunit-site\/projects\/the-technical-marketer\/"/);
});

test('General Agent OS ist nicht verlinkt und hat keine Seite', { skip }, () => {
  const html = read('index.html');
  const card = html.match(/<article[^>]*is-soon[\s\S]*?<\/article>/)?.[0] ?? '';
  assert.match(card, /General Agent OS/);
  assert.doesNotMatch(card, /<a\b/);
  assert.equal(existsSync(path.join(dist, 'projects', 'general-agent-os')), false);
});

test('Team: Startseiten-Abschnitt, /team-Seite, Navigation, Sitemap', { skip }, () => {
  const names = ['Kai', 'Atlas', 'Sentinel', 'Pulse', 'Prism', 'Wave', 'Scout'];
  const home = read('index.html');
  assert.match(home, /id="team"/);
  assert.match(home, /href="\/agentunit-site\/team\/"/);
  const page = read('team/index.html');
  assert.match(page, /<meta name="robots" content="noindex, nofollow"/); // Preview
  assert.equal((page.match(/class="[^"]*agent-card/g) ?? []).length, 7);
  let last = -1;
  for (const n of names) {
    const at = page.indexOf(`<h3 class="agent-name">${n}</h3>`);
    assert.ok(at > last, `${n} in Reihenfolge`);
    last = at;
    assert.match(page, new RegExp(`alt="${n} — [^"]+"`));
    assert.ok(existsSync(path.join(dist, 'team', `${n.toLowerCase()}.webp`)), `${n}.webp`);
    assert.ok(statSync(path.join(dist, 'team', `${n.toLowerCase()}.webp`)).size < 60_000);
  }
  assert.match(read('sitemap-0.xml'), /agentunit-site\/team\//);
});

test('Legal notice und Privacy: noindex, Platzhalter, nicht in der Sitemap', { skip }, () => {
  for (const page of ['legal-notice', 'privacy']) {
    const html = read(`${page}/index.html`);
    assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
    assert.match(html, /text will follow/);
    assert.doesNotMatch(read('sitemap-0.xml'), new RegExp(page));
  }
});

test('Sitemap enthält Start und TTM-Seite mit base', { skip }, () => {
  const sm = read('sitemap-0.xml');
  assert.match(sm, /https:\/\/mltmllr\.github\.io\/agentunit-site\/<\/loc>/);
  assert.match(sm, /agentunit-site\/projects\/the-technical-marketer\//);
});

test('Kein CNAME, kein Tracking', { skip }, () => {
  assert.equal(existsSync(path.join(dist, 'CNAME')), false);
  for (const file of walk(dist).filter((f) => /\.(html|js|css)$/.test(f))) {
    const txt = readFileSync(file, 'utf8');
    assert.doesNotMatch(txt, /googletagmanager|google-analytics|gtag\(|plausible|matomo|fbq\(|hotjar/i, file);
    assert.doesNotMatch(txt, /fonts\.googleapis|fonts\.gstatic/, file);
  }
});

test('Meta-Basics auf jeder Seite', { skip }, () => {
  for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(file, 'utf8');
    for (const re of [/<html lang="en"/, /<title>[^<]+<\/title>/, /name="description"/, /rel="canonical"/, /property="og:title"/, /property="og:image"/, /rel="icon"/, /name="viewport"/, /<h1\b/]) {
      assert.match(html, re, `${path.relative(dist, file)}: ${re}`);
    }
  }
});
