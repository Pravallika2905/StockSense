import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import {
  loginUser,
  registerUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getProfile,
  logoutUser,
  getToken,
} from './services/authApi';
import './App.css';

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-badge">SS</div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'test@gmail.com', password: 'Test@123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue to your portfolio dashboard.">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        {error && <div className="error-box">{error}</div>}
        <button className="primary-btn" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <div className="auth-links">
        <Link to="/register">Create account</Link>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
    </AuthLayout>
  );
}

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: 'Test User',
    email: 'test@gmail.com',
    password: 'Test@123',
    phone: '9876543210',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Open your StockSense account and begin trading intelligently.">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Full name
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <label>
          Phone
          <input type="text" name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        {error && <div className="error-box">{error}</div>}
        <button className="primary-btn" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <div className="auth-links">
        <Link to="/login">Already have an account?</Link>
      </div>
    </AuthLayout>
  );
}

function ForgotPasswordPage() {
  const [email, setEmail] = useState('test@gmail.com');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const data = await forgotPassword({ email });
      setMessage(data.message || 'OTP sent successfully');
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot password" subtitle="Enter your registered email to receive an OTP.">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        {message && <div className="success-box">{message}</div>}
        {error && <div className="error-box">{error}</div>}
        <button className="primary-btn" disabled={loading}>
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </form>

      <div className="auth-links">
        <Link to="/verify-otp">Verify OTP</Link>
        <Link to="/login">Back to login</Link>
      </div>
    </AuthLayout>
  );
}

function VerifyOtpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'test@gmail.com', otp: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const data = await verifyOtp(form);
      if (data.valid) {
        setMessage(data.message || 'OTP verified');
        navigate('/reset-password', { state: { email: form.email } });
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed');
    }
  };

  return (
    <AuthLayout title="Verify OTP" subtitle="Enter the code sent to your email address.">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label>
          OTP
          <input type="text" name="otp" value={form.otp} onChange={(e) => setForm({ ...form, otp: e.target.value })} required />
        </label>
        {message && <div className="success-box">{message}</div>}
        {error && <div className="error-box">{error}</div>}
        <button className="primary-btn">Verify OTP</button>
      </form>

      <div className="auth-links">
        <Link to="/forgot-password">Request another OTP</Link>
        <Link to="/login">Back to login</Link>
      </div>
    </AuthLayout>
  );
}

function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledEmail = location.state?.email || 'test@gmail.com';
  const [form, setForm] = useState({ email: prefilledEmail, newPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const data = await resetPassword(form);
      setMessage(data.message || 'Password reset successful');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.message || 'Reset failed');
    }
  };

  return (
    <AuthLayout title="Reset password" subtitle="Choose a new password for your account.">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label>
          New password
          <input type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} required />
        </label>
        {message && <div className="success-box">{message}</div>}
        {error && <div className="error-box">{error}</div>}
        <button className="primary-btn">Reset password</button>
      </form>

      <div className="auth-links">
        <Link to="/login">Back to login</Link>
      </div>
    </AuthLayout>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        setError(err.message || 'Unable to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  const holdings = [
    { symbol: 'AAPL', shares: 25, price: 210.35, change: 1.8 },
    { symbol: 'MSFT', shares: 18, price: 428.12, change: 0.9 },
    { symbol: 'NVDA', shares: 12, price: 131.94, change: 2.4 },
  ];

  const watchlist = [
    { symbol: 'TSLA', price: 248.6, change: 3.2 },
    { symbol: 'AMZN', price: 188.4, change: -0.7 },
    { symbol: 'GOOGL', price: 176.9, change: 1.1 },
  ];

  if (loading) return <div className="page-state dashboard-state">Loading dashboard...</div>;

  return (
    <div className="dashboard-shell">
      <div className="dashboard-topbar">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>{user?.name || 'Investor'}</h1>
        </div>
        <div className="dashboard-actions">
          <Link to="/profile" className="nav-link">Profile</Link>
          <button className="ghost-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card accent">
          <span>Portfolio Value</span>
          <strong>$128,460.80</strong>
          <small>+4.8% this month</small>
        </div>
        <div className="stat-card">
          <span>Day P&amp;L</span>
          <strong>+$2,340.90</strong>
          <small>Strong momentum</small>
        </div>
        <div className="stat-card">
          <span>Buying Power</span>
          <strong>$18,500.00</strong>
          <small>Ready to deploy</small>
        </div>
        <div className="stat-card">
          <span>Watchlist</span>
          <strong>12 symbols</strong>
          <small>3 trending now</small>
        </div>
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-header">
            <h2>Holdings</h2>
            <button className="small-btn">Add asset</button>
          </div>
          <div className="table-list">
            {holdings.map((item) => (
              <div className="table-row" key={item.symbol}>
                <div>
                  <strong>{item.symbol}</strong>
                  <span>{item.shares} shares</span>
                </div>
                <div>
                  <strong>${item.price.toFixed(2)}</strong>
                  <span className={item.change >= 0 ? 'up' : 'down'}>{item.change >= 0 ? '+' : ''}{item.change}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Market Watch</h2>
            <button className="small-btn light">View all</button>
          </div>
          <div className="watchlist">
            {watchlist.map((item) => (
              <div className="watch-item" key={item.symbol}>
                <div>
                  <strong>{item.symbol}</strong>
                  <small>{item.price}</small>
                </div>
                <span className={item.change >= 0 ? 'up' : 'down'}>{item.change >= 0 ? '+' : ''}{item.change}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel lower-panel">
        <div className="panel-header">
          <h2>Profile Snapshot</h2>
          <Link className="small-btn light" to="/profile">View profile</Link>
        </div>
        {user && (
          <div className="profile-grid compact">
            <div><span>Name</span><strong>{user.name}</strong></div>
            <div><span>Email</span><strong>{user.email}</strong></div>
            <div><span>Phone</span><strong>{user.phone}</strong></div>
            <div><span>Member ID</span><strong>{user.id}</strong></div>
          </div>
        )}
      </section>
    </div>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        setError(err.message || 'Unable to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  if (loading) return <div className="page-state">Loading profile...</div>;

  return (
    <div className="profile-shell">
      <div className="profile-card">
        <div className="profile-header">
          <div>
            <p className="eyebrow">Profile</p>
            <h2>{user?.name || 'User'}</h2>
          </div>
          <button className="ghost-btn" onClick={handleLogout}>Logout</button>
        </div>

        {error && <div className="error-box">{error}</div>}

        {user && (
          <div className="profile-grid">
            <div><span>ID</span><strong>{user.id}</strong></div>
            <div><span>Name</span><strong>{user.name}</strong></div>
            <div><span>Email</span><strong>{user.email}</strong></div>
            <div><span>Phone</span><strong>{user.phone}</strong></div>
          </div>
        )}

        <div className="auth-links profile-link-row">
          <Link to="/dashboard">Back to dashboard</Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
