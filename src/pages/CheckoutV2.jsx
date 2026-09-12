import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { CROSS_SELL_PRODUCTS } from '../data/products';
import { paymentService } from '../services/paymentService';
import { 
  ShieldCheck, 
  Truck, 
  Gift, 
  Tag, 
  CheckCircle2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Lock,
  CreditCard,
  Wallet
} from 'lucide-react';
import ProductVisual from '../components/ProductVisual';

export default function CheckoutV2({
  cartItems = [],
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onOpenAuth
}) {
  const { user, isAuthenticated } = useAuth();

  const { cartItems: ctxCartItems, addToCart: ctxAddToCart, updateQuantity: ctxUpdateQty, removeFromCart: ctxRemoveFromCart } = useCart();

  const effectiveCartItems = cartItems?.length ? cartItems : ctxCartItems || [];
  const handleAdd = onAddToCart || ctxAddToCart;
  const handleUpdateQty = onUpdateQuantity || ctxUpdateQty;
  const _handleRemove = onRemoveItem || ctxRemoveFromCart;

  // Pincode & Delivery states
  const [pincode, setPincode] = useState('462016');
  const [isEditingPin, setIsEditingPin] = useState(false);
  const [tempPin, setTempPin] = useState('462016');

  // Customer shipping details
  const [customer, setCustomer] = useState({
    name: user?.name || 'Pooja Sharma',
    phone: user?.phone || '9876543210',
    email: user?.email || 'pooja.sharma@example.com',
    address: 'Flat 402, Sunshine Orchards, Arera Colony',
    city: 'Bhopal',
    state: 'Madhya Pradesh'
  });

  // Sync customer details if user logs in
  useEffect(() => {
    if (user) {
      setCustomer((prev) => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState({ code: 'JOY30', discountPercent: 22, discountAmount: 298 });
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('JOY30 Applied! You saved ₹298');

  // Payment modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  // Active items fallback so checkout looks authentic immediately
  const activeItems = effectiveCartItems.length > 0 ? effectiveCartItems : [
    {
      id: "immunity-support-kit",
      title: "Immunity Support Kit (Nutrimix + Gummies)",
      price: 999,
      originalPrice: 1198,
      quantity: 1,
      category: "Best Value",
      visualType: "combo",
      age: "4-6 Yr",
      weight: "Combo"
    }
  ];

  // Price calculations
  const rawItemTotal = activeItems.reduce((acc, item) => {
    const orig = item.originalPrice || (item.price * 1.25);
    return acc + Math.round(orig) * item.quantity;
  }, 0);

  const baseSubtotal = activeItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const calculatedDiscount = appliedCoupon
    ? (appliedCoupon.discountAmount || Math.round(baseSubtotal * (appliedCoupon.discountPercent / 100)))
    : (rawItemTotal - baseSubtotal);

  const subtotal = Math.max(0, baseSubtotal - (appliedCoupon ? appliedCoupon.discountAmount : 0));
  const handlingFee = 9; // Exactly as in prompt: "Order Handling Charges ₹9"
  const orderTotal = subtotal + handlingFee;
  const totalSavingsPercent = Math.round(((rawItemTotal - orderTotal) / rawItemTotal) * 100) || 22;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponInput.trim().toUpperCase();

    if (!code) return;

    if (code === 'JOY30') {
      const disc = 298;
      setAppliedCoupon({ code: 'JOY30', discountPercent: 30, discountAmount: disc });
      setCouponSuccess('JOY30 applied! Saved ₹298');
    } else if (code === 'FIRST100') {
      setAppliedCoupon({ code: 'FIRST100', discountPercent: 0, discountAmount: 100 });
      setCouponSuccess('FIRST100 applied! Saved ₹100');
    } else if (code === 'LJWALLET') {
      const disc = Math.round(baseSubtotal * 0.25);
      setAppliedCoupon({ code: 'LJWALLET', discountPercent: 25, discountAmount: disc });
      setCouponSuccess('LJWALLET applied! Saved 25%');
    } else {
      setCouponError('Invalid coupon code. Try JOY30, FIRST100, or LJWALLET');
    }
    setCouponInput('');
  };

  const handlePlaceOrder = () => {
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = async () => {
    setIsProcessingPayment(true);

    await paymentService.processPayment({
      orderTotal,
      paymentMethod: selectedPaymentMethod,
      customerDetails: customer,
      onSuccess: (paymentResult) => {
        setIsProcessingPayment(false);
        setIsPaymentModalOpen(false);
        setOrderConfirmed({
          orderId: `LJ-ORD-${Date.now().toString().slice(-6)}`,
          transactionId: paymentResult.transactionId,
          paymentMethod: paymentResult.paymentMethod || selectedPaymentMethod,
          total: orderTotal,
          deliveryDate: 'Monday, 14th September 2026',
          pincode
        });
      },
      onFailure: (err) => {
        setIsProcessingPayment(false);
        alert(`Payment failed: ${err.message}. Please try another payment method.`);
      }
    });
  };

  if (orderConfirmed) {
    return (
      <div className="bg-[#FFF9F5] min-h-screen py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-lg bg-white rounded-3xl p-8 shadow-2xl border border-emerald-100 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-black uppercase text-emerald-600 tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
            Order Placed Successfully!
          </span>

          <h2 className="text-2xl font-black text-slate-900 mt-3 mb-2">Thank you for nourishing with us!</h2>
          <p className="text-xs text-slate-500 mb-6">
            A confirmation SMS &amp; WhatsApp has been sent to <strong>+91 {customer.phone}</strong>.
          </p>

          <div className="bg-[#FFF9F5] rounded-2xl p-5 text-left border border-orange-100 space-y-3 mb-6 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Order ID:</span>
              <span className="font-mono font-bold text-slate-800">{orderConfirmed.orderId}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Payment Mode:</span>
              <span className="font-bold text-slate-800 uppercase">{orderConfirmed.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Estimated Delivery:</span>
              <span className="font-bold text-emerald-700">{orderConfirmed.deliveryDate}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping to Pincode:</span>
              <span className="font-bold text-slate-800">{orderConfirmed.pincode}</span>
            </div>
            <div className="border-t border-orange-200/60 pt-2 flex justify-between text-sm font-black text-slate-900">
              <span>Total Paid:</span>
              <span className="text-pink-600">₹{orderConfirmed.total}</span>
            </div>
          </div>

          <Link
            to="/shop/all"
            className="block w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-pink-500/25 transition-transform active:scale-95"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9F5] min-h-screen py-8 md:py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Page Title */}
        <div className="flex items-center justify-between pb-6 border-b border-orange-100 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800">Checkout</h1>
            <p className="text-xs text-slate-500 mt-0.5">Complete your order for doctor-formulated nutrition</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold bg-white px-3 py-1.5 rounded-full border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Verified &amp; Safe</span>
          </div>
        </div>

        {/* Authentication status banner */}
        {!isAuthenticated ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-white flex items-center justify-center font-bold">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800">Have a Little Joys Account?</h4>
                <p className="text-[11px] text-amber-800">Login via OTP to apply your ₹200 Wallet cash and save up to 30%!</p>
              </div>
            </div>
            <button
              onClick={onOpenAuth}
              className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-black px-5 py-2 rounded-xl transition-transform active:scale-95 shadow-sm"
            >
              Login via OTP
            </button>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Logged in as <strong>{user.name}</strong> (+91 {user.phone})</span>
            </div>
            <span className="text-xs font-black text-amber-700 bg-white px-3 py-1 rounded-full border border-amber-200">
              ₹{user.walletBalance || 200} Wallet Cash Available
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address, Cart Items, Cross-sell */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Timeline Card */}
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase text-emerald-700 tracking-wider">
                      Standard Delivery
                    </span>
                    <h3 className="text-base font-black text-slate-800 mt-0.5">
                      Get by Monday, 14th September 2026 at {pincode}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {customer.name} • {customer.address}, {customer.city}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsEditingPin(!isEditingPin)}
                  className="text-xs font-black text-pink-600 hover:underline shrink-0"
                >
                  {isEditingPin ? 'Done' : 'Change'}
                </button>
              </div>

              {isEditingPin && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={tempPin}
                    onChange={(e) => setTempPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit Pincode"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 w-36 focus:outline-none focus:border-pink-500"
                  />
                  <button
                    onClick={() => { setPincode(tempPin); setIsEditingPin(false); }}
                    className="bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-xl"
                  >
                    Check
                  </button>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                  Order Items ({activeItems.length} {activeItems.length === 1 ? 'Item' : 'Items'})
                </h3>
                <Link to="/shop/all" className="text-xs font-bold text-pink-600 hover:underline">
                  + Add more
                </Link>
              </div>

              {/* Free First Order Gift Banner */}
              <div className="bg-gradient-to-r from-amber-50 to-pink-50 border border-amber-200/70 rounded-2xl p-3.5 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-white flex items-center justify-center font-bold shadow-xs">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800">First Order Gift: Brain Gym XP Activity Book</div>
                    <div className="text-[10px] text-amber-700 font-bold">Complimentary bonus added to your pack</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 line-through">₹99</span>
                  <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    FREE!
                  </span>
                </div>
              </div>

              {/* Items in cart */}
              <div className="divide-y divide-slate-100">
                {activeItems.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 items-center justify-between">
                    <div className="w-14 h-14 bg-[#FFF9F5] rounded-xl border border-orange-100 flex items-center justify-center p-1 shrink-0">
                      <ProductVisual type={item.visualType || 'nutrimix'} age={item.age || '4+'} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs md:text-sm text-slate-800 truncate">{item.title}</h4>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {item.weight || 'Standard Pack'} • {item.age || 'For Kids'}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-black text-slate-900 text-sm">₹{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">₹{item.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center bg-slate-50 rounded-full border border-slate-200 p-0.5">
                      <button
                        onClick={() => handleUpdateQty && handleUpdateQty(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-600 hover:text-pink-600"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQty && handleUpdateQty(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-600 hover:text-pink-600"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parents Also Purchase (Cross-sell) */}
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-pink-600 tracking-wider block">Frequently Added</span>
                  <h3 className="text-base font-black text-slate-800">Parents Also Purchase</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {CROSS_SELL_PRODUCTS.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#FFF9F5] border border-orange-100/70 hover:border-pink-200 transition-colors"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 border border-slate-100 shrink-0">
                      <ProductVisual type={prod.visualType} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs text-slate-800 truncate">{prod.title}</h5>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                        <span className="font-black text-slate-900">₹{prod.price}</span>
                        {prod.originalPrice && (
                          <span className="line-through text-slate-400">₹{prod.originalPrice}</span>
                        )}
                        <span>• ★ {prod.rating}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAdd && handleAdd(prod)}
                      className="bg-white hover:bg-pink-500 hover:text-white text-pink-600 border border-pink-200 rounded-xl px-3 py-1.5 text-[11px] font-black transition-colors shrink-0 shadow-xs active:scale-95"
                    >
                      ADD
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Coupon, Bill Breakdown, Place Order */}
          <div className="lg:col-span-5 space-y-6">
            {/* Offers & Benefits / Coupon */}
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-800 tracking-wider mb-3">
                <Tag className="w-4 h-4 text-pink-500" />
                <span>Offers &amp; Benefits</span>
              </div>

              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter Coupon (e.g. JOY30)"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold uppercase text-slate-800 focus:outline-none focus:border-pink-500"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-5 py-2.5 rounded-xl uppercase transition-transform active:scale-95"
                >
                  Apply
                </button>
              </form>

              {couponSuccess && (
                <div className="mt-2.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center justify-between border border-emerald-200">
                  <span>✓ {couponSuccess}</span>
                  <button onClick={() => { setAppliedCoupon(null); setCouponSuccess(''); }} className="text-slate-400 hover:text-red-500">
                    Remove
                  </button>
                </div>
              )}

              {couponError && (
                <p className="mt-2 text-[11px] font-bold text-rose-600">
                  {couponError}
                </p>
              )}

              {/* Suggested coupons */}
              <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold">
                <button
                  onClick={() => { setAppliedCoupon({ code: 'JOY30', discountPercent: 30, discountAmount: 298 }); setCouponSuccess('JOY30 Applied!'); }}
                  className="bg-pink-50 text-pink-700 border border-pink-200 px-2.5 py-1 rounded-md hover:bg-pink-100"
                >
                  JOY30 (Save 30%)
                </button>
                <button
                  onClick={() => { setAppliedCoupon({ code: 'FIRST100', discountPercent: 0, discountAmount: 100 }); setCouponSuccess('FIRST100 Applied!'); }}
                  className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-md hover:bg-amber-100"
                >
                  FIRST100 (₹100 Off)
                </button>
              </div>
            </div>

            {/* Order Summary Bill */}
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Item total</span>
                  <span className="font-bold text-slate-800">₹{rawItemTotal}</span>
                </div>

                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Item Discount</span>
                  <span>-₹{calculatedDiscount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800">₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <span>Order Handling Charges</span>
                  </div>
                  <span className="font-bold text-slate-800">₹{handlingFee}</span>
                </div>

                <div className="flex justify-between text-emerald-600">
                  <span>Shipping Fee</span>
                  <span className="font-black">FREE</span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline text-base font-black text-slate-900">
                  <div>
                    <span>Order total</span>
                    <span className="block text-[11px] font-bold text-emerald-600">
                      {totalSavingsPercent}% OFF Overall
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl text-pink-600">₹{orderTotal}</span>
                    <span className="text-xs text-slate-400 line-through block font-normal">₹{rawItemTotal + handlingFee}</span>
                  </div>
                </div>
              </div>

              {/* Single Place Order Button (No duplicate!) */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-black py-4 rounded-full text-sm uppercase tracking-wider transition-all shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2"
              >
                <span>Place Order • ₹{orderTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-2">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit Bank Grade SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENT GATEWAY MODAL */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsPaymentModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl z-10 border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-[10px] font-black uppercase text-pink-600 tracking-wider">Payment Gateway</span>
                <h3 className="text-xl font-black text-slate-800">Select Payment Method</h3>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Total Payable</div>
                <div className="text-lg font-black text-pink-600">₹{orderTotal}</div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 mb-6">
              {/* UPI */}
              <label
                onClick={() => setSelectedPaymentMethod('UPI')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedPaymentMethod === 'UPI'
                    ? 'border-pink-500 bg-pink-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">
                    UPI
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800">Instant UPI (PhonePe, GPay, Paytm)</div>
                    <div className="text-[10px] text-emerald-600 font-bold">Fastest &amp; Most Recommended</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPaymentMethod === 'UPI'}
                  onChange={() => setSelectedPaymentMethod('UPI')}
                  className="accent-pink-500"
                />
              </label>

              {/* Cards (Credit / Debit) */}
              <label
                onClick={() => setSelectedPaymentMethod('CARD')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedPaymentMethod === 'CARD'
                    ? 'border-pink-500 bg-pink-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800">Credit / Debit Card</div>
                    <div className="text-[10px] text-slate-400">Visa, Mastercard, RuPay, Amex</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPaymentMethod === 'CARD'}
                  onChange={() => setSelectedPaymentMethod('CARD')}
                  className="accent-pink-500"
                />
              </label>

              {/* LJ Wallet */}
              <label
                onClick={() => setSelectedPaymentMethod('WALLET')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedPaymentMethod === 'WALLET'
                    ? 'border-pink-500 bg-pink-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                    ₹
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800">LJ Wallet Balance</div>
                    <div className="text-[10px] text-amber-700 font-bold">
                      ₹{user?.walletBalance || 200} Available Credit
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPaymentMethod === 'WALLET'}
                  onChange={() => setSelectedPaymentMethod('WALLET')}
                  className="accent-pink-500"
                />
              </label>

              {/* Cash On Delivery */}
              <label
                onClick={() => setSelectedPaymentMethod('COD')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedPaymentMethod === 'COD'
                    ? 'border-pink-500 bg-pink-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    COD
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800">Cash on Delivery</div>
                    <div className="text-[10px] text-slate-400">Pay at your doorstep</div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPaymentMethod === 'COD'}
                  onChange={() => setSelectedPaymentMethod('COD')}
                  className="accent-pink-500"
                />
              </label>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleConfirmPayment}
              disabled={isProcessingPayment}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black py-4 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              {isProcessingPayment ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay Securely ₹{orderTotal}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
