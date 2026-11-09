import type { BirthdayThemeConfig } from './types';

// Concrete edition 2026: Blooming in 21
export const THEME_2026: BirthdayThemeConfig = {
  year: 2026,
  age: 21,
  themeName: 'Blooming Garden Romance',
  editionTitle: 'BLOOMING IN 21',
  arabicTitle: 'أجمل حديقة ورود في سن الواحد وعشرين',
  editionTagline: 'A Dreamy, Romantic & Luxury Birthday Universe',
  arabicTagline: 'عالم ساحر من الورد، الأنوثة والرقي مهدى لبوسي في عامها الـ 21',
  introAgeText: '21 YEARS OF MAGIC',
  visualMode: 'garden-romance',
  palette: {
    primary: '#f472b6', // Rose Pink
    secondary: '#c084fc', // Lavender
    accent: '#fb923c', // Soft Peach
    goldOrSilver: '#f6d89b', // Champagne Gold
    bgDark: '#130617', // Deep rose-tinted dark
    bgDeep: '#1f0927',
    cardBg: 'rgba(255, 240, 245, 0.06)',
    cardBorder: 'rgba(244, 114, 182, 0.35)',
    glow: 'rgba(244, 114, 182, 0.45)',
    particleColors: [
      '#f472b6', // rose pink
      '#f9a8d4', // soft petal
      '#e9d5ff', // lavender
      '#fef08a', // champagne shimmer
      '#ffffff', // pearl white
      '#fed7aa', // soft peach
    ],
  },
  particles: ['petal', 'flower', 'heart', 'sparkle'],
  envelope: {
    waxColor: '#be185d', // Deep Rose Wax
    waxGlow: 'rgba(244, 114, 182, 0.7)',
    sealSymbol: '🌸',
    paperTint: '#fffaf5',
    linerPattern: 'floral-rose',
  },
  photoStyling: {
    frame1Glow: 'shadow-[0_0_50px_rgba(244,114,182,0.35)]',
    frame1Border: 'border-2 border-pink-300/40 ring-1 ring-amber-200/30',
    frame2Glow: 'shadow-[0_0_50px_rgba(192,132,252,0.3)]',
    frame2Border: 'border-2 border-purple-300/40 backdrop-blur-xl',
    badge1: 'GARDEN OF ROSES',
    badge2: 'TIMELESS BEAUTY',
  },
  letterCardStyle: {
    containerClass: 'bg-gradient-to-br from-[#2a112f]/80 to-[#19081e]/90 border border-pink-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.7)]',
    fontFamily: 'font-arabic',
    stampColor: '#f472b6',
  },
};

// Concrete edition 2027: Another Chapter — 22
export const THEME_2027: BirthdayThemeConfig = {
  year: 2027,
  age: 22,
  themeName: 'Dark Luxury & Futuristic Romance',
  editionTitle: 'ANOTHER CHAPTER — 22',
  arabicTitle: 'فصل استثنائي جديد في عامك الـ 22',
  editionTagline: 'Where Midnight Elegance Meets Electric Romance',
  arabicTagline: 'سحر الليل وجمال النجوم يضيئان بداية فصلكِ الجديد',
  introAgeText: '22 YEARS OF BEAUTY',
  visualMode: 'futuristic-cyber',
  palette: {
    primary: '#ec4899', // Neon Pink
    secondary: '#9333ea', // Electric Violet
    accent: '#831843', // Deep Burgundy
    goldOrSilver: '#e2e8f0', // Sleek Silver
    bgDark: '#08010f', // Midnight Black/Purple
    bgDeep: '#10031e',
    cardBg: 'rgba(25, 7, 38, 0.65)',
    cardBorder: 'rgba(236, 72, 153, 0.45)',
    glow: 'rgba(236, 72, 153, 0.65)',
    particleColors: [
      '#ec4899', // neon pink
      '#a855f7', // electric purple
      '#38bdf8', // cyber cyan sparkle
      '#e2e8f0', // silver glow
      '#ffffff', // glowing white
      '#f43f5e', // intense burgundy pink
    ],
  },
  particles: ['neon-heart', 'butterfly', 'star', 'sparkle'],
  envelope: {
    waxColor: '#701a75', // Dark Magenta Wax
    waxGlow: 'rgba(236, 72, 153, 0.9)',
    sealSymbol: '🦋',
    paperTint: '#1c092b',
    linerPattern: 'cyber-stars',
  },
  photoStyling: {
    frame1Glow: 'shadow-[0_0_60px_rgba(236,72,153,0.45)]',
    frame1Border: 'border-2 border-fuchsia-500/60 ring-2 ring-purple-400/30',
    frame2Glow: 'shadow-[0_0_60px_rgba(147,51,234,0.45)]',
    frame2Border: 'border-2 border-violet-400/50 backdrop-blur-2xl',
    badge1: 'MIDNIGHT CHAPTER',
    badge2: 'ELECTRIC RADIANCE',
  },
  letterCardStyle: {
    containerClass: 'bg-gradient-to-br from-[#1b0826]/90 via-[#0e0216]/95 to-[#1a0524]/90 border border-fuchsia-500/40 shadow-[0_30px_70px_rgba(0,0,0,0.85)]',
    fontFamily: 'font-arabic',
    stampColor: '#ec4899',
  },
};

/**
 * Procedurally generates dynamic yearly themes for 2028 and beyond!
 * Ensures every single future birthday gets a fresh, luxurious visual personality
 * while automatically calculating Bosy's real age from 2005.
 */
