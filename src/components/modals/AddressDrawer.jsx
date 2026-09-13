import React, { useState, useEffect } from 'react';
import { X, MapPin, Building, Home, Briefcase, Check, Sparkles } from 'lucide-react';
import { useCheckoutStore } from '@/stores/checkoutStore';

export default function AddressDrawer({ isOpen, onClose, initialData = null }) {
  const { addAddress, updateAddress } = useCheckoutStore();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pincode: '',
    addressLine: '',
    locality: '',
    city: '',
    state: 'Madhya Pradesh',
    type: 'HOME',
    isDefault: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        mobile: initialData.mobile || '',
        pincode: initialData.pincode || '',
        addressLine: initialData.addressLine || '',
        locality: initialData.locality || '',
        city: initialData.city || '',
        state: initialData.state || 'Madhya Pradesh',
        type: initialData.type || 'HOME',
        isDefault: initialData.isDefault || false
      });
    } else {
      setFormData({
        name: '',
        mobile: '',
        pincode: '462016',
        addressLine: '',
        locality: '',
        city: 'Bhopal',
        state: 'Madhya Pradesh',
        type: 'HOME',
        isDefault: false
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  // Handle Pincode Auto-detect (Simulated intelligent Indian Pincode resolver)
  const handlePincodeChange = (val) => {
    const cleanPin = val.replace(/\D/g, '').slice(0, 6);
    setFormData((prev) => ({ ...prev, pincode: cleanPin }));

    if (cleanPin.length === 6) {
      if (cleanPin.startsWith('462')) {
        setFormData((prev) => ({ ...prev, city: 'Bhopal', state: 'Madhya Pradesh' }));
      } else if (cleanPin.startsWith('452')) {
        setFormData((prev) => ({ ...prev, city: 'Indore', state: 'Madhya Pradesh' }));
      } else if (cleanPin.startsWith('400')) {
        setFormData((prev) => ({ ...prev, city: 'Mumbai', state: 'Maharashtra' }));
      } else if (cleanPin.startsWith('110')) {
        setFormData((prev) => ({ ...prev, city: 'New Delhi', state: 'Delhi' }));
      } else if (cleanPin.startsWith('560')) {
        setFormData((prev) => ({ ...prev, city: 'Bengaluru', state: 'Karnataka' }));
      }
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, '').length < 10) {
      errs.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.pincode.trim() || formData.pincode.length !== 6) {
      errs.pincode = 'Enter a valid 6-digit pincode';
    }
    if (!formData.addressLine.trim()) errs.addressLine = 'House / Flat details are required';
    if (!formData.locality.trim()) errs.locality = 'Street / Colony details are required';
    if (!formData.city.trim()) errs.city = 'City is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (initialData?.id) {
      updateAddress(initialData.id, formData);
    } else {
      addAddress(formData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in" 
      />

      {/* Slide-over Side Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="address-drawer-title"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full max-h-[90dvh] sm:max-h-screen my-auto sm:my-0 rounded-t-3xl sm:rounded-none animate-in slide-in-from-right duration-300 overflow-hidden"
        >
          
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-orange-100 flex items-center justify-between bg-linear-to-r from-orange-50/40 to-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#13805B] flex items-center justify-center border border-emerald-200/60">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 id="address-drawer-title" className="text-base sm:text-lg font-black text-slate-900">
                  {initialData ? 'Edit Delivery Address' : 'Add New Delivery Address'}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  We deliver across 19,000+ pincodes in India
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close address drawer"
              className="w-11 h-11 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Form Body (Scrollable with virtual keyboard tolerance) */}
          <form id="address-drawer-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            
            {/* Contact Details Group */}
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                Contact Information
              </span>

              {/* Full Name */}
              <div>
                <label htmlFor="address-name" className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="address-name"
                  type="text"
                  placeholder="e.g. Amit Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full text-xs sm:text-sm font-medium px-3.5 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                    errors.name ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-200 focus:border-[#13805B]'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="address-mobile" className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    id="address-mobile"
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                    className={`w-full text-xs sm:text-sm font-medium pl-12 pr-3.5 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                      errors.mobile ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-200 focus:border-[#13805B]'
                    }`}
                  />
                </div>
                {errors.mobile && <p className="text-[11px] text-rose-500 mt-1">{errors.mobile}</p>}
              </div>
            </div>

            {/* Address Group */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                Address Details
              </span>

              {/* Pincode */}
              <div>
                <label htmlFor="address-pincode" className="text-xs font-bold text-slate-700 block mb-1">
                  Pincode <span className="text-rose-500">*</span>
                </label>
                <input
                  id="address-pincode"
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 462016"
                  value={formData.pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  className={`w-full text-xs sm:text-sm font-medium px-3.5 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                    errors.pincode ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-200 focus:border-[#13805B]'
                  }`}
                />
                {errors.pincode && <p className="text-[11px] text-rose-500 mt-1">{errors.pincode}</p>}
              </div>

              {/* Flat / House No. */}
              <div>
                <label htmlFor="address-line" className="text-xs font-bold text-slate-700 block mb-1">
                  Flat, House No., Building, Apartment <span className="text-rose-500">*</span>
                </label>
                <input
                  id="address-line"
                  type="text"
                  placeholder="e.g. Flat 402, Sunshine Orchards"
                  value={formData.addressLine}
                  onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                  className={`w-full text-xs sm:text-sm font-medium px-3.5 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                    errors.addressLine ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-200 focus:border-[#13805B]'
                  }`}
                />
                {errors.addressLine && <p className="text-[11px] text-rose-500 mt-1">{errors.addressLine}</p>}
              </div>

              {/* Area / Street / Colony */}
              <div>
                <label htmlFor="address-locality" className="text-xs font-bold text-slate-700 block mb-1">
                  Area, Street, Sector, Landmark <span className="text-rose-500">*</span>
                </label>
                <input
                  id="address-locality"
                  type="text"
                  placeholder="e.g. Arera Colony, Near 10 No. Market"
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  className={`w-full text-xs sm:text-sm font-medium px-3.5 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                    errors.locality ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-200 focus:border-[#13805B]'
                  }`}
                />
                {errors.locality && <p className="text-[11px] text-rose-500 mt-1">{errors.locality}</p>}
              </div>

              {/* City & State Row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="address-city" className="text-xs font-bold text-slate-700 block mb-1">
                    Town / City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="address-city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Bhopal"
                    className={`w-full text-xs sm:text-sm font-medium px-3.5 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none transition-all ${
                      errors.city ? 'border-rose-400' : 'border-slate-200 focus:border-[#13805B]'
                    }`}
                  />
                </div>

                <div>
                  <label htmlFor="address-state" className="text-xs font-bold text-slate-700 block mb-1">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="address-state"
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g. Madhya Pradesh"
                    className="w-full text-xs sm:text-sm font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-[#13805B] focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Address Type Selector */}
            <div className="pt-2">
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Address Type
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'HOME', label: 'Home', icon: Home },
                  { id: 'WORK', label: 'Work', icon: Briefcase },
                  { id: 'OTHER', label: 'Other', icon: Building }
                ].map((t) => {
                  const Icon = t.icon;
                  const isSelected = formData.type === t.id;
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setFormData({ ...formData, type: t.id })}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        isSelected
                          ? 'border-[#13805B] bg-emerald-50 text-[#13805B] shadow-2xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Make Default Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-4 h-4 accent-[#13805B] rounded"
                />
                <span className="text-xs font-bold text-slate-700">
                  Make this my default delivery address
                </span>
              </label>
            </div>

          </form>

          {/* Fixed Pinned Footer Action Buttons (Keyboard Safe & pb-safe) */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-white shrink-0 flex gap-3 pb-safe">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-full border border-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="address-drawer-form"
              className="flex-1 py-3 px-4 rounded-full bg-[#13805B] hover:bg-[#0E6346] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-3" />
              <span>Save Address</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
