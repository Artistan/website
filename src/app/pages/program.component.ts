import { Component, computed, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SponsorsSupportersComponent } from '../components/sponsors-supporters.component';
import {
  awayMapUrl,
  centuryRecord,
  COACHES,
  GAME_EVENTS,
  gameTicketUrl,
  getFeaturedGame,
  matchupTitle,
  Player,
  ROSTER,
  TEAM_COLOR,
  TEAM_LOGO,
  TEAM_NAME,
} from '../program-data';

type SortKey = 'number' | 'name' | 'position' | 'grade';

/** class order: seniors first when descending through the season roster */
const GRADE_RANK: Record<string, number> = { 'Sr.': 4, 'Jr.': 3, 'So.': 2, 'Fr.': 1 };

@Component({
  selector: 'app-program',
  imports: [SponsorsSupportersComponent],
  template: `
    <section class="hero-panther py-5">
      <div class="container hero-inner">
        <div class="section-kicker mb-2">Game Day</div>
        <h1 class="display-5 display-font mb-2">Game Day <span class="text-silver">Program</span></h1>
        <p class="lead mb-0">Your digital program — the team, the coaches, tonight's theme, and the supporters who make it happen.</p>
      </div>
    </section>

    <!-- This week's game -->
    <section class="py-5">
      <div class="container">
        <div class="text-center mb-3">
          <div class="section-kicker mb-1">This week</div>
          <h2 class="display-font h4 mb-0">{{ matchup }}</h2>
        </div>

        <div class="card card-panther matchup-panel">
          <div class="card-body p-0">
            <div class="matchup-band matchup-band--left" [style.--band-color]="matchupTeams[0].color">
              <div class="matchup-band__shape">
                <div class="matchup-band__cell">
                  <img class="matchup-band__logo" [src]="matchupTeams[0].logo" alt="" aria-hidden="true">
                </div>
              </div>
            </div>
            <div class="matchup-band matchup-band--right" [style.--band-color]="matchupTeams[1].color">
              <div class="matchup-band__shape">
                <div class="matchup-band__cell">
                  <img class="matchup-band__logo" [src]="matchupTeams[1].logo" alt="" aria-hidden="true">
                </div>
              </div>
            </div>

            <div class="matchup-center py-3">
              <div class="row">
                <div class="col-6 text-end">
                  <img class="matchup-logo mb-2" [src]="matchupTeams[0].logo" [alt]="matchupTeams[0].name + ' logo'">
                  <div class="display-font matchup-team-name fw-bold mb-1">{{ matchupTeams[0].name }}</div>
                  <div class="small text-muted">{{ matchupTeams[0].record }}</div>
                </div>
                <div class="col-6 text-start">
                  <img class="matchup-logo mb-2" [src]="matchupTeams[1].logo" [alt]="matchupTeams[1].name + ' logo'">
                  <div class="display-font matchup-team-name fw-bold mb-1">{{ matchupTeams[1].name }}</div>
                  <div class="small text-muted">{{ matchupTeams[1].record }}</div>
                </div>
              </div>

              <div class="text-center text-uppercase small text-muted my-3">
                <div class="fw-bold">{{ game.kickoff }} CT</div>
                <div>{{ shortDate }}</div>
              </div>

              <div class="text-center text-uppercase small text-muted mx-auto" style="max-width: 90%;">
                {{ venue }}
              </div>

            </div>
          </div>
        </div>

        <div class="d-flex flex-wrap align-items-center gap-2 justify-content-center mt-3">
          @if (mapUrl; as url) {
            <a class="badge badge-away fs-6 px-3 py-2 text-decoration-none" [href]="url" target="_blank" rel="noopener"
               [attr.aria-label]="'Map to ' + game.opponent + ' (opens in a new tab)'">
              <i class="fa-solid fa-bus me-1"></i>Away Game<i class="fa-solid fa-arrow-up-right-from-square ms-1"></i>
            </a>
          } @else {
            <span class="badge fs-6 px-3 py-2" [class.badge-home]="game.isHome" [class.badge-away]="!game.isHome">
              <i class="fa-solid me-1" [class.fa-house]="game.isHome" [class.fa-bus]="!game.isHome"></i>{{ game.isHome ? 'Home Game' : 'Away Game' }}
            </span>
          }
          @if (ticketUrl; as url) {
            <a class="btn btn-navy btn-sm" [href]="url" target="_blank" rel="noopener"
               [attr.aria-label]="'Buy tickets for the ' + game.opponent + ' game (opens in a new tab)'">
              <i class="fa-solid fa-ticket me-1"></i>Tickets
            </a>
          }
        </div>

        @if (game.isHome) {
          <div class="row gy-4 mt-1">
            @for (event of events; track event.title) {
              <div class="col-md-4">
                <div class="card card-panther h-100">
                  <div class="card-body">
                    <div class="icon-badge mb-3"><i [class]="event.icon"></i></div>
                    <h3 class="h6 fw-bold">{{ event.title }}</h3>
                    <p class="small text-muted mb-0">{{ event.text }}</p>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else if (mapEmbedUrl) {
          <div class="card card-panther mt-4">
            <div class="card-body">
              <h3 class="h6 fw-bold mb-3">
                <i class="fa-solid fa-map-location-dot text-navy me-2"></i>Getting to {{ game.opponent }}
              </h3>
              <div class="ratio ratio-21x9 rounded border">
                <iframe
                  [src]="mapEmbedUrl"
                  style="border: 0;"
                  [title]="game.opponent + ' football field map'"
                  loading="lazy">
                </iframe>
              </div>
            </div>
          </div>
        }
      </div>
    </section>

    <!-- Roster -->
    <section class="py-5 bg-panther-coal">
      <div class="container">
        <div class="text-center mb-4">
          <div class="section-kicker mb-2">The team</div>
          <h2 class="display-font h1">2026 Panthers Roster</h2>
        </div>
        <div class="row justify-content-center mb-3">
          <div class="col-md-6 col-lg-4">
            <div class="input-group">
              <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
              <input type="search" class="form-control" placeholder="Search name, position, number..."
                     aria-label="Search the roster"
                     [value]="search()" (input)="search.set($any($event.target).value)">
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-schedule table-striped align-middle bg-white rounded overflow-hidden">
            <thead>
              <tr>
                @for (col of columns; track col.key) {
                  <th scope="col" class="sortable" role="button" tabindex="0"
                      [attr.aria-sort]="sortKey() === col.key ? (sortDir() === 1 ? 'ascending' : 'descending') : null"
                      (click)="sortBy(col.key)" (keydown.enter)="sortBy(col.key)">
                    {{ col.label }}
                    <i class="fa-solid ms-1"
                       [class]="sortKey() === col.key ? (sortDir() === 1 ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'"
                       [style.opacity]="sortKey() === col.key ? 1 : 0.4"></i>
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              @for (player of visibleRoster(); track player.name + player.number) {
                <tr>
                  <td class="fw-bold">{{ player.number }}</td>
                  <td>{{ player.name }}</td>
                  <td>{{ player.position }}</td>
                  <td>{{ player.grade }}</td>
                </tr>
              } @empty {
                <tr><td colspan="4" class="text-center text-muted py-4">No players match "{{ search() }}"</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Coaching staff -->
    <section class="py-5">
      <div class="container">
        <div class="text-center mb-4">
          <div class="section-kicker mb-2">Sideline leaders</div>
          <h2 class="display-font h1">Coaching Staff</h2>
        </div>
        <div class="row gy-4 justify-content-center">
          @for (coach of coaches; track coach.name) {
            <div class="col-6 col-md-4">
              <div class="card card-panther h-100 text-center">
                <div class="card-body p-3">
                  @if (coach.photo) {
                    <img
                      class="coach-photo mx-auto mb-2"
                      [src]="coach.photo"
                      [alt]="coach.name + ', ' + coach.role"
                      width="72"
                      height="72"
                      loading="lazy"
                    />
                  } @else {
                    <div class="icon-badge mx-auto mb-2"><i class="fa-solid fa-clipboard"></i></div>
                  }
                  <div class="fw-bold small">{{ coach.name }}</div>
                  <div class="small text-muted">{{ coach.role }}</div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Sponsors & supporters (shared with the Sponsors page) -->
    <app-sponsors-supporters />
  `,
})
export class ProgramComponent {
  game = getFeaturedGame();
  events = GAME_EVENTS;
  coaches = COACHES;
  mapEmbedUrl: SafeResourceUrl | null = null;
  mapUrl = awayMapUrl(this.game);
  ticketUrl = gameTicketUrl(this.game);
  matchup = matchupTitle(this.game);

