import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BirthdayThemeConfig, BirthdayCalculation } from '../../birthday/types';
import { Sparkles, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayIntroProps {
  theme: BirthdayThemeConfig;
  calculation: BirthdayCalculation;
  onEnterWorld: () => void;
}

export const BirthdayIntro: React.FC<BirthdayIntroProps> = ({ theme, calculation, onEnterWorld }) => {
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    // Stagger through cinematic reveal steps
    const timer1 = setTimeout(() => setStep(2), 2200);
    const timer2 = setTimeout(() => {
      setStep(3);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.5 },
          colors: theme.palette.particleColors,
        });
      } catch {}
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [theme]);

  // Letter by letter animation variants for "BOSY"
  const bosyLetters = 'BOSY'.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center px-4 overflow-hidden text-center select-none"
      style={{
        background: isDarkCyber
          ? 'radial-gradient(circle at center, #1b072c 0%, #08010f 100%)'
          : 'radial-gradient(circle at center, #240a2d 0%, #0d0312 100%)',
      }}
    >
      {/* Ambient background orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 pointer-events-none"
        style={{ backgroundColor: theme.palette.primary }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ backgroundColor: theme.palette.secondary }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-6">
        {/* Step 1: "Today is not an ordinary day..." */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
              transition={{ duration: 0.9 }}
              className="space-y-4"
            >
              <span className="font-editorial text-sm sm:text-base tracking-[0.3em] uppercase text-pink-300/80">
                A MOMENT FROZEN IN TIME
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light leading-snug">
                Today is not an ordinary day...
              </h1>
            </motion.div>
          )}

          {/* Step 2: "Because someone extraordinary was born." */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -25, filter: 'blur(8px)' }}
              transition={{ duration: 0.9 }}
              className="space-y-4"
            >
              <span className="font-editorial text-sm sm:text-base tracking-[0.3em] uppercase text-purple-300/80">
                THE UNIVERSE CELEBRATES
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-100 font-light leading-snug">
                Because someone extraordinary was born.
              </h2>
            </motion.div>
          )}

          {/* Step 3: Grand reveal of BOSY + Arabic greeting + Age badge + Button */}
          {step >= 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="flex flex-col items-center gap-6"
            >
              {/* BOSY Animated Letters - strictly dir="ltr" so RTL never reverses order */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                dir="ltr"
                className="flex flex-row items-center justify-center gap-2 sm:gap-4 font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-widest text-transparent bg-clip-text drop-shadow-[0_0_35px_rgba(244,114,182,0.6)]"
                style={{
                  backgroundImage: isDarkCyber
                    ? 'linear-gradient(135deg, #ffffff 0%, #ec4899 50%, #a855f7 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f472b6 40%, #fde047 100%)',
                }}
              >
                {bosyLetters.map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              {/* Arabic Name Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="font-arabic text-2xl sm:text-3xl md:text-4xl text-pink-200 font-bold tracking-wide"
              >
                كل سنة وانتي طيبة يا بوسي ❤️
              </motion.div>

              {/* Cinematic Age Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8, type: 'spring' }}
                className="px-6 py-2.5 rounded-full border border-pink-400/40 bg-white/5 backdrop-blur-xl shadow-[0_0_30px_rgba(244,114,182,0.3)] flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
                <span className="font-editorial text-lg sm:text-xl md:text-2xl font-bold tracking-[0.2em] text-white">
                  {theme.introAgeText || `${calculation.turningAge} YEARS OF MAGIC`}
                </span>
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
              </motion.div>

              {/* Enter Your World Button */}
              <motion.button
                onClick={onEnterWorld}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(244, 114, 182, 0.8)' }}
                whileTap={{ scale: 0.96 }}
                className="mt-4 px-8 sm:px-12 py-3.5 sm:py-4 rounded-full font-editorial font-bold text-base sm:text-lg tracking-widest text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all cursor-pointer flex items-center gap-3"
                style={{
                  background: isDarkCyber
                    ? 'linear-gradient(135deg, #ec4899 0%, #9333ea 100%)'
                    : 'linear-gradient(135deg, #f472b6 0%, #be185d 100%)',
                }}
              >
                <span>ENTER YOUR WORLD</span>
                <Sparkles className="w-5 h-5 text-amber-200" />
                <ArrowDown className="w-4 h-4 ml-1 animate-bounce" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip Button for quick dev or impatient visitor */}
      {step < 3 && (
        <button
          onClick={() => setStep(3)}
          className="absolute bottom-6 text-xs text-neutral-400/60 hover:text-white transition-colors cursor-pointer px-4 py-1.5 rounded-full border border-white/10"
        >
          Skip Intro ⏭️
        </button>
      )}
    </motion.div>
  );
};
