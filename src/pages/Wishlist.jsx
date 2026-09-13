import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import SEO from "@/components/common/SEO";
import ProductVisual from "@/components/product/ProductVisual";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import { HeartDoodle, MiniStarCluster } from "@/components/graphics/KidsDoodles";
import { calculateDiscountPercentage } from "@/utils/pricing";

export default function Wishlist() {
  const wishlistItems = useWishlistStore((s) => s.wishlistItems);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
  const addToCart = useCartStore((s) => s.addToCart);
  const navigate = useNavigate();

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (title, subtext = "") => {
    setToastMessage({ title, subtext });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Move single item to bag
  const handleMoveToBag = (item) => {
    addToCart({
      id: item.id || item.slug,
      slug: item.slug,
      title: item.title || item.name,
      price: item.price,
      originalPrice: item.originalPrice || item.mrp || item.price,
      quantity: 1,
      image: item.image,
      visualType: item.visualType,
      flavor: item.flavor,
    });
    removeFromWishlist(item.id || item.slug);
    showToast(
      `${item.title || item.name} moved to bag! 🛍️`,
      "Ready for checkout whenever you are.",
    );
  };

  // Move all items to bag
  const handleMoveAllToBag = () => {
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach((item) => {
      addToCart({
        id: item.id || item.slug,
        slug: item.slug,
        title: item.title || item.name,
        price: item.price,
        originalPrice: item.originalPrice || item.mrp || item.price,
        quantity: 1,
        image: item.image,
        visualType: item.visualType,
        flavor: item.flavor,
      });
      removeFromWishlist(item.id || item.slug);
    });
    showToast(
      "All wishlist items moved to bag! 🛒",
      "Head to cart to review your order.",
    );
  };

  const handleRemove = (item) => {
    removeFromWishlist(item.id || item.slug);
    showToast("Removed from wishlist", item.title || item.name);
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-24 pt-4 md:pt-6 font-sans selection:bg-pink-100 selection:text-pink-600">
      <SEO
        title={`My Wishlist (${wishlistItems.length}) | Little Joys`}
        description="View and manage your saved Little Joys pediatric nutrition powders, gummies, and healthy treats."
      />

      {/* Floating Animated Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce max-w-md bg-white border border-pink-200 shadow-xl rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-2">
            <p className="text-xs font-black text-slate-900">{toastMessage.title}</p>
            {toastMessage.subtext && (
              <p className="text-[11px] text-slate-500 mt-0.5">{toastMessage.subtext}</p>
            )}
          </div>
          <Link
            to="/cart"
            className="text-[11px] font-extrabold text-[#FF2F92] hover:underline shrink-0 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-100"
          >
            View Cart &rarr;
          </Link>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-slate-600 ml-1 cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Link to="/" className="hover:text-pink-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900">Wishlist</span>
        </nav>

        {/* Wishlist Header Banner */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-orange-100/90 shadow-2xs overflow-hidden">
          <div className="absolute -top-3 -right-3 text-pink-100/60 pointer-events-none">
            <HeartDoodle className="w-24 h-24" />
          </div>
          <div className="absolute bottom-2 left-1/3 text-amber-200/40 pointer-events-none hidden sm:block">
            <MiniStarCluster className="text-amber-400" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-[#FF2F92] bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                  <Sparkles className="w-3 h-3" />
                  Saved Favorites
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <span>My Wishlist</span>
                <span className="text-sm sm:text-base font-bold text-slate-500 bg-slate-100 px-3 py-0.5 rounded-full">
                  {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Doctor-formulated clean nutrition products bookmarked for your child.
              </p>
            </div>

            {wishlistItems.length > 0 && (
              <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={handleMoveAllToBag}
                  className="bg-[#FF2F92] hover:bg-pink-600 text-white text-xs font-black px-4 py-2.5 rounded-2xl shadow-xs transition-all active:scale-98 flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Move All to Bag</span>
                </button>
                <Link
                  to="/shop/all"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-2xl transition-colors flex items-center gap-1.5"
                >
                  <span>Continue Shopping</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Wishlist Items Content */}
        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-orange-100 shadow-2xs space-y-4 max-w-xl mx-auto my-8">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-pink-50 border border-pink-100 flex items-center justify-center text-3xl shadow-xs">
              ❤️
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Your wishlist is empty
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Explore our pediatrician-crafted sprouted nutrition powders, clean multivitamin gummies, and high-fibre snacks. Tap the heart icon to save products for later!
              </p>
            </div>
            <div className="pt-3">
              <Link
                to="/shop/all"
                className="inline-flex items-center gap-2 bg-[#FF2F92] hover:bg-pink-600 text-white text-xs sm:text-sm font-black px-6 py-3 rounded-2xl shadow-sm transition-all active:scale-98"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {wishlistItems.map((item) => {
              const itemId = item.id || item.slug;
              const productPath = `/product/${item.slug || item.id}`;
              const originalPrice = item.originalPrice || item.mrp || item.price;
              const discountPercent = calculateDiscountPercentage(originalPrice, item.price);

              return (
                <div
                  key={itemId}
                  className="group bg-white rounded-3xl p-4 border border-orange-100/90 shadow-2xs hover:shadow-md hover:border-pink-200 transition-all flex flex-col justify-between"
                >
                  {/* Visual & Badges */}
                  <div className="relative">
                    <div className="relative aspect-square w-full rounded-2xl bg-[#FFF5EE] overflow-hidden flex items-center justify-center p-4">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title || item.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <ProductVisual
                          visualType={item.visualType}
                          flavor={item.flavor}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      )}

                      {/* Tag / Discount Badge */}
                      {discountPercent > 0 && (
                        <div className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-xs">
                          {discountPercent}% OFF
                        </div>
                      )}
                    </div>

                    {/* Remove Wishlist Button */}
                    <button
                      onClick={() => handleRemove(item)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-400 hover:text-rose-500 shadow-xs flex items-center justify-center transition-colors cursor-pointer border border-slate-100"
                      title="Remove from wishlist"
                      aria-label={`Remove ${item.title || item.name} from wishlist`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Info & Pricing */}
                  <div className="pt-3 pb-2 flex-1 flex flex-col justify-between">
                    <div>
                      {item.tag && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-600 block mb-0.5">
                          {item.tag}
                        </span>
                      )}
                      <Link
                        to={productPath}
                        className="text-xs sm:text-sm font-black text-slate-800 hover:text-pink-600 transition-colors line-clamp-2"
                      >
                        {item.title || item.name}
                      </Link>

                      {(item.flavor || item.weight) && (
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5 capitalize">
                          {item.flavor ? `${item.flavor} flavour` : ""}
                          {item.flavor && item.weight ? " • " : ""}
                          {item.weight || ""}
                        </p>
                      )}
                    </div>

                    <div className="pt-2.5 flex items-baseline gap-2">
                      <span className="text-base font-black text-slate-900">
                        ₹{item.price}
                      </span>
                      {originalPrice > item.price && (
                        <span className="text-xs font-semibold text-slate-400 line-through">
                          ₹{originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to Bag Action Button */}
                  <div className="pt-2 border-t border-slate-100/80">
                    <button
                      onClick={() => handleMoveToBag(item)}
                      className="w-full bg-[#FF2F92] hover:bg-pink-600 active:scale-98 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Back Link */}
        <div className="pt-4 flex justify-between items-center text-xs">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>

          <Link
            to="/profile"
            className="font-bold text-pink-600 hover:underline"
          >
            Go to My Profile &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
