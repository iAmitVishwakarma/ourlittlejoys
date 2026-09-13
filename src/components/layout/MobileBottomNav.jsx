import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';

export default function MobileBottomNav({ onOpenAuth }) {
  const location = useLocation();
  const cartCount = useCartStore((s) => s.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0));
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Hide MobileBottomNav completely on all checkout screens to prevent mobile CTA clipping (F-2.1)
  if (location.pathname.startsWith('/checkout')) {
    return null;
  }

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-orange-100/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5"
    >
      <div className="flex items-center justify-around">
        {/* Home */}
        <NavLink
          to="/"
          aria-label="Home"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-12 min-h-12 py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-pink-600 font-extrabold' : 'text-slate-600 hover:text-slate-900 font-bold'
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </NavLink>

        {/* Shop All */}
        <NavLink
          to="/shop/all"
          aria-label="Shop Products"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-12 min-h-12 py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-pink-600 font-extrabold' : 'text-slate-600 hover:text-slate-900 font-bold'
            }`
          }
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Shop</span>
        </NavLink>

        {/* Honest Reports */}
        <NavLink
          to="/honest-report"
          aria-label="Honest Lab Reports"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-12 min-h-12 py-2.5 px-2.5  transition-all ${
              isActive ? 'bg-pink-600 rounded-full scale-120 -translate-y-1 font-extrabold' : 'text-slate-600 rounded-xl hover:text-slate-900 font-bold'
            }`
          }
        >
          <span className="text-base mb-0.5 leading-none">🔬</span>
          <span className="text-[10px] tracking-tight">Reports</span>
        </NavLink>

        {/* Cart with Badge */}
        <NavLink
          to="/cart"
          aria-label={`Shopping cart with ${cartCount} items`}
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center min-w-12 min-h-12 py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-pink-600 font-extrabold' : 'text-slate-600 hover:text-slate-900 font-bold'
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

        {/* Profile / Login */}
        <NavLink
          to={isAuthenticated ? "/profile" : "/login"}
          state={!isAuthenticated ? { from: { pathname: '/profile' } } : undefined}
          aria-label={isAuthenticated ? 'Parent Account' : 'Log in to account'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-12 min-h-12 py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-pink-600 font-extrabold' : 'text-slate-600 hover:text-slate-900 font-bold'
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
