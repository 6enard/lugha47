import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ScreenHeader } from './ui';
import { getAccent } from '../data/languageAccents';

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
  title?: string;
  subtitle?: string;
}

export function LanguageSelector({
  languages,
  onSelectLanguage,
  onBack,
  title = 'Choose Your Language',
  subtitle = 'Select a language to start your cultural journey today',
}: LanguageSelectorProps) {
  return (
    <div className="screen-enter">
      <ScreenHeader title={title} subtitle={subtitle} onBack={onBack} backLabel="Back" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {languages.map((language) => {
          const accent = getAccent(language.id);
          return (
            <button
              key={language.id}
              onClick={() => onSelectLanguage(language.id)}
              className={`card card-hover p-6 text-left ${accent.border}`}
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${accent.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                <FontAwesomeIcon icon={faLanguage} className="text-xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-ink-900 mb-1">
                {language.name}
              </h3>
              <p className={`text-lg font-bold ${accent.text} mb-3`}>
                {language.nativeSpelling}
              </p>
              <p className="text-ink-500 text-sm leading-relaxed mb-4">
                {language.description}
              </p>
              <div className={`flex items-center gap-1.5 font-bold text-sm ${accent.text}`}>
                Start
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
