import React, { useState } from 'react';
import type { BirthdayCalculation, BirthdayThemeConfig } from '../../birthday/types';
import { Settings2, RotateCcw, Sparkles, ChevronDown, Mail } from 'lucide-react';

interface DevPreviewBarProps {
  calculation: BirthdayCalculation;
  theme: BirthdayThemeConfig;
  simulatedDate?: Date | null;
  onSetPreset: (preset: 'now' | '2026-eve' | '2026-bday' | '2027-eve' | '2027-bday' | '2028-bday') => void;
  onResetEnvelope: () => void;
}

export const DevPreviewBar: React.FC<DevPreviewBarProps> = ({
  calculation,
  theme,
  onSetPreset,
  onResetEnvelope,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="fixed bottom-4 left-4 z-50 font-sans select-none">
      {/* Floating Toggle Button */}
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-pink-300 border border-pink-500/40 shadow-xl backdrop-blur-md text-xs cursor-pointer transition-all hover:scale-105"
        >
          <Settings2 className="w-3.5 h-3.5 text-pink-400" />
          <span className="font-mono font-medium">Edition Preview</span>
          <span className="bg-pink-500/20 text-pink-200 px-1.5 py-0.5 rounded text-[10px]">
            {theme.year} • {calculation.turningAge}y
          </span>
        </button>
      ) : (
        /* Expanded Control Panel */
        <div className="w-[320px] sm:w-[380px] bg-neutral-950/95 border border-pink-500/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl text-white space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-bold tracking-wider text-pink-200 font-mono">
                DEVELOPER THEME PREVIEW
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Current Engine Status */}
          <div className="text-[11px] font-mono bg-white/5 rounded-lg p-2.5 space-y-1 border border-white/5">
            <div className="flex justify-between text-neutral-300">
              <span>Simulated Date:</span>
              <span className="text-pink-300 font-bold">
                {calculation.currentDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>Active Age:</span>
              <span className="text-amber-300 font-bold">
                {calculation.turningAge} Years Old
              </span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>Active Theme:</span>
              <span className="text-purple-300 font-bold truncate max-w-[180px]">
                {theme.editionTitle}
              </span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>Status:</span>
              <span className={calculation.isBirthdayToday ? 'text-emerald-400 font-bold' : 'text-blue-300'}>
                {calculation.isBirthdayToday ? '🎉 BIRTHDAY TODAY!' : `${calculation.daysUntilNextBirthday} days left`}
              </span>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider block">
              Quick Test Editions:
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => onSetPreset('2026-eve')}
                className="p-2 rounded-lg bg-pink-950/40 hover:bg-pink-900/60 border border-pink-500/30 text-left text-pink-200 transition-colors cursor-pointer"
              >
                <div className="font-bold">🌸 July 3, 2026</div>
                <div className="text-[10px] text-pink-300/70">Eve of 21 (Countdown)</div>
              </button>

              <button
                onClick={() => onSetPreset('2026-bday')}
                className="p-2 rounded-lg bg-pink-950/70 hover:bg-pink-900/80 border border-pink-400 text-left text-pink-100 transition-colors cursor-pointer"
              >
                <div className="font-bold text-pink-300">🎂 July 4, 2026</div>
                <div className="text-[10px] text-pink-200/80">Blooming in 21!</div>
              </button>

              <button
                onClick={() => onSetPreset('2027-eve')}
                className="p-2 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-left text-purple-200 transition-colors cursor-pointer"
              >
                <div className="font-bold">🦋 July 3, 2027</div>
                <div className="text-[10px] text-purple-300/70">Eve of 22 (Countdown)</div>
              </button>

              <button
                onClick={() => onSetPreset('2027-bday')}
                className="p-2 rounded-lg bg-purple-950/70 hover:bg-purple-900/80 border border-purple-400 text-left text-purple-100 transition-colors cursor-pointer"
              >
                <div className="font-bold text-purple-300">⚡ July 4, 2027</div>
                <div className="text-[10px] text-purple-200/80">Another Chapter 22!</div>
              </button>

              <button
                onClick={() => onSetPreset('2028-bday')}
                className="p-2 rounded-lg bg-blue-950/50 hover:bg-blue-900/60 border border-blue-500/40 text-left text-blue-200 col-span-2 transition-colors cursor-pointer"
              >
                <div className="font-bold text-sky-300">👑 July 4, 2028+ (Future Proof)</div>
                <div className="text-[10px] text-blue-300/70">Procedural 23 Theme &amp; beyond</div>
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <button
              onClick={() => onSetPreset('now')}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Real Visitor Date</span>
            </button>

            <button
              onClick={onResetEnvelope}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 text-pink-200 transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Replay Envelope</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
