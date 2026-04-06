# LUGHA47 - Application Walkthrough

A step-by-step visual guide showing the complete user journey from login to completing quizzes.

---

## 1. ENTRY POINT - Login Page

### URL: `/login`
### Access: Public (unauthenticated users)

```
┌─────────────────────────────────────────┐
│                                         │
│         LUGHA47 LOGO                    │
│        (lughalogo.png)                  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    LOGIN TO YOUR ACCOUNT                │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Email Address                   │   │
│  │ [____________________________]   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Password                        │   │
│  │ [____________________________]   │   │
│  └─────────────────────────────────┘   │
│                                         │
│        [   SIGN IN   ]                  │
│                                         │
│  Don't have an account? → SIGN UP       │
│                                         │
└─────────────────────────────────────────┘

FUNCTIONALITY:
• Email/password validation
• Error messages for invalid credentials
• Loading spinner during authentication
• Redirect to signup for new users
• Success → Navigate to Home page
```

### Error Scenarios

```
❌ User not found
   Message: "No account found with this email"
   Action: User directed to Signup

❌ Wrong password
   Message: "Incorrect password"
   Action: User can retry

❌ Invalid email format
   Message: "Please enter a valid email"
   Action: User corrects input
```

---

## 2. SIGNUP PAGE (Alternative Entry)

### URL: `/signup`
### Access: Public (unauthenticated users)

```
┌─────────────────────────────────────────┐
│                                         │
│         LUGHA47 LOGO                    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│    CREATE YOUR ACCOUNT                  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Email Address                   │   │
│  │ [____________________________]   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Password (min 6 characters)     │   │
│  │ [____________________________]   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Confirm Password                │   │
│  │ [____________________________]   │   │
│  └─────────────────────────────────┘   │
│                                         │
│      [   SIGN UP   ]                    │
│                                         │
│  Already have an account? → SIGN IN     │
│                                         │
└─────────────────────────────────────────┘

VALIDATION:
✓ Email format validation
✓ Password minimum 6 characters
✓ Passwords must match
✓ Real-time feedback on errors

SUCCESS:
→ User created in Firebase Auth
→ User document created in Firestore
→ Automatic login
→ Navigate to Home page
```

---

## 3. HOME PAGE - DASHBOARD (First Visit After Login)

### URL: `/`
### Access: Protected (authenticated users only)

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]  Lugha47    [Language]    user@email.com  [✕]   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ╔════════════════════════════════════════════════╗   │
│  ║                                                ║   │
│  ║  🌍 PRESERVE YOUR HERITAGE 🌍                 ║   │
│  ║                                                ║   │
│  ║  Learn Kalenjin, Kikuyu, and Luo              ║   │
│  ║  Keep your language alive                     ║   │
│  ║                                                ║   │
│  ║        [  SELECT A LANGUAGE  ]                ║   │
│  ║                                                ║   │
│  ╚════════════════════════════════════════════════╝   │
│                                                         │
└─────────────────────────────────────────────────────────┘

HEADER NAVIGATION:
┌──────────────────────────────────────────────────────────┐
│ Logo (clickable - returns to dashboard)                  │
│ App Title: "Lugha47"                                     │
│ Language Selector Component                              │
│ User Email Display                                       │
│ Logout Button (with error handling)                      │
└──────────────────────────────────────────────────────────┘

