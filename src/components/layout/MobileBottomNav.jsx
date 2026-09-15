import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { Home, ShoppingBag, Microscope, ShoppingCart, User } from 'lucide-react';

export default function MobileBottomNav({ onOpenAuth: _onOpenAuth }) {
  const location = useLocation();
  const cartCount = useCartStore((s) => s.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0));
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Hide MobileBottomNav completely on all checkout screens to prevent mobile CTA clipping (F-2.1)
  if (location.pathname.startsWith('/checkout')) {
    return null;
  }

  // Active + inactive tab classes with ultra-premium styling
  const tabClass = ({ isActive }) =>
    `relative flex flex-col items-center justify-center min-w-[54px] min-h-[48px] py-1 px-1.5 rounded-2xl transition-all duration-200 group ${
      isActive
        ? ' text-brand-forest font-black'
        : 'text-slate-500 hover:text-slate-800 font-semibold active:scale-95'
    }`;

  const iconContainerClass = (isActive) =>
    `relative flex items-center justify-center w-8 h-7 rounded-xl transition-all duration-200 ${
      isActive
        ? 'bg-emerald-100/70 text-brand-forest shadow-xs scale-105'
        : 'group-hover:bg-slate-100/60 text-slate-500'
    }`;

  const iconClass = (isActive) =>
    `w-[20px] h-[20px] transition-transform duration-200 ${
      isActive ? 'stroke-[2.4] text-brand-forest' : 'stroke-[1.8]'
    }`;

  const labelClass = (isActive) =>
    `text-[10px] tracking-tight leading-none mt-0.5 transition-colors duration-200 ${
      isActive ? 'font-black text-brand-forest' : 'font-semibold text-slate-500'
    }`;

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-4px_24px_rgba(0,0,0,0.07)] px-2 pt-1 pb-safe"
      style={{ paddingBottom: `max(env(safe-area-inset-bottom, 6px), 6px)` }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <NavLink
          to="/"
          end
          aria-label="Home"
          className={tabClass}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute -top-1 w-10 h-1 bg-brand-forest rounded-full shadow-xs" />
              )}
              <div className={iconContainerClass(isActive)}>
                <Home className={iconClass(isActive)} />
              </div>
              <span className={labelClass(isActive)}>Home</span>
            </>
          )}
        </NavLink>

        {/* Shop All */}
        <NavLink
          to="/shop/all"
          aria-label="Shop Products"
          className={tabClass}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute -top-1 w-10 h-1 bg-brand-forest rounded-full shadow-xs" />
                 )}
              <div className={iconContainerClass(isActive)}>
                <ShoppingBag className={iconClass(isActive)} />
              </div>
              <span className={labelClass(isActive)}>Shop</span>
            </>
          )}
        </NavLink>

        {/* Honest Reports */}
        <NavLink
          to="/honest-report"
          aria-label="Honest Lab Reports"
          className={tabClass}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute -top-1 w-10 h-1 bg-brand-forest rounded-full shadow-xs" />
              )}
              <div className={iconContainerClass(isActive)}>
                <Microscope className={iconClass(isActive)} />
              </div>
              <span className={labelClass(isActive)}>Reports</span>
            </>
          )}
        </NavLink>

        {/* Cart with Badge */}
        <NavLink
          to="/cart"
          aria-label={cartCount > 0 ? `Shopping cart with ${cartCount} items` : "Shopping cart"}
          className={tabClass}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute -top-1 w-10 h-1 bg-brand-forest rounded-full shadow-xs" />
              )}
              <div className={iconContainerClass(isActive)}>
                <ShoppingCart className={iconClass(isActive)} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-brand-berry text-white text-[9px] font-black min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs ring-2 ring-white animate-in zoom-in-50">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className={labelClass(isActive)}>Cart</span>
            </>
          )}
        </NavLink>

        {/* Profile / Login */}
        <NavLink
          to={isAuthenticated ? "/profile" : "/login"}
          state={!isAuthenticated ? { from: { pathname: '/profile' } } : undefined}
          aria-label={isAuthenticated ? 'Parent Account' : 'Log in to account'}
          className={tabClass}
        >
          {({ isActive }) => (
            <>
              {isActive && (
             <span className="absolute -top-1 w-10 h-1 bg-brand-forest rounded-full shadow-xs" />
              )}
              <div className={iconContainerClass(isActive)}>
                <User className={iconClass(isActive)} />
              </div>
              <span className={labelClass(isActive)}>
                {isAuthenticated ? 'Account' : 'Login'}
              </span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
