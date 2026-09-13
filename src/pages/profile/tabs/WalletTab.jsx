import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function WalletTab({
  walletBalance = 200
}) {
  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 text-white shadow-md shadow-orange-500/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-white/80 uppercase tracking-widest">
            Available Balance
          </span>
          <p className="text-3xl font-black mt-1">
            ₹{walletBalance}
          </p>
          <p className="text-xs text-white/90 mt-1">
            Save up to 30% automatically on every checkout!
          </p>
        </div>
        <Link
          to="/wallet-recharge"
          className="bg-white hover:bg-orange-50 text-slate-900 text-xs font-black px-5 py-3 rounded-2xl shadow-xs transition-transform active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-pink-600" />
          <span>Top-up Wallet (+30% Extra)</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-2xs border border-orange-100/90 space-y-4">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
          Recent Wallet Transactions
        </h3>
        <div className="divide-y divide-slate-100 text-xs font-medium">
          <div className="py-3 flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800">Welcome Cashback Credit</p>
              <span className="text-[11px] text-slate-400">01 Sep, 2026</span>
            </div>
            <span className="font-black text-emerald-600 text-sm">+ ₹200</span>
          </div>
          <div className="py-3 flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800">Used on Order #LJ-ORD-9824</p>
              <span className="text-[11px] text-slate-400">08 Sep, 2026</span>
            </div>
            <span className="font-black text-slate-800 text-sm">- ₹298</span>
          </div>
          <div className="py-3 flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800">LJ Wallet 30% Bonus Top-up</p>
              <span className="text-[11px] text-slate-400">10 Sep, 2026</span>
            </div>
            <span className="font-black text-emerald-600 text-sm">+ ₹300</span>
          </div>
        </div>
      </div>
    </div>
  );
}
