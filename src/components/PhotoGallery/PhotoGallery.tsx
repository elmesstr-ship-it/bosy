import React from 'react';
import { motion } from 'framer-motion';
import type { BirthdayThemeConfig } from '../../birthday/types';
import { Sparkles, Heart, Crown, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PhotoGalleryProps {
  theme: BirthdayThemeConfig;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ theme }) => {
  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  const handlePhotoClick = (e: React.MouseEvent) => {
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
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-pink-400/30 bg-white/5 backdrop-blur-md text-xs sm:text-sm text-pink-300 font-editorial tracking-widest uppercase"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>TIMELESS MEMORIES • ذكريات لا تُنسى</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-arabic text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            ضحكتك وملامحك اللي بتنور الكون ❤️
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-editorial italic text-base sm:text-lg text-rose-200/80 max-w-xl mx-auto"
          >
            Every snapshot holds a story, every glance reflects unmatched grace.
          </motion.p>
        </div>

        {/* The Two Distinct Compositions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* PHOTO ONE: Premium Editorial Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div
              onClick={(e) => handlePhotoClick(e)}
              className={`relative group cursor-pointer w-full max-w-md aspect-[4/5] rounded-3xl p-3 sm:p-4 transition-all duration-700 ${
                isDarkCyber
                  ? 'bg-gradient-to-b from-[#2e0e45]/70 via-[#180628]/80 to-[#0e021a]/90 shadow-[0_20px_60px_rgba(236,72,153,0.35)] border border-fuchsia-500/50'
                  : 'bg-gradient-to-b from-white/10 via-pink-500/5 to-purple-900/20 shadow-[0_25px_60px_rgba(244,114,182,0.3)] border border-pink-300/40'
              }`}
            >
              {/* Outer Glowing Border Effect */}
              <div
                className="absolute inset-0 rounded-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 blur-xl pointer-events-none"
                style={{ backgroundColor: theme.palette.primary }}
              />

              {/* Decorative Corner Ornaments */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-300/80 rounded-tl pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-300/80 rounded-tr pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-300/80 rounded-bl pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-300/80 rounded-br pointer-events-none" />

              {/* Inner Photo Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900">
                <img
                  src="/images/bosy-1.jpg"
                  alt="Bosy Portrait 1"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{
                    filter: isDarkCyber
                      ? 'contrast(1.04) brightness(1.02)'
                      : 'contrast(1.02) saturate(1.05)',
                  }}
                />

                {/* Subtle Cinematic Lighting Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/75 via-transparent to-black/20"
                />

                {/* Floating Badge on Photo */}
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs text-white">
                  <Crown className="w-3.5 h-3.5 text-amber-300" />
                  <span className="font-editorial tracking-wider font-semibold">PORTRAIT I</span>
                </div>

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="font-arabic font-bold text-white text-lg sm:text-xl drop-shadow-md">
                    ضحكة تخطف القلب ✨
                  </p>
                  <p className="font-editorial text-xs sm:text-sm text-pink-200/90 tracking-wide mt-0.5">
                    Grace in every single moment
                  </p>
                </div>
              </div>
            </div>

            <p className="font-arabic text-xs text-pink-300/70 mt-3">اضغطي على الصورة لاحتفال بوسي الخاص ❤️</p>
          </motion.div>

          {/* PHOTO TWO: Soft Glassmorphism & Crystal Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div
              onClick={(e) => handlePhotoClick(e)}
              className={`relative group cursor-pointer w-full max-w-md aspect-[4/5] rounded-[2.5rem] p-4 sm:p-5 transition-all duration-700 ${
                isDarkCyber
                  ? 'glass-panel-neon border-2 border-violet-500/50 shadow-[0_25px_65px_rgba(147,51,234,0.35)]'
                  : 'glass-panel-gold border-2 border-amber-200/40 shadow-[0_25px_65px_rgba(212,175,55,0.25)]'
              }`}
            >
              {/* Backlight Glow */}
              <div
                className="absolute inset-0 rounded-[2.5rem] opacity-35 group-hover:opacity-75 transition-opacity duration-500 blur-2xl pointer-events-none"
                style={{ backgroundColor: theme.palette.secondary }}
              />

              {/* Floating Hearts Emitter Indicator */}
              <div className="absolute -top-3 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 p-2.5 rounded-full shadow-lg border border-white/30 animate-bounce">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>

              {/* Inner Photo Container */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-neutral-900">
                <img
                  src="/images/bosy-2.jpg"
                  alt="Bosy Portrait 2"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{
                    filter: isDarkCyber
                      ? 'contrast(1.05) brightness(1.03)'
                      : 'contrast(1.02) saturate(1.04)',
                  }}
                />

                {/* Overlay Vignette */}
                <div
                  className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/25"
                />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs text-white">
                  <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                  <span className="font-editorial tracking-wider font-semibold">PORTRAIT II</span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="font-arabic font-bold text-white text-lg sm:text-xl drop-shadow-md">
                    نور في كل مكان تكوني فيه 🌸
                  </p>
                  <p className="font-editorial text-xs sm:text-sm text-pink-200/90 tracking-wide mt-0.5">
                    A celestial presence that brightens everything
                  </p>
                </div>
              </div>
            </div>

            <p className="font-arabic text-xs text-pink-300/70 mt-3">صورتك الجميلة اللي بتنور كل مكان ✨</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
