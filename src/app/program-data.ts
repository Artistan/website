/**
 * Game Day Program content — everything on the /program page is driven from
 * this file so it can be updated each week without touching page markup.
 *
 * PLACEHOLDER DATA: the roster and coaching staff lists below are sample
 * entries — replace them with the real 2026 roster/staff as they're
 * finalized. SEASON_SCHEDULE reflects the real 2026 schedule (public/Schedule.svg).
 */

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
}

export interface GameEvent {
  icon: string;
  title: string;
  text: string;
}

export interface Coach {
  name: string;
  role: string;
}

export interface Player {
  number: number | string;
  name: string;
  position: string;
  grade: string;
}

/** Set to true once the real roster/staff below has been filled in. */
export const PROGRAM_DATA_IS_PLACEHOLDER = true;

/** 2026 varsity schedule, sourced from public/Schedule.svg. */
export const SEASON_SCHEDULE: GameInfo[] = [
  {
    opponent: 'Tartan',
    dateISO: '2026-09-03',
    date: 'Sept 3, 2026',
    kickoff: '6:30 PM',
    location: 'At Tartan High School',
    isHome: false,
    mapQuery: 'Tartan High School, Oakdale, MN',
  },
  {
    opponent: 'Chaska',
    dateISO: '2026-09-11',
    date: 'Sept 11, 2026',
    kickoff: '7:00 PM',
    location: 'Century High School Stadium',
    isHome: true,
  },
  {
    opponent: 'Owatonna',
    dateISO: '2026-09-18',
    date: 'Sept 18, 2026',
    kickoff: '7:00 PM',
    location: 'At Owatonna High School',
    isHome: false,
    mapQuery: 'Owatonna High School, Owatonna, MN',
  },
  {
    opponent: 'Rochester John Marshall',
    dateISO: '2026-09-25',
    date: 'Sept 25, 2026',
    kickoff: '5:30 PM',
    location: 'At Rochester John Marshall High School',
    isHome: false,
    mapQuery: 'John Marshall High School, Rochester, MN',
  },
  {
    opponent: 'Rochester Mayo',
    dateISO: '2026-10-02',
    date: 'Oct 2, 2026',
    kickoff: '5:30 PM',
    location: 'At Rochester Mayo High School',
    isHome: false,
    mapQuery: 'Mayo High School, Rochester, MN',
  },
  {
    opponent: 'New Prague',
    dateISO: '2026-10-09',
    date: 'Oct 9, 2026',
    kickoff: '7:00 PM',
    location: 'Century High School Stadium',
    isHome: true,
  },
  {
    opponent: 'Northfield',
    dateISO: '2026-10-14',
    date: 'Oct 14, 2026',
    kickoff: '7:00 PM',
    location: 'At Northfield High School',
    isHome: false,
    mapQuery: 'Northfield High School, Northfield, MN',
  },
  {
    opponent: 'Winona',
    dateISO: '2026-10-21',
    date: 'Oct 21, 2026',
    kickoff: '7:00 PM',
    location: 'Century High School Stadium',
    isHome: true,
  },
];

/**
 * The game featured as "this week": the next game whose date hasn't fully
 * passed yet (so it stays featured through game day itself), or the season
 * finale once every game has been played.
 */
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
    text: 'New Panther gear on sale all game at the Touchdown Club tent.',
  },
];

export const COACHES: Coach[] = [
  { name: 'Coach name', role: 'Head Coach' },
  { name: 'Coach name', role: 'Offensive Coordinator' },
  { name: 'Coach name', role: 'Defensive Coordinator' },
  { name: 'Coach name', role: 'Special Teams' },
  { name: 'Coach name', role: 'Line Coach' },
];

export const ROSTER: Player[] = [
  { number: 1, name: 'Player name', position: 'QB', grade: 'Sr.' },
  { number: 2, name: 'Player name', position: 'RB', grade: 'Jr.' },
  { number: 3, name: 'Player name', position: 'WR', grade: 'Sr.' },
  { number: 4, name: 'Player name', position: 'WR', grade: 'So.' },
  { number: 5, name: 'Player name', position: 'TE', grade: 'Jr.' },
  { number: 50, name: 'Player name', position: 'OL', grade: 'Sr.' },
  { number: 55, name: 'Player name', position: 'DL', grade: 'Jr.' },
  { number: 40, name: 'Player name', position: 'LB', grade: 'Sr.' },
  { number: 20, name: 'Player name', position: 'DB', grade: 'So.' },
  { number: 90, name: 'Player name', position: 'K/P', grade: 'Jr.' },
];

/*
 * Sponsor and supporter recognition is rendered by the shared
 * SponsorsSupportersComponent (src/app/components/sponsors-supporters.component.ts).
 */
