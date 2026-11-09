export interface BirthdayWish {
  id: number;
  text: string;
  subtext: string;
  icon: string;
}

export interface BirthdayEditionContent {
  year: number;
  heroHeadline: string;
  heroSubheadline: string;
  heroStoryQuote: string;
  letterGreeting: string;
  letterBody: string[];
  letterSignoff: string;
  letterDate: string;
  wishes: BirthdayWish[];
  secretSurpriseText: string;
  finalSceneQuote: string;
  finalSceneArabic: string;
  musicTitle: string;
  musicSubtitle: string;
}

export const BIRTHDAY_WISHES_LIST: BirthdayWish[] = [
  {
    id: 1,
    text: 'ربنا يكتبلك أجمل الأقدار.',
    subtext: 'May destiny smile upon every step you take.',
    icon: '✨',
  },
  {
    id: 2,
    text: 'يحققلك كل اللي نفسك فيه.',
    subtext: 'May all your deepest dreams and wishes come true.',
    icon: '💫',
  },
  {
    id: 3,
    text: 'يبعد عنك كل زعل.',
    subtext: 'May your heart stay sheltered from every sorrow.',
    icon: '🛡️',
  },
  {
    id: 4,
    text: 'يرزقك راحة البال والفرحة.',
    subtext: 'May genuine peace and endless joy fill your soul.',
    icon: '🌸',
  },
  {
    id: 5,
    text: 'يفضل قلبك دايمًا مبسوط.',
    subtext: 'May that pure, beautiful smile never fade away.',
    icon: '💖',
  },
  {
    id: 6,
    text: 'يفتحلك كل أبواب الخير.',
    subtext: 'May limitless doors of blessings and abundance swing open.',
    icon: '🌟',
  },
  {
    id: 7,
    text: 'كل سنة تكون أحلى من اللي قبلها.',
    subtext: 'May every coming year be infinitely brighter than the last.',
    icon: '🎂',
  },
];

export const CORE_BIRTHDAY_LETTER = [
  'كوتي، كل سنة وانتي طيبة يا أجمل بوسي ❤️',
  'يمكن الكلام مهما كان حلو مش هيعرف يوصف قد إيه وجودك مميز، وقد إيه أتمنى أشوفك دايمًا مبسوطة وناجحة ومرتاحة البال.',
  'يارب سنتك الجديدة تكون مليانة ضحكة من القلب، ونجاحات أكبر من أحلامك، وأيام حلوة شبه قلبك.',
  'يارب كل حاجة نفسك فيها تبقى من نصيبك، وكل خطوة تخطيها تقربك من أحلامك.',
  'يارب تفضلي دايمًا منورة الدنيا بطريقتك الجميلة.',
  'كل سنة وانتي طيبة يا بوسي، وعقبال سنين كتير كلها فرحة وحب ونجاح.',
];

export const SECRET_SURPRISE_MESSAGE = 'في حاجات كتير حلوة في الدنيا، بس وجودك لوحده كفاية يخلي اليوم أحلى. ❤️';

/**
 * Returns dynamic or yearly tuned content for any birthday edition
 */
export function getBirthdayContent(year: number, age: number): BirthdayEditionContent {
  const is2026 = year === 2026;
  const is2027 = year === 2027;

  return {
    year,
    heroHeadline: is2026 
      ? 'كل سنة وانتي طيبة يا أجمل بوسي ❤️' 
      : is2027 
      ? 'فصل جديد يبدأ بنورك وسحرك يا بوسي ✨' 
      : `عام جديد مفعم بالجمال والبريق لبوسي ❤️`,
    heroSubheadline: is2026
      ? 'مش مجرد يوم عيد ميلاد... ده يوم اتولدت فيه حكاية جميلة.'
      : is2027
      ? 'صفحة جديدة تنبض بالحياة، وكل لحظة فيها تليق بجمال قلبك.'
      : `في سن الـ ${age}، تزدادين إشراقاً وتألقاً يوماً بعد يوم.`,
    heroStoryQuote: `Celebrating ${age} wonderful years of grace, sweetness, and magic.`,
    letterGreeting: 'إلى كوتي وبوسي، سر البهجة وجمال الأيام...',
    letterBody: CORE_BIRTHDAY_LETTER,
    letterSignoff: `مكتوبة بكل حب لعامك الـ ${age} | July 4th`,
    letterDate: `4 يوليو ${year}`,
    wishes: BIRTHDAY_WISHES_LIST,
    secretSurpriseText: SECRET_SURPRISE_MESSAGE,
    finalSceneQuote: 'THE WORLD IS LUCKY TO HAVE YOU, BOSY.',
    finalSceneArabic: 'كل سنة وانتي أجمل حكاية ❤️',
    musicTitle: 'أغنية اليوم لبوسي ❤️',
    musicSubtitle: 'أغنية تفضل تفكرنا باللحظة دي مهما عدت سنين.',
  };
}
