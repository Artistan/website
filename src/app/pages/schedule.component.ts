import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OFFICIAL_FOOTBALL_PAGE_URL, TEAM_CALENDAR_SUBSCRIBE_URL } from '../site-links';

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
          </div>
        </div>

        <img src="Schedule.svg" alt="Century Panther Football schedule" class="img-fluid rounded border shadow-sm mb-4 w-100">

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
                  Gates open 90 minutes before kickoff. The Touchdown Club runs the spirit wear
                  table at every home game — stop by and say hi, or better yet,
                  <a routerLink="/get-involved">take a shift</a>.
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
  calendarSubscribeUrl = TEAM_CALENDAR_SUBSCRIBE_URL;
  officialFootballPageUrl = OFFICIAL_FOOTBALL_PAGE_URL;
}
