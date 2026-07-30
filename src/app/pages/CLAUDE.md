# src/app/pages/CLAUDE.md

One component per route (see `src/app/app.routes.ts`), each named
`<name>.component.ts` / `App<Name>Component`. All are standalone with
**inline templates** — no `.html`/`.scss` files.

## Standard page shape

Every page follows the same skeleton:

```html
<section class="hero-panther py-5">
  <div class="container hero-inner">
    <div class="section-kicker mb-2">Eyebrow text</div>
    <h1 class="display-5 display-font mb-2">Title <span class="text-silver">Highlight</span></h1>
    <p class="lead mb-0">One-line subhead.</p>
  </div>
</section>

<section class="py-5"> <!-- or py-5 bg-panther-coal for a dark band -->
  <div class="container">
    <!-- content -->
  </div>
</section>
```

Content sections are Bootstrap grid (`row`/`col-*`) with `.card-panther` for
card content, `.section-kicker` for small uppercase eyebrows, `.display-font`
for headings, `.text-silver`/`.text-navy` for brand-color accents. Reach for
these existing classes before inventing new ones — check `src/styles.scss`
first.

## Data on the component vs. imported data modules

- Small, page-local, non-reusable lists (e.g. Contact page's `channels`
  array with mailto links) are fine as a plain array literal directly on the
  component class.
- Anything that's genuinely site content — sponsor tiers, board members,
  roster, prices — is imported from a data module in `src/app/` (see
  `src/app/CLAUDE.md`), not inlined here.

## Control flow & bindings

`@for (item of items; track item.someStableKey)` / `@if` only. Icons are
bound via `[class]="item.icon"` on an empty `<i>`. External links get
`target="_blank" rel="noopener"`; internal links use `routerLink` (import
`RouterLink` only if the page actually uses it — several pages, e.g.
`ContactComponent`, have no `imports` array at all because they don't need
router directives).

## When to extract to `src/app/components/`

If a section is used by **more than one page** (e.g. the sponsor
showcase — used by both `sponsors.component.ts` and `program.component.ts`),
it belongs in `src/app/components/` as its own standalone component, not
copy-pasted. See `src/app/components/CLAUDE.md`.

## Signals

`program.component.ts` uses `signal`/`computed` for roster sort state — the
only page doing so. Reach for signals when a page needs local reactive
state (e.g. sortable table); plain component fields are fine for everything
static.
