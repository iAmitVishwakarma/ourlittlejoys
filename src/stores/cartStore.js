import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartService } from '@/services/cartService';
import { calculateOrderPricing, calculateSubtotal } from '@/utils/pricing';

export const VALID_COUPONS = [
  { code: 'JOY30', type: 'percent', value: 22, minOrder: 499, description: '22% Flat Instant Joy Discount' },
  { code: 'FIRST100', type: 'flat', value: 100, minOrder: 399, description: 'Flat ₹100 Off on your first order' },
  { code: 'LJWALLET', type: 'percent', value: 30, minOrder: 899, description: 'Extra 30% Value with LJ Wallet' }
];

/** Maximum allowed quantity per cart item to prevent abuse */
export const MAX_ITEM_QUANTITY = 10;
export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      activeUserId: null,
      appliedCoupon: { code: 'JOY30', type: 'percent', value: 22, description: '22% Flat Instant Joy Discount' },

      /**
       * Load cart for a specific authenticated user
       */
      loadUserCart: async (userId) => {
        if (!userId) return;
        set({ activeUserId: userId });
        const items = await cartService.getUserCart(userId);
        set({ cartItems: items || [] });
      },

      /**
       * Add item to cart scoped to user
       */
      addToCart: async (product, quantity = 1) => {
        const userId = get().activeUserId || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lj_user_data') || '{}')?.id : null);
        const qtyToAdd = product.quantity || quantity || 1;

        // Optimistic update
        set((state) => {
          const targetId = String(product.id || product.productId || '');
          const targetSlug = String(product.slug || '');
          const existingIndex = state.cartItems.findIndex(
            (item) =>
              (targetId && (String(item.id) === targetId || String(item.productId) === targetId)) ||
              (targetSlug && String(item.slug || '') === targetSlug)
          );

          if (existingIndex > -1) {
            const updated = [...state.cartItems];
            const newQty = Math.min((updated[existingIndex].quantity || 1) + qtyToAdd, MAX_ITEM_QUANTITY);
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: newQty
            };
            return { cartItems: updated };
          }

          const newItem = {
            id: String(product.id || `cart_${Date.now()}`),
            productId: String(product.id || product.slug || 'prod'),
            title: product.title || product.name,
            price: product.price,
            originalPrice: product.originalPrice || product.mrp || product.price,
            quantity: Math.min(qtyToAdd, MAX_ITEM_QUANTITY),
            image: product.image,
            slug: product.slug,
            flavor: product.flavor,
            weight: product.weight
          };
          return { cartItems: [...state.cartItems, newItem] };
        });

        // Sync with service if userId is present
        if (userId) {
          const syncedItems = await cartService.addToCart(userId, product, qtyToAdd);
          set({ cartItems: syncedItems, activeUserId: userId });
        }
      },

      /**
       * Update item quantity
       */
      updateQuantity: async (id, newQty) => {
        const userId = get().activeUserId;
        const targetId = String(id);
        if (newQty <= 0) {
          get().removeFromCart(id);
          return;
        }
        const clampedQty = Math.min(newQty, MAX_ITEM_QUANTITY);

        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            String(item.id) === targetId || String(item.productId) === targetId || (item.slug && String(item.slug) === targetId)
              ? { ...item, quantity: clampedQty }
              : item
          )
        }));

        if (userId) {
          await cartService.updateQuantity(userId, targetId, clampedQty);
        }
      },

      /**
       * Remove item from cart
       */
      removeFromCart: async (id) => {
        const userId = get().activeUserId;
        const targetId = String(id);
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) =>
              String(item.id) !== targetId &&
              String(item.productId) !== targetId &&
              (!item.slug || String(item.slug) !== targetId)
          )
        }));

        if (userId) {
          await cartService.removeFromCart(userId, targetId);
        }
      },

      /**
       * Clean wipe cart upon logout
       */
      clearCart: () => {
        set({ cartItems: [], activeUserId: null, appliedCoupon: null });
      },

      /**
       * Coupon actions
       */
      applyCoupon: (code) => {
        const state = get();
        const subtotal = calculateSubtotal(state.cartItems);
        const found = VALID_COUPONS.find(
          (c) => c.code.toUpperCase() === code.trim().toUpperCase()
        );
        if (!found) {
          return { success: false, message: 'Invalid coupon code. Try JOY30, FIRST100, or LJWALLET.' };
        }
        if (subtotal < found.minOrder) {
          return {
            success: false,
            message: `Minimum cart value of ₹${found.minOrder} required for ${found.code}.`
          };
        }
        set({ appliedCoupon: found });
        return { success: true, message: `${found.code} applied successfully!` };
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
      }
    }),
    {
      name: 'lj_user_cart_store_v3'
    }
  )
);

// Derived selectors for computed cart values using pure pricing engine
export function useCartDerived() {
  const cartItems = useCartStore((s) => s.cartItems);
  const appliedCoupon = useCartStore((s) => s.appliedCoupon);

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const pricing = calculateOrderPricing({
    items: cartItems,
    coupon: appliedCoupon
  });

  const freeGiftThreshold = 999;
  const freeGiftAmountLeft = Math.max(0, freeGiftThreshold - pricing.subtotal);
  const isFreeGiftUnlocked = pricing.subtotal >= freeGiftThreshold;

  return {
    cartItems,
    cartCount,
    subtotal: pricing.subtotal,
    mrpTotal: pricing.mrpTotal,
    mrpSavings: pricing.mrpSavings,
    couponDiscount: pricing.discount,
    totalSavings: pricing.totalSavings,
    deliveryFee: pricing.shipping,
    totalPayable: pricing.finalTotal,
    appliedCoupon,
    freeGiftThreshold,
    freeGiftAmountLeft,
    isFreeGiftUnlocked
  };
}

export default useCartStore;
