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

// 2026 Wishes: Garden of Blessings
export const WISHES_2026: BirthdayWish[] = [
  { id: 1, text: 'ربنا يكتبلك أجمل الأقدار.', subtext: 'May destiny smile upon every step you take.', icon: '✨' },
  { id: 2, text: 'يحققلك كل اللي نفسك فيه.', subtext: 'May all your deepest dreams come true.', icon: '💫' },
  { id: 3, text: 'يبعد عنك كل زعل.', subtext: 'May your heart stay sheltered from every sorrow.', icon: '🛡️' },
  { id: 4, text: 'يرزقك راحة البال والفرحة.', subtext: 'May genuine peace fill your soul.', icon: '🌸' },
  { id: 5, text: 'يفضل قلبك دايمًا مبسوط.', subtext: 'May that pure smile never fade.', icon: '💖' },
  { id: 6, text: 'يفتحلك كل أبواب الخير.', subtext: 'May doors of blessings swing open.', icon: '🌟' },
  { id: 7, text: 'كل سنة تكون أحلى من اللي قبلها.', subtext: 'May every coming year be infinitely brighter.', icon: '🎂' },
];

// 2027 Wishes: Cosmic Wishes
export const WISHES_2027: BirthdayWish[] = [
  { id: 1, text: 'تفضلي دايماً نجمة منورة في كل مكان.', subtext: 'Forever shining like a diamond in the night sky.', icon: '⭐' },
  { id: 2, text: 'سنة الـ 22 تكون سنة الانطلاقة والنجاح العظيم.', subtext: 'May age 22 be your year of triumph and breakthroughs.', icon: '🚀' },
  { id: 3, text: 'قلبك يفضل مطمئن ومحاط بكل الحب الصادق.', subtext: 'Surrounded by nothing but unconditional love.', icon: '💜' },
  { id: 4, text: 'كل خطوة تخطيها تثبت إنك قدها وأكتر.', subtext: 'Walking forward with unstoppable grace and power.', icon: '🦋' },
  { id: 5, text: 'ضحكتك تفضل هي سر بهجة الدنيا.', subtext: 'Your laugh remains the heartbeat of joy.', icon: '✨' },
  { id: 6, text: 'أيامك كلها هدوء وتوفيق وبركة لا تنتهي.', subtext: 'Peace of mind and unending blessings.', icon: '🌙' },
  { id: 7, text: 'فصل جديد يليق بعظمة وبياض قلبك يا بوسي.', subtext: 'A magnificent chapter worthy of your pure heart.', icon: '🥂' },
];

// Letter 2026: Blooming in 21
export const LETTER_2026 = [
  'كوتي، كل سنة وانتي طيبة يا أجمل بوسي ❤️',
  'يمكن الكلام مهما كان حلو مش هيعرف يوصف قد إيه وجودك مميز، وقد إيه أتمنى أشوفك دايمًا مبسوطة وناجحة ومرتاحة البال.',
  'يارب سنتك الـ 21 تكون بداية مرحلة جديدة كلها ضحكة من القلب، ونجاحات أكبر من كل أحلامك، وأيام حلوة شبه نقاء قلبك.',
  'يارب كل حاجة نفسك فيها تبقى من نصيبك، وكل خطوة تخطيها تقربك من أمنياتك.',
  'يارب تفضلي دايمًا منورة الدنيا بطريقتك الجميلة وما نشوفش في عينك غير الفرحة.',
  'كل سنة وانتي طيبة يا بوسي، وعقبال سنين كتير كلها حب وسعادة وراحة بال.',
];

// Letter 2027: Another Chapter — 22
export const LETTER_2027 = [
  'بوسي، كل سنة وانتي بتزيدي جمال وتألق وسحر ❤️',
  'النهاردة بنبدأ فصل جديد تماماً في حكايتك.. سن الـ 22 مش مجرد سنة جديدة بتمر، ده عام النضج والجمال والخطوات الواثقة.',
  'يمكن الدنيا بتكبر وتتغير، بس روحك الحلوة وقلبك الأبيض بيفضلوا دايماً هما هما سر تميزك اللي بيخطف القلوب.',
  'يارب الفصل الـ 22 من حياتك يكون عنوانه تحقيق المستحيل، وراحة بال تدوم، وأفراح تفاجئك من حيث لا تحتسبي.',
  'خليكي دايماً فخورة بكل خطوة وصلتي ليها، واعرفي إن وجودك في حياة اللي حواليكي أكبر نعمة وبركة.',
  'كل سنة وانتي البداية لكل حاجة حلوة يا كوتي، وعام 22 سعيد ومليان معجزات شبه قلبك ❤️',
];

