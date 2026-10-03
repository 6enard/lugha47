import { useState } from 'react';
import {
  MessageCircle,
  Users,
  UtensilsCrossed,
  Globe,
  BookOpen,
  Music,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Languages as LanguagesIcon,
} from 'lucide-react';
import {
  CultureCategory,
  getCultureForLanguage,
} from '../data/culture';

const iconMap: Record<string, typeof MessageCircle> = {
  message: MessageCircle,
  users: Users,
  utensils: UtensilsCrossed,
  globe: Globe,
  book: BookOpen,
  music: Music,
  map: MapPin,
};

interface CulturalLessonsProps {
  languageId: string;
  onBack: () => void;
}

export function CulturalLessons({ languageId, onBack }: CulturalLessonsProps) {
  const [selectedCategory, setSelectedCategory] = useState<CultureCategory | null>(null);
  const culture = getCultureForLanguage(languageId);

  if (!culture) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Cultural lessons not available for this language.</p>
        <button onClick={onBack} className="mt-4 text-emerald-600 font-semibold hover:text-emerald-700">
          Go Back
        </button>
      </div>
    );
  }

  const handleBack = () => {
    setSelectedCategory(null);
  };

  // Category detail view
  if (selectedCategory) {
    const Icon = iconMap[selectedCategory.icon] || BookOpen;
    return (
      <>
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 mb-12 transition-all duration-300 hover:gap-3"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to {culture.languageName} Culture
        </button>

        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6 border border-emerald-200">
            <Icon className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">{selectedCategory.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {selectedCategory.title}
          </h1>
          <p className="text-lg text-gray-600">{selectedCategory.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {selectedCategory.items.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-300"
              style={{ animation: 'slideIn 0.4s ease-out', animationDelay: `${index * 60}ms`, animationFillMode: 'backwards' }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>

              {item.nativeText && (
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 mb-3">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
                    {culture.nativeName}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{item.nativeText}</p>
                  {item.englishText && (
                    <p className="text-sm text-gray-500 mt-1">{item.englishText}</p>
                  )}
                </div>
              )}

              {item.extra && (
                <div className="flex items-start gap-2 text-sm text-gray-500">
                  <Sparkles className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p>{item.extra}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  }

  // Overview + category grid
  return (
    <>
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 mb-12 transition-all duration-300 hover:gap-3"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6 border border-emerald-200">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-700">Language → Culture → History → Stories</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
          {culture.languageName} Culture
        </h1>
        <p className="text-xl text-emerald-600 font-bold mb-4">{culture.nativeName}</p>
      </div>

      {/* Overview card */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 rounded-3xl shadow-2xl p-10 border border-gray-200/50 backdrop-blur">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Overview</h2>
              <p className="text-sm text-gray-500">{culture.region}</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">{culture.overview}</p>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {culture.categories.map((category, index) => {
          const Icon = iconMap[category.icon] || BookOpen;
          const colorMap = [
            'from-amber-400 to-orange-500',
            'from-emerald-400 to-teal-500',
            'from-rose-400 to-pink-500',
            'from-sky-400 to-cyan-500',
            'from-violet-400 to-purple-500',
            'from-yellow-400 to-amber-500',
            'from-blue-400 to-indigo-500',
          ];
          const color = colorMap[index % colorMap.length];
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className="group bg-white rounded-3xl shadow-lg p-8 border border-gray-200/50 hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 text-left hover:-translate-y-2"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-400">
                  {category.items.length} {category.items.length === 1 ? 'entry' : 'entries'}
                </span>
                <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-3 transition-all duration-300">
                  Explore
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

/** Compact dashboard section showing all languages with their culture categories */
export function CultureOverviewSection({
  languages,
  selectedLanguage,
  onExploreLanguage,
}: {
  languages: { id: string; name: string; nativeSpelling: string }[];
  selectedLanguage: string | null;
  onExploreLanguage: (languageId: string) => void;
}) {
  const [expandedLang, setExpandedLang] = useState<string | null>(null);

  const toggleExpand = (langId: string) => {
    setExpandedLang(expandedLang === langId ? null : langId);
  };

  return (
    <div className="mb-24" id="culture">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6 border border-emerald-200">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-700">Language → Culture → History → Stories</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore Kenyan Culture
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Learn the traditions, proverbs, foods, names, and customs of each community alongside the language.
        </p>
      </div>

      <div className="space-y-6 max-w-5xl mx-auto">
        {languages.map((lang) => {
          const culture = getCultureForLanguage(lang.id);
          if (!culture) return null;
          const isExpanded = expandedLang === lang.id;
          const isCurrent = selectedLanguage === lang.id;

          return (
            <div
              key={lang.id}
              className={`bg-white rounded-3xl shadow-lg border transition-all duration-300 overflow-hidden ${
                isExpanded ? 'border-emerald-300 shadow-xl' : 'border-gray-200/50'
              }`}
            >
              {/* Language header */}
              <button
                onClick={() => toggleExpand(lang.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50/50 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <LanguagesIcon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-gray-900">{culture.languageName}</h3>
                      {isCurrent && (
                        <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 rounded-full text-xs font-bold text-emerald-700">
                          Your Language
                        </span>
                      )}
                    </div>
                    <p className="text-emerald-600 font-bold">{culture.nativeName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 font-semibold hidden sm:block">
                    {culture.categories.length} topics
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isExpanded ? 'bg-emerald-100 rotate-180' : 'bg-gray-100'
                  }`}>
                    <ArrowRight className={`w-4 h-4 ${isExpanded ? 'text-emerald-600' : 'text-gray-400'} rotate-90`} />
                  </div>
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-6 pb-6">
                  {/* Region info */}
                  <div className="flex items-start gap-2 mb-5 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-amber-800 mb-1">Region</p>
                      <p className="text-sm text-amber-700">{culture.region}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-5">{culture.overview}</p>

                  {/* Category chips */}
                  <div className="flex flex-wrap gap-3 mb-5">
                    {culture.categories.map((cat, idx) => {
                      const Icon = iconMap[cat.icon] || BookOpen;
                      const colorMap = [
                        'from-amber-400 to-orange-500',
                        'from-emerald-400 to-teal-500',
                        'from-rose-400 to-pink-500',
                        'from-sky-400 to-cyan-500',
                        'from-violet-400 to-purple-500',
                        'from-yellow-400 to-amber-500',
                        'from-blue-400 to-indigo-500',
                      ];
                      const color = colorMap[idx % colorMap.length];
                      return (
                        <div
                          key={cat.id}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200"
                        >
                          <div className={`w-6 h-6 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{cat.title}</span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => onExploreLanguage(lang.id)}
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Explore {culture.languageName} Culture
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
