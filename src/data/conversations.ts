export interface ConversationTurn {
  id: string;
  speaker: 'a' | 'b';
  /** translations per language */
  translations: {
    kalenjin: string;
    kikuyu: string;
    luo: string;
  };
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

export const conversationScenarios: ConversationScenario[] = [
  {
    id: 'conv-home',
    title: 'At Home',
    icon: 'home',
    description: 'Everyday conversations around the house',
    orderIndex: 1,
    turns: [
      {
        id: 'h1',
        speaker: 'a',
        translations: {
          kalenjin: 'Chamge!',
          kikuyu: 'Wĩ mwega!',
          luo: 'Oyawore!',
        },
        english: 'Good morning!',
      },
      {
        id: 'h2',
        speaker: 'b',
        translations: {
          kalenjin: 'Misoi aa?',
          kikuyu: 'Ũhoro waku ni wa?',
          luo: 'Ise nadi?',
        },
        english: 'How are you?',
      },
      {
        id: 'h3',
        speaker: 'a',
        translations: {
          kalenjin: 'Aa kongoi mising.',
          kikuyu: 'Nĩ wega, matukũ maingĩ.',
          luo: 'Adwaro maber, erokamano.',
        },
        english: "I'm fine, thank you.",
      },
      {
        id: 'h4',
        speaker: 'b',
        translations: {
          kalenjin: 'Kone Kogo amone?',
          kikuyu: 'Maitũ arĩ ku?',
          luo: 'Mama en manyimore?',
        },
        english: 'Where is mother?',
      },
      {
        id: 'h5',
        speaker: 'a',
        translations: {
          kalenjin: 'Kogo koos konye.',
          kikuyu: 'Maitũ arĩ ndani.',
          luo: 'Mama en chung.',
        },
        english: 'Mother is inside.',
      },
    ],
  },
  {
    id: 'conv-market',
    title: 'At the Market',
    icon: 'shopping',
    description: 'Buying and bargaining at the market',
    orderIndex: 2,
    turns: [
      {
        id: 'm1',
        speaker: 'a',
        translations: {
          kalenjin: "ngon'weni?",
          kikuyu: 'Ģĩkĩ nigwĩra ata?',
          luo: 'Gin timore kaka?',
        },
        english: 'How much is this?',
      },
      {
        id: 'm2',
        speaker: 'b',
        translations: {
          kalenjin: "Ng'wen ta mia.",
          kikuyu: 'Nĩ mirongo inya.',
          luo: 'En pacho achiel',
        },
        english: 'It is one hundred shillings.',
      },
      {
        id: 'm3',
        speaker: 'a',
        translations: {
          kalenjin: "Ng'wen oboyo.",
          kikuyu: 'Nĩ mũnene mũno.',
          luo: 'Berc ne tim lwedho.',
        },
        english: "That's expensive.",
      },
      {
        id: 'm4',
        speaker: 'a',
        translations: {
          kalenjin: "Ng'wen uo!",
          kikuyu: 'Thūni kana ĩhoya!',
          luo: 'Dhi lokri!',
        },
        english: 'Can you reduce the price?',
      },
      {
        id: 'm5',
        speaker: 'b',
        translations: {
          kalenjin: "Ee, ng'wen ta mit ab'k.",
          kikuyu: 'Ĩyo, ni mirongo itatũ.',
          luo: 'Ee, en pacho adek',
        },
        english: 'Yes, it is eighty shillings.',
      },
    ],
  },
  {
    id: 'conv-transport',
    title: 'Getting Transport',
    icon: 'car',
    description: 'Taking a matatu or taxi',
    orderIndex: 3,
    turns: [
      {
        id: 't1',
        speaker: 'a',
        translations: {
          kalenjin: 'Igeta king?',
          kikuyu: 'Ũkiũragia ku?',
          luo: 'Ibiro kwani?',
        },
        english: 'Where are you going?',
      },
      {
        id: 't2',
        speaker: 'b',
        translations: {
          kalenjin: 'Ageta kony town.',
          kikuyu: 'Ndĩrĩ kĩambaa.',
          luo: 'Abiro e dala.',
        },
        english: "I'm going to town.",
      },
      {
        id: 't3',
        speaker: 'a',
        translations: {
          kalenjin: "Ng'wen bonito?",
          kikuyu: 'Matatu ni ngwata?',
          luo: "Nang'udi nyalangore?",
        },
        english: 'How much is the fare?',
      },
      {
        id: 't4',
        speaker: 'b',
        translations: {
          kalenjin: "Ng'wen ta ari.",
          kikuyu: 'Ni magana matatũ.',
          luo: 'En pacho ariyo',
        },
        english: 'It is two hundred shillings.',
      },
    ],
  },
  {
    id: 'conv-restaurant',
    title: 'At a Restaurant',
    icon: 'utensils',
    description: 'Ordering food and drinks',
    orderIndex: 4,
    turns: [
      {
        id: 'r1',
        speaker: 'a',
        translations: {
          kalenjin: 'Aom chiemo.',
          kikuyu: 'Ndĩha irio.',
          luo: 'Adwaro chiemo.',
        },
        english: 'I would like food.',
      },
      {
        id: 'r2',
        speaker: 'b',
        translations: {
          kalenjin: 'In chiemo gain?',
          kikuyu: 'Wĩrenda irio ku?',
          luo: 'I dwaro chiemo nining?',
        },
        english: 'What would you like to eat?',
      },
      {
        id: 'r3',
        speaker: 'a',
        translations: {
          kalenjin: 'Aom sukuma.',
          kikuyu: 'Ndĩrenda sukuma.',
          luo: 'Adwaro sukuma.',
        },
        english: 'I want sukuma (greens).',
      },
      {
        id: 'r4',
        speaker: 'b',
        translations: {
          kalenjin: 'In yat gain?',
          kikuyu: 'Ũrenda kũnyua atĩĩ?',
          luo: 'I dwaro malo nining?',
        },
        english: 'What would you like to drink?',
      },
      {
        id: 'r5',
        speaker: 'a',
        translations: {
          kalenjin: 'Aom pi.',
          kikuyu: 'Ndĩrenda maĩ.',
          luo: 'Adwaro pi.',
        },
        english: 'I want water.',
      },
    ],
  },
  {
    id: 'conv-meeting',
    title: 'Meeting Someone',
    icon: 'users',
    description: 'Introductions and getting to know someone',
    orderIndex: 5,
    turns: [
      {
        id: 'me1',
        speaker: 'a',
        translations: {
          kalenjin: 'Kuoneyi?',
          kikuyu: 'Nĩwe nyũmbe ku?',
          luo: 'Nyingi?',
        },
        english: 'What is your name?',
      },
      {
        id: 'me2',
        speaker: 'b',
        translations: {
          kalenjin: 'Ketab John.',
          kikuyu: 'Nĩrĩ John.',
          luo: 'Nyingi en John.',
        },
        english: 'My name is John.',
      },
      {
        id: 'me3',
        speaker: 'a',
        translations: {
          kalenjin: 'Iboy konyi?',
          kikuyu: 'Ũikaraga ku?',
          luo: 'Ibiro kwani?',
        },
        english: 'Where are you from?',
      },
      {
        id: 'me4',
        speaker: 'b',
        translations: {
          kalenjin: 'Abu Kericho.',
          kikuyu: 'Nĩikaraga Nyeri.',
          luo: 'Awuod Kisumu.',
        },
        english: 'I am from Kericho / Nyeri / Kisumu.',
      },
      {
        id: 'me5',
        speaker: 'a',
        translations: {
          kalenjin: 'Chamge, John!',
          kikuyu: 'Wĩ mwega, John!',
          luo: 'Oyawore, John!',
        },
        english: 'Nice to meet you, John!',
      },
    ],
  },
  {
    id: 'conv-school',
    title: 'At School',
    icon: 'school',
    description: 'Classroom and school conversations',
    orderIndex: 6,
    turns: [
      {
        id: 's1',
        speaker: 'a',
        translations: {
          kalenjin: 'Mwalimu amone?',
          kikuyu: 'Mũthamaki arĩ ku?',
          luo: 'Japuonj ne omanyimbe?',
        },
        english: 'Where is the teacher?',
      },
      {
        id: 's2',
        speaker: 'b',
        translations: {
          kalenjin: 'Mwalimu koos class.',
          kikuyu: 'Arĩ kilasi-inĩ.',
          luo: 'En e kilasni.',
        },
        english: 'The teacher is in class.',
      },
      {
        id: 's3',
        speaker: 'a',
        translations: {
          kalenjin: 'Ara buk.',
          kikuyu: 'Ndarĩ gĩbuku.',
          luo: 'Aga buk.',
        },
        english: 'I have a book.',
      },
      {
        id: 's4',
        speaker: 'b',
        translations: {
          kalenjin: 'Yiy buk!',
          kikuyu: 'Igũrũra gĩbuku kĩu!',
          luo: 'Yab buk ni!',
        },
        english: 'Open your book!',
      },
    ],
  },
];

export function getConversationScenarios(): ConversationScenario[] {
  return conversationScenarios.sort((a, b) => a.orderIndex - b.orderIndex);
}
