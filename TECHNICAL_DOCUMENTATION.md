# LUGHA47 - Technical Architecture Documentation

## 1. Application Overview

### Purpose
LUGHA47 is a culturally-focused language learning platform designed to preserve Kenya's indigenous languages (Kalenjin, Kikuyu, and Luo). The application provides interactive lessons with vocabulary cards, quizzes, and progress tracking to help users learn and maintain their native languages.

### Technology Stack
- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Routing**: React Router DOM 7.13.2
- **Backend/Database**: Firebase (Authentication + Firestore)
- **UI Components**: Lucide React 0.344.0 (Icon library)
- **Styling**: Tailwind CSS 3.4.1
- **State Management**: React Context API (Authentication)

### Architecture Pattern
The application follows a **component-based architecture** with:
- Context-based global state management for authentication
- Service layer for Firebase operations
- Separation of concerns between pages, components, and services
- Type-safe interfaces for all data structures

---

## 2. Root Level Analysis

### Project Structure
```
project/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/            # Global state (AuthContext)
│   ├── pages/               # Page-level components (Home, Login, Signup)
│   ├── services/            # Firebase data access layer
│   ├── lib/                 # External library initialization (Firebase)
│   ├── data/                # Static data (lessons.json)
│   ├── App.tsx              # Main app routing
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
│   └── lughalogo.png        # Application logo
├── supabase/migrations/     # Database migrations (not currently used)
├── index.html               # HTML entry point
└── Configuration files (vite.config.ts, tailwind.config.js, tsconfig.json)
```

### Key Configuration Files

#### vite.config.ts
- Vite configuration for React development
- Plugin: @vitejs/plugin-react for JSX/TSX support
- Development server configuration

#### tailwind.config.js
- Tailwind CSS theme customization
- Custom color palette (emerald, teal, cyan gradients)
- Responsive design configuration

#### tsconfig.json
- TypeScript strict mode enabled
- Target: ES2020, Module: ESNext
- Path aliases for clean imports

#### firestore.rules
- Security rules for Firestore database
- Allows authenticated user access to specific collections

### Environment Configuration
```
.env file contains:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
```

Note: Firebase config is hardcoded in `src/lib/firebase.ts` (should be moved to environment variables for production security).

---

## 3. Component Hierarchy

### Component Tree
```
App (root)
├── BrowserRouter (routing wrapper)
├── AuthProvider (global auth state)
│   ├── Login page (unauthenticated)
│   ├── Signup page (unauthenticated)
│   └── ProtectedRoute (authenticated)
│       └── Home page (authenticated)
│           ├── Navigation bar (with logo and logout)
│           ├── Dashboard view (default)
│           │   ├── Mission cards
│           │   └── Language selection cards
│           ├── LanguageSelector (language picker)
│           └── LessonViewer (lesson content)
│               ├── Lesson grid
│               ├── Lesson detail view (with cards)
│               └── Quiz component
```

### Data Flow Diagram

```
User Authentication Flow:
AuthContext (state) → useAuth() hook → Components → Firebase Auth
↓
Success → setUser() → Protected Routes → Home Page
↓
Failure → Redirect to /login

Content Loading Flow:
Home Page → dataService.getLanguages()
↓ (Firebase query)
Firestore: languages collection
↓
Component state update → UI render
```

---

## 4. Technical Implementation Details

### 4.1 Authentication System

#### AuthContext (src/contexts/AuthContext.tsx)
**Purpose**: Centralized authentication state management using React Context API

**Interfaces**:
```typescript
interface User {
  uid: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
```

**Key Functions**:
- `useAuth()` - Custom hook for accessing auth context
- `signup()` - Creates user in Firebase Auth, creates user document in Firestore
- `login()` - Signs in user using email/password
- `logout()` - Signs out user and clears local state
- `onAuthStateChanged()` - Firebase listener for persistent auth state

**Implementation Details**:
- Uses Firebase Authentication for credential management
- Creates user profile document in Firestore on signup
- Implements authentication state listener to maintain session across page reloads
- Handles loading state before auth is resolved

#### Protected Routes (src/components/ProtectedRoute.tsx)
**Purpose**: Prevents unauthorized access to authenticated pages

