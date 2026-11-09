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

  // Initialize audio elements
  useEffect(() => {
    const bgAudio = new Audio('/audio/bg-birthday-trend.mp3');
    bgAudio.loop = true;
    bgAudio.volume = 0.45;
    bgAudioRef.current = bgAudio;

    const bosyAudio = new Audio('/audio/birthday-song.mp3');
    bosyAudio.volume = 0.9;
    bosyAudioRef.current = bosyAudio;

    bosyAudio.addEventListener('loadedmetadata', () => {
      setBosyDuration(bosyAudio.duration || 21);
    });

    bosyAudio.addEventListener('timeupdate', () => {
      setBosyCurrentTime(bosyAudio.currentTime);
    });

    bosyAudio.addEventListener('ended', () => {
      setIsBosySongPlaying(false);
      setBosyCurrentTime(0);
      // Optionally resume background song after Bosy's song ends!
      bgAudio.play().then(() => setIsBgPlaying(true)).catch(() => {});
    });

    return () => {
      bgAudio.pause();
      bosyAudio.pause();
    };
  }, []);

  const playBgSong = () => {
    // When playing background song, pause Bosy's song
    if (bosyAudioRef.current && isBosySongPlaying) {
      bosyAudioRef.current.pause();
      setIsBosySongPlaying(false);
    }
    if (bgAudioRef.current) {
      bgAudioRef.current.play().then(() => {
        setIsBgPlaying(true);
      }).catch(() => {});
    }
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
    // When Bosy plays her special song, the English trend song immediately pauses!
    if (bgAudioRef.current && isBgPlaying) {
      bgAudioRef.current.pause();
      setIsBgPlaying(false);
    }
    if (bosyAudioRef.current) {
      bosyAudioRef.current.play().then(() => {
        setIsBosySongPlaying(true);
      }).catch(() => {});
    }
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
    if (bosyAudioRef.current) {
      bosyAudioRef.current.currentTime = time;
      setBosyCurrentTime(time);
    }
  };

  const handleSetBosyVolume = (vol: number) => {
    setBosyVolume(vol);
    setIsBosyMuted(vol === 0);
    if (bosyAudioRef.current) {
      bosyAudioRef.current.volume = vol;
    }
  };

  const toggleBosyMute = () => {
    if (isBosyMuted) {
      setIsBosyMuted(false);
      if (bosyAudioRef.current) bosyAudioRef.current.volume = bosyVolume || 0.8;
    } else {
      setIsBosyMuted(true);
      if (bosyAudioRef.current) bosyAudioRef.current.volume = 0;
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
