import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalSavings = cartItems.reduce((acc, item) => {
    const orig = item.originalPrice || item.price;
    return acc + (orig - item.price) * item.quantity;
  }, 0);
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 50;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-orange-50/50">
            <div>
              <h2 className="text-xl font-black text-slate-800">Your Cart</h2>
              <p className="text-xs text-slate-500 font-medium">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Promo Banner */}
          <div className="bg-emerald-50 px-6 py-2.5 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-800 font-semibold">
            {subtotal >= 499 ? (
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Yay! You unlocked <strong>FREE Shipping</strong>!
              </span>
            ) : (
              <span>Add ₹{499 - subtotal} more to get FREE shipping!</span>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🛒</div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">Your cart is empty</h3>
                <p className="text-sm text-slate-400 mb-6">Start nourishing your little ones today!</p>
                <button
                  onClick={onClose}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2.5 rounded-full text-sm"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-[#FFF9F5] border border-orange-100/70">
                  <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center text-3xl border border-slate-100 shrink-0">
                    {item.imageIcon || '🥣'}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{item.title}</h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-slate-400">{item.category}</div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-sm">₹{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">₹{item.originalPrice}</span>
                        )}
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-2 bg-white rounded-full border border-slate-200 px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-slate-500 hover:text-slate-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-slate-500 hover:text-slate-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-white space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{subtotal}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold text-xs">
                    <span>Total Discount</span>
                    <span>-₹{totalSavings}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 text-xs">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-600 font-bold' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between font-black text-base text-slate-900">
                  <span>Total Amount</span>
                  <span>₹{subtotal + deliveryFee}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  navigate('/checkout/address');
                }}
                className="w-full bg-[#13805B] hover:bg-[#0E6346] text-white font-bold py-3.5 rounded-full flex items-center justify-center space-x-2 shadow-lg shadow-[#13805B]/25 transition-transform active:scale-95"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Safe &amp; Encrypted Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