  /** TeamA first, TeamB second — we're the visitor away, the host at home. */
  matchupTeams = (() => {
    const century = {
      name: TEAM_NAME,
      logo: TEAM_LOGO,
      color: TEAM_COLOR,
      record: `Varsity (${centuryRecord()})`,
    };
    // Opponent records are not in our data, so theirs stays unqualified.
    const opponent = {
      name: this.game.opponent,
      logo: this.game.logo,
      color: this.game.color,
      record: 'Varsity',
    };
    return this.game.isHome ? [opponent, century] : [century, opponent];
  })();

  /** Split off the ISO string — `new Date(iso)` is UTC and lands a day early. */
  shortDate = (() => {
    const [, month, day] = this.game.dateISO.split('-');
    return `${+month}/${+day}`;
  })();

  /** Venue only; `location` carries an "At " prefix for away games. */
  venue = this.game.location.replace(/^At /, '');

  constructor(private sanitizer: DomSanitizer) {
    if (!this.game.isHome && this.game.mapQuery) {
      const src = `https://www.google.com/maps?q=${encodeURIComponent(this.game.mapQuery)}&output=embed`;
      this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    }
  }

  columns: { key: SortKey; label: string }[] = [
    { key: 'number', label: '#' },
    { key: 'name', label: 'Name' },
    { key: 'position', label: 'Position' },
    { key: 'grade', label: 'Grade' },
  ];

  search = signal('');
  sortKey = signal<SortKey>('number');
  sortDir = signal<1 | -1>(1);

  visibleRoster = computed(() => {
    const term = this.search().trim().toLowerCase();
    const key = this.sortKey();
    const dir = this.sortDir();
    const filtered = ROSTER.filter(
      (p) =>
        !term ||
        [String(p.number), p.name, p.position, p.grade].some((v) => v.toLowerCase().includes(term)),
    );
    return filtered.sort((a, b) => this.compare(a, b, key) * dir);
  });

  sortBy(key: SortKey): void {
    if (this.sortKey() === key) {
      this.sortDir.update((d) => (d === 1 ? -1 : 1));
    } else {
      this.sortKey.set(key);
      this.sortDir.set(1);
    }
  }

  private compare(a: Player, b: Player, key: SortKey): number {
    switch (key) {
      case 'number':
        return Number(a.number) - Number(b.number);
      case 'grade':
        return (GRADE_RANK[b.grade] ?? 0) - (GRADE_RANK[a.grade] ?? 0) || a.name.localeCompare(b.name);
      default:
        return String(a[key]).localeCompare(String(b[key]));
    }
  }
}
