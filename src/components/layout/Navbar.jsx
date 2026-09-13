import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { ShoppingCart, Search, User, Menu, X, Sparkles, Smartphone, ShieldCheck, Wallet, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function Navbar({ cartCount = 0, onOpenCart, onOpenAuth, onOpenAccount }) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const cartItems = useCartStore((s) => s.cartItems);
  const ctxCartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const effectiveCartCount = cartCount || ctxCartCount || 0;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop/all?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      onOpenAccount?.();
    } else {
      onOpenAuth?.();
    }
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
                  aria-label="Shop By Category menu"
                  className="flex items-center gap-1 hover:text-pink-600 transition-colors py-2 cursor-pointer"
                >
                  <span>Shop By Category</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
                </button>

                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-orange-100 p-2.5 grid grid-cols-1 gap-1 animate-in fade-in duration-150">
                    {categories.map((c) => (
                      <Link
                        key={c.name}
                        to={c.link}
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-pink-50 hover:text-pink-600 transition-colors flex items-center justify-between"
                      >
                        <span>{c.name}</span>
                        <span className="text-slate-300">›</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/honest-report" className="hover:text-pink-600 transition-colors flex items-center gap-1.5 text-pink-600">
                <span>Honest Reports</span>
                <span className="text-[10px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-black">
                  100% Lab Tested
                </span>
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

            {/* Action Buttons: Wallet, Login/Account, Cart */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Wallet button linking to /wallet-recharge */}
              <Link
                to="/wallet-recharge"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full transition-colors"
                title="LJ Wallet Recharge"
              >
                <Wallet className="w-3.5 h-3.5 text-amber-600" />
                <span>{isAuthenticated ? `₹${user?.walletBalance || 0}` : 'Wallet'}</span>
              </Link>

              {/* Login or User Name -> Direct link to /profile if logged in */}
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-pink-600 transition-colors text-xs font-bold px-2 py-1.5 min-w-[44px] min-h-[44px]"
                  title="Parent Profile"
                  aria-label="Parent Profile"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-black">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'P'}
                    </span>
                    <span className="hidden md:inline truncate max-w-[90px]">{user.name || 'Account'}</span>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={handleUserClick}
                  aria-label="Log in to account"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-pink-600 transition-colors text-xs font-bold px-2 py-1.5 min-w-[44px] min-h-[44px] cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">Login</span>
                </button>
              )}

              {/* Cart Button linking directly to /cart */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 min-h-[44px] rounded-full transition-transform active:scale-95 shadow-md shadow-pink-500/25"
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
                className="lg:hidden p-2 text-slate-700 hover:text-pink-600 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
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
                      {user.name ? user.name.charAt(0).toUpperCase() : 'P'}
                    </span>
                    <span>{user.name} (View Profile)</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAuth?.();
                    }}
                    className="font-black text-slate-700 flex items-center gap-1.5"
                  >
                    <User className="w-4 h-4 text-pink-600" />
                    <span>Login / Register</span>
                  </button>
                )}
                <Link
                  to="/wallet-recharge"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-amber-50 text-amber-800 font-bold px-3 py-1 rounded-full border border-amber-200"
                >
                  {isAuthenticated ? `₹${user?.walletBalance || 0} Balance` : '₹200 Welcome Cash'}
                </Link>
              </div>

              <Link
                to="/cart"
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
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
