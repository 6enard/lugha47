import { useState, useMemo, useCallback } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Sparkles, RotateCcw } from 'lucide-react';
import { SentenceExercise, SentenceBlock, getLanguageName } from '../data/sentences';

interface SentenceBuilderProps {
  exercises: SentenceExercise[];
  languageId: string;
  onComplete: () => void;
  onBack: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function SentenceBuilder({ exercises, languageId, onComplete, onBack }: SentenceBuilderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableBlocks, setAvailableBlocks] = useState<SentenceBlock[]>([]);
  const [placedBlocks, setPlacedBlocks] = useState<SentenceBlock[]>([]);
  const [checkResult, setCheckResult] = useState<'correct' | 'incorrect' | null>(null);

  const currentExercise = exercises[currentIndex];
  const isLastExercise = currentIndex === exercises.length - 1;

  const initBlocks = useCallback(() => {
    if (!currentExercise) return;
    const blocks = currentExercise.blocks[languageId as 'kalenjin' | 'kikuyu' | 'luo'];
    setAvailableBlocks(shuffle(blocks));
    setPlacedBlocks([]);
    setCheckResult(null);
  }, [currentExercise, languageId]);

  useMemo(() => {
    initBlocks();
  }, [initBlocks]);

  const handlePlaceBlock = (block: SentenceBlock) => {
    if (checkResult !== null) return;
    setAvailableBlocks((prev) => prev.filter((b) => b.id !== block.id));
    setPlacedBlocks((prev) => [...prev, block]);
  };

  const handleRemoveBlock = (block: SentenceBlock) => {
    if (checkResult === 'correct') return;
    setPlacedBlocks((prev) => prev.filter((b) => b.id !== block.id));
    setAvailableBlocks((prev) => [...prev, block]);
    setCheckResult(null);
  };

  const handleCheck = () => {
    const correctOrder = currentExercise.correctOrder[languageId as 'kalenjin' | 'kikuyu' | 'luo'];
    const placedIds = placedBlocks.map((b) => b.id);
    const isCorrect = placedIds.length === correctOrder.length &&
      placedIds.every((id, i) => id === correctOrder[i]);

    setCheckResult(isCorrect ? 'correct' : 'incorrect');
  };

  const handleReset = () => {
    initBlocks();
  };

  const handleNext = () => {
    if (!isLastExercise) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  if (!currentExercise) {
    return null;
  }

  const langName = getLanguageName(languageId);

  return (
    <>
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 mb-12 transition-all duration-300 hover:gap-3"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Lesson
      </button>

      <div className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6 border border-emerald-200">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-700">Sentence Builder</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Build the Sentence
        </h1>
        <p className="text-xl text-gray-600">
          Arrange the blocks to say the sentence in {langName}
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Progress dots */}
        <div className="mb-8 flex justify-center gap-2">
          {exercises.map((_, idx) => (
            <div
              key={idx}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-10 bg-gradient-to-r from-emerald-600 to-teal-600'
                  : idx < currentIndex
                  ? 'w-3 bg-emerald-500'
                  : 'w-3 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* English prompt */}
        <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 rounded-3xl shadow-2xl p-12 border border-gray-200/50 backdrop-blur mb-6">
          <p className="text-sm font-bold text-teal-700 uppercase tracking-widest mb-4">
            English
          </p>
          <p className="text-4xl md:text-5xl font-bold text-gray-800 mb-10">
            {currentExercise.english}
          </p>

          {/* Drop zone */}
          <div className={`min-h-32 rounded-2xl border-3 border-dashed p-6 transition-all duration-300 ${
            checkResult === 'correct'
              ? 'border-emerald-400 bg-emerald-50'
              : checkResult === 'incorrect'
              ? 'border-red-400 bg-red-50'
              : placedBlocks.length === 0
              ? 'border-gray-300 bg-gray-50/50'
              : 'border-emerald-300 bg-white'
          }`}>
            {placedBlocks.length === 0 ? (
              <p className="text-gray-400 text-lg text-center py-8 font-medium">
                Tap blocks below to build your sentence
              </p>
            ) : (
              <div className="flex flex-wrap gap-3 items-center justify-center py-4">
                {placedBlocks.map((block) => (
                  <button
                    key={block.id}
                    onClick={() => handleRemoveBlock(block)}
                    disabled={checkResult === 'correct'}
                    className="group px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-xl shadow-lg transition-all duration-300 hover:scale-105 disabled:cursor-default"
                  >
                    {block.text}
                    {checkResult === null && (
                      <XCircle className="w-4 h-4 inline ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Feedback banner */}
          {checkResult === 'correct' && (
            <div className="mt-6 flex items-center gap-3 px-6 py-4 bg-emerald-100 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <p className="text-emerald-800 font-bold text-lg">
                Perfect! That's the correct sentence.
              </p>
            </div>
          )}
          {checkResult === 'incorrect' && (
            <div className="mt-6 flex items-center gap-3 px-6 py-4 bg-red-100 rounded-2xl border border-red-200">
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-red-800 font-bold text-lg">
                Not quite right. Try rearranging the blocks.
              </p>
            </div>
          )}
        </div>

        {/* Available blocks */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200/50 mb-6">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-5">
            Available Words
          </p>
          {availableBlocks.length > 0 ? (
            <div className="flex flex-wrap gap-3 items-center justify-center">
              {availableBlocks.map((block) => (
                <button
                  key={block.id}
                  onClick={() => handlePlaceBlock(block)}
                  disabled={checkResult === 'correct'}
                  className="px-6 py-4 bg-white border-2 border-gray-200 text-gray-800 rounded-2xl font-bold text-xl shadow-md hover:border-emerald-400 hover:bg-emerald-50 hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {block.text}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4 font-medium">
              {placedBlocks.length > 0 ? 'All blocks placed' : 'No blocks available'}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {checkResult !== 'correct' && (
            <>
              <button
                onClick={handleReset}
                disabled={placedBlocks.length === 0}
                className="flex items-center gap-2 justify-center px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
              <button
                onClick={handleCheck}
                disabled={availableBlocks.length > 0}
                className="flex items-center gap-2 justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-5 h-5" />
                Check Answer
              </button>
            </>
          )}
          {checkResult === 'correct' && (
            <button
              onClick={handleNext}
              className="group flex items-center gap-2 justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {isLastExercise ? 'Continue to Quiz' : 'Next Sentence'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Exercise counter */}
        <div className="mt-8 text-center">
          <span className="text-sm font-bold text-gray-600">
            Sentence {currentIndex + 1} of {exercises.length}
          </span>
        </div>
      </div>
    </>
  );
}
