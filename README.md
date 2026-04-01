# LUGHA47 - Kenyan Language Learning Platform

A modern web application for learning and preserving Kenyan indigenous languages including Kalenjin, Kikuyu, and Luo.

## Features

- Interactive language lessons with flashcards
- Quiz system to test your knowledge
- Progress tracking for each language
- User authentication and personalized learning
- Firestore database for scalable data storage

## Technologies

- React with TypeScript
- Firebase (Authentication & Firestore)
- Tailwind CSS
- Vite

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Firebase Service Account (For Seeding)

Before you can seed the database, you need to create a Firebase service account key:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **lugha47**
3. Click the gear icon next to "Project Overview" → **Project settings**
4. Go to the **Service accounts** tab
5. Click **Generate new private key**
6. Save the downloaded file as `serviceAccountKey.json` in the project root

### 3. Seed the Database

```bash
npm run seed
```

This will populate your Firestore database with:
- 3 languages (Kalenjin, Kikuyu, Luo)
- 3 lessons (Basic Greetings, Numbers 1-10, Family Members)
- 17 lesson content items (vocabulary and phrases)
- 21 quiz questions

### 4. Update Firestore Security Rules

Go to your [Firestore Rules](https://console.firebase.google.com/project/lugha47/firestore/rules) and ensure they match the rules in `firestore.rules`.

### 5. Create Firestore Indexes

Create the required composite indexes:

**Option A: Automatic**
When you first run the app, Firebase will show links to create required indexes automatically.

**Option B: Manual**
1. Go to [Firestore Indexes](https://console.firebase.google.com/project/lugha47/firestore/indexes)
2. Create these indexes:
   - Collection: `lessonContent` | Fields: `lessonId` (Ascending), `orderIndex` (Ascending)
   - Collection: `quizQuestions` | Fields: `lessonId` (Ascending), `orderIndex` (Ascending)

## Development

Start the development server:

```bash
npm run dev
```

## Database Structure

### Core Collections (Read by all, write restricted)

- `languages` - Available languages
- `lessons` - All lessons
- `lessonContent` - Vocabulary and phrases for each lesson
- `quizQuestions` - Quiz questions for each lesson

### User Collections (Per-user data)

- `users/{userId}/languages` - Languages selected by user
- `users/{userId}/progress` - Lesson completion progress
- `users/{userId}/quizResults` - Quiz scores and results

## Security

The application uses Firebase Authentication and Firestore security rules to:
- Allow public read access to language content
- Restrict writes to core collections
- Ensure users can only access their own data
- Require authentication for user-specific operations

## Troubleshooting

### Seeding Errors

If you get errors when running `npm run seed`:
- Make sure `serviceAccountKey.json` exists in the project root
- Verify your Firebase security rules allow writes
- Check the Firebase Console for any quota limits

### Index Errors

If you see index-related errors in the browser console:
- Click the provided link to create the index automatically
- Or manually create indexes as described in Step 5 above

## License

Private project for language preservation.
