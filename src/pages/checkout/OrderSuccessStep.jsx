import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCheckoutStore } from '@/stores/checkoutStore';
import CheckoutStepper from '@/components/checkout/CheckoutStepper';
import { 
  SunDoodle, 
  HeartDoodle, 
  KidStampBadge, 
  MiniStarCluster,
  FlyingKidDoodle
} from '@/components/graphics/KidsDoodles';
import SEO from '@/components/common/SEO';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ShoppingBag,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function OrderSuccessStep() {
  const navigate = useNavigate();
  const { lastOrder, orders, clearActiveCheckoutDraft } = useCheckoutStore();

  // Reset active checkout step & replace browser history entry so pressing Back does not return to payment submission (F-3.2)
  useEffect(() => {
    if (typeof clearActiveCheckoutDraft === 'function') {
      clearActiveCheckoutDraft();
    }
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, '', window.location.href);
    }
  }, [clearActiveCheckoutDraft]);

  // Active order is either lastOrder or the latest in orders list
  const activeOrder = lastOrder || orders[0] || {
    orderId: 'LJ10293',
    createdAt: new Date().toISOString(),
    estimatedDelivery: '18 Sep – 20 Sep',
    totalAmount: 948,
    status: 'Confirmed',
    address: {
      name: 'Amit Sharma',
      addressLine: 'Flat 402, Sunshine Orchards, Arera Colony',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462016'
    },
    items: [
      {
        id: 'nutrimix-choc',
        title: 'Nutrimix Chocolate Nutrition Powder (350g)',
        price: 599,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-24 md:pb-16">
      <SEO 
        title="Order Confirmed | Little Joys"
        description="Your Little Joys order has been placed successfully and is being packed with love."
      />
      {/* 1. Stepper with all 4 steps completed */}
      <CheckoutStepper currentStep="confirmation" />

      <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12 space-y-8">
        
        {/* 🎉 Celebratory Hero Card */}
        <div className="relative bg-white rounded-3xl p-6 sm:p-10 border border-orange-100 shadow-sm text-center overflow-hidden">
          {/* Floating celebratory doodles */}
          <SunDoodle className="w-10 h-10 text-amber-400 absolute top-4 left-6 hidden sm:block animate-bounce duration-1000" />
          <MiniStarCluster className="text-amber-400 absolute top-6 right-8 hidden sm:inline-flex" />

          {/* Big Green Checkmark */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#13805B] flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="inline-block mb-1">
            <KidStampBadge text="Order Placed Successfully" />
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
            Woohoo! Order Confirmed! 🎉
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-lg mx-auto mt-2 leading-relaxed">
            Thank you, <strong>{activeOrder.address?.name || 'Parent'}</strong>! Your child's wholesome nutrition pack has been scheduled and is being packed with love and care.
          </p>

          {/* Order ID Pill */}
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-full px-4 py-1.5 mt-4 text-xs font-bold text-slate-700">
            <span>Order ID:</span>
            <strong className="text-slate-900 font-black">#{activeOrder.orderId}</strong>
          </div>

          {/* Cute Flying Kid Doodle */}
          <div className="flex justify-center my-2">
            <FlyingKidDoodle className="w-44 sm:w-56 h-18 sm:h-20 drop-shadow-2xs" />
          </div>
        </div>

        {/* 📦 Live Delivery Timeline Tracker */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase text-[#13805B] tracking-wider">
                Estimated Delivery
              </span>
              <h2 className="text-lg font-black text-slate-900 mt-0.5">
                {activeOrder.estimatedDelivery || 'Thursday, 18 Sep – Saturday, 20 Sep'}
              </h2>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full self-start sm:self-auto">
              <Truck className="w-3.5 h-3.5 text-[#13805B]" />
              <span>BlueDart Express Shipping</span>
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative">
            <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
              <div className="w-8 h-8 rounded-full bg-[#13805B] text-white flex items-center justify-center text-xs font-black">
                ✓
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block">Order Placed</span>
                <span className="text-[11px] text-slate-400 font-semibold block">Today</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#13805B] flex items-center justify-center text-xs font-black border-2 border-[#13805B]">
                2
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block">Packed with Care</span>
                <span className="text-[11px] text-slate-400 font-semibold block">Tomorrow</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 opacity-60">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-black">
                3
              </div>
              <div>
                <span className="text-xs font-black text-slate-700 block">Dispatched</span>
                <span className="text-[11px] text-slate-400 font-semibold block">17 Sep</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 opacity-60">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-black">
                4
              </div>
              <div>
                <span className="text-xs font-black text-slate-700 block">Delivered</span>
                <span className="text-[11px] text-slate-400 font-semibold block">{activeOrder.estimatedDelivery?.split('–')[0] || '18 Sep'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 📋 Order Details Recap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Shipping Address Recap */}
          <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 tracking-wider">
              <MapPin className="w-4 h-4 text-[#13805B]" />
              <span>Delivering To</span>
            </div>
            <div className="text-xs sm:text-sm space-y-1 text-slate-700 font-medium">
              <p className="font-black text-slate-900 text-sm">{activeOrder.address?.name}</p>
              <p>{activeOrder.address?.addressLine}</p>
              <p>{activeOrder.address?.city}, {activeOrder.address?.state} - {activeOrder.address?.pincode}</p>
              {activeOrder.address?.mobile && (
                <p className="pt-1 text-slate-500 font-semibold">Phone: +91 {activeOrder.address?.mobile}</p>
              )}
            </div>
          </div>

          {/* Payment & Total Recap */}
          <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 tracking-wider">
              <Calendar className="w-4 h-4 text-[#13805B]" />
              <span>Payment Info</span>
            </div>
            <div className="text-xs sm:text-sm space-y-2 text-slate-700 font-medium">
              <div className="flex justify-between">
                <span>Method:</span>
                <strong className="text-slate-900 uppercase font-black">{activeOrder.paymentMethod || 'UPI'}</strong>
              </div>
              <div className="flex justify-between">
                <span>Payment Status:</span>
                <span className="text-emerald-700 font-black">Paid Successfully ✓</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 text-sm sm:text-base font-black text-slate-900">
                <span>Total Amount:</span>
                <span>₹{activeOrder.totalAmount}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/orders"
            replace
            className="w-full sm:w-auto bg-[#13805B] hover:bg-[#0E6346] text-white font-black py-4 px-8 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>View Orders &amp; Track</span>
            <ExternalLink className="w-4 h-4" />
          </Link>

          <Link
            to="/shop/all"
            replace
            className="w-full sm:w-auto bg-white hover:bg-orange-50/60 text-slate-800 border-2 border-slate-200 font-black py-4 px-8 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
