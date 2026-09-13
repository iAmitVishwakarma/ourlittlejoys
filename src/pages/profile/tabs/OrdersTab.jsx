import React from 'react';
import { Link } from 'react-router-dom';
import ProductVisual from '@/components/product/ProductVisual';
import {
  Package,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  MapPin
} from 'lucide-react';

export default function OrdersTab({
  filteredOrders = [],
  orderFilter,
  setOrderFilter,
  isFilterOpen,
  setIsFilterOpen,
  onSelectOrder,
  onBuyAgain
}) {
  return (
    <div className="space-y-5">
      {/* Header with Filter Dropdown */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-pink-600" />
            <span>My Orders ({filteredOrders.length})</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track, manage and reorder your Little Joys purchases.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-2xs hover:border-pink-300 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {orderFilter === "all" ? "All Orders" : orderFilter === "delivered" ? "Delivered" : "Processing"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-2xl shadow-lg border border-slate-100 py-1.5 z-20 text-xs font-bold text-slate-700">
              <button
                onClick={() => {
                  setOrderFilter("all");
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 hover:bg-orange-50 ${orderFilter === "all" ? "text-pink-600 font-black" : ""}`}
              >
                All Orders
              </button>
              <button
                onClick={() => {
                  setOrderFilter("delivered");
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 hover:bg-orange-50 ${orderFilter === "delivered" ? "text-pink-600 font-black" : ""}`}
              >
                Delivered
              </button>
              <button
                onClick={() => {
                  setOrderFilter("processing");
                  setIsFilterOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 hover:bg-orange-50 ${orderFilter === "processing" ? "text-pink-600 font-black" : ""}`}
              >
                Processing
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-orange-100 space-y-4 shadow-2xs">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-3xl flex items-center justify-center mx-auto">
            📦
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-800">No orders found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Start exploring healthy doctor-formulated little joys for your family.
            </p>
          </div>
          <Link
            to="/shop/all"
            className="inline-block bg-[#FF2F92] text-white text-xs font-black px-6 py-2.5 rounded-full shadow-xs hover:bg-pink-600 transition-all"
          >
            Shop Now &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xs border border-orange-100/90 space-y-5 hover:border-pink-200 transition-colors"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900 tracking-tight">
                      {order.id}
                    </span>
                    <span className="text-[11px] bg-emerald-50 text-emerald-700 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Placed on {order.date} &bull; {order.items?.length || 0} {order.items?.length === 1 ? "item" : "items"}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-base font-black text-slate-900">
                    ₹{order.total}
                  </span>
                  {order.discount > 0 && (
                    <p className="text-[11px] text-emerald-600 font-bold">
                      Saved ₹{order.discount}
                    </p>
                  )}
                </div>
              </div>

              {/* Visual Step Progress Tracker */}
              {order.timeline && (
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-100/80">
                  <div className="relative flex items-center justify-between">
                    <div className="absolute top-3 left-4 right-4 h-0.5 bg-emerald-400 -z-0" />
                    {order.timeline.map((step, idx) => (
                      <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs ring-4 ring-white">
                          ✓
                        </div>
                        <span className="text-[11px] font-black text-slate-800 mt-1.5">
                          {step.label}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400">
                          {step.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Items List */}
              <div className="space-y-3 divide-y divide-slate-50">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-14 h-14 rounded-2xl bg-orange-50/80 p-1.5 flex items-center justify-center border border-orange-100 shrink-0">
                        <ProductVisual
                          visualType={item.visualType}
                          flavor={item.flavor}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-black text-slate-800 truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">
                          Qty: {item.quantity} &bull; <strong className="text-slate-700">₹{item.price}</strong>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onBuyAgain(item)}
                      className="shrink-0 bg-pink-50 hover:bg-[#FF2F92] text-[#FF2F92] hover:text-white font-black text-xs px-3.5 py-1.5 rounded-xl border border-pink-200/80 shadow-2xs transition-all flex items-center gap-1.5"
                      title={`Reorder ${item.title}`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Buy Again</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Card Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="text-slate-500 text-[11px] truncate max-w-sm flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{order.address}</span>
                </div>

                <button
                  onClick={() => onSelectOrder(order)}
                  className="text-xs font-black text-[#FF2F92] hover:underline flex items-center gap-1 shrink-0 ml-auto"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
