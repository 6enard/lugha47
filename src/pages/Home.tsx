import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  LogOut,
  ArrowRight,
  Sparkles,
  Globe,
  MessageCircle,
  Flame,
  Home as HomeIcon,
  ChevronLeft,
  ChevronRight,
  Zap,
  Trophy,
  Users,
  Star,
  Footprints,
  Sprout,
  Fish,
  Hammer,
  Beef,
  Gem,
  Compass,
  type LucideIcon,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getLanguages, saveUserLanguageSelection } from '../services/dataService';
import { LanguageSelector } from '../components/LanguageSelector';
import { LessonViewer } from '../components/LessonViewer';
import { ConversationPractice } from '../components/ConversationPractice';
import { CulturalLessons } from '../components/CulturalLessons';
import { getAccent } from '../data/languageAccents';

type HomeView = 'dashboard' | 'language-pick' | 'lessons' | 'conversations' | 'culture';
type Category = 'lessons' | 'conversations' | 'culture';

const CATEGORY_CONFIG: Record<Category, { title: string; subtitle: string }> = {
  lessons: {
    title: 'Learn a Language',
    subtitle: 'Pick a language to start interactive lessons with vocabulary cards, sentence building, and quizzes',
  },
  conversations: {
    title: 'Practice Real Conversations',
    subtitle: 'Choose a language to practice everyday conversations — at home, the market, the restaurant, and more',
  },
  culture: {
    title: 'Explore Culture',
    subtitle: 'Select a language to discover the traditions, proverbs, foods, names, and customs of each community',
  },
};

const LANGUAGES_LIST: { id: string; name: string; native: string; Icon: LucideIcon }[] = [
  { id: 'kalenjin', name: 'Kalenjin', native: 'Kalenjin', Icon: Footprints },
  { id: 'kikuyu', name: 'Kikuyu', native: 'Gĩkũyũ', Icon: Sprout },
  { id: 'luo', name: 'Luo', native: 'Dholuo', Icon: Fish },
  { id: 'kamba', name: 'Kamba', native: 'Kikamba', Icon: Hammer },
  { id: 'luhya', name: 'Luhya', native: 'Luluhya', Icon: Beef },
  { id: 'gusii', name: 'Gusii', native: 'Ekegusii', Icon: Gem },
  { id: 'somali', name: 'Somali', native: 'Soomaali', Icon: Compass },
];

