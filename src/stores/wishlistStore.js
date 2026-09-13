import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { wishlistService } from '@/services/wishlistService';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],
      activeUserId: null,

      /**
       * Load wishlist items for authenticated user
       */
      loadUserWishlist: async (userId) => {
        if (!userId) return;
        set({ activeUserId: userId });
        const items = await wishlistService.getUserWishlist(userId);
        set({ wishlistItems: items || [] });
      },

      /**
       * Toggle product in wishlist
       */
      toggleWishlist: async (product) => {
        const userId = get().activeUserId || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('lj_user_data') || '{}')?.id : null);
        
        // Optimistic update
        set((state) => {
          const targetId = String(product.id || '');
          const targetSlug = String(product.slug || '');
          const exists = state.wishlistItems.some(
            (item) =>
              String(item.id) === targetId ||
              (targetSlug && String(item.slug) === targetSlug) ||
              String(item.productId) === targetId
          );
          if (exists) {
            return {
              wishlistItems: state.wishlistItems.filter(
                (item) =>
                  String(item.id) !== targetId &&
                  (!targetSlug || String(item.slug) !== targetSlug) &&
                  String(item.productId) !== targetId
              )
            };
          }
          return { wishlistItems: [...state.wishlistItems, product] };
        });

        // Sync with service
        if (userId) {
          const updated = await wishlistService.toggleWishlist(userId, product);
          set({ wishlistItems: updated, activeUserId: userId });
        }
      },

      /**
       * Check if product is in active user's wishlist (F-3.2: String-normalized)
       */
      isInWishlist: (productIdOrSlug) => {
        if (!productIdOrSlug) return false;
        const target = String(productIdOrSlug).toLowerCase();
        return get().wishlistItems.some(
          (item) =>
            String(item.id).toLowerCase() === target ||
            String(item.slug || '').toLowerCase() === target ||
            String(item.productId || '').toLowerCase() === target
        );
      },

      /**
       * Remove item from wishlist
       */
      removeFromWishlist: async (productIdOrSlug) => {
        const userId = get().activeUserId;
        const target = String(productIdOrSlug);
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(
            (item) =>
              String(item.id) !== target &&
              String(item.slug || '') !== target &&
              String(item.productId || '') !== target
          )
        }));

        if (userId) {
          await wishlistService.removeFromWishlist(userId, target);
        }
      },

      /**
       * Clear wishlist on user logout
       */
      clearWishlist: () => {
        set({ wishlistItems: [], activeUserId: null });
      }
    }),
    {
      name: 'lj_user_wishlist_store_v3'
    }
  )
);

export default useWishlistStore;
