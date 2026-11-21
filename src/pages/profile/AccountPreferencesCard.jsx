import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AccountPreferencesCard({ childName = 'your child' }) {
  const [preferences, setPreferences] = useState({
    whatsapp: true,
    nutritionDigest: true,
    birthdayCash: true,
  });

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="h-full flex flex-col justify-between bg-white border border-stone-200/80 rounded-2xl p-6 shadow-2xs">
      <div>
        {/* Header */}
        <div className="border-b border-stone-100 pb-3.5 mb-5">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#C89B58] block">
            PREFERENCES
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
            Account Preferences
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Customize communication channels and milestone notifications.
          </p>
        </div>

        {/* Custom Accessible Toggles List */}
        <div className="space-y-4 divide-y divide-slate-100 text-xs">
          {/* Toggle 1: WhatsApp */}
          <div className="pt-3 first:pt-0 flex items-center justify-between gap-3">
            <div className="min-w-0 pr-2">
              <span className="font-bold text-slate-800 block text-xs">
                WhatsApp Order Tracking
              </span>
              <span className="text-slate-400 text-[11px] leading-tight block mt-0.5">
                Receive live dispatch &amp; out-for-delivery alerts.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.whatsapp}
              onClick={() => togglePreference('whatsapp')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-[#1F3C24] focus:ring-offset-2 ${
                preferences.whatsapp ? 'bg-[#1F3C24]' : 'bg-slate-200'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  preferences.whatsapp ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Weekly Digest */}
          <div className="pt-3.5 flex items-center justify-between gap-3">
            <div className="min-w-0 pr-2">
              <span className="font-bold text-slate-800 block text-xs">
                Weekly Pediatric Nutrition Tips
              </span>
              <span className="text-slate-400 text-[11px] leading-tight block mt-0.5">
                Bite-sized growth roadmap tailored to {childName}'s age.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.nutritionDigest}
              onClick={() => togglePreference('nutritionDigest')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-[#1F3C24] focus:ring-offset-2 ${
                preferences.nutritionDigest ? 'bg-[#1F3C24]' : 'bg-slate-200'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  preferences.nutritionDigest ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: Birthday Surprise Cash */}
          <div className="pt-3.5 flex items-center justify-between gap-3">
            <div className="min-w-0 pr-2">
              <span className="font-bold text-slate-800 block text-xs">
                Birthday Surprise Cash (₹200)
              </span>
              <span className="text-slate-400 text-[11px] leading-tight block mt-0.5">
                Automatic wallet credit on {childName}'s birthday month.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.birthdayCash}
              onClick={() => togglePreference('birthdayCash')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-[#1F3C24] focus:ring-offset-2 ${
                preferences.birthdayCash ? 'bg-[#1F3C24]' : 'bg-slate-200'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  preferences.birthdayCash ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
        <span className="text-slate-500 truncate">Need dedicated support?</span>
        <Link
          to="/contact"
          className="text-[#1F3C24] hover:text-[#C89B58] font-black hover:underline whitespace-nowrap inline-flex items-center gap-1 shrink-0"
        >
          <span>Contact Support &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
