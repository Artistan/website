import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CONTACT_EMAIL, FACEBOOK_URL, TEAM_CALENDAR_SUBSCRIBE_URL } from './site-links';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Century Panther Touchdown Club';
  currentYear = new Date().getFullYear();
  calendarSubscribeUrl = TEAM_CALENDAR_SUBSCRIBE_URL;
  contactEmail = CONTACT_EMAIL;
  facebookUrl = FACEBOOK_URL;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const navEl = document.getElementById('pantherNav');
      if (navEl?.classList.contains('show')) {
        document.querySelector<HTMLElement>('.navbar-toggler')?.click();
      }
    });
  }

  navLinks = [
    { path: '/', label: 'Home', exact: true },
    { path: '/schedule', label: 'Schedule', exact: false },
    { path: '/program', label: 'Program', exact: false },
    { path: '/get-involved', label: 'Get Involved', exact: false },
    { path: '/sponsors', label: 'Sponsors', exact: false },
    { path: '/about', label: 'About', exact: false },
    { path: '/contact', label: 'Contact', exact: false },
  ];
}
