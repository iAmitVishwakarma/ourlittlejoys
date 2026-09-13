import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Plus, Minus, Check, Heart } from 'lucide-react';
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
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const productSlug = slug || id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const isFavorite = isInWishlist(id || productSlug);

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
    <div className={`bg-white rounded-3xl p-4 sm:p-5 shadow-xs border transition-all duration-300 flex flex-col justify-between relative group ${
      isSoldOut ? 'opacity-75 border-slate-200' : 'border-orange-100/80 hover:border-emerald-300 hover:shadow-lg'
    }`}>
      {/* 1. TOP BADGES (Tag + Age) */}
      <div className="flex justify-between items-center mb-2 z-10">
        <div className="flex items-center gap-1.5">
          {tag ? (
            <span className="bg-[#FF2F92] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
              {tag}
            </span>
          ) : discount > 0 ? (
            <span className="bg-[#13805B] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-wider shadow-2xs">
              {discount}% OFF
            </span>
          ) : null}

          {optionsCount && (
            <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full hidden sm:inline">
              {optionsCount} options
            </span>
          )}
        </div>

        {/* Age Indicator and Wishlist button */}
        <div className="flex items-center gap-1.5">
          <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-slate-200/80 shrink-0">
            {age}
          </span>
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`p-1.5 rounded-full transition-all duration-200 border cursor-pointer ${
              isFavorite
                ? 'bg-rose-50 text-rose-500 border-rose-200 shadow-xs scale-105'
                : 'bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-500 border-slate-200/80 shadow-2xs'
            }`}
            title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist"
          >
            <Heart size={13} className={isFavorite ? "fill-rose-500" : ""} />
          </button>
        </div>
      </div>

      {/* 2. LARGE PRODUCT IMAGE (+20% image area for immediate recognition) */}
      <Link
        to={`/product/${productSlug}`}
        className="block h-44 sm:h-52 md:h-56 my-2 relative overflow-hidden bg-gradient-to-b from-[#FFF9F5] via-white to-orange-50/30 rounded-2xl flex items-center justify-center cursor-pointer group-hover:scale-102 transition-transform"
      >
        <ProductVisual image={image} type={visualType} flavor={flavor} age={age} alt={title} />
        {isSoldOut && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center rounded-2xl">
            <span className="bg-rose-600 text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-lg">
              SOLD OUT
            </span>
          </div>
        )}
      </Link>

      {/* 3. PRODUCT INFO HIERARCHY */}
      <div className="flex-1 flex flex-col justify-between pt-2">
        <div className="space-y-1">
          {/* Title (14-16px bold, readable) */}
          <Link
            to={`/product/${productSlug}`}
            className="font-black text-sm sm:text-base text-slate-900 line-clamp-2 hover:text-[#13805B] transition-colors leading-snug"
          >
            {title}
          </Link>

          {/* Short Benefit / Ingredient Story */}
          <p className="text-xs text-slate-500 font-medium truncate">
            {shortBenefit} • {weight}
          </p>

          {/* Rating Row (⭐ 4.8 · 4.6k reviews) */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black text-slate-800">{rating}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">
              ({reviews} reviews)
            </span>
          </div>
        </div>

        {/* 4. PRICE & PRIMARY BRAND GREEN ADD BUTTON */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-xl font-black text-slate-900">₹{price}</span>
              {originalPrice && (
                <span className="text-xs text-slate-500 line-through">₹{originalPrice}</span>
              )}
            </div>
          </div>

          {isSoldOut ? (
            <button
              disabled
              aria-label={`${title} is currently sold out`}
              className="bg-slate-200 text-slate-500 text-xs font-black px-4 py-2 rounded-full cursor-not-allowed uppercase min-h-[44px]"
            >
              Sold Out
            </button>
          ) : cartQuantity > 0 ? (
            <div className="flex items-center bg-emerald-50 rounded-full border border-emerald-300 p-1 shadow-2xs">
              <button
                onClick={() => onUpdateCartQuantity && onUpdateCartQuantity(id, cartQuantity - 1)}
                aria-label={`Decrease quantity of ${title}`}
                className="w-9 h-9 min-w-[40px] min-h-[40px] rounded-full bg-white flex items-center justify-center text-[#13805B] hover:bg-emerald-100 font-black shadow-xs active:scale-90 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-black text-xs sm:text-sm text-[#13805B]">{cartQuantity}</span>
              <button
                onClick={() => onUpdateCartQuantity && onUpdateCartQuantity(id, cartQuantity + 1)}
                aria-label={`Increase quantity of ${title}`}
                className="w-9 h-9 min-w-[40px] min-h-[40px] rounded-full bg-[#13805B] flex items-center justify-center text-white hover:bg-[#0E6346] font-black shadow-xs active:scale-90 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              aria-label={`Add ${title} to cart`}
              className={`text-xs font-black px-5 sm:px-6 py-2.5 sm:py-3 min-h-[44px] rounded-full transition-all duration-200 flex items-center justify-center space-x-1 shadow-md active:scale-95 cursor-pointer ${
                justAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#13805B] hover:bg-[#0E6346] text-white shadow-[#13805B]/20'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
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
