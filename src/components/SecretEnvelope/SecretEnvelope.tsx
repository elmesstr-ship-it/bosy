import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayThemeConfig } from '../../birthday/types';
import { Sparkles, Heart } from 'lucide-react';

interface SecretEnvelopeProps {
  theme: BirthdayThemeConfig;
  onOpenComplete: () => void;
}

export const SecretEnvelope: React.FC<SecretEnvelopeProps> = ({ theme, onOpenComplete }) => {
  const [stage, setStage] = useState<'idle' | 'opening' | 'rising' | 'bursting' | 'complete'>('idle');

  const handleEnvelopeClick = () => {
    if (stage !== 'idle') return;

    setStage('opening');

    // Trigger celebration confetti and hearts
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: theme.palette.particleColors,
      });
    } catch {
      // Ignore if unavailable
    }

    // Step 2: Rising letter
    setTimeout(() => {
      setStage('rising');
      try {
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.5 },
          colors: ['#f472b6', '#c084fc', '#ffffff', '#fb7185', '#fef08a'],
        });
      } catch {}
    }, 900);

    // Step 3: Burst of light & transition
    setTimeout(() => {
      setStage('bursting');
    }, 2200);

    // Step 4: Complete transition to next stage
    setTimeout(() => {
      setStage('complete');
      onOpenComplete();
    }, 3100);
  };

  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.15, filter: 'blur(20px)' }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-4 select-none"
          style={{
            background: isDarkCyber
              ? 'radial-gradient(ellipse at center, #1b072c 0%, #08010f 100%)'
              : 'radial-gradient(ellipse at center, #2e1038 0%, #110517 100%)',
          }}
        >
          {/* High-Performance Radial Ambient Lighting */}
          <div
            className="absolute inset-0 pointer-events-none opacity-35"
            style={{
              background: `radial-gradient(circle at center, ${theme.palette.primary} 0%, transparent 65%)`,
            }}
          />

          {/* Heading Text Above Envelope */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-8 sm:mb-10 z-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/30 bg-white/5 backdrop-blur-md mb-3 text-xs sm:text-sm tracking-widest text-pink-200">
              <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>A SPECIAL SURPRISE AWAITS</span>
              <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <h2 className="font-editorial text-xl sm:text-2xl md:text-3xl text-rose-100 tracking-wide font-light">
              Someone has prepared something special for you...
            </h2>
          </motion.div>

          {/* 3D Envelope Container */}
          <motion.div
            onClick={handleEnvelopeClick}
            whileHover={stage === 'idle' ? { scale: 1.03 } : {}}
            whileTap={stage === 'idle' ? { scale: 0.98 } : {}}
            animate={
              stage === 'opening'
                ? {
                    x: [0, -4, 4, -4, 4, 0],
                    transition: { duration: 0.4 },
                  }
                : {}
            }
            className="relative cursor-pointer perspective-1000 z-20"
          >
            {/* The Envelope Box */}
            <div
              className={`relative w-[310px] sm:w-[380px] md:w-[440px] h-[200px] sm:h-[240px] md:h-[270px] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] transform-style-3d transition-all duration-700 ${
                stage !== 'idle' ? 'shadow-[0_0_80px_rgba(244,114,182,0.6)]' : ''
              }`}
              style={{
                background: isDarkCyber
                  ? 'linear-gradient(135deg, #240c36 0%, #150522 100%)'
                  : 'linear-gradient(135deg, #fff7fa 0%, #fae8f0 100%)',
                border: isDarkCyber ? '1px solid rgba(236,72,153,0.4)' : '1px solid rgba(244,114,182,0.3)',
              }}
            >
              {/* Envelope Inner Lining Texture */}
              <div
                className="absolute inset-2 rounded-xl opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(#f472b6 1px, transparent 1px), radial-gradient(#c084fc 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px',
                }}
              />

              {/* The Rising Letter (Hidden inside, slides up) */}
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={
                  stage === 'rising' || stage === 'bursting'
                    ? { y: -140, opacity: 1, scale: 1.05 }
                    : stage === 'opening'
                    ? { y: -20, opacity: 0.8 }
                    : { y: 0, opacity: 0 }
                }
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute left-4 right-4 top-4 h-[180px] sm:h-[210px] md:h-[230px] rounded-xl p-5 flex flex-col justify-between shadow-2xl z-10"
                style={{
                  background: 'linear-gradient(135deg, #fffaf5 0%, #fdf2f8 100%)',
                  border: '1px solid rgba(244, 114, 182, 0.4)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.35)',
                }}
              >
                <div className="flex items-center justify-between border-b border-pink-200 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
                    <span className="font-editorial text-xs font-semibold text-pink-800 tracking-wider">
                      FOR BOSY (بوسي)
                    </span>
                  </div>
                  <span className="text-[11px] font-arabic text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full font-medium">
                    يوم مميز جداً
                  </span>
                </div>

                <div className="text-center py-2">
                  <p className="font-arabic font-bold text-base sm:text-lg text-neutral-900 leading-relaxed">
                    كل سنة وانتي طيبة يا أجمل بوسي ❤️
                  </p>
                  <p className="font-editorial italic text-xs text-pink-700 mt-1">
                    Your magical universe is opening now...
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-pink-400 text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>✨ ✨ ✨</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </motion.div>

              {/* Envelope Flap (Triangle with 3D Flip) */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={
                  stage !== 'idle'
                    ? { rotateX: 180, zIndex: 1 }
                    : { rotateX: 0, zIndex: 30 }
                }
                transition={{ duration: 0.85, ease: 'easeInOut' }}
                style={{
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                }}
                className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl overflow-visible pointer-events-none"
              >
                {/* SVG Flap Shape */}
                <svg
                  className="w-full h-[100px] sm:h-[120px] md:h-[135px] drop-shadow-md"
                  viewBox="0 0 440 135"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="0,0 440,0 220,135"
                    fill={isDarkCyber ? '#2f0f46' : '#fcedf4'}
                    stroke={isDarkCyber ? '#ec4899' : '#f472b6'}
                    strokeWidth="1"
                  />
                </svg>

                {/* Wax Seal placed at the bottom point of the flap */}
                <div
                  className="absolute left-1/2 -bottom-2 -translate-x-1/2 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.4)] pointer-events-auto transition-transform"
                  style={{
                    backgroundColor: theme.envelope.waxColor,
                    boxShadow: `0 0 25px ${theme.envelope.waxGlow}`,
                    border: '2px solid rgba(255,255,255,0.4)',
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      filter: ['drop-shadow(0 0 2px white)', 'drop-shadow(0 0 8px white)', 'drop-shadow(0 0 2px white)'],
                    }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="flex items-center justify-center"
                  >
                    <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Envelope Bottom Pocket Fold (Covers rising card bottom) */}
              <div
                className="absolute bottom-0 left-0 right-0 h-2/3 rounded-b-2xl pointer-events-none z-20 overflow-hidden"
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 440 180"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="0,180 440,180 220,50"
                    fill={isDarkCyber ? '#1c082b' : '#f9dfea'}
                    fillOpacity="0.95"
                    stroke={isDarkCyber ? '#ec4899' : '#f472b6'}
                    strokeWidth="0.8"
                    strokeOpacity="0.4"
                  />
                </svg>
              </div>

              {/* Front Label on the envelope */}
              <div className="absolute bottom-4 left-0 right-0 text-center z-25 pointer-events-none">
                <span
                  className={`font-arabic text-sm sm:text-base font-bold ${
                    isDarkCyber ? 'text-pink-300' : 'text-neutral-700'
                  }`}
                >
                  BOSY (بوسي) ❤️
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text Below Envelope */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center mt-8 sm:mt-10 z-20"
          >
            <p className="font-arabic text-lg sm:text-xl md:text-2xl font-bold text-rose-200 mb-2">
              رسالة مخصوص لبوسي ❤️
            </p>
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="font-arabic text-xs sm:text-sm text-pink-300/80 bg-white/5 border border-pink-400/20 px-4 py-1.5 rounded-full inline-block backdrop-blur-sm"
            >
              اضغطي هنا وافتحي مفاجأتك ✨
            </motion.p>
          </motion.div>

          {/* Full-screen Light Burst on transition */}
          <AnimatePresence>
            {stage === 'bursting' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center bg-white"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(244,114,182,0.8) 40%, rgba(192,132,252,0.4) 70%, transparent 100%)',
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
