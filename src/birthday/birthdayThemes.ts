import type { BirthdayThemeConfig } from './types';

// Concrete edition 2026: Blooming in 21
export const THEME_2026: BirthdayThemeConfig = {
  year: 2026,
  age: 21,
  themeName: 'Blooming Garden Romance • حديقة الورد الملكية',
  editionTitle: 'BLOOMING IN 21',
  arabicTitle: 'حديقة الورد الملكية في سن الواحد وعشرين',
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
    waxColor: '#be185d', // Deep Rose Ruby Wax
    waxGlow: 'rgba(244, 114, 182, 0.8)',
    sealSymbol: '🌸',
    paperTint: '#fffaf5',
    linerPattern: 'floral-rose',
  },
  photoStyling: {
    frame1Glow: 'shadow-[0_0_50px_rgba(244,114,182,0.35)]',
    frame1Border: 'border-2 border-pink-300/40 ring-1 ring-amber-200/30',
    frame2Glow: 'shadow-[0_0_50px_rgba(192,132,252,0.3)]',
    frame2Border: 'border-2 border-purple-300/40',
    badge1: 'GARDEN OF ROSES',
    badge2: 'TIMELESS BEAUTY',
  },
  letterCardStyle: {
    containerClass: 'bg-gradient-to-br from-[#2a112f]/90 to-[#19081e]/95 border border-pink-400/40 shadow-2xl',
    fontFamily: 'font-arabic',
    stampColor: '#f472b6',
  },
  music: {
    songUrl: '/audio/birthday-song.mp3',
    songTitle: 'تفوت ألف سنة وأنا زي ما أنا',
    songArtist: 'أحمد موزه السلطان • مقصوصة ومخصصة لبوسي (1:19 - 1:40)',
    songBadge: 'المقطع الأيقوني لسن الـ 21 (21 ثانية)',
    durationSec: 21,
    youtubeUrl: 'https://www.youtube.com/watch?v=HhbmEicUOhg&t=79s',
  },
};

// Concrete edition 2027: Another Chapter — 22
export const THEME_2027: BirthdayThemeConfig = {
  year: 2027,
  age: 22,
  themeName: 'Midnight Velvet & Cosmic Romance • سحر منتصف الليل والنجوم',
  editionTitle: 'ANOTHER CHAPTER — 22',
  arabicTitle: 'سحر منتصف الليل وبريق النجوم في عامك الـ 22',
  editionTagline: 'Where Midnight Starlight Meets Electric Romance',
  arabicTagline: 'سحر الليل وشهب السماء يضيئان فصلاً استثنائياً في عامكِ الـ 22',
  introAgeText: '22 YEARS OF BEAUTY & RADIANCE',
  visualMode: 'futuristic-cyber',
  palette: {
    primary: '#ec4899', // Cyber Neon Pink
    secondary: '#9333ea', // Electric Violet
    accent: '#38bdf8', // Starlight Cyan
    goldOrSilver: '#e2e8f0', // Sleek Silver
    bgDark: '#05000d', // Midnight Obsidian
    bgDeep: '#0f021f',
    cardBg: 'rgba(25, 6, 40, 0.85)',
    cardBorder: 'rgba(236, 72, 153, 0.45)',
    glow: 'rgba(236, 72, 153, 0.65)',
    particleColors: [
      '#ec4899', // neon pink
      '#a855f7', // electric purple
      '#38bdf8', // cyber cyan sparkle
      '#e2e8f0', // silver glow
      '#ffffff', // glowing white
    ],
  },
  particles: ['neon-heart', 'butterfly', 'star', 'sparkle'],
  envelope: {
    waxColor: '#701a75', // Dark Magenta Velvet Wax
    waxGlow: 'rgba(236, 72, 153, 0.9)',
    sealSymbol: '🦋',
    paperTint: '#160424',
    linerPattern: 'cyber-stars',
  },
  photoStyling: {
    frame1Glow: 'shadow-[0_0_60px_rgba(236,72,153,0.45)]',
    frame1Border: 'border-2 border-fuchsia-500/60 ring-2 ring-purple-400/30',
    frame2Glow: 'shadow-[0_0_60px_rgba(147,51,234,0.45)]',
    frame2Border: 'border-2 border-violet-400/50',
    badge1: 'MIDNIGHT CHAPTER',
    badge2: 'ELECTRIC RADIANCE',
  },
  letterCardStyle: {
    containerClass: 'bg-gradient-to-br from-[#1b0826]/95 via-[#0e0216]/98 to-[#1a0524]/95 border border-fuchsia-500/50 shadow-2xl',
    fontFamily: 'font-arabic',
    stampColor: '#ec4899',
  },
  music: {
    songUrl: '/audio/amr-diab-ya-ana-ya-la.mp3',
    songTitle: 'يا أنا يا لأ',
    songArtist: 'عمرو دياب • الأغنية الخاصة لعامك الـ 22',
    songBadge: 'الأغنية الملكية للفصل الـ 22',
    durationSec: 45,
    youtubeUrl: 'https://www.youtube.com/watch?v=qDzDFSItK_0',
  },
};

