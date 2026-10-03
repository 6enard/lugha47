import { useState } from 'react';
import { X, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function AuthGate() {
  const { authGateOpen, closeAuthGate, login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authGateOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    try {
      setLoading(true);
      if (mode === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      closeAuthGate();
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      let errorMessage = 'Something went wrong. Please try again.';
      if (err.code === 'auth/user-not-found') errorMessage = 'No account found with this email.';
      else if (err.code === 'auth/wrong-password') errorMessage = 'Incorrect password.';
      else if (err.code === 'auth/invalid-email') errorMessage = 'Please enter a valid email address.';
      else if (err.code === 'auth/invalid-credential') errorMessage = 'Invalid credentials. Check your email and password.';
      else if (err.code === 'auth/email-already-in-use') errorMessage = 'This email is already registered. Try logging in.';
      else if (err.code === 'auth/weak-password') errorMessage = 'Password is too weak. Choose a stronger one.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
        onClick={closeAuthGate}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Top accent bar */}
        <div className="h-2 bg-gradient-to-r from-forest-500 via-forest-600 to-forest-700" />

        <div className="p-8">
          <button
            onClick={closeAuthGate}
            className="absolute top-6 right-6 text-ink-300 hover:text-ink-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <img src="/lughalogo.png" alt="LUGHA47" className="w-12 h-12 object-contain mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-ink-900">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-ink-400 text-sm mt-1">
              {mode === 'login'
                ? 'Sign in to continue your learning journey'
                : 'Join thousands preserving Kenyan languages'}
            </p>
          </div>

          {error && (
            <div className="bg-kanga-50 border border-kanga-200 text-kanga-700 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-ink-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-forest-200 focus:border-forest-500 transition-all text-base"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-forest-200 focus:border-forest-500 transition-all text-base"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-bold text-ink-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-ink-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-forest-200 focus:border-forest-500 transition-all text-base"
                    placeholder="Repeat your password"
                  />
                </div>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5 flex items-center justify-center gap-2">
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
              }}
              className="text-sm text-ink-400"
            >
              {mode === 'login' ? (
                <>Don't have an account? <span className="text-forest-700 font-bold">Sign up free</span></>
              ) : (
                <>Already have an account? <span className="text-forest-700 font-bold">Sign in</span></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
