export type LanguageId = 'kalenjin' | 'kikuyu' | 'luo';

export interface CultureItem {
  id: string;
  title: string;
  description: string;
  nativeText?: string;
  englishText?: string;
  extra?: string;
}

export interface CultureCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: CultureItem[];
  orderIndex: number;
}

export interface LanguageCulture {
  languageId: LanguageId;
  languageName: string;
  nativeName: string;
  region: string;
  overview: string;
  categories: CultureCategory[];
}

/* ─────────────────────────────────────
   KALENJIN
───────────────────────────────────── */
const kalenjinCulture: LanguageCulture = {
  languageId: 'kalenjin',
  languageName: 'Kalenjin',
  nativeName: 'Kalenjin',
  region: 'Rift Valley — Kericho, Bomet, Nandi, Uasin Gishu, Elgeyo-Marakwet, West Pokot',
  overview: 'The Kalenjin are a Nilotic people of the Rift Valley, renowned for producing world-class long-distance runners. They are a cluster of sub-groups including the Kipsigis, Nandi, Keiyo, Marakwet, Sabaot, Tugen, and Pokot, sharing language, customs, and a deep pastoral heritage.',
  categories: [
    {
      id: 'kalenjin-greetings',
      title: 'Traditional Greetings',
      icon: 'message',
      description: 'How the Kalenjin greet each other',
      orderIndex: 1,
      items: [
        { id: 'g1', title: 'Chamge', description: 'A general greeting used at any time of day', nativeText: 'Chamge!', englishText: 'Hello / Greetings!' },
        { id: 'g2', title: 'Misoi aa?', description: 'Asking about well-being', nativeText: 'Misoi aa?', englishText: 'How are you?' },
        { id: 'g3', title: 'Kongoi mising', description: 'The standard response when asked how you are', nativeText: 'Aa kongoi mising.', englishText: 'I am fine, thank you.' },
        { id: 'g4', title: 'Koguutyo', description: 'A farewell greeting', nativeText: 'Koguutyo.', englishText: 'Goodbye.' },
      ],
    },
    {
      id: 'kalenjin-names',
      title: 'Common Names & Meanings',
      icon: 'users',
      description: 'Kalenjin names and their significance',
      orderIndex: 2,
      items: [
        { id: 'n1', title: 'Kipchoge', description: 'Born near the store/granary', extra: 'One of the most traditional Kalenjin male names' },
        { id: 'n2', title: 'Chebet', description: 'Born when cattle were grazing', extra: 'A common female name among the Kipsigis' },
        { id: 'n3', title: 'Kipchumba', description: 'Born near the white man (colonial era)', extra: 'Reflects the historical context of birth' },
        { id: 'n4', title: 'Cheruiyot', description: 'Born when cattle were brought home', extra: 'A widespread surname among the Kipsigis' },
        { id: 'n5', title: 'Kiptoo', description: 'Born during the visit of relatives', extra: 'Given to boys born during family gatherings' },
        { id: 'n6', title: 'Chelagat', description: 'Born when there was plenty of milk', extra: 'A female name signifying abundance' },
      ],
    },
    {
      id: 'kalenjin-foods',
      title: 'Traditional Foods',
      icon: 'utensils',
      description: 'Staples of the Kalenjin diet',
      orderIndex: 3,
      items: [
        { id: 'f1', title: 'Mursik', description: 'Fermented milk stored in a calabash (sotet) treated with soot from specific trees. It is the iconic Kalenjin drink, rich in probiotics.', nativeText: 'Mursik', englishText: 'Fermented milk' },
        { id: 'f2', title: 'Ugali', description: 'Maize meal porridge, the staple carbohydrate eaten with vegetables or meat.', nativeText: 'Kimyet', englishText: 'Ugali' },
        { id: 'f3', title: 'Isageek', description: 'Traditional vegetable stew made from wild greens, often cooked with cream.', nativeText: 'Isageek', englishText: 'Vegetable stew' },
        { id: 'f4', title: 'Cheptilak', description: 'A traditional snack made from roasted groundnuts and honey.', nativeText: 'Cheptilak', englishText: 'Groundnut and honey snack' },
      ],
    },
    {
      id: 'kalenjin-practices',
      title: 'Cultural Practices',
      icon: 'globe',
      description: 'Traditions and customs of the Kalenjin',
      orderIndex: 4,
      items: [
        { id: 'p1', title: 'Circumcision (Initiation)', description: 'A rite of passage marking the transition from childhood to adulthood. It is a sacred ceremony accompanied by blessings, seclusion, and teachings about community responsibility.' },
        { id: 'p2', title: 'Marriage (Dot)', description: 'Marriage involves the payment of dowry (bride price) in cattle, negotiation between families, and a celebration with mursik and feasting.' },
        { id: 'p3', title: 'Cattle Keeping', description: 'Cattle are central to Kalenjin life — they represent wealth, are used for dowry, and milk is fermented into mursik. The word for wealth and cattle are deeply linked.' },
        { id: 'p4', title: 'Running Tradition', description: 'The Kalenjin, especially the Nandi and Kipsigis, are globally famous for long-distance running, attributed to high-altitude living, cultural running practices, and diet.' },
      ],
    },
    {
      id: 'kalenjin-proverbs',
      title: 'Proverbs',
      icon: 'book',
      description: 'Wisdom passed through generations',
      orderIndex: 5,
      items: [
        { id: 'pr1', title: 'Proverb 1', description: 'A proverb about unity', nativeText: 'Kemeew neetab chito koagenge.', englishText: 'The strength of one person is limited.' },
        { id: 'pr2', title: 'Proverb 2', description: 'A proverb about patience', nativeText: 'Koyo oyage obo keny.', englishText: 'A tree does not grow in one day.' },
        { id: 'pr3', title: 'Proverb 3', description: 'A proverb about respect', nativeText: 'Chito olem ageito.', englishText: 'A person is a person because of others.' },
      ],
    },
    {
      id: 'kalenjin-songs',
      title: 'Songs & Music',
      icon: 'music',
      description: 'Traditional music and dance',
      orderIndex: 6,
      items: [
        { id: 's1', title: 'Mabolek', description: 'A celebratory song sung during initiation ceremonies and weddings, accompanied by rhythmic clapping and dancing.' },
        { id: 's2', title: 'Kalebet', description: 'A running song that pace-setters would sing to encourage athletes, reflecting the deep cultural link between running and music.' },
        { id: 's3', title: 'Soot', description: 'Songs sung while milking or doing chores, reflecting the rhythm of daily pastoral life.' },
      ],
    },
    {
      id: 'kalenjin-region',
      title: 'County & Region Context',
      icon: 'map',
      description: 'Where the Kalenjin people live',
      orderIndex: 7,
      items: [
        { id: 'r1', title: 'Kericho County', description: 'Heartland of the Kipsigis sub-group, known for vast tea plantations that carpet the highlands.' },
        { id: 'r2', title: 'Nandi County', description: 'Home of the Nandi people, known for producing legendary athletes including Kipchoge Keino.' },
        { id: 'r3', title: 'Uasin Gishu County', description: 'Home to Eldoret, the commercial hub of the Rift Valley and a center for training athletes.' },
        { id: 'r4', title: 'Bomet County', description: 'Predominantly Kipsigis, an agricultural region with tea and dairy farming.' },
      ],
    },
  ],
};

