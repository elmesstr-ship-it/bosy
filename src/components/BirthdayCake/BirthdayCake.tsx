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
        particleCount: 60,
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

  const handleRelight = () => {
    setIsCandleBlown(false);
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-pink-400/30 bg-black/40 text-xs text-pink-300 font-editorial tracking-widest uppercase">
            <Cake className="w-3.5 h-3.5" />
            <span>MAKE A WISH • تورتة بوسي والشموع</span>
          </div>

          <h2 className="font-arabic text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            اتمني أمنية من قلبك واطفي الشمعة يا بوسي 🎂✨
          </h2>

          <p className="font-arabic text-xs sm:text-sm md:text-base text-rose-200/90 max-w-lg mx-auto">
            التورتة على طرابيزتك والشمعة منورة ليكي... اضغطي على الشمعة علشان تطفيها وتتمني أمنيتك لسن الـ {calculation.turningAge}!
          </p>
        </div>

        {/* The Interactive Composition: Bosy at her cafe table with cake and candle */}
        <div className="flex flex-col items-center">
          <div
            className={`relative w-full max-w-md aspect-[4/5] rounded-[2rem] p-3 border shadow-xl overflow-hidden ${
              isDarkCyber
                ? 'bg-gradient-to-b from-[#240b38] to-[#0d0216] border-fuchsia-500/50'
                : 'bg-gradient-to-b from-pink-950/40 to-[#190822] border-pink-400/40'
            }`}
          >
            {/* Photo Container */}
            <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-neutral-900">
              <img
                src="/images/bosy-1.jpg"
                alt="بوسي على الطرابيزة مع تورتة عيد ميلادها"
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />

              {/* Atmospheric Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />

              {/* Top Luxury Badge */}
              <div className="absolute top-3 right-3 bg-black/60 border border-white/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] text-white z-20">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span className="font-editorial tracking-wider font-semibold">BOSY'S CAKE</span>
              </div>

              {/* Realistic Birthday Cake Placed on the Table in Front of Bosy */}
              <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 z-25 flex flex-col items-center cursor-pointer select-none active:scale-95 transition-transform"
                onClick={handleBlowCandle}
                title="اضغطي على الشمعة علشان تطفيها! 🕯️"
              >
                {/* Interactive Candle Flame */}
                <div className="relative flex flex-col items-center">
                  <AnimatePresence>
                    {!isCandleBlown ? (
                      <div className="animate-pulse">
                        <Flame className="w-9 h-9 sm:w-11 sm:h-11 text-amber-300 fill-amber-300 drop-shadow-[0_0_12px_#f59e0b]" />
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0.9, 0], y: -25 }}
                        transition={{ duration: 1.5 }}
                        className="h-9 sm:h-11 flex items-center justify-center text-neutral-300 text-xs font-mono"
                      >
                        💨 ~ smoke ~
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Candle Wick & Candle Stick with Age */}
                  <div className="w-6 sm:w-7 h-14 sm:h-16 rounded-md bg-gradient-to-b from-amber-100 via-pink-400 to-rose-500 shadow-lg border border-white/60 flex items-center justify-center mt-[-4px]">
                    <span className="font-editorial font-black text-white text-xs drop-shadow">
                      {calculation.turningAge}
                    </span>
                  </div>
                </div>

                {/* 3D Cake Body on Table */}
                <div className="relative mt-[-5px] flex flex-col items-center">
                  <div className="w-28 sm:w-32 h-6 sm:h-7 rounded-full bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 border border-pink-300 shadow-md flex items-center justify-center">
                    <span className="text-[10px]">🍓 🌸 🍓</span>
                  </div>
                  <div className="w-32 sm:w-36 h-7 sm:h-8 bg-gradient-to-b from-rose-400 to-rose-600 rounded-lg mt-[-6px] border border-pink-300/60 shadow flex items-center justify-center">
                    <span className="font-editorial text-[10px] font-bold text-white tracking-widest drop-shadow">
                      HAPPY 21 BOSY
                    </span>
                  </div>
                  <div className="w-36 sm:w-42 h-3 rounded-full bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 shadow-lg border border-amber-300/60 mt-[-3px]" />
                </div>

                {/* Pulsing Hint Badge */}
                {!isCandleBlown && (
                  <div className="mt-2.5 px-3 py-0.5 rounded-full bg-black/80 border border-pink-400/50 text-pink-200 text-[11px] font-arabic shadow flex items-center gap-1">
                    <Wind className="w-3 h-3 text-pink-300" />
                    <span>المسي الشمعة واطفيها! ✨</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Controls & Wish Card Below Photo */}
          <div className="mt-6 w-full max-w-md text-center space-y-3">
            {!isCandleBlown ? (
              <button
                onClick={handleBlowCandle}
                className="w-full sm:w-auto px-7 py-3 rounded-full font-arabic font-bold text-sm text-white shadow-lg transition-transform active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
                style={{
                  background: isDarkCyber
                    ? 'linear-gradient(135deg, #ec4899 0%, #9333ea 100%)'
                    : 'linear-gradient(135deg, #f472b6 0%, #be185d 100%)',
                }}
              >
                <Wind className="w-4 h-4" />
                <span>اضغطي واطفي شمعتك يا بوسي! 🕯️</span>
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-pink-950/80 to-purple-950/90 border border-pink-400/50 shadow-xl"
              >
                <div className="flex items-center justify-center gap-1.5 text-pink-300 font-bold text-base mb-1.5 font-arabic">
                  <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                  <span>انطفت الشمعة واتمنت كوتي أمنيتها! ❤️</span>
                  <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
                </div>

                <p className="font-arabic text-sm text-neutral-100 leading-relaxed">
                  يارب كل حاجة نفسك فيها تتحقق وسنتك الـ {calculation.turningAge} تكون أحلى وأجمل سنين عمرك يا كوتي يا أطيب قلب في الدنيا! 🌸✨
                </p>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-center">
                  <button
                    onClick={handleRelight}
                    className="inline-flex items-center gap-1 text-xs text-pink-300 hover:text-white transition-colors cursor-pointer px-3.5 py-1 rounded-full bg-white/10 border border-pink-400/30"
                  >
                    <RotateCcw className="w-3 h-3" />
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