USER ACTIONS:
→ Click "SELECT A LANGUAGE" button
→ Transitions to Languages View
→ Header stays fixed during scrolling
```

---

## 4. HOME PAGE - LANGUAGES VIEW

### View: Languages Selector
### State: `view = 'languages'`

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]  Lugha47              user@email.com  [✕]       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              CHOOSE YOUR LANGUAGE                       │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   🇰🇪         │  │   🇰🇪         │  │   🇰🇪         │ │
│  │  KALENJIN    │  │  KIKUYU      │  │    LUO       │ │
│  │              │  │              │  │              │ │
│  │  Kalenjin    │  │  Gĩkũyũ      │  │  Dholuo      │ │
│  │              │  │              │  │              │ │
│  │  Learn the   │  │  Discover    │  │  Master      │ │
│  │  language of │  │  the Kikuyu  │  │  the Luo     │ │
│  │  the Kalenjin│  │  language    │  │  language    │ │
│  │  community   │  │  and culture │  │              │ │
│  │              │  │              │  │              │ │
│  │  [SELECT]    │  │  [SELECT]    │  │  [SELECT]    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                         │
│                    [  ← BACK  ]                         │
│                                                         │
└─────────────────────────────────────────────────────────┘

CARD LAYOUT:
• Grid: 1 column (mobile) → 2-3 columns (desktop)
• Each card shows:
  - Language flag emoji
  - Language name in English
  - Native spelling
  - Description
  - SELECT button

USER ACTION:
→ Click [SELECT] on any language card
→ languageId stored in component state
→ Transitions to Lessons View
→ Language content loaded from Firestore
```

### Data Flow

```
User clicks [SELECT] on language
        ↓
languageId set (e.g., "kikuyu")
        ↓
view changed to "lessons"
        ↓
LessonViewer component renders with languageId prop
        ↓
Component queries Firestore for lessons
        ↓
Firestore: collection('lessons') → orderBy('orderIndex')
        ↓
Lessons displayed in grid view
```

---

## 5. HOME PAGE - LESSONS VIEW

### View: LessonViewer (Grid Mode)
### State: `view = 'lessons'` + `selectedLanguage = 'kikuyu'`

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]  Lugha47              user@email.com  [✕]       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│        LESSONS FOR KIKUYU (Gĩkũyũ)                     │
│                                                         │
│  ┌─────────────────────────────┐  ┌──────────────────┐│
│  │  Lesson 1                   │  │  Lesson 2        ││
│  │                             │  │                  ││
│  │  📚 BASIC GREETINGS         │  │  📊 NUMBERS 1-10 ││
│  │                             │  │                  ││
│  │  Learn common greetings     │  │  Master counting ││
│  │  and introductions          │  │  from one to ten ││
│  │                             │  │                  ││
│  │      [  START  ]            │  │    [  START  ]   ││
│  └─────────────────────────────┘  └──────────────────┘│
│                                                         │
│  ┌─────────────────────────────┐                       │
│  │  Lesson 3                   │                       │
│  │                             │                       │
│  │  👨‍👩‍👧 FAMILY MEMBERS          │                       │
│  │                             │                       │
│  │  Learn words for family     │                       │
│  │  relationships              │                       │
│  │                             │                       │
│  │      [  START  ]            │                       │
│  └─────────────────────────────┘                       │
│                                                         │
│  ┌──────────────────────────────────────────────────┐ │
│  │              [  ← BACK  ]                        │ │
│  └──────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘

LESSON CARDS DISPLAY:
┌────────────────────────┐
│   Icon + Title         │
│   Description          │
│   [START] Button       │
└────────────────────────┘

DATA SOURCE:
Firestore collection('lessons')
  ├── lesson-1: { title: "Basic Greetings", ... }
  ├── lesson-2: { title: "Numbers 1-10", ... }
  └── lesson-3: { title: "Family Members", ... }

