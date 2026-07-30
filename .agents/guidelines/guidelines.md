# Century Panther Touchdown Club — Website: Development Guidelines

Read this before making changes so you don't have to re-derive conventions
from scratch each time. Project-level detail also lives in `CLAUDE.md` files
at the repo root and in `src/app/`, `src/app/pages/`, `src/app/components/` —
those are scoped to the directory they sit in; this file is the always-loaded
summary.

## What this project is

A static marketing/info site for a high-school football booster club
(Century Panther Touchdown Club), built with **Angular 19** (standalone
components, zoneless-friendly APIs like signals where useful, new
`@if`/`@for` control-flow syntax), **Bootstrap 5**, and **Font Awesome**.
Deployed to GitHub Pages via a GitHub Actions workflow that pushes the build
to a `gh-pages` branch. There is no backend — all content is either static
markup or TypeScript data modules edited directly by whoever maintains the
site season to season.

Full narrative context: root `CLAUDE.md`.

## Coding standards

- **TypeScript**: strict mode is on (`tsconfig.json`); don't loosen it.
  Single quotes, 2-space indent, semicolons — enforced by `.editorconfig`
  and existing code, no separate linter config exists so match surrounding
  style by eye.
- **Components**: standalone (no `standalone: true` needed — implicit
  default in v19, don't add it). Selector prefix is `app-`. One component
  class per file, file named `<kebab-name>.component.ts`.
- **Templates**: every component except `AppComponent` (the shell) uses an
  **inline** template (tagged string) — no separate `.html`/`.scss` files.
  Keep that pattern; don't split a page component into templateUrl/styleUrl
  files just because the template is long.
- **Control flow**: use the new `@if` / `@for` block syntax exclusively.
  Never introduce `*ngIf` / `*ngFor` — this codebase has fully moved off
  them.
- **Styling**: there is one global stylesheet, `src/styles.scss`, using CSS
  custom properties for the brand palette (`--panther-navy`, etc.) and a
  small set of reusable utility classes (`.hero-panther`, `.section-kicker`,
  `.card-panther`, `.sample-box`, `.sponsor-logo-box`, `.btn-navy`, …) layered
  on top of Bootstrap. Add new shared classes there, not as component-scoped
  styles — no page/feature component has its own stylesheet, keep it that
  way unless the style is genuinely component-local and non-reusable.
- **Content data**: anything that changes with the season (sponsors, board
  members, roster, ticket tiers, external links) lives in a small typed data
  module under `src/app/` (`site-links.ts`, `touchdown-club.ts`,
  `club-board.ts`, `program-data.ts`) — not hardcoded in template markup.
  When asked to update seasonal/real-world content, look there first before
  touching a component's template.
- **Icons**: Font Awesome class strings (e.g. `'fa-solid fa-house-flag'`)
  stored as plain string fields on data objects, referenced in templates via
  `<i [class]="item.icon">`. The `@awesome.me/kit-2144818cc7` dependency in
  `package.json` is **not actually wired into the app** (only
  `@fortawesome/fontawesome-free`'s CSS is registered in `angular.json`) —
  don't assume Pro icons are available.

## Testing

- Karma + Jasmine (`npm test`). Coverage today is a single smoke spec
  (`app.component.spec.ts`) — this repo does not have a full spec per
  component. Per standing instructions: only add tests when fixing a bug
  (write the failing regression test first) or when explicitly asked; don't
  proactively backfill spec files for unrelated components while doing other
  work.
- Never run the full suite speculatively — run targeted specs relevant to
  the change.

## Build/verify

- `npm install` requires `FONTAWESOME_NPM_TOKEN` in the environment (see
  `.npmrc` — it scopes `@awesome.me` to the Font Awesome private registry).
  Without it, `npm install`/`npm ci` fails with a 401 on that one package.
  If the token isn't available and you need a working `node_modules` anyway,
  it's safe to temporarily drop the `@awesome.me/kit-2144818cc7` line from
  `package.json`, install, do your work/verification, then `git checkout --
  package.json package-lock.json` to restore — that dependency is unused by
  the actual build (see above), so this never changes what ships.
- `npm run build` / `ng build` is the real verification step for changes —
  there's no separate lint step configured.
- Prefer testing UI changes by actually running `ng serve` (or a production
  `ng build` + static serve) and looking at the page — this is a visual
  marketing site; a passing build doesn't mean a layout looks right.

## Deployment

- Push to `master` → `.github/workflows/deploy.yml` builds (production
  config) and publishes `dist/pages-app/browser` to the `gh-pages` branch,
  which GitHub Pages serves at centurypantherfootball.com (custom domain via
  `CNAME`/`public/CNAME`). Needs the `FONTAWESOME_NPM_TOKEN` repo secret.
- `npm run deploy` (`angular-cli-ghpages`) is available for manual/local
  deploys, same target.
- The `origin` remote reports as moved (`artistan/website` →
  `Artistan/website`, a case-only rename) — pushes still succeed through
  GitHub's redirect, this is not an error to chase down.

## Known state worth knowing about

- Several site sections (sponsor tiers, roster, board) render **intentional
  placeholder/sample data** clearly marked "(sample)" or "Your Name Here"
  pending real season data — this is deliberate design, not a bug.
- `npm audit` / Dependabot: as of the last pass, ~39 alerts remain open,
  effectively all blocked behind either an Angular 19→21 major upgrade
  (affects `@angular-devkit/build-angular`'s pinned `vite`/`postcss`/etc.),
  an `angular-cli-ghpages` major bump (for `gh-pages`'s prototype-pollution
  fix), or advisories with no upstream fix yet at all. Don't re-litigate
  this list from scratch — check `gh api repos/Artistan/website/dependabot/alerts`
  for current state before proposing fixes.
