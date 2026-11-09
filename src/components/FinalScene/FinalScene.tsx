import React from 'react';
import { motion } from 'framer-motion';
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
        particleCount: 100,
        spread: 110,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: theme.palette.particleColors,
      });
    } catch {}

    const customEvent = new CustomEvent('bosy-burst', {
      detail: { x: e.clientX, y: e.clientY, count: 30 },
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-24 px-4 overflow-hidden text-center">
      {/* Deep Immersive Atmospheric Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: isDarkCyber
            ? 'radial-gradient(circle at bottom, #2b0c3d 0%, #0a0112 80%)'
            : 'radial-gradient(circle at bottom, #38123f 0%, #0d0312 80%)',
        }}
      />

      {/* Massive Glowing Core */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[170px] opacity-30 pointer-events-none"
        style={{ backgroundColor: theme.palette.primary }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Crown Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-16 h-16 rounded-full bg-white/5 border border-pink-400/30 flex items-center justify-center backdrop-blur-md shadow-lg"
        >
          <Crown className="w-8 h-8 text-amber-300 animate-pulse" />
        </motion.div>

        {/* English Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-editorial text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide leading-tight max-w-3xl"
        >
          THE WORLD IS LUCKY TO HAVE YOU, BOSY.
        </motion.h2>

        {/* Arabic Headline */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-arabic text-3xl sm:text-4xl md:text-5xl font-bold text-rose-200 tracking-wide"
        >
          كل سنة وانتي أجمل حكاية ❤️
        </motion.h3>

        {/* Re-display Birthday Age Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onClick={handleFinalHeartClick}
          title="اضغطي على القلب لمزيد من الفرحة! ❤️"
          className="cursor-pointer group flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-400/40 backdrop-blur-xl shadow-[0_0_35px_rgba(244,114,182,0.3)] transition-all duration-300 hover:scale-105"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span className="font-editorial font-bold text-lg sm:text-xl text-white tracking-widest">
            {calculation.turningAge} YEARS OF MAGIC &amp; GRACE
          </span>
          <Heart className="w-5 h-5 text-pink-400 fill-pink-400 group-hover:scale-125 transition-transform" />
        </motion.div>

        {/* Signature & End credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center space-y-2 border-t border-white/10 pt-8 w-full max-w-md"
        >
          <p className="font-editorial italic text-xs sm:text-sm text-neutral-400 tracking-wider">
            Exclusively created with infinite love for BOSY (بوسي)
          </p>
          <p className="font-arabic text-xs text-neutral-500">
            04-07-2005 • إلى ما لا نهاية من السعادة والنجاح
          </p>
        </motion.div>
      </div>
    </section>
  );
};
