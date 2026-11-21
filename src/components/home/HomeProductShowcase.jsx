import React from 'react';
import ProductCard from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/common/Skeleton';
import { WavyUnderline } from '@/components/graphics/KidsDoodles';

const CATEGORY_TABS = [
  'All',
  'Nutrimix',
  'Gummies',
  'Best Value',
  'Spreads & Sauce',
  'Cereals & Snacks',
  'For Moms',
];

export default function HomeProductShowcase({
  activeCategory,
  onCategoryChange,
  isCategoryLoading,
  products = [],
  effectiveCartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
}) {
  return (
    <section className="py-6 md:py-8 px-3 sm:px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-black uppercase text-brand-primary tracking-wider">
              Most Loved Products
            </span>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-slate-900 mt-0.5 flex items-center gap-2">
              <span>Top-Selling Favourites</span>
            </h2>
            <WavyUnderline className="w-32 h-2.5 text-[#C89B58] mt-1" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none touch-scroll -mx-1 px-1">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => onCategoryChange(tab)}
                className={`px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all min-h-9 cursor-pointer ${
                  activeCategory === tab
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/25'
                    : 'bg-white text-slate-700 hover:bg-orange-50 border border-orange-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {isCategoryLoading ? (
          <ProductGridSkeleton count={4} cols="grid-cols-2 lg:grid-cols-4" />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 animate-in fade-in duration-200">
            {products.map((product) => {
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
                  onAddToCart={onAddToCart}
                  onUpdateCartQuantity={onUpdateCartQuantity}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
