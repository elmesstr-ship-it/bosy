import React from 'react';
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
        particleCount: 50,
        spread: 70,
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
    <section className="relative py-16 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-pink-400/30 bg-black/40 text-xs text-pink-300 font-editorial tracking-widest uppercase">
            <Feather className="w-3.5 h-3.5" />
            <span>WORDS FROM THE SOUL • رسالة من القلب</span>
          </div>
          <h2 className="font-arabic text-2xl sm:text-3xl font-bold text-white">
            رسالة خاصة مكتوبة ليكي بحب ❤️
          </h2>
        </div>

        {/* The Letter Parchment */}
        <div
          className={`relative rounded-3xl p-6 sm:p-10 border transition-all ${theme.letterCardStyle.containerClass}`}
        >
          {/* Decorative Corner Filigrees */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-pink-300/40 rounded-tl pointer-events-none" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-pink-300/40 rounded-tr pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-pink-300/40 rounded-bl pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-pink-300/40 rounded-br pointer-events-none" />

          {/* Letter Header Ribbon */}
          <div className="flex items-center justify-between border-b border-pink-400/20 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-pink-400" />
              <span dir="ltr" className="font-editorial text-xs sm:text-sm text-pink-200 tracking-wider">
                FOR BOSY (بوسي)
              </span>
            </div>

            <div className="font-arabic text-xs text-pink-300/80 bg-white/5 px-2.5 py-0.5 rounded-full border border-pink-400/20">
              {content.letterDate}
            </div>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-4 text-right leading-relaxed font-arabic text-neutral-100 text-sm sm:text-base md:text-lg">
            {content.letterBody.map((paragraph, index) => {
              const isGreeting = index === 0;

              return (
                <p
                  key={index}
                  className={`${
                    isGreeting
                      ? 'text-lg sm:text-xl md:text-2xl font-bold text-rose-300 border-r-4 border-pink-500 pr-3 mb-2'
                      : 'text-neutral-200 font-normal leading-relaxed'
                  }`}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Wax Stamp & Signature Footer */}
          <div className="mt-8 pt-6 border-t border-pink-400/20 flex items-center justify-between gap-4">
            <div className="text-right">
              <p className="font-arabic text-[11px] text-neutral-400">كتبت بكل حب لهذه الذكرى الخالدة</p>
              <p className="font-editorial text-xs sm:text-sm font-semibold text-pink-300">{content.letterSignoff}</p>
            </div>

            {/* Clickable Wax Stamp */}
            <div
              onClick={handleWaxStampClick}
              title="المسي الختم للمباركة! ❤️"
              className="relative cursor-pointer flex items-center justify-center w-13 h-13 rounded-full shadow-lg border-2 border-white/50 active:scale-95 transition-transform"
              style={{
                backgroundColor: theme.envelope.waxColor,
              }}
            >
              <div className="flex flex-col items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
                <span dir="ltr" className="text-[8px] font-editorial text-white/90 font-bold tracking-tighter">
                  BOSY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
