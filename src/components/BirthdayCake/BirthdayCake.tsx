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
        particleCount: 90,
        spread: 100,
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

  const handleRelight = () => {
    setIsCandleBlown(false);
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/30 bg-white/5 backdrop-blur-md text-xs sm:text-sm text-pink-300 font-editorial tracking-widest uppercase">
            <Cake className="w-3.5 h-3.5" />
            <span>MAKE A WISH • تورتة عيد الميلاد والشموع</span>
          </div>

          <h2 className="font-arabic text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            اتمني أمنية من قلبك واطفي الشمعة يا بوسي 🎂✨
          </h2>

          <p className="font-arabic text-sm sm:text-base text-rose-200/90 max-w-xl mx-auto">
            لحظة خاصة جداً لعامك الـ {calculation.turningAge}، كل أمنية خير في بالك يارب تكون من نصيبك.
          </p>
        </div>

        {/* Two-Column Showcase: AI Cake Portrait & Interactive Candle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* AI Cake Portrait Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div
              className={`relative group w-full max-w-md aspect-[4/5] rounded-3xl p-3 sm:p-4 border transition-all duration-700 overflow-hidden ${
                isDarkCyber
                  ? 'bg-gradient-to-b from-fuchsia-950/60 to-purple-950/80 border-fuchsia-500/40 shadow-[0_20px_50px_rgba(236,72,153,0.3)]'
                  : 'bg-gradient-to-b from-pink-950/40 to-purple-950/60 border-pink-400/40 shadow-[0_20px_50px_rgba(244,114,182,0.3)]'
              }`}
            >
              {/* Image with subtle hover zoom */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900">
                <img
                  src="/images/bosy-ai-cake.jpg"
                  alt="Bosy Birthday Cake Portrait"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Lighting Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs text-white">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span className="font-editorial tracking-wider font-semibold">AI CELEBRATION</span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="font-arabic font-bold text-white text-lg sm:text-xl drop-shadow-md">
                    ضحكة تخطف القلوب في كل عام ❤️
                  </p>
                  <p className="font-editorial text-xs sm:text-sm text-pink-200/90 mt-0.5">
                    Bosy holding her glowing 21st birthday cake
                  </p>
                </div>
              </div>
            </div>
            <p className="font-arabic text-xs text-pink-300/70 mt-3 text-center">
              هدية تذكارية خاصة بتورتة عيد ميلادك المنورة 🌸
            </p>
          </motion.div>

          {/* Interactive Candle Blow-Out Stage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl border text-center transition-all duration-700 ${
              isDarkCyber
                ? 'bg-gradient-to-br from-[#1a082b]/90 via-[#0d0217]/95 to-[#160624]/90 border-fuchsia-500/30'
                : 'bg-gradient-to-br from-[#280f30]/85 via-[#16061e]/90 to-[#220b29]/85 border-pink-400/30'
            }`}
          >
            {/* Candle Graphic */}
            <div className="relative mb-6 cursor-pointer select-none" onClick={handleBlowCandle}>
              {/* Flame */}
              <AnimatePresence>
                {!isCandleBlown ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: [1, 1.15, 0.95, 1.1, 1],
                      filter: [
                        'drop-shadow(0 0 10px #f59e0b)',
                        'drop-shadow(0 0 25px #ef4444)',
                        'drop-shadow(0 0 12px #f59e0b)',
                      ],
                    }}
                    exit={{ opacity: 0, y: -20, scale: 0.3 }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                    className="flex flex-col items-center"
                  >
                    <Flame className="w-12 h-12 text-amber-400 fill-amber-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0.8, 0], y: -30 }}
                    transition={{ duration: 1.5 }}
                    className="h-12 flex items-center justify-center text-neutral-400 text-xs font-mono"
                  >
                    💨 ~ smoke ~
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle Stick with Age Number */}
              <div className="w-10 h-28 rounded-md bg-gradient-to-b from-pink-300 via-rose-400 to-pink-500 mx-auto shadow-lg border border-pink-200/50 flex flex-col items-center justify-center">
                <span className="font-editorial font-black text-white text-lg drop-shadow">
                  {calculation.turningAge}
                </span>
              </div>

              {/* Cake Top Base */}
              <div className="w-36 h-8 rounded-full bg-gradient-to-r from-amber-100 via-pink-200 to-amber-100 mx-auto mt-[-10px] shadow-md border border-pink-300/40" />
            </div>

            {/* Action Prompt */}
            {!isCandleBlown ? (
              <motion.button
                onClick={handleBlowCandle}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-full font-arabic font-bold text-sm sm:text-base text-white shadow-[0_0_30px_rgba(244,114,182,0.5)] transition-all cursor-pointer flex items-center gap-2"
                style={{
                  background: isDarkCyber
                    ? 'linear-gradient(135deg, #ec4899 0%, #9333ea 100%)'
                    : 'linear-gradient(135deg, #f472b6 0%, #be185d 100%)',
                }}
              >
                <Wind className="w-4 h-4 animate-pulse" />
                <span>اضغطي واطفي الشمعة! 🕯️</span>
              </motion.button>
            ) : (
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-white/10 border border-pink-400/40 backdrop-blur-md"
                >
                  <div className="flex items-center justify-center gap-1.5 text-pink-300 font-bold mb-1 font-arabic">
                    <Heart className="w-4 h-4 fill-pink-400 text-pink-400 animate-pulse" />
                    <span>انطفأت الشمعة وتحققت الأمنية بإذن الله!</span>
                    <Heart className="w-4 h-4 fill-pink-400 text-pink-400 animate-pulse" />
                  </div>
                  <p className="font-arabic text-sm text-neutral-200 leading-relaxed">
                    يارب كل حاجة نفسك فيها تتحقق وسنتك الجديدة تكون كلها فرحة يا كوتي ❤️
                  </p>
                </motion.div>

                <button
                  onClick={handleRelight}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>ولعي الشمعة تاني</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
