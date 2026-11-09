import React from 'react';
import { motion } from 'framer-motion';
import type { BirthdayThemeConfig, BirthdayCalculation } from '../../birthday/types';
import { Sparkles, Heart, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  theme: BirthdayThemeConfig;
  calculation: BirthdayCalculation;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ theme, calculation }) => {
  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  const handleAgeNumberClick = (e: React.MouseEvent) => {
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: theme.palette.particleColors,
      });
    } catch {}

    const customEvent = new CustomEvent('bosy-burst', {
      detail: { x: e.clientX, y: e.clientY, count: 20 },
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-12 px-4 overflow-hidden text-center">
      {/* High Performance Radial Ambient Glow (0% GPU blur cost) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${theme.palette.primary} 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center gap-5">
        {/* Edition Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/30 bg-black/40 text-xs sm:text-sm shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span className="font-editorial text-xs sm:text-sm tracking-[0.2em] uppercase text-pink-200 font-semibold">
            {theme.editionTitle}
          </span>
          <span className="text-pink-400">•</span>
          <span className="font-arabic text-xs sm:text-sm text-pink-300 font-medium">
            {calculation.currentDate.getFullYear()}
          </span>
        </div>

        {/* Countdown Badge if before birthday */}
        {calculation.isUpcomingThisYear && calculation.daysUntilNextBirthday > 0 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-xs text-rose-200">
            <Calendar className="w-3 h-3 text-rose-300" />
            <span className="font-arabic">
              باقي {calculation.daysUntilNextBirthday} يوم على عيد ميلادك الـ {calculation.turningAge} ❤️
            </span>
          </div>
        )}

        {/* Huge Animated Age Number */}
        <div
          onClick={handleAgeNumberClick}
          title="اضغطي على الرقم لمفاجأة قلوب خاصة! ✨"
          className="relative cursor-pointer select-none my-1 active:scale-95 transition-transform"
        >
          <div
            className="font-editorial text-[95px] sm:text-[140px] md:text-[190px] font-black leading-none tracking-tighter text-transparent bg-clip-text drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
            style={{
              backgroundImage: isDarkCyber
                ? 'linear-gradient(180deg, #ffffff 0%, #ec4899 45%, #9333ea 90%)'
                : 'linear-gradient(180deg, #ffffff 0%, #f472b6 40%, #c084fc 80%, #fef08a 100%)',
            }}
          >
            {calculation.turningAge}
          </div>

          <div className="absolute -top-2 right-0 sm:right-4 bg-pink-500/30 border border-pink-400/40 text-pink-200 text-[10px] sm:text-xs font-editorial px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Heart className="w-2.5 h-2.5 text-pink-400 fill-pink-400" />
            <span>CLICK</span>
          </div>
        </div>

        {/* BOSY Name Header */}
        <h1
          dir="ltr"
          className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-widest text-white drop-shadow-md"
        >
          BOSY
        </h1>

        {/* Arabic Greeting */}
        <h2 className="font-arabic text-2xl sm:text-3xl md:text-4xl font-bold text-rose-200 tracking-wide max-w-3xl leading-relaxed">
          كل سنة وانتي طيبة يا أجمل بوسي ❤️
        </h2>

        {/* Supporting Emotional Subtitle */}
        <p className="font-arabic text-sm sm:text-base md:text-lg text-neutral-300/90 max-w-xl leading-relaxed">
          مش مجرد يوم عيد ميلاد... ده يوم اتولدت فيه حكاية جميلة.
        </p>

        {/* Scroll Prompt Indicator */}
        <div className="mt-8 flex flex-col items-center gap-1.5 text-pink-300/70 text-xs font-arabic">
          <span>انزلي تحت واستكشفي حكايتك ومفاجآتك الجميلة</span>
          <div className="w-4 h-7 rounded-full border border-pink-400/40 flex items-start justify-center p-0.5 mt-0.5">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1 h-1 rounded-full bg-pink-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
