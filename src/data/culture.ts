export type LanguageId = 'kalenjin' | 'kikuyu' | 'luo' | 'kamba' | 'luhya' | 'gusii' | 'somali';

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

/* ─────────────────────────────────────
   KAMBA
───────────────────────────────────── */
const kambaCulture: LanguageCulture = {
  languageId: 'kamba',
  languageName: 'Kamba',
  nativeName: 'Kikamba',
  region: 'Eastern Kenya — Machakos, Makueni, Kitui, parts of Makueni and Kajiado',
  overview: 'The Kamba (Akamba) are a Bantu people of eastern Kenya, historically known as long-distance traders who carried goods between the coast and the interior. They are skilled artisans, especially in woodcarving, and have a rich oral tradition of storytelling, proverbs, and music.',
  categories: [
    {
      id: 'kamba-greetings',
      title: 'Traditional Greetings',
      icon: 'message',
      description: 'How the Kamba greet each other',
      orderIndex: 1,
      items: [
        { id: 'g1', title: 'Ũ mwega', description: 'A general greeting', nativeText: 'Ũ mwega!', englishText: 'Hello / You are well!' },
        { id: 'g2', title: 'Ũlaũ', description: 'Asking about well-being', nativeText: 'Ũlaũ?', englishText: 'How are you?' },
        { id: 'g3', title: 'Nĩ mwega', description: 'The standard positive response', nativeText: 'Nĩ mwega.', englishText: 'I am fine.' },
        { id: 'g4', title: 'Tata', description: 'A farewell greeting', nativeText: 'Tata.', englishText: 'Goodbye.' },
      ],
    },
    {
      id: 'kamba-names',
      title: 'Common Names & Meanings',
      icon: 'users',
      description: 'Kamba names and their significance',
      orderIndex: 2,
      items: [
        { id: 'n1', title: 'Mutua', description: 'One who is left behind or remains', extra: 'A common Kamba male name' },
        { id: 'n2', title: 'Syombua', description: 'A female name associated with beauty', extra: 'A popular Kamba female name' },
        { id: 'n3', title: 'Kilonzi', description: 'Born during a time of drought', extra: 'Reflects environmental conditions at birth' },
        { id: 'n4', title: 'Mwende', description: 'One who is loved', extra: 'A beloved female name' },
        { id: 'n5', title: 'Mbaluka', description: 'Born during a time of famine', extra: 'A name reflecting hardship at birth' },
        { id: 'n6', title: 'Ndinda', description: 'A female name given to a child born after twins', extra: 'A name with special birth-order significance' },
      ],
    },
    {
      id: 'kamba-foods',
      title: 'Traditional Foods',
      icon: 'utensils',
      description: 'Staples of the Kamba diet',
      orderIndex: 3,
      items: [
        { id: 'f1', title: 'Ugali', description: 'Maize meal, the staple carbohydrate eaten with vegetables, beans, or meat.', nativeText: 'Ĩthaa', englishText: 'Ugali' },
        { id: 'f2', title: 'Muthokoi', description: 'Maize cooked with beans, a signature Kamba dish especially popular in Kitui and Machakos.', nativeText: 'Muthokoi', englishText: 'Maize and beans dish' },
        { id: 'f3', title: 'Kikamba Porridge', description: 'Fermented porridge made from millet or sorghum, served at ceremonies.', nativeText: 'Ũcũrũ', englishText: 'Fermented porridge' },
        { id: 'f4', title: 'Nzũ', description: 'Roasted or boiled pigeon peas, a drought-resistant crop central to Kamba agriculture.', nativeText: 'Nzũ', englishText: 'Pigeon peas' },
      ],
    },
    {
      id: 'kamba-practices',
      title: 'Cultural Practices',
      icon: 'globe',
      description: 'Traditions and customs of the Kamba',
      orderIndex: 4,
      items: [
        { id: 'p1', title: 'Initiation (Mwali)', description: 'A rite of passage for young Kamba boys and girls, involving seclusion, teachings, and ceremonies marking the transition to adulthood.' },
        { id: 'p2', title: 'Dowry (Ntheo)', description: 'The bride-price ceremony where the groom\'s family presents goats and other gifts to the bride\'s family to formalize the marriage.' },
        { id: 'p3', title: 'Woodcarving Tradition', description: 'The Kamba are famous for their woodcarving skills, creating sculptures, utensils, and decorative items that are sold across Kenya and internationally.' },
        { id: 'p4', title: 'Trading Heritage', description: 'Historically, the Kamba were long-distance traders who carried ivory, salt, and beads between the coast and the interior, establishing trade routes through eastern Kenya.' },
      ],
    },
    {
      id: 'kamba-proverbs',
      title: 'Proverbs',
      icon: 'book',
      description: 'Wisdom passed through generations',
      orderIndex: 5,
      items: [
        { id: 'pr1', title: 'Proverb 1', description: 'A proverb about unity', nativeText: 'Mbee ya kĩnthũ nĩ ĩmwe.', englishText: 'The footprints of one person are the same.' },
        { id: 'pr2', title: 'Proverb 2', description: 'A proverb about patience', nativeText: 'Mūndū ũndũence wa mbũa nĩ wĩ kĩndũ.', englishText: 'A person who waits for rain has something.' },
        { id: 'pr3', title: 'Proverb 3', description: 'A proverb about wisdom', nativeText: 'Kĩlumi kya ũndũ ndĩkethĩwa.', englishText: 'The teeth of a wise person do not bite in vain.' },
      ],
    },
    {
      id: 'kamba-songs',
      title: 'Songs & Music',
      icon: 'music',
      description: 'Traditional music and dance',
      orderIndex: 6,
      items: [
        { id: 's1', title: 'Kilumi', description: 'A traditional Kamba dance performed at ceremonies, featuring rhythmic drumming, singing, and energetic movements.' },
        { id: 's2', title: 'Wathi', description: 'A communal singing and dancing event where the community gathers to celebrate weddings, harvests, or initiations.' },
        { id: 's3', title: 'Mbeni', description: 'A playful song-and-dance performed by young people, often involving teasing and courtship themes.' },
      ],
    },
    {
      id: 'kamba-region',
      title: 'County & Region Context',
      icon: 'map',
      description: 'Where the Kamba people live',
      orderIndex: 7,
      items: [
        { id: 'r1', title: 'Machakos County', description: 'The heartland of the Kamba people, known for its hills and the historic Machakos town, one of Kenya\'s oldest colonial settlements.' },
        { id: 'r2', title: 'Kitui County', description: 'A vast semi-arid region where the Kamba practice drought-resistant farming, including pigeon peas and sorghum.' },
        { id: 'r3', title: 'Makueni County', description: 'An agricultural region with a growing focus on mango farming and water conservation projects.' },
        { id: 'r4', title: 'Kajiado County (parts)', description: 'Some Kamba communities live alongside the Maasai in this border region, creating a rich cultural interchange.' },
      ],
    },
  ],
};

