import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Languages } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError('');
      setSuccess('');
      setLoading(true);
      await login(email, password);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMessage = 'Failed to log in. Please try again.';

      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Please sign up first.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled.';
      } else if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid credentials. Please check your email and password.';
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6">
            <img
              src="/lughalogo.png"
              alt="LUGHA47 Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mb-3">LUGHA47</h1>
          <p className="text-gray-600 text-lg">Welcome back! Continue learning</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200/50">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Log In</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-lg"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-3">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-lg"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:scale-105 text-lg"
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600 text-base">
            Don't have an account?{' '}
            <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
