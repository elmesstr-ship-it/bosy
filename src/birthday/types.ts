export type VisualMode = 'garden-romance' | 'futuristic-cyber' | 'celestial-starlight' | 'royal-emerald';

export type ParticleKind = 'petal' | 'heart' | 'flower' | 'sparkle' | 'star' | 'neon-heart' | 'butterfly';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  goldOrSilver: string;
  bgDark: string;
  bgDeep: string;
  cardBg: string;
  cardBorder: string;
  glow: string;
  particleColors: string[];
}

export interface BirthdayThemeConfig {
  year: number;
  age: number;
  themeName: string;
  editionTitle: string;
  arabicTitle: string;
  editionTagline: string;
  arabicTagline: string;
  introAgeText: string; // e.g. "21 YEARS OF MAGIC" or "22 YEARS OF BEAUTY"
  visualMode: VisualMode;
  palette: ColorPalette;
  particles: ParticleKind[];
  envelope: {
    waxColor: string;
    waxGlow: string;
    sealSymbol: string;
    paperTint: string;
    linerPattern: string;
  };
  photoStyling: {
    frame1Glow: string;
    frame1Border: string;
    frame2Glow: string;
    frame2Border: string;
    badge1: string;
    badge2: string;
  };
  letterCardStyle: {
    containerClass: string;
    fontFamily: string;
    stampColor: string;
  };
}

export interface BirthdayCalculation {
  birthDate: Date;
  currentDate: Date;
  currentAge: number;
  turningAge: number;
  isBirthdayToday: boolean;
  isUpcomingThisYear: boolean;
  hasPassedThisYear: boolean;
  daysUntilNextBirthday: number;
  activeEditionYear: number;
  nextBirthdayDate: Date;
}
