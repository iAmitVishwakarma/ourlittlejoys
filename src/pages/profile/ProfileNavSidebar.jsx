import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  User,
  MapPin,
  Wallet,
  Settings,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { resetAppSession } from '@/utils/session';

export default function ProfileNavSidebar({
  activeTab,
  onTabSelect,
  ordersCount,
  walletBalance,
}) {
  const navigate = useNavigate();

  return (
    <aside className="lg:col-span-3 space-y-3">
      <div
        className="bg-white rounded-3xl p-3.5 border border-orange-100/90 shadow-2xs space-y-1"
        role="tablist"
        aria-label="Account navigation menu"
      >
        <div className="px-3 pt-2 pb-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
            Account Navigation
          </span>
        </div>

        {/* 1. My Orders */}
        <button
          role="tab"
          aria-selected={activeTab === 'orders'}
          onClick={() => onTabSelect('orders')}
          className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs md:text-sm transition-all min-h-11 ${
            activeTab === 'orders'
              ? 'bg-[#1F3C24] text-white shadow-xs shadow-[#1F3C24]/25'
              : 'text-slate-700 hover:bg-[#FAF4EB]'
          }`}
        >
          <div className="flex items-center gap-3">
            <Package
              className={`w-4 h-4 ${activeTab === 'orders' ? 'text-white' : 'text-slate-500'}`}
            />
            <span>My Orders</span>
          </div>
          <span
            className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
              activeTab === 'orders'
                ? 'bg-white/20 text-white'
                : 'bg-[#FAF4EB] text-[#1F3C24]'
            }`}
          >
            {ordersCount}
          </span>
        </button>

        {/* 2. Personal & Child Profile */}
        <button
          role="tab"
          aria-selected={activeTab === 'profile'}
          onClick={() => onTabSelect('profile')}
          className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs md:text-sm transition-all min-h-11 ${
            activeTab === 'profile'
              ? 'bg-[#1F3C24] text-white shadow-xs shadow-[#1F3C24]/25'
              : 'text-slate-700 hover:bg-[#FAF4EB]'
          }`}
        >
          <div className="flex items-center gap-3">
            <User
              className={`w-4 h-4 ${activeTab === 'profile' ? 'text-white' : 'text-slate-500'}`}
            />
            <span className="truncate">Personal &amp; Child Profile</span>
          </div>
          <ChevronRight
            className={`w-4 h-4 ${activeTab === 'profile' ? 'text-white' : 'text-slate-300'}`}
          />
        </button>

        {/* 3. Saved Delivery Addresses */}
        <button
          role="tab"
          aria-selected={activeTab === 'addresses'}
          onClick={() => onTabSelect('addresses')}
          className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs md:text-sm transition-all min-h-11 ${
            activeTab === 'addresses'
              ? 'bg-[#1F3C24] text-white shadow-xs shadow-[#1F3C24]/25'
              : 'text-slate-700 hover:bg-[#FAF4EB]'
          }`}
        >
          <div className="flex items-center gap-3">
            <MapPin
              className={`w-4 h-4 ${activeTab === 'addresses' ? 'text-white' : 'text-slate-500'}`}
            />
            <span className="truncate">Saved Delivery Addresses</span>
          </div>
          <ChevronRight
            className={`w-4 h-4 ${activeTab === 'addresses' ? 'text-white' : 'text-slate-300'}`}
          />
        </button>

        {/* 4. LJ Wallet Ledger */}
        <button
          role="tab"
          aria-selected={activeTab === 'wallet'}
          onClick={() => onTabSelect('wallet')}
          className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs md:text-sm transition-all min-h-11 ${
            activeTab === 'wallet'
              ? 'bg-[#1F3C24] text-white shadow-xs shadow-[#1F3C24]/25'
              : 'text-slate-700 hover:bg-[#FAF4EB]'
          }`}
        >
          <div className="flex items-center gap-3">
            <Wallet
              className={`w-4 h-4 ${activeTab === 'wallet' ? 'text-white' : 'text-slate-500'}`}
            />
            <span>Nestor Wallet Ledger</span>
          </div>
          <span
            className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
              activeTab === 'wallet'
                ? 'bg-white/20 text-white'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            ₹{walletBalance}
          </span>
        </button>

        {/* 5. Account Settings */}
        <button
          role="tab"
          aria-selected={activeTab === 'settings'}
          onClick={() => onTabSelect('settings')}
          className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs md:text-sm transition-all min-h-11 ${
            activeTab === 'settings'
              ? 'bg-[#1F3C24] text-white shadow-xs shadow-[#1F3C24]/25'
              : 'text-slate-700 hover:bg-[#FAF4EB]'
          }`}
        >
          <div className="flex items-center gap-3">
            <Settings
              className={`w-4 h-4 ${activeTab === 'settings' ? 'text-white' : 'text-slate-500'}`}
            />
            <span>Account Settings</span>
          </div>
          <ChevronRight
            className={`w-4 h-4 ${activeTab === 'settings' ? 'text-white' : 'text-slate-300'}`}
          />
        </button>

        {/* Logout */}
        <div className="pt-2 border-t border-slate-100 mt-1">
          <button
            onClick={() => {
              resetAppSession();
              navigate('/');
            }}
            className="w-full flex items-center gap-3 p-3 rounded-2xl font-extrabold text-xs md:text-sm text-rose-600 hover:bg-rose-50/80 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
