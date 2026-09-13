import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCheckoutStore } from '@/stores/checkoutStore';
import { useCartDerived } from '@/stores/cartStore';
import CheckoutStepper from '@/components/checkout/CheckoutStepper';
import AddressDrawer from '@/components/modals/AddressDrawer';
import CheckoutOrderSummary from '@/components/checkout/CheckoutOrderSummary';
import SEO from '@/components/common/SEO';
import { 
  Plus, 
  MapPin, 
  Home, 
  Briefcase, 
  Building, 
  Check, 
  Edit3, 
  Trash2, 
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';

export default function AddressStep() {
  const navigate = useNavigate();
  const { cartItems, totalPayable } = useCartDerived();
  const { 
    savedAddresses, 
    selectedAddressId, 
    selectAddress, 
    removeAddress, 
    setDefaultAddress 
  } = useCheckoutStore();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // If cart is empty, show empty state with link to shop
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF9F5] py-12 px-4">
        <SEO title="Checkout - Cart Empty | Little Joys" description="Your shopping cart is currently empty." />
        <div className="container mx-auto max-w-lg text-center bg-white rounded-3xl p-8 border border-orange-100 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center mx-auto text-3xl">
            🛒
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Your Cart is Empty</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Add some wholesome child nutrition favorites before proceeding to checkout!
          </p>
          <Link
            to="/shop/all"
            className="inline-flex items-center gap-2 bg-[#13805B] hover:bg-[#0E6346] text-white text-xs sm:text-sm font-black px-6 py-3.5 rounded-full uppercase tracking-wider shadow-md transition-all active:scale-95"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (addr, e) => {
    e.stopPropagation();
    setEditingAddress(addr);
    setIsDrawerOpen(true);
  };

  const handleRemove = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this address?')) {
      removeAddress(id);
    }
  };

  const handleProceed = () => {
    if (!selectedAddressId && savedAddresses.length > 0) {
      selectAddress(savedAddresses[0].id);
    }
    navigate('/checkout/payment');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] pb-24 md:pb-16">
      <SEO title="Checkout - Delivery Address | Little Joys" description="Confirm shipping address for your Little Joys order." />
      {/* 1. Myntra-Style Step Navigation */}
      <CheckoutStepper currentStep="address" />

      <div className="container mx-auto max-w-5xl px-4 py-6 md:py-8">
        
        {/* Page Title & Reassurance */}
        <div className="mb-6 space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Delivery Address
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Choose where you'd like your Little Joys order delivered.
          </p>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Saved Addresses & Add Address */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Header row with + Add New Address button */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Saved Addresses ({savedAddresses.length})
              </span>

              <button
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#13805B] hover:text-[#0E6346] transition-colors"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Address Cards List */}
            <div className="space-y-3">
              {savedAddresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => selectAddress(addr.id)}
                    className={`relative p-4 sm:p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#13805B] bg-emerald-50/40 shadow-xs ring-2 ring-[#13805B]/15'
                        : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    {/* Top row: Radio + Type Badge + Default Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        {/* Custom Radio Button */}
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-[#13805B] bg-[#13805B]'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>

                        {/* Name */}
                        <h3 className="text-sm font-black text-slate-900">
                          {addr.name}
                        </h3>

                        {/* Type Tag */}
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {addr.type || 'HOME'}
                        </span>
                      </div>

                      {/* Default Pill or Set Default Button */}
                      <div>
                        {addr.isDefault ? (
                          <span className="bg-emerald-100 text-[#13805B] text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" /> Default
                          </span>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDefaultAddress(addr.id);
                            }}
                            className="text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Address Body */}
                    <div className="pl-7 space-y-1 text-xs text-slate-600 font-medium leading-relaxed">
                      <p className="text-slate-800">
                        {addr.addressLine}
                      </p>
                      {addr.locality && <p>{addr.locality}</p>}
                      <p>
                        {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                      </p>
                      <p className="pt-1 text-slate-500 font-semibold">
                        Mobile: <strong className="text-slate-800">+91 {addr.mobile}</strong>
                      </p>
                    </div>

                    {/* Card Actions Footer: Edit & Remove */}
                    <div className="pl-7 pt-3 mt-3 border-t border-slate-100/80 flex items-center gap-4 text-xs font-bold">
                      <button
                        onClick={(e) => handleOpenEdit(addr, e)}
                        className="text-slate-600 hover:text-[#13805B] flex items-center gap-1 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      {savedAddresses.length > 1 && (
                        <button
                          onClick={(e) => handleRemove(addr.id, e)}
                          className="text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* + Add New Address Card Button */}
            <button
              onClick={handleOpenAdd}
              className="w-full p-4 rounded-3xl border-2 border-dashed border-slate-300 hover:border-[#13805B] bg-white/70 hover:bg-emerald-50/20 text-slate-700 hover:text-[#13805B] font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Address</span>
            </button>

          </div>

          {/* Right Column: Order Summary & Action */}
          <div className="lg:col-span-5 space-y-4">
            <CheckoutOrderSummary />

            {/* Desktop Proceed Button */}
            <button
              onClick={handleProceed}
              className="w-full bg-[#13805B] hover:bg-[#0E6346] text-white font-black py-4 px-6 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#13805B]/25 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Delivery Reassurances */}
            <div className="bg-white rounded-2xl p-3.5 border border-orange-100 flex items-center justify-between text-center text-[11px] font-bold text-slate-600">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#13805B]" />
                <span>Free Express Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#13805B]" />
                <span>Pediatrician Approved</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 📱 MOBILE STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl p-3 px-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[11px] text-slate-400 font-bold block uppercase">Payable Total</span>
          <span className="text-lg font-black text-slate-900">₹{totalPayable}</span>
        </div>

        <button
          onClick={handleProceed}
          className="bg-[#13805B] active:bg-[#0E6346] text-white text-xs font-black px-6 py-3.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5 shrink-0"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Add / Edit Address Side Drawer Modal */}
      <AddressDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        initialData={editingAddress}
      />
    </div>
  );
}
