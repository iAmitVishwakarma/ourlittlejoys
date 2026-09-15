import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Plus, Minus, Check, Heart, Eye } from 'lucide-react';
import ProductVisual from './ProductVisual';
import { useAuthStore } from '@/stores/authStore';
import { useWishlistStore } from '@/stores/wishlistStore';

export default function ProductCard({
  id,
  title,
  price,
  originalPrice,
  rating = "4.8",
  reviews = "1.2k+",
  category = "Daily Nutrition",
  subCategory = "CHOCOLATE",
  age = "4+ Yr",
  weight = "350g",
  optionsCount = null,
  isSoldOut = false,
  tag = null,
  visualType = "nutrimix",
  flavor = "chocolate",
  image = null,
  slug,
  description: _description,
  benefits = [],
  onAddToCart,
  cartQuantity = 0,
  onUpdateCartQuantity
}) {
  const [justAdded, setJustAdded] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const wishlistItems = useWishlistStore((s) => s.wishlistItems);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const productSlug = slug || id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const isFavorite = Boolean(
    (wishlistItems || []).some((item) => {
      const targetId = String(id || '').toLowerCase();
      const targetSlug = String(productSlug || '').toLowerCase();
      const itemId = String(item.id || '').toLowerCase();
      const itemSlug = String(item.slug || '').toLowerCase();
      const itemProductId = String(item.productId || '').toLowerCase();
      return (
        (targetId && (itemId === targetId || itemProductId === targetId || itemSlug === targetId)) ||
        (targetSlug && (itemSlug === targetSlug || itemId === targetSlug || itemProductId === targetSlug))
      );
    })
  );

  // Short 1-line benefit for clean hierarchy (What is it? Why care?)
  const shortBenefit = (benefits && benefits.length > 0)
    ? benefits[0]
    : (subCategory || category || "Daily Clean Nutrition");

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/wishlist' } });
      return;
    }
    toggleWishlist({
      id,
      title,
      price,
      originalPrice,
      image,
      slug: productSlug
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (isSoldOut) return;

    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    setJustAdded(true);
    if (onAddToCart) {
      onAddToCart({
        id,
        title,
        price,
        originalPrice,
        category,
        subCategory,
        age,
        weight,
        visualType,
        flavor,
        image,
        slug: productSlug
      });
    }
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className={`card-interactive bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-xs border transition-all duration-300 flex flex-col justify-between relative group ${
      isSoldOut ? 'opacity-75 border-slate-200' : 'border-brand-border/90 hover:border-brand-primary-100 hover:shadow-lg'
    }`}>
      {/* 1. TOP BADGES (Tag + Age + Wishlist) */}
      <div className="flex justify-between items-center mb-1 sm:mb-2 z-10 gap-1">
        <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
          {tag ? (
            <span className="bg-brand-berry text-white text-[8.5px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs truncate max-w-21.25 sm:max-w-none">
              {tag}
            </span>
          ) : discount > 0 ? (
            <span className="bg-brand-forest text-white text-[8.5px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 rounded-full tracking-wider shadow-2xs shrink-0">
              {discount}% OFF
            </span>
          ) : null}

          {optionsCount && (
            <span className="bg-amber-100 text-amber-900 text-[8.5px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full hidden sm:inline shrink-0">
              {optionsCount} options
            </span>
          )}
        </div>

        {/* Age Indicator and Wishlist button */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <span className="bg-slate-100 text-slate-700 text-[8.5px] sm:text-[10px] font-black px-1.5 sm:px-2.5 py-0.5 rounded-full border border-slate-200/80 shrink-0">
            {age}
          </span>
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 border cursor-pointer flex items-center justify-center shrink-0 ${
              isFavorite
                ? 'bg-red-50 text-red-500 border-red-200 shadow-xs scale-105'
                : 'bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 border-slate-200/80 shadow-2xs'
            }`}
            title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 transition-colors duration-200 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
      </div>

      {/* 2. PRODUCT IMAGE (Responsive height & proportion) */}
      <Link
        to={`/product/${productSlug}`}
        className="h-32 sm:h-44 md:h-52 lg:h-56 my-1 sm:my-2 relative overflow-hidden bg-linear-to-b from-brand-cream via-white to-orange-50/30 rounded-xl sm:rounded-2xl flex items-center justify-center cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
      >
        <ProductVisual image={image} type={visualType} flavor={flavor} age={age} alt={title} />
        
        {/* Quick View Overlay on Hover (Desktop only) */}
        <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/10 transition-all duration-300 rounded-xl sm:rounded-2xl hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white/95 backdrop-blur-sm text-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5" />
            View Details
          </span>
        </div>

        {isSoldOut && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center rounded-xl sm:rounded-2xl">
            <span className="bg-rose-600 text-white text-[10px] sm:text-xs font-black px-3 sm:px-3.5 py-1 rounded-full uppercase tracking-widest shadow-lg">
              SOLD OUT
            </span>
          </div>
        )}
      </Link>

      {/* 3. PRODUCT INFO HIERARCHY */}
      <div className="flex-1 flex flex-col justify-between pt-1 sm:pt-2">
        <div className="space-y-0.5 sm:space-y-1">
          {/* Title (Clean 2-line clamp) */}
          <Link
            to={`/product/${productSlug}`}
            className="font-extrabold text-[12.5px] sm:text-sm md:text-base text-slate-900 line-clamp-2 hover:text-brand-primary transition-colors leading-snug min-h-[2.4em]"
          >
            {title}
          </Link>

          {/* Short Benefit / Ingredient Story */}
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
            {shortBenefit} • {weight}
          </p>

          {/* Rating Row (⭐ 4.8 · 2.4k reviews) */}
          <div className="flex items-center gap-1 sm:gap-1.5 pt-0.5">
            <div className="flex items-center gap-0.5 sm:gap-1 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200/60 shrink-0">
              <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 fill-amber-400 text-amber-400" />
              <span className="text-[10.5px] sm:text-xs font-black text-slate-800">{rating}</span>
            </div>
            <span className="text-[9.5px] sm:text-[11px] text-slate-500 font-medium truncate">
              ({reviews} reviews)
            </span>
          </div>
        </div>

        {/* 4. PRICE & PRIMARY BRAND GREEN ADD BUTTON / COMPACT STEPPER */}
        <div className="mt-2.5 sm:mt-3.5 pt-2 sm:pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Price with clean stacking on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 shrink min-w-0">
            <span className="text-[13.5px] sm:text-base md:text-lg font-black text-slate-900 leading-none">₹{price}</span>
            {originalPrice && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through leading-none mt-0.5 sm:mt-0">₹{originalPrice}</span>
            )}
          </div>

          {/* CTA Action */}
          {isSoldOut ? (
            <button
              disabled
              aria-label={`${title} is currently sold out`}
              className="bg-slate-200 text-slate-500 text-[10px] sm:text-xs font-black px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full cursor-not-allowed uppercase shrink-0"
            >
              Sold Out
            </button>
          ) : cartQuantity > 0 ? (
            <div className="flex items-center bg-emerald-50 rounded-full border border-emerald-300 p-0.5 shadow-2xs shrink-0">
              <button
                onClick={() => onUpdateCartQuantity && onUpdateCartQuantity(id, cartQuantity - 1)}
                aria-label={`Decrease quantity of ${title}`}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-brand-forest hover:bg-emerald-100 font-black shadow-2xs active:scale-90 cursor-pointer"
              >
                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <span className="w-5 sm:w-6 text-center font-black text-[11px] sm:text-xs text-brand-forest">{cartQuantity}</span>
              <button
                onClick={() => onUpdateCartQuantity && onUpdateCartQuantity(id, cartQuantity + 1)}
                aria-label={`Increase quantity of ${title}`}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-forest flex items-center justify-center text-white hover:bg-brand-primary-hover font-black shadow-2xs active:scale-90 cursor-pointer"
              >
                <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              aria-label={`Add ${title} to cart`}
              className={`text-[10.5px] sm:text-xs font-black px-3 sm:px-5 py-1.5 sm:py-2.5 min-h-7.5 sm:min-h-9.5 rounded-full transition-all duration-200 flex items-center justify-center gap-1 shadow-xs active:scale-95 cursor-pointer shrink-0 ${
                justAdded
                  ? 'bg-emerald-700 text-white scale-95'
                  : 'bg-brand-forest hover:bg-brand-primary-hover text-white shadow-brand-forest/20'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-3" />
                  <span>ADDED</span>
                </>
              ) : (
                <span>ADD</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
