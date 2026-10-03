import { db } from '../lib/firebase';
import {
  collection,
  getDocs,
  writeBatch,
  doc,
} from 'firebase/firestore';
import staticData from '../data/lessons.json';

const SEED_FLAG_KEY = 'lugha47_seeded';

export async function seedFirestoreIfEmpty(): Promise<void> {
  if (sessionStorage.getItem(SEED_FLAG_KEY)) return;

  try {
    const languagesSnap = await getDocs(collection(db, 'languages'));
    if (!languagesSnap.empty) {
      sessionStorage.setItem(SEED_FLAG_KEY, '1');
      return;
    }

    console.log('Firestore is empty — seeding from static data...');

    const batch = writeBatch(db);

    for (const lang of staticData.languages) {
      batch.set(doc(db, 'languages', lang.id), lang);
    }

    for (const lesson of staticData.lessons) {
      batch.set(doc(db, 'lessons', lesson.id), lesson);
    }

    for (const content of staticData.lessonContent) {
      batch.set(doc(db, 'lessonContent', content.id), content);
    }

    for (const question of staticData.quizQuestions) {
      batch.set(doc(db, 'quizQuestions', question.id), question);
    }

    await batch.commit();
    sessionStorage.setItem(SEED_FLAG_KEY, '1');
    console.log('Firestore seeded successfully.');
  } catch (error) {
    console.error('Auto-seed failed:', error);
  }
}
