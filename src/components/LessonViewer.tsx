import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, ArrowRight, Target } from 'lucide-react';
import { getLessons, getLessonContent, getQuizQuestions, saveQuizResult, Lesson, LessonContent, QuizQuestion } from '../services/dataService';
import { Quiz } from './Quiz';
import { useAuth } from '../contexts/AuthContext';

interface LessonViewerProps {
  languageId: string;
  onBack: () => void;
}

interface LessonWithContent extends Lesson {
  content: LessonContent[];
}

export function LessonViewer({ languageId, onBack }: LessonViewerProps) {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<LessonWithContent[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonWithContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'detail' | 'quiz'>('grid');
  const [cardIndex, setCardIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const lessonsData = await getLessons();
        const lessonsWithContent = await Promise.all(
          lessonsData.map(async (lesson) => {
            const content = await getLessonContent(lesson.id);
            return { ...lesson, content };
          })
        );
        setLessons(lessonsWithContent);
      } catch (error) {
        console.error('Error loading lessons:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLessons();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const getLanguageName = (lang: string) => {
    const names: Record<string, string> = {
      kalenjin: 'Kalenjin',
      kikuyu: 'Kikuyu',
      luo: 'Luo',
    };
    return names[lang] || lang;
  };

  const handleStartQuiz = async () => {
    if (!selectedLesson) return;

    try {
      const questions = await getQuizQuestions(selectedLesson.id);
      setQuizQuestions(questions);
      setViewMode('quiz');
    } catch (error) {
      console.error('Error loading quiz questions:', error);
    }
  };

  const handleQuizComplete = async (score: number, total: number) => {
    if (!user || !selectedLesson) return;

    const percentage = Math.round((score / total) * 100);

    try {
      await saveQuizResult({
        userId: user.uid,
        lessonId: selectedLesson.id,
        languageId: languageId,
        score,
        totalQuestions: total,
        percentage,
        completedAt: new Date(),
      });
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  const handleQuizRetry = () => {
    setViewMode('quiz');
  };

  if (viewMode === 'quiz' && selectedLesson) {
    return (
      <>
        <button
          onClick={() => setViewMode('detail')}
          className="group flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 mb-12 transition-all duration-300 hover:gap-3"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Lesson
        </button>

        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Quiz: {selectedLesson.title}
          </h1>
          <p className="text-xl text-gray-600">
            Test your knowledge and track your progress
          </p>
        </div>

        <Quiz
          questions={quizQuestions}
          languageId={languageId}
          onComplete={handleQuizComplete}
          onRetry={handleQuizRetry}
        />
      </>
    );
  }

  if (viewMode === 'detail' && selectedLesson) {
    const currentCard = selectedLesson.content[cardIndex];
    const isLastCard = cardIndex === selectedLesson.content.length - 1;

    const getLanguageWord = () => {
      switch (languageId) {
        case 'kalenjin':
          return currentCard.kalenjin;
        case 'kikuyu':
          return currentCard.kikuyu;
        case 'luo':
          return currentCard.luo;
        default:
          return currentCard.kalenjin;
      }
    };

    const handleNext = () => {
      if (!isLastCard) {
        setCardIndex(cardIndex + 1);
      }
    };

    const handlePrevious = () => {
      if (cardIndex > 0) {
        setCardIndex(cardIndex - 1);
      }
    };

    return (
      <>
        <button
          onClick={() => setViewMode('grid')}
          className="group flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 mb-12 transition-all duration-300 hover:gap-3"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Lessons
        </button>

        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {selectedLesson.title}
          </h1>
          <p className="text-xl text-gray-600">
            {selectedLesson.description}
          </p>
        </div>

        <div className="flex items-center justify-center min-h-96">
          <div className="w-full max-w-3xl">
            <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 rounded-3xl shadow-2xl p-16 border border-gray-200/50 backdrop-blur">
              <div className="space-y-10">
                <div>
                  <p className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-4">
                    {getLanguageName(languageId)}
                  </p>
                  <p className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                    {getLanguageWord()}
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>

                <div>
                  <p className="text-sm font-bold text-teal-700 uppercase tracking-widest mb-4">
                    English
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-gray-800">
                    {currentCard.english}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={cardIndex === 0}
                className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Previous
              </button>

              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-bold text-gray-600">
                  {cardIndex + 1} / {selectedLesson.content.length}
                </span>
                <div className="flex gap-2">
                  {selectedLesson.content.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === cardIndex ? 'w-10 bg-gradient-to-r from-emerald-600 to-teal-600' : 'w-2.5 bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {isLastCard ? (
                <button
                  onClick={handleStartQuiz}
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105"
                >
                  Take Quiz
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105"
                >
                  Next
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>

            {isLastCard && (
              <div className="mt-10 bg-gradient-to-r from-white to-emerald-50/50 rounded-2xl p-8 border-2 border-emerald-200 shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-gray-900 mb-3">
                      Ready to test your knowledge?
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                      You've completed this lesson! Take the quiz to gauge your progress and reinforce what you've learned.
                    </p>
                    <button
                      onClick={handleStartQuiz}
                      className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105 inline-flex items-center gap-2"
                    >
                      Start Quiz
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 mb-12 transition-all duration-300 hover:gap-3"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Languages
      </button>

      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Learn {getLanguageName(languageId)}
        </h1>
        <p className="text-xl text-gray-600">
          Select a lesson to begin your journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {lessons.map((lesson, index) => (
          <button
            key={lesson.id}
            onClick={() => {
              setSelectedLesson(lesson);
              setCardIndex(0);
              setViewMode('detail');
            }}
            className="group bg-white rounded-3xl shadow-lg p-8 border border-gray-200/50 hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 text-left hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <CheckCircle2 className="w-6 h-6 text-gray-300 group-hover:text-emerald-500 transition-all duration-300" />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              {lesson.title}
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {lesson.description}
            </p>

            <div className="flex items-center gap-2 text-emerald-600 font-bold group-hover:gap-3 transition-all duration-300">
              Start Lesson
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
