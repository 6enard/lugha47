import { useState } from 'react';
import {
  MessageCircle,
  Users,
  UtensilsCrossed,
  Globe,
  BookOpen,
  Music,
  MapPin,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  CultureCategory,
  getCultureForLanguage,
} from '../data/culture';
import { ScreenHeader } from './ui';
import { getAccent } from '../data/languageAccents';

const iconMap: Record<string, typeof MessageCircle> = {
  message: MessageCircle,
  users: Users,
  utensils: UtensilsCrossed,
  globe: Globe,
  book: BookOpen,
  music: Music,
  map: MapPin,
};

const categoryColors = [
  'from-amber-400 to-orange-500',
  'from-forest-400 to-forest-600',
  'from-rose-400 to-pink-500',
  'from-lake-400 to-lake-600',
  'from-sun-400 to-sun-600',
  'from-teal-400 to-cyan-500',
  'from-indigo-400 to-blue-600',
];

interface CulturalLessonsProps {
  languageId: string;
  onBack: () => void;
}

export function CulturalLessons({ languageId, onBack }: CulturalLessonsProps) {
  const [selectedCategory, setSelectedCategory] = useState<CultureCategory | null>(null);
  const culture = getCultureForLanguage(languageId);
  const accent = getAccent(languageId);

  if (!culture) {
    return (
      <div className="screen-enter text-center py-16">
        <p className="text-ink-500">Cultural lessons not available for this language.</p>
        <button onClick={onBack} className="mt-4 text-forest-700 font-semibold hover:text-forest-800">
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
      <div className="screen-enter">
        <ScreenHeader
          title={selectedCategory.title}
          subtitle={selectedCategory.description}
          onBack={handleBack}
          backLabel={`Back to ${culture.languageName} Culture`}
          icon={<Icon className="w-7 h-7 text-forest-600" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {selectedCategory.items.map((item, index) => (
            <div
              key={item.id}
              className="card p-6"
              style={{ animation: 'slideIn 0.3s ease-out', animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
            >
              <h3 className="text-lg font-bold text-ink-900 mb-2">{item.title}</h3>
              <p className="text-ink-500 text-sm leading-relaxed mb-3">{item.description}</p>

              {item.nativeText && (
                <div className="bg-forest-50 rounded-xl p-4 border border-forest-100 mb-3">
                  <p className="text-xs font-bold text-forest-700 uppercase tracking-wider mb-1">
                    {culture.nativeName}
                  </p>
                  <p className="text-xl font-bold text-ink-900">{item.nativeText}</p>
                  {item.englishText && (
                    <p className="text-sm text-ink-400 mt-1">{item.englishText}</p>
                  )}
                </div>
              )}

              {item.extra && (
                <div className="flex items-start gap-2 text-sm text-ink-400">
                  <Sparkles className="w-4 h-4 text-forest-500 flex-shrink-0 mt-0.5" />
                  <p>{item.extra}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Overview + category grid
  return (
    <div className="screen-enter">
      <ScreenHeader
        title={`${culture.languageName} Culture`}
        subtitle={culture.nativeName}
        onBack={onBack}
        backLabel="Back"
        icon={<Globe className="w-7 h-7 text-forest-600" />}
      />

      {/* Overview card */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="card p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${accent.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink-900">Overview</h2>
              <p className="text-sm text-ink-400">{culture.region}</p>
            </div>
          </div>
          <p className="text-ink-600 text-sm leading-relaxed">{culture.overview}</p>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {culture.categories.map((category, index) => {
          const Icon = iconMap[category.icon] || BookOpen;
          const color = categoryColors[index % categoryColors.length];
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className="card card-hover p-5 text-left"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-ink-900 text-base mb-1">{category.title}</h3>
              <p className="text-ink-500 text-sm leading-snug mb-3">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-300">
                  {category.items.length} {category.items.length === 1 ? 'entry' : 'entries'}
                </span>
                <div className="flex items-center gap-1.5 text-forest-700 font-bold text-sm">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
