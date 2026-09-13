import React, { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { 
  X, 
  User, 
  Wallet, 
  Package, 
  Heart, 
  LogOut, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function UserAccountDrawer({ isOpen, onClose }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [activeTab, setActiveTab] = useState('wallet'); // 'wallet', 'orders', 'child'

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="account-drawer-title"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-pink-50 to-amber-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-pink-500/20">
                {user.name ? user.name.charAt(0).toUpperCase() : 'P'}
              </div>
              <div>
                <h2 id="account-drawer-title" className="font-black text-slate-800 text-base">{user.name || 'Parent'}</h2>
                <p className="text-xs text-slate-500 font-semibold">+91 {user.phone}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close account drawer"
              className="w-11 h-11 rounded-full hover:bg-white text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div role="tablist" aria-label="Account Tabs" className="flex border-b border-slate-100 px-6 pt-3 gap-6 text-xs font-black uppercase tracking-wider">
            <button
              role="tab"
              aria-selected={activeTab === 'wallet'}
              onClick={() => setActiveTab('wallet')}
              className={`pb-3 min-h-[44px] flex items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
                activeTab === 'wallet'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>LJ Wallet</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'orders'}
              onClick={() => setActiveTab('orders')}
              className={`pb-3 min-h-[44px] flex items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>My Orders</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'child'}
              onClick={() => setActiveTab('child')}
              className={`pb-3 min-h-[44px] flex items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
                activeTab === 'child'
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Child Profile</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* TAB 1: WALLET */}
            {activeTab === 'wallet' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 text-white rounded-3xl p-6 shadow-lg shadow-amber-500/20 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-100">
                        Little Joys Wallet Balance
                      </span>
                      <div className="text-3xl font-black mt-1">₹{user.walletBalance || 200}</div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl">
                      🪙
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs font-bold text-amber-50">
                    <span>Active Member Cash</span>
                    <span className="bg-white text-amber-800 px-2.5 py-0.5 rounded-full text-[10px]">
                      Instant Checkout Auto-Apply
                    </span>
                  </div>
                </div>

                <div className="bg-[#FFF9F5] p-4 rounded-2xl border border-orange-100 space-y-2">
                  <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    <span>How to use your LJ Wallet:</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1.5 pl-5 list-disc leading-relaxed">
                    <li>Use on any order to save up to <strong>30% automatically</strong>.</li>
                    <li>Earn 5% cashback on all recurring Nutrimix &amp; Gummies refills.</li>
                    <li>Never expires as long as your account remains active.</li>
                  </ul>
                </div>

                <button
                  onClick={() => alert("Added ₹100 promotional cash! New balance: ₹300")}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-full text-xs uppercase tracking-wider transition-transform active:scale-95"
                >
                  + Add Wallet Cash / Redeem Gift Card
                </button>
              </div>
            )}

            {/* TAB 2: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="bg-[#FFF9F5] rounded-2xl p-4 border border-orange-100 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Out for Delivery
                      </span>
                      <h4 className="font-black text-sm text-slate-800 mt-1">Order #LJ-2026-9810</h4>
                    </div>
                    <span className="text-xs font-black text-slate-900">₹999</span>
                  </div>

                  <p className="text-xs text-slate-500">
                    Nutrimix Chocolate (350g) + Multivitamin Gummies 4+ (30N)
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 pt-2 border-t border-orange-200/50">
                    <Clock className="w-3.5 h-3.5 text-pink-500" />
                    <span>Expected by Monday, 14th Sept 2026</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 opacity-80">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md">
                        Delivered
                      </span>
                      <h4 className="font-black text-sm text-slate-700 mt-1">Order #LJ-2026-8431</h4>
                    </div>
                    <span className="text-xs font-black text-slate-800">₹499</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Multivitamin Gummies 4+ (30N) • Delivered on 28th Aug 2026
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: CHILD PROFILE */}
            {activeTab === 'child' && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-5 border border-orange-100 shadow-xs space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-2xl">
                      🧒
                    </div>
                    <div>
                      <h4 className="font-black text-base text-slate-800">{user.childName || 'Aarav'}</h4>
                      <span className="text-xs text-pink-600 font-bold bg-pink-50 px-2.5 py-0.5 rounded-full">
                        {user.childAge || '2-6 Yr'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Recommended Daily Nutrition:</span>
                      <strong className="text-slate-800">Nutrimix Chocolate (2-6 Yr)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Immunity Support:</span>
                      <strong className="text-slate-800">Zero Sugar Gummies 4+</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Batch Lab Report:</span>
                      <strong className="text-emerald-600 font-bold">Passed 100%</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Logout */}
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <button
              onClick={() => { logout(); onClose(); }}
              className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-red-600 transition-colors uppercase tracking-wider"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>

            <span className="text-[11px] font-bold text-slate-400">
              App Version 2.4.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
