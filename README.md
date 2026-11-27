# AgentUnit Website

Statische Astro-Seite für AgentUnit („Private Research Lab for Applied AI in Digital Marketing“). Sprache der Seite: Englisch. Design: AgentUnit-Designsystem (dunkel, PCB-/Circuit-Ästhetik), Schriften selbst gehostet, **kein Tracking**.

- Repository: <https://github.com/mltmllr/agentunit-site>
- Vorschau: <https://mltmllr.github.io/agentunit-site/>
- Ziel später: <https://www.agentunit.com/>

## Lokal starten

Node.js 22 oder neuer (siehe `.nvmrc`).

```bash
npm install
npm run dev               # http://localhost:4321/agentunit-site/
npm run build             # Vorschau-Build nach dist/
npm run build:production  # Build für www.agentunit.com (ohne base)
npm run preview           # gebautes dist/ ansehen
npm test                  # Unit-Tests; prüfen zusätzlich dist/, wenn es gebaut ist
npm run check:links       # interner Linkcheck über dist/ (ohne Netz, prüft auch Alt-Texte)
```

Reihenfolge wie in CI: `npm run build && npm test && npm run check:links -- dist`.

## Seiten

| Seite | Pfad (Vorschau) | Hinweis |
| --- | --- | --- |
| Start | `/agentunit-site/` | Hero und Projekt-Kacheln |
| The Technical Marketer | `/agentunit-site/projects/the-technical-marketer/` | Projektseite, verlinkt auf <https://ttm.agentunit.com/> |
| Legal notice | `/agentunit-site/legal-notice/` | Platzhalter, `noindex`, nicht in der Sitemap |
| Privacy | `/agentunit-site/privacy/` | Platzhalter, `noindex`, nicht in der Sitemap |
| 404 | `404.html` | `noindex` |
| `robots.txt`, Sitemap | `/robots.txt`, `/sitemap-index.xml` | erzeugt beim Build |

„General Agent OS“ ist nur eine Kachel mit „Coming soon“, ohne Link und ohne Projektseite.

## Struktur

```text
astro.config.ts                  site/base aus src/config/deploy.ts, Sitemap-Filter
src/config/deploy.ts             Deploy-Ziele preview/production (Domain, base, indexierbar)
src/config/site.ts               Texte, TTM-URL, url()-Helfer
src/config/team.ts               Team-Mitglieder (derzeit leer)
src/layouts/Base.astro           Head (Meta, OG, canonical, robots), Nav, Footer
src/components/                  Header, Footer, Hero, Circuit, Section, ProjectCard, Team
src/styles/                      tokens.css, base.css, components.css (Designsystem), site.css, fonts.css
src/pages/                       index, projects/the-technical-marketer, legal-notice, privacy, 404, robots.txt
public/                          favicon.svg, og.png (1200x630)
scripts/check-links.mjs          interner Linkcheck (kennt base)
tests/                           node:test (deploy.test.ts, dist.test.ts)
.github/workflows/deploy.yml     Push auf main: Build, Test, Linkcheck, GitHub Pages
.github/workflows/ci.yml         Pull Requests: Build, Test, Linkcheck
```

## Neue Projektkachel oder Seite

Kachel: `<ProjectCard>` in `src/pages/index.astro`. Ohne `href` ist sie rein informativ („Coming soon“). Projektseiten liegen unter `src/pages/projects/`. Interne Links immer mit `url('/pfad/')` aus `src/config/site.ts` bauen, damit `base` stimmt.

## Team

Sieben Agenten (Kai, Atlas, Sentinel, Pulse, Prism, Wave, Scout): Daten in `src/config/team.ts` (Texte aus der alten `team.html`), Komponente `src/components/Team.astro`. Kompakt als Abschnitt `#team` auf der Startseite, vollständig unter `/team/`. Avatare als WebP (300 px) in `public/team/`.

## Deployment (Vorschau)

`.github/workflows/deploy.yml` läuft bei Push auf `main`: `npm ci`, Build (`DEPLOY_TARGET=preview`), Tests, Linkcheck, Upload und Deploy auf GitHub Pages. Pages ist mit `build_type: workflow` eingerichtet (Settings → Pages → Source: GitHub Actions). Es gibt **keine** `CNAME`-Datei und keine Custom Domain. Die Vorschau ist `noindex` und `robots.txt` sperrt Crawler.

## Umstellung auf www.agentunit.com

Domain und Basis-Pfad stehen nur in `src/config/deploy.ts`.

1. Ziel umstellen: in `src/config/deploy.ts` `DEFAULT_TARGET = 'production'` setzen, oder im Workflow `DEPLOY_TARGET: production` eintragen (lokal: `npm run build:production`). Das ergibt `site` = `https://www.agentunit.com`, kein `base`, `index, follow`, `robots.txt` mit `Allow: /`.
2. `public/CNAME` mit dem Inhalt `www.agentunit.com` anlegen (erst jetzt, nicht in der Vorschau).
3. In `scripts/check-links.mjs` bzw. im Aufruf `--site https://www.agentunit.com --base /` verwenden (`npm run check:links -- dist --site https://www.agentunit.com --base /`).
4. In `tests/dist.test.ts` erwarten die Tests die Vorschau-Pfade (`/agentunit-site/`). Für Produktion die Pfade dort anpassen.
5. GitHub: Settings → Pages → Custom domain `www.agentunit.com`, danach „Enforce HTTPS“. DNS: `www` als CNAME auf `mltmllr.github.io`. Bisher liegt `www.agentunit.com` auf einer anderen Seite (Repo `mltmllr/agent-unit-preview-site`); die Umstellung dort bewusst und erst beim Go-live vornehmen.
6. Impressum und Datenschutz (Platzhalter, `noindex`) rechtlich prüfen und füllen. Danach `noindex` in `src/pages/legal-notice.astro` und `src/pages/privacy.astro` entfernen und den Sitemap-Filter in `astro.config.ts` anpassen.

## Offene Punkte

- Texte für „Legal notice“ und „Privacy“ fehlen (Platzhalter).
- Team-Abschnitt ist aus (siehe oben).
- „General Agent OS“: Inhalte folgen, bewusst ohne Projektseite.
