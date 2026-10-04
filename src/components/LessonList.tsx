import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { ScreenHeader } from './ui';

export interface LessonListLesson {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
}

interface LessonListProps {
  lessons: LessonListLesson[];
  onSelectLesson: (lessonId: string) => void;
  onBack: () => void;
  backLabel?: string;
  title: string;
  subtitle?: string;
  completedLessonIds?: Set<string>;
  bestScores?: Record<string, number>;
}

export function LessonList({
  lessons,
  onSelectLesson,
  onBack,
  backLabel = 'Back',
  title,
  subtitle,
  completedLessonIds = new Set(),
  bestScores = {},
}: LessonListProps) {
  const sorted = [...lessons].sort((a, b) => a.orderIndex - b.orderIndex);
  const nextLessonId = sorted.find((l) => !completedLessonIds.has(l.id))?.id;

  return (
    <div className="screen-enter">
      <ScreenHeader title={title} subtitle={subtitle} onBack={onBack} backLabel={backLabel} />

      <div className="max-w-2xl mx-auto space-y-3">
        {sorted.map((lesson, index) => {
          const isCompleted = completedLessonIds.has(lesson.id);
          const isNext = lesson.id === nextLessonId;
          const score = bestScores[lesson.id];

          return (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className={`card card-hover w-full flex items-center gap-4 p-4 text-left ${
                isNext ? 'border-sun-400 ring-2 ring-sun-200' : ''
              }`}
            >
              {/* Number circle / check */}
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <div className="w-11 h-11 rounded-full bg-forest-500 flex items-center justify-center shadow-sm">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-xl text-white" />
                  </div>
                ) : (
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg border-2 ${
                      isNext
                        ? 'bg-sun-100 border-sun-400 text-sun-700'
                        : 'bg-gray-50 border-gray-300 text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-ink-900 text-base md:text-lg leading-tight">
                  {lesson.title}
                </h3>
                <p className="text-ink-500 text-sm leading-snug mt-0.5 truncate">
                  {lesson.description}
                </p>
              </div>

              {/* Score + arrow */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {score !== undefined && score > 0 && (
                  <div className="flex items-center gap-1 text-sun-600 font-bold text-sm">
                    <FontAwesomeIcon icon={faStar} className="text-sm text-sun-400" />
                    {score}%
                  </div>
                )}
                {isNext && (
                  <span className="hidden sm:inline text-xs font-bold text-sun-600 bg-sun-50 px-2 py-1 rounded-full border border-sun-200">
                    Next up
                  </span>
                )}
                <FontAwesomeIcon icon={faArrowRight} className="text-base text-gray-400" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
