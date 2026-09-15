import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
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
  Package,
  ArrowLeft,
  Truck
} from 'lucide-react';

// Free shipping threshold (in ₹)
const FREE_SHIPPING_THRESHOLD = 499;

export default function Navbar({ cartCount = 0, onOpenCart, onOpenAuth, onOpenAccount }) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  
  // Fine-grained primitive selectors to avoid navbar re-renders when item attributes change (F-5.2)
  const ctxCartCount = useCartStore((s) => s.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0));
  const cartTotal = useCartStore((s) => s.cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0));
  const effectiveCartCount = cartCount || ctxCartCount || 0;
  const wishlistCount = useWishlistStore((s) => (s.wishlistItems || []).length);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Shipping progress calculation
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const shippingProgress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Sync search input with URL search param
  useEffect(() => {
    const urlQuery = searchParams.get('search');
    if (urlQuery !== null && urlQuery !== undefined) {
      setSearchQuery(urlQuery);
    }
  }, [searchParams]);

  // Autofocus search input when mobile search bar opens
  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location.pathname]);

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
    if (e && e.preventDefault) e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/shop/all?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/shop/all');
    }
    setIsMobileSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    resetAppSession();
    navigate('/');
  };

  // Desktop NavLink active class helper
  const desktopNavClass = ({ isActive }) =>
    `relative px-3 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all duration-200 ${
      isActive
        ? 'text-brand-berry bg-brand-berry-50 shadow-xs'
        : 'text-slate-700 hover:text-brand-berry hover:bg-pink-50/50'
    }`;

  // Active indicator dot for desktop NavLinks
  const NavDot = ({ isActive }) =>
    isActive ? (
      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-berry nav-active-dot" />
    ) : null;

  // Mobile menu link class helper
  const mobileMenuClass = ({ isActive }) =>
    `py-2 px-3 rounded-xl transition-all duration-200 flex items-center gap-2 ${
      isActive
        ? 'text-brand-berry font-extrabold bg-brand-berry-50 border-l-3 border-brand-berry'
        : 'text-slate-800 hover:text-brand-berry font-bold'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar — Premium Gradient */}
      <div className="bg-linear-to-r from-amber-600 via-brand-berry to-pink-600 text-white text-xs font-semibold py-2 px-3 sm:px-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Shipping progress or promo */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {effectiveCartCount > 0 && shippingRemaining > 0 ? (
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Truck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate text-[11px] sm:text-xs">
                  Add <strong>₹{shippingRemaining}</strong> more for <strong>FREE Shipping!</strong>
                </span>
                <div className="hidden sm:flex items-center gap-1 shrink-0">
                  <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black">{Math.round(shippingProgress)}%</span>
                </div>
              </div>
            ) : effectiveCartCount > 0 && shippingRemaining <= 0 ? (
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px] sm:text-xs font-black">🎉 You've unlocked FREE Shipping!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 min-w-0">
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-black uppercase shrink-0">Save 30%</span>
                <span className="truncate text-[11px] sm:text-xs">Use <strong>LJ Wallet</strong> & Save Upto 30%</span>
              </div>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-6 text-[11px] tracking-wide shrink-0">
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
      <nav className={`w-full transition-all duration-300 ${isScrolled ? 'glass-effect py-2 sm:py-2.5 shadow-md' : 'bg-white/95 backdrop-blur-md py-2.5 sm:py-3.5 border-b border-orange-100'}`}>
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          {/* 1. MOBILE EXPANDED FULL-WIDTH SEARCH BAR */}
          {isMobileSearchOpen ? (
            <div className="flex md:hidden items-center w-full gap-2 py-0.5 animate-in fade-in duration-200">
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(false)}
                aria-label="Close search bar"
                className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <form
                onSubmit={handleSearchSubmit}
                className="relative flex-1 flex items-center"
              >
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  ref={mobileSearchInputRef}
                  type="search"
                  enterKeyHint="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search "Nutrimix", "Gummies"...'
                  aria-label="Search catalog"
                  className="w-full bg-slate-100 text-sm font-medium pl-10 pr-8 py-2.5 rounded-full border border-slate-200 focus:border-brand-berry focus:bg-white focus:outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear text"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              <button
                type="button"
                onClick={handleSearchSubmit}
                className="bg-brand-berry hover:bg-brand-berry-hover text-white font-black text-xs px-3.5 py-2.5 rounded-full shadow-xs shrink-0 cursor-pointer min-h-11"
              >
                Search
              </button>
            </div>
          ) : (
            /* 2. REGULAR NAVBAR (Desktop full + Mobile Logo with Search & Wishlist) */
            <div className="flex justify-between items-center gap-2 sm:gap-4">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0 group">
                <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-800 group-hover:text-brand-berry transition-colors">
                  little<span className="text-brand-berry">joys</span>
                </span>
                <span className="text-lg sm:text-xl">🍓</span>
              </Link>

              {/* Desktop Navigation Links with Active Indicators */}
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-bold text-xs md:text-sm">
                <NavLink to="/shop/all" className={desktopNavClass}>
                  {({ isActive }) => (
                    <>
                      Shop All
                      <NavDot isActive={isActive} />
                    </>
                  )}
                </NavLink>

                {/* Shop By Category Dropdown */}
                <div className="relative group" onMouseEnter={() => setIsCategoryDropdownOpen(true)} onMouseLeave={() => setIsCategoryDropdownOpen(false)}>
                  <button 
                    aria-haspopup="true" 
                    aria-expanded={isCategoryDropdownOpen}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer focus:outline-none ${
                      location.pathname.startsWith('/shop/') && !location.pathname.endsWith('/all')
                        ? 'text-brand-berry bg-brand-berry-50 shadow-xs'
                        : 'text-slate-700 hover:text-brand-berry hover:bg-pink-50/50'
                    }`}
                  >
                    <span>Shop By Category</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180 text-brand-berry' : ''}`} />
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
                            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-brand-berry hover:bg-pink-50/80 transition-all flex items-center justify-between group/item"
                          >
                            <span>{cat.name}</span>
                            <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-brand-berry">›</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <NavLink to="/honest-report" className={desktopNavClass}>
                  {({ isActive }) => (
                    <>
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Honest Reports
                      </span>
                      <NavDot isActive={isActive} />
                    </>
                  )}
                </NavLink>

                <NavLink to="/aboutus" className={desktopNavClass}>
                  {({ isActive }) => (
                    <>
                      About Us
                      <NavDot isActive={isActive} />
                    </>
                  )}
                </NavLink>
              </div>

              {/* Desktop Search Input (Submits on Enter or Search Click) */}
              <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xs xl:max-w-md relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search for "Nutrimix", "Gummies"...'
                  aria-label="Search products"
                  className="w-full bg-slate-100 text-xs md:text-sm pl-10 pr-9 py-2.5 rounded-full border border-slate-200 focus:border-brand-berry focus:bg-white focus:outline-none transition-all focus:shadow-sm focus:shadow-brand-berry/10"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Action Buttons */}
              {/* 1. Mobile Actions (Search + Wishlist ONLY) */}
              <div className="flex md:hidden items-center space-x-0.5 sm:space-x-1.5">
                <button
                  type="button"
                  onClick={() => setIsMobileSearchOpen(true)}
                  aria-label="Search products"
                  className="p-2 text-slate-700 hover:text-brand-berry hover:bg-pink-50 rounded-full transition-colors flex items-center justify-center min-w-11 min-h-11 cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                </button>

                <Link
                  to={isAuthenticated ? "/wishlist" : "/login"}
                  state={!isAuthenticated ? { from: { pathname: '/wishlist' } } : undefined}
                  aria-label={`Wishlist with ${wishlistCount} items`}
                  className="relative p-2 text-slate-700 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center min-w-11 min-h-11"
                >
                  <Heart className={`w-5 h-5 transition-colors ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* 2. Desktop Actions: Wallet, Wishlist, Login/Account, Cart */}
              <div className="hidden md:flex items-center space-x-2 md:space-x-3">
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
                  className="relative p-2 text-slate-700 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center min-w-9.5 min-h-9.5"
                  title="My Wishlist"
                  aria-label={`Wishlist with ${wishlistCount} items`}
                >
                  <Heart className={`w-4 h-4 transition-colors ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Login or User Name -> Dropdown Menu */}
                {isAuthenticated ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-1.5 text-slate-700 hover:text-brand-berry transition-colors text-xs font-bold px-2.5 py-1.5 rounded-full hover:bg-slate-100 border border-slate-200/80 cursor-pointer min-h-9.5"
                      title="Parent Profile"
                      aria-label="Parent Profile Menu"
                    >
                      <span className="w-6 h-6 rounded-full bg-brand-berry text-white flex items-center justify-center text-[10px] font-black">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
                      </span>
                      <span className="hidden md:inline truncate max-w-21.25">{user?.name?.split(' ')[0] || 'Account'}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute scale-110 top-14 -right-10 mt-2 w-56 bg-white rounded-b-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
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
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-pink-50 hover:text-brand-berry transition-colors"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            <span>My Account</span>
                          </Link>
                          <Link
                            to="/orders"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-pink-50 hover:text-brand-berry transition-colors"
                          >
                            <Package className="w-4 h-4 text-slate-400" />
                            <span>My Orders</span>
                          </Link>
                          {/* Note: Wishlist removed from dropdown to avoid repetition */}
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
                    className="flex items-center gap-1.5 text-slate-700 hover:text-brand-berry transition-colors text-xs font-bold px-3 py-1.5 rounded-full hover:bg-slate-100 border border-slate-200/80 min-h-9.5 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-brand-berry" />
                    <span>Login</span>
                  </Link>
                )}

                {/* Cart Button linking directly to /cart */}
                <Link
                  to={isAuthenticated ? "/cart" : "/login"}
                  state={!isAuthenticated ? { from: { pathname: '/cart' } } : undefined}
                  className="relative flex items-center gap-1.5 bg-brand-berry hover:bg-brand-berry-hover text-white px-3.5 py-2 min-h-9.5 rounded-full transition-transform active:scale-95 shadow-md shadow-brand-berry/25"
                  aria-label={`Shopping Cart with ${effectiveCartCount} items`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-xs font-black hidden sm:inline">Cart</span>
                  <span className="bg-white text-brand-berry text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                    {effectiveCartCount}
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-2xl px-4 sm:px-6 py-5 mt-2 space-y-4 max-h-[80vh] overflow-y-auto touch-scroll">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
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
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${isActive ? 'bg-brand-berry text-white' : 'bg-pink-100 text-brand-berry'}`}>
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
                      className="p-2.5 rounded-xl bg-brand-cream text-slate-700 hover:text-brand-berry hover:bg-brand-berry-50 transition-colors font-bold"
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
                    className="font-black text-slate-800 hover:text-brand-berry flex items-center gap-2"
                  >
                    <span className="w-6 h-6 rounded-full bg-brand-berry text-white flex items-center justify-center text-[10px]">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
                    </span>
                    <span>{user?.name} (Profile)</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="font-black text-slate-700 flex items-center gap-1.5 hover:text-brand-berry"
                  >
                    <User className="w-4 h-4 text-brand-berry" />
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

              {/* Wishlist Link for Mobile */}
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

              {/* Cart Link for Mobile */}
              <Link
                to={isAuthenticated ? "/cart" : "/login"}
                className="w-full bg-pink-50 hover:bg-pink-100 text-brand-berry font-bold py-2.5 px-4 rounded-xl flex items-center justify-between border border-pink-200 min-h-11"
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>View Shopping Bag</span>
                </div>
                <span className="bg-brand-berry text-white font-black text-[11px] px-2 py-0.5 rounded-full">
                  {effectiveCartCount} items
                </span>
              </Link>

              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full mt-2 py-2.5 text-rose-600 font-bold flex items-center justify-center gap-2 border border-rose-200 rounded-xl hover:bg-rose-50 min-h-11 cursor-pointer"
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
