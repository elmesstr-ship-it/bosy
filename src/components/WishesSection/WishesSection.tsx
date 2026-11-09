import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { BirthdayThemeConfig } from '../../birthday/types';
import type { BirthdayWish } from '../../birthday/birthdayMessages';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WishesSectionProps {
  theme: BirthdayThemeConfig;
  wishes: BirthdayWish[];
}

export const WishesSection: React.FC<WishesSectionProps> = ({ theme, wishes }) => {
  const [blessedIds, setBlessedIds] = useState<number[]>([]);

  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  const handleWishClick = (e: React.MouseEvent, wishId: number) => {
    if (!blessedIds.includes(wishId)) {
      setBlessedIds((prev) => [...prev, wishId]);
    }

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
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-pink-400/30 bg-white/5 backdrop-blur-md text-xs sm:text-sm text-pink-300 font-editorial tracking-widest uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRAYERS &amp; BLESSINGS • أمنيات صادقة</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-arabic text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            دعوة من القلب ليكي ❤️
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-arabic text-base sm:text-lg text-rose-200/80 max-w-lg mx-auto"
          >
            اضغطي على كل دعوة لتقولي (اللهم آمين) وتملي العالم بركة ✨
          </motion.p>
        </div>

        {/* Wishes Grid with Staggered Visual Treatment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish, index) => {
            const isBlessed = blessedIds.includes(wish.id);
            const isHighlighted = index === wishes.length - 1; // Last one spans or stands out

            return (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => handleWishClick(e, wish.id)}
                className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-500 overflow-hidden group select-none ${
                  isHighlighted ? 'md:col-span-2 lg:col-span-3 text-center' : ''
                } ${
                  isDarkCyber
                    ? isBlessed
                      ? 'bg-gradient-to-br from-fuchsia-950/80 to-purple-900/60 border-2 border-fuchsia-400 shadow-[0_10px_30px_rgba(236,72,153,0.4)]'
                      : 'bg-[#150522]/70 border border-fuchsia-500/30 hover:border-fuchsia-400/70 shadow-lg'
                    : isBlessed
                    ? 'bg-gradient-to-br from-pink-900/60 to-purple-900/50 border-2 border-pink-400 shadow-[0_10px_30px_rgba(244,114,182,0.4)]'
                    : 'bg-white/5 border border-pink-300/30 hover:border-pink-400/60 shadow-lg backdrop-blur-md'
                }`}
              >
                {/* Subtle Glow on Blessed */}
                {isBlessed && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none blur-lg"
                    style={{ backgroundColor: theme.palette.primary }}
                  />
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{wish.icon}</span>
                  {isBlessed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-arabic text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>اللهم آمين</span>
                    </span>
                  ) : (
                    <span className="text-xs font-editorial text-pink-300/60 group-hover:text-pink-300 transition-colors">
                      CLICK TO BLESS
                    </span>
                  )}
                </div>

                <h3 className="font-arabic font-bold text-lg sm:text-xl text-white group-hover:text-pink-200 transition-colors leading-relaxed">
                  {wish.text}
                </h3>

                <p className="font-editorial italic text-xs text-rose-200/60 mt-2 tracking-wide">
                  {wish.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
