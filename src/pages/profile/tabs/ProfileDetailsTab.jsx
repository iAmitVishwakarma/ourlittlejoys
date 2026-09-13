import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Check, AlertCircle, Save, X } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function ProfileDetailsTab({
  userName,
  userPhone,
  userEmail,
  childName,
  onSaveParentProfile,
}) {
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userName || '');
  const [phone, setPhone] = useState(userPhone || '');
  const [email, setEmail] = useState(userEmail || '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Keep form in sync if store/props update
  useEffect(() => {
    if (!isEditing) {
      setName(userName || '');
      setPhone(userPhone || '');
      setEmail(userEmail || '');
    }
  }, [userName, userPhone, userEmail, isEditing]);

  const handleStartEdit = () => {
    setName(userName || '');
    setPhone(userPhone || '');
    setEmail(userEmail || '');
    setError('');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setName(userName || '');
    setPhone(userPhone || '');
    setEmail(userEmail || '');
    setError('');
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setError('Please enter your full name (at least 2 characters).');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address (e.g. parent@example.com).');
      return;
    }

    setIsSaving(true);

    try {
      const updatedFields = {
        name: trimmedName,
        phone: cleanPhone,
        email: trimmedEmail,
      };

      if (onSaveParentProfile) {
        await onSaveParentProfile(updatedFields);
      } else {
        await updateProfile(updatedFields);
      }

      setIsSaving(false);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setIsSaving(false);
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Parent Contact Details */}
      <div className="bg-white rounded-3xl p-6 border border-orange-100/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-orange-100/60 pb-3.5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-pink-600 block">
              Personal Account
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span>Parent Details</span>
              {saveSuccess && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 animate-in fade-in">
                  <Check className="w-3 h-3 stroke-3" />
                  Saved!
                </span>
              )}
            </h3>
          </div>

          {!isEditing && (
            <button
              onClick={handleStartEdit}
              className="text-xs font-black text-[#FF2F92] bg-pink-50/80 px-3.5 py-1.5 rounded-xl border border-pink-200 shadow-2xs hover:bg-pink-100 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Details &rarr;</span>
            </button>
          )}
        </div>

        {!isEditing ? (
          /* View Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5">
              <span className="text-slate-400 font-bold block mb-1">
                Full Name
              </span>
              <span className="text-slate-900 font-black text-sm">
                {userName || 'Parent'}
              </span>
            </div>
            <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5">
              <span className="text-slate-400 font-bold block mb-1">
                Mobile Number
              </span>
              <span className="text-slate-900 font-black text-sm">
                +91 {userPhone || '7772929755'}
              </span>
            </div>
            <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5 sm:col-span-2">
              <span className="text-slate-400 font-bold block mb-1">
                Email Address
              </span>
              <span className="text-slate-900 font-black text-sm">
                {userEmail || 'parent@littlejoys.com'}
              </span>
            </div>
          </div>
        ) : (
          /* Edit Mode Form */
          <form onSubmit={handleSubmit} className="space-y-4 bg-orange-50/40 p-4 sm:p-5 rounded-2xl border border-orange-100">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl p-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="parent-edit-name"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="parent-edit-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amit Vishwakarma"
                  className="w-full text-xs font-bold px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="parent-edit-phone"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden focus-within:border-pink-500 bg-white transition-colors">
                  <span className="px-3 text-xs font-bold text-slate-500 border-r border-slate-200 bg-slate-50">
                    +91
                  </span>
                  <input
                    id="parent-edit-phone"
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit number"
                    className="w-full px-3 py-2.5 text-xs font-bold bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="parent-edit-email"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="parent-edit-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full text-xs font-bold px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2.5 justify-end pt-2 border-t border-orange-100">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 bg-[#FF2F92] hover:bg-pink-600 text-white text-xs font-black rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save Parent Profile'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Account Preferences / Communication */}
      <div className="bg-white rounded-3xl p-6 border border-orange-100/90 shadow-2xs space-y-6">
        <div>
          <h2 className="text-lg font-black text-slate-900">Account Preferences</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Customize your communication channels and milestone notifications.
          </p>
        </div>

        <div className="space-y-4 divide-y divide-slate-100 text-xs">
          <div className="pt-3 first:pt-0 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">WhatsApp Order Tracking</span>
              <span className="text-slate-400 text-[11px]">Receive live dispatch &amp; out-for-delivery alerts.</span>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-600" />
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">Weekly Pediatric Nutrition Tips</span>
              <span className="text-slate-400 text-[11px]">Bite-sized growth roadmap tailored to {childName || 'your child'}'s age.</span>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-600" />
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">Birthday Surprise Cash (₹200)</span>
              <span className="text-slate-400 text-[11px]">Automatic wallet credit on {childName || 'your child'}'s birthday month.</span>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-600" />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Need help with your account?</span>
          <Link to="/contact" className="text-[#FF2F92] font-black hover:underline">
            Contact Support &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
