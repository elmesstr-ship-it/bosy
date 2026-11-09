import React from 'react';
import { motion } from 'framer-motion';
import type { BirthdayThemeConfig } from '../../birthday/types';
import { getBirthdayContent } from '../../birthday/birthdayMessages';
import { Heart, Feather, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayLetterProps {
  theme: BirthdayThemeConfig;
  content: ReturnType<typeof getBirthdayContent>;
}

export const BirthdayLetter: React.FC<BirthdayLetterProps> = ({ theme, content }) => {

  const handleWaxStampClick = (e: React.MouseEvent) => {
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
      detail: { x: e.clientX, y: e.clientY, count: 22 },
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[160px] opacity-25 pointer-events-none"
        style={{ backgroundColor: theme.palette.primary }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-pink-400/30 bg-white/5 backdrop-blur-md text-xs sm:text-sm text-pink-300 font-editorial tracking-widest uppercase">
            <Feather className="w-3.5 h-3.5" />
            <span>WORDS FROM THE SOUL • رسالة من القلب</span>
          </div>
          <h2 className="font-arabic text-3xl sm:text-4xl font-bold text-white">
            رسالة خاصة مكتوبة ليكي بحب ❤️
          </h2>
        </div>

        {/* The Letter Parchment / Luxury Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className={`relative rounded-3xl p-6 sm:p-10 md:p-14 overflow-hidden transition-all duration-700 ${theme.letterCardStyle.containerClass}`}
        >
          {/* Decorative Corner Filigrees */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-pink-300/40 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-pink-300/40 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-pink-300/40 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-pink-300/40 rounded-br-xl pointer-events-none" />

          {/* Letter Header Ribbon */}
          <div className="flex items-center justify-between border-b border-pink-400/20 pb-6 mb-8">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-pink-400" />
              <span className="font-editorial text-sm sm:text-base text-pink-200 tracking-wider">
                FOR BOSY (بوسي)
              </span>
            </div>

            <div className="font-arabic text-xs sm:text-sm text-pink-300/80 bg-white/5 px-3 py-1 rounded-full border border-pink-400/20">
              {content.letterDate}
            </div>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-6 text-right leading-loose font-arabic text-neutral-100 text-base sm:text-lg md:text-xl">
            {content.letterBody.map((paragraph, index) => {
              const isGreeting = index === 0;
              const isSignoff = index === content.letterBody.length - 1;

              return (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * index, duration: 0.6 }}
                  className={`${
                    isGreeting
                      ? 'text-xl sm:text-2xl md:text-3xl font-bold text-rose-300 font-editorial-arabic border-r-4 border-pink-500 pr-4'
                      : isSignoff
                      ? 'text-xl sm:text-2xl font-editorial font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 pt-6 text-center tracking-widest'
                      : 'text-neutral-200 font-normal leading-relaxed'
                  }`}
                >
                  {paragraph}
                </motion.p>
              );
            })}
          </div>

          {/* Wax Stamp & Signature Footer */}
          <div className="mt-12 pt-8 border-t border-pink-400/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-right">
              <p className="font-arabic text-xs text-neutral-400">كتبت خصيصاً لهذه الذكرى الخالدة</p>
              <p className="font-editorial text-sm font-semibold text-pink-300">{content.letterSignoff}</p>
            </div>

            {/* Clickable Interactive Wax Stamp */}
            <motion.div
              onClick={handleWaxStampClick}
              whileHover={{ scale: 1.1, rotate: 6 }}
              whileTap={{ scale: 0.95 }}
              title="اضغطي على الختم للمباركة! ❤️"
              className="relative cursor-pointer flex items-center justify-center w-16 h-16 rounded-full shadow-[0_4px_25px_rgba(244,114,182,0.5)] border-2 border-white/50"
              style={{
                backgroundColor: theme.envelope.waxColor,
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
                <span className="text-[9px] font-editorial text-white/90 font-bold tracking-tighter">
                  BOSY
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
