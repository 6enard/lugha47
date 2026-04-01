# Firestore Migration Guide

Your app now uses Firestore instead of the local JSON file for lessons and quiz data.

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firestore Rules

Go to [Firebase Console](https://console.firebase.google.com/project/lugha47/firestore/rules) and deploy the security rules from `firestore.rules`.

Or copy the rules manually:
- Navigate to Firebase Console > Firestore Database > Rules
- Copy the contents of `firestore.rules` and publish

### 3. Create Firestore Indexes

Go to [Firebase Console](https://console.firebase.google.com/project/lugha47/firestore/indexes) and create the composite indexes:

**Index 1: lessonContent**
- Collection: `lessonContent`
- Fields:
  - `lessonId` (Ascending)
  - `orderIndex` (Ascending)

**Index 2: quizQuestions**
- Collection: `quizQuestions`
- Fields:
  - `lessonId` (Ascending)
  - `orderIndex` (Ascending)

Or use the Firebase CLI:
```bash
firebase deploy --only firestore:indexes
```

### 4. Seed the Database

Run the seed script to populate Firestore with your lesson data:

```bash
npm run seed
```

This will create the following collections:
- `languages` - Available languages (Kalenjin, Kikuyu, Luo)
- `lessons` - All lessons
- `lessonContent` - Lesson vocabulary and phrases
- `quizQuestions` - Quiz questions for each lesson

## Collections Structure

### languages
```
{
  id: string
  name: string
  nativeSpelling: string
  description: string
}
```

### lessons
```
{
  id: string
  title: string
  description: string
  orderIndex: number
}
```

### lessonContent
```
{
  id: string
  lessonId: string
  kalenjin: string
  kikuyu: string
  luo: string
  english: string
  orderIndex: number
}
```

### quizQuestions
```
{
  id: string
  lessonId: string
  question: string
  correctAnswer: string
  options: {
    kalenjin: string
    kikuyu: string
    luo: string
  }
  orderIndex: number
}
```

## User Data Collections

These are automatically created when users interact with the app:

### users/{userId}/languages
Tracks which languages a user has selected

### users/{userId}/progress
Tracks lesson completion progress

### users/{userId}/quizResults
Stores quiz scores and results

## Security

The Firestore rules ensure:
- Anyone can read languages, lessons, content, and questions
- Only the database owner can write to core content collections
- Users can only read and write their own user data
- Authentication is required for user-specific operations
