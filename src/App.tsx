import { useBirthdayEdition } from './hooks/useBirthdayEdition';
import { ParticleEngine } from './components/ParticleEngine/ParticleEngine';
import { SecretEnvelope } from './components/SecretEnvelope/SecretEnvelope';
import { BirthdayIntro } from './components/BirthdayIntro/BirthdayIntro';
import { Navbar } from './components/Navbar/Navbar';
import { HeroSection } from './components/HeroSection/HeroSection';
import { PhotoGallery } from './components/PhotoGallery/PhotoGallery';
import { BirthdayCake } from './components/BirthdayCake/BirthdayCake';
import { BirthdayLetter } from './components/BirthdayLetter/BirthdayLetter';
import { MusicPlayer } from './components/MusicPlayer/MusicPlayer';
import { WishesSection } from './components/WishesSection/WishesSection';
import { SecretSurprise } from './components/SecretSurprise/SecretSurprise';
import { FinalScene } from './components/FinalScene/FinalScene';
import { DevPreviewBar } from './components/DevPreviewBar/DevPreviewBar';
import { BackgroundMusicPill } from './components/BackgroundMusicPill/BackgroundMusicPill';
import { AudioProvider, useAudio } from './context/AudioContext';

function MainUniverse() {
  const {
    calculation,
    theme,
    content,
    isEnvelopeOpened,
    openEnvelope,
    resetEnvelope,
    isIntroPassed,
    completeIntro,
    simulatedDate,
    setQuickPreset,
  } = useBirthdayEdition();

  const { playBgSong } = useAudio();

  const isDarkCyber = theme.visualMode === 'futuristic-cyber';

  const handleEnterWorld = () => {
    completeIntro();
    // Start background birthday trend music on user interaction
    playBgSong();
  };

  return (
    <div
      className={`min-h-screen text-white relative transition-colors duration-1000 overflow-x-hidden ${
        isDarkCyber ? 'bg-[#08010f]' : 'bg-[#0e0413]'
      }`}
    >
      {/* Dynamic Ambient Particle Engine */}
      <ParticleEngine theme={theme} />

      {/* Floating Background Music Controller Pill */}
      {isIntroPassed && <BackgroundMusicPill theme={theme} />}

      {/* Signature 3D Opening Envelope Experience */}
      {!isEnvelopeOpened && (
        <SecretEnvelope theme={theme} onOpenComplete={openEnvelope} />
      )}

      {/* Cinematic Introduction Sequence */}
      {isEnvelopeOpened && !isIntroPassed && (
        <BirthdayIntro
          theme={theme}
          calculation={calculation}
          onEnterWorld={handleEnterWorld}
        />
      )}

      {/* Main Birthday Universe Experience */}
      {isEnvelopeOpened && isIntroPassed && (
        <main className="relative z-20 w-full max-w-full overflow-x-hidden">
          {/* Top Brand Navigation */}
          <Navbar theme={theme} calculation={calculation} />

          {/* Full Screen Cinematic Hero Section */}
          <HeroSection theme={theme} calculation={calculation} />

          {/* The Photography Experience (Using the exact two photos) */}
          <PhotoGallery theme={theme} />

          {/* Make a Wish & AI Birthday Cake Portrait Section */}
          <BirthdayCake theme={theme} calculation={calculation} />

          {/* The Emotional Birthday Letter */}
          <BirthdayLetter theme={theme} content={content} />

          {/* Interactive Hidden Easter Egg */}
          <SecretSurprise theme={theme} message={content.secretSurpriseText} />

          {/* The Birthday Song Experience (1:19 - 1:40) */}
          <MusicPlayer theme={theme} />

          {/* Birthday Wishes & Blessings */}
          <WishesSection theme={theme} wishes={content.wishes} />

          {/* Final Cinematic Scene & Memories */}
          <FinalScene theme={theme} calculation={calculation} />
        </main>
      )}

      {/* Development Theme Preview Toolbar */}
      <DevPreviewBar
        calculation={calculation}
        theme={theme}
        simulatedDate={simulatedDate}
        onSetPreset={setQuickPreset}
        onResetEnvelope={resetEnvelope}
      />
    </div>
  );
}

export function App() {
  return (
    <AudioProvider>
      <MainUniverse />
    </AudioProvider>
  );
}

export default App;
