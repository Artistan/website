import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  BUSINESS_SPONSORS_MINIMUM_DONATION_DATE,
  BUSINESS_SPONSORS_ZEFFY_URL,
  DONATE_URL,
  SHOW_BUSINESS_SPONSORS_ZEFFY_LINK,
  SHOW_TOUCHDOWN_CLUB_ZEFFY_LINK,
  TOUCHDOWN_CLUB_MINIMUM_DONATION_DATE,
  TOUCHDOWN_CLUB_ZEFFY_URL,
} from '../site-links';
import { CORPORATE_COMPARISON, CORPORATE_SPONSOR_TIERS, TOUCHDOWN_CLUB_INTRO, TOUCHDOWN_CLUB_TIERS } from '../touchdown-club';

@Component({
  selector: 'app-get-involved',
  imports: [RouterLink, DatePipe],
  template: `
    <section class="hero-panther py-5">
      <div class="container hero-inner">
        <div class="section-kicker mb-2">Get Involved</div>
        <h1 class="display-5 display-font mb-2">Join the <span class="text-silver">Panther Family</span></h1>
        <p class="lead mb-0">Membership, volunteering, and every way to back the navy &amp; silver.</p>
      </div>
    </section>

    <!-- Touchdown Club support tiers -->
    <section class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <div class="section-kicker mb-2">Touchdown Club</div>
          <h2 class="display-font h1">Panthers Community Support Tiers</h2>
          <p class="text-muted mx-auto" style="max-width: 46rem;">{{ touchdownClubIntro }}</p>
          <p class="small fw-semibold text-navy mb-0">
            Sponsor before {{ communityDeadlineDate | date: 'longDate' }} for these incentives.
          </p>
        </div>
        @if (!showCommunityZeffyLink) {
          <div class="alert alert-warning small" role="alert">
            <i class="fa-solid fa-triangle-exclamation me-2"></i>
            <strong>Deadline Expired</strong> Additional Incentives for Sponsorships may not be
            available this season. - Contact us for sponsorship opportunities.
          </div>
        }
        <div class="row gy-4 justify-content-center">
          @for (tier of tiers; track tier.name) {
            <div class="col-md-6 col-lg-3">
              <div class="card tier-card h-100 text-center">
                <div class="card-body p-4 d-flex flex-column">
                  <div class="icon-badge mx-auto mb-3"><i [class]="tier.icon"></i></div>
                  <h3 class="h5 fw-bold display-font">{{ tier.name }}</h3>
                  <div class="display-6 fw-bold my-2">\${{ tier.price }}</div>
                  <ul class="list-unstyled small text-start flex-grow-1">
                    @for (perk of tier.perks; track perk) {
                      <li class="mb-2"><i class="fa-solid fa-circle-check text-navy me-2"></i>{{ perk }}</li>
                    }
                  </ul>
                  @if (showCommunityZeffyLink) {
                    <a [href]="communityZeffyUrl" target="_blank" rel="noopener" class="btn btn-navy w-100 mt-2">
                      Join for \${{ tier.price }}
                    </a>
                  } @else {
                    <a routerLink="/contact" class="btn btn-navy w-100 mt-2">Contact Us</a>
                  }
                </div>
              </div>
            </div>
          }
        </div>
        <div class="text-center mt-4">
          @if (showCommunityZeffyLink) {
            <a [href]="communityZeffyUrl" target="_blank" rel="noopener" class="btn btn-navy btn-lg">
              <i class="fa-solid fa-heart me-2"></i>Become a Community Support Sponsor
            </a>
          } @else {
            <a routerLink="/contact" class="btn btn-navy btn-lg">
              <i class="fa-solid fa-heart me-2"></i>Become a Community Support Sponsor
            </a>
          }
        </div>
        @if (showCommunityZeffyLink) {
          <p class="small text-muted text-center mt-3 mb-0">
            Tier checkout runs through Zeffy, our secure fundraising platform.
            The Century Panther Touchdown Club is an official 501(c)(3) non-profit organization —
            at the time of your donation you can opt in to receive a receipt for your generous donation.
            Questions? <a routerLink="/contact">Contact the club</a>.
          </p>
        } @else {
          <p class="small text-muted text-center mt-3 mb-0">
            The Century Panther Touchdown Club is an official 501(c)(3) non-profit organization —
            reach out and we'll get your tier set up, and you can opt in to receive a receipt
            for your generous donation.
          </p>
        }
      </div>
    </section>

    <!-- Corporate sponsors -->
    <section class="py-5 bg-panther-silver">
      <div class="container text-center">
        <div class="section-kicker mb-2">Businesses</div>
        <h2 class="display-font h1 mb-3">Corporate Sponsors</h2>
        <p class="mx-auto mb-4" style="max-width: 44rem;">
          Put your business behind Panther football with a season sponsorship — stadium
          visibility, program placement, and a community that shops its sponsors.
        </p>
        <p class="small fw-semibold text-navy">
          Sponsor before {{ businessDeadlineDate | date: 'longDate' }} for these incentives.
        </p>
        @if (!showBusinessZeffyLink) {
          <div class="alert alert-warning small text-start" role="alert">
            <i class="fa-solid fa-triangle-exclamation me-2"></i>
            <strong>Deadline Expired</strong> Additional Incentives for Sponsorships may not be
            available this season. - Contact us for sponsorship opportunities.
          </div>
        }
        <div class="row gy-4 justify-content-center mb-4">
          @for (tier of corporateTiers; track tier.name) {
            <div class="col-md-6 col-lg-3">
              <div class="card card-panther bg-panther-coal h-100 text-center">
                <div class="card-body p-4 d-flex flex-column">
                  <div class="icon-badge mx-auto mb-3"><i [class]="tier.icon"></i></div>
                  <h3 class="h5 fw-bold display-font mb-1">{{ tier.name }}</h3>
                  <div class="fs-4 fw-bold text-silver">\${{ tier.price.toLocaleString() }}</div>
                  <div class="small mb-3" style="color: var(--panther-muted);">per season</div>
                  <ul class="list-unstyled small text-start flex-grow-1 mb-0">
                    @for (perk of tier.perks; track perk) {
                      <li class="mb-2"><i class="fa-solid fa-circle-check text-silver me-2"></i>{{ perk }}</li>
                    }
                  </ul>
                </div>
              </div>
            </div>
          }
        </div>
        <div class="d-flex flex-wrap gap-2 justify-content-center">
          @if (showBusinessZeffyLink) {
            <a [href]="businessZeffyUrl" target="_blank" rel="noopener" class="btn btn-navy btn-lg">
              <i class="fa-solid fa-handshake me-2"></i>Become a corporate sponsor
            </a>
          } @else {
            <a routerLink="/contact" class="btn btn-navy btn-lg">
              <i class="fa-solid fa-handshake me-2"></i>Become a corporate sponsor
            </a>
          }
          <a routerLink="/contact" class="btn btn-outline-navy btn-lg">
            <i class="fa-solid fa-envelope me-2"></i>Ask about benefits
          </a>
        </div>
        <p class="small text-center mt-3 mb-1">
          Interested in category exclusivity, co-branded merchandise, and premium activation?
          <a routerLink="/contact" class="fw-semibold">Ask about Panther Platinum Plus</a>.
        </p>
        @if (showBusinessZeffyLink) {
          <p class="small text-center mb-0">
            Sponsorships support an official 501(c)(3) non-profit organization — opt in at checkout
            to receive a receipt for your contribution.
          </p>
        } @else {
          <p class="small text-center mb-0">
            Sponsorships support an official 501(c)(3) non-profit organization — a receipt for
            your contribution is available on request.
          </p>
        }
      </div>
    </section>

    <!-- Corporate package comparison -->
    <section class="py-5 bg-panther-coal">
      <div class="container">
        <div class="text-center mb-4">
          <div class="section-kicker mb-2">Compare packages</div>
          <h2 class="display-font h1">Corporate Sponsorship Benefits</h2>
          <p class="mx-auto" style="color: var(--panther-muted); max-width: 42rem;">
            Every tier puts your brand in front of Panther Nation — here's what each
            level includes across the season.
          </p>
        </div>
        <div class="table-responsive">
          <table class="table table-schedule table-striped align-middle bg-white rounded overflow-hidden">
            <thead>
              <tr>
                <th scope="col">Benefit</th>
                <th scope="col">Platinum $4,000</th>
                <th scope="col">Gold $2,500</th>
                <th scope="col">Silver $1,500</th>
                <th scope="col">Bronze $500</th>
                <th scope="col">Iron $250</th>
              </tr>
            </thead>
            <tbody>
              @for (row of comparison; track row.benefit) {
                <tr>
                  <td class="fw-semibold">{{ row.benefit }}</td>
                  <td>{{ row.platinum }}</td>
                  <td>{{ row.gold }}</td>
                  <td>{{ row.silver }}</td>
                  <td>{{ row.bronze }}</td>
                  <td>{{ row.iron }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="text-center mt-4">
          @if (showBusinessZeffyLink) {
            <a [href]="businessZeffyUrl" target="_blank" rel="noopener" class="btn btn-silver btn-lg">
              <i class="fa-solid fa-handshake me-2"></i>Choose your package
            </a>
          } @else {
            <a routerLink="/contact" class="btn btn-silver btn-lg">
              <i class="fa-solid fa-handshake me-2"></i>Choose your package
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Specialty & in-kind partnerships -->
    <section class="py-5">
      <div class="container">
        <div class="row align-items-center gy-4">
          <div class="col-lg-6">
            <div class="section-kicker mb-2">Specialty partnerships</div>
            <h2 class="display-font h2 mb-3">Panther Fuel Partner</h2>
            <p class="text-muted">
              Not every sponsorship is a banner. Our Panther Fuel partnership keeps
              athletes fed and the community fired up — and it can be built from cash,
              in-kind product, or a mix that fits your business.
            </p>
            <ul class="list-unstyled">
              <li class="mb-2"><i class="fa-solid fa-fire text-navy me-2"></i>Home-game community tailgates</li>
              <li class="mb-2"><i class="fa-solid fa-utensils text-navy me-2"></i>Weekly pre-game team pasta feeds</li>
              <li class="mb-2"><i class="fa-solid fa-apple-whole text-navy me-2"></i>Healthy snack packs for away-game travel</li>
            </ul>
            <p class="small text-muted">
              Partners get logo placement, game-day announcements, social media shout-outs,
              and recognition in team communications all season long.
            </p>
            <a routerLink="/contact" class="btn btn-navy">
              <i class="fa-solid fa-envelope me-2"></i>Build a partnership with us
            </a>
          </div>
          <div class="col-lg-6">
            <div class="card card-panther">
              <div class="card-body p-4">
                <h3 class="h5 fw-bold mb-3"><i class="fa-solid fa-basket-shopping text-navy me-2"></i>Perfect for</h3>
                <p class="small text-muted mb-2">
                  Grocery stores, restaurants, and food suppliers who want repeat, meaningful
                  exposure across the whole season — from the tailgate lot to the team bus.
                </p>
                <p class="small text-muted mb-0">
                  Flexible scope: sponsor the full season or a single piece, with contributions
                  sized to your capacity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Specialty & in-kind partnerships: 5th Quarter -->
    <section class="py-5">
      <div class="container">
        <div class="row align-items-center gy-4">
          <div class="col-lg-6">
            <div class="section-kicker mb-2">Specialty partnerships</div>
            <h2 class="display-font h2 mb-3">5th Quarter Sponsor</h2>
            <p class="text-muted">
              The game doesn't end at the final whistle. Our 5th Quarter partnership
              sponsors the official post-game gathering spot where players, families,
              and fans keep Friday night going.
            </p>
            <ul class="list-unstyled">
              <li class="mb-2"><i class="fa-solid fa-mug-hot text-navy me-2"></i>Host the official post-game gathering</li>
              <li class="mb-2"><i class="fa-solid fa-bullhorn text-navy me-2"></i>PA shout-out and program recognition</li>
              <li class="mb-2"><i class="fa-solid fa-share-nodes text-navy me-2"></i>Social media shout-outs all season long</li>
            </ul>
            <p class="small text-muted">
              Partners get logo placement, game-day announcements, social media shout-outs,
              and recognition in team communications all season long.
            </p>
            <a routerLink="/contact" class="btn btn-navy">
              <i class="fa-solid fa-envelope me-2"></i>Ask about the 5th Quarter
            </a>
          </div>
          <div class="col-lg-6">
            <div class="card card-panther">
              <div class="card-body p-4">
                <h3 class="h5 fw-bold mb-3"><i class="fa-solid fa-store text-navy me-2"></i>Perfect for</h3>
                <p class="small text-muted mb-2">
                  Restaurants, bars, and venues that want to be where Panther Nation
                  heads after the game.
                </p>
                <p class="small text-muted mb-0">
                  Flexible scope: sponsor the full season or select home games.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Volunteer roles -->
    <section class="py-5 bg-panther-coal">
      <div class="container">
        <div class="text-center mb-5">
          <div class="section-kicker mb-2">Volunteer</div>
          <h2 class="display-font h1">Many hands, light work</h2>
          <p style="color: var(--panther-muted);">A couple hours a season makes a real difference. No experience needed — we'll show you the ropes.</p>
        </div>
        <div class="row gy-4">
          @for (role of volunteerRoles; track role.title) {
            <div class="col-md-6 col-lg-4">
              <div class="card card-panther bg-panther-dark h-100">
                <div class="card-body">
                  <div class="icon-badge mb-3"><i [class]="role.icon"></i></div>
                  <h3 class="h5 fw-bold">{{ role.title }}</h3>
                  <p class="small mb-0" style="color: var(--panther-muted);">{{ role.text }}</p>
                </div>
              </div>
            </div>
          }
        </div>
        <div class="text-center mt-5">
          <a routerLink="/contact" class="btn btn-silver btn-lg">
            <i class="fa-solid fa-clipboard-list me-2"></i>Sign up to volunteer
          </a>
        </div>
      </div>
    </section>

    <!-- Donate -->
    <section class="py-5">
      <div class="container text-center">
        <div class="section-kicker mb-2">Prefer to give directly?</div>
        <h2 class="display-font h1 mb-3">Donate to the club</h2>
        <p class="text-muted mx-auto mb-4" style="max-width: 40rem;">
          No time for shifts or meetings? A one-time donation through PayPal goes straight
          to equipment, team meals, and scholarships for Panther players.
        </p>
        <a [href]="donateUrl" target="_blank" rel="noopener" class="btn btn-navy btn-lg">
          <i class="fa-solid fa-heart me-2"></i>Donate with PayPal
        </a>
        <p class="small text-muted mt-3 mb-0">
          The Century Panther Touchdown Club is an official 501(c)(3) non-profit organization.
          At the time of your donation you can opt in to receive a receipt for your generous donation!
        </p>
      </div>
    </section>
  `,
})
export class GetInvolvedComponent {
  donateUrl = DONATE_URL;
  businessZeffyUrl = BUSINESS_SPONSORS_ZEFFY_URL;
  communityZeffyUrl = TOUCHDOWN_CLUB_ZEFFY_URL;
  showBusinessZeffyLink = SHOW_BUSINESS_SPONSORS_ZEFFY_LINK;
  showCommunityZeffyLink = SHOW_TOUCHDOWN_CLUB_ZEFFY_LINK;
  businessDeadlineDate = BUSINESS_SPONSORS_MINIMUM_DONATION_DATE;
  communityDeadlineDate = TOUCHDOWN_CLUB_MINIMUM_DONATION_DATE;
  touchdownClubIntro = TOUCHDOWN_CLUB_INTRO;
  tiers = TOUCHDOWN_CLUB_TIERS;
  corporateTiers = CORPORATE_SPONSOR_TIERS;
  comparison = CORPORATE_COMPARISON;

  volunteerRoles = [
    {
      icon: 'fa-solid fa-utensils',
      title: 'Team meal squad',
      text: 'Help plan, cook, or host weekly pre-game team meals for 100+ hungry Panthers.',
    },
    {
      icon: 'fa-solid fa-paint-roller',
      title: 'Field Painting Crew',
      text: 'Stripe the lines, paint the hashes, and lay down the Panther midfield before home games.',
    },
    {
      icon: 'fa-solid fa-truck',
      title: 'Logistics & setup',
      text: 'Haul equipment, set up for events, and tear down after. Trucks and muscles welcome.',
    },
  ];
}
