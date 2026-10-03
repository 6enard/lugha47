import { useState, useEffect, useRef } from 'react';
import {
  Home as HomeIcon,
  ShoppingCart,
  Car,
  UtensilsCrossed,
  Users,
  School,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';
import {
  ConversationScenario,
  getConversationsForLanguage,
  getLanguageConversationInfo,
} from '../data/conversations';

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
  const nativeName = langInfo?.nativeName || languageId;

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

  // Scenario selection grid
  if (!selectedScenario) {
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
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">Real Life Conversations</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {langName} Conversations
          </h1>
          <p className="text-xl text-emerald-600 font-bold mb-2">{nativeName}</p>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Practice {langName} through everyday conversations. Choose a scenario to start.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {scenarios.map((scenario, index) => {
            const Icon = iconMap[scenario.icon] || MessageCircle;
            return (
              <button
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario)}
                className="group bg-white rounded-3xl shadow-lg p-8 border border-gray-200/50 hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 text-left hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {scenario.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {scenario.description}
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-3 transition-all duration-300">
                  Start Conversation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </>
    );
  }

  const turns = selectedScenario.turns.slice(0, visibleTurns);
  const allShown = visibleTurns >= selectedScenario.turns.length;

  return (
    <>
      <button
        onClick={handleBackToScenarios}
        className="group flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 mb-12 transition-all duration-300 hover:gap-3"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Scenarios
      </button>

      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6 border border-emerald-200">
          {(() => {
            const Icon = iconMap[selectedScenario.icon] || MessageCircle;
            return <Icon className="w-4 h-4 text-emerald-600" />;
          })()}
          <span className="text-sm font-semibold text-emerald-700">{selectedScenario.title}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {selectedScenario.title} in {langName}
        </h1>
        <p className="text-lg text-gray-600">{selectedScenario.description}</p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEnglish(!showEnglish)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 border-2 ${
                showEnglish
                  ? 'bg-emerald-100 border-emerald-200 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {showEnglish ? 'English On' : 'English Off'}
            </button>
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
            <MessageCircle className="w-4 h-4" />
            {visibleTurns} / {selectedScenario.turns.length} lines
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-8">
          {selectedScenario.turns.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                idx < visibleTurns
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Conversation area */}
        <div
          ref={scrollRef}
          className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 rounded-3xl shadow-2xl p-8 border border-gray-200/50 backdrop-blur min-h-96 max-h-[600px] overflow-y-auto"
        >
          <div className="space-y-6">
            {turns.map((turn) => {
              const isSpeakerA = turn.speaker === 'a';
              return (
                <div
                  key={turn.id}
                  className={`flex gap-4 ${isSpeakerA ? 'justify-start' : 'justify-end'}`}
                  style={{
                    animation: 'slideIn 0.4s ease-out',
                  }}
                >
                  {isSpeakerA && (
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-3xl p-6 shadow-lg ${
                      isSpeakerA
                        ? 'bg-white border border-gray-200/50 rounded-tl-sm'
                        : 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-tr-sm'
                    }`}
                  >
                    <p
                      className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                        isSpeakerA ? 'text-emerald-600' : 'text-emerald-100'
                      }`}
                    >
                      {isSpeakerA ? 'Person A' : 'Person B'}
                    </p>
                    <p className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                      {turn.text}
                    </p>
                    {showEnglish && (
                      <p
                        className={`text-sm leading-relaxed ${
                          isSpeakerA ? 'text-gray-500' : 'text-emerald-100'
                        }`}
                      >
                        {turn.english}
                      </p>
                    )}
                  </div>
                  {!isSpeakerA && (
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">B</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {allShown && (
            <div className="mt-8 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 text-center">
              <p className="text-2xl font-bold text-gray-900 mb-2">Conversation Complete!</p>
              <p className="text-gray-600 mb-4">
                You've gone through the full {selectedScenario.title.toLowerCase()} dialogue in {langName}.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 justify-center px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-md"
                >
                  <RotateCcw className="w-5 h-5" />
                  Practice Again
                </button>
                <button
                  onClick={handleBackToScenarios}
                  className="flex items-center gap-2 justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105"
                >
                  More Scenarios
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Next turn button */}
        {!allShown && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleNextTurn}
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Next Line
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {!allShown && visibleTurns < selectedScenario.turns.length - 1 && (
          <div className="mt-4 text-center">
            <button
              onClick={handleShowAll}
              className="text-sm text-gray-500 hover:text-gray-700 font-semibold transition-colors duration-200"
            >
              Show all lines
            </button>
          </div>
        )}
      </div>
    </>
  );
}
