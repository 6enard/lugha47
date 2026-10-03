export type LanguageId = 'kalenjin' | 'kikuyu' | 'luo' | 'kamba' | 'luhya' | 'gusii' | 'somali';

export interface SentenceBlock {
  id: string;
  text: string;
  language: LanguageId;
}

export interface SentenceExercise {
  id: string;
  lessonId: string;
  english: string;
  blocks: {
    kalenjin: SentenceBlock[];
    kikuyu: SentenceBlock[];
    luo: SentenceBlock[];
    kamba: SentenceBlock[];
    luhya: SentenceBlock[];
    gusii: SentenceBlock[];
    somali: SentenceBlock[];
  };
  correctOrder: {
    kalenjin: string[];
    kikuyu: string[];
    luo: string[];
    kamba: string[];
    luhya: string[];
    gusii: string[];
    somali: string[];
  };
  orderIndex: number;
}

export const sentenceExercises: SentenceExercise[] = [
  // ---- Lesson 1: Basic Greetings ----
  {
    id: 'sent-1-1',
    lessonId: 'lesson-1',
    english: 'I am fine',
    blocks: {
      kalenjin: [
        { id: 'k1', text: 'Aa', language: 'kalenjin' },
        { id: 'k2', text: 'kongoi', language: 'kalenjin' },
      ],
      kikuyu: [
        { id: 'ky1', text: 'Nĩ', language: 'kikuyu' },
        { id: 'ky2', text: 'wega', language: 'kikuyu' },
      ],
      luo: [
        { id: 'l1', text: 'Adwaro', language: 'luo' },
        { id: 'l2', text: 'maber', language: 'luo' },
      ],
      kamba: [
        { id: 'kb1', text: 'Nĩ', language: 'kamba' },
        { id: 'kb2', text: 'mwega', language: 'kamba' },
      ],
      luhya: [
        { id: 'lh1', text: 'Ndi', language: 'luhya' },
        { id: 'lh2', text: 'mwega', language: 'luhya' },
      ],
      gusii: [
        { id: 'gs1', text: 'Ndega', language: 'gusii' },
        { id: 'gs2', text: 'mabi', language: 'gusii' },
      ],
      somali: [
        { id: 'sm1', text: 'Waan', language: 'somali' },
        { id: 'sm2', text: 'fiicanahay', language: 'somali' },
      ],
    },
    correctOrder: {
      kalenjin: ['k1', 'k2'],
      kikuyu: ['ky1', 'ky2'],
      luo: ['l1', 'l2'],
      kamba: ['kb1', 'kb2'],
      luhya: ['lh1', 'lh2'],
      gusii: ['gs1', 'gs2'],
      somali: ['sm1', 'sm2'],
    },
    orderIndex: 1,
  },
  {
    id: 'sent-1-2',
    lessonId: 'lesson-1',
    english: 'How are you?',
    blocks: {
      kalenjin: [
        { id: 'k3', text: 'Misoi', language: 'kalenjin' },
        { id: 'k4', text: 'aa', language: 'kalenjin' },
      ],
      kikuyu: [
        { id: 'ky3', text: 'Ũhoro', language: 'kikuyu' },
        { id: 'ky4', text: 'waku', language: 'kikuyu' },
      ],
      luo: [
        { id: 'l3', text: 'Ise', language: 'luo' },
        { id: 'l4', text: 'nadi', language: 'luo' },
      ],
      kamba: [
        { id: 'kb3', text: 'Ũlaũ', language: 'kamba' },
        { id: 'kb4', text: 'ata?', language: 'kamba' },
      ],
      luhya: [
        { id: 'lh3', text: 'Oli', language: 'luhya' },
        { id: 'lh4', text: 'wila?', language: 'luhya' },
      ],
      gusii: [
        { id: 'gs3', text: 'Nigwe', language: 'gusii' },
        { id: 'gs4', text: 'ata?', language: 'gusii' },
      ],
      somali: [
        { id: 'sm3', text: 'Sidee', language: 'somali' },
        { id: 'sm4', text: 'tahay?', language: 'somali' },
      ],
    },
    correctOrder: {
      kalenjin: ['k3', 'k4'],
      kikuyu: ['ky3', 'ky4'],
      luo: ['l3', 'l4'],
      kamba: ['kb3', 'kb4'],
      luhya: ['lh3', 'lh4'],
      gusii: ['gs3', 'gs4'],
      somali: ['sm3', 'sm4'],
    },
    orderIndex: 2,
  },
  {
    id: 'sent-1-3',
    lessonId: 'lesson-1',
    english: 'Goodbye my friend',
    blocks: {
      kalenjin: [
        { id: 'k5', text: 'Koguutyo', language: 'kalenjin' },
        { id: 'k6', text: 'olda', language: 'kalenjin' },
      ],
      kikuyu: [
        { id: 'ky5', text: 'Tiguo', language: 'kikuyu' },
        { id: 'ky6', text: 'wega', language: 'kikuyu' },
      ],
      luo: [
        { id: 'l5', text: 'Oriti', language: 'luo' },
        { id: 'l6', text: 'cham', language: 'luo' },
      ],
      kamba: [
        { id: 'kb5', text: 'Tata', language: 'kamba' },
        { id: 'kb6', text: 'mwenda', language: 'kamba' },
      ],
      luhya: [
        { id: 'lh5', text: 'Nisikhe', language: 'luhya' },
        { id: 'lh6', text: 'omwenda', language: 'luhya' },
      ],
      gusii: [
        { id: 'gs5', text: 'Sala', language: 'gusii' },
        { id: 'gs6', text: 'ogenda', language: 'gusii' },
      ],
      somali: [
        { id: 'sm5', text: 'Nabad', language: 'somali' },
        { id: 'sm6', text: 'gelyo', language: 'somali' },
      ],
    },
    correctOrder: {
      kalenjin: ['k5', 'k6'],
      kikuyu: ['ky5', 'ky6'],
      luo: ['l5', 'l6'],
      kamba: ['kb5', 'kb6'],
      luhya: ['lh5', 'lh6'],
      gusii: ['gs5', 'gs6'],
      somali: ['sm5', 'sm6'],
    },
    orderIndex: 3,
  },

  // ---- Lesson 2: Numbers 1-10 ----
  {
    id: 'sent-2-1',
    lessonId: 'lesson-2',
    english: 'I have three children',
    blocks: {
      kalenjin: [
        { id: 'k20', text: 'Ara', language: 'kalenjin' },
        { id: 'k21', text: 'somok', language: 'kalenjin' },
        { id: 'k22', text: 'lakenik', language: 'kalenjin' },
      ],
      kikuyu: [
        { id: 'ky20', text: 'Nĩrĩ', language: 'kikuyu' },
        { id: 'ky21', text: 'ciana', language: 'kikuyu' },
        { id: 'ky22', text: 'ithatũ', language: 'kikuyu' },
      ],
      luo: [
        { id: 'l20', text: 'A-giyo', language: 'luo' },
        { id: 'l21', text: 'wad', language: 'luo' },
        { id: 'l22', text: 'adek', language: 'luo' },
      ],
      kamba: [
        { id: 'kb20', text: 'Nĩ', language: 'kamba' },
        { id: 'kb21', text: 'na', language: 'kamba' },
        { id: 'kb22', text: 'ana ithatũ', language: 'kamba' },
      ],
      luhya: [
        { id: 'lh20', text: 'Ene', language: 'luhya' },
        { id: 'lh21', text: 'abana', language: 'luhya' },
        { id: 'lh22', text: 'sitatu', language: 'luhya' },
      ],
      gusii: [
        { id: 'gs20', text: 'Ene', language: 'gusii' },
        { id: 'gs21', text: 'abana', language: 'gusii' },
        { id: 'gs22', text: 'saru', language: 'gusii' },
      ],
      somali: [
        { id: 'sm20', text: 'Waxaan', language: 'somali' },
        { id: 'sm21', text: 'leeyahay', language: 'somali' },
        { id: 'sm22', text: 'caruur saddex', language: 'somali' },
      ],
    },
    correctOrder: {
      kalenjin: ['k20', 'k21', 'k22'],
      kikuyu: ['ky20', 'ky21', 'ky22'],
      luo: ['l20', 'l21', 'l22'],
      kamba: ['kb20', 'kb21', 'kb22'],
      luhya: ['lh20', 'lh21', 'lh22'],
      gusii: ['gs20', 'gs21', 'gs22'],
      somali: ['sm20', 'sm21', 'sm22'],
    },
    orderIndex: 1,
  },
  {
    id: 'sent-2-2',
    lessonId: 'lesson-2',
    english: 'Give me five shillings',
    blocks: {
      kalenjin: [
        { id: 'k23', text: 'O', language: 'kalenjin' },
        { id: 'k24', text: 'mut', language: 'kalenjin' },
        { id: 'k25', text: 'shiling', language: 'kalenjin' },
      ],
      kikuyu: [
        { id: 'ky23', text: 'He', language: 'kikuyu' },
        { id: 'ky24', text: 'maĩ', language: 'kikuyu' },
        { id: 'ky25', text: 'ithano', language: 'kikuyu' },
      ],
      luo: [
        { id: 'l23', text: 'Loch', language: 'luo' },
        { id: 'l24', text: 'abich', language: 'luo' },
        { id: 'l25', text: 'pacho', language: 'luo' },
      ],
      kamba: [
        { id: 'kb23', text: 'Ũmbe', language: 'kamba' },
        { id: 'kb24', text: 'ithanũ', language: 'kamba' },
        { id: 'kb25', text: 'shilingi', language: 'kamba' },
      ],
      luhya: [
        { id: 'lh23', text: 'Shilie', language: 'luhya' },
        { id: 'lh24', text: 'isanu', language: 'luhya' },
        { id: 'lh25', text: 'tsiaano', language: 'luhya' },
      ],
      gusii: [
        { id: 'gs23', text: 'Eme', language: 'gusii' },
        { id: 'gs24', text: 'isitano', language: 'gusii' },
        { id: 'gs25', text: 'ekereri', language: 'gusii' },
      ],
      somali: [
        { id: 'sm23', text: 'I', language: 'somali' },
        { id: 'sm24', text: 'sii', language: 'somali' },
        { id: 'sm25', text: 'shan shilin', language: 'somali' },
      ],
    },
    correctOrder: {
      kalenjin: ['k23', 'k24', 'k25'],
      kikuyu: ['ky23', 'ky24', 'ky25'],
      luo: ['l23', 'l24', 'l25'],
      kamba: ['kb23', 'kb24', 'kb25'],
      luhya: ['lh23', 'lh24', 'lh25'],
      gusii: ['gs23', 'gs24', 'gs25'],
      somali: ['sm23', 'sm24', 'sm25'],
    },
    orderIndex: 2,
  },

  // ---- Lesson 3: Family Members ----
  {
    id: 'sent-3-1',
    lessonId: 'lesson-3',
    english: 'This is my mother',
    blocks: {
      kalenjin: [
        { id: 'k10', text: 'Kone', language: 'kalenjin' },
        { id: 'k11', text: 'Kogo', language: 'kalenjin' },
      ],
      kikuyu: [
        { id: 'ky10', text: 'Ũyũ', language: 'kikuyu' },
        { id: 'ky11', text: 'ni maitũ', language: 'kikuyu' },
      ],
      luo: [
        { id: 'l10', text: 'Mani', language: 'luo' },
        { id: 'l11', text: 'en mama', language: 'luo' },
      ],
      kamba: [
        { id: 'kb10', text: 'Ũyu', language: 'kamba' },
        { id: 'kb11', text: 'ni maitũ', language: 'kamba' },
      ],
      luhya: [
        { id: 'lh10', text: 'Yuno', language: 'luhya' },
        { id: 'lh11', text: 'ni mama', language: 'luhya' },
      ],
      gusii: [
        { id: 'gs10', text: 'Inwe', language: 'gusii' },
        { id: 'gs11', text: 'nke mama', language: 'gusii' },
      ],
      somali: [
        { id: 'sm10', text: 'Kan', language: 'somali' },
        { id: 'sm11', text: 'waa hooyaday', language: 'somali' },
      ],
    },
    correctOrder: {
      kalenjin: ['k10', 'k11'],
      kikuyu: ['ky10', 'ky11'],
      luo: ['l10', 'l11'],
      kamba: ['kb10', 'kb11'],
      luhya: ['lh10', 'lh11'],
      gusii: ['gs10', 'gs11'],
      somali: ['sm10', 'sm11'],
    },
    orderIndex: 1,
  },
  {
    id: 'sent-3-2',
    lessonId: 'lesson-3',
    english: 'I have a sister',
    blocks: {
      kalenjin: [
        { id: 'k12', text: 'Ara', language: 'kalenjin' },
        { id: 'k13', text: 'chebkile', language: 'kalenjin' },
      ],
      kikuyu: [
        { id: 'ky12', text: 'Nĩrĩ', language: 'kikuyu' },
        { id: 'ky13', text: 'mwarĩ wa nyina', language: 'kikuyu' },
      ],
      luo: [
        { id: 'l12', text: 'Ariyo', language: 'luo' },
        { id: 'l13', text: 'ko nyamera', language: 'luo' },
      ],
      kamba: [
        { id: 'kb12', text: 'Nĩ', language: 'kamba' },
        { id: 'kb13', text: 'na mwende', language: 'kamba' },
      ],
      luhya: [
        { id: 'lh12', text: 'Ene', language: 'luhya' },
        { id: 'lh13', text: 'ineni', language: 'luhya' },
      ],
      gusii: [
        { id: 'gs12', text: 'Ene', language: 'gusii' },
        { id: 'gs13', text: 'omokhana', language: 'gusii' },
      ],
      somali: [
        { id: 'sm12', text: 'Waxaan', language: 'somali' },
        { id: 'sm13', text: 'leeyahay walaasha', language: 'somali' },
      ],
    },
    correctOrder: {
      kalenjin: ['k12', 'k13'],
      kikuyu: ['ky12', 'ky13'],
      luo: ['l12', 'l13'],
      kamba: ['kb12', 'kb13'],
      luhya: ['lh12', 'lh13'],
      gusii: ['gs12', 'gs13'],
      somali: ['sm12', 'sm13'],
    },
    orderIndex: 2,
  },
  {
    id: 'sent-3-3',
    lessonId: 'lesson-3',
    english: 'Where is your father?',
    blocks: {
      kalenjin: [
        { id: 'k14', text: 'Papa', language: 'kalenjin' },
        { id: 'k15', text: 'amone', language: 'kalenjin' },
      ],
      kikuyu: [
        { id: 'ky14', text: 'Baba', language: 'kikuyu' },
        { id: 'ky15', text: 'arĩ ku?', language: 'kikuyu' },
      ],
      luo: [
        { id: 'l14', text: 'Wuoro', language: 'luo' },
        { id: 'l15', text: 'en manyimore?', language: 'luo' },
      ],
      kamba: [
        { id: 'kb14', text: 'Baba', language: 'kamba' },
        { id: 'kb15', text: 'arĩ kũ?', language: 'kamba' },
      ],
      luhya: [
        { id: 'lh14', text: 'Papa', language: 'luhya' },
        { id: 'lh15', text: 'ali kwili?', language: 'luhya' },
      ],
      gusii: [
        { id: 'gs14', text: 'Baba', language: 'gusii' },
        { id: 'gs15', text: 'eri nkwe?', language: 'gusii' },
      ],
      somali: [
        { id: 'sm14', text: 'Aabbaha', language: 'somali' },
        { id: 'sm15', text: 'halkuu jiraa?', language: 'somali' },
      ],
    },
    correctOrder: {
      kalenjin: ['k14', 'k15'],
      kikuyu: ['ky14', 'ky15'],
      luo: ['l14', 'l15'],
      kamba: ['kb14', 'kb15'],
      luhya: ['lh14', 'lh15'],
      gusii: ['gs14', 'gs15'],
      somali: ['sm14', 'sm15'],
    },
    orderIndex: 3,
  },
];

export function getExercisesForLesson(lessonId: string): SentenceExercise[] {
  return sentenceExercises
    .filter((ex) => ex.lessonId === lessonId)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getLanguageName(lang: string): string {
  const names: Record<string, string> = {
    kalenjin: 'Kalenjin',
    kikuyu: 'Kikuyu',
    luo: 'Luo',
    kamba: 'Kamba',
    luhya: 'Luhya',
    gusii: 'Gusii',
    somali: 'Somali',
  };
  return names[lang] || lang;
}
