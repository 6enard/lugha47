export type LanguageId = 'kalenjin' | 'kikuyu' | 'luo' | 'kamba' | 'luhya' | 'gusii' | 'somali';

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

/* ─────────────────────────────────────
   KAMBA
───────────────────────────────────── */
const kambaScenarios: ConversationScenario[] = [
  {
    id: 'kamba-home',
    title: 'At Home',
    icon: 'home',
    description: 'Everyday conversations around the house',
    orderIndex: 1,
    turns: [
      { id: 'h1', speaker: 'a', text: 'Ũ mwega!', english: 'Good morning!' },
      { id: 'h2', speaker: 'b', text: 'Ũlaũ?', english: 'How are you?' },
      { id: 'h3', speaker: 'a', text: 'Nĩ mwega, eye.', english: "I'm fine, thank you." },
      { id: 'h4', speaker: 'b', text: 'Maitũ arĩ kũ?', english: 'Where is mother?' },
      { id: 'h5', speaker: 'a', text: 'Arĩ ndani.', english: 'Mother is inside.' },
    ],
  },
  {
    id: 'kamba-market',
    title: 'At the Market',
    icon: 'shopping',
    description: 'Buying and bargaining at the market',
    orderIndex: 2,
    turns: [
      { id: 'm1', speaker: 'a', text: 'Ũndũ ũyũ ngwata ata?', english: 'How much is this?' },
      { id: 'm2', speaker: 'b', text: 'Nĩ mia ĩmwe.', english: 'It is one hundred shillings.' },
      { id: 'm3', speaker: 'a', text: 'Nĩ mũnene mũno.', english: "That's expensive." },
      { id: 'm4', speaker: 'a', text: 'Ũkondei!', english: 'Can you reduce the price?' },
      { id: 'm5', speaker: 'b', text: 'Ee, nĩ mia inyanya.', english: 'Yes, it is eighty shillings.' },
    ],
  },
  {
    id: 'kamba-transport',
    title: 'Getting Transport',
    icon: 'car',
    description: 'Taking a matatu or taxi',
    orderIndex: 3,
    turns: [
      { id: 't1', speaker: 'a', text: 'Ũkĩenda kũ?', english: 'Where are you going?' },
      { id: 't2', speaker: 'b', text: 'Nĩkenda taũni.', english: "I'm going to town." },
      { id: 't3', speaker: 'a', text: 'Matatu ngwata?', english: 'How much is the fare?' },
      { id: 't4', speaker: 'b', text: 'Nĩ magana matatũ.', english: 'It is two hundred shillings.' },
    ],
  },
  {
    id: 'kamba-restaurant',
    title: 'At a Restaurant',
    icon: 'utensils',
    description: 'Ordering food and drinks',
    orderIndex: 4,
    turns: [
      { id: 'r1', speaker: 'a', text: 'Nĩenda irio.', english: 'I would like food.' },
      { id: 'r2', speaker: 'b', text: 'Wĩrenda irio kĩaũ?', english: 'What would you like to eat?' },
      { id: 'r3', speaker: 'a', text: 'Nĩrenda sukuma.', english: 'I want sukuma (greens).' },
      { id: 'r4', speaker: 'b', text: 'Ũrenda kũnyua ata?', english: 'What would you like to drink?' },
      { id: 'r5', speaker: 'a', text: 'Nĩrenda maĩ.', english: 'I want water.' },
    ],
  },
  {
    id: 'kamba-meeting',
    title: 'Meeting Someone',
    icon: 'users',
    description: 'Introductions and getting to know someone',
    orderIndex: 5,
    turns: [
      { id: 'me1', speaker: 'a', text: 'Nĩwe ũngĩte ata?', english: 'What is your name?' },
      { id: 'me2', speaker: 'b', text: 'Nĩrĩ John.', english: 'My name is John.' },
      { id: 'me3', speaker: 'a', text: 'Ũikaraga kũ?', english: 'Where are you from?' },
      { id: 'me4', speaker: 'b', text: 'Nĩikaraga Machakos.', english: 'I am from Machakos.' },
      { id: 'me5', speaker: 'a', text: 'Ũ mwega, John!', english: 'Nice to meet you, John!' },
    ],
  },
  {
    id: 'kamba-school',
    title: 'At School',
    icon: 'school',
    description: 'Classroom and school conversations',
    orderIndex: 6,
    turns: [
      { id: 's1', speaker: 'a', text: 'Mwalimu arĩ kũ?', english: 'Where is the teacher?' },
      { id: 's2', speaker: 'b', text: 'Arĩ kilasi.', english: 'The teacher is in class.' },
      { id: 's3', speaker: 'a', text: 'Ndarĩ kĩbuku.', english: 'I have a book.' },
      { id: 's4', speaker: 'b', text: 'ĩgũrura kĩbuku kĩu!', english: 'Open your book!' },
    ],
  },
];

