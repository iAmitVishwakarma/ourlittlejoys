import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import ProductCard from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/common/Skeleton';
import { productService } from '@/services/productService';
import { useCartStore } from '@/stores/cartStore';
import SEO from '@/components/common/SEO';

import { ShoppingBag, Filter, Sparkles, ArrowRight, Check, ShieldCheck, X, Search } from 'lucide-react';
import { RainbowDoodle, SunDoodle, MiniStarCluster } from '@/components/graphics/KidsDoodles';

const CATEGORY_SLUG_MAP = {
  'all': 'All',
  'nutrimix': 'Nutrimix',
  'gummies': 'Gummies',
  'spreads-and-sauce': 'Spreads & Sauce',
  'spreads-sauce': 'Spreads & Sauce',
  'cereals-and-snacks': 'Cereals & Snacks',
  'cereals-snacks': 'Cereals & Snacks',
  'protein': 'Protein',
  'moms': 'For Moms',
  'for-moms': 'For Moms',
  'best-value': 'Best Value',
  'personal-care': 'Personal Care',
  'newlaunches': 'New Launches'
};

export default function ShopAll({ onAddToCart, cartItems: propCartItems, onUpdateCartQuantity }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category: routeCategory } = useParams();
  
  const ctxCartItems = useCartStore((s) => s.cartItems);
  const ctxAddToCart = useCartStore((s) => s.addToCart);
  const ctxUpdateQty = useCartStore((s) => s.updateQuantity);
  const effectiveCartItems = propCartItems || ctxCartItems || [];
  const handleAdd = onAddToCart || ctxAddToCart;
  const handleUpdateQty = onUpdateCartQuantity || ctxUpdateQty;

  // Read initial filter from route params or query URL
  const getInitialCategory = () => {
    if (routeCategory && CATEGORY_SLUG_MAP[routeCategory.toLowerCase()]) {
      return CATEGORY_SLUG_MAP[routeCategory.toLowerCase()];
    }
    const catQuery = searchParams.get('category');
    if (catQuery) return catQuery;
    if (searchParams.get('filter')?.includes('newlaunches')) return 'New Launches';
    return 'All';
  };

  const [selectedCategory, setSelectedCategory] = useState(getInitialCategory);
  const [selectedAge, setSelectedAge] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [isFiltering, setIsFiltering] = useState(false);
  const [catalogProducts, setCatalogProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    productService.getAllProducts().then((data) => {
      if (isMounted && Array.isArray(data)) {
        setCatalogProducts(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const searchQuery = (searchParams.get('search') || '').trim();

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 240);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedAge, sortBy, searchQuery]);

  const categories = [
    "All",
    "New Launches",
    "Nutrimix",
    "Gummies",
    "Spreads & Sauce",
    "Cereals & Snacks",
    "Protein",
    "For Moms",
    "Best Value",
    "Personal Care",
    "Limited Drop",
    "Trial Packs"
  ];

  const ageFilters = [
    { label: "All Ages", value: "All" },
    { label: "2-6 Yr", value: "2-6" },
    { label: "4+ Yr", value: "4+" },
    { label: "7-12 Yr", value: "7-12" },
    { label: "13-18 Yr", value: "13-18" },
    { label: "Moms", value: "Moms" }
  ];

  // Update when URL query or route changes
  useEffect(() => {
    if (routeCategory && CATEGORY_SLUG_MAP[routeCategory.toLowerCase()]) {
      setSelectedCategory(CATEGORY_SLUG_MAP[routeCategory.toLowerCase()]);
      return;
    }
    const filterParam = searchParams.get('filter');
    const catParam = searchParams.get('category');
    if (filterParam && filterParam.includes('newlaunches')) {
      setSelectedCategory('New Launches');
    } else if (catParam) {
      setSelectedCategory(catParam);
    }
  }, [searchParams, routeCategory]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'New Launches') {
      setSearchParams({ filter: '{"newlaunches":["newlaunches"]}' });
    } else if (cat === 'All') {
      setSearchParams({ source: 'header' });
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Filter and Sort Products (incorporating category, age, sort, and search query)
  const filteredProducts = useMemo(() => {
    const list = Array.isArray(catalogProducts) ? catalogProducts : [];
    const normalizedSearch = searchQuery.toLowerCase();

    return list.filter((item) => {
      // 1. Search filter
      if (normalizedSearch) {
        const titleMatch = (item.title || item.name || '').toLowerCase().includes(normalizedSearch);
        const descMatch = (item.description || '').toLowerCase().includes(normalizedSearch);
        const catMatch = (item.category || item.subCategory || '').toLowerCase().includes(normalizedSearch);
        const tagMatch = (item.tag || '').toLowerCase().includes(normalizedSearch);
        const flavorMatch = (item.flavor || '').toLowerCase().includes(normalizedSearch);
        const benefitMatch = Array.isArray(item.benefits) && item.benefits.some((b) => b.toLowerCase().includes(normalizedSearch));
        const ingredientMatch = Array.isArray(item.ingredients) && item.ingredients.some((i) => i.toLowerCase().includes(normalizedSearch));

        if (!titleMatch && !descMatch && !catMatch && !tagMatch && !flavorMatch && !benefitMatch && !ingredientMatch) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory === 'New Launches' && !item.isNewLaunch) return false;
      if (selectedCategory !== 'All' && selectedCategory !== 'New Launches' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Age filter
      if (selectedAge !== 'All') {
        if (selectedAge === 'Moms' && item.ageGroup !== 'Moms') return false;
        if (selectedAge !== 'Moms' && item.ageGroup !== selectedAge && !(item.age || '').includes(selectedAge)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return parseFloat(b.rating || 0) - parseFloat(a.rating || 0);
      return 0; // Default popularity
    });
  }, [catalogProducts, selectedCategory, selectedAge, sortBy, searchQuery]);

  const totalCartCount = effectiveCartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalCartAmount = effectiveCartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const pageTitle = selectedCategory === 'All' 
    ? 'Shop All Kids Nutrition Essentials | Little Joys'
    : `${selectedCategory} for Kids Nutrition | Little Joys`;
  const pageDescription = `Explore pediatrician-formulated ${selectedCategory.toLowerCase()} nutrition for toddlers, kids, and mothers. Zero refined sugar, 100% clean ingredients.`;

  return (
    <div className="bg-[#FFF9F5] min-h-screen pb-24">
      <SEO 
        title={pageTitle}
        description={pageDescription}
      />
      {/* Premium Whimsical Illustrated Hero Canvas */}
      <section className="relative overflow-hidden bg-[#FFF5EE] border-b border-orange-100/80 py-10 md:py-14 px-4 md:px-6">
        {/* Playful Dot Grid Texture Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(#FDBA74 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient Soft Color Halos */}
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-pink-200/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-16 w-72 h-72 bg-amber-200/50 rounded-full blur-3xl pointer-events-none" />

        {/* Playful Floating Doodles */}
        <div className="hidden lg:block absolute top-6 left-12 animate-bounce duration-1000">
          <RainbowDoodle className="w-16 h-10 opacity-80" />
        </div>
        <div className="hidden lg:block absolute top-8 right-16">
          <SunDoodle className="w-12 h-12 text-amber-400 animate-pulse" />
        </div>
        <div className="hidden xl:block absolute bottom-8 left-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-emerald-200 shadow-xs text-[11px] font-black text-emerald-800 rotate-[-4deg]">
            <span>🌱</span> 100% Sprouted Ragi
          </span>
        </div>
        <div className="hidden xl:block absolute bottom-10 right-28">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-pink-200 shadow-xs text-[11px] font-black text-pink-700 rotate-[3deg]">
            <span>🍓</span> Real Fruit Pectin
          </span>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Central Header */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-pink-200 shadow-xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin duration-3000" />
              <span className="text-[11px] md:text-xs font-black uppercase tracking-wider text-slate-800">
                100% Honest Nutrition • Doctor Formulated
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {selectedCategory === 'New Launches' ? (
                <>New Launches for Little Champions! 🚀</>
              ) : (
                <>Shop All Nutrition Essentials</>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-slate-600 mt-2.5 max-w-2xl mx-auto leading-relaxed font-medium">
              Explore pediatrician-recommended daily nutrition for toddlers, kids, teenagers, and mothers.
            </p>
          </div>

          {/* 4 Shadcn-Style Glassmorphic Feature Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
            {/* Card 1: 0% Sugar */}
            <div className="bg-white/85 backdrop-blur-sm p-3.5 rounded-2xl border border-rose-100 shadow-xs hover:shadow-md hover:border-rose-300 transition-all text-left flex items-start gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 border border-rose-100 group-hover:scale-110 transition-transform">
                <span className="text-base">🍓</span>
              </div>
              <div>
                <span className="text-xs md:text-sm font-black text-rose-600 block leading-tight">
                  0% Sugar
                </span>
                <span className="text-[10px] md:text-[11px] font-bold text-slate-600 block mt-0.5">
                  Refined Sugar Free
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block">Sweetened with jaggery</span>
              </div>
            </div>

            {/* Card 2: NABL Tested */}
            <div className="bg-white/85 backdrop-blur-sm p-3.5 rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all text-left flex items-start gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <span className="text-xs md:text-sm font-black text-emerald-700 block leading-tight">
                  NABL Tested
                </span>
                <span className="text-[10px] md:text-[11px] font-bold text-slate-600 block mt-0.5">
                  Heavy Metal Safe
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block">Eurofins certified</span>
              </div>
            </div>

            {/* Card 3: 100% Whole Millets */}
            <div className="bg-white/85 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-xs hover:shadow-md hover:border-amber-300 transition-all text-left flex items-start gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 group-hover:scale-110 transition-transform">
                <span className="text-base">🌾</span>
              </div>
              <div>
                <span className="text-xs md:text-sm font-black text-amber-800 block leading-tight">
                  Zero Palm Oil
                </span>
                <span className="text-[10px] md:text-[11px] font-bold text-slate-600 block mt-0.5">
                  No Maida or Malt
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block">Ancient sprouted grains</span>
              </div>
            </div>

            {/* Card 4: Doctor Formulated */}
            <div className="bg-white/85 backdrop-blur-sm p-3.5 rounded-2xl border border-indigo-100 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all text-left flex items-start gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:scale-110 transition-transform">
                <span className="text-base">🩺</span>
              </div>
              <div>
                <span className="text-xs md:text-sm font-black text-indigo-800 block leading-tight">
                  Pediatrician Pick
                </span>
                <span className="text-[10px] md:text-[11px] font-bold text-slate-600 block mt-0.5">
                  Safe for 2-18 Yrs
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block">Tested by real kids</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Bar (Horizontal scrolling) */}
      <div className="sticky top-[86px] z-30 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-xs py-3 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none" role="tablist" aria-label="Product categories">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2.5 min-h-[44px] rounded-full text-xs md:text-sm font-extrabold whitespace-nowrap transition-all flex items-center justify-center ${
                  selectedCategory === cat
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/25 scale-105'
                    : 'bg-slate-100/80 text-slate-700 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Age Strip */}
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-orange-100 shadow-xs">
          {/* Age Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <span className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Age:</span>
            </span>
            <div className="flex items-center gap-1.5 shrink-0" role="group" aria-label="Filter by age">
              {ageFilters.map((age) => (
                <button
                  key={age.value}
                  onClick={() => setSelectedAge(age.value)}
                  className={`px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold transition-all ${
                    selectedAge === age.value
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                  aria-pressed={selectedAge === age.value}
                >
                  {age.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label htmlFor="shop-sort-by" className="text-xs font-bold text-slate-400">Sort by:</label>
            <select
              id="shop-sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products by"
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2 min-h-[40px] focus:outline-none focus:border-pink-400"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-700 text-xs font-black px-3 py-1 rounded-full border border-pink-200">
                <Search className="w-3.5 h-3.5" />
                <span>Results for: "{searchQuery}"</span>
                <button
                  onClick={() => {
                    setSearchParams((prev) => {
                      const next = new URLSearchParams(prev);
                      next.delete('search');
                      return next;
                    });
                  }}
                  className="hover:text-pink-900 cursor-pointer ml-1"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items {selectedCategory !== 'All' ? `in "${selectedCategory}"` : ''}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedAge !== 'All' && (
              <button
                onClick={() => setSelectedAge('All')}
                aria-label="Clear age filter"
                className="text-xs text-pink-600 hover:underline font-bold min-h-[36px] px-2 cursor-pointer"
              >
                Clear Age Filter
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchParams((prev) => {
                    const next = new URLSearchParams(prev);
                    next.delete('search');
                    return next;
                  });
                }}
                className="text-xs text-slate-500 hover:text-slate-800 font-bold min-h-[36px] px-2 cursor-pointer underline"
              >
                View All Products
              </button>
            )}
          </div>
        </div>

        {isFiltering ? (
          <ProductGridSkeleton count={8} />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 md:py-20 bg-white rounded-3xl border border-orange-100 p-8 shadow-2xs max-w-lg mx-auto my-8">
            <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
            <h2 className="text-lg font-black text-slate-800 mb-2">
              {searchQuery
                ? `No products found for "${searchQuery}"`
                : 'No products found for this filter'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              {searchQuery
                ? "We couldn't find any products matching your search. Try checking your spelling or searching for 'Nutrimix', 'Gummies', or 'Protein'."
                : 'Try selecting "All" or a different age group.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedAge('All');
                setSearchParams({});
              }}
              className="bg-[#FF2F92] hover:bg-pink-600 active:scale-98 text-white font-black px-6 py-3 min-h-[44px] rounded-full text-xs uppercase tracking-wider shadow-xs transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-200">
            {filteredProducts.map((product) => {
              const inCart = effectiveCartItems.find(
                (c) =>
                  String(c.id) === String(product.id) ||
                  (c.slug && product.slug && String(c.slug) === String(product.slug))
              );
              return (
                <ProductCard
                  key={product.id}
                  {...product}
                  cartQuantity={inCart ? inCart.quantity : 0}
                  onAddToCart={handleAdd}
                  onUpdateCartQuantity={handleUpdateQty}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Sticky Bottom Cart Bar (as seen on ourlittlejoys.com: "View cart 1 item") */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-16 lg:bottom-4 left-0 right-0 z-40 px-4 flex justify-center">
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-3.5 md:p-4 flex items-center justify-between gap-6 max-w-md w-full border border-slate-700 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-pink-500 flex items-center justify-center text-white font-black text-sm shadow-md">
                {totalCartCount}
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-semibold">Total Cart Value</div>
                <div className="text-sm md:text-base font-black text-white">₹{totalCartAmount}</div>
              </div>
            </div>

            <Link
              to="/cart"
              className="bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black text-xs uppercase px-4 md:px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-pink-500/30 transition-transform"
            >
              <span>View Cart</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
