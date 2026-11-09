import React from 'react';
import type { BirthdayThemeConfig } from '../../birthday/types';
import { Sparkles, Crown, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PhotoGalleryProps {
  theme: BirthdayThemeConfig;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ theme }) => {
  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  const handlePhotoClick = (e: React.MouseEvent) => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: theme.palette.particleColors,
      });
    } catch {}

    const customEvent = new CustomEvent('bosy-burst', {
      detail: { x: e.clientX, y: e.clientY, count: 18 },
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-pink-400/30 bg-black/40 text-xs text-pink-300 font-editorial tracking-widest uppercase">
            <Camera className="w-3.5 h-3.5" />
            <span>TIMELESS MEMORIES • ذكريات لا تُنسى</span>
          </div>

          <h2 className="font-arabic text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            ضحكتك وملامحك اللي بتنور الكون ❤️
          </h2>

          <p className="font-editorial italic text-sm sm:text-base text-rose-200/80 max-w-lg mx-auto">
            Every snapshot holds a story, every glance reflects unmatched grace.
          </p>
        </div>

        {/* The Two Distinct Compositions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* PHOTO ONE: Premium Editorial Frame */}
          <div className="flex flex-col items-center">
            <div
              onClick={handlePhotoClick}
              className={`relative cursor-pointer w-full max-w-sm aspect-[4/5] rounded-3xl p-3 border transition-transform duration-300 active:scale-95 ${
                isDarkCyber
                  ? 'bg-gradient-to-b from-[#250b38] to-[#0d0216] border-fuchsia-500/50 shadow-xl'
                  : 'bg-gradient-to-b from-pink-950/40 to-[#190822] border-pink-300/40 shadow-xl'
              }`}
            >
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-300/80 rounded-tl pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-300/80 rounded-tr pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-300/80 rounded-bl pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-300/80 rounded-br pointer-events-none" />

              {/* Inner Photo Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900">
                <img
                  src="/images/bosy-1.jpg"
                  alt="Bosy Portrait 1"
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                <div className="absolute top-3 right-3 bg-black/60 border border-white/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] text-white">
                  <Crown className="w-3 h-3 text-amber-300" />
                  <span className="font-editorial tracking-wider font-semibold">PORTRAIT I</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <p className="font-arabic font-bold text-white text-base sm:text-lg">
                    ضحكة تخطف القلب ✨
                  </p>
                  <p className="font-editorial text-xs text-pink-200/90 tracking-wide">
                    Grace in every single moment
                  </p>
                </div>
              </div>
            </div>

            <p className="font-arabic text-xs text-pink-300/70 mt-2.5">المسي الصورة لمفاجأة قلوب خاصة ❤️</p>
          </div>

          {/* PHOTO TWO: Soft Frame */}
          <div className="flex flex-col items-center">
            <div
              onClick={handlePhotoClick}
              className={`relative cursor-pointer w-full max-w-sm aspect-[4/5] rounded-[2rem] p-3 border transition-transform duration-300 active:scale-95 ${
                isDarkCyber
                  ? 'glass-panel-neon'
                  : 'glass-panel-gold'
              }`}
            >
              {/* Inner Photo Container */}
              <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-neutral-900">
                <img
                  src="/images/bosy-2.jpg"
                  alt="Bosy Portrait 2"
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/25" />

                <div className="absolute top-3 left-3 bg-black/60 border border-white/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] text-white">
                  <Sparkles className="w-3 h-3 text-pink-300" />
                  <span className="font-editorial tracking-wider font-semibold">PORTRAIT II</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <p className="font-arabic font-bold text-white text-base sm:text-lg">
                    نور في كل مكان تكوني فيه 🌸
                  </p>
                  <p className="font-editorial text-xs text-pink-200/90 tracking-wide">
                    A celestial presence that brightens everything
                  </p>
                </div>
              </div>
            </div>

            <p className="font-arabic text-xs text-pink-300/70 mt-2.5">صورتك الجميلة اللي بتنور كل مكان ✨</p>
          </div>
        </div>
      </div>
    </section>
  );
};