/* ─────────────────────────────────────
   LUHYA
───────────────────────────────────── */
const luhyaCulture: LanguageCulture = {
  languageId: 'luhya',
  languageName: 'Luhya',
  nativeName: 'Luluhya',
  region: 'Western Kenya — Kakamega, Bungoma, Vihiga, Busia, Butere, Mumias, Trans Nzoia',
  overview: 'The Luhya (Abaluhya) are Kenya\'s second-largest ethnic group, a Bantu people of western Kenya. They are a cluster of 18 sub-groups including the Bukusu, Maragoli, Wanga, Nyore, and Tiriki, each with distinct dialects but shared cultural traditions. The Luhya are known for their agricultural heritage, bullfighting tradition, and vibrant initiation ceremonies.',
  categories: [
    {
      id: 'luhya-greetings',
      title: 'Traditional Greetings',
      icon: 'message',
      description: 'How the Luhya greet each other',
      orderIndex: 1,
      items: [
        { id: 'g1', title: 'Mulembe', description: 'A universal Luhya greeting meaning peace', nativeText: 'Mulembe!', englishText: 'Peace / Hello!' },
        { id: 'g2', title: 'Oliwila', description: 'Asking about well-being', nativeText: 'Oliwila?', englishText: 'How are you?' },
        { id: 'g3', title: 'Ndi mwega', description: 'The standard positive response', nativeText: 'Ndi mwega.', englishText: 'I am fine.' },
        { id: 'g4', title: 'Nisikhe', description: 'A farewell greeting', nativeText: 'Nisikhe.', englishText: 'Goodbye / Stay well.' },
      ],
    },
    {
      id: 'luhya-names',
      title: 'Common Names & Meanings',
      icon: 'users',
      description: 'Luhya names and their significance',
      orderIndex: 2,
      items: [
        { id: 'n1', title: 'Wanjala', description: 'Born during a time of famine', extra: 'A common male name reflecting hardship at birth' },
        { id: 'n2', title: 'Namusonge', description: 'A female name given to one born during circumcision season', extra: 'Connected to the Luhya initiation tradition' },
        { id: 'n3', title: 'Wamalwa', description: 'Born during beer-making season', extra: 'Reflects the agricultural calendar' },
        { id: 'n4', title: 'Shiroya', description: 'A female name associated with beauty', extra: 'A popular name among the Maragoli' },
        { id: 'n5', title: 'Wafula', description: 'Born during the rainy season', extra: 'One of the most common Bukusu names' },
        { id: 'n6', title: 'Nafula', description: 'Female counterpart, born during rains', extra: 'A widespread female name among the Bukusu' },
      ],
    },
    {
      id: 'luhya-foods',
      title: 'Traditional Foods',
      icon: 'utensils',
      description: 'Staples of the Luhya diet',
      orderIndex: 3,
      items: [
        { id: 'f1', title: 'Obusuma', description: 'Ugali made from millet or maize flour, the cornerstone of Luhya meals.', nativeText: 'Obusuma', englishText: 'Ugali' },
        { id: 'f2', title: 'Ingokho', description: 'Chicken stew, a prized dish in Luhya culture, often served to honored guests.', nativeText: 'Ingokho', englishText: 'Chicken' },
        { id: 'f3', title: 'Tsimba', description: 'A dish of groundnuts (peanuts) cooked with vegetables, rich and nutritious.', nativeText: 'Tsimba', englishText: 'Groundnut sauce' },
        { id: 'f4', title: 'Obutunga', description: 'Traditional vegetables including spider plant, amaranth, and cowpea leaves, often cooked with cream.', nativeText: 'Obutunga', englishText: 'Traditional vegetables' },
      ],
    },
    {
      id: 'luhya-practices',
      title: 'Cultural Practices',
      icon: 'globe',
      description: 'Traditions and customs of the Luhya',
      orderIndex: 4,
      items: [
        { id: 'p1', title: 'Bukusu Circumcision (Sikhe)', description: 'The Bukusu sub-group practices circumcision as a rite of passage, performed every two years. It is a public ceremony symbolizing bravery and the transition to manhood.' },
        { id: 'p2', title: 'Bullfighting', description: 'A traditional Luhya sport, especially among the Idakho and Isukha sub-groups, where bulls are raised and trained to fight in public events that draw large crowds.' },
        { id: 'p3', title: 'Dowry (Owenje)', description: 'Marriage negotiations involve the groom\'s family presenting cattle and other gifts to the bride\'s family, with extensive negotiation and celebration.' },
        { id: 'p4', title: 'Sengwer Dance', description: 'A traditional dance performed at funerals and celebrations, featuring rhythmic movements and communal singing that binds the community together.' },
      ],
    },
    {
      id: 'luhya-proverbs',
      title: 'Proverbs',
      icon: 'book',
      description: 'Wisdom passed through generations',
      orderIndex: 5,
      items: [
        { id: 'pr1', title: 'Proverb 1', description: 'A proverb about unity', nativeText: 'Omundu nomundu shingokhola.', englishText: 'A person is a person through others.' },
        { id: 'pr2', title: 'Proverb 2', description: 'A proverb about patience', nativeText: 'Esinzila tsiolukhwa.', englishText: 'A path is followed step by step.' },
        { id: 'pr3', title: 'Proverb 3', description: 'A proverb about wisdom', nativeText: 'Omwoyo omulayi nikhumanyi.', englishText: 'A good heart is wisdom.' },
      ],
    },
    {
      id: 'luhya-songs',
      title: 'Songs & Music',
      icon: 'music',
      description: 'Traditional music and dance',
      orderIndex: 6,
      items: [
        { id: 's1', title: 'Lipala', description: 'A popular Luhya dance style featuring drums, singing, and call-and-response, often performed at celebrations and political rallies.' },
        { id: 's2', title: 'Isukuti', description: 'A drum-based music and dance tradition of the Isukha and Idakho sub-groups, recognized by UNESCO as intangible cultural heritage.' },
        { id: 's3', title: 'Sinfwa', description: 'Funeral songs sung to honor the dead, recounting their life and deeds, accompanied by slow rhythmic drumming.' },
      ],
    },
    {
      id: 'luhya-region',
      title: 'County & Region Context',
      icon: 'map',
      description: 'Where the Luhya people live',
      orderIndex: 7,
      items: [
        { id: 'r1', title: 'Kakamega County', description: 'The most populous Luhya county, home to the Maragoli and Idakho sub-groups, and famous for Kakamega Forest, Kenya\'s last tropical rainforest.' },
        { id: 'r2', title: 'Bungoma County', description: 'The heartland of the Bukusu sub-group, known for the circumcision tradition and Mount Elgon on the border.' },
        { id: 'r3', title: 'Vihiga County', description: 'Home to the Maragoli and Tiriki sub-groups, a densely populated agricultural region.' },
        { id: 'r4', title: 'Busia County', description: 'A border county where the Luhya meet the Luo and communities across the Uganda border, creating a diverse cultural landscape.' },
      ],
    },
  ],
};