USER ACTION:
→ Click [START] on any lesson card
→ selectedLesson set in state
→ Transitions to Content View (flashcards)
```

---

## 6. LESSON CONTENT - FLASHCARD VIEW

### View: LessonViewer (Detail Mode)
### State: `displayMode = 'content'` + `selectedLesson = 'lesson-1'`

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]  Lugha47              user@email.com  [✕]       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│        BASIC GREETINGS - KIKUYU                         │
│                                                         │
│  ╔═════════════════════════════════════════════════╗   │
│  ║                                                 ║   │
│  ║        WORD IN KIKUYU                           ║   │
│  ║                                                 ║   │
│  ║            Wĩ mwega                             ║   │
│  ║         (Large, Bold Text)                      ║   │
│  ║                                                 ║   │
│  ║        ─────────────────────────────            ║   │
│  ║                                                 ║   │
│  ║        ENGLISH TRANSLATION                      ║   │
│  ║                                                 ║   │
│  ║            Hello / How are you?                 ║   │
│  ║         (Gray, Medium Text)                     ║   │
│  ║                                                 ║   │
│  ╚═════════════════════════════════════════════════╝   │
│                                                         │
│         [← Previous]  [1 / 4]  [Next →]                │
│                                                         │
│              Progress: ████░░░░  (4 cards)             │
│                                                         │
│          [  TAKE QUIZ WHEN READY  ]                    │
│                                                         │
│                  [← Back to Lessons]                    │
│                                                         │
└─────────────────────────────────────────────────────────┘

FLASHCARD LOGIC:
┌─────────────────────────────────────────┐
│ Card Structure:                         │
│                                         │
│ Current card from lessonContent:        │
│ {                                       │
│   id: "content-2",                      │
│   lessonId: "lesson-1",                 │
│   kalenjin: "Misoi",                    │
│   kikuyu: "Ũhoro waku",                 │
│   luo: "Nadi",                          │
│   english: "Hello / How are you?",      │
│   orderIndex: 2                         │
│ }                                       │
│                                         │
│ Display logic:                          │
│ if (languageId === 'kikuyu') {          │
│   show: "Ũhoro waku"                    │
│ }                                       │
└─────────────────────────────────────────┘

NAVIGATION:
[Previous] Button:
  → Decrement currentCardIndex
  → Show previous card
  → Disabled on first card

[Next →] Button:
  → Increment currentCardIndex
  → Show next card
  → Disabled on last card

Progress Indicator:
  Shows: "X / Total" (e.g., "2 / 4")
  Shows: Visual bar with filled/empty sections

QUIZ BUTTON:
  Enabled: Only when user is on last card
  Click: Transitions to Quiz View
  Saves: Cards reviewed in session
```

### Example Card Sequence (Lesson 1 - Basic Greetings)

```
CARD 1/4:
  Kikuyu: "Wĩ mwega"
  English: "Good morning"

CARD 2/4:
  Kikuyu: "Ũhoro waku"
  English: "Hello / How are you?"

CARD 3/4:
  Kikuyu: "Nĩ wega"
  English: "Thank you / I'm fine"

CARD 4/4:
  Kikuyu: "Tiguo wega"
  English: "Goodbye"
  [TAKE QUIZ WHEN READY] → Button appears here
```

---

## 7. QUIZ VIEW

### View: Quiz Component
### State: `displayMode = 'quiz'` + Quiz in progress

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]  Lugha47              user@email.com  [✕]       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              QUIZ: BASIC GREETINGS                      │
│                                                         │
│        Progress: ████░░░░░  (2 / 4 questions)           │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│     QUESTION 2:                                         │
│                                                         │
│     "Hello / How are you?"                              │
│                                                         │
│     Which is the KIKUYU translation?                    │
│                                                         │
│     ┌─────────────────────────────────┐                │
│     │  A) Misoi                       │  (Kalenjin)    │
│     └─────────────────────────────────┘                │
│                                                         │
│     ┌─────────────────────────────────┐                │
│     │  B) Ũhoro waku     ✓            │  (Kikuyu)      │
│     └─────────────────────────────────┘                │
│           ↑ CORRECT (shown in green)                    │
│                                                         │
│     ┌─────────────────────────────────┐                │
│     │  C) Nadi                        │  (Luo)         │
│     └─────────────────────────────────┘                │
│                                                         │
│              [  NEXT →  ]                               │
│                                                         │
└─────────────────────────────────────────────────────────┘

QUIZ FLOW:
1. Question displays (English text)
2. User sees 3 options (one in each language)
3. Correct answer = word matching selected language
4. User clicks option
5. Visual feedback:
   - Correct: Green background + ✓ checkmark
   - Incorrect: Red background + ✗ X mark
6. Disabled options: Can't change answer
7. Next button appears
8. After all questions → Results screen

SCORING LOGIC:
correctAnswers = 0
for each question answered:
  if selectedOption matches languageId:
    correctAnswers++

percentage = (correctAnswers / totalQuestions) * 100
```

### Quiz Example (Lesson 2 - Numbers)

```
QUESTION 1:
Q: "One"
A) Agenge (Kalenjin)
B) Ĩmwe (Kikuyu) ✓ [if language = kikuyu]
C) Achiel (Luo)