/* ─────────────────────────────────────
   LUHYA
───────────────────────────────────── */
const luhyaScenarios: ConversationScenario[] = [
  {
    id: 'luhya-home',
    title: 'At Home',
    icon: 'home',
    description: 'Everyday conversations around the house',
    orderIndex: 1,
    turns: [
      { id: 'h1', speaker: 'a', text: 'Mulembe!', english: 'Good morning!' },
      { id: 'h2', speaker: 'b', text: 'Oliwila?', english: 'How are you?' },
      { id: 'h3', speaker: 'a', text: 'Ndi mwega, asante.', english: "I'm fine, thank you." },
      { id: 'h4', speaker: 'b', text: 'Mama ali kwili?', english: 'Where is mother?' },
      { id: 'h5', speaker: 'a', text: 'Ali mumoni.', english: 'Mother is inside.' },
    ],
  },
  {
    id: 'luhya-market',
    title: 'At the Market',
    icon: 'shopping',
    description: 'Buying and bargaining at the market',
    orderIndex: 2,
    turns: [
      { id: 'm1', speaker: 'a', text: 'Ebi liyi nili ofula?', english: 'How much is this?' },
      { id: 'm2', speaker: 'b', text: 'Nili tsiano ta likumi.', english: 'It is one hundred shillings.' },
      { id: 'm3', speaker: 'a', text: 'Nili shighudi.', english: "That's expensive." },
      { id: 'm4', speaker: 'a', text: 'Shihola hasa!', english: 'Can you reduce the price?' },
      { id: 'm5', speaker: 'b', text: 'Ee, nili tsiano ta mufundanu.', english: 'Yes, it is eighty shillings.' },
    ],
  },
  {
    id: 'luhya-transport',
    title: 'Getting Transport',
    icon: 'car',
    description: 'Taking a matatu or taxi',
    orderIndex: 3,
    turns: [
      { id: 't1', speaker: 'a', text: 'Uliuya kwili?', english: 'Where are you going?' },
      { id: 't2', speaker: 'b', text: 'Ndiuya muchi.', english: "I'm going to town." },
      { id: 't3', speaker: 'a', text: 'Matatu ni shilingi nianga?', english: 'How much is the fare?' },
      { id: 't4', speaker: 'b', text: 'Nili tsiano ta bibili.', english: 'It is two hundred shillings.' },
    ],
  },
  {
    id: 'luhya-restaurant',
    title: 'At a Restaurant',
    icon: 'utensils',
    description: 'Ordering food and drinks',
    orderIndex: 4,
    turns: [
      { id: 'r1', speaker: 'a', text: 'Nenda obuloola.', english: 'I would like food.' },
      { id: 'r2', speaker: 'b', text: 'Uenda obuloola busi?', english: 'What would you like to eat?' },
      { id: 'r3', speaker: 'a', text: 'Nenda lisukuma.', english: 'I want sukuma (greens).' },
      { id: 'r4', speaker: 'b', text: 'Uenda kunwa busi?', english: 'What would you like to drink?' },
      { id: 'r5', speaker: 'a', text: 'Nenda amatsi.', english: 'I want water.' },
    ],
  },
  {
    id: 'luhya-meeting',
    title: 'Meeting Someone',
    icon: 'users',
    description: 'Introductions and getting to know someone',
    orderIndex: 5,
    turns: [
      { id: 'me1', speaker: 'a', text: 'Elina lili nina?', english: 'What is your name?' },
      { id: 'me2', speaker: 'b', text: 'Elina nĩ John.', english: 'My name is John.' },
      { id: 'me3', speaker: 'a', text: 'Uiamila kwili?', english: 'Where are you from?' },
      { id: 'me4', speaker: 'b', text: 'Niamila Kakamega.', english: 'I am from Kakamega.' },
      { id: 'me5', speaker: 'a', text: 'Mulembe, John!', english: 'Nice to meet you, John!' },
    ],
  },
  {
    id: 'luhya-school',
    title: 'At School',
    icon: 'school',
    description: 'Classroom and school conversations',
    orderIndex: 6,
    turns: [
      { id: 's1', speaker: 'a', text: 'Mwalimu ali kwili?', english: 'Where is the teacher?' },
      { id: 's2', speaker: 'b', text: 'Ali mu kilasi.', english: 'The teacher is in class.' },
      { id: 's3', speaker: 'a', text: 'Ene eshitabu.', english: 'I have a book.' },
      { id: 's4', speaker: 'b', text: 'Igurula eshitabu!', english: 'Open your book!' },
    ],
  },
];