// Letter 2028: The Golden Queen — 23
export const LETTER_2028 = [
  'كوتي وملكة قلبي، كل سنة وانتي سيدة الرقي والجمال 👑',
  '23 عاماً من النقاء والضحكة اللي بتخطف الروح.. وجودك في الدنيا بيخليها مكان ألطف وأجمل وأكتر إشراقاً.',
  'يارب عامك الجديد يكون عام الحصاد لكل أمنية وتعب، وتاج من السعادة والفخر يزين كل أيامك وخطواتك.',
  'دامت ضحكتك، ودام نقاء قلبك، ودُمتِ الملكة المتوجة في قلوبنا إلى الأبد ❤️',
];

export const SECRET_SURPRISE_MESSAGE = 'في حاجات كتير حلوة في الدنيا، بس وجودك لوحده كفاية يخلي اليوم أحلى. ❤️';

/**
 * Returns dynamic or yearly tuned content for any birthday edition
 */
export function getBirthdayContent(year: number, age: number): BirthdayEditionContent {
  const is2026 = year === 2026;
  const is2027 = year === 2027;

  if (is2026) {
    return {
      year: 2026,
      heroHeadline: 'كل سنة وانتي طيبة يا أجمل بوسي ❤️',
      heroSubheadline: 'مش مجرد يوم عيد ميلاد... ده يوم اتولدت فيه حكاية جميلة.',
      heroStoryQuote: 'Celebrating 21 wonderful years of grace, sweetness, and magic.',
      letterGreeting: 'إلى كوتي وبوسي، سر البهجة وجمال الأيام...',
      letterBody: LETTER_2026,
      letterSignoff: 'مكتوبة بكل حب لسن الـ 21 | July 4th',
      letterDate: '4 يوليو 2026',
      wishes: WISHES_2026,
      secretSurpriseText: SECRET_SURPRISE_MESSAGE,
      finalSceneQuote: 'THE WORLD IS LUCKY TO HAVE YOU, BOSY.',
      finalSceneArabic: 'كل سنة وانتي أجمل حكاية ❤️',
      musicTitle: 'أغنية اليوم لبوسي ❤️',
      musicSubtitle: 'أغنية تفضل تفكرنا باللحظة دي مهما عدت سنين.',
    };
  }

  if (is2027) {
    return {
      year: 2027,
      heroHeadline: 'فصل استثنائي جديد يبدأ بسحرك يا بوسي ✨',
      heroSubheadline: 'صفحة جديدة تنبض بالحياة، وكل تفصيلة فيها تليق بنضج وجمال قلبك.',
      heroStoryQuote: 'Stepping into 22 with unmatched brilliance, elegance, and celestial power.',
      letterGreeting: 'إلى بوسي، نجمة سمائي وبداية فصلي الأجمل...',
      letterBody: LETTER_2027,
      letterSignoff: 'مكتوبة بكل فخر ومحبة لعامك الـ 22 | July 4th',
      letterDate: '4 يوليو 2027',
      wishes: WISHES_2027,
      secretSurpriseText: 'كل يوم بيعدي بيثبت إنك أجمل اختيار وأعظم صدفة حصلت في العمر كله. ❤️',
      finalSceneQuote: 'SHINING BRIGHTER THAN ALL THE STARS, BOSY.',
      finalSceneArabic: 'كل سنة وانتي سري وسعادتي وفصلي الأجمل ✨',
      musicTitle: 'أغنية الفصل الـ 22 لبوسي 🎶',
      musicSubtitle: 'أغنية خاصة لعامك الـ 22 تعبر عن قد إيه أنتي مميزة ولا قبلك ولا بعدك.',
    };
  }

  // 2028 and beyond
  return {
    year,
    heroHeadline: `ملكة الرقي والأناقة تضيء عامها الـ ${age} 👑`,
    heroSubheadline: `في سن الـ ${age}، تكتمل ملامح النضج وتشرق ملكة حقيقية تملك القلوب بلطفها.`,
    heroStoryQuote: `Reigning in grace and timeless elegance at ${age} years old.`,
    letterGreeting: `إلى الملكة كوتي وبوسي في عامها الـ ${age}...`,
    letterBody: LETTER_2028,
    letterSignoff: `مكتوبة بحب وتتويج لعامك الـ ${age} | July 4th`,
    letterDate: `4 يوليو ${year}`,
    wishes: WISHES_2027,
    secretSurpriseText: 'ملكة قلبي وحياتي في كل سنين العمر. ❤️👑',
    finalSceneQuote: 'FOREVER ICONIC, TIMELESS & REGAL.',
    finalSceneArabic: `كل سنة وانتي ملكة الأيام يا أجمل بوسي 👑❤️`,
    musicTitle: `أغنية التتويج الملكي لسن الـ ${age} 👑`,
    musicSubtitle: 'لحن استثنائي لملكة استثنائية.',
  };
}
