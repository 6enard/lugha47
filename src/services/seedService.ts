import { db } from '../lib/firebase';
import {
  collection,
  getDocs,
  writeBatch,
  doc,
} from 'firebase/firestore';
import staticData from '../data/lessons.json';

const SEED_FLAG_KEY = 'lugha47_seeded';
const SEED_VERSION_KEY = 'lugha47_seed_version';
const CURRENT_SEED_VERSION = '2';

export async function seedFirestoreIfEmpty(): Promise<void> {
  if (sessionStorage.getItem(SEED_FLAG_KEY) && sessionStorage.getItem(SEED_VERSION_KEY) === CURRENT_SEED_VERSION) {
    return;
  }

  try {
    const languagesSnap = await getDocs(collection(db, 'languages'));
    const isNewSeed = sessionStorage.getItem(SEED_VERSION_KEY) !== CURRENT_SEED_VERSION;

    if (languagesSnap.empty || isNewSeed) {
      console.log(isNewSeed ? 'Re-syncing Firestore with updated data...' : 'Firestore is empty — seeding from static data...');

      // Write in batches of 450 (Firestore batch limit is 500)
      const allItems = [
        ...staticData.languages.map((lang) => ({ ref: doc(db, 'languages', lang.id), data: lang })),
        ...staticData.lessons.map((lesson) => ({ ref: doc(db, 'lessons', lesson.id), data: lesson })),
        ...staticData.lessonContent.map((content) => ({ ref: doc(db, 'lessonContent', content.id), data: content })),
        ...staticData.quizQuestions.map((question) => ({ ref: doc(db, 'quizQuestions', question.id), data: question })),
      ];

      for (let i = 0; i < allItems.length; i += 450) {
        const batch = writeBatch(db);
        const chunk = allItems.slice(i, i + 450);
        for (const item of chunk) {
          batch.set(item.ref, item.data, { merge: true });
        }
        await batch.commit();
      }

      sessionStorage.setItem(SEED_FLAG_KEY, '1');
      sessionStorage.setItem(SEED_VERSION_KEY, CURRENT_SEED_VERSION);
      console.log('Firestore synced successfully.');
      return;
    }

    sessionStorage.setItem(SEED_FLAG_KEY, '1');
    sessionStorage.setItem(SEED_VERSION_KEY, CURRENT_SEED_VERSION);
  } catch (error) {
    console.error('Auto-seed failed:', error);
  }
}
