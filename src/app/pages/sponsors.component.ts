import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SponsorsSupportersComponent } from '../components/sponsors-supporters.component';
import { BUSINESS_SPONSORS_ZEFFY_URL, SHOW_BUSINESS_SPONSORS_ZEFFY_LINK } from '../site-links';

@Component({
  selector: 'app-sponsors',
  imports: [RouterLink, SponsorsSupportersComponent],
  template: `
    <section class="hero-panther py-5">
      <div class="container hero-inner">
        <div class="section-kicker mb-2">Sponsorship</div>
        <h1 class="display-5 display-font mb-2">Our <span class="text-silver">Sponsors</span></h1>
        <p class="lead mb-0">The businesses and supporters backing Panther football.</p>
      </div>
    </section>

    <!-- Sponsors & supporters first (shared with the Game Day Program page) -->
    <app-sponsors-supporters />

    <!-- Support the club -->
    <section class="py-5 bg-panther-coal">
      <div class="container text-center">
        <div class="section-kicker mb-2">Families, alumni & fans</div>
        <h2 class="display-font h1 mb-3">Want to support the team?</h2>
        <p class="mb-4 mx-auto" style="color: var(--panther-muted); max-width: 42rem;">
          Join the Touchdown Club, make a donation, or grab a volunteer shift —
          everything lives on our Get Involved page.
        </p>
        <div class="d-flex flex-wrap gap-2 justify-content-center">
          <a routerLink="/get-involved" class="btn btn-silver btn-lg">
            <i class="fa-solid fa-heart me-2"></i>Donate &amp; Get Involved
          </a>
          @if (showBusinessZeffyLink) {
            <a [href]="businessZeffyUrl" target="_blank" rel="noopener" class="btn btn-outline-silver btn-lg">
              <i class="fa-solid fa-handshake me-2"></i>Corporate sponsorships
            </a>
          } @else {
            <a routerLink="/contact" class="btn btn-outline-silver btn-lg">
              <i class="fa-solid fa-handshake me-2"></i>Corporate sponsorships
            </a>
          }
        </div>
      </div>
    </section>
  `,
})
export class SponsorsComponent {
  businessZeffyUrl = BUSINESS_SPONSORS_ZEFFY_URL;
  showBusinessZeffyLink = SHOW_BUSINESS_SPONSORS_ZEFFY_LINK;
}
