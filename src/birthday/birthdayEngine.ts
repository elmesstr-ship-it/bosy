import type { BirthdayCalculation } from './types';

// BOSY's birth date: July 4, 2005
export const BOSY_BIRTH_DATE = {
  year: 2005,
  month: 6, // 0-indexed: July is 6
  day: 4,
};

/**
 * Creates a normalized Date object representing BOSY's birth date in local timezone
 */
export function getBirthDate(): Date {
  return new Date(BOSY_BIRTH_DATE.year, BOSY_BIRTH_DATE.month, BOSY_BIRTH_DATE.day, 0, 0, 0, 0);
}

/**
 * Calculates accurate birthday dynamics based on any given reference date
 * (defaults to current visitor local time).
 */
export function calculateBirthday(referenceDate?: Date): BirthdayCalculation {
  const now = referenceDate ? new Date(referenceDate) : new Date();
  
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  const birthDate = getBirthDate();
  
  // BOSY's birthday in the current calendar year
  const birthdayThisYear = new Date(currentYear, BOSY_BIRTH_DATE.month, BOSY_BIRTH_DATE.day, 0, 0, 0, 0);

  // Compare calendar date only (ignoring milliseconds and hours)
  const isBirthdayToday = currentMonth === BOSY_BIRTH_DATE.month && currentDay === BOSY_BIRTH_DATE.day;
  
  // Has birthday already occurred in current year?
  const hasPassedThisYear = (currentMonth > BOSY_BIRTH_DATE.month) || 
    (currentMonth === BOSY_BIRTH_DATE.month && currentDay > BOSY_BIRTH_DATE.day);

  const isUpcomingThisYear = (currentMonth < BOSY_BIRTH_DATE.month) || 
    (currentMonth === BOSY_BIRTH_DATE.month && currentDay < BOSY_BIRTH_DATE.day);

  // BOSY's exact age reached today or previously
  let currentAge = currentYear - BOSY_BIRTH_DATE.year;
  if (isUpcomingThisYear) {
    currentAge -= 1;
  }

  // The age she is turning next (or turned today)
  const turningAge = isUpcomingThisYear ? currentAge + 1 : currentAge;

  // The target birthday date for countdown
  let nextBirthdayDate: Date;
  if (isUpcomingThisYear || isBirthdayToday) {
    nextBirthdayDate = birthdayThisYear;
  } else {
    nextBirthdayDate = new Date(currentYear + 1, BOSY_BIRTH_DATE.month, BOSY_BIRTH_DATE.day, 0, 0, 0, 0);
  }

  // Calculate days remaining
  const oneDayMs = 1000 * 60 * 60 * 24;
  const diffTime = nextBirthdayDate.getTime() - now.getTime();
  const daysUntilNextBirthday = isBirthdayToday ? 0 : Math.max(0, Math.ceil(diffTime / oneDayMs));

  // Determine active edition year
  // If today is before July 4, we showcase the countdown towards currentYear's edition,
  // or her active milestone.
  // When July 4 arrives or in subsequent months of that year, the current year edition is fully active!
  const activeEditionYear = isUpcomingThisYear ? currentYear : currentYear;

  return {
    birthDate,
    currentDate: now,
    currentAge,
    turningAge,
    isBirthdayToday,
    isUpcomingThisYear,
    hasPassedThisYear,
    daysUntilNextBirthday,
    activeEditionYear,
    nextBirthdayDate,
  };
}

/**
 * Format date in English & Arabic
 */
export function formatBirthdayDate(date: Date, locale: 'ar' | 'en' = 'ar'): string {
  if (locale === 'ar') {
    return new Intl.DateTimeFormat('ar-EG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
