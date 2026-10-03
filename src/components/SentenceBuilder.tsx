import { useState, useMemo, useCallback } from 'react';
import { ArrowRight, CheckCircle2, XCircle, Sparkles, RotateCcw } from 'lucide-react';
import { SentenceExercise, SentenceBlock, getLanguageName, LanguageId } from '../data/sentences';
import { ScreenHeader, ProgressBar } from './ui';

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
    const blocks = currentExercise.blocks[languageId as LanguageId];
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
    const correctOrder = currentExercise.correctOrder[languageId as LanguageId];
    const placedIds = placedBlocks.map((b) => b.id);
    const isCorrect = placedIds.length === correctOrder.length &&
      placedIds.every((id, i) => id === correctOrder[i]);
    setCheckResult(isCorrect ? 'correct' : 'incorrect');
  };

  const handleReset = () => { initBlocks(); };

  const handleNext = () => {
    if (!isLastExercise) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  if (!currentExercise) return null;

  const langName = getLanguageName(languageId);

  const allPlaced = availableBlocks.length === 0 && placedBlocks.length > 0;

  return (
    <div className="screen-enter max-w-2xl mx-auto pb-32">
      <ScreenHeader
        title="Build the Sentence"
        subtitle={`Arrange the blocks to say the sentence in ${langName}`}
        onBack={onBack}
        backLabel="Back to Lesson"
        icon={<Sparkles className="w-7 h-7 text-forest-600" />}
      />

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-ink-400">
          Sentence {currentIndex + 1} of {exercises.length}
        </span>
      </div>
      <ProgressBar current={currentIndex} total={exercises.length} className="mb-6" />

      {/* English prompt + drop zone */}
      <div className="card p-6 md:p-8 mb-4">
        <p className="text-xs font-bold text-lake-600 uppercase tracking-widest mb-3">
          English
        </p>
        <p className="text-2xl md:text-3xl font-bold text-ink-800 mb-6">
          {currentExercise.english}
        </p>

        {/* Drop zone */}
        <div className={`min-h-28 rounded-xl border-2 border-dashed p-5 transition-all duration-200 ${
          checkResult === 'correct'
            ? 'border-forest-400 bg-forest-50'
            : checkResult === 'incorrect'
            ? 'border-kanga-400 bg-kanga-50'
            : placedBlocks.length === 0
            ? 'border-gray-300 bg-gray-50'
            : 'border-forest-300 bg-white'
        }`}>
          {placedBlocks.length === 0 ? (
            <p className="text-gray-400 text-base text-center py-6 font-medium">
              Tap blocks below to build your sentence
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 items-center justify-center py-3">
              {placedBlocks.map((block) => (
                <button
                  key={block.id}
                  onClick={() => handleRemoveBlock(block)}
                  disabled={checkResult === 'correct'}
                  className="px-5 py-3 bg-forest-600 text-white rounded-xl font-bold text-lg border-b-4 border-forest-800 active:border-b-0 active:translate-y-1 transition-all duration-150 disabled:cursor-default"
                >
                  {block.text}
                  {checkResult === null && (
                    <XCircle className="w-4 h-4 inline ml-2 opacity-50" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Available blocks */}
      <div className="card p-5 mb-4">
        <p className="text-xs font-bold text-ink-400 uppercase tracking-widest mb-4">
          Available Words
        </p>
        {availableBlocks.length > 0 ? (
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {availableBlocks.map((block) => (
              <button
                key={block.id}
                onClick={() => handlePlaceBlock(block)}
                disabled={checkResult === 'correct'}
                className="px-5 py-3 bg-white border-2 border-gray-300 text-ink-800 rounded-xl font-bold text-lg border-b-4 active:border-b-2 active:translate-y-0.5 hover:border-forest-400 hover:bg-forest-50 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {block.text}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-ink-300 text-center py-3 font-medium text-sm">
            {placedBlocks.length > 0 ? 'All blocks placed' : 'No blocks available'}
          </p>
        )}
      </div>

      {/* Pinned bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 shadow-lg"
        style={{
          backgroundColor: checkResult === 'correct' ? '#dcecdc' : checkResult === 'incorrect' ? '#fee2e2' : '#ffffff',
          borderColor: checkResult === 'correct' ? '#5fa55f' : checkResult === 'incorrect' ? '#fca5a5' : '#e3e7e0',
        }}
      >
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {checkResult === 'correct' ? (
            <>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-forest-700 flex-shrink-0" />
                <p className="font-bold text-sm text-forest-800">Perfect!</p>
              </div>
              <button
                onClick={handleNext}
                className="btn btn-primary px-6 py-3 flex items-center gap-2 flex-shrink-0"
              >
                {isLastExercise ? 'Continue to Quiz' : 'Next Sentence'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          ) : checkResult === 'incorrect' ? (
            <>
              <div className="flex items-center gap-2.5">
                <XCircle className="w-6 h-6 text-kanga-700 flex-shrink-0" />
                <p className="font-bold text-sm text-kanga-800">Try rearranging the blocks</p>
              </div>
              <button
                onClick={handleReset}
                className="btn btn-danger px-6 py-3 flex items-center gap-2 flex-shrink-0"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleReset}
                disabled={placedBlocks.length === 0}
                className="btn btn-secondary px-5 py-3 flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
              <button
                onClick={handleCheck}
                disabled={!allPlaced}
                className="btn btn-primary px-6 py-3 flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Check
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
