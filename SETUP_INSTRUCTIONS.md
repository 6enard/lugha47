# Setup Instructions - Migrate to Firestore

## Step 1: Update Firestore Security Rules

Go to your Firebase Console and update the security rules:

1. Visit: https://console.firebase.google.com/project/lugha47/firestore/rules
2. Replace the existing rules with the contents from `firestore.rules`
3. Click "Publish"

## Step 2: Create Firestore Indexes

You need to create composite indexes for efficient queries:

**Option A: Automatic (when you run the app)**
When you first load the app after deployment, Firebase will show you links to create the required indexes automatically. Click those links.

**Option B: Manual Creation**

1. Visit: https://console.firebase.google.com/project/lugha47/firestore/indexes

2. Create Index 1:
   - Collection ID: `lessonContent`
   - Field: `lessonId` - Ascending
   - Field: `orderIndex` - Ascending
   - Query Scope: Collection

3. Create Index 2:
   - Collection ID: `quizQuestions`
   - Field: `lessonId` - Ascending
   - Field: `orderIndex` - Ascending
   - Query Scope: Collection

## Step 3: Run the Seed Script

After updating the rules to allow writes (temporarily), run:

```bash
npm run seed
```

## Step 4: Restore Production Rules

After seeding is complete, update your Firestore rules to prevent writes to core collections (recommended for production).

## What Changed

Your app now uses Firestore for all lesson data instead of the local JSON file:

- Languages (Kalenjin, Kikuyu, Luo)
- Lessons (Basic Greetings, Numbers, Family Members)
- Lesson content (vocabulary and phrases)
- Quiz questions

All user data (progress, quiz results, language selections) is stored in Firestore under their user ID.
