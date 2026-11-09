import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';
import { Music, Volume2, VolumeX } from 'lucide-react';
import type { BirthdayThemeConfig } from '../../birthday/types';

interface BackgroundMusicPillProps {
  theme: BirthdayThemeConfig;
}

export const BackgroundMusicPill: React.FC<BackgroundMusicPillProps> = ({ theme }) => {
  const { isBgPlaying, toggleBgSong, isBosySongPlaying } = useAudio();

  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  return (
    <div className="fixed top-18 right-3 sm:right-6 z-40 select-none">
      <motion.button
        onClick={toggleBgSong}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="موسيقى الاحتفال الأجنبية (Go shawty it's your birthday)"
        className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border shadow-xl backdrop-blur-xl transition-all cursor-pointer ${
          isBgPlaying
            ? isDarkCyber
              ? 'bg-fuchsia-950/70 border-fuchsia-400/60 text-fuchsia-200 shadow-[0_0_20px_rgba(236,72,153,0.4)]'
              : 'bg-pink-950/70 border-pink-400/60 text-pink-200 shadow-[0_0_20px_rgba(244,114,182,0.4)]'
            : 'bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white'
        }`}
      >
        <div className="relative">
          <Music className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isBgPlaying ? 'animate-bounce text-pink-300' : ''}`} />
          {isBgPlaying && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="font-editorial text-[10px] sm:text-xs font-bold tracking-wider leading-none">
            {isBgPlaying ? "IT'S YOUR BIRTHDAY 🎶" : 'PLAY BIRTHDAY BEAT'}
          </span>
          <span className="text-[9px] text-neutral-300/80 font-mono leading-none mt-0.5 hidden sm:inline">
            {isBosySongPlaying ? '(متوقفة مؤقتاً لأغنية بوسي)' : '50 Cent Trend'}
          </span>
        </div>

        <div className="p-1 rounded-full bg-white/10 ml-1">
          {isBgPlaying ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        </div>
      </motion.button>
    </div>
  );
};
