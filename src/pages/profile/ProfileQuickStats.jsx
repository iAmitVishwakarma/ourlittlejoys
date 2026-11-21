import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Heart, Wallet } from 'lucide-react';

export default function ProfileQuickStats({
  activeTab,
  setActiveTab,
  ordersCount,
  wishlistCount,
  walletBalance,
}) {
  return (
    <section className="grid grid-cols-3 gap-3 sm:gap-4" aria-label="Account quick stats">
      {/* Stat 1: Orders */}
      <button
        onClick={() => setActiveTab('orders')}
        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${
          activeTab === 'orders'
            ? 'bg-white border-[#1F3C24] shadow-xs ring-2 ring-[#1F3C24]/10'
            : 'bg-white border-slate-200/70 hover:border-slate-300 shadow-2xs'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF4EB] text-[#1F3C24] flex items-center justify-center shrink-0 border border-[#C89B58]/30">
            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-black text-slate-900 block truncate">
              {ordersCount} Orders
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-medium block truncate">
              Track &amp; manage
            </span>
          </div>
        </div>
      </button>

      {/* Stat 2: Wishlist */}
      <Link
        to="/wishlist"
        className="p-3.5 sm:p-4 rounded-2xl border text-left transition-all bg-white border-slate-200/70 hover:border-[#1F3C24]/40 hover:shadow-xs shadow-2xs group"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-[#C89B58] flex items-center justify-center shrink-0 border border-amber-200 group-hover:bg-[#FAF4EB] transition-colors">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-black text-slate-900 block truncate">
              {wishlistCount} Wishlist
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-medium block truncate group-hover:text-[#1F3C24] transition-colors">
              Saved favorites &rarr;
            </span>
          </div>
        </div>
      </Link>

      {/* Stat 3: Wallet */}
      <button
        onClick={() => setActiveTab('wallet')}
        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${
          activeTab === 'wallet'
            ? 'bg-white border-amber-300 shadow-xs ring-2 ring-amber-100'
            : 'bg-white border-slate-200/70 hover:border-slate-300 shadow-2xs'
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-black text-slate-900 block truncate">
              ₹{walletBalance} Wallet
            </span>
            <span className="text-[10px] sm:text-xs text-emerald-600 font-bold block truncate">
              Instant 30% saving
            </span>
          </div>
        </div>
      </button>
    </section>
  );
}
