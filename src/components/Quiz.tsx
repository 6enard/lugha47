import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw } from 'lucide-react';
import { ProgressBar } from './ui';

export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: {
    kalenjin: string;
    kikuyu: string;
    luo: string;
    kamba: string;
    luhya: string;
    gusii: string;
    somali: string;
  };
  orderIndex: number;
}

interface QuizProps {
  questions: QuizQuestion[];
  languageId: string;
  onComplete: (score: number, total: number) => void;
  onRetry: () => void;
  onBackToLessons: () => void;
}

export function Quiz({ questions, languageId, onComplete, onRetry, onBackToLessons }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const getLanguageName = (lang: string) => {
    const names: Record<string, string> = {
      kalenjin: 'Kalenjin', kikuyu: 'Kikuyu', luo: 'Luo',
      kamba: 'Kamba', luhya: 'Luhya', gusii: 'Gusii', somali: 'Somali',
    };
    return names[lang] || lang;
  };

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === languageId) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      onComplete(score, questions.length);
    }
  };

  const getScorePercentage = () => Math.round((score / questions.length) * 100);

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage === 100) return "Perfect score! You're a natural!";
    if (percentage >= 80) return "Excellent work! You're doing great!";
    if (percentage >= 60) return "Good job! Keep practicing!";
    return "Keep learning! Practice makes perfect!";
  };

  if (isComplete) {
    const percentage = getScorePercentage();
    return (
      <div className="screen-enter max-w-xl mx-auto">
        <div className="card p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-sun-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Trophy className="w-10 h-10 text-ink-900" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-ink-900 mb-4">Quiz Complete!</h2>

          <div className="mb-6">
            <div className="text-5xl md:text-6xl font-bold text-forest-600 mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-xl text-ink-700 font-bold">{percentage}% Correct</p>
          </div>

          <p className="text-ink-500 mb-8">{getScoreMessage()}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onRetry}
              className="btn btn-secondary px-6 py-3 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
            <button
              onClick={onBackToLessons}
              className="btn btn-primary px-6 py-3 flex items-center justify-center gap-2"
            >
              Back to Lessons
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCorrectAnswer = selectedAnswer === languageId;

  return (
    <div className="screen-enter max-w-2xl mx-auto pb-32">
      {/* Top bar: question count + score */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-ink-700 px-3 py-1.5 bg-white rounded-lg border border-gray-200">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <span className="text-sm font-bold text-forest-700 px-3 py-1.5 bg-forest-50 rounded-lg border border-forest-200">
          Score: {score}/{questions.length}
        </span>
      </div>

      <ProgressBar current={currentQuestionIndex} total={questions.length} className="mb-6" />

      {/* Question */}
      <div className="card p-6 md:p-8 mb-4">
        <p className="text-xs font-bold text-forest-600 uppercase tracking-widest mb-3">
          Translate to {getLanguageName(languageId)}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {Object.entries(currentQuestion.options).map(([lang, translation]) => {
            const isCorrect = lang === languageId;
            const isSelected = selectedAnswer === lang;

            let buttonClass = 'w-full p-4 rounded-xl border-2 text-left font-bold text-lg transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-forest-200 ';

            if (!isAnswered) {
              buttonClass += 'border-gray-200 bg-white hover:border-forest-400 hover:bg-forest-50 active:translate-y-0.5';
            } else if (isSelected && isCorrect) {
              buttonClass += 'border-forest-500 bg-forest-50 text-forest-900';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'border-kanga-500 bg-kanga-50 text-kanga-900';
            } else if (isCorrect) {
              buttonClass += 'border-forest-500 bg-forest-50 text-forest-900';
            } else {
              buttonClass += 'border-gray-200 bg-white opacity-50';
            }

            return (
              <button
                key={lang}
                onClick={() => handleAnswerSelect(lang)}
                disabled={isAnswered}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span>{translation}</span>
                  {isAnswered && isSelected && isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-forest-600" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-6 h-6 text-kanga-600" />
                  )}
                  {isAnswered && !isSelected && isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-forest-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pinned bottom action bar */}
      {isAnswered && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 shadow-lg"
          style={{ backgroundColor: isCorrectAnswer ? '#dcecdc' : '#fee2e2', borderColor: isCorrectAnswer ? '#5fa55f' : '#fca5a5' }}
        >
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              {isCorrectAnswer ? (
                <CheckCircle2 className="w-6 h-6 text-forest-700 flex-shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-kanga-700 flex-shrink-0" />
              )}
              <div>
                <p className={`font-bold text-sm ${isCorrectAnswer ? 'text-forest-800' : 'text-kanga-800'}`}>
                  {isCorrectAnswer ? 'Correct!' : 'Not quite'}
                </p>
                {!isCorrectAnswer && (
                  <p className="text-xs text-kanga-700">
                    Answer: {currentQuestion.options[languageId as keyof typeof currentQuestion.options]}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleNext}
              className={`btn ${isCorrectAnswer ? 'btn-primary' : 'btn-danger'} px-6 py-3 flex items-center gap-2 flex-shrink-0`}
            >
              {isLastQuestion ? 'See Results' : 'Next'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