// Procedural future themes for 2028 and beyond
export function generateFutureTheme(targetYear: number): BirthdayThemeConfig {
  const age = targetYear - 2005;

  return {
    year: targetYear,
    age,
    themeName: `The Golden Queen • ملكة الزمرد الإمبراطوري الـ ${age}`,
    editionTitle: `THE GOLDEN QUEEN — ${age}`,
    arabicTitle: `ملكة الرقي والأناقة تضيء عامها الـ ${age}`,
    editionTagline: `Imperial Sovereignty & Velvet Gold — Celebrating ${age} Years`,
    arabicTagline: `أناقة الزمرد الملكي وبريق الذهب الخالص يحتفلان بملكة القلوب في عامها الـ ${age}`,
    introAgeText: `${age} YEARS OF TIMELESS ROYALTY`,
    visualMode: 'royal-emerald',
    palette: {
      primary: '#10b981',
      secondary: '#f59e0b',
      accent: '#fcd34d',
      goldOrSilver: '#fcd34d',
      bgDark: '#02140d',
      bgDeep: '#052e1b',
      cardBg: 'rgba(5, 46, 27, 0.75)',
      cardBorder: 'rgba(16, 185, 129, 0.45)',
      glow: 'rgba(16, 185, 129, 0.55)',
      particleColors: ['#10b981', '#34d399', '#fcd34d', '#ffffff', '#a7f3d0'],
    },
    particles: ['star', 'flower', 'sparkle'],
    envelope: {
      waxColor: '#065f46',
      waxGlow: 'rgba(16, 185, 129, 0.8)',
      sealSymbol: '👑',
      paperTint: '#031c12',
      linerPattern: 'royal-crests',
    },
    photoStyling: {
      frame1Glow: 'shadow-[0_0_55px_rgba(16,185,129,0.45)]',
      frame1Border: 'border-2 border-emerald-500/60',
      frame2Glow: 'shadow-[0_0_55px_rgba(245,158,11,0.45)]',
      frame2Border: 'border-2 border-amber-400/60',
      badge1: `QUEEN CHAPTER ${age}`,
      badge2: 'IMPERIAL GRACE',
    },
    letterCardStyle: {
      containerClass: 'bg-gradient-to-br from-[#031d13]/95 via-[#02140d]/98 to-[#052e1b]/95 border border-emerald-400/40 shadow-2xl',
      fontFamily: 'font-arabic',
      stampColor: '#10b981',
    },
    music: {
      songUrl: '/audio/amr-diab-enta-el-haz.mp3',
      songTitle: 'أنت الحظ',
      songArtist: 'عمرو دياب • أغنية تتويج الملكة بوسي',
      songBadge: `أغنية التتويج الملكي لسن الـ ${age}`,
      durationSec: 60,
      youtubeUrl: 'https://www.youtube.com/watch?v=T-LAJ0Y7lsw',
    },
  };
}

export function getThemeForYear(year: number): BirthdayThemeConfig {
  if (year === 2026) return THEME_2026;
  if (year === 2027) return THEME_2027;
  return generateFutureTheme(year);
}
