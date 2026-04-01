import { ArrowLeft, Languages, ArrowRight } from 'lucide-react';

interface Language {
  id: string;
  name: string;
  nativeSpelling: string;
  description: string;
}

interface LanguageSelectorProps {
  languages: Language[];
  onSelectLanguage: (languageId: string) => void;
  onBack: () => void;
}

export function LanguageSelector({
  languages,
  onSelectLanguage,
  onBack,
}: LanguageSelectorProps) {
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
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Choose Your Language
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select a language to start your cultural journey today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {languages.map((language, index) => (
          <button
            key={language.id}
            onClick={() => onSelectLanguage(language.id)}
            className="group bg-white rounded-3xl shadow-lg p-8 border border-gray-200/50 hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 text-left hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Languages className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {language.name}
            </h3>
            <p className="text-xl text-emerald-600 font-bold mb-4">
              {language.nativeSpelling}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {language.description}
            </p>
            <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-3 transition-all duration-300">
              Start Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
