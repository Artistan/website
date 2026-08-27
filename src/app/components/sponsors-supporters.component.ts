import { Component } from '@angular/core';
import { BUSINESS_SPONSORS_ZEFFY_URL, TOUCHDOWN_CLUB_ZEFFY_URL } from '../site-links';

/** A real corporate or coupon-card sponsor. `src` is omitted until a logo file is on hand. */
interface RealSponsor {
  src?: string;
  name: string;
  /** True when the logo's artwork is light/transparent and washes out on a white card. */
  dark?: boolean;
}

interface SponsorRow {
  title: string;
  rowCols: string;
  sponsors: RealSponsor[];
}

interface PersonBox {
  icon: string;
  name: string;
}

interface SampleRow {
  title: string;
  rowCols: string;
  boxes: PersonBox[];
}

function personBoxes(count: number): PersonBox[] {
  return Array.from({ length: count }, () => ({
    icon: 'fa-solid fa-circle-user',
    name: 'Your Name Here',
  }));
}

/**
 * Card width (out of 12) for tier `tierIndex` in `ladder`, given how many items are in it.
 * Entry `i` is a tier's width when it has exactly one item; once a second item joins, the card
 * steps down to entry `i + 1` — the same width the next tier down starts at. This keeps every
 * tier visibly smaller than the one above it, and steps down again once it fills in.
 */
function tierRowCols(ladder: number[], tierIndex: number, itemCount: number): string {
  const isSingle = itemCount === 1;
  const width = ladder[Math.min(isSingle ? tierIndex : tierIndex + 1, ladder.length - 1)];
  const desktopCols = 12 / width;
  const mobileCols = isSingle ? 1 : 2;
  return `row-cols-${mobileCols} row-cols-md-${desktopCols} justify-content-center`;
}

/**
 * Ladder for the corporate tiers, Platinum first. Floors out at col-2 (six per row) since a
 * narrower card can't fit a logo.
 */
const CORPORATE_WIDTH_LADDER = [12, 6, 4, 3, 2, 2, 2, 2];

function corporateSponsorRow(tierIndex: number, title: string, sponsors: RealSponsor[]): SponsorRow {
  return { title, sponsors, rowCols: tierRowCols(CORPORATE_WIDTH_LADDER, tierIndex, sponsors.length) };
}

/** Real 2026 corporate sponsors, grouped by their Panther sponsorship tier (highest first). */
const CORPORATE_ROWS: SponsorRow[] = [
  corporateSponsorRow(0, 'Platinum Sponsors', [{ src: '/sponsors/hyvee.png', name: 'Hy-Vee' }]),
  corporateSponsorRow(1, 'Gold Sponsors', [{ src: '/sponsors/LakesideDental.png', name: 'Lakeside Dentistry' }]),
  corporateSponsorRow(2, 'Silver Sponsors', [{ src: '/sponsors/VFW-1215.png', name: 'VFW Post 1215' }]),
  corporateSponsorRow(3, 'Bronze Sponsors', [
    { name: 'Alerus' },
    { name: 'Atlas Insurance' },
    { name: 'Archkey Technologies' },
    { src: '/sponsors/BearArms.png', name: 'Bear Arms' },
    { name: 'Bowlocity' },
    { src: '/sponsors/MC_STACKED_BLACK_RGB_CLEAR.png', name: 'Mayo Clinic' },
  ]),
  corporateSponsorRow(4, 'Iron Sponsors', [{ name: 'EDI Driving School' }, { name: 'Superior Screeners' }]),
  corporateSponsorRow(5, 'Panther Fuel Sponsors', [
    { name: 'Chick-fil-A' },
    { src: '/sponsors/WestEndBlends.jpg', name: 'West End Blends' },
  ]),
  corporateSponsorRow(6, '5th Quarter Sponsor', [{ src: '/sponsors/Tavern 22.jpg', name: 'Tavern 22' }]),
];

/** Real sponsor logos for the Coupon Card fundraiser, served from public/sponsors/coupon-card. */
const COUPON_CARD_SPONSORS: RealSponsor[] = [
  { name: "BB's Pizzaria" },
  { src: '/sponsors/coupon-card/Blue Lagoon.png', name: 'Blue Lagoon' },
  { src: '/sponsors/coupon-card/KwikTrip.png', name: 'Kwik Trip' },
  { src: '/sponsors/coupon-card/YellowArch.png', name: "McDonald's®" },
  { src: '/sponsors/coupon-card/Newts.png', name: "Newt's" },
  { src: '/sponsors/coupon-card/Purple Goat.png', name: 'Purple Goat' },
  { src: '/sponsors/coupon-card/Workshop.png', name: 'The Workshop' },
  { src: '/sponsors/coupon-card/Two Sisters.png', name: 'Two Sisters', dark: true },
  { src: '/sponsors/coupon-card/Wildwood.jpg', name: 'Wildwood' },
];

/** Coupon Card sits below the tier ladder, at its floor width (col-2, six per row). */
const COUPON_CARD_ROW_COLS = 'row-cols-2 row-cols-md-6 justify-content-center';

