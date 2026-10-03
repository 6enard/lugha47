export type LanguageId = 'kalenjin' | 'kikuyu' | 'luo';

export interface ConversationTurn {
  id: string;
  speaker: 'a' | 'b';
  /** the phrase in the target language */
  text: string;
  english: string;
}

export interface ConversationScenario {
  id: string;
  title: string;
  icon: string;
  description: string;
  turns: ConversationTurn[];
  orderIndex: number;
}

export interface LanguageConversations {
  languageId: LanguageId;
  languageName: string;
  nativeName: string;
  scenarios: ConversationScenario[];
}

/* ─────────────────────────────────────
   KALENJIN
───────────────────────────────────── */
const kalenjinScenarios: ConversationScenario[] = [
  {
    id: 'kalenjin-home',
    title: 'At Home',
    icon: 'home',
    description: 'Everyday conversations around the house',
    orderIndex: 1,
    turns: [
      { id: 'h1', speaker: 'a', text: 'Chamge!', english: 'Good morning!' },
      { id: 'h2', speaker: 'b', text: 'Misoi aa?', english: 'How are you?' },
      { id: 'h3', speaker: 'a', text: 'Aa kongoi mising.', english: "I'm fine, thank you." },
      { id: 'h4', speaker: 'b', text: 'Kone Kogo amone?', english: 'Where is mother?' },
      { id: 'h5', speaker: 'a', text: 'Kogo koos konye.', english: 'Mother is inside.' },
    ],
  },
  {
    id: 'kalenjin-market',
    title: 'At the Market',
    icon: 'shopping',
    description: 'Buying and bargaining at the market',
    orderIndex: 2,
    turns: [
      { id: 'm1', speaker: 'a', text: "ngon'weni?", english: 'How much is this?' },
      { id: 'm2', speaker: 'b', text: "Ng'wen ta mia.", english: 'It is one hundred shillings.' },
      { id: 'm3', speaker: 'a', text: "Ng'wen oboyo.", english: "That's expensive." },
      { id: 'm4', speaker: 'a', text: "Ng'wen uo!", english: 'Can you reduce the price?' },
      { id: 'm5', speaker: 'b', text: "Ee, ng'wen ta mit ab'k.", english: 'Yes, it is eighty shillings.' },
    ],
  },
  {
    id: 'kalenjin-transport',
    title: 'Getting Transport',
    icon: 'car',
    description: 'Taking a matatu or taxi',
    orderIndex: 3,
    turns: [
      { id: 't1', speaker: 'a', text: 'Igeta king?', english: 'Where are you going?' },
      { id: 't2', speaker: 'b', text: 'Ageta kony town.', english: "I'm going to town." },
      { id: 't3', speaker: 'a', text: "Ng'wen bonito?", english: 'How much is the fare?' },
      { id: 't4', speaker: 'b', text: "Ng'wen ta ari.", english: 'It is two hundred shillings.' },
    ],
  },
  {
    id: 'kalenjin-restaurant',
    title: 'At a Restaurant',
    icon: 'utensils',
    description: 'Ordering food and drinks',
    orderIndex: 4,
    turns: [
      { id: 'r1', speaker: 'a', text: 'Aom chiemo.', english: 'I would like food.' },
      { id: 'r2', speaker: 'b', text: 'In chiemo gain?', english: 'What would you like to eat?' },
      { id: 'r3', speaker: 'a', text: 'Aom sukuma.', english: 'I want sukuma (greens).' },
      { id: 'r4', speaker: 'b', text: 'In yat gain?', english: 'What would you like to drink?' },
      { id: 'r5', speaker: 'a', text: 'Aom pi.', english: 'I want water.' },
    ],
  },
  {
    id: 'kalenjin-meeting',
    title: 'Meeting Someone',
    icon: 'users',
    description: 'Introductions and getting to know someone',
    orderIndex: 5,
    turns: [
      { id: 'me1', speaker: 'a', text: 'Kuoneyi?', english: 'What is your name?' },
      { id: 'me2', speaker: 'b', text: 'Ketab John.', english: 'My name is John.' },
      { id: 'me3', speaker: 'a', text: 'Iboy konyi?', english: 'Where are you from?' },
      { id: 'me4', speaker: 'b', text: 'Abu Kericho.', english: 'I am from Kericho.' },
      { id: 'me5', speaker: 'a', text: 'Chamge, John!', english: 'Nice to meet you, John!' },
    ],
  },
  {
    id: 'kalenjin-school',
    title: 'At School',
    icon: 'school',
    description: 'Classroom and school conversations',
    orderIndex: 6,
    turns: [
      { id: 's1', speaker: 'a', text: 'Mwalimu amone?', english: 'Where is the teacher?' },
      { id: 's2', speaker: 'b', text: 'Mwalimu koos class.', english: 'The teacher is in class.' },
      { id: 's3', speaker: 'a', text: 'Ara buk.', english: 'I have a book.' },
      { id: 's4', speaker: 'b', text: 'Yiy buk!', english: 'Open your book!' },
    ],
  },
];

