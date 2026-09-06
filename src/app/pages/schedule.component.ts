import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GOBOUND_TEAM_PAGE_URL, OFFICIAL_FOOTBALL_PAGE_URL, TEAM_CALENDAR_SUBSCRIBE_URL } from '../site-links';
import { awayMapUrl, gameTicketUrl, GameInfo, SEASON_SCHEDULE } from '../program-data';

@Component({
  selector: 'app-schedule',
  imports: [RouterLink],
  template: `
    <section class="hero-panther py-5">
      <div class="container hero-inner">
        <div class="section-kicker mb-2">Team Calendar</div>
        <h1 class="display-5 display-font mb-2">Game <span class="text-silver">Schedule</span></h1>
        <p class="lead mb-0">Pack the stands. Wear the navy &amp; silver.</p>
      </div>
    </section>

    <section class="py-5">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <p class="small text-muted mb-0" style="max-width: 34rem;">
            Games, practices, and team events straight from the Panther Football calendar.
            Subscribe to get every update on your phone automatically.
          </p>
          <div class="d-flex flex-wrap gap-2">
            <a class="btn btn-navy btn-sm" [href]="calendarSubscribeUrl" target="_blank" rel="noopener">
              <i class="fa-solid fa-calendar-plus me-1"></i>Subscribe in Google Calendar
            </a>
            <a class="btn btn-outline-navy btn-sm" [href]="officialFootballPageUrl" target="_blank" rel="noopener">
              <i class="fa-solid fa-football me-1"></i>RCHS football page
            </a>
            <a class="btn btn-outline-navy btn-sm" [href]="goBoundTeamPageUrl" target="_blank" rel="noopener"
               title="Schedule and statistics"
               aria-label="GoBound: schedule and statistics (opens in a new tab)">
              <i class="fa-solid fa-chart-line me-1"></i>GoBound &raquo;
            </a>
          </div>
        </div>

        <img src="Schedule.png" alt="Century Panther Football Schedule" class="img-fluid rounded border shadow-sm mb-4 w-100">

        <!-- One list group per game: horizontal from md up, stacked on phones -->
        <div class="schedule-list mb-5">
          <div class="list-group list-group-horizontal-md schedule-row schedule-row--head d-none d-lg-flex">
            <div class="list-group-item sched-date">Date</div>
            <div class="list-group-item sched-opponent">Opponent</div>
            <div class="list-group-item sched-site">Site</div>
            <div class="list-group-item sched-location">Location</div>
            <div class="list-group-item sched-result">Result</div>
            <div class="list-group-item sched-tickets">Tickets</div>
          </div>

          @for (game of schedule; track game.dateISO) {
            <div class="list-group list-group-horizontal-lg schedule-row">
              <div class="list-group-item sched-date text-nowrap" data-label="Date">
                <time [attr.datetime]="game.dateISO" [title]="fullDate(game)">{{ shortDate(game) }}</time>
              </div>
              <div class="list-group-item sched-opponent fw-bold" data-label="Opponent">
                <span class="d-inline-flex align-items-center gap-2">
                  <img class="schedule-logo" [src]="game.logo" alt="" aria-hidden="true" />
                  {{ game.opponent }}
                </span>
              </div>
              <div class="list-group-item sched-site" data-label="Site">
                @if (mapUrl(game); as url) {
                  <a class="badge badge-away text-decoration-none" [href]="url" target="_blank" rel="noopener"
                     [attr.aria-label]="'Map to ' + game.opponent + ' (opens in a new tab)'">
                    <i class="fa-solid fa-bus me-1"></i>Away<i class="fa-solid fa-arrow-up-right-from-square ms-1"></i>
                  </a>
                } @else {
                  <span class="badge" [class.badge-home]="game.isHome" [class.badge-away]="!game.isHome">
                    <i class="fa-solid me-1" [class.fa-house]="game.isHome" [class.fa-bus]="!game.isHome"></i>{{ game.isHome ? 'Home' : 'Away' }}
                  </span>
                }
              </div>
              <div class="list-group-item sched-location small text-muted" data-label="Location">{{ game.location }}</div>
              <div class="list-group-item sched-result text-nowrap" data-label="Result">
                @if (game.result) {
                  <span class="fw-bold me-1">{{ outcome(game) }}</span>{{ game.result.panthers }}&ndash;{{ game.result.opponent }}
                } @else {
                  <span class="text-muted">{{ game.kickoff }}</span>
                }
              </div>
              <div class="list-group-item sched-tickets" data-label="Tickets">
                @if (ticketUrl(game); as url) {
                  <a class="btn btn-navy btn-sm text-nowrap" [href]="url" target="_blank" rel="noopener"
                     [attr.aria-label]="'Buy tickets for the ' + game.opponent + ' game (opens in a new tab)'">
                    <i class="fa-solid fa-ticket me-1"></i>Tickets
                  </a>
                } @else {
                  <span class="text-muted small">&mdash;</span>
                }
              </div>
            </div>
          }
        </div>

        <div class="text-center mb-5">
          <a class="btn btn-navy btn-lg" [href]="goBoundTeamPageUrl" target="_blank" rel="noopener"
             title="Schedule and statistics"
             aria-label="Statistics and scores on GoBound (opens in a new tab)">
            <i class="fa-solid fa-chart-line me-2"></i>Statistics &amp; Scores &raquo; GoBound
          </a>
        </div>

        <!-- Live team calendar (public Google Calendar embed, agenda view) -->
        <div class="ratio ratio-4x3 rounded border shadow-sm mb-5" style="max-height: 640px;">
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&mode=AGENDA&showPrint=0&showCalendars=0&title=Century%20Panther%20Football&src=Y2VudHVyeXBhbnRoZXJmYkBnbWFpbC5jb20&src=aXI4aHUwcTlibGxxOGRwbmZsbWxiMmhpaG03cTRncmZAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=dTRra3ZpcjBoZjFqMmNrOG04MnJwa3RraWhscTFvdW5AaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=NWgyMWcwOGw1Y3JvMzU0c2pvOWs3NGhrZDZqbGQ3Ym9AaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=bzRua2xxaDlxaGt1MXVqNHQ5OGNxbzJuZmNwMmc2OGZAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20&src=bmI0ZG8ycGQydmVyZ2FxM2poaDgwNDNjZ2VtZWxtOWRAaW1wb3J0LmNhbGVuZGFyLmdvb2dsZS5jb20"
            style="border: 0;"
            title="Century Panther Football team calendar"
            loading="lazy">
          </iframe>
        </div>

        <div class="row gy-4">
          <div class="col-md-6">
            <div class="card card-panther h-100">
              <div class="card-body">
                <h2 class="h5 fw-bold"><i class="fa-solid fa-house text-navy me-2"></i>Home game day</h2>
                <p class="small text-muted mb-0">
                  Gates open 90 minutes before kickoff. The Booster Club runs the spirit wear
                  table at most home games.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card card-panther h-100">
              <div class="card-body">
                <h2 class="h5 fw-bold"><i class="fa-solid fa-bus text-navy me-2"></i>Away game caravans</h2>
                <p class="small text-muted mb-0">
                  Panthers travel well. Watch club announcements for fan bus sign-ups and caravan
                  meet-up times for road games.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ScheduleComponent {
  schedule = SEASON_SCHEDULE;

  mapUrl = awayMapUrl;
  ticketUrl = gameTicketUrl;

  /** "Thu 9/03" — the full date rides along in the title attribute. */
  shortDate(game: GameInfo): string {
    const [, month, day] = game.dateISO.split('-');
    const weekday = new Date(`${game.dateISO}T00:00:00`).toLocaleDateString('en-US', {
      weekday: 'short',
    });
    return `${weekday} ${+month}/${day}`;
  }

  /** Parsed as local midnight — a bare `new Date(iso)` is UTC and renders a day early. */
  fullDate(game: GameInfo): string {
    return new Date(`${game.dateISO}T00:00:00`).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  outcome(game: GameInfo): string {
    if (!game.result) return '';
    if (game.result.panthers > game.result.opponent) return 'W';
    return game.result.panthers < game.result.opponent ? 'L' : 'T';
  }

  calendarSubscribeUrl = TEAM_CALENDAR_SUBSCRIBE_URL;
  goBoundTeamPageUrl = GOBOUND_TEAM_PAGE_URL;
  officialFootballPageUrl = OFFICIAL_FOOTBALL_PAGE_URL;
}
