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
    // Trigger special heart burst on clicking the birthday number
    try {
      confetti({
        particleCount: 80,
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
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden text-center">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[150px] opacity-35 pointer-events-none"
        style={{ backgroundColor: theme.palette.primary }}
      />
      <div
        className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full blur-[130px] opacity-25 pointer-events-none"
        style={{ backgroundColor: theme.palette.secondary }}
      />

      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center gap-6">
        {/* Edition Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-pink-400/30 bg-white/5 backdrop-blur-xl shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="font-editorial text-xs sm:text-sm tracking-[0.25em] uppercase text-pink-200 font-semibold">
            {theme.editionTitle}
          </span>
          <span className="text-pink-400">•</span>
          <span className="font-arabic text-xs sm:text-sm text-pink-300 font-medium">
            {calculation.currentDate.getFullYear()}
          </span>
        </motion.div>

        {/* Countdown Badge if before her birthday */}
        {calculation.isUpcomingThisYear && calculation.daysUntilNextBirthday > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-xs sm:text-sm text-rose-200 backdrop-blur-md"
          >
            <Calendar className="w-3.5 h-3.5 text-rose-300" />
            <span className="font-arabic">
              باقي {calculation.daysUntilNextBirthday} يوم على عيد ميلادك الـ {calculation.turningAge} ❤️
            </span>
          </motion.div>
        )}

        {/* Huge Animated Age Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          onClick={handleAgeNumberClick}
          title="اضغطي على الرقم لمفاجأة قلوب خاصة! ✨"
          className="relative cursor-pointer group select-none my-2"
        >
          {/* Subtle glow layer behind number */}
          <div
            className="absolute inset-0 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-110 pointer-events-none"
            style={{ backgroundColor: theme.palette.primary }}
          />

          <div
            className="font-editorial text-[110px] sm:text-[160px] md:text-[210px] lg:text-[250px] font-black leading-none tracking-tighter text-transparent bg-clip-text drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundImage: isDarkCyber
                ? 'linear-gradient(180deg, #ffffff 0%, #ec4899 45%, #9333ea 90%)'
                : 'linear-gradient(180deg, #ffffff 0%, #f472b6 40%, #c084fc 80%, #fef08a 100%)',
            }}
          >
            {calculation.turningAge}
          </div>

          <div className="absolute -top-3 right-0 sm:right-6 bg-pink-500/30 border border-pink-400/50 text-pink-200 text-[11px] sm:text-xs font-editorial px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-md">
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400 animate-pulse" />
            <span>CLICK FOR MAGIC</span>
          </div>
        </motion.div>

        {/* BOSY Name Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest text-white drop-shadow-md"
        >
          BOSY
        </motion.h1>

        {/* Arabic Greeting */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-arabic text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-rose-200 tracking-wide max-w-4xl leading-relaxed"
        >
          كل سنة وانتي طيبة يا أجمل بوسي ❤️
        </motion.h2>

        {/* Supporting Emotional Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-arabic text-base sm:text-lg md:text-xl text-neutral-300/90 max-w-2xl leading-relaxed mt-2"
        >
          مش مجرد يوم عيد ميلاد... ده يوم اتولدت فيه حكاية جميلة.
        </motion.p>

        {/* Scroll Prompt Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex flex-col items-center gap-2 text-pink-300/70 text-xs sm:text-sm font-arabic"
        >
          <span>انزلي تحت واستكشفي حكايتك ومفاجآتك الجميلة</span>
          <div className="w-5 h-9 rounded-full border-2 border-pink-400/40 flex items-start justify-center p-1 mt-1">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-pink-400"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
