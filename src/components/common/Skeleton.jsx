import React from 'react';

/**
 * High-End Shimmer Skeleton Component System for Little Joys
 * Provides smooth, realistic loading placeholders for all key surfaces:
 * - Base Skeleton (customizable text, circle, rect)
 * - ProductCardSkeleton & ProductGridSkeleton
 * - ProductDetailSkeleton
 * - PageSkeleton (Router level Suspense fallback)
 * - TableSkeleton (Honest Reports & Account)
 * - OrderCardSkeleton (Profile Orders)
 * - HeroSkeleton (Home Hero fallback)
 */

export function Skeleton({ className = "", variant = "rect" }) {
  const variantStyles = {
    rect: "rounded-xl",
    circle: "rounded-full",
    text: "rounded-md h-4 my-1",
    pill: "rounded-full h-6"
  }[variant] || "rounded-xl";

  return (
    <div 
      aria-hidden="true"
      className={`skeleton-shimmer ${variantStyles} ${className}`}
    />
  );
}

// 1. Single Product Card Skeleton (Exact replica of ProductCard layout)
export function ProductCardSkeleton({ className = "" }) {
  return (
    <div 
      className={`bg-white rounded-3xl p-4 border border-orange-100/80 shadow-xs flex flex-col justify-between overflow-hidden animate-pulse ${className}`}
      aria-hidden="true"
    >
      {/* Top badges row */}
      <div className="flex justify-between items-center mb-3">
        <div className="w-16 h-5 skeleton-shimmer rounded-full" />
        <div className="w-7 h-7 skeleton-shimmer rounded-full" />
      </div>

      {/* Main product image container */}
      <div className="w-full aspect-square rounded-2xl skeleton-shimmer mb-4 flex items-center justify-center relative overflow-hidden">
        <div className="w-12 h-12 rounded-full bg-white/30" />
      </div>

      {/* Title & metadata */}
      <div className="space-y-2 mb-4">
        <div className="w-3/4 h-4 skeleton-shimmer rounded-md" />
        <div className="w-1/2 h-3 skeleton-shimmer rounded-md" />
        <div className="flex items-center gap-2 pt-1">
          <div className="w-12 h-3.5 skeleton-shimmer rounded-md" />
          <div className="w-16 h-3.5 skeleton-shimmer rounded-md" />
        </div>
      </div>

      {/* Bottom price and add-to-cart row */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="space-y-1">
          <div className="w-14 h-5 skeleton-shimmer rounded-md" />
          <div className="w-10 h-3 skeleton-shimmer rounded-md" />
        </div>
        <div className="w-24 h-9 skeleton-shimmer rounded-full" />
      </div>
    </div>
  );
}

// 2. Product Grid Skeleton (for ShopAll, Category Tabs, Favourites)
export function ProductGridSkeleton({ count = 8, cols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" }) {
  return (
    <div role="status" className={`grid ${cols} gap-6`} aria-label="Loading products...">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
}

// 3. Hero Section Skeleton Placeholder
export function HeroSkeleton() {
  return (
    <div className="w-full bg-gradient-to-br from-[#FFFDF9] via-[#FAF4ED] to-[#F5ECE1] rounded-3xl md:rounded-[2.5rem] p-8 sm:p-12 border border-amber-200/60 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="w-40 h-6 skeleton-shimmer rounded-full" />
          <div className="w-3/4 h-12 skeleton-shimmer rounded-2xl" />
          <div className="w-1/2 h-12 skeleton-shimmer rounded-2xl" />
          <div className="w-5/6 h-5 skeleton-shimmer rounded-lg" />
          <div className="flex gap-4 pt-2">
            <div className="w-28 h-5 skeleton-shimmer rounded-md" />
            <div className="w-32 h-5 skeleton-shimmer rounded-md" />
            <div className="w-28 h-5 skeleton-shimmer rounded-md" />
          </div>
          <div className="flex gap-3 pt-3">
            <div className="w-36 h-11 skeleton-shimmer rounded-full" />
            <div className="w-36 h-11 skeleton-shimmer rounded-full" />
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-64 sm:w-80 h-64 sm:h-72 rounded-3xl skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

// 4. Product Detail Page Skeleton
export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto max-w-6xl px-4 md:px-6 py-8 animate-pulse" aria-label="Loading product details...">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-16 h-3.5 skeleton-shimmer rounded" />
        <span className="text-slate-300">/</span>
        <div className="w-20 h-3.5 skeleton-shimmer rounded" />
        <span className="text-slate-300">/</span>
        <div className="w-32 h-3.5 skeleton-shimmer rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Gallery Skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <div className="w-full aspect-square rounded-3xl skeleton-shimmer" />
          <div className="flex gap-3">
            <div className="w-20 h-20 rounded-2xl skeleton-shimmer" />
            <div className="w-20 h-20 rounded-2xl skeleton-shimmer" />
            <div className="w-20 h-20 rounded-2xl skeleton-shimmer" />
          </div>
        </div>

        {/* Right Info Skeleton */}
        <div className="lg:col-span-6 space-y-5">
          <div className="w-24 h-6 skeleton-shimmer rounded-full" />
          <div className="w-5/6 h-8 skeleton-shimmer rounded-xl" />
          <div className="w-1/3 h-4 skeleton-shimmer rounded-md" />
          <div className="w-40 h-8 skeleton-shimmer rounded-lg" />
          
          <div className="p-5 rounded-2xl bg-white border border-slate-100 space-y-3">
            <div className="w-full h-4 skeleton-shimmer rounded" />
            <div className="w-4/5 h-4 skeleton-shimmer rounded" />
            <div className="w-2/3 h-4 skeleton-shimmer rounded" />
          </div>

          <div className="flex gap-4 pt-2">
            <div className="w-32 h-12 skeleton-shimmer rounded-full" />
            <div className="flex-1 h-12 skeleton-shimmer rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Order Card / Dashboard Skeleton (Profile page)
export function OrderCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4 animate-pulse">
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="w-32 h-4 skeleton-shimmer rounded" />
          <div className="w-24 h-3 skeleton-shimmer rounded" />
        </div>
        <div className="w-20 h-6 skeleton-shimmer rounded-full" />
      </div>
      <div className="flex items-center gap-4 py-2">
        <div className="w-16 h-16 rounded-2xl skeleton-shimmer shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="w-3/4 h-4 skeleton-shimmer rounded" />
          <div className="w-1/3 h-3 skeleton-shimmer rounded" />
        </div>
        <div className="w-16 h-5 skeleton-shimmer rounded" />
      </div>
    </div>
  );
}

// 6. Table Skeleton (Honest Report & Test Certs)
export function TableSkeleton({ rows = 4, cols = 4 }) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 overflow-hidden p-4 space-y-3 animate-pulse">
      <div className="flex justify-between gap-4 pb-3 border-b border-slate-100">
        {Array.from({ length: cols }).map((_, c) => (
          <div key={c} className="h-4 skeleton-shimmer rounded flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex justify-between items-center gap-4 py-2">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="h-3.5 skeleton-shimmer rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

// 7. Full Page Route Fallback Skeleton (Used in React.Suspense in App.jsx)
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#FFF9F5] pb-20 animate-in fade-in duration-300">
      {/* Top Banner Skeleton */}
      <div className="w-full bg-white border-b border-orange-100/80 py-10 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl space-y-4">
          <div className="w-32 h-5 skeleton-shimmer rounded-full" />
          <div className="w-72 sm:w-96 h-10 skeleton-shimmer rounded-2xl" />
          <div className="w-full max-w-lg h-4 skeleton-shimmer rounded-md" />
        </div>
      </div>

      {/* Body Content Skeleton */}
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-8 space-y-8">
        <ProductGridSkeleton count={4} />
      </div>
    </div>
  );
}

export default Skeleton;