/* ─────────────────────────────────────
   GUSII
───────────────────────────────────── */
const gusiiScenarios: ConversationScenario[] = [
  {
    id: 'gusii-home',
    title: 'At Home',
    icon: 'home',
    description: 'Everyday conversations around the house',
    orderIndex: 1,
    turns: [
      { id: 'h1', speaker: 'a', text: 'Oigose!', english: 'Good morning!' },
      { id: 'h2', speaker: 'b', text: 'Nigwe?', english: 'How are you?' },
      { id: 'h3', speaker: 'a', text: 'Ndega, eraki.', english: "I'm fine, thank you." },
      { id: 'h4', speaker: 'b', text: 'Mama eri nkwe?', english: 'Where is mother?' },
      { id: 'h5', speaker: 'a', text: 'Eri nkonka.', english: 'Mother is inside.' },
    ],
  },
  {
    id: 'gusii-market',
    title: 'At the Market',
    icon: 'shopping',
    description: 'Buying and bargaining at the market',
    orderIndex: 2,
    turns: [
      { id: 'm1', speaker: 'a', text: 'Egasi yiye iriata?', english: 'How much is this?' },
      { id: 'm2', speaker: 'b', text: 'Iri ta ekereri.', english: 'It is one hundred shillings.' },
      { id: 'm3', speaker: 'a', text: 'Egasi nkechi.', english: "That's expensive." },
      { id: 'm4', speaker: 'a', text: 'Gochera!', english: 'Can you reduce the price?' },
      { id: 'm5', speaker: 'b', text: 'Ee, iri ta ensese.', english: 'Yes, it is eighty shillings.' },
    ],
  },
  {
    id: 'gusii-transport',
    title: 'Getting Transport',
    icon: 'car',
    description: 'Taking a matatu or taxi',
    orderIndex: 3,
    turns: [
      { id: 't1', speaker: 'a', text: 'Ura nkwe?', english: 'Where are you going?' },
      { id: 't2', speaker: 'b', text: 'Ngera motown.', english: "I'm going to town." },
      { id: 't3', speaker: 'a', text: 'Matatu iriata?', english: 'How much is the fare?' },
      { id: 't4', speaker: 'b', text: 'Iri ta ekereri ebiri.', english: 'It is two hundred shillings.' },
    ],
  },
  {
    id: 'gusii-restaurant',
    title: 'At a Restaurant',
    icon: 'utensils',
    description: 'Ordering food and drinks',
    orderIndex: 4,
    turns: [
      { id: 'r1', speaker: 'a', text: 'Ndegera echakura.', english: 'I would like food.' },
      { id: 'r2', speaker: 'b', text: 'Udegera echakura eki?', english: 'What would you like to eat?' },
      { id: 'r3', speaker: 'a', text: 'Ndegera risukuma.', english: 'I want sukuma (greens).' },
      { id: 'r4', speaker: 'b', text: 'Udegera kunywa eki?', english: 'What would you like to drink?' },
      { id: 'r5', speaker: 'a', text: 'Ndegera amach.', english: 'I want water.' },
    ],
  },
  {
    id: 'gusii-meeting',
    title: 'Meeting Someone',
    icon: 'users',
    description: 'Introductions and getting to know someone',
    orderIndex: 5,
    turns: [
      { id: 'me1', speaker: 'a', text: 'Erita riawe?', english: 'What is your name?' },
      { id: 'me2', speaker: 'b', text: 'Erita nke John.', english: 'My name is John.' },
      { id: 'me3', speaker: 'a', text: 'Uramila nkwe?', english: 'Where are you from?' },
      { id: 'me4', speaker: 'b', text: 'Ndamila Kisii.', english: 'I am from Kisii.' },
      { id: 'me5', speaker: 'a', text: 'Oigose, John!', english: 'Nice to meet you, John!' },
    ],
  },
  {
    id: 'gusii-school',
    title: 'At School',
    icon: 'school',
    description: 'Classroom and school conversations',
    orderIndex: 6,
    turns: [
      { id: 's1', speaker: 'a', text: 'Omosacha eri nkwe?', english: 'Where is the teacher?' },
      { id: 's2', speaker: 'b', text: 'Eri mu kilasi.', english: 'The teacher is in class.' },
      { id: 's3', speaker: 'a', text: 'Ene egetabu.', english: 'I have a book.' },
      { id: 's4', speaker: 'b', text: 'Tengera egetabu!', english: 'Open your book!' },
    ],
  },
];

