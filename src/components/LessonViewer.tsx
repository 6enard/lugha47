import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Target, MessageSquare, BookOpen } from 'lucide-react';
import { getLessons, getLessonContent, getQuizQuestions, saveQuizResult, saveUserProgress, getBestQuizScore, Lesson, LessonContent, QuizQuestion } from '../services/dataService';
import { Quiz } from './Quiz';
import { SentenceBuilder } from './SentenceBuilder';
import { LessonList } from './LessonList';
import { ScreenHeader } from './ui';
import { getExercisesForLesson, SentenceExercise } from '../data/sentences';
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
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'sentences' | 'quiz'>('list');
  const [cardIndex, setCardIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [sentenceExercises, setSentenceExercises] = useState<SentenceExercise[]>([]);
  const [bestScores, setBestScores] = useState<Record<string, number>>({});

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

        if (user) {
          const scores: Record<string, number> = {};
          await Promise.all(
            lessonsWithContent.map(async (lesson) => {
              const score = await getBestQuizScore(user.uid, lesson.id);
              if (score > 0) scores[lesson.id] = score;
            })
          );
          setBestScores(scores);
        }
      } catch (error) {
        console.error('Error loading lessons:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLessons();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-forest-100 border-t-forest-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const getLanguageName = (lang: string) => {
    const names: Record<string, string> = {
      kalenjin: 'Kalenjin', kikuyu: 'Kikuyu', luo: 'Luo',
      kamba: 'Kamba', luhya: 'Luhya', gusii: 'Gusii', somali: 'Somali',
    };
    return names[lang] || lang;
  };

  const handleSelectLesson = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
      setCardIndex(0);
      setViewMode('detail');
    }
  };

  const handleStartSentences = () => {
    if (!selectedLesson) return;
    const exercises = getExercisesForLesson(selectedLesson.id);
    setSentenceExercises(exercises);
    setViewMode('sentences');
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
        userId: user.uid, lessonId: selectedLesson.id, languageId,
        score, totalQuestions: total, percentage, completedAt: new Date(),
      });
      await saveUserProgress(user.uid, selectedLesson.id, true);
      setBestScores((prev) => ({
        ...prev,
        [selectedLesson.id]: Math.max(prev[selectedLesson.id] || 0, percentage),
      }));
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  if (viewMode === 'sentences' && selectedLesson) {
    if (sentenceExercises.length === 0) {
      handleStartQuiz();
      return null;
    }
    return (
      <SentenceBuilder
        exercises={sentenceExercises}
        languageId={languageId}
        onComplete={handleStartQuiz}
        onBack={() => setViewMode('detail')}
      />
    );
  }

  if (viewMode === 'quiz' && selectedLesson) {
    return (
      <div className="screen-enter">
        <ScreenHeader
          title={`Quiz: ${selectedLesson.title}`}
          subtitle="Test your knowledge and track your progress"
          onBack={() => setViewMode('detail')}
          backLabel="Back to Lesson"
          icon={<Target className="w-7 h-7 text-forest-600" />}
        />
        <Quiz
          questions={quizQuestions}
          languageId={languageId}
          onComplete={handleQuizComplete}
          onRetry={() => setViewMode('quiz')}
          onBackToLessons={() => setViewMode('list')}
        />
      </div>
    );
  }

  if (viewMode === 'detail' && selectedLesson) {
    const currentCard = selectedLesson.content[cardIndex];
    const isLastCard = cardIndex === selectedLesson.content.length - 1;

    const getLanguageWord = () => {
      switch (languageId) {
        case 'kalenjin': return currentCard.kalenjin;
        case 'kikuyu': return currentCard.kikuyu;
        case 'luo': return currentCard.luo;
        case 'kamba': return currentCard.kamba;
        case 'luhya': return currentCard.luhya;
        case 'gusii': return currentCard.gusii;
        case 'somali': return currentCard.somali;
        default: return currentCard.kalenjin;
      }
    };

    return (
      <div className="screen-enter max-w-2xl mx-auto">
        <ScreenHeader
          title={selectedLesson.title}
          subtitle={selectedLesson.description}
          onBack={() => setViewMode('list')}
          backLabel="Back to Lessons"
          icon={<BookOpen className="w-7 h-7 text-forest-600" />}
        />

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          <span className="text-sm font-semibold text-ink-400 mr-3">
            {cardIndex + 1} / {selectedLesson.content.length}
          </span>
          {selectedLesson.content.map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === cardIndex ? 'w-8 bg-forest-500' : idx < cardIndex ? 'w-2.5 bg-forest-400' : 'w-2.5 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Flashcard */}
        <div className="card p-8 md:p-12">
          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold text-forest-600 uppercase tracking-widest mb-3">
                {getLanguageName(languageId)}
              </p>
              <p className="text-4xl md:text-5xl font-bold text-ink-900 leading-tight">
                {getLanguageWord()}
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            <div>
              <p className="text-xs font-bold text-lake-600 uppercase tracking-widest mb-3">
                English
              </p>
              <p className="text-3xl md:text-4xl font-bold text-ink-700">
                {currentCard.english}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={() => cardIndex > 0 && setCardIndex(cardIndex - 1)}
            disabled={cardIndex === 0}
            className="btn btn-secondary px-5 py-3 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {isLastCard ? (
            <button
              onClick={handleStartSentences}
              className="btn btn-primary px-6 py-3 flex items-center gap-2"
            >
              Build Sentences
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setCardIndex(cardIndex + 1)}
              className="btn btn-primary px-6 py-3 flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Last card CTA */}
        {isLastCard && (
          <div className="mt-6 card p-6 border-sun-200 bg-sun-50/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sun-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-ink-900" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-ink-900 mb-1">
                  Ready to build sentences?
                </p>
                <p className="text-ink-500 mb-4 text-sm leading-relaxed">
                  You've learned the words — now put them together before taking the quiz.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleStartSentences}
                    className="btn btn-primary px-6 py-3 flex items-center justify-center gap-2"
                  >
                    Build Sentences
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleStartQuiz}
                    className="btn btn-secondary px-6 py-3 flex items-center justify-center gap-2"
                  >
                    <Target className="w-5 h-5" />
                    Skip to Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // List view — uses LessonList
  return (
    <LessonList
      lessons={lessons}
      onSelectLesson={handleSelectLesson}
      onBack={onBack}
      backLabel="Back"
      title={`Learn ${getLanguageName(languageId)}`}
      subtitle="Select a lesson to begin your journey"
      bestScores={bestScores}
    />
  );
}
