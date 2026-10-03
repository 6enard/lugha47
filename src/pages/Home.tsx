import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trophy, LogOut, ArrowRight, Sparkles, Globe, Users, MessageCircle } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative">
            <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-emerald-400 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const languagePickConfig = pendingCategory ? CATEGORY_CONFIG[pendingCategory] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button
              onClick={() => setView('dashboard')}
              className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group"
            >
              <img
                src="/lughalogo.png"
                alt="LUGHA47 Logo"
                className="w-12 h-12 object-contain group-hover:scale-105 transition-all duration-300"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">LUGHA47</span>
            </button>
            <div className="flex items-center gap-6">
              <span className="text-sm text-gray-600 font-medium hidden sm:block">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-300 font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {view === 'dashboard' && (
          <>
            <div className="mb-24 text-center relative">
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-20 right-1/4 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6 border border-emerald-200">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">Preserve Culture Through Language</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Preserve Kenya's
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
                  Linguistic Heritage
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Connect with your roots and keep Kenyan languages alive for future generations through interactive, culturally rich lessons.
              </p>
            </div>

            {/* Three category cards */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Would You Like to Do?</h2>
                <p className="text-lg text-gray-600">Choose a category to begin</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Lessons */}
                <button
                  onClick={() => handleCategoryClick('lessons')}
                  className="group bg-white rounded-3xl shadow-lg p-10 border border-gray-200/50 hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 text-left hover:-translate-y-2"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Lessons</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Learn vocabulary through flashcards, build sentences, and test yourself with quizzes.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-3 transition-all duration-300">
                    Start Learning
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Culture */}
                <button
                  onClick={() => handleCategoryClick('culture')}
                  className="group bg-white rounded-3xl shadow-lg p-10 border border-gray-200/50 hover:shadow-2xl hover:border-amber-300 transition-all duration-300 text-left hover:-translate-y-2"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Culture</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Discover traditions, proverbs, foods, names, and customs of each community.
                  </p>
                  <div className="flex items-center gap-2 text-amber-600 font-bold group-hover:gap-3 transition-all duration-300">
                    Explore Culture
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Real Life Conversations */}
                <button
                  onClick={() => handleCategoryClick('conversations')}
                  className="group bg-white rounded-3xl shadow-lg p-10 border border-gray-200/50 hover:shadow-2xl hover:border-sky-300 transition-all duration-300 text-left hover:-translate-y-2"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Real Life Conversations</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Practice everyday situations — at home, the market, the restaurant, and more.
                  </p>
                  <div className="flex items-center gap-2 text-sky-600 font-bold group-hover:gap-3 transition-all duration-300">
                    Start Conversing
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            <div id="mission" className="mb-24 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-12 border border-gray-200/50 backdrop-blur">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Every language carries the wisdom, stories, and identity of its people.
                  LUGHA47 is dedicated to preserving Kenya's indigenous languages by making
                  them accessible, engaging, and relevant for modern learners.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group text-center p-8 rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-lg">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Cultural Identity</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Language is the heart of culture. Keep your heritage alive and pass it to the next generation.
                  </p>
                </div>
                <div className="group text-center p-8 rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-lg">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Learning</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Engaging lessons that make language learning natural, fun, and deeply meaningful.
                  </p>
                </div>
                <div className="group text-center p-8 rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-lg">
                  <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Real Life Practice</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Use what you learn in everyday conversations that mirror real Kenyan life.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl p-16 text-white mb-16 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="max-w-3xl mx-auto text-center relative z-10">
                <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Begin Your Language Journey Today</h2>
                <p className="text-emerald-50 mb-10 text-xl leading-relaxed">
                  Join thousands of Kenyans reconnecting with their linguistic roots.
                  Whether you're learning your mother tongue or exploring Kenya's diverse cultures,
                  LUGHA47 makes it easy, engaging, and deeply meaningful.
                </p>
                <button
                  onClick={() => handleCategoryClick('lessons')}
                  className="group bg-white text-emerald-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <span className="flex items-center gap-2 justify-center">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>

            <div className="text-center text-gray-600 py-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Users className="w-5 h-5 text-emerald-600" />
                <p className="text-base font-semibold text-gray-700">
                  Preserving languages for future generations
                </p>
              </div>
              <p className="text-sm">
                Our identity, stories, and future live through the languages we speak.
              </p>
            </div>
          </>
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
    </div>
  );
}
