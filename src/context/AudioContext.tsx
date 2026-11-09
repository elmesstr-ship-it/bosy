import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isBgPlaying: boolean;
  isBosySongPlaying: boolean;
  toggleBgSong: () => void;
  playBgSong: () => void;
  pauseBgSong: () => void;
  toggleBosySong: () => void;
  playBosySong: () => void;
  pauseBosySong: () => void;
  bosyCurrentTime: number;
  bosyDuration: number;
  seekBosySong: (time: number) => void;
  bosyVolume: number;
  setBosyVolume: (vol: number) => void;
  isBosyMuted: boolean;
  toggleBosyMute: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBgPlaying, setIsBgPlaying] = useState<boolean>(false);
  const [isBosySongPlaying, setIsBosySongPlaying] = useState<boolean>(false);
  const [bosyCurrentTime, setBosyCurrentTime] = useState<number>(0);
  const [bosyDuration, setBosyDuration] = useState<number>(21); // exactly 21 seconds (1:19 to 1:40)
  const [bosyVolume, setBosyVolume] = useState<number>(0.9);
  const [isBosyMuted, setIsBosyMuted] = useState<boolean>(false);

  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const bosyAudioRef = useRef<HTMLAudioElement | null>(null);

  // Lazy audio getters so audio files are NOT downloaded on initial page load!
  const getBgAudio = (): HTMLAudioElement => {
    if (!bgAudioRef.current) {
      const audio = new Audio();
      audio.preload = 'none';
      audio.src = '/audio/bg-birthday-trend.mp3';
      audio.loop = true;
      audio.volume = 0.45;
      bgAudioRef.current = audio;
    }
    return bgAudioRef.current;
  };

  const getBosyAudio = (): HTMLAudioElement => {
    if (!bosyAudioRef.current) {
      const audio = new Audio();
      audio.preload = 'none';
      audio.src = '/audio/birthday-song.mp3';
      audio.volume = bosyVolume;

      audio.addEventListener('loadedmetadata', () => {
        setBosyDuration(audio.duration || 21);
      });

      audio.addEventListener('timeupdate', () => {
        setBosyCurrentTime(audio.currentTime);
      });

      audio.addEventListener('ended', () => {
        setIsBosySongPlaying(false);
        setBosyCurrentTime(0);
        // Resume background beat after Bosy's song finishes
        const bg = getBgAudio();
        bg.play().then(() => setIsBgPlaying(true)).catch(() => {});
      });

      bosyAudioRef.current = audio;
    }
    return bosyAudioRef.current;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
      if (bosyAudioRef.current) {
        bosyAudioRef.current.pause();
        bosyAudioRef.current = null;
      }
    };
  }, []);

  const playBgSong = () => {
    if (bosyAudioRef.current && isBosySongPlaying) {
      bosyAudioRef.current.pause();
      setIsBosySongPlaying(false);
    }
    const bg = getBgAudio();
    bg.play().then(() => {
      setIsBgPlaying(true);
    }).catch(() => {});
  };

  const pauseBgSong = () => {
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      setIsBgPlaying(false);
    }
  };

  const toggleBgSong = () => {
    if (isBgPlaying) pauseBgSong();
    else playBgSong();
  };

  const playBosySong = () => {
    if (bgAudioRef.current && isBgPlaying) {
      bgAudioRef.current.pause();
      setIsBgPlaying(false);
    }
    const bosy = getBosyAudio();
    bosy.play().then(() => {
      setIsBosySongPlaying(true);
    }).catch(() => {});
  };

  const pauseBosySong = () => {
    if (bosyAudioRef.current) {
      bosyAudioRef.current.pause();
      setIsBosySongPlaying(false);
    }
  };

  const toggleBosySong = () => {
    if (isBosySongPlaying) pauseBosySong();
    else playBosySong();
  };

  const seekBosySong = (time: number) => {
    const bosy = getBosyAudio();
    bosy.currentTime = time;
    setBosyCurrentTime(time);
  };

  const handleSetBosyVolume = (vol: number) => {
    setBosyVolume(vol);
    setIsBosyMuted(vol === 0);
    if (bosyAudioRef.current) {
      bosyAudioRef.current.volume = vol;
    }
  };

  const toggleBosyMute = () => {
    const bosy = getBosyAudio();
    if (isBosyMuted) {
      setIsBosyMuted(false);
      bosy.volume = bosyVolume || 0.8;
    } else {
      setIsBosyMuted(true);
      bosy.volume = 0;
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isBgPlaying,
        isBosySongPlaying,
        toggleBgSong,
        playBgSong,
        pauseBgSong,
        toggleBosySong,
        playBosySong,
        pauseBosySong,
        bosyCurrentTime,
        bosyDuration,
        seekBosySong,
        bosyVolume,
        setBosyVolume: handleSetBosyVolume,
        isBosyMuted,
        toggleBosyMute,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
