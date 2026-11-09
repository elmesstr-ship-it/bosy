import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { BirthdayThemeConfig } from '../../birthday/types';
import { Play, Pause, Volume2, VolumeX, Disc, ExternalLink, Music, Sparkles } from 'lucide-react';

interface MusicPlayerProps {
  theme: BirthdayThemeConfig;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ theme }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(180); // default 3 minutes
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [useSynthAudio, setUseSynthAudio] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);

  // Official legitimate streaming links for Ahmed Moza's song "انا من يومي خفاش / تفوت ألف سنة وأنا زي ما أنا"
  const officialLinks = {
    youtube: 'https://www.youtube.com/results?search_query=%D8%A7%D8%AD%D9%85%D8%AF+%D9%85%D9%88%D8%B2%D9%87+%D8%A7%D9%86%D8%A7+%D9%85%D9%86+%D9%8A%D9%88%D9%85%D9%8A+%D8%AE%D9%81%D8%A7%D8%B4+%D8%AA%D9%81%D9%88%D8%AA+%D8%A7%D9%84%D9%81+%D8%B3%D9%86%D8%A9',
    anghami: 'https://play.anghami.com/search/تفوت%20ألف%20سنة%20وأنا%20زي%20ما%20أنا',
  };

  // Helper for formatting time (mm:ss)
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // Play a soft, beautiful musical chime note via Web Audio API when synth mode is active
  const playChimeNote = (freq: number, durationSec: number = 0.5) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const targetVol = isMuted ? 0 : volume * 0.18;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationSec);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + durationSec);
    } catch {}
  };

  // Fallback melodic loop (gentle music-box birthday progression)
  useEffect(() => {
    if (isPlaying && useSynthAudio) {
      // Harmonic progression notes (C5, D5, E5, G5, A5, C6)
      const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
      let stepIndex = 0;

      synthTimerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.8;
          if (next >= duration) return 0;
          return next;
        });
        const note = notes[stepIndex % notes.length];
        playChimeNote(note, 0.7);
        stepIndex++;
      }, 800);
    } else {
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
        synthTimerRef.current = null;
      }
    }

    return () => {
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
    };
  }, [isPlaying, useSynthAudio, duration, volume, isMuted]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Attempt playing the local file /audio/birthday-song.mp3
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setUseSynthAudio(false);
        })
        .catch(() => {
          // If no local mp3 is present, gracefully fallback to the soothing ambient birthday synth music
          setUseSynthAudio(true);
          setIsPlaying(true);
        });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current && !useSynthAudio) {
      audioRef.current.currentTime = val;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.8;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background audio element pointing to /audio/birthday-song.mp3 */}
      <audio
        ref={audioRef}
        src="/audio/birthday-song.mp3"
        onTimeUpdate={() => {
          if (audioRef.current && !useSynthAudio) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration || 180);
          }
        }}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          // Gracefully activate synth audio mode on load error
          setUseSynthAudio(true);
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-pink-400/30 bg-white/5 backdrop-blur-md text-xs sm:text-sm text-pink-300 font-editorial tracking-widest uppercase">
            <Music className="w-3.5 h-3.5" />
            <span>SOUNDTRACK OF MEMORIES • أغنية اليوم</span>
          </div>

          <h2 className="font-arabic text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            أغنية اليوم لبوسي ❤️
          </h2>

          <p className="font-arabic text-base sm:text-lg text-rose-200/90 max-w-xl mx-auto">
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
              ? 'bg-gradient-to-br from-[#1a082b]/90 via-[#0e021a]/95 to-[#1e072a]/90 border-fuchsia-500/40 shadow-[0_25px_60px_rgba(236,72,153,0.35)]'
              : 'bg-gradient-to-br from-[#2a1033]/85 via-[#190822]/90 to-[#280c2e]/85 border-pink-400/30 shadow-[0_25px_60px_rgba(244,114,182,0.25)]'
          }`}
        >
          {/* Subtle Ambient Pulse behind player */}
          <div
            className={`absolute inset-0 rounded-3xl blur-2xl opacity-20 pointer-events-none transition-opacity duration-1000 ${
              isPlaying ? 'opacity-40 animate-pulse' : 'opacity-10'
            }`}
            style={{ backgroundColor: theme.palette.primary }}
          />

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* Rotating Vinyl / Album Art */}
            <div className="relative group select-none">
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={isPlaying ? { repeat: Infinity, duration: 8, ease: 'linear' } : { duration: 0.5 }}
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-900 p-2 shadow-2xl flex items-center justify-center border-4 border-neutral-700/60 relative"
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

              {/* Tonearm Needle representation */}
              <div
                className={`absolute -top-3 -right-2 w-6 h-12 border-r-2 border-t-2 border-amber-300/80 rounded-tr-lg transform origin-top-right transition-transform duration-500 pointer-events-none ${
                  isPlaying ? 'rotate-12' : '-rotate-12 opacity-60'
                }`}
              />
            </div>

            {/* Track Info & Interactive Controls */}
            <div className="flex-1 w-full space-y-5 text-right md:text-right">
              <div>
                <div className="inline-block px-3 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-[11px] font-arabic text-pink-300 mb-2">
                  الأغنية المختارة لبوسي
                </div>
                <h3 className="font-arabic font-bold text-xl sm:text-2xl text-white">
                  يفوت ألف سنة وأنا لسه زي ما أنا
                </h3>
                <p className="font-arabic text-sm text-pink-200/80 mt-1">
                  أحمد موزه (السلطان) • مهرجان أنا من يومي خفاش
                </p>
              </div>

              {/* Animated Waveform Bars */}
              <div className="flex items-center justify-between gap-1 h-9 px-1">
                {Array.from({ length: 32 }).map((_, i) => {
                  const barHeight = isPlaying
                    ? Math.sin((i + currentTime * 4) * 0.5) * 14 + 18
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
                        opacity: isPlaying ? 0.85 : 0.25,
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
                  max={duration || 180}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <div className="flex justify-between text-xs text-neutral-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between pt-2">
                {/* Volume Slider */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 sm:w-20 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-pink-400"
                  />
                </div>

                {/* Central Play/Pause Button */}
                <motion.button
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer transition-all"
                  style={{
                    backgroundColor: theme.palette.primary,
                    boxShadow: `0 0 25px ${theme.palette.glow}`,
                  }}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  )}
                </motion.button>

                {/* Status Indicator */}
                <div className="text-xs font-arabic text-neutral-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>{isPlaying ? 'الموسيقى تعمل...' : 'اضغطي للتشغيل'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Official Streaming Platforms Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-arabic text-xs text-neutral-300">
              استمعي للنسخة الأصلية الكاملة على المنصات الرسمية:
            </span>

            <div className="flex items-center gap-3">
              <a
                href={officialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-xs text-red-200 transition-colors"
              >
                <span>YouTube الرسمي</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={officialLinks.anghami}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-xs text-purple-200 transition-colors"
              >
                <span>أنغامي Anghami</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
