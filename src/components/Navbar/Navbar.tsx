import React from 'react';
import type { BirthdayThemeConfig, BirthdayCalculation } from '../../birthday/types';
import { Heart, Sparkles } from 'lucide-react';

interface NavbarProps {
  theme: BirthdayThemeConfig;
  calculation: BirthdayCalculation;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, calculation }) => {
  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <span className="font-editorial text-sm sm:text-base font-bold tracking-widest text-white">
            BOSY
          </span>
          <span className="text-pink-400 font-serif">•</span>
          <span className="font-arabic text-xs sm:text-sm text-pink-200 font-semibold">
            بوسي
          </span>
        </div>

        {/* Center / Right Badge: Edition & Age */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div
            className={`hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl border shadow-lg text-xs font-editorial tracking-wider ${
              isDarkCyber
                ? 'bg-fuchsia-950/40 border-fuchsia-500/40 text-fuchsia-200'
                : 'bg-pink-950/40 border-pink-400/40 text-pink-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>EDITION {theme.year}</span>
            <span className="opacity-40">|</span>
            <span className="font-bold">{calculation.turningAge} YEARS</span>
          </div>

          <div className="text-[11px] font-mono text-neutral-400 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/5">
            04-07-2005
          </div>
        </div>
      </div>
    </header>
  );
};