export function generateFutureTheme(targetYear: number): BirthdayThemeConfig {
  const age = targetYear - 2005;

  const proceduralThemes = [
    {
      editionTitle: `CELESTIAL RADIANCE — ${age}`,
      themeName: 'Celestial Starlight Realm',
      arabicTitle: `نجمة ساطعة في سمائها الـ ${age}`,
      arabicTagline: `عالم من بريق النجوم والشهب يحتفل بقلب بوسي المنور`,
      visualMode: 'celestial-starlight' as const,
      palette: {
        primary: '#38bdf8',
        secondary: '#818cf8',
        accent: '#c084fc',
        goldOrSilver: '#fde047',
        bgDark: '#030712',
        bgDeep: '#0f172a',
        cardBg: 'rgba(15, 23, 42, 0.75)',
        cardBorder: 'rgba(56, 189, 248, 0.4)',
        glow: 'rgba(56, 189, 248, 0.5)',
        particleColors: ['#38bdf8', '#818cf8', '#fde047', '#ffffff', '#e0e7ff'],
      },
      particles: ['star', 'sparkle', 'heart'] as any,
      waxColor: '#1e3a8a',
      sealSymbol: '⭐',
    },
    {
      editionTitle: `ROYAL EMERALD & VELVET — ${age}`,
      themeName: 'Emerald Queen Luxe',
      arabicTitle: `ملكة الرقي والأناقة في سن الـ ${age}`,
      arabicTagline: `أناقة الزمرد وبريق الذهب يحتفلان بضحكتك وجمالك`,
      visualMode: 'royal-emerald' as const,
      palette: {
        primary: '#10b981',
        secondary: '#059669',
        accent: '#f59e0b',
        goldOrSilver: '#fcd34d',
        bgDark: '#021810',
        bgDeep: '#052e16',
        cardBg: 'rgba(6, 78, 59, 0.35)',
        cardBorder: 'rgba(16, 185, 129, 0.45)',
        glow: 'rgba(16, 185, 129, 0.55)',
        particleColors: ['#10b981', '#34d399', '#fcd34d', '#ffffff', '#a7f3d0'],
      },
      particles: ['sparkle', 'flower', 'heart'] as any,
      waxColor: '#064e3b',
      sealSymbol: '👑',
    },
    {
      editionTitle: `GOLDEN SUNSET SUNRISE — ${age}`,
      themeName: 'Golden Velvet Sunrise',
      arabicTitle: `شروق ذهبي مفعم بالسعادة في عامها الـ ${age}`,
      arabicTagline: `دفء الشمس وألوان الغروب الذهبية تبارك عامكِ الجديد`,
      visualMode: 'garden-romance' as const,
      palette: {
        primary: '#f59e0b',
        secondary: '#ec4899',
        accent: '#f97316',
        goldOrSilver: '#fef08a',
        bgDark: '#18070d',
        bgDeep: '#2a0e19',
        cardBg: 'rgba(42, 14, 25, 0.65)',
        cardBorder: 'rgba(245, 158, 11, 0.4)',
        glow: 'rgba(245, 158, 11, 0.5)',
        particleColors: ['#f59e0b', '#fb923c', '#f43f5e', '#fef08a', '#ffffff'],
      },
      particles: ['petal', 'sparkle', 'heart'] as any,
      waxColor: '#9a3412',
      sealSymbol: '✨',
    },
  ];

  // Pick deterministic theme based on year offset
  const cycleIndex = (targetYear - 2028) % proceduralThemes.length;
  const picked = proceduralThemes[cycleIndex];

  return {
    year: targetYear,
    age,
    themeName: picked.themeName,
    editionTitle: picked.editionTitle,
    arabicTitle: picked.arabicTitle,
    editionTagline: `Procedural Future Universe Edition — Celebrating ${age} Years`,
    arabicTagline: picked.arabicTagline,
    introAgeText: `${age} YEARS OF WONDER`,
    visualMode: picked.visualMode,
    palette: picked.palette,
    particles: picked.particles,
    envelope: {
      waxColor: picked.waxColor,
      waxGlow: picked.palette.glow,
      sealSymbol: picked.sealSymbol,
      paperTint: '#0d1117',
      linerPattern: 'procedural-stars',
    },
    photoStyling: {
      frame1Glow: `shadow-[0_0_55px_${picked.palette.glow}]`,
      frame1Border: `border-2 border-[${picked.palette.primary}]/60`,
      frame2Glow: `shadow-[0_0_55px_${picked.palette.glow}]`,
      frame2Border: `border-2 border-[${picked.palette.secondary}]/60`,
      badge1: `CHAPTER ${age}`,
      badge2: 'FOREVER ICONIC',
    },
    letterCardStyle: {
      containerClass: `bg-gradient-to-br from-[#0f172a]/90 via-[#020617]/95 to-[#1e1b4b]/90 border border-sky-400/30 shadow-[0_30px_70px_rgba(0,0,0,0.85)]`,
      fontFamily: 'font-arabic',
      stampColor: picked.palette.primary,
    },
  };
}

/**
 * Main theme resolver: returns the exact matching theme configuration for any year
 */
export function getThemeForYear(year: number): BirthdayThemeConfig {
  if (year === 2026) return THEME_2026;
  if (year === 2027) return THEME_2027;
  return generateFutureTheme(year);
}
