import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function ProfileActionCards({ onShowToast }) {
  const handleCopyReferral = () => {
    const referralLink = 'https://nestorhealth.in?ref=AMIT200';
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(referralLink);
    }
    if (onShowToast) {
      onShowToast(
        'Referral link copied! 📋',
        'Share with fellow parents to give ₹200 & get ₹200.'
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mt-6">
      {/* Card 1: Loved your products? */}
      <div className="rounded-2xl p-6 h-full flex flex-col justify-between border border-stone-200/80 bg-white shadow-2xs">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-xl shrink-0">
              🌿
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black text-slate-900 leading-tight">
                Loved your products?
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Keep the daily wholesome habit going.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mt-2">
            Restock clean doctor-formulated organic nutrition essentials to ensure your child never misses a milestone.
          </p>
        </div>

        <Link
          to="/shop/all"
          className="mt-6 w-full py-2.5 rounded-xl bg-[#1F3C24] hover:bg-[#142718] text-white font-bold text-xs text-center transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-98"
        >
          <span>Shop Again &rarr;</span>
        </Link>
      </div>

      {/* Card 2: Need Help? */}
      <div className="rounded-2xl p-6 h-full flex flex-col justify-between border border-stone-200/80 bg-white shadow-2xs">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xl shrink-0">
              💬
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black text-slate-900 leading-tight">
                Need Help?
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                We're here for you and your family.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs font-bold text-slate-700 pt-1">
            <Link
              to="/orders"
              className="w-full flex items-center justify-between gap-2 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <span>Track Order</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </Link>

            <Link
              to="/faq"
              className="w-full flex items-center justify-between gap-2 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <span>Returns &amp; Refunds</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </Link>

            <Link
              to="/contact"
              className="w-full flex items-center justify-between gap-2 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <span>Contact Support</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </Link>
          </div>
        </div>

        <div className="pt-3 text-[11px] text-slate-400 border-t border-slate-100 mt-4">
          Response time usually under 2 hours.
        </div>
      </div>

      {/* Card 3: Give the gift of health */}
      <div className="rounded-2xl p-6 h-full flex flex-col justify-between border border-[#C89B58]/30 bg-[#FAF4EB] shadow-2xs">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#C89B58]/20 flex items-center justify-center text-xl shrink-0 shadow-2xs">
              🎁
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black text-slate-900 leading-tight">
                Give the gift of health
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Share Nestor with friends &amp; family.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 text-left leading-relaxed mt-2">
            Invite fellow parents to experience cleaner, honest child nutrition. They get ₹200 off their first order, and you get ₹200 in your Nestor Wallet.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyReferral}
          className="mt-6 text-xs font-black text-[#1F3C24] hover:text-[#C89B58] hover:underline inline-flex items-center gap-1 whitespace-nowrap cursor-pointer text-left"
        >
          <span>Refer Now &rarr;</span>
        </button>
      </div>
    </div>
  );
}
