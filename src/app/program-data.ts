/**
 * Game Day Program content — everything on the /program page is driven from
 * this file so it can be updated each week without touching page markup.
 *
 * ROSTER, COACHES, and SEASON_SCHEDULE all reflect real 2026 data
 * (sources: public/Schedule.png, docs/coaches.png).
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
  /** Opponent mascot logo, cropped from public/Schedule.png. */
  logo: string;
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
    location: 'At Tartan High School',
    isHome: false,
    mapQuery: 'Tartan High School, Oakdale, MN',
    logo: 'opponent-logos/tartan.png',
  },
  {
    opponent: 'Chaska',
    dateISO: '2026-09-11',
    date: 'Sept 11, 2026',
    kickoff: '7:00 PM',
    location: 'Century High School Stadium',
    isHome: true,
    logo: 'opponent-logos/chaska.png',
  },
  {
    opponent: 'Owatonna',
    dateISO: '2026-09-18',
    date: 'Sept 18, 2026',
    kickoff: '7:00 PM',
    location: 'At Owatonna High School',
    isHome: false,
    mapQuery: 'Owatonna High School, Owatonna, MN',
    logo: 'opponent-logos/owatonna.png',
  },
  {
    opponent: 'Rochester John Marshall',
    dateISO: '2026-09-25',
    date: 'Sept 25, 2026',
    kickoff: '5:30 PM',
    location: 'At Rochester John Marshall High School',
    isHome: false,
    mapQuery: 'John Marshall High School, Rochester, MN',
    logo: 'opponent-logos/roch-jm.png',
  },
  {
    opponent: 'Rochester Mayo',
    dateISO: '2026-10-02',
    date: 'Oct 2, 2026',
    kickoff: '5:30 PM',
    location: 'At Rochester Mayo High School',
    isHome: false,
    mapQuery: 'Mayo High School, Rochester, MN',
    logo: 'opponent-logos/roch-mayo.png',
  },
  {
    opponent: 'New Prague',
    dateISO: '2026-10-09',
    date: 'Oct 9, 2026',
    kickoff: '7:00 PM',
    location: 'Century High School Stadium',
    isHome: true,
    logo: 'opponent-logos/new-prague.png',
  },
  {
    opponent: 'Northfield',
    dateISO: '2026-10-14',
    date: 'Oct 14, 2026',
    kickoff: '7:00 PM',
    location: 'At Northfield High School',
    isHome: false,
    mapQuery: 'Northfield High School, Northfield, MN',
    logo: 'opponent-logos/northfield.png',
  },
  {
    opponent: 'Winona',
    dateISO: '2026-10-21',
    date: 'Oct 21, 2026',
    kickoff: '7:00 PM',
    location: 'Century High School Stadium',
    isHome: true,
    logo: 'opponent-logos/winona.png',
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
