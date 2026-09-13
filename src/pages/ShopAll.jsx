import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import ProductCard from '@/components/product/ProductCard';
import { ALL_PRODUCTS } from '@/data/products';
import { useCartStore } from '@/stores/cartStore';
import SEO from '@/components/common/SEO';
import { ShoppingBag, Filter, Sparkles, ArrowRight, Check } from 'lucide-react';

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

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory === 'New Launches' && !item.isNewLaunch) return false;
      if (selectedCategory !== 'All' && selectedCategory !== 'New Launches' && item.category !== selectedCategory) {
        return false;
      }

      // Age filter
      if (selectedAge !== 'All') {
        if (selectedAge === 'Moms' && item.ageGroup !== 'Moms') return false;
        if (selectedAge !== 'Moms' && item.ageGroup !== selectedAge && !item.age.includes(selectedAge)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
      return 0; // Default popularity
    });
  }, [selectedCategory, selectedAge, sortBy]);

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
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-100 via-amber-50 to-rose-100 border-b border-pink-100/80 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-pink-600 font-extrabold text-xs uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>100% Honest Nutrition • Doctor Formulated</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-800">
                {selectedCategory === 'New Launches' ? 'New Launches! 🚀' : 'Shop All Nutrition Essentials'}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Explore pediatrician-recommended daily nutrition for toddlers, kids, teenagers, and mothers.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-4 text-xs font-bold text-slate-700 bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-pink-200/60 shadow-xs">
              <div>
                <span className="text-pink-600 font-black text-sm block">0% Sugar</span>
                <span className="text-[10px] text-slate-400 uppercase">Refined Sugar Free</span>
              </div>
              <div className="h-6 w-[1px] bg-slate-200" />
              <div>
                <span className="text-emerald-600 font-black text-sm block">NABL Tested</span>
                <span className="text-[10px] text-slate-400 uppercase">Heavy Metal Safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items in "{selectedCategory}"
          </p>
          {selectedAge !== 'All' && (
            <button
              onClick={() => setSelectedAge('All')}
              aria-label="Clear age filter"
              className="text-xs text-pink-600 hover:underline font-bold min-h-[40px] px-2"
            >
              Clear Age Filter
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-orange-100 p-8">
            <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
            <h2 className="text-lg font-black text-slate-800 mb-2">No products found for this filter</h2>
            <p className="text-sm text-slate-500 mb-6">Try selecting "All" or a different age group.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSelectedAge('All'); }}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 min-h-[44px] rounded-full text-xs uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inCart = effectiveCartItems.find((c) => c.id === product.id || c.slug === product.slug);
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
