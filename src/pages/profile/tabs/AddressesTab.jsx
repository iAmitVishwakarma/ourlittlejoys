import React from 'react';
import { Plus } from 'lucide-react';

export default function AddressesTab({
  addresses = [],
  isAddingAddress,
  setIsAddingAddress,
  newAddress,
  setNewAddress,
  onSaveAddress,
  showToast
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            Saved Delivery Addresses
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage default shipping addresses for 1-click checkout.
          </p>
        </div>
        <button
          onClick={() => setIsAddingAddress(true)}
          className="text-xs font-black text-[#FF2F92] bg-pink-50 hover:bg-pink-100 px-3.5 py-2 rounded-xl border border-pink-200 transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Address</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xs border-2 border-pink-300 relative space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-[#FF2F92] text-white px-2.5 py-0.5 rounded-full">
                  {addr.label || 'HOME'}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Default Shipping Address
                </span>
              </div>
              <button 
                onClick={() => showToast && showToast("Edit address mode enabled")}
                className="text-xs font-bold text-slate-400 hover:text-pink-600"
              >
                Edit
              </button>
            </div>

            <div>
              <p className="text-sm font-black text-slate-900">
                {addr.recipient}
              </p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {addr.line1}, {addr.line2 ? `${addr.line2}, ` : ''}{addr.city}, {addr.state}{" "}
                - <strong>{addr.pincode}</strong>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Phone: {addr.phone}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isAddingAddress && (
        <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900">Add New Shipping Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Contact Name</label>
              <input
                type="text"
                value={newAddress.recipient}
                onChange={(e) => setNewAddress({ ...newAddress, recipient: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Phone Number</label>
              <input
                type="tel"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-600 font-bold mb-1">Address Line 1</label>
              <input
                type="text"
                value={newAddress.line1}
                onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                placeholder="House/Flat No., Building Name"
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">City</label>
              <input
                type="text"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Pincode</label>
              <input
                type="text"
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                placeholder="e.g. 462016"
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsAddingAddress(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={onSaveAddress}
              className="px-5 py-2 bg-[#FF2F92] text-white text-xs font-black rounded-xl shadow-xs"
            >
              Save Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
