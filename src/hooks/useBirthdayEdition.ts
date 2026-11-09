import { useState, useMemo, useEffect } from 'react';
import { calculateBirthday } from '../birthday/birthdayEngine';
import { getThemeForYear } from '../birthday/birthdayThemes';
import { getBirthdayContent } from '../birthday/birthdayMessages';
import type { BirthdayCalculation, BirthdayThemeConfig } from '../birthday/types';

export interface UseBirthdayEditionReturn {
  calculation: BirthdayCalculation;
  theme: BirthdayThemeConfig;
  content: ReturnType<typeof getBirthdayContent>;
  isEnvelopeOpened: boolean;
  openEnvelope: () => void;
  resetEnvelope: () => void;
  isIntroPassed: boolean;
  completeIntro: () => void;
  // Dev preview system
  simulatedDate: Date | null;
  setSimulatedDate: (date: Date | null) => void;
  setQuickPreset: (preset: 'now' | '2026-eve' | '2026-bday' | '2027-eve' | '2027-bday' | '2028-bday') => void;
}

export function useBirthdayEdition(): UseBirthdayEditionReturn {
  // Check URL query parameters for dev testing (?previewDate=2026-07-04 or ?edition=2026)
  const initialDate = useMemo<Date | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const devDate = params.get('devDate');
      if (devDate) {
        const parsed = new Date(devDate);
        if (!isNaN(parsed.getTime())) return parsed;
      }
    }
    return null;
  }, []);

  const [simulatedDate, setSimulatedDate] = useState<Date | null>(initialDate);
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState<boolean>(false);
  const [isIntroPassed, setIsIntroPassed] = useState<boolean>(false);

  // Re-calculate if clock ticks or simulatedDate changes
  const [currentDate, setCurrentDate] = useState<Date>(() => simulatedDate || new Date());

  useEffect(() => {
    if (simulatedDate) {
      setCurrentDate(simulatedDate);
      return;
    }
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // refresh every minute for live midnight transitions
    return () => clearInterval(timer);
  }, [simulatedDate]);

  const calculation = useMemo(() => {
    return calculateBirthday(currentDate);
  }, [currentDate]);

  // Determine active year theme
  // If simulated or current date is in 2026, theme is 2026. If 2027, theme is 2027.
  const themeYear = calculation.currentDate.getFullYear();
  const theme = useMemo(() => {
    return getThemeForYear(themeYear);
  }, [themeYear]);

  // Bosy's current age or turning age
  const effectiveAge = calculation.isBirthdayToday ? calculation.turningAge : calculation.turningAge;

  const content = useMemo(() => {
    return getBirthdayContent(themeYear, effectiveAge);
  }, [themeYear, effectiveAge]);

  const openEnvelope = () => {
    setIsEnvelopeOpened(true);
  };

  const resetEnvelope = () => {
    setIsEnvelopeOpened(false);
    setIsIntroPassed(false);
  };

  const completeIntro = () => {
    setIsIntroPassed(true);
  };

  const setQuickPreset = (preset: 'now' | '2026-eve' | '2026-bday' | '2027-eve' | '2027-bday' | '2028-bday') => {
    switch (preset) {
      case 'now':
        setSimulatedDate(null);
        setCurrentDate(new Date());
        break;
      case '2026-eve':
        setSimulatedDate(new Date(2026, 6, 3, 20, 0, 0)); // July 3, 2026 8pm
        break;
      case '2026-bday':
        setSimulatedDate(new Date(2026, 6, 4, 10, 0, 0)); // July 4, 2026 (Age 21!)
        break;
      case '2027-eve':
        setSimulatedDate(new Date(2027, 6, 3, 22, 0, 0)); // July 3, 2027
        break;
      case '2027-bday':
        setSimulatedDate(new Date(2027, 6, 4, 12, 0, 0)); // July 4, 2027 (Age 22!)
        break;
      case '2028-bday':
        setSimulatedDate(new Date(2028, 6, 4, 12, 0, 0)); // July 4, 2028 (Age 23!)
        break;
    }
  };

  return {
    calculation,
    theme,
    content,
    isEnvelopeOpened,
    openEnvelope,
    resetEnvelope,
    isIntroPassed,
    completeIntro,
    simulatedDate,
    setSimulatedDate,
    setQuickPreset,
  };
}
