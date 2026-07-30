# CLAUDE.md

Guidance for Claude Code (and other agents) working in this repo. See also
`.agents/guidelines/guidelines.md` (always-loaded conventions summary) and
the more specific `CLAUDE.md` files in `src/app/`, `src/app/pages/`, and
`src/app/components/`.

## What this is

The public website for the **Century Panther Touchdown Club**, a booster
organization for RCHS Panthers high-school football. It's a static
marketing/info site — no backend, no auth, no database. Built with
**Angular 19**, **Bootstrap 5**, and **Font Awesome**, deployed to GitHub
Pages at centurypantherfootball.com.

Read `README.md` first — it documents every route and where its editable
content lives; don't duplicate that map here.

## Structure

```
src/app/
  app.component.ts          # shell: navbar + router-outlet + footer (only component with templateUrl/styleUrl)
  app.config.ts              # providers: router (scroll restoration, anchor scrolling), client hydration
  app.routes.ts              # flat route list, one entry per page
  site-links.ts              # external URLs (donate, Zeffy checkouts, calendar, socials)
  touchdown-club.ts          # sponsorship/membership tier data + benefit comparison table
  club-board.ts              # board member roster (About page)
  program-data.ts            # roster/coaches/game-day data (Program page)
  pages/                      # one component per route (see src/app/pages/CLAUDE.md)
  components/                 # reusable pieces used by 2+ pages (see src/app/components/CLAUDE.md)
public/                      # static assets served as-is (favicons, logo, sponsor logo images)
docs/CNAME                   # GitHub Pages custom-domain file (mirrors root CNAME)
.agents/                     # cross-tool agent config (guidelines, skills, agents, mcp, specs); .claude is a symlink to this
```

## Conventions (short version — full detail in `.agents/guidelines/guidelines.md`)

- Standalone Angular components, inline templates (no `.html`/`.scss` per
  component except the app shell), new `@if`/`@for` control flow only.
- All styling is global in `src/styles.scss` (CSS custom properties for the
  navy/silver brand palette + a handful of shared utility classes like
  `.hero-panther`, `.card-panther`, `.section-kicker`). No per-component
  stylesheets.
- Seasonal/real content (sponsors, board, roster, prices, links) lives in
  typed data modules under `src/app/`, not hardcoded in templates — edit
  those first when asked to update content.
- Strict TypeScript, single quotes, 2-space indent (`.editorconfig`).

## Commands

```bash
npm install     # needs FONTAWESOME_NPM_TOKEN in the environment (see .npmrc)
npm start       # dev server, http://localhost:4200
npm test        # Karma/Jasmine — run targeted specs, not the full suite, unless asked
npm run build   # production build -> dist/pages-app/browser (real verification step; no separate lint)
npm run deploy  # manual GitHub Pages deploy (angular-cli-ghpages); normally CI does this
```

## Gotchas

- **`FONTAWESOME_NPM_TOKEN`**: required for `npm install`/`npm ci` because
  `.npmrc` scopes `@awesome.me` to Font Awesome's private registry. Without
  it you get a 401 on that one package. That dependency
  (`@awesome.me/kit-2144818cc7`) is declared in `package.json` but **not
  actually referenced anywhere in the app** — only
  `@fortawesome/fontawesome-free`'s CSS is wired into `angular.json`. If you
  need a working install and don't have the token, it's safe to temporarily
  remove that one line from `package.json`, install, do your work, then
  `git checkout -- package.json package-lock.json` to restore — nothing the
  app actually ships depends on it.
- **`origin` remote**: `git@github.com:artistan/website.git` reports as
  moved to `Artistan/website` (case-only rename). Pushes still succeed via
  GitHub's redirect — not an error worth chasing.
- **Placeholder content**: sponsor tiers, roster, and similar sections
  intentionally render sample/placeholder data (marked "(sample)" or "Your
  Name Here") until real season data lands. That's by design.
- **Dependabot / `npm audit`**: as of the last review, ~39 alerts remain
  open, essentially all blocked behind an Angular 19→21 major upgrade
  (pulls in patched `vite`/`postcss`/etc. inside
  `@angular-devkit/build-angular`), an `angular-cli-ghpages` major bump (for
  `gh-pages`'s prototype-pollution fix), or advisories with no upstream fix
  yet. Check current state (`gh api repos/Artistan/website/dependabot/alerts`)
  before re-investigating from scratch.

## Deployment

Push to `master` → `.github/workflows/deploy.yml` builds production and
publishes `dist/pages-app/browser` to `gh-pages` (served via the `CNAME`
custom domain). Needs the `FONTAWESOME_NPM_TOKEN` repo secret.
