# Firebase Seeding Instructions

## Prerequisites

Before you can seed your Firestore database, you need to set up Firebase Admin SDK credentials.

## Step 1: Create a Service Account Key

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **lugha47**
3. Click the gear icon (⚙️) next to "Project Overview" and select **Project settings**
4. Go to the **Service accounts** tab
5. Click **Generate new private key**
6. Click **Generate key** to download the JSON file
7. Save the downloaded file as `serviceAccountKey.json` in the root of this project

## Step 2: Verify File Location

Make sure `serviceAccountKey.json` is in the project root directory:

```
project/
├── serviceAccountKey.json  ← Should be here
├── scripts/
│   └── seedFirestore.ts
├── src/
└── package.json
```

## Step 3: Run the Seed Script

```bash
npm run seed
```

## Expected Output

```
Starting database seed...
Seeding languages...
✓ Seeded 3 languages
Seeding lessons...
✓ Seeded 3 lessons
Seeding lesson content...
✓ Seeded 17 lesson content items
Seeding quiz questions...
✓ Seeded 21 quiz questions

✅ Database seeded successfully!
```

## Security Notes

- The `serviceAccountKey.json` file is already added to `.gitignore` and will NOT be committed to version control
- Never share or commit this file as it contains sensitive credentials
- Keep this file secure and do not expose it publicly

## Troubleshooting

### Error: ENOENT: no such file or directory

This means the service account key file is missing. Follow Step 1 to create it.

### Error: Permission denied

Make sure your Firebase security rules allow writes. During seeding, you may need to temporarily adjust the rules.

### Error: Could not load default credentials

This means the Firebase Admin SDK cannot find your credentials. Make sure `serviceAccountKey.json` is in the correct location.
