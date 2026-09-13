import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { resetAppSession } from '@/utils/session';
import { 
  ShoppingCart, 
  Search, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  Smartphone, 
  ShieldCheck, 
  Wallet, 
  ChevronDown, 
  Heart, 
  LogOut, 
  Package
} from 'lucide-react';

export default function Navbar({ cartCount = 0, onOpenCart, onOpenAuth, onOpenAccount }) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const cartItems = useCartStore((s) => s.cartItems);
  const wishlistItems = useWishlistStore((s) => s.wishlistItems);
  
  const ctxCartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const effectiveCartCount = cartCount || ctxCartCount || 0;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    { name: "New Launches", link: "/shop/all?filter=%7B%22newlaunches%22%3A%5B%22newlaunches%22%5D%7D" },
    { name: "Nutrimix", link: "/shop/all?category=Nutrimix" },
    { name: "Gummies", link: "/shop/all?category=Gummies" },
    { name: "Spreads & Sauce", link: "/shop/all?category=Spreads%20%26%20Sauce" },
    { name: "Cereals & Snacks", link: "/shop/all?category=Cereals%20%26%20Snacks" },
    { name: "Protein", link: "/shop/all?category=Protein" },
    { name: "For Moms", link: "/shop/all?category=For%20Moms" },
    { name: "Best Value", link: "/shop/all?category=Best%20Value" },
    { name: "Personal Care", link: "/shop/all?category=Personal%20Care" },
    { name: "Limited Drop", link: "/shop/all?category=Limited%20Drop" },
    { name: "Trial Packs", link: "/shop/all?category=Trial%20Packs" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop/all?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    resetAppSession();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar matching ourlittlejoys.com */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white text-xs font-semibold py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-black uppercase">Save 30%</span>
            <span>Use <strong>LJ Wallet</strong> And Save Upto 30%</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-[11px] tracking-wide">
            <Link to="/honest-report" className="hover:underline flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Honest Reports
            </Link>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1 cursor-pointer hover:underline">
              <Smartphone className="w-3.5 h-3.5" /> Download APP
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 ${isScrolled ? 'glass-effect py-2.5 shadow-md' : 'bg-white/95 backdrop-blur-md py-3.5 border-b border-orange-100'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 group">
              <span className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 group-hover:text-pink-600 transition-colors">
                little<span className="text-pink-500">joys</span>
              </span>
              <span className="text-xl">🍓</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 font-bold text-xs md:text-sm text-slate-700">
              <Link to="/shop/all" className="hover:text-pink-600 transition-colors">
                Shop All
              </Link>

              {/* Shop By Category Dropdown */}
              <div className="relative group" onMouseEnter={() => setIsCategoryDropdownOpen(true)} onMouseLeave={() => setIsCategoryDropdownOpen(false)}>
                <button 
                  aria-haspopup="true" 
                  aria-expanded={isCategoryDropdownOpen}
                  className="flex items-center gap-1 hover:text-pink-600 transition-colors py-2 cursor-pointer focus:outline-none"
                >
                  <span>Shop By Category</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180 text-pink-600' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-orange-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 gap-1">
                      {categories.map((cat) => (
                        <Link
                          key={cat.name}
                          to={cat.link}
                          onClick={() => setIsCategoryDropdownOpen(false)}
                          className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-pink-600 hover:bg-pink-50/80 transition-all flex items-center justify-between group/item"
                        >
                          <span>{cat.name}</span>
                          <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-pink-400">›</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/honest-report" className="hover:text-pink-600 transition-colors flex items-center gap-1 text-pink-600">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Honest Reports</span>
                {/* <span className="bg-pink-100 text-pink-700 text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider scale-90">
                  Lab Tested
                </span> */}
              </Link>

              <Link to="/aboutus" className="hover:text-pink-600 transition-colors">
                About Us
              </Link>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xs xl:max-w-md relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search for "Nutrimix", "Gummies", "Spread"...'
                aria-label="Search products"
                className="w-full bg-slate-100 text-xs md:text-sm pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:border-pink-400 focus:bg-white focus:outline-none transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>

            {/* Action Buttons: Wallet, Wishlist, Login/Account, Cart */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Wallet button linking to /wallet-recharge */}
              <Link
                to={isAuthenticated ? "/wallet-recharge" : "/login"}
                state={!isAuthenticated ? { from: { pathname: '/wallet-recharge' } } : undefined}
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full transition-colors"
                title="LJ Wallet Recharge"
              >
                <Wallet className="w-3.5 h-3.5 text-amber-600" />
                <span>{isAuthenticated ? `₹${user?.walletBalance || 0}` : '₹200 Welcome'}</span>
              </Link>

              {/* Wishlist Heart Icon */}
              <Link
                to={isAuthenticated ? "/wishlist" : "/login"}
                state={!isAuthenticated ? { from: { pathname: '/wishlist' } } : undefined}
                className="relative p-2 text-slate-700 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors flex items-center justify-center min-w-[38px] min-h-[38px]"
                title="My Wishlist"
                aria-label={`Wishlist with ${wishlistItems.length} items`}
              >
                <Heart className="w-4 h-4" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Login or User Name -> Dropdown Menu */}
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 text-slate-700 hover:text-pink-600 transition-colors text-xs font-bold px-2.5 py-1.5 rounded-full hover:bg-slate-100 border border-slate-200/80 cursor-pointer min-h-[38px]"
                    title="Parent Profile"
                    aria-label="Parent Profile Menu"
                  >
                    <span className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-black">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
                    </span>
                    <span className="hidden md:inline truncate max-w-[85px]">{user?.name?.split(' ')[0] || 'Account'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-xs font-black text-slate-900 truncate">{user?.name || 'Parent'}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user?.email || user?.phone || ''}</p>
                        <div className="mt-1.5 flex items-center justify-between text-[11px] bg-amber-50 text-amber-900 px-2 py-1 rounded-lg font-bold">
                          <span>LJ Wallet:</span>
                          <span className="font-black text-amber-700">₹{user?.walletBalance || 0}</span>
                        </div>
                      </div>

                      <div className="py-1 text-xs font-semibold text-slate-700">
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>My Account</span>
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        >
                          <Package className="w-4 h-4 text-slate-400" />
                          <span>My Orders</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-2 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <Heart className="w-4 h-4 text-slate-400" />
                            <span>Wishlist</span>
                          </div>
                          {wishlistItems.length > 0 && (
                            <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                              {wishlistItems.length}
                            </span>
                          )}
                        </Link>
                        <Link
                          to="/wallet-recharge"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                        >
                          <Wallet className="w-4 h-4 text-amber-500" />
                          <span>Recharge Wallet</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  aria-label="Log in to account"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-pink-600 transition-colors text-xs font-bold px-3 py-1.5 rounded-full hover:bg-slate-100 border border-slate-200/80 min-h-[38px] cursor-pointer"
                >
                  <User className="w-4 h-4 text-pink-500" />
                  <span>Login</span>
                </Link>
              )}

              {/* Cart Button linking directly to /cart */}
              <Link
                to={isAuthenticated ? "/cart" : "/login"}
                state={!isAuthenticated ? { from: { pathname: '/cart' } } : undefined}
                className="relative flex items-center gap-1.5 bg-pink-500 hover:bg-pink-600 text-white px-3.5 py-2 min-h-[38px] rounded-full transition-transform active:scale-95 shadow-md shadow-pink-500/25"
                aria-label={`Shopping Cart with ${effectiveCartCount} items`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-xs font-black hidden sm:inline">Cart</span>
                <span className="bg-white text-pink-600 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {effectiveCartCount}
                </span>
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                className="lg:hidden p-2 text-slate-700 hover:text-pink-600 rounded-lg min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-2xl px-6 py-5 mt-2 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search for "Nutrimix", "Gummies"...'
                aria-label="Search products"
                className="w-full bg-slate-100 text-sm pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>

            <div className="flex flex-col space-y-3 font-bold text-slate-800 text-sm">
              <Link to="/shop/all" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-pink-600 py-1">
                Shop All
              </Link>
              <Link to="/honest-report" onClick={() => setIsMobileMenuOpen(false)} className="text-pink-600 py-1 flex items-center justify-between">
                <span>Honest Reports</span>
                <span className="text-[10px] bg-pink-100 px-2 py-0.5 rounded-full font-black">100% Lab Tested</span>
              </Link>
              <Link to="/aboutus" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-pink-600 py-1">
                About Us
              </Link>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider block mb-2">
                  Shop By Category
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {categories.map((c) => (
                    <Link
                      key={c.name}
                      to={c.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-xl bg-[#FFF9F5] text-slate-700 hover:text-pink-600"
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
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-black text-slate-800 hover:text-pink-600 flex items-center gap-2"
                  >
                    <span className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px]">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
                    </span>
                    <span>{user?.name} (Profile)</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-black text-slate-700 flex items-center gap-1.5 hover:text-pink-600"
                  >
                    <User className="w-4 h-4 text-pink-600" />
                    <span>Login / Register</span>
                  </Link>
                )}
                <Link
                  to={isAuthenticated ? "/wallet-recharge" : "/login"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-amber-50 text-amber-800 font-bold px-3 py-1 rounded-full border border-amber-200"
                >
                  {isAuthenticated ? `₹${user?.walletBalance || 0} Balance` : '₹200 Welcome Cash'}
                </Link>
              </div>

              {/* Wishlist Link for Mobile */}
              <Link
                to={isAuthenticated ? "/wishlist" : "/login"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold py-2.5 px-4 rounded-xl flex items-center justify-between border border-rose-200"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>My Wishlist</span>
                </div>
                <span className="bg-rose-500 text-white font-black text-[11px] px-2 py-0.5 rounded-full">
                  {wishlistItems.length} items
                </span>
              </Link>

              {/* Cart Link for Mobile */}
              <Link
                to={isAuthenticated ? "/cart" : "/login"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold py-2.5 px-4 rounded-xl flex items-center justify-between border border-pink-200"
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>View Shopping Bag</span>
                </div>
                <span className="bg-pink-500 text-white font-black text-[11px] px-2 py-0.5 rounded-full">
                  {effectiveCartCount} items
                </span>
              </Link>

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full mt-2 py-2 text-rose-600 font-bold flex items-center justify-center gap-2 border border-rose-200 rounded-xl hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Account</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
