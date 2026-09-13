import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore, useCartDerived, VALID_COUPONS } from '@/stores/cartStore';
import { CROSS_SELL_PRODUCTS } from '@/data/products';
import ProductVisual from '@/components/product/ProductVisual';
import SEO from '@/components/common/SEO';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Gift, 
  Tag, 
  Check, 
  X, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    subtotal,
    mrpTotal,
    mrpSavings,
    couponDiscount,
    totalSavings,
    deliveryFee,
    totalPayable,
    appliedCoupon,
    freeGiftThreshold,
    freeGiftAmountLeft,
    isFreeGiftUnlocked
  } = useCartDerived();
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const addToCart = useCartStore((s) => s.addToCart);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);

  const handleApplyCoupon = (codeToApply) => {
    const code = codeToApply || couponInput;
    if (!code || !code.trim()) {
      setCouponMessage({ type: 'error', text: 'Please enter a coupon code' });
      return;
    }
    const result = applyCoupon(code);
    if (result.success) {
      setCouponMessage({ type: 'success', text: result.message });
      setCouponInput('');
    } else {
      setCouponMessage({ type: 'error', text: result.message });
    }
  };

  const freeGiftProgress = Math.min(100, Math.round((subtotal / freeGiftThreshold) * 100));

  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <SEO
          title="Your Cart is Empty | Little Joys"
          description="Explore our pediatric-formulated kids nutrition, sprouted ragi Nutrimix, and multivitamin gummies."
        />
        <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-orange-100 p-8 text-center space-y-6">
          <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner border border-pink-100">
            🛒
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Your Cart is Empty!</h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Explore our range of clean nutrition, sprouted millet Nutrimix, and gelatin-free gummies designed for growing kids.
            </p>
          </div>
          <Link
            to="/shop/all"
            className="inline-flex items-center justify-center gap-2 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-pink-500/25 transition-all transform active:scale-98"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-6 md:py-10">
      <SEO
        title={`Shopping Cart (${cartItems.length} items) | Little Joys`}
        description="Review your Little Joys clean kids nutrition cart, apply coupons, and checkout securely."
      />
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-1">
              <Link to="/" className="hover:text-pink-600">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-700">Shopping Cart</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <span>Shopping Bag</span>
              <span className="text-sm font-bold bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </h1>
          </div>
          <Link
            to="/shop/all"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Free Gift Progress Bar Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-700">
                <Gift className="w-4 h-4" />
              </div>
              <p className="text-xs md:text-sm font-bold text-amber-900">
                {isFreeGiftUnlocked ? (
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    🎉 Free Gift Unlocked: Sprouted Millet Crunch Snack Pack!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-pink-600 font-black">₹{freeGiftAmountLeft}</strong> more to unlock a <strong>Free Gift</strong>!
                  </span>
                )}
              </p>
            </div>
            <span className="text-xs font-black text-amber-800 shrink-0">
              {freeGiftProgress}%
            </span>
          </div>
          <div className="w-full bg-amber-100 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFreeGiftUnlocked ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-400 to-pink-500'
              }`}
              style={{ width: `${freeGiftProgress}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Cart Items (Left) vs Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Items list & Cross-Sell (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Cart Items Card */}
            <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-orange-100 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                  Product Details
                </h2>
                <span className="text-xs text-slate-400">Prices are inclusive of all taxes</span>
              </div>

              <div className="divide-y divide-slate-100">
                {cartItems.map((item) => {
                  const itemTotal = item.price * (item.quantity || 1);
                  const itemMrpTotal = (item.originalPrice || item.price) * (item.quantity || 1);
                  const itemSavings = itemMrpTotal - itemTotal;

                  return (
                    <div key={item.id || item.slug} className="py-5 first:pt-2 last:pb-2 flex gap-4 md:gap-5">
                      {/* Product Visual Thumbnail */}
                      <Link
                        to={`/product/${item.slug || item.id}`}
                        className="w-20 h-24 md:w-24 md:h-28 rounded-2xl bg-orange-50/60 border border-orange-100 flex items-center justify-center p-2 shrink-0 group overflow-hidden"
                      >
                        <ProductVisual
                          image={item.image}
                          type={item.visualType || 'nutrimix'}
                          flavor={item.flavor || 'chocolate'}
                          alt={item.title || item.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </Link>

                      {/* Product Info & Controls */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              to={`/product/${item.slug || item.id}`}
                              className="text-sm md:text-base font-black text-slate-800 hover:text-pink-600 transition-colors leading-snug"
                            >
                              {item.title || item.name}
                            </Link>
                            <button
                              onClick={() => removeFromCart(item.id || item.slug)}
                              className="text-slate-300 hover:text-rose-500 transition-colors p-1 rounded-lg"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Tags: Age & Weight */}
                          <div className="flex items-center gap-2 mt-1">
                            {item.weight && (
                              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                {item.weight}
                              </span>
                            )}
                            {item.age && (
                              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                                Age {item.age}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price & Quantity Adjuster */}
                        <div className="flex items-end justify-between mt-4">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-base md:text-lg font-black text-slate-900">
                                ₹{item.price}
                              </span>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <span className="text-xs text-slate-400 line-through">
                                  ₹{item.originalPrice}
                                </span>
                              )}
                            </div>
                            {itemSavings > 0 && (
                              <p className="text-[11px] font-bold text-emerald-600">
                                You save ₹{itemSavings}
                              </p>
                            )}
                          </div>

                          {/* - 1 + Quantity Controls */}
                          <div className="flex items-center border-2 border-pink-200 bg-pink-50/40 rounded-full px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.id || item.slug, (item.quantity || 1) - 1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors active:scale-90"
                              title="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-black text-slate-800">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id || item.slug, (item.quantity || 1) + 1)}
                              className="w-7 h-7 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors active:scale-90"
                              title="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cross-Sell: Parents Also Purchase Carousel */}
            <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-orange-100">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm md:text-base font-black text-slate-800">
                  Parents Also Add to Bag
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CROSS_SELL_PRODUCTS.map((prod) => (
                  <div
                    key={prod.id}
                    className="border border-slate-100 bg-orange-50/30 rounded-2xl p-3 flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="h-16 flex items-center justify-center mb-2">
                      <ProductVisual image={prod.image} type={prod.visualType} flavor={prod.flavor} alt={prod.title} className="w-12 h-12 object-contain" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-black text-slate-800 line-clamp-2 leading-tight">
                        {prod.title}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-900">₹{prod.price}</span>
                        <span className="text-[10px] text-slate-400 line-through">₹{prod.originalPrice}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart({ ...prod, quantity: 1 })}
                      className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-1.5 rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> ADD
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Coupons & Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Coupons Card */}
            <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-orange-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-pink-500" />
                  <h2 className="text-sm font-black text-slate-800">Apply Coupon Code</h2>
                </div>
                {appliedCoupon && (
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Remove
                  </button>
                )}
              </div>

              {/* Input Form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Enter coupon (e.g. JOY30)"
                  aria-label="Enter coupon code"
                  className="flex-1 uppercase font-bold text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-pink-500 focus:bg-white"
                />
                <button
                  onClick={() => handleApplyCoupon()}
                  className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-transform active:scale-95"
                >
                  Apply
                </button>
              </div>

              {/* Status Message */}
              {couponMessage && (
                <p
                  className={`text-xs font-bold flex items-center gap-1 ${
                    couponMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {couponMessage.type === 'success' ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>{couponMessage.text}</span>
                </p>
              )}

              {/* Quick Coupon Chips */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Available Offers
                </p>
                <div className="space-y-2">
                  {VALID_COUPONS.map((coupon) => {
                    const isSelected = appliedCoupon?.code === coupon.code;
                    return (
                      <div
                        key={coupon.code}
                        onClick={() => handleApplyCoupon(coupon.code)}
                        className={`cursor-pointer border rounded-2xl p-2.5 flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50/50'
                            : 'border-dashed border-slate-200 hover:border-pink-300 hover:bg-pink-50/30'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                              {coupon.code}
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-black bg-emerald-600 text-white px-1.5 py-0.2 rounded">
                                APPLIED
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">{coupon.description}</p>
                        </div>
                        <span className="text-xs font-bold text-pink-600">
                          {isSelected ? 'Applied' : 'Tap to Apply'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bill Summary Card */}
            <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-orange-100 space-y-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-xs md:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Bag MRP Total</span>
                  <span className="font-bold text-slate-900">₹{mrpTotal}</span>
                </div>

                <div className="flex justify-between text-emerald-600">
                  <span>Product Savings</span>
                  <span className="font-bold">- ₹{mrpSavings}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                    <span className="font-bold">- ₹{couponDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charges</span>
                  {deliveryFee === 0 ? (
                    <span className="font-bold text-emerald-600 uppercase tracking-wider text-xs">
                      FREE
                    </span>
                  ) : (
                    <span className="font-bold text-slate-900">₹{deliveryFee}</span>
                  )}
                </div>

                {deliveryFee > 0 && (
                  <p className="text-[11px] text-slate-400">
                    Add ₹{499 - subtotal} more for <strong>FREE Delivery</strong>
                  </p>
                )}

                <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm md:text-base font-black text-slate-900">Total Payable</span>
                    <p className="text-[10px] text-slate-400">Inclusive of all taxes</p>
                  </div>
                  <span className="text-xl md:text-2xl font-black text-slate-900">
                    ₹{totalPayable}
                  </span>
                </div>
              </div>

              {totalSavings > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-center">
                  <p className="text-xs font-black text-emerald-700">
                    🎉 You are saving ₹{totalSavings} on this order!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout/address')}
                className="w-full bg-[#13805B] hover:bg-[#0E6346] text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-[#13805B]/25 transition-all transform active:scale-98 flex items-center justify-between"
              >
                <div className="text-left">
                  <span className="block text-[10px] opacity-80 uppercase tracking-wider font-bold">Payable Amount</span>
                  <span className="text-base font-black">₹{totalPayable}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Doctor Approved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-pink-500" />
                  <span>Express Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
