import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const VALID_COUPONS = [
  { code: 'JOY30', type: 'percent', value: 22, minOrder: 499, description: '22% Flat Instant Joy Discount' },
  { code: 'FIRST100', type: 'flat', value: 100, minOrder: 399, description: 'Flat ₹100 Off on your first order' },
  { code: 'LJWALLET', type: 'percent', value: 30, minOrder: 899, description: 'Extra 30% Value with LJ Wallet' }
];

const DEFAULT_CART_ITEMS = [
  {
    id: "nutrimix-choc",
    title: "Nutrimix Chocolate Nutrition Powder (350g)",
    price: 599,
    originalPrice: 649,
    quantity: 1,
    category: "Daily Nutrition",
    subCategory: "DAILY NUTRITION",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    visualType: "nutrimix",
    flavor: "chocolate",
    weight: "350g",
    age: "2-6 Yr",
    slug: "nutrimix-nutrition-powder"
  }
];

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: DEFAULT_CART_ITEMS,
      appliedCoupon: { code: 'JOY30', type: 'percent', value: 22, description: '22% Flat Instant Joy Discount' },

      addToCart: (product, quantity = 1) => {
        const qtyToAdd = product.quantity || quantity || 1;
        set((state) => {
          const existingIndex = state.cartItems.findIndex(
            (item) => item.id === product.id || item.slug === product.slug
          );
          if (existingIndex > -1) {
            const updated = [...state.cartItems];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + qtyToAdd
            };
            return { cartItems: updated };
          }
          return { cartItems: [...state.cartItems, { ...product, quantity: qtyToAdd }] };
        });
      },

      updateQuantity: (id, newQty) => {
        if (newQty <= 0) {
          get().removeFromCart(id);
        } else {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === id || item.slug === id ? { ...item, quantity: newQty } : item
            )
          }));
        }
      },

      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id && item.slug !== id)
        }));
      },

      clearCart: () => {
        set({ cartItems: [], appliedCoupon: null });
      },

      applyCoupon: (code) => {
        const state = get();
        const subtotal = state.cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
        const found = VALID_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
        if (!found) {
          return { success: false, message: 'Invalid coupon code. Try JOY30, FIRST100, or LJWALLET.' };
        }
        if (subtotal < found.minOrder) {
          return { success: false, message: `Minimum cart value of ₹${found.minOrder} required for ${found.code}.` };
        }
        set({ appliedCoupon: found });
        return { success: true, message: `${found.code} applied successfully!` };
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
      }
    }),
    {
      name: 'lj_cart_store_v2'
    }
  )
);
