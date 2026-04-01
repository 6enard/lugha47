import admin from 'firebase-admin';
import lessonsData from '../src/data/lessons.json\' assert { type: 'json' };

admin.initializeApp({
  projectId: "lugha47",
});

const db = admin.firestore();

async function seedDatabase() {
  console.log('Starting database seed...');

  try {
    console.log('Seeding languages...');
    for (const language of lessonsData.languages) {
      await db.collection('languages').doc(language.id).set(language);
    }
    console.log(`✓ Seeded ${lessonsData.languages.length} languages`);

    console.log('Seeding lessons...');
    for (const lesson of lessonsData.lessons) {
      await db.collection('lessons').doc(lesson.id).set(lesson);
    }
    console.log(`✓ Seeded ${lessonsData.lessons.length} lessons`);

    console.log('Seeding lesson content...');
    for (const content of lessonsData.lessonContent) {
      await db.collection('lessonContent').doc(content.id).set(content);
    }
    console.log(`✓ Seeded ${lessonsData.lessonContent.length} lesson content items`);

    console.log('Seeding quiz questions...');
    const quizData = lessonsData as any;
    if (quizData.quizQuestions && quizData.quizQuestions.length > 0) {
      for (const question of quizData.quizQuestions) {
        await db.collection('quizQuestions').doc(question.id).set(question);
      }
      console.log(`✓ Seeded ${quizData.quizQuestions.length} quiz questions`);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('You can now use Firestore data in your application.');
    await admin.app().delete();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
