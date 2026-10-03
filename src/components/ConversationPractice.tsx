import { useState, useEffect, useRef } from 'react';
import {
  Home as HomeIcon,
  ShoppingCart,
  Car,
  UtensilsCrossed,
  Users,
  School,
  ArrowRight,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import {
  ConversationScenario,
  getConversationsForLanguage,
  getLanguageConversationInfo,
} from '../data/conversations';
import { ScreenHeader, ProgressBar } from './ui';
import { getAccent } from '../data/languageAccents';

const iconMap: Record<string, typeof HomeIcon> = {
  home: HomeIcon,
  shopping: ShoppingCart,
  car: Car,
  utensils: UtensilsCrossed,
  users: Users,
  school: School,
};

interface ConversationPracticeProps {
  languageId: string;
  onBack: () => void;
}

export function ConversationPractice({ languageId, onBack }: ConversationPracticeProps) {
  const [scenarios] = useState<ConversationScenario[]>(getConversationsForLanguage(languageId));
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario | null>(null);
  const [visibleTurns, setVisibleTurns] = useState(1);
  const [showEnglish, setShowEnglish] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const langInfo = getLanguageConversationInfo(languageId);
  const langName = langInfo?.languageName || languageId;
  const accent = getAccent(languageId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleTurns]);

  const handleSelectScenario = (scenario: ConversationScenario) => {
    setSelectedScenario(scenario);
    setVisibleTurns(1);
  };

  const handleNextTurn = () => {
    if (!selectedScenario) return;
    if (visibleTurns < selectedScenario.turns.length) {
      setVisibleTurns(visibleTurns + 1);
    }
  };

  const handleShowAll = () => {
    if (!selectedScenario) return;
    setVisibleTurns(selectedScenario.turns.length);
  };

  const handleRestart = () => {
    setVisibleTurns(1);
  };

  const handleBackToScenarios = () => {
    setSelectedScenario(null);
    setVisibleTurns(1);
  };

  // Scenario selection
  if (!selectedScenario) {
    return (
      <div className="screen-enter">
        <ScreenHeader
          title={`${langName} Conversations`}
          subtitle={`Practice ${langName} through everyday conversations. Choose a scenario to start.`}
          onBack={onBack}
          backLabel="Back"
          icon={<MessageCircle className="w-7 h-7 text-lake-600" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {scenarios.map((scenario) => {
            const Icon = iconMap[scenario.icon] || MessageCircle;
            return (
              <button
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario)}
                className="card card-hover p-5 text-left"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${accent.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-ink-900 text-base mb-1">{scenario.title}</h3>
                <p className="text-ink-500 text-sm leading-snug">{scenario.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const turns = selectedScenario.turns.slice(0, visibleTurns);
  const allShown = visibleTurns >= selectedScenario.turns.length;

  return (
    <div className="screen-enter max-w-2xl mx-auto pb-20">
      <ScreenHeader
        title={`${selectedScenario.title} in ${langName}`}
        subtitle={selectedScenario.description}
        onBack={handleBackToScenarios}
        backLabel="Back to Scenarios"
      />

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEnglish(!showEnglish)}
            className={`px-3 py-1.5 rounded-lg font-semibold text-sm border-2 transition-all ${
              showEnglish
                ? 'bg-forest-50 border-forest-200 text-forest-700'
                : 'bg-white border-gray-200 text-ink-400'
            }`}
          >
            {showEnglish ? 'English On' : 'English Off'}
          </button>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-gray-200 text-ink-500 rounded-lg font-semibold text-sm hover:bg-gray-50"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </button>
        </div>
        <span className="text-xs font-semibold text-ink-400">
          {visibleTurns} / {selectedScenario.turns.length} lines
        </span>
      </div>

      <ProgressBar current={visibleTurns - 1} total={selectedScenario.turns.length} className="mb-6" />

      {/* Conversation area */}
      <div
        ref={scrollRef}
        className="card p-6 min-h-80 max-h-[500px] overflow-y-auto mb-4"
      >
        <div className="space-y-4">
          {turns.map((turn) => {
            const isSpeakerA = turn.speaker === 'a';
            return (
              <div
                key={turn.id}
                className={`flex gap-3 ${isSpeakerA ? 'justify-start' : 'justify-end'}`}
                style={{ animation: 'slideIn 0.3s ease-out' }}
              >
                {isSpeakerA && (
                  <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${accent.iconBg} rounded-xl flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl p-4 ${
                    isSpeakerA
                      ? 'bg-white border border-gray-200'
                      : `bg-gradient-to-br ${accent.iconBg} text-white`
                  }`}
                >
                  <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                    isSpeakerA ? accent.text : 'text-white/70'
                  }`}>
                    {isSpeakerA ? 'Person A' : 'Person B'}
                  </p>
                  <p className="text-lg md:text-xl font-bold leading-tight mb-1">
                    {turn.text}
                  </p>
                  {showEnglish && (
                    <p className={`text-sm ${isSpeakerA ? 'text-ink-400' : 'text-white/70'}`}>
                      {turn.english}
                    </p>
                  )}
                </div>
                {!isSpeakerA && (
                  <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${accent.iconBg} rounded-xl flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allShown && (
          <div className="mt-6 bg-forest-50 border-2 border-forest-200 rounded-xl p-5 text-center">
            <p className="text-lg font-bold text-ink-900 mb-1">Conversation Complete!</p>
            <p className="text-ink-500 text-sm mb-4">
              You've gone through the full {selectedScenario.title.toLowerCase()} dialogue in {langName}.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button onClick={handleRestart} className="btn btn-secondary px-5 py-2.5 flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Practice Again
              </button>
              <button onClick={handleBackToScenarios} className="btn btn-primary px-5 py-2.5 flex items-center justify-center gap-2">
                More Scenarios <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {!allShown && (
        <div className="flex flex-col items-center gap-2">
          <button onClick={handleNextTurn} className="btn btn-primary px-8 py-3 flex items-center gap-2">
            Next Line <ArrowRight className="w-5 h-5" />
          </button>
          {visibleTurns < selectedScenario.turns.length - 1 && (
            <button onClick={handleShowAll} className="text-sm text-ink-400 hover:text-ink-600 font-semibold">
              Show all lines
            </button>
          )}
        </div>
      )}
    </div>
  );
}