**Logic**:
```typescript
if (!user) {
  return <Navigate to="/login" />;
}
return <>{children}</>;
```

---

### 4.2 Pages

#### Login Page (src/pages/Login.tsx)
**Route**: `/login`
**Access**: Public (unauthenticated users only)

**Features**:
- Email and password input fields
- Error/success message display
- Form validation
- Loading state during authentication
- Link to signup for new users
- Logo and branding display

**Error Handling**:
- `auth/user-not-found` - No account with this email
- `auth/wrong-password` - Incorrect password
- `auth/invalid-email` - Invalid email format
- `auth/invalid-credential` - Invalid credentials

#### Signup Page (src/pages/Signup.tsx)
**Route**: `/signup`
**Access**: Public (unauthenticated users only)

**Features**:
- Email input
- Password confirmation validation
- Minimum 6-character password requirement
- Password matching validation
- Error/success messages
- Link to login for existing users
- Logo and branding display

**Error Handling**:
- `auth/email-already-in-use` - Email already registered
- `auth/invalid-email` - Invalid email format
- `auth/weak-password` - Password doesn't meet strength requirements

#### Home Page (src/pages/Home.tsx)
**Route**: `/` (protected)
**Access**: Authenticated users only

**State Management**:
```typescript
type HomeView = 'dashboard' | 'languages' | 'lessons';
const [view, setView] = useState<HomeView>('dashboard');
const [languages, setLanguages] = useState<any[]>([]);
const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
const [loading, setLoading] = useState(true);
```

**View Modes**:
1. **Dashboard View** - Landing page with mission statement and language options
2. **Languages View** - Language selector component
3. **Lessons View** - Lesson viewer component

**Navigation**:
- Logo button returns to dashboard
- User email display in header
- Logout button with error handling
- Navigation bar with blur effect and sticky positioning

---

### 4.3 Components

#### LanguageSelector (src/components/LanguageSelector.tsx)
**Purpose**: Display available languages for user to select

**Props Interface**:
```typescript
interface Language {
  id: string;
  name: string;
  nativeSpelling: string;
  description: string;
}

interface LanguageSelectorProps {
  languages: Language[];
  onSelectLanguage: (languageId: string) => void;
  onBack: () => void;
}
```

**Features**:
- Grid layout (responsive: 1 col mobile, 2-3 cols desktop)
- Language cards with icons
- Native spelling display
- Selection callback
- Back navigation button

#### LessonViewer (src/components/LessonViewer.tsx)
**Purpose**: Display lessons and manage lesson content viewing and quizzes

**Props Interface**:
```typescript
interface LessonViewerProps {
  languageId: string;
  onBack: () => void;
}

interface LessonWithContent extends Lesson {
  content: LessonContent[];
}
```

**View Modes**:
1. **Grid Mode** - Display all lessons for selected language
2. **Detail Mode** - Show individual lesson content cards
3. **Quiz Mode** - Present quiz questions

**Features**:
- Lesson grid with descriptions
- Flashcard-style content display (shows word in selected language + English)
- Navigation between cards (Previous/Next)
- Progress indicator (current card / total cards)
- Quiz launch button on last card
- Language-specific word selection based on `languageId`

**Content Display Logic**:
```typescript
const getLanguageWord = () => {
  switch (languageId) {
    case 'kalenjin': return currentCard.kalenjin;
    case 'kikuyu': return currentCard.kikuyu;
    case 'luo': return currentCard.luo;
    default: return currentCard.kalenjin;
  }
};
```

#### Quiz Component (src/components/Quiz.tsx)
**Purpose**: Present quiz questions and track user performance

**Props Interface**:
```typescript
export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: {
    kalenjin: string;
    kikuyu: string;
    luo: string;
  };
  orderIndex: number;
}

interface QuizProps {
  questions: QuizQuestion[];
  languageId: string;
  onComplete: (score: number, total: number) => void;
  onRetry: () => void;
}
```

**Quiz Logic**:
- Multiple choice questions (3 options: one per language)
- Correct answer determined by matching `languageId` to selected option
- Visual feedback (green for correct, red for wrong)
- Progress bar showing answered vs. remaining questions
- Score display
- Results screen with motivational message
- Retry and back-to-lessons buttons

