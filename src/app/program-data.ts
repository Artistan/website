/**
 * Game Day Program content — everything on the /program page is driven from
 * this file so it can be updated each week without touching page markup.
 *
 * ROSTER, COACHES, and SEASON_SCHEDULE all reflect real 2026 data
 * (sources: public/Schedule.png, docs/coaches.png).
 */

import { BOUND_TICKETS_URL } from './site-links';

export interface GameInfo {
  opponent: string;
  /** ISO date (YYYY-MM-DD) used to compute the featured "this week" game. */
  dateISO: string;
  date: string;
  kickoff: string;
  location: string;
  isHome: boolean;
  /** Google Maps search query for the opponent's football field (away games only). */
  mapQuery?: string;
  /** Opponent logo (colour), sourced from Bound. */
  logo: string;
  /** Opponent's primary colour, used for the matchup panel's angled band. */
  color: string;
  /** Final score, once the game has been played. Absent means not yet played. */
  result?: { panthers: number; opponent: number };
  /**
   * Bound checkout link. Only the away games are sold through Bound — Century's
   * home football games are not listed there, so those entries have no URL.
   */
  ticketUrl?: string;
}

export interface GameEvent {
  icon: string;
  title: string;
  text: string;
}

export interface Coach {
  name: string;
  role: string;
  /** Path under public/ — headshot cropped from docs/coaches.png. */
  photo?: string;
}

export interface Player {
  number: number | string;
  name: string;
  position: string;
  grade: string;
}

/** Set to true once the real roster/staff below has been filled in. */
export const PROGRAM_DATA_IS_PLACEHOLDER = false;

/** 2026 varsity schedule, sourced from public/Schedule.png. */
export const SEASON_SCHEDULE: GameInfo[] = [
  {
    opponent: 'Tartan',
    dateISO: '2026-09-03',
    date: 'Sept 3, 2026',
    kickoff: '6:30 PM',
    location: 'At Tartan High School Tartan Stadium',
    isHome: false,
    mapQuery: 'Tartan High School Tartan Stadium, Oakdale, MN',
    logo: 'opponent-logos/tartan.png',
    color: '#1053A9',
    result: { panthers: 25, opponent: 0 },
  },
  {
    opponent: 'Chaska',
    dateISO: '2026-09-11',
    date: 'Sept 11, 2026',
    kickoff: '7:00 PM',
    location: 'Rochester Century High School Panther Stadium',
    isHome: true,
    logo: 'opponent-logos/chaska.png',
    color: '#452E89',
  },
  {
    opponent: 'Owatonna',
    dateISO: '2026-09-18',
    date: 'Sept 18, 2026',
    kickoff: '7:00 PM',
    location: 'At Owatonna High School OHS Stadium - Federated Field',
    isHome: false,
    mapQuery: 'Owatonna High School OHS Stadium - Federated Field, Owatonna, MN',
    logo: 'opponent-logos/owatonna.png',
    color: '#004F9E',
    ticketUrl: 'https://tickets.gobound.com/tickets/events/h202604290904460275babb4a57abb41/checkout',
  },
  {
    opponent: 'Rochester John Marshall',
    dateISO: '2026-09-25',
    date: 'Sept 25, 2026',
    kickoff: '5:30 PM',
    location: 'At Rochester John Marshall High School John Drews Field',
    isHome: false,
    mapQuery: 'Rochester John Marshall High School John Drews Field, Rochester, MN',
    logo: 'opponent-logos/roch-jm.png',
    color: '#000000',
    ticketUrl: 'https://tickets.gobound.com/tickets/events/h20260603045810701c8c1421f89f540/checkout',
  },
  {
    opponent: 'Rochester Mayo',
    dateISO: '2026-10-02',
    date: 'Oct 2, 2026',
    kickoff: '5:30 PM',
    location: 'At Rochester Mayo High School Whitney Stadium',
    isHome: false,
    mapQuery: 'Rochester Mayo High School Whitney Stadium, Rochester, MN',
    logo: 'opponent-logos/roch-mayo.png',
    color: '#1F5103',
    ticketUrl: 'https://tickets.gobound.com/tickets/events/h202605070915421951d1f425bee0c4b/checkout',
  },
  {
    opponent: 'New Prague',
    dateISO: '2026-10-09',
    date: 'Oct 9, 2026',
    kickoff: '7:00 PM',
    location: 'Rochester Century High School Panther Stadium',
    isHome: true,
    logo: 'opponent-logos/new-prague.png',
    color: '#7C082B',
  },
  {
    opponent: 'Northfield',
    dateISO: '2026-10-14',
    date: 'Oct 14, 2026',
    kickoff: '7:00 PM',
    location: 'At Northfield High School Memorial Field',
    isHome: false,
    mapQuery: 'Northfield High School Memorial Field, Northfield, MN',
    logo: 'opponent-logos/northfield.png',
    color: '#711831',
    ticketUrl: 'https://tickets.gobound.com/tickets/events/h202605200759188910ee21248543d42/checkout',
  },
  {
    opponent: 'Winona',
    dateISO: '2026-10-21',
    date: 'Oct 21, 2026',
    kickoff: '7:00 PM',
    location: 'Rochester Century High School Panther Stadium',
    isHome: true,
    logo: 'opponent-logos/winona.png',
    color: '#EE4B25',
  },
];