QUESTION 2:
Q: "Two"
A) Oeng (Kalenjin)
B) Igĩrĩ (Kikuyu) ✓ [if language = kikuyu]
C) Ariyo (Luo)

QUESTION 3:
Q: "Three"
A) Somok (Kalenjin)
B) Ithatũ (Kikuyu) ✓ [if language = kikuyu]
C) Adek (Luo)

QUESTION 4:
Q: "Four"
A) Angwan (Kalenjin)
B) Inya (Kikuyu) ✓ [if language = kikuyu]
C) Ang'wen (Luo)
```

---

## 8. QUIZ RESULTS SCREEN

### View: Quiz Component (Results Mode)
### State: Quiz completed + Results displayed

```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]  Lugha47              user@email.com  [✕]       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              ✨ QUIZ COMPLETE! ✨                        │
│                                                         │
│  ╔═════════════════════════════════════════════════╗   │
│  ║                                                 ║   │
│  ║           YOUR SCORE                            ║   │
│  ║                                                 ║   │
│  ║              4 / 4 ✓                            ║   │
│  ║                                                 ║   │
│  ║              100%                               ║   │
│  ║                                                 ║   │
│  ║  ▓▓▓▓▓▓▓▓▓▓ (Full progress bar)                 ║   │
│  ║                                                 ║   │
│  ║  Perfect score! You're a natural!              ║   │
│  ║                                                 ║   │
│  ╚═════════════════════════════════════════════════╝   │
│                                                         │
│            [  RETRY THIS QUIZ  ]                       │
│                                                         │
│        [  BACK TO LESSONS  ]                           │
│                                                         │
└─────────────────────────────────────────────────────────┘

PERFORMANCE MESSAGES:
┌────────────────────────────────────────┐
│ 100%:  "Perfect score! You're a natural!"      │
│ 80-99%: "Excellent work! You're doing great!"  │
│ 60-79%: "Good job! Keep practicing!"           │
│ <60%:   "Keep learning! Practice makes perfect!"│
└────────────────────────────────────────┘

DATA SAVED TO FIRESTORE:
users/{userId}/quizResults/{resultId}
{
  lessonId: "lesson-1",
  languageId: "kikuyu",
  score: 4,
  totalQuestions: 4,
  percentage: 100,
  completedAt: Timestamp
}

USER ACTIONS AFTER QUIZ:
Option 1: [RETRY THIS QUIZ]
  → Same quiz questions reload
  → Score counter resets
  → Can improve score
  → New result saved

Option 2: [BACK TO LESSONS]
  → Return to Lesson Grid
  → See all lessons again
  → Can select different lesson
  → Can select different language
```

---

## 9. COMPLETE USER JOURNEY MAP

```
START (Unauthenticated)
  │
  ├─→ [LOGIN PAGE] ────→ User enters email/password ──→ Authenticate
  │
  └─→ [SIGNUP PAGE] ────→ User registers ──────────→ Create account & auth

  Authentication Success
  │
  ├─→ [HOME - DASHBOARD] ──→ Welcome message
  │
  ├─→ [HOME - LANGUAGES] ──→ Select language (Kalenjin/Kikuyu/Luo)
  │
  ├─→ [HOME - LESSONS] ────→ Select lesson (3 lessons per language)
  │
  ├─→ [FLASHCARDS] ───────→ Review vocabulary (4+ cards per lesson)
  │                         │
  │                         └─→ Navigate cards (Previous/Next)
  │                         │
  │                         └─→ Progress indicator
  │
  └─→ [QUIZ] ─────────────→ Answer questions (4 questions per lesson)
      │                     │
      │                     ├─→ Multiple choice (3 options)
      │                     │
      │                     ├─→ Immediate feedback (green/red)
      │                     │
      │                     └─→ Progress bar
      │
      ├─→ [RESULTS] ───────→ Score display + Message
      │   │
      │   ├─→ [RETRY] ─────→ Back to Question 1
      │   │
      │   └─→ [BACK] ──────→ Return to Lesson Grid
      │
      └─→ Repeat with different lessons or languages