**Scoring**:
```typescript
const getScoreMessage = () => {
  const percentage = getScorePercentage();
  if (percentage === 100) return "Perfect score! You're a natural!";
  if (percentage >= 80) return "Excellent work! You're doing great!";
  if (percentage >= 60) return "Good job! Keep practicing!";
  return "Keep learning! Practice makes perfect!";
};
```

---

### 4.4 Data Service Layer

#### dataService.ts (src/services/dataService.ts)
**Purpose**: Centralized Firebase Firestore access and data operations

**Interfaces**:
```typescript
interface Language {
  id: string;
  name: string;
  nativeSpelling: string;
  description: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
}

interface LessonContent {
  id: string;
  lessonId: string;
  kalenjin: string;
  kikuyu: string;
  luo: string;
  english: string;
  orderIndex: number;
}

interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: { kalenjin: string; kikuyu: string; luo: string; };
  orderIndex: number;
}

interface QuizResult {
  id?: string;
  userId: string;
  lessonId: string;
  languageId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: Date;
}
```

**Database Operations**:

1. **getLanguages()** → `collection(db, 'languages')`
   - Fetches all available languages
   - Returns Language array

2. **getLessons()** → `collection(db, 'lessons')`
   - Fetches all lessons ordered by index
   - Uses orderBy('orderIndex', 'asc')
   - Returns Lesson array

3. **getLessonContent(lessonId)** → `collection(db, 'lessonContent')`
   - Fetches content for specific lesson
   - Filters by lessonId with WHERE clause
   - Orders by index
   - Returns LessonContent array

4. **getQuizQuestions(lessonId)** → `collection(db, 'quizQuestions')`
   - Fetches quiz questions for lesson
   - Filters by lessonId
   - Orders by index
   - Returns QuizQuestion array

5. **saveUserLanguageSelection(userId, languageId)** → `doc(db, 'users', userId, 'languages', languageId)`
   - Creates language selection record for user
   - Sub-collection pattern under user document

6. **saveQuizResult(result)** → `collection(db, 'users', userId, 'quizResults')`
   - Stores quiz performance data
   - Includes score, percentage, completion time
   - Sub-collection under user document

7. **getQuizResults(userId, lessonId?)** → Retrieves user's quiz history
   - Optional filter by lesson
   - Returns QuizResult array

8. **getBestQuizScore(userId, lessonId)** → Returns highest percentage for lesson
   - Used for progress tracking

---

### 4.5 Firebase Integration

#### Firebase Initialization (src/lib/firebase.ts)
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyBZ2sW5qKVZw7V7aqR12W4kxAyuYOXHJ6I",
  authDomain: "lugha47.firebaseapp.com",
  projectId: "lugha47",
  storageBucket: "lugha47.firebasestorage.app",
  messagingSenderId: "470488484415",
  appId: "1:470488484415:web:17841b6049973cfd89068a",
  measurementId: "G-VE1GLG2S2G"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
```

#### Firestore Collections Structure
```
languages/
├── kalenjin
├── kikuyu
└── luo

lessons/
├── lesson-1 (Basic Greetings)
├── lesson-2 (Numbers 1-10)
└── lesson-3 (Family Members)

lessonContent/
├── content-1 (lesson-1: Chamge)
├── content-2 (lesson-1: Misoi)
└── ... (organized by lessonId)

quizQuestions/
├── quiz-1-1 (lesson-1, question 1)
├── quiz-1-2 (lesson-1, question 2)
└── ... (organized by lessonId)

