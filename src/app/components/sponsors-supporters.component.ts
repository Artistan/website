import { Component } from '@angular/core';
import { BUSINESS_SPONSORS_ZEFFY_URL, TOUCHDOWN_CLUB_ZEFFY_URL } from '../site-links';

interface SampleBox {
  /** 'logo' renders a greyed-out fake corporation mark; 'placeholder' renders the your-logo/your-name slot. */
  kind: 'logo' | 'placeholder' | 'person';
  icon: string;
  name: string;
}

interface TierRow {
  title: string;
  size: 'sample-lg' | 'sample-md' | 'sample-sm' | 'sample-xs';
  rowCols: string;
  boxes: SampleBox[];
}

interface CouponCardSponsor {
  src: string;
  name: string;
  /** True when the logo's artwork is light/transparent and washes out on a white card. */
  dark?: boolean;
}

/** Obviously-fictional greyed-out corporations for the sample logo slots. */
const FAKE_LOGOS: { icon: string; name: string }[] = [
  { icon: 'fa-solid fa-car', name: 'Acme Motors' },
  { icon: 'fa-solid fa-building-columns', name: 'Summit Bank' },
  { icon: 'fa-solid fa-pizza-slice', name: 'River Valley Pizza' },
  { icon: 'fa-solid fa-tooth', name: 'North Star Dental' },
  { icon: 'fa-solid fa-house', name: 'Bluff Country Realty' },
  { icon: 'fa-solid fa-mug-hot', name: 'Med City Coffee' },
  { icon: 'fa-solid fa-tractor', name: 'Valley View Farms' },
  { icon: 'fa-solid fa-shield', name: 'Golden Field Insurance' },
  { icon: 'fa-solid fa-scale-balanced', name: 'Maple Grove Law' },
  { icon: 'fa-solid fa-microchip', name: 'Harbor Lights Tech' },
  { icon: 'fa-solid fa-hammer', name: 'Rock Solid Builders' },
  { icon: 'fa-solid fa-seedling', name: 'Green Acres Landscaping' },
];

/** Alternate greyed fake logos with your-logo-here placeholders. */
function corporateBoxes(count: number, offset: number): SampleBox[] {
  return Array.from({ length: count }, (_, i) =>
    i % 2 === 0
      ? { kind: 'logo' as const, ...FAKE_LOGOS[(offset + i / 2) % FAKE_LOGOS.length] }
      : { kind: 'placeholder' as const, icon: 'fa-solid fa-image', name: 'Your Name Here' },
  );
}

function personBoxes(count: number): SampleBox[] {
  return Array.from({ length: count }, () => ({
    kind: 'person' as const,
    icon: 'fa-solid fa-circle-user',
    name: 'Your Name Here',
  }));
}

const CORPORATE_ROWS: TierRow[] = [
  { title: 'Platinum Sponsors', size: 'sample-lg', rowCols: 'row-cols-1 row-cols-md-2', boxes: corporateBoxes(2, 0) },
  { title: 'Gold Sponsors', size: 'sample-md', rowCols: 'row-cols-2 row-cols-md-4', boxes: corporateBoxes(4, 1) },
  { title: 'Silver Sponsors', size: 'sample-sm', rowCols: 'row-cols-2 row-cols-md-4', boxes: corporateBoxes(8, 3) },
  { title: 'Bronze Sponsors', size: 'sample-xs', rowCols: 'row-cols-3 row-cols-md-6', boxes: corporateBoxes(12, 7) },
];

/** Real sponsor logos for the Coupon Card fundraiser, served from public/sponsors/coupon-card. */
const COUPON_CARD_SPONSORS: CouponCardSponsor[] = [
  { src: '/sponsors/coupon-card/Blue Lagoon.png', name: 'Blue Lagoon' },
  { src: '/sponsors/coupon-card/KwikTrip.png', name: 'KwikTrip' },
  { src: '/sponsors/coupon-card/Newts.png', name: 'Newts' },
  { src: '/sponsors/coupon-card/Purple Goat.png', name: 'Purple Goat' },
  { src: '/sponsors/coupon-card/Two Sisters.png', name: 'Two Sisters', dark: true },
  { src: '/sponsors/coupon-card/Wildwood.jpg', name: 'Wildwood' },
  { src: '/sponsors/coupon-card/Workshop.png', name: 'Workshop' },
  { src: '/sponsors/coupon-card/YellowArch.png', name: 'McDonald\'s®' },
];

const COMMUNITY_ROWS: TierRow[] = [
  { title: 'Legacy Builders', size: 'sample-lg', rowCols: 'row-cols-1 row-cols-md-2', boxes: personBoxes(2) },
  { title: 'Century Champions', size: 'sample-md', rowCols: 'row-cols-2 row-cols-md-4', boxes: personBoxes(4) },
  { title: 'Prowl Backers', size: 'sample-sm', rowCols: 'row-cols-2 row-cols-md-4', boxes: personBoxes(8) },
  { title: 'Home Field Supporters', size: 'sample-xs', rowCols: 'row-cols-2 row-cols-md-4', boxes: personBoxes(16) },
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
            Sample layout — sponsor logos and supporter names will fill these spots as the
            2026 season campaign kicks off. Your business or family could be here.
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
            @for (box of row.boxes; track $index) {
              <div class="col">
                <div class="sample-box" [class]="row.size">
                  <i [class]="box.icon"></i>
                  @if (box.kind === 'logo') {
                    <span class="fake-logo">{{ box.name }}</span>
                    <span class="small">(sample)</span>
                  } @else {
                    <span class="small">(your logo here)</span>
                    <span class="fw-semibold">{{ box.name }}</span>
                  }
                </div>
              </div>
            }
          </div>
        }

        <div class="small fw-semibold text-muted text-uppercase mb-2">Coupon Card Sponsors</div>
        <div class="row g-3 mb-4 row-cols-3 row-cols-md-6">
          @for (sponsor of couponCardSponsors; track sponsor.name) {
            <div class="col">
              <div class="sponsor-logo-box" [class.sponsor-logo-box--dark]="sponsor.dark">
                <img [src]="sponsor.src" [alt]="sponsor.name" class="sponsor-logo-img" />
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
                <div class="sample-box" [class]="row.size">
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
  communityRows = COMMUNITY_ROWS;
  businessZeffyUrl = BUSINESS_SPONSORS_ZEFFY_URL;
  communityZeffyUrl = TOUCHDOWN_CLUB_ZEFFY_URL;
}
