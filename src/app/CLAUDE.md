# src/app/CLAUDE.md

App-shell and content-data conventions. Component-level conventions live in
`pages/CLAUDE.md` and `components/CLAUDE.md`; this file covers what sits
directly in `src/app/`.

## App shell (`app.component.ts` / `.html` / `.scss`)

The only component in the codebase with an external `templateUrl`/`styleUrl`
instead of an inline template — it's the site chrome (sticky navbar, footer)
that wraps every route via `<router-outlet>`. It also:

- Collapses the mobile navbar on navigation (subscribes to `Router.events`,
  filters `NavigationEnd`, clicks the toggler if the collapse is open).
- Owns `navLinks` (the nav item list) as a plain array on the component —
  add new routes here too, not just in `app.routes.ts`.

## `app.config.ts`

Application-wide providers: zoneless-friendly change detection
(`provideZoneChangeDetection({ eventCoalescing: true })`), router with
`withInMemoryScrolling` (scroll-to-top + anchor scrolling — this is why
in-page anchors like `/sponsors#thank-you` work), and client hydration with
event replay. If you add a provider, it goes here, not in a component.

## `app.routes.ts`

Flat list, one entry per page component, each with an explicit `title`
(shown in the browser tab — matches the `"<Page> | Century Panther
Touchdown Club"` pattern). Wildcard redirects to home.

## Content data modules

These are the actual **editable content** of the site — treat them as the
source of truth, not the templates that render them:

| File | Powers | Notes |
|---|---|---|
| `site-links.ts` | Donate/Zeffy/calendar/social URLs used across pages | Has an inline comment on regenerating the PayPal donate link if it expires |
| `touchdown-club.ts` | Corporate sponsor tiers, benefit comparison table, Touchdown Club (community) tiers | `SupportTier`/`ComparisonRow` interfaces — shown on Get Involved + Sponsors |
| `club-board.ts` | Board member roster (About page) | Update when officers change |
| `program-data.ts` | Roster, coaches, game info, and a `PROGRAM_DATA_IS_PLACEHOLDER` flag | Program page reads the flag to show a "sample layout" banner — flip it off once real season data is entered |

When asked to update sponsors, board members, roster, prices, or links,
edit the relevant data module here first — only touch a page/component
template if the *layout* (not the content) needs to change.
