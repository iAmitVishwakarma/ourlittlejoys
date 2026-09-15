import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import SEO from '@/components/common/SEO';
import { 
  Lock, 
  Mail, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Baby, 
  Gift,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const login = useAuthStore((s) => s.login);

  // Determine return target path with full pathname, search, and hash support
  const rawFrom = location.state?.from;
  const getDestination = () => {
    if (typeof rawFrom === 'string') return rawFrom;
    if (rawFrom && typeof rawFrom === 'object') {
      const pathname = rawFrom.pathname || '';
      const search = rawFrom.search || '';
      const hash = rawFrom.hash || '';
      const full = `${pathname}${search}${hash}`;
      if (full && full !== '/login' && full !== '/signup') return full;
    }
    const redirectParam = new URLSearchParams(location.search).get('redirect');
    if (redirectParam) return redirectParam;
    return '/';
  };

  const targetPath = getDestination();

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      navigate(targetPath, { replace: true });
    }
  }, [isAuthenticated, navigate, targetPath]);

  // View state: 'signin' | 'signup'
  const [mode, setMode] = useState(
    location.pathname === '/signup' ? 'signup' : 'signin'
  );

  // Auth method: 'email' | 'phone'
  const [method, setMethod] = useState('email');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Signup extra fields
  const [name, setName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('4');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Clear errors when toggling modes
  useEffect(() => {
    setError(null);
    setSuccessMsg(null);
  }, [mode, method]);

  // 1-Click Fast Demo Login
  const handleDemoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.loginUser({
        email: 'demo@example.com',
        password: 'demo123'
      });

      if (res.success && res.user) {
        login(res.user, res.token);
        setSuccessMsg('Welcome back, Demo Parent!');
        setTimeout(() => {
          navigate(targetPath, { replace: true });
        }, 400);
      } else {
        setError(res.message || 'Demo login failed.');
      }
    } catch {
      setError('An error occurred during demo login.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Email + Password or Phone Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        if (method === 'email') {
          if (!email || !password) {
            setError('Please enter both email and password.');
            setIsLoading(false);
            return;
          }

          const res = await authService.loginUser({ email, password });
          if (res.success && res.user) {
            login(res.user, res.token);
            setSuccessMsg('Signed in successfully!');
            setTimeout(() => {
              navigate(targetPath, { replace: true });
            }, 400);
          } else {
            setError(res.message || 'Invalid email or password.');
          }
        } else {
          // Phone OTP flow
          const cleanPhone = phone.replace(/\D/g, '').slice(-10);
          if (cleanPhone.length < 10) {
            setError('Please enter a valid 10-digit mobile number.');
            setIsLoading(false);
            return;
          }

          if (!otpSent) {
            // Strict database check: Does this user actually exist in json-server or fallbacks?
            const res = await authService.loginUser({ phone: cleanPhone, otp: '1234' });
            // If user doesn't exist, loginUser returns "No account registered..."
            if (!res.success && res.message?.includes('No account registered')) {
              setError(`No account found with +91 ${cleanPhone}. Please switch to "Create Account" above.`);
              setIsLoading(false);
              return;
            }

            setOtpSent(true);
            setSuccessMsg(`OTP sent to +91 ${cleanPhone}. (Use demo verification code: 1234)`);
            setIsLoading(false);
            return;
          }

          if (!otp || otp.trim() !== '1234') {
            setError('Invalid OTP code. Please enter the demo code: 1234');
            setIsLoading(false);
            return;
          }

          const res = await authService.loginUser({ phone: cleanPhone, otp });
          if (res.success && res.user) {
            login(res.user, res.token);
            setSuccessMsg('Phone verified successfully!');
            setTimeout(() => {
              navigate(targetPath, { replace: true });
            }, 400);
          } else {
            setError(res.message || 'Invalid OTP code.');
          }
        }
      } else {
        // Signup flow with strict validation
        if (!name || name.trim().length < 2) {
          setError('Please enter your full name (at least 2 characters).');
          setIsLoading(false);
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.trim())) {
          setError('Please enter a valid email address (e.g. parent@example.com).');
          setIsLoading(false);
          return;
        }

        const cleanPhone = phone.replace(/\D/g, '').slice(-10);
        if (cleanPhone.length < 10) {
          setError('Please enter a valid 10-digit mobile number.');
          setIsLoading(false);
          return;
        }

        if (!password || password.length < 6) {
          setError('Password must be at least 6 characters long.');
          setIsLoading(false);
          return;
        }

        const res = await authService.signupUser({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          phone: cleanPhone,
          childName: childName.trim(),
          childAge
        });

        if (res.success && res.user) {
          login(res.user, res.token);
          setSuccessMsg(res.message || 'Account created successfully!');
          setTimeout(() => {
            navigate(targetPath, { replace: true });
          }, 500);
        } else {
          setError(res.message || 'Signup failed.');
        }
      }
    } catch {
      setError('An unexpected network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-brand-cream flex items-center justify-center px-4 py-8 md:py-14">
      <SEO 
        title={`${mode === 'signup' ? 'Create Account' : 'Sign In'} | Little Joys`}
        description="Sign in to your Little Joys parent dashboard to access your cart, honest nutrition lab reports, and manage orders."
      />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-orange-950/5 border border-orange-100 p-6 sm:p-8 relative overflow-hidden">
        {/* Soft background aura */}
        <div className="absolute -top-14 -right-14 w-36 h-36 bg-pink-100 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-14 -left-14 w-36 h-36 bg-amber-100 rounded-full blur-2xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center mb-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-1.5 mb-2 group">
            <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-[#13805B] transition-colors">
              little<span className="text-pink-500">joys</span>
            </span>
            <span className="text-base">🍓</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {mode === 'signup' ? 'Join the Little Joys Family' : 'Welcome Back, Parent!'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'signup'
              ? 'Get ₹200 Welcome Wallet Credit on creating your parent account'
              : 'Sign in to access your bag, saved addresses & orders'}
          </p>
        </div>

        {/* 1-Click Fast Demo Login Pill */}
        {mode === 'signin' && (
          <div className="mb-5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <div className="text-left">
                <p className="text-xs font-bold text-emerald-900">Quick Demo Testing</p>
                <p className="text-[11px] text-emerald-700 font-medium">1-Click login as demo parent</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="px-3 py-1.5 bg-[#13805B] hover:bg-[#0f6849] text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-102 active:scale-98 disabled:opacity-50"
            >
              Demo Login
            </button>
          </div>
        )}

        {/* Mode Switch (Sign In vs Create Account) */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'signin'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'signup'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Method Switch for Sign In (Email vs Phone) */}
        {mode === 'signin' && (
          <div className="flex justify-center gap-4 text-xs font-bold mb-5 pb-2 border-b border-slate-100">
            <button
              type="button"
              onClick={() => setMethod('email')}
              className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
                method === 'email'
                  ? 'border-[#13805B] text-[#13805B]'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Email & Password
            </button>
            <button
              type="button"
              onClick={() => setMethod('phone')}
              className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
                method === 'phone'
                  ? 'border-[#13805B] text-[#13805B]'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              Phone & OTP
            </button>
          </div>
        )}

        {/* Error / Success Messages */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* SIGNUP: Name */}
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Parent Name <span className="text-pink-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pooja Sharma"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#13805B] focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          {/* EMAIL INPUT (Sign in email method OR Signup) */}
          {(mode === 'signup' || method === 'email') && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address <span className="text-pink-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#13805B] focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          {/* PHONE INPUT (Sign in phone method OR Signup optional) */}
          {(mode === 'signup' || method === 'phone') && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number {mode === 'signin' && <span className="text-pink-500">*</span>}
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs font-black text-slate-400">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  required={method === 'phone'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#13805B] focus:bg-white transition-all tracking-wider"
                />
              </div>
            </div>
          )}

          {/* OTP INPUT (Phone sign in when OTP is sent) */}
          {mode === 'signin' && method === 'phone' && otpSent && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">
                  4-Digit OTP <span className="text-pink-500">*</span>
                </label>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Mock OTP: 1234
                </span>
              </div>
              <input
                type="text"
                maxLength={4}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="1234"
                className="w-full px-4 py-2.5 text-center tracking-[0.5em] text-base font-black bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#13805B] focus:bg-white transition-all"
              />
            </div>
          )}

          {/* PASSWORD INPUT (Email sign in OR Signup) */}
          {(mode === 'signup' || method === 'email') && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Password <span className="text-pink-500">*</span>
                </label>
                {mode === 'signin' && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    Demo: demo123
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Create a secure password' : 'Enter password'}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#13805B] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* SIGNUP: Child Personalization (Optional) */}
          {mode === 'signup' && (
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11px] font-bold text-[#13805B] mb-2 flex items-center gap-1">
                <Baby className="w-3.5 h-3.5" />
                Personalize Nutrition for Your Child
              </p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Child's Name"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#13805B]"
                />
                <select
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#13805B]"
                >
                  <option value="2">Age 2-4 Years</option>
                  <option value="4">Age 4-6 Years</option>
                  <option value="7">Age 7-10 Years</option>
                  <option value="11">Age 11+ Years</option>
                </select>
              </div>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-[#13805B] hover:bg-[#0f6849] text-white text-xs font-black rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-60"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>
                  {mode === 'signup'
                    ? 'Create Free Account'
                    : method === 'phone' && !otpSent
                    ? 'Get 4-Digit OTP'
                    : 'Sign In to Dashboard'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Trust Badges */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-500">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1">
            <Gift className="w-3.5 h-3.5 text-pink-500" />
            <span>₹200 Welcome Gift</span>
          </div>
        </div>
      </div>
    </div>
  );
}
