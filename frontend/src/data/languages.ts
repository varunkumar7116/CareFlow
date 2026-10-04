export interface LanguageItem {
  code: string;
  nameNative: string;
  nameEnglish: string;
  script?: string;
  isPrimary?: boolean;
}

export const PRIMARY_LANGUAGES: LanguageItem[] = [
  { code: 'hi', nameNative: 'हिंदी', nameEnglish: 'Hindi', isPrimary: true },
  { code: 'mr', nameNative: 'मराठी', nameEnglish: 'Marathi', isPrimary: true },
  { code: 'en', nameNative: 'English', nameEnglish: 'English', isPrimary: true },
];

export const ALL_SCHEDULED_LANGUAGES: LanguageItem[] = [
  { code: 'hi', nameNative: 'हिंदी', nameEnglish: 'Hindi', isPrimary: true },
  { code: 'mr', nameNative: 'मराठी', nameEnglish: 'Marathi', isPrimary: true },
  { code: 'en', nameNative: 'English', nameEnglish: 'English', isPrimary: true },
  { code: 'as', nameNative: 'অসমীয়া', nameEnglish: 'Assamese' },
  { code: 'bn', nameNative: 'বাংলা', nameEnglish: 'Bengali' },
  { code: 'br', nameNative: 'बड़ो', nameEnglish: 'Bodo' },
  { code: 'doi', nameNative: 'डोगरी', nameEnglish: 'Dogri' },
  { code: 'gu', nameNative: 'ગુજરાતી', nameEnglish: 'Gujarati' },
  { code: 'kn', nameNative: 'ಕನ್ನಡ', nameEnglish: 'Kannada' },
  { code: 'ks', nameNative: 'कश्मीरी', nameEnglish: 'Kashmiri' },
  { code: 'kok', nameNative: 'कोंकणी', nameEnglish: 'Konkani' },
  { code: 'mai', nameNative: 'मैथिली', nameEnglish: 'Maithili' },
  { code: 'ml', nameNative: 'മലയാളം', nameEnglish: 'Malayalam' },
  { code: 'mni', nameNative: 'মৈতৈলোন্', nameEnglish: 'Manipuri' },
  { code: 'ne', nameNative: 'नेपाली', nameEnglish: 'Nepali' },
  { code: 'or', nameNative: 'ଓଡ଼ିଆ', nameEnglish: 'Odia' },
  { code: 'pa', nameNative: 'ਪੰਜਾਬੀ', nameEnglish: 'Punjabi' },
  { code: 'sa', nameNative: 'संस्कृतम्', nameEnglish: 'Sanskrit' },
  { code: 'sat', nameNative: 'ᱥᱟᱱᱛᱟᱲᱤ', nameEnglish: 'Santali' },
  { code: 'sd', nameNative: 'سنڌي', nameEnglish: 'Sindhi' },
  { code: 'ta', nameNative: 'தமிழ்', nameEnglish: 'Tamil' },
  { code: 'te', nameNative: 'తెలుగు', nameEnglish: 'Telugu' },
  { code: 'ur', nameNative: 'اردو', nameEnglish: 'Urdu' },
];
