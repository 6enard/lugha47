// scripts/seedFirestore.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, writeBatch } from 'firebase/firestore';

// Use ESM-compatible JSON import
import lessonsData from '../src/data/lessons.json' assert { type: 'json' };

const firebaseConfig = {
  apiKey: "AIzaSyBZ2sW5qKVZw7V7aqR12W4kxAyuYOXHJ6I",
  authDomain: "lugha47.firebaseapp.com",
  projectId: "lugha47",
  storageBucket: "lugha47.firebasestorage.app",
  messagingSenderId: "470488484415",
  appId: "1:470488484415:web:17841b6049973cfd89068a",
  measurementId: "G-VE1GLG2S2G"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedDatabase() {
  console.log('Starting database seed...');

  try {
    // ------------------------
    // Seed languages
    // ------------------------
    console.log('Seeding languages...');
    const languagesPromises = lessonsData.languages.map((language: any) =>
      setDoc(doc(db, 'languages', language.id), language)
    );
    await Promise.all(languagesPromises);
    console.log(`✓ Seeded ${lessonsData.languages.length} languages`);

    // ------------------------
    // Seed lessons
    // ------------------------
    console.log('Seeding lessons...');
    const lessonsPromises = lessonsData.lessons.map((lesson: any) =>
      setDoc(doc(db, 'lessons', lesson.id), lesson)
    );
    await Promise.all(lessonsPromises);
    console.log(`✓ Seeded ${lessonsData.lessons.length} lessons`);

    // ------------------------
    // Seed lesson content (batched)
    // ------------------------
    console.log('Seeding lesson content...');
    let contentBatch = writeBatch(db);
    let contentCount = 0;

    for (const content of lessonsData.lessonContent) {
      const contentRef = doc(db, 'lessonContent', content.id);
      contentBatch.set(contentRef, content);
      contentCount++;

      if (contentCount % 500 === 0) {
        await contentBatch.commit();
        contentBatch = writeBatch(db);
      }
    }

    if (contentCount % 500 !== 0) {
      await contentBatch.commit();
    }
    console.log(`✓ Seeded ${lessonsData.lessonContent.length} lesson content items`);

    // ------------------------
    // Seed quiz questions (batched)
    // ------------------------
    if (lessonsData.quizQuestions && lessonsData.quizQuestions.length > 0) {
      console.log('Seeding quiz questions...');
      let quizBatch = writeBatch(db);
      let quizCount = 0;

      for (const question of lessonsData.quizQuestions) {
        const questionRef = doc(db, 'quizQuestions', question.id);
        quizBatch.set(questionRef, question);
        quizCount++;

        if (quizCount % 500 === 0) {
          await quizBatch.commit();
          quizBatch = writeBatch(db);
        }
      }

      if (quizCount % 500 !== 0) {
        await quizBatch.commit();
      }
      console.log(`✓ Seeded ${lessonsData.quizQuestions.length} quiz questions`);
    }

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();