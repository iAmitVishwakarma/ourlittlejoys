import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';

export default function MobileBottomNav({ onOpenAuth }) {
  const { cartCount } = useCart();
  const { isAuthenticated } = useAuth();

  const handleProfileClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      onOpenAuth?.();
    }
  };

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-orange-100/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5"
    >
      <div className="flex items-center justify-around">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-pink-600 font-extrabold' : 'text-slate-500 hover:text-slate-900 font-semibold'
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </NavLink>

        {/* Shop All */}
        <NavLink
          to="/shop/all"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-pink-600 font-extrabold' : 'text-slate-500 hover:text-slate-900 font-semibold'
            }`
          }
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Shop</span>
        </NavLink>

        {/* Honest Reports */}
        <NavLink
          to="/honest-report"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-pink-600 font-extrabold' : 'text-slate-500 hover:text-slate-900 font-semibold'
            }`
          }
        >
          <span className="text-base mb-0.5">🔬</span>
          <span className="text-[10px] tracking-tight">Reports</span>
        </NavLink>

        {/* Cart with Badge */}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-pink-600 font-extrabold' : 'text-slate-500 hover:text-slate-900 font-semibold'
            }`
          }
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-pink-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Cart</span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          onClick={handleProfileClick}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-pink-600 font-extrabold' : 'text-slate-500 hover:text-slate-900 font-semibold'
            }`
          }
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">
            {isAuthenticated ? 'Account' : 'Login'}
          </span>
        </NavLink>
      </div>
    </nav>
  );
}
