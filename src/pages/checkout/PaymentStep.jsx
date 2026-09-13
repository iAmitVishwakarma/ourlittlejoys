import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { useCartStore, useCartDerived } from '@/stores/cartStore';
import CheckoutStepper from '@/components/checkout/CheckoutStepper';
import CheckoutOrderSummary from '@/components/checkout/CheckoutOrderSummary';
import SEO from '@/components/common/SEO';
import { 
  MapPin, 
  CreditCard, 
  Wallet, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Smartphone, 
  Banknote, 
  Lock,
  Sparkles,
  Loader2
} from 'lucide-react';

export default function PaymentStep() {
  const navigate = useNavigate();
  const { cartItems, totalPayable } = useCartDerived();
  const clearCart = useCartStore((s) => s.clearCart);
  const { 
    savedAddresses, 
    selectedAddressId, 
    paymentMethod, 
    setPaymentMethod,
    upiApp,
    setUpiApp,
    customUpiId,
    setCustomUpiId,
    useWalletBalance,
    toggleUseWallet,
    walletBalance,
    createOrder 
  } = useCheckoutStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });

  // Fallback selected address
  const selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];

  // If no items in cart, redirect back
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF9F5] py-12 px-4">
        <SEO title="Checkout - Cart Empty | Little Joys" description="Your shopping cart is currently empty." />
        <div className="container mx-auto max-w-lg text-center bg-white rounded-3xl p-8 border border-orange-100 shadow-sm space-y-4">
          <h1 className="text-xl font-black text-slate-900">Your Cart is Empty</h1>
          <p className="text-xs text-slate-500 font-medium">Please add products to your cart before proceeding.</p>
          <Link to="/cart" className="inline-block bg-[#13805B] text-white text-xs font-black px-6 py-3 rounded-full uppercase">
            Go to Cart
          </Link>
        </div>
      </div>
    );
  }

  // Calculate final payable considering wallet
  const walletDeduction = useWalletBalance ? Math.min(walletBalance, totalPayable) : 0;
  const finalPayable = Math.max(0, totalPayable - walletDeduction);

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    // Realistic banking authorization delay (1.2s)
    setTimeout(() => {
      const order = createOrder({
        items: cartItems,
        totalAmount: finalPayable,
        address: selectedAddress,
        paymentMethod,
        paymentDetails: paymentMethod === 'UPI' ? { app: upiApp, upiId: customUpiId || 'instant_upi@bank' } : null
      });

      clearCart();
      setIsProcessing(false);
      navigate('/checkout/success');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] pb-24 md:pb-16">
      <SEO title="Checkout - Payment Method | Little Joys" description="Complete payment securely for your Little Joys order." />
      {/* 1. Myntra-Style Step Navigation */}
      <CheckoutStepper currentStep="payment" />

      <div className="container mx-auto max-w-5xl px-4 py-6 md:py-8">
        
        {/* Selected Address Snapshot Bar (Answers "Maine kaunsa address choose kiya tha?") */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-orange-100 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#13805B] flex items-center justify-center border border-emerald-200 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900">Delivering to: {selectedAddress?.name}</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {selectedAddress?.type || 'HOME'}
                </span>
              </div>
              <p className="text-slate-500 font-medium truncate max-w-md mt-0.5">
                {selectedAddress?.addressLine}, {selectedAddress?.city} - {selectedAddress?.pincode}
              </p>
            </div>
          </div>

          <Link
            to="/checkout/address"
            className="text-xs font-black text-[#13805B] hover:text-[#0E6346] hover:underline shrink-0 pl-12 sm:pl-0"
          >
            Change Address →
          </Link>
        </div>

        {/* 2-Column Payment Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Selectable Payment Methods */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Select Payment Method
              </h1>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#13805B]" /> 100% Safe
              </span>
            </div>

            {/* Payment Method Cards */}
            <div className="space-y-3">
              
              {/* Option 1: UPI (Recommended) */}
              <div
                onClick={() => setPaymentMethod('UPI')}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'UPI'
                    ? 'border-[#13805B] bg-emerald-50/40 shadow-xs ring-2 ring-[#13805B]/15'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'UPI' ? 'border-[#13805B] bg-[#13805B]' : 'border-slate-300'
                      }`}
                    >
                      {paymentMethod === 'UPI' && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#13805B]" />
                      <span className="text-sm font-black text-slate-900">UPI</span>
                      <span className="text-[10px] font-bold text-slate-500 hidden sm:inline">(Google Pay, PhonePe, Paytm)</span>
                    </div>
                  </div>

                  <span className="bg-emerald-100 text-[#13805B] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    Extra ₹25 Cashback
                  </span>
                </div>

                {/* Sub-options if UPI is selected */}
                {paymentMethod === 'UPI' && (
                  <div className="mt-4 pt-4 border-t border-emerald-100 space-y-3">
                    <span className="text-xs font-bold text-slate-700 block">Choose an app:</span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'GPAY', label: 'Google Pay', icon: '🟢' },
                        { id: 'PHONEPE', label: 'PhonePe', icon: '🟣' },
                        { id: 'PAYTM', label: 'Paytm', icon: '🔵' },
                        { id: 'CUSTOM', label: 'Other UPI ID', icon: '⚡' }
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setUpiApp(app.id)}
                          className={`p-2.5 rounded-2xl border text-center text-xs font-bold transition-all ${
                            upiApp === app.id
                              ? 'border-[#13805B] bg-white shadow-2xs text-[#13805B]'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                          }`}
                        >
                          <span className="text-base block mb-0.5">{app.icon}</span>
                          <span className="truncate block text-[11px]">{app.label}</span>
                        </button>
                      ))}
                    </div>

                    {upiApp === 'CUSTOM' && (
                      <div className="pt-2">
                        <input
                          type="text"
                          placeholder="e.g. yourname@okhdfcbank"
                          value={customUpiId}
                          onChange={(e) => setCustomUpiId(e.target.value)}
                          className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#13805B] focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Option 2: Credit / Debit Card */}
              <div
                onClick={() => setPaymentMethod('CARD')}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'CARD'
                    ? 'border-[#13805B] bg-emerald-50/40 shadow-xs ring-2 ring-[#13805B]/15'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'CARD' ? 'border-[#13805B] bg-[#13805B]' : 'border-slate-300'
                      }`}
                    >
                      {paymentMethod === 'CARD' && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#13805B]" />
                      <span className="text-sm font-black text-slate-900">Credit / Debit Card</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                    <span>Visa</span> • <span>Mastercard</span> • <span>RuPay</span>
                  </div>
                </div>

                {paymentMethod === 'CARD' && (
                  <div className="mt-4 pt-4 border-t border-emerald-100 space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        placeholder="4111 2222 3333 4444"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#13805B] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Valid Thru</label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="MM / YY"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#13805B] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#13805B] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 3: Little Joys Wallet */}
              <div
                onClick={() => setPaymentMethod('WALLET')}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'WALLET'
                    ? 'border-[#13805B] bg-emerald-50/40 shadow-xs ring-2 ring-[#13805B]/15'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'WALLET' ? 'border-[#13805B] bg-[#13805B]' : 'border-slate-300'
                      }`}
                    >
                      {paymentMethod === 'WALLET' && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-[#FF2F92]" />
                      <span className="text-sm font-black text-slate-900">Little Joys Wallet</span>
                    </div>
                  </div>

                  <span className="text-xs font-black text-emerald-700">
                    Available: ₹{walletBalance}
                  </span>
                </div>

                {paymentMethod === 'WALLET' && (
                  <div className="mt-3 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>1-Tap Instant Checkout with Parenting Credits</span>
                    <Link to="/wallet-recharge" className="text-[#FF2F92] hover:underline">
                      Recharge for 30% Bonus →
                    </Link>
                  </div>
                )}
              </div>

              {/* Option 4: Cash on Delivery (COD) */}
              <div
                onClick={() => setPaymentMethod('COD')}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                  paymentMethod === 'COD'
                    ? 'border-[#13805B] bg-emerald-50/40 shadow-xs ring-2 ring-[#13805B]/15'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'COD' ? 'border-[#13805B] bg-[#13805B]' : 'border-slate-300'
                      }`}
                    >
                      {paymentMethod === 'COD' && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-black text-slate-900">Cash on Delivery</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-slate-400">Pay at Doorstep</span>
                </div>

                {paymentMethod === 'COD' && (
                  <p className="mt-3 pt-3 border-t border-emerald-100 text-xs text-slate-500 font-medium">
                    Pay in cash or scan QR upon delivery. Contactless delivery available with our trusted delivery partners.
                  </p>
                )}
              </div>

            </div>

          </div>

          {/* Right Column: Order Summary & Action */}
          <div className="lg:col-span-5 space-y-4">
            <CheckoutOrderSummary />

            {/* Desktop Place Order Button */}
            <button
              disabled={isProcessing}
              onClick={handlePlaceOrder}
              className="w-full bg-[#13805B] hover:bg-[#0E6346] text-white font-black py-4 px-6 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#13805B]/25 transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing with Bank...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order • ₹{finalPayable}</span>
                </>
              )}
            </button>

            {/* 256-Bit SSL Reassurance */}
            <div className="text-center text-[11px] font-semibold text-slate-400 flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#13805B]" />
              <span>256-Bit Bank Grade SSL Encrypted Checkout</span>
            </div>
          </div>

        </div>

      </div>

      {/* 📱 MOBILE STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl p-3 px-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[11px] text-slate-400 font-bold block uppercase">Payable Total</span>
          <span className="text-lg font-black text-slate-900">₹{finalPayable}</span>
        </div>

        <button
          disabled={isProcessing}
          onClick={handlePlaceOrder}
          className="bg-[#13805B] active:bg-[#0E6346] text-white text-xs font-black px-6 py-3.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 shrink-0 disabled:opacity-70"
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Lock className="w-3.5 h-3.5" />
              <span>Place Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
