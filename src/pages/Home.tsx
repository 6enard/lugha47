import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, ArrowRight, Sparkles, Globe, MessageCircle, Flame, Home as HomeIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getLanguages, saveUserLanguageSelection } from '../services/dataService';
import { LanguageSelector } from '../components/LanguageSelector';
import { LessonViewer } from '../components/LessonViewer';
import { ConversationPractice } from '../components/ConversationPractice';
import { CulturalLessons } from '../components/CulturalLessons';

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

export function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<HomeView>('dashboard');
  const [languages, setLanguages] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [pendingCategory, setPendingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleCategoryClick = (category: Category) => {
    setPendingCategory(category);
    setView('language-pick');
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
      navigate('/login');
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
      {/* Slim sticky top bar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <button
              onClick={() => setView('dashboard')}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <img
                src="/lughalogo.png"
                alt="LUGHA47"
                className="w-8 h-8 object-contain"
              />
              <span className="text-lg font-bold text-forest-700 font-heading">LUGHA47</span>
            </button>
            <div className="flex items-center gap-3">
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
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {view === 'dashboard' && (
          <div className="screen-enter">
            {/* Hero */}
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-forest-50 rounded-full mb-4 border border-forest-200">
                <Sparkles className="w-3.5 h-3.5 text-forest-600" />
                <span className="text-xs font-semibold text-forest-700">Preserve Culture Through Language</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-ink-900 mb-3 leading-tight">
                Preserve Kenya's{' '}
                <span className="text-forest-600">Linguistic Heritage</span>
              </h1>
              <p className="text-base md:text-lg text-ink-500 max-w-2xl mx-auto">
                Keep Kenyan languages alive for future generations through interactive, culturally rich lessons.
              </p>
            </div>

            {/* Three category cards */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-ink-900 mb-4">What would you like to do?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleCategoryClick('lessons')}
                  className="card card-hover p-6 text-left"
                >
                  <div className="w-12 h-12 bg-forest-600 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">Lessons</h3>
                  <p className="text-ink-500 text-sm leading-relaxed mb-3">
                    Flashcards, sentence building, and quizzes.
                  </p>
                  <div className="flex items-center gap-1.5 text-forest-700 font-bold text-sm">
                    Start Learning <ArrowRight className="w-4 h-4" />
                  </div>
                </button>

                <button
                  onClick={() => handleCategoryClick('culture')}
                  className="card card-hover p-6 text-left border-amber-200"
                >
                  <div className="w-12 h-12 bg-sun-400 rounded-xl flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-ink-900" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">Culture</h3>
                  <p className="text-ink-500 text-sm leading-relaxed mb-3">
                    Traditions, proverbs, foods, and customs.
                  </p>
                  <div className="flex items-center gap-1.5 text-sun-700 font-bold text-sm">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </button>

                <button
                  onClick={() => handleCategoryClick('conversations')}
                  className="card card-hover p-6 text-left border-lake-200"
                >
                  <div className="w-12 h-12 bg-lake-600 rounded-xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-ink-900 mb-2">Conversations</h3>
                  <p className="text-ink-500 text-sm leading-relaxed mb-3">
                    Practice everyday real-life situations.
                  </p>
                  <div className="flex items-center gap-1.5 text-lake-700 font-bold text-sm">
                    Start <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Mission */}
            <div className="card p-8 mb-8">
              <h2 className="text-xl font-bold text-ink-900 mb-2">Our Mission</h2>
              <p className="text-ink-500 text-sm leading-relaxed mb-6">
                Every language carries the wisdom, stories, and identity of its people. LUGHA47 is dedicated to preserving Kenya's indigenous languages by making them accessible, engaging, and relevant for modern learners.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-sun-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-ink-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink-900 text-sm">Cultural Identity</h3>
                    <p className="text-ink-400 text-xs mt-0.5">Keep your heritage alive.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-forest-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink-900 text-sm">Interactive Learning</h3>
                    <p className="text-ink-400 text-xs mt-0.5">Natural, fun, meaningful.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-lake-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink-900 text-sm">Real Life Practice</h3>
                    <p className="text-ink-400 text-xs mt-0.5">Use what you learn daily.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-forest-700 rounded-2xl p-8 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-forest-600/50 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Begin Your Journey Today</h2>
                <p className="text-forest-100 text-sm mb-5 max-w-md mx-auto">
                  Join thousands of Kenyans reconnecting with their linguistic roots.
                </p>
                <button
                  onClick={() => handleCategoryClick('lessons')}
                  className="btn btn-sun px-6 py-3 inline-flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'language-pick' && (
          <LanguageSelector
            languages={languages}
            onSelectLanguage={handleSelectLanguage}
            onBack={() => setView('dashboard')}
            title={languagePickConfig?.title}
            subtitle={languagePickConfig?.subtitle}
          />
        )}

        {view === 'lessons' && selectedLanguage && (
          <LessonViewer
            languageId={selectedLanguage}
            onBack={() => setView('language-pick')}
          />
        )}

        {view === 'conversations' && selectedLanguage && (
          <ConversationPractice
            languageId={selectedLanguage}
            onBack={() => setView('language-pick')}
          />
        )}

        {view === 'culture' && selectedLanguage && (
          <CulturalLessons
            languageId={selectedLanguage}
            onBack={() => setView('language-pick')}
          />
        )}
      </main>

      {/* Bottom tab bar (mobile only) */}
      {showBottomBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 md:hidden">
          <div className="flex justify-around items-center h-16">
            <button
              onClick={() => { setView('dashboard'); }}
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
