import { db } from '../lib/firebase';
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import staticData from '../data/lessons.json';
import { seedFirestoreIfEmpty } from './seedService';

export interface Language {
  id: string;
  name: string;
  nativeSpelling: string;
  description: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
}

export interface LessonContent {
  id: string;
  lessonId: string;
  kalenjin: string;
  kikuyu: string;
  luo: string;
  kamba: string;
  luhya: string;
  gusii: string;
  somali: string;
  english: string;
  orderIndex: number;
}

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

export interface QuizResult {
  id?: string;
  userId: string;
  lessonId: string;
  languageId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: Date;
}

let seedPromise: Promise<void> | null = null;

function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = seedFirestoreIfEmpty();
  }
  return seedPromise;
}

export const getLanguages = async (): Promise<Language[]> => {
  await ensureSeeded();
  try {
    const snapshot = await getDocs(collection(db, 'languages'));
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Language[];
    }
  } catch (error) {
    console.error('Error fetching languages from Firestore:', error);
  }
  return staticData.languages as Language[];
};

export const getLessons = async (): Promise<Lesson[]> => {
  await ensureSeeded();
  try {
    const q = query(collection(db, 'lessons'), orderBy('orderIndex', 'asc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Lesson[];
    }
  } catch (error) {
    console.error('Error fetching lessons from Firestore:', error);
  }
  return (staticData.lessons as Lesson[]).sort((a, b) => a.orderIndex - b.orderIndex);
};

export const getLessonContent = async (lessonId: string): Promise<LessonContent[]> => {
  await ensureSeeded();
  try {
    const q = query(
      collection(db, 'lessonContent'),
      where('lessonId', '==', lessonId),
      orderBy('orderIndex', 'asc')
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as LessonContent[];
    }
  } catch (error) {
    console.error('Error fetching lesson content from Firestore:', error);
  }
  return (staticData.lessonContent as LessonContent[])
    .filter((c) => c.lessonId === lessonId)
    .sort((a, b) => a.orderIndex - b.orderIndex);
};

export const saveUserLanguageSelection = async (
  userId: string,
  languageId: string
): Promise<void> => {
  try {
    const docRef = doc(db, 'users', userId, 'languages', languageId);
    await setDoc(docRef, {
      languageId,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error saving language selection:', error);
  }
};

export const getUserLanguages = async (userId: string): Promise<string[]> => {
  try {
    const languagesRef = collection(db, 'users', userId, 'languages');
    const snapshot = await getDocs(languagesRef);
    return snapshot.docs.map((doc) => doc.data().languageId);
  } catch (error) {
    console.error('Error fetching user languages:', error);
    return [];
  }
};

export const saveUserProgress = async (
  userId: string,
  lessonId: string,
  completed: boolean
): Promise<void> => {
  try {
    const docRef = doc(db, 'users', userId, 'progress', lessonId);
    await setDoc(docRef, {
      lessonId,
      completed,
      completedAt: completed ? new Date() : null,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error saving user progress:', error);
  }
};

export const getUserProgress = async (userId: string): Promise<Record<string, boolean>> => {
  try {
    const progressRef = collection(db, 'users', userId, 'progress');
    const snapshot = await getDocs(progressRef);

    const progressMap: Record<string, boolean> = {};
    snapshot.docs.forEach((doc) => {
      progressMap[doc.data().lessonId] = doc.data().completed;
    });

    return progressMap;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return {};
  }
};

export const getQuizQuestions = async (lessonId: string): Promise<QuizQuestion[]> => {
  await ensureSeeded();
  try {
    const q = query(
      collection(db, 'quizQuestions'),
      where('lessonId', '==', lessonId),
      orderBy('orderIndex', 'asc')
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as QuizQuestion[];
    }
  } catch (error) {
    console.error('Error fetching quiz questions from Firestore:', error);
  }
  return (staticData.quizQuestions as QuizQuestion[])
    .filter((q) => q.lessonId === lessonId)
    .sort((a, b) => a.orderIndex - b.orderIndex);
};

export const saveQuizResult = async (result: QuizResult): Promise<void> => {
  try {
    const docRef = doc(collection(db, 'users', result.userId, 'quizResults'));
    await setDoc(docRef, {
      lessonId: result.lessonId,
      languageId: result.languageId,
      score: result.score,
      totalQuestions: result.totalQuestions,
      percentage: result.percentage,
      completedAt: result.completedAt,
    });
  } catch (error) {
    console.error('Error saving quiz result:', error);
  }
};

export const getQuizResults = async (userId: string, lessonId?: string): Promise<QuizResult[]> => {
  try {
    const resultsRef = collection(db, 'users', userId, 'quizResults');
    let q = query(resultsRef);

    if (lessonId) {
      q = query(resultsRef, where('lessonId', '==', lessonId));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      userId,
      ...doc.data(),
    })) as QuizResult[];
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    return [];
  }
};

export const getBestQuizScore = async (userId: string, lessonId: string): Promise<number> => {
  try {
    const results = await getQuizResults(userId, lessonId);
    if (results.length === 0) return 0;
    return Math.max(...results.map((r) => r.percentage));
  } catch (error) {
    console.error('Error fetching best quiz score:', error);
    return 0;
  }
};
