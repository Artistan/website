/**
 * External links used across the site — defined once so they're easy to swap.
 *
 * NOTE: the PayPal donate URL below uses a `token=` parameter. If PayPal ever
 * reports it expired, generate a durable link (Donate button -> hosted_button_id
 * format) from the PayPal dashboard and replace it here — every Donate button
 * on the site updates automatically.
 */
export const DONATE_URL =
  'https://www.paypal.com/donate?token=_56EnR6YyAFSD_a9AR2zM_71l1B_XWonL7rLsOLxvBcz5tYXBmcMLPeDVAluFk0MBFziImI5WO8kOQkw';

/** The Touchdown Club's email for all inquiries. */
export const CONTACT_EMAIL = 'centurypantherfootball@gmail.com';

/** The club's Facebook page. */
export const FACEBOOK_URL = 'https://www.facebook.com/centurypantherfootball';

/**
 * Zeffy checkout for the Touchdown Club support tiers (from the flyer's QR
 * code). The utm_source tags checkouts that came from this website.
 */
export const TOUCHDOWN_CLUB_ZEFFY_URL =
  'https://www.zeffy.com/en-US/ticketing/century-panther-football-touchdown-club-tiered-sponsorships?utm_source=centurypantherfootball';

/** Zeffy checkout for corporate/business sponsorships. */
export const BUSINESS_SPONSORS_ZEFFY_URL =
  'https://www.zeffy.com/en-US/ticketing/century-panther-football-business-sponsorships?utm_source=centurypantherfootball';

/**
 * 2026 season opener. Sponsorship CTAs point at Zeffy checkout up until a fixed window
 * before this date, then fall back to the Contact page — a late signup needs a personal
 * check that the club can still deliver (program ad placement, signage, etc.) before
 * kickoff rather than taking a Zeffy payment it may not be able to fulfill in time.
 * Update this each year once the real season opener is set.
 */
const SEASON_KICKOFF_DATE = new Date(2026, 8, 3); // September 3, 2026 (month is 0-indexed)

function weeksBefore(date: Date, weeks: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - weeks * 7);
  return result;
}

/** Touchdown Club (community support) CTAs switch to Zeffy up to 3 weeks before kickoff. */
export const TOUCHDOWN_CLUB_MINIMUM_DONATION_DATE = weeksBefore(SEASON_KICKOFF_DATE, 3);

/** Corporate sponsorship CTAs switch to Zeffy up to 2 weeks before kickoff. */
export const BUSINESS_SPONSORS_MINIMUM_DONATION_DATE = weeksBefore(SEASON_KICKOFF_DATE, 2);

/**
 * True while Touchdown Club / corporate CTAs should point at Zeffy instead of Contact.
 * This site prerenders to static HTML at build time (see angular.json), so the snapshot a
 * crawler or pre-hydration visitor sees reflects the date at the last deploy — Angular
 * hydration re-evaluates this client-side against the real date immediately after, which
 * is what every actual visitor (this is a client-routed SPA already) ends up seeing.
 */
export const SHOW_TOUCHDOWN_CLUB_ZEFFY_LINK = new Date() < TOUCHDOWN_CLUB_MINIMUM_DONATION_DATE;
export const SHOW_BUSINESS_SPONSORS_ZEFFY_LINK = new Date() < BUSINESS_SPONSORS_MINIMUM_DONATION_DATE;

export const OFFICIAL_FOOTBALL_PAGE_URL =
  'https://www.centurypanthers.org/page/show/5060449?subseason=614343&tab=content';

/** Bound's Century varsity football team page — schedule and statistics. */
export const GOBOUND_TEAM_PAGE_URL =
  'https://www.gobound.com/mn/mshsl/fb/2026-27/rochestercentury/v#this';

/**
 * Bound's ticket listing for all Rochester Century athletics. Used as the
 * fallback when a game has no specific checkout link of its own.
 */
export const BOUND_TICKETS_URL = 'https://www.gobound.com/mn/schools/rochestercentury/tickets';

/**
 * "Add to Google Calendar" link for the team calendars — opens Google
 * Calendar and offers to subscribe to all of them.
 */
export const TEAM_CALENDAR_SUBSCRIBE_URL =
  'https://calendar.google.com/calendar/u/0/r?cid=centurypantherfb@gmail.com&cid=ir8hu0q9bllq8dpnflmlb2hihm7q4grf@import.calendar.google.com&cid=u4kkvir0hf1j2ck8m82rpktkihlq1oun@import.calendar.google.com&cid=5h21g08l5cro354sjo9k74hkd6jld7bo@import.calendar.google.com&cid=o4nklqh9qhku1uj4t98cqo2nfcp2g68f@import.calendar.google.com&cid=nb4do2pd2vergaq3jhh8043cgemelm9d@import.calendar.google.com';
