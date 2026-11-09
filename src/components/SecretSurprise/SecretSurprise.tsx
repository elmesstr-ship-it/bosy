import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BirthdayThemeConfig } from '../../birthday/types';
import { Heart, Sparkles, X, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SecretSurpriseProps {
  theme: BirthdayThemeConfig;
  message: string;
}

export const SecretSurprise: React.FC<SecretSurpriseProps> = ({ theme, message }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (e: React.MouseEvent) => {
    setIsOpen(true);

    try {
      // Magnificent confetti celebration
      confetti({
        particleCount: 120,
        spread: 100,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ['#ff71ce', '#01cdfe', '#05ffa1', '#b967ff', '#fffb96'],
      });
    } catch {}

    const customEvent = new CustomEvent('bosy-burst', {
      detail: { x: e.clientX, y: e.clientY, count: 35 },
    });
    window.dispatchEvent(customEvent);
  };

  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  return (
    <>
      {/* Subtly placed easter egg trigger in between sections */}
      <div className="relative py-8 flex justify-center items-center select-none">
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.25, rotate: 12 }}
          whileTap={{ scale: 0.9 }}
          title="همسة سرية مخصوصة ليكي... اضغطي هنا 🤫"
          className="relative group p-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-pink-400/20 hover:border-pink-400/60 transition-all cursor-pointer shadow-lg backdrop-blur-md"
        >
          {/* Subtle Glowing Pulse */}
          <div
            className="absolute inset-0 rounded-full blur-md opacity-30 group-hover:opacity-80 transition-opacity duration-300 animate-pulse"
            style={{ backgroundColor: theme.palette.primary }}
          />

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ repeat: Infinity, duration: 2.8 }}
            className="relative flex items-center justify-center text-pink-400"
          >
            <Sparkles className="w-5 h-5 group-hover:text-amber-300 transition-colors" />
          </motion.div>
        </motion.button>
      </div>

      {/* Secret Message Celebration Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg select-none"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-lg w-full rounded-3xl p-8 sm:p-10 text-center border shadow-2xl overflow-hidden ${
                isDarkCyber
                  ? 'bg-gradient-to-br from-[#1f0a2d] to-[#0a0212] border-fuchsia-500/50 shadow-[0_0_60px_rgba(236,72,153,0.5)]'
                  : 'bg-gradient-to-br from-[#2d1134] to-[#120417] border-pink-400/40 shadow-[0_0_60px_rgba(244,114,182,0.4)]'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 left-4 p-2 rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Gift Icon Header */}
              <div className="mx-auto w-16 h-16 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center mb-6 shadow-inner">
                <Gift className="w-8 h-8 text-pink-400 animate-bounce" />
              </div>

              <span className="font-editorial text-xs uppercase tracking-widest text-pink-300 block mb-2">
                A HIDDEN WHISPER FOR BOSY • سر صغير
              </span>

              {/* The Secret Message */}
              <h3 className="font-arabic font-bold text-xl sm:text-2xl md:text-3xl text-white leading-relaxed mb-6">
                "{message}"
              </h3>

              <div className="flex items-center justify-center gap-2 text-pink-400 text-sm font-arabic">
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
                <span>دائمًا وأبدًا يا بوسي</span>
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-8 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white font-arabic transition-all cursor-pointer"
              >
                إغلاق المفاجأة ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