/* ─────────────────────────────────────
   GUSII
───────────────────────────────────── */
const gusiiCulture: LanguageCulture = {
  languageId: 'gusii',
  languageName: 'Gusii',
  nativeName: 'Ekegusii',
  region: 'Western Kenya — Kisii, Nyamira, parts of Homabay and Kericho',
  overview: 'The Gusii (Abagusii) are a Bantu people of the Gusii highlands in western Kenya. They are known for their intensive agriculture, particularly banana and tea farming, as well as their soapstone carving tradition. The Gusii have a strong cultural identity centered around clan relationships and age-set systems.',
  categories: [
    {
      id: 'gusii-greetings',
      title: 'Traditional Greetings',
      icon: 'message',
      description: 'How the Gusii greet each other',
      orderIndex: 1,
      items: [
        { id: 'g1', title: 'Oigose', description: 'A general greeting', nativeText: 'Oigose!', englishText: 'Hello / Greetings!' },
        { id: 'g2', title: 'Nigwe', description: 'Asking about well-being', nativeText: 'Nigwe?', englishText: 'How are you?' },
        { id: 'g3', title: 'Ndega', description: 'The standard positive response', nativeText: 'Ndega, eraki.', englishText: 'I am fine, thank you.' },
        { id: 'g4', title: 'Sala ogenda', description: 'A farewell greeting', nativeText: 'Sala ogenda.', englishText: 'Goodbye / Stay well.' },
      ],
    },
    {
      id: 'gusii-names',
      title: 'Common Names & Meanings',
      icon: 'users',
      description: 'Gusii names and their significance',
      orderIndex: 2,
      items: [
        { id: 'n1', title: 'Ondieki', description: 'Born in the morning', extra: 'A common Gusii male name' },
        { id: 'n2', title: 'Kemunto', description: 'A female name given to a child born after a short labor', extra: 'A popular female name among the Gusii' },
        { id: 'n3', title: 'Oigo', description: 'Born during a time of plenty', extra: 'A name reflecting abundance at birth' },
        { id: 'n4', title: 'Bochaberi', description: 'Born when visitors arrived', extra: 'A name associated with hospitality' },
        { id: 'n5', title: 'Nyaberi', description: 'Born during the harvest season', extra: 'Connected to the agricultural calendar' },
        { id: 'n6', title: 'Moraa', description: 'A female name meaning beautiful', extra: 'A widely used female name among the Gusii' },
      ],
    },
    {
      id: 'gusii-foods',
      title: 'Traditional Foods',
      icon: 'utensils',
      description: 'Staples of the Gusii diet',
      orderIndex: 3,
      items: [
        { id: 'f1', title: 'Obokima', description: 'Ugali made from millet or maize flour, eaten with vegetables, meat, or fish.', nativeText: 'Obokima', englishText: 'Ugali' },
        { id: 'f2', title: 'Rinjore', description: 'Traditional fermented milk, similar to mursik, stored in calabashes and valued for its probiotic qualities.', nativeText: 'Rinjore', englishText: 'Fermented milk' },
        { id: 'f3', title: 'Ebitore', description: 'A dish of boiled bananas mixed with beans or vegetables, a staple in the Gusii highlands.', nativeText: 'Ebitore', englishText: 'Banana and beans dish' },
        { id: 'f4', title: 'Obosoro', description: 'Traditional leafy greens including amaranth and cowpea leaves, cooked with cream or groundnut paste.', nativeText: 'Obosoro', englishText: 'Traditional vegetables' },
      ],
    },
    {
      id: 'gusii-practices',
      title: 'Cultural Practices',
      icon: 'globe',
      description: 'Traditions and customs of the Gusii',
      orderIndex: 4,
      items: [
        { id: 'p1', title: 'Circumcision (Morangi)', description: 'A rite of passage for young men, performed every few years. It is accompanied by seclusion, teachings, and community celebration.' },
        { id: 'p2', title: 'Dowry (Echika)', description: 'Marriage involves negotiation between families, with the groom presenting cattle, goats, and cash to the bride\'s family over multiple visits.' },
        { id: 'p3', title: 'Soapstone Carving', description: 'The Gusii, particularly in Tabaka, are famous for soapstone carving, producing sculptures and decorative items sold worldwide. This craft is a major economic and cultural activity.' },
        { id: 'p4', title: 'Banana Farming', description: 'The Gusii highlands are ideal for banana cultivation, and bananas are central to both the diet and the economy, with varieties used for cooking, brewing, and snacks.' },
      ],
    },
    {
      id: 'gusii-proverbs',
      title: 'Proverbs',
      icon: 'book',
      description: 'Wisdom passed through generations',
      orderIndex: 5,
      items: [
        { id: 'pr1', title: 'Proverb 1', description: 'A proverb about community', nativeText: 'Omosacha ta momura.', englishText: 'A person is not an island.' },
        { id: 'pr2', title: 'Proverb 2', description: 'A proverb about wisdom', nativeText: 'Egetega kigeretwe nkegogoro.', englishText: 'A trap is set by the wise.' },
        { id: 'pr3', title: 'Proverb 3', description: 'A proverb about patience', nativeText: 'Ekegwechi kigenda kiongo.', englishText: 'The millipede walks slowly but arrives.' },
      ],
    },
    {
      id: 'gusii-songs',
      title: 'Songs & Music',
      icon: 'music',
      description: 'Traditional music and dance',
      orderIndex: 6,
      items: [
        { id: 's1', title: 'Ekegogo', description: 'A traditional Gusii dance performed at celebrations, featuring drums, singing, and rhythmic movements by both men and women.' },
        { id: 's2', title: 'Obokano', description: 'The eight-stringed lyre played by Gusii musicians, similar to the Luo nyatiti, used to accompany storytelling and praise songs.' },
        { id: 's3', title: 'Eritongori', description: 'A praise song sung to honor heroes and accomplished members of the community, especially at gatherings and ceremonies.' },
      ],
    },
    {
      id: 'gusii-region',
      title: 'County & Region Context',
      icon: 'map',
      description: 'Where the Gusii people live',
      orderIndex: 7,
      items: [
        { id: 'r1', title: 'Kisii County', description: 'The heartland of the Gusii people, known for its high population density, fertile highlands, and soapstone quarries in Tabaka.' },
        { id: 'r2', title: 'Nyamira County', description: 'A primarily Gusii county known for tea farming and banana cultivation, with a strong cultural identity.' },
        { id: 'r3', title: 'Bomet County (parts)', description: 'Some Gusii communities live alongside the Kipsigis in this border county, creating cultural exchange.' },
        { id: 'r4', title: 'Homabay County (parts)', description: 'Gusii communities in the northern parts of Homabay interact with the Luo, creating a rich border culture.' },
      ],
    },
  ],
};

