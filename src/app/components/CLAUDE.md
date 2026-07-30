# src/app/components/CLAUDE.md

Reusable, presentational components shared by 2+ pages. If something is
only used on one route, it belongs inline in `src/app/pages/` instead (see
`src/app/pages/CLAUDE.md`) — don't pre-emptively extract a component here
until a second page actually needs it.

## `sponsors-supporters.component.ts`

Currently the only component in this directory. Rendered by both
`sponsors.component.ts` and `program.component.ts` (the sponsor/supporter
recognition block on the Game Day Program page is the same component, not a
duplicate). It has two distinct data patterns living side by side — don't
conflate them when adding a new tier:

1. **Sample/placeholder tiers** (`SampleBox`, `TierRow` — Platinum/Gold/
   Silver/Bronze corporate tiers and the community-support tiers): these are
   intentionally fake data (`FAKE_LOGOS`, generic person icons) rendered in
   the dashed, greyed-out `.sample-box` style, clearly labeled "(sample)" or
   "Your Name Here". This is placeholder UI for tiers that don't have real
   sponsors yet — don't try to make these "real" without being asked; the
   whole point is showing the *shape* of a filled-out tier.
2. **Real sponsor logos** (`CouponCardSponsor` — the Coupon Card Sponsors
   row): actual sponsor logo images rendered in the solid `.sponsor-logo-box`
   style (white card, or `.sponsor-logo-box--dark` navy card when a logo's
   artwork is light/transparent and would wash out on white — see the
   `dark` flag on the sponsor entry). When adding a new *real* sponsor tier,
   follow this pattern, not the sample-box one.

### Adding real sponsor logos

- Drop logo image files in `public/sponsors/<tier-name>/`. They're served
  at `/sponsors/<tier-name>/<filename>` (see `angular.json`'s `assets`
  glob on `public`).
- The **filename (without extension) is used as the sponsor's display
  name** — match the existing convention (e.g. `KwikTrip.png` →
  "KwikTrip", `Two Sisters.png` → "Two Sisters"). Rename the file rather
  than adding a separate display-name override.
- If a logo's artwork washes out on a white background, set `dark: true`
  on that sponsor's entry rather than editing the source image.
- Verify visually after adding logos (`ng serve`, look at `/sponsors`) —
  logo legibility against the card background can't be checked from the
  code alone.
