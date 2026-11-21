import React from 'react';
import SEO from '@/components/common/SEO';

export default function ProfileLoginView({
  otpSent,
  phoneNumber,
  setPhoneNumber,
  otp,
  setOtp,
  loginError,
  setOtpSent,
  onSendOtp,
  onVerifyOtp,
  onQuickDemoLogin,
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-brand-cream">
      <SEO
        title="Parent Account Login | Nestor"
        description="Sign in to your Nestor account to track orders, manage your child's nutrition profile, and view your Nestor Wallet."
      />
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-[#C89B58]/30 p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div
            className="w-16 h-16 rounded-2xl bg-[#FAF4EB] border border-[#C89B58]/30 flex items-center justify-center mx-auto text-3xl shadow-xs"
            aria-hidden="true"
          >
            🌿
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-brand-display">
            Parent Account Login
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Sign in with your mobile number to view orders, track delivery,
            and use your Nestor Wallet balance.
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={onSendOtp} className="space-y-4">
            <div>
              <label
                htmlFor="profile-phone-input"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Mobile Number
              </label>
              <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden focus-within:border-[#1F3C24] bg-slate-50 transition-colors">
                <span className="px-3.5 text-xs font-bold text-slate-500 border-r border-slate-200">
                  +91
                </span>
                <input
                  id="profile-phone-input"
                  type="tel"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, ''))
                  }
                  placeholder="Enter 10-digit number"
                  className="w-full px-3 py-3 text-sm font-bold bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            {loginError && (
              <p className="text-xs font-bold text-rose-500">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#1F3C24] hover:bg-[#142718] text-white font-black py-3.5 rounded-2xl shadow-sm transition-all active:scale-98 min-h-11"
            >
              Send OTP
            </button>

            <div className="relative flex py-1 items-center">
              <div className="grow border-t border-slate-200"></div>
              <span className="shrink mx-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Or Instant Review
              </span>
              <div className="grow border-t border-slate-200"></div>
            </div>

            <button
              type="button"
              onClick={onQuickDemoLogin}
              className="w-full bg-[#FAF4EB] hover:bg-[#F3EAD9] text-[#1F3C24] border border-[#C89B58]/40 font-extrabold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>⚡ Quick Login as Amit Vishwakarma</span>
            </button>
          </form>
        ) : (
          <form onSubmit={onVerifyOtp} className="space-y-4">
            <div className="bg-[#FAF4EB] border border-[#C89B58]/30 rounded-2xl p-3 text-xs text-[#1F3C24] flex justify-between items-center">
              <span>OTP sent to +91 {phoneNumber}</span>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="font-bold underline text-[#C89B58] hover:text-[#1F3C24]"
              >
                Edit
              </button>
            </div>

            <div>
              <label
                htmlFor="profile-otp-input"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                Enter 4-Digit OTP
              </label>
              <input
                id="profile-otp-input"
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 1234"
                className="w-full text-center tracking-widest text-lg font-black py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#1F3C24] bg-slate-50"
                required
              />
            </div>

            {loginError && (
              <p className="text-xs font-bold text-rose-500">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#1F3C24] hover:bg-[#142718] text-white font-black py-3.5 rounded-2xl shadow-sm transition-all active:scale-98 min-h-11"
            >
              Verify &amp; Login
            </button>
          </form>
        )}

        <div className="bg-[#FAF4EB] rounded-2xl p-3.5 border border-[#C89B58]/30 text-center">
          <p className="text-[11px] font-bold text-[#1F3C24]">
            🎁 Instant ₹200 welcome wallet cash credited to all verified parent accounts!
          </p>
        </div>
      </div>
    </div>
  );
}
