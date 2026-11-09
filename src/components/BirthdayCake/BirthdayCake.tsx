import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BirthdayThemeConfig, BirthdayCalculation } from '../../birthday/types';
import { Sparkles, Flame, Heart, Cake, Wind, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayCakeProps {
  theme: BirthdayThemeConfig;
  calculation: BirthdayCalculation;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ theme, calculation }) => {
  const [isCandleBlown, setIsCandleBlown] = useState<boolean>(false);

  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  const handleBlowCandle = (e: React.MouseEvent) => {
    if (isCandleBlown) return;

    setIsCandleBlown(true);

    try {
      confetti({
        particleCount: 110,
        spread: 100,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: theme.palette.particleColors,
      });
    } catch {}

    const customEvent = new CustomEvent('bosy-burst', {
      detail: { x: e.clientX, y: e.clientY, count: 35 },
    });
    window.dispatchEvent(customEvent);
  };

  const handleRelight = () => {
    setIsCandleBlown(false);
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/30 bg-white/5 backdrop-blur-md text-xs sm:text-sm text-pink-300 font-editorial tracking-widest uppercase">
            <Cake className="w-3.5 h-3.5" />
            <span>MAKE A WISH • تورتة بوسي والشموع</span>
          </div>

          <h2 className="font-arabic text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            اتمني أمنية من قلبك واطفي الشمعة يا بوسي 🎂✨
          </h2>

          <p className="font-arabic text-sm sm:text-base md:text-lg text-rose-200/90 max-w-xl mx-auto">
            التورتة على طرابيزتك والشمعة منورة ليكي... اضغطي على الشمعة علشان تطفيها وتتمني أمنيتك لسن الـ {calculation.turningAge}!
          </p>
        </div>

        {/* The Interactive Composition: Bosy at her cafe table with cake and candle */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative group w-full max-w-lg aspect-[4/5] rounded-[2.5rem] p-3 sm:p-4 border shadow-2xl transition-all duration-700 overflow-hidden ${
              isDarkCyber
                ? 'bg-gradient-to-b from-[#2e0e45]/80 via-[#160525]/90 to-[#0e021a] border-fuchsia-500/50 shadow-[0_20px_60px_rgba(236,72,153,0.35)]'
                : 'bg-gradient-to-b from-white/10 via-pink-950/30 to-[#1f0927]/90 border-pink-400/40 shadow-[0_25px_65px_rgba(244,114,182,0.35)]'
            }`}
          >
            {/* Outer Glow */}
            <div
              className="absolute inset-0 rounded-[2.5rem] opacity-30 group-hover:opacity-70 transition-opacity duration-500 blur-2xl pointer-events-none"
              style={{ backgroundColor: theme.palette.primary }}
            />

            {/* Photo Container */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-neutral-900">
              {/* BOSY's Real Photo 1 */}
              <img
                src="/images/bosy-1.jpg"
                alt="بوسي على الطرابيزة مع تورتة عيد ميلادها"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                style={{
                  filter: isDarkCyber
                    ? 'contrast(1.04) brightness(1.02)'
                    : 'contrast(1.02) saturate(1.04)',
                }}
              />

              {/* Atmospheric Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />

              {/* Top Luxury Badge */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs text-white z-20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-editorial tracking-wider font-semibold">BOSY'S CAKE</span>
              </div>

              {/* Realistic Birthday Cake Placed on the Table in Front of Bosy */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-25 flex flex-col items-center cursor-pointer select-none"
                onClick={handleBlowCandle}
                title="اضغطي على الشمعة علشان تطفيها! 🕯️"
              >
                {/* Interactive Candle Flame */}
                <div className="relative flex flex-col items-center">
                  <AnimatePresence>
                    {!isCandleBlown ? (
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{
                          scale: [1, 1.2, 0.95, 1.15, 1],
                          y: [0, -1, 1, 0],
                          filter: [
                            'drop-shadow(0 0 8px #f59e0b) drop-shadow(0 0 18px #ef4444)',
                            'drop-shadow(0 0 16px #f59e0b) drop-shadow(0 0 30px #ef4444)',
                            'drop-shadow(0 0 8px #f59e0b) drop-shadow(0 0 18px #ef4444)',
                          ],
                        }}
                        exit={{ opacity: 0, y: -25, scale: 0.2 }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="cursor-pointer"
                      >
                        <Flame className="w-10 h-10 sm:w-12 sm:h-12 text-amber-300 fill-amber-300" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0.9, 0], y: -35 }}
                        transition={{ duration: 1.8 }}
                        className="h-10 sm:h-12 flex items-center justify-center text-neutral-300 text-xs font-mono"
                      >
                        💨 ~ smoke ~
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Candle Wick & Candle Stick with Age */}
                  <div className="w-6 sm:w-7 h-16 sm:h-20 rounded-md bg-gradient-to-b from-amber-100 via-pink-400 to-rose-500 shadow-2xl border border-white/60 flex items-center justify-center mt-[-4px]">
                    <span className="font-editorial font-black text-white text-xs sm:text-sm drop-shadow">
                      {calculation.turningAge}
                    </span>
                  </div>
                </div>

                {/* 3D Cake Body on Table */}
                <div className="relative mt-[-6px] flex flex-col items-center">
                  {/* Top Frosting Layer */}
                  <div className="w-28 sm:w-36 h-7 sm:h-9 rounded-full bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 border-2 border-pink-300/80 shadow-md flex items-center justify-center">
                    <span className="text-[10px] sm:text-xs">🍓 🌸 🍓</span>
                  </div>
                  {/* Cake Middle Tier */}
                  <div className="w-32 sm:w-40 h-8 sm:h-10 bg-gradient-to-b from-rose-400 to-rose-600 rounded-lg mt-[-8px] border border-pink-300/60 shadow-lg flex items-center justify-center">
                    <span className="font-editorial text-[10px] sm:text-xs font-bold text-white tracking-widest drop-shadow">
                      HAPPY 21 BOSY
                    </span>
                  </div>
                  {/* Bottom Cake Stand / Plate */}
                  <div className="w-36 sm:w-48 h-3 sm:h-4 rounded-full bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 shadow-2xl border border-amber-300/60 mt-[-4px]" />
                </div>

                {/* Pulsing Hint Badge */}
                {!isCandleBlown && (
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-3 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-pink-400/50 text-pink-200 text-xs font-arabic shadow-lg flex items-center gap-1.5"
                  >
                    <Wind className="w-3.5 h-3.5 text-pink-300" />
                    <span>المسي الشمعة واطفيها! ✨</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Interactive Controls & Wish Card Below Photo */}
          <div className="mt-8 w-full max-w-lg text-center space-y-4">
            {!isCandleBlown ? (
              <motion.button
                onClick={handleBlowCandle}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-arabic font-bold text-base text-white shadow-[0_0_30px_rgba(244,114,182,0.5)] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                style={{
                  background: isDarkCyber
                    ? 'linear-gradient(135deg, #ec4899 0%, #9333ea 100%)'
                    : 'linear-gradient(135deg, #f472b6 0%, #be185d 100%)',
                }}
              >
                <Wind className="w-5 h-5 animate-pulse" />
                <span>اضغطي واطفي شمعتك يا بوسي! 🕯️</span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="p-6 rounded-3xl bg-gradient-to-br from-pink-950/70 to-purple-950/80 border border-pink-400/50 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-center gap-2 text-pink-300 font-bold text-lg mb-2 font-arabic">
                  <Heart className="w-5 h-5 fill-pink-400 text-pink-400 animate-pulse" />
                  <span>انطفت الشمعة واتمنت كوتي أمنيتها! ❤️</span>
                  <Heart className="w-5 h-5 fill-pink-400 text-pink-400 animate-pulse" />
                </div>

                <p className="font-arabic text-base sm:text-lg text-neutral-100 leading-relaxed">
                  يارب كل حاجة نفسك فيها تتحقق وسنتك الـ {calculation.turningAge} تكون أحلى وأجمل سنين عمرك يا كوتي يا أطيب قلب في الدنيا! 🌸✨
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center">
                  <button
                    onClick={handleRelight}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-pink-300 hover:text-white transition-colors cursor-pointer px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-pink-400/30"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ولعي الشمعة تاني علشان تتمني أمنية جديدة 🕯️</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
