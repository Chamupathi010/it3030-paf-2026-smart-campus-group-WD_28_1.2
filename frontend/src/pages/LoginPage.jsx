import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { authAPI } from '../api/services';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import AuthShell from '../components/AuthShell';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setAuth, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const getPostLoginRoute = (roles) => {
    if (roles?.includes('ADMIN')) return '/admin/dashboard';
    if (roles?.includes('TECHNICIAN')) return '/technician/dashboard';
    return '/dashboard';
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  // Handle OAuth2 callback token
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      (async () => {
        try {
          const response = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch authenticated user');
          }

          const userData = await response.json();
          setAuth(userData, token);
          navigate(getPostLoginRoute(userData.roles), { replace: true });
          toast.success('Logged in with Google!');
        } catch {
          toast.error('OAuth2 login failed');
        }
      })();
    }
  }, [searchParams, setAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login({ email: form.email, password: form.password });
      setAuth(res.data, res.data.token);
      navigate(getPostLoginRoute(res.data.roles));
      toast.success(`Welcome${res.data.name ? ', ' + res.data.name : ''}!`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/oauth2/authorization/google';
  };

  return (
    <AuthShell
      eyebrow="Sign in to continue"
      title="Welcome back to SmartCampus"
      subtitle="Use your account to access bookings, campus notifications, and service requests from a single secure dashboard."
      bullets={[
        'Access your dashboard, notifications, and active requests immediately after sign in.',
        'Manage campus operations with a clean interface built for students, staff, and technicians.',
        'Use Google sign-in or your existing campus account to get started quickly.',
      ]}
      footerText="New to SmartCampus?"
      footerLinkLabel="Create an account"
      footerLinkTo="/register"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="you@example.edu"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-slate-500">
            <input type="checkbox" className="rounded border-sky-200 text-primary-600 focus:ring-primary-500" />
            Remember me
          </label>
          <button type="button" className="font-medium text-primary-700 hover:text-primary-600">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center gap-2 py-3.5"
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-sky-100" />
        <span className="text-xs text-slate-500">or continue with</span>
        <div className="h-px flex-1 bg-sky-100" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-black shadow-sm transition hover:border-primary-500 hover:bg-slate-50"
      >
        <span className="inline-flex items-center justify-center gap-3">
          <Globe size={18} className="text-[#4285F4]" />
          Continue with Google
        </span>
      </button>
    </AuthShell>
  );
};

export default LoginPage;