/**
 * The game featured as "this week": the next game whose date hasn't fully
 * passed yet (so it stays featured through game day itself), or the season
 * finale once every game has been played.
 */
/**
 * Google Maps link to an away game's field. Null for home games, and for any away
 * game missing `mapQuery` — callers fall back to a plain, unlinked badge.
 */
/**
 * Ticket link for a game — its own Bound checkout when it has one, otherwise the
 * school's general Bound tickets page. Null once the game has been played.
 */
export function gameTicketUrl(game: GameInfo): string | null {
  if (game.result) return null;
  return game.ticketUrl ?? BOUND_TICKETS_URL;
}

/** Our own program name, as it should read in a "TeamA @ TeamB" matchup. */
export const TEAM_NAME = 'Rochester Century';

/** Century's own logo and colour, the constant half of every matchup. */
export const TEAM_LOGO = 'opponent-logos/roch-century.png';
export const TEAM_COLOR = '#13204D';

/** Century's varsity record so far, derived from the games that have a result. */
export function centuryRecord(): string {
  let wins = 0;
  let losses = 0;
  let ties = 0;
  for (const game of SEASON_SCHEDULE) {
    if (!game.result) continue;
    if (game.result.panthers > game.result.opponent) wins++;
    else if (game.result.panthers < game.result.opponent) losses++;
    else ties++;
  }
  return ties ? `${wins}-${losses}-${ties}` : `${wins}-${losses}`;
}

/** Always reads "TeamA @ TeamB" — we visit on away games and host at home. */
export function matchupTitle(game: GameInfo): string {
  return game.isHome ? `${game.opponent} @ ${TEAM_NAME}` : `${TEAM_NAME} @ ${game.opponent}`;
}

