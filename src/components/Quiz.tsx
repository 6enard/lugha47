import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';

export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: {
    kalenjin: string;
    kikuyu: string;
    luo: string;
  };
  orderIndex: number;
}

interface QuizProps {
  questions: QuizQuestion[];
  languageId: string;
  onComplete: (score: number, total: number) => void;
  onRetry: () => void;
}

export function Quiz({ questions, languageId, onComplete, onRetry }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const getLanguageName = (lang: string) => {
    const names: Record<string, string> = {
      kalenjin: 'Kalenjin',
      kikuyu: 'Kikuyu',
      luo: 'Luo',
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

  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

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
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 rounded-3xl shadow-2xl p-16 border border-gray-200/50 text-center backdrop-blur">
          <div className="w-28 h-28 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Trophy className="w-14 h-14 text-white" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Quiz Complete!
          </h2>

          <div className="mb-8">
            <div className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
              {score}/{questions.length}
            </div>
            <p className="text-2xl text-gray-700 font-bold">
              {percentage}% Correct
            </p>
          </div>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            {getScoreMessage()}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRetry}
              className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-base font-bold text-gray-700 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-base font-bold text-emerald-700 px-4 py-2 bg-emerald-100 rounded-xl border border-emerald-200">
            Score: {score}/{questions.length}
          </span>
        </div>

        <div className="flex gap-2">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-3 flex-1 rounded-full transition-all duration-300 ${
                idx < currentQuestionIndex
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
                  : idx === currentQuestionIndex
                  ? 'bg-emerald-400'
                  : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 rounded-3xl shadow-2xl p-12 border border-gray-200/50 backdrop-blur">
        <div className="mb-10">
          <p className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-4">
            Translate to {getLanguageName(languageId)}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="space-y-4">
          {Object.entries(currentQuestion.options).map(([lang, translation]) => {
            const isCorrect = lang === languageId;
            const isSelected = selectedAnswer === lang;

            let buttonClass = 'w-full p-6 rounded-2xl border-2 text-left font-bold text-xl transition-all duration-300 ';

            if (!isAnswered) {
              buttonClass += 'border-gray-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 hover:scale-102 shadow-md hover:shadow-lg';
            } else if (isSelected && isCorrect) {
              buttonClass += 'border-emerald-500 bg-emerald-100 text-emerald-900 shadow-lg';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'border-red-500 bg-red-100 text-red-900 shadow-lg';
            } else if (isCorrect) {
              buttonClass += 'border-emerald-500 bg-emerald-100 text-emerald-900 shadow-lg';
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
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-7 h-7 text-red-600" />
                  )}
                  {isAnswered && !isSelected && isCorrect && (
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-10">
            <button
              onClick={handleNext}
              className="group w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-5 rounded-2xl font-bold text-xl hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105 flex items-center justify-center gap-2"
            >
              {isLastQuestion ? 'See Results' : 'Next Question'}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
