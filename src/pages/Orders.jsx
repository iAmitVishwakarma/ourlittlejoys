import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import ProductVisual from '@/components/product/ProductVisual';
import OrderDetailModal from '@/pages/profile/OrderDetailModal';
import { useOrders } from '@/hooks/useOrders';
import {
  Package,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  MapPin,
  CheckCircle2,
  X,
  ArrowRight,
} from 'lucide-react';

export default function Orders() {
  const {
    filteredOrders,
    orderFilter,
    setOrderFilter,
    isFilterOpen,
    setIsFilterOpen,
    selectedOrderDetail,
    setSelectedOrderDetail,
    toastMessage,
    setToastMessage,
    handleBuyAgain,
    handleReorderWholeOrder,
  } = useOrders();

  return (
    <div className="min-h-screen bg-brand-cream pb-24 pt-6 md:pt-8 font-sans selection:bg-[#FAF4EB] selection:text-[#1F3C24]">
      <SEO
        title="My Orders | Nestor"
        description="Track delivery status, review past purchases, and easily reorder your favourite Nestor child nutrition products."
      />

      {/* Floating Animated Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 animate-bounce max-w-md bg-white border border-[#C89B58]/40 shadow-xl rounded-2xl p-4 flex items-start gap-3"
        >
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
            className="text-[11px] font-extrabold text-[#1F3C24] hover:underline shrink-0 bg-[#FAF4EB] px-2.5 py-1 rounded-lg border border-[#C89B58]/30 inline-flex items-center gap-1"
          >
            <span>View Cart</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setToastMessage(null)}
            aria-label="Close notification"
            className="text-slate-400 hover:text-slate-600 ml-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/80">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#1F3C24]">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-brand-display">
                  My Orders
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track, manage and reorder your Nestor purchases ({filteredOrders.length}{' '}
                  {filteredOrders.length === 1 ? 'order' : 'orders'}).
                </p>
              </div>
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="relative self-start sm:self-auto">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-4 py-2.5 rounded-xl border border-stone-200 shadow-2xs hover:border-[#1F3C24]/40 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {orderFilter === 'all'
                  ? 'All Orders'
                  : orderFilter === 'delivered'
                    ? 'Delivered'
                    : 'Processing'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-20 text-xs font-bold text-slate-700">
                <button
                  onClick={() => {
                    setOrderFilter('all');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-orange-50 transition-colors ${
                    orderFilter === 'all' ? 'text-[#1F3C24] font-black bg-orange-50/50' : ''
                  }`}
                >
                  All Orders
                </button>
                <button
                  onClick={() => {
                    setOrderFilter('delivered');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-orange-50 transition-colors ${
                    orderFilter === 'delivered' ? 'text-[#1F3C24] font-black bg-orange-50/50' : ''
                  }`}
                >
                  Delivered
                </button>
                <button
                  onClick={() => {
                    setOrderFilter('processing');
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-orange-50 transition-colors ${
                    orderFilter === 'processing' ? 'text-[#1F3C24] font-black bg-orange-50/50' : ''
                  }`}
                >
                  Processing
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-3xl flex items-center justify-center mx-auto border border-orange-100">
              📦
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-black text-slate-800">No orders found</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                {orderFilter === 'all'
                  ? 'Start exploring healthy doctor-formulated Nestor nutrition for your family.'
                  : `You do not have any ${orderFilter} orders currently.`}
              </p>
            </div>
            <Link
              to="/shop/all"
              className="inline-flex items-center gap-2 bg-[#1F3C24] hover:bg-[#142718] text-white text-xs font-black px-6 py-3 rounded-full shadow-xs transition-all active:scale-98"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const orderId = order.id || order.orderId;
              return (
                <div
                  key={orderId}
                  className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-stone-200/80 space-y-5 hover:border-[#C89B58]/40 transition-colors"
                >
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                          #{orderId}
                        </span>
                        <span className="text-[11px] bg-emerald-50 text-emerald-700 font-extrabold px-3 py-0.5 rounded-full border border-emerald-200">
                          {order.status || 'Delivered'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Placed on {order.date || new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} &bull;{' '}
                        {order.items?.length || 0}{' '}
                        {order.items?.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        ₹{order.total || order.totalAmount}
                      </span>
                      {order.discount > 0 && (
                        <p className="text-[11px] text-emerald-600 font-bold">
                          Saved ₹{order.discount}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Visual 4-Step Tracker */}
                  <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-slate-100/90">
                    <div className="relative flex items-center justify-between">
                      <div className="absolute top-3 left-4 right-4 h-0.5 bg-emerald-400 -z-0" />
                      {(order.timeline || [
                        { label: 'Confirmed', date: order.date?.split(',')[0] || 'Placed', completed: true },
                        { label: 'Packed', date: 'Packed', completed: true },
                        { label: 'Shipped', date: 'Shipped', completed: true },
                        { label: 'Delivered', date: order.deliveryDate || 'Delivered', completed: true },
                      ]).map((step, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-xs ring-4 ring-white">
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

                  {/* Product Items List */}
                  <div className="space-y-3 divide-y divide-slate-100">
                    {order.items?.map((item, idx) => (
                      <div
                        key={item.id || item.productId || item.slug || `order-item-${idx}`}
                        className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <div className="w-14 h-14 rounded-2xl bg-orange-50/80 p-1.5 flex items-center justify-center border border-orange-100 shrink-0">
                            <ProductVisual
                              visualType={item.visualType}
                              flavor={item.flavor}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h2 className="text-xs sm:text-sm font-black text-slate-800 leading-snug">
                              {item.title}
                            </h2>
                            <p className="text-xs text-slate-400 font-medium mt-0.5">
                              Qty: {item.quantity || 1} &bull;{' '}
                              <strong className="text-slate-700">₹{item.price}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => handleBuyAgain(item)}
                            className="bg-[#FAF4EB] hover:bg-[#1F3C24] text-[#1F3C24] hover:text-white font-black text-xs px-4 py-2 rounded-xl border border-[#C89B58]/30 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                            title={`Reorder ${item.title}`}
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Buy Again</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Card Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-slate-100 text-xs">
                    <div className="text-slate-500 text-[11px] truncate max-w-md flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">
                        {typeof order.address === 'string'
                          ? order.address
                          : order.address?.addressLine || 'Address on file'}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedOrderDetail(order)}
                      className="text-xs font-black text-[#1F3C24] hover:text-[#C89B58] hover:underline flex items-center gap-1 shrink-0 ml-auto cursor-pointer"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrderDetail}
        onClose={() => setSelectedOrderDetail(null)}
        onReorderWholeOrder={handleReorderWholeOrder}
      />
    </div>
  );
}