export function awayMapUrl(game: GameInfo): string | null {
  if (game.isHome || !game.mapQuery) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(game.mapQuery)}`;
}

export function getFeaturedGame(now: Date = new Date()): GameInfo {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const upcoming = SEASON_SCHEDULE.find((game) => new Date(`${game.dateISO}T00:00:00`) >= today);
  return upcoming ?? SEASON_SCHEDULE[SEASON_SCHEDULE.length - 1];
}

export const GAME_EVENTS: GameEvent[] = [
  {
    icon: 'fa-solid fa-fire',
    title: 'Pregame tailgate',
    text: 'Join the Touchdown Club tent at the home-side gate starting 90 minutes before kickoff.',
  },
  {
    icon: 'fa-solid fa-music',
    title: 'Halftime show',
    text: 'Performance by the Century bands and spirit squads.',
  },
  {
    icon: 'fa-solid fa-shirt',
    title: 'Spirit wear table',
    text: 'New Panther gear on sale during the game from the RCHS Booster Club.',
  },
];

export const COACHES: Coach[] = [
  { name: 'Jon Vik', role: 'Varsity Head Coach', photo: 'coaches/jon-vik.jpg' },
  { name: 'Cade Sheehan', role: 'Offensive Coordinator', photo: 'coaches/cade-sheehan.jpg' },
  { name: 'Austin Buzzard', role: 'Defensive Coordinator', photo: 'coaches/austin-buzzard.jpg' },
  { name: 'Nick Elias', role: 'Running Back Coach', photo: 'coaches/nick-elias.jpg' },
  { name: 'Paul Malone', role: 'Defensive Line Coach', photo: 'coaches/paul-malone.jpg' },
  { name: 'Jake Johnson', role: 'JV Head Coach, Offensive Line', photo: 'coaches/jake-johnson.jpg' },
  { name: 'Zach Olson', role: 'JV Defensive Back Coach, Safeties', photo: 'coaches/zach-olson.jpg' },
  { name: 'Justin Howard', role: '9th Grade Head Coach, Wide Receivers', photo: 'coaches/justin-howard.jpg' },
  { name: 'Johnny Tran', role: '9th Grade Coach, Cornerbacks', photo: 'coaches/johnny-tran.jpg' },
];

export const ROSTER: Player[] = [
  { number: 1, name: 'Adam Rice', position: 'WR/DB', grade: 'Sr.' },
  { number: 2, name: 'Zachary Stark', position: 'WR/DB', grade: 'Sr.' },
  { number: 3, name: 'Maxwell Elliot', position: 'RB/LB', grade: 'Sr.' },
  { number: 4, name: 'Malakai Tankhamvang', position: 'WR/DB', grade: 'Sr.' },
  { number: 5, name: 'Levi Tesch', position: 'RB/DB', grade: 'Soph.' },
  { number: 6, name: 'Austin Omwamba', position: 'TE/DL', grade: 'Jr.' },
  { number: 7, name: 'Cade Goergen', position: 'QB/WR/LB', grade: 'Sr.' },
  { number: 8, name: 'Nathan Long', position: 'QB/DB', grade: 'Sr.' },
  { number: 9, name: 'Rylin Cheak', position: 'WR/DB', grade: 'Sr.' },
  { number: 10, name: 'Trevor Strohschein', position: 'WR/RB/DB', grade: 'Sr.' },
  { number: 11, name: 'Evan Chestolowski', position: 'TE/LB', grade: 'Jr.' },
  { number: 12, name: 'Jackson Spearman', position: 'WR/DB', grade: 'Sr.' },
  { number: 13, name: 'Jacob Hofer', position: 'TE/LB', grade: 'Jr.' },
  { number: 14, name: 'Asher Linde', position: 'WR/DB', grade: 'Jr.' },
  { number: 15, name: 'Benjamin Bruce', position: 'QB/DB', grade: 'Soph.' },
  { number: 16, name: 'Navon Grabow', position: 'RB/LB', grade: 'Jr.' },
  { number: 17, name: 'Jordan Faux', position: 'WR/DB', grade: 'Soph.' },
  { number: 18, name: 'Nathan Nobbs', position: 'WR/DB', grade: 'Jr.' },
  { number: 20, name: 'Joren Solak', position: 'WR/DB', grade: 'Jr.' },
  { number: 21, name: 'Caleb Segovia', position: 'WR/DB', grade: 'Soph.' },
  { number: 22, name: 'Wyatt Sandquist', position: 'WR/DB', grade: 'Soph.' },
  { number: 23, name: 'Aiden Savage', position: 'WR/DB', grade: 'Jr.' },
  { number: 24, name: 'Grant Garrison', position: 'WR/DB', grade: 'Sr.' },
  { number: 25, name: 'Ty\'reon Jackson', position: 'WR/DB', grade: 'Jr.' },
  { number: 33, name: 'Peter Arroyo', position: 'K', grade: 'Sr.' },
  { number: 40, name: 'Jaxton Martin', position: 'TE/LB', grade: 'Soph.' },
  { number: 45, name: 'Deacon Kruse', position: 'TE/DL', grade: 'Sr.' },
  { number: 50, name: 'Lucky Kumbo', position: 'OL/DL', grade: 'Jr.' },
  { number: 52, name: 'Samuel Razidlo', position: 'OL/DL', grade: 'Sr.' },
  { number: 54, name: 'Cole Peterson', position: 'OL/DL', grade: 'Sr.' },
  { number: 55, name: 'Matthew Ding', position: 'OL/DL', grade: 'Sr.' },
  { number: 56, name: 'DeVon Williams', position: 'OL/DL', grade: 'Sr.' },
  { number: 62, name: 'Christian Galeana Castro', position: 'OL/DL', grade: 'Sr.' },
  { number: 63, name: 'Carter Ickler', position: 'OL/DL', grade: 'Sr.' },
  { number: 64, name: 'Caleb Bauer', position: 'OL/DL', grade: 'Soph.' },
  { number: 69, name: 'Monte Olson', position: 'OL/DL', grade: 'Jr.' },
  { number: 76, name: 'Evan Gyura', position: 'OL/DL', grade: 'Soph.' },
  { number: 77, name: 'Kyrian Davis', position: 'OL/DL', grade: 'Soph.' },
  { number: 78, name: 'Camden Prochnow', position: 'OL/DL', grade: 'Soph.' }
];

/*
 * Sponsor and supporter recognition is rendered by the shared
 * SponsorsSupportersComponent (src/app/components/sponsors-supporters.component.ts).
 */
