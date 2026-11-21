import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import NestorLogo from '@/components/common/NestorLogo';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { resetAppSession } from '@/utils/session';
import { ShoppingCart, Search, Wallet, Heart } from 'lucide-react';
import { NAVBAR_CATEGORIES } from '@/data/categories';
import {
  AnnouncementBar,
  NavMobileSearch,
  DesktopNavLinks,
  NavDesktopSearch,
  NavUserDropdown,
  MobileNavDrawer,
} from './navbar/index';

export default function Navbar({ cartCount = 0 }) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const ctxCartCount = useCartStore((s) =>
    s.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
  );
  const cartTotal = useCartStore((s) =>
    s.cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
  );
  const effectiveCartCount = cartCount || ctxCartCount || 0;
  const wishlistCount = useWishlistStore((s) => (s.wishlistItems || []).length);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
  const userMenuRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlQuery = searchParams.get('search') || '';
    setSearchQuery((prev) => (urlQuery !== prev ? urlQuery : prev));
  }, [searchParams]);

  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <AnnouncementBar
        effectiveCartCount={effectiveCartCount}
        cartTotal={cartTotal}
        isScrolled={isScrolled}
      />

      <nav
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md border-b border-stone-200/70 shadow-sm py-2 sm:py-2.5'
            : 'bg-white/95 backdrop-blur-md py-2.5 sm:py-3.5 border-b border-orange-100'
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          {isMobileSearchOpen ? (
            <NavMobileSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSubmit={handleSearchSubmit}
              onClose={() => setIsMobileSearchOpen(false)}
              inputRef={mobileSearchInputRef}
            />
          ) : (
            <div className="flex justify-between items-center gap-2 sm:gap-4">
              <NestorLogo
                variant="horizontal"
                linkTo="/"
                className="group"
                imgClassName="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />

              <DesktopNavLinks
                isCategoryDropdownOpen={isCategoryDropdownOpen}
                setIsCategoryDropdownOpen={setIsCategoryDropdownOpen}
                categories={NAVBAR_CATEGORIES}
              />

              <NavDesktopSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSubmit={handleSearchSubmit}
              />

              {/* Mobile Actions (Search + Wishlist ONLY) */}
              <div className="flex md:hidden items-center space-x-0.5 sm:space-x-1.5">
                <button
                  type="button"
                  onClick={() => setIsMobileSearchOpen(true)}
                  aria-label="Search products"
                  className="p-2 text-slate-700 hover:text-brand-forest hover:bg-[#FAF4EB] rounded-full transition-colors flex items-center justify-center min-w-11 min-h-11 cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                </button>

                <Link
                  to={isAuthenticated ? '/wishlist' : '/login'}
                  state={!isAuthenticated ? { from: { pathname: '/wishlist' } } : undefined}
                  aria-label={`Wishlist with ${wishlistCount} items`}
                  className="relative p-2 text-slate-700 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center min-w-11 min-h-11"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Desktop Actions: Wallet, Wishlist, Login/Account, Cart */}
              <div className="hidden md:flex items-center space-x-2 md:space-x-3">
                <Link
                  to={isAuthenticated ? '/wallet-recharge' : '/login'}
                  state={!isAuthenticated ? { from: { pathname: '/wallet-recharge' } } : undefined}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full transition-colors"
                  title="LJ Wallet Recharge"
                >
                  <Wallet className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isAuthenticated ? `₹${user?.walletBalance || 0}` : '₹200 Welcome'}</span>
                </Link>

                <Link
                  to={isAuthenticated ? '/wishlist' : '/login'}
                  state={!isAuthenticated ? { from: { pathname: '/wishlist' } } : undefined}
                  className="relative p-2 text-slate-700 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center min-w-9.5 min-h-9.5"
                  title="My Wishlist"
                  aria-label={`Wishlist with ${wishlistCount} items`}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <NavUserDropdown
                  isAuthenticated={isAuthenticated}
                  user={user}
                  isOpen={isUserMenuOpen}
                  setIsOpen={setIsUserMenuOpen}
                  menuRef={userMenuRef}
                  onLogout={handleLogout}
                />

                <Link
                  to={isAuthenticated ? '/cart' : '/login'}
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

        <MobileNavDrawer
          isOpen={isMobileMenuOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          categories={NAVBAR_CATEGORIES}
          isAuthenticated={isAuthenticated}
          user={user}
          wishlistCount={wishlistCount}
          effectiveCartCount={effectiveCartCount}
          onLogout={handleLogout}
        />
      </nav>
    </header>
  );
}