PERSISTENT DATA:
• User authentication (Firebase Auth)
• User document (Firestore)
• Quiz results (Firestore sub-collection)
• Language selections (Firestore sub-collection)
• Progress tracking (future enhancement)
```

---

## 10. INTERACTION EXAMPLES

### Example 1: User Learns Kikuyu Numbers

```
Step 1: Dashboard
  User clicks: "SELECT A LANGUAGE"

Step 2: Language Selection
  User clicks: "SELECT" on Kikuyu card
  System: Sets languageId = "kikuyu"

Step 3: Lesson Selection
  User sees: 3 lesson cards
    - Basic Greetings
    - Numbers 1-10
    - Family Members
  User clicks: "START" on "Numbers 1-10"
  System: Sets selectedLesson = "lesson-2"

Step 4: Flashcards
  User sees: Kikuyu number words
    Card 1: "Ĩmwe" (One)
    Card 2: "Igĩrĩ" (Two)
    Card 3: "Ithatũ" (Three)
    Card 4: "Inya" (Four)

  User actions:
    ← Click: See previous card
    → Click: See next card
    Progress: 4/4 reached

Step 5: Quiz
  Q1: "One" → B) Ĩmwe ✓ Correct!
  Q2: "Two" → B) Igĩrĩ ✓ Correct!
  Q3: "Three" → B) Ithatũ ✓ Correct!
  Q4: "Four" → A) Angwan ✗ Wrong! (Should be "Inya")

Step 6: Results
  Score: 3/4 (75%)
  Message: "Good job! Keep practicing!"
  Data saved to database

User can:
  → Retry quiz to improve score
  → Return to lesson grid
  → Try different language/lesson
```

### Example 2: User Switches Languages Mid-Session

```
Current state: Viewing Kikuyu lessons

User clicks: [← BACK] on lesson cards
System: Returns to lesson grid
User clicks: [← BACK] on lesson grid
System: Returns to language selector
User clicks: SELECT on Kalenjin card
System: Sets languageId = "kalenjin"

New lesson content loads with Kalenjin words
All flashcards now show Kalenjin translations
Quiz answers match Kalenjin language
```

---

## 11. DATA PERSISTENCE & SAVED DATA

```
Every successful quiz saves:

Firestore Collection: users/{userId}/quizResults

Document Structure:
{
  id: "auto-generated",
  lessonId: "lesson-1",        ← Which lesson
  languageId: "kikuyu",         ← Which language studied
  score: 3,                      ← Points earned
  totalQuestions: 4,             ← Total possible points
  percentage: 75,                ← Calculated percentage
  completedAt: Timestamp         ← When quiz was taken
}

This data enables:
✓ Progress tracking
✓ Score history
✓ Best score per lesson
✓ Learning analytics
✓ Future recommendations
✓ Achievement badges (future feature)
```

---

## 12. ERROR HANDLING THROUGHOUT THE JOURNEY

```
LOGIN ERRORS:
  User not found → "No account found with this email"
  Wrong password → "Incorrect password"
  Network error → "Connection failed. Please try again"

SIGNUP ERRORS:
  Email exists → "This email is already registered"
  Weak password → "Password must be at least 6 characters"
  Passwords don't match → "Passwords do not match"

LOADING DATA ERRORS:
  Lessons fail → Show spinner + retry option
  Quiz questions fail → "Unable to load quiz. Please try again"
  Save result fails → "Could not save your score. Try again"

LOGOUT ERRORS:
  Failed logout → "Could not sign out. Try again"
  Session timeout → Auto-redirect to login
```

---

## Summary

The LUGHA47 app guides users through:

1. **Authentication** - Secure login/signup
2. **Language Selection** - Choose language to learn
3. **Lesson Selection** - Pick specific topic
4. **Content Review** - Study vocabulary with flashcards
5. **Quiz Assessment** - Test knowledge with multiple choice
6. **Results & Feedback** - See performance and motivational message
7. **Data Persistence** - All progress saved to database

Each step is clearly designed, visually feedback-rich, and progressively guides the learner from authentication through completing interactive quizzes.