/* ─────────────────────────────────────
   KIKUYU
───────────────────────────────────── */
const kikuyuScenarios: ConversationScenario[] = [
  {
    id: 'kikuyu-home',
    title: 'At Home',
    icon: 'home',
    description: 'Everyday conversations around the house',
    orderIndex: 1,
    turns: [
      { id: 'h1', speaker: 'a', text: 'Wĩ mwega!', english: 'Good morning!' },
      { id: 'h2', speaker: 'b', text: 'Ũhoro waku ni wa?', english: 'How are you?' },
      { id: 'h3', speaker: 'a', text: 'Nĩ wega, matukũ maingĩ.', english: "I'm fine, thank you." },
      { id: 'h4', speaker: 'b', text: 'Maitũ arĩ ku?', english: 'Where is mother?' },
      { id: 'h5', speaker: 'a', text: 'Maitũ arĩ ndani.', english: 'Mother is inside.' },
    ],
  },
  {
    id: 'kikuyu-market',
    title: 'At the Market',
    icon: 'shopping',
    description: 'Buying and bargaining at the market',
    orderIndex: 2,
    turns: [
      { id: 'm1', speaker: 'a', text: 'Ģĩkĩ nigwĩra ata?', english: 'How much is this?' },
      { id: 'm2', speaker: 'b', text: 'Nĩ mirongo inya.', english: 'It is one hundred shillings.' },
      { id: 'm3', speaker: 'a', text: 'Nĩ mũnene mũno.', english: "That's expensive." },
      { id: 'm4', speaker: 'a', text: 'Thūni kana ĩhoya!', english: 'Can you reduce the price?' },
      { id: 'm5', speaker: 'b', text: 'Ĩyo, ni mirongo itatũ.', english: 'Yes, it is eighty shillings.' },
    ],
  },
  {
    id: 'kikuyu-transport',
    title: 'Getting Transport',
    icon: 'car',
    description: 'Taking a matatu or taxi',
    orderIndex: 3,
    turns: [
      { id: 't1', speaker: 'a', text: 'Ũkiũragia ku?', english: 'Where are you going?' },
      { id: 't2', speaker: 'b', text: 'Ndĩrĩ kĩambaa.', english: "I'm going to town." },
      { id: 't3', speaker: 'a', text: 'Matatu ni ngwata?', english: 'How much is the fare?' },
      { id: 't4', speaker: 'b', text: 'Ni magana matatũ.', english: 'It is two hundred shillings.' },
    ],
  },
  {
    id: 'kikuyu-restaurant',
    title: 'At a Restaurant',
    icon: 'utensils',
    description: 'Ordering food and drinks',
    orderIndex: 4,
    turns: [
      { id: 'r1', speaker: 'a', text: 'Ndĩha irio.', english: 'I would like food.' },
      { id: 'r2', speaker: 'b', text: 'Wĩrenda irio ku?', english: 'What would you like to eat?' },
      { id: 'r3', speaker: 'a', text: 'Ndĩrenda sukuma.', english: 'I want sukuma (greens).' },
      { id: 'r4', speaker: 'b', text: 'Ũrenda kũnyua atĩĩ?', english: 'What would you like to drink?' },
      { id: 'r5', speaker: 'a', text: 'Ndĩrenda maĩ.', english: 'I want water.' },
    ],
  },
  {
    id: 'kikuyu-meeting',
    title: 'Meeting Someone',
    icon: 'users',
    description: 'Introductions and getting to know someone',
    orderIndex: 5,
    turns: [
      { id: 'me1', speaker: 'a', text: 'Nĩwe nyũmbe ku?', english: 'What is your name?' },
      { id: 'me2', speaker: 'b', text: 'Nĩrĩ John.', english: 'My name is John.' },
      { id: 'me3', speaker: 'a', text: 'Ũikaraga ku?', english: 'Where are you from?' },
      { id: 'me4', speaker: 'b', text: 'Nĩikaraga Nyeri.', english: 'I am from Nyeri.' },
      { id: 'me5', speaker: 'a', text: 'Wĩ mwega, John!', english: 'Nice to meet you, John!' },
    ],
  },
  {
    id: 'kikuyu-school',
    title: 'At School',
    icon: 'school',
    description: 'Classroom and school conversations',
    orderIndex: 6,
    turns: [
      { id: 's1', speaker: 'a', text: 'Mũthamaki arĩ ku?', english: 'Where is the teacher?' },
      { id: 's2', speaker: 'b', text: 'Arĩ kilasi-inĩ.', english: 'The teacher is in class.' },
      { id: 's3', speaker: 'a', text: 'Ndarĩ gĩbuku.', english: 'I have a book.' },
      { id: 's4', speaker: 'b', text: 'Igũrũra gĩbuku kĩu!', english: 'Open your book!' },
    ],
  },
];

