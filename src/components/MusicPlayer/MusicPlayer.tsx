import React from 'react';
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

  const officialLinks = {
    youtube: 'https://www.youtube.com/watch?v=HhbmEicUOhg&t=79s',
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-pink-400/30 bg-black/40 text-xs text-pink-300 font-editorial tracking-widest uppercase">
            <Music className="w-3.5 h-3.5" />
            <span>EXCLUSIVE SOUNDTRACK • أغنية اليوم لبوسي</span>
          </div>

          <h2 className="font-arabic text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            أغنية اليوم لبوسي ❤️
          </h2>

          <p className="font-arabic text-xs sm:text-sm md:text-base text-rose-200/90 max-w-lg mx-auto">
            أغنية تفضل تفكرنا باللحظة دي مهما عدت سنين.
          </p>
        </div>

        {/* Music Player Card */}
        <div
          className={`relative rounded-3xl p-5 sm:p-8 border shadow-xl ${
            isDarkCyber
              ? 'bg-gradient-to-br from-[#1a082b] to-[#0e021a] border-fuchsia-500/40'
              : 'bg-gradient-to-br from-[#2a1033] to-[#190822] border-pink-400/30'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Rotating Vinyl */}
            <div className="relative group select-none flex-shrink-0">
              <div
                className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-neutral-900 p-2 shadow-xl flex items-center justify-center border-4 border-neutral-700/60 relative ${
                  isBosySongPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '6s' }}
              >
                <div className="w-full h-full rounded-full border border-neutral-600/40 flex items-center justify-center">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center text-center p-1.5 shadow-inner"
                    style={{
                      background: isDarkCyber
                        ? 'linear-gradient(135deg, #ec4899 0%, #9333ea 100%)'
                        : 'linear-gradient(135deg, #f472b6 0%, #be185d 100%)',
                    }}
                  >
                    <Disc className="w-4 h-4 text-white" />
                    <span dir="ltr" className="text-[9px] font-editorial font-bold text-white mt-0.5">BOSY</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Track Info & Controls */}
            <div className="flex-1 w-full space-y-3.5 text-right">
              <div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-[10px] font-arabic text-pink-300 mb-1.5">
                  <span>المقطع المميز لبوسي (1:19 — 1:40)</span>
                  <Sparkles className="w-3 h-3 text-amber-300" />
                </div>
                <h3 className="font-arabic font-bold text-lg sm:text-xl text-white">
                  تفوت ألف سنة وأنا زي ما أنا ❤️
                </h3>
                <p className="font-arabic text-xs text-pink-200/80">
                  أحمد موزه السلطان • مقصوصة ومخصصة لبوسي
                </p>
              </div>

              {/* Lightweight CSS Waveform Bars (16 bars instead of 32 animated framer divs) */}
              <div className="flex items-center justify-between gap-1 h-7 px-1">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full transition-all duration-200"
                    style={{
                      height: isBosySongPlaying ? `${(i % 5 + 2) * 5}px` : '4px',
                      backgroundColor: i % 2 === 0 ? theme.palette.primary : theme.palette.secondary,
                      opacity: isBosySongPlaying ? 0.85 : 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Progress Scrubber */}
              <div className="space-y-0.5">
                <input
                  type="range"
                  min={0}
                  max={bosyDuration || 21}
                  step={0.1}
                  value={bosyCurrentTime}
                  onChange={(e) => seekBosySong(parseFloat(e.target.value))}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>{formatTime(bosyCurrentTime)}</span>
                  <span>{formatTime(bosyDuration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between pt-1">
                {/* Volume Slider */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={toggleBosyMute}
                    className="text-neutral-300 hover:text-white p-1"
                  >
                    {isBosyMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isBosyMuted ? 0 : bosyVolume}
                    onChange={(e) => setBosyVolume(parseFloat(e.target.value))}
                    className="w-14 sm:w-18 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-pink-400"
                  />
                </div>

                {/* Central Play Button */}
                <button
                  onClick={toggleBosySong}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer active:scale-95 transition-transform"
                  style={{
                    backgroundColor: theme.palette.primary,
                  }}
                >
                  {isBosySongPlaying ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </button>

                <div className="text-[11px] font-arabic text-neutral-400">
                  {isBosySongPlaying ? 'أغنية بوسي شغالة...' : 'اضغطي للتشغيل'}
                </div>
              </div>
            </div>
          </div>

          {/* YouTube Link */}
          <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="font-arabic text-neutral-400 text-[11px]">
              استمعي للمهرجان كاملاً:
            </span>
            <a
              href={officialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-200 text-xs transition-colors"
            >
              <span>YouTube الرسمي (1:19)</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