/**
 * Ladder for the community tiers, Legacy Builders first. Index 0 is never used — every
 * community tier's sample row has more than one box — so it just mirrors index 1.
 */
const COMMUNITY_WIDTH_LADDER = [6, 6, 4, 3, 2];

function communityRow(tierIndex: number, title: string, boxes: PersonBox[]): SampleRow {
  return { title, boxes, rowCols: tierRowCols(COMMUNITY_WIDTH_LADDER, tierIndex, boxes.length) };
}

const COMMUNITY_ROWS: SampleRow[] = [
  communityRow(0, 'Legacy Builders', personBoxes(2)),
  communityRow(1, 'Century Champions', personBoxes(4)),
  communityRow(2, 'Prowl Backers', personBoxes(8)),
  communityRow(3, 'Home Field Supporters', personBoxes(16)),
];

@Component({
  selector: 'app-sponsors-supporters',
  template: `
    <section class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <div class="section-kicker mb-2">They make Friday nights possible</div>
          <h2 class="display-font h1">Sponsors &amp; Supporters</h2>
          <p class="text-muted mx-auto" style="max-width: 42rem;">
            Our 2026 corporate sponsors below — the Panthers Community Support spots are a
            sample layout until real names and logos fill them in as the season campaign kicks off.
          </p>
        </div>

        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <h3 class="tier-row-heading h5 mb-0"><i class="fa-solid fa-handshake me-2"></i>Corporate Sponsors</h3>
          <a [href]="businessZeffyUrl" target="_blank" rel="noopener" class="btn btn-outline-navy btn-sm">
            Become a Sponsor <i class="fa-solid fa-arrow-up-right-from-square fa-xs ms-1"></i>
          </a>
        </div>
        @for (row of corporateRows; track row.title) {
          <div class="small fw-semibold text-muted text-uppercase mb-2">{{ row.title }}</div>
          <div class="row g-3 mb-4" [class]="row.rowCols">
            @for (sponsor of row.sponsors; track sponsor.name) {
              <div class="col">
                <div class="sponsor-logo-box" [class.sponsor-logo-box--dark]="sponsor.dark">
                  @if (sponsor.src) {
                    <img [src]="sponsor.src" [alt]="sponsor.name" class="sponsor-logo-img" />
                  } @else {
                    <i class="fa-solid fa-building"></i>
                  }
                  <span class="small fw-semibold">{{ sponsor.name }}</span>
                </div>
              </div>
            }
          </div>
        }

        <div class="small fw-semibold text-muted text-uppercase mb-2">Coupon Card Sponsors</div>
        <div class="row g-3 mb-4" [class]="couponCardRowCols">
          @for (sponsor of couponCardSponsors; track sponsor.name) {
            <div class="col">
              <div class="sponsor-logo-box" [class.sponsor-logo-box--dark]="sponsor.dark">
                @if (sponsor.src) {
                  <img [src]="sponsor.src" [alt]="sponsor.name" class="sponsor-logo-img" />
                } @else {
                  <i class="fa-solid fa-building"></i>
                }
                <span class="small fw-semibold">{{ sponsor.name }}</span>
              </div>
            </div>
          }
        </div>

        <div class="text-center mb-4">
          <a [href]="businessZeffyUrl" target="_blank" rel="noopener" class="btn btn-navy btn-lg">
            <i class="fa-solid fa-handshake me-2"></i>Become a Corporate Sponsor
          </a>
        </div>

        <!-- id="thank-you": the $50 tier promises digital recognition on the website Thank You section -->
        <div id="thank-you" class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 mt-5">
          <h3 class="tier-row-heading h5 mb-0"><i class="fa-solid fa-people-group me-2"></i>Panthers Community Support</h3>
          <a [href]="communityZeffyUrl" target="_blank" rel="noopener" class="btn btn-outline-navy btn-sm">
            Become a Sponsor <i class="fa-solid fa-arrow-up-right-from-square fa-xs ms-1"></i>
          </a>
        </div>
        @for (row of communityRows; track row.title) {
          <div class="small fw-semibold text-muted text-uppercase mb-2">{{ row.title }}</div>
          <div class="row g-3 mb-4" [class]="row.rowCols">
            @for (box of row.boxes; track $index) {
              <div class="col">
                <div class="sample-box">
                  <i [class]="box.icon"></i>
                  <span class="fw-semibold">{{ box.name }}</span>
                </div>
              </div>
            }
          </div>
        }

        <div class="text-center mt-1">
          <a [href]="communityZeffyUrl" target="_blank" rel="noopener" class="btn btn-navy btn-lg">
            <i class="fa-solid fa-heart me-2"></i>Become a Community Support Sponsor
          </a>
        </div>
      </div>
    </section>
  `,
})
export class SponsorsSupportersComponent {
  corporateRows = CORPORATE_ROWS;
  couponCardSponsors = COUPON_CARD_SPONSORS;
  couponCardRowCols = COUPON_CARD_ROW_COLS;
  communityRows = COMMUNITY_ROWS;
  businessZeffyUrl = BUSINESS_SPONSORS_ZEFFY_URL;
  communityZeffyUrl = TOUCHDOWN_CLUB_ZEFFY_URL;
}
