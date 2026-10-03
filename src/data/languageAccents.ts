export interface LanguageAccent {
  gradient: string;
  text: string;
  bg: string;
  border: string;
  iconBg: string;
}

export const languageAccents: Record<string, LanguageAccent> = {
  kalenjin: {
    gradient: 'from-forest-500 to-forest-700',
    text: 'text-forest-700',
    bg: 'bg-forest-50',
    border: 'border-forest-300',
    iconBg: 'from-forest-500 to-forest-700',
  },
  kikuyu: {
    gradient: 'from-amber-500 to-orange-600',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    iconBg: 'from-amber-500 to-orange-600',
  },
  luo: {
    gradient: 'from-lake-500 to-lake-700',
    text: 'text-lake-700',
    bg: 'bg-lake-50',
    border: 'border-lake-300',
    iconBg: 'from-lake-500 to-lake-700',
  },
  kamba: {
    gradient: 'from-sun-400 to-sun-600',
    text: 'text-sun-700',
    bg: 'bg-sun-50',
    border: 'border-sun-300',
    iconBg: 'from-sun-400 to-sun-600',
  },
  luhya: {
    gradient: 'from-rose-500 to-pink-600',
    text: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-300',
    iconBg: 'from-rose-500 to-pink-600',
  },
  gusii: {
    gradient: 'from-teal-500 to-cyan-600',
    text: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-300',
    iconBg: 'from-teal-500 to-cyan-600',
  },
  somali: {
    gradient: 'from-indigo-500 to-blue-700',
    text: 'text-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-300',
    iconBg: 'from-indigo-500 to-blue-700',
  },
};

export function getAccent(languageId: string): LanguageAccent {
  return languageAccents[languageId] || languageAccents.kalenjin;
}
