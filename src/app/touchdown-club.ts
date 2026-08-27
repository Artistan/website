/**
 * Century Panther Touchdown Club — Panthers Community Support Tiers,
 * from the club's official sponsorship flyer. Shown on the Get Involved
 * and Sponsors pages.
 */
export interface SupportTier {
  name: string;
  price: number;
  icon: string;
  perks: string[];
}

export const TOUCHDOWN_CLUB_INTRO =
  'The Century Panther Touchdown Club is happy to introduce our new Panthers ' +
  'Community Support Tiers. This program allows families, alumni, and community ' +
  "members to directly support the team's needs.";

/**
 * Corporate sponsorship tiers, matching the club's Zeffy business
 * sponsorships checkout (pricing) with benefits from the sponsorship
 * package sheets.
 */
export const CORPORATE_SPONSOR_TIERS: SupportTier[] = [
  {
    name: 'Panther Iron',
    price: 250,
    icon: 'fa-solid fa-industry',
    perks: [
      'Recognition on the team website sponsor page',
      'Name listed in the program sponsor roll call',
    ],
  },
  {
    name: 'Panther Bronze',
    price: 500,
    icon: 'fa-solid fa-medal',
    perks: [
      'Logo listing on the program sponsor page',
      'Shared signage on the sponsor board',
      'Recognition on the team website sponsor page',
    ],
  },
  {
    name: 'Panther Silver',
    price: 1500,
    icon: 'fa-solid fa-award',
    perks: [
      'Shared category representation',
      'One tagged social media post during the season',
      'Logo listing in the program sponsor roll call',
      'PA mention at one home game',
      'Shared signage on the sponsor board',
    ],
  },
  {
    name: 'Panther Gold',
    price: 2500,
    icon: 'fa-solid fa-trophy',
    perks: [
      'Shared category representation',
      'One tagged social media post per month in season',
      '⅛-page full-color ad or logo in the program',
      'PA mentions at two home games',
      'Standard signage placement',
      'Fan Info Table collateral distribution',
      'Two tickets to one home game',
    ],
  },
  {
    name: 'Panther Platinum',
    price: 4000,
    icon: 'fa-solid fa-gem',
    perks: [
      'Shared category representation',
      'Two tagged social media posts per month in season',
      '¼-page full-color ad in the season program',
      'PA mention at every home game',
      'Standard signage placement',
      'Concourse table at one home game',
      'Two tickets to three home games',
    ],
  },
];

/** Benefit-by-tier comparison chart (Sponsors page). */
export interface ComparisonRow {
  benefit: string;
  platinum: string;
  gold: string;
  silver: string;
  bronze: string;
  iron: string;
}

export const CORPORATE_COMPARISON: ComparisonRow[] = [
  { benefit: 'Category rights', platinum: 'Shared', gold: 'Shared', silver: 'Shared', bronze: 'Shared', iron: 'Shared' },
  { benefit: 'Social media posts', platinum: '2 / month', gold: '1 / month', silver: '1 / season', bronze: 'Website only', iron: 'Website only' },
  { benefit: 'Program ad', platinum: '¼-page full-color', gold: '⅛-page or logo', silver: 'Logo listing', bronze: 'Logo listing', iron: '—' },
  { benefit: 'Game day PA mentions', platinum: 'Every home game', gold: 'Two games', silver: 'One game', bronze: '—', iron: '—' },
  { benefit: 'Signage', platinum: 'Standard', gold: 'Standard', silver: 'Shared board', bronze: 'Shared board', iron: '—' },
  { benefit: 'Activation', platinum: 'Concourse table (1 game)', gold: 'Fan Info collateral', silver: '—', bronze: '—', iron: '—' },
  { benefit: 'VIP tickets', platinum: 'Two to three games', gold: 'Two to one game', silver: '—', bronze: '—', iron: '—' },
];

export const TOUCHDOWN_CLUB_TIERS: SupportTier[] = [
  {
    name: 'Home Field Supporter',
    price: 50,
    icon: 'fa-solid fa-house-flag',
    perks: [
      'Official 2026 Panther Decal',
      'Digital recognition in the website Thank You section',
      'Personalized thank-you note from the club',
    ],
  },
  {
    name: 'Prowl Backer',
    price: 150,
    icon: 'fa-solid fa-paw',
    perks: [
      'Includes $50 tier benefits, plus:',
      'Name in the Game Day Program — Community Backers section',
      'Two Century Panther water bottles',
    ],
  },
  {
    name: 'Century Champion',
    price: 250,
    icon: 'fa-solid fa-trophy',
    perks: [
      'All assets from lower tiers',
      'Receive 2 Century Football hoodies',
      'Name listed in a larger font/section in the Game Day Program',
      'Receive 2 season tickets for the 2026 Home games',
    ],
  },
  {
    name: 'Legacy Builder',
    price: 400,
    icon: 'fa-solid fa-crown',
    perks: [
      'All assets from lower tiers',
      'Receive 2 Custom Stadium Seats branded as Century Panther Legacy Builder',
      '2 Season Tickets to all Home Games in the 2026 Season and reserved VIP Parking',
    ],
  },
];
