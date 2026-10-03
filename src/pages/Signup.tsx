import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError('Passwords do not match');
    if (password.length < 6) return setError('Password must be at least 6 characters');

    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await signup(email, password);
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => { navigate('/'); }, 1500);
    } catch (err: any) {
      let errorMessage = 'Failed to create account. Please try again.';
      if (err.code === 'auth/email-already-in-use') errorMessage = 'This email is already registered. Please log in instead.';
      else if (err.code === 'auth/invalid-email') errorMessage = 'Please enter a valid email address.';
      else if (err.code === 'auth/weak-password') errorMessage = 'Password is too weak. Please choose a stronger password.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <img src="/lughalogo.png" alt="LUGHA47" className="w-16 h-16 object-contain mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-forest-700 font-heading mb-1">LUGHA47</h1>
          <p className="text-ink-400 text-sm">Start your language learning journey</p>
        </div>

        <div className="card p-8">
          <h2 className="text-xl font-bold text-ink-900 mb-6">Create Account</h2>

          {error && (
            <div className="bg-kanga-50 border border-kanga-200 text-kanga-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-forest-50 border border-forest-200 text-forest-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-ink-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-forest-200 focus:border-forest-500 transition-all text-base"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-ink-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-forest-200 focus:border-forest-500 transition-all text-base"
                placeholder="At least 6 characters"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-ink-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-forest-200 focus:border-forest-500 transition-all text-base"
                placeholder="Repeat your password"
              />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary w-full py-3.5">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-ink-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-forest-700 hover:text-forest-800 font-bold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
