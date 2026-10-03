export interface SentenceBlock {
  id: string;
  text: string;
  language: 'kalenjin' | 'kikuyu' | 'luo';
}

export interface SentenceExercise {
  id: string;
  lessonId: string;
  english: string;
  /** word-blocks for each language, shuffled before display */
  blocks: {
    kalenjin: SentenceBlock[];
    kikuyu: SentenceBlock[];
    luo: SentenceBlock[];
  };
  /** correct word order for each language */
  correctOrder: {
    kalenjin: string[];
    kikuyu: string[];
    luo: string[];
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
    },
    correctOrder: {
      kalenjin: ['k1', 'k2'],
      kikuyu: ['ky1', 'ky2'],
      luo: ['l1', 'l2'],
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
    },
    correctOrder: {
      kalenjin: ['k3', 'k4'],
      kikuyu: ['ky3', 'ky4'],
      luo: ['l3', 'l4'],
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
    },
    correctOrder: {
      kalenjin: ['k5', 'k6'],
      kikuyu: ['ky5', 'ky6'],
      luo: ['l5', 'l6'],
    },
    orderIndex: 3,
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
    },
    correctOrder: {
      kalenjin: ['k10', 'k11'],
      kikuyu: ['ky10', 'ky11'],
      luo: ['l10', 'l11'],
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
    },
    correctOrder: {
      kalenjin: ['k12', 'k13'],
      kikuyu: ['ky12', 'ky13'],
      luo: ['l12', 'l13'],
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
    },
    correctOrder: {
      kalenjin: ['k14', 'k15'],
      kikuyu: ['ky14', 'ky15'],
      luo: ['l14', 'l15'],
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
  };
  return names[lang] || lang;
}
