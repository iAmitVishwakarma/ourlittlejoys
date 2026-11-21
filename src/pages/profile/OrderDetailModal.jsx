import React from 'react';
import { X } from 'lucide-react';

export default function OrderDetailModal({
  order,
  onClose,
  onReorderWholeOrder,
}) {
  if (!order) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-orange-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {order.status}
            </span>
            <h3 className="text-base font-black text-slate-900 mt-1">
              Order #{order.id}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold block">Delivery Tracking</span>
            <p className="text-slate-800 font-black">Carrier: {order.trackingNumber}</p>
            <p className="text-slate-500 text-[11px]">Delivered on {order.deliveryDate}</p>
          </div>

          <div className="space-y-2">
            <span className="font-black text-slate-800 block">Items Purchased</span>
            {order.items.map((item, idx) => (
              <div
                key={item.id || item.productId || item.slug || `detail-item-${idx}`}
                className="flex items-center justify-between p-2 rounded-xl bg-orange-50/50"
              >
                <span className="font-bold text-slate-800 truncate max-w-60">
                  {item.title} (x{item.quantity})
                </span>
                <span className="font-black text-slate-900">₹{item.price}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>₹{order.total + order.discount}</span>
            </div>
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>LJ Wallet Discount</span>
              <span>- ₹{order.discount}</span>
            </div>
            <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-100">
              <span>Total Paid</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => {
              onReorderWholeOrder(order);
              onClose();
            }}
            className="flex-1 bg-[#1F3C24] hover:bg-[#142718] text-white font-black text-xs py-2.5 rounded-xl shadow-xs transition-colors"
          >
            Reorder All Items
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