/* ─────────────────────────────────────
   LUO
───────────────────────────────────── */
const luoScenarios: ConversationScenario[] = [
  {
    id: 'luo-home',
    title: 'At Home',
    icon: 'home',
    description: 'Everyday conversations around the house',
    orderIndex: 1,
    turns: [
      { id: 'h1', speaker: 'a', text: 'Oyawore!', english: 'Good morning!' },
      { id: 'h2', speaker: 'b', text: 'Ise nadi?', english: 'How are you?' },
      { id: 'h3', speaker: 'a', text: 'Adwaro maber, erokamano.', english: "I'm fine, thank you." },
      { id: 'h4', speaker: 'b', text: 'Mama en manyimore?', english: 'Where is mother?' },
      { id: 'h5', speaker: 'a', text: 'Mama en chung.', english: 'Mother is inside.' },
    ],
  },
  {
    id: 'luo-market',
    title: 'At the Market',
    icon: 'shopping',
    description: 'Buying and bargaining at the market',
    orderIndex: 2,
    turns: [
      { id: 'm1', speaker: 'a', text: 'Gin timore kaka?', english: 'How much is this?' },
      { id: 'm2', speaker: 'b', text: 'En pacho achiel', english: 'It is one hundred shillings.' },
      { id: 'm3', speaker: 'a', text: 'Berc ne tim lwedho.', english: "That's expensive." },
      { id: 'm4', speaker: 'a', text: 'Dhi lokri!', english: 'Can you reduce the price?' },
      { id: 'm5', speaker: 'b', text: 'Ee, en pacho adek', english: 'Yes, it is eighty shillings.' },
    ],
  },
  {
    id: 'luo-transport',
    title: 'Getting Transport',
    icon: 'car',
    description: 'Taking a matatu or taxi',
    orderIndex: 3,
    turns: [
      { id: 't1', speaker: 'a', text: 'Ibiro kwani?', english: 'Where are you going?' },
      { id: 't2', speaker: 'b', text: 'Abiro e dala.', english: "I'm going home." },
      { id: 't3', speaker: 'a', text: "Nang'udi nyalangore?", english: 'How much is the fare?' },
      { id: 't4', speaker: 'b', text: 'En pacho ariyo', english: 'It is two hundred shillings.' },
    ],
  },
  {
    id: 'luo-restaurant',
    title: 'At a Restaurant',
    icon: 'utensils',
    description: 'Ordering food and drinks',
    orderIndex: 4,
    turns: [
      { id: 'r1', speaker: 'a', text: 'Adwaro chiemo.', english: 'I would like food.' },
      { id: 'r2', speaker: 'b', text: 'I dwaro chiemo nining?', english: 'What would you like to eat?' },
      { id: 'r3', speaker: 'a', text: 'Adwaro sukuma.', english: 'I want sukuma (greens).' },
      { id: 'r4', speaker: 'b', text: 'I dwaro malo nining?', english: 'What would you like to drink?' },
      { id: 'r5', speaker: 'a', text: 'Adwaro pi.', english: 'I want water.' },
    ],
  },
  {
    id: 'luo-meeting',
    title: 'Meeting Someone',
    icon: 'users',
    description: 'Introductions and getting to know someone',
    orderIndex: 5,
    turns: [
      { id: 'me1', speaker: 'a', text: 'Nyingi?', english: 'What is your name?' },
      { id: 'me2', speaker: 'b', text: 'Nyingi en John.', english: 'My name is John.' },
      { id: 'me3', speaker: 'a', text: 'Ibiro kwani?', english: 'Where are you from?' },
      { id: 'me4', speaker: 'b', text: 'Awuod Kisumu.', english: 'I am from Kisumu.' },
      { id: 'me5', speaker: 'a', text: 'Oyawore, John!', english: 'Nice to meet you, John!' },
    ],
  },
  {
    id: 'luo-school',
    title: 'At School',
    icon: 'school',
    description: 'Classroom and school conversations',
    orderIndex: 6,
    turns: [
      { id: 's1', speaker: 'a', text: 'Japuonj ne omanyimbe?', english: 'Where is the teacher?' },
      { id: 's2', speaker: 'b', text: 'En e kilasni.', english: 'The teacher is in class.' },
      { id: 's3', speaker: 'a', text: 'Aga buk.', english: 'I have a book.' },
      { id: 's4', speaker: 'b', text: 'Yab buk ni!', english: 'Open your book!' },
    ],
  },
];

const conversationsByLanguage: Record<LanguageId, LanguageConversations> = {
  kalenjin: {
    languageId: 'kalenjin',
    languageName: 'Kalenjin',
    nativeName: 'Kalenjin',
    scenarios: kalenjinScenarios,
  },
  kikuyu: {
    languageId: 'kikuyu',
    languageName: 'Kikuyu',
    nativeName: 'Gĩkũyũ',
    scenarios: kikuyuScenarios,
  },
  luo: {
    languageId: 'luo',
    languageName: 'Luo',
    nativeName: 'Dholuo',
    scenarios: luoScenarios,
  },
};

export function getConversationsForLanguage(languageId: string): ConversationScenario[] {
  const lang = languageId as LanguageId;
  return (conversationsByLanguage[lang]?.scenarios || []).sort(
    (a, b) => a.orderIndex - b.orderIndex
  );
}

export function getLanguageConversationInfo(languageId: string): LanguageConversations | null {
  const lang = languageId as LanguageId;
  return conversationsByLanguage[lang] || null;
}

export function getAllLanguageConversations(): LanguageConversations[] {
  return Object.values(conversationsByLanguage);
}