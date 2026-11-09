import React from 'react';
import { motion } from 'framer-motion';
import type { BirthdayThemeConfig } from '../../birthday/types';
import { useAudio } from '../../context/AudioContext';
import { Play, Pause, Volume2, VolumeX, Disc, ExternalLink, Music, Sparkles } from 'lucide-react';

interface MusicPlayerProps {
  theme: BirthdayThemeConfig;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ theme }) => {
  const {
    isBosySongPlaying,
    toggleBosySong,
    bosyCurrentTime,
    bosyDuration,
    seekBosySong,
    bosyVolume,
    setBosyVolume,
    isBosyMuted,
    toggleBosyMute,
  } = useAudio();

  // Official streaming links
  const officialLinks = {
    youtube: 'https://www.youtube.com/watch?v=HhbmEicUOhg&t=79s',
    anghami: 'https://play.anghami.com/search/تفوت%20ألف%20سنة%20وأنا%20زي%20ما%20أنا',
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/30 bg-white/5 backdrop-blur-md text-xs sm:text-sm text-pink-300 font-editorial tracking-widest uppercase">
            <Music className="w-3.5 h-3.5" />
            <span>EXCLUSIVE SOUNDTRACK • أغنية اليوم لبوسي</span>
          </div>

          <h2 className="font-arabic text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            أغنية اليوم لبوسي ❤️
          </h2>

          <p className="font-arabic text-sm sm:text-base md:text-lg text-rose-200/90 max-w-xl mx-auto">
            أغنية تفضل تفكرنا باللحظة دي مهما عدت سنين.
          </p>
        </div>

        {/* Music Player Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`relative rounded-3xl p-6 sm:p-10 border transition-all duration-700 ${
            isDarkCyber
              ? 'bg-gradient-to-br from-[#1a082b]/95 via-[#0e021a]/95 to-[#1e072a]/95 border-fuchsia-500/40 shadow-[0_25px_60px_rgba(236,72,153,0.35)]'
              : 'bg-gradient-to-br from-[#2a1033]/90 via-[#190822]/95 to-[#280c2e]/90 border-pink-400/30 shadow-[0_25px_60px_rgba(244,114,182,0.25)]'
          }`}
        >
          {/* Subtle Ambient Pulse behind player */}
          <div
            className={`absolute inset-0 rounded-3xl blur-2xl opacity-20 pointer-events-none transition-opacity duration-1000 ${
              isBosySongPlaying ? 'opacity-40 animate-pulse' : 'opacity-10'
            }`}
            style={{ backgroundColor: theme.palette.primary }}
          />

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* Rotating Vinyl / Album Art */}
            <div className="relative group select-none">
              <motion.div
                animate={isBosySongPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={isBosySongPlaying ? { repeat: Infinity, duration: 6, ease: 'linear' } : { duration: 0.5 }}
                className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900 p-2 shadow-2xl flex items-center justify-center border-4 border-neutral-700/60 relative"
              >
                {/* Vinyl Grooves */}
                <div className="w-full h-full rounded-full border border-neutral-600/40 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-neutral-600/40 flex items-center justify-center">
                    {/* Center Label */}
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center text-center p-2 shadow-inner"
                      style={{
                        background: isDarkCyber
                          ? 'linear-gradient(135deg, #ec4899 0%, #9333ea 100%)'
                          : 'linear-gradient(135deg, #f472b6 0%, #be185d 100%)',
                      }}
                    >
                      <Disc className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '4s' }} />
                      <span className="text-[10px] font-editorial font-bold text-white mt-1">BOSY</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tonearm representation */}
              <div
                className={`absolute -top-3 -right-2 w-6 h-12 border-r-2 border-t-2 border-amber-300/80 rounded-tr-lg transform origin-top-right transition-transform duration-500 pointer-events-none ${
                  isBosySongPlaying ? 'rotate-12' : '-rotate-12 opacity-60'
                }`}
              />
            </div>

            {/* Track Info & Interactive Controls */}
            <div className="flex-1 w-full space-y-4 text-right">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-[11px] font-arabic text-pink-300 mb-2">
                  <span>المقطع المميز لبوسي (1:19 — 1:40)</span>
                  <Sparkles className="w-3 h-3 text-amber-300" />
                </div>
                <h3 className="font-arabic font-bold text-xl sm:text-2xl text-white">
                  تفوت ألف سنة وأنا زي ما أنا ❤️
                </h3>
                <p className="font-arabic text-xs sm:text-sm text-pink-200/80 mt-1">
                  أحمد موزه السلطان • مقصوصة ومخصصة لبوسي
                </p>
              </div>

              {/* Animated Waveform Bars */}
              <div className="flex items-center justify-between gap-1 h-9 px-1">
                {Array.from({ length: 32 }).map((_, i) => {
                  const barHeight = isBosySongPlaying
                    ? Math.sin((i + bosyCurrentTime * 6) * 0.5) * 14 + 18
                    : 6;
                  return (
                    <motion.div
                      key={i}
                      animate={{ height: `${barHeight}px` }}
                      transition={{ duration: 0.15 }}
                      className="flex-1 rounded-full"
                      style={{
                        backgroundColor:
                          i % 2 === 0 ? theme.palette.primary : theme.palette.secondary,
                        opacity: isBosySongPlaying ? 0.85 : 0.25,
                      }}
                    />
                  );
                })}
              </div>

              {/* Progress Scrubber */}
              <div className="space-y-1">
                <input
                  type="range"
                  min={0}
                  max={bosyDuration || 21}
                  step={0.1}
                  value={bosyCurrentTime}
                  onChange={(e) => seekBosySong(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <div className="flex justify-between text-xs text-neutral-400 font-mono">
                  <span>{formatTime(bosyCurrentTime)}</span>
                  <span>{formatTime(bosyDuration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between pt-2">
                {/* Volume Slider */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleBosyMute}
                    className="text-neutral-300 hover:text-white transition-colors cursor-pointer p-1"
                  >
                    {isBosyMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isBosyMuted ? 0 : bosyVolume}
                    onChange={(e) => setBosyVolume(parseFloat(e.target.value))}
                    className="w-16 sm:w-20 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-pink-400"
                  />
                </div>

                {/* Central Play/Pause Button */}
                <motion.button
                  onClick={toggleBosySong}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer transition-all"
                  style={{
                    backgroundColor: theme.palette.primary,
                    boxShadow: `0 0 25px ${theme.palette.glow}`,
                  }}
                >
                  {isBosySongPlaying ? (
                    <Pause className="w-6 h-6 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  )}
                </motion.button>

                {/* Status Indicator */}
                <div className="text-xs font-arabic text-neutral-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>{isBosySongPlaying ? 'أغنية بوسي شغالة...' : 'اضغطي للاستماع'}</span>
                </div>
              </div>

              <p className="font-arabic text-[11px] text-pink-300/70 pt-1">
                💡 عند تشغيل هذه الأغنية، تتوقف موسيقى الويبسايت الأجنبية تلقائياً لتستمع بوسي لكلماتها الخاصة ❤️
              </p>
            </div>
          </div>

          {/* Official Streaming Platforms Bar */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="font-arabic text-neutral-300">
              استمعي للمهرجان كاملاً على يوتيوب:
            </span>

            <div className="flex items-center gap-2">
              <a
                href={officialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-200 transition-colors"
              >
                <span>YouTube الرسمي (عند الدقيقة 1:19)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
