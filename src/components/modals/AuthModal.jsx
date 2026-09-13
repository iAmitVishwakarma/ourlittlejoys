import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import { 
  X, 
  Sparkles, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  User, 
  Heart,
  Wallet
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const loginWithOtp = useAuthStore((s) => s.loginWithOtp);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  // Step: 1 = Phone input, 2 = OTP verification, 3 = Profile setup, 4 = Success
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Profile data
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('2-6 Yr');

  const inputRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setPhoneNumber('');
      setOtpValues(['', '', '', '']);
      setErrorMessage('');
      setTimer(30);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (phoneNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number');
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.sendOtp(phoneNumber);
      setIsSubmitting(false);
      setStep(2);
      setTimer(30);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Failed to send OTP. Please try again.');
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);

    // Auto focus next box
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const fullOtp = otpValues.join('');
    if (fullOtp.length < 4) {
      setErrorMessage('Please enter the 4-digit OTP sent to your phone');
      return;
    }

    setIsSubmitting(true);
    try {
      await loginWithOtp(phoneNumber, fullOtp);
      setIsSubmitting(false);
      setStep(3); // Go to quick profile personalization
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage('Invalid OTP code. Please check or click Resend.');
    }
  };

  // Complete profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await updateProfile({
      name: parentName || 'Parent',
      childName: childName || 'Little Champion',
      childAge: childAge || '4+ Yr'
    });
    setIsSubmitting(false);
    setStep(4);
    setTimeout(() => {
      onClose();
      const rawFrom = location.state?.from;
      if (rawFrom) {
        const dest = typeof rawFrom === 'string'
          ? rawFrom
          : `${rawFrom.pathname || ''}${rawFrom.search || ''}${rawFrom.hash || ''}`;
        if (dest && dest !== '/login' && dest !== '/signup') {
          navigate(dest, { replace: true });
        }
      }
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="relative bg-white rounded-3xl max-w-md w-full p-7 md:p-9 shadow-2xl z-10 border border-pink-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          aria-label="Close authentication dialog"
          className="absolute top-4 right-4 w-11 h-11 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: PHONE NUMBER */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-2 text-pink-600 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-wider">Welcome To Little Joys</span>
            </div>

            <h2 id="auth-modal-title" className="text-2xl font-black text-slate-800 leading-snug mb-2">
              Login or Register
            </h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Enter your mobile number to unlock <strong>₹200 LJ Wallet Cash</strong>, track orders, and view honest batch reports.
            </p>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label htmlFor="auth-phone-input" className="block text-[11px] font-black text-slate-700 mb-1.5 uppercase tracking-wider">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold text-sm">
                    +91
                  </div>
                  <input
                    id="auth-phone-input"
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    autoFocus
                    required
                    className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500 focus:bg-white text-slate-800 font-bold text-sm transition-all"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {errorMessage && (
                <p className="text-xs font-bold text-rose-600">{errorMessage}</p>
              )}

              {/* Wallet benefit badge */}
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/80 flex items-center gap-2.5 text-xs text-amber-900 font-bold">
                <Wallet className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Get flat ₹200 instant credit into your Little Joys Wallet!</span>
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length < 10 || isSubmitting}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending OTP...</span>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] font-bold text-slate-400">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Safe</span>
              <span>•</span>
              <span>⚡ Fast 1-Click OTP</span>
              <span>•</span>
              <span>🚫 Zero Spam</span>
            </div>
          </div>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 2 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-pink-600">Verification</span>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-pink-600 hover:underline font-bold"
              >
                Change Number
              </button>
            </div>

            <h2 id="auth-modal-title" className="text-2xl font-black text-slate-800 mb-1">Enter 4-Digit Code</h2>
            <p className="text-xs text-slate-500 mb-6">
              Sent via SMS to <strong>+91 {phoneNumber}</strong>
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center gap-3">
                {otpValues.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    aria-label={`Digit ${index + 1} of 4`}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-xl font-black bg-[#FFF9F5] border-2 border-orange-200 rounded-2xl focus:outline-none focus:border-pink-500 text-slate-800 shadow-xs"
                  />
                ))}
              </div>

              <div className="text-center text-xs font-semibold text-slate-400">
                (Demo mode: Enter <strong>1234</strong> or any 4 digits)
              </div>

              {errorMessage && (
                <p className="text-xs font-bold text-rose-600 text-center">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={otpValues.join('').length < 4 || isSubmitting}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition-transform active:scale-95"
              >
                {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
              </button>

              <div className="text-center text-xs text-slate-500">
                {timer > 0 ? (
                  <span className="flex items-center justify-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" /> Resend OTP in {timer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => { setTimer(30); authService.sendOtp(phoneNumber); }}
                    className="text-pink-600 font-bold hover:underline"
                  >
                    Resend OTP Code
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: KID'S NUTRITION PROFILE */}
        {step === 3 && (
          <div>
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-wider">Number Verified</span>
            </div>

            <h2 id="auth-modal-title" className="text-2xl font-black text-slate-800 mb-1">Child's Profile</h2>
            <p className="text-xs text-slate-500 mb-6">
              Help our pediatric board personalize age-appropriate nutrition and honest batch reports.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label htmlFor="auth-parent-name" className="block text-[11px] font-black text-slate-700 mb-1 uppercase tracking-wider">
                  Parent / Guardian Name
                </label>
                <input
                  id="auth-parent-name"
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Pooja Sharma"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label htmlFor="auth-child-name" className="block text-[11px] font-black text-slate-700 mb-1 uppercase tracking-wider">
                  Child's First Name
                </label>
                <input
                  id="auth-child-name"
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g. Aarav"
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <span className="block text-[11px] font-black text-slate-700 mb-1 uppercase tracking-wider">
                  Child's Age Group
                </span>
                <div className="grid grid-cols-2 gap-2" role="group" aria-label="Select Child Age Group">
                  {['2-6 Yr', '4+ Yr', '7-12 Yr', '13-18 Yr'].map((age) => (
                    <button
                      type="button"
                      key={age}
                      onClick={() => setChildAge(age)}
                      aria-pressed={childAge === age}
                      className={`p-2.5 min-h-[44px] rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        childAge === age
                          ? 'bg-pink-50 border-pink-500 text-pink-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition-transform active:scale-95 mt-4"
              >
                Complete Profile &amp; Claim ₹200
              </button>
            </form>
          </div>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 4 && (
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 id="auth-modal-title" className="text-xl font-black text-slate-800 mb-1">Welcome to Little Joys!</h2>
            <p className="text-xs text-slate-500 mb-4">
              ₹200 has been credited to your LJ Wallet.
            </p>
            <div className="inline-block bg-amber-50 text-amber-900 border border-amber-200 text-xs font-black px-4 py-2 rounded-full">
              Wallet Balance: ₹200
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