/* ─────────────────────────────────────
   SOMALI
───────────────────────────────────── */
const somaliScenarios: ConversationScenario[] = [
  {
    id: 'somali-home',
    title: 'At Home',
    icon: 'home',
    description: 'Everyday conversations around the house',
    orderIndex: 1,
    turns: [
      { id: 'h1', speaker: 'a', text: 'Subax wanaagsan!', english: 'Good morning!' },
      { id: 'h2', speaker: 'b', text: 'Sidee tahay?', english: 'How are you?' },
      { id: 'h3', speaker: 'a', text: 'Waan fiicanahay, mahadsanid.', english: "I'm fine, thank you." },
      { id: 'h4', speaker: 'b', text: 'Hooyadaa haysaata?', english: 'Where is mother?' },
      { id: 'h5', speaker: 'a', text: 'Hooyada guriga ayaa ku jirta.', english: 'Mother is inside.' },
    ],
  },
  {
    id: 'somali-market',
    title: 'At the Market',
    icon: 'shopping',
    description: 'Buying and bargaining at the market',
    orderIndex: 2,
    turns: [
      { id: 'm1', speaker: 'a', text: 'Kan gatiisu waa imisa?', english: 'How much is this?' },
      { id: 'm2', speaker: 'b', text: 'Waa boqol shilin.', english: 'It is one hundred shillings.' },
      { id: 'm3', speaker: 'a', text: 'Hadiyad baa jirtaa.', english: "That's expensive." },
      { id: 'm4', speaker: 'a', text: 'Sii kooban!', english: 'Can you reduce the price?' },
      { id: 'm5', speaker: 'b', text: 'Haa, waa siddeedan shilin.', english: 'Yes, it is eighty shillings.' },
    ],
  },
  {
    id: 'somali-transport',
    title: 'Getting Transport',
    icon: 'car',
    description: 'Taking a matatu or taxi',
    orderIndex: 3,
    turns: [
      { id: 't1', speaker: 'a', text: 'Xaggee aadayaa?', english: 'Where are you going?' },
      { id: 't2', speaker: 'b', text: 'Waxaan aadayaa magaalada.', english: "I'm going to town." },
      { id: 't3', speaker: 'a', text: 'Tikadhka waa imisa?', english: 'How much is the fare?' },
      { id: 't4', speaker: 'b', text: 'Waa laba boqol shilin.', english: 'It is two hundred shillings.' },
    ],
  },
  {
    id: 'somali-restaurant',
    title: 'At a Restaurant',
    icon: 'utensils',
    description: 'Ordering food and drinks',
    orderIndex: 4,
    turns: [
      { id: 'r1', speaker: 'a', text: 'Cunno baan rabaa.', english: 'I would like food.' },
      { id: 'r2', speaker: 'b', text: 'Maxaad rabtaa inaad cunto?', english: 'What would you like to eat?' },
      { id: 'r3', speaker: 'a', text: 'Sukuma baan rabaa.', english: 'I want sukuma (greens).' },
      { id: 'r4', speaker: 'b', text: 'Maxaad rabtaa inaad cabto?', english: 'What would you like to drink?' },
      { id: 'r5', speaker: 'a', text: 'Biyaha baan rabaa.', english: 'I want water.' },
    ],
  },
  {
    id: 'somali-meeting',
    title: 'Meeting Someone',
    icon: 'users',
    description: 'Introductions and getting to know someone',
    orderIndex: 5,
    turns: [
      { id: 'me1', speaker: 'a', text: 'Magacaa waa kuma?', english: 'What is your name?' },
      { id: 'me2', speaker: 'b', text: 'Magacygu waa John.', english: 'My name is John.' },
      { id: 'me3', speaker: 'a', text: 'Xaggee ka timid?', english: 'Where are you from?' },
      { id: 'me4', speaker: 'b', text: 'Waxaan ka timid Garissa.', english: 'I am from Garissa.' },
      { id: 'me5', speaker: 'a', text: 'Kulan wanaagsan, John!', english: 'Nice to meet you, John!' },
    ],
  },
  {
    id: 'somali-school',
    title: 'At School',
    icon: 'school',
    description: 'Classroom and school conversations',
    orderIndex: 6,
    turns: [
      { id: 's1', speaker: 'a', text: 'Macallimku halkuu jiraa?', english: 'Where is the teacher?' },
      { id: 's2', speaker: 'b', text: 'Fasalka buu ku jiraa.', english: 'The teacher is in class.' },
      { id: 's3', speaker: 'a', text: 'Buug baan qabaa.', english: 'I have a book.' },
      { id: 's4', speaker: 'b', text: 'Buuggaaga fur!', english: 'Open your book!' },
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
  kamba: {
    languageId: 'kamba',
    languageName: 'Kamba',
    nativeName: 'Kikamba',
    scenarios: kambaScenarios,
  },
  luhya: {
    languageId: 'luhya',
    languageName: 'Luhya',
    nativeName: 'Luluhya',
    scenarios: luhyaScenarios,
  },
  gusii: {
    languageId: 'gusii',
    languageName: 'Gusii',
    nativeName: 'Ekegusii',
    scenarios: gusiiScenarios,
  },
  somali: {
    languageId: 'somali',
    languageName: 'Somali',
    nativeName: 'Soomaali',
    scenarios: somaliScenarios,
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