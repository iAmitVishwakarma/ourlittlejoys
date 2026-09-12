import React, { createContext, useContext, useMemo } from 'react';
import { useCartStore, VALID_COUPONS } from '../stores/cartStore';

export { VALID_COUPONS };

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const cartItems = useCartStore((state) => state.cartItems);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);

  // Derived calculations
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  }, [cartItems]);

  const mrpTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.originalPrice || item.price) * (item.quantity || 1), 0);
  }, [cartItems]);

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percent') {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    }
    if (appliedCoupon.type === 'flat') {
      return Math.min(appliedCoupon.value, subtotal);
    }
    return 0;
  }, [subtotal, appliedCoupon]);

  const mrpSavings = useMemo(() => {
    return Math.max(0, mrpTotal - subtotal);
  }, [mrpTotal, subtotal]);

  const totalSavings = useMemo(() => {
    return mrpSavings + couponDiscount;
  }, [mrpSavings, couponDiscount]);

  const deliveryFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 499 ? 0 : 49;
  }, [subtotal]);

  const totalPayable = useMemo(() => {
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal - couponDiscount + deliveryFee);
  }, [subtotal, couponDiscount, deliveryFee]);

  const freeGiftThreshold = 999;
  const freeGiftAmountLeft = Math.max(0, freeGiftThreshold - subtotal);
  const isFreeGiftUnlocked = subtotal >= freeGiftThreshold;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        mrpTotal,
        mrpSavings,
        couponDiscount,
        totalSavings,
        deliveryFee,
        totalPayable,
        appliedCoupon,
        freeGiftThreshold,
        freeGiftAmountLeft,
        isFreeGiftUnlocked,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