users/ (sub-collection structure)
├── {userId}
│   ├── languages/ (selected languages)
│   ├── progress/ (lesson completion)
│   └── quizResults/ (quiz scores)
```

---

## 5. Code Architecture Patterns

### 5.1 Design Patterns Implemented

#### Context API for State Management
- **Pattern**: Global state without Redux complexity
- **Implementation**: AuthContext provides user, loading, and auth methods
- **Usage**: Any component can access auth state via `useAuth()` hook

#### Custom Hooks
- **useAuth()** - Encapsulates auth context access with error handling

#### Service Layer Pattern
- **Purpose**: Separates data access from component logic
- **Benefit**: Testability, reusability, and maintainability
- **Implementation**: dataService exports pure functions for Firebase operations

#### Protected Route Pattern
- **Implementation**: Route guards using React Router's Navigate
- **Benefit**: Prevents unauthorized access to authenticated pages

### 5.2 Separation of Concerns

**Pages** (src/pages/)
- Handle routing and page-level logic
- Manage view state
- Orchestrate component composition

**Components** (src/components/)
- Presentational UI elements
- Receive data via props
- Emit events via callbacks
- No direct Firebase calls

**Services** (src/services/)
- All Firebase database operations
- Data transformation
- Error handling at data boundary

**Contexts** (src/contexts/)
- Global authentication state
- Cross-cutting concerns
- Singleton pattern for auth

**Lib** (src/lib/)
- External service initialization
- Configuration
- Singleton exports

### 5.3 Error Handling Strategies

**Authentication Errors**:
- Firebase Auth error codes parsed and converted to user-friendly messages
- Specific handling for: user-not-found, wrong-password, weak-password, email-already-in-use

**Data Loading Errors**:
- Try-catch blocks in all service functions
- Console error logging for debugging
- Graceful fallbacks (empty arrays)
- Loading state management in components

**User Feedback**:
- Success/error message display in auth pages
- Visual loading indicators (spinners)
- Disabled form buttons during submission

### 5.4 Performance Optimization Techniques

**Lazy Loading**:
- Content loaded on-demand (lessons, quiz questions)
- View mode management prevents rendering all content simultaneously

**Memoization** (potential):
- Components could benefit from React.memo() to prevent unnecessary re-renders
- Currently not implemented but recommended for lesson cards

**CSS Optimization**:
- Tailwind CSS purges unused styles
- Animations use CSS transitions (GPU-accelerated)

**State Optimization**:
- Minimal state at each level
- Clear state ownership hierarchy

---

## 6. Data Models and Relationships

### User Data Model
```
users (Collection)
├── uid (Document ID)
│   ├── email (string)
│   ├── createdAt (timestamp)
│   ├── languages/ (Sub-collection)
│   │   └── {languageId}
│   │       ├── languageId (string)
│   │       └── createdAt (timestamp)
│   ├── progress/ (Sub-collection)
│   │   └── {lessonId}
│   │       ├── lessonId (string)
│   │       ├── completed (boolean)
│   │       ├── completedAt (timestamp)
│   │       └── updatedAt (timestamp)
│   └── quizResults/ (Sub-collection)
│       └── {resultId}
│           ├── lessonId (string)
│           ├── languageId (string)
│           ├── score (number)
│           ├── totalQuestions (number)
│           ├── percentage (number)
│           └── completedAt (timestamp)
```

### Content Relationships
```
Lesson (1) ──→ (Many) LessonContent
           ──→ (Many) QuizQuestion

Language (1) ──→ (Many) Lessons
          ──→ (Many) QuizQuestions
```

### Quiz Flow
```
User selects Language
    ↓
LessonViewer loads Lessons for that language
    ↓
User selects Lesson
    ↓
LessonContent displayed (4+ flashcards per lesson)
    ↓
User completes all cards
    ↓
Quiz button appears
    ↓
Quiz loads QuizQuestions for that lesson
    ↓
User answers questions (options match language words)
    ↓
