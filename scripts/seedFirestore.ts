import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const lessonsDataPath = resolve(process.cwd(), 'src/data/lessons.json');
const lessonsData = JSON.parse(readFileSync(lessonsDataPath, 'utf8'));

try {
  const serviceAccountPath = resolve(process.cwd(), 'serviceAccountKey.json');
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "lugha47"
  });
} catch (error) {
  console.error('❌ Error loading service account key.');
  console.error('Please follow the instructions in SEEDING_INSTRUCTIONS.md');
  console.error('\nQuick steps:');
  console.error('1. Go to Firebase Console → Project Settings → Service Accounts');
  console.error('2. Click "Generate new private key"');
  console.error('3. Save the file as "serviceAccountKey.json" in the project root');
  console.error('\nError details:', error instanceof Error ? error.message : error);
  process.exit(1);
}

const db = admin.firestore();

async function seedDatabase() {
  console.log('Starting database seed...');

  try {
    console.log('Seeding languages...');
    const languagesPromises = lessonsData.languages.map((language: any) =>
      db.collection('languages').doc(language.id).set(language)
    );
    await Promise.all(languagesPromises);
    console.log(`✓ Seeded ${lessonsData.languages.length} languages`);

    console.log('Seeding lessons...');
    const lessonsPromises = lessonsData.lessons.map((lesson: any) =>
      db.collection('lessons').doc(lesson.id).set(lesson)
    );
    await Promise.all(lessonsPromises);
    console.log(`✓ Seeded ${lessonsData.lessons.length} lessons`);

    console.log('Seeding lesson content...');
    let contentBatch = db.batch();
    let contentCount = 0;

    for (const content of lessonsData.lessonContent) {
      const contentRef = db.collection('lessonContent').doc(content.id);
      contentBatch.set(contentRef, content);
      contentCount++;

      if (contentCount % 500 === 0) {
        await contentBatch.commit();
        contentBatch = db.batch();
      }
    }

    if (contentCount % 500 !== 0) {
      await contentBatch.commit();
    }
    console.log(`✓ Seeded ${lessonsData.lessonContent.length} lesson content items`);

    if (lessonsData.quizQuestions && lessonsData.quizQuestions.length > 0) {
      console.log('Seeding quiz questions...');
      let quizBatch = db.batch();
      let quizCount = 0;

      for (const question of lessonsData.quizQuestions) {
        const questionRef = db.collection('quizQuestions').doc(question.id);
        quizBatch.set(questionRef, question);
        quizCount++;

        if (quizCount % 500 === 0) {
          await quizBatch.commit();
          quizBatch = db.batch();
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
    console.error('\nIf you see permission errors, check your Firestore security rules.');
    console.error('You may need to temporarily allow writes for seeding.');
    process.exit(1);
  }
}

seedDatabase();
