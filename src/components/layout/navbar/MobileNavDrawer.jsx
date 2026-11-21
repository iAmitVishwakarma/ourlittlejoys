import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, LogOut } from 'lucide-react';

const mobileMenuClass = ({ isActive }) =>
  `py-2 px-3 rounded-xl transition-all duration-200 flex items-center gap-2 ${
    isActive
      ? 'text-[#1F3C24] font-extrabold bg-[#FAF4EB] border-l-3 border-[#1F3C24]'
      : 'text-slate-800 hover:text-[#1F3C24] font-bold'
  }`;

export default function MobileNavDrawer({
  isOpen,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  categories,
  isAuthenticated,
  user,
  wishlistCount,
  effectiveCartCount,
  onLogout,
}) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white border-t border-slate-100 shadow-2xl px-4 sm:px-6 py-5 mt-2 space-y-4 max-h-[80vh] overflow-y-auto touch-scroll">
      <form onSubmit={onSearchSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search for "Nutrimix", "Gummies"...'
          aria-label="Search products"
          className="w-full bg-slate-100 text-sm pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:border-brand-berry"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      </form>

      <div className="flex flex-col space-y-1 font-bold text-slate-800 text-sm">
        <NavLink to="/shop/all" end className={mobileMenuClass}>
          Shop All
        </NavLink>
        <NavLink to="/honest-report" className={mobileMenuClass}>
          {({ isActive }) => (
            <div className="flex items-center justify-between w-full">
              <span>Honest Reports</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  isActive
                    ? 'bg-[#1F3C24] text-white'
                    : 'bg-[#FAF4EB] text-[#1F3C24]'
                }`}
              >
                100% Lab Tested
              </span>
            </div>
          )}
        </NavLink>
        <NavLink to="/aboutus" className={mobileMenuClass}>
          About Us
        </NavLink>

        <div className="pt-3 border-t border-slate-100">
          <span className="text-xs font-black uppercase text-slate-400 tracking-wider block mb-2 px-3">
            Shop By Category
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {categories.map((c) => (
              <Link
                key={c.name}
                to={c.link}
                className="p-2.5 rounded-xl bg-brand-cream text-slate-700 hover:text-brand-forest hover:bg-[#FAF4EB] transition-colors font-bold"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex flex-col gap-3 text-xs">
        <div className="flex items-center justify-between">
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="font-black text-slate-800 hover:text-brand-forest flex items-center gap-2"
            >
              <span className="w-6 h-6 rounded-full bg-[#1F3C24] text-white flex items-center justify-center text-[10px]">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
              </span>
              <span>{user?.name} (Profile)</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="font-black text-slate-700 flex items-center gap-1.5 hover:text-brand-forest"
            >
              <User className="w-4 h-4 text-brand-forest" />
              <span>Login / Register</span>
            </Link>
          )}
          <Link
            to={isAuthenticated ? "/wallet-recharge" : "/login"}
            className="bg-amber-50 text-amber-800 font-bold px-3 py-1 rounded-full border border-amber-200"
          >
            {isAuthenticated ? `₹${user?.walletBalance || 0} Balance` : '₹200 Welcome Cash'}
          </Link>
        </div>

        <Link
          to={isAuthenticated ? "/wishlist" : "/login"}
          className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold py-2.5 px-4 rounded-xl flex items-center justify-between border border-rose-200 min-h-11"
        >
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>My Wishlist</span>
          </div>
          <span className="bg-rose-500 text-white font-black text-[11px] px-2 py-0.5 rounded-full">
            {wishlistCount} items
          </span>
        </Link>

        <Link
          to={isAuthenticated ? "/cart" : "/login"}
          className="w-full bg-[#FAF4EB] hover:bg-[#F3EAD9] text-[#1F3C24] font-bold py-2.5 px-4 rounded-xl flex items-center justify-between border border-[#C89B58]/30 min-h-11"
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            <span>View Shopping Bag</span>
          </div>
          <span className="bg-[#1F3C24] text-white font-black text-[11px] px-2 py-0.5 rounded-full">
            {effectiveCartCount} items
          </span>
        </Link>

        {isAuthenticated && (
          <button
            type="button"
            onClick={onLogout}
            className="w-full mt-2 py-2.5 text-rose-600 font-bold flex items-center justify-center gap-2 border border-rose-200 rounded-xl hover:bg-rose-50 min-h-11 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out of Account</span>
          </button>
        )}
      </div>
    </div>
  );
}