/* ─────────────────────────────────────
   SOMALI
───────────────────────────────────── */
const somaliCulture: LanguageCulture = {
  languageId: 'somali',
  languageName: 'Somali',
  nativeName: 'Soomaali',
  region: 'Northeastern Kenya — Wajir, Garissa, Mandera, and parts of Isiolo and Marsabit',
  overview: 'The Somali of Kenya are a Cushitic people inhabiting the northeast, sharing language and culture with Somalis across the Horn of Africa. They are predominantly pastoralist, with camel and goat herding central to their way of life. Somali culture places strong emphasis on poetry, clan identity, hospitality, and Islamic traditions.',
  categories: [
    {
      id: 'somali-greetings',
      title: 'Traditional Greetings',
      icon: 'message',
      description: 'How the Somali greet each other',
      orderIndex: 1,
      items: [
        { id: 'g1', title: 'Subax wanaagsan', description: 'A morning greeting', nativeText: 'Subax wanaagsan!', englishText: 'Good morning!' },
        { id: 'g2', title: 'Sidee tahay', description: 'Asking about well-being', nativeText: 'Sidee tahay?', englishText: 'How are you?' },
        { id: 'g3', title: 'Waan fiicanahay', description: 'The standard positive response', nativeText: 'Waan fiicanahay, mahadsanid.', englishText: 'I am fine, thank you.' },
        { id: 'g4', title: 'Nabad gelyo', description: 'A farewell greeting', nativeText: 'Nabad gelyo.', englishText: 'Goodbye / Peace be with you.' },
      ],
    },
    {
      id: 'somali-names',
      title: 'Common Names & Meanings',
      icon: 'users',
      description: 'Somali names and their significance',
      orderIndex: 2,
      items: [
        { id: 'n1', title: 'Abdi', description: 'A name meaning servant (of God), common in Islamic naming', extra: 'One of the most common Somali male names' },
        { id: 'n2', title: 'Amina', description: 'A female name meaning trustworthy or honest', extra: 'A widely used Somali female name' },
        { id: 'n3', title: 'Hassan', description: 'A name of Arabic origin meaning handsome or good', extra: 'A common name across the Somali community' },
        { id: 'n4', title: 'Fadumo', description: 'The Somali form of Fatima, honoring the Prophet\'s daughter', extra: 'One of the most common female names' },
        { id: 'n5', title: 'Mahad', description: 'A name meaning one who is praised', extra: 'A respected male name in Somali culture' },
        { id: 'n6', title: 'Halima', description: 'A female name meaning gentle and patient', extra: 'A traditional name with deep cultural roots' },
      ],
    },
    {
      id: 'somali-foods',
      title: 'Traditional Foods',
      icon: 'utensils',
      description: 'Staples of the Somali diet',
      orderIndex: 3,
      items: [
        { id: 'f1', title: 'Canjeero', description: 'A thin, spongy flatbread similar to injera, eaten with soups, stews, or tea. It is the staple of Somali breakfast.', nativeText: 'Canjeero', englishText: 'Somali flatbread' },
        { id: 'f2', title: 'Cambuulo', description: 'A dish of adzuki beans cooked with butter and sugar, often served for dinner with bread.', nativeText: 'Cambuulo', englishText: 'Beans and butter dish' },
        { id: 'f3', title: 'Suqaar', description: 'A meat stew made with goat or camel meat, spiced with cumin, coriander, and cardamom, served with rice or flatbread.', nativeText: 'Suqaar', englishText: 'Spiced meat stew' },
        { id: 'f4', title: 'Camel Milk', description: 'Fresh camel milk, a nutritional staple in Somali pastoralist life, drunk plain or used in tea.', nativeText: 'Caano geel', englishText: 'Camel milk' },
      ],
    },
    {
      id: 'somali-practices',
      title: 'Cultural Practices',
      icon: 'globe',
      description: 'Traditions and customs of the Somali',
      orderIndex: 4,
      items: [
        { id: 'p1', title: 'Camel Herding', description: 'Camels are central to Somali life — they provide milk, transport, and wealth. A man\'s social status is often measured by the size of his camel herd.' },
        { id: 'p2', title: 'Xeer (Customary Law)', description: 'A traditional Somali legal system based on customary law, used to resolve disputes over grazing rights, marriage, and compensation, guided by elders.' },
        { id: 'p3', title: 'Poetry Tradition', description: 'Somalia is known as the "Nation of Poets." Poetry is used to record history, settle disputes, express love, and praise heroes, with oral poetry passed through generations.' },
        { id: 'p4', title: 'Hospitality (Dhiirrigel)', description: 'Somali culture places extreme importance on hospitality. A guest is always welcomed with tea, food, and shelter, and turning away a visitor is considered deeply shameful.' },
      ],
    },
    {
      id: 'somali-proverbs',
      title: 'Proverbs',
      icon: 'book',
      description: 'Wisdom passed through generations',
      orderIndex: 5,
      items: [
        { id: 'pr1', title: 'Proverb 1', description: 'A proverb about unity', nativeText: 'Mid mid keli, mid wada labaad.', englishText: 'One by one is one, together is two.' },
        { id: 'pr2', title: 'Proverb 2', description: 'A proverb about patience', nativeText: 'Geel jabisa waa la qoriyaa.', englishText: 'A camel is loaded little by little.' },
        { id: 'pr3', title: 'Proverb 3', description: 'A proverb about wisdom', nativeText: 'Aqoon la\'aani waa iftiin la\'aan.', englishText: 'Lack of knowledge is lack of light.' },
      ],
    },
    {
      id: 'somali-songs',
      title: 'Songs & Music',
      icon: 'music',
      description: 'Traditional music and dance',
      orderIndex: 6,
      items: [
        { id: 's1', title: 'Dhaanto', description: 'A traditional Somali dance and song style featuring rhythmic clapping, drums, and call-and-response singing, performed at weddings and celebrations.' },
        { id: 's2', title: 'Buraanbur', description: 'A traditional women\'s dance performed at weddings and ceremonies, featuring rhythmic movements, ululation, and poetry recitation.' },
        { id: 's3', title: 'Hees', description: 'Work songs sung during herding, water collection, or building, reflecting the rhythm of daily pastoralist life and keeping morale high.' },
      ],
    },
    {
      id: 'somali-region',
      title: 'County & Region Context',
      icon: 'map',
      description: 'Where the Somali people live in Kenya',
      orderIndex: 7,
      items: [
        { id: 'r1', title: 'Wajir County', description: 'A predominantly Somali county in northeastern Kenya, known for pastoralism and the Wajir International Airport, a historic stopover.' },
        { id: 'r2', title: 'Garissa County', description: 'Home to a large Somali population, situated along the Tana River, with Garissa town as a commercial hub for the northeast.' },
        { id: 'r3', title: 'Mandera County', description: 'A border county touching Somalia and Ethiopia, with a predominantly Somali population and strong cross-border cultural ties.' },
        { id: 'r4', title: 'Isiolo County (parts)', description: 'A county where Somali, Borana, and Samburu communities coexist, creating a rich cultural mosaic at the edge of the north.' },
      ],
    },
  ],
};

const cultureByLanguage: Record<LanguageId, LanguageCulture> = {
  kalenjin: kalenjinCulture,
  kikuyu: kikuyuCulture,
  luo: luoCulture,
  kamba: kambaCulture,
  luhya: luhyaCulture,
  gusii: gusiiCulture,
  somali: somaliCulture,
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