/* ─────────────────────────────────────
   KIKUYU
───────────────────────────────────── */
const kikuyuCulture: LanguageCulture = {
  languageId: 'kikuyu',
  languageName: 'Kikuyu',
  nativeName: 'Gĩkũyũ',
  region: 'Central Kenya — Kiambu, Murang\'a, Nyeri, Kirinyaga, Nyandarua',
  overview: 'The Kikuyu (Agĩkũyũ) are Kenya\'s largest ethnic group, a Bantu people of the central highlands. They trace their origins to Gĩkũyũ and Mũmbi, the founding ancestors. The Kikuyu are historically agricultural, politically influential, and central to Kenya\'s independence story.',
  categories: [
    {
      id: 'kikuyu-greetings',
      title: 'Traditional Greetings',
      icon: 'message',
      description: 'How the Kikuyu greet each other',
      orderIndex: 1,
      items: [
        { id: 'g1', title: 'Wĩ mwega', description: 'A general greeting', nativeText: 'Wĩ mwega!', englishText: 'Hello / You are well!' },
        { id: 'g2', title: 'Ũhoro waku', description: 'Asking about well-being', nativeText: 'Ũhoro waku ni wa?', englishText: 'How are you?' },
        { id: 'g3', title: 'Nĩ wega', description: 'The standard positive response', nativeText: 'Nĩ wega.', englishText: 'I am fine.' },
        { id: 'g4', title: 'Tiguo wega', description: 'A farewell greeting', nativeText: 'Tiguo wega.', englishText: 'Goodbye.' },
      ],
    },
    {
      id: 'kikuyu-names',
      title: 'Common Names & Meanings',
      icon: 'users',
      description: 'Kikuyu names and their significance',
      orderIndex: 2,
      items: [
        { id: 'n1', title: 'Wanjiku', description: 'One of the nine daughters of the founding parents Gĩkũyũ and Mũmbi', extra: 'A name shared by millions of Kikuyu women' },
        { id: 'n2', title: 'Wambui', description: 'Born during the time of the boar (mbũi)', extra: 'A respected female name' },
        { id: 'n3', title: 'Kamau', description: 'A name given to a boy who is quiet and thoughtful', extra: 'One of the most common Kikuyu male names' },
        { id: 'n4', title: 'Wangari', description: 'Born during the time of the hyrax (ngari)', extra: 'Made famous by Wangari Maathai, Nobel laureate' },
        { id: 'n5', title: 'Njoroge', description: 'A boy born during a time of feasting', extra: 'A widely known Kikuyu surname' },
        { id: 'n6', title: 'Nyambura', description: 'Born during the rainy season', extra: 'A common female name connected to agriculture' },
      ],
    },
    {
      id: 'kikuyu-foods',
      title: 'Traditional Foods',
      icon: 'utensils',
      description: 'Staples of the Kikuyu diet',
      orderIndex: 3,
      items: [
        { id: 'f1', title: 'Mukimo', description: 'A signature dish made by mashing potatoes, greens ( traditionally terere / amaranth), maize, and beans together.', nativeText: 'Mũkĩmo', englishText: 'Mashed potato and greens dish' },
        { id: 'f2', title: 'Githeri', description: 'A simple but beloved dish of boiled maize and beans, eaten across Kenya.', nativeText: 'Gĩtheri', englishText: 'Maize and beans' },
        { id: 'f3', title: 'Irio', description: 'A richer version of mukimo, often served with roasted meat (nyama choma).', nativeText: 'Ĩrio', englishText: 'Mashed vegetables and potato' },
        { id: 'f4', title: 'Ucuru', description: 'Traditional fermented porridge made from millet or sorghum, often served at ceremonies.', nativeText: 'Ũcũrũ', englishText: 'Fermented porridge' },
      ],
    },
    {
      id: 'kikuyu-practices',
      title: 'Cultural Practices',
      icon: 'globe',
      description: 'Traditions and customs of the Kikuyu',
      orderIndex: 4,
      items: [
        { id: 'p1', title: 'Rũĩrano (Circumcision)', description: 'A rite of passage that traditionally marked adulthood. It was accompanied by teachings on community, bravery, and responsibility.' },
        { id: 'p2', title: 'Dowry (Rũracio)', description: 'The bride-price negotiation process where the groom\'s family visits the bride\'s family with gifts, traditionally including goats, to formalize the marriage.' },
        { id: 'p3', title: 'The Nine Daughters', description: 'The Kikuyu trace their clans to the nine daughters of Gĩkũyũ and Mũmbi: Wanjiku, Wambui, Wangari, Wanjirũ, Nyambura, Njeri, Wangũ, Wairimũ, and Gathigia. Each name is still widespread today.' },
        { id: 'p4', title: 'Mũgithi', description: 'A traditional Kikuyu prayer and thanksgiving ceremony, often involving the slaughter of a goat and sharing of food and drink.' },
      ],
    },
    {
      id: 'kikuyu-proverbs',
      title: 'Proverbs',
      icon: 'book',
      description: 'Wisdom passed through generations',
      orderIndex: 5,
      items: [
        { id: 'pr1', title: 'Proverb 1', description: 'A proverb about unity', nativeText: 'Ũmũthĩ nĩ mweri.', englishText: 'Today is a new moon — every day is a fresh start.' },
        { id: 'pr2', title: 'Proverb 2', description: 'A proverb about caution', nativeText: 'Ndũigaga ng\'ombe ya mũciĩ ĩgũkũragwo.', englishText: 'You do not slaughter the cow of the homestead.' },
        { id: 'pr3', title: 'Proverb 3', description: 'A proverb about effort', nativeText: 'Kũrĩa kũingĩhaga nĩ kũholewo.', englishText: 'What is eaten a lot is worked for.' },
      ],
    },
    {
      id: 'kikuyu-songs',
      title: 'Songs & Music',
      icon: 'music',
      description: 'Traditional music and dance',
      orderIndex: 6,
      items: [
        { id: 's1', title: 'Mũgithi', description: 'A call-and-response song performed at gatherings and celebrations, with a lead singer and chorus.' },
        { id: 's2', title: 'Kĩbaata', description: 'A traditional dance performed by young people, accompanied by drums and rhythmic stomping.' },
        { id: 's3', title: 'Wĩra wa Mũndũ', description: 'Work songs sung during communal farming (harambee) to keep rhythm and morale high.' },
      ],
    },
    {
      id: 'kikuyu-region',
      title: 'County & Region Context',
      icon: 'map',
      description: 'Where the Kikuyu people live',
      orderIndex: 7,
      items: [
        { id: 'r1', title: 'Kiambu County', description: 'The heartland of the Kikuyu, just north of Nairobi, with rich coffee and tea farms.' },
        { id: 'r2', title: 'Murang\'a County', description: 'Considered the cradle of the Kikuyu people, with sacred sites like Mukũrwe wa Nyagathanga.' },
        { id: 'r3', title: 'Nyeri County', description: 'Home to the Kikuyu of the Mount Kenya foothills, known for agriculture and the story of Mau Mau.' },
        { id: 'r4', title: 'Kirinyaga County', description: 'Named after Mount Kenya (Kĩrĩnyaga), the sacred mountain of the Kikuyu people.' },
      ],
    },
  ],
};

