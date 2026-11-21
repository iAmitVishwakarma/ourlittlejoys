import React from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronDown, Package, Wallet, LogOut } from 'lucide-react';

export default function NavUserDropdown({
  isAuthenticated,
  user,
  isOpen,
  setIsOpen,
  menuRef,
  onLogout,
}) {
  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        aria-label="Log in to account"
        className="flex items-center gap-1.5 text-slate-700 hover:text-brand-berry transition-colors text-xs font-bold px-3 py-1.5 rounded-full hover:bg-slate-100 border border-slate-200/80 min-h-9.5 cursor-pointer"
      >
        <User className="w-4 h-4 text-brand-berry" />
        <span>Login</span>
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-slate-700 hover:text-brand-berry transition-colors text-xs font-bold px-2.5 py-1.5 rounded-full hover:bg-slate-100 border border-slate-200/80 cursor-pointer min-h-9.5"
        title="Parent Profile"
        aria-label="Parent Profile Menu"
      >
        <span className="w-6 h-6 rounded-full bg-brand-berry text-white flex items-center justify-center text-[10px] font-black">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
        </span>
        <span className="hidden md:inline truncate max-w-21.25">
          {user?.name?.split(' ')[0] || 'Account'}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute scale-110 top-14 -right-10 mt-2 w-56 bg-white rounded-b-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-2.5 border-b border-slate-100">
            <p className="text-xs font-black text-slate-900 truncate">{user?.name || 'Parent'}</p>
            <p className="text-[11px] text-slate-400 truncate">
              {user?.email || user?.phone || ''}
            </p>
            <div className="mt-1.5 flex items-center justify-between text-[11px] bg-amber-50 text-amber-900 px-2 py-1 rounded-lg font-bold">
              <span>Nestor Wallet:</span>
              <span className="font-black text-amber-700">₹{user?.walletBalance || 0}</span>
            </div>
          </div>

          <div className="py-1 text-xs font-semibold text-slate-700">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF4EB] hover:text-brand-forest transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>My Account</span>
            </Link>
            <Link
              to="/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FAF4EB] hover:text-brand-forest transition-colors"
            >
              <Package className="w-4 h-4 text-slate-400" />
              <span>My Orders</span>
            </Link>
            <Link
              to="/wallet-recharge"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 hover:bg-amber-50 hover:text-amber-800 transition-colors"
            >
              <Wallet className="w-4 h-4 text-amber-500" />
              <span>Recharge Wallet</span>
            </Link>
          </div>

          <div className="pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