Quiz result saved to users/{userId}/quizResults
```

---

## 7. Feature Implementations

### 7.1 Language Learning Flow

**Step 1: Dashboard**
- Display mission statement
- Show available languages
- User clicks language to start

**Step 2: Language Selection**
- Grid of 3 languages
- User selects one language to focus on
- Language ID stored in Home component state

**Step 3: Lesson Selection**
- Grid of 3 lessons appears
- Each lesson displays title and description
- User clicks lesson to start

**Step 4: Content Review**
- Flashcard interface
- Shows word in selected language + English translation
- Navigation buttons (Previous/Next)
- Progress indicator
- Quiz button appears after last card

**Step 5: Quiz**
- Multiple choice questions
- User translates English to selected language
- 3 options (one per language)
- Immediate visual feedback
- Scoring and results
- Motivational messages based on performance

### 7.2 Progress Tracking

**Quiz Results Saved**:
```typescript
await saveQuizResult({
  userId: user.uid,
  lessonId: selectedLesson.id,
  languageId: languageId,
  score: points,
  totalQuestions: total,
  percentage: (points/total)*100,
  completedAt: new Date(),
});
```

**Available Metrics**:
- Score (points earned)
- Total questions
- Percentage correct
- Completion timestamp
- Best score per lesson (via getBestQuizScore)

---

## 8. API Integration Points

### Current Integrations
- **Firebase Authentication** - Email/password auth
- **Firestore** - Real-time database
- **Firebase Analytics** - User behavior tracking (initialized but not actively used)

### Potential Future Integrations
- User profile API (completed lessons, learning streaks)
- Pronunciation API (audio playback)
- Social features API (leaderboards)

---

## 9. Styling and Design System

### Color Palette (Tailwind)
- **Primary**: Emerald-600 to Emerald-700
- **Secondary**: Teal-600 to Teal-700
- **Accent**: Cyan-600
- **Neutrals**: Gray-50 to Gray-900
- **Status**: Red (error), Green (success)

### Typography
- Headings: Bold (font-bold)
- Body text: Normal weight with 150% line height
- Small text: sm class with gray-600

### Components Styling
- Rounded corners: 2xl/3xl (border-radius)
- Shadows: md/lg/xl on interactive elements
- Spacing: 8px base unit (8, 16, 24, 32, etc.)
- Transitions: 300ms duration for smooth interactions
- Hover effects: Scale, shadow, opacity changes

---

## 10. Development and Deployment

### Local Development
```bash
npm install           # Install dependencies
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # TypeScript validation
```

### Build Process
- Vite builds to `dist/` directory
- TypeScript compilation
- CSS bundling and purging
- Code splitting and minification

### Environment Variables
```
VITE_SUPABASE_URL        # Supabase project URL (not currently used)
VITE_SUPABASE_ANON_KEY   # Supabase API key (not currently used)
```

### Security Considerations
- Firebase config is currently hardcoded (should use environment variables)
- Firestore security rules enforce user authentication
- Row-level security through sub-collection structure
- No sensitive data exposed in client code

---

## 11. Known Limitations and Future Improvements

### Current Limitations
1. Firebase config hardcoded in source (security risk)
2. No offline support
3. Analytics initialized but not fully utilized
4. No user progress dashboard showing overall stats
5. Limited error recovery mechanisms
6. No audio/pronunciation features
7. Single-phase quiz (no spacing out reviews)

### Recommended Improvements
1. Move Firebase config to environment variables
2. Implement service workers for offline mode
3. Add progress analytics dashboard
4. Implement spaced repetition for better learning
5. Add audio pronunciation for each word
6. User profile and achievement system
7. Leaderboards or community features
8. Advanced filtering and search in lessons
9. User-generated content/comments
10. Dark mode support

---

## 12. Code Organization Summary

### File Structure Overview
```
src/
├── App.tsx                          # Router setup, route definitions
├── main.tsx                         # React entry point
├── index.css                        # Global styles
├── pages/
│   ├── Home.tsx                     # Dashboard, language/lesson selection
│   ├── Login.tsx                    # Authentication form
│   └── Signup.tsx                   # Account creation form
├── components/
│   ├── LanguageSelector.tsx         # Language picker UI
│   ├── LessonViewer.tsx             # Lesson and quiz management
│   ├── Quiz.tsx                     # Quiz presentation and scoring
│   └── ProtectedRoute.tsx           # Route guards
├── contexts/
│   └── AuthContext.tsx              # Global auth state
├── services/
│   └── dataService.ts               # Firestore operations
├── lib/
│   └── firebase.ts                  # Firebase initialization
└── data/
    └── lessons.json                 # Static lesson content
```

---

## Conclusion

LUGHA47 is a well-structured, culturally-focused language learning application with clear separation of concerns, appropriate use of Firebase for scalability, and thoughtful UI/UX design. The codebase follows React best practices with type safety through TypeScript, efficient state management via Context API, and a clean service layer for data operations. The application successfully bridges technology with cultural preservation, providing an intuitive platform for learning Kenya's indigenous languages.
