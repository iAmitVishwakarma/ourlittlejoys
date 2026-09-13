import React from 'react';
import { Link } from 'react-router-dom';

export default function ProfileDetailsTab({
  userName,
  userPhone,
  userEmail,
  childName
}) {
  return (
    <div className="space-y-6">
      {/* Parent Contact Details */}
      <div className="bg-white rounded-3xl p-6 border border-orange-100/90 shadow-2xs space-y-4">
        <h3 className="text-base font-black text-slate-900">
          Parent Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5">
            <span className="text-slate-400 font-bold block mb-1">
              Full Name
            </span>
            <span className="text-slate-900 font-bold text-sm">
              {userName || 'Parent'}
            </span>
          </div>
          <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5">
            <span className="text-slate-400 font-bold block mb-1">
              Mobile Number
            </span>
            <span className="text-slate-900 font-bold text-sm">
              +91 {userPhone || '7772929755'}
            </span>
          </div>
          <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5 sm:col-span-2">
            <span className="text-slate-400 font-bold block mb-1">
              Email Address
            </span>
            <span className="text-slate-900 font-bold text-sm">
              {userEmail || 'parent@littlejoys.com'}
            </span>
          </div>
        </div>
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
          <span className="text-slate-500">Need to update your mobile number?</span>
          <Link to="/contact" className="text-[#FF2F92] font-black hover:underline">
            Contact Support &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
