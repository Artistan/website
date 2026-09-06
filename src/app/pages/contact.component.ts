import { Component } from '@angular/core';
import { CONTACT_EMAIL, DONATE_URL, FACEBOOK_URL } from '../site-links';

@Component({
  selector: 'app-contact',
  template: `
    <section class="hero-panther py-5">
      <div class="container hero-inner">
        <div class="section-kicker mb-2">Contact</div>
        <h1 class="display-5 display-font mb-2">Talk to <span class="text-silver">the Touchdown Club</span></h1>
        <p class="lead mb-0">Questions, ideas, memberships, sponsorships — we answer them all.</p>
      </div>
    </section>

    <section class="py-5">
      <div class="container">
        <div class="row gy-4">
          @for (channel of channels; track channel.title) {
            <div class="col-md-6 col-lg-3">
              <div class="card card-panther h-100 text-center">
                <div class="card-body p-4">
                  <div class="icon-badge mx-auto mb-3"><i [class]="channel.icon"></i></div>
                  <h2 class="h6 fw-bold text-uppercase">{{ channel.title }}</h2>
                  <p class="small text-muted mb-3">{{ channel.text }}</p>
                  <a class="btn btn-outline-navy btn-sm" [href]="channel.href">
                    {{ channel.cta }}
                  </a>
                </div>
              </div>
            </div>
          }
        </div>

        <div class="row justify-content-center mt-5">
          <div class="col-lg-8">
            <div class="card card-panther mb-4 text-center">
              <div class="card-body p-4">
                <h2 class="h5 fw-bold mb-2">Support Panther football</h2>
                <p class="small text-muted mb-3">
                  Donations go straight back into the program — no account needed.
                </p>
                <a [href]="donateUrl" target="_blank" rel="noopener" class="btn btn-donate btn-lg">
                  <i class="fa-solid fa-heart me-2"></i>Donate Now
                </a>
              </div>
            </div>

            <div class="card card-panther">
              <div class="card-body p-4">
                <h2 class="h5 fw-bold mb-3"><i class="fa-solid fa-location-dot text-navy me-2"></i>Find us on game day</h2>
                <p class="small text-muted mb-2">
                  Look for the Touchdown Club tent at the home-side gate — memberships, spirit wear,
                  and volunteer sign-ups at every home game.
                </p>
                <p class="small text-muted mb-0">
                  Or join the monthly meeting: <strong>third Tuesday, 7:00 PM, RCHS Library.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  donateUrl = DONATE_URL;

  // One club inbox — subject lines route the conversation.
  channels = [
    {
      icon: 'fa-solid fa-envelope',
      title: 'General',
      text: 'Membership, meetings, and everything else.',
      cta: 'Email the club',
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: 'fa-solid fa-handshake',
      title: 'Sponsorship',
      text: 'Packets, tiers, and custom partnerships.',
      cta: 'Email sponsorship',
      href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Sponsorship inquiry')}`,
    },
    {
      icon: 'fa-solid fa-clipboard-list',
      title: 'Volunteering',
      text: 'Team meals, field painting, and game-day crews.',
      cta: 'Email volunteers',
      href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Volunteer signup')}`,
    },
    {
      icon: 'fa-brands fa-facebook',
      title: 'Social',
      text: 'Follow along for scores, photos, and news.',
      cta: 'Follow on Facebook',
      href: FACEBOOK_URL,
    },
  ];
}