/* ─────────────────────────────────────
   LUO
───────────────────────────────────── */
const luoCulture: LanguageCulture = {
  languageId: 'luo',
  languageName: 'Luo',
  nativeName: 'Dholuo',
  region: 'Western Kenya — Kisumu, Siaya, Homa Bay, Migori, Kisumu County (Lake Victoria region)',
  overview: 'The Luo (Joluo) are a Nilotic people who migrated from the Nile Valley to the shores of Lake Victoria. They are known for their fishing heritage, rich musical traditions, intellectual contributions, and significant political leadership in Kenya\'s history.',
  categories: [
    {
      id: 'luo-greetings',
      title: 'Traditional Greetings',
      icon: 'message',
      description: 'How the Luo greet each other',
      orderIndex: 1,
      items: [
        { id: 'g1', title: 'Oyawore', description: 'A general greeting', nativeText: 'Oyawore!', englishText: 'Good morning / Hello!' },
        { id: 'g2', title: 'Ise nadi', description: 'Asking about well-being', nativeText: 'Ise nadi?', englishText: 'How are you?' },
        { id: 'g3', title: 'Adwaro maber', description: 'The standard positive response', nativeText: 'Adwaro maber, erokamano.', englishText: 'I am fine, thank you.' },
        { id: 'g4', title: 'Oriti', description: 'A farewell greeting', nativeText: 'Oriti.', englishText: 'Goodbye.' },
      ],
    },
    {
      id: 'luo-names',
      title: 'Common Names & Meanings',
      icon: 'users',
      description: 'Luo names and their significance',
      orderIndex: 2,
      items: [
        { id: 'n1', title: 'Omondi', description: 'Born in the morning', extra: 'One of the most common Luo male names' },
        { id: 'n2', title: 'Akinyi', description: 'Born in the early morning before dawn', extra: 'A common female name' },
        { id: 'n3', title: 'Ochieng', description: 'Born when the sun was shining brightly', extra: 'A name reflecting the time of birth' },
        { id: 'n4', title: 'Aoko', description: 'Born during the rainy season', extra: 'A female name connected to weather' },
        { id: 'n5', title: 'Otieno', description: 'Born at night', extra: 'One of the most recognized Luo names globally' },
        { id: 'n6', title: 'Anyango', description: 'Born at midday when the sun is high', extra: 'A widespread female name' },
      ],
    },
    {
      id: 'luo-foods',
      title: 'Traditional Foods',
      icon: 'utensils',
      description: 'Staples of the Luo diet',
      orderIndex: 3,
      items: [
        { id: 'f1', title: 'Fish (Rech)', description: 'The cornerstone of Luo cuisine. Tilapia (ngege) and Nile perch (mbuta) from Lake Victoria are grilled, stewed, or sun-dried.', nativeText: 'Rech', englishText: 'Fish' },
        { id: 'f2', title: 'Kuon', description: 'Ugali made from maize or cassava flour, the essential accompaniment to fish stews.', nativeText: 'Kuon', englishText: 'Ugali' },
        { id: 'f3', title: 'Aluru', description: 'Sun-dried fish, a preservation method that creates a distinct flavor, often fried with onions and tomatoes.', nativeText: 'Aluru', englishText: 'Sun-dried fish' },
        { id: 'f4', title: 'Nyoyo', description: 'A mix of boiled maize and beans, eaten as a filling everyday meal.', nativeText: 'Nyoyo', englishText: 'Maize and beans mix' },
      ],
    },
    {
      id: 'luo-practices',
      title: 'Cultural Practices',
      icon: 'globe',
      description: 'Traditions and customs of the Luo',
      orderIndex: 4,
      items: [
        { id: 'p1', title: 'Tero Buru', description: 'A funeral rite that is one of the most important Luo ceremonies. It involves elaborate rituals, music, and communal mourning that can last several days.' },
        { id: 'p2', title: 'Dowry (Ayie)', description: 'Marriage involves the ayie ceremony where the groom\'s family brings gifts — traditionally cattle and now often cash — to the bride\'s family.' },
        { id: 'p3', title: 'Fishing Heritage', description: 'Fishing on Lake Victoria is not just economic but cultural. Traditional methods include spear fishing, basket traps, and net fishing, passed from father to son.' },
        { id: 'p4', title: 'Tooth Extraction', description: 'A historical coming-of-age practice where the lower front teeth were removed as a mark of identity. This practice is now largely historical.' },
      ],
    },
    {
      id: 'luo-proverbs',
      title: 'Proverbs',
      icon: 'book',
      description: 'Wisdom passed through generations',
      orderIndex: 5,
      items: [
        { id: 'pr1', title: 'Proverb 1', description: 'A proverb about community', nativeText: 'Kisumo ok otelo malo.', englishText: 'A lake does not carry itself.' },
        { id: 'pr2', title: 'Proverb 2', description: 'A proverb about wisdom', nativeText: 'Ng\'ato ma opong\'e chunye osomo.', englishText: 'A wise person learns from others.' },
        { id: 'pr3', title: 'Proverb 3', description: 'A proverb about patience', nativeText: 'Puko pile nyaka oyiwe.', englishText: 'Even a rope that twists will eventually untangle.' },
      ],
    },
    {
      id: 'luo-songs',
      title: 'Songs & Music',
      icon: 'music',
      description: 'Traditional music and dance',
      orderIndex: 6,
      items: [
        { id: 's1', title: 'Ohangla', description: 'A vibrant traditional Luo music style featuring drums, the nyatiti (lyre), and call-and-response singing. It is central to celebrations and funerals alike.' },
        { id: 's2', title: 'Nyatiti', description: 'The eight-stringed lyre played by the Joka, oral historians and musicians who recount genealogies and stories through song.' },
        { id: 's3', title: 'Dudu', description: 'A praise song sung to honor individuals, especially at ceremonies and gatherings, celebrating their achievements and character.' },
      ],
    },
    {
      id: 'luo-region',
      title: 'County & Region Context',
      icon: 'map',
      description: 'Where the Luo people live',
      orderIndex: 7,
      items: [
        { id: 'r1', title: 'Kisumu County', description: 'The largest city in western Kenya and the cultural capital of the Luo, situated on the shores of Lake Victoria.' },
        { id: 'r2', title: 'Siaya County', description: 'The ancestral heartland of the Luo, with deep cultural roots and historical significance.' },
        { id: 'r3', title: 'Homa Bay County', description: 'A lakeside county known for fishing communities and traditional Luo cultural practices.' },
        { id: 'r4', title: 'Migori County', description: 'A border county where Luo culture meets Kuria and Suba communities, creating a rich cultural mosaic.' },
      ],
    },
  ],
};

const cultureByLanguage: Record<LanguageId, LanguageCulture> = {
  kalenjin: kalenjinCulture,
  kikuyu: kikuyuCulture,
  luo: luoCulture,
};

export function getCultureForLanguage(languageId: string): LanguageCulture | null {
  const lang = languageId as LanguageId;
  return cultureByLanguage[lang] || null;
}

export function getAllLanguageCultures(): LanguageCulture[] {
  return Object.values(cultureByLanguage);
}

export function getCultureCategories(languageId: string): CultureCategory[] {
  const lang = languageId as LanguageId;
  return (cultureByLanguage[lang]?.categories || []).sort(
    (a, b) => a.orderIndex - b.orderIndex
  );
}