const HERO_IMG = 'https://images.pexels.com/photos/4921096/pexels-photo-4921096.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const SECTION2_IMG = 'https://images.pexels.com/photos/8091179/pexels-photo-8091179.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const SECTION3_IMG = 'https://images.pexels.com/photos/7229097/pexels-photo-7229097.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const CULTURE_IMG = 'https://images.pexels.com/photos/35034039/pexels-photo-35034039.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export function Home() {
  const { user, logout, openAuthGate } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<HomeView>('dashboard');
  const [languages, setLanguages] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [pendingCategory, setPendingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const marqueeRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const loadData = async () => {
      try {
        const languagesData = await getLanguages();
        setLanguages(languagesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const requireAuth = (action: () => void) => {
    if (!user) {
      openAuthGate();
      return;
    }
    action();
  };

  const handleCategoryClick = (category: Category) => {
    requireAuth(() => {
      setPendingCategory(category);
      setView('language-pick');
    });
  };

  const handleSelectLanguage = async (languageId: string) => {
    setSelectedLanguage(languageId);
    if (pendingCategory) {
      setView(pendingCategory);
    } else {
      setView('lessons');
    }
    try {
      if (user) {
        await saveUserLanguageSelection(user.uid, languageId);
      }
    } catch (error) {
      console.error('Error saving language selection:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setView('dashboard');
      navigate('/');
    } catch (error) {
      console.error('Failed to log out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-forest-100 border-t-forest-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-ink-400 font-medium text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const languagePickConfig = pendingCategory ? CATEGORY_CONFIG[pendingCategory] : null;
  const showBottomBar = view === 'dashboard' || view === 'language-pick';

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* ── Nav Bar ── */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setView('dashboard')}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <img
                src="/lughalogo.png"
                alt="LUGHA47"
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-bold text-forest-700 font-heading tracking-tight">LUGHA47</span>
            </button>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-sun-50 border border-sun-200 rounded-full text-sm font-bold text-sun-700">
                    <Flame className="w-4 h-4" />
                    <span>0</span>
                  </div>
                  <span className="text-xs text-ink-400 font-medium hidden sm:block max-w-[160px] truncate">{user?.email}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-ink-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-sm font-bold text-ink-700 hover:text-forest-700 transition-colors px-3 py-1.5"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="btn btn-primary px-5 py-2 text-sm"
                  >
                    Sign Up Free
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4">
        {/* ═══════════════════════════════════════════════════
            DASHBOARD VIEW — Babbel-style public landing page
           ═══════════════════════════════════════════════════ */}
        {view === 'dashboard' && (
          <div>
            {/* ── HERO SECTION ── */}
            <section className="pt-12 md:pt-20 pb-16">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest-50 rounded-full mb-5 border border-forest-200">
                    <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                    <span className="text-xs font-semibold text-forest-700">Preserve Culture Through Language</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 leading-[1.1] mb-5 text-balance">
                    Which <span className="text-forest-600 italic">language</span> do you want to learn?
                  </h1>
                  <p className="text-lg text-ink-500 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                    Keep Kenya's indigenous languages alive. Learn Kalenjin, Kikuyu, Luo, and more through interactive lessons designed for real-life conversations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <button
                      onClick={() => handleCategoryClick('lessons')}
                      className="btn btn-primary px-8 py-4 text-lg flex items-center justify-center gap-2"
                    >
                      Start Learning <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleCategoryClick('culture')}
                      className="btn btn-secondary px-8 py-4 text-lg flex items-center justify-center gap-2"
                    >
                      Explore Culture <Globe className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -top-4 -right-4 w-64 h-64 bg-forest-100 rounded-full blur-3xl opacity-60"></div>
                  <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-sun-100 rounded-full blur-3xl opacity-50"></div>
                  <div className="relative rounded-3xl overflow-hidden shadow-xl">
                    <img
                      src={HERO_IMG}
                      alt="People having a conversation"
                      className="w-full h-[320px] md:h-[420px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ── LANGUAGE SCROLLER (infinite) ── */}
            <section className="pb-16 overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-ink-900">I want to learn</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (marqueeRef.current) {
                        marqueeRef.current.scrollBy({ left: -200, behavior: 'smooth' });
                      }
                    }}
                    className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-card flex items-center justify-center text-ink-600 hover:bg-gray-50 hover:border-forest-300 transition-all"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (marqueeRef.current) {
                        marqueeRef.current.scrollBy({ left: 200, behavior: 'smooth' });
                      }
                    }}
                    className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-card flex items-center justify-center text-ink-600 hover:bg-gray-50 hover:border-forest-300 transition-all"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="lang-marquee group" ref={marqueeRef}>
                <div className="lang-marquee-track">
                  {[...LANGUAGES_LIST, ...LANGUAGES_LIST, ...LANGUAGES_LIST].map((lang, idx) => {
                    const accent = getAccent(lang.id);
                    const Icon = lang.Icon;
                    return (
                      <button
                        key={`${lang.id}-${idx}`}
                        onClick={() => handleCategoryClick('lessons')}
                        className="flex-shrink-0 w-32 group/item text-left"
                      >
                        <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${accent.iconBg} flex items-center justify-center mb-3 shadow-card group-hover/item:shadow-card-hover group-hover/item:scale-[1.03] transition-all`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <p className="font-bold text-ink-900 text-sm">{lang.name}</p>
                        <p className={`text-xs font-bold ${accent.text}`}>{lang.native}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ── "THE EFFECTIVE WAY" — Alternating rows ── */}
            <section className="py-16 border-t border-gray-200/60">
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-ink-900 mb-3">
                  The effective way to learn a language online
                </h2>
                <p className="text-ink-500 max-w-2xl mx-auto">
                  LUGHA47 combines proven learning methods with cultural depth, so you can speak with confidence.
                </p>
              </div>

              <div className="space-y-16 md:space-y-24">
                {/* Row 1 — image left, text right */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="rounded-3xl overflow-hidden shadow-card order-1">
                    <img src={SECTION2_IMG} alt="Learn to speak with confidence" className="w-full h-64 md:h-80 object-cover" />
                  </div>
                  <div className="order-2">
                    <p className="text-xs font-bold text-forest-600 uppercase tracking-widest mb-3">Interactive Lessons</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-ink-900 mb-3">Learn to speak with confidence</h3>
                    <p className="text-ink-500 leading-relaxed mb-6">
                      You'll learn practical, useful skills you can apply right away — so you can reach your goal of having real-life conversations faster. Flashcards, sentence building, and quizzes reinforce every word.
                    </p>
                    <button
                      onClick={() => handleCategoryClick('lessons')}
                      className="btn btn-primary px-6 py-3 inline-flex items-center gap-2"
                    >
                      Start Learning <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Row 2 — image right, text left */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <p className="text-xs font-bold text-sun-600 uppercase tracking-widest mb-3">Flexible Progress</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-ink-900 mb-3">Learn at your own pace</h3>
                    <p className="text-ink-500 leading-relaxed mb-6">
                      Achieve your goals with lessons tailored to your level. Stay motivated with progress trackers, quiz scores, and visual feedback. It's like having a private tutor in your pocket.
                    </p>
                    <button
                      onClick={() => handleCategoryClick('lessons')}
                      className="btn btn-primary px-6 py-3 inline-flex items-center gap-2"
                    >
                      Track Your Progress <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="rounded-3xl overflow-hidden shadow-card order-1 md:order-2">
                    <img src={SECTION3_IMG} alt="Learn at your own pace" className="w-full h-64 md:h-80 object-cover" />
                  </div>
                </div>

                {/* Row 3 — image left, text right */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="rounded-3xl overflow-hidden shadow-card order-1">
                    <img src={CULTURE_IMG} alt="Connect with culture" className="w-full h-64 md:h-80 object-cover" />
                  </div>
                  <div className="order-2">
                    <p className="text-xs font-bold text-lake-600 uppercase tracking-widest mb-3">Cultural Immersion</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-ink-900 mb-3">Connect with culture</h3>
                    <p className="text-ink-500 leading-relaxed mb-6">
                      Go beyond vocabulary — explore traditions, proverbs, foods, and customs that give each language its soul. Learn the words and the world they come from.
                    </p>
                    <button
                      onClick={() => handleCategoryClick('culture')}
                      className="btn btn-primary px-6 py-3 inline-flex items-center gap-2"
                    >
                      Explore Culture <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* ── THE METHOD SECTION ── */}
            <section className="py-16 bg-forest-700 border-y border-forest-800 -mx-4 px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  The proven LUGHA47 method
                </h2>
                <p className="text-forest-100 max-w-2xl mx-auto">
                  Our approach blends interactive lessons, real-life conversations, and cultural immersion.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="bg-forest-600/40 backdrop-blur-sm rounded-2xl p-8 text-center border border-forest-500/30">
                  <div className="w-14 h-14 bg-forest-300/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-forest-300/30">
                    <Zap className="w-7 h-7 text-forest-100" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Learn Fast. Talk Sooner.</h3>
                  <p className="text-forest-100 text-sm leading-relaxed">
                    Quickly become conversation-ready with flashcards, sentence building, and quizzes designed for all learning styles.
                  </p>
                </div>

                <div className="bg-forest-600/40 backdrop-blur-sm rounded-2xl p-8 text-center border border-forest-500/30">
                  <div className="w-14 h-14 bg-sun-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-sun-400/30">
                    <Trophy className="w-7 h-7 text-sun-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Track Your Progress</h3>
                  <p className="text-forest-100 text-sm leading-relaxed">
                    Quiz scores, lesson completion markers, and best-score tracking keep you motivated and moving forward.
                  </p>
                </div>

                <div className="bg-forest-600/40 backdrop-blur-sm rounded-2xl p-8 text-center border border-forest-500/30">
                  <div className="w-14 h-14 bg-lake-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-lake-400/30">
                    <Users className="w-7 h-7 text-lake-200" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Built for Communities</h3>
                  <p className="text-forest-100 text-sm leading-relaxed">
                    Courses crafted to preserve the heritage of Kenya's communities — from greetings to proverbs to everyday conversations.
                  </p>
                </div>
              </div>
            </section>

            {/* ── WHAT WOULD YOU LIKE TO DO? ── */}
            <section className="py-16 border-t border-gray-200/60">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-ink-900 mb-3">What would you like to do?</h2>
                <p className="text-ink-500 max-w-2xl mx-auto">Choose how you want to start your journey.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <button
                  onClick={() => handleCategoryClick('lessons')}
                  className="card card-hover p-7 text-left group"
                >
                  <div className="w-14 h-14 bg-forest-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-ink-900 mb-2">Lessons</h3>
                  <p className="text-ink-500 text-sm leading-relaxed mb-4">
                    Interactive flashcards, sentence building exercises, and quizzes for all levels.
                  </p>
                  <div className="flex items-center gap-1.5 text-forest-700 font-bold text-sm">
                    Start Learning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button
                  onClick={() => handleCategoryClick('culture')}
                  className="card card-hover p-7 text-left group border-amber-200"
                >
                  <div className="w-14 h-14 bg-sun-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Globe className="w-7 h-7 text-ink-900" />
                  </div>
                  <h3 className="text-xl font-bold text-ink-900 mb-2">Culture</h3>
                  <p className="text-ink-500 text-sm leading-relaxed mb-4">
                    Traditions, proverbs, foods, names, and customs of each community.
                  </p>
                  <div className="flex items-center gap-1.5 text-sun-700 font-bold text-sm">
                    Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button
                  onClick={() => handleCategoryClick('conversations')}
                  className="card card-hover p-7 text-left group border-lake-200"
                >
                  <div className="w-14 h-14 bg-lake-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-ink-900 mb-2">Conversations</h3>
                  <p className="text-ink-500 text-sm leading-relaxed mb-4">
                    Practice real-life situations — at home, the market, school, and more.
                  </p>
                  <div className="flex items-center gap-1.5 text-lake-700 font-bold text-sm">
                    Practice <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </section>

            {/* ── TESTIMONIAL / SOCIAL PROOF ── */}
            <section className="py-16 bg-forest-700 border-y border-forest-800 -mx-4 px-4">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Learners love LUGHA47</h2>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-sun-400 text-sun-400" />
                  ))}
                </div>
                <p className="text-forest-100 text-sm">Join thousands of Kenyans reconnecting with their roots</p>
              </div>

              <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {[
                  { quote: "I finally learned to greet my grandmother in Kalenjin. She was so proud!", name: "Chebet K.", lang: "Learning Kalenjin" },
                  { quote: "The conversation practice feels so real. I can bargain at the market in Kikuyu now!", name: "Kamau N.", lang: "Learning Kikuyu" },
                  { quote: "The cultural lessons are a treasure. My kids are learning our language and our stories.", name: "Omondi A.", lang: "Learning Luo" },
                ].map((t, i) => (
                  <div key={i} className="bg-forest-600/40 backdrop-blur-sm rounded-2xl p-7 border border-forest-500/30">
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-sun-400 text-sun-400" />
                      ))}
                    </div>
                    <p className="text-forest-50 leading-relaxed mb-4 italic">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-forest-300/20 rounded-full flex items-center justify-center flex-shrink-0 border border-forest-300/30">
                        <span className="font-bold text-forest-100 text-sm">{t.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{t.name}</p>
                        <p className="text-forest-200 text-xs">{t.lang}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── FAQ SECTION ── */}
            <section className="py-16 border-t border-gray-200/60">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-ink-900 mb-8 text-center">
                  Frequently asked questions
                </h2>
                <div className="space-y-3">
                  {[
                    { q: "What is LUGHA47, and how does it work?", a: "LUGHA47 is a free language learning platform designed to preserve Kenya's indigenous languages. You learn through interactive flashcards, sentence building exercises, quizzes, conversation practice, and cultural lessons." },
                    { q: "What languages can I learn?", a: "Currently we offer seven languages: Kalenjin, Kikuyu, Luo, Kamba, Luhya, Gusii, and Somali — each with vocabulary lessons, conversation scenarios, and deep cultural content." },
                    { q: "Can I try LUGHA47 for free?", a: "Absolutely! Signing up is completely free, and you get access to all lessons, quizzes, conversation practice, and cultural content at no cost." },
                    { q: "Do I need any prior knowledge?", a: "No! Our lessons start from the very basics — greetings, numbers, family words — and build up to sentence construction and real conversations. All levels are welcome." },
                    { q: "How does progress tracking work?", a: "Every quiz you complete saves your score. You can see your best score per lesson, track which lessons you've completed, and follow your improvement over time." },
                  ].map((faq, i) => (
                    <details key={i} className="card p-0 group">
                      <summary className="cursor-pointer p-5 font-bold text-ink-900 text-base flex items-center justify-between list-none">
                        {faq.q}
                        <span className="text-forest-600 text-xl transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <div className="px-5 pb-5 text-ink-500 text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* ── FREE TRIAL / SIGN UP CTA ── */}
            <section className="py-16 border-t border-gray-200/60">
              <div className="bg-gradient-to-br from-forest-700 to-forest-800 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-forest-600/40 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-sun-400/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {user ? "Continue your journey" : "Begin your journey today — it's free"}
                  </h2>
                  <p className="text-forest-100 mb-8 max-w-lg mx-auto leading-relaxed">
                    {user
                      ? "Pick up where you left off and keep your language alive."
                      : "Join thousands of Kenyans reconnecting with their linguistic roots. Sign up free and try your first lesson today."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {user ? (
                      <button
                        onClick={() => handleCategoryClick('lessons')}
                        className="btn btn-sun px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
                      >
                        Continue Learning <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate('/signup')}
                          className="btn btn-sun px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
                        >
                          Sign Up Free <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => navigate('/login')}
                          className="px-8 py-4 text-lg font-bold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 transition-all"
                        >
                          I already have an account
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="py-12 border-t border-gray-200/60">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <img src="/lughalogo.png" alt="LUGHA47" className="w-7 h-7 object-contain" />
                  <span className="text-base font-bold text-forest-700 font-heading">LUGHA47</span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm text-ink-400 font-medium">
                  <button onClick={() => handleCategoryClick('lessons')} className="hover:text-forest-700 transition-colors">Lessons</button>
                  <button onClick={() => handleCategoryClick('conversations')} className="hover:text-forest-700 transition-colors">Conversations</button>
                  <button onClick={() => handleCategoryClick('culture')} className="hover:text-forest-700 transition-colors">Culture</button>
                  {!user && <button onClick={() => navigate('/signup')} className="hover:text-forest-700 transition-colors">Sign Up</button>}
                  {!user && <button onClick={() => navigate('/login')} className="hover:text-forest-700 transition-colors">Log In</button>}
                </div>
                <p className="text-xs text-ink-300">Preserving Kenya's linguistic heritage</p>
              </div>
            </footer>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            CONTENT VIEWS (auth-gated)
           ═══════════════════════════════════════════════════ */}
        {view === 'language-pick' && (
          <div className="py-8">
            <LanguageSelector
              languages={languages}
              onSelectLanguage={handleSelectLanguage}
              onBack={() => setView('dashboard')}
              title={languagePickConfig?.title}
              subtitle={languagePickConfig?.subtitle}
            />
          </div>
        )}

        {view === 'lessons' && selectedLanguage && (
          <div className="py-8">
            <LessonViewer
              languageId={selectedLanguage}
              onBack={() => setView('language-pick')}
            />
          </div>
        )}

        {view === 'conversations' && selectedLanguage && (
          <div className="py-8">
            <ConversationPractice
              languageId={selectedLanguage}
              onBack={() => setView('language-pick')}
            />
          </div>
        )}

        {view === 'culture' && selectedLanguage && (
          <div className="py-8">
            <CulturalLessons
              languageId={selectedLanguage}
              onBack={() => setView('language-pick')}
            />
          </div>
        )}
      </main>

      {/* Bottom tab bar (mobile only) */}
      {showBottomBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 md:hidden">
          <div className="flex justify-around items-center h-16">
            <button
              onClick={() => setView('dashboard')}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-colors ${
                view === 'dashboard' ? 'text-forest-700' : 'text-ink-300'
              }`}
            >
              <HomeIcon className="w-5 h-5" />
              <span className="text-xs font-semibold">Home</span>
            </button>
            <button
              onClick={() => handleCategoryClick('lessons')}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-ink-300"
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs font-semibold">Learn</span>
            </button>
            <button
              onClick={() => handleCategoryClick('conversations')}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-ink-300"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs font-semibold">Practice</span>
            </button>
            <button
              onClick={() => handleCategoryClick('culture')}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-ink-300"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-semibold">Culture</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
