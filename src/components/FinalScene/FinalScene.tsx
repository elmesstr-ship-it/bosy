import React from 'react';
import type { BirthdayThemeConfig, BirthdayCalculation } from '../../birthday/types';
import { Sparkles, Heart, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalSceneProps {
  theme: BirthdayThemeConfig;
  calculation: BirthdayCalculation;
}

export const FinalScene: React.FC<FinalSceneProps> = ({ theme, calculation }) => {
  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  const handleFinalHeartClick = (e: React.MouseEvent) => {
    try {
      confetti({
        particleCount: 60,
        spread: 90,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: theme.palette.particleColors,
      });
    } catch {}

    const customEvent = new CustomEvent('bosy-burst', {
      detail: { x: e.clientX, y: e.clientY, count: 25 },
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <section className="relative min-h-[75vh] flex flex-col items-center justify-center py-16 px-4 overflow-hidden text-center">
      {/* High performance ambient radial gradient (0% GPU blur cost) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: isDarkCyber
            ? `radial-gradient(circle at 50% 60%, ${theme.palette.primary} 0%, transparent 65%)`
            : `radial-gradient(circle at 50% 60%, ${theme.palette.secondary} 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
        {/* Crown Badge */}
        <div className="w-13 h-13 rounded-full bg-white/5 border border-pink-400/30 flex items-center justify-center shadow-md">
          <Crown className="w-6 h-6 text-amber-300" />
        </div>

        {/* English Statement */}
        <h2
          dir="ltr"
          className="font-editorial text-2xl sm:text-4xl md:text-5xl text-white font-light tracking-wide leading-tight max-w-2xl"
        >
          THE WORLD IS LUCKY TO HAVE YOU, BOSY.
        </h2>

        {/* Arabic Headline */}
        <h3 className="font-arabic text-2xl sm:text-3xl md:text-4xl font-bold text-rose-200 tracking-wide">
          كل سنة وانتي أجمل حكاية ❤️
        </h3>

        {/* Re-display Birthday Age Badge */}
        <div
          onClick={handleFinalHeartClick}
          title="اضغطي على القلب لمزيد من الفرحة! ❤️"
          className="cursor-pointer flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/5 border border-pink-400/40 shadow-lg active:scale-95 transition-transform"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span dir="ltr" className="font-editorial font-bold text-base sm:text-lg text-white tracking-widest">
            {calculation.turningAge} YEARS OF MAGIC &amp; GRACE
          </span>
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
        </div>

        {/* Signature & End credit */}
        <div className="mt-10 text-center space-y-1.5 border-t border-white/10 pt-6 w-full max-w-sm">
          <p dir="ltr" className="font-editorial italic text-xs text-neutral-400 tracking-wider">
            Exclusively created with infinite love for BOSY (بوسي)
          </p>
          <p className="font-arabic text-[11px] text-neutral-500">
            04-07-2005 • إلى ما لا نهاية من السعادة والنجاح
          </p>
        </div>
      </div>
    </section>
  );
};
